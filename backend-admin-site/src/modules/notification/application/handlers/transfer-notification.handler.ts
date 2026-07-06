import { EventHandler } from "core/events/event-handler"
import { DomainEvent } from "core/events/domain-event"
import { EventTypes } from "core/events/event-types"

export class TransferNotificationHandler implements EventHandler {

  eventType = EventTypes.TRANSFER_CREATED

  async handle(event: DomainEvent): Promise<void> {

    const { toUserId, amount } = event.payload

    console.log(`Notification → User ${toUserId} received ${amount}`)

  }

}