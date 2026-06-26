/**
 * Site-Konstanten & URL-Helfer — eine Quelle für Origin, Canonicals und og:image.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const SITE_NAME = 'Rai-experte.ch'

/** Default-OG-Bild (Marco-Foto) — bewusst der alte Pfad, damit og:image identisch bleibt. */
export const OG_DEFAULT = '/assets_marco/webelem/Burgm_Foto_Farbverlauf.webp'

export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
