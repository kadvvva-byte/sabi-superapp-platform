import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiSettingsProfileService } from "../../application/services/ai-settings-profile.service"
import type {
  AiAssistantMode,
  AiConsentScope,
  AiProviderKey,
} from "../../../../core/kernel/ai/ai.types"

const MODES: AiAssistantMode[] = ["general", "business", "education", "translation", "search"]
const PROVIDERS: AiProviderKey[] = ["internal", "google", "yandex"]
const PERMISSION_SCOPES: AiConsentScope[] = ["read_access", "memory_write", "tool_execution", "internet_search"]

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" && MODES.includes(value as AiAssistantMode) ? (value as AiAssistantMode) : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && PROVIDERS.includes(value as AiProviderKey) ? (value as AiProviderKey) : undefined
}

function asPermissionScope(value: unknown): AiConsentScope | undefined {
  return typeof value === "string" && PERMISSION_SCOPES.includes(value as AiConsentScope)
    ? (value as AiConsentScope)
    : undefined
}

function asPermissions(value: unknown): Partial<Record<AiConsentScope, boolean>> {
  const object = asObject(value)
  if (!object) return {}

  return Object.fromEntries(
    Object.entries(object)
      .map(([scope, enabled]) => [asPermissionScope(scope), typeof enabled === "boolean" ? enabled : undefined])
      .filter((entry): entry is [AiConsentScope, boolean] => Boolean(entry[0] && typeof entry[1] === "boolean")),
  )
}

function asModeProviders(value: unknown): Partial<Record<AiAssistantMode, AiProviderKey>> | undefined {
  const object = asObject(value)
  if (!object) return undefined

  const entries = Object.entries(object)
    .map(([mode, provider]) => [asMode(mode), asProvider(provider)])
    .filter((entry): entry is [AiAssistantMode, AiProviderKey] => Boolean(entry[0] && entry[1]))

  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

export function createAiSettingsProfileRouter(aiSettingsProfileService: AiSettingsProfileService): Router {
  const router = Router()

  router.get("/settings/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSettingsProfileService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getDashboard(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/profile-contracts", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getProfileContracts(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/permissions", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getPermissions(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/settings/:userId/permissions", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      const permissions = asPermissions(req.body?.permissions ?? req.body?.consent)
      if (Object.keys(permissions).length === 0) throw new Error("ai_settings_permissions_payload_required")

      res.json({
        ok: true,
        data: aiSettingsProfileService.updatePermissions({
          userId,
          permissions,
          actorType: asString(req.body?.actorType) as never,
          actorId: asString(req.body?.actorId),
          reason: asString(req.body?.reason),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/providers", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getProviderSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/settings/:userId/providers", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({
        ok: true,
        data: aiSettingsProfileService.updateProviderSettings({
          userId,
          searchProvider: asProvider(req.body?.searchProvider),
          translationProvider: asProvider(req.body?.translationProvider),
          modeProviders: asModeProviders(req.body?.modeProviders),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/settings/:userId/providers", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.resetProviderSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/locale", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getLocale(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/settings/:userId/locale", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const locale = asString(req.body?.locale)
      if (!userId) throw new Error("ai_settings_user_id_required")
      if (!locale) throw new Error("ai_settings_locale_required")
      res.json({
        ok: true,
        data: aiSettingsProfileService.updateLocale({
          userId,
          locale,
          source: asString(req.body?.source) as never,
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/memory", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.listMemory(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/memory/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getMemorySettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/settings/:userId/memory/:entryId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const entryId = asString(req.params.entryId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      if (!entryId) throw new Error("ai_settings_memory_entry_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.removeMemory(userId, entryId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/premium", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getPremiumSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/notifications", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.listNotifications(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/settings/:userId/notifications/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_settings_user_id_required")
      res.json({ ok: true, data: aiSettingsProfileService.getNotificationSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  return router
}
