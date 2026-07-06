import { createHash, randomUUID } from "crypto";
import type { PrismaClient } from "@prisma/client";
import {
  STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
  type StreamGiftLedgerSettlementGateSnapshot198U,
  type StreamGiftLedgerSettlementReleaseBlocked198U,
  type StreamGiftLedgerSettlementReleaseCommitted198U,
  type StreamGiftLedgerSettlementReleaseInput198U,
  type StreamGiftLedgerSettlementReleaseInspection198U,
  type StreamGiftLedgerSettlementReleaseResult198U,
  type StreamGiftLedgerSettlementReleaseSafety198U,
} from "./streamGiftLedgerSettlementReleaseGuard198U.types";

const REQUIRED_GATE_KINDS_198U = [
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

const RELEASE_APPROVAL_PHRASE_198U = "STREAM_GIFT_LEDGER_198U_RELEASE_APPROVED" as const;

export const STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY: StreamGiftLedgerSettlementReleaseSafety198U = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedOnlyWithExplicitRuntimeFlagAndAdminApproval: true,
  allSettlementGatesRequiredBeforeRelease: true,
  deliveryReceiptAcceptedAsFinancialSettlementProof: false,
  availableBalanceReleaseAllowedOnlyAfterAllGatesPass: true,
  payoutExecutionAllowedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  realtimeEmitAllowedNow: false,
  fakeAvailableBalanceAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceOutputAllowed: false,
});

type DynamicDelegate198U = Readonly<{
  findFirst?: (args: Record<string, unknown>) => Promise<unknown>;
  findMany?: (args: Record<string, unknown>) => Promise<unknown[]>;
  count?: (args?: Record<string, unknown>) => Promise<number>;
  update?: (args: Record<string, unknown>) => Promise<unknown>;
  create?: (args: Record<string, unknown>) => Promise<unknown>;
}>;

type DynamicPrisma198U = Record<string, unknown> & Readonly<{
  $transaction?: <T>(fn: (tx: DynamicPrisma198U) => Promise<T>) => Promise<T>;
}>;

type CreatorEarningRecord198U = Readonly<{
  id: string;
  creatorUserId: string;
  sendIntentId: string;
  ledgerEntryId: string;
  pendingDiamondMicros: bigint | number | string;
  availableDiamondMicros: bigint | number | string;
  status: string;
  payoutEligible?: boolean;
  payoutExecutionAllowed?: boolean;
}>;

type SettlementGateRecord198U = Readonly<{
  gateKind: string;
  status: string;
  reasonCode?: string | null;
  evidenceHash?: string | null;
  checkedAt?: Date | string | null;
  payoutReleaseAllowed?: boolean | null;
}>;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toBigIntString(value: bigint | number | string | undefined): string {
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "number") return BigInt(value).toString();
  if (typeof value === "string" && value.trim()) return BigInt(value).toString();
  return "0";
}

function delegate198U(client: DynamicPrisma198U, name: string): DynamicDelegate198U | undefined {
  const candidate = client[name];
  return candidate && typeof candidate === "object" ? candidate as DynamicDelegate198U : undefined;
}

function requireDelegate198U(client: DynamicPrisma198U, name: string): DynamicDelegate198U {
  const candidate = delegate198U(client, name);
  if (!candidate) throw new Error(`prisma_delegate_missing_${name}`);
  return candidate;
}

function requireMethod198U<T extends keyof DynamicDelegate198U>(delegate: DynamicDelegate198U, method: T): NonNullable<DynamicDelegate198U[T]> {
  const fn = delegate[method];
  if (typeof fn !== "function") throw new Error(`prisma_delegate_method_missing_${String(method)}`);
  return fn as NonNullable<DynamicDelegate198U[T]>;
}

function asCreatorEarning198U(value: unknown): CreatorEarningRecord198U | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<CreatorEarningRecord198U>;
  if (typeof record.id !== "string" || typeof record.creatorUserId !== "string" || typeof record.sendIntentId !== "string" || typeof record.ledgerEntryId !== "string") return undefined;
  if (typeof record.status !== "string") return undefined;
  return record as CreatorEarningRecord198U;
}

