import { Router } from "express";
import { APP_LANGUAGES } from "../../../shared/data/languages";
import { COUNTRIES } from "../../../shared/data/countries";
import { MOBILE_COUNTRY_CODES } from "../../../shared/data/mobile-country-codes";
import { PREMIUM_FEATURE_CATALOG } from "../premium";
import { NOTIFICATION_CATEGORIES, NOTIFICATION_LOCK_SCREEN_POLICIES, NOTIFICATION_PRIORITIES } from "../notifications";
import { platformFoundationContext } from "./platform-foundation.context";

const PREMIUM_PLANS = ["FREE", "PREMIUM", "BUSINESS_PREMIUM", "ADMIN"] as const;

function normalizePlan(value: unknown) {
  const candidate = String(value ?? "FREE").trim().toUpperCase();
  return PREMIUM_PLANS.includes(candidate as (typeof PREMIUM_PLANS)[number])
    ? (candidate as (typeof PREMIUM_PLANS)[number])
    : "FREE";
}

function normalizeBoolean(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off"].includes(normalized)) return false;
  }
  return fallback;
}

export function createPlatformFoundationRouter() {
  const router = Router();


  router.get("/modules", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.moduleRegistry.list(),
    });
  });

  router.get("/bootstrap/config", (_req, res) => {
    res.json({
      ok: true,
      config: platformFoundationContext.runtimeConfig.getPublicConfig(),
    });
  });

  router.get("/bootstrap/health", async (_req, res) => {
    const checks = await platformFoundationContext.healthChecks.runAll();

    res.json({
      ok: checks.every((item) => item.status !== "fail" || !item.critical),
      checks,
    });
  });

  router.get("/bootstrap/languages", (_req, res) => {
    res.json({
      ok: true,
      count: APP_LANGUAGES.length,
      items: APP_LANGUAGES,
    });
  });

  router.get("/bootstrap/countries", (_req, res) => {
    res.json({
      ok: true,
      count: COUNTRIES.length,
      items: COUNTRIES,
    });
  });

  router.get("/bootstrap/mobile-country-codes", (_req, res) => {
    res.json({
      ok: true,
      count: MOBILE_COUNTRY_CODES.length,
      items: MOBILE_COUNTRY_CODES,
    });
  });

  router.post("/identity/owner-binding/preview", (req, res) => {
    const binding = platformFoundationContext.identity.createOwnerBinding(req.body);

    res.json({
      ok: true,
      binding,
    });
  });

  router.post("/identity/qr-envelope/preview", (req, res) => {
    const envelope = platformFoundationContext.identity.createQrExecutionEnvelope(req.body);

    res.json({
      ok: true,
      envelope,
    });
  });

  router.post("/access/check", (req, res) => {
    const decision = platformFoundationContext.access.can(req.body);

    res.json({
      ok: true,
      decision,
    });
  });

  router.get("/premium/catalog", (_req, res) => {
    res.json({
      ok: true,
      items: PREMIUM_FEATURE_CATALOG,
    });
  });

  router.get("/premium/entitlements/:userId", (req, res) => {
    const entitlement = platformFoundationContext.premium.buildState({
      userId: req.params.userId,
      plan: normalizePlan(req.query.plan),
      active: normalizeBoolean(req.query.active, normalizePlan(req.query.plan) !== "FREE"),
    });

    res.json({
      ok: true,
      entitlement,
    });
  });

  router.get("/notifications/:userId", (req, res) => {
    const { userId } = req.params;

    res.json({
      ok: true,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(userId),
      preferences: platformFoundationContext.notifications.getPreferences(userId),
      items: platformFoundationContext.notifications.listInbox(userId),
      manifest: platformFoundationContext.notifications.getManifest(),
    });
  });

  router.get("/notifications/catalog", (_req, res) => {
    res.json({
      ok: true,
      manifest: platformFoundationContext.notifications.getManifest(),
    });
  });

  router.post("/notifications/:userId", (req, res) => {
    const { userId } = req.params;
    const category = NOTIFICATION_CATEGORIES.includes(req.body.category)
      ? req.body.category
      : "system";
    const priority = NOTIFICATION_PRIORITIES.includes(req.body.priority)
      ? req.body.priority
      : "normal";

    const result = platformFoundationContext.notifications.publish({
      recipientUserId: userId,
      category,
      sourceModule: String(req.body.sourceModule ?? category),
      eventType: String(req.body.eventType ?? "platform.notification"),
      title: String(req.body.title ?? "Notification"),
      body: String(req.body.body ?? ""),
      priority,
      data: req.body.data,
      requestedChannels: req.body.requestedChannels,
      respectQuietMode: req.body.respectQuietMode,
    });

    platformFoundationContext.auditLog.append({
      actorUserId: userId,
      action: "notification_published",
      scope: "notifications",
      severity: priority === "critical" ? "critical" : "info",
      details: {
        category,
        notificationId: result.notification?.id,
        channels: result.routing.deliveryChannels,
      },
    });

    res.status(201).json({
      ok: true,
      ...result,
    });
  });

  router.patch("/notifications/:userId/preferences", (req, res) => {
    const { userId } = req.params;
    const preferences = platformFoundationContext.notifications.updatePreferences(userId, {
      quietModeEnabled: req.body?.quietModeEnabled,
      quietHours: req.body?.quietHours,
      lockScreenPolicy: NOTIFICATION_LOCK_SCREEN_POLICIES.includes(req.body?.lockScreenPolicy)
        ? req.body.lockScreenPolicy
        : undefined,
      globalChannels: req.body?.globalChannels,
      modules: req.body?.modules,
      subscriptions: req.body?.subscriptions,
    });

    res.json({
      ok: true,
      preferences,
    });
  });

  router.post("/notifications/:userId/:notificationId/read", (req, res) => {
    const { userId, notificationId } = req.params;
    const notification = platformFoundationContext.notifications.markRead(
      userId,
      notificationId,
    );

    res.json({
      ok: Boolean(notification),
      notification,
      badge: platformFoundationContext.notifications.getBadgeSnapshot(userId),
    });
  });

  router.get("/admin/feature-flags", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.featureFlags.getAll(),
    });
  });

  router.post("/admin/feature-flags/:key", (req, res) => {
    const flag = platformFoundationContext.featureFlags.setEnabled(
      req.params.key,
      normalizeBoolean(req.body?.enabled, false),
    );

    platformFoundationContext.auditLog.append({
      actorUserId: String(req.body?.actorUserId ?? "system"),
      action: "feature_flag_updated",
      scope: "admin",
      severity: "warning",
      details: {
        key: flag.key,
        enabled: flag.enabled,
      },
    });

    res.json({
      ok: true,
      flag,
    });
  });

  router.get("/admin/audit-log", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.auditLog.list(),
    });
  });

  router.get("/admin/moderation-queue", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.moderationQueue.list(),
    });
  });

  router.post("/admin/moderation-queue", (req, res) => {
    const item = platformFoundationContext.moderationQueue.enqueue({
      targetType: String(req.body.targetType ?? "unknown"),
      targetId: String(req.body.targetId ?? "unknown"),
      reason: String(req.body.reason ?? "manual_review"),
    });

    platformFoundationContext.auditLog.append({
      actorUserId: String(req.body?.actorUserId ?? "system"),
      action: "moderation_item_enqueued",
      scope: "admin",
      severity: "warning",
      details: {
        moderationItemId: item.id,
        targetType: item.targetType,
        targetId: item.targetId,
      },
    });

    res.status(201).json({
      ok: true,
      item,
    });
  });


  router.get("/admin/fraud-review", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.fraudReview.list(),
    });
  });

  router.post("/admin/fraud-review", (req, res) => {
    const item = platformFoundationContext.fraudReview.enqueue({
      entityType: String(req.body?.entityType ?? "unknown"),
      entityId: String(req.body?.entityId ?? "unknown"),
      signal: String(req.body?.signal ?? "manual_flag"),
      severity: req.body?.severity === "critical" ? "critical" : req.body?.severity === "warning" ? "warning" : "info",
      details: req.body?.details,
    });

    res.status(201).json({ ok: true, item });
  });

  router.get("/admin/compliance/kyc", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.complianceQueue.list("kyc"),
    });
  });

  router.post("/admin/compliance/kyc", (req, res) => {
    const item = platformFoundationContext.complianceQueue.enqueue("kyc", {
      subjectUserId: String(req.body?.subjectUserId ?? "unknown"),
      subjectType: req.body?.subjectType === "business" ? "business" : req.body?.subjectType === "merchant" ? "merchant" : "user",
      reason: String(req.body?.reason ?? "manual_review"),
      details: req.body?.details,
    });

    res.status(201).json({ ok: true, item });
  });

  router.get("/admin/compliance/kyb", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.complianceQueue.list("kyb"),
    });
  });

  router.post("/admin/compliance/kyb", (req, res) => {
    const item = platformFoundationContext.complianceQueue.enqueue("kyb", {
      subjectUserId: String(req.body?.subjectUserId ?? "unknown"),
      subjectType: req.body?.subjectType === "merchant" ? "merchant" : "business",
      reason: String(req.body?.reason ?? "manual_review"),
      details: req.body?.details,
    });

    res.status(201).json({ ok: true, item });
  });

  router.get("/admin/wallet-watch-alerts", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.walletWatchAlerts.list(),
    });
  });

  router.post("/admin/wallet-watch-alerts", (req, res) => {
    const item = platformFoundationContext.walletWatchAlerts.create({
      walletOwnerUserId: String(req.body?.walletOwnerUserId ?? "unknown"),
      walletType: req.body?.walletType === "business" ? "business" : req.body?.walletType === "merchant" ? "merchant" : req.body?.walletType === "coin" ? "coin" : req.body?.walletType === "crypto" ? "crypto" : "personal",
      reason: String(req.body?.reason ?? "watch_alert"),
      details: req.body?.details,
    });

    res.status(201).json({ ok: true, item });
  });

  router.get("/admin/system-operations", (_req, res) => {
    res.json({
      ok: true,
      items: platformFoundationContext.systemOperations.list(),
    });
  });

  router.post("/admin/system-operations", (req, res) => {
    const item = platformFoundationContext.systemOperations.issue({
      operation: String(req.body?.operation ?? "maintenance_check"),
      requestedBy: String(req.body?.requestedBy ?? "system"),
      details: req.body?.details,
    });

    res.status(201).json({ ok: true, item });
  });

  return router;
}
