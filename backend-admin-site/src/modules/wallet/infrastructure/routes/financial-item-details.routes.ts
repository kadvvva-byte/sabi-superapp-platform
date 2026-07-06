import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type {
  FinancialItemDetailsService,
  FinancialItemKind,
} from "../../application/services/financial-item-details.service"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

export function createFinancialItemDetailsRouter(
  financialItemDetailsService: FinancialItemDetailsService,
): Router {
  const router = Router()

  router.get(
    "/financial-item/:kind/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const kind = asString(req.params.kind) as FinancialItemKind | undefined
        const id = asString(req.params.id)

        if (!kind) throw new Error("financial_item_kind_required")
        if (!id) throw new Error("financial_item_id_required")

        const result = await financialItemDetailsService.getById({
          kind,
          id,
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
