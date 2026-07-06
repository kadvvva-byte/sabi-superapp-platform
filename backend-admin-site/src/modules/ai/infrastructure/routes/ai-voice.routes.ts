import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiAssistantMode, AiProviderKey } from "../../../../core/kernel/ai/ai.types"
import type {
  AiNativeVoiceBridgeBindRequestContract,
  AiNativeVoiceBridgeStateContract,
  AiNativeVoiceClientEventContract,
  AiNativeVoicePlatform,
  AiStartVoiceSessionRequestContract,
  AiUpdateVoiceSessionRequestContract,
  AiVoiceInputKind,
  AiVoiceInterruptRequestContract,
  AiVoiceInterruptResultContract,
  AiVoiceInvokeRequestContract,
  AiVoiceInvokeResultContract,
  AiVoiceManifestContract,
  AiVoicePlaybackRequestContract,
  AiVoiceSessionContract,
  AiVoiceSessionStatus,
  AiVoiceStatusContract,
  AiVoiceSynthesisRequestContract,
  AiVoiceSynthesisResultContract,
  AiVoiceTranscriptionRequestContract,
  AiVoiceTranscriptionResultContract,
} from "../../contracts/ai-voice.contracts"

declare const process: { env: Record<string, string | undefined> }

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
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

function mergeMetadata(...items: Array<Record<string, unknown> | undefined>): Record<string, unknown> | undefined {
  const merged = Object.assign({}, ...items.filter(Boolean))
  return Object.keys(merged).length > 0 ? merged : undefined
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const items = value.map((item) => asString(item)).filter((item): item is string => Boolean(item))
  return items.length ? items : undefined
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

function asPlatform(value: unknown): AiNativeVoicePlatform | undefined {
  return typeof value === "string" && ["ios", "android", "web", "desktop", "unknown"].includes(value)
    ? (value as AiNativeVoicePlatform)
    : undefined
}

function asInputKind(value: unknown): AiVoiceInputKind | undefined {
  return typeof value === "string" && ["speech_to_text", "text_to_speech", "wake_invoke", "quick_invoke"].includes(value)
    ? (value as AiVoiceInputKind)
    : undefined
}

function asSessionStatus(value: unknown): AiVoiceSessionStatus | undefined {
  return typeof value === "string" &&
    ["idle", "listening", "processing", "speaking", "completed", "cancelled", "failed"].includes(value)
    ? (value as AiVoiceSessionStatus)
    : undefined
}

function resolveVoiceKey(req: Request): string | undefined {
  const explicit = asString(req.body?.voiceKey)
  if (explicit) return explicit

  const style = asString(req.body?.voiceStyle)
  if (style) return style

  const preferredGender = asString(req.body?.preferredVoiceGender)
  if (preferredGender === "female") return "sabi_ai_female"
  if (preferredGender === "male") return "sabi_ai_male"

  return undefined
}

function resolveLanguage(req: Request): string | undefined {
  return asString(req.body?.language) || asString(req.body?.locale) || asString(req.body?.sourceLanguage)
}

function resolveNativeEventKind(req: Request): AiNativeVoiceClientEventContract["kind"] | undefined {
  const value = asString(req.body?.kind) || asString(req.body?.type) || asString(req.body?.eventType)

  if (
    value === "recording_started" ||
    value === "recording_stopped" ||
    value === "audio_captured" ||
    value === "transcript_partial" ||
    value === "transcript_final" ||
    value === "transcript_ready" ||
    value === "tts_requested" ||
    value === "playback_started" ||
    value === "playback_finished" ||
    value === "interrupted" ||
    value === "error"
  ) {
    return value as AiNativeVoiceClientEventContract["kind"]
  }

  return value ? ("error" as AiNativeVoiceClientEventContract["kind"]) : undefined
}

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim()
    if (value) return value
  }

  return undefined
}

function voiceGatewayHeaders(area: "stt" | "tts"): Record<string, string> {
  const headers: Record<string, string> = { "content-type": "application/json" }
  const apiKey = area === "stt"
    ? readEnv("AI_SABI_STT_API_KEY", "AI_VOICE_STT_API_KEY", "YANDEX_SPEECHKIT_API_KEY", "AI_YANDEX_API_KEY", "YANDEX_API_KEY")
    : readEnv("AI_SABI_TTS_API_KEY", "AI_VOICE_TTS_API_KEY", "YANDEX_SPEECHKIT_API_KEY", "AI_YANDEX_API_KEY", "YANDEX_API_KEY")
  const token = area === "stt"
    ? readEnv("AI_SABI_STT_AUTH_TOKEN", "AI_VOICE_STT_AUTH_TOKEN", "YANDEX_IAM_TOKEN")
    : readEnv("AI_SABI_TTS_AUTH_TOKEN", "AI_VOICE_TTS_AUTH_TOKEN", "YANDEX_IAM_TOKEN")

  if (apiKey) headers.authorization = `Api-Key ${apiKey}`
  else if (token) headers.authorization = `Bearer ${token}`

  return headers
}

async function readGatewayJson(response: { json: () => Promise<unknown> }): Promise<Record<string, unknown>> {
  const payload = await response.json().catch(() => null)
  return asObject(payload) ?? { raw: payload }
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    const text = asString(value)
    if (text) return text
  }

  return undefined
}

