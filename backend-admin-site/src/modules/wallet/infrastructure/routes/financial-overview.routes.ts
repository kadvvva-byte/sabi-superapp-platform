import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { FinancialOverviewService } from "../../application/services/financial-overview.service"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

export function createFinancialOverviewRouter(
  financialOverviewService: FinancialOverviewService,
): Router {
  const router = Router()

  router.get(
    "/overview",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await financialOverviewService.getOverview({
          userId: asString(req.query.userId),
          walletId: asString(req.query.walletId),
        })

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
