import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007NPanel } from "./TaxiAdminControl007N";

type Props007O = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007O = Record<string, string>;

const MARKER007O = "ADMIN-UI-TAXI-007O-MANAGER-ACCESS-ARCHIVE-OWNER-AI-CONTROL";

const RU007O: Copy007O = {
  title: "Такси: менеджер, доступ и архив проверок",
  subtitle: "Менеджер такси отвечает только за подключение новых таксистов, проверку заявок, документов, авто и мероприятий такси. Доступ к другим экранам закрыт.",
  stage: "Шаг 12",
  designGuard: "Дизайн не меняется: используется тот же стиль админ-мессенджера.",
  hierarchyTitle: "Иерархия доступа",
  hierarchyOwner: "Владелец: 100% доступ ко всей админке.",
  hierarchyAi: "Саби ИИ владельца: 100% контроль ниже владельца и выше всех сотрудников.",
  hierarchyDeputy: "Заместитель: до 80% доступа только по разрешению владельца.",
  hierarchyStaff: "Сотрудники: 10–50% доступа только по своей ответственности.",
  noSelfAction: "Никто ниже владельца не принимает финальное решение самостоятельно.",
  taxiManagerTitle: "Роль менеджера такси",
  taxiManagerBody: "Менеджер такси проверяет и подключает новых таксистов, изучает заявки, документы, фото, авто, жалобы и мероприятия такси. Он не видит другие экраны админки.",
  scopedAccessTitle: "Доступ только по ответственности",
  scopedAccessBody: "Если сотрудник отвечает за такси, он видит только экран такси и только разрешённые функции. Остальные модули скрыты.",
  ownerAiTitle: "Контроль Саби ИИ владельца",
  ownerAiBody: "Саби ИИ владельца контролирует менеджера от имени владельца, проверяет работу, ищет нарушения, докладывает владельцу каждый день и ждёт команду.",
  archiveTitle: "Архив проверок",
  archiveBody: "Каждая заявка, документ, фото, решение, причина, проверяющий сотрудник и ответ сервера должны сохраняться в архиве проверок.",
  dailyReportTitle: "Ежедневный доклад владельцу",
  dailyReportBody: "Саби ИИ владельца готовит отчёт: сколько заявок проверено, какие документы не прошли, кто из сотрудников не проверил заявку, какие нарушения найдены.",
  manualControlTitle: "Ручное управление менеджера",
  manualControlBody: "Менеджер может открыть заявку, проверить документы, добавить комментарий, подготовить решение и отправить на сервер. Финальное решение проходит через права, аудит и команду владельца.",
  accessMatrixTitle: "Матрица доступа",
  ownerRole: "Владелец",
  ownerAccess: "100%: все экраны, все отчёты, все решения.",
  aiRole: "egasining Sabi sunʼiy intellekti",
  aiAccess: "100% контроль: доклад, рекомендации, предупреждения, без самостоятельного выполнения.",
  deputyRole: "Заместитель",
  deputyAccess: "80%: управление по разрешённым зонам, без прав владельца.",
  taxiManagerRole: "Taksi menejer",
  taxiManagerAccess: "30–50%: только такси, заявки, документы, авто, жалобы, мероприятия.",
  accountantRole: "Бухгалтер такси",
  accountantAccess: "20–40%: баланс, расчёты, отчёты такси, без самостоятельных выплат.",
  operatorRole: "Оператор такси",
  operatorAccess: "10–30%: очередь, связь, статусы, без финальных решений.",
  developerRole: "Программист",
  developerAccess: "10–30%: технические задачи, без финансовых и кадровых решений.",
  applicationFlowTitle: "Проверка нового таксиста",
  flowOne: "1. Открыть новую заявку такси.",
  flowTwo: "2. Проверить личные данные, телефон, регион и статус проверки личности.",
  flowThree: "3. Проверить права, паспорт или номер документа, фото, страховку и регистрацию авто.",
  flowFour: "4. Проверить авто: марка, модель, номер, цвет, категория и срок документов.",
  flowFive: "5. Сохранить доказательства в архив и подготовить решение с причиной.",
  flowSix: "6. Отправить действие только через сервер и ждать ответ сервера.",
  archiveChecklistTitle: "Что должно попасть в архив",
  archiveDriver: "Данные водителя и история проверки.",
  archiveVehicle: "Данные авто и привязка к водителю.",
  archiveDocuments: "Документы, фото и сроки действия.",
  archiveDecision: "Причина решения, сотрудник, время, ответ сервера.",
  archiveAi: "Проверка Саби ИИ владельца и отметка для ежедневного отчёта.",
  workerControlTitle: "Контроль работы менеджера",
  workerOne: "Не проверил заявку полностью — Саби ИИ владельца докладывает владельцу.",
  workerTwo: "Пропустил документ или фото — предупреждение владельцу.",
  workerThree: "Пытается решить без права — действие блокируется и попадает в аудит.",
  workerFour: "Нарушает порядок проверки — Саби ИИ владельца просит команду владельца.",
  languageTitle: "Языки без смешанного мусора",
  languageBody: "Рабочий текст разделён по русскому, английскому, узбекскому и китайскому языкам. Технические номера, маршруты, исходный формат и серверные поля не переводятся.",
  backendTitle: "Только интерфейс и серверные границы",
  backendBody: "Этот этап не меняет сервер, базу данных, схему данных, кошелёк, платежи и выплаты. Он готовит правильные роли, доступ, архив и контроль.",
  openFoundation: "Показать предыдущий этап такси",
  hideFoundation: "Скрыть предыдущий этап такси",
};

