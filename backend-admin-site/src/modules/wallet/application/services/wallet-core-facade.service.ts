import { WalletRuntimeService } from "./wallet-runtime.service"

import type { CreateBusinessWalletInput } from "../use-cases/create-business-wallet.use-case"
import type { CreateMerchantWalletInput } from "../use-cases/create-merchant-wallet.use-case"

import type { CalculateBusinessTransferPreviewInput } from "../use-cases/calculate-business-transfer-preview.use-case"
import type { CalculateMerchantPaymentPreviewInput } from "../use-cases/calculate-merchant-payment-preview.use-case"
import type { CalculateMerchantSettlementPreviewInput } from "../use-cases/calculate-merchant-settlement-preview.use-case"

import type { ExecuteBusinessTransferAndSaveInput } from "../use-cases/execute-business-transfer-and-save.use-case"
import type { ExecuteMerchantPaymentAndSaveInput } from "../use-cases/execute-merchant-payment-and-save.use-case"
import type { ExecuteMerchantSettlementAndSaveInput } from "../use-cases/execute-merchant-settlement-and-save.use-case"

export class WalletCoreFacadeService {
  constructor(private readonly runtime: WalletRuntimeService) {}

  async createBusinessWallet(input: CreateBusinessWalletInput) {
    return this.runtime.createBusinessWallet.execute(input)
  }

  async createMerchantWallet(input: CreateMerchantWalletInput) {
    return this.runtime.createMerchantWallet.execute(input)
  }

  async getBusinessWalletById(id: string) {
    return this.runtime.query.getBusinessWalletById(id)
  }

  async getBusinessWalletByBusinessId(businessId: string) {
    return this.runtime.query.getBusinessWalletByBusinessId(businessId)
  }

  async listBusinessWalletsByOwnerUserId(ownerUserId: string) {
    return this.runtime.query.listBusinessWalletsByOwnerUserId(ownerUserId)
  }

  async getMerchantWalletById(id: string) {
    return this.runtime.query.getMerchantWalletById(id)
  }

  async listMerchantWalletsByOwnerUserId(ownerUserId: string) {
    return this.runtime.query.listMerchantWalletsByOwnerUserId(ownerUserId)
  }

  async listMerchantWalletsByBusinessWalletId(businessWalletId: string) {
    return this.runtime.query.listMerchantWalletsByBusinessWalletId(
      businessWalletId
    )
  }

  async getWalletOperationById(id: string) {
    return this.runtime.query.getWalletOperationById(id)
  }

  async listWalletOperationsByWalletId(walletId: string) {
    return this.runtime.query.listWalletOperationsByWalletId(walletId)
  }

  previewBusinessTransfer(input: CalculateBusinessTransferPreviewInput) {
    return this.runtime.calculateBusinessTransferPreview.execute(input)
  }

  previewMerchantPayment(input: CalculateMerchantPaymentPreviewInput) {
    return this.runtime.calculateMerchantPaymentPreview.execute(input)
  }

  previewMerchantSettlement(input: CalculateMerchantSettlementPreviewInput) {
    return this.runtime.calculateMerchantSettlementPreview.execute(input)
  }

  async executeBusinessTransfer(input: ExecuteBusinessTransferAndSaveInput) {
    return this.runtime.executeBusinessTransfer.execute(input)
  }

  async executeMerchantPayment(input: ExecuteMerchantPaymentAndSaveInput) {
    return this.runtime.executeMerchantPayment.execute(input)
  }

  async executeMerchantSettlement(
    input: ExecuteMerchantSettlementAndSaveInput
  ) {
    return this.runtime.executeMerchantSettlement.execute(input)
  }
}