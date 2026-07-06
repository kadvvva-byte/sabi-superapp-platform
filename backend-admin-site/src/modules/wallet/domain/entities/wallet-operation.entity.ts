import {
  type WalletOperationKind,
  type WalletOperationStatus,
} from "../constants/wallet-operation-kind"

export type WalletOperationEntityParams = {
  id?: string
  kind: WalletOperationKind
  status?: WalletOperationStatus

  currency?: string
  amount?: number
  fee?: number
  percentFee?: number
  debitAmount?: number
  creditAmount?: number

  sourceWalletId?: string
  destinationWalletId?: string

  businessWalletId?: string
  merchantWalletId?: string

  title?: string
  description?: string

  metadata?: Record<string, unknown>

  createdAt?: Date
  completedAt?: Date
  updatedAt?: Date
}

export type WalletOperationEntitySnapshot = {
  id: string
  kind: WalletOperationKind
  status: WalletOperationStatus

  currency: string
  amount: number
  fee: number
  percentFee: number
  debitAmount: number
  creditAmount: number

  sourceWalletId?: string
  destinationWalletId?: string

  businessWalletId?: string
  merchantWalletId?: string

  title?: string
  description?: string

  metadata: Record<string, unknown>

  createdAt: Date
  completedAt?: Date
  updatedAt: Date
}

export class WalletOperationEntity {
  id: string
  kind: WalletOperationKind
  status: WalletOperationStatus

  currency: string
  amount: number
  fee: number
  percentFee: number
  debitAmount: number
  creditAmount: number

  sourceWalletId?: string
  destinationWalletId?: string

  businessWalletId?: string
  merchantWalletId?: string

  title?: string
  description?: string

  metadata: Record<string, unknown>

  createdAt: Date
  completedAt?: Date
  updatedAt: Date

  constructor(params: WalletOperationEntityParams) {
    this.id = params.id ?? WalletOperationEntity.createId()
    this.kind = params.kind
    this.status = params.status ?? "completed"

    this.currency = params.currency ?? "USD"
    this.amount = WalletOperationEntity.normalizeMoney(params.amount ?? 0)
    this.fee = WalletOperationEntity.normalizeMoney(params.fee ?? 0)
    this.percentFee = WalletOperationEntity.normalizeMoney(params.percentFee ?? 0)
    this.debitAmount = WalletOperationEntity.normalizeMoney(params.debitAmount ?? 0)
    this.creditAmount = WalletOperationEntity.normalizeMoney(
      params.creditAmount ?? 0
    )

    this.sourceWalletId = params.sourceWalletId
    this.destinationWalletId = params.destinationWalletId

    this.businessWalletId = params.businessWalletId
    this.merchantWalletId = params.merchantWalletId

    this.title = params.title
    this.description = params.description

    this.metadata = params.metadata ?? {}

    this.createdAt = params.createdAt ?? new Date()
    this.completedAt = params.completedAt
    this.updatedAt = params.updatedAt ?? new Date()
  }

  static create(params: WalletOperationEntityParams) {
    return new WalletOperationEntity(params)
  }

  markCompleted() {
    this.status = "completed"
    this.completedAt = new Date()
    this.updatedAt = new Date()

    return this
  }

  markFailed(reason?: string) {
    this.status = "failed"
    this.updatedAt = new Date()

    if (reason) {
      this.metadata = {
        ...this.metadata,
        failureReason: reason,
      }
    }

    return this
  }

  toJSON(): WalletOperationEntitySnapshot {
    return {
      id: this.id,
      kind: this.kind,
      status: this.status,

      currency: this.currency,
      amount: this.amount,
      fee: this.fee,
      percentFee: this.percentFee,
      debitAmount: this.debitAmount,
      creditAmount: this.creditAmount,

      sourceWalletId: this.sourceWalletId,
      destinationWalletId: this.destinationWalletId,

      businessWalletId: this.businessWalletId,
      merchantWalletId: this.merchantWalletId,

      title: this.title,
      description: this.description,

      metadata: { ...this.metadata },

      createdAt: this.createdAt,
      completedAt: this.completedAt,
      updatedAt: this.updatedAt,
    }
  }

  private static normalizeMoney(value: number): number {
    if (!Number.isFinite(value)) {
      return 0
    }

    return Math.round(Math.max(0, Number(value)) * 100) / 100
  }

  private static createId(): string {
    const random = Math.random().toString(36).slice(2, 10)
    return `wallet_op_${Date.now()}_${random}`
  }
}