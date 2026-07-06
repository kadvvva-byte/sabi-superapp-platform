import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035Q_035S_OWNER_APPROVAL_MEGA_HANDOFF_LOCKED = "TAXI-ADMIN-UI-035Q-035S-OWNER-APPROVAL-MEGA-HANDOFF-LOCKED";

const ADMIN_MEGA_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/readiness";
const ADMIN_MEGA_DRY_RUN_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/dry-run-validator";
const ADMIN_MEGA_HANDOFF_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff";
const PUBLIC_MEGA_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/readiness";
const PUBLIC_MEGA_DRY_RUN_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/dry-run-validator";
const PUBLIC_MEGA_HANDOFF_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff";
const PUBLIC_OWNER_INTAKE_035P_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package";
const PUBLIC_EXECUTION_SPLIT_035N_ROUTE = "/api/taxi/wallet-payment-payout/execution-layer-split/035n/approvals";
const PUBLIC_EXECUTION_PREFLIGHT_035L_ROUTE = "/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035Q_035S_POLICY = "admin_ui_owner_approval_mega_handoff_get_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035Q035S = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type LoadState035Q035S = "idle" | "loading" | "ready" | "blocked" | "failed";
type SafeResult035Q035S = ({ ok?: boolean; status?: number | string; message?: string; readiness?: Record<string, unknown>; dryRunValidator?: Record<string, unknown>; finalHandoff?: Record<string, unknown>; [key: string]: unknown } | null);

type Copy035Q035S = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadDryRun: string;
  loadHandoff: string;
  loading: string;
  backendRequired: string;
  ready: string;
  blocked: string;
  failed: string;
  adminProtected: string;
  publicRoutes: string;
  dryRun: string;
  finalHandoff: string;
  intake: string;
  split: string;
  preflight: string;
  requestGate: string;
  safeDisabled: string;
  noExecution: string;
  exactOwnerApproval: string;
  approvalChain: string;
  fullTaxi: string;
  route: string;
  status: string;
  refreshed: string;
  next: string;
};

const COPY035Q035S: Record<AdminLanguage, Copy035Q035S> = {
  ru: {
    title: "Owner approval: mega handoff 035Q-035S",
    subtitle: "Единый быстрый экран: видимость 035Q, проверка без запуска 035R и финальная заблокированная передача 035S. Всё только чтение, реальные деньги, провайдер и база данных не запускаются.",
    loadReadiness: "Проверить готовность",
    loadDryRun: "Dry-run validator",
    loadHandoff: "Final handoff",
    loading: "Проверяю mega handoff...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    blocked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    publicRoutes: "Public safe-read routes",
    dryRun: "Dry-run без исполнения",
    finalHandoff: "Final locked handoff",
    intake: "Intake 035P",
    split: "Split 035N",
    preflight: "Preflight 035L",
    requestGate: "Заявки агентов",
    safeDisabled: "POST safe-disabled",
    noExecution: "Без исполнения",
    exactOwnerApproval: "Нужно отдельное подтверждение владельца",
    approvalChain: "Approval chain",
    fullTaxi: "Полная готовность такси",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    next: "Следующий шаг: отдельное подтверждение владельца для каждого исполнительного слоя или финальное административное закрытие.",
  },
  en: {
    title: "Owner approval: 035Q-035S mega handoff",
    subtitle: "One accelerated screen: 035Q visibility, 035R dry-run validator, and 035S final locked handoff. Read only; money and provider/DB execution remain blocked.",
    loadReadiness: "Check readiness",
    loadDryRun: "Dry-run validator",
    loadHandoff: "Final handoff",
    loading: "Checking mega handoff...",
    backendRequired: "Set backend base URL in Admin UI settings.",
    ready: "Ready",
    blocked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    publicRoutes: "Public safe-read routes",
    dryRun: "Dry-run without execution",
    finalHandoff: "Final locked handoff",
    intake: "035P intake",
    split: "035N split",
    preflight: "035L preflight",
    requestGate: "Agent requests",
    safeDisabled: "POST safe-disabled",
    noExecution: "No execution",
    exactOwnerApproval: "Separate owner approval required",
    approvalChain: "Approval chain",
    fullTaxi: "Full Taxi readiness",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    next: "Next step: separate owner approval for each execution layer or final Admin closure.",
  },
  uz: {
    title: "Owner approval: 035Q-035S mega handoff",
    subtitle: "Bitta tezlashtirilgan ekran: 035Q ko‘rinishi, 035R ishga tushirmasdan tekshirish va 035S yakuniy bloklangan topshirish. Faqat o‘qish; pul, provayder va maʼlumotlar bazasi ijrosi bloklangan.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadDryRun: "Dry-run validator",
    loadHandoff: "Final handoff",
    loading: "Mega handoff tekshirilmoqda...",
    backendRequired: "Admin UI sozlamalarida backend base URL kiriting.",
    ready: "Tayyor",
    blocked: "Yopiq",
    failed: "O‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    publicRoutes: "Public safe-read marshrutlar",
    dryRun: "Execution yo‘q dry-run",
    finalHandoff: "Final locked handoff",
    intake: "035P intake",
    split: "035N split",
    preflight: "035L preflight",
    requestGate: "Agent so‘rovlari",
    safeDisabled: "POST safe-disabled",
    noExecution: "Execution yo‘q",
    exactOwnerApproval: "Alohida owner approval shart",
    approvalChain: "Approval chain",
    fullTaxi: "Taksi to‘liq tayyorligi",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    next: "Keyingi qadam: har bir execution qatlami uchun alohida owner approval yoki final Admin yopish.",
  },
  zh: {
    title: "Owner approval：035Q-035S mega handoff",
    subtitle: "一个加速页面：035Q 可见性、035R 不执行验证器、035S 最终锁定交接。只读；资金、服务商和数据库执行保持锁定。",
    loadReadiness: "检查就绪",
    loadDryRun: "Dry-run validator",
    loadHandoff: "Final handoff",
    loading: "正在检查 mega handoff...",
    backendRequired: "请在管理界面设置服务器基础地址。",
    ready: "就绪",
    blocked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    publicRoutes: "Public safe-read 路由",
    dryRun: "无执行 dry-run",
    finalHandoff: "Final locked handoff",
    intake: "035P intake",
    split: "035N split",
    preflight: "035L preflight",
    requestGate: "代理请求",
    safeDisabled: "POST safe-disabled",
    noExecution: "无执行",
    exactOwnerApproval: "需要单独所有者审批",
    approvalChain: "Approval chain",
    fullTaxi: "出租车总就绪",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    next: "下一步：每个执行层单独所有者审批，或管理端最终关闭。",
  },
};

