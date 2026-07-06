import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl007LPanel } from "./TaxiAdminControl007L";

type Props007M = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Copy007M = Record<string, string>;

const MARKER007M = "ADMIN-UI-TAXI-007M-ORDERS-DISPATCH-TRIPS-OWNER-AI-CONTROL";

const RU007M: Copy007M = {
  title: "Такси: заказы, диспетчеризация и поездки под контролем Саби ИИ владельца",
  subtitle: "Саби ИИ владельца находится ниже владельца и выше всех сотрудников. Он контролирует заказы, назначение водителей и жизненный цикл поездок, докладывает владельцу и ждёт команду.",
  hierarchyTitle: "Правило контроля",
  hierarchyOwner: "Владелец принимает финальное решение.",
  hierarchyAi: "Саби ИИ владельца контролирует всех админов, операторов, бухгалтеров, программистов и водителей от имени владельца.",
  hierarchyNoSelf: "Саби ИИ владельца ничего не выполняет самостоятельно: он предупреждает владельца, показывает риск и ждёт команду.",
  subscriberAi: "ИИ-помощник для пассажиров и водителей остаётся отдельным и не управляет админкой.",
  orderCenterTitle: "Центр заказов",
  orderCenterBody: "Контроль новых заказов, отмен, отсутствия водителя, проблем пассажира, региона, тарифа и причины блокировки.",
  dispatchTitle: "Диспетчеризация",
  dispatchBody: "Контроль назначения, переназначения, истечения предложения, отказа водителя и доступности водителей без локального изменения статуса.",
  tripTitle: "Жизненный цикл поездки",
  tripBody: "Контроль этапов: водитель прибыл, пассажир сел, поездка началась, завершена, отменена или отмечена как безопасность.",
  aiWatchTitle: "Контроль нарушений Саби ИИ владельца",
  aiWatchBody: "Саби ИИ ищет подозрительные отмены, ручные назначения, конфликт тарифов, жалобы по поездке, изменения маршрута, задержки и финансовые риски.",
  staffTitle: "Контроль сотрудников",
  staffOperators: "Операторы: причины назначений, отмен и переназначений.",
  staffDevelopers: "Программисты: скрытые действия записи, фейковый успех, опасные изменения логики диспетчеризации.",
  staffAccountants: "Бухгалтеры: влияние поездки на удержание, комиссию, резерв и расчёт.",
  workflowTitle: "Порядок работы",
  stepOne: "1. Открыть заказ или поездку.",
  stepTwo: "2. Проверить пассажира, водителя, авто, тариф, регион и жалобы.",
  stepThree: "3. Саби ИИ владельца проверяет риск и нарушение правил.",
  stepFour: "4. При риске Саби ИИ владельца докладывает владельцу.",
  stepFive: "5. Действие отправляется только после команды владельца и серверного подтверждения.",
  actionTitle: "Разрешённые действия только через сервер",
  actionBody: "Назначить, переназначить, сделать предложение истёкшим, отменить, отметить прибытие, старт, завершение или флаг безопасности можно только через серверный маршрут, аудит и командный шлюз владельца.",
  languageTitle: "Языки без смешанного мусора",
  languageBody: "Все рабочие тексты этого этапа взяты из словаря выбранного языка. Технические номера, маршруты, исходный формат и серверные пути не переводятся.",
  ready: "Готово в контроле интерфейса",
  backendOnly: "Только серверное действие",
  ownerCommand: "Ждёт команду владельца",
  openFoundation: "Показать предыдущий этап такси",
  hideFoundation: "Скрыть предыдущий этап такси",
};

