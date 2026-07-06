import { prisma } from "../../../../infrastructure/prisma/prisma.client"
import { PaymentRepository } from "../../domain/repositories/payment.repository"
import { Payment } from "../../domain/aggregates/payment.aggregate"
import { PaymentStatus } from "../../domain/value-objects/payment-status"
import { buildWalletProviderPersistenceMetadata } from "../../../wallet/application/security/wallet-provider-persistence.policy"

export class PrismaPaymentRepository implements PaymentRepository {

  async findByProviderPaymentId(providerPaymentId: string): Promise<Payment | null> {

    const record = await prisma.payment.findUnique({
      where: {
        providerPaymentId
      }
    })

    if (!record) {
      return null
    }

    return Payment.rehydrate({
      id: record.id,
      userId: record.userId,
      provider: record.provider,
      providerPaymentId: record.providerPaymentId,
      currency: record.currency,
      capturedAmount: BigInt(record.capturedAmount.toString()),
      refundedAmount: BigInt(record.refundedAmount.toString()),
      status: record.status as PaymentStatus,
      version: record.version
    })

  }

  async save(payment: Payment): Promise<void> {
    const providerPersistence = buildWalletProviderPersistenceMetadata({
      walletRoute: "payment_provider_persistence",
      providerFamily: "payment_provider",
      providerId: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      providerReference: payment.providerPaymentId,
      ledgerReference: payment.id,
      sourceModule: "payments",
      operationKind: "payment_status_persist",
      providerStatus: payment.status,
      riskStatus: "not_checked",
      complianceStatus: "pending",
      metadata: {
        paymentId: payment.id,
        userId: payment.userId,
        currency: payment.currency,
        capturedAmount: payment.capturedAmount.toString(),
        refundedAmount: payment.refundedAmount.toString(),
        status: payment.status,
        version: payment.version,
      },
    })

    await prisma.payment.update({
      where: {
        id: payment.id
      },
      data: {
        status: payment.status,
        capturedAmount: payment.capturedAmount.toString(),
        refundedAmount: payment.refundedAmount.toString(),
        version: payment.version,
        audits: {
          create: {
            action: `PROVIDER_STATUS_${payment.status}`,
            data: providerPersistence as any,
          },
        },
      }
    })

  }

}
