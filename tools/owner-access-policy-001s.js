const fs = require("fs");
const path = require("path");

const dir = "mobile/src/shared/access";
const file = path.join(dir, "sabi-access-policy.ts");

fs.mkdirSync(dir, { recursive: true });

const content = `export type SabiAppSurface =
  | "home"
  | "sabi_ai"
  | "business_assistant"
  | "messenger"
  | "calls"
  | "taxi"
  | "stream"
  | "sabi_ai_studio"
  | "gallery"
  | "camera"
  | "presentation"
  | "qr"
  | "wallet"
  | "wallet_payment"
  | "card"
  | "checkout"
  | "topup"
  | "withdraw"
  | "payout"
  | "money_transfer"
  | "subscription_payment"
  | string;

const WALLET_OR_PAYMENT_SURFACES = new Set([
  "wallet",
  "wallet_payment",
  "sabipay",
  "payment",
  "payments",
  "card",
  "cards",
  "checkout",
  "topup",
  "withdraw",
  "withdrawal",
  "payout",
  "cashout",
  "money_transfer",
  "transfer_money",
  "subscription_payment",
  "merchant_settlement",
  "coin_wallet",
  "crypto_wallet",
]);

export function normalizeSabiSurface(surface?: SabiAppSurface | null): string {
  return String(surface ?? "").trim().toLowerCase();
}

export function isWalletOrPaymentSurface(surface?: SabiAppSurface | null): boolean {
  return WALLET_OR_PAYMENT_SURFACES.has(normalizeSabiSurface(surface));
}

export function requiresKycForSurface(surface?: SabiAppSurface | null): boolean {
  return isWalletOrPaymentSurface(surface);
}

export function canOpenAppSurfaceWithoutKyc(surface?: SabiAppSurface | null): boolean {
  return !requiresKycForSurface(surface);
}

export function assertAppSurfaceOpenAllowed(surface?: SabiAppSurface | null): void {
  if (!canOpenAppSurfaceWithoutKyc(surface)) {
    throw new Error("wallet_or_payment_surface_requires_kyc");
  }
}

export const SABI_ACCESS_POLICY_VERSION = "OWNER-ACCESS-POLICY-001S";
`;

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-ACCESS-POLICY-001S APPLIED");
console.log("CREATED", file);
