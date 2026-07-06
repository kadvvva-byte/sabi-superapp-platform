import { Router } from "express"

import type { BusinessWalletEntityParams } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntityParams } from "../../domain/entities/merchant-wallet.entity"
import type { BusinessWalletEntitySnapshot } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntitySnapshot } from "../../domain/entities/merchant-wallet.entity"
import type { WalletOperationEntitySnapshot } from "../../domain/entities/wallet-operation.entity"

import { WalletCoreFacadeService } from "../../application/services/wallet-core-facade.service"
import { WalletCoreController } from "../../presentation/controllers/wallet-core.controller"
import { WALLET_CORE_ROUTE } from "../../presentation/contracts/wallet-core.contract"

type BuildWalletCoreRouterDeps = {
  facade: WalletCoreFacadeService
  publishRealtime?: (
    channel: string,
    event: string,
    payload: Record<string, unknown>
  ) => Promise<void> | void
  recordActivity?: (input: {
    userId?: string
    type: string
    data?: Record<string, unknown>
  }) => Promise<void> | void
  pushNotification?: (input: {
    userId?: string
    title: string
    body: string
    data?: Record<string, unknown>
  }) => Promise<void> | void
  syncLedger?: (
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    payload: Record<string, unknown>,
    idempotencyKey?: string
  ) => Promise<void> | void
  syncBusinessWalletCreate?: (
    wallet: BusinessWalletEntitySnapshot
  ) => Promise<void> | void
  syncMerchantWalletCreate?: (
    wallet: MerchantWalletEntitySnapshot
  ) => Promise<void> | void
  validateBusinessTransferExecution?: (input: {
    senderWalletId?: string
    senderDebit: number
  }) => Promise<void> | void
  validateMerchantSettlementExecution?: (input: {
    merchantWalletId?: string
    merchantDebit: number
  }) => Promise<void> | void
  findExistingOperationByKey?: (
    kind: "business_transfer" | "merchant_payment" | "merchant_settlement",
    idempotencyKey: string
  ) =>
    | Promise<WalletOperationEntitySnapshot | null>
    | WalletOperationEntitySnapshot
    | null
  resolveBusinessWallet?: (
    walletId: string,
    seed?: Partial<BusinessWalletEntityParams>
  ) => Promise<BusinessWalletEntityParams | null> | BusinessWalletEntityParams | null
  resolveMerchantWallet?: (
    walletId: string,
    seed?: Partial<MerchantWalletEntityParams>
  ) =>
    | Promise<MerchantWalletEntityParams | null>
    | MerchantWalletEntityParams
    | null
  getBusinessWalletById?: (
    walletId: string
  ) =>
    | Promise<BusinessWalletEntitySnapshot | null>
    | BusinessWalletEntitySnapshot
    | null
  getMerchantWalletById?: (
    walletId: string
  ) =>
    | Promise<MerchantWalletEntitySnapshot | null>
    | MerchantWalletEntitySnapshot
    | null
  getWalletOperationById?: (
    operationId: string
  ) =>
    | Promise<WalletOperationEntitySnapshot | null>
    | WalletOperationEntitySnapshot
    | null
  listWalletOperationsByWalletId?: (
    walletId: string
  ) =>
    | Promise<WalletOperationEntitySnapshot[]>
    | WalletOperationEntitySnapshot[]
}

export function buildWalletCoreRouter(
  deps: BuildWalletCoreRouterDeps
): Router {
  const router = Router()
  const controller = new WalletCoreController(deps.facade, {
    publishRealtime: deps.publishRealtime,
    recordActivity: deps.recordActivity,
    pushNotification: deps.pushNotification,
    syncLedger: deps.syncLedger,
    syncBusinessWalletCreate: deps.syncBusinessWalletCreate,
    syncMerchantWalletCreate: deps.syncMerchantWalletCreate,
    validateBusinessTransferExecution: deps.validateBusinessTransferExecution,
    validateMerchantSettlementExecution:
      deps.validateMerchantSettlementExecution,
    findExistingOperationByKey: deps.findExistingOperationByKey,
    resolveBusinessWallet: deps.resolveBusinessWallet,
    resolveMerchantWallet: deps.resolveMerchantWallet,
    getBusinessWalletById: deps.getBusinessWalletById,
    getMerchantWalletById: deps.getMerchantWalletById,
    getWalletOperationById: deps.getWalletOperationById,
    listWalletOperationsByWalletId: deps.listWalletOperationsByWalletId,
  })

  router.post(WALLET_CORE_ROUTE.CREATE_BUSINESS, controller.createBusinessWallet)
  router.get(
    WALLET_CORE_ROUTE.GET_BUSINESS_BY_BUSINESS_ID,
    controller.getBusinessWalletByBusinessId
  )
  router.get(
    WALLET_CORE_ROUTE.LIST_BUSINESS_BY_OWNER,
    controller.listBusinessWalletsByOwnerUserId
  )
  router.get(WALLET_CORE_ROUTE.GET_BUSINESS_BY_ID, controller.getBusinessWalletById)
  router.post(
    WALLET_CORE_ROUTE.PREVIEW_BUSINESS_TRANSFER,
    controller.previewBusinessTransfer
  )
  router.post(
    WALLET_CORE_ROUTE.EXECUTE_BUSINESS_TRANSFER,
    controller.executeBusinessTransfer
  )

  router.post(WALLET_CORE_ROUTE.CREATE_MERCHANT, controller.createMerchantWallet)
  router.get(
    WALLET_CORE_ROUTE.LIST_MERCHANT_BY_OWNER,
    controller.listMerchantWalletsByOwnerUserId
  )
  router.get(
    WALLET_CORE_ROUTE.LIST_MERCHANT_BY_BUSINESS_WALLET,
    controller.listMerchantWalletsByBusinessWalletId
  )
  router.get(WALLET_CORE_ROUTE.GET_MERCHANT_BY_ID, controller.getMerchantWalletById)
  router.post(
    WALLET_CORE_ROUTE.PREVIEW_MERCHANT_PAYMENT,
    controller.previewMerchantPayment
  )
  router.post(
    WALLET_CORE_ROUTE.EXECUTE_MERCHANT_PAYMENT,
    controller.executeMerchantPayment
  )
  router.post(
    WALLET_CORE_ROUTE.PREVIEW_MERCHANT_SETTLEMENT,
    controller.previewMerchantSettlement
  )
  router.post(
    WALLET_CORE_ROUTE.EXECUTE_MERCHANT_SETTLEMENT,
    controller.executeMerchantSettlement
  )

  router.get(
    WALLET_CORE_ROUTE.GET_OPERATION_BY_ID,
    controller.getWalletOperationById
  )
  router.get(
    WALLET_CORE_ROUTE.LIST_OPERATIONS_BY_WALLET,
    controller.listWalletOperationsByWalletId
  )

  return router
}