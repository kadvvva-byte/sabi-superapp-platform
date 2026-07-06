export const PLAY_READY_26_VERSION = "PLAY-READY-26" as const;

export const PLAY_READY_26_OWNER_APPROVAL_TEXT =
  "I approve PLAY-READY-26 controlled reviewer evidence registry contract source-only, create registry contract only, no runtime mount, no Admin UI build, no backend restart, no DB write, no provider calls, no wallet mutation, no money movement.";

export type PlayReady26EvidenceCategory =
  | "privacy_account_deletion"
  | "ugc_report_block_moderation"
  | "ai_report_flag"
  | "provider_not_configured_no_fake_success"
  | "billing_wallet_separation"
  | "financial_disclosure"
  | "reviewer_access_notes"
  | "sensitive_permissions"
  | "https_production_readiness";

export type PlayReady26EvidenceStatus =
  | "candidate_found"
  | "needs_manual_screenshot"
  | "needs_play_console_text"
  | "needs_production_config"
  | "ready_for_reviewer_center";

export type PlayReady26EvidenceRegistryItem = {
  readonly id: string;
  readonly category: PlayReady26EvidenceCategory;
  readonly title: string;
  readonly reviewerPurpose: string;
  readonly currentCandidateSignals: readonly string[];
  readonly requiredManualProof: readonly string[];
  readonly playConsoleDeclarationNotes: readonly string[];
  readonly riskIfMissing: string;
  readonly status: PlayReady26EvidenceStatus;
};

