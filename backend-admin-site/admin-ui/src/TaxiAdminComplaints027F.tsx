import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027f.css";

type Props027F = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type CaseStatus027F = "новая" | "срочная" | "в работе" | "ждёт связь" | "ждёт доказательства" | "решение" | "апелляция" | "закрыта";
type CaseRisk027F = "низкий" | "средний" | "высокий" | "критический";
type ServerEvent027F = { at: string; action: string; path: string; result: number | string; ok: boolean; message: string };

type GlobalComplaint027F = {
  complaintGlobalId: string;
  orderGlobalId: string;
  tripGlobalId: string;
  riderGlobalId: string;
  driverGlobalId: string;
  driverTopupIdentityId: string;
  riderName: string;
  driverName: string;
  reason: string;
  status: CaseStatus027F;
  risk: CaseRisk027F;
  deadline: string;
  country: string;
  city: string;
  tariff: string;
  amount: string;
  currency: string;
  operator: string;
  missing: string[];
  currentProblem: string;
};

type Step027F = { key: string; title: string; goal: string; path: string; action: string };
type Evidence027F = { title: string; state: "готово" | "не хватает" | "проверить"; detail: string; path: string; action: string };

const ADMIN_UI_027F_COMPLAINTS_GLOBAL_RU_CASE_CENTER = "027F_GLOBAL_COMPLAINT_PROCESSING_CENTER_RU_READY_SCREENS_PROTECTED";

const SERVER_PATHS_027F = {
  openCase: "/api/admin/taxi/complaints/global/open-case",
  takeCase: "/api/admin/taxi/complaints/global/take-case",
  callRider: "/api/admin/taxi/complaints/global/contact/call-rider",
  callDriver: "/api/admin/taxi/complaints/global/contact/call-driver",
  chatRider: "/api/admin/taxi/complaints/global/contact/chat-rider",
  chatDriver: "/api/admin/taxi/complaints/global/contact/chat-driver",
  saveContact: "/api/admin/taxi/complaints/global/contact/save-result",
  requestPhoto: "/api/admin/taxi/complaints/global/evidence/request-photo",
  requestChatAudio: "/api/admin/taxi/complaints/global/evidence/request-chat-audio",
  checkRoute: "/api/admin/taxi/complaints/global/evidence/check-route",
  checkCancel: "/api/admin/taxi/complaints/global/evidence/check-cancel",
  checkPayment: "/api/admin/taxi/complaints/global/evidence/check-payment",
  checkWaiting: "/api/admin/taxi/complaints/global/evidence/check-waiting",
  buildEvidence: "/api/admin/taxi/complaints/global/evidence/build-pack",
  previewRiderReply: "/api/admin/taxi/complaints/global/reply/rider-preview",
  previewDriverReply: "/api/admin/taxi/complaints/global/reply/driver-preview",
  sendRiderReply: "/api/admin/taxi/complaints/global/reply/rider-send",
  sendDriverReply: "/api/admin/taxi/complaints/global/reply/driver-send",
  saveDecision: "/api/admin/taxi/complaints/global/decision/save",
  seniorReview: "/api/admin/taxi/complaints/global/decision/senior-review",
  ownerReview: "/api/admin/taxi/complaints/global/decision/owner-review",
  openAppeal: "/api/admin/taxi/complaints/global/appeal/open",
  closeAppeal: "/api/admin/taxi/complaints/global/appeal/close",
  assignOperator: "/api/admin/taxi/complaints/global/assignment/operator",
  setDeadline: "/api/admin/taxi/complaints/global/assignment/deadline",
  closeCase: "/api/admin/taxi/complaints/global/close-case"
} as const;

