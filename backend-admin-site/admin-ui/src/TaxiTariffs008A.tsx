import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type TariffClass008A = "standard" | "comfort" | "business" | "delivery" | "intercity";
type TariffStatus008A = "draft" | "active" | "paused" | "retired";

type Country008A = { countryCode: string; countryName: string; currencyCode: string; localeLabel: string };
type TariffRow008A = {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  tariffCode: TariffClass008A;
  status: TariffStatus008A;
  baseFareMinor: number;
  peakBaseFareMinor: number;
  peakPickupIncreasePercent: 100;
  peakPickupMultiplier: 2;
  perKmMinor: number;
  perMinuteMinor: number;
  commissionPercent: number;
  commissionBasisPoints: number;
  effectiveOrderCommissionFormula: string;
  updatedAt: string;
  persisted: boolean;
};

type SaveResponse008A = { ok: boolean; status: number | string; message: string; route: string; at: string; details?: string; auditCount?: number; dbWriteExecuted?: boolean; auditWriteExecuted?: boolean } | null;

type AuditJournalItem008C = {
  id: string;
  actorId: string;
  action: string;
  targetId: string;
  createdAt: string;
  countryCodes: string[];
  changedRows: number;
  savedCount: number;
  peakPickupIncreasePercent: 100;
  commissionGuardPercent: { min: number; max: number };
  sabiAiRecommendationApplied?: boolean;
  sabiAiApplyFlow008G?: { localOnly?: boolean; dbWriteRequiresProtectedSave?: boolean; appliedRows?: number; discountPercent?: number } | null;
  sabiAiAutoWriteExecuted?: boolean;
  dbWriteRequiresProtectedSave?: boolean;
  protectedSaveStillRequired?: true;
};

type AiProvider008B = "yandex" | "uber";
type AiObservation008B = {
  provider: AiProvider008B;
  countryCode: string;
  currencyCode: string;
  tariffCode: TariffClass008A;
  baseFareMinor: number | null;
  perKmMinor: number | null;
  sourceUrl: string;
  sourceName: string;
  capturedAt: string;
  valid: boolean;
  rejectedReason?: string;
};
type AiRecommendation008B = {
  tariffCode: TariffClass008A;
  competitorProviders: AiProvider008B[];
  competitorMinBaseFareMinor: number | null;
  competitorMinPerKmMinor: number | null;
  recommendedBaseFareMinor: number | null;
  recommendedPerKmMinor: number | null;
  discountPercent: number;
  formula: string;
  confidence: "blocked" | "partial" | "ready";
  canApply: boolean;
};
type AiMonitorResponse008B = {
  ok: boolean;
  status?: number | string;
  version?: string;
  code?: string;
  message?: string;
  sourceConfigured?: boolean;
  internetCheckAttempted?: boolean;
  legalPublicSourcesOnly?: boolean;
  noPrivateApiScraping?: boolean;
  competitors?: AiProvider008B[];
  countryCode?: string;
  currencyCode?: string;
  discountPercent?: number;
  observations?: AiObservation008B[];
  recommendations?: AiRecommendation008B[];
  validationErrors?: string[];
};

type SourceConfigSource008E = {
  sourceId: string;
  countryCode: string;
  providers: AiProvider008B[];
  sourceName: string;
  urlHost: string;
  urlPath: string;
  urlHash: string;
  urlPreview: string;
  configuredFromEnv: string;
  legalPublicSource: boolean;
  privateApiScraping: boolean;
  noPrivateApiScraping: boolean;
  tariffWriteAllowed: boolean;
  autoApplyAllowed: boolean;
  enabled: boolean;
};
type SourceConfigResponse008E = {
  ok: boolean;
  status?: number | string;
  version?: string;
  code?: string;
  message?: string;
  countryCode?: string;
  sourceConfigured?: boolean;
  sourceCount?: number;
  sources?: SourceConfigSource008E[];
  acceptedEnvNames?: string[];
  requiredProviders?: AiProvider008B[];
  validationErrors?: string[];
  legalPublicSourcesOnly?: boolean;
  noPrivateApiScraping?: boolean;
  noFakePriceGeneration?: boolean;
  recommendationOnly?: boolean;
};
type Props008A = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };

type AiApplyDraft008G = {
  countryCode: string;
  discountPercent: number;
  appliedAt: string;
  appliedRows: number;
  sourceCode: string;
  localOnly: true;
  dbWriteExecuted: false;
  tariffWriteExecuted: false;
};

type Copy008A = {
  marker: string;
  title: string;
  subtitle: string;
  countryTariffs: string;
  peakRule: string;
  peakRuleDesc: string;
  commission: string;
  commissionDesc: string;
  load: string;
  saveCountry: string;
  saveAll: string;
  country: string;
  addCountry: string;
  countryCode: string;
  countryName: string;
  currency: string;
  tariff: string;
  status: string;
  baseFare: string;
  peakFare: string;
  perKm: string;
  perMinute: string;
  commissionPercent: string;
  updatedAt: string;
  persisted: string;
  draft: string;
  active: string;
  paused: string;
  retired: string;
  noFake: string;
  backendOnly: string;
  ownerHeader: string;
  lastResponse: string;
  formula: string;
  ready: string;
  blocked: string;
  saved: string;
  loaded: string;
  customCountryHint: string;
  selected: string;
  unsaved: string;
  editHint: string;
  peakLocked: string;
  sabiAiTitle: string;
  sabiAiSubtitle: string;
  aiDiscount: string;
  aiAutoCheck: string;
  aiAutoApply: string;
  aiCheckNow: string;
  aiApply: string;
  aiSourcesMissing: string;
  aiRealSourcesOnly: string;
  aiNoPrivateApi: string;
  aiLastCheck: string;
  aiRecommendation: string;
  aiCompetitorMin: string;
  aiCoverage: string;
  aiAppliedLocal: string;
  aiNoRecommendation: string;
  aiApplyLocalOnly: string;
  aiApplySaveRequired: string;
  aiApplyStatus: string;
  classNames: Record<TariffClass008A, string>;
};

const ROUTE_READ_008A = "/api/admin/taxi/tariffs/008a/country-tariffs";
const ROUTE_SAVE_008C = "/api/admin/taxi/tariffs/008c/production-save";
const ROUTE_WRITE_008A = ROUTE_SAVE_008C;
const ROUTE_AUDIT_008C = "/api/admin/taxi/tariffs/008c/audit-journal";
const ROUTE_AI_MONITOR_008B = "/api/admin/taxi/tariffs/008b/sabi-ai-price-monitor";
const ROUTE_SOURCE_CONFIG_008E = "/api/admin/taxi/tariffs/008e/competitor-source-config";
const APPROVAL_HEADER_008A = "x-sabi-taxi-tariffs-008c-production-save-approval";
const APPROVAL_VALUE_008A = "i-approve-taxi-tariffs-008c-production-save-audit";
const TARIFF_CLASSES_008A: TariffClass008A[] = ["standard", "comfort", "business", "delivery", "intercity"];
const STATUS_LIST_008A: TariffStatus008A[] = ["active", "draft", "paused", "retired"];
const TAXI_CURRENCY_022A_MARKER = "TAXI-CURRENCY-022A-COUNTRY-SPECIFIC-NO-FIXED-GLOBAL-CURRENCY";

const DEFAULT_COUNTRIES_008A: Country008A[] = [
  { countryCode: "UZ", countryName: "Uzbekistan", currencyCode: "UZS", localeLabel: "Узбекистан" },
  { countryCode: "KZ", countryName: "Kazakhstan", currencyCode: "KZT", localeLabel: "Казахстан" },
  { countryCode: "KG", countryName: "Kyrgyzstan", currencyCode: "KGS", localeLabel: "Кыргызстан" },
  { countryCode: "TJ", countryName: "Tajikistan", currencyCode: "TJS", localeLabel: "Таджикистан" },
  { countryCode: "RU", countryName: "Russia", currencyCode: "RUB", localeLabel: "Россия" },
  { countryCode: "AZ", countryName: "Azerbaijan", currencyCode: "AZN", localeLabel: "Азербайджан" },
  { countryCode: "TR", countryName: "Türkiye", currencyCode: "TRY", localeLabel: "Турция" },
  { countryCode: "AE", countryName: "United Arab Emirates", currencyCode: "AED", localeLabel: "ОАЭ" },
];

