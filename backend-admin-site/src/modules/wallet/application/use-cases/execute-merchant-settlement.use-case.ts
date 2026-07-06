import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
  type MerchantWalletEntitySnapshot,
} from "../../domain/entities/merchant-wallet.entity"
import { CalculateMerchantSettlementPreviewUseCase } from "./calculate-merchant-settlement-preview.use-case"

export type ExecuteMerchantSettlementInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export type ExecuteMerchantSettlementOutput = {
  settlement: {
    amount: number
    fee: number
    percentFee: number
    merchantDebit: number
    settlementCredit: number
    currency: string
    direction: string
    settlementFeePercent: number
  }
  merchantWallet: MerchantWalletEntitySnapshot
}

export class ExecuteMerchantSettlementUseCase {
  constructor(
    private readonly previewUseCase =
      new CalculateMerchantSettlementPreviewUseCase()
  ) {}

  execute(
    input: ExecuteMerchantSettlementInput
  ): ExecuteMerchantSettlementOutput {
    const merchantWallet = this.resolveWallet(input.merchantWallet)

    const preview = this.previewUseCase.execute({
      merchantWallet,
      amount: input.amount,
      currency: input.currency,
    })

    if (!preview.isBalanceEnough) {
      throw new Error("Insufficient balance for merchant settlement")
    }

    merchantWallet.debit(preview.merchantDebit)

    return {
      settlement: {
        amount: preview.amount,
        fee: preview.fee,
        percentFee: preview.percentFee,
        merchantDebit: preview.merchantDebit,
        settlementCredit: preview.settlementCredit,
        currency: preview.currency,
        direction: preview.direction,
        settlementFeePercent: preview.settlementFeePercent,
      },
      merchantWallet: merchantWallet.toJSON(),
    }
  }

  private resolveWallet(
    wallet: MerchantWalletEntity | MerchantWalletEntityParams
  ): MerchantWalletEntity {
    if (wallet instanceof MerchantWalletEntity) {
      return wallet
    }

    return MerchantWalletEntity.create(wallet)
  }
}