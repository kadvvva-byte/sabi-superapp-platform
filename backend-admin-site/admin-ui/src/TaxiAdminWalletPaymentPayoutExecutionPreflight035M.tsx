import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035M_EXECUTION_PREFLIGHT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED = "TAXI-ADMIN-UI-035M-EXECUTION-PREFLIGHT-ADMIN-VISIBILITY-RUNTIME-SMOKE-LOCKED";

const ADMIN_EXECUTION_PREFLIGHT_035L_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/readiness";
const ADMIN_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE = "/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/preflight";
const PUBLIC_EXECUTION_PREFLIGHT_035L_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/execution-preflight/035l/readiness";
const PUBLIC_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE = "/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight";
const PUBLIC_DECISION_GATE_035J_GATE_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate";
const PUBLIC_OWNER_PACKAGE_035G_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package";
const PUBLIC_FINAL_HANDOFF_035D_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035M_POLICY = "admin_ui_execution_preflight_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035M = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035M = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035M = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  preflight?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  preflightAreas?: Array<Record<string, unknown>> | Record<string, unknown>;
  exactApprovalsStillRequired?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035M = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadPreflight: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicPreflight: string;
  executionPreflight: string;
  exactOwnerApproval: string;
  decisionGate: string;
  ownerPackage: string;
  finalHandoff: string;
  requestGate: string;
  safeDisabled: string;
  moneyLocked: string;
  walletLocked: string;
  paymentLocked: string;
  payoutLocked: string;
  providerLocked: string;
  dbWriteLocked: string;
  auditReady: string;
  adminGetOnly: string;
  noMutation: string;
  route: string;
  status: string;
  refreshed: string;
  readiness: string;
  fullTaxi: string;
  next: string;
};

