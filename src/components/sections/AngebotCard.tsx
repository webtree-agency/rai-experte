/**
 * AngebotCard — farbige Angebots-Kachel (Startseite + Cross-Links). Grössere,
 * kräftigere Typo, abgerundete Ecken, Tiefe-Gradient und sanfter Hover-Lift.
 */
import Link from 'next/link'
import { HoverArrow } from '@/components/ui/HoverArrow'
import { ASSETS } from '@/lib/assets'
import { cn } from '@/lib/utils'
import type { Angebote } from '@/payload-types'

const OFFER_BG: Record<Angebote['kachelFarbe'], string> = {
  'offer-1': 'bg-offer-1',
  'offer-2': 'bg-offer-2',
  'offer-3': 'bg-offer-3',
  'offer-4': 'bg-offer-4',
}

type Props = {
  angebot: Pick<Angebote, 'id' | 'nummer' | 'slug' | 'kachelFarbe' | 'kurztext'>
  className?: string
}

export function AngebotCard({ angebot, className }: Props) {
  return (
    <Link
      href={`/${angebot.slug}`}
      className={cn(
        'group relative flex h-[300px] flex-col items-center justify-between overflow-hidden rounded-2xl px-6 pt-9 pb-5 text-center text-white shadow-md transition-shadow duration-300 hover:shadow-xl',
        OFFER_BG[angebot.kachelFarbe],
        className,
      )}
    >
      {/* Tiefe: leicht abgedunkelt nach unten — verbessert Lesbarkeit & Look. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-black/5 to-black/25"
      />
      <span className="relative text-xs font-semibold uppercase text-white/85">
        Angebot {angebot.nummer}
      </span>
      <span className="relative flex flex-1 items-center whitespace-pre-line text-xl font-semibold leading-snug md:text-2xl">
        {angebot.kurztext}
      </span>
      <span className="relative transition-transform duration-300 group-hover:translate-y-1">
        <HoverArrow base={ASSETS.arrowWhite} hover={ASSETS.arrowWhitePetrol} rotate={90} size={40} />
      </span>
    </Link>
  )
}
