import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props007UFix1 = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Tab007UFix1 = "applications" | "drivers" | "vehicles" | "tariffs" | "orders" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "access";
type Field007UFix1 = { key: string; label: string; type?: "text" | "number" | "textarea" | "select"; required?: boolean; options?: string[]; placeholder?: string };
type Action007UFix1 = { key: string; label: string; path: string; tone: "ready" | "warn" | "danger" | "locked"; ownerRequired?: boolean; checksRequired?: string[] };
type Workflow007UFix1 = { key: string; tab: Tab007UFix1; title: string; subtitle: string; routeBase: string; recordLabel: string; fields: Field007UFix1[]; checks: string[]; actions: Action007UFix1[] };
type LastResponse007UFix1 = { ok: boolean; status: number | string; action: string; route: string; message: string; payload?: unknown; createdAt: string } | null;
type SourceStatus007UFix1 = { path: string; ok: boolean; status: number | string; message: string; at: string };
type Copy007UFix1 = Record<string, string>;

const MARKER007U_FIX1 = "ADMIN-UI-TAXI-007U-FIX1-APPLICATIONS-IN-FULL-CONSOLE";
const READ_ONLY_BACKEND_NOTE_007U_FIX1 = "read-only backend";

const COPY007U_FIX1: Record<AdminLanguage, Copy007UFix1> = {
  ru: {
    title: "Такси: полный рабочий пульт менеджера",
    subtitle: "Это не экран наблюдения. Здесь менеджер такси проверяет заявки, документы, водителей, авто, тарифы, жалобы, баланс и отправляет реальные серверные действия без локального фейкового успеха.",
    stage: "Шаг 18, исправление 1 · заявки 100% внутри полной консоли такси",
    noFake: "Без фейка: кнопки не меняют статус локально. Каждая кнопка отправляет серверный пакет, показывает ответ сервера, причину блокировки и требует повторную синхронизацию.",
    loadData: "Загрузить реальные данные и маршруты",
    refresh: "Синхронизировать",
    selectedWorkflow: "Рабочая форма",
    backendRoute: "Backend route",
    actionReason: "Причина действия менеджера",
    ownerApproval: "Номер одобрения владельца / команда владельца",
    managerComment: "Комментарий проверки",
    requiredChecks: "Поля проверки",
    actionButtons: "Кнопки управления",
    sourceHealth: "Синхронизация с сервером",
    lastResponse: "Последний ответ сервера",
    archiveTrail: "Архив проверки",
    aiGuard: "Саби ИИ владельца контролирует, докладывает владельцу и ждёт команду. Сам ничего не выполняет.",
    accessRule: "Менеджер такси видит только экран такси. Финансы, платные подключения, выплаты, платежи и провайдера утверждает только владелец.",
    blocked: "Не хватает обязательных полей или проверок",
    ready: "Готово к серверной отправке",
    sent: "Действие отправлено на сервер",
    networkError: "Сервер не ответил или маршрут заблокирован",
    applications: "Заявки",
    drivers: "Водители",
    vehicles: "Авто",
    tariffs: "Тарифы",
    orders: "Заказы",
    trips: "Поездки",
    complaints: "Жалобы",
    balance: "Баланс",
    rewards: "Бонусы",
    contests: "Конкурсы",
    monthlyContest: "Ежемесячный конкурс",
    starFairness: "Честность звёздочек",
    cleanliness: "Чистота",
    politeness: "Вежливость",
    raffleControl: "Контроль розыгрыша",
    qualityScore: "Оценка качества",
    archive: "Архив",
    reports: "Отчёты",
    access: "Доступ",
    metricsFunctions: "Функции",
    metricsActions: "Действия",
    metricsSync: "Синхрон",
    metricsNoFake: "Soxta natija yo‘q",
    search: "Поиск по данным",
    recordId: "Номер записи",
    routeOverride: "Переопределить маршрут, если серверный маршрут отличается",
    submitDisabled: "Кнопка заблокирована до заполнения обязательных полей",
  },
  en: {
    title: "Taksi: detailed working menejer console",
    subtitle: "This is not a monitoring screen. The Taksi menejer reviews applications, documents, drivers, vehicles, tariffs, complaints, balance and sends real faqat server orqali actions without local soxta muvaffaqiyat.",
    stage: "Step 18 FIX1 · applications 100% inside full Taksi console",
    noFake: "Soxta natija yo‘q: tugmalar holatni mahalliy o‘zgartirmaydi. Har bir tugma faqat server orqali yuklama yuboradi, HTTP javobini, bloklash sababini ko‘rsatadi va qayta sinxronlashni talab qiladi.",
    loadData: "Load real data and routes",
    refresh: "Synchronize",
    selectedWorkflow: "Working form",
    backendRoute: "Backend route",
    actionReason: "Manager action reason",
    ownerApproval: "egasi tasdig‘i raqami / egasi buyrug‘i",
    managerComment: "Review comment",
    requiredChecks: "Review fields",
    actionButtons: "Control buttons",
    sourceHealth: "Server sync",
    lastResponse: "Last official response",
    archiveTrail: "Review archive",
    aiGuard: "egasining Sabi sunʼiy intellekti controls, reports to the egasi and waits for command. It does not execute independently.",
    accessRule: "Taksi menejer sees only the Taksi screen. Fin ance, paid connections, payout/payment/provayder are egasi-only.",
    blocked: "Required fields or checks are missing",
    ready: "Ready for faqat server orqali submission",
    sent: "Action sent to server",
    networkError: "Backend did not respond or route is locked",
    applications: "Applications",
    drivers: "Drivers",
    vehicles: "Vehicles",
    tariffs: "Tariffs",
    orders: "Orders",
    trips: "Trips",
    complaints: "Complaints",
    balance: "Balance",
    rewards: "Rewards",
    contests: "Contests",
    monthlyContest: "Monthly contest",
    starFairness: "Star fairness",
    cleanliness: "Cleanliness",
    politeness: "Politeness",
    raffleControl: "Raffle control",
    qualityScore: "Quality score",
    archive: "Archive",
    reports: "Reports",
    access: "Access",
    metricsFunctions: "Functions",
    metricsActions: "Actions",
    metricsSync: "Sync",
    metricsNoFake: "Soxta natija yo‘q",
    search: "Search data",
    recordId: "Record ID",
    routeOverride: "Override route when backend route differs",
    submitDisabled: "Button is locked until required fields are complete",
  },
  uz: {
    title: "Taksi: to‘liq ishchi menejer paneli",
    subtitle: "Bu kuzatuv ekrani emas. Taksi menejeri arizalar, hujjatlar, haydovchilar, avtomobillar, tariflar, shikoyatlar va balansni tekshiradi hamda faqat server orqali amal yuboradi.",
    stage: "18 FIX1 · arizalar 100% va to‘liq taksi konsoli",
    noFake: "Soxta yo'q: tugmalar lokal holatni o'zgartirmaydi. Har tugma faqat server orqali payload yuboradi, HTTP javob va locked reason ko'rsatadi.",
    loadData: "Real data va routes yuklash",
    refresh: "Yangilashlash",
    selectedWorkflow: "Ishchi forma",
    backendRoute: "Backend route",
    actionReason: "Manager sabab izohi",
    ownerApproval: "egasi tasdig‘i raqami / egasi buyrug‘i",
    managerComment: "Tekshiruv izohi",
    requiredChecks: "Tekshiruv maydonlari",
    actionButtons: "Boshqaruv tugmalari",
    sourceHealth: "Server sinxron",
    lastResponse: "Oxirgi server javob",
    archiveTrail: "Tekshiruv arxivi",
    aiGuard: "Egasining Sabi sunʼiy intellekti nazorat qiladi, egasiga hisobot beradi va buyruq kutadi. O‘zi mustaqil bajarmaydi.",
    accessRule: "Taksi menejer faqat Taksi ekranini ko'radi. Moliya, pullik ulanishlar, payout/payment/provayder faqat egasi tomonidan tasdiqlanadi.",
    blocked: "Majburiy maydonlar yoki tekshiruvlar yetishmayapti",
    ready: "Faqat server orqali yuborishga tayyor",
    sent: "Amal server ga yuborildi",
    networkError: "Backend javob bermadi yoki route locked",
    applications: "Arizalar",
    drivers: "Haydovchilar",
    vehicles: "Avto",
    tariffs: "Tariflar",
    orders: "Buyurtmalar",
    trips: "Safarlar",
    complaints: "Shikoyatlar",
    balance: "Balans",
    rewards: "Bonuslar",
    contests: "Konkurslar",
    monthlyContest: "Oylik konkurs",
    starFairness: "Yulduzchalar adolati",
    cleanliness: "Tozalik",
    politeness: "Xushmuomalalik",
    raffleControl: "Qur’a nazorati",
    qualityScore: "Sifat bahosi",
    archive: "Arxiv",
    reports: "Hisobotlar",
    access: "Ruxsat",
    metricsFunctions: "Funksiyalar",
    metricsActions: "Amallar",
    metricsSync: "Yangilash",
    metricsNoFake: "Soxta natija yo‘q",
    search: "Ma’lumot qidirish",
    recordId: "Yozuv raqami",
    routeOverride: "Server yo‘li farq qilsa almashtirish",
    submitDisabled: "Majburiy maydonlar to‘ldirilguncha tugma yopiq",
  },
  zh: {
    title: "出租车：完整工作管理控制台",
    subtitle: "这不是观察屏幕。出租车经理检查申请、文件、司机、车辆、费率、投诉和余额，并发送真实的仅服务器操作。",
    stage: "步骤 18，修复 1 · 申请 100% 保留完整出租车控制台",
    noFake: "无假成功：按钮不会在本地改变状态。每个按钮发送仅服务器数据包，显示服务器响应和锁定原因。",
    loadData: "加载真实数据和路线",
    refresh: "同步",
    selectedWorkflow: "工作表单",
    backendRoute: "Backend route",
    actionReason: "经理操作原因",
    ownerApproval: "所有者批准编号 / 所有者命令",
    managerComment: "审核备注",
    requiredChecks: "审核字段",
    actionButtons: "控制按钮",
    sourceHealth: "服务器同步",
    lastResponse: "最后服务器响应",
    archiveTrail: "审核归档",
    aiGuard: "所有者萨比智能负责监督、向所有者报告并等待命令，不能独立执行。",
    accessRule: "出租车经理只能看到出租车页面。财务、付费连接、付款、支付和服务商仅由所有者审批。",
    blocked: "缺少必填字段或审核内容",
    ready: "可发送到服务器",
    sent: "操作已发送到服务器",
    networkError: "服务器无响应或路线已锁定",
    applications: "申请",
    drivers: "司机",
    vehicles: "车辆",
    tariffs: "费率",
    orders: "订单",
    trips: "行程",
    complaints: "投诉",
    balance: "余额",
    rewards: "奖励",
    contests: "竞赛",
    monthlyContest: "月度竞赛",
    starFairness: "星级公平",
    cleanliness: "清洁度",
    politeness: "礼貌",
    raffleControl: "抽奖控制",
    qualityScore: "质量评分",
    archive: "归档",
    reports: "报告",
    access: "权限",
    metricsFunctions: "功能",
    metricsActions: "操作",
    metricsSync: "同步",
    metricsNoFake: "Soxta natija yo‘q",
    search: "搜索数据",
    recordId: "记录编号",
    routeOverride: "如果服务器路线不同可覆盖",
    submitDisabled: "必填字段完成前按钮锁定",
  },
};

