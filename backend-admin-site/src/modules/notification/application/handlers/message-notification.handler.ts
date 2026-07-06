import { PushService } from "../services/push.service"

export class MessageNotificationHandler {

  private push = new PushService()

  async handle(userId: string, message: string) {

    await this.push.sendPush(userId, message)

  }

}