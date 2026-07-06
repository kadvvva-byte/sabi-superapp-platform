import type {
  HomeAccountSnapshot,
  HomeDockItem,
  HomeLayoutDefaults,
  HomeQuickAction,
  HomeThemeState,
  HomeWidgetDefinition,
} from "./home.types";

function trimText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function uniqueIds(values: readonly string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeOrder<T extends { order: number }>(items: readonly T[]) {
  return [...items]
    .sort((left, right) => left.order - right.order || String((left as { id?: string }).id ?? "").localeCompare(String((right as { id?: string }).id ?? "")))
    .map((item, index) => ({ ...item, order: index + 1 }));
}

export function normalizeTheme(current: HomeThemeState, patch: Partial<HomeThemeState>): HomeThemeState {
  const appearance = patch.appearance ?? current.appearance;
  const accentColor = trimText(patch.accentColor) || current.accentColor;
  const backgroundPreset = trimText(patch.backgroundPreset) || current.backgroundPreset;

  return {
    appearance: appearance === "light" || appearance === "dark" || appearance === "system"
      ? appearance
      : current.appearance,
    accentColor,
    backgroundPreset,
    wallpaperUrl:
      patch.wallpaperUrl === undefined
        ? current.wallpaperUrl
        : trimText(patch.wallpaperUrl) || null,
    glassMode:
      typeof patch.glassMode === "boolean" ? patch.glassMode : current.glassMode,
  };
}

export function normalizeDockItems(
  input: readonly HomeDockItem[] | undefined,
  defaults: readonly HomeDockItem[],
) {
  if (!input || input.length === 0) {
    return normalizeOrder(defaults);
  }

  const filtered = input.filter((item) => trimText(item.id) && trimText(item.label) && trimText(item.iconKey));
  return normalizeOrder(
    filtered.map((item) => ({
      ...item,
      id: trimText(item.id),
      label: trimText(item.label),
      iconKey: trimText(item.iconKey),
      route: trimText(item.route) || undefined,
      action: trimText(item.action) || undefined,
      featureFlagKey: trimText(item.featureFlagKey) || undefined,
    })),
  );
}

export function normalizeQuickActions(
  input: readonly HomeQuickAction[] | undefined,
  defaults: readonly HomeQuickAction[],
) {
  if (!input || input.length === 0) {
    return normalizeOrder(defaults);
  }

  const filtered = input.filter((item) => trimText(item.id) && trimText(item.label) && trimText(item.iconKey));
  return normalizeOrder(
    filtered.map((item) => ({
      ...item,
      id: trimText(item.id),
      label: trimText(item.label),
      iconKey: trimText(item.iconKey),
      route: trimText(item.route) || undefined,
      action: trimText(item.action) || undefined,
      featureFlagKey: trimText(item.featureFlagKey) || undefined,
    })),
  );
}

export function normalizeAccountSnapshot(
  current: HomeAccountSnapshot,
  patch: Partial<HomeAccountSnapshot>,
): HomeAccountSnapshot {
  return {
    ...current,
    ...patch,
    userId: trimText(patch.userId) || current.userId,
    displayName: trimText(patch.displayName) || current.displayName,
    username:
      patch.username === undefined ? current.username : trimText(patch.username) || null,
    avatarUrl:
      patch.avatarUrl === undefined ? current.avatarUrl : trimText(patch.avatarUrl) || null,
    verified: typeof patch.verified === "boolean" ? patch.verified : current.verified,
    premiumPlan:
      patch.premiumPlan ?? current.premiumPlan,
    unreadCount:
      typeof patch.unreadCount === "number" && patch.unreadCount >= 0
        ? Math.floor(patch.unreadCount)
        : current.unreadCount,
    balances: {
      ...current.balances,
      ...patch.balances,
    },
  };
}

export function normalizeWidgetDefinition(widget: HomeWidgetDefinition): HomeWidgetDefinition {
  return {
    ...widget,
    id: trimText(widget.id),
    title: trimText(widget.title),
    description: trimText(widget.description) || undefined,
    route: trimText(widget.route) || undefined,
    iconKey: trimText(widget.iconKey) || undefined,
    featureFlagKey: trimText(widget.featureFlagKey) || undefined,
  };
}

export function buildValidatedDefaults(defaults: HomeLayoutDefaults): HomeLayoutDefaults {
  return {
    dockItems: normalizeDockItems(defaults.dockItems, defaults.dockItems),
    quickActions: normalizeQuickActions(defaults.quickActions, defaults.quickActions),
    theme: normalizeTheme(defaults.theme, {}),
  };
}
