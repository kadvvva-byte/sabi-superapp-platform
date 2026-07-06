import { NextFunction, Request, Response } from "express"
import { GetWalletHubUseCase } from "../application/use-cases/get-wallet-hub.use-case"
import { ListCardAccountsUseCase } from "../application/use-cases/list-card-accounts.use-case"
import { GetCryptoWalletUseCase } from "../application/use-cases/get-crypto-wallet.use-case"
import { GetCoinWalletUseCase } from "../application/use-cases/get-coin-wallet.use-case"

type WalletHubControllerDeps = {
  getWalletHub: GetWalletHubUseCase
  listCardAccounts: ListCardAccountsUseCase
  getCryptoWallet: GetCryptoWalletUseCase
  getCoinWallet: GetCoinWalletUseCase
}

type OwnerParams = {
  ownerUserId: string
}

export class WalletHubController {
  constructor(private readonly deps: WalletHubControllerDeps) {}

  public getHub = async (
    req: Request<OwnerParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.getWalletHub.execute(req.params.ownerUserId)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public listCards = async (
    req: Request<OwnerParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.listCardAccounts.execute(req.params.ownerUserId)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public getCryptoWallet = async (
    req: Request<OwnerParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.getCryptoWallet.execute(req.params.ownerUserId)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public getCoinWallet = async (
    req: Request<OwnerParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.getCoinWallet.executeByOwner(req.params.ownerUserId)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }
}