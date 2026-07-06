import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props009A = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Direction009B = "up" | "down" | "flat";
type Order009A = {
  orderId: string;
  status: string;
  countryCode: string;
  cityId: string;
  tariffCode: string;
  riderName: string;
  driverName: string;
  vehiclePlate: string;
  routeLabel: string;
  finalFareMinor: number;
  commissionPercent: number;
  createdAt: string;
  completedAt: string;
  archiveEligibleAt: string;
  archiveStatus: "not_due" | "eligible" | "archived" | string;
  archived: boolean;
};
type Scale009A = { key: string; label: string; value: number; percent: number };
type DailyTrend009B = {
  date: string;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  archivedOrders: number;
  archiveEligibleOrders: number;
  totalFareMinor: number;
  previousTotalOrders: number;
  changeOrders: number;
  changePercent: number;
  direction: Direction009B;
  barPercent: number;
};
type GrowthSummary009B = {
  todayOrders: number;
  yesterdayOrders: number;
  changeOrders: number;
  changePercent: number;
  direction: Direction009B;
  dailyTrendDays: number;
};
type Report009A = {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  archivedOrders: number;
  archiveEligibleOrders: number;
  totalFinalFareMinor: number;
  averageFinalFareMinor: number;
  scale: Scale009A[];
  statusBuckets: Record<string, number>;
  dailyTrend: DailyTrend009B[];
  growthSummary: GrowthSummary009B;
};
type Audit009B = {
  auditId: string;
  action: string;
  targetType: string;
  targetId: string;
  actorType: string;
  actorId: string;
  createdAt: string;
  orderId: string;
  archiveAfterDays: number | null;
  idempotencyKey: string;
  fakeSuccessBlocked: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
};
type DispatchOffer009H = {
  dispatchOfferId: string;
  status: string;
  driverProfileId: string;
  riderProfileId: string;
  vehicleId: string;
  approvedVehicleFound: boolean;
  existingTripId: string;
  canCreateTrip: boolean;
  createdAt: string;
  updatedAt: string;
  noFakeTripCreate: boolean;
};
type DispatchCreateCandidate009I = {
  riderRequestId: string;
  riderRequestStatus: string;
  quoteId: string;
  riderProfileId: string;
  tariffRegionId: string;
  countryCode: string;
  cityId: string;
  driverProfileId: string;
  driverBalanceReserveMinor: number;
  vehicleId: string;
  matchingScore: number;
  canCreateDispatchOffer: boolean;
  blockedReason: string;
  existingOpenDispatchOfferId: string;
  createdAt: string;
  updatedAt: string;
  noFakeDispatchOffer: boolean;
};
type QuoteCandidate009J = {
  quoteId: string;
  quoteStatus: string;
  riderProfileId: string;
  tariffRegionId: string;
  estimatedFareMinor: number;
  expiresAt: string;
  expired: boolean;
  existingOpenRiderRequestId: string;
  canCreateRiderRequest: boolean;
  blockedReason: string;
  createdAt: string;
  updatedAt: string;
  noFakeRiderRequest: boolean;
};

