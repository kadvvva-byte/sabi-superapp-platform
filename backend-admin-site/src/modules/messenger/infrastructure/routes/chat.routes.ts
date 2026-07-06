import { Router } from "express"
import { ChatController } from "../controllers/chat.controller"

const router = Router()
const controller = new ChatController()

router.post("/chats/private", controller.createPrivate.bind(controller))
router.post("/chats/direct", controller.createPrivate.bind(controller))
router.post("/rooms/direct", controller.createPrivate.bind(controller))
router.post("/chats/group", controller.createGroup.bind(controller))
router.get("/chats/unread", controller.unread.bind(controller))

export default router