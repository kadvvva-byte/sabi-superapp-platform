import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

const TAXI_ADMIN_UI_035E_FIX1_ADMIN_TAXI_CLEANUP_NO_DUPLICATE_VISIBLE_PANELS = "TAXI-ADMIN-UI-035E-FIX1-ADMIN-TAXI-CLEANUP-NO-DUPLICATE-VISIBLE-PANELS";

export const TAXI_ADMIN_UI_034P_OWNER_SABI_AI_DAILY_SNAPSHOT_ADMIN_VISIBILITY_SAFE_READ = "TAXI-ADMIN-UI-034P-OWNER-SABI-AI-DAILY-SNAPSHOT-ADMIN-VISIBILITY-SAFE-READ";

const ADMIN_DAILY_SNAPSHOT_034O_READINESS_ROUTE = "/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness";
const ADMIN_DAILY_SNAPSHOT_034O_SNAPSHOT_ROUTE = "/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot";
const PUBLIC_DAILY_SNAPSHOT_034O_READINESS_ROUTE = "/api/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness";
const PUBLIC_DAILY_SNAPSHOT_034O_SNAPSHOT_ROUTE = "/api/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot";
const PUBLIC_OWNER_AI_034L_REPORT_ROUTE = "/api/taxi/owner-ai/agent-request/034l/report";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_034P_POLICY = "admin_ui_owner_sabi_ai_daily_snapshot_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props034P = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState034P = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult034P = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  snapshot?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  gates?: Record<string, unknown>;
  upstream?: Record<string, unknown>;
  ownerSabiAi?: Record<string, unknown>;
  dailySnapshot?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy034P = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadSnapshot: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicSnapshot: string;
  ownerAi: string;
  requestGate: string;
  safeDisabled: string;
  reportOnly: string;
  computedOnly: string;
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

