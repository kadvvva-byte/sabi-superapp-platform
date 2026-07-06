import fs from "fs";
import path from "path";
import type { Request, RequestHandler, Response } from "express";
import { Router } from "express";

type SabiCallPushTokenRecord = {
  userId: string;
  expoPushToken: string;
  deviceId: string;
  platform: string;
  updatedAt: string;
};

type SabiIncomingCallPushInput = {
  toUserIds: string[];
  callId: string;
  fromUserId: string;
  callType: "audio" | "video";
  contextId?: string | null;
  contextType?: string | null;
};

const STORE_PATH = path.resolve(process.cwd(), ".data", "calls", "expo-push-tokens.json");

function nowIso() {
  return new Date().toISOString();
}

function ensureStoreDir() {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asText(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => asText(item)).filter(Boolean)
    : [];
}

function readUserId(req: Request, body: Record<string, unknown>): string {
  const header = req.headers["x-user-id"];
  return (
    asText(body.userId) ||
    asText(body.ownerUserId) ||
    asText(body.accountUserId) ||
    asText(Array.isArray(header) ? header[0] : header)
  );
}

function readStore(): SabiCallPushTokenRecord[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SabiCallPushTokenRecord => {
      return Boolean(
        item &&
          typeof item === "object" &&
          asText((item as SabiCallPushTokenRecord).userId) &&
          asText((item as SabiCallPushTokenRecord).expoPushToken)
      );
    });
  } catch {
    return [];
  }
}

function writeStore(records: SabiCallPushTokenRecord[]) {
  ensureStoreDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(records, null, 2), "utf8");
}

function registerPushToken(input: {
  userId: string;
  expoPushToken: string;
  deviceId?: string;
  platform?: string;
}) {
  const userId = asText(input.userId);
  const expoPushToken = asText(input.expoPushToken);

  if (!userId) throw new Error("sabi_call_push_user_id_required");
  if (!expoPushToken) throw new Error("sabi_call_push_token_required");
  if (!expoPushToken.startsWith("ExponentPushToken[") && !expoPushToken.startsWith("ExpoPushToken[")) {
    throw new Error("sabi_call_push_token_invalid");
  }

  const deviceId = asText(input.deviceId) || "default";
  const platform = asText(input.platform) || "android";
  const records = readStore();
  const nextRecord: SabiCallPushTokenRecord = {
    userId,
    expoPushToken,
    deviceId,
    platform,
    updatedAt: nowIso(),
  };

  const next = records.filter((item) => {
    return !(item.userId === userId && item.deviceId === deviceId && item.expoPushToken === expoPushToken);
  });

  next.unshift(nextRecord);
  writeStore(next.slice(0, 5000));

  return {
    userId,
    deviceId,
    platform,
    registered: true,
    updatedAt: nextRecord.updatedAt,
  };
}

function findTokensForUsers(userIds: string[]) {
  const wanted = new Set(userIds.map(asText).filter(Boolean));
  if (wanted.size === 0) return [];

  const byToken = new Map<string, SabiCallPushTokenRecord>();

  for (const record of readStore()) {
    if (!wanted.has(record.userId)) continue;
    byToken.set(record.expoPushToken, record);
  }

  return Array.from(byToken.values());
}

async function sendExpoPush(messages: Array<Record<string, unknown>>) {
  if (messages.length === 0) {
    return { attempted: 0, sent: 0, skipped: true };
  }

  const fetchFn = globalThis.fetch as unknown as ((url: string, init: any) => Promise<any>) | undefined;

  if (typeof fetchFn !== "function") {
    return {
      attempted: messages.length,
      sent: 0,
      skipped: true,
      reason: "fetch_not_available",
    };
  }

  const chunks: Array<Array<Record<string, unknown>>> = [];
  for (let index = 0; index < messages.length; index += 100) {
    chunks.push(messages.slice(index, index + 100));
  }

  let sent = 0;
  const tickets: unknown[] = [];

  for (const chunk of chunks) {
    const response = await fetchFn("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chunk),
    });

    const payload = await response.json().catch(() => null);
    tickets.push(payload);

    if (response.ok) {
      sent += chunk.length;
    }
  }

  return {
    attempted: messages.length,
    sent,
    tickets,
  };
}

