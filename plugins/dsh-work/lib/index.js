// src/routes.js
import { createReadStream, statSync as statSync4 } from "node:fs";
import { WebSocketServer } from "ws";

// src/git.js
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";
var TIMEOUT_MS = 8e3;
var MAX_GRAPH = 60;
var MAX_OUTPUT = 512 * 1024;
function runGit(cwd, args, timeoutMs = TIMEOUT_MS) {
  return new Promise((settle) => {
    let stdout = "";
    let stderr = "";
    let outSize = 0;
    let done = false;
    const finish = (ok, error) => {
      if (done) return;
      done = true;
      settle({ ok, stdout, stderr, error });
    };
    let child;
    try {
      child = spawn("git", args, {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" }
      });
    } catch (error) {
      finish(false, String(error));
      return;
    }
    const timer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {
      }
      finish(false, "timeout");
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      outSize += chunk.length;
      if (outSize <= MAX_OUTPUT) stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      if (stderr.length < 2e3) stderr += String(chunk);
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      finish(false, error.message);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      finish(code === 0, code === 0 ? void 0 : `exit ${code}`);
    });
  });
}
async function currentBranch(cwd) {
  const rev = await runGit(cwd, ["rev-parse", "--abbrev-ref", "HEAD"]);
  if (rev.ok) {
    const name2 = rev.stdout.trim();
    if (name2 !== "HEAD") return name2;
  }
  const symbolic = await runGit(cwd, ["symbolic-ref", "--short", "HEAD"]);
  return symbolic.ok && symbolic.stdout.trim() !== "" ? symbolic.stdout.trim() : "HEAD";
}
function parseGraph(stdout) {
  const rows = [];
  for (const line of stdout.split("\n")) {
    if (line.length === 0) continue;
    const sep = line.indexOf("");
    if (sep < 0) {
      rows.push({ graph: line.trimEnd(), hash: "", date: "", author: "", subject: "" });
      continue;
    }
    const fields = line.slice(sep + 1).split("");
    rows.push({
      graph: line.slice(0, sep).trimEnd(),
      hash: fields[0] ?? "",
      date: fields[1] ?? "",
      author: fields[2] ?? "",
      subject: fields.slice(3).join("")
    });
  }
  return rows;
}
async function inspect(cwd, showIgnored = false) {
  const gitDir = await runGit(cwd, ["rev-parse", "--git-dir"]);
  if (!gitDir.ok) {
    return {
      ok: true,
      repo: false,
      cwd,
      error: gitDir.stderr.trim() !== "" ? gitDir.stderr.trim().split("\n")[0] : gitDir.error ?? "not a git repository"
    };
  }
  const [branchResult, headResult, graphResult, statusResult] = await Promise.all([
    currentBranch(cwd),
    runGit(cwd, ["rev-parse", "--short", "HEAD"]),
    runGit(cwd, [
      "log",
      "--graph",
      "--all",
      "-n",
      String(MAX_GRAPH),
      // %at = 提交时间 unix 秒（任何 git 版本都支持）；客户端负责本地时区
      // 格式化（当年显示 MM-DD HH:mm，跨年显示 YYYY-MM-DD）。
      "--pretty=tformat:%x1e%h%x1f%at%x1f%an%x1f%s"
    ]),
    (() => {
      const statusArgs = ["-c", "core.quotepath=false", "--no-optional-locks", "status", "--porcelain=v1"];
      if (showIgnored) statusArgs.push("--ignored");
      return runGit(cwd, statusArgs);
    })()
  ]);
  const branch = branchResult;
  const head = headResult.ok ? headResult.stdout.trim() : "";
  const graph = graphResult.ok ? parseGraph(graphResult.stdout) : [];
  const changes = [];
  const ignored = [];
  if (statusResult.ok) {
    for (const line of statusResult.stdout.split("\n")) {
      if (line.length < 4) continue;
      const code = line.slice(0, 2);
      const path = line.slice(3);
      if (code === "!!") ignored.push(path);
      else changes.push({ code, path });
    }
  }
  return { ok: true, repo: true, cwd, branch, head, graph, changes, ignored };
}
async function initRepo(cwd) {
  const existing = await runGit(cwd, ["rev-parse", "--git-dir"]);
  if (existing.ok) return { ok: false, cwd, error: "\u8BE5\u76EE\u5F55\u5DF2\u7ECF\u662F\u4E00\u4E2A Git \u4ED3\u5E93" };
  const init = await runGit(cwd, ["init"]);
  if (!init.ok) {
    const reason = init.stderr.trim() !== "" ? init.stderr.trim().split("\n")[0] : init.error ?? "git init failed";
    return { ok: false, cwd, error: reason };
  }
  return { ok: true, cwd, branch: await currentBranch(cwd) };
}
function ignoreEntryFor(path) {
  let entry = path;
  if (entry.startsWith("#") || entry.startsWith("!")) entry = "\\" + entry;
  return entry;
}
async function addIgnore(cwd, relPath) {
  const gitIgnorePath = join(cwd, ".gitignore");
  const entry = ignoreEntryFor(relPath);
  let existing = "";
  try {
    existing = await readFile(gitIgnorePath, "utf8");
  } catch {
  }
  const lines = existing.split("\n").map((line) => line.trimEnd());
  if (lines.some((line) => line.trim() === entry || line.trim() === relPath)) {
    return { ok: true };
  }
  const prefix = existing === "" || existing.endsWith("\n") ? "" : "\n";
  await appendFile(gitIgnorePath, `${prefix}${entry}
`, "utf8");
  return { ok: true };
}
async function removeIgnore(cwd, relPath) {
  const gitIgnorePath = join(cwd, ".gitignore");
  let existing;
  try {
    existing = await readFile(gitIgnorePath, "utf8");
  } catch {
    return { ok: false, error: "\u672A\u627E\u5230 .gitignore" };
  }
  const entry = ignoreEntryFor(relPath);
  const lines = existing.split("\n");
  const kept = lines.filter((line) => line.trim() !== entry && line.trim() !== relPath);
  if (kept.length === lines.length) {
    return { ok: false, error: `\u672A\u5728 .gitignore \u4E2D\u627E\u5230 ${relPath}` };
  }
  await writeFile(gitIgnorePath, kept.join("\n").replace(/\n+$/, "") + "\n", "utf8");
  return { ok: true };
}
async function unstagePath(cwd, relPath) {
  const head = await runGit(cwd, ["rev-parse", "--verify", "--quiet", "HEAD"]);
  const result = head.ok ? await runGit(cwd, ["restore", "--staged", "--", relPath]) : await runGit(cwd, ["rm", "--cached", "--", relPath]);
  if (!result.ok) return { ok: false, error: failureReason(result, "\u53D6\u6D88\u6682\u5B58\u5931\u8D25") };
  return { ok: true };
}
function failureReason(result, fallback) {
  if (result.stderr.trim() !== "") {
    const stderr = result.stderr.trim();
    if (/user\.name|user\.email|Please tell me who you are/i.test(stderr)) {
      return '\u63D0\u4EA4\u5931\u8D25\uFF1A\u5C1A\u672A\u914D\u7F6E git \u7528\u6237\u8EAB\u4EFD\u3002\u8BF7\u5148\u5728\u7EC8\u7AEF\u6267\u884C\uFF1Agit config --global user.name "\u4F60\u7684\u540D\u5B57" \u548C git config --global user.email "you@example.com"';
    }
    return stderr.split("\n")[0];
  }
  return result.error ?? fallback;
}

// src/files.js
import { readdirSync, statSync } from "node:fs";
import { spawn as spawn2 } from "node:child_process";
import { join as join2 } from "node:path";
import { open, realpath, rename, rm } from "node:fs/promises";
function listDir(absPath) {
  let dirents;
  try {
    dirents = readdirSync(absPath, { withFileTypes: true });
  } catch (error) {
    return { ok: false, path: absPath, error: error instanceof Error ? error.message : String(error) };
  }
  const MAX_ENTRIES = 500;
  const truncated = dirents.length > MAX_ENTRIES;
  const rows = dirents.slice(0, MAX_ENTRIES).map((dirent) => {
    const isDir = dirent.isDirectory();
    const childPath = join2(absPath, dirent.name);
    let size;
    if (!isDir) {
      try {
        size = statSync(childPath).size;
      } catch {
      }
    }
    return {
      name: dirent.name,
      path: childPath,
      type: isDir ? "directory" : "file",
      ...size === void 0 ? {} : { size },
      hidden: dirent.name.startsWith(".")
    };
  });
  rows.sort((a, b) => {
    if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name, "en", { numeric: true });
  });
  return { ok: true, path: absPath, entries: rows, truncated };
}
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  "md",
  "mdx",
  "txt",
  "text",
  "ts",
  "tsx",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "mts",
  "cts",
  "json",
  "jsonc",
  "yml",
  "yaml",
  "toml",
  "html",
  "htm",
  "xml",
  "css",
  "scss",
  "less",
  "py",
  "rb",
  "go",
  "rs",
  "java",
  "c",
  "h",
  "cpp",
  "hpp",
  "cs",
  "php",
  "sh",
  "bash",
  "zsh",
  "fish",
  "bat",
  "ps1",
  "sql",
  "graphql",
  "ini",
  "conf",
  "env",
  "gitignore",
  "dockerfile",
  "lock",
  "log",
  "csv",
  "vue",
  "svelte",
  "astro",
  "prisma",
  "proto",
  "webmanifest"
]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "avif", "svg"]);
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "weba"]);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set(["mp4", "webm", "mov", "m4v", "avi", "mkv", "ogv", "ts", "m2ts"]);
function extensionOf(name2) {
  const dot = name2.lastIndexOf(".");
  return dot > 0 ? name2.slice(dot + 1).toLowerCase() : "";
}
function classifyFile(name2) {
  const ext = extensionOf(name2);
  if (ext === "") return "other";
  if (TEXT_EXTENSIONS.has(ext)) return "text";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (AUDIO_EXTENSIONS.has(ext)) return "audio";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return "other";
}
function contentTypeFor(name2) {
  const ext = extensionOf(name2);
  const table = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    bmp: "image/bmp",
    ico: "image/x-icon",
    avif: "image/avif",
    svg: "image/svg+xml",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    oga: "audio/ogg",
    m4a: "audio/mp4",
    aac: "audio/aac",
    flac: "audio/flac",
    opus: "audio/ogg",
    weba: "audio/webm",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    m4v: "video/x-m4v",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    ogv: "video/ogg",
    ts: "video/mp2t",
    m2ts: "video/mp2t",
    pdf: "application/pdf",
    json: "application/json",
    jsonc: "application/json",
    yml: "application/yaml",
    yaml: "application/yaml",
    toml: "application/toml",
    xml: "application/xml",
    html: "text/html",
    htm: "text/html",
    css: "text/css",
    csv: "text/csv"
  };
  return table[ext] ?? "application/octet-stream";
}
function looksText(buffer) {
  return !buffer.subarray(0, 8192).includes(0);
}
var MAX_TEXT_PREVIEW = 512 * 1024;
var MAX_TEXT_EDIT = 1024 * 1024;
function validatedWriteContent(content) {
  if (typeof content !== "string") return { error: "missing content" };
  if (Buffer.byteLength(content, "utf8") > MAX_TEXT_EDIT) return { error: "\u5185\u5BB9\u8D85\u8FC7 1MB \u4E0A\u9650" };
  return { content };
}
async function filePreview(absPath, full = false) {
  let stat;
  try {
    stat = statSync(absPath);
  } catch {
    return { ok: false, path: absPath, error: "\u6587\u4EF6\u4E0D\u5B58\u5728" };
  }
  if (!stat.isFile()) return { ok: false, path: absPath, error: "\u4E0D\u662F\u6587\u4EF6" };
  if (stat.size === 0) {
    return { ok: true, path: absPath, kind: "text", size: 0, content: "", truncated: false };
  }
  const fd = await open(absPath, "r");
  try {
    const probeSize = Math.min(stat.size, 8192);
    const probe = Buffer.alloc(probeSize);
    const probeRead = await fd.read(probe, 0, probeSize, 0);
    if (!looksText(probe.subarray(0, probeRead.bytesRead))) {
      return { ok: true, path: absPath, kind: "binary", size: stat.size, truncated: false };
    }
    const bound = full ? MAX_TEXT_EDIT : MAX_TEXT_PREVIEW;
    const readSize = Math.min(stat.size, bound);
    const body = Buffer.alloc(readSize);
    const bodyRead = await fd.read(body, 0, readSize, 0);
    return {
      ok: true,
      path: absPath,
      kind: "text",
      size: stat.size,
      content: body.subarray(0, bodyRead.bytesRead).toString("utf8"),
      truncated: stat.size > bound
    };
  } finally {
    await fd.close();
  }
}
async function writeFileAtomic(absPath, content) {
  let stat;
  try {
    stat = statSync(absPath);
  } catch {
    return { ok: false, path: absPath, error: "\u6587\u4EF6\u4E0D\u5B58\u5728" };
  }
  if (!stat.isFile()) return { ok: false, path: absPath, error: "\u4E0D\u662F\u6587\u4EF6" };
  let target = absPath;
  try {
    target = await realpath(absPath);
  } catch {
  }
  const tmpPath = `${target}.dwb-tmp-${process.pid}-${Date.now()}`;
  try {
    const fh = await open(tmpPath, "w", stat.mode & 511);
    try {
      await fh.writeFile(content, "utf8");
      await fh.sync();
    } finally {
      await fh.close();
    }
    await rename(tmpPath, target);
  } catch (error) {
    try {
      await rm(tmpPath, { force: true });
    } catch {
    }
    throw error;
  }
  return { ok: true, path: absPath, size: Buffer.byteLength(content, "utf8") };
}
function openInEditor(absPath) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok, error) => {
      if (!done) {
        done = true;
        resolve({ ok, error });
      }
    };
    const tryCode = () => {
      let child;
      try {
        child = spawn2("code", ["-r", absPath], { stdio: "ignore" });
      } catch {
        child = null;
      }
      if (child === null) {
        fallback();
        return;
      }
      let spawnFailed = false;
      child.on("error", () => {
        spawnFailed = true;
        fallback();
      });
      child.on("close", (code) => {
        if (spawnFailed) return;
        finish(code === 0, code === 0 ? void 0 : "VS Code \u6253\u5F00\u5931\u8D25");
      });
    };
    const fallback = () => {
      try {
        if (process.platform === "darwin") {
          spawn2("open", ["-a", "Visual Studio Code", absPath], { stdio: "ignore" }).on("error", () => finish(false, "\u672A\u627E\u5230 VS Code\uFF0C\u5DF2\u5C1D\u8BD5\u7CFB\u7EDF\u9ED8\u8BA4\u7F16\u8F91\u5668")).on("close", (code) => finish(code === 0, code === 0 ? void 0 : "VS Code \u6253\u5F00\u5931\u8D25"));
        } else {
          spawn2("xdg-open", [absPath], { stdio: "ignore" }).on("error", () => finish(false, "\u672A\u627E\u5230\u53EF\u7528\u7684\u6253\u5F00\u65B9\u5F0F\uFF08xdg-open\uFF09")).on("close", (code) => finish(code === 0, code === 0 ? void 0 : "\u6253\u5F00\u5931\u8D25"));
        }
      } catch {
        try {
          spawn2("open", [absPath], { stdio: "ignore" }).on("error", () => finish(false, "\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6")).on("close", (code) => finish(code === 0, code === 0 ? void 0 : "\u6253\u5F00\u5931\u8D25"));
        } catch {
          finish(false, "\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6");
        }
      }
    };
    tryCode();
  });
}

