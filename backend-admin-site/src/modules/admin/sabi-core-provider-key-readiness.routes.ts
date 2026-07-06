import { Router, type Request, type Response } from "express";
import {
  buildAirwallexProviderReadiness,
  buildCreatorEarningsProviderReadiness,
  buildGoogleBillingProviderReadiness,
  buildPaidGamesStakeProviderReadiness,
  buildSabiCoreProviderKeyReadinessSafety,
  buildSabiCoreProviderKeyReadinessSnapshot,
  SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES,
} from "./sabi-core-provider-key-readiness.service";

type RequestHandlerLike = (...args: any[]) => any;

type RouterLike = {
  get: (path: string, ...handlers: RequestHandlerLike[]) => unknown;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => unknown;
};

export const sabiCoreProviderKeyReadinessReadonlyRouteBinding = {
  version: "SABI-CORE-MONETIZATION-102G",
  readOnly: true,
  protectedAdminRoute: true,
  expectedAdminAuthHeader: "x-sabi-admin-token",
  alternateAdminAuthHeader: "Authorization: Bearer <token>",
  permissionRequired: "admin:read",
  runtimeSmokeExecutedNow: false,
  providerActivationAllowedNow: false,
  providerCallAllowedNow: false,
  dbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretVisibilityAllowedNow: false,
  rawPurchaseTokenVisibilityAllowedNow: false,
} as const;


// SABI_CORE_MONETIZATION_102H_FIX1_PROVIDER_KEY_READINESS_NORMALIZED_SUBROUTER
export function createSabiCoreProviderKeyReadinessReadonlySubRouter() {
  const subRouter = Router();

  subRouter.get("/snapshot", (_request: Request, response: Response) => {
    return response.status(200).json(buildSabiCoreProviderKeyReadinessSnapshot());
  });

  subRouter.get("/google-billing", (_request: Request, response: Response) => {
    return response.status(200).json(buildGoogleBillingProviderReadiness());
  });

  subRouter.get("/airwallex", (_request: Request, response: Response) => {
    return response.status(200).json(buildAirwallexProviderReadiness());
  });

  subRouter.get("/creator-earnings", (_request: Request, response: Response) => {
    return response.status(200).json(buildCreatorEarningsProviderReadiness());
  });

  subRouter.get("/locked-runtime", (_request: Request, response: Response) => {
    return response.status(200).json({
      version: "SABI-CORE-MONETIZATION-102H-FIX1",
      generatedAtUtc: new Date().toISOString(),
      readOnly: true,
      paidGamesStake: buildPaidGamesStakeProviderReadiness(),
      safety: buildSabiCoreProviderKeyReadinessSafety(),
      stillNotEnabled: [
        "provider activation",
        "provider calls",
        "DB writes",
        "Wallet mutation",
        "money movement",
        "creator payout execution",
        "stake/gambling runtime",
        "Google Billing runtime",
        "Airwallex runtime",
      ],
    });
  });

  return subRouter;
}

export function registerSabiCoreProviderKeyReadinessReadonlyRoutes(
  router: RouterLike,
  requireAdminRead?: RequestHandlerLike,
): RouterLike {
  const adminReadHandlers = requireAdminRead ? [requireAdminRead] : [];

  router.get(SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES.snapshot, ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildSabiCoreProviderKeyReadinessSnapshot());
  });

  router.get(SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES.googleBilling, ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildGoogleBillingProviderReadiness());
  });

  router.get(SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES.airwallex, ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildAirwallexProviderReadiness());
  });

  router.get(SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES.creatorEarnings, ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildCreatorEarningsProviderReadiness());
  });

  router.get(SABI_CORE_PROVIDER_KEY_READINESS_ADMIN_ROUTES.lockedRuntime, ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json({
      version: "SABI-CORE-MONETIZATION-102G",
      generatedAtUtc: new Date().toISOString(),
      readOnly: true,
      paidGamesStake: buildPaidGamesStakeProviderReadiness(),
      safety: buildSabiCoreProviderKeyReadinessSafety(),
      stillNotEnabled: [
        "provider activation",
        "provider calls",
        "DB writes",
        "Wallet mutation",
        "money movement",
        "creator payout execution",
        "stake/gambling runtime",
        "Google Billing runtime",
        "Airwallex runtime",
      ],
    });
  });

  return router;
}
