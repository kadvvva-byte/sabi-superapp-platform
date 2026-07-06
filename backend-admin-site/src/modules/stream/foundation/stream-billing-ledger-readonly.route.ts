import { Router, type NextFunction, type Request, type RequestHandler, type Response } from "express";
import {
  STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH,
  STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY,
} from "./stream-billing-ledger-readonly.route.contracts";
import {
  getStreamBillingLedgerReadOnlySnapshot,
  type StreamBillingLedgerReadOnlyPrismaLike,
} from "./stream-billing-ledger-readonly.service";

export type StreamBillingLedgerReadOnlyRouteSourceDraftDeps = Readonly<{
  prisma: StreamBillingLedgerReadOnlyPrismaLike;
  requireAdmin?: RequestHandler;
}>;

export function createStreamBillingLedgerReadOnlyRouteSourceDraft(
  deps: StreamBillingLedgerReadOnlyRouteSourceDraftDeps,
) {
  const router = Router();

  const handler = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const snapshot = await getStreamBillingLedgerReadOnlySnapshot(deps.prisma);
      res.status(200).json({
        ok: true,
        version: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY.version,
        routeMountedNow: false,
        safety: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY,
        snapshot,
      });
    } catch (error) {
      next(error);
    }
  };

  if (deps.requireAdmin) {
    router.get(STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH, deps.requireAdmin, handler);
  } else {
    router.get(STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH, handler);
  }

  return router;
}

export function getStreamBillingLedgerReadOnlyRouteSourceDraftMetadata() {
  return {
    version: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY.version,
    sourceOnly: true,
    routePath: STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH,
    routeMountedNow: false,
    routeMountAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    databaseWriteAllowedNow: false,
    fakeSuccessAllowed: false,
    rawPurchaseTokenReturnAllowed: false,
    rawSecretReturnAllowed: false,
  } as const;
}
