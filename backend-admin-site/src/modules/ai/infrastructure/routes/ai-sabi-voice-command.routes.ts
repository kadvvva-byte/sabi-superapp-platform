import { Router, type Request, type Response } from "express"

import type { AiSabiVoiceCommandService } from "../../application/services/ai-sabi-voice-command.service"
import type { AiSabiVoiceCommandPrepareRequestContract, AiSabiVoiceCommandSource } from "../../contracts/ai-sabi-voice-command.contracts"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined
}

function asSource(value: unknown): AiSabiVoiceCommandSource | undefined {
  return typeof value === "string" &&
    ["wake_word", "push_to_talk", "quick_action", "voice_screen", "messenger_call", "system"].includes(value)
    ? (value as AiSabiVoiceCommandSource)
    : undefined
}

function buildPrepareRequest(req: Request): AiSabiVoiceCommandPrepareRequestContract {
  const userId = asString(req.body?.userId) || asString(req.headers["x-user-id"])
  const transcript = asString(req.body?.transcript) || asString(req.body?.text) || asString(req.body?.command)

  if (!userId) throw new Error("ai_sabi_voice_user_id_required")
  if (!transcript) throw new Error("ai_sabi_voice_transcript_required")

  return {
    userId,
    transcript,
    source: asSource(req.body?.source),
    locale: asString(req.body?.locale) || asString(req.body?.language),
    deviceId: asString(req.body?.deviceId),
    sessionId: asString(req.body?.sessionId),
    premiumEnabled: asBoolean(req.body?.premiumEnabled),
    metadata: asObject(req.body?.metadata),
  }
}

function sendError(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : "ai_sabi_voice_command_failed"
  const status = message.includes("required") ? 400 : 500
  res.status(status).json({
    ok: false,
    error: {
      code: message,
      message,
    },
  })
}

export function createAiSabiVoiceCommandRouter(service: AiSabiVoiceCommandService) {
  const router = Router()

  router.get("/sabi-voice/manifest", (_req, res) => {
    res.json({ ok: true, data: service.getManifest() })
  })

  router.get("/sabi-voice/status", (req, res) => {
    const userId = asString(req.query.userId) || asString(req.headers["x-user-id"])
    res.json({ ok: true, data: service.getStatus(userId) })
  })

  router.post("/sabi-voice/prepare-command", (req, res) => {
    try {
      const input = buildPrepareRequest(req)
      const result = service.prepareCommand(input)
      const httpStatus = result.ok ? 200 : result.status === "provider_not_configured" ? 503 : 409
      res.status(httpStatus).json({ ok: result.ok, data: result })
    } catch (error) {
      sendError(res, error)
    }
  })

  return router
}
