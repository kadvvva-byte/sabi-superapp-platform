import { Router } from "express"
import { MessageController } from "../controllers/message.controller"

const router = Router()
const controller = new MessageController()

router.get("/chats/:chatId/messages", (req, res) =>
  controller.getChatMessages(req, res),
)

router.get("/rooms/:roomId/messages", (req, res) =>
  controller.getRoomMessages(req, res),
)

router.post("/rooms/:roomId/messages", (req, res) =>
  controller.sendRoomMessage(req, res),
)

router.get("/messages/:messageId", (req, res) =>
  controller.getMessageById(req, res),
)

router.post("/messages/text", (req, res) =>
  controller.sendTextMessage(req, res),
)

router.post("/messages/voice", (req, res) =>
  controller.sendVoiceMessage(req, res),
)

router.post("/messages/video", (req, res) =>
  controller.sendVideoMessage(req, res),
)

router.post("/messages/image", (req, res) =>
  controller.sendImageMessage(req, res),
)

router.post("/messages/file", (req, res) =>
  controller.sendFileMessage(req, res),
)

router.post("/messages/location", (req, res) =>
  controller.sendLocationMessage(req, res),
)

router.patch("/messages/:messageId/delivered", (req, res) =>
  controller.markDelivered(req, res),
)

router.post("/messages/:messageId/delivered", (req, res) =>
  controller.markDelivered(req, res),
)

router.patch("/messages/:messageId/read", (req, res) =>
  controller.markRead(req, res),
)

router.post("/messages/:messageId/read", (req, res) =>
  controller.markRead(req, res),
)

router.patch("/messages/:messageId/text", (req, res) =>
  controller.editTextMessage(req, res),
)

router.patch("/messages/:messageId", (req, res) =>
  controller.editTextMessage(req, res),
)

router.delete("/messages/:messageId", (req, res) =>
  controller.softDeleteMessage(req, res),
)

export default router
