import type { AccessAction, AccessDecision, AccessRequest, AccessResource, AccessRole } from "./access.types";

const ROLE_MATRIX: Readonly<Record<AccessRole, Readonly<Record<AccessResource, readonly AccessAction[]>>>> = {
  USER: {
    profile: ["read", "write"],
    wallet: ["read", "write", "execute"],
    business: [],
    merchant: [],
    messenger: ["read", "write", "execute"],
    bot: [],
    ai: ["read", "execute"],
    premium: ["read"],
    admin: [],
    notification: ["read", "write"],
    qr: ["read", "execute"],
  },
  PREMIUM_USER: {
    profile: ["read", "write"],
    wallet: ["read", "write", "execute"],
    business: ["read"],
    merchant: ["read"],
    messenger: ["read", "write", "execute", "translate"],
    bot: ["read", "write", "execute"],
    ai: ["read", "write", "execute", "translate"],
    premium: ["read", "write"],
    admin: [],
    notification: ["read", "write"],
    qr: ["read", "execute"],
  },
  BUSINESS_OWNER: {
    profile: ["read", "write"],
    wallet: ["read", "write", "execute"],
    business: ["read", "write", "execute", "manage"],
    merchant: ["read"],
    messenger: ["read", "write", "execute"],
    bot: ["read"],
    ai: ["read", "execute"],
    premium: ["read"],
    admin: [],
    notification: ["read", "write"],
    qr: ["read", "execute"],
  },
  MERCHANT_OWNER: {
    profile: ["read", "write"],
    wallet: ["read", "write", "execute"],
    business: ["read"],
    merchant: ["read", "write", "execute", "manage"],
    messenger: ["read", "write"],
    bot: ["read"],
    ai: ["read", "execute"],
    premium: ["read"],
    admin: [],
    notification: ["read", "write"],
    qr: ["read", "execute"],
  },
  ADMIN: {
    profile: ["read", "write", "delete", "manage"],
    wallet: ["read", "write", "manage"],
    business: ["read", "write", "manage", "moderate"],
    merchant: ["read", "write", "manage", "moderate"],
    messenger: ["read", "write", "manage", "moderate"],
    bot: ["read", "write", "manage", "moderate"],
    ai: ["read", "write", "manage"],
    premium: ["read", "write", "manage"],
    admin: ["read", "write", "manage", "moderate"],
    notification: ["read", "write", "manage"],
    qr: ["read", "write", "execute", "manage"],
  },
  SUPPORT: {
    profile: ["read"],
    wallet: ["read"],
    business: ["read"],
    merchant: ["read"],
    messenger: ["read"],
    bot: ["read"],
    ai: ["read"],
    premium: ["read"],
    admin: ["read"],
    notification: ["read"],
    qr: ["read"],
  },
  SYSTEM: {
    profile: ["read", "write", "manage"],
    wallet: ["read", "write", "execute", "manage"],
    business: ["read", "write", "execute", "manage"],
    merchant: ["read", "write", "execute", "manage"],
    messenger: ["read", "write", "execute", "manage", "translate"],
    bot: ["read", "write", "execute", "manage"],
    ai: ["read", "write", "execute", "manage", "translate"],
    premium: ["read", "write", "manage"],
    admin: ["read", "write", "manage", "moderate"],
    notification: ["read", "write", "manage"],
    qr: ["read", "write", "execute", "manage"],
  },
};

export class AccessPolicyService {
  can(request: AccessRequest): AccessDecision {
    if (request.roles.includes("SYSTEM") || request.roles.includes("ADMIN")) {
      return { allowed: true, reason: "granted_by_elevated_role" };
    }

    if (
      request.ownerUserId &&
      request.actorUserId &&
      request.ownerUserId === request.actorUserId &&
      ["read", "write", "execute"].includes(request.action)
    ) {
      return { allowed: true, reason: "granted_by_owner_match" };
    }

    for (const role of request.roles) {
      const actions = ROLE_MATRIX[role]?.[request.resource] ?? [];
      if (actions.includes(request.action)) {
        return { allowed: true, reason: `granted_by_${role.toLowerCase()}` };
      }
    }

    return { allowed: false, reason: "access_denied" };
  }
}
