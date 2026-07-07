import type { ReactNode } from 'react'
import { bytes } from '../utils/format'

interface Props {
  total: number
  online: number
  rx: number
  tx: number
  traffic: number
}

// 全局汇总头：纸感发丝线分隔的统计条，等宽大数字 tabular 对齐。
export function SummaryHeader({ total, online, rx, tx, traffic }: Props) {
  const onlineTone = online === total ? 'text-good' : online === 0 ? 'text-crit' : 'text-warn'

  const cells: { k: string; v: ReactNode }[] = [
    { k: '节点总数', v: total },
    {
      k: '在线',
      v: (
        <>
          <span className={onlineTone}>{online}</span>
          <span className="text-base text-muted-foreground"> / {total}</span>
        </>
      ),
    },
    {
      k: '↓ 入站带宽',
      v: (
        <span className="text-good">
          {bytes(rx)}
          <span className="text-sm text-muted-foreground">/s</span>
        </span>
      ),
    },
    {
      k: '↑ 出站带宽',
      v: (
        <span className="text-primary">
          {bytes(tx)}
          <span className="text-sm text-muted-foreground">/s</span>
        </span>
      ),
    },
    { k: '累计流量', v: bytes(traffic) },
  ]

  return (
    <div className="card-soft overflow-hidden rounded-xl border">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {cells.map((c, i) => (
          <div key={i} className="-ml-px -mt-px border-l border-t border-border/60 px-4 py-3.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {c.k}
            </div>
            <div className="mt-1.5 font-mono text-2xl font-medium tracking-tight tabular-nums text-foreground">
              {c.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
