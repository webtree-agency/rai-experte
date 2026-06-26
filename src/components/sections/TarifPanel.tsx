'use client'

/**
 * TarifPanel — Toggle-Button („Tarife öffnen/schliessen") + Preistabelle.
 * Daten aus dem Preise-Global (eine Quelle für Startseite + Angebots-Seiten).
 */
import { useState } from 'react'
import type { Preise } from '@/payload-types'

type Props = { preise: Preise | null }

export function TarifPanel({ preise }: Props) {
  const [open, setOpen] = useState(false)
  const zeilen = preise?.zeilen ?? []

  if (zeilen.length === 0) return null

  return (
    <div className="mt-12 flex flex-col items-center">
      <button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-border">
        {open ? 'Tarife schliessen' : 'Tarife öffnen'}
      </button>

      {open && (
        <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-lg border border-border-light">
          <dl className="divide-y divide-border-light">
            {zeilen.map((z, i) => (
              <div key={z.id ?? i} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[1fr_1.4fr] sm:gap-6">
                <dt className="font-semibold text-ink">{z.titel}</dt>
                <dd className="whitespace-pre-line font-light text-body">{z.beschreibung}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}
