'use client'

/**
 * VeranstaltungenListe — Grid aus kompakten Vorschau-Kacheln (Titel, Datum, Ort).
 * Klick öffnet ein Modal mit allen Details (Restplätze, Zielgruppe, Ziele, Themen,
 * Preis) und dem Anmeldeformular. Daten (inkl. Restplätze) kommen serverseitig
 * vorberechnet rein – diese Komponente ist nur für die Interaktion zuständig.
 */
import { useEffect, useState } from 'react'
import { CalendarDays, MapPin, Users, X, ArrowRight, Tag } from 'lucide-react'
import { AnmeldeFormular } from './AnmeldeFormular'
import { RichText } from '@/components/ui/RichText'
import { Reveal } from '@/components/ui/Reveal'
import { formatDatumBereich } from '@/lib/format'
import type { Veranstaltungen } from '@/payload-types'

export type VeranstaltungItem = {
  v: Veranstaltungen
  rest: number
  ausgebucht: boolean
}

export function VeranstaltungenListe({ items }: { items: VeranstaltungItem[] }) {
  const [aktiv, setAktiv] = useState<VeranstaltungItem | null>(null)

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.v.id} delay={i * 70}>
            <VeranstaltungCard item={item} onOpen={() => setAktiv(item)} />
          </Reveal>
        ))}
      </div>

      {aktiv && <VeranstaltungModal item={aktiv} onClose={() => setAktiv(null)} />}
    </>
  )
}

/** Sektion-Label mit Petrol-Strich davor (wie im Footer/„— KONTAKT"-Stil). */
function DashLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-sm !font-semibold uppercase tracking-wider text-ink">
      <span aria-hidden className="h-0.5 w-5 rounded bg-petrol" />
      {children}
    </p>
  )
}

function StatusBadge({ ausgebucht, rest }: { ausgebucht: boolean; rest: number }) {
  if (ausgebucht) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
        Ausgebucht
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-petrol/10 px-3 py-1 text-xs font-semibold text-petrol">
      <Users size={13} />
      Noch {rest} {rest === 1 ? 'Platz' : 'Plätze'} frei
    </span>
  )
}

function VeranstaltungCard({ item, onOpen }: { item: VeranstaltungItem; onOpen: () => void }) {
  const { v, rest, ausgebucht } = item
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-xl bg-white p-6 text-left shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] md:p-7"
    >
      <h3 className="heading-sub text-ink">{v.titel}</h3>

      <ul className="mt-4 flex flex-col gap-2 text-body">
        <li className="flex items-start gap-2">
          <CalendarDays size={18} className="mt-0.5 shrink-0 text-petrol" />
          {formatDatumBereich(v.datumVon, v.datumBis)}
        </li>
        <li className="flex items-start gap-2">
          <MapPin size={18} className="mt-0.5 shrink-0 text-petrol" />
          {v.ort}
        </li>
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 pt-1">
        <StatusBadge ausgebucht={ausgebucht} rest={rest} />
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-petrol transition-transform group-hover:translate-x-0.5">
          Details
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  )
}

function VeranstaltungModal({ item, onClose }: { item: VeranstaltungItem; onClose: () => void }) {
  const { v, rest, ausgebucht } = item
  const ziele = v.ziele ?? []

  // Esc schliesst, Body-Scroll sperren während Modal offen ist.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={v.titel}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Schliessen"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink/60 backdrop-blur transition-colors hover:bg-surface-gray hover:text-ink"
        >
          <X size={20} />
        </button>

        {/* Scrollbarer Inhalt — Panel bleibt immer auf dem Bildschirm. */}
        <div className="overflow-y-auto overscroll-contain p-6 sm:p-9">
        <h3 className="heading-sub max-w-[90%] text-ink">{v.titel}</h3>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-blue px-4 py-2 text-sm text-ink">
            <CalendarDays size={16} className="shrink-0 text-petrol" />
            {formatDatumBereich(v.datumVon, v.datumBis)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-blue px-4 py-2 text-sm text-ink">
            <MapPin size={16} className="shrink-0 text-petrol" />
            {v.ortMapsUrl ? (
              <a
                href={v.ortMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 transition-colors hover:text-petrol hover:underline"
              >
                {v.ort}
              </a>
            ) : (
              v.ort
            )}
          </span>
          {(v.preis != null || v.preisInfo) && (
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-blue px-4 py-2 text-sm text-ink">
              <Tag size={16} className="shrink-0 text-petrol" />
              {v.preis != null ? (v.preis === 0 ? 'Kostenlos' : `CHF ${v.preis}`) : v.preisInfo}
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-blue px-4 py-2 text-sm text-ink">
            <Users size={16} className="shrink-0 text-petrol" />
            {ausgebucht ? 'Ausgebucht' : `Noch ${rest} ${rest === 1 ? 'Platz' : 'Plätze'} frei`}
          </span>
        </div>

        {v.beschreibung && (
          <p className="mt-5 whitespace-pre-line text-body">{v.beschreibung}</p>
        )}

        {v.zielgruppe && (
          <p className="mt-5 font-normal">
            <span className="font-semibold text-ink">Zielgruppe:</span> {v.zielgruppe}
          </p>
        )}

        {ziele.length > 0 && (
          <div className="mt-6">
            <DashLabel>Ziele</DashLabel>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-body marker:text-petrol">
              {ziele.map((z, i) => (
                <li key={z.id ?? i} className="font-normal">
                  {z.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {v.themen && (
          <div className="mt-6">
            <DashLabel>Themen</DashLabel>
            <RichText data={v.themen} className="mt-3 prose-sm" />
          </div>
        )}

        {(v.preisInfo || v.preis != null) && (
          <div className="mt-6">
            <DashLabel>Preis</DashLabel>
            <p className="mt-3 font-semibold text-ink">
              {v.preisInfo ?? (v.preis === 0 ? 'Kostenlos' : `CHF ${v.preis}`)}
            </p>
          </div>
        )}

        <div className="mt-6 border-t border-border-light pt-6">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-blue px-4 py-2 text-sm text-ink">
              <Users size={16} className="shrink-0 text-petrol" />
              {ausgebucht ? 'Ausgebucht' : `Noch ${rest} ${rest === 1 ? 'Platz' : 'Plätze'} frei`}
            </span>
          </div>
          <AnmeldeFormular veranstaltungId={v.id} ausgebucht={ausgebucht} />
        </div>
        </div>
      </div>
    </div>
  )
}
