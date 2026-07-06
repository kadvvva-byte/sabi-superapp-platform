export type QrSecurityValidationInput = {
  signature?: string;
  expiresAt?: string | Date;
  strictSignature?: boolean;
  now?: Date;
};

export type QrSecurityValidationResult = {
  valid: boolean;
  reason?: string;
};

export class QrSecurityService {
  validate(input: QrSecurityValidationInput): QrSecurityValidationResult {
    const now = input.now ?? new Date();

    if (input.expiresAt) {
      const expiresAt =
        input.expiresAt instanceof Date
          ? input.expiresAt
          : new Date(input.expiresAt);

      if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < now.getTime()) {
        return {
          valid: false,
          reason: "qr_expired",
        };
      }
    }

    if (input.strictSignature && (!input.signature || input.signature === "pending-signature")) {
      return {
        valid: false,
        reason: "invalid_signature",
      };
    }

    return { valid: true };
  }
}
