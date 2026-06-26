/**
 * Referenzen-Sektion — Überschrift + Carousel.
 */
import { ReferenzenCarousel } from './ReferenzenCarousel'
import { Reveal } from '@/components/ui/Reveal'
import type { Referenzen } from '@/payload-types'

type Props = { referenzen: Referenzen[] }

export function ReferenzenSection({ referenzen }: Props) {
  if (referenzen.length === 0) return null
  return (
    <section className="section-pad">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section mb-12">Ein Auszug meiner Referenzen</h2>
        </Reveal>
        <Reveal delay={120}>
          <ReferenzenCarousel referenzen={referenzen} />
        </Reveal>
      </div>
    </section>
  )
}
