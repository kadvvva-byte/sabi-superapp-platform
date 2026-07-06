import {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_DELIVERY_CHANNELS,
  type NotificationCategory,
  type NotificationChannelMap,
  type UnifiedNotificationBadgeSnapshot,
  type UnifiedNotificationPreferences,
} from "./notifications.types";

export function buildDefaultChannelMap(): NotificationChannelMap {
  return {
    inApp: true,
    push: true,
    email: false,
    sms: false,
    lockScreen: true,
  };
}

export function buildDefaultSubscriptions() {
  return NOTIFICATION_CATEGORIES.reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {} as Record<NotificationCategory, boolean>);
}

export function buildDefaultModulePreferences() {
  return NOTIFICATION_CATEGORIES.reduce((acc, category) => {
    acc[category] = {
      enabled: true,
      channels: buildDefaultChannelMap(),
    };
    return acc;
  }, {} as UnifiedNotificationPreferences["modules"]);
}

export function buildDefaultNotificationPreferences(
  userId: string,
): UnifiedNotificationPreferences {
  return {
    userId,
    quietModeEnabled: false,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00",
      timezone: "Asia/Tashkent",
    },
    lockScreenPolicy: "hide_sensitive",
    globalChannels: buildDefaultChannelMap(),
    modules: buildDefaultModulePreferences(),
    subscriptions: buildDefaultSubscriptions(),
  };
}

export function buildEmptyBadgeSnapshot(userId: string): UnifiedNotificationBadgeSnapshot {
  const unreadByCategory = NOTIFICATION_CATEGORIES.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {} as Record<NotificationCategory, number>);

  return {
    userId,
    unreadTotal: 0,
    unreadByCategory,
    criticalUnread: 0,
  };
}

export function mergeChannelMaps(
  current: NotificationChannelMap,
  patch?: Partial<NotificationChannelMap>,
): NotificationChannelMap {
  if (!patch) {
    return current;
  }

  return {
    inApp: patch.inApp ?? current.inApp,
    push: patch.push ?? current.push,
    email: patch.email ?? current.email,
    sms: patch.sms ?? current.sms,
    lockScreen: patch.lockScreen ?? current.lockScreen,
  };
}
