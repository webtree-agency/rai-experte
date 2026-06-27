import type { MetadataRoute } from 'next'
import { ASSETS } from '@/lib/assets'

/**
 * Web-App-Manifest (/manifest.webmanifest) — Name, Farben und Icon für
 * „Zum Startbildschirm hinzufügen" / installierbares Verhalten. Petrol als
 * Theme-Farbe (Brand), helles Blau als Hintergrund (wie die Sektionen).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BURGMEIJER RAI-Experte',
    short_name: 'RAI-Experte',
    description:
      'Beratung & Schulung für eine einfache, krankenkassentaugliche Pflegedokumentation (RAI / interRAI LTCF / BESA) in der Schweiz.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f5fb',
    theme_color: '#007f8b',
    lang: 'de-CH',
    icons: [
      {
        src: ASSETS.favicon,
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  }
}
