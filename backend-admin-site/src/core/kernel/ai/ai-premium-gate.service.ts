import type { AiPremiumFeature } from "./ai.types"

export type AiTaskWorkspaceFunctionKey =
  | "web_search"
  | "image_search"
  | "video_search"
  | "music_search"
  | "study_assistant"
  | "business_assistant"
  | "translation_text"
  | "translation_audio"
  | "translation_video"
  | "translation_call"

export type AiBillingPlan = {
  key:
    | "ai_workspace_access"
    | "ai_business_assistant"
    | "ai_deep_search"
    | "ai_media_search"
    | "ai_student_assistant"
    | "ai_call_translation"
  title: string
  coinAmount: number
  recurring: boolean
  description: string
}

export type AiPremiumEntitlementState = {
  premiumEnabled?: boolean
  activeFeatures?: Array<AiPremiumFeature | string>
}

const FUNCTION_TO_PREMIUM_FEATURE: Partial<Record<AiTaskWorkspaceFunctionKey, AiPremiumFeature>> = {
  web_search: "ai_search_external",
  image_search: "ai_search_external",
  video_search: "ai_search_external",
  music_search: "ai_search_external",
  study_assistant: "ai_education_assistant",
  business_assistant: "ai_business_assistant",
  translation_text: "ai_workspace",
  translation_audio: "ai_translation_media",
  translation_video: "ai_translation_media",
  translation_call: "ai_translation_realtime",
}

const BILLING_CATALOG: readonly AiBillingPlan[] = [
  {
    key: "ai_workspace_access",
    title: "AI Workspace",
    coinAmount: 25,
    recurring: true,
    description: "Access to the dedicated Sabi AI workspace, actions, and advanced settings.",
  },
  {
    key: "ai_business_assistant",
    title: "Business Assistant",
    coinAmount: 60,
    recurring: true,
    description: "Premium business assistant and accounting-style analytics.",
  },
  {
    key: "ai_deep_search",
    title: "Deep Search Pack",
    coinAmount: 5,
    recurring: false,
    description: "External provider search through configured Google/Yandex gateways.",
  },
  {
    key: "ai_media_search",
    title: "Media Search Pack",
    coinAmount: 5,
    recurring: false,
    description: "Image, video, music, and file search provider access.",
  },
  {
    key: "ai_student_assistant",
    title: "Student Assistant",
    coinAmount: 20,
    recurring: true,
    description: "Education assistant, study planning, quizzes, and topic explanations.",
  },
  {
    key: "ai_call_translation",
    title: "Call Translation",
    coinAmount: 10,
    recurring: false,
    description: "Premium realtime call translation access.",
  },
]

export class AiPremiumGateService {
  getCatalog() {
    return BILLING_CATALOG
  }

  getRequiredFeature(functionKey: AiTaskWorkspaceFunctionKey) {
    return FUNCTION_TO_PREMIUM_FEATURE[functionKey]
  }

  isFunctionAvailable(entitlement: AiPremiumEntitlementState, functionKey: AiTaskWorkspaceFunctionKey) {
    const feature = this.getRequiredFeature(functionKey)
    if (!feature) return { allowed: true, requiredFeature: undefined }

    return {
      allowed: Boolean(entitlement.premiumEnabled) || Boolean(entitlement.activeFeatures?.includes(feature)),
      requiredFeature: feature,
    }
  }

  previewWorkspaceCharge(featureKey: AiBillingPlan["key"]) {
    const plan = BILLING_CATALOG.find((item) => item.key === featureKey)
    if (!plan) {
      throw new Error(`AI billing plan not found: ${featureKey}`)
    }

    return {
      featureKey: plan.key,
      coinAmount: plan.coinAmount,
      requiresApproval: true,
      recurring: plan.recurring,
      title: plan.title,
    }
  }
}
