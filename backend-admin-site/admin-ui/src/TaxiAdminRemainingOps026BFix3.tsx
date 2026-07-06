import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-remaining-ops026bfix3.css";

type Screen026B = "drivers" | "vehicles" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "management" | "access" | string;
type Props026B = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void; screen: Screen026B };
type Method026B = "GET" | "POST";
type Form026B = { market: string; region: string; currencyListText: string; currencyDraft: string; selectedCurrency: string; driverId: string; vehicleId: string; tripId: string; complaintId: string; riderId: string; rewardId: string; contestId: string; archiveQuery: string; reportDate: string; operatorId: string; roleName: string; amount: string; reason: string; replyText: string; note: string; phoneRider: string; phoneDriver: string };
type Action026B = { key: string; label: string; method: Method026B; route: (f: Form026B) => string; danger?: boolean; owner?: boolean };
type Last026B = { key: string; route: string; status: string | number; ok: boolean; body: string; at: string } | null;
type Copy026B = { restored: string; noTouch: string; currencyTitle: string; currencyHelp: string; market: string; region: string; currencyList: string; currencyDraft: string; addCurrency: string; removeCurrency: string; selectedCurrency: string; selectCurrency: string; noCurrency: string; controls: string; data: string; response: string; reason: string; note: string; amount: string; riderPhone: string; driverPhone: string; callRider: string; callDriver: string; noFake: string; ownerOnly: string; screens: Record<string, { title: string; subtitle: string; bullets: string[]; actions: string[] }> };

const MARKER026B_FIX3 = "TAXI-ADMIN-UI-026B-FIX3-READY-SCREENS-RESTORED-MULTI-CURRENCY-LIST-SELECTION";
const NON_READY_SCREENS_026B = ["drivers", "vehicles", "trips", "complaints", "balance", "rewards", "contests", "archive", "reports", "management", "access"];

