import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-trip-professional036a.css";

export type TaxiAdminRemainingTab026D = "drivers" | "vehicles" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "management" | "access";

type Props026D = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void; activeTab: TaxiAdminRemainingTab026D };
type LastResponse026D = { route: string; status: number | string; ok: boolean; message: string; at: string } | null;
type CurrencyRow026D = { code: string; label: string; source: "server" | "operator" };

type Copy026D = {
  serverOnly: string; noFake: string; blockedMoney: string; route: string; send: string; response: string; required: string; note: string; currencyTitle: string; addCurrency: string; activeCurrency: string; market: string; operator: string;
  drivers: Record<string, string>; vehicles: Record<string, string>; trips: Record<string, string>; complaints: Record<string, string>; balance: Record<string, string>; rewards: Record<string, string>; contests: Record<string, string>; archive: Record<string, string>; reports: Record<string, string>; management: Record<string, string>; access: Record<string, string>;
};

const MARKER026D = "TAXI-ADMIN-UI-026D-READY-SCREENS-PROTECTED-REMAINING-UNIQUE-FUNCTIONS-NO-FAKE";
const ROUTE026D: Record<TaxiAdminRemainingTab026D, string> = {
  drivers: "/api/admin/taxi/drivers/026d/review-command",
  vehicles: "/api/admin/taxi/vehicles/026d/inspection-command",
  trips: "/api/admin/taxi/trips/026d/live-command",
  complaints: "/api/admin/taxi/complaints/026d/reply-contact-decision",
  balance: "/api/admin/taxi/balance/026d/gate-audit-command",
  rewards: "/api/admin/taxi/rewards/026d/approval-pack",
  contests: "/api/admin/taxi/contests/026d/anti-cheat-prize-pack",
  archive: "/api/admin/taxi/archive/026d/evidence-vault-command",
  reports: "/api/admin/taxi/reports/026d/daily-export-command",
  management: "/api/admin/taxi/management/026d/operations-control-command",
  access: "/api/admin/taxi/access/026d/rbac-command",
};

