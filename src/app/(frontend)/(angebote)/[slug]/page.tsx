/**
 * Angebots-Detailseite — eine dynamische Route für alle 4 Angebote. Finale URLs
 * ohne Präfix: /tarifstufen, /heiminterne, /beratung, /wechselbesarai.
 *
 * Kopf-Band mit Verlaufs-Bild (Angebot N + Titel), H3 „Beschreibung" + RichText,
 * gemeinsame Preistabelle (Toggle), CTAs Kontakt/Zurück und Cross-Links zu den
 * 3 anderen Angeboten.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/ui/RichText'
import { Reveal } from '@/components/ui/Reveal'
import { SubpageHero } from '@/components/sections/SubpageHero'
import { AngebotCard } from '@/components/sections/AngebotCard'
import { TarifPanel } from '@/components/sections/TarifPanel'
import { KontaktFormular } from '@/components/sections/KontaktFormular'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAngebot, getAngebote, getPreise } from '@/lib/cms'
import { serviceSchema } from '@/lib/jsonld'

export async function generateStaticParams() {
  const angebote = await getAngebote()
  return angebote.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const angebot = await getAngebot(slug)
  if (!angebot) return {}
  const title = angebot.seo?.title || `${angebot.titel} | Rai-experte.ch`
  const description =
    angebot.seo?.description ||
    'Mit meinen speziellen Angeboten zeige ich Ihnen die einfache, krankenkassentaugliche Pflegedokumentation - von Tarifstufen bis interRAI LTCF-Wechsel.'
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, type: 'website' },
  }
}

export default async function AngebotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [angebot, alle, preise] = await Promise.all([getAngebot(slug), getAngebote(), getPreise()])
  if (!angebot) notFound()

  const andere = alle.filter((a) => a.slug !== angebot.slug)

  return (
    <>
      <JsonLd data={serviceSchema(angebot)} />

      <SubpageHero
        eyebrow={`Angebot ${angebot.nummer}`}
        title={angebot.titel}
        backHref="/#angebot"
      />

      {/* Links: Beschreibung + Tarife · Rechts: Kontaktformular */}
      <section className="section-pad-sub py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Links */}
            <Reveal>
              <h2 className="heading-sub text-petrol">Beschreibung</h2>
              <RichText data={angebot.beschreibung} className="mt-5" />
              <div className="mt-10">
                <TarifPanel preise={preise} align="start" />
              </div>
            </Reveal>

            {/* Rechts: Kontaktformular */}
            <Reveal delay={100}>
              <div className="rounded-2xl bg-surface-blue p-6 sm:p-8 lg:p-10">
                <h2 className="heading-sub text-petrol">Kontakt aufnehmen</h2>
                <p className="mt-3 text-[17px] font-light text-body">
                  Fragen zu diesem Angebot? Schreiben Sie mir – ich melde mich gerne bei Ihnen.
                </p>
                <div className="mt-6">
                  <KontaktFormular />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cross-Links zu den anderen Angeboten */}
      <section className="section-pad-sub bg-surface-blue py-16">
        <div className="site-container">
          <Reveal>
            <h2 className="heading-section mb-10 uppercase">Weitere Angebote</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {andere.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <AngebotCard angebot={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