const TEXT026B: Record<AdminLanguage, Copy026B> = {
  ru: {
    restored: "Заявки, заказы и тарифы восстановлены как готовые экраны. Этот блок не заменяет их.",
    noTouch: "Не трогать готовые экраны",
    currencyTitle: "Мультивалютный список и выбор валюты",
    currencyHelp: "Список валют не зафиксирован в коде. Он вводится из конфигурации рынка или загружается отдельным серверный маршрут. Оператор может добавить любую валюту для проверки рынка.",
    market: "Рынок / страна", region: "Город / регион", currencyList: "Список валют рынка", currencyDraft: "Добавить валюту", addCurrency: "Добавить", removeCurrency: "Убрать выбранную", selectedCurrency: "Выбранная валюта", selectCurrency: "Выбрать валюту", noCurrency: "Сначала добавь валюту", controls: "Действия экрана", data: "Рабочие данные", response: "Ответ сервера", reason: "Причина", note: "Заметка оператора", amount: "Сумма", riderPhone: "Телефон клиента", driverPhone: "Телефон водителя", callRider: "Позвонить клиенту", callDriver: "Позвонить водителю", noFake: "Без локального успеха: результат меняется только по ответу сервера", ownerOnly: "Требует разрешение владельца",
    screens: {
      drivers: { title: "Водители", subtitle: "Проверка профиля, документов, допуска к заказам и блокировок водителя.", bullets: ["Открыть карточку водителя", "Проверить документы", "Проверить баланс-допуск", "Подготовить блокировку через сервер"], actions: ["Открыть карточку", "Проверить документы", "Проверить допуск к заказам", "Запросить блокировку"] },
      vehicles: { title: "Авто", subtitle: "Проверка документов авто, фото, техосмотра и допуска машины к линии.", bullets: ["Открыть карточку авто", "Проверить документы", "Проверить фото", "Проверить техосмотр"], actions: ["Открыть авто", "Проверить документы", "Проверить фото", "Отправить на осмотр"] },
      trips: { title: "Поездки", subtitle: "Live контроль поездки: маршрут, ETA, безопасность, связь и закрытие спора.", bullets: ["Открыть поездку", "Проверить маршрут", "Связаться со сторонами", "Запросить safety review"], actions: ["Открыть поездку", "Проверить маршрут", "Safety review", "Закрыть review"] },
      complaints: { title: "Жалобы", subtitle: "Ответ клиенту и водителю, звонок, доказательства, решение, апелляция.", bullets: ["Ответить клиенту", "Ответить водителю", "Запросить доказательства", "Открыть апелляцию"], actions: ["Ответ клиенту", "Ответ водителю", "Запросить доказательства", "Сохранить решение", "Открыть апелляцию"] },
      balance: { title: "Баланс", subtitle: "Мультивалютный контроль баланса водителя: самостоятельное пополнение, блокировка заказа при нуле, аудит журнала.", bullets: ["Валюта выбирается из списка рынка", "Админ не пополняет баланс вручную", "Заказ блокируется при нуле", "Журнал проверяется через сервер"], actions: ["Открыть баланс", "Проверить self-topup", "Проверить контроль заказа", "Ledger audit"] },
      rewards: { title: "Бонусы", subtitle: "Проверка права на бонус, антифрод и пакет утверждения без выплаты из интерфейса.", bullets: ["Проверить eligibility", "Проверить антифрод", "Собрать пакет владельца", "Не выполнять выплату"], actions: ["Открыть кампанию", "Eligibility", "Антифрод", "Owner pack"] },
      contests: { title: "Конкурсы", subtitle: "Рейтинг, очки, античит и пакет призов без money movement.", bullets: ["Пересчитать рейтинг", "Проверить античит", "Подготовить призовой pack", "Не платить из интерфейса"], actions: ["Открыть сезон", "Пересчитать очки", "Античит", "Prize pack"] },
      archive: { title: "Архив", subtitle: "Хранилище доказательств: поиск, цепочка хранения, redaction и legal hold.", bullets: ["Найти доказательства", "Собрать пакет", "Сделать redacted export", "Поставить legal hold"], actions: ["Поиск", "Пакет доказательств", "Redacted export", "Legal hold"] },
      reports: { title: "Отчёты", subtitle: "Ежедневный AI отчёт, SLA жалоб, финансы, provider readiness и export pack.", bullets: ["Собрать daily report", "Проверить SLA", "Собрать finance summary", "Подготовить export"], actions: ["Daily report", "SLA жалоб", "Finance summary", "Provider readiness", "Export pack"] },
      management: { title: "Управление", subtitle: "Операционный центр: здоровье диспетчеризации, назначение оператора, region pause, safe broadcast.", bullets: ["Проверить dispatch health", "Назначить оператора", "Пауза региона", "Безопасная рассылка"], actions: ["Dispatch health", "Назначить оператора", "Safe broadcast", "Пауза региона"] },
      access: { title: "Доступ", subtitle: "Ролевой доступ: роли, выдача и отзыв прав, аудит, запрет доступа к секретам провайдера.", bullets: ["Открыть матрицу ролей", "Запросить grant", "Отозвать доступ", "Проверить аудит"], actions: ["Матрица ролей", "Grant request", "Revoke", "Audit"] }
    }
  },
  en: {
    restored: "Applications, orders and tariffs are restored as ready screens. This block does not replace them.", noTouch: "Do not touch ready screens", currencyTitle: "Multi-currency list and selection", currencyHelp: "The currency list is not fixed in code. It comes from market configuration or a server route. The operator may add any currency for market review.", market: "Market / country", region: "City / region", currencyList: "Market currency list", currencyDraft: "Add currency", addCurrency: "Add", removeCurrency: "Remove selected", selectedCurrency: "Selected currency", selectCurrency: "Select currency", noCurrency: "Add a currency first", controls: "Screen actions", data: "Work data", response: "Backend response", reason: "Reason", note: "Operator note", amount: "Amount", riderPhone: "Rider phone", driverPhone: "Driver phone", callRider: "Call rider", callDriver: "Call driver", noFake: "No local success: only backend response changes status", ownerOnly: "Requires final approval",
    screens: {
      drivers: { title: "Drivers", subtitle: "Driver profile, documents, order eligibility and suspension checks.", bullets: ["Open driver profile", "Review documents", "Check order eligibility", "Prepare backend suspension request"], actions: ["Open profile", "Review documents", "Check order gate", "Request suspension"] },
      vehicles: { title: "Vehicles", subtitle: "Vehicle documents, photos, inspection and line eligibility.", bullets: ["Open vehicle card", "Review documents", "Review photos", "Check inspection"], actions: ["Open vehicle", "Review documents", "Review photos", "Send to inspection"] },
      trips: { title: "Trips", subtitle: "Live trip control: route, ETA, safety, contact and dispute review.", bullets: ["Open trip", "Check route", "Contact both sides", "Request safety review"], actions: ["Open trip", "Check route", "Safety review", "Close review"] },
      complaints: { title: "Complaints", subtitle: "Reply to rider and driver, call, evidence, decision and appeal.", bullets: ["Reply to rider", "Reply to driver", "Request evidence", "Open appeal"], actions: ["Reply rider", "Reply driver", "Request evidence", "Save decision", "Open appeal"] },
      balance: { title: "Balance", subtitle: "Multi-currency driver balance control: self-topup, zero-balance order gate, ledger audit.", bullets: ["Currency is selected from market list", "Admin cannot top up manually", "Orders are blocked at zero", "Ledger is checked by backend"], actions: ["Open balance", "Check self-topup", "Check order gate", "Ledger audit"] },
      rewards: { title: "Rewards", subtitle: "Eligibility, fraud review and approval pack without UI payout.", bullets: ["Check eligibility", "Check fraud risk", "Build owner pack", "Do not pay from UI"], actions: ["Open campaign", "Eligibility", "Fraud review", "Owner pack"] },
      contests: { title: "Contests", subtitle: "Leaderboard, points, anti-cheat and prize pack without money movement.", bullets: ["Recalculate rank", "Run anti-cheat", "Prepare prize pack", "Do not pay from UI"], actions: ["Open season", "Recalculate", "Anti-cheat", "Prize pack"] },
      archive: { title: "Archive", subtitle: "Evidence vault: search, custody chain, redaction and legal hold.", bullets: ["Find evidence", "Build package", "Create redacted export", "Set legal hold"], actions: ["Search", "Evidence package", "Redacted export", "Legal hold"] },
      reports: { title: "Reports", subtitle: "Daily AI report, complaint SLA, finance summary, provider readiness and export pack.", bullets: ["Build daily report", "Check SLA", "Build finance summary", "Prepare export"], actions: ["Daily report", "Complaint SLA", "Finance summary", "Provider readiness", "Export pack"] },
      management: { title: "Management", subtitle: "Operations center: dispatch health, operator assignment, region pause, safe broadcast.", bullets: ["Check dispatch health", "Assign operator", "Pause region", "Send safe broadcast"], actions: ["Dispatch health", "Assign operator", "Safe broadcast", "Pause region"] },
      access: { title: "Access", subtitle: "RBAC: roles, grant/revoke, audit and provider secret access blocked.", bullets: ["Open role matrix", "Request grant", "Revoke access", "Check audit"], actions: ["Role matrix", "Grant request", "Revoke", "Audit"] }
    }
  },
  uz: {
    restored: "Arizalar, buyurtmalar va tariflar tayyor ekran sifatida qaytarildi. Bu blok ularni almashtirmaydi.", noTouch: "Tayyor ekranlarga tegmaslik", currencyTitle: "Ko‘p valyuta ro‘yxati va tanlash", currencyHelp: "Valyuta ro‘yxati kodda qotirilmagan. U bozor sozlamasidan yoki server yo‘lidan olinadi. Operator tekshiruv uchun istalgan valyutani qo‘sha oladi.", market: "Bozor / mamlakat", region: "Shahar / hudud", currencyList: "Bozor valyutalari ro‘yxati", currencyDraft: "Valyuta qo‘shish", addCurrency: "Qo‘shish", removeCurrency: "Tanlanganni olib tashlash", selectedCurrency: "Tanlangan valyuta", selectCurrency: "Valyutani tanlash", noCurrency: "Avval valyuta qo‘shing", controls: "Ekran amallari", data: "Ish ma’lumotlari", response: "Server javobi", reason: "Sabab", note: "Operator eslatmasi", amount: "Miqdor", riderPhone: "Mijoz telefoni", driverPhone: "Haydovchi telefoni", callRider: "Mijozga qo‘ng‘iroq", callDriver: "Haydovchiga qo‘ng‘iroq", noFake: "Mahalliy soxta muvaffaqiyat yo‘q: holat faqat server javobi bilan o‘zgaradi", ownerOnly: "Egasi ruxsati kerak",
    screens: {
      drivers: { title: "Haydovchilar", subtitle: "Haydovchi profili, hujjatlari, buyurtma ruxsati va bloklash tekshiruvi.", bullets: ["Haydovchi kartasini ochish", "Hujjatlarni tekshirish", "Buyurtma ruxsatini tekshirish", "Bloklash so‘rovini tayyorlash"], actions: ["Kartani ochish", "Hujjatlarni tekshirish", "Ruxsatni tekshirish", "Bloklash so‘rovi"] },
      vehicles: { title: "Avto", subtitle: "Avto hujjatlari, rasmlari, ko‘rik va liniyaga ruxsat.", bullets: ["Avto kartasini ochish", "Hujjatlarni tekshirish", "Rasmlarni tekshirish", "Ko‘rikni tekshirish"], actions: ["Avtoni ochish", "Hujjatlar", "Rasmlar", "Ko‘rikka yuborish"] },
      trips: { title: "Safarlar", subtitle: "Safar nazorati: yo‘nalish, vaqt, xavfsizlik, aloqa va nizo ko‘rigi.", bullets: ["Safarni ochish", "Yo‘nalishni tekshirish", "Tomonlar bilan aloqa", "Xavfsizlik ko‘rigi"], actions: ["Safarni ochish", "Yo‘nalish", "Xavfsizlik", "Ko‘rikni yopish"] },
      complaints: { title: "Shikoyatlar", subtitle: "Mijoz va haydovchiga javob, qo‘ng‘iroq, dalil, qaror va apellyatsiya.", bullets: ["Mijozga javob", "Haydovchiga javob", "Dalil so‘rash", "Apellyatsiya ochish"], actions: ["Mijozga javob", "Haydovchiga javob", "Dalil so‘rash", "Qarorni saqlash", "Apellyatsiya ochish"] },
      balance: { title: "Balans", subtitle: "Ko‘p valyutali haydovchi balansi: mustaqil to‘ldirish, nol balansda buyurtma to‘sig‘i, daftar tekshiruvi.", bullets: ["Valyuta bozor ro‘yxatidan tanlanadi", "Admin qo‘lda to‘ldirmaydi", "Nolda buyurtma to‘siladi", "Daftar server orqali tekshiriladi"], actions: ["Balansni ochish", "To‘ldirish holati", "Buyurtma to‘sig‘i", "Daftar tekshiruvi"] },
      rewards: { title: "Bonuslar", subtitle: "Huquq, firibgarlik tekshiruvi va to‘lovsiz tasdiq paketi.", bullets: ["Huquqni tekshirish", "Xatarni tekshirish", "Tasdiq paketini tuzish", "Interfeys orqali to‘lamaslik"], actions: ["Kampaniyani ochish", "Huquq", "Xatar", "Tasdiq paketi"] },
      contests: { title: "Tanlovlar", subtitle: "Reyting, ballar, aldashga qarshi tekshiruv va pul harakatisiz sovrin paketi.", bullets: ["Reytingni qayta hisoblash", "Aldashni tekshirish", "Sovrin paketini tayyorlash", "Interfeys orqali to‘lamaslik"], actions: ["Mavsumni ochish", "Qayta hisoblash", "Aldash tekshiruvi", "Sovrin paketi"] },
      archive: { title: "Arxiv", subtitle: "Dalillar ombori: qidiruv, saqlash zanjiri, yashirish va huquqiy ushlab turish.", bullets: ["Dalil topish", "Paket tuzish", "Yashirilgan eksport", "Huquqiy ushlab turish"], actions: ["Qidiruv", "Dalil paketi", "Yashirilgan eksport", "Ushlab turish"] },
      reports: { title: "Hisobotlar", subtitle: "Kunlik aqlli hisobot, shikoyat muddati, moliya xulosasi, provayder tayyorligi va eksport.", bullets: ["Kunlik hisobot", "Muddatni tekshirish", "Moliya xulosasi", "Eksport tayyorlash"], actions: ["Kunlik hisobot", "Shikoyat muddati", "Moliya xulosasi", "Provayder tayyorligi", "Eksport"] },
      management: { title: "Boshqaruv", subtitle: "Operatsion markaz: buyurtma tarqatish holati, operator biriktirish, hudud pauzasi, xavfsiz xabar.", bullets: ["Tarqatish holatini tekshirish", "Operator biriktirish", "Hudud pauzasi", "Xavfsiz xabar"], actions: ["Tarqatish holati", "Operator", "Xavfsiz xabar", "Hudud pauzasi"] },
      access: { title: "Kirish", subtitle: "Rollar, ruxsat so‘rovi, ruxsatni olish, tekshiruv va provayder maxfiylariga kirishni bloklash.", bullets: ["Rollar jadvali", "Ruxsat so‘rovi", "Ruxsatni olish", "Tekshiruv"], actions: ["Rollar", "Ruxsat so‘rovi", "Olib tashlash", "Tekshiruv"] }
    }
  },
  zh: {
    restored: "申请、订单和费率已恢复为原来的完成页面。此模块不会替换它们。", noTouch: "不要改动已完成页面", currencyTitle: "多币种列表和选择", currencyHelp: "币种列表不固定在代码里。列表来自市场配置或服务端接口。操作员可为市场检查添加任意币种。", market: "市场 / 国家", region: "城市 / 区域", currencyList: "市场币种列表", currencyDraft: "添加币种", addCurrency: "添加", removeCurrency: "移除所选", selectedCurrency: "已选币种", selectCurrency: "选择币种", noCurrency: "请先添加币种", controls: "页面操作", data: "工作数据", response: "服务端响应", reason: "原因", note: "操作员备注", amount: "金额", riderPhone: "客户电话", driverPhone: "司机电话", callRider: "呼叫客户", callDriver: "呼叫司机", noFake: "无本地假成功：状态只由服务端响应改变", ownerOnly: "需要所有者批准",
    screens: {
      drivers: { title: "司机", subtitle: "司机资料、文件、接单资格和停单检查。", bullets: ["打开司机卡片", "检查文件", "检查接单资格", "准备停单请求"], actions: ["打开卡片", "检查文件", "检查资格", "停单请求"] },
      vehicles: { title: "车辆", subtitle: "车辆文件、照片、检查和上线资格。", bullets: ["打开车辆卡片", "检查文件", "检查照片", "检查车辆状态"], actions: ["打开车辆", "检查文件", "检查照片", "送检"] },
      trips: { title: "行程", subtitle: "行程控制：路线、时间、安全、联系和争议检查。", bullets: ["打开行程", "检查路线", "联系双方", "请求安全检查"], actions: ["打开行程", "检查路线", "安全检查", "关闭检查"] },
      complaints: { title: "投诉", subtitle: "回复客户和司机、电话联系、证据、决定和申诉。", bullets: ["回复客户", "回复司机", "要求证据", "打开申诉"], actions: ["回复客户", "回复司机", "要求证据", "保存决定", "打开申诉"] },
      balance: { title: "余额", subtitle: "多币种司机余额控制：自行充值、零余额接单拦截、账本审计。", bullets: ["币种从市场列表选择", "管理员不能手动充值", "余额为零时拦截订单", "账本由服务端检查"], actions: ["打开余额", "检查自行充值", "检查接单拦截", "账本审计"] },
      rewards: { title: "奖励", subtitle: "资格、风险检查和批准包，不在页面付款。", bullets: ["检查资格", "检查风险", "生成批准包", "不从页面付款"], actions: ["打开活动", "资格", "风险检查", "批准包"] },
      contests: { title: "竞赛", subtitle: "排行榜、积分、反作弊和奖品包，无资金动作。", bullets: ["重算排名", "检查作弊", "准备奖品包", "不从页面付款"], actions: ["打开赛季", "重算", "反作弊", "奖品包"] },
      archive: { title: "归档", subtitle: "证据库：搜索、保管链、脱敏导出和法律保留。", bullets: ["查找证据", "生成包", "脱敏导出", "法律保留"], actions: ["搜索", "证据包", "脱敏导出", "法律保留"] },
      reports: { title: "报告", subtitle: "每日智能报告、投诉时限、财务摘要、服务商准备度和导出包。", bullets: ["生成日报", "检查时限", "生成财务摘要", "准备导出"], actions: ["日报", "投诉时限", "财务摘要", "服务商准备度", "导出包"] },
      management: { title: "管理", subtitle: "运营中心：派单健康、分配操作员、区域暂停、安全通知。", bullets: ["检查派单健康", "分配操作员", "暂停区域", "发送安全通知"], actions: ["派单健康", "分配操作员", "安全通知", "区域暂停"] },
      access: { title: "权限", subtitle: "角色、授权、撤销、审计，并阻止服务商密钥访问。", bullets: ["打开角色矩阵", "请求授权", "撤销权限", "检查审计"], actions: ["角色矩阵", "授权请求", "撤销", "审计"] }
    }
  }
};

