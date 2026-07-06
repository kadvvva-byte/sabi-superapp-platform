import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007OPanel } from "./TaxiAdminControl007O";

type Props007P = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007P = Record<string, string>;

const MARKER007P = "ADMIN-UI-TAXI-007P-OWNER-AI-RULES-CORE-CONTROL";

const RU007P: Copy007P = {
  title: "Саби ИИ: правила владельца и доступы",
  subtitle: "Эти правила применяются сразу ко всем следующим этапам такси и админки. Дизайн остаётся в стиле админ-мессенджера.",
  stage: "Шаг 13",
  designGuard: "Интерфейс не меняем: только аккуратный стиль мессенджера, отдельные функции и понятный порядок.",
  hierarchyTitle: "Иерархия управления",
  ownerRule: "Владелец: 100% доступ и финальное решение по всем критичным вопросам.",
  ownerAiRule: "Саби ИИ владельца: 100% контроль сразу ниже владельца и выше всех сотрудников. Докладывает владельцу и ждёт команду.",
  deputyRule: "Заместитель: до 80% доступа, контроль сотрудников и доступов, без финансовых прав владельца.",
  staffRule: "Сотрудники: 10–50% доступа только по ответственности. Они проверяют и готовят, но не решают самостоятельно.",
  noSelfActionTitle: "Запрет самостоятельных решений",
  noSelfActionBody: "Саби ИИ владельца, зам, менеджеры, бухгалтеры, программисты и операторы не выполняют финальные действия без команды владельца или разрешённого серверного шлюза.",
  taxiManagerTitle: "Taksi menejer",
  taxiManagerBody: "Менеджер такси проверяет новых таксистов, документы, фото, авто, заявки, мероприятия такси и видит только экран такси.",
  staffScopeTitle: "Доступ по функциям",
  taxiWorker: "Работник такси: только пользователи такси, заявки, документы, авто, жалобы и нефинансовые действия.",
  streamWorker: "Работник стрима: только пользователи стрима и нефинансовые проверки.",
  developerWorker: "Разработчик: технические подключения мерчантов и клиентов, без финансовых и кадровых решений.",
  accountantWorker: "Бухгалтер: финансовые отчёты и сверки, без финальных выплат, подключений или оплат.",
  deputyWorker: "Заместитель: контроль сотрудников, прав доступа и дисциплины по разрешению владельца.",
  financeTitle: "Финансовые решения",
  financeBody: "Финансовые подключения, платные подключения, выплаты, платежи, активацию провайдера и финальное одобрение принимает только владелец.",
  companyTitle: "Новые компании и платные подключения",
  companyBody: "Саби ИИ владельца проверяет компанию, документы, риски, владельцев, оплату и условия, затем докладывает владельцу для решения.",
  archiveTitle: "Архив и доказательства",
  archiveBody: "Каждая заявка таксиста, документ, фото, авто, комментарий, проверяющий, решение, ответ сервера и отметка ИИ должны идти в архив проверок.",
  dailyTitle: "Ежедневный доклад владельцу",
  dailyBody: "Саби ИИ владельца каждый день готовит доклад: нарушения, сотрудники, заявки, документы, жалобы, баланс, финансы, риски и что требует команды владельца.",
  languageTitle: "Языки",
  languageBody: "Видимый текст должен быть чистым на русском, английском, узбекском и китайском языках. Технические номера, маршруты, серверные пути и исходный формат не переводятся.",
  nextTaxiTitle: "Продолжение такси",
  nextTaxiBody: "После закрепления правил продолжаем такси: реальные права, роли, отчёты, архив, заявки, жалобы, баланс и серверные шлюзы по очереди.",
  foundationOpen: "Показать основу такси",
  foundationHide: "Скрыть основу такси"
};

