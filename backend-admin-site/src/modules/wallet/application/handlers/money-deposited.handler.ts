import type { DomainEvent } from "@/core/kernel"
import type { LoggerPort } from "../ports/logger.port"

type MoneyDepositedPayload = {
  walletId?: string
  amount?: number | string
  currency?: string
  transactionId?: string
  userId?: string
  [key: string]: unknown
}

export class MoneyDepositedHandler {
  constructor(private readonly logger: LoggerPort) {}

  public async handle(
    event: DomainEvent<MoneyDepositedPayload>,
  ): Promise<void> {
    this.logger.log("Money deposited", {
      eventName: event.eventName,
      aggregateId: event.aggregateId ?? null,
      occurredAt: event.occurredAt.toISOString(),
      payload: event.payload,
    })
  }
}