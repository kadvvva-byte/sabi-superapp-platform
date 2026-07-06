import { PaymentType } from "../domain/payment-type"
import { PaymentRequest } from "../domain/payment-request"
import { PaymentHandler } from "../domain/payment-handler.interface"
import { paymentPipeline } from "../../payment/pipeline/payment.pipeline"

export class PaymentRouterService {

  private handlers: Map<PaymentType, PaymentHandler> = new Map()

  register(type: PaymentType, handler: PaymentHandler) {

    this.handlers.set(type, handler)

  }

  async route(request: any) {

    const context = {
      request
     }

     return paymentPipeline.execute(context)

  }

}