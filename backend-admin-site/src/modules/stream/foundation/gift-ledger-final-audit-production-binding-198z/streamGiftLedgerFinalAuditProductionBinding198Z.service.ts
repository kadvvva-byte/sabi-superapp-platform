import type { PrismaClient } from "@prisma/client";
import {
  STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
  type StreamGiftLedgerFinalAuditGate198Z,
  type StreamGiftLedgerFinalAuditInspection198Z,
  type StreamGiftLedgerFinalAuditProductionBindingBlocked198Z,
  type StreamGiftLedgerFinalAuditProductionBindingInput198Z,
  type StreamGiftLedgerFinalAuditProductionBindingResult198Z,
  type StreamGiftLedgerFinalAuditProductionBindingSafety198Z,
  type StreamGiftLedgerProductionBindingRequestEnvelope198Z,
  type StreamGiftLedgerProductionBindingRequestPrepared198Z,
} from "./streamGiftLedgerFinalAuditProductionBinding198Z.types";

export const STREAM_GIFT_LEDGER_FINAL_AUDIT_APPROVAL_198Z = "STREAM_GIFT_LEDGER_198Z_FINAL_AUDIT_APPROVED" as const;
export const STREAM_GIFT_LEDGER_PRODUCTION_BINDING_REQUEST_APPROVAL_198Z = "STREAM_GIFT_LEDGER_198Z_PRODUCTION_BINDING_REQUEST_APPROVED" as const;

export const STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY: StreamGiftLedgerFinalAuditProductionBindingSafety198Z = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  payoutExecutionAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  availableBalanceMutationAllowedNow: false,
  realtimeEmitAllowedNow: false,
  migrationAllowedNow: false,
  prismaGenerateAllowedNow: false,
  adminApprovalRequired: true,
  separateExactOwnerApprovalRequiredForProductionBinding: true,
  hashOnlyProviderReferencesRequired: true,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawBankOrCardAccepted: false,
  rawProviderReferenceOutputAllowed: false,
  providerResponseBodyOutputAllowed: false,
  fakeCashOutAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

const SETTLEMENT_GATE_KINDS_198Z = [
  "PROVIDER_SETTLEMENT",
  "REFUND_WINDOW",
  "CHARGEBACK_RISK",
  "FRAUD_REVIEW",
  "COMPLIANCE_REVIEW",
  "TAX_WITHHOLDING",
  "KYC_KYB_AML",
  "AGE_REGION_POLICY",
  "ADMIN_APPROVAL",
] as const;

const RAW_PROVIDER_FIELD_NAMES_198Z = [
  "providerToken",
  "rawProviderToken",
  "providerReference",
  "rawProviderReference",
  "providerPayoutReference",
  "rawProviderPayoutReference",
  "providerResponseBody",
  "bankAccount",
  "cardNumber",
  "iban",
  "swift",
] as const;

type DynamicDelegate198Z = Readonly<{
  findFirst?: (args: Record<string, unknown>) => Promise<unknown>;
  findMany?: (args: Record<string, unknown>) => Promise<unknown[]>;
  count?: (args?: Record<string, unknown>) => Promise<number>;
}>;

type DynamicPrisma198Z = Record<string, unknown>;

type SendIntentRecord198Z = Readonly<{
  id: string;
  senderUserId?: string;
  receiverUserId?: string;
  creatorUserId?: string | null;
  giftId?: string;
  giftCatalogItemId?: string | null;
  status?: string;
}>;

type LedgerEntryRecord198Z = Readonly<{ id: string; entryKind?: string; sendIntentId?: string }>;

type EarningRecord198Z = Readonly<{
  id: string;
  creatorUserId?: string;
  status?: string;
  pendingDiamondMicros?: bigint | number | string;
  availableDiamondMicros?: bigint | number | string;
}>;

