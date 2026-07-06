import { Router } from "express";
import { platformFoundationContext } from "../../../../core/kernel/platform";
import {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_LOCK_SCREEN_POLICIES,
  NOTIFICATION_PRIORITIES,
} from "../../../../core/kernel/notifications";
import type {
  NotificationCategory,
  NotificationLockScreenPolicy,
  NotificationPriority,
} from "../../../../core/kernel/notifications";

const categories = new Set<string>(NOTIFICATION_CATEGORIES);
const priorities = new Set<string>(NOTIFICATION_PRIORITIES);
const lockPolicies = new Set<string>(NOTIFICATION_LOCK_SCREEN_POLICIES);

function normalizeCategory(value: unknown): NotificationCategory {
  const candidate = String(value ?? "system").trim().toLowerCase();
  return categories.has(candidate) ? (candidate as NotificationCategory) : "system";
}

function normalizePriority(value: unknown): NotificationPriority {
  const candidate = String(value ?? "normal").trim().toLowerCase();
  return priorities.has(candidate) ? (candidate as NotificationPriority) : "normal";
}

function normalizeLockScreenPolicy(value: unknown): NotificationLockScreenPolicy | undefined {
  if (value == null) {
    return undefined;
  }

  const candidate = String(value).trim().toLowerCase();
  return lockPolicies.has(candidate)
    ? (candidate as NotificationLockScreenPolicy)
    : undefined;
}

export function createUnifiedNotificationsRouter() {
  const router = Router();

  router.get("/manifest", (_req, res) => {
    res.json({
      ok: true,
      manifest: platformFoundationContext.notifications.getManifest(),
    });
  });

  router.get("/:userId/inbox", (req, res) => {
    const { userId } = req.params;
    res.json({
      ok: true,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(userId),
      preferences: platformFoundationContext.notifications.getPreferences(userId),
      items: platformFoundationContext.notifications.listInbox(userId),
    });
  });

  router.get("/:userId/preferences", (req, res) => {
    res.json({
      ok: true,
      preferences: platformFoundationContext.notifications.getPreferences(req.params.userId),
    });
  });

  router.patch("/:userId/preferences", (req, res) => {
    const { userId } = req.params;
    const preferences = platformFoundationContext.notifications.updatePreferences(userId, {
      quietModeEnabled: req.body?.quietModeEnabled,
      quietHours: req.body?.quietHours,
      lockScreenPolicy: normalizeLockScreenPolicy(req.body?.lockScreenPolicy),
      globalChannels: req.body?.globalChannels,
      modules: req.body?.modules,
      subscriptions: req.body?.subscriptions,
    });

    platformFoundationContext.auditLog.append({
      actorUserId: String(req.body?.actorUserId ?? userId),
      action: "notifications_preferences_updated",
      scope: "notifications",
      severity: "info",
      details: { userId },
    });

    res.json({ ok: true, preferences });
  });

  router.patch("/:userId/categories/:category", (req, res) => {
    const { userId } = req.params;
    const category = normalizeCategory(req.params.category);
    const preferences = platformFoundationContext.notifications.updateCategoryPreferences(
      userId,
      category,
      {
        enabled: req.body?.enabled,
        channels: req.body?.channels,
      },
    );

    res.json({ ok: true, preferences, category });
  });

  router.put("/:userId/subscriptions", (req, res) => {
    const { userId } = req.params;
    const subscriptions = platformFoundationContext.notifications.updateSubscriptions(
      userId,
      req.body ?? {},
    );

    res.json({ ok: true, subscriptions: subscriptions.subscriptions });
  });

  router.get("/:userId/badges", (req, res) => {
    res.json({
      ok: true,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(req.params.userId),
    });
  });

  router.post("/routing/preview", (req, res) => {
    const preview = platformFoundationContext.notifications.previewRouting({
      recipientUserId: String(req.body?.recipientUserId ?? "unknown"),
      category: normalizeCategory(req.body?.category),
      sourceModule: String(req.body?.sourceModule ?? normalizeCategory(req.body?.category)),
      eventType: String(req.body?.eventType ?? "notification.preview"),
      title: String(req.body?.title ?? "Preview"),
      body: String(req.body?.body ?? "Preview notification"),
      priority: normalizePriority(req.body?.priority),
      data: req.body?.data,
      requestedChannels: req.body?.requestedChannels,
      respectQuietMode: req.body?.respectQuietMode,
    });

    res.json({ ok: true, ...preview });
  });

  router.post("/:userId/publish", (req, res) => {
    const { userId } = req.params;
    const result = platformFoundationContext.notifications.publish({
      recipientUserId: userId,
      category: normalizeCategory(req.body?.category),
      sourceModule: String(req.body?.sourceModule ?? normalizeCategory(req.body?.category)),
      eventType: String(req.body?.eventType ?? "notification.manual"),
      title: String(req.body?.title ?? "Notification"),
      body: String(req.body?.body ?? ""),
      priority: normalizePriority(req.body?.priority),
      data: req.body?.data,
      requestedChannels: req.body?.requestedChannels,
      respectQuietMode: req.body?.respectQuietMode,
    });

    platformFoundationContext.auditLog.append({
      actorUserId: String(req.body?.actorUserId ?? userId),
      action: "unified_notification_published",
      scope: "notifications",
      severity: result.routing.deliveryChannels.includes("push") ? "info" : "warning",
      details: {
        userId,
        category: normalizeCategory(req.body?.category),
        channels: result.routing.deliveryChannels,
        suppressedReasons: result.routing.suppressedReasons,
      },
    });

    res.status(201).json({ ok: true, ...result });
  });

  router.post("/:userId/:notificationId/read", (req, res) => {
    const { userId, notificationId } = req.params;
    const notification = platformFoundationContext.notifications.markRead(userId, notificationId);
    res.json({
      ok: Boolean(notification),
      notification,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(userId),
    });
  });

  router.post("/:userId/read-all", (req, res) => {
    const { userId } = req.params;
    const items = platformFoundationContext.notifications.markAllRead(userId);
    res.json({
      ok: true,
      items,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(userId),
    });
  });

  return router;
}
