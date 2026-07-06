export type HomeModuleId =
  | "messenger"
  | "wallet"
  | "notifications"
  | "ai"
  | "qr"
  | "profile"
  | "marketplace"
  | "stream"
  | "games"
  | "gallery"
  | "business"
  | "admin";

export type HomeWidgetSize = "small" | "medium" | "large" | "wide";
export type HomeWidgetKind = "summary" | "feed" | "shortcut" | "status" | "balance";
export type HomeDockItemKind = "module" | "action";
export type HomeAppearanceMode = "system" | "light" | "dark";
export type HomePremiumPlan = "FREE" | "PREMIUM" | "BUSINESS_PREMIUM" | "ADMIN";
export type HomeVisibilityReason =
  | "available"
  | "hidden_by_user"
  | "disabled_by_default"
  | "premium_required"
  | "feature_flag_disabled"
  | "access_denied";

export type HomeWidgetDefinition = {
  id: string;
  moduleId: HomeModuleId;
  title: string;
  description?: string;
  kind: HomeWidgetKind;
  size: HomeWidgetSize;
  route?: string;
  iconKey?: string;
  defaultVisible: boolean;
  pinnedByDefault?: boolean;
  premiumRequired?: boolean;
  featureFlagKey?: string;
  priority?: number;
};

export type HomeDockItem = {
  id: string;
  kind: HomeDockItemKind;
  label: string;
  iconKey: string;
  moduleId?: HomeModuleId;
  route?: string;
  action?: string;
  premiumRequired?: boolean;
  featureFlagKey?: string;
  order: number;
};

export type HomeQuickAction = {
  id: string;
  label: string;
  iconKey: string;
  route?: string;
  action?: string;
  moduleId?: HomeModuleId;
  premiumRequired?: boolean;
  featureFlagKey?: string;
  order: number;
};

export type HomeThemeState = {
  appearance: HomeAppearanceMode;
  accentColor: string;
  backgroundPreset: string;
  wallpaperUrl?: string | null;
  glassMode: boolean;
};

export type HomeBalancePreview = {
  localBalance?: string;
  coinBalance?: string;
  cryptoBalance?: string;
};

export type HomeAccountSnapshot = {
  userId: string;
  displayName: string;
  username?: string | null;
  avatarUrl?: string | null;
  verified: boolean;
  premiumPlan: HomePremiumPlan;
  unreadCount: number;
  balances?: HomeBalancePreview;
};

export type HomeLayoutState = {
  userId: string;
  editMode: boolean;
  widgetOrder: string[];
  hiddenCardIds: string[];
  pinnedMiniAppIds: string[];
  dockItems: HomeDockItem[];
  quickActions: HomeQuickAction[];
  theme: HomeThemeState;
  accountSnapshot: HomeAccountSnapshot;
  updatedAt: string;
};

export type HomeWidgetAvailability = {
  widgetId: string;
  available: boolean;
  visible: boolean;
  reason: HomeVisibilityReason;
};

export type HomeManifest = {
  userId: string;
  featureFlags: string[];
  premiumPlan: HomePremiumPlan;
  unreadCount: number;
  visibleWidgetIds: string[];
  hiddenWidgetIds: string[];
  pinnedMiniAppIds: string[];
  quickActionIds: string[];
  dockItemIds: string[];
};

export type HomeKernelState = {
  layout: HomeLayoutState;
  widgets: HomeWidgetDefinition[];
  visibleWidgets: HomeWidgetDefinition[];
  hiddenWidgets: HomeWidgetDefinition[];
  availability: HomeWidgetAvailability[];
  manifest: HomeManifest;
};

export type UpdateHomeLayoutInput = {
  widgetOrder?: string[];
  hiddenCardIds?: string[];
  pinnedMiniAppIds?: string[];
  dockItems?: HomeDockItem[];
};

export type HomeLayoutDefaults = {
  dockItems: HomeDockItem[];
  quickActions: HomeQuickAction[];
  theme: HomeThemeState;
};
