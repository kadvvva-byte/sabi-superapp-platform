import { platformFoundationContext } from "../platform";
import { createDefaultAccountSnapshot } from "./home.defaults";
import type { HomeAccountSnapshot } from "./home.types";

export class HomeAccountSnapshotService {
  sync(userId: string, current?: HomeAccountSnapshot): HomeAccountSnapshot {
    const base = current ?? createDefaultAccountSnapshot(userId);
    const unreadCount = platformFoundationContext.notifications.getBadgeSnapshot(userId).unreadTotal;
    const entitlement = platformFoundationContext.premium.buildState({
      userId,
      plan: base.premiumPlan,
      active: base.premiumPlan !== "FREE",
    });

    return {
      ...base,
      userId,
      unreadCount,
      premiumPlan: entitlement.plan,
    };
  }
}
