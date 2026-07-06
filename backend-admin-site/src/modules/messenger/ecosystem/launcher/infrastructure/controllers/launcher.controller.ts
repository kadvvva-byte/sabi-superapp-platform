import { Request, Response } from "express"
import { LauncherService } from "../../application/services/launcher.service"
import { EventBus } from "../../../../../../core/events/event-bus"

const eventBus = new EventBus()
const service = new LauncherService(eventBus)

export class LauncherController {

  async launch(req: Request, res: Response) {

    const { userId, miniAppId } = req.body

    const session = await service.launchMiniApp(userId, miniAppId)

    res.json(session)

  }

}