/**
 * Über-mich-Sektion (#ubermich) — zweispaltiger Text + Kontakt-Button.
 */
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import type { UeberMich } from '@/payload-types'

type Props = { data: UeberMich | null }

const FB_NAME = 'Marco Burgmeijer'
const FB_SPALTE1 = [
  'Als Niederländer bin ich 1997 in die Schweiz gekommen, seither bin ich in der Führung tätig und arbeite zusätzlich als BESA Tutor und RAI-Experte.',
  '2022 habe ich mich entschieden, mit meiner eigenen Firma zu starten. Fachkräftemangel und die bürokratischen Anforderungen machen es für Alters- und Pflegezentren immer schwieriger, den hohen Ansprüchen der Krankenkassen gerecht zu werden, kleinste Fehler kosten sofort sehr viel Geld!',
]
const FB_SPALTE2 = [
  'Mit meiner Erfahrung, Begeisterung für RAI und einer Prise Humor vermittle ich meine RAI-NH und interRAI LTCF Expertise an Betriebe, welche durch Fachkräftemangel oder aus anderen Gründen kurz- oder langfristig Unterstützung benötigen. Die Praxisnähe ist mir dabei besonders wichtig.',
  'Sie arbeiten mit dem System BESA und überlegen sich einen Wechsel zu RAI? Oder arbeiten Sie schon mit dem RAI, wollen aber eine Überprüfung oder andere Unterstützung? Dann freue ich mich auf Ihre Anfrage.',
]

export function UeberMichSection({ data }: Props) {
  const name = data?.name ?? FB_NAME
  const spalte1 = data?.spalte1?.length ? data.spalte1.map((p) => p.text) : FB_SPALTE1
  const spalte2 = data?.spalte2?.length ? data.spalte2.map((p) => p.text) : FB_SPALTE2

  return (
    <section id="ubermich" className="section-pad scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section uppercase">Über mich</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-5">
            <p className="font-bold text-ink">{name}</p>
            {spalte1.map((text, i) => (
              <p key={i} className="text-[17px] leading-relaxed">
                {text}
              </p>
            ))}
          </Reveal>
          <Reveal className="space-y-5" delay={120}>
            {spalte2.map((text, i) => (
              <p key={i} className="text-[17px] leading-relaxed">
                {text}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-10 text-center">
          <Link href="/#kontakt" className="btn btn-border">
            Kontakt
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
