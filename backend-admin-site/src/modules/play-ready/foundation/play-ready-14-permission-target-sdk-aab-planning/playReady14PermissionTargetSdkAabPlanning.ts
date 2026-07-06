export const PLAY_READY_14_VERSION = "PLAY-READY-14" as const;

export const PLAY_READY_14_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-14 controlled permission rationale and target SDK/AAB local root audit planning source-only, use PLAY-READY-13 financial features review and PLAY-READY-7 gap-closure planning to prepare an exact future local-root inspection plan for Android permissions, permission rationale copy, targetSdk/API check, AAB build readiness, app signing/versioning, reviewer credentials/access checklist, and no unused sensitive permissions, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_14_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_15 = "I approve PLAY-READY-15 controlled admin and reviewer evidence center planning source-only, use PLAY-READY-14 permission/target SDK/AAB planning and PLAY-READY-7 gap-closure planning to prepare an exact future Admin/Play reviewer evidence center plan for privacy/account deletion, AI report/flag, UGC report/block, provider_not_configured, billing-vs-wallet separation, financial features/NFT/virtual card disclosures, permission rationale, target SDK/AAB readiness, closed testing notes, and reviewer access instructions, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady14TargetStatus =
  | "future_local_root_inspection_required"
  | "observed_candidate"
  | "missing_requires_local_project_confirmation"
  | "external_play_console_check_required";

export type PlayReady14PermissionKind =
  | "camera"
  | "microphone"
  | "media_photos_video"
  | "notifications"
  | "location"
  | "contacts"
  | "overlay"
  | "biometric"
  | "unknown_sensitive";

export interface PlayReady14LocalRootInspectionTarget {
  readonly path: string;
  readonly status: PlayReady14TargetStatus;
  readonly futurePurpose: string;
  readonly plannedInspection: string;
  readonly writeExecutedNow: false;
  readonly buildExecutedNow: false;
  readonly uploadExecutedNow: false;
}

export interface PlayReady14PermissionRationalePlan {
  readonly permission: PlayReady14PermissionKind;
  readonly usedByFeatures: readonly string[];
  readonly rationaleCopyIntent: string;
  readonly deniedFallbackRequired: true;
  readonly removeIfUnused: true;
  readonly targetWriteNow: false;
}