// src/validate.js
import { statSync as statSync2 } from "node:fs";
function validatedFilePathValue(path) {
  if (typeof path !== "string" || path.length === 0 || path[0] !== "/" || path.includes("\0")) {
    return { error: "path must be an absolute path" };
  }
  let isFile = false;
  try {
    isFile = statSync2(path).isFile();
  } catch {
  }
  if (!isFile) return { error: "not a file" };
  return { path };
}
function validatedFilePath(searchParams) {
  return validatedFilePathValue(searchParams.get("path"));
}
function validatedCwd(searchParams) {
  const cwd = searchParams.get("cwd");
  if (typeof cwd !== "string" || cwd.length === 0 || cwd[0] !== "/" || cwd.includes("\0")) {
    return { error: "cwd must be an absolute path" };
  }
  let isDir = false;
  try {
    isDir = statSync2(cwd).isDirectory();
  } catch {
  }
  if (!isDir) return { error: "not a directory" };
  return { cwd };
}
function validatedRelPath(body) {
  let path;
  try {
    path = typeof body?.path === "string" ? body.path : null;
  } catch {
    path = null;
  }
  if (path === null || path.length === 0 || path.length > 2e3 || path.includes("\0") || path.startsWith("/")) {
    return { error: "invalid path" };
  }
  if (path.split("/").some((segment) => segment === "..")) return { error: "invalid path" };
  return { path };
}
function validatedMessage(body) {
  let message;
  try {
    message = typeof body?.message === "string" ? body.message : null;
  } catch {
    message = null;
  }
  if (message === null) return { error: "missing message" };
  const trimmed = message.trim();
  if (trimmed.length === 0 || trimmed.length > 5e3 || trimmed.includes("\0")) {
    return { error: "invalid commit message" };
  }
  return { message: trimmed };
}
function readJsonBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      if (data.length < 8192) data += String(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data === "" ? "{}" : data));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
    req.on("aborted", () => resolve({}));
    req.on("close", () => resolve({}));
  });
}
function readWriteJsonBody(req) {
  const CAP = MAX_TEXT_EDIT * 6 + 16 * 1024;
  return new Promise((resolve) => {
    let data = "";
    let tooBig = false;
    req.on("data", (chunk) => {
      if (!tooBig && data.length < CAP) data += String(chunk);
      else tooBig = true;
    });
    req.on("end", () => {
      if (tooBig) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(data === "" ? "{}" : data));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
    req.on("aborted", () => resolve({}));
    req.on("close", () => resolve({}));
  });
}

// src/browser.js
var MAX_HTML_BYTES = 5 * 1024 * 1024;
var FETCH_TIMEOUT_MS = 15e3;
var ACCEPT_HEADER = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
function extractBaseHref(html, fallbackUrl) {
  const match = html.match(/<base\b[^>]*\bhref\s*=\s*(["'])([^"']*)\1/i);
  if (!match) return null;
  try {
    return new URL(match[2], fallbackUrl).href;
  } catch {
    return null;
  }
}
function directoryBaseOf(targetUrl) {
  try {
    const url = new URL(targetUrl);
    const lastSlash = url.pathname.lastIndexOf("/");
    url.pathname = lastSlash >= 0 ? url.pathname.slice(0, lastSlash + 1) : "/";
    return url.href;
  } catch {
    return targetUrl;
  }
}
function rewriteHtml(html, targetUrl) {
  const baseHref = extractBaseHref(html, targetUrl) || directoryBaseOf(targetUrl);
  let result = html;
  const escapedBase = baseHref.replace(/"/g, "&quot;");
  if (/<head\b/i.test(result)) {
    result = result.replace(/<head\b([^>]*)>/i, `<head$1><base href="${escapedBase}">`);
  } else if (/<html\b/i.test(result)) {
    result = result.replace(/<html\b([^>]*)>/i, `<html$1><head><base href="${escapedBase}"></head>`);
  } else {
    result = `<head><base href="${escapedBase}"></head>` + result;
  }
  const erudaScript = [
    '<script src="https://cdn.jsdelivr.net/npm/eruda@3/eruda.min.js"></script>',
    "<script>",
    'if (typeof eruda !== "undefined") {',
    "  eruda.init({ useShadowDOM: true });",
    "  eruda.show();",
    "}",
    "</script>"
  ].join("");
  if (/<head\b/i.test(result)) {
    result = result.replace(/<head\b([^>]*)>/i, `<head$1>${erudaScript}`);
  }
  result = result.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    const withHref = attrs.replace(/\bhref\s*=\s*(["'])([^"']*)\1/i, (hrefMatch, quote, value) => {
      if (/^(?:javascript|data|mailto|tel|about|blob):/i.test(value)) return 'href="#"';
      if (value.startsWith("#")) return hrefMatch;
      let absolute;
      try {
        absolute = new URL(value, baseHref).href;
      } catch {
        return hrefMatch;
      }
      if (!/^https?:/i.test(absolute)) return hrefMatch;
      return `href=${quote}/workbench/browser?url=${encodeURIComponent(absolute)}${quote}`;
    });
    const cleaned = withHref.replace(/\btarget\s*=\s*(["'])[^"']*\1/i, "");
    return `<a${cleaned}>`;
  });
  return result;
}
async function proxyBrowser(targetUrl) {
  let parsed;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return { ok: false, error: "\u65E0\u6548\u7684 URL" };
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    return { ok: false, error: "\u4EC5\u652F\u6301 http/https \u534F\u8BAE" };
  }
  let response;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DSH-Workbench-Browser/1.0)",
        "Accept": ACCEPT_HEADER
      }
    });
    clearTimeout(timer);
  } catch (error) {
    const reason = error.name === "AbortError" ? "\u6293\u53D6\u8D85\u65F6\uFF0815 \u79D2\uFF09" : `\u6293\u53D6\u5931\u8D25\uFF1A${error.message}`;
    return { ok: false, error: reason };
  }
  const contentType = (response.headers.get("content-type") || "").split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "text/html" && contentType !== "application/xhtml+xml" && contentType !== "application/xml") {
    return {
      ok: false,
      error: `\u4E0D\u652F\u6301\u7684\u5185\u5BB9\u7C7B\u578B\uFF1A${contentType || "unknown"}\uFF08\u4EC5\u652F\u6301 HTML \u9875\u9762\uFF0C\u56FE\u7247/PDF/\u7EAF\u6587\u672C\u7B49\u8BF7\u4F7F\u7528\u300C\u76EE\u5F55\u300D\u9884\u89C8\uFF09`
    };
  }
  const reader = response.body?.getReader();
  if (!reader) {
    return { ok: false, error: "\u6293\u53D6\u5931\u8D25\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u54CD\u5E94\u4F53" };
  }
  const chunks = [];
  let totalSize = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalSize += value.length;
      if (totalSize > MAX_HTML_BYTES) {
        await reader.cancel();
        return { ok: false, error: `\u9875\u9762\u8D85\u8FC7 ${Math.round(MAX_HTML_BYTES / 1024 / 1024)}MB \u4E0A\u9650` };
      }
      chunks.push(value);
    }
  } catch (error) {
    return { ok: false, error: `\u6293\u53D6\u5931\u8D25\uFF1A${error.message}` };
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  const finalUrl = response.url || targetUrl;
  const html = rewriteHtml(raw, finalUrl);
  return { ok: true, html };
}

