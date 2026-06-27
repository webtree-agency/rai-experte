import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import { getRechtstexte } from '@/lib/cms'

export const metadata: Metadata = {
  title: { absolute: 'Datenschutzerklärung | Rai-experte.ch' },
  description: 'Datenschutzerklärung von BURGMEIJER RAI-Experte nach Schweizer DSG. Stand Mai 2025.',
  alternates: { canonical: '/datenschutz' },
}

export default async function DatenschutzSeite() {
  const rechtstexte = await getRechtstexte()
  return <LegalPage title="Datenschutz" data={rechtstexte?.datenschutz} />
}
