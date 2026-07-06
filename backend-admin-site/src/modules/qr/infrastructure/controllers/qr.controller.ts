import type { Request, Response } from "express";
import type { ResolveQrRouteUseCase } from "../../application/use-cases/resolve-qr-route.use-case";
import type { ValidateQrUseCase } from "../../application/use-cases/validate-qr.use-case";
import type { ExecuteQrOperationUseCase } from "../../application/use-cases/execute-qr-operation.use-case";
import type { ScanQrUseCase } from "../../application/use-cases/scan-qr.use-case";

export class QrController {
  constructor(
    private readonly resolveQrRouteUseCase: ResolveQrRouteUseCase,
    private readonly validateQrUseCase: ValidateQrUseCase,
    private readonly executeQrOperationUseCase: ExecuteQrOperationUseCase,
    private readonly scanQrUseCase: ScanQrUseCase,
  ) {}

  async resolve(req: Request, res: Response) {
    const output = await this.resolveQrRouteUseCase.execute({
      rawPayload: req.body.rawPayload ?? {},
    });

    res.json(output);
  }

  async validate(req: Request, res: Response) {
    const output = await this.validateQrUseCase.execute({
      signature: req.body.signature,
      expiresAt: req.body.expiresAt,
      strictSignature: Boolean(req.body.strictSignature),
    });

    res.json(output);
  }

  async execute(req: Request, res: Response) {
    const resolved = await this.resolveQrRouteUseCase.execute({
      rawPayload: req.body.rawPayload ?? {},
    });

    const output = await this.executeQrOperationUseCase.execute({
      route: resolved.route,
      payload: resolved.payload,
      actorId: req.body.actorId,
      payerWalletId: req.body.payerWalletId,
      receiverWalletId: req.body.receiverWalletId,
      strictSignature: Boolean(req.body.strictSignature),
      idempotencyKey: req.header("Idempotency-Key") ?? req.body.idempotencyKey,
    });

    res.json(output);
  }

  async scan(req: Request, res: Response) {
    const output = await this.scanQrUseCase.execute({
      rawPayload: String(req.body.rawPayload ?? "{}"),
      actorId: req.body.actorId,
      payerWalletId: req.body.payerWalletId,
      strictSignature: Boolean(req.body.strictSignature),
      idempotencyKey: req.header("Idempotency-Key") ?? req.body.idempotencyKey,
    });

    res.json(output);
  }
}
