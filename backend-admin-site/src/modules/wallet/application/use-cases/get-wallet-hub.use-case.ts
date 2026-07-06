import { CryptoWalletRepository } from "../../domain/repositories/crypto-wallet.repository"
import { CardAccountRepository } from "../../domain/repositories/card-account.repository"
import { CoinWalletRepository } from "../../domain/repositories/coin-wallet.repository"
import { CoinDepositRepository } from "../../domain/repositories/coin-deposit.repository"
import { CoinCreditRepository } from "../../domain/repositories/coin-credit.repository"

type WalletHubCard = Record<string, unknown>
type WalletHubCrypto = Record<string, unknown> | null
type WalletHubCoin = Record<string, unknown> | null
type WalletHubDeposit = Record<string, unknown>
type WalletHubCredit = Record<string, unknown>

type GetWalletHubResult = {
  ownerUserId: string
  cards: WalletHubCard[]
  cryptoWallet: WalletHubCrypto
  coinWallet: WalletHubCoin
  coinDeposits: WalletHubDeposit[]
  coinCredits: WalletHubCredit[]
}

export class GetWalletHubUseCase {
  constructor(
    private readonly cardAccounts: CardAccountRepository,
    private readonly cryptoWallets: CryptoWalletRepository,
    private readonly coinWallets: CoinWalletRepository,
    private readonly coinDeposits: CoinDepositRepository,
    private readonly coinCredits: CoinCreditRepository,
  ) {}

  public async execute(ownerUserId: string): Promise<GetWalletHubResult> {
    const [cards, cryptoWallet, coinWallet] = await Promise.all([
      this.cardAccounts.findByOwnerUserId(ownerUserId),
      this.cryptoWallets.findByOwnerUserId(ownerUserId),
      this.coinWallets.findByOwnerUserId(ownerUserId),
    ])

    const coinDepositList = coinWallet
      ? await this.coinDeposits.findByCoinWalletId(coinWallet.accountId)
      : []

    const coinCreditList = coinWallet
      ? await this.coinCredits.findByCoinWalletId(coinWallet.accountId)
      : []

    return {
      ownerUserId,
      cards: cards.map((card) => card.toJSON()),
      cryptoWallet: cryptoWallet ? cryptoWallet.toJSON() : null,
      coinWallet: coinWallet ? coinWallet.toJSON() : null,
      coinDeposits: coinDepositList.map((deposit) => deposit.toJSON()),
      coinCredits: coinCreditList.map((credit) => credit.toJSON()),
    }
  }
}