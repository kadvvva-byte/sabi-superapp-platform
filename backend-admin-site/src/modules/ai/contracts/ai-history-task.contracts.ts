import type { AiAssistantMode, AiProviderKey, AiTaskStatus } from "../../../core/kernel/ai/ai.types"

export type AiHistoryKindContract = "search" | "translation" | "business" | "education" | "chat"

export type AiHistoryTaskManifestContract = {
  area: "history_tasks"
  configured: boolean
  status: "ready" | "degraded" | "not_connected"
  routes: {
    overview: string
    history: string
    tasks: string
  }
  capabilities: Array<{
    key: string
    title: string
    description: string
    enabled: boolean
    requiresConfirmation: boolean
  }>
}

export type AiHistoryListRequestContract = {
  userId: string
  limit?: number
  kind?: AiHistoryKindContract
  query?: string
}

export type AiHistoryRecordContract = {
  id: string
  userId?: string
  title: string
  kind: AiHistoryKindContract
  mode?: AiAssistantMode
  provider?: AiProviderKey
  summary?: string
  createdAt: string
  metadata?: Record<string, unknown>
}

export type AiTaskListRequestContract = {
  userId: string
  status?: AiTaskStatus
  limit?: number
  query?: string
}

export type AiCreateTaskRequestContract = {
  userId: string
  title: string
  mode?: AiAssistantMode
  description?: string
  requiresConfirmation?: boolean
  priority?: "low" | "normal" | "high" | "urgent"
  dueAt?: string
  metadata?: Record<string, unknown>
}

export type AiUpdateTaskStatusRequestContract = {
  userId: string
  taskId: string
  status: AiTaskStatus
  actorUserId?: string
  reason?: string
}

export type AiTaskRecordContract = {
  id: string
  userId?: string
  title: string
  status: AiTaskStatus
  mode?: AiAssistantMode
  description?: string
  requiresConfirmation: boolean
  priority?: "low" | "normal" | "high" | "urgent"
  dueAt?: string
  createdAt?: string
  updatedAt?: string
  completedAt?: string
  cancelledAt?: string
  metadata?: Record<string, unknown>
}

export type AiHistoryTaskOverviewContract = {
  userId: string
  manifest: AiHistoryTaskManifestContract
  counters: {
    historyPreviewCount: number
    taskPreviewCount: number
    awaitingConfirmationTasks: number
    draftTasks: number
    completedTasks: number
    cancelledTasks: number
  }
  latestHistory: AiHistoryRecordContract[]
  activeTasks: AiTaskRecordContract[]
  generatedAt: string
}
