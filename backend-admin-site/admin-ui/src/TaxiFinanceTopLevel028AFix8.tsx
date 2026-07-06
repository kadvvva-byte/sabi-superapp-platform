import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-finance-top-level028a-fix8.css";

export const TAXI_FINANCE_028A_FIX13_AGENT_MESSENGER = "028A_FIX13_TAXI_FINANCE_AGENT_MESSENGER";
export const TAXI_FINANCE_028A_FIX13_AGENT_MESSENGER_COMPONENT_COMPAT = "fix13_agent_messenger_component_still_present";
export const TAXI_FINANCE_028A_FIX13_OFFICIAL_PAYMENT_LINK_PROOF_FX_COMPAT = "fix13_official_payment_link_proof_fx_present";
export const TAXI_FINANCE_028A_FIX13_NO_FIXED_CURRENCY_LITERALS_COMPAT = "fix13_no_fixed_currency_literals";
export const TAXI_FINANCE_028A_FIX15_OWNER_AGENT_BALANCE_CHAT_PANEL = "028A_FIX15_OWNER_AGENT_BALANCE_CHAT_PANEL";
export const TAXI_FINANCE_028A_FIX16_AUTO_AGENT_CONTEXT = "028A_FIX16_AUTO_AGENT_CONTEXT_FROM_CHAT_SELECTION";
export const TAXI_FINANCE_028A_FIX17_ADMIN_MOBILE_100_UI_FOUNDATION = "028A_FIX17_ADMIN_MOBILE_100_UI_FOUNDATION";
export const TAXI_FINANCE_028A_FIX17_ADMIN_PAYMENT_ACCOUNT_CONTEXT = "admin_payment_account_context_for_agent_topup";
export const TAXI_FINANCE_028A_FIX18_AGENT_APPLICATION_IN_FINANCE = "028A_FIX18_AGENT_APPLICATION_IN_TAXI_FINANCE";
export const TAXI_FINANCE_028A_FIX19_AGENT_APPLICATION_SEPARATE_SCREEN = "028A_FIX19_AGENT_APPLICATION_SEPARATE_DOSSIER_SCREEN";

type Props = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerLog = { title: string; route: string; status: string; error: string; at: string; body: string };
type AgentContact = {
  agentId: string;
  agentAccountId: string;
  firstName: string;
  lastName: string;
  countryLabel: string;
  balanceCurrencyLabel: string;
  currentBalanceLabel: string;
  status: string;
  lastText: string;
  requestLabel: string;
  paymentLink: string;
  updatedAt: string;
};
type ChatMessage = {
  id: string;
  side: "agent" | "finance" | "system";
  text: string;
  at: string;
  attachmentLabel?: string;
  attachmentUrl?: string;
  attachmentKind?: string;
  paymentLinkLabel?: string;
  txHashLabel?: string;
  amountLabel?: string;
};

type AgentApplication = {
  applicationId: string;
  firstName: string;
  lastName: string;
  emailLabel: string;
  phoneLabel: string;
  countryLabel: string;
  cityLabel: string;
  addressLabel: string;
  statusLabel: string;
  riskLabel: string;
  documentStatusLabel: string;
  passportLabel: string;
  passportUrl: string;
  passportSelfieLabel: string;
  passportSelfieUrl: string;
  documentBundleLabel: string;
  createdAt: string;
};

type State = {
  search: string;
  agentId: string;
  agentAccountId: string;
  firstName: string;
  lastName: string;
  countryLabel: string;
  balanceCurrencyLabel: string;
  currentBalanceLabel: string;
  requestId: string;
  messageText: string;
  requestValue: string;
  paymentLink: string;
  proofReference: string;
  selectedProofMessageId: string;
  selectedProofLabel: string;
  rateSnapshotId: string;
  internalCreditPreview: string;
  archiveQuery: string;
  verificationStatusLabel: string;
  reportLabel: string;
  archiveLabel: string;
  confirmationNote: string;
  adminPaymentAccountLabel: string;
  adminPaymentProviderLabel: string;
  adminPaymentInstructionLabel: string;
  adminPaymentQrLabel: string;
  paymentVerificationSourceLabel: string;
  lastSyncedAtLabel: string;
  applicationId: string;
  applicationStatusLabel: string;
  applicationQueueLabel: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantCountryLabel: string;
  applicantPhoneLabel: string;
  applicantDocumentStatusLabel: string;
  applicantReviewNote: string;
  applicationRiskLabel: string;
  applicantEmailLabel: string;
  applicantCityLabel: string;
  applicantAddressLabel: string;
  applicantPassportLabel: string;
  applicantPassportUrl: string;
  applicantPassportSelfieLabel: string;
  applicantPassportSelfieUrl: string;
  applicationDocumentBundleLabel: string;
  applicationQueueSearch: string;
};

const routes = {
  adminPaymentContext: "/api/taxi-finance/admin/payment-account/context",
  contacts: "/api/taxi-finance/admin/agents/contacts",
  openChat: "/api/taxi-finance/admin/agents/chat/open",
  sendMessage: "/api/taxi-finance/admin/agents/chat/send",
  sendAttachment: "/api/taxi-finance/admin/agents/chat/attachment/send",
  createPaymentLink: "/api/taxi-finance/admin/agents/payment-link/create",
  attachProof: "/api/taxi-finance/admin/agents/proof/attach",
  verifyPayment: "/api/taxi-finance/admin/agents/payment/verify",
  ratePreview: "/api/taxi-finance/admin/agents/fx/preview",
  submitCredit: "/api/taxi-finance/admin/agents/internal-credit/submit",
  rejectProof: "/api/taxi-finance/admin/agents/proof/reject",
  dailyReport: "/api/taxi-finance/admin/agents/report/daily",
  archive: "/api/taxi-finance/admin/agents/archive/search",
  applicationQueue: "/api/taxi-finance/admin/agent-applications/queue",
  applicationOpen: "/api/taxi-finance/admin/agent-applications/open",
  applicationDocuments: "/api/taxi-finance/admin/agent-applications/documents",
  applicationApprove: "/api/taxi-finance/admin/agent-applications/approve",
  applicationReject: "/api/taxi-finance/admin/agent-applications/reject",
};

const emptyLog: ServerLog = {
  title: "Журнал пуст",
  route: "серверный путь появится после действия",
  status: "—",
  error: "—",
  at: "—",
  body: "Локального подтверждения нет. Подтверждение баланса агента делает только сервер.",
};

function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

