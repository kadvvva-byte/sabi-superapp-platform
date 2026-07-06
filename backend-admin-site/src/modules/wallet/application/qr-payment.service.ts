import { prisma } from "../../../infrastructure/prisma/prisma.client"
import { PaymentStatus } from "@prisma/client"

export class QRPaymentService {

  async createPayment(
    qrId: string,
    payerWalletId: string,
    amount: number
  ) {

    return prisma.qRPayment.create({
      data: {
        qrId,
        payerWalletId,
        amount,
        currency: "USD",
        status: PaymentStatus.CREATED,
        createdAt: new Date()
      }
    })

  }

  async authorizePayment(paymentId: string) {

    return prisma.qRPayment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.AUTHORIZED
      }
    })

  }

  async capturePayment(paymentId: string) {

    return prisma.qRPayment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.CAPTURED
      }
    })

  }

  async failPayment(paymentId: string) {

    return prisma.qRPayment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.FAILED
      }
    })

  }

  async getPayment(paymentId: string) {

    return prisma.qRPayment.findUnique({
      where: { id: paymentId }
    })

  }

}