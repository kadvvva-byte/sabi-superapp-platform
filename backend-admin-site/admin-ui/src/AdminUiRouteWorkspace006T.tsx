import type { ReactNode } from "react";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminReadinessCockpit003L } from "./TaxiAdminReadinessCockpit003L";
import { TaxiStreamAdminLanguage006S } from "./TaxiStreamAdminLanguage006S";

type ModuleCopy = {
  title: string;
  description: string;
  safety: string;
  openHint: string;
  dashboardTitle: string;
  dashboardDescription: string;
  readinessTitle: string;
  readinessDescription: string;
  taxiTitle: string;
  taxiDescription: string;
  sectionControl: string;
  sectionQueue: string;
  sectionSafety: string;
  sectionLaunch: string;
  locked: string;
  ownerOnly: string;
  localOnly: string;
  modules: Array<{ key: string; title: string; description: string; status: string }>;
  taxiBlocks: Array<{ title: string; description: string; controls: string[] }>;
  taxiQueue: Array<{ title: string; value: string; note: string }>;
  launchRules: string[];
};

const COPY: Record<AdminLanguage, ModuleCopy> = {
  ru: {
    title: "Маршруты админ-панели разделены",
    description: "Этап 006 убирает одну огромную страницу: модуль Такси, модуль Стрим, биллинг магазина приложений, Эйрваллекс и готовность теперь открываются в отдельных левых вкладках.",
    safety: "Только админ-интерфейс: сервер, база данных, схема данных, провайдер, кошелёк, платежи, выплаты и производственная активация не трогаются.",
    openHint: "Открой нужную вкладку слева — экран больше не смешивается с другими модулями.",
    dashboardTitle: "Быстрый обзор модулей",
    dashboardDescription: "Панель показывает статус и направление, а управление перенесено в отдельные экраны.",
    readinessTitle: "Готовность и доказательства для проверки",
    readinessDescription: "Отдельная вкладка для карт готовности, доказательств магазина приложений, ИИ, Стрима и Такси, а также безопасных блокеров запуска.",
    taxiTitle: "Taxi Admin Control",
    taxiDescription: "Операционный экран Такси: заявки, водители, тарифы, комиссии, регионы, контроль провайдера, безопасность и запуск.",
    sectionControl: "Управление",
    sectionQueue: "Очереди",
    sectionSafety: "Safety boundary",
    sectionLaunch: "Launch rules",
    locked: "заблокировано до одобрения сервера и провайдера",
    ownerOnly: "principal confirmation required",
    localOnly: "interface-only control map",
    modules: [
      { key: "taxi", title: "Taxi", description: "Отдельный центр управления заказами, водителями, тарифами, комиссиями и блокировкой провайдера.", status: "006T isolated" },
      { key: "stream", title: "Stream", description: "Управление Стримом и основа рабочего контура больше не загружаются внутри панели.", status: "own screen" },
      { key: "google", title: "Google Billing", description: "Панель биллинга магазина приложений и готовность 175 собраны в отдельной вкладке.", status: "digital goods only" },
      { key: "airwallex", title: "Airwallex", description: "Ключи владельца и граница физической коммерции вынесены отдельно от биллинга магазина приложений.", status: "external service locked" },
      { key: "readiness", title: "Readiness", description: "Доказательства для проверки, безопасность магазина приложений и финальные шлюзы без смешивания с операционными экранами.", status: "review screen" },
    ],
    taxiBlocks: [
      { title: "Заказы и диспетчеризация", description: "Очередь заявок, назначение водителя, отмены, сроки обслуживания и ручная проверка маршрута.", controls: ["Новые заявки", "Назначение водителя", "Отмены / споры", "Мониторинг сроков обслуживания"] },
      { title: "Водители и автопарк", description: "Проверка клиента и бизнеса, документы, статусы, классы авто и блокировки безопасности.", controls: ["Проверка документов", "Статус водителя", "Класс авто", "Safety hold"] },
      { title: "Тарифы и комиссия", description: "Региональные тарифы, политика повышенного спроса, комиссия платформы и контроль промоакций.", controls: ["Город / зона", "Базовый тариф", "Комиссия", "Promo lock"] },
      { title: "External service / Balance account boundary", description: "Диспетчеризация провайдера, платежи, выплаты и изменение кошелька остаются выключенными до отдельного одобрения владельца.", controls: ["External service control step", "Balance account lock", "Payment lock", "Payout lock"] },
    ],
    taxiQueue: [
      { title: "Pending orders", value: "interface source", note: "чтение и запись сервера не выполняются" },
      { title: "Drivers review", value: "manual lane", note: "проверка клиента и бизнеса только как админ-контрольный список" },
      { title: "Tariff changes", value: "confirmation lane", note: "изменение требует отдельный серверный этап" },
      { title: "External service activation", value: "locked", note: "нет вызова провайдера и нет поиска учётных данных" },
    ],
    launchRules: [
      "Каждая левая вкладка должна иметь свой экран и маркер маршрута админ-панели этапа 006.",
      "Панель не должна одновременно показывать биллинг Гугл, Эйрваллекс, Стрим, Такси и полные панели готовности.",
      "Навигация на русском, английском, узбекском и китайском должна быть подключена без мусорных запасных подписей.",
      "Никаких изменений сервера, базы данных, схемы данных, провайдера, кошелька, платежей, выплат и производственной активации.",
    ],
  },
  en: {
    title: "admin interface routes are separated",
    description: "006T removes the single overloaded page: Taxi, Stream, Google Billing, Airwallex and readiness now open in their own left tabs.",
    safety: "Interface-only control: data storage, Prisma, external services, balance accounts, charges, withdrawals, and production activation are untouched.",
    openHint: "Open the needed tab on the left — the screen no longer mixes unrelated modules.",
    dashboardTitle: "Fast module overview",
    dashboardDescription: "The dashboard shows state and direction; controls are moved to separate screens.",
    readinessTitle: "Readiness and reviewer evidence",
    readinessDescription: "Separate tab for readiness cards, Play/AI/Stream/Taxi evidence and safe launch blockers.",
    taxiTitle: "Taxi Admin Control",
    taxiDescription: "Taxi operations screen: orders, drivers, tariffs, commission, regions, external service control steps, safety and launch.",
    sectionControl: "Control",
    sectionQueue: "Queues",
    sectionSafety: "Safety boundary",
    sectionLaunch: "Launch rules",
    locked: "locked until server/external service confirmation",
    ownerOnly: "principal confirmation required",
    localOnly: "interface-only control map",
    modules: [
      { key: "taxi", title: "Taxi", description: "Dedicated cockpit for orders, drivers, tariffs, commission and external service lock.", status: "006T isolated" },
      { key: "stream", title: "Stream", description: "Stream control and live environment foundation no longer load inside dashboard.", status: "own screen" },
      { key: "google", title: "Google Billing", description: "Play Billing 100% panel and 175 readiness are grouped in a separate tab.", status: "digital goods only" },
      { key: "airwallex", title: "Airwallex", description: "Owner keys / physical commerce boundary is separated from Google Billing.", status: "provider locked" },
      { key: "readiness", title: "Readiness", description: "Reviewer evidence, Play safety and final gates without mixing operational screens.", status: "review screen" },
    ],
    taxiBlocks: [
      { title: "Orders and dispatch", description: "Order queue, driver assignment, cancellations, SLA and manual route review.", controls: ["New orders", "Driver assignment", "Cancellations / disputes", "SLA monitoring"] },
      { title: "Drivers and fleet", description: "KYC/KYB, documents, statuses, vehicle classes and safety blocks.", controls: ["Document review", "Driver state", "Vehicle class", "Safety hold"] },
      { title: "Tariffs and commission", description: "Regional tariffs, surge policy, platform commission and promo control.", controls: ["City / zone", "Base tariff", "Commission", "Promo lock"] },
      { title: "External service / Balance account boundary", description: "External service dispatch, charge, withdrawal and Balance account mutation stay off until separate principal confirmation.", controls: ["External service control step", "Balance account lock", "Payment lock", "Payout lock"] },
    ],
    taxiQueue: [
      { title: "Pending orders", value: "interface source", note: "No live read or write action is executed" },
      { title: "Drivers review", value: "manual lane", note: "KYC/KYB as Admin checklist only" },
      { title: "Tariff changes", value: "confirmation lane", note: "change requires a separate server stage" },
      { title: "External service activation", value: "locked", note: "no external service call and no credential lookup" },
    ],
    launchRules: [
      "Every left tab must have its own screen and data-admin-ui-006t-route-screen marker.",
      "Dashboard must not render Google Billing, Airwallex, Stream, Taxi and readiness full panels at the same time.",
      "RU/EN/UZ/ZH navigation must be connected without junk fallback labels.",
      "No data storage, Prisma, external service, balance account, charge, withdrawal, or production activation changes.",
    ],
  },
  uz: {
    title: "admin interfeysi yo ‘llari ajratildi",
    description: "006T bitta og ‘ir sahifani olib tashlaydi: Taksi, Strim, Google Billing, Airwallex va tayyorlik endi chapdagi alohida varaqlarda ochiladi.",
    safety: "Faqat admin interfeysi: server, maʼlumotlar bazasi, Prisma, tashqi xizmat, balans hisobi, to‘lov, to‘lov chiqarish va ishlab chiqarishni faollashtirishga tegilmaydi.",
    openHint: "Kerakli bo ‘limni chapdan oching — ekran boshqa modullar bilan aralashmaydi.",
    dashboardTitle: "Modullar tezkor ko ‘rinishi",
    dashboardDescription: "Bosh panel holat va yo ‘nalishni ko ‘rsatadi; boshqaruv alohida ekranlarga ko ‘chirildi.",
    readinessTitle: "Readiness va reviewer evidence",
    readinessDescription: "Readiness kartalari, Play/sun ʼiy intellekt/Strim/Taksi dalil va xavfsiz ishga tushirish bloklovchilar uchun alohida bo ‘lim.",
    taxiTitle: "Taxi Admin Control",
    taxiDescription: "Taxi operatsion ekrani: buyurtmalar, haydovchilar, tariflar, komissiya, regionlar, external service control steps, safety va launch.",
    sectionControl: "Boshqaruv",
    sectionQueue: "Navbatlar",
    sectionSafety: "Safety boundary",
    sectionLaunch: "Launch qoidalari",
    locked: "server/external service confirmationgacha yopiq",
    ownerOnly: "principal confirmation kerak",
    localOnly: "faqat interface control map",
    modules: [
      { key: "taxi", title: "Taxi", description: "Buyurtmalar, haydovchilar, tariflar, komissiya va external service lock uchun cockpit.", status: "006T isolated" },
      { key: "stream", title: "Stream", description: "Stream control va live environment foundation dashboard ichida yuklanmaydi.", status: "own screen" },
      { key: "google", title: "Google Billing", description: "Play Billing 100% panel va 175 tayyorgarlik alohida bo ‘limda.", status: "digital goods only" },
      { key: "airwallex", title: "Airwallex", description: "principal keys / physical commerce boundary Google Billingdan ajratildi.", status: "external service locked" },
      { key: "readiness", title: "Readiness", description: "Reviewer evidence, Play safety va final gates operational ekranlarga aralashmaydi.", status: "review screen" },
    ],
    taxiBlocks: [
      { title: "Buyurtmalar va dispatch", description: "Buyurtma navbati, haydovchi biriktirish, bekor qilish, SLA va route review.", controls: ["Yangi buyurtmalar", "Haydovchi biriktirish", "Bekor / dispute", "SLA monitoring"] },
      { title: "Haydovchilar va park", description: "KYC/KYB, hujjatlar, statuslar, avto klasslar va safety blocklar.", controls: ["Hujjat tekshirish", "Haydovchi holati", "Avto klass", "Safety hold"] },
      { title: "Tariflar va komissiya", description: "Regional tariflar, surge policy, platforma komissiyasi va promo control.", controls: ["Shahar / zona", "Bazaviy tarif", "Komissiya", "Promo lock"] },
      { title: "External service / Balance account boundary", description: "Tashqi xizmat yuborish, to ‘lov, to ‘lov chiqarish va Hamyon o ‘zgartirish alohida egasi tasdiqgacha o ‘chiq.", controls: ["External service control step", "Balance account lock", "Payment lock", "Payout lock"] },
    ],
    taxiQueue: [
      { title: "Pending orders", value: "interface source", note: "Serverdan o‘qish yoki serverga yozish bajarilmaydi" },
      { title: "Drivers review", value: "manual lane", note: "KYC/KYB faqat Admin checklist" },
      { title: "Tariff changes", value: "confirmation lane", note: "o ‘zgarish uchun alohida server bosqichi kerak" },
      { title: "External service activation", value: "locked", note: "tashqi xizmat chaqiruv va ruxsat ma ʼlumotlarini qidirish yo ‘q" },
    ],
    launchRules: [
      "Har bir chap varaq o ‘z ekraniga va 006T admin yo ‘nalishi belgisiga ega bo ‘lishi kerak.",
      "Dashboard Google Billing, Airwallex, Stream, Taxi va readiness full panellarini bir vaqtda render qilmasligi kerak.",
      "RU/EN/UZ/ZH navigatsiya junk fallback labelsiz ulanadi.",
      "Server, ma ʼlumotlar bazasi, Prisma, tashqi xizmat, Hamyon, to ‘lov, to ‘lov chiqarish yoki ishlab chiqarishni faollashtirish o ‘zgarishi yo ‘q.",
    ],
  },
  zh: {
    title: "管理界面路由已拆分",
    description: "阶段006移除单个超载页面：出租车、直播、应用商店计费、空中云汇和就绪状态现在在左侧独立标签打开。",
    safety: "仅管理界面：不触碰服务器、数据库、数据架构、提供商、钱包、支付、付款或生产激活。",
    openHint: "从左侧打开需要的标签；页面不再混合无关模块。",
    dashboardTitle: "模块快速概览",
    dashboardDescription: "看板显示状态和方向，控制内容已移动到独立页面。",
    readinessTitle: "就绪状态与审核证据",
    readinessDescription: "独立标签显示就绪卡片、商店审核、人工智能、直播、出租车证据和安全上线阻断内容。",
    taxiTitle: "Taxi Admin Control",
    taxiDescription: "出租车运营页面：订单、司机、费率、佣金、区域、提供商关口、安全和上线。",
    sectionControl: "控制",
    sectionQueue: "队列",
    sectionSafety: "安全边界",
    sectionLaunch: "上线规则",
    locked: "锁定至服务器和提供商批准",
    ownerOnly: "需要所有者批准",
    localOnly: "仅界面控制图",
    modules: [
      { key: "taxi", title: "Taxi", description: "订单、司机、费率、佣金和提供商锁定的独立控制台。", status: "006T isolated" },
      { key: "stream", title: "Stream", description: "直播控制和运行基础不再加载到看板内。", status: "own screen" },
      { key: "google", title: "Google Billing", description: "商店计费完整面板和175就绪状态放到独立标签。", status: "digital goods only" },
      { key: "airwallex", title: "Airwallex", description: "所有者密钥和实体商务边界与谷歌计费分离。", status: "external service locked" },
      { key: "readiness", title: "Readiness", description: "审核证据、商店安全和最终关口不再混入运营屏幕。", status: "review screen" },
    ],
    taxiBlocks: [
      { title: "订单与调度", description: "订单队列、司机分配、取消、服务时限和人工路线审核。", controls: ["新订单", "司机分配", "取消 / 争议", "SLA monitoring"] },
      { title: "司机与车队", description: "客户和企业验证、文件、状态、车型和安全冻结。", controls: ["文件审核", "司机状态", "车型", "Safety hold"] },
      { title: "费率与佣金", description: "区域费率、高峰政策、平台佣金和促销控制。", controls: ["城市 / 区域", "基础费率", "佣金", "Promo lock"] },
      { title: "External service / Balance account boundary", description: "提供商派单、支付、付款和钱包变更在单独所有者批准前保持关闭。", controls: ["External service control step", "Balance account lock", "Payment lock", "Payout lock"] },
    ],
    taxiQueue: [
      { title: "Pending orders", value: "interface source", note: "不执行服务器读取和写入" },
      { title: "Drivers review", value: "manual lane", note: "客户和企业验证仅作为管理检查清单" },
      { title: "Tariff changes", value: "confirmation lane", note: "变更需要单独服务器阶段" },
      { title: "External service activation", value: "locked", note: "无提供商调用、无凭据查询" },
    ],
    launchRules: [
      "每个左侧标签都必须有自己的屏幕和阶段006管理路由屏幕标记。",
      "看板不得同时渲染谷歌计费、空中云汇、直播、出租车和完整就绪面板。",
      "俄语、英语、乌兹别克语和中文导航必须连接，不能出现垃圾备用标签。",
      "不修改服务器、数据库、数据架构、提供商、钱包、支付、付款或生产激活。",
    ],
  },
};

