import { WalletTransactionType } from "../constants/wallet-transaction-type"
import { TransactionEntity } from "./transaction.entity"

type LegacyTransactionType =
  | WalletTransactionType
  | "deposit"
  | "withdraw"
  | "transfer"
  | "payment"
  | "refund"
  | "DEPOSIT"
  | "WITHDRAW"
  | "TRANSFER"
  | "PAYMENT"
  | "REFUND"

function normalizeTransactionType(
  value: LegacyTransactionType,
): WalletTransactionType {
  const normalized = String(value).trim().toUpperCase()

  switch (normalized) {
    case "DEPOSIT":
    case "WITHDRAW":
    case "TRANSFER":
    case "PAYMENT":
    case "REFUND":
      return normalized as WalletTransactionType
    default:
      throw new Error(`Unsupported wallet transaction type: ${value}`)
  }
}

function isTransactionTypeLike(value: string): boolean {
  const normalized = value.trim().toUpperCase()

  return (
    normalized === "DEPOSIT" ||
    normalized === "WITHDRAW" ||
    normalized === "TRANSFER" ||
    normalized === "PAYMENT" ||
    normalized === "REFUND"
  )
}

export class Transaction extends TransactionEntity {
  constructor(
    id: string,
    walletId: string,
    amount: number,
    type: LegacyTransactionType,
    createdAt?: Date,
  )
  constructor(
    id: string,
    type: LegacyTransactionType,
    amount: number,
    fromWalletId?: string,
    toWalletId?: string,
    createdAt?: Date,
  )
  constructor(
    id: string,
    second: string,
    amount: number,
    fourth?: string | Date,
    fifth?: string | Date,
    sixth?: Date,
  ) {
    const createdAt =
      fourth instanceof Date
        ? fourth
        : fifth instanceof Date
          ? fifth
          : sixth instanceof Date
            ? sixth
            : new Date()

    if (isTransactionTypeLike(second)) {
      const type = normalizeTransactionType(second as LegacyTransactionType)
      const fromWalletId = typeof fourth === "string" ? fourth : undefined
      const toWalletId = typeof fifth === "string" ? fifth : undefined
      const walletId = fromWalletId ?? toWalletId

      if (!walletId) {
        throw new Error("Wallet id is required")
      }

      super({
        id,
        walletId,
        fromWalletId: fromWalletId ?? null,
        toWalletId: toWalletId ?? null,
        amount,
        type,
        currency: "USD",
        status: "SUCCESS",
        createdAt,
        updatedAt: createdAt,
      })

      return
    }

    const walletId = second
    const type = normalizeTransactionType(
      (typeof fourth === "string" ? fourth : "TRANSFER") as LegacyTransactionType,
    )

    super({
      id,
      walletId,
      fromWalletId: null,
      toWalletId: null,
      amount,
      type,
      currency: "USD",
      status: "SUCCESS",
      createdAt,
      updatedAt: createdAt,
    })
  }
}