import { Request, Response } from "express"
import { GroupMemberService } from "../application/services/group-member.service"

export class GroupMemberController {

  constructor(private service: GroupMemberService) {}

  add = async (req: Request, res: Response) => {

    const { chatId, userId } = req.body

    const result = await this.service.addMember(
      chatId,
      userId
    )

    res.json(result)

  }

  remove = async (req: Request, res: Response) => {

    const { chatId, userId } = req.body

    const result = await this.service.removeMember(
      chatId,
      userId
    )

    res.json(result)

  }

}