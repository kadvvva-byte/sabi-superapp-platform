import { type AiTranslationProviderPort } from "../ai-translation-provider.port"
import {
  type AiProviderKey,
  type AiProviderStatus,
  type AiTranslationContentType,
  type AiTranslationProviderManifestItem,
  type AiTranslationRequest,
  type AiTranslationResponse,
  type AiTranslationSegment,
} from "../ai.types"

const SUPPORTED_CONTENT_TYPES: AiTranslationContentType[] = [
  "text",
  "image",
  "document",
  "audio_message",
  "video_message",
  "call",
]

type TranslationGatewayProviderKey = Extract<AiProviderKey, "internal" | "google" | "yandex">

type TranslationGatewayProviderConfig = {
  key: TranslationGatewayProviderKey
  label: string
  gatewayUrl?: string
  apiKey?: string
  authToken?: string
  timeoutMs?: number
  unconfiguredNote: string
}

type GatewayPayloadRecord = Record<string, unknown>

type NormalizedGatewayPayload = {
  sourceLanguage?: string
  targetLanguage?: string
  translatedText?: string
  translatedTranscript?: string
  segments: AiTranslationSegment[]
  note?: string
}

function asRecord(value: unknown): GatewayPayloadRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as GatewayPayloadRecord) : {}
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function positiveTimeoutMs(value?: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 30_000
}

function pickPayloadRoot(payload: GatewayPayloadRecord): GatewayPayloadRecord {
  const data = asRecord(payload.data)
  const result = asRecord(payload.result)
  const dataResult = asRecord(data.result)
  const translation = asRecord(payload.translation)
  const dataTranslation = asRecord(data.translation)

  if (Object.keys(dataResult).length > 0) return dataResult
  if (Object.keys(result).length > 0) return result
  if (Object.keys(dataTranslation).length > 0) return dataTranslation
  if (Object.keys(translation).length > 0) return translation
  if (Object.keys(data).length > 0) return data

  return payload
}

export abstract class TranslationGatewayProviderBase implements AiTranslationProviderPort {
  readonly key: TranslationGatewayProviderKey
  readonly label: string
  readonly requiresGateway = true
  readonly supportedContentTypes = SUPPORTED_CONTENT_TYPES

  private readonly gatewayUrl?: string
  private readonly apiKey?: string
  private readonly authToken?: string
  private readonly timeoutMs: number
  private readonly unconfiguredNote: string

  protected constructor(config: TranslationGatewayProviderConfig) {
    this.key = config.key
    this.label = config.label
    this.gatewayUrl = config.gatewayUrl?.trim() || undefined
    this.apiKey = config.apiKey?.trim() || undefined
    this.authToken = config.authToken?.trim() || undefined
    this.timeoutMs = positiveTimeoutMs(config.timeoutMs)
    this.unconfiguredNote = config.unconfiguredNote
  }

  getStatus(): AiProviderStatus {
    return this.gatewayUrl ? "configured" : "unconfigured"
  }

  canTranslate(contentType: AiTranslationContentType) {
    return this.supportedContentTypes.includes(contentType)
  }

  async translate(request: AiTranslationRequest): Promise<AiTranslationResponse> {
    if (!this.gatewayUrl) {
      return this.buildUnconfiguredResponse(request, this.unconfiguredNote)
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const response = await fetch(this.gatewayUrl, {
        method: "POST",
        signal: controller.signal,
        headers: this.buildHeaders(),
        body: JSON.stringify(this.buildPayload(request)),
      })

      const payload = await this.readResponsePayload(response)

      if (!response.ok) {
        return this.buildConfiguredEmptyResponse(
          request,
          this.resolveGatewayErrorNote(payload, `HTTP ${response.status}`),
        )
      }

      return this.normalizeResponse(request, payload)
    } catch (error) {
      return this.buildConfiguredEmptyResponse(request, this.resolveNetworkErrorNote(error))
    } finally {
      clearTimeout(timeout)
    }
  }

