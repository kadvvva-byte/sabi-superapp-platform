import { PaymentStatus } from "../value-objects/payment-status"

export class Payment {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly provider: string,
    public readonly providerPaymentId: string,
    public readonly currency: string,
    public capturedAmount: bigint,
    public refundedAmount: bigint,
    public status: PaymentStatus,
    public version: number,
  ) {}

  static rehydrate(data: {
    id: string
    userId: string
    provider: string
    providerPaymentId: string
    currency: string
    capturedAmount: bigint
    refundedAmount: bigint
    status: PaymentStatus
    version: number
  }): Payment {
    return new Payment(
      data.id,
      data.userId,
      data.provider,
      data.providerPaymentId,
      data.currency,
      data.capturedAmount,
      data.refundedAmount,
      data.status,
      data.version,
    )
  }

  capture(amount: bigint): void {
    if (amount <= 0n) {
      throw new Error("Captured amount must be greater than zero")
    }

    if (this.status === PaymentStatus.REFUNDED) {
      throw new Error("Payment already refunded")
    }

    if (this.status === PaymentStatus.FAILED) {
      throw new Error("Payment already failed")
    }

    this.capturedAmount += amount
    this.status = PaymentStatus.CAPTURED
    this.version++
  }

  refund(amount: bigint): void {
    if (amount <= 0n) {
      throw new Error("Refund amount must be greater than zero")
    }

    if (this.status === PaymentStatus.FAILED) {
      throw new Error("Payment already failed")
    }

    if (this.capturedAmount < amount) {
      throw new Error("Refund exceeds captured amount")
    }

    this.refundedAmount += amount

    if (this.refundedAmount === this.capturedAmount) {
      this.status = PaymentStatus.REFUNDED
    }

    this.version++
  }

  markFailed(): void {
    if (this.status === PaymentStatus.CAPTURED || this.status === PaymentStatus.REFUNDED) {
      throw new Error("Captured or refunded payment cannot be marked failed")
    }

    this.status = PaymentStatus.FAILED
    this.version++
  }

  markAuthorized(): void {
    if (this.status !== PaymentStatus.CREATED) {
      return
    }

    this.status = PaymentStatus.AUTHORIZED
    this.version++
  }
}