const CASES_027F: GlobalComplaint027F[] = [
  {
    complaintGlobalId: "ЖАЛ-ГЛОБ-2026-000771",
    orderGlobalId: "ЗАК-ГЛОБ-771",
    tripGlobalId: "ПОЕЗДКА-ГЛОБ-552",
    riderGlobalId: "ПАС-700881",
    driverGlobalId: "ВОД-900441",
    driverTopupIdentityId: "ИД-ПОП-445901",
    riderName: "Пассажир из сервера",
    driverName: "Водитель из сервера",
    reason: "Спор по отмене, ожиданию, маршруту и оплате",
    status: "срочная",
    risk: "критический",
    deadline: "00:12",
    country: "страна из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    currency: "валюта из списка",
    operator: "не назначен",
    missing: ["ответ водителя", "проверка маршрута", "результат связи"],
    currentProblem: "Нужно связаться с обеими сторонами, собрать факты и принять решение без компенсации до подтверждения."
  },
  {
    complaintGlobalId: "ЖАЛ-ГЛОБ-2026-000772",
    orderGlobalId: "ЗАК-ГЛОБ-772",
    tripGlobalId: "ПОЕЗДКА-ГЛОБ-553",
    riderGlobalId: "ПАС-700882",
    driverGlobalId: "ВОД-900442",
    driverTopupIdentityId: "ИД-ПОП-445902",
    riderName: "Пассажир ждёт ответ",
    driverName: "Водитель дал объяснение",
    reason: "Грубость, чистота авто, спор по оценке",
    status: "ждёт доказательства",
    risk: "высокий",
    deadline: "01:05",
    country: "страна из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    currency: "валюта из списка",
    operator: "оператор-2",
    missing: ["фото салона", "история чата"],
    currentProblem: "Нужно запросить доказательства и подготовить официальный ответ пассажиру и водителю."
  },
  {
    complaintGlobalId: "ЖАЛ-ГЛОБ-2026-000773",
    orderGlobalId: "ЗАК-ГЛОБ-773",
    tripGlobalId: "ПОЕЗДКА-ГЛОБ-554",
    riderGlobalId: "ПАС-700883",
    driverGlobalId: "ВОД-900443",
    driverTopupIdentityId: "ИД-ПОП-445903",
    riderName: "Пассажир подал апелляцию",
    driverName: "Водитель оспаривает решение",
    reason: "Апелляция по закрытому решению",
    status: "апелляция",
    risk: "средний",
    deadline: "03:40",
    country: "страна из сервера",
    city: "город из сервера",
    tariff: "тариф из заказа",
    amount: "сумма из заказа",
    currency: "валюта из списка",
    operator: "старший оператор",
    missing: ["решение апелляции"],
    currentProblem: "Нужно назначить ответственного и дать решение по апелляции."
  }
];

const STEPS_027F: Step027F[] = [
  { key: "take", title: "1. Принять дело", goal: "зафиксировать оператора и начало срока", path: SERVER_PATHS_027F.takeCase, action: "Принять дело" },
  { key: "contact", title: "2. Связаться", goal: "пассажир и водитель отдельно", path: SERVER_PATHS_027F.saveContact, action: "Сохранить результат связи" },
  { key: "evidence", title: "3. Собрать доказательства", goal: "маршрут, отмена, оплата, ожидание, чат, фото", path: SERVER_PATHS_027F.buildEvidence, action: "Собрать пакет доказательств" },
  { key: "facts", title: "4. Проверить факты", goal: "понять, кто прав и чего не хватает", path: SERVER_PATHS_027F.checkRoute, action: "Проверить факты" },
  { key: "decision", title: "5. Принять решение", goal: "решение без фейка и без денег", path: SERVER_PATHS_027F.saveDecision, action: "Сохранить решение" },
  { key: "reply", title: "6. Отправить ответы", goal: "официально пассажиру и водителю", path: SERVER_PATHS_027F.sendRiderReply, action: "Отправить ответы" },
  { key: "appeal", title: "7. Апелляция", goal: "открыть или закрыть апелляцию", path: SERVER_PATHS_027F.openAppeal, action: "Открыть апелляцию" },
  { key: "close", title: "8. Закрыть дело", goal: "только после ответа сервера", path: SERVER_PATHS_027F.closeCase, action: "Закрыть дело" }
];