const COPY035M: Record<AdminLanguage, Copy035M> = {
  ru: {
    title: "Реальные деньги: preflight исполнения",
    subtitle: "Экран 035L показывает готовность будущего слоя кошелька, оплаты, выплат, провайдера и базы данных слоя. Админ только читает: запуск денег, провайдера и записи журнал всё ещё закрыт до отдельного подтверждения владельца.",
    loadReadiness: "Проверить готовность",
    loadPreflight: "Открыть preflight",
    loading: "Проверяю preflight...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    blocked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    publicPreflight: "Публичный preflight",
    executionPreflight: "Preflight исполнения 035L",
    exactOwnerApproval: "Требуется отдельное подтверждение владельца",
    decisionGate: "Control step 035J",
    ownerPackage: "Пакет 035G",
    finalHandoff: "Итоговая передача 035D",
    requestGate: "Заявки агентов",
    safeDisabled: "Остаются safe-disabled",
    moneyLocked: "Деньги закрыты",
    walletLocked: "Кошелёк закрыт",
    paymentLocked: "Оплаты закрыты",
    payoutLocked: "Выплаты закрыты",
    providerLocked: "Провайдер закрыт",
    dbWriteLocked: "Запись в базу закрыта",
    auditReady: "Аудит Саби ИИ владельца готов к контролю",
    adminGetOnly: "Только чтение",
    noMutation: "Без действий и записи",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    readiness: "Готовность цепочки утверждений",
    fullTaxi: "Полная готовность такси",
    next: "Следующий шаг: владелец цепочка утверждений для реального исполнительного слоя, без автозапуска денег.",
  },
  en: {
    title: "Real money: execution preflight",
    subtitle: "035L screen shows readiness for the future balance account/charge/withdrawal/external service/database layer. Admin is read-only: money, external service and ledger write remain locked until separate principal confirmation.",
    loadReadiness: "Check readiness",
    loadPreflight: "Open preflight",
    loading: "Checking preflight...",
    backendRequired: "Set server base URL in admin interface settings.",
    ready: "Ready",
    blocked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    publicPreflight: "Public preflight",
    executionPreflight: "035L execution preflight",
    exactOwnerApproval: "Separate principal confirmation required",
    decisionGate: "035J control step",
    ownerPackage: "035G package",
    finalHandoff: "035D final handoff",
    requestGate: "Agent requests",
    safeDisabled: "Remain safe-disabled",
    moneyLocked: "Money locked",
    walletLocked: "Balance account locked",
    paymentLocked: "Payments locked",
    payoutLocked: "Payouts locked",
    providerLocked: "External service locked",
    dbWriteLocked: "database write locked",
    auditReady: "Principal Sabi AI audit is ready",
    adminGetOnly: "Read only",
    noMutation: "No actions or writes",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    readiness: "Approval chain readiness",
    fullTaxi: "Full Taxi readiness",
    next: "Next step: principal confirmation chain for real execution layer, without auto-starting money.",
  },
  uz: {
    title: "Real pul: execution preflight",
    subtitle: "035L ekrani kelajakdagi hamyon, to ‘lov, to ‘lov chiqarish, tashqi xizmat va ma ʼlumotlar bazasi qatlamining tayyorligini ko ‘rsatadi. Admin faqat o ‘qiydi: pul, tashqi xizmat va jurnal yozuvi alohida egasi tasdig ‘igacha yopiq.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadPreflight: "Preflight ochish",
    loading: "Preflight tekshirilmoqda...",
    backendRequired: "admin interface sozlamalarida server base URL kiriting.",
    ready: "Tayyor",
    blocked: "Yopiq",
    failed: "O ‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    publicPreflight: "Ochiq preflight",
    executionPreflight: "035L execution preflight",
    exactOwnerApproval: "Alohida egasi tasdig ‘i kerak",
    decisionGate: "035J control step",
    ownerPackage: "035G paketi",
    finalHandoff: "035D yakuniy topshirish",
    requestGate: "Agent so ‘rovlari",
    safeDisabled: "Safe-disabled holatda",
    moneyLocked: "Pul yopiq",
    walletLocked: "Hamyon yopiq",
    paymentLocked: "To ‘lovlar yopiq",
    payoutLocked: "Payout yopiq",
    providerLocked: "External service yopiq",
    dbWriteLocked: "Bazaga yozish yopiq",
    auditReady: "egasining Sabi sun ʼiy intellekti tekshiruv tayyor",
    adminGetOnly: "Faqat o ‘qish",
    noMutation: "Harakatsiz va yozuvsiz",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    readiness: "Approval chain tayyorligi",
    fullTaxi: "Taksi to‘liq tayyorligi",
    next: "Keyingi qadam: real execution qatlami uchun egasi tasdiq chain, pulni avtomatik ishga tushirmasdan.",
  },
  zh: {
    title: "真实资金：执行预检",
    subtitle: "035L 页面显示未来钱包、支付、提现、服务商和数据库层的就绪状态。管理员只能读取；资金、服务商和账本写入仍需所有者单独确认后才可开启。",
    loadReadiness: "检查就绪",
    loadPreflight: "打开 preflight",
    loading: "正在检查 preflight...",
    backendRequired: "请在 Admin 界面 设置 服务器 base URL。",
    ready: "就绪",
    blocked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    publicPreflight: "公开 preflight",
    executionPreflight: "035L 执行预检",
    exactOwnerApproval: "需要所有者单独确认",
    decisionGate: "035J control step",
    ownerPackage: "035G 包",
    finalHandoff: "035D 最终交接",
    requestGate: "代理请求",
    safeDisabled: "保持安全禁用",
    moneyLocked: "资金已锁定",
    walletLocked: "钱包已锁定",
    paymentLocked: "支付已锁定",
    payoutLocked: "提现已锁定",
    providerLocked: "服务商 已锁定",
    dbWriteLocked: "数据库写入已锁定",
    auditReady: "所有者萨比智能 审计 已就绪",
    adminGetOnly: "只读",
    noMutation: "无操作无写入",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    readiness: "审批链已就绪",
    fullTaxi: "出租车总就绪",
    next: "下一步：真实执行层的所有者 审批 chain，不自动启动资金。",
  },
};

function baseUrl035M(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035M(config: AdminApiConfig): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) {
    headers["x-sabi-admin-token"] = config.token;
    headers["x-admin-token"] = config.token;
  }
  return headers;
}

async function read035M(config: AdminApiConfig, route: string): Promise<SafeResult035M> {
  const base = baseUrl035M(config);
  if (!base) throw new Error("backend_base_url_required");
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035M(config) });
  const text = await response.text();
  let body: SafeResult035M = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }
  return { ...(body || {}), ok: response.ok, status: response.status };
}

function statusText035M(copy: Copy035M, value: SafeResult035M): string {
  if (!value) return copy.blocked;
  if (value.ok === true) return copy.ready;
  if (value.status === 401 || value.status === 403) return copy.adminProtected;
  return copy.blocked;
}

function readinessValue035M(value: SafeResult035M, key: string, fallback: string): string {
  const readiness = value?.readiness && typeof value.readiness === "object" ? value.readiness : null;
  const preflight = value?.preflight && typeof value.preflight === "object" ? value.preflight : null;
  const source = readiness || preflight;
  const raw = source ? (source as Record<string, unknown>)[key] : undefined;
  if (typeof raw === "number") return `${raw}%`;
  if (typeof raw === "string") return raw;
  return fallback;
}

