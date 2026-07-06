import { useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007PPanel } from "./TaxiAdminControl007P";

type Props007Q = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007Q = Record<string, string>;

const MARKER007Q = "ADMIN-UI-TAXI-007Q-FIX1-STRICT-MESSENGER-STYLE-CONTROL";

const RU007Q: Copy007Q = {
  title: "Такси: доступ работников и ручной контроль",
  subtitle: "Правила Саби ИИ владельца применяются внутри строгого стиля админ-мессенджера: доступ по ответственности, ручная проверка, архив и доклад владельцу.",
  stage: "Шаг 14 · исправление 1",
  state: "Стиль мессенджера закреплён",
  score: "100% UI",
  noFake: "Без фейка: интерфейс показывает правила, контроль и серверный порядок. Реальное блокирование экранов должен подтвердить серверный шлюз роли сессии.",
  tabOverview: "Обзор",
  tabManager: "Taxi manager",
  tabAccess: "Доступы",
  tabArchive: "Архив",
  metricDesign: "Дизайн",
  metricOwnerAi: "Owner Sabi AI",
  metricAccess: "Доступы",
  metricArchive: "Архив",
  workflowTitle: "Рабочие функции",
  sideTitle: "Контроль Саби ИИ владельца",
  ownerAiTitle: "Саби ИИ владельца контролирует работу",
  ownerAiBody: "Саби ИИ владельца ниже владельца и выше сотрудников: проверяет менеджера, документы, архив, жалобы, баланс, действия работников и докладывает владельцу.",
  noSelfTitle: "Без самостоятельных решений",
  noSelfBody: "Менеджер такси, бухгалтер, разработчик, оператор и зам не утверждают финальные действия сами. Они проверяют, готовят и отправляют на команду владельца.",
  accessTitle: "Экранный доступ",
  ownerAccess: "Владелец: 100% доступ ко всем экранам и финальным решениям.",
  ownerAiAccess: "Саби ИИ владельца: 100% контроль всех экранов, но без самостоятельных изменений.",
  deputyAccess: "Зам: до 80% — контроль сотрудников и доступов без финансового финального решения.",
  taxiManagerAccess: "Менеджер такси: только экран такси, заявки, документы, фото, авто, жалобы, баланс и мероприятия такси.",
  accountantAccess: "Бухгалтер: финансовые отчёты и сверки, без выплат, платежей и одобрения провайдера.",
  developerAccess: "Разработчик: технические подключения мерчантов и клиентов, без финансового решения.",
  taskTitle: "Ручные задачи менеджера такси",
  taskApplications: "Проверить каждую заявку нового таксиста и не пропускать без досье.",
  taskDocuments: "Проверить документы, фото, права, страховку, регистрацию и срок действия.",
  taskVehicle: "Проверить авто: модель, номер, цвет, категория, состояние и соответствие документам.",
  taskArchive: "Сохранить заявку, документы, фото, комментарии, ответ сервера и отметку ИИ в архив проверок.",
  taskCampaigns: "Проверить мероприятия такси, призовые акции и доступность только разрешённых действий.",
  taskReport: "Передать Саби ИИ владельца данные для ежедневного доклада владельцу.",
  gateTitle: "Гейт доступа",
  gateBody: "Интерфейс показывает правила доступа. Реальное блокирование экранов должно подтверждаться серверным шлюзом роли сессии. До этого интерфейс не заявляет фейковое применение правил.",
  archiveTitle: "Архив проверки",
  archiveBody: "Для каждой заявки нужен полный след: кто проверял, что проверил, какие документы были, что сообщил Саби ИИ владельца и какая команда владельца ожидается.",
  languageTitle: "Языки",
  languageBody: "Видимый текст остаётся чистым на русском, английском, узбекском и китайском языках. Технические номера, маршруты, серверные пути и исходный формат не переводятся.",
  reportTitle: "Ежедневный доклад владельцу",
  reportBody: "Саби ИИ собирает статус менеджера такси, пропущенные заявки, слабые проверки, жалобы, баланс и нарушения, затем докладывает владельцу и ждёт команду.",
  checkpointTitle: "Проверки",
  actionTitle: "Действия",
  checkOwner: "владелец выше всех",
  checkNoSelf: "ИИ и сотрудники не выполняют финальные действия сами",
  checkManager: "Менеджер такси видит только такси",
  checkArchive: "каждая заявка уходит в архив проверок",
  actionReport: "доложить владельцу",
  actionWait: "ждать команду владельца",
  actionArchive: "подготовить архив",
  actionBackendGate: "запросить серверный шлюз роли",
  lastTitle: "Следующий этап",
  continueBody: "Следующий этап после исправления 1: реальный серверный шлюз роли сессии, чтобы менеджер такси действительно видел только экран такси.",
  foundationOpen: "Показать правила предыдущего этапа",
};

