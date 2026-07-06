import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027l.css";

type Props027L = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerLog027L = { at: string; action: string; path: string; code: number | string; ok: boolean; operator: string; problem: string; answer: string };
type ChatRow027L = { id?: string; at?: string; from?: string; to?: string; body?: string; state?: string };
type ComplaintRow027L = {
  complaintGlobalId?: string;
  source?: string;
  orderGlobalId?: string;
  tripGlobalId?: string;
  passengerId?: string;
  driverId?: string;
  driverBalanceTopupId?: string;
  state?: string;
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
};
type Search027L = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
};
type RouteKey027L = keyof typeof SERVER_PATHS_027L;

const ADMIN_UI_027L_ACTIVE_COMPLAINTS_CORE = "027L_COMPLAINTS_ACTIVE_FOUNDATION_SERVER_ONLY";

const SERVER_PATHS_027L = {
  loadComplaintList: "/api/admin/taxi/complaints/list",
  openComplaintById: "/api/admin/taxi/complaints/open-by-id",
  loadComplaintChat: "/api/admin/taxi/complaints/chat/load",
  sendPassengerChat: "/api/admin/taxi/complaints/chat/send-passenger",
  sendDriverChat: "/api/admin/taxi/complaints/chat/send-driver",
  acceptComplaint: "/api/admin/taxi/complaints/accept",
  saveContactResult: "/api/admin/taxi/complaints/contact/save-result",
  requestProof: "/api/admin/taxi/complaints/evidence/request",
  saveRouteCheck: "/api/admin/taxi/complaints/checks/route",
  savePaymentCheck: "/api/admin/taxi/complaints/checks/payment",
  saveCancelCheck: "/api/admin/taxi/complaints/checks/cancel",
  saveWaitCheck: "/api/admin/taxi/complaints/checks/wait-time",
  saveDecision: "/api/admin/taxi/complaints/decision/save",
  sendPassengerOfficialReply: "/api/admin/taxi/complaints/reply/passenger",
  sendDriverOfficialReply: "/api/admin/taxi/complaints/reply/driver",
  escalateSenior: "/api/admin/taxi/complaints/escalate/senior",
  escalateOwner: "/api/admin/taxi/complaints/escalate/owner",
  openAppeal: "/api/admin/taxi/complaints/appeal/open",
  closeComplaint: "/api/admin/taxi/complaints/close"
} as const;

const PROCESS_STEPS_027L = ["1. Принять", "2. Связаться", "3. Проверить", "4. Решить", "5. Ответить", "6. Закрыть / апелляция"];
const STATE_FILTERS_027L = ["all", "новая", "срочная", "ждёт связи", "ждёт доказательств", "проверка", "решение", "апелляция", "закрыта"];
const RISK_FILTERS_027L = ["all", "низкий", "средний", "высокий", "критический"];

const emptySearch027L: Search027L = {
  complaintGlobalId: "",
  orderGlobalId: "",
  tripGlobalId: "",
  passengerId: "",
  driverId: "",
  driverBalanceTopupId: ""
};

