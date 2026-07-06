import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027i.css";

type Props027I = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ComplaintSource027I = "мобильное приложение" | "чат поддержки" | "форма после поездки" | "звонок оператора" | "Sabi AI" | "не указано";
type ComplaintSummary027I = {
  complaintGlobalId?: string;
  status?: string;
  sla?: string;
  reason?: string;
  risk?: string;
  sourceChannel?: ComplaintSource027I | string;
  passengerId?: string;
  driverId?: string;
  driverBalanceTopupId?: string;
  openedAt?: string;
};
type ComplaintCase027I = ComplaintSummary027I & {
  orderGlobalId?: string;
  tripGlobalId?: string;
  market?: string;
  country?: string;
  city?: string;
  tariff?: string;
  amount?: string;
  currency?: string;
  nextStep?: string;
  assignedOperator?: string;
  issueSummary?: string;
};
type ChatMessage027I = { id?: string; at?: string; authorType?: string; authorId?: string; text?: string; deliveryStatus?: string };
type ServerEvent027I = { at: string; action: string; route: string; status: number | string; ok: boolean; error: string; operator: string };
type Search027I = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
};
type RouteKey027I = keyof typeof SERVER_ROUTES_027I;

const ADMIN_UI_027I_PREMIUM_COMPLAINTS_INTAKE_CHAT_MAIN = "027I_PREMIUM_MAIN_COMPLAINT_CENTER_INBOX_CHAT_NUMBER";

const SERVER_ROUTES_027I = {
  loadIncoming: "/api/admin/taxi/complaints/global/incoming-list",
  openCase: "/api/admin/taxi/complaints/global/open-by-id",
  loadChat: "/api/admin/taxi/complaints/global/chat/load",
  sendPassengerChat: "/api/admin/taxi/complaints/global/chat/passenger/send",
  sendDriverChat: "/api/admin/taxi/complaints/global/chat/driver/send",
  acceptCase: "/api/admin/taxi/complaints/global/workflow/accept",
  requestEvidence: "/api/admin/taxi/complaints/global/evidence/request",
  saveCheck: "/api/admin/taxi/complaints/global/check/save",
  saveDecision: "/api/admin/taxi/complaints/global/decision/save",
  sendOfficialReply: "/api/admin/taxi/complaints/global/reply/send-official",
  escalateSenior: "/api/admin/taxi/complaints/global/escalate/senior",
  escalateOwner: "/api/admin/taxi/complaints/global/escalate/owner",
  openAppeal: "/api/admin/taxi/complaints/global/appeal/open",
  closeCase: "/api/admin/taxi/complaints/global/close"
} as const;

const EMPTY_SEARCH_027I: Search027I = {
  complaintGlobalId: "",
  orderGlobalId: "",
  tripGlobalId: "",
  passengerId: "",
  driverId: "",
  driverBalanceTopupId: ""
};

const STATUS_FILTERS_027I = ["all", "новая", "срочная", "ждёт связи", "ждёт доказательств", "проверка", "решение", "апелляция", "закрыта"];
const RISK_FILTERS_027I = ["all", "низкий", "средний", "высокий", "критический"];
const SOURCE_FILTERS_027I = ["all", "мобильное приложение", "чат поддержки", "форма после поездки", "звонок оператора", "Sabi AI"];
const FLOW_STEPS_027I = [
  { title: "Принять", route: "acceptCase" as RouteKey027I, hint: "закрепить дело" },
  { title: "Связаться", route: "loadChat" as RouteKey027I, hint: "открыть чат" },
  { title: "Проверить", route: "saveCheck" as RouteKey027I, hint: "факты и маршрут" },
  { title: "Решить", route: "saveDecision" as RouteKey027I, hint: "решение без фейка" },
  { title: "Ответить", route: "sendOfficialReply" as RouteKey027I, hint: "официально" },
  { title: "Закрыть", route: "closeCase" as RouteKey027I, hint: "или апелляция" }
];

