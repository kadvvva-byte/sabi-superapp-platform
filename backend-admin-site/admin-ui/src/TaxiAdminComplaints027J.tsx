import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027j.css";

type Props027J = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ServerEvent027J = { at: string; action: string; route: string; status: number | string; ok: boolean; error: string; operator: string; response: string };
type ChatMessage027J = { id?: string; at?: string; from?: string; to?: string; body?: string; status?: string };
type ComplaintCase027J = {
  complaintGlobalId?: string;
  complaintSource?: string;
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
  nextAction?: string;
};
type Search027J = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
};
type RouteKey027J = keyof typeof SERVER_ROUTES_027J;

const ADMIN_UI_027J_ACTIVE_COMPLAINTS_NO_FAKE = "027J_ACTIVE_COMPLAINT_FUNCTIONS_NO_FAKE";

const SERVER_ROUTES_027J = {
  loadComplaintList: "/api/admin/taxi/complaints/list",
  openComplaintById: "/api/admin/taxi/complaints/open-by-id",
  loadComplaintChat: "/api/admin/taxi/complaints/chat/load",
  sendPassengerChat: "/api/admin/taxi/complaints/chat/send-passenger",
  sendDriverChat: "/api/admin/taxi/complaints/chat/send-driver",
  acceptComplaint: "/api/admin/taxi/complaints/accept",
  saveContactResult: "/api/admin/taxi/complaints/contact/save-result",
  requestEvidence: "/api/admin/taxi/complaints/evidence/request",
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

const PROCESS027J = ["Принять", "Связаться", "Проверить", "Решить", "Ответить", "Закрыть / апелляция"];
const STATUS_FILTERS027J = ["all", "новая", "срочная", "ждёт связи", "ждёт доказательств", "проверка", "решение", "апелляция", "закрыта"];
const RISK_FILTERS027J = ["all", "низкий", "средний", "высокий", "критический"];

const emptySearch027J: Search027J = {
  complaintGlobalId: "",
  orderGlobalId: "",
  tripGlobalId: "",
  passengerId: "",
  driverId: "",
  driverBalanceTopupId: ""
};

function base027J(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027J(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function now027J(): string {
  return new Date().toISOString();
}

function value027J(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "—";
}

function safeJson027J(text: string): unknown {
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

function normalizeList027J(payload: unknown): ComplaintCase027J[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { items?: unknown; complaints?: unknown; queue?: unknown; list?: unknown };
  const raw = Array.isArray(data.items) ? data.items : Array.isArray(data.complaints) ? data.complaints : Array.isArray(data.queue) ? data.queue : Array.isArray(data.list) ? data.list : [];
  return raw.filter((item): item is ComplaintCase027J => Boolean(item && typeof item === "object"));
}

function normalizeCase027J(payload: unknown): ComplaintCase027J | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { complaint?: unknown; case?: unknown; item?: unknown };
  const raw = data.complaint || data.case || data.item || payload;
  return raw && typeof raw === "object" ? (raw as ComplaintCase027J) : null;
}

function normalizeChat027J(payload: unknown): ChatMessage027J[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { messages?: unknown; chat?: unknown; items?: unknown };
  const raw = Array.isArray(data.messages) ? data.messages : Array.isArray(data.chat) ? data.chat : Array.isArray(data.items) ? data.items : [];
  return raw.filter((item): item is ChatMessage027J => Boolean(item && typeof item === "object"));
}

export function TaxiAdminComplaints027J({ config, setNotice }: Props027J) {
  const [search, setSearch] = useState<Search027J>(emptySearch027J);
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [queue, setQueue] = useState<ComplaintCase027J[]>([]);
  const [activeCase, setActiveCase] = useState<ComplaintCase027J | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage027J[]>([]);
  const [passengerMessage, setPassengerMessage] = useState("");
  const [driverMessage, setDriverMessage] = useState("");
  const [officialPassengerReply, setOfficialPassengerReply] = useState("");
  const [officialDriverReply, setOfficialDriverReply] = useState("");
  const [contactResult, setContactResult] = useState("");
  const [evidenceRequest, setEvidenceRequest] = useState("");
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
  const [serverEvents, setServerEvents] = useState<ServerEvent027J[]>([]);

  const filteredQueue = useMemo(() => queue.filter((item) => {
    const statusOk = statusFilter === "all" || String(item.status || "").toLowerCase() === statusFilter;
    const riskOk = riskFilter === "all" || String(item.risk || "").toLowerCase() === riskFilter;
    return statusOk && riskOk;
  }), [queue, riskFilter, statusFilter]);

  const lastEvent = serverEvents[0];
  const activeCurrency = selectedCurrency || activeCase?.currency || "—";
  const hasCase = Boolean(activeCase?.complaintGlobalId || search.complaintGlobalId);

  const updateSearch = (key: keyof Search027J, value: string) => setSearch((prev) => ({ ...prev, [key]: value }));
  const pushEvent = (event: ServerEvent027J) => setServerEvents((prev) => [event, ...prev].slice(0, 30));

  const addCurrency = () => {
    const value = currencyInput.trim().toUpperCase();
    if (!value) return;
    setCurrencyList((prev) => prev.includes(value) ? prev : [...prev, value]);
    setSelectedCurrency(value);
    setCurrencyInput("");
  };

  const selectQueueItem = (item: ComplaintCase027J) => {
    setActiveCase(item);
    setSearch({
      complaintGlobalId: item.complaintGlobalId || "",
      orderGlobalId: item.orderGlobalId || "",
      tripGlobalId: item.tripGlobalId || "",
      passengerId: item.passengerId || "",
      driverId: item.driverId || "",
      driverBalanceTopupId: item.driverBalanceTopupId || ""
    });
    setChatMessages([]);
  };

  const runAction = async (action: string, routeKey: RouteKey027J, extra: Record<string, unknown> = {}) => {
    const route = SERVER_ROUTES_027J[routeKey];
    const needsCase = !["loadComplaintList", "openComplaintById"].includes(routeKey);
    const complaintId = activeCase?.complaintGlobalId || search.complaintGlobalId.trim();
    if (needsCase && !complaintId) {
      const event: ServerEvent027J = { at: now027J(), action, route, status: "не отправлено", ok: false, error: "Сначала откройте жалобу по глобальному номеру.", operator: operatorName || "—", response: "" };
      pushEvent(event);
      setNotice(event.error);
      return;
    }

    setBusyAction(action);
    try {
      const response = await fetch(`${base027J(config)}${route}`, {
        method: "POST",
        headers: headers027J(config),
        body: JSON.stringify({
          search,
          complaintGlobalId: complaintId,
          activeCase,
          selectedCurrency,
          operatorName,
          contactResult,
          evidenceRequest,
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
          statusFilter,
          riskFilter,
          ...extra
        })
      });
      const text = await response.text();
      const payload = safeJson027J(text);
      const event: ServerEvent027J = {
        at: now027J(),
        action,
        route,
        status: response.status,
        ok: response.ok,
        error: response.ok ? "" : text.slice(0, 500),
        operator: operatorName || "—",
        response: text.slice(0, 500)
      };
      pushEvent(event);
      setNotice(response.ok ? "Сервер принял запрос." : "Сервер вернул ошибку. Смотрите журнал сервера.");

      if (response.ok && routeKey === "loadComplaintList") setQueue(normalizeList027J(payload));
      if (response.ok && routeKey === "openComplaintById") {
        const opened = normalizeCase027J(payload);
        if (opened) setActiveCase(opened);
      }
      if (response.ok && routeKey === "loadComplaintChat") setChatMessages(normalizeChat027J(payload));
      if (response.ok && (routeKey === "sendPassengerChat" || routeKey === "sendDriverChat")) {
        await runAction("Обновить чат после отправки", "loadComplaintChat");
        if (routeKey === "sendPassengerChat") setPassengerMessage("");
        if (routeKey === "sendDriverChat") setDriverMessage("");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "network_error";
      pushEvent({ at: now027J(), action, route, status: "ошибка сети", ok: false, error: message, operator: operatorName || "—", response: "" });
      setNotice("Ошибка сети. Успех не установлен.");
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="taxi027jShell" data-admin-ui-027j-active-complaints-no-fake={ADMIN_UI_027J_ACTIVE_COMPLAINTS_NO_FAKE} data-complaints-active-server-functions-only="ready">
      <header className="taxi027jTop" data-complaints-global-entry-point="ready">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Профессиональный центр обработки</h2>
          <p>Главное: поступившие жалобы, чат обращения, глобальные номера и действия только через сервер. Локальный успех запрещён.</p>
        </div>
        <div className="taxi027jState">
          <strong>{lastEvent ? (lastEvent.ok ? "Сервер ответил" : "Ошибка сервера") : "Ожидает сервер"}</strong>
          <small>{lastEvent ? `${lastEvent.status} · ${lastEvent.route}` : "Сначала загрузите список или откройте жалобу по номеру"}</small>
        </div>
      </header>

      <div className="taxi027jSearch" data-complaints-global-search-by-all-real-ids="ready">
        <input value={search.complaintGlobalId} onChange={(e) => updateSearch("complaintGlobalId", e.target.value)} placeholder="Глобальный номер жалобы" />
        <input value={search.orderGlobalId} onChange={(e) => updateSearch("orderGlobalId", e.target.value)} placeholder="Номер заказа" />
        <input value={search.tripGlobalId} onChange={(e) => updateSearch("tripGlobalId", e.target.value)} placeholder="Номер поездки" />
        <input value={search.passengerId} onChange={(e) => updateSearch("passengerId", e.target.value)} placeholder="Номер пассажира" />
        <input value={search.driverId} onChange={(e) => updateSearch("driverId", e.target.value)} placeholder="Номер водителя" />
        <input value={search.driverBalanceTopupId} onChange={(e) => updateSearch("driverBalanceTopupId", e.target.value)} placeholder="Номер пополнения водителя" />
        <button type="button" onClick={() => void runAction("Открыть жалобу по номеру", "openComplaintById")} disabled={busyAction !== ""}>Открыть жалобу</button>
      </div>

      <div className="taxi027jLayout">
        <aside className="taxi027jInbox" data-complaints-main-incoming-list-from-server="ready">
          <div className="taxi027jPanelHead">
            <div><span>Главное</span><h3>Список поступивших жалоб</h3></div>
            <button type="button" onClick={() => void runAction("Загрузить список жалоб", "loadComplaintList")} disabled={busyAction !== ""}>Загрузить</button>
          </div>
          <div className="taxi027jFilters">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>{STATUS_FILTERS027J.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>{RISK_FILTERS027J.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <div className="taxi027jQueue" data-complaints-no-demo-list="server-only">
            {filteredQueue.length ? filteredQueue.map((item, index) => (
              <button key={`${item.complaintGlobalId || index}`} type="button" className={activeCase?.complaintGlobalId === item.complaintGlobalId ? "active" : ""} onClick={() => selectQueueItem(item)}>
                <strong>{value027J(item.complaintGlobalId)}</strong>
                <span>{value027J(item.reason)}</span>
                <small>{value027J(item.status)} · SLA {value027J(item.sla)} · риск {value027J(item.risk)}</small>
              </button>
            )) : (
              <div className="taxi027jEmpty">
                <strong>Список не загружен</strong>
                <span>Нажмите “Загрузить”. Пустые или поддельные жалобы здесь не создаются.</span>
              </div>
            )}
          </div>
        </aside>

        <main className="taxi027jMain" data-complaints-single-case-and-chat-main="ready">
          <section className="taxi027jCaseCard" data-complaints-main-case-passport-with-driver-topup-id="ready">
            <div className="taxi027jCaseTitle">
              <div><span>Открытая жалоба</span><h3>{hasCase ? value027J(activeCase?.complaintGlobalId || search.complaintGlobalId) : "Дело не открыто"}</h3></div>
              <button type="button" onClick={() => void runAction("Принять жалобу в работу", "acceptComplaint")} disabled={busyAction !== "" || !hasCase}>Принять в работу</button>
            </div>
            <div className="taxi027jIdentityGrid">
              <div><span>Номер пассажира</span><strong>{value027J(activeCase?.passengerId || search.passengerId)}</strong></div>
              <div><span>Номер водителя</span><strong>{value027J(activeCase?.driverId || search.driverId)}</strong></div>
              <div><span>Номер пополнения водителя</span><strong>{value027J(activeCase?.driverBalanceTopupId || search.driverBalanceTopupId)}</strong></div>
              <div><span>Номер заказа</span><strong>{value027J(activeCase?.orderGlobalId || search.orderGlobalId)}</strong></div>
              <div><span>Номер поездки</span><strong>{value027J(activeCase?.tripGlobalId || search.tripGlobalId)}</strong></div>
              <div><span>Источник жалобы</span><strong>{value027J(activeCase?.complaintSource)}</strong></div>
              <div><span>Страна / город</span><strong>{value027J(activeCase?.country)} / {value027J(activeCase?.city)}</strong></div>
              <div><span>Сумма / валюта</span><strong>{value027J(activeCase?.amount)} {activeCurrency}</strong></div>
            </div>
            <div className="taxi027jCurrency" data-complaints-multi-currency-list-selection="ready">
              <input value={currencyInput} onChange={(e) => setCurrencyInput(e.target.value)} placeholder="Добавить валюту рынка" />
              <button type="button" onClick={addCurrency}>Добавить валюту</button>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                <option value="">Выбрать валюту</option>
                {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </div>
          </section>

          <section className="taxi027jProcess" data-complaints-clear-resolution-process="ready">
            {PROCESS027J.map((step, index) => <div key={step} className={index === 0 && hasCase ? "active" : ""}><b>{index + 1}</b><span>{step}</span></div>)}
          </section>

          <section className="taxi027jChat" data-complaints-main-chat-by-complaint-id="ready">
            <div className="taxi027jPanelHead">
              <div><span>Главное общение</span><h3>Чат обращения</h3><p>Сообщения загружаются только с сервера по номеру жалобы.</p></div>
              <button type="button" onClick={() => void runAction("Загрузить чат жалобы", "loadComplaintChat")} disabled={busyAction !== "" || !hasCase}>Загрузить чат</button>
            </div>
            <div className="taxi027jMessages">
              {chatMessages.length ? chatMessages.map((message, index) => (
                <article key={message.id || index}>
                  <strong>{value027J(message.from)} → {value027J(message.to)}</strong>
                  <span>{value027J(message.body)}</span>
                  <small>{value027J(message.at)} · {value027J(message.status)}</small>
                </article>
              )) : <div className="taxi027jEmpty"><strong>Чат не загружен</strong><span>Нажмите “Загрузить чат”. Поддельные сообщения не показываются.</span></div>}
            </div>
            <div className="taxi027jChatSend">
              <textarea value={passengerMessage} onChange={(e) => setPassengerMessage(e.target.value)} placeholder="Сообщение пассажиру" />
              <button type="button" onClick={() => void runAction("Отправить сообщение пассажиру", "sendPassengerChat")} disabled={busyAction !== "" || !hasCase}>Отправить пассажиру</button>
              <textarea value={driverMessage} onChange={(e) => setDriverMessage(e.target.value)} placeholder="Сообщение водителю" />
              <button type="button" onClick={() => void runAction("Отправить сообщение водителю", "sendDriverChat")} disabled={busyAction !== "" || !hasCase}>Отправить водителю</button>
            </div>
          </section>

          <section className="taxi027jChecks" data-complaints-real-checks-and-decision="ready">
            <div><label>Контакт</label><textarea value={contactResult} onChange={(e) => setContactResult(e.target.value)} placeholder="Результат связи с пассажиром и водителем" /><button type="button" onClick={() => void runAction("Сохранить результат связи", "saveContactResult")} disabled={busyAction !== "" || !hasCase}>Сохранить контакт</button></div>
            <div><label>Доказательства</label><textarea value={evidenceRequest} onChange={(e) => setEvidenceRequest(e.target.value)} placeholder="Какие доказательства запросить" /><button type="button" onClick={() => void runAction("Запросить доказательства", "requestEvidence")} disabled={busyAction !== "" || !hasCase}>Запросить доказательства</button></div>
            <div><label>Маршрут</label><textarea value={routeCheck} onChange={(e) => setRouteCheck(e.target.value)} placeholder="Проверка маршрута" /><button type="button" onClick={() => void runAction("Сохранить проверку маршрута", "saveRouteCheck")} disabled={busyAction !== "" || !hasCase}>Сохранить маршрут</button></div>
            <div><label>Оплата</label><textarea value={paymentCheck} onChange={(e) => setPaymentCheck(e.target.value)} placeholder="Проверка оплаты" /><button type="button" onClick={() => void runAction("Сохранить проверку оплаты", "savePaymentCheck")} disabled={busyAction !== "" || !hasCase}>Сохранить оплату</button></div>
            <div><label>Отмена</label><textarea value={cancelCheck} onChange={(e) => setCancelCheck(e.target.value)} placeholder="Проверка отмены" /><button type="button" onClick={() => void runAction("Сохранить проверку отмены", "saveCancelCheck")} disabled={busyAction !== "" || !hasCase}>Сохранить отмену</button></div>
            <div><label>Ожидание</label><textarea value={waitCheck} onChange={(e) => setWaitCheck(e.target.value)} placeholder="Проверка времени ожидания" /><button type="button" onClick={() => void runAction("Сохранить проверку ожидания", "saveWaitCheck")} disabled={busyAction !== "" || !hasCase}>Сохранить ожидание</button></div>
          </section>
        </main>

        <aside className="taxi027jActions" data-complaints-all-actions-call-server-no-fake="ready">
          <h3>Действия</h3>
          <button type="button" onClick={() => void runAction("Позвонить пассажиру", "saveContactResult", { contactType: "passenger_call" })} disabled={busyAction !== "" || !hasCase}>Позвонить пассажиру</button>
          <button type="button" onClick={() => void runAction("Позвонить водителю", "saveContactResult", { contactType: "driver_call" })} disabled={busyAction !== "" || !hasCase}>Позвонить водителю</button>
          <textarea value={decision} onChange={(e) => setDecision(e.target.value)} placeholder="Решение по жалобе" />
          <button type="button" onClick={() => void runAction("Сохранить решение", "saveDecision")} disabled={busyAction !== "" || !hasCase}>Сохранить решение</button>
          <textarea value={officialPassengerReply} onChange={(e) => setOfficialPassengerReply(e.target.value)} placeholder="Официальный ответ пассажиру" />
          <button type="button" onClick={() => void runAction("Отправить официальный ответ пассажиру", "sendPassengerOfficialReply")} disabled={busyAction !== "" || !hasCase}>Ответ пассажиру</button>
          <textarea value={officialDriverReply} onChange={(e) => setOfficialDriverReply(e.target.value)} placeholder="Официальный ответ водителю" />
          <button type="button" onClick={() => void runAction("Отправить официальный ответ водителю", "sendDriverOfficialReply")} disabled={busyAction !== "" || !hasCase}>Ответ водителю</button>
          <textarea value={transferReason} onChange={(e) => setTransferReason(e.target.value)} placeholder="Причина передачи" />
          <button type="button" onClick={() => void runAction("Передать старшему", "escalateSenior")} disabled={busyAction !== "" || !hasCase}>Передать старшему</button>
          <button type="button" onClick={() => void runAction("Передать владельцу", "escalateOwner")} disabled={busyAction !== "" || !hasCase}>Передать владельцу</button>
          <textarea value={appealReason} onChange={(e) => setAppealReason(e.target.value)} placeholder="Причина апелляции" />
          <button type="button" onClick={() => void runAction("Открыть апелляцию", "openAppeal")} disabled={busyAction !== "" || !hasCase}>Открыть апелляцию</button>
          <button type="button" onClick={() => void runAction("Закрыть жалобу", "closeComplaint")} disabled={busyAction !== "" || !hasCase}>Закрыть жалобу</button>
        </aside>
      </div>

      <footer className="taxi027jJournal" data-complaints-server-journal-route-status-error-operator-time="ready">
        <div className="taxi027jPanelHead"><div><span>Журнал сервера</span><h3>Каждое действие фиксируется только по ответу сервера</h3></div><input value={operatorName} onChange={(e) => setOperatorName(e.target.value)} placeholder="оператор" /></div>
        <div className="taxi027jEvents">
          {serverEvents.length ? serverEvents.map((event, index) => (
            <article key={`${event.at}-${index}`} className={event.ok ? "ok" : "bad"}>
              <strong>{event.action}</strong>
              <span>серверный путь: {event.route}</span>
              <span>статус: {event.status}</span>
              <span>оператор: {event.operator}</span>
              <span>время: {event.at}</span>
              {event.error ? <em>ошибка: {event.error}</em> : <em>ответ: {event.response || "сервер принял запрос"}</em>}
            </article>
          )) : <div className="taxi027jEmpty"><strong>Журнал пуст</strong><span>Нажмите действие. Успех появится только после ответа сервера.</span></div>}
        </div>
      </footer>
    </section>
  );
}
