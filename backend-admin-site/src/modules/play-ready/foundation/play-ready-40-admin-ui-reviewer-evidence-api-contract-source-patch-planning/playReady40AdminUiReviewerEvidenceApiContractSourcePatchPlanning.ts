export type PlayReady40AdminUiPatchTarget =
  | "admin-ui/src/api.ts"
  | "admin-ui/src/types.ts"
  | "admin-ui/src/App.tsx"
  | "admin-ui/src/styles.css";

export type PlayReady40ReviewerEvidenceEndpoint = {
  readonly id: string;
  readonly method: "GET";
  readonly path: string;
  readonly requiresAdminAuth: true;
  readonly readOnly: true;
  readonly expectedStatusAuthenticated: 200;
  readonly expectedStatusUnauthenticated: 401 | 403;
};

export const playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning = {
  version: "PLAY-READY-40",
  mode: "admin_ui_reviewer_evidence_api_contract_source_patch_planning",
  sourceOnlyPlanning: true,
  adminUiSourceWritePerformed: false,
  adminUiBuildPerformed: false,
  backendSourceWriteOutsidePlanning: false,
  backendRestartPerformed: false,
  runtimeDbWritePerformed: false,
  providerCallPerformed: false,
  walletStateChangePerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessPerformed: false,
  apkBuildPerformed: false,
  aabBuildPerformed: false,
  playUploadPerformed: false,
  verifiedByPriorStage: "PLAY-READY-39",
  verifiedBackendSmokeStage: "PLAY-READY-38",
  backendRouteBasePath: "/api/admin/play-ready/reviewer-evidence",
  patchTargets: [
    "admin-ui/src/api.ts",
    "admin-ui/src/types.ts",
    "admin-ui/src/App.tsx",
    "admin-ui/src/styles.css"
  ] as readonly PlayReady40AdminUiPatchTarget[],
  endpoints: [
    {
      id: "summary",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/summary",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    },
    {
      id: "categories",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/categories",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    },
    {
      id: "manual_screenshots",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    },
    {
      id: "permission_declarations",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    },
    {
      id: "production_readiness_blockers",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    },
    {
      id: "safety_status",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/safety-status",
      requiresAdminAuth: true,
      readOnly: true,
      expectedStatusAuthenticated: 200,
      expectedStatusUnauthenticated: 403
    }
  ] as readonly PlayReady40ReviewerEvidenceEndpoint[],
  sourcePatchPlan: [
    {
      target: "admin-ui/src/types.ts",
      action: "add reviewer evidence readonly response types",
      safety: "types only, no runtime provider or Wallet behavior"
    },
    {
      target: "admin-ui/src/api.ts",
      action: "add GET-only API helpers for reviewer evidence routes using existing Admin auth transport",
      safety: "GET only, read-only, no tokens logged, no secret display"
    },
    {
      target: "admin-ui/src/App.tsx",
      action: "add reviewer evidence center panel wired to API helpers",
      safety: "display-only panel, no approve/reject/write controls"
    },
    {
      target: "admin-ui/src/styles.css",
      action: "add minimal reviewer evidence center styles",
      safety: "visual-only, no backend or provider behavior"
    }
  ],
  uiRules: [
    "Show unauth/auth route status, source safety, manual screenshot needs, permission declarations, and production readiness blockers.",
    "Show provider-not-configured and production blockers honestly.",
    "Do not add write buttons, provider execution, Wallet state changes, payment actions, APK/AAB build, Play upload, or fake success.",
    "Do not print Admin tokens, provider secrets, or raw credentials.",
    "Keep next patch separate and approval-gated before changing admin-ui/src files."
  ],
  nextStageRequiresSeparateApproval: true,
  exactOwnerApprovalRequiredForNextStage:
    "I approve PLAY-READY-41 Admin UI reviewer evidence center source patch, Admin UI source write allowed only for api.ts, types.ts, App.tsx, and styles.css, no backend source write, no backend restart, no DB write, no provider call, no Wallet state change, no money movement, no fake success, no APK/AAB build, no Play upload.",
  plannedNextStage: "PLAY-READY-41"
} as const;

export function getPlayReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning() {
  return playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning;
}