const COPY026D: Record<AdminLanguage, Copy026D> = {
  ru: {
    serverOnly: "Только ответ сервера", noFake: "Без локального успеха", blockedMoney: "Деньги, кошелёк и провайдер заблокированы", route: "Маршрут API", send: "Отправить команду", response: "Ответ сервера", required: "Обязательно", note: "Заметка оператора", currencyTitle: "Мультивалютный список рынка", addCurrency: "Добавить валюту", activeCurrency: "Активная валюта", market: "Рынок / страна", operator: "Оператор",
    drivers: { title: "Водители: проверка и допуск", lead: "Отдельный экран для водителей: документы, статус, рейтинг, блок допуска к заказам.", id: "Номер водителя", status: "Статус проверки", risk: "Риск", action: "Запросить повторную проверку", panel1: "Досье водителя", panel2: "Контроль допуска", panel3: "Связь и замечания" },
    vehicles: { title: "Авто: осмотр и документы", lead: "Отдельный экран для машины: фото кузова, салона, документы, срок осмотра.", id: "Номер авто", plate: "Госномер", inspection: "Результат осмотра", action: "Отправить на повторный осмотр", panel1: "Карточка авто", panel2: "Фото и повреждения", panel3: "Документы" },
    trips: { title: "Поездки: live control", lead: "Отдельный экран поездки: маршрут, ETA, связь, безопасность, закрытие спора.", id: "Номер поездки", rider: "Клиент", driver: "Водитель", action: "Запросить статус поездки", panel1: "Маршрут и ETA", panel2: "Связь", panel3: "Безопасность" },
    complaints: { title: "Жалобы: ответ, связь, решение", lead: "Отдельный экран жалобы: ответ клиенту и водителю, звонок, доказательства, решение, апелляция.", id: "Номер жалобы", replyRider: "Ответ клиенту", replyDriver: "Ответ водителю", decision: "Решение", action: "Отправить ответ и решение", panel1: "Текст ответа", panel2: "Связаться", panel3: "Доказательства и апелляция" },
    balance: { title: "Баланс: контроль и аудит", lead: "Отдельный экран баланса: мультивалюта, проверка допуска к заказам, запрет ручного пополнения админом.", id: "Номер водителя", amount: "Минимальный баланс", action: "Проверить контроль баланса", panel1: "Мультивалюта", panel2: "Блок заказов", panel3: "Аудит ledger" },
    rewards: { title: "Бонусы: право участия и утверждение", lead: "Отдельный экран бонусов: право на бонус, fraud check, пакет на утверждение владельцу, без выплаты.", id: "Номер кампании", amount: "Сумма бонуса", action: "Собрать пакет утверждения", panel1: "Право на бонус", panel2: "Fraud review", panel3: "Owner approval" },
    contests: { title: "Конкурсы: рейтинг и античит", lead: "Отдельный экран конкурса: таблица лидеров, правила очков, античит, призовой пакет.", id: "Номер конкурса", amount: "Призовой фонд", action: "Проверить античит", panel1: "Leaderboard", panel2: "Правила очков", panel3: "Призы" },
    archive: { title: "Архив: evidence vault", lead: "Отдельный экран архива: цепочка хранения, редактированный экспорт, юридическое удержание.", id: "Номер архива", amount: "Срок хранения", action: "Подготовить редактированный экспорт", panel1: "Доказательства", panel2: "Legal hold", panel3: "Экспорт" },
    reports: { title: "Отчёты: ежедневный контроль", lead: "Отдельный экран отчётов: ежедневный отчёт ИИ, сроки жалоб, финансы, готовность.", id: "Дата отчёта", amount: "Период", action: "Собрать отчёт", panel1: "Daily AI", panel2: "SLA жалоб", panel3: "Экспорт" },
    management: { title: "Управление: operations room", lead: "Отдельный экран управления: здоровье диспетчеризации, регионы, назначение оператора, безопасная рассылка.", id: "Регион", amount: "Лимит нагрузки", action: "Применить операционную команду", panel1: "Диспетчеризация", panel2: "Операторы", panel3: "Рассылка" },
    access: { title: "Доступ: роли и аудит", lead: "Отдельный экран доступа: ролевая матрица, выдача и отзыв прав, аудит; секреты провайдера заблокированы.", id: "Номер сотрудника", amount: "Уровень доступа", action: "Отправить RBAC команду", panel1: "Матрица ролей", panel2: "Grant / revoke", panel3: "Audit" },
  },
  en: {
    serverOnly: "Server response only", noFake: "No local success", blockedMoney: "Money, wallet and provider are blocked", route: "API route", send: "Send command", response: "Server response", required: "Required", note: "Operator note", currencyTitle: "Multi-currency market list", addCurrency: "Add currency", activeCurrency: "Active currency", market: "Market / country", operator: "Operator",
    drivers: { title: "Drivers: verification and admission", lead: "Dedicated driver screen: documents, status, rating, order admission gate.", id: "Driver ID", status: "Verification status", risk: "Risk", action: "Request re-check", panel1: "Driver dossier", panel2: "Admission control", panel3: "Contact and notes" },
    vehicles: { title: "Vehicles: inspection and documents", lead: "Dedicated vehicle screen: body photos, cabin photos, documents, inspection expiry.", id: "Vehicle ID", plate: "Plate", inspection: "Inspection result", action: "Send to re-inspection", panel1: "Vehicle card", panel2: "Photos and damage", panel3: "Documents" },
    trips: { title: "Trips: live control", lead: "Dedicated trip screen: route, ETA, contact, safety, dispute close.", id: "Trip ID", rider: "Rider", driver: "Driver", action: "Request trip status", panel1: "Route and ETA", panel2: "Contact", panel3: "Safety" },
    complaints: { title: "Complaints: reply, contact, decision", lead: "Dedicated complaint screen: rider reply, driver reply, calls, evidence, decision, appeal.", id: "Complaint ID", replyRider: "Reply to rider", replyDriver: "Reply to driver", decision: "Decision", action: "Send reply and decision", panel1: "Reply text", panel2: "Contact", panel3: "Evidence and appeal" },
    balance: { title: "Balance: gate and audit", lead: "Dedicated balance screen: multi-currency, order gate check, no manual admin top-up.", id: "Driver ID", amount: "Minimum balance", action: "Check balance gate", panel1: "Multi-currency", panel2: "Order block", panel3: "Ledger audit" },
    rewards: { title: "Rewards: eligibility and approval", lead: "Dedicated rewards screen: eligibility, fraud check, owner approval pack, no payout.", id: "Campaign ID", amount: "Reward amount", action: "Build approval pack", panel1: "Eligibility", panel2: "Fraud review", panel3: "Owner approval" },
    contests: { title: "Contests: leaderboard and anti-cheat", lead: "Dedicated contest screen: leaderboard, point rules, anti-cheat, prize pack.", id: "Contest ID", amount: "Prize pool", action: "Run anti-cheat check", panel1: "Leaderboard", panel2: "Point rules", panel3: "Prizes" },
    archive: { title: "Archive: evidence vault", lead: "Dedicated archive screen: custody chain, redacted export, legal hold.", id: "Archive ID", amount: "Retention", action: "Prepare redacted export", panel1: "Evidence", panel2: "Legal hold", panel3: "Export" },
    reports: { title: "Reports: daily control", lead: "Dedicated reports screen: daily AI report, complaint SLA, finance, readiness.", id: "Report date", amount: "Period", action: "Build report", panel1: "Daily AI", panel2: "Complaint SLA", panel3: "Export" },
    management: { title: "Management: operations room", lead: "Dedicated management screen: dispatch health, regions, operator assignment, safe broadcast.", id: "Region", amount: "Load limit", action: "Apply operations command", panel1: "Dispatch", panel2: "Operators", panel3: "Broadcast" },
    access: { title: "Access: roles and audit", lead: "Dedicated access screen: RBAC, grant and revoke, audit; provider secrets blocked.", id: "Staff ID", amount: "Access level", action: "Send RBAC command", panel1: "Role matrix", panel2: "Grant / revoke", panel3: "Audit" },
  },
  uz: {
    serverOnly: "Faqat server javobi", noFake: "Lokal muvaffaqiyat yo‘q", blockedMoney: "Pul, hamyon va provayder bloklangan", route: "API yo‘li", send: "Buyruq yuborish", response: "Server javobi", required: "Majburiy", note: "Operator eslatmasi", currencyTitle: "Bozor uchun ko‘p valyuta ro‘yxati", addCurrency: "Valyuta qo‘shish", activeCurrency: "Faol valyuta", market: "Bozor / mamlakat", operator: "Operator",
    drivers: { title: "Haydovchilar: tekshiruv va ruxsat", lead: "Haydovchilar uchun alohida ekran: hujjatlar, holat, reyting, buyurtmaga ruxsat darvozasi.", id: "Haydovchi raqami", status: "Tekshiruv holati", risk: "Xavf", action: "Qayta tekshiruv so‘rash", panel1: "Haydovchi dosyesi", panel2: "Ruxsat nazorati", panel3: "Aloqa va izohlar" },
    vehicles: { title: "Avto: ko‘rik va hujjatlar", lead: "Mashina uchun alohida ekran: kuzov foto, salon foto, hujjatlar, ko‘rik muddati.", id: "Avto ID", plate: "Davlat raqami", inspection: "Ko‘rik natijasi", action: "Qayta ko‘rikka yuborish", panel1: "Avto kartasi", panel2: "Foto va shikastlar", panel3: "Hujjatlar" },
    trips: { title: "Safarlar: jonli nazorat", lead: "Safar uchun alohida ekran: yo‘nalish, kelish vaqti, aloqa, xavfsizlik, nizoni yopish.", id: "Safar raqami", rider: "Mijoz", driver: "Haydovchi", action: "Safar holatini so‘rash", panel1: "Yo‘nalish va vaqt", panel2: "Aloqa", panel3: "Xavfsizlik" },
    complaints: { title: "Shikoyatlar: javob, aloqa, qaror", lead: "Shikoyat uchun alohida ekran: mijozga javob, haydovchiga javob, qo‘ng‘iroq, dalil, qaror, apellyatsiya.", id: "Shikoyat ID", replyRider: "Mijozga javob", replyDriver: "Haydovchiga javob", decision: "Qaror", action: "Javob va qarorni yuborish", panel1: "Javob matni", panel2: "Aloqa", panel3: "Dalil va apellyatsiya" },
    balance: { title: "Balans: ruxsat va tekshiruv", lead: "Balans uchun alohida ekran: ko‘p valyuta, buyurtmaga ruxsat tekshiruvi, admin qo‘lda pul qo‘sha olmaydi.", id: "Haydovchi raqami", amount: "Eng kam balans", action: "Balans darvozasini tekshirish", panel1: "Ko‘p valyuta", panel2: "Buyurtma bloki", panel3: "Ledger auditi" },
    rewards: { title: "Bonuslar: huquq va tasdiq", lead: "Bonuslar uchun alohida ekran: huquq, firibgarlik tekshiruvi, egaga tasdiq paketi, to‘lovsiz.", id: "Kampaniya ID", amount: "Bonus summasi", action: "Tasdiq paketini yig‘ish", panel1: "Bonus huquqi", panel2: "Firibgarlik ko‘rigi", panel3: "Ega tasdig‘i" },
    contests: { title: "Tanlovlar: reyting va anti-chit", lead: "Tanlov uchun alohida ekran: yetakchilar jadvali, ball qoidasi, anti-chit, sovrin paketi.", id: "Tanlov ID", amount: "Sovrin fondi", action: "Anti-chit tekshiruv", panel1: "Yetakchilar", panel2: "Ball qoidasi", panel3: "Sovrinlar" },
    archive: { title: "Arxiv: dalillar ombori", lead: "Arxiv uchun alohida ekran: saqlash zanjiri, tahrirlangan eksport, huquqiy ushlab turish.", id: "Arxiv ID", amount: "Saqlash muddati", action: "Tahrirlangan eksport tayyorlash", panel1: "Dalillar", panel2: "Huquqiy ushlab turish", panel3: "Eksport" },
    reports: { title: "Hisobotlar: kunlik nazorat", lead: "Hisobotlar uchun alohida ekran: kunlik AI hisoboti, shikoyat muddati, moliya, tayyorlik.", id: "Hisobot sanasi", amount: "Davr", action: "Hisobot yig‘ish", panel1: "Kunlik AI", panel2: "Shikoyat muddati", panel3: "Eksport" },
    management: { title: "Boshqaruv: operatsiya xonasi", lead: "Boshqaruv uchun alohida ekran: dispetcher holati, hududlar, operator tayinlash, xavfsiz xabar.", id: "Hudud", amount: "Yuklama limiti", action: "Operatsion buyruqni qo‘llash", panel1: "Dispetcher", panel2: "Operatorlar", panel3: "Xabar" },
    access: { title: "Kirish: rollar va audit", lead: "Kirish uchun alohida ekran: rollar, huquq berish va olish, audit; provayder sirlari bloklangan.", id: "Xodim ID", amount: "Kirish darajasi", action: "Rol buyrug‘ini yuborish", panel1: "Rollar jadvali", panel2: "Berish / olish", panel3: "Audit" },
  },
  zh: {
    serverOnly: "只接受服务器响应", noFake: "没有本地成功", blockedMoney: "资金、钱包、服务商已锁定", route: "接口路径", send: "发送命令", response: "服务器响应", required: "必填", note: "操作员备注", currencyTitle: "市场多币种列表", addCurrency: "添加币种", activeCurrency: "当前币种", market: "市场 / 国家", operator: "操作员",
    drivers: { title: "司机：审核与准入", lead: "司机专用页面：文件、状态、评分、接单准入。", id: "司机编号", status: "审核状态", risk: "风险", action: "请求复核", panel1: "司机档案", panel2: "准入控制", panel3: "联系与备注" },
    vehicles: { title: "车辆：检查与文件", lead: "车辆专用页面：车身照片、车内照片、文件、检查有效期。", id: "车辆编号", plate: "车牌", inspection: "检查结果", action: "发送复检", panel1: "车辆卡片", panel2: "照片和损伤", panel3: "文件" },
    trips: { title: "行程：实时控制", lead: "行程专用页面：路线、预计时间、联系、安全、争议关闭。", id: "行程编号", rider: "乘客", driver: "司机", action: "请求行程状态", panel1: "路线和时间", panel2: "联系", panel3: "安全" },
    complaints: { title: "投诉：回复、联系、决定", lead: "投诉专用页面：回复乘客、回复司机、电话、证据、决定、申诉。", id: "投诉编号", replyRider: "回复乘客", replyDriver: "回复司机", decision: "决定", action: "发送回复和决定", panel1: "回复文本", panel2: "联系", panel3: "证据和申诉" },
    balance: { title: "余额：准入与审计", lead: "余额专用页面：多币种、接单准入检查、禁止管理员手动充值。", id: "司机编号", amount: "最低余额", action: "检查余额准入", panel1: "多币种", panel2: "接单阻止", panel3: "账本审计" },
    rewards: { title: "奖励：资格与批准", lead: "奖励专用页面：资格、欺诈检查、提交所有者批准包，不付款。", id: "活动编号", amount: "奖励金额", action: "生成批准包", panel1: "资格", panel2: "欺诈检查", panel3: "所有者批准" },
    contests: { title: "竞赛：排行与反作弊", lead: "竞赛专用页面：排行榜、积分规则、反作弊、奖品包。", id: "竞赛编号", amount: "奖池", action: "执行反作弊检查", panel1: "排行榜", panel2: "积分规则", panel3: "奖品" },
    archive: { title: "归档：证据库", lead: "归档专用页面：保管链、脱敏导出、法律保留。", id: "归档编号", amount: "保存期", action: "准备脱敏导出", panel1: "证据", panel2: "法律保留", panel3: "导出" },
    reports: { title: "报告：每日控制", lead: "报告专用页面：每日智能报告、投诉时限、财务、就绪度。", id: "报告日期", amount: "周期", action: "生成报告", panel1: "每日智能", panel2: "投诉时限", panel3: "导出" },
    management: { title: "管理：运营控制室", lead: "管理专用页面：调度健康、区域、操作员分配、安全广播。", id: "区域", amount: "负载限制", action: "应用运营命令", panel1: "调度", panel2: "操作员", panel3: "广播" },
    access: { title: "权限：角色与审计", lead: "权限专用页面：角色、授权和撤销、审计；服务商密钥锁定。", id: "员工编号", amount: "权限级别", action: "发送角色命令", panel1: "角色矩阵", panel2: "授权 / 撤销", panel3: "审计" },
  },
};