const EVIDENCE_027F: Evidence027F[] = [
  { title: "Маршрут", state: "проверить", detail: "точки, отклонение, длительность, расстояние", path: SERVER_PATHS_027F.checkRoute, action: "Проверить маршрут" },
  { title: "Отмена", state: "проверить", detail: "кто отменил, была ли договорная отмена", path: SERVER_PATHS_027F.checkCancel, action: "Проверить отмену" },
  { title: "Оплата", state: "не хватает", detail: "списание, промо, чаевые, спорная сумма", path: SERVER_PATHS_027F.checkPayment, action: "Проверить оплату" },
  { title: "Ожидание", state: "проверить", detail: "прибытие, простой, таймер ожидания", path: SERVER_PATHS_027F.checkWaiting, action: "Проверить ожидание" },
  { title: "Чат и звонки", state: "не хватает", detail: "переписка, попытки связи, объяснения", path: SERVER_PATHS_027F.requestChatAudio, action: "Запросить чат и звонки" },
  { title: "Фото и медиа", state: "не хватает", detail: "салон, повреждения, вложения сторон", path: SERVER_PATHS_027F.requestPhoto, action: "Запросить фото" }
];

const DECISIONS_027F = ["нет нарушения", "виноват водитель", "виноват пассажир", "спорно", "нужна проверка старшего", "нужна проверка владельца"];
const FILTERS_027F: (CaseStatus027F | "all")[] = ["all", "новая", "срочная", "в работе", "ждёт связь", "ждёт доказательства", "решение", "апелляция", "закрыта"];

