import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035O_EXECUTION_LAYER_SPLIT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED = "TAXI-ADMIN-UI-035O-EXECUTION-LAYER-SPLIT-ADMIN-VISIBILITY-RUNTIME-SMOKE-LOCKED";

const ADMIN_EXECUTION_LAYER_SPLIT_035N_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/readiness";
const ADMIN_EXECUTION_LAYER_SPLIT_035N_APPROVALS_ROUTE = "/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/approvals";
const PUBLIC_EXECUTION_LAYER_SPLIT_035N_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/execution-layer-split/035n/readiness";
const PUBLIC_EXECUTION_LAYER_SPLIT_035N_APPROVALS_ROUTE = "/api/taxi/wallet-payment-payout/execution-layer-split/035n/approvals";
const PUBLIC_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE = "/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight";
const PUBLIC_DECISION_GATE_035J_GATE_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate";
const PUBLIC_OWNER_PACKAGE_035G_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035O_POLICY = "admin_ui_execution_layer_split_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035O = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035O = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035O = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  approvals?: Record<string, unknown> | Array<Record<string, unknown>>;
  safety?: Record<string, unknown>;
  layers?: Array<Record<string, unknown>> | Record<string, unknown>;
  exactApprovalsStillRequired?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035O = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadApprovals: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicApprovals: string;
  executionLayerSplit: string;
  exactOwnerApproval: string;
  preflight: string;
  decisionGate: string;
  ownerPackage: string;
  requestGate: string;
  safeDisabled: string;
  walletLayer: string;
  paymentLayer: string;
  payoutLayer: string;
  providerLayer: string;
  dbLedgerLayer: string;
  refundLayer: string;
  productionLayer: string;
  adminGetOnly: string;
  noMutation: string;
  route: string;
  status: string;
  refreshed: string;
  readiness: string;
  fullTaxi: string;
  next: string;
};

