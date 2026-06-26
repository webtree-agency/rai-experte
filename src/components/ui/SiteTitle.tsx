/**
 * SiteTitle — Marken-Schriftzug. Erstes Wort fett (wie `.site-title span`),
 * Rest normal. Standard: „BURGMEIJER RAI-Experte".
 */
import { cn } from '@/lib/utils'

type Props = { title: string; className?: string }

export function SiteTitle({ title, className }: Props) {
  const [first, ...rest] = title.split(' ')
  return (
    <span className={cn('inline-block leading-tight', className)}>
      <span className="font-bold">{first}</span>
      {rest.length > 0 && <span className="font-light"> {rest.join(' ')}</span>}
    </span>
  )
}