const initialForm026B: Form026B = { market: "", region: "", currencyListText: "", currencyDraft: "", selectedCurrency: "", driverId: "taxi_driver_001", vehicleId: "taxi_vehicle_001", tripId: "taxi_trip_001", complaintId: "taxi_complaint_001", riderId: "taxi_rider_001", rewardId: "taxi_reward_001", contestId: "taxi_contest_001", archiveQuery: "taxi_trip_001 taxi_complaint_001", reportDate: new Date().toISOString().slice(0, 10), operatorId: "taxi_operator_001", roleName: "taxi_manager", amount: "0", reason: "", replyText: "", note: "", phoneRider: "+", phoneDriver: "+" };

function baseUrl026B(config: AdminApiConfig): string { return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, ""); }
function headers026B(config: AdminApiConfig): Record<string, string> { return { "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" }; }
function enc026B(value: string): string { return encodeURIComponent(value || "missing"); }
function normalizeCurrencyCode026B(value: string): string { return value.trim().toUpperCase().replace(/[^A-Z0-9_\-.]/g, "").slice(0, 24); }
function parseCurrencyList026B(text: string): string[] { return Array.from(new Set(text.split(/[\s,;|]+/).map(normalizeCurrencyCode026B).filter(Boolean))); }
function withCurrencyList026B(list: string[], next: string): string { return Array.from(new Set([...list, next].filter(Boolean))).join(", "); }

