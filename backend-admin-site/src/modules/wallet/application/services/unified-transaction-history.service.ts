import type {
  UnifiedTransactionHistoryPort,
  UnifiedTransactionHistoryQuery,
  UnifiedTransactionHistoryRecord,
  UnifiedTransactionHistoryResult,
} from "../../../../core/contracts/unified-transaction-history.port"

export type TransactionHistorySourceRecord = {
  id: string
  kind: UnifiedTransactionHistoryRecord["kind"]
  status: string
  amount: number
  currency: string
  createdAt: string | Date
  transactionId?: string
  walletId?: string
  reference?: string
  sourceModule: UnifiedTransactionHistoryRecord["sourceModule"]
  counterparty?: UnifiedTransactionHistoryRecord["counterparty"]
  messageId?: string
  metadata?: Record<string, unknown>
}

export interface UnifiedTransactionHistoryRepository {
  listByUserId(userId: string): Promise<TransactionHistorySourceRecord[]>
  listByWalletId(walletId: string): Promise<TransactionHistorySourceRecord[]>
}

function normalizeDate(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

function decodeCursor(cursor?: string): { createdAt: string; id: string } | null {
  if (!cursor) {
    return null
  }

  try {
    const [createdAt, id] = Buffer.from(cursor, "base64").toString("utf8").split("::")
    if (!createdAt || !id) {
      return null
    }

    return { createdAt, id }
  } catch {
    return null
  }
}

function encodeCursor(item: UnifiedTransactionHistoryRecord): string {
  return Buffer.from(`${item.createdAt}::${item.id}`, "utf8").toString("base64")
}

export class UnifiedTransactionHistoryService implements UnifiedTransactionHistoryPort {
  constructor(private readonly repository: UnifiedTransactionHistoryRepository) {}

  async getHistory(
    query: UnifiedTransactionHistoryQuery,
  ): Promise<UnifiedTransactionHistoryResult> {
    const limit = Math.min(Math.max(query.limit ?? 20, 1), 100)

    const sourceItems = query.walletId
      ? await this.repository.listByWalletId(query.walletId)
      : query.userId
        ? await this.repository.listByUserId(query.userId)
        : []

    const normalized: UnifiedTransactionHistoryRecord[] = sourceItems.map((item) => ({
      ...item,
      createdAt: normalizeDate(item.createdAt),
    }))

    const filtered = normalized
      .filter((item) => (query.kind ? item.kind === query.kind : true))
      .filter((item) => (query.status ? item.status === query.status : true))
      .sort((left, right) => {
        const dateDiff = new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
        if (dateDiff !== 0) {
          return dateDiff
        }

        return right.id.localeCompare(left.id)
      })

    const cursor = decodeCursor(query.cursor)
    const paged = cursor
      ? filtered.filter((item) => {
          const itemTime = new Date(item.createdAt).getTime()
          const cursorTime = new Date(cursor.createdAt).getTime()

          if (itemTime < cursorTime) {
            return true
          }

          if (itemTime > cursorTime) {
            return false
          }

          return item.id < cursor.id
        })
      : filtered

    const items = paged.slice(0, limit)
    const nextCursor = paged.length > limit ? encodeCursor(items[items.length - 1]) : undefined

    return {
      items,
      nextCursor,
    }
  }
}