function extractTranscriptFromPayload(value: unknown): string | undefined {
  const root = asObject(value)
  const data = asObject(root?.data) ?? root
  const result = asObject(data?.result)
  const transcription = asObject(data?.transcription)
  const alternatives = Array.isArray(data?.alternatives) ? data?.alternatives : Array.isArray(result?.alternatives) ? result?.alternatives : []
  const firstAlternative = asObject(alternatives[0])

  return firstString(
    data?.transcript,
    data?.text,
    data?.recognizedText,
    data?.speechText,
    data?.normalizedText,
    data?.result,
    root?.result,
    result?.transcript,
    result?.text,
    result?.recognizedText,
    transcription?.transcript,
    transcription?.text,
    firstAlternative?.text,
    firstAlternative?.transcript,
    root?.transcript,
    root?.text,
  )
}

function extractAudioPayload(value: unknown): { audioUrl?: string; audioBase64?: string; mimeType?: string; provider?: string } {
  const root = asObject(value)
  const data = asObject(root?.data) ?? root
  const result = asObject(data?.result)
  const audio = asObject(data?.audio) ?? asObject(result?.audio)

  return {
    audioUrl: firstString(data?.audioUrl, data?.url, data?.fileUrl, result?.audioUrl, result?.url, audio?.audioUrl, audio?.url),
    audioBase64: firstString(
      data?.audioBase64,
      data?.audioContent,
      data?.audioData,
      data?.base64,
      result?.audioBase64,
      result?.audioContent,
      result?.audioData,
      audio?.audioBase64,
      audio?.audioContent,
    ),
    mimeType: firstString(data?.mimeType, data?.contentType, data?.audioMimeType, result?.mimeType, audio?.mimeType) ?? "audio/mpeg",
    provider: firstString(data?.provider, result?.provider, root?.provider),
  }
}
function stripBase64DataUri(value: string): string {
  const marker = ";base64,"
  const index = value.indexOf(marker)
  return index >= 0 ? value.slice(index + marker.length) : value
}

function resolveSpeechKitAuthHeader(area: "stt" | "tts"): string | undefined {
  const apiKey = area === "stt"
    ? readEnv("AI_SABI_STT_API_KEY", "AI_VOICE_STT_API_KEY", "YANDEX_SPEECHKIT_API_KEY", "AI_YANDEX_API_KEY", "YANDEX_API_KEY")
    : readEnv("AI_SABI_TTS_API_KEY", "AI_VOICE_TTS_API_KEY", "YANDEX_SPEECHKIT_API_KEY", "AI_YANDEX_API_KEY", "YANDEX_API_KEY")
  const iamToken = area === "stt"
    ? readEnv("AI_SABI_STT_IAM_TOKEN", "AI_VOICE_STT_IAM_TOKEN", "YANDEX_IAM_TOKEN")
    : readEnv("AI_SABI_TTS_IAM_TOKEN", "AI_VOICE_TTS_IAM_TOKEN", "YANDEX_IAM_TOKEN")

  if (apiKey) return `Api-Key ${apiKey}`
  if (iamToken) return `Bearer ${iamToken}`
  return undefined
}

function resolveSpeechKitFolderId(area: "stt" | "tts"): string | undefined {
  return area === "stt"
    ? readEnv("AI_SABI_STT_FOLDER_ID", "AI_VOICE_STT_FOLDER_ID", "YANDEX_SPEECHKIT_FOLDER_ID", "AI_YANDEX_FOLDER_ID", "YANDEX_FOLDER_ID")
    : readEnv("AI_SABI_TTS_FOLDER_ID", "AI_VOICE_TTS_FOLDER_ID", "YANDEX_SPEECHKIT_FOLDER_ID", "AI_YANDEX_FOLDER_ID", "YANDEX_FOLDER_ID")
}

function normalizeSpeechKitLanguage(value?: string): string {
  const language = String(value || readEnv("AI_SABI_VOICE_DEFAULT_LANGUAGE") || "ru-RU").trim().toLowerCase()

  if (language === "auto") return "auto"
  if (language === "ru" || language.startsWith("ru-")) return "ru-RU"
  if (language === "en" || language.startsWith("en-")) return "en-US"
  if (language === "uz" || language.startsWith("uz-")) return "uz-UZ"
  if (language === "tr" || language.startsWith("tr-")) return "tr-TR"
  if (language === "kk" || language.startsWith("kk-") || language.startsWith("kz-")) return "kk-KZ"
  if (language === "zh" || language === "cn" || language.startsWith("zh-") || language.startsWith("cmn-")) return "zh-CN"
  if (language === "de" || language.startsWith("de-")) return "de-DE"
  if (language === "fr" || language.startsWith("fr-")) return "fr-FR"
  if (language === "es" || language.startsWith("es-")) return "es-ES"
  if (language === "he" || language.startsWith("he-")) return "he-IL"
  if (language === "ja" || language.startsWith("ja-")) return "ja-JP"
  if (language === "ko" || language.startsWith("ko-")) return "ko-KR"
  if (language === "ar" || language.startsWith("ar-")) return "ar"

  return value || "ru-RU"
}

function speechKitLanguageFamily(language: string): string {
  return language.toLowerCase().split(/[-_]/)[0]
}

const YANDEX_SPEECHKIT_STT_LANGUAGE_CODES = new Set([
  "auto",
  "de-DE",
  "en-US",
  "es-ES",
  "fi-FI",
  "fr-FR",
  "he-IL",
  "it-IT",
  "kk-KZ",
  "nl-NL",
  "pl-PL",
  "pt-PT",
  "pt-BR",
  "ru-RU",
  "sv-SE",
  "tr-TR",
  "uz-UZ",
])

