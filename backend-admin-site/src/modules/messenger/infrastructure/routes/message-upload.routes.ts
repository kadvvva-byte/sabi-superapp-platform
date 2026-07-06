import { Router } from "express"
import { upload } from "../../../../core/storage/file.storage"
import { MessageUploadController } from "../controllers/message-upload.controller"

const router = Router()
const controller = new MessageUploadController()

router.post("/messages/voice/upload", upload.single("file"), (req, res) =>
  controller.uploadVoiceMessage(req, res),
)

router.post("/messages/video/upload", upload.single("file"), (req, res) =>
  controller.uploadVideoMessage(req, res),
)

export default router