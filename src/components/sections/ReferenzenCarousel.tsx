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
import { mediaUrl, mediaAlt } from '@/lib/utils'
import type { Referenzen } from '@/payload-types'

type Props = { referenzen: Referenzen[] }

export function ReferenzenCarousel({ referenzen }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  // Höhe der aktiven Slide → Carousel ist nur so hoch wie die aktuelle Referenz,
  // nicht so hoch wie die längste (sonst auf dem Handy ~100vh hoch).
  const [height, setHeight] = useState<number>()

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const syncHeight = useCallback(() => {
    if (!emblaApi) return
    const node = emblaApi.slideNodes()[emblaApi.selectedScrollSnap()]
    if (node) setHeight(node.offsetHeight)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    const update = () => {
      onSelect()
      syncHeight()
    }
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)
    update()
    window.addEventListener('resize', syncHeight)
    return () => {
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
      window.removeEventListener('resize', syncHeight)
    }
  }, [emblaApi, onSelect, syncHeight])

  if (referenzen.length === 0) return null

  const total = snaps.length || referenzen.length

  return (
    <div className="relative">
      {/* Viewport — Höhe folgt der aktiven Slide (Transition für sanftes Wachsen) */}
      <div
        className="overflow-hidden rounded-lg bg-surface-carousel shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-[height] duration-300"
        ref={emblaRef}
        style={height ? { height } : undefined}
      >
        <div className="flex items-start">
          {referenzen.map((r) => (
            <ReferenzSlide key={r.id} r={r} />
          ))}
        </div>
      </div>

      {/* Steuerung: Prev · Zähler · Next (statt 34 Dots – sauber & niedrig) */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
        <button
          type="button"
          aria-label="Vorherige Referenz"
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-petrol-alt text-petrol-alt transition-colors hover:bg-petrol-alt hover:text-white"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="min-w-[68px] text-center text-sm font-semibold tabular-nums text-ink">
          {selected + 1} / {total}
        </span>
        <button
          type="button"
          aria-label="Nächste Referenz"
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-petrol-alt text-petrol-alt transition-colors hover:bg-petrol-alt hover:text-white"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  )
}

function ReferenzSlide({ r }: { r: Referenzen }) {
  const logo = mediaUrl(r.logo)
  const logoAlt = mediaAlt(r.logo, r.einrichtung)

  return (
    <div className="min-w-0 flex-[0_0_100%]">
      <div className="flex flex-col items-center gap-5 p-5 sm:p-8 md:min-h-[300px] md:flex-row md:gap-4">
        {/* Logo */}
        <div className="group flex w-full flex-1 items-center justify-center p-2 sm:p-4">
          {logo ? (
            r.websiteUrl ? (
              <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={logoAlt}
                  className="max-h-[100px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[150px]"
                />
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={logoAlt}
                className="max-h-[100px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[150px]"
              />
            )
          ) : (
            <span className="text-center text-lg font-semibold text-ink">{r.einrichtung}</span>
          )}
        </div>

        {/* Inhalt */}
        <div className="w-full flex-[2] text-left">
          {r.zitat && (
            <div className="relative mb-5 rounded-md bg-white px-7 pb-5 pt-8 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
              <Quote className="absolute left-4 top-3 text-petrol-alt opacity-40" size={20} />
              <p className="whitespace-pre-line italic leading-relaxed text-quote">{r.zitat}</p>
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
