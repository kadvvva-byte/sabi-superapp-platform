import { Router } from "express"
import type { Request, Response, NextFunction } from "express"

import type {
  UnifiedTransactionHistoryPort,
  UnifiedTransactionHistoryQuery,
} from "../../../../core/contracts/unified-transaction-history.port"

export function createUnifiedTransactionHistoryRouter(
  history: UnifiedTransactionHistoryPort,
): Router {
  const router = Router()

  router.get(
    "/history",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query: UnifiedTransactionHistoryQuery = {
          userId: typeof req.query.userId === "string" ? req.query.userId : undefined,
          walletId: typeof req.query.walletId === "string" ? req.query.walletId : undefined,
          kind:
            typeof req.query.kind === "string"
              ? (req.query.kind as UnifiedTransactionHistoryQuery["kind"])
              : undefined,
          status: typeof req.query.status === "string" ? req.query.status : undefined,
          cursor: typeof req.query.cursor === "string" ? req.query.cursor : undefined,
          limit:
            typeof req.query.limit === "string"
              ? Number.parseInt(req.query.limit, 10)
              : undefined,
        }

        const result = await history.getHistory(query)

        res.json({
          ok: true,
          data: result,
        })
      } catch (error) {
        next(error)
      }
    },
  )

  return router
}
