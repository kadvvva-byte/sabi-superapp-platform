import { PaymentRequest } from "./payment-request"

export interface PaymentHandler {

  handle(request: PaymentRequest): Promise<any>

}