const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("WRITE", rel);
}

function replaceOnce(rel, from, to) {
  const file = path.join(ROOT, rel);
  let content = fs.readFileSync(file, "utf8");
  if (!content.includes(from)) {
    throw new Error(`Pattern not found in ${rel}: ${from.slice(0, 120)}`);
  }
  content = content.replace(from, to);
  fs.writeFileSync(file, content, "utf8");
  console.log("PATCH", rel);
}

function replaceRegex(rel, regex, to) {
  const file = path.join(ROOT, rel);
  let content = fs.readFileSync(file, "utf8");
  if (!regex.test(content)) {
    throw new Error(`Regex not found in ${rel}: ${regex}`);
  }
  content = content.replace(regex, to);
  fs.writeFileSync(file, content, "utf8");
  console.log("PATCH", rel);
}

write("backend-admin-site/src/middleware/authenticated-user.middleware.ts", `import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

type RequestWithAuthenticatedUser = Request & {
  currentUser?: { id: string; userId: string; sub: string };
  user?: { id: string; userId: string; sub: string };
  messengerCurrentUser?: { id: string };
  sabiAuth?: {
    userId: string;
    source: "jwt" | "dev-header";
    authenticatedAt: string;
  };
};

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isProductionMode(): boolean {
  return process.env.NODE_ENV === "production";
}

function readHeader(req: Request, name: string): string | null {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return normalizeString(value[0]);
  return normalizeString(value);
}

function readBearerToken(req: Request): string | null {
  const authorization = readHeader(req, "authorization");
  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return null;

  return normalizeString(token);
}

function verifyJwtAccessToken(token: string): string | null {
  const secret = normalizeString(process.env.JWT_ACCESS_SECRET);

  if (!secret) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    const payload = decoded as jwt.JwtPayload & {
      type?: string;
      sub?: string;
      userId?: string;
      currentUserId?: string;
    };

    if (payload.type && payload.type !== "access") {
      return null;
    }

    return (
      normalizeString(payload.sub) ??
      normalizeString(payload.userId) ??
      normalizeString(payload.currentUserId)
    );
  } catch {
    return null;
  }
}

function readDevHeaderUserId(req: Request): string | null {
  if (isProductionMode() || process.env.SABI_DEV_ALLOW_HEADER_USER !== "1") {
    return null;
  }

  return (
    readHeader(req, "x-user-id") ??
    readHeader(req, "x-current-user-id") ??
    readHeader(req, "x-auth-user-id")
  );
}

export function attachAuthenticatedUser(req: Request, userId: string, source: "jwt" | "dev-header") {
  const safeUserId = normalizeString(userId);
  if (!safeUserId) return;

  const target = req as RequestWithAuthenticatedUser;
  const user = { id: safeUserId, userId: safeUserId, sub: safeUserId };

  target.currentUser = user;
  target.user = user;
  target.messengerCurrentUser = { id: safeUserId };
  target.sabiAuth = {
    userId: safeUserId,
    source,
    authenticatedAt: new Date().toISOString(),
  };
}

export function getAuthenticatedUserId(req: Request): string | null {
  const target = req as RequestWithAuthenticatedUser;

  return (
    normalizeString(target.sabiAuth?.userId) ??
    normalizeString(target.currentUser?.id) ??
    normalizeString(target.currentUser?.userId) ??
    normalizeString(target.currentUser?.sub) ??
    normalizeString(target.user?.id) ??
    normalizeString(target.user?.userId) ??
    normalizeString(target.user?.sub) ??
    normalizeString(target.messengerCurrentUser?.id)
  );
}

export function requireAuthenticatedUser(req: Request, res: Response, next: NextFunction): void {
  const token = readBearerToken(req);
  const jwtUserId = token ? verifyJwtAccessToken(token) : null;

  if (jwtUserId) {
    attachAuthenticatedUser(req, jwtUserId, "jwt");
    next();
    return;
  }

  const devUserId = readDevHeaderUserId(req);

  if (devUserId) {
    attachAuthenticatedUser(req, devUserId, "dev-header");
    next();
    return;
  }

  res.status(401).json({
    ok: false,
    error: "auth_required",
    code: "real_authenticated_user_required",
    fakeUserIdBlocked: true,
    devHeaderAllowed: !isProductionMode() && process.env.SABI_DEV_ALLOW_HEADER_USER === "1",
  });
}
`);

let app = read("backend-admin-site/src/app.ts");

if (!app.includes('authenticated-user.middleware')) {
  app = app.replace(
    'import { errorMiddleware } from "./middleware/error.middleware";',
    'import { errorMiddleware } from "./middleware/error.middleware";\\nimport { requireAuthenticatedUser } from "./middleware/authenticated-user.middleware";',
  );
}

app = app.replace(
  'app.use("/api/v2/messenger", messengerModuleRoutes);',
  'app.use("/api/v2/messenger", requireAuthenticatedUser, messengerModuleRoutes);',
);

app = app.replace(
  'app.use("/api/v2/calls", sabiCallsRouter);',
  'app.use("/api/v2/calls", requireAuthenticatedUser, sabiCallsRouter);',
);

app = app.replace(
  'app.use("/api/calls", sabiCallsRouter);',
  'app.use("/api/calls", requireAuthenticatedUser, sabiCallsRouter);',
);

write("backend-admin-site/src/app.ts", app);

