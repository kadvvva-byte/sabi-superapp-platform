export const PLAY_READY_28_VERSION = "PLAY-READY-28" as const;

export type PlayReady28EvidenceCategoryId =
  | "privacy_account_deletion"
  | "ugc_report_block_moderation"
  | "ai_report_flag"
  | "provider_not_configured"
  | "billing_wallet_separation"
  | "financial_disclosure"
  | "reviewer_access_notes"
  | "sensitive_permission_evidence"
  | "https_production_readiness";

export type PlayReady28AdminApiContractId =
  | "reviewer_evidence_summary"
  | "reviewer_evidence_categories"
  | "reviewer_evidence_category_detail"
  | "reviewer_evidence_items"
  | "reviewer_evidence_item_detail"
  | "reviewer_access_notes"
  | "permission_declaration_drafts"
  | "manual_screenshot_checklist"
  | "production_readiness_blockers"
  | "reviewer_export_draft";

export type PlayReady28HttpMethod = "GET";

export type PlayReady28ContractStatus =
  | "contract_only_not_mounted"
  | "source_only_planned"
  | "blocked_until_runtime_approval";

export type PlayReady28ResponseSource =
  | "play_ready_26_registry_contract"
  | "play_ready_27_service_plan"
  | "play_ready_24c_mobile_config_closure"
  | "manual_reviewer_evidence_capture";

export type PlayReady28AdminApiContract = {
  readonly id: PlayReady28AdminApiContractId;
  readonly method: PlayReady28HttpMethod;
  readonly path: string;
  readonly status: PlayReady28ContractStatus;
  readonly purpose: string;
  readonly responseSources: readonly PlayReady28ResponseSource[];
  readonly categories: readonly PlayReady28EvidenceCategoryId[];
  readonly reviewerSafeDescription: string;
  readonly requiresAdminAuth: true;
  readonly readOnly: true;
  readonly runtimeMounted: false;
  readonly allowsExternalProviderExecution: false;
  readonly allowsFinancialRuntimeMutation: false;
  readonly allowsPlayStoreSubmission: false;
};

