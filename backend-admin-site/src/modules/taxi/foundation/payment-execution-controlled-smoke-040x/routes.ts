import { getTaxi040XReadiness, getTaxi040XSummary } from './service';

function set040XSafetyHeaders(res: any): void {
  if (!res || typeof res.setHeader !== 'function') return;
  res.setHeader('x-sabi-money-movement', 'controlled-payment-smoke-no-payout');
  res.setHeader('x-sabi-wallet-mutation', 'previous-main-wallet-ledger-live-gate-verified-no-new-money');
  res.setHeader('x-sabi-payment-execution', 'controlled-payment-execution-smoke-no-payout');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-provider-call', 'previous-handshake-verified-no-new-money');
  res.setHeader('x-sabi-db-write', 'previous-db-production-apply-gate-verified-no-new-money');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-standalone-taxi-wallet', 'blocked');
  res.setHeader('x-sabi-taxi-commission-bps', '0');
  res.setHeader('x-sabi-visa-cashback-bps', '200');
  res.setHeader('x-sabi-owner-sabi-ai-autonomous-execution', 'blocked');
  res.setHeader('x-sabi-payment-execution-controlled-smoke', 'controlled-payment-execution-smoke-no-payout');
  res.setHeader('x-sabi-api-key-value-accepted', 'blocked');
  res.setHeader('x-sabi-env-read', 'blocked');
  res.setHeader('x-sabi-secret-read', 'controlled-no-print');
}

function sendJson(res: any, status: number, body: unknown): void {
  set040XSafetyHeaders(res);
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

export function registerTaxiPaymentExecutionControlledSmoke040XRoutes(router: any): void {
  if (!router || typeof router.get !== 'function') return;
  const publicReadiness = (_req: any, res: any) => sendJson(res, 200, getTaxi040XReadiness());
  const publicSummary = (_req: any, res: any) => sendJson(res, 200, getTaxi040XSummary());

  router.get('/api/taxi/wallet-finance/payment-execution-controlled-smoke/040x/readiness', publicReadiness);
  router.get('/api/taxi/wallet-finance/payment-execution-controlled-smoke/040x/summary', publicSummary);
  router.get('/taxi/wallet-finance/payment-execution-controlled-smoke/040x/readiness', publicReadiness);
  router.get('/taxi/wallet-finance/payment-execution-controlled-smoke/040x/summary', publicSummary);

  router.get('/api/admin/taxi/wallet-finance/payment-execution-controlled-smoke/040x/readiness', forbiddenAdmin);
  router.get('/api/admin/taxi/wallet-finance/payment-execution-controlled-smoke/040x/summary', forbiddenAdmin);
}
