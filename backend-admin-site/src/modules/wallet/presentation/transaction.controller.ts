import { Router } from "express"
import { TransactionRouterService } from "../application/services/transaction-router.service"

const router = Router()
const routerService = new TransactionRouterService()

router.post("/transaction", async (req, res) => {

  try {

    const result = await routerService.route(req.body)

    res.json(result)

  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }

})

export default router