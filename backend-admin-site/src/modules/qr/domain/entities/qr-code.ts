import type { QrType } from "../constants/qr-type";
import type { QrPayload } from "../value-objects/qr-payload";

export class QrCode {
  constructor(
    public readonly id: string,
    public readonly type: QrType,
    public readonly payload: QrPayload,
    public readonly createdAt: Date = new Date(),
    public readonly expiresAt?: Date,
    public readonly status: "ACTIVE" | "EXPIRED" | "DISABLED" = "ACTIVE",
    public readonly usedCount: number = 0,
    public readonly usageLimit?: number,
  ) {}

  get amount(): string | undefined {
    return this.payload.amount;
  }

  get currency(): string | undefined {
    return this.payload.currency;
  }

  get merchantId(): string | undefined {
    return this.payload.destinationId;
  }

  get signature(): string | undefined {
    return this.payload.signature;
  }
}
