import { AccessPolicyService } from "../access";
import {
  AdminAuditLogService,
  AdminFeatureFlagService,
  ComplianceQueueService,
  FraudReviewService,
  ModerationQueueService,
  SystemOperationsService,
  WalletWatchAlertService,
} from "../admin";
import { IdentityFoundationService } from "../identity";
import { KernelModuleRegistryService } from "../module-registry";
import { HealthCheckService, RuntimeConfigService } from "../mobile-bootstrap";
import { UnifiedNotificationsService } from "../notifications";
import { PremiumEntitlementService } from "../premium";

export function createPlatformFoundationContext() {
  const featureFlags = new AdminFeatureFlagService();
  featureFlags.registerMany([
    {
      key: "platform.foundation.ready",
      enabled: true,
      description: "Step 1 platform foundation is wired and booted.",
    },
    {
      key: "ai.realtime.translation.premium",
      enabled: true,
      description: "AI realtime translation is gated by premium entitlements.",
    },
    {
      key: "profile.languages.foundation",
      enabled: true,
      description: "Shared language and mobile country-code foundation is enabled.",
    },
  ]);

  const moduleRegistry = new KernelModuleRegistryService();
  moduleRegistry.register("platform-foundation", { phase: "foundation" });
  moduleRegistry.register("home-kernel", { phase: "foundation" });
  moduleRegistry.register("notifications-kernel", { phase: "foundation" });
  moduleRegistry.register("ai-kernel", { phase: "foundation" });

  return {
    identity: new IdentityFoundationService(),
    access: new AccessPolicyService(),
    premium: new PremiumEntitlementService(),
    notifications: new UnifiedNotificationsService(),
    auditLog: new AdminAuditLogService(),
    featureFlags,
    moderationQueue: new ModerationQueueService(),
    fraudReview: new FraudReviewService(),
    complianceQueue: new ComplianceQueueService(),
    walletWatchAlerts: new WalletWatchAlertService(),
    systemOperations: new SystemOperationsService(),
    runtimeConfig: new RuntimeConfigService(),
    healthChecks: new HealthCheckService(),
    moduleRegistry,
  };
}

export type PlatformFoundationContext = ReturnType<typeof createPlatformFoundationContext>;

export const platformFoundationContext = createPlatformFoundationContext();
