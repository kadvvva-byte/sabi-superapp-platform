import { EventDispatcher, EventHandler } from "./event-dispatcher"
import { DomainEvent } from "./domain-event"

export class InMemoryEventBus implements EventDispatcher {

  private handlers: Map<string, EventHandler[]> = new Map()

  register(handler: EventHandler): void {

    if (!this.handlers.has(handler.eventName)) {
      this.handlers.set(handler.eventName, [])
    }

    this.handlers.get(handler.eventName)!.push(handler)

  }

  async dispatch(event: DomainEvent): Promise<void> {

    const handlers = this.handlers.get(event.eventName) || []

    for (const handler of handlers) {
      await handler.handle(event)
    }

  }

}