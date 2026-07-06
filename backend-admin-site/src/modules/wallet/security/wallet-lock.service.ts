export class WalletLockService {

  private locks = new Map<string, boolean>()

  async acquire(walletId: string): Promise<void> {

    while (this.locks.get(walletId)) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    this.locks.set(walletId, true)

  }

  release(walletId: string): void {
    this.locks.delete(walletId)
  }

}