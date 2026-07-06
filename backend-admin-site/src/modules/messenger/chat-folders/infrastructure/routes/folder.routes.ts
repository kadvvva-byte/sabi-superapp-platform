import { Router } from "express"
import { FolderController } from "../controllers/folder.controller"

const router = Router()
const controller = new FolderController()

router.post("/folders", controller.createFolder)
router.post("/folders/chats", controller.addChat)
router.delete("/folders/chats", controller.removeChat)

export default router