import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type { AiAssistantMode, AiProviderKey, AiTaskStatus } from "../../../../core/kernel/ai/ai.types"
import type {
  AiCreateTaskRequestContract,
  AiHistoryKindContract,
  AiHistoryListRequestContract,
  AiHistoryRecordContract,
  AiHistoryTaskManifestContract,
  AiHistoryTaskOverviewContract,
  AiTaskListRequestContract,
  AiTaskRecordContract,
  AiUpdateTaskStatusRequestContract,
} from "../../contracts/ai-history-task.contracts"

const DEFAULT_HISTORY_LIMIT = 20
const DEFAULT_TASK_LIMIT = 20
const MAX_LIST_LIMIT = 100

const HISTORY_KINDS: AiHistoryKindContract[] = ["search", "translation", "business", "education", "chat"]
const TASK_STATUSES: AiTaskStatus[] = ["draft", "awaiting_confirmation", "completed", "cancelled"]
const MODES: AiAssistantMode[] = ["general", "business", "education", "translation", "search"]
const PROVIDERS: AiProviderKey[] = ["internal", "google", "yandex"]

type MaybeRecord = Record<string, unknown>

function isRecord(value: unknown): value is MaybeRecord {
  return typeof value === "object" && value !== null
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined
}

function asLimit(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value ?? Number.NaN)) return fallback
  const normalized = Math.trunc(value as number)
  if (normalized < 1) return fallback
  return Math.min(normalized, MAX_LIST_LIMIT)
}

function asHistoryKind(value: unknown): AiHistoryKindContract | undefined {
  return typeof value === "string" && HISTORY_KINDS.includes(value as AiHistoryKindContract)
    ? (value as AiHistoryKindContract)
    : undefined
}

function asTaskStatus(value: unknown): AiTaskStatus | undefined {
  return typeof value === "string" && TASK_STATUSES.includes(value as AiTaskStatus)
    ? (value as AiTaskStatus)
    : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" && MODES.includes(value as AiAssistantMode)
    ? (value as AiAssistantMode)
    : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && PROVIDERS.includes(value as AiProviderKey)
    ? (value as AiProviderKey)
    : undefined
}

function asPriority(value: unknown): AiTaskRecordContract["priority"] | undefined {
  return typeof value === "string" && ["low", "normal", "high", "urgent"].includes(value)
    ? (value as AiTaskRecordContract["priority"])
    : undefined
}

function nowIso(): string {
  return new Date().toISOString()
}

function normalizeSearchQuery(value?: string): string | undefined {
  const query = value?.trim().toLowerCase()
  return query && query.length > 0 ? query : undefined
}

function matchesQuery(source: { title?: string; summary?: string; description?: string }, query?: string): boolean {
  if (!query) return true
  return [source.title, source.summary, source.description]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(query))
}

