// Types for the memory pipeline prompt assembly

export interface LorebookEntryMatch {
  id: string
  content_md: string
  priority: number
  always_on: boolean
  matched_keyword?: string
}

export interface RagSnippet {
  message_id: string
  content_md: string
  similarity: number
  created_at: string
}

export interface PromptContext {
  persona_name: string | null
  persona_description: string | null
  character_system_prompt: string
  character_name: string
  character_description: string
  lorebook_always_on: LorebookEntryMatch[]
  lorebook_triggered: LorebookEntryMatch[]
  pinned_memories: string[]
  extracted_facts: string[]
  rag_snippets: RagSnippet[]
  recent_messages: RecentMessage[]
}

export interface RecentMessage {
  role: 'user' | 'character' | 'system'
  character_name?: string
  content: string
}

// The flattened view shown to users in the Memory panel
export interface MemoryPanelState {
  always_on_lore: LorebookEntryMatch[]
  triggered_lore: LorebookEntryMatch[]
  pinned: string[]
  extracted_facts: string[]
  rag_snippets: RagSnippet[]
  recent_message_count: number
  total_estimated_tokens: number
}
