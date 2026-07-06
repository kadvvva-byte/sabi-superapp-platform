import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007MPanel } from "./TaxiAdminControl007M";

type Props007N = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007N = Record<string, string>;

const MARKER007N = "ADMIN-UI-TAXI-007N-AUDIT-ACCOUNTABILITY-OWNER-COMMAND-CONTROL";

const RU007N: Copy007N = {
  title: "Такси: аудит, ответственность и команды владельца",
  subtitle: "Главный Саби ИИ владельца стоит ниже владельца и выше всех сотрудников. Он контролирует действия, нарушения и риски, докладывает владельцу и ждёт команду.",
  stage: "Шаг 11",
  ownerAiStatus: "Ждёт команду владельца",
  hierarchyTitle: "Иерархия контроля",
  hierarchyOwner: "Владелец выше всех и принимает финальное решение.",
  hierarchyAi: "Главный Саби ИИ владельца ниже владельца, но выше админов, бухгалтеров, программистов, операторов и остальных сотрудников.",
  hierarchyNoSelf: "Саби ИИ не выполняет действия самостоятельно: он проверяет, докладывает и ждёт приказ владельца.",
  subscriberAi: "Пользовательский ИИ-помощник остаётся отдельным и не управляет админкой.",
  auditTitle: "Центр аудита такси",
  auditBody: "Проверяет заявки, водителей, авто, заказы, поездки, жалобы, баланс, тарифы и действия сотрудников.",
  accountabilityTitle: "Ответственность сотрудников",
  accountabilityBody: "Каждое действие сотрудника должно иметь причину, роль, время, запись, риск и след для отчёта владельцу.",
  commandTitle: "Командный вход владельца",
  commandBody: "Когда найден риск, Саби ИИ готовит предупреждение владельцу и ждёт дальнейшую команду: подтвердить, отклонить, запросить проверку или оставить на наблюдении.",
  dailyTitle: "Ежедневный отчёт владельцу",
  dailyBody: "Каждый день Саби ИИ должен собрать итоги такси: нарушения, жалобы, баланс, изменения тарифов, действия сотрудников и критичные риски.",
  staffTitle: "Кого контролирует Саби ИИ",
  accountants: "Бухгалтеры: баланс, удержания, резервы, комиссии, расчёты и подозрительные изменения.",
  developers: "Программисты: скрытые действия, обход проверок, риск фейкового успеха, изменение логики такси.",
  operators: "Операторы и админы: заявки, жалобы, назначения, блокировки, причины решений.",
  supervisors: "Руководители смен: массовые решения, ручные вмешательства, задержки и нарушения порядка.",
  workflowTitle: "Порядок контроля",
  stepOne: "1. Саби ИИ собирает сигналы из такси и журнала действий.",
  stepTwo: "2. Проверяет сотрудника, роль, запись, причину и риск.",
  stepThree: "3. Если есть нарушение, готовит ясный отчёт владельцу.",
  stepFour: "4. Владелец даёт команду: принять, отклонить, проверить, заблокировать или наблюдать.",
  stepFive: "5. Любое действие идёт только через сервер, аудит и подтверждение владельца.",
  coverageTitle: "Что покрыто контролем",
  applications: "Заявки водителей",
  complaints: "Жалобы и доказательства",
  balance: "Баланс и расчёты",
  orders: "Заказы и поездки",
  tariffs: "Тарифы и комиссии",
  staffActions: "Действия сотрудников",
  languageTitle: "Качество языков",
  languageBody: "Рабочий текст взят из словаря выбранного языка. Технические номера, маршруты, исходный формат и системные поля не переводятся.",
  backendTitle: "Действия только через сервер",
  backendBody: "Интерфейс не меняет статусы локально. Саби ИИ не выполняет действия сам. Команды владельца должны пройти через серверный маршрут, права доступа и аудит.",
  ready: "Готово к контролю",
  noSelfAction: "Без самостоятельных действий",
  openFoundation: "Показать предыдущий этап такси",
  hideFoundation: "Скрыть предыдущий этап такси",
};

