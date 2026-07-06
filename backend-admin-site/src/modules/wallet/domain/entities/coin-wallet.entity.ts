import { DomainError } from "@/core/kernel"
import { WalletOwnerType } from "../constants/wallet-owner-type"
import { WalletAccountEntity } from "./wallet-account.entity"

type CoinWalletProps = {
  ownerUserId: string
  ownerType: WalletOwnerType
  balance: number
  currency: "COIN"
  status: "PENDING" | "ACTIVE" | "BLOCKED" | "CLOSED"
  displayName?: string | null
  businessId?: string | null
  merchantId?: string | null
  availableBalance: number
  lockedBalance: number
  earnedBalance: number
  pendingSettlementBalance: number
  createdAt?: Date
  updatedAt?: Date
}

export class CoinWalletEntity extends WalletAccountEntity<CoinWalletProps & {
  productType: "COIN"
  accountKind: "COIN_WALLET"
}> {
  constructor(params: {
    id: string
    ownerUserId: string
    ownerType?: WalletOwnerType
    displayName?: string | null
    businessId?: string | null
    merchantId?: string | null
    status?: "PENDING" | "ACTIVE" | "BLOCKED" | "CLOSED"
    availableBalance?: number
    lockedBalance?: number
    earnedBalance?: number
    pendingSettlementBalance?: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    const availableBalance = params.availableBalance ?? 0
    const lockedBalance = params.lockedBalance ?? 0
    const earnedBalance = params.earnedBalance ?? 0
    const pendingSettlementBalance = params.pendingSettlementBalance ?? 0

    if (
      availableBalance < 0 ||
      lockedBalance < 0 ||
      earnedBalance < 0 ||
      pendingSettlementBalance < 0
    ) {
      throw new DomainError("Coin wallet balances cannot be negative.")
    }

    super(params.id, {
      ownerUserId: params.ownerUserId,
      ownerType: params.ownerType ?? "PERSONAL",
      productType: "COIN",
      accountKind: "COIN_WALLET",
      balance:
        availableBalance +
        lockedBalance +
        earnedBalance +
        pendingSettlementBalance,
      currency: "COIN",
      status: params.status ?? "ACTIVE",
      displayName: params.displayName ?? null,
      businessId: params.businessId ?? null,
      merchantId: params.merchantId ?? null,
      availableBalance,
      lockedBalance,
      earnedBalance,
      pendingSettlementBalance,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    })
  }

  public get availableBalance(): number {
    return this.props.availableBalance
  }

  public get lockedBalance(): number {
    return this.props.lockedBalance
  }

  public get earnedBalance(): number {
    return this.props.earnedBalance
  }

  public get pendingSettlementBalance(): number {
    return this.props.pendingSettlementBalance
  }

  public creditAvailable(amount: number): void {
    this.assertPositiveAmount(amount)
    this.props.availableBalance += amount
    this.recalculateBalance()
  }

  public debitAvailable(amount: number): void {
    this.assertPositiveAmount(amount)

    if (this.props.availableBalance < amount) {
      throw new DomainError("Insufficient available coin balance.")
    }

    this.props.availableBalance -= amount
    this.recalculateBalance()
  }

  public lock(amount: number): void {
    this.assertPositiveAmount(amount)

    if (this.props.availableBalance < amount) {
      throw new DomainError("Insufficient available coin balance to lock.")
    }

    this.props.availableBalance -= amount
    this.props.lockedBalance += amount
    this.recalculateBalance()
  }

  public unlock(amount: number): void {
    this.assertPositiveAmount(amount)

    if (this.props.lockedBalance < amount) {
      throw new DomainError("Insufficient locked coin balance.")
    }

    this.props.lockedBalance -= amount
    this.props.availableBalance += amount
    this.recalculateBalance()
  }

  public creditEarnings(amount: number): void {
    this.assertPositiveAmount(amount)
    this.props.earnedBalance += amount
    this.recalculateBalance()
  }

  public addPendingSettlement(amount: number): void {
    this.assertPositiveAmount(amount)
    this.props.pendingSettlementBalance += amount
    this.recalculateBalance()
  }

  public settlePendingToAvailable(amount?: number): void {
    const settlementAmount = amount ?? this.props.pendingSettlementBalance

    this.assertPositiveAmount(settlementAmount)

    if (this.props.pendingSettlementBalance < settlementAmount) {
      throw new DomainError("Insufficient pending settlement coin balance.")
    }

    this.props.pendingSettlementBalance -= settlementAmount
    this.props.availableBalance += settlementAmount
    this.recalculateBalance()
  }

  private recalculateBalance(): void {
    this.props.balance =
      this.props.availableBalance +
      this.props.lockedBalance +
      this.props.earnedBalance +
      this.props.pendingSettlementBalance

    this.touch()
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      availableBalance: this.availableBalance,
      lockedBalance: this.lockedBalance,
      earnedBalance: this.earnedBalance,
      pendingSettlementBalance: this.pendingSettlementBalance,
    }
  }
}