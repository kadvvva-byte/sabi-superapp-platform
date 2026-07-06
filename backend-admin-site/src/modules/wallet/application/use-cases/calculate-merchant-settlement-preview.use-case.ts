import { FeeDirection } from "../../domain/constants/fee-direction"
import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
} from "../../domain/entities/merchant-wallet.entity"
import { CalculateServiceFeeUseCase } from "./calculate-service-fee.use-case"

export type CalculateMerchantSettlementPreviewInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export type CalculateMerchantSettlementPreviewOutput = {
  walletId: string
  amount: number
  fee: number
  percentFee: number
  merchantDebit: number
  settlementCredit: number
  currency: string
  direction: FeeDirection
  settlementFeePercent: number
  availableBalance: number
  isBalanceEnough: boolean
}

export class CalculateMerchantSettlementPreviewUseCase {
  constructor(
    private readonly calculateServiceFeeUseCase = new CalculateServiceFeeUseCase()
  ) {}

  execute(
    input: CalculateMerchantSettlementPreviewInput
  ): CalculateMerchantSettlementPreviewOutput {
    const merchantWallet = this.resolveWallet(input.merchantWallet)
    const currency = input.currency ?? merchantWallet.defaultCurrency

    const feeResult = this.calculateServiceFeeUseCase.execute({
      amount: input.amount,
      currency,
      direction: FeeDirection.OUTGOING,
      percent: merchantWallet.settlementFeePercent,
      operationType: "merchant_payout",
    })

    const availableBalance = this.roundMoney(
      Math.max(0, merchantWallet.balance - merchantWallet.holdBalance)
    )

    return {
      walletId: merchantWallet.id,
      amount: feeResult.amount,
      fee: feeResult.fee,
      percentFee: feeResult.percentFee,
      merchantDebit: feeResult.senderDebit,
      settlementCredit: feeResult.recipientCredit,
      currency: feeResult.currency,
      direction: feeResult.direction,
      settlementFeePercent: merchantWallet.settlementFeePercent,
      availableBalance,
      isBalanceEnough: availableBalance >= feeResult.senderDebit,
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

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}