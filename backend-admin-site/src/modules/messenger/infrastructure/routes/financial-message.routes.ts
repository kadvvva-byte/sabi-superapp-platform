import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { FinancialMessageBindingService } from "../../application/services/financial-message-binding.service"

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

export function createFinancialMessageRouter(
  financialMessageBindingService: FinancialMessageBindingService,
): Router {
  const router = Router()

  router.post(
    "/financial-messages",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const chatId = asString(req.body?.chatId)
        const userId = asString(req.body?.userId)

        if (!chatId) throw new Error("chat_id_required")
        if (!userId) throw new Error("user_id_required")

        const result = await financialMessageBindingService.createMessage({
          chatId,
          userId,
          messageType:
            (asString(req.body?.messageType) as
              | "MONEY"
              | "QR"
              | "PAYMENT_REQUEST"
              | "SYSTEM"
              | undefined) ?? "SYSTEM",
          content: asString(req.body?.content),
          transactionId: asString(req.body?.transactionId),
          paymentId: asString(req.body?.paymentId),
          p2pTransferId: asString(req.body?.p2pTransferId),
          qrOperationId: asString(req.body?.qrOperationId),
          walletOperationId: asString(req.body?.walletOperationId),
          metadata: asRecord(req.body?.metadata),
        })

        res.status(201).json({
          ok: true,
          data: result,
        })
      } catch (error) {
        next(error)
      }
    },
  )

  router.patch(
    "/financial-messages/:messageId/bind",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const messageId = asString(req.params.messageId)

        if (!messageId) throw new Error("message_id_required")

        const result = await financialMessageBindingService.bindMessage({
          messageId,
          content: asString(req.body?.content),
          transactionId: asString(req.body?.transactionId),
          paymentId: asString(req.body?.paymentId),
          p2pTransferId: asString(req.body?.p2pTransferId),
          qrOperationId: asString(req.body?.qrOperationId),
          walletOperationId: asString(req.body?.walletOperationId),
          metadata: asRecord(req.body?.metadata),
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

  router.get(
    "/chats/:chatId/financial-feed",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const chatId = asString(req.params.chatId)

        if (!chatId) throw new Error("chat_id_required")

        const result =
          await financialMessageBindingService.listChatFinancialMessages({
            chatId,
            limit: asNumber(req.query.limit),
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