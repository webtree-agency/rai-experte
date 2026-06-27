/**
 * Reseed NUR der Referenzen — 1:1 aus scripts/seed/referenzen-data.ts (verbatim
 * aus ../rai-experte/index.html). Lässt Veranstaltungen, Angebote und Globals
 * unangetastet (anders als der volle Seed).
 *
 * Ausführen: node --import tsx --env-file=.env scripts/reseed-referenzen.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { makeMediaUpsert } from './seed/lib'
import { REFERENZEN } from './seed/referenzen-data'

async function main() {
  console.log('[reseed] start — verbinde mit Payload …')
  const payload = await getPayload({ config })
  const media = makeMediaUpsert(payload)

  // Aktuellen DB-Stand zeigen (Vergleich).
  const before = await payload.find({ collection: 'referenzen', limit: 100, depth: 0, sort: 'reihenfolge' })
  console.log(`[reseed] DB enthält aktuell ${before.totalDocs} Referenzen:`)
  before.docs.forEach((d: any, idx: number) =>
    console.log(`   ${idx + 1}. ${d.einrichtung} — ${d.autorName ?? '—'}`),
  )

  // Alle löschen und 1:1 neu anlegen.
  await payload.delete({ collection: 'referenzen', where: { id: { exists: true } } })
  let i = 0
  for (const r of REFERENZEN) {
    i += 1
    const logo = await media(r.logo, r.einrichtung)
    await payload.create({
      collection: 'referenzen',
      data: {
        reihenfolge: i,
        einrichtung: r.einrichtung,
        websiteUrl: r.websiteUrl,
        logo: logo.id,
        zitat: r.zitat,
        autorName: r.autorName,
        autorFunktion: r.autorFunktion,
        projektInfo: r.projektInfo,
      },
    })
    console.log(`   ✓ ${i}. ${r.einrichtung} — ${r.autorName ?? '—'}`)
  }

  console.log(`[reseed] fertig — ${REFERENZEN.length} Referenzen 1:1 neu geseedet.`)
  process.exit(0)
}

main().catch((err) => {
  console.error('[reseed] FEHLER:', err)
  process.exit(1)
})