function actionRoutes026B(screen: string, labels: string[]): Action026B[] {
  const [a,b,c,d,e] = labels;
  const route = {
    drivers: [`/api/admin/taxi/drivers`, `/documents-review`, `/balance-order-gate`, `/order-suspension-request`],
    vehicles: [`/api/admin/taxi/vehicles`, `/documents-review`, `/photos-review`, `/inspection-review`],
    trips: [`/api/admin/taxi/trips`, `/route-review`, `/safety-review`, `/close-review`],
    complaints: [`/api/admin/taxi/complaints`, `/reply-rider`, `/reply-driver`, `/evidence-request`, `/decision`, `/appeal-open`],
    balance: [`/api/admin/taxi/balance/drivers`, `/self-topup-status`, `/order-gate-check`, `/ledger-audit-export`],
    rewards: [`/api/admin/taxi/rewards/campaigns`, `/eligibility-check`, `/fraud-review`, `/owner-approval-pack`],
    contests: [`/api/admin/taxi/contests`, `/recalculate`, `/anti-cheat-review`, `/prize-approval-pack`],
    archive: [`/api/admin/taxi/archive/search`, `/api/admin/taxi/archive/package`, `/api/admin/taxi/archive/redacted-export`, `/api/admin/taxi/archive/legal-hold`],
    reports: [`/api/admin/taxi/reports/daily-ai`, `/api/admin/taxi/reports/complaints-sla`, `/api/admin/taxi/reports/finance-summary`, `/api/admin/taxi/reports/provider-readiness`, `/api/admin/taxi/reports/export-package`],
    management: [`/api/admin/taxi/management/route-health`, `/api/admin/taxi/management/assign-operator`, `/api/admin/taxi/management/safe-broadcast`, `/api/admin/taxi/management/pause-region-dispatch`],
    access: [`/api/admin/taxi/access/role-matrix`, `/api/admin/taxi/access/grant-request`, `/api/admin/taxi/access/revoke`, `/api/admin/taxi/access/audit`],
  } as const;
  if (screen === "drivers") return [{key:"open",label:a,method:"GET",route:f=>`${route.drivers[0]}/${enc026B(f.driverId)}`},{key:"docs",label:b,method:"POST",route:f=>`${route.drivers[0]}/${enc026B(f.driverId)}${route.drivers[1]}`},{key:"gate",label:c,method:"POST",route:f=>`${route.drivers[0]}/${enc026B(f.driverId)}${route.drivers[2]}`},{key:"suspend",label:d,method:"POST",route:f=>`${route.drivers[0]}/${enc026B(f.driverId)}${route.drivers[3]}`,danger:true,owner:true}];
  if (screen === "vehicles") return [{key:"open",label:a,method:"GET",route:f=>`${route.vehicles[0]}/${enc026B(f.vehicleId)}`},{key:"docs",label:b,method:"POST",route:f=>`${route.vehicles[0]}/${enc026B(f.vehicleId)}${route.vehicles[1]}`},{key:"photos",label:c,method:"POST",route:f=>`${route.vehicles[0]}/${enc026B(f.vehicleId)}${route.vehicles[2]}`},{key:"inspection",label:d,method:"POST",route:f=>`${route.vehicles[0]}/${enc026B(f.vehicleId)}${route.vehicles[3]}`}];
  if (screen === "trips") return [{key:"open",label:a,method:"GET",route:f=>`${route.trips[0]}/${enc026B(f.tripId)}`},{key:"route",label:b,method:"POST",route:f=>`${route.trips[0]}/${enc026B(f.tripId)}${route.trips[1]}`},{key:"safety",label:c,method:"POST",route:f=>`${route.trips[0]}/${enc026B(f.tripId)}${route.trips[2]}`},{key:"close",label:d,method:"POST",route:f=>`${route.trips[0]}/${enc026B(f.tripId)}${route.trips[3]}`}];
  if (screen === "complaints") return [{key:"open",label:a,method:"GET",route:f=>`${route.complaints[0]}/${enc026B(f.complaintId)}`},{key:"reply-rider",label:b,method:"POST",route:f=>`${route.complaints[0]}/${enc026B(f.complaintId)}${route.complaints[1]}`},{key:"reply-driver",label:c,method:"POST",route:f=>`${route.complaints[0]}/${enc026B(f.complaintId)}${route.complaints[2]}`},{key:"evidence",label:d,method:"POST",route:f=>`${route.complaints[0]}/${enc026B(f.complaintId)}${route.complaints[3]}`},{key:"decision",label:e,method:"POST",route:f=>`${route.complaints[0]}/${enc026B(f.complaintId)}${route.complaints[4]}`}];
  if (screen === "balance") return [{key:"open",label:a,method:"GET",route:f=>`${route.balance[0]}/${enc026B(f.driverId)}?market=${enc026B(f.market)}&currency=${enc026B(f.selectedCurrency)}`},{key:"topup",label:b,method:"GET",route:f=>`${route.balance[0]}/${enc026B(f.driverId)}${route.balance[1]}?market=${enc026B(f.market)}&currency=${enc026B(f.selectedCurrency)}`},{key:"gate",label:c,method:"POST",route:f=>`${route.balance[0]}/${enc026B(f.driverId)}${route.balance[2]}`},{key:"ledger",label:d,method:"POST",route:f=>`${route.balance[0]}/${enc026B(f.driverId)}${route.balance[3]}`}];
  if (screen === "rewards") return [{key:"open",label:a,method:"GET",route:f=>`${route.rewards[0]}/${enc026B(f.rewardId)}?market=${enc026B(f.market)}&currency=${enc026B(f.selectedCurrency)}`},{key:"eligibility",label:b,method:"POST",route:()=>`/api/admin/taxi/rewards${route.rewards[1]}`},{key:"fraud",label:c,method:"POST",route:()=>`/api/admin/taxi/rewards${route.rewards[2]}`},{key:"owner",label:d,method:"POST",route:()=>`/api/admin/taxi/rewards${route.rewards[3]}`,owner:true}];
  if (screen === "contests") return [{key:"open",label:a,method:"GET",route:f=>`${route.contests[0]}/${enc026B(f.contestId)}?market=${enc026B(f.market)}&currency=${enc026B(f.selectedCurrency)}`},{key:"recalc",label:b,method:"POST",route:()=>`/api/admin/taxi/contests${route.contests[1]}`},{key:"anticheat",label:c,method:"POST",route:()=>`/api/admin/taxi/contests${route.contests[2]}`},{key:"prize",label:d,method:"POST",route:()=>`/api/admin/taxi/contests${route.contests[3]}`,owner:true}];
  if (screen === "archive") return [{key:"search",label:a,method:"POST",route:()=>route.archive[0]},{key:"package",label:b,method:"POST",route:()=>route.archive[1]},{key:"redact",label:c,method:"POST",route:()=>route.archive[2]},{key:"hold",label:d,method:"POST",route:()=>route.archive[3],danger:true,owner:true}];
  if (screen === "reports") return [{key:"daily",label:a,method:"POST",route:()=>route.reports[0]},{key:"sla",label:b,method:"POST",route:()=>route.reports[1]},{key:"finance",label:c,method:"POST",route:()=>route.reports[2]},{key:"provider",label:d,method:"POST",route:()=>route.reports[3]},{key:"export",label:e,method:"POST",route:()=>route.reports[4]}];
  if (screen === "management") return [{key:"health",label:a,method:"GET",route:()=>route.management[0]},{key:"assign",label:b,method:"POST",route:()=>route.management[1]},{key:"broadcast",label:c,method:"POST",route:()=>route.management[2]},{key:"pause",label:d,method:"POST",route:()=>route.management[3],danger:true,owner:true}];
  return [{key:"matrix",label:a,method:"GET",route:()=>route.access[0]},{key:"grant",label:b,method:"POST",route:()=>route.access[1],owner:true},{key:"revoke",label:c,method:"POST",route:()=>route.access[2],danger:true,owner:true},{key:"audit",label:d,method:"POST",route:()=>route.access[3]}];
}

