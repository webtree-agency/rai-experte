/**
 * SubpageHero — Kopf-Band für Unterseiten (Angebote, Rechtstexte, 404).
 * Nutzt IMMER das Verlaufs-Bild (Burgm_Startseite_HGFarbverlauf_small.webp),
 * nie nur eine Farbfläche. Dezenter Dunkel-Overlay für Text-Lesbarkeit; das
 * pt-24 hält den transparenten Header frei.
 */
import { Reveal } from '@/components/ui/Reveal'
import { ASSETS } from '@/lib/assets'

type Props = { title: string; eyebrow?: string }

export function SubpageHero({ title, eyebrow }: Props) {
  return (
    <section
      className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center text-white"
      style={{
        backgroundImage: `url(${ASSETS.heroSmall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/20" />
      <Reveal className="relative">
        {eyebrow && <p className="text-sm font-semibold uppercase text-white/85">{eyebrow}</p>}
        <h1 className="heading-hero mt-2 !text-white">{title}</h1>
      </Reveal>
    </section>
  )
}