const EN007Q: Copy007Q = {
  title: "Taxi: staff access and manual control",
  subtitle: "Owner Sabi AI rules are shown inside the strict Admin Messenger-style: responsibility-based access, manual review, archive, and Owner report.",
  stage: "Step 14 · FIX1",
  state: "Messenger-style locked",
  score: "100% UI",
  noFake: "No fake: the UI shows rules, control, and backend-only order. Real screen blocking must be confirmed by the backend/session role gate.",
  tabOverview: "Overview",
  tabManager: "Taxi manager",
  tabAccess: "Access",
  tabArchive: "Archive",
  metricDesign: "Design",
  metricOwnerAi: "Owner Sabi AI",
  metricAccess: "Access",
  metricArchive: "Archive",
  workflowTitle: "Work functions",
  sideTitle: "Owner Sabi AI control",
  ownerAiTitle: "Owner Sabi AI controls the work",
  ownerAiBody: "Owner Sabi AI is below the Owner and above staff: it checks the manager, documents, archive, complaints, balance, staff actions, and reports to the Owner.",
  noSelfTitle: "No independent decisions",
  noSelfBody: "Taxi manager, accountant, developer, operator, and deputy do not approve final actions themselves. They review, prepare, and send for Owner command.",
  accessTitle: "Screen access",
  ownerAccess: "Owner: 100% access to all screens and final decisions.",
  ownerAiAccess: "Owner Sabi AI: 100% control of all screens, but no independent mutations.",
  deputyAccess: "Deputy: up to 80% — staff and access control without final financial authority.",
  taxiManagerAccess: "Taxi manager: Taxi screen only, applications, documents, photos, vehicles, complaints, balance, and Taxi campaigns.",
  accountantAccess: "Accountant: financial reports and reconciliation, without payout/payment/provider approval.",
  developerAccess: "Developer: technical merchant/client integrations, without financial decisions.",
  taskTitle: "Taxi manager manual tasks",
  taskApplications: "Review every new driver application and never skip it without a dossier.",
  taskDocuments: "Check documents, photos, driving license, insurance, registration, and expiry dates.",
  taskVehicle: "Check the vehicle: model, plate, color, category, condition, and document match.",
  taskArchive: "Save application, documents, photos, comments, backend response, and AI mark into the archive workflow.",
  taskCampaigns: "Review Taxi campaigns, prize events, and availability of only allowed actions.",
  taskReport: "Provide Owner Sabi AI with data for the daily report to the Owner.",
  gateTitle: "Access gate",
  gateBody: "The UI shows access rules. Real screen blocking must be confirmed by the backend/session role gate. Until then the UI does not claim fake enforcement.",
  archiveTitle: "Review archive",
  archiveBody: "Every application needs a full trail: who reviewed it, what was checked, which documents existed, what Owner Sabi AI reported, and which Owner command is pending.",
  languageTitle: "Languages",
  languageBody: "Visible copy stays clean RU / EN / UZ / ZH. Technical IDs, routes, backend paths, and JSON are not translated.",
  reportTitle: "Daily report to Owner",
  reportBody: "Sabi AI collects Taxi manager status, skipped applications, weak reviews, complaints, balance, and violations, then reports to the Owner and waits for command.",
  checkpointTitle: "Checks",
  actionTitle: "Actions",
  checkOwner: "Owner is above everyone",
  checkNoSelf: "AI and staff do not execute final actions by themselves",
  checkManager: "Taxi manager sees only Taxi",
  checkArchive: "every application goes into archive workflow",
  actionReport: "report to Owner",
  actionWait: "wait for Owner command",
  actionArchive: "prepare archive",
  actionBackendGate: "request backend role gate",
  lastTitle: "Next stage",
  continueBody: "Next after FIX1: real backend/session role gate so Taxi manager truly sees only the Taxi screen.",
  foundationOpen: "Show 007P rules",
};

