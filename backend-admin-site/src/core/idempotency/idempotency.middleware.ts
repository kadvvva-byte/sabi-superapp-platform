import { Request, Response, NextFunction } from "express"
import { IdempotencyService } from "./idempotency.service"

export function idempotencyMiddleware(service: IdempotencyService) {

  return async (req: Request, res: Response, next: NextFunction) => {

    const key = req.headers["idempotency-key"] as string

    if (!key) {
      return next()
    }

    const existing = await service.get(key)

    if (existing) {
      return res.json(existing)
    }

    const originalJson = res.json.bind(res)

    res.json = (body: any) => {

      service.save(key, body)

      return originalJson(body)
    }

    next()
  }

}