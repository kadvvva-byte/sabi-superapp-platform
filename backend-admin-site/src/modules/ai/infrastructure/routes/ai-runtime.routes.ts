import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import { GoogleAiProvider } from "../../../../core/kernel/ai/providers/google-ai.provider"

import type {
  AiAssistantAttachment,
  AiAssistantMode,
  AiAssistantProviderHint,
  AiNotificationKind,
  AiProviderKey,
  AiSearchVertical,
  AiTaskStatus,
  AiTranslationContentType,
} from "../../../../core/kernel/ai/ai.types"

declare const process: { env: Record<string, string | undefined> }

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

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asMode(value: unknown): AiAssistantMode | undefined {
  return typeof value === "string" &&
    ["general", "business", "education", "student", "abiturient", "teacher", "translation", "search"].includes(value)
    ? (value as AiAssistantMode)
    : undefined
}

function asProvider(value: unknown): AiProviderKey | undefined {
  return typeof value === "string" && ["internal", "google", "yandex", "openai"].includes(value)
    ? (value as AiProviderKey)
    : undefined
}

function asVertical(value: unknown): AiSearchVertical | undefined {
  return typeof value === "string" && ["web", "images", "video", "music", "files"].includes(value)
    ? (value as AiSearchVertical)
    : undefined
}

function asTaskStatus(value: unknown): AiTaskStatus | undefined {
  return typeof value === "string" && ["draft", "awaiting_confirmation", "completed", "cancelled"].includes(value)
    ? (value as AiTaskStatus)
    : undefined
}

function asTranslationContentType(value: unknown): AiTranslationContentType | undefined {
  return typeof value === "string" && ["text", "image", "document", "audio_message", "video_message", "call"].includes(value)
    ? (value as AiTranslationContentType)
    : undefined
}

function asNotificationKind(value: unknown): AiNotificationKind | undefined {
  return typeof value === "string" &&
    [
      "task_ready",
      "search_completed",
      "translation_ready",
      "memory_suggestion",
      "business_summary_ready",
      "education_plan_ready",
      "premium_unlocked",
    ].includes(value)
    ? (value as AiNotificationKind)
    : undefined
}

function asProviderHint(value: unknown): AiAssistantProviderHint | undefined {
  return typeof value === "string" &&
    ["chatgpt", "openai", "google_search", "google_translate", "google", "yandex", "internal"].includes(value)
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

async function resolveImageOcrText(input: {
  userId: string
  imageBase64?: string
  imageUri?: string
  mimeType?: string
  fileName?: string
  locale?: string
  sourceLanguage?: string
  extractedText?: string
}): Promise<{ text: string; provider: string; raw?: Record<string, unknown> }> {
  if (input.extractedText?.trim()) {
    return { text: input.extractedText.trim(), provider: "client_extracted_text" }
  }

  const gatewayUrl = process.env.AI_IMAGE_OCR_GATEWAY_URL?.trim()

  if (!gatewayUrl) {
    throw new Error("ai_image_ocr_gateway_not_configured")
  }

  if (!input.imageBase64 && !input.imageUri) {
    throw new Error("ai_image_payload_required")
  }

  const response = await fetch(gatewayUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userId: input.userId,
      imageBase64: input.imageBase64,
      imageUri: input.imageUri,
      mimeType: input.mimeType,
      fileName: input.fileName,
      locale: input.locale,
      sourceLanguage: input.sourceLanguage,
      providerHint: "ocr",
    }),
  })

  if (!response.ok) {
    throw new Error(`ai_image_ocr_gateway_http_${response.status}`)
  }

  const payload = (await response.json()) as Record<string, unknown>
  const text =
    asString(payload.text) ||
    asString(payload.extractedText) ||
    asString(payload.ocrText) ||
    asString(payload.result)

  if (!text) {
    throw new Error("ai_image_ocr_empty_result")
  }

  return {
    text,
    provider: asString(payload.provider) ?? "ocr_gateway",
    raw: payload,
  }
}



function normalizeLegacyAiProvider(provider?: AiProviderKey): AiProviderKey | undefined {
  return provider === "yandex" ? "google" : provider
}