type GateRecord198Z = Readonly<{ gateKind?: string; status?: string }>;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toBigInt(value: bigint | number | string | undefined): bigint {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(value);
  if (typeof value === "string" && value.trim()) return BigInt(value);
  return 0n;
}

function isHex64(value: string | undefined): boolean {
  return Boolean(value && /^[a-f0-9]{64}$/i.test(value));
}

function hasForbiddenRawProviderInput198Z(raw: Record<string, unknown>): boolean {
  return RAW_PROVIDER_FIELD_NAMES_198Z.some((key) => clean(raw[key]) !== undefined);
}

function delegate198Z(client: DynamicPrisma198Z, name: string): DynamicDelegate198Z | undefined {
  const candidate = client[name];
  return candidate && typeof candidate === "object" ? candidate as DynamicDelegate198Z : undefined;
}

function blocked198Z(
  code: StreamGiftLedgerFinalAuditProductionBindingBlocked198Z["code"],
  blockedReason: string,
): StreamGiftLedgerFinalAuditProductionBindingBlocked198Z {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    status: "final_audit_or_production_binding_blocked",
    code,
    blockedReason,
    providerBindingAllowed: false,
    providerLiveCallAllowed: false,
    payoutExecutionAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  };
}

function normalizeRequestedProvider198Z(value: unknown): StreamGiftLedgerFinalAuditProductionBindingInput198Z["requestedProvider"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "airwallex" || normalized === "bank" || normalized === "manual_review" || normalized === "other") return normalized;
  return "manual_review";
}

function normalizeBindingMode198Z(value: unknown): StreamGiftLedgerFinalAuditProductionBindingInput198Z["bindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "server_side_provider_binding_request" || normalized === "manual_review" || normalized === "disabled") return normalized;
  return "disabled";
}

function asSendIntent198Z(value: unknown): SendIntentRecord198Z | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<SendIntentRecord198Z>;
  if (typeof record.id !== "string") return undefined;
  return record as SendIntentRecord198Z;
}

function asLedgerEntry198Z(value: unknown): LedgerEntryRecord198Z | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<LedgerEntryRecord198Z>;
  if (typeof record.id !== "string") return undefined;
  return record as LedgerEntryRecord198Z;
}

function asEarning198Z(value: unknown): EarningRecord198Z | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<EarningRecord198Z>;
  if (typeof record.id !== "string") return undefined;
  return record as EarningRecord198Z;
}

function asGate198Z(value: unknown): GateRecord198Z | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<GateRecord198Z>;
  if (typeof record.gateKind !== "string" || typeof record.status !== "string") return undefined;
  return record as GateRecord198Z;
}

function gatePassed198Z(status: string | undefined): boolean {
  return status === "PASSED" || status === "WAIVED_BY_ADMIN";
}

export function normalizeStreamGiftLedgerFinalAuditProductionBindingInput198Z(raw: Record<string, unknown>): StreamGiftLedgerFinalAuditProductionBindingInput198Z {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
    providerPayoutReferenceHash: clean(raw.providerPayoutReferenceHash),
    payoutDestinationReferenceHash: clean(raw.payoutDestinationReferenceHash),
    finalAuditApproval: clean(raw.finalAuditApproval),
    productionBindingApproval: clean(raw.productionBindingApproval),
    requestedProvider: normalizeRequestedProvider198Z(raw.requestedProvider),
    bindingMode: normalizeBindingMode198Z(raw.bindingMode),
  };
}