const EN007M: Copy007M = {
  title: "Taksi: orders, yuborish and trips under egasining Sabi sunʼiy intellekti control",
  subtitle: "Owner Sabi AI is below the owner and above all staff. It monitors orders, driver assignment, and the trip lifecycle, reports to the owner, and waits for a command.",
  hierarchyTitle: "Control rule",
  hierarchyOwner: "The owner makes the final decision.",
  hierarchyAi: "Owner Sabi AI controls admins, operators, accountants, developers, and drivers on behalf of the owner.",
  hierarchyNoSelf: "Owner Sabi AI does not execute actions by itself: it warns the owner, shows risk, and waits for a command.",
  subscriberAi: "The AI assistant for riders and drivers remains separate and does not control Admin.",
  orderCenterTitle: "Order center",
  orderCenterBody: "Monitors new orders, cancellations, no-driver cases, rider issues, region, tariff and blocked reason.",
  dispatchTitle: "Dispatch control",
  dispatchBody: "Monitors assignment, reassignment, offer expiry, driver rejection and driver availability without local holat changes.",
  tripTitle: "Trip lifecycle",
  tripBody: "Controls stages: driver arrived, rider picked up, trip started, completed, cancelled or marked for safety.",
  aiWatchTitle: "egasining Sabi sunʼiy intellekti violation control",
  aiWatchBody: "Sabi AI looks for suspicious cancellations, manual assignments, tariff conflict, trip complaints, route changes, delays and finance risks.",
  staffTitle: "Staff control",
  staffOperators: "Operators: assignment, cancellation and reassignment reasons.",
  staffDevelopers: "Developers: hidden write actions, soxta muvaffaqiyat and dangerous yuborish mantiq changes.",
  staffAccountants: "Accountants: trip impact on hold, commission, reserve and settlement.",
  workflowTitle: "Work order",
  stepOne: "1. Open an order or trip.",
  stepTwo: "2. Check rider, driver, vehicle, tariff, region and complaints.",
  stepThree: "3. egasining Sabi sunʼiy intellekti checks risk and rule violations.",
  stepFour: "4. If risk exists, Owner Sabi AI reports to the owner.",
  stepFive: "5. The action is sent only after the owner command and protected confirmation.",
  actionTitle: "Allowed actions only through server",
  actionBody: "Assign, reassign, expire offer, cancel, mark arrival, start, complete or safety flag can run only through backend route, audit and owner command gate.",
  languageTitle: "Clean language control",
  languageBody: "All working copy in this stage comes from the selected language dictionary. Technical IDs, routes, raw JSON and backend paths are not translated.",
  ready: "Ready in interfeys control",
  backendOnly: "Server action only",
  ownerCommand: "Waiting for owner command",
  openFoundation: "Show previous Taksi stage",
  hideFoundation: "Hide previous Taksi stage",
};

const UZ007M: Copy007M = {
  title: "Taksi: buyurtmalar, yuborish va safarlar egasining Sabi sunʼiy intellekti nazoratida",
  subtitle: "egasining Sabi sunʼiy intellekti egadan pastda va barcha xodimlardan yuqorida turadi. U buyurtmalar, haydovchi tayinlash va safar jarayonini kuzatadi, egaga xabar beradi va buyruq kutadi.",
  hierarchyTitle: "Nazorat qoidasi",
  hierarchyOwner: "Yakuniy qarorni ega qabul qiladi.",
  hierarchyAi: "Egasining Sabi sunʼiy intellekti adminlar, operatorlar, buxgalterlar, dasturchilar va haydovchilarni ega nomidan nazorat qiladi.",
  hierarchyNoSelf: "egasining Sabi sunʼiy intellekti o‘zi mustaqil amal bajarmaydi: egani ogohlantiradi, xavfni ko‘rsatadi va buyruq kutadi.",
  subscriberAi: "Yo‘lovchi va haydovchilar uchun sunʼiy intellekt yordamchisi alohida qoladi va admin boshqaruvini qilmaydi.",
  orderCenterTitle: "Buyurtmalar markazi",
  orderCenterBody: "Yangi buyurtmalar, bekor qilishlar, haydovchi topilmagan holatlar, yo‘lovchi muammolari, hudud, tarif va blok sababi nazorati.",
  dispatchTitle: "Dispatch nazorati",
  dispatchBody: "Tayinlash, qayta tayinlash, offer tugashi, haydovchi rad etishi va haydovchi mavjudligini lokal holat o‘zgartirmasdan kuzatadi.",
  tripTitle: "Safar jarayoni",
  tripBody: "Bosqichlar nazorati: haydovchi keldi, yo‘lovchi olindi, safar boshlandi, yakunlandi, bekor qilindi yoki safety belgisi qo‘yildi.",
  aiWatchTitle: "egasining Sabi sunʼiy intellekti qoidabuzarlik nazorati",
  aiWatchBody: "Sabi sunʼiy intellekti shubhali bekor qilishlar, qo‘lda tayinlashlar, tarif ziddiyati, safar shikoyatlari, marshrut o‘zgarishi, kechikish va moliyaviy xavflarni izlaydi.",
  staffTitle: "Xodimlar nazorati",
  staffOperators: "Operatorlar: tayinlash, bekor qilish va qayta tayinlash sabablari.",
  staffDevelopers: "Dasturchilar: yashirin yozish amali, soxta muvaffaqiyat va xavfli yuborish mantiqi o‘zgarishlari.",
  staffAccountants: "Buxgalterlar: safarning hold, commission, reserve va settlement ta’siri.",
  workflowTitle: "Ish tartibi",
  stepOne: "1. Buyurtma yoki safarni ochish.",
  stepTwo: "2. Yo‘lovchi, haydovchi, avtomobil, tarif, hudud va shikoyatlarni tekshirish.",
  stepThree: "3. Egasining Sabi sunʼiy intellekti xavf va qoida buzilishini tekshiradi.",
  stepFour: "4. Xavf bo‘lsa, egasining Sabi sunʼiy intellekti egaga xabar beradi.",
  stepFive: "5. Amal faqat ega buyrug‘i va server tasdig‘idan keyin yuboriladi.",
  actionTitle: "Ruxsat etilgan amallar faqat server orqali",
  actionBody: "Tayinlash, qayta tayinlash, offer tugatish, bekor qilish, kelganini belgilash, boshlash, yakunlash yoki safety flag faqat backend route, audit va owner command gate orqali bajariladi.",
  languageTitle: "Til aralashmasiz nazorat",
  languageBody: "Ushbu bosqichdagi barcha ishchi matnlar tanlangan til lug‘atidan olinadi. Texnik ID, route, raw JSON va backend path tarjima qilinmaydi.",
  ready: "interfeys nazoratida tayyor",
  backendOnly: "Faqat server action",
  ownerCommand: "Ega buyrug‘i kutilmoqda",
  openFoundation: "Oldingi taksi bosqichini ko‘rsatish",
  hideFoundation: "Oldingi Taksi bosqichini yashirish",
};

