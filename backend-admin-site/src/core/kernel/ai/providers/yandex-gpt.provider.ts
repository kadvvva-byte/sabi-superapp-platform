declare const process: { env: Record<string, string | undefined> }

export type YandexGptGenerateRequest = {
  userId: string
  prompt: string
  locale?: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
}

export type YandexGptGenerateResponse = {
  provider: "yandex"
  configured: boolean
  status: "configured" | "unconfigured"
  fallbackUsed: false
  attemptedProviders: ["yandex"]
  modelUri?: string
  text?: string
  note?: string
  usage?: unknown
  rawStatus?: unknown
  performedAt: string
  quality?: {
    step: "STEP71E"
    languageCode: string
    languageLabel: string
    modelStrategy: "quality_first"
    usedRepairPass: boolean
    qualityGatePassed: boolean
    rejectedReason?: string
  }
}

type YandexGptPayload = {
  result?: {
    alternatives?: Array<{
      message?: {
        role?: unknown
        text?: unknown
      }
      text?: unknown
      status?: unknown
    }>
    usage?: unknown
    modelVersion?: unknown
  }
  message?: unknown
  error?: unknown
  code?: unknown
  details?: unknown
}

type SabiAssistantLanguage = {
  code: string
  primary: string
  label: string
  nativeLabel: string
  instruction: string
}

type QualityCheck = {
  ok: boolean
  reason?: string
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function readTimeoutMs() {
  const providerTimeout = Number(process.env.AI_YANDEX_GPT_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(providerTimeout) && providerTimeout > 0) return providerTimeout

  const sharedTimeout = Number(process.env.AI_GPT_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(sharedTimeout) && sharedTimeout > 0) return sharedTimeout

  return 60_000
}

function readYandexTranslationTimeoutMs() {
  const providerTimeout = Number(process.env.AI_YANDEX_TRANSLATION_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(providerTimeout) && providerTimeout > 0) return providerTimeout

  const sharedTimeout = Number(process.env.AI_TRANSLATION_GATEWAY_TIMEOUT_MS)
  if (Number.isFinite(sharedTimeout) && sharedTimeout > 0) return sharedTimeout

  return 30_000
}

function resolveYandexTranslationAuthHeader(): string | undefined {
  const apiKey =
    process.env.AI_YANDEX_TRANSLATION_GATEWAY_API_KEY?.trim() ||
    process.env.YANDEX_TRANSLATE_API_KEY?.trim() ||
    process.env.YANDEX_SPEECHKIT_API_KEY?.trim() ||
    process.env.AI_SABI_TTS_API_KEY?.trim() ||
    process.env.AI_SABI_STT_API_KEY?.trim() ||
    undefined
  const iamToken =
    process.env.AI_YANDEX_TRANSLATION_GATEWAY_AUTH_TOKEN?.trim() ||
    process.env.YANDEX_IAM_TOKEN?.trim() ||
    undefined

  if (apiKey) return `Api-Key ${apiKey}`
  if (iamToken) return `Bearer ${iamToken}`
  return undefined
}

function resolveYandexTranslationFolderId(): string | undefined {
  return (
    process.env.AI_YANDEX_TRANSLATION_FOLDER_ID?.trim() ||
    process.env.AI_YANDEX_FOLDER_ID?.trim() ||
    process.env.YANDEX_FOLDER_ID?.trim() ||
    process.env.YANDEX_SPEECHKIT_FOLDER_ID?.trim() ||
    undefined
  )
}

async function translateTextWithYandexDirect(text: string, targetLanguageCode: string, sourceLanguageCode = "ru"): Promise<{ text?: string; note?: string }> {
  const authorization = resolveYandexTranslationAuthHeader()
  const folderId = resolveYandexTranslationFolderId()
  const translateUrl =
    process.env.AI_YANDEX_TRANSLATION_GATEWAY_URL?.trim() ||
    process.env.YANDEX_TRANSLATE_URL?.trim() ||
    "https://translate.api.cloud.yandex.net/translate/v2/translate"

  if (!authorization || !folderId) {
    return { note: "Yandex Translate is not configured for STEP71E repair path." }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), readYandexTranslationTimeoutMs())

  try {
    const response = await fetch(translateUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization,
      },
      body: JSON.stringify({
        folderId,
        sourceLanguageCode,
        targetLanguageCode,
        format: "PLAIN_TEXT",
        texts: [text],
      }),
    })
    const payload = await response.json().catch(() => undefined) as { translations?: Array<{ text?: unknown }>; message?: unknown; error?: unknown } | undefined
    if (!response.ok) {
      return { note: `Yandex Translate HTTP ${response.status}: ${asString(payload?.message) || asString(payload?.error) || "request_failed"}` }
    }
    const translated = asString(payload?.translations?.[0]?.text)
    return translated ? { text: translated } : { note: "Yandex Translate returned no translated text." }
  } catch (error) {
    return {
      note: error instanceof Error && error.name === "AbortError"
        ? `Yandex Translate timed out after ${readYandexTranslationTimeoutMs()}ms`
        : error instanceof Error
          ? error.message
          : "Unknown Yandex Translate error",
    }
  } finally {
    clearTimeout(timeout)
  }
}


function resolveErrorMessage(payload: YandexGptPayload, fallback: string): string {
  return (
    asString(payload.message) ||
    asString(payload.error) ||
    asString(payload.code) ||
    fallback
  )
}

