// 趋势 sparkline：铺满宽度的折线 + 面积填充，用当前文字色（陶土）。
// preserveAspectRatio=none 让折线随卡片宽度拉伸；non-scaling-stroke 保线宽不变形。
export function Sparkline({ data, max = 100 }: { data: number[]; max?: number }) {
  const vals = data.filter(v => Number.isFinite(v))
  if (vals.length < 2) return null

  const w = 100
  const h = 28
  const pad = 2
  const m = Math.max(max, ...vals) || 1
  const step = w / (vals.length - 1)
  const pts = vals.map((v, i) => [i * step, h - pad - (v / m) * (h - pad * 2)] as const)
  const line = pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `0,${h} ${line} ${w},${h}`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-7 w-full text-primary"
      aria-hidden
    >
      <polygon points={area} fill="currentColor" opacity="0.1" />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
