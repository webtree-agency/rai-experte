/**
 * Parallax-Divider — Vollbreiten-Bild mit background-attachment:fixed (Desktop)
 * bzw. scroll (Mobile ≤800px), Petrol-Fallback. Hintergründe in globals.css
 * (.parallax-bg). Optionaler zentrierter weisser Text.
 */
type Props = { text?: string }

export function ParallaxDivider({ text }: Props) {
  return (
    <section className="parallax-bg relative min-h-[300px]">
      {text && (
        <h2 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center text-3xl font-semibold text-white md:text-4xl">
          {text}
        </h2>
      )}
    </section>
  )
}
