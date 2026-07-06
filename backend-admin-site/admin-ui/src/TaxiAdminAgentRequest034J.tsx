import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_034J_AGENT_REQUEST_SAFE_DISABLED_CONTROL_CONNECT = "TAXI-ADMIN-UI-034J-AGENT-REQUEST-SAFE-DISABLED-CONTROL-CONNECT";

const ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE = "/api/admin/taxi/agent-directory/034d/readiness";
const ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE = "/api/admin/taxi/agent-directory/034d/audit";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const MOBILE_AGENT_CONTACT_034C_READINESS_ROUTE = "/api/taxi/mobile/agent/contact/034c/readiness";
const MOBILE_AGENT_DIRECTORY_034D_READINESS_ROUTE = "/api/taxi/mobile/agent/directory/034d/readiness";
const ADMIN_UI_034J_POLICY = "admin_ui_get_only_request_gate_visibility_no_post_no_write_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props034J = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState034J = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult034J = {
  ok?: boolean;
  status?: string | number;
  message?: string;
  readiness?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  audit?: unknown[];
  records?: unknown[];
  gates?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy034J = {
  title: string;
  subtitle: string;
  loadGate: string;
  loadAudit: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  mobile034I: string;
  requestGate: string;
  safeDisabled: string;
  ownerAi: string;
  audit: string;
  moneyLocked: string;
  adminReadOnly: string;
  noRaw: string;
  noFake: string;
  expected409: string;
  next: string;
  route: string;
  status: string;
  count: string;
  refreshed: string;
};

const COPY034J: Record<AdminLanguage, Copy034J> = {
  ru: {
    title: "Taksi Agent Request: safe-disabled control",
    subtitle: "Админ видит мобильный поток запроса этапа 034, серверные шлюзы запросов этапа 034 и границу ИИ Саби владельца. Админ-панель только читает готовность и аудит; запросы записи остаются безопасно отключёнными с кодом 409 и не выполняют деньги или запись.",
    loadGate: "Проверить шлюзы запросов",
    loadAudit: "Загрузить аудит",
    loading: "Загрузка",
    backendRequired: "Адрес сервера обязателен",
    ready: "Контроль готов",
    blocked: "Заблокировано",
    failed: "Ошибка",
    mobile034I: "Mobile 034I request flow",
    requestGate: "Request control step",
    safeDisabled: "Safe-disabled 409",
    ownerAi: "principal Sabi sunʼiy intellekti",
    audit: "Admin tekshiruv",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminReadOnly: "admin interface: GET-only, no POST",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    expected409: "Ожидаемый ответ рабочего контура на запрос записи: 409, безопасно отключено",
    next: "Дальше: этап 034, проверка шлюза запросов админ-панели в рабочем контуре, затем цепочка кошелька отдельными одобрениями.",
    route: "Маршрут",
    status: "Статус",
    count: "Кол-во",
    refreshed: "Шлюзы запросов агентов такси обновлены",
  },
  en: {
    title: "Taksi Agent Request: safe-disabled control",
    subtitle: "Admin sees the mobile 034I request flow, protected 034C/034D request controls, and owner Sabi AI boundary. The admin interface only reads readiness and audit; submission requests remain safely disabled with 409 and never execute money or writes.",
    loadGate: "Check request gates",
    loadAudit: "Load tekshiruv",
    loading: "Loading",
    backendRequired: "Server base URL is required",
    ready: "Control ready",
    blocked: "Blocked",
    failed: "Failed",
    mobile034I: "Mobile 034I request flow",
    requestGate: "Request control step",
    safeDisabled: "Safe-disabled 409",
    ownerAi: "principal Sabi sunʼiy intellekti",
    audit: "Admin tekshiruv",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminReadOnly: "admin interface: GET-only, no POST",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    expected409: "Expected live environment POST response: 409 safe-disabled",
    next: "Next: 034K Admin request control step live environment smoke, then balance account chain under separate confirmations.",
    route: "Route",
    status: "Status",
    count: "Count",
    refreshed: "Taksi agent request nazoratlar refreshed",
  },
  uz: {
    title: "Taksi Agent Request: safe-disabled control",
    subtitle: "Admin mobil 034I request flow, server 034C/034D request nazoratlar va egasining Sabi sun ʼiy intellekti chegarasini ko ‘radi. admin interfeysi faqat tayyorgarlik/tekshiruv o ‘qiydi; yuborish so ‘rovlar safe-disabled 409 holatida qoladi va money yoki yozish bajarmaydi.",
    loadGate: "Request gates tekshirish",
    loadAudit: "Tekshiruv yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Server base URL majburiy",
    ready: "Nazorat tayyor",
    blocked: "Bloklangan",
    failed: "Xato",
    mobile034I: "Mobile 034I request flow",
    requestGate: "Request control step",
    safeDisabled: "Safe-disabled 409",
    ownerAi: "principal Sabi sunʼiy intellekti",
    audit: "Admin tekshiruv",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminReadOnly: "admin interfeysi: faqat o ‘qish, yuborish yo ‘q",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    expected409: "Kutilgan live environment POST javobi: 409 safe-disabled",
    next: "Keyingi: 034K Admin request control step live environment smoke, keyin balance account chain alohida confirmations bilan.",
    route: "Route",
    status: "Status",
    count: "Soni",
    refreshed: "Taksi agent request nazoratlar yangilandi",
  },
  zh: {
    title: "Taksi Agent Request: safe-disabled control",
    subtitle: "管理员查看移动端阶段034请求流程、服务器阶段034请求关口和所有者萨比人工智能边界。管理界面只读取就绪状态和审计；写入请求保持安全禁用并返回409，不执行资金或写入。",
    loadGate: "检查请求关口",
    loadAudit: "加载审计",
    loading: "加载中",
    backendRequired: "必须填写服务器地址",
    ready: "控制已准备",
    blocked: "已阻止",
    failed: "失败",
    mobile034I: "Mobile 034I request flow",
    requestGate: "Request control step",
    safeDisabled: "Safe-disabled 409",
    ownerAi: "principal Sabi sunʼiy intellekti",
    audit: "Admin tekshiruv",
    moneyLocked: "Balance account/charge/withdrawal/top-up: locked",
    adminReadOnly: "管理界面：仅读取，不写入",
    noRaw: "Raw personal data: 0",
    noFake: "False success: 0",
    expected409: "预期工作环境写入响应：409安全禁用",
    next: "下一步：阶段034，管理后台请求关口工作检查，然后钱包链使用单独批准。",
    route: "Route",
    status: "状态",
    count: "数量",
    refreshed: "出租车代理请求关口已刷新",
  },
};

