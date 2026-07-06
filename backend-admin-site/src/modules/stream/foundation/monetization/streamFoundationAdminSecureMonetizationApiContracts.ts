import type { StreamFoundationAdminMonetizationConfigInput } from "./streamFoundationAdminMonetizationConfigContracts";
import type { StreamFoundationPaymentRail } from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE = "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING" as const;

export type StreamFoundationAdminSecureMonetizationApiStage = typeof STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE;

export type StreamFoundationAdminMonetizationApiOperation =
  | "read_redacted_config_snapshot"
  | "validate_config_draft"
  | "save_accept_payment_provider_ref"
  | "save_monetization_payout_provider_ref"
  | "save_wallet_coin_ledger_provider_ref"
  | "save_platform_settlement_provider_ref"
  | "save_compliance_risk_provider_ref"
  | "save_monthly_payout_policy"
  | "request_provider_live_test_gate"
  | "disable_provider_config"
  | "rotate_provider_secret_ref";

export type StreamFoundationAdminMonetizationApiProviderTarget =
  | "accept_payment_provider"
  | "monetization_payout_provider"
  | "wallet_coin_ledger_provider"
  | "platform_settlement_provider"
  | "compliance_risk_provider";

export type StreamFoundationAdminMonetizationApiActor = Readonly<{
  adminUserId: string;
  role: "owner" | "assistant" | "accountant" | "developer" | "viewer";
  permissions: readonly string[];
  sessionId?: string;
  ipHash?: string;
}>;

export type StreamFoundationAdminMonetizationApiSecretRefInput = Readonly<{
  providerKeyRef: string;
  serverSideSecretVaultRef: string;
  sealedSecretWriteToken?: string;
  rawSecretValue?: never;
  serverSideOnly: true;
  returnRawSecret: false;
  mobileSecretAllowed: false;
}>;

export type StreamFoundationAdminMonetizationApiProviderConfigInput = Readonly<{
  target: StreamFoundationAdminMonetizationApiProviderTarget;
  environment: "sandbox" | "production" | "disabled";
  configured: boolean;
  enabled: boolean;
  liveTestPassed: boolean;
  secretRef: StreamFoundationAdminMonetizationApiSecretRefInput;
}>;

export type StreamFoundationAdminMonetizationApiPolicyInput = Readonly<{
  platformFeeBps: number;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  complianceHoldDays: number;
  supportedGiftPaymentRails: readonly StreamFoundationPaymentRail[];
  payoutOncePerMonth: true;
  creatorKycRequired: true;
  creatorMonetizationApprovalRequired: true;
  immediatePayoutAllowed: false;
}>;

export type StreamFoundationAdminMonetizationApiRequest = Readonly<{
  requestId: string;
  idempotencyKey: string;
  operation: StreamFoundationAdminMonetizationApiOperation;
  actor: StreamFoundationAdminMonetizationApiActor;
  providerConfig?: StreamFoundationAdminMonetizationApiProviderConfigInput;
  policy?: StreamFoundationAdminMonetizationApiPolicyInput;
  draftConfig?: StreamFoundationAdminMonetizationConfigInput;
  clientCreatedAt?: string;
}>;

export type StreamFoundationAdminMonetizationApiSafeConfigSnapshot = Readonly<{
  stage: StreamFoundationAdminSecureMonetizationApiStage;
  acceptPaymentProviderConfigured: boolean;
  monetizationPayoutProviderConfigured: boolean;
  walletCoinLedgerProviderConfigured: boolean;
  platformSettlementProviderConfigured: boolean;
  complianceRiskProviderConfigured: boolean;
  acceptPaymentProviderKeyRef: string;
  monetizationPayoutProviderKeyRef: string;
  walletCoinLedgerProviderKeyRef: string;
  platformSettlementProviderKeyRef: string;
  complianceRiskProviderKeyRef: string;
  platformFeeBps: number;
  monthlyPayoutDayOfMonth: number;
  minPayoutCoinAmount: number;
  complianceHoldDays: number;
  payoutOncePerMonth: true;
  providerKeysServerSideOnly: true;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
}>;

export type StreamFoundationAdminMonetizationApiDecisionCode =
  | "admin_monetization_api_preview_ready"
  | "admin_monetization_api_blocked_invalid_request"
  | "admin_monetization_api_blocked_permission_required"
  | "admin_monetization_api_blocked_raw_secret_forbidden"
  | "admin_monetization_api_blocked_provider_target_required"
  | "admin_monetization_api_blocked_policy_invalid"
  | "admin_monetization_api_blocked_route_mount_required"
  | "admin_monetization_api_blocked_database_required";

export type StreamFoundationAdminMonetizationApiResponse = Readonly<{
  stage: StreamFoundationAdminSecureMonetizationApiStage;
  ok: boolean;
  decisionCode: StreamFoundationAdminMonetizationApiDecisionCode;
  safeMessageKey: string;
  operation: StreamFoundationAdminMonetizationApiOperation;
  safeConfigSnapshot?: StreamFoundationAdminMonetizationApiSafeConfigSnapshot;
  validationBlockedGates: number;
  validationReviewRequiredGates: number;
  auditRequired: true;
  idempotencyRequired: true;
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

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_API_REQUIRED_PERMISSIONS = {
  read: "stream:monetization:read",
  write: "stream:monetization:write",
  secrets: "stream:monetization:secrets:write",
  liveTest: "stream:monetization:provider-test:request",
} as const;