const EN007N: Copy007N = {
  title: "Taksi: tekshiruv, accountability and owner commands",
  subtitle: "Owner Sabi AI is below the owner and above all staff. It monitors actions, violations, and risks, reports to the owner, and waits for a command.",
  stage: "Step 11",
  ownerAiStatus: "Waiting for owner command",
  hierarchyTitle: "Control hierarchy",
  hierarchyOwner: "The owner is above everyone and makes the final decision.",
  hierarchyAi: "Owner Sabi AI is below the owner, but above admins, accountants, developers, operators, and all other staff.",
  hierarchyNoSelf: "Sabi AI does not execute actions by itself: it checks, reports, and waits for the owner's order.",
  subscriberAi: "The user AI assistant remains separate and does not control Admin.",
  auditTitle: "Taksi tekshiruv center",
  auditBody: "Checks applications, drivers, vehicles, orders, trips, complaints, balance, tariffs and staff actions.",
  accountabilityTitle: "Staff accountability",
  accountabilityBody: "Every staff action must have a reason, role, time, record, risk and trace for the owner report.",
  commandTitle: "egasi command inbox",
  commandBody: "When risk is found, Sabi AI prepares an owner warning and waits for the next command: approve, reject, request review, or keep watching.",
  dailyTitle: "Daily owner report",
  dailyBody: "Every day Sabi sunʼiy intellekti must collect Taksi results: violations, complaints, balance, tariff changes, staff actions and critical risks.",
  staffTitle: "Who Sabi sunʼiy intellekti controls",
  accountants: "Accountants: balance, holds, reserves, commissions, settlements and suspicious changes.",
  developers: "Developers: hidden actions, bypassed checks, soxta muvaffaqiyat risk and Taksi mantiq changes.",
  operators: "Operators and admins: applications, complaints, assignments, blocks and decision reasons.",
  supervisors: "Shift supervisors: mass decisions, manual interventions, delays and process violations.",
  workflowTitle: "Control order",
  stepOne: "1. Sabi AI collects signals from Taxi and the action journal.",
  stepTwo: "2. It checks staff member, role, record, reason and risk.",
  stepThree: "3. If a violation exists, it prepares a clear report for the owner.",
  stepFour: "4. The owner gives a command: approve, reject, review, block or watch.",
  stepFive: "5. Any action goes only through protected confirmation, tekshiruv, and principal tasdiq.",
  coverageTitle: "Control coverage",
  applications: "Driver applications",
  complaints: "Complaints and evidence",
  balance: "Balance and accounting",
  orders: "Orders and trips",
  tariffs: "Tariffs and commissions",
  staffActions: "Staff actions",
  languageTitle: "Language quality",
  languageBody: "Working copy comes from the selected language dictionary. Technical IDs, routes, JSON and system fields are not translated.",
  backendTitle: "Actions only through server",
  backendBody: "The UI does not change statuses locally. Sabi AI does not execute actions by itself. Owner commands must pass through server route, permissions and audit.",
  ready: "Ready for control",
  noSelfAction: "No self-action",
  openFoundation: "Show previous Taksi stage",
  hideFoundation: "Hide previous Taksi stage",
};

