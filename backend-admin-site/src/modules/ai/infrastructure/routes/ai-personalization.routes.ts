import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiPersonalizationApplicationService } from "../../application/services/ai-personalization.service"
import type {
  AiPersonalizationPreferenceKey,
  AiPersonalizationPrivacyMode,
  AiPersonalizationSignalKind,
  AiPersonalizationSignalSource,
} from "../../../../core/kernel/ai/ai-personalization.types"
import type { AiMemoryKind } from "../../../../core/kernel/ai/ai.types"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function asStringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : undefined
}

function requireUserId(value: unknown): string {
  const userId = asString(value)
  if (!userId) throw new Error("ai_personalization_user_id_required")
  return userId
}

function asPrivacyMode(value: unknown): AiPersonalizationPrivacyMode | undefined {
  return value === "strict" || value === "balanced" || value === "adaptive" ? value : undefined
}

function asPreferenceKey(value: unknown): AiPersonalizationPreferenceKey | undefined {
  return typeof value === "string" && [
    "assistant_tone",
    "default_language",
    "translation_target_language",
    "search_provider",
    "translation_provider",
    "preferred_mode",
    "favorite_module",
    "learning_level",
    "business_mode",
    "voice_enabled",
    "safe_action_level",
  ].includes(value)
    ? (value as AiPersonalizationPreferenceKey)
    : undefined
}

function asSignalKind(value: unknown): AiPersonalizationSignalKind | undefined {
  return typeof value === "string" && [
    "assistant_prompt",
    "assistant_response",
    "app_action",
    "translation",
    "search",
    "voice",
    "settings",
    "memory",
    "task",
  ].includes(value)
    ? (value as AiPersonalizationSignalKind)
    : undefined
}

function asSignalSource(value: unknown): AiPersonalizationSignalSource | undefined {
  return value === "user" || value === "assistant" || value === "system" || value === "mobile_ui"
    ? value
    : undefined
}

function asMemoryKind(value: unknown): AiMemoryKind | undefined {
  return typeof value === "string" && [
    "preference",
    "profile_fact",
    "task_context",
    "study_context",
    "business_context",
    "saved_instruction",
  ].includes(value)
    ? (value as AiMemoryKind)
    : undefined
}

export function createAiPersonalizationRouter(aiPersonalizationService: AiPersonalizationApplicationService): Router {
  const router = Router()

  router.get("/personalization/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiPersonalizationService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/personalization/:userId/snapshot", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        data: aiPersonalizationService.getSnapshot(requireUserId(req.params.userId), asString(req.query.prompt)),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/personalization/:userId/context", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        data: aiPersonalizationService.getContext(
          requireUserId(req.params.userId),
          asString(req.query.prompt),
          asNumber(Number(req.query.limit)),
        ),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/personalization/:userId/profile", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiPersonalizationService.getProfile(requireUserId(req.params.userId)) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/personalization/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiPersonalizationService.getSummary(requireUserId(req.params.userId)) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/personalization/:userId/privacy-mode", (req: Request, res: Response, next: NextFunction) => {
    try {
      const privacyMode = asPrivacyMode(req.body?.privacyMode)
      if (!privacyMode) throw new Error("ai_personalization_privacy_mode_invalid")
      res.json({ ok: true, data: aiPersonalizationService.updatePrivacyMode(requireUserId(req.params.userId), privacyMode) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/personalization/:userId/preferences", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req.params.userId)
      const preferences = Array.isArray(req.body?.preferences) ? req.body.preferences : []
      res.json({
        ok: true,
        data: aiPersonalizationService.updatePreferences({
          userId,
          preferences: preferences.map((item: Record<string, unknown>) => {
            const key = asPreferenceKey(item.key)
            const value = asString(item.value)
            if (!key || !value) throw new Error("ai_personalization_preference_invalid")
            return {
              key,
              value,
              source: item.source === "memory" || item.source === "behavior" || item.source === "system" ? item.source : "user",
              confidence: asNumber(item.confidence),
              metadata: asObject(item.metadata),
            }
          }),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/personalization/:userId/signals", (req: Request, res: Response, next: NextFunction) => {
    try {
      const kind = asSignalKind(req.body?.kind)
      const summary = asString(req.body?.summary)
      if (!kind || !summary) throw new Error("ai_personalization_signal_invalid")
      res.json({
        ok: true,
        data: aiPersonalizationService.recordSignal({
          userId: requireUserId(req.params.userId),
          kind,
          source: asSignalSource(req.body?.source),
          summary,
          weight: asNumber(req.body?.weight),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/personalization/:userId/instructions", (req: Request, res: Response, next: NextFunction) => {
    try {
      const title = asString(req.body?.title)
      const instruction = asString(req.body?.instruction)
      if (!title || !instruction) throw new Error("ai_personalization_instruction_invalid")
      res.json({
        ok: true,
        data: aiPersonalizationService.addInstruction({
          userId: requireUserId(req.params.userId),
          title,
          instruction,
          kind: asMemoryKind(req.body?.kind),
          tags: asStringArray(req.body?.tags),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/personalization/:userId/signals", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiPersonalizationService.clearSignals(requireUserId(req.params.userId)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/personalization/:userId/rebuild", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiPersonalizationService.rebuildProfile(requireUserId(req.params.userId)) })
    } catch (error) {
      next(error)
    }
  })

  return router
}