// src/terminal.js
import { randomBytes } from "node:crypto";
import { chmodSync, statSync as statSync3 } from "node:fs";
import { dirname, join as join3, normalize } from "node:path";
import { fileURLToPath } from "node:url";
var MAX_TERMINAL_SESSIONS = 8;
var TERMINAL_ORPHAN_GRACE_MS = 6e4;
var TERMINAL_RING_BYTES = 256 * 1024;
var TERMINAL_EXIT_LINGER_MS = 1e4;
var TERMINAL_KILL_ESCALATE_MS = 1200;
var MIN_TERM_DIM = 2;
var MAX_TERM_COLS = 500;
var MAX_TERM_ROWS = 300;
function createOutputRing(maxBytes = TERMINAL_RING_BYTES) {
  const chunks = [];
  let bytes = 0;
  return {
    push(text) {
      if (typeof text !== "string" || text.length === 0) return;
      chunks.push(text);
      bytes += Buffer.byteLength(text);
      while (bytes > maxBytes && chunks.length > 1) {
        bytes -= Buffer.byteLength(chunks.shift());
      }
    },
    text() {
      return chunks.join("");
    },
    get size() {
      return bytes;
    },
    clear() {
      chunks.length = 0;
      bytes = 0;
    }
  };
}
function clampedTermSize(cols, rows) {
  const toInt = (value, fallback) => {
    const n = typeof value === "number" && Number.isFinite(value) ? Math.round(value) : fallback;
    return n;
  };
  const colsClamped = Math.min(MAX_TERM_COLS, Math.max(MIN_TERM_DIM, toInt(cols, 80)));
  const rowsClamped = Math.min(MAX_TERM_ROWS, Math.max(MIN_TERM_DIM, toInt(rows, 24)));
  return { cols: colsClamped, rows: rowsClamped };
}
function scrubbedEnv(extra = {}, source = process.env) {
  const env = {};
  for (const [key, value] of Object.entries(source)) {
    if (value === void 0) continue;
    if (/KEY|PASSWORD|SECRET|TOKEN/i.test(key)) continue;
    if (key.toUpperCase().startsWith("DSH_")) continue;
    env[key] = value;
  }
  return { ...env, ...extra };
}
function loginShellArgs(shell) {
  const base = shell.split("/").filter((segment) => segment !== "").pop() || "";
  if (base === "zsh" || base === "bash" || base === "fish") return ["-l"];
  return [];
}
function defaultShell(platform = process.platform) {
  const fromEnv = process.env.SHELL;
  if (typeof fromEnv === "string" && fromEnv.length > 0 && fromEnv.startsWith("/") && !fromEnv.includes("\0")) {
    return fromEnv;
  }
  if (platform === "darwin") return "/bin/zsh";
  if (platform === "win32") return process.env.COMSPEC || "cmd.exe";
  return "/bin/bash";
}
function ensureSpawnHelperExecutable() {
  if (process.platform === "win32") return;
  try {
    const resolved = import.meta.resolve("node-pty");
    const ptyLibDir = fileURLToPath(new URL(".", resolved));
    const helper = normalize(join3(ptyLibDir, "..", "prebuilds", `${process.platform}-${process.arch}`, "spawn-helper"));
    const mode = statSync3(helper).mode;
    if ((mode & 73) === 0) chmodSync(helper, mode | 493);
  } catch {
  }
}
function publicInfo(session) {
  return {
    id: session.id,
    pid: session.pid,
    shell: session.shell,
    cwd: session.cwd,
    cols: session.cols,
    rows: session.rows,
    running: !session.exited,
    exitCode: session.exited ? session.exitCode ?? null : void 0,
    exitSignal: session.exited ? session.exitSignal ?? null : void 0,
    subscribers: session.subscribers.size,
    createdAt: session.createdAt
  };
}
function createTerminalManager(options = {}) {
  const graceMs = options.orphanGraceMs ?? TERMINAL_ORPHAN_GRACE_MS;
  const maxSessions = options.maxSessions ?? MAX_TERMINAL_SESSIONS;
  const sessions = /* @__PURE__ */ new Map();
  let ptyModule = void 0;
  let ptyError = void 0;
  const loadPty = async () => {
    if (ptyModule !== void 0) return ptyModule;
    if (ptyError !== void 0) throw new Error(ptyError);
    try {
      const mod = await import("node-pty");
      ptyModule = mod.default ?? mod;
      ensureSpawnHelperExecutable();
      return ptyModule;
    } catch (error) {
      ptyError = `\u7EC8\u7AEF\u540E\u7AEF\uFF08node-pty\uFF09\u4E0D\u53EF\u7528\uFF1A${error instanceof Error ? error.message : String(error)}`;
      throw new Error(ptyError);
    }
  };
  const safeSend = (ws, frame) => {
    try {
      if (ws.readyState === 1) ws.send(frame);
    } catch {
    }
  };
  const tryClose = (ws) => {
    try {
      ws.close();
    } catch {
    }
  };
  const clearOrphanTimer = (session) => {
    if (session.orphanTimer !== void 0) {
      clearTimeout(session.orphanTimer);
      session.orphanTimer = void 0;
    }
  };
  const kill = (session) => {
    if (session.exited) return;
    clearOrphanTimer(session);
    if (process.platform === "win32") {
      try {
        session.proc.kill();
      } catch {
      }
      return;
    }
    try {
      session.proc.kill("SIGTERM");
    } catch {
    }
    const escalation = setTimeout(() => {
      if (!session.exited) {
        try {
          session.proc.kill("SIGKILL");
        } catch {
        }
      }
    }, TERMINAL_KILL_ESCALATE_MS);
    escalation.unref?.();
  };
  const scheduleOrphanKill = (session) => {
    if (session.exited || session.subscribers.size > 0 || session.orphanTimer !== void 0) return;
    session.orphanTimer = setTimeout(() => {
      session.orphanTimer = void 0;
      kill(session);
    }, graceMs);
    session.orphanTimer.unref?.();
  };
  const create = async ({ cwd, cols, rows } = {}) => {
    const pty = await loadPty();
    const live = [...sessions.values()].filter((s) => !s.exited).length;
    if (live >= maxSessions) {
      const error = new Error(`\u7EC8\u7AEF\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF08${maxSessions} \u4E2A\uFF09`);
      error.code = "limit";
      throw error;
    }
    const size = clampedTermSize(cols, rows);
    const shell = defaultShell();
    const proc = pty.spawn(shell, loginShellArgs(shell), {
      name: "xterm-256color",
      cols: size.cols,
      rows: size.rows,
      cwd,
      env: scrubbedEnv({ TERM: "xterm-256color" })
    });
    const session = {
      id: randomBytes(8).toString("hex"),
      shell,
      cwd,
      pid: proc.pid,
      cols: size.cols,
      rows: size.rows,
      proc,
      ring: createOutputRing(),
      subscribers: /* @__PURE__ */ new Set(),
      exited: false,
      exitCode: void 0,
      exitSignal: void 0,
      orphanTimer: void 0,
      createdAt: Date.now()
    };
    sessions.set(session.id, session);
    proc.onData((data) => {
      session.ring.push(data);
      const frame = JSON.stringify({ t: "o", d: data });
      for (const ws of session.subscribers) safeSend(ws, frame);
    });
    proc.onExit(({ exitCode, signal }) => {
      if (session.exited) return;
      session.exited = true;
      session.exitCode = exitCode;
      session.exitSignal = signal;
      clearOrphanTimer(session);
      const frame = JSON.stringify({ t: "exit", code: exitCode ?? null, signal: signal ?? null });
      for (const ws of session.subscribers) safeSend(ws, frame);
      const closeTimer = setTimeout(() => {
        for (const ws of [...session.subscribers]) tryClose(ws);
      }, 500);
      closeTimer.unref?.();
      const lingerTimer = setTimeout(() => {
        sessions.delete(session.id);
      }, TERMINAL_EXIT_LINGER_MS);
      lingerTimer.unref?.();
    });
    return publicInfo(session);
  };
  const get = (id) => typeof id === "string" ? sessions.get(id) : void 0;
  const list = () => [...sessions.values()].sort((a, b) => a.createdAt - b.createdAt).map(publicInfo);
  const write = (id, data) => {
    const session = get(id);
    if (session === void 0 || session.exited) return false;
    try {
      session.proc.write(data);
    } catch {
      return false;
    }
    return true;
  };
  const resize = (id, cols, rows) => {
    const session = get(id);
    if (session === void 0 || session.exited) return false;
    const size = clampedTermSize(cols, rows);
    if (size.cols === session.cols && size.rows === session.rows) return true;
    try {
      session.proc.resize(size.cols, size.rows);
    } catch {
      return false;
    }
    session.cols = size.cols;
    session.rows = size.rows;
    return true;
  };
  const killById = (id) => {
    const session = get(id);
    if (session !== void 0) kill(session);
    return true;
  };
  const attach = (session, ws) => {
    clearOrphanTimer(session);
    session.subscribers.add(ws);
    const replay = session.ring.text();
    if (replay !== "") safeSend(ws, JSON.stringify({ t: "o", d: replay }));
    if (session.exited) {
      safeSend(ws, JSON.stringify({ t: "exit", code: session.exitCode ?? null, signal: session.exitSignal ?? null }));
    }
    return () => {
      if (!session.subscribers.delete(ws)) return;
      scheduleOrphanKill(session);
    };
  };
  const dispose = () => {
    for (const session of sessions.values()) {
      clearOrphanTimer(session);
      if (session.exited) continue;
      try {
        if (process.platform === "win32") session.proc.kill();
        else session.proc.kill("SIGKILL");
      } catch {
      }
      for (const ws of [...session.subscribers]) tryClose(ws);
    }
    sessions.clear();
  };
  return { create, get, list, write, resize, kill: killById, attach, dispose };
}

// src/routes.js
function registerRoutes(ctx) {
  const sendJson = (res, code, payload) => {
    res.writeHead(code, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    });
    res.end(JSON.stringify(payload));
  };
  const sendHtml = (res, code, html) => {
    res.writeHead(code, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "referrer-policy": "no-referrer"
    });
    res.end(html);
  };
  const escapeHtml = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const mutation = (mutate, showIgnoredAfter = false) => async (req, res) => {
    if (req.method !== "POST") {
      sendJson(res, 405, { ok: false, error: "method not allowed" });
      return;
    }
    const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
    if (mediaType !== "application/json") {
      sendJson(res, 415, { ok: false, error: "content type must be application/json" });
      return;
    }
    const url = new URL(req.url ?? "/", "http://localhost");
    const validated = validatedCwd(url.searchParams);
    if (validated.error !== void 0) {
      sendJson(res, validated.error === "not a directory" ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error });
      return;
    }
    const body = await readJsonBody(req);
    const prepared = mutate(body);
    if (prepared.error !== void 0) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: prepared.error });
      return;
    }
    try {
      if (prepared.direct !== void 0) {
        const outcome = await prepared.direct(validated.cwd);
        if (outcome.ok !== true) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: outcome.error ?? "git \u64CD\u4F5C\u5931\u8D25" });
          return;
        }
      } else {
        const result = await runGit(validated.cwd, prepared.args);
        if (!result.ok) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: failureReason(result, prepared.fallback ?? "git \u64CD\u4F5C\u5931\u8D25") });
          return;
        }
      }
      sendJson(res, 200, await inspect(validated.cwd, showIgnoredAfter));
    } catch (error) {
      sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) });
    }
  };
  ctx.effect(() => {
    const offDir = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/dir",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const params = new URLSearchParams();
        params.set("cwd", url.searchParams.get("path") ?? "");
        const validated = validatedCwd(params);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a directory" ? 200 : 400, { ok: false, path: validated.cwd, error: validated.error });
          return;
        }
        sendJson(res, 200, listDir(validated.cwd));
      }
    });
    const offFile = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/file",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const validated = validatedFilePath(url.searchParams);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a file" ? 200 : 400, { ok: false, path: validated.path, error: validated.error });
          return;
        }
        try {
          sendJson(res, 200, await filePreview(validated.path, url.searchParams.get("full") === "1"));
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) });
        }
      }
    });
    const offWrite = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/write",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
        if (mediaType !== "application/json") {
          sendJson(res, 415, { ok: false, error: "content type must be application/json" });
          return;
        }
        const body = await readWriteJsonBody(req);
        if (body === null) {
          sendJson(res, 200, { ok: false, path: null, error: "\u5185\u5BB9\u8D85\u8FC7 1MB \u4E0A\u9650" });
          return;
        }
        const validated = validatedFilePathValue(body?.path);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a file" ? 200 : 400, { ok: false, path: validated.path, error: validated.error });
          return;
        }
        if (validated.path.split("/").some((segment) => segment === "..")) {
          sendJson(res, 200, { ok: false, path: validated.path, error: "invalid path" });
          return;
        }
        const checked = validatedWriteContent(body?.content);
        if (checked.error !== void 0) {
          sendJson(res, 200, { ok: false, path: validated.path, error: checked.error });
          return;
        }
        try {
          sendJson(res, 200, await writeFileAtomic(validated.path, checked.content));
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) });
        }
      }
    });
    const offOpen = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/open",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
        if (mediaType !== "application/json") {
          sendJson(res, 415, { ok: false, error: "content type must be application/json" });
          return;
        }
        const body = await readJsonBody(req);
        const validated = validatedFilePathValue(body?.path);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a file" ? 200 : 400, { ok: false, path: validated.path, error: validated.error });
          return;
        }
        if (validated.path.split("/").some((segment) => segment === "..")) {
          sendJson(res, 200, { ok: false, path: validated.path, error: "invalid path" });
          return;
        }
        try {
          sendJson(res, 200, await openInEditor(validated.path));
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: error instanceof Error ? error.message : String(error) });
        }
      }
    });
    const offAsset = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/asset",
      handler: async (req, res) => {
        if (req.method !== "GET" && req.method !== "HEAD") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const validated = validatedFilePath(url.searchParams);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a file" ? 200 : 400, { ok: false, path: validated.path, error: validated.error });
          return;
        }
        let stat;
        try {
          stat = statSync4(validated.path);
        } catch (error) {
          sendJson(res, 200, { ok: false, path: validated.path, error: `\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\uFF1A${error instanceof Error ? error.message : String(error)}` });
          return;
        }
        const contentType = contentTypeFor(validated.path);
        const range = req.headers.range;
        const match = typeof range === "string" ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null;
        if (match !== null && (match[1] !== "" || match[2] !== "")) {
          const start = match[1] === "" ? Math.max(0, stat.size - Number(match[2])) : Number(match[1]);
          const end = match[2] === "" || Number(match[2]) >= stat.size ? stat.size - 1 : Number(match[2]);
          if (start <= end && start < stat.size) {
            res.writeHead(206, {
              "content-type": contentType,
              "content-length": String(end - start + 1),
              "content-range": `bytes ${start}-${end}/${stat.size}`,
              "accept-ranges": "bytes",
              "cache-control": "no-store"
            });
            if (req.method === "HEAD") {
              res.end();
              return;
            }
            const rangeStream = createReadStream(validated.path, { start, end });
            req.on("close", () => rangeStream.destroy());
            rangeStream.on("error", () => {
              res.destroy();
            }).pipe(res);
            return;
          }
          res.writeHead(416, {
            "content-range": `bytes */${stat.size}`,
            "content-type": "application/json; charset=utf-8"
          });
          res.end(JSON.stringify({ ok: false, error: "range not satisfiable" }));
          return;
        }
        res.writeHead(200, {
          "content-type": contentType,
          "content-length": String(stat.size),
          "accept-ranges": "bytes",
          "cache-control": "no-store"
        });
        if (req.method === "HEAD") {
          res.end();
          return;
        }
        const fullStream = createReadStream(validated.path);
        req.on("close", () => fullStream.destroy());
        fullStream.on("error", () => {
          res.destroy();
        }).pipe(res);
      }
    });
    const offBrowser = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/browser",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const target = url.searchParams.get("url");
        if (typeof target !== "string" || target.length === 0) {
          sendHtml(res, 400, `<!doctype html><html><body><p>\u7F3A\u5C11 url \u53C2\u6570</p></body></html>`);
          return;
        }
        if (!/^https?:\/\//i.test(target)) {
          sendHtml(res, 400, `<!doctype html><html><body><p>\u4EC5\u652F\u6301 http/https \u534F\u8BAE</p></body></html>`);
          return;
        }
        const result = await proxyBrowser(target);
        if (!result.ok) {
          sendHtml(res, 200, `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:sans-serif;padding:24px;color:#666}</style></head><body><p>\u65E0\u6CD5\u52A0\u8F7D\u9875\u9762\uFF1A${escapeHtml(result.error)}</p></body></html>`);
          return;
        }
        sendHtml(res, 200, result.html);
      }
    });
    const offBrowserProbe = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/browser-probe",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const target = url.searchParams.get("url");
        if (typeof target !== "string" || target.length === 0 || !/^https?:\/\//i.test(target)) {
          sendJson(res, 400, { ok: false, error: "\u65E0\u6548\u7684 URL" });
          return;
        }
        try {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 8e3);
          const response = await fetch(target, {
            method: "HEAD",
            signal: ctrl.signal,
            redirect: "follow",
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
            }
          });
          clearTimeout(timer);
          const xfo = response.headers.get("x-frame-options");
          const csp = response.headers.get("content-security-policy");
          let frameAncestors;
          if (csp) {
            for (const directive of csp.split(";")) {
              const parts = directive.trim().split(/\s+/);
              if (parts[0] === "frame-ancestors") {
                const sources = parts.slice(1).filter((s) => s !== "");
                if (sources.length > 0) frameAncestors = sources;
                break;
              }
            }
          }
          sendJson(res, 200, {
            reachable: true,
            status: response.status,
            url: response.url,
            xFrameOptions: xfo || void 0,
            frameAncestors
          });
        } catch {
          sendJson(res, 200, { reachable: false });
        }
      }
    });
    const terminal = createTerminalManager();
    const terminalWss = new WebSocketServer({ noServer: true });
    const offTermCreate = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/terminal/create",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
        if (mediaType !== "application/json") {
          sendJson(res, 415, { ok: false, error: "content type must be application/json" });
          return;
        }
        const body = await readJsonBody(req);
        const validated = validatedCwd(new URLSearchParams({ cwd: typeof body?.cwd === "string" ? body.cwd : "" }));
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a directory" ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error });
          return;
        }
        try {
          sendJson(res, 200, { ok: true, ...await terminal.create({ cwd: validated.cwd, cols: body?.cols, rows: body?.rows }) });
        } catch (error) {
          sendJson(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) });
        }
      }
    });
    const offTermList = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/terminal/list",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        sendJson(res, 200, { ok: true, sessions: terminal.list() });
      }
    });
    const offTermKill = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/terminal/kill",
      handler: async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
        if (mediaType !== "application/json") {
          sendJson(res, 415, { ok: false, error: "content type must be application/json" });
          return;
        }
        const body = await readJsonBody(req);
        terminal.kill(typeof body?.id === "string" ? body.id : "");
        sendJson(res, 200, { ok: true });
      }
    });
    const TERMINAL_INPUT_MAX = 64 * 1024;
    const offTermWs = ctx.webServer.registerUpgrade({
      path: "/workbench/terminal/ws",
      handler: (req, socket, head) => {
        const origin = req.headers.origin;
        if (typeof origin === "string" && origin !== "") {
          const host = req.headers.host;
          if (origin !== `http://${host}` && origin !== `https://${host}`) {
            socket.write("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
            socket.destroy();
            return;
          }
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const session = terminal.get(url.searchParams.get("id"));
        if (session === void 0) {
          socket.write("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n");
          socket.destroy();
          return;
        }
        terminalWss.handleUpgrade(req, socket, head, (ws) => {
          const detach = terminal.attach(session, ws);
          ws.on("message", (raw) => {
            let message;
            try {
              message = JSON.parse(raw.toString());
            } catch {
              return;
            }
            if (message === null || typeof message !== "object") return;
            if (message.t === "i" && typeof message.d === "string" && message.d.length <= TERMINAL_INPUT_MAX) {
              terminal.write(session.id, message.d);
            } else if (message.t === "b" && typeof message.d === "string" && message.d.length <= TERMINAL_INPUT_MAX) {
              try {
                terminal.write(session.id, Buffer.from(message.d, "base64").toString("latin1"));
              } catch {
              }
            } else if (message.t === "r" && typeof message.cols === "number" && typeof message.rows === "number") {
              terminal.resize(session.id, message.cols, message.rows);
            }
          });
          ws.on("close", () => {
            detach();
          });
          ws.on("error", () => {
            try {
              ws.terminate();
            } catch {
            }
          });
        });
      }
    });
    const offGit = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git",
      handler: async (req, res) => {
        if (req.method !== "GET") {
          sendJson(res, 405, { ok: false, error: "method not allowed" });
          return;
        }
        const url = new URL(req.url ?? "/", "http://localhost");
        const validated = validatedCwd(url.searchParams);
        if (validated.error !== void 0) {
          sendJson(res, validated.error === "not a directory" ? 200 : 400, { ok: false, cwd: validated.cwd, error: validated.error });
          return;
        }
        try {
          sendJson(res, 200, await inspect(validated.cwd, url.searchParams.get("ignored") === "1"));
        } catch (error) {
          sendJson(res, 200, { ok: false, cwd: validated.cwd, error: error instanceof Error ? error.message : String(error) });
        }
      }
    });
    const offInit = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/init",
      handler: mutation(() => ({ direct: (cwd) => initRepo(cwd) }))
    });
    const offStage = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/stage",
      handler: mutation((body) => {
        const path = validatedRelPath(body);
        if (path.error !== void 0) return { error: path.error };
        return { args: ["add", "--", path.path], fallback: "git add \u5931\u8D25" };
      })
    });
    const offUnstage = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/unstage",
      handler: mutation((body) => {
        const path = validatedRelPath(body);
        if (path.error !== void 0) return { error: path.error };
        return { direct: (cwd) => unstagePath(cwd, path.path) };
      })
    });
    const offStageAll = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/stage-all",
      handler: mutation(() => ({ args: ["add", "-A"], fallback: "\u5168\u90E8\u6682\u5B58\u5931\u8D25" }))
    });
    const offCommit = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/commit",
      handler: mutation((body) => {
        const message = validatedMessage(body);
        if (message.error !== void 0) return { error: message.error };
        return { args: ["commit", "-m", message.message], fallback: "\u63D0\u4EA4\u5931\u8D25" };
      })
    });
    const offIgnore = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/ignore",
      handler: mutation((body) => {
        const path = validatedRelPath(body);
        if (path.error !== void 0) return { error: path.error };
        return { direct: (cwd) => addIgnore(cwd, path.path) };
      }, true)
    });
    const offUnignore = ctx.webServer.register({
      kind: "exact",
      path: "/workbench/git/unignore",
      handler: mutation((body) => {
        const path = validatedRelPath(body);
        if (path.error !== void 0) return { error: path.error };
        return { direct: (cwd) => removeIgnore(cwd, path.path) };
      }, true)
    });
    return () => {
      offDir();
      offFile();
      offWrite();
      offOpen();
      offAsset();
      offBrowser();
      offBrowserProbe();
      offTermCreate();
      offTermList();
      offTermKill();
      offTermWs();
      terminal.dispose();
      try {
        terminalWss.close();
      } catch {
      }
      offGit();
      offInit();
      offStage();
      offUnstage();
      offStageAll();
      offCommit();
      offIgnore();
      offUnignore();
    };
  }, "dsh-work: routes");
}

