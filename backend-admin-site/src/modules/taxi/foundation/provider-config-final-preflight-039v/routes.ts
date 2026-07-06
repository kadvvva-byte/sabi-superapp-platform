import { getTaxi039VProviderConfigFinalPreflightReadiness, getTaxi039VProviderConfigFinalPreflightSummary } from './service';

type RouterLike = { get: (path: string, ...handlers: Array<(req: unknown, res: ResponseLike, next?: () => void) => unknown>) => unknown };
type ResponseLike = { setHeader: (name: string, value: string) => unknown; status: (code: number) => { json: (body: unknown) => unknown }; json: (body: unknown) => unknown };

const SAFETY_HEADERS: Record<string, string> = {
  "x-sabi-money-movement": "blocked",
  "x-sabi-wallet-mutation": "blocked",
  "x-sabi-payment-execution": "blocked",
  "x-sabi-payout-execution": "blocked",
  "x-sabi-provider-call": "blocked",
  "x-sabi-db-write": "blocked",
  "x-sabi-production-launch": "blocked",
  "x-sabi-standalone-taxi-wallet": "blocked",
  "x-sabi-taxi-commission-bps": "0",
  "x-sabi-visa-cashback-bps": "200",
  "x-sabi-owner-sabi-ai-autonomous-execution": "blocked",
  "x-sabi-provider-config-final-preflight": "locked",
  "x-sabi-api-key-value-accepted": "blocked",
  "x-sabi-env-read": "blocked",
  "x-sabi-secret-read": "blocked"
};

function setSafetyHeaders(res: ResponseLike): void {
  for (const [key, value] of Object.entries(SAFETY_HEADERS)) res.setHeader(key, value);
}

function publicReadiness(_req: unknown, res: ResponseLike): unknown {
  setSafetyHeaders(res);
  return res.status(200).json(getTaxi039VProviderConfigFinalPreflightReadiness());
}
function publicSummary(_req: unknown, res: ResponseLike): unknown {
  setSafetyHeaders(res);
  return res.status(200).json(getTaxi039VProviderConfigFinalPreflightSummary());
}
function adminForbidden(_req: unknown, res: ResponseLike): unknown {
  return res.status(403).json({ ok: false, code: 'admin_token_required' });
}

export function registerTaxi039VProviderConfigFinalPreflightRoutes(router: RouterLike): void {
  router.get('/api/taxi/wallet-finance/provider-config-final-preflight/039v/readiness', publicReadiness);
  router.get('/api/taxi/wallet-finance/provider-config-final-preflight/039v/summary', publicSummary);
  router.get('/taxi/wallet-finance/provider-config-final-preflight/039v/readiness', publicReadiness);
  router.get('/taxi/wallet-finance/provider-config-final-preflight/039v/summary', publicSummary);
  router.get('/wallet-finance/provider-config-final-preflight/039v/readiness', publicReadiness);
  router.get('/wallet-finance/provider-config-final-preflight/039v/summary', publicSummary);
  router.get('/api/admin/taxi/wallet-finance/provider-config-final-preflight/039v/readiness', adminForbidden);
  router.get('/api/admin/taxi/wallet-finance/provider-config-final-preflight/039v/summary', adminForbidden);
}
