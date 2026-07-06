import type { QrPayload } from "../value-objects/qr-payload";

export type QrValidationPolicyResult = {
  valid: boolean;
  reason?: string;
};

export class QrValidationPolicyService {
  validate(payload: QrPayload): QrValidationPolicyResult {
    if (!payload.destinationId || payload.destinationId.trim().length === 0) {
      return {
        valid: false,
        reason: "missing_destination",
      };
    }

    if (payload.expiresAt) {
      const expiresAt =
        payload.expiresAt instanceof Date
          ? payload.expiresAt
          : new Date(payload.expiresAt);

      if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < Date.now()) {
        return {
          valid: false,
          reason: "qr_expired",
        };
      }
    }

    return { valid: true };
  }
}