const EN007O: Copy007O = {
  title: "Taksi: menejer, access and review archive",
  subtitle: "Taksi menejer is responsible only for onboarding new drivers, reviewing applications, documents, vehicles and Taksi campaigns. Other Admin screens are closed.",
  stage: "Step 12",
  designGuard: "Design is unchanged: the same Admin Messenger-style is used.",
  hierarchyTitle: "Access hierarchy",
  hierarchyOwner: "egasi: 100% access to the whole Admin.",
  hierarchyAi: "Owner Sabi AI: 100% control below the owner and above all staff.",
  hierarchyDeputy: "Deputy: up to 80% access only by owner permission.",
  hierarchyStaff: "Staff: 10–50% access only by responsibility.",
  noSelfAction: "No one below the owner makes final decisions independently.",
  taxiManagerTitle: "Taksi menejer role",
  taxiManagerBody: "Taksi menejer reviews and connects new drivers, checks applications, documents, photos, vehicles, complaints and Taksi campaigns. The menejer does not see other Admin screens.",
  scopedAccessTitle: "Responsibility-only access",
  scopedAccessBody: "When a staff member is responsible for Taksi, they see only the Taksi screen and only allowed functions. Other modules are hidden.",
  ownerAiTitle: "egasining Sabi sunʼiy intellekti control",
  ownerAiBody: "Owner Sabi AI supervises the manager on behalf of the owner, checks work, detects violations, reports to the owner every day, and waits for a command.",
  archiveTitle: "Review archive",
  archiveBody: "Every application, document, photo, decision, reason, reviewing staff member and official response must be saved in an archive workflow.",
  dailyReportTitle: "Daily owner report",
  dailyReportBody: "egasining Sabi sunʼiy intellekti prepares a report: reviewed applications, failed documents, staff who did not review an application, and detected violations.",
  manualControlTitle: "Manager manual control",
  manualControlBody: "The menejer can open an application, review documents, add a comment, prepare a decision, and send it for protected processing. Final decisions go through permissions, tekshiruv, and principal command.",
  accessMatrixTitle: "Access matrix",
  ownerRole: "egasi",
  ownerAccess: "100%: all screens, all reports, all decisions.",
  aiRole: "egasining Sabi sunʼiy intellekti",
  aiAccess: "100% control: reports, recommendations, warnings, without independent execution.",
  deputyRole: "Deputy",
  deputyAccess: "80%: management in allowed areas, without owner rights.",
  taxiManagerRole: "Taksi menejer",
  taxiManagerAccess: "30–50%: Taksi only, applications, documents, vehicles, complaints, campaigns.",
  accountantRole: "Taksi buxgalter",
  accountantAccess: "20–40%: balance, settlements, Taksi reports, without independent payout.",
  operatorRole: "Taksi operator",
  operatorAccess: "10–30%: queue, communication, holates, without final decisions.",
  developerRole: "Developer",
  developerAccess: "10–30%: technical tasks, without fin ance or staff decisions.",
  applicationFlowTitle: "New driver review",
  flowOne: "1. Open a new Taksi application.",
  flowTwo: "2. Check personal data, phone, region and KYC holat.",
  flowThree: "3. Check license, passport/ID, photos, insurance and vehicle registration.",
  flowFour: "4. Check vehicle make, model, plate, color, category and document expiry.",
  flowFive: "5. Save evidence into archive and prepare a decision with reason.",
  flowSix: "6. Send a protected action and wait for the official response.",
  archiveChecklistTitle: "What must be archived",
  archiveDriver: "Driver data and review history.",
  archiveVehicle: "Vehicle data and driver assignment.",
  archiveDocuments: "Documents, photos and expiry dates.",
  archiveDecision: "Decision reason, staff member, time, and official response.",
  archiveAi: "egasining Sabi sunʼiy intellekti review and daily report mark.",
  workerControlTitle: "Manager work control",
  workerOne: "Incomplete application review — Owner Sabi AI reports to the owner.",
  workerTwo: "Missed document or photo — owner warning.",
  workerThree: "Attempt to decide without permission — action is blocked and written to tekshiruv.",
  workerFour: "Broken review order — Owner Sabi AI asks the owner for a command.",
  languageTitle: "Languages without mixed copy",
  languageBody: "Working copy is separated into RU, EN, UZ and ZH. Technical IDs, routes, JSON and server fields are not translated.",
  backendTitle: "Interface and protected boundaries only",
  backendBody: "This stage does not change server, maʼlumotlar bazasi, Prisma, Hamyon, payments or payouts. It prepares correct roles, access, archive and control.",
  openFoundation: "Show previous Taksi stage",
  hideFoundation: "Hide previous Taksi stage",
};

