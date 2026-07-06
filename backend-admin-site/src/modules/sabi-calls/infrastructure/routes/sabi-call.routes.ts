import { Router, Request, Response } from "express";
import type { SabiCallService } from "../../application";
import type {
  SabiCallContextType,
  SabiCallEffectKind,
  JsonPrimitive,
  SabiCallMetadata,
  SabiCallPresentationSource,
  SabiCallSignalKind,
  SabiCallStatus,
} from "../../contracts";

function bodyOf(req: Request): Record<string, unknown> {
  return req.body && typeof req.body === "object"
    ? (req.body as Record<string, unknown>)
    : {};
}

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readUser(req: Request, body: Record<string, unknown>): string {
  const header = req.headers["x-user-id"];
  return readString(body.userId) ?? readString(Array.isArray(header) ? header[0] : header) ?? "";
}

function isJsonPrimitive(value: unknown): value is JsonPrimitive {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  );
}

function readMetadata(value: unknown): SabiCallMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const source = value as Record<string, unknown>;
  const metadata: SabiCallMetadata = {};

  for (const [key, raw] of Object.entries(source)) {
    if (isJsonPrimitive(raw)) {
      metadata[key] = raw;
    }
  }

  return metadata;
}

function readTargetUserIds(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function readSignalKind(value: unknown): SabiCallSignalKind {
  if (value === "answer") return "answer";
  if (value === "ice_candidate") return "ice_candidate";
  if (value === "renegotiate") return "renegotiate";
  if (value === "bye") return "bye";
  return "offer";
}

type SabiCallIceServer = {
  urls: string | string[];
  username?: string;
  credential?: string;
};

function readEnvString(name: string): string | null {
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readEnvBoolean(name: string): boolean {
  const value = readEnvString(name);
  if (!value) return false;
  return ["1", "true", "yes", "on", "enabled"].includes(value.toLowerCase());
}

function readEnvList(...names: string[]): string[] {
  for (const name of names) {
    const value = readEnvString(name);
    if (!value) continue;

    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length) return items;
  }

  return [];
}

function normalizeIceUrls(urls: string[], allowedPrefixes: readonly string[]): string[] {
  return urls.filter((url) => allowedPrefixes.some((prefix) => url.startsWith(prefix)));
}

function toIceUrls(urls: string[]): string | string[] {
  return urls.length === 1 ? urls[0] : urls;
}

function buildSabiCallIceServersSnapshot() {
  const stunUrls = normalizeIceUrls(
    readEnvList("SABI_CALL_STUN_URLS", "WEBRTC_STUN_URLS", "STUN_URLS"),
    ["stun:"],
  );

  const safeStunUrls = stunUrls.length ? stunUrls : ["stun:stun.l.google.com:19302"];

  const turnEnabled =
    readEnvBoolean("SABI_CALL_TURN_ENABLED") ||
    readEnvBoolean("WEBRTC_TURN_ENABLED") ||
    readEnvBoolean("TURN_ENABLED");

  const turnUrls = normalizeIceUrls(
    readEnvList("SABI_CALL_TURN_URLS", "WEBRTC_TURN_URLS", "TURN_URLS"),
    ["turn:", "turns:"],
  );

  const turnUsername =
    readEnvString("SABI_CALL_TURN_USERNAME") ??
    readEnvString("WEBRTC_TURN_USERNAME") ??
    readEnvString("TURN_USERNAME");

  const turnCredential =
    readEnvString("SABI_CALL_TURN_CREDENTIAL") ??
    readEnvString("WEBRTC_TURN_CREDENTIAL") ??
    readEnvString("TURN_CREDENTIAL");

  const turnConfigured = Boolean(turnEnabled && turnUrls.length && turnUsername && turnCredential);

  const iceServers: SabiCallIceServer[] = [
    { urls: toIceUrls(safeStunUrls) },
  ];

  if (turnConfigured && turnUsername && turnCredential) {
    iceServers.push({
      urls: toIceUrls(turnUrls),
      username: turnUsername,
      credential: turnCredential,
    });
  }

  const ttlRaw =
    readEnvString("SABI_CALL_TURN_CREDENTIAL_TTL_SECONDS") ??
    readEnvString("WEBRTC_TURN_CREDENTIAL_TTL_SECONDS") ??
    readEnvString("TURN_CREDENTIAL_TTL_SECONDS");

  const ttl = ttlRaw ? Number(ttlRaw) : null;

  return {
    status: turnConfigured ? "ready" : "provider_not_configured",
    provider: "sabi_call_ice_servers",
    iceServers,
    rtcConfig: { iceServers },
    fallbackUsed: !turnConfigured,
    stunFallbackIncluded: true,
    turnConfigured,
    turnIncluded: turnConfigured,
    turnCredentialsDeliveredToRtc: turnConfigured,
    credentialTtlSeconds: typeof ttl === "number" && Number.isFinite(ttl) && ttl > 0 ? ttl : null,
    secretValuesReturned: false,
    mobileSecretsAllowed: false,
    generatedAt: new Date().toISOString(),
  };
}
async function respond(res: Response, fn: () => Promise<unknown>): Promise<void> {
  try {
    res.json({ ok: true, data: await fn() });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "sabi_call_error",
    });
  }
}

