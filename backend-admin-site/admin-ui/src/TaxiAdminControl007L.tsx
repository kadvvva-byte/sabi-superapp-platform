import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007JPanel } from "./TaxiAdminControl007J";

type Props007L = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007L = Record<string, string>;

const MARKER007L = "ADMIN-UI-TAXI-007L-TARIFF-REGION-COMMISSION-OWNER-AI-CONTROL";

const RU007L: Copy007L = {
  title: "Такси: тарифы, регионы и комиссии под контролем Саби ИИ",
  subtitle: "Саби ИИ владельца стоит ниже владельца, но выше всех сотрудников. Он контролирует админов, бухгалтеров, программистов и все решения такси, докладывает владельцу и ждёт команду.",
  ownerHierarchyTitle: "Иерархия контроля",
  ownerTop: "1. Владелец — главный и единственный финальный командир.",
  ownerAiSecond: "2. Саби ИИ владельца — сразу ниже владельца и выше всех остальных.",
  staffBelow: "3. Админы, бухгалтеры, программисты, операторы и сотрудники — ниже Саби ИИ владельца.",
  noSelfAction: "Саби ИИ владельца ничего не выполняет самостоятельно: только проверяет, докладывает владельцу и ждёт дальнейшую команду.",
  staffControlTitle: "Контроль сотрудников от имени владельца",
  accountants: "Бухгалтеры",
  accountantsText: "Проверка расчётов, комиссий, заморозки, резерва, расчёта и подозрительных финансовых действий.",
  developers: "Программисты",
  developersText: "Проверка рискованных изменений, нарушений границы безопасности, фейкового успеха, скрытых действий записи и опасных изменений исходного кода.",
  operators: "Операторы и админы",
  operatorsText: "Проверка причин решений, действий по жалобам, блокировок, восстановления и операций только владельца.",
  tariffTitle: "Тарифы и комиссии",
  tariffBody: "Этот блок готовит правильное управление тарифами: класс поездки, базовая цена, цена за км, цена за минуту, минимальная сумма, комиссия платформы и статус.",
  regionTitle: "Регионы и зоны",
  regionBody: "Контроль города, района, зоны спроса, доступности водителей, локальных правил и статуса тарифа по региону.",
  commissionTitle: "Комиссионный контроль",
  commissionBody: "Саби ИИ проверяет, кто изменил комиссию, почему, есть ли риск для водителей, пассажиров, бухгалтерии и владельца.",
  workflowTitle: "Порядок изменения тарифа",
  stepOne: "1. Админ открывает тариф или регион.",
  stepTwo: "2. Саби ИИ проверяет изменение, риск и соответствие правилам владельца.",
  stepThree: "3. Бухгалтерия видит расчёт, но не выполняет решение только владельца.",
  stepFour: "4. При риске Саби ИИ докладывает владельцу.",
  stepFive: "5. Действие выполняется только после команды владельца и серверного подтверждения.",
  languageTitle: "Языки без смешивания",
  languageBody: "Видимые рабочие тексты берутся из словаря выбранного языка. Технические маршруты, номера, исходный формат и серверные пути не переводятся.",
  backendTitle: "Правило только через сервер",
  backendBody: "Интерфейс не активирует тариф, не меняет комиссию и не включает регион локально. Любое реальное изменение должно идти через сервер, аудит и одобрение владельца.",
  openFoundation: "Показать предыдущий центр управления такси",
  hideFoundation: "Скрыть предыдущий центр управления такси",
  ready: "Готово в контроле интерфейса",
  planned: "Реальное изменение будет на серверном этапе",
};

