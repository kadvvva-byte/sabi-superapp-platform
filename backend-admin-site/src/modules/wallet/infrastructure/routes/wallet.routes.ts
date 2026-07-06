import { Router } from "express"

import { walletService } from "../../application/wallet.service"
import { walletProviderExecutionGuard } from "../../application/provider/wallet-provider-execution.guard"

const router = Router()

function sendProviderBlocked(res: { status(code: number): { json(body: unknown): void } }, route: string) {
  const response = walletProviderExecutionGuard.buildBlockedExecutionResponse(route)

  res.status(503).json({
    ...response,
    error: response.reason ?? "wallet_provider_not_ready",
    message: "Wallet money movement is disabled until the required bank/provider route is configured on backend.",
  })
}

router.post("/create", (req, res) => {
  const wallet = walletService.createWallet()

  res.json({
    ...wallet,
    providerExecutionPolicy: {
      moneyMovementRequiresProvider: true,
      tokenOnlyStorage: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
    },
  })
})

router.post("/deposit", (_req, res) => {
  sendProviderBlocked(res, "wallet_deposit")
})

router.post("/transfer", (_req, res) => {
  sendProviderBlocked(res, "wallet_transfer")
})

router.post("/withdraw", (_req, res) => {
  sendProviderBlocked(res, "wallet_withdraw")
})

export default router
