import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_COMPLAINTS_027A_FIX1_MARKER = "TAXI-ADMIN-UI-027A-FIX1-COMPLAINTS-FULL-FUNCTION-SCREEN-ONLY";

type Props027AFix1 = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
  labels: Record<string, string>;
  tabs: readonly string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<any>>;
};

type CurrencyRow027AFix1 = { id: string; code: string; name: string; source: string };
type ServerResult027AFix1 = { action: string; route: string; status: number | string; ok: boolean; message: string; at: string } | null;

type ComplaintCase027AFix1 = {
  complaintId: string;
  orderId: string;
  tripId: string;
  riderId: string;
  driverId: string;
  riderPhone: string;
  driverPhone: string;
  queueStatus: string;
  priority: string;
  operatorId: string;
  team: string;
  rule: string;
  timerMinutes: string;
  contactNoteRider: string;
  contactNoteDriver: string;
  riderReply: string;
  driverReply: string;
  riderMessageDraft: string;
  driverMessageDraft: string;
  evidenceRequest: string;
  riderEvidenceStatus: string;
  driverEvidenceStatus: string;
  routeEvidenceStatus: string;
  decision: string;
  publicDecision: string;
  privateDecision: string;
  appealReason: string;
  appealDeadline: string;
  disputedAmount: string;
  currencyCode: string;
  currencyName: string;
  ownerEscalationReason: string;
};

type Copy027AFix1 = {
  screenTitle: string; screenLead: string; protectedReady: string; onlyOne: string; noFake: string; backendOnly: string; navLabel: string;
  queueBoard: string; queueHint: string; search: string; queueStatus: string; priority: string; timer: string; loadQueue: string; openCase: string;
  casePassport: string; complaintId: string; orderId: string; tripId: string; riderId: string; driverId: string; rule: string; operatorId: string; team: string;
  contactCenter: string; riderSide: string; driverSide: string; phoneRider: string; phoneDriver: string; callRider: string; callDriver: string; logRiderCall: string; logDriverCall: string; draftRider: string; draftDriver: string; saveDraftRider: string; saveDraftDriver: string;
  replies: string; riderReply: string; driverReply: string; sendRiderReply: string; sendDriverReply: string;
  evidence: string; evidenceRequest: string; riderEvidence: string; driverEvidence: string; routeEvidence: string; requestEvidence: string; attachEvidenceNote: string; evidencePack: string;
  decisionPanel: string; decision: string; publicDecision: string; privateDecision: string; disputedAmount: string; currencyList: string; currencyCode: string; currencyName: string; addCurrency: string; chooseCurrency: string; saveDecision: string; openAppeal: string; appealReason: string; appealDeadline: string;
  assignment: string; assignOperator: string; escalateOwner: string; ownerEscalationReason: string;
  result: string; noAction: string; safetyTitle: string; safetyA: string; safetyB: string; safetyC: string; safetyD: string; contactNotDecision: string; backendStarted: string; requestFailed: string;
};

