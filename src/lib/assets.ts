/**
 * Statische Asset-Pfade (public/assets_marco) — Pfade 1:1 wie alte Seite, damit
 * og:image-/Logo-URLs identisch bleiben.
 */
export const ASSETS = {
  logo: '/assets_marco/webelem/Burgm_Logo_web.svg',
  logoWeiss: '/assets_marco/webelem/Burgm_LogoEZ_weiss_rgb.svg',
  favicon: '/assets_marco/webelem/Burgm_Favicon_B.svg',
  marcoFoto: '/assets_marco/webelem/Burgm_Foto_Farbverlauf.webp',
  heroDesktop: '/assets_marco/webelem/Burgm_Startseite_HGFarbverlauf.webp',
  heroSmall: '/assets_marco/webelem/Burgm_Startseite_HGFarbverlauf_small.webp',
  heroMobile: '/assets_marco/images/ui/handystart.webp',
  dividerDesktop: '/assets_marco/webelem/Burgm_Startseite_Divider_Text.webp',
  dividerMobile: '/assets_marco/images/ui/Burgm_Startseite_Divider_Mob_230907.webp',
  linkedinIcon: '/assets_marco/images/ui/icons8-linkedin.svg',
  notFound: '/assets_marco/images/ui/404.svg',
  // Pfeile: weiss (default) / weiss-mit-petrol (hover) — für Hero & Angebot-Kacheln
  arrowWhite: '/assets_marco/images/ui/Burgm_Pfeil_weiss.svg',
  arrowWhitePetrol: '/assets_marco/images/ui/Burgm_Pfeil_HGweiss_petrol.svg',
  // Scroll-to-Top: weiss (default) / petrol (hover)
  arrowTopWhite: '/assets_marco/webelem/Burgm_Pfeil_HGweiss.svg',
  arrowTopPetrol: '/assets_marco/webelem/Burgm_Pfeil_HGpetrol.svg',
} as const

export const LINKS = {
  start: '/',
  angebot: '/#angebot',
  ubermich: '/#ubermich',
  kontakt: '/#kontakt',
  webtree: 'https://webtree.ch',
} as const
