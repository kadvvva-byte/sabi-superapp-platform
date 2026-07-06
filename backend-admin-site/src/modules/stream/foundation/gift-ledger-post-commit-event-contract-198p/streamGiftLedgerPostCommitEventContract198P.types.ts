export const STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198P" as const;

export type StreamGiftLedgerPostCommitInspectionStatus198P =
  | "ready_for_post_commit_inspection"
  | "inspected_committed_ledger"
  | "inspection_not_found";

export type StreamGiftLedgerPostCommitEventContractSafety198P = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  realtimeEmitAllowedNow: false;
  mobileDeliveryAllowedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutAllowedNow: false;
  availableBalanceReleaseAllowedNow: false;
  fakeGiftDeliveredEventAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceOutputAllowed: false;
}>;

export type StreamGiftLedgerPostCommitInspectionInput198P = Readonly<{
  sendIntentId?: string;
  idempotencyKeyHash?: string;
  includeEventContract?: boolean;
}>;

export type StreamGiftLedgerPostCommitLedgerSummary198P = Readonly<{
  ledgerEntryCount: number;
  senderDebitAuthorizationCount: number;
  receiverPendingCreditCount: number;
  platformFeeReserveCount: number;
  grossDiamondMicrosFromLedger: string;
  receiverPendingDiamondMicrosFromLedger: string;
  platformFeeDiamondMicrosFromLedger: string;
}>;

export type StreamGiftLedgerPostCommitEarningSummary198P = Readonly<{
  creatorEarningCount: number;
  pendingDiamondMicros: string;
  availableDiamondMicros: "0";
  payoutEligible: false;
  payoutExecutionAllowed: false;
  status: "PENDING" | "HELD" | "BLOCKED" | string;
}>;

export type StreamGiftLedgerPostCommitSettlementSummary198P = Readonly<{
  settlementGateCount: number;
  pendingGateCount: number;
  payoutReleaseAllowedCount: 0;
  requiredGateKinds: readonly string[];
}>;

export type StreamGiftLedgerMobileRealtimeEventContract198P = Readonly<{
  eventName: "stream.gift.ledger.committed.v1";
  deliveryStatus: "contract_only_not_emitted";
  emitOnlyAfter: readonly ["ledger_committed", "provider_authorization_hash_present", "post_commit_inspection_passed"];
  payload: Readonly<{
    sendIntentId: string;
    context: string;
    senderUserId: string;
    receiverUserId: string;
    roomId?: string;
    conversationId?: string;
    giftCatalogItemId: string;
    giftKey?: string;
    giftTitle?: string;
    quantity: number;
    grossDiamondMicros: string;
    receiverPendingDiamondMicros: string;
    platformFeeDiamondMicros: string;
    receiverBalancePresentation: "pending_only";
    availableBalancePresentation: "hidden_until_settlement";
    payoutPresentation: "blocked_until_creator_settlement_gates_pass";
  }>;
  forbiddenPayloadFields: readonly string[];
}>;

export type StreamGiftLedgerPostCommitInspectionResult198P = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION;
  status: "inspected_committed_ledger";
  sendIntentId: string;
  context: string;
  senderUserId: string;
  receiverUserId: string;
  giftCatalogItemId: string;
  idempotencyKeyHashPresent: true;
  providerReferenceHashPresent: boolean;
  providerReferenceHashShape: "sha256_hex_64" | "missing_or_invalid_shape";
  providerReferenceHashPrinted: false;
  sendIntentStatus: string;
  quantity: number;
  grossDiamondMicros: string;
  receiverPendingDiamondMicros: string;
  platformFeeDiamondMicros: string;
  ledger: StreamGiftLedgerPostCommitLedgerSummary198P;
  earning: StreamGiftLedgerPostCommitEarningSummary198P;
  settlement: StreamGiftLedgerPostCommitSettlementSummary198P;
  eventContract?: StreamGiftLedgerMobileRealtimeEventContract198P;
  safety: StreamGiftLedgerPostCommitEventContractSafety198P;
}>;

export type StreamGiftLedgerPostCommitInspectionNotFound198P = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION;
  status: "inspection_not_found";
  code: "send_intent_not_found" | "inspection_selector_required";
  safety: StreamGiftLedgerPostCommitEventContractSafety198P;
}>;

export type StreamGiftLedgerPostCommitEventContractReadiness198P = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION;
  status: "ready_for_post_commit_inspection";
  safety: StreamGiftLedgerPostCommitEventContractSafety198P;
  routes: readonly string[];
  localRunner: string;
  inspectModels: readonly string[];
  eventContract: "stream.gift.ledger.committed.v1";
  next: "198Q_realtime_delivery_adapter_guarded_by_post_commit_inspection";
}>;

export type StreamGiftLedgerPostCommitNextRequest198P = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION;
  nextStage: "198Q_realtime_delivery_adapter_guarded_by_post_commit_inspection";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
