import { Router } from "express"
import { ChatListUpdateService } from "../../application/chatlist-update.service"

const router = Router()
const service = new ChatListUpdateService()

router.post("/chats/:chatId/read", async (req, res) => {
  const { chatId } = req.params
  const { userId } = req.body

  await service.markAsRead(userId, chatId)

  res.json({ success: true })
})

export default router