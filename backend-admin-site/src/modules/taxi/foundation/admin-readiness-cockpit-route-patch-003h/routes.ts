import type { Router, Request, Response } from 'express';
import { applyTaxiRuntimeHardeningHeaders002P } from '../runtime-hardening-protected-routes-002p';
import {
  TAXI_ADMIN_READINESS_COCKPIT_HEADER_003H,
  TAXI_ADMIN_READINESS_COCKPIT_HEADER_VALUE_003H,
} from './constants';
import {
  buildTaxiAdminReadinessCockpitBlockedResult003H,
  buildTaxiAdminReadinessCockpitRoutePatchSafety003H,
  buildTaxiAdminReadinessCockpitRoutePatchSnapshot003H,
} from './service';
import type { TaxiAdminReadinessCockpitRoutePatchGuard003H } from './types';

const ok003H = (response: Response, data: Record<string, unknown>): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.json({ ok: true, ...data });
};

const forbidden003H = (response: Response, code: string): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(403).json({
    ok: false,
    error: 'taxi_admin_readiness_cockpit_forbidden',
    code,
    requiredHeader: TAXI_ADMIN_READINESS_COCKPIT_HEADER_003H,
    providerCredentialRuntimeLookup: false,
    providerDispatch: false,
    walletMutation: false,
    payment: false,
    payout: false,
    dbRead: false,
    dbWrite: false,
    fakeSuccessBlocked: true,
  });
};

const stillBlocked003H = (response: Response): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(409).json({
    ok: false,
    code: 'taxi_admin_readiness_cockpit_still_boundary_only_003h',
    cockpit: buildTaxiAdminReadinessCockpitBlockedResult003H(),
  });
};

const hasCockpitHeader003H = (request: Request): boolean => {
  const headerValue = String(request.headers[TAXI_ADMIN_READINESS_COCKPIT_HEADER_003H] || '').trim();
  return headerValue === TAXI_ADMIN_READINESS_COCKPIT_HEADER_VALUE_003H;
};

export const registerTaxiAdminReadinessCockpitRoutePatch003H = (
  router: Router,
  guard: TaxiAdminReadinessCockpitRoutePatchGuard003H,
): Router => {
  router.get('/api/taxi/003h/admin-readiness-cockpit/plan', (_request, response) => {
    ok003H(response, buildTaxiAdminReadinessCockpitRoutePatchSnapshot003H());
  });

  router.post('/api/taxi/003h/admin-readiness-cockpit/check', (request, response) => {
    if (!hasCockpitHeader003H(request)) {
      forbidden003H(response, 'taxi_admin_readiness_cockpit_header_required_003h');
      return;
    }

    stillBlocked003H(response);
  });

  router.get('/api/admin/taxi/003h/admin-readiness-cockpit/diagnostics', (request, response) => {
    if (!guard.requireAdminToken(request, response)) return;
    ok003H(response, {
      diagnostics: buildTaxiAdminReadinessCockpitRoutePatchSnapshot003H(),
      safety: buildTaxiAdminReadinessCockpitRoutePatchSafety003H(),
    });
  });

  return router;
};
