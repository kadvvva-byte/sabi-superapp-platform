export class WalletKernelModule {
  public readonly name = "wallet"

  private initialized = false

  public async init(): Promise<void> {
    this.initialized = true
  }

  public async dispose(): Promise<void> {
    this.initialized = false
  }

  public isInitialized(): boolean {
    return this.initialized
  }
}