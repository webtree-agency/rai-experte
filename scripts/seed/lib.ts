/**
 * Seed-Helfer — Lexical-RichText-Builder und idempotenter Media-Upsert.
 */
import { fileURLToPath } from 'node:url'
import { dirname, join, basename } from 'node:path'
import type { Payload } from 'payload'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const PUBLIC_DIR = join(ROOT, 'public')

/* eslint-disable @typescript-eslint/no-explicit-any */

function textNode(text: string) {
  return { type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(text: string) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: text ? [textNode(text)] : [],
  }
}

function heading(text: string, tag: 'h2' | 'h3') {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [textNode(text)],
  }
}

function bulletList(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [textNode(item)],
    })),
  }
}

/**
 * Baut Lexical-RichText aus einfachen Zeilen:
 *   "## …"  → h2 · "### …" → h3 · "- …" → Listenpunkt (zusammengefasst) ·
 *   ""      → übersprungen · sonst → Absatz.
 */
export function rich(lines: string[]) {
  const children: any[] = []
  let listBuffer: string[] = []

  const flush = () => {
    if (listBuffer.length) {
      children.push(bulletList(listBuffer))
      listBuffer = []
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
      continue
    }
    flush()
    if (!line.trim()) continue
    if (line.startsWith('### ')) children.push(heading(line.slice(4), 'h3'))
    else if (line.startsWith('## ')) children.push(heading(line.slice(3), 'h2'))
    else children.push(paragraph(line))
  }
  flush()

  return {
    root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
  }
}

export type MediaUpsert = (relPath: string, alt: string) => Promise<{ id: number }>

/** Idempotenter Media-Upsert per Dateiname, relativ zu public/. */
export function makeMediaUpsert(payload: Payload): MediaUpsert {
  return async (relPath, alt) => {
    const filePath = join(PUBLIC_DIR, relPath)
    const filename = basename(relPath)
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (existing.docs.length) return existing.docs[0] as { id: number }
    const doc = await payload.create({ collection: 'media', data: { alt }, filePath })
    return doc as { id: number }
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
