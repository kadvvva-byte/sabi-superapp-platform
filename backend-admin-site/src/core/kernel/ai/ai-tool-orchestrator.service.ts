import type {
  AiAssistantActionCandidate,
  AiAssistantExecutionStatus,
  AiAssistantResolvedIntent,
  AiAssistantSafetyDecision,
} from "./ai.types"

export type AiToolOrchestratorDecision = {
  status: AiAssistantExecutionStatus
  selectedAction?: AiAssistantActionCandidate
  reason: string
}

export class AiToolOrchestratorService {
  decide(input: {
    intent: AiAssistantResolvedIntent
    actions: AiAssistantActionCandidate[]
    safety: AiAssistantSafetyDecision
    confirmActionId?: string
  }): AiToolOrchestratorDecision {
    if (!input.safety.allowed) {
      return {
        status: "blocked",
        reason: input.safety.blockedReason ?? "Action blocked by AI safety policy.",
      }
    }

    const selectedAction = input.confirmActionId
      ? input.actions.find((action) => action.id === input.confirmActionId)
      : input.actions[0]

    if (input.safety.requiresConfirmation && !input.confirmActionId) {
      return {
        status: "awaiting_confirmation",
        selectedAction,
        reason: input.safety.confirmationReason ?? "Action requires explicit confirmation.",
      }
    }

    return {
      status: selectedAction?.type === "none" ? "planned" : "completed",
      selectedAction,
      reason: `AI tool orchestrator selected ${selectedAction?.type ?? "none"} for ${input.intent.domain}.`,
    }
  }
}
