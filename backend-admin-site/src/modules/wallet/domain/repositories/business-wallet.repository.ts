import { BusinessWalletEntity } from "../entities/business-wallet.entity"

export interface BusinessWalletRepository {
  findById(id: string): Promise<BusinessWalletEntity | null>
  findByBusinessId(businessId: string): Promise<BusinessWalletEntity | null>
  findByOwnerUserId(ownerUserId: string): Promise<BusinessWalletEntity[]>
  save(wallet: BusinessWalletEntity): Promise<void>
}