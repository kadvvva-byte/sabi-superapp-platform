import type { AdminLanguage } from "./admin-i18n";

type Props016A = { language: AdminLanguage };

type Copy016A = {
  title: string;
  subtitle: string;
  owner: string;
  ownerAi: string;
  deputy: string;
  manager: string;
  accountant: string;
  taxiStaff: string;
  reportOnly: string;
  noMutation: string;
  noFake: string;
  functionScoped: string;
  financeRestricted: string;
  applicationReview: string;
  productionGates: string;
  auditTrail: string;
  next: string;
};

const MARKER016A = "TAXI-ACCESS-CONTROL-016A-RBAC-HARDENING-ADMIN-UI-NO-FAKE";

const COPY016A: Record<AdminLanguage, Copy016A> = {
  ru: {
    title: "Taksi access control",
    subtitle: "Доска усиления ролевого доступа только для чтения: кто какие экраны Такси видит, какие действия запрещены без точного одобрения владельца, и где ИИ Саби только контролирует и докладывает.",
    owner: "Владелец: 100% доступ и финальное решение",
    ownerAi: "ИИ Саби владельца: 100% обзор, режим только отчётов, без самостоятельных изменений",
    deputy: "Заместитель: расширенный контроль, но без секретов, ключей провайдера и шлюзов только для владельца",
    manager: "Менеджер Такси: заявки, водители, авто, поездки, жалобы и конкурсы по функции",
    accountant: "Бухгалтер: выручка, доходы Саби, отчёты и архив, без кнопок выплат и распределения",
    taxiStaff: "Персонал Такси: только экран Такси, без доступа к настройкам Стрима, кошелька и провайдера",
    reportOnly: "Режим только отчётов для ИИ Саби владельца",
    noMutation: "Нет одобрения, выплат, архивации или записи без точного серверного одобрения",
    noFake: "Без фейкового интерфейса: роли не подменяются локально и не создают фейковый успех",
    functionScoped: "Доступ по функциям: каждый видит только свой рабочий участок",
    financeRestricted: "Финансовые операции видят только менеджер, бухгалтер, заместитель и ИИ Саби владельца",
    applicationReview: "Заявки, водители и авто: менеджер готовит, точный шлюз владельца закрывает запись",
    productionGates: "Protected nazoratlar: archive 009A, tariffs 008A/008C, yuborish 009I, applications 007Z",
    auditTrail: "След аудита обязателен для действий записи, интерфейс не пишет напрямую в базу данных",
    next: "Следующий шаг: этап 016, проверка рабочего контура: проверить шлюзы для неавторизованных и запрещённых запросов, а также безопасные для ролей заголовки без чтения файла окружения.",
  },
  en: {
    title: "Taksi access control",
    subtitle: "Read-only RBAC hardening board: who can see Taksi screens, which actions are blocked without principal/exact confirmation, and where Sabi sunʼiy intellekti only monitors and reports.",
    owner: "principal: 100% access and final decision",
    ownerAi: "principal Sabi sunʼiy intellekti: 100% overview, report-only, no independent mutations",
    deputy: "Deputy: extended control, but no secrets/external service keys and no principal-only control steps",
    manager: "Taksi menejer: applications, drivers, vehicles, trips, complaints, contests by function",
    accountant: "Accountant: revenue, Sabi earnings, reports, archive, no withdrawal/distribute buttons",
    taxiStaff: "Taksi staff: Taksi screen only, no Stream/Balance account/external service settings",
    reportOnly: "Report-only mode for principal Sabi sunʼiy intellekti",
    noMutation: "No approval, withdrawal, archive, or write action without exact protected confirmation",
    noFake: "No false interface: roles are not locally spoofed and do not create false success",
    functionScoped: "Function-scoped access: each role sees only its work area",
    financeRestricted: "Fin ance Ops visible only to menejer, buxgalter, deputy, principal Sabi sunʼiy intellekti",
    applicationReview: "Applications/drivers/vehicles: menejer prepares, principal/exact control step closes write",
    productionGates: "Protected nazoratlar: archive 009A, tariffs 008A/008C, yuborish 009I, applications 007Z",
    auditTrail: "Audit trail required for write actions; interface never writes directly to database",
    next: "Next: 016B runtime smoke — verify unauthenticated/forbidden gates and role-safe headers without reading.env.",
  },
  uz: {
    title: "Taksi access control",
    subtitle: "Read-only rolga asoslangan kirish nazorati hardening doskasi: kim qaysi Taksi ekranini ko ‘radi, qaysi amallar Egasi/exact tasdiqsiz bloklanadi, Sabi sun ʼiy intellekti faqat kuzatib hisobot beradi.",
    owner: "principal: 100% access va final qaror",
    ownerAi: "egasining Sabi sun ʼiy intellekti: 100% nazorat, report-only, mustaqil o ‘zgartirish yo ‘q",
    deputy: "Deputy: kengaytirilgan nazorat, lekin sirlar/tashqi xizmat kalitlar va Faqat egaga tegishli nazoratlar yo ‘q",
    manager: "Taksi menejeri: applications, haydovchilar, avtomobillar, safarlar, shikoyatlar, tanlovlar vazifa bo ‘yicha",
    accountant: "Accountant: revenue, Sabi earnings, hisobotlar, arxiv, to ‘lov chiqarish/taqsimlash tugmalari yo ‘q",
    taxiStaff: "Taksi xodimi: faqat Taksi ekrani, Strim/Hamyon/tashqi xizmat settings yo ‘q",
    reportOnly: "principal Sabi sunʼiy intellekti uchun report-only rejim",
    noMutation: "Exact server tasdiqsiz approve/to ‘lov chiqarish/arxiv/yozish yo ‘q",
    noFake: "No false interface: role lokal spoof qilinmaydi va false success yaratmaydi",
    functionScoped: "Function-scoped access: har bir rol faqat o ‘z ish maydonini ko ‘radi",
    financeRestricted: "Fin ance Ops faqat menejer, buxgalter, deputy, principal Sabi sunʼiy intellekti uchun",
    applicationReview: "Applications/drivers/vehicles: menejer tayyorlaydi, principal/exact control step write-ni yopadi",
    productionGates: "Protected nazoratlar: archive 009A, tariffs 008A/008C, yuborish 009I, applications 007Z",
    auditTrail: "Write actions uchun audit trail shart; interface database-ga direct yozmaydi",
    next: "Keyingi qadam: 016B ishlash muhiti tekshiruvi — unauthenticated/forbidden nazoratlar va role-safe headers, .env o ‘qimasdan.",
  },
  zh: {
    title: "Taksi access control",
    subtitle: "只读角色访问加固看板：谁能看到哪些出租车页面，哪些动作没有所有者精确批准会被禁止，以及萨比人工智能只监控和汇报的位置。",
    owner: "所有者：100%访问权限和最终决定",
    ownerAi: "所有者萨比人工智能：100%总览，仅报告模式，不独立执行变更",
    deputy: "副手：扩展控制，但无秘密、提供商密钥和仅所有者关口",
    manager: "出租车经理：按功能处理申请、司机、车辆、行程、投诉和竞赛",
    accountant: "会计：营收、萨比收益、报表和归档，无付款或分配按钮",
    taxiStaff: "出租车员工：只看出租车屏幕，无直播、钱包或提供商设置",
    reportOnly: "所有者萨比人工智能为仅报告模式",
    noMutation: "没有精确服务器批准，不执行批准、付款、归档或写入",
    noFake: "无虚假界面：角色不在本地伪造，也不创建虚假成功",
    functionScoped: "按功能限定访问：每个角色只看自己的工作区域",
    financeRestricted: "财务操作只给经理、会计、副手和所有者萨比人工智能",
    applicationReview: "申请、司机和车辆：经理准备，所有者精确关口完成写入",
    productionGates: "Protected nazoratlar：archive 009A、tariffs 008A/008C、yuborish 009I、applications 007Z",
    auditTrail: "写入动作必须有审计轨迹；界面不直接写数据库",
    next: "下一步：阶段016运行检查——不读取环境文件，验证未认证和禁止关口以及角色安全标头。",
  },
};

