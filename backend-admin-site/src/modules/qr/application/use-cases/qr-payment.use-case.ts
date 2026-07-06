import type { QrRepository } from "../../domain/repositories/qr.repository";
import { QrSecurityService } from "../services/qr-security.service";

type TransactionRepoLike = {
  create?: (input: Record<string, unknown>) => Promise<unknown>;
  createTransaction?: (input: Record<string, unknown>) => Promise<unknown>;
  transfer?: (input: Record<string, unknown>) => Promise<unknown>;
};

export class QrPaymentUseCase {
  constructor(
    private readonly qrRepository: QrRepository,
    private readonly securityService: QrSecurityService,
    private readonly transactionRepo: TransactionRepoLike,
  ) {}

  async execute(payload: string, payerWalletId: string) {
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

    if (this.transactionRepo.createTransaction) {
      result = await this.transactionRepo.createTransaction(txInput);
    } else if (this.transactionRepo.transfer) {
      result = await this.transactionRepo.transfer(txInput);
    } else if (this.transactionRepo.create) {
      result = await this.transactionRepo.create(txInput);
    }

    await this.qrRepository.markAsUsed(qr.id);

    return result;
  }
}