  getManifestItem(): AiTranslationProviderManifestItem {
    const status = this.getStatus()

    return {
      key: this.key,
      label: this.label,
      status,
      configured: status === "configured",
      requiresGateway: this.requiresGateway,
      supportedContentTypes: this.supportedContentTypes,
    }
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      accept: "application/json",
      "x-ai-provider": this.key,
      "x-ai-gateway-required": "true",
      "x-ai-fallback-policy": "disabled",
    }

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey
      headers["x-ai-gateway-api-key"] = this.apiKey
    }

    if (this.authToken) {
      headers.authorization = `Bearer ${this.authToken}`
    }

    return headers
  }

  private buildPayload(request: AiTranslationRequest) {
    return {
      provider: this.key,
      contentType: request.contentType,
      sourceLanguage: request.sourceLanguage,
      targetLanguage: request.targetLanguage,
      text: request.text,
      transcript: request.transcript,
      mediaUrl: request.mediaUrl,
      callSessionId: request.callSessionId,
      speakerHints: request.speakerHints,
      preserveFormatting: request.preserveFormatting ?? true,
      userId: request.userId,
      locale: request.locale,
      providerHint: request.providerHint,
      gatewayRequired: true,
      allowFallback: false,
    }
  }

  private async readResponsePayload(response: { text(): Promise<string> }): Promise<GatewayPayloadRecord> {
    const text = await response.text()

    if (!text.trim()) {
      return {}
    }

    try {
      return asRecord(JSON.parse(text))
    } catch {
      return { rawText: text }
    }
  }

  private normalizeResponse(
    request: AiTranslationRequest,
    payload: GatewayPayloadRecord,
  ): AiTranslationResponse {
    const normalized = this.normalizePayload(payload)

    return {
      provider: this.key,
      contentType: request.contentType,
      sourceLanguage: normalized.sourceLanguage ?? request.sourceLanguage ?? "auto",
      targetLanguage: normalized.targetLanguage ?? request.targetLanguage,
      performedAt: new Date().toISOString(),
      configured: true,
      status: "configured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      translatedText: normalized.translatedText,
      translatedTranscript: normalized.translatedTranscript,
      segments: normalized.segments,
      note: normalized.note,
    }
  }

  private normalizePayload(payload: GatewayPayloadRecord): NormalizedGatewayPayload {
    const root = pickPayloadRoot(payload)
    const translatedText =
      asString(root.translatedText) ||
      asString(root.translation) ||
      asString(root.textTranslated) ||
      asString(root.translated_text) ||
      asString(root.outputText) ||
      asString(root.output)
    const translatedTranscript =
      asString(root.translatedTranscript) ||
      asString(root.transcriptTranslated) ||
      asString(root.translated_transcript)
    const sourceLanguage =
      asString(root.sourceLanguage) ||
      asString(root.detectedLanguage) ||
      asString(root.detectedSourceLanguage) ||
      asString(root.source_language)
    const targetLanguage = asString(root.targetLanguage) || asString(root.target_language)
    const segments = this.normalizeSegments(root.segments)

    return {
      sourceLanguage,
      targetLanguage,
      translatedText,
      translatedTranscript,
      segments,
      note: asString(root.note) || asString(root.message),
    }
  }

  private normalizeSegments(raw: unknown): AiTranslationSegment[] {
    if (!Array.isArray(raw)) {
      return []
    }

    return raw.map((segment, index) => this.normalizeSegment(segment, index))
  }

  private normalizeSegment(raw: unknown, index: number): AiTranslationSegment {
    const segment = asRecord(raw)

    return {
      id: String(segment.id ?? `${this.key}_segment_${index + 1}`),
      speakerId: asString(segment.speakerId),
      speakerLabel: asString(segment.speakerLabel),
      startedAtMs: asNumber(segment.startedAtMs),
      endedAtMs: asNumber(segment.endedAtMs),
      sourceText: asString(segment.sourceText) ?? "",
      translatedText: asString(segment.translatedText) ?? "",
    }
  }

  private resolveGatewayErrorNote(payload: GatewayPayloadRecord, fallback: string): string {
    const root = pickPayloadRoot(payload)

    return (
      asString(root.message) ||
      asString(root.error) ||
      asString(root.code) ||
      asString(payload.message) ||
      asString(payload.error) ||
      `${this.label} translation gateway returned ${fallback}`
    )
  }

  private resolveNetworkErrorNote(error: unknown): string {
    if (error instanceof Error && error.name === "AbortError") {
      return `${this.label} translation gateway timed out after ${this.timeoutMs}ms`
    }

    if (error instanceof Error) {
      return error.message
    }

    return `Unknown ${this.label} translation gateway error`
  }

  private buildUnconfiguredResponse(request: AiTranslationRequest, note: string): AiTranslationResponse {
    return {
      provider: this.key,
      contentType: request.contentType,
      sourceLanguage: request.sourceLanguage ?? "auto",
      targetLanguage: request.targetLanguage,
      performedAt: new Date().toISOString(),
      configured: false,
      status: "unconfigured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      segments: [],
      note,
    }
  }

  private buildConfiguredEmptyResponse(request: AiTranslationRequest, note: string): AiTranslationResponse {
    return {
      provider: this.key,
      contentType: request.contentType,
      sourceLanguage: request.sourceLanguage ?? "auto",
      targetLanguage: request.targetLanguage,
      performedAt: new Date().toISOString(),
      configured: true,
      status: "configured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      segments: [],
      note,
    }
  }
}
