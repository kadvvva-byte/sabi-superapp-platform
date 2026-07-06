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
  | "system"

export type StoredNotification = {
  id: string
  userId: string
  category: NotificationCategory
  kind?: string
  locale?: string
  title?: string
  message?: string
  titleKey?: string
  messageKey?: string
  params?: Record<string, unknown>
  actorUserId?: string
  createdAt: string
  readAt?: string
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export class NotificationService {
  private static readonly notifications = new Map<string, StoredNotification[]>()

  async sendNotification(params: {
    userId: string
    title: string
    message: string
    category?: NotificationCategory
    kind?: string
  }) {
    const entry: StoredNotification = {
      id: createId("notif"),
      userId: params.userId,
      category: params.category ?? "system",
      kind: params.kind,
      title: params.title,
      message: params.message,
      createdAt: new Date().toISOString(),
    }

    const existing = NotificationService.notifications.get(params.userId) ?? []
    existing.unshift(entry)
    NotificationService.notifications.set(params.userId, existing)

    return {
      success: true,
      notification: entry,
    }
  }

  sendLocalizedNotification(params: {
    userId: string
    category: NotificationCategory
    kind: string
    locale: string
    titleKey: string
    messageKey: string
    params?: Record<string, unknown>
    actorUserId?: string
  }) {
    const entry: StoredNotification = {
      id: createId("notif"),
      userId: params.userId,
      category: params.category,
      kind: params.kind,
      locale: params.locale,
      titleKey: params.titleKey,
      messageKey: params.messageKey,
      params: params.params,
      actorUserId: params.actorUserId,
      createdAt: new Date().toISOString(),
    }

    const existing = NotificationService.notifications.get(params.userId) ?? []
    existing.unshift(entry)
    NotificationService.notifications.set(params.userId, existing)

    return {
      success: true,
      notification: entry,
    }
  }

  listNotifications(userId: string, category?: NotificationCategory) {
    const existing = NotificationService.notifications.get(userId) ?? []
    return category ? existing.filter((item) => item.category === category) : existing
  }
}
