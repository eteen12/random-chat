// Mirror of the Postgres schema as TypeScript types.
// Supabase-generated types will eventually replace/extend these.

export type Plan = 'free' | 'plus' | 'pro'
export type ChatMode = 'sfw' | 'adult'
export type MessageRole = 'user' | 'character' | 'system'
export type CharacterVisibility = 'private' | 'unlisted' | 'public'
export type SafetyAction = 'blocked' | 'warned' | 'logged'

export interface User {
  id: string
  email: string
  dob: string | null
  plan: Plan
  stripe_customer_id: string | null
  age_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface Persona {
  id: string
  user_id: string
  name: string
  description_md: string
  avatar_url: string | null
  is_default: boolean
  created_at: string
}

export interface Character {
  id: string
  owner_user_id: string
  name: string
  description_md: string
  system_prompt_md: string
  greeting_md: string
  example_dialog_md: string
  avatar_url: string | null
  visibility: CharacterVisibility
  nsfw: boolean
  tags: string[]
  import_source: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Lorebook {
  id: string
  owner_user_id: string
  name: string
  created_at: string
}

export interface LorebookEntry {
  id: string
  lorebook_id: string
  keywords: string[]
  content_md: string
  priority: number
  always_on: boolean
  created_at: string
}

export interface Chat {
  id: string
  user_id: string
  persona_id: string | null
  title: string
  mode: ChatMode
  model_slug: string
  created_at: string
  last_message_at: string
}

export interface ChatCharacter {
  chat_id: string
  character_id: string
  position: number
}

export interface Message {
  id: string
  chat_id: string
  role: MessageRole
  character_id: string | null
  content_md: string
  model_slug: string | null
  token_count: number | null
  created_at: string
  edited_at: string | null
  regenerated_from_id: string | null
}

export interface PinnedMemory {
  id: string
  chat_id: string
  content: string
  created_at: string
}

export interface ExtractedFact {
  id: string
  chat_id: string
  character_id: string | null
  fact: string
  source_message_id: string | null
  embedding_updated_at: string | null
  created_at: string
}

export interface UsageDaily {
  user_id: string
  date: string
  message_count: number
  model_breakdown: Record<string, number>
}

export interface SafetyEvent {
  id: string
  user_id: string
  chat_id: string
  message_id: string | null
  category: string
  action: SafetyAction
  created_at: string
}
