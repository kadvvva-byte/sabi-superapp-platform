import { Request, Response } from "express"
import { GroupService } from "../../application/services/group.service"

const groupService = new GroupService()

export class GroupController {

  async createGroup(req: Request, res: Response) {

    const group = await groupService.createGroup(req.body)

    res.json(group)

  }

  async addMember(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const member = await groupService.addMember(chatId, userId)

    res.json(member)

  }

  async removeMember(req: Request, res: Response) {

    const { chatId, userId } = req.body

    await groupService.removeMember(chatId, userId)

    res.json({ success: true })

  }

   async promoteAdmin(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const result = await groupService.promoteAdmin(chatId, userId)

    res.json(result)

  }

  async demoteAdmin(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const result = await groupService.demoteAdmin(chatId, userId)

    res.json(result)

  }

}