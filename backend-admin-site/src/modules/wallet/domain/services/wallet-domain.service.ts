import { Wallet } from "../aggregates/wallet.aggregate"

export class WalletDomainService {

  canWithdraw(wallet: Wallet, amount: number): boolean {
    return wallet.balance >= amount
  }

}