import { getTaxi040AReadiness, getTaxi040ASummary } from './service';

function set040ASafetyHeaders(res: any): void {
  if (!res || typeof res.setHeader !== 'function') return;
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
  res.setHeader('x-sabi-provider-binding-execution-locked-gate', 'locked');
  res.setHeader('x-sabi-api-key-value-accepted', 'blocked');
  res.setHeader('x-sabi-env-read', 'blocked');
  res.setHeader('x-sabi-secret-read', 'blocked');
}

function sendJson(res: any, status: number, body: unknown): void {
  set040ASafetyHeaders(res);
  if (res && typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(body);
    return;
  }
  if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') {
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  }
}

function forbiddenAdmin(_req: any, res: any): void {
  if (res && typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(403).json({ error: 'admin_token_required' });
    return;
  }
  if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') {
    res.writeHead(403, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'admin_token_required' }));
  }
}

export function registerTaxiProviderBindingExecutionLockedGate040ARoutes(router: any): void {
  if (!router || typeof router.get !== 'function') return;
  const publicReadiness = (_req: any, res: any) => sendJson(res, 200, getTaxi040AReadiness());
  const publicSummary = (_req: any, res: any) => sendJson(res, 200, getTaxi040ASummary());

  router.get('/api/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/readiness', publicReadiness);
  router.get('/api/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/summary', publicSummary);
  router.get('/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/readiness', publicReadiness);
  router.get('/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/summary', publicSummary);

  router.get('/api/admin/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/readiness', forbiddenAdmin);
  router.get('/api/admin/taxi/wallet-finance/provider-binding-execution-locked-gate/040a/summary', forbiddenAdmin);
}
