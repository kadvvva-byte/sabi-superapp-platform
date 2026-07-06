import { ResolveQrRouteUseCase } from "./resolve-qr-route.use-case";
import { ExecuteQrOperationUseCase } from "./execute-qr-operation.use-case";

export type ScanQrInput = {
  rawPayload: string;
  actorId?: string;
  payerWalletId?: string;
  strictSignature?: boolean;
  idempotencyKey?: string;
};

export class ScanQrUseCase {
  constructor(
    private readonly resolveQrRouteUseCase: ResolveQrRouteUseCase,
    private readonly executeQrOperationUseCase: ExecuteQrOperationUseCase,
  ) {}

  async execute(input: ScanQrInput) {
    const resolved = await this.resolveQrRouteUseCase.execute({
      rawPayload: input.rawPayload,
    });

    return this.executeQrOperationUseCase.execute({
      route: resolved.route,
      payload: resolved.payload,
      actorId: input.actorId,
      payerWalletId: input.payerWalletId,
      strictSignature: input.strictSignature,
      idempotencyKey: input.idempotencyKey,
    });
  }
}
