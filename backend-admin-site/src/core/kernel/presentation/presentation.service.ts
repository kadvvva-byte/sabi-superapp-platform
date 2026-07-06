import { randomUUID } from "crypto";
import type {
  PresentationDeviceType,
  PresentationSourceType,
  PresentationTransportType,
} from "./presentation.types";

export class PresentationFoundationService {
  private readonly devices: Array<Record<string, unknown>> = [];
  private readonly sessions: Array<Record<string, unknown>> = [];

  readonly capabilities = {
    transports: ["wifi", "webrtc", "chromecast", "miracast", "airplay", "dlna", "hdmi"],
    sourceTypes: ["screen", "app", "video_call", "camera", "photo", "file", "browser_tab"],
    deviceTypes: ["mobile", "tablet", "web", "desktop", "laptop", "tv", "monitor", "projector"],
    callPresentation: true,
  } as const;

  registerDevice(input: {
    ownerUserId: string;
    name: string;
    deviceType: PresentationDeviceType;
    transport: PresentationTransportType;
    identifier: string;
    metadata?: Record<string, unknown>;
  }) {
    const record = {
      id: randomUUID(),
      ownerUserId: input.ownerUserId,
      name: input.name,
      deviceType: input.deviceType,
      transport: input.transport,
      identifier: input.identifier,
      metadata: input.metadata,
      createdAt: new Date().toISOString(),
    };

    this.devices.unshift(record);
    return record;
  }

  listDevices(ownerUserId?: string) {
    return this.devices.filter((device) =>
      ownerUserId ? device.ownerUserId === ownerUserId : true,
    );
  }

  startSession(input: {
    ownerUserId: string;
    deviceId?: string;
    callSessionId?: string;
    sourceType: PresentationSourceType;
    transport: PresentationTransportType;
    sourceDeviceType: PresentationDeviceType;
    sourceLabel: string;
    metadata?: Record<string, unknown>;
  }) {
    const record = {
      id: randomUUID(),
      ownerUserId: input.ownerUserId,
      deviceId: input.deviceId,
      callSessionId: input.callSessionId,
      sourceType: input.sourceType,
      transport: input.transport,
      sourceDeviceType: input.sourceDeviceType,
      sourceLabel: input.sourceLabel,
      metadata: input.metadata,
      status: "presenting",
      startedAt: new Date().toISOString(),
    };

    this.sessions.unshift(record);
    return record;
  }

  listSessions(ownerUserId?: string) {
    return this.sessions.filter((session) =>
      ownerUserId ? session.ownerUserId === ownerUserId : true,
    );
  }

  stopSession(sessionId: string) {
    const session = this.sessions.find((item) => item.id === sessionId);

    if (!session) {
      return null;
    }

    session.status = "ended";
    session.endedAt = new Date().toISOString();
    return session;
  }
}
