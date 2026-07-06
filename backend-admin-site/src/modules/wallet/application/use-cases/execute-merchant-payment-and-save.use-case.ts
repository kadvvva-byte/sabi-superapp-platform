import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
} from "../../domain/entities/merchant-wallet.entity"
import { WalletOperationEntity } from "../../domain/entities/wallet-operation.entity"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"
import { WALLET_OPERATION_KIND } from "../../domain/constants/wallet-operation-kind"
import { ExecuteMerchantPaymentUseCase } from "./execute-merchant-payment.use-case"
import { mergeWalletProviderPersistenceMetadata } from "../security/wallet-provider-persistence.policy"
import { walletProviderExecutionGuard } from "../provider/wallet-provider-execution.guard"

export type ExecuteMerchantPaymentAndSaveInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export class ExecuteMerchantPaymentAndSaveUseCase {
  constructor(
    private readonly merchantWalletRepository: MerchantWalletRepository,
    private readonly walletOperationRepository: WalletOperationRepository,
    private readonly executeMerchantPaymentUseCase =
      new ExecuteMerchantPaymentUseCase()
  ) {}

  async execute(input: ExecuteMerchantPaymentAndSaveInput) {
    const readiness = walletProviderExecutionGuard.assertProviderReady({
      route: "merchant_payment",
      providerId: "merchant_acquiring",
    })

    const merchantWallet = this.resolveWallet(input.merchantWallet)

    const result = this.executeMerchantPaymentUseCase.execute({
      merchantWallet,
      amount: input.amount,
      currency: input.currency,
    })

    await this.merchantWalletRepository.save(merchantWallet)

    const operation = WalletOperationEntity.create({
      kind: WALLET_OPERATION_KIND.MERCHANT_PAYMENT,
      status: "completed",
      currency: result.payment.currency,
      amount: result.payment.amount,
      fee: result.payment.fee,
      percentFee: result.payment.percentFee,
      debitAmount: result.payment.payerDebit,
      creditAmount: result.payment.merchantNet,
      destinationWalletId: merchantWallet.id,
      merchantWalletId: merchantWallet.id,
      businessWalletId: merchantWallet.businessWalletId,
      title: "Merchant payment",
      description: "Incoming merchant payment",
      metadata: mergeWalletProviderPersistenceMetadata({
        direction: result.payment.direction,
        merchantGross: result.payment.merchantGross,
        serviceFeePercent: result.payment.serviceFeePercent,
      }, {
        walletRoute: "merchant_wallet_payment",
        providerFamily: readiness.providerFamily,
        providerId: readiness.requiredProviderId,
        providerStatus: readiness.providerStatus,
        riskStatus: "not_checked",
        complianceStatus: "admin_review_required",
        walletId: merchantWallet.id,
        sourceModule: "wallet-core",
        operationKind: WALLET_OPERATION_KIND.MERCHANT_PAYMENT,
      }),
      completedAt: new Date(),
    })

    await this.walletOperationRepository.save(operation)

    return {
      operation: operation.toJSON(),
      ...result,
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