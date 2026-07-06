export const PLAY_READY_6_VERSION = "PLAY-READY-6" as const;

export const PLAY_READY_6_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-6 controlled app/backend compliance gate target detection and gap audit source-only, use PLAY-READY-5 compliance gate implementation planning to inspect future target locations for privacy links, account deletion, AI report/flag, UGC report/block, permission rationales, provider_not_configured, billing-vs-wallet separation, financial features, target SDK/AAB checks, and reviewer evidence, without modifying target files, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_6_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_7 = "I approve PLAY-READY-7 controlled compliance gate gap-closure implementation package planning source-only, use PLAY-READY-6 target detection and gap audit to draft exact future changed-file package plans for privacy policy link, account deletion, AI report/flag, UGC report/block, permission rationales, provider_not_configured, billing-vs-wallet separation, financial features, target SDK/AAB checks, and reviewer evidence, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady6GateId =
  | "privacy_policy_link_gate"
  | "account_deletion_gate"
  | "ai_report_flag_gate"
  | "ugc_report_block_gate"
  | "permission_rationale_gate"
  | "provider_not_configured_gate"
  | "billing_vs_wallet_separation_gate"
  | "financial_features_gate"
  | "target_sdk_aab_release_gate"
  | "reviewer_evidence_gate";

export type PlayReady6GapSeverity = "critical_before_submission" | "high_before_closed_testing" | "medium_before_production";

export interface PlayReady6DetectedGateTarget {
  readonly gateId: PlayReady6GateId;
  readonly severity: PlayReady6GapSeverity;
  readonly observedMobileCandidates: readonly string[];
  readonly observedBackendCandidates: readonly string[];
  readonly detectedFromUploadedArchives: readonly string[];
  readonly gap: string;
  readonly futureAction: string;
  readonly targetFilesModifiedNow: false;
  readonly backendRestartNow: false;
  readonly runtimeDbWriteNow: false;
  readonly providerCallNow: false;
  readonly walletMutationNow: false;
  readonly paymentAuthorizationNow: false;
  readonly moneyMovementNow: false;
  readonly fakeSuccessNow: false;
}

