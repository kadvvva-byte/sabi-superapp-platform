import { PREMIUM_FEATURE_CATALOG } from "./feature-catalog";
import type { PremiumEntitlementState, PremiumFeatureKey, PremiumPlan } from "./premium.types";

export class PremiumEntitlementService {
  buildState(input: {
    userId: string;
    plan?: PremiumPlan;
    active?: boolean;
    features?: readonly PremiumFeatureKey[];
    source?: PremiumEntitlementState["source"];
  }): PremiumEntitlementState {
    const plan = input.plan ?? "FREE";
    const catalogFeatures = PREMIUM_FEATURE_CATALOG[plan] ?? [];

    return {
      userId: input.userId,
      plan,
      active: input.active ?? plan !== "FREE",
      features: input.features ?? catalogFeatures,
      source: input.source ?? "system_default",
    };
  }

  hasFeature(
    state: PremiumEntitlementState,
    feature: PremiumFeatureKey,
  ): boolean {
    if (!state.active) return false;
    return state.features.includes(feature);
  }
}