const DEFAULT_YANDEX_TTS_VOICE_BY_LANGUAGE: Record<string, string | undefined> = {
  "de-DE": "lea",
  "he-IL": "naomi",
  "kk-KZ": "amira",
  "ru-RU": "jane",
  "uz-UZ": "nigora",
}

const DISALLOWED_SABI_TTS_MALE_VOICES = new Set([
  "john",
  "zahar",
  "ermil",
])

function readLanguageEnv(prefix: string, language: string): string | undefined {
  const family = speechKitLanguageFamily(language).toUpperCase().replace(/[^A-Z0-9]/g, "_")
  const normalized = language.toUpperCase().replace(/[^A-Z0-9]/g, "_")
  return readEnv(`${prefix}_${normalized}`, `${prefix}_${family}`)
}

function isSpeechKitSttLanguageSupported(language: string): boolean {
  return YANDEX_SPEECHKIT_STT_LANGUAGE_CODES.has(language)
}

function resolveSpeechKitTtsVoice(language: string, req: Request): string | undefined {
  // STEP71E_YANDEX_ONLY_FEMALE_VOICE_LOCK:
  // Do not use one global Russian/English/male voice as fallback for every language.
  // Each language must have an explicit supported female voice. If not, return
  // voice_not_supported instead of producing wrong accent or male voice.
  return (
    readLanguageEnv("AI_SABI_TTS_VOICE", language) ||
    readLanguageEnv("AI_VOICE_TTS_VOICE", language) ||
    readLanguageEnv("YANDEX_SPEECHKIT_TTS_VOICE", language) ||
    DEFAULT_YANDEX_TTS_VOICE_BY_LANGUAGE[language]
  )
}

function assertSabiFemaleTtsVoice(language: string, voice?: string): string {
  if (!voice) throw new Error(`ai_voice_tts_language_not_supported_${language}`)

  const normalized = voice.trim().toLowerCase()
  const maleAllowed = readEnv("AI_SABI_ALLOW_MALE_TTS", "AI_VOICE_ALLOW_MALE_TTS") === "true"
  if (!maleAllowed && DISALLOWED_SABI_TTS_MALE_VOICES.has(normalized)) {
    throw new Error(`ai_voice_tts_male_voice_blocked_${language}_${normalized}`)
  }

  if (!DEFAULT_YANDEX_TTS_VOICE_BY_LANGUAGE[language] && !readLanguageEnv("AI_SABI_TTS_VOICE", language) && !readLanguageEnv("AI_VOICE_TTS_VOICE", language) && !readLanguageEnv("YANDEX_SPEECHKIT_TTS_VOICE", language)) {
    throw new Error(`ai_voice_tts_language_not_supported_${language}`)
  }

  return voice
}

function resolveSpeechKitTtsEmotion(language: string, req: Request): string {
  return (
    asString(req.body?.emotion) ||
    readLanguageEnv("AI_SABI_TTS_EMOTION", language) ||
    readLanguageEnv("AI_VOICE_TTS_EMOTION", language) ||
    readEnv("AI_SABI_TTS_EMOTION", "AI_VOICE_TTS_EMOTION") ||
    "good"
  )
}

function normalizeTextForVoice(language: string, text: string): string {
  let output = text.trim()
  const family = speechKitLanguageFamily(language)

  if (family === "uz") {
    output = output
      .replace(/Qozoqcha|Kazakh/gi, "")
      .replace(/Tatarcha|Tatar/gi, "")
      .replace(/Turkcha|Turkish/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim()
  }

  if (/^\s*[\d\s+\-*/×xх=().,]+\s*(?:доллар(?:ов|а)?|usd|\$|uzs|сум(?:ов)?)\s*$/i.test(output)) {
    output = output.replace(/\s*(?:доллар(?:ов|а)?|usd|\$|uzs|сум(?:ов)?)\b/gi, "").trim()
  }

  return output
}

function speechKitMimeType(format?: string): string {
  const normalized = String(format || "oggopus").toLowerCase()
  if (normalized.includes("lpcm")) return "audio/wav"
  if (normalized.includes("wav")) return "audio/wav"
  if (normalized.includes("mp3")) return "audio/mpeg"
  return "audio/ogg"
}

function makeSpeechKitAuthHeaders(area: "stt" | "tts", contentType?: string): Record<string, string> | undefined {
  const authorization = resolveSpeechKitAuthHeader(area)
  if (!authorization) return undefined

  return contentType ? { authorization, "content-type": contentType } : { authorization }
}

function isMobileCompressedAudioForYandexStt(mimeType?: string, format?: string): boolean {
  const value = `${mimeType || ""} ${format || ""}`.toLowerCase()
  return (
    value.includes("audio/mp4") ||
    value.includes("audio/m4a") ||
    value.includes("audio/aac") ||
    value.includes("video/mp4") ||
    value.includes("m4a") ||
    value.includes("aac") ||
    value.includes("mobile_m4a") ||
    value.includes("mobile_mp4")
  )
}

async function transcodeMobileAudioToOggOpus(audio: Buffer): Promise<Buffer> {
  const { spawn } = await import("node:child_process")

  return await new Promise<Buffer>((resolve, reject) => {
    const outputChunks: Buffer[] = []
    const errorChunks: Buffer[] = []

    const ffmpeg = spawn(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        "pipe:0",
        "-vn",
        "-ac",
        "1",
        "-ar",
        "48000",
        "-c:a",
        "libopus",
        "-b:a",
        "32k",
        "-f",
        "ogg",
        "pipe:1",
      ],
      { stdio: ["pipe", "pipe", "pipe"] },
    )

    const timeout = setTimeout(() => {
      ffmpeg.kill("SIGKILL")
      reject(new Error("ai_voice_stt_ffmpeg_timeout"))
    }, 30000)

    ffmpeg.stdout.on("data", (chunk: Buffer) => outputChunks.push(Buffer.from(chunk)))
    ffmpeg.stderr.on("data", (chunk: Buffer) => errorChunks.push(Buffer.from(chunk)))

    ffmpeg.on("error", (error: Error) => {
      clearTimeout(timeout)
      reject(new Error(`ai_voice_stt_ffmpeg_unavailable:${error.message}`))
    })

    ffmpeg.on("close", (code: number | null) => {
      clearTimeout(timeout)

      if (code !== 0) {
        const detail = Buffer.concat(errorChunks).toString("utf8").trim().slice(0, 300)
        reject(new Error(`ai_voice_stt_ffmpeg_failed_${code}:${detail}`))
        return
      }

      const output = Buffer.concat(outputChunks)
      if (!output.length) {
        reject(new Error("ai_voice_stt_ffmpeg_empty_output"))
        return
      }

      resolve(output)
    })

    ffmpeg.stdin.end(audio)
  })
}

