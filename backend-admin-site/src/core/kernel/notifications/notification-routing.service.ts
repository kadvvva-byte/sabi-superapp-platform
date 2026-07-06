import type {
  NotificationDeliveryChannel,
  UnifiedNotificationEventContract,
  UnifiedNotificationPreferences,
  UnifiedNotificationRoutingDecision,
} from "./notifications.types";

const QUIET_MODE_SUPPRESSED_CHANNELS: NotificationDeliveryChannel[] = [
  "push",
  "email",
  "sms",
  "lockScreen",
];

export class UnifiedNotificationRoutingService {
  resolve(
    event: UnifiedNotificationEventContract,
    preferences: UnifiedNotificationPreferences,
  ): UnifiedNotificationRoutingDecision {
    const modulePreferences = preferences.modules[event.category];
    const deliveryChannels: NotificationDeliveryChannel[] = [];
    const suppressedReasons: string[] = [];

    if (!modulePreferences.enabled) {
      suppressedReasons.push("module_disabled");
    }

    if (!preferences.subscriptions[event.category]) {
      suppressedReasons.push("unsubscribed");
    }

    if (suppressedReasons.length > 0) {
      return {
        shouldStoreInInbox: false,
        deliveryChannels,
        suppressedReasons,
        quietModeApplied: false,
        lockScreenPolicy: preferences.lockScreenPolicy,
      };
    }

    const quietModeApplied =
      preferences.quietModeEnabled &&
      event.priority !== "critical" &&
      event.respectQuietMode !== false;

    for (const channel of ["inApp", "push", "email", "sms", "lockScreen"] as const) {
      if (!preferences.globalChannels[channel]) {
        suppressedReasons.push(`global_channel_disabled:${channel}`);
        continue;
      }

      if (!modulePreferences.channels[channel]) {
        suppressedReasons.push(`module_channel_disabled:${channel}`);
        continue;
      }

      if (event.requestedChannels && event.requestedChannels[channel] === false) {
        suppressedReasons.push(`event_channel_disabled:${channel}`);
        continue;
      }

      if (channel === "lockScreen" && preferences.lockScreenPolicy === "disabled") {
        suppressedReasons.push("lock_screen_disabled");
        continue;
      }

      if (quietModeApplied && QUIET_MODE_SUPPRESSED_CHANNELS.includes(channel)) {
        suppressedReasons.push(`quiet_mode:${channel}`);
        continue;
      }

      deliveryChannels.push(channel);
    }

    if (deliveryChannels.length === 0) {
      deliveryChannels.push("inApp");
    }

    return {
      shouldStoreInInbox: true,
      deliveryChannels,
      suppressedReasons,
      quietModeApplied,
      lockScreenPolicy: preferences.lockScreenPolicy,
    };
  }
}
