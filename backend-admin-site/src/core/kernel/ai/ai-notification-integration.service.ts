import { NotificationService } from "../../../modules/notification/application/services/notification.service"
import { AiLocaleBindingService } from "./ai-locale-binding.service"
import {
  type AiNotificationKind,
  type AiLocalizedNotificationManifestItem,
  type AiNotificationPublishInput,
} from "./ai.types"

const MANIFEST: AiLocalizedNotificationManifestItem[] = [
  {
    kind: "task_ready",
    titleKey: "ai.notifications.taskReady.title",
    messageKey: "ai.notifications.taskReady.message",
  },
  {
    kind: "search_completed",
    titleKey: "ai.notifications.searchCompleted.title",
    messageKey: "ai.notifications.searchCompleted.message",
  },
  {
    kind: "translation_ready",
    titleKey: "ai.notifications.translationReady.title",
    messageKey: "ai.notifications.translationReady.message",
  },
  {
    kind: "memory_suggestion",
    titleKey: "ai.notifications.memorySuggestion.title",
    messageKey: "ai.notifications.memorySuggestion.message",
  },
  {
    kind: "business_summary_ready",
    titleKey: "ai.notifications.businessSummaryReady.title",
    messageKey: "ai.notifications.businessSummaryReady.message",
  },
  {
    kind: "education_plan_ready",
    titleKey: "ai.notifications.educationPlanReady.title",
    messageKey: "ai.notifications.educationPlanReady.message",
  },
  {
    kind: "premium_unlocked",
    titleKey: "ai.notifications.premiumUnlocked.title",
    messageKey: "ai.notifications.premiumUnlocked.message",
  },
]

export class AiNotificationIntegrationService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly localeBindingService: AiLocaleBindingService,
  ) {}

  getManifest() {
    return MANIFEST
  }

  list(userId: string) {
    return this.notificationService.listNotifications(userId, "ai")
  }

  publish(input: AiNotificationPublishInput) {
    const locale = this.localeBindingService.getLocale(input.userId)
    const manifestItem = MANIFEST.find((item) => item.kind === input.kind)

    if (!manifestItem) {
      throw new Error(`Unsupported AI notification kind: ${input.kind}`)
    }

    return this.notificationService.sendLocalizedNotification({
      userId: input.userId,
      category: "ai",
      kind: input.kind,
      locale: locale.locale,
      titleKey: manifestItem.titleKey,
      messageKey: manifestItem.messageKey,
      params: input.params,
      actorUserId: input.actorUserId,
    })
  }
}
