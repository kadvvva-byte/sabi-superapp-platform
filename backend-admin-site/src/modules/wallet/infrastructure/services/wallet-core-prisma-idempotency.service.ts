import type { WalletOperationEntitySnapshot } from "../../domain/entities/wallet-operation.entity"
import { WalletCorePrismaQueryService } from "./wallet-core-prisma-query.service"

export type WalletCoreExecutableKind =
  | "business_transfer"
  | "merchant_payment"
  | "merchant_settlement"

export class WalletCorePrismaIdempotencyService {
  constructor(private readonly queryService: WalletCorePrismaQueryService) {}

  normalizeKey(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined
    }

    const normalized = value.trim()

    if (!normalized) {
      return undefined
    }

    return normalized
  }

  composeOperationId(
    kind: WalletCoreExecutableKind,
    idempotencyKey: string
  ): string {
    return `${kind}:${idempotencyKey}`
  }

  async findExistingOperation(
    kind: WalletCoreExecutableKind,
    idempotencyKey: string
  ): Promise<WalletOperationEntitySnapshot | null> {
    const normalizedKey = this.normalizeKey(idempotencyKey)

    if (!normalizedKey) {
      return null
    }

    return this.queryService.getWalletOperationById(
      this.composeOperationId(kind, normalizedKey)
    )
  }
}