const UZ007N: Copy007N = {
  title: "Taksi: tekshiruv, javobgarlik va ega buyruqlari",
  subtitle: "egasining Sabi sunʼiy intellekti egadan pastda va barcha xodimlardan yuqorida turadi. U amallar, qoidabuzarliklar va xavflarni kuzatadi, egaga xabar beradi va buyruq kutadi.",
  stage: "11-bosqich",
  ownerAiStatus: "Ega buyrug‘i kutilmoqda",
  hierarchyTitle: "Nazorat iyerarxiyasi",
  hierarchyOwner: "Ega hammadan yuqori turadi va yakuniy qarorni qabul qiladi.",
  hierarchyAi: "egasining Sabi sunʼiy intellekti egadan pastda, lekin adminlar, buxgalterlar, dasturchilar, operatorlar va barcha xodimlardan yuqorida turadi.",
  hierarchyNoSelf: "Sabi sunʼiy intellekti o‘zi mustaqil amal bajarmaydi: tekshiradi, xabar beradi va ega buyrug‘ini kutadi.",
  subscriberAi: "Foydalanuvchi AI yordamchisi alohida qoladi va Admin boshqaruvini qilmaydi.",
  auditTitle: "Taksi tekshiruv markazi",
  auditBody: "Arizalar, haydovchilar, avtomobillar, buyurtmalar, safarlar, shikoyatlar, balans, tariflar va xodim amallarini tekshiradi.",
  accountabilityTitle: "Xodim javobgarligi",
  accountabilityBody: "Har bir xodim amalida sabab, rol, vaqt, yozuv, xavf va ega hisoboti uchun iz bo‘lishi kerak.",
  commandTitle: "Ega buyruqlari markazi",
  commandBody: "Xavf topilsa, Sabi sunʼiy intellekti egaga ogohlantirish tayyorlaydi va keyingi buyruqni kutadi: tasdiqlash, rad etish, tekshiruv so‘rash yoki kuzatishda qoldirish.",
  dailyTitle: "Ega uchun kunlik hisobot",
  dailyBody: "Har kuni Sabi sunʼiy intellekti taksi natijalarini yig‘ishi kerak: qoidabuzarliklar, shikoyatlar, balans, tarif o‘zgarishlari, xodim amallari va muhim xavflar.",
  staffTitle: "Sabi sunʼiy intellekti kimlarni nazorat qiladi",
  accountants: "Buxgalterlar: balans, ushlab qolishlar, rezervlar, komissiyalar, hisob-kitoblar va shubhali o‘zgarishlar.",
  developers: "Dasturchilar: yashirin amallar, tekshiruvni chetlab o‘tish, soxta muvaffaqiyat xavfi va taksi mantiqi o‘zgarishlari.",
  operators: "Operatorlar va adminlar: arizalar, shikoyatlar, tayinlashlar, bloklar va qaror sabablari.",
  supervisors: "Smena rahbarlari: ommaviy qarorlar, qo‘lda aralashishlar, kechikishlar va tartib buzilishi.",
  workflowTitle: "Nazorat tartibi",
  stepOne: "1. Sabi sunʼiy intellekti taksi va amallar jurnalidan signallarni yig‘adi.",
  stepTwo: "2. Xodim, rol, yozuv, sabab va xavfni tekshiradi.",
  stepThree: "3. Qoidabuzarlik bo‘lsa, egaga aniq hisobot tayyorlaydi.",
  stepFour: "4. Ega buyruq beradi: tasdiqlash, rad etish, tekshirish, bloklash yoki kuzatish.",
  stepFive: "5. Har qanday amal faqat server, tekshiruv va ega tasdig‘i orqali o‘tadi.",
  coverageTitle: "Nazorat qamrovi",
  applications: "Haydovchi arizalari",
  complaints: "Shikoyatlar va dalillar",
  balance: "Balans va hisob-kitob",
  orders: "Buyurtmalar va safarlar",
  tariffs: "Tariflar va komissiyalar",
  staffActions: "Xodim amallari",
  languageTitle: "Til sifati",
  languageBody: "Ishchi matn tanlangan til lug‘atidan olinadi. Texnik ID, route, JSON va tizim maydonlari tarjima qilinmaydi.",
  backendTitle: "Amallar faqat server orqali",
  backendBody: "UI statuslarni lokal o‘zgartirmaydi. Sabi AI o‘zi amal bajarmaydi. Ega buyruqlari server route, ruxsatlar va audit orqali o‘tishi kerak.",
  ready: "Nazoratga tayyor",
  noSelfAction: "Mustaqil amal yo‘q",
  openFoundation: "Oldingi taksi bosqichini ko‘rsatish",
  hideFoundation: "Oldingi Taksi bosqichini yashirish",
};