const TAB_KEYS007U_FIX1: Tab007UFix1[] = ["applications", "drivers", "vehicles", "tariffs", "orders", "trips", "complaints", "balance", "rewards", "contests", "archive", "reports", "access"];
const requiredCommonFields007T = ["recordId", "adminReason"];

function workflows007UFix1(copy: Copy007UFix1): Workflow007UFix1[] {
  return [
    {
      key: "driverApplicationReview",
      tab: "applications",
      title: "Проверка заявки таксиста",
      subtitle: "Проверка анкеты, фото, документов, прав, страховки, регистрации и авто перед подключением таксиста.",
      routeBase: "/api/taxi/admin/driver-applications",
      recordLabel: "Application ID",
      fields: [
        { key: "recordId", label: copy.recordId, required: true },
        { key: "driverName", label: "ФИО водителя", required: true },
        { key: "phone", label: "Телефон", required: true },
        { key: "region", label: "Регион", required: true },
        { key: "submittedAt", label: "Дата подачи заявки" },
        { key: "kycStatus", label: "Статус проверки личности", type: "select", options: ["pending", "in_review", "approved", "rejected"], required: true },
        { key: "passportId", label: "Паспорт / номер документа", required: true },
        { key: "profilePhotoUrl", label: "Фото профиля", required: true },
        { key: "selfieUrl", label: "Селфи с документом", required: true },
        { key: "licenseNumber", label: "Номер водительских прав", required: true },
        { key: "licensePhotoUrl", label: "Фото водительских прав", required: true },
        { key: "insuranceDocumentUrl", label: "Страховка", required: true },
        { key: "registrationDocumentUrl", label: "Регистрация авто", required: true },
        { key: "vehiclePlate", label: "Госномер авто", required: true },
        { key: "vehicleModel", label: "Марка и модель", required: true },
        { key: "vehicleYear", label: "Год авто", type: "number", required: true },
        { key: "vehicleColor", label: "Цвет авто", required: true },
        { key: "vehicleCategory", label: "Категория", type: "select", options: ["economy", "comfort", "business", "delivery", "cargo"], required: true },
        { key: "vehicleExteriorPhotoUrl", label: "Фото авто снаружи", required: true },
        { key: "vehicleInteriorPhotoUrl", label: "Фото салона", required: true },
        { key: "fraudScore", label: "Fraud score", type: "number", required: true },
        { key: "duplicateCheck", label: "Проверка дублей", type: "select", options: ["clear", "review", "duplicate_found"], required: true },
        { key: "archiveFolderId", label: "Номер архива проверки", required: true },
        { key: "ownerSabiAiNote", label: "Отметка Саби ИИ владельца", type: "textarea", required: true },
        { key: "managerComment", label: copy.managerComment, type: "textarea", required: true },
      ],
      checks: ["identityChecked", "profilePhotoChecked", "selfiePhotoChecked", "licensePhotoChecked", "vehicleExteriorPhotoChecked", "vehicleInteriorPhotoChecked", "registrationChecked", "insuranceChecked", "plateMatchesVehicleChecked", "kycStatusChecked", "duplicateDriverChecked", "fraudRiskChecked", "ownerSabiAiReviewed", "menejerCommentReady", "archiveReady"],
      actions: [
        { key: "approve", label: "Подтвердить заявку", path: "/approve", tone: "ready", checksRequired: ["identityChecked", "profilePhotoChecked", "selfiePhotoChecked", "licensePhotoChecked", "vehicleExteriorPhotoChecked", "vehicleInteriorPhotoChecked", "registrationChecked", "insuranceChecked", "plateMatchesVehicleChecked", "kycStatusChecked", "fraudRiskChecked", "ownerSabiAiReviewed", "archiveReady"] },
        { key: "reject", label: "Отклонить заявку", path: "/reject", tone: "danger", checksRequired: ["identityChecked", "fraudRiskChecked", "ownerSabiAiReviewed", "managerCommentReady", "archiveReady"] },
        { key: "request-documents", label: "Запросить документы", path: "/request-documents", tone: "warn", checksRequired: ["identityChecked", "managerCommentReady"] },
        { key: "reopen", label: "Вернуть на проверку", path: "/reopen", tone: "locked", checksRequired: ["managerCommentReady"] },
        { key: "save-archive", label: "Сохранить архив проверки", path: "/archive", tone: "ready", checksRequired: ["archiveReady", "ownerSabiAiReviewed"] },
        { key: "owner-report", label: "Отправить в отчёт владельцу", path: "/owner-report", tone: "locked", checksRequired: ["ownerSabiAiReviewed", "managerCommentReady"] },
      ],
    },
    {
      key: "driverProfileControl",
      tab: "drivers",
      title: "Управление водителем",
      subtitle: "Статусы водителя, доступ к заказам, блокировка, восстановление, риск и история нарушений.",
      routeBase: "/api/taxi/admin/drivers",
      recordLabel: "Driver ID",
      fields: [
        { key: "recordId", label: "Driver ID", required: true },
        { key: "driverStatus", label: "Статус", type: "select", options: ["pending", "active", "suspended", "blocked"], required: true },
        { key: "dispatchAccess", label: "Доступ к заказам", type: "select", options: ["allow", "hold", "deny"], required: true },
        { key: "riskLevel", label: "Риск", type: "select", options: ["low", "medium", "high", "critical"], required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["driverHistoryChecked", "complaintsChecked", "balanceChecked", "documentsStillValid", "ownerSabiAiReviewed"],
      actions: [
        { key: "activate", label: "Активировать водителя", path: "/activate", tone: "ready" },
        { key: "suspend", label: "Приостановить", path: "/suspend", tone: "warn" },
        { key: "block", label: "Заблокировать", path: "/block", tone: "danger", ownerRequired: true },
        { key: "restore", label: "Восстановить", path: "/restore", tone: "locked", ownerRequired: true },
      ],
    },
    {
      key: "vehicleControl",
      tab: "vehicles",
      title: "Управление авто",
      subtitle: "Проверка авто, документов, фото, назначения водителю и допуска к поездкам.",
      routeBase: "/api/taxi/admin/vehicles",
      recordLabel: "Vehicle ID",
      fields: [
        { key: "recordId", label: "Vehicle ID", required: true },
        { key: "driverId", label: "Driver ID", required: true },
        { key: "plate", label: "Госномер", required: true },
        { key: "model", label: "Модель", required: true },
        { key: "category", label: "Категория", type: "select", options: ["economy", "comfort", "business", "delivery", "cargo"], required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["vehiclePhotoChecked", "registrationChecked", "insuranceChecked", "technicalInspectionChecked", "driverMatchChecked"],
      actions: [
        { key: "approve", label: "Одобрить авто", path: "/approve", tone: "ready" },
        { key: "reject", label: "Отклонить авто", path: "/reject", tone: "danger" },
        { key: "assign", label: "Назначить водителю", path: "/assign", tone: "ready" },
        { key: "revoke", label: "Отозвать авто", path: "/revoke", tone: "warn" },
      ],
    },
    {
      key: "tariffRulesControl",
      tab: "tariffs",
      title: "Регулировка тарифов",
      subtitle: "База, цена за км, цена за минуту, комиссия %, зоны, ожидание, отмена, пиковый коэффициент и правила комиссии.",
      routeBase: "/api/taxi/admin/tariffs",
      recordLabel: "Tariff ID",
      fields: [
        { key: "recordId", label: "Tariff ID / Region ID", required: true },
        { key: "region", label: "Регион", required: true },
        { key: "baseFare", label: "Базовая цена", type: "number", required: true },
        { key: "perKm", label: "Цена за км", type: "number", required: true },
        { key: "perMinute", label: "Цена за минуту", type: "number", required: true },
        { key: "commissionPercent", label: "Комиссия %", type: "number", required: true },
        { key: "surgeMultiplier", label: "Surge multiplier", type: "number" },
        { key: "waitingFee", label: "Ожидание", type: "number" },
        { key: "cancelFee", label: "Отмена", type: "number" },
        { key: "rulesJson", label: "Правила тарифа", type: "textarea" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["regionChecked", "commissionChecked", "priceLimitsChecked", "legalChecked", "ownerFin anceGateChecked", "rollbackPlanReady"],
      actions: [
        { key: "save-draft", label: "Сохранить проект тарифа", path: "/save-draft", tone: "warn" },
        { key: "activate", label: "Активировать тариф", path: "/activate", tone: "ready", ownerRequired: true },
        { key: "suspend", label: "Остановить тариф", path: "/suspend", tone: "danger", ownerRequired: true },
        { key: "set-commission", label: "Задать комиссию %", path: "/set-commission", tone: "locked", ownerRequired: true },
      ],
    },
    {
      key: "orderDispatchControl",
      tab: "orders",
      title: "Заказы и диспетчеризация",
      subtitle: "Расчёт, заявка, отмена, предложение, истечение, переназначение, отказ и ручной контроль менеджера.",
      routeBase: "/api/taxi/admin/orders",
      recordLabel: "Order / Request ID",
      fields: [
        { key: "recordId", label: "Order / Request ID", required: true },
        { key: "riderId", label: "Rider ID" },
        { key: "driverId", label: "Driver ID" },
        { key: "pickup", label: "Pickup" },
        { key: "dropoff", label: "Dropoff" },
        { key: "tariffId", label: "Tariff ID" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["riderChecked", "driverAvailabilityChecked", "routeChecked", "tariffChecked", "safetyChecked"],
      actions: [
        { key: "create-offer", label: "Создать предложение", path: "/create-offer", tone: "ready" },
        { key: "reassign", label: "Переназначить", path: "/reassign", tone: "warn" },
        { key: "expire-offer", label: "Завершить предложение", path: "/expire-offer", tone: "locked" },
        { key: "cancel-request", label: "Отменить заказ", path: "/cancel-request", tone: "danger" },
      ],
    },
    {
      key: "tripLifecycleControl",
      tab: "trips",
      title: "Жизненный цикл поездки",
      subtitle: "Прибыл, пассажир сел, началась, завершилась, отменена, флаг безопасности и ручной контроль спорных поездок.",
      routeBase: "/api/taxi/admin/trips",
      recordLabel: "Trip ID",
      fields: [
        { key: "recordId", label: "Trip ID", required: true },
        { key: "driverId", label: "Driver ID", required: true },
        { key: "riderId", label: "Rider ID" },
        { key: "fare", label: "Fare", type: "number" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["tripStatusChecked", "gpsRouteChecked", "fareChecked", "complaintsChecked", "safetyChecked"],
      actions: [
        { key: "mark-arrived", label: "Водитель прибыл", path: "/arrived", tone: "ready" },
        { key: "mark-picked-up", label: "Пассажир сел", path: "/picked-up", tone: "ready" },
        { key: "complete", label: "Завершить поездку", path: "/complete", tone: "ready" },
        { key: "safety-flag", label: "Safety flag", path: "/safety-flag", tone: "danger", ownerRequired: true },
      ],
    },
    {
      key: "complaintResolutionControl",
      tab: "complaints",
      title: "Жалобы и доказательства",
      subtitle: "Назначение, эскалация, решение, штраф, предупреждение, доказательства, контекст водителя и пассажира и доклад Саби ИИ владельца.",
      routeBase: "/api/taxi/admin/complaints",
      recordLabel: "Complaint ID",
      fields: [
        { key: "recordId", label: "Complaint ID", required: true },
        { key: "tripId", label: "Trip ID" },
        { key: "driverId", label: "Driver ID" },
        { key: "severity", label: "Severity", type: "select", options: ["low", "medium", "high", "critical"], required: true },
        { key: "evidenceSummary", label: "Evidence summary", type: "textarea", required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["evidenceChecked", "tripContextChecked", "driverHistoryChecked", "riderHistoryChecked", "aiRiskChecked", "ownerReportReady"],
      actions: [
        { key: "assign", label: "Назначить исполнителя", path: "/assign", tone: "ready" },
        { key: "escalate", label: "Эскалировать", path: "/escalate", tone: "warn", ownerRequired: true },
        { key: "resolve", label: "Закрыть жалобу", path: "/resolve", tone: "ready" },
        { key: "penalty", label: "Подготовить штраф", path: "/penalty", tone: "danger", ownerRequired: true },
      ],
    },
    {
      key: "balanceSettlementControl",
      tab: "balance",
      title: "Баланс и расчёты",
      subtitle: "Заработано, ожидание, доступно, резерв, удержание, расчёт, заморозка или разблокировка и граница провайдера и платежей.",
      routeBase: "/api/taxi/admin/balance",
      recordLabel: "Ledger / Driver ID",
      fields: [
        { key: "recordId", label: "Ledger / Driver ID", required: true },
        { key: "driverId", label: "Driver ID", required: true },
        { key: "amount", label: "Сумма", type: "number", required: true },
        { key: "currency", label: "Currency", type: "select", options: ["UZS", "USD", "EUR"], required: true },
        { key: "provayderRef", label: "Provider reference" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["driverBalanceChecked", "settlementChecked", "provayderReferenceChecked", "fraudChecked", "ownerFin anceGateChecked"],
      actions: [
        { key: "hold", label: "Поставить удержание", path: "/hold", tone: "warn", ownerRequired: true },
        { key: "release", label: "Снять удержание", path: "/release", tone: "ready", ownerRequired: true },
        { key: "mark-pending", label: "Settlement pending", path: "/settlement-pending", tone: "locked", ownerRequired: true },
        { key: "mark-available", label: "Settlement available", path: "/settlement-available", tone: "ready", ownerRequired: true },
      ],
    },
    {
      key: "rewardBonusControl",
      tab: "rewards",
      title: "Бонусы / подарки / призовые мероприятия",
      subtitle: "Награды такси, чаевые, бонусы, мероприятия, заморозка или разблокировка и граница одобрения владельца.",
      routeBase: "/api/taxi/admin/rewards",
      recordLabel: "Reward / Campaign ID",
      fields: [
        { key: "recordId", label: "Reward / Campaign ID", required: true },
        { key: "driverId", label: "Driver ID" },
        { key: "campaignName", label: "Название мероприятия", required: true },
        { key: "amount", label: "Сумма", type: "number" },
        { key: "rulesJson", label: "Правила мероприятия", type: "textarea" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["campaignRulesChecked", "budgetChecked", "fraudChecked", "ownerFin anceGateChecked", "archiveReady"],
      actions: [
        { key: "save-campaign", label: "Сохранить мероприятие", path: "/save-campaign", tone: "warn" },
        { key: "freeze-reward", label: "Заморозить бонус", path: "/freeze", tone: "danger", ownerRequired: true },
        { key: "release-reward", label: "Разморозить бонус", path: "/release", tone: "ready", ownerRequired: true },
      ],
    },
    {
      key: "monthlyContestControl",
      tab: "contests",
      title: copy.monthlyContest,
      subtitle: "Monthly Taksi contest: score rules, star collection, cleanliness, politeness, safety, fraud checks, budget and egasi command nazorat.",
      routeBase: "/api/taxi/admin/contests",
      recordLabel: "Contest ID",
      fields: [
        { key: "recordId", label: "Contest ID", required: true },
        { key: "contestMonth", label: "Month / YYYY-MM", required: true },
        { key: "region", label: "Region / Zone", required: true },
        { key: "prizeBudget", label: "Prize budget", type: "number", required: true },
        { key: "minTrips", label: "Minimum trips", type: "number", required: true },
        { key: "minStars", label: "Minimum stars", type: "number", required: true },
        { key: "cleanlinessWeight", label: "Cleanliness weight %", type: "number", required: true },
        { key: "politenessWeight", label: "Politeness weight %", type: "number", required: true },
        { key: "safetyWeight", label: "Safety weight %", type: "number", required: true },
        { key: "rulesJson", label: "Contest rules JSON", type: "textarea", required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["rulesChecked", "budgetChecked", "starFairnessChecked", "cleanlinessChecked", "politenessChecked", "fraudChecked", "ownerFin anceGateChecked", "archiveReady"],
      actions: [
        { key: "save-contest-draft", label: "Save contest draft", path: "/save-draft", tone: "warn" },
        { key: "request-owner-contest-approval", label: "Request Owner approval", path: "/request-owner-approval", tone: "locked", ownerRequired: true },
        { key: "activate-contest", label: "Activate contest", path: "/activate", tone: "ready", ownerRequired: true, checksRequired: ["rulesChecked", "budgetChecked", "starFairnessChecked", "fraudChecked", "ownerFinanceGateChecked"] },
        { key: "suspend-contest", label: "Suspend contest", path: "/suspend", tone: "danger", ownerRequired: true },
      ],
    },
    {
      key: "starFairnessControl",
      tab: "contests",
      title: copy.starFairness,
      subtitle: "Control star collection fairness: repeated riders, soxta ratings, staff abuse, complaint conflicts, trip evidence and Sabi sunʼiy intellekti risk flags.",
      routeBase: "/api/taxi/admin/contest-stars",
      recordLabel: "Driver / Star case ID",
      fields: [
        { key: "recordId", label: "Star case ID", required: true },
        { key: "driverId", label: "Driver ID", required: true },
        { key: "contestMonth", label: "Month / YYYY-MM", required: true },
        { key: "starCount", label: "Star count", type: "number", required: true },
        { key: "uniqueRiderCount", label: "Unique riders", type: "number", required: true },
        { key: "complaintCount", label: "Complaints", type: "number", required: true },
        { key: "aiRiskScore", label: "Owner Sabi AI risk score", type: "number", required: true },
        { key: "evidenceSummary", label: "Evidence summary", type: "textarea", required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["uniqueRidersChecked", "soxtaRatingChecked", "tripEvidenceChecked", "complaintsChecked", "aiRiskChecked", "staffConflictChecked", "archiveReady"],
      actions: [
        { key: "mark-stars-valid", label: "Mark stars valid", path: "/mark-valid", tone: "ready", checksRequired: ["uniqueRidersChecked", "fakeRatingChecked", "tripEvidenceChecked", "aiRiskChecked"] },
        { key: "hold-stars", label: "Hold stars", path: "/hold", tone: "warn" },
        { key: "exclude-from-raffle", label: "Exclude from raffle", path: "/exclude", tone: "danger", ownerRequired: true },
        { key: "send-owner-report", label: "Send to Owner report", path: "/owner-report", tone: "locked" },
      ],
    },
    {
      key: "cleanlinessPolitenessControl",
      tab: "contests",
      title: copy.qualityScore,
      subtitle: "Control cleanliness and politeness scores: rider feedback, photo evidence, complaint conflicts, safety score and monthly contest eligibility.",
      routeBase: "/api/taxi/admin/quality-score",
      recordLabel: "Quality score case ID",
      fields: [
        { key: "recordId", label: "Quality case ID", required: true },
        { key: "driverId", label: "Driver ID", required: true },
        { key: "cleanlinessScore", label: "Cleanliness score", type: "number", required: true },
        { key: "politenessScore", label: "Politeness score", type: "number", required: true },
        { key: "safetyScore", label: "Safety score", type: "number", required: true },
        { key: "photoEvidence", label: "Photo evidence links", type: "textarea" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["cleanlinessEvidenceChecked", "politenessFeedbackChecked", "complaintConflictChecked", "safetyScoreChecked", "ownerSabiAiReviewed"],
      actions: [
        { key: "approve-quality-score", label: "Approve quality score", path: "/approve-score", tone: "ready" },
        { key: "adjust-quality-score", label: "Adjust score", path: "/adjust-score", tone: "warn", ownerRequired: true },
        { key: "disqualify-quality", label: "Disqualify quality score", path: "/disqualify", tone: "danger", ownerRequired: true },
      ],
    },
    {
      key: "raffleDrawControl",
      tab: "contests",
      title: copy.raffleControl,
      subtitle: "Main raffle control: eligible drivers, star fairness, fraud scan, prize budget, draw seed, egasi command and archive package.",
      routeBase: "/api/taxi/admin/raffles",
      recordLabel: "Raffle ID",
      fields: [
        { key: "recordId", label: "Raffle ID", required: true },
        { key: "contestMonth", label: "Month / YYYY-MM", required: true },
        { key: "eligibleDriverCount", label: "Eligible drivers", type: "number", required: true },
        { key: "winnerCount", label: "Winner count", type: "number", required: true },
        { key: "drawSeed", label: "Draw seed / tekshiruv seed", required: true },
        { key: "prizeRulesJson", label: "Prize rules JSON", type: "textarea", required: true },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["eligibilityChecked", "starFairnessChecked", "fraudChecked", "budgetChecked", "ownerCommandAttached", "archiveReady", "noStaffConflict"],
      actions: [
        { key: "prepare-raffle", label: "Prepare raffle", path: "/prepare", tone: "warn" },
        { key: "request-owner-draw-command", label: "Request Owner draw command", path: "/request-owner-command", tone: "locked", ownerRequired: true },
        { key: "execute-draw-through-backend", label: "Execute backend draw", path: "/execute-draw", tone: "ready", ownerRequired: true, checksRequired: ["eligibilityChecked", "starFairnessChecked", "fraudChecked", "budgetChecked", "ownerCommandAttached"] },
        { key: "archive-draw", label: "Archive draw package", path: "/archive", tone: "ready" },
      ],
    },
    {
      key: "archiveAndReportControl",
      tab: "archive",
      title: "Архив и аудит",
      subtitle: "Сохранение документов, фото, причин, ответа сервера, сотрудника, отметки ИИ и команды владельца.",
      routeBase: "/api/taxi/admin/archive",
      recordLabel: "Archive case ID",
      fields: [
        { key: "recordId", label: "Archive case ID", required: true },
        { key: "entityType", label: "Тип", type: "select", options: ["application", "driver", "vehicle", "trip", "complaint", "balance", "tariff"], required: true },
        { key: "evidenceLinks", label: "Evidence links", type: "textarea" },
        { key: "adminReason", label: copy.actionReason, type: "textarea", required: true },
      ],
      checks: ["archiveFieldsChecked", "documentsAttached", "serverResponseAttached", "reviewerAttached", "ownerAiMarkAttached"],
      actions: [
        { key: "archive", label: "Сохранить в архив", path: "/archive", tone: "ready" },
        { key: "attach-evidence", label: "Прикрепить доказательства", path: "/attach-evidence", tone: "ready" },
        { key: "daily-report", label: "Включить в ежедневный отчёт", path: "/daily-report", tone: "locked" },
      ],
    },
  ];
}

function emptyForm007UFix1(workflow: Workflow007UFix1): Record<string, string> {
  const out: Record<string, string> = { adminReason: "", ownerApprovalId: "", routeOverride: "" };
  workflow.fields.forEach((field) => { out[field.key] = field.options?.[0] || ""; });
  return out;
}

function allRequiredReady007UFix1(workflow: Workflow007UFix1, form: Record<string, string>, checks: Record<string, boolean>, action: Action007UFix1): boolean {
  const fieldsReady = workflow.fields.filter((field) => field.required).every((field) => String(form[field.key] || "").trim().length > 0);
  const commonReady = requiredCommonFields007T.every((key) => String(form[key] || "").trim().length > 0);
  const checksReady = (action.checksRequired || workflow.checks.slice(0, 2)).every((key) => checks[key]);
  const ownerReady = !action.ownerRequired || String(form.ownerApprovalId || "").trim().length > 0;
  return fieldsReady && commonReady && checksReady && ownerReady;
}

function buildUrl007UFix1(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

async function readJsonSafe007UFix1(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

function collectRows007UFix1(value: unknown, out: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    value.forEach((item) => { if (item && typeof item === "object" && !Array.isArray(item)) out.push(item as Record<string, unknown>); else collectRows007UFix1(item, out); });
  } else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((next) => collectRows007UFix1(next, out));
  }
  return out.slice(0, 80);
}

function rowValue007UFix1(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return "";
}

function buildBlockers007UFix1(workflow: Workflow007UFix1, form: Record<string, string>, checks: Record<string, boolean>, action: Action007UFix1): string[] {
  const blockers: string[] = [];
  workflow.fields.filter((field) => field.required).forEach((field) => { if (!String(form[field.key] || "").trim()) blockers.push(`missing:${field.key}`); });
  requiredCommonFields007T.forEach((key) => { if (!String(form[key] || "").trim()) blockers.push(`missing:${key}`); });
  (action.checksRequired || workflow.checks.slice(0, 2)).forEach((key) => { if (!checks[key]) blockers.push(`check:${key}`); });
  if (action.ownerRequired && !String(form.ownerApprovalId || "").trim()) blockers.push("ownerApprovalIdRequired");
  return blockers;
}

export function TaxiAdminControl007UFix1Panel({ language, config, setNotice }: Props007UFix1) {
  const copy = COPY007U_FIX1[language] || COPY007U_FIX1.ru;
  const workflows = useMemo(() => workflows007UFix1(copy), [copy]);
  const [activeTab, setActiveTab] = useState<Tab007UFix1>("applications");
  const [selectedKey, setSelectedKey] = useState("driverApplicationReview");
  const selected = workflows.find((item) => item.key === selectedKey) || workflows[0];
  const [form, setForm] = useState<Record<string, string>>(() => emptyForm007UFix1(selected));
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [last, setLast] = useState<LastResponse007UFix1>(null);
  const [sources, setSources] = useState<SourceStatus007UFix1[]>([]);
  const [busyAction, setBusyAction] = useState<string>("");
  const [liveRows, setLiveRows] = useState<Record<string, unknown>[]>([]);
  const [selectedLiveRow, setSelectedLiveRow] = useState<Record<string, unknown> | null>(null);
  const [search, setSearch] = useState("");
  const visibleWorkflows = workflows.filter((item) => item.tab === activeTab || (activeTab === "reports" && ["archiveAndReportControl", "balanceSettlementControl", "complaintResolutionControl"].includes(item.key)) || (activeTab === "access" && ["driverApplicationReview", "driverProfileControl", "tariffRulesControl"].includes(item.key)));
  const metrics = [
    [copy.metricsFunctions, String(workflows.length), "Taksi foundation"],
    [copy.metricsActions, String(workflows.flatMap((item) => item.actions).length), "approve / reject / freeze / tariff"],
    [copy.metricsSync, `${sources.filter((item) => item.ok).length}/${sources.length || 7}`, "server read-only"],
    [copy.metricsNoFake, "100%", "backend-only"],
  ];

  useEffect(() => {
    const next = workflows.find((item) => item.key === selectedKey) || workflows[0];
    setForm(emptyForm007UFix1(next));
    setChecks({});
  }, [selectedKey, workflows]);

  const updateField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const fillFromLiveRow = (row: Record<string, unknown>) => {
    setSelectedLiveRow(row);
    setForm((prev) => ({
      ...prev,
      recordId: rowValue007UFix1(row, ["id", "applicationId", "driverId", "vehicleId", "tripId", "requestId", "complaintId", "tariffId", "ledgerId"]) || prev.recordId || "",
      driverId: rowValue007UFix1(row, ["driverId", "driver_id", "driver"] ) || prev.driverId || "",
      riderId: rowValue007UFix1(row, ["riderId", "rider_id", "rider"] ) || prev.riderId || "",
      region: rowValue007UFix1(row, ["region", "zone", "city"] ) || prev.region || "",
      phone: rowValue007UFix1(row, ["phone", "driverPhone", "mobile"] ) || prev.phone || "",
      vehiclePlate: rowValue007UFix1(row, ["vehiclePlate", "plate", "licensePlate"] ) || prev.vehiclePlate || "",
      plate: rowValue007UFix1(row, ["plate", "vehiclePlate", "licensePlate"] ) || prev.plate || "",
      vehicleModel: rowValue007UFix1(row, ["vehicleModel", "model", "carModel"] ) || prev.vehicleModel || "",
      model: rowValue007UFix1(row, ["model", "vehicleModel", "carModel"] ) || prev.model || "",
      submittedAt: rowValue007UFix1(row, ["submittedAt", "createdAt", "created_at"] ) || prev.submittedAt || "",
      kycStatus: rowValue007UFix1(row, ["kycStatus", "kyc_status", "verificationStatus"] ) || prev.kycStatus || "",
      passportId: rowValue007UFix1(row, ["passportId", "documentId", "idDocument"] ) || prev.passportId || "",
      profilePhotoUrl: rowValue007UFix1(row, ["profilePhotoUrl", "driverPhotoUrl", "avatarUrl"] ) || prev.profilePhotoUrl || "",
      selfieUrl: rowValue007UFix1(row, ["selfieUrl", "selfiePhotoUrl", "identitySelfieUrl"] ) || prev.selfieUrl || "",
      licensePhotoUrl: rowValue007UFix1(row, ["licensePhotoUrl", "driverLicensePhotoUrl"] ) || prev.licensePhotoUrl || "",
      insuranceDocumentUrl: rowValue007UFix1(row, ["insuranceDocumentUrl", "insurancePhotoUrl"] ) || prev.insuranceDocumentUrl || "",
      registrationDocumentUrl: rowValue007UFix1(row, ["registrationDocumentUrl", "vehicleRegistrationUrl"] ) || prev.registrationDocumentUrl || "",
      vehicleYear: rowValue007UFix1(row, ["vehicleYear", "year", "carYear"] ) || prev.vehicleYear || "",
      vehicleColor: rowValue007UFix1(row, ["vehicleColor", "color", "carColor"] ) || prev.vehicleColor || "",
      vehicleCategory: rowValue007UFix1(row, ["vehicleCategory", "category", "class"] ) || prev.vehicleCategory || "",
      vehicleExteriorPhotoUrl: rowValue007UFix1(row, ["vehicleExteriorPhotoUrl", "carExteriorPhotoUrl"] ) || prev.vehicleExteriorPhotoUrl || "",
      vehicleInteriorPhotoUrl: rowValue007UFix1(row, ["vehicleInteriorPhotoUrl", "carInteriorPhotoUrl"] ) || prev.vehicleInteriorPhotoUrl || "",
      fraudScore: rowValue007UFix1(row, ["fraudScore", "riskScore"] ) || prev.fraudScore || "",
      duplicateCheck: rowValue007UFix1(row, ["duplicateCheck", "duplicateStatus"] ) || prev.duplicateCheck || "",
      archiveFolderId: rowValue007UFix1(row, ["archiveFolderId", "archiveId"] ) || prev.archiveFolderId || "",
    }));
  };
  const requestedOperationRoute = (action: Action007UFix1) => `${selected.routeBase}/${encodeURIComponent(form.recordId || "record")}${action.path}`;
  const actionRoute = (_action: Action007UFix1) => form.routeOverride.trim() || "/api/taxi/002x/db-write-runtime/write-gate";

  const syncSources = async () => {
    const paths = [
      "/api/taxi/002n/readiness",
      "/api/taxi/002n/routes",
      "/api/admin/taxi/002n/diagnostics",
      "/api/taxi/002t/read-only-db-dry-run/plan",
      "/api/taxi/002t/read-only-db-dry-run",
      "/api/taxi/002x/db-write-runtime/write-gate",
      "/api/taxi/003h/admin-readiness-cockpit/check",
    ];
    const result: SourceStatus007UFix1[] = [];
    for (const path of paths) {
      try {
        const response = await fetch(buildUrl007UFix1(config.baseUrl, path), { headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } });
        const data = await readJsonSafe007UFix1(response);
        if (path.includes("read-only-db-dry-run") && !path.endsWith("/plan")) {
          const rows = collectRows007UFix1(data);
          setLiveRows(rows);
          if (rows[0]) setSelectedLiveRow(rows[0]);
        }
        result.push({ path, ok: response.ok, status: response.status, message: typeof data === "object" && data && "status" in data ? String((data as { status?: unknown }).status) : response.statusText, at: new Date().toISOString() });
      } catch (error) {
        result.push({ path, ok: false, status: "network", message: error instanceof Error ? error.message : copy.networkError, at: new Date().toISOString() });
      }
    }
    setSources(result);
    setNotice(copy.refresh);
  };

  const submitAction = async (action: Action007UFix1) => {
    const blockers = buildBlockers007UFix1(selected, form, checks, action);
    const canSubmit = blockers.length === 0;
    if (!canSubmit) {
      setNotice(copy.blocked);
      setLast({ ok: false, status: "blocked", action: action.label, route: actionRoute(action), message: `${copy.submitDisabled}: ${blockers.join(", ")}`, payload: { blockers }, createdAt: new Date().toISOString() });
      return;
    }
    setBusyAction(action.key);
    const route = actionRoute(action);
    const payload = {
      source: "admin-ui-007u-fix1-applications-full-console",
      marker: MARKER007U_FIX1,
      workflowKey: selected.key,
      tab: selected.tab,
      actionKey: action.key,
      actionLabel: action.label,
      requestedOperationRoute: requestedOperationRoute(action),
      effectiveBackendGateRoute: route,
      blockers,
      selectedLiveRow,
      managerRole: "taxi_manager",
      ownerSabiAiControl: true,
      ownerSabiAiMayExecuteIndependently: false,
      fakeSuccessBlocked: true,
      localStatusMutationBlocked: true,
      requireBackendResponse: true,
      requireAuditArchive: true,
      form,
      checks,
      requiredChecks: action.checksRequired || selected.checks,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(buildUrl007UFix1(config.baseUrl, route), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await readJsonSafe007UFix1(response);
      setLast({ ok: response.ok, status: response.status, action: action.label, route, message: response.ok ? copy.sent : `${response.status} ${response.statusText}`, payload: data, createdAt: new Date().toISOString() });
      setNotice(response.ok ? copy.sent : `${copy.networkError}: ${response.status}`);
      await syncSources();
    } catch (error) {
      setLast({ ok: false, status: "network", action: action.label, route, message: error instanceof Error ? error.message : copy.networkError, payload, createdAt: new Date().toISOString() });
      setNotice(copy.networkError);
    } finally {
      setBusyAction("");
    }
  };

  const selectedFieldLabels = selected.fields.map((field) => field.label.toLowerCase()).join(" ");
  const searchHit = !search.trim() || `${selected.title} ${selected.subtitle} ${selected.key} ${selectedFieldLabels}`.toLowerCase().includes(search.trim().toLowerCase());

  const activeBlockers = selected.actions.flatMap((action) => buildBlockers007UFix1(selected, form, checks, action));
  const uniqueBlockers = Array.from(new Set(activeBlockers));
  const checkedKeys = selected.checks.filter((check) => checks[check]);
  const requiredFields = selected.fields.filter((field) => field.required);
  const completedRequiredFields = requiredFields.filter((field) => String(form[field.key] || "").trim()).length;
  const readyActions = selected.actions.filter((action) => allRequiredReady007UFix1(selected, form, checks, action));
  const workProgress = Math.round(((completedRequiredFields + checkedKeys.length) / Math.max(requiredFields.length + selected.checks.length, 1)) * 100);
  const filteredRows = liveRows.filter((row) => {
    const haystack = JSON.stringify(row).toLowerCase();
    return !search.trim() || haystack.includes(search.trim().toLowerCase());
  }).slice(0, 10);
  const currentRows = filteredRows.length ? filteredRows : (liveRows.length ? liveRows.slice(0, 10) : []);

  return (
    <section className="messengerStyle007B taxi007uFix1Premium" data-admin-ui-taxi-007u-fix1-applications-full-console="ready" data-admin-ui-taxi-007u-fix1-no-fake-success="ready">
      <div className="ms007b-hero taxi007uFix1HeroCompact">
        <div>
          <span className="ms007b-kicker">{copy.stage}</span>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        <div className="ms007b-heroBadges">
          <span>{config.baseUrl}</span>
          <span>RU / EN / UZ / ZH</span>
          <span>{MARKER007U_FIX1}</span>
        </div>
      </div>

      <div className="taxi007uFix1CommandBar" data-admin-ui-taxi-007t-fix1-command-bar="ready">
        <button type="button" className="taxi007uFix1Primary" onClick={() => void syncSources()}>{copy.loadData}</button>
        <button type="button" onClick={() => void syncSources()}>{copy.refresh}</button>
        <label><span>{copy.search}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.search} /></label>
        <div className="taxi007uFix1CommandStatus"><strong>{readyActions.length}/{selected.actions.length}</strong><span>{readyActions.length ? copy.ready : copy.blocked}</span></div>
      </div>

      <div className="ms007b-tabs taxi007uFix1StickyTabs" data-admin-ui-taxi-007t-tabs="ready">
        {TAB_KEYS007U_FIX1.map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} type="button" onClick={() => { setActiveTab(tab); const first = workflows.find((item) => item.tab === tab); if (first) setSelectedKey(first.key); }}>
            {copy[tab]}
          </button>
        ))}
      </div>

      <div className="ms007b-metrics taxi007uFix1Metrics">
        {metrics.map(([label, value, detail]) => <div className="ms007b-metric" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}
        <div className="ms007b-metric"><span>Progress</span><strong>{workProgress}%</strong><small>{checkedKeys.length}/{selected.checks.length} checks</small></div>
      </div>

      <div className="taxi007uFix1Workspace" data-admin-ui-taxi-007t-fix1-premium-workspace="ready">
        <aside className="taxi007uFix1QueuePane">
          <div className="ms007b-sectionTitle"><h2>{copy.selectedWorkflow}</h2><span>{visibleWorkflows.length}</span></div>
          <div className="taxi007uFix1WorkflowList" data-admin-ui-taxi-007t-workflow-list="ready">
            {visibleWorkflows.map((workflow) => {
              const selectedWorkflow = workflow.key === selected.key;
              return (
                <button key={workflow.key} type="button" className={selectedWorkflow ? "active" : ""} onClick={() => setSelectedKey(workflow.key)}>
                  <strong>{workflow.title}</strong>
                  <span>{workflow.actions.length} actions · {workflow.checks.length} checks</span>
                </button>
              );
            })}
          </div>
          <div className="taxi007uFix1LiveMini" data-admin-ui-taxi-007t-live-rows="ready">
            <div className="ms007b-sectionTitle"><h2>Live rows</h2><span>{liveRows.length}</span></div>
            {currentRows.length ? currentRows.map((row, index) => (
              <button key={`${rowValue007UFix1(row, ["id", "driverId", "applicationId", "tripId"]) || index}`} type="button" onClick={() => fillFromLiveRow(row)}>
                <strong>{rowValue007UFix1(row, ["id", "applicationId", "driverId", "vehicleId", "tripId", "complaintId"]) || `row-${index + 1}`}</strong>
                <span>{rowValue007UFix1(row, ["status", "state", "kind", "type", "region"]) || "read-only"}</span>
              </button>
            )) : <div className="taxi007uFix1Empty">{copy.loadData}</div>}
          </div>
        </aside>

        <main className="taxi007uFix1FormPane" data-admin-ui-taxi-007t-action-form="ready">
          <div className="taxi007uFix1PanelHeader">
            <div><span>{selected.tab}</span><h2>{selected.title}</h2><p>{selected.subtitle}</p></div>
            <div className={readyActions.length ? "ms007b-statusOk" : "ms007b-statusBad"}>{readyActions.length ? copy.ready : copy.blocked}</div>
          </div>

          <div className="taxi007uFix1RequiredStrip">
            <div><strong>{completedRequiredFields}/{requiredFields.length}</strong><span>required fields</span></div>
            <div><strong>{checkedKeys.length}/{selected.checks.length}</strong><span>review checks</span></div>
            <div><strong>{uniqueBlockers.length}</strong><span>blockers</span></div>
            <div><strong>{sources.filter((source) => source.ok).length}/{sources.length || 7}</strong><span>backend sync</span></div>
          </div>
          {selected.tab === "applications" ? (
            <div className="taxi007uFix1ApplicationBoard" data-admin-ui-taxi-007u-fix1-applications-100-board="ready">
              <div className="taxi007uFix1ApplicationCard">
                <h3>1. Водитель</h3>
                <p>Номер, ФИО, телефон, регион, дата заявки и статус проверки личности должны быть заполнены из серверной строки или вручную менеджером.</p>
                <strong>{[form.recordId, form.driverName, form.phone, form.region, form.kycStatus].filter(Boolean).length}/5</strong>
              </div>
              <div className="taxi007uFix1ApplicationCard">
                <h3>2. Фото и документы</h3>
                <p>Паспорт или номер документа, селфи, фото профиля, права, страховка и регистрация авто обязательны до подтверждения.</p>
                <strong>{[form.passportId, form.profilePhotoUrl, form.selfieUrl, form.licensePhotoUrl, form.insuranceDocumentUrl, form.registrationDocumentUrl].filter(Boolean).length}/6</strong>
              </div>
              <div className="taxi007uFix1ApplicationCard">
                <h3>3. Авто</h3>
                <p>Госномер, модель, год, цвет, категория, фото кузова и фото салона должны совпадать с документами.</p>
                <strong>{[form.vehiclePlate, form.vehicleModel, form.vehicleYear, form.vehicleColor, form.vehicleCategory, form.vehicleExteriorPhotoUrl, form.vehicleInteriorPhotoUrl].filter(Boolean).length}/7</strong>
              </div>
              <div className="taxi007uFix1ApplicationCard owner">
                <h3>4. Риск, архив и Саби ИИ владельца</h3>
                <p>Оценка мошенничества, дубли, комментарий менеджера, архив и отметка Саби ИИ владельца обязательны. ИИ докладывает владельцу, но не выполняет действие сам.</p>
                <strong>{[form.fraudScore, form.duplicateCheck, form.archiveFolderId, form.ownerSabiAiNote, form.managerComment].filter(Boolean).length}/5</strong>
              </div>
            </div>
          ) : null}

          <div className="taxi007uFix1FormGridPremium" data-admin-ui-taxi-007t-form-fields="ready">
            {selected.fields.map((field) => (
              <label key={field.key} className={field.type === "textarea" ? "wide" : ""}>
                <span>{field.label}{field.required ? "*" : ""}</span>
                {field.type === "textarea" ? <textarea value={form[field.key] || ""} onChange={(event) => updateField(field.key, event.target.value)} placeholder={field.placeholder || field.label} /> : field.type === "select" ? (
                  <select value={form[field.key] || field.options?.[0] || ""} onChange={(event) => updateField(field.key, event.target.value)}>
                    {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : <input type={field.type || "text"} value={form[field.key] || ""} onChange={(event) => updateField(field.key, event.target.value)} placeholder={field.placeholder || field.label} />}
              </label>
            ))}
            <label><span>{copy.ownerApproval}</span><input value={form.ownerApprovalId || ""} onChange={(event) => updateField("ownerApprovalId", event.target.value)} placeholder={copy.ownerApproval} /></label>
            <label className="wide"><span>{copy.routeOverride}</span><input value={form.routeOverride || ""} onChange={(event) => updateField("routeOverride", event.target.value)} placeholder={copy.routeOverride} /></label>
          </div>

          <div className="taxi007uFix1ChecksPremium" data-admin-ui-taxi-007t-review-checks="ready">
            {selected.checks.map((check) => (
              <label key={check} className={checks[check] ? "checked" : ""}>
                <input type="checkbox" checked={Boolean(checks[check])} onChange={(event) => setChecks((prev) => ({ ...prev, [check]: event.target.checked }))} />
                <span>{check}</span>
              </label>
            ))}
          </div>
        </main>

        <aside className="taxi007uFix1ActionDock" data-admin-ui-taxi-007t-action-buttons="ready">
          <div className="taxi007uFix1DockTop">
            <h2>{copy.actionButtons}</h2>
            <p>{copy.noFake}</p>
          </div>
          <div className="taxi007uFix1ActionButtons">
            {selected.actions.map((action) => {
              const blockers = buildBlockers007UFix1(selected, form, checks, action);
              const ready = blockers.length === 0;
              return (
                <button key={action.key} type="button" className={`taxi007uFix1Action ${action.tone} ${ready ? "ready" : "blocked"}`} disabled={busyAction === action.key} onClick={() => void submitAction(action)}>
                  <strong>{busyAction === action.key ? "..." : action.label}</strong>
                  <span>{ready ? copy.ready : blockers.slice(0, 2).join("·")}</span>
                </button>
              );
            })}
          </div>
          <div className="taxi007uFix1BlockersPremium" data-admin-ui-taxi-007t-blockers="ready">
            <h3>{copy.blocked}</h3>
            {uniqueBlockers.length ? uniqueBlockers.slice(0, 10).map((blocker) => <span key={blocker}>{blocker}</span>) : <b>{copy.ready}</b>}
          </div>
          <div className="taxi007uFix1AiBox"><strong>Owner Sabi AI</strong><span>{copy.aiGuard}</span></div>
        </aside>
      </div>

      <div className="taxi007uFix1BottomGrid" data-admin-ui-taxi-007t-sync-archive="ready">
        <section className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.sourceHealth}</h2><span>{sources.filter((source) => source.ok).length}/{sources.length || 7}</span></div>
          <div className="ms007b-reportList">
            {(sources.length ? sources : [{ path: "/api/taxi/002n/routes", ok: false, status: "not_loaded", message: copy.loadData, at: "" }]).map((source) => <div key={source.path}><span>{source.path} · {source.status}</span><b style={{ width: source.ok ? "96%" : "28%" }} /></div>)}
          </div>
        </section>
        <section className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.lastResponse}</h2><span>{last?.status || "empty"}</span></div>
          {last ? <div className={last.ok ? "ms007b-statusOk" : "ms007b-statusBad"}>{last.action} · {last.status} · {last.message}</div> : <div className="ms007b-statusBad">{copy.archiveTrail}: backend response empty</div>}
          <details className="taxi007uFix1Details"><summary>Payload / sync package</summary><pre>{JSON.stringify({ last, selectedWorkflow: selected.key, selectedLiveRow, form, checked: Object.keys(checks).filter((key) => checks[key]) }, null, 2)}</pre></details>
        </section>
      </div>
    </section>
  );
}