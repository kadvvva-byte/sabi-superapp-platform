import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { FinancialOverviewService } from "../../application/services/financial-overview.service"
import type { UnifiedTransactionHistoryPort } from "../../../../core/contracts/unified-transaction-history.port"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

export function createFinancialDashboardRouter(
  financialOverviewService: FinancialOverviewService,
  unifiedTransactionHistory: UnifiedTransactionHistoryPort,
): Router {
  const router = Router()

  router.get(
    "/dashboard",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = asString(req.query.userId)
        const walletId = asString(req.query.walletId)
        const historyLimit = asNumber(req.query.historyLimit) ?? 10

        const [overview, history] = await Promise.all([
          financialOverviewService.getOverview({
            userId,
            walletId,
          }),
          unifiedTransactionHistory.getHistory({
            userId,
            walletId,
            limit: historyLimit,
          }),
        ])

        res.json({
          ok: true,
          data: {
            overview,
            recentHistory: history.items,
            nextCursor: history.nextCursor,
            widgets: [
              "balance_cards",
              "quick_actions",
              "recent_history",
              "qr_entry",
              "p2p_entry",
              "merchant_business_entry",
            ],
          },
        })
      } catch (error) {
        next(error)
      }
    },
  )

  return router
}
