import { randomUUID } from "crypto";
import type { ModerationQueueItem } from "./admin.types";

export class ModerationQueueService {
  private readonly storage: ModerationQueueItem[] = [];

  enqueue(input: Omit<ModerationQueueItem, "id" | "createdAt" | "status">) {
    const item: ModerationQueueItem = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      ...input,
    };

    this.storage.unshift(item);
    return item;
  }

  list() {
    return [...this.storage];
  }
}
