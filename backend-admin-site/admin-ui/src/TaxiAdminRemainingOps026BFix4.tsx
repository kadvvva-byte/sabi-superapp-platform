import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import "./taxi-admin-remaining-ops026bfix4.css";

export type TaxiRemainingScreen026BFix4 = "drivers" | "vehicles" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "management" | "access";

type Props026BFix4 = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void; screen: TaxiRemainingScreen026BFix4 | string };
type CommandResult026BFix4 = { route: string; status: number | string; ok: boolean; text: string; at: string } | null;
type CurrencyItem026BFix4 = { code: string; name: string; source: "server" | "operator" };

type Copy026BFix4 = {
  protectedTitle: string; protectedNote: string; market: string; countryInput: string; currencyList: string; currencyCode: string; currencyName: string; addCurrency: string; removeCurrency: string; selectCurrency: string; activeCurrency: string; noCurrency: string; lastServerAnswer: string; serverRoute: string; send: string; blockedMoney: string; noFake: string;
  driversTitle: string; driversSubtitle: string; driverQueue: string; driverIdentity: string; driverDocument: string; driverContact: string; driverVehicleLink: string; driverActions: string[];
  vehiclesTitle: string; vehiclesSubtitle: string; vehicleInspection: string; vehiclePhotos: string; vehicleSafety: string; vehicleCategory: string; vehicleActions: string[];
  tripsTitle: string; tripsSubtitle: string; tripLive: string; tripRoute: string; tripContacts: string; tripSafety: string; tripActions: string[];
  complaintsTitle: string; complaintsSubtitle: string; complaintInbox: string; complaintReply: string; complaintContacts: string; complaintEvidence: string; complaintDecision: string; complaintActions: string[];
  balanceTitle: string; balanceSubtitle: string; balanceGate: string; balanceLedger: string; balanceTopup: string; balanceBlocks: string; balanceActions: string[];
  rewardsTitle: string; rewardsSubtitle: string; rewardsEligibility: string; rewardsFraud: string; rewardsOwnerPack: string; rewardsNoPayout: string; rewardsActions: string[];
  contestsTitle: string; contestsSubtitle: string; contestsLeaderboard: string; contestsRules: string; contestsAnticheat: string; contestsPrizePack: string; contestsActions: string[];
  archiveTitle: string; archiveSubtitle: string; archiveVault: string; archiveChain: string; archiveExport: string; archiveHold: string; archiveActions: string[];
  reportsTitle: string; reportsSubtitle: string; reportsDailyAi: string; reportsSla: string; reportsFinance: string; reportsExport: string; reportsActions: string[];
  managementTitle: string; managementSubtitle: string; managementDispatch: string; managementRegion: string; managementOperator: string; managementBroadcast: string; managementActions: string[];
  accessTitle: string; accessSubtitle: string; accessMatrix: string; accessGrant: string; accessAudit: string; accessSecretsBlocked: string; accessActions: string[];
};

const MARKER026B_FIX4 = "TAXI-ADMIN-UI-026B-FIX4-PROTECT-READY-SCREENS-UNIQUE-REMAINING-FUNCTIONS-MULTICURRENCY-NO-FAKE";
const ROUTE026B_FIX4: Record<TaxiRemainingScreen026BFix4, string> = {
  drivers: "/api/admin/taxi/drivers/ops/026b-fix4/command",
  vehicles: "/api/admin/taxi/vehicles/ops/026b-fix4/command",
  trips: "/api/admin/taxi/trips/ops/026b-fix4/command",
  complaints: "/api/admin/taxi/complaints/ops/026b-fix4/command",
  balance: "/api/admin/taxi/balance/ops/026b-fix4/command",
  rewards: "/api/admin/taxi/rewards/ops/026b-fix4/command",
  contests: "/api/admin/taxi/contests/ops/026b-fix4/command",
  archive: "/api/admin/taxi/archive/ops/026b-fix4/command",
  reports: "/api/admin/taxi/reports/ops/026b-fix4/command",
  management: "/api/admin/taxi/management/ops/026b-fix4/command",
  access: "/api/admin/taxi/access/ops/026b-fix4/command",
};

