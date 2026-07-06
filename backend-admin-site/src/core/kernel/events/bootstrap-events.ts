import { eventBus } from "../../events/event-bus.instance"

import { TransferNotificationHandler } from "../../../modules/notification/application/handlers/transfer-notification.handler"
import { ActivityHandler } from "../../../modules/activity/application/handlers/activity.handler"
import { RealtimeHandler } from "../../../modules/activity/application/handlers/realtime.handler"
import { MessageRealtimeHandler } from "../../../modules/messenger/application/message-realtime.handler"

let eventsBootstrapped = false

export function bootstrapEvents() {
  if (eventsBootstrapped) return

  eventBus.register(new TransferNotificationHandler())
  eventBus.register(new ActivityHandler())
  eventBus.register(new RealtimeHandler())
  eventBus.register(new MessageRealtimeHandler())

  eventsBootstrapped = true
}