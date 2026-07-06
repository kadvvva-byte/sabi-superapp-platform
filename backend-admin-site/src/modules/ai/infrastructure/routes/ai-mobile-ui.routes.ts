import { YandexGptProvider } from "../../../../core/kernel/ai/providers/yandex-gpt.provider"
import { YandexSearchProvider } from "../../../../core/kernel/ai/providers/yandex-search.provider"
import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiMobileUiService } from "../../application/services/ai-mobile-ui.service"
import type {
  AiAssistantAttachment,
  AiAssistantClientCapability,
  AiAssistantMode,
  AiAssistantProviderHint,
  AiProviderKey,
} from "../../../../core/kernel/ai/ai.types"
import type { AiMobileUiSurfaceKey } from "../../contracts/ai-mobile-ui.contracts"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
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

function asProviderHint(value: unknown): AiAssistantProviderHint | undefined {
  return typeof value === "string" &&
    ["chatgpt", "openai", "google_search", "google_translate", "google", "yandex", "internal"].includes(value)
    ? (value as AiAssistantProviderHint)
    : undefined
}

function asSurface(value: unknown): AiMobileUiSurfaceKey | undefined {
  return typeof value === "string" &&
    [
      "home",
      "assistant_chat",
      "voice",
      "translation",
      "history_tasks",
      "memory",
      "personalization",
      "providers",
      "settings",
      "premium",
      "profile",
      "actions",
      "safety_admin",
    ].includes(value)
    ? (value as AiMobileUiSurfaceKey)
    : undefined
}

