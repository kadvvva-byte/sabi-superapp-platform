import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_034E_AGENT_DIRECTORY_CONTROL_CONNECT = "TAXI-ADMIN-UI-034E-AGENT-DIRECTORY-CONTROL-CONNECT";

const ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE = "/api/admin/taxi/agent-directory/034d/readiness";
const ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE = "/api/admin/taxi/agent-directory/034d/audit";
const MOBILE_AGENT_DIRECTORY_034D_RECORDS_ROUTE = "/api/taxi/mobile/agent/directory/034d/records";
const MOBILE_AGENT_CONTACT_034C_CONTRACT_ROUTE = "/api/taxi/mobile/agent/contact/034c/contract";
const ADMIN_UI_034E_POLICY = "admin_ui_get_only_safe_read_no_write_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props034E = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState034E = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult034E = {
  ok?: boolean;
  status?: string | number;
  message?: string;
  readiness?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  records?: unknown[];
  audit?: unknown[];
  gates?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy034E = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadAudit: string;
  loading: string;
  backendRequired: string;
  connected: string;
  blocked: string;
  failed: string;
  safeRead: string;
  ownerAi: string;
  moneyGate: string;
  mobileBridge: string;
  adminAudit: string;
  directory: string;
  permission: string;
  noRaw: string;
  noWrite: string;
  noMoney: string;
  noFake: string;
  next: string;
  source: string;
  status: string;
  records: string;
  audit: string;
  refreshed: string;
};

