import { Router } from "express"
import { MediaController } from "../controllers/media.controller"

const router = Router()
const controller = new MediaController()

router.get("/chats/:chatId/media", controller.media.bind(controller))
router.get("/chats/:chatId/files", controller.files.bind(controller))
router.get("/chats/:chatId/voice", controller.voice.bind(controller))

export default router