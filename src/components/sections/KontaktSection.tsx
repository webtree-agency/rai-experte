/**
 * Kontakt-Sektion (#kontakt) — Formular links, Kontaktinfos rechts. Daten aus
 * dem Kontakt-Global.
 */
import { KontaktFormular } from './KontaktFormular'
import { Reveal } from '@/components/ui/Reveal'
import type { Kontakt } from '@/payload-types'

type Props = { kontakt: Kontakt | null }

export function KontaktSection({ kontakt }: Props) {
  const email = kontakt?.email ?? 'rai-experte@gmx.ch'
  const telefon = kontakt?.telefon ?? '+41 76 457 44 82'
  const strasse = kontakt?.strasse ?? 'Sunnmatt 1'
  const plzOrt = kontakt?.plzOrt ?? '8634 Hombrechtikon'

  return (
    <section id="kontakt" className="section-pad scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section mb-12 uppercase">Kontakt</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <KontaktFormular />
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-8">
            <div>
              <h3 className="text-lg font-light text-ink">Adresse</h3>
              <ul className="mt-2 space-y-1 text-muted">
                <li>{strasse}</li>
                <li>{plzOrt}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-light text-ink">E-Mail</h3>
              <a href={`mailto:${email}`} className="mt-2 inline-block text-muted transition-colors hover:text-petrol">
                {email}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-light text-ink">Telefon</h3>
              <a
                href={`tel:${telefon.replace(/\s/g, '')}`}
                className="mt-2 inline-block text-muted transition-colors hover:text-petrol"
              >
                {telefon}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
