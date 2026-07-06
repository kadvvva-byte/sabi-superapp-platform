import { randomUUID } from "crypto";
import type {
  StreamRuntimeEvent,
  StreamRuntimeModerationReport,
  StreamRuntimeParticipant,
  StreamRuntimeParticipantRole,
  StreamRuntimeRealtimeGate,
  StreamRuntimeRecordingGate,
  StreamRuntimeRoom,
  StreamRuntimeRoomMode,
  StreamRuntimeRoomStatus,
  StreamRuntimeSafety,
} from "./streamRuntimeFoundation.types";

const safety: StreamRuntimeSafety = {
  providerStatus: "provider_not_configured",
  providerSafeDisabled: true,
  databaseMode: "memory_only_until_schema_stage",
  fakeLiveAllowed: false,
  providerCallAllowed: false,
  mediaRoomCreationAllowed: false,
  realtimeGatewayStartAllowed: false,
  recordingStartAllowed: false,
  walletMutationAllowed: false,
  moneyMovementAllowed: false,
};

function now(): string {
  return new Date().toISOString();
}

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function mode(value: unknown): StreamRuntimeRoomMode {
  return value === "single" || value === "group" || value === "battle" || value === "audio" || value === "video" || value === "business"
    ? value
    : "single";
}

function role(value: unknown): StreamRuntimeParticipantRole {
  return value === "host" || value === "cohost" || value === "guest" || value === "viewer" || value === "moderator"
    ? value
    : "viewer";
}

function validStatus(value: unknown): value is StreamRuntimeRoomStatus {
  return value === "draft" || value === "scheduled" || value === "live" || value === "paused" || value === "ended" || value === "blocked";
}

export class StreamRuntimeFoundationService {
  private readonly rooms = new Map<string, StreamRuntimeRoom>();
  private readonly participants = new Map<string, StreamRuntimeParticipant>();
  private readonly events: StreamRuntimeEvent[] = [];
  private readonly reports: StreamRuntimeModerationReport[] = [];

  createRoom(input: Record<string, unknown>): StreamRuntimeRoom {
    const timestamp = now();
    const hostUserId = text(input.hostUserId, "host_required_before_production");

    const room: StreamRuntimeRoom = {
      id: randomUUID(),
      title: text(input.title, "Untitled Stream"),
      hostUserId,
      mode: mode(input.mode),
      status: "draft",
      category: optionalText(input.category),
      country: optionalText(input.country),
      language: optionalText(input.language),
      businessProductId: optionalText(input.businessProductId),
      createdAt: timestamp,
      updatedAt: timestamp,
      safety,
    };

    this.rooms.set(room.id, room);

    const hostParticipant: StreamRuntimeParticipant = {
      id: randomUUID(),
      roomId: room.id,
      userId: hostUserId,
      role: "host",
      state: "active",
      joinedAt: timestamp,
    };

    this.participants.set(hostParticipant.id, hostParticipant);
    this.event(room.id, "room_created", hostUserId, { mode: room.mode });
    return room;
  }

