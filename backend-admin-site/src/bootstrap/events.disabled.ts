import { EventBus } from "../core/events/event-bus"
import { RealtimeHandler } from "../core/realtime/realtime.handler"

const eventBus = new EventBus()

new RealtimeHandler(eventBus)