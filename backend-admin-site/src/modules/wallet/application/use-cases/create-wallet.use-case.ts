import { Wallet } from "../../domain/aggregates/wallet.aggregate"

export class CreateWalletUseCase {

  constructor(private walletRepo: any) {}

  async execute(userId: string) {

    return this.walletRepo.create({
      userId,
      balance: 0,
      currency: "USD"
    })

  }

}