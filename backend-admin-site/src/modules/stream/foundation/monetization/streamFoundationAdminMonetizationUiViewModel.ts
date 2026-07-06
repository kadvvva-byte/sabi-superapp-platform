import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS,
  type StreamFoundationAdminMonetizationUiActionContract,
  type StreamFoundationAdminMonetizationUiFieldContract,
  type StreamFoundationAdminMonetizationUiPanelId,
  type StreamFoundationAdminMonetizationUiRole,
} from "./streamFoundationAdminMonetizationUiHandoffContracts";
import { getStreamFoundationAdminSecureMonetizationApiSafePreview } from "./streamFoundationAdminSecureMonetizationApiService";
import { getStreamFoundationAdminMonetizationUiStateMachineSnapshot } from "./streamFoundationAdminMonetizationUiStateMachine";
import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_SAFETY,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGE,
  type StreamFoundationAdminMonetizationUiActionState,
  type StreamFoundationAdminMonetizationUiFormFieldState,
  type StreamFoundationAdminMonetizationUiImplementationSnapshot,
  type StreamFoundationAdminMonetizationUiPanelViewModel,
} from "./streamFoundationAdminMonetizationUiImplementationTypes";

function safePreviewValue(field: StreamFoundationAdminMonetizationUiFieldContract): StreamFoundationAdminMonetizationUiFormFieldState["valuePreview"] {
  if (field.redacted) return "redacted";
  if (field.kind === "number_policy" || field.kind === "money_policy") return 0;
  if (field.kind === "boolean_badge") return false;
  if (field.kind === "safe_status") return "not_configured";
  return "not_configured";
}

function fieldsForPanel(panelId: StreamFoundationAdminMonetizationUiPanelId): readonly StreamFoundationAdminMonetizationUiFormFieldState[] {
  return STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.panelId === panelId).map((field) => ({
    fieldId: field.fieldId,
    panelId: field.panelId,
    labelKey: field.labelKey,
    helperKey: field.helperKey,
    valueKind: field.kind,
    valuePreview: safePreviewValue(field),
    editableInUiContract: field.editable,
    requiredBeforeGiftExecution: field.requiredBeforeGiftExecution,
    blockedReasonKey: field.editable ? "stream.admin.monetization.blocked.route_mount_required" : undefined,
    redacted: field.redacted,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  }));
}

function actionBelongsToPanel(action: StreamFoundationAdminMonetizationUiActionContract, panelId: StreamFoundationAdminMonetizationUiPanelId): boolean {
  if (panelId === "stream_monetization_overview") return action.operation === "read_redacted_config_snapshot";
  if (panelId === "accept_payment_provider_config") return action.providerTarget === "accept_payment_provider";
  if (panelId === "monetization_payout_provider_config") return action.providerTarget === "monetization_payout_provider";
  if (panelId === "wallet_coin_ledger_provider_config") return action.providerTarget === "wallet_coin_ledger_provider";
  if (panelId === "platform_settlement_provider_config") return action.providerTarget === "platform_settlement_provider";
  if (panelId === "compliance_risk_provider_config") return action.providerTarget === "compliance_risk_provider";
  if (panelId === "monthly_payout_policy") return action.operation === "save_monthly_payout_policy";
  if (panelId === "provider_live_test_gate") return action.operation === "request_provider_live_test_gate";
  return false;
}

function actionsForPanel(panelId: StreamFoundationAdminMonetizationUiPanelId): readonly StreamFoundationAdminMonetizationUiActionState[] {
  const preview = getStreamFoundationAdminSecureMonetizationApiSafePreview();
  return STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.filter((action) => actionBelongsToPanel(action, panelId)).map((action) => ({
    actionId: action.actionId,
    labelKey: action.labelKey,
    panelId,
    disabled: action.requiresRouteMountLater || action.operation !== "read_redacted_config_snapshot",
    disabledReasonKey: action.operation === "read_redacted_config_snapshot" ? "stream.admin.monetization.action.preview_only" : "stream.admin.monetization.blocked.route_mount_required",
    operation: action.operation,
    providerTarget: action.providerTarget,
    requiresIdempotencyKey: true,
    requiresAuditEvent: true,
    previewResponseCode: action.operation === "read_redacted_config_snapshot" ? preview.decisionCode : undefined,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  }));
}

export function getStreamFoundationAdminMonetizationUiImplementationSnapshot(
  role: StreamFoundationAdminMonetizationUiRole = "owner",
): StreamFoundationAdminMonetizationUiImplementationSnapshot {
  const stateMachine = getStreamFoundationAdminMonetizationUiStateMachineSnapshot(role);
  const panels: StreamFoundationAdminMonetizationUiPanelViewModel[] = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.map((panel) => {
    const panelState = stateMachine.panelStates.find((state) => state.panelId === panel.panelId);
    const implementationMode = panelState?.implementationMode ?? "readonly_preview";
    return {
      panelId: panel.panelId,
      titleKey: panel.titleKey,
      descriptionKey: panel.descriptionKey,
      status: panel.status,
      widgets: stateMachine.widgetDefinitions.filter((widget) => widget.panelId === panel.panelId),
      fields: fieldsForPanel(panel.panelId),
      actions: actionsForPanel(panel.panelId),
      visibleForRole: panel.visibleForRoles.includes(role),
      editableForRole: panel.editableForRoles.includes(role),
      implementationMode,
      safeForAdminUiRenderNow: true,
      safeForSubmitNow: false,
      blockedReasonKeys: panelState?.blockedReasonKeys ?? ["stream.admin.monetization.blocked.readonly_staging_only"],
      safety: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_SAFETY,
    };
  });

  const totalWidgets = panels.reduce((sum, panel) => sum + panel.widgets.length, 0);
  const totalFields = panels.reduce((sum, panel) => sum + panel.fields.length, 0);
  const totalActions = panels.reduce((sum, panel) => sum + panel.actions.length, 0);

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGE,
    adminUiArea: "Stream / Gifts / Monetization",
    role,
    panels,
    totalPanels: panels.length,
    totalWidgets,
    totalFields,
    totalActions,
    renderCoveragePercent: 100,
    actionCoveragePercent: 100,
    acceptPaymentProviderSeparateFromPayoutProvider: true,
    walletCoinLedgerRequiredForGiftExecution: true,
    recipientEarningsCountedAsPendingFirst: true,
    payoutOncePerMonth: true,
    safeToRenderInAdminUiStaging: true,
    readyForRealAdminUiFilePatchLater: true,
    readyForSubmitWithoutRouteMount: false,
    readyForGiftExecutionWithoutProvider: false,
    safety: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_SAFETY,
  };
}

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_HANDOFF = {
  stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_STAGE,
  handoffStage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
  adminUiArea: "Stream / Gifts / Monetization",
  renderableFromContractsNow: true,
  submitBlockedUntilRouteMount: true,
  routeMountAllowedNow: false,
  rawSecretValuesReturned: false,
  mobileProviderKeysReturned: false,
  fakeSuccessAllowed: false,
} as const;
