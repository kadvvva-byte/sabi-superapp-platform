import { DomainEvent } from "./domain-event"

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  eventName: string
  handle(event: T): Promise<void>
}

export interface EventDispatcher {
  register(handler: EventHandler): void
  dispatch(event: DomainEvent): Promise<void>
}