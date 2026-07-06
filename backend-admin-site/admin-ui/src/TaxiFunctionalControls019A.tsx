import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props019A = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Action019A = {
  id: string;
  label: string;
  area: string;
  method: "GET" | "POST" | "PATCH";
  route: string;
  body?: (state: State019A) => Record<string, unknown>;
  approvalHeader?: string;
  approvalValue?: string;
  moneyBlocked?: boolean;
};
type State019A = {
  tripId: string;
  supportCaseId: string;
  applicationId: string;
  tariffCountryCode: string;
  riderRequestId: string;
  driverProfileId: string;
  vehicleId: string;
  idempotencyKey: string;
  note: string;
};
type Last019A = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;

type Copy019A = {
  title: string;
  subtitle: string;
  warning: string;
  moneyRule: string;
  balanceGateRule: string;
  accessRule: string;
  tripId: string;
  supportCaseId: string;
  applicationId: string;
  country: string;
  riderRequest: string;
  driver: string;
  vehicle: string;
  note: string;
  idempotency: string;
  refresh: string;
  run: string;
  blocked: string;
  sent: string;
  last: string;
  missing: string;
};

const MARKER019A = "TAXI-ADMIN-FUNCTIONAL-CONTROLS-019A-NO-READONLY-EXCEPT-ACCESS-NO-MANUAL-MONEY";

