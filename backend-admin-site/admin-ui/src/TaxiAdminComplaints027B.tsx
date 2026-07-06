import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-complaints027b.css";

export const TAXI_ADMIN_COMPLAINTS_027B_MARKER = "TAXI-ADMIN-UI-027B-COMPLAINTS-APPEALS-PROCESSING-CENTER";

type Props027B = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

type HistoryRow027B = {
  at: string;
  action: string;
  route: string;
  status: number | string;
  ok: boolean;
  message: string;
};

type QueueRow027B = {
  id: string;
  orderId?: string;
  tripId?: string;
  rider?: string;
  driver?: string;
  status?: string;
  priority?: string;
  slaMinutes?: string | number;
};

type ComplaintForm027B = {
  queueSearch: string;
  queueStatus: string;
  queueCountry: string;
  queueCity: string;
  queueOperator: string;
  queueDeadline: string;
  complaintId: string;
  orderId: string;
  tripId: string;
  riderName: string;
  riderId: string;
  riderPhone: string;
  driverName: string;
  driverId: string;
  driverPhone: string;
  tariff: string;
  country: string;
  city: string;
  tripAmount: string;
  currencyCode: string;
  currencyName: string;
  complaintReason: string;
  risk: string;
  riderContactResult: string;
  driverContactResult: string;
  followUpAt: string;
  riderReply: string;
  driverReply: string;
  replyTemplate: string;
  evidenceRequest: string;
  evidenceNote: string;
  routeCheckNote: string;
  cancelCheckNote: string;
  paymentCheckNote: string;
  waitingCheckNote: string;
  decision: string;
  publicDecision: string;
  internalDecision: string;
  appealReason: string;
  appealDeadline: string;
  appealOwner: string;
  appealDecision: string;
  assignedOperator: string;
  transferReason: string;
  ownerReason: string;
};

type CurrencyOption027B = { id: string; code: string; name: string; source: string };

type Copy027B = {
  title: string;
  subtitle: string;
  rule: string;
  queue: string;
  queueText: string;
  search: string;
  status: string;
  country: string;
  city: string;
  operator: string;
  deadline: string;
  loadQueue: string;
  openCase: string;
  queueList: string;
  emptyQueue: string;
  passport: string;
  complaintId: string;
  orderId: string;
  tripId: string;
  rider: string;
  riderId: string;
  riderPhone: string;
  driver: string;
  driverId: string;
  driverPhone: string;
  tariff: string;
  amount: string;
  currencyList: string;
  currencyCode: string;
  currencyName: string;
  addCurrency: string;
  chooseCurrency: string;
  reason: string;
  risk: string;
  contact: string;
  callRider: string;
  callDriver: string;
  chatRider: string;
  chatDriver: string;
  riderCallResult: string;
  driverCallResult: string;
  logRiderContact: string;
  logDriverContact: string;
  followUp: string;
  scheduleFollowUp: string;
  replies: string;
  replyTemplate: string;
  riderReply: string;
  driverReply: string;
  preview: string;
  sendRiderReply: string;
  sendDriverReply: string;
  deliveryStatus: string;
  evidence: string;
  evidenceRequest: string;
  requestPhoto: string;
  requestAudioChat: string;
  routeCheck: string;
  cancelCheck: string;
  paymentCheck: string;
  waitingCheck: string;
  evidenceNote: string;
  addEvidenceNote: string;
  buildPack: string;
  missing: string;
  received: string;
  decision: string;
  decisionValue: string;
  publicDecision: string;
  internalDecision: string;
  saveDecision: string;
  appeal: string;
  appealReason: string;
  appealDeadline: string;
  appealOwner: string;
  appealDecision: string;
  openAppeal: string;
  saveAppealDecision: string;
  assignment: string;
  assignOperator: string;
  transferSenior: string;
  transferOwner: string;
  transferReason: string;
  ownerReason: string;
  setDeadline: string;
  history: string;
  historyEmpty: string;
  route: string;
  response: string;
  noFake: string;
  readyScreensProtected: string;
  requestSent: string;
  requestFailed: string;
};

