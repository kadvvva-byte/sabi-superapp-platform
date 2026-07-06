import { QrGeneratorService } from "../services/qr-generator.service"

export class GenerateStaticQrUseCase {

  constructor(
    private qrGenerator: QrGeneratorService
  ) {}

  execute(payload: string): string {

    return this.qrGenerator.generate(payload)

  }

}