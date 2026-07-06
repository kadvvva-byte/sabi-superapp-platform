import type { Express } from "express";
import type { PrismaClient } from "@prisma/client";
import { buildQrRouter } from "../routes/qr.routes";

type EventBusLike = {
  publish?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
  emit?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
};

type IdempotencyServiceLike = {
  handle?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
  run?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
  execute?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
};

export function registerQrModule(app: Express, deps: {
  prisma: PrismaClient;
  eventBus?: EventBusLike;
  idempotencyService?: IdempotencyServiceLike;
  executeWalletRoute?: Parameters<typeof buildQrRouter>[0]["executeWalletRoute"];
  publishRealtime?: Parameters<typeof buildQrRouter>[0]["publishRealtime"];
  recordActivity?: Parameters<typeof buildQrRouter>[0]["recordActivity"];
  pushNotification?: Parameters<typeof buildQrRouter>[0]["pushNotification"];
}) {
  app.use("/api/qr", buildQrRouter(deps));
}
