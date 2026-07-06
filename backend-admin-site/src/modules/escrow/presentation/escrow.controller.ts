import { Router } from "express"
import { EscrowService } from "../application/services/escrow.service"

const router = Router()
const service = new EscrowService()

router.post("/create", async (req, res) => {

  try {

    const { buyerWalletId, sellerWalletId, amount } = req.body

    const escrow = await service.createEscrow(
      buyerWalletId,
      sellerWalletId,
      amount
    )

    res.json(escrow)

  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }

})

export default router