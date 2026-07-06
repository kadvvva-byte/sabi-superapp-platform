import {
  STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageBlocked200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageBlockedCode200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageResult200O,
  type StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O,
} from "./types";

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_OWNER_APPROVAL =
  "I_APPROVE_200O_EXACT_OWNER_APPROVAL_PACKAGE_ONLY_NO_PROVIDER_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_REQUIRED_KINDS_200O = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O[]);

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY: StreamGiftLedgerLiveActivationOwnerApprovalPackageSafety200O = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  previous200NFinalHandoffPrepared: true,
  exactOwnerApprovalPackageOnly: true,
  liveActivationExecutionApprovedNow: false,
  liveActivationExecutionPerformedNow: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  requiresSeparateExecutionStepAfterThisPackage: true,
  referenceLabelsOnly: true,
});

type StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderScopeItem200O = Readonly<{
  providerNames: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O[];
  configScopes: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O[];
}>;

function providerScopeItem200O(
  providerNames: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O[],
  configScopes: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O[],
): StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderScopeItem200O {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]) as readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O[],
    configScopes: Object.freeze([...configScopes]) as readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O[],
  });
}

const PROVIDER_SCOPE: Readonly<Record<StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O, StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderScopeItem200O>> = Object.freeze({
  accept_payments_provider: providerScopeItem200O(["airwallex", "manual_review", "other"], ["accept_payments", "merchant_rails", "manual_review"]),
  creator_payout_provider: providerScopeItem200O(["airwallex", "bank", "manual_review", "other"], ["creator_payout", "manual_review"]),
  google_billing_diamonds_provider: providerScopeItem200O(["google_billing", "manual_review"], ["diamonds_topup", "manual_review"]),
  airwallex_merchant_rails_provider: providerScopeItem200O(["airwallex", "manual_review"], ["merchant_rails", "accept_payments", "creator_payout", "manual_review"]),
});

function hasUnsafeRawProviderValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/-----BEGIN [A-Z ]+PRIVATE KEY-----/.test(trimmed)) return true;
  if (/sk_live_|pk_live_|rk_live_|AKIA|AIza|ya29\.|eyJ[a-zA-Z0-9_-]{20,}/.test(trimmed)) return true;
  if (trimmed.length >= 72 && /[A-Za-z0-9+/=_-]{48,}/.test(trimmed)) return true;
  return false;
}

