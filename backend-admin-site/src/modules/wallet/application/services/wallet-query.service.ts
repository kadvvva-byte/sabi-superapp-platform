import type { BusinessWalletEntitySnapshot } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntitySnapshot } from "../../domain/entities/merchant-wallet.entity"
import type { WalletOperationEntitySnapshot } from "../../domain/entities/wallet-operation.entity"

import { BusinessWalletRepository } from "../../domain/repositories/business-wallet.repository"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"

export class WalletQueryService {
  constructor(
    private readonly businessWalletRepository: BusinessWalletRepository,
    private readonly merchantWalletRepository: MerchantWalletRepository,
    private readonly walletOperationRepository: WalletOperationRepository
  ) {}

  async getBusinessWalletById(
    id: string
  ): Promise<BusinessWalletEntitySnapshot | null> {
    const wallet = await this.businessWalletRepository.findById(id)
    return wallet ? wallet.toJSON() : null
  }

  async getBusinessWalletByBusinessId(
    businessId: string
  ): Promise<BusinessWalletEntitySnapshot | null> {
    const wallet = await this.businessWalletRepository.findByBusinessId(
      businessId
    )

    return wallet ? wallet.toJSON() : null
  }

  async listBusinessWalletsByOwnerUserId(
    ownerUserId: string
  ): Promise<BusinessWalletEntitySnapshot[]> {
    const wallets =
      await this.businessWalletRepository.findByOwnerUserId(ownerUserId)

    return wallets.map((wallet) => wallet.toJSON())
  }

  async getMerchantWalletById(
    id: string
  ): Promise<MerchantWalletEntitySnapshot | null> {
    const wallet = await this.merchantWalletRepository.findById(id)
    return wallet ? wallet.toJSON() : null
  }

  async listMerchantWalletsByOwnerUserId(
    ownerUserId: string
  ): Promise<MerchantWalletEntitySnapshot[]> {
    const wallets =
      await this.merchantWalletRepository.findByOwnerUserId(ownerUserId)

    return wallets.map((wallet) => wallet.toJSON())
  }

  async listMerchantWalletsByBusinessWalletId(
    businessWalletId: string
  ): Promise<MerchantWalletEntitySnapshot[]> {
    const wallets =
      await this.merchantWalletRepository.findByBusinessWalletId(
        businessWalletId
      )

    return wallets.map((wallet) => wallet.toJSON())
  }

  async getWalletOperationById(
    id: string
  ): Promise<WalletOperationEntitySnapshot | null> {
    const operation = await this.walletOperationRepository.findById(id)
    return operation ? operation.toJSON() : null
  }

  async listWalletOperationsByWalletId(
    walletId: string
  ): Promise<WalletOperationEntitySnapshot[]> {
    const operations = await this.walletOperationRepository.findByWalletId(
      walletId
    )

    return operations.map((operation) => operation.toJSON())
  }
}