const EN007L: Copy007L = {
  title: "Taksi: tariffs, regions and commissions under Sabi sunʼiy intellekti control",
  subtitle: "principal Sabi sunʼiy intellekti is below the principal, but above all staff. It monitors admins, buxgalters, dasturchis and every Taksi decision, reports to the principal and waits for a command.",
  ownerHierarchyTitle: "Control hierarchy",
  ownerTop: "1. The owner is the main and final commander.",
  ownerAiSecond: "2. principal Sabi sunʼiy intellekti is directly below the principal and above everyone else.",
  staffBelow: "3. Admins, buxgalters, dasturchis, operators and staff are below principal Sabi sunʼiy intellekti.",
  noSelfAction: "principal Sabi sunʼiy intellekti does not execute actions by itself: it checks, reports to the principal and waits for the next command.",
  staffControlTitle: "Staff control on behalf of the owner",
  accountants: "Accountants",
  accountantsText: "Checks calculations, commissions, freeze, reserve, settlement and suspicious fin ance actions.",
  developers: "Developers",
  developersText: "Checks risky changes, safety boundary violations, false success, hidden write actions and dangerous source changes.",
  operators: "Operators and admins",
  operatorsText: "Checks decision reasons, complaint actions, blocks, restores and owner-only operations.",
  tariffTitle: "Tariffs and commissions",
  tariffBody: "This block prepares proper tariff management: ride class, base price, price per km, price per minute, minimum amount, platform commission and state.",
  regionTitle: "Regions and zones",
  regionBody: "Controls city, district, demand zone, driver availability, local rules and tariff state by region.",
  commissionTitle: "Commission control",
  commissionBody: "Sabi AI checks who changed the commission, why it changed, and whether there is risk for drivers, riders, accounting, or the owner.",
  workflowTitle: "Tariff change order",
  stepOne: "1. Admin opens a tariff or region.",
  stepTwo: "2. Sabi AI checks the change, risk, and owner rules.",
  stepThree: "3. Accounting sees the calculation, but does not execute owner-only decisions.",
  stepFour: "4. If risk exists, Sabi AI reports to the owner.",
  stepFive: "5. The action runs only after principal command and server confirmation.",
  languageTitle: "Clean language control",
  languageBody: "Visible working copy comes from the selected language dictionary. Technical routes, IDs, JSON and backend paths are not translated.",
  backendTitle: "Server-only rule",
  backendBody: "The interface does not locally activate tariffs, change commissions or enable regions. Every real change must go through protected confirmation, audit, and owner approval.",
  openFoundation: "Show previous Taksi control center",
  hideFoundation: "Hide previous Taksi control center",
  ready: "Ready in interface control",
  planned: "Real change will be in a server stage",
};

const UZ007L: Copy007L = {
  title: "Taksi: tariflar, hududlar va komissiyalar Sabi sunʼiy intellekti nazoratida",
  subtitle: "egasining Sabi sun ʼiy intellekti egadan pastda, lekin barcha xodimlardan yuqorida turadi. U adminlar, buxgalterlar, dasturchilar va barcha Taksi qarorlarini kuzatadi, egaga hisobot beradi va buyruq kutadi.",
  ownerHierarchyTitle: "Nazorat ierarxiyasi",
  ownerTop: "1. Ega — asosiy va yakuniy buyruq beruvchi.",
  ownerAiSecond: "2. principal Sabi sunʼiy intellekti bevosita egadan keyin va hammadan yuqorida turadi.",
  staffBelow: "3. Adminlar, buxgalterlar, dasturchilar, operatorlar va xodimlar egasining Sabi sun ʼiy intellekti dan pastda.",
  noSelfAction: "egasining Sabi sun ʼiy intellekti o ‘zi mustaqil harakat bajarmaydi: tekshiradi, egaga xabar beradi va keyingi buyruqni kutadi.",
  staffControlTitle: "Ega nomidan xodimlar nazorati",
  accountants: "Buxgalterlar",
  accountantsText: "Hisob-kitob, komissiya, freeze, reserve, settlement va shubhali moliyaviy harakatlarni tekshiradi.",
  developers: "Dasturchilar",
  developersText: "Xavfli o ‘zgarishlar, xavfsizlik chegarasi buzilishi, soxta muvaffaqiyat, yashirin yozish amali va xavfli manba o ‘zgarishi holatlarini tekshiradi.",
  operators: "Operatorlar va adminlar",
  operatorsText: "Qaror sabablari, shikoyat amallari, bloklash, tiklash va owner-only operatsiyalarni tekshiradi.",
  tariffTitle: "Tariflar va komissiyalar",
  tariffBody: "Bu blok to ‘g‘ri tarif boshqaruvini tayyorlaydi: safar klassi, bazaviy narx, km narxi, daqiqa narxi, minimal summa, platforma komissiyasi va holat.",
  regionTitle: "Hududlar va zonalar",
  regionBody: "Shahar, tuman, talab zonasi, haydovchi mavjudligi, lokal qoidalar va hudud bo ‘yicha tarif holatini nazorat qiladi.",
  commissionTitle: "Komissiya nazorati",
  commissionBody: "Sabi sun ʼiy intellekti komissiyani kim, nima uchun o ‘zgartirganini va haydovchi, yo ‘lovchi, buxgalteriya hamda ega uchun xavf bor-yo ‘qligini tekshiradi.",
  workflowTitle: "Tarif o ‘zgarishi tartibi",
  stepOne: "1. Admin tarif yoki hududni ochadi.",
  stepTwo: "2. Sabi sun ʼiy intellekti o ‘zgarish, xavf va ega qoidalarini tekshiradi.",
  stepThree: "3. Buxgalteriya hisob-kitobni ko ‘radi, lekin faqat egaga tegishli qarorni bajarmaydi.",
  stepFour: "4. Xavf bo ‘lsa, Sabi sun ʼiy intellekti egaga xabar beradi.",
  stepFive: "5. Amal faqat ega buyrug ‘i va server tasdig ‘idan keyin bajariladi.",
  languageTitle: "Til aralashmasiz nazorat",
  languageBody: "Ko‘rinadigan ishchi matnlar tanlangan til lug‘atidan olinadi. Texnik route, ID, JSON va backend path tarjima qilinmaydi.",
  backendTitle: "Faqat server qoidasi",
  backendBody: "interfeys tarifni lokal aktiv qilmaydi, komissiyani o ‘zgartirmaydi va hududni yoqmaydi. Har bir real o ‘zgarish server, tekshiruv va egasi tasdiq orqali bo ‘lishi kerak.",
  openFoundation: "Oldingi Taksi nazorat center-ni ko ‘rsatish",
  hideFoundation: "Oldingi Taksi control center-ni yashirish",
  ready: "interfeys nazoratida tayyor",
  planned: "Real o ‘zgarish server bosqichida bo ‘ladi",
};

