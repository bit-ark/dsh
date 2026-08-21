/**
 * dsh-work taskboard — 定时预设（cron → 标签），新建对话框与详情编辑器共用。
 * 独立模块避免 detail.js ↔ new-task.js 循环导入。
 */
export const SCHEDULE_PRESETS = [
  { cron: '0 9 * * *', label: '每天 09:00' },
  { cron: '0 * * * *', label: '每小时整点' },
  { cron: '*/10 * * * *', label: '每 10 分钟' },
  { cron: '0 9 * * 1', label: '每周一 09:00' },
]
