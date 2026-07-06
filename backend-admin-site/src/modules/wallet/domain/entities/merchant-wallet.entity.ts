export type MerchantWalletStatus =
  | "draft"
  | "pending"
  | "active"
  | "blocked"
  | "suspended"
  | "archived"

export type MerchantWalletEntityParams = {
  id?: string
  ownerUserId?: string
  businessWalletId?: string

  merchantId?: string
  merchantName?: string
  displayName?: string

  category?: string
  mcc?: string

  phone?: string
  email?: string
  settlementReference?: string

  defaultCurrency?: string
  availableCurrencies?: string[]

  balance?: number
  holdBalance?: number

  serviceFeePercent?: number
  settlementFeePercent?: number

  isMerchantEnabled?: boolean
  isSettlementEnabled?: boolean

  status?: MerchantWalletStatus

  createdAt?: Date
  updatedAt?: Date
}

export type MerchantWalletEntitySnapshot = {
  id: string
  ownerUserId: string
  businessWalletId?: string

  merchantId?: string
  merchantName: string
  displayName?: string

  category?: string
  mcc?: string

  phone?: string
  email?: string
  settlementReference?: string

  defaultCurrency: string
  availableCurrencies: string[]

  balance: number
  holdBalance: number

  serviceFeePercent: number
  settlementFeePercent: number

  isMerchantEnabled: boolean
  isSettlementEnabled: boolean

  status: MerchantWalletStatus

  createdAt: Date
  updatedAt: Date
}

export class MerchantWalletEntity {
  id: string
  ownerUserId: string
  businessWalletId?: string

  merchantId?: string
  merchantName: string
  displayName?: string

  category?: string
  mcc?: string

  phone?: string
  email?: string
  settlementReference?: string

  defaultCurrency: string
  availableCurrencies: string[]

  balance: number
  holdBalance: number

  serviceFeePercent: number
  settlementFeePercent: number

  isMerchantEnabled: boolean
  isSettlementEnabled: boolean

  status: MerchantWalletStatus

  createdAt: Date
  updatedAt: Date

  constructor(params: MerchantWalletEntityParams = {}) {
    this.id = params.id ?? ""
    this.ownerUserId = params.ownerUserId ?? ""
    this.businessWalletId = params.businessWalletId

    this.merchantId = params.merchantId
    this.merchantName = params.merchantName ?? ""
    this.displayName = params.displayName

    this.category = params.category
    this.mcc = params.mcc

    this.phone = params.phone
    this.email = params.email
    this.settlementReference = params.settlementReference

    this.defaultCurrency = params.defaultCurrency ?? "USD"
    this.availableCurrencies = params.availableCurrencies ?? [this.defaultCurrency]

    this.balance = MerchantWalletEntity.normalizeMoney(params.balance ?? 0)
    this.holdBalance = MerchantWalletEntity.normalizeMoney(
      params.holdBalance ?? 0
    )

    this.serviceFeePercent = MerchantWalletEntity.normalizePercent(
      params.serviceFeePercent ?? 0
    )
    this.settlementFeePercent = MerchantWalletEntity.normalizePercent(
      params.settlementFeePercent ?? 0
    )

    this.isMerchantEnabled = params.isMerchantEnabled ?? true
    this.isSettlementEnabled = params.isSettlementEnabled ?? true

    this.status = params.status ?? "pending"

    this.createdAt = params.createdAt ?? new Date()
    this.updatedAt = params.updatedAt ?? new Date()
  }

  static create(params: MerchantWalletEntityParams = {}) {
    return new MerchantWalletEntity(params)
  }

  getAvailableBalance(): number {
    return MerchantWalletEntity.roundMoney(
      Math.max(0, this.balance - this.holdBalance)
    )
  }

  canDebit(amount: number): boolean {
    const normalizedAmount = MerchantWalletEntity.normalizeMoney(amount)
    return this.getAvailableBalance() >= normalizedAmount
  }

  credit(amount: number): this {
    const normalizedAmount = MerchantWalletEntity.normalizeMoney(amount)

    this.balance = MerchantWalletEntity.roundMoney(
      this.balance + normalizedAmount
    )
    this.touch()

    return this
  }

  debit(amount: number): this {
    const normalizedAmount = MerchantWalletEntity.normalizeMoney(amount)

    if (!this.canDebit(normalizedAmount)) {
      throw new Error("Insufficient merchant wallet balance")
    }

    this.balance = MerchantWalletEntity.roundMoney(
      Math.max(0, this.balance - normalizedAmount)
    )
    this.touch()

    return this
  }

  placeHold(amount: number): this {
    const normalizedAmount = MerchantWalletEntity.normalizeMoney(amount)

    if (!this.canDebit(normalizedAmount)) {
      throw new Error("Insufficient available merchant wallet balance for hold")
    }

    this.holdBalance = MerchantWalletEntity.roundMoney(
      this.holdBalance + normalizedAmount
    )
    this.touch()

    return this
  }

  releaseHold(amount: number): this {
    const normalizedAmount = MerchantWalletEntity.normalizeMoney(amount)

    this.holdBalance = MerchantWalletEntity.roundMoney(
      Math.max(0, this.holdBalance - normalizedAmount)
    )
    this.touch()

    return this
  }

  applyServiceFeePercent(percent: number): this {
    this.serviceFeePercent = MerchantWalletEntity.normalizePercent(percent)
    this.touch()

    return this
  }

  applySettlementFeePercent(percent: number): this {
    this.settlementFeePercent = MerchantWalletEntity.normalizePercent(percent)
    this.touch()

    return this
  }

  setStatus(status: MerchantWalletStatus): this {
    this.status = status
    this.touch()

    return this
  }

  toJSON(): MerchantWalletEntitySnapshot {
    return {
      id: this.id,
      ownerUserId: this.ownerUserId,
      businessWalletId: this.businessWalletId,

      merchantId: this.merchantId,
      merchantName: this.merchantName,
      displayName: this.displayName,

      category: this.category,
      mcc: this.mcc,

      phone: this.phone,
      email: this.email,
      settlementReference: this.settlementReference,

      defaultCurrency: this.defaultCurrency,
      availableCurrencies: [...this.availableCurrencies],

      balance: this.balance,
      holdBalance: this.holdBalance,

      serviceFeePercent: this.serviceFeePercent,
      settlementFeePercent: this.settlementFeePercent,

      isMerchantEnabled: this.isMerchantEnabled,
      isSettlementEnabled: this.isSettlementEnabled,

      status: this.status,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private touch() {
    this.updatedAt = new Date()
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

    return MerchantWalletEntity.roundMoney(Math.max(0, Number(value)))
  }

  private static roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}