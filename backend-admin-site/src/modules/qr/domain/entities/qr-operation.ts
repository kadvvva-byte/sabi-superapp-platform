import type {
  QrOperationStatus,
  QrPayloadType,
  QrRail,
  QrRouteResolution,
} from "../constants/qr-types";

export class QrOperation {
  constructor(
    public readonly id: string,
    public readonly rail: QrRail,
    public readonly route: QrRouteResolution,
    public readonly payloadType: QrPayloadType,
    public status: QrOperationStatus = "created",
    public readonly actorId?: string,
    public readonly payerWalletId?: string,
    public readonly receiverWalletId?: string,
    public readonly amount?: string,
    public readonly currency?: string,
    public readonly reference?: string,
    public readonly transactionId?: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
