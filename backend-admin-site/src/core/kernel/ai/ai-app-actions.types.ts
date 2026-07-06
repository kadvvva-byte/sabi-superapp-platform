import type { AiSafetyApprovalDecision } from "./ai-safety-approval.types"
import type { AiAssistantMode, AiProviderKey } from "./ai.types"

export type AiAppActionModule =
  | "ai"
  | "messenger"
  | "wallet"
  | "coin_wallet"
  | "profile"
  | "qr"
  | "premium"
  | "settings"
  | "translation"
  | "tasks"
  | "contacts"
  | "calls"
  | "auth"
  | "admin"
  | "unknown"

export type AiAppActionKey =
  | "open_ai_workspace"
  | "open_ai_settings"
  | "open_ai_history_tasks"
  | "open_ai_voice"
  | "open_messenger"
  | "open_chat"
  | "open_calls"
  | "open_profile"
  | "open_wallet"
  | "open_coin_wallet"
  | "open_wallet_topup"
  | "open_qr_scanner"
  | "open_qr_create"
  | "open_premium"
  | "start_text_translation"
  | "start_voice_translation"
  | "create_ai_task"
  | "prepare_send_message"
  | "prepare_send_money"
  | "prepare_coin_transfer"
  | "prepare_delete_account"
  | "prepare_logout"
  | "open_admin_ai_audit"

export type AiAppActionRiskLevel = "none" | "low" | "medium" | "high"

export type AiAppActionExecutionPolicy =
  | "client_dispatch"
  | "server_prepare"
  | "confirm_then_client_dispatch"
  | "blocked"

export type AiAppActionStatus =
  | "resolved"
  | "prepared"
  | "awaiting_confirmation"
  | "confirmed"
  | "cancelled"
  | "blocked"
  | "dispatched"

export type AiAppActionClientCommandType =
  | "navigate"
  | "open_modal"
  | "open_sheet"
  | "start_translation"
  | "create_task"
  | "show_confirmation"
  | "none"

export type AiAppActionClientCommand = {
  type: AiAppActionClientCommandType
  route?: string
  module: AiAppActionModule
  title: string
  params?: Record<string, unknown>
  presentation?: "push" | "modal" | "sheet" | "replace" | "overlay"
  requiresClientDispatch: boolean
}

export type AiAppActionDefinition = {
  key: AiAppActionKey
  module: AiAppActionModule
  title: string
  description: string
  route?: string
  clientCommandType: AiAppActionClientCommandType
  mode: AiAssistantMode
  provider?: AiProviderKey
  riskLevel: AiAppActionRiskLevel
  executionPolicy: AiAppActionExecutionPolicy
  requiresConfirmation: boolean
  requiresPremium: boolean
  requiresToolConsent: boolean
  requiresMoneyLock: boolean
  aliases: string[]
  allowedFromAssistant: boolean
  implementedByClient: boolean
}

export type AiAppActionManifest = {
  area: "app_actions"
  status: "ready"
  version: "AI-20"
  dispatchMode: "server_prepares_client_dispatch"
  dangerousActionPolicy: "confirm_required"
  supportedModules: AiAppActionModule[]
  actionCount: number
  confirmationRequiredKeys: AiAppActionKey[]
  clientDispatchRequired: true
}

export type AiAppActionResolveInput = {
  userId: string
  prompt?: string
  actionKey?: AiAppActionKey
  module?: AiAppActionModule
  locale?: string
  mode?: AiAssistantMode
  params?: Record<string, unknown>
  preferredProvider?: AiProviderKey
}

export type AiAppActionResolveResult = {
  userId: string
  prompt?: string
  resolvedAt: string
  candidates: AiAppActionCandidate[]
  bestCandidate?: AiAppActionCandidate
}

export type AiAppActionCandidate = {
  definition: AiAppActionDefinition
  score: number
  reason: string
  extractedParams: Record<string, unknown>
}

export type AiPrepareAppActionInput = {
  userId: string
  actionKey: AiAppActionKey
  locale?: string
  params?: Record<string, unknown>
  source?: "assistant" | "workspace" | "voice" | "quick_action" | "system"
  autoDispatch?: boolean
  confirmationText?: string
  metadata?: Record<string, unknown>
}

export type AiPreparedAppAction = {
  id: string
  userId: string
  definition: AiAppActionDefinition
  status: AiAppActionStatus
  createdAt: string
  updatedAt: string
  expiresAt: string
  source: NonNullable<AiPrepareAppActionInput["source"]>
  params: Record<string, unknown>
  metadata?: Record<string, unknown>
  clientCommand: AiAppActionClientCommand
  confirmation?: {
    required: boolean
    reason: string
    phrase?: string
  }
  safety: {
    riskLevel: AiAppActionRiskLevel
    allowed: boolean
    blockedReason?: string
    approval?: AiSafetyApprovalDecision
  }
}

export type AiConfirmAppActionInput = {
  userId: string
  actionId: string
  confirmationText?: string
  metadata?: Record<string, unknown>
}

export type AiCancelAppActionInput = {
  userId: string
  actionId: string
  reason?: string
}

export type AiAppActionExecutionResult = {
  action: AiPreparedAppAction
  dispatched: boolean
  clientCommand: AiAppActionClientCommand
  messageKey: string
  note: string
}

export type AiAppActionWorkspaceSummary = {
  manifest: AiAppActionManifest
  registryPreview: Array<{
    key: AiAppActionKey
    module: AiAppActionModule
    title: string
    route?: string
    riskLevel: AiAppActionRiskLevel
    requiresConfirmation: boolean
  }>
  pendingCount: number
  highRiskPendingCount: number
}
