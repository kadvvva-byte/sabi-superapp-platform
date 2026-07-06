import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"

export type LedgerEntryType = "DEBIT" | "CREDIT"

type LedgerEntryProps = {
  walletId: string
  transactionId?: string | null
  amount: number
  type: LedgerEntryType
  operationType: string
  uniqueOperationId: string
  createdAt?: Date
  updatedAt?: Date
}

export class LedgerEntryEntity extends AggregateRoot<LedgerEntryProps> {
  constructor(params: {
    id: string
    walletId: string
    transactionId?: string | null
    amount: number
    type: LedgerEntryType
    operationType: string
    uniqueOperationId: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    if (!params.id?.trim()) {
      throw new DomainError("Ledger entry id is required.")
    }

    if (!params.walletId?.trim()) {
      throw new DomainError("Wallet id is required.")
    }

    if (params.amount <= 0) {
      throw new DomainError("Ledger entry amount must be greater than zero.")
    }

    if (!params.operationType?.trim()) {
      throw new DomainError("Operation type is required.")
    }

    if (!params.uniqueOperationId?.trim()) {
      throw new DomainError("Unique operation id is required.")
    }

    super(
      {
        walletId: params.walletId,
        transactionId: params.transactionId ?? null,
        amount: params.amount,
        type: params.type,
        operationType: params.operationType.trim(),
        uniqueOperationId: params.uniqueOperationId.trim(),
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      UniqueId.create(params.id),
    )
  }

  public get ledgerEntryId(): string {
    return this.id.toString()
  }

  public get walletId(): string {
    return this.props.walletId
  }

  public get transactionId(): string | null | undefined {
    return this.props.transactionId
  }

  public get amount(): number {
    return this.props.amount
  }

  public get type(): LedgerEntryType {
    return this.props.type
  }

  public get operationType(): string {
    return this.props.operationType
  }

  public get uniqueOperationId(): string {
    return this.props.uniqueOperationId
  }

  public isCredit(): boolean {
    return this.props.type === "CREDIT"
  }

  public isDebit(): boolean {
    return this.props.type === "DEBIT"
  }

  public toJSON() {
    return {
      id: this.ledgerEntryId,
      walletId: this.walletId,
      transactionId: this.transactionId ?? null,
      amount: this.amount,
      type: this.type,
      operationType: this.operationType,
      uniqueOperationId: this.uniqueOperationId,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }
}