function Field026B({ label, value, onChange, area }: { label: string; value: string; onChange: (value: string) => void; area?: boolean }) {
  return <label className="ops026bField"><span>{label}</span>{area ? <textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

export function TaxiAdminRemainingOps026BFix3({ language, config, setNotice, screen }: Props026B) {
  const text = TEXT026B[language] || TEXT026B.ru;
  const safeScreen = NON_READY_SCREENS_026B.includes(screen) ? screen : "drivers";
  const copy = text.screens[safeScreen] || text.screens.drivers;
  const [form, setForm] = useState<Form026B>(initialForm026B);
  const [busy, setBusy] = useState("");
  const [last, setLast] = useState<Last026B>(null);
  const currencyItems = useMemo(() => parseCurrencyList026B(form.currencyListText), [form.currencyListText]);
  const selectedCurrency = currencyItems.includes(form.selectedCurrency) ? form.selectedCurrency : "";
  const patch = (key: keyof Form026B, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const addCurrency = () => {
    const next = normalizeCurrencyCode026B(form.currencyDraft);
    if (!next) return;
    const nextText = withCurrencyList026B(currencyItems, next);
    setForm((prev) => ({ ...prev, currencyListText: nextText, selectedCurrency: next, currencyDraft: "" }));
  };
  const removeSelected = () => {
    const nextText = currencyItems.filter((item) => item !== selectedCurrency).join(", ");
    setForm((prev) => ({ ...prev, currencyListText: nextText, selectedCurrency: "" }));
  };
  const run = async (action: Action026B) => {
    const route = action.route({ ...form, selectedCurrency });
    setBusy(action.key);
    try {
      const body = {
        marker: MARKER026B_FIX3,
        screen: safeScreen,
        action: action.key,
        market: form.market,
        region: form.region,
        currencyCode: selectedCurrency,
        marketCurrencyList: currencyItems,
        amount: form.amount,
        driverId: form.driverId,
        vehicleId: form.vehicleId,
        tripId: form.tripId,
        complaintId: form.complaintId,
        riderId: form.riderId,
        reason: form.reason,
        replyText: form.replyText,
        operatorNote: form.note,
        noFakeSuccess: true,
        noProviderCallFromUi: true,
        noWalletMutationFromUi: true,
        noMoneyMovementFromUi: true,
      };
      const response = await fetch(`${baseUrl026B(config)}${route}`, { method: action.method, headers: headers026B(config), body: action.method === "POST" ? JSON.stringify(body) : undefined });
      const payload = await response.text();
      setLast({ key: action.key, route, status: response.status, ok: response.ok, body: payload.slice(0, 700), at: new Date().toISOString() });
      setNotice(`${response.status} · ${route}`);
    } catch (error) {
      setLast({ key: action.key, route, status: "network_error", ok: false, body: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice("network_error");
    } finally {
      setBusy("");
    }
  };
  const actions = actionRoutes026B(safeScreen, copy.actions);
  return (
    <div className={`ops026b ops026b-${safeScreen}`} data-taxi-admin-026b-fix3-remaining-screen={safeScreen} data-ready-screens-restored="applications-orders-tariffs" data-no-fixed-currency-whitelist="true">
      <div className="ops026bHead">
        <div><span>{MARKER026B_FIX3}</span><h2>{copy.title}</h2><p>{copy.subtitle}</p><small>{text.restored}</small></div>
        <strong>{text.noTouch}</strong>
      </div>
      <div className="ops026bGrid">
        <section className="ops026bCard ops026bCurrency" data-multi-currency-list-selection="true">
          <h3>{text.currencyTitle}</h3><p>{text.currencyHelp}</p>
          <Field026B label={text.market} value={form.market} onChange={(value) => patch("market", value)} />
          <Field026B label={text.region} value={form.region} onChange={(value) => patch("region", value)} />
          <Field026B label={text.currencyList} value={form.currencyListText} onChange={(value) => patch("currencyListText", value)} area />
          <label className="ops026bField"><span>{text.selectedCurrency}</span><select value={selectedCurrency} onChange={(event) => patch("selectedCurrency", event.target.value)} data-currency-select="dynamic-multi-currency-list"><option value="">{text.selectCurrency}</option>{currencyItems.map((currency) => <option key={currency} value={currency}>{currency}</option>)}</select></label>
          <div className="ops026bCurrencyAdd"><Field026B label={text.currencyDraft} value={form.currencyDraft} onChange={(value) => patch("currencyDraft", value)} /><button type="button" onClick={addCurrency}>{text.addCurrency}</button><button type="button" onClick={removeSelected} disabled={!selectedCurrency}>{text.removeCurrency}</button></div>
        </section>
        <section className="ops026bCard"><h3>{text.data}</h3><div className="ops026bFields"><Field026B label="ID" value={safeScreen === "vehicles" ? form.vehicleId : safeScreen === "trips" ? form.tripId : safeScreen === "complaints" ? form.complaintId : safeScreen === "access" ? form.roleName : form.driverId} onChange={(value) => safeScreen === "vehicles" ? patch("vehicleId", value) : safeScreen === "trips" ? patch("tripId", value) : safeScreen === "complaints" ? patch("complaintId", value) : safeScreen === "access" ? patch("roleName", value) : patch("driverId", value)} /><Field026B label={text.amount} value={form.amount} onChange={(value) => patch("amount", value)} /><Field026B label={text.reason} value={form.reason} onChange={(value) => patch("reason", value)} area /><Field026B label={text.note} value={form.note} onChange={(value) => patch("note", value)} area /></div></section>
        <section className="ops026bCard ops026bRules"><h3>{text.controls}</h3>{copy.bullets.map((item) => <p key={item}>• {item}</p>)}<p className="ops026bNoFake">{text.noFake}</p></section>
        <section className="ops026bCard ops026bActions"><h3>{text.controls}</h3>{actions.map((action) => <button key={action.key} type="button" className={`${action.danger ? "danger" : ""} ${action.owner ? "owner" : ""}`} disabled={busy === action.key} onClick={() => void run(action)}>{busy === action.key ? "…" : action.label}{action.owner ? ` · ${text.ownerOnly}` : ""}</button>)}{safeScreen === "complaints" || safeScreen === "trips" ? <div className="ops026bContact"><Field026B label={text.riderPhone} value={form.phoneRider} onChange={(value) => patch("phoneRider", value)} /><Field026B label={text.driverPhone} value={form.phoneDriver} onChange={(value) => patch("phoneDriver", value)} /><a href={`tel:${form.phoneRider}`}>{text.callRider}</a><a href={`tel:${form.phoneDriver}`}>{text.callDriver}</a><Field026B label={copy.actions[0]} value={form.replyText} onChange={(value) => patch("replyText", value)} area /></div> : null}</section>
      </div>
      <div className="ops026bResponse"><strong>{text.response}</strong><span>{last ? `${last.status} · ${last.key}` : text.noFake}</span><code>{last?.route || "—"}</code><small>{last?.body || ""}</small></div>
    </div>
  );
}
