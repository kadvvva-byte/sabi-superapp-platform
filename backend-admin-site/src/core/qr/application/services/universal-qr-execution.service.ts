import type {
  UniversalQrExecutionInput,
  UniversalQrExecutionPort,
  UniversalQrExecutionResult,
  UniversalQrRouteDescriptor,
} from "../../../contracts/universal-qr-execution.port"
import type { WalletPaymentExecutionPort } from "../../../contracts/wallet-payment-execution.port"
import type { WalletTransferExecutionPort } from "../../../contracts/wallet-transfer-execution.port"

export type QrSnapshot = {
  id: string
  rail: string
  domain?: string | null
  payloadType: string
  route: string
  walletId?: string | null
  amount?: number | null
  currency?: string | null
  metadata?: Record<string, unknown>
}

export type QrPaymentRecord = {
  id: string
  qrId: string
  payerWalletId: string
  receiverWalletId?: string | null
  transactionId?: string | null
  amount: number
  currency: string
  status: string
  route?: string | null
  idempotencyKey?: string | null
}

export type QrOperationRecord = {
  id: string
  qrId?: string | null
  paymentId?: string | null
  transactionId?: string | null
  route: string
  status: string
  idempotencyKey?: string | null
  reference?: string | null
}

export interface UniversalQrRepository {
  findQrById(qrId: string): Promise<QrSnapshot | null>
  createQrPayment(input: {
    qrId: string
    payerWalletId: string
    receiverWalletId?: string
    amount: number
    currency: string
    route: string
    actorUserId?: string
    idempotencyKey: string
  }): Promise<QrPaymentRecord>
  attachQrPaymentTransaction(input: {
    paymentId: string
    transactionId: string
    status: string
  }): Promise<QrPaymentRecord>
  createQrOperation(input: {
    qrId: string
    paymentId?: string
    transactionId?: string
    route: string
    rail: string
    domain?: string
    payloadType: string
    actorUserId?: string
    payerWalletId?: string
    receiverWalletId?: string
    amount?: number
    currency?: string
    status: string
    idempotencyKey: string
    reference?: string
    metadata?: Record<string, unknown>
  }): Promise<QrOperationRecord>
}

export interface UniversalQrRouteResolver {
  resolve(
    qr: QrSnapshot,
    input: UniversalQrExecutionInput,
  ): Promise<UniversalQrRouteDescriptor>
}

export class UniversalQrExecutionService implements UniversalQrExecutionPort {
  constructor(
    private readonly qrRepository: UniversalQrRepository,
    private readonly routeResolver: UniversalQrRouteResolver,
    private readonly walletPayments: WalletPaymentExecutionPort,
    private readonly walletTransfers: WalletTransferExecutionPort,
  ) {}

  async execute(
    input: UniversalQrExecutionInput,
  ): Promise<UniversalQrExecutionResult> {
    const qr = await this.qrRepository.findQrById(input.qrId)
    if (!qr) throw new Error("qr_not_found")

    const route = await this.routeResolver.resolve(qr, input)
    const amount = input.amount ?? route.amount ?? qr.amount ?? 0
    const currency = input.currency ?? route.currency ?? qr.currency ?? "USD"

    if (amount <= 0) throw new Error("qr_amount_required")

    const receiverWalletId = input.receiverWalletId ?? qr.walletId ?? undefined

    if (
      route.kind === "wallet_payment" ||
      route.kind === "merchant_payment" ||
      route.kind === "p2p_transfer"
    ) {
      if (!input.payerWalletId) throw new Error("payer_wallet_id_required")
      if (!receiverWalletId) throw new Error("receiver_wallet_id_required")

      const qrPayment = await this.qrRepository.createQrPayment({
        qrId: qr.id,
        payerWalletId: input.payerWalletId,
        receiverWalletId,
        amount,
        currency,
        route: route.route,
        actorUserId: input.actorUserId,
        idempotencyKey: input.idempotencyKey,
      })

      const transferResult = await this.walletTransfers.executeTransfer({
        fromWalletId: input.payerWalletId,
        toWalletId: receiverWalletId,
        fromUserId: input.actorUserId,
        amount,
        currency,
        idempotencyKey: input.idempotencyKey,
        reference: `${route.kind}:${qr.id}`,
        source: route.kind === "p2p_transfer" ? "qr" : "merchant",
        metadata: {
          qrId: qr.id,
          route: route.route,
          rail: route.rail,
          domain: route.domain,
          payloadType: route.payloadType,
          ...input.metadata,
        },
      })

      const boundPayment = await this.qrRepository.attachQrPaymentTransaction({
        paymentId: qrPayment.id,
        transactionId: transferResult.transactionId,
        status: transferResult.status,
      })

      const operation = await this.qrRepository.createQrOperation({
        qrId: qr.id,
        paymentId: boundPayment.id,
        transactionId: transferResult.transactionId,
        route: route.route,
        rail: route.rail,
        domain: route.domain,
        payloadType: route.payloadType,
        actorUserId: input.actorUserId,
        payerWalletId: input.payerWalletId,
        receiverWalletId,
        amount,
        currency,
        status: transferResult.status,
        idempotencyKey: input.idempotencyKey,
        reference: transferResult.reference,
        metadata: input.metadata,
      })

      return {
        ok: true,
        qrId: qr.id,
        route,
        qrPaymentId: boundPayment.id,
        qrOperationId: operation.id,
        transactionId: transferResult.transactionId,
        transferResult,
        status: "SUCCESS",
        executedAt: transferResult.executedAt,
      }
    }

    if (route.kind === "wallet_topup") {
      if (!input.payerWalletId) throw new Error("payer_wallet_id_required")

      const paymentResult = await this.walletPayments.executePayment({
        paymentId: `qr-topup:${qr.id}`,
        providerPaymentId: `qr-topup:${qr.id}`,
        userId: input.actorUserId ?? "system",
        walletId: input.payerWalletId,
        amount,
        currency,
        direction: "capture",
        idempotencyKey: input.idempotencyKey,
        reference: `${route.kind}:${qr.id}`,
        metadata: {
          qrId: qr.id,
          route: route.route,
          rail: route.rail,
          domain: route.domain,
          payloadType: route.payloadType,
          ...input.metadata,
        },
      })

      const operation = await this.qrRepository.createQrOperation({
        qrId: qr.id,
        transactionId: paymentResult.transactionId,
        route: route.route,
        rail: route.rail,
        domain: route.domain,
        payloadType: route.payloadType,
        actorUserId: input.actorUserId,
        payerWalletId: input.payerWalletId,
        amount,
        currency,
        status: paymentResult.status,
        idempotencyKey: input.idempotencyKey,
        reference: paymentResult.reference,
        metadata: input.metadata,
      })

      return {
        ok: true,
        qrId: qr.id,
        route,
        qrOperationId: operation.id,
        transactionId: paymentResult.transactionId,
        paymentResult,
        status: "SUCCESS",
        executedAt: paymentResult.executedAt,
      }
    }

    throw new Error(`qr_route_not_supported:${route.kind}`)
  }
}