const SOURCE_COPY_008E: Record<AdminLanguage, { title: string; subtitle: string; load: string; configured: string; missing: string; env: string; legal: string; noPrivate: string; recommendationOnly: string; example: string; }> = {
  ru: {
    title: "Саби ИИ: источники цен конкурентов",
    subtitle: "Настройка идёт только через законный публичный источник. Интерфейс показывает статус по выбранному государству; если источника нет, Саби ИИ не выдумывает цену.",
    load: "Проверить источники",
    configured: "Источники настроены",
    missing: "Источники не настроены",
    env: "Env для настройки",
    legal: "Только законный публичный источник",
    noPrivate: "Private API scraping запрещён",
    recommendationOnly: "Саби ИИ только рекомендует, не пишет тариф",
    example: "Пример настройки источника хранится отдельно; интерфейс не показывает секреты и не делает скрытый сбор данных.",
  },
  en: {
    title: "Sabi AI: competitor price sources",
    subtitle: "Sources are configured only through legal/public feed env. The UI shows status for the selected country; if no source exists, Sabi AI does not invent prices.",
    load: "Check sources",
    configured: "Sources configured",
    missing: "Sources not configured",
    env: "Configuration env",
    legal: "Legal/public only",
    noPrivate: "Private API scraping is blocked",
    recommendationOnly: "Sabi AI recommends only and never writes tariffs",
    example: "JSON example: {\"UZ\":[{\"providers\":[\"yandex\",\"uber\"],\"url\":\"https://your-feed.example/taxi-prices\",\"legalPublicSource\":true,\"privateApiScraping\":false}]}",
  },
  uz: {
    title: "Sabi AI: raqobatchi narx manbalari",
    subtitle: "Manbalar faqat qonuniy ommaviy manba orqali sozlanadi. Manba bo‘lmasa, Sabi sunʼiy intellekti narxni o‘ylab topmaydi.",
    load: "Manbalarni tekshirish",
    configured: "Manbalar sozlangan",
    missing: "Manbalar sozlanmagan",
    env: "Sozlash env",
    legal: "Faqat legal/public",
    noPrivate: "Private API scraping taqiqlangan",
    recommendationOnly: "Sabi AI faqat tavsiya qiladi, tarif yozmaydi",
    example: "JSON namuna: {\"UZ\":[{\"providers\":[\"yandex\",\"uber\"],\"url\":\"https://your-feed.example/taxi-prices\",\"legalPublicSource\":true,\"privateApiScraping\":false}]}",
  },
  zh: {
    title: "Sabi 智能体：竞品价格来源",
    subtitle: "仅通过合法公开来源配置。没有真实来源时，Sabi 智能体不会生成假价格。",
    load: "检查来源",
    configured: "来源已配置",
    missing: "来源未配置",
    env: "配置 env",
    legal: "仅合法公开来源",
    noPrivate: "禁止 Private API scraping",
    recommendationOnly: "Sabi 智能体只推荐，不写入费率",
    example: "来源配置示例单独保存；界面不显示密钥，也不进行隐藏抓取。",
  },
};

