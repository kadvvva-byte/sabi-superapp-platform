import { prisma } from "../../../../../../core/prisma/prisma.client"
import { EventBus } from "../../../../../../core/events/event-bus"


export class LauncherService {

  constructor(private eventBus: EventBus) {}

  async launchMiniApp(userId: string, miniAppId: string) {

    const session = await prisma.miniAppSession.create({
      data: {
        userId,
        miniAppId
      }
    })

    await this.eventBus.publish("miniapp.launched", {
      userId,
      miniAppId
    })

    return session
  }

}