async function normalizeAudioForYandexSpeechKitStt(
  req: Request,
  input: AiVoiceTranscriptionRequestContract,
  audio: Buffer,
): Promise<{ audio: Buffer; contentType: string; converted: boolean }> {
  const requestedMimeType = input.mimeType || asString(req.body?.contentType) || "application/octet-stream"
  const requestedFormat = asString(req.body?.format) || asString(req.body?.encoding) || asString(req.body?.metadata?.format)

  if (isMobileCompressedAudioForYandexStt(requestedMimeType, requestedFormat)) {
    const convertedAudio = await transcodeMobileAudioToOggOpus(audio)
    return { audio: convertedAudio, contentType: "audio/ogg", converted: true }
  }

  if (requestedMimeType.toLowerCase().includes("ogg")) {
    return { audio, contentType: "audio/ogg", converted: false }
  }

  if (requestedMimeType.toLowerCase().includes("wav") || requestedMimeType.toLowerCase().includes("lpcm")) {
    return { audio, contentType: "audio/wav", converted: false }
  }

  if (requestedMimeType.toLowerCase().includes("mpeg") || requestedMimeType.toLowerCase().includes("mp3")) {
    return { audio, contentType: "audio/mpeg", converted: false }
  }

  return { audio, contentType: requestedMimeType, converted: false }
}

async function transcribeThroughYandexSpeechKit(
  req: Request,
  input: AiVoiceTranscriptionRequestContract,
): Promise<Record<string, unknown> | undefined> {
  const folderId = resolveSpeechKitFolderId("stt")

  if (!folderId) return undefined
  if (!input.audioBase64) return undefined

  const originalAudio = Buffer.from(stripBase64DataUri(input.audioBase64), "base64")
  if (!originalAudio.length) throw new Error("ai_voice_stt_empty_audio_payload")

  const normalizedAudio = await normalizeAudioForYandexSpeechKitStt(req, input, originalAudio)
  const authorizationHeaders = makeSpeechKitAuthHeaders("stt", normalizedAudio.contentType)

  if (!authorizationHeaders) return undefined

  const sttUrl = new URL(readEnv("AI_SABI_STT_YANDEX_URL", "AI_VOICE_STT_YANDEX_URL", "YANDEX_SPEECHKIT_STT_URL") || "https://stt.api.cloud.yandex.net/speech/v1/stt:recognize")
  sttUrl.searchParams.set("folderId", folderId)
  const sttLanguage = normalizeSpeechKitLanguage(input.sourceLanguage)
  if (!isSpeechKitSttLanguageSupported(sttLanguage)) {
    throw new Error(`ai_voice_stt_language_not_supported_${sttLanguage}`)
  }
  sttUrl.searchParams.set("lang", sttLanguage)
  sttUrl.searchParams.set("topic", asString(req.body?.topic) || "general")
  sttUrl.searchParams.set("profanityFilter", "false")

  const response = await fetch(sttUrl.toString(), {
    method: "POST",
    headers: authorizationHeaders,
    body: normalizedAudio.audio,
  })

  const payload = await readGatewayJson(response)
  if (!response.ok) {
    throw new Error(`ai_voice_stt_yandex_http_${response.status}`)
  }

  const transcript = extractTranscriptFromPayload(payload)
  if (!transcript) throw new Error("ai_voice_stt_empty_result")

  return {
    transcript,
    text: transcript,
    recognizedText: transcript,
    language: sttLanguage,
    provider: "yandex_speechkit",
    status: "ready",
    fakeFallbackUsed: false,
    raw: payload,
    audioInput: {
      originalMimeType: input.mimeType || asString(req.body?.contentType) || null,
      yandexContentType: normalizedAudio.contentType,
      convertedForYandex: normalizedAudio.converted,
      originalBytes: originalAudio.length,
      sentBytes: normalizedAudio.audio.length,
    },
  }
}

