import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007HPanel } from "./TaxiAdminControl007H";

type JsonRecord007I = Record<string, unknown>;
type QueueKey007I = "applications" | "drivers" | "vehicles" | "orders" | "trips" | "complaints" | "balance" | "tariffs" | "gifts" | "reports";
type WorkTab007I = "applications" | "complaints" | "accounting" | "fleet" | "operations" | "reports";
type Method007I = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type Tone007I = "ready" | "warn" | "locked" | "danger" | "info";

type Source007I = { key: string; titleKey: string; path: string; method: Method007I; body?: JsonRecord007I };
type BackendResult007I = { key: string; titleKey: string; path: string; method: Method007I; ok: boolean; status: number; message: string; payload: unknown; at: string; ms: number };
type Route007I = { key?: string; operationKey?: string; area?: string; method?: string; path?: string; safeDisabledUntilNextStage?: boolean; requiresAdmin?: boolean; requiresIdempotencyForWrite?: boolean; requiresProviderReadiness?: boolean; requiresWalletBoundary?: boolean };
type Queue007I = { key: QueueKey007I; rows: JsonRecord007I[]; tone: Tone007I; requiredReview: string[] };
type Action007I = { key: string; queue: QueueKey007I; titleKey: string; descriptionKey: string; routeHints: string[]; idKeys: string[]; needsReason: boolean; needsOwnerApproval?: boolean; tone: Tone007I; payloadKind: string };
type Journal007I = { id: string; actionKey: string; queue: QueueKey007I; recordId: string; ok: boolean; status: number; message: string; at: string; route: string; synced: boolean };
type Props007I = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };

const MARKER007I = "ADMIN-UI-TAXI-007I-LANGUAGE-QUALITY-CONTROL";
const DASH = "—";

type Copy007I = Record<string, string>;

const RU007I: Copy007I = {
  pageTitle: "Taxi Admin Center",
  pageSubtitle: "Такси без смешанного текста: заявки, жалобы, баланс, авто, отчёты и решения только через сервер на одном выбранном языке.",
  languageQuality: "Качество языка",
  languageQualityText: "Весь рабочий текст админки такси берётся из словаря текущего языка. Пути сервера, номера и исходные поля остаются техническими данными и не переводятся.",
  currentLanguage: "Текущий язык",
  cleanCopy: "Чистый текст",
  noMixedText: "Без смешанного текста интерфейса",
  technicalOnly: "Технические значения отдельно",
  refresh: "Обновить данные такси",
  diagnostics: "Проверить источники",
  loading: "Загрузка",
  loaded: "Загружено",
  locked: "Заблокировано сервером",
  backendOnly: "Решение засчитывается только после ответа сервера. Интерфейс не меняет статус локально.",
  stepLoad: "1. Загрузка",
  stepQueue: "2. Очередь",
  stepReview: "3. Изучение",
  stepDecision: "4. Решение",
  stepSync: "5. Синхронизация",
  applications: "Заявки",
  applicationsSubtitle: "Водитель, фото, документы, авто",
  drivers: "Водители",
  driversSubtitle: "Профиль, доступ, риск",
  vehicles: "Авто",
  vehiclesSubtitle: "Модель, номер, страховка",
  orders: "Заказы",
  ordersSubtitle: "Заявки, диспетчеризация, отмены",
  trips: "Поездки",
  tripsSubtitle: "Статус, сумма, безопасность",
  complaints: "Жалобы",
  complaintsSubtitle: "Доказательства, Саби ИИ, эскалация",
  balance: "Баланс",
  balanceSubtitle: "Reserve, pending, available",
  tariffs: "Тарифы",
  tariffsSubtitle: "Регионы, комиссии, история",
  gifts: "Подарки / бонусы",
  giftsSubtitle: "Tips, rewards, freeze/release",
  reports: "Отчёты",
  reportsSubtitle: "Рост, аудит, готовность",
  tabApplications: "Заявки",
  tabApplicationsDescription: "Изучение новой заявки: водитель, авто, документы, фото, проверка личности, безопасность.",
  tabComplaints: "Жалобы",
  tabComplaintsDescription: "Проверка жалоб, доказательства, рекомендация Саби ИИ и отработка.",
  tabAccounting: "Баланс",
  tabAccountingDescription: "Баланс таксистов, расчёт, бонусы и граница подарков.",
  tabFleet: "Водители / авто",
  tabFleetDescription: "Учёт водителей, авто, документы и доступ к диспетчеризации.",
  tabOperations: "Заказы / поездки",
  tabOperationsDescription: "Заказы, поездки, диспетчеризация, тарифы и комиссии.",
  tabReports: "Отчёты",
  tabReportsDescription: "Шкалы роста, отчёты, аудит и готовность.",
  search: "Поиск по реальным строкам",
  searchPlaceholder: "Номер, телефон, статус, регион",
  noRows: "Сервер пока не вернул строки для этой очереди.",
  noSearchRows: "Поиск ничего не нашёл. Очистите поле, чтобы увидеть все строки сервера.",
  dossier: "Досье записи",
  driver: "Водитель",
  vehicle: "Авто",
  safety: "Безопасность",
  finance: "Баланс / расчёты",
  photos: "Фото и документы",
  missingDriver: "Данные водителя не пришли от сервера.",
  missingVehicle: "Данные авто не пришли от сервера.",
  missingSafety: "Поля безопасности и риска не пришли от сервера.",
  missingFinance: "Поля баланса и расчёта не пришли от сервера.",
  missingPhotos: "Фото и документы не пришли от сервера. Интерфейс не подставляет демонстрационные картинки.",
  rawField: "Поле сервера",
  decisionPanel: "Панель решения",
  action: "Действие",
  reviewChecklist: "Контрольный список проверки",
  selectedId: "Номер записи",
  reason: "Причина решения",
  reasonPlaceholder: "Напишите понятную причину минимум 8 символов",
  ownerApproval: "Owner approval ID",
  ownerApprovalPlaceholder: "Нужно для критичных действий",
  backendRoute: "Backend route",
  sendBackend: "Отправить на сервер",
  blocked: "Нельзя выполнить",
  blockers: "Блокеры",
  recordIdRequired: "Нужен Номер записи",
  routeMissing: "Серверный маршрут не найден",
  checklistRequired: "Нужно пройти контрольный список",
  reasonRequired: "Нужна причина минимум 8 символов",
  ownerRequired: "Нужен номер одобрения владельца",
  sourceHealth: "Здоровье источников",
  dataQuality: "Качество данных",
  actionJournal: "Журнал действий",
  latestResponse: "Последний ответ сервера",
  reportsTitle: "Отчёты / шкалы",
  routeCoverage: "Покрытие серверных маршрутов",
  sourceCoverage: "Покрытие источников",
  evidenceCoverage: "Полнота доказательств",
  showLegacy: "Показать техническую основу предыдущего этапа",
  hideLegacy: "Скрыть техническую основу предыдущего этапа",
  sourceReadiness: "Readiness",
  sourceRoutes: "Routes",
  sourceDiagnostics: "Admin diagnostics",
  sourceReadOnlyPlan: "Read-only plan",
  sourceReadOnlyRows: "Read-only rows",
  sourceWritePlan: "Write gate plan",
  sourceWriteGate: "Write gate check",
  sourceProviderWallet: "Provider / Wallet boundary",
  sourceCockpit: "Admin cockpit",
  actReviewApplication: "Изучить заявку",
  actReviewApplicationDesc: "Открыть процесс проверки без изменения базы.",
  actApproveApplication: "Подтвердить заявку",
  actApproveApplicationDesc: "Одобрение только через сервер и аудит.",
  actRejectApplication: "Отклонить заявку",
  actRejectApplicationDesc: "Отказ с причиной и причиной блокировки сервера.",
  actRequireDocuments: "Запросить документы",
  actRequireDocumentsDesc: "Запросить недостающие фото/документы.",
  actSuspendDriver: "Остановить водителя",
  actSuspendDriverDesc: "Приостановка только через сервер.",
  actRestoreDriver: "Восстановить водителя",
  actRestoreDriverDesc: "Восстановление только через сервер.",
  actApproveVehicle: "Подтвердить авто",
  actApproveVehicleDesc: "Approve vehicle documents.",
  actRejectVehicle: "Отклонить авто",
  actRejectVehicleDesc: "Reject vehicle documents.",
  actAssignDispatch: "Назначить / переназначить",
  actAssignDispatchDesc: "Действие диспетчеризации через сервер.",
  actCancelTrip: "Отменить поездку",
  actCancelTripDesc: "Отмена поездки с причиной.",
  actResolveComplaint: "Закрыть жалобу",
  actResolveComplaintDesc: "Закрытие жалобы после проверки доказательств.",
  actEscalateComplaint: "Передать жалобу выше",
  actEscalateComplaintDesc: "Escalate complaint supervisor/legal.",
  actReviewBalance: "Проверить баланс",
  actReviewBalanceDesc: "Проверка расчёта и удержания без изменения кошелька.",
  actUpdateTariff: "Проверить тариф",
  actUpdateTariffDesc: "Действие по тарифу или комиссии через сервер.",
  actFreezeReward: "Заморозить бонус/подарок",
  actFreezeRewardDesc: "Заморозка награды только после ответа сервера.",
  actReleaseReward: "Разморозить бонус/подарок",
  actReleaseRewardDesc: "Выдача награды только после ответа сервера.",
  checkIdentity: "Личность проверена",
  checkDriverPhoto: "Фото водителя проверено",
  checkLicense: "Права проверены",
  checkVehicle: "Авто проверено",
  checkSafety: "Безопасность проверена",
  checkProfile: "Профиль проверен",
  checkRisk: "Риск проверен",
  checkBalance: "Баланс проверен",
  checkRegistration: "Регистрация проверена",
  checkInsurance: "Страховка проверена",
  checkVehiclePhoto: "Фото авто проверено",
  checkRoute: "Маршрут проверен",
  checkTariff: "Тариф проверен",
  checkDispatch: "Диспетчеризация проверена",
  checkTripState: "Статус поездки проверен",
  checkAmount: "Сумма проверена",
  checkEvidence: "Доказательства проверены",
  checkTrip: "Поездка проверена",
  checkSeverity: "Серьёзность проверена",
  checkAi: "Рекомендация Саби ИИ проверена",
  checkHold: "Удержание проверено",
  checkSettlement: "Расчёт проверен",
  checkWalletBoundary: "Граница кошелька проверена",
  checkRegion: "Регион проверен",
  checkCommission: "Комиссия проверена",
  checkHistory: "История проверена",
  checkReward: "Награда проверена",
  checkFinance: "Финансы проверены",
  checkLegal: "Юридическая проверка выполнена",
  checkOwner: "Одобрение владельца проверено",
  checkGrowth: "Показатели роста проверены",
  checkAudit: "Аудит проверен",
  checkRouteCoverage: "Покрытие маршрутов проверено",
  open: "Открыть",
  returned: "Вернулось",
  missing: "Нет данных",
  show: "Показать",
  hide: "Скрыть",
  notLoaded: "Не загружено",
  syncDone: "Синхронизировано",
  syncNotChanged: "Не изменено",
  noActions: "В этой сессии серверное действие ещё не запускалось.",
};

