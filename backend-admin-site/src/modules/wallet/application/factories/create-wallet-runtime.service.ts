import { WalletRuntimeService } from "../services/wallet-runtime.service"

import { InMemoryBusinessWalletRepository } from "../../infrastructure/repositories/in-memory-business-wallet.repository"
import { InMemoryMerchantWalletRepository } from "../../infrastructure/repositories/in-memory-merchant-wallet.repository"
import { InMemoryWalletOperationRepository } from "../../infrastructure/repositories/in-memory-wallet-operation.repository"

export type WalletRuntimeServiceBootstrap = {
  runtime: WalletRuntimeService
  repositories: {
    businessWalletRepository: InMemoryBusinessWalletRepository
    merchantWalletRepository: InMemoryMerchantWalletRepository
    walletOperationRepository: InMemoryWalletOperationRepository
  }
}

export function createWalletRuntimeService(): WalletRuntimeServiceBootstrap {
  const businessWalletRepository = new InMemoryBusinessWalletRepository()
  const merchantWalletRepository = new InMemoryMerchantWalletRepository()
  const walletOperationRepository = new InMemoryWalletOperationRepository()

  const runtime = new WalletRuntimeService({
    businessWalletRepository,
    merchantWalletRepository,
    walletOperationRepository,
  })

  return {
    runtime,
    repositories: {
      businessWalletRepository,
      merchantWalletRepository,
      walletOperationRepository,
    },
  }
}