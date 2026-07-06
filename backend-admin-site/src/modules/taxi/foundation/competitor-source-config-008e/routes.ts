import { Router, type Request, type Response } from 'express';
import {
  buildTaxiCompetitorSourceConfig008E,
  buildTaxiCompetitorSourceConfigReadiness008E,
} from './service';

type TaxiCompetitorSourceConfigRouteDeps008E = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function setHeaders008E(res: Response): void {
  res.setHeader('x-sabi-taxi-competitor-source-config', '008e');
  res.setHeader('x-sabi-legal-public-sources-only', 'true');
  res.setHeader('x-sabi-private-api-scraping', 'false');
  res.setHeader('x-sabi-fake-price-generation', 'false');
  res.setHeader('x-sabi-tariff-write-executed', 'false');
  res.setHeader('x-sabi-wallet-mutation', 'false');
}

export function registerTaxiCompetitorSourceConfig008ERoutes(router: Router, deps: TaxiCompetitorSourceConfigRouteDeps008E): void {
  router.get('/api/admin/taxi/tariffs/008e/competitor-source-config/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    setHeaders008E(res);
    res.json({ ok: true, readiness: buildTaxiCompetitorSourceConfigReadiness008E() });
  });

  router.get('/api/admin/taxi/tariffs/008e/competitor-source-config', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const result = buildTaxiCompetitorSourceConfig008E({ countryCode: req.query.countryCode });
    setHeaders008E(res);
    res.status(result.ok ? 200 : 409).json(result);
  });
}
