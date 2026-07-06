import type {
  WalletPaymentExecutionInput,
  WalletPaymentExecutionPort,
  WalletPaymentExecutionResult,
} from "../../../../core/contracts/wallet-payment-execution.port"

export type ProviderPaymentSnapshot = {
  id: string
  providerPaymentId: string
  userId: string
  walletId?: string | null
  currency: string
  capturedAmount: number
  refundedAmount?: number
  reference?: string | null
  status: string
  metadata?: Record<string, unknown>
}

export type PaymentToWalletFlowInput = {
  paymentId: string
  providerPaymentId: string
  walletId: string
  amount: number
  currency: string
  userId: string
  idempotencyKey: string
  direction?: "capture" | "refund"
  reference?: string
  metadata?: Record<string, unknown>
}

export type PaymentToWalletFlowResult = {
  payment: ProviderPaymentSnapshot
  walletExecution: WalletPaymentExecutionResult
}

export interface PaymentRecordRepository {
  findByProviderPaymentId(
    providerPaymentId: string,
  ): Promise<ProviderPaymentSnapshot | null>
  attachWalletExecution(input: {
    paymentId: string
    walletId: string
    transactionId: string
    reference?: string
    status: string
    amount: number
    metadata?: Record<string, unknown>
  }): Promise<ProviderPaymentSnapshot>
}

export interface PaymentFlowEventPublisher {
  publish(event: string, payload: Record<string, unknown>): Promise<void> | void
}

export class PaymentToWalletFlowService {
  constructor(
    private readonly payments: PaymentRecordRepository,
    private readonly walletExecution: WalletPaymentExecutionPort,
    private readonly events?: PaymentFlowEventPublisher,
  ) {}

  async execute(
    input: PaymentToWalletFlowInput,
  ): Promise<PaymentToWalletFlowResult> {
    const direction = input.direction ?? "capture"

    const walletInput: WalletPaymentExecutionInput = {
      paymentId: input.paymentId,
      providerPaymentId: input.providerPaymentId,
      userId: input.userId,
      walletId: input.walletId,
      amount: input.amount,
      currency: input.currency,
      direction,
      idempotencyKey: input.idempotencyKey,
      reference: input.reference,
      metadata: input.metadata,
    }

    const walletExecution = await this.walletExecution.executePayment(walletInput)

    const payment = await this.payments.attachWalletExecution({
      paymentId: input.paymentId,
      walletId: input.walletId,
      transactionId: walletExecution.transactionId,
      reference: walletExecution.reference,
      status: walletExecution.status,
      amount: input.amount,
      metadata: {
        ...input.metadata,
        direction,
        ledgerEntries: walletExecution.ledgerEntries,
      },
    })

    await this.events?.publish("payment.wallet.executed", {
      paymentId: payment.id,
      providerPaymentId: payment.providerPaymentId,
      walletId: input.walletId,
      transactionId: walletExecution.transactionId,
      amount: input.amount,
      currency: input.currency,
      direction,
      idempotencyKey: input.idempotencyKey,
    })

    return {
      payment,
      walletExecution,
    }
  }
}
