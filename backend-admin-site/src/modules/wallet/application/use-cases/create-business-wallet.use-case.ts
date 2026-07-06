import {
  BusinessWalletEntity,
  type BusinessWalletEntityParams,
} from "../../domain/entities/business-wallet.entity"
import { BusinessWalletRepository } from "../../domain/repositories/business-wallet.repository"

export type CreateBusinessWalletInput = BusinessWalletEntityParams

export class CreateBusinessWalletUseCase {
  constructor(
    private readonly businessWalletRepository: BusinessWalletRepository
  ) {}

  async execute(input: CreateBusinessWalletInput) {
    const wallet = BusinessWalletEntity.create({
      ...input,
      balance: input.balance ?? 0,
      holdBalance: input.holdBalance ?? 0,
      serviceFeePercent: input.serviceFeePercent ?? 0,
      isMerchantEnabled: input.isMerchantEnabled ?? false,
      isBusinessEnabled: input.isBusinessEnabled ?? true,
      status: input.status ?? "pending",
    })

    await this.businessWalletRepository.save(wallet)

    return wallet.toJSON()
  }
}