import { createReadStream, existsSync, statSync } from "fs"
import path from "path"
import { Request, Response } from "express"
import { UPLOADS_DIR } from "../../../../core/storage/file.storage"

function safeFilename(value: unknown) {
  const name = String(value ?? "").trim()

  if (!name || name.includes("/") || name.includes("\\") || name.includes("..")) {
    return null
  }

  return name
}

function contentTypeFor(filename: string) {
  const ext = path.extname(filename).toLowerCase()

  switch (ext) {
    case ".mp4":
      return "video/mp4"
    case ".mov":
      return "video/quicktime"
    case ".m4v":
      return "video/x-m4v"
    case ".webm":
      return "video/webm"
    case ".mkv":
      return "video/x-matroska"
    case ".avi":
      return "video/x-msvideo"
    case ".3gp":
      return "video/3gpp"
    case ".3g2":
      return "video/3gpp2"
    case ".mpeg":
    case ".mpg":
      return "video/mpeg"
    case ".m3u8":
      return "application/vnd.apple.mpegurl"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".webp":
      return "image/webp"
    case ".gif":
      return "image/gif"
    case ".m4a":
      return "audio/mp4"
    case ".mp3":
      return "audio/mpeg"
    case ".aac":
      return "audio/aac"
    case ".wav":
      return "audio/wav"
    case ".pdf":
      return "application/pdf"
    default:
      return "application/octet-stream"
  }
}

function buildMediaUrl(filename: string) {
  return `/api/v2/media/files/${encodeURIComponent(filename)}`
}

export class UploadController {
  async uploadFile(req: Request, res: Response) {
    const file = req.file

    if (!file) {
      return res.status(400).json({
        error: "file_required",
      })
    }

    const url = buildMediaUrl(file.filename)

    return res.json({
      url,
      mediaUri: url,
      fileUrl: url,
      downloadUrl: url,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    })
  }

  async uploadBase64(req: Request, res: Response) {
    try {
      const fileName = safeFilename(req.body?.fileName ?? req.body?.name) ?? `media-${Date.now()}.bin`
      const mimeType = String(req.body?.mimeType ?? "application/octet-stream")
      const data = String(req.body?.data ?? "")

      if (!data) {
        return res.status(400).json({ error: "file_required" })
      }

      const extension = path.extname(fileName)
      const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}${extension || ""}`
      const target = path.resolve(UPLOADS_DIR, filename)
      const buffer = Buffer.from(data, "base64")

      await import("fs/promises").then((fs) => fs.writeFile(target, buffer))

      const url = buildMediaUrl(filename)
      return res.json({
        url,
        mediaUri: url,
        fileUrl: url,
        downloadUrl: url,
        filename,
        originalName: fileName,
        mimeType,
        size: buffer.length,
      })
    } catch (error) {
      return res.status(500).json({
        error: "upload_base64_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  async serveFile(req: Request, res: Response) {
    const filename = safeFilename(req.params.filename)

    if (!filename) {
      return res.status(400).json({ error: "invalid_file_name" })
    }

    const absolute = path.resolve(UPLOADS_DIR, filename)

    if (!absolute.startsWith(UPLOADS_DIR) || !existsSync(absolute)) {
      return res.status(404).json({ error: "file_not_found" })
    }

    const stat = statSync(absolute)
    const total = stat.size
    const contentType = contentTypeFor(filename)
    const range = req.headers.range

    res.setHeader("Accept-Ranges", "bytes")
    res.setHeader("Content-Type", contentType)
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable")

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range)
      if (match) {
        const start = match[1] ? Number(match[1]) : 0
        const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1

        if (Number.isFinite(start) && Number.isFinite(end) && start <= end && start < total) {
          res.status(206)
          res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`)
          res.setHeader("Content-Length", end - start + 1)
          return createReadStream(absolute, { start, end }).pipe(res)
        }
      }
    }

    res.setHeader("Content-Length", total)
    return createReadStream(absolute).pipe(res)
  }
}
