import { AiPersistenceService } from "./ai-persistence.service"
import type { AiPersistentPremiumGrant } from "./ai-persistence.types"
import {
  type AiCoinPurchasePreview,
  type AiCoinPurchasePreviewInput,
  type AiPremiumCatalog,
  type AiPremiumCatalogFeature,
  type AiPremiumCatalogPlan,
  type AiPremiumFeature,
  type AiPremiumFeatureAccess,
  type AiPremiumGrantInput,
  type AiPremiumPlanKey,
  type AiUserPremiumAccess,
} from "./ai.types"

function uniqueFeatures(features: AiPremiumFeature[]) {
  return Array.from(new Set(features))
}

function buildCatalog(): AiPremiumCatalog {
  const featureList: AiPremiumCatalogFeature[] = [
    {
      key: "ai_workspace",
      label: "AI Workspace",
      description: "Unlock the dedicated AI tasks workspace and premium task flows.",
      coinPrice: Number(process.env.AI_COIN_PRICE_WORKSPACE ?? 9),
      configurable: true,
    },
    {
      key: "ai_search_external",
      label: "External Search Providers",
      description: "Use Google and Yandex provider routing from the AI program.",
      coinPrice: Number(process.env.AI_COIN_PRICE_SEARCH_EXTERNAL ?? 6),
      configurable: true,
    },
    {
      key: "ai_translation_media",
      label: "Media Translation",
      description: "Translate audio messages, video messages, and uploaded media transcripts.",
      coinPrice: Number(process.env.AI_COIN_PRICE_TRANSLATION_MEDIA ?? 12),
      configurable: true,
    },
    {
      key: "ai_translation_realtime",
      label: "Realtime Call Translation",
      description: "Enable realtime translation support for voice and video calls.",
      coinPrice: Number(process.env.AI_COIN_PRICE_TRANSLATION_REALTIME ?? 15),
      configurable: true,
    },
    {
      key: "ai_business_assistant",
      label: "Business Assistant",
      description: "Unlock accounting analysis, summaries, and business insights.",
      coinPrice: Number(process.env.AI_COIN_PRICE_BUSINESS_ASSISTANT ?? 18),
      configurable: true,
    },
    {
      key: "ai_education_assistant",
      label: "Education Assistant",
      description: "Unlock study plans, quizzes, and education-focused AI flows.",
      coinPrice: Number(process.env.AI_COIN_PRICE_EDUCATION_ASSISTANT ?? 10),
      configurable: true,
    },
    {
      key: "ai_memory_extended",
      label: "Extended AI Memory",
      description: "Expand the number of long-term memory entries available to the AI program.",
      coinPrice: Number(process.env.AI_COIN_PRICE_MEMORY_EXTENDED ?? 5),
      configurable: true,
    },
  ]

  const plans: AiPremiumCatalogPlan[] = [
    {
      key: "free",
      label: "Free",
      description: "Base AI access without premium tools.",
      monthlyCoinPrice: 0,
      includedFeatures: [],
      configurable: false,
    },
    {
      key: "ai_pro",
      label: "AI Pro",
      description: "Workspace, external search, premium media translation, and extended memory.",
      monthlyCoinPrice: Number(process.env.AI_COIN_PRICE_PLAN_PRO ?? 24),
      includedFeatures: ["ai_workspace", "ai_search_external", "ai_translation_media", "ai_memory_extended"],
      configurable: true,
    },
    {
      key: "ai_business",
      label: "AI Business",
      description: "Business-focused AI with workspace, external search, and translation features.",
      monthlyCoinPrice: Number(process.env.AI_COIN_PRICE_PLAN_BUSINESS ?? 39),
      includedFeatures: [
        "ai_workspace",
        "ai_search_external",
        "ai_translation_media",
        "ai_translation_realtime",
        "ai_business_assistant",
        "ai_memory_extended",
      ],
      configurable: true,
    },
    {
      key: "ai_education",
      label: "AI Education",
      description: "Study-focused AI with workspace, external search, and education tools.",
      monthlyCoinPrice: Number(process.env.AI_COIN_PRICE_PLAN_EDUCATION ?? 19),
      includedFeatures: ["ai_workspace", "ai_search_external", "ai_translation_media", "ai_education_assistant", "ai_memory_extended"],
      configurable: true,
    },
  ]

  return {
    plans,
    features: featureList,
    defaultPlanKey: "free",
    currency: "COIN",
  }
}

export class AiPremiumCoinAccessService {
  private readonly catalog = buildCatalog()
  private readonly grants = new Map<string, AiPersistentPremiumGrant>()

  constructor(private readonly persistence?: AiPersistenceService) {}

  private ensureLoaded(userId: string) {
    if (this.grants.has(userId)) {
      return
    }
    const loaded = this.persistence?.getPremiumGrant(userId)
    if (loaded) {
      this.grants.set(userId, loaded)
    }
  }

  getCatalog(): AiPremiumCatalog {
    return this.catalog
  }

