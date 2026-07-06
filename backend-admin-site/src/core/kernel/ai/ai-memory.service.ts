import { AiConsentService } from "./ai-consent.service"
import { AiPersistenceService } from "./ai-persistence.service"
import {
  type AiMemoryEntry,
  type AiMemoryKind,
  type AiMemorySaveInput,
  type AiMemorySource,
  type AiMemorySuggestion,
  type AiMemorySummary,
  type AiMemoryVisibility,
} from "./ai.types"

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

export class AiMemoryService {
  private readonly entriesByUser = new Map<string, AiMemoryEntry[]>()

  constructor(
    private readonly consentService: AiConsentService,
    private readonly persistence?: AiPersistenceService,
  ) {}

  private ensureLoaded(userId: string) {
    if (this.entriesByUser.has(userId)) {
      return
    }
    const loaded = this.persistence?.getMemory(userId) ?? []
    this.entriesByUser.set(userId, loaded)
  }

  listMemory(userId: string, options?: { kind?: AiMemoryKind; tag?: string }) {
    this.ensureLoaded(userId)
    const entries = this.entriesByUser.get(userId) ?? []

    return entries.filter((entry) => {
      if (options?.kind && entry.kind !== options.kind) {
        return false
      }
      if (options?.tag && !entry.tags.includes(options.tag)) {
        return false
      }
      return true
    })
  }

  getMemorySummary(userId: string): AiMemorySummary {
    this.ensureLoaded(userId)
    const entries = this.entriesByUser.get(userId) ?? []
    const byKind = entries.reduce<Partial<Record<AiMemoryKind, number>>>((acc, entry) => {
      acc[entry.kind] = (acc[entry.kind] ?? 0) + 1
      return acc
    }, {})

    return {
      totalEntries: entries.length,
      byKind,
      memoryWriteAllowed: this.consentService.getConsent(userId).memoryWriteAllowed,
    }
  }

  saveMemory(input: AiMemorySaveInput): AiMemoryEntry {
    this.ensureLoaded(input.userId)
    const consent = this.consentService.getConsent(input.userId)
    if (!consent.memoryWriteAllowed) {
      throw new Error("AI memory write is blocked until the user grants permission")
    }

    const label = normalizeText(input.label)
    const value = normalizeText(input.value)
    if (!label) {
      throw new Error("AI memory save requires a non-empty label")
    }
    if (!value) {
      throw new Error("AI memory save requires a non-empty value")
    }

    const source: AiMemorySource = input.source ?? "assistant"
    const visibility: AiMemoryVisibility = input.visibility ?? "private"
    const tags = Array.from(new Set((input.tags ?? []).map((tag) => normalizeText(tag).toLowerCase()).filter(Boolean)))

    const entries = this.entriesByUser.get(input.userId) ?? []
    const existingIndex = entries.findIndex(
      (entry) => entry.kind === input.kind && entry.label.toLowerCase() === label.toLowerCase(),
    )

    const now = new Date().toISOString()

    if (existingIndex >= 0) {
      const existing = entries[existingIndex]
      const next: AiMemoryEntry = {
        ...existing,
        value,
        source,
        visibility,
        tags,
        updatedAt: now,
      }
      const nextEntries = [...entries]
      nextEntries[existingIndex] = next
      this.entriesByUser.set(input.userId, nextEntries)
      this.persistence?.saveMemory(input.userId, nextEntries)
      return next
    }

    const created: AiMemoryEntry = {
      id: createId("ai_memory"),
      userId: input.userId,
      kind: input.kind,
      label,
      value,
      source,
      visibility,
      tags,
      createdAt: now,
      updatedAt: now,
    }

    const nextEntries = [created, ...entries]
    this.entriesByUser.set(input.userId, nextEntries)
    this.persistence?.saveMemory(input.userId, nextEntries)
    return created
  }

  removeMemory(userId: string, entryId: string) {
    this.ensureLoaded(userId)
    const entries = this.entriesByUser.get(userId) ?? []
    const nextEntries = entries.filter((entry) => entry.id !== entryId)
    const removed = nextEntries.length !== entries.length
    this.entriesByUser.set(userId, nextEntries)
    this.persistence?.saveMemory(userId, nextEntries)
    return { removed, remaining: nextEntries.length }
  }

  clearMemory(userId: string) {
    this.ensureLoaded(userId)
    const removed = (this.entriesByUser.get(userId) ?? []).length
    this.entriesByUser.set(userId, [])
    this.persistence?.saveMemory(userId, [])
    return { removed }
  }

  createSuggestion(input: {
    userId: string
    kind: AiMemoryKind
    label: string
    value: string
    reason: string
  }): AiMemorySuggestion {
    return {
      id: createId("ai_memory_suggestion"),
      userId: input.userId,
      kind: input.kind,
      label: normalizeText(input.label),
      value: normalizeText(input.value),
      reason: normalizeText(input.reason),
      createdAt: new Date().toISOString(),
    }
  }
}
