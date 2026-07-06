import { Router } from "express"
import { P2PTransferService } from "../application/services/p2p-transfer.service"

const router = Router()
const service = new P2PTransferService()

router.post("/transfer", async (req, res) => {

  try {

    const { fromWalletId, toWalletId, amount } = req.body

    const result = await service.transfer(
      fromWalletId,
      toWalletId,
      amount
    )

    res.json(result)

  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }

})

export default router