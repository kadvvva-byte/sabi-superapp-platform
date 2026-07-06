import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

type RequestWithAuthenticatedUser = Request & {
  currentUser?: { id: string; userId: string; sub: string; role: string };
  user?: { id: string; userId: string; sub: string; role: string };
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
  const user = { id: safeUserId, userId: safeUserId, sub: safeUserId, role: "USER" };

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
