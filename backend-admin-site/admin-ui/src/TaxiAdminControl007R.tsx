import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props007R = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Tone007R = "ready" | "info" | "warn" | "locked" | "danger";
type AreaKey007R = "overview" | "applications" | "fleet" | "operations" | "complaints" | "balance" | "tariffs" | "archive" | "reports" | "aiAccess";
type Copy007R = Record<string, string>;
type Function007R = { key: string; area: AreaKey007R; tone: Tone007R; title: string; desc: string; checks: string[]; actions: string[]; route: string; ownerGate?: boolean };
type AuditItem007R = { id: string; title: string; area: string; status: string; ownerCommand: string; at: string };

const MARKER007R = "ADMIN-UI-TAXI-007R-FULL-FOUNDATION-MESSENGER-CONTROL";

const COPY007R: Record<AdminLanguage, Copy007R> = {
  ru: {
    title: "Такси: полный центр управления",
    subtitle: "Все функции основы такси возвращены в админку без смены дизайна: заявки, одобрения, водители, авто, заказы, поездки, жалобы, баланс, тарифы, архив, отчёты и Саби ИИ владельца.",
    stage: "Шаг 15 · полное восстановление",
    noFake: "Без фейка: интерфейс готовит проверку и пакет только для сервера. Финальное действие выполняется только сервером после прав доступа, аудита и команды владельца, если она нужна.",
    tabOverview: "Обзор",
    tabApplications: "Заявки",
    tabFleet: "Водители и авто",
    tabOperations: "Заказы и поездки",
    tabComplaints: "Жалобы",
    tabBalance: "Баланс",
    tabTariffs: "Тарифы",
    tabArchive: "Архив",
    tabReports: "Отчёты",
    tabAiAccess: "Саби ИИ / доступ",
    metricFoundation: "Основа такси",
    metricFunctions: "Функции",
    metricOwnerAi: "egasining Sabi sunʼiy intellekti",
    metricNoFake: "No soxta",
    metricValueFoundation: "100%",
    metricValueFunctions: "14 зон",
    metricValueOwnerAi: "контроль",
    metricValueNoFake: "backend-only",
    foundationTitle: "Все функции из основы такси",
    foundationNote: "Ничего не вырезано: каждый блок отображается отдельно, с проверками, ручным контролем, договором маршрута и архивом.",
    selectedTitle: "Панель ручного управления",
    selectedEmpty: "Выберите функцию слева. Менеджер готовит проверку, Саби ИИ владельца контролирует, финальное действие ждёт сервер или владельца.",
    checklist: "Проверки",
    actions: "Доступные действия",
    route: "Backend route / contract",
    reason: "Причина / комментарий менеджера",
    ownerCommand: "Команда владельца / номер одобрения владельца",
    prepare: "Подготовить пакет только для сервера",
    cannotExecute: "Не выполнять самостоятельно",
    aiTitle: "Саби ИИ владельца контролирует весь процесс",
    aiBody: "Саби ИИ ниже владельца, выше сотрудников. Он проверяет заявки, документы, баланс, жалобы, действия менеджеров, программистов и бухгалтеров, докладывает владельцу и ждёт команду.",
    accessTitle: "Матрица доступа",
    ownerAccess: "Владелец: 100% доступ и финальное решение.",
    aiAccess: "Саби ИИ владельца: 100% контроль, но без самостоятельного выполнения действий.",
    deputyAccess: "Зам: до 80%, контроль сотрудников и доступов без финальных финансовых решений.",
    staffAccess: "Сотрудники: 10–50% только по ответственности, без самостоятельных финальных решений.",
    taxiManagerAccess: "Менеджер такси: только экран такси, заявки, документы, авто, жалобы, баланс, мероприятия и архив.",
    financeGate: "Финансы, платные подключения, провайдер, платежи, выплаты и финальные решения утверждает только владелец.",
    archiveTitle: "Архив проверки",
    archiveBody: "Каждая заявка и действие должны иметь след: кто проверял, что проверил, документы, фото, авто, причина, ответ сервера, отметка Саби ИИ и команда владельца.",
    dailyReport: "Ежедневный доклад владельцу",
    dailyBody: "Саби ИИ собирает нарушения, пропущенные проверки, слабые заявки, жалобы, баланс, действия сотрудников и отправляет владельцу отчёт.",
    logTitle: "Журнал подготовленных действий",
    emptyLog: "Пока нет подготовленных действий в этой сессии.",
    sourcesTitle: "Серверные источники такси",
    languageTitle: "Языки",
    languageBody: "Видимый текст должен быть чистым на русском, английском, узбекском и китайском языках. Технические номера, маршруты, серверные пути и исходный формат не переводятся.",
    restoreTitle: "Что восстановлено",
    restoreBody: "Заявки, одобрения, водители, авто, заказы, диспетчеризация, поездки, жалобы, доказательства, баланс, расчёты, тарифы, комиссии, бонусы, архив, аудит, роли, Саби ИИ владельца и отчёты.",
  },
  en: {
    title: "Taksi: full control center",
    subtitle: "Every Taksi foundation function is back in Admin interfeys without changing the design: applications, tasdiqs, drivers, vehicles, orders, trips, complaints, balance, tariffs, archive, reports and egasining Sabi sunʼiy intellekti.",
    stage: "Step 15 · full restore",
    noFake: "No soxta: interfeys prepares review and a faqat server orqali package. Final execution is only by server after access rules, tekshiruv and egasi command when required.",
    tabOverview: "Overview",
    tabApplications: "Applications",
    tabFleet: "Drivers and vehicles",
    tabOperations: "Orders and trips",
    tabComplaints: "Complaints",
    tabBalance: "Balance",
    tabTariffs: "Tariffs",
    tabArchive: "Archive",
    tabReports: "Reports",
    tabAiAccess: "Sabi sunʼiy intellekti / access",
    metricFoundation: "Taksi foundation",
    metricFunctions: "Functions",
    metricOwnerAi: "egasining Sabi sunʼiy intellekti",
    metricNoFake: "No soxta",
    metricValueFoundation: "100%",
    metricValueFunctions: "14 areas",
    metricValueOwnerAi: "control",
    metricValueNoFake: "backend-only",
    foundationTitle: "All Taksi foundation functions",
    foundationNote: "Nothing is removed: every block is shown separately with checks, manual control, route contract and archive.",
    selectedTitle: "Manual control panel",
    selectedEmpty: "Select a function on the left. The menejer prepares the review, egasining Sabi sunʼiy intellekti controls it, and final action waits for server/egasi.",
    checklist: "Checks",
    actions: "Available actions",
    route: "Backend route / contract",
    reason: "Manager reason / comment",
    ownerCommand: "egasi buyrug‘i / egasi tasdig‘i raqami",
    prepare: "Prepare faqat server orqali package",
    cannotExecute: "Do not execute independently",
    aiTitle: "egasining Sabi sunʼiy intellekti controls the whole process",
    aiBody: "Sabi sunʼiy intellekti is below the egasi and above staff. It checks applications, documents, balance, complaints, menejers, dasturchis and buxgalters, reports to the egasi and waits for command.",
    accessTitle: "Access matrix",
    ownerAccess: "egasi: 100% access and final decision.",
    aiAccess: "egasining Sabi sunʼiy intellekti: 100% control, without independent execution.",
    deputyAccess: "Deputy: up to 80%, staff and access control without final fin ancial decisions.",
    staffAccess: "Staff: 10–50% by responsibility only, without independent final decisions.",
    taxiManagerAccess: "Taksi menejer: Taksi screen only, applications, documents, vehicles, complaints, balance, campaigns and archive.",
    financeGate: "Fin ance, paid connections, provayder/payment/payout and final decisions are egasi-only.",
    archiveTitle: "Review archive",
    archiveBody: "Every application and action must have a trail: reviewer, checks, documents, photos, vehicle, reason, official response, Sabi AI mark, and owner command.",
    dailyReport: "Daily report to egasi",
    dailyBody: "Sabi sunʼiy intellekti collects violations, skipped reviews, weak applications, complaints, balance, staff actions and reports to the egasi.",
    logTitle: "Prepared action journal",
    emptyLog: "No prepared actions in this session yet.",
    sourcesTitle: "Taksi server sources",
    languageTitle: "Languages",
    languageBody: "Visible copy must stay clean RU / EN / UZ / ZH. Technical IDs, routes, server paths and JSON are not translated.",
    restoreTitle: "Restored scope",
    restoreBody: "Applications, tasdiqs, drivers, vehicles, orders, yuborish, trips, complaints, evidence, balance, settlement, tariffs, commissions, bonuses, archive, tekshiruv, roles, egasining Sabi sunʼiy intellekti and reports.",
  },
  uz: {
    title: "Taksi: to'liq boshqaruv markazi",
    subtitle: "Taksi asosi funksiyalari admin interfeysiga qaytarildi: arizalar, tasdiqlar, haydovchilar, avtomobillar, buyurtmalar, safarlar, shikoyatlar, balans, tariflar, arxiv, hisobotlar va egasining Sabi sunʼiy intellekti.",
    stage: "15-bosqich · to'liq tiklash",
    noFake: "Soxta yo'q: interfeys tekshiruv va faqat server orqali paket tayyorlaydi. Yakuniy bajarish faqat server, access, tekshiruv va kerak bo'lsa egasi buyrug'idan keyin.",
    tabOverview: "Umumiy",
    tabApplications: "Arizalar",
    tabFleet: "Haydovchi va auto",
    tabOperations: "Buyurtma va safar",
    tabComplaints: "Shikoyatlar",
    tabBalance: "Balans",
    tabTariffs: "Tariflar",
    tabArchive: "Arxiv",
    tabReports: "Hisobotlar",
    tabAiAccess: "Sabi sunʼiy intellekti / ruxsat",
    metricFoundation: "Taksi asos",
    metricFunctions: "Funksiyalar",
    metricOwnerAi: "egasining Sabi sunʼiy intellekti",
    metricNoFake: "No soxta",
    metricValueFoundation: "100%",
    metricValueFunctions: "14 zona",
    metricValueOwnerAi: "nazorat",
    metricValueNoFake: "backend-only",
    foundationTitle: "Taksi asosidagi barcha funksiyalar",
    foundationNote: "Hech narsa olib tashlanmadi: har blok alohida, tekshiruv, qo'lda nazorat, route contract va arxiv bilan ko'rsatiladi.",
    selectedTitle: "Qo'lda boshqaruv paneli",
    selectedEmpty: "Chapdan funksiyani tanlang. Manager tekshiruv tayyorlaydi, egasining Sabi sunʼiy intellekti nazorat qiladi, yakuniy harakat server/egasi ni kutadi.",
    checklist: "Tekshiruvlar",
    actions: "Mavjud amallar",
    route: "Backend route / contract",
    reason: "Manager sababi / izoh",
    ownerCommand: "egasi buyrug‘i / egasi tasdig‘i raqami",
    prepare: "Faqat server orqali paket tayyorlash",
    cannotExecute: "Mustaqil bajarilmaydi",
    aiTitle: "egasining Sabi sunʼiy intellekti butun jarayonni nazorat qiladi",
    aiBody: "Sabi sunʼiy intellekti egasi dan pastda va xodimlardan yuqorida. Arizalar, hujjatlar, balans, shikoyatlar, menejer, dasturchi va buxgalter ishini tekshiradi, egasiga hisobot beradi va buyruq kutadi.",
    accessTitle: "Ruxsat matritsasi",
    ownerAccess: "egasi: 100% ruxsat va yakuniy qaror.",
    aiAccess: "egasining Sabi sunʼiy intellekti: 100% nazorat, mustaqil bajarishsiz.",
    deputyAccess: "Deputy: 80% gacha, xodim va ruxsat nazorati, yakuniy moliyaviy qarorsiz.",
    staffAccess: "Xodimlar: 10–50% faqat mas'uliyat bo'yicha, mustaqil yakuniy qarorsiz.",
    taxiManagerAccess: "Taksi menejeri: faqat taksi ekrani, arizalar, hujjatlar, avtomobillar, shikoyatlar, balans, tadbirlar va arxiv.",
    financeGate: "Moliya, pullik ulanishlar, provayder/payment/payout va yakuniy qarorlar faqat egasi tomonidan.",
    archiveTitle: "Tekshiruv arxivi",
    archiveBody: "Har ariza va harakat izi bo‘lishi kerak: kim tekshirdi, nima tekshirildi, hujjatlar, rasmlar, avtomobil, sabab, server javobi, Sabi sunʼiy intellekti belgisi va egasi buyrug‘i.",
    dailyReport: "Egasiga kunlik hisobot",
    dailyBody: "Sabi sunʼiy intellekti buzilishlar, o‘tkazilgan tekshiruvlar, zaif arizalar, shikoyatlar, balans va xodim harakatlarini yig‘adi va egasiga hisobot beradi.",
    logTitle: "Tayyorlangan harakatlar jurnali",
    emptyLog: "Bu sessiyada hali tayyorlangan harakat yo'q.",
    sourcesTitle: "Taksi server manbalari",
    languageTitle: "Tillar",
    languageBody: "Ko'rinadigan matn toza RU / EN / UZ / ZH bo'lishi kerak. Texnik ID, route, backend path va JSON tarjima qilinmaydi.",
    restoreTitle: "Tiklangan qamrov",
    restoreBody: "Arizalar, tasdiqlar, haydovchilar, avtomobillar, buyurtmalar, yuborish, safarlar, shikoyatlar, dalillar, balans, hisob-kitob, tariflar, komissiyalar, bonuslar, arxiv, tekshiruv, rollar, egasining Sabi sunʼiy intellekti va hisobotlar.",
  },
  zh: {
    title: "出租车：完整控制中心",
    subtitle: "出租车基础的全部功能已回到管理后台：申请、审批、司机、车辆、订单、行程、投诉、余额、费率、归档、报告和所有者萨比智能，且不改变设计。",
    stage: "步骤 15 · 完整恢复",
    noFake: "不做虚假成功：界面只准备审核和仅服务器包。最终执行只能由服务器在访问规则、审计和必要的所有者命令之后完成。",
    tabOverview: "总览",
    tabApplications: "申请",
    tabFleet: "司机和车辆",
    tabOperations: "订单和行程",
    tabComplaints: "投诉",
    tabBalance: "余额",
    tabTariffs: "费率",
    tabArchive: "归档",
    tabReports: "报告",
    tabAiAccess: "萨比智能 / 访问",
    metricFoundation: "出租车基础",
    metricFunctions: "功能",
    metricOwnerAi: "egasining Sabi sunʼiy intellekti",
    metricNoFake: "No soxta",
    metricValueFoundation: "100%",
    metricValueFunctions: "14 区域",
    metricValueOwnerAi: "控制",
    metricValueNoFake: "backend-only",
    foundationTitle: "出租车基础中的全部功能",
    foundationNote: "没有删除任何内容：每个模块独立显示，包含检查、人工控制、路线合约和归档。",
    selectedTitle: "人工控制面板",
    selectedEmpty: "在左侧选择功能。经理准备审核，所有者萨比智能监督，最终动作等待服务器或所有者。",
    checklist: "检查",
    actions: "可用操作",
    route: "Backend route / contract",
    reason: "经理原因 / 备注",
    ownerCommand: "所有者命令 / 所有者批准编号",
    prepare: "准备仅服务器包",
    cannotExecute: "不得独立执行",
    aiTitle: "所有者萨比智能监督整个流程",
    aiBody: "萨比智能位于所有者之下、员工之上。它检查申请、文件、余额、投诉、经理、开发者和会计工作，向所有者报告并等待命令。",
    accessTitle: "访问矩阵",
    ownerAccess: "所有者：100% 访问和最终决定。",
    aiAccess: "所有者萨比智能：100% 监督，但不能独立执行。",
    deputyAccess: "副手：最高 80%，员工和访问控制，没有最终财务决定权。",
    staffAccess: "员工：仅按职责 10–50%，不能独立做最终决定。",
    taxiManagerAccess: "出租车经理：仅出租车页面、申请、文件、车辆、投诉、余额、活动和归档。",
    financeGate: "财务、付费接入、服务商、支付、付款和最终决定只由所有者批准。",
    archiveTitle: "审核归档",
    archiveBody: "每个申请和动作都必须有轨迹：谁审核、检查内容、文件、照片、车辆、原因、服务器响应、萨比智能标记和所有者命令。",
    dailyReport: "每日所有者报告",
    dailyBody: "萨比智能收集违规、跳过审核、弱申请、投诉、余额和员工动作，并向所有者报告。",
    logTitle: "已准备动作日志",
    emptyLog: "本会话还没有准备动作。",
    sourcesTitle: "出租车服务器来源",
    languageTitle: "语言",
    languageBody: "可见文案必须保持纯净的俄语、英语、乌兹别克语和中文。技术编号、路线、服务器路径和原始格式不翻译。",
    restoreTitle: "恢复范围",
    restoreBody: "申请、审批、司机、车辆、订单、调度、行程、投诉、证据、余额、结算、费率、佣金、奖金、归档、审计、角色、所有者萨比智能和报告。",
  },
};

