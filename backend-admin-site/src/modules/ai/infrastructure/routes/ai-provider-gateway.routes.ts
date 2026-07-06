import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import multer from "multer"

import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiAssistantProviderHint,
  AiProviderKey,
  AiTranslationResponse,
} from "../../../../core/kernel/ai/ai.types"

declare const process: { env: Record<string, string | undefined> }

type UploadedImageFile = {
  originalname?: string
  mimetype?: string
  buffer?: Buffer
  size?: number
}

type GatewayErrorCode =
  | "ai_user_id_required"
  | "ai_translation_text_required"
  | "ai_translation_target_language_required"
  | "ai_translation_same_language_not_allowed"
  | "ai_translation_image_required"
  | "ai_image_ocr_gateway_not_configured"
  | "ai_image_ocr_gateway_failed"
  | "ai_image_ocr_empty_result"
  | "ai_provider_gateway_unavailable"
  | "ai_translation_failed"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 12 * 1024 * 1024,
    files: 1,
  },
})

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()
    if (normalized === "true") return true
    if (normalized === "false") return false
  }
  return undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  if (typeof value !== "string") return undefined
  return value === "yandex" ? "google" : ["internal", "google"].includes(value) ? (value as AiProviderKey) : undefined
}

function asProviderHint(value: unknown): AiAssistantProviderHint | undefined {
  return typeof value === "string" && ["google_translate", "google", "yandex", "internal"].includes(value)
    ? (value as AiAssistantProviderHint)
    : undefined
}

function providerFromHint(value: unknown): AiProviderKey | undefined {
  const hint = asProviderHint(value)

  if (hint === "google" || hint === "google_translate") return "google"
  if (hint === "yandex") return "google"
  if (hint === "internal") return "internal"

  return undefined
}

function userIdFromRequest(req: Request): string | undefined {
  return (
    asString(req.body?.userId) ||
    asString(req.body?.currentUserId) ||
    asString(req.headers["x-user-id"]) ||
    asString(req.headers["x-ai-user-id"])
  )
}

function normalizeLanguage(value: string | undefined): string | undefined {
  return value?.trim().toLowerCase()
}

function assertGatewayLanguagePair(sourceLanguage: string | undefined, targetLanguage: string) {
  const source = normalizeLanguage(sourceLanguage)
  const target = normalizeLanguage(targetLanguage)

  if (source && source !== "auto" && source === target) {
    throw createGatewayError(
      "ai_translation_same_language_not_allowed",
      "Provider gateway translation requires different source and target languages.",
      400,
    )
  }
}

function getRequestedProvider(req: Request): AiProviderKey {
  return asProvider(req.body?.preferredProvider) || providerFromHint(req.body?.providerHint) || "google"
}

