export const QR_RAILS = {
  SABI_WALLET: "sabi_wallet",
  COIN_WALLET: "coin_wallet",
} as const;

export type QrRail = (typeof QR_RAILS)[keyof typeof QR_RAILS];

export function isQrRail(value: unknown): value is QrRail {
  return value === QR_RAILS.SABI_WALLET || value === QR_RAILS.COIN_WALLET;
}