const TAXI_ADMIN_TRIP_036A_MARKER = "TAXI-ADMIN-UI-TRIP-036A-PROFESSIONAL-TRIP-CENTER-ONLY";
const TAXI_ADMIN_TRIP_036A_SCOPE = "only_trips_tab_no_other_admin_taxi_screens_touched";
const TAXI_ADMIN_TRIP_036A_ROUTE = ROUTE026D.trips;
const TAXI_ADMIN_TRIP_036A_SAFE_FLAGS = [
  "GET/POST command через существующий trips route только для server status request",
  "нет локального закрытия поездки",
  "нет локального штрафа",
  "нет исполнения кошелька, оплаты, выплат, провайдера и базы данных",
  "контакты и PII только в masked/safe-read режиме",
];

const TAXI_ADMIN_TRIP_036B_MARKER = "TAXI-ADMIN-UI-TRIP-036B-FULL-CONTROL-ROUTE-SAFETY-SABI-AI";
const TAXI_ADMIN_TRIP_036B_SCOPE = "only_admin_ui_taxi_trips_screen_full_control_no_backend_touch";
const TAXI_ADMIN_TRIP_036B_ROAD_PROVIDER_BOUNDARY = "route_camera_speed_data_requires_verified_map_provider_runtime_later";
const TAXI_ADMIN_TRIP_036B_QUEUE = [
  { label: "Все поездки", value: "live board", note: "поиск, фильтр, контроль SLA и риска" },
  { label: "Активные", value: "dispatch", note: "назначение водителя и движение к клиенту" },
  { label: "В пути", value: "en-route", note: "маршрут, скорость, безопасность" },
  { label: "Спорные", value: "review", note: "жалоба, апелляция, доказательства" },
];
const TAXI_ADMIN_TRIP_036B_ROUTE_INTELLIGENCE = [
  { title: "Оптимальный маршрут", value: "A → B · provider-ready", note: "Саби ИИ сравнивает время прибытия, трафик, безопасность и риск отклонения; реальный картографический провайдер подключается отдельным утверждением." },
  { title: "Камеры", value: "camera warning", note: "Интерфейс показывает зону предупреждений о камерах только как безопасный слой чтения и готовности провайдера, без ложных данных." },
  { title: "Скоростной режим", value: "speed limit", note: "Саби ИИ подсвечивает превышение, резкое торможение и опасный стиль вождения после подключения сервера и провайдера." },
  { title: "Перестроение маршрута", value: "reroute advice", note: "Предложение альтернативного пути идёт как рекомендация, финальное действие остаётся в слое рабочей среды и провайдера." },
];
const TAXI_ADMIN_TRIP_036B_SABI_AI_CONTROL = [
  "контроль всех поездок по статусам и риску",
  "предупреждение по камерам и скоростному режиму",
  "выявление отклонения от маршрута и подозрительной остановки",
  "сигнал владельцу или руководителю при жалобе, SOS или конфликте",
  "ежедневный снимок аудита без самостоятельного наказания",
];