function asGate198U(value: unknown): SettlementGateRecord198U | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<SettlementGateRecord198U>;
  if (typeof record.gateKind !== "string" || typeof record.status !== "string") return undefined;
  return record as SettlementGateRecord198U;
}

function gateSnapshot198U(gate: SettlementGateRecord198U | undefined, gateKind: string): StreamGiftLedgerSettlementGateSnapshot198U {
  if (!gate) {
    return {
      gateKind,
      status: "MISSING",
      verdict: "missing",
      evidenceHashPresent: false,
      payoutReleaseAllowed: false,
    };
  }

  const status = gate.status;
  const verdict = status === "PASSED" ? "passed"
    : status === "WAIVED_BY_ADMIN" ? "waived_by_admin"
      : status === "FAILED" ? "failed"
        : "pending";

  return {
    gateKind,
    status,
    verdict,
    checkedAt: gate.checkedAt ? String(gate.checkedAt) : undefined,
    reasonCode: gate.reasonCode ?? undefined,
    evidenceHashPresent: Boolean(gate.evidenceHash),
    payoutReleaseAllowed: Boolean(gate.payoutReleaseAllowed),
  };
}

function blocked198U(
  code: StreamGiftLedgerSettlementReleaseBlocked198U["code"],
  blockedReason: string,
): StreamGiftLedgerSettlementReleaseBlocked198U {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
    status: "available_release_blocked_by_guard",
    code,
    blockedReason,
    availableBalanceReleased: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY,
  };
}

function releaseEnabled198U(): boolean {
  return String(process.env.STREAM_GIFT_LEDGER_AVAILABLE_RELEASE_ENABLED || "").trim().toLowerCase() === "true";
}

function releaseModeIsAllGates198U(): boolean {
  return String(process.env.STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_MODE || "").trim() === "all_gates_passed";
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function normalizeStreamGiftLedgerSettlementReleaseInput198U(raw: Record<string, unknown>): StreamGiftLedgerSettlementReleaseInput198U {
  return {
    sendIntentId: clean(raw.sendIntentId),
    creatorUserId: clean(raw.creatorUserId),
    releaseApproval: clean(raw.releaseApproval),
    idempotencyKey: clean(raw.idempotencyKey),
  };
}

export async function inspectStreamGiftLedgerSettlementRelease198U(
  prisma: PrismaClient,
  input: StreamGiftLedgerSettlementReleaseInput198U,
): Promise<StreamGiftLedgerSettlementReleaseInspection198U | StreamGiftLedgerSettlementReleaseBlocked198U> {
  const sendIntentId = clean(input.sendIntentId);
  if (!sendIntentId) return blocked198U("send_intent_id_required", "sendIntentId is required before settlement release inspection");

  const dynamic = prisma as unknown as DynamicPrisma198U;
  const earningDelegate = requireDelegate198U(dynamic, "streamGiftCreatorEarning");
  const gateDelegate = requireDelegate198U(dynamic, "streamGiftSettlementGate");
  const receiptDelegate = delegate198U(dynamic, "streamGiftDeliveryReceiptAudit");
  const findEarning = requireMethod198U(earningDelegate, "findFirst");
  const findGates = requireMethod198U(gateDelegate, "findMany");

  const earning = asCreatorEarning198U(await findEarning({
    where: {
      sendIntentId,
      ...(input.creatorUserId ? { creatorUserId: input.creatorUserId } : {}),
    },
    orderBy: { createdAt: "desc" },
  }));

  if (!earning) return blocked198U("settlement_inspection_failed", "StreamGiftCreatorEarning row was not found for sendIntentId");

  const gateRowsRaw = await findGates({ where: { sendIntentId } });
  const gateRows = (Array.isArray(gateRowsRaw) ? gateRowsRaw : []).map(asGate198U).filter(Boolean) as SettlementGateRecord198U[];
  const byKind = new Map(gateRows.map((gate) => [gate.gateKind, gate]));
  const gates = REQUIRED_GATE_KINDS_198U.map((gateKind) => gateSnapshot198U(byKind.get(gateKind), gateKind));
  const failedGateCount = gates.filter((gate) => gate.verdict === "failed").length;
  const pendingGateCount = gates.filter((gate) => gate.verdict === "pending").length;
  const missingGateCount = gates.filter((gate) => gate.verdict === "missing").length;
  const allRequiredGatesSatisfied = gates.every((gate) => gate.verdict === "passed" || gate.verdict === "waived_by_admin");

  let receiptAuditCount = 0;
  if (receiptDelegate && typeof receiptDelegate.count === "function") {
    receiptAuditCount = await receiptDelegate.count({ where: { sendIntentId } });
  }

  const releaseBlockedReasons = [
    ...(!allRequiredGatesSatisfied ? ["all settlement gates must be PASSED or WAIVED_BY_ADMIN"] : []),
    ...(earning.status !== "PENDING" ? [`earning status must be PENDING before first release, current=${earning.status}`] : []),
    ...(receiptAuditCount < 1 ? ["delivery receipt audit is not financial proof and is optional, but no audit receipt is present"] : []),
  ];

  const releaseEligibleNow = allRequiredGatesSatisfied && earning.status === "PENDING";

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
    status: "settlement_release_inspected",
    sendIntentId,
    creatorUserId: earning.creatorUserId,
    earningId: earning.id,
    earningStatus: earning.status,
    pendingDiamondMicros: toBigIntString(earning.pendingDiamondMicros),
    availableDiamondMicros: toBigIntString(earning.availableDiamondMicros),
    allRequiredGatesSatisfied,
    failedGateCount,
    pendingGateCount,
    missingGateCount,
    receiptAuditCount,
    releaseEligibleNow,
    releaseBlockedReasons,
    gates,
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY,
  };
}

