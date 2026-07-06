import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027g.css";

type Props027G = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerEvent027G = { at: string; action: string; path: string; result: number | string; ok: boolean; message: string };
type QueueCase027G = {
  complaintGlobalId?: string;
  orderGlobalId?: string;
  tripGlobalId?: string;
  passengerId?: string;
  driverId?: string;
  driverBalanceTopupId?: string;
  status?: string;
  risk?: string;
  sla?: string;
  reason?: string;
  market?: string;
  city?: string;
  amount?: string;
  currency?: string;
  operator?: string;
  missing?: string[];
};

type Search027G = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
};

type RouteKey027G = keyof typeof SERVER_ROUTES_027G;

const ADMIN_UI_027G_PREMIUM_COMPLAINTS_COMMAND_CENTER = "027G_PREMIUM_COMPLAINT_PROCESSING_CENTER_SINGLE_SCREEN";

const SERVER_ROUTES_027G = {
  loadQueue: "/api/admin/taxi/complaints/center/queue",
  openCase: "/api/admin/taxi/complaints/center/open-by-global-id",
  takeCase: "/api/admin/taxi/complaints/center/take-case",
  callPassenger: "/api/admin/taxi/complaints/center/contact/passenger-call",
  callDriver: "/api/admin/taxi/complaints/center/contact/driver-call",
  chatPassenger: "/api/admin/taxi/complaints/center/contact/passenger-chat",
  chatDriver: "/api/admin/taxi/complaints/center/contact/driver-chat",
  saveContactResult: "/api/admin/taxi/complaints/center/contact/save-result",
  scheduleRepeatContact: "/api/admin/taxi/complaints/center/contact/repeat-contact",
  requestPhoto: "/api/admin/taxi/complaints/center/evidence/request-photo",
  requestAudioChat: "/api/admin/taxi/complaints/center/evidence/request-audio-chat",
  checkRoute: "/api/admin/taxi/complaints/center/evidence/check-route",
  checkCancel: "/api/admin/taxi/complaints/center/evidence/check-cancel",
  checkPayment: "/api/admin/taxi/complaints/center/evidence/check-payment",
  checkWaiting: "/api/admin/taxi/complaints/center/evidence/check-waiting",
  buildEvidencePack: "/api/admin/taxi/complaints/center/evidence/build-pack",
  previewPassengerReply: "/api/admin/taxi/complaints/center/reply/passenger-preview",
  previewDriverReply: "/api/admin/taxi/complaints/center/reply/driver-preview",
  sendPassengerReply: "/api/admin/taxi/complaints/center/reply/passenger-send",
  sendDriverReply: "/api/admin/taxi/complaints/center/reply/driver-send",
  saveDecision: "/api/admin/taxi/complaints/center/decision/save",
  requestSeniorReview: "/api/admin/taxi/complaints/center/decision/senior-review",
  requestOwnerReview: "/api/admin/taxi/complaints/center/decision/owner-review",
  openAppeal: "/api/admin/taxi/complaints/center/appeal/open",
  closeAppeal: "/api/admin/taxi/complaints/center/appeal/close",
  assignOperator: "/api/admin/taxi/complaints/center/assignment/operator",
  setDeadline: "/api/admin/taxi/complaints/center/assignment/deadline",
  closeCase: "/api/admin/taxi/complaints/center/close-case"
} as const;

const RESOLUTION_STEPS_027G = [
  { id: "take", title: "Принять", body: "оператор фиксирует дело за собой", route: "takeCase" as RouteKey027G },
  { id: "contact", title: "Связаться", body: "пассажир и водитель отдельно", route: "saveContactResult" as RouteKey027G },
  { id: "evidence", title: "Доказательства", body: "маршрут, отмена, оплата, ожидание, чат, фото", route: "buildEvidencePack" as RouteKey027G },
  { id: "decision", title: "Решение", body: "без компенсации и блокировки без одобрения", route: "saveDecision" as RouteKey027G },
  { id: "reply", title: "Ответы", body: "официально пассажиру и водителю", route: "sendPassengerReply" as RouteKey027G },
  { id: "appeal", title: "Апелляция", body: "открыть или закрыть спор", route: "openAppeal" as RouteKey027G },
  { id: "close", title: "Закрыть", body: "только после ответа сервера", route: "closeCase" as RouteKey027G }
];

