import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_ADMIN_UI_035V_OWNER_APPROVAL_FINAL_LOCK_SELECTION_LOCKED = "TAXI-ADMIN-UI-035V-OWNER-APPROVAL-FINAL-LOCK-SELECTION-LOCKED";

const ADMIN_035V_READINESS_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness";
const ADMIN_035V_SELECTION_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection";
const ADMIN_035V_SUMMARY_ROUTE = "/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary";
const PUBLIC_035V_READINESS_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness";
const PUBLIC_035V_SELECTION_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection";
const PUBLIC_035V_SUMMARY_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary";
const PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate";
const PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE = "/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff";
const PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE = "/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package";
const MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE = "/api/taxi/mobile/agent/contact/034c/request";
const MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE = "/api/taxi/mobile/agent/directory/034d/contact-request";
const ADMIN_UI_035V_POLICY = "admin_ui_035v_final_lock_selection_reads_only_no_post_no_write_no_db_no_wallet_no_payment_no_payout_no_provider_no_fake_success";

type Props035V = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type LoadState035V = "idle" | "loading" | "ready" | "blocked" | "failed";

type SafeResult035V = {
  ok?: boolean;
  status?: number | string;
  readiness?: Record<string, unknown>;
  selection?: Record<string, unknown>;
  summary?: Record<string, unknown>;
  selectionOptions?: Array<Record<string, unknown>>;
  [key: string]: unknown;
} | null;

type Copy035V = {
  title: string;
  subtitle: string;
  loadReadiness: string;
  loadSelection: string;
  loadSummary: string;
  loading: string;
  backendRequired: string;
  ready: string;
  locked: string;
  failed: string;
  adminProtected: string;
  finalLock: string;
  selectedLayer: string;
  runtimeGate: string;
  handoff: string;
  intake: string;
  requestGate: string;
  safeDisabled: string;
  noMutation: string;
  route: string;
  status: string;
  refreshed: string;
  fullTaxi: string;
  next: string;
};

