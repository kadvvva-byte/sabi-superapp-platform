import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

const TAXI_ADMIN_UI_035E_FIX1_ADMIN_TAXI_CLEANUP_NO_DUPLICATE_VISIBLE_PANELS = "TAXI-ADMIN-UI-035E-FIX1-ADMIN-TAXI-CLEANUP-NO-DUPLICATE-VISIBLE-PANELS";

export const TAXI_ADMIN_UI_035B_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_ADMIN_VISIBILITY_SAFE_READ_LOCKED = "TAXI-ADMIN-UI-035B-WALLET-PAYMENT-PAYOUT-OWNER-APPROVAL-CHAIN-ADMIN-VISIBILITY-SAFE-READ-LOCKED";

const ADMIN_OWNER_APPROVAL_035A_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness";
const ADMIN_OWNER_APPROVAL_035A_PLAN_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/plan";
const PUBLIC_OWNER_APPROVAL_035A_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness";
const PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan";
const PUBLIC_FINAL_HANDOFF_034R_HANDOFF_ROUTE = "/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035B_POLICY = "admin_ui_wallet_payment_payout_owner_approval_chain_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035B = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035B = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035B = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  plan?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  approvals?: Record<string, unknown> | Array<Record<string, unknown>>;
  lockedAreas?: Record<string, unknown> | Array<Record<string, unknown>>;
  upstream?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035B = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadPlan: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicPlan: string;
  ownerApproval: string;
  requestGate: string;
  safeDisabled: string;
  planningOnly: string;
  moneyLocked: string;
  walletLocked: string;
  paymentLocked: string;
  payoutLocked: string;
  providerLocked: string;
  dbWriteLocked: string;
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

