export class PushService {

  async sendPush(userId: string, message: string) {

    console.log("📲 push notification")

    console.log("user:", userId)

    console.log("message:", message)

  }

}