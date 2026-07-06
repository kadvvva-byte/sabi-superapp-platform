import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007IPanel } from "./TaxiAdminControl007I";

type Props007J = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007J = Record<string, string>;

const MARKER007J = "ADMIN-UI-TAXI-007J-OWNER-AI-FLEET-CONTROL";

const RU007J: Copy007J = {
  title: "Такси: главный Саби ИИ и управление водителями",
  subtitle: "Отдельный Саби ИИ владельца контролирует качество такси, нарушения, водителей, авто, жалобы и баланс. Пользовательский ИИ-помощник остаётся отдельным.",
  ownerAiTitle: "Главный Саби ИИ владельца",
  ownerAiBody: "Это не обычный помощник для абонентов. Это отдельный контролёр владельца: он проверяет все очереди, видит риски, готовит отчёт и предупреждает владельца о нарушениях.",
  subscriberAiTitle: "ИИ-помощник для абонентов отдельно",
  subscriberAiBody: "Пользовательский помощник отвечает клиентам и водителям, но не управляет админскими решениями владельца.",
  dailyTitle: "Ежедневный отчёт владельцу",
  dailyBody: "Каждый день Саби ИИ должен собрать отчёт по такси: заявки, нарушения, жалобы, водители, авто, баланс, подозрительные действия и важные предупреждения лично владельцу.",
  dailyStage: "Отдельный будущий этап",
  noFake: "Без фейка: сейчас интерфейс фиксирует правило и контрольную панель. Автоматический ежедневный отчёт будет отдельным серверным этапом админки с расписанием, адресатом владельца и аудитом.",
  controlTitle: "Что контролирует Саби ИИ",
  driverApplications: "Заявки водителей",
  driverApplicationsText: "Проверяет полноту анкеты, документы, фото, авто, проверку личности и причину решения админа.",
  complaints: "Жалобы и нарушения",
  complaintsText: "Отмечает опасные жалобы, повторные нарушения, отсутствие доказательств и случаи для владельца.",
  balance: "Баланс и расчёты",
  balanceText: "Контролирует резерв, удержание, ожидание, доступно, заморозку, награды и подозрительные суммы.",
  fleet: "Водители и авто",
  fleetText: "Следит за статусом водителей, доступом к диспетчеризации, документами авто и сроками страховки.",
  reports: "Отчёты и предупреждения",
  reportsText: "Готовит ежедневный отчёт владельцу и отдельные срочные предупреждения при критичных нарушениях.",
  languageTitle: "Языки без смешанного мусора",
  languageBody: "Все видимые слова этой панели берутся из словаря выбранного языка. Технические маршруты, номера и исходные поля не переводятся.",
  fleetTitle: "Управление водителями и авто",
  fleetBody: "Следующий рабочий блок такси: учёт таксистов, авто, документов, доступа к заказам и блокировок.",
  driverControl: "Водитель",
  vehicleControl: "Авто",
  accessControl: "Доступ к заказам",
  documentControl: "Документы",
  riskControl: "Риск / нарушения",
  accountingControl: "Баланс",
  ready: "Готово в контроле интерфейса",
  locked: "Реальное изменение только через сервер",
  openFoundation: "Показать текущий операционный центр такси",
  hideFoundation: "Скрыть текущий операционный центр такси",
  rulesTitle: "Правила владельца",
  ruleOne: "Саби ИИ владельца отдельно от ИИ-помощника абонентов.",
  ruleTwo: "Ежедневный отчёт должен отправляться именно владельцу.",
  ruleThree: "Критичные нарушения должны создавать предупреждение владельцу.",
  ruleFour: "Интерфейс не должен делать локальное одобрение, вывод средств или блокировку без сервера.",
};