const AREA_TABS007R: Array<{ key: AreaKey007R; labelKey: string }> = [
  { key: "overview", labelKey: "tabOverview" },
  { key: "applications", labelKey: "tabApplications" },
  { key: "fleet", labelKey: "tabFleet" },
  { key: "operations", labelKey: "tabOperations" },
  { key: "complaints", labelKey: "tabComplaints" },
  { key: "balance", labelKey: "tabBalance" },
  { key: "tariffs", labelKey: "tabTariffs" },
  { key: "archive", labelKey: "tabArchive" },
  { key: "reports", labelKey: "tabReports" },
  { key: "aiAccess", labelKey: "tabAiAccess" },
];

function functionMap007R(language: AdminLanguage): Function007R[] {
  if (language === "en") return [
    { key: "driverApplicationDossier", area: "applications", tone: "ready", title: "Driver application dossier", desc: "Full review of a new Taxi driver application with identity, KYC, driver data, vehicle data, documents and photos.", checks: ["application ID", "driver identity", "KYC status", "driver photo", "license", "vehicle data", "insurance", "registration", "safety risk"], actions: ["open dossier", "request missing documents", "prepare approve", "prepare reject", "send to archive"], route: "/api/taxi/.../driver-application/*", ownerGate: true },
    { key: "driverProfile", area: "fleet", tone: "info", title: "Driver profile control", desc: "Review, activate, suspend, block, restore and dispatch access preparation for Taxi drivers.", checks: ["profile status", "risk status", "complaint history", "dispatch access", "balance status"], actions: ["prepare activate", "prepare suspend", "prepare restore", "prepare block", "request owner command"], route: "/api/taxi/.../driver-profile/*", ownerGate: true },
    { key: "vehicleManagement", area: "fleet", tone: "info", title: "Vehicle management", desc: "Vehicle approval, rejection, assignment, revocation and document expiry control.", checks: ["plate", "model", "color", "category", "insurance", "registration", "vehicle photos", "driver match"], actions: ["prepare approve vehicle", "prepare reject vehicle", "prepare assign", "prepare revoke"], route: "/api/taxi/.../vehicle/*" },
    { key: "riderRequests", area: "operations", tone: "warn", title: "Orders / rider requests", desc: "Monitor new orders, quotes, cancellations, no-driver states and rider issues.", checks: ["request ID", "rider", "pickup", "destination", "tariff", "region", "cancel reason"], actions: ["review request", "prepare cancel", "send to dispatch", "flag issue"], route: "/api/taxi/.../request/*" },
    { key: "dispatchControl", area: "operations", tone: "info", title: "Dispatch control", desc: "Offer creation, expiration, reassignment, rejection and driver availability control.", checks: ["available drivers", "offer state", "distance", "driver risk", "route status"], actions: ["prepare offer", "prepare reassign", "prepare expire", "prepare reject"], route: "/api/taxi/.../dispatch/*" },
    { key: "tripLifecycle", area: "operations", tone: "warn", title: "Trip lifecycle", desc: "Arrived, picked-up, started, completed, cancelled and safety flag control.", checks: ["trip ID", "driver", "rider", "status", "amount", "route", "safety flag"], actions: ["prepare arrived", "prepare picked-up", "prepare start", "prepare complete", "prepare cancel", "flag safety"], route: "/api/taxi/.../trip/*", ownerGate: true },
    { key: "complaintCenter", area: "complaints", tone: "danger", title: "Complaint review center", desc: "Complaint intake, evidence, trip context, driver/rider history, AI risk and resolution workflow.", checks: ["complaint ID", "trip context", "evidence", "media", "severity", "AI recommendation", "staff note"], actions: ["assign", "escalate", "prepare resolve", "prepare penalty", "request owner command"], route: "/api/taxi/.../complaint/*", ownerGate: true },
    { key: "balanceAccounting", area: "balance", tone: "locked", title: "Driver balance / accounting", desc: "Driver balance, reserve, pending, available, hold, settlement, commission and reward boundary.", checks: ["driver balance", "reserve", "pending", "available", "hold", "settlement", "commission", "wallet boundary"], actions: ["review balance", "prepare freeze", "prepare release", "prepare settlement review", "owner-only finance gate"], route: "/api/taxi/.../settlement/*", ownerGate: true },
    { key: "tariffRegionCommission", area: "tariffs", tone: "info", title: "Tariffs / regions / commissions", desc: "Regions, zones, tariff rules, commission rules, activation, suspension and audit history.", checks: ["region", "zone", "tariff", "commission", "history", "risk", "owner finance gate"], actions: ["prepare upsert", "prepare activate", "prepare suspend", "request owner command"], route: "/api/taxi/.../tariff/*", ownerGate: true },
    { key: "giftsRewards", area: "balance", tone: "warn", title: "Gifts / rewards / bonuses", desc: "Taxi rewards, tips, bonuses, prize activities, freeze/release and owner approval boundary.", checks: ["reward ID", "driver", "source", "amount", "risk", "legal", "owner command"], actions: ["prepare freeze", "prepare release", "archive evidence", "request owner command"], route: "/api/taxi/.../reward/*", ownerGate: true },
    { key: "archiveTrail", area: "archive", tone: "ready", title: "Archive and evidence vault", desc: "Store application, documents, photos, vehicle data, reason, backend response, staff identity and Sabi AI mark.", checks: ["reviewer", "documents", "photos", "reason", "backend response", "AI mark", "owner command"], actions: ["prepare archive", "attach evidence", "open audit trail", "report to owner"], route: "/api/taxi/.../archive/*" },
    { key: "reportsReadiness", area: "reports", tone: "ready", title: "Reports / readiness / diagnostics", desc: "Readiness, route diagnostics, DB dry-run, provider-wallet boundary, growth, complaints and staff accountability reports.", checks: ["readiness", "routes", "diagnostics", "DB dry-run", "provider boundary", "staff actions"], actions: ["refresh report", "open diagnostics", "prepare daily report", "send to Owner Sabi AI"], route: "/api/taxi/002n|002t|002x|003d|003h/*" },
    { key: "ownerSabiAiControl", area: "aiAccess", tone: "locked", title: "Owner Sabi AI control", desc: "Global controller below Owner and above staff. It monitors, reports and waits for Owner command.", checks: ["Owner is final authority", "AI does not self-execute", "staff access scoped", "daily report", "urgent warning"], actions: ["prepare owner report", "create warning draft", "wait for Owner command", "audit staff"], route: "/api/admin/owner-sabi-ai/*", ownerGate: true },
    { key: "staffAccess", area: "aiAccess", tone: "locked", title: "Staff access gate", desc: "Taxi manager only Taxi; accountant finance reports; developer technical integrations; deputy staff/access control; final decisions Owner-only.", checks: ["role", "screen scope", "function scope", "owner finance gate", "audit"], actions: ["prepare role gate", "review staff access", "request backend/session enforcement"], route: "/api/admin/staff-access/*", ownerGate: true },
  ];

  if (language === "uz") return [
    { key: "driverApplicationDossier", area: "applications", tone: "ready", title: "Haydovchi ariza dosyesi", desc: "Yangi taksi haydovchisi arizasini to‘liq tekshirish: shaxs, tekshiruv holati, haydovchi ma’lumoti, avtomobil, hujjatlar va rasmlar.", checks: ["ariza ID", "haydovchi shaxsi", "KYC holati", "haydovchi rasmi", "guvohnoma", "avtomobil ma’lumoti", "sug'urta", "ro'yxat", "xavfsizlik riski"], actions: ["dosye ochish", "hujjat so'rash", "tasdiq tayyorlash", "rad tayyorlash", "arxivga yuborish"], route: "/api/taxi/.../driver-application/*", ownerGate: true },
    { key: "driverProfile", area: "fleet", tone: "info", title: "Haydovchi profili", desc: "Taxi haydovchisini tekshirish, faollashtirish, to'xtatish, bloklash, tiklash va dispatch ruxsatini tayyorlash.", checks: ["profil holati", "risk holati", "shikoyat tarixi", "dispatch ruxsati", "balans holati"], actions: ["activate tayyorlash", "suspend tayyorlash", "restore tayyorlash", "block tayyorlash", "Owner buyrug'i"], route: "/api/taxi/.../driver-profile/*", ownerGate: true },
    { key: "vehicleManagement", area: "fleet", tone: "info", title: "Auto boshqaruvi", desc: "Auto tasdiqlash, rad etish, biriktirish, bekor qilish va hujjat muddati nazorati.", checks: ["raqam", "model", "rang", "kategoriya", "sug'urta", "ro'yxat", "auto rasmlar", "haydovchi mosligi"], actions: ["auto approve tayyorlash", "auto reject tayyorlash", "assign tayyorlash", "revoke tayyorlash"], route: "/api/taxi/.../vehicle/*" },
    { key: "riderRequests", area: "operations", tone: "warn", title: "Buyurtmalar / so'rovlar", desc: "Yangi buyurtma, quote, bekor qilish, haydovchi yo'q holati va rider muammolari nazorati.", checks: ["request ID", "rider", "pickup", "destination", "tarif", "region", "cancel reason"], actions: ["so'rovni ko'rish", "cancel tayyorlash", "dispatchga yuborish", "muammoni belgilash"], route: "/api/taxi/.../request/*" },
    { key: "dispatchControl", area: "operations", tone: "info", title: "Dispatch nazorati", desc: "Offer yaratish, tugatish, qayta tayinlash, rad etish va haydovchi mavjudligi nazorati.", checks: ["mavjud haydovchilar", "offer holati", "masofa", "haydovchi riski", "route holati"], actions: ["offer tayyorlash", "reassign tayyorlash", "expire tayyorlash", "reject tayyorlash"], route: "/api/taxi/.../dispatch/*" },
    { key: "tripLifecycle", area: "operations", tone: "warn", title: "Safar lifecycle", desc: "Yetib keldi, yo'lovchi o'tirdi, boshlandi, tugadi, bekor qilindi va safety flag nazorati.", checks: ["trip ID", "haydovchi", "rider", "status", "summa", "route", "safety flag"], actions: ["arrived tayyorlash", "picked-up tayyorlash", "start tayyorlash", "complete tayyorlash", "cancel tayyorlash", "safety belgilash"], route: "/api/taxi/.../trip/*", ownerGate: true },
    { key: "complaintCenter", area: "complaints", tone: "danger", title: "Shikoyat markazi", desc: "Shikoyat qabul qilish, evidence, trip konteksti, haydovchi/rider tarixi, AI risk va yechim flow.", checks: ["complaint ID", "trip konteksti", "evidence", "media", "severity", "AI tavsiya", "xodim izohi"], actions: ["assign", "escalate", "resolve tayyorlash", "penalty tayyorlash", "Owner buyrug'i"], route: "/api/taxi/.../complaint/*", ownerGate: true },
    { key: "balanceAccounting", area: "balance", tone: "locked", title: "Haydovchi balansi / accounting", desc: "Balans, reserve, pending, available, hold, settlement, commission va reward boundary.", checks: ["haydovchi balansi", "reserve", "pending", "available", "hold", "settlement", "commission", "wallet boundary"], actions: ["balans tekshirish", "freeze tayyorlash", "release tayyorlash", "settlement review", "Owner-only finance gate"], route: "/api/taxi/.../settlement/*", ownerGate: true },
    { key: "tariffRegionCommission", area: "tariffs", tone: "info", title: "Tarif / region / komissiya", desc: "Region, zona, tarif qoidalari, komissiya, aktivlash, to'xtatish va audit tarixi.", checks: ["region", "zona", "tarif", "komissiya", "tarix", "risk", "Owner finance gate"], actions: ["upsert tayyorlash", "activate tayyorlash", "suspend tayyorlash", "Owner buyrug'i"], route: "/api/taxi/.../tariff/*", ownerGate: true },
    { key: "giftsRewards", area: "balance", tone: "warn", title: "Sovg'a / reward / bonus", desc: "Taxi reward, tip, bonus, sovrinli tadbir, freeze/release va Owner approval boundary.", checks: ["reward ID", "haydovchi", "manba", "summa", "risk", "legal", "Owner buyrug'i"], actions: ["freeze tayyorlash", "release tayyorlash", "evidence arxiv", "Owner buyrug'i"], route: "/api/taxi/.../reward/*", ownerGate: true },
    { key: "archiveTrail", area: "archive", tone: "ready", title: "Arxiv va evidence vault", desc: "Ariza, hujjat, rasm, avtomobil ma’lumoti, sabab, backend javobi, xodim va Sabi AI belgisini saqlash.", checks: ["tekshiruvchi", "hujjatlar", "rasmlar", "sabab", "backend javobi", "AI belgisi", "Owner buyrug'i"], actions: ["arxiv tayyorlash", "evidence biriktirish", "audit trail ochish", "Owner ga hisobot"], route: "/api/taxi/.../archive/*" },
    { key: "reportsReadiness", area: "reports", tone: "ready", title: "Hisobot / readiness / diagnostika", desc: "Readiness, route diagnostics, DB dry-run, provider-wallet boundary, growth, shikoyatlar va staff accountability reports.", checks: ["readiness", "routes", "diagnostics", "DB dry-run", "provider boundary", "xodim harakati"], actions: ["report yangilash", "diagnostics ochish", "daily report tayyorlash", "Owner Sabi AI ga yuborish"], route: "/api/taxi/002n|002t|002x|003d|003h/*" },
    { key: "ownerSabiAiControl", area: "aiAccess", tone: "locked", title: "Owner Sabi AI nazorati", desc: "Owner dan pastda va xodimlardan yuqorida global controller. Kuzatadi, hisobot beradi va Owner buyrug'ini kutadi.", checks: ["Owner final authority", "AI self-execute qilmaydi", "staff access scoped", "daily report", "urgent warning"], actions: ["owner report", "warning draft", "Owner buyrug'ini kutish", "staff audit"], route: "/api/admin/owner-sabi-ai/*", ownerGate: true },
    { key: "staffAccess", area: "aiAccess", tone: "locked", title: "Staff access gate", desc: "Taxi manager faqat Taxi; accountant finance reports; developer technical integrations; deputy staff/access control; final decisions Owner-only.", checks: ["role", "screen scope", "function scope", "owner finance gate", "audit"], actions: ["role gate tayyorlash", "staff access review", "backend/session enforcement so'rash"], route: "/api/admin/staff-access/*", ownerGate: true },
  ];

  if (language === "zh") return [
    { key: "driverApplicationDossier", area: "applications", tone: "ready", title: "司机申请档案", desc: "完整审核新出租车司机申请：身份、验证状态、司机数据、车辆数据、文件和照片。", checks: ["申请 ID", "司机身份", "KYC 状态", "司机照片", "驾驶证", "车辆数据", "保险", "注册", "安全风险"], actions: ["打开档案", "请求缺失文件", "准备批准", "准备拒绝", "发送归档"], route: "/api/taxi/.../driver-application/*", ownerGate: true },
    { key: "driverProfile", area: "fleet", tone: "info", title: "司机资料控制", desc: "审核、启用、暂停、封锁、恢复出租车司机和调度访问准备。", checks: ["资料状态", "风险状态", "投诉历史", "调度访问", "余额状态"], actions: ["准备启用", "准备暂停", "准备恢复", "准备封锁", "请求所有者命令"], route: "/api/taxi/.../driver-profile/*", ownerGate: true },
    { key: "vehicleManagement", area: "fleet", tone: "info", title: "车辆管理", desc: "车辆批准、拒绝、分配、撤销和文件过期控制。", checks: ["车牌", "型号", "颜色", "类别", "保险", "注册", "车辆照片", "司机匹配"], actions: ["准备批准车辆", "准备拒绝车辆", "准备分配", "准备撤销"], route: "/api/taxi/.../vehicle/*" },
    { key: "riderRequests", area: "operations", tone: "warn", title: "订单 / 乘客请求", desc: "监控新订单、报价、取消、无司机状态和乘客问题。", checks: ["请求 ID", "乘客", "上车点", "目的地", "费率", "区域", "取消原因"], actions: ["审核请求", "准备取消", "发送调度", "标记问题"], route: "/api/taxi/.../request/*" },
    { key: "dispatchControl", area: "operations", tone: "info", title: "调度控制", desc: "控制派单提议创建、过期、重新分配、拒绝和司机可用性。", checks: ["可用司机", "offer 状态", "距离", "司机风险", "route 状态"], actions: ["准备 offer", "准备重新分配", "准备过期处理", "准备拒绝"], route: "/api/taxi/.../dispatch/*" },
    { key: "tripLifecycle", area: "operations", tone: "warn", title: "行程生命周期", desc: "到达、乘客上车、开始、完成、取消和安全标记控制。", checks: ["trip ID", "司机", "乘客", "状态", "金额", "route", "safety flag"], actions: ["准备到达", "准备乘客上车", "准备 start", "准备完成", "准备取消", "标记安全"], route: "/api/taxi/.../trip/*", ownerGate: true },
    { key: "complaintCenter", area: "complaints", tone: "danger", title: "投诉审核中心", desc: "投诉接入、证据、行程上下文、司机和乘客历史、智能风险和解决流程。", checks: ["complaint ID", "trip 上下文", "evidence", "media", "severity", "AI 建议", "员工备注"], actions: ["assign", "escalate", "准备解决", "准备处罚", "请求所有者命令"], route: "/api/taxi/.../complaint/*", ownerGate: true },
    { key: "balanceAccounting", area: "balance", tone: "locked", title: "司机余额 / 会计", desc: "司机余额、储备、待处理、可用、扣留、结算、佣金和奖励边界。", checks: ["司机余额", "reserve", "pending", "available", "hold", "settlement", "commission", "wallet boundary"], actions: ["审核余额", "准备冻结", "准备释放", "准备结算审核", "Owner-only finance gate"], route: "/api/taxi/.../settlement/*", ownerGate: true },
    { key: "tariffRegionCommission", area: "tariffs", tone: "info", title: "费率 / 区域 / 佣金", desc: "区域、区块、费率规则、佣金规则、启用、暂停和审计历史。", checks: ["区域", "区块", "费率", "佣金", "历史", "风险", "Owner finance gate"], actions: ["准备保存或更新", "准备启用", "准备暂停", "请求所有者命令"], route: "/api/taxi/.../tariff/*", ownerGate: true },
    { key: "giftsRewards", area: "balance", tone: "warn", title: "礼物 / 奖励 / 奖金", desc: "出租车奖励、小费、奖金、奖励活动、冻结或释放和所有者审批边界。", checks: ["reward ID", "司机", "来源", "金额", "风险", "legal", "Owner 命令"], actions: ["准备冻结", "准备释放", "归档证据", "请求所有者命令"], route: "/api/taxi/.../reward/*", ownerGate: true },
    { key: "archiveTrail", area: "archive", tone: "ready", title: "归档和证据库", desc: "保存申请、文件、照片、车辆数据、原因、服务器响应、员工身份和萨比智能标记。", checks: ["审核人", "文件", "照片", "原因", "backend response", "AI 标记", "Owner 命令"], actions: ["准备归档", "附加证据", "打开审计轨迹", "报告给所有者"], route: "/api/taxi/.../archive/*" },
    { key: "reportsReadiness", area: "reports", tone: "ready", title: "报告 / 就绪状态 / 诊断", desc: "就绪状态、路线诊断、数据库试运行、服务商与钱包边界、增长、投诉和员工责任报告。", checks: ["readiness", "routes", "diagnostics", "DB dry-run", "provider boundary", "员工动作"], actions: ["刷新报告", "打开诊断", "准备每日报告", "发送给所有者萨比智能"], route: "/api/taxi/002n|002t|002x|003d|003h/*" },
    { key: "ownerSabiAiControl", area: "aiAccess", tone: "locked", title: "所有者萨比智能控制", desc: "位于所有者之下、员工之上的全局控制者。它监控、报告并等待所有者命令。", checks: ["所有者最终权力", "智能系统不自行执行", "staff access scoped", "daily report", "urgent warning"], actions: ["准备所有者报告", "创建警告草稿", "等待所有者命令", "audit staff"], route: "/api/admin/owner-sabi-ai/*", ownerGate: true },
    { key: "staffAccess", area: "aiAccess", tone: "locked", title: "Staff access gate", desc: "出租车经理仅限出租车；会计负责财务报告；开发人员负责技术集成；副手负责员工和访问控制；最终决定仅由所有者执行。", checks: ["role", "screen scope", "function scope", "owner finance gate", "audit"], actions: ["准备角色关口", "review staff access", "请求服务器会话强制执行"], route: "/api/admin/staff-access/*", ownerGate: true },
  ];

  return [
    { key: "driverApplicationDossier", area: "applications", tone: "ready", title: "Досье заявки таксиста", desc: "Полная проверка новой заявки: личность, статус проверки, данные водителя, авто, документы и фото.", checks: ["Номер заявки", "личность водителя", "Статус проверки личности", "фото водителя", "права", "данные авто", "страховка", "регистрация", "риск безопасности"], actions: ["открыть досье", "запросить документы", "подготовить одобрение", "подготовить отказ", "передать в архив"], route: "/api/taxi/.../driver-application/*", ownerGate: true },
    { key: "driverProfile", area: "fleet", tone: "info", title: "Управление водителем", desc: "Проверка, активация, остановка, блокировка, восстановление и доступ к заказам для таксиста.", checks: ["статус профиля", "риск", "история жалоб", "доступ к диспетчеризации", "баланс"], actions: ["подготовить активацию", "подготовить остановку", "подготовить восстановление", "подготовить блокировку", "запросить команду владельца"], route: "/api/taxi/.../driver-profile/*", ownerGate: true },
    { key: "vehicleManagement", area: "fleet", tone: "info", title: "Управление авто", desc: "Одобрение, отказ, назначение, отзыв и контроль срока документов автомобиля.", checks: ["госномер", "модель", "цвет", "категория", "страховка", "регистрация", "фото авто", "совпадение с водителем"], actions: ["подготовить одобрение авто", "подготовить отказ авто", "подготовить назначение", "подготовить отзыв"], route: "/api/taxi/.../vehicle/*" },
    { key: "riderRequests", area: "operations", tone: "warn", title: "Заказы / заявки пассажира", desc: "Новые заказы, расчёт цены, отмены, нет водителя и проблемы пассажира.", checks: ["Номер заказа", "пассажир", "откуда", "куда", "тариф", "регион", "причина отмены"], actions: ["изучить заказ", "подготовить отмену", "передать в диспетчеризацию", "поставить флаг проблемы"], route: "/api/taxi/.../request/*" },
    { key: "dispatchControl", area: "operations", tone: "info", title: "Диспетчеризация", desc: "Создание предложения, истечение, переназначение, отказ и контроль доступных водителей.", checks: ["доступные водители", "статус предложения", "дистанция", "риск водителя", "статус маршрута"], actions: ["подготовить предложение", "подготовить переназначение", "подготовить истечение", "подготовить отказ"], route: "/api/taxi/.../dispatch/*" },
    { key: "tripLifecycle", area: "operations", tone: "warn", title: "Жизненный цикл поездки", desc: "Прибыл, пассажир сел, началась, завершилась, отменена и флаг безопасности.", checks: ["Номер поездки", "водитель", "пассажир", "статус", "сумма", "маршрут", "safety flag"], actions: ["подготовить прибыл", "подготовить пассажир сел", "подготовить старт", "подготовить завершение", "подготовить отмену", "поставить флаг безопасности"], route: "/api/taxi/.../trip/*", ownerGate: true },
    { key: "complaintCenter", area: "complaints", tone: "danger", title: "Центр жалоб", desc: "Приём жалобы, доказательства, контекст поездки, история водителя и пассажира, риск ИИ и отработка.", checks: ["Номер жалобы", "контекст поездки", "evidence", "медиа", "severity", "Рекомендация ИИ", "заметка сотрудника"], actions: ["назначить", "эскалировать", "подготовить закрытие", "подготовить штраф", "запросить команду владельца"], route: "/api/taxi/.../complaint/*", ownerGate: true },
    { key: "balanceAccounting", area: "balance", tone: "locked", title: "Баланс таксиста / учёт", desc: "Баланс, резерв, ожидание, доступно, удержание, расчёт, комиссия и граница награды.", checks: ["баланс водителя", "резерв", "pending", "available", "hold", "settlement", "комиссия", "wallet boundary"], actions: ["проверить баланс", "подготовить заморозку", "подготовить разблокировку", "подготовить проверку расчёта", "owner-only finance gate"], route: "/api/taxi/.../settlement/*", ownerGate: true },
    { key: "tariffRegionCommission", area: "tariffs", tone: "info", title: "Тарифы / регионы / комиссии", desc: "Регионы, зоны, правила тарифа, комиссии, активация, остановка и история аудита.", checks: ["регион", "зона", "тариф", "комиссия", "история", "риск", "owner finance gate"], actions: ["подготовить сохранение или обновление", "подготовить активацию", "подготовить остановку", "запросить команду владельца"], route: "/api/taxi/.../tariff/*", ownerGate: true },
    { key: "giftsRewards", area: "balance", tone: "warn", title: "Подарки / бонусы / мероприятия", desc: "Награды такси, чаевые, бонусы, призовые мероприятия, заморозка или разблокировка и граница одобрения владельца.", checks: ["reward ID", "водитель", "источник", "сумма", "риск", "legal", "команда владельца"], actions: ["подготовить заморозку", "подготовить разблокировку", "архивировать доказательства", "запросить команду владельца"], route: "/api/taxi/.../reward/*", ownerGate: true },
    { key: "archiveTrail", area: "archive", tone: "ready", title: "Архив и хранилище доказательств", desc: "Сохранение заявки, документов, фото, данных авто, причины, ответа сервера, сотрудника и отметки Саби ИИ.", checks: ["кто проверял", "документы", "фото", "причина", "backend response", "Отметка ИИ", "команда владельца"], actions: ["подготовить архив", "прикрепить доказательства", "открыть след аудита", "доложить владельцу"], route: "/api/taxi/.../archive/*" },
    { key: "reportsReadiness", area: "reports", tone: "ready", title: "Отчёты / готовность / диагностика", desc: "Готовность, диагностика маршрутов, пробная проверка базы данных, граница провайдера и кошелька, рост, жалобы и отчёты ответственности сотрудников.", checks: ["readiness", "routes", "diagnostics", "DB dry-run", "provider boundary", "действия сотрудников"], actions: ["обновить отчёт", "открыть диагностику", "подготовить ежедневный отчёт", "передать Саби ИИ владельца"], route: "/api/taxi/002n|002t|002x|003d|003h/*" },
    { key: "ownerSabiAiControl", area: "aiAccess", tone: "locked", title: "Контроль Саби ИИ владельца", desc: "Глобальный контролёр ниже владельца и выше сотрудников. Мониторит, докладывает и ждёт команду владельца.", checks: ["владелец финальный", "ИИ не выполняет сам", "доступы по ролям", "ежедневный отчёт", "срочное предупреждение"], actions: ["подготовить доклад", "создать предупреждение", "ждать команду владельца", "проверить сотрудников"], route: "/api/admin/owner-sabi-ai/*", ownerGate: true },
    { key: "staffAccess", area: "aiAccess", tone: "locked", title: "Staff access gate", desc: "Менеджер такси только такси; бухгалтер — отчёты; разработчик — технические подключения; зам — доступы; финальные решения только владелец.", checks: ["роль", "экран", "функция", "owner finance gate", "audit"], actions: ["подготовить шлюз роли", "проверить доступ", "запросить серверное применение роли сессии"], route: "/api/admin/staff-access/*", ownerGate: true },
  ];
}