export function TaxiAdminWalletPaymentPayoutExecutionPreflight035MPanel(props: Props035M) {
  const { language, config, setNotice } = props;
  const copy = COPY035M[language] || COPY035M.ru;
  const [state, setState] = useState<LoadState035M>("idle");
  const [readiness, setReadiness] = useState<SafeResult035M>(null);
  const [preflight, setPreflight] = useState<SafeResult035M>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const summary = useMemo(() => [
    { label: copy.executionPreflight, value: copy.exactOwnerApproval },
    { label: copy.moneyLocked, value: copy.noMutation },
    { label: copy.walletLocked, value: copy.noMutation },
    { label: copy.paymentLocked, value: copy.noMutation },
    { label: copy.payoutLocked, value: copy.noMutation },
    { label: copy.providerLocked, value: copy.noMutation },
    { label: copy.dbWriteLocked, value: copy.noMutation },
    { label: copy.auditReady, value: ADMIN_UI_035M_POLICY },
  ], [copy]);

  async function load(route: string, target: "readiness" | "preflight") {
    setState("loading");
    try {
      const result = await read035M(config, route);
      if (target === "readiness") setReadiness(result);
      if (target === "preflight") setPreflight(result);
      setUpdatedAt(new Date().toLocaleString());
      setState(result?.ok ? "ready" : "blocked");
      setNotice(`${copy.title}: ${statusText035M(copy, result)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState(message === "backend_base_url_required" ? "blocked" : "failed");
      setNotice(message === "backend_base_url_required" ? copy.backendRequired : `${copy.failed}: ${message}`);
    }
  }

  const status = state === "loading" ? copy.loading : state === "failed" ? copy.failed : preflight ? statusText035M(copy, preflight) : readiness ? statusText035M(copy, readiness) : copy.blocked;
  const approvalChain = readinessValue035M(readiness || preflight, "taxiWalletPaymentPayoutApprovalChain", "80%");
  const fullTaxi = readinessValue035M(readiness || preflight, "taxiFullProductionReadiness", "68%");

  return (
    <section className="taxiAdminTechnicalSafeReadGroup035EFix2 taxiAdminWalletPaymentPayoutExecutionPreflight035M" data-taxi-admin-035m-execution-preflight={TAXI_ADMIN_UI_035M_EXECUTION_PREFLIGHT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED} data-taxi-admin-035m-policy={ADMIN_UI_035M_POLICY}>
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035M_EXECUTION_PREFLIGHT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {summary.map((item) => (
          <div key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><small>{copy.status}: {status}</small></div>
        ))}
      </div>
      <div className="taxiAdminTechnicalSafeReadActions035EFix2">
        <button type="button" onClick={() => load(ADMIN_EXECUTION_PREFLIGHT_035L_READINESS_ROUTE, "readiness")}>{copy.loadReadiness}</button>
        <button type="button" onClick={() => load(ADMIN_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE, "preflight")}>{copy.loadPreflight}</button>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.adminProtected}</span><strong>{ADMIN_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE}</strong><small>{copy.route}: {ADMIN_EXECUTION_PREFLIGHT_035L_READINESS_ROUTE}</small></div>
        <div><span>{copy.publicPreflight}</span><strong>{PUBLIC_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE}</strong><small>{copy.route}: {PUBLIC_EXECUTION_PREFLIGHT_035L_READINESS_ROUTE}</small></div>
        <div><span>{copy.decisionGate}</span><strong>{PUBLIC_DECISION_GATE_035J_GATE_ROUTE}</strong><small>{copy.exactOwnerApproval}</small></div>
        <div><span>{copy.ownerPackage}</span><strong>{PUBLIC_OWNER_PACKAGE_035G_ROUTE}</strong><small>{copy.adminGetOnly}</small></div>
        <div><span>{copy.finalHandoff}</span><strong>{PUBLIC_FINAL_HANDOFF_035D_ROUTE}</strong><small>{copy.adminGetOnly}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</small></div>
        <div><span>{copy.readiness}</span><strong>{approvalChain}</strong><small>{copy.fullTaxi}: {fullTaxi}</small></div>
      </div>
      <div className="taxiAdminTechnicalSafeReadFoot035EFix2">
        <span>{copy.refreshed}: {updatedAt || "—"}</span>
        <p>{copy.next}</p>
      </div>
    </section>
  );
}