const UZ007Q: Copy007Q = {
  title: "Taxi: xodim ruxsati va qo'lda nazorat",
  subtitle: "Owner Sabi AI qoidalari qat'iy Admin Messenger-style ichida ko'rsatiladi: mas'uliyat bo'yicha ruxsat, qo'lda tekshiruv, arxiv va egaga hisobot.",
  stage: "14-bosqich · FIX1",
  state: "Messenger-style mahkamlangan",
  score: "100% UI",
  noFake: "Fake yo'q: UI qoidalar, nazorat va backend-only tartibni ko'rsatadi. Real ekran bloklash backend/session role gate bilan tasdiqlanishi kerak.",
  tabOverview: "Umumiy",
  tabManager: "Taxi manager",
  tabAccess: "Ruxsat",
  tabArchive: "Arxiv",
  metricDesign: "Dizayn",
  metricOwnerAi: "Owner Sabi AI",
  metricAccess: "Ruxsat",
  metricArchive: "Arxiv",
  workflowTitle: "Ish funksiyalari",
  sideTitle: "Owner Sabi AI nazorati",
  ownerAiTitle: "Owner Sabi AI ishni nazorat qiladi",
  ownerAiBody: "Egasining Sabi sunʼiy intellekti egasidan pastda va xodimlardan yuqorida: menejer, hujjatlar, arxiv, shikoyatlar, balans va xodim harakatlarini tekshiradi va egasiga hisobot beradi.",
  noSelfTitle: "Mustaqil qaror yo'q",
  noSelfBody: "Taxi manager, buxgalter, dasturchi, operator va o'rinbosar yakuniy harakatni o'zi tasdiqlamaydi. Ular tekshiradi, tayyorlaydi va egasi buyrug'iga yuboradi.",
  accessTitle: "Ekran ruxsati",
  ownerAccess: "Egasi: barcha ekranlar va yakuniy qarorlarga 100% ruxsat.",
  ownerAiAccess: "Owner Sabi AI: barcha ekranlarda 100% nazorat, lekin mustaqil mutatsiyasiz.",
  deputyAccess: "O'rinbosar: 80% gacha — xodim va ruxsat nazorati, yakuniy moliyaviy vakolatsiz.",
  taxiManagerAccess: "Taksi menejeri: faqat taksi ekrani, arizalar, hujjatlar, rasmlar, avtomobillar, shikoyatlar, balans va taksi kampaniyalari.",
  accountantAccess: "Buxgalter: moliyaviy hisobotlar va solishtirish, payout/payment/provider approval siz.",
  developerAccess: "Dasturchi: texnik merchant/client ulanishlari, moliyaviy qarorsiz.",
  taskTitle: "Taxi manager qo'lda vazifalari",
  taskApplications: "Har bir yangi haydovchi arizasini tekshirish va dossiersiz o'tkazmaslik.",
  taskDocuments: "Hujjatlar, rasmlar, haydovchilik guvohnomasi, sug'urta, ro'yxat va amal muddatini tekshirish.",
  taskVehicle: "Avtomobilni tekshirish: model, raqam, rang, kategoriya, holat va hujjatlarga moslik.",
  taskArchive: "Ariza, hujjatlar, rasmlar, izohlar, server javobi va sunʼiy intellekt belgisini arxiv jarayoniga saqlash.",
  taskCampaigns: "Taxi kampaniyalari, sovrinli tadbirlar va faqat ruxsat etilgan harakatlarni tekshirish.",
  taskReport: "Ega uchun kundalik hisobot ma’lumotlarini tayyorlash.",
  gateTitle: "Ruxsat darvozasi",
  gateBody: "UI ruxsat qoidalarini ko'rsatadi. Ekranlarni real bloklash backend/session role gate bilan tasdiqlanishi kerak. Ungacha UI fake enforcement da'vo qilmaydi.",
  archiveTitle: "Tekshiruv arxivi",
  archiveBody: "Har bir arizada to'liq iz kerak: kim tekshirdi, nima tekshirildi, qaysi hujjatlar bor, Owner Sabi AI nimani xabar qildi va qaysi egasi buyrug'i kutilmoqda.",
  languageTitle: "Tillar",
  languageBody: "Ko'rinadigan matn toza RU / EN / UZ / ZH bo'lib qoladi. Texnik ID, route, backend path va JSON tarjima qilinmaydi.",
  reportTitle: "Egaga kundalik hisobot",
  reportBody: "Sabi sunʼiy intellekti taksi menejeri holati, o‘tkazib yuborilgan arizalar, sust tekshiruvlar, shikoyatlar, balans va buzilishlarni yig‘adi, keyin egasiga hisobot beradi va buyruq kutadi.",
  checkpointTitle: "Tekshiruvlar",
  actionTitle: "Amallar",
  checkOwner: "egasi hammadan yuqori",
  checkNoSelf: "AI va xodimlar yakuniy harakatni o'zlari bajarmaydi",
  checkManager: "Taxi manager faqat Taxini ko'radi",
  checkArchive: "har bir ariza archive workflow ga o'tadi",
  actionReport: "egasiga hisobot berish",
  actionWait: "egasi buyrug'ini kutish",
  actionArchive: "arxiv tayyorlash",
  actionBackendGate: "backend role gate so'rash",
  lastTitle: "Keyingi bosqich",
  continueBody: "FIX1 dan keyin: Taxi manager haqiqatan faqat Taxi ekranini ko'rishi uchun real backend/session role gate.",
  foundationOpen: "007P qoidalarini ko'rsatish",
};

