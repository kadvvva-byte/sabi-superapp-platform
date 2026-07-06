import { Request, Response } from "express"
import { InviteService } from "../../application/services/invite.service"

const inviteService = new InviteService()

export class InviteController {

  async createInvite(req: Request, res: Response) {

    const { chatId, userId } = req.body

    const invite = await inviteService.createInvite(chatId, userId)

    res.json(invite)

  }

  async joinInvite(req: Request, res: Response) {

    const { code, userId } = req.body

    const member = await inviteService.joinByInvite(code, userId)

    res.json(member)

  }

  async revokeInvite(req: Request, res: Response) {

    const { code } = req.body

    const result = await inviteService.revokeInvite(code)

    res.json(result)

  }

}