const EN007P: Copy007P = {
  title: "Sabi AI: owner rules and access",
  subtitle: "These rules apply immediately to all next Taxi and Admin stages. The Admin Messenger-style design stays unchanged.",
  stage: "Step 13",
  designGuard: "UI/UX is not changed: keep the clean Messenger-style, separate functions, and clear order.",
  hierarchyTitle: "Control hierarchy",
  ownerRule: "egasi: 100% access and final decision for all critical matters.",
  ownerAiRule: "egasining Sabi sunʼiy intellekti: 100% control directly below the egasi and above all staff. It reports to the egasi and waits for commands.",
  deputyRule: "Deputy: up to 80% access, staff and access control, without the egasi's fin ancial authority.",
  staffRule: "Staff: 10-50% access only by responsibility. They review and prepare, but do not make final decisions independently.",
  noSelfActionTitle: "No independent final actions",
  noSelfActionBody: "egasining Sabi sunʼiy intellekti, deputy, menejers, buxgalters, dasturchis, and operators do not execute final actions without the egasi command or an allowed server nazorat.",
  taxiManagerTitle: "Taksi menejer",
  taxiManagerBody: "The Taksi menejer reviews new drivers, documents, photos, vehicles, applications, Taksi campaigns, and only sees the Taksi screen.",
  staffScopeTitle: "Function-scoped access",
  taxiWorker: "Taksi worker: only Taksi users, applications, documents, vehicles, complaints, and non-fin ancial actions.",
  streamWorker: "Stream worker: only Stream users and non-fin ancial checks.",
  developerWorker: "Developer: technical merchant/client integrations, without fin ance or staff decisions.",
  accountantWorker: "Accountant: fin ancial reports and reconciliation, without final payout, connection, or payment decisions.",
  deputyWorker: "Deputy: controls staff, permissions, and discipline with egasi permission.",
  financeTitle: "Fin ancial decisions",
  financeBody: "Fin ancial connections, paid connections, to‘lov chiqarish, to‘lov, provayderni faollashtirish, and final tasdiq are egasi-only decisions.",
  companyTitle: "New companies and paid connections",
  companyBody: "Owner Sabi AI checks the company, documents, risks, owners, payment, and terms, then reports to the owner for a decision.",
  archiveTitle: "Archive and evidence",
  archiveBody: "Every driver application, document, photo, vehicle, comment, reviewer, decision, official response, and AI mark must go into the archive workflow.",
  dailyTitle: "Daily report to egasi",
  dailyBody: "egasining Sabi sunʼiy intellekti prepares a daily report: violations, staff, applications, documents, complaints, balance, fin ance, risks, and items needing egasi command.",
  languageTitle: "Languages",
  languageBody: "Visible copy must be clean RU / EN / UZ / ZH. Technical IDs, routes, server paths, and JSON are not translated.",
  nextTaxiTitle: "Continue Taksi",
  nextTaxiBody: "After locking these rules we continue Taksi: real permissions, roles, reports, archive, applications, complaints, balance, and server nazoratlar step by step.",
  foundationOpen: "Show Taksi 007O foundation",
  foundationHide: "Hide Taksi 007O foundation"
};

