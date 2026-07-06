import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_034M_OWNER_SABI_AI_REPORT_ADMIN_VISIBILITY_SAFE_READ = "TAXI-ADMIN-UI-034M-OWNER-SABI-AI-REPORT-ADMIN-VISIBILITY-SAFE-READ";

const ADMIN_OWNER_AI_034L_READINESS_ROUTE = "/api/admin/taxi/owner-ai/agent-request/034l/readiness";
const ADMIN_OWNER_AI_034L_REPORT_ROUTE = "/api/admin/taxi/owner-ai/agent-request/034l/report";
const PUBLIC_OWNER_AI_034L_READINESS_ROUTE = "/api/taxi/owner-ai/agent-request/034l/readiness";
const PUBLIC_OWNER_AI_034L_REPORT_ROUTE = "/api/taxi/owner-ai/agent-request/034l/report";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_034M_POLICY = "admin_ui_owner_sabi_ai_report_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props034M = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState034M = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult034M = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  report?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  gates?: Record<string, unknown>;
  upstream?: Record<string, unknown>;
  ownerSabiAi?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy034M = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadReport: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicReport: string;
  ownerAi: string;
  requestGate: string;
  safeDisabled: string;
  reportOnly: string;
  moneyLocked: string;
  adminGetOnly: string;
  noMutation: string;
  noRaw: string;
  noFake: string;
  route: string;
  status: string;
  source: string;
  refreshed: string;
  tokenRequired: string;
  next: string;
};

const COPY034M: Record<AdminLanguage, Copy034M> = {
  ru: {
    title: "principal Sabi AI report: admin visibility",
    subtitle: "Админ видит Саби ИИ владельца 034L отчёт по agent request gates только через protected safe-read. Саби ИИ владельца остаётся report-only: без наказаний, без записи, без денег, без провайдер и без ложный успех.",
    loadReadiness: "Загрузить readiness",
    loadReport: "Загрузить отчёт",
    loading: "Загрузка",
    backendRequired: "Базовый адрес сервера обязателен",
    ready: "ИИ владельца report виден",
    blocked: "Заблокировано",
    failed: "Ошибка",
    adminProtected: "Admin protected safe-read",
    publicReport: "Public redacted safe-read",
    ownerAi: "principal Sabi AI",
    requestGate: "Request control step continuity",
    safeDisabled: "409 safe-disabled",
    reportOnly: "Только отчёт, без исполнения",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminGetOnly: "интерфейс администратора: только GET, без POST",
    noMutation: "Mutation/action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    route: "Маршрут",
    status: "Статус",
    source: "Источник",
    refreshed: "Саби ИИ владельца report обновлён",
    tokenRequired: "Нужен admin token для protected route",
    next: "Дальше: 034N проверка рабочей среды для Admin visibility, затем кошелёк/оплата chain отдельными утверждение s.",
  },
  en: {
    title: "principal Sabi AI report: admin visibility",
    subtitle: "Admin sees the principal Sabi AI 034L agent request control step report only through protected safe-read. principal Sabi AI remains report-only: no penalties, no writes, no money, no external service and no false success.",
    loadReadiness: "Load readiness",
    loadReport: "Load report",
    loading: "Loading",
    backendRequired: "Server base URL is required",
    ready: "principal AI report visible",
    blocked: "Blocked",
    failed: "Failed",
    adminProtected: "Admin protected safe-read",
    publicReport: "Public redacted safe-read",
    ownerAi: "principal Sabi AI",
    requestGate: "Request control step continuity",
    safeDisabled: "409 safe-disabled",
    reportOnly: "Report only, no execution",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminGetOnly: "admin interface: GET-only, no POST",
    noMutation: "Mutation/action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "principal Sabi AI report refreshed",
    tokenRequired: "Admin token is required for protected route",
    next: "Next: 034N live environment smoke for Admin visibility, then balance account/charge chain under separate confirmations.",
  },
  uz: {
    title: "principal Sabi AI report: admin visibility",
    subtitle: "Admin egasining Sabi sun ʼiy intellekti 034L agent request nazorat hisobotini faqat protected safe-read orqali ko ‘radi. egasining Sabi sun ʼiy intellekti faqat report-only: jarima yo ‘q, yozish yo ‘q, money yo ‘q, tashqi xizmat yo ‘q va soxta muvaffaqiyat yo ‘q.",
    loadReadiness: "Readiness yuklash",
    loadReport: "Hisobot yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Server base URL majburiy",
    ready: "Egasi sun ʼiy intellekt report ko ‘rinadi",
    blocked: "Bloklangan",
    failed: "Xato",
    adminProtected: "Admin protected safe-read",
    publicReport: "Public redacted safe-read",
    ownerAi: "principal Sabi AI",
    requestGate: "Request control step continuity",
    safeDisabled: "409 safe-disabled",
    reportOnly: "Faqat hisobot, execution yo ‘q",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminGetOnly: "admin interfeysi: faqat o ‘qish, yuborish yo ‘q",
    noMutation: "Mutation/action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    route: "Route",
    status: "Status",
    source: "Manba",
    refreshed: "principal Sabi AI report yangilandi",
    tokenRequired: "Protected route uchun admin token kerak",
    next: "Keyingi: Admin visibility uchun 034N live environment smoke, keyin balance account/charge chain alohida confirmations bilan.",
  },
  zh: {
    title: "principal Sabi AI report: admin visibility",
    subtitle: "管理员只能通过受保护的安全读取查看所有者萨比智能 034L 代理请求检查报告。所有者萨比智能保持仅报告模式：不处罚、不写入、不处理资金、不调用服务商、不产生虚假成功。",
    loadReadiness: "加载 readiness",
    loadReport: "加载报告",
    loading: "加载中",
    backendRequired: "必须填写 服务器 base URL",
    ready: "所有者智能 report 可见",
    blocked: "已阻止",
    failed: "失败",
    adminProtected: "Admin protected safe-read",
    publicReport: "Public redacted safe-read",
    ownerAi: "principal Sabi AI",
    requestGate: "Request control step continuity",
    safeDisabled: "409 safe-disabled",
    reportOnly: "仅报告，不执行",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminGetOnly: "Admin 界面：仅 GET，无 POST",
    noMutation: "Mutation/action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    route: "Route",
    status: "状态",
    source: "来源",
    refreshed: "所有者萨比智能 report 已刷新",
    tokenRequired: "Protected route 需要 admin token",
    next: "下一步：034N Admin visibility 运行环境 smoke，然后 钱包/支付 chain 使用单独 审批s。",
  },
};

