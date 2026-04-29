import { describe, it, expect } from 'vitest'
import { parseCardJson, tavernCardToCharacterRequest } from './import'

const MINIMAL_CARD = JSON.stringify({
  spec: 'chara_card_v2',
  spec_version: '2.0',
  data: {
    name: 'Aria',
    description: 'A thoughtful AI companion.',
    personality: 'Calm and curious.',
    scenario: 'A cozy study at night.',
    first_mes: 'Hello! What would you like to talk about?',
    mes_example: '<START>\nUser: Hi\nAria: Hi there!',
    system_prompt: 'You are Aria.',
    tags: ['helpful', 'friendly'],
  },
})

describe('parseCardJson', () => {
  it('parses a minimal v2 card', () => {
    const card = parseCardJson(MINIMAL_CARD)
    expect(card.spec).toBe('chara_card_v2')
    expect(card.data.name).toBe('Aria')
  })

  it('throws on invalid spec', () => {
    expect(() => parseCardJson(JSON.stringify({ spec: 'chara_card_v1', data: { name: 'X' } }))).toThrow()
  })
})

describe('tavernCardToCharacterRequest', () => {
  it('merges description, personality, scenario into description_md', () => {
    const card = parseCardJson(MINIMAL_CARD)
    const req = tavernCardToCharacterRequest(card)
    expect(req.description_md).toContain('A thoughtful AI companion.')
    expect(req.description_md).toContain('Calm and curious.')
    expect(req.description_md).toContain('A cozy study at night.')
  })

  it('maps system_prompt to system_prompt_md', () => {
    const card = parseCardJson(MINIMAL_CARD)
    const req = tavernCardToCharacterRequest(card)
    expect(req.system_prompt_md).toBe('You are Aria.')
  })

  it('preserves tags', () => {
    const card = parseCardJson(MINIMAL_CARD)
    const req = tavernCardToCharacterRequest(card)
    expect(req.tags).toEqual(['helpful', 'friendly'])
  })
})
