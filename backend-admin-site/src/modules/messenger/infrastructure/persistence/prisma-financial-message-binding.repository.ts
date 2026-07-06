import { MessageType, PrismaClient } from "@prisma/client"

import type {
  BindFinancialMessageInput,
  CreateFinancialMessageInput,
  FinancialMessageBindingRepository,
  FinancialMessageRecord,
} from "../../application/services/financial-message-binding.service"

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function mapMessage(message: {
  id: string
  chatId: string
  userId: string
  type: MessageType
  content: string | null
  createdAt: Date
  transactionId: string | null
  paymentId: string | null
  p2pTransferId: string | null
  qrOperationId: string | null
  walletOperationId: string | null
}): FinancialMessageRecord {
  return {
    id: message.id,
    chatId: message.chatId,
    userId: message.userId,
    type: message.type,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
    transactionId: message.transactionId,
    paymentId: message.paymentId,
    p2pTransferId: message.p2pTransferId,
    qrOperationId: message.qrOperationId,
    walletOperationId: message.walletOperationId,
  }
}

export class PrismaFinancialMessageBindingRepository
  implements FinancialMessageBindingRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async createMessage(input: CreateFinancialMessageInput): Promise<FinancialMessageRecord> {
    const message = await this.prisma.message.create({
      data: {
        chatId: input.chatId,
        userId: input.userId,
        type: (input.messageType ?? "SYSTEM") as MessageType,
        content: input.content,
        transactionId: input.transactionId,
        paymentId: input.paymentId,
        p2pTransferId: input.p2pTransferId,
        qrOperationId: input.qrOperationId,
        walletOperationId: input.walletOperationId,
      },
      select: {
        id: true,
        chatId: true,
        userId: true,
        type: true,
        content: true,
        createdAt: true,
        transactionId: true,
        paymentId: true,
        p2pTransferId: true,
        qrOperationId: true,
        walletOperationId: true,
      },
    })

    const result = mapMessage(message)
    result.metadata = asRecord(input.metadata)
    return result
  }

  async bindMessage(input: BindFinancialMessageInput): Promise<FinancialMessageRecord> {
    const message = await this.prisma.message.update({
      where: { id: input.messageId },
      data: {
        content: input.content,
        transactionId: input.transactionId,
        paymentId: input.paymentId,
        p2pTransferId: input.p2pTransferId,
        qrOperationId: input.qrOperationId,
        walletOperationId: input.walletOperationId,
      },
      select: {
        id: true,
        chatId: true,
        userId: true,
        type: true,
        content: true,
        createdAt: true,
        transactionId: true,
        paymentId: true,
        p2pTransferId: true,
        qrOperationId: true,
        walletOperationId: true,
      },
    })

    const result = mapMessage(message)
    result.metadata = asRecord(input.metadata)
    return result
  }

  async listChatFinancialMessages(input: {
    chatId: string
    limit?: number
  }): Promise<FinancialMessageRecord[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: input.chatId,
        OR: [
          { transactionId: { not: null } },
          { paymentId: { not: null } },
          { p2pTransferId: { not: null } },
          { qrOperationId: { not: null } },
          { walletOperationId: { not: null } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: input.limit ?? 50,
      select: {
        id: true,
        chatId: true,
        userId: true,
        type: true,
        content: true,
        createdAt: true,
        transactionId: true,
        paymentId: true,
        p2pTransferId: true,
        qrOperationId: true,
        walletOperationId: true,
      },
    })

    return messages.map(mapMessage)
  }
}
