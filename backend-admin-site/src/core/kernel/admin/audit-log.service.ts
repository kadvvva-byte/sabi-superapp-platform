import { randomUUID } from "crypto";
import type { AuditLogEntry } from "./admin.types";

export class AdminAuditLogService {
  private readonly storage: AuditLogEntry[] = [];

  append(entry: Omit<AuditLogEntry, "id" | "createdAt">) {
    const entity: AuditLogEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...entry,
    };

    this.storage.unshift(entity);
    return entity;
  }

  list() {
    return [...this.storage];
  }
}
