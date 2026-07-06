import { QrOperation } from "../entities/qr-operation";

export interface QrOperationRepository {
  create(operation: QrOperation): Promise<void>;
  findById(id: string): Promise<QrOperation | null>;
  findByReference(reference: string): Promise<QrOperation | null>;
  update(operation: QrOperation): Promise<void>;
}
