import { Router } from "express"
import { ChatListController } from "../controllers/chat-list.controller"

const router = Router()
const controller = new ChatListController()

router.get("/chat-list/:userId", controller.getList.bind(controller))

export default router