const COPY035V: Record<AdminLanguage, Copy035V> = {
  ru: {
    title: "Финальная блокировка выбора подтверждения владельца",
    subtitle: "035V показывает финальный список исполнительных слоёв перед выбором подтверждения владельца. Никакой слой не выбран и не запускается автоматически.",
    loadReadiness: "Проверить готовность",
    loadSelection: "Открыть выбор",
    loadSummary: "Открыть summary",
    loading: "Читаю final lock...",
    backendRequired: "Укажите базовый адрес сервера в настройках интерфейса администратора.",
    ready: "Готово",
    locked: "Закрыто",
    failed: "Ошибка чтения",
    adminProtected: "Админ-маршруты защищены",
    finalLock: "Final lock 035V",
    selectedLayer: "Выбранный слой",
    runtimeGate: "Runtime gate 035T",
    handoff: "Final handoff 035Q-035S",
    intake: "Intake package 035P",
    requestGate: "Заявки агентов",
    safeDisabled: "Остаются safe-disabled",
    noMutation: "Без действий и записи",
    route: "Маршрут",
    status: "Статус",
    refreshed: "Обновлено",
    fullTaxi: "Полная готовность такси",
    next: "Следующий шаг: отдельная заблокированная предварительная проверка только для выбранного слоя после точного подтверждения владельца.",
  },
  en: {
    title: "Owner approval final lock selection",
    subtitle: "035V shows the final execution-layer list before Owner approval selection. No layer is selected or started automatically.",
    loadReadiness: "Check readiness",
    loadSelection: "Open selection",
    loadSummary: "Open summary",
    loading: "Reading final lock...",
    backendRequired: "Set backend base URL in Admin UI settings.",
    ready: "Ready",
    locked: "Locked",
    failed: "Read failed",
    adminProtected: "Admin routes protected",
    finalLock: "035V final lock",
    selectedLayer: "Selected layer",
    runtimeGate: "035T runtime gate",
    handoff: "035Q-035S final handoff",
    intake: "035P intake package",
    requestGate: "Agent requests",
    safeDisabled: "Remain safe-disabled",
    noMutation: "No actions or writes",
    route: "Route",
    status: "Status",
    refreshed: "Refreshed",
    fullTaxi: "Full Taxi readiness",
    next: "Next step: separate locked preflight only for the selected layer after exact Owner approval.",
  },
  uz: {
    title: "Owner approval final lock tanlovi",
    subtitle: "035V egasi tasdig‘i tanlovidan oldingi yakuniy ijro qatlamlari ro‘yxatini ko‘rsatadi. Hech qanday qatlam tanlanmaydi yoki avtomatik ishga tushmaydi.",
    loadReadiness: "Tayyorlikni tekshirish",
    loadSelection: "Tanlovni ochish",
    loadSummary: "Summary ochish",
    loading: "Final lock o‘qilmoqda...",
    backendRequired: "Admin UI sozlamalarida backend base URL kiriting.",
    ready: "Tayyor",
    locked: "Yopiq",
    failed: "O‘qish xatosi",
    adminProtected: "Admin marshrutlari himoyalangan",
    finalLock: "035V final lock",
    selectedLayer: "Tanlangan qatlam",
    runtimeGate: "035T runtime gate",
    handoff: "035Q-035S final handoff",
    intake: "035P intake package",
    requestGate: "Agent so‘rovlari",
    safeDisabled: "Safe-disabled holatda",
    noMutation: "Harakatsiz va yozuvsiz",
    route: "Marshrut",
    status: "Holat",
    refreshed: "Yangilandi",
    fullTaxi: "Taksi to‘liq tayyorligi",
    next: "Keyingi qadam: aniq Owner approvaldan keyin faqat tanlangan qatlam uchun alohida locked preflight.",
  },
  zh: {
    title: "所有者审批最终锁定选择",
    subtitle: "035V 显示所有者审批选择前的最终执行层列表。没有层会被选择或自动启动。",
    loadReadiness: "检查就绪",
    loadSelection: "打开选择",
    loadSummary: "打开摘要",
    loading: "正在读取 final lock...",
    backendRequired: "请在管理界面设置服务器基础地址。",
    ready: "就绪",
    locked: "已锁定",
    failed: "读取失败",
    adminProtected: "管理员路由已保护",
    finalLock: "035V final lock",
    selectedLayer: "已选择层",
    runtimeGate: "035T runtime gate",
    handoff: "035Q-035S final handoff",
    intake: "035P intake package",
    requestGate: "代理请求",
    safeDisabled: "保持安全禁用",
    noMutation: "无操作无写入",
    route: "路由",
    status: "状态",
    refreshed: "已刷新",
    fullTaxi: "出租车总就绪",
    next: "下一步：精确所有者审批后，仅对选定层进行单独锁定预检。",
  },
};

function adminHeaders035V(config: AdminApiConfig): HeadersInit {
  const maybeToken = (config as unknown as { adminToken?: string; token?: string; ownerToken?: string; authToken?: string });
  const token = maybeToken.adminToken || maybeToken.token || maybeToken.ownerToken || maybeToken.authToken || "";
  return token ? { "Accept": "application/json", "x-sabi-admin-token": token, "x-admin-token": token } : { "Accept": "application/json" };
}

function baseUrl035V(config: AdminApiConfig): string {
  return String(config.baseUrl || "").replace(/\/$/, "");
}

function pretty035V(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  try { return JSON.stringify(value).slice(0, 180); } catch { return "—"; }
}

