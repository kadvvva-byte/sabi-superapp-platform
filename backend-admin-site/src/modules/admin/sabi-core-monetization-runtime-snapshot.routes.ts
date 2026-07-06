import {
  buildSabiCoreMonetizationPlayReviewEvidenceSnapshot,
  buildSabiCoreMonetizationProviderGatesSnapshot,
  buildSabiCoreMonetizationReadinessSnapshot,
  buildSabiCoreMonetizationRuntimeSnapshot,
  SABI_CORE_MONETIZATION_READONLY_ROUTES,
} from "./sabi-core-monetization-runtime-snapshot.service";

type RequestHandlerLike = (...args: any[]) => any;

type RouterLike = {
  get: (path: string, ...handlers: RequestHandlerLike[]) => unknown;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => unknown;
};

export const sabiCoreMonetizationReadonlyRouteDraft = {
  version: "SABI-CORE-MONETIZATION-101E-FIX7",
  readOnly: true,
  routeMountedByThisStage: true,
  mountExecutionAllowedNow: false,
  targetMountFile: "src/modules/admin/admin.routes.ts",
  routes: SABI_CORE_MONETIZATION_READONLY_ROUTES,
  adminReadPermissionRequired: true,
  expectedAdminAuthHeader: "x-sabi-admin-token",
  alternateAdminAuthHeader: "Authorization: Bearer <token>",
  safety: {
    providerCallAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    creatorPayoutAllowedNow: false,
    stakeRuntimeAllowedNow: false,
    gamblingRuntimeAllowedNow: false,
    rawSecretOutputAllowedNow: false,
    rawPurchaseTokenOutputAllowedNow: false,
    rawCardDataOutputAllowedNow: false,
    rawPromptDataOutputAllowedNow: false,
    rawUserPrivateDataOutputAllowedNow: false,
  },
} as const;

export function registerSabiCoreMonetizationReadonlyRoutesDraft(
  router: RouterLike,
  requireAdminRead?: RequestHandlerLike,
): RouterLike {
  const adminReadHandlers = requireAdminRead ? [requireAdminRead] : [];

  router.get("/sabi-core/monetization/runtime-snapshot", ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildSabiCoreMonetizationRuntimeSnapshot());
  });

  router.get("/sabi-core/monetization/readiness", ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildSabiCoreMonetizationReadinessSnapshot());
  });

  router.get("/sabi-core/monetization/provider-gates", ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildSabiCoreMonetizationProviderGatesSnapshot());
  });

  router.get("/sabi-core/monetization/play-review-evidence", ...adminReadHandlers, (_request: unknown, response: ResponseLike) => {
    return response.status(200).json(buildSabiCoreMonetizationPlayReviewEvidenceSnapshot());
  });

  return router;
}
