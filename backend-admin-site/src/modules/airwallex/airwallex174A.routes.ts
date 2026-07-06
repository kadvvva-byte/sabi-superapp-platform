import { Router, type Request, type Response } from "express";
import { airwallex174AReadinessService } from "./airwallex174A.service";

function ok(res: Response, data: Record<string, unknown>): void {
  res.json({ ok: true, ...data });
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

export function createAirwallex174ARouter(): Router {
  const router = Router();

  router.get("/api/airwallex/174a/provider-gate", (_req, res) => {
    ok(res, { gate: airwallex174AReadinessService.providerGate() });
  });

  router.get("/api/airwallex/174a/owner-key-intake-readiness", (_req, res) => {
    ok(res, { intake: airwallex174AReadinessService.ownerKeyIntakeReadiness() });
  });

  router.get("/api/admin/airwallex/174a/diagnostics", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    ok(res, { diagnostics: airwallex174AReadinessService.diagnostics() });
  });

  return router;
}