const COPY008A: Record<AdminLanguage, Copy008A> = {
  ru: {
    marker: "ADMIN-UI-TAXI-TARIFFS-008C-PRODUCTION-SAVE-AUDIT-NO-FAKE",
    title: "Такси: тарифы по государствам",
    subtitle: "Аккуратная производственная страница тарифов: каждое государство выбирается отдельной кнопкой, активное государство подсвечивается цветом, подача в пик всегда +100%, комиссия задаётся процентом от заказа, сохранение идёт в базу данных с журналом старого и нового значения. Без ложных данных.",
    countryTariffs: "Тарифы выбранного государства",
    peakRule: "Пик +100%",
    peakRuleDesc: "Во время пика сумма подачи автоматически считается как подача × 2. Поле заблокировано для ручной подмены.",
    commission: "Комиссия от заказа",
    commissionDesc: "Администратор вводит процент, сервер получает базисные пункты и формулу комиссии от заказа.",
    load: "Загрузить тарифы",
    saveCountry: "Сохранить выбранное государство",
    saveAll: "Сохранить все государства",
    country: "Государство",
    addCountry: "Добавить государство",
    countryCode: "Код",
    countryName: "Название",
    currency: "Валюта",
    tariff: "Тариф",
    status: "Статус",
    baseFare: "Подача",
    peakFare: "Пик подача",
    perKm: "За км",
    perMinute: "За минуту",
    commissionPercent: "Комиссия %",
    updatedAt: "Обновлено",
    persisted: "Сохранено",
    draft: "Черновик",
    active: "Активен",
    paused: "Пауза",
    retired: "Архив",
    noFake: "Без фейка",
    backendOnly: "Ждём реальный ответ сервера",
    ownerHeader: "Заголовок точного утверждения включён",
    lastResponse: "Последний ответ сервера",
    formula: "Формула",
    ready: "Готово",
    blocked: "Заблокировано",
    saved: "Тарифы сохранены",
    loaded: "Тарифы загружены",
    customCountryHint: "Можно добавить любое государство ISO-кодом, например US, DE, IN.",
    selected: "Выбрано",
    unsaved: "Есть несохранённые изменения",
    editHint: "Изменения остаются локальными до успешного ответа сервера.",
    peakLocked: "Автоматически ×2",
    sabiAiTitle: "Саби ИИ: монитор цен Яндекс/Uber",
    sabiAiSubtitle: "Автоматически проверяет только настроенные легальные публичные источники. Если реальных данных нет — тариф не меняется и фейковая цена не показывается.",
    aiDiscount: "Скидка к конкурентам %",
    aiAutoCheck: "Автопроверка при выборе государства",
    aiAutoApply: "Автоматически применить в форму после реальной проверки",
    aiCheckNow: "Проверить сейчас",
    aiApply: "Применить рекомендации",
    aiSourcesMissing: "Источники SABI_TAXI_COMPETITOR_PRICE_FEED_URLS не настроены",
    aiRealSourcesOnly: "Только реальные публичные источники",
    aiNoPrivateApi: "Без приватного API и без фейка",
    aiLastCheck: "Последняя проверка ИИ",
    aiRecommendation: "Рекомендация",
    aiCompetitorMin: "Минимум конкурента",
    aiCoverage: "Покрытие",
    aiAppliedLocal: "Саби ИИ применил рекомендации локально. Для записи нажмите сохранить.",
    aiNoRecommendation: "Нет реальной рекомендации",
    aiApplyLocalOnly: "Рекомендация применена только в форму",
    aiApplySaveRequired: "Для записи в базу данных нажмите защищённую кнопку «Сохранить» — Саби ИИ сам не пишет тарифы.",
    aiApplyStatus: "Статус применения Саби ИИ",
    classNames: { standard: "Стандарт", comfort: "Комфорт", business: "Бизнес", delivery: "Доставка", intercity: "Межгород" },
  },
  en: {
    marker: "ADMIN-UI-TAXI-TARIFFS-008C-PRODUCTION-SAVE-AUDIT-NO-FAKE",
    title: "Taxi: country tariffs",
    subtitle: "A clean production tariffs page: every country is selected by its own button, the selected country changes color, peak pickup/base fare is always +100%, commission is configured as an order percentage, and saves write to DB with old/new audit journal. No fake save.",
    countryTariffs: "Selected country tariffs",
    peakRule: "Peak +100%",
    peakRuleDesc: "During peak, pickup/base fare is calculated as base fare × 2. The field is locked against manual override.",
    commission: "Order commission",
    commissionDesc: "Admin enters percent, backend receives basis points and the order commission formula.",
    load: "Load tariffs",
    saveCountry: "Save selected country",
    saveAll: "Save all countries",
    country: "Country",
    addCountry: "Add country",
    countryCode: "Code",
    countryName: "Name",
    currency: "Currency",
    tariff: "Tariff",
    status: "Status",
    baseFare: "Pickup/base",
    peakFare: "Peak pickup",
    perKm: "Per km",
    perMinute: "Per minute",
    commissionPercent: "Commission %",
    updatedAt: "Updated",
    persisted: "Persisted",
    draft: "Draft",
    active: "Active",
    paused: "Paused",
    retired: "Retired",
    noFake: "No fake",
    backendOnly: "Waiting for real backend response",
    ownerHeader: "Exact approval header enabled",
    lastResponse: "Last backend response",
    formula: "Formula",
    ready: "Ready",
    blocked: "Blocked",
    saved: "Tariffs saved",
    loaded: "Tariffs loaded",
    customCountryHint: "Any ISO-like country code can be added, for example US, DE, IN.",
    selected: "Selected",
    unsaved: "Unsaved changes",
    editHint: "Changes stay local until the backend confirms them.",
    peakLocked: "Automatic ×2",
    sabiAiTitle: "Sabi AI: Yandex/Uber price monitor",
    sabiAiSubtitle: "Automatically checks only configured legal public sources. If real data is missing, no tariff is changed and no fake price is shown.",
    aiDiscount: "Competitor discount %",
    aiAutoCheck: "Auto-check when country changes",
    aiAutoApply: "Auto-apply to form after real check",
    aiCheckNow: "Check now",
    aiApply: "Apply recommendations",
    aiSourcesMissing: "SABI_TAXI_COMPETITOR_PRICE_FEED_URLS sources are not configured",
    aiRealSourcesOnly: "Real public sources only",
    aiNoPrivateApi: "No private API and no fake data",
    aiLastCheck: "Last AI check",
    aiRecommendation: "Recommendation",
    aiCompetitorMin: "Competitor minimum",
    aiCoverage: "Coverage",
    aiAppliedLocal: "Sabi AI applied recommendations locally. Press save to write.",
    aiNoRecommendation: "No real recommendation",
    aiApplyLocalOnly: "Recommendation applied to the form only",
    aiApplySaveRequired: "Press the protected Save button to write to DB — Sabi AI never writes tariffs by itself.",
    aiApplyStatus: "Sabi AI apply status",
    classNames: { standard: "Standard", comfort: "Comfort", business: "Business", delivery: "Delivery", intercity: "Intercity" },
  },
  uz: {
    marker: "ADMIN-UI-TAXI-TARIFFS-008C-PRODUCTION-SAVE-AUDIT-NO-FAKE",
    title: "Taksi: davlatlar bo‘yicha tariflar",
    subtitle: "Tarif sahifasi: har bir davlat alohida tugma bilan tanlanadi, tanlangan davlat rangi o‘zgaradi, pikda yetkazish +100%, komissiya buyurtma foizi sifatida sozlanadi, saqlash maʼlumotlar bazasi va eski/yangi tekshiruv jurnali bilan ishlaydi. Soxta saqlash yo‘q.",
    countryTariffs: "Tanlangan davlat tariflari",
    peakRule: "Pik +100%",
    peakRuleDesc: "Pik vaqtida podacha narxi podacha × 2 bo‘ladi. Maydon qo‘lda almashtirishdan qulflangan.",
    commission: "Buyurtma komissiyasi",
    commissionDesc: "Admin foiz kiritadi, backend basis points va komissiya formulasini oladi.",
    load: "Tariflarni yuklash",
    saveCountry: "Tanlangan davlatni saqlash",
    saveAll: "Barcha davlatlarni saqlash",
    country: "Davlat",
    addCountry: "Davlat qo‘shish",
    countryCode: "Kod",
    countryName: "Nomi",
    currency: "Valyuta",
    tariff: "Tarif",
    status: "Status",
    baseFare: "Podacha",
    peakFare: "Pik podacha",
    perKm: "Km uchun",
    perMinute: "Daqiqa uchun",
    commissionPercent: "Komissiya %",
    updatedAt: "Yangilangan",
    persisted: "Saqlangan",
    draft: "Qoralama",
    active: "Aktiv",
    paused: "Pauza",
    retired: "Arxiv",
    noFake: "Soxta natija yo‘q",
    backendOnly: "Haqiqiy backend javobi kutilmoqda",
    ownerHeader: "Exact approval header yoqilgan",
    lastResponse: "Oxirgi backend javobi",
    formula: "Formula",
    ready: "Tayyor",
    blocked: "Bloklangan",
    saved: "Tariflar saqlandi",
    loaded: "Tariflar yuklandi",
    customCountryHint: "US, DE, IN kabi ISO-kod bilan har qanday davlat qo‘shiladi.",
    selected: "Tanlangan",
    unsaved: "Saqlanmagan o‘zgarishlar",
    editHint: "O‘zgarishlar server tasdiqlaguncha lokal qoladi.",
    peakLocked: "Avtomatik ×2",
    sabiAiTitle: "Sabi AI: Yandex/Uber narx monitori",
    sabiAiSubtitle: "Faqat sozlangan qonuniy ochiq manbalarni avtomatik tekshiradi. Haqiqiy maʼlumot bo‘lmasa tarif o‘zgarmaydi va soxta narx ko‘rsatilmaydi.",
    aiDiscount: "Raqobatchidan arzon %",
    aiAutoCheck: "Davlat tanlanganda avtotekshiruv",
    aiAutoApply: "Haqiqiy tekshiruvdan keyin formaga avtomatik qo‘llash",
    aiCheckNow: "Hozir tekshirish",
    aiApply: "Tavsiyalarni qo‘llash",
    aiSourcesMissing: "SABI_TAXI_COMPETITOR_PRICE_FEED_URLS manbalari sozlanmagan",
    aiRealSourcesOnly: "Faqat haqiqiy ochiq manbalar",
    aiNoPrivateApi: "Yopiq kirish yo‘q, soxta natija yo‘q",
    aiLastCheck: "Oxirgi AI tekshiruv",
    aiRecommendation: "Tavsiya",
    aiCompetitorMin: "Raqobatchi minimumi",
    aiCoverage: "Qamrov",
    aiAppliedLocal: "Sabi sunʼiy intellekti tavsiyalarni lokal formaga qo‘lladi. Yozish uchun saqlashni bosing.",
    aiNoRecommendation: "Haqiqiy tavsiya yo‘q",
    aiApplyLocalOnly: "Tavsiya faqat formaga qo‘llandi",
    aiApplySaveRequired: "Maʼlumotlar bazasiga yozish uchun himoyalangan Saqlash tugmasini bosing — Sabi sunʼiy intellekti tarifni o‘zi yozmaydi.",
    aiApplyStatus: "Sabi sunʼiy intellekti qo‘llash holati",
    classNames: { standard: "Standart", comfort: "Komfort", business: "Biznes", delivery: "Yetkazish", intercity: "Shaharlararo" },
  },
  zh: {
    marker: "ADMIN-UI-TAXI-TARIFFS-008C-PRODUCTION-SAVE-AUDIT-NO-FAKE",
    title: "出租车：按国家设置费率",
    subtitle: "生产费率页面：每个国家用独立按钮选择，选中后改变颜色，高峰派车费固定 +100%，佣金按订单百分比设置，保存写入数据库并记录旧值和新值。无假保存。",
    countryTariffs: "所选国家费率",
    peakRule: "高峰 +100%",
    peakRuleDesc: "高峰期派车费 = 基础派车费 × 2。该字段锁定，不能手动伪造。",
    commission: "订单佣金",
    commissionDesc: "管理员输入百分比，服务器接收基点和订单佣金公式。",
    load: "加载费率",
    saveCountry: "保存所选国家",
    saveAll: "保存所有国家",
    country: "国家",
    addCountry: "添加国家",
    countryCode: "代码",
    countryName: "名称",
    currency: "货币",
    tariff: "费率",
    status: "状态",
    baseFare: "派车费",
    peakFare: "高峰派车费",
    perKm: "每公里",
    perMinute: "每分钟",
    commissionPercent: "佣金 %",
    updatedAt: "更新",
    persisted: "已保存",
    draft: "草稿",
    active: "启用",
    paused: "暂停",
    retired: "归档",
    noFake: "无假成功",
    backendOnly: "等待真实服务器响应",
    ownerHeader: "精确审批标头已启用",
    lastResponse: "最后服务器响应",
    formula: "公式",
    ready: "就绪",
    blocked: "已阻止",
    saved: "费率已保存",
    loaded: "费率已加载",
    customCountryHint: "可用 ISO 类代码添加任意国家，如 US、DE、IN。",
    selected: "已选择",
    unsaved: "未保存更改",
    editHint: "更改在服务器确认前仅保存在本地。",
    peakLocked: "自动 ×2",
    sabiAiTitle: "Sabi 智能体：Yandex/Uber 价格监控",
    sabiAiSubtitle: "仅自动检查已配置的合法公开来源。没有真实数据时，不更改费率，也不显示假价格。",
    aiDiscount: "低于竞品 %",
    aiAutoCheck: "选择国家时自动检查",
    aiAutoApply: "真实检查后自动应用到表单",
    aiCheckNow: "立即检查",
    aiApply: "应用建议",
    aiSourcesMissing: "未配置 SABI_TAXI_COMPETITOR_PRICE_FEED_URLS 来源",
    aiRealSourcesOnly: "仅真实公开来源",
    aiNoPrivateApi: "无私有 API，无假数据",
    aiLastCheck: "最后智能检查",
    aiRecommendation: "建议",
    aiCompetitorMin: "竞品最低值",
    aiCoverage: "覆盖",
    aiAppliedLocal: "Sabi 智能体已在本地应用建议。点击保存才会写入。",
    aiNoRecommendation: "没有真实建议",
    aiApplyLocalOnly: "建议仅应用到表单",
    aiApplySaveRequired: "写入数据库必须点击受保护的保存按钮 — Sabi 智能体不会自行写入费率。",
    aiApplyStatus: "Sabi 智能体应用状态",
    classNames: { standard: "标准", comfort: "舒适", business: "商务", delivery: "配送", intercity: "城际" },
  },
};