const EN007I: Copy007I = {
  ...RU007I,
  pageTitle: "Taxi Admin Center",
  pageSubtitle: "Taxi without mixed UI copy: applications, complaints, balance, vehicles, reports and backend-only decisions in one selected language.",
  languageQuality: "Language quality",
  languageQualityText: "All Taxi Admin working copy comes from the current language dictionary. Backend paths, IDs and raw fields remain technical data and are not translated.",
  currentLanguage: "Current language",
  cleanCopy: "Clean copy",
  noMixedText: "No mixed UI text",
  technicalOnly: "Technical values are separated",
  refresh: "Refresh Taxi data",
  diagnostics: "Check sources",
  loading: "Loading",
  loaded: "Loaded",
  locked: "Locked by backend",
  backendOnly: "A decision counts only after the backend response. The UI never changes status locally.",
  stepLoad: "1. Load",
  stepQueue: "2. Queue",
  stepReview: "3. Review",
  stepDecision: "4. Decision",
  stepSync: "5. Sync",
  applications: "Applications",
  applicationsSubtitle: "Driver, photos, documents, vehicle",
  drivers: "Drivers",
  driversSubtitle: "Profile, access, risk",
  vehicles: "Vehicles",
  vehiclesSubtitle: "Model, plate, insurance",
  orders: "Orders",
  ordersSubtitle: "Requests, dispatch, cancellations",
  trips: "Trips",
  tripsSubtitle: "Status, amount, safety",
  complaints: "Complaints",
  complaintsSubtitle: "Evidence, AI, escalation",
  balance: "Balance",
  balanceSubtitle: "Reserve, pending, available",
  tariffs: "Tariffs",
  tariffsSubtitle: "Regions, commissions, history",
  gifts: "Gifts / bonuses",
  giftsSubtitle: "Tips, rewards, freeze/release",
  reports: "Reports",
  reportsSubtitle: "Growth, audit, readiness",
  tabApplications: "Applications",
  tabApplicationsDescription: "Review a new application: driver, vehicle, documents, photos, KYC and safety.",
  tabComplaints: "Complaints",
  tabComplaintsDescription: "Review complaints, evidence, AI recommendation and resolution.",
  tabAccounting: "Balance",
  tabAccountingDescription: "Driver balance, settlement, bonuses and gift boundaries.",
  tabFleet: "Drivers / vehicles",
  tabFleetDescription: "Driver records, vehicles, documents and dispatch access.",
  tabOperations: "Orders / trips",
  tabOperationsDescription: "Orders, trips, dispatch, tariffs and commissions.",
  tabReports: "Reports",
  tabReportsDescription: "Growth scales, reports, audit and readiness.",
  search: "Search real rows",
  searchPlaceholder: "ID, phone, status, region",
  noRows: "The backend has not returned rows for this queue yet.",
  noSearchRows: "No rows match the search. Clear the field to see all backend rows.",
  dossier: "Record dossier",
  driver: "Driver",
  vehicle: "Vehicle",
  safety: "Safety",
  finance: "Balance / settlement",
  photos: "Photos and documents",
  missingDriver: "Driver data was not returned by the backend.",
  missingVehicle: "Vehicle data was not returned by the backend.",
  missingSafety: "Safety/risk fields were not returned by the backend.",
  missingFinance: "Balance/settlement fields were not returned by the backend.",
  missingPhotos: "Photos/documents were not returned by the backend. The UI does not insert demo images.",
  rawField: "Backend field",
  decisionPanel: "Decision panel",
  action: "Action",
  reviewChecklist: "Review checklist",
  selectedId: "Record ID",
  reason: "Decision reason",
  reasonPlaceholder: "Write a clear reason, at least 8 characters",
  ownerApproval: "Owner approval ID",
  ownerApprovalPlaceholder: "Required for critical actions",
  backendRoute: "Backend route",
  sendBackend: "Send to backend",
  blocked: "Blocked",
  blockers: "Blockers",
  recordIdRequired: "Record ID is required",
  routeMissing: "Backend route is missing",
  checklistRequired: "Review checklist is required",
  reasonRequired: "Reason must be at least 8 characters",
  ownerRequired: "Owner approval ID is required",
  sourceHealth: "Source health",
  dataQuality: "Data quality",
  actionJournal: "Action journal",
  latestResponse: "Latest backend response",
  reportsTitle: "Reports / scales",
  routeCoverage: "Route contract coverage",
  sourceCoverage: "Source coverage",
  evidenceCoverage: "Evidence completeness",
  showLegacy: "Show technical 007H foundation",
  hideLegacy: "Hide technical 007H foundation",
  open: "Open",
  returned: "Returned",
  missing: "Missing",
  show: "Show",
  hide: "Hide",
  notLoaded: "Not loaded",
  syncDone: "Synced",
  syncNotChanged: "Not changed",
  noActions: "No backend action has been attempted in this session.",
};

