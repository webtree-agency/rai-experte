'use client'

/**
 * Referenzen-Carousel — Logo links + Zitat-Box rechts (Mobile gestapelt).
 * Embla mit Autoplay 6 s, Pause on Hover, Loop. Dots + Prev/Next-Pfeile.
 * Zitat-Box weiss mit Schatten + 45°-Pfeil, Quote-Icon petrol (opacity 0.4),
 * Bild-Hover scale(1.05). Ersetzt den alten Bootstrap-Carousel.
 */
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { mediaUrl, mediaAlt, cn } from '@/lib/utils'
import type { Referenzen } from '@/payload-types'

type Props = { referenzen: Referenzen[] }

export function ReferenzenCarousel({ referenzen }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  if (referenzen.length === 0) return null

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden rounded-lg bg-surface-carousel shadow-[0_4px_12px_rgba(0,0,0,0.08)]" ref={emblaRef}>
        <div className="flex">
          {referenzen.map((r) => (
            <ReferenzSlide key={r.id} r={r} />
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        aria-label="Vorherige Referenz"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 flex h-12 w-[5%] min-w-[36px] -translate-y-1/2 items-center justify-center text-petrol-alt transition-colors hover:text-petrol-dark"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        aria-label="Nächste Referenz"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 flex h-12 w-[5%] min-w-[36px] -translate-y-1/2 items-center justify-center text-petrol-alt transition-colors hover:text-petrol-dark"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="mt-10 flex flex-wrap justify-center gap-1.5">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Referenz ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              'h-2.5 w-2.5 rounded-full border border-petrol-alt transition-colors',
              i === selected ? 'bg-petrol-alt' : 'bg-transparent',
            )}
          />
        ))}
      </div>
    </div>
  )
}

function ReferenzSlide({ r }: { r: Referenzen }) {
  const logo = mediaUrl(r.logo)
  const logoAlt = mediaAlt(r.logo, r.einrichtung)

  return (
    <div className="min-w-0 flex-[0_0_100%]">
      <div className="flex min-h-[300px] flex-col items-center gap-6 p-8 md:flex-row md:gap-4 md:p-8">
        {/* Logo */}
        <div className="group flex flex-1 items-center justify-center p-4">
          {logo ? (
            r.websiteUrl ? (
              <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={logoAlt}
                  className="max-h-[150px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={logoAlt}
                className="max-h-[150px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )
          ) : (
            <span className="text-lg font-semibold text-ink">{r.einrichtung}</span>
          )}
        </div>

        {/* Inhalt */}
        <div className="flex-[2] text-left">
          {r.zitat && (
            <div className="relative mb-5 rounded-md bg-white px-7 pb-5 pt-8 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
              <Quote className="absolute left-4 top-3 text-petrol-alt opacity-40" size={20} />
              <p className="italic leading-relaxed text-quote">{r.zitat}</p>
              {/* 45°-Pfeil unten */}
              <span className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-white shadow-[3px_3px_5px_rgba(0,0,0,0.05)]" />
            </div>
          )}
          <div className="pl-6">
            {r.autorName && (
              <p className="text-[#333]">
                <strong>{r.autorName}</strong>
                {r.autorFunktion && (
                  <>
                    <br />
                    {r.autorFunktion}
                  </>
                )}
              </p>
            )}
            {r.projektInfo && <p className="mt-2 text-sm text-quote">{r.projektInfo}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
