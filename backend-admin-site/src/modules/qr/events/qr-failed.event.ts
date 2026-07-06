export interface QrFailedEvent {
  type: "qr.failed";
  operationId?: string;
  sessionId?: string;
  reason: string;
  createdAt: string;
}
