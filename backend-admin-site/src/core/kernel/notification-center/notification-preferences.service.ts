import type { NotificationCategory, NotificationPreferences } from "./notification-center.types";

const categories: NotificationCategory[] = [
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
];

function buildDefaultChannels() {
  return categories.reduce((acc, category) => {
    acc[category] = { push: true, inApp: true, email: false };
    return acc;
  }, {} as NotificationPreferences["channels"]);
}

export class NotificationPreferencesService {
  private readonly storage = new Map<string, NotificationPreferences>();

  get(userId: string): NotificationPreferences {
    const existing = this.storage.get(userId);
    if (existing) return existing;

    const created: NotificationPreferences = {
      userId,
      quietModeEnabled: false,
      channels: buildDefaultChannels(),
    };

    this.storage.set(userId, created);
    return created;
  }

  update(userId: string, patch: Partial<NotificationPreferences>) {
    const current = this.get(userId);
    const next: NotificationPreferences = {
      ...current,
      ...patch,
      userId,
      channels: patch.channels ? { ...current.channels, ...patch.channels } : current.channels,
    };

    this.storage.set(userId, next);
    return next;
  }
}
