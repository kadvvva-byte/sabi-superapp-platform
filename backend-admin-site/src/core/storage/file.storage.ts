import { randomUUID } from "crypto"
import { mkdirSync } from "fs"
import multer from "multer"
import path from "path"

export const UPLOADS_DIR = path.resolve(process.cwd(), "uploads")

mkdirSync(UPLOADS_DIR, { recursive: true })

function safeOriginalExtension(originalName?: string | null) {
  const ext = path.extname(String(originalName ?? "")).toLowerCase()

  if (!ext || ext.length > 16 || !/^\.[a-z0-9]+$/i.test(ext)) {
    return ""
  }

  return ext
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    mkdirSync(UPLOADS_DIR, { recursive: true })
    cb(null, UPLOADS_DIR)
  },
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${safeOriginalExtension(file.originalname)}`)
  },
})

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 512,
  },
})
