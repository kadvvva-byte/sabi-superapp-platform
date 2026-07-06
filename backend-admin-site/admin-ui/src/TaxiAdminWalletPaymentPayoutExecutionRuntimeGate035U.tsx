import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035U_OWNER_APPROVAL_EXECUTION_RUNTIME_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED = "TAXI-ADMIN-UI-035U-OWNER-APPROVAL-EXECUTION-RUNTIME-GATE-ADMIN-VISIBILITY-RUNTIME-SMOKE-LOCKED";

const ADMIN_RUNTIME_GATE_035T_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/readiness";
const ADMIN_RUNTIME_GATE_035T_GATE_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate";
const PUBLIC_RUNTIME_GATE_035T_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/readiness";
const PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate";
const PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff";
const PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035U_POLICY = "admin_ui_035u_reads_035t_runtime_gate_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035U = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035U = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035U = {
  ok?: boolean;
  status?: number | string;
  readiness?: Record<string, unknown>;
  gate?: Record<string, unknown>;
  safety?: Record<string, unknown>;
  approvals?: Record<string, unknown> | Array<Record<string, unknown>>;
  layers?: Array<Record<string, unknown>>;
  exactApprovalsStillRequired?: Record<string, unknown>;
  [key: string]: unknown;
} | null;

type Copy035U = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadGate: string;
  loading: string;
  backendRequired: string;
  ready: string;
  locked: string;
  failed: string;
  adminProtected: string;
  runtimeGate: string;
  exactOwnerApproval: string;
  megaHandoff: string;
  intakePackage: string;
  requestGate: string;
  safeDisabled: string;
  adminGetOnly: string;
  noMutation: string;
  route: string;
  status: string;
  refreshed: string;
  readiness: string;
  fullTaxi: string;
  next: string;
};