async function synthesizeThroughYandexSpeechKit(
  req: Request,
  input: AiVoiceSynthesisRequestContract,
): Promise<Record<string, unknown> | undefined> {
  const authorizationHeaders = makeSpeechKitAuthHeaders("tts", "application/x-www-form-urlencoded")
  const folderId = resolveSpeechKitFolderId("tts")

  if (!authorizationHeaders || !folderId) return undefined

  const ttsUrl = readEnv("AI_SABI_TTS_YANDEX_URL", "AI_VOICE_TTS_YANDEX_URL", "YANDEX_SPEECHKIT_TTS_URL") || "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize"
  const format = readEnv("AI_SABI_TTS_FORMAT", "AI_VOICE_TTS_FORMAT") || "oggopus"
  const ttsLanguage = normalizeSpeechKitLanguage(input.language)
  const voice = assertSabiFemaleTtsVoice(ttsLanguage, resolveSpeechKitTtsVoice(ttsLanguage, req))
  const emotion = resolveSpeechKitTtsEmotion(ttsLanguage, req)
  const speed = asString(req.body?.speed) || readLanguageEnv("AI_SABI_TTS_SPEED", ttsLanguage) || readLanguageEnv("AI_VOICE_TTS_SPEED", ttsLanguage) || readEnv("AI_SABI_TTS_SPEED", "AI_VOICE_TTS_SPEED") || "0.95"
  const body = new URLSearchParams()

  body.set("folderId", folderId)
  body.set("text", normalizeTextForVoice(ttsLanguage, input.text))
  body.set("lang", ttsLanguage)
  body.set("voice", voice)
  body.set("emotion", emotion)
  body.set("speed", speed)
  body.set("format", format)

  const response = await fetch(ttsUrl, {
    method: "POST",
    headers: authorizationHeaders,
    body,
  })

  if (!response.ok) {
    throw new Error(`ai_voice_tts_yandex_http_${response.status}`)
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer())
  if (!audioBuffer.length) throw new Error("ai_voice_tts_empty_audio_result")

  return {
    commandId: `sabi_tts_${Date.now()}`,
    sessionId: input.sessionId,
    text: input.text,
    language: ttsLanguage,
    provider: "yandex_speechkit",
    status: "ready",
    fakeFallbackUsed: false,
    voice,
    emotion,
    speed,
    femaleVoiceLock: true,
    audioUrl: null,
    mimeType: speechKitMimeType(format),
    audioBase64: audioBuffer.toString("base64"),
  }
}


async function transcribeThroughConfiguredGateway(
  req: Request,
  input: AiVoiceTranscriptionRequestContract,
): Promise<Record<string, unknown> | undefined> {
  const gatewayUrl = readEnv("AI_SABI_STT_GATEWAY_URL", "AI_VOICE_STT_GATEWAY_URL")
  if (!gatewayUrl) return undefined

  if (!input.audioBase64 && !input.audioUrl && !asString(req.body?.audioUri)) {
    return undefined
  }

  const response = await fetch(gatewayUrl, {
    method: "POST",
    headers: voiceGatewayHeaders("stt"),
    body: JSON.stringify({
      userId: input.userId,
      sessionId: input.sessionId,
      audioBase64: input.audioBase64,
      audioUrl: input.audioUrl,
      audioUri: asString(req.body?.audioUri),
      mimeType: input.mimeType ?? "audio/m4a",
      language: input.sourceLanguage,
      sourceLanguage: input.sourceLanguage,
      contentType: "audio",
      inputKind: "voice_command",
      fakeSttAllowed: false,
      fakeFallbackAllowed: false,
      mobileSecretsAllowed: false,
      metadata: input.metadata,
    }),
  })

  if (!response.ok) {
    throw new Error(`ai_voice_stt_gateway_http_${response.status}`)
  }

  const payload = await readGatewayJson(response)
  const transcript = extractTranscriptFromPayload(payload)

  if (!transcript) {
    throw new Error("ai_voice_stt_empty_result")
  }

  return {
    transcript,
    text: transcript,
    recognizedText: transcript,
    language: input.sourceLanguage,
    provider: firstString(payload.provider, asObject(payload.data)?.provider) ?? "configured_stt_gateway",
    status: "ready",
    fakeFallbackUsed: false,
    raw: payload,
  }
}

async function synthesizeThroughConfiguredGateway(
  req: Request,
  input: AiVoiceSynthesisRequestContract,
): Promise<Record<string, unknown> | undefined> {
  const gatewayUrl = readEnv("AI_SABI_TTS_GATEWAY_URL", "AI_VOICE_TTS_GATEWAY_URL")
  if (!gatewayUrl) return undefined

  const response = await fetch(gatewayUrl, {
    method: "POST",
    headers: voiceGatewayHeaders("tts"),
    body: JSON.stringify({
      userId: input.userId,
      sessionId: input.sessionId,
      text: input.text,
      language: input.language,
      voiceKey: input.voiceKey ?? "sabi_ai_female",
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female_warm",
      fakeTtsAllowed: false,
      fakeFallbackAllowed: false,
      mobileSecretsAllowed: false,
      metadata: input.metadata,
    }),
  })

  if (!response.ok) {
    throw new Error(`ai_voice_tts_gateway_http_${response.status}`)
  }

  const payload = await readGatewayJson(response)
  const audio = extractAudioPayload(payload)

  if (!audio.audioUrl && !audio.audioBase64) {
    throw new Error("ai_voice_tts_empty_audio_result")
  }

  return {
    commandId: `sabi_tts_${Date.now()}`,
    sessionId: input.sessionId,
    text: input.text,
    language: input.language,
    audioUrl: audio.audioUrl ?? null,
    audioBase64: audio.audioBase64 ?? null,
    mimeType: audio.mimeType ?? "audio/mpeg",
    provider: audio.provider ?? "configured_tts_gateway",
    status: "ready",
    fakeFallbackUsed: false,
    raw: payload,
  }
}

