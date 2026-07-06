import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiWorkspaceService } from "../../application/services/ai-workspace.service"
import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  if (typeof value !== "string") return undefined
  const normalized = value.trim()
  if (["general", "business", "education", "translation", "search"].includes(normalized)) {
    return normalized as AiAssistantMode
  }
  return undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  if (typeof value !== "string") return undefined
  const normalized = value.trim()
  if (["internal", "google", "yandex"].includes(normalized)) {
    return normalized as AiProviderKey
  }
  return undefined
}

export function createAiWorkspaceRouter(aiWorkspaceService: AiWorkspaceService): Router {
  const router = Router()

  router.get("/workspace/catalog", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiWorkspaceService.getCatalog() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/workspace/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) {
        throw new Error("ai_workspace_user_id_required")
      }

      res.json({
        ok: true,
        data: aiWorkspaceService.getWorkspace(userId, asMode(req.query.mode), asProvider(req.query.provider)),
      })
    } catch (error) {
      next(error)
    }
  })


  router.get("/workspace/:userId/providers/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_workspace_user_id_required")
      res.json({ ok: true, data: aiWorkspaceService.getProviderSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/workspace/:userId/providers/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_workspace_user_id_required")
      const modeProviders = typeof req.body?.modeProviders === "object" && req.body?.modeProviders
        ? Object.fromEntries(
            Object.entries(req.body.modeProviders as Record<string, unknown>)
              .map(([mode, provider]) => [asMode(mode), asProvider(provider)])
              .filter((entry): entry is [AiAssistantMode, AiProviderKey] => Boolean(entry[0] && entry[1])),
          )
        : undefined
      res.json({
        ok: true,
        data: aiWorkspaceService.updateProviderSettings({
          userId,
          searchProvider: asProvider(req.body?.searchProvider),
          translationProvider: asProvider(req.body?.translationProvider),
          modeProviders,
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
