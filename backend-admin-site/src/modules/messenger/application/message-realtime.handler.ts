import { EventHandler } from "core/events/event-handler";
import { DomainEvent } from "core/events/domain-event";
import { EventTypes } from "core/events/event-types";
import { emitUserRealtime } from "core/realtime/realtime.emitter";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export class MessageRealtimeHandler implements EventHandler {
  eventType = EventTypes.MESSAGE_SENT;

  async handle(event: DomainEvent): Promise<void> {
    const payload =
      event && typeof event === "object" && event.payload && typeof event.payload === "object"
        ? (event.payload as Record<string, unknown>)
        : {};

    const toUserId = normalizeString(payload.toUserId);
    const message = payload.message;

    if (!toUserId || !message) {
      return;
    }

    emitUserRealtime(toUserId, "message:new", message);
    emitUserRealtime(toUserId, "new_message", message);
    emitUserRealtime(toUserId, "chat:message", message);
    emitUserRealtime(toUserId, "chat:message:new", message);
  }
}