const COPY034P: Record<AdminLanguage, Copy034P> = {
  ru: {
    title: "Саби ИИ владельца: дневная сводка",
    subtitle: "Админ видит дневную сводку 034O только в безопасном режиме чтения. Сводка вычисляется без записи в базу, без денег, без провайдера и без имитации успеха.",
    loadReadiness: "Проверить готовность",
    loadSnapshot: "Загрузить сводку",
    loading: "Загрузка",
    backendRequired: "Адрес сервера обязателен",
    ready: "Дневная сводка видна",
    blocked: "Заблокировано",
    failed: "Ошибка",
    adminProtected: "Защищённое чтение для админа",
    publicSnapshot: "Публичная безопасная сводка",
    ownerAi: "Owner Sabi AI",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    reportOnly: "Только отчёт, без исполнения",
    computedOnly: "Расчёт без сохранения",
    moneyLocked: "Кошелёк, оплата, выплаты и пополнение закрыты",
    adminGetOnly: "Админка: только чтение",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Маршрут",
    status: "Статус",
    source: "Источник",
    refreshed: "Дневная сводка обновлена",
    tokenRequired: "Нужен токен админа для защищённого маршрута",
    next: "Дальше: проверка рабочей среды 034Q, затем цепочка кошелька и платежей только отдельными подтверждениями владельца.",
  },
  en: {
    title: "Саби ИИ владельца: дневная сводка",
    subtitle: "Admin sees the 034O daily snapshot only through protected safe-read. The snapshot is computed read-only, with no DB persistence, no money, no provider and no fake success.",
    loadReadiness: "Load readiness",
    loadSnapshot: "Load snapshot",
    loading: "Loading",
    backendRequired: "Backend base URL is required",
    ready: "Daily snapshot visible",
    blocked: "Blocked",
    failed: "Failed",
    adminProtected: "Защищённое чтение для админа",
    publicSnapshot: "Публичная безопасная сводка",
    ownerAi: "Owner Sabi AI",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    reportOnly: "Report only, no execution",
    computedOnly: "Расчёт без сохранения",
    moneyLocked: "Кошелёк, оплата, выплаты и пополнение закрыты",
    adminGetOnly: "Admin UI: GET-only, no POST",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "Daily snapshot refreshed",
    tokenRequired: "Admin token is required for protected route",
    next: "Next: 034Q runtime smoke for Admin daily snapshot visibility, then wallet/payment chain under separate approvals.",
  },
  uz: {
    title: "Саби ИИ владельца: дневная сводка",
    subtitle: "Admin 034O kunlik suratini faqat himoyalangan xavfsiz o‘qish orqali ko‘radi. Surat faqat hisoblangan o‘qish: maʼlumotlar bazasiga saqlash yo‘q, pul yo‘q, provayder yo‘q va soxta muvaffaqiyat yo‘q.",
    loadReadiness: "Readiness yuklash",
    loadSnapshot: "Snapshot yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Backend base URL majburiy",
    ready: "Daily snapshot ko‘rinadi",
    blocked: "Bloklangan",
    failed: "Xato",
    adminProtected: "Защищённое чтение для админа",
    publicSnapshot: "Публичная безопасная сводка",
    ownerAi: "Owner Sabi AI",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    reportOnly: "Faqat hisobot, execution yo‘q",
    computedOnly: "Computed read-only, persistence yo‘q",
    moneyLocked: "Кошелёк, оплата, выплаты и пополнение закрыты",
    adminGetOnly: "Admin interfeysi: faqat o‘qish, yuborish yo‘q",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "Status",
    source: "Manba",
    refreshed: "Daily snapshot yangilandi",
    tokenRequired: "Protected route uchun admin token kerak",
    next: "Keyingi: Admin daily snapshot visibility uchun 034Q runtime smoke, keyin wallet/payment chain alohida approvals bilan.",
  },
  zh: {
    title: "Саби ИИ владельца: дневная сводка",
    subtitle: "管理员只能通过受保护的安全读取查看 034O 每日快照。快照为计算后的只读内容：不写入数据库、不处理资金、不调用服务商、不产生虚假成功。",
    loadReadiness: "加载 readiness",
    loadSnapshot: "加载 snapshot",
    loading: "加载中",
    backendRequired: "必须填写服务器基础地址",
    ready: "Daily snapshot 可见",
    blocked: "已阻止",
    failed: "失败",
    adminProtected: "Защищённое чтение для админа",
    publicSnapshot: "Публичная безопасная сводка",
    ownerAi: "Owner Sabi AI",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    reportOnly: "仅报告，不执行",
    computedOnly: "Расчёт без сохранения",
    moneyLocked: "Кошелёк, оплата, выплаты и пополнение закрыты",
    adminGetOnly: "管理界面：仅读取，不提交",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "状态",
    source: "来源",
    refreshed: "Daily snapshot 已刷新",
    tokenRequired: "Protected route 需要 admin token",
    next: "下一步：034Q 管理端每日快照可见性运行检查，然后钱包和支付链使用单独审批。",
  },
};

function normalizeBase034P(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers034P(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-034p": "owner-ai-daily-snapshot-safe-read-only",
  };
}

