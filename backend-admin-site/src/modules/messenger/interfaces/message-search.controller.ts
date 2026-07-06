import { Request, Response } from "express"
import { MessageSearchService } from "../application/services/message-search.service"

export class MessageSearchController {

  constructor(private service: MessageSearchService) {}

  search = async (req: Request, res: Response) => {

    const chatId = String(req.params.chatId)
    const query = String(req.query.q || "")

    const results = await this.service.search(
      chatId,
      query
    )

    res.json(results)

  }

}