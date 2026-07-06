import { randomUUID } from "crypto";
import type { ComplianceQueueItem, ComplianceQueueKind } from "./admin.types";

export class ComplianceQueueService {
  private readonly storage = new Map<ComplianceQueueKind, ComplianceQueueItem[]>([
    ["kyc", []],
    ["kyb", []],
  ]);

  enqueue(kind: ComplianceQueueKind, input: Omit<ComplianceQueueItem, "id" | "createdAt" | "status" | "kind">) {
    const entity: ComplianceQueueItem = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      kind,
      ...input,
    };

    const current = this.storage.get(kind) ?? [];
    this.storage.set(kind, [entity, ...current]);
    return entity;
  }

  list(kind: ComplianceQueueKind) {
    return [...(this.storage.get(kind) ?? [])];
  }
}
