import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiAssistantAttachment, AiAssistantMode, AiProviderKey, AiAssistantProviderHint } from "../../../../core/kernel/ai/ai.types"
import type { AiAssistantService } from "../../application/services/ai-assistant.service"
import type { AiAssistantRequestSource } from "../../../../core/kernel/ai/ai.types"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
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

function asSource(value: unknown): AiAssistantRequestSource | undefined {
  return typeof value === "string" && ["text", "voice", "quick_action", "system", "attachment"].includes(value)
    ? (value as AiAssistantRequestSource)
    : undefined
}


function asProviderHint(value: unknown): AiAssistantProviderHint | undefined {
  return typeof value === "string" && ["chatgpt", "openai", "google_search", "google_translate", "google", "yandex", "internal"].includes(value)
    ? (value as AiAssistantProviderHint)
    : undefined
}

function asAttachments(value: unknown): AiAssistantAttachment[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item, index) => ({
      id: asString(item.id) ?? `attachment_${index + 1}`,
      kind: ["photo", "video", "document", "audio", "text", "unknown"].includes(String(item.kind))
        ? (String(item.kind) as AiAssistantAttachment["kind"])
        : "unknown",
      name: asString(item.name),
      uri: asString(item.uri),
      mimeType: asString(item.mimeType),
      sizeBytes: typeof item.sizeBytes === "number" ? item.sizeBytes : undefined,
      textPreview: asString(item.textPreview),
      metadata: asObject(item.metadata),
    }))
}


function isExplicitYandexGptRequest(provider?: string, providerHint?: string): boolean {
  return provider === "yandex" || providerHint === "yandex"
}

function createYandexGptGatewayUnavailableError() {
  const error = new Error("Yandex GPT gateway is not configured. Set AI_YANDEX_GPT_GATEWAY_URL on the server before executing Yandex assistant requests.")
  ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).status = 502
  ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).code = "ai_provider_gateway_unavailable"
  ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).details = {
    provider: "yandex",
    status: "unconfigured",
    attemptedProviders: ["yandex"],
    fallbackUsed: false,
    fakeFallbackAllowed: false,
    mobileSecretsAllowed: false,
    requiredEnv: "AI_YANDEX_GPT_GATEWAY_URL",
  }
  return error
}

function assertYandexGptGatewayConfigured(provider?: string, providerHint?: string) {
  if (!isExplicitYandexGptRequest(provider, providerHint)) return
  if (!process.env.AI_YANDEX_GPT_GATEWAY_URL?.trim()) {
    throw createYandexGptGatewayUnavailableError()
  }
}

function sendAiAssistantControlledError(res: Response, error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown AI assistant error")
  const controlled = error as Error & { status?: number; code?: string; details?: Record<string, unknown> }

  if (typeof controlled.status === "number" && controlled.code) {
    res.status(controlled.status).json({
      ok: false,
      error: {
        code: controlled.code,
        message,
        details: {
          ...(controlled.details ?? {}),
          fakeFallbackAllowed: false,
        },
      },
    })
    return true
  }

  return false
}

export function createAiAssistantRouter(aiAssistantService: AiAssistantService): Router {
  const router = Router()

  router.get("/assistant/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiAssistantService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/assistant/:userId/context", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_assistant_user_id_required")
      res.json({
        ok: true,
        data: aiAssistantService.getContext(
          userId,
          asMode(req.query.mode),
          asProvider(req.query.provider),
        ),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/assistant/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_assistant_user_id_required")
      res.json({ ok: true, data: aiAssistantService.getWorkspaceSummary(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/assistant/run", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const prompt = asString(req.body?.prompt)
      if (!userId) throw new Error("ai_assistant_user_id_required")
      if (!prompt) throw new Error("ai_assistant_prompt_required")

      // STEP70B_ASSISTANT_PROVIDER_FIELD:
      // Accept provider:"yandex" as an explicit live-provider request as well.
      const requestedProvider = asProvider(req.body?.provider)
      const preferredProvider = asProvider(req.body?.preferredProvider) ?? requestedProvider
      const providerHint = asProviderHint(req.body?.providerHint) ?? (requestedProvider === "yandex" ? "yandex" : undefined)

      assertYandexGptGatewayConfigured(preferredProvider, providerHint)

      res.json({
        ok: true,
        data: aiAssistantService.run({
          userId,
          prompt,
          locale: asString(req.body?.locale),
          source: asSource(req.body?.source),
          preferredMode: asMode(req.body?.preferredMode),
          preferredProvider,
          providerHint,
          webSearchEnabled: typeof req.body?.webSearchEnabled === "boolean" ? req.body.webSearchEnabled : undefined,
          voiceControlEnabled: typeof req.body?.voiceControlEnabled === "boolean" ? req.body.voiceControlEnabled : undefined,
          attachments: asAttachments(req.body?.attachments),
          clientCapabilities: Array.isArray(req.body?.clientCapabilities) ? req.body.clientCapabilities.filter((x: unknown) => typeof x === "string") as any : undefined,
          autoExecute: typeof req.body?.autoExecute === "boolean" ? req.body.autoExecute : undefined,
          confirmActionId: asString(req.body?.confirmActionId),
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      if (!sendAiAssistantControlledError(res, error)) next(error)
    }
  })

  return router
}
