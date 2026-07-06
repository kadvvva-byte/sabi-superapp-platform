import type { Router, Request, Response } from 'express';
import { applyTaxiRuntimeHardeningHeaders002P } from '../runtime-hardening-protected-routes-002p';
import {
  TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_003D,
  TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_VALUE_003D,
  taxiProviderWalletBoundaryGates003D,
} from './constants';
import {
  buildTaxiProviderWalletBoundaryBlockedResult003D,
  buildTaxiProviderWalletBoundaryRoutePatchPlan003D,
  buildTaxiProviderWalletBoundaryRoutePatchSafety003D,
} from './service';
import type { TaxiProviderWalletBoundaryGuard003D } from './types';

const ok003D = (response: Response, data: Record<string, unknown>): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.json({ ok: true, ...data });
};

const forbidden003D = (response: Response, code: string): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(403).json({
    ok: false,
    error: 'taxi_provider_wallet_boundary_forbidden',
    code,
    requiredHeader: TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_003D,
    providerCredentialRuntimeLookup: false,
    providerDispatch: false,
    walletMutation: false,
    payment: false,
    payout: false,
    fakeSuccessBlocked: true,
  });
};

const stillBlocked003D = (response: Response): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(409).json({
    ok: false,
    code: 'taxi_provider_wallet_boundary_still_blocked_003d',
    boundary: buildTaxiProviderWalletBoundaryBlockedResult003D(),
  });
};

const hasBoundaryHeader003D = (request: Request): boolean => {
  const headerValue = String(request.headers[TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_003D] || '').trim();
  return headerValue === TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_VALUE_003D;
};

export const registerTaxiProviderWalletBoundaryRoutePatch003D = (
  router: Router,
  guard: TaxiProviderWalletBoundaryGuard003D,
): Router => {
  router.get('/api/taxi/003d/provider-wallet-boundary/plan', (_request, response) => {
    ok003D(response, {
      plan: buildTaxiProviderWalletBoundaryRoutePatchPlan003D(),
      gates: taxiProviderWalletBoundaryGates003D,
      safety: buildTaxiProviderWalletBoundaryRoutePatchSafety003D(),
    });
  });

  router.post('/api/taxi/003d/provider-wallet-boundary/check', (request, response) => {
    if (!hasBoundaryHeader003D(request)) {
      forbidden003D(response, 'taxi_provider_wallet_boundary_header_required_003d');
      return;
    }

    stillBlocked003D(response);
  });

  router.get('/api/admin/taxi/003d/provider-wallet-boundary/diagnostics', (request, response) => {
    if (!guard.requireAdminToken(request, response)) return;
    ok003D(response, {
      diagnostics: {
        ...buildTaxiProviderWalletBoundaryRoutePatchPlan003D(),
        providerCredentialRuntimeLookupApprovedNow: false,
        providerRuntimeApprovedNow: false,
        walletRuntimeApprovedNow: false,
        paymentRuntimeApprovedNow: false,
        payoutRuntimeApprovedNow: false,
      },
      safety: buildTaxiProviderWalletBoundaryRoutePatchSafety003D(),
    });
  });

  return router;
};
