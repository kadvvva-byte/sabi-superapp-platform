import {
  MerchantWalletEntity,
  type MerchantWalletEntitySnapshot,
} from "../../domain/entities/merchant-wallet.entity"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"

export class InMemoryMerchantWalletRepository
  implements MerchantWalletRepository
{
  private readonly items = new Map<string, MerchantWalletEntitySnapshot>()

  async save(wallet: MerchantWalletEntity): Promise<void> {
    if (!wallet.id) {
      wallet.id = this.createId()
    }

    this.items.set(wallet.id, this.cloneSnapshot(wallet.toJSON()))
  }

  async findById(id: string): Promise<MerchantWalletEntity | null> {
    const snapshot = this.items.get(id)

    if (!snapshot) {
      return null
    }

    return MerchantWalletEntity.create(this.cloneSnapshot(snapshot))
  }

  async findByOwnerUserId(ownerUserId: string): Promise<MerchantWalletEntity[]> {
    return Array.from(this.items.values())
      .filter((item) => item.ownerUserId === ownerUserId)
      .map((item) => MerchantWalletEntity.create(this.cloneSnapshot(item)))
  }

  async findByBusinessWalletId(
    businessWalletId: string
  ): Promise<MerchantWalletEntity[]> {
    return Array.from(this.items.values())
      .filter((item) => item.businessWalletId === businessWalletId)
      .map((item) => MerchantWalletEntity.create(this.cloneSnapshot(item)))
  }

  async findAll(): Promise<MerchantWalletEntity[]> {
    return Array.from(this.items.values()).map((item) =>
      MerchantWalletEntity.create(this.cloneSnapshot(item))
    )
  }

  private createId(): string {
    const random = Math.random().toString(36).slice(2, 10)
    return `merchant_wallet_${Date.now()}_${random}`
  }

  private cloneSnapshot(
    snapshot: MerchantWalletEntitySnapshot
  ): MerchantWalletEntitySnapshot {
    return {
      ...snapshot,
      availableCurrencies: [...snapshot.availableCurrencies],
      createdAt: new Date(snapshot.createdAt),
      updatedAt: new Date(snapshot.updatedAt),
    }
  }
}