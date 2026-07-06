import {
  STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
  type StreamGiftLedgerAdminProductionGate199G,
  type StreamGiftLedgerAdminProductionGateKey199G,
  type StreamGiftLedgerAdminProductionGatesBlocked199G,
  type StreamGiftLedgerAdminProductionGatesInput199G,
  type StreamGiftLedgerAdminProductionGatesNextRequest199G,
  type StreamGiftLedgerAdminProductionGatesReadiness199G,
  type StreamGiftLedgerAdminProductionGatesResult199G,
  type StreamGiftLedgerAdminProductionGatesSafety199G,
} from "./streamGiftLedgerAdminProductionGates199G.types";

export const STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_APPROVAL =
  "STREAM_GIFT_LEDGER_199G_ADMIN_PRODUCTION_GATES_APPROVED" as const;

export const STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY: StreamGiftLedgerAdminProductionGatesSafety199G = Object.freeze({
  dbReadAllowedNow: false,
  dbWriteAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretReadAllowedNow: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutExecutionAllowedNow: false,
  realtimeEmitAllowedNow: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

const GATE_DEFINITIONS_199G: readonly StreamGiftLedgerAdminProductionGate199G[] = Object.freeze([
  {
    key: "gift_catalog_enabled",
    label: "Gift catalog visibility / quote surface",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: false,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_CATALOG_RUNTIME_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "gift_quote_enabled",
    label: "Gift quote endpoint",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: false,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_QUOTE_RUNTIME_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "payment_authorization_enabled",
    label: "Real payment authorization boundary",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "provider_live_call_enabled",
    label: "Server-side provider live payment call",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_PROVIDER_LIVE_CALL_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "authorized_ledger_commit_enabled",
    label: "Provider-authorized gift ledger commit",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_DB_WRITE_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "realtime_delivery_emit_enabled",
    label: "Realtime Stream/Messenger gift delivery emit",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "mobile_delivery_receipt_persistence_enabled",
    label: "Mobile delivery receipt persistence",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENCE_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "settlement_available_release_enabled",
    label: "Creator available balance release after settlement gates",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_AVAILABLE_RELEASE_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "creator_payout_readiness_enabled",
    label: "Creator payout readiness review",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "provider_payout_execution_enabled",
    label: "Provider payout execution",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_EXECUTION_ENABLED",
    blocksFakeSuccess: true,
  },
  {
    key: "wallet_mutation_enabled",
    label: "Wallet/accounting mutation bridge",
    state: "disabled",
    defaultState: "disabled",
    requiresSeparateOwnerApproval: true,
    requiresRuntimeEnvFlag: true,
    runtimeEnvFlagName: "STREAM_GIFT_LEDGER_WALLET_MUTATION_ENABLED",
    blocksFakeSuccess: true,
  },
]);

const GATE_KEYS_199G = new Set(GATE_DEFINITIONS_199G.map((gate) => gate.key));
const HIGH_RISK_GATES_199G = new Set<StreamGiftLedgerAdminProductionGateKey199G>([
  "payment_authorization_enabled",
  "provider_live_call_enabled",
  "authorized_ledger_commit_enabled",
  "realtime_delivery_emit_enabled",
  "mobile_delivery_receipt_persistence_enabled",
  "settlement_available_release_enabled",
  "creator_payout_readiness_enabled",
  "provider_payout_execution_enabled",
  "wallet_mutation_enabled",
]);

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cleanArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => clean(item)).filter((item): item is string => Boolean(item));
}

function blocked199G(
  code: StreamGiftLedgerAdminProductionGatesBlocked199G["code"],
  blockedReason: string,
): StreamGiftLedgerAdminProductionGatesBlocked199G {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    status: "admin_production_gates_blocked_without_runtime_enablement",
    code,
    blockedReason,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY,
  };
}

function assertGateKey199G(key: string): key is StreamGiftLedgerAdminProductionGateKey199G {
  return GATE_KEYS_199G.has(key as StreamGiftLedgerAdminProductionGateKey199G);
}

export function normalizeStreamGiftLedgerAdminProductionGatesInput199G(
  raw: Record<string, unknown>,
): StreamGiftLedgerAdminProductionGatesInput199G {
  return {
    adminApproval: clean(raw.adminApproval),
    controlMode: clean(raw.controlMode) === "production_gate_request_review_only"
      ? "production_gate_request_review_only"
      : "disabled",
    requestedGateKeys: cleanArray(raw.requestedGateKeys),
    operatorNote: clean(raw.operatorNote),
  };
}

export function getStreamGiftLedgerAdminProductionGatesReadiness199G(): StreamGiftLedgerAdminProductionGatesReadiness199G {
  assertStreamGiftLedgerAdminProductionGates199GRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    status: "ready_for_admin_controls_and_production_gates_review",
    requiredPreviousStages: [
      "199A_exact_owner_approval_clean",
      "199B_provider_config_readiness_clean",
      "199C_payment_authorization_adapter_boundary_clean",
      "199D_hash_only_payment_authorization_clean",
      "199E_provider_authorized_ledger_commit_clean",
      "199F_post_commit_runtime_smoke_clean",
    ],
    defaultRuntimeState: "all_high_risk_gates_disabled",
    nextStage: "199H_final_production_readiness_and_handoff",
    safety: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY,
  };
}