const roles016A = ["owner", "ownerAi", "deputy", "manager", "accountant", "taxiStaff"] as const;
const controls016A = ["reportOnly", "noMutation", "noFake", "functionScoped", "financeRestricted", "applicationReview", "productionGates", "auditTrail"] as const;

export function TaxiAccessControl016APanel({ language }: Props016A) {
  const copy = COPY016A[language] || COPY016A.ru;
  return (
    <section
      className="taxi016aAccessHardening"
      data-admin-ui-taxi-access-control-016a="rbac-hardening-ready"
      data-admin-ui-taxi-access-control-016a-owner="100"
      data-admin-ui-taxi-access-control-016a-owner-sabi-ai="report-only-no-mutation"
      data-admin-ui-taxi-access-control-016a-finance-visible-roles="manager-accountant-deputy-owner-sabi-ai"
      data-admin-ui-taxi-access-control-016a-function-scoped="ready"
      data-admin-ui-taxi-access-control-016a-no-fake-role-success="ready"
      data-admin-ui-taxi-access-control-016a-no-wallet-provider-db-direct="ready"
    >
      <div className="taxi016aHead">
        <div>
          <span>{MARKER016A}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <strong>RBAC</strong>
      </div>
      <div className="taxi016aRolesGrid">
        {roles016A.map((key) => <div key={key}><span>{copy[key]}</span><strong>{key === "owner" ? "100%" : key === "ownerAi" ? "REPORT" : "SCOPED"}</strong></div>)}
      </div>
      <div className="taxi016aControlsGrid">
        {controls016A.map((key) => <span key={key}>{copy[key]}</span>)}
      </div>
      <p className="taxi016aNext">{copy.next}</p>

      <div
        className="taxi016cCloseoutBoard"
        data-admin-ui-taxi-access-control-016c="production-closeout-ready"
        data-admin-ui-taxi-access-control-016c-runtime="016b-passed"
        data-admin-ui-taxi-access-control-016c-source-health="17-of-17"
        data-admin-ui-taxi-access-control-016c-rbac-gates="orders-drivers-tariffs-finance-applications-synchronized"
        data-admin-ui-taxi-access-control-016c-protected-writes="403-without-exact-approval"
        data-admin-ui-taxi-access-control-016c-no-fake-wallet-provider="ready"
      >
        <div>
          <span>TAXI-ACCESS-CONTROL-016C-PRODUCTION-CLOSEOUT-RUNTIME-016B-PASSED</span>
          <h3>Access/RBAC production closeout</h3>
          <p>016B runtime smoke passed: RBAC gates synchronized across orders, drivers, tariffs, Finance Ops, applications 007Z, protected writes denied without exact approval, Owner Sabi AI remains report-only.</p>
        </div>
        <div className="taxi016cCloseoutGrid">
          <strong>016B runtime: PASSED</strong>
          <strong>Source health: 17/17</strong>
          <strong>Protected writes: 403 without exact approval</strong>
          <strong>No fake role/access success</strong>
          <strong>No Wallet/provider/local penalty</strong>
          <strong>Owner Sabi AI: report-only</strong>
        </div>
      </div>
    </section>
  );
}
