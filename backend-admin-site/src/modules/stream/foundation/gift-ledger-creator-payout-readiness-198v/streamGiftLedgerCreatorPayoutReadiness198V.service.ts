import type { PrismaClient } from "@prisma/client";
import {
  STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
  type StreamGiftLedgerCreatorPayoutGate198V,
  type StreamGiftLedgerCreatorPayoutReadinessBlocked198V,
  type StreamGiftLedgerCreatorPayoutReadinessInput198V,
  type StreamGiftLedgerCreatorPayoutReadinessInspection198V,
  type StreamGiftLedgerCreatorPayoutReadinessResult198V,
  type StreamGiftLedgerCreatorPayoutReadinessSafety198V,
} from "./streamGiftLedgerCreatorPayoutReadiness198V.types";

const REQUIRED_SETTLEMENT_GATES_198V = [
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

export const STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY: StreamGiftLedgerCreatorPayoutReadinessSafety198V = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  payoutExecutionAllowedNow: false,
  payoutProviderCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  availableBalanceReleaseAllowedNow: false,
  realtimeEmitAllowedNow: false,
  officialCreatorVerificationRequired: true,
  creatorAgreementRequired: true,
  kycKybAmlRequired: true,
  taxWithholdingRequired: true,
  adminPayoutApprovalRequired: true,
  fakeCashOutAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceOutputAllowed: false,
});

type DynamicDelegate198V = Readonly<{
  findFirst?: (args: Record<string, unknown>) => Promise<unknown>;
  findMany?: (args: Record<string, unknown>) => Promise<unknown[]>;
  count?: (args?: Record<string, unknown>) => Promise<number>;
}>;

type DynamicPrisma198V = Record<string, unknown>;

type EarningRecord198V = Readonly<{
  id: string;
  creatorUserId: string;
  sendIntentId: string;
  ledgerEntryId?: string;
  pendingDiamondMicros: bigint | number | string;
  availableDiamondMicros: bigint | number | string;
  status: string;
  payoutEligible?: boolean | null;
  payoutExecutionAllowed?: boolean | null;
}>;

type GateRecord198V = Readonly<{
  gateKind: string;
  status: string;
  evidenceHash?: string | null;
  payoutReleaseAllowed?: boolean | null;
}>;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toBigInt(value: bigint | number | string | undefined): bigint {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(value);
  if (typeof value === "string" && value.trim()) return BigInt(value);
  return 0n;
}

function toBigIntString(value: bigint | number | string | undefined): string {
  return toBigInt(value).toString();
}

function delegate198V(client: DynamicPrisma198V, name: string): DynamicDelegate198V | undefined {
  const candidate = client[name];
  return candidate && typeof candidate === "object" ? candidate as DynamicDelegate198V : undefined;
}

function requireDelegate198V(client: DynamicPrisma198V, name: string, code: StreamGiftLedgerCreatorPayoutReadinessBlocked198V["code"]): DynamicDelegate198V {
  const candidate = delegate198V(client, name);
  if (!candidate) throw new Error(code);
  return candidate;
}

function asEarning198V(value: unknown): EarningRecord198V | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<EarningRecord198V>;
  if (typeof record.id !== "string" || typeof record.creatorUserId !== "string" || typeof record.sendIntentId !== "string") return undefined;
  if (typeof record.status !== "string") return undefined;
  return record as EarningRecord198V;
}

function asGate198V(value: unknown): GateRecord198V | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<GateRecord198V>;
  if (typeof record.gateKind !== "string" || typeof record.status !== "string") return undefined;
  return record as GateRecord198V;
}

function gateVerdict198V(gate: GateRecord198V | undefined): StreamGiftLedgerCreatorPayoutGate198V["verdict"] {
  if (!gate) return "missing";
  if (gate.status === "PASSED") return "passed";
  if (gate.status === "WAIVED_BY_ADMIN") return "waived_by_admin";
  if (gate.status === "FAILED") return "failed";
  return "pending";
}

function gateSnapshot198V(gateKind: string, gate: GateRecord198V | undefined): StreamGiftLedgerCreatorPayoutGate198V {
  return {
    gateKind,
    status: gate ? gate.status : "MISSING",
    verdict: gateVerdict198V(gate),
    payoutReleaseAllowed: Boolean(gate?.payoutReleaseAllowed),
    evidenceHashPresent: Boolean(gate?.evidenceHash),
  };
}

function blocked198V(
  code: StreamGiftLedgerCreatorPayoutReadinessBlocked198V["code"],
  blockedReason: string,
): StreamGiftLedgerCreatorPayoutReadinessBlocked198V {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
    status: "creator_payout_readiness_blocked",
    code,
    blockedReason,
    payoutExecutionAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY,
  };
}

export function normalizeStreamGiftLedgerCreatorPayoutReadinessInput198V(raw: Record<string, unknown>): StreamGiftLedgerCreatorPayoutReadinessInput198V {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
  };
}

