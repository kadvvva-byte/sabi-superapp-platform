import type { SabiQrFunctionDefinition } from "../domain/constants/qr-function-catalog";
import type { QrTokenRecord } from "./qr-token.service";

export type QrExecutionStatus =
  | "success"
  | "failed"
  | "pending_review"
  | "provider_not_configured"
  | "executor_not_configured"
  | "restricted";

export type QrExecutionDecision = {
  ok: boolean;
  status: QrExecutionStatus;
  httpStatus: number;
  reason: string;
  reviewId?: string;
};

function hasEnv(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function createReviewId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function providerConfiguredFor(definition: SabiQrFunctionDefinition): boolean {
  switch (definition.surface) {
    case "wallet":
    case "merchant":
    case "business":
    case "marketplace":
    case "taxi":
    case "delivery":
    case "stream":
    case "messenger":
      return hasEnv("SABI_PAYMENTS_PROVIDER_CONFIGURED") || hasEnv("ALIPAYPLUS_CLIENT_ID");
    case "coin_wallet":
      return hasEnv("SABI_COIN_WALLET_EXECUTOR_ENABLED");
    case "crypto_wallet":
      return hasEnv("SABI_CRYPTO_PROVIDER_CONFIGURED");
    case "virtual_card":
      return hasEnv("SABI_VIRTUAL_CARD_PROVIDER_CONFIGURED");
    case "school_attendance":
    case "work_attendance":
      return hasEnv("SABI_ATTENDANCE_EXECUTOR_ENABLED");
    case "verification":
      return hasEnv("SABI_ADMIN_PROVIDER_REGISTRY_ENABLED");
    case "profile":
    default:
      return true;
  }
}

export function decideQrExecution(input: {
  definition: SabiQrFunctionDefinition;
  token: QrTokenRecord;
  idempotencyKey?: string | null;
}): QrExecutionDecision {
  const { definition, token } = input;

  if (!input.idempotencyKey && definition.executionPolicy !== "identity_open_only" && definition.executionPolicy !== "crypto_receive_only") {
    return {
      ok: false,
      status: "failed",
      httpStatus: 409,
      reason: "idempotency_key_required_for_qr_execution",
    };
  }

  if (token.surface !== definition.surface || token.rail !== definition.rail || token.functionCode !== definition.code) {
    return {
      ok: false,
      status: "restricted",
      httpStatus: 403,
      reason: "qr_function_surface_rail_mismatch_restricted",
      reviewId: createReviewId("qr_mismatch"),
    };
  }

  if (definition.executionPolicy === "identity_open_only") {
    return {
      ok: true,
      status: "success",
      httpStatus: 200,
      reason: "Identity QR resolved. No payment, wallet, attendance or card action was executed.",
    };
  }

  if (definition.executionPolicy === "crypto_receive_only") {
    return {
      ok: true,
      status: "success",
      httpStatus: 200,
      reason: "Crypto receive QR resolved. No transfer, swap or blockchain operation was executed by QR Core.",
    };
  }

  if (definition.riskLevel === "critical") {
    const reviewId = createReviewId("qr_critical");
    if (!providerConfiguredFor(definition)) {
      return {
        ok: false,
        status: "provider_not_configured",
        httpStatus: 503,
        reason:
          "Critical QR action requires Admin Panel provider setup, risk policy, webhooks and token-only storage before execution. No fake operation was created.",
        reviewId,
      };
    }

    return {
      ok: false,
      status: "pending_review",
      httpStatus: 409,
      reason: "Critical QR action is valid but requires admin/risk review before module executor can continue.",
      reviewId,
    };
  }

  if (definition.requiresProvider && !providerConfiguredFor(definition)) {
    return {
      ok: false,
      status: "provider_not_configured",
      httpStatus: 503,
      reason:
        "Provider is not configured for this QR function. Admin Panel must configure API keys/webhooks on backend. Mobile never receives secrets.",
      reviewId: createReviewId("qr_provider"),
    };
  }

  if (definition.executionPolicy === "attendance_record_required" && !providerConfiguredFor(definition)) {
    return {
      ok: false,
      status: "executor_not_configured",
      httpStatus: 409,
      reason:
        "Attendance QR is valid, but school/work attendance executor is not connected yet. No fake check-in/check-out record was created.",
      reviewId: createReviewId("qr_attendance"),
    };
  }

  return {
    ok: false,
    status: "executor_not_configured",
    httpStatus: 409,
    reason:
      "QR token is valid, but the module-specific backend executor, ledger/audit write and provider webhook flow are not connected yet. No fake operation was created.",
    reviewId: createReviewId("qr_executor"),
  };
}
