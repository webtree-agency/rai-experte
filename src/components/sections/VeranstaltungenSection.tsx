/**
 * Veranstaltungen-Sektion — offene Schulungen aus Payload (ersetzt Pretix).
 * Berechnet je Veranstaltung die Restplätze serverseitig und übergibt an die
 * Client-Liste (Vorschau-Kacheln + Detail-Modal mit Anmeldung).
 */
import { Reveal } from '@/components/ui/Reveal'
import { getRestplaetze } from '@/lib/cms'
import { VeranstaltungenListe, type VeranstaltungItem } from './VeranstaltungenListe'
import type { Veranstaltungen } from '@/payload-types'

type Props = { veranstaltungen: Veranstaltungen[] }

export async function VeranstaltungenSection({ veranstaltungen }: Props) {
  // Nur offene/ausgebuchte (vergangene/abgesagte sind ausgefiltert bzw. ausgeblendet).
  const aktiv = veranstaltungen.filter((v) => v.status !== 'abgesagt')

  const items: VeranstaltungItem[] = await Promise.all(
    aktiv.map(async (v) => {
      const rest = await getRestplaetze(v.id, v.plaetze)
      return { v, rest, ausgebucht: v.status === 'ausgebucht' || rest <= 0 }
    }),
  )

  return (
    <section className="section-pad bg-surface-blue">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-section uppercase">Veranstaltungen</h2>
          <p className="mt-3 text-center text-lg text-body">
            Entdecken Sie meine aktuellen Schulungen und Veranstaltungen
          </p>
        </Reveal>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-body">
            Aktuell sind keine Veranstaltungen ausgeschrieben. Schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <VeranstaltungenListe items={items} />
        )}
      </div>
    </section>
  )
}
