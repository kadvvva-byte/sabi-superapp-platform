import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class PaymentAuditService {

  async log(data: {
    paymentId: string
    action: string
    previousState: any
    newState: any
  }) {

    await prisma.paymentAudit.create({
      data: {
        paymentId: data.paymentId,
        action: data.action,
        data: {
          previousState: data.previousState,
          newState: data.newState
        }
      }
    })

  }

}