export async function inspectStreamGiftLedgerFinalAudit198Z(
  prisma: PrismaClient,
  input: StreamGiftLedgerFinalAuditProductionBindingInput198Z,
  raw: Record<string, unknown> = {},
): Promise<StreamGiftLedgerFinalAuditProductionBindingResult198Z> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198Z("send_intent_id_required", "sendIntentId is required for final audit inspection");
  if (hasForbiddenRawProviderInput198Z(raw)) return blocked198Z("raw_provider_reference_rejected", "198Z accepts hash-only provider references; raw provider/bank/card fields are rejected");
  if (input.finalAuditApproval !== STREAM_GIFT_LEDGER_FINAL_AUDIT_APPROVAL_198Z) {
    return blocked198Z("final_audit_approval_required", `finalAuditApproval must equal ${STREAM_GIFT_LEDGER_FINAL_AUDIT_APPROVAL_198Z}`);
  }

  const dynamic = prisma as unknown as DynamicPrisma198Z;
  const sendIntentDelegate = delegate198Z(dynamic, "streamGiftSendIntent");
  const ledgerDelegate = delegate198Z(dynamic, "streamGiftLedgerEntry");
  const earningDelegate = delegate198Z(dynamic, "streamGiftCreatorEarning");
  const gateDelegate = delegate198Z(dynamic, "streamGiftSettlementGate");
  const receiptDelegate = delegate198Z(dynamic, "streamGiftDeliveryReceiptAudit");
  if (!sendIntentDelegate?.findFirst || !ledgerDelegate?.findMany || !earningDelegate?.findFirst || !gateDelegate?.findMany) {
    return blocked198Z("generated_delegate_missing", "Generated Prisma Client delegates are missing; run validate/generate/migration chain first");
  }

  const sendIntent = asSendIntent198Z(await sendIntentDelegate.findFirst({ where: { id: sendIntentId } }));
  if (!sendIntent) return blocked198Z("ledger_commit_not_found", "StreamGiftSendIntent was not found for final audit");

  const ledgerEntries = (await ledgerDelegate.findMany({ where: { sendIntentId } })).map(asLedgerEntry198Z).filter(Boolean) as LedgerEntryRecord198Z[];
  const earning = asEarning198Z(await earningDelegate.findFirst({ where: { sendIntentId, ...(input.creatorUserId ? { creatorUserId: input.creatorUserId } : {}) } }));
  const settlementGates = (await gateDelegate.findMany({ where: { sendIntentId } })).map(asGate198Z).filter(Boolean) as GateRecord198Z[];
  const receiptAuditCount = receiptDelegate?.count ? await receiptDelegate.count({ where: { sendIntentId } }) : 0;

  const gateByKind = new Map(settlementGates.map((gate) => [gate.gateKind, gate]));
  const requiredGateSnapshots: readonly StreamGiftLedgerFinalAuditGate198Z[] = SETTLEMENT_GATE_KINDS_198Z.map((kind) => {
    const gate = gateByKind.get(kind);
    return {
      name: `settlement_gate_${kind}`,
      passed: gatePassed198Z(gate?.status),
      evidence: gate ? String(gate.status) : "MISSING",
    };
  });
  const pendingDiamondMicros = toBigInt(earning?.pendingDiamondMicros);
  const availableDiamondMicros = toBigInt(earning?.availableDiamondMicros);
  const settlementGatesSatisfied = requiredGateSnapshots.every((gate) => gate.passed);
  const ledgerCommitComplete = ledgerEntries.length >= 3 && Boolean(earning) && settlementGates.length >= SETTLEMENT_GATE_KINDS_198Z.length;
  const earningAvailable = earning?.status === "AVAILABLE" && availableDiamondMicros > 0n;
  const providerHashPresent = isHex64(input.providerPayoutReferenceHash);
  const destinationHashPresent = isHex64(input.payoutDestinationReferenceHash);
  const finalAuditReady = ledgerCommitComplete && settlementGatesSatisfied && receiptAuditCount > 0 && earningAvailable && providerHashPresent;
  const gates: readonly StreamGiftLedgerFinalAuditGate198Z[] = [
    { name: "send_intent_found", passed: true, evidence: sendIntent.status || "status_unknown" },
    { name: "ledger_entries_minimum_3", passed: ledgerEntries.length >= 3, evidence: String(ledgerEntries.length) },
    { name: "creator_earning_found", passed: Boolean(earning), evidence: earning?.status || "missing" },
    { name: "available_balance_present", passed: earningAvailable, evidence: availableDiamondMicros.toString() },
    { name: "delivery_receipt_audit_present", passed: receiptAuditCount > 0, evidence: String(receiptAuditCount) },
    { name: "provider_payout_reference_hash_only_present", passed: providerHashPresent, evidence: providerHashPresent ? "hash_present" : "missing_or_invalid" },
    { name: "provider_live_binding_disabled_now", passed: true, evidence: "providerBindingAllowedNow=false" },
    ...requiredGateSnapshots,
  ] as const;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    status: "final_audit_inspected",
    sendIntentId,
    creatorUserId: earning?.creatorUserId || sendIntent.creatorUserId || input.creatorUserId,
    catalogItemId: sendIntent.giftCatalogItemId || sendIntent.giftId,
    senderUserId: sendIntent.senderUserId,
    receiverUserId: sendIntent.receiverUserId,
    sendIntentStatus: sendIntent.status,
    ledgerEntryCount: ledgerEntries.length,
    creatorEarningFound: Boolean(earning),
    creatorEarningStatus: earning?.status,
    pendingDiamondMicros: pendingDiamondMicros.toString(),
    availableDiamondMicros: availableDiamondMicros.toString(),
    settlementGateCount: settlementGates.length,
    settlementGatesSatisfied,
    deliveryReceiptAuditCount: receiptAuditCount,
    providerPayoutReferenceHashPresent: providerHashPresent,
    payoutDestinationReferenceHashPresent: destinationHashPresent,
    finalAuditReady,
    productionProviderBindingRequestReady: finalAuditReady,
    productionProviderBindingAllowedNow: false,
    providerLiveCallAllowedNow: false,
    payoutExecutionAllowedNow: false,
    fakePayoutSuccessAllowed: false,
    fakeAvailableBalanceAllowed: false,
    gates,
    nextStage: finalAuditReady ? "199A_separate_provider_binding_owner_approval_required" : "198Z_fix_required_before_provider_binding",
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  } satisfies StreamGiftLedgerFinalAuditInspection198Z;
}

