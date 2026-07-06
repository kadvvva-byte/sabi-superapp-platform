import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

const TAXI_ADMIN_UI_035E_FIX1_ADMIN_TAXI_CLEANUP_NO_DUPLICATE_VISIBLE_PANELS = "TAXI-ADMIN-UI-035E-FIX1-ADMIN-TAXI-CLEANUP-NO-DUPLICATE-VISIBLE-PANELS";

export const TAXI_ADMIN_UI_035E_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_FINAL_HANDOFF_ADMIN_VISIBILITY_SAFE_READ_LOCKED = "TAXI-ADMIN-UI-035E-WALLET-PAYMENT-PAYOUT-OWNER-APPROVAL-CHAIN-FINAL-HANDOFF-ADMIN-VISIBILITY-SAFE-READ-LOCKED";

const ADMIN_FINAL_HANDOFF_035D_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness";
const ADMIN_FINAL_HANDOFF_035D_HANDOFF_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff";
const PUBLIC_FINAL_HANDOFF_035D_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness";
const PUBLIC_FINAL_HANDOFF_035D_HANDOFF_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff";
const PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan";
const PUBLIC_FINAL_HANDOFF_034R_HANDOFF_ROUTE = "/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035E_POLICY = "admin_ui_wallet_payment_payout_owner_approval_chain_final_handoff_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035E = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035E = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035E = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  handoff?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  lockedAreas?: Record<string, unknown> | Array<Record<string, unknown>>;
  approvals?: Record<string, unknown> | Array<Record<string, unknown>>;
  upstream?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035E = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadHandoff: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicHandoff: string;
  finalHandoff: string;
  ownerApproval: string;
  requestGate: string;
  safeDisabled: string;
  lockedHandoff: string;
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

const COPY035E: Record<AdminLanguage, Copy035E> = {
  ru: {
    title: "Кошелёк и платежи: итоговая передача",
    subtitle: "Админ видит итог 035D только в закрытом режиме чтения. Это не запуск кошелька, не пополнение, не оплата, не выплата, не подключение провайдера и не запись в журнал денег.",
    loadReadiness: "Проверить готовность",
    loadHandoff: "Загрузить итоговую передачу",
    loading: "Загрузка",
    backendRequired: "Адрес сервера обязателен",
    ready: "Итоговая передача видна",
    blocked: "Заблокировано",
    failed: "Ошибка",
    adminProtected: "Защищённое чтение для админа",
    publicHandoff: "Публичная безопасная итоговая сводка",
    finalHandoff: "Итоговая передача закрыта",
    ownerApproval: "Следующий шаг — подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    lockedHandoff: "Только закрытая передача, без исполнения",
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
    refreshed: "Итоговая передача обновлена",
    tokenRequired: "Нужен токен админа для защищённого маршрута",
    next: "Дальше: проверка рабочей среды 035F, затем реальные деньги только по отдельным подтверждениям владельца.",
  },
  en: {
    title: "Кошелёк и платежи: итоговая передача",
    subtitle: "Admin sees the 035D final handoff only as locked safe read. This is not a wallet launch, not a top-up, not a payment, not a payout, not provider binding, and not a database ledger write.",
    loadReadiness: "Load readiness",
    loadHandoff: "Load final handoff",
    loading: "Loading",
    backendRequired: "Server base URL is required",
    ready: "Final handoff visible",
    blocked: "Blocked",
    failed: "Failed",
    adminProtected: "Защищённое чтение для админа",
    publicHandoff: "Публичная безопасная итоговая сводка",
    finalHandoff: "Итоговая передача закрыта",
    ownerApproval: "Следующий шаг — подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    lockedHandoff: "Только закрытая передача, без исполнения",
    moneyLocked: "Движение денег закрыто",
    walletLocked: "Изменение кошелька закрыто",
    paymentLocked: "Оплата закрыта",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Вызов провайдера закрыт",
    dbWriteLocked: "Запись в журнал денег закрыта",
    adminGetOnly: "Admin interfeys: GET-only, no POST",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "Final handoff refreshed",
    tokenRequired: "Admin token is required for protected route",
    next: "Next: 035F runtime smoke for final handoff Admin visibility, then only separate egasi tasdiqs for the real money chain.",
  },
  uz: {
    title: "Кошелёк и платежи: итоговая передача",
    subtitle: "Admin 035D yakuniy topshirishni faqat bloklangan xavfsiz o‘qish sifatida ko‘radi. Bu hamyonni ishga tushirish emas, to‘ldirish emas, to‘lov emas, to‘lov chiqarish emas, provayderni ulash emas va maʼlumotlar bazasi jurnaliga yozish emas.",
    loadReadiness: "Readiness yuklash",
    loadHandoff: "Final handoff yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Server base URL majburiy",
    ready: "Final handoff ko‘rinadi",
    blocked: "Bloklangan",
    failed: "Xato",
    adminProtected: "Защищённое чтение для админа",
    publicHandoff: "Публичная безопасная итоговая сводка",
    finalHandoff: "Итоговая передача закрыта",
    ownerApproval: "Следующий шаг — подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    lockedHandoff: "Faqat locked handoff, execution yo‘q",
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
    refreshed: "Final handoff yangilandi",
    tokenRequired: "Protected route uchun admin token kerak",
    next: "Keyingi: final handoff Admin visibility uchun 035F runtime smoke, keyin real money chain uchun faqat alohida egasi tasdiqs.",
  },
  zh: {
    title: "Кошелёк и платежи: итоговая передача",
    subtitle: "管理员只能以锁定安全读取方式查看 035D 最终交接。这不是钱包启动、不是充值、不是支付、不是提现、不是服务商绑定，也不是数据库账本写入。",
    loadReadiness: "加载 readiness",
    loadHandoff: "加载 final handoff",
    loading: "加载中",
    backendRequired: "必须填写服务器基础地址",
    ready: "Final handoff 可见",
    blocked: "已阻止",
    failed: "失败",
    adminProtected: "Защищённое чтение для админа",
    publicHandoff: "Публичная безопасная итоговая сводка",
    finalHandoff: "Итоговая передача закрыта",
    ownerApproval: "Следующий шаг — подтверждение владельца",
    requestGate: "Контроль закрытых заявок",
    safeDisabled: "409: безопасно закрыто",
    lockedHandoff: "仅 locked handoff，不执行",
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
    refreshed: "Final handoff 已刷新",
    tokenRequired: "Protected route 需要 admin token",
    next: "下一步：035F 最终交接管理端可见性运行检查，然后真实资金链只使用单独的所有者审批。",
  },
};