// src/taskboard/schedule.js
var FIELD_RANGES = [
  [0, 59],
  // minutes
  [0, 23],
  // hours
  [1, 31],
  // days
  [1, 12],
  // months
  [0, 7]
  // weekdays (7 = Sunday, normalized below)
];
function parseCron(expr) {
  if (typeof expr !== "string") return null;
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return null;
  const sets = [];
  for (let index = 0; index < 5; index++) {
    const [min, max] = FIELD_RANGES[index];
    const set = /* @__PURE__ */ new Set();
    if (!parseField(fields[index], min, max, set)) return null;
    sets.push(set);
  }
  const weekdays = /* @__PURE__ */ new Set();
  for (const day of sets[4]) weekdays.add(day === 7 ? 0 : day);
  return {
    minutes: sets[0],
    hours: sets[1],
    days: sets[2],
    months: sets[3],
    weekdays,
    // 只有字面 '*' 才算不受限字段：'1-31' 这类完全枚举仍是受限字段，
    // 必须参与 日/周 OR 语义。
    dayWildcard: fields[2] === "*",
    weekdayWildcard: fields[4] === "*"
  };
}
function isValidCron(expr) {
  return parseCron(expr) !== null;
}
function nextRunAtMs(expr, fromMs) {
  const schedule = parseCron(expr);
  if (schedule === null) return void 0;
  if (!hasPossibleCalendarDay(schedule)) return void 0;
  const from = new Date(fromMs);
  const limitMs = fromMs + 5 * 366 * 24 * 60 * 60 * 1e3;
  const sortedMinutes = [...schedule.minutes].sort((a, b) => a - b);
  const sortedHours = [...schedule.hours].sort((a, b) => a - b);
  const sortedMonths = [...schedule.months].sort((a, b) => a - b);
  let year = from.getFullYear();
  let month = from.getMonth() + 1;
  let day = from.getDate();
  let hour = from.getHours();
  let minute = from.getMinutes() + 1;
  while (new Date(year, month - 1, 1, 0, 0, 0, 0).getTime() <= limitMs) {
    for (const candidateMonth of sortedMonths) {
      if (candidateMonth < month) continue;
      const daysInMonth = new Date(year, candidateMonth, 0).getDate();
      const dayStart = candidateMonth === month ? day : 1;
      for (let candidateDay = dayStart; candidateDay <= daysInMonth; candidateDay += 1) {
        const dayProbe = new Date(year, candidateMonth - 1, candidateDay, 0, 0, 0, 0);
        if (!dayCandidate(schedule, dayProbe)) continue;
        const hourStart = candidateMonth === month && candidateDay === day ? hour : 0;
        for (const candidateHour of sortedHours) {
          if (candidateHour < hourStart) continue;
          const minuteStart = candidateMonth === month && candidateDay === day && candidateHour === hour ? minute : 0;
          for (const candidateMinute of sortedMinutes) {
            if (candidateMinute < minuteStart) continue;
            const candidate = new Date(year, candidateMonth - 1, candidateDay, candidateHour, candidateMinute, 0, 0);
            const time = candidate.getTime();
            if (time <= fromMs) continue;
            if (time > limitMs) return void 0;
            if (matches(schedule, candidate)) return time;
          }
        }
      }
    }
    year += 1;
    month = 1;
    day = 1;
    hour = 0;
    minute = 0;
  }
  return void 0;
}
function dayCandidate(schedule, date) {
  const dayMatches = schedule.days.has(date.getDate());
  const weekdayMatches = schedule.weekdays.has(date.getDay());
  if (schedule.dayWildcard) return weekdayMatches;
  if (schedule.weekdayWildcard) return dayMatches;
  return dayMatches || weekdayMatches;
}
function hasPossibleCalendarDay(schedule) {
  if (schedule.dayWildcard || !schedule.weekdayWildcard) return true;
  const maximumDay = /* @__PURE__ */ new Map([
    [1, 31],
    [2, 29],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31]
  ]);
  for (const month of schedule.months) {
    const maximum = maximumDay.get(month) ?? 0;
    if ([...schedule.days].some((day) => day <= maximum)) return true;
  }
  return false;
}
function parseField(field, min, max, out) {
  if (field === "*") {
    for (let value = min; value <= max; value++) out.add(value);
    return true;
  }
  for (const part of field.split(",")) {
    if (part === "") return false;
    const [range, stepRaw] = part.split("/");
    let low;
    let high;
    if (range === "*") {
      low = min;
      high = max;
    } else if (range.includes("-")) {
      const [a, b] = range.split("-");
      if (a === "" || b === "" || !isDigits(a) || !isDigits(b)) return false;
      low = Number(a);
      high = Number(b);
    } else if (isDigits(range)) {
      low = Number(range);
      high = Number(range);
    } else {
      return false;
    }
    if (low < min || high > max || low > high) return false;
    const step = stepRaw === void 0 ? 1 : isDigits(stepRaw) ? Number(stepRaw) : NaN;
    if (!Number.isInteger(step) || step < 1) return false;
    for (let value = low; value <= high; value += step) out.add(value);
  }
  return true;
}
function matches(schedule, date) {
  if (!schedule.minutes.has(date.getMinutes())) return false;
  if (!schedule.hours.has(date.getHours())) return false;
  if (!schedule.months.has(date.getMonth() + 1)) return false;
  return dayCandidate(schedule, date);
}
function isDigits(value) {
  return /^\d+$/.test(value);
}

// src/taskboard/ledger.js
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync as chmodSync2, closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, statSync as statSync5, unlinkSync, writeFileSync } from "node:fs";
import { dirname as dirname2, join as join5 } from "node:path";

// src/taskboard/dsh-home.js
import { homedir } from "node:os";
import { isAbsolute, join as join4 } from "node:path";
function expandHome(path, home = homedir()) {
  if (path === "~") return home;
  if (path.startsWith("~/") || path.startsWith("~\\")) return join4(home, path.slice(2));
  return path;
}
function resolveDshHome(env = process.env, home = homedir()) {
  const raw = env.DSH_HOME;
  if (raw !== void 0 && raw.trim() !== "") {
    const expanded = expandHome(raw.trim(), home);
    return isAbsolute(expanded) ? expanded : join4(process.cwd(), expanded);
  }
  return join4(home, ".dsh");
}
function dshHome() {
  return resolveDshHome();
}