export const PLAY_READY_26_REVIEWER_EVIDENCE_REGISTRY: readonly PlayReady26EvidenceRegistryItem[] = [
  {
    id: "privacy_account_deletion",
    category: "privacy_account_deletion",
    title: "Privacy policy and account deletion",
    reviewerPurpose: "Show that the app exposes privacy policy access and a user-facing account deletion path.",
    currentCandidateSignals: [
      "app/legal/privacy.tsx",
      "app/profile/privacy/auto-delete.tsx",
      "src/modules/auth/presentation/auth.routes.ts",
      "src/modules/play-ready/foundation/play-ready-8-privacy-account-deletion-patch-review"
    ],
    requiredManualProof: [
      "Screenshot: privacy policy screen",
      "Screenshot: delete account entry path",
      "Reviewer note: AI cannot delete accounts automatically"
    ],
    playConsoleDeclarationNotes: [
      "Data Safety: account deletion request path must match app-visible path",
      "Privacy Policy URL must be public and reachable"
    ],
    riskIfMissing: "Google Play may reject the app for missing privacy/account deletion evidence.",
    status: "candidate_found"
  },
  {
    id: "ugc_report_block_moderation",
    category: "ugc_report_block_moderation",
    title: "UGC report, block, and moderation",
    reviewerPurpose: "Show report/block controls, moderation queue, and anti-abuse review capabilities.",
    currentCandidateSignals: [
      "app/chat-report.tsx",
      "admin-ui/src/types.ts",
      "admin-ui/src/App.tsx",
      "src/core/kernel/admin/moderation-queue.service.ts"
    ],
    requiredManualProof: [
      "Screenshot: report user/content action",
      "Screenshot: block user action",
      "Screenshot: Admin moderation review surface"
    ],
    playConsoleDeclarationNotes: [
      "Explain user-generated content moderation and blocking workflow",
      "Explain that reports do not create fake provider success"
    ],
    riskIfMissing: "UGC policy review may fail without visible reporting and moderation evidence.",
    status: "candidate_found"
  },
  {
    id: "ai_report_flag",
    category: "ai_report_flag",
    title: "AI report and flag safety",
    reviewerPurpose: "Show users can report AI responses and that AI provider fallback is honest when unavailable.",
    currentCandidateSignals: [
      "src/modules/ai/mobile/aiMobileI18n.ts",
      "src/modules/ai/mobile/screens/AiMobileChatScreen.tsx",
      "src/modules/ai/infrastructure/routes/ai-runtime.routes.ts",
      "src/modules/play-ready/foundation/play-ready-9-ai-report-flag-patch-review"
    ],
    requiredManualProof: [
      "Screenshot: report AI response action",
      "Screenshot: AI provider unavailable / provider_not_configured state",
      "Reviewer note: fake AI fallback is not allowed"
    ],
    playConsoleDeclarationNotes: [
      "AI generated content: disclose reporting path",
      "No fake answer fallback when provider is unavailable"
    ],
    riskIfMissing: "AI review may fail without report/flag and provider honesty evidence.",
    status: "candidate_found"
  },
  {
    id: "provider_not_configured_no_fake_success",
    category: "provider_not_configured_no_fake_success",
    title: "Provider not configured / no fake success",
    reviewerPurpose: "Show disabled provider states are honest and do not simulate successful payments, AI, stream, or wallet provider behavior.",
    currentCandidateSignals: [
      ".data/admin/provider-configs.json",
      "admin-ui/src/admin-i18n.ts",
      "admin-ui/src/types.ts",
      "src/modules/ai/infrastructure/routes/ai-assistant.routes.ts"
    ],
    requiredManualProof: [
      "Screenshot: provider_not_configured state",
      "Reviewer note: no provider calls are made when provider is missing",
      "Evidence: fakeSuccessAllowed false where applicable"
    ],
    playConsoleDeclarationNotes: [
      "Explain which features are disabled until providers are configured",
      "Avoid claiming live financial/provider features before approval"
    ],
    riskIfMissing: "Reviewer may interpret placeholders as misleading/fake functionality.",
    status: "candidate_found"
  },
  {
    id: "billing_wallet_separation",
    category: "billing_wallet_separation",
    title: "Billing vs wallet separation",
    reviewerPurpose: "Show Google Play billing items are separated from wallet, money movement, provider settlement, and financial rails.",
    currentCandidateSignals: [
      "src/modules/play-ready/foundation/play-ready-12-billing-wallet-entitlement-review",
      "app/tabs/wallet.tsx",
      "app/wallet/index.tsx",
      "app/wallet/coin/index.tsx"
    ],
    requiredManualProof: [
      "Screenshot: billing disclosure",
      "Screenshot: wallet provider disabled state where relevant",
      "Reviewer note: no fake money movement"
    ],
    playConsoleDeclarationNotes: [
      "Clarify what uses Google Play Billing and what is external financial provider flow",
      "Do not enable wallet money movement without licensed provider configuration"
    ],
    riskIfMissing: "Billing policy review may fail if wallet and Play Billing are unclear.",
    status: "candidate_found"
  },
  {
    id: "financial_disclosure",
    category: "financial_disclosure",
    title: "Financial, NFT, tokenized asset, and virtual card disclosure",
    reviewerPurpose: "Show risky financial features are disclosed, safe-disabled where providers are missing, and not advertised as live money movement.",
    currentCandidateSignals: [
      "src/modules/play-ready/foundation/play-ready-13-financial-features-nft-card-review",
      "app/wallet/cards.tsx",
      "app/wallet/crypto.tsx",
      "app/wallet/financial-dashboard.tsx"
    ],
    requiredManualProof: [
      "Screenshot: provider disabled financial feature",
      "Screenshot: crypto/tokenized asset disclosure",
      "Reviewer note: no raw card/PAN/CVV storage and no fake transaction success"
    ],
    playConsoleDeclarationNotes: [
      "Financial features require provider/compliance readiness",
      "State unavailable features honestly until configured"
    ],
    riskIfMissing: "Financial policy review may fail for unclear money/crypto/card behavior.",
    status: "candidate_found"
  },
  {
    id: "reviewer_access_notes",
    category: "reviewer_access_notes",
    title: "Reviewer credentials and access notes",
    reviewerPurpose: "Prepare exact notes for Play reviewers so they can reach privacy, UGC, AI, wallet disclosures, and disabled provider states.",
    currentCandidateSignals: [
      "src/modules/play-ready/foundation/play-ready-4-console-documents",
      "src/modules/play-ready/foundation/play-ready-15-admin-reviewer-evidence-center-planning",
      "src/modules/play-ready/foundation/play-ready-16-implementation-readiness-handoff"
    ],
    requiredManualProof: [
      "Reviewer test account credentials or demo access flow",
      "Navigation steps to sensitive evidence surfaces",
      "Known limitations: provider_not_configured and HTTPS/domain pending if still true"
    ],
    playConsoleDeclarationNotes: [
      "Use plain reviewer instructions",
      "Avoid exposing real admin secrets or provider keys"
    ],
    riskIfMissing: "Reviewer may be unable to find evidence and reject due inaccessible feature claims.",
    status: "needs_play_console_text"
  },
  {
    id: "sensitive_permissions",
    category: "sensitive_permissions",
    title: "Sensitive Android permissions evidence",
    reviewerPurpose: "Explain camera, microphone, location, notifications, call, telecom, overlay, and full-screen intent permissions.",
    currentCandidateSignals: [
      "app.json",
      "src/modules/play-ready/foundation/play-ready-14-permission-target-sdk-aab-planning",
      "PLAY-READY-24C mobile config closure report"
    ],
    requiredManualProof: [
      "Screenshot: call incoming screen / full-screen intent reason",
      "Screenshot: camera/mic usage in calls or streams",
      "Screenshot: location sharing or nearby feature explanation"
    ],
    playConsoleDeclarationNotes: [
      "Declare only permissions actually used",
      "Explain full-screen intent as calling feature, not ads or general interruption"
    ],
    riskIfMissing: "Permissions review may fail for high-risk permissions.",
    status: "needs_manual_screenshot"
  },
  {
    id: "https_production_readiness",
    category: "https_production_readiness",
    title: "HTTPS production readiness",
    reviewerPurpose: "Track that public Play release should use HTTPS/domain and avoid broad cleartext production traffic.",
    currentCandidateSignals: [
      "PLAY-READY-24C warning: cleartext remains enabled",
      "PLAY-READY-24C warning: EAS production env is empty"
    ],
    requiredManualProof: [
      "Production API domain with HTTPS",
      "EAS production env proof without secrets",
      "Cleartext closure evidence or a narrowly justified exception"
    ],
    playConsoleDeclarationNotes: [
      "Do not include secrets in reviewer notes",
      "If HTTP remains for testing, public release should stay blocked until HTTPS is ready"
    ],
    riskIfMissing: "Security/privacy review may flag broad cleartext traffic or missing production endpoint evidence.",
    status: "needs_production_config"
  }
] as const;

export function getPlayReady26ReviewerEvidenceRegistryContract() {
  return {
    version: PLAY_READY_26_VERSION,
    ownerApprovalText: PLAY_READY_26_OWNER_APPROVAL_TEXT,
    registry: PLAY_READY_26_REVIEWER_EVIDENCE_REGISTRY,
    totalItems: PLAY_READY_26_REVIEWER_EVIDENCE_REGISTRY.length,
    sourceOnly: true,
    runtimeMounted: false,
    adminUiBuildRequiredNow: false,
    backendRestartRequiredNow: false,
    dbWriteAllowed: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false
  } as const;
}
