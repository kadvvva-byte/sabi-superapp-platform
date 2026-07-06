import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027c.css";

type Props027C = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Risk027C = "низкий" | "средний" | "высокий" | "критический";
type QueueStatus027C = "новая" | "срочная" | "ждёт ответа" | "ждёт доказательств" | "апелляция" | "закрыта";
type BackendHistory027C = { at: string; action: string; route: string; ok: boolean; status: number | string; message: string; operator: string };
type ComplaintCase027C = {
  complaintId: string; orderId: string; tripId: string; client: string; driver: string; tariff: string; country: string; city: string; amount: string; reason: string; risk: Risk027C; status: QueueStatus027C; sla: string; operator: string;
};

const ADMIN_UI_027C_COMPLAINTS_CASE_CENTER = "027C_COMPLAINTS_CASE_CENTER_FULL_WORKFLOW_ONE_SCREEN_ONLY";

const ROUTES027C = {
  queue: "/api/admin/taxi/complaints/case-center/queue",
  openCase: "/api/admin/taxi/complaints/case-center/open-case",
  callClient: "/api/admin/taxi/complaints/case-center/contact/call-client",
  callDriver: "/api/admin/taxi/complaints/case-center/contact/call-driver",
  chatClient: "/api/admin/taxi/complaints/case-center/contact/chat-client",
  chatDriver: "/api/admin/taxi/complaints/case-center/contact/chat-driver",
  saveContactResult: "/api/admin/taxi/complaints/case-center/contact/save-result",
  scheduleContact: "/api/admin/taxi/complaints/case-center/contact/schedule-repeat",
  sendClientReply: "/api/admin/taxi/complaints/case-center/replies/send-client",
  sendDriverReply: "/api/admin/taxi/complaints/case-center/replies/send-driver",
  requestPhoto: "/api/admin/taxi/complaints/case-center/evidence/request-photo",
  requestMedia: "/api/admin/taxi/complaints/case-center/evidence/request-media-chat",
  verifyRoute: "/api/admin/taxi/complaints/case-center/evidence/verify-route",
  verifyCancel: "/api/admin/taxi/complaints/case-center/evidence/verify-cancel",
  verifyPayment: "/api/admin/taxi/complaints/case-center/evidence/verify-payment",
  verifyWaiting: "/api/admin/taxi/complaints/case-center/evidence/verify-waiting-time",
  buildEvidencePack: "/api/admin/taxi/complaints/case-center/evidence/build-pack",
  saveDecision: "/api/admin/taxi/complaints/case-center/decision/save",
  openAppeal: "/api/admin/taxi/complaints/case-center/appeal/open",
  saveAppealDecision: "/api/admin/taxi/complaints/case-center/appeal/save-decision",
  assignOperator: "/api/admin/taxi/complaints/case-center/assignment/operator",
  escalateSenior: "/api/admin/taxi/complaints/case-center/assignment/senior",
  escalateOwner: "/api/admin/taxi/complaints/case-center/assignment/owner",
  setDeadline: "/api/admin/taxi/complaints/case-center/assignment/deadline"
} as const;

const SAMPLE_QUEUE027C: ComplaintCase027C[] = [
  { complaintId: "CMP-live-1001", orderId: "ORD-live-8801", tripId: "TRIP-live-5501", client: "Клиент: ожидает ответ", driver: "Водитель: на связи", tariff: "Комфорт", country: "рынок из сервера", city: "город из сервера", amount: "сумма из заказа", reason: "Спор по отмене и ожиданию", risk: "высокий", status: "срочная", sla: "00:42", operator: "не назначен" },
  { complaintId: "CMP-live-1002", orderId: "ORD-live-8802", tripId: "TRIP-live-5502", client: "Клиент: просит компенсацию", driver: "Водитель: требуется объяснение", tariff: "Эконом", country: "рынок из сервера", city: "город из сервера", amount: "сумма из заказа", reason: "Нарушение маршрута", risk: "средний", status: "ждёт доказательств", sla: "02:10", operator: "оператор-1" },
  { complaintId: "CMP-live-1003", orderId: "ORD-live-8803", tripId: "TRIP-live-5503", client: "Клиент: апелляция", driver: "Водитель: ответил", tariff: "Бизнес", country: "рынок из сервера", city: "город из сервера", amount: "сумма из заказа", reason: "Оспаривание решения", risk: "критический", status: "апелляция", sla: "00:18", operator: "старший" }
];