  getUserAccess(userId: string, options?: { coinBalance?: number; premiumEnabled?: boolean }): AiUserPremiumAccess {
    this.ensureLoaded(userId)
    const stored = this.grants.get(userId)
    const now = new Date().toISOString()

    if (stored) {
      return {
        userId,
        premiumEnabled: stored.planKey !== "free" || stored.activeFeatures.length > 0 || Boolean(options?.premiumEnabled),
        planKey: stored.planKey,
        activeFeatures: uniqueFeatures(stored.activeFeatures),
        coinBalance: options?.coinBalance ?? stored.coinBalance,
        grantedAt: stored.grantedAt,
        updatedAt: now,
      }
    }

    return {
      userId,
      premiumEnabled: Boolean(options?.premiumEnabled),
      planKey: "free",
      activeFeatures: [],
      coinBalance: options?.coinBalance,
      updatedAt: now,
    }
  }

  resolveFeatureAccess(input: {
    userId: string
    feature: AiPremiumFeature
    coinBalance?: number
    premiumEnabled?: boolean
  }): AiPremiumFeatureAccess {
    const access = this.getUserAccess(input.userId, {
      coinBalance: input.coinBalance,
      premiumEnabled: input.premiumEnabled,
    })
    const allowed = access.activeFeatures.includes(input.feature)
    const price = this.catalog.features.find((item) => item.key === input.feature)?.coinPrice

    return {
      userId: input.userId,
      feature: input.feature,
      allowed,
      premiumEnabled: access.premiumEnabled,
      planKey: access.planKey,
      activeFeatures: access.activeFeatures,
      requiredCoinPrice: allowed ? undefined : price,
      reason: allowed
        ? "Feature is active for the current AI premium access state."
        : "Feature is locked until a COIN-backed AI premium feature or plan is activated.",
    }
  }

  previewPurchase(input: AiCoinPurchasePreviewInput): AiCoinPurchasePreview {
    this.ensureLoaded(input.userId)
    const balance = Number(input.coinBalance ?? this.grants.get(input.userId)?.coinBalance ?? 0)

    if (input.targetType === "plan") {
      const plan = this.catalog.plans.find((item) => item.key === input.targetKey)
      if (!plan) {
        throw new Error(`Unknown AI premium plan: ${input.targetKey}`)
      }

      return {
        userId: input.userId,
        targetType: "plan",
        targetKey: input.targetKey,
        coinBalance: balance,
        requiredCoinAmount: plan.monthlyCoinPrice,
        sufficientBalance: balance >= plan.monthlyCoinPrice,
        targetLabel: plan.label,
        targetDescription: plan.description,
        activatesPlanKey: plan.key,
        activatesFeatures: plan.includedFeatures,
        note:
          plan.monthlyCoinPrice === 0
            ? "This plan does not require COIN."
            : "Preview only. Actual COIN charging must be confirmed by an external payment flow.",
      }
    }

    const feature = this.catalog.features.find((item) => item.key === input.targetKey)
    if (!feature) {
      throw new Error(`Unknown AI premium feature: ${input.targetKey}`)
    }

    return {
      userId: input.userId,
      targetType: "feature",
      targetKey: input.targetKey,
      coinBalance: balance,
      requiredCoinAmount: feature.coinPrice,
      sufficientBalance: balance >= feature.coinPrice,
      targetLabel: feature.label,
      targetDescription: feature.description,
      activatesFeatures: [feature.key],
      note: "Preview only. Actual COIN charging must be confirmed by an external payment flow.",
    }
  }

  grantPremiumAccess(input: AiPremiumGrantInput): AiUserPremiumAccess {
    this.ensureLoaded(input.userId)
    const now = new Date().toISOString()
    const previous = this.grants.get(input.userId)
    let planKey: AiPremiumPlanKey = previous?.planKey ?? "free"
    let features: AiPremiumFeature[] = previous?.activeFeatures ?? []

    if (input.targetType === "plan") {
      const plan = this.catalog.plans.find((item) => item.key === input.targetKey)
      if (!plan) {
        throw new Error(`Unknown AI premium plan: ${input.targetKey}`)
      }
      planKey = plan.key
      features = uniqueFeatures(plan.includedFeatures)
    } else {
      const feature = this.catalog.features.find((item) => item.key === input.targetKey)
      if (!feature) {
        throw new Error(`Unknown AI premium feature: ${input.targetKey}`)
      }
      features = uniqueFeatures([...features, feature.key])
    }

    const stored: AiPersistentPremiumGrant = {
      userId: input.userId,
      planKey,
      activeFeatures: features,
      source: input.source,
      paymentReference: input.paymentReference,
      grantedAt: previous?.grantedAt ?? now,
      updatedAt: now,
      coinBalance: input.coinBalance ?? previous?.coinBalance,
    }

    this.grants.set(input.userId, stored)
    this.persistence?.savePremiumGrant(input.userId, stored)
    return this.getUserAccess(input.userId, {
      coinBalance: stored.coinBalance,
      premiumEnabled: stored.planKey !== "free" || stored.activeFeatures.length > 0,
    })
  }

  revokePremiumAccess(userId: string) {
    this.ensureLoaded(userId)
    this.grants.delete(userId)
    this.persistence?.savePremiumGrant(userId, null)
    return this.getUserAccess(userId)
  }
}