const COPY035O: Record<AdminLanguage, Copy035O> = {
  ru: {
    title: "Реальное исполнение: утверждение s разделены",
    subtitle: "Экран 035N делит будущий запуск на отдельные подтверждения владельца: кошелёк, оплата, выплаты, провайдер, журнал базы данных, возврат и производственный запуск. Админ только читает, ничего не запускает.",
    loadReadiness: "Проверить готовность",
    loadApprovals: "Открыть утверждение s",
    loading: "Проверяю split layer...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    blocked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    publicApprovals: "Публичный список утверждение s",
    executionLayerSplit: "Split 035N",
    exactOwnerApproval: "Отдельное подтверждение владельца обязательно",
    preflight: "Preflight 035L",
    decisionGate: "Control step 035J",
    ownerPackage: "Пакет 035G",
    requestGate: "Заявки агентов",
    safeDisabled: "Остаются safe-disabled",
    walletLayer: "Balance account confirmation",
    paymentLayer: "Payment capture confirmation",
    payoutLayer: "Driver withdrawal confirmation",
    providerLayer: "External service binding confirmation",
    dbLedgerLayer: "database ledger write confirmation",
    refundLayer: "Refund/reversal confirmation",
    productionLayer: "Production launch confirmation",
    adminGetOnly: "Только чтение",
    noMutation: "Без действий и записи",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    readiness: "Готовность цепочки утверждений",
    fullTaxi: "Полная готовность такси",
    next: "Следующий шаг: владелец контроль утверждения на каждый исполнение-слой отдельно, без автозапуска денег.",
  },
  en: {
    title: "Real execution: approvals split",
    subtitle: "035N screen splits the future launch into separate principal confirmations: balance account, charge, withdrawal, external service, database ledger, refund and production launch. Admin reads only and starts nothing.",
    loadReadiness: "Check readiness",
    loadApprovals: "Open approvals",
    loading: "Checking split layer...",
    backendRequired: "Set server base URL in admin interface settings.",
    ready: "Ready",
    blocked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    publicApprovals: "Public approvals list",
    executionLayerSplit: "035N split",
    exactOwnerApproval: "Separate principal confirmation required",
    preflight: "035L preflight",
    decisionGate: "035J control step",
    ownerPackage: "035G package",
    requestGate: "Agent requests",
    safeDisabled: "Remain safe-disabled",
    walletLayer: "Balance account confirmation",
    paymentLayer: "Payment capture confirmation",
    payoutLayer: "Driver withdrawal confirmation",
    providerLayer: "External service binding confirmation",
    dbLedgerLayer: "database ledger write confirmation",
    refundLayer: "Refund/reversal confirmation",
    productionLayer: "Production launch confirmation",
    adminGetOnly: "Read only",
    noMutation: "No actions or writes",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    readiness: "Approval chain readiness",
    fullTaxi: "Full Taxi readiness",
    next: "Next step: principal confirmation control step for each execution layer separately, without auto-starting money.",
  },
  uz: {
    title: "Real execution: approvals ajratildi",
    subtitle: "035N ekrani kelajakdagi ishga tushirishni alohida egasi tasdiqlariga ajratadi: hamyon, to ‘lov, to ‘lov chiqarish, tashqi xizmat, ma ʼlumotlar bazasi jurnali, qaytarish va ishlab chiqarish ishga tushirilishi. Admin faqat o ‘qiydi, hech narsa ishga tushmaydi.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadApprovals: "Approvals ochish",
    loading: "Split layer tekshirilmoqda...",
    backendRequired: "admin interface sozlamalarida server base URL kiriting.",
    ready: "Tayyor",
    blocked: "Yopiq",
    failed: "O ‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    publicApprovals: "Ochiq tasdiqs ro ‘yxati",
    executionLayerSplit: "035N split",
    exactOwnerApproval: "Alohida egasi tasdig ‘i shart",
    preflight: "035L preflight",
    decisionGate: "035J control step",
    ownerPackage: "035G paketi",
    requestGate: "Agent so ‘rovlari",
    safeDisabled: "Safe-disabled holatda",
    walletLayer: "Balance account confirmation",
    paymentLayer: "Payment capture confirmation",
    payoutLayer: "Driver withdrawal confirmation",
    providerLayer: "External service binding confirmation",
    dbLedgerLayer: "database ledger write confirmation",
    refundLayer: "Refund/reversal confirmation",
    productionLayer: "Production launch confirmation",
    adminGetOnly: "Faqat o ‘qish",
    noMutation: "Harakatsiz va yozuvsiz",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    readiness: "Approval chain tayyorligi",
    fullTaxi: "Taksi to‘liq tayyorligi",
    next: "Keyingi qadam: har bir execution qatlami uchun alohida egasi tasdiq nazorat, pulni avtomatik ishga tushirmasdan.",
  },
  zh: {
    title: "真实执行：审批已拆分",
    subtitle: "035N 页面把未来上线拆分为单独的所有者确认：钱包、支付、提现、服务商、数据库账本、退款和生产启动。管理员只读，不启动任何执行。",
    loadReadiness: "检查就绪",
    loadApprovals: "打开 审批s",
    loading: "正在检查 split layer...",
    backendRequired: "请在 Admin 界面 设置 服务器 base URL。",
    ready: "就绪",
    blocked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    publicApprovals: "公开 审批s 列表",
    executionLayerSplit: "035N split",
    exactOwnerApproval: "需要所有者单独确认",
    preflight: "035L preflight",
    decisionGate: "035J control step",
    ownerPackage: "035G 包",
    requestGate: "代理请求",
    safeDisabled: "保持安全禁用",
    walletLayer: "Balance account confirmation",
    paymentLayer: "Payment capture confirmation",
    payoutLayer: "Driver withdrawal confirmation",
    providerLayer: "External service binding confirmation",
    dbLedgerLayer: "database ledger write confirmation",
    refundLayer: "Refund/reversal confirmation",
    productionLayer: "Production launch confirmation",
    adminGetOnly: "只读",
    noMutation: "无操作无写入",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    readiness: "审批链已就绪",
    fullTaxi: "出租车总就绪",
    next: "下一步：每个执行层都需要所有者单独审批，不自动启动资金。",
  },
};

function baseUrl035O(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035O(config: AdminApiConfig): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) {
    headers["x-sabi-admin-token"] = config.token;
    headers["x-admin-token"] = config.token;
  }
  return headers;
}

async function read035O(config: AdminApiConfig, route: string): Promise<SafeResult035O> {
  const base = baseUrl035O(config);
  if (!base) throw new Error("backend_base_url_required");
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035O(config) });
  const text = await response.text();
  let body: SafeResult035O = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }
  return { ...(body || {}), ok: response.ok, status: response.status };
}

function statusText035O(copy: Copy035O, value: SafeResult035O): string {
  if (!value) return copy.blocked;
  if (value.ok === true) return copy.ready;
  if (value.status === 401 || value.status === 403) return copy.adminProtected;
  return copy.blocked;
}

