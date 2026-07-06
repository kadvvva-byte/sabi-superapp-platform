import { QrGeneratorService } from "../services/qr-generator.service"

export class GenerateDynamicQrUseCase {
  constructor(private qrGenerator: QrGeneratorService) {}

  execute(payload: string): string {
    return this.qrGenerator.generate(payload)
  }
}