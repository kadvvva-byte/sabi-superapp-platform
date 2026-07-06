import { Wallet } from "../entities/wallet.entity"

export interface WalletRepository {

  create(wallet: Wallet): Promise<void>

  findById(id: string): Promise<Wallet | null>

  findByUserId(userId: string): Promise<Wallet | null>

  save(wallet: Wallet): Promise<void>

}