function normalizeBase035E(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035E(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-035e": "wallet-payment-payout-final-handoff-safe-read-only",
  };
}

async function safeGet035E(config: AdminApiConfig, route: string): Promise<SafeResult035E> {
  const base = normalizeBase035E(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035E(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult035E;
}

function safeStatus035E(value: SafeResult035E): string {
  if (!value) return "pending";
  if (value.status === 403 || value.status === 401) return "protected";
  return String(value.status || (value.ok ? "ready" : "blocked"));
}

export function TaxiAdminWalletPaymentPayoutFinalHandoff035EPanel({ language, config, setNotice }: Props035E) {
  const copy = COPY035E[language] || COPY035E.ru;
  const [state, setState] = useState<LoadState035E>("idle");
  const [readiness, setReadiness] = useState<SafeResult035E>(null);
  const [handoff, setHandoff] = useState<SafeResult035E>(null);
  const [lastRoute, setLastRoute] = useState(ADMIN_FINAL_HANDOFF_035D_READINESS_ROUTE);
  const baseReady = Boolean(normalizeBase035E(config));

  const statusText = useMemo(() => {
    if (!baseReady) return copy.backendRequired;
    if (state === "ready") return copy.ready;
    if (state === "failed") return copy.failed;
    if (state === "blocked") return copy.blocked;
    return ADMIN_UI_035E_POLICY;
  }, [baseReady, copy, state]);

  const load = async (kind: "readiness" | "handoff") => {
    const route = kind === "readiness" ? ADMIN_FINAL_HANDOFF_035D_READINESS_ROUTE : ADMIN_FINAL_HANDOFF_035D_HANDOFF_ROUTE;
    setLastRoute(route);
    if (!baseReady) {
      setState("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setState("loading");
    try {
      const result = await safeGet035E(config, route);
      if (kind === "readiness") setReadiness(result); else setHandoff(result);
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
      if (kind === "readiness") setReadiness({ ok: false, status: "network_error", message }); else setHandoff({ ok: false, status: "network_error", message });
      setNotice(message);
    }
  };

  const readinessStatus = safeStatus035E(readiness);
  const handoffStatus = safeStatus035E(handoff);

  return (
    <section data-taxi-admin-ui-035e-fix1-clean-copy="no-english-clutter-in-ru-visible-copy" className="taxiRuntime028KReadModels" data-taxi-admin-ui-035e-wallet-payment-payout-owner-approval-chain-final-handoff-admin-visibility-safe-read-locked={TAXI_ADMIN_UI_035E_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_FINAL_HANDOFF_ADMIN_VISIBILITY_SAFE_READ_LOCKED} data-taxi-admin-ui-035e-policy={ADMIN_UI_035E_POLICY} data-taxi-admin-ui-035e-admin-get-only="true" data-taxi-admin-ui-035e-owner-approval-required-next="true" data-taxi-admin-ui-035e-final-handoff-only-no-execution="true" data-taxi-admin-ui-035e-money-gates="locked" data-taxi-admin-ui-035e-wallet-payment-payout-provider-db="locked" data-taxi-admin-ui-035e-no-fake-success="true">
      <div className="taxiRuntime028KHead">
        <div>
          <span>{TAXI_ADMIN_UI_035E_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_FINAL_HANDOFF_ADMIN_VISIBILITY_SAFE_READ_LOCKED}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxi007yActionButtons exact">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("handoff")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadHandoff}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-035e-status={state} data-taxi-admin-ui-035e-backend-required={String(!baseReady)}>
        <div><span>{copy.status}</span><strong>{statusText}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.adminProtected}</span><strong>{readinessStatus}</strong><small>{ADMIN_FINAL_HANDOFF_035D_READINESS_ROUTE}</small></div>
        <div><span>{copy.finalHandoff}</span><strong>locked</strong><small>{copy.lockedHandoff}</small></div>
        <div><span>{copy.source}</span><strong>{copy.moneyLocked}</strong><small>{handoffStatus}</small></div>
      </div>

      <div className="taxiRuntime028KGrid" data-taxi-admin-ui-035e-final-handoff-routes="admin-035d-readiness-handoff-public-redacted" data-taxi-admin-ui-035e-request-gates="034c-request-034d-contact-request">
        <article><span>{copy.route}</span><strong>{ADMIN_FINAL_HANDOFF_035D_READINESS_ROUTE}</strong><small>{copy.adminProtected}</small></article>
        <article><span>{copy.route}</span><strong>{ADMIN_FINAL_HANDOFF_035D_HANDOFF_ROUTE}</strong><small>{copy.adminProtected} · {handoffStatus}</small></article>
        <article><span>{copy.publicHandoff}</span><strong>{PUBLIC_FINAL_HANDOFF_035D_READINESS_ROUTE}</strong><small>redacted readiness, no raw personal data</small></article>
        <article><span>{copy.publicHandoff}</span><strong>{PUBLIC_FINAL_HANDOFF_035D_HANDOFF_ROUTE}</strong><small>final handoff only, no execution</small></article>
        <article><span>035A continuity</span><strong>{PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE}</strong><small>approval plan locked continuity</small></article>
        <article><span>034R continuity</span><strong>{PUBLIC_FINAL_HANDOFF_034R_HANDOFF_ROUTE}</strong><small>Owner Sabi AI final handoff continuity</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></article>
        <article data-taxi-admin-ui-035e-owner-approval-next="required"><span>{copy.ownerApproval}</span><strong>required</strong><small>Owner command required before any real wallet/payment/payout step.</small></article>
        <article data-taxi-admin-ui-035e-wallet-locked="true"><span>{copy.walletLocked}</span><strong>locked</strong><small>{copy.adminGetOnly}</small></article>
        <article data-taxi-admin-ui-035e-payment-locked="true"><span>{copy.paymentLocked}</span><strong>locked</strong><small>{copy.lockedHandoff}</small></article>
        <article data-taxi-admin-ui-035e-payout-locked="true"><span>{copy.payoutLocked}</span><strong>locked</strong><small>{copy.noMutation}</small></article>
        <article data-taxi-admin-ui-035e-provider-locked="true"><span>{copy.providerLocked}</span><strong>locked</strong><small>provider binding needs separate approval</small></article>
        <article data-taxi-admin-ui-035e-db-write-locked="true"><span>{copy.dbWriteLocked}</span><strong>locked</strong><small>ledger write needs separate approval</small></article>
        <article><span>{copy.noRaw}</span><strong>0</strong><small>safe-read/redacted final handoff shape only</small></article>
        <article><span>{copy.noFake}</span><strong>0</strong><small>{copy.next}</small></article>
      </div>
    </section>
  );
}
