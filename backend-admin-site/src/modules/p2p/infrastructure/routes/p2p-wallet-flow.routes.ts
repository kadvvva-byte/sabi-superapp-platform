import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { P2PWalletTransferFlowService } from "../../application/services/p2p-wallet-transfer-flow.service"

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

export function createP2PWalletFlowRouter(
  p2pWalletTransferFlow: P2PWalletTransferFlowService,
): Router {
  const router = Router()

  router.post(
    "/execute-wallet-transfer",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const transferId = asString(req.body?.transferId)
        const fromUserId = asString(req.body?.fromUserId)
        const toUserId = asString(req.body?.toUserId)
        const fromWalletId = asString(req.body?.fromWalletId)
        const toWalletId = asString(req.body?.toWalletId)
        const amount = asNumber(req.body?.amount)
        const currency = asString(req.body?.currency) ?? "USD"
        const idempotencyKey =
          asString(req.body?.idempotencyKey) ??
          asString(req.headers["x-idempotency-key"]) ??
          undefined
        const reference = asString(req.body?.reference)
        const metadata = asRecord(req.body?.metadata)

        if (!transferId) throw new Error("transfer_id_required")
        if (!fromUserId) throw new Error("from_user_id_required")
        if (!toUserId) throw new Error("to_user_id_required")
        if (!fromWalletId) throw new Error("from_wallet_id_required")
        if (!toWalletId) throw new Error("to_wallet_id_required")
        if (amount === undefined || amount <= 0) throw new Error("amount_required")
        if (!idempotencyKey) throw new Error("idempotency_key_required")

        const result = await p2pWalletTransferFlow.execute({
          transferId,
          fromUserId,
          toUserId,
          fromWalletId,
          toWalletId,
          amount,
          currency,
          idempotencyKey,
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