const COPY027A_FIX1: Record<AdminLanguage, Copy027AFix1> = {
  ru: {
    screenTitle: "Жалобы — полный рабочий экран", screenLead: "Оператор видит дело, стороны, связь, ответы, доказательства, решение и апелляцию на одном понятном экране. Никаких локальных успехов: каждое официальное действие ждёт ответ сервера.", protectedReady: "Заявки / Заказы / Тарифы не тронуты", onlyOne: "Доработан только экран Жалобы", noFake: "Без фейка", backendOnly: "Только серверный ответ", navLabel: "Навигация такси",
    queueBoard: "Очередь и поиск жалобы", queueHint: "Найти жалобу, открыть карточку, проверить регламент и приоритет.", search: "Поиск по номеру жалобы, заказа, поездки или стороне", queueStatus: "Статус очереди", priority: "Приоритет", timer: "Осталось минут", loadQueue: "Загрузить очередь", openCase: "Открыть дело",
    casePassport: "Паспорт дела", complaintId: "Номер жалобы", orderId: "Номер заказа", tripId: "Номер поездки", riderId: "Номер клиента", driverId: "Номер водителя", rule: "Нарушенное правило", operatorId: "Оператор", team: "Группа проверки",
    contactCenter: "Связь с клиентом и водителем", riderSide: "Клиент", driverSide: "Водитель", phoneRider: "Телефон клиента", phoneDriver: "Телефон водителя", callRider: "Позвонить клиенту", callDriver: "Позвонить водителю", logRiderCall: "Зафиксировать звонок клиенту", logDriverCall: "Зафиксировать звонок водителю", draftRider: "Черновик сообщения клиенту", draftDriver: "Черновик сообщения водителю", saveDraftRider: "Сохранить черновик клиенту", saveDraftDriver: "Сохранить черновик водителю",
    replies: "Официальные ответы", riderReply: "Ответ клиенту", driverReply: "Ответ водителю", sendRiderReply: "Отправить ответ клиенту", sendDriverReply: "Отправить ответ водителю",
    evidence: "Доказательства и проверка", evidenceRequest: "Что запросить у сторон", riderEvidence: "Доказательства клиента", driverEvidence: "Доказательства водителя", routeEvidence: "Маршрут / время / отмена", requestEvidence: "Запросить доказательства", attachEvidenceNote: "Добавить заметку к доказательствам", evidencePack: "Сформировать пакет доказательств",
    decisionPanel: "Решение и апелляция", decision: "Решение после проверки", publicDecision: "Публичное объяснение", privateDecision: "Внутреннее обоснование", disputedAmount: "Спорная сумма", currencyList: "Список валют", currencyCode: "Код валюты", currencyName: "Название валюты", addCurrency: "Добавить валюту", chooseCurrency: "Выбрать валюту", saveDecision: "Сохранить решение", openAppeal: "Открыть апелляцию", appealReason: "Причина апелляции", appealDeadline: "Срок апелляции",
    assignment: "Назначение и эскалация", assignOperator: "Назначить оператора", escalateOwner: "Передать владельцу", ownerEscalationReason: "Причина передачи владельцу",
    result: "Последний ответ сервера", noAction: "Официальных действий ещё не было", safetyTitle: "Контроль без фейка", safetyA: "Ответ, решение, апелляция и запрос доказательств уходят в серверный маршрут.", safetyB: "Звонок и черновик не закрывают жалобу и не меняют решение.", safetyC: "Деньги, кошелёк, выплаты, провайдер и база не выполняются из этого экрана.", safetyD: "Если сервер вернул ошибку — экран показывает ошибку, а не успех.", contactNotDecision: "Связь открыта. Это не решение и не успех сервера.", backendStarted: "Запрос отправлен. Ждём ответ сервера.", requestFailed: "Сервер не подтвердил действие. Локальный успех не записан."
  },
  en: {
    screenTitle: "Complaints — full work screen", screenLead: "The operator sees the case, parties, contact, replies, evidence, decision, and appeal in one focused screen. No local success: every official action waits for official response.", protectedReady: "Applications / Orders / Tariffs are untouched", onlyOne: "Only Complaints changed", noFake: "No false", backendOnly: "Official response only", navLabel: "Taksi navigation",
    queueBoard: "Complaint queue and search", queueHint: "Find a complaint, open the case, check timer and priority.", search: "Search by complaint, order, trip or party", queueStatus: "Queue state", priority: "Priority", timer: "Minutes left", loadQueue: "Load queue", openCase: "Open case",
    casePassport: "Case passport", complaintId: "Complaint number", orderId: "Order number", tripId: "Trip number", riderId: "Rider number", driverId: "Driver number", rule: "Broken rule", operatorId: "Operator", team: "Review team",
    contactCenter: "Contact rider and driver", riderSide: "Rider", driverSide: "Driver", phoneRider: "Rider phone", phoneDriver: "Driver phone", callRider: "Call rider", callDriver: "Call driver", logRiderCall: "Log rider call", logDriverCall: "Log driver call", draftRider: "Rider message draft", draftDriver: "Driver message draft", saveDraftRider: "Save rider draft", saveDraftDriver: "Save driver draft",
    replies: "Official replies", riderReply: "Reply to rider", driverReply: "Reply to driver", sendRiderReply: "Send rider reply", sendDriverReply: "Send driver reply",
    evidence: "Evidence and review", evidenceRequest: "Evidence to request", riderEvidence: "Rider evidence", driverEvidence: "Driver evidence", routeEvidence: "Route / time / cancel", requestEvidence: "Request evidence", attachEvidenceNote: "Add evidence note", evidencePack: "Build evidence pack",
    decisionPanel: "Decision and appeal", decision: "Reviewed decision", publicDecision: "Public explanation", privateDecision: "Internal reasoning", disputedAmount: "Disputed amount", currencyList: "Currency list", currencyCode: "Currency code", currencyName: "Currency name", addCurrency: "Add currency", chooseCurrency: "Choose currency", saveDecision: "Save decision", openAppeal: "Open appeal", appealReason: "Appeal reason", appealDeadline: "Appeal deadline",
    assignment: "Assignment and escalation", assignOperator: "Assign operator", escalateOwner: "Escalate to owner", ownerEscalationReason: "principal escalation reason",
    result: "Last official response", noAction: "No official action yet", safetyTitle: "No-fake control", safetyA: "Reply, decision, appeal and evidence request go to backend route.", safetyB: "Call and draft do not close complaint and do not change decision.", safetyC: "Money, wallet, payouts, provider and database actions are not executed from this screen.", safetyD: "If server returns an error, the screen shows error, not success.", contactNotDecision: "Contact opened. This is not a decision or server success.", backendStarted: "Request sent. Waiting for official response.", requestFailed: "Server did not confirm the action. No local success was written."
  },
  uz: {
    screenTitle: "Shikoyatlar — to ‘liq ish ekrani", screenLead: "Operator ishni, tomonlarni, aloqa, javoblar, dalillar, qaror va apellyatsiyani bitta aniq ekranda ko ‘radi. Mahalliy soxta muvaffaqiyat yo ‘q: har bir rasmiy amal server javobini kutadi.", protectedReady: "Arizalar / Buyurtmalar / Tariflar o ‘zgarmadi", onlyOne: "Faqat Shikoyatlar o ‘zgardi", noFake: "Soxta natija yo ‘q", backendOnly: "Faqat server javobi", navLabel: "Taksi navigatsiyasi",
    queueBoard: "Shikoyat navbati va qidiruv", queueHint: "Shikoyatni topish, ishni ochish, muddat va ustuvorlikni tekshirish.", search: "Shikoyat, buyurtma, safar yoki tomon bo ‘yicha qidirish", queueStatus: "Navbat holati", priority: "Ustuvorlik", timer: "Qolgan daqiqa", loadQueue: "Navbatni yuklash", openCase: "Ishni ochish",
    casePassport: "Ish pasporti", complaintId: "Shikoyat raqami", orderId: "Buyurtma raqami", tripId: "Safar raqami", riderId: "Mijoz raqami", driverId: "Haydovchi raqami", rule: "Buzilgan qoida", operatorId: "Operator", team: "Tekshiruv guruhi",
    contactCenter: "Mijoz va haydovchi bilan aloqa", riderSide: "Mijoz", driverSide: "Haydovchi", phoneRider: "Mijoz telefoni", phoneDriver: "Haydovchi telefoni", callRider: "Mijozga qo ‘ng ‘iroq", callDriver: "Haydovchiga qo ‘ng ‘iroq", logRiderCall: "Mijoz qo ‘ng ‘irog ‘ini qayd etish", logDriverCall: "Haydovchi qo ‘ng ‘irog ‘ini qayd etish", draftRider: "Mijozga xabar qoralamasi", draftDriver: "Haydovchiga xabar qoralamasi", saveDraftRider: "Mijoz qoralamasini saqlash", saveDraftDriver: "Haydovchi qoralamasini saqlash",
    replies: "Rasmiy javoblar", riderReply: "Mijozga javob", driverReply: "Haydovchiga javob", sendRiderReply: "Mijozga javob yuborish", sendDriverReply: "Haydovchiga javob yuborish",
    evidence: "Dalillar va tekshiruv", evidenceRequest: "Qanday dalil so ‘raladi", riderEvidence: "Mijoz dalillari", driverEvidence: "Haydovchi dalillari", routeEvidence: "Yo ‘nalish / vaqt / bekor qilish", requestEvidence: "Dalil so ‘rash", attachEvidenceNote: "Dalilga izoh qo ‘shish", evidencePack: "Dalillar paketini tayyorlash",
    decisionPanel: "Qaror va apellyatsiya", decision: "Tekshiruvdan keyingi qaror", publicDecision: "Ochiq tushuntirish", privateDecision: "Ichki asos", disputedAmount: "Bahsli summa", currencyList: "Valyutalar ro ‘yxati", currencyCode: "Valyuta kodi", currencyName: "Valyuta nomi", addCurrency: "Valyuta qo ‘shish", chooseCurrency: "Valyutani tanlash", saveDecision: "Qarorni saqlash", openAppeal: "Apellyatsiya ochish", appealReason: "Apellyatsiya sababi", appealDeadline: "Apellyatsiya muddati",
    assignment: "Tayinlash va yuqoriga chiqarish", assignOperator: "Operator tayinlash", escalateOwner: "Egasiga yuborish", ownerEscalationReason: "Egasiga yuborish sababi",
    result: "Oxirgi server javobi", noAction: "Hali rasmiy amal yo ‘q", safetyTitle: "Soxtasiz nazorat", safetyA: "Javob, qaror, apellyatsiya va dalil so ‘rovi server yo ‘liga yuboriladi.", safetyB: "Qo ‘ng ‘iroq va qoralama shikoyatni yopmaydi va qarorni o ‘zgartirmaydi.", safetyC: "Pul, hamyon, to ‘lov, provayder va baza amallari bu ekrandan bajarilmaydi.", safetyD: "Server xato qaytarsa, ekran xatoni ko ‘rsatadi, muvaffaqiyat emas.", contactNotDecision: "Aloqa ochildi. Bu qaror ham, server muvaffaqiyati ham emas.", backendStarted: "So ‘rov yuborildi. Server javobi kutilmoqda.", requestFailed: "Server amalni tasdiqlamadi. Mahalliy muvaffaqiyat yozilmadi."
  },
  zh: {
    screenTitle: "投诉 — 完整处理页面", screenLead: "操作员在一个清晰页面中处理案件、双方联系、回复、证据、决定和申诉。不写本地假成功：所有正式操作都等待服务器回应。", protectedReady: "申请 / 订单 / 费率未修改", onlyOne: "只修改投诉页面", noFake: "不做假成功", backendOnly: "只看服务器回应", navLabel: "出租车导航",
    queueBoard: "投诉队列和搜索", queueHint: "查找投诉、打开案件、检查时限和优先级。", search: "按投诉、订单、行程或人员搜索", queueStatus: "队列状态", priority: "优先级", timer: "剩余分钟", loadQueue: "加载队列", openCase: "打开案件",
    casePassport: "案件信息", complaintId: "投诉编号", orderId: "订单编号", tripId: "行程编号", riderId: "乘客编号", driverId: "司机编号", rule: "违反规则", operatorId: "操作员", team: "审核小组",
    contactCenter: "联系乘客和司机", riderSide: "乘客", driverSide: "司机", phoneRider: "乘客电话", phoneDriver: "司机电话", callRider: "拨打乘客", callDriver: "拨打司机", logRiderCall: "记录乘客通话", logDriverCall: "记录司机通话", draftRider: "给乘客的消息草稿", draftDriver: "给司机的消息草稿", saveDraftRider: "保存乘客草稿", saveDraftDriver: "保存司机草稿",
    replies: "正式回复", riderReply: "回复乘客", driverReply: "回复司机", sendRiderReply: "发送乘客回复", sendDriverReply: "发送司机回复",
    evidence: "证据和审核", evidenceRequest: "需要请求的证据", riderEvidence: "乘客证据", driverEvidence: "司机证据", routeEvidence: "路线 / 时间 / 取消", requestEvidence: "请求证据", attachEvidenceNote: "添加证据备注", evidencePack: "生成证据包",
    decisionPanel: "决定和申诉", decision: "审核后的决定", publicDecision: "公开说明", privateDecision: "内部依据", disputedAmount: "争议金额", currencyList: "货币列表", currencyCode: "货币代码", currencyName: "货币名称", addCurrency: "添加货币", chooseCurrency: "选择货币", saveDecision: "保存决定", openAppeal: "开启申诉", appealReason: "申诉原因", appealDeadline: "申诉期限",
    assignment: "分配和升级", assignOperator: "分配操作员", escalateOwner: "提交给负责人", ownerEscalationReason: "提交负责人原因",
    result: "最后服务器回应", noAction: "还没有正式操作", safetyTitle: "无假成功控制", safetyA: "回复、决定、申诉和证据请求都发送到服务器路由。", safetyB: "通话和草稿不会关闭投诉，也不会改变决定。", safetyC: "此页面不执行资金、钱包、付款、服务商和数据库操作。", safetyD: "如果服务器返回错误，页面显示错误，不显示成功。", contactNotDecision: "联系已打开。这不是决定，也不是服务器成功。", backendStarted: "请求已发送，等待服务器回应。", requestFailed: "服务器未确认操作。没有写入本地成功。"
  },
};

