export interface Notification {

  id: string
  userId: string
  title: string
  message: string
  createdAt: Date

}

export class NotificationService {

  private notifications: Notification[] = []

  send(userId: string, title: string, message: string) {

    const notification: Notification = {
      id: "notif_" + Date.now(),
      userId,
      title,
      message,
      createdAt: new Date()
    }

    this.notifications.push(notification)

    console.log("Notification sent:", notification)

    return notification
  }

  getUserNotifications(userId: string) {

    return this.notifications.filter(n => n.userId === userId)

  }

}