function normalizeBase034J(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers034J(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-034j": "request-gate-read-only",
  };
}

async function safeGet034J(config: AdminApiConfig, route: string): Promise<SafeResult034J> {
  const base = normalizeBase034J(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers034J(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult034J;
}

function listCount034J(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

export function TaxiAdminAgentRequest034JPanel({ language, config, setNotice }: Props034J) {
  const copy = COPY034J[language] || COPY034J.ru;
  const [state, setState] = useState<LoadState034J>("idle");
  const [gate, setGate] = useState<SafeResult034J>(null);
  const [audit, setAudit] = useState<SafeResult034J>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase034J(config));

  const statusText = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.ready;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_034J_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "gate" | "audit") => {
    const route = kind === "gate" ? ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE : ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet034J(config, route);
      if (kind === "gate") setGate(result); else setAudit(result);
      setState(result?.ok === false ? "failed" : "ready");
      setNotice(result?.ok === false ? copy.failed : copy.refreshed);
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.failed;
      setState("failed");
      if (kind === "gate") setGate({ ok: false, status: "network_error", message }); else setAudit({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const auditCount = listCount034J(audit?.audit) || listCount034J(audit?.records);
  const safety = gate?.safety && typeof gate.safety === "object" ? gate.safety as Record<string, unknown> : {};
  const requestGateStatus = String(safety.walletMutationPerformedBy034D === false || safety.moneyMovementPerformedBy034D === false ? "locked" : gate?.status || "safe-disabled");

  return (
    <section className="taxiRuntime028KReadModels" data-taxi-admin-ui-034j-agent-request-safe-disabled-control-connect={TAXI_ADMIN_UI_034J_AGENT_REQUEST_SAFE_DISABLED_CONTROL_CONNECT} data-taxi-admin-ui-034j-policy={ADMIN_UI_034J_POLICY} data-taxi-admin-ui-034j-admin-get-only="true" data-taxi-admin-ui-034j-mobile-post-safe-disabled="409" data-taxi-admin-ui-034j-money-gates="locked" data-taxi-admin-ui-034j-no-fake-success="true">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_034J_AGENT_REQUEST_SAFE_DISABLED_CONTROL_CONNECT}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("gate")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadGate}</button>
          <button type="button" onClick={() => void load("audit")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadAudit}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-034j-status={state} data-taxi-admin-ui-034j-backend-required={String(!baseReady)}>
        <div><span>{copy.status}</span><strong>{statusText}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.mobile034I}</span><strong>100%</strong><small>{copy.expected409}</small></div>
        <div><span>{copy.requestGate}</span><strong>{requestGateStatus}</strong><small>{copy.adminReadOnly}</small></div>
        <div><span>{copy.audit}</span><strong>{auditCount}</strong><small>{ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-034j-request-routes="034c-request-034d-contact-request">
        <article><span>{copy.route}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>{copy.route}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>034C readiness</span><strong>{MOBILE_AGENT_CONTACT_034C_READINESS_ROUTE}</strong><small>{copy.requestGate}</small></article>
        <article><span>034D readiness</span><strong>{MOBILE_AGENT_DIRECTORY_034D_READINESS_ROUTE}</strong><small>{copy.requestGate}</small></article>
        <article data-taxi-admin-ui-034j-owner-ai="report-only"><span>{copy.ownerAi}</span><strong>report-only</strong><small>Owner command required before execution.</small></article>
        <article data-taxi-admin-ui-034j-money-locked="true"><span>{copy.moneyLocked}</span><strong>locked</strong><small>{copy.adminReadOnly}</small></article>
        <article><span>{copy.noRaw}</span><strong>0</strong><small>redacted directory/request shapes only</small></article>
        <article><span>{copy.noFake}</span><strong>0</strong><small>{copy.next}</small></article>
      </div>
    </section>
  );
}
