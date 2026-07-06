import { Router, type Request } from "express";
import {
  createQrToken,
  listQrFunctions,
  listQrTokensForActor,
  resolveQrToken,
  validateQrToken,
} from "../../services/qr-token.service";
import { decideQrExecution } from "../../services/qr-execution-policy.service";
import { SABI_QR_ADMIN_PROVIDER_REGISTRY } from "../../services/qr-provider-admin-registry";

const router = Router();

function getActorUserId(req: Request): string | null {
  const fromHeader = req.header("x-user-id")?.trim();
  if (fromHeader) return fromHeader;

  const auth = req.header("authorization") ?? "";
  if (auth.startsWith("Bearer temp-token")) return "dev-temp-user";

  const bodyActor = typeof req.body?.actorUserId === "string" ? req.body.actorUserId.trim() : "";
  return bodyActor || null;
}

function getIdempotencyKey(req: Request): string | null {
  const fromHeader = req.header("idempotency-key")?.trim();
  if (fromHeader) return fromHeader;
  const fromBody = typeof req.body?.idempotencyKey === "string" ? req.body.idempotencyKey.trim() : "";
  return fromBody || null;
}

router.get("/functions", (_req, res) => {
  res.json({ version: "QR-100.2", functions: listQrFunctions() });
});

router.get("/history", (req, res) => {
  const actorUserId = getActorUserId(req);

  if (!actorUserId) {
    res.status(401).json({ error: "qr_auth_required" });
    return;
  }

  const tokens = listQrTokensForActor(actorUserId).map((token) => {
    const { signature: _hiddenSignature, ...publicToken } = token;
    return publicToken;
  });

  res.json({ version: "QR-100.4", tokens });
});

router.get("/admin/provider-registry", (_req, res) => {
  res.json({
    version: "QR-100.2",
    mobileCanReadSecrets: false,
    providers: SABI_QR_ADMIN_PROVIDER_REGISTRY,
    policy: {
      apiKeysInMobileAllowed: false,
      providerSecretsVisibility: "admin_secret_only",
      virtualCardsTokenOnly: true,
      panStorageAllowed: false,
      cvvStorageAllowed: false,
    },
  });
});

router.post("/tokens", (req, res) => {
  const actorUserId = getActorUserId(req);

  if (!actorUserId) {
    res.status(401).json({ error: "qr_auth_required", reason: "Authenticated user ID is required for QR token creation." });
    return;
  }

  const result = createQrToken({
    ...req.body,
    actorUserId,
  });

  if (!result.token) {
    res.status(result.status ?? 400).json({ error: result.error, reason: result.error, adminAction: result.adminAction });
    return;
  }

  const { signature: _hiddenSignature, ...publicToken } = result.token;
  res.status(201).json({ token: publicToken });
});

router.post("/resolve", (req, res) => {
  const rawValue = req.body?.rawValue ?? req.body?.rawPayload;
  const result = resolveQrToken(rawValue);

  if (!result.token || !result.definition) {
    res.status(result.status ?? 400).json({ ok: false, reason: result.error ?? "qr_resolve_failed" });
    return;
  }

  const { signature: _hiddenSignature, ...publicToken } = result.token;
  res.json({ ok: true, token: publicToken, function: result.definition });
});

router.post("/validate", (req, res) => {
  const rawValue = req.body?.rawValue ?? req.body?.rawPayload;
  const result = validateQrToken(rawValue);
  const publicToken = result.token
    ? (() => {
        const { signature: _hiddenSignature, ...rest } = result.token;
        return rest;
      })()
    : undefined;

  res.status(result.valid ? 200 : 400).json({
    valid: result.valid,
    trustState: publicToken?.trustState ?? "rejected",
    reason: result.reason,
    token: publicToken,
    function: result.definition,
  });
});

router.post("/execute", (req, res) => {
  const rawValue = req.body?.rawValue ?? req.body?.rawPayload;
  const validation = validateQrToken(rawValue);

  if (!validation.valid || !validation.token || !validation.definition) {
    res.status(400).json({ ok: false, status: "failed", reason: validation.reason ?? "qr_validation_failed" });
    return;
  }

  const decision = decideQrExecution({
    definition: validation.definition,
    token: validation.token,
    idempotencyKey: getIdempotencyKey(req),
  });

  res.status(decision.httpStatus).json({
    ok: decision.ok,
    status: decision.status,
    reason: decision.reason,
    reviewId: decision.reviewId,
  });
});

export default router;