function getCopy(language: AdminLanguage): ModuleCopy {
  return COPY[language] ?? COPY.ru;
}

export function AdminUiModuleOverview006T(props: { language: AdminLanguage }) {
  const copy = getCopy(props.language);
  return (
    <section className="panel routeWorkspace006T" data-admin-ui-006t-route-screen="dashboard" data-admin-ui-006t-dashboard-route-stack="removed">
      <div className="routeHero006T">
        <div>
          <span className="routeEyebrow006T">ADMIN-UI 006T</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <em className="status ready">route isolated</em>
      </div>
      <div className="alert ok">{copy.openHint}</div>
      <div className="routeModuleGrid006T">
        {copy.modules.map((item) => (
          <article className="card routeModuleCard006T" key={item.key} data-admin-ui-006t-module-card={item.key}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
            <span className="status ready">{item.status}</span>
          </article>
        ))}
      </div>
      <div className="card routeSafety006T">
        <h3>{copy.dashboardTitle}</h3>
        <p>{copy.dashboardDescription}</p>
        <div className="chips"><span>{copy.safety}</span></div>
      </div>
    </section>
  );
}

export function TaxiAdminControl006TPanel(props: { language: AdminLanguage }) {
  const copy = getCopy(props.language);
  return (
    <section className="panel routeScreen006T taxiControl006T" data-admin-ui-006t-route-screen="taxi">
      <div className="panelHead">
        <div>
          <h2>{copy.taxiTitle}</h2>
          <p>{copy.taxiDescription}</p>
        </div>
        <span className="status warn">{copy.localOnly}</span>
      </div>
      <TaxiAdminReadinessCockpit003L />
      <TaxiStreamAdminLanguage006S language={props.language} />
      <div className="split">
        <div className="card">
          <h3>{copy.sectionControl}</h3>
          <div className="taxiControlGrid006T">
            {copy.taxiBlocks.map((block) => (
              <article key={block.title} className="taxiControlBlock006T">
                <strong>{block.title}</strong>
                <p>{block.description}</p>
                <div className="chips">
                  {block.controls.map((control) => <span key={control}>{control}</span>)}
                </div>
                <button type="button" className="ghost" disabled>{copy.locked}</button>
              </article>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{copy.sectionQueue}</h3>
          <div className="tableList">
            {copy.taxiQueue.map((item) => (
              <div className="row compact" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.note}</span>
                <em>{item.value}</em>
              </div>
            ))}
          </div>
          <h3>{copy.sectionSafety}</h3>
          <div className="warning">{copy.safety}</div>
        </div>
      </div>
      <div className="card">
        <h3>{copy.sectionLaunch}</h3>
        <ul className="rulesList">
          {copy.launchRules.map((rule) => <li key={rule}>{rule}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function ReadinessAdminControl006TPanel(props: { language: AdminLanguage; children: ReactNode }) {
  const copy = getCopy(props.language);
  return (
    <section className="panel routeScreen006T" data-admin-ui-006t-route-screen="readiness">
      <div className="panelHead">
        <div>
          <h2>{copy.readinessTitle}</h2>
          <p>{copy.readinessDescription}</p>
        </div>
        <span className="status ready">006T</span>
      </div>
      {props.children}
    </section>
  );
}
