import { Router, type Request, type Response } from 'express';
import {
  createTaxiAgentSafeDisabledResponse029A,
  getTaxiAgentApplicationAccessReadiness029A,
} from './service';

type TaxiAgentApplicationAccessRouteDeps029A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-agent-flow', '029a');
  res.setHeader('x-sabi-money-movement', 'blocked');
}

function blocked(res: Response, code: string): void {
  noStore(res);
  res.status(409).json(createTaxiAgentSafeDisabledResponse029A(code));
}

function adminBlocked(req: Request, res: Response, deps: TaxiAgentApplicationAccessRouteDeps029A, code: string): void {
  if (!deps.requireAdminToken(req, res)) return;
  blocked(res, code);
}

export function registerTaxiAgentApplicationAccess029ARoutes(router: Router, deps: TaxiAgentApplicationAccessRouteDeps029A): void {
  router.get('/api/taxi/agent/029a/readiness', (_req, res) => {
    noStore(res);
    res.json({ ok: true, readiness: getTaxiAgentApplicationAccessReadiness029A() });
  });

  router.post('/api/taxi/agents/applications', (_req, res) => {
    blocked(res, 'taxi_agent_application_requires_db_mobile_auth_and_admin_review_029a');
  });

  router.get('/api/taxi/mobile/agent/access', (_req, res) => {
    noStore(res);
    res.status(403).json({
      ...createTaxiAgentSafeDisabledResponse029A('taxi_mobile_agent_access_requires_approved_agent_claim_029a', 'taxi_agent_access_denied'),
      safeDisabled: true,
      mobileAgentScreenVisible: false,
      allowedRole: 'approved_taxi_agent',
    });
  });

  router.post('/api/taxi/mobile/agent/driver-balance-topup/request', (_req, res) => {
    blocked(res, 'taxi_driver_balance_topup_only_via_approved_agent_029a');
  });

  router.post('/api/taxi-finance/admin/agents/contacts', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_agent_contacts_requires_db_binding_029a'));
  router.post('/api/taxi-finance/admin/agents/chat/open', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_agent_chat_requires_db_binding_029a'));
  router.post('/api/taxi-finance/admin/agents/chat/send', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_agent_message_requires_db_binding_029a'));
  router.post('/api/taxi-finance/admin/agents/payment-link/create', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_official_payment_link_requires_provider_binding_029a'));
  router.post('/api/taxi-finance/admin/agents/proof/attach', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_proof_or_txhash_required_before_credit_029a'));
  router.post('/api/taxi-finance/admin/agents/fx/preview', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_fx_preview_requires_server_rate_source_029a'));
  router.post('/api/taxi-finance/admin/agents/internal-credit/submit', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_internal_credit_blocked_until_wallet_db_provider_029a'));
  router.post('/api/taxi-finance/admin/agents/report/daily', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_agent_daily_report_requires_db_binding_029a'));
  router.post('/api/taxi-finance/admin/agents/archive/search', (req, res) => adminBlocked(req, res, deps, 'taxi_finance_agent_archive_requires_db_binding_029a'));
}
