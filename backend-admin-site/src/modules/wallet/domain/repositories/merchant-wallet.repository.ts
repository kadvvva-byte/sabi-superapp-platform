import { MerchantWalletEntity } from "../entities/merchant-wallet.entity"

export interface MerchantWalletRepository {
  save(wallet: MerchantWalletEntity): Promise<void> | void

  findById(
    id: string
  ): Promise<MerchantWalletEntity | null> | MerchantWalletEntity | null

  findByOwnerUserId(
    ownerUserId: string
  ): Promise<MerchantWalletEntity[]> | MerchantWalletEntity[]

  findByBusinessWalletId(
    businessWalletId: string
  ): Promise<MerchantWalletEntity[]> | MerchantWalletEntity[]
}