import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiSafetyApprovalApplicationService } from "../../application/services/ai-safety-approval.service"
import type { AiAssistantRequestSource } from "../../../../core/kernel/ai/ai.types"
import type { AiSafetyApprovalActionCategory } from "../../contracts/ai-safety-approval.contracts"
import type { AiAppActionKey, AiAppActionModule } from "../../../../core/kernel/ai/ai-app-actions.types"

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

function asSource(value: unknown): AiAssistantRequestSource | "workspace" | undefined {
  return typeof value === "string" && ["text", "voice", "quick_action", "system", "attachment", "workspace"].includes(value)
    ? (value as AiAssistantRequestSource | "workspace")
    : undefined
}

function asCategory(value: unknown): AiSafetyApprovalActionCategory | undefined {
  return typeof value === "string" && [
    "read_only",
    "navigation",
    "message_send",
    "money_movement",
    "coin_movement",
    "account_security",
    "account_delete",
    "settings_change",
    "task_create",
    "unknown",
  ].includes(value)
    ? (value as AiSafetyApprovalActionCategory)
    : undefined
}

export function createAiSafetyApprovalRouter(aiSafetyApprovalService: AiSafetyApprovalApplicationService): Router {
  const router = Router()

  router.get("/approval/policy", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyApprovalService.getPolicy() })
    } catch (error) {
      next(error)
    }
  })

  router.post("/approval/evaluate", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      if (!userId) throw new Error("ai_safety_approval_user_id_required")
      res.json({
        ok: true,
        data: aiSafetyApprovalService.evaluate({
          userId,
          prompt: asString(req.body?.prompt),
          actionKey: asString(req.body?.actionKey) as AiAppActionKey | undefined,
          module: asString(req.body?.module) as AiAppActionModule | undefined,
          category: asCategory(req.body?.category),
          source: asSource(req.body?.source),
          requestedAutoExecute: typeof req.body?.requestedAutoExecute === "boolean" ? req.body.requestedAutoExecute : undefined,
          amount: asNumber(req.body?.amount),
          currency: asString(req.body?.currency),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