const ZH007M: Copy007M = {
  title: "出租车：订单、调度和行程由所有者萨比智能控制",
  subtitle: "所有者萨比智能位于所有者之下并高于所有员工。它监控订单、司机分配和行程生命周期，向所有者报告并等待命令。",
  hierarchyTitle: "控制规则",
  hierarchyOwner: "最终决定由所有者作出。",
  hierarchyAi: "所有者萨比智能代表所有者监督管理员、运营人员、会计、开发者和司机。",
  hierarchyNoSelf: "所有者萨比智能不会自行执行操作：它提醒所有者、展示风险并等待命令。",
  subscriberAi: "面向乘客和司机的智能助手保持独立，不控制管理后台。",
  orderCenterTitle: "订单中心",
  orderCenterBody: "监控新订单、取消、无司机、乘客问题、区域、计价和阻止原因。",
  dispatchTitle: "调度控制",
  dispatchBody: "监控分配、重新分配、报价过期、司机拒绝和司机可用性，不在本地改变状态。",
  tripTitle: "行程生命周期",
  tripBody: "控制阶段：司机到达、乘客上车、行程开始、完成、取消或安全标记。",
  aiWatchTitle: "所有者萨比智能违规控制",
  aiWatchBody: "萨比智能查找可疑取消、手动分配、计价冲突、行程投诉、路线变化、延迟和财务风险。",
  staffTitle: "员工监督",
  staffOperators: "运营人员：分配、取消和重新分配原因。",
  staffDevelopers: "开发者：隐藏写操作、假成功和危险调度逻辑变更。",
  staffAccountants: "会计：行程对扣留、佣金、储备和结算的影响。",
  workflowTitle: "工作顺序",
  stepOne: "1. 打开订单或行程。",
  stepTwo: "2. 检查乘客、司机、车辆、计价、区域和投诉。",
  stepThree: "3. 所有者萨比智能检查风险和规则违规。",
  stepFour: "4. 如有风险，所有者萨比智能向所有者报告。",
  stepFive: "5. 操作只在所有者命令和服务器确认后发送。",
  actionTitle: "允许的操作只能通过服务器",
  actionBody: "分配、重新分配、使报价过期、取消、标记到达、开始、完成或安全标记只能通过服务器路线、审计和所有者命令门执行。",
  languageTitle: "语言不混乱",
  languageBody: "本阶段所有工作文本都来自所选语言词典。技术编号、路线、原始格式和服务器路径不翻译。",
  ready: "界面控制已准备",
  backendOnly: "仅服务器操作",
  ownerCommand: "等待所有者命令",
  openFoundation: "显示之前的出租车阶段",
  hideFoundation: "隐藏之前的出租车阶段",
};

const COPY007M: Record<AdminLanguage, Copy007M> = { ru: RU007M, en: EN007M, uz: UZ007M, zh: ZH007M };
const tx007M = (language: AdminLanguage, key: string) => COPY007M[language]?.[key] ?? EN007M[key] ?? key;

function Meter007M({ label, value }: { label: string; value: number }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="taxi007m-meter"><span>{label}</span><b>{safe}%</b><i style={{ width: `${safe}%` }} /></div>;
}

