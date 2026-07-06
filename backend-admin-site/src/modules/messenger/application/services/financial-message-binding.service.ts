export type FinancialEntityRefs = {
  transactionId?: string
  paymentId?: string
  p2pTransferId?: string
  qrOperationId?: string
  walletOperationId?: string
}

export type CreateFinancialMessageInput = FinancialEntityRefs & {
  chatId: string
  userId: string
  messageType?: "MONEY" | "QR" | "PAYMENT_REQUEST" | "SYSTEM"
  content?: string
  metadata?: Record<string, unknown>
}

export type BindFinancialMessageInput = FinancialEntityRefs & {
  messageId: string
  content?: string
  metadata?: Record<string, unknown>
}

export type FinancialMessageRecord = {
  id: string
  chatId: string
  userId: string
  type: string
  content?: string | null
  createdAt: string
  transactionId?: string | null
  paymentId?: string | null
  p2pTransferId?: string | null
  qrOperationId?: string | null
  walletOperationId?: string | null
  metadata?: Record<string, unknown>
}

export interface FinancialMessageBindingRepository {
  createMessage(input: CreateFinancialMessageInput): Promise<FinancialMessageRecord>
  bindMessage(input: BindFinancialMessageInput): Promise<FinancialMessageRecord>
  listChatFinancialMessages(input: {
    chatId: string
    limit?: number
  }): Promise<FinancialMessageRecord[]>
}

type EventPublisher = {
  publish?: (event: string, payload: Record<string, unknown>) => Promise<void> | void
}

export class FinancialMessageBindingService {
  constructor(
    private readonly repository: FinancialMessageBindingRepository,
    private readonly events?: EventPublisher,
  ) {}

  async createMessage(input: CreateFinancialMessageInput): Promise<FinancialMessageRecord> {
    const result = await this.repository.createMessage(input)

    await this.events?.publish?.("messenger.financial_message.created", {
      messageId: result.id,
      chatId: result.chatId,
      userId: result.userId,
      type: result.type,
      transactionId: result.transactionId,
      paymentId: result.paymentId,
      p2pTransferId: result.p2pTransferId,
      qrOperationId: result.qrOperationId,
      walletOperationId: result.walletOperationId,
    })

    return result
  }

  async bindMessage(input: BindFinancialMessageInput): Promise<FinancialMessageRecord> {
    const result = await this.repository.bindMessage(input)

    await this.events?.publish?.("messenger.financial_message.bound", {
      messageId: result.id,
      chatId: result.chatId,
      userId: result.userId,
      transactionId: result.transactionId,
      paymentId: result.paymentId,
      p2pTransferId: result.p2pTransferId,
      qrOperationId: result.qrOperationId,
      walletOperationId: result.walletOperationId,
    })

    return result
  }

  async listChatFinancialMessages(input: {
    chatId: string
    limit?: number
  }): Promise<FinancialMessageRecord[]> {
    return this.repository.listChatFinancialMessages(input)
  }
}
