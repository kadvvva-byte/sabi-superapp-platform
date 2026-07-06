import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props007T = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Tab007T = "applications" | "drivers" | "vehicles" | "tariffs" | "orders" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "access";
type Field007T = { key: string; label: string; type?: "text" | "number" | "textarea" | "select"; required?: boolean; options?: string[]; placeholder?: string };
type Action007T = { key: string; label: string; path: string; tone: "ready" | "warn" | "danger" | "locked"; ownerRequired?: boolean; checksRequired?: string[] };
type Workflow007T = { key: string; tab: Tab007T; title: string; subtitle: string; routeBase: string; recordLabel: string; fields: Field007T[]; checks: string[]; actions: Action007T[] };
type LastResponse007T = { ok: boolean; status: number | string; action: string; route: string; message: string; payload?: unknown; createdAt: string } | null;
type SourceStatus007T = { path: string; ok: boolean; status: number | string; message: string; at: string };
type Copy007T = Record<string, string>;

const MARKER007T = "ADMIN-UI-TAXI-007T-FIX1-PREMIUM-WORKING-CONSOLE";
const READ_ONLY_BACKEND_NOTE_007T = "read-only backend";

const COPY007T: Record<AdminLanguage, Copy007T> = {
  ru: {
    title: "Такси: полный рабочий пульт менеджера",
    subtitle: "Это не экран наблюдения. Здесь менеджер такси проверяет заявки, документы, водителей, авто, тарифы, жалобы, баланс и отправляет реальные серверные действия без локального фейкового успеха.",
    stage: "Шаг 17 · все детали, конкурсы и контроль честности",
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
    sourceHealth: "Синхрон с сервером",
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
    stage: "Step 17 · full details, contests and fairness control",
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
    stage: "17-bosqich · to‘liq detallar, konkurs va adolat nazorati",
    noFake: "Soxta yo'q: tugmalar lokal holatni o'zgartirmaydi. Har tugma faqat server orqali payload yuboradi, HTTP javob va locked reason ko'rsatadi.",
    loadData: "Real data va routes yuklash",
    refresh: "Sinxronlashlash",
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
    metricsSync: "Sinxronlash",
    metricsNoFake: "Soxta natija yo‘q",
    search: "Ma’lumot qidirish",
    recordId: "Yozuv raqami",
    routeOverride: "Server yo‘li farq qilsa almashtirish",
    submitDisabled: "Majburiy maydonlar to‘ldirilguncha tugma yopiq",
  },
  zh: {
    title: "出租车：完整工作管理控制台",
    subtitle: "这不是观察屏幕。出租车经理检查申请、文件、司机、车辆、费率、投诉和余额，并发送真实的仅服务器操作。",
    stage: "步骤 17 · 全细节、竞赛和公平控制",
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

const TAB_KEYS007T: Tab007T[] = ["applications", "drivers", "vehicles", "tariffs", "orders", "trips", "complaints", "balance", "rewards", "contests", "archive", "reports", "access"];
const requiredCommonFields007T = ["recordId", "adminReason"];

function workflows007T(copy: Copy007T): Workflow007T[] {
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
        { key: "licenseNumber", label: "Номер прав", required: true },
        { key: "vehiclePlate", label: "Госномер авто", required: true },
        { key: "vehicleModel", label: "Марка и модель авто", required: true },
        { key: "managerComment", label: copy.managerComment, type: "textarea" },
      ],
      checks: ["identityChecked", "licensePhotoChecked", "vehiclePhotoChecked", "registrationChecked", "insuranceChecked", "fraudRiskChecked", "archiveReady"],
      actions: [
        { key: "approve", label: "Подтвердить заявку", path: "/approve", tone: "ready", checksRequired: ["identityChecked", "licensePhotoChecked", "vehiclePhotoChecked", "registrationChecked", "insuranceChecked"] },
        { key: "reject", label: "Отклонить заявку", path: "/reject", tone: "danger", checksRequired: ["identityChecked", "fraudRiskChecked"] },
        { key: "request-documents", label: "Запросить документы", path: "/request-documents", tone: "warn", checksRequired: ["identityChecked"] },
        { key: "reopen", label: "Вернуть на проверку", path: "/reopen", tone: "locked" },
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

function emptyForm007T(workflow: Workflow007T): Record<string, string> {
  const out: Record<string, string> = { adminReason: "", ownerApprovalId: "", routeOverride: "" };
  workflow.fields.forEach((field) => { out[field.key] = field.options?.[0] || ""; });
  return out;
}

function allRequiredReady007T(workflow: Workflow007T, form: Record<string, string>, checks: Record<string, boolean>, action: Action007T): boolean {
  const fieldsReady = workflow.fields.filter((field) => field.required).every((field) => String(form[field.key] || "").trim().length > 0);
  const commonReady = requiredCommonFields007T.every((key) => String(form[key] || "").trim().length > 0);
  const checksReady = (action.checksRequired || workflow.checks.slice(0, 2)).every((key) => checks[key]);
  const ownerReady = !action.ownerRequired || String(form.ownerApprovalId || "").trim().length > 0;
  return fieldsReady && commonReady && checksReady && ownerReady;
}

function buildUrl007T(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

async function readJsonSafe007T(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

function collectRows007T(value: unknown, out: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    value.forEach((item) => { if (item && typeof item === "object" && !Array.isArray(item)) out.push(item as Record<string, unknown>); else collectRows007T(item, out); });
  } else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((next) => collectRows007T(next, out));
  }
  return out.slice(0, 80);
}

function rowValue007T(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return "";
}

function buildBlockers007T(workflow: Workflow007T, form: Record<string, string>, checks: Record<string, boolean>, action: Action007T): string[] {
  const blockers: string[] = [];
  workflow.fields.filter((field) => field.required).forEach((field) => { if (!String(form[field.key] || "").trim()) blockers.push(`missing:${field.key}`); });
  requiredCommonFields007T.forEach((key) => { if (!String(form[key] || "").trim()) blockers.push(`missing:${key}`); });
  (action.checksRequired || workflow.checks.slice(0, 2)).forEach((key) => { if (!checks[key]) blockers.push(`check:${key}`); });
  if (action.ownerRequired && !String(form.ownerApprovalId || "").trim()) blockers.push("ownerApprovalIdRequired");
  return blockers;
}

export function TaxiAdminControl007TPanel({ language, config, setNotice }: Props007T) {
  const copy = COPY007T[language] || COPY007T.ru;
  const workflows = useMemo(() => workflows007T(copy), [copy]);
  const [activeTab, setActiveTab] = useState<Tab007T>("applications");
  const [selectedKey, setSelectedKey] = useState("driverApplicationReview");
  const selected = workflows.find((item) => item.key === selectedKey) || workflows[0];
  const [form, setForm] = useState<Record<string, string>>(() => emptyForm007T(selected));
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [last, setLast] = useState<LastResponse007T>(null);
  const [sources, setSources] = useState<SourceStatus007T[]>([]);
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
    setForm(emptyForm007T(next));
    setChecks({});
  }, [selectedKey, workflows]);

  const updateField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const fillFromLiveRow = (row: Record<string, unknown>) => {
    setSelectedLiveRow(row);
    setForm((prev) => ({
      ...prev,
      recordId: rowValue007T(row, ["id", "applicationId", "driverId", "vehicleId", "tripId", "requestId", "complaintId", "tariffId", "ledgerId"]) || prev.recordId || "",
      driverId: rowValue007T(row, ["driverId", "driver_id", "driver"] ) || prev.driverId || "",
      riderId: rowValue007T(row, ["riderId", "rider_id", "rider"] ) || prev.riderId || "",
      region: rowValue007T(row, ["region", "zone", "city"] ) || prev.region || "",
      phone: rowValue007T(row, ["phone", "driverPhone", "mobile"] ) || prev.phone || "",
      vehiclePlate: rowValue007T(row, ["vehiclePlate", "plate", "licensePlate"] ) || prev.vehiclePlate || "",
      plate: rowValue007T(row, ["plate", "vehiclePlate", "licensePlate"] ) || prev.plate || "",
      vehicleModel: rowValue007T(row, ["vehicleModel", "model", "carModel"] ) || prev.vehicleModel || "",
      model: rowValue007T(row, ["model", "vehicleModel", "carModel"] ) || prev.model || "",
    }));
  };
  const requestedOperationRoute = (action: Action007T) => `${selected.routeBase}/${encodeURIComponent(form.recordId || "record")}${action.path}`;
  const actionRoute = (_action: Action007T) => form.routeOverride.trim() || "/api/taxi/002x/db-write-runtime/write-gate";

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
    const result: SourceStatus007T[] = [];
    for (const path of paths) {
      try {
        const response = await fetch(buildUrl007T(config.baseUrl, path), { headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } });
        const data = await readJsonSafe007T(response);
        if (path.includes("read-only-db-dry-run") && !path.endsWith("/plan")) {
          const rows = collectRows007T(data);
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

  const submitAction = async (action: Action007T) => {
    const blockers = buildBlockers007T(selected, form, checks, action);
    const canSubmit = blockers.length === 0;
    if (!canSubmit) {
      setNotice(copy.blocked);
      setLast({ ok: false, status: "blocked", action: action.label, route: actionRoute(action), message: `${copy.submitDisabled}: ${blockers.join(", ")}`, payload: { blockers }, createdAt: new Date().toISOString() });
      return;
    }
    setBusyAction(action.key);
    const route = actionRoute(action);
    const payload = {
      source: "admin-ui-007t-working-manager-console",
      marker: MARKER007T,
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
      const response = await fetch(buildUrl007T(config.baseUrl, route), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await readJsonSafe007T(response);
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

  const activeBlockers = selected.actions.flatMap((action) => buildBlockers007T(selected, form, checks, action));
  const uniqueBlockers = Array.from(new Set(activeBlockers));
  const checkedKeys = selected.checks.filter((check) => checks[check]);
  const requiredFields = selected.fields.filter((field) => field.required);
  const completedRequiredFields = requiredFields.filter((field) => String(form[field.key] || "").trim()).length;
  const readyActions = selected.actions.filter((action) => allRequiredReady007T(selected, form, checks, action));
  const workProgress = Math.round(((completedRequiredFields + checkedKeys.length) / Math.max(requiredFields.length + selected.checks.length, 1)) * 100);
  const filteredRows = liveRows.filter((row) => {
    const haystack = JSON.stringify(row).toLowerCase();
    return !search.trim() || haystack.includes(search.trim().toLowerCase());
  }).slice(0, 10);
  const currentRows = filteredRows.length ? filteredRows : (liveRows.length ? liveRows.slice(0, 10) : []);

  return (
    <section className="messengerStyle007B taxi007tPremium" data-admin-ui-taxi-007t-fix1-premium-working-console="ready" data-admin-ui-taxi-007t-no-fake-success="ready">
      <div className="ms007b-hero taxi007tHeroCompact">
        <div>
          <span className="ms007b-kicker">{copy.stage}</span>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        <div className="ms007b-heroBadges">
          <span>{config.baseUrl}</span>
          <span>RU / EN / UZ / ZH</span>
          <span>{MARKER007T}</span>
        </div>
      </div>

      <div className="taxi007tCommandBar" data-admin-ui-taxi-007t-fix1-command-bar="ready">
        <button type="button" className="taxi007tPrimary" onClick={() => void syncSources()}>{copy.loadData}</button>
        <button type="button" onClick={() => void syncSources()}>{copy.refresh}</button>
        <label><span>{copy.search}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.search} /></label>
        <div className="taxi007tCommandStatus"><strong>{readyActions.length}/{selected.actions.length}</strong><span>{readyActions.length ? copy.ready : copy.blocked}</span></div>
      </div>

      <div className="ms007b-tabs taxi007tStickyTabs" data-admin-ui-taxi-007t-tabs="ready">
        {TAB_KEYS007T.map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} type="button" onClick={() => { setActiveTab(tab); const first = workflows.find((item) => item.tab === tab); if (first) setSelectedKey(first.key); }}>
            {copy[tab]}
          </button>
        ))}
      </div>

      <div className="ms007b-metrics taxi007tMetrics">
        {metrics.map(([label, value, detail]) => <div className="ms007b-metric" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}
        <div className="ms007b-metric"><span>Progress</span><strong>{workProgress}%</strong><small>{checkedKeys.length}/{selected.checks.length} checks</small></div>
      </div>

      <div className="taxi007tWorkspace" data-admin-ui-taxi-007t-fix1-premium-workspace="ready">
        <aside className="taxi007tQueuePane">
          <div className="ms007b-sectionTitle"><h2>{copy.selectedWorkflow}</h2><span>{visibleWorkflows.length}</span></div>
          <div className="taxi007tWorkflowList" data-admin-ui-taxi-007t-workflow-list="ready">
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
          <div className="taxi007tLiveMini" data-admin-ui-taxi-007t-live-rows="ready">
            <div className="ms007b-sectionTitle"><h2>Live rows</h2><span>{liveRows.length}</span></div>
            {currentRows.length ? currentRows.map((row, index) => (
              <button key={`${rowValue007T(row, ["id", "driverId", "applicationId", "tripId"]) || index}`} type="button" onClick={() => fillFromLiveRow(row)}>
                <strong>{rowValue007T(row, ["id", "applicationId", "driverId", "vehicleId", "tripId", "complaintId"]) || `row-${index + 1}`}</strong>
                <span>{rowValue007T(row, ["status", "state", "kind", "type", "region"]) || "read-only"}</span>
              </button>
            )) : <div className="taxi007tEmpty">{copy.loadData}</div>}
          </div>
        </aside>

        <main className="taxi007tFormPane" data-admin-ui-taxi-007t-action-form="ready">
          <div className="taxi007tPanelHeader">
            <div><span>{selected.tab}</span><h2>{selected.title}</h2><p>{selected.subtitle}</p></div>
            <div className={readyActions.length ? "ms007b-statusOk" : "ms007b-statusBad"}>{readyActions.length ? copy.ready : copy.blocked}</div>
          </div>

          <div className="taxi007tRequiredStrip">
            <div><strong>{completedRequiredFields}/{requiredFields.length}</strong><span>required fields</span></div>
            <div><strong>{checkedKeys.length}/{selected.checks.length}</strong><span>review checks</span></div>
            <div><strong>{uniqueBlockers.length}</strong><span>blockers</span></div>
            <div><strong>{sources.filter((source) => source.ok).length}/{sources.length || 7}</strong><span>backend sync</span></div>
          </div>

          <div className="taxi007tFormGridPremium" data-admin-ui-taxi-007t-form-fields="ready">
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

          <div className="taxi007tChecksPremium" data-admin-ui-taxi-007t-review-checks="ready">
            {selected.checks.map((check) => (
              <label key={check} className={checks[check] ? "checked" : ""}>
                <input type="checkbox" checked={Boolean(checks[check])} onChange={(event) => setChecks((prev) => ({ ...prev, [check]: event.target.checked }))} />
                <span>{check}</span>
              </label>
            ))}
          </div>
        </main>

        <aside className="taxi007tActionDock" data-admin-ui-taxi-007t-action-buttons="ready">
          <div className="taxi007tDockTop">
            <h2>{copy.actionButtons}</h2>
            <p>{copy.noFake}</p>
          </div>
          <div className="taxi007tActionButtons">
            {selected.actions.map((action) => {
              const blockers = buildBlockers007T(selected, form, checks, action);
              const ready = blockers.length === 0;
              return (
                <button key={action.key} type="button" className={`taxi007tAction ${action.tone} ${ready ? "ready" : "blocked"}`} disabled={busyAction === action.key} onClick={() => void submitAction(action)}>
                  <strong>{busyAction === action.key ? "..." : action.label}</strong>
                  <span>{ready ? copy.ready : blockers.slice(0, 2).join("·")}</span>
                </button>
              );
            })}
          </div>
          <div className="taxi007tBlockersPremium" data-admin-ui-taxi-007t-blockers="ready">
            <h3>{copy.blocked}</h3>
            {uniqueBlockers.length ? uniqueBlockers.slice(0, 10).map((blocker) => <span key={blocker}>{blocker}</span>) : <b>{copy.ready}</b>}
          </div>
          <div className="taxi007tAiBox"><strong>Owner Sabi AI</strong><span>{copy.aiGuard}</span></div>
        </aside>
      </div>

      <div className="taxi007tBottomGrid" data-admin-ui-taxi-007t-sync-archive="ready">
        <section className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.sourceHealth}</h2><span>{sources.filter((source) => source.ok).length}/{sources.length || 7}</span></div>
          <div className="ms007b-reportList">
            {(sources.length ? sources : [{ path: "/api/taxi/002n/routes", ok: false, status: "not_loaded", message: copy.loadData, at: "" }]).map((source) => <div key={source.path}><span>{source.path} · {source.status}</span><b style={{ width: source.ok ? "96%" : "28%" }} /></div>)}
          </div>
        </section>
        <section className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.lastResponse}</h2><span>{last?.status || "empty"}</span></div>
          {last ? <div className={last.ok ? "ms007b-statusOk" : "ms007b-statusBad"}>{last.action} · {last.status} · {last.message}</div> : <div className="ms007b-statusBad">{copy.archiveTrail}: backend response empty</div>}
          <details className="taxi007tDetails"><summary>Payload / sync package</summary><pre>{JSON.stringify({ last, selectedWorkflow: selected.key, selectedLiveRow, form, checked: Object.keys(checks).filter((key) => checks[key]) }, null, 2)}</pre></details>
        </section>
      </div>
    </section>
  );
}