export const PLAY_READY_14_PERMISSION_TARGET_SDK_AAB_PLANNING = {
  version: PLAY_READY_14_VERSION,
  stage: "controlled_permission_rationale_and_target_sdk_aab_local_root_audit_planning_source_only",
  status: "permission_target_sdk_aab_planning_ready_for_admin_reviewer_evidence_center_planning",
  sourceOnly: true,
  sourceTargetWritesNow: 0,
  targetFilesModifiedNow: 0,
  localRootInspectionExecutedNow: false,
  buildExecutedNow: false,
  aabGeneratedNow: false,
  playUploadNow: false,
  backendRestartNow: 0,
  runtimeDbWriteNow: 0,
  providerCallsNow: 0,
  secretValueExposureNow: false,
  walletMutationsNow: 0,
  paymentAuthorizationsNow: 0,
  moneyMovementNow: 0,

  localRootInspectionTargets: [
    {
      path: "app.json",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Expo/static app config target for Android permissions, package metadata, versioning, and Play-ready policy alignment.",
      plannedInspection: "Inspect android.package, android.permissions, version, icon/splash metadata, privacy-related links if configured.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "app.config.ts or app.config.js",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Dynamic Expo app config target if app.json is generated or overridden.",
      plannedInspection: "Inspect runtime config for Android permissions, target package, environment variables, and public URL config without exposing secrets.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "eas.json",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "EAS build profile target for AAB release build readiness and environment handling.",
      plannedInspection: "Inspect build profiles, Android artifact type, release channel, distribution, and secret-safe env references.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "package.json",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Script/dependency target for build commands, Expo/React Native versions, and Play Billing dependency planning.",
      plannedInspection: "Inspect scripts, package versions, build commands, and unused sensitive permission dependencies.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "android/app/build.gradle",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Native Android build target for targetSdk/minSdk/versionCode/versionName/signing config and AAB readiness.",
      plannedInspection: "Inspect compileSdk/targetSdk/minSdk, versionCode, versionName, signingConfig references, and release build type.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "android/build.gradle",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Root Gradle target for Android Gradle Plugin and SDK compatibility.",
      plannedInspection: "Inspect Android Gradle Plugin/Kotlin versions and SDK compatibility for Play release.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "android/app/src/main/AndroidManifest.xml",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Native Android permission declaration and intent filter target.",
      plannedInspection: "Inspect declared permissions, exported activities/services/receivers, deep links, and unused sensitive permissions.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "metro.config.js / babel.config.js / tsconfig.json",
      status: "future_local_root_inspection_required" as PlayReady14TargetStatus,
      futurePurpose: "Build sanity targets for release readiness and TypeScript consistency.",
      plannedInspection: "Inspect compile settings and ensure Play-ready packages do not break TypeScript.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "Google Play Console / App bundle explorer",
      status: "external_play_console_check_required" as PlayReady14TargetStatus,
      futurePurpose: "External Play Console check for AAB upload, app signing, target API, and policy declarations.",
      plannedInspection: "Check after AAB generation only; no upload or declaration submission in this planning stage.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
  ] as const satisfies readonly PlayReady14LocalRootInspectionTarget[],

  observedPermissionSurfaceCandidates: [
    {
      path: "app/camera.tsx",
      status: "observed_candidate" as PlayReady14TargetStatus,
      futurePurpose: "Camera feature surface requiring camera/microphone/media rationale.",
      plannedInspection: "Review future permission copy and denied fallback for camera/video capture.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "app/calls/audio.tsx",
      status: "observed_candidate" as PlayReady14TargetStatus,
      futurePurpose: "Audio call surface requiring microphone rationale.",
      plannedInspection: "Review future permission rationale and fallback if microphone denied.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "app/calls/video.tsx",
      status: "observed_candidate" as PlayReady14TargetStatus,
      futurePurpose: "Video call surface requiring camera/microphone rationale.",
      plannedInspection: "Review future permission rationale and fallback if camera/microphone denied.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "src/modules/calls/native/overlayPermission.ts",
      status: "observed_candidate" as PlayReady14TargetStatus,
      futurePurpose: "Native overlay permission helper candidate; sensitive because overlay permissions require clear user value and limited use.",
      plannedInspection: "Review if overlay permission is still needed; if unused, plan removal or strict rationale.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
    {
      path: "src/modules/calls/native/OverlayPermissionCard.tsx",
      status: "observed_candidate" as PlayReady14TargetStatus,
      futurePurpose: "Overlay permission rationale UI candidate.",
      plannedInspection: "Review copy for clarity, denial fallback, and no scary/unclear permission language.",
      writeExecutedNow: false,
      buildExecutedNow: false,
      uploadExecutedNow: false,
    },
  ] as const satisfies readonly PlayReady14LocalRootInspectionTarget[],

  permissionRationalePlan: [
    {
      permission: "camera" as PlayReady14PermissionKind,
      usedByFeatures: ["video calls", "Stream live", "short video creation", "QR scanner if enabled"],
      rationaleCopyIntent: "Camera is used only when you start video, live stream, short video recording, or QR scanning.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "microphone" as PlayReady14PermissionKind,
      usedByFeatures: ["audio calls", "video calls", "Stream live", "voice messages", "Sabi AI voice if enabled"],
      rationaleCopyIntent: "Microphone is used only for calls, live audio/video, voice messages, or voice assistant features you start.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "media_photos_video" as PlayReady14PermissionKind,
      usedByFeatures: ["avatar upload", "message attachments", "short video upload", "Stream media creation"],
      rationaleCopyIntent: "Media access is used only when you choose files/photos/videos to upload or send.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "notifications" as PlayReady14PermissionKind,
      usedByFeatures: ["messages", "calls", "Stream notifications", "Wallet/security alerts if enabled"],
      rationaleCopyIntent: "Notifications help deliver messages, calls, security alerts, and subscribed Stream updates.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "location" as PlayReady14PermissionKind,
      usedByFeatures: ["nearby stores", "delivery address", "map", "nearby Stream if enabled"],
      rationaleCopyIntent: "Location is used only for nearby services, delivery, map features, or nearby discovery when you allow it.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "contacts" as PlayReady14PermissionKind,
      usedByFeatures: ["optional contact discovery", "invite friends if enabled"],
      rationaleCopyIntent: "Contacts are optional and used only if you choose contact discovery or friend invites.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "overlay" as PlayReady14PermissionKind,
      usedByFeatures: ["call overlay if still required"],
      rationaleCopyIntent: "Overlay permission is only for call controls above the app if this feature remains enabled.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
    {
      permission: "biometric" as PlayReady14PermissionKind,
      usedByFeatures: ["Wallet security if enabled"],
      rationaleCopyIntent: "Biometric unlock is optional and used only to protect sensitive Wallet/account actions.",
      deniedFallbackRequired: true,
      removeIfUnused: true,
      targetWriteNow: false,
    },
  ] as const satisfies readonly PlayReady14PermissionRationalePlan[],

  targetSdkAndAabAuditPlan: {
    exactCurrentPlayRequirementMustBeCheckedAtExecutionTime: true,
    targetSdkCheckNowExecuted: false,
    aabBuildNowExecuted: false,
    playUploadNowExecuted: false,
    futureChecks: [
      "detect targetSdkVersion / targetSdk",
      "detect compileSdkVersion / compileSdk",
      "detect minSdkVersion / minSdk",
      "detect versionCode",
      "detect versionName",
      "detect applicationId/package",
      "confirm release artifact type is AAB",
      "confirm app signing / upload key plan",
      "confirm release build command",
      "confirm no debug/dev flags in release",
      "confirm no mobile secret values",
      "confirm app access/reviewer credentials notes",
    ],
    productionPlaceholderAllowed: false,
  },

  appSigningVersioningPlan: {
    futureChecks: [
      "Android package/applicationId stable",
      "versionCode increments",
      "versionName user-readable",
      "release signing config safe",
      "upload key stored outside source",
      "no signing secret committed",
      "Play app signing enabled/check planned",
      "closed testing track selected before production",
    ],
    signingSecretExposureNow: false,
    releaseBuildNow: false,
  },

  reviewerAccessChecklistPlan: {
    requiredBeforeReview: [
      "reviewer test account credentials or access path",
      "country/region restrictions explained",
      "provider_not_configured explanation",
      "AI report/flag path",
      "UGC report/block path",
      "privacy policy path",
      "account deletion path and web URL",
      "billing-vs-wallet separation note",
      "financial features/NFT/card disclosure note",
      "closed testing feedback path",
    ],
    fakeCredentialsAllowed: false,
    secretCredentialsInSourceAllowed: false,
  },

  unusedSensitivePermissionBlockPlan: {
    unusedSensitivePermissionsAllowed: false,
    futureAuditMustFlag: [
      "camera declared but no camera feature/rationale",
      "microphone declared but no voice/call/live feature/rationale",
      "location declared but no map/delivery/nearby feature/rationale",
      "contacts declared but no optional contact feature/rationale",
      "overlay declared but no current call overlay need",
      "read external storage/media permission broader than needed",
      "notification permission without notification feature/copy",
      "biometric permission without protected action",
    ],
    futureResolutionOptions: [
      "remove permission",
      "add clear rationale if feature is real",
      "gate request until feature entry point",
      "provide denied fallback",
      "document reviewer evidence",
    ],
  },

  productionBlockers: [
    "target SDK/API not confirmed against current Play requirement",
    "AAB build not confirmed",
    "app signing/versioning not confirmed",
    "unused sensitive Android permission remains declared",
    "permission rationale missing for camera/microphone/media/location/contacts/overlay/biometric if used",
    "denied permission fallback missing",
    "reviewer credentials/access instructions missing",
    "mobile source contains secret values",
    "release build uses debug/dev flags",
    "privacy/account deletion/AI/UGC/financial evidence not linked in reviewer notes",
  ],

  nextStage: "PLAY-READY-15",
  requiredExactApprovalTextForPlayReady15: PLAY_READY_14_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_15,

  safety: {
    sourceTargetWriteByPlayReady14: false,
    targetFilesModifiedByPlayReady14: false,
    localRootInspectionExecutedByPlayReady14: false,
    buildExecutedByPlayReady14: false,
    aabGeneratedByPlayReady14: false,
    playUploadByPlayReady14: false,
    backendRestartByPlayReady14: false,
    runtimeDbWriteByPlayReady14: false,
    providerCallByPlayReady14: false,
    secretValueExposureByPlayReady14: false,
    walletMutationByPlayReady14: false,
    paymentAuthorizationByPlayReady14: false,
    moneyMovementByPlayReady14: false,
    fakeSuccessByPlayReady14: false,
  },
} as const;

export function getPlayReady14PermissionTargetSdkAabPlanning() {
  return PLAY_READY_14_PERMISSION_TARGET_SDK_AAB_PLANNING;
}

export function getPlayReady14Readiness() {
  const s = getPlayReady14PermissionTargetSdkAabPlanning();

  const localRootReady =
    s.localRootInspectionTargets.length >= 8 &&
    s.localRootInspectionTargets.every((item) => item.writeExecutedNow === false) &&
    s.localRootInspectionTargets.every((item) => item.buildExecutedNow === false) &&
    s.localRootInspectionTargets.every((item) => item.uploadExecutedNow === false) &&
    s.localRootInspectionTargets.some((item) => item.path === "app.json") &&
    s.localRootInspectionTargets.some((item) => item.path === "android/app/build.gradle") &&
    s.localRootInspectionTargets.some((item) => item.status === "external_play_console_check_required");

  const permissionReady =
    s.permissionRationalePlan.length >= 8 &&
    s.permissionRationalePlan.every((item) => item.deniedFallbackRequired === true) &&
    s.permissionRationalePlan.every((item) => item.removeIfUnused === true) &&
    s.permissionRationalePlan.every((item) => item.targetWriteNow === false) &&
    s.permissionRationalePlan.some((item) => item.permission === "camera") &&
    s.permissionRationalePlan.some((item) => item.permission === "microphone") &&
    s.permissionRationalePlan.some((item) => item.permission === "overlay");

  const sdkReady =
    s.targetSdkAndAabAuditPlan.exactCurrentPlayRequirementMustBeCheckedAtExecutionTime === true &&
    s.targetSdkAndAabAuditPlan.targetSdkCheckNowExecuted === false &&
    s.targetSdkAndAabAuditPlan.aabBuildNowExecuted === false &&
    s.targetSdkAndAabAuditPlan.playUploadNowExecuted === false &&
    s.targetSdkAndAabAuditPlan.futureChecks.length >= 10 &&
    s.targetSdkAndAabAuditPlan.productionPlaceholderAllowed === false;

  const signingReady =
    s.appSigningVersioningPlan.futureChecks.length >= 7 &&
    s.appSigningVersioningPlan.signingSecretExposureNow === false &&
    s.appSigningVersioningPlan.releaseBuildNow === false;

  const reviewerReady =
    s.reviewerAccessChecklistPlan.requiredBeforeReview.length >= 9 &&
    s.reviewerAccessChecklistPlan.fakeCredentialsAllowed === false &&
    s.reviewerAccessChecklistPlan.secretCredentialsInSourceAllowed === false;

  const unusedPermissionReady =
    s.unusedSensitivePermissionBlockPlan.unusedSensitivePermissionsAllowed === false &&
    s.unusedSensitivePermissionBlockPlan.futureAuditMustFlag.length >= 7 &&
    s.unusedSensitivePermissionBlockPlan.futureResolutionOptions.length >= 5;

  const safetyReady =
    s.sourceTargetWritesNow === 0 &&
    s.targetFilesModifiedNow === 0 &&
    s.localRootInspectionExecutedNow === false &&
    s.buildExecutedNow === false &&
    s.aabGeneratedNow === false &&
    s.playUploadNow === false &&
    s.backendRestartNow === 0 &&
    s.runtimeDbWriteNow === 0 &&
    s.providerCallsNow === 0 &&
    s.secretValueExposureNow === false &&
    s.walletMutationsNow === 0 &&
    s.paymentAuthorizationsNow === 0 &&
    s.moneyMovementNow === 0 &&
    s.safety.sourceTargetWriteByPlayReady14 === false &&
    s.safety.targetFilesModifiedByPlayReady14 === false &&
    s.safety.localRootInspectionExecutedByPlayReady14 === false &&
    s.safety.buildExecutedByPlayReady14 === false &&
    s.safety.aabGeneratedByPlayReady14 === false &&
    s.safety.playUploadByPlayReady14 === false &&
    s.safety.secretValueExposureByPlayReady14 === false &&
    s.safety.fakeSuccessByPlayReady14 === false;

  const ready =
    localRootReady &&
    permissionReady &&
    sdkReady &&
    signingReady &&
    reviewerReady &&
    unusedPermissionReady &&
    s.productionBlockers.length >= 9 &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady15.includes("PLAY-READY-15");

  return {
    version: s.version,
    ready,
    status: ready
      ? "permission_target_sdk_aab_planning_ready_for_admin_reviewer_evidence_center_planning"
      : "permission_target_sdk_aab_planning_blocked",
    localRootTargets: s.localRootInspectionTargets.length,
    permissionRationales: s.permissionRationalePlan.length,
    productionBlockers: s.productionBlockers.length,
    nextRecommendedStage: "PLAY-READY-15 controlled admin and reviewer evidence center planning source-only after exact approval",
  } as const;
}

export function runPlayReady14PermissionTargetSdkAabPlanningSmoke() {
  const snapshot = getPlayReady14PermissionTargetSdkAabPlanning();
  const readiness = getPlayReady14Readiness();

  const assertions = [
    {
      id: "local_root_targets_planned_no_build_upload",
      passed:
        snapshot.localRootInspectionTargets.length >= 8 &&
        snapshot.localRootInspectionTargets.every((item) => item.writeExecutedNow === false) &&
        snapshot.localRootInspectionTargets.every((item) => item.buildExecutedNow === false) &&
        snapshot.localRootInspectionTargets.every((item) => item.uploadExecutedNow === false),
      evidence: JSON.stringify(snapshot.localRootInspectionTargets.map((item) => ({
        path: item.path,
        status: item.status,
        build: item.buildExecutedNow,
        upload: item.uploadExecutedNow,
      })),
    },
    {
      id: "permission_rationale_plan_blocks_unused_sensitive_permissions",
      passed:
        snapshot.permissionRationalePlan.length >= 8 &&
        snapshot.permissionRationalePlan.every((item) => item.deniedFallbackRequired === true) &&
        snapshot.permissionRationalePlan.every((item) => item.removeIfUnused === true) &&
        snapshot.unusedSensitivePermissionBlockPlan.unusedSensitivePermissionsAllowed === false,
      evidence: JSON.stringify({
        permissions: snapshot.permissionRationalePlan,
        unused: snapshot.unusedSensitivePermissionBlockPlan,
      }),
    },
    {
      id: "target_sdk_aab_signing_reviewer_plans_present",
      passed:
        snapshot.targetSdkAndAabAuditPlan.exactCurrentPlayRequirementMustBeCheckedAtExecutionTime === true &&
        snapshot.targetSdkAndAabAuditPlan.aabBuildNowExecuted === false &&
        snapshot.appSigningVersioningPlan.signingSecretExposureNow === false &&
        snapshot.reviewerAccessChecklistPlan.secretCredentialsInSourceAllowed === false,
      evidence: JSON.stringify({
        sdk: snapshot.targetSdkAndAabAuditPlan,
        signing: snapshot.appSigningVersioningPlan,
        reviewer: snapshot.reviewerAccessChecklistPlan,
      }),
    },
    {
      id: "production_blockers_cover_release_risks",
      passed:
        snapshot.productionBlockers.length >= 9 &&
        snapshot.productionBlockers.some((item) => item.includes("target SDK")) &&
        snapshot.productionBlockers.some((item) => item.includes("AAB")) &&
        snapshot.productionBlockers.some((item) => item.includes("unused sensitive")),
      evidence: JSON.stringify(snapshot.productionBlockers),
    },
    {
      id: "safety_no_target_build_secret_runtime",
      passed:
        snapshot.sourceTargetWritesNow === 0 &&
        snapshot.targetFilesModifiedNow === 0 &&
        snapshot.localRootInspectionExecutedNow === false &&
        snapshot.buildExecutedNow === false &&
        snapshot.aabGeneratedNow === false &&
        snapshot.playUploadNow === false &&
        snapshot.secretValueExposureNow === false &&
        snapshot.safety.fakeSuccessByPlayReady14 === false,
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
    stage: "permission_target_sdk_aab_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "permission_target_sdk_aab_planning_smoke_passed"
      : "permission_target_sdk_aab_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
