import type { FeatureFlagDefinition } from "./admin.types";

export class AdminFeatureFlagService {
  private readonly storage = new Map<string, FeatureFlagDefinition>();

  registerMany(flags: readonly FeatureFlagDefinition[]) {
    for (const flag of flags) {
      this.storage.set(flag.key, flag);
    }
  }

  getAll() {
    return Array.from(this.storage.values());
  }

  isEnabled(key: string) {
    return this.storage.get(key)?.enabled ?? false;
  }

  setEnabled(key: string, enabled: boolean) {
    const existing = this.storage.get(key);
    if (!existing) {
      throw new Error(`Unknown feature flag: ${key}`);
    }

    const next = { ...existing, enabled };
    this.storage.set(key, next);
    return next;
  }
}