export async function createStreamGiftLedgerProductionProviderBindingRequest198Z(
  prisma: PrismaClient,
  input: StreamGiftLedgerFinalAuditProductionBindingInput198Z,
  raw: Record<string, unknown> = {},
): Promise<StreamGiftLedgerFinalAuditProductionBindingResult198Z> {
  if (input.productionBindingApproval !== STREAM_GIFT_LEDGER_PRODUCTION_BINDING_REQUEST_APPROVAL_198Z) {
    return blocked198Z("production_binding_approval_required", `productionBindingApproval must equal ${STREAM_GIFT_LEDGER_PRODUCTION_BINDING_REQUEST_APPROVAL_198Z}`);
  }
  if (!isHex64(input.providerPayoutReferenceHash)) {
    return blocked198Z("provider_payout_reference_hash_required", "providerPayoutReferenceHash must be a 64 hex hash; raw provider payout references are forbidden");
  }
  const inspection = await inspectStreamGiftLedgerFinalAudit198Z(prisma, input, raw);
  if (!inspection.ok || inspection.status !== "final_audit_inspected") return inspection;
  if (!inspection.finalAuditReady) return blocked198Z("ledger_commit_incomplete", "Final audit is not ready; production provider binding request is blocked");

  const bindingMode = input.bindingMode === "server_side_provider_binding_request" ? input.bindingMode : "manual_review";
  const requestedProvider = input.requestedProvider || "manual_review";
  const envelope: StreamGiftLedgerProductionBindingRequestEnvelope198Z = {
    contract: "stream.gift.creator.payout.production_provider_binding_request.v1",
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    sendIntentId: inspection.sendIntentId,
    requestedProvider,
    bindingMode,
    providerPayoutReferenceHashPresent: true,
    payoutDestinationReferenceHashPresent: inspection.payoutDestinationReferenceHashPresent,
    finalAuditPassed: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    separateExactOwnerApprovalRequired: true,
  };

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    status: "production_provider_binding_request_prepared_separate_owner_approval_required",
    code: "production_binding_requires_separate_exact_owner_approval",
    sendIntentId: inspection.sendIntentId,
    envelope,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    nextStage: "199A_real_provider_binding_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  } satisfies StreamGiftLedgerProductionBindingRequestPrepared198Z;
}