type AiVoiceFacadePort = {
  getVoiceManifest: () => AiVoiceManifestContract
  getVoiceStatus: (userId: string) => AiVoiceStatusContract
  bindNativeVoiceBridge: (
    input: AiNativeVoiceBridgeBindRequestContract,
  ) => AiNativeVoiceBridgeStateContract | Promise<AiNativeVoiceBridgeStateContract>
  startVoiceSession: (input: AiStartVoiceSessionRequestContract) => AiVoiceSessionContract | Promise<AiVoiceSessionContract>
  updateVoiceSession: (input: AiUpdateVoiceSessionRequestContract) => AiVoiceSessionContract | Promise<AiVoiceSessionContract>
  cancelVoiceSession: (userId: string, sessionId: string) => AiVoiceSessionContract | Promise<AiVoiceSessionContract>
  transcribeVoice: (
    input: AiVoiceTranscriptionRequestContract,
  ) => AiVoiceTranscriptionResultContract | Promise<AiVoiceTranscriptionResultContract>
  synthesizeVoice: (
    input: AiVoiceSynthesisRequestContract,
  ) => AiVoiceSynthesisResultContract | Promise<AiVoiceSynthesisResultContract>
  invokeVoice: (input: AiVoiceInvokeRequestContract) => AiVoiceInvokeResultContract | Promise<AiVoiceInvokeResultContract>
  recordNativeVoiceEvent: (
    input: AiNativeVoiceClientEventContract,
  ) => AiVoiceSessionContract | undefined | Promise<AiVoiceSessionContract | undefined>
  requestVoicePlayback: (
    input: AiVoicePlaybackRequestContract,
  ) => AiVoiceSynthesisResultContract | Promise<AiVoiceSynthesisResultContract>
  interruptVoice: (input: AiVoiceInterruptRequestContract) => AiVoiceInterruptResultContract | Promise<AiVoiceInterruptResultContract>
}

function getVoiceFacade(candidate: unknown): AiVoiceFacadePort {
  const facade = candidate as Partial<AiVoiceFacadePort>
  const requiredMethods: Array<keyof AiVoiceFacadePort> = [
    "getVoiceManifest",
    "getVoiceStatus",
    "bindNativeVoiceBridge",
    "startVoiceSession",
    "updateVoiceSession",
    "cancelVoiceSession",
    "transcribeVoice",
    "synthesizeVoice",
    "invokeVoice",
    "recordNativeVoiceEvent",
    "requestVoicePlayback",
    "interruptVoice",
  ]

  for (const method of requiredMethods) {
    if (typeof facade[method] !== "function") {
      throw new Error("ai_voice_kernel_not_connected")
    }
  }

  return facade as AiVoiceFacadePort
}

function buildBindRequest(req: Request): AiNativeVoiceBridgeBindRequestContract {
  const userId = asString(req.body?.userId)
  if (!userId) throw new Error("ai_voice_user_id_required")

  const payload = asObject(req.body?.payload)
  const capabilities = asObject(req.body?.capabilities)

  return {
    userId,
    platform: asPlatform(req.body?.platform) ?? asPlatform(payload?.platform),
    appVersion: asString(req.body?.appVersion) ?? asString(payload?.appVersion),
    deviceId: asString(req.body?.deviceId) ?? asString(payload?.deviceId),
    supportsSpeechToText:
      asBoolean(req.body?.supportsSpeechToText) ??
      asBoolean(capabilities?.supportsSpeechToText) ??
      asBoolean(capabilities?.localSpeechRecognition),
    supportsTextToSpeech:
      asBoolean(req.body?.supportsTextToSpeech) ??
      asBoolean(capabilities?.supportsTextToSpeech) ??
      asBoolean(capabilities?.localTextToSpeech),
    supportsPushToTalk: asBoolean(req.body?.supportsPushToTalk) ?? asBoolean(capabilities?.supportsPushToTalk),
    supportsQuickInvoke: asBoolean(req.body?.supportsQuickInvoke) ?? asBoolean(capabilities?.supportsQuickInvoke),
    supportsWakeInvoke: asBoolean(req.body?.supportsWakeInvoke) ?? asBoolean(capabilities?.supportsWakeInvoke),
    supportsPlaybackInterruption:
      asBoolean(req.body?.supportsPlaybackInterruption) ?? asBoolean(capabilities?.supportsPlaybackInterruption),
    supportsLanguageAutoDetection:
      asBoolean(req.body?.supportsLanguageAutoDetection) ?? asBoolean(capabilities?.supportsLanguageAutoDetection),
    supportedLocales: asStringArray(req.body?.supportedLocales) ?? asStringArray(capabilities?.supportedLocales),
  }
}

