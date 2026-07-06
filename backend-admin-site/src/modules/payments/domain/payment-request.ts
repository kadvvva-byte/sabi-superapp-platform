import { PaymentType } from "./payment-type"

export interface PaymentRequest {

  type: PaymentType

  fromUserId: string

  toUserId?: string

  amount: number

  currency: string

  metadata?: any

}