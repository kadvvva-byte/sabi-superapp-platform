import { randomUUID } from "crypto"
import { Wallet } from "../domain/aggregates/wallet.aggregate"

export class WalletRepository {
  private readonly wallets = new Map<string, Wallet>()

  create(userId = "system", currency = "USD"): Wallet {
    const id = randomUUID()
    const wallet = new Wallet(id, userId, 0, currency, 0)
    this.wallets.set(wallet.walletId, wallet)
    return wallet
  }

  findById(walletId: string): Wallet | undefined {
    return this.wallets.get(walletId)
  }

  save(wallet: Wallet): void {
    this.wallets.set(wallet.walletId, wallet)
  }

  findAll(): Wallet[] {
    return Array.from(this.wallets.values())
  }
}