function buildNativeEventRequest(req: Request): AiNativeVoiceClientEventContract {
  const userId = asString(req.body?.userId)
  const kind = resolveNativeEventKind(req)
  const payload = asObject(req.body?.payload)

  if (!userId) throw new Error("ai_voice_user_id_required")
  if (!kind) throw new Error("ai_voice_client_event_kind_required")

  return {
    userId,
    kind,
    sessionId: asString(req.body?.sessionId),
    transcript: asString(req.body?.transcript) ?? asString(payload?.transcript),
    errorCode: asString(req.body?.errorCode) ?? asString(payload?.errorCode),
    language: asString(req.body?.language) ?? asString(payload?.language),
    confidence: asNumber(req.body?.confidence) ?? asNumber(payload?.confidence),
    metadata: mergeMetadata(payload, asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? asString(payload?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? asString(payload?.voiceStyle) ?? "sabi_ai_female",
    }),
  }
}

function buildStartSessionRequest(req: Request): AiStartVoiceSessionRequestContract {
  const userId = asString(req.body?.userId)
  const inputKind = asInputKind(req.body?.inputKind) ?? "quick_invoke"

  if (!userId) throw new Error("ai_voice_user_id_required")

  return {
    userId,
    inputKind,
    mode: asMode(req.body?.mode),
    sourceLanguage: asString(req.body?.sourceLanguage),
    targetLanguage: asString(req.body?.targetLanguage),
    preferredProvider: asProvider(req.body?.preferredProvider),
    callSessionId: asString(req.body?.callSessionId),
    metadata: mergeMetadata(asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
    }),
  }
}

function buildTranscriptionRequest(req: Request): AiVoiceTranscriptionRequestContract {
  const userId = asString(req.body?.userId)
  if (!userId) throw new Error("ai_voice_user_id_required")

  return {
    userId,
    sessionId: asString(req.body?.sessionId),
    audioUrl: asString(req.body?.audioUrl),
    audioBase64: asString(req.body?.audioBase64),
    mimeType: asString(req.body?.mimeType),
    sourceLanguage: asString(req.body?.sourceLanguage) ?? asString(req.body?.language),
    preferredProvider: asProvider(req.body?.preferredProvider),
    transcript: asString(req.body?.transcript),
    clientTranscript: asString(req.body?.clientTranscript) ?? asString(req.body?.transcript),
    confidence: asNumber(req.body?.confidence),
    metadata: mergeMetadata(asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
      source: asString(req.body?.source),
    }),
  }
}

function buildSynthesisRequest(req: Request): AiVoiceSynthesisRequestContract {
  const userId = asString(req.body?.userId)
  const text = asString(req.body?.text)
  const language = resolveLanguage(req)

  if (!userId) throw new Error("ai_voice_user_id_required")
  if (!text) throw new Error("ai_voice_tts_text_required")
  if (!language) throw new Error("ai_voice_tts_language_required")

  return {
    userId,
    sessionId: asString(req.body?.sessionId),
    text,
    language,
    voiceKey: resolveVoiceKey(req),
    preferredProvider: asProvider(req.body?.preferredProvider),
    metadata: mergeMetadata(asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
      source: asString(req.body?.source),
    }),
  }
}

function buildPlaybackRequest(req: Request): AiVoicePlaybackRequestContract {
  const userId = asString(req.body?.userId)
  const text = asString(req.body?.text)
  const language = resolveLanguage(req)

  if (!userId) throw new Error("ai_voice_user_id_required")
  if (!text) throw new Error("ai_voice_tts_text_required")
  if (!language) throw new Error("ai_voice_tts_language_required")

  return {
    userId,
    sessionId: asString(req.body?.sessionId),
    text,
    language,
    voiceKey: resolveVoiceKey(req),
    interruptCurrent: asBoolean(req.body?.interruptCurrent),
    metadata: mergeMetadata(asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
      source: asString(req.body?.source),
    }),
  }
}

function buildInvokeRequest(req: Request): AiVoiceInvokeRequestContract {
  const userId = asString(req.body?.userId)
  if (!userId) throw new Error("ai_voice_user_id_required")

  return {
    userId,
    sessionId: asString(req.body?.sessionId),
    transcript: asString(req.body?.transcript),
    prompt: asString(req.body?.prompt),
    mode: asMode(req.body?.mode),
    sourceLanguage: asString(req.body?.sourceLanguage),
    targetLanguage: asString(req.body?.targetLanguage),
    preferredProvider: asProvider(req.body?.preferredProvider),
    metadata: mergeMetadata(asObject(req.body?.metadata), {
      preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
      voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
      source: asString(req.body?.source),
    }),
  }
}

async function handleVoiceTranscription(aiFacade: unknown, req: Request, res: Response, next: NextFunction) {
  try {
    const input = buildTranscriptionRequest(req)
    let facadeResult: unknown
    let facadeError: unknown

    try {
      facadeResult = await getVoiceFacade(aiFacade).transcribeVoice(input)
      if (extractTranscriptFromPayload(facadeResult)) {
        res.json({ ok: true, data: facadeResult })
        return
      }
    } catch (error) {
      facadeError = error
    }

    const gatewayResult = await transcribeThroughConfiguredGateway(req, input)
    if (gatewayResult) {
      res.json({ ok: true, data: gatewayResult })
      return
    }

    const yandexResult = await transcribeThroughYandexSpeechKit(req, input)
    if (yandexResult) {
      res.json({ ok: true, data: yandexResult })
      return
    }

    if (input.audioBase64 || input.audioUrl || asString(req.body?.audioUri)) {
      throw new Error("ai_voice_stt_provider_not_configured")
    }

    if (facadeError) throw facadeError
    res.json({ ok: true, data: facadeResult })
  } catch (error) {
    next(error)
  }
}