const UZ007I: Copy007I = {
  ...EN007I,
  pageTitle: "Taxi Admin markazi",
  pageSubtitle: "Taksi boshqaruvi bitta tanlangan tilda: arizalar, shikoyatlar, balans, avtomobillar, hisobotlar va faqat server orqali qarorlar.",
  languageQuality: "Til sifati",
  languageQualityText: "Taxi Admin ish matnlari joriy til lug‘atidan olinadi. Backend path, ID va raw fieldlar texnik maʼlumot sifatida alohida qoladi.",
  currentLanguage: "Joriy til",
  cleanCopy: "Toza matn",
  noMixedText: "Aralash interfeys matni yo‘q",
  technicalOnly: "Texnik qiymatlar alohida",
  refresh: "Taksi maʼlumotlarini yangilash",
  diagnostics: "Manbalarni tekshirish",
  loading: "Yuklanmoqda",
  loaded: "Yuklandi",
  locked: "Backend bloklagan",
  backendOnly: "Qaror faqat server javobidan keyin kuchga kiradi. Interfeys mahalliy holatni o‘zgartirmaydi.",
  stepLoad: "1. Yuklash",
  stepQueue: "2. Navbat",
  stepReview: "3. Tekshiruv",
  stepDecision: "4. Qaror",
  stepSync: "5. Sinxronlash",
  applications: "Arizalar",
  applicationsSubtitle: "Haydovchi, foto, hujjatlar, mashina",
  drivers: "Haydovchilar",
  driversSubtitle: "Profil, ruxsat, xavf",
  vehicles: "Mashinalar",
  vehiclesSubtitle: "Model, raqam, sug‘urta",
  orders: "Buyurtmalar",
  ordersSubtitle: "So‘rovlar, dispatch, bekor qilish",
  trips: "Safarlar",
  tripsSubtitle: "Holat, summa, xavfsizlik",
  complaints: "Shikoyatlar",
  complaintsSubtitle: "Dalillar, AI, eskalatsiya",
  balance: "Balans",
  balanceSubtitle: "Reserve, pending, available",
  tariffs: "Tariflar",
  tariffsSubtitle: "Hududlar, komissiya, tarix",
  gifts: "Sovg‘alar / bonuslar",
  giftsSubtitle: "Tips, rewards, freeze/release",
  reports: "Hisobotlar",
  reportsSubtitle: "O‘sish, tekshiruv va tayyorgarlik",
  tabApplications: "Arizalar",
  tabApplicationsDescription: "Yangi arizani tekshirish: haydovchi, mashina, hujjatlar, foto, KYC va safety.",
  tabComplaints: "Shikoyatlar",
  tabComplaintsDescription: "Shikoyat, dalil, AI tavsiyasi va yakuniy qarorni tekshirish.",
  tabAccounting: "Balans",
  tabAccountingDescription: "Haydovchi balansi, settlement, bonus va sovg‘a chegaralari.",
  tabFleet: "Haydovchilar / mashinalar",
  tabFleetDescription: "Haydovchi hisobi, mashina, hujjatlar va dispatch ruxsati.",
  tabOperations: "Buyurtmalar / safarlar",
  tabOperationsDescription: "Buyurtmalar, safarlar, dispatch, tariflar va komissiya.",
  tabReports: "Hisobotlar",
  tabReportsDescription: "O‘sish shkalalari, hisobotlar, tekshiruv va tayyorgarlik.",
  search: "Real qatorlardan qidirish",
  searchPlaceholder: "ID, telefon, status, hudud",
  noRows: "Backend bu navbat uchun hali qator qaytarmadi.",
  noSearchRows: "Qidiruv natija bermadi. Barcha server qatorlarini ko‘rish uchun maydonni tozalang.",
  dossier: "Yozuv dosyesi",
  driver: "Haydovchi",
  vehicle: "Mashina",
  safety: "Xavfsizlik",
  finance: "Balans / hisob-kitob",
  photos: "Foto va hujjatlar",
  missingDriver: "Haydovchi maʼlumoti backenddan kelmadi.",
  missingVehicle: "Mashina maʼlumoti backenddan kelmadi.",
  missingSafety: "Safety/risk maydonlari backenddan kelmadi.",
  missingFinance: "Balans/settlement maydonlari backenddan kelmadi.",
  missingPhotos: "Foto yoki hujjatlar serverdan kelmadi. Interfeys demo rasm qo‘ymaydi.",
  rawField: "Backend maydoni",
  decisionPanel: "Qaror paneli",
  action: "Amal",
  reviewChecklist: "Tekshiruv checklist",
  selectedId: "Yozuv ID",
  reason: "Qaror sababi",
  reasonPlaceholder: "Kamida 8 belgili aniq sabab yozing",
  ownerApproval: "Owner approval ID",
  ownerApprovalPlaceholder: "Muhim amallar uchun kerak",
  backendRoute: "Backend route",
  sendBackend: "Backendga yuborish",
  blocked: "Bloklangan",
  blockers: "Blokerlar",
  recordIdRequired: "Yozuv ID kerak",
  routeMissing: "Backend route topilmadi",
  checklistRequired: "Checklist to‘ldirilishi kerak",
  reasonRequired: "Sabab kamida 8 belgi bo‘lishi kerak",
  ownerRequired: "Owner approval ID kerak",
  sourceHealth: "Manbalar holati",
  dataQuality: "Maʼlumot sifati",
  actionJournal: "Amallar jurnali",
  latestResponse: "Oxirgi backend javobi",
  reportsTitle: "Hisobotlar / shkalalar",
  routeCoverage: "Route contract qamrovi",
  sourceCoverage: "Manbalar qamrovi",
  evidenceCoverage: "Evidence to‘liqligi",
  showLegacy: "Texnik 007H asosini ko‘rsatish",
  hideLegacy: "Texnik 007H asosini yashirish",
  open: "Ochish",
  returned: "Keldi",
  missing: "Yo‘q",
  show: "Ko‘rsatish",
  hide: "Yashirish",
  notLoaded: "Yuklanmagan",
  syncDone: "Sinxronlandi",
  syncNotChanged: "O‘zgarmadi",
  noActions: "Bu sessiyada backend action hali ishga tushirilmadi.",
};