const COPY034E: Record<AdminLanguage, Copy034E> = {
  ru: {
    title: "Taksi Agent Directory: Admin control",
    subtitle: "Админ видит утверждённый справочник агентов, границу ИИ Саби владельца, аудит и заблокированные денежные шлюзы как один организм такси. Интерфейс читает только безопасные серверные сводки этапа 034 и не выполняет деньги, кошелёк, выплаты, провайдера или фейковый успех.",
    loadReadiness: "Загрузить готовность этапа 034",
    loadAudit: "Загрузить аудит этапа 034",
    loading: "Загрузка",
    backendRequired: "Адрес сервера обязателен",
    connected: "Связь готова",
    blocked: "Заблокировано",
    failed: "Ошибка",
    safeRead: "Safe-read live environment",
    ownerAi: "principal Sabi sunʼiy intellekti",
    moneyGate: "Money gates",
    mobileBridge: "Mobile 034B bridge",
    adminAudit: "Admin tekshiruv",
    directory: "Approved agents",
    permission: "Permission control step",
    noRaw: "Raw personal data: 0",
    noWrite: "database write by admin interface: 0",
    noMoney: "Balance account/charge/withdrawal/top-up: locked",
    noFake: "False success: 0",
    next: "Дальше: этап 034, проверка админ-панели и серверного справочника, затем цепочка кошелька отдельными одобрениями.",
    source: "Источник",
    status: "Статус",
    records: "Записи",
    audit: "Аудит",
    refreshed: "Админ-справочник агентов такси обновлён",
  },
  en: {
    title: "Taksi Agent Directory: Admin control",
    subtitle: "Admin sees the approved agent directory, owner Sabi AI boundary, audit, and locked money-control steps as one taxi organism. The interface only reads safe 034D summaries and never executes money, balance-account, withdrawal, external-service, or false-success actions.cess.",
    loadReadiness: "Load readiness 034D",
    loadAudit: "Load tekshiruv 034D",
    loading: "Loading",
    backendRequired: "Server base URL is required",
    connected: "Connection ready",
    blocked: "Blocked",
    failed: "Failed",
    safeRead: "Safe-read live environment",
    ownerAi: "principal Sabi sunʼiy intellekti",
    moneyGate: "Money gates",
    mobileBridge: "Mobile 034B bridge",
    adminAudit: "Admin tekshiruv",
    directory: "Approved agents",
    permission: "Permission control step",
    noRaw: "Raw personal data: 0",
    noWrite: "database write by admin interface: 0",
    noMoney: "Balance account/charge/withdrawal/top-up: locked",
    noFake: "False success: 0",
    next: "Next: 034F Admin + server smoke for directory, then balance account chain under separate confirmations.",
    source: "Source",
    status: "Status",
    records: "Records",
    audit: "Audit",
    refreshed: "Taxi agent directory admin interface refreshed",
  },
  uz: {
    title: "Taksi Agent Directory: Admin control",
    subtitle: "Admin approved agent directory, egasining Sabi sun ʼiy intellekti chegarasi, tekshiruv va yopiq money nazoratlar holatini yagona Taksi organizmi sifatida ko ‘radi. interfeys faqat xavfsiz server 034D xulosalarini o ‘qiydi; money, hamyon, to ‘lov chiqarish, tashqi xizmat yoki soxta muvaffaqiyat bajarmaydi.",
    loadReadiness: "034D tayyorgarlik yuklash",
    loadAudit: "034D tekshiruv yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Server base URL majburiy",
    connected: "Aloqa tayyor",
    blocked: "Bloklangan",
    failed: "Xato",
    safeRead: "Safe-read live environment",
    ownerAi: "principal Sabi sunʼiy intellekti",
    moneyGate: "Money gates",
    mobileBridge: "Mobile 034B bridge",
    adminAudit: "Admin tekshiruv",
    directory: "Tasdiqlangan agentlar",
    permission: "Permission control step",
    noRaw: "Raw personal data: 0",
    noWrite: "admin interface database write: 0",
    noMoney: "Balance account/charge/withdrawal/top-up: locked",
    noFake: "False success: 0",
    next: "Keyingi: 034F Admin + server directory smoke, keyin balance account chain alohida confirmations bilan.",
    source: "Manba",
    status: "Status",
    records: "Yozuvlar",
    audit: "Audit",
    refreshed: "Taxi agent directory admin interface yangilandi",
  },
  zh: {
    title: "Taksi Agent Directory: Admin control",
    subtitle: "管理员以一个出租车有机体查看已批准的代理目录、所有者萨比人工智能边界、审计和锁定的资金关口。界面只读取安全的服务器阶段034摘要，不执行资金、钱包、付款、提供商或虚假成功。",
    loadReadiness: "加载阶段034就绪状态",
    loadAudit: "加载阶段034审计",
    loading: "加载中",
    backendRequired: "必须填写服务器地址",
    connected: "连接已准备",
    blocked: "已阻止",
    failed: "失败",
    safeRead: "Safe-read live environment",
    ownerAi: "principal Sabi sunʼiy intellekti",
    moneyGate: "Money gates",
    mobileBridge: "Mobile 034B bridge",
    adminAudit: "Admin tekshiruv",
    directory: "Approved agents",
    permission: "Permission control step",
    noRaw: "Raw personal data: 0",
    noWrite: "admin interface database write: 0",
    noMoney: "Balance account/charge/withdrawal/top-up: locked",
    noFake: "False success: 0",
    next: "下一步：阶段034，管理后台和服务器目录检查，然后钱包链使用单独批准。",
    source: "来源",
    status: "状态",
    records: "记录",
    audit: "审计",
    refreshed: "出租车代理目录管理界面已刷新",
  },
};

function normalizeBase034E(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers034E(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-034e": "safe-read-only",
  };
}

