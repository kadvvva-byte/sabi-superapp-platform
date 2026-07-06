import type {
  StreamFoundationAdminMonetizationApiOperation,
  StreamFoundationAdminMonetizationApiProviderTarget,
} from "./streamFoundationAdminSecureMonetizationApiContracts";
import { STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS } from "./streamFoundationAdminSecureMonetizationApiContracts";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE = "BACKEND_STREAM_FOUNDATION_136U_ADMIN_MONETIZATION_UI_API_HANDOFF_STAGING" as const;

export type StreamFoundationAdminMonetizationUiHandoffStage = typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE;

export type StreamFoundationAdminMonetizationUiPanelId =
  | "stream_monetization_overview"
  | "accept_payment_provider_config"
  | "monetization_payout_provider_config"
  | "wallet_coin_ledger_provider_config"
  | "platform_settlement_provider_config"
  | "compliance_risk_provider_config"
  | "monthly_payout_policy"
  | "creator_kyc_monetization_gate"
  | "gift_transaction_flow_readiness"
  | "provider_live_test_gate"
  | "redacted_secret_audit"
  | "blocked_state_explainer";

export type StreamFoundationAdminMonetizationUiFieldKind =
  | "boolean_badge"
  | "redacted_secret_ref"
  | "safe_status"
  | "number_policy"
  | "money_policy"
  | "permission_badge"
  | "readonly_explainer";

export type StreamFoundationAdminMonetizationUiPanelStatus = "ready_for_ui_contract" | "requires_backend_route_later" | "requires_provider_config" | "locked_last_stage";

export type StreamFoundationAdminMonetizationUiRole = "owner" | "assistant" | "accountant" | "developer" | "viewer";

