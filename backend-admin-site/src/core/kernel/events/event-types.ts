export type DomainEventName = string

export type DomainEventPayload = Record<string, unknown>

export const EventTypes = {
  WALLET_TRANSFER_CREATED: "wallet.transfer.created",
  WALLET_TRANSFER_COMPLETED: "wallet.transfer.completed",
  PAYMENT_CREATED: "payment.created",
  PAYMENT_CAPTURED: "payment.captured",
  PAYMENT_FAILED: "payment.failed",
  P2P_TRANSFER_CREATED: "p2p.transfer.created",
  P2P_TRANSFER_COMPLETED: "p2p.transfer.completed",
  QR_PAYMENT_CREATED: "qr.payment.created",
  QR_PAYMENT_COMPLETED: "qr.payment.completed",
  NOTIFICATION_CREATED: "notification.created",
  MESSAGE_CREATED: "message.created",
  MESSAGE_UPDATED: "message.updated",
} as const

export type KnownEventType = (typeof EventTypes)[keyof typeof EventTypes]