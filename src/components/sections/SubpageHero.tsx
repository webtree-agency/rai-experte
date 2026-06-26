/**
 * SubpageHero — Kopf-Band für Unterseiten (Angebote, Rechtstexte, 404).
 * Nutzt IMMER das Verlaufs-Bild (Burgm_Startseite_HGFarbverlauf_small.webp),
 * nie nur eine Farbfläche. Dezenter Dunkel-Overlay für Text-Lesbarkeit; das
 * pt-24 hält den transparenten Header frei.
 */
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { HoverArrow } from '@/components/ui/HoverArrow'
import { ASSETS } from '@/lib/assets'

type Props = { title: string; eyebrow?: string; backHref?: string; backLabel?: string }

export function SubpageHero({ title, eyebrow, backHref, backLabel = 'Zurück' }: Props) {
  return (
    <section
      className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center text-white"
      style={{
        backgroundImage: `url(${ASSETS.heroSmall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Leichter Overlay nur für Text-Lesbarkeit, hält das Verlaufs-Bild hell. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/10" />
      <Reveal className="relative flex flex-col items-center">
        {eyebrow && <p className="text-sm font-semibold uppercase !text-white">{eyebrow}</p>}
        <h1 className="heading-hero mt-2 !text-white">{title}</h1>
        {backHref && (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="group mt-6 inline-block"
          >
            <HoverArrow
              base={ASSETS.arrowWhite}
              hover={ASSETS.arrowWhitePetrol}
              rotate={270}
              size={46}
            />
          </Link>
        )}
      </Reveal>
    </section>
  )
}
