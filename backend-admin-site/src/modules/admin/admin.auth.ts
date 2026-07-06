import type { NextFunction, Request, Response } from "express";
import { getAdminPanelToken, getAdminPermissions, getAdminRole } from "./admin.config";
import type { AdminPermission, AdminPrincipal } from "./admin.types";
import type { AdminFileStore } from "./admin.file-store";

export type AdminRequest = Request & {
  admin?: AdminPrincipal;
};

export function readBearerToken(header: unknown): string | null {
  if (typeof header !== "string") return null;
  const [scheme, token] = header.split(" ");
  if (!scheme || !token) return null;
  return scheme.toLowerCase() === "bearer" ? token.trim() : null;
}

export function readAdminToken(req: Request): { token: string | null; source: AdminPrincipal["tokenSource"] } {
  const headerToken = req.headers["x-sabi-admin-token"];
  const sessionHeader = req.headers["x-sabi-admin-session"];

  if (typeof sessionHeader === "string" && sessionHeader.trim()) {
    return { token: sessionHeader.trim(), source: "staff-session" };
  }

  if (typeof headerToken === "string" && headerToken.trim()) {
    return { token: headerToken.trim(), source: "x-sabi-admin-token" };
  }

  return { token: readBearerToken(req.headers.authorization), source: "authorization" };
}

function applyEnvAdmin(req: AdminRequest, source: AdminPrincipal["tokenSource"]): void {
  const role = getAdminRole();
  req.admin = {
    id: "env-admin",
    role,
    permissions: getAdminPermissions(role),
    tokenSource: source,
    rootOwner: role === "owner",
  };
}

export function createRequireAdmin(store?: AdminFileStore) {
  return (req: AdminRequest, res: Response, next: NextFunction): void => {
    const expected = getAdminPanelToken();
    const provided = readAdminToken(req);

    if (expected && provided.token === expected) {
      applyEnvAdmin(req, provided.source);
      next();
      return;
    }

    if (store && provided.token) {
      const session = store.verifyStaffSession(provided.token);
      if (session?.admin) {
        req.admin = session.admin;
        next();
        return;
      }
    }

    if (!expected) {
      res.status(503).json({
        ok: false,
        error: "admin_panel_token_not_configured",
        requiredEnv: ["ADMIN_PANEL_TOKEN"],
      });
      return;
    }

    res.status(403).json({ ok: false, error: "admin_access_denied" });
  };
}

export const requireAdmin = createRequireAdmin();

export function requireAdminPermission(permission: AdminPermission) {
  return (req: AdminRequest, res: Response, next: NextFunction): void => {
    const admin = req.admin;

    if (!admin) {
      res.status(401).json({ ok: false, error: "admin_context_missing" });
      return;
    }

    if (!admin.permissions.includes(permission)) {
      res.status(403).json({ ok: false, error: "admin_permission_denied", permission });
      return;
    }

    next();
  };
}

export function isRootOwnerAdmin(admin: AdminPrincipal | undefined): boolean {
  return Boolean(admin && admin.role === "owner" && admin.rootOwner);
}

export function requireRootOwner(req: AdminRequest, res: Response, next: NextFunction): void {
  if (!isRootOwnerAdmin(req.admin)) {
    res.status(403).json({ ok: false, error: "root_owner_required" });
    return;
  }

  next();
}
