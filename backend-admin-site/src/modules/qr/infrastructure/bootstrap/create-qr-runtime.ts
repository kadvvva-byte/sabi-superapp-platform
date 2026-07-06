import type { PrismaClient } from "@prisma/client";
import { QrModuleBridgesService, type QrExecuteWalletRouteResult, type QrExecuteWalletRouteInput } from "../../application/services/qr-module-bridges.service";
import { QrRouteResolverService } from "../../application/services/qr-route-resolver.service";
import { QrSecurityService } from "../../application/services/qr-security.service";
import { QrExecutionService } from "../../application/services/qr-execution.service";
import { ResolveQrRouteUseCase } from "../../application/use-cases/resolve-qr-route.use-case";
import { ValidateQrUseCase } from "../../application/use-cases/validate-qr.use-case";
import { ExecuteQrOperationUseCase } from "../../application/use-cases/execute-qr-operation.use-case";
import { ScanQrUseCase } from "../../application/use-cases/scan-qr.use-case";
import { QrController } from "../controllers/qr.controller";

type EventBusLike = {
  publish?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
  emit?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
};

type IdempotencyLikeMethod = <T>(key: string, job: () => Promise<T>) => Promise<T>;

type IdempotencyServiceLike = {
  handle?: IdempotencyLikeMethod;
  run?: IdempotencyLikeMethod;
  execute?: IdempotencyLikeMethod;
  process?: IdempotencyLikeMethod;
  use?: IdempotencyLikeMethod;
};

export type CreateQrRuntimeDeps = {
  prisma?: PrismaClient;
  eventBus?: EventBusLike;
  idempotencyService?: IdempotencyServiceLike | unknown;
  executeWalletRoute?: (input: QrExecuteWalletRouteInput) => Promise<QrExecuteWalletRouteResult>;
  publishRealtime?: (channel: string, event: string, payload: Record<string, unknown>) => Promise<void>;
  recordActivity?: (input: { userId?: string; type: string; data?: Record<string, unknown> }) => Promise<void>;
  pushNotification?: (input: { userId?: string; title: string; body: string; data?: Record<string, unknown> }) => Promise<void>;
};

function getIdempotencyRunner(
  service: CreateQrRuntimeDeps["idempotencyService"],
): IdempotencyLikeMethod | undefined {
  if (!service || typeof service !== "object") return undefined;

  const candidate = service as IdempotencyServiceLike;

  if (typeof candidate.handle === "function") return candidate.handle.bind(service);
  if (typeof candidate.run === "function") return candidate.run.bind(service);
  if (typeof candidate.execute === "function") return candidate.execute.bind(service);
  if (typeof candidate.process === "function") return candidate.process.bind(service);
  if (typeof candidate.use === "function") return candidate.use.bind(service);

  return undefined;
}

export function createQrRuntime(deps: CreateQrRuntimeDeps = {}) {
  const bridgesService = new QrModuleBridgesService({
    withIdempotency: async (key, job) => {
      if (!key) return job();

      const runner = getIdempotencyRunner(deps.idempotencyService);
      if (runner) {
        return runner(key, job);
      }

      return job();
    },
    publishEvent: async (type, payload) => {
      if (deps.eventBus?.publish) {
        await deps.eventBus.publish(type, payload);
        return;
      }
      if (deps.eventBus?.emit) {
        await deps.eventBus.emit(type, payload);
      }
    },
    publishRealtime: deps.publishRealtime,
    recordActivity: deps.recordActivity,
    pushNotification: deps.pushNotification,
    executeWalletRoute: deps.executeWalletRoute,
  });

  const routeResolverService = new QrRouteResolverService();
  const securityService = new QrSecurityService();
  const executionService = new QrExecutionService(bridgesService);

  const resolveQrRouteUseCase = new ResolveQrRouteUseCase(routeResolverService);
  const validateQrUseCase = new ValidateQrUseCase(securityService);
  const executeQrOperationUseCase = new ExecuteQrOperationUseCase(
    validateQrUseCase,
    executionService,
  );
  const scanQrUseCase = new ScanQrUseCase(
    resolveQrRouteUseCase,
    executeQrOperationUseCase,
  );

  const controller = new QrController(
    resolveQrRouteUseCase,
    validateQrUseCase,
    executeQrOperationUseCase,
    scanQrUseCase,
  );

  return {
    controller,
    bridgesService,
    resolveQrRouteUseCase,
    validateQrUseCase,
    executeQrOperationUseCase,
    scanQrUseCase,
  };
}
