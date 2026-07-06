import type { DomainEvent } from "@/core/kernel"
import type { EventBusPort } from "../ports/event-bus.port"

type DomainEventSource = {
  pullDomainEvents(): DomainEvent[]
}

function isDomainEventArray(value: unknown): value is DomainEvent[] {
  return Array.isArray(value)
}

function isDomainEventSource(value: unknown): value is DomainEventSource {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as DomainEventSource).pullDomainEvents === "function"
  )
}

export class WalletEventHandler {
  constructor(private readonly eventBus: EventBusPort) {}

  public async handle(
    input: DomainEvent | DomainEvent[] | DomainEventSource,
  ): Promise<void> {
    if (isDomainEventSource(input)) {
      const events = input.pullDomainEvents()

      if (events.length === 0) {
        return
      }

      await this.eventBus.publish(events)
      return
    }

    if (isDomainEventArray(input)) {
      if (input.length === 0) {
        return
      }

      await this.eventBus.publish(input)
      return
    }

    await this.eventBus.publish(input)
  }

  public async publish(
    input: DomainEvent | DomainEvent[],
  ): Promise<void> {
    await this.handle(input)
  }

  public async publishFromAggregate(
    aggregate: DomainEventSource,
  ): Promise<void> {
    await this.handle(aggregate)
  }
}