const ZH007Q: Copy007Q = {
  title: "出租车：员工访问与人工控制",
  subtitle: "所有者萨比智能规则在严格的管理后台信使风格中显示：按职责访问、人工审核、归档和所有者报告。",
  stage: "步骤 14 · 修复 1",
  state: "信使风格已锁定",
  score: "100% UI",
  noFake: "不做虚假成功：界面显示规则、控制和仅服务器顺序。真实页面阻止必须由服务器会话角色关口确认。",
  tabOverview: "总览",
  tabManager: "Taxi manager",
  tabAccess: "访问",
  tabArchive: "归档",
  metricDesign: "设计",
  metricOwnerAi: "Owner Sabi AI",
  metricAccess: "访问",
  metricArchive: "归档",
  workflowTitle: "工作功能",
  sideTitle: "所有者萨比智能控制",
  ownerAiTitle: "所有者萨比智能监督工作",
  ownerAiBody: "所有者萨比智能位于所有者之下、员工之上：检查经理、文件、归档、投诉、余额、员工动作，并向所有者报告。",
  noSelfTitle: "不能独立决定",
  noSelfBody: "出租车经理、会计、开发人员、操作员和副手不能自己批准最终动作。他们审核、准备，并提交给所有者命令。",
  accessTitle: "页面访问",
  ownerAccess: "所有者：100% 访问所有页面和最终决定。",
  ownerAiAccess: "所有者萨比智能：100% 监督所有页面，但不能独立执行变更。",
  deputyAccess: "副手：最高 80% —— 管理员工和访问权限，没有最终财务权限。",
  taxiManagerAccess: "出租车经理：仅出租车页面、申请、文件、照片、车辆、投诉、余额和出租车活动。",
  accountantAccess: "会计：财务报告和对账，不进行付款、支付或服务商批准。",
  developerAccess: "开发人员：商户和客户端技术接入，不作财务决定。",
  taskTitle: "出租车经理人工任务",
  taskApplications: "审核每个新司机申请，不得在没有档案的情况下跳过。",
  taskDocuments: "检查文件、照片、驾驶证、保险、注册和有效期。",
  taskVehicle: "检查车辆：型号、车牌、颜色、类别、状态以及与文件是否匹配。",
  taskArchive: "将申请、文件、照片、评论、服务器响应和智能标记保存到归档流程。",
  taskCampaigns: "审核出租车活动、奖励活动，并确认只允许授权动作。",
  taskReport: "向所有者萨比智能提供每日所有者报告所需数据。",
  gateTitle: "访问网关",
  gateBody: "界面显示访问规则。真实页面阻止必须由服务器会话角色关口确认。在此之前界面不声明虚假执行。",
  archiveTitle: "审核归档",
  archiveBody: "每个申请都需要完整轨迹：谁审核、检查了什么、有哪些文件、所有者萨比智能报告了什么，以及等待哪个所有者命令。",
  languageTitle: "语言",
  languageBody: "可见文案保持纯净的俄语、英语、乌兹别克语和中文。技术编号、路线、服务器路径和原始格式不翻译。",
  reportTitle: "每日所有者报告",
  reportBody: "萨比智能收集出租车经理状态、跳过的申请、薄弱审核、投诉、余额和违规，然后报告给所有者并等待命令。",
  checkpointTitle: "检查",
  actionTitle: "操作",
  checkOwner: "所有者高于所有人",
  checkNoSelf: "智能系统和员工不能自己执行最终动作",
  checkManager: "出租车经理只看到出租车",
  checkArchive: "每个申请进入归档流程",
  actionReport: "报告给所有者",
  actionWait: "等待所有者命令",
  actionArchive: "准备归档",
  actionBackendGate: "请求服务器角色关口",
  lastTitle: "下一阶段",
  continueBody: "修复 1 之后：真实服务器会话角色关口，让出租车经理真正只看到出租车页面。",
  foundationOpen: "显示上一阶段规则",
};