const COPY035B: Record<AdminLanguage, Copy035B> = {
  ru: {
    title: "Кошелёк и платежи: план подтверждений",
    subtitle: "Админ видит план 035A только как закрытое планирование. Это не пополнение, не оплата, не выплата, не подключение провайдера и не запись в журнал денег.",
    loadReadiness: "Проверить готовность",
    loadPlan: "Загрузить план подтверждений",
    loading: "Загрузка",
    backendRequired: "Адрес сервера обязателен",
    ready: "План подтверждений виден",
    blocked: "Заблокировано",
    failed: "Ошибка",
    adminProtected: "Защищённое чтение для админа",
    publicPlan: "Публичный безопасный план",
    ownerApproval: "Требуется подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    planningOnly: "Только план, без исполнения",
    moneyLocked: "Движение денег закрыто",
    walletLocked: "Изменение кошелька закрыто",
    paymentLocked: "Оплата закрыта",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Вызов провайдера закрыт",
    dbWriteLocked: "Запись в журнал денег закрыта",
    adminGetOnly: "Админка: только чтение",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Маршрут",
    status: "Статус",
    source: "Источник",
    refreshed: "План подтверждений обновлён",
    tokenRequired: "Нужен токен админа для защищённого маршрута",
    next: "Дальше: проверка рабочей среды 035C, затем реальные деньги только по отдельным подтверждениям владельца.",
  },
  en: {
    title: "Кошелёк и платежи: план подтверждений",
    subtitle: "Admin sees the 035A Owner approval chain only as locked planning. This is not top-up, not payment, not payout, not provider binding and not DB ledger write.",
    loadReadiness: "Load readiness",
    loadPlan: "Load approval plan",
    loading: "Loading",
    backendRequired: "Backend base URL is required",
    ready: "Approval chain visible",
    blocked: "Blocked",
    failed: "Failed",
    adminProtected: "Защищённое чтение для админа",
    publicPlan: "Публичный безопасный план",
    ownerApproval: "Требуется подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    planningOnly: "Только план, без исполнения",
    moneyLocked: "Движение денег закрыто",
    walletLocked: "Изменение кошелька закрыто",
    paymentLocked: "Оплата закрыта",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Вызов провайдера закрыт",
    dbWriteLocked: "Запись в журнал денег закрыта",
    adminGetOnly: "Admin UI: GET-only, no POST",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "Approval plan refreshed",
    tokenRequired: "Admin token is required for protected route",
    next: "Next: 035C runtime smoke for Admin approval-chain visibility, then separate Owner approvals for the real money chain.",
  },
  uz: {
    title: "Кошелёк и платежи: план подтверждений",
    subtitle: "Admin 035A egasi tasdiq zanjirini faqat bloklangan rejalash sifatida ko‘radi. Bu to‘ldirish emas, to‘lov emas, to‘lov chiqarish emas, provayder ulash emas va maʼlumotlar bazasi jurnaliga yozish emas.",
    loadReadiness: "Readiness yuklash",
    loadPlan: "Approval plan yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Backend base URL majburiy",
    ready: "Tasdiq zanjiri ko‘rinadi",
    blocked: "Bloklangan",
    failed: "Xato",
    adminProtected: "Защищённое чтение для админа",
    publicPlan: "Публичный безопасный план",
    ownerApproval: "Требуется подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    planningOnly: "Faqat planning, execution yo‘q",
    moneyLocked: "Движение денег закрыто",
    walletLocked: "Изменение кошелька закрыто",
    paymentLocked: "Оплата закрыта",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Вызов провайдера закрыт",
    dbWriteLocked: "Запись в журнал денег закрыта",
    adminGetOnly: "Admin interfeysi: faqat o‘qish, yuborish yo‘q",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "Status",
    source: "Manba",
    refreshed: "Approval plan yangilandi",
    tokenRequired: "Protected route uchun admin token kerak",
    next: "Keyingi: Admin approval-chain visibility uchun 035C runtime smoke, keyin real money chain uchun alohida Owner approvals.",
  },
  zh: {
    title: "Кошелёк и платежи: план подтверждений",
    subtitle: "管理员只能以锁定规划方式查看 035A 所有者审批链。这不是充值、不是支付、不是提现、不是服务商绑定，也不是数据库账本写入。",
    loadReadiness: "加载 readiness",
    loadPlan: "加载审批计划",
    loading: "加载中",
    backendRequired: "必须填写服务器基础地址",
    ready: "审批链可见",
    blocked: "已阻止",
    failed: "失败",
    adminProtected: "Защищённое чтение для админа",
    publicPlan: "Публичный безопасный план",
    ownerApproval: "Требуется подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    planningOnly: "仅 planning，不执行",
    moneyLocked: "Движение денег закрыто",
    walletLocked: "Изменение кошелька закрыто",
    paymentLocked: "Оплата закрыта",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Вызов провайдера закрыт",
    dbWriteLocked: "Запись в журнал денег закрыта",
    adminGetOnly: "管理界面：仅读取，不提交",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "状态",
    source: "来源",
    refreshed: "审批计划已刷新",
    tokenRequired: "Protected route 需要 admin token",
    next: "下一步：035C 管理端审批链可见性运行检查，然后真实资金链使用单独的所有者审批。",
  },
};

function normalizeBase035B(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035B(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-035b": "wallet-payment-payout-approval-chain-safe-read-only",
  };
}

