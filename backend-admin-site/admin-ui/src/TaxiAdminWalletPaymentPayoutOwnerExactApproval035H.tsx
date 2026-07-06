import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035H_035I_FIX2_FINAL_HANDOFF_COPY_TYPE_REPAIR = "TAXI-035H-035I-FIX2-FINAL-HANDOFF-COPY-TYPE-REPAIR";
export const TAXI_ADMIN_UI_035H_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_PACKAGE_ADMIN_VISIBILITY_SAFE_READ_LOCKED = "TAXI-ADMIN-UI-035H-WALLET-PAYMENT-PAYOUT-OWNER-EXACT-APPROVAL-PACKAGE-ADMIN-VISIBILITY-SAFE-READ-LOCKED";

const ADMIN_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness";
const ADMIN_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package";
const PUBLIC_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness";
const PUBLIC_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package";
const PUBLIC_FINAL_HANDOFF_035D_HANDOFF_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff";
const PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035H_POLICY = "admin_ui_owner_exact_approval_package_visibility_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035H = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035H = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035H = {
  ok?: boolean;
  status?: number | string;
  message?: string;
  readiness?: Record<string, unknown>;
  package?: Record<string, unknown>;
  approvalPackage?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  preparedAreas?: Array<Record<string, unknown>> | Record<string, unknown>;
  approvals?: Array<Record<string, unknown>> | Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035H = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadPackage: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicPackage: string;
  exactApproval: string;
  ownerApproval: string;
  finalHandoff: string;
  requestGate: string;
  safeDisabled: string;
  lockedPackage: string;
  moneyLocked: string;
  walletLocked: string;
  paymentLocked: string;
  payoutLocked: string;
  providerLocked: string;
  dbWriteLocked: string;
  complianceLocked: string;
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

