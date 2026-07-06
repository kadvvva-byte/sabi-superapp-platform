import type { OwnerBinding, QrExecutionEnvelope, SuperAppIdentityType } from "./identity.types";

export class IdentityFoundationService {
  assertUserId(userId: string) {
    if (!userId || !userId.trim()) {
      throw new Error("ownerUserId is required");
    }
  }

  createOwnerBinding(binding: OwnerBinding): OwnerBinding {
    this.assertUserId(binding.ownerUserId);

    if (!binding.entityId?.trim()) {
      throw new Error("entityId is required");
    }

    return {
      ...binding,
      ownerUserId: binding.ownerUserId.trim(),
      entityId: binding.entityId.trim(),
    };
  }

  assertOwnedByUser(binding: OwnerBinding, userId: string) {
    this.assertUserId(userId);
    return binding.ownerUserId === userId;
  }

  createQrExecutionEnvelope(input: {
    targetType: SuperAppIdentityType;
    targetId: string;
    ownerUserId: string;
    scope: string;
    action: string;
    securityEnvelope?: string;
  }): QrExecutionEnvelope {
    this.assertUserId(input.ownerUserId);

    if (!input.targetId?.trim()) {
      throw new Error("QR targetId is required");
    }

    return {
      targetType: input.targetType,
      targetId: input.targetId.trim(),
      ownerUserId: input.ownerUserId.trim(),
      scope: input.scope.trim(),
      action: input.action.trim(),
      securityEnvelope: input.securityEnvelope?.trim() || undefined,
    };
  }
}
