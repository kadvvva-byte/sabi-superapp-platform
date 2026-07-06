export interface Qr {
  id: string
  walletId: string
  amount?: number
  currency?: string
  status: "ACTIVE" | "PAID" | "EXPIRED"
  expiresAt?: Date
  createdAt: Date
}