export class AiHistoryTaskService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest(): AiHistoryTaskManifestContract {
    return {
      area: "history_tasks",
      configured: true,
      status: "ready",
      routes: {
        overview: "/api/ai/activity/:userId/overview",
        history: "/api/ai/activity/:userId/history",
        tasks: "/api/ai/activity/:userId/tasks",
      },
      capabilities: [
        {
          key: "history_overview",
          title: "AI activity overview",
          description: "Aggregates recent AI history and active AI tasks for the dedicated Sabi AI program.",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "history_list",
          title: "AI history list",
          description: "Returns normalized AI history records with product-level filtering.",
          enabled: true,
          requiresConfirmation: false,
        },
        {
          key: "task_create",
          title: "AI task creation",
          description: "Creates AI tasks through the kernel facade and preserves confirmation requirements.",
          enabled: true,
          requiresConfirmation: true,
        },
        {
          key: "task_status_update",
          title: "AI task status update",
          description: "Moves AI tasks through draft, confirmation, completed, and cancelled states.",
          enabled: true,
          requiresConfirmation: true,
        },
      ],
    }
  }

  getOverview(userId: string): AiHistoryTaskOverviewContract {
    this.assertUserId(userId)

    const latestHistory = this.listHistory({ userId, limit: 10 })
    const taskPreview = this.listTasks({ userId, limit: 50 })
    const activeTasks = taskPreview.filter((task) => task.status === "draft" || task.status === "awaiting_confirmation")

    return {
      userId,
      manifest: this.getManifest(),
      counters: {
        historyPreviewCount: latestHistory.length,
        taskPreviewCount: taskPreview.length,
        awaitingConfirmationTasks: taskPreview.filter((task) => task.status === "awaiting_confirmation").length,
        draftTasks: taskPreview.filter((task) => task.status === "draft").length,
        completedTasks: taskPreview.filter((task) => task.status === "completed").length,
        cancelledTasks: taskPreview.filter((task) => task.status === "cancelled").length,
      },
      latestHistory,
      activeTasks: activeTasks.slice(0, 10),
      generatedAt: nowIso(),
    }
  }

  listHistory(input: AiHistoryListRequestContract): AiHistoryRecordContract[] {
    this.assertUserId(input.userId)
    const limit = asLimit(input.limit, DEFAULT_HISTORY_LIMIT)
    const query = normalizeSearchQuery(input.query)

    return (this.aiFacade.listHistory(input.userId, limit) as unknown[])
      .map((item) => this.toHistoryRecord(input.userId, item))
      .filter((item): item is AiHistoryRecordContract => Boolean(item))
      .filter((item) => !input.kind || item.kind === input.kind)
      .filter((item) => matchesQuery(item, query))
      .slice(0, limit)
  }

  listTasks(input: AiTaskListRequestContract): AiTaskRecordContract[] {
    this.assertUserId(input.userId)
    const limit = asLimit(input.limit, DEFAULT_TASK_LIMIT)
    const query = normalizeSearchQuery(input.query)

    return (this.aiFacade.listTasks(input.userId, input.status, limit) as unknown[])
      .map((item) => this.toTaskRecord(input.userId, item))
      .filter((item): item is AiTaskRecordContract => Boolean(item))
      .filter((item) => matchesQuery(item, query))
      .slice(0, limit)
  }

  createTask(input: AiCreateTaskRequestContract): AiTaskRecordContract {
    this.assertUserId(input.userId)
    if (!input.title.trim()) throw new Error("ai_task_title_required")

    const metadata = this.mergeTaskMetadata(input)
    const created = this.aiFacade.createTask({
      userId: input.userId,
      title: input.title.trim(),
      mode: input.mode,
      requiresConfirmation: input.requiresConfirmation,
      metadata,
    })

    const task = this.toTaskRecord(input.userId, created)
    if (!task) throw new Error("ai_task_create_failed")
    return task
  }

  updateTaskStatus(input: AiUpdateTaskStatusRequestContract): AiTaskRecordContract {
    this.assertUserId(input.userId)
    if (!input.taskId.trim()) throw new Error("ai_task_id_required")

    const updated = this.aiFacade.updateTaskStatus(input.userId, input.taskId.trim(), input.status)
    const task = this.toTaskRecord(input.userId, updated, {
      actorUserId: input.actorUserId,
      reason: input.reason,
    })
    if (!task) throw new Error("ai_task_update_failed")
    return task
  }

  confirmTask(userId: string, taskId: string, actorUserId?: string): AiTaskRecordContract {
    return this.updateTaskStatus({
      userId,
      taskId,
      status: "completed",
      actorUserId,
      reason: "confirmed_by_user",
    })
  }

  cancelTask(userId: string, taskId: string, actorUserId?: string, reason?: string): AiTaskRecordContract {
    return this.updateTaskStatus({
      userId,
      taskId,
      status: "cancelled",
      actorUserId,
      reason: reason || "cancelled_by_user",
    })
  }

  private assertUserId(userId: string): void {
    if (!userId || !userId.trim()) throw new Error("ai_user_id_required")
  }

  private toHistoryRecord(userId: string, item: unknown): AiHistoryRecordContract | undefined {
    if (!isRecord(item)) return undefined
    const id = asString(item.id)
    const title = asString(item.title)
    const kind = asHistoryKind(item.kind)
    const createdAt = asString(item.createdAt) || nowIso()

    if (!id || !title || !kind) return undefined

    return {
      id,
      userId: asString(item.userId) || userId,
      title,
      kind,
      mode: asMode(item.mode),
      provider: asProvider(item.provider),
      summary: asString(item.summary),
      createdAt,
      metadata: asObject(item.metadata),
    }
  }

  private toTaskRecord(
    userId: string,
    item: unknown,
    statusMetadata?: { actorUserId?: string; reason?: string },
  ): AiTaskRecordContract | undefined {
    if (!isRecord(item)) return undefined
    const id = asString(item.id)
    const title = asString(item.title)
    const status = asTaskStatus(item.status)
    if (!id || !title || !status) return undefined

    const sourceMetadata = asObject(item.metadata) ?? {}
    const mergedMetadata = statusMetadata && (statusMetadata.actorUserId || statusMetadata.reason)
      ? {
          ...sourceMetadata,
          lastStatusActorUserId: statusMetadata.actorUserId,
          lastStatusReason: statusMetadata.reason,
        }
      : sourceMetadata

    return {
      id,
      userId: asString(item.userId) || userId,
      title,
      status,
      mode: asMode(item.mode),
      description: asString(item.description) || asString(sourceMetadata.description),
      requiresConfirmation: asBoolean(item.requiresConfirmation) ?? status === "awaiting_confirmation",
      priority: asPriority(item.priority) || asPriority(sourceMetadata.priority),
      dueAt: asString(item.dueAt) || asString(sourceMetadata.dueAt),
      createdAt: asString(item.createdAt),
      updatedAt: asString(item.updatedAt),
      completedAt: asString(item.completedAt),
      cancelledAt: asString(item.cancelledAt),
      metadata: mergedMetadata,
    }
  }

  private mergeTaskMetadata(input: AiCreateTaskRequestContract): Record<string, unknown> | undefined {
    const metadata = {
      ...(input.metadata ?? {}),
      description: input.description,
      priority: input.priority,
      dueAt: input.dueAt,
      productLayer: "modules/ai/application/services/ai-history-task.service",
    }

    return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== undefined))
  }
}
