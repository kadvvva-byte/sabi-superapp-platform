import type {
  StreamFoundationAdminMonetizationUiActionContract,
  StreamFoundationAdminMonetizationUiFieldContract,
  StreamFoundationAdminMonetizationUiPanelContract,
  StreamFoundationAdminMonetizationUiPanelId,
  StreamFoundationAdminMonetizationUiRole,
} from "./streamFoundationAdminMonetizationUiHandoffContracts";
import type { StreamFoundationAdminMonetizationApiResponse } from "./streamFoundationAdminSecureMonetizationApiContracts";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGE = "BACKEND_STREAM_FOUNDATION_136V_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGING" as const;

export type StreamFoundationAdminMonetizationUiImplementationStage = typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGE;

export type StreamFoundationAdminMonetizationUiImplementationMode = "readonly_preview" | "route_mount_required" | "provider_config_required" | "locked_money_movement";

export type StreamFoundationAdminMonetizationUiWidgetKind =
  | "summary_card"
  | "provider_config_form"
  | "policy_form"
  | "readiness_gate_list"
  | "safe_action_button"
  | "redacted_secret_badge"
  | "blocked_reason_banner";

export type StreamFoundationAdminMonetizationUiImplementationSafety = Readonly<{
  adminUiFilesChangedNow: false;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export type StreamFoundationAdminMonetizationUiWidgetDefinition = Readonly<{
  widgetId: string;
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  kind: StreamFoundationAdminMonetizationUiWidgetKind;
  titleKey: string;
  descriptionKey: string;
  requiredPermission: string;
  visibleForRoles: readonly StreamFoundationAdminMonetizationUiRole[];
  sourcePanelId: StreamFoundationAdminMonetizationUiPanelContract["panelId"];
  sourceFieldIds: readonly string[];
  sourceActionIds: readonly string[];
  implementationMode: StreamFoundationAdminMonetizationUiImplementationMode;
  canRenderNowFromContracts: true;
  canSubmitNowWithoutRouteMount: false;
  serverSideOnly: true;
  rawSecretVisible: false;
  mobileVisibleSecret: false;
}>;

export type StreamFoundationAdminMonetizationUiFormFieldState = Readonly<{
  fieldId: string;
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  labelKey: string;
  helperKey: string;
  valueKind: StreamFoundationAdminMonetizationUiFieldContract["kind"];
  valuePreview: string | number | boolean | "redacted" | "not_configured";
  editableInUiContract: boolean;
  requiredBeforeGiftExecution: boolean;
  blockedReasonKey?: string;
  redacted: boolean;
  serverSideOnly: true;
  rawSecretVisible: false;
  mobileVisibleSecret: false;
}>;

export type StreamFoundationAdminMonetizationUiActionState = Readonly<{
  actionId: string;
  labelKey: string;
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  disabled: boolean;
  disabledReasonKey: string;
  operation: StreamFoundationAdminMonetizationUiActionContract["operation"];
  providerTarget?: StreamFoundationAdminMonetizationUiActionContract["providerTarget"];
  requiresIdempotencyKey: true;
  requiresAuditEvent: true;
  previewResponseCode?: StreamFoundationAdminMonetizationApiResponse["decisionCode"];
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationAdminMonetizationUiPanelViewModel = Readonly<{
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  titleKey: string;
  descriptionKey: string;
  status: StreamFoundationAdminMonetizationUiPanelContract["status"];
  widgets: readonly StreamFoundationAdminMonetizationUiWidgetDefinition[];
  fields: readonly StreamFoundationAdminMonetizationUiFormFieldState[];
  actions: readonly StreamFoundationAdminMonetizationUiActionState[];
  visibleForRole: boolean;
  editableForRole: boolean;
  implementationMode: StreamFoundationAdminMonetizationUiImplementationMode;
  safeForAdminUiRenderNow: true;
  safeForSubmitNow: false;
  blockedReasonKeys: readonly string[];
  safety: StreamFoundationAdminMonetizationUiImplementationSafety;
}>;

export type StreamFoundationAdminMonetizationUiImplementationSnapshot = Readonly<{
  stage: StreamFoundationAdminMonetizationUiImplementationStage;
  adminUiArea: "Stream / Gifts / Monetization";
  role: StreamFoundationAdminMonetizationUiRole;
  panels: readonly StreamFoundationAdminMonetizationUiPanelViewModel[];
  totalPanels: number;
  totalWidgets: number;
  totalFields: number;
  totalActions: number;
  renderCoveragePercent: 100;
  actionCoveragePercent: 100;
  acceptPaymentProviderSeparateFromPayoutProvider: true;
  walletCoinLedgerRequiredForGiftExecution: true;
  recipientEarningsCountedAsPendingFirst: true;
  payoutOncePerMonth: true;
  safeToRenderInAdminUiStaging: true;
  readyForRealAdminUiFilePatchLater: true;
  readyForSubmitWithoutRouteMount: false;
  readyForGiftExecutionWithoutProvider: false;
  safety: StreamFoundationAdminMonetizationUiImplementationSafety;
}>;

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_SAFETY: StreamFoundationAdminMonetizationUiImplementationSafety = {
  adminUiFilesChangedNow: false,
  routeMountedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretValuesReturned: false,
  mobileProviderKeysReturned: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
};
