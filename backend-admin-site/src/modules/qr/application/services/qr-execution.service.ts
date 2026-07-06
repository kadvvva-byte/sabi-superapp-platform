import { QrModuleBridgesService } from "./qr-module-bridges.service";
import { QrPaymentService } from "./qr-payment.service";

export type ExecuteQrRouteInput = {
  rail: "sabi_wallet" | "coin_wallet";
  route: "sabi_merchant_payment" | "sabi_user_transfer" | "coin_send" | "coin_receive";
  payerWalletId?: string;
  receiverWalletId?: string;
  amount?: string;
  currency?: string;
  reference?: string;
  actorId?: string;
  idempotencyKey?: string;
  rawPayload?: string;
};

export class QrExecutionService {
  private readonly paymentService: QrPaymentService;

  constructor(private readonly bridgesService: QrModuleBridgesService) {
    this.paymentService = new QrPaymentService(bridgesService);
  }

  async execute(input: ExecuteQrRouteInput) {
    return this.bridgesService.withIdempotency(input.idempotencyKey, async () => {
      await this.bridgesService.publishEvent("qr.execution.requested", {
        rail: input.rail,
        route: input.route,
        reference: input.reference,
      });

      const result = await this.paymentService.executeResolvedPayment({
        route: input.route,
        payload: {
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
          destinationId: input.receiverWalletId ?? "",
          amount: input.amount,
          currency: input.currency,
          reference: input.reference,
        },
        actorId: input.actorId,
        payerWalletId: input.payerWalletId,
        receiverWalletId: input.receiverWalletId,
        idempotencyKey: input.idempotencyKey,
      });

      await this.bridgesService.publishRealtime("qr", result.ok ? "qr.executed" : "qr.failed", {
        rail: input.rail,
        route: input.route,
        transactionId: result.transactionId,
        reason: result.reason,
      });

      await this.bridgesService.recordActivity({
        userId: input.actorId,
        type: result.ok ? "qr_operation_executed" : "qr_operation_failed",
        data: {
          rail: input.rail,
          route: input.route,
          transactionId: result.transactionId,
          reason: result.reason,
        },
      });

      if (input.actorId) {
        await this.bridgesService.pushNotification({
          userId: input.actorId,
          title: result.ok ? "QR operation completed" : "QR operation failed",
          body: result.ok
            ? `Transaction ${result.transactionId ?? "created"} finished successfully.`
            : `QR operation failed${result.reason ? `: ${result.reason}` : "."}`,
          data: {
            rail: input.rail,
            route: input.route,
            transactionId: result.transactionId,
          },
        });
      }

      return result;
    });
  }
}
