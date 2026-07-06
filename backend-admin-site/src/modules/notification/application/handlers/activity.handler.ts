import { EventHandler } from "../../../../core/events/event-handler"
import { DomainEvent } from "../../../../core/events/domain-event"
import { EventTypes } from "../../../../core/events/event-types"

export class ActivityHandler implements EventHandler {

  eventType = EventTypes.TRANSFER_CREATED

  async handle(event: DomainEvent): Promise<void> {

    console.log("Activity Feed updated", event.payload)

  }

}