function normalizeLegacyProviderHint(providerHint?: AiAssistantProviderHint): AiAssistantProviderHint | undefined {
  return providerHint === "yandex" ? "google" : providerHint
}

function isExplicitGoogleAiRequest(provider?: string, providerHint?: string): boolean {
  return provider === "google" || provider === "yandex" || providerHint === "google" || providerHint === "yandex"
}

function assertGoogleAiConfigured(provider?: string, providerHint?: string) {
  if (!isExplicitGoogleAiRequest(provider, providerHint)) return

  if (
    !process.env.GEMINI_API_KEY?.trim() &&
    !process.env.GOOGLE_API_KEY?.trim() &&
    !process.env.AI_GOOGLE_AI_API_KEY?.trim()
  ) {
    const error = new Error("Google AI / Gemini is not configured. Set GEMINI_API_KEY or GOOGLE_API_KEY on the backend server before executing Google AI assistant requests.")
    ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).status = 502
    ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).code = "ai_provider_gateway_unavailable"
    ;(error as Error & { status?: number; code?: string; details?: Record<string, unknown> }).details = {
      provider: "google",
      status: "unconfigured",
      attemptedProviders: ["google"],
      fallbackUsed: false,
      fakeFallbackAllowed: false,
      mobileSecretsAllowed: false,
      requiredEnv: "GEMINI_API_KEY or GOOGLE_API_KEY",
      legacyAliasAccepted: "yandex",
    }
    throw error
  }
}

type SabiRuntimeSearchContext = {
  attempted: boolean
  provider?: string
  status?: string
  configured?: boolean
  fallbackUsed?: boolean
  results?: Array<{ title?: string; snippet?: string; url?: string; sourceDomain?: string }>
  note?: string
}

function shouldUseLiveSearchForAnswer(prompt: string, webSearchEnabled?: boolean, preferredMode?: string): boolean {
  if (webSearchEnabled === false) return false
  const value = prompt.toLowerCase()
  if (/\b(умнож|слож|выч|дели|плюс|минус|multiply|times|plus|minus|divide)\b/i.test(value) && /\d/.test(value)) return false
  if (preferredMode === "search") return true
  // STEP257B_GOOGLE_AI_SEARCH_FIRST:
  // Google AI mode must not answer fresh/factual/search questions with vague
  // textbook text. Search-first is used for current facts and for explicit
  // "find/explain from internet" prompts, while creative/math prompts stay fast.
  return /\b(найди|поищи|поиск|из интернета|в интернете|сейчас|сегодня|последн|новост|актуальн|кто сейчас|что сейчас|цена|курс|погода|search|find|latest|current|today|news|internet|web|hozir|bugun|qidir|topib ber|最新|搜索|今天|现在|обновлен|официальн|релиз|курс|where to|how much|что такое.*сейчас|latest information)\b/i.test(value)
}

function buildSearchSystemContext(searchContext?: SabiRuntimeSearchContext): string | undefined {
  if (!searchContext?.attempted) return undefined
  if (!searchContext.results?.length) {
    return [
      "Live search was attempted, but no useful live results were returned.",
      searchContext.note ? `Search note: ${searchContext.note}` : "",
      "Still answer directly from available knowledge, and clearly say if live freshness is uncertain. Do not ask the user a question instead of answering.",
    ].filter(Boolean).join("\n")
  }

  const results = searchContext.results.slice(0, 5).map((item, index) => {
    return [
      `${index + 1}. ${item.title || "Untitled"}`,
      item.sourceDomain ? `Source: ${item.sourceDomain}` : "",
      item.snippet ? `Snippet: ${item.snippet}` : "",
      item.url ? `URL: ${item.url}` : "",
    ].filter(Boolean).join("\n")
  }).join("\n\n")

  return [
    "STEP71A live search context: answer concretely from these results. Synthesize the facts, mention limits when sources are weak, and do not give generic filler or dump raw links.",
    results,
  ].join("\n\n")
}

