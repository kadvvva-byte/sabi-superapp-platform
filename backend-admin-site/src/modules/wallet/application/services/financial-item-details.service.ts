export type FinancialItemKind =
  | "transaction"
  | "payment"
  | "p2p"
  | "qr-payment"
  | "wallet-operation"

export type FinancialItemDetailsResult = {
  id: string
  kind: FinancialItemKind
  status?: string
  amount?: number
  currency?: string
  createdAt?: string
  transactionId?: string
  walletId?: string
  reference?: string
  sourceModule: string
  payload: Record<string, unknown>
}

export interface FinancialItemDetailsRepository {
  getTransaction(id: string): Promise<Record<string, unknown> | null>
  getPayment(id: string): Promise<Record<string, unknown> | null>
  getP2PTransfer(id: string): Promise<Record<string, unknown> | null>
  getQrPayment(id: string): Promise<Record<string, unknown> | null>
  getWalletOperation(id: string): Promise<Record<string, unknown> | null>
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number") return value
  return undefined
}

export class FinancialItemDetailsService {
  constructor(private readonly repository: FinancialItemDetailsRepository) {}

  async getById(input: {
    kind: FinancialItemKind
    id: string
  }): Promise<FinancialItemDetailsResult> {
    let payload: Record<string, unknown> | null = null
    let sourceModule = "wallet"

    switch (input.kind) {
      case "transaction":
        payload = await this.repository.getTransaction(input.id)
        sourceModule = "wallet"
        break
      case "payment":
        payload = await this.repository.getPayment(input.id)
        sourceModule = "payments"
        break
      case "p2p":
        payload = await this.repository.getP2PTransfer(input.id)
        sourceModule = "p2p"
        break
      case "qr-payment":
        payload = await this.repository.getQrPayment(input.id)
        sourceModule = "qr"
        break
      case "wallet-operation":
        payload = await this.repository.getWalletOperation(input.id)
        sourceModule = "wallet-core"
        break
      default:
        throw new Error("financial_item_kind_invalid")
    }

    if (!payload) {
      throw new Error("financial_item_not_found")
    }

    return {
      id: input.id,
      kind: input.kind,
      status: asString(payload.status),
      amount: asNumber(payload.amount),
      currency: asString(payload.currency),
      createdAt: asString(payload.createdAt),
      transactionId: asString(payload.transactionId),
      walletId: asString(payload.walletId),
      reference: asString(payload.reference),
      sourceModule,
      payload,
    }
  }
}
