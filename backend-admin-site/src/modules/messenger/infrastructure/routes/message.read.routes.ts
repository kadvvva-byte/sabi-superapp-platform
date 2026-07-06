import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { websocketServer } from "../../../../core/realtime/websocket.server"

const router = Router()
const prisma = new PrismaClient()

router.post("/messages/:messageId/read", async (req, res) => {
  try {
    const { messageId } = req.params
    const { userId } = req.body

    const message = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        readAt: new Date(),
      },
    })

    websocketServer?.to(message.chatId).emit("message_read", {
      messageId: message.id,
      userId,
    })

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "failed_to_mark_read" })
  }
})

export default router