import { AiSessionService } from "./ai-session.service"
import { AiTranslationProviderRegistryService } from "./ai-translation-provider-registry.service"
import {
  type AiTranslationRequest,
  type AiTranslationResponse,
} from "./ai.types"

export class AiTranslationService {
  constructor(
    private readonly sessionService: AiSessionService,
    private readonly providerRegistry: AiTranslationProviderRegistryService,
  ) {}

  async translate(request: AiTranslationRequest): Promise<AiTranslationResponse> {
    const session = this.sessionService.getOrCreateSession({
      userId: request.userId,
      locale: request.locale,
      provider: request.preferredProvider,
      mode: "translation",
    })

    if (!session.consent.readAccessAllowed) {
      return {
        provider: request.preferredProvider ?? session.defaultProvider,
        contentType: request.contentType,
        sourceLanguage: request.sourceLanguage ?? "auto",
        targetLanguage: request.targetLanguage,
        performedAt: new Date().toISOString(),
        configured: false,
        status: "disabled",
        fallbackUsed: false,
        attemptedProviders: [],
        segments: [],
        note: "AI translation is disabled until read access permission is granted.",
      }
    }

    if (!session.consent.toolExecutionAllowed) {
      return {
        provider: request.preferredProvider ?? session.defaultProvider,
        contentType: request.contentType,
        sourceLanguage: request.sourceLanguage ?? "auto",
        targetLanguage: request.targetLanguage,
        performedAt: new Date().toISOString(),
        configured: false,
        status: "disabled",
        fallbackUsed: false,
        attemptedProviders: [],
        segments: [],
        note: "AI translation requires tool execution permission because content may be sent to a translation gateway.",
      }
    }

    if (!request.targetLanguage.trim()) {
      throw new Error("AI translation requires a target language")
    }

    const normalizedSource = request.sourceLanguage?.trim().toLowerCase()
    const normalizedTarget = request.targetLanguage.trim().toLowerCase()
    if (normalizedSource && normalizedSource === normalizedTarget) {
      const original = request.text?.trim() || request.transcript?.trim() || ""
      return {
        provider: request.preferredProvider ?? session.defaultProvider,
        contentType: request.contentType,
        sourceLanguage: normalizedSource,
        targetLanguage: normalizedTarget,
        performedAt: new Date().toISOString(),
        configured: true,
        status: "configured",
        fallbackUsed: false,
        attemptedProviders: [],
        translatedText: request.contentType === "text" ? original : undefined,
        translatedTranscript: request.contentType !== "text" ? original : undefined,
        segments: original
          ? [
              {
                id: "same-language",
                sourceText: original,
                translatedText: original,
              },
            ]
          : [],
        note: "Source and target language match, so no translation was needed.",
      }
    }

    const providerChain = this.providerRegistry.resolveProviderChain({
      preferredProvider: request.preferredProvider,
      sessionDefaultProvider: session.defaultProvider,
      contentType: request.contentType,
      allowFallback: request.allowFallback,
      fallbackProviders: request.fallbackProviders,
    })

    const attemptedProviders: AiTranslationResponse["attemptedProviders"] = []

    for (const provider of providerChain) {
      attemptedProviders.push(provider.key)
      const response = await provider.translate({
        ...request,
        preferredProvider: provider.key,
      })

      const hasOutput = Boolean(response.translatedText || response.translatedTranscript || response.segments.length)
      const isConfigured = response.configured && response.status === "configured"

      if (hasOutput || request.allowFallback === false || isConfigured) {
        return {
          ...response,
          attemptedProviders,
          fallbackUsed: provider.key !== (request.preferredProvider ?? session.defaultProvider),
        }
      }
    }

    return {
      provider: request.preferredProvider ?? session.defaultProvider,
      contentType: request.contentType,
      sourceLanguage: request.sourceLanguage ?? "auto",
      targetLanguage: request.targetLanguage,
      performedAt: new Date().toISOString(),
      configured: false,
      status: "unconfigured",
      fallbackUsed: attemptedProviders.length > 1,
      attemptedProviders,
      segments: [],
      note:
        attemptedProviders.length > 0
          ? `No configured translation provider returned output. Attempted: ${attemptedProviders.join(", ")}.`
          : "No AI translation provider is registered for the requested content type.",
    }
  }

  getProviderManifest() {
    return this.providerRegistry.listManifest()
  }
}