// src/taskboard/domain.js
var ARCHIVABLE_STATUSES = ["done", "failed"];
var TASK_PERMISSIONS = ["read-only", "workspace-write", "danger-full-access"];
function isTaskPermission(value) {
  return typeof value === "string" && TASK_PERMISSIONS.includes(value);
}
var COLUMNS = [
  { status: "backlog", label: "\u5F85\u89C4\u5212" },
  { status: "todo", label: "\u5F85\u529E" },
  { status: "running", label: "\u8FDB\u884C\u4E2D" },
  { status: "done", label: "\u5DF2\u5B8C\u6210" },
  { status: "failed", label: "\u5DF2\u5931\u8D25" }
];
var MANUAL_STATUSES = ["backlog", "todo"];
var ALL_STATUSES = ["backlog", "todo", "running", "done", "failed"];
function isTaskStatus(value) {
  return typeof value === "string" && ALL_STATUSES.includes(value);
}
function canMoveManually(from, to) {
  return from !== "running" && MANUAL_STATUSES.includes(to);
}
function normalizeTargetId(value) {
  const trimmed = value?.trim();
  return trimmed === void 0 || trimmed === "" ? void 0 : trimmed;
}
function createTask(input, now, id) {
  return {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    prompt: input.prompt.trim(),
    status: "todo",
    createdAt: now,
    updatedAt: now,
    executions: [],
    workspaceId: normalizeTargetId(input.workspaceId),
    mode: normalizeTargetId(input.mode),
    permission: isTaskPermission(input.permission) ? input.permission : void 0
  };
}
function withStatus(task, status, now) {
  return { ...task, status, updatedAt: now };
}
function withSchedule(task, patch, now) {
  const current = task.schedule;
  const schedule = {
    enabled: current?.enabled ?? false,
    cron: current?.cron ?? "",
    nextRunAt: current?.nextRunAt,
    lastTriggeredAt: current?.lastTriggeredAt
  };
  if ("enabled" in patch) schedule.enabled = patch.enabled ?? false;
  if ("cron" in patch) schedule.cron = patch.cron ?? "";
  if ("nextRunAt" in patch) schedule.nextRunAt = patch.nextRunAt;
  if ("lastTriggeredAt" in patch) schedule.lastTriggeredAt = patch.lastTriggeredAt;
  return { ...task, updatedAt: now, schedule };
}
function startExecution(task, now, executionId) {
  const execution = {
    id: executionId,
    sessionId: void 0,
    startedAt: now,
    endedAt: void 0,
    result: void 0,
    error: void 0
  };
  return {
    task: { ...task, status: "running", updatedAt: now, executions: [...task.executions, execution] },
    execution
  };
}
function settleExecution(task, executionId, outcome, now, error) {
  const index = task.executions.findIndex((execution2) => execution2.id === executionId);
  if (index === -1) return task;
  const execution = task.executions[index];
  if (execution.endedAt !== void 0) return task;
  const settled = { ...execution, endedAt: now, result: outcome, error };
  const executions = [...task.executions];
  executions[index] = settled;
  const status = outcome === "succeeded" ? "done" : outcome === "failed" ? "failed" : task.status === "running" ? "todo" : task.status;
  return { ...task, status, updatedAt: now, executions };
}
function applyCreateTask(tasks, input, now, id) {
  if (input.title.trim() === "") return { task: void 0, tasks };
  let task = createTask(input, now, id);
  const requested = input.schedule;
  if (requested?.enabled === true && requested.cron.trim() !== "" && isValidCron(requested.cron)) {
    const cron = requested.cron.trim();
    task = withSchedule(task, { enabled: true, cron, nextRunAt: nextRunAtMs(cron, now) }, now);
  }
  return { task, tasks: [...tasks, task] };
}
function applyUpdateTask(tasks, id, patch, now) {
  return tasks.map((task) => {
    if (task.id !== id) return task;
    const workspaceId = "workspaceId" in patch ? normalizeTargetId(patch.workspaceId) : void 0;
    const mode = "mode" in patch ? normalizeTargetId(patch.mode) : void 0;
    const permission = "permission" in patch ? normalizePermission(task.permission, patch.permission) : void 0;
    const next = { ...task, ...patch, updatedAt: now };
    if (workspaceId !== void 0 || "workspaceId" in patch) next.workspaceId = workspaceId;
    if (mode !== void 0 || "mode" in patch) next.mode = mode;
    if (permission !== void 0 || "permission" in patch) next.permission = permission;
    return next;
  });
}
function normalizePermission(current, value) {
  if (value === void 0) return void 0;
  if (typeof value === "string" && value.trim() === "") return void 0;
  return isTaskPermission(value) ? value : current;
}
function applyDeleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}
function applyArchiveTask(tasks, id, now) {
  let applied = false;
  const next = tasks.map((task) => {
    if (task.id !== id || task.archivedAt !== void 0) return task;
    if (!ARCHIVABLE_STATUSES.includes(task.status)) return task;
    applied = true;
    const schedule = task.schedule === void 0 ? void 0 : { ...task.schedule, enabled: false, nextRunAt: void 0 };
    return {
      ...task,
      ...schedule === void 0 ? {} : { schedule },
      archivedAt: now,
      updatedAt: now
    };
  });
  return { tasks: next, archived: applied };
}
function applyRestoreTask(tasks, id, now) {
  let applied = false;
  const next = tasks.map((task) => {
    if (task.id !== id || task.archivedAt === void 0) return task;
    applied = true;
    const { archivedAt: _archived, ...rest } = task;
    return { ...rest, updatedAt: now };
  });
  return { tasks: next, archived: applied };
}
function applySetSchedule(tasks, id, patch, now) {
  const task = tasks.find((candidate) => candidate.id === id);
  if (task === void 0 || task.archivedAt !== void 0) return { tasks, applied: false };
  const current = task.schedule;
  const cron = (patch.cron ?? current?.cron ?? "").trim();
  if (cron === "" || !isValidCron(cron)) return { tasks, applied: false };
  const enabled = patch.enabled ?? current?.enabled ?? false;
  const nextRunAt = enabled ? nextRunAtMs(cron, now) : void 0;
  if (enabled && nextRunAt === void 0) return { tasks, applied: false };
  return {
    tasks: tasks.map((candidate) => candidate.id === id ? withSchedule(candidate, { enabled, cron, nextRunAt }, now) : candidate),
    applied: true
  };
}
function applyScheduleNextRun(tasks, id, nextRunAt, lastTriggeredAt, now) {
  return tasks.map((task) => task.id === id && task.archivedAt === void 0 && task.schedule !== void 0 ? withSchedule(task, { nextRunAt, lastTriggeredAt }, now) : task);
}

// src/taskboard/parse.js
function isTaskRecordShape(value) {
  if (typeof value !== "object" || value === null) return false;
  const record2 = value;
  if (typeof record2.id !== "string" || record2.id === "") return false;
  if (typeof record2.title !== "string") return false;
  if (typeof record2.description !== "string") return false;
  if (typeof record2.prompt !== "string") return false;
  if (typeof record2.createdAt !== "number") return false;
  if (typeof record2.updatedAt !== "number") return false;
  if (record2.workspaceId !== void 0 && typeof record2.workspaceId !== "string") return false;
  if (record2.mode !== void 0 && typeof record2.mode !== "string") return false;
  if (record2.permission !== void 0 && typeof record2.permission !== "string") return false;
  if (!Array.isArray(record2.executions)) return false;
  for (const execution of record2.executions) {
    if (typeof execution !== "object" || execution === null) return false;
    const entry = execution;
    if (typeof entry.id !== "string") return false;
    if (entry.sessionId !== void 0 && typeof entry.sessionId !== "string") return false;
    if (typeof entry.startedAt !== "number") return false;
    if (entry.endedAt !== void 0 && typeof entry.endedAt !== "number") return false;
    if (entry.result !== void 0 && entry.result !== "succeeded" && entry.result !== "failed" && entry.result !== "cancelled") return false;
    if (entry.error !== void 0 && typeof entry.error !== "string") return false;
  }
  return true;
}
function normalizeStatus(status) {
  return isTaskStatus(status) ? status : "todo";
}
function normalizeSchedule(schedule) {
  if (typeof schedule !== "object" || schedule === null) return void 0;
  const rule = schedule;
  if (typeof rule.cron !== "string") return void 0;
  if (rule.cron.trim() === "" || !isValidCron(rule.cron)) return void 0;
  return {
    enabled: rule.enabled === true,
    cron: rule.cron,
    nextRunAt: typeof rule.nextRunAt === "number" ? rule.nextRunAt : void 0,
    lastTriggeredAt: typeof rule.lastTriggeredAt === "number" ? rule.lastTriggeredAt : void 0
  };
}
function parseLedger(raw) {
  if (raw === null) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error("[dsh-work:taskboard] persisted task ledger is not valid JSON; starting empty", error);
    return [];
  }
  if (!Array.isArray(parsed)) {
    console.error("[dsh-work:taskboard] persisted task ledger is not an array; starting empty");
    return [];
  }
  const tasks = [];
  for (const row of parsed) {
    if (!isTaskRecordShape(row)) {
      console.warn("[dsh-work:taskboard] dropping invalid task row from persisted ledger", row);
      continue;
    }
    const task = { ...row, status: normalizeStatus(row.status) };
    task.schedule = normalizeSchedule(row.schedule);
    task.workspaceId = normalizeTargetId(row.workspaceId);
    task.mode = normalizeTargetId(row.mode);
    task.archivedAt = typeof row.archivedAt === "number" && Number.isFinite(row.archivedAt) ? row.archivedAt : void 0;
    task.permission = isTaskPermission(row.permission) ? row.permission : void 0;
    tasks.push(task);
  }
  return tasks;
}

