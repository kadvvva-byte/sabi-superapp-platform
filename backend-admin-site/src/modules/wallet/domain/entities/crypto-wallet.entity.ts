import { DomainError } from "@/core/kernel"
import { WalletOwnerType } from "../constants/wallet-owner-type"
import { WalletAccountEntity } from "./wallet-account.entity"

export type CryptoAssetBalance = {
  assetCode: string
  network?: string | null
  address?: string | null
  availableBalance: number
  lockedBalance: number
}

type CryptoWalletProps = {
  ownerUserId: string
  ownerType: WalletOwnerType
  balance: number
  currency: string
  status: "PENDING" | "ACTIVE" | "BLOCKED" | "CLOSED"
  displayName?: string | null
  businessId?: string | null
  merchantId?: string | null
  assets: CryptoAssetBalance[]
  createdAt?: Date
  updatedAt?: Date
}

export class CryptoWalletEntity extends WalletAccountEntity<CryptoWalletProps & {
  productType: "CRYPTO"
  accountKind: "CRYPTO_WALLET"
}> {
  constructor(params: {
    id: string
    ownerUserId: string
    ownerType?: WalletOwnerType
    displayName?: string | null
    businessId?: string | null
    merchantId?: string | null
    status?: "PENDING" | "ACTIVE" | "BLOCKED" | "CLOSED"
    assets?: CryptoAssetBalance[]
    createdAt?: Date
    updatedAt?: Date
  }) {
    const assets = (params.assets ?? []).map((asset) => ({
      assetCode: asset.assetCode.trim().toUpperCase(),
      network: asset.network?.trim() || null,
      address: asset.address?.trim() || null,
      availableBalance: asset.availableBalance ?? 0,
      lockedBalance: asset.lockedBalance ?? 0,
    }))

    super(params.id, {
      ownerUserId: params.ownerUserId,
      ownerType: params.ownerType ?? "PERSONAL",
      productType: "CRYPTO",
      accountKind: "CRYPTO_WALLET",
      balance: assets.reduce(
        (sum, asset) => sum + asset.availableBalance + asset.lockedBalance,
        0,
      ),
      currency: "CRYPTO",
      status: params.status ?? "ACTIVE",
      displayName: params.displayName ?? null,
      businessId: params.businessId ?? null,
      merchantId: params.merchantId ?? null,
      assets,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
    })
  }

  public get assets(): CryptoAssetBalance[] {
    return [...this.props.assets]
  }

  public getAsset(assetCode: string): CryptoAssetBalance | null {
    const normalized = assetCode.trim().toUpperCase()
    return this.props.assets.find((asset) => asset.assetCode === normalized) ?? null
  }

  public creditAsset(assetCode: string, amount: number): void {
    this.assertPositiveAmount(amount)
    const asset = this.getOrCreateAsset(assetCode)
    asset.availableBalance += amount
    this.recalculateBalance()
  }

  public debitAsset(assetCode: string, amount: number): void {
    this.assertPositiveAmount(amount)
    const asset = this.getOrCreateAsset(assetCode)

    if (asset.availableBalance < amount) {
      throw new DomainError("Insufficient crypto asset balance.")
    }

    asset.availableBalance -= amount
    this.recalculateBalance()
  }

  public lockAsset(assetCode: string, amount: number): void {
    this.assertPositiveAmount(amount)
    const asset = this.getOrCreateAsset(assetCode)

    if (asset.availableBalance < amount) {
      throw new DomainError("Insufficient crypto asset balance to lock.")
    }

    asset.availableBalance -= amount
    asset.lockedBalance += amount
    this.recalculateBalance()
  }

  public unlockAsset(assetCode: string, amount: number): void {
    this.assertPositiveAmount(amount)
    const asset = this.getOrCreateAsset(assetCode)

    if (asset.lockedBalance < amount) {
      throw new DomainError("Insufficient locked crypto asset balance.")
    }

    asset.lockedBalance -= amount
    asset.availableBalance += amount
    this.recalculateBalance()
  }

  private getOrCreateAsset(assetCode: string): CryptoAssetBalance {
    const normalized = assetCode.trim().toUpperCase()

    if (!normalized) {
      throw new DomainError("Crypto asset code is required.")
    }

    let asset = this.props.assets.find((item) => item.assetCode === normalized)

    if (!asset) {
      asset = {
        assetCode: normalized,
        network: null,
        address: null,
        availableBalance: 0,
        lockedBalance: 0,
      }

      this.props.assets.push(asset)
    }

    return asset
  }

  private recalculateBalance(): void {
    this.props.balance = this.props.assets.reduce(
      (sum, asset) => sum + asset.availableBalance + asset.lockedBalance,
      0,
    )
    this.touch()
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      assets: this.assets,
    }
  }
}