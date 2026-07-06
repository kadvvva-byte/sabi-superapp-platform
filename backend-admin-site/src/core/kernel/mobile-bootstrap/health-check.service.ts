import type { HealthCheckResult } from "./bootstrap.types";

type HealthCheckRegistration = {
  name: string;
  critical?: boolean;
  check: () => Promise<Omit<HealthCheckResult, "name" | "critical" | "checkedAt">> | Omit<HealthCheckResult, "name" | "critical" | "checkedAt">;
};

export class HealthCheckService {
  private readonly checks = new Map<string, HealthCheckRegistration>();

  register(registration: HealthCheckRegistration) {
    this.checks.set(registration.name, registration);
  }

  async runAll(): Promise<HealthCheckResult[]> {
    const results: HealthCheckResult[] = [];

    for (const registration of this.checks.values()) {
      try {
        const result = await registration.check();
        results.push({
          name: registration.name,
          critical: registration.critical ?? false,
          checkedAt: new Date().toISOString(),
          ...result,
        });
      } catch (error) {
        results.push({
          name: registration.name,
          critical: registration.critical ?? false,
          checkedAt: new Date().toISOString(),
          status: "fail",
          details: {
            error: error instanceof Error ? error.message : "unknown_error",
          },
        });
      }
    }

    return results;
  }
}
