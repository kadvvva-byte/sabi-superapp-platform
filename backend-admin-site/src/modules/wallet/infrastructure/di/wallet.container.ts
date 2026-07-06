import { Router } from "express"

export function buildWalletContainer() {

  const router = Router()

  router.get("/health", (req, res) => {
    res.json({ status: "wallet-ok" })
  })

  return {
    routes: router
  }

}