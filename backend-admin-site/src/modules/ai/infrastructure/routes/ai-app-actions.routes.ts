import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiAppActionKey, AiAppActionModule } from "../../../../core/kernel/ai/ai-app-actions.types"
import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type { AiAppActionsApplicationService } from "../../application/services/ai-app-actions.service"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asModule(value: unknown): AiAppActionModule | undefined {
  const allowed: AiAppActionModule[] = [
    "ai",
    "messenger",
    "wallet",
    "coin_wallet",
    "profile",
    "qr",
    "premium",
    "settings",
    "translation",
    "tasks",
    "contacts",
    "calls",
    "auth",
    "admin",
    "unknown",
  ]
  return typeof value === "string" && allowed.includes(value as AiAppActionModule)
    ? (value as AiAppActionModule)
    : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" && ["general", "business", "education", "translation", "search"].includes(value)
    ? (value as AiAssistantMode)
    : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && ["internal", "google", "yandex"].includes(value)
    ? (value as AiProviderKey)
    : undefined
}

function asActionKey(value: unknown): AiAppActionKey | undefined {
  return asString(value) as AiAppActionKey | undefined
}

export function createAiAppActionsRouter(aiAppActionsService: AiAppActionsApplicationService): Router {
  const router = Router()

  router.get("/actions/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiAppActionsService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/actions/:userId/registry", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      res.json({
        ok: true,
        data: {
          userId,
          manifest: aiAppActionsService.getManifest(),
          actions: aiAppActionsService.getRegistry({
            module: asModule(req.query.module),
            includeBlocked: asBoolean(req.query.includeBlocked) ?? req.query.includeBlocked === "true",
          }),
        },
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/actions/:userId/pending", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      res.json({ ok: true, data: aiAppActionsService.listPending(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/actions/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      res.json({ ok: true, data: aiAppActionsService.getWorkspaceSummary(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/actions/resolve", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      res.json({
        ok: true,
        data: aiAppActionsService.resolve({
          userId,
          prompt: asString(req.body?.prompt),
          actionKey: asActionKey(req.body?.actionKey),
          module: asModule(req.body?.module),
          locale: asString(req.body?.locale),
          mode: asMode(req.body?.mode),
          params: asObject(req.body?.params),
          preferredProvider: asProvider(req.body?.preferredProvider),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/actions/prepare", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const actionKey = asActionKey(req.body?.actionKey)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      if (!actionKey) throw new Error("ai_app_action_key_required")
      res.json({
        ok: true,
        data: aiAppActionsService.prepare({
          userId,
          actionKey,
          locale: asString(req.body?.locale),
          params: asObject(req.body?.params),
          source: asString(req.body?.source) as never,
          autoDispatch: asBoolean(req.body?.autoDispatch),
          confirmationText: asString(req.body?.confirmationText),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/actions/confirm", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const actionId = asString(req.body?.actionId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      if (!actionId) throw new Error("ai_app_action_id_required")
      res.json({
        ok: true,
        data: aiAppActionsService.confirm({
          userId,
          actionId,
          confirmationText: asString(req.body?.confirmationText),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/actions/cancel", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const actionId = asString(req.body?.actionId)
      if (!userId) throw new Error("ai_app_action_user_id_required")
      if (!actionId) throw new Error("ai_app_action_id_required")
      res.json({
        ok: true,
        data: aiAppActionsService.cancel({
          userId,
          actionId,
          reason: asString(req.body?.reason),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
