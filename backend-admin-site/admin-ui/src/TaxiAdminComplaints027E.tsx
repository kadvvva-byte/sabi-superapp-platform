import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027e.css";

type Props027E = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type CaseStage027E = "новая" | "срочная" | "в работе" | "ожидает связи" | "нужны доказательства" | "решение" | "апелляция" | "закрыта";
type Risk027E = "низкий" | "средний" | "высокий" | "критический";
type ServerEvent027E = { at: string; action: string; route: string; status: number | string; ok: boolean; message: string };
type ComplaintCase027E = {
  id: string;
  orderId: string;
  tripId: string;
  client: string;
  driver: string;
  reason: string;
  stage: CaseStage027E;
  risk: Risk027E;
  sla: string;
  market: string;
  city: string;
  tariff: string;
  amount: string;
  owner: string;
  missing: string[];
  nextStep: string;
};

type WorkStep027E = {
  key: string;
  title: string;
  purpose: string;
  route: string;
  cta: string;
};

const ADMIN_UI_027E_COMPLAINTS_RESOLUTION_COMMAND_CENTER = "027E_COMPLAINTS_RESOLUTION_COMMAND_CENTER_ONE_SCREEN_ONLY_READY_SCREENS_LOCKED";

const ROUTES_027E = {
  openCase: "/api/admin/taxi/complaints/resolution/open-case",
  acceptCase: "/api/admin/taxi/complaints/resolution/accept-case",
  callClient: "/api/admin/taxi/complaints/resolution/contact/call-client",
  callDriver: "/api/admin/taxi/complaints/resolution/contact/call-driver",
  chatClient: "/api/admin/taxi/complaints/resolution/contact/chat-client",
  chatDriver: "/api/admin/taxi/complaints/resolution/contact/chat-driver",
  saveContact: "/api/admin/taxi/complaints/resolution/contact/save-result",
  repeatContact: "/api/admin/taxi/complaints/resolution/contact/repeat",
  requestEvidence: "/api/admin/taxi/complaints/resolution/evidence/request",
  verifyRoute: "/api/admin/taxi/complaints/resolution/evidence/route",
  verifyCancel: "/api/admin/taxi/complaints/resolution/evidence/cancel",
  verifyPayment: "/api/admin/taxi/complaints/resolution/evidence/payment",
  verifyWaiting: "/api/admin/taxi/complaints/resolution/evidence/waiting",
  buildPack: "/api/admin/taxi/complaints/resolution/evidence/build-pack",
  previewClientReply: "/api/admin/taxi/complaints/resolution/reply/client-preview",
  previewDriverReply: "/api/admin/taxi/complaints/resolution/reply/driver-preview",
  sendClientReply: "/api/admin/taxi/complaints/resolution/reply/client-send",
  sendDriverReply: "/api/admin/taxi/complaints/resolution/reply/driver-send",
  saveDecision: "/api/admin/taxi/complaints/resolution/decision/save",
  seniorReview: "/api/admin/taxi/complaints/resolution/decision/senior-review",
  ownerReview: "/api/admin/taxi/complaints/resolution/decision/owner-review",
  openAppeal: "/api/admin/taxi/complaints/resolution/appeal/open",
  appealDecision: "/api/admin/taxi/complaints/resolution/appeal/decision",
  assignOperator: "/api/admin/taxi/complaints/resolution/assign/operator",
  setDeadline: "/api/admin/taxi/complaints/resolution/assign/deadline",
  closeCase: "/api/admin/taxi/complaints/resolution/close"
} as const;

