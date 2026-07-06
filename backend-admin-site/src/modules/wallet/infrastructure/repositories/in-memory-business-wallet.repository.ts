import {
  BusinessWalletEntity,
  type BusinessWalletEntitySnapshot,
} from "../../domain/entities/business-wallet.entity"
import { BusinessWalletRepository } from "../../domain/repositories/business-wallet.repository"

export class InMemoryBusinessWalletRepository
  implements BusinessWalletRepository
{
  private readonly items = new Map<string, BusinessWalletEntitySnapshot>()

  async save(wallet: BusinessWalletEntity): Promise<void> {
    if (!wallet.id) {
      wallet.id = this.createId()
    }

    this.items.set(wallet.id, this.cloneSnapshot(wallet.toJSON()))
  }

  async findById(id: string): Promise<BusinessWalletEntity | null> {
    const snapshot = this.items.get(id)

    if (!snapshot) {
      return null
    }

    return BusinessWalletEntity.create(this.cloneSnapshot(snapshot))
  }

  async findByBusinessId(
    businessId: string
  ): Promise<BusinessWalletEntity | null> {
    const snapshot =
      Array.from(this.items.values()).find(
        (item) => item.businessId === businessId
      ) ?? null

    if (!snapshot) {
      return null
    }

    return BusinessWalletEntity.create(this.cloneSnapshot(snapshot))
  }

  async findByOwnerUserId(ownerUserId: string): Promise<BusinessWalletEntity[]> {
    return Array.from(this.items.values())
      .filter((item) => item.ownerUserId === ownerUserId)
      .map((item) => BusinessWalletEntity.create(this.cloneSnapshot(item)))
  }

  async findAll(): Promise<BusinessWalletEntity[]> {
    return Array.from(this.items.values()).map((item) =>
      BusinessWalletEntity.create(this.cloneSnapshot(item))
    )
  }

  private createId(): string {
    const random = Math.random().toString(36).slice(2, 10)
    return `biz_wallet_${Date.now()}_${random}`
  }

  private cloneSnapshot(
    snapshot: BusinessWalletEntitySnapshot
  ): BusinessWalletEntitySnapshot {
    return {
      ...snapshot,
      availableCurrencies: [...snapshot.availableCurrencies],
      createdAt: new Date(snapshot.createdAt),
      updatedAt: new Date(snapshot.updatedAt),
    }
  }
}