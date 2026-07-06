import { QrSecurityService } from "../services/qr-security.service";

export type ValidateQrInput = {
  signature?: string;
  expiresAt?: string;
  strictSignature?: boolean;
};

export class ValidateQrUseCase {
  constructor(private readonly securityService: QrSecurityService) {}

  async execute(input: ValidateQrInput) {
    return this.securityService.validate({
      signature: input.signature,
      expiresAt: input.expiresAt,
      strictSignature: input.strictSignature ?? false,
    });
  }
}
