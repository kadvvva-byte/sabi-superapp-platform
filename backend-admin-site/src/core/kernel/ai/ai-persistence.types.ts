import type {
  AiConsentAuditEvent,
  AiLocaleBindingState,
  AiMemoryEntry,
  AiPremiumFeature,
  AiPremiumGrantSource,
  AiPremiumPlanKey,
  AiSessionConsentState,
  AiSessionContext,
  AiTaskEntry,
  AiHistoryEntry,
} from "./ai.types"
import type { AiPersonalizationProfile } from "./ai-personalization.types"
import type { AiSafetyAdminReport } from "./ai-safety-admin.types"

export type AiPersistentPremiumGrant = {
  userId: string
  planKey: AiPremiumPlanKey
  activeFeatures: AiPremiumFeature[]
  source: AiPremiumGrantSource
  paymentReference?: string
  grantedAt: string
  updatedAt: string
  coinBalance?: number
}

export type AiPersistentUserState = {
  version: 1
  userId: string
  savedAt: string
  session: AiSessionContext | null
  consent: AiSessionConsentState | null
  consentAudit: AiConsentAuditEvent[]
  memory: AiMemoryEntry[]
  history: AiHistoryEntry[]
  tasks: AiTaskEntry[]
  localeBinding: AiLocaleBindingState | null
  premiumGrant: AiPersistentPremiumGrant | null
  personalizationProfile: AiPersonalizationProfile | null
  safetyReports: AiSafetyAdminReport[]
}
