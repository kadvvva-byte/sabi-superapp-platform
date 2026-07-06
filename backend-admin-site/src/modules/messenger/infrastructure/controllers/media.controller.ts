import { Request, Response } from "express";

import { MediaGalleryService } from "../../application/services/media-gallery.service";

const service = new MediaGalleryService();

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export class MediaController {
  async media(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.params?.chatId);

      if (!chatId) {
        return res.status(400).json({
          error: "chat_id_required",
        });
      }

      const data = await service.getMedia(chatId);

      return res.json(data);
    } catch (error) {
      console.error("media error:", error);

      return res.status(500).json({
        error: "failed_to_get_media",
      });
    }
  }

  async files(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.params?.chatId);

      if (!chatId) {
        return res.status(400).json({
          error: "chat_id_required",
        });
      }

      const data = await service.getFiles(chatId);

      return res.json(data);
    } catch (error) {
      console.error("files error:", error);

      return res.status(500).json({
        error: "failed_to_get_files",
      });
    }
  }

  async voice(req: Request, res: Response) {
    try {
      const chatId = normalizeString(req.params?.chatId);

      if (!chatId) {
        return res.status(400).json({
          error: "chat_id_required",
        });
      }

      const data = await service.getVoice(chatId);

      return res.json(data);
    } catch (error) {
      console.error("voice error:", error);

      return res.status(500).json({
        error: "failed_to_get_voice",
      });
    }
  }
}