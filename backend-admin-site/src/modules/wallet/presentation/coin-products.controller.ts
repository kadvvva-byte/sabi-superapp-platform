import { NextFunction, Request, Response } from "express"
import { OpenCoinDepositUseCase } from "../application/use-cases/open-coin-deposit.use-case"
import { AccrueCoinDepositInterestUseCase } from "../application/use-cases/accrue-coin-deposit-interest.use-case"
import { RequestCoinCreditUseCase } from "../application/use-cases/request-coin-credit.use-case"

type CoinProductsControllerDeps = {
  openCoinDeposit: OpenCoinDepositUseCase
  accrueCoinDepositInterest: AccrueCoinDepositInterestUseCase
  requestCoinCredit: RequestCoinCreditUseCase
}

type DepositAccrualParams = {
  depositId: string
}

type OpenCoinDepositBody = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  termMonths: number
}

type RequestCoinCreditBody = {
  coinWalletId: string
  ownerUserId: string
  principalAmount: number
  termMonths: number
}

export class CoinProductsController {
  constructor(private readonly deps: CoinProductsControllerDeps) {}

  public openDeposit = async (
    req: Request<Record<string, never>, unknown, OpenCoinDepositBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.openCoinDeposit.execute({
        coinWalletId: req.body.coinWalletId,
        ownerUserId: req.body.ownerUserId,
        principalAmount: Number(req.body.principalAmount),
        termMonths: Number(req.body.termMonths),
      })

      res.status(201).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public accrueDepositInterest = async (
    req: Request<DepositAccrualParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.accrueCoinDepositInterest.execute({
        depositId: req.params.depositId,
      })

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public requestCredit = async (
    req: Request<Record<string, never>, unknown, RequestCoinCreditBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deps.requestCoinCredit.execute({
        coinWalletId: req.body.coinWalletId,
        ownerUserId: req.body.ownerUserId,
        principalAmount: Number(req.body.principalAmount),
        termMonths: Number(req.body.termMonths),
      })

      res.status(201).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }
}