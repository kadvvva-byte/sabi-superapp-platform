import type { Router, Request, Response } from 'express';
import { applyTaxiRuntimeHardeningHeaders002P } from '../runtime-hardening-protected-routes-002p';
import {
  TAXI_DB_WRITE_RUNTIME_APPROVAL_HEADER_002X,
  TAXI_DB_WRITE_RUNTIME_APPROVAL_HEADER_VALUE_002X,
} from './constants';
import {
  buildTaxiDbWriteRuntimeGateResult002X,
  buildTaxiDbWriteRuntimeRoutePatchPlan002X,
  buildTaxiDbWriteRuntimeRoutePatchSafety002X,
} from './service';
import type { TaxiDbWriteRuntimeRouteGuard002X } from './types';

const writeOk002X = (response: Response, data: Record<string, unknown>): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.json({ ok: true, ...data });
};

const writeForbidden002X = (response: Response, code: string): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(403).json({
    ok: false,
    error: 'taxi_db_write_runtime_forbidden',
    code,
    requiredHeader: TAXI_DB_WRITE_RUNTIME_APPROVAL_HEADER_002X,
    walletMutation: false,
    providerDispatch: false,
    payment: false,
    payout: false,
    fakeSuccessBlocked: true,
  });
};

const writeStillBlocked002X = (response: Response): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(409).json({
    ok: false,
    code: 'taxi_db_write_runtime_still_blocked_until_002y',
    gate: buildTaxiDbWriteRuntimeGateResult002X(),
  });
};

const hasDbWriteGateHeader002X = (request: Request): boolean => {
  const headerValue = String(request.headers[TAXI_DB_WRITE_RUNTIME_APPROVAL_HEADER_002X] || '').trim();
  return headerValue === TAXI_DB_WRITE_RUNTIME_APPROVAL_HEADER_VALUE_002X;
};

export const registerTaxiDbWriteRuntimeRoutePatch002X = (
  router: Router,
  guard: TaxiDbWriteRuntimeRouteGuard002X,
): Router => {
  router.get('/api/taxi/002x/db-write-runtime/plan', (_request, response) => {
    writeOk002X(response, {
      plan: buildTaxiDbWriteRuntimeRoutePatchPlan002X(),
      safety: buildTaxiDbWriteRuntimeRoutePatchSafety002X(),
    });
  });

  router.post('/api/taxi/002x/db-write-runtime/write-gate', (request, response) => {
    if (!hasDbWriteGateHeader002X(request)) {
      writeForbidden002X(response, 'taxi_db_write_runtime_header_required_002x');
      return;
    }

    writeStillBlocked002X(response);
  });

  router.get('/api/admin/taxi/002x/db-write-runtime/diagnostics', (request, response) => {
    if (!guard.requireAdminToken(request, response)) return;
    writeOk002X(response, {
      diagnostics: {
        ...buildTaxiDbWriteRuntimeRoutePatchPlan002X(),
        dbWriteExecutionApprovedNow: false,
        walletRuntimeApprovedNow: false,
        providerRuntimeApprovedNow: false,
        paymentRuntimeApprovedNow: false,
      },
    });
  });

  return router;
};
