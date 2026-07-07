import { cn } from '../utils/cn'

export function StatusDot({ online, className }: { online: boolean; className?: string }) {
  return (
    <span
      title={online ? '在线' : '离线'}
      className={cn(
        'inline-block w-2 h-2 rounded-full shrink-0',
        online
          ? 'bg-good ring-2 ring-good/25'
          : 'bg-muted-foreground/60 ring-2 ring-muted-foreground/15',
        className,
      )}
    />
  )
}