function WorkCard007M({ title, body, value, marker }: { title: string; body: string; value: number; marker: string }) {
  return <article className="taxi007m-card" data-admin-ui-taxi-007m-work-card={marker}>
    <h2>{title}</h2>
    <p>{body}</p>
    <Meter007M label={body.includes("backend") || body.includes("backend") ? "backend" : ""} value={value} />
  </article>;
}

export function TaxiAdminControl007MPanel({ language, config, setNotice }: Props007M) {
  const [foundationOpen, setFoundationOpen] = useState(false);
  const steps = useMemo(() => ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"], []);
  const staff = useMemo(() => ["staffOperators", "staffDevelopers", "staffAccountants"], []);
  return <section className="taxi007m" data-admin-ui-taxi-007m-orders-dispatch-trips="ready" data-admin-ui-taxi-007m-language-quality="ready" data-admin-ui-taxi-007m-owner-ai-no-self-action="ready">
    <header className="taxi007m-hero">
      <div>
        <p>{MARKER007M}</p>
        <h1>{tx007M(language, "title")}</h1>
        <span>{tx007M(language, "subtitle")}</span>
      </div>
      <div className="taxi007m-status" data-admin-ui-taxi-007m-owner-ai-hierarchy="ready">
        <b>Owner Sabi AI</b>
        <span>{tx007M(language, "ownerCommand")}</span>
      </div>
    </header>

    <section className="taxi007m-grid taxi007m-two">
      <article className="taxi007m-card taxi007m-rule" data-admin-ui-taxi-007m-owner-ai-control-rule="ready">
        <h2>{tx007M(language, "hierarchyTitle")}</h2>
        <ul>
          <li>{tx007M(language, "hierarchyegasi")}</li>
          <li>{tx007M(language, "hierarchyAi")}</li>
          <li>{tx007M(language, "hierarchyNoSelf")}</li>
          <li>{tx007M(language, "subscriberAi")}</li>
        </ul>
      </article>
      <article className="taxi007m-card" data-admin-ui-taxi-007m-staff-control="ready">
        <h2>{tx007M(language, "staffTitle")}</h2>
        <div className="taxi007m-staffList">
          {staff.map((key) => <span key={key}>{tx007M(language, key)}</span>)}
        </div>
      </article>
    </section>

    <section className="taxi007m-grid taxi007m-three" data-admin-ui-taxi-007m-order-dispatch-trip-control="ready">
      <WorkCard007M title={tx007M(language, "orderCenterTitle")} body={tx007M(language, "orderCenterBody")} value={84} marker="orders" />
      <WorkCard007M title={tx007M(language, "yuborishTitle")} body={tx007M(language, "yuborishBody")} value={81} marker="dispatch" />
      <WorkCard007M title={tx007M(language, "tripTitle")} body={tx007M(language, "tripBody")} value={83} marker="trips" />
    </section>

    <section className="taxi007m-grid taxi007m-two">
      <article className="taxi007m-card" data-admin-ui-taxi-007m-ai-violation-watch="ready">
        <h2>{tx007M(language, "aiWatchTitle")}</h2>
        <p>{tx007M(language, "aiWatchBody")}</p>
        <Meter007M label={tx007M(language, "ready")} value={86} />
      </article>
      <article className="taxi007m-card" data-admin-ui-taxi-007m-workflow="ready">
        <h2>{tx007M(language, "workflowTitle")}</h2>
        <ol>{steps.map((key) => <li key={key}>{tx007M(language, key)}</li>)}</ol>
      </article>
    </section>

    <section className="taxi007m-grid taxi007m-two">
      <article className="taxi007m-card" data-admin-ui-taxi-007m-backend-only="ready">
        <h2>{tx007M(language, "actionTitle")}</h2>
        <p>{tx007M(language, "actionBody")}</p>
        <strong>{tx007M(language, "serverOnly")}</strong>
      </article>
      <article className="taxi007m-card" data-admin-ui-taxi-007m-language-guard="ready">
        <h2>{tx007M(language, "languageTitle")}</h2>
        <p>{tx007M(language, "languageBody")}</p>
      </article>
    </section>

    <section className="taxi007m-foundation">
      <button onClick={() => setFoundationOpen((value) => !value)}>{foundationOpen ? tx007M(language, "hideFoundation") : tx007M(language, "openFoundation")}</button>
      {foundationOpen ? <TaxiAdminControl007LPanel language={language} config={config} setNotice={setNotice} /> : null}
    </section>
  </section>;
}
