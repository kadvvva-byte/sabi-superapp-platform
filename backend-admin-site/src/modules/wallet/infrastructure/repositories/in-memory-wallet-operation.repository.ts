import {
  WalletOperationEntity,
  type WalletOperationEntitySnapshot,
} from "../../domain/entities/wallet-operation.entity"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"

export class InMemoryWalletOperationRepository
  implements WalletOperationRepository
{
  private readonly items = new Map<string, WalletOperationEntitySnapshot>()

  async save(operation: WalletOperationEntity): Promise<void> {
    this.items.set(operation.id, this.cloneSnapshot(operation.toJSON()))
  }

  async findById(id: string): Promise<WalletOperationEntity | null> {
    const snapshot = this.items.get(id)

    if (!snapshot) {
      return null
    }

    return WalletOperationEntity.create(this.cloneSnapshot(snapshot))
  }

  async findByWalletId(walletId: string): Promise<WalletOperationEntity[]> {
    return Array.from(this.items.values())
      .filter(
        (item) =>
          item.sourceWalletId === walletId ||
          item.destinationWalletId === walletId ||
          item.businessWalletId === walletId ||
          item.merchantWalletId === walletId
      )
      .map((item) => WalletOperationEntity.create(this.cloneSnapshot(item)))
  }

  async findAll(): Promise<WalletOperationEntity[]> {
    return Array.from(this.items.values()).map((item) =>
      WalletOperationEntity.create(this.cloneSnapshot(item))
    )
  }

  private cloneSnapshot(
    snapshot: WalletOperationEntitySnapshot
  ): WalletOperationEntitySnapshot {
    return {
      ...snapshot,
      metadata: { ...snapshot.metadata },
      createdAt: new Date(snapshot.createdAt),
      completedAt: snapshot.completedAt
        ? new Date(snapshot.completedAt)
        : undefined,
      updatedAt: new Date(snapshot.updatedAt),
    }
  }
}