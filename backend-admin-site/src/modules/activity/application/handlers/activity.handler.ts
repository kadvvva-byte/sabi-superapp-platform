import { EventHandler } from "../../../../core/events/event-handler"
import { DomainEvent } from "../../../../core/events/domain-event"
import { EventTypes } from "../../../../core/events/event-types"

export class ActivityHandler implements EventHandler {

  eventType = EventTypes.TRANSFER_CREATED

  async handle(event: DomainEvent): Promise<void> {

    const { fromUserId, toUserId, amount } = event.payload

    console.log("Activity event:", {
      fromUserId,
      toUserId,
      amount,
      type: event.type
    })

    // здесь позже будет:
    // запись в activity feed
    // уведомления
    // аналитика

  }

}