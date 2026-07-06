import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiHistoryTaskService } from "../../application/services/ai-history-task.service"
import type { AiAssistantMode, AiTaskStatus } from "../../../../core/kernel/ai/ai.types"
import type { AiHistoryKindContract, AiTaskRecordContract } from "../../contracts/ai-history-task.contracts"

const MODES: AiAssistantMode[] = ["general", "business", "education", "translation", "search"]
const HISTORY_KINDS: AiHistoryKindContract[] = ["search", "translation", "business", "education", "chat"]
const TASK_STATUSES: AiTaskStatus[] = ["draft", "awaiting_confirmation", "completed", "cancelled"]
const TASK_PRIORITIES: Array<NonNullable<AiTaskRecordContract["priority"]>> = ["low", "normal", "high", "urgent"]

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" && MODES.includes(value as AiAssistantMode) ? (value as AiAssistantMode) : undefined
}

function asHistoryKind(value: unknown): AiHistoryKindContract | undefined {
  return typeof value === "string" && HISTORY_KINDS.includes(value as AiHistoryKindContract)
    ? (value as AiHistoryKindContract)
    : undefined
}

function asTaskStatus(value: unknown): AiTaskStatus | undefined {
  return typeof value === "string" && TASK_STATUSES.includes(value as AiTaskStatus) ? (value as AiTaskStatus) : undefined
}

function asPriority(value: unknown): AiTaskRecordContract["priority"] | undefined {
  return typeof value === "string" && TASK_PRIORITIES.includes(value as NonNullable<AiTaskRecordContract["priority"]>)
    ? (value as AiTaskRecordContract["priority"])
    : undefined
}

export function createAiHistoryTaskRouter(aiHistoryTaskService: AiHistoryTaskService): Router {
  const router = Router()

  router.get("/activity/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiHistoryTaskService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/activity/:userId/overview", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiHistoryTaskService.getOverview(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/activity/:userId/history", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({
        ok: true,
        data: aiHistoryTaskService.listHistory({
          userId,
          limit: asNumber(req.query.limit),
          kind: asHistoryKind(req.query.kind),
          query: asString(req.query.query),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/activity/:userId/tasks", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({
        ok: true,
        data: aiHistoryTaskService.listTasks({
          userId,
          status: asTaskStatus(req.query.status),
          limit: asNumber(req.query.limit),
          query: asString(req.query.query),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/activity/:userId/tasks", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const title = asString(req.body?.title)
      if (!userId) throw new Error("ai_user_id_required")
      if (!title) throw new Error("ai_task_title_required")

      res.status(201).json({
        ok: true,
        data: aiHistoryTaskService.createTask({
          userId,
          title,
          mode: asMode(req.body?.mode),
          description: asString(req.body?.description),
          requiresConfirmation: typeof req.body?.requiresConfirmation === "boolean" ? req.body.requiresConfirmation : undefined,
          priority: asPriority(req.body?.priority),
          dueAt: asString(req.body?.dueAt),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/activity/:userId/tasks/:taskId/status", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const taskId = asString(req.params.taskId)
      const status = asTaskStatus(req.body?.status)
      if (!userId) throw new Error("ai_user_id_required")
      if (!taskId) throw new Error("ai_task_id_required")
      if (!status) throw new Error("ai_task_status_required")

      res.json({
        ok: true,
        data: aiHistoryTaskService.updateTaskStatus({
          userId,
          taskId,
          status,
          actorUserId: asString(req.body?.actorUserId),
          reason: asString(req.body?.reason),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/activity/:userId/tasks/:taskId/confirm", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const taskId = asString(req.params.taskId)
      if (!userId) throw new Error("ai_user_id_required")
      if (!taskId) throw new Error("ai_task_id_required")
      res.json({ ok: true, data: aiHistoryTaskService.confirmTask(userId, taskId, asString(req.body?.actorUserId)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/activity/:userId/tasks/:taskId/cancel", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const taskId = asString(req.params.taskId)
      if (!userId) throw new Error("ai_user_id_required")
      if (!taskId) throw new Error("ai_task_id_required")
      res.json({
        ok: true,
        data: aiHistoryTaskService.cancelTask(
          userId,
          taskId,
          asString(req.body?.actorUserId),
          asString(req.body?.reason),
        ),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
