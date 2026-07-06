import type {
  WalletPaymentExecutionResult,
} from "./wallet-payment-execution.port"
import type {
  WalletTransferExecutionResult,
} from "./wallet-transfer-execution.port"

export type UniversalQrRouteKind =
  | "wallet_payment"
  | "merchant_payment"
  | "p2p_transfer"
  | "wallet_topup"
  | "miniapp_payment"
  | "invoice_payment"
  | "profile_payment"
  | "unsupported"

export type UniversalQrRouteDescriptor = {
  qrId: string
  rail: string
  domain?: string
  payloadType: string
  route: string
  kind: UniversalQrRouteKind
  amount?: number
  currency?: string
  metadata?: Record<string, unknown>
}

export type UniversalQrExecutionInput = {
  qrId: string
  actorUserId?: string
  payerWalletId?: string
  receiverWalletId?: string
  amount?: number
  currency?: string
  idempotencyKey: string
  routeOverride?: string
  metadata?: Record<string, unknown>
}

export type UniversalQrExecutionResult = {
  ok: true
  qrId: string
  route: UniversalQrRouteDescriptor
  qrPaymentId?: string
  qrOperationId?: string
  transactionId?: string
  paymentResult?: WalletPaymentExecutionResult
  transferResult?: WalletTransferExecutionResult
  status: "SUCCESS" | "ROUTED"
  executedAt: string
}

export interface UniversalQrExecutionPort {
  execute(
    input: UniversalQrExecutionInput,
  ): Promise<UniversalQrExecutionResult>
}
