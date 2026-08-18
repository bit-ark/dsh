// src/routes.js
import { createReadStream, statSync as statSync3 } from "node:fs";

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
      "--date=short",
      "--pretty=tformat:%x1e%h%x1f%ad%x1f%an%x1f%s"
    ]),
    (() => {
      const statusArgs = ["--no-optional-locks", "status", "--porcelain=v1"];
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
import { open, realpath, rename, rm, writeFile as writeFile2 } from "node:fs/promises";
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
    await writeFile2(tmpPath, content, { encoding: "utf8", mode: stat.mode & 511 });
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
        spawn2("open", ["-a", "Visual Studio Code", absPath], { stdio: "ignore" }).on("error", () => finish(false, "\u672A\u627E\u5230 VS Code\uFF0C\u5DF2\u5C1D\u8BD5\u7CFB\u7EDF\u9ED8\u8BA4\u7F16\u8F91\u5668")).on("close", (code) => finish(code === 0, code === 0 ? void 0 : "VS Code \u6253\u5F00\u5931\u8D25"));
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
  });
}
function readWriteJsonBody(req) {
  const CAP = MAX_TEXT_EDIT + 16 * 1024;
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
  });
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
          stat = statSync3(validated.path);
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
            createReadStream(validated.path, { start, end }).on("error", () => {
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
        createReadStream(validated.path).on("error", () => {
          res.destroy();
        }).pipe(res);
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
        return { args: ["restore", "--staged", "--", path.path], fallback: "\u53D6\u6D88\u6682\u5B58\u5931\u8D25" };
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
      offGit();
      offInit();
      offStage();
      offUnstage();
      offStageAll();
      offCommit();
      offIgnore();
      offUnignore();
    };
  }, "dsh-work-git: routes");
}

// src/index.js
var name = "dsh-work";
var inject = ["webServer"];
function apply(ctx) {
  ctx.effect(() => registerRoutes(ctx), "dsh-work-git: routes");
}
export {
  apply,
  classifyFile,
  contentTypeFor,
  extensionOf,
  inject,
  looksText,
  name,
  validatedWriteContent,
  writeFileAtomic
};
//# sourceMappingURL=index.js.map
