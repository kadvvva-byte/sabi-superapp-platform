import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { PaymentToWalletFlowService } from "../../application/services/payment-to-wallet-flow.service"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

export function createPaymentWalletFlowRouter(
  paymentToWalletFlow: PaymentToWalletFlowService,
): Router {
  const router = Router()

  router.post(
    "/execute-to-wallet",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const paymentId = asString(req.body?.paymentId)
        const providerPaymentId = asString(req.body?.providerPaymentId)
        const walletId = asString(req.body?.walletId)
        const userId = asString(req.body?.userId)
        const amount = asNumber(req.body?.amount)
        const currency = asString(req.body?.currency) ?? "USD"
        const idempotencyKey =
          asString(req.body?.idempotencyKey) ??
          asString(req.headers["x-idempotency-key"]) ??
          undefined
        const direction = asString(req.body?.direction)
        const reference = asString(req.body?.reference)
        const metadata = asRecord(req.body?.metadata)

        if (!paymentId) throw new Error("payment_id_required")
        if (!providerPaymentId) throw new Error("provider_payment_id_required")
        if (!walletId) throw new Error("wallet_id_required")
        if (!userId) throw new Error("user_id_required")
        if (amount === undefined || amount <= 0) throw new Error("amount_required")
        if (!idempotencyKey) throw new Error("idempotency_key_required")
        if (direction && direction !== "capture" && direction !== "refund") {
          throw new Error("payment_direction_invalid")
        }

        const result = await paymentToWalletFlow.execute({
          paymentId,
          providerPaymentId,
          walletId,
          userId,
          amount,
          currency,
          idempotencyKey,
          direction: direction as "capture" | "refund" | undefined,
          reference,
          metadata,
        })

        res.json({
          ok: true,
          data: result,
        })
      } catch (error) {
        next(error)
      }
    },
  )

  return router
}
