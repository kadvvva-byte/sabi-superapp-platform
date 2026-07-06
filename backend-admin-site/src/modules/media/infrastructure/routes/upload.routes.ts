import { Router } from "express"
import { upload } from "../../../../core/storage/file.storage"
import { UploadController } from "../controllers/upload.controller"

const router = Router()
const controller = new UploadController()

router.post("/upload", upload.single("file"), (req, res) => controller.uploadFile(req, res))
router.post("/upload-base64", (req, res) => controller.uploadBase64(req, res))
router.get("/files/:filename", (req, res) => controller.serveFile(req, res))

export default router
