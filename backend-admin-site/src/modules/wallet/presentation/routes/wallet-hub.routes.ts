import { Router } from "express"
import { WalletHubController } from "../wallet-hub.controller"

export function createWalletHubRouter(controller: WalletHubController): Router {
  const router = Router()

  router.get("/hub/:ownerUserId", controller.getHub)
  router.get("/cards/:ownerUserId", controller.listCards)
  router.get("/crypto/:ownerUserId", controller.getCryptoWallet)
  router.get("/coin/:ownerUserId", controller.getCoinWallet)

  return router
}