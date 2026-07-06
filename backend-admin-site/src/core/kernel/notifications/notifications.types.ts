export const NOTIFICATION_CATEGORIES = [
  "messenger",
  "wallet",
  "business",
  "merchant",
  "ai",
  "marketplace",
  "stream",
  "games",
  "gallery",
  "security",
  "system",
] as const;

export const NOTIFICATION_PRIORITIES = ["low", "normal", "high", "critical"] as const;

export const NOTIFICATION_DELIVERY_CHANNELS = [
  "inApp",
  "push",
  "email",
  "sms",
  "lockScreen",
] as const;

export const NOTIFICATION_LOCK_SCREEN_POLICIES = [
  "show_all",
  "hide_sensitive",
  "hide_content",
  "disabled",
] as const;

export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number];
export type NotificationPriority = (typeof NOTIFICATION_PRIORITIES)[number];
export type NotificationDeliveryChannel = (typeof NOTIFICATION_DELIVERY_CHANNELS)[number];
export type NotificationLockScreenPolicy =
  (typeof NOTIFICATION_LOCK_SCREEN_POLICIES)[number];

export type NotificationChannelMap = Record<NotificationDeliveryChannel, boolean>;

export type NotificationModulePreferences = {
  enabled: boolean;
  channels: NotificationChannelMap;
};

export type NotificationSubscriptions = Record<NotificationCategory, boolean>;

export type NotificationQuietHours = {
  enabled: boolean;
  start: string;
  end: string;
  timezone: string;
};

export type UnifiedNotificationPreferences = {
  userId: string;
  quietModeEnabled: boolean;
  quietHours: NotificationQuietHours;
  lockScreenPolicy: NotificationLockScreenPolicy;
  globalChannels: NotificationChannelMap;
  modules: Record<NotificationCategory, NotificationModulePreferences>;
  subscriptions: NotificationSubscriptions;
};

export type UnifiedNotificationEventContract = {
  recipientUserId: string;
  category: NotificationCategory;
  sourceModule: string;
  eventType: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  data?: Record<string, unknown>;
  requestedChannels?: Partial<NotificationChannelMap>;
  respectQuietMode?: boolean;
};

export type UnifiedNotificationRoutingDecision = {
  shouldStoreInInbox: boolean;
  deliveryChannels: NotificationDeliveryChannel[];
  suppressedReasons: string[];
  quietModeApplied: boolean;
  lockScreenPolicy: NotificationLockScreenPolicy;
};

export type UnifiedNotification = {
  id: string;
  userId: string;
  category: NotificationCategory;
  sourceModule: string;
  eventType: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  createdAt: string;
  readAt?: string;
  data?: Record<string, unknown>;
  routing: UnifiedNotificationRoutingDecision;
};

export type UnifiedNotificationBadgeSnapshot = {
  userId: string;
  unreadTotal: number;
  unreadByCategory: Record<NotificationCategory, number>;
  criticalUnread: number;
};

export type UnifiedNotificationManifest = {
  categories: readonly NotificationCategory[];
  priorities: readonly NotificationPriority[];
  channels: readonly NotificationDeliveryChannel[];
  lockScreenPolicies: readonly NotificationLockScreenPolicy[];
};
