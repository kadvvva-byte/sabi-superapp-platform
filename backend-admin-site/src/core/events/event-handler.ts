import { DomainEvent } from "./domain-event"

export interface EventHandler {
  eventType: string
  handle(event: DomainEvent): Promise<void>
}