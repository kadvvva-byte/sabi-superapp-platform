import { Request, Response } from "express";

import { FileUploadService } from "../../application/services/file-upload.service";

const uploadService = new FileUploadService();

export class UploadController {
  async upload(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          error: "file_required",
        });
      }

      const result = await uploadService.uploadFile(file);

      return res.json(result);
    } catch (error) {
      console.error("upload error:", error);

      return res.status(500).json({
        error: "upload_failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}