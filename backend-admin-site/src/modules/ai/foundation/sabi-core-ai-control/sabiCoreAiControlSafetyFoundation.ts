export const SABI_CORE_MONETIZATION_100G_VERSION = "SABI-CORE-MONETIZATION-100G" as const;

export type SabiCoreAiControlLaneKey =
  | "ai_admin_diagnostics"
  | "ai_stream_moderation"
  | "ai_messenger_safety"
  | "ai_creator_tools"
  | "ai_business_helper"
  | "ai_review_evidence";

export type SabiCoreAiControlStatus =
  | "foundation_ready"
  | "safe_disabled_provider"
  | "manual_review_required"
  | "waiting_policy_evidence";

export type SabiCoreAiSafetyGate = Readonly<{
  providerSecretsServerSideOnly: true;
  mobileSecretsAllowed: false;
  rawSecretOutputAllowed: false;
  rawPromptOutputAllowed: false;
  rawUserPrivateDataOutputAllowed: false;
  providerCallAllowedNow: false;
  trainingDataWriteAllowedNow: false;
  moderationActionAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminManualApprovalRequiredForHighRiskActions: true;
  userReportAndFlaggingRequired: true;
  abuseProfanityAndAdultSafetyRequired: true;
  generatedContentPolicyEvidenceRequired: true;
}>;

export type SabiCoreAiControlLane = Readonly<{
  key: SabiCoreAiControlLaneKey;
  title: string;
  status: SabiCoreAiControlStatus;
  safetyGate: SabiCoreAiSafetyGate;
  connectedSabiCoreAreas: readonly (
    | "stream"
    | "messenger"
    | "wallet"
    | "google_billing"
    | "airwallex"
    | "gifts"
    | "paid_games"
    | "play_review"
  )[];
  notes: readonly string[];
}>;

const BASE_AI_SAFETY_GATE: SabiCoreAiSafetyGate = {
  providerSecretsServerSideOnly: true,
  mobileSecretsAllowed: false,
  rawSecretOutputAllowed: false,
  rawPromptOutputAllowed: false,
  rawUserPrivateDataOutputAllowed: false,
  providerCallAllowedNow: false,
  trainingDataWriteAllowedNow: false,
  moderationActionAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminManualApprovalRequiredForHighRiskActions: true,
  userReportAndFlaggingRequired: true,
  abuseProfanityAndAdultSafetyRequired: true,
  generatedContentPolicyEvidenceRequired: true,
};

export const SABI_CORE_100G_AI_CONTROL_LANES: readonly SabiCoreAiControlLane[] = [
  {
    key: "ai_admin_diagnostics",
    title: "Sabi AI Admin diagnostics",
    status: "foundation_ready",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["stream", "wallet", "google_billing", "airwallex", "gifts", "paid_games", "play_review"],
    notes: [
      "AI diagnostics is a core Sabi control layer for readiness, risk and blocker explanations.",
      "It cannot expose secrets, raw purchase tokens, raw provider proofs, card data, private prompts or private user data.",
    ],
  },
  {
    key: "ai_stream_moderation",
    title: "Sabi AI Stream moderation",
    status: "manual_review_required",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["stream", "gifts", "paid_games", "play_review"],
    notes: [
      "AI flags stream abuse, profanity, adult risk, spam, scam and gambling-risk content for Admin review.",
      "No automatic high-risk punishment or money-affecting action is enabled in this source-only stage.",
    ],
  },
  {
    key: "ai_messenger_safety",
    title: "Sabi AI Messenger safety",
    status: "foundation_ready",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["messenger", "wallet", "play_review"],
    notes: [
      "AI safety supports Messenger reporting, abuse detection and policy evidence.",
      "Private message content must not be printed into Admin reports without safe redaction and explicit policy controls.",
    ],
  },
  {
    key: "ai_creator_tools",
    title: "Sabi AI creator tools",
    status: "waiting_policy_evidence",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["stream", "gifts", "google_billing", "play_review"],
    notes: [
      "Creator AI tools require user report/flagging and offensive generated content controls before public rollout.",
      "Premium AI creator tools on Android are digital services and must use Google Billing where policy requires it.",
    ],
  },
  {
    key: "ai_business_helper",
    title: "Sabi AI business helper",
    status: "safe_disabled_provider",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["wallet", "airwallex", "play_review"],
    notes: [
      "Business helper can explain KYB/KYC/provider readiness but cannot approve merchants, move money or reveal provider secrets.",
      "Airwallex and bank/provider runtime remain disabled until real provider onboarding and owner-approved gates.",
    ],
  },
  {
    key: "ai_review_evidence",
    title: "Sabi AI Play review evidence",
    status: "foundation_ready",
    safetyGate: BASE_AI_SAFETY_GATE,
    connectedSabiCoreAreas: ["play_review", "google_billing", "stream", "messenger"],
    notes: [
      "AI helps build reviewer evidence for policy readiness, not fake approvals.",
      "Evidence must show safe-disabled states, billing separation, report/flagging controls and no fake money movement.",
    ],
  },
] as const;

