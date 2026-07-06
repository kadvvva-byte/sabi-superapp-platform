export type UploadedMediaFile = {
  url: string
  filename: string
  originalName: string
  mimeType: string
  size: number
}

export type MediaUploadResult = UploadedMediaFile

export type MediaUploadResponse = {
  url: string
  filename: string
  originalName: string
  mimeType: string
  size: number
}