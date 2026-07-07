import prettyBytes from 'pretty-bytes'

export function bytes(n?: number | null) {
  return n && n > 0 ? prettyBytes(n, {binary:true}) : '0 B'
}

export function pct(v?: number | null) {
  if (v == null || !Number.isFinite(v)) return '—'
  return `${v.toFixed(1)}%`
}

export function uptime(seconds?: number | null) {
  if (!seconds || seconds <= 0) return '—'
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  if (d > 0) return `${d}天 ${h}小时`
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}小时 ${m}分`
}

export function relativeAge(ts?: number | null, now = Date.now()) {
  if (!ts) return '从未'
  const s = Math.max(0, Math.round((now - ts) / 1000))
  if (s < 60) return `${s} 秒前`
  if (s < 3600) return `${Math.round(s / 60)} 分钟前`
  return `${Math.round(s / 3600)} 小时前`
}

const CYCLE: Record<number, string> = { 1: '天', 7: '周', 30: '月', 90: '季', 180: '半年', 365: '年' }

// 价格标签：价格 <=0 视为免费（返回空串，卡片据此不渲染）
export function money(v?: number | null, unit = '$', cycleDays = 30) {
  if (v == null || v <= 0) return ''
  const cyc = CYCLE[cycleDays] || `${cycleDays}天`
  return `${unit}${v} / ${cyc}`
}

export type Expiry = { date: string; days: number; level: 'ok' | 'warn' | 'crit' }

// 有效期：解析日期，算剩余天数，按 <0/≤7 危急、≤30 告警、其余正常 分级
export function expiry(dateStr?: string | null, now = Date.now()): Expiry | null {
  if (!dateStr) return null
  const t = Date.parse(String(dateStr))
  if (!Number.isFinite(t)) return null
  const days = Math.floor((t - now) / 86400000)
  const level: Expiry['level'] = days <= 7 ? 'crit' : days <= 30 ? 'warn' : 'ok'
  return { date: String(dateStr).slice(0, 10), days, level }
}
