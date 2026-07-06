import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"

export class FileUploadService {

  private uploadDir = path.join(process.cwd(), "uploads")

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  async uploadFile(file: Express.Multer.File) {

    const extension = path.extname(file.originalname)

    const fileName = `${uuid()}${extension}`

    const filePath = path.join(this.uploadDir, fileName)

    await fs.promises.writeFile(filePath, file.buffer)

    return {
      fileName,
      url: `/uploads/${fileName}`,
      size: file.size,
      type: file.mimetype
    }
  }

}