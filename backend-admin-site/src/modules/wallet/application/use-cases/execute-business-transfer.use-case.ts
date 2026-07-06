import {
  BusinessWalletEntity,
  type BusinessWalletEntityParams,
  type BusinessWalletEntitySnapshot,
} from "../../domain/entities/business-wallet.entity"
import { CalculateBusinessTransferPreviewUseCase } from "./calculate-business-transfer-preview.use-case"

export type ExecuteBusinessTransferInput = {
  senderWallet: BusinessWalletEntity | BusinessWalletEntityParams
  recipientWallet: BusinessWalletEntity | BusinessWalletEntityParams
  amount: number
  currency?: string
}

export type ExecuteBusinessTransferOutput = {
  transfer: {
    amount: number
    fee: number
    percentFee: number
    senderDebit: number
    recipientCredit: number
    currency: string
    direction: string
    serviceFeePercent: number
  }
  senderWallet: BusinessWalletEntitySnapshot
  recipientWallet: BusinessWalletEntitySnapshot
}

export class ExecuteBusinessTransferUseCase {
  constructor(
    private readonly previewUseCase = new CalculateBusinessTransferPreviewUseCase()
  ) {}

  execute(input: ExecuteBusinessTransferInput): ExecuteBusinessTransferOutput {
    const senderWallet = this.resolveWallet(input.senderWallet)
    const recipientWallet = this.resolveWallet(input.recipientWallet)

    const preview = this.previewUseCase.execute({
      senderWallet,
      amount: input.amount,
      currency: input.currency,
    })

    if (!preview.isBalanceEnough) {
      throw new Error("Insufficient balance for business transfer")
    }

    senderWallet.debit(preview.senderDebit)
    recipientWallet.credit(preview.recipientCredit)

    return {
      transfer: {
        amount: preview.amount,
        fee: preview.fee,
        percentFee: preview.percentFee,
        senderDebit: preview.senderDebit,
        recipientCredit: preview.recipientCredit,
        currency: preview.currency,
        direction: preview.direction,
        serviceFeePercent: preview.serviceFeePercent,
      },
      senderWallet: senderWallet.toJSON(),
      recipientWallet: recipientWallet.toJSON(),
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
}