function normalizeBase027I(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}
function headers027I(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}
function now027I(): string { return new Date().toISOString(); }
function show027I(value: unknown): string { return typeof value === "string" && value.trim() ? value : "—"; }
function normalizeIncoming027I(payload: unknown): ComplaintSummary027I[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { items?: unknown; complaints?: unknown; queue?: unknown; incoming?: unknown };
  const raw = Array.isArray(data.items) ? data.items : Array.isArray(data.complaints) ? data.complaints : Array.isArray(data.queue) ? data.queue : Array.isArray(data.incoming) ? data.incoming : [];
  return raw.filter((item): item is ComplaintSummary027I => Boolean(item && typeof item === "object"));
}
function normalizeCase027I(payload: unknown): ComplaintCase027I | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { case?: unknown; complaint?: unknown; item?: unknown };
  const raw = data.case || data.complaint || data.item || payload;
  return raw && typeof raw === "object" ? (raw as ComplaintCase027I) : null;
}
function normalizeChat027I(payload: unknown): ChatMessage027I[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { messages?: unknown; chat?: unknown; items?: unknown };
  const raw = Array.isArray(data.messages) ? data.messages : Array.isArray(data.chat) ? data.chat : Array.isArray(data.items) ? data.items : [];
  return raw.filter((item): item is ChatMessage027I => Boolean(item && typeof item === "object"));
}

