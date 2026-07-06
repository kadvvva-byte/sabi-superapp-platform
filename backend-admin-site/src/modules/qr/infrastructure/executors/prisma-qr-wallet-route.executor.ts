import { Prisma, PrismaClient } from "@prisma/client";
import type { QrWalletRouteExecutor } from "../../application/services/qr-wallet-route.executor";
import type {
  QrExecuteWalletRouteInput,
  QrExecuteWalletRouteResult,
} from "../../application/services/qr-module-bridges.service";
import { QrWalletRouteGuardService } from "../../application/services/qr-wallet-route-guard.service";

function makeOperationId(prefix: string, txId: string, side: "debit" | "credit") {
  return `${prefix}:${txId}:${side}`;
}

export class PrismaQrWalletRouteExecutor implements QrWalletRouteExecutor {
  private readonly routeGuardService = new QrWalletRouteGuardService();

  constructor(private readonly prisma: PrismaClient) {}

  async execute(input: QrExecuteWalletRouteInput): Promise<QrExecuteWalletRouteResult> {
    if (!input.payerWalletId || !input.receiverWalletId) {
      return {
        ok: false,
        status: "failed",
        reason: "missing_wallet_route_participants",
      };
    }

    const amount = new Prisma.Decimal(input.amount ?? "0");

    if (amount.lte(0)) {
      return {
        ok: false,
        status: "failed",
        reason: "invalid_qr_amount",
      };
    }

    try {
      const payerWallet = await this.prisma.wallet.findUnique({
        where: { id: input.payerWalletId },
        include: { balance: true },
      });

      const receiverWallet = await this.prisma.wallet.findUnique({
        where: { id: input.receiverWalletId },
        include: { balance: true },
      });

      if (!payerWallet || !receiverWallet) {
        return {
          ok: false,
          status: "failed",
          reason: "wallet_not_found",
        };
      }

      const guard = this.routeGuardService.validate({
        route: input.route,
        payerWalletType: payerWallet.type,
        receiverWalletType: receiverWallet.type,
        payerCurrency: payerWallet.currency,
        receiverCurrency: receiverWallet.currency,
      });

      if (!guard.ok) {
        return {
          ok: false,
          status: "failed",
          reason: guard.reason,
        };
      }

      const currentBalance = payerWallet.balance?.balance ?? new Prisma.Decimal(0);

      if (currentBalance.lt(amount)) {
        return {
          ok: false,
          status: "failed",
          reason: "insufficient_wallet_balance",
        };
      }

      const result = await this.prisma.$transaction(async (tx) => {
        const payerBalanceUpdate = await tx.walletBalance.updateMany({
          where: {
            walletId: input.payerWalletId,
            balance: {
              gte: amount,
            },
          },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });

        if (payerBalanceUpdate.count !== 1) {
          throw new Error("insufficient_wallet_balance");
        }

        await tx.walletBalance.upsert({
          where: { walletId: input.receiverWalletId! },
          update: {
            balance: {
              increment: amount,
            },
          },
          create: {
            walletId: input.receiverWalletId!,
            balance: amount,
          },
        });

        const transaction = await tx.transaction.create({
          data: {
            walletId: input.payerWalletId,
            fromWalletId: input.payerWalletId,
            toWalletId: input.receiverWalletId,
            reference: input.reference,
            amount,
            type:
              input.route === "sabi_merchant_payment"
                ? "PAYMENT"
                : "TRANSFER",
            status: "SUCCESS",
          },
        });

        await tx.ledgerEntry.createMany({
          data: [
            {
              walletId: input.payerWalletId,
              transactionId: transaction.id,
              amount,
              type: "DEBIT",
              operationType: "QR_PAYMENT",
              uniqueOperationId: makeOperationId("qr", transaction.id, "debit"),
            },
            {
              walletId: input.receiverWalletId!,
              transactionId: transaction.id,
              amount,
              type: "CREDIT",
              operationType: "QR_PAYMENT",
              uniqueOperationId: makeOperationId("qr", transaction.id, "credit"),
            },
          ],
        });

        await tx.qrOperation.create({
          data: {
            rail: input.rail,
            domain: "payment",
            payloadType:
              input.route === "coin_receive"
                ? "coin_receive"
                : input.route === "coin_send"
                ? "coin_send"
                : input.route === "sabi_user_transfer"
                ? "user_transfer"
                : "merchant_payment",
            route: input.route,
            payerWalletId: input.payerWalletId,
            receiverWalletId: input.receiverWalletId,
            amount,
            currency: input.currency ?? payerWallet.currency,
            status: "executed",
            reference: input.reference,
            transactionId: transaction.id,
            metadata: {
              rawPayload: input.rawPayload ?? null,
              payerWalletType: payerWallet.type,
              receiverWalletType: receiverWallet.type,
            },
          },
        });

        return transaction;
      });

      return {
        ok: true,
        status: "success",
        transactionId: result.id,
      };
    } catch (error) {
      return {
        ok: false,
        status: "failed",
        reason: error instanceof Error ? error.message : "qr_wallet_execution_failed",
      };
    }
  }
}
