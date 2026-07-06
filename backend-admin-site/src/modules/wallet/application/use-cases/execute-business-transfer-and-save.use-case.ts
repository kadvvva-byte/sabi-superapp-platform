import {
  BusinessWalletEntity,
  type BusinessWalletEntityParams,
} from "../../domain/entities/business-wallet.entity"
import { WalletOperationEntity } from "../../domain/entities/wallet-operation.entity"
import { BusinessWalletRepository } from "../../domain/repositories/business-wallet.repository"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"
import { WALLET_OPERATION_KIND } from "../../domain/constants/wallet-operation-kind"
import { ExecuteBusinessTransferUseCase } from "./execute-business-transfer.use-case"
import { mergeWalletProviderPersistenceMetadata } from "../security/wallet-provider-persistence.policy"
import { walletProviderExecutionGuard } from "../provider/wallet-provider-execution.guard"

export type ExecuteBusinessTransferAndSaveInput = {
  senderWallet: BusinessWalletEntity | BusinessWalletEntityParams
  recipientWallet: BusinessWalletEntity | BusinessWalletEntityParams
  amount: number
  currency?: string
}

export class ExecuteBusinessTransferAndSaveUseCase {
  constructor(
    private readonly businessWalletRepository: BusinessWalletRepository,
    private readonly walletOperationRepository: WalletOperationRepository,
    private readonly executeBusinessTransferUseCase =
      new ExecuteBusinessTransferUseCase()
  ) {}

  async execute(input: ExecuteBusinessTransferAndSaveInput) {
    const readiness = walletProviderExecutionGuard.assertProviderReady({
      route: "business_transfer",
      providerId: "business_payout",
    })

    const senderWallet = this.resolveWallet(input.senderWallet)
    const recipientWallet = this.resolveWallet(input.recipientWallet)

    const result = this.executeBusinessTransferUseCase.execute({
      senderWallet,
      recipientWallet,
      amount: input.amount,
      currency: input.currency,
    })

    await this.businessWalletRepository.save(senderWallet)
    await this.businessWalletRepository.save(recipientWallet)

    const operation = WalletOperationEntity.create({
      kind: WALLET_OPERATION_KIND.BUSINESS_TRANSFER,
      status: "completed",
      currency: result.transfer.currency,
      amount: result.transfer.amount,
      fee: result.transfer.fee,
      percentFee: result.transfer.percentFee,
      debitAmount: result.transfer.senderDebit,
      creditAmount: result.transfer.recipientCredit,
      sourceWalletId: senderWallet.id,
      destinationWalletId: recipientWallet.id,
      businessWalletId: senderWallet.id,
      title: "Business transfer",
      description: "Business wallet to business wallet transfer",
      metadata: mergeWalletProviderPersistenceMetadata({
        direction: result.transfer.direction,
        serviceFeePercent: result.transfer.serviceFeePercent,
      }, {
        walletRoute: "business_wallet_transfer",
        providerFamily: readiness.providerFamily,
        providerId: readiness.requiredProviderId,
        providerStatus: readiness.providerStatus,
        riskStatus: "not_checked",
        complianceStatus: "admin_review_required",
        ledgerReference: undefined,
        walletId: senderWallet.id,
        sourceModule: "wallet-core",
        operationKind: WALLET_OPERATION_KIND.BUSINESS_TRANSFER,
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
    wallet: BusinessWalletEntity | BusinessWalletEntityParams
  ): BusinessWalletEntity {
    if (wallet instanceof BusinessWalletEntity) {
      return wallet
    }

    return BusinessWalletEntity.create(wallet)
  }
}