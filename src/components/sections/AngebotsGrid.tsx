'use client'

/**
 * AngebotsGrid — Filter-Buttons (Alle/Coaching/Beratung/Wechsel) + 4 farbige
 * Kacheln (AngebotCard). Filter via React-State (ersetzt shuffle.js). Klick auf
 * den bereits aktiven Filter (ausser „Alle") setzt zurück auf „Alle".
 */
import { useState } from 'react'
import { AngebotCard } from './AngebotCard'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import type { Angebote } from '@/payload-types'

type Filter = 'all' | 'coaching' | 'beratung' | 'wechsel'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Alle', value: 'all' },
  { label: 'Coaching', value: 'coaching' },
  { label: 'Beratung', value: 'beratung' },
  { label: 'Wechsel', value: 'wechsel' },
]

export function AngebotsGrid({ angebote }: { angebote: Angebote[] }) {
  const [active, setActive] = useState<Filter>('all')

  const onFilter = (value: Filter) => {
    setActive((prev) => (prev === value && value !== 'all' ? 'all' : value))
  }

  const visible = angebote.filter((a) => active === 'all' || a.filterGruppe === active)

  return (
    <>
      {/* Filter */}
      <ul className="mb-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
        {FILTERS.map((f) => (
          <li key={f.value}>
            <button
              type="button"
              onClick={() => onFilter(f.value)}
              className={cn(
                'btn btn-green !h-11 !w-full sm:!w-auto sm:!min-w-[120px]',
                active === f.value && 'border-petrol',
              )}
            >
              {f.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Kacheln */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((a, i) => (
          <Reveal key={a.id} delay={i * 80}>
            <AngebotCard angebot={a} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
