import { Router, type Request, type Response } from "express";
import { googleBilling175ReadinessService } from "./googleBilling175.service";

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

export function createGoogleBilling175Router(): Router {
  const router = Router();

  router.get("/api/google-billing/175/provider-gate", (_req, res) => {
    ok(res, { gate: googleBilling175ReadinessService.providerGate() });
  });

  router.get("/api/google-billing/175/product-catalog-readiness", (_req, res) => {
    ok(res, { catalog: googleBilling175ReadinessService.productCatalogReadiness() });
  });

  router.get("/api/google-billing/175/purchase-token-boundary", (_req, res) => {
    ok(res, { tokenBoundary: googleBilling175ReadinessService.purchaseTokenBoundary() });
  });

  router.get("/api/admin/google-billing/175/diagnostics", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    ok(res, { diagnostics: googleBilling175ReadinessService.diagnostics() });
  });

  return router;
}
