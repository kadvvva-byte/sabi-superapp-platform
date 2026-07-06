import { EventHandler } from "../../../../core/events/event-handler"
import { DomainEvent } from "../../../../core/events/domain-event"
import { EventTypes } from "../../../../core/events/event-types"
import { websocketServer } from "../../../../core/realtime/websocket.server"

export class RealtimeHandler implements EventHandler {

  eventType = EventTypes.TRANSFER_CREATED

  async handle(event: DomainEvent): Promise<void> {

    const { toUserId } = event.payload

    if (!websocketServer) return

    websocketServer.to(toUserId).emit("event", {
      type: event.type,
      payload: event.payload
    })

  }

}