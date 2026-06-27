/**
 * Seed — befüllt Payload mit den realen Inhalten der alten Seite.
 * Ausführen: `pnpm seed` (benötigt laufende Postgres-DB; ohne S3-Keys landen
 * die Uploads lokal in public/uploads, mit Keys in R2).
 *
 * Idempotent: Angebote/Globals werden geupsertet, Referenzen & Veranstaltungen
 * vor dem Anlegen geleert. Media wird per Dateiname nur einmal hochgeladen.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { makeMediaUpsert, rich } from './seed/lib'
import { REFERENZEN } from './seed/referenzen-data'
import { VERANSTALTUNGEN } from './seed/veranstaltungen-data'
import { IMPRESSUM_LINES, AGB_LINES, DATENSCHUTZ_LINES } from './seed/legal-data'

async function main() {
  console.log('[seed] start — verbinde mit Payload …')
  const payload = await getPayload({ config })
  const media = makeMediaUpsert(payload)
  const log = (msg: string) => console.log(`[seed] ${msg}`)

  /* ─── Media (Marco-Fotos, Hero/Logo) ─────────────────────────────── */
  const rundfoto = await media('assets_marco/webelem/Burgm_Foto_Farbverlauf.webp', 'Marco Burgmeijer')
  const galHund = await media('assets_marco/images/marco/Foto_Marco_Hund.webp', 'Marco mit Hund')
  const galComputer = await media('assets_marco/images/marco/Foto_Marco_Computer.webp', 'Marco am Computer')
  const galGarten = await media('assets_marco/images/marco/marco-garten-computer.webp', 'Marco im Garten')
  log('Marco-Medien hochgeladen.')

  /* ─── Angebote (4) ───────────────────────────────────────────────── */
  const ANGEBOTE = [
    {
      nummer: 1,
      titel: 'Tarifstufen Controlling und Coaching',
      slug: 'tarifstufen',
      kachelFarbe: 'offer-1' as const,
      filterGruppe: 'coaching' as const,
      kurztext: 'Tarifstufen Pflegeaufwand-\ngruppen Controlling und Coaching',
      beschreibung:
        'Einen Fehler bei der Kodierung ist schnell passiert und verursacht sofort hohe Kosten. Ich überprüfe Ihre Kodierungen und korrigiere falsche Einstufungen. Dabei werden Ihre Mitarbeitenden gecoacht, bekommen konkrete Verbesserungsvorschläge und sind anschliessend gestärkt in der Arbeit mit RAI-NH oder interRAI LTCF.',
    },
    {
      nummer: 2,
      titel: 'Heiminterne Schulungen',
      slug: 'heiminterne',
      kachelFarbe: 'offer-2' as const,
      filterGruppe: 'beratung' as const,
      kurztext: 'Heiminterne Schulungen',
      beschreibung:
        'Praxisorientierte Schulungen, korrekte Dokumentation und Kodierung der Pflegestufe relevante Items, angepasst auf Ihre Wünsche.',
    },
    {
      nummer: 3,
      titel: 'Beratung / Unterstützung / Tagesschulung',
      slug: 'beratung',
      kachelFarbe: 'offer-3' as const,
      filterGruppe: 'beratung' as const,
      kurztext: 'Beratung / Unterstützung / Tagesschulung',
      beschreibung:
        'Es fehlt an RAI Erfahrung? Braucht Ihr:e Supervisor:in oder Rai Expert:in Unterstützung? Die Kosten durch nicht korrekte Kodierungen sind hoch! Ich übernehme die Experten Aufgaben, bis eine interne Lösung aufgebaut ist.',
    },
    {
      nummer: 4,
      titel: 'Wechsel von BESA auf interRAI LTCF',
      slug: 'wechselbesarai',
      kachelFarbe: 'offer-4' as const,
      filterGruppe: 'wechsel' as const,
      kurztext: 'Wechsel von BESA auf interRAI LTCF',
      beschreibung:
        'Ich unterstütze und begleite den Veränderungsprozess. Ich helfe Ihnen interRAI LTCF zu implementieren, eine korrekte Kodierung zu gewährleisten und unterstütze ihr:e Supervisor:in und interne RAI Expert:in solange wie nötig.',
    },
  ]

  const SEO_DESC =
    'Mit meinen speziellen Angeboten zeige ich Ihnen die einfache, krankenkassentaugliche Pflegedokumentation - von Tarifstufen bis interRAI LTCF-Wechsel.'

  for (const a of ANGEBOTE) {
    const data = {
      nummer: a.nummer,
      titel: a.titel,
      slug: a.slug,
      kachelFarbe: a.kachelFarbe,
      filterGruppe: a.filterGruppe,
      kurztext: a.kurztext,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      beschreibung: rich([a.beschreibung]) as any,
      seo: { title: `${a.titel} | Rai-experte.ch`, description: SEO_DESC },
    }
    const existing = await payload.find({ collection: 'angebote', where: { slug: { equals: a.slug } }, limit: 1 })
    if (existing.docs.length) {
      await payload.update({ collection: 'angebote', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'angebote', data })
    }
  }
  log('Angebote (4) geseedet.')

  /* ─── Referenzen (34) ────────────────────────────────────────────── */
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
  }
  log(`Referenzen (${REFERENZEN.length}) geseedet.`)

  /* ─── Preise (Global) ────────────────────────────────────────────── */
  await payload.updateGlobal({
    slug: 'preise',
    data: {
      zeilen: [
        { titel: 'Erstberatung', beschreibung: 'Kostenlos' },
        { titel: 'Beratung / Unterstützung / Tagesschulung', beschreibung: 'CHF 1900' },
        {
          titel: 'Tagesschulung',
          beschreibung:
            '8 - 12H | Pause | 13 - 16H\nDie Pausenzeiten können nach Absprache mit den Teilnehmenden angepasst werden.',
        },
        { titel: 'Halbtageseinsätze', beschreibung: 'Nach Vereinbarung' },
        { titel: 'Preise 2025', beschreibung: 'Die Preise entsprechen ihren Gesamtkosten, da keine MwSt. erhoben wird.' },
        { titel: 'Tarife ab 2026', beschreibung: 'exkl. MwSt.' },
        { titel: 'Reisespesen', beschreibung: 'CHF 0.70 pro Kilometer.' },
      ],
    },
  })
  log('Preise geseedet.')

  /* ─── Rechtstexte (Global) ───────────────────────────────────────── */
  await payload.updateGlobal({
    slug: 'rechtstexte',
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      impressum: rich(IMPRESSUM_LINES) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      agb: rich(AGB_LINES) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datenschutz: rich(DATENSCHUTZ_LINES) as any,
    },
  })
  log('Rechtstexte geseedet.')

  /* ─── Über mich (Global) ─────────────────────────────────────────── */
  await payload.updateGlobal({
    slug: 'ueberMich',
    data: {
      introHeading: 'Pflegedokumentation einfach und Krankenkassentauglich,\nich zeige Ihnen wie.',
      introAbsaetze: [
        {
          text: 'Die Mitarbeitenden haben endlich mehr Zeit für die Bewohnenden, es gibt weniger Dokumentationsaufwand und keine Rückstufungen bei Krankenkassen Audits.',
        },
        {
          text: 'Mit meinen individuellen Angebote zu Tarifstufen und Pflegeaufwand-Gruppen Controlling / Coaching, heiminternen Schulungen sowie Unterstützung beim Wechsel von BESA auf interRAI LTCF, zeige ich Ihnen wie einfach und doch krankenkassentauglich die Pflegedokumentation sein kann.',
        },
      ],
      rundfoto: rundfoto.id,
      name: 'Marco Burgmeijer',
      spalte1: [
        {
          text: 'Als Niederländer bin ich 1997 in die Schweiz gekommen, seither bin ich in der Führung tätig und arbeite zusätzlich als BESA Tutor und RAI-Experte.',
        },
        {
          text: '2022 habe ich mich entschieden, mit meiner eigenen Firma zu starten. Fachkräftemangel und die bürokratischen Anforderungen machen es für Alters- und Pflegezentren immer schwieriger, den hohen Ansprüchen der Krankenkassen gerecht zu werden, kleinste Fehler kosten sofort sehr viel Geld!',
        },
      ],
      spalte2: [
        {
          text: 'Mit meiner Erfahrung, Begeisterung für RAI und einer Prise Humor vermittle ich meine RAI-NH und interRAI LTCF Expertise an Betriebe, welche durch Fachkräftemangel oder aus anderen Gründen kurz- oder langfristig Unterstützung benötigen. Die Praxisnähe ist mir dabei besonders wichtig.',
        },
        {
          text: 'Sie arbeiten mit dem System BESA und überlegen sich einen Wechsel zu RAI? Oder arbeiten Sie schon mit dem RAI, wollen aber eine Überprüfung oder andere Unterstützung? Dann freue ich mich auf Ihre Anfrage.',
        },
      ],
      galerie: [{ bild: galHund.id }, { bild: galComputer.id }, { bild: galGarten.id }],
    },
  })
  log('Über-mich geseedet.')

  /* ─── Kontakt (Global) ───────────────────────────────────────────── */
  await payload.updateGlobal({
    slug: 'kontakt',
    data: {
      strasse: 'Sunnmatt 1',
      plzOrt: '8634 Hombrechtikon',
      land: 'Schweiz',
      email: 'rai-experte@gmx.ch',
      telefon: '+41 76 457 44 82',
      uid: 'CHE-294.549.553',
      linkedin: 'https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/',
    },
  })

  /* ─── SEO-Defaults (Global) ──────────────────────────────────────── */
  await payload.updateGlobal({
    slug: 'seoDefaults',
    data: {
      siteTitle: 'BURGMEIJER RAI-Experte',
      siteName: 'Rai-experte.ch',
      heroSubtitel: 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand',
      defaultMetaDescription:
        'BURGMEIJER RAI-Experte bietet in der Schweiz professionelle Beratungen und Schulungen zur pflegegerechten Dokumentation. Ich helfe Ihnen, Tarifstufen zu optimieren und den Dokumentationsaufwand zu minimieren, um Krankenkassentauglichkeit zu erreichen. Entdecken Sie unsere Dienstleistungen für den Wechsel von BESA auf interRAI LTCF und verbessern Sie Ihre Pflegeprozesse.',
      defaultOgImage: rundfoto.id,
      googleSiteVerification: '7rD4xKAmDRZU1KuMYKzSwWw9Z56MsKYF6ACq9FpxJus',
    },
  })
  log('Kontakt & SEO-Defaults geseedet.')

  /* ─── Veranstaltungen (4) ────────────────────────────────────────── */
  await payload.delete({ collection: 'veranstaltungen', where: { id: { exists: true } } })
  for (const v of VERANSTALTUNGEN) {
    await payload.create({
      collection: 'veranstaltungen',
      data: {
        titel: v.titel,
        slug: v.slug,
        datumVon: v.datumVon,
        datumBis: v.datumBis,
        ort: v.ort,
        zielgruppe: v.zielgruppe,
        ziele: v.ziele.map((text) => ({ text })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        themen: rich(v.themen) as any,
        preis: v.preis,
        preisInfo: v.preisInfo,
        plaetze: v.plaetze,
        status: 'offen',
      },
    })
  }
  log(`Veranstaltungen (${VERANSTALTUNGEN.length}) geseedet.`)

  log('Seed abgeschlossen. ✅')
  process.exit(0)
}

console.log('[seed] Modul geladen, starte main() …')
main().catch((err) => {
  console.error('[seed] Fehlgeschlagen:', err)
  process.exit(1)
})
