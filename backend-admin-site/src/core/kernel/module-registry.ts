export type KernelModuleLifecycleStatus = "registered" | "initialized" | "started" | "stopped" | "failed";

export type KernelModuleSnapshot = {
  name: string;
  status: KernelModuleLifecycleStatus;
  registeredAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
  lastError?: string;
};

export class KernelModuleRegistryService {
  private readonly storage = new Map<string, KernelModuleSnapshot>();

  register(name: string, metadata?: Record<string, unknown>) {
    const now = new Date().toISOString();
    const entity: KernelModuleSnapshot = {
      name,
      status: "registered",
      registeredAt: now,
      updatedAt: now,
      metadata,
    };

    this.storage.set(name, entity);
    return entity;
  }

  mark(name: string, status: KernelModuleLifecycleStatus, patch?: { metadata?: Record<string, unknown>; lastError?: string }) {
    const existing = this.storage.get(name) ?? this.register(name);
    const next: KernelModuleSnapshot = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
      metadata: patch?.metadata ?? existing.metadata,
      lastError: patch?.lastError,
    };

    this.storage.set(name, next);
    return next;
  }

  list() {
    return Array.from(this.storage.values()).sort((left, right) => left.name.localeCompare(right.name));
  }

  get(name: string) {
    return this.storage.get(name) ?? null;
  }
}