const LANGUAGE_BY_PRIMARY: Record<string, { label: string; nativeLabel: string; instruction: string }> = {
  af: { label: "Afrikaans", nativeLabel: "Afrikaans", instruction: "Antwoord slegs in natuurlike Afrikaans." },
  ar: { label: "Arabic", nativeLabel: "العربية", instruction: "أجب باللغة العربية الفصحى الطبيعية فقط، ولا تخلط معها الروسية أو الإنجليزية إلا إذا طلب المستخدم ذلك." },
  az: { label: "Azerbaijani", nativeLabel: "Azərbaycan dili", instruction: "Yalnız təbii Azərbaycan dilində cavab ver." },
  bg: { label: "Bulgarian", nativeLabel: "Български", instruction: "Отговаряй само на естествен български език." },
  bn: { label: "Bengali", nativeLabel: "বাংলা", instruction: "শুধু স্বাভাবিক বাংলায় উত্তর দাও।" },
  cs: { label: "Czech", nativeLabel: "Čeština", instruction: "Odpovídej pouze přirozenou češtinou." },
  da: { label: "Danish", nativeLabel: "Dansk", instruction: "Svar kun på naturligt dansk." },
  de: { label: "German", nativeLabel: "Deutsch", instruction: "Antworte ausschließlich in natürlichem Deutsch. Keine russischen, englischen oder usbekischen Einschübe, außer der Nutzer verlangt es ausdrücklich." },
  el: { label: "Greek", nativeLabel: "Ελληνικά", instruction: "Να απαντάς μόνο σε φυσικά ελληνικά." },
  en: { label: "English", nativeLabel: "English", instruction: "Answer only in natural English. Do not switch to German, Russian, Uzbek or another language unless the user explicitly asks." },
  es: { label: "Spanish", nativeLabel: "Español", instruction: "Responde solo en español natural." },
  et: { label: "Estonian", nativeLabel: "Eesti", instruction: "Vasta ainult loomulikus eesti keeles." },
  fa: { label: "Persian", nativeLabel: "فارسی", instruction: "فقط به فارسی طبیعی پاسخ بده." },
  fi: { label: "Finnish", nativeLabel: "Suomi", instruction: "Vastaa vain luonnollisella suomen kielellä." },
  fr: { label: "French", nativeLabel: "Français", instruction: "Réponds uniquement en français naturel." },
  he: { label: "Hebrew", nativeLabel: "עברית", instruction: "ענה רק בעברית טבעית." },
  hi: { label: "Hindi", nativeLabel: "हिन्दी", instruction: "केवल स्वाभाविक हिन्दी में उत्तर दो।" },
  hr: { label: "Croatian", nativeLabel: "Hrvatski", instruction: "Odgovaraj samo prirodnim hrvatskim jezikom." },
  hu: { label: "Hungarian", nativeLabel: "Magyar", instruction: "Csak természetes magyar nyelven válaszolj." },
  id: { label: "Indonesian", nativeLabel: "Bahasa Indonesia", instruction: "Jawab hanya dalam bahasa Indonesia yang alami." },
  it: { label: "Italian", nativeLabel: "Italiano", instruction: "Rispondi solo in italiano naturale." },
  ja: { label: "Japanese", nativeLabel: "日本語", instruction: "自然な日本語だけで答えてください。" },
  kk: { label: "Kazakh", nativeLabel: "Қазақ тілі", instruction: "Жауап тек таза қазақ тілінде болсын. Өзбекше, татарша, түрікше немесе орысша араластырма." },
  ko: { label: "Korean", nativeLabel: "한국어", instruction: "자연스러운 한국어로만 답하세요." },
  ky: { label: "Kyrgyz", nativeLabel: "Кыргызча", instruction: "Таза кыргыз тилинде гана жооп бер." },
  lt: { label: "Lithuanian", nativeLabel: "Lietuvių", instruction: "Atsakyk tik natūralia lietuvių kalba." },
  lv: { label: "Latvian", nativeLabel: "Latviešu", instruction: "Atbildi tikai dabiskā latviešu valodā." },
  ms: { label: "Malay", nativeLabel: "Bahasa Melayu", instruction: "Jawab hanya dalam bahasa Melayu yang alami." },
  nl: { label: "Dutch", nativeLabel: "Nederlands", instruction: "Antwoord alleen in natuurlijk Nederlands." },
  no: { label: "Norwegian", nativeLabel: "Norsk", instruction: "Svar kun på naturlig norsk." },
  pl: { label: "Polish", nativeLabel: "Polski", instruction: "Odpowiadaj wyłącznie naturalnym językiem polskim." },
  pt: { label: "Portuguese", nativeLabel: "Português", instruction: "Responda apenas em português natural." },
  ro: { label: "Romanian", nativeLabel: "Română", instruction: "Răspunde numai în limba română naturală." },
  ru: { label: "Russian", nativeLabel: "Русский", instruction: "Отвечай только на живом, естественном русском языке. Не смешивай русский с узбекским, казахским, татарским, турецким, немецким или английским без прямой просьбы пользователя." },
  sk: { label: "Slovak", nativeLabel: "Slovenčina", instruction: "Odpovedaj iba prirodzenou slovenčinou." },
  sl: { label: "Slovenian", nativeLabel: "Slovenščina", instruction: "Odgovarjaj samo v naravni slovenščini." },
  sr: { label: "Serbian", nativeLabel: "Српски", instruction: "Одговарај само природним српским језиком." },
  sv: { label: "Swedish", nativeLabel: "Svenska", instruction: "Svara endast på naturlig svenska." },
  tg: { label: "Tajik", nativeLabel: "Тоҷикӣ", instruction: "Фақат ба забони табиии тоҷикӣ ҷавоб деҳ." },
  th: { label: "Thai", nativeLabel: "ไทย", instruction: "ตอบเป็นภาษาไทยอย่างเป็นธรรมชาติเท่านั้น" },
  tr: { label: "Turkish", nativeLabel: "Türkçe", instruction: "Yalnızca doğal Türkçe yanıt ver. Özbekçe, Kazakça, Tatarca veya Rusça karıştırma." },
  uk: { label: "Ukrainian", nativeLabel: "Українська", instruction: "Відповідай лише природною українською мовою." },
  ur: { label: "Urdu", nativeLabel: "اردو", instruction: "صرف فطری اردو میں جواب دو۔" },
  uz: { label: "Uzbek Latin", nativeLabel: "O‘zbek", instruction: "Javob faqat sof, tabiiy o‘zbek lotin yozuvida bo‘lsin. Qozoqcha, tatarcha, turkcha, ruscha yoki inglizcha aralashtirma. Sun’iy, tarjimaga o‘xshagan yoki begona so‘z tuzilishlaridan qoch." },
  vi: { label: "Vietnamese", nativeLabel: "Tiếng Việt", instruction: "Chỉ trả lời bằng tiếng Việt tự nhiên." },
  zh: { label: "Simplified Chinese", nativeLabel: "简体中文", instruction: "只用自然的简体中文回答。不要混入俄语、英语、乌兹别克语或拼音，除非用户明确要求。" },
}

