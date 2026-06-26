import { Montserrat } from 'next/font/google'

/**
 * Montserrat — die Brand-Schrift (wie auf der alten Seite).
 * Schnitte: 300 (Body & Buttons), 400, 600 (Titel), 700 (fette Headline-Teile).
 * 300 italic für Zitate.
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
})