const COPY035H: Record<AdminLanguage, Copy035H> = {
  ru: {
    title: "Кошелёк и платежи: пакет точного подтверждения владельца",
    subtitle: "Админ видит готовый пакет 035G только как безопасное чтение. Это не запуск пополнения, не оплата, не выплата, не провайдер и не запись журнала в базу.",
    loadReadiness: "Проверить готовность",
    loadPackage: "Загрузить пакет владельца",
    loading: "Загрузка",
    backendRequired: "Нужен адрес сервера",
    ready: "Пакет виден",
    blocked: "Закрыто",
    failed: "Ошибка",
    adminProtected: "Защищённый админ-доступ",
    publicPackage: "Публичная безопасная версия",
    exactApproval: "Точное подтверждение владельца",
    ownerApproval: "Следующий шаг: решение владельца",
    finalHandoff: "Итоговая передача готова",
    requestGate: "Заявки на агента",
    safeDisabled: "409 безопасно закрыто",
    lockedPackage: "Только чтение, без исполнения",
    moneyLocked: "Движение денег: закрыто",
    walletLocked: "Изменение кошелька: закрыто",
    paymentLocked: "Оплата: закрыто",
    payoutLocked: "Выплата: закрыто",
    providerLocked: "Провайдер: закрыто",
    dbWriteLocked: "Запись журнала базы данных: закрыто",
    complianceLocked: "Compliance: проверка перед запуском",
    adminGetOnly: "Интерфейс администратора: только чтение",
    noMutation: "Исполнение действий: 0",
    noRaw: "Сырые персональные данные: 0",
    noFake: "Имитация успеха: 0",
    route: "Маршрут",
    status: "Статус",
    source: "Источник",
    refreshed: "Пакет обновлён",
    tokenRequired: "Для protected route нужен admin token",
    next: "Дальше: проверка рабочей среды 035I, затем отдельное решение владельца по реальной денежной цепочке.",
  },
  en: {
    title: "Wallet and payments: Owner exact approval package",
    subtitle: "Admin sees the 035G package as safe-read only. This is not top-up launch, payment, payout, provider call, or DB ledger write.",
    loadReadiness: "Check readiness",
    loadPackage: "Load Owner package",
    loading: "Loading",
    backendRequired: "Backend URL is required",
    ready: "Package visible",
    blocked: "Locked",
    failed: "Failed",
    adminProtected: "Admin protected access",
    publicPackage: "Public safe version",
    exactApproval: "Owner exact approval",
    ownerApproval: "Next step: Owner decision",
    finalHandoff: "Final handoff is ready",
    requestGate: "Agent requests",
    safeDisabled: "409 safe-disabled",
    lockedPackage: "Read-only, no execution",
    moneyLocked: "Money movement: locked",
    walletLocked: "Wallet mutation: locked",
    paymentLocked: "Payment: locked",
    payoutLocked: "Payout: locked",
    providerLocked: "Provider: locked",
    dbWriteLocked: "DB ledger write: locked",
    complianceLocked: "Compliance: check before launch",
    adminGetOnly: "Admin UI: GET-only",
    noMutation: "Action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "Fake success: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "Package refreshed",
    tokenRequired: "Admin token is required for protected route",
    next: "Next: 035I runtime smoke, then separate Owner decision for the real money chain.",
  },
  uz: {
    title: "Hamyon va to‘lovlar: egasining aniq tasdiq paketi",
    subtitle: "Admin 035G paketini faqat xavfsiz o‘qish sifatida ko‘radi. Bu to‘ldirish, to‘lov, to‘lov chiqarish, provayder chaqiruvi yoki maʼlumotlar bazasi jurnaliga yozish ishga tushishi emas.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadPackage: "Owner paketini yuklash",
    loading: "Yuklanmoqda",
    backendRequired: "Backend URL kerak",
    ready: "Paket ko‘rinadi",
    blocked: "Yopiq",
    failed: "Xato",
    adminProtected: "Admin protected access",
    publicPackage: "Public safe version",
    exactApproval: "Owner exact approval",
    ownerApproval: "Keyingi qadam: Owner decision",
    finalHandoff: "Yakuniy topshirish tayyor",
    requestGate: "Agent requests",
    safeDisabled: "409 safe-disabled",
    lockedPackage: "Faqat o‘qish, execution yo‘q",
    moneyLocked: "Money movement: locked",
    walletLocked: "Wallet mutation: locked",
    paymentLocked: "Payment: locked",
    payoutLocked: "Payout: locked",
    providerLocked: "Provider: locked",
    dbWriteLocked: "DB ledger write: locked",
    complianceLocked: "Compliance: ishga tushirishdan oldin tekshiruv",
    adminGetOnly: "Admin UI: faqat GET",
    noMutation: "Action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "Fake success: 0",
    route: "Route",
    status: "Status",
    source: "Manba",
    refreshed: "Paket yangilandi",
    tokenRequired: "Protected route uchun admin token kerak",
    next: "Keyingi: 035I runtime smoke, keyin real money chain uchun alohida Owner decision.",
  },
  zh: {
    title: "钱包和支付：所有者精确审批包",
    subtitle: "管理员只能以安全读取方式查看 035G 包。这不是充值、支付、提现、服务商调用或数据库账本写入启动。",
    loadReadiness: "检查 readiness",
    loadPackage: "加载所有者包",
    loading: "加载中",
    backendRequired: "需要服务器地址",
    ready: "Package 可见",
    blocked: "已关闭",
    failed: "失败",
    adminProtected: "Admin protected access",
    publicPackage: "Public safe version",
    exactApproval: "Owner exact approval",
    ownerApproval: "下一步：所有者决定",
    finalHandoff: "最终交接已准备",
    requestGate: "Agent requests",
    safeDisabled: "409 safe-disabled",
    lockedPackage: "只读，不执行",
    moneyLocked: "Money movement: locked",
    walletLocked: "Wallet mutation: locked",
    paymentLocked: "Payment: locked",
    payoutLocked: "Payout: locked",
    providerLocked: "Provider: locked",
    dbWriteLocked: "DB ledger write: locked",
    complianceLocked: "Compliance: launch 前检查",
    adminGetOnly: "Admin UI: GET-only",
    noMutation: "Action execution: 0",
    noRaw: "Raw personal data: 0",
    noFake: "Fake success: 0",
    route: "Route",
    status: "Status",
    source: "Source",
    refreshed: "Package refreshed",
    tokenRequired: "Protected route 需要 admin token",
    next: "下一步：035I 运行检查，然后真实资金链需要单独所有者决定。",
  },
};

function normalizeBase035H(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function headers035H(config: AdminApiConfig): Record<string, string> {
  return {
    "x-sabi-admin-token": config.token || "",
    "x-admin-token": config.token || "",
    "x-sabi-taxi-admin-ui-035h": "owner-exact-approval-package-safe-read-only",
  };
}

async function safeGet035H(config: AdminApiConfig, route: string): Promise<SafeResult035H> {
  const base = normalizeBase035H(config);
  if (!base) return { ok: false, status: "blocked", message: "backend_base_url_required" };
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035H(config) });
  const json = await response.json().catch(() => ({}));
  return { ...json, ok: response.ok, status: response.status } as SafeResult035H;
}

function safeStatus035H(value: SafeResult035H): string {
  if (!value) return "pending";
  if (value.status === 403 || value.status === 401) return "protected";
  return String(value.status || (value.ok ? "ready" : "blocked"));
}

