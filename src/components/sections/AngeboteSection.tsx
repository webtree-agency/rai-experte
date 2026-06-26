/**
 * Angebote-Sektion (#angebot) — Überschrift, Filter-Grid (4 Kacheln) und
 * Toggle-Preistabelle. Heller blauer Hintergrund.
 */
import { AngebotsGrid } from './AngebotsGrid'
import { TarifPanel } from './TarifPanel'
import { Reveal } from '@/components/ui/Reveal'
import type { Angebote, Preise } from '@/payload-types'

type Props = { angebote: Angebote[]; preise: Preise | null }

export function AngeboteSection({ angebote, preise }: Props) {
  return (
    <section id="angebot" className="section-pad scroll-mt-24 bg-surface-blue">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section mb-12 uppercase">Angebote</h2>
        </Reveal>
        <AngebotsGrid angebote={angebote} />
        <TarifPanel preise={preise} />
      </div>
    </section>
  )
}
