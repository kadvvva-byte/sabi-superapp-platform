import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"
import { WalletTransactionType } from "../constants/wallet-transaction-type"

export type WalletTransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"

type TransactionProps = {
  walletId: string
  fromWalletId?: string | null
  toWalletId?: string | null
  reference?: string | null
  amount: number
  currency: string
  type: WalletTransactionType
  status: WalletTransactionStatus
  failureReason?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export class TransactionEntity extends AggregateRoot<TransactionProps> {
  constructor(params: {
    id: string
    walletId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    reference?: string | null
    amount: number
    currency?: string
    type: WalletTransactionType
    status?: WalletTransactionStatus
    failureReason?: string | null
    createdAt?: Date
    updatedAt?: Date
  }) {
    if (!params.id?.trim()) {
      throw new DomainError("Transaction id is required.")
    }

    if (!params.walletId?.trim()) {
      throw new DomainError("Wallet id is required.")
    }

    if (params.amount <= 0) {
      throw new DomainError("Transaction amount must be greater than zero.")
    }

    super(
      {
        walletId: params.walletId,
        fromWalletId: params.fromWalletId ?? null,
        toWalletId: params.toWalletId ?? null,
        reference: params.reference ?? null,
        amount: params.amount,
        currency: (params.currency ?? "USD").trim().toUpperCase(),
        type: params.type,
        status: params.status ?? "PENDING",
        failureReason: params.failureReason ?? null,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      UniqueId.create(params.id),
    )
  }

  public get transactionId(): string {
    return this.id.toString()
  }

  public get walletId(): string {
    return this.props.walletId
  }

  public get fromWalletId(): string | null | undefined {
    return this.props.fromWalletId
  }

  public get toWalletId(): string | null | undefined {
    return this.props.toWalletId
  }

  public get reference(): string | null | undefined {
    return this.props.reference
  }

  public get amount(): number {
    return this.props.amount
  }

  public get currency(): string {
    return this.props.currency
  }

  public get type(): WalletTransactionType {
    return this.props.type
  }

  public get status(): WalletTransactionStatus {
    return this.props.status
  }

  public get failureReason(): string | null | undefined {
    return this.props.failureReason
  }

  public markPending(): void {
    this.props.status = "PENDING"
    this.props.failureReason = null
    this.touch()
  }

  public markSuccess(): void {
    this.props.status = "SUCCESS"
    this.props.failureReason = null
    this.touch()
  }

  public markFailed(reason?: string): void {
    this.props.status = "FAILED"
    this.props.failureReason = reason?.trim() || null
    this.touch()
  }

  public markCancelled(reason?: string): void {
    this.props.status = "CANCELLED"
    this.props.failureReason = reason?.trim() || null
    this.touch()
  }

  public toJSON() {
    return {
      id: this.transactionId,
      walletId: this.walletId,
      fromWalletId: this.fromWalletId ?? null,
      toWalletId: this.toWalletId ?? null,
      reference: this.reference ?? null,
      amount: this.amount,
      currency: this.currency,
      type: this.type,
      status: this.status,
      failureReason: this.failureReason ?? null,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }
}