const ZH007I: Copy007I = {
  ...EN007I,
  pageTitle: "出租车管理中心",
  pageSubtitle: "出租车工作台使用单一语言显示：申请、投诉、余额、车辆、报表，以及仅由服务器确认的决策。",
  languageQuality: "语言质量",
  languageQualityText: "出租车管理后台的工作文案来自当前语言词典。服务器路径、编号和原始字段属于技术数据，不进行翻译。",
  currentLanguage: "当前语言",
  cleanCopy: "清晰文案",
  noMixedText: "界面文案不混用语言",
  technicalOnly: "技术值单独显示",
  refresh: "刷新出租车数据",
  diagnostics: "检查数据源",
  loading: "加载中",
  loaded: "已加载",
  locked: "服务器已锁定",
  backendOnly: "决策只有在服务器返回后才生效。界面不会本地更改状态。",
  stepLoad: "1. 加载",
  stepQueue: "2. 队列",
  stepReview: "3. 审核",
  stepDecision: "4. 决策",
  stepSync: "5. 同步",
  applications: "申请",
  applicationsSubtitle: "司机、照片、文件、车辆",
  drivers: "司机",
  driversSubtitle: "资料、权限、风险",
  vehicles: "车辆",
  vehiclesSubtitle: "型号、车牌、保险",
  orders: "订单",
  ordersSubtitle: "请求、调度、取消",
  trips: "行程",
  tripsSubtitle: "状态、金额、安全",
  complaints: "投诉",
  complaintsSubtitle: "证据、萨比智能、升级处理",
  balance: "余额",
  balanceSubtitle: "Reserve、pending、available",
  tariffs: "价格规则",
  tariffsSubtitle: "区域、佣金、历史",
  gifts: "礼物 / 奖励",
  giftsSubtitle: "Tips、rewards、freeze/release",
  reports: "报表",
  reportsSubtitle: "增长、审计、就绪状态",
  tabApplications: "申请",
  tabApplicationsDescription: "审核新申请：司机、车辆、文件、照片、身份验证和安全。",
  tabComplaints: "投诉",
  tabComplaintsDescription: "审核投诉、证据、萨比智能建议和处理结果。",
  tabAccounting: "余额",
  tabAccountingDescription: "司机余额、结算、奖励和礼物边界。",
  tabFleet: "司机 / 车辆",
  tabFleetDescription: "司机记录、车辆、文件和调度权限。",
  tabOperations: "订单 / 行程",
  tabOperationsDescription: "订单、行程、调度、价格和佣金。",
  tabReports: "报表",
  tabReportsDescription: "增长指标、报表、审计和就绪状态。",
  search: "搜索真实行",
  searchPlaceholder: "编号、电话、状态、区域",
  noRows: "服务器尚未为此队列返回数据行。",
  noSearchRows: "没有匹配的行。清空搜索框查看全部服务器数据。",
  dossier: "记录档案",
  driver: "司机",
  vehicle: "车辆",
  safety: "安全",
  finance: "余额 / 结算",
  photos: "照片和文件",
  missingDriver: "服务器未返回司机数据。",
  missingVehicle: "服务器未返回车辆数据。",
  missingSafety: "服务器未返回安全和风险字段。",
  missingFinance: "服务器未返回余额和结算字段。",
  missingPhotos: "服务器未返回照片或文件。界面不插入演示图片。",
  rawField: "服务器字段",
  decisionPanel: "决策面板",
  action: "操作",
  reviewChecklist: "审核清单",
  selectedId: "记录编号",
  reason: "决策原因",
  reasonPlaceholder: "请输入清晰原因，至少 8 个字符",
  ownerApproval: "Owner approval ID",
  ownerApprovalPlaceholder: "关键操作需要填写",
  backendRoute: "Backend route",
  sendBackend: "发送到服务器",
  blocked: "已阻止",
  blockers: "阻止原因",
  recordIdRequired: "需要记录编号",
  routeMissing: "缺少服务器路线",
  checklistRequired: "需要完成审核清单",
  reasonRequired: "原因至少 8 个字符",
  ownerRequired: "需要所有者批准编号",
  sourceHealth: "数据源状态",
  dataQuality: "数据质量",
  actionJournal: "操作日志",
  latestResponse: "最新服务器响应",
  reportsTitle: "报表 / 指标",
  routeCoverage: "服务器路线覆盖率",
  sourceCoverage: "数据源覆盖率",
  evidenceCoverage: "证据完整度",
  showLegacy: "显示上一阶段技术基础",
  hideLegacy: "隐藏上一阶段技术基础",
  open: "打开",
  returned: "已返回",
  missing: "缺失",
  show: "显示",
  hide: "隐藏",
  notLoaded: "未加载",
  syncDone: "已同步",
  syncNotChanged: "未更改",
  noActions: "本会话尚未执行服务器操作。",
};

const COPY007I: Record<AdminLanguage, Copy007I> = { ru: RU007I, en: EN007I, uz: UZ007I, zh: ZH007I };
function tx007I(language: AdminLanguage, key: string): string { return COPY007I[language]?.[key] ?? COPY007I.en[key] ?? key; }

const REVIEW_LABEL_KEY007I: Record<string, string> = {
  identity_checked: "checkIdentity", driver_photo_checked: "checkDriverPhoto", license_checked: "checkLicense", vehicle_checked: "checkVehicle", safety_checked: "checkSafety",
  profile_checked: "checkProfile", risk_checked: "checkRisk", balance_checked: "checkBalance", registration_checked: "checkRegistration", insurance_checked: "checkInsurance", vehicle_photo_checked: "checkVehiclePhoto",
  route_checked: "checkRoute", tariff_checked: "checkTariff", dispatch_checked: "checkDispatch", trip_state_checked: "checkTripState", amount_checked: "checkAmount",
  evidence_checked: "checkEvidence", trip_checked: "checkTrip", severity_checked: "checkSeverity", ai_checked: "checkAi", driver_balance_checked: "checkBalance", hold_checked: "checkHold", settlement_checked: "checkSettlement", wallet_boundary_checked: "checkWalletBoundary",
  region_checked: "checkRegion", commission_checked: "checkCommission", history_checked: "checkHistory", reward_checked: "checkReward", finance_checked: "checkFinance", legal_checked: "checkLegal", owner_checked: "checkOwner", growth_checked: "checkGrowth", audit_checked: "checkAudit", route_coverage_checked: "checkRouteCoverage",
};

const SOURCES007I: Source007I[] = [
  { key: "readiness", titleKey: "sourceReadiness", method: "GET", path: "/api/taxi/002n/readiness" },
  { key: "routes", titleKey: "sourceRoutes", method: "GET", path: "/api/taxi/002n/routes" },
  { key: "diagnostics", titleKey: "sourceDiagnostics", method: "GET", path: "/api/admin/taxi/002n/diagnostics" },
  { key: "readOnlyPlan", titleKey: "sourceReadOnlyPlan", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run/plan" },
  { key: "readOnlyRows", titleKey: "sourceReadOnlyRows", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run" },
  { key: "writePlan", titleKey: "sourceWritePlan", method: "GET", path: "/api/taxi/002x/db-write-runtime/plan" },
  { key: "writeGate", titleKey: "sourceWriteGate", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: MARKER007I, action: "check_write_gate", fakeSuccessBlocked: true } },
  { key: "providerWallet", titleKey: "sourceProviderWallet", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: MARKER007I, action: "check_provider_wallet_boundary", fakeSuccessBlocked: true } },
  { key: "cockpit", titleKey: "sourceCockpit", method: "POST", path: "/api/taxi/003h/admin-readiness-cockpit/check", body: { source: MARKER007I, action: "check_admin_cockpit", fakeSuccessBlocked: true } },
];