function hasUnsafeRawProviderValueDeep(value: unknown): boolean {
  if (hasUnsafeRawProviderValue(value)) return true;
  if (Array.isArray(value)) return value.some(hasUnsafeRawProviderValueDeep);
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasUnsafeRawProviderValueDeep);
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeItem(value: unknown): StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O | undefined {
  if (!isRecord(value)) return undefined;
  return Object.freeze({
    bindingKind: normalizeString(value.bindingKind) as StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O,
    providerName: normalizeString(value.providerName) as StreamGiftLedgerLiveActivationOwnerApprovalPackageProviderName200O,
    configReferenceLabel: normalizeString(value.configReferenceLabel),
    configScope: normalizeString(value.configScope) as StreamGiftLedgerLiveActivationOwnerApprovalPackageConfigScope200O,
    previousFinalHandoffStage: normalizeString(value.previousFinalHandoffStage) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["previousFinalHandoffStage"],
    approvalPackageMode: normalizeString(value.approvalPackageMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["approvalPackageMode"],
    activationExecutionMode: normalizeString(value.activationExecutionMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["activationExecutionMode"],
    providerBindingMode: normalizeString(value.providerBindingMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["providerBindingMode"],
    liveCallMode: normalizeString(value.liveCallMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["liveCallMode"],
    paymentRuntimeMode: normalizeString(value.paymentRuntimeMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["paymentRuntimeMode"],
    payoutRuntimeMode: normalizeString(value.payoutRuntimeMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["payoutRuntimeMode"],
    walletMutationMode: normalizeString(value.walletMutationMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["walletMutationMode"],
    runtimeCutoverMode: normalizeString(value.runtimeCutoverMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["runtimeCutoverMode"],
    rollbackPlan: normalizeString(value.rollbackPlan) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["rollbackPlan"],
    ownerRiskAcknowledgement: normalizeString(value.ownerRiskAcknowledgement) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["ownerRiskAcknowledgement"],
    auditPackageClosure: normalizeString(value.auditPackageClosure) as StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O["auditPackageClosure"],
  });
}

export function normalizeStreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O(raw: Record<string, unknown>): StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O {
  const rawItems = Array.isArray(raw.bindingItems) ? raw.bindingItems : [];
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    approvalPackageMode: normalizeString(raw.approvalPackageMode) as StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O["approvalPackageMode"],
    acknowledgedFinalHandoffStage: normalizeString(raw.acknowledgedFinalHandoffStage) as StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O["acknowledgedFinalHandoffStage"],
    bindingItems: Object.freeze(rawItems.map(normalizeItem).filter((item): item is StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O => !!item)),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY;
  if (
    safety.envFileReadAllowedNow ||
    safety.envValueReadAllowedNow ||
    safety.rawSecretAccepted ||
    safety.rawProviderTokenAccepted ||
    safety.rawProviderReferenceAccepted ||
    safety.rawProviderResponseAccepted ||
    safety.liveActivationExecutionApprovedNow ||
    safety.liveActivationExecutionPerformedNow ||
    safety.providerBindingExecuted ||
    safety.providerBindingActivationExecuted ||
    safety.providerRuntimeEnabled ||
    safety.providerLiveCallExecuted ||
    safety.providerPayoutCallExecuted ||
    safety.walletMutationExecuted ||
    safety.paymentCaptureExecuted ||
    safety.payoutExecutionExecuted ||
    safety.dbReadExecuted ||
    safety.dbWriteExecuted ||
    safety.schemaWriteExecuted ||
    safety.migrationExecuted ||
    safety.prismaGenerateExecuted ||
    safety.realtimeEmitExecuted ||
    safety.runtimeEnablementExecuted ||
    safety.fakePaymentSuccessAllowed ||
    safety.fakeGiftSendSuccessAllowed ||
    safety.fakePayoutSuccessAllowed ||
    safety.fakeAvailableBalanceAllowed
  ) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-200O safety invariant failed: approval package must not execute live activation/runtime/provider/payment/payout.");
  }
  return true;
}

function baseBlocked(
  code: StreamGiftLedgerLiveActivationOwnerApprovalPackageBlockedCode200O,
  blockedReason: string,
): StreamGiftLedgerLiveActivationOwnerApprovalPackageBlocked200O {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    status: "exact_owner_approval_package_blocked_without_activation",
    code,
    blockedReason,
    approvalPackagePrepared: false,
    liveActivationExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}

function hasAllRequiredKinds(items: readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O[]): StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O | undefined {
  return STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_REQUIRED_KINDS_200O.find((kind) => !items.some((item) => item.bindingKind === kind));
}

function hasValidReferenceLabel(label: string): boolean {
  return /^provider_ref:[a-z0-9][a-z0-9._:-]{2,96}$/i.test(label);
}

function hasValidProviderScopePair(item: StreamGiftLedgerLiveActivationOwnerApprovalPackageItem200O): boolean {
  const scope = PROVIDER_SCOPE[item.bindingKind];
  return !!scope && scope.providerNames.includes(item.providerName) && scope.configScopes.includes(item.configScope);
}

export function prepareStreamGiftLedgerLiveActivationOwnerApprovalPackage200O(
  input: StreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O,
  rawInput: Record<string, unknown> = {},
): StreamGiftLedgerLiveActivationOwnerApprovalPackageResult200O {
  assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe();

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_OWNER_APPROVAL) {
    return baseBlocked("owner_approval_required", "Exact 200O package approval phrase is required, but this still does not approve or execute live activation.");
  }
  if (input.approvalPackageMode !== "exact_owner_approval_package") {
    return baseBlocked("approval_package_mode_disabled", "Approval package mode must be exact_owner_approval_package.");
  }
  if (input.acknowledgedFinalHandoffStage !== "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared") {
    return baseBlocked("previous_final_handoff_stage_required", "200N final handoff must be acknowledged before 200O package preparation.");
  }
  if (input.bindingItems.length === 0) {
    return baseBlocked("binding_items_required", "Binding package items are required.");
  }
  const missingKind = hasAllRequiredKinds(input.bindingItems);
  if (missingKind) {
    return baseBlocked("missing_required_binding_kind", `Missing required binding package kind: ${missingKind}.`);
  }
  for (const item of input.bindingItems) {
    if (!hasValidReferenceLabel(item.configReferenceLabel)) {
      return baseBlocked("invalid_reference_label", `Invalid reference label for ${item.bindingKind}. Use provider_ref:<label>, not a raw secret.`);
    }
    if (!hasValidProviderScopePair(item)) {
      return baseBlocked("invalid_provider_scope_pair", `Invalid provider/scope pair for ${item.bindingKind}.`);
    }
    if (item.previousFinalHandoffStage !== "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared") {
      return baseBlocked("previous_final_handoff_item_stage_required", `200N handoff item stage required for ${item.bindingKind}.`);
    }
    if (item.approvalPackageMode !== "exact_owner_approval_package_only_no_execution") {
      return baseBlocked("approval_package_mode_must_remain_package_only", `Approval package mode must stay package-only for ${item.bindingKind}.`);
    }
    if (item.activationExecutionMode !== "not_executed_requires_separate_execution_approval") {
      return baseBlocked("activation_execution_mode_must_remain_not_executed", `Activation execution must remain not executed for ${item.bindingKind}.`);
    }
    if (item.providerBindingMode !== "disabled_until_separate_execution_step") {
      return baseBlocked("provider_binding_mode_must_remain_disabled", `Provider binding must remain disabled for ${item.bindingKind}.`);
    }
    if (item.liveCallMode !== "disabled_no_provider_call") {
      return baseBlocked("live_call_mode_must_remain_disabled", `Provider live call must remain disabled for ${item.bindingKind}.`);
    }
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") {
      return baseBlocked("payment_runtime_mode_must_remain_disabled", `Payment runtime must remain disabled for ${item.bindingKind}.`);
    }
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") {
      return baseBlocked("payout_runtime_mode_must_remain_disabled", `Payout runtime must remain disabled for ${item.bindingKind}.`);
    }
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") {
      return baseBlocked("wallet_mutation_mode_must_remain_disabled", `Wallet mutation must remain disabled for ${item.bindingKind}.`);
    }
    if (item.runtimeCutoverMode !== "disabled_until_separate_execution_step") {
      return baseBlocked("runtime_cutover_mode_must_remain_disabled", `Runtime cutover must remain disabled for ${item.bindingKind}.`);
    }
    if (item.rollbackPlan !== "ready") {
      return baseBlocked("rollback_plan_required", `Rollback plan must be ready for ${item.bindingKind}.`);
    }
    if (item.ownerRiskAcknowledgement !== "required_for_future_execution") {
      return baseBlocked("owner_risk_acknowledgement_required", `Owner risk acknowledgement must be marked required for ${item.bindingKind}.`);
    }
    if (item.auditPackageClosure !== "complete") {
      return baseBlocked("audit_package_closure_required", `Audit package closure must be complete for ${item.bindingKind}.`);
    }
  }
  if (hasUnsafeRawProviderValueDeep(rawInput)) {
    return baseBlocked("raw_secret_or_provider_value_rejected", "Raw provider secret/token/response values are rejected. Use reference labels only.");
  }

  const verifiedBindingKinds = STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_REQUIRED_KINDS_200O.filter((kind) => input.bindingItems.some((item) => item.bindingKind === kind));
  const envelope = Object.freeze({
    contract: "stream.gift.live_activation.exact_owner_approval_package.v1" as const,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    previousStageRequired: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared" as const,
    requiredBindingKinds: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_REQUIRED_KINDS_200O,
    verifiedBindingKinds: Object.freeze([...verifiedBindingKinds]) as readonly StreamGiftLedgerLiveActivationOwnerApprovalPackageKind200O[],
    referenceLabelCount: input.bindingItems.length,
    acceptPaymentsProviderSeparated: true as const,
    creatorPayoutProviderSeparated: true as const,
    googleBillingDiamondsProviderSeparated: true as const,
    airwallexMerchantRailsProviderSeparated: true as const,
    exactOwnerApprovalPackagePrepared: true as const,
    packageOnlyNoExecution: true as const,
    liveActivationExecutionApprovedNow: false as const,
    liveActivationExecutionPerformedNow: false as const,
    providerRuntimeEnabled: false as const,
    providerBindingExecuted: false as const,
    providerBindingActivationExecuted: false as const,
    providerLiveCallExecuted: false as const,
    providerPayoutCallExecuted: false as const,
    paymentCaptureExecuted: false as const,
    payoutExecuted: false as const,
    walletMutationExecuted: false as const,
    realtimeEmitExecuted: false as const,
    rawSecretsIncluded: false as const,
    envFileRead: false as const,
    envValueRead: false as const,
    fakeSuccessWritten: false as const,
    runtimeCutoverDisabled: input.bindingItems.every((item) => item.runtimeCutoverMode === "disabled_until_separate_execution_step"),
    rollbackReady: input.bindingItems.every((item) => item.rollbackPlan === "ready"),
    ownerRiskAcknowledgementRequired: input.bindingItems.every((item) => item.ownerRiskAcknowledgement === "required_for_future_execution"),
    auditPackageClosureComplete: input.bindingItems.every((item) => item.auditPackageClosure === "complete"),
    requiresSeparateExecutionStepAfterThisPackage: true as const,
    nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run" as const,
  });

  return Object.freeze({
    ok: true as const,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    status: "exact_owner_approval_package_prepared_without_activation" as const,
    envelope,
    approvalPackagePrepared: true as const,
    liveActivationExecutionApprovedNow: false as const,
    liveActivationExecutionPerformedNow: false as const,
    providerRuntimeEnabled: false as const,
    providerBindingExecuted: false as const,
    providerBindingActivationExecuted: false as const,
    providerLiveCallExecuted: false as const,
    providerPayoutCallExecuted: false as const,
    paymentCaptureExecuted: false as const,
    payoutExecuted: false as const,
    walletMutationExecuted: false as const,
    fakeSuccessWritten: false as const,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O(): StreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O {
  assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    status: "ready_for_exact_owner_approval_package_without_activation",
    previousStageRequired: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run",
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationOwnerApprovalPackageContract200O() {
  assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    contract: "stream.gift.live_activation.exact_owner_approval_package.v1",
    ownerApprovalPhraseRequired: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_OWNER_APPROVAL,
    previousStageRequired: "200N_separate_exact_live_provider_binding_activation_execution_final_handoff_prepared",
    requiredBindingKinds: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_REQUIRED_KINDS_200O,
    packageOnlyNoExecution: true,
    referenceLabelsOnly: true,
    rawSecretsRejected: true,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run",
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationOwnerApprovalPackageRunbook200O() {
  assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    purpose: "Prepare a separate exact-owner approval package for a future live provider binding activation execution step without executing activation now.",
    requiredSequence: Object.freeze([
      "200N final handoff clean on owner machine",
      "200O exact-owner approval package prepared with provider reference labels only",
      "200P pre-execution dry run must remain disabled/no provider call",
      "future execution still requires a separate explicit command and separate safety gate",
    ]),
    forbiddenNow: Object.freeze([
      ".env read",
      "raw secret intake",
      "provider binding execution",
      "provider activation execution",
      "provider live call",
      "payment capture",
      "payout execution",
      "Wallet mutation",
      "DB write",
      "runtime enablement",
      "fake success",
    ]),
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}

export function createStreamGiftLedgerLiveActivationPreExecutionDryRunRequest200O() {
  assertStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORemainsSafe();
  return Object.freeze({
    ok: false as const,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_VERSION,
    status: "next_pre_execution_dry_run_request_blocked_until_200o_package_clean",
    nextStage: "200P_separate_exact_live_provider_binding_activation_execution_pre_execution_dry_run",
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    requiresSeparatePackage: true,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_OWNER_APPROVAL_PACKAGE_200O_SAFETY,
  });
}
