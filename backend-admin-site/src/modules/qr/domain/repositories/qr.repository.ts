import { QrCode } from "../entities/qr-code";

export interface QrRepository {
  create(qr: QrCode): Promise<QrCode>;
  findById(id: string): Promise<QrCode | null>;
  findByPayload(payload: string): Promise<QrCode | null>;
  incrementUsage(id: string): Promise<void>;
  markAsUsed(id: string): Promise<void>;
  disable(id: string): Promise<void>;
}
