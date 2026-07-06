import type {
  AiAssistantActionCandidate,
  AiAssistantContextSnapshot,
  AiAssistantExecutionStatus,
  AiAssistantManifest,
  AiAssistantMode,
  AiAssistantOrchestrationResult,
  AiAssistantRequestSource,
  AiAssistantResolvedIntent,
  AiAssistantSafetyDecision,
  AiProviderKey,
  AiAssistantAttachment,
  AiAssistantClientCapability,
  AiAssistantProviderHint,
} from "../../../core/kernel/ai/ai.types"

export type AiAssistantManifestContract = AiAssistantManifest

export type AiAssistantRunRequestContract = {
  userId: string
  prompt: string
  locale?: string
  source?: AiAssistantRequestSource
  preferredMode?: AiAssistantMode
  preferredProvider?: AiProviderKey
  providerHint?: AiAssistantProviderHint
  webSearchEnabled?: boolean
  voiceControlEnabled?: boolean
  attachments?: AiAssistantAttachment[]
  clientCapabilities?: AiAssistantClientCapability[]
  autoExecute?: boolean
  confirmActionId?: string
  metadata?: Record<string, unknown>
}

export type AiAssistantRunResponseContract = AiAssistantOrchestrationResult

export type AiAssistantContextContract = AiAssistantContextSnapshot

export type AiAssistantWorkspaceSummaryContract = {
  manifest: AiAssistantManifestContract
  status: "ready"
  lastIntent?: AiAssistantResolvedIntent
  lastActions: AiAssistantActionCandidate[]
  lastSafety?: AiAssistantSafetyDecision
  lastExecutionStatus?: AiAssistantExecutionStatus
}
