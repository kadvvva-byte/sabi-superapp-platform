import { Router, type Request, type Response } from 'express';
import {
  TAXI_COUNTRY_TARIFFS_008C_APPROVAL_HEADER,
  TAXI_COUNTRY_TARIFFS_008C_APPROVAL_VALUE,
  TAXI_COUNTRY_TARIFFS_008C_IDEMPOTENCY_HEADER,
} from './constants';
import {
  buildTaxiCountryTariffsReadiness008C,
  listTaxiCountryTariffsAuditJournal008C,
  saveTaxiCountryTariffs008C,
} from './service';
import type { TaxiCountryTariffSavePayload008C } from './types';

type TaxiCountryTariffsRouteDeps008C = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function setHeaders008C(res: Response): void {
  res.setHeader('x-sabi-taxi-country-tariffs', '008c');
  res.setHeader('x-sabi-peak-pickup-increase-percent', '100');
  res.setHeader('x-sabi-taxi-tariffs-production-save-audit', 'enabled');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.setHeader('x-sabi-provider-dispatch', 'false');
  res.setHeader('x-sabi-wallet-mutation', 'false');
}

function hasExecutionApproval008C(req: Request): boolean {
  return String(req.headers[TAXI_COUNTRY_TARIFFS_008C_APPROVAL_HEADER] || '').trim() === TAXI_COUNTRY_TARIFFS_008C_APPROVAL_VALUE;
}

function forbidden008C(res: Response): void {
  setHeaders008C(res);
  res.status(403).json({
    ok: false,
    code: 'taxi_country_tariffs_008c_exact_owner_execution_header_missing',
    error: 'taxi_country_tariffs_008c_production_save_approval_required',
    requiredHeader: TAXI_COUNTRY_TARIFFS_008C_APPROVAL_HEADER,
    requiredValue: TAXI_COUNTRY_TARIFFS_008C_APPROVAL_VALUE,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeSuccessBlocked: true,
  });
}

function payload008C(req: Request): TaxiCountryTariffSavePayload008C {
  return req.body && typeof req.body === 'object' ? req.body as TaxiCountryTariffSavePayload008C : {};
}

function actorId008C(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

function idempotencyKey008C(req: Request): string {
  return String(req.headers[TAXI_COUNTRY_TARIFFS_008C_IDEMPOTENCY_HEADER] || '').trim();
}

export function registerTaxiCountryTariffs008CRoutes(router: Router, deps: TaxiCountryTariffsRouteDeps008C): void {
  router.get('/api/admin/taxi/tariffs/008c/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    setHeaders008C(res);
    res.json({ ok: true, readiness: buildTaxiCountryTariffsReadiness008C() });
  });

  router.get('/api/admin/taxi/tariffs/008c/audit-journal', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await listTaxiCountryTariffsAuditJournal008C({ countryCode: req.query.countryCode, limit: req.query.limit });
      setHeaders008C(res);
      res.status(result.ok ? 200 : 409).json(result);
    } catch (error) {
      setHeaders008C(res);
      res.status(500).json({ ok: false, code: 'taxi_country_tariffs_008c_audit_journal_failed', error: error instanceof Error ? error.message : 'unknown_error', dbReadExecuted: false, dbWriteExecuted: false, fakeSuccessBlocked: true });
    }
  });

  router.post('/api/admin/taxi/tariffs/008c/production-save', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasExecutionApproval008C(req)) {
      forbidden008C(res);
      return;
    }
    try {
      const result = await saveTaxiCountryTariffs008C(payload008C(req), idempotencyKey008C(req), actorId008C(req));
      setHeaders008C(res);
      res.status(result.ok ? 200 : 409).json(result);
    } catch (error) {
      setHeaders008C(res);
      res.status(500).json({ ok: false, code: 'taxi_country_tariffs_008c_production_save_failed', error: error instanceof Error ? error.message : 'unknown_error', dbWriteExecuted: false, auditWriteExecuted: false, fakeSuccessBlocked: true });
    }
  });
}
