import { createHash } from "crypto";
import { buildQrSignatureBase, type QrPayload } from "../../domain/value-objects/qr-payload";

export class QrSignatureAdapter {
  sign(payload: QrPayload, secret: string): string {
    const base = buildQrSignatureBase(payload);
    return createHash("sha256").update(`${base}:${secret}`).digest("hex");
  }

  verify(payload: QrPayload, secret: string, signature?: string): boolean {
    if (!signature) return false;
    return this.sign(payload, secret) === signature;
  }
}
