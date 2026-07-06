import { AggregateRoot, DomainError, UniqueId } from "@/core/kernel"
import { WalletAccountKind } from "../constants/wallet-account-kind"
import { WalletAccountStatus } from "../constants/wallet-account-status"
import { WalletProductType } from "../constants/wallet-product-type"
import { WalletOwnerType } from "../constants/wallet-owner-type"

export type WalletAccountProps = {
  ownerUserId: string
  ownerType: WalletOwnerType
  productType: WalletProductType
  accountKind: WalletAccountKind
  currency: string
  balance: number
  status: WalletAccountStatus
  displayName?: string | null
  businessId?: string | null
  merchantId?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export abstract class WalletAccountEntity<
  TProps extends WalletAccountProps = WalletAccountProps,
> extends AggregateRoot<TProps> {
  protected constructor(id: string, props: TProps) {
    if (!id?.trim()) {
      throw new DomainError("Wallet account id is required.")
    }

    if (!props.ownerUserId?.trim()) {
      throw new DomainError("Wallet owner user id is required.")
    }

    if (!props.currency?.trim()) {
      throw new DomainError("Wallet account currency is required.")
    }

    if (props.balance < 0) {
      throw new DomainError("Wallet account balance cannot be negative.")
    }

    if (props.ownerType === "BUSINESS" && !props.businessId?.trim()) {
      throw new DomainError("Business wallet account must have business id.")
    }

    if (props.ownerType === "MERCHANT" && !props.merchantId?.trim()) {
      throw new DomainError("Merchant wallet account must have merchant id.")
    }

    super(
      {
        ...props,
        currency: props.currency.trim().toUpperCase(),
        displayName: props.displayName?.trim() || null,
        businessId: props.businessId?.trim() || null,
        merchantId: props.merchantId?.trim() || null,
      },
      UniqueId.create(id),
    )
  }

  public get accountId(): string {
    return this.id.toString()
  }

  public get ownerUserId(): string {
    return this.props.ownerUserId
  }

  public get ownerType(): WalletOwnerType {
    return this.props.ownerType
  }

  public get productType(): WalletProductType {
    return this.props.productType
  }

  public get accountKind(): WalletAccountKind {
    return this.props.accountKind
  }

  public get currency(): string {
    return this.props.currency
  }

  public get balance(): number {
    return this.props.balance
  }

  public get status(): WalletAccountStatus {
    return this.props.status
  }

  public get displayName(): string | null | undefined {
    return this.props.displayName
  }

  public get businessId(): string | null | undefined {
    return this.props.businessId
  }

  public get merchantId(): string | null | undefined {
    return this.props.merchantId
  }

  public isActive(): boolean {
    return this.props.status === "ACTIVE"
  }

  public activate(): void {
    this.props.status = "ACTIVE"
    this.touch()
  }

  public block(): void {
    this.props.status = "BLOCKED"
    this.touch()
  }

  public close(): void {
    this.props.status = "CLOSED"
    this.touch()
  }

  protected credit(amount: number): void {
    this.assertPositiveAmount(amount)
    this.props.balance += amount
    this.touch()
  }

  protected debit(amount: number): void {
    this.assertPositiveAmount(amount)

    if (this.props.balance < amount) {
      throw new DomainError("Insufficient balance.")
    }

    this.props.balance -= amount
    this.touch()
  }

  protected assertPositiveAmount(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new DomainError("Amount must be greater than zero.")
    }
  }

  public toJSON() {
    return {
      id: this.accountId,
      ownerUserId: this.ownerUserId,
      ownerType: this.ownerType,
      productType: this.productType,
      accountKind: this.accountKind,
      currency: this.currency,
      balance: this.balance,
      status: this.status,
      displayName: this.displayName ?? null,
      businessId: this.businessId ?? null,
      merchantId: this.merchantId ?? null,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    }
  }
}