import { Router } from "express"
import { CoinProductsController } from "../coin-products.controller"

export function createCoinProductsRouter(
  controller: CoinProductsController,
): Router {
  const router = Router()

  router.post("/coin/deposits", controller.openDeposit)
  router.post("/coin/deposits/:depositId/accrue", controller.accrueDepositInterest)
  router.post("/coin/credits/request", controller.requestCredit)

  return router
}