export function TaxiAdminWalletPaymentPayoutFinalLockSelection035VPanel({ language, config, setNotice }: Props035V) {
  const copy = COPY035V[language] || COPY035V.ru;
  const base = baseUrl035V(config);
  const [status, setStatus] = useState<LoadState035V>("idle");
  const [readiness, setReadiness] = useState<SafeResult035V>(null);
  const [selection, setSelection] = useState<SafeResult035V>(null);
  const [summary, setSummary] = useState<SafeResult035V>(null);
  const [lastRoute, setLastRoute] = useState<string>(ADMIN_035V_READINESS_ROUTE);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const cards = useMemo(() => [
    { label: copy.finalLock, value: readiness?.readiness || selection?.selection || copy.locked, route: PUBLIC_035V_READINESS_ROUTE },
    { label: copy.selectedLayer, value: selection?.selection || "null / not_selected", route: PUBLIC_035V_SELECTION_ROUTE },
    { label: copy.runtimeGate, value: "035T", route: PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE },
    { label: copy.handoff, value: "035Q-035S", route: PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE },
    { label: copy.intake, value: "035P", route: PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE },
    { label: copy.requestGate, value: copy.safeDisabled, route: `${MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE} / ${MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}` },
  ], [copy, readiness, selection]);

  async function load035V(route: string, kind: "readiness" | "selection" | "summary") {
    if (!base) {
      setStatus("blocked");
      setNotice(copy.backendRequired);
      return;
    }
    setStatus("loading");
    setLastRoute(route);
    try {
      const res = await fetch(`${base}${route}`, { method: "GET", headers: adminHeaders035V(config) });
      const data = await res.json().catch(() => ({ ok: res.ok, status: res.status }));
      if (kind === "readiness") setReadiness({ ...data, status: res.status });
      if (kind === "selection") setSelection({ ...data, status: res.status });
      if (kind === "summary") setSummary({ ...data, status: res.status });
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
      className="taxiAdminWalletPaymentPayoutFinalLockSelection035V"
      data-taxi-admin-ui-035v-owner-approval-final-lock-selection-locked={TAXI_ADMIN_UI_035V_OWNER_APPROVAL_FINAL_LOCK_SELECTION_LOCKED}
      data-taxi-admin-ui-035v-policy={ADMIN_UI_035V_POLICY}
      data-admin-035v-readiness={ADMIN_035V_READINESS_ROUTE}
      data-admin-035v-selection={ADMIN_035V_SELECTION_ROUTE}
      data-admin-035v-summary={ADMIN_035V_SUMMARY_ROUTE}
      data-public-035v-readiness={PUBLIC_035V_READINESS_ROUTE}
      data-public-035v-selection={PUBLIC_035V_SELECTION_ROUTE}
      data-public-035v-summary={PUBLIC_035V_SUMMARY_ROUTE}
      data-runtime-gate-035t={PUBLIC_RUNTIME_GATE_035T_GATE_ROUTE}
      data-mega-handoff-035q-035s={PUBLIC_MEGA_HANDOFF_035Q_035S_FINAL_ROUTE}
      data-owner-intake-035p={PUBLIC_OWNER_INTAKE_035P_PACKAGE_ROUTE}
      data-request-gate-034c={MOBILE_AGENT_CONTACT_034C_REQUEST_ROUTE}
      data-request-gate-034d={MOBILE_AGENT_DIRECTORY_034D_CONTACT_REQUEST_ROUTE}
    >
      <div className="taxiAdminTechnicalSafeReadHead035EFix2">
        <span>{TAXI_ADMIN_UI_035V_OWNER_APPROVAL_FINAL_LOCK_SELECTION_LOCKED}</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>

      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        <div><span>{copy.finalLock}</span><strong>{copy.locked}</strong><small>{copy.noMutation}</small></div>
        <div><span>Wallet/payment/payout/provider/DB</span><strong>0%</strong><small>Exact Owner approval required</small></div>
        <div><span>{copy.adminProtected}</span><strong>403</strong><small>{ADMIN_035V_SUMMARY_ROUTE}</small></div>
        <div><span>{copy.fullTaxi}</span><strong>{pretty035V(readiness?.readiness || "88%")}</strong><small>{copy.next}</small></div>
      </div>

      <div className="ms007b-actions">
        <button type="button" onClick={() => void load035V(ADMIN_035V_READINESS_ROUTE, "readiness")} disabled={status === "loading"}>{status === "loading" ? copy.loading : copy.loadReadiness}</button>
        <button type="button" onClick={() => void load035V(ADMIN_035V_SELECTION_ROUTE, "selection")} disabled={status === "loading"}>{copy.loadSelection}</button>
        <button type="button" onClick={() => void load035V(ADMIN_035V_SUMMARY_ROUTE, "summary")} disabled={status === "loading"}>{copy.loadSummary}</button>
      </div>

      <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
        {cards.map((card) => (
          <div key={card.route}>
            <span>{card.label}</span>
            <strong>{pretty035V(card.value)}</strong>
            <small>{card.route}</small>
          </div>
        ))}
      </div>

      <div className="taxiRuntime028HStatus" data-taxi-admin-ui-035v-status={status}>
        <div><span>{copy.status}</span><strong>{status}</strong><small>{lastRoute}</small></div>
        <div><span>{copy.refreshed}</span><strong>{updatedAt || "—"}</strong><small>{copy.adminProtected}</small></div>
        <div><span>035V summary</span><strong>{pretty035V(summary?.summary || summary?.selection || copy.locked)}</strong><small>{PUBLIC_035V_SUMMARY_ROUTE}</small></div>
      </div>
    </section>
  );
}
