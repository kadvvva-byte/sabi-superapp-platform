import { platformFoundationContext } from "../platform";
import { HomeLayoutService } from "./home-layout.service";
import { HomeWidgetRegistryService } from "./home-widget-registry.service";
import type {
  HomeAccountSnapshot,
  HomeDockItem,
  HomeKernelState,
  HomeManifest,
  HomeModuleId,
  HomeQuickAction,
  HomeThemeState,
  HomeVisibilityReason,
  HomeWidgetAvailability,
  HomeWidgetDefinition,
  UpdateHomeLayoutInput,
} from "./home.types";

function orderedWidgets(
  widgets: readonly HomeWidgetDefinition[],
  widgetOrder: readonly string[],
) {
  if (widgetOrder.length === 0) {
    return [...widgets];
  }

  const orderMap = new Map(widgetOrder.map((id, index) => [id, index]));

  return [...widgets].sort((left, right) => {
    const leftIndex = orderMap.get(left.id) ?? Number.MAX_SAFE_INTEGER;
    const rightIndex = orderMap.get(right.id) ?? Number.MAX_SAFE_INTEGER;
    return leftIndex - rightIndex || left.id.localeCompare(right.id);
  });
}

function rolesFromPlan(plan: HomeAccountSnapshot["premiumPlan"]) {
  switch (plan) {
    case "PREMIUM":
      return ["PREMIUM_USER"] as const;
    case "BUSINESS_PREMIUM":
      return ["PREMIUM_USER", "BUSINESS_OWNER"] as const;
    case "ADMIN":
      return ["ADMIN"] as const;
    default:
      return ["USER"] as const;
  }
}

function resourceFromModule(moduleId: HomeModuleId) {
  switch (moduleId) {
    case "notifications":
      return "notification" as const;
    case "profile":
      return "profile" as const;
    case "wallet":
      return "wallet" as const;
    case "business":
      return "business" as const;
    case "admin":
      return "admin" as const;
    case "ai":
      return "ai" as const;
    case "qr":
      return "qr" as const;
    default:
      return "messenger" as const;
  }
}

export class HomeKernelService {
  constructor(
    private readonly widgets: HomeWidgetRegistryService,
    private readonly layout: HomeLayoutService,
  ) {}

  private isPremiumAllowed(premiumRequired: boolean | undefined, plan: HomeAccountSnapshot["premiumPlan"]) {
    if (!premiumRequired) {
      return true;
    }

    return plan !== "FREE";
  }

  private isFeatureFlagAllowed(featureFlagKey: string | undefined) {
    if (!featureFlagKey) {
      return true;
    }

    return platformFoundationContext.featureFlags.isEnabled(featureFlagKey);
  }

  private hasAccess(userId: string, plan: HomeAccountSnapshot["premiumPlan"], moduleId?: HomeModuleId) {
    if (!moduleId) {
      return true;
    }

    const resource = resourceFromModule(moduleId);
    const decision = platformFoundationContext.access.can({
      actorUserId: userId,
      ownerUserId: userId,
      resource,
      action: "read",
      roles: [...rolesFromPlan(plan)],
    });

    return decision.allowed;
  }

  private buildAvailability(
    userId: string,
    widget: HomeWidgetDefinition,
    hiddenIds: ReadonlySet<string>,
    plan: HomeAccountSnapshot["premiumPlan"],
  ): HomeWidgetAvailability {
    let reason: HomeVisibilityReason = "available";

    if (!this.isFeatureFlagAllowed(widget.featureFlagKey)) {
      reason = "feature_flag_disabled";
    } else if (!this.isPremiumAllowed(widget.premiumRequired, plan)) {
      reason = "premium_required";
    } else if (!this.hasAccess(userId, plan, widget.moduleId)) {
      reason = "access_denied";
    } else if (hiddenIds.has(widget.id)) {
      reason = "hidden_by_user";
    } else if (!widget.defaultVisible) {
      reason = "disabled_by_default";
    }

    return {
      widgetId: widget.id,
      available: reason === "available" || reason === "hidden_by_user" || reason === "disabled_by_default",
      visible: reason === "available",
      reason,
    };
  }

  private filterDockItems(userId: string, plan: HomeAccountSnapshot["premiumPlan"], items: readonly HomeDockItem[]) {
    return items.filter((item) => {
      if (!this.isFeatureFlagAllowed(item.featureFlagKey)) {
        return false;
      }
      if (!this.isPremiumAllowed(item.premiumRequired, plan)) {
        return false;
      }
      return this.hasAccess(userId, plan, item.moduleId);
    });
  }

