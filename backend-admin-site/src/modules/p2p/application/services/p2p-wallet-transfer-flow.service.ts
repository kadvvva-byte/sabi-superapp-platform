import type {
  WalletTransferExecutionInput,
  WalletTransferExecutionPort,
  WalletTransferExecutionResult,
} from "../../../../core/contracts/wallet-transfer-execution.port"

export type P2PTransferSnapshot = {
  id: string
  fromUserId: string
  toUserId: string
  fromWalletId: string
  toWalletId: string
  amount: number
  status: string
  transactionId?: string | null
  reference?: string | null
  idempotencyKey?: string | null
  metadata?: Record<string, unknown>
}

export type P2PWalletTransferFlowInput = {
  transferId: string
  fromUserId: string
  toUserId: string
  fromWalletId: string
  toWalletId: string
  amount: number
  currency: string
  idempotencyKey: string
  reference?: string
  metadata?: Record<string, unknown>
}

export type P2PWalletTransferFlowResult = {
  transfer: P2PTransferSnapshot
  walletExecution: WalletTransferExecutionResult
}

export interface P2PTransferRepository {
  attachWalletExecution(input: {
    transferId: string
    transactionId: string
    status: string
    idempotencyKey: string
    reference?: string
    metadata?: Record<string, unknown>
  }): Promise<P2PTransferSnapshot>
}

export interface P2PEventPublisher {
  publish(event: string, payload: Record<string, unknown>): Promise<void> | void
}

export class P2PWalletTransferFlowService {
  constructor(
    private readonly transfers: P2PTransferRepository,
    private readonly walletExecution: WalletTransferExecutionPort,
    private readonly events?: P2PEventPublisher,
  ) {}

  async execute(
    input: P2PWalletTransferFlowInput,
  ): Promise<P2PWalletTransferFlowResult> {
    const walletInput: WalletTransferExecutionInput = {
      fromWalletId: input.fromWalletId,
      toWalletId: input.toWalletId,
      fromUserId: input.fromUserId,
      toUserId: input.toUserId,
      amount: input.amount,
      currency: input.currency,
      idempotencyKey: input.idempotencyKey,
      reference: input.reference,
      source: "p2p",
      metadata: {
        ...input.metadata,
        transferId: input.transferId,
      },
    }

    const walletExecution = await this.walletExecution.executeTransfer(walletInput)

    const transfer = await this.transfers.attachWalletExecution({
      transferId: input.transferId,
      transactionId: walletExecution.transactionId,
      status: walletExecution.status,
      idempotencyKey: input.idempotencyKey,
      reference: walletExecution.reference,
      metadata: {
        ...input.metadata,
        ledgerEntries: walletExecution.ledgerEntries,
      },
    })

    await this.events?.publish("p2p.wallet.executed", {
      transferId: transfer.id,
      transactionId: walletExecution.transactionId,
      fromWalletId: input.fromWalletId,
      toWalletId: input.toWalletId,
      amount: input.amount,
      currency: input.currency,
      idempotencyKey: input.idempotencyKey,
    })

    return {
      transfer,
      walletExecution,
    }
  }
}