function getGatewayConfigManifest(aiFacade: AiFacadeService) {
  const translationProviders = aiFacade.getTranslationProviderManifest()
  const ocrGatewayConfigured = Boolean(process.env.AI_IMAGE_OCR_GATEWAY_URL?.trim())
  const hasConfiguredTranslationProvider = translationProviders.some((provider) => provider.configured)

  return {
    gateway: {
      version: "AI-31.5",
      status: hasConfiguredTranslationProvider ? "configured" : "translation_provider_not_configured",
      fallbackPolicy: "disabled",
      localFakeFallback: false,
    },
    routes: {
      textTranslation: "/api/ai/provider-gateway/translation/text",
      imageTranslation: "/api/ai/provider-gateway/translation/image",
      health: "/api/ai/provider-gateway/health",
      manifest: "/api/ai/provider-gateway/manifest",
    },
    env: {
      googleTranslationGatewayConfigured: Boolean(process.env.AI_GOOGLE_TRANSLATION_GATEWAY_URL?.trim()),
      googleTranslationGatewayApiKeyConfigured: Boolean(process.env.AI_GOOGLE_TRANSLATION_GATEWAY_API_KEY?.trim()),
      googleTranslationGatewayAuthTokenConfigured: Boolean(process.env.AI_GOOGLE_TRANSLATION_GATEWAY_AUTH_TOKEN?.trim()),
      yandexTranslationGatewayConfigured: Boolean(process.env.AI_YANDEX_TRANSLATION_GATEWAY_URL?.trim()),
      yandexTranslationGatewayApiKeyConfigured: Boolean(process.env.AI_YANDEX_TRANSLATION_GATEWAY_API_KEY?.trim()),
      yandexTranslationGatewayAuthTokenConfigured: Boolean(process.env.AI_YANDEX_TRANSLATION_GATEWAY_AUTH_TOKEN?.trim()),
      internalTranslationGatewayConfigured: Boolean(process.env.AI_INTERNAL_TRANSLATION_GATEWAY_URL?.trim()),
      internalTranslationGatewayApiKeyConfigured: Boolean(process.env.AI_INTERNAL_TRANSLATION_GATEWAY_API_KEY?.trim()),
      internalTranslationGatewayAuthTokenConfigured: Boolean(process.env.AI_INTERNAL_TRANSLATION_GATEWAY_AUTH_TOKEN?.trim()),
      imageOcrGatewayConfigured: ocrGatewayConfigured,
      imageOcrGatewayApiKeyConfigured: Boolean(process.env.AI_IMAGE_OCR_GATEWAY_API_KEY?.trim()),
      imageOcrGatewayAuthTokenConfigured: Boolean(process.env.AI_IMAGE_OCR_GATEWAY_AUTH_TOKEN?.trim()),
      translationGatewayTimeoutMs: Number(process.env.AI_TRANSLATION_GATEWAY_TIMEOUT_MS || 30_000),
      imageOcrGatewayTimeoutMs: Number(process.env.AI_IMAGE_OCR_GATEWAY_TIMEOUT_MS || 30_000),
    },
    providers: {
      translation: translationProviders,
    },
    imageTranslation: {
      enabled: ocrGatewayConfigured,
      requiredFields: ["image", "imageUri", "fileName", "mimeType", "sourceLanguage", "targetLanguage"],
      maxUploadBytes: 12 * 1024 * 1024,
    },
  }
}

function createGatewayError(code: GatewayErrorCode, message: string, status = 400, details?: unknown) {
  const error = new Error(message) as Error & { code: GatewayErrorCode; status: number; details?: unknown }
  error.code = code
  error.status = status
  error.details = details
  return error
}

function sendGatewayError(res: Response, error: unknown) {
  const record = typeof error === "object" && error !== null ? (error as Record<string, unknown>) : {}
  const status = typeof record.status === "number" ? record.status : 500
  const code = typeof record.code === "string" ? record.code : "ai_provider_gateway_error"
  const message = error instanceof Error ? error.message : "AI provider gateway failed."

  res.status(status).json({
    ok: false,
    error: code,
    code,
    message,
    details: record.details,
  })
}

function firstTranslatedText(response: AiTranslationResponse): string | undefined {
  return (
    asString(response.translatedText) ||
    asString(response.translatedTranscript) ||
    response.segments.map((segment) => asString(segment.translatedText)).find(Boolean)
  )
}

function assertProviderOutput(response: AiTranslationResponse): string {
  const translatedText = firstTranslatedText(response)

  if (!response.configured || response.status !== "configured") {
    throw createGatewayError(
      "ai_provider_gateway_unavailable",
      response.note || "AI translation provider gateway is not configured.",
      502,
      {
        provider: response.provider,
        status: response.status,
        attemptedProviders: response.attemptedProviders,
      },
    )
  }

  if (!translatedText) {
    throw createGatewayError(
      "ai_translation_failed",
      response.note || "AI translation provider gateway returned an empty translation.",
      502,
      {
        provider: response.provider,
        status: response.status,
        attemptedProviders: response.attemptedProviders,
      },
    )
  }

  return translatedText
}

function normalizeFileName(input: { fileName?: string; imageUri?: string; file?: UploadedImageFile }): string {
  const provided = asString(input.fileName)
  if (provided) return provided

  const original = asString(input.file?.originalname)
  if (original) return original

  const uri = asString(input.imageUri)
  const uriPath = uri?.split("?")[0]
  const lastSegment = uriPath?.split("/").filter(Boolean).pop()
  if (lastSegment) return lastSegment

  return `sabi-ai-image-${Date.now()}.jpg`
}