async function runTransaction198U<T>(client: PrismaClient, fn: (tx: DynamicPrisma198U) => Promise<T>): Promise<T> {
  const dynamic = client as unknown as DynamicPrisma198U;
  if (typeof dynamic.$transaction !== "function") throw new Error("prisma_transaction_unavailable");
  return dynamic.$transaction(fn);
}

export async function releaseStreamGiftLedgerAvailableBalance198U(
  prisma: PrismaClient,
  input: StreamGiftLedgerSettlementReleaseInput198U,
): Promise<StreamGiftLedgerSettlementReleaseBlocked198U | StreamGiftLedgerSettlementReleaseCommitted198U> {
  if (!releaseEnabled198U()) {
    return blocked198U("release_runtime_flag_disabled", "STREAM_GIFT_LEDGER_AVAILABLE_RELEASE_ENABLED=true is required before available balance release");
  }
  if (!releaseModeIsAllGates198U()) {
    return blocked198U("release_mode_not_all_gates_passed", "STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_MODE=all_gates_passed is required before release");
  }
  if (input.releaseApproval !== RELEASE_APPROVAL_PHRASE_198U) {
    return blocked198U("admin_release_approval_required", `releaseApproval must equal ${RELEASE_APPROVAL_PHRASE_198U}`);
  }

  const inspected = await inspectStreamGiftLedgerSettlementRelease198U(prisma, input);
  if (!inspected.ok) return inspected;
  if (!inspected.releaseEligibleNow) {
    return blocked198U("settlement_gates_not_satisfied", inspected.releaseBlockedReasons.join("; ") || "settlement release gates are not satisfied");
  }
  if (inspected.earningStatus !== "PENDING") {
    return blocked198U("earning_not_pending", `earning status must be PENDING before release, current=${inspected.earningStatus}`);
  }

  try {
    return await runTransaction198U(prisma, async (tx) => {
      const earningDelegate = requireDelegate198U(tx, "streamGiftCreatorEarning");
      const ledgerDelegate = requireDelegate198U(tx, "streamGiftLedgerEntry");
      const updateEarning = requireMethod198U(earningDelegate, "update");
      const createLedger = requireMethod198U(ledgerDelegate, "create");
      const settlementReleaseLedgerEntryId = `sglr_198u_${randomUUID()}`;
      const amountDiamondMicros = BigInt(inspected.pendingDiamondMicros);

      await createLedger({
        data: {
          id: settlementReleaseLedgerEntryId,
          sendIntentId: inspected.sendIntentId,
          entryKind: "SETTLEMENT_RELEASE",
          partyUserId: inspected.creatorUserId,
          amountDiamondMicros,
          idempotencyKeyHash: sha256(`198U:${inspected.sendIntentId}:${inspected.earningId}:${input.idempotencyKey || inspected.pendingDiamondMicros}`),
          metadata: {
            stage: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
            releasePolicy: "all_settlement_gates_passed_or_waived",
            payoutExecutionAllowed: false,
            walletMutationAllowed: false,
            providerCallAllowed: false,
          },
        },
      });

      await updateEarning({
        where: { id: inspected.earningId },
        data: {
          availableDiamondMicros: amountDiamondMicros,
          status: "AVAILABLE",
          payoutEligible: false,
          payoutExecutionAllowed: false,
          holdReasons: [
            "available_balance_released_after_settlement_gates",
            "payout_still_requires_creator_eligibility_kyc_kyb_aml_tax_admin_provider_settlement",
          ],
        },
      });

      return {
        ok: true,
        version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
        status: "available_balance_released_after_settlement_gates",
        sendIntentId: inspected.sendIntentId,
        creatorUserId: inspected.creatorUserId,
        earningId: inspected.earningId,
        settlementReleaseLedgerEntryId,
        availableDiamondMicrosReleased: amountDiamondMicros.toString(),
        payoutExecutionAllowed: false,
        payoutEligible: false,
        availableBalanceReleased: true,
        releaseNotes: [
          "Available balance was released only after all settlement gates were PASSED or WAIVED_BY_ADMIN.",
          "Delivery receipt was not accepted as financial settlement proof.",
          "Payout remains blocked until separate creator payout eligibility and provider settlement stages pass.",
          "No Wallet mutation, provider call, payment capture, realtime emit, or payout execution was performed in 198U.",
        ],
        safety: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY,
      } satisfies StreamGiftLedgerSettlementReleaseCommitted198U;
    });
  } catch (error) {
    return blocked198U("release_db_write_failed", error instanceof Error ? error.message : String(error));
  }
}

