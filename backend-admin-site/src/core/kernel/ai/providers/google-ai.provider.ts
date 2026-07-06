declare const process: { env: Record<string, string | undefined> }
declare const fetch: (input: string, init?: Record<string, unknown>) => Promise<{
  ok: boolean
  status: number
  text(): Promise<string>
}>
declare const AbortController: {
  new(): { signal: unknown; abort(): void }
}

export type GoogleAiGenerateRequest = {
  userId: string
  prompt: string
  locale?: string
  systemPrompt?: string
  maxTokens?: number
  temperature?: number
}

export type GoogleAiGenerateResponse = {
  provider: "google"
  configured: boolean
  status: "configured" | "unconfigured"
  fallbackUsed: false
  attemptedProviders: ["google"]
  modelUri?: string
  text?: string
  note?: string
  usage?: unknown
  rawStatus?: unknown
  performedAt: string
  quality?: {
    step: "GOOGLE_AI_GEMINI"
    qualityGatePassed: boolean
    modelStrategy: "google_ai_primary"
  }
}

type GeminiPayload = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> }
    finishReason?: string
  }>
  usageMetadata?: unknown
  error?: { message?: string; status?: string }
}

function readTimeoutMs() {
  const timeout = Number(process.env.AI_GOOGLE_AI_TIMEOUT_MS || process.env.GEMINI_TIMEOUT_MS)
  return Number.isFinite(timeout) && timeout > 0 ? timeout : 45000
}

function readModel() {
  return (
    process.env.AI_GOOGLE_AI_MODEL?.trim() ||
    process.env.GOOGLE_AI_MODEL?.trim() ||
    process.env.GEMINI_MODEL?.trim() ||
    "gemini-2.5-flash"
  )
}

function readApiKey() {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.AI_GOOGLE_AI_API_KEY?.trim() ||
    undefined
  )
}

function buildSystemPrompt(locale: string | undefined, requestedSystemPrompt?: string) {
  return [
    "You are Sabi AI inside Sabi SuperApp.",
    "Behave as Owner-controlled business AI: helpful, warm, precise, protective, and honest.",
    "Never claim that you executed payments, payouts, legal actions, provider calls, DB writes, or production launch.",
    "Never expose secrets, API keys, tokens, internal provider credentials, or raw system metadata.",
    locale ? `Answer in the selected user locale when possible: ${locale}.` : "",
    requestedSystemPrompt?.trim() || "",
  ].filter(Boolean).join("\n")
}

function extractGeminiText(payload: GeminiPayload) {
  return payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim()
}

export class GoogleAiProvider {
  readonly key = "google" as const
  readonly label = "Google AI / Gemini"
  readonly requiresGateway = true

  private readonly apiKey?: string
  private readonly model: string
  private readonly timeoutMs: number

  constructor() {
    this.apiKey = readApiKey()
    this.model = readModel()
    this.timeoutMs = readTimeoutMs()
  }

  getStatus(): "configured" | "unconfigured" {
    return this.apiKey && this.model ? "configured" : "unconfigured"
  }

  async generate(request: GoogleAiGenerateRequest): Promise<GoogleAiGenerateResponse> {
    if (!this.apiKey || !this.model) {
      return this.buildResponse({
        configured: false,
        note: "Google AI / Gemini is not configured. Set GEMINI_API_KEY or GOOGLE_API_KEY on backend server only.",
      })
    }

    const prompt = request.prompt.trim()
    if (!prompt) {
      return this.buildResponse({ configured: true, note: "Google AI prompt is required." })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const endpoint =
        process.env.AI_GOOGLE_AI_GENERATE_ENDPOINT?.trim() ||
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(this.model)}:generateContent?key=${encodeURIComponent(this.apiKey)}`

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: buildSystemPrompt(request.locale, request.systemPrompt) }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: typeof request.temperature === "number" ? request.temperature : 0.4,
            maxOutputTokens: typeof request.maxTokens === "number" ? request.maxTokens : 1600,
          },
        }),
      })

      const rawText = await response.text()
      let payload: GeminiPayload = {}
      try {
        payload = rawText ? JSON.parse(rawText) : {}
      } catch {
        payload = { error: { message: rawText || "Invalid Google AI response JSON" } }
      }

      const text = extractGeminiText(payload)

      if (!response.ok || !text) {
        return this.buildResponse({
          configured: true,
          note: payload.error?.message || `Google AI returned HTTP ${response.status}`,
          rawStatus: { status: response.status, payload },
          usage: payload.usageMetadata,
        })
      }

      return this.buildResponse({
        configured: true,
        modelUri: this.model,
        text,
        rawStatus: { status: response.status, finishReason: payload.candidates?.[0]?.finishReason },
        usage: payload.usageMetadata,
        quality: {
          step: "GOOGLE_AI_GEMINI",
          qualityGatePassed: true,
          modelStrategy: "google_ai_primary",
        },
      })
    } catch (error) {
      return this.buildResponse({
        configured: true,
        note:
          error instanceof Error && error.name === "AbortError"
            ? `Google AI timed out after ${this.timeoutMs}ms`
            : error instanceof Error
              ? error.message
              : "Unknown Google AI error",
      })
    } finally {
      clearTimeout(timeout)
    }
  }

  private buildResponse(input: {
    configured: boolean
    modelUri?: string
    text?: string
    note?: string
    usage?: unknown
    rawStatus?: unknown
    quality?: GoogleAiGenerateResponse["quality"]
  }): GoogleAiGenerateResponse {
    return {
      provider: this.key,
      configured: input.configured,
      status: input.configured ? "configured" : "unconfigured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      modelUri: input.modelUri || this.model,
      text: input.text,
      note: input.note,
      usage: input.usage,
      rawStatus: input.rawStatus,
      performedAt: new Date().toISOString(),
      quality: input.quality,
    }
  }
}