const EVIDENCE_ROWS_027G = [
  { title: "Маршрут", hint: "точки, отклонение, расстояние", route: "checkRoute" as RouteKey027G, action: "Проверить маршрут" },
  { title: "Отмена", hint: "кто отменил и была ли договорная отмена", route: "checkCancel" as RouteKey027G, action: "Проверить отмену" },
  { title: "Оплата", hint: "сумма, промо, чаевые, спорная часть", route: "checkPayment" as RouteKey027G, action: "Проверить оплату" },
  { title: "Ожидание", hint: "прибытие, простой, таймер ожидания", route: "checkWaiting" as RouteKey027G, action: "Проверить ожидание" },
  { title: "Чат и звонки", hint: "переписка и попытки связи", route: "requestAudioChat" as RouteKey027G, action: "Запросить чат и звонки" },
  { title: "Фото и медиа", hint: "вложения пассажира и водителя", route: "requestPhoto" as RouteKey027G, action: "Запросить фото" }
];

const DECISIONS_027G = ["нет нарушения", "виноват водитель", "виноват пассажир", "спорно", "проверка старшего", "проверка владельца"];
const STATUS_FILTERS_027G = ["all", "новая", "срочная", "ждёт связи", "ждёт доказательств", "на решении", "апелляция", "закрыта"];