function base027F(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers027F(config: AdminApiConfig): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function iso027F(): string {
  return new Date().toISOString();
}

export function TaxiAdminComplaints027F({ config, setNotice }: Props027F) {
  const [cases] = useState<GlobalComplaint027F[]>(CASES_027F);
  const [selectedId, setSelectedId] = useState(CASES_027F[0].complaintGlobalId);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CaseStatus027F | "all">("all");
  const [newCurrency, setNewCurrency] = useState("");
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [activeStep, setActiveStep] = useState(STEPS_027F[0].key);
  const [contactNote, setContactNote] = useState("");
  const [repeatAt, setRepeatAt] = useState("");
  const [riderReply, setRiderReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [replyTemplate, setReplyTemplate] = useState("neutral_official_reply");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [decision, setDecision] = useState(DECISIONS_027F[0]);
  const [decisionReason, setDecisionReason] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [appealReviewer, setAppealReviewer] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [handoffReason, setHandoffReason] = useState("");
  const [events, setEvents] = useState<ServerEvent027F[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const selectedCase = cases.find((item) => item.complaintGlobalId === selectedId) || cases[0];
  const activeStepData = STEPS_027F.find((step) => step.key === activeStep) || STEPS_027F[0];
  const lastEvent = events[0];

  const filteredCases = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((item) => {
      const byFilter = filter === "all" || item.status === filter;
      const haystack = [item.complaintGlobalId, item.orderGlobalId, item.tripGlobalId, item.riderGlobalId, item.driverGlobalId, item.driverTopupIdentityId, item.riderName, item.driverName, item.reason, item.country, item.city].join(" ").toLowerCase();
      return byFilter && (!q || haystack.includes(q));
    });
  }, [cases, filter, query]);

  const addCurrency = () => {
    const value = newCurrency.trim().toUpperCase();
    if (!value) return;
    if (!currencyList.includes(value)) setCurrencyList((items) => [...items, value]);
    setSelectedCurrency(value);
    setNewCurrency("");
  };

  const writeServerEvent = (entry: ServerEvent027F) => setEvents((items) => [entry, ...items].slice(0, 8));

  const sendAction = async (action: string, path: string, extra: Record<string, unknown> = {}) => {
    setBusy(action);
    const payload = {
      complaintGlobalId: selectedCase.complaintGlobalId,
      orderGlobalId: selectedCase.orderGlobalId,
      tripGlobalId: selectedCase.tripGlobalId,
      riderGlobalId: selectedCase.riderGlobalId,
      driverGlobalId: selectedCase.driverGlobalId,
      driverTopupIdentityId: selectedCase.driverTopupIdentityId,
      selectedCurrency,
      ...extra
    };
    try {
      const response = await fetch(`${base027F(config)}${path}`, { method: "POST", headers: headers027F(config), body: JSON.stringify(payload) });
      let message = "сервер ответил без текста";
      try {
        const data = await response.json();
        message = String(data?.message || data?.status || JSON.stringify(data));
      } catch {
        message = await response.text();
      }
      const event: ServerEvent027F = { at: iso027F(), action, path, result: response.status, ok: response.ok, message: message || "сервер ответил без текста" };
      writeServerEvent(event);
      setNotice(response.ok ? `Сервер подтвердил действие` : `Сервер отклонил действие`);
    } catch (error) {
      const event: ServerEvent027F = { at: iso027F(), action, path, result: "нет связи", ok: false, message: error instanceof Error ? error.message : "ошибка сети" };
      writeServerEvent(event);
      setNotice(`Ошибка сервера`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="complaints027f" data-admin-ui-027f-complaints-global-ru-case-center={ADMIN_UI_027F_COMPLAINTS_GLOBAL_RU_CASE_CENTER}>
      <header className="c27fTop">
        <div>
          <span>Жалобы / обращения</span>
          <h2>Глобальный центр обработки и решения проблемы</h2>
          <p>Дело ведётся по глобальному номеру жалобы, номеру пассажира, номеру водителя и номеру пополнения баланса водителя.</p>
        </div>
        <div className="c27fDeadline">
          <b>{selectedCase.deadline}</b>
          <span>срок ответа</span>
          <button type="button" onClick={() => void sendAction("Открыть дело", SERVER_PATHS_027F.openCase)}>Открыть дело</button>
        </div>
      </header>

      <div className="c27fShell">
        <aside className="c27fInbox" data-visible-block="очередь жалоб">
          <div className="c27fPanelTitle">
            <b>01</b>
            <div><h3>Очередь жалоб</h3><p>глобальный поиск по всем номерам</p></div>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="поиск: жалоба, заказ, поездка, пассажир, водитель, пополнение" />
          <select value={filter} onChange={(event) => setFilter(event.target.value as CaseStatus027F | "all")}>
            {FILTERS_027F.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <div className="c27fCards">
            {filteredCases.map((item) => (
              <button key={item.complaintGlobalId} type="button" className={item.complaintGlobalId === selectedId ? "active" : ""} onClick={() => setSelectedId(item.complaintGlobalId)}>
                <strong>{item.complaintGlobalId}</strong>
                <span>{item.reason}</span>
                <small>пассажир: {item.riderGlobalId}</small>
                <small>водитель: {item.driverGlobalId}</small>
                <small>пополнение: {item.driverTopupIdentityId}</small>
                <em>{item.status} · риск {item.risk} · срок {item.deadline}</em>
              </button>
            ))}
          </div>
        </aside>

        <main className="c27fCase" data-visible-block="открытое глобальное дело">
          <section className="c27fCaseHero" data-visible-block="паспорт дела">
            <div className="c27fHeroHead">
              <div>
                <span>Открытое дело</span>
                <h3>{selectedCase.complaintGlobalId}</h3>
                <p>{selectedCase.currentProblem}</p>
              </div>
              <strong className={`risk-${selectedCase.risk}`}>риск: {selectedCase.risk}</strong>
            </div>
            <div className="c27fIdGrid" data-visible-block="глобальные идентификаторы">
              <article><span>Номер жалобы</span><b>{selectedCase.complaintGlobalId}</b></article>
              <article><span>Номер заказа</span><b>{selectedCase.orderGlobalId}</b></article>
              <article><span>Номер поездки</span><b>{selectedCase.tripGlobalId}</b></article>
              <article><span>Номер пассажира</span><b>{selectedCase.riderGlobalId}</b></article>
              <article><span>Номер водителя</span><b>{selectedCase.driverGlobalId}</b></article>
              <article className="topup"><span>Номер пополнения водителя</span><b>{selectedCase.driverTopupIdentityId}</b></article>
            </div>
            <div className="c27fFacts">
              <span>пассажир: <b>{selectedCase.riderName}</b></span>
              <span>водитель: <b>{selectedCase.driverName}</b></span>
              <span>рынок: <b>{selectedCase.country}</b></span>
              <span>город: <b>{selectedCase.city}</b></span>
              <span>тариф: <b>{selectedCase.tariff}</b></span>
              <span>сумма: <b>{selectedCase.amount}</b></span>
            </div>
            <div className="c27fCurrency" data-visible-block="мультивалютный список и выбор">
              <label>Валюта дела</label>
              <input value={newCurrency} onChange={(event) => setNewCurrency(event.target.value)} placeholder="добавить валюту из серверной настройки" />
              <button type="button" onClick={addCurrency}>Добавить валюту</button>
              <select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}>
                <option value="">выбрать валюту из списка</option>
                {currencyList.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </section>

          <section className="c27fProcess" data-visible-block="пошаговый процесс решения">
            <div className="c27fPanelTitle">
              <b>02</b>
              <div><h3>Путь решения проблемы</h3><p>оператор видит следующий шаг, а не заполняет хаос</p></div>
            </div>
            <div className="c27fStepRail">
              {STEPS_027F.map((step) => (
                <button key={step.key} type="button" className={activeStep === step.key ? "active" : ""} onClick={() => setActiveStep(step.key)}>
                  <strong>{step.title}</strong>
                  <span>{step.goal}</span>
                </button>
              ))}
            </div>
            <div className="c27fStepAction">
              <div><h4>{activeStepData.title}</h4><p>{activeStepData.goal}</p></div>
              <button type="button" onClick={() => void sendAction(activeStepData.action, activeStepData.path, { activeStep })}>{busy === activeStepData.action ? "ожидаем сервер" : activeStepData.action}</button>
            </div>
          </section>

          <section className="c27fWorkspace" data-visible-block="рабочая зона обработки">
            <article className="c27fWorkCard" data-visible-block="связь с пассажиром и водителем">
              <h3>Связь</h3>
              <p>Пассажир и водитель обрабатываются отдельно. Результат связи фиксируется сервером.</p>
              <div className="c27fActionGrid">
                <button type="button" onClick={() => void sendAction("Позвонить пассажиру", SERVER_PATHS_027F.callRider)}>Позвонить пассажиру</button>
                <button type="button" onClick={() => void sendAction("Позвонить водителю", SERVER_PATHS_027F.callDriver)}>Позвонить водителю</button>
                <button type="button" onClick={() => void sendAction("Открыть чат пассажира", SERVER_PATHS_027F.chatRider)}>Открыть чат пассажира</button>
                <button type="button" onClick={() => void sendAction("Открыть чат водителя", SERVER_PATHS_027F.chatDriver)}>Открыть чат водителя</button>
              </div>
              <textarea value={contactNote} onChange={(event) => setContactNote(event.target.value)} placeholder="результат связи: кто ответил, что сказал, что нужно сделать дальше" />
              <div className="c27fTwo">
                <input value={repeatAt} onChange={(event) => setRepeatAt(event.target.value)} placeholder="повторный контакт" />
                <button type="button" onClick={() => void sendAction("Сохранить результат связи", SERVER_PATHS_027F.saveContact, { contactNote, repeatAt })}>Сохранить связь</button>
              </div>
            </article>

            <article className="c27fWorkCard" data-visible-block="официальные ответы">
              <h3>Официальные ответы</h3>
              <p>Отдельный текст пассажиру и отдельный текст водителю.</p>
              <input value={replyTemplate} onChange={(event) => setReplyTemplate(event.target.value)} placeholder="шаблон ответа" />
              <textarea value={riderReply} onChange={(event) => setRiderReply(event.target.value)} placeholder="официальный ответ пассажиру" />
              <textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} placeholder="официальный ответ водителю" />
              <div className="c27fActionGrid">
                <button type="button" onClick={() => void sendAction("Предпросмотр ответа пассажиру", SERVER_PATHS_027F.previewRiderReply, { riderReply, replyTemplate })}>Предпросмотр пассажиру</button>
                <button type="button" onClick={() => void sendAction("Предпросмотр ответа водителю", SERVER_PATHS_027F.previewDriverReply, { driverReply, replyTemplate })}>Предпросмотр водителю</button>
                <button type="button" onClick={() => void sendAction("Отправить ответ пассажиру", SERVER_PATHS_027F.sendRiderReply, { riderReply, replyTemplate })}>Отправить пассажиру</button>
                <button type="button" onClick={() => void sendAction("Отправить ответ водителю", SERVER_PATHS_027F.sendDriverReply, { driverReply, replyTemplate })}>Отправить водителю</button>
              </div>
            </article>
          </section>

          <section className="c27fEvidence" data-visible-block="центр доказательств">
            <div className="c27fPanelTitle">
              <b>03</b>
              <div><h3>Доказательства</h3><p>показывает что есть, чего не хватает, что проверяется</p></div>
            </div>
            <div className="c27fEvidenceGrid">
              {EVIDENCE_027F.map((item) => (
                <article key={item.title} className={`state-${item.state.replace(" ", "-")}`}>
                  <span>{item.state}</span>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                  <button type="button" onClick={() => void sendAction(item.action, item.path, { evidenceNote, evidence: item.title })}>{item.action}</button>
                </article>
              ))}
            </div>
            <textarea value={evidenceNote} onChange={(event) => setEvidenceNote(event.target.value)} placeholder="заметка по доказательствам: что получено, чего не хватает, что требует проверки" />
            <button type="button" onClick={() => void sendAction("Собрать пакет доказательств", SERVER_PATHS_027F.buildEvidence, { evidenceNote })}>Собрать пакет доказательств</button>
          </section>
        </main>

        <aside className="c27fRight" data-visible-block="решение апелляция назначение история">
          <section data-visible-block="решение">
            <h3>Решение</h3>
            <select value={decision} onChange={(event) => setDecision(event.target.value)}>{DECISIONS_027F.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="основание решения: факты, доказательства, правила" />
            <button type="button" onClick={() => void sendAction("Сохранить решение", SERVER_PATHS_027F.saveDecision, { decision, decisionReason })}>Сохранить решение</button>
            <div className="c27fHardRule">Компенсация и блокировка запрещены без проверки и разрешения.</div>
            <button type="button" onClick={() => void sendAction("Отправить старшему", SERVER_PATHS_027F.seniorReview, { decision, decisionReason })}>Отправить старшему</button>
            <button type="button" onClick={() => void sendAction("Отправить владельцу", SERVER_PATHS_027F.ownerReview, { decision, decisionReason })}>Отправить владельцу</button>
          </section>

          <section data-visible-block="апелляция">
            <h3>Апелляция</h3>
            <textarea value={appealReason} onChange={(event) => setAppealReason(event.target.value)} placeholder="причина апелляции" />
            <input value={appealReviewer} onChange={(event) => setAppealReviewer(event.target.value)} placeholder="кто рассматривает" />
            <button type="button" onClick={() => void sendAction("Открыть апелляцию", SERVER_PATHS_027F.openAppeal, { appealReason, appealReviewer })}>Открыть апелляцию</button>
            <button type="button" onClick={() => void sendAction("Закрыть апелляцию", SERVER_PATHS_027F.closeAppeal, { appealReason, appealReviewer })}>Закрыть апелляцию</button>
          </section>

          <section data-visible-block="назначение">
            <h3>Назначение</h3>
            <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="оператор, старший или владелец" />
            <input value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="срок ответа" />
            <textarea value={handoffReason} onChange={(event) => setHandoffReason(event.target.value)} placeholder="причина передачи" />
            <button type="button" onClick={() => void sendAction("Назначить ответственного", SERVER_PATHS_027F.assignOperator, { assignee, handoffReason })}>Назначить ответственного</button>
            <button type="button" onClick={() => void sendAction("Поставить срок", SERVER_PATHS_027F.setDeadline, { deadline })}>Поставить срок</button>
          </section>

          <section className="c27fHistory" data-visible-block="история сервера">
            <h3>История сервера</h3>
            <div className={lastEvent?.ok ? "c27fLast success" : "c27fLast danger"}>
              <strong>{lastEvent ? lastEvent.action : "действий ещё нет"}</strong>
              <span>{lastEvent ? `${lastEvent.result} · ${lastEvent.path}` : "здесь будет серверный путь, ответ и ошибка"}</span>
              <p>{lastEvent ? lastEvent.message : "локального успеха нет"}</p>
            </div>
            <div className="c27fHistoryList">
              {events.map((event) => (
                <article key={`${event.at}-${event.action}-${event.path}`}>
                  <b>{event.ok ? "успешно" : "ошибка"}</b>
                  <strong>{event.action}</strong>
                  <small>{event.result} · {event.path}</small>
                  <span>{event.message}</span>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