function normalizeMimeType(input: { mimeType?: string; fileName: string; file?: UploadedImageFile }): string {
  const provided = asString(input.mimeType)
  if (provided) return provided

  const fromFile = asString(input.file?.mimetype)
  if (fromFile) return fromFile

  const extension = input.fileName.split(".").pop()?.toLowerCase()
  if (extension === "png") return "image/png"
  if (extension === "webp") return "image/webp"
  if (extension === "heic") return "image/heic"
  if (extension === "heif") return "image/heif"

  return "image/jpeg"
}

async function resolveImageOcrText(input: {
  userId: string
  imageUri?: string
  fileName: string
  mimeType: string
  file?: UploadedImageFile
  locale?: string
  sourceLanguage?: string
}): Promise<{ text: string; provider: string; raw?: Record<string, unknown> }> {
  const gatewayUrl = process.env.AI_IMAGE_OCR_GATEWAY_URL?.trim()

  if (!gatewayUrl) {
    throw createGatewayError(
      "ai_image_ocr_gateway_not_configured",
      "AI image OCR gateway is not configured. Set AI_IMAGE_OCR_GATEWAY_URL before enabling image translation.",
      503,
    )
  }

  const imageBase64 = input.file?.buffer?.length ? input.file.buffer.toString("base64") : undefined

  if (!imageBase64 && !input.imageUri) {
    throw createGatewayError(
      "ai_translation_image_required",
      "Image translation requires multipart image file or imageUri.",
      400,
    )
  }

  let response: any

  try {
    response = await fetch(gatewayUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: input.userId,
        imageBase64,
        imageUri: input.imageUri,
        fileName: input.fileName,
        mimeType: input.mimeType,
        locale: input.locale,
        sourceLanguage: input.sourceLanguage,
        providerHint: "ocr",
        gatewayRequired: true,
        allowFallback: false,
      }),
    })
  } catch (error) {
    throw createGatewayError(
      "ai_image_ocr_gateway_failed",
      error instanceof Error ? error.message : "AI image OCR gateway request failed.",
      502,
      error,
    )
  }

  if (!response.ok) {
    throw createGatewayError(
      "ai_image_ocr_gateway_failed",
      `AI image OCR gateway returned HTTP ${response.status}.`,
      502,
      { status: response.status },
    )
  }

  const payload = (await response.json()) as Record<string, unknown>
  const text =
    asString(payload.text) ||
    asString(payload.extractedText) ||
    asString(payload.ocrText) ||
    asString(payload.result)

  if (!text) {
    throw createGatewayError(
      "ai_image_ocr_empty_result",
      "AI image OCR gateway returned an empty OCR result.",
      502,
      payload,
    )
  }

  return {
    text,
    provider: asString(payload.provider) || "ocr_gateway",
    raw: payload,
  }
}