async function handleVoiceSynthesis(aiFacade: unknown, req: Request, res: Response, next: NextFunction) {
  try {
    const input = buildSynthesisRequest(req)
    let facadeResult: unknown

    try {
      facadeResult = await getVoiceFacade(aiFacade).synthesizeVoice(input)
      const facadeAudio = extractAudioPayload(facadeResult)
      if (facadeAudio.audioUrl || facadeAudio.audioBase64) {
        res.json({ ok: true, data: facadeResult })
        return
      }
    } catch {
      // Continue to the configured server-side TTS gateway below.
    }

    const gatewayResult = await synthesizeThroughConfiguredGateway(req, input)
    if (gatewayResult) {
      res.json({ ok: true, data: gatewayResult })
      return
    }

    const yandexResult = await synthesizeThroughYandexSpeechKit(req, input)
    if (yandexResult) {
      res.json({ ok: true, data: yandexResult })
      return
    }

    throw new Error("ai_voice_tts_provider_not_configured")
  } catch (error) {
    next(error)
  }
}

export function createAiVoiceRouter(aiFacade: unknown): Router {
  const router = Router()

  router.get("/voice/health", (_req: Request, res: Response) => {
    const sttConfigured = Boolean(
      readEnv("AI_SABI_STT_GATEWAY_URL", "AI_VOICE_STT_GATEWAY_URL") ||
        (resolveSpeechKitAuthHeader("stt") && resolveSpeechKitFolderId("stt")),
    )
    const ttsConfigured = Boolean(
      readEnv("AI_SABI_TTS_GATEWAY_URL", "AI_VOICE_TTS_GATEWAY_URL") ||
        (resolveSpeechKitAuthHeader("tts") && resolveSpeechKitFolderId("tts")),
    )

    res.json({
      ok: true,
      data: {
        version: "STEP71E-YANDEX-ONLY-LIVE-VOICE-NO-SOFT-BLOCK",
        status: sttConfigured && ttsConfigured ? "voice_provider_ready" : "voice_provider_not_configured",
        sttConfigured,
        ttsConfigured,
        provider: "yandex_speechkit_or_server_gateway",
        languageLock: true,
        fakeAccentFallbackAllowed: false,
        femaleVoiceLock: true,
        yandexOnlyQualityRouter: true,
        fakeFallbackAllowed: false,
        mobileSecretsAllowed: false,
      },
    })
  })

  router.get("/voice/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: getVoiceFacade(aiFacade).getVoiceManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/voice/native/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: getVoiceFacade(aiFacade).getVoiceManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/voice/:userId/status", (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      if (!userId) throw new Error("ai_voice_user_id_required")
      res.json({ ok: true, data: getVoiceFacade(aiFacade).getVoiceStatus(userId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/native/bind", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).bindNativeVoiceBridge(buildBindRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/bridge/bind", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).bindNativeVoiceBridge(buildBindRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/native/event", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).recordNativeVoiceEvent(buildNativeEventRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/event", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).recordNativeVoiceEvent(buildNativeEventRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/session", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).startVoiceSession(buildStartSessionRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/session/start", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).startVoiceSession(buildStartSessionRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/voice/:userId/session/:sessionId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const sessionId = asString(req.params.sessionId)
      if (!userId || !sessionId) throw new Error("ai_voice_session_update_payload_required")

      res.json({
        ok: true,
        data: await getVoiceFacade(aiFacade).updateVoiceSession({
          userId,
          sessionId,
          status: asSessionStatus(req.body?.status),
          transcript: asString(req.body?.transcript),
          responseText: asString(req.body?.responseText),
          errorCode: asString(req.body?.errorCode),
          metadata: mergeMetadata(asObject(req.body?.metadata), {
            preferredVoiceGender: asString(req.body?.preferredVoiceGender) ?? "female",
            voiceStyle: asString(req.body?.voiceStyle) ?? "sabi_ai_female",
          }),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete("/voice/:userId/session/:sessionId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.params.userId)
      const sessionId = asString(req.params.sessionId)
      if (!userId || !sessionId) throw new Error("ai_voice_session_cancel_payload_required")
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).cancelVoiceSession(userId, sessionId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/session/:sessionId/stop", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      const sessionId = asString(req.params.sessionId)
      if (!userId || !sessionId) throw new Error("ai_voice_session_cancel_payload_required")
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).cancelVoiceSession(userId, sessionId) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/stt", (req: Request, res: Response, next: NextFunction) => handleVoiceTranscription(aiFacade, req, res, next))

  router.post("/voice/transcribe", (req: Request, res: Response, next: NextFunction) => handleVoiceTranscription(aiFacade, req, res, next))

  router.post("/voice/tts", (req: Request, res: Response, next: NextFunction) => handleVoiceSynthesis(aiFacade, req, res, next))

  router.post("/voice/native/playback", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).requestVoicePlayback(buildPlaybackRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/invoke", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: await getVoiceFacade(aiFacade).invokeVoice(buildInvokeRequest(req)) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/voice/native/interrupt", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = asString(req.body?.userId)
      if (!userId) throw new Error("ai_voice_user_id_required")

      res.json({
        ok: true,
        data: await getVoiceFacade(aiFacade).interruptVoice({
          userId,
          sessionId: asString(req.body?.sessionId),
          reason: asString(req.body?.reason),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}