const initialCase027AFix1: ComplaintCase027AFix1 = {
  complaintId: "", orderId: "", tripId: "", riderId: "", driverId: "", riderPhone: "", driverPhone: "", queueStatus: "new", priority: "normal", operatorId: "", team: "", rule: "", timerMinutes: "", contactNoteRider: "", contactNoteDriver: "", riderReply: "", driverReply: "", riderMessageDraft: "", driverMessageDraft: "", evidenceRequest: "", riderEvidenceStatus: "not_requested", driverEvidenceStatus: "not_requested", routeEvidenceStatus: "not_checked", decision: "needs_review", publicDecision: "", privateDecision: "", appealReason: "", appealDeadline: "", disputedAmount: "", currencyCode: "", currencyName: "", ownerEscalationReason: "",
};

function clean027AFix1(value: string): string {
  const cleaned = String(value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return cleaned || "manual";
}

function base027AFix1(config: AdminApiConfig): string {
  return (config.baseUrl || "").replace(/\/+$/, "");
}

export function TaxiAdminComplaints027A({ language, config, setNotice, labels, tabs, activeTab, setActiveTab }: Props027AFix1) {
  const t = COPY027A_FIX1[language] || COPY027A_FIX1.ru;
  const [form, setForm] = useState<ComplaintCase027AFix1>(initialCase027AFix1);
  const [busy, setBusy] = useState("");
  const [result, setResult] = useState<ServerResult027AFix1>(null);
  const [currencyRows, setCurrencyRows] = useState<CurrencyRow027AFix1[]>([]);
  const [queueFilter, setQueueFilter] = useState("");

  const caseId = clean027AFix1(form.complaintId);
  const routes = useMemo(() => ({
    queue: "/api/admin/taxi/complaints/027a/queue",
    open: `/api/admin/taxi/complaints/027a/${caseId}`,
    logRiderCall: `/api/admin/taxi/complaints/027a/${caseId}/contact/rider/call-log`,
    logDriverCall: `/api/admin/taxi/complaints/027a/${caseId}/contact/driver/call-log`,
    riderDraft: `/api/admin/taxi/complaints/027a/${caseId}/contact/rider/draft`,
    driverDraft: `/api/admin/taxi/complaints/027a/${caseId}/contact/driver/draft`,
    riderReply: `/api/admin/taxi/complaints/027a/${caseId}/reply/rider`,
    driverReply: `/api/admin/taxi/complaints/027a/${caseId}/reply/driver`,
    evidenceRequest: `/api/admin/taxi/complaints/027a/${caseId}/evidence/request`,
    evidenceNote: `/api/admin/taxi/complaints/027a/${caseId}/evidence/note`,
    evidencePack: `/api/admin/taxi/complaints/027a/${caseId}/evidence/pack`,
    decision: `/api/admin/taxi/complaints/027a/${caseId}/decision/reviewed`,
    appeal: `/api/admin/taxi/complaints/027a/${caseId}/appeal/open`,
    assign: `/api/admin/taxi/complaints/027a/${caseId}/operator/assign`,
    owner: `/api/admin/taxi/complaints/027a/${caseId}/owner/escalation-request`,
  }), [caseId]);

  const patch = (key: keyof ComplaintCase027AFix1, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const request = async (key: string, label: string, route: string, method: "GET" | "POST") => {
    setBusy(key);
    setNotice(t.backendStarted);
    try {
      const response = await fetch(`${base027AFix1(config)}${route}`, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.token}` },
        body: method === "POST" ? JSON.stringify({ ...form, queueFilter, currencyRows, noLocalSuccess: true, source: TAXI_COMPLAINTS_027A_FIX1_MARKER }) : undefined,
      });
      let message = response.statusText || t.backendOnly;
      try {
        const data = await response.json();
        message = typeof data?.message === "string" ? data.message : message;
      } catch {}
      setResult({ action: label, route, status: response.status, ok: response.ok, message, at: new Date().toISOString() });
      setNotice(response.ok ? `${label}: ${message}` : `${label}: ${t.requestFailed}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : t.requestFailed;
      setResult({ action: label, route, status: "network_error", ok: false, message, at: new Date().toISOString() });
      setNotice(message);
    } finally {
      setBusy("");
    }
  };

  const contact = (who: "rider" | "driver") => {
    const phone = who === "rider" ? form.riderPhone : form.driverPhone;
    setResult({ action: who === "rider" ? t.callRider : t.callDriver, route: phone ? `tel:${phone}` : "tel:", status: "contact_only", ok: false, message: t.contactNotDecision, at: new Date().toISOString() });
    if (phone) window.location.href = `tel:${phone}`;
  };

  const addCurrency = () => {
    const code = form.currencyCode.trim().toUpperCase();
    const name = form.currencyName.trim();
    if (!code) return;
    setCurrencyRows((prev) => prev.some((row) => row.code === code) ? prev : [...prev, { id: `currency-${Date.now()}`, code, name, source: "operator_or_backend_config" }]);
  };

  const actionButton = (key: string, label: string, route: string, method: "GET" | "POST") => (
    <button type="button" disabled={busy === key} onClick={() => void request(key, label, route, method)}>{busy === key ? "…" : label}</button>
  );

  return (
    <section className="taxi027aFix1" data-taxi-admin-ui-027a-fix1="complaints-full-function-screen-only" data-no-fixed-currency="true" data-no-local-fake-success="true">
      <header className="taxi027aFix1Hero">
        <div>
          <p className="taxi027aFix1Eyebrow">{t.onlyOne}</p>
          <h1>{t.screenTitle}</h1>
          <p>{t.screenLead}</p>
        </div>
        <aside>
          <b>{t.protectedReady}</b>
          <span>{t.noFake}</span>
          <span>{t.backendOnly}</span>
        </aside>
      </header>

      <nav className="taxi027aFix1Tabs" aria-label={t.navLabel}>
        {tabs.map((tab) => <button key={tab} type="button" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{labels[tab] || tab}</button>)}
      </nav>

      <main className="taxi027aFix1Layout">
        <section className="taxi027aFix1Queue" data-function="complaint-queue-search-open">
          <div className="taxi027aFix1BlockHead"><span>01</span><h2>{t.queueBoard}</h2><p>{t.queueHint}</p></div>
          <label><span>{t.search}</span><input value={queueFilter} onChange={(event) => setQueueFilter(event.target.value)} /></label>
          <div className="taxi027aFix1Triplet">
            <label><span>{t.queueStatus}</span><select value={form.queueStatus} onChange={(event) => patch("queueStatus", event.target.value)}><option value="new">new</option><option value="in_review">in_review</option><option value="waiting_evidence">waiting_evidence</option><option value="appeal">appeal</option></select></label>
            <label><span>{t.priority}</span><select value={form.priority} onChange={(event) => patch("priority", event.target.value)}><option value="normal">normal</option><option value="high">high</option><option value="critical">critical</option></select></label>
            <label><span>{t.timer}</span><input value={form.timerMinutes} onChange={(event) => patch("timerMinutes", event.target.value)} /></label>
          </div>
          <div className="taxi027aFix1ButtonRow">{actionButton("queue", t.loadQueue, routes.queue, "GET")}{actionButton("open", t.openCase, routes.open, "GET")}</div>
          <div className="taxi027aFix1Safety"><h3>{t.safetyTitle}</h3><p>{t.safetyA}</p><p>{t.safetyB}</p><p>{t.safetyC}</p><p>{t.safetyD}</p></div>
        </section>

        <section className="taxi027aFix1Passport" data-function="complaint-case-passport">
          <div className="taxi027aFix1BlockHead"><span>02</span><h2>{t.casePassport}</h2></div>
          <div className="taxi027aFix1Fields">
            <label><span>{t.complaintId}</span><input value={form.complaintId} onChange={(event) => patch("complaintId", event.target.value)} /></label>
            <label><span>{t.orderId}</span><input value={form.orderId} onChange={(event) => patch("orderId", event.target.value)} /></label>
            <label><span>{t.tripId}</span><input value={form.tripId} onChange={(event) => patch("tripId", event.target.value)} /></label>
            <label><span>{t.riderId}</span><input value={form.riderId} onChange={(event) => patch("riderId", event.target.value)} /></label>
            <label><span>{t.driverId}</span><input value={form.driverId} onChange={(event) => patch("driverId", event.target.value)} /></label>
            <label><span>{t.rule}</span><input value={form.rule} onChange={(event) => patch("rule", event.target.value)} /></label>
          </div>
        </section>

        <section className="taxi027aFix1Contact" data-function="complaint-contact-rider-driver">
          <div className="taxi027aFix1BlockHead"><span>03</span><h2>{t.contactCenter}</h2></div>
          <div className="taxi027aFix1PartyGrid">
            <article>
              <h3>{t.riderSide}</h3>
              <label><span>{t.phoneRider}</span><input value={form.riderPhone} onChange={(event) => patch("riderPhone", event.target.value)} /></label>
              <label><span>{t.draftRider}</span><textarea value={form.riderMessageDraft} onChange={(event) => patch("riderMessageDraft", event.target.value)} /></label>
              <div className="taxi027aFix1ButtonRow"><button type="button" onClick={() => contact("rider")}>{t.callRider}</button>{actionButton("logRiderCall", t.logRiderCall, routes.logRiderCall, "POST")}{actionButton("saveRiderDraft", t.saveDraftRider, routes.riderDraft, "POST")}</div>
            </article>
            <article>
              <h3>{t.driverSide}</h3>
              <label><span>{t.phoneDriver}</span><input value={form.driverPhone} onChange={(event) => patch("driverPhone", event.target.value)} /></label>
              <label><span>{t.draftDriver}</span><textarea value={form.driverMessageDraft} onChange={(event) => patch("driverMessageDraft", event.target.value)} /></label>
              <div className="taxi027aFix1ButtonRow"><button type="button" onClick={() => contact("driver")}>{t.callDriver}</button>{actionButton("logDriverCall", t.logDriverCall, routes.logDriverCall, "POST")}{actionButton("saveDriverDraft", t.saveDraftDriver, routes.driverDraft, "POST")}</div>
            </article>
          </div>
        </section>

        <section className="taxi027aFix1Replies" data-function="complaint-official-replies">
          <div className="taxi027aFix1BlockHead"><span>04</span><h2>{t.replies}</h2></div>
          <div className="taxi027aFix1Dual">
            <label><span>{t.riderReply}</span><textarea value={form.riderReply} onChange={(event) => patch("riderReply", event.target.value)} /></label>
            <label><span>{t.driverReply}</span><textarea value={form.driverReply} onChange={(event) => patch("driverReply", event.target.value)} /></label>
          </div>
          <div className="taxi027aFix1ButtonRow">{actionButton("sendRiderReply", t.sendRiderReply, routes.riderReply, "POST")}{actionButton("sendDriverReply", t.sendDriverReply, routes.driverReply, "POST")}</div>
        </section>

        <section className="taxi027aFix1Evidence" data-function="complaint-evidence-review">
          <div className="taxi027aFix1BlockHead"><span>05</span><h2>{t.evidence}</h2></div>
          <label><span>{t.evidenceRequest}</span><textarea value={form.evidenceRequest} onChange={(event) => patch("evidenceRequest", event.target.value)} /></label>
          <div className="taxi027aFix1Triplet">
            <label><span>{t.riderEvidence}</span><select value={form.riderEvidenceStatus} onChange={(event) => patch("riderEvidenceStatus", event.target.value)}><option value="not_requested">not_requested</option><option value="requested">requested</option><option value="received">received</option><option value="rejected">rejected</option></select></label>
            <label><span>{t.driverEvidence}</span><select value={form.driverEvidenceStatus} onChange={(event) => patch("driverEvidenceStatus", event.target.value)}><option value="not_requested">not_requested</option><option value="requested">requested</option><option value="received">received</option><option value="rejected">rejected</option></select></label>
            <label><span>{t.routeEvidence}</span><select value={form.routeEvidenceStatus} onChange={(event) => patch("routeEvidenceStatus", event.target.value)}><option value="not_checked">not_checked</option><option value="matched">matched</option><option value="conflict">conflict</option><option value="manual_review">manual_review</option></select></label>
          </div>
          <div className="taxi027aFix1ButtonRow">{actionButton("requestEvidence", t.requestEvidence, routes.evidenceRequest, "POST")}{actionButton("attachEvidenceNote", t.attachEvidenceNote, routes.evidenceNote, "POST")}{actionButton("evidencePack", t.evidencePack, routes.evidencePack, "POST")}</div>
        </section>

        <section className="taxi027aFix1Decision" data-function="complaint-decision-appeal-currency">
          <div className="taxi027aFix1BlockHead"><span>06</span><h2>{t.decisionPanel}</h2></div>
          <div className="taxi027aFix1Fields">
            <label><span>{t.decision}</span><select value={form.decision} onChange={(event) => patch("decision", event.target.value)}><option value="needs_review">needs_review</option><option value="no_violation">no_violation</option><option value="driver_fault_reviewed">driver_fault_reviewed</option><option value="rider_fault_reviewed">rider_fault_reviewed</option><option value="owner_review_required">owner_review_required</option></select></label>
            <label><span>{t.disputedAmount}</span><input value={form.disputedAmount} onChange={(event) => patch("disputedAmount", event.target.value)} /></label>
            <label><span>{t.currencyCode}</span><input value={form.currencyCode} onChange={(event) => patch("currencyCode", event.target.value.toUpperCase())} /></label>
            <label><span>{t.currencyName}</span><input value={form.currencyName} onChange={(event) => patch("currencyName", event.target.value)} /></label>
          </div>
          <div className="taxi027aFix1Currency" data-function="complaint-multicurrency-list-selection"><h3>{t.currencyList}</h3><button type="button" onClick={addCurrency}>{t.addCurrency}</button><select value={form.currencyCode} onChange={(event) => patch("currencyCode", event.target.value)} aria-label={t.chooseCurrency}><option value="">{t.chooseCurrency}</option>{currencyRows.map((row) => <option key={row.id} value={row.code}>{row.code} · {row.name}</option>)}</select></div>
          <div className="taxi027aFix1Dual"><label><span>{t.publicDecision}</span><textarea value={form.publicDecision} onChange={(event) => patch("publicDecision", event.target.value)} /></label><label><span>{t.privateDecision}</span><textarea value={form.privateDecision} onChange={(event) => patch("privateDecision", event.target.value)} /></label></div>
          <div className="taxi027aFix1Dual"><label><span>{t.appealReason}</span><textarea value={form.appealReason} onChange={(event) => patch("appealReason", event.target.value)} /></label><label><span>{t.appealDeadline}</span><input value={form.appealDeadline} onChange={(event) => patch("appealDeadline", event.target.value)} /></label></div>
          <div className="taxi027aFix1ButtonRow">{actionButton("saveDecision", t.saveDecision, routes.decision, "POST")}{actionButton("openAppeal", t.openAppeal, routes.appeal, "POST")}</div>
        </section>

        <section className="taxi027aFix1Assign" data-function="complaint-operator-owner-escalation">
          <div className="taxi027aFix1BlockHead"><span>07</span><h2>{t.assignment}</h2></div>
          <div className="taxi027aFix1Fields">
            <label><span>{t.operatorId}</span><input value={form.operatorId} onChange={(event) => patch("operatorId", event.target.value)} /></label>
            <label><span>{t.team}</span><input value={form.team} onChange={(event) => patch("team", event.target.value)} /></label>
            <label className="wide"><span>{t.ownerEscalationReason}</span><textarea value={form.ownerEscalationReason} onChange={(event) => patch("ownerEscalationReason", event.target.value)} /></label>
          </div>
          <div className="taxi027aFix1ButtonRow">{actionButton("assignOperator", t.assignOperator, routes.assign, "POST")}{actionButton("ownerEscalation", t.escalateOwner, routes.owner, "POST")}</div>
        </section>

        <aside className="taxi027aFix1Result" data-function="complaint-server-response-only">
          <h2>{t.result}</h2>
          <strong>{result?.action || t.noAction}</strong>
          <span>{result ? `${result.status} · ${result.message}` : t.backendOnly}</span>
          <code>{result?.route || routes.open}</code>
          <small>{result?.at || t.noFake}</small>
        </aside>
      </main>
    </section>
  );
}