// src/taskboard/ledger.js
var TASKBOARD_SCHEMA_VERSION = 2;
var MAX_REQUEST_CACHE = 256;
var PROCESS_PROBE_TIMEOUT_MS = 3e3;
function timeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
}
function cloneTasks(tasks) {
  return JSON.parse(JSON.stringify(tasks));
}
function hasOpenExecution(task) {
  return task.executions.some((execution) => execution.endedAt === void 0);
}
var DEAD_STATES = /* @__PURE__ */ new Set(["Z", "X"]);
function processState(pid) {
  if (process.platform === "linux") {
    try {
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      const end = stat.lastIndexOf(")");
      if (end === -1) return void 0;
      return stat.slice(end + 2).split(" ")[0] || void 0;
    } catch {
      return void 0;
    }
  }
  if (process.platform === "win32") return void 0;
  try {
    const probe = spawnSync("ps", ["-o", "stat=", "-p", String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS });
    if (probe.status !== 0 || probe.stdout.length === 0) return void 0;
    const state = probe.stdout.toString("utf8").trim();
    return state.length > 0 ? state[0] : void 0;
  } catch {
    return void 0;
  }
}
function processIsAlive(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false;
  const state = processState(pid);
  if (state !== void 0 && DEAD_STATES.has(state)) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code !== "ESRCH";
  }
}
function linuxStartTimeMs(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const end = stat.lastIndexOf(")");
    if (end === -1) return void 0;
    const ticks = Number(stat.slice(end + 2).split(" ")[19]);
    if (!Number.isFinite(ticks)) return void 0;
    const bootMatch = /^btime\s+(\d+)/m.exec(readFileSync("/proc/stat", "utf8"));
    if (bootMatch === null) return void 0;
    const btime = Number(bootMatch[1]);
    if (!Number.isFinite(btime)) return void 0;
    return btime * 1e3 + ticks * 1e3 / 100;
  } catch {
    return void 0;
  }
}
var ownStartTime;
var ownStartTimeResolved = false;
function processStartTimeMs(pid) {
  if (process.platform === "linux") return linuxStartTimeMs(pid);
  if (process.platform === "win32") {
    const probe2 = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        "[DateTimeOffset]::FromFileTime((Get-Process -Id " + String(pid) + " -ErrorAction SilentlyContinue).StartTime.ToUniversalTime().ToFileTime()).ToUnixTimeMilliseconds()"
      ],
      { timeout: PROCESS_PROBE_TIMEOUT_MS, windowsHide: true }
    );
    if (probe2.status !== 0 || probe2.stdout.length === 0) return void 0;
    const started = Number(probe2.stdout.toString("utf8").trim());
    return Number.isFinite(started) ? started : void 0;
  }
  const env = { ...process.env, LC_ALL: "C" };
  const probe = spawnSync("ps", ["-o", "lstart=", "-p", String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS, env });
  if (probe.status === 0 && probe.stdout.length > 0) {
    const started = Date.parse(probe.stdout.toString("utf8").trim());
    if (Number.isFinite(started)) return started;
  }
  const elapsed = spawnSync("ps", ["-o", "etimes=", "-p", String(pid)], { timeout: PROCESS_PROBE_TIMEOUT_MS, env });
  if (elapsed.status !== 0 || elapsed.stdout.length === 0) return void 0;
  const seconds = Number(elapsed.stdout.toString("utf8").trim());
  if (!Number.isFinite(seconds)) return void 0;
  return Date.now() - seconds * 1e3;
}
function ownProcessStartTimeMs() {
  if (!ownStartTimeResolved) {
    ownStartTimeResolved = true;
    ownStartTime = processStartTimeMs(process.pid);
  }
  return ownStartTime;
}
var LEGACY_START_TOLERANCE_MS = 2e3;
function startTimeMismatch(recorded, actual, exact) {
  return exact ? recorded !== actual : Math.abs(recorded - actual) > LEGACY_START_TOLERANCE_MS;
}
function parseHostTasks(values) {
  const rawById = /* @__PURE__ */ new Map();
  for (const value of values) {
    if (typeof value !== "object" || value === null) continue;
    if (typeof value.id === "string") rawById.set(value.id, value);
  }
  return parseLedger(JSON.stringify(values)).map((task) => {
    const rawSchedule = rawById.get(task.id)?.schedule;
    if (typeof rawSchedule !== "object" || rawSchedule === null) return task;
    if (typeof rawSchedule.cron !== "string" || isValidCron(rawSchedule.cron)) return task;
    return {
      ...task,
      schedule: {
        enabled: false,
        cron: rawSchedule.cron,
        nextRunAt: void 0,
        lastTriggeredAt: typeof rawSchedule.lastTriggeredAt === "number" && Number.isFinite(rawSchedule.lastTriggeredAt) ? rawSchedule.lastTriggeredAt : void 0
      }
    };
  });
}
var TaskboardLedger = class {
  #document;
  #listeners = /* @__PURE__ */ new Set();
  #requestCache = /* @__PURE__ */ new Map();
  #lockToken = crypto.randomUUID();
  #lockFd;
  #now;
  /** 账本主文件。 */
  file;
  /** 目录锁文件（同一时间只允许一个 Host 进程持有）。 */
  lockFile;
  /** 30s 调度心跳的小型旁车文件（仅 lastTickAt）。 */
  schedulerFile;
  /**
   * @param {string} [dir] 账本目录，缺省 $DSH_HOME/dsh-work。
   * @param {() => number} [now] 时钟（测试缝）。
   */
  constructor(dir = join5(dshHome(), "dsh-work"), now = Date.now) {
    this.#now = now;
    mkdirSync(dir, { recursive: true });
    this.file = join5(dir, "taskboard-ledger.json");
    this.lockFile = join5(dir, "taskboard-ledger.lock");
    this.schedulerFile = join5(dir, "taskboard-scheduler.json");
    this.#lockFd = this.#acquireLock();
    try {
      this.#document = this.#load(dir);
      for (const request2 of this.#document.recentRequests) {
        this.#requestCache.set(request2.requestId, { fingerprint: request2.fingerprint });
      }
      this.#repairSchedules(true);
      this.#reconcileInterruptedStarts();
      this.#commit(false);
    } catch (error) {
      this.dispose();
      throw error;
    }
  }
  /** revision + scheduler，不克隆任务；供轮询轻量比对。 */
  summary() {
    return { revision: this.#document.revision, scheduler: { ...this.#document.scheduler } };
  }
  state() {
    const { revision, scheduler } = this.summary();
    return { revision, tasks: cloneTasks(this.#document.tasks), scheduler };
  }
  subscribe(listener) {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }
  dispose() {
    const fd = this.#lockFd;
    if (fd === void 0) return;
    this.#lockFd = void 0;
    closeSync(fd);
    try {
      const owner = JSON.parse(readFileSync(this.lockFile, "utf8"));
      if (owner.token === this.#lockToken) unlinkSync(this.lockFile);
    } catch {
    }
  }
  /**
   * 幂等应用一个动作：相同 requestId + 相同指纹的重放直接返回当前状态；
   * 相同 requestId 携带不同动作视为错误。
   */
  applyRequest(requestId, action) {
    const fingerprint = createHash("sha256").update(JSON.stringify(action)).digest("hex");
    const cached = this.#requestCache.get(requestId);
    if (cached !== void 0) {
      if (cached.fingerprint !== fingerprint) throw new Error("request id was reused with a different action");
      return { state: this.state() };
    }
    this.#requestCache.set(requestId, { fingerprint });
    while (this.#requestCache.size > MAX_REQUEST_CACHE) this.#requestCache.delete(this.#requestCache.keys().next().value);
    this.#syncRecentRequests();
    try {
      return this.#apply(action);
    } catch (error) {
      this.#requestCache.delete(requestId);
      this.#syncRecentRequests();
      throw error;
    }
  }
  /** 调度器触发：任务空闲则开启执行，运行中则只滚动 nextRunAt。 */
  openScheduled(taskId, nextRunAt, triggeredAt) {
    const task = this.#document.tasks.find((item) => item.id === taskId);
    if (task === void 0 || task.archivedAt !== void 0) return void 0;
    let opened;
    if (task.status !== "running" && !hasOpenExecution(task)) {
      opened = startExecution(task, triggeredAt, crypto.randomUUID());
      this.#document.tasks = this.#document.tasks.map((item) => item.id === taskId ? opened.task : item);
    }
    if (nextRunAt === void 0) {
      this.#disarmSchedule(taskId, `schedule disabled for task: ${taskId} (no reachable next run)`, triggeredAt);
    } else {
      this.#document.tasks = [...applyScheduleNextRun(
        this.#document.tasks,
        taskId,
        nextRunAt,
        opened === void 0 ? task.schedule?.lastTriggeredAt : triggeredAt,
        triggeredAt
      )];
    }
    this.#commit();
    return opened;
  }
  /** 错过触发点一律跳过：从当前时刻滚动 nextRunAt，不补跑。 */
  skipMissed(now) {
    let changed = false;
    this.#document.tasks = this.#document.tasks.map((task) => {
      const schedule = task.schedule;
      if (schedule === void 0 || !schedule.enabled || schedule.nextRunAt === void 0 || schedule.nextRunAt > now) return task;
      changed = true;
      const next = nextRunAtMs(schedule.cron, now);
      if (next === void 0) {
        this.#document.scheduler = { ...this.#document.scheduler, error: `schedule disabled for task: ${task.id} (no reachable next run)` };
        return { ...task, schedule: { ...schedule, enabled: false, nextRunAt: void 0 }, updatedAt: now };
      }
      return { ...task, schedule: { ...schedule, nextRunAt: next }, updatedAt: now };
    });
    if (changed) this.#commit();
  }
  /** 解除武装一条调度并记录调度错误（不提交，由调用方统一 commit）。 */
  #disarmSchedule(taskId, reason, now) {
    this.#document.tasks = this.#document.tasks.map((item) => item.id !== taskId || item.schedule === void 0 ? item : {
      ...item,
      schedule: { ...item.schedule, enabled: false, nextRunAt: void 0 },
      updatedAt: now
    });
    this.#document.scheduler = { ...this.#document.scheduler, error: reason };
  }
  setScheduler(patch) {
    this.#document.scheduler = { ...this.#document.scheduler, ...patch };
    if (patch.lastTickAt !== void 0 && Object.keys(patch).every((key) => key === "lastTickAt")) {
      this.#writeSchedulerSidecar();
      return;
    }
    this.#commit(false);
  }
  attachSession(taskId, executionId, sessionId) {
    const now = this.#now();
    this.#document.tasks = this.#document.tasks.map((task) => task.id !== taskId ? task : {
      ...task,
      updatedAt: now,
      executions: task.executions.map((entry) => entry.id === executionId ? { ...entry, sessionId } : entry)
    });
    this.#commit();
  }
  settle(taskId, executionId, outcome, error) {
    this.#document.tasks = this.#document.tasks.map((task) => task.id === taskId ? settleExecution(task, executionId, outcome, this.#now(), error) : task);
    this.#commit();
  }
  #apply(action) {
    const now = this.#now();
    let run;
    switch (action.kind) {
      case "create": {
        if (this.#document.tasks.some((task) => task.id === action.id)) throw new Error("task id already exists");
        if (action.input.schedule?.enabled === true && (!isValidCron(action.input.schedule.cron) || nextRunAtMs(action.input.schedule.cron, now) === void 0)) {
          throw new Error("invalid schedule");
        }
        const result = applyCreateTask(this.#document.tasks, action.input, now, action.id);
        if (result.task === void 0) throw new Error("invalid task");
        this.#document.tasks = [...result.tasks];
        break;
      }
      case "update": {
        const task = this.#document.tasks.find((task2) => task2.id === action.taskId);
        if (task === void 0) throw new Error("task not found");
        if (task.archivedAt !== void 0) throw new Error("archived task is read-only");
        if ("title" in action.patch && action.patch.title.trim() === "") throw new Error("task title must not be empty");
        this.#document.tasks = [...applyUpdateTask(this.#document.tasks, action.taskId, action.patch, now)];
        break;
      }
      case "delete": {
        const task = this.#document.tasks.find((task2) => task2.id === action.taskId);
        if (task === void 0) throw new Error("task not found");
        if (task.status === "running" || hasOpenExecution(task)) throw new Error("running task cannot be deleted");
        this.#document.tasks = [...applyDeleteTask(this.#document.tasks, action.taskId)];
        break;
      }
      case "move": {
        const task = this.#document.tasks.find((item) => item.id === action.taskId);
        if (task === void 0) throw new Error("task not found");
        if (task.archivedAt !== void 0) throw new Error("archived task is read-only");
        if (task.status === "running" || hasOpenExecution(task)) throw new Error("running task cannot be moved");
        if (!canMoveManually(task.status, action.status)) throw new Error("invalid manual status");
        this.#document.tasks = this.#document.tasks.map((item) => item.id === action.taskId ? withStatus(item, action.status, now) : item);
        break;
      }
      case "archive": {
        const result = applyArchiveTask(this.#document.tasks, action.taskId, now);
        if (!result.archived) throw new Error("task cannot be archived");
        this.#document.tasks = [...result.tasks];
        break;
      }
      case "restore": {
        const result = applyRestoreTask(this.#document.tasks, action.taskId, now);
        if (!result.archived) throw new Error("task is not archived");
        this.#document.tasks = [...result.tasks];
        break;
      }
      case "set-schedule": {
        const task = this.#document.tasks.find((task2) => task2.id === action.taskId);
        if (task?.archivedAt !== void 0) throw new Error("archived task is read-only");
        const result = applySetSchedule(this.#document.tasks, action.taskId, action.patch, now);
        if (!result.applied) throw new Error("invalid schedule");
        this.#document.tasks = [...result.tasks];
        break;
      }
      case "rerun":
      case "run": {
        const task = this.#document.tasks.find((item) => item.id === action.taskId);
        if (task?.archivedAt !== void 0) throw new Error("archived task is read-only");
        if (task === void 0 || task.status === "running" || hasOpenExecution(task)) throw new Error("task is already running or missing");
        const base = action.kind === "rerun" ? withStatus(task, "todo", now) : task;
        run = startExecution(base, now, crypto.randomUUID());
        this.#document.tasks = this.#document.tasks.map((item) => item.id === task.id ? run.task : item);
        break;
      }
      default:
        throw new Error(`unknown action kind: ${action.kind}`);
    }
    this.#commit();
    return { state: this.state(), ...run === void 0 ? {} : { run } };
  }
  /** 修复已启用调度的 nextRunAt；无法匹配的 cron 解除武装并记录调度错误。 */
  #repairSchedules(skipPast, persist = true) {
    const now = this.#now();
    let changed = false;
    this.#document.tasks = this.#document.tasks.map((task) => {
      const schedule = task.schedule;
      if (schedule === void 0 || !schedule.enabled) return task;
      if (!skipPast && schedule.nextRunAt !== void 0) return task;
      const next = nextRunAtMs(schedule.cron, now);
      if (next === void 0) {
        changed = true;
        this.#document.scheduler.error = `invalid cron disabled for task: ${task.id}`;
        return { ...task, schedule: { ...schedule, enabled: false, nextRunAt: void 0 }, updatedAt: now };
      }
      if (schedule.nextRunAt === next) return task;
      changed = true;
      return { ...task, schedule: { ...schedule, nextRunAt: next }, updatedAt: now };
    });
    if (changed && persist) this.#commit();
  }
  /**
   * 确定性恢复：已有 session id 的 running execution 重启后继续观察；
   * 没有 session id 的启动中断取消且不重发。
   */
  #reconcileInterruptedStarts(persist = true) {
    const now = this.#now();
    let changed = false;
    this.#document.tasks = this.#document.tasks.map((task) => {
      if (task.status !== "running") return task;
      const execution = task.executions.at(-1);
      if (execution === void 0 || execution.endedAt !== void 0 || execution.sessionId !== void 0) return task;
      changed = true;
      return settleExecution(task, execution.id, "cancelled", now, "host restarted before the execution session was recorded");
    });
    if (changed && persist) this.#commit();
  }
  #load(dir) {
    const existed = existsSync(this.file);
    try {
      const parsed = JSON.parse(readFileSync(this.file, "utf8"));
      if (parsed.schemaVersion !== TASKBOARD_SCHEMA_VERSION || !Array.isArray(parsed.tasks)) throw new Error("unsupported ledger schema");
      const tasks = parseHostTasks(parsed.tasks);
      const invalidScheduleIds = parsed.tasks.flatMap((value) => {
        if (typeof value !== "object" || value === null) return [];
        if (typeof value.schedule !== "object" || value.schedule === null) return [];
        const cron = value.schedule.cron;
        return typeof cron !== "string" || !isValidCron(cron) ? [typeof value.id === "string" ? value.id : "unknown"] : [];
      });
      const documentLastTickAt = typeof parsed.scheduler?.lastTickAt === "number" ? parsed.scheduler.lastTickAt : void 0;
      const sidecarLastTickAt = this.#readSchedulerSidecar();
      const lastTickAt = sidecarLastTickAt === void 0 || documentLastTickAt !== void 0 && documentLastTickAt >= sidecarLastTickAt ? documentLastTickAt : sidecarLastTickAt;
      return {
        schemaVersion: TASKBOARD_SCHEMA_VERSION,
        revision: Number.isSafeInteger(parsed.revision) && parsed.revision >= 0 ? parsed.revision : 0,
        tasks,
        scheduler: {
          timeZone: timeZone(),
          ...lastTickAt === void 0 ? {} : { lastTickAt },
          // 持久化的调度错误不跨重启携带：加载期修复（invalidScheduleIds 与
          // #repairSchedules）会重新发现仍然成立的问题；已随隔离文件消除或
          // 已被用户处理掉的陈旧错误不再上屏。
          ...invalidScheduleIds.length > 0 ? { error: `invalid cron disabled for task(s): ${invalidScheduleIds.join(", ")}` } : {}
        },
        recentRequests: Array.isArray(parsed.recentRequests) ? parsed.recentRequests.flatMap((entry) => {
          if (typeof entry !== "object" || entry === null) return [];
          return typeof entry.requestId === "string" && entry.requestId !== "" && typeof entry.fingerprint === "string" ? [{ requestId: entry.requestId, fingerprint: entry.fingerprint }] : [];
        }).slice(-MAX_REQUEST_CACHE) : []
      };
    } catch (error) {
      if (existed) renameSync(this.file, `${this.file}.corrupt-${this.#now()}-${process.pid}-${crypto.randomUUID()}`);
      mkdirSync(dir, { recursive: true });
      return {
        schemaVersion: TASKBOARD_SCHEMA_VERSION,
        revision: 0,
        tasks: [],
        scheduler: { timeZone: timeZone(), ...existed ? { error: `corrupt ledger was quarantined: ${error instanceof Error ? error.message : String(error)}` } : {} },
        recentRequests: []
      };
    }
  }
  #syncRecentRequests() {
    this.#document.recentRequests = [...this.#requestCache].map(([requestId, request2]) => ({
      requestId,
      fingerprint: request2.fingerprint
    }));
  }
  #readSchedulerSidecar() {
    try {
      const parsed = JSON.parse(readFileSync(this.schedulerFile, "utf8"));
      return typeof parsed.lastTickAt === "number" && Number.isFinite(parsed.lastTickAt) ? parsed.lastTickAt : void 0;
    } catch {
      return void 0;
    }
  }
  /** 原子写入调度心跳旁车（0600，tmp + rename + fsync）。 */
  #writeSchedulerSidecar() {
    const payload = JSON.stringify({ lastTickAt: this.#document.scheduler.lastTickAt });
    mkdirSync(dirname2(this.schedulerFile), { recursive: true });
    const tmp = `${this.schedulerFile}.tmp-${process.pid}-${this.#lockToken.slice(0, 8)}`;
    let fd;
    try {
      fd = openSync(tmp, "w", 384);
      writeFileSync(fd, payload, { encoding: "utf8" });
      fsyncSync(fd);
      closeSync(fd);
      fd = void 0;
      try {
        chmodSync2(tmp, 384);
      } catch {
      }
      renameSync(tmp, this.schedulerFile);
      try {
        const dirFd = openSync(dirname2(this.schedulerFile), "r");
        try {
          fsyncSync(dirFd);
        } finally {
          closeSync(dirFd);
        }
      } catch {
      }
    } catch (error) {
      if (fd !== void 0) closeSync(fd);
      try {
        unlinkSync(tmp);
      } catch {
      }
      throw error;
    }
    this.#notify();
  }
  #commit(bumpRevision = true) {
    if (bumpRevision) this.#document.revision += 1;
    mkdirSync(dirname2(this.file), { recursive: true });
    const tmp = `${this.file}.tmp-${process.pid}-${this.#lockToken.slice(0, 8)}`;
    let fd;
    try {
      fd = openSync(tmp, "w", 384);
      writeFileSync(fd, JSON.stringify(this.#document, null, 2), { encoding: "utf8" });
      fsyncSync(fd);
      closeSync(fd);
      fd = void 0;
      try {
        chmodSync2(tmp, 384);
      } catch {
      }
      renameSync(tmp, this.file);
      try {
        const dirFd = openSync(dirname2(this.file), "r");
        try {
          fsyncSync(dirFd);
        } finally {
          closeSync(dirFd);
        }
      } catch {
      }
    } catch (error) {
      if (fd !== void 0) closeSync(fd);
      try {
        unlinkSync(tmp);
      } catch {
      }
      throw error;
    }
    this.#notify();
  }
  #notify() {
    for (const listener of [...this.#listeners]) listener();
  }
  /**
   * 目录锁：同一时间只有一个 Host 进程能持有账本目录。第二个使用同一
   * DSH home 的 Host 失败关闭，不并发写账本。锁记录 PID 与进程启动时刻，
   * 用于识别崩溃残留 + PID 复用的陈旧锁。
   */
  #acquireLock() {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      let fd;
      try {
        fd = openSync(this.lockFile, "wx", 384);
        const probe = process.platform === "linux" || process.platform === "win32" ? "exact" : "legacy";
        writeFileSync(fd, JSON.stringify({ pid: process.pid, token: this.#lockToken, startedAt: ownProcessStartTimeMs(), probe }), { encoding: "utf8" });
        fsyncSync(fd);
        try {
          chmodSync2(this.lockFile, 384);
        } catch {
        }
        const held = fd;
        fd = void 0;
        return held;
      } catch (error) {
        if (fd !== void 0) {
          try {
            closeSync(fd);
          } catch {
          }
          try {
            unlinkSync(this.lockFile);
          } catch {
          }
        }
        if (error.code !== "EEXIST") throw error;
        let raw;
        try {
          raw = readFileSync(this.lockFile, "utf8");
        } catch (readError) {
          if (readError.code === "ENOENT") continue;
          throw readError;
        }
        if (raw.trim() === "") {
          try {
            unlinkSync(this.lockFile);
          } catch (unlinkError) {
            if (unlinkError.code !== "ENOENT") throw unlinkError;
          }
          continue;
        }
        let pid;
        let ownerStartedAt;
        let ownerExact = false;
        try {
          const owner = JSON.parse(raw);
          if (typeof owner.pid === "number") pid = owner.pid;
          if (typeof owner.startedAt === "number") ownerStartedAt = owner.startedAt;
          ownerExact = owner.probe === "exact";
        } catch {
          throw new Error(`taskboard ledger lock is unreadable: ${this.lockFile}; if this is a leftover from an unclean shutdown and no other DSH host is running, remove it manually and retry`);
        }
        if (pid !== void 0 && processIsAlive(pid)) {
          const actualStartedAt = pid === process.pid ? ownProcessStartTimeMs() : processStartTimeMs(pid);
          const staleReuse = actualStartedAt !== void 0 && (ownerStartedAt !== void 0 ? startTimeMismatch(ownerStartedAt, actualStartedAt, ownerExact) : (() => {
            try {
              return statSync5(this.lockFile).mtimeMs < actualStartedAt;
            } catch {
              return true;
            }
          })());
          if (!staleReuse) {
            const confirmedOwner = ownerStartedAt !== void 0 && actualStartedAt !== void 0 && !startTimeMismatch(ownerStartedAt, actualStartedAt, ownerExact);
            const hint = confirmedOwner ? "" : `; if this PID was reused after a crash and no other DSH host is running, remove ${this.lockFile} manually and retry`;
            throw new Error(`taskboard ledger is already owned by process ${pid}${hint}`);
          }
        }
        try {
          unlinkSync(this.lockFile);
        } catch (unlinkError) {
          if (unlinkError.code !== "ENOENT") throw unlinkError;
        }
      }
    }
    throw new Error(`taskboard ledger lock could not be acquired: ${this.lockFile}`);
  }
};

// src/taskboard/runner.js
function request(payload) {
  return { rpcId: `dsh-work-taskboard-${crypto.randomUUID()}`, payload };
}
function failure(error) {
  return new Error(`${error.code}: ${error.message}`);
}
function isErrorTurnEnd(data) {
  if (typeof data !== "object" || data === null) return false;
  const reason = data.reason;
  return typeof reason === "object" && reason !== null && reason.kind === "error";
}
var SessionLaunchError = class extends Error {
  constructor(sessionId, cause) {
    super(`execution session ${sessionId} failed during launch: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
    this.name = "SessionLaunchError";
    this.sessionId = sessionId;
  }
};
var TaskboardRunner = class {
  /**
   * @param {object} api Host apiProxy 面（sessions/workspace/agentPresets）。
   * @param {{ execute(sessionId: string, line: string, signal: AbortSignal): Promise<object | undefined> }} [commands] 权限命令派发器。
   */
  constructor(api, commands) {
    this.#api = api;
    this.#commands = commands;
  }
  #api;
  #commands;
  /** 启动一次执行：新建独立会话并发送任务 Prompt。返回 sessionId。 */
  async launch(task) {
    if (task.workspaceId !== void 0) {
      const workspaces = await this.#api.workspace.list(request({}));
      if (!workspaces.result.ok) throw failure(workspaces.result.error);
      if (!workspaces.result.value.items.some((item) => item.workspaceId === task.workspaceId)) {
        throw new Error(`workspace not found: ${task.workspaceId}`);
      }
    }
    if (task.mode !== void 0) {
      const presets = await this.#api.agentPresets.list(request({}));
      if (!presets.result.ok) throw failure(presets.result.error);
      const preset = presets.result.value.presets.find((item) => item.id === task.mode);
      if (preset === void 0) throw new Error(`agent preset not found: ${task.mode}`);
      if (preset.broken !== void 0) throw new Error(`agent preset is unavailable: ${preset.broken}`);
    }
    const created = await this.#api.sessions.create(request({
      ...task.workspaceId === void 0 ? {} : { workspaceId: task.workspaceId },
      ...task.mode === void 0 ? {} : { agentPreset: task.mode }
    }));
    if (!created.result.ok) throw failure(created.result.error);
    const sessionId = created.result.value.sessionId;
    try {
      const renamed = await this.#api.sessions.rename(request({ sessionId, title: task.title }));
      if (!renamed.result.ok) throw failure(renamed.result.error);
      if (task.permission !== void 0) {
        if (this.#commands === void 0) throw new Error("permission command dispatcher is unavailable");
        const command = await this.#commands.execute(sessionId, `/permission ${task.permission}`, AbortSignal.timeout(3e4));
        if (command === void 0) throw new Error("permission command was not acknowledged");
        if (command.kind !== "success") throw new Error(command.text ?? "permission command failed");
      }
      const prompt = await this.#api.sessions.prompt(request({
        sessionId,
        mode: "queue",
        content: [{ type: "text", text: task.prompt !== "" ? task.prompt : task.title }]
      }));
      if (!prompt.result.ok) throw failure(prompt.result.error);
    } catch (error) {
      throw new SessionLaunchError(sessionId, error);
    }
    return sessionId;
  }
  /** 运行中会话计数与列表（失败时 known:false，电源/对账保守处理）。 */
  async listRunning() {
    try {
      const response = await this.#api.sessions.list(request({}));
      return response.result.ok ? { known: true, count: response.result.value.items.filter((item) => item.running).length, items: response.result.value.items } : { known: false };
    } catch {
      return { known: false };
    }
  }
  /**
   * 判定一次执行的结果。调用方可传入本 tick 已取到的会话列表，避免 1+E 次 list RPC。
   * @returns {Promise<{ outcome: 'pending' } | { outcome: 'succeeded' } | { outcome: 'failed', error: string } | { outcome: 'cancelled', error: string }>}
   */
  async inspect(sessionId, startedAt = 0, sessions) {
    let items;
    if (sessions !== void 0) {
      items = sessions;
    } else {
      const response = await this.#api.sessions.list(request({}));
      if (!response.result.ok) return { outcome: "pending" };
      items = response.result.value.items;
    }
    const summary = items.find((item) => item.sessionId === sessionId);
    if (summary === void 0) return { outcome: "cancelled", error: "execution session no longer exists" };
    if (summary.running) return { outcome: "pending" };
    const events = [];
    let beforeSeq;
    let reachedExecutionBoundary = false;
    for (let page = 0; page < 100; page += 1) {
      const history = await this.#api.sessions.history(request({
        sessionId: summary.sessionId,
        maxMessages: 100,
        ...beforeSeq === void 0 ? {} : { beforeSeq }
      }));
      if (!history.result.ok) return { outcome: "pending" };
      events.push(...history.result.value.events);
      const oldestTime = history.result.value.events.reduce((oldest, entry) => {
        const time = entry.event.time;
        return typeof time !== "number" ? oldest : oldest === void 0 ? time : Math.min(oldest, time);
      }, void 0);
      if (!history.result.value.hasMore || oldestTime !== void 0 && oldestTime <= startedAt) {
        reachedExecutionBoundary = true;
        break;
      }
      const oldestSeq = history.result.value.events.reduce((oldest, entry) => {
        const seq = entry.event.seq;
        return typeof seq !== "number" ? oldest : oldest === void 0 ? seq : Math.min(oldest, seq);
      }, void 0);
      if (oldestSeq === void 0 || oldestSeq === beforeSeq) return { outcome: "pending" };
      beforeSeq = oldestSeq;
    }
    if (!reachedExecutionBoundary) return { outcome: "pending" };
    const turnEnd = events.filter((entry) => entry.event.type === "turn/end" && (startedAt <= 0 || typeof entry.event.time === "number" && entry.event.time >= startedAt)).sort((a, b) => (a.event.seq ?? Number.MAX_SAFE_INTEGER) - (b.event.seq ?? Number.MAX_SAFE_INTEGER))[0];
    if (turnEnd === void 0) {
      return { outcome: "cancelled", error: "session stopped without a turn/end event" };
    }
    return isErrorTurnEnd(turnEnd.event.data) ? { outcome: "failed", error: "agent turn ended with an error" } : { outcome: "succeeded" };
  }
};

// src/taskboard/service.js
var SESSION_POLL_MS = 5e3;
var SCHEDULE_TICK_MS = 3e4;
var RESUME_GAP_MS = SCHEDULE_TICK_MS + 15e3;
var TaskboardHostService = class {
  #listeners = /* @__PURE__ */ new Set();
  #timers = [];
  #lastScheduleTick;
  #disposed = false;
  #pollInFlight = false;
  #tickInFlight = false;
  #now;
  /**
   * @param {object} api Host apiProxy 面。
   * @param {{ ledger?: TaskboardLedger, now?: () => number, commandDispatcher?: object }} [options]
   */
  constructor(api, options = {}) {
    this.ledger = options.ledger ?? new TaskboardLedger();
    this.runner = new TaskboardRunner(api, options.commandDispatcher);
    this.#now = options.now ?? Date.now;
    this.ledger.subscribe(() => {
      this.#emit();
    });
  }
  start() {
    if (this.#disposed || this.#timers.length > 0) return;
    this.#timers.push(setInterval(() => {
      this.#schedulePoll();
    }, SESSION_POLL_MS));
    this.#timers.push(setInterval(() => {
      this.#scheduleTick(false);
    }, SCHEDULE_TICK_MS));
    this.#schedulePoll();
    this.#scheduleTick(true);
  }
  snapshot() {
    const state = this.ledger.state();
    return {
      schemaVersion: 2,
      revision: state.revision,
      tasks: state.tasks,
      scheduler: state.scheduler
    };
  }
  subscribe(listener) {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }
  /** 幂等应用浏览器动作，返回完整 revision snapshot。 */
  apply(requestId, action) {
    const result = this.ledger.applyRequest(requestId, action);
    if (result.run !== void 0) this.#scheduleLaunch(result.run);
    return {
      schemaVersion: 2,
      revision: result.state.revision,
      tasks: result.state.tasks,
      scheduler: result.state.scheduler
    };
  }
  dispose() {
    this.#disposed = true;
    for (const timer of this.#timers.splice(0)) clearInterval(timer);
    this.ledger.dispose();
    this.#listeners.clear();
  }
  async #launch(opened) {
    try {
      const sessionId = await this.runner.launch(opened.task);
      if (this.#disposed) return;
      this.ledger.attachSession(opened.task.id, opened.execution.id, sessionId);
    } catch (error) {
      if (this.#disposed) return;
      if (error instanceof SessionLaunchError) {
        this.ledger.attachSession(opened.task.id, opened.execution.id, error.sessionId);
      }
      this.ledger.settle(opened.task.id, opened.execution.id, "failed", error instanceof Error ? error.message : String(error));
    }
  }
  async #pollSessions() {
    if (this.#disposed) return;
    const running = await this.runner.listRunning();
    if (this.#disposed) return;
    if (running.known) await this.#reconcileExecutions(running.items);
  }
  /** 复用本次 poll 已取到的会话列表：一次 list RPC，而不是 1+E。 */
  async #reconcileExecutions(sessions) {
    for (const task of this.ledger.state().tasks) {
      for (const execution of task.executions) {
        if (execution.sessionId === void 0 || execution.endedAt !== void 0) continue;
        try {
          const result = await this.runner.inspect(execution.sessionId, execution.startedAt, sessions);
          if (this.#disposed) return;
          if (result.outcome === "pending") continue;
          this.ledger.settle(task.id, execution.id, result.outcome, "error" in result ? result.error : void 0);
        } catch {
        }
      }
    }
  }
  async #tickSchedule(first) {
    if (this.#disposed) return;
    const now = this.#now();
    const recovered = first || this.#lastScheduleTick !== void 0 && now - this.#lastScheduleTick > RESUME_GAP_MS;
    this.#lastScheduleTick = now;
    this.ledger.setScheduler({ lastTickAt: now });
    if (recovered) {
      this.ledger.skipMissed(now);
      return;
    }
    for (const task of this.ledger.state().tasks) {
      if (task.archivedAt !== void 0) continue;
      const schedule = task.schedule;
      if (schedule === void 0 || !schedule.enabled || schedule.nextRunAt === void 0 || schedule.nextRunAt > now) continue;
      const next = nextRunAtMs(schedule.cron, schedule.nextRunAt);
      const opened = this.ledger.openScheduled(task.id, next, now);
      if (opened !== void 0) this.#scheduleLaunch(opened);
    }
  }
  #scheduleLaunch(opened) {
    void this.#launch(opened).catch((error) => {
      console.error("[dsh-work:taskboard] execution launch settlement failed", error);
    });
  }
  #schedulePoll() {
    if (this.#pollInFlight || this.#disposed) return;
    this.#pollInFlight = true;
    void this.#pollSessions().catch((error) => {
      console.error("[dsh-work:taskboard] session polling failed", error);
    }).finally(() => {
      this.#pollInFlight = false;
    });
  }
  #scheduleTick(first) {
    if (this.#tickInFlight || this.#disposed) return;
    this.#tickInFlight = true;
    void this.#tickSchedule(first).catch((error) => {
      console.error("[dsh-work:taskboard] scheduler tick failed", error);
    }).finally(() => {
      this.#tickInFlight = false;
    });
  }
  #emit() {
    for (const listener of [...this.#listeners]) listener();
  }
};

// src/taskboard/protocol.js
var TASKBOARD_API_PREFIX = "/workbench/taskboard";
function record(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function exactKeys(value, allowed) {
  return Object.keys(value).every((key) => allowed.includes(key));
}
function optionalString(value) {
  return value === void 0 || typeof value === "string";
}
function createInput(value) {
  const input = record(value);
  if (input === void 0 || !exactKeys(input, ["title", "description", "prompt", "workspaceId", "mode", "permission", "schedule"])) return false;
  if (typeof input.title !== "string" || typeof input.description !== "string" || typeof input.prompt !== "string") return false;
  if (!optionalString(input.workspaceId) || !optionalString(input.mode)) return false;
  if (input.permission !== void 0 && !isTaskPermission(input.permission)) return false;
  if (input.schedule !== void 0) {
    const schedule = record(input.schedule);
    if (schedule === void 0 || !exactKeys(schedule, ["enabled", "cron"])) return false;
    if (typeof schedule.enabled !== "boolean" || typeof schedule.cron !== "string") return false;
  }
  return true;
}
function updatePatch(value) {
  const patch = record(value);
  if (patch === void 0 || !exactKeys(patch, ["title", "description", "prompt", "workspaceId", "mode", "permission"])) return false;
  for (const key of ["title", "description", "prompt", "workspaceId", "mode"]) {
    if (!optionalString(patch[key])) return false;
  }
  const permission = patch.permission;
  return permission === void 0 || permission === "" || isTaskPermission(permission);
}
function schedulePatch(value) {
  const patch = record(value);
  return patch !== void 0 && exactKeys(patch, ["enabled", "cron"]) && (patch.enabled === void 0 || typeof patch.enabled === "boolean") && (patch.cron === void 0 || typeof patch.cron === "string");
}
function parseActionEnvelope(value) {
  const envelope = record(value);
  if (envelope === void 0 || !exactKeys(envelope, ["requestId", "action"])) return void 0;
  if (typeof envelope.requestId !== "string" || envelope.requestId.trim() === "" || envelope.requestId.length > 256) return void 0;
  const action = record(envelope.action);
  if (action === void 0 || typeof action.kind !== "string") return void 0;
  const taskId = typeof action.taskId === "string" && action.taskId !== "" ? action.taskId : void 0;
  switch (action.kind) {
    case "create":
      if (!exactKeys(action, ["kind", "id", "input"])) return void 0;
      return typeof action.id === "string" && action.id !== "" && createInput(action.input) ? { requestId: envelope.requestId, action: { kind: "create", id: action.id, input: action.input } } : void 0;
    case "update":
      if (!exactKeys(action, ["kind", "taskId", "patch"])) return void 0;
      return taskId !== void 0 && updatePatch(action.patch) ? { requestId: envelope.requestId, action: { kind: "update", taskId, patch: action.patch } } : void 0;
    case "set-schedule":
      if (!exactKeys(action, ["kind", "taskId", "patch"])) return void 0;
      return taskId !== void 0 && schedulePatch(action.patch) ? { requestId: envelope.requestId, action: { kind: "set-schedule", taskId, patch: action.patch } } : void 0;
    case "move":
      if (!exactKeys(action, ["kind", "taskId", "status"])) return void 0;
      return taskId !== void 0 && isTaskStatus(action.status) ? { requestId: envelope.requestId, action: { kind: "move", taskId, status: action.status } } : void 0;
    case "delete":
    case "archive":
    case "restore":
    case "run":
    case "rerun":
      if (!exactKeys(action, ["kind", "taskId"])) return void 0;
      return taskId === void 0 ? void 0 : { requestId: envelope.requestId, action: { kind: action.kind, taskId } };
    default:
      return void 0;
  }
}

// src/taskboard/routes.js
var ACTION_LIMIT = 64 * 1024;
function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > ACTION_LIMIT) throw new Error("body-too-large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return { raw, value: JSON.parse(raw) };
}
function rpc(payload) {
  return { rpcId: `dsh-work-taskboard-${crypto.randomUUID()}`, payload };
}
function registerTaskboardRoutes(ctx, service) {
  const state = ctx.webServer.register({
    kind: "exact",
    path: `${TASKBOARD_API_PREFIX}/state`,
    handler: (req, res) => {
      if (req.method !== "GET") return json(res, 405, { ok: false, error: "method-not-allowed" });
      json(res, 200, service.snapshot());
    }
  });
  const action = ctx.webServer.register({
    kind: "exact",
    path: `${TASKBOARD_API_PREFIX}/action`,
    handler: async (req, res) => {
      if (req.method !== "POST") return json(res, 405, { ok: false, error: "method-not-allowed" });
      if (!(req.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) {
        return json(res, 415, { ok: false, error: "json-required" });
      }
      try {
        const body = await readBody(req);
        const parsed = parseActionEnvelope(body.value);
        if (parsed === void 0) return json(res, 400, { ok: false, error: "invalid-action" });
        json(res, 200, service.apply(parsed.requestId, parsed.action));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        json(res, message === "body-too-large" ? 413 : 400, { ok: false, error: message });
      }
    }
  });
  const options = ctx.webServer.register({
    kind: "exact",
    path: `${TASKBOARD_API_PREFIX}/options`,
    handler: async (req, res) => {
      if (req.method !== "GET") return json(res, 405, { ok: false, error: "method-not-allowed" });
      const payload = { permissions: TASK_PERMISSIONS, workspaces: [], presets: [] };
      try {
        const workspaces = await ctx.apiProxy.workspace.list(rpc({}));
        if (workspaces.result.ok) {
          payload.workspaces = workspaces.result.value.items.map((item) => ({
            workspaceId: item.workspaceId,
            title: item.title !== "" ? item.title : item.path
          }));
        }
      } catch {
      }
      try {
        const presets = await ctx.apiProxy.agentPresets.list(rpc({}));
        if (presets.result.ok) {
          payload.presets = presets.result.value.presets.map((preset) => ({
            id: preset.id,
            name: preset.name,
            description: preset.description,
            broken: preset.broken,
            isDefault: preset.isDefault
          }));
        }
      } catch {
      }
      json(res, 200, payload);
    }
  });
  return () => {
    state();
    action();
    options();
  };
}

// src/index.js
var name = "dsh-work";
var inject = ["webServer", "apiProxy"];
function apply(ctx) {
  ctx.effect(() => registerRoutes(ctx), "dsh-work-git: routes");
  ctx.effect(() => {
    const api = ctx.apiProxy;
    if (api === void 0) {
      console.warn("[dsh-work] taskboard disabled: apiProxy service unavailable");
      return;
    }
    let service;
    try {
      service = new TaskboardHostService(api, {
        commandDispatcher: {
          async execute(sessionId, line, signal) {
            const agents = ctx.get("agents");
            const commands = ctx.get("commands");
            if (agents === void 0 || commands === void 0) {
              throw new Error("permission command services are unavailable");
            }
            const agent = agents.get(sessionId);
            if (agent === void 0) throw new Error(`execution session ${sessionId} is not available`);
            return (await commands.execute(agent, line, [], signal))?.result;
          }
        }
      });
    } catch (error) {
      console.error("[dsh-work] taskboard disabled: ledger unavailable", error);
      return;
    }
    service.start();
    const disposeRoutes = registerTaskboardRoutes(ctx, service);
    return () => {
      disposeRoutes();
      service.dispose();
    };
  }, "dsh-work: taskboard");
}
export {
  ALL_STATUSES,
  ARCHIVABLE_STATUSES,
  COLUMNS,
  MANUAL_STATUSES,
  MAX_TERMINAL_SESSIONS,
  SessionLaunchError,
  TASK_PERMISSIONS,
  TERMINAL_RING_BYTES,
  TaskboardLedger,
  TaskboardRunner,
  addIgnore,
  apply,
  applyArchiveTask,
  applyCreateTask,
  applyDeleteTask,
  applyRestoreTask,
  applyScheduleNextRun,
  applySetSchedule,
  applyUpdateTask,
  canMoveManually,
  clampedTermSize,
  classifyFile,
  contentTypeFor,
  createOutputRing,
  createTask,
  defaultShell,
  extensionOf,
  failureReason,
  initRepo,
  inject,
  inspect,
  isTaskPermission,
  isTaskStatus,
  isValidCron,
  loginShellArgs,
  looksText,
  name,
  nextRunAtMs,
  parseActionEnvelope,
  parseCron,
  parseLedger,
  readJsonBody,
  readWriteJsonBody,
  removeIgnore,
  runGit,
  scrubbedEnv,
  settleExecution,
  startExecution,
  unstagePath,
  validatedWriteContent,
  withSchedule,
  withStatus,
  writeFileAtomic
};
//# sourceMappingURL=index.js.map
