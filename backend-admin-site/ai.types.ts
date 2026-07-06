export type AiProgramId = "sabi_ai"

export type AiProviderKey = "internal" | "google" | "yandex"

export type AiAssistantMode =
  | "general"
  | "business"
  | "education"
  | "translation"
  | "search"

export type AiExecutionPolicy = "read_only" | "suggest_only" | "confirm_required"

export type AiActionIntent =
  | "answer"
  | "search"
  | "translate"
  | "summarize"
  | "analyze"
  | "draft"
  | "task"

export type AiCapability =
  | "answer_basic"
  | "search_web"
  | "search_files"
  | "search_images"
  | "search_video"
  | "search_music"
  | "translate_text"
  | "translate_audio"
  | "translate_video"
  | "translate_call"
  | "summarize_text"
  | "analyze_text"
  | "draft_text"
  | "analyze_business"
  | "plan_study"
  | "generate_quiz"
  | "explain_concepts"
  | "analyze_learning"
  | "use_ai_workspace"
  | "use_external_search"
  | "use_premium_translation"

export type AiSearchVertical = "web" | "images" | "video" | "music" | "files"

export type AiSearchMediaType = "web" | "image" | "video" | "audio" | "file"

export type AiProviderStatus = "configured" | "unconfigured" | "disabled"


export type AiPremiumPlanKey = "free" | "ai_pro" | "ai_business" | "ai_education"

export type AiPremiumFeature =
  | "ai_workspace"
  | "ai_search_external"
  | "ai_translation_media"
  | "ai_translation_realtime"
  | "ai_business_assistant"
  | "ai_education_assistant"
  | "ai_memory_extended"


export type AiSessionConsentState = {
  readAccessAllowed: boolean
  memoryWriteAllowed: boolean
  toolExecutionAllowed: boolean
  internetSearchAllowed: boolean
}

export type AiSessionContext = {
  userId: string
  programId: AiProgramId
  locale: string
  mode: AiAssistantMode
  defaultProvider: AiProviderKey
  premiumEnabled: boolean
  premiumPlanKey: AiPremiumPlanKey
  activePremiumFeatures: AiPremiumFeature[]
  coinBalance?: number
  consent: AiSessionConsentState
  createdAt: string
  updatedAt: string
}

export type AiAssistantState = {
  session: AiSessionContext
  availableCapabilities: AiCapability[]
  executionPolicy: AiExecutionPolicy
  lastIntent?: AiActionIntent
  lastRequestAt?: string
}

export type AiRequestInput = {
  userId: string
  prompt: string
  locale?: string
  preferredMode?: AiAssistantMode
  preferredProvider?: AiProviderKey
}

export type AiActionPlan = {
  intent: AiActionIntent
  executionPolicy: AiExecutionPolicy
  requiresInternet: boolean
  requiresProviderSelection: boolean
  requiresExplicitConfirmation: boolean
  requiredCapabilities: AiCapability[]
  summary: string
}

export type AiRuntimeResponse = {
  session: AiSessionContext
  state: AiAssistantState
  plan: AiActionPlan
}

export type AiSearchRequest = {
  userId: string
  query: string
  locale?: string
  preferredProvider?: AiProviderKey
  vertical?: AiSearchVertical
  limit?: number
  safeSearch?: boolean
  allowFallback?: boolean
  fallbackProviders?: AiProviderKey[]
}

export type AiSearchResultItem = {
  id: string
  title: string
  snippet?: string
  url: string
  sourceDomain?: string
  mediaType: AiSearchMediaType
  thumbnailUrl?: string
  previewUrl?: string
  durationSeconds?: number
  fileType?: string
}

export type AiSearchResponse = {
  provider: AiProviderKey
  query: string
  vertical: AiSearchVertical
  performedAt: string
  configured: boolean
  status: AiProviderStatus
  fallbackUsed: boolean
  attemptedProviders: AiProviderKey[]
  results: AiSearchResultItem[]
  note?: string
}

export type AiSearchProviderManifestItem = {
  key: AiProviderKey
  label: string
  status: AiProviderStatus
  configured: boolean
  requiresGateway: boolean
  supportedVerticals: AiSearchVertical[]
}

export type AiConsentScope =
  | "read_access"
  | "memory_write"
  | "tool_execution"
  | "internet_search"

export type AiConsentDecision = "granted" | "revoked"

export type AiConsentActorType = "user" | "system" | "admin"

export type AiConsentAuditEvent = {
  id: string
  userId: string
  scope: AiConsentScope
  decision: AiConsentDecision
  actorType: AiConsentActorType
  actorId?: string
  reason?: string
  createdAt: string
}

export type AiConsentUpdateInput = {
  userId: string
  actorType?: AiConsentActorType
  actorId?: string
  reason?: string
  consent: Partial<AiSessionConsentState>
}

