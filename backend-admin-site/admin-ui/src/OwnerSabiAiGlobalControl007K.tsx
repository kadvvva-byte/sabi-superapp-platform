import type { AdminLanguage } from "./admin-i18n";

type OwnerSabiAiGlobalCopy007K = Record<string, string>;
type Props007K = { language: AdminLanguage; surface: "dashboard" | "owner" };

const MARKER007K = "ADMIN-UI-OWNER-SABI-AI-GLOBAL-CONTROL-007K";

const RU007K: OwnerSabiAiGlobalCopy007K = {
  title: "Главный ИИ Саби владельца",
  subtitle: "Отдельный контролёр всей админ-панели: Такси, Мессенджер, Стрим, кошелёк, платежи, провайдеры, пользователи, риск, финансы, бизнес, безопасность и аудит.",
  ownerOnly: "Только для владельца",
  globalControl: "Контроль всей админ-панели",
  subscriberAi: "ИИ-помощник для абонентов отдельно",
  subscriberAiText: "Пользовательский помощник помогает клиентам и водителям. Главный ИИ Саби владельца не смешивается с ним и отвечает за контроль бизнеса.",
  dailyReport: "Ежедневный отчёт лично владельцу",
  dailyReportText: "Каждый день ИИ Саби должен собрать итоги по всем модулям, выделить нарушения, риски, деньги, жалобы, спорные действия админов и отправить отчёт именно владельцу.",
  urgentWarnings: "Срочные предупреждения владельцу",
  urgentWarningsText: "При критичных нарушениях ИИ Саби должен сразу предупреждать владельца: опасная жалоба, подозрительный баланс, сбой оплаты, риск провайдера, блокировка, доступ персонала или аварийная ситуация.",
  noFake: "Без фейка",
  noFakeText: "Этот интерфейс фиксирует глобальную модель контроля. Автоматическая отправка отчёта, расписание и реальные уведомления владельцу будут отдельным серверным этапом с аудитом и разрешениями.",
  modulesTitle: "Какие модули контролирует",
  taxi: "Taksi",
  taxiText: "Заявки, водители, авто, поездки, жалобы, баланс, подарки, отчёты.",
  messenger: "Messenger",
  messengerText: "Жалобы, блокировки, каналы, группы, боты, безопасность общения.",
  stream: "Stream",
  streamText: "Прямые эфиры, подарки, модерация, нарушения, выплаты и риск авторов.",
  wallet: "Кошелёк и платежи",
  walletText: "Баланс, удержание, списание, выпуск, ссылки провайдера, расчёты и граница выплат.",
  users: "Пользователи и доступ",
  usersText: "Проверка клиента, роли, персонал, подозрительные входы, разрешения и действия только владельца.",
  business: "Бизнес и продавцы",
  businessText: "Бизнес-аккаунты, проверка бизнеса, счета, риск продавца, готовность Эйрваллекс и провайдера.",
  reports: "Финансы и отчёты",
  reportsText: "Доход, комиссии, рост, спорные операции, ежедневная сводка владельцу.",
  security: "Безопасность и экстренные ситуации",
  securityText: "Секреты, роли, аварийные действия, след аудита и критичные блокировки.",
  workflowTitle: "Порядок ежедневного контроля",
  stepOne: "1. Собрать сигналы из всех модулей",
  stepTwo: "2. Найти нарушения, риски и подозрительные действия",
  stepThree: "3. Составить понятный отчёт на выбранном языке",
  stepFour: "4. Отправить отчёт лично владельцу",
  stepFive: "5. Создать срочное предупреждение при критичном риске",
  stepSix: "6. Записать аудит и ждать решения владельца",
  languageTitle: "Язык отчёта",
  languageText: "Отчёт, предупреждения и экран контроля должны быть на одном выбранном языке. Технические идентификаторы, маршруты и исходные поля остаются техническими.",
  plannedStage: "Следующий отдельный этап",
  plannedStageText: "После интерфейсного контроля сделаем серверную основу: расписание ежедневного отчёта, адресат владельца, каналы уведомлений, аудит и безопасные разрешения.",
  dashboardSurface: "Короткая сводка на панели",
  ownerSurface: "Полный центр владельца",
};

