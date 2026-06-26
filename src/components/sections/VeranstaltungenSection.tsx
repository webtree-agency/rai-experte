/**
 * Veranstaltungen-Sektion — offene Schulungen aus Payload (ersetzt Pretix).
 * Zeigt je Veranstaltung Titel, Datum/Zeit, Ort, Ziele, Zielgruppe, Themen,
 * Preis-Info und Restplätze + Anmelde-Button. Heller blauer Hintergrund.
 */
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { AnmeldeFormular } from './AnmeldeFormular'
import { RichText } from '@/components/ui/RichText'
import { Reveal } from '@/components/ui/Reveal'
import { getRestplaetze } from '@/lib/cms'
import { formatDatumBereich } from '@/lib/format'
import type { Veranstaltungen } from '@/payload-types'

type Props = { veranstaltungen: Veranstaltungen[] }

export async function VeranstaltungenSection({ veranstaltungen }: Props) {
  // Nur offene/ausgebuchte/abgesagte (vergangene sind bereits ausgefiltert).
  const aktiv = veranstaltungen.filter((v) => v.status !== 'abgesagt')

  return (
    <section className="section-pad bg-surface-blue">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section uppercase">Veranstaltungen</h2>
          <p className="mt-3 text-center text-lg text-body">
            Entdecken Sie meine aktuellen Schulungen und Veranstaltungen
          </p>
        </Reveal>

        {aktiv.length === 0 ? (
          <p className="mt-10 text-center text-body">
            Aktuell sind keine Veranstaltungen ausgeschrieben. Schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8">
            {aktiv.map((v, i) => (
              <Reveal key={v.id} delay={i * 80}>
                <VeranstaltungCard v={v} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

async function VeranstaltungCard({ v }: { v: Veranstaltungen }) {
  const rest = await getRestplaetze(v.id, v.plaetze)
  const ausgebucht = v.status === 'ausgebucht' || rest <= 0
  const ziele = v.ziele ?? []

  return (
    <article className="rounded-xl bg-white p-7 shadow-[0_4px_12px_rgba(0,0,0,0.08)] md:p-9">
      <h3 className="heading-sub text-petrol">{v.titel}</h3>

      <ul className="mt-4 flex flex-col gap-2 text-body sm:flex-row sm:flex-wrap sm:gap-x-8">
        <li className="flex items-center gap-2">
          <CalendarDays size={18} className="shrink-0 text-petrol" />
          {formatDatumBereich(v.datumVon, v.datumBis)}
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={18} className="shrink-0 text-petrol" />
          {v.ort}
        </li>
        <li className="flex items-center gap-2">
          <Users size={18} className="shrink-0 text-petrol" />
          {ausgebucht ? 'Ausgebucht' : `Noch ${rest} ${rest === 1 ? 'Platz' : 'Plätze'} frei`}
        </li>
      </ul>

      {v.zielgruppe && (
        <p className="mt-4 font-light">
          <span className="font-semibold text-ink">Zielgruppe:</span> {v.zielgruppe}
        </p>
      )}

      {ziele.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-ink">Ziele</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-body">
            {ziele.map((z, i) => (
              <li key={z.id ?? i} className="font-light">
                {z.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {v.themen && (
        <div className="mt-4">
          <p className="font-semibold text-ink">Themen</p>
          <RichText data={v.themen} className="mt-2 prose-sm" />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {v.preisInfo ? (
          <p className="font-semibold text-ink">{v.preisInfo}</p>
        ) : v.preis != null ? (
          <p className="font-semibold text-ink">{v.preis === 0 ? 'Kostenlos' : `CHF ${v.preis}`}</p>
        ) : (
          <span />
        )}
        <AnmeldeFormular veranstaltungId={v.id} ausgebucht={ausgebucht} />
      </div>
    </article>
  )
}
