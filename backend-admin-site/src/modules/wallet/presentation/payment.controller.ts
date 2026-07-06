import { Request, Response } from "express"
import { PaymentProcessorService } from "../../payment/application/services/payment-processor.service"

const paymentService = new PaymentProcessorService()

export class WalletPaymentController {

  static async pay(req: Request, res: Response) {

    try {

      const { fromWalletId, toWalletId, amount } = req.body

      const result = await paymentService.process({
        fromWalletId,
        toWalletId,
        amount
      })

      return res.json(result)

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      })

    }

  }

}