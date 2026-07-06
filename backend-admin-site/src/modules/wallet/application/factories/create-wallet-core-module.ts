import { createWalletRuntimeService } from "./create-wallet-runtime.service"
import { WalletCoreFacadeService } from "../services/wallet-core-facade.service"

export type WalletCoreModuleBootstrap =
  ReturnType<typeof createWalletRuntimeService> & {
    facade: WalletCoreFacadeService
  }

export function createWalletCoreModule(): WalletCoreModuleBootstrap {
  const runtimeBootstrap = createWalletRuntimeService()

  const facade = new WalletCoreFacadeService(runtimeBootstrap.runtime)

  return {
    ...runtimeBootstrap,
    facade,
  }
}