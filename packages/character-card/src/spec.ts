// Tavern Character Card v2 spec types.
// Spec: https://github.com/malfoyslastname/character-card-spec-v2

import { z } from 'zod'

export const TavernV2LorebookEntrySchema = z.object({
  keys: z.array(z.string()),
  secondary_keys: z.array(z.string()).optional().default([]),
  comment: z.string().optional().default(''),
  content: z.string(),
  constant: z.boolean().optional().default(false),
  selective: z.boolean().optional().default(false),
  insertion_order: z.number().optional().default(100),
  enabled: z.boolean().optional().default(true),
  position: z.enum(['before_char', 'after_char']).optional().default('before_char'),
  extensions: z.record(z.unknown()).optional().default({}),
})

export const TavernV2LorebookSchema = z.object({
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
  scan_depth: z.number().optional(),
  token_budget: z.number().optional(),
  recursive_scanning: z.boolean().optional().default(false),
  extensions: z.record(z.unknown()).optional().default({}),
  entries: z.array(TavernV2LorebookEntrySchema),
})

export const TavernV2DataSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(''),
  personality: z.string().optional().default(''),
  scenario: z.string().optional().default(''),
  first_mes: z.string().optional().default(''),
  mes_example: z.string().optional().default(''),
  creator_notes: z.string().optional().default(''),
  system_prompt: z.string().optional().default(''),
  post_history_instructions: z.string().optional().default(''),
  alternate_greetings: z.array(z.string()).optional().default([]),
  character_book: TavernV2LorebookSchema.optional(),
  tags: z.array(z.string()).optional().default([]),
  creator: z.string().optional().default(''),
  character_version: z.string().optional().default(''),
  extensions: z.record(z.unknown()).optional().default({}),
})

export const TavernV2CardSchema = z.object({
  spec: z.literal('chara_card_v2'),
  spec_version: z.string().default('2.0'),
  data: TavernV2DataSchema,
})

export type TavernV2Card = z.infer<typeof TavernV2CardSchema>
export type TavernV2Data = z.infer<typeof TavernV2DataSchema>
export type TavernV2Lorebook = z.infer<typeof TavernV2LorebookSchema>
export type TavernV2LorebookEntry = z.infer<typeof TavernV2LorebookEntrySchema>
