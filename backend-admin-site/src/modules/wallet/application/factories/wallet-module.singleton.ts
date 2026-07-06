import { createWalletCoreModule } from "./create-wallet-core-module"

export const walletCoreModuleSingleton = createWalletCoreModule()

export const walletRuntime = walletCoreModuleSingleton.runtime
export const walletFacade = walletCoreModuleSingleton.facade
export const walletRepositories = walletCoreModuleSingleton.repositories