function baseUrl035Q035S(config: AdminApiConfig): string { return String(config.baseUrl || "").replace(/\/$/, ""); }

function headers035Q035S(config: AdminApiConfig): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.token) { headers["x-sabi-admin-token"] = config.token; headers["x-admin-token"] = config.token; }
  return headers;
}

async function read035Q035S(config: AdminApiConfig, route: string): Promise<SafeResult035Q035S> {
  const base = baseUrl035Q035S(config);
  if (!base) throw new Error("backend_base_url_required");
  const response = await fetch(`${base}${route}`, { method: "GET", headers: headers035Q035S(config) });
  const text = await response.text();
  let body: SafeResult035Q035S = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }
  return { ...(body || {}), ok: response.ok, status: response.status };
}

function statusText035Q035S(copy: Copy035Q035S, value: SafeResult035Q035S): string {
  if (!value) return copy.blocked;
  if (value.ok === true) return copy.ready;
  if (value.status === 401 || value.status === 403) return copy.adminProtected;
  return copy.blocked;
}

function readinessValue035Q035S(value: SafeResult035Q035S, key: string, fallback: string): string {
  const readiness = value?.readiness && typeof value.readiness === "object" ? value.readiness : null;
  const handoff = value?.finalHandoff && typeof value.finalHandoff === "object" ? value.finalHandoff : null;
  const nested = handoff?.readinessAfterMegaHandoff && typeof handoff.readinessAfterMegaHandoff === "object" ? handoff.readinessAfterMegaHandoff as Record<string, unknown> : null;
  const source = readiness || nested || (value && typeof value === "object" ? value as Record<string, unknown> : null);
  const raw = source ? (source as Record<string, unknown>)[key] : undefined;
  if (typeof raw === "number") return `${raw}%`;
  if (typeof raw === "string") return raw;
  return fallback;
}