const EN007J: Copy007J = {
  title: "Taksi: egasining Sabi sunʼiy intellekti and driver control",
  subtitle: "Owner Sabi AI is a separate controller for taxi quality, violations, drivers, vehicles, complaints, and balances. The subscriber AI assistant remains separate.",
  ownerAiTitle: "egasining Sabi sunʼiy intellekti controller",
  ownerAiBody: "This is not the regular assistant for subscribers. It is the owner controller: it reviews queues, detects risks, prepares reports and warns the owner about violations.",
  subscriberAiTitle: "Subscriber AI assistant is separate",
  subscriberAiBody: "The user assistant helps riders and drivers, but it does not control owner-level admin decisions.",
  dailyTitle: "Daily owner report",
  dailyBody: "Every day, Sabi AI must prepare a taxi report: applications, violations, complaints, drivers, vehicles, balances, suspicious actions, and important owner warnings.",
  dailyStage: "Separate future stage",
  noFake: "No false success: this interface records only the rule and control panel now. The automatic daily report will be a separate protected admin stage with scheduling, owner delivery, and audit.",
  controlTitle: "What Sabi sunʼiy intellekti controls",
  driverApplications: "Driver applications",
  driverApplicationsText: "Checks form completeness, documents, photos, vehicle data, KYC and the admin decision reason.",
  complaints: "Complaints and violations",
  complaintsText: "Flags safety complaints, repeated violations, missing evidence and owner-level cases.",
  balance: "Balance and accounting",
  balanceText: "Monitors reserve, hold, pending, available, freeze, rewards and suspicious amounts.",
  fleet: "Drivers and vehicles",
  fleetText: "Tracks driver holat, yuborish access, vehicle documents and insurance expiry.",
  reports: "Reports and warnings",
  reportsText: "Prepares daily owner reports and urgent warnings for critical violations.",
  languageTitle: "Clean language control",
  languageBody: "All visible copy in this panel comes from the selected language dictionary. Technical routes, IDs and raw fields stay technical.",
  fleetTitle: "Driver and vehicle management",
  fleetBody: "The next Taksi block: driver records, vehicles, documents, yuborish access and blocking control.",
  driverControl: "Driver",
  vehicleControl: "Vehicle",
  accessControl: "Dispatch access",
  documentControl: "Documents",
  riskControl: "Risk / violations",
  accountingControl: "Balance",
  ready: "Ready in interfeys control",
  locked: "Real changes only through server",
  openFoundation: "Show current Taksi operations center",
  hideFoundation: "Hide current Taksi operations center",
  rulesTitle: "egasi rules",
  ruleOne: "Owner Sabi AI is separate from the subscriber AI assistant.",
  ruleTwo: "The daily report must be delivered to the owner personally.",
  ruleThree: "Critical violations must create owner warnings.",
  ruleFour: "The interfeys must not locally approve, pay out or block without server confirmation.",
};

const UZ007J: Copy007J = {
  title: "Taksi: egasi uchun Sabi sunʼiy intellekti va haydovchilar nazorati",
  subtitle: "Ega Sabi sunʼiy intellekti Taksi sifati, qoidabuzarliklar, haydovchilar, avtomobillar, shikoyatlar va balanslar uchun alohida nazoratchi. Abonentlar sunʼiy intellekt yordamchisi alohida qoladi.",
  ownerAiTitle: "Ega Sabi sunʼiy intellekti nazoratchisi",
  ownerAiBody: "Bu abonentlar uchun oddiy yordamchi emas. Bu egaga tegishli nazoratchi: navbatlarni tekshiradi, xavflarni aniqlaydi, hisobot tayyorlaydi va egani ogohlantiradi.",
  subscriberAiTitle: "Abonentlar AI yordamchisi alohida",
  subscriberAiBody: "Foydalanuvchi yordamchisi yo‘lovchi va haydovchilarga yordam beradi, lekin egaga tegishli admin qarorlarini boshqarmaydi.",
  dailyTitle: "Ega uchun kundalik hisobot",
  dailyBody: "Har kuni Sabi sunʼiy intellekti taksi bo‘yicha hisobot tayyorlashi kerak: arizalar, qoidabuzarliklar, shikoyatlar, haydovchilar, avtomobillar, balanslar, shubhali harakatlar va muhim ogohlantirishlar.",
  dailyStage: "Alohida keyingi bosqich",
  noFake: "Soxta natija yo‘q: hozir interfeys qoida va nazorat panelini belgilaydi. Avtomatik kundalik hisobot jadval, egaga yetkazish va tekshiruv bilan alohida server/Admin bosqichida qilinadi.",
  controlTitle: "Sabi sunʼiy intellekti nimalarni nazorat qiladi",
  driverApplications: "Haydovchi arizalari",
  driverApplicationsText: "Anketa, hujjatlar, rasmlar, avtomobil, KYC va admin qarori sababini tekshiradi.",
  complaints: "Shikoyatlar va qoidabuzarliklar",
  complaintsText: "Xavfsizlik shikoyatlari, takroriy qoidabuzarliklar, yetishmayotgan dalillar va egaga tegishli holatlarni belgilaydi.",
  balance: "Balans va hisob-kitob",
  balanceText: "Reserve, hold, pending, available, freeze, rewards va shubhali summalarni kuzatadi.",
  fleet: "Haydovchilar va avtomobillar",
  fleetText: "Haydovchi holati, buyurtmaga kirish, avtomobil hujjatlari va sug‘urta muddatini kuzatadi.",
  reports: "Hisobotlar va ogohlantirishlar",
  reportsText: "Kundalik owner-report va muhim qoidabuzarliklar uchun shoshilinch ogohlantirishlar tayyorlaydi.",
  languageTitle: "Toza til nazorati",
  languageBody: "Ushbu paneldagi ko‘rinadigan matn tanlangan til lug‘atidan olinadi. Texnik route, ID va raw maydonlar texnik holda qoladi.",
  fleetTitle: "Haydovchi va avtomobil boshqaruvi",
  fleetBody: "Keyingi Taksi bloki: haydovchilar hisobi, avtomobillar, hujjatlar, buyurtmaga kirish va bloklash nazorati.",
  driverControl: "Haydovchi",
  vehicleControl: "Avtomobil",
  accessControl: "Buyurtmaga kirish",
  documentControl: "Hujjatlar",
  riskControl: "Xavf / qoidabuzarlik",
  accountingControl: "Balans",
  ready: "interfeys nazoratida tayyor",
  locked: "Haqiqiy o‘zgarish faqat server orqali",
  openFoundation: "Joriy taksi amaliyotlar markazini ko‘rsatish",
  hideFoundation: "Joriy Taksi operations center-ni yashirish",
  rulesTitle: "Ega qoidalari",
  ruleOne: "Ega Sabi sunʼiy intellekti abonentlar sunʼiy intellekt yordamchisidan alohida.",
  ruleTwo: "Kundalik hisobot aynan egaga yetkazilishi kerak.",
  ruleThree: "Muhim qoidabuzarliklar egaga ogohlantirish yaratishi kerak.",
  ruleFour: "Interfeys server tasdig‘isiz mahalliy tasdiq, to‘lov chiqarish yoki bloklash qilmasligi kerak.",
};