function asList(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function parseContact(item: unknown): AgentContact {
  const value = (typeof item === "object" && item ? item : {}) as Record<string, unknown>;
  return {
    agentId: asText(value.agentId || value.id),
    agentAccountId: asText(value.agentAccountId || value.accountId),
    firstName: asText(value.firstName || value.agentFirstName || value.name),
    lastName: asText(value.lastName || value.agentLastName || value.surname),
    countryLabel: asText(value.countryLabel || value.country || value.countryName || value.agentCountry || value.regionLabel),
    balanceCurrencyLabel: asText(value.balanceCurrencyLabel || value.currencyLabel || value.currency || value.agentCurrency || value.accountCurrency),
    currentBalanceLabel: asText(value.currentBalanceLabel || value.balanceLabel || value.currentBalance || value.agentBalance),
    status: asText(value.status || value.state || "статус с сервера"),
    lastText: asText(value.lastText || value.lastMessage || value.preview || "нет сообщения"),
    requestLabel: asText(value.requestLabel || value.requestValue || value.amountLabel || value.requestAmount || "—"),
    paymentLink: asText(value.paymentLink || value.paymentUrl || value.invoiceLink || value.officialPaymentLink),
    updatedAt: asText(value.updatedAt || value.at || "—"),
  };
}

function parseMessage(item: unknown): ChatMessage {
  const value = (typeof item === "object" && item ? item : {}) as Record<string, unknown>;
  const rawSide = asText(value.side || value.from || value.authorRole);
  const side: ChatMessage["side"] = rawSide === "finance" || rawSide === "operator" || rawSide === "owner" ? "finance" : rawSide === "system" ? "system" : "agent";
  return {
    id: asText(value.id || value.messageId || Math.random()),
    side,
    text: asText(value.text || value.message || value.body),
    at: asText(value.at || value.createdAt || "—"),
    attachmentLabel: asText(value.attachmentLabel || value.proofLabel || value.fileLabel || value.receiptLabel || value.screenshotLabel),
    attachmentUrl: asText(value.attachmentUrl || value.fileUrl || value.receiptUrl || value.screenshotUrl),
    attachmentKind: asText(value.attachmentKind || value.fileKind || value.mimeType),
    paymentLinkLabel: asText(value.paymentLinkLabel || value.invoiceLabel || value.linkLabel),
    txHashLabel: asText(value.txHashLabel || value.txHash || value.paymentReference || value.proofReference),
    amountLabel: asText(value.amountLabel || value.requestValue || value.amount),
  };
}

function parseApplication(item: unknown): AgentApplication {
  const value = (typeof item === "object" && item ? item : {}) as Record<string, unknown>;
  return {
    applicationId: asText(value.applicationId || value.agentApplicationId || value.id),
    firstName: asText(value.firstName || value.applicantFirstName || value.name),
    lastName: asText(value.lastName || value.applicantLastName || value.surname),
    emailLabel: asText(value.emailLabel || value.email || value.applicantEmail),
    phoneLabel: asText(value.phoneLabel || value.phone || value.applicantPhone),
    countryLabel: asText(value.countryLabel || value.country || value.applicantCountry),
    cityLabel: asText(value.cityLabel || value.city || value.applicantCity),
    addressLabel: asText(value.addressLabel || value.address || value.workZone || value.applicantAddress),
    statusLabel: asText(value.statusLabel || value.applicationStatusLabel || value.status || "новая заявка"),
    riskLabel: asText(value.riskLabel || value.applicationRiskLabel || value.qualityLabel || "ждёт проверки"),
    documentStatusLabel: asText(value.documentStatusLabel || value.documentsStatus || value.applicantDocumentStatusLabel || "паспорт и селфи с паспортом"),
    passportLabel: asText(value.passportLabel || value.passportFileLabel || value.passportDocumentLabel || "паспорт"),
    passportUrl: asText(value.passportUrl || value.passportFileUrl || value.passportDocumentUrl),
    passportSelfieLabel: asText(value.passportSelfieLabel || value.selfieWithPassportLabel || value.selfiePassportLabel || "селфи с паспортом"),
    passportSelfieUrl: asText(value.passportSelfieUrl || value.selfieWithPassportUrl || value.selfiePassportUrl),
    documentBundleLabel: asText(value.documentBundleLabel || value.documentsLabel || value.filesLabel || "полный пакет документов"),
    createdAt: asText(value.createdAt || value.submittedAt || value.at || "—"),
  };
}

function parseServer(text: string) {
  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    const contacts = asList(parsed.contacts || parsed.agents).map(parseContact);
    const messages = asList(parsed.messages || parsed.chat || parsed.items).map(parseMessage);
    const applications = asList(parsed.applications || parsed.agentApplications || parsed.queue || parsed.applicationItems).map(parseApplication);
    return {
      message: asText(parsed.message || parsed.error || parsed.code || parsed.status || text),
      contacts,
      messages,
      applications,
      requestId: asText(parsed.requestId || parsed.agentRequestId || parsed.operationId),
      agentId: asText(parsed.agentId),
      agentAccountId: asText(parsed.agentAccountId || parsed.accountId),
      firstName: asText(parsed.firstName || parsed.agentFirstName),
      lastName: asText(parsed.lastName || parsed.agentLastName),
      countryLabel: asText(parsed.countryLabel || parsed.country),
      balanceCurrencyLabel: asText(parsed.balanceCurrencyLabel || parsed.currencyLabel),
      currentBalanceLabel: asText(parsed.currentBalanceLabel || parsed.balanceLabel),
      paymentLink: asText(parsed.paymentLink || parsed.paymentUrl || parsed.invoiceLink || parsed.link),
      proofReference: asText(parsed.proofReference || parsed.proofId || parsed.txHash || parsed.paymentReference),
      selectedProofMessageId: asText(parsed.selectedProofMessageId || parsed.proofMessageId),
      selectedProofLabel: asText(parsed.selectedProofLabel || parsed.proofLabel || parsed.receiptLabel),
      rateSnapshotId: asText(parsed.rateSnapshotId || parsed.rateId),
      internalCreditPreview: asText(parsed.internalCreditPreview || parsed.internalCredit || parsed.creditPreview),
      verificationStatusLabel: asText(parsed.verificationStatusLabel || parsed.paymentStatusLabel || parsed.reviewStatus),
      reportLabel: asText(parsed.reportLabel || parsed.dailyReportLabel || parsed.reportId),
      archiveLabel: asText(parsed.archiveLabel || parsed.archiveId || parsed.archiveStatus),
      adminPaymentAccountLabel: asText(parsed.adminPaymentAccountLabel || parsed.adminAccountLabel || parsed.ownerPaymentAccountLabel),
      adminPaymentProviderLabel: asText(parsed.adminPaymentProviderLabel || parsed.paymentProviderLabel || parsed.ownerPaymentProviderLabel),
      adminPaymentInstructionLabel: asText(parsed.adminPaymentInstructionLabel || parsed.paymentInstructionLabel || parsed.ownerPaymentInstructionLabel),
      adminPaymentQrLabel: asText(parsed.adminPaymentQrLabel || parsed.qrLabel || parsed.ownerPaymentQrLabel),
      paymentVerificationSourceLabel: asText(parsed.paymentVerificationSourceLabel || parsed.verificationSourceLabel || parsed.bankVerificationLabel),
      lastSyncedAtLabel: asText(parsed.lastSyncedAtLabel || parsed.syncedAt || parsed.updatedAt),
      applicationId: asText(parsed.applicationId || parsed.agentApplicationId),
      applicationStatusLabel: asText(parsed.applicationStatusLabel || parsed.applicationStatus || parsed.reviewStatus),
      applicationQueueLabel: asText(parsed.applicationQueueLabel || parsed.applicationQueueStatus),
      applicantFirstName: asText(parsed.applicantFirstName || parsed.applicationFirstName || parsed.firstName),
      applicantLastName: asText(parsed.applicantLastName || parsed.applicationLastName || parsed.lastName),
      applicantCountryLabel: asText(parsed.applicantCountryLabel || parsed.applicationCountry || parsed.countryLabel),
      applicantPhoneLabel: asText(parsed.applicantPhoneLabel || parsed.applicationPhone || parsed.phoneLabel),
      applicantDocumentStatusLabel: asText(parsed.applicantDocumentStatusLabel || parsed.documentStatusLabel || parsed.documentsStatus),
      applicantReviewNote: asText(parsed.applicantReviewNote || parsed.reviewNote || parsed.adminReviewNote),
      applicationRiskLabel: asText(parsed.applicationRiskLabel || parsed.riskLabel || parsed.qualityLabel),
      applicantEmailLabel: asText(parsed.applicantEmailLabel || parsed.applicationEmail || parsed.emailLabel || parsed.email),
      applicantCityLabel: asText(parsed.applicantCityLabel || parsed.applicationCity || parsed.cityLabel || parsed.city),
      applicantAddressLabel: asText(parsed.applicantAddressLabel || parsed.applicationAddress || parsed.addressLabel || parsed.address || parsed.workZone),
      applicantPassportLabel: asText(parsed.applicantPassportLabel || parsed.passportLabel || parsed.passportFileLabel || parsed.passportDocumentLabel),
      applicantPassportUrl: asText(parsed.applicantPassportUrl || parsed.passportUrl || parsed.passportFileUrl || parsed.passportDocumentUrl),
      applicantPassportSelfieLabel: asText(parsed.applicantPassportSelfieLabel || parsed.selfieWithPassportLabel || parsed.passportSelfieLabel || parsed.selfiePassportLabel),
      applicantPassportSelfieUrl: asText(parsed.applicantPassportSelfieUrl || parsed.selfieWithPassportUrl || parsed.passportSelfieUrl || parsed.selfiePassportUrl),
      applicationDocumentBundleLabel: asText(parsed.applicationDocumentBundleLabel || parsed.documentBundleLabel || parsed.documentsLabel || parsed.filesLabel),
    };
  } catch {
    return {
      message: text,
      contacts: [] as AgentContact[],
      messages: [] as ChatMessage[],
      applications: [] as AgentApplication[],
      requestId: "",
      agentId: "",
      agentAccountId: "",
      firstName: "",
      lastName: "",
      countryLabel: "",
      balanceCurrencyLabel: "",
      currentBalanceLabel: "",
      paymentLink: "",
      proofReference: "",
      selectedProofMessageId: "",
      selectedProofLabel: "",
      rateSnapshotId: "",
      internalCreditPreview: "",
      verificationStatusLabel: "",
      reportLabel: "",
      archiveLabel: "",
      adminPaymentAccountLabel: "",
      adminPaymentProviderLabel: "",
      adminPaymentInstructionLabel: "",
      adminPaymentQrLabel: "",
      paymentVerificationSourceLabel: "",
      lastSyncedAtLabel: "",
      applicationId: "",
      applicationStatusLabel: "",
      applicationQueueLabel: "",
      applicantFirstName: "",
      applicantLastName: "",
      applicantCountryLabel: "",
      applicantPhoneLabel: "",
      applicantDocumentStatusLabel: "",
      applicantReviewNote: "",
      applicationRiskLabel: "",
      applicantEmailLabel: "",
      applicantCityLabel: "",
      applicantAddressLabel: "",
      applicantPassportLabel: "",
      applicantPassportUrl: "",
      applicantPassportSelfieLabel: "",
      applicantPassportSelfieUrl: "",
      applicationDocumentBundleLabel: "",
    };
  }
}

