import { FeeDirection } from "../constants/fee-direction"

export type FeePolicyStatus = "active" | "inactive"

export type FeePolicyOperation =
  | "wallet_topup"
  | "wallet_transfer"
  | "coin_topup"
  | "coin_transfer"
  | "merchant_payment"
  | "merchant_payout"
  | "business_transfer"
  | "withdrawal"
  | "custom"

export type FeePolicyEntityParams = {
  id?: string
  title?: string
  description?: string

  direction?: FeeDirection
  percent?: number
  flatFee?: number
  minFee?: number
  maxFee?: number

  currency?: string
  status?: FeePolicyStatus
  operationTypes?: FeePolicyOperation[]

  createdAt?: Date
  updatedAt?: Date
}

export type FeeCalculationResult = {
  amount: number
  direction: FeeDirection
  currency: string

  percent: number
  flatFee: number
  minFee?: number
  maxFee?: number

  percentFee: number
  fee: number

  senderDebit: number
  recipientCredit: number
}

export type FeePolicyEntitySnapshot = {
  id: string
  title: string
  description?: string

  direction: FeeDirection
  percent: number
  flatFee: number
  minFee?: number
  maxFee?: number

  currency: string
  status: FeePolicyStatus
  operationTypes: FeePolicyOperation[]

  createdAt: Date
  updatedAt: Date
}

export class FeePolicyEntity {
  id: string
  title: string
  description?: string

  direction: FeeDirection
  percent: number
  flatFee: number
  minFee?: number
  maxFee?: number

  currency: string
  status: FeePolicyStatus
  operationTypes: FeePolicyOperation[]

  createdAt: Date
  updatedAt: Date

  constructor(params: FeePolicyEntityParams = {}) {
    this.id = params.id ?? ""
    this.title = params.title ?? "Service fee policy"
    this.description = params.description

    this.direction = params.direction ?? FeeDirection.OUTGOING
    this.percent = FeePolicyEntity.normalizePercent(params.percent ?? 0)
    this.flatFee = FeePolicyEntity.normalizeMoney(params.flatFee ?? 0)
    this.minFee = FeePolicyEntity.normalizeOptionalMoney(params.minFee)
    this.maxFee = FeePolicyEntity.normalizeOptionalMoney(params.maxFee)

    this.currency = params.currency ?? "USD"
    this.status = params.status ?? "active"
    this.operationTypes = params.operationTypes ?? []

    this.createdAt = params.createdAt ?? new Date()
    this.updatedAt = params.updatedAt ?? new Date()
  }

  static create(params: FeePolicyEntityParams = {}) {
    return new FeePolicyEntity(params)
  }

  isActive(): boolean {
    return this.status === "active"
  }

  supportsOperation(operationType: FeePolicyOperation): boolean {
    if (this.operationTypes.length === 0) {
      return true
    }

    return this.operationTypes.includes(operationType)
  }

  calculate(amount: number, currency?: string): FeeCalculationResult {
    const normalizedAmount = FeePolicyEntity.normalizeMoney(amount)
    const percentFee = FeePolicyEntity.roundMoney(
      (normalizedAmount * this.percent) / 100
    )

    let fee = FeePolicyEntity.roundMoney(percentFee + this.flatFee)

    if (typeof this.minFee === "number") {
      fee = Math.max(fee, this.minFee)
    }

    if (typeof this.maxFee === "number") {
      fee = Math.min(fee, this.maxFee)
    }

    fee = FeePolicyEntity.roundMoney(Math.max(0, fee))

    const senderDebit =
      this.direction === FeeDirection.OUTGOING
        ? FeePolicyEntity.roundMoney(normalizedAmount + fee)
        : normalizedAmount

    const recipientCredit =
      this.direction === FeeDirection.INCOMING
        ? FeePolicyEntity.roundMoney(Math.max(0, normalizedAmount - fee))
        : normalizedAmount

    return {
      amount: normalizedAmount,
      direction: this.direction,
      currency: currency ?? this.currency,

      percent: this.percent,
      flatFee: this.flatFee,
      minFee: this.minFee,
      maxFee: this.maxFee,

      percentFee,
      fee,

      senderDebit,
      recipientCredit,
    }
  }

  toJSON(): FeePolicyEntitySnapshot {
    return {
      id: this.id,
      title: this.title,
      description: this.description,

      direction: this.direction,
      percent: this.percent,
      flatFee: this.flatFee,
      minFee: this.minFee,
      maxFee: this.maxFee,

      currency: this.currency,
      status: this.status,
      operationTypes: [...this.operationTypes],

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private static normalizePercent(value: number): number {
    if (!Number.isFinite(value)) {
      return 0
    }

    return Math.max(0, Number(value))
  }

  private static normalizeMoney(value: number): number {
    if (!Number.isFinite(value)) {
      return 0
    }

    return FeePolicyEntity.roundMoney(Math.max(0, Number(value)))
  }

  private static normalizeOptionalMoney(value?: number): number | undefined {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return undefined
    }

    return FeePolicyEntity.roundMoney(Math.max(0, Number(value)))
  }

  private static roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}