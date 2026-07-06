import { DomainEvent } from "./domain-event"
import { EventHandler } from "./event-handler"

export class EventBus {

  private handlers: Map<string, EventHandler[]> = new Map()

  private subscribers: Map<string, Function[]> = new Map()

  register(handler: EventHandler) {

    const handlers = this.handlers.get(handler.eventType) || []

    handlers.push(handler)

    this.handlers.set(handler.eventType, handlers)

  }

  subscribe(eventType: string, callback: (payload: any) => Promise<void> | void) {

    const subs = this.subscribers.get(eventType) || []

    subs.push(callback)

    this.subscribers.set(eventType, subs)

  }

  async publish(event: DomainEvent | string, payload?: any) {

    // support legacy publish
    if (typeof event === "string") {

      const subs = this.subscribers.get(event)

      if (!subs) return

      await Promise.all(
        subs.map(cb => cb(payload))
      )

      return
    }

    // new event system
    const handlers = this.handlers.get(event.type)

    if (handlers) {

      await Promise.all(
        handlers.map(h => h.handle(event))
      )

    }

    // also trigger legacy subscribers
    const subs = this.subscribers.get(event.type)

    if (subs) {

      await Promise.all(
        subs.map(cb => cb(event.payload))
      )

    }

  }

}