const UZ007P: Copy007P = {
  title: "Sabi sunʼiy intellekti: egasi qoidalari va ruxsatlar",
  subtitle: "Bu qoidalar keyingi barcha Taxi va Admin bosqichlariga darhol qo'llanadi. Admin Messenger-style dizayni o'zgarmaydi.",
  stage: "13-bosqich",
  designGuard: "UI/UX o'zgarmaydi: toza Messenger-style, alohida funksiyalar va aniq tartib saqlanadi.",
  hierarchyTitle: "Boshqaruv ierarxiyasi",
  ownerRule: "Egasi: 100% ruxsat va barcha muhim masalalarda yakuniy qaror.",
  ownerAiRule: "Egasining Sabi sunʼiy intellekti: egasidan keyin darhol 100% nazorat va barcha xodimlardan yuqori. Egasiga hisobot beradi va buyruq kutadi.",
  deputyRule: "O'rinbosar: 80% gacha ruxsat, xodimlar va ruxsatlarni nazorat qiladi, lekin egasining moliyaviy huquqlariga ega emas.",
  staffRule: "Xodimlar: faqat mas'uliyati bo'yicha 10-50% ruxsat. Ular tekshiradi va tayyorlaydi, lekin mustaqil yakuniy qaror qabul qilmaydi.",
  noSelfActionTitle: "Mustaqil yakuniy harakat taqiqlanadi",
  noSelfActionBody: "egasining Sabi sunʼiy intellekti, o'rinbosar, menejerlar, buxgalterlar, dasturchilar va operatorlar egasi buyrug'isiz yoki ruxsatli server-nazorat bo'lmasa yakuniy harakat bajarmaydi.",
  taxiManagerTitle: "Taksi menejer",
  taxiManagerBody: "Taksi menejer yangi haydovchilar, hujjatlar, rasmlar, avtomobil, arizalar va Taksi tadbirlarini tekshiradi va faqat Taksi ekranini ko'radi.",
  staffScopeTitle: "Funksiya bo'yicha ruxsat",
  taxiWorker: "Taksi xodimi: faqat taksi foydalanuvchilari, arizalar, hujjatlar, avtomobillar, shikoyatlar va moliyaviy bo‘lmagan harakatlar.",
  streamWorker: "Stream xodimi: faqat Stream foydalanuvchilari va moliyaviy bo'lmagan tekshiruvlar.",
  developerWorker: "Dasturchi: merchant/client texnik ulanishlari, moliya yoki xodimlar bo'yicha qarorlarsiz.",
  accountantWorker: "Buxgalter: moliyaviy hisobotlar va solishtirish, yakuniy payout, ulanish yoki to'lov qarorisiz.",
  deputyWorker: "O'rinbosar: egasi ruxsati bilan xodimlar, ruxsatlar va intizomni nazorat qiladi.",
  financeTitle: "Moliyaviy qarorlar",
  financeBody: "Moliyaviy ulanishlar, pullik ulanishlar, to‘lov chiqarish, to‘lov, provayderni faollashtirish va yakuniy tasdiq faqat egasi qarori bilan bo‘ladi.",
  companyTitle: "Yangi kompaniyalar va pullik ulanishlar",
  companyBody: "Egasining Sabi sunʼiy intellekti kompaniya, hujjatlar, xavflar, egalari, to‘lov va shartlarni tekshiradi, keyin qaror uchun egasiga hisobot beradi.",
  archiveTitle: "Arxiv va dalillar",
  archiveBody: "Har bir haydovchi arizasi, hujjat, rasm, avtomobil, izoh, tekshiruvchi, qaror, server javobi va sunʼiy intellekt belgisi arxiv jarayoniga kirishi kerak.",
  dailyTitle: "Egasiga kundalik hisobot",
  dailyBody: "egasining Sabi sunʼiy intellekti kundalik hisobot tayyorlaydi: buzilishlar, xodimlar, arizalar, hujjatlar, shikoyatlar, balans, moliya, risklar va egasi buyrug'i kerak bo'lgan bandlar.",
  languageTitle: "Tillar",
  languageBody: "Ko'rinadigan matn toza RU / EN / UZ / ZH bo'lishi kerak. Texnik ID, route, backend path va JSON tarjima qilinmaydi.",
  nextTaxiTitle: "Taksi davom etadi",
  nextTaxiBody: "Qoidalar mahkamlangach Taksi davom etadi: real ruxsatlar, rollar, hisobotlar, arxiv, arizalar, shikoyatlar, balans va server nazoratlar bosqichma-bosqich.",
  foundationOpen: "Taksi 007O asosini ko'rsatish",
  foundationHide: "Taksi 007O asosini yashirish"
};

const ZH007P: Copy007P = {
  title: "萨比智能：所有者规则与访问权限",
  subtitle: "这些规则立即应用到后续出租车与管理后台阶段。管理后台信使风格设计保持不变。",
  stage: "步骤 13",
  designGuard: "不改变界面体验：保持清晰的信使风格、独立功能和明确顺序。",
  hierarchyTitle: "控制层级",
  ownerRule: "所有者：拥有 100% 访问权，并对所有关键事务拥有最终决定权。",
  ownerAiRule: "所有者萨比智能：位于所有者之下、所有员工之上，拥有 100% 监督权；向所有者报告并等待命令。",
  deputyRule: "副手：最高 80% 访问权，负责员工和权限控制，但没有所有者的财务权限。",
  staffRule: "员工：仅按职责拥有 10-50% 访问权；可以审核和准备，但不能独立作最终决定。",
  noSelfActionTitle: "禁止独立最终操作",
  noSelfActionBody: "所有者萨比智能、副手、经理、会计、开发人员和操作员，未经所有者命令或允许的服务器关口，不执行最终操作。",
  taxiManagerTitle: "Taksi menejer",
  taxiManagerBody: "出租车经理审核新司机、文件、照片、车辆、申请和出租车活动，并且只能看到出租车页面。",
  staffScopeTitle: "按功能限定访问",
  taxiWorker: "出租车工作人员：仅处理出租车用户、申请、文件、车辆、投诉和非财务操作。",
  streamWorker: "直播工作人员：仅处理直播用户和非财务审核。",
  developerWorker: "开发人员：负责商户和客户端技术接入，不参与财务或人员决定。",
  accountantWorker: "会计：负责财务报告和对账，不作最终付款、接入或支付决定。",
  deputyWorker: "副手：在所有者许可下管理员工、权限和纪律。",
  financeTitle: "财务决定",
  financeBody: "财务接入、付费接入、付款、支付、服务商启用和最终批准只能由所有者决定。",
  companyTitle: "新公司与付费接入",
  companyBody: "所有者萨比智能检查公司、文件、风险、所有者、付款和条款，然后向所有者报告以便决定。",
  archiveTitle: "归档与证据",
  archiveBody: "每个司机申请、文件、照片、车辆、评论、审核人、决定、服务器响应和智能标记都必须进入归档流程。",
  dailyTitle: "给所有者的每日报告",
  dailyBody: "所有者萨比智能每天准备报告：违规、员工、申请、文件、投诉、余额、财务、风险以及需要所有者命令的事务。",
  languageTitle: "语言",
  languageBody: "可见文案必须保持纯净的俄语、英语、乌兹别克语和中文。技术编号、路线、服务器路径和原始格式不翻译。",
  nextTaxiTitle: "继续出租车",
  nextTaxiBody: "锁定这些规则后继续出租车：真实权限、角色、报告、归档、申请、投诉、余额和服务器关口分步完成。",
  foundationOpen: "显示出租车基础",
  foundationHide: "隐藏出租车基础"
};

