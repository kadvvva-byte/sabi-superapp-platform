import { Request, Response } from "express"
import { BotService } from "../../application/services/bot.service"

const service = new BotService()

export class BotController {

  async createBot(req: Request, res: Response) {

    const { ownerId, name, username } = req.body

    const bot = await service.createBot(ownerId, name, username)

    res.json(bot)

  }

  async listBots(req: Request, res: Response) {

    const ownerId = req.params.ownerId as string
    const bots = await service.listBots(ownerId)

    res.json(bots)

  }

}