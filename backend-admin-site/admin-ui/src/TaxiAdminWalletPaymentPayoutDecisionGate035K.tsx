import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035K_WALLET_PAYMENT_PAYOUT_OWNER_DECISION_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED = "TAXI-ADMIN-UI-035K-WALLET-PAYMENT-PAYOUT-OWNER-DECISION-GATE-ADMIN-VISIBILITY-RUNTIME-SMOKE-LOCKED";

const ADMIN_DECISION_GATE_035J_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/readiness";
const ADMIN_DECISION_GATE_035J_GATE_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate";
const PUBLIC_DECISION_GATE_035J_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/readiness";
const PUBLIC_DECISION_GATE_035J_GATE_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate";
const PUBLIC_OWNER_PACKAGE_035G_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package";
const PUBLIC_FINAL_HANDOFF_035D_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035K_POLICY = "admin_ui_owner_approval_decision_gate_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035K = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035K = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035K = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  gate?: Record<string, unknown>;
  decisionGate?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  requiredApprovals?: Array<Record<string, unknown>> | Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035K = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadGate: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicGate: string;
  decisionGate: string;
  exactOwnerApproval: string;
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
  adminGetOnly: string;
  noMutation: string;
  route: string;
  status: string;
  refreshed: string;
  next: string;
};

const COPY035K: Record<AdminLanguage, Copy035K> = {
  ru: {
    title: "Кошелёк и платежи: решение владельца",
    subtitle: "Финальный безопасный экран 035J перед реальной денежной цепочкой. Администратор видит контрольный шлюз, но не может запустить пополнение, оплату, выплату, провайдера или запись журнала.",
    loadReadiness: "Проверить готовность",
    loadGate: "Открыть контрольный шлюз",
    loading: "Проверяю безопасный контрольный шлюз...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    blocked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    publicGate: "Публичная сводка контрольного шлюза",
    decisionGate: "Решение владельца",
    exactOwnerApproval: "Требуется точное подтверждение владельца",
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
    adminGetOnly: "Только чтение",
    noMutation: "Без действий и записи",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    next: "Следующий шаг: отдельное подтверждение владельца для реального слоя кошелька, оплаты, выплат, провайдера и базы данных chain.",
  },
  en: {
    title: "Balance account and charges: principal decision control step",
    subtitle: "Final safe 035J screen before the real money chain. Admin can view the control step but cannot start top-up, charge, withdrawal, external service or ledger write.",
    loadReadiness: "Check readiness",
    loadGate: "Open control step",
    loading: "Checking safe control step...",
    backendRequired: "Set server base URL in admin interface settings.",
    ready: "Ready",
    blocked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    publicGate: "Public control step summary",
    decisionGate: "principal decision control step",
    exactOwnerApproval: "Exact principal confirmation required",
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
    adminGetOnly: "Read only",
    noMutation: "No actions or writes",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    next: "Next step: separate principal confirmation for real balance account/charge/withdrawal/external service/database chain.",
  },
  uz: {
    title: "Hamyon va to ‘lovlar: egasi qaror darvozasi",
    subtitle: "Real pul zanjiridan oldingi 035J xavfsiz ekran. Admin nazorat ko ‘radi, lekin to ‘ldirish, to ‘lov, to ‘lov chiqarish, tashqi xizmat yoki jurnal yozuvini ishga tushira olmaydi.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadGate: "Control step ochish",
    loading: "Xavfsiz control step tekshirilmoqda...",
    backendRequired: "admin interface sozlamalarida server base URL kiriting.",
    ready: "Tayyor",
    blocked: "Yopiq",
    failed: "O ‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    publicGate: "Ochiq control step xulosasi",
    decisionGate: "Egasi qarori",
    exactOwnerApproval: "Egasining aniq tasdig ‘i kerak",
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
    adminGetOnly: "Faqat o ‘qish",
    noMutation: "Harakatsiz va yozuvsiz",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    next: "Keyingi qadam: real hamyon, to ‘lov, to ‘lov chiqarish, tashqi xizmat va ma ʼlumotlar bazasi chain uchun alohida egasi tasdig ‘i.",
  },
  zh: {
    title: "钱包和支付：所有者决策门",
    subtitle: "真实资金链之前的 035J 安全页面。管理员只能查看控制关口，不能启动充值、支付、提现、服务商或账本写入。",
    loadReadiness: "检查就绪",
    loadGate: "打开控制关口",
    loading: "正在检查安全控制关口...",
    backendRequired: "请在 Admin 界面 设置 服务器 base URL。",
    ready: "就绪",
    blocked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    publicGate: "公开控制关口摘要",
    decisionGate: "所有者决策门",
    exactOwnerApproval: "需要所有者精确确认",
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
    adminGetOnly: "只读",
    noMutation: "无操作无写入",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    next: "下一步：为真实钱包、支付、提现、服务商和数据库链路单独进行所有者确认。",
  },
};