function base027L(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027L(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function now027L(): string {
  return new Date().toISOString();
}

function show027L(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

function readJson027L(text: string): unknown {
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

function normalizeList027L(payload: unknown): ComplaintRow027L[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { items?: unknown; complaints?: unknown; queue?: unknown; list?: unknown };
  const raw = Array.isArray(data.items) ? data.items : Array.isArray(data.complaints) ? data.complaints : Array.isArray(data.queue) ? data.queue : Array.isArray(data.list) ? data.list : [];
  return raw.filter((item): item is ComplaintRow027L => Boolean(item && typeof item === "object"));
}

function normalizeCase027L(payload: unknown): ComplaintRow027L | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { complaint?: unknown; case?: unknown; item?: unknown };
  const raw = data.complaint || data.case || data.item || payload;
  return raw && typeof raw === "object" ? (raw as ComplaintRow027L) : null;
}

function normalizeChat027L(payload: unknown): ChatRow027L[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { messages?: unknown; chat?: unknown; items?: unknown };
  const raw = Array.isArray(data.messages) ? data.messages : Array.isArray(data.chat) ? data.chat : Array.isArray(data.items) ? data.items : [];
  return raw.filter((item): item is ChatRow027L => Boolean(item && typeof item === "object"));
}

export function TaxiAdminComplaints027L({ config, setNotice }: Props027L) {
  const [search, setSearch] = useState<Search027L>(emptySearch027L);
  const [stateFilter, setStateFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [queue, setQueue] = useState<ComplaintRow027L[]>([]);
  const [activeCase, setActiveCase] = useState<ComplaintRow027L | null>(null);
  const [chatRows, setChatRows] = useState<ChatRow027L[]>([]);
  const [passengerMessage, setPassengerMessage] = useState("");
  const [driverMessage, setDriverMessage] = useState("");
  const [officialPassengerReply, setOfficialPassengerReply] = useState("");
  const [officialDriverReply, setOfficialDriverReply] = useState("");
  const [contactResult, setContactResult] = useState("");
  const [proofRequest, setProofRequest] = useState("");
  const [routeCheck, setRouteCheck] = useState("");
  const [paymentCheck, setPaymentCheck] = useState("");
  const [cancelCheck, setCancelCheck] = useState("");
  const [waitCheck, setWaitCheck] = useState("");
  const [decision, setDecision] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [busyAction, setBusyAction] = useState("");
  const [serverLog, setServerLog] = useState<ServerLog027L[]>([]);

  const filteredQueue = useMemo(() => queue.filter((item) => {
    const state = String(item.state || "").toLowerCase();
    const risk = String(item.risk || "").toLowerCase();
    const stateOk = stateFilter === "all" || state === stateFilter;
    const riskOk = riskFilter === "all" || risk === riskFilter;
    return stateOk && riskOk;
  }), [queue, riskFilter, stateFilter]);

  const openedId = activeCase?.complaintGlobalId || search.complaintGlobalId.trim();
  const activeCurrency = selectedCurrency || activeCase?.currency || "—";
  const lastLog = serverLog[0];

  const updateSearch = (key: keyof Search027L, value: string) => setSearch((prev) => ({ ...prev, [key]: value }));
  const pushLog = (event: ServerLog027L) => setServerLog((prev) => [event, ...prev].slice(0, 40));

  const addCurrency = () => {
    const value = currencyInput.trim().toUpperCase();
    if (!value) return;
    setCurrencyList((prev) => prev.includes(value) ? prev : [...prev, value]);
    setSelectedCurrency(value);
    setCurrencyInput("");
  };

  const openFromQueue = (item: ComplaintRow027L) => {
    setActiveCase(item);
    setSearch({
      complaintGlobalId: item.complaintGlobalId || "",
      orderGlobalId: item.orderGlobalId || "",
      tripGlobalId: item.tripGlobalId || "",
      passengerId: item.passengerId || "",
      driverId: item.driverId || "",
      driverBalanceTopupId: item.driverBalanceTopupId || ""
    });
    setChatRows([]);
  };

  const sendToServer = async (action: string, routeKey: RouteKey027L, extra: Record<string, unknown> = {}) => {
    const path = SERVER_PATHS_027L[routeKey];
    setBusyAction(action);
    try {
      const response = await fetch(`${base027L(config)}${path}`, {
        method: "POST",
        headers: headers027L(config),
        body: JSON.stringify({
          search,
          complaintGlobalId: openedId,
          activeCase,
          selectedCurrency,
          operatorName,
          contactResult,
          proofRequest,
          routeCheck,
          paymentCheck,
          cancelCheck,
          waitCheck,
          decision,
          appealReason,
          transferReason,
          officialPassengerReply,
          officialDriverReply,
          passengerMessage,
          driverMessage,
          stateFilter,
          riskFilter,
          ...extra
        })
      });
      const text = await response.text();
      const payload = readJson027L(text);
      const event: ServerLog027L = {
        at: now027L(),
        action,
        path,
        code: response.status,
        ok: response.ok,
        operator: operatorName || "—",
        problem: response.ok ? "" : text.slice(0, 500),
        answer: text.slice(0, 500)
      };
      pushLog(event);
      setNotice(response.ok ? "Сервер подтвердил действие." : "Сервер вернул ошибку. Подробности в журнале.");

      if (response.ok && routeKey === "loadComplaintList") setQueue(normalizeList027L(payload));
      if (response.ok && routeKey === "openComplaintById") {
        const opened = normalizeCase027L(payload);
        if (opened) setActiveCase(opened);
      }
      if (response.ok && routeKey === "loadComplaintChat") setChatRows(normalizeChat027L(payload));
      if (response.ok && routeKey === "sendPassengerChat") setPassengerMessage("");
      if (response.ok && routeKey === "sendDriverChat") setDriverMessage("");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      pushLog({ at: now027L(), action, path, code: "сеть", ok: false, operator: operatorName || "—", problem: message, answer: "" });
      setNotice("Сетевая ошибка. Подробности в журнале.");
    } finally {
      setBusyAction("");
    }
  };

  const renderQueue = () => filteredQueue.length ? filteredQueue.map((item, index) => (
    <button key={item.complaintGlobalId || index} type="button" className="taxi027lQueueCard" onClick={() => openFromQueue(item)}>
      <b>{show027L(item.complaintGlobalId)}</b>
      <span>{show027L(item.state)} · {show027L(item.sla)}</span>
      <small>{show027L(item.reason)} · риск: {show027L(item.risk)}</small>
    </button>
  )) : <div className="taxi027lEmpty"><b>Список пуст</b><span>Нажмите «Загрузить список». Данные появляются только после ответа сервера.</span></div>;

  return (
    <section className="taxi027lShell" data-admin-ui-027l-active-complaints-core={ADMIN_UI_027L_ACTIVE_COMPLAINTS_CORE} data-complaints-active-server-functions-only="ready">
      <header className="taxi027lTop">
        <div>
          <span>Жалобы и обращения</span>
          <h2>Активный центр обработки</h2>
          <p>Все действия отправляются на сервер. Подтверждение появляется только после ответа сервера.</p>
        </div>
        <div className="taxi027lTopState">
          <strong>{busyAction || "готов к работе"}</strong>
          <small>{lastLog ? `${lastLog.action} · ${lastLog.code}` : "журнал сервера пуст"}</small>
        </div>
      </header>

      <section className="taxi027lSearch" data-global-complaint-search-by-all-identifiers="ready">
        <input value={search.complaintGlobalId} onChange={(e) => updateSearch("complaintGlobalId", e.target.value)} placeholder="Номер жалобы" />
        <input value={search.orderGlobalId} onChange={(e) => updateSearch("orderGlobalId", e.target.value)} placeholder="Номер заказа" />
        <input value={search.tripGlobalId} onChange={(e) => updateSearch("tripGlobalId", e.target.value)} placeholder="Номер поездки" />
        <input value={search.passengerId} onChange={(e) => updateSearch("passengerId", e.target.value)} placeholder="Номер пассажира" />
        <input value={search.driverId} onChange={(e) => updateSearch("driverId", e.target.value)} placeholder="Номер водителя" />
        <input value={search.driverBalanceTopupId} onChange={(e) => updateSearch("driverBalanceTopupId", e.target.value)} placeholder="Номер пополнения водителя" />
        <button type="button" onClick={() => void sendToServer("Открыть жалобу", "openComplaintById")} disabled={busyAction !== ""}>Открыть жалобу</button>
      </section>

      <div className="taxi027lGrid">
        <aside className="taxi027lQueue" data-incoming-complaints-list-from-server="ready">
          <div className="taxi027lPanelHead">
            <div><span>Входящие</span><h3>Список жалоб</h3></div>
            <button type="button" onClick={() => void sendToServer("Загрузить список жалоб", "loadComplaintList")} disabled={busyAction !== ""}>Загрузить</button>
          </div>
          <div className="taxi027lFilters">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>{STATE_FILTERS_027L.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>{RISK_FILTERS_027L.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <div className="taxi027lQueueList">{renderQueue()}</div>
        </aside>

        <main className="taxi027lMain">
          <section className="taxi027lPassport" data-complaint-passport-global-rider-driver-topup-order-trip="ready">
            <div className="taxi027lCaseTitle">
              <div><span>Открытое дело</span><h3>{openedId || "жалоба не открыта"}</h3></div>
              <button type="button" onClick={() => void sendToServer("Принять жалобу в работу", "acceptComplaint")} disabled={busyAction !== ""}>Принять в работу</button>
            </div>
            <div className="taxi027lIds">
              <div><span>Номер пассажира</span><b>{show027L(activeCase?.passengerId || search.passengerId)}</b></div>
              <div><span>Номер водителя</span><b>{show027L(activeCase?.driverId || search.driverId)}</b></div>
              <div><span>Номер пополнения водителя</span><b>{show027L(activeCase?.driverBalanceTopupId || search.driverBalanceTopupId)}</b></div>
              <div><span>Номер заказа</span><b>{show027L(activeCase?.orderGlobalId || search.orderGlobalId)}</b></div>
              <div><span>Номер поездки</span><b>{show027L(activeCase?.tripGlobalId || search.tripGlobalId)}</b></div>
              <div><span>Источник</span><b>{show027L(activeCase?.source)}</b></div>
              <div><span>Страна / город</span><b>{show027L(activeCase?.country)} / {show027L(activeCase?.city)}</b></div>
              <div><span>Сумма / валюта</span><b>{show027L(activeCase?.amount)} {activeCurrency}</b></div>
            </div>
            <div className="taxi027lCurrency" data-dynamic-currency-list-selection="ready">
              <input value={currencyInput} onChange={(e) => setCurrencyInput(e.target.value)} placeholder="Добавить валюту" />
              <button type="button" onClick={addCurrency} disabled={busyAction !== ""}>Добавить валюту</button>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                <option value="">Выбрать валюту</option>
                {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </div>
          </section>

          <section className="taxi027lSteps" data-clear-operator-resolution-process="ready">
            {PROCESS_STEPS_027L.map((step, index) => <button type="button" key={step} className={index === 0 ? "active" : ""} onClick={() => void sendToServer(step, index === 0 ? "acceptComplaint" : index === 1 ? "saveContactResult" : index === 2 ? "saveRouteCheck" : index === 3 ? "saveDecision" : index === 4 ? "sendPassengerOfficialReply" : "closeComplaint")} disabled={busyAction !== ""}>{step}</button>)}
          </section>

          <section className="taxi027lChat" data-main-complaint-chat-by-global-id="ready">
            <div className="taxi027lPanelHead">
              <div><span>Главное общение</span><h3>Чат обращения</h3><p>Загружается по глобальному номеру жалобы.</p></div>
              <button type="button" onClick={() => void sendToServer("Загрузить чат", "loadComplaintChat")} disabled={busyAction !== ""}>Загрузить чат</button>
            </div>
            <div className="taxi027lMessages">
              {chatRows.length ? chatRows.map((message, index) => (
                <article key={message.id || index}>
                  <strong>{show027L(message.from)} → {show027L(message.to)}</strong>
                  <span>{show027L(message.body)}</span>
                  <small>{show027L(message.at)} · {show027L(message.state)}</small>
                </article>
              )) : <div className="taxi027lEmpty"><b>Чат не загружен</b><span>Нажмите «Загрузить чат».</span></div>}
            </div>
            <div className="taxi027lChatSend">
              <textarea value={passengerMessage} onChange={(e) => setPassengerMessage(e.target.value)} placeholder="Сообщение пассажиру" />
              <button type="button" onClick={() => void sendToServer("Отправить пассажиру", "sendPassengerChat")} disabled={busyAction !== ""}>Отправить пассажиру</button>
              <textarea value={driverMessage} onChange={(e) => setDriverMessage(e.target.value)} placeholder="Сообщение водителю" />
              <button type="button" onClick={() => void sendToServer("Отправить водителю", "sendDriverChat")} disabled={busyAction !== ""}>Отправить водителю</button>
            </div>
          </section>

          <section className="taxi027lWork" data-real-checks-decision-replies="ready">
            <article><h4>Связь</h4><textarea value={contactResult} onChange={(e) => setContactResult(e.target.value)} placeholder="Результат связи" /><button type="button" onClick={() => void sendToServer("Сохранить связь", "saveContactResult")} disabled={busyAction !== ""}>Сохранить связь</button></article>
            <article><h4>Доказательства</h4><textarea value={proofRequest} onChange={(e) => setProofRequest(e.target.value)} placeholder="Что запросить" /><button type="button" onClick={() => void sendToServer("Запросить доказательства", "requestProof")} disabled={busyAction !== ""}>Запросить доказательства</button></article>
            <article><h4>Маршрут</h4><textarea value={routeCheck} onChange={(e) => setRouteCheck(e.target.value)} placeholder="Проверка маршрута" /><button type="button" onClick={() => void sendToServer("Сохранить маршрут", "saveRouteCheck")} disabled={busyAction !== ""}>Сохранить маршрут</button></article>
            <article><h4>Оплата</h4><textarea value={paymentCheck} onChange={(e) => setPaymentCheck(e.target.value)} placeholder="Проверка оплаты" /><button type="button" onClick={() => void sendToServer("Сохранить оплату", "savePaymentCheck")} disabled={busyAction !== ""}>Сохранить оплату</button></article>
            <article><h4>Отмена</h4><textarea value={cancelCheck} onChange={(e) => setCancelCheck(e.target.value)} placeholder="Проверка отмены" /><button type="button" onClick={() => void sendToServer("Сохранить отмену", "saveCancelCheck")} disabled={busyAction !== ""}>Сохранить отмену</button></article>
            <article><h4>Ожидание</h4><textarea value={waitCheck} onChange={(e) => setWaitCheck(e.target.value)} placeholder="Проверка ожидания" /><button type="button" onClick={() => void sendToServer("Сохранить ожидание", "saveWaitCheck")} disabled={busyAction !== ""}>Сохранить ожидание</button></article>
          </section>
        </main>

        <aside className="taxi027lActions" data-active-operator-actions-server-only="ready">
          <h3>Действия</h3>
          <button type="button" onClick={() => void sendToServer("Позвонить пассажиру", "saveContactResult", { contactType: "passenger_call" })} disabled={busyAction !== ""}>Позвонить пассажиру</button>
          <button type="button" onClick={() => void sendToServer("Позвонить водителю", "saveContactResult", { contactType: "driver_call" })} disabled={busyAction !== ""}>Позвонить водителю</button>
          <textarea value={decision} onChange={(e) => setDecision(e.target.value)} placeholder="Решение" />
          <button type="button" onClick={() => void sendToServer("Сохранить решение", "saveDecision")} disabled={busyAction !== ""}>Сохранить решение</button>
          <textarea value={officialPassengerReply} onChange={(e) => setOfficialPassengerReply(e.target.value)} placeholder="Официальный ответ пассажиру" />
          <button type="button" onClick={() => void sendToServer("Ответ пассажиру", "sendPassengerOfficialReply")} disabled={busyAction !== ""}>Ответ пассажиру</button>
          <textarea value={officialDriverReply} onChange={(e) => setOfficialDriverReply(e.target.value)} placeholder="Официальный ответ водителю" />
          <button type="button" onClick={() => void sendToServer("Ответ водителю", "sendDriverOfficialReply")} disabled={busyAction !== ""}>Ответ водителю</button>
          <textarea value={transferReason} onChange={(e) => setTransferReason(e.target.value)} placeholder="Причина передачи" />
          <button type="button" onClick={() => void sendToServer("Передать старшему", "escalateSenior")} disabled={busyAction !== ""}>Передать старшему</button>
          <button type="button" onClick={() => void sendToServer("Передать владельцу", "escalateOwner")} disabled={busyAction !== ""}>Передать владельцу</button>
          <textarea value={appealReason} onChange={(e) => setAppealReason(e.target.value)} placeholder="Причина апелляции" />
          <button type="button" onClick={() => void sendToServer("Открыть апелляцию", "openAppeal")} disabled={busyAction !== ""}>Открыть апелляцию</button>
          <button type="button" onClick={() => void sendToServer("Закрыть жалобу", "closeComplaint")} disabled={busyAction !== ""}>Закрыть жалобу</button>
        </aside>
      </div>

      <footer className="taxi027lJournal" data-server-journal-path-code-problem-operator-time="ready">
        <div className="taxi027lPanelHead"><div><span>Журнал сервера</span><h3>Путь, код, ошибка, оператор, время</h3></div><input value={operatorName} onChange={(e) => setOperatorName(e.target.value)} placeholder="оператор" /></div>
        <div className="taxi027lEvents">
          {serverLog.length ? serverLog.map((event, index) => (
            <article key={`${event.at}-${index}`} className={event.ok ? "ok" : "bad"}>
              <strong>{event.action}</strong>
              <span>серверный путь: {event.path}</span>
              <span>код ответа: {event.code}</span>
              <span>оператор: {event.operator}</span>
              <span>время: {event.at}</span>
              {event.problem ? <em>ошибка: {event.problem}</em> : <em>ответ: {event.answer || "сервер подтвердил действие"}</em>}
            </article>
          )) : <div className="taxi027lEmpty"><b>Журнал пуст</b><span>Нажмите любое действие. Результат появится после ответа сервера.</span></div>}
        </div>
      </footer>
    </section>
  );
}
