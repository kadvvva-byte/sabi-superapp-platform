import {
  STREAM_FOUNDATION_141X_RUNTIME_GATE_EVALUATOR_VERSION,
  type StreamFoundation141XGateId,
  type StreamFoundation141XGateInput,
  type StreamFoundation141XLiveWriteEvaluationDecision,
  type StreamFoundation141XLiveWriteEvaluationInput,
} from "./streamFoundationRuntimeGateEvaluatorContracts";

const REQUIRED_GATE_IDS: readonly StreamFoundation141XGateId[] = [
  "identity_session_gate",
  "rate_limit_gate",
  "moderation_policy_gate",
  "repository_gate",
  "realtime_provider_readiness_gate",
  "event_audit_gate",
  "owner_runtime_mount_approval_gate",
];

function uniqueGateIds(gates: readonly StreamFoundation141XGateInput[]): readonly StreamFoundation141XGateId[] {
  const seen = new Set<StreamFoundation141XGateId>();
  for (const gate of gates) {
    seen.add(gate.gateId);
  }
  return Array.from(seen);
}

function getMissingGateIds(gates: readonly StreamFoundation141XGateInput[]): readonly StreamFoundation141XGateId[] {
  const seen = new Set(uniqueGateIds(gates));
  return REQUIRED_GATE_IDS.filter((gateId) => !seen.has(gateId));
}

function getBlockingGateIds(gates: readonly StreamFoundation141XGateInput[]): readonly StreamFoundation141XGateId[] {
  const blocking = gates
    .filter((gate) => gate.status !== "passed_later")
    .map((gate) => gate.gateId);
  const missing = getMissingGateIds(gates);
  return Array.from(new Set([...blocking, ...missing]));
}

export function createStreamFoundation141XDefaultGateInputs(): readonly StreamFoundation141XGateInput[] {
  return [
    {
      gateId: "identity_session_gate",
      status: "blocked_now",
      safeMessageKey: "stream.foundation.identitySession.required",
      evidenceKey: "identity_session_contract_planned_not_runtime_bound",
    },
    {
      gateId: "rate_limit_gate",
      status: "blocked_now",
      safeMessageKey: "stream.foundation.rateLimit.required",
      evidenceKey: "rate_limit_contract_planned_not_runtime_bound",
    },
    {
      gateId: "moderation_policy_gate",
      status: "blocked_now",
      safeMessageKey: "stream.foundation.moderation.required",
      evidenceKey: "moderation_policy_contract_planned_not_runtime_bound",
    },
    {
      gateId: "repository_gate",
      status: "not_bound",
      safeMessageKey: "stream.foundation.repository.required",
      evidenceKey: "repository_contract_planned_not_bound",
    },
    {
      gateId: "realtime_provider_readiness_gate",
      status: "not_configured",
      safeMessageKey: "stream.foundation.provider.notConfigured",
      evidenceKey: "provider_readiness_contract_planned_not_configured",
    },
    {
      gateId: "event_audit_gate",
      status: "blocked_now",
      safeMessageKey: "stream.foundation.eventAudit.required",
      evidenceKey: "event_audit_contract_planned_not_runtime_bound",
    },
    {
      gateId: "owner_runtime_mount_approval_gate",
      status: "approval_required",
      safeMessageKey: "stream.foundation.ownerRuntimeApproval.required",
      evidenceKey: "owner_runtime_mount_approval_required",
    },
  ];
}

export function evaluateStreamFoundationLiveWriteRuntimeGatesSourceOnly(
  input: StreamFoundation141XLiveWriteEvaluationInput,
): StreamFoundation141XLiveWriteEvaluationDecision {
  const gateStatuses = input.gates.length > 0 ? input.gates : createStreamFoundation141XDefaultGateInputs();
  const missingGateIds = getMissingGateIds(gateStatuses);
  const blockingGateIds = getBlockingGateIds(gateStatuses);

  return {
    version: STREAM_FOUNDATION_141X_RUNTIME_GATE_EVALUATOR_VERSION,
    sourceOnly: true,
    routeId: input.routeId,
    commandId: input.commandId,
    ok: false,
    statusCode: 423,
    blockedCode: "STREAM_RUNTIME_GATE_EVALUATOR_SOURCE_ONLY_BLOCKED",
    safeMessageKey: "stream.foundation.141x.runtimeGateEvaluator.sourceOnlyBlocked",
    runtimeMountAllowedNow: false,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    providerSecretReadAllowedNow: false,
    walletMutationAllowedNow: false,
    paymentAuthorizationAllowedNow: false,
    monthlyPayoutAllowedNow: false,
    moneyMovementAllowedNow: false,
    gatesChecked: gateStatuses.length,
    gateStatuses,
    missingGateIds,
    blockingGateIds,
    nextRequiredStage: "BACKEND-STREAM-FOUNDATION-141Y",
  };
}