const DETECTED_GATE_TARGETS: readonly PlayReady6DetectedGateTarget[] = [

  {
    gateId: "privacy_policy_link_gate",
    severity: "high_before_closed_testing",
    observedMobileCandidates: ["app/legal/privacy.tsx", "app/privacy.tsx", "app/profile/privacy.tsx", "app/profile/privacy/[slug].tsx", "src/modules/profile/components/PrivacyDetailScreen.tsx", "src/modules/profile/data/privacy.ts", "src/modules/profile/routes/ProfilePrivacyRoute.tsx"],
    observedBackendCandidates: [],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "public URL and final legal entity/provider text still need finalization",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "account_deletion_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: ["app/profile/privacy/auto-delete.tsx"],
    observedBackendCandidates: [],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "in-app candidate exists, but web deletion URL and backend request/intake target were not confirmed in uploaded source archives",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "ai_report_flag_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: ["app/ai/chat.tsx", "app/ai/settings.tsx", "app/ai/premium.tsx", "app/ai/translation.tsx", "src/modules/ai/mobile/screens/AiMobileChatScreen.tsx", "src/modules/ai/mobile/screens/AiMobileSettingsScreen.tsx", "src/modules/ai/mobile/screens/AiMobilePremiumScreen.tsx"],
    observedBackendCandidates: ["src/core/kernel/ai/ai-consent.service.ts", "src/core/kernel/ai/ai-provider-registry.service.ts", "src/core/kernel/ai/ai-safety-admin.service.ts", "src/modules/ai/infrastructure/routes/ai-safety-admin.routes.ts", "src/modules/ai/infrastructure/routes/ai-provider-gateway.routes.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "explicit user-facing report/flag AI response action and backend/admin report intake still require target implementation planning",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "ugc_report_block_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: ["app/chat-report.tsx", "app/profile/privacy/blocked.tsx", "app/stream.tsx", "src/modules/messenger/chat-room/ChatRoomReportScreen.tsx", "src/modules/messenger/chat-room/reportRuntime.ts", "src/modules/messenger/groups/groupModerationRuntime.ts"],
    observedBackendCandidates: ["src/core/kernel/admin/moderation-queue.service.ts", "src/core/kernel/platform/stream-safety-policy.service.ts", "src/modules/stream/foundation/core/streamFoundationGatePolicy.ts", "src/modules/stream/foundation/core/streamFoundationSafetyAudit.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "Stream live/short report content, report user, block user, and admin intake need exact target closure plan",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "permission_rationale_gate",
    severity: "high_before_closed_testing",
    observedMobileCandidates: ["src/modules/calls/native/overlayPermission.ts", "src/modules/calls/native/OverlayPermissionCard.tsx", "app/camera.tsx", "app/calls/audio.tsx", "app/calls/video.tsx"],
    observedBackendCandidates: [],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "project root Android/Expo permission config was not present in uploaded source-only archives; needs local target detection",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "provider_not_configured_gate",
    severity: "high_before_closed_testing",
    observedMobileCandidates: ["src/modules/ai/mobile/aiMobileApi.ts", "src/modules/ai/mobile/useAiMobileSnapshot.ts", "src/modules/stream/admin/stream108nLaunchControlCenter.ts"],
    observedBackendCandidates: ["src/core/kernel/ai/ai-provider-registry.service.ts", "src/core/kernel/ai/ai-provider-router.service.ts", "src/core/kernel/ai/ai-provider-settings.service.ts", "src/core/kernel/ai/providers/yandex-gpt.provider.ts", "src/core/kernel/ai/providers/google-search.provider.ts", "src/core/kernel/ai/providers/google-translation.provider.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "provider gate candidates exist, but unified Play-ready provider_not_configured reviewer evidence still needs closure plan",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "billing_vs_wallet_separation_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: ["app/ai/premium.tsx", "app/profile/premium.tsx", "app/wallet/coin/topup.tsx", "app/wallet/coin/diamonds.tsx", "app/qr/messenger-payment.tsx", "app/qr/wallet-payment.tsx", "src/modules/ai/mobile/aiMobileEntitlements.ts", "src/modules/messenger/gifts/StreamGiftSendBridge.ts"],
    observedBackendCandidates: ["src/core/kernel/premium/premium.service.ts", "src/core/kernel/premium/feature-catalog.ts", "src/core/contracts/wallet-payment-execution.port.ts", "src/modules/fraud/payment-fraud.listener.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "Google Play Billing adapter, purchase token verification, entitlement ledger, and Wallet bypass block need exact implementation package plan",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "financial_features_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: ["app/wallet/virtual-card.tsx", "app/wallet/virtual-card-qr.tsx", "app/qr/virtual-card-payment.tsx", "app/wallet/crypto.tsx", "app/wallet/crypto/buy.tsx", "app/wallet/crypto/sell.tsx"],
    observedBackendCandidates: ["src/core/contracts/wallet-payment-execution.port.ts", "src/modules/business-banking/business-banking.contracts.ts", "src/modules/business-banking/business-banking.service.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "Play financial features declaration, tokenized asset disclosure, no fake card issuing, and no raw PAN/CVV evidence need closure plan",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "target_sdk_aab_release_gate",
    severity: "critical_before_submission",
    observedMobileCandidates: [],
    observedBackendCandidates: [],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "app.json/app.config/build.gradle/eas.json/package root files were not present in inspected source-only archives; must inspect local project root before AAB stage",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  },
  {
    gateId: "reviewer_evidence_gate",
    severity: "high_before_closed_testing",
    observedMobileCandidates: ["app/legal/privacy.tsx", "app/profile/privacy/auto-delete.tsx", "app/chat-report.tsx", "app/profile/privacy/blocked.tsx", "app/ai/chat.tsx", "app/stream.tsx"],
    observedBackendCandidates: ["src/modules/admin/admin.routes.ts", "src/core/kernel/admin/moderation-queue.service.ts", "src/core/kernel/ai/ai-safety-admin.service.ts"],
    detectedFromUploadedArchives: ["src.zip", "app.zip", "src (2).zip"],
    gap: "Admin/Play readiness evidence page and screenshot checklist need future implementation package plan",
    futureAction: "Draft exact future changed-file package plan in PLAY-READY-7 before any target file write.",
    targetFilesModifiedNow: false,
    backendRestartNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
  }
];

export const PLAY_READY_6_TARGET_DETECTION_GAP_AUDIT = {
  version: PLAY_READY_6_VERSION,
  stage: "controlled_app_backend_compliance_gate_target_detection_and_gap_audit_source_only",
  status: "target_detection_gap_audit_ready_for_gap_closure_package_planning",
  sourceOnly: true,
  sourceArchivesInspectedForPlanningContext: [
    "src.zip mobile source archive",
    "app.zip Expo/router app archive",
    "src (2).zip backend source archive",
  ],
  uploadedArchiveContextNote:
    "Detection is based on available uploaded source archives and remains planning evidence only. The user's local project root must still be inspected before target writes, build config edits, AAB, or Play submission.",
  detectedGateTargets: DETECTED_GATE_TARGETS,
  summary: {
    totalGates: DETECTED_GATE_TARGETS.length,
    gatesWithMobileCandidates: DETECTED_GATE_TARGETS.filter((gate) => gate.observedMobileCandidates.length > 0).length,
    gatesWithBackendCandidates: DETECTED_GATE_TARGETS.filter((gate) => gate.observedBackendCandidates.length > 0).length,
    criticalBeforeSubmission: DETECTED_GATE_TARGETS.filter((gate) => gate.severity === "critical_before_submission").length,
    targetFilesModifiedNow: 0,
    backendRestartNow: 0,
    runtimeDbWriteNow: 0,
    providerCallsNow: 0,
    walletMutationsNow: 0,
    paymentAuthorizationsNow: 0,
    moneyMovementNow: 0,
    fakeSuccessNow: false,
  },
  keyFindings: [
    "Privacy screens/routes are present in uploaded mobile archives, but public URL/legal entity/provider text still require final closure.",
    "An account auto-delete/privacy candidate exists, but web deletion URL and backend intake were not confirmed in uploaded archives.",
    "AI screens and backend AI safety/provider candidates exist, but explicit report/flag AI response gate still needs implementation planning.",
    "Messenger report/block and backend moderation candidates exist; Stream live/short UGC report/block needs exact closure planning.",
    "Provider registry candidates exist; unified provider_not_configured reviewer evidence still needs closure planning.",
    "Wallet, premium, coin, gifts, and payment routes exist; Google Play Billing adapter and purchase token verification were not confirmed.",
    "Virtual card/crypto routes exist; card issuing must remain blocked until Airwallex/licensed issuer approval and no raw PAN/CVV evidence is prepared.",
    "Project root build files were not present in inspected source-only archives, so target SDK/AAB gate needs local root inspection.",
  ],
  nextStage: "PLAY-READY-7",
  requiredExactApprovalTextForPlayReady7: PLAY_READY_6_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_7,
  safety: {
    sourceTargetWriteByPlayReady6: false,
    backendRestartByPlayReady6: false,
    runtimeDbWriteByPlayReady6: false,
    providerCallByPlayReady6: false,
    walletMutationByPlayReady6: false,
    paymentAuthorizationByPlayReady6: false,
    moneyMovementByPlayReady6: false,
    fakeSuccessByPlayReady6: false,
  },
} as const;

export function getPlayReady6TargetDetectionGapAudit() {
  return PLAY_READY_6_TARGET_DETECTION_GAP_AUDIT;
}

export function getPlayReady6Readiness() {
  const s = getPlayReady6TargetDetectionGapAudit();

  const gatesReady =
    s.detectedGateTargets.length === 10 &&
    s.detectedGateTargets.every((gate) => gate.targetFilesModifiedNow === false) &&
    s.detectedGateTargets.every((gate) => gate.backendRestartNow === false) &&
    s.detectedGateTargets.every((gate) => gate.runtimeDbWriteNow === false) &&
    s.detectedGateTargets.every((gate) => gate.providerCallNow === false) &&
    s.detectedGateTargets.every((gate) => gate.walletMutationNow === false) &&
    s.detectedGateTargets.every((gate) => gate.paymentAuthorizationNow === false) &&
    s.detectedGateTargets.every((gate) => gate.moneyMovementNow === false) &&
    s.detectedGateTargets.every((gate) => gate.fakeSuccessNow === false);

  const coverageReady =
    s.detectedGateTargets.some((gate) => gate.gateId === "privacy_policy_link_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "account_deletion_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "ai_report_flag_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "ugc_report_block_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "billing_vs_wallet_separation_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "financial_features_gate") &&
    s.detectedGateTargets.some((gate) => gate.gateId === "target_sdk_aab_release_gate");

  const safetyReady =
    s.safety.sourceTargetWriteByPlayReady6 === false &&
    s.safety.backendRestartByPlayReady6 === false &&
    s.safety.runtimeDbWriteByPlayReady6 === false &&
    s.safety.providerCallByPlayReady6 === false &&
    s.safety.walletMutationByPlayReady6 === false &&
    s.safety.paymentAuthorizationByPlayReady6 === false &&
    s.safety.moneyMovementByPlayReady6 === false &&
    s.safety.fakeSuccessByPlayReady6 === false;

  const ready =
    gatesReady &&
    coverageReady &&
    safetyReady &&
    s.summary.targetFilesModifiedNow === 0 &&
    s.summary.backendRestartNow === 0 &&
    s.summary.runtimeDbWriteNow === 0 &&
    s.summary.providerCallsNow === 0 &&
    s.summary.walletMutationsNow === 0 &&
    s.summary.paymentAuthorizationsNow === 0 &&
    s.summary.moneyMovementNow === 0 &&
    s.summary.fakeSuccessNow === false &&
    s.requiredExactApprovalTextForPlayReady7.includes("PLAY-READY-7");

  return {
    version: s.version,
    ready,
    status: ready
      ? "target_detection_gap_audit_ready_for_gap_closure_package_planning"
      : "target_detection_gap_audit_blocked",
    gatesDetected: s.summary.totalGates,
    gatesWithMobileCandidates: s.summary.gatesWithMobileCandidates,
    gatesWithBackendCandidates: s.summary.gatesWithBackendCandidates,
    nextRecommendedStage: "PLAY-READY-7 controlled compliance gate gap-closure implementation package planning source-only after exact approval",
  } as const;
}

export function runPlayReady6TargetDetectionGapAuditSmoke() {
  const snapshot = getPlayReady6TargetDetectionGapAudit();
  const readiness = getPlayReady6Readiness();

  const assertions = [
    {
      id: "all_expected_gates_detected",
      passed:
        snapshot.detectedGateTargets.length === 10 &&
        snapshot.detectedGateTargets.some((gate) => gate.gateId === "privacy_policy_link_gate") &&
        snapshot.detectedGateTargets.some((gate) => gate.gateId === "account_deletion_gate") &&
        snapshot.detectedGateTargets.some((gate) => gate.gateId === "ai_report_flag_gate") &&
        snapshot.detectedGateTargets.some((gate) => gate.gateId === "ugc_report_block_gate") &&
        snapshot.detectedGateTargets.some((gate) => gate.gateId === "target_sdk_aab_release_gate"),
      evidence: JSON.stringify(snapshot.detectedGateTargets.map((gate) => gate.gateId)),
    },
    {
      id: "uploaded_archive_candidates_recorded",
      passed:
        snapshot.summary.gatesWithMobileCandidates >= 8 &&
        snapshot.summary.gatesWithBackendCandidates >= 6 &&
        snapshot.sourceArchivesInspectedForPlanningContext.length === 3,
      evidence: JSON.stringify({
        archives: snapshot.sourceArchivesInspectedForPlanningContext,
        summary: snapshot.summary,
      }),
    },
    {
      id: "key_gap_findings_present",
      passed:
        snapshot.keyFindings.length >= 8 &&
        snapshot.keyFindings.some((item) => item.includes("account auto-delete")) &&
        snapshot.keyFindings.some((item) => item.includes("Google Play Billing adapter")) &&
        snapshot.keyFindings.some((item) => item.includes("Project root build files")),
      evidence: JSON.stringify(snapshot.keyFindings),
    },
    {
      id: "no_target_modification_or_runtime",
      passed:
        snapshot.detectedGateTargets.every((gate) => gate.targetFilesModifiedNow === false) &&
        snapshot.safety.sourceTargetWriteByPlayReady6 === false &&
        snapshot.safety.backendRestartByPlayReady6 === false &&
        snapshot.safety.runtimeDbWriteByPlayReady6 === false &&
        snapshot.safety.providerCallByPlayReady6 === false &&
        snapshot.safety.walletMutationByPlayReady6 === false &&
        snapshot.safety.paymentAuthorizationByPlayReady6 === false &&
        snapshot.safety.moneyMovementByPlayReady6 === false &&
        snapshot.safety.fakeSuccessByPlayReady6 === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "readiness_true",
      passed: readiness.ready,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((item) => !item.passed);

  return {
    version: snapshot.version,
    stage: "target_detection_gap_audit_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "target_detection_gap_audit_smoke_passed"
      : "target_detection_gap_audit_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