const EN007K: OwnerSabiAiGlobalCopy007K = {
  title: "principal Sabi sunʼiy intellekti controller",
  subtitle: "A separate controller for the whole admin area: taxi, messenger, stream, balance accounts, charges, external services, users, risk, fin ance, business, security, and tekshiruv.",
  ownerOnly: "principal only",
  globalControl: "Whole Admin control",
  subscriberAi: "Subscriber AI assistant is separate",
  subscriberAiText: "The user assistant helps customers and drivers. principal Sabi sunʼiy intellekti is not mixed with it and controls the business.",
  dailyReport: "Daily report to the owner personally",
  dailyReportText: "Every day, Sabi AI must collect all module results, highlight violations, risks, money, complaints, and suspicious admin actions, then send the report personally to the owner.",
  urgentWarnings: "Urgent owner warnings",
  urgentWarningsText: "For critical violations Sabi sunʼiy intellekti must warn the principal immediately: safety complaint, suspicious balance, charge failure, external service risk, blocking, staff access or emergency.",
  noFake: "No false success",
  noFakeText: "This interface records the global control model. Automatic report delivery, scheduling, and real owner notifications will be a separate protected stage with audit and permissions.",
  modulesTitle: "Modules under control",
  taxi: "Taksi",
  taxiText: "Applications, drivers, vehicles, trips, complaints, balance, gifts, reports.",
  messenger: "Messenger",
  messengerText: "Complaints, blocks, channels, groups, bots, communication safety.",
  stream: "Stream",
  streamText: "Live, gifts, moderation, violations, payouts, creator risk.",
  wallet: "Balance account and charges",
  walletText: "Balance, hold, capture, release, external service refs, settlement, withdrawal boundary.",
  users: "Users and access",
  usersText: "KYC, roles, staff, suspicious logins, permissions, owner-only actions.",
  business: "Business and merchant",
  businessText: "Business accounts, KYB, invoices, merchant risk, Airwallex/external service readiness.",
  reports: "Fin ance and reports",
  reportsText: "Revenue, commissions, growth, disputed operations, daily owner summary.",
  security: "Security and emergency",
  securityText: "Secrets, roles, emergency actions, tekshiruv trail, critical locks.",
  workflowTitle: "Daily control order",
  stepOne: "1. Collect signals from all modules",
  stepTwo: "2. Detect violations, risks and suspicious actions",
  stepThree: "3. Prepare a clear report in the selected language",
  stepFour: "4. Send the report to the owner personally",
  stepFive: "5. Create urgent warning for critical risk",
  stepSix: "6. Write tekshiruv and wait for principal decision",
  languageTitle: "Report language",
  languageText: "Reports, warnings and the control screen must use one selected language. Technical IDs, routes and raw fields stay technical.",
  plannedStage: "Next separate stage",
  plannedStageText: "After the interface control, we will build the protected foundation: daily report schedule, owner recipient, notification channels, audit, and safe permissions.",
  dashboardSurface: "Short Dashboard summary",
  ownerSurface: "Full owner center",
};

