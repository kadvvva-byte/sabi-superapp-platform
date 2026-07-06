import { Wallet } from "../../domain/aggregates/wallet.aggregate"

export class WalletMapper {

  static toDomain(prismaWallet: any): Wallet {

    return new Wallet(
      prismaWallet.id,
      prismaWallet.userId,
      Number(prismaWallet.balance),
      prismaWallet.currency,
      prismaWallet.nonce
    )

  }

}