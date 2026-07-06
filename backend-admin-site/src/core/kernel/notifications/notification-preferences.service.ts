import {
  buildDefaultNotificationPreferences,
  mergeChannelMaps,
} from "./notifications.defaults";
import type {
  NotificationCategory,
  UnifiedNotificationPreferences,
  NotificationSubscriptions,
} from "./notifications.types";

export class UnifiedNotificationPreferencesService {
  private readonly storage = new Map<string, UnifiedNotificationPreferences>();

  get(userId: string): UnifiedNotificationPreferences {
    const current = this.storage.get(userId);
    if (current) {
      return current;
    }

    const created = buildDefaultNotificationPreferences(userId);
    this.storage.set(userId, created);
    return created;
  }

  update(
    userId: string,
    patch: Partial<UnifiedNotificationPreferences>,
  ): UnifiedNotificationPreferences {
    const current = this.get(userId);

    const next: UnifiedNotificationPreferences = {
      ...current,
      ...patch,
      userId,
      quietHours: {
        ...current.quietHours,
        ...(patch.quietHours ?? {}),
      },
      globalChannels: mergeChannelMaps(
        current.globalChannels,
        patch.globalChannels,
      ),
      modules: current.modules,
      subscriptions: patch.subscriptions
        ? { ...current.subscriptions, ...patch.subscriptions }
        : current.subscriptions,
    };

    if (patch.modules) {
      const mergedModules: UnifiedNotificationPreferences["modules"] = { ...current.modules };
      for (const [key, value] of Object.entries(patch.modules) as Array<
        [NotificationCategory, UnifiedNotificationPreferences["modules"][NotificationCategory]]
      >) {
        const existing = current.modules[key];
        mergedModules[key] = {
          enabled: value.enabled ?? existing.enabled,
          channels: mergeChannelMaps(existing.channels, value.channels),
        };
      }
      next.modules = mergedModules;
    }

    this.storage.set(userId, next);
    return next;
  }

  updateCategoryPreferences(
    userId: string,
    category: NotificationCategory,
    patch: Partial<UnifiedNotificationPreferences["modules"][NotificationCategory]>,
  ) {
    const current = this.get(userId);

    const nextModules: UnifiedNotificationPreferences["modules"] = {
      ...current.modules,
      [category]: {
        ...current.modules[category],
        ...patch,
        channels: mergeChannelMaps(
          current.modules[category].channels,
          patch.channels,
        ),
      },
    };

    return this.update(userId, { modules: nextModules });
  }

  replaceSubscriptions(
    userId: string,
    subscriptions: Partial<NotificationSubscriptions>,
  ) {
    const current = this.get(userId);
    const nextSubscriptions: NotificationSubscriptions = {
      ...current.subscriptions,
      ...subscriptions,
    };

    return this.update(userId, { subscriptions: nextSubscriptions });
  }
}
