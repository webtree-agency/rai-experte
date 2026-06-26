/**
 * JsonLd — rendert ein oder mehrere JSON-LD-Objekte als <script>. Server-Only.
 * `<` wird defensiv escaped, falls CMS-Text ein `</script>` enthielte.
 */
type Props = { data: Record<string, unknown> | Record<string, unknown>[] }

export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
