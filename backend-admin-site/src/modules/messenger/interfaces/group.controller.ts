import { Request, Response } from "express"
import { GroupService } from "../application/services/group.service"

export class GroupController {

  constructor(private service: GroupService) {}

  create = async (req: Request, res: Response) => {

    const { title, ownerId } = req.body

    const group = await this.service.createGroup(
      title,
      ownerId
    )

    res.json(group)

  }

}