export function getStreamGiftLedgerAdminProductionGatesContract199G(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    contract: "stream.gift.admin.production_gates.review_only.v1",
    approvalField: "adminApproval",
    approvalValue: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_APPROVAL,
    controlMode: "production_gate_request_review_only",
    allHighRiskGatesDefaultDisabled: true,
    gateDefinitions: GATE_DEFINITIONS_199G,
    separates: [
      "catalog/quote visibility",
      "payment authorization",
      "provider live payment call",
      "ledger commit",
      "realtime delivery",
      "delivery receipt persistence",
      "available balance release",
      "creator payout readiness",
      "provider payout execution",
      "Wallet mutation bridge",
    ],
    noEnvValueRead: true,
    noProviderCall: true,
    noDbWrite: true,
    noRuntimeEnablement: true,
    noFakeSuccess: true,
    safety: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY,
  };
}

export function reviewStreamGiftLedgerAdminProductionGates199G(
  input: StreamGiftLedgerAdminProductionGatesInput199G,
): StreamGiftLedgerAdminProductionGatesResult199G {
  assertStreamGiftLedgerAdminProductionGates199GRemainsSafe();

  if (input.adminApproval !== STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_APPROVAL) {
    return blocked199G("admin_approval_required", "adminApproval must exactly match STREAM_GIFT_LEDGER_199G_ADMIN_PRODUCTION_GATES_APPROVED");
  }

  if (input.controlMode !== "production_gate_request_review_only") {
    return blocked199G("control_mode_disabled", "controlMode must be production_gate_request_review_only");
  }

  const unknownGate = input.requestedGateKeys.find((gateKey) => !assertGateKey199G(gateKey));
  if (unknownGate) {
    return blocked199G("unknown_gate_requested", `Unknown production gate requested: ${unknownGate}`);
  }

  const acceptedGateKeys = Array.from(new Set(input.requestedGateKeys)) as StreamGiftLedgerAdminProductionGateKey199G[];
  const highRiskRequested = acceptedGateKeys.filter((gateKey) => HIGH_RISK_GATES_199G.has(gateKey));
  if (acceptedGateKeys.includes("provider_payout_execution_enabled") && !acceptedGateKeys.includes("creator_payout_readiness_enabled")) {
    return blocked199G("unsafe_gate_combination_requested", "provider payout execution gate cannot be requested without creator payout readiness gate");
  }
  if (acceptedGateKeys.includes("wallet_mutation_enabled") && !acceptedGateKeys.includes("authorized_ledger_commit_enabled")) {
    return blocked199G("unsafe_gate_combination_requested", "wallet mutation gate cannot be requested without authorized ledger commit gate");
  }

  const gates = GATE_DEFINITIONS_199G.map((gate) => ({
    ...gate,
    state: acceptedGateKeys.includes(gate.key)
      ? (highRiskRequested.includes(gate.key) ? "approved_for_separate_binding_only" : "requested")
      : "disabled",
  })) as readonly StreamGiftLedgerAdminProductionGate199G[];

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    status: "admin_production_gates_request_record_ready_no_runtime_enablement",
    acceptedGateKeys,
    gates,
    productionEnablementExecuted: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "199H_final_production_readiness_and_handoff",
    safety: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY,
  };
}

export function getStreamGiftLedgerAdminProductionGatesRunbook199G(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "POST /api/admin/stream/gifts/ledger/199g/control-review with adminApproval=STREAM_GIFT_LEDGER_199G_ADMIN_PRODUCTION_GATES_APPROVED and controlMode=production_gate_request_review_only",
      "node .\\tools\\stream-gifts-ledger-199g-admin-production-gates-check.js --i-approve-199g-admin-production-gates-check",
    ],
    note: "199G records/reviews Admin production gate requests only. It never reads env values and never enables provider/payment/payout/realtime/Wallet runtime.",
  };
}

export function createStreamGiftLedgerFinalProductionReadinessRequest199G(): StreamGiftLedgerAdminProductionGatesNextRequest199G {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION,
    nextStage: "199H_final_production_readiness_and_handoff",
    allowedNext: [
      "final production readiness matrix",
      "operator runbook/handoff",
      "separate owner approval template for real provider live binding",
      "separate owner approval template for payout execution",
    ],
    stillForbidden: [
      "automatic provider binding",
      "automatic provider live call",
      "automatic payout execution",
      "automatic Wallet mutation",
      "fake gift/payment/payout success",
      "raw secret read or print",
    ],
  };
}

export function assertStreamGiftLedgerAdminProductionGates199GRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_SAFETY;
  if (
    safety.dbReadAllowedNow !== false ||
    safety.dbWriteAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.rawSecretReadAllowedNow !== false ||
    safety.providerBindingAllowedNow !== false ||
    safety.providerLiveCallAllowedNow !== false ||
    safety.providerPayoutCallAllowedNow !== false ||
    safety.walletMutationAllowedNow !== false ||
    safety.paymentCaptureAllowedNow !== false ||
    safety.payoutExecutionAllowedNow !== false ||
    safety.realtimeEmitAllowedNow !== false ||
    safety.fakePaymentSuccessAllowed !== false ||
    safety.fakeGiftSendSuccessAllowed !== false ||
    safety.fakePayoutSuccessAllowed !== false ||
    safety.fakeAvailableBalanceAllowed !== false
  ) {
    throw new Error("stream_gift_ledger_199g_unsafe_runtime_flag");
  }
}
