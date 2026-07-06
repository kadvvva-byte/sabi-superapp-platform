import { FeeDirection } from "../../domain/constants/fee-direction"
import {
  BusinessWalletEntity,
  type BusinessWalletEntityParams,
} from "../../domain/entities/business-wallet.entity"
import { CalculateServiceFeeUseCase } from "./calculate-service-fee.use-case"

export type CalculateBusinessTransferPreviewInput = {
  senderWallet: BusinessWalletEntity | BusinessWalletEntityParams
  amount: number
  currency?: string
}

export type CalculateBusinessTransferPreviewOutput = {
  walletId: string
  amount: number
  fee: number
  percentFee: number
  senderDebit: number
  recipientCredit: number
  currency: string
  direction: FeeDirection
  serviceFeePercent: number
  availableBalance: number
  isBalanceEnough: boolean
}

export class CalculateBusinessTransferPreviewUseCase {
  constructor(
    private readonly calculateServiceFeeUseCase = new CalculateServiceFeeUseCase()
  ) {}

  execute(
    input: CalculateBusinessTransferPreviewInput
  ): CalculateBusinessTransferPreviewOutput {
    const senderWallet = this.resolveWallet(input.senderWallet)
    const currency = input.currency ?? senderWallet.defaultCurrency

    const feeResult = this.calculateServiceFeeUseCase.execute({
      amount: input.amount,
      currency,
      direction: FeeDirection.OUTGOING,
      percent: senderWallet.serviceFeePercent,
      operationType: "business_transfer",
    })

    const availableBalance = this.roundMoney(
      Math.max(0, senderWallet.balance - senderWallet.holdBalance)
    )

    return {
      walletId: senderWallet.id,
      amount: feeResult.amount,
      fee: feeResult.fee,
      percentFee: feeResult.percentFee,
      senderDebit: feeResult.senderDebit,
      recipientCredit: feeResult.recipientCredit,
      currency: feeResult.currency,
      direction: feeResult.direction,
      serviceFeePercent: senderWallet.serviceFeePercent,
      availableBalance,
      isBalanceEnough: availableBalance >= feeResult.senderDebit,
    }
  }

  private resolveWallet(
    wallet: BusinessWalletEntity | BusinessWalletEntityParams
  ): BusinessWalletEntity {
    if (wallet instanceof BusinessWalletEntity) {
      return wallet
    }

    return BusinessWalletEntity.create(wallet)
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}