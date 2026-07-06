import { Request, Response } from "express"
import { FolderService } from "../../application/services/folder.service"

const service = new FolderService()

export class FolderController {

  async createFolder(req: Request, res: Response) {

    const { userId, name } = req.body

    const folder = await service.createFolder(userId, name)

    res.json(folder)

  }

  async addChat(req: Request, res: Response) {

    const { folderId, chatId } = req.body

    const result = await service.addChatToFolder(folderId, chatId)

    res.json(result)

  }

  async removeChat(req: Request, res: Response) {

    const { folderId, chatId } = req.body

    const result = await service.removeChatFromFolder(folderId, chatId)

    res.json(result)

  }

}