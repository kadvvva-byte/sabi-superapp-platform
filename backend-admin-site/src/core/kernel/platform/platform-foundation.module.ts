import type { SuperAppModule } from "../module.interface";
import { platformFoundationContext } from "./platform-foundation.context";

export class PlatformFoundationKernelModule implements SuperAppModule {
  readonly name = "platform-foundation";

  async init() {
    platformFoundationContext.moduleRegistry.mark(this.name, "initialized", {
      metadata: { phase: "foundation" },
    });

    platformFoundationContext.healthChecks.register({
      name: "platform_foundation",
      critical: true,
      check: async () => ({
        status: "pass",
        details: {
          flags: platformFoundationContext.featureFlags.getAll().length,
          releaseChannel: platformFoundationContext.runtimeConfig.getPublicConfig().releaseChannel,
        },
      }),
    });

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "platform_foundation_initialized",
      scope: "kernel",
      severity: "info",
      details: {
        releaseChannel: platformFoundationContext.runtimeConfig.getPublicConfig().releaseChannel,
      },
    });
  }

  async start() {
    platformFoundationContext.moduleRegistry.mark(this.name, "started", {
      metadata: { phase: "foundation" },
    });

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "platform_foundation_started",
      scope: "kernel",
      severity: "info",
    });
  }

  async stop() {
    platformFoundationContext.moduleRegistry.mark(this.name, "stopped", {
      metadata: { phase: "foundation" },
    });

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "platform_foundation_stopped",
      scope: "kernel",
      severity: "warning",
    });
  }
}
