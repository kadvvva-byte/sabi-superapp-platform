export const PLAY_READY_27_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-27 controlled reviewer evidence center service planning source-only, use PLAY-READY-26 registry contract, no Admin UI mount, no runtime route mount, no backend restart, no DB write, no provider call, no wallet mutation, no money movement, no fake success.";

export type PlayReady27EvidenceCategory =
  | "privacy_account_deletion"
  | "ugc_report_block_moderation"
  | "ai_report_flag"
  | "provider_not_configured"
  | "billing_wallet_separation"
  | "financial_disclosure"
  | "reviewer_access_notes"
  | "sensitive_permission_evidence"
  | "https_production_readiness";

export type PlayReady27EvidenceReadiness =
  | "source_evidence_available"
  | "needs_manual_screenshot"
  | "needs_console_declaration"
  | "blocked_by_external_production_config";

export type PlayReady27ReviewerEvidenceItem = {
  readonly id: string;
  readonly category: PlayReady27EvidenceCategory;
  readonly title: string;
  readonly reviewerPurpose: string;
  readonly sourceEvidencePaths: readonly string[];
  readonly reviewerAnswerDraft: string;
  readonly manualEvidenceRequired: readonly string[];
  readonly playConsoleDeclarationRequired: boolean;
  readonly readiness: PlayReady27EvidenceReadiness;
  readonly mustStayHonest: readonly string[];
};

export const PLAY_READY_27_SERVICE_PLANNING_SCOPE = {
  version: "PLAY-READY-27",
  mode: "reviewer_evidence_center_service_planning_source_only",
  sourceOnly: true,
  adminUiMounted: false,
  runtimeRouteMounted: false,
  backendRestartAllowed: false,
  databaseWriteAllowed: false,
  providerCallAllowed: false,
  walletMutationAllowed: false,
  moneyMovementAllowed: false,
  fakeSuccessAllowed: false,
  basedOn: [
    "PLAY-READY-24C mobile config closure passed with warnings",
    "PLAY-READY-25 reviewer evidence center planning audit",
    "PLAY-READY-26 reviewer evidence registry contract",
  ],
} as const;

