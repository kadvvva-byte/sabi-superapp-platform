import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
} from "../../domain/entities/merchant-wallet.entity"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"

export type CreateMerchantWalletInput = MerchantWalletEntityParams

export class CreateMerchantWalletUseCase {
  constructor(
    private readonly merchantWalletRepository: MerchantWalletRepository
  ) {}

  async execute(input: CreateMerchantWalletInput) {
    const wallet = MerchantWalletEntity.create({
      ...input,
      balance: input.balance ?? 0,
      holdBalance: input.holdBalance ?? 0,
      serviceFeePercent: input.serviceFeePercent ?? 0,
      settlementFeePercent: input.settlementFeePercent ?? 0,
      isMerchantEnabled: input.isMerchantEnabled ?? true,
      isSettlementEnabled: input.isSettlementEnabled ?? true,
      status: input.status ?? "pending",
    })

    await this.merchantWalletRepository.save(wallet)

    return wallet.toJSON()
  }
}