export const PLAY_READY_28_ADMIN_API_CONTRACTS: readonly PlayReady28AdminApiContract[] = [
  {
    id: "reviewer_evidence_summary",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/summary",
    status: "contract_only_not_mounted",
    purpose: "Return a Play reviewer evidence summary grouped by category and readiness state.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan", "play_ready_24c_mobile_config_closure"],
    categories: [
      "privacy_account_deletion",
      "ugc_report_block_moderation",
      "ai_report_flag",
      "provider_not_configured",
      "billing_wallet_separation",
      "financial_disclosure",
      "reviewer_access_notes",
      "sensitive_permission_evidence",
      "https_production_readiness",
    ],
    reviewerSafeDescription: "Reviewer evidence summary. Source-only contract; no live Admin route is mounted in this stage.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_evidence_categories",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/categories",
    status: "contract_only_not_mounted",
    purpose: "List reviewer evidence categories and their console/manual capture requirements.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan"],
    categories: [
      "privacy_account_deletion",
      "ugc_report_block_moderation",
      "ai_report_flag",
      "provider_not_configured",
      "billing_wallet_separation",
      "financial_disclosure",
      "reviewer_access_notes",
      "sensitive_permission_evidence",
      "https_production_readiness",
    ],
    reviewerSafeDescription: "Category list for Admin reviewer preparation only.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_evidence_category_detail",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/categories/:categoryId",
    status: "contract_only_not_mounted",
    purpose: "Return one evidence category with reviewer answer draft, known source paths, and missing manual captures.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan"],
    categories: ["privacy_account_deletion", "ugc_report_block_moderation", "ai_report_flag", "provider_not_configured", "billing_wallet_separation", "financial_disclosure", "reviewer_access_notes", "sensitive_permission_evidence", "https_production_readiness"],
    reviewerSafeDescription: "Single-category contract for future Admin UI detail panel.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_evidence_items",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/items",
    status: "contract_only_not_mounted",
    purpose: "List all reviewer evidence items with readiness labels and source references.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan"],
    categories: ["privacy_account_deletion", "ugc_report_block_moderation", "ai_report_flag", "provider_not_configured", "billing_wallet_separation", "financial_disclosure", "reviewer_access_notes", "sensitive_permission_evidence", "https_production_readiness"],
    reviewerSafeDescription: "Flat evidence item list for future Admin UI table.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_evidence_item_detail",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/items/:itemId",
    status: "contract_only_not_mounted",
    purpose: "Return one evidence item with reviewer text, source files, screenshot needs, and console declaration needs.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan", "manual_reviewer_evidence_capture"],
    categories: ["privacy_account_deletion", "ugc_report_block_moderation", "ai_report_flag", "provider_not_configured", "billing_wallet_separation", "financial_disclosure", "reviewer_access_notes", "sensitive_permission_evidence", "https_production_readiness"],
    reviewerSafeDescription: "Single item detail contract for reviewer package preparation.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_access_notes",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/reviewer-access-notes",
    status: "contract_only_not_mounted",
    purpose: "Prepare Play reviewer access notes, test-user notes, and safe-disabled feature explanations.",
    responseSources: ["play_ready_27_service_plan"],
    categories: ["reviewer_access_notes", "provider_not_configured", "billing_wallet_separation"],
    reviewerSafeDescription: "Reviewer access note draft only; no credentials are created or exposed here.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "permission_declaration_drafts",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
    status: "contract_only_not_mounted",
    purpose: "Prepare Play Console declaration drafts for sensitive permissions and permission review notes.",
    responseSources: ["play_ready_24c_mobile_config_closure", "play_ready_27_service_plan"],
    categories: ["sensitive_permission_evidence"],
    reviewerSafeDescription: "Permission declaration draft contract. Final console submission remains manual.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "manual_screenshot_checklist",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
    status: "contract_only_not_mounted",
    purpose: "List screenshots that must be manually captured for Play reviewer evidence.",
    responseSources: ["play_ready_27_service_plan", "manual_reviewer_evidence_capture"],
    categories: ["privacy_account_deletion", "ugc_report_block_moderation", "ai_report_flag", "sensitive_permission_evidence"],
    reviewerSafeDescription: "Manual screenshot checklist contract only; this stage captures no screenshots.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "production_readiness_blockers",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
    status: "contract_only_not_mounted",
    purpose: "Expose honest production blockers such as HTTPS/domain, package decision, and production env proof.",
    responseSources: ["play_ready_24c_mobile_config_closure", "play_ready_27_service_plan"],
    categories: ["https_production_readiness", "provider_not_configured", "reviewer_access_notes"],
    reviewerSafeDescription: "Production readiness blocker contract; it does not close external configuration work.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
  {
    id: "reviewer_export_draft",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/export-draft",
    status: "contract_only_not_mounted",
    purpose: "Prepare a future export draft for reviewer notes and console declaration text.",
    responseSources: ["play_ready_26_registry_contract", "play_ready_27_service_plan"],
    categories: ["reviewer_access_notes", "sensitive_permission_evidence", "financial_disclosure", "billing_wallet_separation"],
    reviewerSafeDescription: "Export draft contract only; no file export route is mounted in this stage.",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMounted: false,
    allowsExternalProviderExecution: false,
    allowsFinancialRuntimeMutation: false,
    allowsPlayStoreSubmission: false,
  },
] as const;

export const PLAY_READY_28_ADMIN_API_CONTRACT_SUMMARY = {
  version: PLAY_READY_28_VERSION,
  mode: "source_only_admin_api_contract_planning",
  apiContracts: PLAY_READY_28_ADMIN_API_CONTRACTS.length,
  methods: ["GET"] as const,
  requiresAdminAuth: true,
  runtimeMounted: false,
  readOnly: true,
  externalProviderExecutionAllowed: false,
  financialRuntimeMutationAllowed: false,
  playStoreSubmissionAllowed: false,
  nextStage: "PLAY-READY-29 source-only reviewer evidence center Admin route planning",
} as const;

export function getPlayReady28AdminApiContracts(): readonly PlayReady28AdminApiContract[] {
  return PLAY_READY_28_ADMIN_API_CONTRACTS;
}

export function getPlayReady28AdminApiContractSummary() {
  return PLAY_READY_28_ADMIN_API_CONTRACT_SUMMARY;
}
