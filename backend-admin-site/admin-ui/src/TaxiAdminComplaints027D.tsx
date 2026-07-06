import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027d.css";

type Props027D = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type CaseStatus027D = "новое" | "срочное" | "в работе" | "ждёт связь" | "ждёт доказательства" | "решение" | "апелляция" | "закрыто";
type Risk027D = "низкий" | "средний" | "высокий" | "критический";
type Step027D = "accept" | "Связаться" | "Доказательства" | "Решение" | "Ответы" | "Апелляция" | "Закрытие";
type ServerEvent027D = { at: string; action: string; route: string; status: number | string; ok: boolean; message: string };
type Case027D = {
  id: string;
  orderId: string;
  tripId: string;
  client: string;
  driver: string;
  subject: string;
  status: CaseStatus027D;
  risk: Risk027D;
  sla: string;
  market: string;
  city: string;
  tariff: string;
  amountLabel: string;
  owner: string;
  lastTouch: string;
  missing: string[];
};

const ADMIN_UI_027D_COMPLAINTS_CASE_CENTER = "027D_COMPLAINTS_PROBLEM_RESOLUTION_CASE_CENTER_ONE_SCREEN_ONLY";

const SERVER_ROUTES_027D = {
  acceptCase: "/api/admin/taxi/complaints/case-center/accept-case",
  openCase: "/api/admin/taxi/complaints/case-center/open-case",
  callClient: "/api/admin/taxi/complaints/case-center/contact/client-call",
  callDriver: "/api/admin/taxi/complaints/case-center/contact/driver-call",
  chatClient: "/api/admin/taxi/complaints/case-center/contact/client-chat",
  chatDriver: "/api/admin/taxi/complaints/case-center/contact/driver-chat",
  saveContactResult: "/api/admin/taxi/complaints/case-center/contact/save-result",
  scheduleRepeat: "/api/admin/taxi/complaints/case-center/contact/schedule-repeat",
  requestPhoto: "/api/admin/taxi/complaints/case-center/evidence/request-photo",
  requestChat: "/api/admin/taxi/complaints/case-center/evidence/request-chat-audio",
  verifyRoute: "/api/admin/taxi/complaints/case-center/evidence/verify-route",
  verifyCancel: "/api/admin/taxi/complaints/case-center/evidence/verify-cancel",
  verifyPayment: "/api/admin/taxi/complaints/case-center/evidence/verify-payment",
  verifyWaiting: "/api/admin/taxi/complaints/case-center/evidence/verify-waiting",
  buildEvidencePack: "/api/admin/taxi/complaints/case-center/evidence/build-pack",
  sendClientReply: "/api/admin/taxi/complaints/case-center/reply/client",
  sendDriverReply: "/api/admin/taxi/complaints/case-center/reply/driver",
  saveDecision: "/api/admin/taxi/complaints/case-center/decision/save",
  requestSeniorReview: "/api/admin/taxi/complaints/case-center/decision/senior-review",
  requestOwnerReview: "/api/admin/taxi/complaints/case-center/decision/owner-review",
  openAppeal: "/api/admin/taxi/complaints/case-center/appeal/open",
  saveAppealDecision: "/api/admin/taxi/complaints/case-center/appeal/decision",
  assignOperator: "/api/admin/taxi/complaints/case-center/assign/operator",
  escalateOwner: "/api/admin/taxi/complaints/case-center/assign/owner",
  setDeadline: "/api/admin/taxi/complaints/case-center/assign/deadline",
  closeCase: "/api/admin/taxi/complaints/case-center/close"
} as const;