const TAXI_ADMIN_TRIP_036C_MARKER = "TAXI-ADMIN-UI-TRIP-036C-DISPATCH-COMMANDER-MAP-SAFETY-AI-ONLY";
const TAXI_ADMIN_TRIP_036C_SCOPE = "only_admin_ui_taxi_trips_screen_dispatch_commander_no_other_screens_no_backend_touch";
const TAXI_ADMIN_TRIP_036C_PROVIDER_BOUNDARY = "live_map_camera_speed_limit_requires_verified_provider_runtime_later_no_fake_road_data";
const TAXI_ADMIN_TRIP_036C_CONTROL_STATS = [
  { label: "Все поездки", value: "операционный board", note: "поиск, фильтр, SLA, риск, назначенный оператор" },
  { label: "Оптимальный путь", value: "route advisor", note: "ETA, трафик, риск дороги, безопасная рекомендация" },
  { label: "Камеры", value: "camera watch", note: "предупреждение только из проверенного провайдера и рабочей среды" },
  { label: "Скорость", value: "speed regime", note: "лимит, превышение, резкое торможение, опасный стиль" },
];
const TAXI_ADMIN_TRIP_036C_AI_DECISIONS = [
  { title: "Маршрут", status: "ИИ контролирует", note: "Саби ИИ сравнивает основной и альтернативный путь, но не изменяет поездку без серверного процесса и процесса провайдера." },
  { title: "Камеры", status: "ИИ предупреждает", note: "Оператор видит camera-warning layer; реальные координаты не имитируются." },
  { title: "Скорость", status: "ИИ следит", note: "При превышении Саби ИИ поднимает флаг риска и рекомендует безопасное действие." },
  { title: "Безопасность", status: "ИИ эскалирует", note: "SOS, жалоба, отклонение, конфликт и подозрительная остановка идут в аудит владельца или руководителя." },
];
const TAXI_ADMIN_TRIP_036C_OPERATOR_PLAYBOOK = [
  "проверить live статус поездки",
  "сверить водителя, клиента, авто и регион",
  "оценить маршрут, speed regime и camera warnings",
  "при риске открыть support/dispute workflow",
  "не завершать, не штрафовать и не двигать деньги локально",
];

const TAXI_ADMIN_TRIP_036D_MARKER = "TAXI-ADMIN-UI-TRIP-036D-FINAL-POLISH-PREMIUM-CONTROL-ONLY";
const TAXI_ADMIN_TRIP_036D_SCOPE = "only_admin_ui_taxi_trips_final_polish_no_other_screens_no_backend_touch";
const TAXI_ADMIN_TRIP_036D_PREMIUM_GUARDS = [
  { label: "Все поездки", value: "100% UI-control", note: "единый фильтр активных, спорных, задержанных и рискованных поездок" },
  { label: "Маршрут", value: "optimal route cockpit", note: "A → B, безопасный reroute, отклонение, ETA и дорожный риск" },
  { label: "Камеры/скорость", value: "road safety watch", note: "камера, лимит, превышение, резкое торможение, опасная остановка" },
  { label: "Sabi AI", value: "perfect supervision", note: "ИИ наблюдает, предупреждает, эскалирует и готовит отчёт владельцу" },
];
const TAXI_ADMIN_TRIP_036D_OPERATOR_COMMANDS = [
  "Запросить live safe-read статус",
  "Проверить водителя, клиента, авто и баланс-допуск",
  "Сравнить оптимальный маршрут, камеры и скоростной режим",
  "Открыть support/dispute при риске",
  "Передать владельцу или руководителю при SOS, конфликте или тяжёлой жалобе",
];


const TAXI_ADMIN_TRIP_036E_MARKER = "TAXI-ADMIN-UI-TRIP-036E-GLOBAL-SCALE-SABI-AI-PERSONA-CONTROL-ONLY";
const TAXI_ADMIN_TRIP_036E_SCOPE = "only_admin_ui_taxi_trips_global_scale_sabi_ai_persona_no_other_screens_no_backend_touch";
const TAXI_ADMIN_TRIP_036E_CAPACITY_MODEL = "10000_plus_global_trips_now_scale_out_by_region_city_risk_queue_later";
const TAXI_ADMIN_TRIP_036E_GOOGLE_BOUNDARY = "google_maps_traffic_camera_material_is_training_reference_not_primary_control_source_verified_provider_runtime_required_later";
const TAXI_ADMIN_TRIP_036E_GLOBAL_SCALE_ROWS = [
  { label: "Global load", value: "10 000+ поездок", note: "Экран рассчитан на одновременный контроль больших мировых очередей: страна, город, статус, риск, SLA." },
  { label: "Shard control", value: "регион → город → риск", note: "Саби ИИ делит поток на очереди и показывает оператору только важные отклонения, не теряя общий контроль." },
  { label: "Priority engine", value: "SOS / риск / спор", note: "Сначала безопасность, потом конфликт, задержка, отклонение маршрута, жалоба и финансовая граница." },
  { label: "Growth ready", value: "масштабируется", note: "Если поездок станет больше, экран показывает модель пропускной способности без изменения других экранов администратора такси." },
];
const TAXI_ADMIN_TRIP_036E_SABI_PERSONA = [
  { label: "Личность", value: "Саби ИИ диспетчер", note: "Спокойный, точный, объясняет причину риска и никогда не выдаёт ложный успех." },
  { label: "Одновременно", value: "контроль всех поездок", note: "ИИ следит за тысячами поездок параллельно и поднимает только нужные события оператору или владельцу." },
  { label: "Память", value: "контекст поездки", note: "Помнит маршрут, водителя, клиента, жалобы, историю риска, но не раскрывает лишние персональные данные." },
  { label: "Google", value: "обучающий материал", note: "Google, карты и камеры используются как справочный учебный слой после утверждения, не главный источник решения." },
];
const TAXI_ADMIN_TRIP_036E_OPERATOR_TIERS = [
  "Tier 1: normal trips auto-watch",
  "Tier 2: delay / route deviation queue",
  "Tier 3: dispute / complaint / unsafe stop",
  "Tier 4: SOS / heavy risk Owner escalation",
];