const ZH007L: Copy007L = {
  title: "出租车：计价、区域和佣金由萨比智能控制",
  subtitle: "所有者萨比智能位于所有者之下，但高于所有员工。它监控管理员、会计、开发者和所有出租车决策，向所有者报告并等待命令。",
  ownerHierarchyTitle: "控制层级",
  ownerTop: "1. 所有者是最高和最终指挥者。",
  ownerAiSecond: "2. 所有者萨比智能直接低于所有者，并高于其他所有人。",
  staffBelow: "3. 管理员、会计、开发者、运营人员和员工都低于所有者萨比智能。",
  noSelfAction: "所有者萨比智能不会自行执行操作：它只检查、向所有者报告并等待下一步命令。",
  staffControlTitle: "代表所有者监督员工",
  accountants: "会计",
  accountantsText: "检查计算、佣金、冻结、储备、结算和可疑财务行为。",
  developers: "开发者",
  developersText: "检查高风险变更、安全边界违规、假成功、隐藏写操作和危险源码变更。",
  operators: "运营人员和管理员",
  operatorsText: "检查决策原因、投诉处理、封禁、恢复和仅限所有者的操作。",
  tariffTitle: "计价和佣金",
  tariffBody: "该模块准备正确的计价管理：行程等级、基础价格、每公里价格、每分钟价格、最低金额、平台佣金和状态。",
  regionTitle: "区域和服务区",
  regionBody: "控制城市、区域、需求区、司机可用性、本地规则和区域计价状态。",
  commissionTitle: "佣金控制",
  commissionBody: "萨比智能检查谁更改了佣金、原因是什么，以及是否对司机、乘客、会计和所有者产生风险。",
  workflowTitle: "计价变更顺序",
  stepOne: "1. 管理员打开计价或区域。",
  stepTwo: "2. 萨比智能检查变更、风险和所有者规则。",
  stepThree: "3. 会计可以查看计算，但不能执行仅限所有者的决策。",
  stepFour: "4. 如有风险，萨比智能向所有者报告。",
  stepFive: "5. 操作只在所有者命令和服务器确认后执行。",
  languageTitle: "语言不混乱",
  languageBody: "可见工作文本来自所选语言词典。技术路线、编号、原始格式和服务器路径不翻译。",
  backendTitle: "仅服务器规则",
  backendBody: "界面不会本地激活计价、更改佣金或启用区域。所有真实变更必须经过服务器、审计和所有者批准。",
  openFoundation: "显示之前的出租车控制中心",
  hideFoundation: "隐藏之前的出租车控制中心",
  ready: "界面 控制已准备",
  planned: "真实变更将在服务器阶段完成",
};

const COPY007L: Record<AdminLanguage, Copy007L> = { ru: RU007L, en: EN007L, uz: UZ007L, zh: ZH007L };
const tx007L = (language: AdminLanguage, key: string) => COPY007L[language]?.[key] ?? EN007L[key] ?? key;