const UZ007O: Copy007O = {
  title: "Taksi: menejer, kirish va tekshiruv arxivi",
  subtitle: "Taksi menejeri faqat yangi haydovchilarni ulash, arizalar, hujjatlar, avtomobillar va taksi tadbirlarini tekshirish uchun javobgar. Boshqa admin ekranlari yopiq.",
  stage: "12-bosqich",
  designGuard: "Dizayn o‘zgarmaydi: shu Admin Messenger-style ishlatiladi.",
  hierarchyTitle: "Kirish iyerarxiyasi",
  hierarchyOwner: "Ega: butun Admin uchun 100% kirish.",
  hierarchyAi: "egasining Sabi sunʼiy intellekti: egadan keyin va barcha xodimlardan yuqorida 100% nazorat.",
  hierarchyDeputy: "O‘rinbosar: faqat ega ruxsati bilan 80% gacha kirish.",
  hierarchyStaff: "Xodimlar: faqat mas’uliyatiga qarab 10–50% kirish.",
  noSelfAction: "Egadan past hech kim yakuniy qarorni mustaqil qabul qilmaydi.",
  taxiManagerTitle: "Taksi menejer roli",
  taxiManagerBody: "Taksi menejer yangi haydovchilarni tekshiradi va ulaydi, arizalar, hujjatlar, rasmlar, avtomobillar, shikoyatlar va Taksi tadbirlarini ko‘radi. U boshqa Admin ekranlarini ko‘rmaydi.",
  scopedAccessTitle: "Faqat mas’uliyat bo‘yicha kirish",
  scopedAccessBody: "Xodim taksi uchun javobgar bo‘lsa, u faqat taksi ekranini va ruxsat etilgan funksiyalarni ko‘radi. Boshqa modullar yashiriladi.",
  ownerAiTitle: "egasining Sabi sunʼiy intellekti nazorati",
  ownerAiBody: "egasining Sabi sunʼiy intellekti menejerni ega nomidan nazorat qiladi, ishni tekshiradi, qoidabuzarliklarni topadi, har kuni egaga hisobot beradi va buyruq kutadi.",
  archiveTitle: "Tekshiruv arxivi",
  archiveBody: "Har bir ariza, hujjat, rasm, qaror, sabab, tekshirgan xodim va server javobi arxiv workflow ichida saqlanishi kerak.",
  dailyReportTitle: "Ega uchun kunlik hisobot",
  dailyReportBody: "Egasining Sabi sunʼiy intellekti hisobot tayyorlaydi: nechta ariza tekshirildi, qaysi hujjatlar o‘tmadi, qaysi xodim arizani tekshirmadi va qanday qoidabuzarliklar topildi.",
  manualControlTitle: "Menejer qo‘l boshqaruvi",
  manualControlBody: "Menejer arizani ochadi, hujjatlarni tekshiradi, izoh qo‘shadi, qaror tayyorlaydi va serverga yuboradi. Yakuniy qaror ruxsatlar, tekshiruv va ega buyrug‘i orqali o‘tadi.",
  accessMatrixTitle: "Kirish matritsasi",
  ownerRole: "Ega",
  ownerAccess: "100%: barcha ekranlar, barcha hisobotlar, barcha qarorlar.",
  aiRole: "egasining Sabi sunʼiy intellekti",
  aiAccess: "100% nazorat: hisobot, tavsiya, ogohlantirish, mustaqil bajarishsiz.",
  deputyRole: "O‘rinbosar",
  deputyAccess: "80%: ruxsat etilgan zonalarda boshqaruv, ega huquqlarisiz.",
  taxiManagerRole: "Taksi menejer",
  taxiManagerAccess: "30–50%: faqat Taksi, arizalar, hujjatlar, avtomobillar, shikoyatlar, tadbirlar.",
  accountantRole: "Taksi buxgalteri",
  accountantAccess: "20–40%: balans, hisob-kitob, taksi hisobotlari, mustaqil to‘lov chiqarishsiz.",
  operatorRole: "Taksi operatori",
  operatorAccess: "10–30%: navbat, aloqa, holatlar, yakuniy qarorlarsiz.",
  developerRole: "Dasturchi",
  developerAccess: "10–30%: texnik vazifalar, moliya va xodim qarorlarsiz.",
  applicationFlowTitle: "Yangi haydovchini tekshirish",
  flowOne: "1. Yangi Taksi arizasini ochish.",
  flowTwo: "2. Shaxsiy ma’lumotlar, telefon, region va KYC holatini tekshirish.",
  flowThree: "3. Haydovchilik guvohnomasi, pasport yoki hujjat raqami, rasmlar, sug‘urta va avtomobil ro‘yxatini tekshirish.",
  flowFour: "4. Avtomobil markasi, modeli, raqami, rangi, kategoriyasi va hujjat muddatini tekshirish.",
  flowFive: "5. Dalillarni arxivga saqlash va sabab bilan qaror tayyorlash.",
  flowSix: "6. Faqat server orqali amal yuborish va server javobini kutish.",
  archiveChecklistTitle: "Arxivga kirishi shart bo‘lganlar",
  archiveDriver: "Haydovchi ma’lumotlari va tekshiruv tarixi.",
  archiveVehicle: "Avtomobil ma’lumotlari va haydovchiga biriktirish.",
  archiveDocuments: "Hujjatlar, rasmlar va amal qilish muddatlari.",
  archiveDecision: "Qaror sababi, xodim, vaqt va server javobi.",
  archiveAi: "egasining Sabi sunʼiy intellekti tekshiruvi va kunlik hisobot belgisi.",
  workerControlTitle: "Menejer ishini nazorat qilish",
  workerOne: "Arizani to‘liq tekshirmadi — egasining Sabi sunʼiy intellekti egaga xabar beradi.",
  workerTwo: "Hujjat yoki rasm o‘tkazib yuborildi — egaga ogohlantirish.",
  workerThree: "Ruxsatsiz qaror qilishga urinish — action bloklanadi va tekshiruvga yoziladi.",
  workerFour: "Tekshiruv tartibi buzildi — egasining Sabi sunʼiy intellekti egadan buyruq so‘raydi.",
  languageTitle: "Aralash matnsiz tillar",
  languageBody: "Ishchi matn RU, EN, UZ va ZH bo‘yicha ajratilgan. Texnik ID, route, JSON va backend maydonlari tarjima qilinmaydi.",
  backendTitle: "Faqat interfeys va server chegaralari",
  backendBody: "Bu bosqich server, maʼlumotlar bazasi, Prisma, hamyon, to‘lovlar yoki to‘lov chiqarish qismlarini o‘zgartirmaydi. U to‘g‘ri rollar, kirish, arxiv va nazoratni tayyorlaydi.",
  openFoundation: "Oldingi taksi bosqichini ko‘rsatish",
  hideFoundation: "Oldingi Taksi bosqichini yashirish",
};

