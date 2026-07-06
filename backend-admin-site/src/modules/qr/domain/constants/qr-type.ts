export const QR_TYPE = {
  STATIC: "STATIC",
  DYNAMIC: "DYNAMIC",
} as const;

export type QrType = (typeof QR_TYPE)[keyof typeof QR_TYPE];
