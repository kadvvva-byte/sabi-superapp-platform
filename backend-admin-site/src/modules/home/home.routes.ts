import { Router } from "express";
import { homeKernelContext } from "../../core/kernel/home";
import { createHomeLayoutDefaults } from "../../core/kernel/home";
import { platformFoundationContext } from "../../core/kernel/platform";
import type {
  HomeAccountSnapshot,
  HomeDockItem,
  HomeQuickAction,
  HomeThemeState,
  HomeWidgetDefinition,
  UpdateHomeLayoutInput,
} from "../../core/kernel/home";

function audit(actorUserId: string, action: string, details?: Record<string, unknown>) {
  platformFoundationContext.auditLog.append({
    actorUserId,
    action,
    scope: "home",
    severity: "info",
    details,
  });
}

function requireUserId(userId: string) {
  const normalized = String(userId ?? "").trim();
  if (!normalized) {
    throw new Error("userId is required");
  }
  return normalized;
}

export function createHomeKernelRouter() {
  const router = Router();

  router.get("/:userId/state", (req, res) => {
    const userId = requireUserId(req.params.userId);
    res.json({
      ok: true,
      state: homeKernelContext.kernel.getState(userId),
    });
  });

  router.get("/:userId/manifest", (req, res) => {
    const userId = requireUserId(req.params.userId);
    res.json({
      ok: true,
      manifest: homeKernelContext.kernel.getManifest(userId),
    });
  });

  router.get("/:userId/widgets", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const state = homeKernelContext.kernel.getState(userId);
    res.json({
      ok: true,
      widgets: state.widgets,
      visibleWidgets: state.visibleWidgets,
      hiddenWidgets: state.hiddenWidgets,
      availability: state.availability,
    });
  });

  router.get("/:userId/defaults", (_req, res) => {
    res.json({
      ok: true,
      defaults: createHomeLayoutDefaults(),
    });
  });

  router.patch("/:userId/edit-mode", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.setEditMode(
      userId,
      Boolean(req.body?.enabled),
    );

    audit(userId, "home_edit_mode_updated", {
      enabled: layout.editMode,
    });

    res.json({ ok: true, layout });
  });

  router.put("/:userId/layout", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.updateLayout(
      userId,
      (req.body ?? {}) as UpdateHomeLayoutInput,
    );

    audit(userId, "home_layout_updated", {
      widgetOrder: layout.widgetOrder,
      hiddenCardIds: layout.hiddenCardIds,
      pinnedMiniAppIds: layout.pinnedMiniAppIds,
    });

    res.json({ ok: true, layout });
  });

  router.put("/:userId/dock", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.setDockItems(
      userId,
      Array.isArray(req.body) ? (req.body as HomeDockItem[]) : [],
    );

    audit(userId, "home_dock_updated", {
      dockItems: layout.dockItems.map((item) => item.id),
    });

    res.json({ ok: true, dockItems: layout.dockItems, layout });
  });

  router.put("/:userId/theme", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.setTheme(
      userId,
      (req.body ?? {}) as Partial<HomeThemeState>,
    );

    audit(userId, "home_theme_updated", {
      appearance: layout.theme.appearance,
      backgroundPreset: layout.theme.backgroundPreset,
      accentColor: layout.theme.accentColor,
    });

    res.json({ ok: true, theme: layout.theme, layout });
  });

  router.put("/:userId/quick-actions", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.setQuickActions(
      userId,
      Array.isArray(req.body) ? (req.body as HomeQuickAction[]) : [],
    );

    audit(userId, "home_quick_actions_updated", {
      count: layout.quickActions.length,
    });

    res.json({ ok: true, quickActions: layout.quickActions, layout });
  });

  router.put("/:userId/account-snapshot", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.setAccountSnapshot(
      userId,
      (req.body ?? {}) as Partial<HomeAccountSnapshot>,
    );

    audit(userId, "home_account_snapshot_updated", {
      displayName: layout.accountSnapshot.displayName,
      premiumPlan: layout.accountSnapshot.premiumPlan,
      unreadCount: layout.accountSnapshot.unreadCount,
    });

    res.json({ ok: true, accountSnapshot: layout.accountSnapshot, layout });
  });

  router.post("/:userId/account-snapshot/sync", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.syncAccountSnapshot(userId);

    audit(userId, "home_account_snapshot_synced", {
      unreadCount: layout.accountSnapshot.unreadCount,
      premiumPlan: layout.accountSnapshot.premiumPlan,
    });

    res.status(201).json({ ok: true, accountSnapshot: layout.accountSnapshot, layout });
  });

  router.post("/:userId/widgets/register", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const widgets = homeKernelContext.kernel.registerWidgets(
      Array.isArray(req.body) ? (req.body as HomeWidgetDefinition[]) : [],
    );

    audit(userId, "home_widgets_registered", {
      count: widgets.length,
    });

    res.status(201).json({ ok: true, widgets });
  });

  router.put("/:userId/widgets/:widgetId/visibility", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const widgetId = String(req.params.widgetId ?? "").trim();
    const visible = Boolean(req.body?.visible);
    const layout = visible
      ? homeKernelContext.kernel.showCard(userId, widgetId)
      : homeKernelContext.kernel.hideCard(userId, widgetId);

    audit(userId, "home_widget_visibility_updated", {
      widgetId,
      visible,
    });

    res.json({ ok: true, hiddenCardIds: layout.hiddenCardIds, layout });
  });

  router.post("/:userId/pinned-mini-apps", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const miniAppId = String(req.body?.miniAppId ?? "").trim();
    const layout = homeKernelContext.kernel.pinMiniApp(userId, miniAppId);

    audit(userId, "home_mini_app_pinned", { miniAppId });

    res.status(201).json({ ok: true, pinnedMiniAppIds: layout.pinnedMiniAppIds, layout });
  });

  router.delete("/:userId/pinned-mini-apps/:miniAppId", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.unpinMiniApp(
      userId,
      req.params.miniAppId,
    );

    audit(userId, "home_mini_app_unpinned", {
      miniAppId: req.params.miniAppId,
    });

    res.json({ ok: true, pinnedMiniAppIds: layout.pinnedMiniAppIds, layout });
  });

  router.post("/:userId/hidden-cards/:cardId", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.hideCard(userId, req.params.cardId);

    audit(userId, "home_card_hidden", {
      cardId: req.params.cardId,
    });

    res.status(201).json({ ok: true, hiddenCardIds: layout.hiddenCardIds, layout });
  });

  router.delete("/:userId/hidden-cards/:cardId", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.showCard(userId, req.params.cardId);

    audit(userId, "home_card_restored", {
      cardId: req.params.cardId,
    });

    res.json({ ok: true, hiddenCardIds: layout.hiddenCardIds, layout });
  });

  router.post("/:userId/reset", (req, res) => {
    const userId = requireUserId(req.params.userId);
    const layout = homeKernelContext.kernel.reset(userId);

    audit(userId, "home_layout_reset", {
      dockItems: layout.dockItems.map((item) => item.id),
      quickActions: layout.quickActions.map((item) => item.id),
    });

    res.status(201).json({ ok: true, layout });
  });

  return router;
}
