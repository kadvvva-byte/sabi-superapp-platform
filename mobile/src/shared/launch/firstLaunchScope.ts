export type FirstLaunchFeature =
  | "auth"
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
  | "wallet";

export const FIRST_LAUNCH_SCOPE: Record<FirstLaunchFeature, boolean> = {
  auth: true,
  sabi_ai: true,
  business_assistant: true,
  messenger: true,
  calls: true,
  taxi: true,
  stream: true,
  sabi_ai_studio: true,
  gallery: true,
  camera: true,
  presentation: true,
  qr: true,

  // Wallet stays in source/runtime for gradual future activation.
  // First launch hides wallet entry points only; it does not delete routes,
  // backend contracts, QR linkage, future payment linkage, or admin readiness.
  wallet: false,
};

const WALLET_SURFACE_KINDS = new Set([
  "wallet",
  "sabipay",
  "cards",
  "card",
  "payment",
  "payments",
  "p2p",
  "crypto",
  "coin_wallet",
  "crypto_wallet",
]);

export function isFirstLaunchFeatureEnabled(feature: FirstLaunchFeature): boolean {
  return FIRST_LAUNCH_SCOPE[feature] === true;
}

export function isFirstLaunchWalletSurface(kind?: string | null): boolean {
  const normalized = String(kind ?? "").trim().toLowerCase();
  return WALLET_SURFACE_KINDS.has(normalized);
}

export function shouldShowFirstLaunchSurface(kind?: string | null): boolean {
  return !isFirstLaunchWalletSurface(kind);
}