function base027G(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027G(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function now027G(): string {
  return new Date().toISOString();
}

function text027G(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

function normalizeItems027G(payload: unknown): QueueCase027G[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { items?: unknown; complaints?: unknown; queue?: unknown };
  const raw = Array.isArray(data.items) ? data.items : Array.isArray(data.complaints) ? data.complaints : Array.isArray(data.queue) ? data.queue : [];
  return raw.filter((item): item is QueueCase027G => Boolean(item && typeof item === "object"));
}

function normalizeCase027G(payload: unknown): QueueCase027G | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { case?: unknown; complaint?: unknown; item?: unknown };
  const raw = (data.case || data.complaint || data.item || payload) as unknown;
  return raw && typeof raw === "object" ? (raw as QueueCase027G) : null;
}

const emptySearch027G: Search027G = {
  complaintGlobalId: "",
  orderGlobalId: "",
  tripGlobalId: "",
  passengerId: "",
  driverId: "",
  driverBalanceTopupId: ""
};

export function TaxiAdminComplaints027G({ config, setNotice }: Props027G) {
  const [search, setSearch] = useState<Search027G>(emptySearch027G);
  const [queue, setQueue] = useState<QueueCase027G[]>([]);
  const [selectedCase, setSelectedCase] = useState<QueueCase027G | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState("");
  const [operatorFilter, setOperatorFilter] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [activeStep, setActiveStep] = useState("take");
  const [contactResult, setContactResult] = useState("");
  const [repeatContactAt, setRepeatContactAt] = useState("");
  const [passengerReply, setPassengerReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [replyTemplate, setReplyTemplate] = useState("neutral_official_reply");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [decision, setDecision] = useState(DECISIONS_027G[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [appealReviewer, setAppealReviewer] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [handoffReason, setHandoffReason] = useState("");
  const [events, setEvents] = useState<ServerEvent027G[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const filteredQueue = useMemo(() => queue.filter((item) => {
    const statusOk = statusFilter === "all" || String(item.status || "").toLowerCase() === statusFilter;
    const riskOk = riskFilter === "all" || String(item.risk || "").toLowerCase() === riskFilter;
    const marketOk = !marketFilter.trim() || String(item.market || "").toLowerCase().includes(marketFilter.trim().toLowerCase());
    const operatorOk = !operatorFilter.trim() || String(item.operator || "").toLowerCase().includes(operatorFilter.trim().toLowerCase());
    return statusOk && riskOk && marketOk && operatorOk;
  }), [queue, statusFilter, riskFilter, marketFilter, operatorFilter]);

  const activeStepData = RESOLUTION_STEPS_027G.find((step) => step.id === activeStep) || RESOLUTION_STEPS_027G[0];
  const lastEvent = events[0];
  const hasCase = Boolean(selectedCase?.complaintGlobalId);

  const updateSearch = (key: keyof Search027G, value: string) => setSearch((prev) => ({ ...prev, [key]: value }));

  const addServerEvent = (event: ServerEvent027G) => setEvents((prev) => [event, ...prev].slice(0, 12));

  const runServerAction = async (action: string, routeKey: RouteKey027G, extra: Record<string, unknown> = {}) => {
    const path = SERVER_ROUTES_027G[routeKey];
    const requiresOpenCase = routeKey !== "loadQueue" && routeKey !== "openCase";
    if (requiresOpenCase && !selectedCase?.complaintGlobalId) {
      const event = { at: now027G(), action, path, result: "не отправлено", ok: false, message: "Сначала откройте дело по глобальному номеру жалобы." };
      addServerEvent(event);
      setNotice(event.message);
      return;
    }
    setBusy(action);
    try {
      const response = await fetch(`${base027G(config)}${path}`, {
        method: "POST",
        headers: headers027G(config),
        body: JSON.stringify({ search, selectedCase, selectedCurrency, contactResult, repeatContactAt, passengerReply, driverReply, replyTemplate, evidenceNote, decision, decisionReason, appealReason, appealReviewer, assignee, deadline, handoffReason, ...extra })
      });
      const json = await response.json().catch(() => ({}));
      const message = String((json as { message?: unknown; error?: unknown }).message || (json as { message?: unknown; error?: unknown }).error || (response.ok ? "Сервер подтвердил действие." : "Сервер отклонил действие."));
      addServerEvent({ at: now027G(), action, path, result: response.status, ok: response.ok, message });
      setNotice(message);
      if (routeKey === "loadQueue" && response.ok) setQueue(normalizeItems027G(json));
      if (routeKey === "openCase" && response.ok) {
        const opened = normalizeCase027G(json);
        if (opened) setSelectedCase(opened);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Сетевая ошибка.";
      addServerEvent({ at: now027G(), action, path, result: "сетевая ошибка", ok: false, message });
      setNotice(message);
    } finally {
      setBusy(null);
    }
  };

  const addCurrency = () => {
    const value = currencyInput.trim().toUpperCase();
    if (!value) return;
    setCurrencyList((prev) => prev.includes(value) ? prev : [...prev, value]);
    setSelectedCurrency(value);
    setCurrencyInput("");
  };

  const openFromQueue = (item: QueueCase027G) => {
    setSelectedCase(item);
    setSearch({
      complaintGlobalId: item.complaintGlobalId || "",
      orderGlobalId: item.orderGlobalId || "",
      tripGlobalId: item.tripGlobalId || "",
      passengerId: item.passengerId || "",
      driverId: item.driverId || "",
      driverBalanceTopupId: item.driverBalanceTopupId || ""
    });
  };

  return (
    <section className="taxi027gRoot" data-admin-ui-027g-premium-complaints-command-center={ADMIN_UI_027G_PREMIUM_COMPLAINTS_COMMAND_CENTER}>
      <header className="taxi027gHeader">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Профессиональный центр обработки проблемы</h2>
          <p>Глобальное дело открывается только по номеру. Экран не ставит успех локально: каждое действие ждёт ответ сервера.</p>
        </div>
        <div className="taxi027gSlaCard"><strong>{selectedCase?.sla || "—"}</strong><span>срок ответа</span></div>
      </header>

      <section className="taxi027gSearchPanel" data-complaints-global-search-by-all-ids="ready">
        <div className="taxi027gSearchTitle"><strong>Глобальный поиск по обращению</strong><span>Номера жалобы, заказа, поездки, пассажира, водителя и номер пополнения водителя не смешиваются.</span></div>
        <div className="taxi027gSearchGrid">
          <label><span>Глобальный номер жалобы</span><input value={search.complaintGlobalId} onChange={(event) => updateSearch("complaintGlobalId", event.target.value)} placeholder="введите номер жалобы" /></label>
          <label><span>Номер заказа</span><input value={search.orderGlobalId} onChange={(event) => updateSearch("orderGlobalId", event.target.value)} placeholder="введите номер заказа" /></label>
          <label><span>Номер поездки</span><input value={search.tripGlobalId} onChange={(event) => updateSearch("tripGlobalId", event.target.value)} placeholder="введите номер поездки" /></label>
          <label><span>Номер пассажира</span><input value={search.passengerId} onChange={(event) => updateSearch("passengerId", event.target.value)} placeholder="отдельный номер пассажира" /></label>
          <label><span>Номер водителя</span><input value={search.driverId} onChange={(event) => updateSearch("driverId", event.target.value)} placeholder="отдельный номер водителя" /></label>
          <label><span>Номер пополнения баланса водителя</span><input value={search.driverBalanceTopupId} onChange={(event) => updateSearch("driverBalanceTopupId", event.target.value)} placeholder="идентификатор для пополнения" /></label>
        </div>
        <div className="taxi027gSearchActions">
          <button type="button" onClick={() => void runServerAction("Найти и открыть дело", "openCase")}>{busy === "Найти и открыть дело" ? "Запрос отправлен" : "Найти и открыть дело"}</button>
          <button type="button" onClick={() => void runServerAction("Обновить очередь", "loadQueue")}>Обновить очередь с сервера</button>
        </div>
      </section>

      <div className="taxi027gWorkspace">
        <aside className="taxi027gInbox" data-complaints-premium-inbox="ready">
          <div className="taxi027gPaneTitle"><span>1</span><div><strong>Очередь обращений</strong><small>приоритет, срок, риск, причина</small></div></div>
          <div className="taxi027gFilters">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>{STATUS_FILTERS_027G.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>{["all", "низкий", "средний", "высокий", "критический"].map((risk) => <option key={risk} value={risk}>{risk}</option>)}</select>
            <input value={marketFilter} onChange={(event) => setMarketFilter(event.target.value)} placeholder="страна / рынок" />
            <input value={operatorFilter} onChange={(event) => setOperatorFilter(event.target.value)} placeholder="оператор" />
          </div>
          <div className="taxi027gQueueList">
            {filteredQueue.length ? filteredQueue.map((item) => (
              <button key={item.complaintGlobalId || item.orderGlobalId || Math.random()} type="button" className={selectedCase?.complaintGlobalId === item.complaintGlobalId ? "active" : ""} onClick={() => openFromQueue(item)}>
                <strong>{text027G(item.complaintGlobalId)}</strong>
                <span>{text027G(item.reason)}</span>
                <small>{text027G(item.status)} · {text027G(item.risk)} · {text027G(item.sla)}</small>
              </button>
            )) : (
              <div className="taxi027gEmptyQueue"><strong>Очередь не загружена</strong><span>Нажмите “Обновить очередь с сервера”. На экране нет поддельных карточек.</span></div>
            )}
          </div>
        </aside>

        <main className="taxi027gCaseMain" data-complaints-case-dossier="ready">
          <section className="taxi027gDossierHero">
            <div>
              <span>{hasCase ? "Открытое дело" : "Дело не открыто"}</span>
              <h3>{text027G(selectedCase?.complaintGlobalId)}</h3>
              <p>{hasCase ? text027G(selectedCase?.reason) : "Найдите обращение по глобальному номеру или откройте его из очереди сервера."}</p>
            </div>
            <div className="taxi027gRiskBadge"><strong>{text027G(selectedCase?.risk)}</strong><span>риск</span></div>
          </section>

          <section className="taxi027gIdentityGrid" data-global-complaint-driver-rider-topup-identities="ready">
            <div><span>Глобальный номер жалобы</span><strong>{text027G(selectedCase?.complaintGlobalId)}</strong></div>
            <div><span>Номер пассажира</span><strong>{text027G(selectedCase?.passengerId)}</strong></div>
            <div><span>Номер водителя</span><strong>{text027G(selectedCase?.driverId)}</strong></div>
            <div className="important"><span>Номер пополнения баланса водителя</span><strong>{text027G(selectedCase?.driverBalanceTopupId)}</strong></div>
            <div><span>Номер заказа</span><strong>{text027G(selectedCase?.orderGlobalId)}</strong></div>
            <div><span>Номер поездки</span><strong>{text027G(selectedCase?.tripGlobalId)}</strong></div>
            <div><span>Рынок / город</span><strong>{text027G(selectedCase?.market)} / {text027G(selectedCase?.city)}</strong></div>
            <div><span>Сумма и валюта</span><strong>{text027G(selectedCase?.amount)} {selectedCurrency || selectedCase?.currency || "—"}</strong></div>
          </section>

          <section className="taxi027gCurrency" data-dynamic-multicurrency-selection-no-fixed-list="ready">
            <div><strong>Мультивалютный выбор</strong><span>валюты приходят из конфигурации рынка или добавляются оператором для запроса; фиксированного списка нет</span></div>
            <div className="taxi027gCurrencyControls">
              <input value={currencyInput} onChange={(event) => setCurrencyInput(event.target.value)} placeholder="код валюты рынка" />
              <button type="button" onClick={addCurrency}>Добавить валюту</button>
              <select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}>
                <option value="">выберите валюту</option>
                {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </div>
          </section>

          <section className="taxi027gStepper" data-complaint-resolution-workflow-master="ready">
            <div className="taxi027gPaneTitle"><span>2</span><div><strong>Путь решения</strong><small>оператор видит следующий шаг и ограничение</small></div></div>
            <div className="taxi027gSteps">
              {RESOLUTION_STEPS_027G.map((step) => <button key={step.id} type="button" className={activeStep === step.id ? "active" : ""} onClick={() => setActiveStep(step.id)}><strong>{step.title}</strong><span>{step.body}</span></button>)}
            </div>
            <div className="taxi027gActiveStep"><strong>{activeStepData.title}</strong><span>{activeStepData.body}</span><button type="button" onClick={() => void runServerAction(activeStepData.title, activeStepData.route)}>Выполнить через сервер</button></div>
          </section>

          <section className="taxi027gEvidenceBoard" data-complaints-evidence-board="ready">
            <div className="taxi027gPaneTitle"><span>3</span><div><strong>Доказательства</strong><small>каждый факт проверяется отдельным серверным действием</small></div></div>
            <div className="taxi027gEvidenceGrid">
              {EVIDENCE_ROWS_027G.map((item) => <article key={item.title}><strong>{item.title}</strong><span>{item.hint}</span><button type="button" onClick={() => void runServerAction(item.action, item.route)}>{item.action}</button></article>)}
            </div>
            <textarea value={evidenceNote} onChange={(event) => setEvidenceNote(event.target.value)} placeholder="заметка по доказательствам: чего не хватает, что подтвердилось, что требует старшего" />
            <button type="button" onClick={() => void runServerAction("Собрать пакет доказательств", "buildEvidencePack")}>Собрать пакет доказательств</button>
          </section>

          <section className="taxi027gReplyDesk" data-complaints-official-reply-desk="ready">
            <div className="taxi027gPaneTitle"><span>4</span><div><strong>Официальные ответы</strong><small>пассажиру и водителю отдельно</small></div></div>
            <label><span>Шаблон ответа</span><input value={replyTemplate} onChange={(event) => setReplyTemplate(event.target.value)} /></label>
            <div className="taxi027gTwoEditors">
              <label><span>Ответ пассажиру</span><textarea value={passengerReply} onChange={(event) => setPassengerReply(event.target.value)} /></label>
              <label><span>Ответ водителю</span><textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} /></label>
            </div>
            <div className="taxi027gButtonRow">
              <button type="button" onClick={() => void runServerAction("Предпросмотр ответа пассажиру", "previewPassengerReply")}>Предпросмотр пассажиру</button>
              <button type="button" onClick={() => void runServerAction("Предпросмотр ответа водителю", "previewDriverReply")}>Предпросмотр водителю</button>
              <button type="button" onClick={() => void runServerAction("Отправить ответ пассажиру", "sendPassengerReply")}>Отправить пассажиру</button>
              <button type="button" onClick={() => void runServerAction("Отправить ответ водителю", "sendDriverReply")}>Отправить водителю</button>
            </div>
          </section>
        </main>

        <aside className="taxi027gRightRail" data-complaints-operator-command-rail="ready">
          <section>
            <div className="taxi027gPaneTitle compact"><span>5</span><div><strong>Связь</strong><small>без объединения действий</small></div></div>
            <button type="button" onClick={() => void runServerAction("Позвонить пассажиру", "callPassenger")}>Позвонить пассажиру</button>
            <button type="button" onClick={() => void runServerAction("Позвонить водителю", "callDriver")}>Позвонить водителю</button>
            <button type="button" onClick={() => void runServerAction("Открыть чат с пассажиром", "chatPassenger")}>Открыть чат с пассажиром</button>
            <button type="button" onClick={() => void runServerAction("Открыть чат с водителем", "chatDriver")}>Открыть чат с водителем</button>
            <textarea value={contactResult} onChange={(event) => setContactResult(event.target.value)} placeholder="результат связи" />
            <input value={repeatContactAt} onChange={(event) => setRepeatContactAt(event.target.value)} placeholder="повторный контакт" />
            <button type="button" onClick={() => void runServerAction("Сохранить результат связи", "saveContactResult")}>Сохранить результат связи</button>
            <button type="button" onClick={() => void runServerAction("Назначить повторный контакт", "scheduleRepeatContact")}>Назначить повторный контакт</button>
          </section>

          <section>
            <div className="taxi027gPaneTitle compact"><span>6</span><div><strong>Решение и ограничения</strong><small>деньги и блокировка без одобрения запрещены</small></div></div>
            <select value={decision} onChange={(event) => setDecision(event.target.value)}>{DECISIONS_027G.map((item) => <option key={item}>{item}</option>)}</select>
            <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="обоснование решения" />
            <p className="taxi027gDanger">Компенсация, списание, блокировка и деньги запрещены без отдельного одобрения.</p>
            <button type="button" onClick={() => void runServerAction("Сохранить решение", "saveDecision")}>Сохранить решение</button>
            <button type="button" onClick={() => void runServerAction("Передать старшему", "requestSeniorReview")}>Передать старшему</button>
            <button type="button" onClick={() => void runServerAction("Передать владельцу", "requestOwnerReview")}>Передать владельцу</button>
          </section>

          <section>
            <div className="taxi027gPaneTitle compact"><span>7</span><div><strong>Апелляция</strong><small>отдельная стадия дела</small></div></div>
            <textarea value={appealReason} onChange={(event) => setAppealReason(event.target.value)} placeholder="причина апелляции" />
            <input value={appealReviewer} onChange={(event) => setAppealReviewer(event.target.value)} placeholder="кто рассматривает" />
            <button type="button" onClick={() => void runServerAction("Открыть апелляцию", "openAppeal")}>Открыть апелляцию</button>
            <button type="button" onClick={() => void runServerAction("Закрыть апелляцию", "closeAppeal")}>Закрыть апелляцию</button>
          </section>

          <section>
            <div className="taxi027gPaneTitle compact"><span>8</span><div><strong>Назначение</strong><small>ответственный и срок</small></div></div>
            <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="оператор / старший" />
            <input value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="срок ответа" />
            <textarea value={handoffReason} onChange={(event) => setHandoffReason(event.target.value)} placeholder="причина передачи" />
            <button type="button" onClick={() => void runServerAction("Назначить оператора", "assignOperator")}>Назначить оператора</button>
            <button type="button" onClick={() => void runServerAction("Поставить срок", "setDeadline")}>Поставить срок</button>
            <button type="button" onClick={() => void runServerAction("Закрыть дело", "closeCase")}>Закрыть дело</button>
          </section>

          <section className="taxi027gServerLog" data-complaints-server-action-journal="ready">
            <div className="taxi027gPaneTitle compact"><span>9</span><div><strong>Журнал действий сервера</strong><small>путь, статус, ошибка, время</small></div></div>
            {lastEvent ? <div className={lastEvent.ok ? "ok" : "bad"}><strong>{lastEvent.action}</strong><span>{lastEvent.result} · {lastEvent.message}</span><small>{lastEvent.path}</small></div> : <div className="bad"><strong>Нет ответа сервера</strong><span>Ни одно действие ещё не подтверждено сервером.</span><small>Успех не ставится на экране.</small></div>}
            <div className="taxi027gEvents">
              {events.map((event) => <p key={`${event.at}-${event.action}`}><strong>{event.result}</strong><span>{event.action}</span><small>{event.path}</small></p>)}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