const COPY026B_FIX4: Record<AdminLanguage, Copy026BFix4> = {
  ru: {
    protectedTitle: "Готовые экраны защищены", protectedNote: "Заявки, заказы и тарифы не заменяются этим модулем. Здесь работают только остальные разделы такси.", market: "Рынок", countryInput: "Страна / рынок", currencyList: "Мультивалютный список", currencyCode: "Код валюты", currencyName: "Название валюты", addCurrency: "Добавить валюту", removeCurrency: "Удалить", selectCurrency: "Выбрать валюту", activeCurrency: "Активная валюта", noCurrency: "Сначала добавь валюту рынка", lastServerAnswer: "Ответ сервера", serverRoute: "Серверный маршрут", send: "Отправить команду", blockedMoney: "Ручное движение денег запрещено", noFake: "Без фейка: экран не ставит локальный успех, ждёт ответ сервера.",
    driversTitle: "Водители: проверка и допуск", driversSubtitle: "Проверка личности, документов, связи, статуса допуска и связи с авто. Без ручного создания денег и без провайдера.", driverQueue: "Очередь водителей", driverIdentity: "Личность и документы", driverDocument: "Запрос документов", driverContact: "Связаться с водителем", driverVehicleLink: "Связь водитель ↔ авто", driverActions: ["Открыть досье", "Запросить документы", "Связаться", "Отправить на повторную проверку", "Подготовить блокировку допуска"],
    vehiclesTitle: "Авто: техосмотр и категория", vehiclesSubtitle: "Проверка фото, документов авто, безопасности и допуска к тарифной категории.", vehicleInspection: "Техосмотр", vehiclePhotos: "Фото кузова и салона", vehicleSafety: "Безопасность", vehicleCategory: "Категория авто", vehicleActions: ["Открыть карту авто", "Запросить фото", "Отметить дефект", "Подготовить допуск", "Подготовить снятие с линии"],
    tripsTitle: "Поездки: live control", tripsSubtitle: "Маршрут, ETA, статусы, связь, безопасность, закрытие спорных поездок.", tripLive: "Живая поездка", tripRoute: "Маршрут и ETA", tripContacts: "Связь клиент / водитель", tripSafety: "Безопасность и SOS", tripActions: ["Открыть поездку", "Связаться с клиентом", "Связаться с водителем", "Отправить safety note", "Подготовить разбор закрытия"],
    complaintsTitle: "Жалобы: ответ и решение", complaintsSubtitle: "Отдельная функция для ответа клиенту и водителю, связи, доказательств, решения и апелляции.", complaintInbox: "Очередь жалоб", complaintReply: "Официальный ответ", complaintContacts: "Связь с участниками", complaintEvidence: "Доказательства", complaintDecision: "Решение и апелляция", complaintActions: ["Ответить клиенту", "Ответить водителю", "Позвонить клиенту", "Позвонить водителю", "Сохранить решение", "Открыть апелляцию"],
    balanceTitle: "Баланс: контроль и аудит", balanceSubtitle: "Контроль допуска к заказам по балансу. Пополнение только водителем, админ не начисляет и не списывает деньги.", balanceGate: "Контроль допуска к заказам", balanceLedger: "Журнал баланса", balanceTopup: "Мониторинг self-topup", balanceBlocks: "Блокировки при нуле", balanceActions: ["Проверить контроль", "Запросить self-topup", "Открыть ledger", "Подготовить order-block", "Сформировать пакет аудита"],
    rewardsTitle: "Бонусы: право и проверка", rewardsSubtitle: "Проверка права на бонус, антифрод, пакет на утверждение владельцу. Без выплаты денег.", rewardsEligibility: "Право на бонус", rewardsFraud: "Антифрод", rewardsOwnerPack: "Пакет владельцу", rewardsNoPayout: "Выплата заблокирована", rewardsActions: ["Проверить право", "Открыть антифрод", "Подготовить пакет", "Вернуть на проверку", "Архивировать решение"],
    contestsTitle: "Конкурсы: рейтинг и честность", contestsSubtitle: "Лидерборд, правила баллов, античит, подготовка призов. Без выплаты денег.", contestsLeaderboard: "Лидерборд", contestsRules: "Правила баллов", contestsAnticheat: "Античит", contestsPrizePack: "Пакет призов", contestsActions: ["Пересчитать рейтинг", "Открыть античит", "Заморозить спорный балл", "Подготовить призовой пакет", "Отправить владельцу"],
    archiveTitle: "Архив: доказательства", archiveSubtitle: "Хранилище доказательств, цепочка хранения, редактированный экспорт и юридическое удержание.", archiveVault: "Evidence vault", archiveChain: "Цепочка хранения", archiveExport: "Редактированный экспорт", archiveHold: "Legal hold", archiveActions: ["Открыть дело", "Проверить цепочку", "Подготовить экспорт", "Включить юридическое удержание", "Сверить hash"],
    reportsTitle: "Отчёты: день и SLA", reportsSubtitle: "Ежедневный AI отчёт, SLA жалоб, финансы без денег, readiness provider без включения provider.", reportsDailyAi: "Ежедневный AI", reportsSla: "SLA жалоб", reportsFinance: "Финансовая сводка", reportsExport: "Пакет отчёта", reportsActions: ["Собрать ежедневный отчёт", "Проверить SLA", "Открыть финсводку", "Подготовить export", "Отправить владельцу"],
    managementTitle: "Управление: операционный центр", managementSubtitle: "Здоровье диспетчеризации, регионы, назначение оператора, безопасное объявление.", managementDispatch: "Диспетчеризация", managementRegion: "Регионы", managementOperator: "Оператор", managementBroadcast: "Безопасное объявление", managementActions: ["Проверить диспетчеризацию", "Открыть регион", "Назначить оператора", "Подготовить объявление", "Открыть журнал действий"],
    accessTitle: "Доступ: роли и аудит", accessSubtitle: "Матрица ролей, выдача и отзыв прав, журнал. Доступ к ключам провайдера заблокирован.", accessMatrix: "Матрица ролей", accessGrant: "Выдать / отозвать", accessAudit: "Журнал доступа", accessSecretsBlocked: "Ключи провайдера заблокированы", accessActions: ["Открыть матрицу", "Подготовить выдачу", "Подготовить отзыв", "Открыть аудит", "Проверить запрет ключей"],
  },
  en: {
    protectedTitle: "Ready screens protected", protectedNote: "Applications, Orders and Tariffs are not replaced by this module. Only the remaining Taxi sections are handled here.", market: "Market", countryInput: "Country / market", currencyList: "Multi-currency list", currencyCode: "Currency code", currencyName: "Currency name", addCurrency: "Add currency", removeCurrency: "Remove", selectCurrency: "Select currency", activeCurrency: "Active currency", noCurrency: "Add a market currency first", lastServerAnswer: "Server answer", serverRoute: "Server route", send: "Send command", blockedMoney: "Manual money movement is blocked", noFake: "No fake: the screen does not set local success and waits for the server answer.",
    driversTitle: "Drivers: verification and access", driversSubtitle: "Identity, documents, contact, access status and vehicle link. No manual money and no provider.", driverQueue: "Driver queue", driverIdentity: "Identity and documents", driverDocument: "Document request", driverContact: "Contact driver", driverVehicleLink: "Driver ↔ vehicle link", driverActions: ["Open dossier", "Request documents", "Contact", "Send to recheck", "Prepare access block"],
    vehiclesTitle: "Vehicles: inspection and category", vehiclesSubtitle: "Vehicle photos, documents, safety and tariff-category access.", vehicleInspection: "Inspection", vehiclePhotos: "Body and interior photos", vehicleSafety: "Safety", vehicleCategory: "Vehicle category", vehicleActions: ["Open vehicle card", "Request photos", "Mark defect", "Prepare approval", "Prepare line removal"],
    tripsTitle: "Trips: live control", tripsSubtitle: "Route, ETA, statuses, contact, safety, disputed close review.", tripLive: "Live trip", tripRoute: "Route and ETA", tripContacts: "Rider / driver contact", tripSafety: "Safety and SOS", tripActions: ["Open trip", "Contact rider", "Contact driver", "Send safety note", "Prepare close review"],
    complaintsTitle: "Complaints: reply and decision", complaintsSubtitle: "Dedicated reply to rider and driver, contacts, evidence, decision and appeal.", complaintInbox: "Complaint queue", complaintReply: "Official reply", complaintContacts: "Participant contact", complaintEvidence: "Evidence", complaintDecision: "Decision and appeal", complaintActions: ["Reply to rider", "Reply to driver", "Call rider", "Call driver", "Save decision", "Open appeal"],
    balanceTitle: "Balance: gate and audit", balanceSubtitle: "Order access by balance. Top-up only by driver; admin cannot credit or debit money.", balanceGate: "Order access gate", balanceLedger: "Balance ledger", balanceTopup: "Self-topup monitor", balanceBlocks: "Zero-balance blocks", balanceActions: ["Check gate", "Request self-topup", "Open ledger", "Prepare order-block", "Create audit pack"],
    rewardsTitle: "Rewards: eligibility and review", rewardsSubtitle: "Eligibility, anti-fraud, owner approval pack. No payout.", rewardsEligibility: "Eligibility", rewardsFraud: "Anti-fraud", rewardsOwnerPack: "Owner pack", rewardsNoPayout: "Payout blocked", rewardsActions: ["Check eligibility", "Open anti-fraud", "Prepare pack", "Return to review", "Archive decision"],
    contestsTitle: "Contests: ranking and fairness", contestsSubtitle: "Leaderboard, point rules, anti-cheat, prize preparation. No money payout.", contestsLeaderboard: "Leaderboard", contestsRules: "Point rules", contestsAnticheat: "Anti-cheat", contestsPrizePack: "Prize pack", contestsActions: ["Recalculate ranking", "Open anti-cheat", "Freeze disputed point", "Prepare prize pack", "Send to owner"],
    archiveTitle: "Archive: evidence", archiveSubtitle: "Evidence vault, custody chain, redacted export and legal hold.", archiveVault: "Evidence vault", archiveChain: "Custody chain", archiveExport: "Redacted export", archiveHold: "Legal hold", archiveActions: ["Open case", "Check chain", "Prepare export", "Enable legal hold", "Verify hash"],
    reportsTitle: "Reports: daily and SLA", reportsSubtitle: "Daily AI report, complaint SLA, finance summary without money, provider readiness without provider enablement.", reportsDailyAi: "Daily AI", reportsSla: "Complaint SLA", reportsFinance: "Finance summary", reportsExport: "Report package", reportsActions: ["Build daily report", "Check SLA", "Open finance summary", "Prepare export", "Send to owner"],
    managementTitle: "Management: operations center", managementSubtitle: "Dispatch health, regions, operator assignment, safe broadcast.", managementDispatch: "Dispatch", managementRegion: "Regions", managementOperator: "Operator", managementBroadcast: "Safe broadcast", managementActions: ["Check dispatch", "Open region", "Assign operator", "Prepare broadcast", "Open action log"],
    accessTitle: "Access: roles and audit", accessSubtitle: "RBAC matrix, grant and revoke, audit log. Provider keys are blocked.", accessMatrix: "Role matrix", accessGrant: "Grant / revoke", accessAudit: "Access log", accessSecretsBlocked: "Provider keys blocked", accessActions: ["Open matrix", "Prepare grant", "Prepare revoke", "Open audit", "Check key block"],
  },
  uz: {
    protectedTitle: "Tayyor ekranlar himoyalangan", protectedNote: "Arizalar, buyurtmalar va tariflar bu modul bilan almashtirilmaydi. Bu yerda faqat qolgan taksi bo‘limlari ishlaydi.", market: "Bozor", countryInput: "Davlat / bozor", currencyList: "Ko‘p valyuta ro‘yxati", currencyCode: "Valyuta kodi", currencyName: "Valyuta nomi", addCurrency: "Valyuta qo‘shish", removeCurrency: "O‘chirish", selectCurrency: "Valyutani tanlash", activeCurrency: "Faol valyuta", noCurrency: "Avval bozor valyutasini qo‘shing", lastServerAnswer: "Server javobi", serverRoute: "Server yo‘li", send: "Buyruq yuborish", blockedMoney: "Qo‘lda pul harakati taqiqlangan", noFake: "Soxta natija yo‘q: ekran mahalliy muvaffaqiyat qo‘ymaydi, server javobini kutadi.",
    driversTitle: "Haydovchilar: tekshiruv va ruxsat", driversSubtitle: "Shaxs, hujjatlar, aloqa, ruxsat holati va avto bog‘lanishi. Qo‘lda pul va provayder yo‘q.", driverQueue: "Haydovchi navbati", driverIdentity: "Shaxs va hujjatlar", driverDocument: "Hujjat so‘rovi", driverContact: "Haydovchi bilan aloqa", driverVehicleLink: "Haydovchi ↔ avto", driverActions: ["Dossier ochish", "Hujjat so‘rash", "Aloqa qilish", "Qayta tekshiruvga yuborish", "Ruxsat blokini tayyorlash"],
    vehiclesTitle: "Avto: ko‘rik va kategoriya", vehiclesSubtitle: "Avto fotolari, hujjatlar, xavfsizlik va tarif kategoriyasiga ruxsat.", vehicleInspection: "Ko‘rik", vehiclePhotos: "Kuzov va salon fotolari", vehicleSafety: "Xavfsizlik", vehicleCategory: "Avto kategoriyasi", vehicleActions: ["Avto kartasini ochish", "Foto so‘rash", "Nuqson belgilash", "Ruxsat tayyorlash", "Liniyadan olishni tayyorlash"],
    tripsTitle: "Safarlar: jonli nazorat", tripsSubtitle: "Yo‘nalish, vaqt, holatlar, aloqa, xavfsizlik, nizoli yakun tekshiruvi.", tripLive: "Jonli safar", tripRoute: "Yo‘nalish va vaqt", tripContacts: "Mijoz / haydovchi aloqasi", tripSafety: "Xavfsizlik va SOS", tripActions: ["Safarni ochish", "Mijoz bilan aloqa", "Haydovchi bilan aloqa", "Xavfsizlik eslatmasi", "Yakun tekshiruvini tayyorlash"],
    complaintsTitle: "Shikoyatlar: javob va qaror", complaintsSubtitle: "Mijoz va haydovchiga alohida javob, aloqa, dalillar, qaror va apellyatsiya.", complaintInbox: "Shikoyatlar navbati", complaintReply: "Rasmiy javob", complaintContacts: "Ishtirokchilar aloqasi", complaintEvidence: "Dalillar", complaintDecision: "Qaror va apellyatsiya", complaintActions: ["Mijozga javob", "Haydovchiga javob", "Mijozga qo‘ng‘iroq", "Haydovchiga qo‘ng‘iroq", "Qarorni saqlash", "Apellyatsiyani ochish"],
    balanceTitle: "Balans: nazorat va tekshiruv", balanceSubtitle: "Balans bo‘yicha buyurtmaga ruxsat. To‘ldirish faqat haydovchi tomonidan; admin pul qo‘sha olmaydi va yecha olmaydi.", balanceGate: "Buyurtmaga ruxsat gate", balanceLedger: "Balans jurnali", balanceTopup: "Self-topup monitoring", balanceBlocks: "Nol balans bloklari", balanceActions: ["Gate tekshirish", "Self-topup so‘rash", "Ledger ochish", "Order-block tayyorlash", "Audit paket yaratish"],
    rewardsTitle: "Bonuslar: huquq va tekshiruv", rewardsSubtitle: "Bonus huquqi, antifrod, egaga tasdiq paketi. To‘lov yo‘q.", rewardsEligibility: "Bonus huquqi", rewardsFraud: "Antifrod", rewardsOwnerPack: "Ega paketi", rewardsNoPayout: "To‘lov bloklangan", rewardsActions: ["Huquqni tekshirish", "Antifrod ochish", "Paket tayyorlash", "Tekshiruvga qaytarish", "Qarorni arxivlash"],
    contestsTitle: "Tanlovlar: reyting va halollik", contestsSubtitle: "Liderlar jadvali, ball qoidalari, antichit, sovrin tayyorlash. Pul to‘lovi yo‘q.", contestsLeaderboard: "Liderlar jadvali", contestsRules: "Ball qoidalari", contestsAnticheat: "Antichit", contestsPrizePack: "Sovrin paketi", contestsActions: ["Reytingni qayta hisoblash", "Antichit ochish", "Bahsli ballni muzlatish", "Sovrin paketi tayyorlash", "Egaga yuborish"],
    archiveTitle: "Arxiv: dalillar", archiveSubtitle: "Dalillar ombori, saqlash zanjiri, tahrirlangan eksport va legal hold.", archiveVault: "Dalillar ombori", archiveChain: "Saqlash zanjiri", archiveExport: "Tahrirlangan eksport", archiveHold: "Legal hold", archiveActions: ["Ishni ochish", "Zanjirni tekshirish", "Eksport tayyorlash", "Legal hold yoqish", "Hash tekshirish"],
    reportsTitle: "Hisobotlar: kunlik va SLA", reportsSubtitle: "Kunlik sunʼiy intellekt hisoboti, shikoyat xizmati muddati, pulsiz moliyaviy xulosa, provayder yoqmasdan tayyorgarlik.", reportsDailyAi: "Kunlik AI", reportsSla: "Shikoyat SLA", reportsFinance: "Moliyaviy xulosa", reportsExport: "Hisobot paketi", reportsActions: ["Kunlik hisobot yig‘ish", "SLA tekshirish", "Moliyaviy xulosani ochish", "Eksport tayyorlash", "Egaga yuborish"],
    managementTitle: "Boshqaruv: operatsion markaz", managementSubtitle: "Dispetcher holati, hududlar, operator tayinlash, xavfsiz e’lon.", managementDispatch: "Dispetcherlik", managementRegion: "Hududlar", managementOperator: "Operator", managementBroadcast: "Xavfsiz e’lon", managementActions: ["Dispetcherlikni tekshirish", "Hududni ochish", "Operator tayinlash", "E’lon tayyorlash", "Harakat jurnalini ochish"],
    accessTitle: "Kirish: rollar va audit", accessSubtitle: "RBAC matrix, huquq berish va qaytarish, audit jurnali. Provider kalitlari bloklangan.", accessMatrix: "Rollar matritsasi", accessGrant: "Berish / qaytarish", accessAudit: "Kirish jurnali", accessSecretsBlocked: "Provider kalitlari bloklangan", accessActions: ["Matritsani ochish", "Berishni tayyorlash", "Qaytarishni tayyorlash", "Auditni ochish", "Kalit blokini tekshirish"],
  },
  zh: {
    protectedTitle: "已完成页面受保护", protectedNote: "申请、订单和费率不会被此模块替换。这里仅处理其余出租车模块。", market: "市场", countryInput: "国家 / 市场", currencyList: "多币种列表", currencyCode: "币种代码", currencyName: "币种名称", addCurrency: "添加币种", removeCurrency: "删除", selectCurrency: "选择币种", activeCurrency: "当前币种", noCurrency: "请先添加市场币种", lastServerAnswer: "服务器响应", serverRoute: "服务器路径", send: "发送命令", blockedMoney: "禁止手动资金变动", noFake: "无假成功：页面不设置本地成功，等待服务器响应。",
    driversTitle: "司机：审核与准入", driversSubtitle: "身份、文件、联系、准入状态和车辆绑定。无手动资金，无服务商。", driverQueue: "司机队列", driverIdentity: "身份和文件", driverDocument: "文件请求", driverContact: "联系司机", driverVehicleLink: "司机 ↔ 车辆", driverActions: ["打开档案", "请求文件", "联系", "发送复审", "准备准入限制"],
    vehiclesTitle: "车辆：检查与类别", vehiclesSubtitle: "车辆照片、文件、安全和费率类别准入。", vehicleInspection: "检查", vehiclePhotos: "车身和内饰照片", vehicleSafety: "安全", vehicleCategory: "车辆类别", vehicleActions: ["打开车辆卡", "请求照片", "标记缺陷", "准备准入", "准备下线"],
    tripsTitle: "行程：实时控制", tripsSubtitle: "路线、到达时间、状态、联系、安全和争议结束复核。", tripLive: "实时行程", tripRoute: "路线和时间", tripContacts: "乘客 / 司机联系", tripSafety: "安全和 SOS", tripActions: ["打开行程", "联系乘客", "联系司机", "发送安全备注", "准备结束复核"],
    complaintsTitle: "投诉：回复与决定", complaintsSubtitle: "分别回复乘客和司机，联系、证据、决定和申诉。", complaintInbox: "投诉队列", complaintReply: "正式回复", complaintContacts: "参与方联系", complaintEvidence: "证据", complaintDecision: "决定和申诉", complaintActions: ["回复乘客", "回复司机", "致电乘客", "致电司机", "保存决定", "打开申诉"],
    balanceTitle: "余额：准入和审计", balanceSubtitle: "按余额控制接单准入。充值仅司机自助；管理员不能加钱或扣钱。", balanceGate: "接单准入", balanceLedger: "余额日志", balanceTopup: "自助充值监控", balanceBlocks: "零余额限制", balanceActions: ["检查准入", "请求自助充值", "打开日志", "准备接单限制", "生成审计包"],
    rewardsTitle: "奖励：资格与审核", rewardsSubtitle: "奖励资格、反欺诈、所有者审批包。无发放。", rewardsEligibility: "奖励资格", rewardsFraud: "反欺诈", rewardsOwnerPack: "所有者审批包", rewardsNoPayout: "发放已阻止", rewardsActions: ["检查资格", "打开反欺诈", "准备审批包", "退回复核", "归档决定"],
    contestsTitle: "竞赛：排名与公平", contestsSubtitle: "排行榜、积分规则、反作弊、奖品准备。无资金发放。", contestsLeaderboard: "排行榜", contestsRules: "积分规则", contestsAnticheat: "反作弊", contestsPrizePack: "奖品包", contestsActions: ["重算排名", "打开反作弊", "冻结争议积分", "准备奖品包", "发送给所有者"],
    archiveTitle: "归档：证据", archiveSubtitle: "证据库、保管链、脱敏导出和法律保留。", archiveVault: "证据库", archiveChain: "保管链", archiveExport: "脱敏导出", archiveHold: "Legal hold", archiveActions: ["打开案件", "检查保管链", "准备导出", "启用法律保留", "校验 hash"],
    reportsTitle: "报告：每日与 SLA", reportsSubtitle: "每日智能报告、投诉服务时限、无资金财务摘要、不开启服务商的就绪状态。", reportsDailyAi: "每日智能", reportsSla: "投诉 SLA", reportsFinance: "财务摘要", reportsExport: "报告包", reportsActions: ["生成每日报告", "检查 SLA", "打开财务摘要", "准备导出", "发送给所有者"],
    managementTitle: "管理：运营中心", managementSubtitle: "调度健康、地区、操作员分配、安全公告。", managementDispatch: "调度", managementRegion: "地区", managementOperator: "操作员", managementBroadcast: "安全公告", managementActions: ["检查调度", "打开地区", "分配操作员", "准备公告", "打开操作日志"],
    accessTitle: "权限：角色与审计", accessSubtitle: "角色权限矩阵、授权和撤销、审计日志。服务商密钥已阻止。", accessMatrix: "角色矩阵", accessGrant: "授权 / 撤销", accessAudit: "访问日志", accessSecretsBlocked: "服务商密钥已阻止", accessActions: ["打开矩阵", "准备授权", "准备撤销", "打开审计", "检查密钥阻止"],
  },
};

