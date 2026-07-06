import { randomUUID } from "crypto";
import type { FraudReviewItem } from "./admin.types";

export class FraudReviewService {
  private readonly storage: FraudReviewItem[] = [];

  enqueue(input: Omit<FraudReviewItem, "id" | "createdAt" | "status">) {
    const entity: FraudReviewItem = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      ...input,
    };

    this.storage.unshift(entity);
    return entity;
  }

  list() {
    return [...this.storage];
  }
}
