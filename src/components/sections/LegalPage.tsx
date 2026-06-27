/**
 * LegalPage — gemeinsames Layout für Impressum/AGB/Datenschutz. Bild-Band oben
 * (SubpageHero), darunter der RichText-Inhalt.
 */
import { RichText } from '@/components/ui/RichText'
import { Reveal } from '@/components/ui/Reveal'
import { SubpageHero } from './SubpageHero'

type Props = { title: string; data: unknown }

export function LegalPage({ title, data }: Props) {
  return (
    <>
      <SubpageHero title={title} />
      <section className="section-pad">
        <div className="site-container max-w-3xl">
          <Reveal>{data ? <RichText data={data} /> : <p className="text-body">Inhalt folgt.</p>}</Reveal>
        </div>
      </section>
    </>
  )
}