function arrayCount034E(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

function boolFlag034E(snapshot: SafeResult034E, key: string): string {
  const safety = snapshot?.safety && typeof snapshot.safety === "object" ? snapshot.safety as Record<string, unknown> : {};
  const value = safety[key] ?? snapshot?.[key];
  return value === false ? "0" : value === true ? "blocked" : "safe";
}

async function safeGet034E(config: AdminApiConfig, route: string): Promise<SafeResult034E> {
  const base = normalizeBase034E(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers034E(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult034E;
}

export function TaxiAdminAgentDirectory034EPanel({ language, config, setNotice }: Props034E) {
  const copy = COPY034E[language] || COPY034E.ru;
  const [state, setState] = useState<LoadState034E>("idle");
  const [readiness, setReadiness] = useState<SafeResult034E>(null);
  const [audit, setAudit] = useState<SafeResult034E>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase034E(config));

  const readinessStatus = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.connected;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_034E_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "readiness" | "audit") => {
    const route = kind === "readiness" ? ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE : ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet034E(config, route);
      if (kind === "readiness") setReadiness(result); else setAudit(result);
      setState(result?.ok === false ? "failed" : "ready");
      setNotice(result?.ok === false ? copy.failed : copy.refreshed);
    } catch (error) {
      setState("failed");
      const message = error instanceof Error ? error.message : copy.failed;
      if (kind === "readiness") setReadiness({ ok: false, status: "network_error", message }); else setAudit({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const auditCount = arrayCount034E(audit?.audit) || arrayCount034E(audit?.records);
  const directoryCount = arrayCount034E(readiness?.records);

  return (
    <section className="taxiRuntime028KReadModels" data-taxi-admin-ui-034e-agent-directory-control-connect={TAXI_ADMIN_UI_034E_AGENT_DIRECTORY_CONTROL_CONNECT} data-taxi-admin-ui-034e-policy={ADMIN_UI_034E_POLICY} data-taxi-admin-ui-034e-no-write="true" data-taxi-admin-ui-034e-money-gates="locked" data-taxi-admin-ui-034e-fake-success="blocked">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_034E_AGENT_DIRECTORY_CONTROL_CONNECT}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("audit")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadAudit}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-034e-status={state} data-taxi-admin-ui-034e-last-route={lastRoute}>
        <div><span>{copy.status}</span><strong>{state}</strong><small>{readinessStatus}</small></div>
        <div><span>{copy.directory}</span><strong>{directoryCount}</strong><small>{MOBILE_AGENT_DIRECTORY_034D_RECORDS_ROUTE}</small></div>
        <div><span>{copy.adminAudit}</span><strong>{auditCount}</strong><small>{ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE}</small></div>
        <div><span>{copy.moneyGate}</span><strong>locked</strong><small>{copy.noMoney}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-034e-control-grid="directory-owner-ai-audit-money-gates-mobile-034b-backend-034d">
        <div className="taxiRuntime028KItem"><span>{copy.safeRead}</span><strong>100%</strong><small>{ADMIN_AGENT_DIRECTORY_034D_READINESS_ROUTE}</small><em>{copy.noRaw}</em></div>
        <div className="taxiRuntime028KItem"><span>{copy.mobileBridge}</span><strong>034B</strong><small>{MOBILE_AGENT_CONTACT_034C_CONTRACT_ROUTE}</small><em>{copy.permission}</em></div>
        <div className="taxiRuntime028KItem"><span>{copy.ownerAi}</span><strong>review</strong><small>/api/taxi/mobile/agent/directory/034d/owner-ai</small><em>report-only until Owner command</em></div>
        <div className="taxiRuntime028KItem"><span>{copy.adminAudit}</span><strong>{auditCount}</strong><small>{ADMIN_AGENT_DIRECTORY_034D_AUDIT_ROUTE}</small><em>{copy.noWrite}</em></div>
        <div className="taxiRuntime028KItem"><span>{copy.moneyGate}</span><strong>{boolFlag034E(readiness, "walletMutationPerformedBy034D")}</strong><small>wallet/payment/payout/top-up</small><em>{copy.noMoney}</em></div>
        <div className="taxiRuntime028KItem"><span>No fake</span><strong>{boolFlag034E(readiness, "fakeSuccessIntroduced")}</strong><small>{ADMIN_UI_034E_POLICY}</small><em>{copy.noFake}</em></div>
      </div>

      <div className="taxi007yLastResponse" data-taxi-admin-ui-034e-last-response="safe-read-only">
        <strong>{copy.source}</strong>
        <span>{String((readiness?.message || audit?.message || readinessStatus) ?? "")}</span>
        <small>{copy.next}</small>
      </div>
    </section>
  );
}