export const SABI_CORE_100G_AI_HARD_RULES = Object.freeze({
  aiIsCoreProjectLayer: true,
  providerSecretsServerSideOnly: true,
  noMobileSecrets: true,
  noRawSecretOutput: true,
  noRawPromptOutput: true,
  noRawUserPrivateDataOutput: true,
  noProviderCallInFoundation: true,
  noTrainingDataWriteInFoundation: true,
  noMoneyMovementFromAi: true,
  noAutomaticHighRiskAdminAction: true,
  userReportAndFlaggingRequiredForGeneratedContent: true,
  abuseProfanityAdultSafetyRequired: true,
  digitalAiPremiumMustRespectGoogleBillingOnAndroid: true,
});

export function getSabiCore100GAiControlSafetySnapshot() {
  const lanes = SABI_CORE_100G_AI_CONTROL_LANES.map((lane) => ({
    ...lane,
    safetyGate: { ...lane.safetyGate },
    connectedSabiCoreAreas: [...lane.connectedSabiCoreAreas],
    notes: [...lane.notes],
  }));

  const blockedUnsafeActions = lanes.flatMap((lane) => [
    lane.safetyGate.mobileSecretsAllowed ? "mobile_secrets" : null,
    lane.safetyGate.rawSecretOutputAllowed ? "raw_secret_output" : null,
    lane.safetyGate.rawPromptOutputAllowed ? "raw_prompt_output" : null,
    lane.safetyGate.rawUserPrivateDataOutputAllowed ? "raw_user_private_data_output" : null,
    lane.safetyGate.providerCallAllowedNow ? "provider_call" : null,
    lane.safetyGate.trainingDataWriteAllowedNow ? "training_data_write" : null,
    lane.safetyGate.moderationActionAllowedNow ? "moderation_runtime_action" : null,
    lane.safetyGate.moneyMovementAllowedNow ? "money_movement" : null,
  ]).filter((item): item is string => Boolean(item));

  return {
    version: SABI_CORE_MONETIZATION_100G_VERSION,
    status: "ai_core_control_safety_foundation_ready" as const,
    ok: true,
    lanes,
    hardRules: { ...SABI_CORE_100G_AI_HARD_RULES },
    aiProviderRuntimeEnabled: false,
    aiTrainingRuntimeEnabled: false,
    aiGeneratedContentRuntimeEnabled: false,
    moderationRuntimeEnabled: false,
    moneyMovementReady: false,
    blockedUnsafeActions,
    nextRequiredStages: [
      "SABI-CORE-MONETIZATION-100H Play Review Evidence Center",
      "SABI-CORE-MONETIZATION-100I Final foundation verification",
    ],
  };
}

export function assertSabiCore100GAiSafetyLocked() {
  const snapshot = getSabiCore100GAiControlSafetySnapshot();
  const unsafeLane = snapshot.lanes.find((lane) => (
    lane.safetyGate.mobileSecretsAllowed !== false ||
    lane.safetyGate.rawSecretOutputAllowed !== false ||
    lane.safetyGate.rawPromptOutputAllowed !== false ||
    lane.safetyGate.rawUserPrivateDataOutputAllowed !== false ||
    lane.safetyGate.providerCallAllowedNow !== false ||
    lane.safetyGate.trainingDataWriteAllowedNow !== false ||
    lane.safetyGate.moderationActionAllowedNow !== false ||
    lane.safetyGate.moneyMovementAllowedNow !== false
  ));

  return {
    passed: !unsafeLane && snapshot.blockedUnsafeActions.length === 0,
    unsafeLaneKey: unsafeLane?.key ?? null,
    aiProviderRuntimeEnabled: snapshot.aiProviderRuntimeEnabled,
    aiTrainingRuntimeEnabled: snapshot.aiTrainingRuntimeEnabled,
    aiGeneratedContentRuntimeEnabled: snapshot.aiGeneratedContentRuntimeEnabled,
    moderationRuntimeEnabled: snapshot.moderationRuntimeEnabled,
    moneyMovementReady: snapshot.moneyMovementReady,
  };
}
