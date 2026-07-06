import { CoinWalletEntity } from "../entities/coin-wallet.entity"

export interface CoinWalletRepository {
  findById(id: string): Promise<CoinWalletEntity | null>
  findByOwnerUserId(ownerUserId: string): Promise<CoinWalletEntity | null>
  save(wallet: CoinWalletEntity): Promise<void>
}