const SAMPLE_CASES_027D: Case027D[] = [
  { id: "CMP-from-server-001", orderId: "ORD-from-server-771", tripId: "TRIP-from-server-552", client: "Клиент из сервера", driver: "Водитель из сервера", subject: "Спор по отмене, ожиданию и маршруту", status: "срочное", risk: "критический", sla: "00:18", market: "рынок из сервера", city: "город из сервера", tariff: "тариф из заказа", amountLabel: "сумма из заказа", owner: "не назначен", lastTouch: "нет ответа", missing: ["фото", "подтверждение звонка", "ответ водителя"] },
  { id: "CMP-from-server-002", orderId: "ORD-from-server-772", tripId: "TRIP-from-server-553", client: "Клиент ожидает ответ", driver: "Водитель дал объяснение", subject: "Жалоба на чистоту авто и грубость", status: "ждёт доказательства", risk: "высокий", sla: "01:05", market: "рынок из сервера", city: "город из сервера", tariff: "тариф из заказа", amountLabel: "сумма из заказа", owner: "оператор-2", lastTouch: "ожидает фото", missing: ["фото салона", "история чата"] },
  { id: "CMP-from-server-003", orderId: "ORD-from-server-773", tripId: "TRIP-from-server-554", client: "Клиент подал апелляцию", driver: "Водитель оспаривает", subject: "Апелляция по решению", status: "апелляция", risk: "средний", sla: "03:40", market: "рынок из сервера", city: "город из сервера", tariff: "тариф из заказа", amountLabel: "сумма из заказа", owner: "старший оператор", lastTouch: "на проверке", missing: ["решение апелляции"] }
];

const STEPS_027D: Step027D[] = ["accept", "Связаться", "Доказательства", "Решение", "Ответы", "Апелляция", "Закрытие"];
const STATUS_FILTERS_027D: (CaseStatus027D | "all")[] = ["all", "новое", "срочное", "в работе", "ждёт связь", "ждёт доказательства", "решение", "апелляция", "закрыто"];
const RISK_FILTERS_027D: (Risk027D | "all")[] = ["all", "низкий", "средний", "высокий", "критический"];
const DECISIONS_027D = ["нет нарушения", "виноват водитель", "виноват клиент", "спорно", "нужна проверка старшего", "нужна проверка владельца"];
const EVIDENCE_ROWS_027D = [
  { key: "маршрут", title: "Маршрут и точки", detail: "сверить путь, остановки, отклонения" },
  { key: "отмена", title: "Отмена и ожидание", detail: "проверить кто отменил и время ожидания" },
  { key: "оплата", title: "Оплата и сумма", detail: "проверить списание, чаевые, промо" },
  { key: "чат", title: "Чат и звонки", detail: "проверить переписку и попытки связи" },
  { key: "фото", title: "Фото / медиа", detail: "запросить и отметить что получено" }
];