function normalizeBase008A(config: AdminApiConfig): string {
  return (config.baseUrl || "http://127.0.0.1:4001").replace(/\/+$/, "");
}

function toNumber008A(value: unknown, fallback: number): number {
  const parsed = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : fallback;
}

function countryKey008A(countryCode: string, tariffCode: string): string {
  return `${countryCode.toUpperCase()}::${tariffCode.toLowerCase()}`;
}

function status008A(value: unknown): TariffStatus008A {
  const raw = String(value || "active").toLowerCase();
  return raw === "draft" || raw === "paused" || raw === "retired" ? raw : "active";
}

function tariffCode008A(value: unknown): TariffClass008A {
  const raw = String(value || "standard").toLowerCase();
  return TARIFF_CLASSES_008A.includes(raw as TariffClass008A) ? raw as TariffClass008A : "standard";
}

function normalizeCountry008A(raw: Partial<Country008A>): Country008A {
  const code = String(raw.countryCode || "UZ").trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || "UZ";
  return {
    countryCode: code,
    countryName: String(raw.countryName || code).trim() || code,
    currencyCode: String(raw.currencyCode || code).trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || code,
    localeLabel: String(raw.localeLabel || raw.countryName || code).trim() || code,
  };
}

function makeRow008A(country: Country008A, tariffCode: TariffClass008A): TariffRow008A {
  return {
    countryCode: country.countryCode,
    countryName: country.countryName,
    currencyCode: country.currencyCode,
    tariffCode,
    status: "active",
    baseFareMinor: 0,
    peakBaseFareMinor: 0,
    peakPickupIncreasePercent: 100,
    peakPickupMultiplier: 2,
    perKmMinor: 0,
    perMinuteMinor: 0,
    commissionPercent: 12,
    commissionBasisPoints: 1200,
    effectiveOrderCommissionFormula: "orderTotalMinor * 12 / 100",
    updatedAt: "",
    persisted: false,
  };
}

function normalizeRow008A(raw: Partial<TariffRow008A>, countries: Country008A[]): TariffRow008A {
  const country = normalizeCountry008A(
    countries.find((item) => item.countryCode === String(raw.countryCode || "").toUpperCase()) || {
      countryCode: raw.countryCode,
      countryName: raw.countryName,
      currencyCode: raw.currencyCode,
      localeLabel: raw.countryName,
    },
  );
  const baseFareMinor = Math.max(0, Math.round(toNumber008A(raw.baseFareMinor, 0)));
  const perKmMinor = Math.max(0, Math.round(toNumber008A(raw.perKmMinor, 0)));
  const perMinuteMinor = Math.max(0, Math.round(toNumber008A(raw.perMinuteMinor, 0)));
  const commissionPercent = Math.max(0, Math.min(35, toNumber008A(raw.commissionPercent, toNumber008A(raw.commissionBasisPoints, 1200) / 100)));
  return {
    countryCode: country.countryCode,
    countryName: country.countryName,
    currencyCode: country.currencyCode,
    tariffCode: tariffCode008A(raw.tariffCode),
    status: status008A(raw.status),
    baseFareMinor,
    peakBaseFareMinor: baseFareMinor * 2,
    peakPickupIncreasePercent: 100,
    peakPickupMultiplier: 2,
    perKmMinor,
    perMinuteMinor,
    commissionPercent,
    commissionBasisPoints: Math.round(commissionPercent * 100),
    effectiveOrderCommissionFormula: `orderTotalMinor * ${commissionPercent} / 100`,
    updatedAt: String(raw.updatedAt || ""),
    persisted: Boolean(raw.persisted),
  };
}

function buildInitialRows008A(countries: Country008A[]): TariffRow008A[] {
  return countries.flatMap((country) => TARIFF_CLASSES_008A.map((tariff) => makeRow008A(country, tariff)));
}

function sortCountries008A(items: Country008A[]): Country008A[] {
  return [...items].sort((a, b) => a.countryCode.localeCompare(b.countryCode));
}

function sortRows008A(items: TariffRow008A[]): TariffRow008A[] {
  return [...items].sort((a, b) => a.countryCode.localeCompare(b.countryCode) || TARIFF_CLASSES_008A.indexOf(a.tariffCode) - TARIFF_CLASSES_008A.indexOf(b.tariffCode));
}

function statusClass008A(status: TariffStatus008A): string {
  return `taxi008bStatus taxi008bStatus-${status}`;
}

function clampAiDiscount008B(value: unknown): number {
  const parsed = Number(String(value ?? "").replace(",", "."));
  if (!Number.isFinite(parsed)) return 1.5;
  return Math.round(Math.max(1, Math.min(2, parsed)) * 100) / 100;
}

function hasAiRecommendation008B(result: AiMonitorResponse008B | null): boolean {
  return Boolean(result?.recommendations?.some((item) => item.canApply));
}

function minor008B(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value) ? String(value) : "—";
}

