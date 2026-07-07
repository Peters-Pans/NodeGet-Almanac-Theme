import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 使用率配色：常态=陶土（品牌强调），≥70 芥黄告警，≥90 砖红危急
export function loadColor(v?: number | null) {
  if (v == null || !Number.isFinite(v)) return 'bg-muted-foreground/40'
  if (v >= 90) return 'bg-crit'
  if (v >= 70) return 'bg-warn'
  return 'bg-primary'
}

export function strokeColor(v?: number | null) {
  if (v == null || !Number.isFinite(v)) return 'stroke-muted-foreground/40'
  if (v >= 90) return 'stroke-crit'
  if (v >= 70) return 'stroke-warn'
  return 'stroke-primary'
}
