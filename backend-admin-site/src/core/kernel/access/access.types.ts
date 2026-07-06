export type AccessRole =
  | "USER"
  | "PREMIUM_USER"
  | "BUSINESS_OWNER"
  | "MERCHANT_OWNER"
  | "ADMIN"
  | "SUPPORT"
  | "SYSTEM";

export type AccessResource =
  | "profile"
  | "wallet"
  | "business"
  | "merchant"
  | "messenger"
  | "bot"
  | "ai"
  | "premium"
  | "admin"
  | "notification"
  | "qr";

export type AccessAction =
  | "read"
  | "write"
  | "delete"
  | "execute"
  | "manage"
  | "moderate"
  | "translate";

export type AccessRequest = {
  roles: readonly AccessRole[];
  resource: AccessResource;
  action: AccessAction;
  ownerUserId?: string | null;
  actorUserId?: string | null;
};

export type AccessDecision = {
  allowed: boolean;
  reason: string;
};
