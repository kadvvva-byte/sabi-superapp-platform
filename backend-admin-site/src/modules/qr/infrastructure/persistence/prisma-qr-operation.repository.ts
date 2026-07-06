import type { PrismaClient } from "@prisma/client";
import type { QrOperationRepository } from "../../domain/repositories/qr-operation.repository";
import type { QrOperation } from "../../domain/entities/qr-operation";

export class PrismaQrOperationRepository implements QrOperationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(operation: QrOperation): Promise<void> {
    await this.prisma.qrOperation.create({
      data: {
        id: operation.id,
        rail: operation.rail,
        route: operation.route,
        payloadType: operation.payloadType,
        actorUserId: operation.actorId,
        payerWalletId: operation.payerWalletId,
        receiverWalletId: operation.receiverWalletId,
        amount: operation.amount ? Number(operation.amount) : undefined,
        currency: operation.currency,
        reference: operation.reference,
        status: operation.status,
        transactionId: operation.transactionId,
        createdAt: operation.createdAt,
      },
    });
  }

  async findById(id: string): Promise<QrOperation | null> {
    const found = await this.prisma.qrOperation.findUnique({
      where: { id },
    });

    if (!found) return null;

    return {
      id: found.id,
      rail: found.rail as QrOperation["rail"],
      route: found.route as QrOperation["route"],
      payloadType: found.payloadType as QrOperation["payloadType"],
      status: found.status as QrOperation["status"],
      actorId: found.actorUserId ?? undefined,
      payerWalletId: found.payerWalletId ?? undefined,
      receiverWalletId: found.receiverWalletId ?? undefined,
      amount: found.amount != null ? String(found.amount) : undefined,
      currency: found.currency ?? undefined,
      reference: found.reference ?? undefined,
      transactionId: found.transactionId ?? undefined,
      createdAt: found.createdAt,
    } as QrOperation;
  }

  async findByReference(reference: string): Promise<QrOperation | null> {
    const found = await this.prisma.qrOperation.findFirst({
      where: { reference },
      orderBy: { createdAt: "desc" },
    });

    if (!found) return null;

    return {
      id: found.id,
      rail: found.rail as QrOperation["rail"],
      route: found.route as QrOperation["route"],
      payloadType: found.payloadType as QrOperation["payloadType"],
      status: found.status as QrOperation["status"],
      actorId: found.actorUserId ?? undefined,
      payerWalletId: found.payerWalletId ?? undefined,
      receiverWalletId: found.receiverWalletId ?? undefined,
      amount: found.amount != null ? String(found.amount) : undefined,
      currency: found.currency ?? undefined,
      reference: found.reference ?? undefined,
      transactionId: found.transactionId ?? undefined,
      createdAt: found.createdAt,
    } as QrOperation;
  }

  async update(operation: QrOperation): Promise<void> {
    await this.prisma.qrOperation.update({
      where: { id: operation.id },
      data: {
        status: operation.status,
        transactionId: operation.transactionId,
        payerWalletId: operation.payerWalletId,
        receiverWalletId: operation.receiverWalletId,
        amount: operation.amount ? Number(operation.amount) : undefined,
        currency: operation.currency,
        reference: operation.reference,
      },
    });
  }
}
