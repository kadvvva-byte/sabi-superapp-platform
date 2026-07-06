import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerSchemaPlanning198BRemainsSafe,
  createStreamGiftLedgerSchemaApprovalRequest198B,
  getStreamGiftLedgerSchemaPlan198B,
} from "./streamGiftLedgerSchemaPlanning198B.service";

function requireAdminToken198B(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198B" });
  return false;
}

export function createStreamGiftLedgerSchemaPlanning198BRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerSchemaPlanning198BRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198b/readiness", (req, res) => {
    if (!requireAdminToken198B(req, res)) return;
    const plan = getStreamGiftLedgerSchemaPlan198B();
    res.json({
      ok: plan.ok,
      version: plan.version,
      status: plan.status,
      safety: plan.safety,
      boundary: plan.boundary,
      economyPolicy: plan.economyPolicy,
      proposedEntityCount: plan.proposedEntities.length,
      nextStage: plan.nextStage,
    });
  });

  router.get("/api/admin/stream/gifts/ledger/198b/schema-plan", (req, res) => {
    if (!requireAdminToken198B(req, res)) return;
    res.json(getStreamGiftLedgerSchemaPlan198B());
  });

  router.post("/api/admin/stream/gifts/ledger/198b/schema-approval-request", (req, res) => {
    if (!requireAdminToken198B(req, res)) return;
    res.status(423).json(createStreamGiftLedgerSchemaApprovalRequest198B());
  });

  return router;
}