export function TaxiAdminWalletPaymentPayoutOwnerExactApproval035HPanel({ language, config, setNotice }: Props035H) {
  const copy = COPY035H[language] || COPY035H.ru;
  const [state, setState] = useState<LoadState035H>("idle");
  const [readiness, setReadiness] = useState<SafeResult035H>(null);
  const [approvalPackage, setApprovalPackage] = useState<SafeResult035H>(null);
  const [lastRoute, setLastRoute] = useState(PUBLIC_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE);

  const summary = useMemo(() => [
    [copy.moneyLocked, "100% locked"],
    [copy.walletLocked, "100% locked"],
    [copy.paymentLocked, "100% locked"],
    [copy.payoutLocked, "100% locked"],
    [copy.providerLocked, "100% locked"],
    [copy.dbWriteLocked, "100% locked"],
    [copy.complianceLocked, "required"],
    [copy.adminGetOnly, "GET"],
  ], [copy]);

  const load = async (kind: "readiness" | "package") => {
    setState("loading");
    const route = kind === "readiness" ? PUBLIC_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE : PUBLIC_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE;
    setLastRoute(route);
    try {
      const result = await safeGet035H(config, route);
      if (kind === "readiness") setReadiness(result);
      if (kind === "package") setApprovalPackage(result);
      const ok = result?.ok === true || result?.status === 200;
      setState(ok ? "ready" : "blocked");
      setNotice(ok ? copy.refreshed : copy.blocked);
    } catch (error) {
      setState("failed");
      setNotice(error instanceof Error ? error.message : copy.failed);
    }
  };

  return (
    <section
      className="taxiAdminWalletPaymentPayoutOwnerExactApproval035H taxiAdminTechnicalSafeReadGroup035EFix2"
      data-taxi-admin-ui-035h-owner-exact-approval-package-admin-visibility-safe-read-locked={TAXI_ADMIN_UI_035H_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_PACKAGE_ADMIN_VISIBILITY_SAFE_READ_LOCKED}
      data-taxi-admin-ui-035h-policy={ADMIN_UI_035H_POLICY}
      data-admin-owner-exact-approval-035g-readiness={ADMIN_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE}
      data-admin-owner-exact-approval-035g-package={ADMIN_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE}
      data-public-owner-exact-approval-035g-readiness={PUBLIC_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE}
      data-public-owner-exact-approval-035g-package={PUBLIC_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE}
      data-public-final-handoff-035d={PUBLIC_FINAL_HANDOFF_035D_HANDOFF_ROUTE}
      data-public-approval-plan-035a={PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE}
      data-request-gate-034c={MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}
      data-request-gate-034d={MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}
      data-no-wallet-payment-payout-provider-db-execution="true"
    >
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{copy.exactApproval}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>

      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {summary.map(([label, value]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong><small>{copy.lockedPackage}</small></div>
        ))}
      </div>

      <div className="taxiRuntime028HHead">
        <div>
          <span>{copy.source}: 035G</span>
          <h2>{copy.publicPackage}</h2>
          <p>{copy.next}</p>
        </div>
        <div className="taxi035HActions">
          <button type="button" onClick={() => void load("readiness")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadReadiness}</button>
          <button type="button" onClick={() => void load("package")} disabled={state === "loading"}>{state === "loading" ? copy.loading : copy.loadPackage}</button>
        </div>
      </div>

      <div className="taxiRuntime028KStatus" data-taxi-admin-ui-035h-load-state={state}>
        <div><span>{copy.status}</span><strong>{state === "ready" ? copy.ready : state === "failed" ? copy.failed : state === "blocked" ? copy.blocked : "—"}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.adminProtected}</span><strong>{copy.tokenRequired}</strong><small>{ADMIN_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE}</small></div>
        <div><span>{copy.requestGate}</span><strong>{copy.safeDisabled}</strong><small>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</small></div>
        <div><span>{copy.noMutation}</span><strong>0</strong><small>{copy.noRaw} · {copy.noFake}</small></div>
      </div>

      <div className="taxiRuntime028KGrid">
        <div><span>{copy.loadReadiness}</span><strong>{safeStatus035H(readiness)}</strong><small>{PUBLIC_OWNER_EXACT_APPROVAL_035G_READINESS_ROUTE}</small></div>
        <div><span>{copy.loadPackage}</span><strong>{safeStatus035H(approvalPackage)}</strong><small>{PUBLIC_OWNER_EXACT_APPROVAL_035G_PACKAGE_ROUTE}</small></div>
        <div><span>035D</span><strong>{copy.finalHandoff}</strong><small>{PUBLIC_FINAL_HANDOFF_035D_HANDOFF_ROUTE}</small></div>
        <div><span>035A</span><strong>{copy.ownerApproval}</strong><small>{PUBLIC_OWNER_APPROVAL_035A_PLAN_ROUTE}</small></div>
      </div>
    </section>
  );
}
