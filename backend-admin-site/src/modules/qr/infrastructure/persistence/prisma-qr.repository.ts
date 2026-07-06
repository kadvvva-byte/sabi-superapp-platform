import type { PrismaClient } from "@prisma/client";
import { QrCode } from "../../domain/entities/qr-code";
import type { QrRepository } from "../../domain/repositories/qr.repository";
import { QrMapper } from "../mappers/qr.mapper";

export class PrismaQrRepository implements QrRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(qr: QrCode): Promise<QrCode> {
    const walletId =
      (qr as any).walletId ??
      ((qr.payload.metadata as Record<string, unknown> | undefined)?.walletId as string | undefined);

    if (!walletId) {
      throw new Error("QrCode.walletId is required to persist QR records.");
    }

    const data: any = {
      ...QrMapper.toCreateInput(qr),
      walletId,
    };

    const created = await this.prisma.qr.create({ data });
    return QrMapper.toDomain(created);
  }

  async findById(id: string): Promise<QrCode | null> {
    const found = await this.prisma.qr.findUnique({
      where: { id },
    });

    return found ? QrMapper.toDomain(found) : null;
  }

  async findByPayload(payload: string): Promise<QrCode | null> {
    const found = await this.prisma.qr.findFirst({
      where: { payload },
      orderBy: { createdAt: "desc" },
    });

    return found ? QrMapper.toDomain(found) : null;
  }

  async incrementUsage(id: string): Promise<void> {
    await this.prisma.qr.update({
      where: { id },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  async markAsUsed(id: string): Promise<void> {
    await this.incrementUsage(id);
  }

  async disable(id: string): Promise<void> {
    await this.prisma.qr.update({
      where: { id },
      data: { status: "DISABLED" },
    });
  }
}
