import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"
import { Money } from "../value-objects/money.vo"

type WalletProps = {
  userId: string
  balance: number
  currency: string
  nonce: number
  createdAt?: Date
  updatedAt?: Date
}

export class Wallet extends AggregateRoot<WalletProps> {
  constructor(
    id: string,
    userId: string,
    balance = 0,
    currency = "USD",
    nonce = 0,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!id?.trim()) {
      throw new DomainError("Wallet id is required.")
    }

    if (!userId?.trim()) {
      throw new DomainError("User id is required.")
    }

    if (!currency?.trim()) {
      throw new DomainError("Currency is required.")
    }

    if (balance < 0) {
      throw new DomainError("Wallet balance cannot be negative.")
    }

    if (nonce < 0) {
      throw new DomainError("Wallet nonce cannot be negative.")
    }

    super(
      {
        userId,
        balance,
        currency: currency.trim().toUpperCase(),
        nonce,
        createdAt,
        updatedAt,
      },
      UniqueId.create(id),
    )
  }

  public get walletId(): string {
    return this.id.toString()
  }

  public get userId(): string {
    return this.props.userId
  }

  public get balance(): number {
    return this.props.balance
  }

  public get currency(): string {
    return this.props.currency
  }

  public get nonce(): number {
    return this.props.nonce
  }

  public deposit(money: Money): void {
    this.assertMoney(money)
    this.props.balance += money.amount
    this.touch()
  }

  public withdraw(money: Money): void {
    this.assertMoney(money)

    if (this.props.balance < money.amount) {
      throw new DomainError("Insufficient balance.")
    }

    this.props.balance -= money.amount
    this.touch()
  }

  public incrementNonce(): void {
    this.props.nonce += 1
    this.touch()
  }

  public canWithdraw(money: Money): boolean {
    this.assertMoney(money)
    return this.props.balance >= money.amount
  }

  public toJSON() {
    return {
      id: this.walletId,
      userId: this.userId,
      balance: this.balance,
      currency: this.currency,
      nonce: this.nonce,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }

  private assertMoney(money: Money): void {
    if (!money) {
      throw new DomainError("Money is required.")
    }

    if (money.amount <= 0) {
      throw new DomainError("Money amount must be greater than zero.")
    }
  }
}