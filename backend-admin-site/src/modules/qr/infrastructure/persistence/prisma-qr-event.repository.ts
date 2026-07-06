import type { PrismaClient, Prisma } from "@prisma/client";
import type {
  QrEventRepository,
  QrStoredEvent,
} from "../../domain/repositories/qr-event.repository";

function toJsonValue(payload: Record<string, unknown>): Prisma.InputJsonValue {
  return payload as Prisma.InputJsonValue;
}

export class PrismaQrEventRepository implements QrEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async append(event: QrStoredEvent): Promise<void> {
    const eventAny = event as unknown as {
      aggregateId?: string;
      operationId?: string;
      id?: string;
      type: string;
      payload: Record<string, unknown>;
      occurredAt?: Date;
      createdAt?: Date;
    };

    await this.prisma.outboxEvent.create({
      data: {
        aggregateId:
          eventAny.aggregateId ??
          eventAny.operationId ??
          eventAny.id ??
          "qr",
        type: eventAny.type,
        payload: toJsonValue(eventAny.payload),
        processed: false,
        occurredAt:
          eventAny.occurredAt ??
          eventAny.createdAt ??
          new Date(),
      },
    });
  }
}