const CASES_027E: ComplaintCase027E[] = [
  {
    id: "CMP-from-backend-1001",
    orderId: "ORD-from-backend-771",
    tripId: "TRIP-from-backend-552",
    client: "Клиент из сервера",
    driver: "Водитель из сервера",
    reason: "Отмена после ожидания, спор по маршруту и оплате",
    stage: "срочная",
    risk: "критический",
    sla: "00:14",
    market: "рынок из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    owner: "не назначен",
    missing: ["ответ водителя", "проверка маршрута", "результат звонка"],
    nextStep: "связаться с обеими сторонами"
  },
  {
    id: "CMP-from-backend-1002",
    orderId: "ORD-from-backend-772",
    tripId: "TRIP-from-backend-553",
    client: "Клиент ждёт официальный ответ",
    driver: "Водитель дал объяснение",
    reason: "Грубость, состояние авто, запрос компенсации",
    stage: "нужны доказательства",
    risk: "высокий",
    sla: "01:05",
    market: "рынок из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    owner: "оператор-2",
    missing: ["фото салона", "история чата"],
    nextStep: "собрать доказательства"
  },
  {
    id: "CMP-from-backend-1003",
    orderId: "ORD-from-backend-773",
    tripId: "TRIP-from-backend-554",
    client: "Клиент подал апелляцию",
    driver: "Водитель оспаривает решение",
    reason: "Апелляция по предыдущему решению",
    stage: "апелляция",
    risk: "средний",
    sla: "03:40",
    market: "рынок из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    owner: "старший оператор",
    missing: ["решение апелляции"],
    nextStep: "назначить ответственного за апелляцию"
  }
];

const WORKFLOW_027E: WorkStep027E[] = [
  { key: "accept", title: "1. Принять дело", purpose: "зафиксировать оператора и старт срока выполнения", route: ROUTES_027E.acceptCase, cta: "Принять в работу" },
  { key: "contact", title: "2. Связаться", purpose: "клиент, водитель, результат звонка", route: ROUTES_027E.saveContact, cta: "Сохранить результат связи" },
  { key: "evidence", title: "3. Доказательства", purpose: "маршрут, отмена, оплата, ожидание, медиа", route: ROUTES_027E.buildPack, cta: "Собрать пакет доказательств" },
  { key: "decision", title: "4. Решение", purpose: "нет нарушения / виноват водитель / виноват клиент / спорно", route: ROUTES_027E.saveDecision, cta: "Сохранить решение" },
  { key: "reply", title: "5. Ответы", purpose: "официальный ответ клиенту и водителю", route: ROUTES_027E.sendClientReply, cta: "Отправить официальный ответ" },
  { key: "appeal", title: "6. Апелляция", purpose: "открыть, назначить, закрыть апелляцию", route: ROUTES_027E.openAppeal, cta: "Открыть апелляцию" },
  { key: "close", title: "7. Закрытие", purpose: "закрыть только после серверного подтверждения", route: ROUTES_027E.closeCase, cta: "Закрыть дело" }
];

const EVIDENCE_027E = [
  { title: "Маршрут", detail: "точки, отклонения, длительность", route: ROUTES_027E.verifyRoute, cta: "Проверить маршрут" },
  { title: "Отмена", detail: "кто отменил, договорная отмена, время", route: ROUTES_027E.verifyCancel, cta: "Проверить отмену" },
  { title: "Оплата", detail: "списание, промо, чаевые, возврат", route: ROUTES_027E.verifyPayment, cta: "Проверить оплату" },
  { title: "Ожидание", detail: "таймер ожидания, прибытие, простой", route: ROUTES_027E.verifyWaiting, cta: "Проверить ожидание" },
  { title: "Чат / звонки", detail: "переписка, попытки связи, аудио", route: ROUTES_027E.requestEvidence, cta: "Запросить чат/звонки" },
  { title: "Фото / медиа", detail: "чистота авто, повреждения, вложения", route: ROUTES_027E.requestEvidence, cta: "Запросить фото" }
];

const DECISION_OPTIONS_027E = ["нет нарушения", "виноват водитель", "виноват клиент", "спорно", "нужна проверка старшего", "нужна проверка владельца"];
const STAGE_FILTERS_027E: (CaseStage027E | "all")[] = ["all", "новая", "срочная", "в работе", "ожидает связи", "нужны доказательства", "решение", "апелляция", "закрыта"];
const RISK_FILTERS_027E: (Risk027E | "all")[] = ["all", "низкий", "средний", "высокий", "критический"];

