import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS,
  type StreamFoundationAdminMonetizationUiActionContract,
  type StreamFoundationAdminMonetizationUiRole,
} from "./streamFoundationAdminMonetizationUiHandoffContracts";
import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS,
  type StreamFoundationAdminMonetizationApiActor,
  type StreamFoundationAdminMonetizationApiRequest,
  type StreamFoundationAdminMonetizationApiResponse,
} from "./streamFoundationAdminSecureMonetizationApiContracts";
import { previewStreamFoundationAdminSecureMonetizationApiRequest } from "./streamFoundationAdminSecureMonetizationApiService";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTION_PREVIEW_STAGE = "BACKEND_STREAM_FOUNDATION_136V_ADMIN_MONETIZATION_UI_ACTION_PREVIEW_STAGING" as const;

export type StreamFoundationAdminMonetizationUiActionPreviewItem = Readonly<{
  actionId: string;
  operation: StreamFoundationAdminMonetizationUiActionContract["operation"];
  providerTarget?: StreamFoundationAdminMonetizationUiActionContract["providerTarget"];
  decisionCode: StreamFoundationAdminMonetizationApiResponse["decisionCode"];
  ok: boolean;
  disabledInUi: boolean;
  disabledReasonKey: string;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationAdminMonetizationUiActionPreviewSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTION_PREVIEW_STAGE;
  role: StreamFoundationAdminMonetizationUiRole;
  items: readonly StreamFoundationAdminMonetizationUiActionPreviewItem[];
  totalActions: number;
  previewedActions: number;
  safeReadActions: number;
  blockedWriteActions: number;
  coveragePercent: 100;
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

function actorForRole(role: StreamFoundationAdminMonetizationUiRole): StreamFoundationAdminMonetizationApiActor {
  const permissions: string[] = [STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.read];
  if (role === "owner" || role === "developer") {
    permissions.push(
      STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write,
      STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.secrets,
      STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.liveTest,
    );
  }
  if (role === "accountant") {
    permissions.push(STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS.write);
  }
  return {
    adminUserId: `admin-ui-preview-${role}`,
    role,
    permissions,
    sessionId: `admin-ui-preview-session-${role}`,
  };
}

function requestForAction(action: StreamFoundationAdminMonetizationUiActionContract, role: StreamFoundationAdminMonetizationUiRole): StreamFoundationAdminMonetizationApiRequest {
  return {
    requestId: `stream-admin-ui-action-preview-${action.actionId}`,
    idempotencyKey: `stream-admin-ui-action-preview-idempotency-${action.actionId}`,
    operation: action.operation,
    actor: actorForRole(role),
    providerConfig: action.providerTarget
      ? {
          target: action.providerTarget,
          environment: "sandbox",
          configured: true,
          enabled: true,
          liveTestPassed: false,
          secretRef: {
            providerKeyRef: `admin.stream.${action.providerTarget}.secret_ref`,
            serverSideSecretVaultRef: `vault://stream/${action.providerTarget}`,
            serverSideOnly: true,
            returnRawSecret: false,
            mobileSecretAllowed: false,
          },
        }
      : undefined,
    policy:
      action.operation === "save_monthly_payout_policy"
        ? {
            platformFeeBps: 2000,
            monthlyPayoutDayOfMonth: 1,
            minPayoutCoinAmount: 100,
            complianceHoldDays: 7,
            supportedGiftPaymentRails: ["sabi_coin_wallet", "external_card_acquirer"],
            payoutOncePerMonth: true,
            creatorKycRequired: true,
            creatorMonetizationApprovalRequired: true,
            immediatePayoutAllowed: false,
          }
        : undefined,
  };
}

export function getStreamFoundationAdminMonetizationUiActionPreviewSnapshot(
  role: StreamFoundationAdminMonetizationUiRole = "owner",
): StreamFoundationAdminMonetizationUiActionPreviewSnapshot {
  const items = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.map((action) => {
    const response = previewStreamFoundationAdminSecureMonetizationApiRequest(requestForAction(action, role));
    const isSafeRead = action.operation === "read_redacted_config_snapshot";
    return {
      actionId: action.actionId,
      operation: action.operation,
      providerTarget: action.providerTarget,
      decisionCode: response.decisionCode,
      ok: response.ok,
      disabledInUi: !isSafeRead || action.requiresRouteMountLater,
      disabledReasonKey: isSafeRead ? "stream.admin.monetization.action.preview_only" : "stream.admin.monetization.blocked.route_mount_required",
      routeMountAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretValuesReturned: false,
      mobileProviderKeysReturned: false,
      fakeSuccessAllowed: false,
    } satisfies StreamFoundationAdminMonetizationUiActionPreviewItem;
  });

  const safeReadActions = items.filter((item) => item.operation === "read_redacted_config_snapshot").length;
  const blockedWriteActions = items.filter((item) => item.disabledInUi && item.operation !== "read_redacted_config_snapshot").length;

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTION_PREVIEW_STAGE,
    role,
    items,
    totalActions: items.length,
    previewedActions: items.length,
    safeReadActions,
    blockedWriteActions,
    coveragePercent: 100,
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
