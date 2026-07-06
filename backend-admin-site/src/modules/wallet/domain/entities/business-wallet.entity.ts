export type BusinessWalletStatus =
  | "draft"
  | "pending"
  | "active"
  | "blocked"
  | "suspended"
  | "archived"

export type BusinessWalletEntityParams = {
  id?: string
  ownerUserId?: string
  businessId?: string
  merchantId?: string

  businessName?: string
  legalName?: string
  displayName?: string

  phone?: string
  email?: string
  taxId?: string
  registrationNumber?: string

  defaultCurrency?: string
  availableCurrencies?: string[]

  balance?: number
  holdBalance?: number
  serviceFeePercent?: number

  isMerchantEnabled?: boolean
  isBusinessEnabled?: boolean

  status?: BusinessWalletStatus

  createdAt?: Date
  updatedAt?: Date
}

export type BusinessWalletEntitySnapshot = {
  id: string
  ownerUserId: string
  businessId?: string
  merchantId?: string

  businessName: string
  legalName?: string
  displayName?: string

  phone?: string
  email?: string
  taxId?: string
  registrationNumber?: string

  defaultCurrency: string
  availableCurrencies: string[]

  balance: number
  holdBalance: number
  serviceFeePercent: number

  isMerchantEnabled: boolean
  isBusinessEnabled: boolean

  status: BusinessWalletStatus

  createdAt: Date
  updatedAt: Date
}

export class BusinessWalletEntity {
  id: string
  ownerUserId: string
  businessId?: string
  merchantId?: string

  businessName: string
  legalName?: string
  displayName?: string

  phone?: string
  email?: string
  taxId?: string
  registrationNumber?: string

  defaultCurrency: string
  availableCurrencies: string[]

  balance: number
  holdBalance: number
  serviceFeePercent: number

  isMerchantEnabled: boolean
  isBusinessEnabled: boolean

  status: BusinessWalletStatus

  createdAt: Date
  updatedAt: Date

  constructor(params: BusinessWalletEntityParams = {}) {
    this.id = params.id ?? ""
    this.ownerUserId = params.ownerUserId ?? ""
    this.businessId = params.businessId
    this.merchantId = params.merchantId

    this.businessName = params.businessName ?? ""
    this.legalName = params.legalName
    this.displayName = params.displayName

    this.phone = params.phone
    this.email = params.email
    this.taxId = params.taxId
    this.registrationNumber = params.registrationNumber

    this.defaultCurrency = params.defaultCurrency ?? "USD"
    this.availableCurrencies = params.availableCurrencies ?? [this.defaultCurrency]

    this.balance = BusinessWalletEntity.normalizeMoney(params.balance ?? 0)
    this.holdBalance = BusinessWalletEntity.normalizeMoney(
      params.holdBalance ?? 0
    )
    this.serviceFeePercent = BusinessWalletEntity.normalizePercent(
      params.serviceFeePercent ?? 0
    )

    this.isMerchantEnabled = params.isMerchantEnabled ?? false
    this.isBusinessEnabled = params.isBusinessEnabled ?? true

    this.status = params.status ?? "pending"

    this.createdAt = params.createdAt ?? new Date()
    this.updatedAt = params.updatedAt ?? new Date()
  }

  static create(params: BusinessWalletEntityParams = {}) {
    return new BusinessWalletEntity(params)
  }

  getAvailableBalance(): number {
    return BusinessWalletEntity.roundMoney(
      Math.max(0, this.balance - this.holdBalance)
    )
  }

  canDebit(amount: number): boolean {
    const normalizedAmount = BusinessWalletEntity.normalizeMoney(amount)
    return this.getAvailableBalance() >= normalizedAmount
  }

  credit(amount: number): this {
    const normalizedAmount = BusinessWalletEntity.normalizeMoney(amount)

    this.balance = BusinessWalletEntity.roundMoney(
      this.balance + normalizedAmount
    )
    this.touch()

    return this
  }

  debit(amount: number): this {
    const normalizedAmount = BusinessWalletEntity.normalizeMoney(amount)

    if (!this.canDebit(normalizedAmount)) {
      throw new Error("Insufficient business wallet balance")
    }

    this.balance = BusinessWalletEntity.roundMoney(
      Math.max(0, this.balance - normalizedAmount)
    )
    this.touch()

    return this
  }

  placeHold(amount: number): this {
    const normalizedAmount = BusinessWalletEntity.normalizeMoney(amount)

    if (!this.canDebit(normalizedAmount)) {
      throw new Error("Insufficient available business wallet balance for hold")
    }

    this.holdBalance = BusinessWalletEntity.roundMoney(
      this.holdBalance + normalizedAmount
    )
    this.touch()

    return this
  }

  releaseHold(amount: number): this {
    const normalizedAmount = BusinessWalletEntity.normalizeMoney(amount)

    this.holdBalance = BusinessWalletEntity.roundMoney(
      Math.max(0, this.holdBalance - normalizedAmount)
    )
    this.touch()

    return this
  }

  applyServiceFeePercent(percent: number): this {
    this.serviceFeePercent = BusinessWalletEntity.normalizePercent(percent)
    this.touch()

    return this
  }

  setMerchantEnabled(value: boolean): this {
    this.isMerchantEnabled = value
    this.touch()

    return this
  }

  setStatus(status: BusinessWalletStatus): this {
    this.status = status
    this.touch()

    return this
  }

  toJSON(): BusinessWalletEntitySnapshot {
    return {
      id: this.id,
      ownerUserId: this.ownerUserId,
      businessId: this.businessId,
      merchantId: this.merchantId,

      businessName: this.businessName,
      legalName: this.legalName,
      displayName: this.displayName,

      phone: this.phone,
      email: this.email,
      taxId: this.taxId,
      registrationNumber: this.registrationNumber,

      defaultCurrency: this.defaultCurrency,
      availableCurrencies: [...this.availableCurrencies],

      balance: this.balance,
      holdBalance: this.holdBalance,
      serviceFeePercent: this.serviceFeePercent,

      isMerchantEnabled: this.isMerchantEnabled,
      isBusinessEnabled: this.isBusinessEnabled,

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

    return BusinessWalletEntity.roundMoney(Math.max(0, Number(value)))
  }

  private static roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}