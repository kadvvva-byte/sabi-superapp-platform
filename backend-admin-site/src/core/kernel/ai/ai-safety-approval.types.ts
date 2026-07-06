import type { AiAppActionKey, AiAppActionModule } from "./ai-app-actions.types"
import type { AiAssistantRequestSource } from "./ai.types"

export type AiSafetyApprovalActionCategory =
  | "read_only"
  | "navigation"
  | "message_send"
  | "money_movement"
  | "coin_movement"
  | "account_security"
  | "account_delete"
  | "settings_change"
  | "task_create"
  | "unknown"

export type AiSafetyApprovalRiskLevel = "none" | "low" | "medium" | "high"

export type AiSafetyApprovalRequest = {
  userId: string
  prompt?: string
  actionKey?: AiAppActionKey
  module?: AiAppActionModule
  category?: AiSafetyApprovalActionCategory
  source?: AiAssistantRequestSource | "workspace"
  requestedAutoExecute?: boolean
  amount?: number
  currency?: string
  metadata?: Record<string, unknown>
}

export type AiSafetyApprovalDecision = {
  userId: string
  policyVersion: "AI-29.2"
  category: AiSafetyApprovalActionCategory
  riskLevel: AiSafetyApprovalRiskLevel
  allowed: boolean
  autoExecuteAllowed: boolean
  requiresConfirmation: boolean
  requiresTargetModuleConfirmation: boolean
  blockedReason?: string
  confirmationReason?: string
  warnings: string[]
}
