/**
 * Marco-Bildergalerie — 3 Fotos, Hover-Zoom. Bilder aus dem Über-mich-Global
 * (galerie); Fallback auf die statischen Marco-Fotos.
 */
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { mediaUrl, mediaAlt } from '@/lib/utils'
import type { UeberMich } from '@/payload-types'

type Props = { data: UeberMich | null }

const FALLBACK = [
  { src: '/assets_marco/images/marco/Foto_Marco_Hund.webp', alt: 'Marco mit Hund' },
  { src: '/assets_marco/images/marco/Foto_Marco_Computer.webp', alt: 'Marco am Computer' },
  { src: '/assets_marco/images/marco/marco-garten-computer.webp', alt: 'Marco im Garten' },
]

export function MarcoGalerie({ data }: Props) {
  const bilder =
    data?.galerie && data.galerie.length > 0
      ? data.galerie.map((g) => ({ src: mediaUrl(g.bild) ?? '', alt: mediaAlt(g.bild, 'Marco Burgmeijer') }))
      : FALLBACK
  const visible = bilder.filter((b) => b.src)

  if (visible.length === 0) return null

  return (
    <section className="section-pad bg-surface-blue">
      <div className="site-container grid grid-cols-1 gap-6 sm:grid-cols-3">
        {visible.map((b, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="group relative h-[350px] overflow-hidden rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              <Image
                src={b.src}
                alt={b.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