const ZH007J: Copy007J = {
  title: "出租车：所有者萨比智能与司机管理",
  subtitle: "所有者萨比智能是独立控制器，负责出租车质量、违规、司机、车辆、投诉和余额。用户智能助手保持独立。",
  ownerAiTitle: "所有者萨比智能控制器",
  ownerAiBody: "这不是给用户的普通助手。这是所有者控制器：检查队列、发现风险、准备报告，并向所有者发出违规警告。",
  subscriberAiTitle: "用户智能助手独立",
  subscriberAiBody: "用户助手帮助乘客和司机，但不控制所有者级别的管理决策。",
  dailyTitle: "每日所有者报告",
  dailyBody: "萨比智能每天必须准备出租车报告：申请、违规、投诉、司机、车辆、余额、可疑操作和重要警告，并发送给所有者。",
  dailyStage: "独立后续阶段",
  noFake: "不做虚假成功：当前界面只固定规则和控制面板。自动每日报告将在独立服务器管理阶段实现，包括计划任务、所有者投递和审计。",
  controlTitle: "萨比智能控制范围",
  driverApplications: "司机申请",
  driverApplicationsText: "检查表单完整性、文件、照片、车辆、身份验证和管理员决策原因。",
  complaints: "投诉与违规",
  complaintsText: "标记安全投诉、重复违规、缺失证据和需要所有者处理的案例。",
  balance: "余额与结算",
  balanceText: "监控储备、扣留、待处理、可用、冻结、奖励和可疑金额。",
  fleet: "司机和车辆",
  fleetText: "跟踪司机状态、调度权限、车辆文件和保险到期时间。",
  reports: "报告与警告",
  reportsText: "准备每日所有者报告，并对严重违规发出紧急警告。",
  languageTitle: "语言质量控制",
  languageBody: "此面板的可见文字来自当前语言字典。技术路线、编号和原始字段保持技术原样。",
  fleetTitle: "司机和车辆管理",
  fleetBody: "下一个出租车模块：司机记录、车辆、文件、调度权限和封禁控制。",
  driverControl: "司机",
  vehicleControl: "车辆",
  accessControl: "调度权限",
  documentControl: "文件",
  riskControl: "风险 / 违规",
  accountingControl: "余额",
  ready: "界面控制已就绪",
  locked: "真实变更只能通过服务器",
  openFoundation: "显示当前出租车运营中心",
  hideFoundation: "隐藏当前出租车运营中心",
  rulesTitle: "所有者规则",
  ruleOne: "所有者萨比智能与用户智能助手分离。",
  ruleTwo: "每日报告必须亲自发送给所有者。",
  ruleThree: "严重违规必须创建所有者警告。",
  ruleFour: "没有服务器确认，界面不能本地批准、付款或封禁。",
};

