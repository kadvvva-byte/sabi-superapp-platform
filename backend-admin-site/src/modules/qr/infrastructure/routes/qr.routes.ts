import type { Router } from "express";
import qrCoreRouter from "./qr-core.routes";

export type QrRouterDependencies = {
  prisma?: unknown;
  executeWalletRoute?: unknown;
  publishRealtime?: unknown;
  recordActivity?: unknown;
  pushNotification?: unknown;
  [key: string]: unknown;
};

export function buildQrRouter(): Router;
export function buildQrRouter(deps: QrRouterDependencies): Router;
export function buildQrRouter(_deps?: QrRouterDependencies): Router {
  return qrCoreRouter;
}

export default qrCoreRouter;
