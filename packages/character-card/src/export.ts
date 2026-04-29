// Export a Persona character back to the Tavern v2 PNG/JSON format.

import { PNG } from 'pngjs'
import type { Character } from '@persona/types'
import type { TavernV2Card } from './spec'

export function characterToTavernCard(character: Character): TavernV2Card {
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: character.name,
      description: character.description_md,
      personality: '',
      scenario: '',
      first_mes: character.greeting_md,
      mes_example: character.example_dialog_md,
      creator_notes: '',
      system_prompt: character.system_prompt_md,
      post_history_instructions: '',
      alternate_greetings: [],
      tags: character.tags,
      creator: '',
      character_version: '1.0',
      extensions: (character.import_source ?? {}) as Record<string, unknown>,
    },
  }
}

export function cardToJson(card: TavernV2Card): string {
  return JSON.stringify(card, null, 2)
}

// Embed a Tavern card into a PNG as a tEXt chunk (key = "chara").
// If no source PNG is provided, creates a 1x1 transparent placeholder.
export function embedCardInPng(card: TavernV2Card, sourcePng?: Buffer): Buffer {
  const json = JSON.stringify(card)
  const b64 = Buffer.from(json, 'utf-8').toString('base64')

  const png = sourcePng ? PNG.sync.read(sourcePng) : new PNG({ width: 1, height: 1 })

  // pngjs doesn't have a first-class API for adding tEXt chunks pre-pack,
  // so we manually inject it via the metadata field used in sync.write.
  // DECISION: write raw tEXt chunk by post-processing the packed buffer
  // since pngjs doesn't expose chunk writing in its public API.
  const packed = PNG.sync.write(png)

  return injectTextChunk(packed, 'chara', b64)
}

// Splice a tEXt chunk into an existing PNG buffer right after the IHDR chunk.
function injectTextChunk(pngBuffer: Buffer, keyword: string, text: string): Buffer {
  // PNG signature = 8 bytes
  // IHDR chunk = 4 (length) + 4 (type) + 13 (data) + 4 (crc) = 25 bytes
  const insertAt = 8 + 25

  const keywordBuf = Buffer.from(keyword + '\0', 'latin1')
  const textBuf = Buffer.from(text, 'latin1')
  const chunkData = Buffer.concat([keywordBuf, textBuf])
  const chunkLength = Buffer.allocUnsafe(4)
  chunkLength.writeUInt32BE(chunkData.length, 0)
  const chunkType = Buffer.from('tEXt', 'latin1')

  const crc = computeCrc32(Buffer.concat([chunkType, chunkData]))
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crc, 0)

  const chunk = Buffer.concat([chunkLength, chunkType, chunkData, crcBuf])

  return Buffer.concat([pngBuffer.subarray(0, insertAt), chunk, pngBuffer.subarray(insertAt)])
}

// CRC-32 per PNG spec
function computeCrc32(buf: Buffer): number {
  const table = makeCrcTable()
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ (buf[i] as number)) & 0xff]! ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
}
