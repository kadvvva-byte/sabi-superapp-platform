import { PrismaClient } from "@prisma/client"

import type {
  P2PTransferRepository,
  P2PTransferSnapshot,
} from "../../application/services/p2p-wallet-transfer-flow.service"

export class PrismaP2PWalletTransferRepository implements P2PTransferRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async attachWalletExecution(input: {
    transferId: string
    transactionId: string
    status: string
    idempotencyKey: string
    reference?: string
    metadata?: Record<string, unknown>
  }): Promise<P2PTransferSnapshot> {
    const transfer = await this.prisma.p2PTransfer.update({
      where: { id: input.transferId },
      data: {
        transactionId: input.transactionId,
        status: input.status,
        idempotencyKey: input.idempotencyKey,
        reference: input.reference,
      },
    })

    return {
      id: transfer.id,
      fromUserId: transfer.fromUserId,
      toUserId: transfer.toUserId,
      fromWalletId: transfer.fromWalletId,
      toWalletId: transfer.toWalletId,
      amount: Number(transfer.amount),
      status: transfer.status,
      transactionId: transfer.transactionId,
      reference: transfer.reference,
      idempotencyKey: transfer.idempotencyKey,
      metadata: input.metadata,
    }
  }
}
