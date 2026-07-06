import { DomainEvent } from "@/core/events.disabled/domain-event"

export interface EventHandler<T extends DomainEvent = DomainEvent> {

  handle(event: T): Promise<void>

}