export function TaxiAdminComplaints027I({ config, setNotice }: Props027I) {
  const [search, setSearch] = useState<Search027I>(EMPTY_SEARCH_027I);
  const [incoming, setIncoming] = useState<ComplaintSummary027I[]>([]);
  const [selectedCase, setSelectedCase] = useState<ComplaintCase027I | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage027I[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [quickSearch, setQuickSearch] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [chatText, setChatText] = useState("");
  const [evidenceText, setEvidenceText] = useState("");
  const [checkText, setCheckText] = useState("");
  const [decisionText, setDecisionText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [handoffText, setHandoffText] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [serverEvents, setServerEvents] = useState<ServerEvent027I[]>([]);
  const [busyAction, setBusyAction] = useState("");

  const activeCurrency = selectedCurrency || selectedCase?.currency || "—";
  const hasCase = Boolean(selectedCase?.complaintGlobalId);
  const lastEvent = serverEvents[0];

  const filteredIncoming = useMemo(() => {
    const query = quickSearch.trim().toLowerCase();
    return incoming.filter((item) => {
      const statusOk = statusFilter === "all" || String(item.status || "").toLowerCase() === statusFilter;
      const riskOk = riskFilter === "all" || String(item.risk || "").toLowerCase() === riskFilter;
      const sourceOk = sourceFilter === "all" || String(item.sourceChannel || "").toLowerCase() === sourceFilter.toLowerCase();
      const queryOk = !query || [item.complaintGlobalId, item.passengerId, item.driverId, item.driverBalanceTopupId, item.reason, item.sourceChannel].some((value) => String(value || "").toLowerCase().includes(query));
      return statusOk && riskOk && sourceOk && queryOk;
    });
  }, [incoming, quickSearch, riskFilter, sourceFilter, statusFilter]);

  const setSearchValue = (key: keyof Search027I, value: string) => setSearch((prev) => ({ ...prev, [key]: value }));
  const addEvent = (event: ServerEvent027I) => setServerEvents((prev) => [event, ...prev].slice(0, 30));
  const openFromIncoming = (item: ComplaintSummary027I) => {
    setSelectedCase(item);
    setSearch((prev) => ({ ...prev, complaintGlobalId: item.complaintGlobalId || "", passengerId: item.passengerId || "", driverId: item.driverId || "", driverBalanceTopupId: item.driverBalanceTopupId || "" }));
  };
  const addCurrency = () => {
    const value = currencyInput.trim().toUpperCase();
    if (!value) return;
    setCurrencyList((prev) => prev.includes(value) ? prev : [...prev, value]);
    setSelectedCurrency(value);
    setCurrencyInput("");
  };

  const runServer = async (action: string, routeKey: RouteKey027I, extra: Record<string, unknown> = {}) => {
    const route = SERVER_ROUTES_027I[routeKey];
    const requiresCase = !["loadIncoming", "openCase"].includes(routeKey);
    if (requiresCase && !selectedCase?.complaintGlobalId) {
      const error = "Сначала откройте жалобу по глобальному номеру или из списка входящих.";
      addEvent({ at: now027I(), action, route, status: "не отправлено", ok: false, error, operator: operatorName || "—" });
      setNotice(error);
      return;
    }
    setBusyAction(action);
    try {
      const response = await fetch(`${normalizeBase027I(config)}${route}`, {
        method: "POST",
        headers: headers027I(config),
        body: JSON.stringify({
          search,
          selectedCase,
          selectedCurrency,
          operatorName,
          chatText,
          evidenceText,
          checkText,
          decisionText,
          replyText,
          handoffText,
          ...extra
        })
      });
      const json = await response.json().catch(() => ({}));
      const message = String((json as { message?: unknown; error?: unknown }).message || (json as { message?: unknown; error?: unknown }).error || (response.ok ? "Сервер подтвердил действие." : "Сервер отклонил действие."));
      addEvent({ at: now027I(), action, route, status: response.status, ok: response.ok, error: response.ok ? "—" : message, operator: operatorName || "—" });
      setNotice(message);
      if (routeKey === "loadIncoming" && response.ok) setIncoming(normalizeIncoming027I(json));
      if (routeKey === "openCase" && response.ok) {
        const opened = normalizeCase027I(json);
        if (opened) setSelectedCase(opened);
      }
      if (routeKey === "loadChat" && response.ok) setChatMessages(normalizeChat027I(json));
      if (["sendPassengerChat", "sendDriverChat"].includes(routeKey) && response.ok) setChatText("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Сетевая ошибка.";
      addEvent({ at: now027I(), action, route, status: "ошибка сети", ok: false, error: message, operator: operatorName || "—" });
      setNotice(message);
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="taxi027iRoot" data-admin-ui-027i-premium-complaints-intake-chat-main={ADMIN_UI_027I_PREMIUM_COMPLAINTS_INTAKE_CHAT_MAIN}>
      <header className="taxi027iHeader" data-complaints-main-intake-header="ready">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Профессиональный центр обработки</h2>
          <p>Главное: список поступивших жалоб, открытое дело по глобальному номеру, чат обращения и журнал ответа сервера.</p>
        </div>
        <button type="button" onClick={() => void runServer("Загрузить список жалоб", "loadIncoming")}>{busyAction === "Загрузить список жалоб" ? "Загрузка" : "Загрузить список жалоб"}</button>
      </header>

      <section className="taxi027iGlobalSearch" data-complaints-global-intake-search="ready">
        <label><span>Номер жалобы</span><input value={search.complaintGlobalId} onChange={(e) => setSearchValue("complaintGlobalId", e.target.value)} placeholder="глобальный номер" /></label>
        <label><span>Номер заказа</span><input value={search.orderGlobalId} onChange={(e) => setSearchValue("orderGlobalId", e.target.value)} placeholder="Номер заказа" /></label>
        <label><span>Номер поездки</span><input value={search.tripGlobalId} onChange={(e) => setSearchValue("tripGlobalId", e.target.value)} placeholder="Номер поездки" /></label>
        <label><span>Номер пассажира</span><input value={search.passengerId} onChange={(e) => setSearchValue("passengerId", e.target.value)} placeholder="Номер пассажира" /></label>
        <label><span>Номер водителя</span><input value={search.driverId} onChange={(e) => setSearchValue("driverId", e.target.value)} placeholder="Номер водителя" /></label>
        <label><span>Номер пополнения</span><input value={search.driverBalanceTopupId} onChange={(e) => setSearchValue("driverBalanceTopupId", e.target.value)} placeholder="номер пополнения водителя" /></label>
        <button type="button" onClick={() => void runServer("Открыть дело", "openCase")}>Открыть дело</button>
      </section>

      <div className="taxi027iShell">
        <aside className="taxi027iIncoming" data-complaints-incoming-list-primary="ready">
          <div className="taxi027iPanelTitle">
            <span>Главное</span>
            <h3>Список жалоб</h3>
            <p>Жалобы поступают из приложения, чата поддержки, формы после поездки, звонка оператора и Саби ИИ.</p>
          </div>
          <div className="taxi027iFilters">
            <input value={quickSearch} onChange={(e) => setQuickSearch(e.target.value)} placeholder="поиск по номеру или причине" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>{STATUS_FILTERS_027I.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>{RISK_FILTERS_027I.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>{SOURCE_FILTERS_027I.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
          <div className="taxi027iIncomingList">
            {filteredIncoming.length ? filteredIncoming.map((item) => (
              <button key={item.complaintGlobalId || item.passengerId || item.driverId} type="button" className={selectedCase?.complaintGlobalId === item.complaintGlobalId ? "selected" : ""} onClick={() => openFromIncoming(item)}>
                <strong>{show027I(item.complaintGlobalId)}</strong>
                <span>{show027I(item.reason)}</span>
                <small>{show027I(item.status)} · {show027I(item.sla)} · риск: {show027I(item.risk)}</small>
                <em>{show027I(item.sourceChannel)}</em>
              </button>
            )) : (
              <div className="taxi027iEmptyList" data-complaints-no-fake-empty-incoming="ready">
                <strong>Список жалоб не загружен</strong>
                <span>Нажмите «Загрузить список жалоб». Если сервер вернёт пусто, интерфейс не создаёт поддельные жалобы.</span>
              </div>
            )}
          </div>
        </aside>

        <main className="taxi027iMainCase" data-complaints-main-case-and-chat="ready">
          <section className="taxi027iCaseHero" data-complaints-main-open-case-card="ready">
            <div>
              <span>Открытое дело</span>
              <h3>{hasCase ? show027I(selectedCase?.complaintGlobalId) : "Откройте жалобу из списка или по номеру"}</h3>
              <p>{hasCase ? show027I(selectedCase?.issueSummary || selectedCase?.reason) : "Центр не показывает поддельное дело. Главное появляется после ответа сервера."}</p>
            </div>
            <div className="taxi027iSlaBox"><strong>{show027I(selectedCase?.sla)}</strong><span>срок обработки</span></div>
          </section>

          <section className="taxi027iIdentity" data-complaints-case-identity-driver-rider-topup="ready">
            <article><span>Номер жалобы</span><strong>{show027I(selectedCase?.complaintGlobalId)}</strong></article>
            <article><span>Номер пассажира</span><strong>{show027I(selectedCase?.passengerId)}</strong></article>
            <article><span>Номер водителя</span><strong>{show027I(selectedCase?.driverId)}</strong></article>
            <article className="focus"><span>Номер пополнения водителя</span><strong>{show027I(selectedCase?.driverBalanceTopupId)}</strong></article>
            <article><span>Номер заказа</span><strong>{show027I(selectedCase?.orderGlobalId)}</strong></article>
            <article><span>Номер поездки</span><strong>{show027I(selectedCase?.tripGlobalId)}</strong></article>
            <article><span>Сумма / валюта</span><strong>{show027I(selectedCase?.amount)} {activeCurrency}</strong></article>
            <article><span>Страна / город</span><strong>{show027I(selectedCase?.country || selectedCase?.market)} / {show027I(selectedCase?.city)}</strong></article>
          </section>

          <section className="taxi027iCurrency" data-complaints-dynamic-currency-selection="ready">
            <span>Валюта дела</span>
            <input value={currencyInput} onChange={(e) => setCurrencyInput(e.target.value)} placeholder="код валюты из рынка" />
            <button type="button" onClick={addCurrency}>Добавить валюту</button>
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}><option value="">выбрать из списка</option>{currencyList.map((currency) => <option key={currency}>{currency}</option>)}</select>
          </section>

          <section className="taxi027iFlow" data-complaints-clear-next-step-flow="ready">
            {FLOW_STEPS_027I.map((step, index) => (
              <button key={step.title} type="button" onClick={() => void runServer(step.title, step.route)}>
                <b>{index + 1}</b><strong>{step.title}</strong><span>{step.hint}</span>
              </button>
            ))}
          </section>

          <section className="taxi027iChat" data-complaints-chat-workspace-primary="ready">
            <div className="taxi027iChatHead">
              <div><span>Главный канал</span><h3>Чат обращения</h3><p>Здесь видна переписка по жалобе. Сообщения загружаются с сервера по номеру жалобы.</p></div>
              <button type="button" onClick={() => void runServer("Загрузить чат", "loadChat")}>Загрузить чат</button>
            </div>
            <div className="taxi027iMessages">
              {chatMessages.length ? chatMessages.map((message) => (
                <article key={message.id || `${message.at}-${message.authorId}`}>
                  <span>{show027I(message.authorType)} · {show027I(message.authorId)} · {show027I(message.at)}</span>
                  <p>{show027I(message.text)}</p>
                  <small>{show027I(message.deliveryStatus)}</small>
                </article>
              )) : <div className="taxi027iEmptyChat">Чат не загружен. Нажмите “Загрузить чат”. Поддельные сообщения не создаются.</div>}
            </div>
            <textarea value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="ответ в чат по жалобе" />
            <div className="taxi027iChatButtons">
              <button type="button" onClick={() => void runServer("Отправить пассажиру в чат", "sendPassengerChat")}>Отправить пассажиру</button>
              <button type="button" onClick={() => void runServer("Отправить водителю в чат", "sendDriverChat")}>Отправить водителю</button>
            </div>
          </section>
        </main>

        <aside className="taxi027iActions" data-complaints-important-actions-only="ready">
          <section>
            <h3>Действия</h3>
            <button type="button" onClick={() => void runServer("Принять в работу", "acceptCase")}>Принять в работу</button>
            <button type="button" onClick={() => void runServer("Запросить доказательства", "requestEvidence")}>Запросить доказательства</button>
            <textarea value={evidenceText} onChange={(e) => setEvidenceText(e.target.value)} placeholder="что запросить" />
          </section>
          <section>
            <h3>Проверка и решение</h3>
            <textarea value={checkText} onChange={(e) => setCheckText(e.target.value)} placeholder="проверка маршрута, оплаты, отмены, ожидания" />
            <button type="button" onClick={() => void runServer("Сохранить проверку", "saveCheck")}>Сохранить проверку</button>
            <textarea value={decisionText} onChange={(e) => setDecisionText(e.target.value)} placeholder="решение и причина" />
            <button type="button" onClick={() => void runServer("Сохранить решение", "saveDecision")}>Сохранить решение</button>
          </section>
          <section>
            <h3>Официальный ответ</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="официальный ответ пассажиру и водителю" />
            <button type="button" onClick={() => void runServer("Отправить официальный ответ", "sendOfficialReply")}>Отправить официальный ответ</button>
          </section>
          <section>
            <h3>Передача</h3>
            <input value={operatorName} onChange={(e) => setOperatorName(e.target.value)} placeholder="оператор" />
            <textarea value={handoffText} onChange={(e) => setHandoffText(e.target.value)} placeholder="причина передачи или апелляции" />
            <button type="button" onClick={() => void runServer("Передать старшему", "escalateSenior")}>Передать старшему</button>
            <button type="button" onClick={() => void runServer("Передать владельцу", "escalateOwner")}>Передать владельцу</button>
            <button type="button" onClick={() => void runServer("Открыть апелляцию", "openAppeal")}>Открыть апелляцию</button>
            <button type="button" onClick={() => void runServer("Закрыть дело", "closeCase")}>Закрыть дело</button>
          </section>
        </aside>
      </div>

      <section className="taxi027iAudit" data-complaints-server-audit-log-primary="ready">
        <div><h3>Журнал сервера</h3><p>Фиксируется путь сервера, статус, ошибка, оператор и время. Успех не ставится локально.</p></div>
        <div className="taxi027iAuditRows">
          {(serverEvents.length ? serverEvents : [lastEvent]).filter(Boolean).slice(0, 6).map((event) => event && (
            <article key={`${event.at}-${event.action}`} className={event.ok ? "ok" : "bad"}>
              <strong>{event.action}</strong><span>статус: {event.status}</span><span>оператор: {event.operator}</span><span>время: {event.at}</span><small>{event.route}</small><em>{event.error}</em>
            </article>
          ))}
          {!serverEvents.length && <article className="bad"><strong>Ответа сервера ещё нет</strong><span>статус: —</span><span>оператор: —</span><small>действия не отправлялись</small><em>—</em></article>}
        </div>
      </section>
    </section>
  );
}