export function getStreamGiftLedgerFinalAuditProductionBindingReadiness198Z() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    stage: "final_audit_and_production_provider_binding_request",
    status: "ready_safe_disabled",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198z/readiness",
      "GET /api/admin/stream/gifts/ledger/198z/final-audit-contract",
      "POST /api/admin/stream/gifts/ledger/198z/final-audit",
      "POST /api/admin/stream/gifts/ledger/198z/production-binding-request",
      "GET /api/admin/stream/gifts/ledger/198z/runbook",
    ] as const,
    finalAuditRequires: [
      "198O committed send intent and ledger rows",
      "198P post-commit inspection contract",
      "198R guarded realtime binding remains no-fake",
      "198T delivery receipt audit if mobile receipt exists",
      "198U available balance release guard completed with all settlement gates",
      "198V payout readiness inspected",
      "198W/198X/198Y provider payout contract/adapter envelope only",
    ] as const,
    nextStage: "199A requires separate exact owner approval for real provider binding",
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  } as const;
}

export function getStreamGiftLedgerFinalAuditContract198Z() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    contract: "stream.gift.creator.payout.final_audit.v1",
    requiredInput: [
      "sendIntentId",
      "finalAuditApproval phrase",
      "providerPayoutReferenceHash 64 hex only",
      "optional payoutDestinationReferenceHash 64 hex",
    ] as const,
    productionBindingRequestInput: [
      "sendIntentId",
      "finalAuditApproval phrase",
      "productionBindingApproval phrase",
      "providerPayoutReferenceHash 64 hex only",
      "requestedProvider",
      "bindingMode",
    ] as const,
    forbiddenInput: RAW_PROVIDER_FIELD_NAMES_198Z,
    outputPolicy: [
      "hash presence booleans only",
      "providerBindingExecuted=false",
      "providerLiveCallExecuted=false",
      "payoutExecutionAllowed=false",
      "no provider response body",
    ] as const,
    approvals: {
      finalAuditApproval: STREAM_GIFT_LEDGER_FINAL_AUDIT_APPROVAL_198Z,
      productionBindingApproval: STREAM_GIFT_LEDGER_PRODUCTION_BINDING_REQUEST_APPROVAL_198Z,
    },
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  } as const;
}

export function getStreamGiftLedgerFinalAuditProductionBindingRunbook198Z() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
    localStaticCheckCommand: "node ./tools/stream-gifts-ledger-198z-final-audit-production-binding-check.js --i-approve-198z-final-audit-check",
    finalAuditRoute: "POST /api/admin/stream/gifts/ledger/198z/final-audit",
    productionBindingRequestRoute: "POST /api/admin/stream/gifts/ledger/198z/production-binding-request",
    warning: "198Z never binds a provider, never calls provider payout APIs, and never records payout success",
    nextStage: "199A real provider binding exact owner approval, separate from this patch",
    safety: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY,
  } as const;
}

export function assertStreamGiftLedgerFinalAuditProductionBinding198ZRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.providerBindingAllowedNow,
    safety.providerLiveCallAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.availableBalanceMutationAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.migrationAllowedNow,
    safety.prismaGenerateAllowedNow,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawBankOrCardAccepted,
    safety.rawProviderReferenceOutputAllowed,
    safety.providerResponseBodyOutputAllowed,
    safety.fakeCashOutAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_UNSAFE_FLAG");
}
