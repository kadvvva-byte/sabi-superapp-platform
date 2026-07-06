export const EventTypes = {

  // QR
  QR_PAYMENT_COMPLETED: "qr.payment.completed",

  // Escrow
  ESCROW_CREATED: "escrow.created",
  ESCROW_RELEASED: "escrow.released",

  // Wallet / Transfers
  TRANSFER_CREATED: "transfer.created",

  // Messenger
  MESSAGE_SENT: "messenger.message.sent",
  MESSAGE_DELIVERED: "messenger.message.delivered",
  MESSAGE_READ: "messenger.message.read",
  MESSAGE_TYPING: "messenger.message.typing",

  // Activity
  USER_ACTIVITY: "user.activity"

} as const