export async function sendSabiIncomingCallPush(input: SabiIncomingCallPushInput) {
  const toUserIds = input.toUserIds.map(asText).filter(Boolean);
  const callId = asText(input.callId);
  const fromUserId = asText(input.fromUserId);
  const callType = input.callType === "video" ? "video" : "audio";

  if (toUserIds.length === 0 || !callId || !fromUserId) {
    return {
      attempted: 0,
      sent: 0,
      skipped: true,
      reason: "missing_required_call_push_fields",
    };
  }

  const tokenRecords = findTokensForUsers(toUserIds);

  const messages = tokenRecords.map((record) => ({
    to: record.expoPushToken,
    sound: "default",
    title: callType === "video" ? "Sabi video call" : "Sabi audio call",
    body: "Incoming call",
    priority: "high",
    channelId: "sabi_calls",
    data: {
      sabiType: "incoming_call",
      callId,
      fromUserId,
      callType,
      contextId: input.contextId ?? "",
      contextType: input.contextType ?? "",
      incomingCall: "1",
    },
  }));

  const result = await sendExpoPush(messages);

  return {
    ...result,
    toUserIds,
    tokensFound: tokenRecords.length,
    callId,
    fromUserId,
    callType,
  };
}

export function createSabiCallPushRouter(): Router {
  const router = Router();

  router.post("/push-token", (req: Request, res: Response) => {
    try {
      const body = asRecord(req.body);
      const userId = readUserId(req, body);
      const expoPushToken =
        asText(body.expoPushToken) ||
        asText(body.pushToken) ||
        asText(body.token) ||
        asText(asRecord(body.data).expoPushToken);

      const result = registerPushToken({
        userId,
        expoPushToken,
        deviceId: asText(body.deviceId) || asText(body.installationId) || "default",
        platform: asText(body.platform) || "android",
      });

      res.json({ ok: true, data: result });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "sabi_call_push_token_error",
      });
    }
  });

  router.get("/push-token/:userId", (req: Request, res: Response) => {
    const userId = asText(req.params.userId);
    const tokens = findTokensForUsers([userId]);

    res.json({
      ok: true,
      data: {
        userId,
        count: tokens.length,
        tokens: tokens.map((item) => ({
          deviceId: item.deviceId,
          platform: item.platform,
          updatedAt: item.updatedAt,
          tokenMasked: item.expoPushToken.slice(0, 22) + "...",
        })),
      },
    });
  });

  router.post("/push-test", async (req: Request, res: Response) => {
    try {
      const body = asRecord(req.body);
      const toUserIds = asStringArray(body.toUserIds);
      const toUserId = asText(body.toUserId);
      if (toUserId) toUserIds.push(toUserId);

      const result = await sendSabiIncomingCallPush({
        toUserIds,
        callId: asText(body.callId) || `call:test:${Date.now()}`,
        fromUserId: asText(body.fromUserId) || "sabi-test",
        callType: body.callType === "video" ? "video" : "audio",
        contextId: asText(body.contextId),
        contextType: asText(body.contextType),
      });

      res.json({ ok: true, data: result });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "sabi_call_push_test_error",
      });
    }
  });

  return router;
}

export function createSabiCallIncomingPushMiddleware(): RequestHandler {
  return (req, res, next) => {
    if (req.method.toUpperCase() !== "POST" || req.path !== "/") {
      next();
      return;
    }

    const originalJson = res.json.bind(res);

    (res as any).json = (payload: unknown) => {
      try {
        const body = asRecord(req.body);
        const response = asRecord(payload);
        const data = asRecord(response.data);

        if (response.ok === true) {
          const callId = asText(data.id) || asText(data.callId) || asText(body.callId);
          const fromUserId =
            asText(data.initiatedByUserId) ||
            asText(body.initiatedByUserId) ||
            readUserId(req, body);

          const toUserIds = asStringArray(body.targetUserIds)
            .concat(asStringArray(data.targetUserIds))
            .filter((item) => item && item !== fromUserId);

          const callType = body.kind === "video" || data.kind === "video" ? "video" : "audio";

          void sendSabiIncomingCallPush({
            toUserIds,
            callId,
            fromUserId,
            callType,
            contextId: asText(body.contextId) || asText(data.contextId),
            contextType: asText(body.contextType) || asText(data.contextType),
          }).catch((error) => {
            console.warn("[sabi-call:push] incoming call push failed", error instanceof Error ? error.message : error);
          });
        }
      } catch (error) {
        console.warn("[sabi-call:push] incoming middleware skipped", error instanceof Error ? error.message : error);
      }

      return originalJson(payload);
    };

    next();
  };
}
