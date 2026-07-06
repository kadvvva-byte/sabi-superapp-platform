import { PrismaPaymentRepository } from "../../infrastructure/persistence/prisma-payment.repository"
import { PaymentProviderFactory } from "../../infrastructure/providers/payment-provider.factory"
import { assertWebhookPayloadDoesNotContainCardData } from "../../../wallet/application/security/wallet-provider-domain.policy"
import { buildWalletProviderPersistenceMetadata } from "../../../wallet/application/security/wallet-provider-persistence.policy"
import { walletProviderExecutionGuard } from "../../../wallet/application/provider/wallet-provider-execution.guard"

function normalizeProviderName(value: string): string {
  const provider = String(value ?? "").trim().toLowerCase()

  if (!provider) {
    throw new Error("payment_provider_required")
  }

  return provider
}

function resolveWebhookProviderConfigId(provider: string): string {
  const normalized = provider.trim().toLowerCase()

  if (normalized.includes("alipay")) return "alipay_plus_acquiring"
  if (normalized.includes("card") || normalized.includes("token")) return "bank_card_tokenization"
  if (normalized.includes("virtual")) return "virtual_card_issuer"
  if (normalized.includes("merchant") || normalized.includes("acquir")) return "merchant_acquiring"
  if (normalized.includes("business") || normalized.includes("payout")) return "business_payout"
  if (normalized.includes("coin")) return "coin_wallet_ledger"
  if (normalized.includes("crypto")) return "crypto_custody_provider"

  return "local_bank_gateway"
}

function normalizeProviderPaymentId(value: unknown): string {
  const id = String(value ?? "").trim()

  if (!id) {
    throw new Error("provider_payment_id_required")
  }

  return id
}

function normalizeProviderAmount(value: unknown): bigint {
  if (typeof value === "bigint") return value

  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) return 0n
    return BigInt(Math.trunc(value))
  }

  const text = String(value ?? "").trim()
  if (!text) return 0n

  const normalized = text.includes(".") ? text.split(".")[0] : text
  const digitsOnly = normalized.replace(/[^0-9-]/g, "")

  if (!digitsOnly || digitsOnly === "-") return 0n

  try {
    return BigInt(digitsOnly)
  } catch {
    return 0n
  }
}

export class HandleProviderWebhookUseCase {
  private paymentRepo = new PrismaPaymentRepository()

  async execute(provider: string, payload: unknown) {
    const normalizedProvider = normalizeProviderName(provider)

    assertWebhookPayloadDoesNotContainCardData(payload)

    const providerConfigId = resolveWebhookProviderConfigId(normalizedProvider)
    const readiness = walletProviderExecutionGuard.assertProviderReady({
      route: "provider_webhook",
      providerId: providerConfigId,
    })

    const handler = PaymentProviderFactory.getWebhookHandler(normalizedProvider)
    const dto = await handler(payload)
    const providerPaymentId = normalizeProviderPaymentId(dto.providerPaymentId)
    const payment = await this.paymentRepo.findByProviderPaymentId(providerPaymentId)

    if (!payment) {
      return {
        handled: false,
        reason: "payment_not_found",
        provider: normalizedProvider,
        providerPaymentId,
      }
    }

    if (dto.raw) {
      assertWebhookPayloadDoesNotContainCardData(dto.raw)
    }

    if (dto.status === "TRADE_SUCCESS") {
      const amount = normalizeProviderAmount(dto.amount)

      if (amount <= 0n) {
        throw new Error("provider_webhook_success_amount_required")
      }

      payment.capture(amount)
    } else if (dto.status === "TRADE_FAILED" || dto.status === "TRADE_CANCELLED") {
      payment.markFailed()
    } else {
      payment.markAuthorized()
    }

    const providerPersistence = buildWalletProviderPersistenceMetadata({
      walletRoute: "payment_provider_webhook",
      providerFamily: readiness.providerFamily,
      providerId: readiness.requiredProviderId,
      providerPaymentId,
      providerReference: providerPaymentId,
      ledgerReference: payment.id,
      sourceModule: "payments",
      operationKind: "provider_webhook",
      providerStatus: readiness.providerStatus,
      riskStatus: "not_checked",
      complianceStatus: "pending",
      metadata: dto.raw && typeof dto.raw === "object" && !Array.isArray(dto.raw) ? dto.raw as Record<string, unknown> : null,
    })

    await this.paymentRepo.save(payment)

    return {
      handled: true,
      provider: normalizedProvider,
      providerPaymentId,
      status: payment.status,
      capturedAmount: payment.capturedAmount.toString(),
      refundedAmount: payment.refundedAmount.toString(),
      tokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
      providerPersistence,
    }
  }
}