const COPY007Q: Record<AdminLanguage, Copy007Q> = { ru: RU007Q, en: EN007Q, uz: UZ007Q, zh: ZH007Q };

export function TaxiAdminControl007QPanel({ language, config, setNotice }: Props007Q) {
  const copy = COPY007Q[language] || RU007Q;
  const tabs = [copy.tabOverview, copy.tabManager, copy.tabAccess, copy.tabArchive];
  const [active, setActive] = useState(tabs[0]);
  const accessRows = [copy.ownerAccess, copy.ownerAiAccess, copy.deputyAccess, copy.taxiManagerAccess, copy.accountantAccess, copy.developerAccess];
  const tasks = [copy.taskApplications, copy.taskDocuments, copy.taskVehicle, copy.taskArchive, copy.taskCampaigns, copy.taskReport];
  const checks = [copy.checkOwner, copy.checkNoSelf, copy.checkManager, copy.checkArchive];
  const actions = [copy.actionReport, copy.actionWait, copy.actionArchive, copy.actionBackendGate];
  const functions = [
    { title: copy.ownerAiTitle, desc: copy.ownerAiBody, checks: [copy.checkOwner, copy.checkNoSelf], actions: [copy.actionReport, copy.actionWait], tone: "ready" },
    { title: copy.taskTitle, desc: copy.taskApplications, checks: [copy.taskDocuments, copy.taskVehicle], actions: [copy.actionArchive, copy.actionBackendGate], tone: "info" },
    { title: copy.gateTitle, desc: copy.gateBody, checks: [copy.taxiManagerAccess, copy.deputyAccess], actions: [copy.actionBackendGate, copy.actionWait], tone: "locked" },
    { title: copy.archiveTitle, desc: copy.archiveBody, checks: [copy.taskArchive, copy.taskReport], actions: [copy.actionArchive, copy.actionReport], tone: "warn" },
  ];

  return (
    <section
      className="messengerStyle007B"
      data-admin-ui-taxi-007q-marker={MARKER007Q}
      data-admin-ui-taxi-007q-fix1-strict-messenger-style="ready"
      data-admin-ui-taxi-007q-messenger-design-preserved="ready"
    >
      <div className="ms007b-hero">
        <div>
          <span className="ms007b-kicker">{copy.stage}</span>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        <div className="ms007b-heroBadges">
          <span>{copy.state}</span>
          <span>{copy.score}</span>
          <span>no fake</span>
        </div>
      </div>

      <div className="ms007b-alert">{copy.noFake}</div>

      <div className="ms007b-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)} type="button">
            {tab}
          </button>
        ))}
      </div>

      <div className="ms007b-metrics" data-admin-ui-taxi-007q-staff-screen-scope="ready">
        {[copy.metricDesign, copy.metricOwnerAi, copy.metricAccess, copy.metricArchive].map((metric, index) => (
          <div className="ms007b-metric" key={metric}>
            <span>{metric}</span>
            <strong>{index === 0 ? "ON" : index === 1 ? "100%" : index === 2 ? "10–80%" : "ready"}</strong>
            <small>{index === 0 ? copy.state : index === 1 ? copy.ownerAiAccess : index === 2 ? copy.taxiManagerAccess : copy.archiveTitle}</small>
          </div>
        ))}
      </div>

      <div className="ms007b-grid">
        <div className="ms007b-mainCard" data-admin-ui-taxi-007q-manager-manual-tasks="ready">
          <div className="ms007b-sectionTitle">
            <h2>{copy.workflowTitle}</h2>
            <span>{active}</span>
          </div>
          <div className="ms007b-functions">
            {functions.map((item) => (
              <article className={`ms007b-function ms007b-tone-${item.tone}`} key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="ms007b-checks">
                  <strong>{copy.checkpointTitle}</strong>
                  {item.checks.map((check) => <span key={check}>✓ {check}</span>)}
                </div>
                <div className="ms007b-actions">
                  <strong>{copy.actionTitle}</strong>
                  {item.actions.map((action) => <button key={action} disabled type="button">{action}</button>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="ms007b-sideCard" data-admin-ui-taxi-007q-owner-ai-control="ready" data-admin-ui-taxi-007q-no-self-action="ready">
          <h2>{copy.sideTitle}</h2>
          <p className="ms007b-note">{copy.ownerAiBody}</p>
          <div className="ms007b-checks">
            <strong>{copy.checkpointTitle}</strong>
            {checks.map((check) => <span key={check}>✓ {check}</span>)}
          </div>
          <div className="ms007b-actions">
            <strong>{copy.actionTitle}</strong>
            {actions.map((action) => <button key={action} disabled type="button">{action}</button>)}
          </div>
        </aside>
      </div>

      <div className="ms007b-grid two">
        <div className="ms007b-mainCard" data-admin-ui-taxi-007q-access-gate-contract="ready">
          <div className="ms007b-sectionTitle">
            <h2>{copy.accessTitle}</h2>
            <span>{copy.tabAccess}</span>
          </div>
          <div className="ms007b-reportList">
            {accessRows.map((row, index) => (
              <div key={row}>
                <span>{row}</span>
                <b style={{ width: `${Math.max(24, 100 - index * 10)}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="ms007b-mainCard" data-admin-ui-taxi-007q-archive-control="ready">
          <div className="ms007b-sectionTitle">
            <h2>{copy.taskTitle}</h2>
            <span>{copy.tabManager}</span>
          </div>
          <div className="ms007b-reportList">
            {tasks.map((task, index) => (
              <div key={task}>
                <span>{String(index + 1).padStart(2, "0")} · {task}</span>
                <b style={{ width: `${Math.max(35, 96 - index * 8)}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ms007b-last" data-admin-ui-taxi-007q-language-quality="ready" data-admin-ui-taxi-007q-next-stage-plan="ready">
        <h2>{copy.reportTitle}</h2>
        <p>{copy.reportBody}</p>
        <div className="ms007b-statusOk">{copy.languageTitle}: {copy.languageBody}</div>
        <div className="ms007b-statusBad">{copy.lastTitle}: {copy.continueBody}</div>
      </div>

      <div className="ms007b-legacy" data-admin-ui-taxi-007q-preserves-007p-foundation="ready">
        <details>
          <summary>{copy.foundationOpen}</summary>
          <div className="ms007b-legacyBody">
            <TaxiAdminControl007PPanel language={language} config={config} setNotice={setNotice} />
          </div>
        </details>
      </div>
    </section>
  );
}