export type AiMemoryKind =
  | "preference"
  | "profile_fact"
  | "task_context"
  | "study_context"
  | "business_context"
  | "saved_instruction"

export type AiMemorySource = "user" | "assistant" | "imported"

export type AiMemoryVisibility = "private"

export type AiMemoryEntry = {
  id: string
  userId: string
  kind: AiMemoryKind
  label: string
  value: string
  source: AiMemorySource
  visibility: AiMemoryVisibility
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type AiMemorySaveInput = {
  userId: string
  kind: AiMemoryKind
  label: string
  value: string
  source?: AiMemorySource
  visibility?: AiMemoryVisibility
  tags?: string[]
}

export type AiMemorySuggestion = {
  id: string
  userId: string
  kind: AiMemoryKind
  label: string
  value: string
  reason: string
  createdAt: string
}

export type AiMemorySummary = {
  totalEntries: number
  byKind: Partial<Record<AiMemoryKind, number>>
  memoryWriteAllowed: boolean
}

export type AiBusinessRecordType = "income" | "expense" | "tax" | "refund" | "transfer"

export type AiBusinessAccountingRecord = {
  amount: number
  currency: string
  type: AiBusinessRecordType
  category?: string
  description?: string
  occurredAt?: string
}

export type AiBusinessCategorySummary = {
  category: string
  currency: string
  kind: AiBusinessRecordType
  amount: number
  count: number
}

export type AiBusinessCurrencyTotals = {
  currency: string
  income: number
  expense: number
  tax: number
  refund: number
  transfer: number
  net: number
}

export type AiBusinessInsight = {
  severity: "low" | "medium" | "high"
  code: string
  title: string
  description: string
}

export type AiBusinessAnalysisRequest = {
  userId: string
  locale?: string
  periodLabel?: string
  monthlyTargetRevenue?: number
  monthlyTargetNet?: number
  records: AiBusinessAccountingRecord[]
}

export type AiBusinessAnalysisResponse = {
  periodLabel?: string
  recordCount: number
  currencies: string[]
  totalsByCurrency: AiBusinessCurrencyTotals[]
  topExpenseCategories: AiBusinessCategorySummary[]
  topIncomeCategories: AiBusinessCategorySummary[]
  expenseRatio: number
  taxRatio: number
  insights: AiBusinessInsight[]
  recommendedActions: string[]
  narrative: string
}

export type AiEducationLearnerLevel =
  | "child"
  | "school"
  | "abiturient"
  | "student"
  | "teacher"

export type AiEducationTaskType =
  | "explain"
  | "study_plan"
  | "quiz"
  | "exam_prep"
  | "homework_help"
  | "lesson_plan"

export type AiEducationTopicInput =
  | string
  | {
      title: string
      difficulty?: 1 | 2 | 3 | 4 | 5
      tags?: string[]
    }

export type AiEducationNormalizedTopic = {
  title: string
  difficulty: number
  tags: string[]
}

export type AiEducationPlanActivityType = "reading" | "practice" | "revision" | "quiz" | "project"

export type AiEducationPlanDay = {
  dayIndex: number
  title: string
  focusTopics: string[]
  estimatedMinutes: number
  activities: string[]
  checkpoint: string
}

export type AiEducationPracticeTask = {
  id: string
  type: AiEducationPlanActivityType
  title: string
  description: string
  estimatedMinutes: number
}

export type AiEducationQuizQuestion = {
  id: string
  question: string
  options: string[]
  answer: string
  explanation: string
}

export type AiEducationInsight = {
  severity: "low" | "medium" | "high"
  code: string
  title: string
  description: string
}

export type AiEducationRequest = {
  userId: string
  locale?: string
  learnerLevel: AiEducationLearnerLevel
  taskType: AiEducationTaskType
  subject: string
  goal?: string
  timeframeDays?: number
  weeklyHours?: number
  examDate?: string
  preferredLanguage?: string
  weakTopics?: string[]
  topics: AiEducationTopicInput[]
}

export type AiEducationResponse = {
  subject: string
  learnerLevel: AiEducationLearnerLevel
  taskType: AiEducationTaskType
  preferredLanguage?: string
  topicCount: number
  normalizedTopics: AiEducationNormalizedTopic[]
  planDays: AiEducationPlanDay[]
  practiceTasks: AiEducationPracticeTask[]
  quizQuestions: AiEducationQuizQuestion[]
  insights: AiEducationInsight[]
  recommendedActions: string[]
  narrative: string
}

export type AiTranslationContentType = "text" | "audio_message" | "video_message" | "call"

export type AiTranslationSegment = {
  id: string
  speakerId?: string
  speakerLabel?: string
  startedAtMs?: number
  endedAtMs?: number
  sourceText: string
  translatedText: string
}

export type AiTranslationRequest = {
  userId: string
  contentType: AiTranslationContentType
  targetLanguage: string
  sourceLanguage?: string
  locale?: string
  preferredProvider?: AiProviderKey
  text?: string
  transcript?: string
  mediaUrl?: string
  callSessionId?: string
  speakerHints?: string[]
  preserveFormatting?: boolean
  allowFallback?: boolean
  fallbackProviders?: AiProviderKey[]
}

export type AiTranslationResponse = {
  provider: AiProviderKey
  contentType: AiTranslationContentType
  sourceLanguage: string
  targetLanguage: string
  performedAt: string
  configured: boolean
  status: AiProviderStatus
  fallbackUsed: boolean
  attemptedProviders: AiProviderKey[]
  translatedText?: string
  translatedTranscript?: string
  segments: AiTranslationSegment[]
  note?: string
}

export type AiTranslationProviderManifestItem = {
  key: AiProviderKey
  label: string
  status: AiProviderStatus
  configured: boolean
  requiresGateway: boolean
  supportedContentTypes: AiTranslationContentType[]
}


export type AiPremiumCatalogPlan = {
  key: AiPremiumPlanKey
  label: string
  description: string
  monthlyCoinPrice: number
  includedFeatures: AiPremiumFeature[]
  configurable: boolean
}

export type AiPremiumCatalogFeature = {
  key: AiPremiumFeature
  label: string
  description: string
  coinPrice: number
  configurable: boolean
}

export type AiPremiumCatalog = {
  plans: AiPremiumCatalogPlan[]
  features: AiPremiumCatalogFeature[]
  defaultPlanKey: AiPremiumPlanKey
  currency: "COIN"
}

export type AiUserPremiumAccess = {
  userId: string
  premiumEnabled: boolean
  planKey: AiPremiumPlanKey
  activeFeatures: AiPremiumFeature[]
  coinBalance?: number
  grantedAt?: string
  updatedAt: string
}

export type AiPremiumFeatureAccess = {
  userId: string
  feature: AiPremiumFeature
  allowed: boolean
  premiumEnabled: boolean
  planKey: AiPremiumPlanKey
  activeFeatures: AiPremiumFeature[]
  requiredCoinPrice?: number
  reason: string
}

export type AiCoinPurchaseTargetType = "plan" | "feature"

export type AiCoinPurchasePreviewInput = {
  userId: string
  targetType: AiCoinPurchaseTargetType
  targetKey: string
  coinBalance?: number
}

export type AiCoinPurchasePreview = {
  userId: string
  targetType: AiCoinPurchaseTargetType
  targetKey: string
  coinBalance: number
  requiredCoinAmount: number
  sufficientBalance: boolean
  targetLabel: string
  targetDescription: string
  activatesPlanKey?: AiPremiumPlanKey
  activatesFeatures: AiPremiumFeature[]
  note: string
}

export type AiPremiumGrantSource = "payment_confirmed" | "admin" | "promo"

export type AiPremiumGrantInput = {
  userId: string
  source: AiPremiumGrantSource
  targetType: AiCoinPurchaseTargetType
  targetKey: string
  paymentReference?: string
  coinBalance?: number
}


export type AiLocaleBindingSource = "default" | "user" | "session"

export type AiLocaleBindingState = {
  userId: string
  locale: string
  source: AiLocaleBindingSource
  supportedLocales: string[]
  updatedAt: string
}

export type AiLocaleUpdateInput = {
  userId: string
  locale: string
  source?: AiLocaleBindingSource
}

export type AiNotificationKind =
  | "task_ready"
  | "search_completed"
  | "translation_ready"
  | "memory_suggestion"
  | "business_summary_ready"
  | "education_plan_ready"
  | "premium_unlocked"



export type AiHistoryKind = "search" | "translation" | "business" | "education" | "chat"

export type AiHistoryEntry = {
  id: string
  userId: string
  title: string
  kind: AiHistoryKind
  createdAt: string
  metadata?: Record<string, unknown>
}

export type AiTaskStatus = "draft" | "awaiting_confirmation" | "completed" | "cancelled"

export type AiTaskEntry = {
  id: string
  userId: string
  title: string
  status: AiTaskStatus
  mode: AiAssistantMode
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown>
}

export type AiTaskCreateInput = {
  userId: string
  title: string
  mode?: AiAssistantMode
  requiresConfirmation?: boolean
  metadata?: Record<string, unknown>
}

export type AiTaskUpdateInput = {
  userId: string
  taskId: string
  status: AiTaskStatus
}

export type AiLocalizedNotificationManifestItem = {
  kind: AiNotificationKind
  titleKey: string
  messageKey: string
}

export type AiNotificationPublishInput = {
  userId: string
  kind: AiNotificationKind
  params?: Record<string, unknown>
  actorUserId?: string
}