const QUEUE_META007I: Record<QueueKey007I, { titleKey: string; subtitleKey: string; tone: Tone007I; requiredReview: string[] }> = {
  applications: { titleKey: "applications", subtitleKey: "applicationsSubtitle", tone: "ready", requiredReview: ["identity_checked", "driver_photo_checked", "license_checked", "vehicle_checked", "safety_checked"] },
  drivers: { titleKey: "drivers", subtitleKey: "driversSubtitle", tone: "info", requiredReview: ["profile_checked", "risk_checked", "balance_checked"] },
  vehicles: { titleKey: "vehicles", subtitleKey: "vehiclesSubtitle", tone: "info", requiredReview: ["registration_checked", "insurance_checked", "vehicle_photo_checked"] },
  orders: { titleKey: "orders", subtitleKey: "ordersSubtitle", tone: "warn", requiredReview: ["route_checked", "tariff_checked", "dispatch_checked"] },
  trips: { titleKey: "trips", subtitleKey: "tripsSubtitle", tone: "warn", requiredReview: ["trip_state_checked", "amount_checked", "safety_checked"] },
  complaints: { titleKey: "complaints", subtitleKey: "complaintsSubtitle", tone: "danger", requiredReview: ["evidence_checked", "trip_checked", "severity_checked", "ai_checked"] },
  balance: { titleKey: "balance", subtitleKey: "balanceSubtitle", tone: "warn", requiredReview: ["driver_balance_checked", "hold_checked", "settlement_checked", "wallet_boundary_checked"] },
  tariffs: { titleKey: "tariffs", subtitleKey: "tariffsSubtitle", tone: "info", requiredReview: ["region_checked", "commission_checked", "history_checked"] },
  gifts: { titleKey: "gifts", subtitleKey: "giftsSubtitle", tone: "locked", requiredReview: ["reward_checked", "finance_checked", "legal_checked", "owner_checked"] },
  reports: { titleKey: "reports", subtitleKey: "reportsSubtitle", tone: "ready", requiredReview: ["growth_checked", "audit_checked", "route_coverage_checked"] },
};

const WORK_TABS007I: Array<{ key: WorkTab007I; titleKey: string; descriptionKey: string; queues: QueueKey007I[] }> = [
  { key: "applications", titleKey: "tabApplications", descriptionKey: "tabApplicationsDescription", queues: ["applications"] },
  { key: "complaints", titleKey: "tabComplaints", descriptionKey: "tabComplaintsDescription", queues: ["complaints", "trips"] },
  { key: "accounting", titleKey: "tabAccounting", descriptionKey: "tabAccountingDescription", queues: ["balance", "gifts"] },
  { key: "fleet", titleKey: "tabFleet", descriptionKey: "tabFleetDescription", queues: ["drivers", "vehicles"] },
  { key: "operations", titleKey: "tabOperations", descriptionKey: "tabOperationsDescription", queues: ["orders", "trips", "tariffs"] },
  { key: "reports", titleKey: "tabReports", descriptionKey: "tabReportsDescription", queues: ["reports"] },
];

