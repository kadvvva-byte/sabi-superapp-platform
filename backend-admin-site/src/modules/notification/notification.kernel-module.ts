import type { SuperAppModule } from "../../core/kernel/module.interface";
import { platformFoundationContext } from "../../core/kernel/platform";

export class UnifiedNotificationsKernelModule implements SuperAppModule {
  readonly name = "notifications";
  readonly dependsOn = ["platform-foundation"] as const;

  async init() {
    platformFoundationContext.featureFlags.registerMany([{
      key: "notifications.foundation.ready",
      enabled: true,
      description: "Unified notifications foundation is enabled and routable.",
    }]);

    platformFoundationContext.healthChecks.register({
      name: "unified_notifications_foundation",
      critical: true,
      check: async () => ({
        status: "pass",
        details: {
          categories: platformFoundationContext.notifications.getManifest().categories.length,
          priorities: platformFoundationContext.notifications.getManifest().priorities.length,
        },
      }),
    });

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "notifications_foundation_initialized",
      scope: "notifications",
      severity: "info",
    });
  }

  async start() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "notifications_foundation_started",
      scope: "notifications",
      severity: "info",
    });
  }

  async stop() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "notifications_foundation_stopped",
      scope: "notifications",
      severity: "warning",
    });
  }
}