async function post(config: AdminApiConfig, route: string, payload: Record<string, string>) {
  const baseUrl = (config.baseUrl || "").replace(/\/$/, "");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) headers.Authorization = `Bearer ${config.token}`;
  const response = await fetch(`${baseUrl}${route}`, { method: "POST", headers, body: JSON.stringify(payload) });
  const raw = await response.text();
  const parsed = parseServer(raw);
  return {
    parsed,
    log: {
      title: response.ok ? "Ответ сервера получен" : "Сервер отклонил действие",
      route,
      status: String(response.status),
      error: response.ok ? "—" : parsed.message || "ошибка сервера",
      at: new Date().toISOString(),
      body: parsed.message || "ответ без текста",
    } as ServerLog,
  };
}

async function upload(config: AdminApiConfig, route: string, payload: Record<string, string>, file: File) {
  const baseUrl = (config.baseUrl || "").replace(/\/$/, "");
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));
  body.append("file", file, file.name);
  const headers: Record<string, string> = {};
  if (config.token) headers.Authorization = `Bearer ${config.token}`;
  const response = await fetch(`${baseUrl}${route}`, { method: "POST", headers, body });
  const raw = await response.text();
  const parsed = parseServer(raw);
  return {
    parsed,
    log: {
      title: response.ok ? "Файл отправлен в чат" : "Сервер отклонил файл",
      route,
      status: String(response.status),
      error: response.ok ? "—" : parsed.message || "ошибка отправки файла",
      at: new Date().toISOString(),
      body: parsed.message || file.name,
    } as ServerLog,
  };
}

function initials(firstName: string, lastName: string) {
  const value = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.trim();
  return value || "А";
}

function MiniInput(props: { value: string; onChange: (value: string) => void; placeholder: string; label: string; readOnly?: boolean }) {
  return (
    <label className="tf13MiniInput">
      <span>{props.label}</span>
      <input value={props.value} onChange={(event) => props.onChange(event.target.value)} placeholder={props.placeholder} readOnly={props.readOnly} />
    </label>
  );
}

function MetricCard(props: { label: string; value: string; tone?: "green" | "blue" | "amber" }) {
  return (
    <div className={`tf15Metric tf15Metric-${props.tone || "blue"}`}>
      <span>{props.label}</span>
      <strong>{props.value || "с сервера"}</strong>
    </div>
  );
}