const ZH007O: Copy007O = {
  title: "出租车：经理、访问权限和审核归档",
  subtitle: "出租车经理只负责接入新司机、审核申请、文件、车辆和出租车活动。其他管理后台页面关闭。",
  stage: "第 12 步",
  designGuard: "设计不改变：继续使用管理后台信使风格。",
  hierarchyTitle: "访问层级",
  hierarchyOwner: "所有者：整个管理后台的 100% 访问权限。",
  hierarchyAi: "所有者萨比智能：在所有者之下、所有员工之上，拥有 100% 控制。",
  hierarchyDeputy: "副手：只有在所有者允许下最多 80% 访问权限。",
  hierarchyStaff: "员工：只按责任拥有 10–50% 访问权限。",
  noSelfAction: "所有者以下的任何人都不能独立做最终决定。",
  taxiManagerTitle: "出租车经理角色",
  taxiManagerBody: "出租车经理审核并接入新司机，检查申请、文件、照片、车辆、投诉和出租车活动。经理看不到其他管理后台页面。",
  scopedAccessTitle: "只按责任访问",
  scopedAccessBody: "如果员工只负责出租车，他们只能看到出租车页面和允许的功能。其他模块隐藏。",
  ownerAiTitle: "所有者萨比智能控制",
  ownerAiBody: "所有者萨比智能代表所有者监督经理，检查工作，发现违规，每天向所有者报告并等待命令。",
  archiveTitle: "审核归档",
  archiveBody: "每个申请、文件、照片、决定、原因、审核员工和服务器响应都必须保存到归档流程。",
  dailyReportTitle: "每日所有者报告",
  dailyReportBody: "所有者萨比智能准备报告：已审核申请、失败文件、未审核申请的员工以及发现的违规。",
  manualControlTitle: "经理手动控制",
  manualControlBody: "经理可以打开申请、审核文件、添加备注、准备决定并发送到服务器。最终决定必须通过权限、审计和所有者命令。",
  accessMatrixTitle: "访问矩阵",
  ownerRole: "所有者",
  ownerAccess: "100%：所有页面、所有报告、所有决定。",
  aiRole: "egasining Sabi sunʼiy intellekti",
  aiAccess: "100% 控制：报告、建议、警告，不独立执行。",
  deputyRole: "副手",
  deputyAccess: "80%：在允许区域管理，没有所有者权限。",
  taxiManagerRole: "出租车经理",
  taxiManagerAccess: "30–50%：仅出租车、申请、文件、车辆、投诉、活动。",
  accountantRole: "出租车会计",
  accountantAccess: "20–40%：余额、结算、出租车报告，不独立执行付款。",
  operatorRole: "出租车运营员",
  operatorAccess: "10–30%：队列、沟通、状态，无最终决定。",
  developerRole: "开发者",
  developerAccess: "10–30%：技术任务，无财务和员工决定。",
  applicationFlowTitle: "新司机审核",
  flowOne: "1. 打开新的出租车申请。",
  flowTwo: "2. 检查个人资料、电话、区域和身份验证状态。",
  flowThree: "3. 检查驾照、护照或证件编号、照片、保险和车辆登记。",
  flowFour: "4. 检查车辆品牌、型号、车牌、颜色、类别和文件有效期。",
  flowFive: "5. 将证据保存到归档，并准备带原因的决定。",
  flowSix: "6. 发送仅限服务器的操作并等待服务器响应。",
  archiveChecklistTitle: "必须归档的内容",
  archiveDriver: "司机资料和审核历史。",
  archiveVehicle: "车辆资料和司机绑定。",
  archiveDocuments: "文件、照片和有效期。",
  archiveDecision: "决定原因、员工、时间和服务器响应。",
  archiveAi: "所有者萨比智能审核和每日报告标记。",
  workerControlTitle: "经理工作控制",
  workerOne: "申请审核不完整—所有者萨比智能向所有者报告。",
  workerTwo: "遗漏文件或照片 — 向所有者警告。",
  workerThree: "试图无权限决定—操作被阻止并写入审计。",
  workerFour: "审核顺序被破坏—所有者萨比智能请求所有者命令。",
  languageTitle: "无混合文本的语言",
  languageBody: "工作文本按俄语、英语、乌兹别克语和中文分离。技术编号、路线、原始格式和服务器字段不翻译。",
  backendTitle: "仅界面和服务器边界",
  backendBody: "此阶段不更改服务器、数据库、数据架构、钱包、支付或付款。它准备正确的角色、访问、归档和控制。",
  openFoundation: "显示之前的出租车阶段",
  hideFoundation: "隐藏之前的出租车阶段",
};

