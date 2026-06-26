/**
 * Startseite — alle Sektionen in der zwingenden Reihenfolge (CLAUDE.md §7):
 * Hero → Intro (#main) → Angebote (#angebot) → Veranstaltungen → Über mich
 * (#ubermich) → Marco-Bilder → Referenzen → Parallax → Kontakt (#kontakt).
 */
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { IntroSection } from '@/components/sections/IntroSection'
import { AngeboteSection } from '@/components/sections/AngeboteSection'
import { VeranstaltungenSection } from '@/components/sections/VeranstaltungenSection'
import { UeberMichSection } from '@/components/sections/UeberMichSection'
import { MarcoGalerie } from '@/components/sections/MarcoGalerie'
import { ReferenzenSection } from '@/components/sections/ReferenzenSection'
import { ParallaxDivider } from '@/components/sections/ParallaxDivider'
import { KontaktSection } from '@/components/sections/KontaktSection'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  getAngebote,
  getKontakt,
  getPreise,
  getReferenzen,
  getSeoDefaults,
  getUeberMich,
  getVeranstaltungen,
} from '@/lib/cms'
import { serviceSchema, reviewSchema } from '@/lib/jsonld'

const META_DESCRIPTION =
  'BURGMEIJER RAI-Experte bietet in der Schweiz professionelle Beratungen und Schulungen zur pflegegerechten Dokumentation. Ich helfe Ihnen, Tarifstufen zu optimieren und den Dokumentationsaufwand zu minimieren, um Krankenkassentauglichkeit zu erreichen. Entdecken Sie unsere Dienstleistungen für den Wechsel von BESA auf interRAI LTCF und verbessern Sie Ihre Pflegeprozesse.'

export const metadata: Metadata = {
  title: { absolute: 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand | Rai-experte.ch' },
  description: META_DESCRIPTION,
  keywords: [
    'Pflegedokumentation Schweiz',
    'Krankenkassentaugliche Dokumentation',
    'Tarifstufen optimieren',
    'Pflegeaufwand-Gruppen',
    'Controlling',
    'Coaching',
    'Heiminterne Schulungen',
    'BESA',
    'interRAI LTCF',
    'Pflegeberatung',
    'RAI-Experte Schweiz',
    'Marco Burgmeijer',
    'RAI Hombrechtikon',
    'Coaching Zürich',
    'Coaching Stäfa',
  ],
  openGraph: {
    title: 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand | Rai-experte.ch',
    description:
      'Mit meinen speziellen Angeboten zeige ich Ihnen die einfache, krankenkassentaugliche Pflegedokumentation - von Tarifstufen bis interRAI LTCF-Wechsel.',
  },
}

export default async function HomePage() {
  const [seo, ueberMich, angebote, preise, veranstaltungen, referenzen, kontakt] = await Promise.all([
    getSeoDefaults(),
    getUeberMich(),
    getAngebote(),
    getPreise(),
    getVeranstaltungen(),
    getReferenzen(),
    getKontakt(),
  ])

  const heroTitle = seo?.siteTitle ?? 'BURGMEIJER RAI-Experte'
  const heroSubtitle = seo?.heroSubtitel ?? 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand'

  const jsonLd = [
    ...angebote.map((a) => serviceSchema(a)),
    ...(reviewSchema(referenzen) ? [reviewSchema(referenzen) as Record<string, unknown>] : []),
  ]

  return (
    <>
      {jsonLd.length > 0 && <JsonLd data={jsonLd} />}
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <IntroSection data={ueberMich} />
      <AngeboteSection angebote={angebote} preise={preise} />
      <VeranstaltungenSection veranstaltungen={veranstaltungen} />
      <UeberMichSection data={ueberMich} />
      <MarcoGalerie data={ueberMich} />
      <ReferenzenSection referenzen={referenzen} />
      <ParallaxDivider />
      <KontaktSection kontakt={kontakt} />
    </>
  )
}
