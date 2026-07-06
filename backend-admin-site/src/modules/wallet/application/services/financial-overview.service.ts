export type FinancialOverviewWalletItem = {
  id: string
  type: string
  currency: string
  balance: number
  locked: boolean
  createdAt: string
}

export type FinancialOverviewResult = {
  scope: {
    userId?: string
    walletId?: string
  }
  totals: {
    totalBalance: number
    walletCount: number
    lockedWalletCount: number
    qrCount: number
    paymentCount: number
    p2pCount: number
    walletOperationCount: number
    businessWalletCount: number
    merchantWalletCount: number
  }
  wallets: FinancialOverviewWalletItem[]
  defaultActions: string[]
}

export interface FinancialOverviewRepository {
  getWalletsByUserId(userId: string): Promise<FinancialOverviewWalletItem[]>
  getWalletById(walletId: string): Promise<FinancialOverviewWalletItem | null>
  countQrByWalletIds(walletIds: string[]): Promise<number>
  countPaymentsByWalletIds(walletIds: string[]): Promise<number>
  countP2PByWalletIds(walletIds: string[]): Promise<number>
  countWalletOperationsByWalletIds(walletIds: string[]): Promise<number>
  countBusinessWalletsByUserId(userId: string): Promise<number>
  countMerchantWalletsByUserId(userId: string): Promise<number>
}

export class FinancialOverviewService {
  constructor(private readonly repository: FinancialOverviewRepository) {}

  async getOverview(input: {
    userId?: string
    walletId?: string
  }): Promise<FinancialOverviewResult> {
    if (!input.userId && !input.walletId) {
      throw new Error("user_id_or_wallet_id_required")
    }

    let wallets: FinancialOverviewWalletItem[] = []

    if (input.walletId) {
      const wallet = await this.repository.getWalletById(input.walletId)
      wallets = wallet ? [wallet] : []
    } else if (input.userId) {
      wallets = await this.repository.getWalletsByUserId(input.userId)
    }

    const walletIds = wallets.map((item) => item.id)

    const [
      qrCount,
      paymentCount,
      p2pCount,
      walletOperationCount,
      businessWalletCount,
      merchantWalletCount,
    ] = await Promise.all([
      walletIds.length > 0 ? this.repository.countQrByWalletIds(walletIds) : 0,
      walletIds.length > 0 ? this.repository.countPaymentsByWalletIds(walletIds) : 0,
      walletIds.length > 0 ? this.repository.countP2PByWalletIds(walletIds) : 0,
      walletIds.length > 0
        ? this.repository.countWalletOperationsByWalletIds(walletIds)
        : 0,
      input.userId ? this.repository.countBusinessWalletsByUserId(input.userId) : 0,
      input.userId ? this.repository.countMerchantWalletsByUserId(input.userId) : 0,
    ])

    return {
      scope: {
        userId: input.userId,
        walletId: input.walletId,
      },
      totals: {
        totalBalance: wallets.reduce((sum, item) => sum + item.balance, 0),
        walletCount: wallets.length,
        lockedWalletCount: wallets.filter((item) => item.locked).length,
        qrCount,
        paymentCount,
        p2pCount,
        walletOperationCount,
        businessWalletCount,
        merchantWalletCount,
      },
      wallets,
      defaultActions: [
        "send",
        "topup",
        "withdraw",
        "scan_qr",
        "history",
        "p2p",
      ],
    }
  }
}
