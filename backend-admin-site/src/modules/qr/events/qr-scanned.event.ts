export interface QrScannedEvent {
  type: "qr.scanned";
  sessionId: string;
  rawValue: string;
  createdAt: string;
}
