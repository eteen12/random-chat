import type { ChatMode } from './db'

export interface SendMessageRequest {
  chat_id: string
  content: string
  persona_id?: string
}

export interface SendMessageResponse {
  message_id: string
  // SSE stream follows; this type is for non-streaming wrapper shape
}

export interface CreateCharacterRequest {
  name: string
  description_md: string
  system_prompt_md: string
  greeting_md: string
  example_dialog_md: string
  avatar_url?: string
  visibility?: 'private' | 'unlisted' | 'public'
  nsfw?: boolean
  tags?: string[]
}

export interface CreateChatRequest {
  character_ids: string[]
  persona_id?: string
  mode: ChatMode
  model_slug?: string
  title?: string
}

export interface ApiError {
  error: string
  code: string
  details?: unknown
}
