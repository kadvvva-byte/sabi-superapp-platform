import { PaymentHandler } from "../domain/payment-handler.interface"
import { PaymentRequest } from "../domain/payment-request"

export class QRHandler implements PaymentHandler {

  async handle(request: PaymentRequest) {

    console.log("Processing QR payment")

  }

}