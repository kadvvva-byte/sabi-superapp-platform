import { Router, type Request, type Response } from 'express';
import {
  createTaxiAgentFinanceBridgeSafeDisabledResponse030A,
  getTaxiAgentFinanceAdminMobileBridgeReadiness030A,
} from './service';

type TaxiAgentFinanceBridgeRouteDeps030A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-agent-finance-bridge', '030a');
  res.setHeader('x-sabi-money-movement', 'blocked');
}

function blocked(res: Response, code: string): void {
  noStore(res);
  res.status(409).json(createTaxiAgentFinanceBridgeSafeDisabledResponse030A(code));
}

function adminBlocked(req: Request, res: Response, deps: TaxiAgentFinanceBridgeRouteDeps030A, code: string): void {
  if (!deps.requireAdminToken(req, res)) return;
  blocked(res, code);
}

export function registerTaxiAgentFinanceAdminMobileBridge030ARoutes(router: Router, deps: TaxiAgentFinanceBridgeRouteDeps030A): void {
  router.get('/api/taxi/agent-finance/030a/readiness', (_req, res) => {
    noStore(res);
    res.json({ ok: true, readiness: getTaxiAgentFinanceAdminMobileBridgeReadiness030A() });
  });

  router.post('/api/taxi/mobile/agent/finance/context', (_req, res) => {
    blocked(res, 'mobile_agent_finance_context_requires_approved_agent_auth_db_and_admin_account_binding_030a');
  });

  router.post('/api/taxi/mobile/agent/finance/chat/send', (_req, res) => {
    blocked(res, 'mobile_agent_to_owner_admin_finance_chat_requires_messenger_storage_binding_030a');
  });

  router.post('/api/taxi/mobile/agent/finance/receipt/send', (_req, res) => {
    blocked(res, 'mobile_agent_receipt_photo_screenshot_upload_requires_file_storage_and_chat_binding_030a');
  });

  router.post('/api/taxi/mobile/agent/finance/admin-account/request', (_req, res) => {
    blocked(res, 'mobile_agent_admin_payment_account_request_requires_server_country_currency_provider_config_030a');
  });

  router.post('/api/taxi/mobile/agent/application/submit', (_req, res) => {
    blocked(res, 'mobile_agent_application_submit_requires_auth_db_document_storage_and_review_queue_030b');
  });

  router.post('/api/taxi/mobile/agent/application/document/send', (_req, res) => {
    blocked(res, 'mobile_agent_application_document_upload_requires_storage_virus_scan_and_review_queue_030b');
  });

  router.post('/api/taxi-finance/admin/payment-account/context', (req, res) => adminBlocked(req, res, deps, 'admin_payment_account_context_requires_server_config_db_and_provider_binding_030a'));
  router.post('/api/taxi-finance/admin/agents/finance/context', (req, res) => adminBlocked(req, res, deps, 'admin_agent_finance_context_requires_db_binding_030a'));
  router.post('/api/taxi-finance/admin/agents/balance/confirm-bridge', (req, res) => adminBlocked(req, res, deps, 'admin_agent_balance_confirm_requires_verified_payment_ledger_wallet_binding_030a'));
  router.post('/api/taxi-finance/admin/agents/report/build-bridge', (req, res) => adminBlocked(req, res, deps, 'admin_agent_balance_report_requires_ledger_db_binding_030a'));
  router.post('/api/taxi-finance/admin/agents/archive/write-bridge', (req, res) => adminBlocked(req, res, deps, 'admin_agent_balance_archive_requires_ledger_db_binding_030a'));
  router.post('/api/taxi-finance/admin/agent-applications/queue', (req, res) => adminBlocked(req, res, deps, 'admin_agent_application_queue_requires_db_review_binding_030b'));
  router.post('/api/taxi-finance/admin/agent-applications/open', (req, res) => adminBlocked(req, res, deps, 'admin_agent_application_open_requires_db_document_redaction_binding_030b'));
  router.post('/api/taxi-finance/admin/agent-applications/documents', (req, res) => adminBlocked(req, res, deps, 'admin_agent_application_documents_requires_secure_file_storage_redaction_and_owner_review_binding_030c'));
  router.post('/api/taxi-finance/admin/agent-applications/approve', (req, res) => adminBlocked(req, res, deps, 'admin_agent_application_approve_requires_owner_admin_audit_and_agent_access_binding_030b'));
  router.post('/api/taxi-finance/admin/agent-applications/reject', (req, res) => adminBlocked(req, res, deps, 'admin_agent_application_reject_requires_audit_and_revision_message_binding_030b'));
}
