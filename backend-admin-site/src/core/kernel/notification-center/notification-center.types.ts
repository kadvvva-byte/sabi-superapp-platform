export type NotificationCategory =
  | "messenger"
  | "wallet"
  | "business"
  | "merchant"
  | "ai"
  | "marketplace"
  | "stream"
  | "games"
  | "gallery"
  | "security"
  | "system";

export type NotificationPriority = "low" | "normal" | "high" | "critical";

export type UnifiedNotification = {
  id: string;
  userId: string;
  category: NotificationCategory;
  title: string;
  body: string;
  createdAt: string;
  priority: NotificationPriority;
  readAt?: string;
  data?: Record<string, unknown>;
};

export type NotificationPreferences = {
  userId: string;
  quietModeEnabled: boolean;
  channels: Record<NotificationCategory, { push: boolean; inApp: boolean; email: boolean }>;
};
