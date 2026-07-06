import { randomUUID } from "crypto";
import type { UnifiedNotification } from "./notification-center.types";

export class UnifiedNotificationCenterService {
  private readonly storage = new Map<string, UnifiedNotification[]>();

  publish(input: Omit<UnifiedNotification, "id" | "createdAt">) {
    const entity: UnifiedNotification = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
    };

    const list = this.storage.get(input.userId) ?? [];
    this.storage.set(input.userId, [entity, ...list]);
    return entity;
  }

  list(userId: string) {
    return this.storage.get(userId) ?? [];
  }

  markRead(userId: string, notificationId: string) {
    const list = this.storage.get(userId) ?? [];
    const next = list.map((item) =>
      item.id === notificationId && !item.readAt
        ? { ...item, readAt: new Date().toISOString() }
        : item,
    );
    this.storage.set(userId, next);
    return next.find((item) => item.id === notificationId);
  }

  getBadgeCount(userId: string) {
    return (this.storage.get(userId) ?? []).filter((item) => !item.readAt).length;
  }
}
