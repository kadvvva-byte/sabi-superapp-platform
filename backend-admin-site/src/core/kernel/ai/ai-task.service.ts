import type { AiTaskCreateInput, AiTaskEntry, AiTaskStatus, AiTaskUpdateInput } from "./ai.types"
import { AiPersistenceService } from "./ai-persistence.service"

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export class AiTaskService {
  private readonly tasks = new Map<string, AiTaskEntry[]>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  private ensureLoaded(userId: string) {
    if (this.tasks.has(userId)) {
      return
    }
    const loaded = this.persistence?.getTasks(userId) ?? []
    this.tasks.set(userId, loaded)
  }

  create(input: AiTaskCreateInput): AiTaskEntry {
    this.ensureLoaded(input.userId)
    const now = new Date().toISOString()
    const entry: AiTaskEntry = {
      id: createId("aitask"),
      userId: input.userId,
      title: input.title,
      status: input.requiresConfirmation ? "awaiting_confirmation" : "draft",
      mode: input.mode ?? "general",
      createdAt: now,
      updatedAt: now,
      metadata: input.metadata,
    }

    const existing = this.tasks.get(input.userId) ?? []
    existing.unshift(entry)
    this.tasks.set(input.userId, existing)
    this.persistence?.saveTasks(input.userId, existing)
    return entry
  }

  list(userId: string, status?: AiTaskStatus, limit = 20): AiTaskEntry[] {
    this.ensureLoaded(userId)
    const existing = this.tasks.get(userId) ?? []
    const filtered = status ? existing.filter((item) => item.status === status) : existing
    return filtered.slice(0, Math.max(0, limit))
  }

  update(input: AiTaskUpdateInput): AiTaskEntry {
    this.ensureLoaded(input.userId)
    const existing = this.tasks.get(input.userId) ?? []
    const index = existing.findIndex((item) => item.id === input.taskId)
    if (index === -1) {
      throw new Error(`AI task not found: ${input.taskId}`)
    }

    const next: AiTaskEntry = {
      ...existing[index],
      status: input.status,
      updatedAt: new Date().toISOString(),
    }
    existing[index] = next
    this.tasks.set(input.userId, existing)
    this.persistence?.saveTasks(input.userId, existing)
    return next
  }
}