const COPY035U: Record<AdminLanguage, Copy035U> = {
  ru: {
    title: "Контроль рабочей среды реального исполнения",
    subtitle: "035T показывает последний заблокированный контроль перед реальным исполнением кошелька, оплаты, выплат, провайдера и базы данных. Админ видит статус, но не может запускать деньги или запись.",
    loadReadiness: "Проверить готовность",
    loadGate: "Открыть контроль",
    loading: "Проверяю контроль рабочей среды...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    locked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    runtimeGate: "Runtime gate 035T",
    exactOwnerApproval: "Точное подтверждение владельца обязательно",
    megaHandoff: "Final handoff 035Q-035S",
    intakePackage: "Intake package 035P",
    requestGate: "Заявки агентов",
    safeDisabled: "Остаются safe-disabled",
    adminGetOnly: "Только чтение",
    noMutation: "Без действий и записи",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    readiness: "Готовность контроля рабочей среды",
    fullTaxi: "Полная готовность такси",
    next: "Следующий шаг: отдельное подтверждение владельца только на выбранный исполнительный слой. Автозапуска денег нет.",
  },
  en: {
    title: "Real execution runtime gate",
    subtitle: "035T shows the final locked gate before real wallet/payment/payout/provider/DB execution. Admin can view status but cannot start money or writes.",
    loadReadiness: "Check readiness",
    loadGate: "Open gate",
    loading: "Checking runtime gate...",
    backendRequired: "Set backend base URL in Admin UI settings.",
    ready: "Ready",
    locked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    runtimeGate: "035T runtime gate",
    exactOwnerApproval: "Exact owner approval required",
    megaHandoff: "035Q-035S final handoff",
    intakePackage: "035P intake package",
    requestGate: "Agent requests",
    safeDisabled: "Remain safe-disabled",
    adminGetOnly: "Read only",
    noMutation: "No actions or writes",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    readiness: "Runtime gate readiness",
    fullTaxi: "Full Taxi readiness",
    next: "Next step: separate Owner approval only for the selected execution layer. No auto-start of money.",
  },
  uz: {
    title: "Real execution runtime gate",
    subtitle: "035T real hamyon, to‘lov, to‘lov chiqarish, provayder va maʼlumotlar bazasi ijrosidan oldingi oxirgi bloklangan nazorat holatini ko‘rsatadi. Admin faqat ko‘radi, pul yoki yozuvni ishga tushirmaydi.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadGate: "Gate ochish",
    loading: "Runtime gate tekshirilmoqda...",
    backendRequired: "Admin UI sozlamalarida backend base URL kiriting.",
    ready: "Tayyor",
    locked: "Yopiq",
    failed: "O‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    runtimeGate: "035T runtime gate",
    exactOwnerApproval: "Aniq egasi tasdig‘i shart",
    megaHandoff: "035Q-035S final handoff",
    intakePackage: "035P intake package",
    requestGate: "Agent so‘rovlari",
    safeDisabled: "Safe-disabled holatda",
    adminGetOnly: "Faqat o‘qish",
    noMutation: "Harakatsiz va yozuvsiz",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    readiness: "Runtime gate tayyorligi",
    fullTaxi: "Taksi to‘liq tayyorligi",
    next: "Keyingi qadam: faqat tanlangan execution qatlami uchun alohida Owner approval. Pul avtomatik ishga tushmaydi.",
  },
  zh: {
    title: "真实执行运行控制",
    subtitle: "035T 显示真实钱包、支付、提现、服务商和数据库执行前的最终锁定控制。管理员只能查看状态，不能启动资金或写入。",
    loadReadiness: "检查就绪",
    loadGate: "打开控制",
    loading: "正在检查运行控制...",
    backendRequired: "请在管理界面设置服务器基础地址。",
    ready: "就绪",
    locked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    runtimeGate: "035T runtime gate",
    exactOwnerApproval: "需要所有者精确确认",
    megaHandoff: "035Q-035S final handoff",
    intakePackage: "035P intake package",
    requestGate: "代理请求",
    safeDisabled: "保持安全禁用",
    adminGetOnly: "只读",
    noMutation: "无操作无写入",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    readiness: "运行控制就绪",
    fullTaxi: "出租车总就绪",
    next: "下一步：只对选定执行层进行单独所有者审批。不自动启动资金。",
  },
};


function adminHeaders035U(config: AdminApiConfig): HeadersInit {
  const maybeToken = (config as unknown as {
    adminToken?: string;
    token?: string;
    ownerToken?: string;
    authToken?: string;
  });
  const token = maybeToken.adminToken || maybeToken.token || maybeToken.ownerToken || maybeToken.authToken || "";
  return token
    ? { "Accept": "application/json", "x-sabi-admin-token": token, "x-admin-token": token }
    : { "Accept": "application/json" };
}

function baseUrl035U(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function pretty035U(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value).slice(0, 180);
  } catch {
    return "—";
  }
}