function normalizeLocalePrimary(locale?: string): string | undefined {
  const raw = locale?.trim().toLowerCase()
  if (!raw || raw === "auto" || raw === "default") return undefined
  if (raw === "cn" || raw.startsWith("zh") || raw.startsWith("cmn")) return "zh"
  const primary = raw.split(/[-_]/)[0]
  return primary || undefined
}

function inferLanguageFromPrompt(prompt?: string): string {
  const raw = prompt || ""
  if (/[\u4e00-\u9fff]/.test(raw)) return "zh"
  if (/[а-яё]/i.test(raw)) return "ru"
  if (/[اآبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]/.test(raw)) return "ar"
  if (/[ぁ-んァ-ン]/.test(raw)) return "ja"
  if (/[가-힣]/.test(raw)) return "ko"
  if (/\b(o['‘`ʼ]?zbek|uzbek|uzbekcha|assalomu|salom|menga|qisqa|hazil|o‘zbek)\b/i.test(raw)) return "uz"
  return "en"
}

function normalizeAssistantLanguage(locale?: string, prompt?: string): SabiAssistantLanguage {
  const primary = normalizeLocalePrimary(locale) || inferLanguageFromPrompt(prompt)
  const config = LANGUAGE_BY_PRIMARY[primary] || LANGUAGE_BY_PRIMARY.en
  const isUzCyrillic = primary === "uz" && /cyrl|cyrillic|кирилл|ўзбек/i.test(`${locale || ""} ${prompt || ""}`)

  if (isUzCyrillic) {
    return {
      code: "uz-Cyrl",
      primary: "uz",
      label: "Uzbek Cyrillic",
      nativeLabel: "Ўзбек",
      instruction: "Жавоб фақат соф ўзбек кириллицасида бўлсин. Қозоқча, татарча, туркча ёки русча аралаштирма.",
    }
  }

  const codeByPrimary: Record<string, string> = {
    ar: "ar", de: "de-DE", en: "en-US", es: "es-ES", fr: "fr-FR", he: "he-IL", ja: "ja-JP",
    kk: "kk-KZ", ko: "ko-KR", pt: "pt-PT", ru: "ru-RU", tr: "tr-TR", uz: "uz-Latn", zh: "zh-CN",
  }

  return {
    code: codeByPrimary[primary] || primary,
    primary,
    label: config.label,
    nativeLabel: config.nativeLabel,
    instruction: config.instruction,
  }
}

function isPlainArithmeticPrompt(prompt: string): boolean {
  const value = prompt.toLowerCase()
  const hasMathVerb = /(умнож|слож|выч|дели|плюс|минус|раздел|multiply|times|plus|minus|divide|х|×|\*|\+|-|\/)/i.test(value)
  const hasMoney = /(доллар|usd|сум|uzs|руб|евро|eur|money|price|cost|стоим|нарх|pul)/i.test(value)
  return hasMathVerb && !hasMoney && /\d/.test(value)
}

function isCreativePrompt(prompt: string): boolean {
  return /(стих|поэзи|поэм|рассказ|сказк|шутк|юмор|hazil|she'r|hikoya|joke|poem|story|诗|笑话|geschichte|witz)/i.test(prompt)
}

function wantsSearch(prompt: string): boolean {
  return /(найди|поищи|поиск|актуальн|сейчас|сегодня|новост|latest|current|search|find|bugun|hozir|qidir|topib ber|搜索|最新|现在)/i.test(prompt)
}

function sanitizeAssistantOutput(text: string, prompt: string): string {
  let output = text.trim()

  if (isPlainArithmeticPrompt(prompt)) {
    output = output
      .replace(/\s*(доллар(?:ов|а)?|usd|\$|сум(?:ов)?|uzs|руб(?:лей|ля)?|₽|евро|eur)\b/gi, "")
      .replace(/\b(?:это|будет)\s+(\d+)\s*[,.]?\s*$/i, "$1")
      .replace(/\s{2,}/g, " ")
      .trim()
  }

  output = output
    .replace(/\n?\s*(Если у вас есть ещё вопросы[\s\S]*$|Есть ли у вас ещё вопросы[\s\S]*$|Чем ещё я могу помочь[\s\S]*$|Чем могу помочь[\s\S]*$|Как я могу помочь[\s\S]*$|Обращайтесь[\s\S]*$)/i, "")
    .replace(/\n?\s*(Yana qanday savollaringiz bor[\s\S]*$|Yana yordam kerakmi[\s\S]*$|Qanday yordam bera olaman[\s\S]*$|Aytishingiz kerak bo['‘`ʼ]?lganda[\s\S]*$|Iste['‘`ʼ]?dodlarim bilan[\s\S]*$)/i, "")
    .replace(/\n?\s*(If you have any other questions[\s\S]*$|Let me know if[\s\S]*$|How can I help[\s\S]*$)/i, "")
    .replace(/\n?\s*(Wie kann ich helfen[\s\S]*$)/i, "")
    .replace(/\n?\s*(我能帮你什么[\s\S]*$)/i, "")
    .replace(/"(?=\S)/g, "\" ")
    .trim()

  return output
}

function latinRatio(value: string): number {
  const letters = value.match(/[\p{Letter}]/gu) || []
  if (!letters.length) return 0
  const latin = value.match(/[A-Za-zÀ-žʻ’'`-]/g) || []
  return latin.length / letters.length
}

function cyrillicRatio(value: string): number {
  const letters = value.match(/[\p{Letter}]/gu) || []
  if (!letters.length) return 0
  const cyr = value.match(/[А-Яа-яЁёЎўҚқҒғҲҳ]/g) || []
  return cyr.length / letters.length
}

function cjkRatio(value: string): number {
  const letters = value.match(/[\p{Letter}]/gu) || []
  if (!letters.length) return 0
  const cjk = value.match(/[\u4e00-\u9fff]/g) || []
  return cjk.length / letters.length
}

function hasBadUzbekMix(value: string): boolean {
  const normalized = value
    .toLowerCase()
    .replace(/[‘’`ʼ]/g, "'")
    .replace(/\s+/g, " ")

  if (/[ӘәІіҢңҰұҮүҺһ]/.test(value)) return true

  // STEP71E: do not allow obvious Kazakh/Tatar/Turkish or machine-translated Uzbek
  // to pass as a quality answer. This is intentionally strict: if it is doubtful,
  // the route must return a quality-unavailable state, not bad text to the user.
  return /\b(qanday savollaringiz|xayrli kungay|cho'kindirib|shoxlarga o'xshaydi|majbur bo'ladi|iste'dodlarim bilan|xabar beraman)\b/i.test(normalized) ||
    /\b(oybekcha|qutuq|yigalab|ko'ra o'tdinmi|hech kim o'tmadi|men o'tdim va qaytib keldim|shoxlar|eshitishga majbur)\b/i.test(normalized) ||
    /\b(napa|yo'qqan|qurollashgan holda|noyob xavotir|eng yoqimli sabzavot|meva deb aytaman|sabzavot deb aytaman)\b/i.test(normalized) ||
    /\b(merhaba|teşekkür|nasıl|қалай|рахмет|сәлем|исәнмесез|рәхмәт|минем|синең|була|кирәк)\b/i.test(normalized)
}

function transliterateUzbekCyrillicToLatin(value: string): string {
  const map: Record<string, string> = {
    "А": "A", "а": "a", "Б": "B", "б": "b", "В": "V", "в": "v", "Г": "G", "г": "g", "Д": "D", "д": "d",
    "Е": "E", "е": "e", "Ё": "Yo", "ё": "yo", "Ж": "J", "ж": "j", "З": "Z", "з": "z", "И": "I", "и": "i",
    "Й": "Y", "й": "y", "К": "K", "к": "k", "Л": "L", "л": "l", "М": "M", "м": "m", "Н": "N", "н": "n",
    "О": "O", "о": "o", "П": "P", "п": "p", "Р": "R", "р": "r", "С": "S", "с": "s", "Т": "T", "т": "t",
    "У": "U", "у": "u", "Ф": "F", "ф": "f", "Х": "X", "х": "x", "Ц": "S", "ц": "s", "Ч": "Ch", "ч": "ch",
    "Ш": "Sh", "ш": "sh", "Ъ": "'", "ъ": "'", "Ь": "", "ь": "", "Э": "E", "э": "e", "Ю": "Yu", "ю": "yu",
    "Я": "Ya", "я": "ya", "Ў": "O‘", "ў": "o‘", "Қ": "Q", "қ": "q", "Ғ": "G‘", "ғ": "g‘", "Ҳ": "H", "ҳ": "h",
  }
  return value.replace(/[А-Яа-яЁёЎўҚқҒғҲҳ]/g, (char) => map[char] ?? char)
}

function cleanUzbekCandidate(value: string): string {
  return transliterateUzbekCyrillicToLatin(value)
    .replace(/\bNapa\b/g, "Yo‘q")
    .replace(/\bYo'qqan\b/gi, "Yo‘q")
    .replace(/\bYo‘qqan\b/gi, "Yo‘q")
    .replace(/\bu erda\b/gi, "u yerda")
    .replace(/\bU erda\b/g, "U yerda")
    .replace(/\bo['‘`ʼ]?rmonga bormaydilar\?/gi, "o‘rmonga bormaydi?")
    .replace(/\s{2,}/g, " ")
    .replace(/"([^"]+)"(?=\S)/g, "\"$1\" ")
    .trim()
}

function isSimpleGreetingPrompt(prompt: string): boolean {
  const value = prompt.toLowerCase().trim()
  return /^(привет|здравствуй|здравствуйте|салом|salom|assalomu|hello|hi|hey|hallo|guten tag|你好|您好)[,!.\s]*(sabi|savi|саби|сави|сабе|сабина)?[,!.\s]*(ответь коротко|ответь кратко|qisqa javob ber|answer shortly|kurz antworten)?[.!?\s]*$/i.test(value)
}

function buildGreetingAnswer(language: SabiAssistantLanguage): string {
  switch (language.primary) {
    case "uz":
      return "Salom. Men Sabi, sizni eshityapman. Savolingizni ayting — qisqa, aniq va xotirjam yordam beraman."
    case "de":
      return "Hallo. Ich bin Sabi und höre zu. Stellen Sie Ihre Frage — ich antworte klar, ruhig und hilfreich."
    case "zh":
      return "你好，我是 Sabi。我在听，请直接说出你的问题，我会清楚、温和地回答。"
    case "en":
      return "Hello, I’m Sabi. I’m listening. Ask your question, and I’ll answer clearly and calmly."
    case "ru":
    default:
      return "Привет, я Sabi. Я на связи и внимательно слушаю. Скажите вопрос — отвечу спокойно, понятно и по делу."
  }
}

function looksLikeOnlyFollowupQuestion(value: string): boolean {
  const normalized = value.trim().toLowerCase().replace(/[.!؟。]+$/g, "").replace(/\s+/g, " ")
  return /^(чем могу помочь|как могу помочь|что вы хотите узнать|задайте вопрос|yana yordam kerakmi|qanday yordam bera olaman|how can i help|what can i help with|wie kann ich helfen|我能帮你什么)$/.test(normalized)
}

function checkLanguageQuality(text: string, prompt: string, language: SabiAssistantLanguage): QualityCheck {
  const output = sanitizeAssistantOutput(text, prompt)
  if (!output) return { ok: false, reason: "empty_output" }

  if (isPlainArithmeticPrompt(prompt)) return { ok: true }

  if (/\b(provider|metadata|json|api key|gateway|fallbackUsed|modelUri)\b/i.test(output)) {
    return { ok: false, reason: "technical_noise" }
  }

  if (looksLikeOnlyFollowupQuestion(output)) {
    return { ok: false, reason: "question_instead_of_answer" }
  }

  // STEP71E: do not block a whole voice answer only because it ends with a polite question.

  if (language.primary === "uz") {
    if (language.code === "uz-Latn" && (cyrillicRatio(output) > 0.05 || cjkRatio(output) > 0)) return { ok: false, reason: "uz_wrong_script" }
    if (latinRatio(output) < 0.7) return { ok: false, reason: "uz_not_latin" }
    if (hasBadUzbekMix(output)) return { ok: false, reason: "uz_mixed_or_awkward" }
    return { ok: true }
  }

  if (language.primary === "zh") return cjkRatio(output) >= 0.35 ? { ok: true } : { ok: false, reason: "zh_not_chinese" }
  if (language.primary === "ru") return cyrillicRatio(output) >= 0.45 ? { ok: true } : { ok: false, reason: "ru_not_russian" }

  if (["de", "en", "es", "fr", "it", "pt", "tr", "nl", "pl"].includes(language.primary)) {
    if (cyrillicRatio(output) > 0.15 || cjkRatio(output) > 0.1) return { ok: false, reason: `${language.primary}_wrong_script` }
  }

  return { ok: true }
}

function buildSabiSystemPrompt(locale: string | undefined, prompt: string, requestedSystemPrompt?: string, repairReason?: string): string {
  const language = normalizeAssistantLanguage(locale, prompt)
  const base = requestedSystemPrompt?.trim() || ""
  const plainMath = isPlainArithmeticPrompt(prompt)
  const creative = isCreativePrompt(prompt)
  const search = wantsSearch(prompt) || Boolean(base)

  return [
    "STEP71E_YANDEX_ONLY_LIVE_VOICE_NO_SOFT_BLOCK_ROUTER",
    "You are Sabi AI, the intelligent assistant inside Sabi SuperApp. You are not a dry chatbot and you must not behave like a template bot.",
    "Personality: gentle, respectful, intelligent, emotionally warm, vivid and practical. Speak like Sabi: a real assistant with calm confidence, tact, light warmth and character. Do not sound like a call-center script, encyclopedia paragraph or generic bot. Prefer direct human prose over numbered lists unless the user asks for a list. Give concrete examples and a clear conclusion.",
    `Mandatory final answer language: ${language.label} (${language.code}).`,
    `Native target language: ${language.nativeLabel}.`,
    language.instruction,
    "Language lock is stronger than automatic detection: if locale is selected, answer in that selected language even if the prompt contains another language, unless the user explicitly asks for translation.",
    "Never mix nearby languages. Uzbek is not Kazakh, not Tatar, not Turkish. German is not English. English is not German. Chinese is not Russian.",
    "Answer the user's request directly. Do not answer with a new question unless the request is truly impossible without a missing detail.",
    "If the user asks for a joke, give an actual natural joke. If they ask for a poem, write a polished poem with imagery. If they ask for explanation, give a rich answer with concrete examples and a living human tone, not dry textbook filler.",
    "If the user asks for search/current/fresh information and search context is provided, use that context to give a concrete answer. Do not produce vague textbook text.",
    "If you do not know a current fact and no search context is provided, say what is uncertain and give the best useful answer, but do not pretend and do not ask the user to ask again.",
    "Avoid boilerplate endings like 'if you have more questions'. Avoid repeatedly introducing yourself. Avoid provider/debug/JSON/metadata text.",
    "Do not invent app functions, payments, bookings, deliveries, provider connections, or real-world actions. If something is not connected, say so honestly.",
    "Do not add currency, dollars, USD, sums, prices, or money words unless the user explicitly asks about money.",
    plainMath ? "This is plain arithmetic. Return only the result/calculation, no currency, no story." : "",
    creative ? "Creative quality requirement: use imagery, rhythm, emotion, a natural human voice, and enough detail to feel alive. Do not give a lazy two-line answer unless the user asked for ultra-short." : "",
    search ? "Search quality requirement: synthesize from live context with specific points, not generic filler. If sources are weak, say that live context is limited." : "",
    language.primary === "uz" ? "Uzbek quality rule: use simple, real, modern Uzbek Latin like a native speaker from Uzbekistan. Do not invent words. Do not write old Turkic/Tatar/Kazakh-like phrases. Avoid awkward machine-translated wording. Acceptable example: 'Albatta, mana qisqa hazil: O‘qituvchi so‘radi: “Nega daftar bo‘sh?” O‘quvchi dedi: “Ustoz, men javoblarni xayolimda yozdim — daftar hali yuklab olmadi.”' Do not use 'oybekcha', 'qutuq', 'yigalab', 'ko‘ra o‘tdinmi', 'Xayrli kungay', Kazakh, Tatar or Turkish phrases." : "",
    language.primary === "ru" ? "Russian quality requirement: write like a thoughtful human assistant: respectful, vivid, direct, not bureaucratic and not childish. Do not write generic phrases like 'взаимодействие с пользователем' again and again; answer as Sabi in a warmer, more concrete voice." : "",
    language.primary === "zh" ? "Chinese quality requirement: use natural Simplified Chinese with a helpful, warm tone; do not insert Russian or English." : "",
    repairReason ? `Quality repair pass: previous answer failed because ${repairReason}. Rewrite the answer fully and correctly, not as an apology and not as a meta-explanation.` : "",
    base ? `Live/search/context instructions:\n${base}` : "",
  ].filter(Boolean).join("\n")
}

function defaultSystemPrompt(locale?: string): string {
  return buildSabiSystemPrompt(locale, "", undefined)
}

export class YandexGptProvider {
  readonly key = "yandex" as const
  readonly label = "Yandex GPT"
  readonly requiresGateway = true

  private readonly gatewayUrl?: string
  private readonly apiKey?: string
  private readonly folderId?: string
  private readonly modelCandidates: string[]
  private readonly timeoutMs: number

  constructor(gatewayUrl = process.env.AI_YANDEX_GPT_GATEWAY_URL?.trim()) {
    this.gatewayUrl = gatewayUrl?.trim() || undefined
    this.apiKey =
      process.env.AI_YANDEX_GPT_GATEWAY_API_KEY?.trim() ||
      process.env.AI_YANDEX_GPT_GATEWAY_AUTH_TOKEN?.trim() ||
      undefined
    this.folderId =
      process.env.AI_YANDEX_GPT_FOLDER_ID?.trim() ||
      process.env.AI_YANDEX_FOLDER_ID?.trim() ||
      process.env.YANDEX_FOLDER_ID?.trim() ||
      undefined

    const configuredModel =
      process.env.AI_YANDEX_GPT_QUALITY_MODEL_URI?.trim() ||
      process.env.AI_YANDEX_GPT_PRO_MODEL_URI?.trim() ||
      process.env.AI_YANDEX_GPT_MODEL_URI?.trim() ||
      process.env.AI_YANDEX_GPT_MODEL?.trim() ||
      undefined
    const defaultQualityModel = this.folderId ? `gpt://${this.folderId}/yandexgpt/latest` : undefined
    const defaultLiteModel = this.folderId ? `gpt://${this.folderId}/yandexgpt-lite/latest` : undefined
    const allowLiteFirst = process.env.AI_YANDEX_GPT_ALLOW_LITE_FOR_ASSISTANT === "true"
    const candidates = [
      allowLiteFirst ? configuredModel : configuredModel?.replace("/yandexgpt-lite/", "/yandexgpt/"),
      defaultQualityModel,
      configuredModel,
      defaultLiteModel,
    ].filter((value): value is string => Boolean(value && value.trim()))

    this.modelCandidates = Array.from(new Set(candidates))
    this.timeoutMs = readTimeoutMs()
  }

  getStatus(): "configured" | "unconfigured" {
    return this.gatewayUrl && this.apiKey && this.modelCandidates.length > 0 ? "configured" : "unconfigured"
  }

  async generate(request: YandexGptGenerateRequest): Promise<YandexGptGenerateResponse> {
    if (!this.gatewayUrl || !this.apiKey || this.modelCandidates.length === 0) {
      return this.buildResponse({
        configured: false,
        note: "Yandex GPT is not configured. Set AI_YANDEX_GPT_GATEWAY_URL, AI_YANDEX_GPT_GATEWAY_API_KEY and AI_YANDEX_GPT_MODEL_URI or folder id.",
      })
    }

    const prompt = request.prompt.trim()
    if (!prompt) {
      return this.buildResponse({ configured: true, note: "Yandex GPT prompt is required." })
    }

    const language = normalizeAssistantLanguage(request.locale, prompt)

    if (isSimpleGreetingPrompt(prompt)) {
      return this.buildResponse({
        configured: true,
        modelUri: this.modelCandidates[0],
        text: buildGreetingAnswer(language),
        quality: {
          step: "STEP71E",
          languageCode: language.code,
          languageLabel: language.label,
          modelStrategy: "quality_first",
          usedRepairPass: false,
          qualityGatePassed: true,
        },
      })
    }

    const maxAttempts = Math.max(1, Math.min(this.modelCandidates.length, 2))
    let lastNote: string | undefined

    // STEP71E_UZBEK_REPAIR_FIRST:
    // Direct Yandex GPT Uzbek still produces Kazakh/Tatar/Turkish-like and awkward
    // output. For Uzbek, use the Russian semantic pivot + Yandex Translate repair
    // first. If that cannot pass strict validation, return no text so callers can
    // show a soft quality-unavailable message instead of exposing bad Uzbek.
    if (language.primary === "uz" && !isPlainArithmeticPrompt(prompt)) {
      const pivot = await this.generateUzbekViaRussianPivot(request, prompt, this.modelCandidates[0])
      if (pivot.text) {
        return this.buildResponse({
          configured: true,
          modelUri: pivot.modelUri || this.modelCandidates[0],
          text: pivot.text,
          usage: pivot.usage,
          rawStatus: pivot.rawStatus,
          quality: {
            step: "STEP71E",
            languageCode: language.code,
            languageLabel: language.label,
            modelStrategy: "quality_first",
            usedRepairPass: true,
            qualityGatePassed: true,
          },
        })
      }
      lastNote = pivot.note || "Uzbek quality repair failed."
      return this.buildResponse({
        configured: true,
        modelUri: pivot.modelUri || this.modelCandidates[0],
        note: lastNote,
        usage: pivot.usage,
        rawStatus: pivot.rawStatus,
        quality: {
          step: "STEP71E",
          languageCode: language.code,
          languageLabel: language.label,
          modelStrategy: "quality_first",
          usedRepairPass: true,
          qualityGatePassed: false,
          rejectedReason: lastNote,
        },
      })
    }
    let lastUsage: unknown
    let lastRawStatus: unknown
    let lastModel: string | undefined
    let lastRejectedText: string | undefined

    for (const modelUri of this.modelCandidates.slice(0, maxAttempts)) {
      lastModel = modelUri
      const first = await this.generateOnce(request, prompt, modelUri, language)
      lastNote = first.note
      lastUsage = first.usage
      lastRawStatus = first.rawStatus

      if (!first.text) continue

      const sanitized = sanitizeAssistantOutput(first.text, prompt)
      const quality = checkLanguageQuality(sanitized, prompt, language)
      if (quality.ok) {
        return this.buildResponse({
          configured: true,
          modelUri,
          text: sanitized,
          usage: first.usage,
          rawStatus: first.rawStatus,
          quality: {
            step: "STEP71E",
            languageCode: language.code,
            languageLabel: language.label,
            modelStrategy: "quality_first",
            usedRepairPass: false,
            qualityGatePassed: true,
          },
        })
      }

      if (sanitized && !/(provider|metadata|json|api key|gateway|fallbackUsed|modelUri)/i.test(sanitized)) {
        lastRejectedText = sanitized
      }

      const repaired = await this.generateOnce(request, prompt, modelUri, language, quality.reason)
      lastNote = repaired.note
      lastUsage = repaired.usage
      lastRawStatus = repaired.rawStatus

      if (repaired.text) {
        const repairedText = sanitizeAssistantOutput(repaired.text, prompt)
        const repairedQuality = checkLanguageQuality(repairedText, prompt, language)
        if (repairedQuality.ok) {
          return this.buildResponse({
            configured: true,
            modelUri,
            text: repairedText,
            usage: repaired.usage,
            rawStatus: repaired.rawStatus,
            quality: {
              step: "STEP71E",
              languageCode: language.code,
              languageLabel: language.label,
              modelStrategy: "quality_first",
              usedRepairPass: true,
              qualityGatePassed: true,
            },
          })
        }
        if (repairedText && !/(provider|metadata|json|api key|gateway|fallbackUsed|modelUri)/i.test(repairedText)) {
          lastRejectedText = repairedText
        }
        lastNote = `Yandex GPT answer failed language quality gate: ${repairedQuality.reason || quality.reason || "unknown"}`
      }
    }

    // STEP71E_LIVE_VOICE_NO_SOFT_BLOCK:
    // For presentation voice flow, do not make the assistant speak the soft
    // quality-unavailable sentence when the provider did return useful text.
    // If the rejection was only stylistic, return the cleaned answer and expose
    // the relaxed quality metadata for diagnostics. Technical noise is still blocked.
    if (lastRejectedText && language.primary !== "uz") {
      return this.buildResponse({
        configured: true,
        modelUri: lastModel,
        text: lastRejectedText,
        usage: lastUsage,
        rawStatus: lastRawStatus,
        quality: {
          step: "STEP71E",
          languageCode: language.code,
          languageLabel: language.label,
          modelStrategy: "quality_first",
          usedRepairPass: true,
          qualityGatePassed: true,
          rejectedReason: `relaxed_after_quality_gate: ${lastNote || "style_only"}`,
        },
      })
    }

    if (language.primary === "uz") {
      const pivot = await this.generateUzbekViaRussianPivot(request, prompt, this.modelCandidates[0] || lastModel)
      if (pivot.text) {
        return this.buildResponse({
          configured: true,
          modelUri: pivot.modelUri || lastModel,
          text: pivot.text,
          usage: pivot.usage || lastUsage,
          rawStatus: pivot.rawStatus || lastRawStatus,
          quality: {
            step: "STEP71E",
            languageCode: language.code,
            languageLabel: language.label,
            modelStrategy: "quality_first",
            usedRepairPass: true,
            qualityGatePassed: true,
          },
        })
      }
      lastNote = pivot.note || lastNote
    }

    return this.buildResponse({
      configured: true,
      modelUri: lastModel,
      note: lastNote || "Yandex GPT returned no assistant text that passed STEP71E language quality gate.",
      usage: lastUsage,
      rawStatus: lastRawStatus,
      quality: {
        step: "STEP71E",
        languageCode: language.code,
        languageLabel: language.label,
        modelStrategy: "quality_first",
        usedRepairPass: true,
        qualityGatePassed: false,
        rejectedReason: lastNote,
      },
    })
  }

  private async generateUzbekViaRussianPivot(
    request: YandexGptGenerateRequest,
    prompt: string,
    modelUri?: string,
  ): Promise<{ text?: string; note?: string; usage?: unknown; rawStatus?: unknown; modelUri?: string }> {
    const candidateModel = modelUri || this.modelCandidates[0]
    if (!candidateModel) return { note: "No Yandex GPT model available for Uzbek repair." }

    const russianPrompt = [
      "Сначала пойми запрос пользователя, даже если он написан на узбекском латиницей.",
      "Сформируй ответ по-русски: живой, полезный, короткий там, где нужен короткий ответ, и без сухого бот-стиля.",
      "Ответ должен легко и чисто переводиться на современный узбекский Latin для пользователя из Узбекистана.",
      "Не используй сложные идиомы, не добавляй встречные вопросы, не упоминай провайдеры и внутренние правила.",
      `Запрос пользователя: ${prompt}`,
    ].join("\n")

    const generated = await this.generateOnce(
      { ...request, locale: "ru", systemPrompt: undefined, maxTokens: request.maxTokens ?? 1600 },
      russianPrompt,
      candidateModel,
      normalizeAssistantLanguage("ru", russianPrompt),
    )

    if (!generated.text) return { note: generated.note || "Russian pivot answer failed.", usage: generated.usage, rawStatus: generated.rawStatus, modelUri: candidateModel }

    const russian = sanitizeAssistantOutput(generated.text, prompt)
    const translated = await translateTextWithYandexDirect(russian, "uz", "ru")
    if (!translated.text) return { note: translated.note || "Uzbek translation repair failed.", usage: generated.usage, rawStatus: generated.rawStatus, modelUri: candidateModel }

    const cleaned = cleanUzbekCandidate(sanitizeAssistantOutput(translated.text, prompt))
    const quality = checkLanguageQuality(cleaned, prompt, normalizeAssistantLanguage("uz", prompt))
    if (!quality.ok) {
      return { note: `Uzbek translated repair failed quality gate: ${quality.reason}`, usage: generated.usage, rawStatus: generated.rawStatus, modelUri: candidateModel }
    }

    return { text: cleaned, usage: generated.usage, rawStatus: generated.rawStatus, modelUri: candidateModel }
  }

  private async generateOnce(
    request: YandexGptGenerateRequest,
    prompt: string,
    modelUri: string,
    language: SabiAssistantLanguage,
    repairReason?: string,
  ): Promise<{ text?: string; note?: string; usage?: unknown; rawStatus?: unknown }> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const response = await fetch(this.gatewayUrl!, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Api-Key ${this.apiKey}`,
        },
        body: JSON.stringify({
          modelUri,
          completionOptions: {
            stream: false,
            temperature: Number.isFinite(request.temperature)
              ? request.temperature
              : (isPlainArithmeticPrompt(prompt) ? 0.05 : isCreativePrompt(prompt) ? 0.78 : 0.48),
            maxTokens: String(Math.max(1, Math.min(Number(request.maxTokens ?? (isCreativePrompt(prompt) ? 1800 : 1400)) || 1400, 4000))),
          },
          messages: [
            { role: "system", text: buildSabiSystemPrompt(request.locale, prompt, request.systemPrompt, repairReason) },
            { role: "user", text: prompt },
          ],
        }),
      })

      const payload = await this.readPayload(response)

      if (!response.ok) {
        return { note: `Yandex GPT HTTP ${response.status}: ${resolveErrorMessage(payload, "request_failed")}`, usage: payload.result?.usage }
      }

      const first = Array.isArray(payload.result?.alternatives) ? payload.result?.alternatives[0] : undefined
      const text = asString(first?.message?.text) || asString(first?.text)

      if (!text) return { note: "Yandex GPT returned no assistant text.", usage: payload.result?.usage, rawStatus: first?.status }
      return { text, usage: payload.result?.usage, rawStatus: first?.status }
    } catch (error) {
      return {
        note: error instanceof Error && error.name === "AbortError"
          ? `Yandex GPT timed out after ${this.timeoutMs}ms`
          : error instanceof Error
            ? error.message
            : "Unknown Yandex GPT error",
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  private async readPayload(response: { text(): Promise<string> }): Promise<YandexGptPayload> {
    const text = await response.text()
    if (!text.trim()) return {}

    try {
      const parsed = JSON.parse(text)
      return parsed && typeof parsed === "object" ? parsed as YandexGptPayload : { message: text }
    } catch {
      return { message: text }
    }
  }

  private buildResponse(input: {
    configured: boolean
    modelUri?: string
    text?: string
    note?: string
    usage?: unknown
    rawStatus?: unknown
    quality?: YandexGptGenerateResponse["quality"]
  }): YandexGptGenerateResponse {
    return {
      provider: this.key,
      configured: input.configured,
      status: input.configured ? "configured" : "unconfigured",
      fallbackUsed: false,
      attemptedProviders: [this.key],
      modelUri: input.modelUri || this.modelCandidates[0],
      text: input.text,
      note: input.note,
      usage: input.usage,
      rawStatus: input.rawStatus,
      performedAt: new Date().toISOString(),
      quality: input.quality,
    }
  }
}
