/**
 * Sitemap (/sitemap.xml) — statische Routen + Angebots-Slugs aus Payload.
 * Liegt im app-Root (nicht in einer Route-Group) → wird unter /sitemap.xml
 * ausgeliefert.
 */
import type { MetadataRoute } from 'next'
import { getAngebote } from '@/lib/cms'
import { SITE_URL } from '@/lib/site'

/**
 * Zur Laufzeit rendern (wie das Frontend-Layout). Sonst prerendert Next die
 * Sitemap im Docker-Build — dort ist die Payload-DB nicht erreichbar,
 * getAngebote() faellt auf [] zurueck und die Sitemap bleibt dauerhaft ohne
 * Angebots-Seiten. Genau das war bis 04.08.2026 live.
 */
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const angebote = await getAngebote()
  const now = new Date()

  const statisch: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const angebotsRouten: MetadataRoute.Sitemap = angebote.map((a) => ({
    url: `${SITE_URL}/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...statisch, ...angebotsRouten]
}