const TAXI_ADMIN_TRIP_036F_MARKER = "TAXI-ADMIN-UI-TRIP-036F-RUNTIME-SAFE-READ-SCALE-PREFLIGHT-LOCKED";
const TAXI_ADMIN_TRIP_036F_SCOPE = "only_admin_ui_taxi_trips_runtime_safe_read_scale_preflight_no_backend_touch";
const TAXI_ADMIN_TRIP_036F_SCALE_TARGET = "10000_plus_concurrent_trips_safe_read_preflight";
const TAXI_ADMIN_TRIP_036F_RUNTIME_BOUNDARY = "runtime_scale_backend_provider_db_google_not_connected_here_exact_approval_required_later";
const TAXI_ADMIN_TRIP_036F_SCALE_PREFLIGHT = [
  { label: "Ingress", value: "country/city shards", note: "Поток 10 000+ поездок должен приходить чанками по региону, городу, статусу и риску, а не одним тяжёлым списком." },
  { label: "Queue", value: "priority lanes", note: "Саби ИИ держит нормальные, задержанные, спорные и SOS-очереди одновременно и отдаёт оператору только нужную глубину." },
  { label: "Latency", value: "live but safe-read", note: "Экран готов к опросу и потоковому безопасному чтению без локальных мутаций и без ложного live-статуса." },
  { label: "Backpressure", value: "overflow guard", note: "Если поток растёт выше 10 000, интерфейс показывает перегрузку, сроки и регион, где нужна эскалация оператору или владельцу." },
];
const TAXI_ADMIN_TRIP_036F_SABI_PERSONA_RUNTIME = [
  { label: "Наблюдает", value: "все поездки", note: "Саби ИИ как личность не теряет контекст: видит мир, но говорит оператору только важное." },
  { label: "Объясняет", value: "почему риск", note: "Каждый alert должен иметь причину: скорость, камера, жалоба, конфликт, отклонение, простой или SOS." },
  { label: "Не решает сам", value: "approval boundary", note: "ИИ не штрафует, не закрывает поездку, не двигает деньги и не запускает провайдера без разрешённого процесса." },
  { label: "Учится", value: "Google as training", note: "Google/карты/камеры — справочный учебный материал после подключения, не главный источник управления." },
];
const TAXI_ADMIN_TRIP_036F_OPERATOR_SCALE_ACTIONS = [
  "Сначала SOS и тяжёлый риск",
  "Потом отклонение маршрута и опасная остановка",
  "Потом жалобы, конфликт, задержка SLA",
  "Потом обычные поездки с auto-watch",
  "Данные Google и провайдера показывать как справку, решение держит процесс Саби ИИ и владельца",
];


const TAXI_ADMIN_TRIP_036H_MARKER = "TAXI-ADMIN-UI-TRIP-036H-ADMIN-RUNTIME-SAFE-READ-VISIBILITY-LOCKED";
const TAXI_ADMIN_TRIP_036H_SCOPE = "only_admin_ui_taxi_trips_admin_runtime_visibility_for_036g_no_backend_touch";
const TAXI_ADMIN_TRIP_036H_BACKEND_CONTRACT = "036g_global_scale_safe_read_contract_visible_to_admin_ui";
const TAXI_ADMIN_TRIP_036H_PUBLIC_ENDPOINTS = [
  "/api/taxi/trips/global-scale-safe-read/036g/readiness",
  "/api/taxi/trips/global-scale-safe-read/036g/contract",
  "/api/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor",
];
const TAXI_ADMIN_TRIP_036H_ADMIN_ENDPOINTS = [
  "/api/admin/taxi/trips/global-scale-safe-read/036g/readiness",
  "/api/admin/taxi/trips/global-scale-safe-read/036g/contract",
  "/api/admin/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor",
];
const TAXI_ADMIN_TRIP_036H_VISIBILITY_ROWS = [
  { label: "Readiness", value: "036G live", note: "Интерфейс администратора видит готовность серверного договора масштабирования через безопасную точку чтения, без локального успеха." },
  { label: "Contract", value: "10 000+ trips", note: "Контракт описывает shard/priority/backpressure/SLA модель для глобального потока поездок." },
  { label: "Sabi AI", value: "persona supervisor", note: "Саби ИИ как личность-диспетчер наблюдает, объясняет риск и готовит отчёт, но не выполняет мутации." },
  { label: "Google", value: "training/reference", note: "Данные Google и провайдера остаются учебным и справочным слоем, не главным источником решения." },
];
const TAXI_ADMIN_TRIP_036H_RUNTIME_RULES = [
  "GET-only safe-read visibility",
  "admin routes protected by token",
  "money/provider/Google/DB/fake road data blocked",
  "Owner workflow controls execution approvals",
];



