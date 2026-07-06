import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiProviderRouterApplicationService } from "../../application/services/ai-provider-router.service"
import type { AiAssistantMode, AiAssistantProviderHint, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type { AiProviderRouteKind } from "../../contracts/ai-provider-router.contracts"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asKind(value: unknown): AiProviderRouteKind | undefined {
  return typeof value === "string" && ["assistant", "search", "translation", "voice"].includes(value)
    ? (value as AiProviderRouteKind)
    : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" && ["general", "business", "education", "student", "abiturient", "teacher", "translation", "search"].includes(value)
    ? (value as AiAssistantMode)
    : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && ["internal", "google", "yandex", "openai"].includes(value)
    ? (value as AiProviderKey)
    : undefined
}

function asProviderHint(value: unknown): AiAssistantProviderHint | undefined {
  return typeof value === "string" && ["chatgpt", "openai", "google_search", "google_translate", "google", "yandex", "internal"].includes(value)
    ? (value as AiAssistantProviderHint)
    : undefined
}

export function createAiProviderRouter(aiProviderRouterService: AiProviderRouterApplicationService): Router {
  const router = Router()

  router.get("/providers/manifest", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiProviderRouterService.getManifest(asString(req.query.userId)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/providers/resolve", (req: Request, res: Response, next: NextFunction) => {
    try {
      const kind = asKind(req.body?.kind)
      if (!kind) throw new Error("ai_provider_route_kind_required")
      res.json({
        ok: true,
        data: aiProviderRouterService.resolve({
          userId: asString(req.body?.userId),
          kind,
          mode: asMode(req.body?.mode),
          preferredProvider: asProvider(req.body?.preferredProvider),
          providerHint: asProviderHint(req.body?.providerHint),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
