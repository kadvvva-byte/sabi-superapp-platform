import { QrExecutionService } from "../services/qr-execution.service";
import { ValidateQrUseCase } from "./validate-qr.use-case";
import {
  type ResolvedQrRoute,
  type ResolvedQrPayload,
} from "../services/qr-route-resolver.service";

export type ExecuteQrOperationInput = {
  route: ResolvedQrRoute;
  payload: ResolvedQrPayload;
  actorId?: string;
  payerWalletId?: string;
  receiverWalletId?: string;
  strictSignature?: boolean;
  idempotencyKey?: string;
};

export class ExecuteQrOperationUseCase {
  constructor(
    private readonly validateQrUseCase: ValidateQrUseCase,
    private readonly executionService: QrExecutionService,
  ) {}

  async execute(input: ExecuteQrOperationInput) {
    const validation = await this.validateQrUseCase.execute({
      signature: input.payload.signature,
      expiresAt: input.payload.expiresAt,
      strictSignature: input.strictSignature,
    });

    if (!validation.valid) {
      return {
        ok: false,
        status: "failed" as const,
        reason: validation.reason,
      };
    }

    return this.executionService.execute({
      rail: input.payload.rail,
      route: input.route,
      payerWalletId: input.payerWalletId,
      receiverWalletId: input.receiverWalletId ?? input.payload.destinationId,
      amount: input.payload.amount,
      currency: input.payload.currency,
      reference: input.payload.reference,
      rawPayload: JSON.stringify(input.payload),
      actorId: input.actorId,
      idempotencyKey: input.idempotencyKey,
    });
  }
}
