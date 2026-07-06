export const STREAM_FOUNDATION_141P_MODERATION_POLICY_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-141P" as const;

export type StreamFoundation141PModerationRuleId =
  | "minimum_age_gate"
  | "adult_content_gate"
  | "profanity_abuse_gate"
  | "hate_harassment_gate"
  | "report_evidence_gate"
  | "streamer_status_gate"
  | "admin_review_gate"
  | "safe_locale_message_gate";

export type StreamFoundation141PModerationRuleStatus =
  | "contract_planned_not_enabled"
  | "runtime_mount_blocked"
  | "admin_review_required"
  | "owner_approval_required";

export interface StreamFoundation141PModerationRule {
  readonly id: StreamFoundation141PModerationRuleId;
  readonly status: StreamFoundation141PModerationRuleStatus;
  readonly requiredBeforeRuntimeMount: true;
  readonly liveStartGate: boolean;
  readonly liveStopGate: boolean;
  readonly heartbeatGate: boolean;
  readonly adminReviewRequiredBeforeRuntime: boolean;
  readonly runtimeSuccessAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly description: string;
}

export interface StreamFoundation141PModerationPolicyGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_141P_MODERATION_POLICY_GATE_VERSION;
  readonly stage: "moderation_policy_gate_source_only_contract_planning";
  readonly status: "moderation_policy_contract_planned_routes_remain_blocked";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-141O";
  readonly moderationRules: readonly StreamFoundation141PModerationRule[];
  readonly policySummary: {
    readonly ageGateRequiredBeforeRuntime: true;
    readonly adultContentPolicyRequiredBeforeRuntime: true;
    readonly profanityAndAbuseControlRequiredBeforeRuntime: true;
    readonly reportEvidenceRequiredBeforeRuntime: true;
    readonly adminReviewRequiredBeforeRuntime: true;
    readonly safeI18nMessageKeyRequiredBeforeRuntime: true;
    readonly noDecorativeStarPolicyPreserved: true;
    readonly routesStayBlockedNow: true;
    readonly expectedCurrentStatusCode: 423;
  };
  readonly totals: {
    readonly moderationRules: 8;
    readonly readyForRuntimeMountNow: 0;
    readonly adminReviewRequiredRules: 5;
    readonly runtimeSuccessAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowedNow: 0;
  };
  readonly safety: {
    readonly sourceOnly141P: true;
    readonly appTsChangeBy141P: false;
    readonly serverTsChangeBy141P: false;
    readonly streamIndexChangeBy141P: false;
    readonly backendRestartBy141P: false;
    readonly runtimeHttpBy141P: false;
    readonly runtimePostBy141P: false;
    readonly databaseWriteBy141P: false;
    readonly providerCallBy141P: false;
    readonly walletMutationBy141P: false;
    readonly paymentAuthorizationBy141P: false;
    readonly monthlyPayoutBy141P: false;
    readonly moneyMovementBy141P: false;
    readonly fakeSuccessBy141P: false;
  };
}
