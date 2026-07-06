import { Request, Response } from "express"
import { paymentRouter } from "../../payments/payments.module"

export class PaymentController {

  async pay(req: Request, res: Response) {

    try {

      const result = await paymentRouter.route(req.body)

      res.json(result)

    } catch (error: any) {

      res.status(500).json({
        error: error.message
      })

    }

  }

}