export function TaxiAdminWalletPaymentPayoutExecutionRuntimeGate035UPanel({ language, config, setNotice }: Props035U) {
  const copy = COPY035U[language] || COPY035U.ru;
  const base = baseUrl035U(config);
  const [status, setStatus] = useState<LoadState035U>("idle");
  const [readiness, setReadiness] = useState<SafeResult035U>(null);
  const [gate, setGate] = useState<SafeResult035U>(null);
  const [lastRoute, setLastRoute] = useState<string>(PUBLIC_RUNTIME_GATE_035T_READINESS_ROUTE);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const cards = useMemo(() => [
    { label: copy.runtimeGate, value: readiness?.readiness || readiness?.gate || readiness?.status || copy.locked, route: PUBLIC_RUNTIME_GATE_035T_READINESS_ROUTE },
    { label: copy.exactOwnerApproval, value: gate?.exactApprovalsStillRequired || gate?.approvals || copy.locked, route: PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE },
    { label: copy.megaHandoff, value: "035Q-035S", route: PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE },
    { label: copy.intakePackage, value: "035P", route: PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE },
    { label: copy.requestGate, value: copy.safeDisabled, route: `${MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE} / ${MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}` },
  ], [copy, gate, readiness]);

  async function load035U(route: string, kind: "readiness" | "gate") {
    if (!base) {
      setStatus("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setStatus("loading");
    setLastRoute(route);
    try {
      const res = await fetch(`${base}${route}`, {
        method: "GET",
        headers: adminHeaders035U(config),
      });
      const data = await res.json().catch(() => ({ ok: res.ok, status: res.status }));
      if (kind === "readiness") setReadiness({ ...data, status: res.status });
      if (kind === "gate") setGate({ ...data, status: res.status });
      setStatus(res.ok ? "ready" : res.status === 401 || res.status === 403 ? "blocked" : "failed");
      setUpdatedAt(new Date().toISOString());
      setNotice(res.ok ? copy.ready : `${copy.status}: ${res.status}`);
    } catch (error) {
      setStatus("failed");
      setNotice(`${copy.failed}: ${String(error).slice(0, 120)}`);
    }
  }

  return (
    <section
      className="taxiAdminWalletPaymentPayoutExecutionRuntimeGate035U"
      data-taxi-admin-ui-035u-owner-approval-execution-runtime-gate-admin-visibility-runtime-smoke-locked={TAXI_ADMIN_UI_035U_OWNER_APPROVAL_EXECUTION_RUNTIME_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED}
      data-taxi-admin-ui-035u-policy={ADMIN_UI_035U_POLICY}
      data-admin-runtime-gate-035t-readiness={ADMIN_RUNTIME_GATE_035T_READINESS_ROUTE}
      data-admin-runtime-gate-035t-gate={ADMIN_RUNTIME_GATE_035T_GATE_ROUTE}
      data-public-runtime-gate-035t-readiness={PUBLIC_RUNTIME_GATE_035T_READINESS_ROUTE}
      data-public-runtime-gate-035t-gate={PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE}
      data-public-mega-handoff-035q-035s={PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE}
      data-public-owner-intake-035p={PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE}
      data-request-gate-034c={MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}
      data-request-gate-034d={MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}
    >
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035U_OWNER_APPROVAL_EXECUTION_RUNTIME_GATE_ADMIN_VISIBILITY_RUNTIME_SMOKE_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>

      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.adminGetOnly}</span><strong>{copy.locked}</strong><small>{copy.noMutation}</small></div>
        <div><span>Wallet/payment/payout/provider/DB</span><strong>0%</strong><small>{copy.exactOwnerApproval}</small></div>
        <div><span>{copy.adminProtected}</span><strong>403</strong><small>{ADMIN_RUNTIME_GATE_035T_GATE_ROUTE}</small></div>
        <div><span>{copy.fullTaxi}</span><strong>{pretty035U(readiness?.readiness || "84%")}</strong><small>{copy.next}</small></div>
      </div>

      <div className="ms007b-actions">
        <button type="button" onClick={() => void load035U(ADMIN_RUNTIME_GATE_035T_READINESS_ROUTE, "readiness")} disabled={status === "loading"}>{status === "loading" ? copy.loading : copy.loadReadiness}</button>
        <button type="button" onClick={() => void load035U(ADMIN_RUNTIME_GATE_035T_GATE_ROUTE, "gate")} disabled={status === "loading"}>{copy.loadGate}</button>
      </div>

      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {cards.map((card) => (
          <div key={card.route}>
            <span>{card.label}</span>
            <strong>{pretty035U(card.value)}</strong>
            <small>{card.route}</small>
          </div>
        ))}
      </div>

      <div className="taxiRuntime028HStatus" data-taxi-admin-ui-035u-status={status}>
        <div><span>{copy.status}</span><strong>{status}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.refreshed}</span><strong>{updatedAt || "—"}</strong><small>{copy.adminProtected}</small></div>
        <div><span>034C/034D</span><strong>POST 409</strong><small>{copy.safeDisabled}</small></div>
      </div>
    </section>
  );
}
