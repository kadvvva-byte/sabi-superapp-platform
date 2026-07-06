import { MediaUploadResponse, UploadedMediaFile } from "../../domain/types/media-file.types"

export class MediaUploadService {
  normalizeUploadResponse(payload: MediaUploadResponse): UploadedMediaFile {
    return {
      url: payload.url,
      filename: payload.filename,
      originalName: payload.originalName,
      mimeType: payload.mimeType,
      size: payload.size,
    }
  }
}