const screens026BFix4 = new Set<TaxiRemainingScreen026BFix4>(["drivers", "vehicles", "trips", "complaints", "balance", "rewards", "contests", "archive", "reports", "management", "access"]);
const normalizeBase026BFix4 = (config: AdminApiConfig): string => String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
const adminHeaders026BFix4 = (config: AdminApiConfig): Record<string, string> => ({ "content-type": "application/json", "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "" });
const normalizeCurrencyCode026BFix4 = (value: string): string => value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);

function uniqueCurrencyList026BFix4(items: CurrencyItem026BFix4[]): CurrencyItem026BFix4[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const code = normalizeCurrencyCode026BFix4(item.code);
    if (!code || seen.has(code)) return false;
    seen.add(code);
    return true;
  });
}

function seedCurrencies026BFix4(): CurrencyItem026BFix4[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem("sabi.taxi.admin.dynamicCurrencyList.v1");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CurrencyItem026BFix4[];
    return uniqueCurrencyList026BFix4(Array.isArray(parsed) ? parsed : []);
  } catch {
    return [];
  }
}

export function TaxiAdminRemainingOps026BFix4({ language, config, setNotice, screen }: Props026BFix4) {
  const copy = COPY026B_FIX4[language] || COPY026B_FIX4.ru;
  const safeScreen: TaxiRemainingScreen026BFix4 = screens026BFix4.has(screen as TaxiRemainingScreen026BFix4) ? (screen as TaxiRemainingScreen026BFix4) : "drivers";
  const [country, setCountry] = useState("");
  const [newCurrencyCode, setNewCurrencyCode] = useState("");
  const [newCurrencyName, setNewCurrencyName] = useState("");
  const [currencyList, setCurrencyList] = useState<CurrencyItem026BFix4[]>(() => seedCurrencies026BFix4());
  const [selectedCurrency, setSelectedCurrency] = useState(() => currencyList[0]?.code || "");
  const [lastResult, setLastResult] = useState<CommandResult026BFix4>(null);
  const [busyAction, setBusyAction] = useState("");
  const route = ROUTE026B_FIX4[safeScreen];
  const selectedCurrencyName = currencyList.find((item) => item.code === selectedCurrency)?.name || "";

  const saveCurrencyList = (next: CurrencyItem026BFix4[]) => {
    const clean = uniqueCurrencyList026BFix4(next.map((item) => ({ ...item, code: normalizeCurrencyCode026BFix4(item.code) })));
    setCurrencyList(clean);
    if (typeof window !== "undefined") window.localStorage.setItem("sabi.taxi.admin.dynamicCurrencyList.v1", JSON.stringify(clean));
    if (!selectedCurrency && clean[0]) setSelectedCurrency(clean[0].code);
  };

  const addCurrency = () => {
    const code = normalizeCurrencyCode026BFix4(newCurrencyCode);
    if (!code) {
      setNotice(copy.noCurrency);
      return;
    }
    saveCurrencyList([...currencyList, { code, name: newCurrencyName.trim() || code, source: "operator" }]);
    setNewCurrencyCode("");
    setNewCurrencyName("");
  };

  const removeCurrency = (code: string) => {
    const next = currencyList.filter((item) => item.code !== code);
    saveCurrencyList(next);
    if (selectedCurrency === code) setSelectedCurrency(next[0]?.code || "");
  };

  const sendCommand = async (action: string) => {
    if (!selectedCurrency) {
      setNotice(copy.noCurrency);
      return;
    }
    const at = new Date().toISOString();
    setBusyAction(action);
    try {
      const response = await fetch(`${normalizeBase026BFix4(config)}${route}`, {
        method: "POST",
        headers: adminHeaders026BFix4(config),
        body: JSON.stringify({
          marker: MARKER026B_FIX4,
          screen: safeScreen,
          action,
          country: country.trim(),
          currency: { code: selectedCurrency, name: selectedCurrencyName, source: "operator_selected_dynamic_list" },
          safety: { localFakeSuccess: false, providerCallRequested: false, walletMutationRequested: false, moneyMovementRequested: false },
        }),
      });
      const text = await response.text();
      setLastResult({ route, status: response.status, ok: response.ok, text: text.slice(0, 600), at });
      setNotice(`${response.status} · ${route}`);
    } catch (error) {
      setLastResult({ route, status: "network_error", ok: false, text: error instanceof Error ? error.message : String(error), at });
      setNotice(`network_error · ${route}`);
    } finally {
      setBusyAction("");
    }
  };

  const currencyDock = (
    <aside className="taxi026bCurrencyDock" data-taxi-multicurrency-list="dynamic-operator-list-no-fixed-whitelist">
      <strong>{copy.currencyList}</strong>
      <label><span>{copy.countryInput}</span><input value={country} onChange={(event) => setCountry(event.target.value)} /></label>
      <div className="taxi026bCurrencyInputs">
        <label><span>{copy.currencyCode}</span><input value={newCurrencyCode} onChange={(event) => setNewCurrencyCode(event.target.value)} /></label>
        <label><span>{copy.currencyName}</span><input value={newCurrencyName} onChange={(event) => setNewCurrencyName(event.target.value)} /></label>
        <button type="button" onClick={addCurrency}>{copy.addCurrency}</button>
      </div>
      <label data-taxi-multicurrency-select="ready"><span>{copy.selectCurrency}</span><select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)}><option value="">{copy.noCurrency}</option>{currencyList.map((item) => <option key={item.code} value={item.code}>{item.code} · {item.name}</option>)}</select></label>
      <div className="taxi026bCurrencyPills">{currencyList.map((item) => <button type="button" key={item.code} onClick={() => removeCurrency(item.code)}><strong>{item.code}</strong><span>{copy.removeCurrency}</span></button>)}</div>
      <small>{copy.activeCurrency}: {selectedCurrency || copy.noCurrency}</small>
    </aside>
  );

  const commandButtons = (actions: string[]) => (
    <div className="taxi026bActions">{actions.map((action) => <button key={action} type="button" disabled={busyAction === action} onClick={() => void sendCommand(action)}>{busyAction === action ? copy.send : action}</button>)}</div>
  );

  const serverPanel = (
    <aside className="taxi026bServerPanel"><strong>{copy.lastServerAnswer}</strong><span>{lastResult ? `${lastResult.status} · ${lastResult.at}` : copy.noFake}</span><small>{copy.serverRoute}: {route}</small><pre>{lastResult?.text || copy.blockedMoney}</pre></aside>
  );

  const screenNode = useMemo(() => {
    switch (safeScreen) {
      case "drivers": return <section className="taxi026bDrivers" data-taxi-ops-screen="drivers-qualification-board"><header><h2>{copy.driversTitle}</h2><p>{copy.driversSubtitle}</p></header><div className="taxi026bFour"><article><b>{copy.driverQueue}</b><span>driverId / phone / region / status</span></article><article><b>{copy.driverIdentity}</b><span>passport · license · face match</span></article><article><b>{copy.driverDocument}</b><span>missing docs request gate</span></article><article><b>{copy.driverVehicleLink}</b><span>vehicle bind audit</span></article></div><div className="taxi026bContactCard"><strong>{copy.driverContact}</strong><span>call draft · chat draft · evidence note</span></div>{commandButtons(copy.driverActions)}</section>;
      case "vehicles": return <section className="taxi026bVehicles" data-taxi-ops-screen="vehicles-inspection-board"><header><h2>{copy.vehiclesTitle}</h2><p>{copy.vehiclesSubtitle}</p></header><div className="taxi026bInspection"><article><b>{copy.vehicleInspection}</b><span>vin / plate / year / color</span></article><article><b>{copy.vehiclePhotos}</b><span>front · back · left · right · salon</span></article><article><b>{copy.vehicleSafety}</b><span>belt · tire · damage · cleanliness</span></article><article><b>{copy.vehicleCategory}</b><span>economy / comfort / business / delivery gate</span></article></div>{commandButtons(copy.vehicleActions)}</section>;
      case "trips": return <section className="taxi026bTrips" data-taxi-ops-screen="trips-live-command-center"><header><h2>{copy.tripsTitle}</h2><p>{copy.tripsSubtitle}</p></header><div className="taxi026bTimeline"><article><b>{copy.tripLive}</b><span>requested → accepted → arrived → onboard → finished</span></article><article><b>{copy.tripRoute}</b><span>A/B, ETA drift, price lock, peak marker</span></article><article><b>{copy.tripContacts}</b><span>rider call · driver call · chat draft</span></article><article><b>{copy.tripSafety}</b><span>SOS · suspicious cancel · route deviation</span></article></div>{commandButtons(copy.tripActions)}</section>;
      case "complaints": return <section className="taxi026bComplaints" data-taxi-ops-screen="complaints-reply-contact-decision-desk"><header><h2>{copy.complaintsTitle}</h2><p>{copy.complaintsSubtitle}</p></header><div className="taxi026bComplaintGrid"><article><b>{copy.complaintInbox}</b><span>priority · SLA · role · trip</span></article><article className="reply"><b>{copy.complaintReply}</b><textarea placeholder={copy.complaintReply} /></article><article><b>{copy.complaintContacts}</b><span>rider phone · driver phone · chat draft</span></article><article><b>{copy.complaintEvidence}</b><span>route · audio flag · photo · message</span></article><article><b>{copy.complaintDecision}</b><span>warning · points · lock · appeal</span></article></div>{commandButtons(copy.complaintActions)}</section>;
      case "balance": return <section className="taxi026bBalance" data-taxi-ops-screen="balance-gate-self-topup-ledger"><header><h2>{copy.balanceTitle}</h2><p>{copy.balanceSubtitle}</p></header><div className="taxi026bBalanceGrid"><article><b>{copy.balanceGate}</b><span>positive balance required for orders</span></article><article><b>{copy.balanceLedger}</b><span>charges · commission · holds · audit</span></article><article><b>{copy.balanceTopup}</b><span>driver self-topup only</span></article><article><b>{copy.balanceBlocks}</b><span>zero balance → no order assignment</span></article></div>{commandButtons(copy.balanceActions)}</section>;
      case "rewards": return <section className="taxi026bRewards" data-taxi-ops-screen="rewards-eligibility-fraud-owner-pack"><header><h2>{copy.rewardsTitle}</h2><p>{copy.rewardsSubtitle}</p></header><div className="taxi026bCards"><article><b>{copy.rewardsEligibility}</b><span>orders · stars · cleanliness · complaints</span></article><article><b>{copy.rewardsFraud}</b><span>duplicate trips · cancel abuse · device risk</span></article><article><b>{copy.rewardsOwnerPack}</b><span>approval evidence package</span></article><article><b>{copy.rewardsNoPayout}</b><span>{copy.blockedMoney}</span></article></div>{commandButtons(copy.rewardsActions)}</section>;
      case "contests": return <section className="taxi026bContests" data-taxi-ops-screen="contests-leaderboard-anticheat-prize-pack"><header><h2>{copy.contestsTitle}</h2><p>{copy.contestsSubtitle}</p></header><div className="taxi026bLeaderboard"><article><b>{copy.contestsLeaderboard}</b><span>rank · points · country · season</span></article><article><b>{copy.contestsRules}</b><span>orders + politeness + car cleanliness + stars</span></article><article><b>{copy.contestsAnticheat}</b><span>AI risk · manual review · freeze</span></article><article><b>{copy.contestsPrizePack}</b><span>1 / 2 / 3 package for owner</span></article></div>{commandButtons(copy.contestsActions)}</section>;
      case "archive": return <section className="taxi026bArchive" data-taxi-ops-screen="archive-evidence-vault-chain-export"><header><h2>{copy.archiveTitle}</h2><p>{copy.archiveSubtitle}</p></header><div className="taxi026bVault"><article><b>{copy.archiveVault}</b><span>caseId · tripId · complaintId · driverId</span></article><article><b>{copy.archiveChain}</b><span>created · reviewed · sealed · exported</span></article><article><b>{copy.archiveExport}</b><span>redaction · package hash · recipient</span></article><article><b>{copy.archiveHold}</b><span>legal hold reason · owner note</span></article></div>{commandButtons(copy.archiveActions)}</section>;
      case "reports": return <section className="taxi026bReports" data-taxi-ops-screen="reports-daily-ai-sla-finance-export"><header><h2>{copy.reportsTitle}</h2><p>{copy.reportsSubtitle}</p></header><div className="taxi026bReportRows"><article><b>{copy.reportsDailyAi}</b><span>complaints daily review · risk summary</span></article><article><b>{copy.reportsSla}</b><span>open · overdue · solved · appealed</span></article><article><b>{copy.reportsFinance}</b><span>read-only summary · no mutation</span></article><article><b>{copy.reportsExport}</b><span>owner package · archive hash</span></article></div>{commandButtons(copy.reportsActions)}</section>;
      case "management": return <section className="taxi026bManagement" data-taxi-ops-screen="management-dispatch-region-operator-broadcast"><header><h2>{copy.managementTitle}</h2><p>{copy.managementSubtitle}</p></header><div className="taxi026bOpsMap"><article><b>{copy.managementDispatch}</b><span>queue health · provider disabled · fallback rules</span></article><article><b>{copy.managementRegion}</b><span>country · city · service zone · peak state</span></article><article><b>{copy.managementOperator}</b><span>assignment · shift · action scope</span></article><article><b>{copy.managementBroadcast}</b><span>safe message · target · owner note</span></article></div>{commandButtons(copy.managementActions)}</section>;
      case "access": return <section className="taxi026bAccess" data-taxi-ops-screen="access-rbac-grant-revoke-audit"><header><h2>{copy.accessTitle}</h2><p>{copy.accessSubtitle}</p></header><div className="taxi026bAccessGrid"><article><b>{copy.accessMatrix}</b><span>owner · deputy · manager · accountant · support</span></article><article><b>{copy.accessGrant}</b><span>prepared change only · audit required</span></article><article><b>{copy.accessAudit}</b><span>who · what · route · time · reason</span></article><article><b>{copy.accessSecretsBlocked}</b><span>no raw secret display</span></article></div>{commandButtons(copy.accessActions)}</section>;
      default: return null;
    }
  }, [copy, safeScreen, busyAction, country, selectedCurrency, selectedCurrencyName]);

  return <div className="taxi026bFix4Shell" data-taxi-admin-ui-026b-fix4={MARKER026B_FIX4}><div className="taxi026bProtected"><strong>{copy.protectedTitle}</strong><span>{copy.protectedNote}</span></div><div className="taxi026bLayout">{screenNode}<div className="taxi026bSide">{currencyDock}{serverPanel}<aside className="taxi026bSafety"><strong>{copy.blockedMoney}</strong><span>{copy.noFake}</span></aside></div></div></div>;
}
