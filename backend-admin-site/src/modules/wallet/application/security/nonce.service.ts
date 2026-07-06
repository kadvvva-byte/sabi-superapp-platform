import { Wallet } from "../../domain/aggregates/wallet.aggregate"

export class NonceService {

  verify(wallet: Wallet, nonce: number): void {

    if (nonce !== wallet.nonce + 1) {
      throw new Error("Invalid transaction nonce")
    }

  }

  increment(wallet: Wallet): void {
    wallet.incrementNonce()
  }

}