function normalizeSearchResultsForAssistant(value: unknown): SabiRuntimeSearchContext {
  const root = asObject(value) ?? {}
  const resultsRaw = Array.isArray(root.results) ? root.results : []
  const results = resultsRaw
    .map((entry) => asObject(entry))
    .filter((entry): entry is Record<string, unknown> => Boolean(entry))
    .map((entry) => ({
      title: asString(entry.title),
      snippet: asString(entry.snippet),
      url: asString(entry.url),
      sourceDomain: asString(entry.sourceDomain),
    }))

  return {
    attempted: true,
    provider: asString(root.provider),
    status: asString(root.status),
    configured: typeof root.configured === "boolean" ? root.configured : undefined,
    fallbackUsed: typeof root.fallbackUsed === "boolean" ? root.fallbackUsed : undefined,
    results,
    note: asString(root.note),
  }
}


function buildStep71ESoftUnavailableText(locale?: string): string {
  const primary = String(locale || "ru").toLowerCase().split(/[-_]/)[0]
  if (primary === "uz") return "Hozir sifatli javob tayyorlay olmadim. Iltimos, yana bir marta urinib ko‘ring."
  if (primary === "de") return "Ich konnte gerade keine zuverlässige Antwort vorbereiten. Bitte versuche es noch einmal."
  if (primary === "zh") return "我现在无法生成足够可靠的回答。请再试一次。"
  if (primary === "en") return "I couldn’t prepare a reliable answer right now. Please try again."
  return "Сейчас не удалось получить качественный ответ. Повторите запрос."
}