function base027E(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027E(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function now027E(): string {
  return new Date().toISOString();
}

export function TaxiAdminComplaints027E({ config, setNotice }: Props027E) {
  const [cases] = useState<ComplaintCase027E[]>(CASES_027E);
  const [selectedId, setSelectedId] = useState(CASES_027E[0].id);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<CaseStage027E | "all">("all");
  const [riskFilter, setRiskFilter] = useState<Risk027E | "all">("all");
  const [currencyDraft, setCurrencyDraft] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [activeStep, setActiveStep] = useState(WORKFLOW_027E[0].key);
  const [contactResult, setContactResult] = useState("");
  const [repeatAt, setRepeatAt] = useState("");
  const [clientReply, setClientReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [replyTemplate, setReplyTemplate] = useState("neutral_official_reply");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [decision, setDecision] = useState(DECISION_OPTIONS_027E[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [appealOwner, setAppealOwner] = useState("");
  const [operator, setOperator] = useState("");
  const [deadline, setDeadline] = useState("");
  const [handoffReason, setHandoffReason] = useState("");
  const [busy, setBusy] = useState("");
  const [events, setEvents] = useState<ServerEvent027E[]>([]);

  const selectedCase = cases.find((item) => item.id === selectedId) || cases[0];

  const visibleCases = useMemo(() => cases.filter((item) => {
    const haystack = `${item.id} ${item.orderId} ${item.tripId} ${item.client} ${item.driver} ${item.reason} ${item.owner}`.toLowerCase();
    const queryOk = !query.trim() || haystack.includes(query.trim().toLowerCase());
    const stageOk = stageFilter === "all" || item.stage === stageFilter;
    const riskOk = riskFilter === "all" || item.risk === riskFilter;
    return queryOk && stageOk && riskOk;
  }), [cases, query, riskFilter, stageFilter]);

  function addCurrency(): void {
    const code = currencyDraft.trim().toUpperCase();
    if (!code) return;
    setCurrencyList((prev) => prev.includes(code) ? prev : [...prev, code]);
    setSelectedCurrency(code);
    setCurrencyDraft("");
  }

  async function sendAction(action: string, route: string, payload: Record<string, unknown> = {}) {
    setBusy(action);
    try {
      const response = await fetch(`${base027E(config)}${route}`, {
        method: "POST",
        headers: headers027E(config),
        body: JSON.stringify({
          screen: "complaints_resolution_command_center_027e",
          complaintId: selectedCase.id,
          orderId: selectedCase.orderId,
          tripId: selectedCase.tripId,
          selectedCurrency,
          currencyList,
          activeStep,
          payload
        })
      });
      const body = await response.json().catch(() => ({}));
      const row: ServerEvent027E = {
        at: now027E(),
        action,
        route,
        status: response.status,
        ok: response.ok,
        message: String(body?.message || body?.error || (response.ok ? "сервер подтвердил действие" : "сервер отклонил действие"))
      };
      setEvents((prev) => [row, ...prev].slice(0, 60));
      setNotice(response.ok ? "Сервер подтвердил действие" : "Сервер вернул ошибку — локальный успех не установлен");
    } catch (error) {
      const row: ServerEvent027E = {
        at: now027E(),
        action,
        route,
        status: "network_error",
        ok: false,
        message: error instanceof Error ? error.message : "ошибка сети"
      };
      setEvents((prev) => [row, ...prev].slice(0, 60));
      setNotice("Ошибка сети — локальный успех не установлен");
    } finally {
      setBusy("");
    }
  }

  function openCase(id: string): void {
    setSelectedId(id);
    setActiveStep("accept");
    void sendAction("Открыть дело", ROUTES_027E.openCase, { openedComplaintId: id });
  }

  const activeWorkflow = WORKFLOW_027E.find((item) => item.key === activeStep) || WORKFLOW_027E[0];
  const lastEvent = events[0];

  return (
    <section className="complaints027e" data-admin-ui-027e-complaints-resolution-command-center={ADMIN_UI_027E_COMPLAINTS_RESOLUTION_COMMAND_CENTER} data-027e-only-complaints-screen="true" data-027e-command-center-layout="inbox-case-timeline-action-rail" data-027e-no-local-success="true" data-027e-dynamic-currency-selector="true">
      <header className="c27eHeader">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Центр обработки и решения проблемы</h2>
          <p>Оператор ведёт дело по этапам: очередь → открыть дело → связь → доказательства → решение → ответы → апелляция → закрытие. Успех только от сервера.</p>
        </div>
        <div className="c27eSlaCard">
          <strong>{selectedCase.sla}</strong>
          <small>Срок до нарушения</small>
          <button type="button" onClick={() => void sendAction("Принять срочное дело", ROUTES_027E.acceptCase, { urgent: true })}>Принять срочно</button>
        </div>
      </header>

      <div className="c27eShell">
        <aside className="c27eInbox" data-visible-block="complaint-inbox">
          <div className="c27eBlockHead">
            <b>01</b>
            <div>
              <h3>Входящие жалобы</h3>
              <p>карточки дел, риск, срок выполнения, следующий шаг</p>
            </div>
          </div>
          <input className="c27eSearch" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Номер жалобы / заказ / поездка / клиент / водитель" />
          <div className="c27eFilterRow">
            <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value as CaseStage027E | "all")}>{STAGE_FILTERS_027E.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as Risk027E | "all")}>{RISK_FILTERS_027E.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <div className="c27eInboxList">
            {visibleCases.map((item) => (
              <button type="button" className={item.id === selectedCase.id ? "c27eCaseCard active" : "c27eCaseCard"} key={item.id} onClick={() => openCase(item.id)} data-action-route={ROUTES_027E.openCase}>
                <span className={`risk ${item.risk}`}>{item.risk}</span>
                <strong>{item.id}</strong>
                <small>{item.stage} · SLA {item.sla}</small>
                <em>{item.reason}</em>
                <i>Следующий шаг: {item.nextStep}</i>
                <mark>{item.missing.length} не хватает</mark>
              </button>
            ))}
          </div>
        </aside>

        <main className="c27eCaseWorkspace" data-visible-block="open-case-workspace">
          <section className="c27eDossier" data-visible-block="case-passport">
            <div className="c27eDossierTop">
              <div>
                <span>Открытое дело</span>
                <h3>{selectedCase.id}</h3>
                <p>{selectedCase.reason}</p>
              </div>
              <div className={`c27eRiskPill ${selectedCase.risk}`}>{selectedCase.risk}</div>
            </div>
            <div className="c27ePassportGrid">
              <label><span>Заказ</span><strong>{selectedCase.orderId}</strong></label>
              <label><span>Поездка</span><strong>{selectedCase.tripId}</strong></label>
              <label><span>Клиент</span><strong>{selectedCase.client}</strong></label>
              <label><span>Водитель</span><strong>{selectedCase.driver}</strong></label>
              <label><span>Рынок</span><strong>{selectedCase.market}</strong></label>
              <label><span>Город</span><strong>{selectedCase.city}</strong></label>
              <label><span>Тариф</span><strong>{selectedCase.tariff}</strong></label>
              <label><span>Сумма</span><strong>{selectedCase.amount}</strong></label>
            </div>
            <div className="c27eCurrencyBox" data-visible-block="multicurrency-list-selection">
              <b>Мультивалютность дела</b>
              <div>
                <input value={currencyDraft} onChange={(event) => setCurrencyDraft(event.target.value)} placeholder="Добавить валюту из серверной настройки" />
                <button type="button" onClick={addCurrency}>Добавить валюту</button>
                <select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}>
                  <option value="">Выбрать валюту дела</option>
                  {currencyList.map((code) => <option key={code} value={code}>{code}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="c27eTimeline" data-visible-block="problem-timeline">
            <div className="c27eBlockHead">
              <b>02</b>
              <div><h3>Хронология проблемы</h3><p>понятный путь расследования, а не набор полей</p></div>
            </div>
            <div className="c27eTimelineTrack">
              {WORKFLOW_027E.map((step, index) => (
                <button type="button" key={step.key} className={activeStep === step.key ? "current" : ""} onClick={() => setActiveStep(step.key)}>
                  <span>{index + 1}</span>
                  <strong>{step.title.replace(/^\d+\.\s*/, "")}</strong>
                  <small>{step.purpose}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="c27eResolutionMaster" data-visible-block="problem-resolution-master">
            <div className="c27eMasterHero">
              <div>
                <span>Текущий этап</span>
                <h3>{activeWorkflow.title}</h3>
                <p>{activeWorkflow.purpose}</p>
              </div>
              <button type="button" onClick={() => void sendAction(activeWorkflow.cta, activeWorkflow.route, { step: activeWorkflow.key })}>{busy === activeWorkflow.cta ? "Отправка..." : activeWorkflow.cta}</button>
            </div>
            <div className="c27eMasterGrid">
              <article data-visible-block="contact-center">
                <h4>Связь</h4>
                <p>Отдельно клиент, отдельно водитель. Результат связи фиксируется сервером.</p>
                <div className="c27eActionGrid">
                  <button type="button" onClick={() => void sendAction("Позвонить клиенту", ROUTES_027E.callClient)}>Позвонить клиенту</button>
                  <button type="button" onClick={() => void sendAction("Позвонить водителю", ROUTES_027E.callDriver)}>Позвонить водителю</button>
                  <button type="button" onClick={() => void sendAction("Открыть чат клиента", ROUTES_027E.chatClient)}>Открыть чат клиента</button>
                  <button type="button" onClick={() => void sendAction("Открыть чат водителя", ROUTES_027E.chatDriver)}>Открыть чат водителя</button>
                </div>
                <textarea value={contactResult} onChange={(event) => setContactResult(event.target.value)} placeholder="Результат звонка / чата: кто ответил, что сказал, что обещал" />
                <div className="c27eTwo">
                  <input value={repeatAt} onChange={(event) => setRepeatAt(event.target.value)} placeholder="Время повторного контакта" />
                  <button type="button" onClick={() => void sendAction("Назначить повторный контакт", ROUTES_027E.repeatContact, { repeatAt })}>Назначить повтор</button>
                </div>
                <button type="button" onClick={() => void sendAction("Зафиксировать результат связи", ROUTES_027E.saveContact, { contactResult })}>Зафиксировать связь</button>
              </article>

              <article data-visible-block="official-replies">
                <h4>Официальные ответы</h4>
                <p>Разные ответы клиенту и водителю, предварительный просмотр и отправка через сервер.</p>
                <input value={replyTemplate} onChange={(event) => setReplyTemplate(event.target.value)} placeholder="Шаблон ответа" />
                <textarea value={clientReply} onChange={(event) => setClientReply(event.target.value)} placeholder="Официальный ответ клиенту" />
                <textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} placeholder="Официальный ответ водителю" />
                <div className="c27eActionGrid">
                  <button type="button" onClick={() => void sendAction("Предпросмотр клиенту", ROUTES_027E.previewClientReply, { clientReply, replyTemplate })}>Предпросмотр клиенту</button>
                  <button type="button" onClick={() => void sendAction("Предпросмотр водителю", ROUTES_027E.previewDriverReply, { driverReply, replyTemplate })}>Предпросмотр водителю</button>
                  <button type="button" onClick={() => void sendAction("Отправить ответ клиенту", ROUTES_027E.sendClientReply, { clientReply, replyTemplate })}>Отправить клиенту</button>
                  <button type="button" onClick={() => void sendAction("Отправить ответ водителю", ROUTES_027E.sendDriverReply, { driverReply, replyTemplate })}>Отправить водителю</button>
                </div>
              </article>
            </div>
          </section>

          <section className="c27eEvidenceBoard" data-visible-block="evidence-board">
            <div className="c27eBlockHead">
              <b>03</b>
              <div><h3>Доказательства и факты</h3><p>что уже проверено и чего не хватает</p></div>
            </div>
            <div className="c27eEvidenceGrid">
              {EVIDENCE_027E.map((item) => (
                <article key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                  <button type="button" onClick={() => void sendAction(item.cta, item.route, { evidence: item.title, evidenceNote })}>{item.cta}</button>
                </article>
              ))}
            </div>
            <textarea value={evidenceNote} onChange={(event) => setEvidenceNote(event.target.value)} placeholder="Заметка по доказательствам: что получено, что не хватает, что требует проверки" />
            <button type="button" onClick={() => void sendAction("Собрать пакет доказательств", ROUTES_027E.buildPack, { evidenceNote })}>Собрать пакет доказательств</button>
          </section>
        </main>

        <aside className="c27eRightRail" data-visible-block="decision-appeal-assignment-history">
          <section className="c27eDecisionBoard" data-visible-block="decision-board">
            <h3>Решение</h3>
            <select value={decision} onChange={(event) => setDecision(event.target.value)}>{DECISION_OPTIONS_027E.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="Основание решения: факты, доказательства, правила" />
            <button type="button" onClick={() => void sendAction("Сохранить решение", ROUTES_027E.saveDecision, { decision, decisionReason })}>Сохранить решение</button>
            <div className="c27eWarn">Компенсация и блокировка запрещены без проверки и одобрения.</div>
            <button type="button" onClick={() => void sendAction("Проверка старшего", ROUTES_027E.seniorReview, { decision, decisionReason })}>Проверка старшего</button>
            <button type="button" onClick={() => void sendAction("Проверка владельца", ROUTES_027E.ownerReview, { decision, decisionReason })}>Проверка владельца</button>
          </section>

          <section data-visible-block="appeal-panel">
            <h3>Апелляция</h3>
            <textarea value={appealReason} onChange={(event) => setAppealReason(event.target.value)} placeholder="Причина апелляции" />
            <input value={appealOwner} onChange={(event) => setAppealOwner(event.target.value)} placeholder="Кто рассматривает" />
            <button type="button" onClick={() => void sendAction("Открыть апелляцию", ROUTES_027E.openAppeal, { appealReason, appealOwner })}>Открыть апелляцию</button>
            <button type="button" onClick={() => void sendAction("Решение по апелляции", ROUTES_027E.appealDecision, { appealReason, appealOwner })}>Сохранить решение апелляции</button>
          </section>

          <section data-visible-block="assignment-panel">
            <h3>Назначение</h3>
            <input value={operator} onChange={(event) => setOperator(event.target.value)} placeholder="Оператор / старший / владелец" />
            <input value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="Дедлайн" />
            <textarea value={handoffReason} onChange={(event) => setHandoffReason(event.target.value)} placeholder="Причина передачи" />
            <button type="button" onClick={() => void sendAction("Назначить оператора", ROUTES_027E.assignOperator, { operator })}>Назначить оператора</button>
            <button type="button" onClick={() => void sendAction("Поставить дедлайн", ROUTES_027E.setDeadline, { deadline })}>Поставить дедлайн</button>
            <button type="button" onClick={() => void sendAction("Передать владельцу", ROUTES_027E.ownerReview, { handoffReason })}>Передать владельцу</button>
          </section>

          <section className="c27eServerLog" data-visible-block="server-history">
            <h3>История сервера</h3>
            <div className={lastEvent?.ok ? "c27eLast ok" : "c27eLast error"}>
              <strong>{lastEvent ? lastEvent.action : "нет действий"}</strong>
              <small>{lastEvent ? `${lastEvent.status} · ${lastEvent.route}` : "после действия здесь будет маршрут, статус или ошибка сервера"}</small>
              <p>{lastEvent ? lastEvent.message : "локальный успех не устанавливается"}</p>
            </div>
            <div className="c27eLogList">
              {events.map((event) => (
                <article key={`${event.at}-${event.action}-${event.route}`}>
                  <b>{event.ok ? "OK" : "ERR"}</b>
                  <span>{event.action}</span>
                  <small>{event.status} · {event.route}</small>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
