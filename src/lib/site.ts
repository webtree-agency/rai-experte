/**
 * Site-Konstanten & URL-Helfer — eine Quelle für Origin, Canonicals und og:image.
 */
/**
 * NEXT_PUBLIC_SITE_URL wird zur BUILD-Zeit ins Bundle gebacken (Canonicals, robots.txt,
 * sitemap.xml, JSON-LD). Fehlt das Build-Arg im Deploy, darf der Fallback niemals
 * localhost sein — sonst zeigen Canonical & Sitemap in Produktion auf http://localhost:3000
 * (passiert am 03.08.2026, Google hat die Seite so ausgelesen).
 */
const PROD_ORIGIN = 'https://www.rai-experte.ch'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === 'production' ? PROD_ORIGIN : 'http://localhost:3000')
).replace(/\/$/, '')

export const SITE_NAME = 'Rai-experte.ch'

/** Default-OG-Bild (Marco-Foto) — bewusst der alte Pfad, damit og:image identisch bleibt. */
export const OG_DEFAULT = '/assets_marco/webelem/Burgm_Foto_Farbverlauf.webp'

export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