function readinessValue035O(value: SafeResult035O, key: string, fallback: string): string {
  const readiness = value?.readiness && typeof value.readiness === "object" ? value.readiness : null;
  const source = readiness || (value && typeof value === "object" ? value as Record<string, unknown> : null);
  const raw = source ? (source as Record<string, unknown>)[key] : undefined;
  if (typeof raw === "number") return `${raw}%`;
  if (typeof raw === "string") return raw;
  return fallback;
}

export function TaxiAdminWalletPaymentPayoutExecutionLayerSplit035OPanel(props: Props035O) {
  const { language, config, setNotice } = props;
  const copy = COPY035O[language] || COPY035O.ru;
  const [state, setState] = useState<LoadState035O>("idle");
  const [readiness, setReadiness] = useState<SafeResult035O>(null);
  const [approvals, setApprovals] = useState<SafeResult035O>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const summary = useMemo(() => [
    { label: copy.executionLayerSplit, value: copy.exactOwnerApproval },
    { label: copy.walletLayer, value: copy.noMutation },
    { label: copy.paymentLayer, value: copy.noMutation },
    { label: copy.payoutLayer, value: copy.noMutation },
    { label: copy.providerLayer, value: copy.noMutation },
    { label: copy.dbLedgerLayer, value: copy.noMutation },
    { label: copy.refundLayer, value: copy.noMutation },
    { label: copy.productionLayer, value: copy.noMutation },
  ], [copy]);

  async function load(route: string, target: "readiness" | "approvals") {
    setState("loading");
    try {
      const result = await read035O(config, route);
      if (target === "readiness") setReadiness(result);
      if (target === "approvals") setApprovals(result);
      setUpdatedAt(new Date().toLocaleString());
      setState(result?.ok ? "ready" : "blocked");
      setNotice(`${copy.title}: ${statusText035O(copy, result)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState(message === "backend_base_url_required" ? "blocked" : "failed");
      setNotice(message === "backend_base_url_required" ? copy.backendRequired : `${copy.failed}: ${message}`);
    }
  }

  const status = state === "loading" ? copy.loading : state === "failed" ? copy.failed : approvals ? statusText035O(copy, approvals) : readiness ? statusText035O(copy, readiness) : copy.blocked;
  const approvalChain = readinessValue035O(readiness || approvals, "taxiWalletPaymentPayoutApprovalChain", "85%");
  const fullTaxi = readinessValue035O(readiness || approvals, "taxiFullProductionReadiness", "72%");

  return (
    <section className="taxiAdminTechnicalSafeReadGroup035EFix2 taxiAdminWalletPaymentPayoutExecutionLayerSplit035O" data-taxi-admin-035o-execution-layer-split={TAXI_ADMIN_UI_035O_EXECUTION_LAYER_SPLIT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED} data-taxi-admin-035o-policy={ADMIN_UI_035O_POLICY}>
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035O_EXECUTION_LAYER_SPLIT_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {summary.map((item) => (
          <div key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><small>{copy.status}: {status}</small></div>
        ))}
      </div>
      <div className="taxiAdminTechnicalSafeReadActions035EFix2">
        <button type="button" onClick={() => load(ADMIN_EXECUTION_LAYER_SPLIT_035N_READINESS_ROUTE, "readiness")}>{copy.loadReadiness}</button>
        <button type="button" onClick={() => load(ADMIN_EXECUTION_LAYER_SPLIT_035N_APPROVALS_ROUTE, "approvals")}>{copy.loadApprovals}</button>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.adminProtected}</span><strong>{ADMIN_EXECUTION_LAYER_SPLIT_035N_APPROVALS_ROUTE}</strong><small>{copy.route}: {ADMIN_EXECUTION_LAYER_SPLIT_035N_READINESS_ROUTE}</small></div>
        <div><span>{copy.publicApprovals}</span><strong>{PUBLIC_EXECUTION_LAYER_SPLIT_035N_APPROVALS_ROUTE}</strong><small>{copy.route}: {PUBLIC_EXECUTION_LAYER_SPLIT_035N_READINESS_ROUTE}</small></div>
        <div><span>{copy.preflight}</span><strong>{PUBLIC_EXECUTION_PREFLIGHT_035L_PREFLIGHT_ROUTE}</strong><small>{copy.adminGetOnly}</small></div>
        <div><span>{copy.decisionGate}</span><strong>{PUBLIC_DECISION_GATE_035J_GATE_ROUTE}</strong><small>{copy.exactOwnerApproval}</small></div>
        <div><span>{copy.ownerPackage}</span><strong>{PUBLIC_OWNER_PACKAGE_035G_ROUTE}</strong><small>{copy.adminGetOnly}</small></div>
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