const COPY007P: Record<AdminLanguage, Copy007P> = {
  ru: RU007P,
  en: EN007P,
  uz: UZ007P,
  zh: ZH007P,
};

export function TaxiAdminControl007PPanel({ language, config, setNotice }: Props007P) {
  const copy = COPY007P[language] || RU007P;
  const rules = [copy.ownerRule, copy.ownerAiRule, copy.deputyRule, copy.staffRule];
  const staff = [copy.taxiWorker, copy.streamWorker, copy.developerWorker, copy.accountantWorker, copy.deputyWorker];
  const workflows = [copy.noSelfActionBody, copy.financeBody, copy.companyBody, copy.archiveBody, copy.dailyBody, copy.nextTaxiBody];

  return (
    <section className="taxi007pRoot" data-admin-ui-taxi-007p-marker={MARKER007P}>
      <header className="taxi007pHero" data-admin-ui-taxi-007p-messenger-design-preserved="ready">
        <div>
          <p className="taxi007pKicker">{copy.stage}</p>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <span>{copy.designGuard}</span>
      </header>

      <div className="taxi007pGrid">
        <article className="taxi007pCard" data-admin-ui-taxi-007p-owner-ai-core-rules="ready">
          <h3>{copy.hierarchyTitle}</h3>
          {rules.map((item) => <p key={item}>{item}</p>)}
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-no-self-action="ready">
          <h3>{copy.noSelfActionTitle}</h3>
          <p>{copy.noSelfActionBody}</p>
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-staff-access-matrix="ready">
          <h3>{copy.staffScopeTitle}</h3>
          {staff.map((item) => <p key={item}>{item}</p>)}
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-taxi-manager-rules="ready">
          <h3>{copy.taxiManagerTitle}</h3>
          <p>{copy.taxiManagerBody}</p>
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-owner-finance-gate="ready">
          <h3>{copy.financeTitle}</h3>
          <p>{copy.financeBody}</p>
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-company-verification="ready">
          <h3>{copy.companyTitle}</h3>
          <p>{copy.companyBody}</p>
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-archive-workflow="ready">
          <h3>{copy.archiveTitle}</h3>
          <p>{copy.archiveBody}</p>
        </article>

        <article className="taxi007pCard" data-admin-ui-taxi-007p-daily-owner-report="ready">
          <h3>{copy.dailyTitle}</h3>
          <p>{copy.dailyBody}</p>
        </article>
      </div>

      <div className="taxi007pWorkflow" data-admin-ui-taxi-007p-owner-command-workflow="ready">
        {workflows.map((item, index) => (
          <div className="taxi007pStep" key={item}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <aside className="taxi007pLanguage" data-admin-ui-taxi-007p-language-quality="ready">
        <strong>{copy.languageTitle}</strong>
        <span>{copy.languageBody}</span>
      </aside>

      <details className="taxi007pFoundation" data-admin-ui-taxi-007p-preserves-007o-foundation="ready">
        <summary>{copy.foundationOpen}</summary>
        <TaxiAdminControl007OPanel language={language} config={config} setNotice={setNotice} />
      </details>
    </section>
  );
}