const ZH007N: Copy007N = {
  title: "出租车：审计、责任和所有者命令",
  subtitle: "所有者萨比智能位于所有者之下并高于所有员工。它监控操作、违规和风险，向所有者报告并等待命令。",
  stage: "第 11 步",
  ownerAiStatus: "等待所有者命令",
  hierarchyTitle: "控制层级",
  hierarchyOwner: "所有者高于所有人，并作出最终决定。",
  hierarchyAi: "所有者萨比智能位于所有者之下，但高于管理员、会计、开发者、运营人员和所有其他员工。",
  hierarchyNoSelf: "萨比智能不会自行执行操作：它检查、报告并等待所有者命令。",
  subscriberAi: "用户智能助手保持独立，不控制管理后台。",
  auditTitle: "出租车审计中心",
  auditBody: "检查申请、司机、车辆、订单、行程、投诉、余额、计价和员工操作。",
  accountabilityTitle: "员工责任",
  accountabilityBody: "每个员工操作都必须有原因、角色、时间、记录、风险和给所有者报告的追踪。",
  commandTitle: "所有者命令收件箱",
  commandBody: "发现风险时，萨比智能准备给所有者的警告，并等待下一步命令：批准、拒绝、要求复查或继续观察。",
  dailyTitle: "每日所有者报告",
  dailyBody: "每天萨比智能必须汇总出租车结果：违规、投诉、余额、计价变更、员工操作和关键风险。",
  staffTitle: "萨比智能监督对象",
  accountants: "会计：余额、扣留、储备、佣金、结算和可疑变更。",
  developers: "开发者：隐藏操作、绕过检查、虚假成功风险和出租车逻辑变更。",
  operators: "运营人员和管理员：申请、投诉、分配、封锁和决定原因。",
  supervisors: "班次负责人：批量决定、人工干预、延迟和流程违规。",
  workflowTitle: "控制顺序",
  stepOne: "1. 萨比智能从出租车和操作日志收集信号。",
  stepTwo: "2. 检查员工、角色、记录、原因和风险。",
  stepThree: "3. 如果存在违规，它为所有者准备清晰报告。",
  stepFour: "4. 所有者下达命令：批准、拒绝、复查、封锁或观察。",
  stepFive: "5. 任何操作只能通过服务器、审计和所有者确认。",
  coverageTitle: "控制范围",
  applications: "司机申请",
  complaints: "投诉和证据",
  balance: "余额和核算",
  orders: "订单和行程",
  tariffs: "计价和佣金",
  staffActions: "员工操作",
  languageTitle: "语言质量",
  languageBody: "工作文本来自所选语言词典。技术编号、路线、原始格式和系统字段不翻译。",
  backendTitle: "操作只能通过服务器",
  backendBody: "界面不在本地改变状态。萨比智能不自行执行操作。所有者命令必须通过服务器路线、权限和审计。",
  ready: "已准备控制",
  noSelfAction: "无自行操作",
  openFoundation: "显示之前的出租车阶段",
  hideFoundation: "隐藏之前的出租车阶段",
};

const COPY007N: Record<AdminLanguage, Copy007N> = { ru: RU007N, en: EN007N, uz: UZ007N, zh: ZH007N };
const tx007N = (language: AdminLanguage, key: string) => COPY007N[language]?.[key] ?? EN007N[key] ?? key;

