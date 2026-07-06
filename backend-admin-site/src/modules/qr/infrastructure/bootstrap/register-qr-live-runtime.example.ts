import type { Express } from "express";
import type { PrismaClient } from "@prisma/client";
import { buildQrRouter } from "../routes/qr.routes";
import { createQrLiveRuntime } from "./create-qr-live-runtime";

type EventBusLike = {
  publish?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
  emit?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
};

type IdempotencyServiceLike = {
  handle?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
  run?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
  execute?: <T>(key: string, job: () => Promise<T>) => Promise<T>;
};

type IoLike = {
  emit?: (event: string, payload: Record<string, unknown>) => void;
  to?: (room: string) => { emit: (event: string, payload: Record<string, unknown>) => void };
};

export function registerQrLiveRuntime(app: Express, deps: {
  prisma: PrismaClient;
  eventBus?: EventBusLike;
  idempotencyService?: IdempotencyServiceLike;
  io?: IoLike;
}) {
  const runtime = createQrLiveRuntime(deps);

  app.use("/api/qr", buildQrRouter({
    prisma: deps.prisma,
    eventBus: deps.eventBus,
    idempotencyService: deps.idempotencyService,
    executeWalletRoute: runtime.bridgesService.executeWalletRoute.bind(runtime.bridgesService),
    publishRealtime: runtime.bridgesService.publishRealtime.bind(runtime.bridgesService),
    recordActivity: runtime.bridgesService.recordActivity.bind(runtime.bridgesService),
    pushNotification: runtime.bridgesService.pushNotification.bind(runtime.bridgesService),
  }));
}