const UZ007K: OwnerSabiAiGlobalCopy007K = {
  title: "Ega uchun bosh Sabi sun ʼiy intellekti nazoratchisi",
  subtitle: "Butun Admin uchun alohida nazoratchi: Taksi, Messenjer, Strim, Hamyon, to ‘lovlar, provayderlar, foydalanuvchilar, xavf, moliya, biznes, xavfsizlik va tekshiruv.",
  ownerOnly: "Faqat egaga",
  globalControl: "Butun Admin nazorati",
  subscriberAi: "Abonentlar AI yordamchisi alohida",
  subscriberAiText: "Foydalanuvchi yordamchisi mijozlar va haydovchilarga yordam beradi. Ega Sabi sun ʼiy intellekti u bilan aralashmaydi va biznesni nazorat qiladi.",
  dailyReport: "Kundalik hisobot aynan egaga",
  dailyReportText: "Har kuni Sabi sun ʼiy intellekti barcha modullar natijasini yig ‘ib, qoidabuzarliklar, xavflar, pul, shikoyatlar, shubhali admin harakatlarini ajratishi va hisobotni aynan egaga yuborishi kerak.",
  urgentWarnings: "Egaga shoshilinch ogohlantirishlar",
  urgentWarningsText: "Muhim qoidabuzarliklarda Sabi sun ʼiy intellekti egani darhol ogohlantirishi kerak: xavfsizlik shikoyati, shubhali balans, to ‘lov nosozligi, provayder xavfi, bloklash, staff access yoki emergency.",
  noFake: "Soxta natija yo ‘q",
  noFakeText: "Bu interfeys global nazorat modelini belgilaydi. Avtomatik hisobot yuborish, jadval va haqiqiy egasi notification alohida server bosqichida tekshiruv va ruxsatlar bilan qilinadi.",
  modulesTitle: "Nazorat qilinadigan modullar",
  taxi: "Taksi",
  taxiText: "Arizalar, haydovchilar, avtomobillar, safarlar, shikoyatlar, balans, sovg ‘alar, hisobotlar.",
  messenger: "Messenger",
  messengerText: "Shikoyatlar, bloklash, kanallar, guruhlar, botlar, muloqot xavfsizligi.",
  stream: "Stream",
  streamText: "Live, sovg ‘alar, moderatsiya, qoidabuzarliklar, to ‘lov chiqarishs, creator risk.",
  wallet: "Hamyon va to ‘lovlar",
  walletText: "Balans, hold, capture, release, external service refs, settlement, withdrawal boundary.",
  users: "Foydalanuvchilar va kirish",
  usersText: "KYC, rollar, staff, shubhali loginlar, ruxsatlar, faqat egaga tegishli harakatlar.",
  business: "Business va merchant",
  businessText: "Biznes akkauntlar, KYB, invoices, merchant risk, Airwallex/external service readiness.",
  reports: "Moliya va hisobotlar",
  reportsText: "Daromad, komissiyalar, o ‘sish, bahsli operatsiyalar, kundalik ega xulosasi.",
  security: "Security va emergency",
  securityText: "Sirlar, rollar, favqulodda harakatlar, tekshiruv trail, muhim bloklar.",
  workflowTitle: "Kundalik nazorat tartibi",
  stepOne: "1. Barcha modullardan signallarni yig ‘ish",
  stepTwo: "2. Qoidabuzarlik, xavf va shubhali harakatlarni topish",
  stepThree: "3. Tanlangan tilda aniq hisobot tayyorlash",
  stepFour: "4. Hisobotni aynan egaga yuborish",
  stepFive: "5. Muhim xavf bo ‘lsa shoshilinch ogohlantirish yaratish",
  stepSix: "6. Tekshiruv yozish va ega qarorini kutish",
  languageTitle: "Hisobot tili",
  languageText: "Hisobot, ogohlantirish va nazorat ekrani bitta tanlangan tilda bo‘lishi kerak. Texnik ID, route va raw maydonlar texnik holda qoladi.",
  plannedStage: "Keyingi alohida bosqich",
  plannedStageText: "interfeys nazoratidan keyin server asosini qilamiz: kundalik hisobot jadvali, ega adresati, notification kanallari, tekshiruv va xavfsiz ruxsatlar.",
  dashboardSurface: "Dashboard qisqa xulosa",
  ownerSurface: "To ‘liq ega markazi",
};

const ZH007K: OwnerSabiAiGlobalCopy007K = {
  title: "所有者萨比人工智能总控制器",
  subtitle: "整个管理后台的独立控制器：出租车、消息、直播、钱包、支付、服务商、用户、风险、财务、业务、安全和审计。",
  ownerOnly: "仅所有者",
  globalControl: "整个管理后台控制",
  subscriberAi: "用户人工智能助手独立",
  subscriberAiText: "用户助手帮助客户和司机。所有者萨比人工智能不与它混合，负责业务控制。",
  dailyReport: "每日报告亲自发送给所有者",
  dailyReportText: "萨比人工智能每天必须汇总所有模块结果，突出违规、风险、资金、投诉、可疑管理员操作，并将报告亲自发送给所有者。",
  urgentWarnings: "所有者紧急警告",
  urgentWarningsText: "出现严重违规时，萨比人工智能必须立即警告所有者：安全投诉、可疑余额、支付失败、服务商风险、封禁、员工权限或紧急情况。",
  noFake: "不做假成功",
  noFakeText: "此界面固定全局控制模型。自动报告发送、计划任务和真实所有者通知将在独立服务器阶段实现，并带有审计和权限。",
  modulesTitle: "控制的模块",
  taxi: "Taksi",
  taxiText: "申请、司机、车辆、行程、投诉、余额、礼物、报告。",
  messenger: "Messenger",
  messengerText: "投诉、封禁、频道、群组、机器人、通信安全。",
  stream: "Stream",
  streamText: "直播、礼物、审核、违规、付款和创作者风险。",
  wallet: "钱包和支付",
  walletText: "余额、冻结、扣款、释放、提供商引用、结算和付款边界。",
  users: "用户和访问",
  usersText: "客户验证、角色、员工、可疑登录、权限和仅所有者操作。",
  business: "业务和商家",
  businessText: "业务账户、企业验证、发票、商家风险、空中云汇和提供商就绪状态。",
  reports: "财务和报告",
  reportsText: "收入、佣金、增长、争议操作、每日所有者摘要。",
  security: "安全和紧急情况",
  securityText: "密钥、角色、紧急操作、审计轨迹、关键锁定。",
  workflowTitle: "每日控制顺序",
  stepOne: "1. 从所有模块收集信号",
  stepTwo: "2. 发现违规、风险和可疑操作",
  stepThree: "3. 用选定语言准备清晰报告",
  stepFour: "4. 将报告亲自发送给所有者",
  stepFive: "5. 对关键风险创建紧急警告",
  stepSix: "6. 写入审计并等待所有者决定",
  languageTitle: "报告语言",
  languageText: "报告、警告和控制屏幕必须使用同一种选定语言。技术标识符、路由和原始字段保持技术原样。",
  plannedStage: "下一个独立阶段",
  plannedStageText: "界面控制之后将构建服务器基础：每日报告计划、所有者收件人、通知渠道、审计和安全权限。",
  dashboardSurface: "看板简短摘要",
  ownerSurface: "完整所有者中心",
};