const statusList027C: QueueStatus027C[] = ["новая", "срочная", "ждёт ответа", "ждёт доказательств", "апелляция", "закрыта"];
const riskList027C: Risk027C[] = ["низкий", "средний", "высокий", "критический"];
const decisionOptions027C = ["нет нарушения", "виноват водитель", "виноват клиент", "спорно", "нужна проверка старшего", "нужна проверка владельца"];
const evidenceItems027C = ["маршрут", "чат", "фото", "отмена", "оплата", "время ожидания"];

function base027C(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}
function headers027C(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}
function now027C(): string { return new Date().toISOString(); }

export function TaxiAdminComplaints027C({ language, config, setNotice }: Props027C) {
  const [queue, setQueue] = useState<ComplaintCase027C[]>(SAMPLE_QUEUE027C);
  const [selectedId, setSelectedId] = useState(queue[0]?.complaintId || "");
  const selected = queue.find((item) => item.complaintId === selectedId) || queue[0];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QueueStatus027C | "all">("all");
  const [countryFilter, setCountryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [operatorFilter, setOperatorFilter] = useState("");
  const [deadlineFilter, setDeadlineFilter] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [contactResult, setContactResult] = useState("");
  const [repeatContactAt, setRepeatContactAt] = useState("");
  const [clientReply, setClientReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const initialReplyTemplate027C = "neutral_official_reply";
  const [replyTemplate, setReplyTemplate] = useState(initialReplyTemplate027C);
  const [evidenceNote, setEvidenceNote] = useState("");
  const [decision, setDecision] = useState(decisionOptions027C[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [appealOwner, setAppealOwner] = useState("");
  const [appealDeadline, setAppealDeadline] = useState("");
  const [operator, setOperator] = useState("");
  const [handoffReason, setHandoffReason] = useState("");
  const [caseDeadline, setCaseDeadline] = useState("");
  const [busy, setBusy] = useState("");
  const [history, setHistory] = useState<BackendHistory027C[]>([]);
  const [lastResponse, setLastResponse] = useState<BackendHistory027C | null>(null);

  const filteredQueue = useMemo(() => queue.filter((item) => {
    const query = `${item.complaintId} ${item.orderId} ${item.tripId} ${item.client} ${item.driver} ${item.reason}`.toLowerCase();
    const matchesSearch = !search.trim() || query.includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCountry = !countryFilter.trim() || item.country.toLowerCase().includes(countryFilter.trim().toLowerCase());
    const matchesCity = !cityFilter.trim() || item.city.toLowerCase().includes(cityFilter.trim().toLowerCase());
    const matchesOperator = !operatorFilter.trim() || item.operator.toLowerCase().includes(operatorFilter.trim().toLowerCase());
    return matchesSearch && matchesStatus && matchesCountry && matchesCity && matchesOperator;
  }), [queue, search, statusFilter, countryFilter, cityFilter, operatorFilter]);

  const addCurrency = () => {
    const code = currencyInput.trim().toUpperCase();
    if (!code) return;
    setCurrencies((prev) => prev.includes(code) ? prev : [...prev, code]);
    setSelectedCurrency(code);
    setCurrencyInput("");
  };

  async function callBackend(action: string, route: string, payload: Record<string, unknown>) {
    setBusy(action);
    try {
      const response = await fetch(`${base027C(config)}${route}`, {
        method: "POST",
        headers: headers027C(config),
        body: JSON.stringify({
          complaintId: selected?.complaintId,
          orderId: selected?.orderId,
          tripId: selected?.tripId,
          selectedCurrency,
          marketCurrencyList: currencies,
          action,
          payload,
          uiStage: "complaints_case_center_027c"
        })
      });
      const json = await response.json().catch(() => ({}));
      const row: BackendHistory027C = {
        at: now027C(), action, route, ok: response.ok, status: response.status,
        message: String(json?.message || json?.error || (response.ok ? "сервер подтвердил действие" : "сервер отклонил действие")),
        operator: operator || "текущий оператор"
      };
      setLastResponse(row);
      setHistory((prev) => [row, ...prev].slice(0, 25));
      setNotice(response.ok ? "Сервер подтвердил действие" : "Сервер вернул ошибку — локальный успех не установлен");
    } catch (error) {
      const row: BackendHistory027C = { at: now027C(), action, route, ok: false, status: "network_error", message: error instanceof Error ? error.message : "network_error", operator: operator || "текущий оператор" };
      setLastResponse(row);
      setHistory((prev) => [row, ...prev].slice(0, 25));
      setNotice("Ошибка сети — локальный успех не установлен");
    } finally {
      setBusy("");
    }
  }

  function openCase(item: ComplaintCase027C) {
    setSelectedId(item.complaintId);
    void callBackend("Открыть дело", ROUTES027C.openCase, { complaintId: item.complaintId });
  }

  const caseStats = [
    ["SLA", selected?.sla || "—"], ["Риск", selected?.risk || "—"], ["Статус", selected?.status || "—"], ["Оператор", selected?.operator || "не назначен"]
  ];

  return (
    <section className="complaints027c" data-admin-ui-027c-complaints-case-center={ADMIN_UI_027C_COMPLAINTS_CASE_CENTER} data-complaint-queue-visible="true" data-complaint-case-passport-visible="true" data-client-driver-contact-controls-visible="true" data-client-driver-official-reply-visible="true" data-evidence-review-center-visible="true" data-decision-panel-visible="true" data-appeal-panel-visible="true" data-assignment-panel-visible="true" data-action-history-backend-status-visible="true" data-complaint-multicurrency-list-selection-visible="true">
      <header className="c27Header">
        <div>
          <span className="c27Kicker">Жалобы / обращения</span>
          <h2>Центр обработки жалобы и решения проблемы</h2>
          <p>Оператор ведёт дело от очереди до решения: связь, ответы, доказательства, апелляция, назначение и аудит ответов сервера. Успех не ставится локально.</p>
        </div>
        <div className="c27HeaderStatus"><strong>CASE CENTER</strong><span>один экран · полный рабочий процесс</span></div>
      </header>

      <div className="c27Shell">
        <aside className="c27Queue" data-function-block="01-очередь-жалоб">
          <div className="c27BlockHead"><span>01</span><div><h3>Очередь жалоб</h3><p>поиск, фильтры, срок выполнения, открыть дело</p></div></div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск: жалоба, заказ, поездка, клиент или водитель" />
          <div className="c27FilterGrid">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as QueueStatus027C | "all")}><option value="all">Все статусы</option>{statusList027C.map((s) => <option key={s} value={s}>{s}</option>)}</select>
            <input value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} placeholder="Страна" />
            <input value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="Город" />
            <input value={operatorFilter} onChange={(e) => setOperatorFilter(e.target.value)} placeholder="Оператор" />
            <input value={deadlineFilter} onChange={(e) => setDeadlineFilter(e.target.value)} placeholder="Срок выполнения" />
          </div>
          <div className="c27QueueList">
            {filteredQueue.map((item) => (
              <button type="button" key={item.complaintId} onClick={() => openCase(item)} className={selected?.complaintId === item.complaintId ? "active" : ""}>
                <span className={`c27Risk ${item.risk}`}>{item.risk}</span>
                <strong>{item.complaintId}</strong>
                <small>{item.status} · SLA {item.sla}</small>
                <em>{item.reason}</em>
                <b>Открыть дело</b>
              </button>
            ))}
          </div>
        </aside>

        <main className="c27Case">
          <section className="c27Passport" data-function-block="02-паспорт-жалобы">
            <div className="c27BlockHead"><span>02</span><div><h3>Паспорт дела</h3><p>жалоба, заказ, поездка, стороны, рынок, сумма, риск</p></div></div>
            <div className="c27PassportTop">
              {caseStats.map(([label, value]) => <div key={label} className="c27Stat"><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <div className="c27DossierGrid">
              <label>Complaint ID<input value={selected?.complaintId || ""} readOnly /></label>
              <label>Order ID<input value={selected?.orderId || ""} readOnly /></label>
              <label>Trip ID<input value={selected?.tripId || ""} readOnly /></label>
              <label>Клиент<input value={selected?.client || ""} readOnly /></label>
              <label>Водитель<input value={selected?.driver || ""} readOnly /></label>
              <label>Тариф<input value={selected?.tariff || ""} readOnly /></label>
              <label>Страна<input value={selected?.country || ""} readOnly /></label>
              <label>Город<input value={selected?.city || ""} readOnly /></label>
              <label>Сумма<input value={selected?.amount || ""} readOnly /></label>
              <label>Причина обращения<textarea value={selected?.reason || ""} readOnly /></label>
              <label>Риск<select value={selected?.risk || "средний"} onChange={(e) => setQueue((prev) => prev.map((q) => q.complaintId === selected?.complaintId ? { ...q, risk: e.target.value as Risk027C } : q))}>{riskList027C.map((r) => <option key={r} value={r}>{r}</option>)}</select></label>
            </div>
            <div className="c27CurrencyBox" data-dynamic-multicurrency-list-selection="true">
              <strong>Мультивалютный список рынка</strong>
              <div><input value={currencyInput} onChange={(e) => setCurrencyInput(e.target.value)} placeholder="Добавить валюту из серверной настройки, например код рынка" /><button type="button" onClick={addCurrency}>Добавить валюту</button></div>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}><option value="">Выбрать валюту дела</option>{currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}</select>
              <small>Нет фиксированного списка. Валюты добавляются из настройки рынка и выбираются оператором.</small>
            </div>
          </section>

          <section className="c27Contact" data-function-block="03-связь-клиент-водитель">
            <div className="c27BlockHead"><span>03</span><div><h3>Связь с клиентом и водителем</h3><p>отдельные каналы и журнал результата</p></div></div>
            <div className="c27TwoColumns">
              <div className="c27PartyCard"><h4>Клиент</h4><button onClick={() => void callBackend("Позвонить клиенту", ROUTES027C.callClient, { channel: "client_call" })}>Позвонить клиенту</button><button onClick={() => void callBackend("Открыть чат с клиентом", ROUTES027C.chatClient, { channel: "client_chat" })}>Открыть чат с клиентом</button></div>
              <div className="c27PartyCard"><h4>Водитель</h4><button onClick={() => void callBackend("Позвонить водителю", ROUTES027C.callDriver, { channel: "driver_call" })}>Позвонить водителю</button><button onClick={() => void callBackend("Открыть чат с водителем", ROUTES027C.chatDriver, { channel: "driver_chat" })}>Открыть чат с водителем</button></div>
            </div>
            <textarea value={contactResult} onChange={(e) => setContactResult(e.target.value)} placeholder="Результат звонка / контакта: кто ответил, что сказал, что нужно дальше" />
            <div className="c27InlineActions"><input value={repeatContactAt} onChange={(e) => setRepeatContactAt(e.target.value)} placeholder="Повторный контакт: дата/время" /><button onClick={() => void callBackend("Зафиксировать результат звонка", ROUTES027C.saveContactResult, { contactResult })}>Зафиксировать результат звонка</button><button onClick={() => void callBackend("Назначить повторный контакт", ROUTES027C.scheduleContact, { repeatContactAt })}>Назначить повторный контакт</button></div>
          </section>

          <section className="c27Replies" data-function-block="04-официальные-ответы">
            <div className="c27BlockHead"><span>04</span><div><h3>Официальные ответы</h3><p>раздельно клиенту и водителю, предварительный просмотр и доставка</p></div></div>
            <div className="c27TemplateRow"><select value={replyTemplate} onChange={(e) => setReplyTemplate(e.target.value)}><option>нейтральный официальный ответ</option><option>запрос доказательств</option><option>предварительное решение</option><option>апелляция принята</option></select><span>Статус доставки: только после ответа сервера</span></div>
            <div className="c27TwoColumns">
              <label>Официальный ответ клиенту<textarea value={clientReply} onChange={(e) => setClientReply(e.target.value)} placeholder="Текст ответа клиенту" /></label>
              <label>Официальный ответ водителю<textarea value={driverReply} onChange={(e) => setDriverReply(e.target.value)} placeholder="Текст ответа водителю" /></label>
            </div>
            <div className="c27Preview"><strong>Предпросмотр</strong><p>{replyTemplate}: {clientReply || driverReply || "напишите текст ответа"}</p></div>
            <div className="c27InlineActions"><button onClick={() => void callBackend("Отправить ответ клиенту", ROUTES027C.sendClientReply, { clientReply, replyTemplate })}>Отправить ответ клиенту</button><button onClick={() => void callBackend("Отправить ответ водителю", ROUTES027C.sendDriverReply, { driverReply, replyTemplate })}>Отправить ответ водителю</button></div>
          </section>

          <section className="c27Evidence" data-function-block="05-доказательства-и-проверка">
            <div className="c27BlockHead"><span>05</span><div><h3>Доказательства и проверка</h3><p>что получено, чего не хватает, что проверено</p></div></div>
            <div className="c27EvidenceGrid">
              {evidenceItems027C.map((item) => <div key={item} className="c27EvidenceItem"><strong>{item}</strong><span>статус: требует серверной проверки</span></div>)}
            </div>
            <textarea value={evidenceNote} onChange={(e) => setEvidenceNote(e.target.value)} placeholder="Заметка к доказательствам" />
            <div className="c27ActionGrid purple"><button onClick={() => void callBackend("Запросить фото", ROUTES027C.requestPhoto, { evidenceNote })}>Запросить фото</button><button onClick={() => void callBackend("Запросить аудио/чат", ROUTES027C.requestMedia, { evidenceNote })}>Запросить аудио/чат</button><button onClick={() => void callBackend("Проверить маршрут", ROUTES027C.verifyRoute, { evidenceNote })}>Проверить маршрут</button><button onClick={() => void callBackend("Проверить отмену", ROUTES027C.verifyCancel, { evidenceNote })}>Проверить отмену</button><button onClick={() => void callBackend("Проверить оплату", ROUTES027C.verifyPayment, { evidenceNote })}>Проверить оплату</button><button onClick={() => void callBackend("Проверить время ожидания", ROUTES027C.verifyWaiting, { evidenceNote })}>Проверить время ожидания</button><button onClick={() => void callBackend("Собрать пакет доказательств", ROUTES027C.buildEvidencePack, { evidenceNote })}>Собрать пакет доказательств</button></div>
          </section>
        </main>

        <aside className="c27RightRail">
          <section className="c27Decision" data-function-block="06-решение-после-проверки">
            <div className="c27BlockHead"><span>06</span><div><h3>Решение</h3><p>без наказания до проверки и одобрения</p></div></div>
            <select value={decision} onChange={(e) => setDecision(e.target.value)}>{decisionOptions027C.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <textarea value={decisionReason} onChange={(e) => setDecisionReason(e.target.value)} placeholder="Обоснование решения" />
            <div className="c27Guard">Компенсация запрещена без одобрения</div><div className="c27Guard">Блокировка запрещена без проверки и одобрения</div>
            <button onClick={() => void callBackend("Сохранить решение", ROUTES027C.saveDecision, { decision, decisionReason })}>Сохранить решение</button>
          </section>

          <section className="c27Appeal" data-function-block="07-апелляция">
            <div className="c27BlockHead"><span>07</span><div><h3>Апелляция</h3><p>стадия пересмотра дела</p></div></div>
            <textarea value={appealReason} onChange={(e) => setAppealReason(e.target.value)} placeholder="Причина апелляции" />
            <input value={appealDeadline} onChange={(e) => setAppealDeadline(e.target.value)} placeholder="Срок ответа" />
            <input value={appealOwner} onChange={(e) => setAppealOwner(e.target.value)} placeholder="Кто рассматривает" />
            <button onClick={() => void callBackend("Открыть апелляцию", ROUTES027C.openAppeal, { appealReason, appealDeadline, appealOwner })}>Открыть апелляцию</button>
            <button onClick={() => void callBackend("Сохранить решение по апелляции", ROUTES027C.saveAppealDecision, { appealReason, appealOwner })}>Сохранить решение по апелляции</button>
          </section>

          <section className="c27Assign" data-function-block="08-назначение-и-передача">
            <div className="c27BlockHead"><span>08</span><div><h3>Назначение</h3><p>оператор, старший, владелец, срок</p></div></div>
            <input value={operator} onChange={(e) => setOperator(e.target.value)} placeholder="Назначить оператора" />
            <input value={caseDeadline} onChange={(e) => setCaseDeadline(e.target.value)} placeholder="Дедлайн дела" />
            <textarea value={handoffReason} onChange={(e) => setHandoffReason(e.target.value)} placeholder="Причина передачи" />
            <div className="c27ActionGrid"><button onClick={() => void callBackend("Назначить оператора", ROUTES027C.assignOperator, { operator })}>Назначить оператора</button><button onClick={() => void callBackend("Передать старшему", ROUTES027C.escalateSenior, { handoffReason })}>Передать старшему</button><button onClick={() => void callBackend("Передать владельцу", ROUTES027C.escalateOwner, { handoffReason })}>Передать владельцу</button><button onClick={() => void callBackend("Поставить дедлайн", ROUTES027C.setDeadline, { caseDeadline })}>Поставить дедлайн</button></div>
          </section>

          <section className="c27History" data-function-block="09-история-ответа-сервера">
            <div className="c27BlockHead"><span>09</span><div><h3>История действий</h3><p>кто, когда, маршрут, статус, ошибка или успех сервера</p></div></div>
            {lastResponse ? <div className={lastResponse.ok ? "c27Last ok" : "c27Last err"}><strong>{lastResponse.ok ? "Backend success" : "Backend error"}</strong><span>{lastResponse.route}</span><em>{String(lastResponse.status)} · {lastResponse.message}</em></div> : <div className="c27Last">Ответ сервера ещё не получен</div>}
            <div className="c27HistoryList">
              {history.map((row) => <div key={`${row.at}-${row.action}`}><strong>{row.action}</strong><span>{row.at}</span><code>{row.route}</code><small>{String(row.status)} · {row.message}</small></div>)}
            </div>
          </section>
        </aside>
      </div>
      <div className="c27Busy">{busy ? `Выполняется действие` : "Ожидание действия оператора. Локальный успех не устанавливается."}</div>
    </section>
  );
}
