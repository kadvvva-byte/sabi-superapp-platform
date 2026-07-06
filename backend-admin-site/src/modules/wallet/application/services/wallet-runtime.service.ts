import { BusinessWalletRepository } from "../../domain/repositories/business-wallet.repository"
import { MerchantWalletRepository } from "../../domain/repositories/merchant-wallet.repository"
import { WalletOperationRepository } from "../../domain/repositories/wallet-operation.repository"

import { CreateBusinessWalletUseCase } from "../use-cases/create-business-wallet.use-case"
import { CreateMerchantWalletUseCase } from "../use-cases/create-merchant-wallet.use-case"

import { CalculateBusinessTransferPreviewUseCase } from "../use-cases/calculate-business-transfer-preview.use-case"
import { CalculateMerchantPaymentPreviewUseCase } from "../use-cases/calculate-merchant-payment-preview.use-case"
import { CalculateMerchantSettlementPreviewUseCase } from "../use-cases/calculate-merchant-settlement-preview.use-case"

import { ExecuteBusinessTransferAndSaveUseCase } from "../use-cases/execute-business-transfer-and-save.use-case"
import { ExecuteMerchantPaymentAndSaveUseCase } from "../use-cases/execute-merchant-payment-and-save.use-case"
import { ExecuteMerchantSettlementAndSaveUseCase } from "../use-cases/execute-merchant-settlement-and-save.use-case"

import { WalletQueryService } from "./wallet-query.service"

export class WalletRuntimeService {
  readonly createBusinessWallet: CreateBusinessWalletUseCase
  readonly createMerchantWallet: CreateMerchantWalletUseCase

  readonly calculateBusinessTransferPreview: CalculateBusinessTransferPreviewUseCase
  readonly calculateMerchantPaymentPreview: CalculateMerchantPaymentPreviewUseCase
  readonly calculateMerchantSettlementPreview: CalculateMerchantSettlementPreviewUseCase

  readonly executeBusinessTransfer: ExecuteBusinessTransferAndSaveUseCase
  readonly executeMerchantPayment: ExecuteMerchantPaymentAndSaveUseCase
  readonly executeMerchantSettlement: ExecuteMerchantSettlementAndSaveUseCase

  readonly query: WalletQueryService

  constructor(args: {
    businessWalletRepository: BusinessWalletRepository
    merchantWalletRepository: MerchantWalletRepository
    walletOperationRepository: WalletOperationRepository
  }) {
    this.createBusinessWallet = new CreateBusinessWalletUseCase(
      args.businessWalletRepository
    )

    this.createMerchantWallet = new CreateMerchantWalletUseCase(
      args.merchantWalletRepository
    )

    this.calculateBusinessTransferPreview =
      new CalculateBusinessTransferPreviewUseCase()

    this.calculateMerchantPaymentPreview =
      new CalculateMerchantPaymentPreviewUseCase()

    this.calculateMerchantSettlementPreview =
      new CalculateMerchantSettlementPreviewUseCase()

    this.executeBusinessTransfer = new ExecuteBusinessTransferAndSaveUseCase(
      args.businessWalletRepository,
      args.walletOperationRepository
    )

    this.executeMerchantPayment = new ExecuteMerchantPaymentAndSaveUseCase(
      args.merchantWalletRepository,
      args.walletOperationRepository
    )

    this.executeMerchantSettlement =
      new ExecuteMerchantSettlementAndSaveUseCase(
        args.merchantWalletRepository,
        args.walletOperationRepository
      )

    this.query = new WalletQueryService(
      args.businessWalletRepository,
      args.merchantWalletRepository,
      args.walletOperationRepository
    )
  }
}