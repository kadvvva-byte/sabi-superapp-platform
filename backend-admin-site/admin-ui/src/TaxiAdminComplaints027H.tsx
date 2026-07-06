import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027h.css";

type Props027H = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerEvent027H = { at: string; action: string; route: string; status: number | string; ok: boolean; error: string; operator: string };
type ComplaintCase027H = {
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
  country?: string;
  city?: string;
  tariff?: string;
  amount?: string;
  currency?: string;
  operator?: string;
  nextStep?: string;
  missingEvidence?: string[];
};
type Search027H = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
};
type RouteKey027H = keyof typeof SERVER_ROUTES_027H;

const ADMIN_UI_027H_PREMIUM_SIMPLE_COMPLAINTS_CENTER = "027H_PREMIUM_SIMPLE_COMPLAINT_CENTER_SINGLE_SCREEN";

const SERVER_ROUTES_027H = {
  loadQueue: "/api/admin/taxi/complaints/premium/queue",
  openCase: "/api/admin/taxi/complaints/premium/open-by-global-id",
  acceptCase: "/api/admin/taxi/complaints/premium/accept",
  callPassenger: "/api/admin/taxi/complaints/premium/contact/passenger-call",
  callDriver: "/api/admin/taxi/complaints/premium/contact/driver-call",
  openPassengerChat: "/api/admin/taxi/complaints/premium/contact/passenger-chat",
  openDriverChat: "/api/admin/taxi/complaints/premium/contact/driver-chat",
  saveContactResult: "/api/admin/taxi/complaints/premium/contact/save-result",
  requestEvidence: "/api/admin/taxi/complaints/premium/evidence/request",
  verifyFacts: "/api/admin/taxi/complaints/premium/evidence/verify-facts",
  saveDecision: "/api/admin/taxi/complaints/premium/decision/save",
  sendPassengerReply: "/api/admin/taxi/complaints/premium/reply/passenger-send",
  sendDriverReply: "/api/admin/taxi/complaints/premium/reply/driver-send",
  escalateSenior: "/api/admin/taxi/complaints/premium/escalation/senior",
  escalateOwner: "/api/admin/taxi/complaints/premium/escalation/owner",
  openAppeal: "/api/admin/taxi/complaints/premium/appeal/open",
  closeCase: "/api/admin/taxi/complaints/premium/close"
} as const;

const PROCESS_STEPS_027H = [
  { key: "acceptCase" as RouteKey027H, title: "1. Принять", subtitle: "закрепить дело за оператором" },
  { key: "saveContactResult" as RouteKey027H, title: "2. Связаться", subtitle: "пассажир и водитель отдельно" },
  { key: "verifyFacts" as RouteKey027H, title: "3. Проверить", subtitle: "маршрут, оплата, отмена, ожидание" },
  { key: "saveDecision" as RouteKey027H, title: "4. Решить", subtitle: "решение без денег и блокировок без одобрения" },
  { key: "sendPassengerReply" as RouteKey027H, title: "5. Ответить", subtitle: "официальный ответ обеим сторонам" },
  { key: "closeCase" as RouteKey027H, title: "6. Закрыть / апелляция", subtitle: "закрытие или отдельная апелляция" }
];

const STATUS_FILTERS_027H = ["all", "новая", "срочная", "ждёт связи", "ждёт доказательств", "на решении", "апелляция", "закрыта"];
const RISK_FILTERS_027H = ["all", "низкий", "средний", "высокий", "критический"];
const DECISION_OPTIONS_027H = ["нет нарушения", "виноват водитель", "виноват пассажир", "спорно", "передать старшему", "передать владельцу"];

const emptySearch027H: Search027H = {
  complaintGlobalId: "",
  orderGlobalId: "",
  tripGlobalId: "",
  passengerId: "",
  driverId: "",
  driverBalanceTopupId: ""
};

