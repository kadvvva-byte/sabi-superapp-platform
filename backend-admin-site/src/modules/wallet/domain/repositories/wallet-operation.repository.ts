import { WalletOperationEntity } from "../entities/wallet-operation.entity"

export interface WalletOperationRepository {
  save(operation: WalletOperationEntity): Promise<void> | void

  findById(
    id: string
  ): Promise<WalletOperationEntity | null> | WalletOperationEntity | null

  findByWalletId(
    walletId: string
  ): Promise<WalletOperationEntity[]> | WalletOperationEntity[]
}