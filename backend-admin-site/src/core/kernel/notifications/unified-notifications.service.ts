import {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_DELIVERY_CHANNELS,
  NOTIFICATION_LOCK_SCREEN_POLICIES,
  NOTIFICATION_PRIORITIES,
  type NotificationCategory,
  type UnifiedNotificationEventContract,
} from "./notifications.types";
import { UnifiedNotificationInboxService } from "./notification-inbox.service";
import { UnifiedNotificationPreferencesService } from "./notification-preferences.service";
import { UnifiedNotificationRoutingService } from "./notification-routing.service";

export class UnifiedNotificationsService {
  constructor(
    private readonly inbox = new UnifiedNotificationInboxService(),
    private readonly preferences = new UnifiedNotificationPreferencesService(),
    private readonly routing = new UnifiedNotificationRoutingService(),
  ) {}

  getManifest() {
    return {
      categories: NOTIFICATION_CATEGORIES,
      priorities: NOTIFICATION_PRIORITIES,
      channels: NOTIFICATION_DELIVERY_CHANNELS,
      lockScreenPolicies: NOTIFICATION_LOCK_SCREEN_POLICIES,
    };
  }

  publish(event: UnifiedNotificationEventContract) {
    const preferences = this.preferences.get(event.recipientUserId);
    const routing = this.routing.resolve(event, preferences);
    const notification = this.inbox.store(event, routing);

    return {
      notification,
      routing,
      badge: this.inbox.getBadgeSnapshot(event.recipientUserId),
      preferences,
    };
  }

  previewRouting(event: UnifiedNotificationEventContract) {
    const preferences = this.preferences.get(event.recipientUserId);
    return {
      preferences,
      routing: this.routing.resolve(event, preferences),
    };
  }

  listInbox(userId: string) {
    return this.inbox.list(userId);
  }

  getPreferences(userId: string) {
    return this.preferences.get(userId);
  }

  updatePreferences(
    userId: string,
    patch: Parameters<UnifiedNotificationPreferencesService["update"]>[1],
  ) {
    return this.preferences.update(userId, patch);
  }

  updateCategoryPreferences(
    userId: string,
    category: NotificationCategory,
    patch: Parameters<UnifiedNotificationPreferencesService["updateCategoryPreferences"]>[2],
  ) {
    return this.preferences.updateCategoryPreferences(userId, category, patch);
  }

  updateSubscriptions(
    userId: string,
    subscriptions: Parameters<UnifiedNotificationPreferencesService["replaceSubscriptions"]>[1],
  ) {
    return this.preferences.replaceSubscriptions(userId, subscriptions);
  }

  markRead(userId: string, notificationId: string) {
    return this.inbox.markRead(userId, notificationId);
  }

  markAllRead(userId: string) {
    return this.inbox.markAllRead(userId);
  }

  getBadgeSnapshot(userId: string) {
    return this.inbox.getBadgeSnapshot(userId);
  }
}