const ACTIONS007I: Action007I[] = [
  { key: "reviewApplication", queue: "applications", titleKey: "actReviewApplication", descriptionKey: "actReviewApplicationDesc", routeHints: ["application", "review"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "info", payloadKind: "driver_application_review" },
  { key: "approveApplication", queue: "applications", titleKey: "actApproveApplication", descriptionKey: "actApproveApplicationDesc", routeHints: ["application", "approve"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_application_approve" },
  { key: "rejectApplication", queue: "applications", titleKey: "actRejectApplication", descriptionKey: "actRejectApplicationDesc", routeHints: ["application", "reject"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "danger", payloadKind: "driver_application_reject" },
  { key: "requireDocuments", queue: "applications", titleKey: "actRequireDocuments", descriptionKey: "actRequireDocumentsDesc", routeHints: ["document", "require"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "warn", payloadKind: "driver_application_require_documents" },
  { key: "suspendDriver", queue: "drivers", titleKey: "actSuspendDriver", descriptionKey: "actSuspendDriverDesc", routeHints: ["driver", "suspend"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "driver_suspend" },
  { key: "restoreDriver", queue: "drivers", titleKey: "actRestoreDriver", descriptionKey: "actRestoreDriverDesc", routeHints: ["driver", "restore"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_restore" },
  { key: "approveVehicle", queue: "vehicles", titleKey: "actApproveVehicle", descriptionKey: "actApproveVehicleDesc", routeHints: ["vehicle", "approve"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "ready", payloadKind: "vehicle_approve" },
  { key: "rejectVehicle", queue: "vehicles", titleKey: "actRejectVehicle", descriptionKey: "actRejectVehicleDesc", routeHints: ["vehicle", "reject"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "danger", payloadKind: "vehicle_reject" },
  { key: "assignDispatch", queue: "orders", titleKey: "actAssignDispatch", descriptionKey: "actAssignDispatchDesc", routeHints: ["dispatch", "assign"], idKeys: ["requestId", "orderId", "id"], needsReason: true, tone: "info", payloadKind: "dispatch_assign" },
  { key: "cancelTrip", queue: "trips", titleKey: "actCancelTrip", descriptionKey: "actCancelTripDesc", routeHints: ["trip", "cancel"], idKeys: ["tripId", "id"], needsReason: true, tone: "danger", payloadKind: "trip_cancel" },
  { key: "resolveComplaint", queue: "complaints", titleKey: "actResolveComplaint", descriptionKey: "actResolveComplaintDesc", routeHints: ["complaint", "resolve"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "ready", payloadKind: "complaint_resolve" },
  { key: "escalateComplaint", queue: "complaints", titleKey: "actEscalateComplaint", descriptionKey: "actEscalateComplaintDesc", routeHints: ["complaint", "escalate"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "warn", payloadKind: "complaint_escalate" },
  { key: "reviewBalance", queue: "balance", titleKey: "actReviewBalance", descriptionKey: "actReviewBalanceDesc", routeHints: ["settlement", "review"], idKeys: ["settlementId", "paymentHoldId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "warn", payloadKind: "driver_balance_review" },
  { key: "updateTariff", queue: "tariffs", titleKey: "actUpdateTariff", descriptionKey: "actUpdateTariffDesc", routeHints: ["tariff", "upsert"], idKeys: ["tariffId", "regionCode", "id"], needsReason: true, needsOwnerApproval: true, tone: "info", payloadKind: "tariff_commission_review" },
  { key: "freezeReward", queue: "gifts", titleKey: "actFreezeReward", descriptionKey: "actFreezeRewardDesc", routeHints: ["reward", "freeze"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "gift_reward_freeze" },
  { key: "releaseReward", queue: "gifts", titleKey: "actReleaseReward", descriptionKey: "actReleaseRewardDesc", routeHints: ["reward", "release"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "gift_reward_release" },
];

function isRecord007I(value: unknown): value is JsonRecord007I { return typeof value === "object" && value !== null && !Array.isArray(value); }
function text007I(value: unknown): string { if (value === null || value === undefined || value === "") return DASH; if (typeof value === "string") return value; if (typeof value === "number" || typeof value === "boolean") return String(value); if (Array.isArray(value)) return `${value.length} items`; if (typeof value === "object") return "object"; return String(value); }
function resultMessage007I(payload: unknown, status: number): string { if (isRecord007I(payload)) { for (const key of ["error", "message", "reason", "blockedReason", "status"]) { if (typeof payload[key] === "string") return String(payload[key]); } } return status ? `HTTP ${status}` : "network/error"; }

function flattenRecords007I(value: unknown, hints: string[]): JsonRecord007I[] {
  const out: JsonRecord007I[] = [];
  const seen = new Set<unknown>();
  const lowerHints = hints.map((item) => item.toLowerCase());
  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 7 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) {
      const rows = node.filter(isRecord007I);
      if (rows.length && lowerHints.some((hint) => path.toLowerCase().includes(hint))) out.push(...rows);
      node.forEach((child, index) => walk(child, `${path}.${index}`, depth + 1));
      return;
    }
    if (!isRecord007I(node)) return;
    Object.entries(node).forEach(([key, child]) => walk(child, `${path}.${key}`, depth + 1));
  };
  walk(value, "root", 0);
  return out.slice(0, 120);
}

function collectRoutes007I(value: unknown): Route007I[] {
  const routes: Route007I[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 8 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) { node.forEach((child) => walk(child, depth + 1)); return; }
    if (!isRecord007I(node)) return;
    const path = typeof node.path === "string" ? node.path : typeof node.route === "string" ? node.route : null;
    if (path && path.startsWith("/api/taxi")) routes.push(node as Route007I);
    Object.values(node).forEach((child) => walk(child, depth + 1));
  };
  walk(value, 0);
  return routes;
}

function queueRows007I(results: BackendResult007I[]): Record<QueueKey007I, JsonRecord007I[]> {
  const payloads = results.map((item) => item.payload);
  return {
    applications: payloads.flatMap((p) => flattenRecords007I(p, ["application", "driverApplication", "applicant"])),
    drivers: payloads.flatMap((p) => flattenRecords007I(p, ["drivers", "driverProfile", "driver"])),
    vehicles: payloads.flatMap((p) => flattenRecords007I(p, ["vehicles", "vehicle", "car"])),
    orders: payloads.flatMap((p) => flattenRecords007I(p, ["orders", "requests", "rideRequest", "dispatch"])),
    trips: payloads.flatMap((p) => flattenRecords007I(p, ["trips", "trip"])),
    complaints: payloads.flatMap((p) => flattenRecords007I(p, ["complaints", "support", "dispute", "evidence"])),
    balance: payloads.flatMap((p) => flattenRecords007I(p, ["balance", "settlement", "ledger", "paymentHold"])),
    tariffs: payloads.flatMap((p) => flattenRecords007I(p, ["tariffs", "regions", "commission"])),
    gifts: payloads.flatMap((p) => flattenRecords007I(p, ["gifts", "rewards", "bonus", "tips"])),
    reports: payloads.flatMap((p) => flattenRecords007I(p, ["reports", "analytics", "audit", "readiness"])),
  };
}

function firstId007I(row: JsonRecord007I | null, keys: string[]): string {
  if (!row) return "";
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number") return String(value);
  }
  for (const [key, value] of Object.entries(row)) {
    if (/id$/i.test(key) && (typeof value === "string" || typeof value === "number")) return String(value);
  }
  return "";
}

function pickFields007I(row: JsonRecord007I | null, patterns: RegExp[], limit = 12): Array<[string, unknown]> {
  if (!row) return [];
  return Object.entries(row).filter(([key, value]) => patterns.some((pattern) => pattern.test(key)) && value !== undefined && value !== null && value !== "").slice(0, limit);
}
function photoFields007I(row: JsonRecord007I | null): Array<[string, string]> { return pickFields007I(row, [/photo/i, /image/i, /document/i, /license/i, /insurance/i, /registration/i, /avatar/i], 20).filter(([, value]) => typeof value === "string") as Array<[string, string]>; }

function findRoute007I(routes: Route007I[], action: Action007I): Route007I | null {
  const scored = routes.map((route) => {
    const text = [route.key, route.operationKey, route.area, route.method, route.path].filter(Boolean).join(" ").toLowerCase();
    const score = action.routeHints.reduce((sum, hint) => sum + (text.includes(hint) ? 1 : 0), 0);
    return { route, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  return scored[0]?.route ?? null;
}

function FieldGroup007I({ language, titleKey, rows, emptyKey }: { language: AdminLanguage; titleKey: string; rows: Array<[string, unknown]>; emptyKey: string }) {
  return <article className="taxi007i-fieldGroup"><h3>{tx007I(language, titleKey)}</h3>{rows.length ? <div>{rows.map(([key, value]) => <p key={key}><span>{tx007I(language, "rawField")}: {key}</span><b>{text007I(value)}</b></p>)}</div> : <em>{tx007I(language, emptyKey)}</em>}</article>;
}

function Bar007I({ label, value }: { label: string; value: number }) {
  return <div className="taxi007i-bar"><span>{label}</span><b style={{ width: `${Math.max(6, Math.min(100, value))}%` }} /><strong>{value}%</strong></div>;
}

export function TaxiAdminControl007IPanel({ language, config, setNotice }: Props007I) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<BackendResult007I[]>([]);
  const [last, setLast] = useState<BackendResult007I | null>(null);
  const [activeTab, setActiveTab] = useState<WorkTab007I>("applications");
  const [activeQueue, setActiveQueue] = useState<QueueKey007I>("applications");
  const [selected, setSelected] = useState<JsonRecord007I | null>(null);
  const [manualId, setManualId] = useState("");
  const [actionKey, setActionKey] = useState("reviewApplication");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [queueSearch, setQueueSearch] = useState("");
  const [journal, setJournal] = useState<Journal007I[]>([]);
  const [legacyOpen, setLegacyOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);

  const callSource = useCallback(async (source: Source007I): Promise<BackendResult007I> => {
    const started = Date.now();
    let response: Response | null = null;
    let payload: unknown = null;
    try {
      response = await fetch(`${config.baseUrl}${source.path}`, {
        method: source.method,
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": config.token },
        body: source.method === "GET" ? undefined : JSON.stringify(source.body ?? { source: MARKER007I, fakeSuccessBlocked: true }),
      });
      const text = await response.text();
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    } catch (error) {
      payload = { error: error instanceof Error ? error.message : String(error) };
    }
    const status = response?.status ?? 0;
    const message = response?.ok ? "ok" : resultMessage007I(payload, status);
    return { key: source.key, titleKey: source.titleKey, path: source.path, method: source.method, ok: response?.ok ?? false, status, message, payload, at: new Date().toISOString(), ms: Date.now() - started };
  }, [config.baseUrl, config.token]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    try {
      const loaded = await Promise.all(SOURCES007I.map((source) => callSource(source)));
      setResults(loaded);
      setLast(loaded[loaded.length - 1] ?? null);
      setNotice(`Taxi 007I · ${loaded.filter((item) => item.ok).length}/${loaded.length}`);
    } finally {
      setBusy(false);
    }
  }, [callSource, setNotice]);

  useEffect(() => { void refreshAll(); }, [refreshAll]);

  const routes = useMemo(() => results.flatMap((item) => item.key === "routes" ? collectRoutes007I(item.payload) : []), [results]);
  const rowsByQueue = useMemo(() => queueRows007I(results), [results]);
  const queues = useMemo(() => (Object.keys(QUEUE_META007I) as QueueKey007I[]).map((key) => ({ key, ...QUEUE_META007I[key], rows: rowsByQueue[key] ?? [] })), [rowsByQueue]);
  const currentTab = WORK_TABS007I.find((tab) => tab.key === activeTab) ?? WORK_TABS007I[0];
  const visibleQueues = queues.filter((queue) => currentTab.queues.includes(queue.key));
  const active = queues.find((queue) => queue.key === activeQueue) ?? visibleQueues[0] ?? queues[0];
  const actions = ACTIONS007I.filter((action) => action.queue === active.key);
  const action = actions.find((item) => item.key === actionKey) ?? actions[0] ?? ACTIONS007I[0];
  const route = useMemo(() => findRoute007I(routes, action), [routes, action]);
  const selectedId = manualId.trim() || firstId007I(selected, action.idKeys);
  const checklistOk = active.requiredReview.every((item) => checked[`${active.key}:${item}`]);
  const reasonOk = !action.needsReason || adminReason.trim().length >= 8;
  const ownerOk = !action.needsOwnerApproval || ownerApprovalId.trim().length >= 4;
  const canRun = Boolean(route?.path && selectedId && checklistOk && reasonOk && ownerOk && !busy);

  useEffect(() => {
    const firstQueue = currentTab.queues[0] ?? "applications";
    setActiveQueue(firstQueue);
    setActionKey(ACTIONS007I.find((item) => item.queue === firstQueue)?.key ?? ACTIONS007I[0].key);
    setChecked({});
    setManualId("");
    setQueueSearch("");
  }, [activeTab, currentTab.queues]);

  useEffect(() => {
    setSelected(active.rows[0] ?? null);
    setChecked({});
    setManualId("");
    setActionKey(ACTIONS007I.find((item) => item.queue === active.key)?.key ?? ACTIONS007I[0].key);
  }, [active.key, active.rows]);

  const runAction = async () => {
    if (!route?.path || !route.method) return;
    const method = route.method.toUpperCase() as Method007I;
    setBusy(true);
    const body = {
      source: MARKER007I,
      fakeSuccessBlocked: true,
      language,
      uiCopyMode: "single_language_dictionary_007i",
      action: action.key,
      payloadKind: action.payloadKind,
      selectedId,
      selectedRecord: selected,
      adminReason: adminReason.trim(),
      ownerApprovalId: ownerApprovalId.trim() || null,
      reviewChecklist: active.requiredReview.reduce<Record<string, boolean>>((acc, item) => { acc[item] = checked[`${active.key}:${item}`] === true; return acc; }, {}),
    };
    const result = await callSource({ key: action.key, titleKey: action.titleKey, path: route.path, method, body });
    setLast(result);
    setResults((prev) => [...prev.filter((item) => item.key !== action.key), result]);
    let synced = false;
    if (result.ok) { await refreshAll(); synced = true; }
    setJournal((prev) => [{ id: `${Date.now()}-${action.key}`, actionKey: action.key, queue: active.key, recordId: selectedId, ok: result.ok, status: result.status, message: result.message, at: new Date().toISOString(), route: `${method} ${route.path}`, synced }, ...prev].slice(0, 20));
    setBusy(false);
  };

  const sourceOk = results.filter((item) => item.ok).length;
  const loadedRows = queues.reduce((sum, item) => sum + item.rows.length, 0);
  const filteredRows = useMemo(() => {
    const q = queueSearch.trim().toLowerCase();
    if (!q) return active.rows;
    return active.rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [active.rows, queueSearch]);
  const driverRows = pickFields007I(selected, [/driver/i, /name/i, /phone/i, /kyc/i, /identity/i, /license/i, /region/i]);
  const vehicleRows = pickFields007I(selected, [/vehicle/i, /car/i, /plate/i, /model/i, /color/i, /insurance/i, /registration/i]);
  const safetyRows = pickFields007I(selected, [/risk/i, /fraud/i, /safety/i, /complaint/i, /status/i, /state/i, /score/i]);
  const financeRows = pickFields007I(selected, [/balance/i, /settlement/i, /amount/i, /hold/i, /commission/i, /reward/i, /bonus/i, /gift/i]);
  const photos = photoFields007I(selected);
  const dataQuality = [driverRows, vehicleRows, safetyRows, financeRows, photos].filter((rows) => rows.length > 0).length;
  const evidenceCoverage = Math.round((dataQuality / 5) * 100);
  const sourceCoverage = Math.round((sourceOk / SOURCES007I.length) * 100);
  const routeCoverage = Math.min(100, Math.round((routes.length / Math.max(1, ACTIONS007I.length)) * 100));
  const blockers = [
    !route?.path ? tx007I(language, "routeMissing") : null,
    !selectedId ? tx007I(language, "recordIdRequired") : null,
    !checklistOk ? tx007I(language, "checklistRequired") : null,
    !reasonOk ? tx007I(language, "reasonRequired") : null,
    !ownerOk ? tx007I(language, "ownerRequired") : null,
  ].filter(Boolean) as string[];

  return <section className="taxi007i" data-admin-ui-taxi-007i-language-quality="ready" data-admin-ui-taxi-007i-locale-map="ru-en-uz-zh" data-admin-ui-taxi-007i-no-mixed-ui-copy="ready">
    <header className="taxi007i-hero">
      <div>
        <p>{MARKER007I}</p>
        <h1>{tx007I(language, "pageTitle")}</h1>
        <span>{tx007I(language, "pageSubtitle")}</span>
      </div>
      <div className="taxi007i-actions">
        <button onClick={refreshAll} disabled={busy}>{busy ? tx007I(language, "loading") : tx007I(language, "refresh")}</button>
        <button onClick={() => setSourceOpen((value) => !value)}>{sourceOpen ? tx007I(language, "hide") : tx007I(language, "diagnostics")}</button>
      </div>
    </header>

    <section className="taxi007i-languageCard" data-admin-ui-taxi-007i-language-board="ready">
      <article>
        <h2>{tx007I(language, "languageQuality")}</h2>
        <p>{tx007I(language, "languageQualityText")}</p>
      </article>
      <div><b>{tx007I(language, "currentLanguage")}</b><span>{language.toUpperCase()}</span></div>
      <div><b>{tx007I(language, "cleanCopy")}</b><span>{tx007I(language, "noMixedText")}</span></div>
      <div><b>{tx007I(language, "technicalOnly")}</b><span>{tx007I(language, "backendRoute")}</span></div>
    </section>

    <section className="taxi007i-steps">
      {["stepLoad", "stepQueue", "stepReview", "stepDecision", "stepSync"].map((key) => <span key={key}>{tx007I(language, key)}</span>)}
    </section>

    <section className="taxi007i-workTabs">
      {WORK_TABS007I.map((tab) => <button key={tab.key} className={tab.key === activeTab ? "active" : ""} onClick={() => setActiveTab(tab.key)}><b>{tx007I(language, tab.titleKey)}</b><span>{tx007I(language, tab.descriptionKey)}</span></button>)}
    </section>

    <section className="taxi007i-main">
      <aside className="taxi007i-panel taxi007i-queues">
        <header><h2>{tx007I(language, currentTab.titleKey)}</h2><p>{tx007I(language, currentTab.descriptionKey)}</p></header>
        <div className="taxi007i-queueButtons">{visibleQueues.map((queue) => <button key={queue.key} className={queue.key === active.key ? `active tone-${queue.tone}` : `tone-${queue.tone}`} onClick={() => setActiveQueue(queue.key)}><b>{tx007I(language, QUEUE_META007I[queue.key].titleKey)}</b><span>{queue.rows.length}</span><small>{tx007I(language, QUEUE_META007I[queue.key].subtitleKey)}</small></button>)}</div>
        <label className="taxi007i-search"><span>{tx007I(language, "search")}</span><input value={queueSearch} onChange={(event) => setQueueSearch(event.target.value)} placeholder={tx007I(language, "searchPlaceholder")} /></label>
        <div className="taxi007i-recordList">{filteredRows.length ? filteredRows.slice(0, 18).map((row, index) => {
          const id = firstId007I(row, ["id", "applicationId", "driverApplicationId", "driverId", "vehicleId", "tripId", "complaintId", "settlementId", "rewardId"]);
          return <button key={`${active.key}-${id || index}`} className={row === selected ? "selected" : ""} onClick={() => setSelected(row)}><b>{id || `row-${index + 1}`}</b><span>{text007I(row.status ?? row.state ?? row.kind ?? row.type)}</span><small>{text007I(row.name ?? row.fullName ?? row.driverName ?? row.phone ?? row.region ?? row.createdAt)}</small></button>;
        }) : <div className="taxi007i-empty">{queueSearch.trim() ? tx007I(language, "noSearchRows") : tx007I(language, "noRows")}</div>}</div>
      </aside>

      <main className="taxi007i-panel taxi007i-dossier">
        <header><h2>{tx007I(language, "dossier")}</h2><p>{selectedId || tx007I(language, "selectedId")}</p></header>
        <div className="taxi007i-dossierGrid">
          <FieldGroup007I language={language} titleKey="driver" rows={driverRows} emptyKey="missingDriver" />
          <FieldGroup007I language={language} titleKey="vehicle" rows={vehicleRows} emptyKey="missingVehicle" />
          <FieldGroup007I language={language} titleKey="safety" rows={safetyRows} emptyKey="missingSafety" />
          <FieldGroup007I language={language} titleKey="finance" rows={financeRows} emptyKey="missingFinance" />
        </div>
        <section className="taxi007i-docs"><header><h3>{tx007I(language, "photos")}</h3><span>{photos.length}</span></header>{photos.length ? <div>{photos.map(([key, url]) => <a key={key} href={url} target="_blank" rel="noreferrer"><span>{key}</span><b>{tx007I(language, "open")}</b></a>)}</div> : <em>{tx007I(language, "missingPhotos")}</em>}</section>
      </main>

      <aside className="taxi007i-panel taxi007i-decision">
        <header><h2>{tx007I(language, "decisionPanel")}</h2><p>{tx007I(language, "backendOnly")}</p></header>
        <strong>{tx007I(language, "action")}</strong>
        <div className="taxi007i-actionList">{actions.map((item) => <button key={item.key} className={item.key === action.key ? `active tone-${item.tone}` : `tone-${item.tone}`} onClick={() => setActionKey(item.key)}><b>{tx007I(language, item.titleKey)}</b><span>{tx007I(language, item.descriptionKey)}</span></button>)}</div>
        <strong>{tx007I(language, "reviewChecklist")}</strong>
        <div className="taxi007i-checklist">{active.requiredReview.map((item) => <label key={item}><input type="checkbox" checked={checked[`${active.key}:${item}`] === true} onChange={(event) => setChecked((prev) => ({ ...prev, [`${active.key}:${item}`]: event.target.checked }))} /><span>{tx007I(language, REVIEW_LABEL_KEY007I[item] ?? item)}</span></label>)}</div>
        <label><span>{tx007I(language, "selectedId")}</span><input value={manualId || selectedId} onChange={(event) => setManualId(event.target.value)} placeholder={tx007I(language, "selectedId")} /></label>
        <label><span>{tx007I(language, "reason")}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder={tx007I(language, "reasonPlaceholder")} /></label>
        <label><span>{tx007I(language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder={tx007I(language, "ownerApprovalPlaceholder")} /></label>
        <div className="taxi007i-route"><span>{tx007I(language, "backendRoute")}</span><b>{route?.method ?? DASH} {route?.path ?? tx007I(language, "routeMissing")}</b><small>{route?.safeDisabledUntilNextStage ? tx007I(language, "locked") : tx007I(language, "backendOnly")}</small></div>
        <button className="taxi007i-run" disabled={!canRun} onClick={runAction}>{canRun ? tx007I(language, "sendBackend") : tx007I(language, "blocked")}</button>
        {blockers.length ? <div className="taxi007i-blockers"><b>{tx007I(language, "blockers")}</b><ul>{blockers.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
      </aside>
    </section>

    <section className="taxi007i-qualityGrid" data-admin-ui-taxi-007i-data-quality="ready">
      <article className="taxi007i-panel"><header><h2>{tx007I(language, "reportsTitle")}</h2><p>{tx007I(language, "loaded")}: {loadedRows}</p></header><Bar007I label={tx007I(language, "sourceCoverage")} value={sourceCoverage} /><Bar007I label={tx007I(language, "routeCoverage")} value={routeCoverage} /><Bar007I label={tx007I(language, "evidenceCoverage")} value={evidenceCoverage} /></article>
      <article className="taxi007i-panel"><header><h2>{tx007I(language, "dataQuality")}</h2></header><div className="taxi007i-qualityList">{[["driver", driverRows.length], ["vehicle", vehicleRows.length], ["photos", photos.length], ["safety", safetyRows.length], ["finance", financeRows.length]].map(([key, count]) => <div key={String(key)} className={Number(count) > 0 ? "ok" : "bad"}><b>{tx007I(language, String(key))}</b><span>{Number(count) > 0 ? tx007I(language, "returned") : tx007I(language, "missing")}</span><strong>{count}</strong></div>)}</div></article>
      <article className="taxi007i-panel"><header><h2>{tx007I(language, "actionJournal")}</h2></header>{journal.length ? <div className="taxi007i-journal">{journal.map((item) => <div key={item.id} className={item.ok ? "ok" : "bad"}><b>{tx007I(language, ACTIONS007I.find((actionItem) => actionItem.key === item.actionKey)?.titleKey ?? "action")}</b><span>{tx007I(language, QUEUE_META007I[item.queue].titleKey)} · {item.recordId || DASH}</span><small>HTTP {item.status} · {item.message} · {item.synced ? tx007I(language, "syncDone") : tx007I(language, "syncNotChanged")}</small></div>)}</div> : <div className="taxi007i-empty">{tx007I(language, "noActions")}</div>}</article>
    </section>

    <section className="taxi007i-bottom">
      <article className="taxi007i-panel taxi007i-sources" data-admin-ui-taxi-007i-source-health="ready"><header><h2>{tx007I(language, "sourceHealth")}</h2><button onClick={() => setSourceOpen((value) => !value)}>{sourceOpen ? tx007I(language, "hide") : tx007I(language, "show")}</button></header><div>{SOURCES007I.map((source) => { const item = results.find((result) => result.key === source.key); return <button key={source.key} className={item?.ok ? "ok" : "bad"} onClick={() => void callSource(source).then((result) => { setLast(result); setResults((prev) => [...prev.filter((old) => old.key !== result.key), result]); })}><b>{tx007I(language, source.titleKey)}</b><span>{item ? `HTTP ${item.status}` : tx007I(language, "notLoaded")}</span><small>{source.method} {source.path}</small></button>; })}</div>{sourceOpen ? <pre>{JSON.stringify(results.map(({ key, ok, status, path, ms, message }) => ({ key, ok, status, path, ms, message })), null, 2)}</pre> : null}</article>
      <article className="taxi007i-panel"><header><h2>{tx007I(language, "latestResponse")}</h2><p>{last ? `HTTP ${last.status} · ${last.ms}ms` : DASH}</p></header>{last ? <div className={last.ok ? "taxi007i-response ok" : "taxi007i-response bad"}><b>{tx007I(language, last.titleKey)}</b><span>{last.method} {last.path}</span><small>{last.message}</small><pre>{JSON.stringify(last.payload, null, 2)}</pre></div> : <div className="taxi007i-empty">{tx007I(language, "notLoaded")}</div>}</article>
    </section>

    <section className="taxi007i-panel taxi007i-legacy">
      <button onClick={() => setLegacyOpen((value) => !value)}>{legacyOpen ? tx007I(language, "hideLegacy") : tx007I(language, "showLegacy")}</button>
      {legacyOpen ? <TaxiAdminControl007HPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