const COPY019A: Record<AdminLanguage, Copy019A> = {
  ru: {
    title: "Taksi functional controls standard",
    subtitle: "Исправление курса: кроме экрана Доступ, Taksi Admin screens должны быть рабочими: кнопки вызывают server nazoratlar, server возвращает реальный ответ, interfeys не рисует soxta muvaffaqiyat.",
    warning: "Блокировка водителя по жалобе идёт только после проверки доказательств, объяснения, апелляции и точного утверждения. Тяжёлый блок — только после контроля руководителя.",
    moneyRule: "Деньги никто не трогает: нет ручного пополнения, перевода, выплата, кошелёк credit/debit. Водитель пополняет баланс сам со своей карты в driver-side flow.",
    balanceGateRule: "Заказ даётся водителю только если при старте есть положительный баланс. Если денег нет — получение заказов автоматически блокируется. После self top-up с карты водителя разблокировка происходит автоматически по реальному балансу, без ручного админа.",
    accessRule: "Экран Доступ остаётся read-only. Остальные блоки получают управляющие кнопки.",
    tripId: "Trip ID", supportCaseId: "Support case ID", applicationId: "Application ID", country: "Country", riderRequest: "Rider request ID", driver: "Driver profile ID", vehicle: "Vehicle ID", note: "Причина / заметка", idempotency: "Idempotency key", refresh: "Обновить данные", run: "Выполнить через server", blocked: "Не готово", sent: "Отправлено в server", last: "Последний ответ", missing: "Заполни обязательные поля",
  },
  en: {
    title: "Taksi functional controls standard",
    subtitle: "Course correction: except Access, Taksi Admin screens must be operational. Buttons call server nazoratlar, server returns real responses, interfeys never paints soxta muvaffaqiyat.",
    warning: "Driver lock by complaint runs only after evidence review, explanation/appeal and exact tasdiq. Heavy block requires supervisor nazorat.",
    moneyRule: "No one manually touches money: no top-up, transfer, payout, wallet credit/debit. The taxi driver tops up independently from their own card in the driver-side flow.",
    balanceGateRule: "Orders are offered to a driver only when the driver has a positive balance at start. No balance means automatic order-receiving block. After driver self top-up from their own card, the system auto-unblocks by real balance status, with no manual admin money action.",
    accessRule: "Access screen remains read-only. All other blocks receive control buttons.",
    tripId: "Trip ID", supportCaseId: "Support case ID", applicationId: "Application ID", country: "Country", riderRequest: "Rider request ID", driver: "Driver profile ID", vehicle: "Vehicle ID", note: "Reason / note", idempotency: "Idempotency key", refresh: "Refresh data", run: "Execute through server", blocked: "Blocked", sent: "Sent to server", last: "Last response", missing: "Fill required fields",
  },
  uz: {
    title: "Taksi functional controls standard",
    subtitle: "Yo‘nalish tuzatildi: kirish ekranidan tashqari taksi admin ekranlari ishlaydigan bo‘lishi kerak. Tugmalar server nazoratini chaqiradi, server real javob beradi, interfeys soxta muvaffaqiyat ko‘rsatmaydi.",
    warning: "Shikoyat bo‘yicha haydovchini bloklash faqat evidence review, explanation/appeal va exact tasdiq’dan keyin. Og‘ir blok supervisor nazorat talab qiladi.",
    moneyRule: "Pulga hech kim qo‘l tekkizmaydi: qo‘lda to‘ldirish, o‘tkazma, to‘lov chiqarish, hamyonni kreditlash yoki debetlash yo‘q. Taksi haydovchisi balansni o‘zi kartasidan haydovchi jarayoni orqali to‘ldiradi.",
    balanceGateRule: "Buyurtma haydovchiga faqat start paytida balans ijobiy bo‘lsa beriladi. Balans yo‘q bo‘lsa buyurtma olish avtomatik bloklanadi. Haydovchi o‘z kartasidan self top-up qilgandan keyin tizim real balans bo‘yicha avtomatik ochadi, admin qo‘lda pulga tegmaydi.",
    accessRule: "Access ekrani read-only qoladi. Qolgan bloklarda boshqaruv tugmalari bo‘ladi.",
    tripId: "Trip ID", supportCaseId: "Support case ID", applicationId: "Application ID", country: "Country", riderRequest: "Rider request ID", driver: "Driver profile ID", vehicle: "Vehicle ID", note: "Sabab / izoh", idempotency: "Idempotency key", refresh: "Yangilash", run: "Server orqali bajarish", blocked: "Bloklangan", sent: "Serverga yuborildi", last: "Oxirgi javob", missing: "Majburiy maydonlarni to‘ldiring",
  },
  zh: {
    title: "Taksi functional controls standard",
    subtitle: "方向修正：除访问页面外，出租车管理页面必须可操作。按钮调用服务器控制，服务器返回真实结果，界面不显示虚假成功。",
    warning: "按投诉封禁司机只能在证据审核、说明、申诉和精确审批后执行。重度封禁需要主管控制。",
    moneyRule: "任何人都不能手动动钱：没有手动充值、转账、提现、钱包入账或扣账。出租车司机只能在司机端流程中用自己的卡自行充值。",
    balanceGateRule: "只有司机在开始时余额为正，订单才会分配/提供给司机。无余额会自动阻止接单。司机用自己的卡 self top-up 后，系统按真实余额自动解除阻止，管理员不能手动动钱。",
    accessRule: "Access 页面保持 read-only。其他模块都要有控制按钮。",
    tripId: "Trip ID", supportCaseId: "Support case ID", applicationId: "Application ID", country: "Country", riderRequest: "Rider request ID", driver: "Driver profile ID", vehicle: "Vehicle ID", note: "原因 / 备注", idempotency: "Idempotency key", refresh: "刷新", run: "通过 server 执行", blocked: "未就绪", sent: "已发送到 server", last: "最后响应", missing: "填写必填字段",
  },
};