function buildStep71ESoftUnavailableData(input: {
  userId: string
  locale?: string
  prompt: string
  runtimeData?: Record<string, unknown>
  providerStatus?: string
  providerNote?: string
  quality?: unknown
  searchContext?: SabiRuntimeSearchContext
}) {
  const now = new Date().toISOString()
  const runId = `ai_runtime_google_ai_quality_unavailable_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  const text = buildStep71ESoftUnavailableText(input.locale)
  const answer = {
    text,
    messageKey: "ai.answer.quality_unavailable",
    tone: "soft_error",
    suggestions: [] as string[],
  }
  const providerRoute = {
    kind: "assistant",
    provider: "google",
    label: "Google AI / Gemini",
    status: input.providerStatus || "quality_unavailable",
    configured: true,
    fallbackUsed: false,
    attemptedProviders: ["google"],
    performedAt: now,
  }
  const providerResponse = {
    provider: "google",
    configured: true,
    status: input.providerStatus || "quality_unavailable",
    fallbackUsed: false,
    attemptedProviders: ["google"],
    quality: input.quality,
    note: input.providerNote,
    userFacingSoftError: true,
    fakeFallbackAllowed: false,
  }
  return {
    ...(input.runtimeData || {}),
    text,
    reply: text,
    answer,
    providerRoute,
    providerResponse,
    searchContext: input.searchContext,
    assistant: {
      id: runId,
      createdAt: now,
      executionStatus: "quality_unavailable",
      answer,
      providerRoute,
      providerResponse,
    },
    assistantRun: {
      id: runId,
      createdAt: now,
      executionStatus: "quality_unavailable",
      answer,
      providerRoute,
      providerResponse,
      context: {
        userId: input.userId,
        locale: input.locale,
        provider: "google",
        languageLock: true,
        searchContext: input.searchContext,
      },
    },
  }
}

function sendAiRuntimeControlledError(res: Response, error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown AI runtime error")

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

  if (message === "AI internet search is blocked until the user grants permission") {
    res.status(403).json({
      ok: false,
      error: {
        code: "ai_internet_search_consent_required",
        message,
        details: {
          status: "consent_required",
          internetSearchRequired: true,
          fakeFallbackAllowed: false,
        },
      },
    })
    return true
  }

  if (message === "Feature is locked until a COIN-backed AI premium feature or plan is activated.") {
    res.status(402).json({
      ok: false,
      error: {
        code: "ai_premium_required",
        message,
        details: {
          status: "premium_required",
          coinBackedPremiumRequired: true,
          fakeFallbackAllowed: false,
        },
      },
    })
    return true
  }

  if (message === "ai_user_id_required" || message === "ai_query_required") {
    res.status(400).json({
      ok: false,
      error: {
        code: message,
        message,
        details: {
          status: "invalid_request",
          fakeFallbackAllowed: false,
        },
      },
    })
    return true
  }

  return false
}

export function createAiRuntimeRouter(aiFacade: AiFacadeService): Router {
  const router = Router()

  router.post("/ask", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const prompt = asString(req.body?.prompt)

      if (!userId) throw new Error("ai_user_id_required")
      if (!prompt) throw new Error("ai_prompt_required")

      // 257B_GOOGLE_AI_PRIMARY_WITH_YANDEX_LEGACY_ALIAS:
      // Old clients/settings may still send provider: "google". Keep that value as
      // a compatibility alias, but execute through backend Google AI / Gemini only.
      const requestedProviderRaw = asProvider(req.body?.provider)
      const preferredProviderRaw = asProvider(req.body?.preferredProvider) ?? requestedProviderRaw
      const requestedProvider = normalizeLegacyAiProvider(requestedProviderRaw)
      const preferredProvider = normalizeLegacyAiProvider(preferredProviderRaw)
      const providerHintRaw = asProviderHint(req.body?.providerHint)
      const providerHint = normalizeLegacyProviderHint(providerHintRaw ?? (requestedProviderRaw === "yandex" ? "google" : undefined))

      assertGoogleAiConfigured(preferredProvider, providerHint)

      const runtimeData = aiFacade.ask({
        userId,
        prompt,
        locale: asString(req.body?.locale),
        preferredMode: asMode(req.body?.preferredMode),
        preferredProvider,
        providerHint,
        webSearchEnabled: typeof req.body?.webSearchEnabled === "boolean" ? req.body.webSearchEnabled : undefined,
        voiceControlEnabled: typeof req.body?.voiceControlEnabled === "boolean" ? req.body.voiceControlEnabled : undefined,
        attachments: asAttachments(req.body?.attachments),
        clientCapabilities: Array.isArray(req.body?.clientCapabilities)
          ? (req.body.clientCapabilities.filter((x: unknown) => typeof x === "string") as any)
          : undefined,
      })

      if (isExplicitGoogleAiRequest(preferredProvider, providerHint)) {
        // STEP70C_SMART_SEARCH_AND_HUMAN_BRAIN:
        // If the user asks for fresh/current/search-based information, gather live
        // Google Search context first and pass it into GPT. This keeps Sabi concrete
        // instead of replying with another question. No fake search fallback is used.
        let searchContext: SabiRuntimeSearchContext | undefined
        if (shouldUseLiveSearchForAnswer(prompt, typeof req.body?.webSearchEnabled === "boolean" ? req.body.webSearchEnabled : undefined, asMode(req.body?.preferredMode))) {
          try {
            searchContext = normalizeSearchResultsForAssistant(await aiFacade.search({
              userId,
              query: prompt,
              locale: asString(req.body?.locale),
              preferredProvider: "google",
              vertical: asVertical(req.body?.vertical) ?? "web",
              limit: asNumber(req.body?.limit) ?? 5,
              safeSearch: typeof req.body?.safeSearch === "boolean" ? req.body.safeSearch : true,
              allowFallback: false,
            }))
          } catch (searchError) {
            searchContext = {
              attempted: true,
              provider: "google",
              status: "search_failed",
              configured: false,
              fallbackUsed: false,
              results: [],
              note: searchError instanceof Error ? searchError.message : "Unknown live search error",
            }
          }
        }

        const googleAi = new GoogleAiProvider()
        const googleAiAnswer = await googleAi.generate({
          userId,
          prompt,
          locale: asString(req.body?.locale),
          systemPrompt: buildSearchSystemContext(searchContext),
          maxTokens: asNumber(req.body?.maxTokens),
          temperature: asNumber(req.body?.temperature),
        })

        if (!googleAiAnswer.configured || !googleAiAnswer.text) {
          // STEP71E_SOFT_QUALITY_UNAVAILABLE:
          // Do not throw a scary provider-unavailable popup to the mobile voice UI.
          // Return a successful envelope with a soft, user-facing quality state.
          // This is not a fake answer: the payload explicitly says quality_unavailable.
          res.json({
            ok: true,
            data: buildStep71ESoftUnavailableData({
              userId,
              locale: asString(req.body?.locale),
              prompt,
              runtimeData: runtimeData as unknown as Record<string, unknown>,
              providerStatus: googleAiAnswer.status,
              providerNote: googleAiAnswer.note,
              quality: googleAiAnswer.quality,
              searchContext,
            }),
          })
          return
        }

        const now = new Date().toISOString()
        const runId = `ai_runtime_google_ai_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
        const answer = {
          text: googleAiAnswer.text,
          messageKey: "ai.answer.google_ai_live",
          tone: "helpful",
          suggestions: [] as string[],
        }
        const providerRoute = {
          kind: "assistant",
          provider: "google",
          label: "Google AI / Gemini",
          status: googleAiAnswer.status,
          configured: googleAiAnswer.configured,
          fallbackUsed: googleAiAnswer.fallbackUsed,
          attemptedProviders: googleAiAnswer.attemptedProviders,
          modelUri: googleAiAnswer.modelUri,
          performedAt: googleAiAnswer.performedAt,
        }
        const providerResponse = {
          provider: "google",
          configured: googleAiAnswer.configured,
          status: googleAiAnswer.status,
          fallbackUsed: googleAiAnswer.fallbackUsed,
          attemptedProviders: googleAiAnswer.attemptedProviders,
          usage: googleAiAnswer.usage,
          rawStatus: googleAiAnswer.rawStatus,
          quality: googleAiAnswer.quality,
        }

        res.json({
          ok: true,
          data: {
            ...runtimeData,
            text: googleAiAnswer.text,
            reply: googleAiAnswer.text,
            answer,
            providerRoute,
            providerResponse,
            searchContext,
            assistant: {
              id: runId,
              createdAt: now,
              executionStatus: "answered",
              answer,
              providerRoute,
              providerResponse,
            },
            assistantRun: {
              id: runId,
              createdAt: now,
              executionStatus: "answered",
              answer,
              providerRoute,
              providerResponse,
              context: {
                userId,
                locale: asString(req.body?.locale),
                provider: "google",
                languageLock: true,
                searchContext,
              },
            },
          },
        })
        return
      }

      res.json({
        ok: true,
        data: runtimeData,
      })
    } catch (error) {
      if (!sendAiRuntimeControlledError(res, error)) next(error)
    }
  })

  router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const query = asString(req.body?.query)

      if (!userId) throw new Error("ai_user_id_required")
      if (!query) throw new Error("ai_query_required")

      res.json({
        ok: true,
        data: await aiFacade.search({
          userId,
          query,
          locale: asString(req.body?.locale),
          preferredProvider: asProvider(req.body?.preferredProvider),
          vertical: asVertical(req.body?.vertical),
          limit: asNumber(req.body?.limit),
          safeSearch: typeof req.body?.safeSearch === "boolean" ? req.body.safeSearch : undefined,
          allowFallback: typeof req.body?.allowFallback === "boolean" ? req.body.allowFallback : undefined,
        }),
      })
    } catch (error) {
      if (!sendAiRuntimeControlledError(res, error)) next(error)
    }
  })

  router.post("/translate", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const contentType = asTranslationContentType(req.body?.contentType)
      const targetLanguage = asString(req.body?.targetLanguage)

      if (!userId) throw new Error("ai_user_id_required")
      if (!contentType) throw new Error("ai_translation_content_type_required")
      if (!targetLanguage) throw new Error("ai_translation_target_language_required")

      res.json({
        ok: true,
        data: await aiFacade.translate({
          userId,
          contentType,
          targetLanguage,
          sourceLanguage: asString(req.body?.sourceLanguage),
          locale: asString(req.body?.locale),
          preferredProvider: asProvider(req.body?.preferredProvider),
          providerHint: asProviderHint(req.body?.providerHint),
          text: asString(req.body?.text),
          transcript: asString(req.body?.transcript),
          mediaUrl: asString(req.body?.mediaUrl),
          callSessionId: asString(req.body?.callSessionId),
          surface: asString(req.body?.surface),
          context: asString(req.body?.context),
          chatId: asString(req.body?.chatId),
          messageId: asString(req.body?.messageId),
          speakerHints: Array.isArray(req.body?.speakerHints)
            ? req.body.speakerHints.filter((x: unknown) => typeof x === "string")
            : undefined,
          preserveFormatting: typeof req.body?.preserveFormatting === "boolean" ? req.body.preserveFormatting : undefined,
          allowFallback: typeof req.body?.allowFallback === "boolean" ? req.body.allowFallback : undefined,
        }),
      })
    } catch (error) {
      // AI-POLICY-111.3_TRANSLATION_PREMIUM_ERROR_MAPPING:
      // Translation monetization policy:
      // - standalone text translation can be free after consent;
      // - audio/video/call and Messenger/chat translation are paid;
      // - paid lock must return controlled 402, not internal_server_error.
      const message = error instanceof Error ? error.message : String(error)
      if (message === "Feature is locked until a COIN-backed AI premium feature or plan is activated.") {
        res.status(402).json({
          ok: false,
          error: {
            code: "ai_premium_required",
            message,
            details: {
              status: "premium_required",
              coinBackedPremiumRequired: true,
              fakeFallbackAllowed: false,
            },
          },
        })
        return
      }

      next(error)
    }
  })

  router.post("/translate/image", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const targetLanguage = asString(req.body?.targetLanguage)
      const sourceLanguage = asString(req.body?.sourceLanguage)
      const locale = asString(req.body?.locale)

      if (!userId) throw new Error("ai_user_id_required")
      if (!targetLanguage) throw new Error("ai_translation_target_language_required")

      const ocr = await resolveImageOcrText({
        userId,
        imageBase64: asString(req.body?.imageBase64),
        imageUri: asString(req.body?.imageUri),
        mimeType: asString(req.body?.mimeType),
        fileName: asString(req.body?.fileName),
        locale,
        sourceLanguage,
        extractedText: asString(req.body?.extractedText),
      })

      const translation = await aiFacade.translate({
        userId,
        contentType: "image",
        targetLanguage,
        sourceLanguage,
        locale,
        preferredProvider: "google",
        providerHint: "google_translate",
        text: ocr.text,
        preserveFormatting: true,
        allowFallback: false,
      })

      res.json({
        ok: true,
        data: {
          ...translation,
          provider: translation.provider,
          translatedText: translation.translatedText,
          sourceText: ocr.text,
          ocrProvider: ocr.provider,
          ocrRaw: ocr.raw,
          imageTranslation: true,
          note:
            translation.note ??
            "Image text was extracted through OCR gateway and translated through Google/provider gateway.",
        },
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/providers/:userId/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.getProviderSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/providers/:userId/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")

      const modeProviders =
        typeof req.body?.modeProviders === "object" && req.body?.modeProviders
          ? Object.fromEntries(
              Object.entries(req.body.modeProviders as Record<string, unknown>)
                .map(([mode, provider]) => [asMode(mode), asProvider(provider)])
                .filter((entry): entry is [AiAssistantMode, AiProviderKey] => Boolean(entry[0] && entry[1])),
            )
          : undefined

      res.json({
        ok: true,
        data: aiFacade.updateProviderSettings({
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

  router.delete("/providers/:userId/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.resetProviderSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/business/analyze", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.analyzeBusiness({ ...req.body, userId }) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/education/assist", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.assistEducation({ ...req.body, userId }) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/consent/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.getConsent(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/consent/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")

      res.json({
        ok: true,
        data: aiFacade.updateConsent({
          userId,
          actorType: asString(req.body?.actorType) as any,
          actorId: asString(req.body?.actorId),
          reason: asString(req.body?.reason),
          consent: asObject(req.body?.consent) as any,
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/memory/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.listMemory(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/memory/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.getMemorySummary(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/memory/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const label = asString(req.body?.label)
      const value = asString(req.body?.value)
      const kind = asString(req.body?.kind)

      if (!userId) throw new Error("ai_user_id_required")
      if (!label || !value || !kind) throw new Error("ai_memory_payload_required")

      res.json({
        ok: true,
        data: aiFacade.saveMemory({
          userId,
          label,
          value,
          kind: kind as any,
          tags: Array.isArray(req.body?.tags) ? req.body.tags : undefined,
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/memory/:userId/:memoryId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const memoryId = asString(req.params.memoryId)

      if (!userId) throw new Error("ai_user_id_required")
      if (!memoryId) throw new Error("ai_memory_id_required")

      res.json({ ok: true, data: aiFacade.removeMemory(userId, memoryId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/tasks", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const title = asString(req.body?.title)

      if (!userId) throw new Error("ai_user_id_required")
      if (!title) throw new Error("ai_task_title_required")

      res.json({
        ok: true,
        data: aiFacade.createTask({
          userId,
          title,
          mode: asMode(req.body?.mode),
          requiresConfirmation: typeof req.body?.requiresConfirmation === "boolean" ? req.body.requiresConfirmation : undefined,
          metadata: asObject(req.body?.metadata),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/tasks/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.listTasks(userId, asTaskStatus(req.query.status), asNumber(req.query.limit)) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/tasks/:userId/:taskId/status", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const taskId = asString(req.params.taskId)
      const status = asTaskStatus(req.body?.status)

      if (!userId) throw new Error("ai_user_id_required")
      if (!taskId) throw new Error("ai_task_id_required")
      if (!status) throw new Error("ai_task_status_required")

      res.json({ ok: true, data: aiFacade.updateTaskStatus(userId, taskId, status) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/tasks/:taskId/status", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const taskId = asString(req.params.taskId)
      const status = asTaskStatus(req.body?.status)

      if (!userId) throw new Error("ai_user_id_required")
      if (!taskId) throw new Error("ai_task_id_required")
      if (!status) throw new Error("ai_task_status_required")

      res.json({ ok: true, data: aiFacade.updateTaskStatus(userId, taskId, status) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/history/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.listHistory(userId, asNumber(req.query.limit)) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/premium/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.getPremiumAccess(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/premium/catalog", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiFacade.getPremiumCatalog() })
    } catch (error) {
      next(error)
    }
  })

  router.post("/premium/preview", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const targetType = asString(req.body?.targetType)
      const targetKey = asString(req.body?.targetKey)

      if (!userId) throw new Error("ai_user_id_required")
      if (!targetType || !targetKey) throw new Error("ai_premium_target_required")

      res.json({
        ok: true,
        data: aiFacade.previewCoinPurchase({
          userId,
          targetType: targetType as any,
          targetKey,
          coinBalance: asNumber(req.body?.coinBalance),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/premium/grant", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const targetType = asString(req.body?.targetType)
      const targetKey = asString(req.body?.targetKey)

      if (!userId) throw new Error("ai_user_id_required")
      if (!targetType || !targetKey) throw new Error("ai_premium_target_required")

      res.json({
        ok: true,
        data: aiFacade.grantPremiumAccess({
          userId,
          source: "admin",
          targetType: targetType as any,
          targetKey,
          paymentReference: asString(req.body?.paymentReference),
          coinBalance: asNumber(req.body?.coinBalance),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/notifications/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.listAiNotifications(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/notifications", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const kind = asNotificationKind(req.body?.kind)

      if (!userId) throw new Error("ai_user_id_required")
      if (!kind) throw new Error("ai_notification_kind_required")

      res.json({
        ok: true,
        data: aiFacade.publishAiNotification({
          userId,
          kind,
          actorUserId: asString(req.body?.actorId) ?? asString(req.body?.actorUserId),
          params: {
            titleKey: asString(req.body?.titleKey),
            messageKey: asString(req.body?.messageKey),
            deepLink: asString(req.body?.deepLink),
            metadata: asObject(req.body?.metadata),
          },
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/notifications/:notificationId/read", (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = asString(req.params.notificationId)
      if (!notificationId) throw new Error("ai_notification_id_required")

      res.json({
        ok: true,
        data: {
          notificationId,
          readAt: new Date().toISOString(),
          acknowledged: true,
        },
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/locale/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_user_id_required")
      res.json({ ok: true, data: aiFacade.getLocaleBinding(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/locale/:userId", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const locale = asString(req.body?.locale)

      if (!userId) throw new Error("ai_user_id_required")
      if (!locale) throw new Error("ai_locale_required")

      res.json({
        ok: true,
        data: aiFacade.updateLocaleBinding({
          userId,
          locale,
          source: "user",
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}