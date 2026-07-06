import type { WalletType } from "@prisma/client";
import type { QrExecuteWalletRouteInput } from "./qr-module-bridges.service";

export type QrWalletRouteGuardInput = {
  route: QrExecuteWalletRouteInput["route"];
  payerWalletType: WalletType;
  receiverWalletType: WalletType;
  payerCurrency: string;
  receiverCurrency: string;
};

export type QrWalletRouteGuardResult = {
  ok: boolean;
  reason?: string;
};

export class QrWalletRouteGuardService {
  validate(input: QrWalletRouteGuardInput): QrWalletRouteGuardResult {
    if (input.payerCurrency !== input.receiverCurrency) {
      return {
        ok: false,
        reason: "wallet_currency_mismatch",
      };
    }

    if (input.route === "coin_send" || input.route === "coin_receive") {
      if (input.payerWalletType !== "COIN" || input.receiverWalletType !== "COIN") {
        return {
          ok: false,
          reason: "coin_qr_requires_coin_wallets",
        };
      }

      return { ok: true };
    }

    if (input.route === "sabi_user_transfer") {
      if (input.payerWalletType === "COIN" || input.receiverWalletType === "COIN") {
        return {
          ok: false,
          reason: "sabi_user_transfer_cannot_use_coin_wallet",
        };
      }

      return { ok: true };
    }

    if (input.route === "sabi_merchant_payment") {
      if (input.payerWalletType === "COIN") {
        return {
          ok: false,
          reason: "merchant_qr_cannot_debit_coin_wallet",
        };
      }

      if (input.receiverWalletType === "COIN") {
        return {
          ok: false,
          reason: "merchant_qr_cannot_credit_coin_wallet",
        };
      }

      return { ok: true };
    }

    return {
      ok: false,
      reason: "unsupported_qr_route",
    };
  }
}
