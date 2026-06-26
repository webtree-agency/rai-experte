/**
 * RichText — rendert Payload-Lexical-Inhalt mit Prose-Styling (Typography-Plugin).
 */
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

type Props = {
  data: unknown
  className?: string
}

export function RichText({ data, className }: Props) {
  if (!data || typeof data !== 'object') return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      className={cn(
        'prose prose-neutral max-w-none',
        'prose-headings:font-semibold prose-headings:text-ink-soft',
        'prose-p:font-light prose-p:text-body prose-li:text-body',
        'prose-a:text-petrol hover:prose-a:text-petrol-dark',
        'prose-strong:text-ink',
        className,
      )}
    />
  )
}
