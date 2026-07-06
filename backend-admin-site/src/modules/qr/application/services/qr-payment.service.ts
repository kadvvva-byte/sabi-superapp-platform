import type { QrRepository } from "../../domain/repositories/qr.repository";
import { QrSecurityService } from "./qr-security.service";
import {
  QrModuleBridgesService,
  type QrExecuteWalletRouteResult,
} from "./qr-module-bridges.service";
import type {
  ResolvedQrPayload,
  ResolvedQrRoute,
} from "./qr-route-resolver.service";

type LegacyTransactionRepo = {
  create?: (input: Record<string, unknown>) => Promise<unknown>;
  createTransaction?: (input: Record<string, unknown>) => Promise<unknown>;
  transfer?: (input: Record<string, unknown>) => Promise<unknown>;
};

type ExecuteResolvedPaymentInput = {
  route: ResolvedQrRoute;
  payload: ResolvedQrPayload;
  actorId?: string;
  payerWalletId?: string;
  receiverWalletId?: string;
  idempotencyKey?: string;
};

function isBridgesService(input: unknown): input is QrModuleBridgesService {
  return !!input && typeof (input as QrModuleBridgesService).executeWalletRoute === "function";
}

export class QrPaymentService {
  private readonly securityService: QrSecurityService;
  private readonly qrRepository?: QrRepository;
  private readonly transactionRepo?: LegacyTransactionRepo;
  private readonly bridgesService?: QrModuleBridgesService;

  constructor(
    first?: QrRepository | QrModuleBridgesService,
    second?: LegacyTransactionRepo,
  ) {
    this.securityService = new QrSecurityService();

    if (isBridgesService(first)) {
      this.bridgesService = first;
      return;
    }

    this.qrRepository = first;
    this.transactionRepo = second;
  }

  async pay(payload: string, payerWalletId: string) {
    if (!this.qrRepository) {
      throw new Error("QrRepository is not connected.");
    }

    const qr = await this.qrRepository.findByPayload(payload);

    if (!qr) {
      throw new Error("QR not found.");
    }

    const validation = this.securityService.validate(qr);

    if (!validation.valid) {
      throw new Error(validation.reason ?? "QR validation failed.");
    }

    if (!qr.amount) {
      throw new Error("QR amount is missing.");
    }

    const txInput = {
      fromWallet: payerWalletId,
      toWallet: qr.merchantId,
      amount: qr.amount,
      currency: qr.currency ?? "USD",
      reference: qr.payload.reference,
    };

    let result: unknown = {
      status: "success",
      transactionId: `qr:${qr.id}:${Date.now()}`,
    };

    if (this.transactionRepo?.createTransaction) {
      result = await this.transactionRepo.createTransaction(txInput);
    } else if (this.transactionRepo?.transfer) {
      result = await this.transactionRepo.transfer(txInput);
    } else if (this.transactionRepo?.create) {
      result = await this.transactionRepo.create(txInput);
    }

    await this.qrRepository.markAsUsed(qr.id);

    return result;
  }

  async executeResolvedPayment(
    input: ExecuteResolvedPaymentInput,
  ): Promise<QrExecuteWalletRouteResult> {
    if (!this.bridgesService) {
      return {
        ok: false,
        status: "failed",
        reason: "qr_bridges_service_not_connected",
      };
    }

    return this.bridgesService.withIdempotency(input.idempotencyKey, async () => {
      return this.bridgesService!.executeWalletRoute({
        rail: input.payload.rail,
        route: input.route,
        payerWalletId: input.payerWalletId,
        receiverWalletId: input.receiverWalletId ?? input.payload.destinationId,
        amount: input.payload.amount,
        currency: input.payload.currency,
        reference: input.payload.reference,
        rawPayload: JSON.stringify(input.payload),
      });
    });
  }
}