  listRooms(): StreamRuntimeRoom[] {
    return Array.from(this.rooms.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getRoom(roomId: string): StreamRuntimeRoom | undefined {
    return this.rooms.get(roomId);
  }

  getParticipants(roomId: string): StreamRuntimeParticipant[] {
    return Array.from(this.participants.values()).filter((item) => item.roomId === roomId);
  }

  listEvents(roomId?: string): StreamRuntimeEvent[] {
    const events = roomId ? this.events.filter((item) => item.roomId === roomId) : this.events;
    return events.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  listModerationReports(roomId?: string): StreamRuntimeModerationReport[] {
    const reports = roomId ? this.reports.filter((item) => item.roomId === roomId) : this.reports;
    return reports.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  joinRoom(roomId: string, input: Record<string, unknown>): StreamRuntimeParticipant {
    const room = this.requireRoom(roomId);
    if (room.status === "ended" || room.status === "blocked") throw new Error("stream_room_not_joinable");

    const participant: StreamRuntimeParticipant = {
      id: randomUUID(),
      roomId,
      userId: text(input.userId, "user_required_before_production"),
      role: role(input.role),
      state: "active",
      joinedAt: now(),
    };

    this.participants.set(participant.id, participant);
    this.event(roomId, "participant_joined", participant.userId, { role: participant.role });
    return participant;
  }

  leaveRoom(roomId: string, input: Record<string, unknown>): StreamRuntimeParticipant {
    this.requireRoom(roomId);
    const userId = text(input.userId, "");
    const current = Array.from(this.participants.values()).find((item) => item.roomId === roomId && item.userId === userId && item.state === "active");
    if (!current) throw new Error("stream_participant_not_found");

    const next: StreamRuntimeParticipant = { ...current, state: "left", leftAt: now() };
    this.participants.set(current.id, next);
    this.event(roomId, "participant_left", userId, {});
    return next;
  }

  removeParticipant(roomId: string, input: Record<string, unknown>): StreamRuntimeParticipant {
    this.requireRoom(roomId);
    const userId = optionalText(input.userId);
    const participantId = optionalText(input.participantId);
    const current = Array.from(this.participants.values()).find((item) =>
      item.roomId === roomId &&
      item.state === "active" &&
      ((participantId && item.id === participantId) || (userId && item.userId === userId))
    );

    if (!current) throw new Error("stream_participant_not_found");

    const actorUserId = optionalText(input.actorUserId);
    const next: StreamRuntimeParticipant = {
      ...current,
      state: "removed",
      removedAt: now(),
      removedByUserId: actorUserId,
      removeReason: optionalText(input.reason),
    };

    this.participants.set(current.id, next);
    this.event(roomId, "participant_removed", actorUserId, { participantId: current.id, userId: current.userId, reason: next.removeReason });
    return next;
  }

  muteParticipant(roomId: string, input: Record<string, unknown>): StreamRuntimeParticipant {
    this.requireRoom(roomId);
    const userId = optionalText(input.userId);
    const participantId = optionalText(input.participantId);
    const current = Array.from(this.participants.values()).find((item) =>
      item.roomId === roomId &&
      item.state === "active" &&
      ((participantId && item.id === participantId) || (userId && item.userId === userId))
    );

    if (!current) throw new Error("stream_participant_not_found");

    const next: StreamRuntimeParticipant = { ...current, state: "muted", mutedAt: now() };
    this.participants.set(current.id, next);
    this.event(roomId, "participant_muted", optionalText(input.actorUserId), { participantId: current.id, userId: current.userId });
    return next;
  }

  updateStatus(roomId: string, input: Record<string, unknown>): StreamRuntimeRoom {
    const current = this.requireRoom(roomId);
    if (!validStatus(input.status)) throw new Error("invalid_stream_status");

    const timestamp = now();
    const next: StreamRuntimeRoom = {
      ...current,
      status: input.status,
      updatedAt: timestamp,
      startedAt: input.status === "live" ? current.startedAt ?? timestamp : current.startedAt,
      pausedAt: input.status === "paused" ? timestamp : current.pausedAt,
      endedAt: input.status === "ended" ? current.endedAt ?? timestamp : current.endedAt,
    };

    this.rooms.set(roomId, next);
    this.event(roomId, "room_status_changed", optionalText(input.actorUserId), { status: input.status });
    return next;
  }

  blockRoom(roomId: string, input: Record<string, unknown>): StreamRuntimeRoom {
    const current = this.requireRoom(roomId);
    const timestamp = now();

    const next: StreamRuntimeRoom = {
      ...current,
      status: "blocked",
      updatedAt: timestamp,
      blockedAt: timestamp,
      blockedByUserId: optionalText(input.actorUserId),
      blockReason: text(input.reason, "admin_block"),
    };

    this.rooms.set(roomId, next);
    this.event(roomId, "room_blocked", next.blockedByUserId, { reason: next.blockReason });
    return next;
  }

  reportModeration(roomId: string, input: Record<string, unknown>): StreamRuntimeModerationReport {
    this.requireRoom(roomId);

    const report: StreamRuntimeModerationReport = {
      id: randomUUID(),
      roomId,
      reporterUserId: text(input.reporterUserId, "reporter_required_before_production"),
      targetUserId: optionalText(input.targetUserId),
      reason: text(input.reason, "unspecified"),
      details: optionalText(input.details),
      createdAt: now(),
      status: "queued_for_admin_review",
    };

    this.reports.push(report);
    this.event(roomId, "moderation_report_created", report.reporterUserId, { reportId: report.id, reason: report.reason });
    return report;
  }

  reviewModerationReport(input: Record<string, unknown>): StreamRuntimeModerationReport {
    const reportId = text(input.reportId, "");
    const index = this.reports.findIndex((item) => item.id === reportId);
    if (index < 0) throw new Error("stream_moderation_report_not_found");

    const current = this.reports[index];
    const status = input.status === "dismissed" ? "dismissed" : "reviewed";
    const next: StreamRuntimeModerationReport = {
      ...current,
      status,
      reviewedAt: now(),
      reviewedByUserId: optionalText(input.actorUserId),
    };

    this.reports[index] = next;
    this.event(current.roomId, "moderation_report_reviewed", next.reviewedByUserId, { reportId, status });
    return next;
  }

  recordingGate(roomId: string): StreamRuntimeRecordingGate {
    this.requireRoom(roomId);
    return {
      roomId,
      status: "provider_not_configured",
      recordingStartAllowed: false,
      recordingProviderConfigured: false,
      reason: "recording_provider_not_configured",
    };
  }

  realtimeGate(roomId: string): StreamRuntimeRealtimeGate {
    this.requireRoom(roomId);
    return {
      roomId,
      status: "contract_ready_provider_not_configured",
      realtimeGatewayStartAllowed: false,
      realtimeProviderConfigured: false,
      reason: "realtime_provider_not_configured",
    };
  }

  diagnostics() {
    const rooms = this.listRooms();
    const activeParticipants = Array.from(this.participants.values()).filter((item) => item.state === "active");

    return {
      version: "STREAM-100-FULL-ONE",
      status: "stream_full_internal_safe_disabled_complete",
      providerStatus: safety.providerStatus,
      providerSafeDisabled: safety.providerSafeDisabled,
      databaseMode: safety.databaseMode,
      fakeLiveAllowed: safety.fakeLiveAllowed,
      providerCallAllowed: safety.providerCallAllowed,
      mediaRoomCreationAllowed: safety.mediaRoomCreationAllowed,
      realtimeGatewayStartAllowed: safety.realtimeGatewayStartAllowed,
      recordingStartAllowed: safety.recordingStartAllowed,
      walletMutationAllowed: safety.walletMutationAllowed,
      moneyMovementAllowed: safety.moneyMovementAllowed,
      roomsTotal: rooms.length,
      roomsLive: rooms.filter((room) => room.status === "live").length,
      roomsBlocked: rooms.filter((room) => room.status === "blocked").length,
      participantsTotal: this.participants.size,
      participantsActive: activeParticipants.length,
      moderationReportsTotal: this.reports.length,
      moderationReportsQueued: this.reports.filter((report) => report.status === "queued_for_admin_review").length,
      eventsTotal: this.events.length,
      backendFoundationComplete: true,
      adminControlComplete: true,
      moderationComplete: true,
      lifecycleComplete: true,
      participantControlComplete: true,
      realtimeContractComplete: true,
      recordingGateComplete: true,
      mobileContractsReady: true,
      providerSafeBoundaryComplete: true,
      routesReady: [
        "GET /api/stream/runtime-foundation/rooms",
        "POST /api/stream/runtime-foundation/rooms",
        "GET /api/stream/runtime-foundation/rooms/:roomId",
        "POST /api/stream/runtime-foundation/rooms/:roomId/join",
        "POST /api/stream/runtime-foundation/rooms/:roomId/leave",
        "PATCH /api/stream/runtime-foundation/rooms/:roomId/status",
        "GET /api/stream/runtime-foundation/rooms/:roomId/participants",
        "POST /api/stream/runtime-foundation/rooms/:roomId/moderation/report",
        "GET /api/stream/runtime-foundation/rooms/:roomId/realtime/gate",
        "GET /api/stream/runtime-foundation/rooms/:roomId/recording/gate",
        "GET /api/admin/stream/runtime-foundation/diagnostics",
        "GET /api/admin/stream/runtime-foundation/rooms",
        "POST /api/admin/stream/runtime-foundation/rooms/:roomId/block",
        "POST /api/admin/stream/runtime-foundation/rooms/:roomId/participants/remove",
        "POST /api/admin/stream/runtime-foundation/rooms/:roomId/participants/mute",
        "GET /api/admin/stream/runtime-foundation/moderation/reports",
        "POST /api/admin/stream/runtime-foundation/moderation/reports/review",
        "GET /api/admin/stream/runtime-foundation/events",
      ],
    };
  }

  private requireRoom(roomId: string): StreamRuntimeRoom {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error("stream_room_not_found");
    return room;
  }

  private event(roomId: string, type: string, actorUserId: string | undefined, payload: Record<string, unknown>): void {
    this.events.push({ id: randomUUID(), roomId, type, actorUserId, payload, createdAt: now() });
  }
}

export const streamRuntimeFoundationService = new StreamRuntimeFoundationService();
