import { Router, type Request, type Response } from 'express';
import {
  createTaxiAgentContactSafeReadBlockedResponse034C,
  getTaxiAgentContactSafeReadContract034C,
  getTaxiAgentContactSafeReadDirectory034C,
  getTaxiAgentContactSafeReadReadiness034C,
  getTaxiAgentContactSafeReadSafety034C,
} from './service';

type TaxiAgentContactSafeReadRouteDeps034C = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore034C(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-agent-contact-contract', '034c');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok034C(res: Response, data: Record<string, unknown>): void {
  noStore034C(res);
  res.json({ ok: true, ...data });
}

function blocked034C(res: Response, code: string): void {
  noStore034C(res);
  res.status(409).json(createTaxiAgentContactSafeReadBlockedResponse034C(code));
}

export function registerTaxiAgentContactSafeReadContract034CRoutes(router: Router, deps: TaxiAgentContactSafeReadRouteDeps034C): void {
  router.get('/api/taxi/mobile/agent/contact/034c/readiness', (_req, res) => {
    ok034C(res, { readiness: getTaxiAgentContactSafeReadReadiness034C() });
  });

  router.get('/api/taxi/mobile/agent/contact/034c/contract', (_req, res) => {
    ok034C(res, { contract: getTaxiAgentContactSafeReadContract034C() });
  });

  router.get('/api/taxi/mobile/agent/contact/034c/directory', (_req, res) => {
    ok034C(res, { directory: getTaxiAgentContactSafeReadDirectory034C() });
  });

  router.get('/api/taxi/mobile/agent/contact/034c/permissions', (_req, res) => {
    const readiness = getTaxiAgentContactSafeReadReadiness034C();
    ok034C(res, {
      permissionGates: readiness.permissionGates,
      existingAgentFinanceBridge030AAcknowledged: readiness.existingAgentFinanceBridge030AAcknowledged,
      walletPaymentPayoutTopupExecution: readiness.walletPaymentPayoutTopupExecution,
      safety: readiness.safety,
    });
  });

  router.get('/api/taxi/mobile/agent/contact/034c/owner-ai', (_req, res) => {
    ok034C(res, {
      ownerSabiAi: {
        status: 'review_contract_ready_report_only_no_mutation',
        privateOwnerReportRequired: true,
        dailyRiskReportRequired: true,
        urgentViolationReportRequired: true,
        ownerApprovalRequiredBeforeAnyMutation: true,
        safety: getTaxiAgentContactSafeReadSafety034C(),
      },
    });
  });

  router.post('/api/taxi/mobile/agent/contact/034c/request', (_req, res) => {
    blocked034C(res, 'taxi_agent_contact_request_requires_mobile_auth_db_messenger_owner_ai_review_034c');
  });

  router.get('/api/admin/taxi/agent-contact/034c/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034C(res, { readiness: getTaxiAgentContactSafeReadReadiness034C() });
  });
}