export async function inspectStreamGiftLedgerCreatorPayoutReadiness198V(
  prisma: PrismaClient,
  input: StreamGiftLedgerCreatorPayoutReadinessInput198V,
): Promise<StreamGiftLedgerCreatorPayoutReadinessResult198V> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198V("send_intent_id_required", "sendIntentId is required for creator payout readiness inspection");

  const dynamic = prisma as unknown as DynamicPrisma198V;
  const earningDelegate = requireDelegate198V(dynamic, "streamGiftCreatorEarning", "creator_earning_delegate_missing_generate_required");
  const gateDelegate = requireDelegate198V(dynamic, "streamGiftSettlementGate", "settlement_gate_delegate_missing_generate_required");
  if (typeof earningDelegate.findFirst !== "function") return blocked198V("creator_earning_delegate_missing_generate_required", "streamGiftCreatorEarning.findFirst delegate is missing");
  if (typeof gateDelegate.findMany !== "function") return blocked198V("settlement_gate_delegate_missing_generate_required", "streamGiftSettlementGate.findMany delegate is missing");

  const earning = asEarning198V(await earningDelegate.findFirst({
    where: {
      sendIntentId,
      ...(input.creatorUserId ? { creatorUserId: input.creatorUserId } : {}),
    },
    orderBy: { createdAt: "desc" },
  }));

  if (!earning) return blocked198V("creator_earning_not_found", "StreamGiftCreatorEarning row was not found for sendIntentId");

  const gateRowsRaw = await gateDelegate.findMany({ where: { sendIntentId } });
  const gateRows = (Array.isArray(gateRowsRaw) ? gateRowsRaw : []).map(asGate198V).filter(Boolean) as GateRecord198V[];
  const byKind = new Map(gateRows.map((gate) => [gate.gateKind, gate]));
  const gates = REQUIRED_SETTLEMENT_GATES_198V.map((kind) => gateSnapshot198V(kind, byKind.get(kind)));
  const settlementGatesSatisfied = gates.every((gate) => gate.verdict === "passed" || gate.verdict === "waived_by_admin");

  const receiptDelegate = delegate198V(dynamic, "streamGiftDeliveryReceiptAudit");
  const receiptAuditCount = receiptDelegate && typeof receiptDelegate.count === "function"
    ? await receiptDelegate.count({ where: { sendIntentId } })
    : 0;

  const availableDiamondMicros = toBigInt(earning.availableDiamondMicros);
  const availableBalancePresent = availableDiamondMicros > 0n && earning.status === "AVAILABLE";
  const creatorComplianceRequired = [
    "official_creator_verification",
    "creator_agreement_approved",
    "KYC_KYB_AML_passed",
    "age_region_policy_passed",
    "tax_withholding_profile_ready",
    "admin_payout_approval",
  ] as const;
  const payoutProviderRequired = [
    "server_side_payout_provider_configured",
    "payout_provider_account_verified",
    "provider_payout_reference_hash_only",
    "no_raw_provider_token_or_reference_in_response",
  ] as const;

  const payoutBlockedReasons = [
    ...(!availableBalancePresent ? ["creator earning must be AVAILABLE with availableDiamondMicros > 0"] : []),
    ...(!settlementGatesSatisfied ? ["all settlement gates must be PASSED or WAIVED_BY_ADMIN"] : []),
    ...(receiptAuditCount < 1 ? ["delivery receipt audit is recommended before payout review, but is not financial settlement proof"] : []),
    "payout execution is intentionally disabled in 198V",
    "creator compliance/KYC/KYB/AML/tax/admin approval must be connected in a later provider-backed payout stage",
  ];

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
    status: "creator_payout_readiness_inspected",
    sendIntentId,
    creatorUserId: earning.creatorUserId,
    earningId: earning.id,
    earningStatus: earning.status,
    pendingDiamondMicros: toBigIntString(earning.pendingDiamondMicros),
    availableDiamondMicros: availableDiamondMicros.toString(),
    availableBalancePresent,
    settlementGatesSatisfied,
    receiptAuditCount,
    payoutReadinessStatus: availableBalancePresent && settlementGatesSatisfied ? "ready_for_admin_review_only" : "not_ready",
    payoutExecutionAllowed: false,
    payoutProviderCallAllowed: false,
    payoutBlockedReasons,
    requiredCreatorCompliance: creatorComplianceRequired,
    requiredPayoutProviderSetup: payoutProviderRequired,
    gates,
    safety: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY,
  } satisfies StreamGiftLedgerCreatorPayoutReadinessInspection198V;
}

export function getStreamGiftLedgerCreatorPayoutReadiness198V() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
    stage: "creator_payout_readiness_guard",
    status: "ready_safe_disabled",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198v/readiness",
      "GET /api/admin/stream/gifts/ledger/198v/runbook",
      "POST /api/admin/stream/gifts/ledger/198v/inspect",
      "POST /api/admin/stream/gifts/ledger/198v/next-provider-payout-contract-request",
    ] as const,
    requiresBeforePayout: [
      "198U available balance release completed after all settlement gates",
      "official creator verification",
      "creator agreement approval",
      "KYC/KYB/AML + age/region + tax readiness",
      "server-side payout provider config",
      "admin payout approval",
    ] as const,
    safety: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY,
  } as const;
}

export function getStreamGiftLedgerCreatorPayoutReadinessRunbook198V() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
    localReadOnlyCommand: "node ./tools/stream-gifts-ledger-198v-creator-payout-readiness-read-only.js --send-intent-id=<sendIntentId>",
    nextStage: "198W provider payout contract/admin approval",
    warning: "198V never executes payout and never calls provider payout APIs",
    safety: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY,
  } as const;
}

export function createStreamGiftLedgerProviderPayoutContractRequest198V() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
    status: "next_stage_requires_separate_owner_approval",
    nextStage: "BACKEND-STREAM-GIFTS-LEDGER-198W",
    requestedScope: "provider_payout_contract_and_admin_approval_readiness_only",
    forbiddenNow: [
      "payout_execution",
      "provider_payout_call",
      "Wallet_mutation",
      "raw_provider_token_or_reference",
      "fake_cash_out_success",
      "fake_available_balance",
    ] as const,
    safety: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY,
  } as const;
}

export function assertStreamGiftLedgerCreatorPayoutReadiness198VRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.payoutProviderCallAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.availableBalanceReleaseAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.fakeCashOutAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceOutputAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_UNSAFE_FLAG");
}
