import type { Prisma, PrismaClient } from "@prisma/client";
import { createQrRuntime } from "./create-qr-runtime";
import { PrismaQrWalletRouteExecutor } from "../executors/prisma-qr-wallet-route.executor";

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

export type CreateQrLiveRuntimeDeps = {
  prisma: PrismaClient;
  eventBus?: EventBusLike;
  idempotencyService?: IdempotencyServiceLike;
  io?: IoLike;
};

function toJsonValue(data?: Record<string, unknown>): Prisma.InputJsonValue {
  return (data ?? {}) as Prisma.InputJsonValue;
}

export function createQrLiveRuntime(deps: CreateQrLiveRuntimeDeps) {
  const walletExecutor = new PrismaQrWalletRouteExecutor(deps.prisma);

  return createQrRuntime({
    prisma: deps.prisma,
    eventBus: deps.eventBus,
    idempotencyService: deps.idempotencyService,
    executeWalletRoute: (input) => walletExecutor.execute(input),
    publishRealtime: async (channel, event, payload) => {
      if (deps.io?.to) {
        deps.io.to(channel).emit(event, payload);
        return;
      }
      if (deps.io?.emit) {
        deps.io.emit(event, payload);
      }
    },
    recordActivity: async (input) => {
      if (!input.userId) return;

      await deps.prisma.activityFeed.create({
        data: {
          userId: input.userId,
          type: input.type,
          data: toJsonValue(input.data),
        },
      });
    },
    pushNotification: async (input) => {
      if (!input.userId) return;

      if (deps.eventBus?.publish) {
        await deps.eventBus.publish("notification.dispatch.requested", {
          userId: input.userId,
          title: input.title,
          body: input.body,
          data: input.data ?? {},
        });
        return;
      }

      if (deps.eventBus?.emit) {
        await deps.eventBus.emit("notification.dispatch.requested", {
          userId: input.userId,
          title: input.title,
          body: input.body,
          data: input.data ?? {},
        });
      }
    },
  });
}
