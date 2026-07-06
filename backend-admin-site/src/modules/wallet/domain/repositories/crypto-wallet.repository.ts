import { CryptoWalletEntity } from "../entities/crypto-wallet.entity"

export interface CryptoWalletRepository {
  findById(id: string): Promise<CryptoWalletEntity | null>
  findByOwnerUserId(ownerUserId: string): Promise<CryptoWalletEntity | null>
  save(wallet: CryptoWalletEntity): Promise<void>
}