replaceRegex(
  "backend-admin-site/src/modules/messenger/infrastructure/controllers/message.controller.ts",
  /function getRequestUserId\(req: Request\): string \| null \{[\s\S]*?\n\}\n\n\nfunction getPeerContext/,
  `function isProductionMode(): boolean {
  return process.env.NODE_ENV === "production";
}

function isDevHeaderUserAllowed(): boolean {
  return !isProductionMode() && process.env.SABI_DEV_ALLOW_HEADER_USER === "1";
}

function getRequestUserId(req: Request): string | null {
  const requestRecord = req as Request & {
    messengerCurrentUser?: { id?: string | null };
    currentUser?: { id?: string | null; userId?: string | null; sub?: string | null };
    user?: { id?: string | null; userId?: string | null; sub?: string | null };
    sabiAuth?: { userId?: string | null };
  };

  const authenticatedUserId =
    normalizeString(requestRecord.sabiAuth?.userId) ??
    normalizeString(requestRecord.messengerCurrentUser?.id) ??
    normalizeString(requestRecord.currentUser?.id) ??
    normalizeString(requestRecord.currentUser?.userId) ??
    normalizeString(requestRecord.currentUser?.sub) ??
    normalizeString(requestRecord.user?.id) ??
    normalizeString(requestRecord.user?.userId) ??
    normalizeString(requestRecord.user?.sub);

  if (authenticatedUserId) {
    return authenticatedUserId;
  }

  if (!isDevHeaderUserAllowed()) {
    return null;
  }

  return (
    normalizeString(req.header("x-user-id")) ??
    normalizeString(req.header("x-current-user-id")) ??
    normalizeString(req.header("x-auth-user-id")) ??
    normalizeString(req.body?.userId) ??
    normalizeString(req.body?.senderId) ??
    normalizeString(req.body?.actorUserId) ??
    null
  );
}


function getPeerContext`,
);

replaceRegex(
  "backend-admin-site/src/modules/sabi-calls/infrastructure/routes/sabi-call.routes.ts",
  /function readUser\(req: Request, body: Record<string, unknown>\): string \{[\s\S]*?\n\}/,
  `function isProductionMode(): boolean {
  return process.env.NODE_ENV === "production";
}

function isDevHeaderUserAllowed(): boolean {
  return !isProductionMode() && process.env.SABI_DEV_ALLOW_HEADER_USER === "1";
}

function readAuthenticatedUserId(req: Request): string | null {
  const requestRecord = req as Request & {
    currentUser?: { id?: string | null; userId?: string | null; sub?: string | null };
    user?: { id?: string | null; userId?: string | null; sub?: string | null };
    messengerCurrentUser?: { id?: string | null };
    sabiAuth?: { userId?: string | null };
  };

  return (
    readString(requestRecord.sabiAuth?.userId) ??
    readString(requestRecord.currentUser?.id) ??
    readString(requestRecord.currentUser?.userId) ??
    readString(requestRecord.currentUser?.sub) ??
    readString(requestRecord.user?.id) ??
    readString(requestRecord.user?.userId) ??
    readString(requestRecord.user?.sub) ??
    readString(requestRecord.messengerCurrentUser?.id)
  );
}

function readUser(req: Request, body: Record<string, unknown>): string {
  const authenticatedUserId = readAuthenticatedUserId(req);
  if (authenticatedUserId) return authenticatedUserId;

  if (!isDevHeaderUserAllowed()) {
    return "";
  }

  const header = req.headers["x-user-id"];
  const currentHeader = req.headers["x-current-user-id"];
  const authHeader = req.headers["x-auth-user-id"];

  return (
    readString(Array.isArray(header) ? header[0] : header) ??
    readString(Array.isArray(currentHeader) ? currentHeader[0] : currentHeader) ??
    readString(Array.isArray(authHeader) ? authHeader[0] : authHeader) ??
    readString(body.userId) ??
    ""
  );
}`,
);

let socket = read("mobile/src/shared/realtime/superapp-socket.ts");

if (!socket.includes('getAuthSessionState')) {
  socket = socket.replace(
    'import { resolveSabiApiBaseUrl } from "../api/apiBaseUrl";',
    'import { resolveSabiApiBaseUrl } from "../api/apiBaseUrl";\\nimport { getAuthSessionState } from "../../core/kernel/auth";',
  );
}

if (!socket.includes('function getActiveAccessToken')) {
  socket = socket.replace(
    `function uniqueEventNames(eventNames: string[]) {
  return Array.from(new Set(eventNames.filter(Boolean)));
}

function buildAuth(userId?: string | null): Record<string, string> {
  const resolvedUserId = normalizeString(userId) ?? activeUserId ?? null;
  return resolvedUserId ? { userId: resolvedUserId } : {};
}`,
    `function uniqueEventNames(eventNames: string[]) {
  return Array.from(new Set(eventNames.filter(Boolean)));
}

function getActiveAccessToken(): string | null {
  const session = getAuthSessionState();
  return normalizeString(session.accessToken);
}

function buildAuth(userId?: string | null): Record<string, string> {
  const resolvedUserId = normalizeString(userId) ?? activeUserId ?? null;
  const accessToken = getActiveAccessToken();

  return {
    ...(resolvedUserId ? { userId: resolvedUserId } : {}),
    ...(accessToken ? { accessToken, token: accessToken } : {}),
  };
}`,
  );
}

write("mobile/src/shared/realtime/superapp-socket.ts", socket);

console.log("AUTH-REAL-USER-001A PATCH APPLIED");
