import {
  MerchantWalletEntity,
  type MerchantWalletEntityParams,
} from "../../domain/entities/merchant-wallet.entity"
import { WalletOperationEntity } from "../../domain/entities/wallet-operation.entity"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"
import { WALLET_OPERATION_KIND } from "../../domain/constants/wallet-operation-kind"
import { ExecuteMerchantSettlementUseCase } from "./execute-merchant-settlement.use-case"
import { mergeWalletProviderPersistenceMetadata } from "../security/wallet-provider-persistence.policy"
import { walletProviderExecutionGuard } from "../provider/wallet-provider-execution.guard"

export type ExecuteMerchantSettlementAndSaveInput = {
  merchantWallet: MerchantWalletEntity | MerchantWalletEntityParams
  amount: number
  currency?: string
}

export class ExecuteMerchantSettlementAndSaveUseCase {
  constructor(
    private readonly merchantWalletRepository: MerchantWalletRepository,
    private readonly walletOperationRepository: WalletOperationRepository,
    private readonly executeMerchantSettlementUseCase =
      new ExecuteMerchantSettlementUseCase()
  ) {}

  async execute(input: ExecuteMerchantSettlementAndSaveInput) {
    const readiness = walletProviderExecutionGuard.assertProviderReady({
      route: "merchant_settlement",
      providerId: "merchant_acquiring",
    })

    const merchantWallet = this.resolveWallet(input.merchantWallet)

    const result = this.executeMerchantSettlementUseCase.execute({
      merchantWallet,
      amount: input.amount,
      currency: input.currency,
    })

    await this.merchantWalletRepository.save(merchantWallet)

    const operation = WalletOperationEntity.create({
      kind: WALLET_OPERATION_KIND.MERCHANT_SETTLEMENT,
      status: "completed",
      currency: result.settlement.currency,
      amount: result.settlement.amount,
      fee: result.settlement.fee,
      percentFee: result.settlement.percentFee,
      debitAmount: result.settlement.merchantDebit,
      creditAmount: result.settlement.settlementCredit,
      sourceWalletId: merchantWallet.id,
      merchantWalletId: merchantWallet.id,
      businessWalletId: merchantWallet.businessWalletId,
      title: "Merchant settlement",
      description: "Merchant payout to settlement route",
      metadata: mergeWalletProviderPersistenceMetadata({
        direction: result.settlement.direction,
        settlementFeePercent: result.settlement.settlementFeePercent,
        settlementReference: merchantWallet.settlementReference,
      }, {
        walletRoute: "merchant_wallet_settlement",
        providerFamily: readiness.providerFamily,
        providerId: readiness.requiredProviderId,
        providerStatus: readiness.providerStatus,
        providerReference: merchantWallet.settlementReference ?? null,
        riskStatus: "not_checked",
        complianceStatus: "admin_review_required",
        walletId: merchantWallet.id,
        sourceModule: "wallet-core",
        operationKind: WALLET_OPERATION_KIND.MERCHANT_SETTLEMENT,
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