export const PLAY_READY_27_REVIEWER_EVIDENCE_ITEMS: readonly PlayReady27ReviewerEvidenceItem[] = [
  {
    id: "privacy_account_deletion_service_plan",
    category: "privacy_account_deletion",
    title: "Privacy policy and account deletion evidence service plan",
    reviewerPurpose: "Show where reviewers can verify privacy policy access and the account deletion path.",
    sourceEvidencePaths: [
      "app/legal/privacy.tsx",
      "app/profile/privacy/auto-delete.tsx",
      "src/modules/auth/presentation/auth.routes.ts",
      "src/modules/auth/presentation/auth.controller.ts",
    ],
    reviewerAnswerDraft: "Sabi exposes privacy policy and account deletion information in app legal/privacy and profile privacy screens. Backend account deletion remains an explicit user action and is not executed by AI automatically.",
    manualEvidenceRequired: ["Screenshot of privacy policy screen", "Screenshot of profile privacy/account deletion path", "Reviewer note with in-app navigation path"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_manual_screenshot",
    mustStayHonest: ["Do not claim deletion is automated by AI", "Do not mutate user data in evidence capture"],
  },
  {
    id: "ugc_report_block_moderation_service_plan",
    category: "ugc_report_block_moderation",
    title: "UGC report, block, and moderation evidence service plan",
    reviewerPurpose: "Show user-reporting, blocking, and Admin moderation evidence for Messenger, Stream, and user content surfaces.",
    sourceEvidencePaths: [
      "app/chat-report.tsx",
      "admin-ui/src/App.tsx",
      "admin-ui/src/types.ts",
      "admin-ui/src/admin-i18n.ts",
      "src/core/kernel/admin/moderation-queue.service.ts",
    ],
    reviewerAnswerDraft: "Sabi provides report/block actions for user content and moderation queues in Admin. Provider-backed moderation remains honest when a provider is not configured.",
    manualEvidenceRequired: ["Screenshot of report content flow", "Screenshot of block user flow", "Admin moderation evidence note"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_manual_screenshot",
    mustStayHonest: ["Do not claim real provider moderation if provider is not configured", "Do not bypass moderation queues"],
  },
  {
    id: "ai_report_flag_service_plan",
    category: "ai_report_flag",
    title: "AI report and flag evidence service plan",
    reviewerPurpose: "Show that AI responses can be reported or flagged and that AI provider failures do not use fake fallback answers.",
    sourceEvidencePaths: [
      "src/modules/ai/mobile/aiMobileI18n.ts",
      "src/modules/ai/mobile/screens/AiMobileChatScreen.tsx",
      "src/modules/ai/infrastructure/routes/ai-runtime.routes.ts",
      "src/modules/ai/infrastructure/routes/ai-assistant.routes.ts",
      "src/core/kernel/ai/ai-safety-admin.service.ts",
    ],
    reviewerAnswerDraft: "Sabi AI has report/flag copy and provider-gateway unavailable handling. Fake AI fallback is explicitly disallowed; unavailable providers surface honest unavailable states.",
    manualEvidenceRequired: ["Screenshot of AI report/flag action", "Screenshot or note for provider_not_configured/unavailable behavior"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_manual_screenshot",
    mustStayHonest: ["No fake AI answer fallback", "No client-side provider keys"],
  },
  {
    id: "provider_not_configured_service_plan",
    category: "provider_not_configured",
    title: "Provider not configured and no fake success evidence service plan",
    reviewerPurpose: "Show that unavailable providers are represented honestly and do not create fake success responses.",
    sourceEvidencePaths: [
      ".data/admin/provider-configs.json",
      "admin-ui/src/admin-i18n.ts",
      "admin-ui/src/types.ts",
      "src/modules/ai/infrastructure/routes/ai-provider-gateway.routes.ts",
      "src/modules/ai/infrastructure/routes/ai-runtime.routes.ts",
    ],
    reviewerAnswerDraft: "When providers are not configured, Sabi shows provider_not_configured or gateway unavailable states. Fake success is not allowed for AI, stream, wallet, or provider-backed functions.",
    manualEvidenceRequired: ["Screenshot of provider_not_configured state", "Reviewer note explaining no fake success behavior"],
    playConsoleDeclarationRequired: false,
    readiness: "source_evidence_available",
    mustStayHonest: ["Do not simulate provider success", "Do not hide provider_not_configured states"],
  },
  {
    id: "billing_wallet_separation_service_plan",
    category: "billing_wallet_separation",
    title: "Google Play billing versus Sabi Wallet separation service plan",
    reviewerPurpose: "Explain separation between Google Play digital goods billing and Sabi Wallet/payment/financial features.",
    sourceEvidencePaths: [
      "src/modules/play-ready/foundation/play-ready-2-billing-separation/playReady2BillingSeparation.ts",
      "src/modules/play-ready/foundation/play-ready-12-billing-wallet-entitlement-review/playReady12BillingWalletEntitlementReview.ts",
      "app/tabs/wallet.tsx",
      "app/wallet/index.tsx",
    ],
    reviewerAnswerDraft: "Sabi separates Play-billed digital entitlements from Wallet, QR, Coin, crypto, card, and merchant payment surfaces. Wallet and financial provider actions remain gated and must not be represented as Play billing.",
    manualEvidenceRequired: ["Reviewer note explaining billing separation", "Screenshots showing wallet/provider_not_configured when financial providers are unavailable"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_console_declaration",
    mustStayHonest: ["Do not route financial transactions through Play billing", "Do not fake money movement"],
  },
  {
    id: "financial_disclosure_service_plan",
    category: "financial_disclosure",
    title: "Financial feature disclosure evidence service plan",
    reviewerPurpose: "Document wallet, card, Coin, crypto, QR/pay, merchant, and financial feature disclosure state.",
    sourceEvidencePaths: [
      "src/modules/play-ready/foundation/play-ready-13-financial-features-nft-card-review/playReady13FinancialFeaturesNftCardReview.ts",
      "app/wallet/cards.tsx",
      "app/wallet/crypto.tsx",
      "app/qr/wallet.tsx",
      "app/wallet/financial-dashboard.tsx",
    ],
    reviewerAnswerDraft: "Sabi exposes financial feature surfaces with provider readiness boundaries. Provider integration, tokenization, money movement, wallet mutation, and merchant activation must remain disabled unless real providers and compliance gates are ready.",
    manualEvidenceRequired: ["Screenshots of financial disclosures", "Reviewer note for disabled/provider_not_configured financial states"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_console_declaration",
    mustStayHonest: ["No fake balances", "No fake tokenization", "No fake money movement"],
  },
  {
    id: "reviewer_access_notes_service_plan",
    category: "reviewer_access_notes",
    title: "Reviewer access notes service plan",
    reviewerPurpose: "Prepare reviewer credentials, feature navigation, and testing notes without exposing secrets in source.",
    sourceEvidencePaths: [
      "src/modules/play-ready/foundation/play-ready-4-console-documents/playReady4PlayConsoleDocuments.ts",
      "src/modules/play-ready/foundation/play-ready-15-admin-reviewer-evidence-center-planning/playReady15AdminReviewerEvidenceCenterPlanning.ts",
    ],
    reviewerAnswerDraft: "Reviewer notes should explain how to reach AI, Messenger reporting, Stream, Wallet, QR, privacy, and provider_not_configured states. Credentials and secrets must be provided only through secure Play Console channels, not committed to source.",
    manualEvidenceRequired: ["Reviewer access note draft", "Test account credentials prepared outside source", "Navigation checklist"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_manual_screenshot",
    mustStayHonest: ["Do not commit reviewer passwords", "Do not include API keys in mobile"],
  },
  {
    id: "sensitive_permissions_service_plan",
    category: "sensitive_permission_evidence",
    title: "Sensitive permission evidence service plan",
    reviewerPurpose: "Map camera, microphone, location, calls, notifications, overlay, and full-screen intent to user-facing feature needs and declarations.",
    sourceEvidencePaths: [
      "app.json",
      "src/modules/play-ready/foundation/play-ready-14-permission-target-sdk-aab-planning/playReady14PermissionTargetSdkAabPlanning.ts",
    ],
    reviewerAnswerDraft: "Sabi requests sensitive permissions for camera/video calls/stream capture, microphone/voice/calls/streams, location sharing/nearby features, call handling, notifications, and related communication features. Each permission needs reviewer-facing reason and matching Play Console declaration.",
    manualEvidenceRequired: ["Permission declaration notes", "Screenshots of permission-triggering features", "Full-screen/call permission justification if retained"],
    playConsoleDeclarationRequired: true,
    readiness: "needs_console_declaration",
    mustStayHonest: ["Remove unneeded permissions before public release", "Do not request permissions without user-facing feature need"],
  },
  {
    id: "https_production_readiness_service_plan",
    category: "https_production_readiness",
    title: "HTTPS production readiness evidence service plan",
    reviewerPurpose: "Track closure of cleartext traffic and production domain/API env readiness before public Play release.",
    sourceEvidencePaths: [
      "app.json",
      "eas.json",
      ".env.production",
      "src/shared/network/sabiApiBaseUrl.ts",
    ],
    reviewerAnswerDraft: "Mobile config closure passed for SDK and mojibake. HTTPS/domain and production EAS env closure remain separate production readiness work before public release if backend endpoints are not already HTTPS.",
    manualEvidenceRequired: ["Production HTTPS domain proof", "EAS production env checklist", "Post-HTTPS local config audit"],
    playConsoleDeclarationRequired: false,
    readiness: "blocked_by_external_production_config",
    mustStayHonest: ["Do not claim HTTPS closure while cleartext remains enabled", "Do not print env secrets in reports"],
  },
];

export const PLAY_READY_27_REVIEWER_EVIDENCE_SERVICE_PLAN = {
  scope: PLAY_READY_27_SERVICE_PLANNING_SCOPE,
  items: PLAY_READY_27_REVIEWER_EVIDENCE_ITEMS,
  serviceResponsibilities: [
    "Aggregate reviewer evidence registry items into a stable Admin-facing model.",
    "Keep evidence honest and distinguish source evidence from required manual screenshots.",
    "Expose provider_not_configured and blocked production config states without fake success.",
    "Avoid runtime mounting until a later approved Admin/API stage.",
  ],
  nextRecommendedStage: "PLAY-READY-28 source-only reviewer evidence center Admin API contract planning",
} as const;

export function getPlayReady27ReviewerEvidenceCenterServicePlanning() {
  return PLAY_READY_27_REVIEWER_EVIDENCE_SERVICE_PLAN;
}

export function getPlayReady27ReviewerEvidenceItemById(id: string) {
  return PLAY_READY_27_REVIEWER_EVIDENCE_ITEMS.find((item) => item.id === id) || null;
}
