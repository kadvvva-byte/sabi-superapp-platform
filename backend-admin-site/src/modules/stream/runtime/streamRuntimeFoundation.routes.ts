import { Router, type Request, type Response } from "express";
import { streamRuntimeFoundationService } from "./streamRuntimeFoundation.service";

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

function ok(res: Response, data: Record<string, unknown>): void {
  res.json({ ok: true, ...data });
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const status = message.includes("not_found") ? 404 : message.includes("invalid") ? 400 : 409;
  res.status(status).json({ ok: false, error: message });
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden" });
  return false;
}

export function createStreamRuntimeFoundationRouter(): Router {
  const router = Router();

  router.get("/api/stream/runtime-foundation/rooms", (_req, res) => {
    ok(res, { rooms: streamRuntimeFoundationService.listRooms() });
  });

  router.post("/api/stream/runtime-foundation/rooms", (req, res) => {
    try { ok(res, { room: streamRuntimeFoundationService.createRoom(body(req)) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/stream/runtime-foundation/rooms/:roomId", (req, res) => {
    const room = streamRuntimeFoundationService.getRoom(req.params.roomId);
    if (!room) return res.status(404).json({ ok: false, error: "stream_room_not_found" });
    ok(res, { room, participants: streamRuntimeFoundationService.getParticipants(req.params.roomId), events: streamRuntimeFoundationService.listEvents(req.params.roomId) });
  });

  router.post("/api/stream/runtime-foundation/rooms/:roomId/join", (req, res) => {
    try { ok(res, { participant: streamRuntimeFoundationService.joinRoom(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.post("/api/stream/runtime-foundation/rooms/:roomId/leave", (req, res) => {
    try { ok(res, { participant: streamRuntimeFoundationService.leaveRoom(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.patch("/api/stream/runtime-foundation/rooms/:roomId/status", (req, res) => {
    try { ok(res, { room: streamRuntimeFoundationService.updateStatus(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/stream/runtime-foundation/rooms/:roomId/participants", (req, res) => {
    ok(res, { participants: streamRuntimeFoundationService.getParticipants(req.params.roomId) });
  });

  router.post("/api/stream/runtime-foundation/rooms/:roomId/moderation/report", (req, res) => {
    try { ok(res, { report: streamRuntimeFoundationService.reportModeration(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/stream/runtime-foundation/rooms/:roomId/realtime/gate", (req, res) => {
    try { ok(res, { realtime: streamRuntimeFoundationService.realtimeGate(req.params.roomId) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/stream/runtime-foundation/rooms/:roomId/recording/gate", (req, res) => {
    try { ok(res, { recording: streamRuntimeFoundationService.recordingGate(req.params.roomId) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/runtime-foundation/diagnostics", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    ok(res, { diagnostics: streamRuntimeFoundationService.diagnostics() });
  });

  router.get("/api/admin/stream/runtime-foundation/rooms", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    ok(res, { rooms: streamRuntimeFoundationService.listRooms() });
  });

  router.post("/api/admin/stream/runtime-foundation/rooms/:roomId/block", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try { ok(res, { room: streamRuntimeFoundationService.blockRoom(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/runtime-foundation/rooms/:roomId/participants/remove", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try { ok(res, { participant: streamRuntimeFoundationService.removeParticipant(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/runtime-foundation/rooms/:roomId/participants/mute", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try { ok(res, { participant: streamRuntimeFoundationService.muteParticipant(req.params.roomId, body(req)) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/runtime-foundation/moderation/reports", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    const roomId = typeof req.query.roomId === "string" ? req.query.roomId : undefined;
    ok(res, { reports: streamRuntimeFoundationService.listModerationReports(roomId) });
  });

  router.post("/api/admin/stream/runtime-foundation/moderation/reports/review", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try { ok(res, { report: streamRuntimeFoundationService.reviewModerationReport(body(req)) }); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/runtime-foundation/events", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    const roomId = typeof req.query.roomId === "string" ? req.query.roomId : undefined;
    ok(res, { events: streamRuntimeFoundationService.listEvents(roomId) });
  });

  return router;
}