export function getStreamGiftLedgerSettlementReleaseReadiness198U(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
    status: "settlement_release_guard_ready",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198u/readiness",
      "POST /api/admin/stream/gifts/ledger/198u/inspect",
      "POST /api/admin/stream/gifts/ledger/198u/release-attempt",
      "GET /api/admin/stream/gifts/ledger/198u/runbook",
      "POST /api/admin/stream/gifts/ledger/198u/next-payout-readiness-request",
    ],
    releaseRequires: [
      "all StreamGiftSettlementGate rows for the intent are PASSED or WAIVED_BY_ADMIN",
      "earning status is PENDING",
      "STREAM_GIFT_LEDGER_AVAILABLE_RELEASE_ENABLED=true",
      "STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_MODE=all_gates_passed",
      `releaseApproval=${RELEASE_APPROVAL_PHRASE_198U}`,
    ],
    stillForbidden: [
      "payout execution",
      "Wallet mutation",
      "provider call",
      "payment capture",
      "fake available balance",
      "fake delivered event",
    ],
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY,
  };
}

export function getStreamGiftLedgerSettlementReleaseRunbook198U(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "POST /api/admin/stream/gifts/ledger/198u/inspect with sendIntentId",
      "set STREAM_GIFT_LEDGER_AVAILABLE_RELEASE_ENABLED=true",
      "set STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_MODE=all_gates_passed",
      `POST /api/admin/stream/gifts/ledger/198u/release-attempt with releaseApproval=${RELEASE_APPROVAL_PHRASE_198U}`,
    ],
    note: "198U can release creator available balance only after all settlement gates pass. It never executes payout.",
    safety: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY,
  };
}

export function createStreamGiftLedgerPayoutReadinessRequest198U(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
    nextStage: "198V_creator_payout_readiness_guard",
    allowedNext: [
      "read available creator earning",
      "verify official creator eligibility",
      "verify KYC/KYB/AML/tax/admin/provider settlement gates",
      "prepare payout request contract",
    ],
    stillForbidden: [
      "automatic payout execution",
      "Wallet/provider payout without separate stage approval",
      "payout from delivery receipt",
      "fake available balance",
    ],
  };
}

export function assertStreamGiftLedgerSettlementReleaseGuard198URemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_SAFETY;
  const unsafe = [
    safety.deliveryReceiptAcceptedAsFinancialSettlementProof,
    safety.payoutExecutionAllowedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.fakeAvailableBalanceAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceOutputAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_UNSAFE_FLAG");
}