export type StreamFoundationAdminMonetizationUiPanelContract = Readonly<{
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  titleKey: string;
  descriptionKey: string;
  status: StreamFoundationAdminMonetizationUiPanelStatus;
  requiredPermission: string;
  visibleForRoles: readonly StreamFoundationAdminMonetizationUiRole[];
  editableForRoles: readonly StreamFoundationAdminMonetizationUiRole[];
  serverSideOnly: true;
  rawSecretVisible: false;
  mobileVisibleSecret: false;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationAdminMonetizationUiFieldContract = Readonly<{
  fieldId: string;
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  labelKey: string;
  helperKey: string;
  kind: StreamFoundationAdminMonetizationUiFieldKind;
  apiSource: "redacted_safe_config_snapshot" | "readiness_snapshot" | "gift_flow_readiness" | "monthly_payout_policy";
  requiredBeforeGiftExecution: boolean;
  redacted: boolean;
  editable: boolean;
  requiredPermission: string;
  serverSideOnly: true;
  rawSecretVisible: false;
  mobileVisibleSecret: false;
}>;

export type StreamFoundationAdminMonetizationUiActionContract = Readonly<{
  actionId: string;
  labelKey: string;
  operation: StreamFoundationAdminMonetizationApiOperation;
  providerTarget?: StreamFoundationAdminMonetizationApiProviderTarget;
  requiredPermission: string;
  requiresIdempotencyKey: true;
  requiresAuditEvent: true;
  requiresRouteMountLater: boolean;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretReturnAllowed: false;
  mobileSecretAllowed: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationAdminMonetizationUiApiHandoffContract = Readonly<{
  stage: StreamFoundationAdminMonetizationUiHandoffStage;
  adminUiArea: "Stream / Gifts / Monetization";
  backendApiContractStage: "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING";
  safeReadOperation: "read_redacted_config_snapshot";
  writeOperationsUseServerSideSecretRefsOnly: true;
  acceptPaymentProviderSeparateFromPayoutProvider: true;
  monthlyPayoutOncePerMonth: true;
  recipientEarningsCountedAsPendingFirst: true;
  providerKeysServerSideOnly: true;
  panels: readonly StreamFoundationAdminMonetizationUiPanelContract[];
  fields: readonly StreamFoundationAdminMonetizationUiFieldContract[];
  actions: readonly StreamFoundationAdminMonetizationUiActionContract[];
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

const READ = STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read;
const WRITE = STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write;
const SECRETS = STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets;
const LIVE_TEST = STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.liveTest;

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS: readonly StreamFoundationAdminMonetizationUiPanelContract[] = [
  {
    panelId: "stream_monetization_overview",
    titleKey: "stream.admin.monetization.overview.title",
    descriptionKey: "stream.admin.monetization.overview.description",
    status: "ready_for_ui_contract",
    requiredPermission: READ,
    visibleForRoles: ["owner", "assistant", "accountant", "developer", "viewer"],
    editableForRoles: [],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "accept_payment_provider_config",
    titleKey: "stream.admin.monetization.acceptPayment.title",
    descriptionKey: "stream.admin.monetization.acceptPayment.description",
    status: "requires_backend_route_later",
    requiredPermission: SECRETS,
    visibleForRoles: ["owner", "assistant", "developer"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "monetization_payout_provider_config",
    titleKey: "stream.admin.monetization.payout.title",
    descriptionKey: "stream.admin.monetization.payout.description",
    status: "requires_backend_route_later",
    requiredPermission: SECRETS,
    visibleForRoles: ["owner", "assistant", "developer", "accountant"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "wallet_coin_ledger_provider_config",
    titleKey: "stream.admin.monetization.walletLedger.title",
    descriptionKey: "stream.admin.monetization.walletLedger.description",
    status: "requires_provider_config",
    requiredPermission: SECRETS,
    visibleForRoles: ["owner", "assistant", "developer", "accountant"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "platform_settlement_provider_config",
    titleKey: "stream.admin.monetization.platformSettlement.title",
    descriptionKey: "stream.admin.monetization.platformSettlement.description",
    status: "requires_backend_route_later",
    requiredPermission: SECRETS,
    visibleForRoles: ["owner", "assistant", "developer", "accountant"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "compliance_risk_provider_config",
    titleKey: "stream.admin.monetization.complianceRisk.title",
    descriptionKey: "stream.admin.monetization.complianceRisk.description",
    status: "requires_provider_config",
    requiredPermission: SECRETS,
    visibleForRoles: ["owner", "assistant", "developer"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "monthly_payout_policy",
    titleKey: "stream.admin.monetization.monthlyPayout.title",
    descriptionKey: "stream.admin.monetization.monthlyPayout.description",
    status: "requires_backend_route_later",
    requiredPermission: WRITE,
    visibleForRoles: ["owner", "assistant", "accountant"],
    editableForRoles: ["owner"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "creator_kyc_monetization_gate",
    titleKey: "stream.admin.monetization.creatorGate.title",
    descriptionKey: "stream.admin.monetization.creatorGate.description",
    status: "locked_last_stage",
    requiredPermission: READ,
    visibleForRoles: ["owner", "assistant", "accountant", "viewer"],
    editableForRoles: [],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "gift_transaction_flow_readiness",
    titleKey: "stream.admin.monetization.giftFlow.title",
    descriptionKey: "stream.admin.monetization.giftFlow.description",
    status: "ready_for_ui_contract",
    requiredPermission: READ,
    visibleForRoles: ["owner", "assistant", "accountant", "developer", "viewer"],
    editableForRoles: [],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "provider_live_test_gate",
    titleKey: "stream.admin.monetization.providerLiveTest.title",
    descriptionKey: "stream.admin.monetization.providerLiveTest.description",
    status: "requires_backend_route_later",
    requiredPermission: LIVE_TEST,
    visibleForRoles: ["owner", "assistant", "developer"],
    editableForRoles: ["owner", "developer"],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "redacted_secret_audit",
    titleKey: "stream.admin.monetization.redactedSecretAudit.title",
    descriptionKey: "stream.admin.monetization.redactedSecretAudit.description",
    status: "ready_for_ui_contract",
    requiredPermission: READ,
    visibleForRoles: ["owner", "assistant", "developer", "accountant"],
    editableForRoles: [],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
  {
    panelId: "blocked_state_explainer",
    titleKey: "stream.admin.monetization.blockedState.title",
    descriptionKey: "stream.admin.monetization.blockedState.description",
    status: "ready_for_ui_contract",
    requiredPermission: READ,
    visibleForRoles: ["owner", "assistant", "accountant", "developer", "viewer"],
    editableForRoles: [],
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  },
];

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS: readonly StreamFoundationAdminMonetizationUiFieldContract[] = [
  {
    fieldId: "acceptPaymentProviderKeyRef",
    panelId: "accept_payment_provider_config",
    labelKey: "stream.admin.monetization.field.acceptPaymentProviderKeyRef",
    helperKey: "stream.admin.monetization.helper.serverSideSecretRefOnly",
    kind: "redacted_secret_ref",
    apiSource: "redacted_safe_config_snapshot",
    requiredBeforeGiftExecution: true,
    redacted: true,
    editable: true,
    requiredPermission: SECRETS,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "monetizationPayoutProviderKeyRef",
    panelId: "monetization_payout_provider_config",
    labelKey: "stream.admin.monetization.field.monetizationPayoutProviderKeyRef",
    helperKey: "stream.admin.monetization.helper.payoutProviderSeparate",
    kind: "redacted_secret_ref",
    apiSource: "redacted_safe_config_snapshot",
    requiredBeforeGiftExecution: true,
    redacted: true,
    editable: true,
    requiredPermission: SECRETS,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "walletCoinLedgerProviderKeyRef",
    panelId: "wallet_coin_ledger_provider_config",
    labelKey: "stream.admin.monetization.field.walletCoinLedgerProviderKeyRef",
    helperKey: "stream.admin.monetization.helper.walletLedgerRequired",
    kind: "redacted_secret_ref",
    apiSource: "redacted_safe_config_snapshot",
    requiredBeforeGiftExecution: true,
    redacted: true,
    editable: true,
    requiredPermission: SECRETS,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "platformSettlementProviderKeyRef",
    panelId: "platform_settlement_provider_config",
    labelKey: "stream.admin.monetization.field.platformSettlementProviderKeyRef",
    helperKey: "stream.admin.monetization.helper.platformSettlementSeparate",
    kind: "redacted_secret_ref",
    apiSource: "redacted_safe_config_snapshot",
    requiredBeforeGiftExecution: false,
    redacted: true,
    editable: true,
    requiredPermission: SECRETS,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "platformFeeBps",
    panelId: "monthly_payout_policy",
    labelKey: "stream.admin.monetization.field.platformFeeBps",
    helperKey: "stream.admin.monetization.helper.platformFeeReserve",
    kind: "number_policy",
    apiSource: "monthly_payout_policy",
    requiredBeforeGiftExecution: true,
    redacted: false,
    editable: true,
    requiredPermission: WRITE,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "monthlyPayoutDayOfMonth",
    panelId: "monthly_payout_policy",
    labelKey: "stream.admin.monetization.field.monthlyPayoutDayOfMonth",
    helperKey: "stream.admin.monetization.helper.payoutOncePerMonth",
    kind: "number_policy",
    apiSource: "monthly_payout_policy",
    requiredBeforeGiftExecution: true,
    redacted: false,
    editable: true,
    requiredPermission: WRITE,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "recipientPendingEarningStatus",
    panelId: "gift_transaction_flow_readiness",
    labelKey: "stream.admin.monetization.field.recipientPendingEarningStatus",
    helperKey: "stream.admin.monetization.helper.pendingBeforeAvailable",
    kind: "safe_status",
    apiSource: "gift_flow_readiness",
    requiredBeforeGiftExecution: true,
    redacted: false,
    editable: false,
    requiredPermission: READ,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
  {
    fieldId: "rawSecretValuesReturned",
    panelId: "redacted_secret_audit",
    labelKey: "stream.admin.monetization.field.rawSecretValuesReturned",
    helperKey: "stream.admin.monetization.helper.rawSecretsNeverReturned",
    kind: "boolean_badge",
    apiSource: "readiness_snapshot",
    requiredBeforeGiftExecution: true,
    redacted: false,
    editable: false,
    requiredPermission: READ,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  },
];

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS: readonly StreamFoundationAdminMonetizationUiActionContract[] = [
  {
    actionId: "readRedactedConfigSnapshot",
    labelKey: "stream.admin.monetization.action.readRedactedConfigSnapshot",
    operation: "read_redacted_config_snapshot",
    requiredPermission: READ,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
  {
    actionId: "saveAcceptPaymentProviderRef",
    labelKey: "stream.admin.monetization.action.saveAcceptPaymentProviderRef",
    operation: "save_accept_payment_provider_ref",
    providerTarget: "accept_payment_provider",
    requiredPermission: SECRETS,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: true,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
  {
    actionId: "saveMonetizationPayoutProviderRef",
    labelKey: "stream.admin.monetization.action.saveMonetizationPayoutProviderRef",
    operation: "save_monetization_payout_provider_ref",
    providerTarget: "monetization_payout_provider",
    requiredPermission: SECRETS,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: true,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
  {
    actionId: "saveWalletCoinLedgerProviderRef",
    labelKey: "stream.admin.monetization.action.saveWalletCoinLedgerProviderRef",
    operation: "save_wallet_coin_ledger_provider_ref",
    providerTarget: "wallet_coin_ledger_provider",
    requiredPermission: SECRETS,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: true,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
  {
    actionId: "saveMonthlyPayoutPolicy",
    labelKey: "stream.admin.monetization.action.saveMonthlyPayoutPolicy",
    operation: "save_monthly_payout_policy",
    requiredPermission: WRITE,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: true,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
  {
    actionId: "requestProviderLiveTestGate",
    labelKey: "stream.admin.monetization.action.requestProviderLiveTestGate",
    operation: "request_provider_live_test_gate",
    requiredPermission: LIVE_TEST,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    requiresRouteMountLater: true,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretReturnAllowed: false,
    mobileSecretAllowed: false,
    fakeSuccessAllowed: false,
  },
];

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_API_HANDOFF_CONTRACT: StreamFoundationAdminMonetizationUiApiHandoffContract = {
  stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
  adminUiArea: "Stream / Gifts / Monetization",
  backendApiContractStage: "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING",
  safeReadOperation: "read_redacted_config_snapshot",
  writeOperationsUseServerSideSecretRefsOnly: true,
  acceptPaymentProviderSeparateFromPayoutProvider: true,
  monthlyPayoutOncePerMonth: true,
  recipientEarningsCountedAsPendingFirst: true,
  providerKeysServerSideOnly: true,
  panels: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS,
  fields: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS,
  actions: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS,
  routeMountAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretValuesReturned: false,
  mobileProviderKeysReturned: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
};