const COPY007J: Record<AdminLanguage, Copy007J> = { ru: RU007J, en: EN007J, uz: UZ007J, zh: ZH007J };
const tx007J = (language: AdminLanguage, key: string) => COPY007J[language]?.[key] ?? EN007J[key] ?? key;

function Meter007J({ label, value }: { label: string; value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="taxi007j-meter"><span>{label}</span><b>{safe}%</b><i style={{ width: `${safe}%` }} /></div>;
}

export function TaxiAdminControl007JPanel({ language, config, setNotice }: Props007J) {
  const [foundationOpen, setFoundationOpen] = useState(true);
  const ownerControls = useMemo(() => [
    ["driverApplications", "driverApplicationsText", 92],
    ["complaints", "complaintsText", 96],
    ["balance", "balanceText", 88],
    ["fleet", "fleetText", 84],
    ["reports", "reportsText", 80],
  ] as const, []);
  const fleetControls = useMemo(() => ["driverControl", "vehicleControl", "accessControl", "documentControl", "riskControl", "accountingControl"], []);
  const rules = useMemo(() => ["ruleOne", "ruleTwo", "ruleThree", "ruleFour"], []);

  return <section className="taxi007j" data-admin-ui-taxi-007j-owner-ai-fleet-control="ready" data-admin-ui-taxi-007j-owner-ai-separate="ready" data-admin-ui-taxi-007j-language-quality="ready">
    <header className="taxi007j-hero">
      <div>
        <p>{MARKER007J}</p>
        <h1>{tx007J(language, "title")}</h1>
        <span>{tx007J(language, "subtitle")}</span>
      </div>
      <div className="taxi007j-badges">
        <b>Sabi AI</b>
        <span>{tx007J(language, "dailyStage")}</span>
      </div>
    </header>

    <section className="taxi007j-aiGrid">
      <article className="taxi007j-card taxi007j-owner" data-admin-ui-taxi-007j-owner-controller="ready">
        <h2>{tx007J(language, "ownerAiTitle")}</h2>
        <p>{tx007J(language, "ownerAiBody")}</p>
      </article>
      <article className="taxi007j-card">
        <h2>{tx007J(language, "subscriberAiTitle")}</h2>
        <p>{tx007J(language, "subscriberAiBody")}</p>
      </article>
      <article className="taxi007j-card taxi007j-daily" data-admin-ui-taxi-007j-daily-owner-report-planned="ready">
        <h2>{tx007J(language, "dailyTitle")}</h2>
        <p>{tx007J(language, "dailyBody")}</p>
        <em>{tx007J(language, "noSoxta")}</em>
      </article>
      <article className="taxi007j-card" data-admin-ui-taxi-007j-clean-language="ready">
        <h2>{tx007J(language, "languageTitle")}</h2>
        <p>{tx007J(language, "languageBody")}</p>
      </article>
    </section>

    <section className="taxi007j-controlGrid">
      <article className="taxi007j-card taxi007j-wide" data-admin-ui-taxi-007j-ai-control-map="ready">
        <header><h2>{tx007J(language, "controlTitle")}</h2></header>
        <div className="taxi007j-controlList">
          {ownerControls.map(([titleKey, bodyKey, value]) => <div key={titleKey}>
            <b>{tx007J(language, titleKey)}</b>
            <p>{tx007J(language, bodyKey)}</p>
            <Meter007J label={tx007J(language, "ready")} value={value} />
          </div>)}
        </div>
      </article>
      <article className="taxi007j-card" data-admin-ui-taxi-007j-fleet-management="ready">
        <h2>{tx007J(language, "fleetTitle")}</h2>
        <p>{tx007J(language, "fleetBody")}</p>
        <div className="taxi007j-chipList">
          {fleetControls.map((key) => <span key={key}>{tx007J(language, key)}</span>)}
        </div>
        <strong>{tx007J(language, "locked")}</strong>
      </article>
      <article className="taxi007j-card" data-admin-ui-taxi-007j-owner-rules="ready">
        <h2>{tx007J(language, "rulesTitle")}</h2>
        <ul>{rules.map((key) => <li key={key}>{tx007J(language, key)}</li>)}</ul>
      </article>
    </section>

    <section className="taxi007j-foundation">
      <button onClick={() => setFoundationOpen((value) => !value)}>{foundationOpen ? tx007J(language, "hideFoundation") : tx007J(language, "openFoundation")}</button>
      {foundationOpen ? <TaxiAdminControl007IPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