export function TaxiFinanceTopLevel028AFix8Panel({ config, setNotice }: Props) {
  const [busy, setBusy] = useState("");
  const [log, setLog] = useState<ServerLog>(emptyLog);
  const [contacts, setContacts] = useState<AgentContact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [screen, setScreen] = useState<"balance" | "applications">("balance");
  const [chatFile, setChatFile] = useState<File | null>(null);
  const [state, setState] = useState<State>({
    search: "",
    agentId: "",
    agentAccountId: "",
    firstName: "",
    lastName: "",
    countryLabel: "",
    balanceCurrencyLabel: "",
    currentBalanceLabel: "",
    requestId: "",
    messageText: "",
    requestValue: "",
    paymentLink: "",
    proofReference: "",
    selectedProofMessageId: "",
    selectedProofLabel: "",
    rateSnapshotId: "",
    internalCreditPreview: "",
    archiveQuery: "",
    verificationStatusLabel: "",
    reportLabel: "",
    archiveLabel: "",
    confirmationNote: "",
    adminPaymentAccountLabel: "",
    adminPaymentProviderLabel: "",
    adminPaymentInstructionLabel: "",
    adminPaymentQrLabel: "",
    paymentVerificationSourceLabel: "",
    lastSyncedAtLabel: "",
    applicationId: "",
    applicationStatusLabel: "",
    applicationQueueLabel: "",
    applicantFirstName: "",
    applicantLastName: "",
    applicantCountryLabel: "",
    applicantPhoneLabel: "",
    applicantDocumentStatusLabel: "",
    applicantReviewNote: "",
    applicationRiskLabel: "",
    applicantEmailLabel: "",
    applicantCityLabel: "",
    applicantAddressLabel: "",
    applicantPassportLabel: "",
    applicantPassportUrl: "",
    applicantPassportSelfieLabel: "",
    applicantPassportSelfieUrl: "",
    applicationDocumentBundleLabel: "",
    applicationQueueSearch: "",
  });

  const setValue = (key: keyof State, value: string) => setState((current) => ({ ...current, [key]: value }));

  const payload = useMemo(
    () => ({
      ...state,
      module: "taxi_finance_owner_agent_balance_chat",
      stage: TAXI_FINANCE_028A_FIX15_OWNER_AGENT_BALANCE_CHAT_PANEL,
      autoContextStage: TAXI_FINANCE_028A_FIX16_AUTO_AGENT_CONTEXT,
      uiFoundationStage: TAXI_FINANCE_028A_FIX17_ADMIN_MOBILE_100_UI_FOUNDATION,
      adminPaymentAccountContext: TAXI_FINANCE_028A_FIX17_ADMIN_PAYMENT_ACCOUNT_CONTEXT,
      agentApplicationStage: TAXI_FINANCE_028A_FIX18_AGENT_APPLICATION_IN_FINANCE,
      separateAgentApplicationScreenStage: TAXI_FINANCE_028A_FIX19_AGENT_APPLICATION_SEPARATE_SCREEN,
      agentApplicationMeaning: "mobile_agent_submits_full_agency_application_owner_admin_reviews_in_taxi_finance",
      agentApplicationAccessRule: "agent_finance_mobile_screen_opens_only_after_owner_admin_approval",
      mobileBridgeMeaning: "mobile_taxi_agent_sends_file_photo_screenshot_txhash_to_owner_admin_chat",
      adminTopupAccountMeaning: "server_returns_owner_admin_payment_account_for_agent_topup_before_agent_balance_credit",
      legacyStage: TAXI_FINANCE_028A_FIX13_AGENT_MESSENGER,
      legacyComponentCompat: TAXI_FINANCE_028A_FIX13_AGENT_MESSENGER_COMPONENT_COMPAT,
      legacyProofFxCompat: TAXI_FINANCE_028A_FIX13_OFFICIAL_PAYMENT_LINK_PROOF_FX_COMPAT,
      legacyCurrencyCompat: TAXI_FINANCE_028A_FIX13_NO_FIXED_CURRENCY_LITERALS_COMPAT,
      chatMeaning: "owner_admin_agent_messenger_with_file_photo_screenshot_inside_chat",
      proofMeaning: "agent_sends_receipt_photo_screenshot_or_txHash_in_chat_owner_admin_reviews_inside_chat",
      invoiceMeaning: "official_payment_link_inside_chat",
      agentAccountMeaning: "agent_balance_identifier_only",
      currencyPolicy: "server_resolves_country_currency_and_rate_by_agent_account_id",
      creditMeaning: "owner_admin_confirms_internal_numeric_agent_balance_credit_after_payment_verification",
      reportMeaning: "agent_balance_topup_report_generated_from_confirmed_chat_operation",
      archiveMeaning: "confirmed_agent_balance_topup_operation_archived_from_chat",
    }),
    [state],
  );

  const applyServer = (parsed: ReturnType<typeof parseServer>) => {
    if (parsed.contacts.length) setContacts(parsed.contacts);
    if (parsed.messages.length) setMessages(parsed.messages);
    if (parsed.applications.length) setApplications(parsed.applications);
    if (parsed.requestId) setValue("requestId", parsed.requestId);
    if (parsed.agentId) setValue("agentId", parsed.agentId);
    if (parsed.agentAccountId) setValue("agentAccountId", parsed.agentAccountId);
    if (parsed.firstName) setValue("firstName", parsed.firstName);
    if (parsed.lastName) setValue("lastName", parsed.lastName);
    if (parsed.countryLabel) setValue("countryLabel", parsed.countryLabel);
    if (parsed.balanceCurrencyLabel) setValue("balanceCurrencyLabel", parsed.balanceCurrencyLabel);
    if (parsed.currentBalanceLabel) setValue("currentBalanceLabel", parsed.currentBalanceLabel);
    if (parsed.paymentLink) setValue("paymentLink", parsed.paymentLink);
    if (parsed.proofReference) setValue("proofReference", parsed.proofReference);
    if (parsed.selectedProofMessageId) setValue("selectedProofMessageId", parsed.selectedProofMessageId);
    if (parsed.selectedProofLabel) setValue("selectedProofLabel", parsed.selectedProofLabel);
    if (parsed.rateSnapshotId) setValue("rateSnapshotId", parsed.rateSnapshotId);
    if (parsed.internalCreditPreview) setValue("internalCreditPreview", parsed.internalCreditPreview);
    if (parsed.verificationStatusLabel) setValue("verificationStatusLabel", parsed.verificationStatusLabel);
    if (parsed.reportLabel) setValue("reportLabel", parsed.reportLabel);
    if (parsed.archiveLabel) setValue("archiveLabel", parsed.archiveLabel);
    if (parsed.adminPaymentAccountLabel) setValue("adminPaymentAccountLabel", parsed.adminPaymentAccountLabel);
    if (parsed.adminPaymentProviderLabel) setValue("adminPaymentProviderLabel", parsed.adminPaymentProviderLabel);
    if (parsed.adminPaymentInstructionLabel) setValue("adminPaymentInstructionLabel", parsed.adminPaymentInstructionLabel);
    if (parsed.adminPaymentQrLabel) setValue("adminPaymentQrLabel", parsed.adminPaymentQrLabel);
    if (parsed.paymentVerificationSourceLabel) setValue("paymentVerificationSourceLabel", parsed.paymentVerificationSourceLabel);
    if (parsed.lastSyncedAtLabel) setValue("lastSyncedAtLabel", parsed.lastSyncedAtLabel);
    if (parsed.applicationId) setValue("applicationId", parsed.applicationId);
    if (parsed.applicationStatusLabel) setValue("applicationStatusLabel", parsed.applicationStatusLabel);
    if (parsed.applicationQueueLabel) setValue("applicationQueueLabel", parsed.applicationQueueLabel);
    if (parsed.applicantFirstName) setValue("applicantFirstName", parsed.applicantFirstName);
    if (parsed.applicantLastName) setValue("applicantLastName", parsed.applicantLastName);
    if (parsed.applicantCountryLabel) setValue("applicantCountryLabel", parsed.applicantCountryLabel);
    if (parsed.applicantPhoneLabel) setValue("applicantPhoneLabel", parsed.applicantPhoneLabel);
    if (parsed.applicantDocumentStatusLabel) setValue("applicantDocumentStatusLabel", parsed.applicantDocumentStatusLabel);
    if (parsed.applicantReviewNote) setValue("applicantReviewNote", parsed.applicantReviewNote);
    if (parsed.applicationRiskLabel) setValue("applicationRiskLabel", parsed.applicationRiskLabel);
    if (parsed.applicantEmailLabel) setValue("applicantEmailLabel", parsed.applicantEmailLabel);
    if (parsed.applicantCityLabel) setValue("applicantCityLabel", parsed.applicantCityLabel);
    if (parsed.applicantAddressLabel) setValue("applicantAddressLabel", parsed.applicantAddressLabel);
    if (parsed.applicantPassportLabel) setValue("applicantPassportLabel", parsed.applicantPassportLabel);
    if (parsed.applicantPassportUrl) setValue("applicantPassportUrl", parsed.applicantPassportUrl);
    if (parsed.applicantPassportSelfieLabel) setValue("applicantPassportSelfieLabel", parsed.applicantPassportSelfieLabel);
    if (parsed.applicantPassportSelfieUrl) setValue("applicantPassportSelfieUrl", parsed.applicantPassportSelfieUrl);
    if (parsed.applicationDocumentBundleLabel) setValue("applicationDocumentBundleLabel", parsed.applicationDocumentBundleLabel);
  };

  const run = async (action: string, route: string, overrides: Partial<State> = {}) => {
    setBusy(action);
    try {
      const result = await post(config, route, { ...payload, ...overrides });
      setLog(result.log);
      applyServer(result.parsed);
      setNotice(result.log.title);
    } catch (error) {
      const next: ServerLog = {
        title: "Сервер недоступен",
        route,
        status: "network_error",
        error: error instanceof Error ? error.message : String(error),
        at: new Date().toISOString(),
        body: "Запрос не дошёл до сервера. Локального подтверждения нет.",
      };
      setLog(next);
      setNotice("Ошибка сервера");
    } finally {
      setBusy("");
    }
  };

  const sendChat = async () => {
    if (chatFile) {
      setBusy("sendAttachment");
      try {
        const result = await upload(config, routes.sendAttachment, payload, chatFile);
        setLog(result.log);
        applyServer(result.parsed);
        setNotice(result.log.title);
        setChatFile(null);
        setValue("messageText", "");
      } catch (error) {
        const next: ServerLog = {
          title: "Файл не отправлен",
          route: routes.sendAttachment,
          status: "network_error",
          error: error instanceof Error ? error.message : String(error),
          at: new Date().toISOString(),
          body: "Файл/фото/скрин не ушёл на сервер. Локального успеха нет.",
        };
        setLog(next);
        setNotice("Ошибка отправки файла");
      } finally {
        setBusy("");
      }
      return;
    }
    await run("sendMessage", routes.sendMessage);
  };

  const openContact = (contact: AgentContact) => {
    const selectedAgentContext: Partial<State> = {
      agentId: contact.agentId,
      agentAccountId: contact.agentAccountId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      countryLabel: contact.countryLabel,
      balanceCurrencyLabel: contact.balanceCurrencyLabel,
      currentBalanceLabel: contact.currentBalanceLabel,
      requestValue: contact.requestLabel !== "—" ? contact.requestLabel : "",
      paymentLink: contact.paymentLink,
      selectedProofMessageId: "",
      selectedProofLabel: "",
      proofReference: "",
    };
    setState((current) => ({
      ...current,
      ...selectedAgentContext,
    }));
    void run("openChat", routes.openChat, selectedAgentContext);
  };

  const useProofFromMessage = (message: ChatMessage) => {
    setValue("selectedProofMessageId", message.id);
    setValue("selectedProofLabel", message.attachmentLabel || message.txHashLabel || message.text || "сообщение агента");
    setValue("proofReference", message.txHashLabel || message.attachmentLabel || message.id);
    setNotice("Доказательство взято из чата");
  };


  const selectApplication = (application: AgentApplication) => {
    setScreen("applications");
    setState((current) => ({
      ...current,
      applicationId: application.applicationId,
      applicationStatusLabel: application.statusLabel,
      applicantFirstName: application.firstName,
      applicantLastName: application.lastName,
      applicantEmailLabel: application.emailLabel,
      applicantPhoneLabel: application.phoneLabel,
      applicantCountryLabel: application.countryLabel,
      applicantCityLabel: application.cityLabel,
      applicantAddressLabel: application.addressLabel,
      applicantDocumentStatusLabel: application.documentStatusLabel,
      applicantPassportLabel: application.passportLabel,
      applicantPassportUrl: application.passportUrl,
      applicantPassportSelfieLabel: application.passportSelfieLabel,
      applicantPassportSelfieUrl: application.passportSelfieUrl,
      applicationDocumentBundleLabel: application.documentBundleLabel,
      applicationRiskLabel: application.riskLabel,
    }));
    void run("applicationOpen", routes.applicationOpen, { applicationId: application.applicationId });
  };

  const filteredApplications = applications.filter((application) => {
    const haystack = `${application.applicationId} ${application.firstName} ${application.lastName} ${application.emailLabel} ${application.phoneLabel} ${application.countryLabel} ${application.cityLabel} ${application.statusLabel}`.toLowerCase();
    return haystack.includes(state.applicationQueueSearch.toLowerCase());
  });

  const filteredContacts = contacts.filter((contact) => {
    const haystack = `${contact.agentId} ${contact.agentAccountId} ${contact.firstName} ${contact.lastName} ${contact.countryLabel} ${contact.balanceCurrencyLabel} ${contact.status}`.toLowerCase();
    return haystack.includes(state.search.toLowerCase());
  });

  const agentTitle = `${state.firstName} ${state.lastName}`.trim() || "Выберите агента";
  const hasAgent = Boolean(state.agentId || state.agentAccountId);
  const proofReady = Boolean(state.proofReference || state.selectedProofMessageId);
  const selectedAgentMeta = [state.countryLabel, state.balanceCurrencyLabel, state.currentBalanceLabel].filter(Boolean).join(" • ");

  return (
    <section
      className={`taxiFinanceMessengerFix13 taxiFinanceOwnerAgentBalanceFix15 ${screen === "applications" ? "taxiFinanceAgentApplicationsFix19" : ""}`}
      data-taxi-finance-agent-messenger="true"
      data-owner-agent-balance-panel="true"
      data-admin-agent-chat-only="true"
      data-admin-agent-account-only="true"
      data-currency-mode="server-only"
      data-auto-agent-context="name-surname-country-currency-from-selected-chat-agent"
      data-admin-mobile-foundation="chat-admin-payment-account-agent-balance-topup"
      data-agent-application-finance="full-application-review-approve-agent-access"
      data-agent-application-screen="separate-dossier-passport-selfie-queue"
    >
      <aside className="tf13ContactsPane" aria-label={screen === "applications" ? "Очередь заявок агентов" : "Список агентов"}>
        <div className="tf13Brand">
          <div>
            <span>Финансы такси</span>
            <strong>{screen === "applications" ? "Заявки агентов" : "Баланс агентов"}</strong>
          </div>
          <div className="tf18BrandActions tf19ModeActions">
            <button type="button" className={screen === "balance" ? "tf19ModeActive" : ""} disabled={busy !== ""} onClick={() => setScreen("balance")}>Баланс</button>
            <button type="button" className={screen === "applications" ? "tf19ModeActive" : ""} disabled={busy !== ""} onClick={() => { setScreen("applications"); void run("applicationQueue", routes.applicationQueue); }}>Заявки</button>
          </div>
        </div>
        {screen === "applications" ? (
          <>
            <div className="tf13Search">
              <input value={state.applicationQueueSearch} onChange={(event) => setValue("applicationQueueSearch", event.target.value)} placeholder="Поиск новой заявки: имя, email, город" />
            </div>
            <div className="tf19QueueHeader">
              <b>Новые заявки</b>
              <button type="button" disabled={busy !== ""} onClick={() => run("applicationQueue", routes.applicationQueue)}>Обновить</button>
            </div>
            <div className="tf13ContactList" data-agent-application-new-queue="true">
              {filteredApplications.length === 0 ? (
                <div className="tf13EmptyContact">
                  <b>Список новых заявок придёт с сервера</b>
                  <span>Здесь должны быть кандидаты на агентство. Нажми “Обновить”, затем открой заявку и проверь паспорт + селфи с паспортом.</span>
                </div>
              ) : (
                filteredApplications.map((application) => (
                  <button key={application.applicationId} type="button" className="tf13Contact tf19ApplicationContact" onClick={() => selectApplication(application)} disabled={busy !== ""}>
                    <i>{initials(application.firstName, application.lastName)}</i>
                    <span>
                      <b>{`${application.firstName} ${application.lastName}`.trim() || application.applicationId}</b>
                      <small>{application.emailLabel || application.phoneLabel || "контакты с сервера"}</small>
                      <small className="tf16ContactMeta">{[application.countryLabel, application.cityLabel, application.documentStatusLabel].filter(Boolean).join(" • ") || "страна, город, документы"}</small>
                    </span>
                    <em>{application.statusLabel || "новая"}</em>
                  </button>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <div className="tf13Search">
              <input value={state.search} onChange={(event) => setValue("search", event.target.value)} placeholder="Поиск агента или счёта" />
            </div>
            <div className="tf13ContactList">
              {filteredContacts.length === 0 ? (
                <div className="tf13EmptyContact">
                  <b>Агенты придут с сервера</b>
                  <span>Нажмите обновить. Здесь будет список подтверждённых агентов, их статусы, последние сообщения и баланс.</span>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button key={`${contact.agentId}-${contact.agentAccountId}`} type="button" className="tf13Contact" onClick={() => openContact(contact)} disabled={busy !== ""}>
                    <i>{initials(contact.firstName, contact.lastName)}</i>
                    <span>
                      <b>{`${contact.firstName} ${contact.lastName}`.trim() || contact.agentId}</b>
                      <small>{contact.lastText}</small>
                      <small className="tf16ContactMeta">{[contact.countryLabel, contact.balanceCurrencyLabel, contact.currentBalanceLabel].filter(Boolean).join(" • ") || "страна и валюта придут с сервера"}</small>
                    </span>
                    <em>{contact.requestLabel !== "—" ? contact.requestLabel : contact.status}</em>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </aside>

      {screen === "applications" ? (
        <>
          <main className="tf19ApplicationDossier" aria-label="Отдельный экран заявки агента" data-agent-application-dossier-screen="true">
            <header className="tf19DossierHeader">
              <div className="tf13Avatar">{initials(state.applicantFirstName, state.applicantLastName)}</div>
              <div>
                <span>Отдельный экран заявок агентов</span>
                <h2>{`${state.applicantFirstName} ${state.applicantLastName}`.trim() || "Выберите заявку"}</h2>
                <p>{state.applicationId ? `Номер заявки: ${state.applicationId}` : "Список новых заявок слева. Пополнение и баланс здесь не показываются."}</p>
              </div>
              <button type="button" disabled={busy !== "" || !state.applicationId} onClick={() => run("applicationOpen", routes.applicationOpen)}>Открыть данные</button>
            </header>

            <section className="tf19DossierGrid">
              <MetricCard label="Статус заявки" value={state.applicationStatusLabel || "ожидает сервер"} tone="blue" />
              <MetricCard label="Риск / качество" value={state.applicationRiskLabel || "проверка Sabi/Admin"} tone="amber" />
              <MetricCard label="Документы" value={state.applicantDocumentStatusLabel || "паспорт + селфи с паспортом"} tone="green" />
            </section>

            <section className="tf19DataSection" data-agent-application-full-data="email-country-city-documents">
              <div className="tf15BlockTitle">
                <span>1</span>
                <div>
                  <h4>Данные кандидата</h4>
                  <p>Все поля должны прийти из mobile Taxi заявки: ФИО, email, телефон, государство, город, адрес/зона работы.</p>
                </div>
              </div>
              <div className="tf19InfoGrid">
                <span><b>Имя</b>{state.applicantFirstName || "с сервера"}</span>
                <span><b>Фамилия</b>{state.applicantLastName || "с сервера"}</span>
                <span><b>Электронная почта</b>{state.applicantEmailLabel || "с сервера"}</span>
                <span><b>Телефон</b>{state.applicantPhoneLabel || "с сервера"}</span>
                <span><b>Государство</b>{state.applicantCountryLabel || "с сервера"}</span>
                <span><b>Город</b>{state.applicantCityLabel || "с сервера"}</span>
                <span className="tf19Wide"><b>Адрес / зона работы</b>{state.applicantAddressLabel || "с сервера"}</span>
              </div>
            </section>

            <section className="tf19DataSection" data-agent-application-passport-selfie-view="true">
              <div className="tf15BlockTitle">
                <span>2</span>
                <div>
                  <h4>Паспорт и селфи с паспортом</h4>
                  <p>Здесь Owner/Admin должен открыть и сравнить паспорт, селфи с паспортом и пакет документов. Это отдельная проверка заявки, не блок баланса.</p>
                </div>
              </div>
              <div className="tf19DocumentGrid">
                <article className="tf19DocumentCard" data-passport-document-card="true">
                  <b>Паспорт</b>
                  <div className="tf19DocumentPreview">{state.applicantPassportLabel || "Файл паспорта придёт с сервера"}</div>
                  {state.applicantPassportUrl ? <a href={state.applicantPassportUrl} target="_blank" rel="noreferrer">Открыть паспорт</a> : <span>URL паспорта пока не получен</span>}
                </article>
                <article className="tf19DocumentCard" data-selfie-passport-document-card="true">
                  <b>Селфи с паспортом</b>
                  <div className="tf19DocumentPreview">{state.applicantPassportSelfieLabel || "Селфи с паспортом придёт с сервера"}</div>
                  {state.applicantPassportSelfieUrl ? <a href={state.applicantPassportSelfieUrl} target="_blank" rel="noreferrer">Открыть селфи</a> : <span>URL селфи пока не получен</span>}
                </article>
              </div>
              <div className="tf15ReadBox">{state.applicationDocumentBundleLabel || "Полный пакет документов: паспорт, селфи с паспортом, дополнительные файлы проверки — только с сервера/storage."}</div>
              <button type="button" disabled={busy !== "" || !state.applicationId} onClick={() => run("applicationDocuments", routes.applicationDocuments)}>Запросить документы заявки</button>
            </section>
          </main>

          <aside className="tf19ApplicationDecision" aria-label="Решение по заявке агента">
            <section className="tf19DecisionHero">
              <span>Заявка агента</span>
              <h3>Решение Owner/Admin</h3>
              <p>Баланс агента и пополнение скрыты. На этом экране только проверка заявки, паспорт, селфи, approve/reject.</p>
            </section>
            <MiniInput label="Номер заявки" value={state.applicationId} onChange={(v) => setValue("applicationId", v)} placeholder="выбери из списка новых заявок" />
            <MiniInput label="Комментарий проверки" value={state.applicantReviewNote} onChange={(v) => setValue("applicantReviewNote", v)} placeholder="паспорт проверен / селфи совпадает / запросить уточнение" />
            <div className="tf19DecisionChecks">
              <span>✓ ФИО и email проверены</span>
              <span>✓ Государство и город проверены</span>
              <span>✓ Паспорт открыт и сравнен</span>
              <span>✓ Селфи с паспортом открыто и сравнено</span>
            </div>
            <button type="button" className="tf15ConfirmButton" disabled={busy !== "" || !state.applicationId} onClick={() => run("applicationApprove", routes.applicationApprove)}>Подтвердить агентство</button>
            <button type="button" className="tf15RejectButton" disabled={busy !== "" || !state.applicationId} onClick={() => run("applicationReject", routes.applicationReject)}>Вернуть на доработку</button>
            <details className="tf15ServerDetails">
              <summary>Последний ответ сервера</summary>
              <pre>{JSON.stringify(log, null, 2)}</pre>
            </details>
          </aside>
        </>
      ) : (
        <>
          <main className="tf13ChatPane" aria-label="Чат Owner/Admin с агентом">
            <header className="tf13ChatHeader">
              <div className="tf13Avatar">{initials(state.firstName, state.lastName)}</div>
              <div>
                <h2>{agentTitle}</h2>
                <p>{state.agentAccountId ? `Агентский счёт: ${state.agentAccountId}${selectedAgentMeta ? ` • ${selectedAgentMeta}` : ""}` : "Выберите агента слева, затем откройте чат"}</p>
              </div>
              <button type="button" disabled={busy !== "" || !hasAgent} onClick={() => run("openChat", routes.openChat)}>Открыть чат</button>
            </header>

            <div className="tf13Messages">
              {messages.length === 0 ? (
                <div className="tf13NoMessages">
                  <b>Чат — главный источник доказательств</b>
                  <span>Агент отправляет сюда фото, скрин, файл, TxHash или номер платежа. Ты берёшь доказательство из сообщения и подтверждаешь пополнение справа.</span>
                </div>
              ) : (
                messages.map((message) => {
                  const hasProof = Boolean(message.attachmentLabel || message.txHashLabel || message.paymentLinkLabel);
                  return (
                    <article key={message.id} className={`tf13Bubble tf13Bubble-${message.side}`}>
                      <p>{message.text}</p>
                      <div className="tf15BubbleMeta">
                        {message.paymentLinkLabel ? <a>{message.paymentLinkLabel}</a> : null}
                        {message.amountLabel ? <strong>{message.amountLabel}</strong> : null}
                        {message.txHashLabel ? <strong>TxHash: {message.txHashLabel}</strong> : null}
                        {message.attachmentLabel ? <strong>{message.attachmentKind ? `${message.attachmentKind}: ` : "Файл: "}{message.attachmentLabel}</strong> : null}
                      </div>
                      {hasProof ? (
                        <button type="button" className="tf15UseProofBtn" onClick={() => useProofFromMessage(message)}>
                          Взять в проверку
                        </button>
                      ) : null}
                      <time>{message.at}</time>
                    </article>
                  );
                })
              )}
            </div>

            <footer className="tf13Composer tf15Composer">
              <input value={state.messageText} onChange={(event) => setValue("messageText", event.target.value)} placeholder="Сообщение агенту или комментарий к платежу" />
              <label className="tf15FileButton">
                <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={(event) => setChatFile(event.currentTarget.files?.[0] || null)} />
                📎 Файл/фото/скрин
              </label>
              <button type="button" disabled={busy !== "" || !hasAgent} onClick={sendChat}>{chatFile ? "Отправить файл" : "Отправить"}</button>
              {chatFile ? <span className="tf15SelectedFile">Выбрано: {chatFile.name}</span> : null}
            </footer>
          </main>

          <aside className="tf13SidePane tf15BalancePane" aria-label="Панель пополнения баланса агента">
            <section className="tf15BalanceHero">
              <span>Панель пополнения</span>
              <h3>Баланс агента</h3>
              <p>При выборе агента панель автоматически подтягивает имя, фамилию, государство, валюту, баланс, счёт агента и счёт админа для пополнения.</p>
            </section>

            <section className="tf15AgentSummary">
              <div className="tf15AgentLine">
                <div className="tf13Avatar">{initials(state.firstName, state.lastName)}</div>
                <div>
                  <b>{agentTitle}</b>
                  <span>{state.agentAccountId || "агентский счёт не выбран"}</span>
                </div>
              </div>
              <div className="tf16AutoFillBadge">Автозаполнение из выбранного агента в чате</div>
              <div className="tf16AgentDetails">
                <span><b>Имя</b>{state.firstName || "—"}</span>
                <span><b>Фамилия</b>{state.lastName || "—"}</span>
                <span><b>Государство</b>{state.countryLabel || "с сервера"}</span>
                <span><b>Валюта</b>{state.balanceCurrencyLabel || "с сервера"}</span>
              </div>
              <div className="tf15MetricGrid">
                <MetricCard label="Текущий баланс" value={state.currentBalanceLabel} tone="green" />
                <MetricCard label="Валюта" value={state.balanceCurrencyLabel} tone="blue" />
                <MetricCard label="Страна" value={state.countryLabel} tone="amber" />
              </div>
            </section>

            <section className="tf17AdminPaymentAccount">
              <div className="tf15BlockTitle">
                <span>0</span>
                <div>
                  <h4>Счёт админа для пополнения</h4>
                  <p>Агент платит на этот официальный счёт. Данные приходят только с сервера, без ручной валюты.</p>
                </div>
              </div>
              <div className="tf17AccountGrid">
                <span><b>Провайдер</b>{state.adminPaymentProviderLabel || "с сервера"}</span>
                <span><b>Счёт / реквизиты</b>{state.adminPaymentAccountLabel || "с сервера"}</span>
                <span><b>QR / ссылка</b>{state.adminPaymentQrLabel || state.paymentLink || "с сервера"}</span>
                <span><b>Источник проверки</b>{state.paymentVerificationSourceLabel || "банк / провайдер / ручная сверка владельца"}</span>
              </div>
              <div className="tf15ReadBox">{state.adminPaymentInstructionLabel || "После выбора агента обнови контекст: сервер вернёт счёт админа, страну, валюту и правила пополнения."}</div>
              <button type="button" disabled={busy !== "" || !hasAgent} onClick={() => run("adminPaymentContext", routes.adminPaymentContext)}>Обновить счёт админа и правила</button>
            </section>

            <section className="tf15PanelBlock tf17StepPanel">
              <div className="tf15BlockTitle"><span>1</span><div><h4>Сумма и ссылка агенту</h4><p>Валюта и курс не вводятся вручную — только сервер.</p></div></div>
              <MiniInput label="Сумма заявки агента" value={state.requestValue} onChange={(v) => setValue("requestValue", v)} placeholder="сумма из запроса агента; валюта авто" />
              <button type="button" disabled={busy !== "" || !hasAgent} onClick={() => run("createPaymentLink", routes.createPaymentLink)}>Создать официальную платёжную ссылку</button>
              <div className="tf15ReadBox">{state.paymentLink || "Официальная ссылка появится после ответа сервера"}</div>
            </section>

            <section className="tf15PanelBlock tf15ProofBlock">
              <div className="tf15BlockTitle"><span>2</span><div><h4>Доказательство из чата</h4><p>Файл, фото, скрин или TxHash берётся из сообщения агента.</p></div></div>
              <div className={`tf15ProofStatus ${proofReady ? "tf15ProofStatus-ready" : ""}`}><b>{proofReady ? "Доказательство выбрано" : "Доказательство не выбрано"}</b><span>{state.selectedProofLabel || state.proofReference || "Нажми “Взять в проверку” на сообщении в чате"}</span></div>
              <MiniInput label="Хэш операции / номер платежа / номер файла" value={state.proofReference} onChange={(v) => setValue("proofReference", v)} placeholder="из чата или сообщения агента" />
              <button type="button" disabled={busy !== "" || !proofReady} onClick={() => run("attachProof", routes.attachProof)}>Зафиксировать доказательство</button>
            </section>

            <section className="tf15PanelBlock">
              <div className="tf15BlockTitle"><span>3</span><div><h4>Проверка и расчёт</h4><p>Сначала проверка платежа, потом расчёт внутреннего пополнения.</p></div></div>
              <div className="tf15TwoButtons"><button type="button" disabled={busy !== "" || !proofReady} onClick={() => run("verifyPayment", routes.verifyPayment)}>Проверить платёж</button><button type="button" disabled={busy !== "" || !proofReady} onClick={() => run("ratePreview", routes.ratePreview)}>Рассчитать</button></div>
              <div className="tf15StatusStrip"><span>{state.verificationStatusLabel || "Статус проверки: ждёт сервер"}</span><span>{state.rateSnapshotId || "ID курса появится после расчёта"}</span></div>
              <div className="tf15CreditPreview">{state.internalCreditPreview || "Сумма пополнения агента появится после серверного расчёта"}</div>
            </section>

            <section className="tf15PanelBlock tf15ConfirmBlock">
              <div className="tf15BlockTitle"><span>4</span><div><h4>Подтверждение Owner/Admin</h4><p>Это действие должно пополнять баланс агента только после проверки.</p></div></div>
              <MiniInput label="Комментарий к операции" value={state.confirmationNote} onChange={(v) => setValue("confirmationNote", v)} placeholder="например: проверено по банку" />
              <button type="button" className="tf15ConfirmButton" disabled={busy !== "" || !hasAgent || !proofReady} onClick={() => run("submitCredit", routes.submitCredit)}>Подтвердить пополнение баланса агента</button>
              <button type="button" className="tf15RejectButton" disabled={busy !== "" || !hasAgent} onClick={() => run("rejectProof", routes.rejectProof)}>Отклонить / запросить уточнение</button>
            </section>

            <section className="tf15PanelBlock tf15ReportArchive">
              <div className="tf15BlockTitle"><span>5</span><div><h4>Отчёт и архив</h4><p>Формируются по выбранному агенту и подтверждённой операции.</p></div></div>
              <div className="tf15TwoButtons"><button type="button" disabled={busy !== "" || !hasAgent} onClick={() => run("dailyReport", routes.dailyReport)}>Сформировать отчёт</button><button type="button" disabled={busy !== "" || !hasAgent} onClick={() => run("archive", routes.archive)}>Открыть архив</button></div>
              <div className="tf15ReadBox">{state.reportLabel || state.archiveLabel || "Отчёт/архив появится после ответа сервера"}</div>
            </section>

            <details className="tf15ServerDetails"><summary>Последний ответ сервера</summary><pre>{JSON.stringify(log, null, 2)}</pre></details>
          </aside>
        </>
      )}
    </section>
  );
}
