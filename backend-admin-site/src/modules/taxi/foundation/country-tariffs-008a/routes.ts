import { Router, type Request, type Response } from 'express';
import {
  TAXI_COUNTRY_TARIFFS_008A_APPROVAL_HEADER,
  TAXI_COUNTRY_TARIFFS_008A_APPROVAL_VALUE,
  TAXI_COUNTRY_TARIFFS_008A_IDEMPOTENCY_HEADER,
} from './constants';
import {
  buildTaxiCountryTariffsReadiness008A,
  buildTaxiSabiAiPriceMonitor008B,
  listTaxiCountryTariffs008A,
  saveTaxiCountryTariffs008A,
} from './service';
import type { TaxiCountryTariffSavePayload008A } from './types';

type TaxiCountryTariffsRouteDeps008A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function setHeaders008A(res: Response): void {
  res.setHeader('x-sabi-taxi-country-tariffs', '008a');
  res.setHeader('x-sabi-peak-pickup-increase-percent', '100');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.setHeader('x-sabi-provider-dispatch', 'false');
  res.setHeader('x-sabi-wallet-mutation', 'false');
  res.setHeader('x-sabi-taxi-ai-price-monitor', '008b');
  res.setHeader('x-sabi-competitor-private-api-scraping', 'false');
}

function ok008A(res: Response, body: Record<string, unknown>): void {
  setHeaders008A(res);
  res.json({ ok: true, ...body });
}

function hasExecutionApproval008A(req: Request): boolean {
  return String(req.headers[TAXI_COUNTRY_TARIFFS_008A_APPROVAL_HEADER] || '').trim() === TAXI_COUNTRY_TARIFFS_008A_APPROVAL_VALUE;
}

function forbidden008A(res: Response): void {
  setHeaders008A(res);
  res.status(403).json({
    ok: false,
    code: 'taxi_country_tariffs_008a_exact_owner_execution_header_missing',
    error: 'taxi_country_tariffs_008a_execution_header_required',
    requiredHeader: TAXI_COUNTRY_TARIFFS_008A_APPROVAL_HEADER,
    requiredValue: TAXI_COUNTRY_TARIFFS_008A_APPROVAL_VALUE,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeSuccessBlocked: true,
  });
}

function payload008A(req: Request): TaxiCountryTariffSavePayload008A {
  return req.body && typeof req.body === 'object' ? req.body as TaxiCountryTariffSavePayload008A : {};
}

function actorId008A(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

function idempotencyKey008A(req: Request): string {
  return String(req.headers[TAXI_COUNTRY_TARIFFS_008A_IDEMPOTENCY_HEADER] || '').trim();
}

export function registerTaxiCountryTariffs008ARoutes(router: Router, deps: TaxiCountryTariffsRouteDeps008A): void {
  router.get('/api/admin/taxi/tariffs/008a/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok008A(res, { readiness: buildTaxiCountryTariffsReadiness008A() });
  });

  router.get('/api/admin/taxi/tariffs/008a/country-tariffs', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      ok008A(res, await listTaxiCountryTariffs008A());
    } catch (error) {
      setHeaders008A(res);
      res.status(500).json({ ok: false, code: 'taxi_country_tariffs_008a_list_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true });
    }
  });



  router.get('/api/admin/taxi/tariffs/008b/sabi-ai-price-monitor', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await buildTaxiSabiAiPriceMonitor008B({
        countryCode: req.query.countryCode,
        discountPercent: req.query.discountPercent,
      });
      setHeaders008A(res);
      res.status(result.ok ? 200 : 409).json(result);
    } catch (error) {
      setHeaders008A(res);
      res.status(500).json({
        ok: false,
        code: 'taxi_sabi_ai_price_monitor_008b_failed',
        error: error instanceof Error ? error.message : 'unknown_error',
        fakeSuccessBlocked: true,
        tariffWriteExecuted: false,
        dbWriteExecuted: false,
        providerDispatch: false,
      });
    }
  });

  router.post('/api/admin/taxi/tariffs/008a/country-tariffs', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasExecutionApproval008A(req)) {
      forbidden008A(res);
      return;
    }
    try {
      const result = await saveTaxiCountryTariffs008A(payload008A(req), idempotencyKey008A(req), actorId008A(req));
      setHeaders008A(res);
      res.status(result.ok ? 200 : 409).json(result);
    } catch (error) {
      setHeaders008A(res);
      res.status(500).json({ ok: false, code: 'taxi_country_tariffs_008a_save_failed', error: error instanceof Error ? error.message : 'unknown_error', dbWriteExecuted: false, fakeSuccessBlocked: true });
    }
  });
}
