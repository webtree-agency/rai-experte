/**
 * JSON-LD-Builder — LocalBusiness/Person, Service je Angebot, Review +
 * AggregateRating aus Referenzen. Verbessert die strukturierte Auszeichnung
 * gegenüber der alten Seite.
 */
import { SITE_URL, SITE_NAME, absoluteUrl } from './site'
import type { Angebote, Referenzen, Kontakt } from '@/payload-types'

type Json = Record<string, unknown>

export function localBusinessSchema(kontakt: Kontakt | null): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: 'BURGMEIJER RAI-Experte',
    url: SITE_URL,
    image: absoluteUrl('/assets_marco/webelem/Burgm_Foto_Farbverlauf.webp'),
    founder: { '@type': 'Person', name: 'Marco Burgmeijer' },
    email: kontakt?.email ?? 'rai-experte@gmx.ch',
    telephone: kontakt?.telefon ?? '+41 76 457 44 82',
    address: {
      '@type': 'PostalAddress',
      streetAddress: kontakt?.strasse ?? 'Sunnmatt 1',
      addressLocality: kontakt?.plzOrt ?? '8634 Hombrechtikon',
      addressCountry: 'CH',
    },
    areaServed: 'CH',
    sameAs: kontakt?.linkedin ? [kontakt.linkedin] : undefined,
    description:
      'Beratung und Schulung zur pflegegerechten, krankenkassentauglichen Dokumentation (RAI / interRAI LTCF / BESA) in Alters- und Pflegezentren der Schweiz.',
  }
}

export function serviceSchema(angebot: Angebote): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: angebot.titel,
    url: `${SITE_URL}/${angebot.slug}`,
    serviceType: angebot.titel,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'CH',
  }
}

/** Breadcrumb-Pfad für die Angebots-Detailseiten: Start › Angebote › Titel. */
export function breadcrumbSchema(angebot: Angebote): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Angebote', item: `${SITE_URL}/#angebot` },
      {
        '@type': 'ListItem',
        position: 3,
        name: angebot.titel,
        item: `${SITE_URL}/${angebot.slug}`,
      },
    ],
  }
}

/**
 * AggregateRating + bis zu N Reviews aus den Referenzen mit Zitat.
 * Bewertung 5/5 (Testimonials sind durchwegs positiv).
 */
export function reviewSchema(referenzen: Referenzen[]): Json | null {
  const mitZitat = referenzen.filter((r) => r.zitat && r.zitat.trim().length > 0)
  if (mitZitat.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: 'BURGMEIJER RAI-Experte',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      reviewCount: String(mitZitat.length),
    },
    review: mitZitat.slice(0, 12).map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: r.autorName ?? r.einrichtung },
      reviewBody: r.zitat,
    })),
  }
}

export const SITE = { SITE_URL, SITE_NAME }