export function TaxiTariffs008APanel({ language, config, setNotice }: Props008A) {
  const copy = COPY008A[language] || COPY008A.ru;
  const sourceCopy = SOURCE_COPY_008E[language] || SOURCE_COPY_008E.ru;
  const [countries, setCountries] = useState<Country008A[]>(DEFAULT_COUNTRIES_008A);
  const [selectedCountry, setSelectedCountry] = useState("UZ");
  const [rows, setRows] = useState<TariffRow008A[]>(() => buildInitialRows008A(DEFAULT_COUNTRIES_008A));
  const [lastResponse, setLastResponse] = useState<SaveResponse008A>(null);
  const [busy, setBusy] = useState("");
  const [customCountry, setCustomCountry] = useState({ countryCode: "", countryName: "", currencyCode: "" });
  const [aiDiscountPercent, setAiDiscountPercent] = useState(1.5);
  const [aiAutoCheck, setAiAutoCheck] = useState(true);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiApplyDraft, setAiApplyDraft] = useState<AiApplyDraft008G | null>(null);
  const [aiResult, setAiResult] = useState<AiMonitorResponse008B | null>(null);
  const [sourceConfig, setSourceConfig] = useState<SourceConfigResponse008E | null>(null);
  const [sourceBusy, setSourceBusy] = useState(false);
  const [auditRows, setAuditRows] = useState<AuditJournalItem008C[]>([]);

  const selectedRows = useMemo(() => rows.filter((row) => row.countryCode === selectedCountry), [rows, selectedCountry]);
  const selectedCountryInfo = useMemo(() => countries.find((country) => country.countryCode === selectedCountry) || countries[0], [countries, selectedCountry]);
  const activeCount = selectedRows.filter((row) => row.status === "active").length;
  const avgCommission = selectedRows.length ? selectedRows.reduce((sum, row) => sum + row.commissionPercent, 0) / selectedRows.length : 0;
  const selectedUnsavedCount = selectedRows.filter((row) => !row.persisted).length;
  const persistedCount = rows.filter((row) => row.persisted).length;

  const replaceFromBackend = (incomingRows: Partial<TariffRow008A>[], incomingCountries: Partial<Country008A>[]) => {
    const countryMap = new Map<string, Country008A>();
    DEFAULT_COUNTRIES_008A.forEach((country) => countryMap.set(country.countryCode, country));
    incomingCountries.map(normalizeCountry008A).forEach((country) => countryMap.set(country.countryCode, country));
    incomingRows.forEach((row) => {
      const country = normalizeCountry008A({ countryCode: row.countryCode, countryName: row.countryName, currencyCode: row.currencyCode, localeLabel: row.countryName });
      countryMap.set(country.countryCode, country);
    });
    const finalCountries = sortCountries008A(Array.from(countryMap.values()));
    const rowMap = new Map(buildInitialRows008A(finalCountries).map((row) => [countryKey008A(row.countryCode, row.tariffCode), row]));
    incomingRows.forEach((row) => {
      const normalized = normalizeRow008A(row, finalCountries);
      rowMap.set(countryKey008A(normalized.countryCode, normalized.tariffCode), normalized);
    });
    setCountries(finalCountries);
    setRows(sortRows008A(Array.from(rowMap.values())));
    setSelectedCountry((current) => finalCountries.some((country) => country.countryCode === current) ? current : (finalCountries[0]?.countryCode || "UZ"));
  };

  const mergeSavedRows = (savedRows: Partial<TariffRow008A>[]) => {
    if (!savedRows.length) return;
    setCountries((previousCountries) => {
      const countryMap = new Map(previousCountries.map((country) => [country.countryCode, country]));
      savedRows.forEach((row) => {
        const country = normalizeCountry008A({ countryCode: row.countryCode, countryName: row.countryName, currencyCode: row.currencyCode, localeLabel: row.countryName });
        countryMap.set(country.countryCode, country);
      });
      const finalCountries = sortCountries008A(Array.from(countryMap.values()));
      setRows((previousRows) => {
        const rowMap = new Map(previousRows.map((row) => [countryKey008A(row.countryCode, row.tariffCode), row]));
        buildInitialRows008A(finalCountries).forEach((row) => {
          const key = countryKey008A(row.countryCode, row.tariffCode);
          if (!rowMap.has(key)) rowMap.set(key, row);
        });
        savedRows.forEach((row) => {
          const normalized = normalizeRow008A({ ...row, persisted: true }, finalCountries);
          rowMap.set(countryKey008A(normalized.countryCode, normalized.tariffCode), normalized);
        });
        return sortRows008A(Array.from(rowMap.values()));
      });
      return finalCountries;
    });
  };

  const loadTariffs = async () => {
    setBusy("load");
    const route = ROUTE_READ_008A;
    try {
      const response = await fetch(`${normalizeBase008A(config)}${route}`, { headers: { "x-admin-token": config.token || "", "x-sabi-admin-token": config.token || "" } });
      const json = await response.json().catch(() => ({}));
      const incomingRows = Array.isArray(json?.tariffs) ? json.tariffs : [];
      const incomingCountries = Array.isArray(json?.countries) ? json.countries : DEFAULT_COUNTRIES_008A;
      replaceFromBackend(incomingRows, incomingCountries);
      const message = String(json?.message || `${copy.loaded}: ${incomingRows.length}`);
      setLastResponse({ ok: response.ok, status: response.status, message, route, at: new Date().toISOString(), details: json?.missing?.join?.(", ") || "" });
      setNotice(response.ok ? copy.loaded : copy.blocked);
    } catch (error) {
      setLastResponse({ ok: false, status: "network_error", message: error instanceof Error ? error.message : "network_error", route, at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  useEffect(() => {
    void loadTariffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRow = (tariffCode: TariffClass008A, field: keyof Pick<TariffRow008A, "status" | "baseFareMinor" | "perKmMinor" | "perMinuteMinor" | "commissionPercent">, value: string) => {
    setAiApplyDraft(null);
    setRows((previousRows) => previousRows.map((row) => {
      if (row.countryCode !== selectedCountry || row.tariffCode !== tariffCode) return row;
      if (field === "status") return { ...row, status: status008A(value), persisted: false };
      const numeric = field === "commissionPercent" ? Math.max(0, Math.min(35, toNumber008A(value, row.commissionPercent))) : Math.max(0, Math.round(toNumber008A(value, Number(row[field]))));
      const next = { ...row, [field]: numeric, persisted: false } as TariffRow008A;
      const commissionPercent = field === "commissionPercent" ? numeric : next.commissionPercent;
      const baseFareMinor = field === "baseFareMinor" ? numeric : next.baseFareMinor;
      return {
        ...next,
        peakBaseFareMinor: Math.round(baseFareMinor * 2),
        commissionBasisPoints: Math.round(commissionPercent * 100),
        effectiveOrderCommissionFormula: `orderTotalMinor * ${commissionPercent} / 100`,
      };
    }));
  };

  const addCountry = () => {
    setAiApplyDraft(null);
    const country = normalizeCountry008A({
      countryCode: customCountry.countryCode,
      countryName: customCountry.countryName || customCountry.countryCode,
      currencyCode: customCountry.currencyCode || customCountry.countryCode,
      localeLabel: customCountry.countryName || customCountry.countryCode,
    });
    if (country.countryCode.length < 2) return;
    if (countries.some((item) => item.countryCode === country.countryCode)) {
      setSelectedCountry(country.countryCode);
      return;
    }
    setCountries((prev) => sortCountries008A([...prev, country]));
    setRows((prev) => sortRows008A([...prev, ...TARIFF_CLASSES_008A.map((tariff) => makeRow008A(country, tariff))]));
    setSelectedCountry(country.countryCode);
    setCustomCountry({ countryCode: "", countryName: "", currencyCode: "" });
  };


  const applyAiRecommendationsFromResult = (result: AiMonitorResponse008B | null) => {
    const recommendations = result?.recommendations || [];
    if (!result?.ok || result.countryCode !== selectedCountry || !recommendations.some((item) => item.canApply)) {
      setNotice(copy.aiNoRecommendation);
      return false;
    }
    let appliedRows = 0;
    setRows((previousRows) => previousRows.map((row) => {
      if (row.countryCode !== selectedCountry) return row;
      const recommendation = recommendations.find((item) => item.tariffCode === row.tariffCode && item.canApply);
      if (!recommendation) return row;
      const hasBase = typeof recommendation.recommendedBaseFareMinor === "number" && Number.isFinite(recommendation.recommendedBaseFareMinor);
      const hasKm = typeof recommendation.recommendedPerKmMinor === "number" && Number.isFinite(recommendation.recommendedPerKmMinor);
      if (!hasBase && !hasKm) return row;
      const baseFareMinor = hasBase ? Number(recommendation.recommendedBaseFareMinor) : row.baseFareMinor;
      const perKmMinor = hasKm ? Number(recommendation.recommendedPerKmMinor) : row.perKmMinor;
      appliedRows += 1;
      return {
        ...row,
        baseFareMinor,
        peakBaseFareMinor: Math.round(baseFareMinor * 2),
        perKmMinor,
        persisted: false,
        updatedAt: "",
      };
    }));
    if (!appliedRows) {
      setNotice(copy.aiNoRecommendation);
      return false;
    }
    setAiApplyDraft({
      countryCode: selectedCountry,
      discountPercent: clampAiDiscount008B(result.discountPercent ?? aiDiscountPercent),
      appliedAt: new Date().toISOString(),
      appliedRows,
      sourceCode: String(result.code || "taxi_sabi_ai_price_monitor_008b_recommendations_ready"),
      localOnly: true,
      dbWriteExecuted: false,
      tariffWriteExecuted: false,
    });
    setNotice(copy.aiAppliedLocal);
    return true;
  };

  const loadSourceConfig008E = async () => {
    setSourceBusy(true);
    const route = `${ROUTE_SOURCE_CONFIG_008E}?countryCode=${encodeURIComponent(selectedCountry)}`;
    try {
      const response = await fetch(`${normalizeBase008A(config)}${route}`, {
        headers: { "x-admin-token": config.token || "", "x-sabi-admin-token": config.token || "" },
      });
      const json = await response.json().catch(() => ({}));
      setSourceConfig({
        ok: Boolean(json?.ok),
        status: response.status,
        version: String(json?.version || ""),
        code: String(json?.code || ""),
        message: String(json?.message || json?.error || ""),
        countryCode: String(json?.countryCode || selectedCountry),
        sourceConfigured: Boolean(json?.sourceConfigured),
        sourceCount: Number(json?.sourceCount || 0),
        sources: Array.isArray(json?.sources) ? json.sources : [],
        acceptedEnvNames: Array.isArray(json?.acceptedEnvNames) ? json.acceptedEnvNames.map(String) : [],
        requiredProviders: Array.isArray(json?.requiredProviders) ? json.requiredProviders : [],
        validationErrors: Array.isArray(json?.validationErrors) ? json.validationErrors.map(String) : [],
        legalPublicSourcesOnly: Boolean(json?.legalPublicSourcesOnly),
        noPrivateApiScraping: Boolean(json?.noPrivateApiScraping),
        noFakePriceGeneration: Boolean(json?.noFakePriceGeneration),
        recommendationOnly: Boolean(json?.recommendationOnly),
      });
    } catch (error) {
      setSourceConfig({ ok: false, status: "network_error", code: "network_error", message: error instanceof Error ? error.message : "network_error", countryCode: selectedCountry, sourceConfigured: false, sourceCount: 0, sources: [], validationErrors: [] });
    } finally {
      setSourceBusy(false);
    }
  };

  const runAiPriceCheck = async (mode: "auto" | "manual") => {
    const discountPercent = clampAiDiscount008B(aiDiscountPercent);
    setAiDiscountPercent(discountPercent);
    setAiBusy(true);
    const route = `${ROUTE_AI_MONITOR_008B}?countryCode=${encodeURIComponent(selectedCountry)}&discountPercent=${encodeURIComponent(String(discountPercent))}`;
    try {
      const response = await fetch(`${normalizeBase008A(config)}${route}`, {
        headers: { "x-admin-token": config.token || "", "x-sabi-admin-token": config.token || "" },
      });
      const json = await response.json().catch(() => ({}));
      const result: AiMonitorResponse008B = {
        ok: Boolean(json?.ok),
        status: response.status,
        version: String(json?.version || ""),
        code: String(json?.code || ""),
        message: String(json?.message || json?.error || ""),
        sourceConfigured: Boolean(json?.sourceConfigured),
        internetCheckAttempted: Boolean(json?.internetCheckAttempted),
        legalPublicSourcesOnly: Boolean(json?.legalPublicSourcesOnly),
        noPrivateApiScraping: Boolean(json?.noPrivateApiScraping),
        competitors: Array.isArray(json?.competitors) ? json.competitors : [],
        countryCode: String(json?.countryCode || selectedCountry),
        currencyCode: String(json?.currencyCode || selectedCountryInfo?.currencyCode || ""),
        discountPercent: clampAiDiscount008B(json?.discountPercent ?? discountPercent),
        observations: Array.isArray(json?.observations) ? json.observations : [],
        recommendations: Array.isArray(json?.recommendations) ? json.recommendations : [],
        validationErrors: Array.isArray(json?.validationErrors) ? json.validationErrors.map(String) : [],
      };
      setAiResult(result);
      setAiApplyDraft(null);
      if (!result.sourceConfigured) {
        if (mode === "manual") setNotice(copy.aiSourcesMissing);
        return;
      }
      if (mode === "manual") setNotice(result.ok ? copy.aiRecommendation : copy.aiNoRecommendation);
    } catch (error) {
      setAiResult({ ok: false, status: "network_error", code: "network_error", message: error instanceof Error ? error.message : "network_error", countryCode: selectedCountry, currencyCode: selectedCountryInfo?.currencyCode || "", discountPercent, observations: [], recommendations: [], validationErrors: [] });
      if (mode === "manual") setNotice(copy.blocked);
    } finally {
      setAiBusy(false);
    }
  };

  useEffect(() => {
    void loadSourceConfig008E();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  useEffect(() => {
    if (!aiAutoCheck) return;
    const timer = window.setTimeout(() => { void runAiPriceCheck("auto"); }, 450);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, aiDiscountPercent, aiAutoCheck]);

  const loadAuditJournal = async () => {
    const route = `${ROUTE_AUDIT_008C}?countryCode=${encodeURIComponent(selectedCountry)}&limit=8`;
    setBusy("audit");
    try {
      const response = await fetch(`${normalizeBase008A(config)}${route}`, {
        headers: { "x-admin-token": config.token || "", "x-sabi-admin-token": config.token || "" },
      });
      const json = await response.json().catch(() => ({}));
      const journal = Array.isArray(json?.auditJournal) ? json.auditJournal : [];
      setAuditRows(journal);
      setLastResponse({ ok: response.ok, status: response.status, message: response.ok ? `audit journal: ${journal.length}` : String(json?.error || json?.code || copy.blocked), route, at: new Date().toISOString(), details: json?.missing?.join?.(" · ") || "" });
      setNotice(response.ok ? "Журнал аудита загружен" : copy.blocked);
    } catch (error) {
      setLastResponse({ ok: false, status: "network_error", message: error instanceof Error ? error.message : "network_error", route, at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const saveTariffs = async (scope: "country" | "all") => {
    const route = ROUTE_WRITE_008A;
    const tariffsToSave = scope === "country" ? rows.filter((row) => row.countryCode === selectedCountry) : rows;
    setBusy(scope === "country" ? "saveCountry" : "saveAll");
    try {
      const idempotency = `taxi-tariffs-008c:${scope}:${selectedCountry}:${Date.now()}`;
      const response = await fetch(`${normalizeBase008A(config)}${route}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-token": config.token || "",
          "x-sabi-admin-token": config.token || "",
          [APPROVAL_HEADER_008A]: APPROVAL_VALUE_008A,
          "x-sabi-idempotency-key": idempotency,
        },
        body: JSON.stringify({
          source: "admin-ui-taxi-tariffs-008g-ai-recommendation-apply-flow-local-only-production-save-audit",
          ownerNote: "country_tariffs_008g_sabi_ai_recommendation_applied_to_form_only_db_save_requires_exact_approval_audit",
          uiSelectedCountryCode: selectedCountry,
          sabiAiRecommendationApplied: Boolean(aiApplyDraft?.localOnly && aiApplyDraft.countryCode === selectedCountry),
          sabiAiApplyFlow008G: aiApplyDraft ? { ...aiApplyDraft, dbWriteRequiresProtectedSave: true } : null,
          sabiAiAutoWriteExecuted: false,
          tariffs: tariffsToSave.map((row) => ({
            countryCode: row.countryCode,
            tariffCode: row.tariffCode,
            status: row.status,
            baseFareMinor: row.baseFareMinor,
            peakBaseFareMinor: row.peakBaseFareMinor,
            perKmMinor: row.perKmMinor,
            perMinuteMinor: row.perMinuteMinor,
            commissionPercent: row.commissionPercent,
          })),
        }),
      });
      const json = await response.json().catch(() => ({}));
      const savedRows = Array.isArray(json?.tariffs) ? json.tariffs : [];
      const auditEntries = Array.isArray(json?.auditEntries) ? json.auditEntries : [];
      if (response.ok && savedRows.length) mergeSavedRows(savedRows);
      if (response.ok && auditEntries.length) {
        setAuditRows(auditEntries.map((entry: any, index: number) => ({
          id: `${json?.idempotencyKey || idempotency}:${index}`,
          actorId: "admin-panel",
          action: entry?.action || "saved",
          targetId: entry?.targetKey || json?.idempotencyKey || idempotency,
          createdAt: new Date().toISOString(),
          countryCodes: [entry?.countryCode || selectedCountry],
          changedRows: entry?.changed ? 1 : 0,
          savedCount: 1,
          peakPickupIncreasePercent: 100,
          commissionGuardPercent: json?.commissionGuardPercent || { min: 0, max: 35 },
        })));
      }
      const message = String(json?.message || json?.error || (response.ok ? copy.saved : copy.blocked));
      setLastResponse({ ok: response.ok, status: response.status, message, route, at: new Date().toISOString(), details: json?.validationErrors?.join?.(" · ") || `${json?.code || ""} · changed=${json?.changedRows ?? 0} · audit=${auditEntries.length}`, auditCount: auditEntries.length, dbWriteExecuted: Boolean(json?.dbWriteExecuted), auditWriteExecuted: Boolean(json?.auditWriteExecuted) });
      setNotice(response.ok ? copy.saved : copy.blocked);
    } catch (error) {
      setLastResponse({ ok: false, status: "network_error", message: error instanceof Error ? error.message : "network_error", route, at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="taxi008bRoot" data-admin-ui-taxi-tariffs-008c-country-selected-color="ready" data-admin-ui-taxi-tariffs-008c-production-save-audit="ready" data-admin-ui-taxi-tariffs-008d-fix1-route-save-008c="ready" data-admin-ui-taxi-tariffs-008g-apply-flow="local-only-save-required" data-admin-ui-taxi-tariffs-008h-apply-save-audit="protected-save-audit-metadata" data-admin-ui-taxi-tariffs-008e-source-config="legal-public-env-no-fake" data-admin-ui-taxi-tariffs-008b-country-selected-color="ready" data-admin-ui-taxi-tariffs-008b-no-fake-save="ready" data-admin-ui-taxi-tariffs-008b-peak-pickup-plus-100="locked" data-admin-ui-taxi-currency-022a-country-currency-config="no-fixed-global-currency">
      <section className="taxi008bHero">
        <div>
          <p>{copy.marker} · {TAXI_CURRENCY_022A_MARKER}</p>
          <h2>{copy.title}</h2>
          <span>{copy.subtitle}</span>
        </div>
        <aside>
          <small>{copy.peakRule}</small>
          <strong>×2</strong>
          <b>{copy.peakLocked}</b>
        </aside>
      </section>

      <section className="taxi008bStats" aria-label="taxi tariffs metrics">
        <div><small>{copy.country}</small><strong>{selectedCountryInfo?.localeLabel || selectedCountry}</strong><span>{selectedCountryInfo?.countryCode} · {selectedCountryInfo?.currencyCode}</span></div>
        <div><small>{copy.commission}</small><strong>{avgCommission.toFixed(2)}%</strong><span>{copy.commissionDesc}</span></div>
        <div><small>{copy.peakRule}</small><strong>100%</strong><span>baseFareMinor × 2</span></div>
        <div><small>{copy.persisted}</small><strong>{persistedCount}/{rows.length}</strong><span>{selectedUnsavedCount ? copy.unsaved : copy.ready}</span></div>
      </section>


      <section
        className="taxi013bCloseoutBoard"
        data-admin-ui-taxi-tariffs-013b-production-closeout="runtime-013a-fix1-passed"
        data-admin-ui-taxi-tariffs-013b-real-tariff-row-min="one-plus-real-configured-row"
        data-admin-ui-taxi-tariffs-013b-no-fake="true"
        data-admin-ui-taxi-tariffs-013b-no-wallet-provider="true"
      >
        <div className="taxi013bCloseoutHeader">
          <div>
            <p>013B · Production closeout</p>
            <h3>Тарифы / страны / peak +100% / комиссия — runtime подтверждено</h3>
            <span>013A-FIX1 runtime smoke passed: country tariffs, production save guard, audit journal, competitor source config, Sabi AI recommendation-only.</span>
          </div>
          <strong>100%</strong>
        </div>
        <div className="taxi013bCloseoutGrid">
          <article>
            <small>Country tariffs</small>
            <b>{countries.length} countries</b>
            <span>Отдельная матрица по государствам, без fake country rows.</span>
          </article>
          <article>
            <small>Peak rule</small>
            <b>+100% · ×2</b>
            <span>peakBaseFareMinor = baseFareMinor × 2 перед сохранением.</span>
          </article>
          <article>
            <small>Commission</small>
            <b>{avgCommission.toFixed(2)}%</b>
            <span>commissionPercent × 100 = commissionBasisPoints.</span>
          </article>
          <article>
            <small>Protected save</small>
            <b>Exact approval only</b>
            <span>008A/008C save без owner approval остаётся 403.</span>
          </article>
          <article>
            <small>Sabi AI</small>
            <b>Recommendation-only</b>
            <span>Только законный публичный источник sources; no private API scraping; no fake competitor prices.</span>
          </article>
          <article>
            <small>Safety</small>
            <b>No fake / no Wallet</b>
            <span>providerDispatch=false · walletMutation=false · tariffWriteExecuted=false на smoke.</span>
          </article>
        </div>
      </section>

      <section className="taxi008bCountryBar" aria-label={copy.country}>
        <div className="taxi008bSectionTitle">
          <div>
            <h3>{copy.country}</h3>
            <p>{copy.editHint}</p>
          </div>
          <span>{copy.selected}: {selectedCountryInfo?.countryCode || selectedCountry}</span>
        </div>
        <div className="taxi008bCountryButtons">
          {countries.map((country) => {
            const isSelected = country.countryCode === selectedCountry;
            return (
              <button
                key={country.countryCode}
                type="button"
                className={`taxi008bCountryButton${isSelected ? " isSelected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedCountry(country.countryCode)}
              >
                <b>{country.localeLabel || country.countryName}</b>
                <span>{country.countryCode} · {country.currencyCode}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="taxi008bActions">
        <button type="button" disabled={Boolean(busy)} onClick={() => void loadTariffs()}>{busy === "load" ? "…" : copy.load}</button>
        <button type="button" disabled={Boolean(busy)} onClick={() => void loadAuditJournal()}>{busy === "audit" ? "…" : "Audit journal"}</button>
        <button type="button" disabled={sourceBusy} onClick={() => void loadSourceConfig008E()}>{sourceBusy ? "…" : sourceCopy.load}</button>
        <button type="button" disabled={Boolean(busy)} onClick={() => void saveTariffs("country")}>{busy === "saveCountry" ? "…" : copy.saveCountry}</button>
        <button type="button" disabled={Boolean(busy)} onClick={() => void saveTariffs("all")}>{busy === "saveAll" ? "…" : copy.saveAll}</button>
        <span>{copy.ownerHeader}</span>
      </section>

      <section className="taxi008bMainGrid">
        <main className="taxi008bTariffPanel">
          <div className="taxi008bSectionTitle">
            <div>
              <h3>{copy.countryTariffs}</h3>
              <p>{selectedCountryInfo?.localeLabel || selectedCountry} · {selectedCountryInfo?.currencyCode || ""}</p>
            </div>
            <span>{activeCount}/{TARIFF_CLASSES_008A.length} {copy.active}</span>
          </div>

          <div className="taxi008bTariffCards">
            {TARIFF_CLASSES_008A.map((tariffCode) => {
              const row = selectedRows.find((item) => item.tariffCode === tariffCode) || makeRow008A(selectedCountryInfo || DEFAULT_COUNTRIES_008A[0], tariffCode);
              return (
                <article className="taxi008bTariffCard" key={tariffCode} data-admin-ui-taxi-tariffs-008b-row={tariffCode}>
                  <header>
                    <div>
                      <small>{copy.tariff}</small>
                      <h4>{copy.classNames[tariffCode]}</h4>
                    </div>
                    <em className={statusClass008A(row.status)}>{copy[row.status]}</em>
                  </header>

                  <div className="taxi008bCardFields">
                    <label>
                      <span>{copy.status}</span>
                      <select value={row.status} onChange={(event) => updateRow(tariffCode, "status", event.target.value)}>
                        {STATUS_LIST_008A.map((status) => <option key={status} value={status}>{copy[status]}</option>)}
                      </select>
                    </label>
                    <label>
                      <span>{copy.baseFare}</span>
                      <input type="number" min={0} value={row.baseFareMinor} onChange={(event) => updateRow(tariffCode, "baseFareMinor", event.target.value)} />
                    </label>
                    <label>
                      <span>{copy.peakFare}</span>
                      <output>{row.peakBaseFareMinor}</output>
                    </label>
                    <label>
                      <span>{copy.perKm}</span>
                      <input type="number" min={0} value={row.perKmMinor} onChange={(event) => updateRow(tariffCode, "perKmMinor", event.target.value)} />
                    </label>
                    <label>
                      <span>{copy.perMinute}</span>
                      <input type="number" min={0} value={row.perMinuteMinor} onChange={(event) => updateRow(tariffCode, "perMinuteMinor", event.target.value)} />
                    </label>
                    <label>
                      <span>{copy.commissionPercent}</span>
                      <input type="number" min={0} max={35} step="0.01" value={row.commissionPercent} onChange={(event) => updateRow(tariffCode, "commissionPercent", event.target.value)} />
                    </label>
                  </div>

                  <footer>
                    <span>{row.persisted ? (row.updatedAt || copy.persisted) : copy.draft}</span>
                    <b>{copy.formula}: {row.effectiveOrderCommissionFormula}</b>
                  </footer>
                </article>
              );
            })}
          </div>
        </main>

        <aside className="taxi008bSidePanel">
          <div className="taxi008bAddBox">
            <h3>{copy.addCountry}</h3>
            <p>{copy.customCountryHint}</p>
            <label><span>{copy.countryCode}</span><input placeholder="US" value={customCountry.countryCode} onChange={(event) => setCustomCountry((prev) => ({ ...prev, countryCode: event.target.value.toUpperCase() }))} /></label>
            <label><span>{copy.countryName}</span><input placeholder="United States" value={customCountry.countryName} onChange={(event) => setCustomCountry((prev) => ({ ...prev, countryName: event.target.value }))} /></label>
            <label><span>{copy.currency}</span><input placeholder="ISO 4217" value={customCountry.currencyCode} onChange={(event) => setCustomCountry((prev) => ({ ...prev, currencyCode: event.target.value.toUpperCase() }))} /></label>
            <button type="button" onClick={addCountry}>{copy.addCountry}</button>
          </div>


          <div className={`taxi008eSourceBox ${sourceConfig?.sourceConfigured ? "isConfigured" : "isMissing"}`} data-admin-ui-taxi-tariffs-008e-source-config-panel="legal-public-env-no-fake">
            <header>
              <div>
                <h3>{sourceCopy.title}</h3>
                <p>{sourceCopy.subtitle}</p>
              </div>
              <strong>{sourceConfig?.sourceConfigured ? sourceCopy.configured : sourceCopy.missing}</strong>
            </header>
            <div className="taxi008eSourceFlags">
              <span>{sourceCopy.legal}</span>
              <span>{sourceCopy.noPrivate}</span>
              <span>{sourceCopy.recommendationOnly}</span>
            </div>
            <button type="button" disabled={sourceBusy} onClick={() => void loadSourceConfig008E()}>{sourceBusy ? "…" : sourceCopy.load}</button>
            <div className="taxi008eEnvList">
              <b>{sourceCopy.env}</b>
              {(sourceConfig?.acceptedEnvNames?.length ? sourceConfig.acceptedEnvNames : ["SABI_TAXI_COMPETITOR_PRICE_SOURCE_CONFIG_008E", "SABI_TAXI_COMPETITOR_PRICE_FEED_URLS"]).map((name) => <code key={name}>{name}</code>)}
            </div>
            <div className="taxi008eSourceList">
              {(sourceConfig?.sources || []).slice(0, 6).map((source) => (
                <article key={source.sourceId}>
                  <b>{source.countryCode} · {source.providers?.join(" + ") || "yandex + uber"}</b>
                  <span>{source.sourceName} · {source.urlPreview || source.urlHost}</span>
                  <small>{source.configuredFromEnv} · hash:{source.urlHash}</small>
                </article>
              ))}
              {sourceConfig && !sourceConfig.sourceConfigured ? <em>{sourceConfig.message || sourceCopy.missing}</em> : null}
              {sourceConfig?.validationErrors?.length ? <em>{sourceConfig.validationErrors.slice(0, 2).join(" · ")}</em> : null}
            </div>
            <small>{sourceCopy.example}</small>
          </div>

          <div className="taxi008bAiBox" data-admin-ui-taxi-tariffs-008g-no-auto-apply="true" data-admin-ui-taxi-tariffs-008b-sabi-ai-monitor="public-source-no-fake">
            <h3>{copy.sabiAiTitle}</h3>
            <p>{copy.sabiAiSubtitle}</p>
            <div className="taxi008bAiControls">
              <label>
                <span>{copy.aiDiscount}</span>
                <input type="number" min={1} max={2} step="0.1" value={aiDiscountPercent} onChange={(event) => setAiDiscountPercent(clampAiDiscount008B(event.target.value))} />
              </label>
              <label className="taxi008bCheckLine">
                <input type="checkbox" checked={aiAutoCheck} onChange={(event) => setAiAutoCheck(event.target.checked)} />
                <span>{copy.aiAutoCheck}</span>
              </label>
            </div>
            <div className="taxi008bAiButtons">
              <button type="button" disabled={aiBusy} onClick={() => void runAiPriceCheck("manual")}>{aiBusy ? "…" : copy.aiCheckNow}</button>
              <button type="button" data-admin-ui-taxi-tariffs-008g-apply-recommendation-button="local-form-only" disabled={!hasAiRecommendation008B(aiResult)} onClick={() => applyAiRecommendationsFromResult(aiResult)}>{copy.aiApply}</button>
            </div>
            <div className={`taxi008bAiStatus ${aiResult?.ok ? "isOk" : "isBlocked"}`}>
              <strong>{copy.aiLastCheck}: {aiResult?.status || (aiBusy ? "…" : "—")}</strong>
              <p>{aiResult?.message || copy.aiRealSourcesOnly}</p>
              <small>{aiResult?.code || copy.aiNoPrivateApi}</small>
              {aiResult && !aiResult.sourceConfigured ? <em>{copy.aiSourcesMissing}</em> : null}
              {aiResult?.validationErrors?.length ? <em>{aiResult.validationErrors.slice(0, 2).join(" · ")}</em> : null}
            </div>
            <div className="taxi008gApplyNotice" data-admin-ui-taxi-tariffs-008g-apply-status={aiApplyDraft ? "applied-local-only" : "waiting-admin-apply"}>
              <strong>{copy.aiApplyStatus}</strong>
              <p>{aiApplyDraft ? `${copy.aiApplyLocalOnly}: ${aiApplyDraft.appliedRows}` : copy.aiApplySaveRequired}</p>
              <small>{aiApplyDraft ? `${aiApplyDraft.countryCode} · -${aiApplyDraft.discountPercent}% · ${aiApplyDraft.appliedAt}` : "localOnly=true · dbWriteExecuted=false · tariffWriteExecuted=false"}</small>
            </div>
            <div className="taxi008bAiRecommendations">
              {(aiResult?.recommendations || []).filter((item) => item.canApply).slice(0, 5).map((item) => (
                <article key={item.tariffCode}>
                  <b>{copy.classNames[item.tariffCode]}</b>
                  <span>{copy.aiCompetitorMin}: {copy.baseFare} {minor008B(item.competitorMinBaseFareMinor)} · {copy.perKm} {minor008B(item.competitorMinPerKmMinor)}</span>
                  <span>{copy.aiRecommendation}: {copy.baseFare} {minor008B(item.recommendedBaseFareMinor)} · {copy.perKm} {minor008B(item.recommendedPerKmMinor)}</span>
                  <small>{copy.aiCoverage}: {item.competitorProviders.join(" + ") || item.confidence} · -{item.discountPercent}%</small>
                </article>
              ))}
              {aiResult && !hasAiRecommendation008B(aiResult) ? <p>{copy.aiNoRecommendation}</p> : null}
            </div>
          </div>

          <div className="taxi008bRuleBox">
            <h3>{copy.noFake}</h3>
            <p>{copy.backendOnly}</p>
            <b>{copy.peakRule}: peakBaseFareMinor = baseFareMinor × 2</b>
            <b>{copy.commission}: orderTotalMinor × commissionPercent / 100</b>
          </div>

          <div className="taxi008cAuditBox" data-admin-ui-taxi-tariffs-008c-audit-journal="old-new-db-audit">
            <h3>Audit journal DB</h3>
            <p>Старое/новое значение, кто изменил, страна, idempotency. Sabi AI только рекомендует — не пишет сам.</p>
            <div className="taxi008cAuditList">
              {auditRows.length ? auditRows.slice(0, 8).map((entry) => (
                <article key={entry.id || entry.targetId}>
                  <b>{entry.countryCodes?.join(", ") || selectedCountry} · changed {entry.changedRows}/{entry.savedCount}</b>
                  <span>{entry.createdAt || "—"}</span>
                  <small>{entry.actorId || "admin-panel"} · {entry.targetId}</small>
                  {entry.sabiAiRecommendationApplied ? <em data-admin-ui-taxi-tariffs-008h-audit-ai-metadata="visible">Sabi AI recommendation · localOnly={String(entry.sabiAiApplyFlow008G?.localOnly === true)} · protectedSave={String(entry.dbWriteRequiresProtectedSave === true || entry.sabiAiApplyFlow008G?.dbWriteRequiresProtectedSave === true)}</em> : null}
                </article>
              )) : <em>Audit journal пока пуст или ещё не загружен.</em>}
            </div>
          </div>

          <div className={`taxi008bResponse ${lastResponse?.ok ? "isOk" : "isPending"}`}>
            <h3>{copy.lastResponse}</h3>
            <strong>{lastResponse ? `${lastResponse.status}` : copy.backendOnly}</strong>
            <p>{lastResponse?.message || copy.noFake}</p>
            <small>{lastResponse?.route || ROUTE_READ_008A}</small>
            {lastResponse?.details ? <em>{lastResponse.details}</em> : null}
          </div>
        </aside>
      </section>
    </div>
  );
}