async function safeGet034P(config: AdminApiConfig, route: string): Promise<SafeResult034P> {
  const base = normalizeBase034P(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers034P(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult034P;
}

function safeStatus034P(value: SafeResult034P): string {
  if (!value) return "pending";
  if (value.status === 403 || value.status === 401) return "protected";
  return String(value.status || (value.ok ? "ready" : "blocked"));
}

export function TaxiAdminOwnerAiDailySnapshot034PPanel({ language, config, setNotice }: Props034P) {
  const copy = COPY034P[language] || COPY034P.ru;
  const [state, setState] = useState<LoadState034P>("idle");
  const [readiness, setReadiness] = useState<SafeResult034P>(null);
  const [snapshot, setSnapshot] = useState<SafeResult034P>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_DAILY_SNAPSHOT_034O_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase034P(config));

  const statusText = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.ready;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_034P_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "readiness" | "snapshot") => {
    const route = kind === "readiness" ? ADMIN_DAILY_SNAPSHOT_034O_READINESS_ROUTE : ADMIN_DAILY_SNAPSHOT_034O_SNAPSHOT_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet034P(config, route);
      if (kind === "readiness") setReadiness(result); else setSnapshot(result);
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
      if (kind === "readiness") setReadiness({ ok: false, status: "network_error", message }); else setSnapshot({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const readinessStatus = safeStatus034P(readiness);
  const snapshotStatus = safeStatus034P(snapshot);

  return (
    <section data-taxi-admin-ui-035e-fix1-clean-copy="no-english-clutter-in-ru-visible-copy" className="taxiRuntime028KReadModels" data-taxi-admin-ui-034p-owner-sabi-ai-daily-snapshot-admin-visibility-safe-read={TAXI_ADMIN_UI_034P_OWNER_SABI_AI_DAILY_SNAPSHOT_ADMIN_VISIBILITY_SAFE_READ} data-taxi-admin-ui-034p-policy={ADMIN_UI_034P_POLICY} data-taxi-admin-ui-034p-admin-get-only="true" data-taxi-admin-ui-034p-owner-ai-report-only="true" data-taxi-admin-ui-034p-computed-read-only-no-persistence="true" data-taxi-admin-ui-034p-money-gates="locked" data-taxi-admin-ui-034p-no-fake-success="true">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_034P_OWNER_SABI_AI_DAILY_SNAPSHOT_ADMIN_VISIBILITY_SAFE_READ}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("snapshot")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadSnapshot}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-034p-status={state} data-taxi-admin-ui-034p-backend-required={String(!baseReady)}>
        <div><span>{copy.status}</span><strong>{statusText}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.adminProtected}</span><strong>{readinessStatus}</strong><small>{ADMIN_DAILY_SNAPSHOT_034O_READINESS_ROUTE}</small></div>
        <div><span>{copy.ownerAi}</span><strong>{copy.reportOnly}</strong><small>{copy.noMutation}</small></div>
        <div><span>{copy.source}</span><strong>{copy.computedOnly}</strong><small>{snapshotStatus}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-034p-daily-snapshot-routes="admin-034o-readiness-snapshot-public-redacted" data-taxi-admin-ui-034p-request-gates="034c-request-034d-contact-request">
        <article><span>{copy.route}</span><strong>{ADMIN_DAILY_SNAPSHOT_034O_READINESS_ROUTE}</strong><small>{copy.adminProtected}</small></article>
        <article><span>{copy.route}</span><strong>{ADMIN_DAILY_SNAPSHOT_034O_SNAPSHOT_ROUTE}</strong><small>{copy.adminProtected} · {snapshotStatus}</small></article>
        <article><span>{copy.publicSnapshot}</span><strong>{PUBLIC_DAILY_SNAPSHOT_034O_READINESS_ROUTE}</strong><small>redacted, no raw personal data</small></article>
        <article><span>{copy.publicSnapshot}</span><strong>{PUBLIC_DAILY_SNAPSHOT_034O_SNAPSHOT_ROUTE}</strong><small>computed read-only, no persistence</small></article>
        <article><span>034L continuity</span><strong>{PUBLIC_OWNER_AI_034L_REPORT_ROUTE}</strong><small>Owner AI report continuity</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article data-taxi-admin-ui-034p-owner-ai="report-only"><span>{copy.ownerAi}</span><strong>report-only</strong><small>Owner command required before any execution.</small></article>
        <article data-taxi-admin-ui-034p-money-locked="true"><span>{copy.moneyLocked}</span><strong>locked</strong><small>{copy.adminGetOnly}</small></article>
        <article><span>{copy.noRaw}</span><strong>0</strong><small>safe-read/redacted snapshot shape only</small></article>
        <article><span>{copy.noFake}</span><strong>0</strong><small>{copy.next}</small></article>
      </div>
    </section>
  );
}
