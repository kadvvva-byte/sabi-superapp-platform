import { Router } from "express"
import multer from "multer"
import { UploadController } from "../controllers/upload.controller"

const router = Router()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/")
  },

  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`
    cb(null, unique)
  },
})

const upload = multer({ storage })
const controller = new UploadController()

router.post("/media", upload.single("file"), (req, res) => {
  const file = req.file

  res.json({
    url: `/uploads/${file?.filename}`,
  })
})

router.post("/upload", upload.single("file"), controller.upload)

export default router