function Meter007L({ label, value }: { label: string; value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="taxi007l-meter"><span>{label}</span><b>{safe}%</b><i style={{ width: `${safe}%` }} /></div>;
}

function StaffCard007L({ title, text }: { title: string; text: string }) {
  return <article className="taxi007l-staffCard"><b>{title}</b><span>{text}</span></article>;
}

export function TaxiAdminControl007LPanel({ language, config, setNotice }: Props007L) {
  const [foundationOpen, setFoundationOpen] = useState(true);
  const staffKeys = useMemo(() => [
    ["accountants", "buxgaltersText"],
    ["developers", "dasturchisText"],
    ["operators", "operatorsText"],
  ] as const, []);
  const workflow = useMemo(() => ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"], []);

  return <section className="taxi007l" data-admin-ui-taxi-007l-tariff-region-commission="ready" data-admin-ui-taxi-007l-owner-ai-hierarchy="ready" data-admin-ui-taxi-007l-language-quality="ready">
    <header className="taxi007l-hero">
      <div>
        <p>{MARKER007L}</p>
        <h1>{tx007L(language, "title")}</h1>
        <span>{tx007L(language, "subtitle")}</span>
      </div>
      <div className="taxi007l-badges" data-admin-ui-taxi-007l-owner-ai-below-owner-above-staff="ready">
        <b>Owner Sabi AI</b>
        <span>{tx007L(language, "planned")}</span>
      </div>
    </header>

    <section className="taxi007l-grid">
      <article className="taxi007l-card taxi007l-hierarchy" data-admin-ui-taxi-007l-owner-ai-no-self-action="ready">
        <h2>{tx007L(language, "ownerHierarchyTitle")}</h2>
        <ol>
          <li>{tx007L(language, "ownerTop")}</li>
          <li>{tx007L(language, "ownerAiSecond")}</li>
          <li>{tx007L(language, "staffBelow")}</li>
        </ol>
        <strong>{tx007L(language, "noSelfAction")}</strong>
      </article>

      <article className="taxi007l-card" data-admin-ui-taxi-007l-staff-control="ready">
        <h2>{tx007L(language, "staffControlTitle")}</h2>
        <div className="taxi007l-staffGrid">
          {staffKeys.map(([titleKey, textKey]) => <StaffCard007L key={titleKey} title={tx007L(language, titleKey)} text={tx007L(language, textKey)} />)}
        </div>
      </article>
    </section>

    <section className="taxi007l-grid taxi007l-three" data-admin-ui-taxi-007l-tariff-management="ready">
      <article className="taxi007l-card">
        <h2>{tx007L(language, "tariffTitle")}</h2>
        <p>{tx007L(language, "tariffBody")}</p>
        <Meter007L label={tx007L(language, "ready")} value={82} />
      </article>
      <article className="taxi007l-card" data-admin-ui-taxi-007l-region-control="ready">
        <h2>{tx007L(language, "regionTitle")}</h2>
        <p>{tx007L(language, "regionBody")}</p>
        <Meter007L label={tx007L(language, "ready")} value={78} />
      </article>
      <article className="taxi007l-card" data-admin-ui-taxi-007l-commission-control="ready">
        <h2>{tx007L(language, "commissionTitle")}</h2>
        <p>{tx007L(language, "commissionBody")}</p>
        <Meter007L label={tx007L(language, "ready")} value={80} />
      </article>
    </section>

    <section className="taxi007l-grid">
      <article className="taxi007l-card" data-admin-ui-taxi-007l-owner-command-workflow="ready">
        <h2>{tx007L(language, "workflowTitle")}</h2>
        <ol>{workflow.map((key) => <li key={key}>{tx007L(language, key)}</li>)}</ol>
      </article>
      <article className="taxi007l-card" data-admin-ui-taxi-007l-backend-only="ready">
        <h2>{tx007L(language, "serverTitle")}</h2>
        <p>{tx007L(language, "serverBody")}</p>
        <h2>{tx007L(language, "languageTitle")}</h2>
        <p>{tx007L(language, "languageBody")}</p>
      </article>
    </section>

    <section className="taxi007l-foundation">
      <button onClick={() => setFoundationOpen((value) => !value)}>{foundationOpen ? tx007L(language, "hideFoundation") : tx007L(language, "openFoundation")}</button>
      {foundationOpen ? <TaxiAdminControl007JPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