function asSource(value: unknown): "text" | "voice" | "quick_action" | "system" | "attachment" | undefined {
  return typeof value === "string" && ["text", "voice", "quick_action", "system", "attachment"].includes(value)
    ? (value as "text" | "voice" | "quick_action" | "system" | "attachment")
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

function asClientCapabilities(value: unknown): AiAssistantClientCapability[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value.filter((item): item is AiAssistantClientCapability => typeof item === "string")
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
  // STEP71A_YANDEX_ONLY_SEARCH_FIRST:
  // Yandex-only mode must not answer fresh/factual/search questions with vague
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

function buildStep71ESoftUnavailableMobileData(input: {
  userId: string
  surface: AiMobileUiSurfaceKey
  locale?: string
  providerStatus?: string
  providerNote?: string
  quality?: unknown
  searchContext?: SabiRuntimeSearchContext
}) {
  const now = new Date().toISOString()
  const runId = `ai_mobile_yandex_quality_unavailable_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  const text = buildStep71ESoftUnavailableText(input.locale)
  const answer = {
    text,
    messageKey: "ai.answer.quality_unavailable",
    tone: "soft_error",
    suggestions: [] as string[],
    webSearchEnabled: false,
    provider: "yandex",
  }
  const providerRoute = {
    kind: "assistant",
    provider: "yandex",
    label: "Yandex GPT",
    status: input.providerStatus || "quality_unavailable",
    configured: true,
    fallbackUsed: false,
    attemptedProviders: ["yandex"],
    performedAt: now,
  }
  const providerResponse = {
    provider: "yandex",
    configured: true,
    status: input.providerStatus || "quality_unavailable",
    fallbackUsed: false,
    attemptedProviders: ["yandex"],
    quality: input.quality,
    note: input.providerNote,
    userFacingSoftError: true,
    fakeFallbackAllowed: false,
  }
  return {
    userId: input.userId,
    surface: input.surface,
    createdAt: now,
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
        provider: "yandex",
        languageLock: true,
        searchContext: input.searchContext,
      },
    },
    ui: {
      refreshRoutes: [
        `/api/ai/mobile-ui/${input.userId}/chat`,
        `/api/ai/mobile-ui/${input.userId}/activity`,
        `/api/ai/mobile-ui/${input.userId}/home`,
      ],
      pendingConfirmationCount: 0,
      dispatchCommands: [],
    },
  }
}

export function createAiMobileUiRouter(aiMobileUiService: AiMobileUiService): Router {
  const router = Router()

  router.get("/mobile-ui/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiMobileUiService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/snapshot", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")

      res.json({
        ok: true,
        data: aiMobileUiService.getSnapshot(userId, asSurface(req.query.surface) ?? "home"),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/shell", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")

      res.json({
        ok: true,
        data: aiMobileUiService.getShell(userId, asSurface(req.query.surface) ?? "home"),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/home", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getHome(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/chat", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getChat(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/voice", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getVoice(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/translation", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getTranslation(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/activity", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getActivity(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/settings", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getSettings(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/premium", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getPremium(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/mobile-ui/:userId/personalization", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      res.json({ ok: true, data: aiMobileUiService.getPersonalization(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/mobile-ui/assistant/message", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const prompt = asString(req.body?.prompt) ?? asString(req.body?.message) ?? asString(req.body?.text)

      if (!userId) throw new Error("ai_mobile_ui_user_id_required")
      if (!prompt) throw new Error("ai_mobile_ui_prompt_required")

      // STEP70B_MOBILE_YANDEX_PROVIDER_FIELD:
      // Accept provider:"yandex" from mobile, not only preferredProvider/providerHint.
      const requestedProvider = asProvider(req.body?.provider)
      const preferredProvider = asProvider(req.body?.preferredProvider) ?? requestedProvider
      const providerHint = asProviderHint(req.body?.providerHint) ?? (requestedProvider === "yandex" ? "yandex" : undefined)
      const surface = asSurface(req.body?.surface) ?? "assistant_chat"
      const yandexRequested = [requestedProvider, preferredProvider, providerHint]
        .map((value) => String(value ?? "").toLowerCase())
        .some((value) => value.includes("yandex"))

      if (yandexRequested) {
        // STEP70C_MOBILE_SMART_SEARCH_AND_HUMAN_BRAIN:
        // Mobile chat/voice should not behave like a dry bot. Use live search
        // context for current/search requests before asking GPT. No fake fallback.
        let searchContext: SabiRuntimeSearchContext | undefined
        if (shouldUseLiveSearchForAnswer(prompt, typeof req.body?.webSearchEnabled === "boolean" ? req.body.webSearchEnabled : undefined, asMode(req.body?.preferredMode))) {
          const searchProvider = new YandexSearchProvider()
          const searchResponse = await searchProvider.search({
            userId,
            query: prompt,
            locale: asString(req.body?.locale),
            preferredProvider: "yandex",
            vertical: "web",
            limit: 5,
            safeSearch: true,
            allowFallback: false,
          })
          searchContext = normalizeSearchResultsForAssistant(searchResponse)
        }

        const yandexGpt = new YandexGptProvider()
        const yandexAnswer = await yandexGpt.generate({
          userId,
          prompt,
          locale: asString(req.body?.locale),
          systemPrompt: buildSearchSystemContext(searchContext),
          maxTokens: 1200,
        })

        if (!yandexAnswer.configured || !yandexAnswer.text) {
          // STEP71E_SOFT_QUALITY_UNAVAILABLE:
          // Do not throw a scary provider-unavailable popup to mobile voice screen.
          // Return a soft user-facing state instead; no fake answer is produced.
          res.json({
            ok: true,
            data: buildStep71ESoftUnavailableMobileData({
              userId,
              surface,
              locale: asString(req.body?.locale),
              providerStatus: yandexAnswer.status,
              providerNote: yandexAnswer.note,
              quality: yandexAnswer.quality,
              searchContext,
            }),
          })
          return
        }

        const now = new Date().toISOString()
        const runId = `ai_mobile_yandex_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
        const answer = {
          text: yandexAnswer.text,
          messageKey: "ai.answer.yandex_gpt_live",
          tone: "helpful",
          suggestions: [] as string[],
          webSearchEnabled: false,
          provider: "yandex",
        }

        const providerRoute = {
          kind: "assistant",
          provider: "yandex",
          label: "Yandex GPT",
          status: yandexAnswer.status,
          configured: yandexAnswer.configured,
          fallbackUsed: yandexAnswer.fallbackUsed,
          attemptedProviders: yandexAnswer.attemptedProviders,
          modelUri: yandexAnswer.modelUri,
          performedAt: yandexAnswer.performedAt,
        }

        const providerResponse = {
          provider: "yandex",
          configured: yandexAnswer.configured,
          status: yandexAnswer.status,
          fallbackUsed: yandexAnswer.fallbackUsed,
          attemptedProviders: yandexAnswer.attemptedProviders,
          usage: yandexAnswer.usage,
          rawStatus: yandexAnswer.rawStatus,
          quality: yandexAnswer.quality,
        }

        res.json({
          ok: true,
          data: {
            userId,
            surface,
            createdAt: now,
            text: yandexAnswer.text,
            reply: yandexAnswer.text,
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
                provider: "yandex",
                searchContext,
              },
            },
            ui: {
              refreshRoutes: [
                `/api/ai/mobile-ui/${userId}/chat`,
                `/api/ai/mobile-ui/${userId}/activity`,
                `/api/ai/mobile-ui/${userId}/home`,
              ],
              pendingConfirmationCount: 0,
              dispatchCommands: [],
            },
          },
        })
        return
      }

      const data = await aiMobileUiService.sendAssistantMessage({
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
        clientCapabilities: asClientCapabilities(req.body?.clientCapabilities),
        autoExecute: false,
        surface,
        metadata: asObject(req.body?.metadata),
      })

      res.json({ ok: true, data })
    } catch (error) {
      next(error)
    }
  })

  return router
}