import type { DomainEvent } from "@/core/kernel"

export interface EventBusPort {
  publish(event: DomainEvent | DomainEvent[]): Promise<void>
  publishMany?(events: DomainEvent[]): Promise<void>
}