const COPY027B: Record<AdminLanguage, Copy027B> = {
  ru: {
    title: "Жалобы / обращения — центр обработки",
    subtitle: "Один экран для полного разбора жалобы: очередь, паспорт дела, связь, ответы, доказательства, решение, апелляция, назначение и история действий.",
    rule: "Успех засчитывается только после ответа сервера. Локальный фейк запрещён.",
    queue: "01 · Очередь жалоб",
    queueText: "Список, поиск, фильтры, срок выполнения и открытие дела.",
    search: "Поиск по номеру жалобы, заказа, поездки, клиенту или водителю",
    status: "Статус",
    country: "Страна",
    city: "Город",
    operator: "Оператор",
    deadline: "Срок / дедлайн",
    loadQueue: "Загрузить очередь",
    openCase: "Открыть дело",
    queueList: "Список жалоб от сервера",
    emptyQueue: "Очередь появится после ответа сервера. Локальные демо-строки не используются.",
    passport: "02 · Паспорт жалобы",
    complaintId: "Complaint number",
    orderId: "Order number",
    tripId: "Trip number",
    rider: "Клиент",
    riderId: "Номер клиента",
    riderPhone: "Телефон клиента",
    driver: "Водитель",
    driverId: "Номер водителя",
    driverPhone: "Телефон водителя",
    tariff: "Тариф",
    amount: "Сумма поездки",
    currencyList: "Мультивалютный список",
    currencyCode: "Код валюты",
    currencyName: "Название валюты",
    addCurrency: "Добавить валюту в список",
    chooseCurrency: "Выбрать валюту",
    reason: "Причина обращения",
    risk: "Риск",
    contact: "03 · Связь с клиентом и водителем",
    callRider: "Позвонить клиенту",
    callDriver: "Позвонить водителю",
    chatRider: "Открыть чат с клиентом",
    chatDriver: "Открыть чат с водителем",
    riderCallResult: "Результат связи с клиентом",
    driverCallResult: "Результат связи с водителем",
    logRiderContact: "Зафиксировать результат связи с клиентом",
    logDriverContact: "Зафиксировать результат связи с водителем",
    followUp: "Повторный контакт",
    scheduleFollowUp: "Назначить повторный контакт",
    replies: "04 · Официальные ответы",
    replyTemplate: "Шаблон ответа",
    riderReply: "Официальный ответ клиенту",
    driverReply: "Официальный ответ водителю",
    preview: "Предпросмотр",
    sendRiderReply: "Отправить ответ клиенту",
    sendDriverReply: "Отправить ответ водителю",
    deliveryStatus: "Статус доставки ответа показывается после ответа сервера",
    evidence: "05 · Доказательства и проверка",
    evidenceRequest: "Что запросить у сторон",
    requestPhoto: "Запросить фото",
    requestAudioChat: "Запросить аудио / чат",
    routeCheck: "Проверить маршрут",
    cancelCheck: "Проверить отмену",
    paymentCheck: "Проверить оплату",
    waitingCheck: "Проверить время ожидания",
    evidenceNote: "Заметка к доказательствам",
    addEvidenceNote: "Добавить заметку",
    buildPack: "Собрать пакет доказательств",
    missing: "Не хватает",
    received: "Получено",
    decision: "06 · Решение после проверки",
    decisionValue: "Решение",
    publicDecision: "Публичное объяснение",
    internalDecision: "Внутреннее обоснование",
    saveDecision: "Сохранить решение",
    appeal: "07 · Апелляция",
    appealReason: "Причина апелляции",
    appealDeadline: "Срок ответа",
    appealOwner: "Кто рассматривает",
    appealDecision: "Решение по апелляции",
    openAppeal: "Открыть апелляцию",
    saveAppealDecision: "Сохранить решение по апелляции",
    assignment: "08 · Назначение и передача",
    assignOperator: "Назначить оператора",
    transferSenior: "Передать старшему",
    transferOwner: "Передать владельцу",
    transferReason: "Причина передачи",
    ownerReason: "Причина передачи владельцу",
    setDeadline: "Поставить дедлайн",
    history: "09 · История действий и ответы сервера",
    historyEmpty: "История появится после серверного ответа. Клиентский успех не записывается.",
    route: "Маршрут",
    response: "Ответ",
    noFake: "Без фейка: кнопка не закрывает жалобу и не меняет статус без сервера.",
    readyScreensProtected: "Заявки / Заказы / Тарифы не трогаются.",
    requestSent: "Запрос отправлен. Ждём ответ сервера.",
    requestFailed: "Сервер не подтвердил действие. Успех не записан."
  },
  en: {
    title: "Complaints / requests — processing center",
    subtitle: "One screen for complete complaint handling: queue, case passport, contact, replies, evidence, decision, appeal, assignment and action history.",
    rule: "Success is counted only after the official response. Local false success is forbidden.",
    queue: "01 · Complaint queue", queueText: "List, search, filters, SLA timer and case opening.", search: "Search by complaint / order / trip / rider / driver", status: "Status", country: "Country", city: "City", operator: "Operator", deadline: "Deadline", loadQueue: "Load queue", openCase: "Open case", queueList: "Server complaint list", emptyQueue: "The queue appears after the official response. No local demo rows are used.",
    passport: "02 · Complaint passport", complaintId: "Номер жалобы", orderId: "Номер заказа", tripId: "Номер поездки", rider: "Rider", riderId: "Rider number", riderPhone: "Rider phone", driver: "Driver", driverId: "Driver number", driverPhone: "Driver phone", tariff: "Tariff", amount: "Trip amount", currencyList: "Multi-currency list", currencyCode: "Currency code", currencyName: "Currency name", addCurrency: "Add currency", chooseCurrency: "Choose currency", reason: "Request reason", risk: "Risk",
    contact: "03 · Contact rider and driver", callRider: "Call rider", callDriver: "Call driver", chatRider: "Open rider chat", chatDriver: "Open driver chat", riderCallResult: "Rider contact result", driverCallResult: "Driver contact result", logRiderContact: "Log rider contact result", logDriverContact: "Log driver contact result", followUp: "Follow-up contact", scheduleFollowUp: "Schedule follow-up",
    replies: "04 · Official replies", replyTemplate: "Reply template", riderReply: "Official rider reply", driverReply: "Official driver reply", preview: "Preview", sendRiderReply: "Send rider reply", sendDriverReply: "Send driver reply", deliveryStatus: "Delivery state appears after the official response",
    evidence: "05 · Evidence and review", evidenceRequest: "Evidence to request", requestPhoto: "Request photos", requestAudioChat: "Request audio / chat", routeCheck: "Check route", cancelCheck: "Check cancellation", paymentCheck: "Check payment", waitingCheck: "Check waiting time", evidenceNote: "Evidence note", addEvidenceNote: "Add note", buildPack: "Build evidence pack", missing: "Missing", received: "Received",
    decision: "06 · Reviewed decision", decisionValue: "Decision", publicDecision: "Public explanation", internalDecision: "Internal reasoning", saveDecision: "Save decision",
    appeal: "07 · Appeal", appealReason: "Appeal reason", appealDeadline: "Response deadline", appealOwner: "Reviewer", appealDecision: "Appeal decision", openAppeal: "Open appeal", saveAppealDecision: "Save appeal decision",
    assignment: "08 · Assignment and handoff", assignOperator: "Assign operator", transferSenior: "Transfer to senior", transferOwner: "Transfer to principal", transferReason: "Transfer reason", ownerReason: "principal transfer reason", setDeadline: "Set deadline",
    history: "09 · Action history and official responses", historyEmpty: "History appears after official response. Client-side success is not written.", route: "Route", response: "Response", noFake: "No fake: button does not close complaint or change status without server.", readyScreensProtected: "Applications / Orders / Tariffs are untouched.", requestSent: "Request sent. Waiting for official response.", requestFailed: "Server did not confirm the action. Success was not written."
  },
  uz: {
    title: "Shikoyatlar / murojaatlar — ishlov markazi",
    subtitle: "Shikoyatni to ‘liq ko ‘rib chiqish uchun bitta ekran: navbat, ish pasporti, aloqa, javoblar, dalillar, qaror, apellyatsiya, tayinlash va tarix.",
    rule: "Muvaffaqiyat faqat server javobidan keyin hisoblanadi. Lokal soxta muvaffaqiyat taqiqlangan.",
    queue: "01 · Shikoyatlar navbati", queueText: "Ro ‘yxat, qidiruv, filtrlar, SLA va ishni ochish.", search: "Shikoyat / buyurtma / safar / mijoz / haydovchi bo ‘yicha qidirish", status: "Status", country: "Mamlakat", city: "Shahar", operator: "Operator", deadline: "Muddat", loadQueue: "Navbatni yuklash", openCase: "Ishni ochish", queueList: "Serverdan kelgan shikoyatlar", emptyQueue: "Navbat server javobidan keyin ko ‘rinadi. Lokal demo qatorlar ishlatilmaydi.",
    passport: "02 · Shikoyat pasporti", complaintId: "Номер жалобы", orderId: "Номер заказа", tripId: "Номер поездки", rider: "Mijoz", riderId: "Mijoz number", riderPhone: "Mijoz telefoni", driver: "Haydovchi", driverId: "Haydovchi raqam", driverPhone: "Haydovchi telefoni", tariff: "Tarif", amount: "Safar summasi", currencyList: "Ko ‘p valyuta ro ‘yxati", currencyCode: "Valyuta kodi", currencyName: "Valyuta nomi", addCurrency: "Valyuta qo ‘shish", chooseCurrency: "Valyutani tanlash", reason: "Murojaat sababi", risk: "Xavf",
    contact: "03 · Mijoz va haydovchi bilan aloqa", callRider: "Mijozga qo ‘ng ‘iroq", callDriver: "Haydovchiga qo ‘ng ‘iroq", chatRider: "Mijoz chatini ochish", chatDriver: "Haydovchi chatini ochish", riderCallResult: "Mijoz bilan aloqa natijasi", driverCallResult: "Haydovchi bilan aloqa natijasi", logRiderContact: "Mijoz aloqa natijasini saqlash", logDriverContact: "Haydovchi aloqa natijasini saqlash", followUp: "Qayta aloqa", scheduleFollowUp: "Qayta aloqani belgilash",
    replies: "04 · Rasmiy javoblar", replyTemplate: "Javob shabloni", riderReply: "Mijozga rasmiy javob", driverReply: "Haydovchiga rasmiy javob", preview: "Ko ‘rib chiqish", sendRiderReply: "Mijozga javob yuborish", sendDriverReply: "Haydovchiga javob yuborish", deliveryStatus: "Yetkazish statei server javobidan keyin chiqadi",
    evidence: "05 · Dalillar va tekshiruv", evidenceRequest: "So ‘raladigan dalillar", requestPhoto: "Foto so ‘rash", requestAudioChat: "Audio / chat so ‘rash", routeCheck: "Marshrutni tekshirish", cancelCheck: "Bekor qilishni tekshirish", paymentCheck: "To ‘lovni tekshirish", waitingCheck: "Kutish vaqtini tekshirish", evidenceNote: "Dalil izohi", addEvidenceNote: "Izoh qo ‘shish", buildPack: "Dalillar paketini yig ‘ish", missing: "Yetishmaydi", received: "Olingan",
    decision: "06 · Tekshiruvdan keyingi qaror", decisionValue: "Qaror", publicDecision: "Ochiq izoh", internalDecision: "Ichki asos", saveDecision: "Qarorni saqlash",
    appeal: "07 · Apellyatsiya", appealReason: "Apellyatsiya sababi", appealDeadline: "Javob muddati", appealOwner: "Ko ‘rib chiquvchi", appealDecision: "Apellyatsiya qarori", openAppeal: "Apellyatsiyani ochish", saveAppealDecision: "Apellyatsiya qarorini saqlash",
    assignment: "08 · Tayinlash va topshirish", assignOperator: "Operator tayinlash", transferSenior: "Katta xodimga berish", transferOwner: "egasiga berish", transferReason: "Topshirish sababi", ownerReason: "egasiga berish sababi", setDeadline: "Muddat qo ‘yish",
    history: "09 · Harakatlar tarixi va server javoblari", historyEmpty: "Tarix server javobidan keyin chiqadi. Lokal muvaffaqiyat yozilmaydi.", route: "Yo‘l", response: "Javob", noFake: "Fake yo‘q: tugma serversiz shikoyatni yopmaydi va statusni o‘zgartirmaydi.", readyScreensProtected: "Arizalar / Buyurtmalar / Tariflar tegilmaydi.", requestSent: "So‘rov yuborildi. Server javobi kutilmoqda.", requestFailed: "Server harakatni tasdiqlamadi. Muvaffaqiyat yozilmadi."
  },
  zh: {
    title: "投诉 / 申诉处理中心",
    subtitle: "一个屏幕完成投诉处理：队列、案件信息、联系、回复、证据、决定、申诉、分配和历史。",
    rule: "只有服务器返回成功后才算成功。本地假成功禁止。",
    queue: "01 · 投诉队列", queueText: "列表、搜索、筛选、处理时限和打开案件。", search: "按投诉 / 订单 / 行程 / 客户 / 司机搜索", status: "状态", country: "国家", city: "城市", operator: "操作员", deadline: "截止时间", loadQueue: "加载队列", openCase: "打开案件", queueList: "服务器投诉列表", emptyQueue: "队列在服务器响应后显示。不使用本地演示数据。",
    passport: "02 · 投诉案件信息", complaintId: "Номер жалобы", orderId: "Номер заказа", tripId: "Номер поездки", rider: "客户", riderId: "客户编号", riderPhone: "客户电话", driver: "司机", driverId: "司机 编号", driverPhone: "司机电话", tariff: "费率", amount: "行程金额", currencyList: "多币种列表", currencyCode: "币种代码", currencyName: "币种名称", addCurrency: "添加币种", chooseCurrency: "选择币种", reason: "申诉原因", risk: "风险",
    contact: "03 · 联系客户和司机", callRider: "联系客户", callDriver: "联系司机", chatRider: "打开客户聊天", chatDriver: "打开司机聊天", riderCallResult: "客户联系结果", driverCallResult: "司机联系结果", logRiderContact: "保存客户联系结果", logDriverContact: "保存司机联系结果", followUp: "再次联系", scheduleFollowUp: "安排再次联系",
    replies: "04 · 正式回复", replyTemplate: "回复模板", riderReply: "给客户的正式回复", driverReply: "给司机的正式回复", preview: "预览", sendRiderReply: "发送给客户", sendDriverReply: "发送给司机", deliveryStatus: "发送状态在服务器响应后显示",
    evidence: "05 · 证据和审核", evidenceRequest: "需要请求的证据", requestPhoto: "请求照片", requestAudioChat: "请求音频 / 聊天", routeCheck: "检查路线", cancelCheck: "检查取消", paymentCheck: "检查支付", waitingCheck: "检查等待时间", evidenceNote: "证据备注", addEvidenceNote: "添加备注", buildPack: "生成证据包", missing: "缺少", received: "已收到",
    decision: "06 · 审核后的决定", decisionValue: "决定", publicDecision: "公开说明", internalDecision: "内部依据", saveDecision: "保存决定",
    appeal: "07 · 申诉", appealReason: "申诉原因", appealDeadline: "回复期限", appealOwner: "审核人", appealDecision: "申诉决定", openAppeal: "打开申诉", saveAppealDecision: "保存申诉决定",
    assignment: "08 · 分配和转交", assignOperator: "分配操作员", transferSenior: "转交主管", transferOwner: "转交 所有者", transferReason: "转交原因", ownerReason: "转交所有者原因", setDeadline: "设置截止时间",
    history: "09 · 操作历史和服务器响应", historyEmpty: "历史在服务器响应后显示。不写入本地成功。", route: "路由", response: "响应", noFake: "无假成功：没有服务器确认，按钮不会关闭投诉或更改状态。", readyScreensProtected: "申请 / 订单 / 费率不改动。", requestSent: "请求已发送，等待服务器响应。", requestFailed: "服务器未确认操作。未写入成功。"
  },
};

