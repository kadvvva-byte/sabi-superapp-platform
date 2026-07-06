import { getTaxi039XProviderBindingFinalGateReadiness, getTaxi039XProviderBindingFinalGateSummary } from './service';

function setTaxi039XSafetyHeaders(res: any): void {
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-standalone-taxi-wallet', 'blocked');
  res.setHeader('x-sabi-taxi-commission-bps', '0');
  res.setHeader('x-sabi-visa-cashback-bps', '200');
  res.setHeader('x-sabi-owner-sabi-ai-autonomous-execution', 'blocked');
  res.setHeader('x-sabi-provider-binding-final-gate', 'locked');
  res.setHeader('x-sabi-api-key-value-accepted', 'blocked');
  res.setHeader('x-sabi-env-read', 'blocked');
  res.setHeader('x-sabi-secret-read', 'blocked');
}

function sendSafeJson(res: any, body: unknown): void {
  setTaxi039XSafetyHeaders(res);
  res.status(200).json(body);
}

function requireTaxi039XAdminToken(req: any, res: any, next: () => void): void {
  const token = req?.headers?.['x-sabi-admin-token'] || req?.headers?.authorization;
  if (!token) {
    res.status(403).json({ ok: false, code: 'admin_token_required' });
    return;
  }
  next();
}

export function registerTaxiProviderBindingFinalGate039XRoutes(router: any): void {
  const publicBase = '/api/taxi/wallet-finance/provider-binding-final-gate/039x';
  const adminBase = '/api/admin/taxi/wallet-finance/provider-binding-final-gate/039x';

  router.get(publicBase + '/readiness', (_req: any, res: any) => {
    sendSafeJson(res, getTaxi039XProviderBindingFinalGateReadiness());
  });
  router.get(publicBase + '/summary', (_req: any, res: any) => {
    sendSafeJson(res, getTaxi039XProviderBindingFinalGateSummary());
  });
  router.get(adminBase + '/readiness', requireTaxi039XAdminToken, (_req: any, res: any) => {
    sendSafeJson(res, getTaxi039XProviderBindingFinalGateReadiness());
  });
  router.get(adminBase + '/summary', requireTaxi039XAdminToken, (_req: any, res: any) => {
    sendSafeJson(res, getTaxi039XProviderBindingFinalGateSummary());
  });
}
