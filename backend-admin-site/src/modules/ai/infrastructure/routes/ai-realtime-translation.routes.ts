import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiProviderKey, AiTranslationContentType } from "../../../../core/kernel/ai/ai.types"
import type {
  AiRealtimeTranslationDirection,
  AiRealtimeTranslationSessionStatus,
  AiRealtimeTranslationSurface,
} from "../../../../core/kernel/ai/ai-realtime-translation.types"
import type { AiRealtimeTranslationApplicationService } from "../../application/services/ai-realtime-translation.service"

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

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && ["internal", "google", "yandex"].includes(value)
    ? (value as AiProviderKey)
    : undefined
}

function asSurface(value: unknown): AiRealtimeTranslationSurface | undefined {
  return typeof value === "string" && ["text_chat", "audio_message", "video_message", "voice_call", "video_call"].includes(value)
    ? (value as AiRealtimeTranslationSurface)
    : undefined
}

function asContentType(value: unknown): AiTranslationContentType | undefined {
  return typeof value === "string" && ["text", "audio_message", "video_message", "call"].includes(value)
    ? (value as AiTranslationContentType)
    : undefined
}

function asStatus(value: unknown): AiRealtimeTranslationSessionStatus | undefined {
  return typeof value === "string" && ["active", "paused", "stopped"].includes(value)
    ? (value as AiRealtimeTranslationSessionStatus)
    : undefined
}

function asDirection(value: unknown): AiRealtimeTranslationDirection | undefined {
  return typeof value === "string" && ["incoming", "outgoing", "system"].includes(value)
    ? (value as AiRealtimeTranslationDirection)
    : undefined
}

function readSegmentBody(body: Request["body"]) {
  const userId = asString(body?.userId)
  if (!userId) throw new Error("ai_realtime_translation_user_id_required")

  return {
    userId,
    sessionId: asString(body?.sessionId),
    surface: asSurface(body?.surface),
    contentType: asContentType(body?.contentType),
    targetLanguage: asString(body?.targetLanguage),
    sourceLanguage: asString(body?.sourceLanguage),
    locale: asString(body?.locale),
    preferredProvider: asProvider(body?.preferredProvider),
    chatId: asString(body?.chatId),
    messageId: asString(body?.messageId),
    peerUserId: asString(body?.peerUserId),
    callSessionId: asString(body?.callSessionId),
    speakerId: asString(body?.speakerId),
    speakerLabel: asString(body?.speakerLabel),
    direction: asDirection(body?.direction),
    startedAtMs: asNumber(body?.startedAtMs),
    endedAtMs: asNumber(body?.endedAtMs),
    text: asString(body?.text),
    transcript: asString(body?.transcript),
    autoSpeak: asBoolean(body?.autoSpeak),
    preserveFormatting: asBoolean(body?.preserveFormatting),
    metadata: asObject(body?.metadata),
  }
}

export function createAiRealtimeTranslationRouter(
  service: AiRealtimeTranslationApplicationService,
): Router {
  const router = Router()

  router.get("/translation/realtime/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: service.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/translation/realtime/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_realtime_translation_user_id_required")
      res.json({ ok: true, data: service.getSummary(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/translation/realtime/:userId/sessions", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_realtime_translation_user_id_required")
      res.json({ ok: true, data: service.listSessions(userId, asStatus(req.query.status)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/translation/realtime/session", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const surface = asSurface(req.body?.surface)
      const targetLanguage = asString(req.body?.targetLanguage)
      if (!userId) throw new Error("ai_realtime_translation_user_id_required")
      if (!surface) throw new Error("ai_realtime_translation_surface_required")
      if (!targetLanguage) throw new Error("ai_realtime_translation_target_language_required")
      res.json({
        ok: true,
        data: service.startSession({
          userId,
          surface,
          targetLanguage,
          sourceLanguage: asString(req.body?.sourceLanguage),
          locale: asString(req.body?.locale),
          preferredProvider: asProvider(req.body?.preferredProvider),
          chatId: asString(req.body?.chatId),
          messageId: asString(req.body?.messageId),
          peerUserId: asString(req.body?.peerUserId),
          callSessionId: asString(req.body?.callSessionId),
          autoSpeak: asBoolean(req.body?.autoSpeak),
          preserveFormatting: asBoolean(req.body?.preserveFormatting),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/translation/realtime/:userId/session/:sessionId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const sessionId = asString(req.params.sessionId)
      if (!userId) throw new Error("ai_realtime_translation_user_id_required")
      if (!sessionId) throw new Error("ai_realtime_translation_session_id_required")
      res.json({
        ok: true,
        data: service.updateSession({
          userId,
          sessionId,
          status: asStatus(req.body?.status),
          targetLanguage: asString(req.body?.targetLanguage),
          sourceLanguage: asString(req.body?.sourceLanguage),
          preferredProvider: asProvider(req.body?.preferredProvider),
          autoSpeak: asBoolean(req.body?.autoSpeak),
          preserveFormatting: asBoolean(req.body?.preserveFormatting),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/translation/realtime/:userId/session/:sessionId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const sessionId = asString(req.params.sessionId)
      if (!userId) throw new Error("ai_realtime_translation_user_id_required")
      if (!sessionId) throw new Error("ai_realtime_translation_session_id_required")
      res.json({ ok: true, data: service.stopSession(userId, sessionId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/translation/realtime/text", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await service.translateText(readSegmentBody(req.body)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/translation/realtime/message", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await service.translateMessage(readSegmentBody(req.body)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/translation/realtime/media-transcript", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await service.translateMediaTranscript(readSegmentBody(req.body)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/translation/realtime/call-segment", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await service.translateCallSegment(readSegmentBody(req.body)) })
    } catch (error) {
      next(error)
    }
  })

  return router
}
