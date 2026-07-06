import { Request, Response } from "express"
import { MiniAppWalletService } from "../../application/services/miniapp-wallet.service"

const service = new MiniAppWalletService()

export class MiniAppWalletController {

  async balance(req: Request, res: Response) {

    const userId = req.params.userId as string

    const balance = await service.getBalance(userId)

    res.json({ balance })

  }

  async pay(req: Request, res: Response) {

    const { userId, toUserId, amount } = req.body

    const tx = await service.pay(userId, toUserId, amount)

    res.json(tx)

  }

}