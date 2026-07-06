import type { DomainEvent } from "../events/domain-event";
import type { EventHandler } from "../events/event-handler";

export interface EventBusPort {
  publish<TEvent extends DomainEvent>(event: TEvent): Promise<void>;
  publishMany(events: DomainEvent[]): Promise<void>;
  subscribe<TEvent extends DomainEvent>(
    eventName: string,
    handler: EventHandler<TEvent>
  ): void;
}