import { Router, type Request, type Response } from 'express';
import {
  createTaxiApprovedAgentDirectoryBlockedResponse034D,
  getTaxiApprovedAgentDirectory034D,
  getTaxiApprovedAgentDirectoryAudit034D,
  getTaxiApprovedAgentDirectoryReadiness034D,
  getTaxiApprovedAgentDirectoryRecord034D,
  getTaxiApprovedAgentDirectorySafety034D,
} from './service';

type TaxiApprovedAgentDirectoryRouteDeps034D = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore034D(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-agent-directory-runtime', '034d');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok034D(res: Response, data: Record<string, unknown>): void {
  noStore034D(res);
  res.json({ ok: true, ...data });
}

function blocked034D(res: Response, code: string): void {
  noStore034D(res);
  res.status(409).json(createTaxiApprovedAgentDirectoryBlockedResponse034D(code));
}

export function registerTaxiApprovedAgentDirectorySafeReadRuntime034DRoutes(
  router: Router,
  deps: TaxiApprovedAgentDirectoryRouteDeps034D,
): void {
  router.get('/api/taxi/mobile/agent/directory/034d/readiness', (_req, res) => {
    ok034D(res, { readiness: getTaxiApprovedAgentDirectoryReadiness034D() });
  });

  router.get('/api/taxi/mobile/agent/directory/034d/records', (_req, res) => {
    ok034D(res, { directory: getTaxiApprovedAgentDirectory034D() });
  });

  router.get('/api/taxi/mobile/agent/directory/034d/agent/:agentPublicId', (req, res) => {
    ok034D(res, { directory: getTaxiApprovedAgentDirectoryRecord034D(String(req.params.agentPublicId || '')) });
  });

  router.get('/api/taxi/mobile/agent/directory/034d/permissions', (_req, res) => {
    const readiness = getTaxiApprovedAgentDirectoryReadiness034D();
    ok034D(res, {
      permissionGates: readiness.permissionGates,
      safeFields: readiness.safeFields,
      blockedRawFields: readiness.blockedRawFields,
      walletPaymentPayoutTopupExecution: readiness.walletPaymentPayoutTopupExecution,
      safety: readiness.safety,
    });
  });

  router.get('/api/taxi/mobile/agent/directory/034d/owner-ai', (_req, res) => {
    ok034D(res, {
      ownerSabiAi: {
        status: 'directory_safe_read_review_ready_report_only_no_mutation',
        privateOwnerReportRequired: true,
        suspiciousAgentDirectoryChangeMustBeReported: true,
        ownerApprovalRequiredBeforeContactOrMoneyExecution: true,
        safety: getTaxiApprovedAgentDirectorySafety034D(),
      },
    });
  });

  router.post('/api/taxi/mobile/agent/directory/034d/contact-request', (_req, res) => {
    blocked034D(res, 'taxi_agent_directory_contact_request_requires_auth_messenger_owner_ai_wallet_gates_034d');
  });

  router.get('/api/admin/taxi/agent-directory/034d/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034D(res, { readiness: getTaxiApprovedAgentDirectoryReadiness034D() });
  });

  router.get('/api/admin/taxi/agent-directory/034d/audit', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034D(res, { audit: getTaxiApprovedAgentDirectoryAudit034D() });
  });
}
