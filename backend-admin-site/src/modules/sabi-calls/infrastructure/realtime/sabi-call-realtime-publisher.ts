import type { Server } from "socket.io";
import type { SabiCallEventKind } from "../../contracts";
export class SabiCallRealtimeSocketPublisher {
  constructor(private readonly io: Server | null) {}
  async publishToUsers<TPayload>(event: { event: SabiCallEventKind; callId: string; targetUserIds: string[]; payload: TPayload }): Promise<void> {
    if (!this.io) return;
    for (const userId of event.targetUserIds) this.io.to(`user:${userId}`).emit(event.event, event.payload);
    this.io.to(`call:${event.callId}`).emit(event.event, event.payload);
  }
}
