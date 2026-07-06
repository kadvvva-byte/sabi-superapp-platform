import { Payment } from "../aggregates/payment.aggregate"

export interface PaymentRepository {

  findByProviderPaymentId(
    providerPaymentId: string
  ): Promise<Payment | null>

  save(
    payment: Payment
  ): Promise<void>

}