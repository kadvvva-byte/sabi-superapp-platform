import { prisma } from "../../../../infrastructure/prisma/prisma.client"
import { PaymentStatus } from "@prisma/client"

export class QRPaymentDomainService {

  async createQRPayment(
    qrId: string,
    payerWalletId: string,
    amount: number
  ) {

    const payment = await prisma.qRPayment.create({
      data: {
        qrId,
        payerWalletId: payerWalletId,
        amount,
        currency: "USD",
        status: PaymentStatus.CREATED,
        createdAt: new Date()
      }
    })

    return payment

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

}