export function createSabiCallRouter(service: SabiCallService): Router {
  const router = Router();

  router.get("/health", (_req: Request, res: Response) => {
    res.json({
      ok: true,
      module: "sabi-calls",
      status: "ready",
      translation: service.getTranslationHealth(),
    });
  });

  router.get("/", async (req: Request, res: Response) =>
    respond(res, () =>
      service.listCalls({
        userId: readString(req.query.userId) ?? undefined,
        status: (readString(req.query.status) ?? undefined) as SabiCallStatus | undefined,
        contextType: (readString(req.query.contextType) ?? undefined) as SabiCallContextType | undefined,
        contextId: readString(req.query.contextId) ?? undefined,
        limit: Number(req.query.limit) || undefined,
      })
    )
  );

  router.post("/", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.createCall({
        kind: body.kind === "video" ? "video" : "audio",
        initiatedByUserId: readString(body.initiatedByUserId) ?? readUser(req, body),
        targetUserIds: readTargetUserIds(body.targetUserIds),
        contextType: (readString(body.contextType) ?? "direct") as SabiCallContextType,
        contextId: readString(body.contextId),
        metadata: readMetadata(body.metadata),
      });
    })
  );


  router.get("/ice-servers", (_req: Request, res: Response) => {
    const snapshot = buildSabiCallIceServersSnapshot();

    res.json({
      ok: true,
      ...snapshot,
      data: snapshot,
    });
  });
  router.get("/:callId", async (req: Request, res: Response) =>
    respond(res, () => service.getCall(one(req.params.callId)))
  );

  router.post("/:callId/accept", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.acceptCall({ callId: one(req.params.callId), userId: readUser(req, body) });
    })
  );

  router.post("/:callId/decline", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.declineCall({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        reason: readString(body.reason),
      });
    })
  );

  router.post("/:callId/cancel", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.cancelCall({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        reason: readString(body.reason),
      });
    })
  );

  router.post("/:callId/end", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.endCall({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        reason: readString(body.reason),
      });
    })
  );

  router.post("/:callId/media", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.updateMedia({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        audioEnabled: readBoolean(body.audioEnabled),
        videoEnabled: readBoolean(body.videoEnabled),
        speakerEnabled: readBoolean(body.speakerEnabled),
        screenShareEnabled: readBoolean(body.screenShareEnabled),
      });
    })
  );

  router.post("/:callId/signals", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.createSignal({
        callId: one(req.params.callId),
        senderUserId: readString(body.senderUserId) ?? readUser(req, body),
        receiverUserId: readString(body.receiverUserId),
        kind: readSignalKind(body.kind),
        payload: readMetadata(body.payload),
      });
    })
  );

  router.post("/:callId/presentation/start", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.startPresentation({
        callId: one(req.params.callId),
        presenterUserId: readString(body.presenterUserId) ?? readUser(req, body),
        source: (readString(body.source) ?? "screen") as SabiCallPresentationSource,
      });
    })
  );

  router.post("/:callId/presentation/stop", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.stopPresentation({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        reason: readString(body.reason),
      });
    })
  );

  router.post("/:callId/effects", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.updateEffect({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        kind: (readString(body.kind) ?? "none") as SabiCallEffectKind,
        effectKey: readString(body.effectKey),
        enabled: body.enabled === true,
        config: readMetadata(body.config),
      });
    })
  );

  router.post("/:callId/translation/start", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.startTranslation({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        sourceLanguage: readString(body.sourceLanguage) ?? "auto",
        targetLanguage: readString(body.targetLanguage) ?? "en",
      });
    })
  );

  router.post("/:callId/translation/stop", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.stopTranslation({
        callId: one(req.params.callId),
        userId: readUser(req, body),
      });
    })
  );

  router.post("/:callId/translation/segment", async (req: Request, res: Response) =>
    respond(res, () => {
      const body = bodyOf(req);
      return service.translateSegment({
        callId: one(req.params.callId),
        userId: readUser(req, body),
        sourceLanguage: readString(body.sourceLanguage) ?? "auto",
        targetLanguage: readString(body.targetLanguage) ?? "en",
        text: readString(body.text) ?? "",
        segmentId: readString(body.segmentId),
        metadata: readMetadata(body.metadata),
      });
    })
  );

  return router;
}

export const sabiCallRoutes = createSabiCallRouter;
