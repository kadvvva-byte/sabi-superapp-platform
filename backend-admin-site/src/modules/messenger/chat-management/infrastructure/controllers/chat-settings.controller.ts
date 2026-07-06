import { Request, Response } from "express"
import { ChatSettingsService } from "../../application/services/chat-settings.service"

const service = new ChatSettingsService()

export class ChatSettingsController {

  async muteChat(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const result = await service.muteChat(chatId, userId)

    res.json(result)

  }

  async archiveChat(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const result = await service.archiveChat(chatId, userId)

    res.json(result)

  }

  async pinChat(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const result = await service.pinChat(chatId, userId)

    res.json(result)

  }

}