const initialForm027B: ComplaintForm027B = {
  queueSearch: "", queueStatus: "new", queueCountry: "", queueCity: "", queueOperator: "", queueDeadline: "",
  complaintId: "", orderId: "", tripId: "", riderName: "", riderId: "", riderPhone: "", driverName: "", driverId: "", driverPhone: "", tariff: "", country: "", city: "", tripAmount: "", currencyCode: "", currencyName: "", complaintReason: "", risk: "medium",
  riderContactResult: "", driverContactResult: "", followUpAt: "", riderReply: "", driverReply: "", replyTemplate: "", evidenceRequest: "", evidenceNote: "", routeCheckNote: "", cancelCheckNote: "", paymentCheckNote: "", waitingCheckNote: "", decision: "needs_review", publicDecision: "", internalDecision: "", appealReason: "", appealDeadline: "", appealOwner: "", appealDecision: "", assignedOperator: "", transferReason: "", ownerReason: "",
};

function base027B(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/+$/, "");
}

function safeId027B(value: string): string {
  return String(value || "manual").trim().replace(/[^a-zA-Z0-9_-]/g, "") || "manual";
}

function headers027B(config: AdminApiConfig): Record<string, string> {
  return { "Content-Type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" };
}

function normalizeQueue027B(value: unknown): QueueRow027B[] {
  if (!value || typeof value !== "object") return [];
  const anyValue = value as { items?: unknown; complaints?: unknown; data?: unknown };
  const rows = Array.isArray(anyValue.items) ? anyValue.items : Array.isArray(anyValue.complaints) ? anyValue.complaints : Array.isArray(anyValue.data) ? anyValue.data : [];
  return rows.filter((row): row is Record<string, unknown> => !!row && typeof row === "object").map((row) => ({
    id: String(row.id || row.complaintId || row.complaint_id || ""),
    orderId: String(row.orderId || row.order_id || ""),
    tripId: String(row.tripId || row.trip_id || ""),
    rider: String(row.riderName || row.rider || row.client || ""),
    driver: String(row.driverName || row.driver || ""),
    status: String(row.status || row.queueStatus || ""),
    priority: String(row.priority || row.risk || ""),
    slaMinutes: String(row.slaMinutes || row.sla || row.deadlineMinutes || ""),
  })).filter((row) => row.id);
}