export function TaxiAdminWalletPaymentPayoutOwnerApprovalMega035Q035SPanel(props: Props035Q035S) {
  const { language, config, setNotice } = props;
  const copy = COPY035Q035S[language] || COPY035Q035S.ru;
  const [state, setState] = useState<LoadState035Q035S>("idle");
  const [readiness, setReadiness] = useState<SafeResult035Q035S>(null);
  const [dryRun, setDryRun] = useState<SafeResult035Q035S>(null);
  const [handoff, setHandoff] = useState<SafeResult035Q035S>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const summary = useMemo(() => [
    { label: copy.dryRun, value: copy.noExecution },
    { label: copy.finalHandoff, value: copy.exactOwnerApproval },
    { label: copy.intake, value: PUBLIC_OWNER_INTAKE_035P_ROUTE },
    { label: copy.split, value: PUBLIC_EXECUTION_SPLIT_035N_ROUTE },
    { label: copy.preflight, value: PUBLIC_EXECUTION_PREFLIGHT_035L_ROUTE },
    { label: copy.requestGate, value: copy.safeDisabled },
  ], [copy]);

  async function load(route: string, target: "readiness" | "dryRun" | "handoff") {
    setState("loading");
    try {
      const result = await read035Q035S(config, route);
      if (target === "readiness") setReadiness(result);
      if (target === "dryRun") setDryRun(result);
      if (target === "handoff") setHandoff(result);
      setUpdatedAt(new Date().toLocaleString());
      setState(result?.ok ? "ready" : "blocked");
      setNotice(`${copy.title}: ${statusText035Q035S(copy, result)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState(message === "backend_base_url_required" ? "blocked" : "failed");
      setNotice(message === "backend_base_url_required" ? copy.backendRequired : `${copy.failed}: ${message}`);
    }
  }

  const status = state === "loading" ? copy.loading : state === "failed" ? copy.failed : handoff ? statusText035Q035S(copy, handoff) : dryRun ? statusText035Q035S(copy, dryRun) : readiness ? statusText035Q035S(copy, readiness) : copy.blocked;
  const approvalChain = readinessValue035Q035S(readiness || handoff || dryRun, "taxiWalletPaymentPayoutApprovalChain", "94%");
  const fullTaxi = readinessValue035Q035S(readiness || handoff || dryRun, "taxiFullProductionReadiness", "82%");

  return (
    <section className="taxiAdminTechnicalSafeReadGroup035EFix2 taxiAdminWalletPaymentPayoutOwnerApprovalMega035Q035S" data-taxi-admin-035q-035s-mega-handoff={TAXI_ADMIN_UI_035Q_035S_OWNER_APPROVAL_MEGA_HANDOFF_LOCKED} data-taxi-admin-035q-035s-policy={ADMIN_UI_035Q_035S_POLICY}>
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035Q_035S_OWNER_APPROVAL_MEGA_HANDOFF_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {summary.map((item) => (<div key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><small>{copy.status}: {status}</small></div>))}
      </div>
      <div className="taxiAdminTechnicalSafeReadActions035EFix2">
        <button type="button" onClick={() => load(ADMIN_MEGA_READINESS_ROUTE, "readiness")}>{copy.loadReadiness}</button>
        <button type="button" onClick={() => load(ADMIN_MEGA_DRY_RUN_ROUTE, "dryRun")}>{copy.loadDryRun}</button>
        <button type="button" onClick={() => load(ADMIN_MEGA_HANDOFF_ROUTE, "handoff")}>{copy.loadHandoff}</button>
      </div>
      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.adminProtected}</span><strong>{ADMIN_MEGA_HANDOFF_ROUTE}</strong><small>{copy.route}: {ADMIN_MEGA_READINESS_ROUTE}</small></div>
        <div><span>{copy.publicRoutes}</span><strong>{PUBLIC_MEGA_HANDOFF_ROUTE}</strong><small>{PUBLIC_MEGA_DRY_RUN_ROUTE}</small></div>
        <div><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></div>
        <div><span>{copy.requestGate}</span><strong>{MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}</strong><small>{copy.safeDisabled}</small></div>
        <div><span>{copy.approvalChain}</span><strong>{approvalChain}</strong><small>{copy.fullTaxi}: {fullTaxi}</small></div>
        <div><span>{copy.noExecution}</span><strong>{copy.exactOwnerApproval}</strong><small>{copy.status}: {status}</small></div>
      </div>
      <div className="taxiAdminTechnicalSafeReadFoot035EFix2"><span>{copy.refreshed}: {updatedAt || "—"}</span><p>{copy.next}</p></div>
    </section>
  );
}
