import { createWalletRuntimeService } from "./create-wallet-runtime.service"

export const walletRuntimeSingleton = createWalletRuntimeService()

export const walletRuntime = walletRuntimeSingleton.runtime
export const walletRepositories = walletRuntimeSingleton.repositories