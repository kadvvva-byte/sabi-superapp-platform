import type { AiAssistantMode, AiTaskEntry, AiTaskStatus } from "./ai.types"
import { AiTaskService } from "./ai-task.service"

export type AiWorkspaceFunctionKey =
  | "chat"
  | "web_search"
  | "image_search"
  | "video_search"
  | "music_search"
  | "file_search"
  | "study_assistant"
  | "business_assistant"
  | "translation_text"
  | "translation_audio"
  | "translation_video"
  | "translation_call"

export type AiTaskWorkspaceFunctionConfig = {
  key: AiWorkspaceFunctionKey
  enabled: boolean
  premiumRequired: boolean
  coinPrice?: number
  description: string
}

export type AiTaskWorkspaceConnection = {
  id: string
  kind: string
  label: string
  status: "connected" | "not_connected" | "disabled"
  createdAt: string
}

export type AiWorkspaceState = {
  userId: string
  paidAccessRequired: boolean
  functions: AiTaskWorkspaceFunctionConfig[]
  connections: AiTaskWorkspaceConnection[]
  createdAt: string
  updatedAt: string
}

const DEFAULT_FUNCTIONS: readonly AiTaskWorkspaceFunctionConfig[] = [
  { key: "chat", enabled: true, premiumRequired: false, description: "AI conversation and smart task entry." },
  { key: "web_search", enabled: true, premiumRequired: true, coinPrice: 5, description: "Web search provider flow." },
  { key: "image_search", enabled: true, premiumRequired: true, coinPrice: 5, description: "Image search provider flow." },
  { key: "video_search", enabled: true, premiumRequired: true, coinPrice: 5, description: "Video search provider flow." },
  { key: "music_search", enabled: true, premiumRequired: true, coinPrice: 5, description: "Music search provider flow." },
  { key: "file_search", enabled: true, premiumRequired: true, coinPrice: 5, description: "File search provider flow." },
  { key: "study_assistant", enabled: true, premiumRequired: true, coinPrice: 20, description: "Education assistant flow." },
  { key: "business_assistant", enabled: true, premiumRequired: true, coinPrice: 60, description: "Business assistant flow." },
  { key: "translation_text", enabled: true, premiumRequired: false, description: "Text translation flow." },
  { key: "translation_audio", enabled: true, premiumRequired: true, coinPrice: 10, description: "Audio translation flow." },
  { key: "translation_video", enabled: true, premiumRequired: true, coinPrice: 10, description: "Video translation flow." },
  { key: "translation_call", enabled: true, premiumRequired: true, coinPrice: 10, description: "Realtime call translation flow." },
]

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

export class AiTaskWorkspaceService {
  private readonly storage = new Map<string, AiWorkspaceState>()

  constructor(private readonly tasks = new AiTaskService()) {}

  get(userId: string): AiWorkspaceState {
    const existing = this.storage.get(userId)
    if (existing) return existing
    const now = new Date().toISOString()
    const created: AiWorkspaceState = {
      userId,
      paidAccessRequired: true,
      functions: DEFAULT_FUNCTIONS.map((item) => ({ ...item })),
      connections: [],
      createdAt: now,
      updatedAt: now,
    }
    this.storage.set(userId, created)
    return created
  }

  listTasks(userId: string, status?: AiTaskStatus) {
    return this.tasks.list(userId, status)
  }

  listPendingApprovals(userId: string) {
    return this.tasks.list(userId, "awaiting_confirmation")
  }

  createTask(input: {
    userId: string
    title: string
    mode?: AiAssistantMode
    functionKey?: AiWorkspaceFunctionKey
    requiresConfirmation?: boolean
    input?: Record<string, unknown>
  }): AiTaskEntry {
    return this.tasks.create({
      userId: input.userId,
      title: input.title,
      mode: input.mode,
      requiresConfirmation: input.requiresConfirmation ?? true,
      metadata: {
        functionKey: input.functionKey,
        input: input.input,
      },
    })
  }

  upsertConnection(userId: string, input: Omit<AiTaskWorkspaceConnection, "id" | "createdAt">) {
    const current = this.get(userId)
    const now = new Date().toISOString()
    const existing = current.connections.find(
      (item) => item.kind === input.kind && item.label.toLowerCase() === input.label.toLowerCase(),
    )
    const nextConnection: AiTaskWorkspaceConnection = existing
      ? { ...existing, ...input }
      : { ...input, id: createId("ai_workspace_connection"), createdAt: now }
    const connections = existing
      ? current.connections.map((item) => (item.id === existing.id ? nextConnection : item))
      : [nextConnection, ...current.connections]
    const next = { ...current, connections, updatedAt: now }
    this.storage.set(userId, next)
    return nextConnection
  }

  setFunctionEnabled(userId: string, functionKey: AiWorkspaceFunctionKey, enabled: boolean) {
    const current = this.get(userId)
    const next = {
      ...current,
      updatedAt: new Date().toISOString(),
      functions: current.functions.map((item) => (item.key === functionKey ? { ...item, enabled } : item)),
    }
    this.storage.set(userId, next)
    return next.functions.find((item) => item.key === functionKey)
  }
}