export function createAiProviderGatewayRouter(aiFacade: AiFacadeService): Router {
  const router = Router()
  const gatewayRouter = Router()

  gatewayRouter.get("/health", (_req: Request, res: Response) => {
    const manifest = getGatewayConfigManifest(aiFacade)

    res.json({
      ok: true,
      data: {
        area: "ai_provider_gateway",
        version: "AI-31.5",
        status: manifest.gateway.status,
        fallbackPolicy: manifest.gateway.fallbackPolicy,
        localFakeFallback: manifest.gateway.localFakeFallback,
        env: manifest.env,
      },
    })
  })

  gatewayRouter.get("/manifest", (_req: Request, res: Response) => {
    res.json({
      ok: true,
      data: getGatewayConfigManifest(aiFacade),
    })
  })

  gatewayRouter.post("/translation/text", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = userIdFromRequest(req)
      const text = asString(req.body?.text)
      const targetLanguage = asString(req.body?.targetLanguage)
      const sourceLanguage = asString(req.body?.sourceLanguage)

      if (!userId) {
        throw createGatewayError("ai_user_id_required", "AI provider gateway requires userId or x-user-id.", 401)
      }
      if (!text) {
        throw createGatewayError("ai_translation_text_required", "AI provider gateway text translation requires text.", 400)
      }
      if (!targetLanguage) {
        throw createGatewayError(
          "ai_translation_target_language_required",
          "AI provider gateway text translation requires targetLanguage.",
          400,
        )
      }

      assertGatewayLanguagePair(sourceLanguage, targetLanguage)

      const translation = await aiFacade.translate({
        userId,
        contentType: "text",
        text,
        sourceLanguage,
        targetLanguage,
        locale: asString(req.body?.locale),
        preferredProvider: getRequestedProvider(req),
        providerHint: asProviderHint(req.body?.providerHint),
        preserveFormatting: asBoolean(req.body?.preserveFormatting) ?? true,
        allowFallback: false,
        fallbackProviders: [],
      })
      const translatedText = assertProviderOutput(translation)

      res.json({
        ok: true,
        data: {
          ...translation,
          translatedText,
          sourceText: text,
          gatewayRequired: true,
          fallbackUsed: false,
          clientSurface: asString(req.body?.surface),
          sessionId: asString(req.body?.sessionId),
          chatId: asString(req.body?.chatId),
          messageId: asString(req.body?.messageId),
        },
      })
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        sendGatewayError(res, error)
        return
      }
      next(error)
    }
  })

  gatewayRouter.post(
    "/translation/image",
    upload.single("image"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.file as UploadedImageFile | undefined
        const userId = userIdFromRequest(req)
        const imageUri = asString(req.body?.imageUri)
        const targetLanguage = asString(req.body?.targetLanguage)
        const sourceLanguage = asString(req.body?.sourceLanguage)
        const fileName = normalizeFileName({ fileName: asString(req.body?.fileName), imageUri, file })
        const mimeType = normalizeMimeType({ mimeType: asString(req.body?.mimeType), fileName, file })

        if (!userId) {
          throw createGatewayError("ai_user_id_required", "AI provider gateway requires userId or x-user-id.", 401)
        }
        if (!targetLanguage) {
          throw createGatewayError(
            "ai_translation_target_language_required",
            "AI provider gateway image translation requires targetLanguage.",
            400,
          )
        }
        if (!file?.buffer?.length && !imageUri) {
          throw createGatewayError(
            "ai_translation_image_required",
            "AI provider gateway image translation requires multipart image file or imageUri.",
            400,
          )
        }

        assertGatewayLanguagePair(sourceLanguage, targetLanguage)

        const ocr = await resolveImageOcrText({
          userId,
          imageUri,
          fileName,
          mimeType,
          file,
          locale: asString(req.body?.locale),
          sourceLanguage,
        })

        const translation = await aiFacade.translate({
          userId,
          contentType: "image",
          text: ocr.text,
          transcript: ocr.text,
          mediaUrl: imageUri || `multipart:${fileName}`,
          sourceLanguage,
          targetLanguage,
          locale: asString(req.body?.locale),
          preferredProvider: getRequestedProvider(req),
          providerHint: asProviderHint(req.body?.providerHint),
          preserveFormatting: true,
          allowFallback: false,
          fallbackProviders: [],
        })
        const translatedText = assertProviderOutput(translation)

        res.json({
          ok: true,
          data: {
            ...translation,
            translatedText,
            ocrText: ocr.text,
            sourceText: ocr.text,
            ocrProvider: ocr.provider,
            ocrRaw: ocr.raw,
            imageUri,
            fileName,
            mimeType,
            imageSizeBytes: file?.size,
            gatewayRequired: true,
            fallbackUsed: false,
            imageTranslation: true,
            clientSurface: asString(req.body?.surface),
            sessionId: asString(req.body?.sessionId),
          },
        })
      } catch (error) {
        if (error instanceof Error && "status" in error) {
          sendGatewayError(res, error)
          return
        }
        next(error)
      }
    },
  )

  router.use("/provider-gateway", gatewayRouter)

  return router
}
