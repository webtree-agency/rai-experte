/**
 * Intro-Sektion (#main) — Einstiegstext + rundes Marco-Foto. Inhalt aus dem
 * Über-mich-Global (introHeading, introAbsaetze, rundfoto).
 */
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { ASSETS } from '@/lib/assets'
import { mediaUrl, mediaAlt } from '@/lib/utils'
import type { UeberMich } from '@/payload-types'

type Props = { data: UeberMich | null }

const FALLBACK_HEADING = 'Pflegedokumentation einfach und Krankenkassentauglich,\nich zeige Ihnen wie.'
const FALLBACK_ABSAETZE = [
  'Die Mitarbeitenden haben endlich mehr Zeit für die Bewohnenden, es gibt weniger Dokumentationsaufwand und keine Rückstufungen bei Krankenkassen Audits.',
  'Mit meinen individuellen Angebote zu Tarifstufen und Pflegeaufwand-Gruppen Controlling / Coaching, heiminternen Schulungen sowie Unterstützung beim Wechsel von BESA auf interRAI LTCF, zeige ich Ihnen wie einfach und doch krankenkassentauglich die Pflegedokumentation sein kann.',
]

export function IntroSection({ data }: Props) {
  const heading = data?.introHeading ?? FALLBACK_HEADING
  const absaetze =
    data?.introAbsaetze && data.introAbsaetze.length > 0
      ? data.introAbsaetze.map((a) => a.text)
      : FALLBACK_ABSAETZE
  const foto = mediaUrl(data?.rundfoto) ?? ASSETS.marcoFoto
  const fotoAlt = mediaAlt(data?.rundfoto, 'Marco Burgmeijer')

  return (
    <section id="main" className="section-pad scroll-mt-24">
      <div className="site-container grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <h2 className="heading-sub whitespace-pre-line">{heading}</h2>
          <div className="mt-6 space-y-5">
            {absaetze.map((text, i) => (
              <p key={i} className="text-[18px] leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal className="order-1 flex justify-center md:order-2" delay={120}>
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full">
            <Image
              src={foto}
              alt={fotoAlt}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