export function TaxiAdminControl007RPanel({ language, config, setNotice }: Props007R) {
  const copy = COPY007R[language] || COPY007R.ru;
  const functions = useMemo(() => functionMap007R(language), [language]);
  const [activeArea, setActiveArea] = useState<AreaKey007R>("overview");
  const [selectedKey, setSelectedKey] = useState(functions[0]?.key || "driverApplicationDossier");
  const [reason, setReason] = useState("");
  const [ownerCommand, setOwnerCommand] = useState("");
  const [log, setLog] = useState<AuditItem007R[]>([]);
  const selected = functions.find((item) => item.key === selectedKey) || functions[0];
  const visible = activeArea === "overview" ? functions : functions.filter((item) => item.area === activeArea || (activeArea === "balance" && item.key === "giftsRewards"));
  const metrics = [
    [copy.metricFoundation, copy.metricValueFoundation, copy.restoreTitle],
    [copy.metricFunctions, copy.metricValueFunctions, copy.foundationTitle],
    [copy.metricOwnerAi, copy.metricValueOwnerAi, copy.aiTitle],
    [copy.metricNoFake, copy.metricValueNoFake, copy.noFake],
  ];
  const sourceRows = ["/api/taxi/002n/readiness", "/api/taxi/002n/routes", "/api/admin/taxi/002n/diagnostics", "/api/taxi/002t/read-only-db-dry-run", "/api/taxi/002x/db-write-runtime/write-gate", "/api/taxi/003d/provider-wallet-boundary/check", "/api/taxi/003h/admin-readiness-cockpit/check"];
  const canPrepare = Boolean(selected) && reason.trim().length >= 8 && (!selected.ownerGate || ownerCommand.trim().length >= 3);
  const prepare = () => {
    if (!selected || !canPrepare) {
      setNotice(copy.cannotExecute);
      return;
    }
    const item: AuditItem007R = { id: `${selected.key}-${Date.now()}`, title: selected.title, area: selected.area, status: "prepared_backend_only_no_fake", ownerCommand: ownerCommand.trim() || "not_required", at: new Date().toISOString() };
    setLog((prev) => [item, ...prev].slice(0, 8));
    setNotice(`${selected.title}: ${copy.prepare}`);
  };

  return (
    <section className="messengerStyle007B" data-admin-ui-taxi-007r-full-foundation="ready" data-admin-ui-taxi-007r-messenger-style="ready" data-admin-ui-taxi-007r-no-fake-success="ready">
      <div className="ms007b-hero">
        <div>
          <span className="ms007b-kicker">{copy.stage}</span>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        <div className="ms007b-heroBadges">
          <span>{MARKER007R}</span>
          <span>{config.baseUrl}</span>
          <span>RU / EN / UZ / ZH</span>
        </div>
      </div>

      <div className="ms007b-alert">{copy.noFake}</div>

      <div className="ms007b-tabs" data-admin-ui-taxi-007r-all-tabs="ready">
        {AREA_TABS007R.map((tab) => <button key={tab.key} className={activeArea === tab.key ? "active" : ""} type="button" onClick={() => setActiveArea(tab.key)}>{copy[tab.labelKey]}</button>)}
      </div>

      <div className="ms007b-metrics" data-admin-ui-taxi-007r-foundation-metrics="ready">
        {metrics.map(([label, value, detail]) => <div className="ms007b-metric" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}
      </div>

      <div className="ms007b-grid" data-admin-ui-taxi-007r-full-controls="ready">
        <div className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.foundationTitle}</h2><span>{visible.length}/{functions.length}</span></div>
          <p className="ms007b-note">{copy.foundationNote}</p>
          <div className="ms007b-functions">
            {visible.map((item) => (
              <article className={`ms007b-function ms007b-tone-${item.tone}`} key={item.key} data-admin-ui-taxi-007r-control={item.key}>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                <div className="ms007b-checks"><strong>{copy.checklist}</strong>{item.checks.slice(0, 7).map((check) => <span key={check}>✓ {check}</span>)}</div>
                <div className="ms007b-actions"><strong>{copy.actions}</strong>{item.actions.slice(0, 4).map((action) => <button key={action} type="button" onClick={() => { setSelectedKey(item.key); setActiveArea(item.area); }}>{action}</button>)}</div>
              </article>
            ))}
          </div>
        </div>

        <aside className="ms007b-sideCard" data-admin-ui-taxi-007r-manual-control="ready" data-admin-ui-taxi-007r-backend-only="ready">
          <h2>{copy.selectedTitle}</h2>
          {selected ? <>
            <p className="ms007b-note">{selected.desc}</p>
            <div className="ms007b-checks"><strong>{copy.checklist}</strong>{selected.checks.map((check) => <span key={check}>✓ {check}</span>)}</div>
            <label><span>{copy.reason}</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder={copy.reason} /></label>
            <label><span>{copy.ownerCommand}</span><input value={ownerCommand} onChange={(event) => setOwnerCommand(event.target.value)} placeholder={selected.ownerGate ? copy.ownerCommand : "optional"} /></label>
            <div className="ms007b-statusOk">{copy.route}: {selected.route}</div>
            <div className="ms007b-actions"><button type="button" disabled={!canPrepare} onClick={prepare}>{canPrepare ? copy.prepare : copy.cannotExecute}</button></div>
          </> : <p>{copy.selectedEmpty}</p>}
        </aside>
      </div>

      <div className="ms007b-grid two" data-admin-ui-taxi-007r-owner-ai-access="ready">
        <div className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.aiTitle}</h2><span>Owner AI</span></div>
          <p className="ms007b-note">{copy.aiBody}</p>
          <div className="ms007b-reportList">
            {[copy.ownerAccess, copy.aiAccess, copy.deputyAccess, copy.staffAccess, copy.taxiManagerAccess, copy.financeGate].map((row, index) => <div key={row}><span>{row}</span><b style={{ width: `${100 - index * 10}%` }} /></div>)}
          </div>
        </div>
        <div className="ms007b-mainCard" data-admin-ui-taxi-007r-archive="ready">
          <div className="ms007b-sectionTitle"><h2>{copy.archiveTitle}</h2><span>{copy.dailyReport}</span></div>
          <p className="ms007b-note">{copy.archiveBody}</p>
          <p className="ms007b-note">{copy.dailyBody}</p>
          <div className="ms007b-reportList">
            {sourceRows.map((row, index) => <div key={row}><span>{row}</span><b style={{ width: `${72 - index * 6}%` }} /></div>)}
          </div>
        </div>
      </div>

      <div className="ms007b-grid two" data-admin-ui-taxi-007r-reports-sources="ready">
        <div className="ms007b-mainCard">
          <div className="ms007b-sectionTitle"><h2>{copy.restoreTitle}</h2><span>Taxi foundation</span></div>
          <p className="ms007b-note">{copy.restoreBody}</p>
          <div className="ms007b-reportList">
            {functions.map((item, index) => <div key={item.key}><span>{item.title}</span><b style={{ width: `${Math.max(28, 100 - index * 4)}%` }} /></div>)}
          </div>
        </div>
        <div className="ms007b-mainCard" data-admin-ui-taxi-007r-action-log="ready">
          <div className="ms007b-sectionTitle"><h2>{copy.logTitle}</h2><span>{log.length}</span></div>
          {log.length ? <div className="ms007b-reportList">{log.map((item) => <div key={item.id}><span>{item.title} · {item.status} · {item.ownerCommand}</span><b style={{ width: "88%" }} /></div>)}</div> : <div className="ms007b-statusBad">{copy.emptyLog}</div>}
          <div className="ms007b-statusOk">{copy.languageTitle}: {copy.languageBody}</div>
        </div>
      </div>
    </section>
  );
}