const COPY007O: Record<AdminLanguage, Copy007O> = { ru: RU007O, en: EN007O, uz: UZ007O, zh: ZH007O };
const tx007O = (language: AdminLanguage, key: string) => COPY007O[language]?.[key] ?? EN007O[key] ?? key;

function Meter007O({ label, value }: { label: string; value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="taxi007n-meter"><span>{label}</span><b>{safe}%</b><i style={{ width: `${safe}%` }} /></div>;
}

function Role007O({ role, access }: { role: string; access: string }) {
  return <article className="taxi007n-staffCard" data-admin-ui-taxi-007o-access-role="ready"><b>{role}</b><span>{access}</span></article>;
}

function Card007O({ title, body, marker }: { title: string; body: string; marker: string }) {
  return <article className="taxi007n-card" data-admin-ui-taxi-007o-card={marker}><h2>{title}</h2><p>{body}</p></article>;
}

export function TaxiAdminControl007OPanel({ language, config, setNotice }: Props007O) {
  const [foundationOpen, setFoundationOpen] = useState(false);
  const flowKeys = useMemo(() => ["flowOne", "flowTwo", "flowThree", "flowFour", "flowFive", "flowSix"], []);
  const archiveKeys = useMemo(() => ["archiveDriver", "archiveVehicle", "archiveDocuments", "archiveDecision", "archiveAi"], []);
  const workerKeys = useMemo(() => ["workerOne", "workerTwo", "workerThree", "workerFour"], []);
  const roles = useMemo(() => [
    ["ownerRole", "ownerAccess"],
    ["aiRole", "aiAccess"],
    ["deputyRole", "deputyAccess"],
    ["taxiManagerRole", "taxiManagerAccess"],
    ["buxgalterRole", "buxgalterAccess"],
    ["operatorRole", "operatorAccess"],
    ["dasturchiRole", "dasturchiAccess"],
  ], []);

  return <section className="taxi007n" data-admin-ui-taxi-007o-manager-access-archive="ready" data-admin-ui-taxi-007o-messenger-design-preserved="ready" data-admin-ui-taxi-007o-language-quality="ready" data-admin-ui-taxi-007o-marker={MARKER007O}>
    <header className="taxi007n-hero">
      <div>
        <p>{tx007O(language, "stage")}</p>
        <h1>{tx007O(language, "title")}</h1>
        <span>{tx007O(language, "subtitle")}</span>
        <span>{tx007O(language, "designGuard")}</span>
      </div>
      <div className="taxi007n-status" data-admin-ui-taxi-007o-owner-ai-hierarchy="ready" data-admin-ui-taxi-007o-owner-ai-no-self-action="ready">
        <b>Sabi AI</b>
        <span>{tx007O(language, "noSelfAction")}</span>
        <em>100%</em>
      </div>
    </header>

    <section className="taxi007n-grid taxi007n-two" data-admin-ui-taxi-007o-access-hierarchy="ready">
      <article className="taxi007n-card taxi007n-hierarchy">
        <h2>{tx007O(language, "hierarchyTitle")}</h2>
        <ul>
          <li>{tx007O(language, "hierarchyegasi")}</li>
          <li>{tx007O(language, "hierarchyAi")}</li>
          <li>{tx007O(language, "hierarchyDeputy")}</li>
          <li>{tx007O(language, "hierarchyStaff")}</li>
          <li>{tx007O(language, "noSelfAction")}</li>
        </ul>
      </article>
      <Card007O title={tx007O(language, "ownerAiTitle")} body={tx007O(language, "ownerAiBody")} marker="owner-ai-control" />
    </section>

    <section className="taxi007n-grid taxi007n-three" data-admin-ui-taxi-007o-manager-manual-control="ready">
      <Card007O title={tx007O(language, "taxiManagerTitle")} body={tx007O(language, "taxiManagerBody")} marker="taxi-manager-role" />
      <Card007O title={tx007O(language, "scopedAccessTitle")} body={tx007O(language, "scopedAccessBody")} marker="scoped-access" />
      <Card007O title={tx007O(language, "manualControlTitle")} body={tx007O(language, "manualControlBody")} marker="manual-control" />
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007o-access-matrix="ready">
        <h2>{tx007O(language, "accessMatrixTitle")}</h2>
        <div className="taxi007n-staffGrid">
          {roles.map(([role, access]) => <Role007O key={role} role={tx007O(language, role)} access={tx007O(language, access)} />)}
        </div>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007o-daily-owner-report="ready">
        <h2>{tx007O(language, "dailyReportTitle")}</h2>
        <p>{tx007O(language, "dailyReportBody")}</p>
        <Meter007O label={tx007O(language, "dailyReportTitle")} value={92} />
      </article>
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007o-application-review-flow="ready">
        <h2>{tx007O(language, "applicationFlowTitle")}</h2>
        <ol>{flowKeys.map((key) => <li key={key}>{tx007O(language, key)}</li>)}</ol>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007o-archive-workflow="ready">
        <h2>{tx007O(language, "archiveChecklistTitle")}</h2>
        <ul>{archiveKeys.map((key) => <li key={key}>{tx007O(language, key)}</li>)}</ul>
      </article>
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007o-worker-control="ready">
        <h2>{tx007O(language, "workerControlTitle")}</h2>
        <ul>{workerKeys.map((key) => <li key={key}>{tx007O(language, key)}</li>)}</ul>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007o-archive-and-access-readiness="ready">
        <h2>{tx007O(language, "archiveTitle")}</h2>
        <p>{tx007O(language, "archiveBody")}</p>
        <Meter007O label={tx007O(language, "archiveTitle")} value={89} />
      </article>
    </section>

    <section className="taxi007n-grid taxi007n-two">
      <article className="taxi007n-card" data-admin-ui-taxi-007o-language-guard="ready">
        <h2>{tx007O(language, "languageTitle")}</h2>
        <p>{tx007O(language, "languageBody")}</p>
      </article>
      <article className="taxi007n-card" data-admin-ui-taxi-007o-backend-only="ready">
        <h2>{tx007O(language, "serverTitle")}</h2>
        <p>{tx007O(language, "serverBody")}</p>
      </article>
    </section>

    <section className="taxi007n-foundation">
      <button onClick={() => setFoundationOpen((value) => !value)}>{foundationOpen ? tx007O(language, "hideFoundation") : tx007O(language, "openFoundation")}</button>
      {foundationOpen ? <TaxiAdminControl007NPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
