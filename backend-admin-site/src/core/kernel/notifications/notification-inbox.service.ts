import { randomUUID } from "crypto";
import { buildEmptyBadgeSnapshot } from "./notifications.defaults";
import {
  NOTIFICATION_CATEGORIES,
  type UnifiedNotification,
  type UnifiedNotificationBadgeSnapshot,
  type UnifiedNotificationEventContract,
  type UnifiedNotificationRoutingDecision,
} from "./notifications.types";

export class UnifiedNotificationInboxService {
  private readonly storage = new Map<string, UnifiedNotification[]>();

  store(
    event: UnifiedNotificationEventContract,
    routing: UnifiedNotificationRoutingDecision,
  ): UnifiedNotification | null {
    if (!routing.shouldStoreInInbox) {
      return null;
    }

    const entity: UnifiedNotification = {
      id: randomUUID(),
      userId: event.recipientUserId,
      category: event.category,
      sourceModule: event.sourceModule,
      eventType: event.eventType,
      title: event.title,
      body: event.body,
      priority: event.priority,
      createdAt: new Date().toISOString(),
      data: event.data,
      routing,
    };

    const current = this.storage.get(event.recipientUserId) ?? [];
    this.storage.set(event.recipientUserId, [entity, ...current]);
    return entity;
  }

  list(userId: string) {
    return this.storage.get(userId) ?? [];
  }

  markRead(userId: string, notificationId: string) {
    const current = this.list(userId);
    let updated: UnifiedNotification | null = null;

    const next = current.map((item) => {
      if (item.id !== notificationId || item.readAt) {
        return item;
      }

      updated = {
        ...item,
        readAt: new Date().toISOString(),
      };
      return updated;
    });

    this.storage.set(userId, next);
    return updated;
  }

  markAllRead(userId: string) {
    const current = this.list(userId);
    const timestamp = new Date().toISOString();
    const next = current.map((item) =>
      item.readAt ? item : { ...item, readAt: timestamp },
    );
    this.storage.set(userId, next);
    return next;
  }

  getBadgeSnapshot(userId: string): UnifiedNotificationBadgeSnapshot {
    const current = this.list(userId);
    const snapshot = buildEmptyBadgeSnapshot(userId);

    for (const item of current) {
      if (item.readAt) {
        continue;
      }

      snapshot.unreadTotal += 1;
      snapshot.unreadByCategory[item.category] += 1;

      if (item.priority === "critical") {
        snapshot.criticalUnread += 1;
      }
    }

    for (const category of NOTIFICATION_CATEGORIES) {
      snapshot.unreadByCategory[category] ??= 0;
    }

    return snapshot;
  }
}