function baseUrl035K(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035K(config: AdminApiConfig): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) {
    headers["x-sabi-admin-token"] = config.token;
    headers["x-admin-token"] = config.token;
  }
  return headers;
}

async function read035K(config: AdminApiConfig, route: string): Promise<SafeResult035K> {
  const base = baseUrl035K(config);
  if (!base) throw new Error("backend_base_url_required");
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035K(config) });
  const text = await response.text();
  let body: SafeResult035K = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }
  return { ...(body || {}), ok: response.ok, status: response.status };
}

function statusText035K(copy: Copy035K, value: SafeResult035K): string {
  if (!value) return copy.blocked;
  if (value.ok === true) return copy.ready;
  if (value.status === 401 || value.status === 403) return copy.adminProtected;
  return copy.blocked;
}

export function TaxiAdminWalletPaymentPayoutDecisionGate035KPanel(props: Props035K) {
  const { language, config, setNotice } = props;
  const copy = COPY035K[language] || COPY035K.ru;
  const [state, setState] = useState<LoadState035K>("idle");
  const [readiness, setReadiness] = useState<SafeResult035K>(null);
  const [gate, setGate] = useState<SafeResult035K>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const summary = useMemo(() => [
    { label: copy.decisionGate, value: copy.exactOwnerApproval },
    { label: copy.moneyLocked, value: copy.noMutation },
    { label: copy.walletLocked, value: copy.noMutation },
    { label: copy.paymentLocked, value: copy.noMutation },
    { label: copy.payoutLocked, value: copy.noMutation },
    { label: copy.providerLocked, value: copy.noMutation },
    { label: copy.dbWriteLocked, value: copy.noMutation },
    { label: copy.adminGetOnly, value: ADMIN_UI_035K_POLICY },
  ], [copy]);

  async function load(route: string, target: "readiness" | "gate") {
    setState("loading");
    try {
      const result = await read035K(config, route);
      if (target === "readiness") setReadiness(result);
      if (target === "gate") setGate(result);
      setUpdatedAt(new Date().toLocaleString());
      setState(result?.ok ? "ready" : "blocked");
      setNotice(`${copy.title}: ${statusText035K(copy, result)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState(message === "backend_base_url_required" ? "blocked" : "failed");
      setNotice(message === "backend_base_url_required" ? copy.backendRequired : `${copy.failed}: ${message}`);
    }
  }

  const status = state === "loading" ? copy.loading : state === "failed" ? copy.failed : gate ? statusText035K(copy, gate) : readiness ? statusText035K(copy, readiness) : copy.blocked;

  return (
    <section className="taxiAdminTechnicalSafeReadGroup035EFix2 taxiAdminWalletPaymentPayoutDecisionGate035K" data-taxi-admin-035k-owner-decision-gate={TAXI_ADMIN_UI_035K_WALLET_PAYMENT_PAYOUT_OWNER_DECISION_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED} data-taxi-admin-035k-policy={ADMIN_UI_035K_POLICY}>
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035K_WALLET_PAYMENT_PAYOUT_OWNER_DECISION_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {summary.map((item) => (
          <div key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><small>{copy.status}: {status}</small></div>
        ))}
      </div>
      <div className="taxiAdminTechnicalSafeReadActions035EFix2">
        <button type="button" onClick={() => load(ADMIN_DECISION_GATE_035J_READINESS_ROUTE, "readiness")}>{copy.loadReadiness}</button>
        <button type="button" onClick={() => load(ADMIN_DECISION_GATE_035J_GATE_ROUTE, "gate")}>{copy.loadGate}</button>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.adminProtected}</span><strong>{ADMIN_DECISION_GATE_035J_GATE_ROUTE}</strong><small>{copy.route}: {ADMIN_DECISION_GATE_035J_READINESS_ROUTE}</small></div>
        <div><span>{copy.publicGate}</span><strong>{PUBLIC_DECISION_GATE_035J_GATE_ROUTE}</strong><small>{copy.route}: {PUBLIC_DECISION_GATE_035J_READINESS_ROUTE}</small></div>
        <div><span>{copy.ownerPackage}</span><strong>{PUBLIC_OWNER_PACKAGE_035G_ROUTE}</strong><small>{copy.exactOwnerApproval}</small></div>
        <div><span>{copy.finalHandoff}</span><strong>{PUBLIC_FINAL_HANDOFF_035D_ROUTE}</strong><small>{copy.adminGetOnly}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</small></div>
      </div>
      <div className="taxiAdminTechnicalSafeReadFoot035EFix2">
        <span>{copy.refreshed}: {updatedAt || "—"}</span>
        <p>{copy.next}</p>
      </div>
    </section>
  );
}
