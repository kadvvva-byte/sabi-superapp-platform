export class WalletBalanceEngine {

  async applyDebit(walletId: string, amount: number) {

    console.log(`Wallet ${walletId} debited by ${amount}`)

  }

  async applyCredit(walletId: string, amount: number) {

    console.log(`Wallet ${walletId} credited by ${amount}`)

  }

}