const COPY007K: Record<AdminLanguage, OwnerSabiAiGlobalCopy007K> = { ru: RU007K, en: EN007K, uz: UZ007K, zh: ZH007K };
const tx007K = (language: AdminLanguage, key: string) => COPY007K[language]?.[key] ?? EN007K[key] ?? key;

function AiModuleCard007K({ title, text }: { title: string; text: string }) {
  return <article className="ownerAi007k-module"><b>{title}</b><span>{text}</span></article>;
}

export function OwnerSabiAiGlobalControl007KPanel({ language, surface }: Props007K) {
  const moduleKeys = ["taxi", "messenger", "stream", "wallet", "users", "business", "reports", "security"];
  const workflowKeys = ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive", "stepSix"];
  return <section className="ownerAi007k" data-admin-ui-owner-sabi-ai-007k-global-control="ready" data-admin-ui-owner-sabi-ai-007k-owner-only="ready" data-admin-ui-owner-sabi-ai-007k-language-quality="ready">
    <header className="ownerAi007k-hero">
      <div>
        <p>{MARKER007K} · {surface === "owner" ? tx007K(language, "ownerSurface") : tx007K(language, "dashboardSurface")}</p>
        <h1>{tx007K(language, "title")}</h1>
        <span>{tx007K(language, "subtitle")}</span>
      </div>
      <div className="ownerAi007k-badge"><b>{tx007K(language, "ownerOnly")}</b><em>{tx007K(language, "globalControl")}</em></div>
    </header>

    <div className="ownerAi007k-grid">
      <article className="ownerAi007k-card" data-admin-ui-owner-sabi-ai-007k-subscriber-ai-separated="ready">
        <h2>{tx007K(language, "subscriberAi")}</h2>
        <p>{tx007K(language, "subscriberAiText")}</p>
      </article>
      <article className="ownerAi007k-card" data-admin-ui-owner-sabi-ai-007k-daily-owner-report="planned">
        <h2>{tx007K(language, "dailyReport")}</h2>
        <p>{tx007K(language, "dailyReportText")}</p>
      </article>
      <article className="ownerAi007k-card danger" data-admin-ui-owner-sabi-ai-007k-urgent-owner-warnings="planned">
        <h2>{tx007K(language, "urgentWarnings")}</h2>
        <p>{tx007K(language, "urgentWarningsText")}</p>
      </article>
      <article className="ownerAi007k-card calm" data-admin-ui-owner-sabi-ai-007k-no-fake-success="ready">
        <h2>{tx007K(language, "noSoxta")}</h2>
        <p>{tx007K(language, "noSoxtaText")}</p>
      </article>
    </div>

    <section className="ownerAi007k-section" data-admin-ui-owner-sabi-ai-007k-all-admin-modules="ready">
      <h2>{tx007K(language, "modulesTitle")}</h2>
      <div className="ownerAi007k-modules">
        {moduleKeys.map((key) => <AiModuleCard007K key={key} title={tx007K(language, key)} text={tx007K(language, `${key}Text`)} />)}
      </div>
    </section>

    <section className="ownerAi007k-section ownerAi007k-flow" data-admin-ui-owner-sabi-ai-007k-daily-control-workflow="ready">
      <h2>{tx007K(language, "workflowTitle")}</h2>
      <ol>{workflowKeys.map((key) => <li key={key}>{tx007K(language, key)}</li>)}</ol>
    </section>

    <div className="ownerAi007k-grid mini">
      <article className="ownerAi007k-card" data-admin-ui-owner-sabi-ai-007k-report-language="ready">
        <h2>{tx007K(language, "languageTitle")}</h2>
        <p>{tx007K(language, "languageText")}</p>
      </article>
      <article className="ownerAi007k-card" data-admin-ui-owner-sabi-ai-007k-server-stage-planned="ready">
        <h2>{tx007K(language, "plannedStage")}</h2>
        <p>{tx007K(language, "plannedStageText")}</p>
      </article>
    </div>
  </section>;
}