const TAXI_ADMIN_TRIP_036J_MARKER = "TAXI-ADMIN-UI-TRIP-036J-SABI-AI-PERSONA-REPORT-VISIBILITY-LOCKED";
const TAXI_ADMIN_TRIP_036J_SCOPE = "only_admin_ui_taxi_trips_sabi_ai_persona_report_visibility_for_036i_no_backend_touch";
const TAXI_ADMIN_TRIP_036J_BACKEND_REPORT = "036i_sabi_ai_persona_runtime_report_visible_to_admin_ui";
const TAXI_ADMIN_TRIP_036J_PUBLIC_ENDPOINTS = [
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036J_ADMIN_ENDPOINTS = [
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036J_REPORT_ROWS = [
  { label: "Sabi AI", value: "личность-диспетчер", note: "Саби ИИ объясняет риск, готовит отчёт и держит глобальный контекст 10 000+ поездок одновременно." },
  { label: "Owner brief", value: "private report", note: "Краткая выжимка для владельца: срочные риски, подозрительные маршруты, перегрузка сроков, SOS и шаблоны мошенничества." },
  { label: "Report-only", value: "no action", note: "Саби ИИ не штрафует, не закрывает поездки, не двигает деньги и не запускает провайдера без утверждения." },
  { label: "Google", value: "training/reference", note: "Google/maps/camera traffic материал используется как справочный учебный слой, не главный источник решения." },
];
const TAXI_ADMIN_TRIP_036J_REPORT_RULES = [
  "036I public report endpoints must return 200 safe-read",
  "036I admin report endpoints must stay protected without token",
  "Sabi AI report is report-only, not execution",
  "Owner keeps final decision authority",
  "Google/provider data remains training/reference only",
];


const TAXI_ADMIN_TRIP_036K_MARKER = "TAXI-ADMIN-UI-TRIP-036K-DAILY-OWNER-PRIVATE-REPORT-VISIBILITY-LOCKED";
const TAXI_ADMIN_TRIP_036K_SCOPE = "only_admin_ui_taxi_trips_daily_owner_private_report_visibility_no_backend_touch";
const TAXI_ADMIN_TRIP_036K_BACKEND_REPORT = "036i_daily_owner_private_report_visible_to_admin_ui";
const TAXI_ADMIN_TRIP_036K_PUBLIC_ENDPOINTS = [
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036K_ADMIN_ENDPOINTS = [
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036K_DAILY_OWNER_PRIVATE_REPORT_ROWS = [
  { label: "Daily private Owner report", value: "Owner only", note: "Саби ИИ готовит личную ежедневную сводку по всем поездкам: риски, нарушения, подозрительные маршруты, SOS и перегрузки." },
  { label: "Global watch", value: "10 000+ trips", note: "Отчёт агрегирует страны, города, risk lanes, SLA, route deviation, speed/camera alerts и disputed trips без fake live data." },
  { label: "Sabi AI persona", value: "личность-наблюдатель", note: "Саби ИИ говорит как персональный контролёр владельца: ясно, кратко, с причиной риска и предложением, но без самостоятельного исполнения." },
  { label: "Google boundary", value: "training/reference", note: "Google/maps/camera/traffic после подключения остаются обучающим и справочным материалом, не главным источником решения." },
];
const TAXI_ADMIN_TRIP_036K_PRIVATE_REPORT_RULES = [
  "Daily Owner report is private and report-only",
  "Sabi AI does not block, fine, close trips, move money or call providers by itself",
  "Urgent risks are escalated to Owner before normal daily summary",
  "Google/provider material is training/reference only, not primary control source",
  "Admin UI Trip screen shows visibility only; backend execution remains locked",
];


const TAXI_ADMIN_TRIP_036L_MARKER = "TAXI-ADMIN-UI-TRIP-036L-SABI-AI-ESCALATION-POLICY-VISIBILITY-LOCKED";
const TAXI_ADMIN_TRIP_036L_SCOPE = "only_admin_ui_taxi_trips_sabi_ai_escalation_policy_visibility_no_backend_touch";
const TAXI_ADMIN_TRIP_036L_POLICY = "036i_sabi_ai_escalation_policy_visible_report_only_locked";
const TAXI_ADMIN_TRIP_036L_PUBLIC_ENDPOINTS = [
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036L_ADMIN_ENDPOINTS = [
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/report",
  "/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036L_ESCALATION_ROWS = [
  { label: "Urgent Owner escalation", value: "immediate", note: "SOS, suspected crime/fraud, dangerous stop, route deviation, child/passenger risk and SLA overload go to Owner priority before daily report." },
  { label: "Sabi AI persona", value: "личность-контролёр", note: "Саби ИИ говорит как персональный контролёр владельца: причина риска, уровень срочности, доказательство, рекомендуемая следующая проверка, без финального действия." },
  { label: "10 000+ trips", value: "global lanes", note: "Политика группирует поездки по стране, городу, риску и срокам, чтобы один вид владельца мог контролировать тысячи поездок без потери срочных случаев." },
  { label: "Google boundary", value: "training/reference", note: "Google/maps/camera/traffic after connection remains learning/reference material only, not the primary control source." },
];
const TAXI_ADMIN_TRIP_036L_ESCALATION_RULES = [
  "Sabi AI escalates urgent risk to Owner but does not block, fine, close, pay, refund, or call providers",
  "Owner has final decision authority; staff only review, prepare, flag and explain",
  "Every high-risk case needs evidence, reason code, timestamp and human-review trail",
  "Google/provider material is training/reference only, not primary control source",
  "Escalation visibility is Admin UI safe-read only; backend execution remains locked",
];


const TAXI_ADMIN_TRIP_036M_MARKER = "TAXI-ADMIN-UI-TRIP-036M-SAFE-READ-FINAL-HANDOFF-LOCKED";
const TAXI_ADMIN_TRIP_036M_SCOPE = "only_admin_ui_taxi_trips_safe_read_final_handoff_no_backend_touch";
const TAXI_ADMIN_TRIP_036M_HANDOFF = "trip_screen_safe_read_control_visibility_final_handoff_locked";
const TAXI_ADMIN_TRIP_036M_COMPLETION_ROWS = [
  { label: "Global scale", value: "10 000+ trips", note: "страна, город, статус, риск, SLA и overload lanes готовы для safe-read контроля" },
  { label: "Sabi AI persona", value: "Owner controller", note: "личность-диспетчер докладывает владельцу, объясняет риск и остаётся только отчётной" },
  { label: "Owner reports", value: "daily + urgent", note: "ежедневный частный отчёт, сводка владельца и политика эскалации видны на экране поездок" },
  { label: "Runtime contracts", value: "036G / 036I", note: "Интерфейс администратора видит безопасные точки чтения, административные точки защищены токен-контролем" },
  { label: "Google boundary", value: "training/reference", note: "карты, камеры и traffic — обучающий материал, не главный control source" },
  { label: "Execution lock", value: "0 real execution", note: "нет записи в базу данных, вызова провайдера, вызова Google-провайдера, кошелька, оплаты, выплат или пополнения" },
];
const TAXI_ADMIN_TRIP_036M_PUBLIC_ENDPOINTS = [
  "/api/taxi/trips/global-scale-safe-read/036g/readiness",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness",
  "/api/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief",
];
const TAXI_ADMIN_TRIP_036M_FINAL_HANDOFF_RULES = [
  "Taxi Admin UI Trip screen safe-read/control visibility is complete",
  "Sabi AI persona is Owner-facing, report-only, and above staff workflow",
  "10 000+ simultaneous global trip supervision is designed as shard/priority lanes",
  "Google is training/reference material only and cannot override Sabi AI/Owner governance",
  "Real provider, Google provider, DB, wallet, payment and payout remain locked until exact Owner approval",
];

const normalizeBase026D = (config: AdminApiConfig): string => String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
const headers026D = (config: AdminApiConfig): Record<string, string> => ({ "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" });

function normalizeCurrencyCode026D(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 12);
}

function localized026D(language: AdminLanguage): Copy026D {
  return COPY026D[language] || COPY026D.ru;
}

export function TaxiAdminRemainingOps026DPanel({ language, config, setNotice, activeTab }: Props026D) {
  const copy = localized026D(language);
  const screen = copy[activeTab];
  const [market, setMarket] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [entityId, setEntityId] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");
  const [reason, setReason] = useState("");
  const [riderReply, setRiderReply] = useState("");
  const [driverReply, setDriverReply] = useState("");
  const [decision, setDecision] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [currencies, setCurrencies] = useState<CurrencyRow026D[]>([]);
  const [activeCurrency, setActiveCurrency] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastResponse, setLastResponse] = useState<LastResponse026D>(null);
  const route = ROUTE026D[activeTab];

  const currencyCodes = useMemo(() => currencies.map((item) => item.code), [currencies]);
  const canSend = Boolean(entityId.trim()) && Boolean(reason.trim()) && (activeTab !== "balance" || Boolean(activeCurrency));

  const addCurrency = () => {
    const code = normalizeCurrencyCode026D(currencyInput);
    if (!code) return;
    setCurrencies((prev) => prev.some((item) => item.code === code) ? prev : [...prev, { code, label: code, source: "operator" }]);
    setActiveCurrency(code);
    setCurrencyInput("");
  };

  const submit = async (intent: string) => {
    setBusy(true);
    const payload = {
      marker: MARKER026D,
      screen: activeTab,
      intent,
      entityId,
      market,
      operatorId,
      activeCurrency,
      currencyCodes,
      secondaryValue,
      reason,
      riderReply: activeTab === "complaints" ? riderReply : undefined,
      driverReply: activeTab === "complaints" ? driverReply : undefined,
      decision: activeTab === "complaints" ? decision : undefined,
      safety: {
        uiLocalSuccess: false,
        providerCallRequested: false,
        walletMutationRequested: false,
        moneyMovementRequested: false,
        dbWriteRequestedByUiWithoutBackend: false,
      },
    };
    setLastResponse({ route, ok: false, status: "sent", message: copy.serverOnly, at: new Date().toISOString() });
    setNotice(copy.serverOnly);
    try {
      const response = await fetch(`${normalizeBase026D(config)}${route}`, { method: "POST", headers: headers026D(config), body: JSON.stringify(payload) });
      const json = await response.json().catch(() => ({}));
      setLastResponse({ route, ok: response.ok, status: response.status, message: String(json?.message || json?.error || copy.serverOnly), at: new Date().toISOString() });
      setNotice(response.ok ? copy.serverOnly : copy.noFake);
    } catch (error) {
      setLastResponse({ route, ok: false, status: "network_error", message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.noFake);
    } finally {
      setBusy(false);
    }
  };

  if (activeTab === "trips") {
    const tripStatus = secondaryValue.trim() || "ожидает проверки";
    const tripId = entityId.trim() || "не указан";
    const marketValue = market.trim() || "страна / город";
    const operatorValue = operatorId.trim() || "не назначен";
    const noteValue = reason.trim() || "Укажите причину проверки поездки";
    const tripReadiness = entityId.trim() && reason.trim() ? 100 : entityId.trim() ? 86 : 72;

    const premiumSummaryRows = [
      { label: "Поток", value: "10 000+", note: "поездки по странам и городам" },
      { label: "Sabi AI", value: "контроль", note: "следит, объясняет, докладывает" },
      { label: "Владелец", value: "главный", note: "финальное решение только за владельцем" },
      { label: "Исполнение", value: "закрыто", note: "деньги и действия не запускаются" },
    ];
    const premiumFlowRows = [
      { label: "Новые", value: "очередь", note: "приём и распределение" },
      { label: "В пути", value: "контроль", note: "маршрут, скорость, безопасность" },
      { label: "Спорные", value: "разбор", note: "жалобы, доказательства, апелляция" },
      { label: "Срочные", value: "владельцу", note: "SOS, риск, подозрение" },
    ];
    const premiumRiskRows = [
      { label: "SOS", value: "немедленно" },
      { label: "Подозрение", value: "владельцу" },
      { label: "Отклонение", value: "проверка" },
      { label: "Опасная остановка", value: "контроль" },
      { label: "Жалоба", value: "разбор" },
      { label: "Перегрузка", value: "приоритет" },
    ];
    const premiumRouteRows = [
      { label: "Маршрут", value: "лучший путь" },
      { label: "Камеры", value: "предупреждение" },
      { label: "Скорость", value: "лимит" },
      { label: "Остановка", value: "риск" },
    ];
    const premiumOwnerRows = [
      { label: "Ежедневно", value: "личный отчёт" },
      { label: "Срочно", value: "отдельный сигнал" },
      { label: "Причина", value: "понятно" },
      { label: "Действие", value: "только после разрешения" },
    ];
    const premiumTimeline = [
      ["Создана", entityId.trim() ? "готово" : "ожидает"],
      ["Маршрут", market.trim() ? "готово" : "ожидает"],
      ["Водитель", secondaryValue.trim() ? "готово" : "ожидает"],
      ["Безопасность", reason.trim() ? "готово" : "ожидает"],
      ["Финансы", "закрыто"],
    ] as Array<[string, string]>;

    return (
      <section
        className="taxiTripPremiumCleanShell"
        data-taxi-admin-trip-036a-professional-trip-center="ready"
        data-taxi-admin-trip-036a-scope={TAXI_ADMIN_TRIP_036A_SCOPE}
        data-taxi-admin-trip-036a-only-tab="trips"
        data-taxi-admin-trip-036a-no-wallet-payment-payout-provider-db="true"
        data-taxi-admin-trip-036a-no-fake-success="true"
        data-taxi-admin-trip-036b-marker={TAXI_ADMIN_TRIP_036B_MARKER}
        data-taxi-admin-trip-036c-marker={TAXI_ADMIN_TRIP_036C_MARKER}
        data-taxi-admin-trip-036d-marker={TAXI_ADMIN_TRIP_036D_MARKER}
        data-taxi-admin-trip-036e-marker={TAXI_ADMIN_TRIP_036E_MARKER}
        data-taxi-admin-trip-036f-marker={TAXI_ADMIN_TRIP_036F_MARKER}
        data-taxi-admin-trip-036h-marker={TAXI_ADMIN_TRIP_036H_MARKER}
        data-taxi-admin-trip-036j-marker={TAXI_ADMIN_TRIP_036J_MARKER}
        data-taxi-admin-trip-036k-marker={TAXI_ADMIN_TRIP_036K_MARKER}
        data-taxi-admin-trip-036l-marker={TAXI_ADMIN_TRIP_036L_MARKER}
        data-taxi-admin-trip-036m-marker={TAXI_ADMIN_TRIP_036M_MARKER}
        data-taxi-admin-trip-036m-fix2-marker="TAXI-ADMIN-UI-TRIP-036M-FIX2-PREMIUM-CLEAN-RESTORE"
        data-taxi-admin-trip-premium-clean-owner-ui="restored"
      >
        <header className="taxiTripPremiumCleanHero">
          <div>
            <span>Такси</span>
            <h2>Поездки</h2>
            <p>Премиум центр контроля поездок: маршрут, водитель, клиент, безопасность, жалобы, отчёт владельцу и Sabi AI без лишнего технического текста.</p>
          </div>
          <aside>
            <strong>{tripReadiness}%</strong>
            <small>готовность экрана</small>
          </aside>
        </header>

        <div className="taxiTripPremiumCleanTopGrid">
          {premiumSummaryRows.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.note}</small>
            </article>
          ))}
        </div>

        <div className="taxiTripPremiumCleanWorkspace">
          <section className="taxiTripPremiumCleanPanel taxiTripPremiumCleanCommand">
            <div className="taxiTripPremiumCleanTitle"><span>Проверка поездки</span><b>только просмотр</b></div>
            <div className="taxiTripPremiumCleanForm">
              <label><span>Регион</span><input value={market} onChange={(event) => setMarket(event.target.value)} placeholder="страна / город" /></label>
              <label><span>Номер поездки</span><input value={entityId} onChange={(event) => setEntityId(event.target.value)} placeholder="номер поездки" /></label>
              <label><span>Статус</span><input value={secondaryValue} onChange={(event) => setSecondaryValue(event.target.value)} placeholder="текущий статус" /></label>
              <label><span>Оператор</span><input value={operatorId} onChange={(event) => setOperatorId(event.target.value)} placeholder="ответственный" /></label>
              <label className="wide"><span>Причина проверки</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="кратко и понятно" /></label>
            </div>
            <button className="taxiTripPremiumCleanButton" type="button" disabled={busy || !canSend} onClick={() => void submit("proverka-poezdki")}>{busy ? "Проверка" : "Проверить поездку"}</button>
          </section>

          <section className="taxiTripPremiumCleanPanel">
            <div className="taxiTripPremiumCleanTitle"><span>Текущая поездка</span><b>{tripStatus}</b></div>
            <div className="taxiTripPremiumCleanInfo">
              <article><span>Поездка</span><strong>{tripId}</strong></article>
              <article><span>Регион</span><strong>{marketValue}</strong></article>
              <article><span>Оператор</span><strong>{operatorValue}</strong></article>
              <article><span>Комментарий</span><strong>{noteValue}</strong></article>
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel wide">
            <div className="taxiTripPremiumCleanTitle"><span>Мировой поток</span><b>приоритеты</b></div>
            <div className="taxiTripPremiumCleanRows four">
              {premiumFlowRows.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.note}</small></article>)}
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel wide">
            <div className="taxiTripPremiumCleanTitle"><span>Маршрут и дорога</span><b>контроль</b></div>
            <div className="taxiTripPremiumCleanRoute">
              <span>A</span><i /><strong>лучший путь</strong><i /><span>B</span>
            </div>
            <div className="taxiTripPremiumCleanTags">
              {premiumRouteRows.map((item) => <span key={item.label}>{item.label}: {item.value}</span>)}
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel danger">
            <div className="taxiTripPremiumCleanTitle"><span>Риски</span><b>срочно</b></div>
            <div className="taxiTripPremiumCleanRows compact">
              {premiumRiskRows.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel success">
            <div className="taxiTripPremiumCleanTitle"><span>Sabi AI</span><b>личный контроль</b></div>
            <div className="taxiTripPremiumCleanReport">
              <strong>Sabi AI наблюдает за поездками, объясняет риск и докладывает владельцу.</strong>
              <span>Он не закрывает поездку, не штрафует, не двигает деньги и не запускает внешние действия без разрешения владельца.</span>
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel">
            <div className="taxiTripPremiumCleanTitle"><span>Владелец</span><b>личный отчёт</b></div>
            <div className="taxiTripPremiumCleanRows compact">
              {premiumOwnerRows.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel">
            <div className="taxiTripPremiumCleanTitle"><span>Ход поездки</span><b>контроль</b></div>
            <div className="taxiTripPremiumCleanTimeline">
              {premiumTimeline.map(([label, state]) => <div key={label}><i /><span>{label}</span><b>{state}</b></div>)}
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel wide">
            <div className="taxiTripPremiumCleanTitle"><span>Водитель, клиент, авто</span><b>проверка</b></div>
            <div className="taxiTripPremiumCleanRows four">
              <article><span>Клиент</span><strong>профиль скрыт</strong><small>контакт только через поддержку</small></article>
              <article><span>Водитель</span><strong>карточка</strong><small>баланс, рейтинг, документы</small></article>
              <article><span>Авто</span><strong>данные</strong><small>номер, класс, состояние</small></article>
              <article><span>Финансы</span><strong>закрыто</strong><small>только просмотр, без операций</small></article>
            </div>
          </section>

          <section className="taxiTripPremiumCleanPanel wide">
            <div className="taxiTripPremiumCleanTitle"><span>Ответ системы</span><b>{lastResponse ? `${lastResponse.status}` : "нет ответа"}</b></div>
            <div className="taxiTripPremiumCleanResponse">{lastResponse ? lastResponse.message : noteValue}</div>
          </section>
        </div>
      </section>
    );
  }

  return (
    <div className={`taxi026dShell taxi026d-${activeTab}`} data-taxi-admin-026d-remaining-screen={activeTab} data-taxi-admin-026d-no-fake="true" data-taxi-admin-026d-ready-screens-not-replaced="applications-orders-tariffs">
      <div className="taxi026dHeader">
        <div><span>{MARKER026D}</span><h2>{screen.title}</h2><p>{screen.lead}</p></div>
        <strong>{copy.noFake}</strong>
      </div>

      <div className="taxi026dRouteBar"><span>{copy.route}</span><code>{route}</code><b>{copy.blockedMoney}</b></div>

      <div className="taxi026dGrid">
        <section className="taxi026dCommandCard">
          <h3>{screen.panel1}</h3>
          <label><span>{copy.market}</span><input value={market} onChange={(event) => setMarket(event.target.value)} placeholder={copy.market} /></label>
          <label><span>{screen.id}</span><input value={entityId} onChange={(event) => setEntityId(event.target.value)} placeholder={screen.id} /></label>
          <label><span>{activeTab === "complaints" ? screen.decision : (screen.status || screen.plate || screen.rider || screen.amount || copy.required)}</span><input value={secondaryValue} onChange={(event) => setSecondaryValue(event.target.value)} placeholder={activeTab === "complaints" ? screen.decision : copy.required} /></label>
          <label><span>{copy.note}</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} /></label>
        </section>

        <section className="taxi026dCommandCard accent">
          <h3>{activeTab === "balance" ? copy.currencyTitle : screen.panel2}</h3>
          {activeTab === "balance" ? (
            <div className="taxi026dCurrencyBox" data-taxi-admin-026d-multicurrency-list-selection="true" data-taxi-admin-026d-no-fixed-currency-list="true">
              <label><span>{copy.addCurrency}</span><input value={currencyInput} onChange={(event) => setCurrencyInput(event.target.value)} placeholder="ISO / MARKET CODE" /></label>
              <button type="button" onClick={addCurrency}>{copy.addCurrency}</button>
              <div className="taxi026dCurrencyList">
                {currencies.map((item) => <button key={item.code} type="button" className={activeCurrency === item.code ? "active" : ""} onClick={() => setActiveCurrency(item.code)}>{item.code}</button>)}
                {!currencies.length ? <span>{copy.required}</span> : null}
              </div>
              <p>{copy.activeCurrency}: <strong>{activeCurrency || copy.required}</strong></p>
            </div>
          ) : activeTab === "complaints" ? (
            <div className="taxi026dComplaintReplies" data-taxi-admin-026d-complaint-reply-contact-decision="true">
              <label><span>{screen.replyRider}</span><textarea value={riderReply} onChange={(event) => setRiderReply(event.target.value)} /></label>
              <label><span>{screen.replyDriver}</span><textarea value={driverReply} onChange={(event) => setDriverReply(event.target.value)} /></label>
              <label><span>{screen.decision}</span><input value={decision} onChange={(event) => setDecision(event.target.value)} /></label>
              <div className="taxi026dContactRow"><button type="button" onClick={() => void submit("call-rider")}>{screen.replyRider}</button><button type="button" onClick={() => void submit("call-driver")}>{screen.replyDriver}</button></div>
            </div>
          ) : (
            <div className="taxi026dFunctionTiles">
              <div><b>{screen.panel2}</b><span>{copy.serverOnly}</span></div>
              <div><b>{copy.operator}</b><input value={operatorId} onChange={(event) => setOperatorId(event.target.value)} placeholder={copy.operator} /></div>
              <div><b>{copy.required}</b><span>{copy.noFake}</span></div>
            </div>
          )}
        </section>

        <section className="taxi026dCommandCard dark">
          <h3>{screen.panel3}</h3>
          <button type="button" disabled={busy || !canSend} onClick={() => void submit(screen.action)}>{busy ? copy.serverOnly : screen.action}</button>
          <div className="taxi026dResponse" data-taxi-admin-026d-server-response-only="true">
            <strong>{copy.response}</strong>
            <span>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : copy.serverOnly}</span>
            <code>{lastResponse?.route || route}</code>
          </div>
          <ul>
            <li>{copy.noFake}</li>
            <li>{copy.blockedMoney}</li>
            <li>{copy.serverOnly}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
