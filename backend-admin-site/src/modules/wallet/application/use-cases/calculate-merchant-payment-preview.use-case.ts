import { FeeDirection } from "../../domain/constants/fee-direction"
import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
} from "../../domain/entities/merchant-wallet.entity"
import { CalculateServiceFeeUseCase } from "./calculate-service-fee.use-case"

export type CalculateMerchantPaymentPreviewInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export type CalculateMerchantPaymentPreviewOutput = {
  walletId: string
  amount: number
  fee: number
  percentFee: number
  payerDebit: number
  merchantGross: number
  merchantNet: number
  currency: string
  direction: FeeDirection
  serviceFeePercent: number
}

export class CalculateMerchantPaymentPreviewUseCase {
  constructor(
    private readonly calculateServiceFeeUseCase = new CalculateServiceFeeUseCase()
  ) {}

  execute(
    input: CalculateMerchantPaymentPreviewInput
  ): CalculateMerchantPaymentPreviewOutput {
    const merchantWallet = this.resolveWallet(input.merchantWallet)
    const currency = input.currency ?? merchantWallet.defaultCurrency

    const feeResult = this.calculateServiceFeeUseCase.execute({
      amount: input.amount,
      currency,
      direction: FeeDirection.INCOMING,
      percent: merchantWallet.serviceFeePercent,
      operationType: "merchant_payment",
    })

    return {
      walletId: merchantWallet.id,
      amount: feeResult.amount,
      fee: feeResult.fee,
      percentFee: feeResult.percentFee,
      payerDebit: feeResult.senderDebit,
      merchantGross: feeResult.amount,
      merchantNet: feeResult.recipientCredit,
      currency: feeResult.currency,
      direction: feeResult.direction,
      serviceFeePercent: merchantWallet.serviceFeePercent,
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