export function TaxiAdminComplaints027B({ language, config, setNotice }: Props027B) {
  const t = COPY027B[language] || COPY027B.ru;
  const [form, setForm] = useState<ComplaintForm027B>(initialForm027B);
  const [history, setHistory] = useState<HistoryRow027B[]>([]);
  const [queueRows, setQueueRows] = useState<QueueRow027B[]>([]);
  const [currencyRows, setCurrencyRows] = useState<CurrencyOption027B[]>([]);
  const [busy, setBusy] = useState("");
  const caseId = safeId027B(form.complaintId);

  const routes = useMemo(() => ({
    queue: `/api/admin/taxi/complaints/027b/queue`,
    openCase: `/api/admin/taxi/complaints/027b/${caseId}/open`,
    callRider: `/api/admin/taxi/complaints/027b/${caseId}/contact/rider/call`,
    callDriver: `/api/admin/taxi/complaints/027b/${caseId}/contact/driver/call`,
    chatRider: `/api/admin/taxi/complaints/027b/${caseId}/contact/rider/chat`,
    chatDriver: `/api/admin/taxi/complaints/027b/${caseId}/contact/driver/chat`,
    logRiderContact: `/api/admin/taxi/complaints/027b/${caseId}/contact/rider/result`,
    logDriverContact: `/api/admin/taxi/complaints/027b/${caseId}/contact/driver/result`,
    followUp: `/api/admin/taxi/complaints/027b/${caseId}/contact/follow-up`,
    riderReply: `/api/admin/taxi/complaints/027b/${caseId}/reply/rider`,
    driverReply: `/api/admin/taxi/complaints/027b/${caseId}/reply/driver`,
    requestPhoto: `/api/admin/taxi/complaints/027b/${caseId}/evidence/photo-request`,
    requestAudioChat: `/api/admin/taxi/complaints/027b/${caseId}/evidence/audio-chat-request`,
    routeCheck: `/api/admin/taxi/complaints/027b/${caseId}/evidence/route-check`,
    cancelCheck: `/api/admin/taxi/complaints/027b/${caseId}/evidence/cancel-check`,
    paymentCheck: `/api/admin/taxi/complaints/027b/${caseId}/evidence/payment-check`,
    waitingCheck: `/api/admin/taxi/complaints/027b/${caseId}/evidence/waiting-time-check`,
    evidenceNote: `/api/admin/taxi/complaints/027b/${caseId}/evidence/note`,
    evidencePack: `/api/admin/taxi/complaints/027b/${caseId}/evidence/pack`,
    decision: `/api/admin/taxi/complaints/027b/${caseId}/decision`,
    openAppeal: `/api/admin/taxi/complaints/027b/${caseId}/appeal/open`,
    appealDecision: `/api/admin/taxi/complaints/027b/${caseId}/appeal/decision`,
    assignOperator: `/api/admin/taxi/complaints/027b/${caseId}/assignment/operator`,
    transferSenior: `/api/admin/taxi/complaints/027b/${caseId}/assignment/senior`,
    transferOwner: `/api/admin/taxi/complaints/027b/${caseId}/assignment/owner`,
    deadline: `/api/admin/taxi/complaints/027b/${caseId}/assignment/deadline`,
  }), [caseId]);

  const patch = (key: keyof ComplaintForm027B, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const run = async (key: string, action: string, route: string, method: "GET" | "POST") => {
    setBusy(key);
    setNotice(t.requestSent);
    try {
      const query = method === "GET" ? `?search=${encodeURIComponent(form.queueSearch)}&status=${encodeURIComponent(form.queueStatus)}&country=${encodeURIComponent(form.queueCountry)}&city=${encodeURIComponent(form.queueCity)}&operator=${encodeURIComponent(form.queueOperator)}&deadline=${encodeURIComponent(form.queueDeadline)}` : "";
      const response = await fetch(`${base027B(config)}${route}${query}`, {
        method,
        headers: headers027B(config),
        body: method === "POST" ? JSON.stringify({ ...form, currencyRows, marker: TAXI_ADMIN_COMPLAINTS_027B_MARKER, noLocalFakeSuccess: true }) : undefined,
      });
      let message = response.statusText || t.response;
      let data: unknown = null;
      try { data = await response.json(); } catch {}
      if (data && typeof data === "object" && typeof (data as { message?: unknown }).message === "string") message = String((data as { message: string }).message);
      if (key === "queue") setQueueRows(normalizeQueue027B(data));
      const row = { at: new Date().toISOString(), action, route, status: response.status, ok: response.ok, message };
      setHistory((prev) => [row, ...prev].slice(0, 30));
      setNotice(response.ok ? `${action}: ${message}` : `${action}: ${t.requestFailed}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : t.requestFailed;
      setHistory((prev) => [{ at: new Date().toISOString(), action, route, status: "network_error", ok: false, message }, ...prev].slice(0, 30));
      setNotice(`${action}: ${message}`);
    } finally {
      setBusy("");
    }
  };

  const addCurrency = () => {
    const code = form.currencyCode.trim().toUpperCase();
    const name = form.currencyName.trim();
    if (!code) return;
    setCurrencyRows((prev) => prev.some((row) => row.code === code) ? prev : [...prev, { id: `${code}-${Date.now()}`, code, name, source: "server_or_operator_config" }]);
  };

  const chooseCurrency = (code: string) => patch("currencyCode", code);
  const selectedCurrency = currencyRows.find((row) => row.code === form.currencyCode);

  const button = (key: string, label: string, route: string, method: "GET" | "POST" = "POST") => (
    <button type="button" disabled={busy === key} onClick={() => void run(key, label, route, method)}>{busy === key ? "…" : label}</button>
  );

  return (
    <section className="taxi027b" data-taxi-admin-ui-027b="complaints-processing-center" data-no-local-fake-success="true" data-dynamic-multicurrency="true">
      <header className="taxi027bHero">
        <div>
          <p>{t.readyScreensProtected}</p>
          <h1>{t.title}</h1>
          <span>{t.subtitle}</span>
        </div>
        <aside><strong>{t.noFake}</strong><em>{t.rule}</em></aside>
      </header>

      <div className="taxi027bGrid">
        <section className="taxi027bPanel taxi027bQueue" data-function="complaint_queue_visible">
          <div className="taxi027bPanelTitle"><h2>{t.queue}</h2><p>{t.queueText}</p></div>
          <label><span>{t.search}</span><input value={form.queueSearch} onChange={(event) => patch("queueSearch", event.target.value)} /></label>
          <div className="taxi027bMiniGrid">
            <label><span>{t.status}</span><select value={form.queueStatus} onChange={(event) => patch("queueStatus", event.target.value)}><option value="new">Новая</option><option value="urgent">Срочная</option><option value="waiting_reply">Ждёт ответа</option><option value="waiting_evidence">Ждёт доказательств</option><option value="appeal">Апелляция</option><option value="closed">Закрыта</option></select></label>
            <label><span>{t.country}</span><input value={form.queueCountry} onChange={(event) => patch("queueCountry", event.target.value)} /></label>
            <label><span>{t.city}</span><input value={form.queueCity} onChange={(event) => patch("queueCity", event.target.value)} /></label>
            <label><span>{t.operator}</span><input value={form.queueOperator} onChange={(event) => patch("queueOperator", event.target.value)} /></label>
            <label><span>{t.deadline}</span><input value={form.queueDeadline} onChange={(event) => patch("queueDeadline", event.target.value)} /></label>
          </div>
          <div className="taxi027bActions">{button("queue", t.loadQueue, routes.queue, "GET")}{button("open", t.openCase, routes.openCase, "GET")}</div>
          <div className="taxi027bList" data-function="complaint_queue_list_from_backend">
            <strong>{t.queueList}</strong>
            {queueRows.length ? queueRows.map((row) => (
              <button key={row.id} type="button" className="taxi027bQueueCard" onClick={() => { patch("complaintId", row.id); patch("orderId", row.orderId || form.orderId); patch("tripId", row.tripId || form.tripId); }}>
                <b>{row.id}</b><span>{row.status || "—"} · {row.priority || "—"}</span><small>{row.orderId || "—"} / {row.tripId || "—"} · SLA {row.slaMinutes || "—"}</small>
              </button>
            )) : <p>{t.emptyQueue}</p>}
          </div>
        </section>

        <section className="taxi027bPanel taxi027bPassport" data-function="complaint_case_passport_visible">
          <div className="taxi027bPanelTitle"><h2>{t.passport}</h2></div>
          <div className="taxi027bFieldGrid">
            <label><span>{t.complaintId}</span><input value={form.complaintId} onChange={(event) => patch("complaintId", event.target.value)} /></label>
            <label><span>{t.orderId}</span><input value={form.orderId} onChange={(event) => patch("orderId", event.target.value)} /></label>
            <label><span>{t.tripId}</span><input value={form.tripId} onChange={(event) => patch("tripId", event.target.value)} /></label>
            <label><span>{t.rider}</span><input value={form.riderName} onChange={(event) => patch("riderName", event.target.value)} /></label>
            <label><span>{t.riderId}</span><input value={form.riderId} onChange={(event) => patch("riderId", event.target.value)} /></label>
            <label><span>{t.driver}</span><input value={form.driverName} onChange={(event) => patch("driverName", event.target.value)} /></label>
            <label><span>{t.driverId}</span><input value={form.driverId} onChange={(event) => patch("driverId", event.target.value)} /></label>
            <label><span>{t.tariff}</span><input value={form.tariff} onChange={(event) => patch("tariff", event.target.value)} /></label>
            <label><span>{t.country}</span><input value={form.country} onChange={(event) => patch("country", event.target.value)} /></label>
            <label><span>{t.city}</span><input value={form.city} onChange={(event) => patch("city", event.target.value)} /></label>
            <label><span>{t.amount}</span><input value={form.tripAmount} onChange={(event) => patch("tripAmount", event.target.value)} /></label>
            <label><span>{t.risk}</span><select value={form.risk} onChange={(event) => patch("risk", event.target.value)}><option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option></select></label>
          </div>
          <label><span>{t.reason}</span><textarea value={form.complaintReason} onChange={(event) => patch("complaintReason", event.target.value)} /></label>
          <div className="taxi027bCurrency" data-function="complaint_multicurrency_list_and_selection_visible">
            <strong>{t.currencyList}</strong>
            <div className="taxi027bCurrencyInputs">
              <input placeholder={t.currencyCode} value={form.currencyCode} onChange={(event) => patch("currencyCode", event.target.value)} />
              <input placeholder={t.currencyName} value={form.currencyName} onChange={(event) => patch("currencyName", event.target.value)} />
              <button type="button" onClick={addCurrency}>{t.addCurrency}</button>
            </div>
            <div className="taxi027bCurrencyList">
              {currencyRows.map((row) => <button key={row.id} type="button" className={row.code === form.currencyCode ? "active" : ""} onClick={() => chooseCurrency(row.code)}>{row.code}<small>{row.name || row.source}</small></button>)}
              {!currencyRows.length && <span>{t.chooseCurrency}</span>}
            </div>
            <em>{selectedCurrency ? `${selectedCurrency.code} · ${selectedCurrency.name || selectedCurrency.source}` : t.chooseCurrency}</em>
          </div>
        </section>

        <section className="taxi027bPanel taxi027bContact" data-function="client_driver_contact_controls_visible">
          <div className="taxi027bPanelTitle"><h2>{t.contact}</h2></div>
          <div className="taxi027bTwoCards">
            <article><h3>{t.rider}</h3><label><span>{t.riderPhone}</span><input value={form.riderPhone} onChange={(event) => patch("riderPhone", event.target.value)} /></label><label><span>{t.riderCallResult}</span><textarea value={form.riderContactResult} onChange={(event) => patch("riderContactResult", event.target.value)} /></label><div className="taxi027bActions">{button("callRider", t.callRider, routes.callRider)}{button("chatRider", t.chatRider, routes.chatRider)}{button("logRider", t.logRiderContact, routes.logRiderContact)}</div></article>
            <article><h3>{t.driver}</h3><label><span>{t.driverPhone}</span><input value={form.driverPhone} onChange={(event) => patch("driverPhone", event.target.value)} /></label><label><span>{t.driverCallResult}</span><textarea value={form.driverContactResult} onChange={(event) => patch("driverContactResult", event.target.value)} /></label><div className="taxi027bActions">{button("callDriver", t.callDriver, routes.callDriver)}{button("chatDriver", t.chatDriver, routes.chatDriver)}{button("logDriver", t.logDriverContact, routes.logDriverContact)}</div></article>
          </div>
          <label><span>{t.followUp}</span><input value={form.followUpAt} onChange={(event) => patch("followUpAt", event.target.value)} /></label>
          <div className="taxi027bActions">{button("followUp", t.scheduleFollowUp, routes.followUp)}</div>
        </section>

        <section className="taxi027bPanel taxi027bReplies" data-function="client_driver_official_reply_visible">
          <div className="taxi027bPanelTitle"><h2>{t.replies}</h2><p>{t.deliveryStatus}</p></div>
          <label><span>{t.replyTemplate}</span><textarea value={form.replyTemplate} onChange={(event) => patch("replyTemplate", event.target.value)} /></label>
          <div className="taxi027bTwoCards">
            <article><h3>{t.riderReply}</h3><textarea value={form.riderReply} onChange={(event) => patch("riderReply", event.target.value)} /><div className="taxi027bPreview"><b>{t.preview}</b><p>{form.riderReply || form.replyTemplate}</p></div>{button("riderReply", t.sendRiderReply, routes.riderReply)}</article>
            <article><h3>{t.driverReply}</h3><textarea value={form.driverReply} onChange={(event) => patch("driverReply", event.target.value)} /><div className="taxi027bPreview"><b>{t.preview}</b><p>{form.driverReply || form.replyTemplate}</p></div>{button("driverReply", t.sendDriverReply, routes.driverReply)}</article>
          </div>
        </section>

        <section className="taxi027bPanel taxi027bEvidence" data-function="evidence_review_center_visible">
          <div className="taxi027bPanelTitle"><h2>{t.evidence}</h2></div>
          <label><span>{t.evidenceRequest}</span><textarea value={form.evidenceRequest} onChange={(event) => patch("evidenceRequest", event.target.value)} /></label>
          <div className="taxi027bEvidenceGrid">
            {button("requestPhoto", t.requestPhoto, routes.requestPhoto)}
            {button("requestAudioChat", t.requestAudioChat, routes.requestAudioChat)}
            {button("routeCheck", t.routeCheck, routes.routeCheck)}
            {button("cancelCheck", t.cancelCheck, routes.cancelCheck)}
            {button("paymentCheck", t.paymentCheck, routes.paymentCheck)}
            {button("waitingCheck", t.waitingCheck, routes.waitingCheck)}
          </div>
          <div className="taxi027bMiniGrid"><label><span>{t.routeCheck}</span><input value={form.routeCheckNote} onChange={(event) => patch("routeCheckNote", event.target.value)} /></label><label><span>{t.cancelCheck}</span><input value={form.cancelCheckNote} onChange={(event) => patch("cancelCheckNote", event.target.value)} /></label><label><span>{t.paymentCheck}</span><input value={form.paymentCheckNote} onChange={(event) => patch("paymentCheckNote", event.target.value)} /></label><label><span>{t.waitingCheck}</span><input value={form.waitingCheckNote} onChange={(event) => patch("waitingCheckNote", event.target.value)} /></label></div>
          <label><span>{t.evidenceNote}</span><textarea value={form.evidenceNote} onChange={(event) => patch("evidenceNote", event.target.value)} /></label>
          <div className="taxi027bActions">{button("evidenceNote", t.addEvidenceNote, routes.evidenceNote)}{button("evidencePack", t.buildPack, routes.evidencePack)}</div>
          <div className="taxi027bChecklist"><span>{t.received}: фото / чат / маршрут / оплата</span><span>{t.missing}: если сервер вернул missing items</span></div>
        </section>

        <section className="taxi027bPanel taxi027bDecision" data-function="decision_panel_visible">
          <div className="taxi027bPanelTitle"><h2>{t.decision}</h2></div>
          <label><span>{t.decisionValue}</span><select value={form.decision} onChange={(event) => patch("decision", event.target.value)}><option value="no_violation">Нет нарушения</option><option value="driver_fault">Виноват водитель</option><option value="rider_fault">Виноват клиент</option><option value="disputed">Спорно</option><option value="senior_review_required">Нужна проверка старшего</option><option value="owner_review_required">Нужна проверка владельца</option></select></label>
          <label><span>{t.publicDecision}</span><textarea value={form.publicDecision} onChange={(event) => patch("publicDecision", event.target.value)} /></label>
          <label><span>{t.internalDecision}</span><textarea value={form.internalDecision} onChange={(event) => patch("internalDecision", event.target.value)} /></label>
          <div className="taxi027bGuard"><b>Компенсация запрещена без одобрения.</b><b>Блокировка запрещена без проверки и одобрения.</b></div>
          <div className="taxi027bActions">{button("decision", t.saveDecision, routes.decision)}</div>
        </section>

        <section className="taxi027bPanel taxi027bAppeal" data-function="appeal_panel_visible">
          <div className="taxi027bPanelTitle"><h2>{t.appeal}</h2></div>
          <label><span>{t.appealReason}</span><textarea value={form.appealReason} onChange={(event) => patch("appealReason", event.target.value)} /></label>
          <div className="taxi027bMiniGrid"><label><span>{t.appealDeadline}</span><input value={form.appealDeadline} onChange={(event) => patch("appealDeadline", event.target.value)} /></label><label><span>{t.appealOwner}</span><input value={form.appealOwner} onChange={(event) => patch("appealOwner", event.target.value)} /></label></div>
          <label><span>{t.appealDecision}</span><textarea value={form.appealDecision} onChange={(event) => patch("appealDecision", event.target.value)} /></label>
          <div className="taxi027bActions">{button("openAppeal", t.openAppeal, routes.openAppeal)}{button("appealDecision", t.saveAppealDecision, routes.appealDecision)}</div>
        </section>

        <section className="taxi027bPanel taxi027bAssignment" data-function="assignment_panel_visible">
          <div className="taxi027bPanelTitle"><h2>{t.assignment}</h2></div>
          <label><span>{t.assignOperator}</span><input value={form.assignedOperator} onChange={(event) => patch("assignedOperator", event.target.value)} /></label>
          <label><span>{t.transferReason}</span><textarea value={form.transferReason} onChange={(event) => patch("transferReason", event.target.value)} /></label>
          <label><span>{t.ownerReason}</span><textarea value={form.ownerReason} onChange={(event) => patch("ownerReason", event.target.value)} /></label>
          <div className="taxi027bActions">{button("assign", t.assignOperator, routes.assignOperator)}{button("senior", t.transferSenior, routes.transferSenior)}{button("owner", t.transferOwner, routes.transferOwner)}{button("deadline", t.setDeadline, routes.deadline)}</div>
        </section>

        <section className="taxi027bPanel taxi027bHistory" data-function="action_history_backend_status_visible">
          <div className="taxi027bPanelTitle"><h2>{t.history}</h2></div>
          <div className="taxi027bHistoryList">
            {history.length ? history.map((row) => <article key={`${row.at}-${row.action}-${row.status}`} className={row.ok ? "ok" : "fail"}><b>{row.action}</b><span>{row.at}</span><small>{t.route}: {row.route}</small><small>{t.response}: {row.status} · {row.message}</small></article>) : <p>{t.historyEmpty}</p>}
          </div>
        </section>
      </div>
    </section>
  );
}