function base027H(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027H(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function now027H(): string {
  return new Date().toISOString();
}

function text027H(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

function normalizeQueue027H(payload: unknown): ComplaintCase027H[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { items?: unknown; complaints?: unknown; queue?: unknown };
  const raw = Array.isArray(data.items) ? data.items : Array.isArray(data.complaints) ? data.complaints : Array.isArray(data.queue) ? data.queue : [];
  return raw.filter((item): item is ComplaintCase027H => Boolean(item && typeof item === "object"));
}

function normalizeCase027H(payload: unknown): ComplaintCase027H | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { case?: unknown; complaint?: unknown; item?: unknown };
  const raw = data.case || data.complaint || data.item || payload;
  return raw && typeof raw === "object" ? (raw as ComplaintCase027H) : null;
}

export function TaxiAdminComplaints027H({ config, setNotice }: Props027H) {
  const [search, setSearch] = useState<Search027H>(emptySearch027H);
  const [queue, setQueue] = useState<ComplaintCase027H[]>([]);
  const [selectedCase, setSelectedCase] = useState<ComplaintCase027H | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [quickSearch, setQuickSearch] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [contactNote, setContactNote] = useState("");
  const [evidenceRequest, setEvidenceRequest] = useState("");
  const [factsNote, setFactsNote] = useState("");
  const [decision, setDecision] = useState(DECISION_OPTIONS_027H[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [passengerReply, setPassengerReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [serverEvents, setServerEvents] = useState<ServerEvent027H[]>([]);
  const [busyAction, setBusyAction] = useState("");

  const filteredQueue = useMemo(() => {
    const query = quickSearch.trim().toLowerCase();
    return queue.filter((item) => {
      const statusOk = statusFilter === "all" || String(item.status || "").toLowerCase() === statusFilter;
      const riskOk = riskFilter === "all" || String(item.risk || "").toLowerCase() === riskFilter;
      const queryOk = !query || [item.complaintGlobalId, item.orderGlobalId, item.tripGlobalId, item.passengerId, item.driverId, item.driverBalanceTopupId, item.reason].some((value) => String(value || "").toLowerCase().includes(query));
      return statusOk && riskOk && queryOk;
    });
  }, [queue, quickSearch, statusFilter, riskFilter]);

  const activeCurrency = selectedCurrency || selectedCase?.currency || "—";
  const hasOpenCase = Boolean(selectedCase?.complaintGlobalId);
  const lastServerEvent = serverEvents[0];

  const setSearchValue = (key: keyof Search027H, value: string) => setSearch((prev) => ({ ...prev, [key]: value }));
  const pushServerEvent = (event: ServerEvent027H) => setServerEvents((prev) => [event, ...prev].slice(0, 20));

  const addCurrency = () => {
    const value = currencyInput.trim().toUpperCase();
    if (!value) return;
    setCurrencyList((prev) => prev.includes(value) ? prev : [...prev, value]);
    setSelectedCurrency(value);
    setCurrencyInput("");
  };

  const openQueueCase = (item: ComplaintCase027H) => {
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

  const runServerAction = async (action: string, routeKey: RouteKey027H, extra: Record<string, unknown> = {}) => {
    const route = SERVER_ROUTES_027H[routeKey];
    const requiresCase = routeKey !== "loadQueue" && routeKey !== "openCase";
    if (requiresCase && !selectedCase?.complaintGlobalId) {
      const event = { at: now027H(), action, route, status: "не отправлено", ok: false, error: "Сначала откройте дело по глобальному номеру жалобы.", operator: operatorName || "—" };
      pushServerEvent(event);
      setNotice(event.error);
      return;
    }

    setBusyAction(action);
    try {
      const response = await fetch(`${base027H(config)}${route}`, {
        method: "POST",
        headers: headers027H(config),
        body: JSON.stringify({
          search,
          selectedCase,
          selectedCurrency,
          operatorName,
          contactNote,
          evidenceRequest,
          factsNote,
          decision,
          decisionReason,
          passengerReply,
          driverReply,
          appealReason,
          ...extra
        })
      });
      const json = await response.json().catch(() => ({}));
      const serverMessage = String((json as { message?: unknown; error?: unknown }).message || (json as { message?: unknown; error?: unknown }).error || (response.ok ? "Сервер подтвердил действие." : "Сервер отклонил действие."));
      pushServerEvent({ at: now027H(), action, route, status: response.status, ok: response.ok, error: response.ok ? "—" : serverMessage, operator: operatorName || "—" });
      setNotice(serverMessage);
      if (routeKey === "loadQueue" && response.ok) setQueue(normalizeQueue027H(json));
      if (routeKey === "openCase" && response.ok) {
        const opened = normalizeCase027H(json);
        if (opened) setSelectedCase(opened);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Сетевая ошибка.";
      pushServerEvent({ at: now027H(), action, route, status: "ошибка сети", ok: false, error: errorMessage, operator: operatorName || "—" });
      setNotice(errorMessage);
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="taxi027hRoot" data-admin-ui-027h-premium-simple-complaints-center={ADMIN_UI_027H_PREMIUM_SIMPLE_COMPLAINTS_CENTER}>
      <header className="taxi027hTopBar" data-complaints-global-id-search-bar="ready">
        <div className="taxi027hTopTitle">
          <span>Жалобы / обращения</span>
          <h2>Премиальный центр обработки</h2>
          <p>Просто, чётко, без визуального шума. Дело открывается по глобальному номеру, успех фиксируется только после ответа сервера.</p>
        </div>
        <div className="taxi027hTopStatus">
          <strong>{selectedCase?.sla || "—"}</strong>
          <span>срок</span>
          <b>{selectedCase?.risk || "риск не выбран"}</b>
        </div>
      </header>

      <section className="taxi027hSearch" data-complaints-global-search-all-identifiers="ready">
        <label><span>Номер жалобы</span><input value={search.complaintGlobalId} onChange={(event) => setSearchValue("complaintGlobalId", event.target.value)} placeholder="глобальный номер жалобы" /></label>
        <label><span>Номер заказа</span><input value={search.orderGlobalId} onChange={(event) => setSearchValue("orderGlobalId", event.target.value)} placeholder="Номер заказа" /></label>
        <label><span>Номер поездки</span><input value={search.tripGlobalId} onChange={(event) => setSearchValue("tripGlobalId", event.target.value)} placeholder="Номер поездки" /></label>
        <label><span>Номер пассажира</span><input value={search.passengerId} onChange={(event) => setSearchValue("passengerId", event.target.value)} placeholder="Номер пассажира" /></label>
        <label><span>Номер водителя</span><input value={search.driverId} onChange={(event) => setSearchValue("driverId", event.target.value)} placeholder="Номер водителя" /></label>
        <label><span>Номер пополнения водителя</span><input value={search.driverBalanceTopupId} onChange={(event) => setSearchValue("driverBalanceTopupId", event.target.value)} placeholder="номер пополнения баланса" /></label>
        <button type="button" onClick={() => void runServerAction("Открыть дело", "openCase")}>{busyAction === "Открыть дело" ? "Открываем" : "Открыть дело"}</button>
      </section>

      <div className="taxi027hLayout">
        <aside className="taxi027hInbox" data-complaints-clean-inbox="ready">
          <div className="taxi027hPanelHead">
            <h3>Очередь жалоб</h3>
            <button type="button" onClick={() => void runServerAction("Обновить очередь", "loadQueue")}>Обновить</button>
          </div>
          <div className="taxi027hFilters">
            <input value={quickSearch} onChange={(event) => setQuickSearch(event.target.value)} placeholder="поиск по номеру или причине" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>{STATUS_FILTERS_027H.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)}>{RISK_FILTERS_027H.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <div className="taxi027hInboxList">
            {filteredQueue.length ? filteredQueue.map((item) => (
              <button key={item.complaintGlobalId || item.orderGlobalId || item.tripGlobalId} type="button" className={selectedCase?.complaintGlobalId === item.complaintGlobalId ? "active" : ""} onClick={() => openQueueCase(item)}>
                <strong>{text027H(item.complaintGlobalId)}</strong>
                <span>{text027H(item.reason)}</span>
                <small>{text027H(item.status)} · {text027H(item.sla)} · {text027H(item.risk)}</small>
              </button>
            )) : (
              <div className="taxi027hEmpty">
                <strong>Очередь не загружена</strong>
                <span>Нажмите “Обновить”. Поддельные карточки не создаются.</span>
              </div>
            )}
          </div>
        </aside>

        <main className="taxi027hCase" data-complaints-single-large-case-card="ready">
          <section className="taxi027hCaseHero">
            <div>
              <span>{hasOpenCase ? "Открытое дело" : "Дело не открыто"}</span>
              <h3>{hasOpenCase ? text027H(selectedCase?.complaintGlobalId) : "Откройте жалобу по номеру"}</h3>
              <p>{hasOpenCase ? text027H(selectedCase?.reason) : "Сначала найдите обращение или загрузите очередь с сервера."}</p>
            </div>
            <button type="button" onClick={() => void runServerAction("Принять дело", "acceptCase")}>Принять дело</button>
          </section>

          <section className="taxi027hIdentity" data-complaints-clear-identity-passport="ready">
            <article><span>Номер жалобы</span><strong>{text027H(selectedCase?.complaintGlobalId)}</strong></article>
            <article><span>Номер пассажира</span><strong>{text027H(selectedCase?.passengerId)}</strong></article>
            <article><span>Номер водителя</span><strong>{text027H(selectedCase?.driverId)}</strong></article>
            <article className="accent"><span>Номер пополнения водителя</span><strong>{text027H(selectedCase?.driverBalanceTopupId)}</strong></article>
            <article><span>Номер заказа</span><strong>{text027H(selectedCase?.orderGlobalId)}</strong></article>
            <article><span>Номер поездки</span><strong>{text027H(selectedCase?.tripGlobalId)}</strong></article>
            <article><span>Страна / город</span><strong>{text027H(selectedCase?.country)} / {text027H(selectedCase?.city)}</strong></article>
            <article><span>Сумма / валюта</span><strong>{text027H(selectedCase?.amount)} {activeCurrency}</strong></article>
          </section>

          <section className="taxi027hCurrency" data-complaints-multicurrency-select-no-fixed-list="ready">
            <strong>Валюта дела</strong>
            <input value={currencyInput} onChange={(event) => setCurrencyInput(event.target.value)} placeholder="код валюты из рынка" />
            <button type="button" onClick={addCurrency}>Добавить</button>
            <select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}>
              <option value="">выбрать валюту</option>
              {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
            </select>
          </section>

          <section className="taxi027hProcess" data-complaints-six-step-resolution-process="ready">
            {PROCESS_STEPS_027H.map((step) => (
              <button key={step.title} type="button" onClick={() => void runServerAction(step.title, step.key)}>
                <strong>{step.title}</strong>
                <span>{step.subtitle}</span>
              </button>
            ))}
          </section>

          <section className="taxi027hWork" data-complaints-work-panels="ready">
            <article>
              <h4>Проверка</h4>
              <textarea value={factsNote} onChange={(event) => setFactsNote(event.target.value)} placeholder="маршрут, оплата, отмена, ожидание, факты" />
              <button type="button" onClick={() => void runServerAction("Проверить факты", "verifyFacts")}>Проверить факты</button>
            </article>
            <article>
              <h4>Доказательства</h4>
              <textarea value={evidenceRequest} onChange={(event) => setEvidenceRequest(event.target.value)} placeholder="что запросить: фото, чат, звонки, маршрут" />
              <button type="button" onClick={() => void runServerAction("Запросить доказательства", "requestEvidence")}>Запросить доказательства</button>
            </article>
            <article>
              <h4>Решение</h4>
              <select value={decision} onChange={(event) => setDecision(event.target.value)}>{DECISION_OPTIONS_027H.map((item) => <option key={item}>{item}</option>)}</select>
              <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="обоснование решения" />
              <button type="button" onClick={() => void runServerAction("Сохранить решение", "saveDecision")}>Сохранить решение</button>
            </article>
          </section>
        </main>

        <aside className="taxi027hActions" data-complaints-focused-action-panel="ready">
          <section>
            <h3>Действия</h3>
            <button type="button" onClick={() => void runServerAction("Позвонить пассажиру", "callPassenger")}>Позвонить пассажиру</button>
            <button type="button" onClick={() => void runServerAction("Позвонить водителю", "callDriver")}>Позвонить водителю</button>
            <button type="button" onClick={() => void runServerAction("Открыть чат с пассажиром", "openPassengerChat")}>Открыть чат с пассажиром</button>
            <button type="button" onClick={() => void runServerAction("Открыть чат с водителем", "openDriverChat")}>Открыть чат с водителем</button>
            <textarea value={contactNote} onChange={(event) => setContactNote(event.target.value)} placeholder="результат связи" />
            <button type="button" onClick={() => void runServerAction("Сохранить связь", "saveContactResult")}>Сохранить связь</button>
          </section>

          <section>
            <h3>Ответы</h3>
            <textarea value={passengerReply} onChange={(event) => setPassengerReply(event.target.value)} placeholder="официальный ответ пассажиру" />
            <textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} placeholder="официальный ответ водителю" />
            <button type="button" onClick={() => void runServerAction("Отправить пассажиру", "sendPassengerReply")}>Отправить пассажиру</button>
            <button type="button" onClick={() => void runServerAction("Отправить водителю", "sendDriverReply")}>Отправить водителю</button>
          </section>

          <section>
            <h3>Передача</h3>
            <input value={operatorName} onChange={(event) => setOperatorName(event.target.value)} placeholder="оператор" />
            <textarea value={appealReason} onChange={(event) => setAppealReason(event.target.value)} placeholder="причина апелляции или передачи" />
            <button type="button" onClick={() => void runServerAction("Передать старшему", "escalateSenior")}>Передать старшему</button>
            <button type="button" onClick={() => void runServerAction("Передать владельцу", "escalateOwner")}>Передать владельцу</button>
            <button type="button" onClick={() => void runServerAction("Открыть апелляцию", "openAppeal")}>Открыть апелляцию</button>
            <button type="button" onClick={() => void runServerAction("Закрыть дело", "closeCase")}>Закрыть дело</button>
          </section>
        </aside>
      </div>

      <section className="taxi027hJournal" data-complaints-professional-server-journal="ready">
        <div>
          <h3>Журнал сервера</h3>
          <p>Сохраняются: серверный путь, статус, ошибка, оператор, время. Успех на экране не ставится без ответа сервера.</p>
        </div>
        <div className="taxi027hJournalGrid">
          {lastServerEvent ? (
            <article className={lastServerEvent.ok ? "ok" : "bad"}>
              <strong>{lastServerEvent.action}</strong>
              <span>статус: {lastServerEvent.status}</span>
              <span>оператор: {lastServerEvent.operator}</span>
              <span>ошибка: {lastServerEvent.error}</span>
              <small>{lastServerEvent.route}</small>
            </article>
          ) : (
            <article className="bad">
              <strong>Ответа сервера ещё нет</strong>
              <span>статус: —</span>
              <span>оператор: —</span>
              <span>ошибка: —</span>
              <small>Ни одно действие не подтверждено сервером.</small>
            </article>
          )}
          {serverEvents.slice(0, 4).map((event) => (
            <article key={`${event.at}-${event.action}`} className={event.ok ? "ok" : "bad"}>
              <strong>{event.action}</strong>
              <span>статус: {event.status}</span>
              <span>оператор: {event.operator}</span>
              <span>ошибка: {event.error}</span>
              <small>{event.route}</small>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