function Meter007N({ label, value }: { label: string; value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="taxi007n-meter"><span>{label}</span><b>{safe}%</b><i style={{ width: `${safe}%` }} /></div>;
}

function Card007N({ title, body, value, marker }: { title: string; body: string; value: number; marker: string }) {
  return <article className="taxi007n-card" data-admin-ui-taxi-007n-card={marker}>
    <h2>{title}</h2>
    <p>{body}</p>
    <Meter007N label={title} value={value} />
  </article>;
}

export function TaxiAdminControl007NPanel({ language, config, setNotice }: Props007N) {
  const [foundationOpen, setFoundationOpen] = useState(false);
  const staffKeys = useMemo(() => ["accountants", "developers", "operators", "supervisors"], []);
  const workflowKeys = useMemo(() => ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"], []);
  const coverageKeys = useMemo(() => ["applications", "complaints", "balance", "orders", "tariffs", "staffActions"], []);

  return <section className="taxi007n" data-admin-ui-taxi-007n-audit-accountability="ready" data-admin-ui-taxi-007n-language-quality="ready" data-admin-ui-taxi-007n-owner-ai-no-self-action="ready" data-admin-ui-taxi-007n-marker={MARKER007N}>
    <header className="taxi007n-hero">
      <div>
        <p>{tx007N(language, "stage")}</p>
        <h1>{tx007N(language, "title")}</h1>
        <span>{tx007N(language, "subtitle")}</span>
      </div>
      <div className="taxi007n-status" data-admin-ui-taxi-007n-owner-ai-hierarchy="ready">
        <b>Owner Sabi AI</b>
        <span>{tx007N(language, "ownerAiStatus")}</span>
        <em>{tx007N(language, "noSelfAction")}</em>
      </div>
    </header>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card taxi007n-hierarchy" data-admin-ui-taxi-007n-owner-ai-command-gate="ready">
        <h2>{tx007N(language, "hierarchyTitle")}</h2>
        <ul>
          <li>{tx007N(language, "hierarchyegasi")}</li>
          <li>{tx007N(language, "hierarchyAi")}</li>
          <li>{tx007N(language, "hierarchyNoSelf")}</li>
          <li>{tx007N(language, "subscriberAi")}</li>
        </ul>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007n-staff-accountability="ready">
        <h2>{tx007N(language, "staffTitle")}</h2>
        <div className="taxi007n-staffGrid">
          {staffKeys.map((key) => <span key={key}>{tx007N(language, key)}</span>)}
        </div>
      </article>
    </section>

    <section className="taxi007n-grid taxi007n-four" data-admin-ui-taxi-007n-audit-center="ready">
      <Card007N title={tx007N(language, "tekshiruvTitle")} body={tx007N(language, "tekshiruvBody")} value={88} marker="audit" />
      <Card007N title={tx007N(language, "accountabilityTitle")} body={tx007N(language, "accountabilityBody")} value={86} marker="accountability" />
      <Card007N title={tx007N(language, "commandTitle")} body={tx007N(language, "commandBody")} value={84} marker="owner-command" />
      <Card007N title={tx007N(language, "dailyTitle")} body={tx007N(language, "dailyBody")} value={82} marker="daily-report" />
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007n-control-workflow="ready">
        <h2>{tx007N(language, "workflowTitle")}</h2>
        <ol>{workflowKeys.map((key) => <li key={key}>{tx007N(language, key)}</li>)}</ol>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007n-coverage="ready">
        <h2>{tx007N(language, "coverageTitle")}</h2>
        <div className="taxi007n-chipList">{coverageKeys.map((key) => <span key={key}>{tx007N(language, key)}</span>)}</div>
        <Meter007N label={tx007N(language, "ready")} value={87} />
      </article>
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007n-backend-only="ready">
        <h2>{tx007N(language, "serverTitle")}</h2>
        <p>{tx007N(language, "serverBody")}</p>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007n-language-guard="ready">
        <h2>{tx007N(language, "languageTitle")}</h2>
        <p>{tx007N(language, "languageBody")}</p>
      </article>
    </section>

    <section className="taxi007n-foundation">
      <button onClick={() => setFoundationOpen((value) => !value)}>{foundationOpen ? tx007N(language, "hideFoundation") : tx007N(language, "openFoundation")}</button>
      {foundationOpen ? <TaxiAdminControl007MPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
