import { Router, Request, Response } from "express";
import { walletService } from "../application/wallet.service";
import { QRPaymentService } from "../application/qr-payment.service"

export const walletRouter = Router();

walletRouter.post("/create", (req: Request, res: Response) => {

  const wallet = walletService.createWallet();

  res.json({
    message: "wallet created",
    wallet
  });

});

walletRouter.post("/:walletId/deposit", (req: Request, res: Response) => {

  const walletId = req.params.walletId as string;
  const { amount } = req.body;

  const wallet = walletService.deposit(walletId, amount);

  res.json({
    message: "deposit successful",
    wallet
  });

});

walletRouter.post("/:walletId/withdraw", (req: Request, res: Response) => {

  const walletId = req.params.walletId as string;
  const { amount } = req.body;

  const wallet = walletService.withdraw(walletId, amount);

  res.json({
    message: "withdraw successful",
    wallet
  });

});

walletRouter.post("/transfer", (req: Request, res: Response) => {

  const { fromWalletId, toWalletId, amount } = req.body;

  const result = walletService.transfer(fromWalletId, toWalletId, amount);

  res.json({
    message: "transfer successful",
    result
  });

});

walletRouter.get("/:walletId/transactions", (req: Request, res: Response) => {

  const walletId = req.params.walletId as string;

  const data = walletService.getTransactions(walletId);

  res.json(data);

});