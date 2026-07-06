import type { SabiCallEvent } from "../../contracts";
import type { SabiCallRealtimeBroadcasterPort, SabiCallRealtimeTarget } from "../../contracts/sabi-call-realtime.contract";
export class SabiCallRealtimeBroadcaster implements SabiCallRealtimeBroadcasterPort { constructor(private readonly emit: (event: SabiCallEvent, target: SabiCallRealtimeTarget) => void | Promise<void>) {} publish(event: SabiCallEvent, target: SabiCallRealtimeTarget): Promise<void> | void { return this.emit(event, target); } }
