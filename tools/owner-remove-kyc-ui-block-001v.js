const fs = require("fs");

const file = "mobile/src/shared/auth/fullActivationPolicy.ts";

const content = `import { PROFILE_KYC_STATE } from "../../modules/profile/data/profile";
import type { ProfileKycState } from "../../modules/profile/types";

export type FullActivationService =
  | "auth"
  | "profile"
  | "verification"
  | "profile_verification"
  | "home"
  | "messenger"
  | "chat"
  | "chats"
  | "calls"
  | "gallery"
  | "presentation"
  | "settings"
  | "manage"
  | "taxi"
  | "stream"
  | "camera"
  | "qr"
  | "sabi_ai_studio"
  | "ai"
  | "ai_voice"
  | "marketplace"
  | "supermarket"
  | "hotels"
  | "hotel"
  | "food"
  | "food_delivery"
  | "wholesale"
  | "wholesale_market"
  | "business"
  | "merchant"
  | "delivery"
  | "events"
  | "games"
  | "mini_apps"
  | "wallet"
  | "wallet_home"
  | "wallet_payment"
  | "cards"
  | "card"
  | "sabipay"
  | "payment"
  | "payments"
  | "checkout"
  | "topup"
  | "withdraw"
  | "withdrawal"
  | "payout"
  | "cashout"
  | "money_transfer"
  | "transfer_money"
  | "subscription_payment"
  | "merchant_settlement"
  | "p2p"
  | "coin_wallet"
  | "crypto_wallet"
  | string;

export const KYC_UI_BLOCKING_DISABLED_BY_OWNER = true;
export const KYC_UI_BLOCKING_POLICY_VERSION = "OWNER-REMOVE-KYC-UI-BLOCK-001V";

export function isWalletPaymentSurface(_surface: FullActivationService): boolean {
  return false;
}

export function isFullActivationApproved(_state: ProfileKycState = PROFILE_KYC_STATE): boolean {
  return true;
}

export function isSurfaceAllowedBeforeFullActivation(_surface: FullActivationService): boolean {
  return true;
}

export function isFullActivationRequiredForSurface(_surface: FullActivationService): boolean {
  return false;
}

export function shouldBlockSurfaceBeforeFullActivation(_surface: FullActivationService): boolean {
  return false;
}

export function getFullActivationRequiredMessage(surface?: string | null): string {
  const name = String(surface || "this service").trim() || "this service";

  return [
    \`\${name} is available.\`,
    "KYC/AML is not used as a UI access blocker in the Sabi app.",
    "Real provider execution, raw card data, ledger mutation and money movement remain controlled by their own provider/backend/admin safety guards.",
  ].join("\\n\\n");
}

export function getFullActivationStatusLabel(_state: ProfileKycState = PROFILE_KYC_STATE): string {
  return "KYC UI blocking disabled";
}
`;

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-REMOVE-KYC-UI-BLOCK-001V APPLIED");
console.log("FIXED", file);
