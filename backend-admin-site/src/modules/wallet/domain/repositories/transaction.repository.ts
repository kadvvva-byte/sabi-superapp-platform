import { Transaction } from "../entities/transaction"

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>
  save(transaction: Transaction): Promise<void>
  findByWallet(walletId: string): Promise<Transaction[]>
}