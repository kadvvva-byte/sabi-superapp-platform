export type SuperAppIdentityType =
  | "user"
  | "profile"
  | "wallet"
  | "businessWallet"
  | "merchantWallet"
  | "chat"
  | "group"
  | "channel"
  | "bot"
  | "stream"
  | "marketplaceStore"
  | "gameProfile"
  | "premiumEntitlement"
  | "qrTarget";

export type OwnerRelationType =
  | "OWNER"
  | "MEMBER"
  | "ADMIN"
  | "VIEWER"
  | "SERVICE"
  | "RECIPIENT";

export type OwnerBinding = {
  ownerUserId: string;
  entityType: SuperAppIdentityType;
  entityId: string;
  relation: OwnerRelationType;
};

export type QrExecutionEnvelope = {
  targetType: SuperAppIdentityType;
  targetId: string;
  ownerUserId: string;
  scope: string;
  action: string;
  securityEnvelope?: string;
};
