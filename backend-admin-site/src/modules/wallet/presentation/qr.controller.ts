import { Request, Response } from "express"
import { QrPaymentService } from "../application/services/qr-payment.service"
import { QrGeneratorService } from "../application/services/qr-generator.service"

const qrGenerator = new QrGeneratorService()
const qrPayment = new QrPaymentService()

export class QrController {

  async pay(req: Request, res: Response) {

    try {

      const { fromWalletId, toWalletId, amount } = req.body

      const result = await qrPayment.pay(
        fromWalletId,
        toWalletId,
        amount
      )

      res.json(result)

    } catch (error: any) {

      res.status(400).json({
        error: error.message
      })

    }

  }

  async generate(req: Request, res: Response) {

  try {

    const { walletId, amount } = req.body

    const result = await qrGenerator.generate(walletId, amount)

      res.json(result)

    }  catch (error: any) {

    res.status(400).json({
      error: error.message
    })

  }

 }

}