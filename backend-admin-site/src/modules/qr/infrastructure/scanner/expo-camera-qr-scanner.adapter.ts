import { normalizeQrPayload, type QrPayload } from "../../domain/value-objects/qr-payload";

export type RawScanResult = {
  data: string;
  type?: string;
};

export class ExpoCameraQrScannerAdapter {
  parse(raw: RawScanResult): QrPayload {
    const parsed = JSON.parse(raw.data) as Partial<QrPayload>;
    return normalizeQrPayload(parsed);
  }
}
