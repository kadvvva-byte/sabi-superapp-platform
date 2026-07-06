export interface QrValidatedEvent {
  type: "qr.validated";
  operationId: string;
  valid: boolean;
  reason?: string;
  createdAt: string;
}
