import type { Router, Request, Response } from 'express';
import { applyTaxiRuntimeHardeningHeaders002P } from '../runtime-hardening-protected-routes-002p';
import {
  TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_002T,
  TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_VALUE_002T,
} from './constants';
import {
  buildTaxiReadOnlyDbDryRunPatchSafety002T,
  buildTaxiReadOnlyDbDryRunPlan002T,
  runTaxiReadOnlyDbRuntimeDryRun002T,
} from './service';
import type { TaxiReadOnlyDbDryRunRouteGuard002T } from './types';

const writeOk002T = (response: Response, data: Record<string, unknown>): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.json({ ok: true, ...data });
};

const writeForbidden002T = (response: Response, code: string): void => {
  applyTaxiRuntimeHardeningHeaders002P(response);
  response.status(403).json({
    ok: false,
    error: 'taxi_read_only_db_dry_run_forbidden',
    code,
    requiredHeader: TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_002T,
    walletMutation: false,
    providerDispatch: false,
    fakeSuccessBlocked: true,
  });
};

const hasReadOnlyDryRunApprovalHeader002T = (request: Request): boolean => {
  const headerValue = String(request.headers[TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_002T] || '').trim();
  return headerValue === TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_VALUE_002T;
};

export const registerTaxiReadOnlyDbDryRunRoutes002T = (
  router: Router,
  guard: TaxiReadOnlyDbDryRunRouteGuard002T,
): Router => {
  router.get('/api/taxi/002t/read-only-db-dry-run/plan', (_request, response) => {
    writeOk002T(response, {
      plan: buildTaxiReadOnlyDbDryRunPlan002T(),
      safety: buildTaxiReadOnlyDbDryRunPatchSafety002T(),
    });
  });

  router.get('/api/taxi/002t/read-only-db-dry-run', async (request, response) => {
    if (!hasReadOnlyDryRunApprovalHeader002T(request)) {
      writeForbidden002T(response, 'taxi_read_only_db_dry_run_header_required_002t');
      return;
    }

    const result = await runTaxiReadOnlyDbRuntimeDryRun002T();
    writeOk002T(response, {
      dryRun: result,
      dbReadExecuted: true,
      dbWriteExecuted: false,
      walletMutation: false,
      providerDispatch: false,
      fakeSuccessBlocked: true,
    });
  });

  router.get('/api/admin/taxi/002t/read-only-db-dry-run/diagnostics', async (request, response) => {
    if (!guard.requireAdminToken(request, response)) return;
    if (!hasReadOnlyDryRunApprovalHeader002T(request)) {
      writeForbidden002T(response, 'taxi_read_only_db_dry_run_header_required_002t');
      return;
    }

    const result = await runTaxiReadOnlyDbRuntimeDryRun002T();
    writeOk002T(response, {
      diagnostics: {
        ...result,
        routePatchApprovedNow: true,
        dbWriteApprovedNow: false,
        walletRuntimeApprovedNow: false,
        providerRuntimeApprovedNow: false,
      },
    });
  });

  return router;
};