function normalizeBase034M(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers034M(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-034m": "owner-ai-report-safe-read-only",
  };
}

async function safeGet034M(config: AdminApiConfig, route: string): Promise<SafeResult034M> {
  const base = normalizeBase034M(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers034M(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult034M;
}

function safeStatus034M(value: SafeResult034M): string {
  if (!value) return "pending";
  if (value.status === 403 || value.status === 401) return "protected";
  return String(value.status || (value.ok ? "ready" : "blocked"));
}

export function TaxiAdminOwnerAiReport034MPanel({ language, config, setNotice }: Props034M) {
  const copy = COPY034M[language] || COPY034M.ru;
  const [state, setState] = useState<LoadState034M>("idle");
  const [readiness, setReadiness] = useState<SafeResult034M>(null);
  const [report, setReport] = useState<SafeResult034M>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_OWNER_AI_034L_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase034M(config));

  const statusText = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.ready;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_034M_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "readiness" | "report") => {
    const route = kind === "readiness" ? ADMIN_OWNER_AI_034L_READINESS_ROUTE : ADMIN_OWNER_AI_034L_REPORT_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet034M(config, route);
      if (kind === "readiness") setReadiness(result); else setReport(result);
      if (result?.status === 401 || result?.status === 403) {
        setState("blocked");
        setNotice(copy.tokenRequired);
        return;
      }
      setState(result?.ok === false ? "failed" : "ready");
      setNotice(result?.ok === false ? copy.failed : copy.refreshed);
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.failed;
      setState("failed");
      if (kind === "readiness") setReadiness({ ok: false, status: "network_error", message }); else setReport({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const readinessStatus = safeStatus034M(readiness);
  const reportStatus = safeStatus034M(report);

  return (
    <section className="taxiRuntime028KReadModels" data-taxi-admin-ui-034m-owner-sabi-ai-report-admin-visibility-safe-read={TAXI_ADMIN_UI_034M_OWNER_SABI_AI_REPORT_ADMIN_VISIBILITY_SAFE_READ} data-taxi-admin-ui-034m-policy={ADMIN_UI_034M_POLICY} data-taxi-admin-ui-034m-admin-get-only="true" data-taxi-admin-ui-034m-owner-ai-report-only="true" data-taxi-admin-ui-034m-money-gates="locked" data-taxi-admin-ui-034m-no-fake-success="true">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_034M_OWNER_SABI_AI_REPORT_ADMIN_VISIBILITY_SAFE_READ}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("report")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReport}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-034m-status={state} data-taxi-admin-ui-034m-backend-required={String(!baseReady)}>
        <div><span>{copy.status}</span><strong>{statusText}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.adminProtected}</span><strong>{readinessStatus}</strong><small>{ADMIN_OWNER_AI_034L_READINESS_ROUTE}</small></div>
        <div><span>{copy.ownerAi}</span><strong>{copy.reportOnly}</strong><small>{copy.noMutation}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-034m-owner-ai-routes="admin-034l-readiness-report-public-redacted" data-taxi-admin-ui-034m-request-gates="034c-request-034d-contact-request">
        <article><span>{copy.route}</span><strong>{ADMIN_OWNER_AI_034L_READINESS_ROUTE}</strong><small>{copy.adminProtected}</small></article>
        <article><span>{copy.route}</span><strong>{ADMIN_OWNER_AI_034L_REPORT_ROUTE}</strong><small>{copy.adminProtected} · {reportStatus}</small></article>
        <article><span>{copy.publicReport}</span><strong>{PUBLIC_OWNER_AI_034L_READINESS_ROUTE}</strong><small>redacted, no raw personal data</small></article>
        <article><span>{copy.publicReport}</span><strong>{PUBLIC_OWNER_AI_034L_REPORT_ROUTE}</strong><small>redacted, report-only</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article data-taxi-admin-ui-034m-owner-ai="report-only"><span>{copy.ownerAi}</span><strong>report-only</strong><small>Owner command required before any execution.</small></article>
        <article data-taxi-admin-ui-034m-money-locked="true"><span>{copy.moneyLocked}</span><strong>locked</strong><small>{copy.adminGetOnly}</small></article>
        <article><span>{copy.noRaw}</span><strong>0</strong><small>safe-read/redacted report shape only</small></article>
        <article><span>{copy.noFake}</span><strong>0</strong><small>{copy.next}</small></article>
      </div>
    </section>
  );
}
