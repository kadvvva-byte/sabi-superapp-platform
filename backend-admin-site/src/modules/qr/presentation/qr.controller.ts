import type { Request, Response } from "express";
import { QrPaymentService } from "../application/services/qr-payment.service";

export class QrController {
  constructor(private readonly paymentService: QrPaymentService) {}

  async pay(req: Request, res: Response) {
    try {
      const result = await this.paymentService.pay(
        String(req.body.payload ?? ""),
        String(req.body.payerWalletId ?? ""),
      );

      res.json(result);
    } catch (error) {
      res.status(400).json({
        ok: false,
        message: error instanceof Error ? error.message : "QR payment failed",
      });
    }
  }
}
