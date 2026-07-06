export class NotificationService {

  async sendNotification(params: {
    userId: string
    title: string
    message: string
  }) {

    const { userId, title, message } = params

    console.log("Notification sent")
    console.log("User:", userId)
    console.log("Title:", title)
    console.log("Message:", message)

    return {
      success: true
    }

  }

}