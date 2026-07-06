import { Wallet } from "../../domain/aggregates/wallet.aggregate"

export class BalanceVerificationService {

  verify(wallet: Wallet, amount: number): void {

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance")
    }

  }

}