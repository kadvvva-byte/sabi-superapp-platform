import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS,
  type StreamFoundationAdminMonetizationUiPanelContract,
  type StreamFoundationAdminMonetizationUiPanelId,
  type StreamFoundationAdminMonetizationUiRole,
} from "./streamFoundationAdminMonetizationUiHandoffContracts";
import type { StreamFoundationAdminMonetizationUiImplementationMode, StreamFoundationAdminMonetizationUiWidgetDefinition } from "./streamFoundationAdminMonetizationUiImplementationTypes";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_STATE_MACHINE_STAGE = "BACKEND_STREAM_FOUNDATION_136V_ADMIN_MONETIZATION_UI_STATE_MACHINE_STAGING" as const;

export type StreamFoundationAdminMonetizationUiPanelState = Readonly<{
  panelId: StreamFoundationAdminMonetizationUiPanelId;
  implementationMode: StreamFoundationAdminMonetizationUiImplementationMode;
  canRenderNowFromContracts: true;
  canSubmitNowWithoutRouteMount: false;
  visibleForRole: boolean;
  editableForRole: boolean;
  blockedReasonKeys: readonly string[];
}>;

export type StreamFoundationAdminMonetizationUiStateMachineSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_STATE_MACHINE_STAGE;
  role: StreamFoundationAdminMonetizationUiRole;
  panelStates: readonly StreamFoundationAdminMonetizationUiPanelState[];
  widgetDefinitions: readonly StreamFoundationAdminMonetizationUiWidgetDefinition[];
  totalPanels: number;
  totalWidgets: number;
  renderCoveragePercent: 100;
  submitCoveragePercent: 100;
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

function modeForPanel(panel: StreamFoundationAdminMonetizationUiPanelContract): StreamFoundationAdminMonetizationUiImplementationMode {
  if (panel.panelId === "gift_transaction_flow_readiness" || panel.panelId === "provider_live_test_gate") return "locked_money_movement";
  if (panel.status === "requires_provider_config") return "provider_config_required";
  if (panel.status === "requires_backend_route_later") return "route_mount_required";
  if (panel.status === "locked_last_stage") return "locked_money_movement";
  return "readonly_preview";
}

function blockedReasonsForPanel(panel: StreamFoundationAdminMonetizationUiPanelContract): readonly string[] {
  const reasons: string[] = [];
  if (panel.routeMountedNow === false) reasons.push("stream.admin.monetization.blocked.route_mount_required");
  if (panel.databaseWriteAllowedNow === false && panel.editableForRoles.length > 0) reasons.push("stream.admin.monetization.blocked.database_write_not_enabled");
  if (panel.providerCallAllowedNow === false && (panel.status === "requires_provider_config" || panel.panelId === "provider_live_test_gate")) {
    reasons.push("stream.admin.monetization.blocked.provider_call_not_enabled");
  }
  if (panel.moneyMovementAllowedNow === false && panel.panelId === "gift_transaction_flow_readiness") {
    reasons.push("stream.admin.monetization.blocked.money_movement_not_enabled");
  }
  return reasons.length > 0 ? reasons : ["stream.admin.monetization.blocked.readonly_staging_only"];
}

function widgetKindForPanel(panelId: StreamFoundationAdminMonetizationUiPanelId): StreamFoundationAdminMonetizationUiWidgetDefinition["kind"] {
  if (panelId.includes("provider_config")) return "provider_config_form";
  if (panelId === "monthly_payout_policy") return "policy_form";
  if (panelId === "gift_transaction_flow_readiness" || panelId === "provider_live_test_gate") return "readiness_gate_list";
  if (panelId === "redacted_secret_audit") return "redacted_secret_badge";
  if (panelId === "blocked_state_explainer") return "blocked_reason_banner";
  return "summary_card";
}

function widgetForPanel(panel: StreamFoundationAdminMonetizationUiPanelContract): StreamFoundationAdminMonetizationUiWidgetDefinition {
  const fields = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.panelId === panel.panelId);
  const actions = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.filter((action) => {
    if (panel.panelId === "stream_monetization_overview") return action.operation === "read_redacted_config_snapshot";
    if (panel.panelId === "accept_payment_provider_config") return action.providerTarget === "accept_payment_provider";
    if (panel.panelId === "monetization_payout_provider_config") return action.providerTarget === "monetization_payout_provider";
    if (panel.panelId === "wallet_coin_ledger_provider_config") return action.providerTarget === "wallet_coin_ledger_provider";
    if (panel.panelId === "platform_settlement_provider_config") return action.providerTarget === "platform_settlement_provider";
    if (panel.panelId === "compliance_risk_provider_config") return action.providerTarget === "compliance_risk_provider";
    if (panel.panelId === "monthly_payout_policy") return action.operation === "save_monthly_payout_policy";
    if (panel.panelId === "provider_live_test_gate") return action.operation === "request_provider_live_test_gate";
    return false;
  });

  return {
    widgetId: `${panel.panelId}_widget`,
    panelId: panel.panelId,
    kind: widgetKindForPanel(panel.panelId),
    titleKey: `${panel.titleKey}.widget`,
    descriptionKey: `${panel.descriptionKey}.widget`,
    requiredPermission: panel.requiredPermission,
    visibleForRoles: panel.visibleForRoles,
    sourcePanelId: panel.panelId,
    sourceFieldIds: fields.map((field) => field.fieldId),
    sourceActionIds: actions.map((action) => action.actionId),
    implementationMode: modeForPanel(panel),
    canRenderNowFromContracts: true,
    canSubmitNowWithoutRouteMount: false,
    serverSideOnly: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  };
}

export function getStreamFoundationAdminMonetizationUiStateMachineSnapshot(
  role: StreamFoundationAdminMonetizationUiRole = "owner",
): StreamFoundationAdminMonetizationUiStateMachineSnapshot {
  const panelStates = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.map((panel) => ({
    panelId: panel.panelId,
    implementationMode: modeForPanel(panel),
    canRenderNowFromContracts: true,
    canSubmitNowWithoutRouteMount: false,
    visibleForRole: panel.visibleForRoles.includes(role),
    editableForRole: panel.editableForRoles.includes(role),
    blockedReasonKeys: blockedReasonsForPanel(panel),
  })) satisfies readonly StreamFoundationAdminMonetizationUiPanelState[];

  const widgetDefinitions = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.map(widgetForPanel);

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_STATE_MACHINE_STAGE,
    role,
    panelStates,
    widgetDefinitions,
    totalPanels: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.length,
    totalWidgets: widgetDefinitions.length,
    renderCoveragePercent: 100,
    submitCoveragePercent: 100,
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
}
