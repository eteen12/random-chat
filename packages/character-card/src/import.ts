// Import Tavern v2 character cards from PNG (tEXt chunk) or raw JSON.

import { PNG } from 'pngjs'
import { TavernV2CardSchema, type TavernV2Card } from './spec'
import type { CreateCharacterRequest } from '@persona/types'

// Extract the embedded JSON from a Tavern PNG's tEXt chunk (key = "chara")
function extractCharaTextChunk(buffer: Buffer): string | null {
  try {
    const png = PNG.sync.read(buffer, { skipRescale: true })
    // pngjs exposes tEXt chunks via png.text
    const text = (png as unknown as { text?: Record<string, string> }).text
    if (!text) return null
    // Key is "chara" per the spec
    const raw = text['chara']
    if (!raw) return null
    return Buffer.from(raw, 'base64').toString('utf-8')
  } catch {
    return null
  }
}

export function parseCardJson(raw: string): TavernV2Card {
  const parsed = JSON.parse(raw)
  return TavernV2CardSchema.parse(parsed)
}

export function parseCardFromPng(buffer: Buffer): TavernV2Card {
  const json = extractCharaTextChunk(buffer)
  if (!json) throw new Error('No chara tEXt chunk found in PNG')
  return parseCardJson(json)
}

// Map a parsed Tavern v2 card to our internal CreateCharacterRequest shape.
// Concatenates personality + scenario into the description field since
// our schema has a single description_md column.
export function tavernCardToCharacterRequest(card: TavernV2Card): CreateCharacterRequest & {
  lorebook?: TavernV2Card['data']['character_book']
  import_source: Record<string, unknown>
} {
  const d = card.data

  const descriptionParts = [d.description, d.personality, d.scenario].filter(Boolean)

  return {
    name: d.name,
    description_md: descriptionParts.join('\n\n'),
    system_prompt_md: [d.system_prompt, d.post_history_instructions].filter(Boolean).join('\n\n'),
    greeting_md: d.first_mes ?? '',
    example_dialog_md: d.mes_example ?? '',
    tags: d.tags ?? [],
    nsfw: false, // importer must decide; we default safe
    lorebook: d.character_book,
    import_source: {
      spec: card.spec,
      spec_version: card.spec_version,
      creator: d.creator,
      character_version: d.character_version,
      creator_notes: d.creator_notes,
      alternate_greetings: d.alternate_greetings,
      extensions: d.extensions,
    },
  }
}
