export const STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-140W" as const;

export type StreamWriteRouteSurface =
  | "stream_live_session"
  | "stream_live_group_session"
  | "stream_audio_session"
  | "stream_game_broadcast"
  | "stream_video_broadcast"
  | "stream_short_video"
  | "stream_comment"
  | "stream_reaction"
  | "stream_follow"
  | "stream_report"
  | "stream_moderation_evidence"
  | "stream_creator_profile"
  | "stream_business_showcase"
  | "stream_official_creator_application";

export type StreamWriteRouteRiskClass =
  | "source_only"
  | "requires_auth"
  | "requires_owner_or_admin"
  | "requires_media_provider"
  | "requires_moderation_gate"
  | "requires_payment_wallet_gate"
  | "requires_compliance_gate"
  | "forbidden_until_provider_ready";

export type StreamWriteRouteApprovalGate = Readonly<{
  surface: StreamWriteRouteSurface;
  futureHttpMethod: "POST" | "PUT" | "PATCH" | "DELETE";
  futurePath: string;
  riskClass: StreamWriteRouteRiskClass;
  mountAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  requiresExplicitOwnerApprovalBeforeMount: true;
  requiresBackendSmokeBeforeMount: true;
  requiresAdminVisibilityBeforePublicLaunch: boolean;
  notes: string;
}>;

export type StreamWriteRouteApprovalGateSnapshot = Readonly<{
  version: typeof STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION;
  sourceOnly: true;
  routeMountAllowedNow: false;
  liveRuntimeBehaviorChanged: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  gates: readonly StreamWriteRouteApprovalGate[];
}>;

export const STREAM_WRITE_ROUTE_APPROVAL_GATES: readonly StreamWriteRouteApprovalGate[] = [
  {
    surface: "stream_live_session",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/live/sessions",
    riskClass: "requires_media_provider",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future live session create route. Must stay unmounted until provider, auth, moderation and lifecycle gates are ready.",
  },
  {
    surface: "stream_short_video",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/shorts",
    riskClass: "requires_media_provider",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future short upload/publish route. Must not fake upload or publish before real media storage/provider is configured.",
  },
  {
    surface: "stream_comment",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/comments",
    riskClass: "requires_moderation_gate",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future comment route. Requires abuse/profanity/report evidence handling and owner/user auth gates.",
  },
  {
    surface: "stream_reaction",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/reactions",
    riskClass: "requires_auth",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: false,
    notes: "Future reaction route. Requires authenticated idempotency and no fake counters.",
  },
  {
    surface: "stream_report",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/reports",
    riskClass: "requires_moderation_gate",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future report route. Requires audit/evidence retention and Admin review surfaces before public launch.",
  },
  {
    surface: "stream_creator_profile",
    futureHttpMethod: "PATCH",
    futurePath: "/api/stream/creator-profile",
    riskClass: "requires_owner_or_admin",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future creator profile route. Requires owner scope and no monetization claims before approval.",
  },
  {
    surface: "stream_official_creator_application",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/official-creator-applications",
    riskClass: "requires_compliance_gate",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future official streamer registration. Requires Admin approval and payout/compliance separation.",
  },
  {
    surface: "stream_business_showcase",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/business/showcase",
    riskClass: "requires_compliance_gate",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future Business Stream product showcase route. Must not create fake orders, fake income, or fake merchant provider success.",
  },
  {
    surface: "stream_moderation_evidence",
    futureHttpMethod: "POST",
    futurePath: "/api/stream/moderation/evidence",
    riskClass: "requires_moderation_gate",
    mountAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    requiresExplicitOwnerApprovalBeforeMount: true,
    requiresBackendSmokeBeforeMount: true,
    requiresAdminVisibilityBeforePublicLaunch: true,
    notes: "Future moderation evidence route. Requires retention/audit model before write route mount.",
  },
];

export function buildStreamWriteRouteApprovalGateSnapshot(): StreamWriteRouteApprovalGateSnapshot {
  return {
    version: STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION,
    sourceOnly: true,
    routeMountAllowedNow: false,
    liveRuntimeBehaviorChanged: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    gates: STREAM_WRITE_ROUTE_APPROVAL_GATES,
  };
}
