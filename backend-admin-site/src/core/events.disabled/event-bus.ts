import { EventBus } from "../../../core/events/event-bus"

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
  register(handler: any): void;
}