import { PaymentHandler } from "../domain/payment-handler.interface"
import { PaymentRequest } from "../domain/payment-request"

export class P2PHandler implements PaymentHandler {

  async handle(request: PaymentRequest) {

    console.log("Processing P2P payment")

    // вызвать существующий p2p сервис

  }

}