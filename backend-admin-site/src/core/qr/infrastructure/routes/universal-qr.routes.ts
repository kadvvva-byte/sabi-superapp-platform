import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { UniversalQrExecutionPort } from "../../../../core/contracts/universal-qr-execution.port"

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

export function createUniversalQrRouter(
  universalQrExecution: UniversalQrExecutionPort,
): Router {
  const router = Router()

  router.post(
    "/execute",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const qrId = asString(req.body?.qrId)
        const actorUserId = asString(req.body?.actorUserId)
        const payerWalletId = asString(req.body?.payerWalletId)
        const receiverWalletId = asString(req.body?.receiverWalletId)
        const amount = asNumber(req.body?.amount)
        const currency = asString(req.body?.currency)
        const idempotencyKey =
          asString(req.body?.idempotencyKey) ??
          asString(req.headers["x-idempotency-key"]) ??
          undefined
        const routeOverride = asString(req.body?.routeOverride)
        const metadata = asRecord(req.body?.metadata)

        if (!qrId) throw new Error("qr_id_required")
        if (!idempotencyKey) throw new Error("idempotency_key_required")

        const result = await universalQrExecution.execute({
          qrId,
          actorUserId,
          payerWalletId,
          receiverWalletId,
          amount,
          currency,
          idempotencyKey,
          routeOverride,
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
