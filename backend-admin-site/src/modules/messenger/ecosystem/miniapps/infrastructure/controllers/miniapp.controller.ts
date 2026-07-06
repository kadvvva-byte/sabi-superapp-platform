import { Request, Response } from "express"
import { MiniAppService } from "../../application/services/miniapp.service"

const service = new MiniAppService()

export class MiniAppController {

  async create(req: Request, res: Response) {

    const app = await service.createMiniApp(req.body)

    res.json(app)

  }

  async list(req: Request, res: Response) {

    const apps = await service.listMiniApps()

    res.json(apps)

  }

}