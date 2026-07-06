export const STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199G" as const;

export type StreamGiftLedgerAdminProductionGateKey199G =
  | "gift_catalog_enabled"
  | "gift_quote_enabled"
  | "payment_authorization_enabled"
  | "provider_live_call_enabled"
  | "authorized_ledger_commit_enabled"
  | "realtime_delivery_emit_enabled"
  | "mobile_delivery_receipt_persistence_enabled"
  | "settlement_available_release_enabled"
  | "creator_payout_readiness_enabled"
  | "provider_payout_execution_enabled"
  | "wallet_mutation_enabled";

export type StreamGiftLedgerAdminProductionGateState199G = "disabled" | "requested" | "approved_for_separate_binding_only";

export type StreamGiftLedgerAdminProductionGate199G = Readonly<{
  key: StreamGiftLedgerAdminProductionGateKey199G;
  label: string;
  state: StreamGiftLedgerAdminProductionGateState199G;
  defaultState: "disabled";
  requiresSeparateOwnerApproval: boolean;
  requiresRuntimeEnvFlag: boolean;
  runtimeEnvFlagName?: string;
  blocksFakeSuccess: boolean;
}>;

export type StreamGiftLedgerAdminProductionGatesSafety199G = Readonly<{
  dbReadAllowedNow: false;
  dbWriteAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretReadAllowedNow: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutExecutionAllowedNow: false;
  realtimeEmitAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerAdminProductionGatesInput199G = Readonly<{
  adminApproval?: string;
  controlMode?: "production_gate_request_review_only" | "disabled";
  requestedGateKeys: readonly string[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerAdminProductionGatesBlockedCode199G =
  | "admin_approval_required"
  | "control_mode_disabled"
  | "unknown_gate_requested"
  | "unsafe_gate_combination_requested"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerAdminProductionGatesBlocked199G = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION;
  status: "admin_production_gates_blocked_without_runtime_enablement";
  code: StreamGiftLedgerAdminProductionGatesBlockedCode199G;
  blockedReason: string;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerAdminProductionGatesSafety199G;
}>;

export type StreamGiftLedgerAdminProductionGatesAccepted199G = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION;
  status: "admin_production_gates_request_record_ready_no_runtime_enablement";
  acceptedGateKeys: readonly StreamGiftLedgerAdminProductionGateKey199G[];
  gates: readonly StreamGiftLedgerAdminProductionGate199G[];
  productionEnablementExecuted: false;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "199H_final_production_readiness_and_handoff";
  safety: StreamGiftLedgerAdminProductionGatesSafety199G;
}>;

export type StreamGiftLedgerAdminProductionGatesResult199G =
  | StreamGiftLedgerAdminProductionGatesAccepted199G
  | StreamGiftLedgerAdminProductionGatesBlocked199G;

export type StreamGiftLedgerAdminProductionGatesReadiness199G = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION;
  status: "ready_for_admin_controls_and_production_gates_review";
  requiredPreviousStages: readonly [
    "199A_exact_owner_approval_clean",
    "199B_provider_config_readiness_clean",
    "199C_payment_authorization_adapter_boundary_clean",
    "199D_hash_only_payment_authorization_clean",
    "199E_provider_authorized_ledger_commit_clean",
    "199F_post_commit_runtime_smoke_clean",
  ];
  defaultRuntimeState: "all_high_risk_gates_disabled";
  nextStage: "199H_final_production_readiness_and_handoff";
  safety: StreamGiftLedgerAdminProductionGatesSafety199G;
}>;

export type StreamGiftLedgerAdminProductionGatesNextRequest199G = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION;
  nextStage: "199H_final_production_readiness_and_handoff";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
