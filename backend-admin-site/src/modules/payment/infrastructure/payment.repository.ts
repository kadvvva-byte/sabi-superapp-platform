import { PrismaClient, PaymentStatus } from "@prisma/client"

export class PaymentRepository {

  constructor(private prisma: PrismaClient) {}

  async createPayment(data: {
    providerPaymentId: string
    userId: string
    provider: string
    currency: string
  }) {

    return this.prisma.payment.create({
      data: {
        providerPaymentId: data.providerPaymentId,
        userId: data.userId,
        provider: data.provider,
        currency: data.currency,
        status: PaymentStatus.CREATED
      }
    })

  }

}