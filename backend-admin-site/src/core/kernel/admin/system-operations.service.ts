import { randomUUID } from "crypto";
import type { SystemOperationEntry } from "./admin.types";

export class SystemOperationsService {
  private readonly storage: SystemOperationEntry[] = [];

  issue(input: Omit<SystemOperationEntry, "id" | "createdAt" | "status">) {
    const entity: SystemOperationEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "queued",
      ...input,
    };

    this.storage.unshift(entity);
    return entity;
  }

  list() {
    return [...this.storage];
  }
}