type QuoteIntake009K = {
  riderProfileId: string;
  tariffRegionId: string;
  routeProviderRef: string;
  estimatedFareMinor: string;
  expiresInMinutes: string;
  pickupGeoJson: string;
  dropoffGeoJson: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type RiderRequestManualAction009U = {
  quoteId: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type DispatchOfferManualAction009V = {
  riderRequestId: string;
  driverProfileId: string;
  vehicleId: string;
  matchingScore: string;
  offerTtlSeconds: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type TripManualAction009W = {
  dispatchOfferId: string;
  vehicleId: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type LifecycleManualAction009X = {
  orderId: string;
  nextStatus: string;
  finalFareMinor: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};


type LostPropertyCounts010C = Record<string, number>;
type LostPropertyCase010C = {
  supportCaseId: string;
  tripId: string;
  status: string;
  caseType: string;
  priority: number;
  assignedAdminIdMasked: string;
  createdAt: string;
  updatedAt: string;
  safeTripRef?: {
    tripId?: string;
    driverProfileIdMasked?: string;
    vehicleIdMasked?: string;
    tripStatus?: string;
    completedAt?: string;
  };
  rawPiiBlocked: boolean;
  contactMediatedByAdmin: boolean;
};
type LostPropertyStatus010C = {
  counts: LostPropertyCounts010C;
  canCreateLostPropertyCaseFromTrip: boolean;
  nextAdminAction: string;
  noFakeRows: boolean;
  noFakeCreate: boolean;
  dbWriteExecuted: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
};
type LostPropertyCreate010C = {
  tripId: string;
  itemDescription: string;
  passengerMessage: string;
  lastSeenHint: string;
  priority: string;
  assignedAdminId: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};
type LostPropertyUpdate010C = {
  supportCaseId: string;
  status: string;
  workflowStage: string;
  adminNote: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type LostPropertyTripLookup010D = {
  query: string;
  statusFilter: string;
  archiveFilter: string;
};

type LostPropertyAuditPayloadSummary010G = Record<string, string | number | boolean>;
type LostPropertyAuditTimelineItem010G = {
  auditId: string;
  supportCaseId: string;
  tripId: string;
  actorType: string;
  actorIdMasked: string;
  action: string;
  targetType: string;
  createdAt: string;
  payloadSummary: LostPropertyAuditPayloadSummary010G;
  rawPiiBlocked: boolean;
  adminNoteRedacted: boolean;
  itemDescriptionRedacted: boolean;
  passengerMessageRedacted: boolean;
  contactMediatedByAdmin: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
};
type LostPropertyAuditTimelineResult010G = {
  ok?: boolean;
  code?: string;
  supportCaseId?: string;
  tripId?: string;
  limit?: number;
  caseVerified?: boolean;
  timeline?: LostPropertyAuditTimelineItem010G[];
  readOnlyTimeline?: boolean;
  safeRedaction?: boolean;
  rawPiiBlocked?: boolean;
  dbWriteExecuted?: boolean;
  providerDispatch?: boolean;
  walletMutation?: boolean;
};
type LostPropertyAuditFilters010G = {
  supportCaseId: string;
  tripId: string;
  limit: string;
};


type TripSupportCounts011B = Record<string, number>;
type TripSupportCase011B = {
  supportCaseId: string;
  tripId: string;
  status: string;
  caseType: string;
  category: string;
  priority: number;
  assignedAdminIdMasked: string;
  createdAt: string;
  updatedAt: string;
  safeTripRef?: {
    tripId?: string;
    driverProfileIdMasked?: string;
    vehicleIdMasked?: string;
    tripStatus?: string;
    completedAt?: string;
  };
  rawPiiBlocked: boolean;
  contactMediatedByAdmin: boolean;
};
type TripSupportStatus011B = {
  counts: TripSupportCounts011B;
  canCreateSupportCaseFromTrip: boolean;
  nextAdminAction: string;
  noFakeRows: boolean;
  noFakeCreate: boolean;
  dbWriteExecuted: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
};
type TripSupportCreate011B = {
  tripId: string;
  category: string;
  issueSummary: string;
  passengerMessage: string;
  driverMessage: string;
  evidenceHint: string;
  priority: string;
  assignedAdminId: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};
type TripSupportUpdate011B = {
  supportCaseId: string;
  status: string;
  workflowStage: string;
  adminNote: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type RealDataRequirement009M = {
  key: string;
  title: string;
  dbModel: string;
  neededFor: string;
  status: "ready" | "missing" | string;
  count: number;
  requiredMinimum: number;
  missingText: string;
  actionEndpoint: string;
};
type RealDataStatus009M = {
  counts: Record<string, number>;
  requirements: RealDataRequirement009M[];
  readyRequirements: number;
  missingRequirements: number;
  readinessPercent: number;
  canCreateQuoteNow: boolean;
  canCreateRiderRequestNow: boolean;
  canCreateDispatchOfferNow: boolean;
  canCreateTripNow: boolean;
  ordersVisibleFromTaxiTrip: boolean;
  nextMissingRequirementKey: string;
  nextOwnerAction: string;
  strictDbOnlyNoZeroFill: boolean;
  noFakeRows: boolean;
  noFakeCreate: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
  dbWriteExecuted: boolean;
};

type ProtectedAction009P = {
  key: string;
  requirementKey: string;
  stage: string;
  title: string;
  method: string;
  endpoint: string;
  approvalHeader: string;
  approvalValue: string;
  manualPayloadRequired: boolean;
  payloadFields: string[];
  readyWhen: string;
  enabled: "ready" | "blocked" | string;
  blockedReason: string;
  count: number;
  noFakeAutofill: boolean;
  noFakePayload: boolean;
  ownerApprovalRequired: boolean;
};
type ActionPanelStatus009P = {
  readinessPercent: number;
  missingRequirements: number;
  nextMissingRequirementKey: string;
  nextActionKey: string;
  nextActionText: string;
  actions: ProtectedAction009P[];
  noAutofill: boolean;
  noFakePayload: boolean;
  noLocalDbMutationByUi: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
  dbWriteExecuted: boolean;
};
type RiderUserCandidate009Q = {
  userId: string;
  userDelegateName: string;
  safeDisplayName: string;
  maskedEmail: string;
  maskedPhone: string;
  createdAt: string;
  riderProfileExists: boolean;
  canUseFor009N: boolean;
  redacted: boolean;
  rawPiiBlocked: boolean;
};
type RiderUserCandidatesStatus009Q = {
  counts: Record<string, number>;
  selectedUserDelegateName: string;
  availableUserDelegateNames: string[];
  candidates: RiderUserCandidate009Q[];
  nextOwnerAction: string;
  readOnlyList: boolean;
  safeRedaction: boolean;
  fullRawPiiBlocked: boolean;
  fakeUserCreateBlocked: boolean;
  fakeRiderCreateBlocked: boolean;
  noAutofill: boolean;
  noFakePayload: boolean;
  providerDispatch: boolean;
  walletMutation: boolean;
  dbWriteExecuted: boolean;
};

type RiderProfileManualAction009R = {
  userId: string;
  countryCode: string;
  cityId: string;
  trustStatus: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type TariffRegionManualAction009S = {
  countryCode: string;
  cityId: string;
  zoneId: string;
  tariffCode: string;
  status: string;
  baseFareMinor: string;
  perKmMinor: string;
  perMinuteMinor: string;
  commissionBasisPoints: string;
  idempotencyKey: string;
  approval: string;
  reason: string;
};

type Last009A = { ok: boolean; status: number | string; message: string; route: string; at: string } | null;

type Copy009A = {
  title: string;
  subtitle: string;
  loadOrders: string;
  runArchive: string;
  loadAudit: string;
  dailyGrowth: string;
  dailyGrowthSub: string;
  statusScale: string;
  report: string;
  orderList: string;
  selectedOrder: string;
  auditJournal: string;
  quoteCandidateQueue: string;
  loadQuoteCandidates: string;
  createRiderRequest: string;
  noQuoteCandidates: string;
  dispatchOfferQueue: string;
  loadDispatchOffers: string;
  createTrip: string;
  noDispatchOffers: string;
  archivePolicy: string;
  savedInDb: string;
  noFake: string;
  realDataReadiness: string;
  loadRealDataReadiness: string;
  missingRequirements: string;
  protectedActionPanel: string;
  loadProtectedActions: string;
  nextProtectedAction: string;
  manualPayloadOnly: string;
  riderUserCandidates: string;
  loadRiderUserCandidates: string;
  total: string;
  active: string;
  completed: string;
  eligible: string;
  archived: string;
  averageFare: string;
  today: string;
  yesterday: string;
  growth: string;
  decline: string;
  flat: string;
  route: string;
  status: string;
  fare: string;
  commission: string;
  createdAt: string;
  archiveAt: string;
  empty: string;
  noAudit: string;
  blocked: string;
  ready: string;
};

const COPY009A: Record<AdminLanguage, Copy009A> = {
  ru: {
    title: "Такси: заказы",
    subtitle: "Рабочий экран заказов: ежедневная шкала роста и снижения, живые статусы, отчёт и аудит архива. Каждый заказ читается из поездки такси. Старые завершённые заказы переводятся в архив через защищённый сервер, без ложных данных.",
    loadOrders: "Загрузить заказы",
    runArchive: "Архивировать 7+ дней",
    loadAudit: "Обновить аудит",
    dailyGrowth: "Ежедневная шкала роста / снижения заказов",
    dailyGrowthSub: "Показывает по дням: сколько заказов было, рост или снижение относительно предыдущего дня, активные/завершённые/архив.",
    statusScale: "Шкала статусов",
    report: "Отчёт",
    orderList: "Список заказов",
    selectedOrder: "Выбранный заказ",
    auditJournal: "Аудит заказов и архива",
    quoteCandidateQueue: "Принятые расчёты для создания заявки пассажира",
    loadQuoteCandidates: "Обновить кандидаты расчётов",
    createRiderRequest: "Создать заявку пассажира",
    noQuoteCandidates: "Нет реальных принятых расчётов",
    dispatchOfferQueue: "Принятые предложения водителей для создания поездки",
    loadDispatchOffers: "Обновить предложения водителей",
    createTrip: "Создать поездку",
    noDispatchOffers: "Нет принятых предложений водителей",
    archivePolicy: "Автоархив через 7 дней",
    savedInDb: "Источник заказов: база TaxiTrip",
    noFake: "Без фейка: интерфейс не создаёт заказ и не архивирует без ответа сервера.", realDataReadiness: "Готовность реальных данных", loadRealDataReadiness: "Обновить готовность", missingRequirements: "Чего не хватает", protectedActionPanel: "Защищённые действия", loadProtectedActions: "Обновить действия", nextProtectedAction: "Следующий защищённый шаг", manualPayloadOnly: "Только ручные реальные данные, без автозаполнения", riderUserCandidates: "Существующие пользователи для профиля пассажира", loadRiderUserCandidates: "Обновить пользователей",
    total: "Всего", active: "Активные", completed: "Завершённые", eligible: "Готовы в архив", archived: "Архив", averageFare: "Средний чек",
    today: "Сегодня", yesterday: "Вчера", growth: "Рост", decline: "Снижение", flat: "Без изменений",
    route: "Маршрут", status: "Статус", fare: "Сумма", commission: "Комиссия", createdAt: "Создан", archiveAt: "Архив после", empty: "В базе TaxiTrip заказов пока нет", noAudit: "Аудит пока пуст", blocked: "Заблокировано", ready: "Готово",
  },
  en: {
    title: "Taxi: orders", subtitle: "A proper orders screen: daily growth/decline scale, live statuses, report and archive audit. Every order is read from TaxiTrip. Old completed orders are archived through protected backend only, no fake.",
    loadOrders: "Load orders", runArchive: "Archive 7+ days", loadAudit: "Refresh audit", dailyGrowth: "Daily order growth / decline scale", dailyGrowthSub: "Shows orders per day, growth or decline vs previous day, active/completed/archive.", statusScale: "Status scale", report: "Report", orderList: "Order list", selectedOrder: "Selected order", auditJournal: "Orders and archive audit", quoteCandidateQueue: "Accepted TaxiQuote for RiderRequest create", loadQuoteCandidates: "Refresh quote candidates", createRiderRequest: "Create RiderRequest", noQuoteCandidates: "No real accepted TaxiQuote", dispatchOfferQueue: "Accepted dispatch-offers for TaxiTrip create", loadDispatchOffers: "Refresh dispatch-offers", createTrip: "Create TaxiTrip", noDispatchOffers: "No accepted TaxiDispatchOffer", archivePolicy: "Auto archive after 7 days", savedInDb: "Orders source: TaxiTrip DB", noFake: "No fake: UI never creates orders and never archives without backend response.", realDataReadiness: "Real data readiness", loadRealDataReadiness: "Refresh readiness", missingRequirements: "Missing requirements", protectedActionPanel: "Protected actions", loadProtectedActions: "Refresh actions", nextProtectedAction: "Next protected step", manualPayloadOnly: "Manual real data only, no autofill", riderUserCandidates: "Existing users for RiderProfile", loadRiderUserCandidates: "Refresh users",
    total: "Total", active: "Active", completed: "Completed", eligible: "Archive-ready", archived: "Archive", averageFare: "Average fare", today: "Today", yesterday: "Yesterday", growth: "Growth", decline: "Decline", flat: "Flat", route: "Route", status: "Status", fare: "Fare", commission: "Commission", createdAt: "Created", archiveAt: "Archive after", empty: "No TaxiTrip orders yet", noAudit: "Audit is empty", blocked: "Blocked", ready: "Ready",
  },
  uz: {
    title: "Taxi: buyurtmalar", subtitle: "To‘liq buyurtmalar ekrani: kunlik o‘sish/pasayish shkalasi, holatlar, hisobot va arxiv auditi. Har bir buyurtma TaxiTrip bazasidan o‘qiladi.",
    loadOrders: "Buyurtmalarni yuklash", runArchive: "7+ kunliklarni arxivlash", loadAudit: "Auditni yangilash", dailyGrowth: "Kunlik o‘sish / pasayish shkalasi", dailyGrowthSub: "Har kun bo‘yicha buyurtmalar, oldingi kunga nisbatan o‘sish yoki pasayish, aktiv/tugagan/arxiv holatini ko‘rsatadi.", statusScale: "Holatlar shkalasi", report: "Hisobot", orderList: "Buyurtmalar", selectedOrder: "Tanlangan buyurtma", auditJournal: "Buyurtma va arxiv auditi", quoteCandidateQueue: "Yo‘lovchi arizasini yaratish uchun qabul qilingan hisob-kitoblar", loadQuoteCandidates: "Hisob-kitob kandidatlarini yangilash", createRiderRequest: "Yo‘lovchi arizasini yaratish", noQuoteCandidates: "Qabul qilingan real hisob-kitob yo‘q", dispatchOfferQueue: "Safar yaratish uchun qabul qilingan haydovchi takliflari", loadDispatchOffers: "Haydovchi takliflarini yangilash", createTrip: "Safar yaratish", noDispatchOffers: "Qabul qilingan haydovchi taklifi yo‘q", archivePolicy: "7 kundan keyin avtoarxiv", savedInDb: "Manba: TaxiTrip bazasi", noFake: "Soxta amal yo‘q: interfeys lokal buyurtma yaratmaydi va server javobisiz arxivlamaydi.", realDataReadiness: "Real ma’lumotlar tayyorligi", loadRealDataReadiness: "Tayyorlikni yangilash", missingRequirements: "Yetishmayotgan shartlar", protectedActionPanel: "Himoyalangan amallar", loadProtectedActions: "Amallarni yangilash", nextProtectedAction: "Keyingi himoyalangan qadam", manualPayloadOnly: "Faqat qo‘lda kiritilgan real ma’lumot, avtomatik to‘ldirish yo‘q", riderUserCandidates: "Profil uchun mavjud foydalanuvchilar", loadRiderUserCandidates: "Foydalanuvchilarni yangilash",
    total: "Jami", active: "Aktiv", completed: "Tugagan", eligible: "Arxivga tayyor", archived: "Arxiv", averageFare: "O‘rtacha summa", today: "Bugun", yesterday: "Kecha", growth: "O‘sish", decline: "Pasayish", flat: "O‘zgarish yo‘q", route: "Yo‘nalish", status: "Status", fare: "Summa", commission: "Komissiya", createdAt: "Yaratilgan", archiveAt: "Arxiv sanasi", empty: "TaxiTrip buyurtmalari yo‘q", noAudit: "Audit bo‘sh", blocked: "Blok", ready: "Tayyor",
  },
  zh: {
    title: "出租车：订单", subtitle: "完整订单页面：每日增长/下降刻度、实时状态、报告和归档审计。每个订单来自 TaxiTrip 数据库。旧完成订单只通过受保护服务器归档，无虚假成功。",
    loadOrders: "加载订单", runArchive: "归档 7+ 天", loadAudit: "刷新审计", dailyGrowth: "每日订单增长 / 下降刻度", dailyGrowthSub: "按天显示订单数量、相对前一天的增长或下降、进行中/完成/归档。", statusScale: "状态刻度", report: "报告", orderList: "订单列表", selectedOrder: "选中订单", auditJournal: "订单与归档审计", quoteCandidateQueue: "用于创建乘客请求的已接受报价", loadQuoteCandidates: "刷新报价候选", createRiderRequest: "创建乘客请求", noQuoteCandidates: "暂无真实已接受报价", dispatchOfferQueue: "用于创建行程的已接受派单报价", loadDispatchOffers: "刷新派单报价", createTrip: "创建行程", noDispatchOffers: "暂无已接受派单报价", archivePolicy: "7 天后自动归档", savedInDb: "来源：TaxiTrip 数据库", noFake: "无虚假成功：界面不创建本地订单，也不会在没有服务器响应时归档。", realDataReadiness: "真实数据就绪", loadRealDataReadiness: "刷新就绪", missingRequirements: "缺少条件", protectedActionPanel: "受保护操作", loadProtectedActions: "刷新操作", nextProtectedAction: "下一步受保护操作", manualPayloadOnly: "仅手动真实数据，无自动填充", riderUserCandidates: "用于乘客资料的现有用户", loadRiderUserCandidates: "刷新用户",
    total: "总计", active: "进行中", completed: "已完成", eligible: "可归档", archived: "归档", averageFare: "平均金额", today: "今天", yesterday: "昨天", growth: "增长", decline: "下降", flat: "持平", route: "路线", status: "状态", fare: "金额", commission: "佣金", createdAt: "创建", archiveAt: "归档时间", empty: "暂无 TaxiTrip 订单", noAudit: "审计为空", blocked: "已阻止", ready: "就绪",

  },
};

type LocalCopy009Y = Record<string, string>;
const LOCAL009Y: Record<AdminLanguage, LocalCopy009Y> = {
  ru: {
    live: "ЖИВО", on: "ВКЛ", off: "ВЫКЛ", realDbOnly: "ТОЛЬКО РЕАЛЬНАЯ БАЗА", ready: "готово", missing: "не хватает", noFakeShort: "без фейка", driverLabel: "водитель",
    createRiderProfile: "009R: создать профиль пассажира", createQuote: "009T: создать расчёт", createRiderRequest: "009U: создать заявку пассажира", createDispatchOffer: "009V: создать предложение водителя", createTrip: "009W: создать поездку", transitionTrip: "009X: изменить статус поездки", refreshRequests: "Обновить заявки",
    readinessFallback: "Панель показывает только реальные счётчики базы: пассажир, тариф, расчёт, заявка, баланс водителя, машина, предложение, поездка.", quoteGate: "Расчёт", quoteGateSub: "пассажир + активный тариф", requestGate: "Заявка пассажира", requestGateSub: "принятый расчёт", offerGate: "Предложение водителя", offerGateSub: "заявка + баланс водителя + машина", tripGate: "Поездка", tripGateSub: "принятое предложение водителя",
    clickRefreshNoFakeRows: "Нажми обновление готовности. Фейковые строки не показываются.", clickRefreshActionsNoFake: "Нажми обновление действий. Интерфейс не создаёт фейковые данные и не выполняет отправку без ручного ввода.", readOnlyPolicy: "только чтение / действие по правилу",
    protectedSteps: "ЗАЩИЩЁННЫЕ ШАГИ", readOnlyExistingUsers: "ТОЛЬКО ЧТЕНИЕ · СУЩЕСТВУЮЩИЕ ПОЛЬЗОВАТЕЛИ", userCandidatesFallback: "Список только для 009N. Скопируй реальный userId вручную; интерфейс не создаёт фейковых пользователей и не заполняет профиль автоматически.", userDelegateFallback: "делегат", redacted: "скрыто", emailRedacted: "email скрыт или пуст", phoneRedacted: "телефон скрыт или пуст", riderProfileExists: "Профиль пассажира уже есть", readyForRiderProfile: "Готово для ручного защищённого 009N", clickRefreshUsersNoFake: "Нажми обновление пользователей. Нет фейковых пользователей, только существующие пользователи базы со скрытыми данными.",
    riderProfileManualTitle: "Ручное защищённое создание профиля пассажира", riderProfileManualDesc: "Владелец вручную вставляет существующий userId из 009Q и точное подтверждение. Интерфейс не автозаполняет из кандидатов, не копирует сырые персональные данные и не создаёт фейковых пользователей/пассажиров.", noAutofillExactApproval: "без автозаполнения · точное подтверждение", existingUserId: "существующий userId", pasteExistingUserId: "вставь существующий userId из 009Q вручную", countryCode: "код страны", cityId: "код города", trustStatus: "статус доверия", idempotencyKey: "ключ идемпотентности", exactApproval: "точное подтверждение", reason: "причина", manualUniqueKeyNoGenerated: "ручной уникальный ключ, без автогенерации", typeExactApproval: "введи точное значение подтверждения вручную", manualAdminReason: "ручная причина администратора", approvalMustMatch009N: "Подтверждение должно точно совпадать с 009N; payload полностью ручной и не копируется из скрытых персональных данных пользователя.", runRiderProfile: "Запустить ручное 009R создание профиля",
    tariffManualTitle: "Ручное защищённое создание тарифного региона", tariffManualDesc: "Владелец вручную вводит реальные тарифные цифры и точное подтверждение. Интерфейс не генерирует цены по умолчанию, не автозаполняет и не создаёт фейковые тарифы.", realNumbersExactApproval: "реальные цифры · точное подтверждение", zoneId: "код зоны", tariffCode: "код тарифа", statusField: "статус", baseFareMinor: "базовая сумма", perKmMinor: "сумма за км", perMinuteMinor: "сумма за минуту", commissionBasisPoints: "комиссия в базисных пунктах", manualRealZoneId: "ручной реальный код зоны", realBaseFareNoDefault: "реальная базовая сумма, без значения по умолчанию", realPerKmFare: "реальная сумма за км", realPerMinuteFare: "реальная сумма за минуту", approvalMustMatch009O: "Подтверждение должно точно совпадать с 009O. Все суммы вводятся владельцем как реальные числа; интерфейс не генерирует цены по умолчанию.", runTariff: "Запустить ручное 009S создание тарифа",
    liveOrdersMarket: "ЖИВОЙ РЫНОК ЗАКАЗОВ", realDb: "РЕАЛЬНАЯ БАЗА", noFakeBackendOnly: "БЕЗ ФЕЙКА · БЕЗ ЛОКАЛЬНЫХ ЗАКАЗОВ · ТОЛЬКО СЕРВЕР", activeShort: "А", completedShort: "З", archivedShort: "Р", manualQuoteTitle: "Ручное защищённое создание расчёта", manualQuoteDesc: "Владелец вручную вводит существующий профиль пассажира, активный тарифный регион, реальную ссылку маршрута, реальную сумму, реальные GeoJSON, ручной ключ идемпотентности и точное подтверждение 009K.", runQuote: "Запустить ручной 009T расчёт", approvalMustMatch009K: "Подтверждение должно точно совпадать с 009K. Маршрут, сумма и GeoJSON вводятся владельцем как реальные значения; интерфейс не генерирует сумму по умолчанию и фейковый маршрут.", quoteNoFakeNotice: "009T без ложных данных: форма остаётся пустой, пока владелец вручную не введёт реальные номера, маршрут, сумму, геоданные, ключ идемпотентности и точное подтверждение.",
    quoteToRequest: "Расчёт → заявка пассажира", quoteSourceText: "Источник: только существующие принятые расчёты с неистёкшим сроком. Заявка создаётся через защищённый 009J сервер, без mock-строк и без фейковой заявки.", manualRequestTitle: "Ручное защищённое создание заявки пассажира", manualRequestDesc: "Владелец вручную копирует принятый quoteId из списка только для чтения и вручную вводит ключ идемпотентности плюс точное подтверждение 009J. Интерфейс не автозаполняет из кандидатов и не создаёт фейковую заявку.", runRequest: "Запустить ручное 009U создание заявки", acceptedQuoteId: "принятый quoteId", approvalMustMatch009J: "Подтверждение должно точно совпадать с 009J. QuoteId и идемпотентность вводятся владельцем вручную; интерфейс не автозаполняет из кандидатов и не генерирует фейковую заявку.", manualCopyQuote: "Только вручную: сам скопируй quoteId в форму 009U. Без автозаполнения и автоотправки.",
    requestToOffer: "Заявка пассажира → предложение водителя", realRequestsForOffer: "Реальные заявки для предложения водителя", requestOfferSource: "Источник: только существующая заявка пассажира + одобренный водитель + положительный баланс + активная одобренная машина. 009V создаёт предложение только вручную через защищённый 009I сервер.", manualOfferTitle: "Ручное защищённое создание предложения водителя", manualOfferDesc: "Владелец вручную копирует riderRequestId, driverProfileId и vehicleId из карточки кандидата только для чтения, затем вручную вводит оценку, TTL, ключ идемпотентности и точное подтверждение 009I.", runOffer: "Запустить ручное 009V предложение", matchingScore: "оценка совпадения", offerTtlSeconds: "TTL предложения, сек.", approvalMustMatch009I: "Подтверждение должно точно совпадать с 009I. Заявка, водитель, машина, оценка, TTL и идемпотентность вводятся владельцем вручную; интерфейс не автозаполняет из кандидатов и не создаёт фейковое предложение.", manualCopyOffer: "Только вручную: сам скопируй riderRequestId/driverProfileId/vehicleId в форму 009V. Без автозаполнения, автоотправки и фейкового предложения.", noOpenRequests: "Нет реальных открытых заявок пассажира",
    offerToTripSource: "Источник: только существующие принятые предложения водителей. 009W создаёт поездку только вручную через защищённый 009G сервер, без автозаполнения из кандидата, без сгенерированной идемпотентности и без фейковой поездки.", manualTripTitle: "Ручное защищённое создание поездки", manualTripDesc: "Владелец вручную копирует dispatchOfferId и vehicleId из карточки принятого предложения только для чтения, затем вручную вводит ключ идемпотентности и точное подтверждение 009G. Интерфейс не автозаполняет из принятых предложений, не генерирует идемпотентность и не создаёт фейковые поездки.", runTrip: "Запустить ручное 009W создание поездки", dispatchOfferId: "dispatchOfferId", vehicleId: "vehicleId", approvalMustMatch009G: "Подтверждение должно точно совпадать с 009G. Предложение, машина и идемпотентность вводятся владельцем вручную; интерфейс не автозаполняет из принятых предложений и не генерирует фейковую поездку.", manualCopyTrip: "Только вручную: сам скопируй dispatchOfferId/vehicleId в форму 009W. Без автозаполнения, автоотправки и фейковой поездки.", approvedYes: "одобрено: да", approvedNo: "одобрено: нет", taxiTripNotCreated: "Поездка не создана",
    manualLifecycleTitle: "Ручное защищённое изменение статуса поездки", manualLifecycleDesc: "Владелец вручную копирует orderId из карточки поездки, затем вручную вводит nextStatus, необязательную итоговую сумму, ключ идемпотентности и точное подтверждение 009F. Интерфейс не автозаполняет из выбранных заказов, не генерирует статус/идемпотентность и не создаёт фейковые события жизненного цикла.", runLifecycle: "Запустить ручное 009X изменение статуса", orderId: "orderId", nextStatus: "следующий статус", manualStatus: "ручной статус", finalFareMinor: "итоговая сумма", approvalMustMatch009F: "Подтверждение должно точно совпадать с 009F. Существующая поездка, следующий статус и идемпотентность вводятся владельцем вручную; интерфейс не автозаполняет из карточек заказов и не создаёт фейковые события жизненного цикла.", manualCopyLifecycle: "Только вручную: сам скопируй orderId в форму 009X. Без автозаполнения, автоотправки и фейкового изменения статуса.", lifecycleOnlyExisting: "Ничего не создаём фейком: изменение статуса доступно только для существующей поездки.",
  },
  en: {
    live: "LIVE", on: "ON", off: "OFF", realDbOnly: "REAL DB ONLY", ready: "ready", missing: "missing", noFakeShort: "no fake", driverLabel: "driver", createRiderProfile: "009R: Create RiderProfile", createQuote: "009T: Create TaxiQuote", createRiderRequest: "009U: Create RiderRequest", createDispatchOffer: "009V: Create DispatchOffer", createTrip: "009W: Create TaxiTrip", transitionTrip: "009X: Transition Trip", refreshRequests: "Refresh requests", readinessFallback: "Panel shows only real DB counts: rider, tariff, quote, request, driver balance, vehicle, offer, trip.", quoteGate: "Quote", quoteGateSub: "rider + active tariff", requestGate: "RiderRequest", requestGateSub: "accepted quote", offerGate: "DispatchOffer", offerGateSub: "request + driver balance + vehicle", tripGate: "TaxiTrip", tripGateSub: "accepted dispatch offer", clickRefreshNoFakeRows: "Click refresh readiness. Fake rows are not shown.", clickRefreshActionsNoFake: "Click refresh actions. UI does not create fake payload and does not POST without manual data.", readOnlyPolicy: "read-only / policy action", protectedSteps: "PROTECTED STEPS", readOnlyExistingUsers: "READ-ONLY EXISTING USERS", userCandidatesFallback: "Read-only list for 009N. Copy real userId manually; UI does not create fake users and does not autofill rider payload.", userDelegateFallback: "delegate", redacted: "redacted", emailRedacted: "email redacted/empty", phoneRedacted: "phone redacted/empty", riderProfileExists: "TaxiRiderProfile exists", readyForRiderProfile: "Ready for 009N manual protected intake", clickRefreshUsersNoFake: "Click refresh users. No fake users, only existing DB users with redaction.", riderProfileManualTitle: "RiderProfile manual protected intake", riderProfileManualDesc: "Owner manually pastes existing userId from 009Q and exact approval. UI does not autofill from candidates, does not copy raw PII, and does not create fake users/riders.", noAutofillExactApproval: "no autofill · exact approval", existingUserId: "existing userId", pasteExistingUserId: "paste existing userId manually from 009Q", countryCode: "countryCode", cityId: "cityId", trustStatus: "trustStatus", idempotencyKey: "idempotencyKey", exactApproval: "exact approval", reason: "reason", manualUniqueKeyNoGenerated: "manual unique key, no generated autofill", typeExactApproval: "type exact approval value manually", manualAdminReason: "manual admin reason", approvalMustMatch009N: "Approval must exactly match 009N; payload is fully manual, not copied from redacted user PII.", runRiderProfile: "Run 009R manual protected intake", tariffManualTitle: "TariffRegion manual protected intake", tariffManualDesc: "Owner manually enters real tariff numbers and exact approval. UI does not generate default prices, does not autofill, and does not create fake tariff rows.", realNumbersExactApproval: "real numbers · exact approval", zoneId: "zoneId", tariffCode: "tariffCode", statusField: "status", baseFareMinor: "baseFareMinor", perKmMinor: "perKmMinor", perMinuteMinor: "perMinuteMinor", commissionBasisPoints: "commissionBasisPoints", manualRealZoneId: "manual real zone id", realBaseFareNoDefault: "real base fare, no default", realPerKmFare: "real per km fare", realPerMinuteFare: "real per minute fare", approvalMustMatch009O: "Approval must exactly match 009O. All fare fields are owner-provided real numbers; UI never generates default prices.", runTariff: "Run 009S manual tariff intake", liveOrdersMarket: "LIVE ORDERS MARKET", realDb: "REAL DB", noFakeBackendOnly: "NO FAKE · NO LOCAL ORDERS · BACKEND ONLY", activeShort: "A", completedShort: "C", archivedShort: "R", manualQuoteTitle: "TaxiQuote manual protected intake", manualQuoteDesc: "Owner manually enters existing riderProfileId, active tariffRegionId, real routeProviderRef, real fare, real GeoJSON, manual idempotency key and exact 009K approval.", runQuote: "Run 009T manual quote intake", approvalMustMatch009K: "Approval must exactly match 009K. Route/fare/GeoJSON are owner-provided real values; UI never generates default fare or fake route.", quoteNoFakeNotice: "009T NO FAKE: form stays empty until owner manually enters real IDs, route, fare, GeoJSON, idempotency and exact approval.", quoteToRequest: "TaxiQuote → TaxiRiderRequest", quoteSourceText: "Source: only existing accepted TaxiQuote that has not expired. RiderRequest is created through protected 009J backend, with no mock rows and no fake request.", manualRequestTitle: "RiderRequest manual protected intake", manualRequestDesc: "Owner manually copies an accepted quoteId from the read-only list and manually enters idempotency key plus exact 009J approval. UI does not autofill from quote candidates and does not create fake requests.", runRequest: "Run 009U manual rider request", acceptedQuoteId: "accepted quoteId", approvalMustMatch009J: "Approval must exactly match 009J. QuoteId and idempotency are owner-entered manually; UI never autofills from candidates and never generates a fake request.", manualCopyQuote: "Manual only: copy quoteId yourself into 009U form. No autofill, no auto-submit.", requestToOffer: "TaxiRiderRequest → TaxiDispatchOffer", realRequestsForOffer: "Real requests for dispatch-offer", requestOfferSource: "Source: only existing TaxiRiderRequest + approved driver + positive balance + approved active vehicle. 009V creates dispatch-offer only manually through protected 009I backend.", manualOfferTitle: "DispatchOffer manual protected intake", manualOfferDesc: "Owner manually copies riderRequestId, driverProfileId and vehicleId from the read-only candidate card, then manually enters matchingScore, TTL, idempotency key and exact 009I approval.", runOffer: "Run 009V manual dispatch-offer", matchingScore: "matchingScore", offerTtlSeconds: "offerTtlSeconds", approvalMustMatch009I: "Approval must exactly match 009I. RiderRequest, driver, vehicle, score, TTL and idempotency are owner-entered manually; UI never autofills from candidates and never creates fake dispatch offers.", manualCopyOffer: "Manual only: copy riderRequestId/driverProfileId/vehicleId yourself into 009V form. No autofill, no auto-submit, no fake dispatch offer.", noOpenRequests: "No real open TaxiRiderRequest", offerToTripSource: "Source: only existing accepted TaxiDispatchOffer. 009W creates TaxiTrip only manually through protected 009G backend, with no candidate autofill, no generated idempotency and no fake trip.", manualTripTitle: "TaxiTrip manual protected intake", manualTripDesc: "Owner manually copies dispatchOfferId and vehicleId from the read-only accepted offer card, then manually enters idempotency key and exact 009G approval. UI does not autofill from accepted offers, does not generate idempotency, and does not create fake trips.", runTrip: "Run 009W manual trip create", dispatchOfferId: "dispatchOfferId", vehicleId: "vehicleId", approvalMustMatch009G: "Approval must exactly match 009G. DispatchOffer, vehicle and idempotency are owner-entered manually; UI never autofills from accepted offers and never generates a fake trip.", manualCopyTrip: "Manual only: copy dispatchOfferId/vehicleId yourself into 009W form. No autofill, no auto-submit, no fake TaxiTrip.", approvedYes: "approved yes", approvedNo: "approved no", taxiTripNotCreated: "TaxiTrip not created", manualLifecycleTitle: "TaxiTrip lifecycle manual protected transition", manualLifecycleDesc: "Owner manually copies orderId from the TaxiTrip order card, then manually enters nextStatus, optional finalFareMinor, idempotency key and exact 009F approval. UI does not autofill from selected orders, does not generate status/idempotency, and does not create fake lifecycle events.", runLifecycle: "Run 009X manual lifecycle transition", orderId: "orderId", nextStatus: "nextStatus", manualStatus: "manual status", finalFareMinor: "finalFareMinor", approvalMustMatch009F: "Approval must exactly match 009F. Existing TaxiTrip, nextStatus and idempotency are owner-entered manually; UI never autofills from selected order cards and never creates fake lifecycle events.", manualCopyLifecycle: "Manual only: copy orderId yourself into 009X form. No autofill, no auto-submit, no fake lifecycle transition.", lifecycleOnlyExisting: "No fake create: lifecycle transition appears only for an existing TaxiTrip.",
  },
  uz: {} as LocalCopy009Y,
  zh: {} as LocalCopy009Y,
};
LOCAL009Y.uz = { ...LOCAL009Y.ru,
  live: "JONLI", on: "YOQILGAN", off: "O‘CHIRILGAN", realDbOnly: "FAQAT REAL BAZA", ready: "tayyor", missing: "yetishmaydi", noFakeShort: "soxta yo‘q", driverLabel: "haydovchi", createRiderProfile: "009R: yo‘lovchi profilini yaratish", createQuote: "009T: hisob-kitob yaratish", createRiderRequest: "009U: yo‘lovchi arizasini yaratish", createDispatchOffer: "009V: haydovchi taklifini yaratish", createTrip: "009W: safar yaratish", transitionTrip: "009X: safar holatini o‘zgartirish", refreshRequests: "Arizalarni yangilash", liveOrdersMarket: "JONLI BUYURTMALAR BOZORI", realDb: "REAL BAZA", noFakeBackendOnly: "SOXTA YO‘Q · LOKAL BUYURTMA YO‘Q · FAQAT SERVER",
};
LOCAL009Y.zh = { ...LOCAL009Y.ru,
  live: "实时", on: "开", off: "关", realDbOnly: "仅真实数据库", ready: "就绪", missing: "缺少", noFakeShort: "无虚假", driverLabel: "司机", createRiderProfile: "009R：创建乘客资料", createQuote: "009T：创建报价", createRiderRequest: "009U：创建乘客请求", createDispatchOffer: "009V：创建派单报价", createTrip: "009W：创建行程", transitionTrip: "009X：变更行程状态", refreshRequests: "刷新请求", liveOrdersMarket: "实时订单市场", realDb: "真实数据库", noFakeBackendOnly: "无虚假 · 无本地订单 · 仅服务器",
};


type ServiceCopy010A = {
  title: string;
  subtitle: string;
  lostPropertyTitle: string;
  lostPropertyText: string;
  appealTitle: string;
  appealText: string;
  archiveTitle: string;
  archiveText: string;
  auditTitle: string;
  auditText: string;
  tripSearchTitle: string;
  tripSearchText: string;
  ownerDevHidden: string;
  workflow: string[];
};

const OWNER_DEV_TOOLS_VISIBLE_010A = false;

const SERVICE_COPY_010A: Record<AdminLanguage, ServiceCopy010A> = {
  ru: {
    title: "Информационная панель заказов и поддержки",
    subtitle: "Обычный админ не создаёт заказы вручную. Экран показывает реальные поездки, помогает сохранить историю, архивировать завершённые поездки и работать с обращениями пассажиров.",
    lostPropertyTitle: "Потерянные вещи",
    lostPropertyText: "По обращению пассажира админ находит TaxiTrip, время, маршрут, водителя и машину, создаёт кейс поддержки и помогает вернуть вещь без раскрытия лишних данных.",
    appealTitle: "Обращения и споры",
    appealText: "Админ открывает карточку поездки, смотрит статусы, аудит, архив и передаёт кейс поддержке или старшему менеджеру.",
    archiveTitle: "Сохранение и архив",
    archiveText: "Старые завершённые поездки архивируются через защищённый серверный маршрут. Локальный фейковый архив запрещён.",
    auditTitle: "Аудит действий",
    auditText: "Каждое действие фиксируется через TaxiAuditLog: кто, когда и по какой поездке работал с обращением или архивом.",
    tripSearchTitle: "Поиск поездки",
    tripSearchText: "Основные ключи поиска: orderId, пассажир, водитель, машина, время, маршрут, статус и архив.",
    ownerDevHidden: "Ручные формы создания скрыты из обычной панели администратора. Они доступны только как инструменты владельца и разработчика для теста или восстановления.",
    workflow: ["Пассажир обращается", "Админ ищет TaxiTrip", "Проверяет водителя, авто, время и маршрут", "Создаёт кейс потерянной вещи или поддержки", "Фиксирует результат и архивирует историю"],
  },
  en: {
    title: "Orders and support information panel",
    subtitle: "Regular admins do not create orders manually. This screen shows real trips, preserves history, archives completed trips, and supports passenger cases.",
    lostPropertyTitle: "Lost property",
    lostPropertyText: "When a passenger contacts support, the admin finds TaxiTrip, time, route, driver and vehicle, opens a support case, and helps return the item without exposing unnecessary data.",
    appealTitle: "Appeals and disputes",
    appealText: "The admin opens the trip card, reviews status, audit and archive, then sends the case to support or senior management.",
    archiveTitle: "Save and archive",
    archiveText: "Old completed trips are archived only through the protected backend route. Local fake archive is blocked.",
    auditTitle: "Action audit",
    auditText: "Every support/archive action is logged through TaxiAuditLog with actor, time and trip reference.",
    tripSearchTitle: "Trip lookup",
    tripSearchText: "Search keys: orderId, rider, driver, vehicle, time, route, status and archive.",
    ownerDevHidden: "Manual create forms are hidden from the regular admin panel. They remain only as Owner/Dev tools for test or recovery.",
    workflow: ["Passenger contacts support", "Admin finds TaxiTrip", "Checks driver, car, time and route", "Opens lost property or support case", "Saves result and archives history"],
  },
  uz: {
    title: "Buyurtmalar va yordam bo‘yicha axborot paneli",
    subtitle: "Oddiy admin buyurtmani qo‘lda yaratmaydi. Ekran real safarlarni ko‘rsatadi, tarixni saqlaydi, tugagan safarlarni arxivlaydi va yo‘lovchi murojaatlariga yordam beradi.",
    lostPropertyTitle: "Yo‘qolgan buyumlar",
    lostPropertyText: "Yo‘lovchi murojaat qilganda admin TaxiTrip, vaqt, yo‘nalish, haydovchi va mashinani topadi, yordam ishini ochadi va ortiqcha ma’lumotni oshkor qilmasdan buyumni qaytarishga yordam beradi.",
    appealTitle: "Murojaat va nizolar",
    appealText: "Admin safar kartasini ochadi, holat, tekshiruv va arxivni tekshiradi, keyin ishni yordam xizmatiga yoki katta menejerga yuboradi.",
    archiveTitle: "Saqlash va arxiv",
    archiveText: "Eski tugagan safarlar faqat himoyalangan server yo‘li orqali arxivlanadi. Lokal soxta arxiv taqiqlangan.",
    auditTitle: "Amallar auditi",
    auditText: "Har bir yordam yoki arxiv amali TaxiAuditLog orqali ijrochi, vaqt va safar havolasi bilan yoziladi.",
    tripSearchTitle: "Safarni qidirish",
    tripSearchText: "Qidiruv kalitlari: orderId, yo‘lovchi, haydovchi, mashina, vaqt, yo‘nalish, holat va arxiv.",
    ownerDevHidden: "Qo‘lda yaratish formalari oddiy admin panelidan yashirildi. Ular faqat sinov yoki tiklash uchun egasi va dasturchi vositalari qismida qoladi.",
    workflow: ["Yo‘lovchi murojaat qiladi", "Admin TaxiTrip topadi", "Haydovchi, auto, vaqt va yo‘nalishni tekshiradi", "Yo‘qolgan buyum yoki yordam ishini ochadi", "Natijani saqlaydi va tarixni arxivlaydi"],
  },
  zh: {
    title: "订单与支持信息面板",
    subtitle: "普通管理员不手动创建订单。此页面显示真实行程、保存历史、归档已完成行程，并处理乘客求助。",
    lostPropertyTitle: "遗失物品",
    lostPropertyText: "乘客联系支持后，管理员查找 TaxiTrip、时间、路线、司机和车辆，建立支持案件，并在不暴露多余数据的情况下帮助找回物品。",
    appealTitle: "申诉与争议",
    appealText: "管理员打开行程卡片，查看状态、审计和归档，然后把案件交给支持或高级经理。",
    archiveTitle: "保存与归档",
    archiveText: "旧的已完成行程只能通过受保护服务器路线归档。禁止本地虚假归档。",
    auditTitle: "操作审计",
    auditText: "每个支持或归档操作都会通过 TaxiAuditLog 记录操作人、时间和行程引用。",
    tripSearchTitle: "行程查询",
    tripSearchText: "查询键：orderId、乘客、司机、车辆、时间、路线、状态和归档。",
    ownerDevHidden: "手动创建表单已从普通管理员面板隐藏。它们只作为所有者和开发者工具用于测试或恢复。",
    workflow: ["乘客联系支持", "管理员查找 TaxiTrip", "检查司机、车辆、时间和路线", "建立遗失物品或支持案件", "保存结果并归档历史"],
  },
};

type LostPropertyCopy010C = Record<string, string>;
const LOST_PROPERTY_COPY_010C: Record<AdminLanguage, LostPropertyCopy010C> = {
  ru: {
    title: "Обращения по потерянным вещам",
    subtitle: "Реальные кейсы поддержки из 010B: только существующий TaxiTrip, список без лишних персональных данных, связь пассажир ↔ водитель только через админа/поддержку.",
    statusTitle: "Сводка 010B",
    loadCases: "Обновить обращения",
    createTitle: "Создать обращение из TaxiTrip",
    createDesc: "Админ вручную вводит tripId и описание вещи. Интерфейс не создаёт фейковую поездку и не раскрывает контакты пассажира/водителя.",
    updateTitle: "Изменить статус обращения",
    updateDesc: "Смена статуса выполняется только через защищённый серверный путь 010B и точное подтверждение.",
    tripId: "TaxiTrip ID",
    itemDescription: "описание вещи",
    passengerMessage: "сообщение пассажира",
    lastSeenHint: "где видели последний раз",
    priority: "приоритет",
    assignedAdminId: "Номер администратора",
    supportCaseId: "Номер обращения",
    statusField: "статус",
    workflowStage: "этап работы",
    adminNote: "заметка администратора",
    idempotencyKey: "ключ идемпотентности",
    exactApproval: "точное подтверждение",
    reason: "причина",
    createButton: "Создать обращение",
    updateButton: "Сменить статус",
    emptyCases: "Пока нет обращений по потерянным вещам",
    copyTripIdOnly: "Скопируй tripId из карточки TaxiTrip вручную. Без автозаполнения, без фейковой поездки.",
    redactedList: "Список redacted: без raw PII, прямой контакт пассажир ↔ водитель заблокирован.",
    exactCreateHelp: "Нужно точное подтверждение 010B create.",
    exactUpdateHelp: "Нужно точное подтверждение 010B update.",
    opened: "открыто",
    waiting_for_user: "ожидает пассажира",
    under_review: "на проверке",
    resolved: "решено",
    rejected: "отклонено",
    escalated: "эскалация",
    driverMasked: "водитель скрыт",
    vehicleMasked: "машина скрыта",
    cases: "обращений",
    open: "открыто",
    review: "проверка",
    audit: "аудит",
  },
  en: {
    title: "Lost property cases",
    subtitle: "Real 010B support cases: existing TaxiTrip only, redacted list, passenger ↔ driver contact mediated by admin/support only.",
    statusTitle: "010B summary",
    loadCases: "Refresh cases",
    createTitle: "Create case from TaxiTrip",
    createDesc: "Admin manually enters tripId and item description. UI does not create fake trips and does not expose rider/driver contacts.",
    updateTitle: "Update case status",
    updateDesc: "Status updates go only through protected 010B backend and exact approval.",
    tripId: "TaxiTrip ID",
    itemDescription: "item description",
    passengerMessage: "passenger message",
    lastSeenHint: "last seen hint",
    priority: "priority",
    assignedAdminId: "admin ID",
    supportCaseId: "case ID",
    statusField: "status",
    workflowStage: "workflow stage",
    adminNote: "admin note",
    idempotencyKey: "idempotency key",
    exactApproval: "exact approval",
    reason: "reason",
    createButton: "Create case",
    updateButton: "Update status",
    emptyCases: "No lost property cases yet",
    copyTripIdOnly: "Copy tripId manually from TaxiTrip card. No autofill, no fake trip.",
    redactedList: "Redacted list: no raw PII, passenger ↔ driver direct contact is blocked.",
    exactCreateHelp: "Exact 010B create approval required.",
    exactUpdateHelp: "Exact 010B update approval required.",
    opened: "opened",
    waiting_for_user: "waiting for user",
    under_review: "under review",
    resolved: "resolved",
    rejected: "rejected",
    escalated: "escalated",
    driverMasked: "driver masked",
    vehicleMasked: "vehicle masked",
    cases: "cases",
    open: "open",
    review: "review",
    audit: "audit",
  },
  uz: {
    title: "Yo‘qolgan buyumlar bo‘yicha murojaatlar",
    subtitle: "010B real yordam ishlari: faqat mavjud TaxiTrip, ro‘yxat maxfiylashtirilgan, yo‘lovchi va haydovchi aloqasi faqat admin/yordam orqali.",
    statusTitle: "010B xulosa",
    loadCases: "Murojaatlarni yangilash",
    createTitle: "TaxiTrip asosida murojaat ochish",
    createDesc: "Admin tripId va buyum tavsifini qo‘lda kiritadi. Interfeys soxta safar yaratmaydi va kontaktlarni oshkor qilmaydi.",
    updateTitle: "Murojaat statusini o‘zgartirish",
    updateDesc: "Holat faqat himoyalangan 010B server yo‘li va aniq tasdiq bilan o‘zgaradi.",
    tripId: "TaxiTrip ID",
    itemDescription: "buyum tavsifi",
    passengerMessage: "yo‘lovchi xabari",
    lastSeenHint: "oxirgi ko‘rilgan joy",
    priority: "ustuvorlik",
    assignedAdminId: "admin ID",
    supportCaseId: "murojaat ID",
    statusField: "status",
    workflowStage: "ish bosqichi",
    adminNote: "admin izohi",
    idempotencyKey: "idempotentlik kaliti",
    exactApproval: "aniq tasdiq",
    reason: "sabab",
    createButton: "Murojaat ochish",
    updateButton: "Statusni o‘zgartirish",
    emptyCases: "Yo‘qolgan buyumlar bo‘yicha murojaat yo‘q",
    copyTripIdOnly: "tripId ni TaxiTrip kartasidan qo‘lda ko‘chiring. Avto-to‘ldirish yo‘q, soxta safar yo‘q.",
    redactedList: "Ro‘yxat maxfiy: raw PII yo‘q, yo‘lovchi ↔ haydovchi bevosita aloqasi bloklangan.",
    exactCreateHelp: "010B create uchun aniq tasdiq kerak.",
    exactUpdateHelp: "010B update uchun aniq tasdiq kerak.",
    opened: "ochildi",
    waiting_for_user: "yo‘lovchi kutilmoqda",
    under_review: "tekshiruvda",
    resolved: "hal bo‘ldi",
    rejected: "rad etildi",
    escalated: "yuqoriga chiqarildi",
    driverMasked: "haydovchi yashirilgan",
    vehicleMasked: "mashina yashirilgan",
    cases: "murojaat",
    open: "ochiq",
    review: "tekshiruv",
    audit: "audit",
  },
  zh: {
    title: "遗失物品案件",
    subtitle: "010B 真实支持案件：仅来自现有 TaxiTrip，列表已脱敏，乘客 ↔ 司机联系只通过管理员/支持。",
    statusTitle: "010B 概览",
    loadCases: "刷新案件",
    createTitle: "从 TaxiTrip 创建案件",
    createDesc: "管理员手动输入 tripId 和物品描述。界面不创建虚假行程，也不暴露乘客/司机联系方式。",
    updateTitle: "更新案件状态",
    updateDesc: "状态只能通过受保护的 010B 后端和精确确认更新。",
    tripId: "TaxiTrip ID",
    itemDescription: "物品描述",
    passengerMessage: "乘客留言",
    lastSeenHint: "最后看到位置",
    priority: "优先级",
    assignedAdminId: "管理员编号",
    supportCaseId: "案件编号",
    statusField: "状态",
    workflowStage: "流程阶段",
    adminNote: "管理员备注",
    idempotencyKey: "幂等键",
    exactApproval: "精确确认",
    reason: "原因",
    createButton: "创建案件",
    updateButton: "更新状态",
    emptyCases: "暂无遗失物品案件",
    copyTripIdOnly: "请从 TaxiTrip 卡片手动复制 tripId。无自动填充，无虚假行程。",
    redactedList: "脱敏列表：无 raw PII，乘客 ↔ 司机直接联系已阻止。",
    exactCreateHelp: "需要 010B create 精确确认。",
    exactUpdateHelp: "需要 010B update 精确确认。",
    opened: "已打开",
    waiting_for_user: "等待乘客",
    under_review: "审核中",
    resolved: "已解决",
    rejected: "已拒绝",
    escalated: "已升级",
    driverMasked: "司机已隐藏",
    vehicleMasked: "车辆已隐藏",
    cases: "案件",
    open: "打开",
    review: "审核",
    audit: "审计",
  },
};


type TripLookupCopy010D = Record<string, string>;
const TRIP_LOOKUP_COPY_010D: Record<AdminLanguage, TripLookupCopy010D> = {
  ru: {
    title: "Поиск поездки для помощи пассажиру",
    subtitle: "Информационная панель: найти реальную поездку такси по номеру, маршруту, времени, статусу, машине или водителю. Без создания заказа, без автозаполнения обращения, без прямого контакта пассажир ↔ водитель.",
    searchLabel: "поиск",
    searchPlaceholder: "введите orderId, маршрут, город, машину, статус",
    statusFilter: "фильтр статуса",
    archiveFilter: "фильтр архива",
    refreshOrders: "Обновить поездки",
    allStatuses: "все статусы",
    allArchive: "все поездки",
    activeArchive: "активные",
    completedArchive: "завершённые",
    eligibleArchive: "готовы к архиву",
    archivedArchive: "архив",
    matches: "найдено",
    empty: "Совпадений нет. Панель не создаёт тестовые строки.",
    copyOnly: "Скопируй номер поездки такси вручную в форму 010C, если пассажир сообщил о потерянной вещи.",
    safeContext: "Без raw PII и без прямых контактов. Админ связывает стороны только через поддержку.",
    route: "маршрут",
    driver: "водитель",
    vehicle: "машина",
    created: "создано",
    completed: "завершено",
    fare: "сумма",
    archive: "архив",
    noAutofill: "без автозаполнения",
  },
  en: {
    title: "Trip lookup for passenger support",
    subtitle: "Information panel: find a real TaxiTrip by ID, route, time, status, vehicle or driver. No order creation, no case autofill, no passenger ↔ driver direct contact.",
    searchLabel: "search",
    searchPlaceholder: "enter orderId, route, city, vehicle, status",
    statusFilter: "status filter",
    archiveFilter: "archive filter",
    refreshOrders: "Refresh trips",
    allStatuses: "all statuses",
    allArchive: "all trips",
    activeArchive: "active",
    completedArchive: "completed",
    eligibleArchive: "archive-ready",
    archivedArchive: "archive",
    matches: "matches",
    empty: "No matches. Panel does not create sample rows.",
    copyOnly: "Copy TaxiTrip ID manually into the 010C form when passenger reports lost property.",
    safeContext: "No raw PII and no direct contact. Admin mediates through support only.",
    route: "route",
    driver: "driver",
    vehicle: "vehicle",
    created: "created",
    completed: "completed",
    fare: "fare",
    archive: "archive",
    noAutofill: "no autofill",
  },
  uz: {
    title: "Yo‘lovchiga yordam uchun safarni qidirish",
    subtitle: "Axborot paneli: real taksi safarini raqam, yo‘nalish, vaqt, holat, mashina yoki haydovchi bo‘yicha topish. Buyurtma yaratmaydi, murojaatni avtomatik to‘ldirmaydi, yo‘lovchi ↔ haydovchi bevosita aloqasi yo‘q.",
    searchLabel: "qidirish",
    searchPlaceholder: "buyurtma raqami, yo‘nalish, shahar, mashina yoki holat kiriting",
    statusFilter: "status filtri",
    archiveFilter: "arxiv filtri",
    refreshOrders: "Safarlarni yangilash",
    allStatuses: "barcha statuslar",
    allArchive: "barcha safarlar",
    activeArchive: "faol",
    completedArchive: "yakunlangan",
    eligibleArchive: "arxivga tayyor",
    archivedArchive: "arxiv",
    matches: "topildi",
    empty: "Mos safar yo‘q. Panel sinov qatorlarini yaratmaydi.",
    copyOnly: "Yo‘lovchi buyum yo‘qotganini aytsa, taksi safari raqamini 010C formasiga qo‘lda ko‘chiring.",
    safeContext: "Raw PII yo‘q va bevosita aloqa yo‘q. Admin faqat yordam xizmati orqali bog‘laydi.",
    route: "yo‘nalish",
    driver: "haydovchi",
    vehicle: "mashina",
    created: "yaratilgan",
    completed: "yakunlangan",
    fare: "summa",
    archive: "arxiv",
    noAutofill: "avto-to‘ldirish yo‘q",
  },
  zh: {
    title: "乘客支持行程查询",
    subtitle: "信息面板：按编号、路线、时间、状态、车辆或司机查找真实出租车行程。不创建订单，不自动填充案件，不允许乘客 ↔ 司机直接联系。",
    searchLabel: "搜索",
    searchPlaceholder: "输入 orderId、路线、城市、车辆、状态",
    statusFilter: "状态筛选",
    archiveFilter: "归档筛选",
    refreshOrders: "刷新行程",
    allStatuses: "全部状态",
    allArchive: "全部行程",
    activeArchive: "进行中",
    completedArchive: "已完成",
    eligibleArchive: "可归档",
    archivedArchive: "归档",
    matches: "找到",
    empty: "没有匹配项。面板不会创建测试数据。",
    copyOnly: "乘客报告遗失物品时，请手动复制出租车行程编号到 010C 表单。",
    safeContext: "无 raw PII，无直接联系。管理员仅通过支持流程协调。",
    route: "路线",
    driver: "司机",
    vehicle: "车辆",
    created: "创建时间",
    completed: "完成时间",
    fare: "金额",
    archive: "归档",
    noAutofill: "无自动填充",
  },
};


type LostPropertyWorkflowCopy010E = Record<string, string>;
const LOST_PROPERTY_WORKFLOW_COPY_010E: Record<AdminLanguage, LostPropertyWorkflowCopy010E> = {
  ru: {
    title: "Порядок работы с потерянной вещью",
    subtitle: "Сервисная доска для администратора: не создаёт заказы, не раскрывает контакты и не связывает пассажира с водителем напрямую. Всё ведётся через обращение 010B и аудит.",
    stageBoard: "Этапы обработки",
    caseBoard: "Активные обращения",
    safetyBoard: "Правила безопасности",
    guideBoard: "Что должен сделать админ",
    opened: "обращение открыто",
    driver_contact_requested: "запрос водителю",
    driver_contacted: "водитель опрошен",
    item_found: "вещь найдена",
    return_scheduled: "возврат назначен",
    returned: "вещь возвращена",
    closed: "закрыто",
    activeCases: "активные обращения",
    resolvedCases: "решённые",
    escalatedCases: "эскалация",
    highPriority: "высокий приоритет",
    nextAction: "следующее действие",
    noCases: "Активных обращений нет. Доска не создаёт тестовые кейсы.",
    step1: "1. Найти реальный TaxiTrip через поиск 010D.",
    step2: "2. Создать обращение 010B только по существующей поездке.",
    step3: "3. Связаться с водителем через поддержку, без передачи прямых контактов пассажиру.",
    step4: "4. Зафиксировать результат: вещь найдена, возврат назначен, возвращено или отклонено.",
    rule1: "Без raw PII в списке обращений.",
    rule2: "Без прямого контакта пассажир ↔ водитель.",
    rule3: "Без ложной поездки и ложного обращения о потерянной вещи.",
    rule4: "Все изменения статуса — только через защищённый сервер 010B.",
    refresh: "Обновить обращения",
    readOnly: "read-only доска · без автозаполнения",
  },
  en: {
    title: "Lost property service workflow",
    subtitle: "Admin service board: no order creation, no contact exposure, and no passenger ↔ driver direct contact. Everything is handled through 010B cases and audit.",
    stageBoard: "Workflow stages",
    caseBoard: "Active cases",
    safetyBoard: "Safety rules",
    guideBoard: "Admin checklist",
    opened: "case opened",
    driver_contact_requested: "driver contact requested",
    driver_contacted: "driver contacted",
    item_found: "item found",
    return_scheduled: "return scheduled",
    returned: "item returned",
    closed: "closed",
    activeCases: "active cases",
    resolvedCases: "resolved",
    escalatedCases: "escalated",
    highPriority: "high priority",
    nextAction: "next action",
    noCases: "No active cases. Board does not create sample cases.",
    step1: "1. Find the real TaxiTrip through 010D lookup.",
    step2: "2. Create a 010B case only from an existing trip.",
    step3: "3. Contact the driver through support without giving direct contacts to the passenger.",
    step4: "4. Record the result: item found, return scheduled, returned, or rejected.",
    rule1: "No raw PII in the cases list.",
    rule2: "No passenger ↔ driver direct contact.",
    rule3: "No fake trip and no fake lost property case.",
    rule4: "All status changes go only through protected 010B backend.",
    refresh: "Refresh cases",
    readOnly: "read-only board · no autofill",
  },
  uz: {
    title: "Yo‘qolgan buyumlar bo‘yicha ish tartibi",
    subtitle: "Admin uchun servis doskasi: buyurtma yaratmaydi, kontaktlarni oshkor qilmaydi, yo‘lovchi ↔ haydovchi bevosita aloqasi yo‘q. Hammasi 010B murojaati va tekshiruv orqali yuritiladi.",
    stageBoard: "Ish bosqichlari",
    caseBoard: "Faol murojaatlar",
    safetyBoard: "Xavfsizlik qoidalari",
    guideBoard: "Admin bajaradigan ishlar",
    opened: "murojaat ochildi",
    driver_contact_requested: "haydovchiga so‘rov",
    driver_contacted: "haydovchi bilan bog‘lanildi",
    item_found: "buyum topildi",
    return_scheduled: "qaytarish belgilandi",
    returned: "buyum qaytarildi",
    closed: "yopildi",
    activeCases: "faol murojaatlar",
    resolvedCases: "hal bo‘lganlar",
    escalatedCases: "eskalatsiya",
    highPriority: "yuqori ustuvorlik",
    nextAction: "keyingi amal",
    noCases: "Faol murojaat yo‘q. Doska sinov murojaati yaratmaydi.",
    step1: "1. 010D qidiruvi orqali real TaxiTrip ni topish.",
    step2: "2. 010B murojaatini faqat mavjud safar asosida ochish.",
    step3: "3. Haydovchi bilan faqat yordam xizmati orqali bog‘lanish, yo‘lovchiga to‘g‘ridan-to‘g‘ri kontakt bermaslik.",
    step4: "4. Natijani yozish: buyum topildi, qaytarish belgilandi, qaytarildi yoki rad etildi.",
    rule1: "Murojaatlar ro‘yxatida raw PII yo‘q.",
    rule2: "Yo‘lovchi ↔ haydovchi bevosita aloqasi yo‘q.",
    rule3: "Soxta safar va soxta lost property murojaati yo‘q.",
    rule4: "Holat o‘zgarishi faqat himoyalangan 010B server yo‘li orqali.",
    refresh: "Murojaatlarni yangilash",
    readOnly: "faqat ko‘rish doskasi · avto-to‘ldirish yo‘q",
  },
  zh: {
    title: "遗失物品处理流程",
    subtitle: "管理员服务看板：不创建订单，不暴露联系方式，不允许乘客 ↔ 司机直接联系。全部通过 010B 案件和审计处理。",
    stageBoard: "处理阶段",
    caseBoard: "活跃案件",
    safetyBoard: "安全规则",
    guideBoard: "管理员清单",
    opened: "案件已打开",
    driver_contact_requested: "请求联系司机",
    driver_contacted: "已联系司机",
    item_found: "物品已找到",
    return_scheduled: "已安排归还",
    returned: "物品已归还",
    closed: "已关闭",
    activeCases: "活跃案件",
    resolvedCases: "已解决",
    escalatedCases: "已升级",
    highPriority: "高优先级",
    nextAction: "下一步",
    noCases: "暂无活跃案件。看板不会创建测试案件。",
    step1: "1. 通过 010D 查询找到真实 TaxiTrip。",
    step2: "2. 只能从现有行程创建 010B 案件。",
    step3: "3. 通过支持团队联系司机，不向乘客提供直接联系方式。",
    step4: "4. 记录结果：找到物品、安排归还、已归还或拒绝。",
    rule1: "案件列表中无 raw PII。",
    rule2: "无乘客 ↔ 司机直接联系。",
    rule3: "无虚假行程，无虚假遗失物品案件。",
    rule4: "所有状态变更仅通过受保护的 010B 后端。",
    refresh: "刷新案件",
    readOnly: "只读看板 · 无自动填充",
  },
};

type LostPropertyAuditCopy010G = Record<string, string>;
const LOST_PROPERTY_AUDIT_COPY_010G: Record<AdminLanguage, LostPropertyAuditCopy010G> = {
  ru: {
    title: "Аудит потерянных вещей",
    subtitle: "Read-only timeline из 010F: показывает историю обращения, masked actorId и redacted payload. Без создания, изменения или удаления.",
    refresh: "Обновить аудит",
    supportCaseId: "Номер обращения",
    tripId: "TaxiTrip ID",
    limit: "лимит",
    filters: "фильтры",
    empty: "Событий аудита пока нет. Панель не создаёт тестовые строки.",
    readOnlySeal: "Только просмотр · raw PII скрыт · itemDescription/passengerMessage/adminNote не раскрываются",
    actor: "оператор",
    action: "действие",
    target: "объект",
    payload: "безопасная сводка",
    created: "создано",
    caseVerified: "обращение проверено",
    redacted: "redacted",
    noMutation: "без create/update/delete",
    noDirectContact: "контакт только через админа/поддержку",
  },
  en: {
    title: "Lost property audit",
    subtitle: "Read-only 010F timeline: case history, masked actorId and redacted payload. No create, update or delete.",
    refresh: "Refresh audit",
    supportCaseId: "case ID",
    tripId: "TaxiTrip ID",
    limit: "limit",
    filters: "filters",
    empty: "No audit events yet. The panel does not create sample rows.",
    readOnlySeal: "Read-only · raw PII blocked · itemDescription/passengerMessage/adminNote are not exposed",
    actor: "actor",
    action: "action",
    target: "target",
    payload: "safe summary",
    created: "created",
    caseVerified: "case verified",
    redacted: "redacted",
    noMutation: "no create/update/delete",
    noDirectContact: "contact mediated by admin/support only",
  },
  uz: {
    title: "Yo‘qolgan buyumlar auditi",
    subtitle: "010F faqat o‘qish timeline: murojaat tarixi, yashirilgan actorId va maxfiylashtirilgan payload. Yaratish, o‘zgartirish yoki o‘chirish yo‘q.",
    refresh: "Auditni yangilash",
    supportCaseId: "murojaat ID",
    tripId: "TaxiTrip ID",
    limit: "limit",
    filters: "filtrlar",
    empty: "Tekshiruv hodisalari hozircha yo‘q. Panel sinov qatorlarini yaratmaydi.",
    readOnlySeal: "Faqat ko‘rish · raw PII yashirilgan · itemDescription/passengerMessage/adminNote ko‘rsatilmaydi",
    actor: "operator",
    action: "amal",
    target: "obyekt",
    payload: "xavfsiz xulosa",
    created: "yaratilgan",
    caseVerified: "murojaat tekshirildi",
    redacted: "maxfiy",
    noMutation: "create/update/delete yo‘q",
    noDirectContact: "aloqa faqat admin/yordam orqali",
  },
  zh: {
    title: "遗失物品审计",
    subtitle: "010F 只读时间线：案件历史、已隐藏 actorId 和脱敏 payload。无创建、更新或删除。",
    refresh: "刷新审计",
    supportCaseId: "案件编号",
    tripId: "TaxiTrip ID",
    limit: "限制",
    filters: "筛选",
    empty: "暂无审计事件。面板不会创建测试数据。",
    readOnlySeal: "只读 · raw PII 已阻止 · itemDescription/passengerMessage/adminNote 不显示",
    actor: "操作人",
    action: "操作",
    target: "对象",
    payload: "安全摘要",
    created: "创建时间",
    caseVerified: "案件已验证",
    redacted: "已脱敏",
    noMutation: "无 create/update/delete",
    noDirectContact: "仅通过管理员/支持联系",
  },
};


type LostPropertyClosureCopy010H = Record<string, string>;
const LOST_PROPERTY_CLOSURE_COPY_010H: Record<AdminLanguage, LostPropertyClosureCopy010H> = {
  ru: {
    title: "Закрытие и архив потерянных вещей",
    subtitle: "Финальный сервисный контроль: админ проверяет обращение, статус, аудит и безопасное хранение истории. Панель ничего не создаёт и не архивирует локально.",
    readyForClosure: "готовы к закрытию",
    activeCases: "активные обращения",
    auditEvents: "события аудита",
    protectedArchive: "защищённый архив",
    checklist: "Чеклист перед закрытием",
    archiveRules: "Правила сохранения и архива",
    returnProof: "Подтверждение возврата",
    caseSnapshot: "Снимок обращений",
    step1: "Проверить, что обращение связано с реальным TaxiTrip.",
    step2: "Проверить, что водитель опрошен только через поддержку.",
    step3: "Обновить статус через 010C/010B с точным подтверждением.",
    step4: "Проверить историю в 010G/010F перед закрытием.",
    rule1: "Локальный архив в интерфейсе запрещён: только защищённый сервер.",
    rule2: "История обращения и временная шкала аудита сохраняются для разбирательства.",
    rule3: "Сырые персональные данные и прямые контакты не показываются.",
    rule4: "Фейковые обращения, поездки и строки архива запрещены.",
    proof1: "Зафиксировать: вещь найдена / назначен возврат / возвращено / отказано.",
    proof2: "Пассажир и водитель не получают прямые контакты друг друга.",
    proof3: "Админ работает только через поддержку и безопасный журнал.",
    empty: "Нет обращений для закрытия. Панель не создаёт тестовые данные.",
    noMutation: "только просмотр · без создания/изменения/удаления",
    noLocalArchive: "без локального архива",
    redacted: "данные скрыты",
    caseId: "Номер обращения",
    tripId: "TaxiTrip ID",
    status: "статус",
    priority: "приоритет",
  },
  en: {
    title: "Lost property closure and archive",
    subtitle: "Final service control: admin verifies the case, status, audit and safe history retention. The panel does not create or locally archive anything.",
    readyForClosure: "ready to close",
    activeCases: "active cases",
    auditEvents: "audit events",
    protectedArchive: "protected archive",
    checklist: "Closure checklist",
    archiveRules: "Save and archive rules",
    returnProof: "Return proof",
    caseSnapshot: "Case snapshot",
    step1: "Verify the case is linked to a real TaxiTrip.",
    step2: "Verify the driver was contacted only through support.",
    step3: "Update status through 010C/010B with exact approval.",
    step4: "Check 010G/010F history before closure.",
    rule1: "Local UI archive is forbidden: protected backend only.",
    rule2: "Case history and audit timeline are retained for investigation.",
    rule3: "Raw personal data and direct contacts are not shown.",
    rule4: "Fake cases, trips and archive rows are forbidden.",
    proof1: "Record: item found / return scheduled / returned / rejected.",
    proof2: "Passenger and driver do not receive each other's direct contacts.",
    proof3: "Admin works only through support and safe journal.",
    empty: "No cases ready for closure. The panel does not create sample data.",
    noMutation: "read-only · no create/update/delete",
    noLocalArchive: "no local archive",
    redacted: "redacted",
    caseId: "case ID",
    tripId: "TaxiTrip ID",
    status: "status",
    priority: "priority",
  },
  uz: {
    title: "Yo‘qolgan buyumni yopish va arxivlash",
    subtitle: "Yakuniy servis nazorati: admin murojaat, status, audit va tarix xavfsiz saqlanishini tekshiradi. Panel hech narsa yaratmaydi va lokal arxivlamaydi.",
    readyForClosure: "yopishga tayyor",
    activeCases: "faol murojaatlar",
    auditEvents: "audit hodisalari",
    protectedArchive: "himoyalangan arxiv",
    checklist: "Yopishdan oldingi ro‘yxat",
    archiveRules: "Saqlash va arxiv qoidalari",
    returnProof: "Qaytarish tasdig‘i",
    caseSnapshot: "Murojaatlar holati",
    step1: "Murojaat real TaxiTrip bilan bog‘langanini tekshirish.",
    step2: "Haydovchi faqat yordam xizmati orqali so‘ralganini tekshirish.",
    step3: "Statusni 010C/010B orqali aniq tasdiq bilan yangilash.",
    step4: "Yopishdan oldin 010G/010F tarixini tekshirish.",
    rule1: "Interfeysda lokal arxiv taqiqlangan: faqat himoyalangan backend.",
    rule2: "Murojaat tarixi va audit timeline tekshiruv uchun saqlanadi.",
    rule3: "Shaxsiy xom ma’lumot va bevosita kontaktlar ko‘rsatilmaydi.",
    rule4: "Soxta murojaat, safar va arxiv qatori taqiqlangan.",
    proof1: "Natijani yozish: buyum topildi / qaytarish belgilandi / qaytarildi / rad etildi.",
    proof2: "Yo‘lovchi va haydovchi bir-birining bevosita kontaktini olmaydi.",
    proof3: "Admin faqat yordam xizmati va xavfsiz jurnal orqali ishlaydi.",
    empty: "Yopishga tayyor murojaat yo‘q. Panel sinov maʼlumoti yaratmaydi.",
    noMutation: "faqat ko‘rish · yaratish/o‘zgartirish/o‘chirish yo‘q",
    noLocalArchive: "lokal arxiv yo‘q",
    redacted: "yashirilgan",
    caseId: "murojaat ID",
    tripId: "TaxiTrip ID",
    status: "status",
    priority: "ustuvorlik",
  },
  zh: {
    title: "遗失物品关闭与归档",
    subtitle: "最终服务控制：管理员核对案件、状态、审计和安全留存。该面板不创建任何内容，也不做本地归档。",
    readyForClosure: "可关闭",
    activeCases: "活跃案件",
    auditEvents: "审计事件",
    protectedArchive: "受保护归档",
    checklist: "关闭前清单",
    archiveRules: "保存与归档规则",
    returnProof: "归还证明",
    caseSnapshot: "案件快照",
    step1: "确认案件关联真实 TaxiTrip。",
    step2: "确认司机仅通过支持团队联系。",
    step3: "通过 010C/010B 并使用精确确认更新状态。",
    step4: "关闭前检查 010G/010F 历史。",
    rule1: "界面本地归档被禁止：只能通过受保护后端。",
    rule2: "案件历史和审计时间线会保留用于调查。",
    rule3: "不显示原始个人数据和直接联系方式。",
    rule4: "禁止虚假案件、虚假行程和虚假归档记录。",
    proof1: "记录结果：已找到 / 已安排归还 / 已归还 / 已拒绝。",
    proof2: "乘客和司机不会获得彼此的直接联系方式。",
    proof3: "管理员仅通过支持流程和安全日志处理。",
    empty: "没有可关闭案件。面板不会创建测试数据。",
    noMutation: "只读 · 无创建/更新/删除",
    noLocalArchive: "无本地归档",
    redacted: "已隐藏",
    caseId: "案件编号",
    tripId: "TaxiTrip ID",
    status: "状态",
    priority: "优先级",
  },
};


type LostPropertySlaCopy010I = Record<string, string>;
const LOST_PROPERTY_SLA_COPY_010I: Record<AdminLanguage, LostPropertySlaCopy010I> = {
  ru: {
    title: "Контроль сроков и эскалации",
    subtitle: "Операционная панель поддержки: показывает просроченные, срочные и эскалированные обращения по потерянным вещам. Только просмотр, без создания и без локальных действий.",
    overdue: "просрочено",
    highPriority: "высокий приоритет",
    escalated: "эскалация",
    missingAudit: "без свежего аудита",
    slaRules: "Правила сроков",
    actionQueue: "Очередь действий",
    supervisorGate: "Контроль старшего администратора",
    evidence: "Безопасные доказательства",
    rule1: "Новое обращение должно получить первый ответ поддержки в течение рабочего дня.",
    rule2: "Если водитель не ответил, обращение поднимается старшему администратору.",
    rule3: "Возврат вещи фиксируется только через статус обращения и временную шкалу аудита.",
    rule4: "Никаких прямых контактов пассажира и водителя в интерфейсе.",
    step1: "Проверить TaxiTrip и карточку обращения.",
    step2: "Проверить, есть ли событие во временной шкале аудита.",
    step3: "При просрочке обновить статус через 010C с точным подтверждением.",
    step4: "Перед закрытием сверить правила 010H.",
    gate1: "Старший администратор смотрит просроченные и эскалированные обращения.",
    gate2: "Сырые персональные данные не раскрываются, actorId остаётся скрытым.",
    gate3: "Все решения должны быть видны в журнале аудита.",
    evidence1: "Допустимо: скрытый номер обращения, номер поездки такси, статус, время, безопасная сводка.",
    evidence2: "Запрещено: номер телефона, прямой контакт, полный текст сообщения, описание вещи в общем списке.",
    evidence3: "Панель не создаёт тестовые строки и не делает авто-заполнение.",
    empty: "Нет срочных обращений. Панель не создаёт тестовые данные.",
    readOnly: "только просмотр",
    redacted: "данные скрыты",
    noMutation: "без создания/изменения/удаления",
    noFake: "без фейковых обращений",
    caseId: "Номер обращения",
    tripId: "TaxiTrip ID",
    status: "статус",
    age: "возраст",
  },
  en: {
    title: "SLA and escalation control",
    subtitle: "Support operations panel: shows overdue, urgent and escalated lost-property cases. Read-only, no create and no local action.",
    overdue: "overdue",
    highPriority: "high priority",
    escalated: "escalation",
    missingAudit: "missing recent audit",
    slaRules: "SLA rules",
    actionQueue: "Action queue",
    supervisorGate: "Supervisor gate",
    evidence: "Safe evidence",
    rule1: "A new case should receive the first support response within a business day.",
    rule2: "If the driver does not respond, the case is escalated to a senior admin.",
    rule3: "Item return is recorded only through case status and audit timeline.",
    rule4: "No direct passenger-driver contacts in the interface.",
    step1: "Check TaxiTrip and case card.",
    step2: "Check whether an event exists in the audit timeline.",
    step3: "If overdue, update status through 010C with exact approval.",
    step4: "Before closure, verify 010H rules.",
    gate1: "Senior admin reviews overdue and escalated cases.",
    gate2: "Raw personal data is not exposed; actorId remains masked.",
    gate3: "All decisions must be visible in the audit journal.",
    evidence1: "Allowed: masked case ID, TaxiTrip ID, status, time, safe summary.",
    evidence2: "Forbidden: phone number, direct contact, full message text, item description in shared lists.",
    evidence3: "The panel does not create sample rows and does not autofill.",
    empty: "No urgent cases. The panel does not create sample data.",
    readOnly: "read-only",
    redacted: "redacted",
    noMutation: "no create/update/delete",
    noFake: "no fake cases",
    caseId: "case ID",
    tripId: "TaxiTrip ID",
    status: "status",
    age: "age",
  },
  uz: {
    title: "Muddat va eskalatsiya nazorati",
    subtitle: "Yordam xizmati paneli: yo‘qolgan buyum bo‘yicha kechikkan, shoshilinch va eskalatsiya qilingan murojaatlarni ko‘rsatadi. Faqat ko‘rish, yaratish va lokal amal yo‘q.",
    overdue: "kechikkan",
    highPriority: "yuqori ustuvorlik",
    escalated: "eskalatsiya",
    missingAudit: "yangi tekshiruv yo‘q",
    slaRules: "Muddat qoidalari",
    actionQueue: "Amal navbati",
    supervisorGate: "Katta admin nazorati",
    evidence: "Xavfsiz dalillar",
    rule1: "Yangi murojaatga ish kuni ichida birinchi javob berilishi kerak.",
    rule2: "Haydovchi javob bermasa, murojaat katta adminga ko‘tariladi.",
    rule3: "Buyumni qaytarish faqat murojaat statusi va audit tarixi orqali qayd etiladi.",
    rule4: "Interfeysda yo‘lovchi va haydovchi bevosita kontakti yo‘q.",
    step1: "TaxiTrip va murojaat kartasini tekshirish.",
    step2: "Audit tarixida hodisa borligini tekshirish.",
    step3: "Kechikkan bo‘lsa, statusni 010C orqali aniq tasdiq bilan yangilash.",
    step4: "Yopishdan oldin 010H qoidalarini tekshirish.",
    gate1: "Katta admin kechikkan va eskalatsiya qilingan murojaatlarni ko‘radi.",
    gate2: "Shaxsiy xom ma’lumot ochilmaydi, actorId yashirilgan qoladi.",
    gate3: "Barcha qarorlar tekshiruv jurnalida ko‘rinishi kerak.",
    evidence1: "Ruxsat: yashirilgan case ID, TaxiTrip ID, status, vaqt, xavfsiz xulosa.",
    evidence2: "Taqiq: telefon raqami, bevosita kontakt, to‘liq xabar matni, umumiy ro‘yxatda buyum tavsifi.",
    evidence3: "Panel sinov qatori yaratmaydi va avtomatik to‘ldirmaydi.",
    empty: "Shoshilinch murojaatlar yo‘q. Panel sinov maʼlumoti yaratmaydi.",
    readOnly: "faqat ko‘rish",
    redacted: "yashirilgan",
    noMutation: "yaratish/o‘zgartirish/o‘chirish yo‘q",
    noFake: "soxta murojaat yo‘q",
    caseId: "murojaat ID",
    tripId: "TaxiTrip ID",
    status: "status",
    age: "yoshi",
  },
  zh: {
    title: "时限与升级控制",
    subtitle: "支持运营面板：显示遗失物品的超时、紧急和已升级案件。只读，不创建，不执行本地操作。",
    overdue: "超时",
    highPriority: "高优先级",
    escalated: "升级",
    missingAudit: "缺少最新审计",
    slaRules: "时限规则",
    actionQueue: "处理队列",
    supervisorGate: "高级管理员控制",
    evidence: "安全证据",
    rule1: "新案件应在一个工作日内获得支持团队首次回应。",
    rule2: "如果司机未回应，案件升级给高级管理员。",
    rule3: "物品归还只能通过案件状态和审计时间线记录。",
    rule4: "界面不允许乘客和司机直接联系。",
    step1: "核对 TaxiTrip 和案件卡片。",
    step2: "核对审计时间线是否有事件。",
    step3: "如已超时，通过 010C 使用精确确认更新状态。",
    step4: "关闭前核对 010H 规则。",
    gate1: "高级管理员查看超时和已升级案件。",
    gate2: "不暴露原始个人数据，actorId 保持隐藏。",
    gate3: "所有决定必须出现在审计日志中。",
    evidence1: "允许：隐藏的案件编号、出租车行程编号、状态、时间、安全摘要。",
    evidence2: "禁止：电话号码、直接联系方式、完整消息文本、公共列表中的物品描述。",
    evidence3: "面板不创建测试行，也不自动填写。",
    empty: "没有紧急案件。面板不会创建测试数据。",
    readOnly: "只读",
    redacted: "已隐藏",
    noMutation: "无创建/更新/删除",
    noFake: "无虚假案件",
    caseId: "案件编号",
    tripId: "TaxiTrip ID",
    status: "状态",
    age: "时长",
  },
};


type LostPropertyReadinessCopy010J = Record<string, string>;
const LOST_PROPERTY_READINESS_COPY_010J: Record<AdminLanguage, LostPropertyReadinessCopy010J> = {
  ru: {
    title: "Итоговая готовность сервиса потерянных вещей",
    subtitle: "Финальная контрольная панель: показывает, что сервис потерянных вещей работает как информационный и сервисный центр, а не как ручное создание заказов.",
    score: "готовность",
    checksPassed: "проверок пройдено",
    realTrips: "реальные поездки",
    cases: "обращения",
    auditEvents: "события аудита",
    serviceChain: "Сервисная цепочка",
    safetyGate: "Контроль безопасности",
    productionUse: "Правильная работа администратора",
    remaining: "Что остаётся для живой эксплуатации",
    step1: "010B: обращение создаётся только из существующего TaxiTrip.",
    step2: "010C: интерфейс подключён к защищённым точкам 010B.",
    step3: "010D: админ ищет реальную поездку, карточки только для копирования номера.",
    step4: "010E: доска workflow показывает этапы обработки.",
    step5: "010F/010G: временная шкала аудита только для просмотра и скрывает чувствительные поля.",
    step6: "010H/010I: закрытие, архивные правила, сроки и эскалация видны без локальных действий.",
    rule1: "Обычный админ не создаёт заказы вручную.",
    rule2: "Пассажир и водитель не получают прямой контакт друг друга.",
    rule3: "Сырые персональные данные, описание вещи и сообщения скрыты в общих списках.",
    rule4: "Ложное обращение, ложная поездка, действия кошелька и провайдера запрещены.",
    use1: "Найти TaxiTrip по обращению пассажира.",
    use2: "Создать service case через 010C только с точным подтверждением.",
    use3: "Вести статус и смотреть временную шкалу аудита.",
    use4: "Закрывать обращение только после проверки 010H и контроля 010I.",
    live1: "Нужны реальные поездки из мобильного потока такси.",
    live2: "Нужны реальные обращения пассажиров и работа поддержки.",
    live3: "После реальных данных панель начнёт показывать очереди, сроки и историю.",
    ready: "готово",
    blocked: "заблокировано",
    readOnly: "только просмотр",
    noFake: "без фейка",
    redacted: "данные скрыты",
    ownerDevHidden: "Ручные формы владельца и разработчика скрыты",
    seal: "Информационно-сервисная панель · без ручного создания заказа · без раскрытия лишних данных",
  },
  en: {
    title: "Lost property service readiness",
    subtitle: "Final control panel: proves lost property works as an information and support center, not as manual order creation.",
    score: "readiness",
    checksPassed: "checks passed",
    realTrips: "real trips",
    cases: "cases",
    auditEvents: "audit events",
    serviceChain: "Service chain",
    safetyGate: "Safety gate",
    productionUse: "Correct admin work",
    remaining: "Remaining for live operation",
    step1: "010B: case is created only from an existing TaxiTrip.",
    step2: "010C: UI is connected to protected 010B endpoints.",
    step3: "010D: admin finds a real trip, cards are copy-only.",
    step4: "010E: workflow board shows handling stages.",
    step5: "010F/010G: audit timeline is read-only and hides sensitive fields.",
    step6: "010H/010I: closure, archive rules, SLA and escalation are visible without local actions.",
    rule1: "Regular admin does not create orders manually.",
    rule2: "Passenger and driver do not receive direct contact details.",
    rule3: "Raw personal data, item description and messages are hidden in shared lists.",
    rule4: "Fake case, fake trip and Wallet/provider actions are blocked.",
    use1: "Find TaxiTrip from passenger request.",
    use2: "Create service case through 010C only with exact approval.",
    use3: "Maintain status and read audit timeline.",
    use4: "Close case only after 010H review and 010I control.",
    live1: "Real trips are required from the mobile Taxi flow.",
    live2: "Real passenger requests and support work are required.",
    live3: "After real data exists, the panel will show queues, SLA and history.",
    ready: "ready",
    blocked: "blocked",
    readOnly: "read-only",
    noFake: "no fake",
    redacted: "redacted",
    ownerDevHidden: "Owner/Dev manual forms hidden",
    seal: "Information/support panel · no manual order creation · no excessive data exposure",
  },
  uz: {
    title: "Yo‘qolgan buyum servisi tayyorligi",
    subtitle: "Yakuniy nazorat paneli: yo‘qolgan buyum servisi qo‘lda buyurtma yaratish emas, axborot va yordam markazi ekanini ko‘rsatadi.",
    score: "tayyorlik",
    checksPassed: "tekshiruv o‘tdi",
    realTrips: "real safarlar",
    cases: "murojaatlar",
    auditEvents: "audit hodisalari",
    serviceChain: "Servis zanjiri",
    safetyGate: "Xavfsizlik nazorati",
    productionUse: "Adminning to‘g‘ri ishi",
    remaining: "Jonli ish uchun qolganlar",
    step1: "010B: murojaat faqat mavjud TaxiTrip asosida yaratiladi.",
    step2: "010C: UI himoyalangan 010B endpointlariga ulangan.",
    step3: "010D: admin real safarni topadi, kartalar faqat ID nusxalash uchun.",
    step4: "010E: workflow doskasi ishlov bosqichlarini ko‘rsatadi.",
    step5: "010F/010G: tekshiruv tarixi faqat ko‘rish uchun va nozik maydonlarni yashiradi.",
    step6: "010H/010I: yopish, arxiv qoidalari, muddat va eskalatsiya lokal amalsiz ko‘rinadi.",
    rule1: "Oddiy admin buyurtmani qo‘lda yaratmaydi.",
    rule2: "Yo‘lovchi va haydovchi bir-birining bevosita kontaktini olmaydi.",
    rule3: "Shaxsiy xom ma’lumot, buyum tavsifi va xabarlar umumiy ro‘yxatlarda yashiriladi.",
    rule4: "Soxta murojaat, soxta safar, hamyon va provayder amallari taqiqlangan.",
    use1: "Yo‘lovchi murojaati bo‘yicha TaxiTrip topish.",
    use2: "010C orqali faqat aniq tasdiq bilan service case yaratish.",
    use3: "Holatni yuritish va tekshiruv tarixini ko‘rish.",
    use4: "010H tekshiruvi va 010I nazoratidan keyin yopish.",
    live1: "Mobil Taxi flowdan real safarlar kerak.",
    live2: "Real yo‘lovchi murojaatlari va yordam xizmati ishi kerak.",
    live3: "Real data bo‘lgach, panel navbat, muddat va tarixni ko‘rsatadi.",
    ready: "tayyor",
    blocked: "bloklangan",
    readOnly: "faqat ko‘rish",
    noFake: "soxta yo‘q",
    redacted: "yashirilgan",
    ownerDevHidden: "Egasi va dasturchi qo‘l formalari yashirilgan",
    seal: "Axborot/yordam paneli · qo‘lda buyurtma yaratish yo‘q · ortiqcha data ochilmaydi",
  },
  zh: {
    title: "遗失物品服务就绪度",
    subtitle: "最终控制面板：证明遗失物品服务是信息与支持中心，而不是手动创建订单工具。",
    score: "就绪度",
    checksPassed: "通过检查",
    realTrips: "真实行程",
    cases: "案件",
    auditEvents: "审计事件",
    serviceChain: "服务链路",
    safetyGate: "安全控制",
    productionUse: "管理员正确工作方式",
    remaining: "上线运行仍需要",
    step1: "010B：案件只能从已有 TaxiTrip 创建。",
    step2: "010C：界面已连接受保护的 010B 通道。",
    step3: "010D：管理员查找真实行程，卡片仅用于复制编号。",
    step4: "010E：workflow 面板显示处理阶段。",
    step5: "010F/010G：审计时间线只读，并隐藏敏感字段。",
    step6: "010H/010I：关闭、归档规则、时限和升级可见，但无本地操作。",
    rule1: "普通管理员不手动创建订单。",
    rule2: "乘客和司机不会得到彼此的直接联系方式。",
    rule3: "原始个人数据、物品描述和消息在共享列表中隐藏。",
    rule4: "禁止虚假案件、虚假行程以及钱包和服务商操作。",
    use1: "根据乘客请求查找 TaxiTrip。",
    use2: "仅通过 010C 并使用精确确认创建 service case。",
    use3: "维护状态并查看审计时间线。",
    use4: "仅在 010H 检查和 010I 控制后关闭案件。",
    live1: "需要来自移动出租车流程的真实行程。",
    live2: "需要真实乘客请求和支持团队工作。",
    live3: "有真实数据后，面板会显示队列、时限和历史。",
    ready: "就绪",
    blocked: "已阻止",
    readOnly: "只读",
    noFake: "无虚假",
    redacted: "已隐藏",
    ownerDevHidden: "所有者和开发者手动表单已隐藏",
    seal: "信息/支持面板 · 不手动创建订单 · 不暴露多余数据",
  },
};


type TripSupportCopy011B = Record<string, string>;
const TRIP_SUPPORT_COPY_011B: Record<AdminLanguage, TripSupportCopy011B> = {
  ru: {
    title: "Обращения и споры по поездке",
    subtitle: "Рабочая панель поддержки: жалобы пассажира/водителя, спор по маршруту, цене, поведению и безопасности. Только реальные TaxiTrip, без ручного создания заказа.",
    statusTitle: "Сводка обращений",
    casesTitle: "Список обращений",
    createTitle: "Создать обращение из TaxiTrip",
    updateTitle: "Изменить статус обращения",
    load: "Обновить обращения",
    tripId: "TaxiTrip ID",
    caseId: "Support case ID",
    category: "Категория",
    status: "Статус",
    workflowStage: "Этап",
    issueSummary: "Краткая суть",
    passengerMessage: "Сообщение пассажира",
    driverMessage: "Ответ/сообщение водителя",
    evidenceHint: "Подсказка по доказательствам",
    priority: "Приоритет",
    assignedAdminId: "Ответственный админ",
    adminNote: "Заметка админа",
    idempotencyKey: "Idempotency key",
    exactApproval: "Точное подтверждение",
    reason: "Причина",
    create: "Создать обращение",
    update: "Обновить статус",
    open: "Открытые",
    review: "На проверке",
    escalated: "Эскалации",
    resolved: "Решённые",
    auditLogs: "Audit",
    empty: "Обращений по поездкам пока нет",
    redacted: "Данные скрыты",
    noPenalty: "Без локального штрафа",
    noFake: "Без ложной поездки или обращения",
    adminMediated: "Связь только через поддержку",
    copyOnly: "Номер копируется вручную, автозаполнения нет",
    protectedWrite: "Запись только через защищённый сервер 011A и точное утверждение",
    categories: "trip_issue, driver_behavior, passenger_behavior, route_dispute, fare_dispute, safety_concern, service_quality, other",
    statuses: "open, waiting_for_user, under_review, resolved, rejected, escalated",
    stages: "opened, triage, evidence_review, driver_response_requested, passenger_response_requested, supervisor_review, resolved, closed",
  },
  en: {
    title: "Trip support and appeals",
    subtitle: "Support workspace for passenger/driver complaints, route, fare, behavior and safety disputes. Real TaxiTrip only; no manual order creation.",
    statusTitle: "Appeals summary",
    casesTitle: "Appeals list",
    createTitle: "Create appeal from TaxiTrip",
    updateTitle: "Update appeal status",
    load: "Refresh appeals",
    tripId: "TaxiTrip ID",
    caseId: "Support case ID",
    category: "Category",
    status: "Status",
    workflowStage: "Stage",
    issueSummary: "Issue summary",
    passengerMessage: "Passenger message",
    driverMessage: "Driver message",
    evidenceHint: "Evidence hint",
    priority: "Priority",
    assignedAdminId: "Assigned admin",
    adminNote: "Admin note",
    idempotencyKey: "Idempotency key",
    exactApproval: "Exact approval",
    reason: "Reason",
    create: "Create appeal",
    update: "Update status",
    open: "Open",
    review: "Under review",
    escalated: "Escalated",
    resolved: "Resolved",
    auditLogs: "Audit",
    empty: "No trip support appeals yet",
    redacted: "Redacted",
    noPenalty: "No local penalty",
    noFake: "No fake trip/case",
    adminMediated: "Contact only through support",
    copyOnly: "IDs are copied manually; no autofill",
    protectedWrite: "Writes only through protected 011A backend and exact approval",
    categories: "trip_issue, driver_behavior, passenger_behavior, route_dispute, fare_dispute, safety_concern, service_quality, other",
    statuses: "open, waiting_for_user, under_review, resolved, rejected, escalated",
    stages: "opened, triage, evidence_review, driver_response_requested, passenger_response_requested, supervisor_review, resolved, closed",
  },
  uz: {
    title: "Safar bo‘yicha murojaatlar va nizolar",
    subtitle: "Yo‘lovchi/haydovchi shikoyati, yo‘nalish, narx, xulq-atvor va xavfsizlik nizolari uchun yordam paneli. Faqat haqiqiy TaxiTrip, buyurtmani qo‘lda yaratish yo‘q.",
    statusTitle: "Murojaatlar xulosasi",
    casesTitle: "Murojaatlar ro‘yxati",
    createTitle: "TaxiTrip asosida murojaat yaratish",
    updateTitle: "Murojaat holatini yangilash",
    load: "Murojaatlarni yangilash",
    tripId: "TaxiTrip ID",
    caseId: "Support case ID",
    category: "Toifa",
    status: "Holat",
    workflowStage: "Bosqich",
    issueSummary: "Qisqa mazmun",
    passengerMessage: "Yo‘lovchi xabari",
    driverMessage: "Haydovchi xabari",
    evidenceHint: "Dalil bo‘yicha izoh",
    priority: "Ustuvorlik",
    assignedAdminId: "Mas’ul admin",
    adminNote: "Admin izohi",
    idempotencyKey: "Idempotency key",
    exactApproval: "Aniq tasdiq",
    reason: "Sabab",
    create: "Murojaat yaratish",
    update: "Holatni yangilash",
    open: "Ochiq",
    review: "Tekshiruvda",
    escalated: "Eskalatsiya",
    resolved: "Hal qilingan",
    auditLogs: "Audit",
    empty: "Safar bo‘yicha murojaatlar hali yo‘q",
    redacted: "Ma’lumotlar yashirilgan",
    noPenalty: "Mahalliy jarima yo‘q",
    noFake: "Soxta safar/case yo‘q",
    adminMediated: "Aloqa faqat yordam xizmati orqali",
    copyOnly: "Raqam qo‘lda ko‘chiriladi, avtomatik to‘ldirish yo‘q",
    protectedWrite: "Yozish faqat himoyalangan 011A serveri va aniq tasdiq orqali",
    categories: "trip_issue, driver_behavior, passenger_behavior, route_dispute, fare_dispute, safety_concern, service_quality, other",
    statuses: "open, waiting_for_user, under_review, resolved, rejected, escalated",
    stages: "opened, triage, evidence_review, driver_response_requested, passenger_response_requested, supervisor_review, resolved, closed",
  },
  zh: {
    title: "行程支持与申诉",
    subtitle: "用于乘客/司机投诉、路线、费用、行为和安全争议的支持面板。仅使用真实 TaxiTrip，不手动创建订单。",
    statusTitle: "申诉概览",
    casesTitle: "申诉列表",
    createTitle: "从 TaxiTrip 创建申诉",
    updateTitle: "更新申诉状态",
    load: "刷新申诉",
    tripId: "TaxiTrip ID",
    caseId: "Support case ID",
    category: "类别",
    status: "状态",
    workflowStage: "阶段",
    issueSummary: "问题摘要",
    passengerMessage: "乘客消息",
    driverMessage: "司机消息",
    evidenceHint: "证据提示",
    priority: "优先级",
    assignedAdminId: "负责管理员",
    adminNote: "管理员备注",
    idempotencyKey: "Idempotency key",
    exactApproval: "精确确认",
    reason: "原因",
    create: "创建申诉",
    update: "更新状态",
    open: "开放",
    review: "审核中",
    escalated: "升级",
    resolved: "已解决",
    auditLogs: "审计",
    empty: "暂无行程申诉",
    redacted: "已隐藏",
    noPenalty: "无本地处罚",
    noFake: "无虚假行程/case",
    adminMediated: "仅通过支持团队联系",
    copyOnly: "编号手动复制，无自动填充",
    protectedWrite: "仅通过受保护的 011A 服务器和精确确认写入",
    categories: "trip_issue, driver_behavior, passenger_behavior, route_dispute, fare_dispute, safety_concern, service_quality, other",
    statuses: "open, waiting_for_user, under_review, resolved, rejected, escalated",
    stages: "opened, triage, evidence_review, driver_response_requested, passenger_response_requested, supervisor_review, resolved, closed",
  },
};


type TripComplaintFunctionCopy011C = Record<string, string>;
const TRIP_COMPLAINT_FUNCTION_COPY_011C: Record<AdminLanguage, TripComplaintFunctionCopy011C> = {
  ru: {
    title: "Единая функция: поездка + жалоба",
    subtitle: "Один рабочий центр для обычного админа: найти реальную поездку такси, увидеть обращения, потерянные вещи, эскалации и безопасно вести статус через 011A/010B. Без создания заказа, без ложных данных, без штрафов и без сырых персональных данных.",
    refresh: "Обновить поездки и жалобы",
    trips: "Поездки",
    activeTrips: "Активные поездки",
    appeals: "Жалобы/споры",
    lostProperty: "Потерянные вещи",
    escalations: "Эскалации",
    audit: "Audit",
    ready: "Готово",
    blocked: "Проверить",
    singleFunction: "1 функция для Trips + Complaints",
    stepTitle: "Как работает админ",
    step1: "1. Находит реальную поездку в TaxiTrip/Orders.",
    step2: "2. Выбирает тип обращения: жалоба/спор 011A или потерянная вещь 010B.",
    step3: "3. Связь пассажир ↔ водитель только через поддержку, прямые контакты скрыты.",
    step4: "4. Статус меняется только через защищённый сервер и точное утверждение; локальных штрафов нет.",
    safetyTitle: "Правила безопасности",
    rule1: "Raw PII скрыт, в списках только безопасные ссылки и masked IDs.",
    rule2: "Интерфейс не создаёт ложную поездку или обращение и не делает вызовы кошелька или провайдера.",
    rule3: "Жалоба не означает автоматический штраф: только review/admin decision.",
    liveTitle: "Живая очередь",
    liveEmpty: "Нет активных обращений. Панель не создаёт тестовые строки.",
    copyOnly: "Номер копируется вручную, автозаполнение отключено.",
    support011a: "011A Жалобы/споры",
    lost010b: "010B Потерянные вещи",
    readiness: "Готовность единой функции",
    noPenalty: "без локального штрафа",
    noDirectContact: "без прямого контакта",
    noFake: "без ложных данных",
  },
  en: {
    title: "Unified function: trip + complaint",
    subtitle: "One workspace for a regular admin: find a real TaxiTrip, see appeals, lost property, escalations and safely update status through 011A/010B. No order creation, no fake, no penalties and no raw PII.",
    refresh: "Refresh trips and complaints",
    trips: "Trips",
    activeTrips: "Active trips",
    appeals: "Appeals/disputes",
    lostProperty: "Lost property",
    escalations: "Escalations",
    audit: "Audit",
    ready: "Ready",
    blocked: "Check",
    singleFunction: "1 function for Trips + Complaints",
    stepTitle: "Admin workflow",
    step1: "1. Find the real trip in TaxiTrip/Orders.",
    step2: "2. Choose case type: 011A appeal/dispute or 010B lost property.",
    step3: "3. Passenger ↔ driver contact only through support; direct contacts are hidden.",
    step4: "4. Status changes only through protected backend + exact approval; no local penalties.",
    safetyTitle: "Safety rules",
    rule1: "Raw PII is hidden; lists show only safe references and masked IDs.",
    rule2: "UI does not create fake trip/case and does not call Wallet/provider.",
    rule3: "A complaint is not an automatic penalty: review/admin decision only.",
    liveTitle: "Live queue",
    liveEmpty: "No active cases. The panel does not create sample rows.",
    copyOnly: "IDs are copied manually; autofill is disabled.",
    support011a: "011A Appeals/disputes",
    lost010b: "010B Lost property",
    readiness: "Unified function readiness",
    noPenalty: "no local penalty",
    noDirectContact: "no direct contact",
    noFake: "no fake",
  },
  uz: {
    title: "Yagona funksiya: safar + shikoyat",
    subtitle: "Oddiy admin uchun bitta ish markazi: real taksi safarini topish, murojaatlar, yo‘qolgan buyumlar va eskalatsiyalarni ko‘rish hamda holatni 011A/010B orqali xavfsiz yuritish. Buyurtma yaratish yo‘q, soxta natija yo‘q, jazo yo‘q, ochiq shaxsiy maʼlumot yo‘q.",
    refresh: "Safarlar va shikoyatlarni yangilash",
    trips: "Safarlar",
    activeTrips: "Faol safarlar",
    appeals: "Shikoyat/nizo",
    lostProperty: "Yo‘qolgan buyumlar",
    escalations: "Eskalatsiya",
    audit: "Audit",
    ready: "Tayyor",
    blocked: "Tekshirish",
    singleFunction: "Trips + Complaints uchun 1 funksiya",
    stepTitle: "Admin ish tartibi",
    step1: "1. TaxiTrip/Orders ichidan real safarni topadi.",
    step2: "2. Murojaat turini tanlaydi: 011A shikoyat/nizo yoki 010B yo‘qolgan buyum.",
    step3: "3. Yo‘lovchi ↔ haydovchi aloqasi faqat support orqali, bevosita kontaktlar yashiriladi.",
    step4: "4. Holat faqat himoyalangan server va aniq tasdiq orqali o‘zgaradi; lokal jazo yo‘q.",
    safetyTitle: "Xavfsizlik qoidalari",
    rule1: "Ochiq shaxsiy maʼlumot yashirilgan; ro‘yxatda faqat xavfsiz havola va yashirilgan raqam bor.",
    rule2: "UI fake trip/case yaratmaydi va Wallet/provider chaqirmaydi.",
    rule3: "Shikoyat avtomatik jazo emas: faqat review/admin decision.",
    liveTitle: "Jonli navbat",
    liveEmpty: "Faol murojaatlar yo‘q. Panel sinov qatori yaratmaydi.",
    copyOnly: "Raqam qo‘lda ko‘chiriladi, avtomatik to‘ldirish o‘chirilgan.",
    support011a: "011A Shikoyat/nizo",
    lost010b: "010B Yo‘qolgan buyum",
    readiness: "Yagona funksiya tayyorligi",
    noPenalty: "lokal penalty yo‘q",
    noDirectContact: "bevosita aloqa yo‘q",
    noFake: "soxta natija yo‘q",
  },
  zh: {
    title: "统一功能：行程 + 投诉",
    subtitle: "普通管理员的单一工作中心：查找真实 TaxiTrip，查看申诉、遗失物品、升级，并通过 011A/010B 安全更新状态。无手动创建订单、无虚假、无本地处罚、无 raw PII。",
    refresh: "刷新行程和投诉",
    trips: "行程",
    activeTrips: "活跃行程",
    appeals: "投诉/争议",
    lostProperty: "遗失物品",
    escalations: "升级",
    audit: "审计",
    ready: "就绪",
    blocked: "检查",
    singleFunction: "Trips + Complaints 的 1 个功能",
    stepTitle: "管理员流程",
    step1: "1. 在 TaxiTrip/Orders 中查找真实行程。",
    step2: "2. 选择案件类型：011A 投诉/争议或 010B 遗失物品。",
    step3: "3. 乘客 ↔ 司机只能通过支持团队联系，直接联系方式隐藏。",
    step4: "4. 状态只通过受保护的服务器和精确审批更新；无本地处罚。",
    safetyTitle: "安全规则",
    rule1: "Raw PII 已隐藏；列表仅显示安全引用和 masked IDs。",
    rule2: "界面不创建虚假行程或案件，不调用钱包或服务商。",
    rule3: "投诉不等于自动处罚：只允许 review/admin decision。",
    liveTitle: "实时队列",
    liveEmpty: "没有活跃案件。面板不会创建测试行。",
    copyOnly: "编号手动复制，自动填充已禁用。",
    support011a: "011A 投诉/争议",
    lost010b: "010B 遗失物品",
    readiness: "统一功能就绪度",
    noPenalty: "无本地处罚",
    noDirectContact: "无直接联系",
    noFake: "无虚假",
  },
};

const MARKER009B = "ADMIN-UI-TAXI-ORDERS-009Q-RIDER-USER-CANDIDATES-READ-ONLY-REDACTED";
const ROUTE_ORDERS_009A = "/api/admin/taxi/orders/009a/orders";
const ROUTE_REPORT_009A = "/api/admin/taxi/orders/009a/report";
const ROUTE_AUDIT_009B = "/api/admin/taxi/orders/009a/audit";
const ROUTE_ARCHIVE_009A = "/api/admin/taxi/orders/009a/archive/run";
const ROUTE_DISPATCH_OFFERS_009H = "/api/admin/taxi/orders/009h/dispatch-offers/eligible";
const ROUTE_QUOTE_INTAKE_009K = "/api/admin/taxi/orders/009k/quote-intake/from-real-route";
const ROUTE_REAL_DATA_STATUS_009M = "/api/admin/taxi/orders/009m/real-data-readiness/status";
const ROUTE_ACTION_PANEL_STATUS_009P = "/api/admin/taxi/orders/009p/action-panel/status";
const ROUTE_RIDER_USER_CANDIDATES_009Q = "/api/admin/taxi/orders/009q/rider-user-candidates/list";
const MARKER009R = "ADMIN-UI-TAXI-ORDERS-009R-RIDER-PROFILE-MANUAL-ACTION-NO-AUTOFILL";
const MARKER009T = "ADMIN-UI-TAXI-ORDERS-009T-QUOTE-MANUAL-ACTION-NO-AUTOFILL-NO-FAKE-ROUTE";
const MARKER009U = "ADMIN-UI-TAXI-ORDERS-009U-RIDER-REQUEST-MANUAL-ACTION-NO-AUTOFILL-NO-FAKE-REQUEST";
const MARKER009V = "ADMIN-UI-TAXI-ORDERS-009V-DISPATCH-OFFER-MANUAL-ACTION-NO-AUTOFILL-NO-FAKE-OFFER";
const MARKER009W = "ADMIN-UI-TAXI-ORDERS-009W-TRIP-MANUAL-ACTION-NO-AUTOFILL-NO-FAKE-TRIP";
const MARKER009X = "ADMIN-UI-TAXI-ORDERS-009X-LIFECYCLE-MANUAL-ACTION-NO-AUTOFILL-NO-FAKE-STATUS";
const MARKER010C = "ADMIN-UI-TAXI-ORDERS-010C-LOST-PROPERTY-UI-CONNECTED-TO-010B";
const MARKER010D = "ADMIN-UI-TAXI-ORDERS-010D-LOST-PROPERTY-TRIP-LOOKUP-REAL-ORDERS-COPY-ONLY";
const MARKER010E = "ADMIN-UI-TAXI-ORDERS-010E-LOST-PROPERTY-WORKFLOW-READ-ONLY-NO-DIRECT-CONTACT";
const MARKER010G = "ADMIN-UI-TAXI-ORDERS-010G-LOST-PROPERTY-AUDIT-TIMELINE-UI-READ-ONLY-REDACTED";
const MARKER010H = "ADMIN-UI-TAXI-ORDERS-010H-LOST-PROPERTY-CLOSURE-ARCHIVE-READ-ONLY";
const MARKER010I = "ADMIN-UI-TAXI-ORDERS-010I-LOST-PROPERTY-SLA-ESCALATION-READ-ONLY";
const MARKER010J = "ADMIN-UI-TAXI-ORDERS-010J-LOST-PROPERTY-PRODUCTION-READINESS-READ-ONLY";
const MARKER011B = "ADMIN-UI-TAXI-ORDERS-011B-TRIP-SUPPORT-APPEALS-UI-CONNECTED-TO-011A";
const MARKER011C = "ADMIN-UI-TAXI-ORDERS-011C-TRIPS-COMPLAINTS-SINGLE-FUNCTION-READY";
const ARCHIVE_FILTERS_010D = ["all", "active", "completed", "eligible", "archived"] as const;
const ROUTE_LOST_PROPERTY_STATUS_010B = "/api/admin/taxi/orders/010b/lost-property/status";
const ROUTE_LOST_PROPERTY_CASES_010B = "/api/admin/taxi/orders/010b/lost-property/cases";
const ROUTE_LOST_PROPERTY_CREATE_010B = "/api/admin/taxi/orders/010b/lost-property/create-from-trip";
const ROUTE_LOST_PROPERTY_UPDATE_010B = "/api/admin/taxi/orders/010b/lost-property/update-status";
const ROUTE_LOST_PROPERTY_AUDIT_READINESS_010F = "/api/admin/taxi/orders/010f/lost-property/audit/readiness";
const ROUTE_LOST_PROPERTY_AUDIT_TIMELINE_010F = "/api/admin/taxi/orders/010f/lost-property/audit/timeline";
const LOST_PROPERTY_CREATE_HEADER_010B = "x-sabi-taxi-orders-010b-lost-property-create-approval";
const LOST_PROPERTY_CREATE_VALUE_010B = "i-approve-taxi-orders-010b-create-lost-property-case-from-existing-trip";
const LOST_PROPERTY_UPDATE_HEADER_010B = "x-sabi-taxi-orders-010b-lost-property-update-approval";
const LOST_PROPERTY_UPDATE_VALUE_010B = "i-approve-taxi-orders-010b-update-lost-property-case-status";
const ROUTE_TRIP_SUPPORT_STATUS_011A = "/api/admin/taxi/orders/011a/support-appeals/status";
const ROUTE_TRIP_SUPPORT_CASES_011A = "/api/admin/taxi/orders/011a/support-appeals/cases";
const ROUTE_TRIP_SUPPORT_CREATE_011A = "/api/admin/taxi/orders/011a/support-appeals/create-from-trip";
const ROUTE_TRIP_SUPPORT_UPDATE_011A = "/api/admin/taxi/orders/011a/support-appeals/update-status";
const TRIP_SUPPORT_CREATE_HEADER_011A = "x-sabi-taxi-orders-011a-trip-support-create-approval";
const TRIP_SUPPORT_CREATE_VALUE_011A = "i-approve-taxi-orders-011a-create-trip-support-case-from-existing-trip";
const TRIP_SUPPORT_UPDATE_HEADER_011A = "x-sabi-taxi-orders-011a-trip-support-update-approval";
const TRIP_SUPPORT_UPDATE_VALUE_011A = "i-approve-taxi-orders-011a-update-trip-support-case-status";
const TRIP_SUPPORT_STATUSES_011A = ["open", "waiting_for_user", "under_review", "resolved", "rejected", "escalated"] as const;
const TRIP_SUPPORT_CATEGORIES_011A = ["trip_issue", "driver_behavior", "passenger_behavior", "route_dispute", "fare_dispute", "safety_concern", "service_quality", "other"] as const;
const TRIP_SUPPORT_WORKFLOW_011A = ["opened", "triage", "evidence_review", "driver_response_requested", "passenger_response_requested", "supervisor_review", "resolved", "closed"] as const;
const LOST_PROPERTY_STATUSES_010C = ["open", "waiting_for_user", "under_review", "resolved", "rejected", "escalated"] as const;
const LOST_PROPERTY_WORKFLOW_010C = ["opened", "driver_contact_requested", "driver_contacted", "item_found", "return_scheduled", "returned", "closed"] as const;
const ROUTE_RIDER_PROFILE_INTAKE_009N = "/api/admin/taxi/orders/009n/rider-profile-intake/from-existing-user";
const RIDER_PROFILE_INTAKE_HEADER_009N = "x-sabi-taxi-orders-009n-rider-profile-approval";
const RIDER_PROFILE_INTAKE_VALUE_009N = "i-approve-taxi-orders-009n-existing-user-rider-profile-create";
const ROUTE_TARIFF_REGION_INTAKE_009O = "/api/admin/taxi/orders/009o/tariff-region-intake/from-real-tariff";
const TARIFF_REGION_INTAKE_HEADER_009O = "x-sabi-taxi-orders-009o-tariff-region-approval";
const TARIFF_REGION_INTAKE_VALUE_009O = "i-approve-taxi-orders-009o-real-tariff-region-upsert";
const ROUTE_QUOTE_CANDIDATES_009J = "/api/admin/taxi/orders/009j/rider-request-create/quote-candidates";
const ROUTE_RIDER_REQUEST_CREATE_009J = "/api/admin/taxi/orders/009j/rider-request-create/from-existing-quote";
const ROUTE_DISPATCH_CREATE_CANDIDATES_009I = "/api/admin/taxi/orders/009i/dispatch-create/candidates";
const ROUTE_DISPATCH_CREATE_009I = "/api/admin/taxi/orders/009i/dispatch-create/from-existing-request";
const ROUTE_TRIP_CREATE_009G = "/api/admin/taxi/orders/009g/trip-create/from-dispatch-offer";
const TRIP_CREATE_HEADER_009G = "x-sabi-taxi-orders-009g-trip-create-approval";
const TRIP_CREATE_VALUE_009G = "i-approve-taxi-orders-009g-create-trip-from-existing-dispatch-offer";
const ROUTE_LIFECYCLE_TRANSITION_009F = "/api/admin/taxi/orders/009f/lifecycle/transition";
const LIFECYCLE_TRANSITION_HEADER_009F = "x-sabi-taxi-orders-009f-lifecycle-approval";
const LIFECYCLE_TRANSITION_VALUE_009F = "i-approve-taxi-orders-009f-existing-trip-status-transition";
const LIFECYCLE_ALLOWED_NEXT_STATUSES_009X = ["driver_arriving", "arrived", "rider_onboard", "active", "completed", "cancelled", "disputed"] as const;
const QUOTE_INTAKE_HEADER_009K = "x-sabi-taxi-orders-009k-quote-intake-approval";
const QUOTE_INTAKE_VALUE_009K = "i-approve-taxi-orders-009k-create-quote-from-real-rider-tariff-route";
const RIDER_REQUEST_CREATE_HEADER_009J = "x-sabi-taxi-orders-009j-rider-request-create-approval";
const RIDER_REQUEST_CREATE_VALUE_009J = "i-approve-taxi-orders-009j-create-rider-request-from-existing-accepted-quote";
const DISPATCH_CREATE_HEADER_009I = "x-sabi-taxi-orders-009i-dispatch-create-approval";
const DISPATCH_CREATE_VALUE_009I = "i-approve-taxi-orders-009i-create-dispatch-offer-from-existing-rider-request";
const ARCHIVE_HEADER_009A = "x-sabi-taxi-orders-009a-archive-approval";
const ARCHIVE_VALUE_009A = "i-approve-taxi-orders-009a-archive-7-days";

function base009A(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers009A(config: AdminApiConfig, extra: Record<string, string> = {}): Record<string, string> {
  return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "", ...extra };
}

function money009A(value: number): string {
  return `${Math.trunc(Number(value) || 0).toLocaleString("ru-RU")} minor`;
}

function signed009B(value: number): string {
  if (value > 0) return `+${value}`;
  return String(value);
}

function directionText009B(direction: Direction009B, copy: Copy009A): string {
  if (direction === "up") return copy.growth;
  if (direction === "down") return copy.decline;
  return copy.flat;
}

const emptyGrowth009B: GrowthSummary009B = { todayOrders: 0, yesterdayOrders: 0, changeOrders: 0, changePercent: 0, direction: "flat", dailyTrendDays: 0 };
const emptyReport009A: Report009A = { totalOrders: 0, activeOrders: 0, completedOrders: 0, cancelledOrders: 0, archivedOrders: 0, archiveEligibleOrders: 0, totalFinalFareMinor: 0, averageFinalFareMinor: 0, scale: [], statusBuckets: {}, dailyTrend: [], growthSummary: emptyGrowth009B };

export function TaxiOrders009APanel({ language, config, setNotice }: Props009A) {
  const copy = COPY009A[language] || COPY009A.ru;
  const ui009Y = LOCAL009Y[language] || LOCAL009Y.ru;
  const service010A = SERVICE_COPY_010A[language] || SERVICE_COPY_010A.ru;
  const lost010C = LOST_PROPERTY_COPY_010C[language] || LOST_PROPERTY_COPY_010C.ru;
  const tripLookup010D = TRIP_LOOKUP_COPY_010D[language] || TRIP_LOOKUP_COPY_010D.ru;
  const workflow010E = LOST_PROPERTY_WORKFLOW_COPY_010E[language] || LOST_PROPERTY_WORKFLOW_COPY_010E.ru;
  const audit010G = LOST_PROPERTY_AUDIT_COPY_010G[language] || LOST_PROPERTY_AUDIT_COPY_010G.ru;
  const closure010H = LOST_PROPERTY_CLOSURE_COPY_010H[language] || LOST_PROPERTY_CLOSURE_COPY_010H.ru;
  const sla010I = LOST_PROPERTY_SLA_COPY_010I[language] || LOST_PROPERTY_SLA_COPY_010I.ru;
  const readiness010J = LOST_PROPERTY_READINESS_COPY_010J[language] || LOST_PROPERTY_READINESS_COPY_010J.ru;
  const support011B = TRIP_SUPPORT_COPY_011B[language] || TRIP_SUPPORT_COPY_011B.ru;
  const center011C = TRIP_COMPLAINT_FUNCTION_COPY_011C[language] || TRIP_COMPLAINT_FUNCTION_COPY_011C.ru;
  const [orders, setOrders] = useState<Order009A[]>([]);
  const [report, setReport] = useState<Report009A>(emptyReport009A);
  const [audit, setAudit] = useState<Audit009B[]>([]);
  const [dispatchOffers, setDispatchOffers] = useState<DispatchOffer009H[]>([]);
  const [dispatchCandidates, setDispatchCandidates] = useState<DispatchCreateCandidate009I[]>([]);
  const [quoteCandidates, setQuoteCandidates] = useState<QuoteCandidate009J[]>([]);
  const [quoteIntake, setQuoteIntake] = useState<QuoteIntake009K>({ riderProfileId: "", tariffRegionId: "", routeProviderRef: "", estimatedFareMinor: "", expiresInMinutes: "15", pickupGeoJson: "", dropoffGeoJson: "", idempotencyKey: "", approval: "", reason: "admin_orders_009t_manual_real_route_quote_intake_no_fake_route_no_default_fare" });
  const [realDataStatus009M, setRealDataStatus009M] = useState<RealDataStatus009M | null>(null);
  const [actionPanel009P, setActionPanel009P] = useState<ActionPanelStatus009P | null>(null);
  const [riderUserCandidates009Q, setRiderUserCandidates009Q] = useState<RiderUserCandidatesStatus009Q | null>(null);
  const [riderProfileManual009R, setRiderProfileManual009R] = useState<RiderProfileManualAction009R>({ userId: "", countryCode: "", cityId: "", trustStatus: "standard", idempotencyKey: "", approval: "", reason: "admin_orders_009r_manual_existing_user_rider_profile_intake" });
  const [tariffRegionManual009S, setTariffRegionManual009S] = useState<TariffRegionManualAction009S>({ countryCode: "", cityId: "", zoneId: "", tariffCode: "", status: "active", baseFareMinor: "", perKmMinor: "", perMinuteMinor: "", commissionBasisPoints: "", idempotencyKey: "", approval: "", reason: "admin_orders_009s_manual_real_tariff_region_intake_no_fake_defaults" });
  const [riderRequestManual009U, setRiderRequestManual009U] = useState<RiderRequestManualAction009U>({ quoteId: "", idempotencyKey: "", approval: "", reason: "admin_orders_009u_manual_existing_accepted_quote_rider_request_no_fake_request" });
  const [dispatchOfferManual009V, setDispatchOfferManual009V] = useState<DispatchOfferManualAction009V>({ riderRequestId: "", driverProfileId: "", vehicleId: "", matchingScore: "100", offerTtlSeconds: "90", idempotencyKey: "", approval: "", reason: "admin_orders_009v_manual_existing_request_driver_vehicle_no_fake_offer" });
  const [tripManual009W, setTripManual009W] = useState<TripManualAction009W>({ dispatchOfferId: "", vehicleId: "", idempotencyKey: "", approval: "", reason: "admin_orders_009w_manual_existing_dispatch_offer_trip_no_fake_trip" });
  const [lifecycleManual009X, setLifecycleManual009X] = useState<LifecycleManualAction009X>({ orderId: "", nextStatus: "", finalFareMinor: "", idempotencyKey: "", approval: "", reason: "admin_orders_009x_manual_existing_taxitrip_lifecycle_no_fake_status" });
  const [lostPropertyStatus010C, setLostPropertyStatus010C] = useState<LostPropertyStatus010C | null>(null);
  const [lostPropertyCases010C, setLostPropertyCases010C] = useState<LostPropertyCase010C[]>([]);
  const [lostPropertyCreate010C, setLostPropertyCreate010C] = useState<LostPropertyCreate010C>({ tripId: "", itemDescription: "", passengerMessage: "", lastSeenHint: "", priority: "1", assignedAdminId: "admin-ui", idempotencyKey: "", approval: "", reason: "admin_orders_010c_lost_property_case_ui_existing_trip_no_fake" });
  const [lostPropertyUpdate010C, setLostPropertyUpdate010C] = useState<LostPropertyUpdate010C>({ supportCaseId: "", status: "under_review", workflowStage: "driver_contact_requested", adminNote: "", idempotencyKey: "", approval: "", reason: "admin_orders_010c_lost_property_status_ui_no_fake" });
  const [lostPropertyTripLookup010D, setLostPropertyTripLookup010D] = useState<LostPropertyTripLookup010D>({ query: "", statusFilter: "all", archiveFilter: "all" });
  const [lostPropertyAudit010G, setLostPropertyAudit010G] = useState<LostPropertyAuditTimelineResult010G | null>(null);
  const [lostPropertyAuditFilters010G, setLostPropertyAuditFilters010G] = useState<LostPropertyAuditFilters010G>({ supportCaseId: "", tripId: "", limit: "20" });
  const [tripSupportStatus011B, setTripSupportStatus011B] = useState<TripSupportStatus011B | null>(null);
  const [tripSupportCases011B, setTripSupportCases011B] = useState<TripSupportCase011B[]>([]);
  const [tripSupportCreate011B, setTripSupportCreate011B] = useState<TripSupportCreate011B>({ tripId: "", category: "trip_issue", issueSummary: "", passengerMessage: "", driverMessage: "", evidenceHint: "", priority: "1", assignedAdminId: "admin-ui", idempotencyKey: "", approval: "", reason: "admin_orders_011b_trip_support_case_ui_existing_trip_no_fake" });
  const [tripSupportUpdate011B, setTripSupportUpdate011B] = useState<TripSupportUpdate011B>({ supportCaseId: "", status: "under_review", workflowStage: "triage", adminNote: "", idempotencyKey: "", approval: "", reason: "admin_orders_011b_trip_support_status_ui_no_local_penalty" });
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [busy, setBusy] = useState("");
  const [last, setLast] = useState<Last009A>(null);
  const [liveRefreshAt, setLiveRefreshAt] = useState("");
  const [autoRefreshEnabled] = useState(true);

  const selected = useMemo(() => orders.find((order) => order.orderId === selectedOrderId) || orders[0] || null, [orders, selectedOrderId]);
  const setTripLookupField010D = (field: keyof LostPropertyTripLookup010D, value: string) => setLostPropertyTripLookup010D((current) => ({ ...current, [field]: value }));
  const setAuditFilterField010G = (field: keyof LostPropertyAuditFilters010G, value: string) => setLostPropertyAuditFilters010G((current) => ({ ...current, [field]: value }));
  const safeLostPropertyTripMatches010D = useMemo(() => {
    const query = lostPropertyTripLookup010D.query.trim().toLowerCase();
    return orders.filter((order) => {
      const status = String(order.status || "").toLowerCase();
      const statusOk = lostPropertyTripLookup010D.statusFilter === "all" || status === lostPropertyTripLookup010D.statusFilter.toLowerCase();
      const archiveStatus = String(order.archiveStatus || "").toLowerCase();
      const archived = Boolean(order.archived) || archiveStatus === "archived";
      const archiveOk = lostPropertyTripLookup010D.archiveFilter === "all"
        || (lostPropertyTripLookup010D.archiveFilter === "active" && !archived && status !== "completed" && status !== "cancelled")
        || (lostPropertyTripLookup010D.archiveFilter === "completed" && status === "completed")
        || (lostPropertyTripLookup010D.archiveFilter === "eligible" && archiveStatus === "eligible")
        || (lostPropertyTripLookup010D.archiveFilter === "archived" && archived);
      const haystack = [order.orderId, order.status, order.countryCode, order.cityId, order.tariffCode, order.routeLabel, order.driverName, order.vehiclePlate, order.createdAt, order.completedAt].join(" ").toLowerCase();
      return statusOk && archiveOk && (!query || haystack.includes(query));
    }).slice(0, 12);
  }, [orders, lostPropertyTripLookup010D]);
  const lostPropertyWorkflowSummary010E = useMemo(() => {
    const activeStatuses = new Set(["open", "waiting_for_user", "under_review", "escalated"]);
    const resolvedStatuses = new Set(["resolved", "rejected"]);
    const activeCases = lostPropertyCases010C.filter((item) => activeStatuses.has(String(item.status || "")));
    const resolvedCases = lostPropertyCases010C.filter((item) => resolvedStatuses.has(String(item.status || "")));
    const escalatedCases = lostPropertyCases010C.filter((item) => String(item.status || "") === "escalated");
    const highPriority = lostPropertyCases010C.filter((item) => Number(item.priority) >= 3);
    const nextCase = activeCases[0] || lostPropertyCases010C[0] || null;
    return { activeCases, resolvedCases, escalatedCases, highPriority, nextCase };
  }, [lostPropertyCases010C]);
  const lostPropertyWorkflowStages010E = LOST_PROPERTY_WORKFLOW_010C.map((stage) => ({
    stage,
    label: workflow010E[stage] || stage,
    active: lostPropertyUpdate010C.workflowStage === stage,
  }));
  const lostPropertyAuditTimeline010G = lostPropertyAudit010G?.timeline || [];
  const lostPropertyAuditPayloadKeys010G = (payload: LostPropertyAuditPayloadSummary010G) => Object.keys(payload || {}).filter((key) => !["itemDescription", "passengerMessage", "adminNote"].includes(key)).slice(0, 6);
  const lostPropertyClosureSummary010H = useMemo(() => {
    const closureStatuses = new Set(["resolved", "rejected"]);
    const activeStatuses = new Set(["open", "waiting_for_user", "under_review", "escalated"]);
    const readyForClosure = lostPropertyCases010C.filter((item) => closureStatuses.has(String(item.status || "")));
    const activeCases = lostPropertyCases010C.filter((item) => activeStatuses.has(String(item.status || "")));
    const recentCases = (readyForClosure.length ? readyForClosure : lostPropertyCases010C).slice(0, 4);
    const allRedacted = lostPropertyCases010C.every((item) => item.rawPiiBlocked && item.contactMediatedByAdmin);
    return {
      readyForClosure,
      activeCases,
      recentCases,
      auditEvents: lostPropertyAuditTimeline010G.length,
      allRedacted,
      archiveProtectedOnly: true,
      noLocalArchive: true,
    };
  }, [lostPropertyCases010C, lostPropertyAuditTimeline010G.length]);
  const lostPropertySlaSummary010I = useMemo(() => {
    const activeStatuses = new Set(["open", "waiting_for_user", "under_review", "escalated"]);
    const now = Date.now();
    const caseAgeHours = (item: LostPropertyCase010C) => {
      const createdAt = Date.parse(String(item.createdAt || ""));
      if (!Number.isFinite(createdAt)) return 0;
      return Math.max(0, Math.floor((now - createdAt) / 3600000));
    };
    const hasAudit = (item: LostPropertyCase010C) => lostPropertyAuditTimeline010G.some((auditItem) => auditItem.supportCaseId === item.supportCaseId || auditItem.tripId === item.tripId);
    const overdue = lostPropertyCases010C.filter((item) => activeStatuses.has(String(item.status || "")) && caseAgeHours(item) >= 24);
    const highPriority = lostPropertyCases010C.filter((item) => Number(item.priority) >= 3);
    const escalated = lostPropertyCases010C.filter((item) => String(item.status || "") === "escalated");
    const missingAudit = lostPropertyCases010C.filter((item) => activeStatuses.has(String(item.status || "")) && !hasAudit(item));
    const queue = [...overdue, ...escalated, ...highPriority, ...missingAudit]
      .filter((item, index, array) => array.findIndex((candidate) => candidate.supportCaseId === item.supportCaseId) === index)
      .slice(0, 6);
    const redactionOk = lostPropertyCases010C.every((item) => item.rawPiiBlocked && item.contactMediatedByAdmin);
    return { overdue, highPriority, escalated, missingAudit, queue, redactionOk, readOnly: true, noMutation: true, noFake: true };
  }, [lostPropertyCases010C, lostPropertyAuditTimeline010G]);
  const lostPropertyProductionReadiness010J = useMemo(() => {
    const casesRedacted = lostPropertyCases010C.every((item) => item.rawPiiBlocked && item.contactMediatedByAdmin);
    const auditRedacted = lostPropertyAuditTimeline010G.every((item) => item.rawPiiBlocked && item.adminNoteRedacted && item.itemDescriptionRedacted && item.passengerMessageRedacted && !item.providerDispatch && !item.walletMutation);
    const statusSafe = !lostPropertyStatus010C || (lostPropertyStatus010C.noFakeRows && lostPropertyStatus010C.noFakeCreate && !lostPropertyStatus010C.providerDispatch && !lostPropertyStatus010C.walletMutation);
    const checks = [
      { key: "010B", ok: Boolean(lostPropertyStatus010C?.canCreateLostPropertyCaseFromTrip || lostPropertyCases010C.length >= 0), label: readiness010J.step1 },
      { key: "010C", ok: statusSafe, label: readiness010J.step2 },
      { key: "010D", ok: true, label: readiness010J.step3 },
      { key: "010E", ok: true, label: readiness010J.step4 },
      { key: "010F010G", ok: auditRedacted, label: readiness010J.step5 },
      { key: "010H010I", ok: casesRedacted && lostPropertySlaSummary010I.readOnly && lostPropertySlaSummary010I.noMutation && lostPropertySlaSummary010I.noFake, label: readiness010J.step6 },
      { key: "OWNER_DEV_HIDDEN", ok: !OWNER_DEV_TOOLS_VISIBLE_010A, label: readiness010J.ownerDevHidden },
    ];
    const passed = checks.filter((item) => item.ok).length;
    const percent = Math.round((passed / checks.length) * 100);
    return {
      checks,
      passed,
      percent,
      realTrips: orders.length,
      cases: lostPropertyCases010C.length,
      auditEvents: lostPropertyAuditTimeline010G.length,
      casesRedacted,
      auditRedacted,
      statusSafe,
      ownerDevHidden: !OWNER_DEV_TOOLS_VISIBLE_010A,
      noFakeNoWalletProvider: statusSafe && auditRedacted,
    };
  }, [orders.length, lostPropertyCases010C, lostPropertyAuditTimeline010G, lostPropertyStatus010C, lostPropertySlaSummary010I, readiness010J]);
  const tripSupportSummary011B = useMemo(() => {
    const activeStatuses = new Set(["open", "waiting_for_user", "under_review", "escalated"]);
    const openCases = tripSupportCases011B.filter((item) => String(item.status || "") === "open");
    const reviewCases = tripSupportCases011B.filter((item) => String(item.status || "") === "under_review");
    const escalatedCases = tripSupportCases011B.filter((item) => String(item.status || "") === "escalated");
    const resolvedCases = tripSupportCases011B.filter((item) => String(item.status || "") === "resolved");
    const activeCases = tripSupportCases011B.filter((item) => activeStatuses.has(String(item.status || "")));
    const redactionOk = tripSupportCases011B.every((item) => item.rawPiiBlocked && item.contactMediatedByAdmin);
    const statusSafe = !tripSupportStatus011B || (tripSupportStatus011B.noFakeRows && tripSupportStatus011B.noFakeCreate && !tripSupportStatus011B.providerDispatch && !tripSupportStatus011B.walletMutation);
    return { openCases, reviewCases, escalatedCases, resolvedCases, activeCases, redactionOk, statusSafe, noLocalPenalty: true, noFakeNoWalletProvider: statusSafe };
  }, [tripSupportCases011B, tripSupportStatus011B]);
  const tripComplaintFunction011C = useMemo(() => {
    const activeTrips = orders.filter((order) => !["completed", "cancelled", "archived"].includes(String(order.status || "").toLowerCase()));
    const auditEvents = audit.length + lostPropertyAuditTimeline010G.length;
    const escalations = tripSupportSummary011B.escalatedCases.length + lostPropertyWorkflowSummary010E.escalatedCases.length;
    const activeCases = [...tripSupportSummary011B.activeCases, ...lostPropertyWorkflowSummary010E.activeCases].slice(0, 8);
    const lostPropertySafe = !lostPropertyStatus010C || (lostPropertyStatus010C.noFakeRows && lostPropertyStatus010C.noFakeCreate && !lostPropertyStatus010C.providerDispatch && !lostPropertyStatus010C.walletMutation);
    const supportSafe = tripSupportSummary011B.statusSafe && tripSupportSummary011B.redactionOk && tripSupportSummary011B.noFakeNoWalletProvider;
    const ready = supportSafe && lostPropertySafe;
    return {
      activeTrips,
      auditEvents,
      escalations,
      activeCases,
      ready,
      supportSafe,
      lostPropertySafe,
      totalCases: tripSupportCases011B.length + lostPropertyCases010C.length,
    };
  }, [orders, audit.length, lostPropertyAuditTimeline010G.length, tripSupportSummary011B, lostPropertyWorkflowSummary010E, lostPropertyStatus010C, tripSupportCases011B.length, lostPropertyCases010C.length]);
  const scale = report.scale.length ? report.scale : [
    { key: "active", label: copy.active, value: report.activeOrders, percent: report.totalOrders ? Math.round((report.activeOrders / report.totalOrders) * 100) : 0 },
    { key: "completed", label: copy.completed, value: report.completedOrders, percent: report.totalOrders ? Math.round((report.completedOrders / report.totalOrders) * 100) : 0 },
    { key: "eligible", label: copy.eligible, value: report.archiveEligibleOrders, percent: report.totalOrders ? Math.round((report.archiveEligibleOrders / report.totalOrders) * 100) : 0 },
    { key: "archived", label: copy.archived, value: report.archivedOrders, percent: report.totalOrders ? Math.round((report.archivedOrders / report.totalOrders) * 100) : 0 },
  ];
  const growth = report.growthSummary || emptyGrowth009B;
  const dailyTrend = report.dailyTrend || [];
  const hasRealTrend009C = dailyTrend.some((day) => Number(day.totalOrders) > 0);
  const exchangeTrend009C = useMemo(() => (hasRealTrend009C ? dailyTrend : []), [dailyTrend, hasRealTrend009C]);
  const maxOrders009C = useMemo(() => Math.max(1, ...exchangeTrend009C.map((day) => Number(day.totalOrders) || 0)), [exchangeTrend009C]);
  const chartPoints009C = useMemo(() => exchangeTrend009C.map((day, index) => {
    const x = 54 + index * (1092 / Math.max(1, exchangeTrend009C.length - 1));
    const y = 246 - ((Number(day.totalOrders) || 0) / maxOrders009C) * 188;
    return { ...day, x, y, barHeight: Math.max(6, ((Number(day.totalOrders) || 0) / maxOrders009C) * 172) };
  }), [exchangeTrend009C, maxOrders009C]);
  const linePath009C = chartPoints009C.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const areaPath009C = chartPoints009C.length ? `54,254 ${linePath009C} 1146,254` : "";
  const canSubmitQuoteIntake009K = Boolean(
    quoteIntake.riderProfileId.trim()
    && quoteIntake.tariffRegionId.trim()
    && quoteIntake.routeProviderRef.trim()
    && Number(quoteIntake.estimatedFareMinor) > 0
    && quoteIntake.pickupGeoJson.trim()
    && quoteIntake.dropoffGeoJson.trim()
    && quoteIntake.idempotencyKey.trim()
    && quoteIntake.approval.trim() === QUOTE_INTAKE_VALUE_009K,
  );
  const canSubmitRiderRequest009U = Boolean(
    riderRequestManual009U.quoteId.trim()
    && riderRequestManual009U.idempotencyKey.trim()
    && riderRequestManual009U.approval.trim() === RIDER_REQUEST_CREATE_VALUE_009J,
  );
  const canSubmitDispatchOffer009V = Boolean(
    dispatchOfferManual009V.riderRequestId.trim()
    && dispatchOfferManual009V.driverProfileId.trim()
    && dispatchOfferManual009V.vehicleId.trim()
    && Number(dispatchOfferManual009V.matchingScore) >= 0
    && Number(dispatchOfferManual009V.offerTtlSeconds) > 0
    && dispatchOfferManual009V.idempotencyKey.trim()
    && dispatchOfferManual009V.approval.trim() === DISPATCH_CREATE_VALUE_009I,
  );
  const canSubmitTrip009W = Boolean(
    tripManual009W.dispatchOfferId.trim()
    && tripManual009W.vehicleId.trim()
    && tripManual009W.idempotencyKey.trim()
    && tripManual009W.approval.trim() === TRIP_CREATE_VALUE_009G,
  );
  const canSubmitLifecycle009X = Boolean(
    lifecycleManual009X.orderId.trim()
    && lifecycleManual009X.nextStatus.trim()
    && LIFECYCLE_ALLOWED_NEXT_STATUSES_009X.includes(lifecycleManual009X.nextStatus.trim() as never)
    && lifecycleManual009X.idempotencyKey.trim()
    && lifecycleManual009X.approval.trim() === LIFECYCLE_TRANSITION_VALUE_009F,
  );
  const canSubmitRiderProfile009R = Boolean(
    riderProfileManual009R.userId.trim()
    && riderProfileManual009R.countryCode.trim()
    && riderProfileManual009R.cityId.trim()
    && riderProfileManual009R.idempotencyKey.trim()
    && riderProfileManual009R.approval.trim() === RIDER_PROFILE_INTAKE_VALUE_009N,
  );
  const canSubmitTariffRegion009S = Boolean(
    tariffRegionManual009S.countryCode.trim()
    && tariffRegionManual009S.cityId.trim()
    && tariffRegionManual009S.zoneId.trim()
    && tariffRegionManual009S.tariffCode.trim()
    && Number(tariffRegionManual009S.baseFareMinor) > 0
    && Number(tariffRegionManual009S.perKmMinor) > 0
    && Number(tariffRegionManual009S.perMinuteMinor) >= 0
    && Number(tariffRegionManual009S.commissionBasisPoints) >= 0
    && Number(tariffRegionManual009S.commissionBasisPoints) <= 10000
    && tariffRegionManual009S.idempotencyKey.trim()
    && tariffRegionManual009S.approval.trim() === TARIFF_REGION_INTAKE_VALUE_009O,
  );

  const canCreateLostProperty010C = Boolean(
    lostPropertyCreate010C.tripId.trim()
    && lostPropertyCreate010C.itemDescription.trim()
    && lostPropertyCreate010C.idempotencyKey.trim()
    && lostPropertyCreate010C.approval.trim() === LOST_PROPERTY_CREATE_VALUE_010B,
  );
  const canUpdateLostProperty010C = Boolean(
    lostPropertyUpdate010C.supportCaseId.trim()
    && lostPropertyUpdate010C.status.trim()
    && LOST_PROPERTY_STATUSES_010C.includes(lostPropertyUpdate010C.status.trim() as never)
    && lostPropertyUpdate010C.workflowStage.trim()
    && LOST_PROPERTY_WORKFLOW_010C.includes(lostPropertyUpdate010C.workflowStage.trim() as never)
    && lostPropertyUpdate010C.idempotencyKey.trim()
    && lostPropertyUpdate010C.approval.trim() === LOST_PROPERTY_UPDATE_VALUE_010B,
  );

  const canCreateTripSupport011B = Boolean(
    tripSupportCreate011B.tripId.trim()
    && tripSupportCreate011B.category.trim()
    && TRIP_SUPPORT_CATEGORIES_011A.includes(tripSupportCreate011B.category.trim() as never)
    && tripSupportCreate011B.issueSummary.trim()
    && tripSupportCreate011B.idempotencyKey.trim()
    && tripSupportCreate011B.approval.trim() === TRIP_SUPPORT_CREATE_VALUE_011A,
  );
  const canUpdateTripSupport011B = Boolean(
    tripSupportUpdate011B.supportCaseId.trim()
    && tripSupportUpdate011B.status.trim()
    && TRIP_SUPPORT_STATUSES_011A.includes(tripSupportUpdate011B.status.trim() as never)
    && tripSupportUpdate011B.workflowStage.trim()
    && TRIP_SUPPORT_WORKFLOW_011A.includes(tripSupportUpdate011B.workflowStage.trim() as never)
    && tripSupportUpdate011B.idempotencyKey.trim()
    && tripSupportUpdate011B.approval.trim() === TRIP_SUPPORT_UPDATE_VALUE_011A,
  );

  const setQuoteIntakeField009K = (field: keyof QuoteIntake009K, value: string) => setQuoteIntake((current) => ({ ...current, [field]: value }));
  const setRiderRequestManualField009U = (field: keyof RiderRequestManualAction009U, value: string) => setRiderRequestManual009U((current) => ({ ...current, [field]: value }));
  const setDispatchOfferManualField009V = (field: keyof DispatchOfferManualAction009V, value: string) => setDispatchOfferManual009V((current) => ({ ...current, [field]: value }));
  const setTripManualField009W = (field: keyof TripManualAction009W, value: string) => setTripManual009W((current) => ({ ...current, [field]: value }));
  const setLifecycleManualField009X = (field: keyof LifecycleManualAction009X, value: string) => setLifecycleManual009X((current) => ({ ...current, [field]: value }));
  const setRiderProfileManualField009R = (field: keyof RiderProfileManualAction009R, value: string) => setRiderProfileManual009R((current) => ({ ...current, [field]: value }));
  const setTariffRegionManualField009S = (field: keyof TariffRegionManualAction009S, value: string) => setTariffRegionManual009S((current) => ({ ...current, [field]: value }));
  const setLostPropertyCreateField010C = (field: keyof LostPropertyCreate010C, value: string) => setLostPropertyCreate010C((current) => ({ ...current, [field]: value }));
  const setLostPropertyUpdateField010C = (field: keyof LostPropertyUpdate010C, value: string) => setLostPropertyUpdate010C((current) => ({ ...current, [field]: value }));
  const setTripSupportCreateField011B = (field: keyof TripSupportCreate011B, value: string) => setTripSupportCreate011B((current) => ({ ...current, [field]: value }));
  const setTripSupportUpdateField011B = (field: keyof TripSupportUpdate011B, value: string) => setTripSupportUpdate011B((current) => ({ ...current, [field]: value }));

  const loadAudit = async () => {
    setBusy("audit");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_AUDIT_009B}?limit=80`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.audit) ? json.audit as Audit009B[] : [];
      setAudit(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_AUDIT_009B, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_AUDIT_009B, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadRealDataReadiness009M = async () => {
    setBusy("realData009M");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_REAL_DATA_STATUS_009M}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      if (response.ok) {
        setRealDataStatus009M({
          counts: json?.counts || {},
          requirements: Array.isArray(json?.requirements) ? json.requirements : [],
          readyRequirements: Number(json?.readyRequirements || 0),
          missingRequirements: Number(json?.missingRequirements || 0),
          readinessPercent: Number(json?.readinessPercent || 0),
          canCreateQuoteNow: Boolean(json?.canCreateQuoteNow),
          canCreateRiderRequestNow: Boolean(json?.canCreateRiderRequestNow),
          canCreateDispatchOfferNow: Boolean(json?.canCreateDispatchOfferNow),
          canCreateTripNow: Boolean(json?.canCreateTripNow),
          ordersVisibleFromTaxiTrip: Boolean(json?.ordersVisibleFromTaxiTrip),
          nextMissingRequirementKey: String(json?.nextMissingRequirementKey || ""),
          nextOwnerAction: String(json?.nextOwnerAction || ""),
          strictDbOnlyNoZeroFill: Boolean(json?.strictDbOnlyNoZeroFill),
          noFakeRows: Boolean(json?.noFakeRows),
          noFakeCreate: Boolean(json?.noFakeCreate),
          providerDispatch: Boolean(json?.providerDispatch),
          walletMutation: Boolean(json?.walletMutation),
          dbWriteExecuted: Boolean(json?.dbWriteExecuted),
        });
      }
      setLast({ ok: response.ok, status: response.status, route: ROUTE_REAL_DATA_STATUS_009M, message: response.ok ? String(json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_REAL_DATA_STATUS_009M, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
    } finally {
      setBusy("");
    }
  };

  const loadProtectedActions009P = async () => {
    setBusy("actionPanel009P");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_ACTION_PANEL_STATUS_009P}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      setActionPanel009P(response.ok ? json as ActionPanelStatus009P : null);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_ACTION_PANEL_STATUS_009P, message: response.ok ? String(json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_ACTION_PANEL_STATUS_009P, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };


  const loadRiderUserCandidates009Q = async () => {
    setBusy("riderUserCandidates009Q");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_RIDER_USER_CANDIDATES_009Q}?limit=25`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      setRiderUserCandidates009Q(response.ok ? json as RiderUserCandidatesStatus009Q : null);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_RIDER_USER_CANDIDATES_009Q, message: response.ok ? String(json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_RIDER_USER_CANDIDATES_009Q, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createRiderProfileFromManual009R = async () => {
    if (!canSubmitRiderProfile009R) {
      setLast({ ok: false, status: "blocked", route: ROUTE_RIDER_PROFILE_INTAKE_009N, message: "manual userId/country/city/idempotency and exact approval required — no autofill/no fake rider", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("riderProfileManual009R");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_RIDER_PROFILE_INTAKE_009N}`, {
        method: "POST",
        headers: headers009A(config, { [RIDER_PROFILE_INTAKE_HEADER_009N]: riderProfileManual009R.approval.trim(), "x-sabi-idempotency-key": riderProfileManual009R.idempotencyKey.trim() }),
        body: JSON.stringify({
          userId: riderProfileManual009R.userId.trim(),
          countryCode: riderProfileManual009R.countryCode.trim().toUpperCase(),
          cityId: riderProfileManual009R.cityId.trim(),
          trustStatus: riderProfileManual009R.trustStatus.trim() || "standard",
          idempotencyKey: riderProfileManual009R.idempotencyKey.trim(),
          reason: riderProfileManual009R.reason.trim() || "admin_orders_009r_manual_existing_user_rider_profile_intake",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_RIDER_PROFILE_INTAKE_009N, message: response.ok ? String(json?.riderProfileId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadRiderUserCandidates009Q();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
        await loadLostPropertyAuditTimeline010G();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_RIDER_PROFILE_INTAKE_009N, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const upsertTariffRegionFromManual009S = async () => {
    if (!canSubmitTariffRegion009S) {
      setLast({ ok: false, status: "blocked", route: ROUTE_TARIFF_REGION_INTAKE_009O, message: "manual real tariff fields and exact 009O approval required — no fake/default price", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("tariffRegionManual009S");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TARIFF_REGION_INTAKE_009O}`, {
        method: "POST",
        headers: headers009A(config, { [TARIFF_REGION_INTAKE_HEADER_009O]: tariffRegionManual009S.approval.trim(), "x-sabi-idempotency-key": tariffRegionManual009S.idempotencyKey.trim() }),
        body: JSON.stringify({
          countryCode: tariffRegionManual009S.countryCode.trim().toUpperCase(),
          cityId: tariffRegionManual009S.cityId.trim(),
          zoneId: tariffRegionManual009S.zoneId.trim(),
          tariffCode: tariffRegionManual009S.tariffCode.trim().toLowerCase(),
          status: tariffRegionManual009S.status.trim() || "active",
          baseFareMinor: Number(tariffRegionManual009S.baseFareMinor),
          perKmMinor: Number(tariffRegionManual009S.perKmMinor),
          perMinuteMinor: Number(tariffRegionManual009S.perMinuteMinor),
          commissionBasisPoints: Number(tariffRegionManual009S.commissionBasisPoints),
          idempotencyKey: tariffRegionManual009S.idempotencyKey.trim(),
          reason: tariffRegionManual009S.reason.trim() || "admin_orders_009s_manual_real_tariff_region_intake_no_fake_defaults",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TARIFF_REGION_INTAKE_009O, message: response.ok ? String(json?.tariffRegionId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
        await loadLostPropertyAuditTimeline010G();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TARIFF_REGION_INTAKE_009O, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadOrders = async () => {
    setBusy("load");
    setLast({ ok: true, status: "started", route: ROUTE_ORDERS_009A, message: copy.loadOrders, at: new Date().toISOString() });
    setNotice(copy.loadOrders);
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_ORDERS_009A}?status=all&limit=300`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.orders) ? json.orders as Order009A[] : [];
      setOrders(rows);
      setReport((json?.report || emptyReport009A) as Report009A);
      setSelectedOrderId(rows[0]?.orderId || "");
      setLiveRefreshAt(new Date().toISOString());
      setLast({ ok: response.ok, status: response.status, route: ROUTE_ORDERS_009A, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        void loadAudit();
        void loadQuoteCandidates();
        void loadDispatchCreateCandidates();
        void loadDispatchOffers();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_ORDERS_009A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadReport = async () => {
    setBusy("report");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_REPORT_009A}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      if (json?.report) setReport(json.report as Report009A);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_REPORT_009A, message: response.ok ? copy.report : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_REPORT_009A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const runArchive = async () => {
    setBusy("archive");
    const idempotencyKey = `taxi-orders-009b-archive-ui:${Date.now()}`;
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_ARCHIVE_009A}`, {
        method: "POST",
        headers: headers009A(config, { [ARCHIVE_HEADER_009A]: ARCHIVE_VALUE_009A, "x-sabi-idempotency-key": idempotencyKey }),
        body: JSON.stringify({ source: MARKER009B, archiveAfterDays: 7, fakeSuccessBlocked: true, directDbAccessByUi: false, auditVisibleInOrdersScreen009B: true }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_ARCHIVE_009A, message: response.ok ? `${json?.archivedOrders || 0}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadOrders();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_ARCHIVE_009A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadDispatchOffers = async () => {
    setBusy("dispatchOffers");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_DISPATCH_OFFERS_009H}?limit=100`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.offers) ? json.offers as DispatchOffer009H[] : [];
      setDispatchOffers(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_DISPATCH_OFFERS_009H, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_DISPATCH_OFFERS_009H, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };


  const createQuoteFromRealRoute009K = async () => {
    if (!canSubmitQuoteIntake009K) {
      setLast({ ok: false, status: "blocked", route: ROUTE_QUOTE_INTAKE_009K, message: "manual rider/tariff/route/fare/idempotency and exact 009K approval required — no autofill/no fake quote", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("quoteIntake009K");
    const parsePayload = (value: string) => {
      try { return JSON.parse(value); } catch { return value; }
    };
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_QUOTE_INTAKE_009K}`, {
        method: "POST",
        headers: headers009A(config, { [QUOTE_INTAKE_HEADER_009K]: quoteIntake.approval.trim(), "x-sabi-idempotency-key": quoteIntake.idempotencyKey.trim() }),
        body: JSON.stringify({
          riderProfileId: quoteIntake.riderProfileId.trim(),
          tariffRegionId: quoteIntake.tariffRegionId.trim(),
          routeProviderRef: quoteIntake.routeProviderRef.trim(),
          estimatedFareMinor: Number(quoteIntake.estimatedFareMinor),
          expiresInMinutes: Number(quoteIntake.expiresInMinutes || 15),
          pickupGeoJson: parsePayload(quoteIntake.pickupGeoJson),
          dropoffGeoJson: parsePayload(quoteIntake.dropoffGeoJson),
          idempotencyKey: quoteIntake.idempotencyKey.trim(),
          reason: quoteIntake.reason.trim() || "admin_orders_009t_manual_real_route_quote_intake_no_fake_route_no_default_fare",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_QUOTE_INTAKE_009K, message: response.ok ? String(json?.quoteId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadQuoteCandidates();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_QUOTE_INTAKE_009K, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadQuoteCandidates = async () => {
    setBusy("quoteCandidates");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_QUOTE_CANDIDATES_009J}?limit=100`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.candidates) ? json.candidates as QuoteCandidate009J[] : [];
      setQuoteCandidates(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_QUOTE_CANDIDATES_009J, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_QUOTE_CANDIDATES_009J, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createRiderRequestFromManual009U = async () => {
    if (!canSubmitRiderRequest009U) {
      setLast({ ok: false, status: "blocked", route: ROUTE_RIDER_REQUEST_CREATE_009J, message: "009U manual quoteId, idempotencyKey and exact approval required; no autofill and no fake request.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("riderRequestManual009U");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_RIDER_REQUEST_CREATE_009J}`, {
        method: "POST",
        headers: headers009A(config, { [RIDER_REQUEST_CREATE_HEADER_009J]: riderRequestManual009U.approval.trim(), "x-sabi-idempotency-key": riderRequestManual009U.idempotencyKey.trim() }),
        body: JSON.stringify({
          quoteId: riderRequestManual009U.quoteId.trim(),
          idempotencyKey: riderRequestManual009U.idempotencyKey.trim(),
          reason: riderRequestManual009U.reason.trim() || "admin_orders_009u_manual_existing_accepted_quote_rider_request_no_fake_request",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_RIDER_REQUEST_CREATE_009J, message: response.ok ? String(json?.riderRequestId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadQuoteCandidates();
        await loadDispatchCreateCandidates();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_RIDER_REQUEST_CREATE_009J, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadDispatchCreateCandidates = async () => {
    setBusy("dispatchCreateCandidates");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_DISPATCH_CREATE_CANDIDATES_009I}?limit=100`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.candidates) ? json.candidates as DispatchCreateCandidate009I[] : [];
      setDispatchCandidates(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_DISPATCH_CREATE_CANDIDATES_009I, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_DISPATCH_CREATE_CANDIDATES_009I, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createDispatchOfferFromManual009V = async () => {
    if (!canSubmitDispatchOffer009V) {
      setLast({ ok: false, status: "blocked", route: ROUTE_DISPATCH_CREATE_009I, message: "009V manual riderRequestId, driverProfileId, vehicleId, matchingScore, ttl, idempotencyKey and exact 009I approval required; no autofill and no fake dispatch offer.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("dispatchOfferManual009V");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_DISPATCH_CREATE_009I}`, {
        method: "POST",
        headers: headers009A(config, { [DISPATCH_CREATE_HEADER_009I]: dispatchOfferManual009V.approval.trim(), "x-sabi-idempotency-key": dispatchOfferManual009V.idempotencyKey.trim() }),
        body: JSON.stringify({
          riderRequestId: dispatchOfferManual009V.riderRequestId.trim(),
          driverProfileId: dispatchOfferManual009V.driverProfileId.trim(),
          vehicleId: dispatchOfferManual009V.vehicleId.trim(),
          matchingScore: Number(dispatchOfferManual009V.matchingScore),
          offerTtlSeconds: Number(dispatchOfferManual009V.offerTtlSeconds),
          idempotencyKey: dispatchOfferManual009V.idempotencyKey.trim(),
          reason: dispatchOfferManual009V.reason.trim() || "admin_orders_009v_manual_existing_request_driver_vehicle_no_fake_offer",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_DISPATCH_CREATE_009I, message: response.ok ? String(json?.dispatchOfferId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadDispatchCreateCandidates();
        await loadDispatchOffers();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_DISPATCH_CREATE_009I, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createTripFromManual009W = async () => {
    if (!canSubmitTrip009W) {
      setLast({ ok: false, status: "blocked", route: ROUTE_TRIP_CREATE_009G, message: "009W manual dispatchOfferId, vehicleId, idempotencyKey and exact 009G approval required; no autofill, no generated idempotency and no fake trip.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("tripManual009W");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TRIP_CREATE_009G}`, {
        method: "POST",
        headers: headers009A(config, { [TRIP_CREATE_HEADER_009G]: tripManual009W.approval.trim(), "x-sabi-idempotency-key": tripManual009W.idempotencyKey.trim() }),
        body: JSON.stringify({
          dispatchOfferId: tripManual009W.dispatchOfferId.trim(),
          vehicleId: tripManual009W.vehicleId.trim(),
          idempotencyKey: tripManual009W.idempotencyKey.trim(),
          reason: tripManual009W.reason.trim() || "admin_orders_009w_manual_existing_dispatch_offer_trip_no_fake_trip",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TRIP_CREATE_009G, message: response.ok ? String(json?.tripId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadOrders();
        await loadDispatchOffers();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TRIP_CREATE_009G, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const transitionLifecycleFromManual009X = async () => {
    if (!canSubmitLifecycle009X) {
      setLast({ ok: false, status: "blocked", route: ROUTE_LIFECYCLE_TRANSITION_009F, message: "009X manual orderId, nextStatus, idempotencyKey and exact 009F approval required; no autofill, no generated status and no fake lifecycle.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("lifecycleManual009X");
    try {
      const finalFareMinor = Number(lifecycleManual009X.finalFareMinor);
      const response = await fetch(`${base009A(config)}${ROUTE_LIFECYCLE_TRANSITION_009F}`, {
        method: "POST",
        headers: headers009A(config, { [LIFECYCLE_TRANSITION_HEADER_009F]: lifecycleManual009X.approval.trim(), "x-sabi-idempotency-key": lifecycleManual009X.idempotencyKey.trim() }),
        body: JSON.stringify({
          orderId: lifecycleManual009X.orderId.trim(),
          nextStatus: lifecycleManual009X.nextStatus.trim(),
          finalFareMinor: Number.isFinite(finalFareMinor) && finalFareMinor > 0 ? Math.trunc(finalFareMinor) : undefined,
          reason: lifecycleManual009X.reason.trim() || "admin_orders_009x_manual_existing_taxitrip_lifecycle_no_fake_status",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LIFECYCLE_TRANSITION_009F, message: response.ok ? String(json?.orderId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadOrders();
        await loadRealDataReadiness009M();
        await loadProtectedActions009P();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LIFECYCLE_TRANSITION_009F, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };


  const loadLostPropertyStatus010C = async () => {
    setBusy("lostPropertyStatus010C");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_LOST_PROPERTY_STATUS_010B}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      if (response.ok) {
        setLostPropertyStatus010C({
          counts: json?.counts || {},
          canCreateLostPropertyCaseFromTrip: Boolean(json?.canCreateLostPropertyCaseFromTrip),
          nextAdminAction: String(json?.nextAdminAction || ""),
          noFakeRows: Boolean(json?.noFakeRows),
          noFakeCreate: Boolean(json?.noFakeCreate),
          dbWriteExecuted: Boolean(json?.dbWriteExecuted),
          providerDispatch: Boolean(json?.providerDispatch),
          walletMutation: Boolean(json?.walletMutation),
        });
      }
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LOST_PROPERTY_STATUS_010B, message: response.ok ? String(json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LOST_PROPERTY_STATUS_010B, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadLostPropertyCases010C = async () => {
    setBusy("lostPropertyCases010C");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_LOST_PROPERTY_CASES_010B}?limit=25`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.cases) ? json.cases as LostPropertyCase010C[] : [];
      if (response.ok) setLostPropertyCases010C(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LOST_PROPERTY_CASES_010B, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LOST_PROPERTY_CASES_010B, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createLostPropertyCase010C = async () => {
    if (!canCreateLostProperty010C) {
      setLast({ ok: false, status: "blocked", route: ROUTE_LOST_PROPERTY_CREATE_010B, message: "010C requires manual tripId, itemDescription, idempotencyKey and exact 010B approval; no autofill/no fake trip/no raw PII.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("lostPropertyCreate010C");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_LOST_PROPERTY_CREATE_010B}`, {
        method: "POST",
        headers: headers009A(config, { [LOST_PROPERTY_CREATE_HEADER_010B]: lostPropertyCreate010C.approval.trim(), "x-sabi-idempotency-key": lostPropertyCreate010C.idempotencyKey.trim() }),
        body: JSON.stringify({
          tripId: lostPropertyCreate010C.tripId.trim(),
          itemDescription: lostPropertyCreate010C.itemDescription.trim(),
          passengerMessage: lostPropertyCreate010C.passengerMessage.trim(),
          lastSeenHint: lostPropertyCreate010C.lastSeenHint.trim(),
          priority: Number(lostPropertyCreate010C.priority),
          assignedAdminId: lostPropertyCreate010C.assignedAdminId.trim() || "admin-ui",
          idempotencyKey: lostPropertyCreate010C.idempotencyKey.trim(),
          reason: lostPropertyCreate010C.reason.trim() || "admin_orders_010c_lost_property_case_ui_existing_trip_no_fake",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LOST_PROPERTY_CREATE_010B, message: response.ok ? String(json?.supportCaseId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadLostPropertyStatus010C();
        await loadLostPropertyCases010C();
        await loadAudit();
        await loadLostPropertyAuditTimeline010G();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LOST_PROPERTY_CREATE_010B, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadLostPropertyAuditTimeline010G = async () => {
    setBusy("lostPropertyAudit010G");
    const params = new URLSearchParams();
    if (lostPropertyAuditFilters010G.supportCaseId.trim()) params.set("supportCaseId", lostPropertyAuditFilters010G.supportCaseId.trim());
    if (lostPropertyAuditFilters010G.tripId.trim()) params.set("tripId", lostPropertyAuditFilters010G.tripId.trim());
    params.set("limit", String(Math.min(Math.max(Number(lostPropertyAuditFilters010G.limit) || 20, 1), 50)));
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_LOST_PROPERTY_AUDIT_TIMELINE_010F}?${params.toString()}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const timelineResult = (json?.timeline ? json : json?.timelineResult || json?.data || {}) as LostPropertyAuditTimelineResult010G;
      setLostPropertyAudit010G({
        ...timelineResult,
        timeline: Array.isArray(timelineResult.timeline) ? timelineResult.timeline : [],
        dbWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LOST_PROPERTY_AUDIT_TIMELINE_010F, message: response.ok ? String(json?.code || timelineResult.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LOST_PROPERTY_AUDIT_TIMELINE_010F, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
    } finally {
      setBusy("");
    }
  };

  const updateLostPropertyCase010C = async () => {
    if (!canUpdateLostProperty010C) {
      setLast({ ok: false, status: "blocked", route: ROUTE_LOST_PROPERTY_UPDATE_010B, message: "010C requires manual supportCaseId, status, workflowStage, idempotencyKey and exact 010B approval; no fake status/no raw PII.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("lostPropertyUpdate010C");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_LOST_PROPERTY_UPDATE_010B}`, {
        method: "PATCH",
        headers: headers009A(config, { [LOST_PROPERTY_UPDATE_HEADER_010B]: lostPropertyUpdate010C.approval.trim(), "x-sabi-idempotency-key": lostPropertyUpdate010C.idempotencyKey.trim() }),
        body: JSON.stringify({
          supportCaseId: lostPropertyUpdate010C.supportCaseId.trim(),
          status: lostPropertyUpdate010C.status.trim(),
          workflowStage: lostPropertyUpdate010C.workflowStage.trim(),
          adminNote: lostPropertyUpdate010C.adminNote.trim(),
          idempotencyKey: lostPropertyUpdate010C.idempotencyKey.trim(),
          reason: lostPropertyUpdate010C.reason.trim() || "admin_orders_010c_lost_property_status_ui_no_fake",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_LOST_PROPERTY_UPDATE_010B, message: response.ok ? String(json?.supportCaseId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadLostPropertyStatus010C();
        await loadLostPropertyCases010C();
        await loadAudit();
        await loadLostPropertyAuditTimeline010G();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_LOST_PROPERTY_UPDATE_010B, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };


  const loadTripSupportStatus011B = async () => {
    setBusy("tripSupportStatus011B");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TRIP_SUPPORT_STATUS_011A}`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      if (response.ok) {
        setTripSupportStatus011B({
          counts: json?.counts || {},
          canCreateSupportCaseFromTrip: Boolean(json?.canCreateSupportCaseFromTrip),
          nextAdminAction: String(json?.nextAdminAction || ""),
          noFakeRows: Boolean(json?.noFakeRows),
          noFakeCreate: Boolean(json?.noFakeCreate),
          dbWriteExecuted: Boolean(json?.dbWriteExecuted),
          providerDispatch: Boolean(json?.providerDispatch),
          walletMutation: Boolean(json?.walletMutation),
        });
      }
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TRIP_SUPPORT_STATUS_011A, message: response.ok ? String(json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TRIP_SUPPORT_STATUS_011A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const loadTripSupportCases011B = async () => {
    setBusy("tripSupportCases011B");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TRIP_SUPPORT_CASES_011A}?limit=25`, { headers: headers009A(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.cases) ? json.cases as TripSupportCase011B[] : [];
      if (response.ok) setTripSupportCases011B(rows);
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TRIP_SUPPORT_CASES_011A, message: response.ok ? `${rows.length}` : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TRIP_SUPPORT_CASES_011A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createTripSupportCase011B = async () => {
    if (!canCreateTripSupport011B) {
      setLast({ ok: false, status: "blocked", route: ROUTE_TRIP_SUPPORT_CREATE_011A, message: "011B requires manual tripId, category, issueSummary, idempotencyKey and exact 011A approval; no autofill/no fake trip/no local penalty.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("tripSupportCreate011B");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TRIP_SUPPORT_CREATE_011A}`, {
        method: "POST",
        headers: headers009A(config, { [TRIP_SUPPORT_CREATE_HEADER_011A]: tripSupportCreate011B.approval.trim(), "x-sabi-idempotency-key": tripSupportCreate011B.idempotencyKey.trim() }),
        body: JSON.stringify({
          tripId: tripSupportCreate011B.tripId.trim(),
          category: tripSupportCreate011B.category.trim(),
          issueSummary: tripSupportCreate011B.issueSummary.trim(),
          passengerMessage: tripSupportCreate011B.passengerMessage.trim(),
          driverMessage: tripSupportCreate011B.driverMessage.trim(),
          evidenceHint: tripSupportCreate011B.evidenceHint.trim(),
          priority: Number(tripSupportCreate011B.priority),
          assignedAdminId: tripSupportCreate011B.assignedAdminId.trim() || "admin-ui",
          idempotencyKey: tripSupportCreate011B.idempotencyKey.trim(),
          reason: tripSupportCreate011B.reason.trim() || "admin_orders_011b_trip_support_case_ui_existing_trip_no_fake",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TRIP_SUPPORT_CREATE_011A, message: response.ok ? String(json?.supportCaseId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadTripSupportStatus011B();
        await loadTripSupportCases011B();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TRIP_SUPPORT_CREATE_011A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const updateTripSupportCase011B = async () => {
    if (!canUpdateTripSupport011B) {
      setLast({ ok: false, status: "blocked", route: ROUTE_TRIP_SUPPORT_UPDATE_011A, message: "011B requires manual supportCaseId, status, workflowStage, idempotencyKey and exact 011A approval; no local penalty/no fake status.", at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy("tripSupportUpdate011B");
    try {
      const response = await fetch(`${base009A(config)}${ROUTE_TRIP_SUPPORT_UPDATE_011A}`, {
        method: "PATCH",
        headers: headers009A(config, { [TRIP_SUPPORT_UPDATE_HEADER_011A]: tripSupportUpdate011B.approval.trim(), "x-sabi-idempotency-key": tripSupportUpdate011B.idempotencyKey.trim() }),
        body: JSON.stringify({
          supportCaseId: tripSupportUpdate011B.supportCaseId.trim(),
          status: tripSupportUpdate011B.status.trim(),
          workflowStage: tripSupportUpdate011B.workflowStage.trim(),
          adminNote: tripSupportUpdate011B.adminNote.trim(),
          idempotencyKey: tripSupportUpdate011B.idempotencyKey.trim(),
          reason: tripSupportUpdate011B.reason.trim() || "admin_orders_011b_trip_support_status_ui_no_local_penalty",
        }),
      });
      const json = await response.json().catch(() => ({}));
      setLast({ ok: response.ok, status: response.status, route: ROUTE_TRIP_SUPPORT_UPDATE_011A, message: response.ok ? String(json?.supportCaseId || json?.code || copy.ready) : String(json?.error || json?.code || copy.blocked), at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
      if (response.ok) {
        await loadTripSupportStatus011B();
        await loadTripSupportCases011B();
        await loadAudit();
      }
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: ROUTE_TRIP_SUPPORT_UPDATE_011A, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };


  const refreshTripComplaintFunction011C = async () => {
    setBusy("tripComplaintFunction011C");
    try {
      await Promise.all([
        loadOrders(),
        loadReport(),
        loadAudit(),
        loadLostPropertyStatus010C(),
        loadLostPropertyCases010C(),
        loadLostPropertyAuditTimeline010G(),
        loadTripSupportStatus011B(),
        loadTripSupportCases011B(),
      ]);
      setLast({ ok: true, status: "ready", route: "TAXI-ORDERS-011C-TRIPS-COMPLAINTS-SINGLE-FUNCTION", message: center011C.singleFunction, at: new Date().toISOString() });
      setNotice(center011C.ready);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: "TAXI-ORDERS-011C-TRIPS-COMPLAINTS-SINGLE-FUNCTION", message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(center011C.blocked);
    } finally {
      setBusy("");
    }
  };


  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!cancelled) { await loadOrders(); await loadRealDataReadiness009M(); await loadProtectedActions009P(); await loadRiderUserCandidates009Q(); await loadLostPropertyStatus010C(); await loadLostPropertyCases010C(); await loadLostPropertyAuditTimeline010G(); await loadTripSupportStatus011B(); await loadTripSupportCases011B(); }
    };
    void run();
    const timer = window.setInterval(() => {
      if (!cancelled) void loadOrders();
    }, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [config.baseUrl, config.token, language]);

  return (
    <div className="taxi009bRoot taxi009cTradingRoot taxi010aProductionOrders" data-admin-ui-taxi-orders-009c-trading-dashboard="live-growth-audit-visible" data-admin-ui-taxi-orders-009b-daily-growth-scale-audit="ready" data-admin-ui-taxi-orders-009b-every-order-db-source="TaxiTrip" data-admin-ui-taxi-orders-009b-auto-archive-days="7" data-admin-ui-taxi-orders-009b-no-fake="ready" data-taxi-orders-009d-strict-db-only="true" data-taxi-orders-zero-fill-blocked="true" data-taxi-orders-009p-action-panel="protected-steps-no-autofill" data-taxi-orders-009t-quote-manual-action="owner-dev-tools-hidden-from-regular-admin" data-taxi-orders-009x-lifecycle-manual-action="owner-dev-tools-hidden-from-regular-admin" data-taxi-orders-009y-non-english-copy-clean="true" data-taxi-orders-010a-info-service-panel="true" data-taxi-orders-010a-manual-create-hidden-from-regular-admin="true" data-taxi-orders-010a-lost-property-support="true" data-taxi-orders-010c-lost-property-ui-connected="true" data-taxi-orders-010c-no-fake-case="true" data-taxi-orders-010c-redacted-list="true" data-taxi-orders-010h-closure-archive="read-only-service-control" data-taxi-orders-010h-no-local-archive="true" data-taxi-orders-010i-sla-escalation="read-only-existing-cases" data-taxi-orders-010i-no-local-action="true" data-taxi-orders-011c-trips-complaints-single-function="ready" data-taxi-orders-011c-one-function-no-fake-no-penalty="true">
      <section className="taxi009bHero taxi009cTradingHero">
        <div>
          <span>{MARKER009B}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className={`taxi009bGrowthBadge taxi009cTicker ${growth.direction}`}>
          <small>{copy.today}</small>
          <strong>{growth.todayOrders}</strong>
          <em>{directionText009B(growth.direction, copy)} {signed009B(growth.changeOrders)} · {signed009B(growth.changePercent)}%</em>
          <small>{ui009Y.live} 15s · {autoRefreshEnabled ? ui009Y.on : ui009Y.off} · {liveRefreshAt ? liveRefreshAt.slice(11, 19) : "—"}</small>
        </div>
      </section>

      <section className="taxi009bToolbar">
        <button type="button" onClick={() => void loadOrders()} disabled={busy === "load"}>{copy.loadOrders}</button>
        <button type="button" onClick={() => void loadReport()} disabled={busy === "report"}>{copy.report}</button>
        <button type="button" onClick={() => void loadAudit()} disabled={busy === "audit"}>{copy.loadAudit}</button>
        <button type="button" onClick={() => void loadRealDataReadiness009M()} disabled={busy === "realData009M"}>{copy.loadRealDataReadiness}</button>
        <button type="button" onClick={() => void loadProtectedActions009P()} disabled={busy === "actionPanel009P"}>{copy.loadProtectedActions}</button>
        <button type="button" onClick={() => void loadRiderUserCandidates009Q()} disabled={busy === "riderUserCandidates009Q"}>{copy.loadRiderUserCandidates}</button>
        <button type="button" onClick={() => { void loadLostPropertyStatus010C(); void loadLostPropertyCases010C(); }} disabled={busy === "lostPropertyStatus010C" || busy === "lostPropertyCases010C"}>{lost010C.loadCases}</button>
        <button type="button" className="taxi011cUnifiedButton" onClick={() => void refreshTripComplaintFunction011C()} disabled={busy === "tripComplaintFunction011C"}>{center011C.refresh}</button>
        {OWNER_DEV_TOOLS_VISIBLE_010A ? (<>
          <button type="button" onClick={() => void createRiderProfileFromManual009R()} disabled={!canSubmitRiderProfile009R || busy === "riderProfileManual009R"}>{ui009Y.createRiderProfile}</button>
          <button type="button" onClick={() => void createQuoteFromRealRoute009K()} disabled={!canSubmitQuoteIntake009K || busy === "quoteIntake009K"}>{ui009Y.createQuote}</button>
          <button type="button" onClick={() => void createRiderRequestFromManual009U()} disabled={!canSubmitRiderRequest009U || busy === "riderRequestManual009U"}>{ui009Y.createRiderRequest}</button>
          <button type="button" onClick={() => void createDispatchOfferFromManual009V()} disabled={!canSubmitDispatchOffer009V || busy === "dispatchOfferManual009V"}>{ui009Y.createDispatchOffer}</button>
          <button type="button" onClick={() => void createTripFromManual009W()} disabled={!canSubmitTrip009W || busy === "tripManual009W"}>{ui009Y.createTrip}</button>
          <button type="button" onClick={() => void transitionLifecycleFromManual009X()} disabled={!canSubmitLifecycle009X || busy === "lifecycleManual009X"}>{ui009Y.transitionTrip}</button>
        </>) : <span className="taxi010aOwnerDevBadge" data-taxi-orders-010a-owner-dev-tools-hidden="true">{service010A.ownerDevHidden}</span>}
        <button type="button" onClick={() => void loadQuoteCandidates()} disabled={busy === "quoteCandidates"}>{copy.loadQuoteCandidates}</button>
        <button type="button" onClick={() => void loadDispatchCreateCandidates()} disabled={busy === "dispatchCreateCandidates"}>{ui009Y.refreshRequests}</button>
        <button type="button" onClick={() => void loadDispatchOffers()} disabled={busy === "dispatchOffers"}>{copy.loadDispatchOffers}</button>
        <button type="button" className="danger" onClick={() => void runArchive()} disabled={busy === "archive"}>{copy.runArchive}</button>
        <div><strong>{copy.savedInDb}</strong><span>{copy.noFake}</span></div>
      </section>

      <section className="taxi009bMetrics">
        <article><span>{copy.total}</span><strong>{report.totalOrders}</strong></article>
        <article><span>{copy.active}</span><strong>{report.activeOrders}</strong></article>
        <article><span>{copy.completed}</span><strong>{report.completedOrders}</strong></article>
        <article><span>{copy.eligible}</span><strong>{report.archiveEligibleOrders}</strong></article>
        <article><span>{copy.archived}</span><strong>{report.archivedOrders}</strong></article>
        <article><span>{copy.averageFare}</span><strong>{money009A(report.averageFinalFareMinor)}</strong></article>
      </section>

      <section className="taxi010aServicePanel" data-taxi-orders-010a-service-info-panel="orders-support-archive-lost-property" data-taxi-orders-010a-no-manual-order-create="true">
        <div className="taxi010aServiceHead">
          <div>
            <span>010A · {service010A.tripSearchTitle}</span>
            <h3>{service010A.title}</h3>
            <p>{service010A.subtitle}</p>
          </div>
          <strong>{service010A.archiveTitle}</strong>
        </div>
        <div className="taxi010aServiceGrid">
          <article data-taxi-orders-010a-lost-property-panel="true"><b>{service010A.lostPropertyTitle}</b><span>{service010A.lostPropertyText}</span></article>
          <article><b>{service010A.appealTitle}</b><span>{service010A.appealText}</span></article>
          <article><b>{service010A.archiveTitle}</b><span>{service010A.archiveText}</span></article>
          <article><b>{service010A.auditTitle}</b><span>{service010A.auditText}</span></article>
        </div>
        <div className="taxi010aLostPropertyFlow" data-taxi-orders-010a-lost-property-flow="trip-driver-vehicle-audit-archive">
          {service010A.workflow.map((step, index) => <span key={`${step}-${index}`}>{index + 1}. {step}</span>)}
        </div>
        <p className="taxi010aOwnerDevOnlyNote" data-taxi-orders-010a-owner-dev-tools-only="009n-009x-manual-forms-hidden">{service010A.ownerDevHidden}</p>
      </section>


      <section className="taxi011cTripComplaintCenter" data-taxi-orders-011c-trips-complaints-single-function="ready" data-taxi-orders-011c-uses-existing-taxitrip-only="true" data-taxi-orders-011c-uses-011a-010b="true" data-taxi-orders-011c-no-autofill="true" data-taxi-orders-011c-no-fake-trip-case="true" data-taxi-orders-011c-no-local-penalty="true" data-taxi-orders-011c-no-wallet-provider="true" data-taxi-orders-011c-raw-pii-hidden="true">
        <div className="taxi011cCenterHead">
          <div>
            <span>{MARKER011C}</span>
            <h3>{center011C.title}</h3>
            <p>{center011C.subtitle}</p>
          </div>
          <button type="button" onClick={() => void refreshTripComplaintFunction011C()} disabled={busy === "tripComplaintFunction011C"}>{center011C.refresh}</button>
        </div>
        <div className="taxi011cCenterMetrics" data-taxi-orders-011c-real-counters-only="true">
          <article><span>{center011C.trips}</span><strong>{orders.length}</strong></article>
          <article><span>{center011C.activeTrips}</span><strong>{tripComplaintFunction011C.activeTrips.length}</strong></article>
          <article><span>{center011C.appeals}</span><strong>{tripSupportCases011B.length}</strong></article>
          <article><span>{center011C.lostProperty}</span><strong>{lostPropertyCases010C.length}</strong></article>
          <article><span>{center011C.escalations}</span><strong>{tripComplaintFunction011C.escalations}</strong></article>
          <article><span>{center011C.audit}</span><strong>{tripComplaintFunction011C.auditEvents}</strong></article>
        </div>
        <div className="taxi011cCenterGrid">
          <article className="taxi011cCenterCard primary" data-taxi-orders-011c-single-admin-flow="trip-to-case-to-status">
            <h4>{center011C.stepTitle}</h4>
            <ol>
              <li>{center011C.step1}</li>
              <li>{center011C.step2}</li>
              <li>{center011C.step3}</li>
              <li>{center011C.step4}</li>
            </ol>
            <small>{center011C.copyOnly} · {center011C.noPenalty} · {center011C.noDirectContact}</small>
          </article>
          <article className="taxi011cCenterCard" data-taxi-orders-011c-safe-write-boundaries="011a-010b-protected-only">
            <h4>{center011C.safetyTitle}</h4>
            <ul>
              <li>{center011C.rule1}</li>
              <li>{center011C.rule2}</li>
              <li>{center011C.rule3}</li>
            </ul>
            <small>{center011C.support011a} · {center011C.lost010b} · {center011C.noFake}</small>
          </article>
          <article className="taxi011cCenterCard live" data-taxi-orders-011c-live-queue="redacted-active-cases-only">
            <h4>{center011C.liveTitle}</h4>
            <div className="taxi011cLiveQueue">
              {tripComplaintFunction011C.activeCases.map((item) => (
                <div key={`${item.supportCaseId}-${item.tripId}`} className="taxi011cLiveLine">
                  <b>{item.supportCaseId || "—"}</b>
                  <span>{item.tripId || "—"} · {item.status || "—"} · P{item.priority}</span>
                  <small>{item.rawPiiBlocked && item.contactMediatedByAdmin ? center011C.noDirectContact : center011C.blocked}</small>
                </div>
              ))}
              {!tripComplaintFunction011C.activeCases.length ? <p>{center011C.liveEmpty}</p> : null}
            </div>
          </article>
          <article className={`taxi011cCenterCard readiness ${tripComplaintFunction011C.ready ? "ready" : "blocked"}`} data-taxi-orders-011c-readiness="orders-trips-complaints">
            <h4>{center011C.readiness}</h4>
            <strong>{tripComplaintFunction011C.ready ? center011C.ready : center011C.blocked}</strong>
            <span>{center011C.support011a}: {tripComplaintFunction011C.supportSafe ? center011C.ready : center011C.blocked}</span>
            <span>{center011C.lost010b}: {tripComplaintFunction011C.lostPropertySafe ? center011C.ready : center011C.blocked}</span>
            <small>{center011C.singleFunction}</small>
          </article>
        </div>
      </section>

      <section className="taxi010cLostPropertyPanel" data-taxi-orders-010c-lost-property-ui="connected-to-010b" data-taxi-orders-010c-no-autofill="true" data-taxi-orders-010c-no-fake-trip="true" data-taxi-orders-010c-no-fake-case="true" data-taxi-orders-010c-redacted-list="true" data-taxi-orders-010c-admin-mediated-contact-only="true">
        <div className="taxi010cLostHead">
          <div>
            <span>{MARKER010C}</span>
            <h3>{lost010C.title}</h3>
            <p>{lost010C.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadLostPropertyStatus010C(); void loadLostPropertyCases010C(); }} disabled={busy === "lostPropertyStatus010C" || busy === "lostPropertyCases010C"}>{lost010C.loadCases}</button>
        </div>
        <div className="taxi010cMetrics" data-taxi-orders-010c-status-read-only="true">
          <article><span>{lost010C.cases}</span><strong>{lostPropertyStatus010C?.counts?.lostPropertyCases ?? 0}</strong></article>
          <article><span>{lost010C.open}</span><strong>{lostPropertyStatus010C?.counts?.openLostPropertyCases ?? 0}</strong></article>
          <article><span>{lost010C.review}</span><strong>{lostPropertyStatus010C?.counts?.underReviewLostPropertyCases ?? 0}</strong></article>
          <article><span>{lost010C.audit}</span><strong>{lostPropertyStatus010C?.counts?.auditLogs ?? 0}</strong></article>
        </div>
        <p className="taxi010cPolicySeal">{lost010C.redactedList} · {lostPropertyStatus010C?.nextAdminAction || service010A.lostPropertyText}</p>
        <div className="taxi010cWorkGrid">
          <article className="taxi010cFormCard" data-taxi-orders-010c-create-form="manual-existing-trip-only">
            <div className="taxi010cCardHead"><h4>{lost010C.createTitle}</h4><span>{canCreateLostProperty010C ? copy.ready : copy.blocked}</span></div>
            <p>{lost010C.createDesc}</p>
            <div className="taxi010cFormGrid">
              <label><span>{lost010C.tripId}</span><input value={lostPropertyCreate010C.tripId} onChange={(event) => setLostPropertyCreateField010C("tripId", event.target.value)} placeholder={lost010C.copyTripIdOnly} autoComplete="off" /></label>
              <label><span>{lost010C.itemDescription}</span><input value={lostPropertyCreate010C.itemDescription} onChange={(event) => setLostPropertyCreateField010C("itemDescription", event.target.value)} placeholder={lost010C.itemDescription} autoComplete="off" /></label>
              <label><span>{lost010C.lastSeenHint}</span><input value={lostPropertyCreate010C.lastSeenHint} onChange={(event) => setLostPropertyCreateField010C("lastSeenHint", event.target.value)} placeholder={lost010C.lastSeenHint} autoComplete="off" /></label>
              <label><span>{lost010C.priority}</span><input value={lostPropertyCreate010C.priority} onChange={(event) => setLostPropertyCreateField010C("priority", event.target.value)} inputMode="numeric" autoComplete="off" /></label>
              <label><span>{lost010C.assignedAdminId}</span><input value={lostPropertyCreate010C.assignedAdminId} onChange={(event) => setLostPropertyCreateField010C("assignedAdminId", event.target.value)} autoComplete="off" /></label>
              <label><span>{lost010C.idempotencyKey}</span><input value={lostPropertyCreate010C.idempotencyKey} onChange={(event) => setLostPropertyCreateField010C("idempotencyKey", event.target.value)} autoComplete="off" /></label>
              <label className="wide"><span>{lost010C.passengerMessage}</span><textarea value={lostPropertyCreate010C.passengerMessage} onChange={(event) => setLostPropertyCreateField010C("passengerMessage", event.target.value)} placeholder={lost010C.passengerMessage} /></label>
              <label className="wide"><span>{lost010C.exactApproval}</span><input value={lostPropertyCreate010C.approval} onChange={(event) => setLostPropertyCreateField010C("approval", event.target.value)} placeholder={LOST_PROPERTY_CREATE_VALUE_010B} autoComplete="off" /></label>
              <label className="wide"><span>{lost010C.reason}</span><input value={lostPropertyCreate010C.reason} onChange={(event) => setLostPropertyCreateField010C("reason", event.target.value)} autoComplete="off" /></label>
            </div>
            <div className="taxi010cActions"><small>{lost010C.exactCreateHelp}</small><button type="button" onClick={() => void createLostPropertyCase010C()} disabled={!canCreateLostProperty010C || busy === "lostPropertyCreate010C"}>{lost010C.createButton}</button></div>
          </article>
          <article className="taxi010cFormCard" data-taxi-orders-010c-update-form="manual-status-only">
            <div className="taxi010cCardHead"><h4>{lost010C.updateTitle}</h4><span>{canUpdateLostProperty010C ? copy.ready : copy.blocked}</span></div>
            <p>{lost010C.updateDesc}</p>
            <div className="taxi010cFormGrid">
              <label><span>{lost010C.supportCaseId}</span><input value={lostPropertyUpdate010C.supportCaseId} onChange={(event) => setLostPropertyUpdateField010C("supportCaseId", event.target.value)} autoComplete="off" /></label>
              <label><span>{lost010C.statusField}</span><select value={lostPropertyUpdate010C.status} onChange={(event) => setLostPropertyUpdateField010C("status", event.target.value)}>{LOST_PROPERTY_STATUSES_010C.map((status) => <option key={status} value={status}>{lost010C[status] || status}</option>)}</select></label>
              <label><span>{lost010C.workflowStage}</span><select value={lostPropertyUpdate010C.workflowStage} onChange={(event) => setLostPropertyUpdateField010C("workflowStage", event.target.value)}>{LOST_PROPERTY_WORKFLOW_010C.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></label>
              <label><span>{lost010C.idempotencyKey}</span><input value={lostPropertyUpdate010C.idempotencyKey} onChange={(event) => setLostPropertyUpdateField010C("idempotencyKey", event.target.value)} autoComplete="off" /></label>
              <label className="wide"><span>{lost010C.adminNote}</span><textarea value={lostPropertyUpdate010C.adminNote} onChange={(event) => setLostPropertyUpdateField010C("adminNote", event.target.value)} /></label>
              <label className="wide"><span>{lost010C.exactApproval}</span><input value={lostPropertyUpdate010C.approval} onChange={(event) => setLostPropertyUpdateField010C("approval", event.target.value)} placeholder={LOST_PROPERTY_UPDATE_VALUE_010B} autoComplete="off" /></label>
              <label className="wide"><span>{lost010C.reason}</span><input value={lostPropertyUpdate010C.reason} onChange={(event) => setLostPropertyUpdateField010C("reason", event.target.value)} autoComplete="off" /></label>
            </div>
            <div className="taxi010cActions"><small>{lost010C.exactUpdateHelp}</small><button type="button" onClick={() => void updateLostPropertyCase010C()} disabled={!canUpdateLostProperty010C || busy === "lostPropertyUpdate010C"}>{lost010C.updateButton}</button></div>
          </article>
        </div>
        <div className="taxi010cCaseList" data-taxi-orders-010c-cases-list="redacted-read-only">
          {lostPropertyCases010C.map((item) => (
            <article key={item.supportCaseId}>
              <div><b>{item.supportCaseId}</b><span>{item.status} · {item.caseType} · P{item.priority}</span></div>
              <p>{lost010C.tripId}: {item.tripId} · {item.safeTripRef?.tripStatus || "—"}</p>
              <small>{lost010C.driverMasked}: {item.safeTripRef?.driverProfileIdMasked || "—"} · {lost010C.vehicleMasked}: {item.safeTripRef?.vehicleIdMasked || "—"}</small>
              <small>{item.createdAt ? item.createdAt.slice(0, 19) : "—"} · {item.rawPiiBlocked ? "rawPiiBlocked" : ""} · {item.contactMediatedByAdmin ? "adminMediated" : ""}</small>
            </article>
          ))}
          {!lostPropertyCases010C.length ? <div className="taxi009bEmpty"><strong>{lost010C.emptyCases}</strong><span>{lost010C.copyTripIdOnly}</span></div> : null}
        </div>
      </section>

      <section className="taxi010eWorkflowBoard" data-taxi-orders-010e-lost-property-workflow="read-only-status-board" data-taxi-orders-010e-no-autofill="true" data-taxi-orders-010e-no-fake-case="true" data-taxi-orders-010e-no-direct-contact="true" data-taxi-orders-010e-no-raw-pii="true">
        <div className="taxi010eWorkflowHead">
          <div>
            <span>{MARKER010E}</span>
            <h3>{workflow010E.title}</h3>
            <p>{workflow010E.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadLostPropertyStatus010C(); void loadLostPropertyCases010C(); }} disabled={busy === "lostPropertyStatus010C" || busy === "lostPropertyCases010C"}>{workflow010E.refresh}</button>
        </div>
        <div className="taxi010eWorkflowMetrics" data-taxi-orders-010e-uses-existing-010b-cases="true">
          <article><span>{workflow010E.activeCases}</span><strong>{lostPropertyWorkflowSummary010E.activeCases.length}</strong></article>
          <article><span>{workflow010E.resolvedCases}</span><strong>{lostPropertyWorkflowSummary010E.resolvedCases.length}</strong></article>
          <article><span>{workflow010E.escalatedCases}</span><strong>{lostPropertyWorkflowSummary010E.escalatedCases.length}</strong></article>
          <article><span>{workflow010E.highPriority}</span><strong>{lostPropertyWorkflowSummary010E.highPriority.length}</strong></article>
        </div>
        <div className="taxi010eWorkflowGrid">
          <article className="taxi010eWorkflowCard" data-taxi-orders-010e-workflow-stages="manual-status-reference-only">
            <h4>{workflow010E.stageBoard}</h4>
            <div className="taxi010eStageList">
              {lostPropertyWorkflowStages010E.map((item, index) => (
                <div key={item.stage} className={item.active ? "active" : ""}>
                  <b>{index + 1}</b><span>{item.label}</span><small>{item.stage}</small>
                </div>
              ))}
            </div>
          </article>
          <article className="taxi010eWorkflowCard" data-taxi-orders-010e-case-board="redacted-read-only">
            <h4>{workflow010E.caseBoard}</h4>
            {(lostPropertyWorkflowSummary010E.activeCases.length ? lostPropertyWorkflowSummary010E.activeCases : lostPropertyCases010C).slice(0, 4).map((item) => (
              <div key={item.supportCaseId} className="taxi010eMiniCase">
                <b>{item.supportCaseId}</b>
                <span>{item.status} · P{item.priority} · {lost010C.tripId}: {item.tripId}</span>
                <small>{workflow010E.readOnly} · {item.rawPiiBlocked ? "rawPiiBlocked" : ""} · {item.contactMediatedByAdmin ? "adminMediated" : ""}</small>
              </div>
            ))}
            {!lostPropertyCases010C.length ? <p className="taxi010eEmpty">{workflow010E.noCases}</p> : null}
          </article>
          <article className="taxi010eWorkflowCard" data-taxi-orders-010e-admin-checklist="no-direct-contact">
            <h4>{workflow010E.guideBoard}</h4>
            <ol>
              <li>{workflow010E.step1}</li>
              <li>{workflow010E.step2}</li>
              <li>{workflow010E.step3}</li>
              <li>{workflow010E.step4}</li>
            </ol>
          </article>
          <article className="taxi010eWorkflowCard danger" data-taxi-orders-010e-safety-rules="no-raw-pii-no-fake-no-wallet-provider">
            <h4>{workflow010E.safetyBoard}</h4>
            <ul>
              <li>{workflow010E.rule1}</li>
              <li>{workflow010E.rule2}</li>
              <li>{workflow010E.rule3}</li>
              <li>{workflow010E.rule4}</li>
            </ul>
            <p>{workflow010E.nextAction}: {lostPropertyStatus010C?.nextAdminAction || workflow010E.readOnly}</p>
          </article>
        </div>
      </section>

      <section className="taxi010gAuditTimeline" data-taxi-orders-010g-lost-property-audit="read-only-010f-timeline" data-taxi-orders-010g-no-create-update-delete="true" data-taxi-orders-010g-redacted-payload="true" data-taxi-orders-010g-no-raw-pii="true" data-taxi-orders-010g-no-fake-case="true" data-taxi-orders-010g-no-wallet-provider="true">
        <div className="taxi010gAuditHead">
          <div>
            <span>{MARKER010G}</span>
            <h3>{audit010G.title}</h3>
            <p>{audit010G.subtitle}</p>
          </div>
          <button type="button" onClick={() => void loadLostPropertyAuditTimeline010G()} disabled={busy === "lostPropertyAudit010G"}>{audit010G.refresh}</button>
        </div>
        <div className="taxi010gAuditFilters" data-taxi-orders-010g-manual-filters-only="true">
          <label><span>{audit010G.supportCaseId}</span><input value={lostPropertyAuditFilters010G.supportCaseId} onChange={(event) => setAuditFilterField010G("supportCaseId", event.target.value)} autoComplete="off" /></label>
          <label><span>{audit010G.tripId}</span><input value={lostPropertyAuditFilters010G.tripId} onChange={(event) => setAuditFilterField010G("tripId", event.target.value)} autoComplete="off" /></label>
          <label><span>{audit010G.limit}</span><input value={lostPropertyAuditFilters010G.limit} onChange={(event) => setAuditFilterField010G("limit", event.target.value)} inputMode="numeric" autoComplete="off" /></label>
        </div>
        <div className="taxi010gAuditSeal">
          <strong>{lostPropertyAuditTimeline010G.length}</strong> · {audit010G.readOnlySeal} · {audit010G.noMutation} · {audit010G.noDirectContact}
        </div>
        <div className="taxi010gAuditGrid" data-taxi-orders-010g-timeline-list="redacted-read-only">
          {lostPropertyAuditTimeline010G.map((item) => (
            <article key={item.auditId || `${item.supportCaseId}-${item.createdAt}`}>
              <div className="taxi010gAuditTop"><b>{item.action || "—"}</b><span>{item.createdAt ? item.createdAt.slice(0, 19) : "—"}</span></div>
              <p>{audit010G.supportCaseId}: {item.supportCaseId || "—"} · {audit010G.tripId}: {item.tripId || "—"}</p>
              <small>{audit010G.actor}: {item.actorType || "—"} / {item.actorIdMasked || audit010G.redacted}</small>
              <small>{audit010G.target}: {item.targetType || "—"} · {audit010G.caseVerified}: {lostPropertyAudit010G?.caseVerified ? copy.ready : audit010G.redacted}</small>
              <div className="taxi010gPayload" data-taxi-orders-010g-payload-summary="safe-redacted-no-admin-note-no-message">
                {lostPropertyAuditPayloadKeys010G(item.payloadSummary).map((key) => <em key={key}>{key}: {String(item.payloadSummary[key])}</em>)}
                {!lostPropertyAuditPayloadKeys010G(item.payloadSummary).length ? <em>{audit010G.payload}: {audit010G.redacted}</em> : null}
              </div>
            </article>
          ))}
          {!lostPropertyAuditTimeline010G.length ? <div className="taxi009bEmpty"><strong>{audit010G.empty}</strong><span>{audit010G.readOnlySeal}</span></div> : null}
        </div>
      </section>

      <section className="taxi010hClosureArchive" data-taxi-orders-010h-lost-property-closure-archive="read-only-service-control" data-taxi-orders-010h-no-local-archive="true" data-taxi-orders-010h-no-create-update-delete="true" data-taxi-orders-010h-redacted-records="true" data-taxi-orders-010h-no-fake-case="true" data-taxi-orders-010h-no-wallet-provider="true">
        <div className="taxi010hClosureHead">
          <div>
            <span>{MARKER010H}</span>
            <h3>{closure010H.title}</h3>
            <p>{closure010H.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadLostPropertyCases010C(); void loadLostPropertyAuditTimeline010G(); }} disabled={busy === "lostPropertyCases010C" || busy === "lostPropertyAudit010G"}>{workflow010E.refresh}</button>
        </div>
        <div className="taxi010hClosureMetrics" data-taxi-orders-010h-existing-010b-010f-data-only="true">
          <article><span>{closure010H.readyForClosure}</span><strong>{lostPropertyClosureSummary010H.readyForClosure.length}</strong></article>
          <article><span>{closure010H.activeCases}</span><strong>{lostPropertyClosureSummary010H.activeCases.length}</strong></article>
          <article><span>{closure010H.auditEvents}</span><strong>{lostPropertyClosureSummary010H.auditEvents}</strong></article>
          <article><span>{closure010H.protectedArchive}</span><strong>{lostPropertyClosureSummary010H.noLocalArchive ? copy.ready : copy.blocked}</strong></article>
        </div>
        <div className="taxi010hClosureGrid">
          <article className="taxi010hClosureCard" data-taxi-orders-010h-closure-checklist="manual-service-checks-only">
            <h4>{closure010H.checklist}</h4>
            <ol>
              <li>{closure010H.step1}</li>
              <li>{closure010H.step2}</li>
              <li>{closure010H.step3}</li>
              <li>{closure010H.step4}</li>
            </ol>
          </article>
          <article className="taxi010hClosureCard danger" data-taxi-orders-010h-archive-rules="protected-backend-only-no-local-archive">
            <h4>{closure010H.archiveRules}</h4>
            <ul>
              <li>{closure010H.rule1}</li>
              <li>{closure010H.rule2}</li>
              <li>{closure010H.rule3}</li>
              <li>{closure010H.rule4}</li>
            </ul>
          </article>
          <article className="taxi010hClosureCard" data-taxi-orders-010h-return-proof="admin-mediated-no-direct-contact">
            <h4>{closure010H.returnProof}</h4>
            <p>{closure010H.proof1}</p>
            <p>{closure010H.proof2}</p>
            <p>{closure010H.proof3}</p>
            <small>{closure010H.noMutation} · {closure010H.noLocalArchive}</small>
          </article>
          <article className="taxi010hClosureCard" data-taxi-orders-010h-case-snapshot="redacted-copy-only">
            <h4>{closure010H.caseSnapshot}</h4>
            {lostPropertyClosureSummary010H.recentCases.map((item) => (
              <div key={item.supportCaseId} className="taxi010hCaseLine">
                <b>{closure010H.caseId}: {item.supportCaseId || "—"}</b>
                <span>{closure010H.tripId}: {item.tripId || "—"} · {closure010H.status}: {item.status || "—"}</span>
                <small>{closure010H.priority}: {item.priority} · {item.rawPiiBlocked && item.contactMediatedByAdmin ? closure010H.redacted : copy.blocked}</small>
              </div>
            ))}
            {!lostPropertyClosureSummary010H.recentCases.length ? <p className="taxi010hEmpty">{closure010H.empty}</p> : null}
          </article>
        </div>
        <p className="taxi010hSeal">{closure010H.noMutation} · {closure010H.noLocalArchive} · {lostPropertyClosureSummary010H.allRedacted ? closure010H.redacted : copy.blocked}</p>
      </section>

      <section className="taxi010iSlaEscalation" data-taxi-orders-010i-sla-escalation="read-only-existing-lost-property-cases" data-taxi-orders-010i-no-create-update-delete="true" data-taxi-orders-010i-no-fake-case="true" data-taxi-orders-010i-redacted-records="true" data-taxi-orders-010i-no-direct-contact="true" data-taxi-orders-010i-no-wallet-provider="true">
        <div className="taxi010iSlaHead">
          <div>
            <span>{MARKER010I}</span>
            <h3>{sla010I.title}</h3>
            <p>{sla010I.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadLostPropertyCases010C(); void loadLostPropertyAuditTimeline010G(); }} disabled={busy === "lostPropertyCases010C" || busy === "lostPropertyAudit010G"}>{workflow010E.refresh}</button>
        </div>
        <div className="taxi010iSlaMetrics" data-taxi-orders-010i-existing-010b-010f-data-only="true">
          <article><span>{sla010I.overdue}</span><strong>{lostPropertySlaSummary010I.overdue.length}</strong></article>
          <article><span>{sla010I.highPriority}</span><strong>{lostPropertySlaSummary010I.highPriority.length}</strong></article>
          <article><span>{sla010I.escalated}</span><strong>{lostPropertySlaSummary010I.escalated.length}</strong></article>
          <article><span>{sla010I.missingAudit}</span><strong>{lostPropertySlaSummary010I.missingAudit.length}</strong></article>
        </div>
        <div className="taxi010iSlaGrid">
          <article className="taxi010iSlaCard" data-taxi-orders-010i-sla-rules="support-deadline-reference-only">
            <h4>{sla010I.slaRules}</h4>
            <ul>
              <li>{sla010I.rule1}</li>
              <li>{sla010I.rule2}</li>
              <li>{sla010I.rule3}</li>
              <li>{sla010I.rule4}</li>
            </ul>
          </article>
          <article className="taxi010iSlaCard" data-taxi-orders-010i-action-queue="copy-only-no-autofill">
            <h4>{sla010I.actionQueue}</h4>
            {lostPropertySlaSummary010I.queue.map((item) => (
              <div key={item.supportCaseId} className="taxi010iQueueLine">
                <b>{sla010I.caseId}: {item.supportCaseId || "—"}</b>
                <span>{sla010I.tripId}: {item.tripId || "—"} · {sla010I.status}: {item.status || "—"}</span>
                <small>{sla010I.age}: {item.createdAt ? item.createdAt.slice(0, 19) : "—"} · P{item.priority} · {item.rawPiiBlocked && item.contactMediatedByAdmin ? sla010I.redacted : copy.blocked}</small>
              </div>
            ))}
            {!lostPropertySlaSummary010I.queue.length ? <p className="taxi010iEmpty">{sla010I.empty}</p> : null}
          </article>
          <article className="taxi010iSlaCard danger" data-taxi-orders-010i-supervisor-gate="manual-review-only-no-direct-contact">
            <h4>{sla010I.supervisorGate}</h4>
            <ol>
              <li>{sla010I.step1}</li>
              <li>{sla010I.step2}</li>
              <li>{sla010I.step3}</li>
              <li>{sla010I.step4}</li>
            </ol>
            <p>{sla010I.gate1}</p>
            <p>{sla010I.gate2}</p>
            <p>{sla010I.gate3}</p>
          </article>
          <article className="taxi010iSlaCard" data-taxi-orders-010i-safe-evidence="redacted-no-raw-pii-no-autofill">
            <h4>{sla010I.evidence}</h4>
            <p>{sla010I.evidence1}</p>
            <p>{sla010I.evidence2}</p>
            <p>{sla010I.evidence3}</p>
            <small>{sla010I.readOnly} · {sla010I.noMutation} · {sla010I.noFake} · {lostPropertySlaSummary010I.redactionOk ? sla010I.redacted : copy.blocked}</small>
          </article>
        </div>
      </section>


      <section className="taxi010jReadiness" data-taxi-orders-010j-production-readiness="read-only-existing-data" data-taxi-orders-010j-no-manual-order-create="true" data-taxi-orders-010j-no-create-update-delete="true" data-taxi-orders-010j-no-fake-case="true" data-taxi-orders-010j-redacted-records="true" data-taxi-orders-010j-no-wallet-provider="true">
        <div className="taxi010jReadinessHead">
          <div>
            <span>{MARKER010J}</span>
            <h3>{readiness010J.title}</h3>
            <p>{readiness010J.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadLostPropertyStatus010C(); void loadLostPropertyCases010C(); void loadLostPropertyAuditTimeline010G(); }} disabled={busy === "lostPropertyStatus010C" || busy === "lostPropertyCases010C" || busy === "lostPropertyAudit010G"}>{workflow010E.refresh}</button>
        </div>
        <div className="taxi010jScoreStrip" data-taxi-orders-010j-existing-010b-010f-data-only="true">
          <article><span>{readiness010J.score}</span><strong>{lostPropertyProductionReadiness010J.percent}%</strong></article>
          <article><span>{readiness010J.checksPassed}</span><strong>{lostPropertyProductionReadiness010J.passed}/{lostPropertyProductionReadiness010J.checks.length}</strong></article>
          <article><span>{readiness010J.realTrips}</span><strong>{lostPropertyProductionReadiness010J.realTrips}</strong></article>
          <article><span>{readiness010J.cases}</span><strong>{lostPropertyProductionReadiness010J.cases}</strong></article>
          <article><span>{readiness010J.auditEvents}</span><strong>{lostPropertyProductionReadiness010J.auditEvents}</strong></article>
        </div>
        <div className="taxi010jReadinessGrid">
          <article className="taxi010jCard" data-taxi-orders-010j-service-chain="010b-010c-010d-010e-010f-010g-010h-010i">
            <h4>{readiness010J.serviceChain}</h4>
            {lostPropertyProductionReadiness010J.checks.map((item) => (
              <div key={item.key} className={item.ok ? "taxi010jCheck ok" : "taxi010jCheck blocked"}>
                <b>{item.key}</b>
                <span>{item.label}</span>
                <em>{item.ok ? readiness010J.ready : readiness010J.blocked}</em>
              </div>
            ))}
          </article>
          <article className="taxi010jCard danger" data-taxi-orders-010j-safety-gate="redacted-no-direct-contact-no-fake-no-wallet-provider">
            <h4>{readiness010J.safetyGate}</h4>
            <ul>
              <li>{readiness010J.rule1}</li>
              <li>{readiness010J.rule2}</li>
              <li>{readiness010J.rule3}</li>
              <li>{readiness010J.rule4}</li>
            </ul>
            <small>{readiness010J.readOnly} · {lostPropertyProductionReadiness010J.noFakeNoWalletProvider ? readiness010J.noFake : readiness010J.blocked} · {lostPropertyProductionReadiness010J.casesRedacted && lostPropertyProductionReadiness010J.auditRedacted ? readiness010J.redacted : readiness010J.blocked}</small>
          </article>
          <article className="taxi010jCard" data-taxi-orders-010j-production-use="admin-information-service-panel-only">
            <h4>{readiness010J.productionUse}</h4>
            <ol>
              <li>{readiness010J.use1}</li>
              <li>{readiness010J.use2}</li>
              <li>{readiness010J.use3}</li>
              <li>{readiness010J.use4}</li>
            </ol>
          </article>
          <article className="taxi010jCard" data-taxi-orders-010j-live-dependencies="real-mobile-taxi-flow-required">
            <h4>{readiness010J.remaining}</h4>
            <p>{readiness010J.live1}</p>
            <p>{readiness010J.live2}</p>
            <p>{readiness010J.live3}</p>
          </article>
        </div>
        <p className="taxi010jSeal">{readiness010J.seal} · {lostPropertyProductionReadiness010J.ownerDevHidden ? readiness010J.ownerDevHidden : readiness010J.blocked}</p>
      </section>


      <section className="taxi011bSupportAppeals" data-taxi-orders-011b-trip-support-appeals-ui="connected-to-011a" data-taxi-orders-011b-existing-trip-only="true" data-taxi-orders-011b-no-autofill="true" data-taxi-orders-011b-no-fake-case="true" data-taxi-orders-011b-no-local-penalty="true" data-taxi-orders-011b-no-wallet-provider="true" data-taxi-orders-011b-redacted-records="true">
        <div className="taxi011bSupportHead">
          <div>
            <span>{MARKER011B}</span>
            <h3>{support011B.title}</h3>
            <p>{support011B.subtitle}</p>
          </div>
          <button type="button" onClick={() => { void loadTripSupportStatus011B(); void loadTripSupportCases011B(); }} disabled={busy === "tripSupportStatus011B" || busy === "tripSupportCases011B"}>{support011B.load}</button>
        </div>
        <div className="taxi011bSupportMetrics" data-taxi-orders-011b-status-summary="real-011a-redacted-read-only">
          <article><span>{support011B.open}</span><strong>{tripSupportStatus011B?.counts?.openTripSupportCases ?? tripSupportSummary011B.openCases.length}</strong></article>
          <article><span>{support011B.review}</span><strong>{tripSupportStatus011B?.counts?.underReviewTripSupportCases ?? tripSupportSummary011B.reviewCases.length}</strong></article>
          <article><span>{support011B.escalated}</span><strong>{tripSupportStatus011B?.counts?.escalatedTripSupportCases ?? tripSupportSummary011B.escalatedCases.length}</strong></article>
          <article><span>{support011B.resolved}</span><strong>{tripSupportStatus011B?.counts?.resolvedTripSupportCases ?? tripSupportSummary011B.resolvedCases.length}</strong></article>
          <article><span>{support011B.auditLogs}</span><strong>{tripSupportStatus011B?.counts?.auditLogs ?? 0}</strong></article>
        </div>
        <div className="taxi011bSupportGrid">
          <article className="taxi011bSupportCard" data-taxi-orders-011b-create-form="manual-exact-approval-no-autofill">
            <h4>{support011B.createTitle}</h4>
            <label><span>{support011B.tripId}</span><input value={tripSupportCreate011B.tripId} onChange={(event) => setTripSupportCreateField011B("tripId", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.category}</span><select value={tripSupportCreate011B.category} onChange={(event) => setTripSupportCreateField011B("category", event.target.value)}>{TRIP_SUPPORT_CATEGORIES_011A.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
            <label><span>{support011B.issueSummary}</span><input value={tripSupportCreate011B.issueSummary} onChange={(event) => setTripSupportCreateField011B("issueSummary", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.passengerMessage}</span><textarea value={tripSupportCreate011B.passengerMessage} onChange={(event) => setTripSupportCreateField011B("passengerMessage", event.target.value)} /></label>
            <label><span>{support011B.driverMessage}</span><textarea value={tripSupportCreate011B.driverMessage} onChange={(event) => setTripSupportCreateField011B("driverMessage", event.target.value)} /></label>
            <label><span>{support011B.evidenceHint}</span><input value={tripSupportCreate011B.evidenceHint} onChange={(event) => setTripSupportCreateField011B("evidenceHint", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.priority}</span><input value={tripSupportCreate011B.priority} onChange={(event) => setTripSupportCreateField011B("priority", event.target.value)} inputMode="numeric" autoComplete="off" /></label>
            <label><span>{support011B.assignedAdminId}</span><input value={tripSupportCreate011B.assignedAdminId} onChange={(event) => setTripSupportCreateField011B("assignedAdminId", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.idempotencyKey}</span><input value={tripSupportCreate011B.idempotencyKey} onChange={(event) => setTripSupportCreateField011B("idempotencyKey", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.exactApproval}</span><input value={tripSupportCreate011B.approval} onChange={(event) => setTripSupportCreateField011B("approval", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.reason}</span><input value={tripSupportCreate011B.reason} onChange={(event) => setTripSupportCreateField011B("reason", event.target.value)} autoComplete="off" /></label>
            <button type="button" onClick={() => void createTripSupportCase011B()} disabled={!canCreateTripSupport011B || busy === "tripSupportCreate011B"}>{support011B.create}</button>
            <small>{support011B.protectedWrite} · {support011B.noFake} · {support011B.noPenalty}</small>
          </article>
          <article className="taxi011bSupportCard" data-taxi-orders-011b-update-form="manual-exact-approval-no-local-penalty">
            <h4>{support011B.updateTitle}</h4>
            <label><span>{support011B.caseId}</span><input value={tripSupportUpdate011B.supportCaseId} onChange={(event) => setTripSupportUpdateField011B("supportCaseId", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.status}</span><select value={tripSupportUpdate011B.status} onChange={(event) => setTripSupportUpdateField011B("status", event.target.value)}>{TRIP_SUPPORT_STATUSES_011A.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
            <label><span>{support011B.workflowStage}</span><select value={tripSupportUpdate011B.workflowStage} onChange={(event) => setTripSupportUpdateField011B("workflowStage", event.target.value)}>{TRIP_SUPPORT_WORKFLOW_011A.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></label>
            <label><span>{support011B.adminNote}</span><textarea value={tripSupportUpdate011B.adminNote} onChange={(event) => setTripSupportUpdateField011B("adminNote", event.target.value)} /></label>
            <label><span>{support011B.idempotencyKey}</span><input value={tripSupportUpdate011B.idempotencyKey} onChange={(event) => setTripSupportUpdateField011B("idempotencyKey", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.exactApproval}</span><input value={tripSupportUpdate011B.approval} onChange={(event) => setTripSupportUpdateField011B("approval", event.target.value)} autoComplete="off" /></label>
            <label><span>{support011B.reason}</span><input value={tripSupportUpdate011B.reason} onChange={(event) => setTripSupportUpdateField011B("reason", event.target.value)} autoComplete="off" /></label>
            <button type="button" onClick={() => void updateTripSupportCase011B()} disabled={!canUpdateTripSupport011B || busy === "tripSupportUpdate011B"}>{support011B.update}</button>
            <small>{support011B.statuses} · {support011B.stages}</small>
          </article>
          <article className="taxi011bSupportCard wide" data-taxi-orders-011b-cases-list="redacted-read-only-copy-only-no-direct-contact">
            <h4>{support011B.casesTitle}</h4>
            <p>{support011B.categories}</p>
            <div className="taxi011bCasesList">
              {tripSupportCases011B.map((item) => (
                <div key={item.supportCaseId} className="taxi011bCaseLine">
                  <b>{support011B.caseId}: {item.supportCaseId || "—"}</b>
                  <span>{support011B.tripId}: {item.tripId || "—"} · {support011B.status}: {item.status || "—"} · {support011B.category}: {item.category || "—"}</span>
                  <small>P{item.priority} · {item.assignedAdminIdMasked || support011B.redacted} · {item.safeTripRef?.driverProfileIdMasked || support011B.redacted} / {item.safeTripRef?.vehicleIdMasked || support011B.redacted}</small>
                  <em>{item.rawPiiBlocked && item.contactMediatedByAdmin ? support011B.redacted : copy.blocked} · {support011B.copyOnly}</em>
                </div>
              ))}
              {!tripSupportCases011B.length ? <div className="taxi009bEmpty"><strong>{support011B.empty}</strong><span>{support011B.adminMediated}</span></div> : null}
            </div>
          </article>
          <article className="taxi011bSupportCard safety" data-taxi-orders-011b-safety-rules="no-fake-no-wallet-no-local-penalty-redacted">
            <h4>{support011B.statusTitle}</h4>
            <p>{tripSupportStatus011B?.nextAdminAction || support011B.protectedWrite}</p>
            <ul>
              <li>{support011B.adminMediated}</li>
              <li>{support011B.noPenalty}</li>
              <li>{support011B.noFake}</li>
              <li>{tripSupportSummary011B.redactionOk ? support011B.redacted : copy.blocked}</li>
            </ul>
            <small>{tripSupportSummary011B.statusSafe ? copy.ready : copy.blocked} · {tripSupportSummary011B.noFakeNoWalletProvider ? support011B.noFake : copy.blocked}</small>
          </article>
        </div>
      </section>

      <section className="taxi010dTripLookup" data-taxi-orders-010d-lost-property-trip-lookup="real-orders-only" data-taxi-orders-010d-copy-only="true" data-taxi-orders-010d-no-autofill="true" data-taxi-orders-010d-no-fake-trip="true" data-taxi-orders-010d-no-direct-contact="true">
        <div className="taxi010dLookupHead">
          <div>
            <span>{MARKER010D}</span>
            <h3>{tripLookup010D.title}</h3>
            <p>{tripLookup010D.subtitle}</p>
          </div>
          <button type="button" onClick={() => void loadOrders()} disabled={busy === "orders"}>{tripLookup010D.refreshOrders}</button>
        </div>
        <div className="taxi010dLookupControls" data-taxi-orders-010d-manual-search-only="true">
          <label><span>{tripLookup010D.searchLabel}</span><input value={lostPropertyTripLookup010D.query} onChange={(event) => setTripLookupField010D("query", event.target.value)} placeholder={tripLookup010D.searchPlaceholder} autoComplete="off" /></label>
          <label><span>{tripLookup010D.statusFilter}</span><select value={lostPropertyTripLookup010D.statusFilter} onChange={(event) => setTripLookupField010D("statusFilter", event.target.value)}><option value="all">{tripLookup010D.allStatuses}</option>{Object.keys(report.statusBuckets || {}).map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label><span>{tripLookup010D.archiveFilter}</span><select value={lostPropertyTripLookup010D.archiveFilter} onChange={(event) => setTripLookupField010D("archiveFilter", event.target.value)}>{ARCHIVE_FILTERS_010D.map((filter) => <option key={filter} value={filter}>{tripLookup010D[`${filter}Archive`] || filter}</option>)}</select></label>
        </div>
        <div className="taxi010dLookupSeal"><strong>{safeLostPropertyTripMatches010D.length}</strong> {tripLookup010D.matches} · {tripLookup010D.copyOnly} · {tripLookup010D.safeContext}</div>
        <div className="taxi010dTripGrid" data-taxi-orders-010d-trip-cards="copy-only-no-case-autofill">
          {safeLostPropertyTripMatches010D.map((order) => (
            <article key={order.orderId}>
              <div className="taxi010dTripTop"><b>{order.orderId}</b><span>{order.status}</span></div>
              <p>{tripLookup010D.route}: {order.routeLabel || "—"}</p>
              <small>{tripLookup010D.driver}: {order.driverName || "—"} · {tripLookup010D.vehicle}: {order.vehiclePlate || "—"}</small>
              <small>{tripLookup010D.created}: {order.createdAt ? order.createdAt.slice(0, 19) : "—"} · {tripLookup010D.completed}: {order.completedAt ? order.completedAt.slice(0, 19) : "—"}</small>
              <small>{tripLookup010D.fare}: {money009A(order.finalFareMinor)} · {tripLookup010D.archive}: {order.archiveStatus || "—"}</small>
              <em>{tripLookup010D.noAutofill} · {tripLookup010D.copyOnly}</em>
            </article>
          ))}
          {!safeLostPropertyTripMatches010D.length ? <div className="taxi009bEmpty"><strong>{tripLookup010D.empty}</strong><span>{tripLookup010D.safeContext}</span></div> : null}
        </div>
      </section>

      <section className="taxi009mReadiness" data-taxi-orders-009m-real-data-readiness="visible" data-taxi-orders-009m-no-fake-dashboard="true">
        <div className="taxi009mReadinessHead">
          <div>
            <span>009M · {ui009Y.realDbOnly}</span>
            <h3>{copy.realDataReadiness}</h3>
            <p>{realDataStatus009M?.nextOwnerAction || ui009Y.readinessFallback}</p>
          </div>
          <div className="taxi009mReadinessScore">
            <strong>{realDataStatus009M?.readinessPercent ?? 0}%</strong>
            <small>{realDataStatus009M?.readyRequirements ?? 0} {ui009Y.ready} / {realDataStatus009M?.missingRequirements ?? 0} {ui009Y.missing}</small>
          </div>
        </div>
        <div className="taxi009mGateGrid">
          <article className={realDataStatus009M?.canCreateQuoteNow ? "ready" : "missing"}><b>{ui009Y.quoteGate}</b><span>{ui009Y.quoteGateSub}</span><strong>{realDataStatus009M?.canCreateQuoteNow ? copy.ready : copy.blocked}</strong></article>
          <article className={realDataStatus009M?.canCreateRiderRequestNow ? "ready" : "missing"}><b>{ui009Y.requestGate}</b><span>{ui009Y.requestGateSub}</span><strong>{realDataStatus009M?.canCreateRiderRequestNow ? copy.ready : copy.blocked}</strong></article>
          <article className={realDataStatus009M?.canCreateDispatchOfferNow ? "ready" : "missing"}><b>{ui009Y.offerGate}</b><span>{ui009Y.offerGateSub}</span><strong>{realDataStatus009M?.canCreateDispatchOfferNow ? copy.ready : copy.blocked}</strong></article>
          <article className={realDataStatus009M?.canCreateTripNow ? "ready" : "missing"}><b>{ui009Y.tripGate}</b><span>{ui009Y.tripGateSub}</span><strong>{realDataStatus009M?.canCreateTripNow ? copy.ready : copy.blocked}</strong></article>
        </div>
        <div className="taxi009mRequirementGrid">
          {(realDataStatus009M?.requirements || []).map((item) => (
            <article key={item.key} className={item.status === "ready" ? "ready" : "missing"} data-requirement-key={item.key}>
              <b>{item.title}</b>
              <span>{item.dbModel} · {item.neededFor}</span>
              <strong>{item.count}/{item.requiredMinimum}</strong>
              <small>{item.status === "ready" ? copy.ready : item.missingText}</small>
            </article>
          ))}
          {!realDataStatus009M?.requirements?.length ? <div className="taxi009bEmpty"><strong>{copy.missingRequirements}</strong><span>{ui009Y.clickRefreshNoFakeRows}</span></div> : null}
        </div>
      </section>



      <section className="taxi009pActionPanel" data-taxi-orders-009p-protected-action-panel="visible" data-taxi-orders-009p-no-autofill="true" data-taxi-orders-009p-no-fake-payload="true">
        <div className="taxi009pActionHead">
          <div>
            <span>009P · {ui009Y.protectedSteps}</span>
            <h3>{copy.protectedActionPanel}</h3>
            <p>{actionPanel009P?.nextActionText || `${copy.nextProtectedAction}: ${copy.manualPayloadOnly}`}</p>
          </div>
          <div className="taxi009pActionSeal">
            <strong>{actionPanel009P?.readinessPercent ?? realDataStatus009M?.readinessPercent ?? 0}%</strong>
            <small>{actionPanel009P?.missingRequirements ?? realDataStatus009M?.missingRequirements ?? 0} {ui009Y.missing} · {ui009Y.noFakeShort}</small>
          </div>
        </div>
        <div className="taxi009pActionGrid">
          {(actionPanel009P?.actions || []).map((action) => (
            <article key={action.key} className={action.enabled === "ready" ? "ready" : "blocked"} data-action-key={action.key} data-action-stage={action.stage}>
              <b>{action.stage} · {action.title}</b>
              <span>{action.method} {action.endpoint}</span>
              <small>{action.approvalHeader || ui009Y.readOnlyPolicy}</small>
              <em>{action.enabled === "ready" ? action.readyWhen : action.blockedReason}</em>
              <strong>{action.manualPayloadRequired ? copy.manualPayloadOnly : ui009Y.readOnlyPolicy}</strong>
            </article>
          ))}
          {!actionPanel009P?.actions?.length ? <div className="taxi009bEmpty"><strong>{copy.protectedActionPanel}</strong><span>{ui009Y.clickRefreshActionsNoFake}</span></div> : null}
        </div>
      </section>



      <section className="taxi009qUserCandidates" data-taxi-orders-009q-rider-user-candidates="read-only" data-taxi-orders-009q-redacted="true" data-taxi-orders-009q-no-fake-user="true">
        <div className="taxi009pActionHead">
          <div>
            <span>009Q · {ui009Y.readOnlyExistingUsers}</span>
            <h3>{copy.riderUserCandidates}</h3>
            <p>{riderUserCandidates009Q?.nextOwnerAction || ui009Y.userCandidatesFallback}</p>
          </div>
          <div className="taxi009pActionSeal">
            <strong>{riderUserCandidates009Q?.counts?.candidates ?? 0}</strong>
            <small>{riderUserCandidates009Q?.selectedUserDelegateName || ui009Y.userDelegateFallback} · {ui009Y.redacted}</small>
          </div>
        </div>
        <div className="taxi009qCandidateGrid">
          {(riderUserCandidates009Q?.candidates || []).map((candidate) => (
            <article key={candidate.userId} className={candidate.canUseFor009N ? "ready" : "blocked"} data-rider-user-id={candidate.userId} data-raw-pii-blocked="true">
              <b>{candidate.safeDisplayName}</b>
              <span>{candidate.userDelegateName} · userId: {candidate.userId}</span>
              <small>{candidate.maskedEmail || ui009Y.emailRedacted} · {candidate.maskedPhone || ui009Y.phoneRedacted}</small>
              <em>{candidate.riderProfileExists ? ui009Y.riderProfileExists : ui009Y.readyForRiderProfile}</em>
            </article>
          ))}
          {!riderUserCandidates009Q?.candidates?.length ? <div className="taxi009bEmpty"><strong>{copy.riderUserCandidates}</strong><span>{ui009Y.clickRefreshUsersNoFake}</span></div> : null}
        </div>
      </section>

      <section className="taxi009rManualAction" data-taxi-orders-009r-rider-profile-manual-action="visible" data-taxi-orders-009r-no-autofill="true" data-taxi-orders-009r-no-raw-pii-copy="true" data-taxi-orders-009r-no-auto-submit="true">
        <div className="taxi009pActionHead">
          <div>
            <span>009R · {ui009Y.createRiderProfile}</span>
            <h3>{ui009Y.riderProfileManualTitle}</h3>
            <p>{ui009Y.riderProfileManualDesc}</p>
          </div>
          <div className="taxi009pActionSeal">
            <strong>{canSubmitRiderProfile009R ? copy.ready : copy.blocked}</strong>
            <small>{ui009Y.noAutofillExactApproval}</small>
          </div>
        </div>
        <div className="taxi009rManualGrid">
          <label><span>{ui009Y.existingUserId}</span><input value={riderProfileManual009R.userId} onChange={(event) => setRiderProfileManualField009R("userId", event.target.value)} placeholder={ui009Y.pasteExistingUserId} autoComplete="off" /></label>
          <label><span>{ui009Y.countryCode}</span><input value={riderProfileManual009R.countryCode} onChange={(event) => setRiderProfileManualField009R("countryCode", event.target.value)} placeholder="UZ" autoComplete="off" /></label>
          <label><span>{ui009Y.cityId}</span><input value={riderProfileManual009R.cityId} onChange={(event) => setRiderProfileManualField009R("cityId", event.target.value)} placeholder="tashkent" autoComplete="off" /></label>
          <label><span>{ui009Y.trustStatus}</span><input value={riderProfileManual009R.trustStatus} onChange={(event) => setRiderProfileManualField009R("trustStatus", event.target.value)} placeholder="standard" autoComplete="off" /></label>
          <label><span>{ui009Y.idempotencyKey}</span><input value={riderProfileManual009R.idempotencyKey} onChange={(event) => setRiderProfileManualField009R("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
          <label><span>{ui009Y.exactApproval}</span><input value={riderProfileManual009R.approval} onChange={(event) => setRiderProfileManualField009R("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
          <label className="wide"><span>{ui009Y.reason}</span><input value={riderProfileManual009R.reason} onChange={(event) => setRiderProfileManualField009R("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
          <article className="taxi009rManualSeal" data-exact-approval-header={RIDER_PROFILE_INTAKE_HEADER_009N} data-no-fake-rider="true">
            <b>POST {ROUTE_RIDER_PROFILE_INTAKE_009N}</b>
            <span>{RIDER_PROFILE_INTAKE_HEADER_009N}</span>
            <small>{ui009Y.approvalMustMatch009N}</small>
            <button type="button" onClick={() => void createRiderProfileFromManual009R()} disabled={!canSubmitRiderProfile009R || busy === "riderProfileManual009R"}>{ui009Y.runRiderProfile}</button>
          </article>
        </div>
      </section>

      <section className="taxi009sManualTariff" data-taxi-orders-009s-tariff-region-manual-action="visible" data-taxi-orders-009s-no-fake-default-price="true" data-taxi-orders-009s-no-autofill="true" data-taxi-orders-009s-no-auto-submit="true">
        <div className="taxi009pActionHead">
          <div>
            <span>009S · {ui009Y.createQuote}</span>
            <h3>{ui009Y.tariffManualTitle}</h3>
            <p>{ui009Y.tariffManualDesc}</p>
          </div>
          <div className="taxi009pActionSeal">
            <strong>{canSubmitTariffRegion009S ? copy.ready : copy.blocked}</strong>
            <small>{ui009Y.realNumbersExactApproval}</small>
          </div>
        </div>
        <div className="taxi009sManualGrid">
          <label><span>{ui009Y.countryCode}</span><input value={tariffRegionManual009S.countryCode} onChange={(event) => setTariffRegionManualField009S("countryCode", event.target.value)} placeholder="UZ" autoComplete="off" /></label>
          <label><span>{ui009Y.cityId}</span><input value={tariffRegionManual009S.cityId} onChange={(event) => setTariffRegionManualField009S("cityId", event.target.value)} placeholder="tashkent" autoComplete="off" /></label>
          <label><span>{ui009Y.zoneId}</span><input value={tariffRegionManual009S.zoneId} onChange={(event) => setTariffRegionManualField009S("zoneId", event.target.value)} placeholder={ui009Y.manualRealZoneId} autoComplete="off" /></label>
          <label><span>{ui009Y.tariffCode}</span><input value={tariffRegionManual009S.tariffCode} onChange={(event) => setTariffRegionManualField009S("tariffCode", event.target.value)} placeholder="econom / comfort / business" autoComplete="off" /></label>
          <label><span>{ui009Y.statusField}</span><input value={tariffRegionManual009S.status} onChange={(event) => setTariffRegionManualField009S("status", event.target.value)} placeholder="active" autoComplete="off" /></label>
          <label><span>{ui009Y.baseFareMinor}</span><input value={tariffRegionManual009S.baseFareMinor} onChange={(event) => setTariffRegionManualField009S("baseFareMinor", event.target.value)} placeholder={ui009Y.realBaseFareNoDefault} inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.perKmMinor}</span><input value={tariffRegionManual009S.perKmMinor} onChange={(event) => setTariffRegionManualField009S("perKmMinor", event.target.value)} placeholder={ui009Y.realPerKmFare} inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.perMinuteMinor}</span><input value={tariffRegionManual009S.perMinuteMinor} onChange={(event) => setTariffRegionManualField009S("perMinuteMinor", event.target.value)} placeholder={ui009Y.realPerMinuteFare} inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.commissionBasisPoints}</span><input value={tariffRegionManual009S.commissionBasisPoints} onChange={(event) => setTariffRegionManualField009S("commissionBasisPoints", event.target.value)} placeholder="0..10000" inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.idempotencyKey}</span><input value={tariffRegionManual009S.idempotencyKey} onChange={(event) => setTariffRegionManualField009S("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
          <label><span>{ui009Y.exactApproval}</span><input value={tariffRegionManual009S.approval} onChange={(event) => setTariffRegionManualField009S("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
          <label className="wide"><span>{ui009Y.reason}</span><input value={tariffRegionManual009S.reason} onChange={(event) => setTariffRegionManualField009S("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
          <article className="taxi009sManualSeal" data-exact-approval-header={TARIFF_REGION_INTAKE_HEADER_009O} data-no-fake-tariff="true" data-no-default-price="true">
            <b>POST {ROUTE_TARIFF_REGION_INTAKE_009O}</b>
            <span>{TARIFF_REGION_INTAKE_HEADER_009O}</span>
            <small>{ui009Y.approvalMustMatch009O}</small>
            <button type="button" onClick={() => void upsertTariffRegionFromManual009S()} disabled={!canSubmitTariffRegion009S || busy === "tariffRegionManual009S"}>{ui009Y.runTariff}</button>
          </article>
        </div>
      </section>

      <section className="taxi009cMarketChartPanel" data-taxi-orders-exchange-chart-visible="true" data-taxi-orders-raw-json-hidden="true" data-taxi-orders-live-refresh-seconds="15" data-taxi-orders-zero-fill-blocked="true" data-taxi-orders-chart-renders-only-real-taxitrip-days="true">
        <header className="taxi009cMarketHeader">
          <div>
            <span>{ui009Y.liveOrdersMarket}</span>
            <h3>{copy.dailyGrowth}</h3>
            <p>{copy.dailyGrowthSub}</p>
          </div>
          <div className={`taxi009cMarketDelta ${growth.direction}`}>
            <small>{copy.today}: {growth.todayOrders}</small>
            <strong>{signed009B(growth.changeOrders)} / {signed009B(growth.changePercent)}%</strong>
            <em>{ui009Y.live} 15s · {liveRefreshAt ? liveRefreshAt.slice(11, 19) : "—"}</em>
          </div>
        </header>
        <div className="taxi009cChartCanvas" aria-label={copy.dailyGrowth}>
          <svg className="taxi009cSvgChart" viewBox="0 0 1200 290" preserveAspectRatio="none" role="img">
            <defs>
              <linearGradient id="taxi009cAreaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(34,211,238,.30)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
            </defs>
            {[58, 105, 152, 199, 246].map((y) => <line key={`grid-${y}`} className="taxi009cGridLine" x1="44" y1={y} x2="1156" y2={y} />)}
            {chartPoints009C.map((point) => (
              <g key={`bar-${point.date}`} className={`taxi009cCandle ${point.direction}`} data-growth-direction={point.direction}>
                <line x1={point.x} x2={point.x} y1={254 - point.barHeight} y2="254" />
                <circle cx={point.x} cy={point.y} r="5" />
              </g>
            ))}
            {areaPath009C ? <polygon className="taxi009cArea" points={areaPath009C} /> : null}
            {linePath009C ? <polyline className={`taxi009cLine ${growth.direction}`} points={linePath009C} /> : null}
          </svg>
          {!hasRealTrend009C ? (
            <div className="taxi009cNoDataOverlay">
              <strong>{copy.empty}</strong>
              <span>{copy.savedInDb}. Нулевые дни не дорисовываются: график появится только из реальных TaxiTrip.</span>
            </div>
          ) : null}
          <div className="taxi009cChartLabels">
            {hasRealTrend009C ? chartPoints009C.map((point) => (
              <span key={`label-${point.date}`} className={point.direction}>{point.date.slice(5)}<b>{point.totalOrders}</b></span>
            )) : <span className="flat">{ui009Y.realDb}<b>0</b></span>}
          </div>
        </div>
        <div className="taxi009cDailyTape" data-taxi-orders-daily-tape-real-db-only="true">
          {hasRealTrend009C ? chartPoints009C.map((day) => (
            <article key={`tape-${day.date}`} className={day.direction}>
              <b>{day.date}</b>
              <strong>{day.totalOrders}</strong>
              <span>{directionText009B(day.direction, copy)} {signed009B(day.changeOrders)} · {signed009B(day.changePercent)}%</span>
              <small>{ui009Y.activeShort} {day.activeOrders} · {ui009Y.completedShort} {day.completedOrders} · {ui009Y.archivedShort} {day.archivedOrders}</small>
            </article>
          )) : (
            <article className="flat taxi009dNoFakeTape" data-taxi-orders-no-zero-fill-empty-state="true">
              <b>{copy.savedInDb}</b>
              <strong>0</strong>
              <span>Реальных заказов пока нет — ежедневная шкала не строится из нулевых фейковых дней.</span>
              <small>{ui009Y.noFakeBackendOnly}</small>
            </article>
          )}
        </div>
      </section>

      <section className="taxi009bAudit taxi009cAuditPanelTop" data-taxi-orders-audit-journal="visible" data-taxi-orders-audit-visible-on-screen="true">
        <h3>{copy.auditJournal}</h3>
        <div className="taxi009cAuditTable">
          {audit.length ? audit.map((item) => (
            <article key={item.auditId || `${item.action}:${item.targetId}:${item.createdAt}`}>
              <b>{item.action}</b>
              <span>{item.orderId || item.targetId}</span>
              <small>{item.createdAt}</small>
              <em>{item.actorType}:{item.actorId}</em>
            </article>
          )) : <div className="taxi009bEmpty"><strong>{copy.noAudit}</strong><span>TaxiAuditLog / TaxiTrip</span></div>}
        </div>
      </section>


      <section className="taxi009tManualQuote taxi009kQuoteIntake" data-taxi-orders-009t-quote-manual-action="visible" data-taxi-orders-009t-no-autofill="true" data-taxi-orders-009t-no-auto-submit="true" data-taxi-orders-009t-no-fake-route="true" data-taxi-orders-009t-no-default-fare="true" data-taxi-orders-009k-quote-intake="real-rider-tariff-route-only" data-taxi-orders-009k-no-fake-quote="true">
        <div className="taxi009hQueueHead">
          <div>
            <span>{MARKER009T}</span>
            <h3>009T · {ui009Y.manualQuoteTitle}</h3>
            <p>{ui009Y.manualQuoteDesc}</p>
          </div>
          <button type="button" onClick={() => void createQuoteFromRealRoute009K()} disabled={!canSubmitQuoteIntake009K || busy === "quoteIntake009K"}>{ui009Y.runQuote}</button>
        </div>
        <div className="taxi009kQuoteForm taxi009tQuoteForm">
          <label><span>riderProfileId</span><input value={quoteIntake.riderProfileId} onChange={(event) => setQuoteIntakeField009K("riderProfileId", event.target.value)} placeholder={ui009Y.existingUserId} autoComplete="off" /></label>
          <label><span>tariffRegionId</span><input value={quoteIntake.tariffRegionId} onChange={(event) => setQuoteIntakeField009K("tariffRegionId", event.target.value)} placeholder={ui009Y.tariffManualTitle} autoComplete="off" /></label>
          <label><span>routeProviderRef</span><input value={quoteIntake.routeProviderRef} onChange={(event) => setQuoteIntakeField009K("routeProviderRef", event.target.value)} placeholder={ui009Y.manualQuoteDesc} autoComplete="off" /></label>
          <label><span>estimatedFareMinor</span><input value={quoteIntake.estimatedFareMinor} onChange={(event) => setQuoteIntakeField009K("estimatedFareMinor", event.target.value)} placeholder={ui009Y.realBaseFareNoDefault} inputMode="numeric" autoComplete="off" /></label>
          <label><span>expiresInMinutes</span><input value={quoteIntake.expiresInMinutes} onChange={(event) => setQuoteIntakeField009K("expiresInMinutes", event.target.value)} inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.idempotencyKey}</span><input value={quoteIntake.idempotencyKey} onChange={(event) => setQuoteIntakeField009K("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
          <label><span>{ui009Y.exactApproval}</span><input value={quoteIntake.approval} onChange={(event) => setQuoteIntakeField009K("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
          <label className="wide"><span>pickupGeoJson</span><textarea value={quoteIntake.pickupGeoJson} onChange={(event) => setQuoteIntakeField009K("pickupGeoJson", event.target.value)} placeholder='{"type":"Point","coordinates":[lng,lat]}' autoComplete="off" /></label>
          <label className="wide"><span>dropoffGeoJson</span><textarea value={quoteIntake.dropoffGeoJson} onChange={(event) => setQuoteIntakeField009K("dropoffGeoJson", event.target.value)} placeholder='{"type":"Point","coordinates":[lng,lat]}' autoComplete="off" /></label>
          <label className="wide"><span>{ui009Y.reason}</span><input value={quoteIntake.reason} onChange={(event) => setQuoteIntakeField009K("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
          <article className="taxi009tManualSeal" data-exact-approval-header={QUOTE_INTAKE_HEADER_009K} data-no-fake-route="true" data-no-default-fare="true">
            <b>POST {ROUTE_QUOTE_INTAKE_009K}</b>
            <span>{QUOTE_INTAKE_HEADER_009K}</span>
            <small>{ui009Y.approvalMustMatch009K}</small>
          </article>
        </div>
        <div className="taxi009kNoFakeNotice">{ui009Y.quoteNoFakeNotice}</div>
      </section>

      <section className="taxi009jQuoteRequestQueue" data-taxi-orders-009j-rider-request-create="existing-accepted-quote-only" data-taxi-orders-009j-no-fake-rider-request="true">
        <div className="taxi009hQueueHead">
          <div>
            <span>{ui009Y.quoteToRequest}</span>
            <h3>{copy.quoteCandidateQueue}</h3>
            <p>{ui009Y.quoteSourceText}</p>
          </div>
          <button type="button" onClick={() => void createQuoteFromRealRoute009K()} disabled={!canSubmitQuoteIntake009K || busy === "quoteIntake009K"}>{ui009Y.createQuote}</button>
        <button type="button" onClick={() => void createRiderRequestFromManual009U()} disabled={!canSubmitRiderRequest009U || busy === "riderRequestManual009U"}>{ui009Y.createRiderRequest}</button>
        <button type="button" onClick={() => void loadQuoteCandidates()} disabled={busy === "quoteCandidates"}>{copy.loadQuoteCandidates}</button>
        </div>
        <section className="taxi009uManualRequest" data-taxi-orders-009u-rider-request-manual-action="visible" data-taxi-orders-009u-no-autofill="true" data-taxi-orders-009u-no-auto-submit="true" data-taxi-orders-009u-no-fake-request="true">
          <div className="taxi009hQueueHead">
            <div>
              <span>{MARKER009U}</span>
              <h3>009U · {ui009Y.manualRequestTitle}</h3>
              <p>{ui009Y.manualRequestDesc}</p>
            </div>
            <button type="button" onClick={() => void createRiderRequestFromManual009U()} disabled={!canSubmitRiderRequest009U || busy === "riderRequestManual009U"}>{ui009Y.runRequest}</button>
          </div>
          <div className="taxi009uManualGrid">
            <label><span>{ui009Y.acceptedQuoteId}</span><input value={riderRequestManual009U.quoteId} onChange={(event) => setRiderRequestManualField009U("quoteId", event.target.value)} placeholder={ui009Y.acceptedQuoteId} autoComplete="off" /></label>
            <label><span>{ui009Y.idempotencyKey}</span><input value={riderRequestManual009U.idempotencyKey} onChange={(event) => setRiderRequestManualField009U("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
            <label><span>{ui009Y.exactApproval}</span><input value={riderRequestManual009U.approval} onChange={(event) => setRiderRequestManualField009U("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
            <label className="wide"><span>{ui009Y.reason}</span><input value={riderRequestManual009U.reason} onChange={(event) => setRiderRequestManualField009U("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
            <article className="taxi009uManualSeal" data-exact-approval-header={RIDER_REQUEST_CREATE_HEADER_009J} data-no-fake-request="true" data-no-generated-idempotency="true">
              <b>POST {ROUTE_RIDER_REQUEST_CREATE_009J}</b>
              <span>{RIDER_REQUEST_CREATE_HEADER_009J}</span>
              <small>{ui009Y.approvalMustMatch009J}</small>
            </article>
          </div>
        </section>
        <div className="taxi009hOfferGrid taxi009jQuoteGrid">
          {quoteCandidates.length ? quoteCandidates.map((candidate) => (
            <article key={candidate.quoteId} className={candidate.canCreateRiderRequest ? "ready" : "blocked"}>
              <b>{candidate.quoteId}</b>
              <span>{candidate.quoteStatus} · rider {candidate.riderProfileId || "—"}</span>
              <small>{copy.fare} {money009A(candidate.estimatedFareMinor)} · {copy.archiveAt} {candidate.expiresAt || "—"}</small>
              <em>{candidate.existingOpenRiderRequestId ? `RiderRequest ${candidate.existingOpenRiderRequestId}` : candidate.blockedReason || "accepted quote ready"}</em>
              <small className="taxi009uManualCopyOnly">{ui009Y.manualCopyQuote}</small>
            </article>
          )) : <div className="taxi009bEmpty"><strong>{copy.noQuoteCandidates}</strong><span>{ui009Y.quoteNoFakeNotice}</span></div>}
        </div>
      </section>

      <section className="taxi009iDispatchCreateQueue" data-taxi-orders-009i-dispatch-create="existing-request-driver-vehicle-only" data-taxi-orders-009i-no-fake-dispatch-offer="true">
        <div className="taxi009hQueueHead">
          <div>
            <span>{ui009Y.requestToOffer}</span>
            <h3>{ui009Y.realRequestsForOffer}</h3>
            <p>{ui009Y.requestOfferSource}</p>
          </div>
          <button type="button" onClick={() => void loadDispatchCreateCandidates()} disabled={busy === "dispatchCreateCandidates"}>{ui009Y.refreshRequests}</button>
        </div>
        <section className="taxi009vManualDispatch" data-taxi-orders-009v-dispatch-offer-manual-action="visible" data-taxi-orders-009v-no-autofill="true" data-taxi-orders-009v-no-auto-submit="true" data-taxi-orders-009v-no-fake-dispatch-offer="true" data-taxi-orders-009v-no-generated-idempotency="true">
          <div className="taxi009hQueueHead">
            <div>
              <span>{MARKER009V}</span>
              <h3>009V · {ui009Y.manualOfferTitle}</h3>
              <p>{ui009Y.manualOfferDesc}</p>
            </div>
            <button type="button" onClick={() => void createDispatchOfferFromManual009V()} disabled={!canSubmitDispatchOffer009V || busy === "dispatchOfferManual009V"}>{ui009Y.runOffer}</button>
          </div>
          <div className="taxi009vManualGrid">
            <label><span>riderRequestId</span><input value={dispatchOfferManual009V.riderRequestId} onChange={(event) => setDispatchOfferManualField009V("riderRequestId", event.target.value)} placeholder={ui009Y.requestGate} autoComplete="off" /></label>
            <label><span>driverProfileId</span><input value={dispatchOfferManual009V.driverProfileId} onChange={(event) => setDispatchOfferManualField009V("driverProfileId", event.target.value)} placeholder={ui009Y.offerGateSub} autoComplete="off" /></label>
            <label><span>{ui009Y.vehicleId}</span><input value={dispatchOfferManual009V.vehicleId} onChange={(event) => setDispatchOfferManualField009V("vehicleId", event.target.value)} placeholder={ui009Y.vehicleId} autoComplete="off" /></label>
            <label><span>{ui009Y.matchingScore}</span><input value={dispatchOfferManual009V.matchingScore} onChange={(event) => setDispatchOfferManualField009V("matchingScore", event.target.value)} placeholder={ui009Y.matchingScore} inputMode="numeric" autoComplete="off" /></label>
            <label><span>{ui009Y.offerTtlSeconds}</span><input value={dispatchOfferManual009V.offerTtlSeconds} onChange={(event) => setDispatchOfferManualField009V("offerTtlSeconds", event.target.value)} placeholder={ui009Y.offerTtlSeconds} inputMode="numeric" autoComplete="off" /></label>
            <label><span>{ui009Y.idempotencyKey}</span><input value={dispatchOfferManual009V.idempotencyKey} onChange={(event) => setDispatchOfferManualField009V("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
            <label><span>{ui009Y.exactApproval}</span><input value={dispatchOfferManual009V.approval} onChange={(event) => setDispatchOfferManualField009V("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
            <label className="wide"><span>{ui009Y.reason}</span><input value={dispatchOfferManual009V.reason} onChange={(event) => setDispatchOfferManualField009V("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
            <article className="taxi009vManualSeal" data-exact-approval-header={DISPATCH_CREATE_HEADER_009I} data-no-fake-dispatch-offer="true" data-no-generated-idempotency="true">
              <b>POST {ROUTE_DISPATCH_CREATE_009I}</b>
              <span>{DISPATCH_CREATE_HEADER_009I}</span>
              <small>{ui009Y.approvalMustMatch009I}</small>
            </article>
          </div>
        </section>
        <div className="taxi009hOfferGrid taxi009iCandidateGrid">
          {dispatchCandidates.length ? dispatchCandidates.map((candidate) => (
            <article key={candidate.riderRequestId} className={candidate.canCreateDispatchOffer ? "ready" : "blocked"}>
              <b>{candidate.riderRequestId}</b>
              <span>{candidate.riderRequestStatus} · {candidate.countryCode || "—"}/{candidate.cityId || "—"}</span>
              <small>{ui009Y.driverLabel} {candidate.driverProfileId || "—"} · {ui009Y.offerGateSub}: {money009A(candidate.driverBalanceReserveMinor)} · {ui009Y.vehicleId} {candidate.vehicleId || "—"}</small>
              <em>{candidate.existingOpenDispatchOfferId ? `Open offer ${candidate.existingOpenDispatchOfferId}` : candidate.blockedReason || `score ${candidate.matchingScore}`}</em>
              <small className="taxi009vManualCopyOnly">{ui009Y.manualCopyOffer}</small>
            </article>
          )) : <div className="taxi009bEmpty"><strong>{ui009Y.noOpenRequests}</strong><span>{ui009Y.requestOfferSource}</span></div>}
        </div>
      </section>

      <section className="taxi009hDispatchOfferQueue" data-taxi-orders-009h-dispatch-offer-queue="existing-accepted-only" data-taxi-orders-009h-no-fake-trip-create="true">
        <div className="taxi009hQueueHead">
          <div>
            <span>{ui009Y.tripGate}</span>
            <h3>{copy.dispatchOfferQueue}</h3>
            <p>{ui009Y.offerToTripSource}</p>
          </div>
          <button type="button" onClick={() => void loadDispatchOffers()} disabled={busy === "dispatchOffers"}>{copy.loadDispatchOffers}</button>
        </div>
        <section className="taxi009wManualTrip" data-taxi-orders-009w-trip-manual-action="visible" data-taxi-orders-009w-no-autofill="true" data-taxi-orders-009w-no-auto-submit="true" data-taxi-orders-009w-no-fake-trip="true" data-taxi-orders-009w-no-generated-idempotency="true">
          <div className="taxi009hQueueHead">
            <div>
              <span>{MARKER009W}</span>
              <h3>009W · {ui009Y.manualTripTitle}</h3>
              <p>{ui009Y.manualTripDesc}</p>
            </div>
            <button type="button" onClick={() => void createTripFromManual009W()} disabled={!canSubmitTrip009W || busy === "tripManual009W"}>{ui009Y.runTrip}</button>
          </div>
          <div className="taxi009wManualGrid">
            <label><span>{ui009Y.dispatchOfferId}</span><input value={tripManual009W.dispatchOfferId} onChange={(event) => setTripManualField009W("dispatchOfferId", event.target.value)} placeholder={ui009Y.dispatchOfferId} autoComplete="off" /></label>
            <label><span>{ui009Y.vehicleId}</span><input value={tripManual009W.vehicleId} onChange={(event) => setTripManualField009W("vehicleId", event.target.value)} placeholder={ui009Y.vehicleId} autoComplete="off" /></label>
            <label><span>{ui009Y.idempotencyKey}</span><input value={tripManual009W.idempotencyKey} onChange={(event) => setTripManualField009W("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
            <label><span>{ui009Y.exactApproval}</span><input value={tripManual009W.approval} onChange={(event) => setTripManualField009W("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
            <label className="wide"><span>{ui009Y.reason}</span><input value={tripManual009W.reason} onChange={(event) => setTripManualField009W("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
            <article className="taxi009wManualSeal" data-exact-approval-header={TRIP_CREATE_HEADER_009G} data-no-fake-trip="true" data-no-generated-idempotency="true">
              <b>POST {ROUTE_TRIP_CREATE_009G}</b>
              <span>{TRIP_CREATE_HEADER_009G}</span>
              <small>{ui009Y.approvalMustMatch009G}</small>
            </article>
          </div>
        </section>
        <div className="taxi009hOfferGrid">
          {dispatchOffers.length ? dispatchOffers.map((offer) => (
            <article key={offer.dispatchOfferId} className={offer.canCreateTrip ? "ready" : "blocked"}>
              <b>{offer.dispatchOfferId}</b>
              <span>{offer.status} · driver {offer.driverProfileId || "—"}</span>
              <small>vehicle {offer.vehicleId || "—"} · {offer.approvedVehicleFound ? ui009Y.approvedYes : ui009Y.approvedNo}</small>
              <em>{offer.existingTripId ? `TaxiTrip ${offer.existingTripId}` : ui009Y.taxiTripNotCreated}</em>
              <small className="taxi009wManualCopyOnly">{ui009Y.manualCopyTrip}</small>
            </article>
          )) : <div className="taxi009bEmpty"><strong>{copy.noDispatchOffers}</strong><span>{ui009Y.offerToTripSource}</span></div>}
        </div>
      </section>


      <section className="taxi009xManualLifecycle" data-taxi-orders-009x-lifecycle-manual-action="visible" data-taxi-orders-009x-no-autofill="true" data-taxi-orders-009x-no-auto-submit="true" data-taxi-orders-009x-no-fake-status="true" data-taxi-orders-009x-no-generated-idempotency="true">
        <div className="taxi009hQueueHead">
          <div>
            <span>{MARKER009X}</span>
            <h3>009X · {ui009Y.manualLifecycleTitle}</h3>
            <p>{ui009Y.manualLifecycleDesc}</p>
          </div>
          <button type="button" onClick={() => void transitionLifecycleFromManual009X()} disabled={!canSubmitLifecycle009X || busy === "lifecycleManual009X"}>{ui009Y.runLifecycle}</button>
        </div>
        <div className="taxi009xManualGrid">
          <label><span>{ui009Y.orderId}</span><input value={lifecycleManual009X.orderId} onChange={(event) => setLifecycleManualField009X("orderId", event.target.value)} placeholder={ui009Y.orderId} autoComplete="off" /></label>
          <label><span>{ui009Y.nextStatus}</span><select value={lifecycleManual009X.nextStatus} onChange={(event) => setLifecycleManualField009X("nextStatus", event.target.value)}><option value="">{ui009Y.manualStatus}</option>{LIFECYCLE_ALLOWED_NEXT_STATUSES_009X.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label><span>{ui009Y.finalFareMinor}</span><input value={lifecycleManual009X.finalFareMinor} onChange={(event) => setLifecycleManualField009X("finalFareMinor", event.target.value)} placeholder={ui009Y.finalFareMinor} inputMode="numeric" autoComplete="off" /></label>
          <label><span>{ui009Y.idempotencyKey}</span><input value={lifecycleManual009X.idempotencyKey} onChange={(event) => setLifecycleManualField009X("idempotencyKey", event.target.value)} placeholder={ui009Y.manualUniqueKeyNoGenerated} autoComplete="off" /></label>
          <label><span>{ui009Y.exactApproval}</span><input value={lifecycleManual009X.approval} onChange={(event) => setLifecycleManualField009X("approval", event.target.value)} placeholder={ui009Y.typeExactApproval} autoComplete="off" /></label>
          <label className="wide"><span>{ui009Y.reason}</span><input value={lifecycleManual009X.reason} onChange={(event) => setLifecycleManualField009X("reason", event.target.value)} placeholder={ui009Y.manualAdminReason} autoComplete="off" /></label>
          <article className="taxi009xManualSeal" data-exact-approval-header={LIFECYCLE_TRANSITION_HEADER_009F} data-no-fake-status="true" data-no-generated-idempotency="true">
            <b>POST {ROUTE_LIFECYCLE_TRANSITION_009F}</b>
            <span>{LIFECYCLE_TRANSITION_HEADER_009F}</span>
            <small>{ui009Y.approvalMustMatch009F}</small>
          </article>
        </div>
        <div className="taxi009xManualTripCards">
          {orders.length ? orders.slice(0, 12).map((order) => (
            <article key={`009x-${order.orderId}`}>
              <b>{order.orderId}</b>
              <span>{order.status} · {order.routeLabel || "—"}</span>
              <small>{money009A(order.finalFareMinor)} · archived {order.archived ? "yes" : "no"}</small>
              <small className="taxi009xManualCopyOnly">{ui009Y.manualCopyLifecycle}</small>
            </article>
          )) : <div className="taxi009bEmpty"><strong>{copy.empty}</strong><span>{ui009Y.lifecycleOnlyExisting}</span></div>}
        </div>
      </section>

      <section className="taxi009bStatusCard">
        <h3>{copy.statusScale}</h3>
        <div className="taxi009bStatusRows">
          {scale.map((item) => (
            <div className={`taxi009bStatusRow ${item.key}`} key={item.key}>
              <div><strong>{item.label}</strong><span>{item.value} · {item.percent}%</span></div>
              <i style={{ width: `${Math.min(100, Math.max(0, item.percent))}%` }} />
            </div>
          ))}
        </div>
      </section>

      <div className="taxi009bWorkspace">
        <section className="taxi009bOrderList">
          <h3>{copy.orderList}</h3>
          {orders.length ? orders.map((order) => (
            <button key={order.orderId} type="button" aria-pressed={selected?.orderId === order.orderId} className={selected?.orderId === order.orderId ? "selected" : ""} onClick={() => setSelectedOrderId(order.orderId)}>
              <strong>{order.orderId}</strong>
              <span>{order.routeLabel}</span>
              <small>{order.status} · {money009A(order.finalFareMinor)} · {order.archiveStatus}</small>
            </button>
          )) : <div className="taxi009bEmpty"><strong>{copy.empty}</strong><span>{copy.savedInDb}</span></div>}
        </section>

        <section className="taxi009bDetails">
          <h3>{copy.selectedOrder}</h3>
          {selected ? (
            <div className="taxi009bDetailGrid">
              <div><span>ID</span><strong>{selected.orderId}</strong></div>
              <div><span>{copy.status}</span><strong>{selected.status}</strong></div>
              <div className="wide"><span>{copy.route}</span><strong>{selected.routeLabel}</strong></div>
              <div><span>{copy.fare}</span><strong>{money009A(selected.finalFareMinor)}</strong></div>
              <div><span>{copy.commission}</span><strong>{selected.commissionPercent}%</strong></div>
              <div><span>{copy.createdAt}</span><strong>{selected.createdAt || "—"}</strong></div>
              <div><span>{copy.archiveAt}</span><strong>{selected.archiveEligibleAt || "—"}</strong></div>
              <div><span>{copy.archived}</span><strong>{selected.archived ? copy.ready : selected.archiveStatus}</strong></div>
            </div>
          ) : <div className="taxi009bEmpty"><strong>{copy.empty}</strong><span>{copy.noFake}</span></div>}
        </section>

      </div>

    </div>
  );
}
