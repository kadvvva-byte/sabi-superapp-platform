import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
  type MerchantWalletEntitySnapshot,
} from "../../domain/entities/merchant-wallet.entity"
import { CalculateMerchantPaymentPreviewUseCase } from "./calculate-merchant-payment-preview.use-case"

export type ExecuteMerchantPaymentInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export type ExecuteMerchantPaymentOutput = {
  payment: {
    amount: number
    fee: number
    percentFee: number
    payerDebit: number
    merchantGross: number
    merchantNet: number
    currency: string
    direction: string
    serviceFeePercent: number
  }
  merchantWallet: MerchantWalletEntitySnapshot
}

export class ExecuteMerchantPaymentUseCase {
  constructor(
    private readonly previewUseCase = new CalculateMerchantPaymentPreviewUseCase()
  ) {}

  execute(input: ExecuteMerchantPaymentInput): ExecuteMerchantPaymentOutput {
    const merchantWallet = this.resolveWallet(input.merchantWallet)

    const preview = this.previewUseCase.execute({
      merchantWallet,
      amount: input.amount,
      currency: input.currency,
    })

    merchantWallet.credit(preview.merchantNet)

    return {
      payment: {
        amount: preview.amount,
        fee: preview.fee,
        percentFee: preview.percentFee,
        payerDebit: preview.payerDebit,
        merchantGross: preview.merchantGross,
        merchantNet: preview.merchantNet,
        currency: preview.currency,
        direction: preview.direction,
        serviceFeePercent: preview.serviceFeePercent,
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