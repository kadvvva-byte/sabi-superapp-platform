import { Router } from "express";
import { requireAdmin } from "../../../admin/admin.auth";
import { playReady34ReviewerEvidenceAdminRoutesSourceOnly } from "../play-ready-34-reviewer-evidence-admin-route-implementation-source-only";

const generatedAt = new Date().toISOString();

type PlayReadyReviewerEvidenceCategoryId =
  | "privacy_account_deletion"
  | "ugc_report_block_moderation"
  | "ai_report_flag"
  | "provider_not_configured"
  | "billing_wallet_separation"
  | "financial_disclosure"
  | "reviewer_access_notes"
  | "sensitive_permission_evidence"
  | "https_production_readiness";

const categories: Array<{ id: PlayReadyReviewerEvidenceCategoryId; title: string; status: "ready" | "needs_manual_evidence" | "blocked_external_config"; evidenceSource: string }> = [
  { id: "privacy_account_deletion", title: "Privacy and account deletion", status: "ready", evidenceSource: "source registry and privacy/account deletion evidence" },
  { id: "ugc_report_block_moderation", title: "UGC report, block, moderation", status: "ready", evidenceSource: "source registry and moderation evidence" },
  { id: "ai_report_flag", title: "AI report and safety flags", status: "ready", evidenceSource: "source registry and AI safety evidence" },
  { id: "provider_not_configured", title: "Provider not configured honesty", status: "ready", evidenceSource: "source registry and provider disabled states" },
  { id: "billing_wallet_separation", title: "Billing and Wallet separation", status: "ready", evidenceSource: "source registry and billing separation evidence" },
  { id: "financial_disclosure", title: "Financial disclosures", status: "ready", evidenceSource: "source registry and financial disclosure evidence" },
  { id: "reviewer_access_notes", title: "Reviewer access notes", status: "needs_manual_evidence", evidenceSource: "manual reviewer instructions required" },
  { id: "sensitive_permission_evidence", title: "Sensitive permission evidence", status: "needs_manual_evidence", evidenceSource: "Play Console declarations and screenshots required" },
  { id: "https_production_readiness", title: "HTTPS production readiness", status: "blocked_external_config", evidenceSource: "production domain, HTTPS env, and cleartext closure required" }
];

const manualScreenshots = [
  "Account deletion / privacy entry",
  "UGC report/block/moderation screen",
  "Sensitive permission explanation screens",
  "Provider-not-configured honest blocked state"
];

const productionReadinessBlockers = [
  "HTTPS production env and cleartext closure remain external production-readiness work.",
  "Package id decision remains separate before first public Play publication.",
  "Manual screenshots and Play Console declarations remain required."
];

function routeEnvelope(routeId: string, payload: Record<string, unknown>) {
  return {
    ok: true,
    module: "play_ready_reviewer_evidence_center",
    version: "PLAY-READY-37-FIX2",
    routeId,
    generatedAt,
    requiresAdminAuth: true,
    readOnly: true,
    runtimeDbWritePerformed: false,
    providerExecutionPerformed: false,
    walletStateChangePerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessPerformed: false,
    sourceEvidenceOnly: true,
    ...payload
  };
}

export const playReady37ReviewerEvidenceAdminRoutes = Router();

playReady37ReviewerEvidenceAdminRoutes.use(requireAdmin);

playReady37ReviewerEvidenceAdminRoutes.get("/summary", (_req, res) => {
  res.json(routeEnvelope("summary", {
    plannedRoutes: 10,
    mountedRoutes: 10,
    methods: ["GET"],
    categories: categories.length,
    manualScreenshots: manualScreenshots.length,
    productionReadinessBlockers: productionReadinessBlockers.length,
    routeSourceCount: playReady34ReviewerEvidenceAdminRoutesSourceOnly.length
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/categories", (_req, res) => {
  res.json(routeEnvelope("categories", { categories }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/categories/:categoryId", (req, res) => {
  const category = categories.find((item) => item.id === req.params.categoryId);
  if (!category) {
    res.status(404).json(routeEnvelope("category_detail", { error: "reviewer_evidence_category_not_found", categoryId: req.params.categoryId }));
    return;
  }
  res.json(routeEnvelope("category_detail", { category }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/items/:itemId", (req, res) => {
  const route = playReady34ReviewerEvidenceAdminRoutesSourceOnly.find((item) => item.id === req.params.itemId);
  if (!route) {
    res.status(404).json(routeEnvelope("item_detail", { error: "reviewer_evidence_item_not_found", itemId: req.params.itemId }));
    return;
  }
  res.json(routeEnvelope("item_detail", { item: route }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/reviewer-access-notes", (_req, res) => {
  res.json(routeEnvelope("reviewer_access_notes", {
    notes: [
      "Use Admin-authenticated reviewer evidence center routes only.",
      "Provide a reviewer account only through secure manual release process.",
      "No fake provider success, no financial execution, and no Wallet state change is exposed by these routes."
    ]
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/permission-declarations", (_req, res) => {
  res.json(routeEnvelope("permission_declarations", {
    declarationsNeeded: [
      "Camera and microphone: calls, media capture, live audio/video, and streams.",
      "Location: location sharing and nearby features.",
      "Contacts and notifications: Messenger/contact discovery and notification flows.",
      "Full-screen intent/call-related permissions: call UX where applicable."
    ],
    status: "console_declaration_required"
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/manual-screenshots", (_req, res) => {
  res.json(routeEnvelope("manual_screenshot_checklist", {
    manualScreenshots,
    status: "manual_capture_required"
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/production-readiness-blockers", (_req, res) => {
  res.json(routeEnvelope("production_readiness_blockers", {
    productionReadinessBlockers,
    cleartextClosureRequired: true,
    packageIdDecisionRequired: true,
    playUploadPerformed: false
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/export-draft", (_req, res) => {
  res.json(routeEnvelope("export_draft", {
    exportFormat: "reviewer_evidence_json_draft",
    categories,
    manualScreenshots,
    productionReadinessBlockers
  }));
});

playReady37ReviewerEvidenceAdminRoutes.get("/safety-status", (_req, res) => {
  res.json(routeEnvelope("safety_status", {
    routesMountedInSource: true,
    runtimeDbWritePerformed: false,
    providerExecutionPerformed: false,
    walletStateChangePerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessPerformed: false,
    adminUiBuildPerformed: false,
    apkBuildPerformed: false,
    aabBuildPerformed: false,
    playUploadPerformed: false
  }));
});

export default playReady37ReviewerEvidenceAdminRoutes;
