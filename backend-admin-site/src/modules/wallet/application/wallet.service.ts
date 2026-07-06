import { WalletRepository } from "../infrastructure/wallet.repository"
import { TransactionRepository } from "../infrastructure/transaction.repository"
import { Transaction } from "../domain/transaction.entity"
import { randomUUID } from "crypto"
import { LedgerService } from "./security/ledger.service"

const walletRepository = new WalletRepository()
const transactionRepository = new TransactionRepository()
const ledgerService = new LedgerService()

export const walletService = {
  createWallet(userId = "system", currency = "USD") {
    return walletRepository.create(userId, currency)
  },

  deposit(walletId: string, amount: number) {
    const wallet = walletRepository.findById(walletId)

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    const money = {
      amount,
      currency: wallet.currency,
    } as Parameters<typeof wallet.deposit>[0]

    wallet.deposit(money)
    walletRepository.save(wallet)

    const tx = new Transaction(
      randomUUID(),
      "deposit",
      amount,
      undefined,
      walletId,
    )

    transactionRepository.save(tx)

    ledgerService.recordTransaction(walletId, amount, "credit")

    return wallet
  },

  withdraw(walletId: string, amount: number) {
    const wallet = walletRepository.findById(walletId)

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    const money = {
      amount,
      currency: wallet.currency,
    } as Parameters<typeof wallet.withdraw>[0]

    wallet.withdraw(money)
    walletRepository.save(wallet)

    const tx = new Transaction(
      randomUUID(),
      "withdraw",
      amount,
      walletId,
      undefined,
    )

    transactionRepository.save(tx)

    ledgerService.recordTransaction(walletId, amount, "debit")

    return wallet
  },

  transfer(fromWalletId: string, toWalletId: string, amount: number) {
    const fromWallet = walletRepository.findById(fromWalletId)
    const toWallet = walletRepository.findById(toWalletId)

    if (!fromWallet || !toWallet) {
      throw new Error("Wallet not found")
    }

    const debitMoney = {
      amount,
      currency: fromWallet.currency,
    } as Parameters<typeof fromWallet.withdraw>[0]

    const creditMoney = {
      amount,
      currency: toWallet.currency,
    } as Parameters<typeof toWallet.deposit>[0]

    fromWallet.withdraw(debitMoney)
    toWallet.deposit(creditMoney)

    walletRepository.save(fromWallet)
    walletRepository.save(toWallet)

    const tx = new Transaction(
      randomUUID(),
      "transfer",
      amount,
      fromWalletId,
      toWalletId,
    )

    transactionRepository.save(tx)

    ledgerService.recordTransaction(fromWalletId, amount, "debit")
    ledgerService.recordTransaction(toWalletId, amount, "credit")

    return {
      fromWallet,
      toWallet,
    }
  },

  getTransactions(walletId: string) {
    return transactionRepository.findByWallet(walletId)
  },
}