function base019A(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers019A(config: AdminApiConfig, extra: Record<string, string> = {}): Record<string, string> {
  return { "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "", "content-type": "application/json", ...extra };
}

function defaultState019A(): State019A {
  return {
    tripId: "",
    supportCaseId: "",
    applicationId: "",
    tariffCountryCode: "UZ",
    riderRequestId: "",
    driverProfileId: "",
    vehicleId: "",
    idempotencyKey: `taxi-admin-${Date.now()}`,
    note: "",
  };
}

function requiredMissing019A(action: Action019A, state: State019A): boolean {
  if (action.id.includes("support-create")) return !state.tripId.trim();
  if (action.id.includes("complaint") || action.id.includes("driver-lock")) return !state.supportCaseId.trim();
  if (action.id.includes("application")) return !state.applicationId.trim();
  if (action.id.includes("dispatch")) return !state.riderRequestId.trim() || !state.driverProfileId.trim() || !state.vehicleId.trim();
  return false;
}

export function TaxiFunctionalControls019APanel({ language, config, setNotice }: Props019A) {
  const copy = COPY019A[language] || COPY019A.ru;
  const [state, setState] = useState<State019A>(() => defaultState019A());
  const [busy, setBusy] = useState("");
  const [last, setLast] = useState<Last019A>(null);

  const actions = useMemo<Action019A[]>(() => [
    { id: "refresh-support-cases", area: "Жалобы", label: "Загрузить жалобы 011A", method: "GET", route: "/api/admin/taxi/orders/011a/support-appeals/cases?limit=50" },
    { id: "support-create-from-real-trip", area: "Жалобы", label: "Создать жалобу по реальной поездке", method: "POST", route: "/api/admin/taxi/orders/011a/support-appeals/create-from-trip", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-create-approval", approvalValue: "i-approve-taxi-orders-011a-create-trip-support-case-from-existing-trip", body: (s) => ({ tripId: s.tripId, category: "driver_behavior", issueSummary: s.note || "admin_created_complaint_from_real_trip", idempotencyKey: s.idempotencyKey, adminMediatedContactOnly: true, rawPiiBlocked: true, noLocalPenalty: true }) },
    { id: "complaint-request-driver-explanation", area: "Жалобы", label: "Запросить объяснение у водителя", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "waiting_for_user", workflowStage: "driver_response_requested", adminNote: s.note || "driver_explanation_required_before_penalty", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "complaint-evidence-review", area: "Жалобы", label: "Взять жалобу в проверку доказательств", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "under_review", workflowStage: "evidence_review", adminNote: s.note || "evidence_review_before_any_driver_action", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "driver-lock-1h-candidate", area: "Жалобы", label: "Кандидат: блок заказов водителю 1 час", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "escalated", workflowStage: "supervisor_review", adminNote: s.note || "verified_complaint_driver_order_lock_1h_candidate_requires_execution_gate", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "driver-lock-3h-candidate", area: "Жалобы", label: "Кандидат: блок заказов водителю 3 часа", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "escalated", workflowStage: "supervisor_review", adminNote: s.note || "verified_complaint_driver_order_lock_3h_candidate_requires_execution_gate", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "driver-hard-block-clarification-candidate", area: "Жалобы", label: "Кандидат: блок до выяснения", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "escalated", workflowStage: "supervisor_review", adminNote: s.note || "more_than_three_complaints_block_until_clarification_candidate_requires_explanation", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "complaint-reject-false", area: "Жалобы", label: "Отклонить ложную жалобу", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "rejected", workflowStage: "closed", adminNote: s.note || "false_complaint_rejected_after_review", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "complaint-resolve", area: "Жалобы", label: "Закрыть жалобу решением", method: "PATCH", route: "/api/admin/taxi/orders/011a/support-appeals/update-status", approvalHeader: "x-sabi-taxi-orders-011a-trip-support-update-approval", approvalValue: "i-approve-taxi-orders-011a-update-trip-support-case-status", body: (s) => ({ supportCaseId: s.supportCaseId, status: "resolved", workflowStage: "closed", adminNote: s.note || "complaint_resolved_after_review", idempotencyKey: s.idempotencyKey, noLocalPenalty: true }) },
    { id: "application-approve", area: "Заявки", label: "Утвердить заявку водителя", method: "POST", route: `/api/admin/taxi/applications/007z/applications/${encodeURIComponent(state.applicationId || "missing")}/approve`, approvalHeader: "x-sabi-taxi-applications-007z-execution-approval", approvalValue: "i-approve-taxi-applications-007z-db-archive-write", body: (s) => ({ applicationId: s.applicationId, decisionReason: s.note || "approved_by_admin_after_document_review", idempotencyKey: s.idempotencyKey }) },
    { id: "application-request-docs", area: "Заявки", label: "Запросить документы", method: "POST", route: `/api/admin/taxi/applications/007z/applications/${encodeURIComponent(state.applicationId || "missing")}/request-documents`, approvalHeader: "x-sabi-taxi-applications-007z-execution-approval", approvalValue: "i-approve-taxi-applications-007z-db-archive-write", body: (s) => ({ applicationId: s.applicationId, decisionReason: s.note || "documents_required", idempotencyKey: s.idempotencyKey }) },
    { id: "dispatch-balance-gate-check", area: "Заказы", label: "Проверить balance gate / auto block", method: "GET", route: "/api/admin/taxi/orders/009i/dispatch-create/readiness" },
    { id: "dispatch-candidates-positive-balance", area: "Заказы", label: "Кандидаты: только positive balance", method: "GET", route: "/api/admin/taxi/orders/009i/dispatch-create/candidates?limit=100" },
    { id: "dispatch-from-existing", area: "Заказы", label: "Создать dispatch offer: backend проверит баланс", method: "POST", route: "/api/admin/taxi/orders/009i/dispatch-create/from-existing-request", approvalHeader: "x-sabi-taxi-orders-009i-dispatch-create-approval", approvalValue: "i-approve-taxi-orders-009i-create-dispatch-offer-from-existing-request-driver-vehicle", body: (s) => ({ riderRequestId: s.riderRequestId, driverProfileId: s.driverProfileId, vehicleId: s.vehicleId, idempotencyKey: s.idempotencyKey, reason: s.note || "dispatch_existing_request_driver_vehicle_positive_balance_required", positiveDriverBalanceRequired: true, autoBlockWhenNoBalance: true, autoUnblockAfterDriverSelfTopup: true }) },
    { id: "tariff-country-save", area: "Тарифы", label: "Сохранить тариф страны", method: "POST", route: "/api/admin/taxi/tariffs/008a/country-tariffs", approvalHeader: "x-sabi-taxi-country-tariffs-008a-owner-execution-approval", approvalValue: "i-approve-taxi-country-tariffs-008a-save-country-tariffs", body: (s) => ({ countryCode: s.tariffCountryCode, reason: s.note || "country_tariff_admin_save", idempotencyKey: s.idempotencyKey }) },
    { id: "tariff-production-save", area: "Тарифы", label: "Production save тарифа", method: "POST", route: "/api/admin/taxi/tariffs/008c/production-save", approvalHeader: "x-sabi-taxi-country-tariffs-008c-owner-execution-approval", approvalValue: "i-approve-taxi-country-tariffs-008c-production-save", body: (s) => ({ countryCode: s.tariffCountryCode, reason: s.note || "production_tariff_save", idempotencyKey: s.idempotencyKey }) },
    { id: "finance-report", area: "Финансы", label: "Сформировать реальный отчёт", method: "GET", route: "/api/admin/taxi/orders/009a/report" },
    { id: "finance-archive", area: "Финансы", label: "Архивировать старые заказы", method: "POST", route: "/api/admin/taxi/orders/009a/archive/run", approvalHeader: "x-sabi-taxi-orders-009a-exact-archive-approval", approvalValue: "i-approve-taxi-orders-009a-run-archive", body: (s) => ({ reason: s.note || "admin_archive_real_orders_only", idempotencyKey: s.idempotencyKey }) },
    { id: "provider-readiness-check", area: "Provider", label: "Проверить provider/payment safe-disabled", method: "GET", route: "/api/admin/taxi/tariffs/008e/competitor-source-config/readiness", moneyBlocked: true },
  ], [state.applicationId]);

  async function runAction(action: Action019A): Promise<void> {
    if (requiredMissing019A(action, state)) {
      setLast({ action: action.id, ok: false, status: "blocked", route: action.route, message: copy.missing, at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy(action.id);
    const extra: Record<string, string> = action.approvalHeader && action.approvalValue ? { [action.approvalHeader]: action.approvalValue, "x-sabi-idempotency-key": state.idempotencyKey } : {};
    try {
      const response = await fetch(`${base019A(config)}${action.route}`, {
        method: action.method,
        headers: headers019A(config, extra),
        body: action.method === "GET" ? undefined : JSON.stringify(action.body ? action.body(state) : { idempotencyKey: state.idempotencyKey, reason: state.note }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ action: action.label, ok: response.ok, status: response.status, route: action.route, message: String(json?.code || json?.message || json?.error || (response.ok ? copy.sent : copy.blocked)), at: new Date().toISOString() });
      setNotice(response.ok ? copy.sent : copy.blocked);
    } catch (error) {
      setLast({ action: action.label, ok: false, status: "network_error", route: action.route, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  }

  const grouped = actions.reduce<Record<string, Action019A[]>>((acc, action) => {
    acc[action.area] = acc[action.area] || [];
    acc[action.area].push(action);
    return acc;
  }, {});

  return (
    <section className="taxi019aFunctionalControls" data-admin-ui-taxi-functional-controls-019a="working-controls" data-admin-ui-taxi-functional-controls-019a-marker={MARKER019A} data-admin-ui-taxi-functional-controls-019a-access-readonly-only="true" data-admin-ui-taxi-functional-controls-019a-no-admin-money-movement="true" data-admin-ui-taxi-functional-controls-019a-driver-self-topup-only="true" data-admin-ui-taxi-functional-controls-019a-order-start-positive-balance-required="true" data-admin-ui-taxi-functional-controls-019a-driver-no-balance-auto-block="true" data-admin-ui-taxi-functional-controls-019a-driver-self-topup-auto-unblock="true" data-admin-ui-taxi-functional-controls-019a-complaint-driver-lock-candidates="1h-3h-until-clarification">
      <div className="taxi019aHead">
        <div><span>{MARKER019A}</span><h2>{copy.title}</h2><p>{copy.subtitle}</p></div>
        <strong>019A · CONTROLS</strong>
      </div>
      <div className="taxi019aRules">
        <strong>{copy.warning}</strong>
        <span>{copy.moneyRule}</span>
        <span>{copy.balanceGateRule}</span>
        <span>{copy.accessRule}</span>
      </div>
      <div className="taxi019aInputs">
        <label><span>{copy.tripId}</span><input value={state.tripId} onChange={(e) => setState({ ...state, tripId: e.target.value })} /></label>
        <label><span>{copy.supportCaseId}</span><input value={state.supportCaseId} onChange={(e) => setState({ ...state, supportCaseId: e.target.value })} /></label>
        <label><span>{copy.applicationId}</span><input value={state.applicationId} onChange={(e) => setState({ ...state, applicationId: e.target.value })} /></label>
        <label><span>{copy.country}</span><input value={state.tariffCountryCode} onChange={(e) => setState({ ...state, tariffCountryCode: e.target.value.toUpperCase() })} /></label>
        <label><span>{copy.riderRequest}</span><input value={state.riderRequestId} onChange={(e) => setState({ ...state, riderRequestId: e.target.value })} /></label>
        <label><span>{copy.driver}</span><input value={state.driverProfileId} onChange={(e) => setState({ ...state, driverProfileId: e.target.value })} /></label>
        <label><span>{copy.vehicle}</span><input value={state.vehicleId} onChange={(e) => setState({ ...state, vehicleId: e.target.value })} /></label>
        <label><span>{copy.idempotency}</span><input value={state.idempotencyKey} onChange={(e) => setState({ ...state, idempotencyKey: e.target.value })} /></label>
        <label className="wide"><span>{copy.note}</span><textarea value={state.note} onChange={(e) => setState({ ...state, note: e.target.value })} /></label>
      </div>
      <div className="taxi019aActionGrid">
        {Object.entries(grouped).map(([area, areaActions]) => (
          <article key={area} data-admin-ui-taxi-functional-controls-019a-area={area}>
            <h3>{area}</h3>
            <div>{areaActions.map((action) => <button key={action.id} type="button" disabled={busy === action.id} onClick={() => void runAction(action)} data-admin-ui-taxi-functional-controls-019a-action={action.id}>{busy === action.id ? "..." : action.label}</button>)}</div>
          </article>
        ))}
      </div>
      <div className={`taxi019aLast ${last?.ok ? "ready" : "blocked"}`} data-admin-ui-taxi-functional-controls-019a-last-response="backend-real-response">
        <strong>{copy.last}</strong>
        <span>{last ? `${last.status} · ${last.message}` : copy.refresh}</span>
        <small>{last?.route || MARKER019A}</small>
      </div>
    </section>
  );
}
