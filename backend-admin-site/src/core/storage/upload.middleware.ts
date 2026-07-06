import multer from "multer"
import path from "path"
import fs from "fs"

const storagePath = path.join(__dirname, "../../../../storage/media")

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true })
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, storagePath)
  },

  filename: function (req, file, cb) {

    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)

    cb(null, unique + path.extname(file.originalname))
  }

})

export const upload = multer({ storage })