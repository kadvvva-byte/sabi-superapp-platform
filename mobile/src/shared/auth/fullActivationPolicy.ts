import { PROFILE_KYC_STATE } from "../../modules/profile/data/profile";
import type { ProfileKycState } from "../../modules/profile/types";

export type FullActivationService =
  | "profile"
  | "verification"
  | "messenger"
  | "gallery"
  | "presentation"
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
  | "food_delivery"
  | "wholesale_market"
  | "business"
  | "merchant"
  | "wallet"
  | "cards"
  | "sabipay"
  | "payments"
  | "mini_apps"
  | string;

const BASIC_ALLOWED_SURFACES = new Set<string>([
  "auth",
  "profile",
  "verification",
  "profile_verification",
  "messenger",
  "chat",
  "chats",
  "calls",
  "gallery",
  "presentation",
  "settings",
  "manage",
]);

const FULL_ACTIVATION_REQUIRED_SURFACES = new Set<string>([
  "taxi",
  "stream",
  "camera",
  "qr",
  "sabi_ai_studio",
  "ai",
  "ai_voice",
  "marketplace",
  "supermarket",
  "hotels",
  "hotel",
  "food",
  "food_delivery",
  "wholesale",
  "wholesale_market",
  "business",
  "merchant",
  "delivery",
  "events",
  "games",
  "wallet",
  "cards",
  "sabipay",
  "payments",
  "p2p",
  "coin_wallet",
  "crypto_wallet",
  "mini_apps",
]);

function normalizeSurface(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

export function isFullActivationApproved(state: ProfileKycState = PROFILE_KYC_STATE): boolean {
  return (
    state.status === "verified" &&
    state.livenessVerified === true &&
    state.complianceStatus === "clear" &&
    state.reverificationRequired !== true &&
    state.restrictedActions.length === 0
  );
}

export function isSurfaceAllowedBeforeFullActivation(surface: FullActivationService): boolean {
  return BASIC_ALLOWED_SURFACES.has(normalizeSurface(surface));
}

export function isFullActivationRequiredForSurface(surface: FullActivationService): boolean {
  const normalized = normalizeSurface(surface);
  if (isSurfaceAllowedBeforeFullActivation(normalized)) return false;
  return FULL_ACTIVATION_REQUIRED_SURFACES.has(normalized);
}

export function shouldBlockSurfaceBeforeFullActivation(surface: FullActivationService): boolean {
  if (isFullActivationApproved()) return false;
  return isFullActivationRequiredForSurface(surface);
}

export function getFullActivationRequiredMessage(surface?: string | null): string {
  const name = String(surface || "this service").trim() || "this service";

  return [
    `${name} requires full Sabi account activation.`,
    "Complete KYC/AML review, document verification and required selfie/liveness confirmation in Profile before using commercial, financial or high-trust services.",
    "Until approval, only Messenger, Gallery and Presentation remain available.",
  ].join("\n\n");
}

export function getFullActivationStatusLabel(state: ProfileKycState = PROFILE_KYC_STATE): string {
  if (isFullActivationApproved(state)) return "Full activation approved";
  if (state.status === "rejected") return "Activation rejected";
  if (state.status === "review") return "KYC/AML review";
  if (state.status === "limited") return "Limited activation";
  return "Full activation required";
}
