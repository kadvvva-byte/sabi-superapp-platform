import type {
  AiAppActionDefinition,
  AiAppActionExecutionResult,
  AiAppActionManifest,
  AiAppActionModule,
  AiAppActionResolveInput,
  AiAppActionResolveResult,
  AiAppActionWorkspaceSummary,
  AiCancelAppActionInput,
  AiConfirmAppActionInput,
  AiPrepareAppActionInput,
  AiPreparedAppAction,
} from "../../../core/kernel/ai/ai-app-actions.types"

export type AiAppActionManifestContract = AiAppActionManifest
export type AiAppActionDefinitionContract = AiAppActionDefinition
export type AiAppActionModuleContract = AiAppActionModule
export type AiAppActionResolveRequestContract = AiAppActionResolveInput
export type AiAppActionResolveResponseContract = AiAppActionResolveResult
export type AiAppActionPrepareRequestContract = AiPrepareAppActionInput
export type AiAppActionPrepareResponseContract = AiPreparedAppAction
export type AiAppActionConfirmRequestContract = AiConfirmAppActionInput
export type AiAppActionConfirmResponseContract = AiAppActionExecutionResult
export type AiAppActionCancelRequestContract = AiCancelAppActionInput
export type AiAppActionCancelResponseContract = AiPreparedAppAction
export type AiAppActionPendingResponseContract = AiPreparedAppAction[]
export type AiAppActionWorkspaceSummaryContract = AiAppActionWorkspaceSummary
