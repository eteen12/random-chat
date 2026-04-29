export type ModerationCategory =
  | 'sexual_minors' // hard limit — always blocked
  | 'real_person_sexual' // hard limit — always blocked
  | 'real_world_harm_instructions' // hard limit — always blocked
  | 'explicit_sexual' // blocked in sfw, allowed in adult
  | 'graphic_violence' // blocked in sfw, allowed in adult
  | 'hate_speech'
  | 'self_harm'

export interface ModerationResult {
  passed: boolean
  blocked_categories: ModerationCategory[]
  // User-facing explanation, written to be honest and non-condescending
  user_message: string | null
}

export interface ModerationCheck {
  input: string
  mode: 'sfw' | 'adult'
  result: ModerationResult
}