async function safeGet035B(config: AdminApiConfig, route: string): Promise<SafeResult035B> {
  const base = normalizeBase035B(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035B(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult035B;
}

function safeStatus035B(value: SafeResult035B): string {
  if (!value) return "pending";
  if (value.status === 403 || value.status === 401) return "protected";
  return String(value.status || (value.ok ? "ready" : "blocked"));
}

export function TaxiAdminWalletPaymentPayoutApproval035BPanel({ language, config, setNotice }: Props035B) {
  const copy = COPY035B[language] || COPY035B.ru;
  const [state, setState] = useState<LoadState035B>("idle");
  const [readiness, setReadiness] = useState<SafeResult035B>(null);
  const [plan, setPlan] = useState<SafeResult035B>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_OWNER_APPROVAL_035A_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase035B(config));

  const statusText = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.ready;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_035B_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "readiness" | "plan") => {
    const route = kind === "readiness" ? ADMIN_OWNER_APPROVAL_035A_READINESS_ROUTE : ADMIN_OWNER_APPROVAL_035A_PLAN_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet035B(config, route);
      if (kind === "readiness") setReadiness(result); else setPlan(result);
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
      if (kind === "readiness") setReadiness({ ok: false, status: "network_error", message }); else setPlan({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const readinessStatus = safeStatus035B(readiness);
  const planStatus = safeStatus035B(plan);

  return (
    <section data-taxi-admin-ui-035e-fix1-clean-copy="no-english-clutter-in-ru-visible-copy" className="taxiRuntime028KReadModels" data-taxi-admin-ui-035b-wallet-payment-payout-owner-approval-chain-admin-visibility-safe-read-locked={TAXI_ADMIN_UI_035B_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_ADMIN_VISIBILITY_SAFE_READ_LOCKED} data-taxi-admin-ui-035b-policy={ADMIN_UI_035B_POLICY} data-taxi-admin-ui-035b-admin-get-only="true" data-taxi-admin-ui-035b-owner-approval-required="true" data-taxi-admin-ui-035b-planning-only-no-execution="true" data-taxi-admin-ui-035b-money-gates="locked" data-taxi-admin-ui-035b-wallet-payment-payout-provider-db="locked" data-taxi-admin-ui-035b-no-fake-success="true">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_035B_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_ADMIN_VISIBILITY_SAFE_READ_LOCKED}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("plan")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadPlan}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-035b-status={state} data-taxi-admin-ui-035b-backend-required={String(!baseReady)}>
        <div><span>{copy.status}</span><strong>{statusText}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.adminProtected}</span><strong>{readinessStatus}</strong><small>{ADMIN_OWNER_APPROVAL_035A_READINESS_ROUTE}</small></div>
        <div><span>{copy.ownerApproval}</span><strong>required</strong><small>{copy.planningOnly}</small></div>
        <div><span>{copy.source}</span><strong>{copy.moneyLocked}</strong><small>{planStatus}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-035b-owner-approval-routes="admin-035a-readiness-plan-public-redacted" data-taxi-admin-ui-035b-request-gates="034c-request-034d-contact-request">
        <article><span>{copy.route}</span><strong>{ADMIN_OWNER_APPROVAL_035A_READINESS_ROUTE}</strong><small>{copy.adminProtected}</small></article>
        <article><span>{copy.route}</span><strong>{ADMIN_OWNER_APPROVAL_035A_PLAN_ROUTE}</strong><small>{copy.adminProtected} · {planStatus}</small></article>
        <article><span>{copy.publicPlan}</span><strong>{PUBLIC_OWNER_APPROVAL_035A_READINESS_ROUTE}</strong><small>redacted, no raw personal data</small></article>
        <article><span>{copy.publicPlan}</span><strong>{PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE}</strong><small>approval plan only, no execution</small></article>
        <article><span>034R continuity</span><strong>{PUBLIC_FINAL_HANDOFF_034R_HANDOFF_ROUTE}</strong><small>final handoff continuity</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article data-taxi-admin-ui-035b-owner-approval="required"><span>{copy.ownerApproval}</span><strong>locked</strong><small>Owner command required before any execution.</small></article>
        <article data-taxi-admin-ui-035b-wallet-locked="true"><span>{copy.walletLocked}</span><strong>locked</strong><small>{copy.adminGetOnly}</small></article>
        <article data-taxi-admin-ui-035b-payment-locked="true"><span>{copy.paymentLocked}</span><strong>locked</strong><small>{copy.planningOnly}</small></article>
        <article data-taxi-admin-ui-035b-payout-locked="true"><span>{copy.payoutLocked}</span><strong>locked</strong><small>{copy.noMutation}</small></article>
        <article data-taxi-admin-ui-035b-provider-locked="true"><span>{copy.providerLocked}</span><strong>locked</strong><small>provider binding needs separate approval</small></article>
        <article data-taxi-admin-ui-035b-db-write-locked="true"><span>{copy.dbWriteLocked}</span><strong>locked</strong><small>ledger write needs separate approval</small></article>
        <article><span>{copy.noRaw}</span><strong>0</strong><small>safe-read/redacted approval plan shape only</small></article>
        <article><span>{copy.noFake}</span><strong>0</strong><small>{copy.next}</small></article>
      </div>
    </section>
  );
}
