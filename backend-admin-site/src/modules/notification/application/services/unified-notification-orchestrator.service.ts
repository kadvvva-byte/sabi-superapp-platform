import { platformFoundationContext } from "../../../../core/kernel/platform";
import type {
  NotificationCategory,
  NotificationPriority,
  UnifiedNotificationEventContract,
} from "../../../../core/kernel/notifications";

export type PublishUnifiedNotificationInput = {
  recipientUserId: string;
  category: NotificationCategory;
  title: string;
  body: string;
  sourceModule?: string;
  eventType?: string;
  priority?: NotificationPriority;
  data?: Record<string, unknown>;
};

export class UnifiedNotificationOrchestratorService {
  publish(input: PublishUnifiedNotificationInput) {
    return platformFoundationContext.notifications.publish({
      recipientUserId: input.recipientUserId,
      category: input.category,
      sourceModule: input.sourceModule ?? input.category,
      eventType: input.eventType ?? `${input.category}.manual`,
      title: input.title,
      body: input.body,
      priority: input.priority ?? "normal",
      data: input.data,
    });
  }

  publishContract(contract: UnifiedNotificationEventContract) {
    return platformFoundationContext.notifications.publish(contract);
  }
}