  private filterQuickActions(
    userId: string,
    plan: HomeAccountSnapshot["premiumPlan"],
    actions: readonly HomeQuickAction[],
  ) {
    return actions.filter((item) => {
      if (!this.isFeatureFlagAllowed(item.featureFlagKey)) {
        return false;
      }
      if (!this.isPremiumAllowed(item.premiumRequired, plan)) {
        return false;
      }
      return this.hasAccess(userId, plan, item.moduleId);
    });
  }

  getManifest(userId: string): HomeManifest {
    const state = this.getState(userId);
    return state.manifest;
  }

  getState(userId: string): HomeKernelState {
    const syncedLayout = this.layout.syncAccountSnapshot(userId);
    const widgets = orderedWidgets(this.widgets.list(), syncedLayout.widgetOrder);
    const hiddenIds = new Set(syncedLayout.hiddenCardIds);
    const availability = widgets.map((widget) =>
      this.buildAvailability(userId, widget, hiddenIds, syncedLayout.accountSnapshot.premiumPlan),
    );
    const visibilityById = new Map(availability.map((item) => [item.widgetId, item]));

    const visibleWidgets = widgets.filter((widget) => visibilityById.get(widget.id)?.visible);
    const hiddenWidgets = widgets.filter((widget) => !visibilityById.get(widget.id)?.visible);
    const dockItems = this.filterDockItems(
      userId,
      syncedLayout.accountSnapshot.premiumPlan,
      syncedLayout.dockItems,
    );
    const quickActions = this.filterQuickActions(
      userId,
      syncedLayout.accountSnapshot.premiumPlan,
      syncedLayout.quickActions,
    );

    const manifest: HomeManifest = {
      userId,
      featureFlags: platformFoundationContext.featureFlags
        .getAll()
        .filter((flag) => flag.enabled)
        .map((flag) => flag.key),
      premiumPlan: syncedLayout.accountSnapshot.premiumPlan,
      unreadCount: syncedLayout.accountSnapshot.unreadCount,
      visibleWidgetIds: visibleWidgets.map((widget) => widget.id),
      hiddenWidgetIds: hiddenWidgets.map((widget) => widget.id),
      pinnedMiniAppIds: [...syncedLayout.pinnedMiniAppIds],
      quickActionIds: quickActions.map((item) => item.id),
      dockItemIds: dockItems.map((item) => item.id),
    };

    return {
      layout: {
        ...syncedLayout,
        dockItems,
        quickActions,
      },
      widgets,
      visibleWidgets,
      hiddenWidgets,
      availability,
      manifest,
    };
  }

  registerWidgets(widgets: readonly HomeWidgetDefinition[]) {
    return this.widgets.registerMany(widgets);
  }

  syncAccountSnapshot(userId: string) {
    return this.layout.syncAccountSnapshot(userId);
  }

  reset(userId: string) {
    return this.layout.reset(userId);
  }

  setEditMode(userId: string, enabled: boolean) {
    return this.layout.setEditMode(userId, enabled);
  }

  updateLayout(userId: string, patch: UpdateHomeLayoutInput) {
    return this.layout.updateLayout(userId, patch);
  }

  setDockItems(userId: string, dockItems: readonly HomeDockItem[]) {
    return this.layout.setDockItems(userId, dockItems);
  }

  setTheme(userId: string, patch: Partial<HomeThemeState>) {
    return this.layout.setTheme(userId, patch);
  }

  setQuickActions(userId: string, actions: readonly HomeQuickAction[]) {
    return this.layout.setQuickActions(userId, actions);
  }

  setAccountSnapshot(userId: string, patch: Partial<HomeAccountSnapshot>) {
    return this.layout.setAccountSnapshot(userId, patch);
  }

  pinMiniApp(userId: string, miniAppId: string) {
    return this.layout.pinMiniApp(userId, miniAppId);
  }

  unpinMiniApp(userId: string, miniAppId: string) {
    return this.layout.unpinMiniApp(userId, miniAppId);
  }

  hideCard(userId: string, cardId: string) {
    return this.layout.hideCard(userId, cardId);
  }

  showCard(userId: string, cardId: string) {
    return this.layout.showCard(userId, cardId);
  }
}
