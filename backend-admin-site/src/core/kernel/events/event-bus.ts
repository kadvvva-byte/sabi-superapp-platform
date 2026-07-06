import type { DomainEvent } from "./domain-event";
import type { EventHandler } from "./event-handler";
import type { EventBusPort } from "../ports/event-bus.port";

type HandlerMap = Map<string, Set<EventHandler>>;

export class InMemoryEventBus implements EventBusPort {
  private readonly handlers: HandlerMap = new Map();

  public subscribe<TEvent extends DomainEvent>(
    eventName: string,
    handler: EventHandler<TEvent>
  ): void {
    const current = this.handlers.get(eventName) ?? new Set<EventHandler>();
    current.add(handler as EventHandler);
    this.handlers.set(eventName, current);
  }

  public async publish<TEvent extends DomainEvent>(event: TEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName);

    if (!handlers || handlers.size === 0) {
      return;
    }

    for (const handler of handlers) {
      await handler.handle(event);
    }
  }

  public async publishMany(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}