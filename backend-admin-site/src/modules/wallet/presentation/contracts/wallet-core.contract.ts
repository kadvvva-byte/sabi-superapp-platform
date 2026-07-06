import type { BusinessWalletEntityParams } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntityParams } from "../../domain/entities/merchant-wallet.entity"

export const WALLET_CORE_ROUTE = {
  CREATE_BUSINESS: "/business",
  GET_BUSINESS_BY_ID: "/business/:id",
  GET_BUSINESS_BY_BUSINESS_ID: "/business/by-business/:businessId",
  LIST_BUSINESS_BY_OWNER: "/business/owner/:ownerUserId",
  PREVIEW_BUSINESS_TRANSFER: "/business/transfer/preview",
  EXECUTE_BUSINESS_TRANSFER: "/business/transfer/execute",

  CREATE_MERCHANT: "/merchant",
  GET_MERCHANT_BY_ID: "/merchant/:id",
  LIST_MERCHANT_BY_OWNER: "/merchant/owner/:ownerUserId",
  LIST_MERCHANT_BY_BUSINESS_WALLET: "/merchant/business/:businessWalletId",
  PREVIEW_MERCHANT_PAYMENT: "/merchant/payment/preview",
  EXECUTE_MERCHANT_PAYMENT: "/merchant/payment/execute",
  PREVIEW_MERCHANT_SETTLEMENT: "/merchant/settlement/preview",
  EXECUTE_MERCHANT_SETTLEMENT: "/merchant/settlement/execute",

  GET_OPERATION_BY_ID: "/operation/:id",
  LIST_OPERATIONS_BY_WALLET: "/operations/wallet/:walletId",
} as const

export type WalletCoreExecuteMeta = {
  idempotencyKey?: string
  clientOperationId?: string
}

export type WalletCoreBusinessTransferRequest = WalletCoreExecuteMeta & {
  amount: number
  currency?: string

  senderWalletId?: string
  senderWallet?: BusinessWalletEntityParams
  senderWalletMeta?: Partial<BusinessWalletEntityParams>

  recipientWalletId?: string
  recipientWallet?: BusinessWalletEntityParams
  recipientWalletMeta?: Partial<BusinessWalletEntityParams>
}

export type WalletCoreMerchantPaymentRequest = WalletCoreExecuteMeta & {
  amount: number
  currency?: string

  merchantWalletId?: string
  merchantWallet?: MerchantWalletEntityParams
  merchantWalletMeta?: Partial<MerchantWalletEntityParams>
}

export type WalletCoreMerchantSettlementRequest = WalletCoreExecuteMeta & {
  amount: number
  currency?: string

  merchantWalletId?: string
  merchantWallet?: MerchantWalletEntityParams
  merchantWalletMeta?: Partial<MerchantWalletEntityParams>
}

export type WalletCoreCreateBusinessWalletRequest = BusinessWalletEntityParams
export type WalletCoreCreateMerchantWalletRequest = MerchantWalletEntityParams

export type WalletCoreApiSuccess<T> = {
  ok: true
  reused?: boolean
  data: T
}

export type WalletCoreApiFailure = {
  ok: false
  reason: string
}