import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type { AiAppIntegrationService } from "../../application/services/ai-app-integration.service"

const MODES: AiAssistantMode[] = ["general", "business", "education", "translation", "search"]
const PROVIDERS: AiProviderKey[] = ["internal", "google", "yandex"]

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
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

function asSource(value: unknown): "app_boot" | "profile" | "workspace" | "settings" | "admin" | "system" | undefined {
  return typeof value === "string" && ["app_boot", "profile", "workspace", "settings", "admin", "system"].includes(value)
    ? (value as "app_boot" | "profile" | "workspace" | "settings" | "admin" | "system")
    : undefined
}

function asModeProviders(value: unknown): Partial<Record<AiAssistantMode, AiProviderKey>> | undefined {
  if (typeof value !== "object" || value === null) return undefined

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([mode, provider]) => [asMode(mode), asProvider(provider)])
      .filter((entry): entry is [AiAssistantMode, AiProviderKey] => Boolean(entry[0] && entry[1])),
  )
}

function requireUserId(value: unknown): string {
  const userId = asString(value)
  if (!userId) throw new Error("ai_user_id_required")
  return userId
}

export function createAiAppIntegrationRouter(aiAppIntegrationService: AiAppIntegrationService): Router {
  const router = Router()

  router.get("/integration/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiAppIntegrationService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/integration/readiness", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiAppIntegrationService.getReadiness() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/integration/:userId/readiness", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      res.json({ ok: true, data: aiAppIntegrationService.getReadiness(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/integration/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      res.json({ ok: true, data: aiAppIntegrationService.getWorkspaceIntegrationSummary(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/integration/:userId/boot", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      res.json({ ok: true, data: aiAppIntegrationService.getBoot(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/integration/:userId/session/bind", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      res.json({
        ok: true,
        data: aiAppIntegrationService.bindAppSession({
          userId,
          mode: asMode(req.body?.mode),
          provider: asProvider(req.body?.provider),
          locale: asString(req.body?.locale),
          searchProvider: asProvider(req.body?.searchProvider),
          translationProvider: asProvider(req.body?.translationProvider),
          modeProviders: asModeProviders(req.body?.modeProviders),
          source: asSource(req.body?.source) ?? "app_boot",
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/integration/:userId/boot", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      aiAppIntegrationService.bindAppSession({
        userId,
        mode: asMode(req.body?.mode),
        provider: asProvider(req.body?.provider),
        locale: asString(req.body?.locale),
        searchProvider: asProvider(req.body?.searchProvider),
        translationProvider: asProvider(req.body?.translationProvider),
        modeProviders: asModeProviders(req.body?.modeProviders),
        source: asSource(req.body?.source) ?? "app_boot",
      })
      res.json({ ok: true, data: aiAppIntegrationService.getBoot(userId) })
    } catch (error) {
      next(error)
    }
  })

  return router
}
