import type { SuperAppModule } from "../../core/kernel/module.interface";
import { homeKernelContext } from "../../core/kernel/home";
import { platformFoundationContext } from "../../core/kernel/platform";

export class HomeKernelModule implements SuperAppModule {
  readonly name = "home-kernel";

  async init() {
    platformFoundationContext.healthChecks.register({
      name: "home_kernel",
      critical: false,
      check: async () => ({
        status: "pass",
        details: {
          widgets: homeKernelContext.widgetRegistry.list().length,
          homeKernelReady: platformFoundationContext.featureFlags.isEnabled(
            "home.kernel.ready",
          ),
          manifestEnabled: platformFoundationContext.featureFlags.isEnabled(
            "home.kernel.manifest",
          ),
        },
      }),
    });

    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "home_kernel_initialized",
      scope: "kernel",
      severity: "info",
      details: {
        widgets: homeKernelContext.widgetRegistry.list().length,
      },
    });
  }

  async start() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "home_kernel_started",
      scope: "kernel",
      severity: "info",
    });
  }

  async stop() {
    platformFoundationContext.auditLog.append({
      actorUserId: "system",
      action: "home_kernel_stopped",
      scope: "kernel",
      severity: "warning",
    });
  }
}