function apiBase027D(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function apiHeaders027D(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function stamp027D(): string {
  return new Date().toISOString();
}

export function TaxiAdminComplaints027D({ config, setNotice }: Props027D) {
  const [cases, setCases] = useState<Case027D[]>(SAMPLE_CASES_027D);
  const [selectedId, setSelectedId] = useState(SAMPLE_CASES_027D[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CaseStatus027D | "all">("all");
  const [riskFilter, setRiskFilter] = useState<Risk027D | "all">("all");
  const [currencyDraft, setCurrencyDraft] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [contactOutcome, setContactOutcome] = useState("");
  const [repeatAt, setRepeatAt] = useState("");
  const [clientReply, setClientReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [replyTemplate, setReplyTemplate] = useState("neutral_official_reply");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [decision, setDecision] = useState(DECISIONS_027D[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [appealOwner, setAppealOwner] = useState("");
  const [appealDeadline, setAppealDeadline] = useState("");
  const [operator, setOperator] = useState("");
  const [caseDeadline, setCaseDeadline] = useState("");
  const [handoffReason, setHandoffReason] = useState("");
  const [activeStep, setActiveStep] = useState<Step027D>("accept");
  const [busy, setBusy] = useState("");
  const [events, setEvents] = useState<ServerEvent027D[]>([]);

  const selectedCase = cases.find((item) => item.id === selectedId) || cases[0];

  const visibleCases = useMemo(() => cases.filter((item) => {
    const hay = `${item.id} ${item.orderId} ${item.tripId} ${item.client} ${item.driver} ${item.subject} ${item.owner}`.toLowerCase();
    const queryOk = !query.trim() || hay.includes(query.trim().toLowerCase());
    const statusOk = statusFilter === "all" || item.status === statusFilter;
    const riskOk = riskFilter === "all" || item.risk === riskFilter;
    return queryOk && statusOk && riskOk;
  }), [cases, query, statusFilter, riskFilter]);

  function addCurrency(): void {
    const code = currencyDraft.trim().toUpperCase();
    if (!code) return;
    setCurrencyList((prev) => prev.includes(code) ? prev : [...prev, code]);
    setSelectedCurrency(code);
    setCurrencyDraft("");
  }

  function chooseCase(item: Case027D): void {
    setSelectedId(item.id);
    setActiveStep("accept");
    void sendServer("Открыть дело", SERVER_ROUTES_027D.openCase, { openedComplaintId: item.id });
  }

  async function sendServer(action: string, route: string, payload: Record<string, unknown>) {
    setBusy(action);
    try {
      const response = await fetch(`${apiBase027D(config)}${route}`, {
        method: "POST",
        headers: apiHeaders027D(config),
        body: JSON.stringify({
          screen: "complaints_case_center_027d",
          complaintId: selectedCase?.id,
          orderId: selectedCase?.orderId,
          tripId: selectedCase?.tripId,
          selectedCurrency,
          currencyList,
          activeStep,
          payload
        })
      });
      const body = await response.json().catch(() => ({}));
      const row: ServerEvent027D = {
        at: stamp027D(),
        action,
        route,
        status: response.status,
        ok: response.ok,
        message: String(body?.message || body?.error || (response.ok ? "сервер подтвердил действие" : "сервер отклонил действие"))
      };
      setEvents((prev) => [row, ...prev].slice(0, 40));
      setNotice(response.ok ? "Сервер подтвердил действие" : "Сервер вернул ошибку — локальный успех не установлен");
    } catch (error) {
      const row: ServerEvent027D = {
        at: stamp027D(),
        action,
        route,
        status: "network_error",
        ok: false,
        message: error instanceof Error ? error.message : "ошибка сети"
      };
      setEvents((prev) => [row, ...prev].slice(0, 40));
      setNotice("Ошибка сети — локальный успех не установлен");
    } finally {
      setBusy("");
    }
  }

  function moveStep(step: Step027D): void {
    setActiveStep(step);
  }

  const lastEvent = events[0];

  return (
    <section className="complaints027d" data-admin-ui-027d-complaints-case-center={ADMIN_UI_027D_COMPLAINTS_CASE_CENTER} data-queue-inbox-cards-visible="true" data-open-case-dossier-visible="true" data-problem-resolution-wizard-visible="true" data-client-driver-contact-hub-visible="true" data-official-replies-preview-visible="true" data-evidence-checklist-visible="true" data-decision-board-visible="true" data-appeal-and-assignment-visible="true" data-server-history-timeline-visible="true" data-dynamic-currency-selector-visible="true">
      <header className="c27dHero">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Центр решения проблемы</h2>
          <p>Не форма. Рабочий стол оператора: очередь, дело, связь, доказательства, решение, апелляция и журнал сервера. Успех только после ответа сервера.</p>
        </div>
        <div className="c27dHeroStatus">
          <strong>{activeStep}</strong>
          <small>текущий шаг дела</small>
        </div>
      </header>

      <div className="c27dLayout">
        <aside className="c27dInbox" data-section="очередь-жалоб">
          <div className="c27dPanelTitle"><b>01</b><div><h3>Очередь жалоб</h3><p>карточки, приоритет, срок выполнения, открыть дело</p></div></div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск: жалоба / заказ / поездка / клиент / водитель" />
          <div className="c27dFilters">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as CaseStatus027D | "all")}>{STATUS_FILTERS_027D.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as Risk027D | "all")}>{RISK_FILTERS_027D.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <div className="c27dInboxList">
            {visibleCases.map((item) => (
              <button type="button" key={item.id} onClick={() => chooseCase(item)} className={item.id === selectedCase.id ? "selected" : ""} data-action="открыть-дело">
                <span className={`c27dRisk ${item.risk}`}>{item.risk}</span>
                <strong>{item.id}</strong>
                <small>{item.status} · SLA {item.sla}</small>
                <em>{item.subject}</em>
                <i>{item.missing.length ? `Не хватает данных` : "пакет полный"}</i>
                <b>Открыть дело</b>
              </button>
            ))}
          </div>
        </aside>

        <main className="c27dDesk">
          <section className="c27dDossier" data-section="паспорт-дела">
            <div className="c27dDossierTop">
              <div>
                <span>Открытое дело</span>
                <h3>{selectedCase.id}</h3>
                <p>{selectedCase.subject}</p>
              </div>
              <div className="c27dSla"><strong>{selectedCase.sla}</strong><small>Срок до нарушения</small></div>
            </div>
            <div className="c27dFacts">
              <div><span>Заказ</span><strong>{selectedCase.orderId}</strong></div>
              <div><span>Поездка</span><strong>{selectedCase.tripId}</strong></div>
              <div><span>Клиент</span><strong>{selectedCase.client}</strong></div>
              <div><span>Водитель</span><strong>{selectedCase.driver}</strong></div>
              <div><span>Рынок</span><strong>{selectedCase.market}</strong></div>
              <div><span>Город</span><strong>{selectedCase.city}</strong></div>
              <div><span>Тариф</span><strong>{selectedCase.tariff}</strong></div>
              <div><span>Сумма</span><strong>{selectedCase.amountLabel}</strong></div>
              <div><span>Статус</span><strong>{selectedCase.status}</strong></div>
              <div><span>Риск</span><strong>{selectedCase.risk}</strong></div>
            </div>
            <div className="c27dCurrency" data-multicurrency="dynamic-list-selection">
              <div><strong>Валюта дела</strong><small>список приходит из рынка/настроек, фиксированного списка нет</small></div>
              <input value={currencyDraft} onChange={(event) => setCurrencyDraft(event.target.value)} placeholder="Добавить валюту из настроек рынка" />
              <button type="button" onClick={addCurrency}>Добавить валюту</button>
              <select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}>
                <option value="">Выбрать валюту</option>
                {currencyList.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </section>

          <section className="c27dWizard" data-section="мастер-решения-проблемы">
            <div className="c27dPanelTitle"><b>02</b><div><h3>Пошаговое решение проблемы</h3><p>оператор видит следующий шаг, а не набор случайных полей</p></div></div>
            <div className="c27dSteps">
              {STEPS_027D.map((step, index) => <button type="button" key={step} onClick={() => moveStep(step)} className={activeStep === step ? "active" : ""}><span>{index + 1}</span>{step}</button>)}
            </div>
            <div className="c27dStepBody">
              <div className="c27dNextAction">
                <span>Следующее действие</span>
                <strong>{activeStep === "accept" ? "Принять дело в работу и назначить ответственного" : activeStep === "Связаться" ? "Связаться с обеими сторонами и зафиксировать результат" : activeStep === "Доказательства" ? "Собрать недостающие доказательства" : activeStep === "Решение" ? "Принять решение без денег и блокировки без одобрения" : activeStep === "Ответы" ? "Отправить официальные ответы клиенту и водителю" : activeStep === "Апелляция" ? "Открыть или закрыть апелляцию" : "Закрыть дело только после серверного подтверждения"}</strong>
              </div>
              <button type="button" onClick={() => sendServer("Принять дело в работу", SERVER_ROUTES_027D.acceptCase, { operator })}>Принять дело в работу</button>
              <button type="button" onClick={() => sendServer("Поставить срок по делу", SERVER_ROUTES_027D.setDeadline, { caseDeadline })}>Поставить срок</button>
              <button type="button" onClick={() => sendServer("Закрыть дело", SERVER_ROUTES_027D.closeCase, { decision, decisionReason })}>Закрыть дело через сервер</button>
            </div>
          </section>

          <section className="c27dEvidence" data-section="доказательства">
            <div className="c27dPanelTitle"><b>03</b><div><h3>Доказательства</h3><p>что получено, что отсутствует, что надо проверить</p></div></div>
            <div className="c27dEvidenceGrid">
              {EVIDENCE_ROWS_027D.map((item) => <article key={item.key}><strong>{item.title}</strong><span>{item.detail}</span><small>{selectedCase.missing.includes(item.key) ? "не хватает" : "ожидает проверки"}</small></article>)}
            </div>
            <textarea value={evidenceNote} onChange={(event) => setEvidenceNote(event.target.value)} placeholder="Заметка по доказательствам" />
            <div className="c27dButtonGrid">
              <button type="button" onClick={() => sendServer("Запросить фото", SERVER_ROUTES_027D.requestPhoto, { evidenceNote })}>Запросить фото</button>
              <button type="button" onClick={() => sendServer("Запросить чат и аудио", SERVER_ROUTES_027D.requestChat, { evidenceNote })}>Запросить чат/аудио</button>
              <button type="button" onClick={() => sendServer("Проверить маршрут", SERVER_ROUTES_027D.verifyRoute, { evidenceNote })}>Проверить маршрут</button>
              <button type="button" onClick={() => sendServer("Проверить отмену", SERVER_ROUTES_027D.verifyCancel, { evidenceNote })}>Проверить отмену</button>
              <button type="button" onClick={() => sendServer("Проверить оплату", SERVER_ROUTES_027D.verifyPayment, { selectedCurrency })}>Проверить оплату</button>
              <button type="button" onClick={() => sendServer("Проверить ожидание", SERVER_ROUTES_027D.verifyWaiting, { evidenceNote })}>Проверить ожидание</button>
              <button type="button" onClick={() => sendServer("Собрать пакет доказательств", SERVER_ROUTES_027D.buildEvidencePack, { selectedCurrency, evidenceNote })}>Собрать пакет доказательств</button>
            </div>
          </section>

          <section className="c27dReplies" data-section="официальные-ответы">
            <div className="c27dPanelTitle"><b>04</b><div><h3>Официальные ответы</h3><p>клиенту и водителю отдельно, с предпросмотром</p></div></div>
            <select value={replyTemplate} onChange={(event) => setReplyTemplate(event.target.value)}><option>нейтральный официальный ответ</option><option>запрос доказательств</option><option>решение без компенсации</option><option>передано на проверку старшему</option></select>
            <div className="c27dTwoTextareas">
              <label>Ответ клиенту<textarea value={clientReply} onChange={(event) => setClientReply(event.target.value)} placeholder="Официальный ответ клиенту" /></label>
              <label>Ответ водителю<textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} placeholder="Официальный ответ водителю" /></label>
            </div>
            <div className="c27dPreview"><strong>Предпросмотр:</strong><span>{replyTemplate} · клиент: {clientReply || "текст не заполнен"} · водитель: {driverReply || "текст не заполнен"}</span></div>
            <div className="c27dButtonGrid two">
              <button type="button" onClick={() => sendServer("Отправить ответ клиенту", SERVER_ROUTES_027D.sendClientReply, { clientReply, replyTemplate })}>Отправить ответ клиенту</button>
              <button type="button" onClick={() => sendServer("Отправить ответ водителю", SERVER_ROUTES_027D.sendDriverReply, { driverReply, replyTemplate })}>Отправить ответ водителю</button>
            </div>
          </section>
        </main>

        <aside className="c27dRightRail">
          <section className="c27dContactHub" data-section="связь">
            <div className="c27dPanelTitle"><b>05</b><div><h3>Связь</h3><p>отдельно клиент и водитель</p></div></div>
            <div className="c27dButtonStack">
              <button type="button" onClick={() => sendServer("Позвонить клиенту", SERVER_ROUTES_027D.callClient, {})}>Позвонить клиенту</button>
              <button type="button" onClick={() => sendServer("Позвонить водителю", SERVER_ROUTES_027D.callDriver, {})}>Позвонить водителю</button>
              <button type="button" onClick={() => sendServer("Открыть чат с клиентом", SERVER_ROUTES_027D.chatClient, {})}>Открыть чат с клиентом</button>
              <button type="button" onClick={() => sendServer("Открыть чат с водителем", SERVER_ROUTES_027D.chatDriver, {})}>Открыть чат с водителем</button>
            </div>
            <textarea value={contactOutcome} onChange={(event) => setContactOutcome(event.target.value)} placeholder="Результат связи" />
            <input value={repeatAt} onChange={(event) => setRepeatAt(event.target.value)} placeholder="Повторный контакт / время" />
            <button type="button" onClick={() => sendServer("Зафиксировать результат связи", SERVER_ROUTES_027D.saveContactResult, { contactOutcome })}>Зафиксировать результат</button>
            <button type="button" onClick={() => sendServer("Назначить повторный контакт", SERVER_ROUTES_027D.scheduleRepeat, { repeatAt })}>Назначить повторный контакт</button>
          </section>

          <section className="c27dDecision" data-section="решение-и-апелляция">
            <div className="c27dPanelTitle"><b>06</b><div><h3>Решение</h3><p>без денег и блокировок без одобрения</p></div></div>
            <select value={decision} onChange={(event) => setDecision(event.target.value)}>{DECISIONS_027D.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="Обоснование решения" />
            <div className="c27dWarning">Компенсация и блокировка запрещены без проверки и одобрения.</div>
            <button type="button" onClick={() => sendServer("Сохранить решение", SERVER_ROUTES_027D.saveDecision, { decision, decisionReason })}>Сохранить решение</button>
            <button type="button" onClick={() => sendServer("Проверка старшего", SERVER_ROUTES_027D.requestSeniorReview, { decisionReason })}>Проверка старшего</button>
            <button type="button" onClick={() => sendServer("Проверка владельца", SERVER_ROUTES_027D.requestOwnerReview, { decisionReason })}>Проверка владельца</button>
          </section>

          <section className="c27dAppeal" data-section="апелляция-и-назначение">
            <div className="c27dPanelTitle"><b>07</b><div><h3>Апелляция и назначение</h3><p>ответственный, срок, передача</p></div></div>
            <textarea value={appealReason} onChange={(event) => setAppealReason(event.target.value)} placeholder="Причина апелляции" />
            <input value={appealOwner} onChange={(event) => setAppealOwner(event.target.value)} placeholder="Кто рассматривает апелляцию" />
            <input value={appealDeadline} onChange={(event) => setAppealDeadline(event.target.value)} placeholder="Срок ответа по апелляции" />
            <button type="button" onClick={() => sendServer("Открыть апелляцию", SERVER_ROUTES_027D.openAppeal, { appealReason, appealOwner, appealDeadline })}>Открыть апелляцию</button>
            <button type="button" onClick={() => sendServer("Решение по апелляции", SERVER_ROUTES_027D.saveAppealDecision, { appealReason })}>Решение по апелляции</button>
            <input value={operator} onChange={(event) => setOperator(event.target.value)} placeholder="Назначить оператора" />
            <input value={caseDeadline} onChange={(event) => setCaseDeadline(event.target.value)} placeholder="Дедлайн дела" />
            <textarea value={handoffReason} onChange={(event) => setHandoffReason(event.target.value)} placeholder="Причина передачи" />
            <button type="button" onClick={() => sendServer("Назначить оператора", SERVER_ROUTES_027D.assignOperator, { operator })}>Назначить оператора</button>
            <button type="button" onClick={() => sendServer("Передать владельцу", SERVER_ROUTES_027D.escalateOwner, { handoffReason })}>Передать владельцу</button>
          </section>

          <section className="c27dServerLog" data-section="история-сервера">
            <div className="c27dPanelTitle"><b>08</b><div><h3>История сервера</h3><p>маршрут, статус, ошибка или успех</p></div></div>
            <div className={lastEvent?.ok ? "c27dLast ok" : "c27dLast"}><strong>{lastEvent ? lastEvent.action : "действий ещё нет"}</strong><span>{lastEvent ? `${lastEvent.status} · ${lastEvent.message}` : "после кнопки здесь будет ответ сервера"}</span></div>
            <div className="c27dLogList">
              {events.map((event) => <article key={`${event.at}-${event.action}`}><strong>{event.action}</strong><span>{event.route}</span><small>{event.status} · {event.ok ? "сервер подтвердил" : "ошибка/отклонено"}</small><em>{event.at}</em></article>)}
            </div>
            {busy ? <div className="c27dBusy">Отправка на сервер: {busy}</div> : null}
          </section>
        </aside>
      </div>
    </section>
  );
}
