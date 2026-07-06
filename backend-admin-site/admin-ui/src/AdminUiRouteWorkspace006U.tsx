import type { ReactNode } from "react";
import type { AdminLanguage } from "./admin-i18n";

type Tone006U = "ready" | "safe" | "locked" | "warn" | "info";

type Metric006U = {
  label: string;
  value: string;
  note: string;
  tone?: Tone006U;
};

type Module006U = {
  key: string;
  title: string;
  description: string;
  status: string;
  tone: Tone006U;
};

type Control006U = {
  title: string;
  description: string;
  chips: string[];
  status: string;
  tone: Tone006U;
};

type Row006U = {
  title: string;
  value: string;
  note: string;
  tone?: Tone006U;
};

type Copy006U = {
  heroKicker: string;
  safety: string;
  quickActions: string[];
  common: {
    safeDisabled: string;
    uiOnly: string;
    ownerApproval: string;
    noRuntime: string;
    overview: string;
    control: string;
    safetyBoundary: string;
    technicalDetails: string;
    nextStage: string;
    actionLocked: string;
    reviewerReady: string;
  };
  dashboard: {
    title: string;
    description: string;
    metrics: Metric006U[];
    modules: Module006U[];
    lanes: Control006U[];
    evidence: Row006U[];
  };
  taxi: {
    title: string;
    description: string;
    metrics: Metric006U[];
    controls: Control006U[];
    operations: Row006U[];
    safety: Row006U[];
    details: string[];
  };
  stream: {
    title: string;
    description: string;
    metrics: Metric006U[];
    controls: Control006U[];
    operations: Row006U[];
    safety: Row006U[];
    details: string[];
  };
  google: {
    title: string;
    description: string;
    metrics: Metric006U[];
    controls: Control006U[];
    products: Row006U[];
    safety: Row006U[];
    details: string[];
  };
  airwallex: {
    title: string;
    description: string;
    metrics: Metric006U[];
    controls: Control006U[];
    operations: Row006U[];
    safety: Row006U[];
    details: string[];
  };
  readiness: {
    title: string;
    description: string;
    metrics: Metric006U[];
    gates: Control006U[];
    evidence: Row006U[];
    blockers: Row006U[];
    details: string[];
  };
};

const COPY006U: Record<AdminLanguage, Copy006U> = {
  ru: {
    heroKicker: "Админ-панель этапа 006 · чистый центр управления",
    safety: "Только админ-интерфейс. Сервер, база данных, схема данных, провайдер, кошелёк, платежи, выплаты и производственная активация не трогаются.",
    quickActions: ["Обновить экран", "Открыть чеклист", "Показать границу", "Подготовить следующий этап"],
    common: {
      safeDisabled: "Safe-disabled",
      uiOnly: "interface-only",
      ownerApproval: "principal confirmation",
      noRuntime: "Live environment off",
      overview: "Обзор",
      control: "Управление",
      safetyBoundary: "Safety boundary",
      technicalDetails: "Технические детали",
      nextStage: "Следующий этап",
      actionLocked: "Действие заблокировано до отдельного одобрения сервера и провайдера",
      reviewerReady: "Reviewer-ready evidence",
    },
    dashboard: {
      title: "Главная панель Саби",
      description: "Короткий обзор модулей без смешивания всех больших панелей в один экран.",
      metrics: [
        { label: "Экранов разделено", value: "6", note: "Dashboard, Taxi, Stream, Billing, Airwallex, Readiness", tone: "ready" },
        { label: "Build smoke", value: "100%", note: "Этап 006 проверяет сборку админ-панели", tone: "ready" },
        { label: "Safety mode", value: "ON", note: "провайдеры и деньги не активированы", tone: "safe" },
        { label: "Server touch", value: "0", note: "только исходники админ-панели и инструменты", tone: "locked" },
      ],
      modules: [
        { key: "taxi", title: "Taxi", description: "Заявки, водители, тарифы, зоны, комиссии и граница провайдера.", status: "control map ready", tone: "ready" },
        { key: "stream", title: "Stream", description: "Комнаты, модерация, события, готовность подарков и игр без дублей.", status: "single screen", tone: "ready" },
        { key: "google", title: "Google Billing", description: "Цифровые товары, контракты продуктов, безопасность покупок и граница рабочего контура.", status: "digital goods only", tone: "safe" },
        { key: "airwallex", title: "Airwallex", description: "Физическая коммерция, ключи владельца, проверка бизнеса и клиента, готовность расчётов.", status: "external service locked", tone: "locked" },
        { key: "readiness", title: "Readiness", description: "Reviewer evidence, launch blockers, Play/AI/Stream/Taxi gates.", status: "review center", tone: "info" },
      ],
      lanes: [
        { title: "Navigation", description: "Каждая левая вкладка открывает свой чистый экран.", chips: ["own route", "no blank screen", "no stack"], status: "ready", tone: "ready" },
        { title: "Visual hierarchy", description: "Короткие сводные карточки сверху, детали ниже.", chips: ["readable", "less noise", "clear sections"], status: "polished", tone: "ready" },
        { title: "Safety", description: "Все действия рабочего контура остаются выключенными до отдельного одобрения.", chips: ["no external service call", "no balance account", "no withdrawal"], status: "safe", tone: "safe" },
      ],
      evidence: [
        { title: "Route screens", value: "006U markers", note: "маркер экрана маршрута этапа 006 на всех ключевых вкладках", tone: "ready" },
        { title: "Duplicate panels", value: "removed from route tabs", note: "старые большие пары биллинга, Эйрваллекс и Стрима больше не отображаются", tone: "ready" },
        { title: "Languages", value: "RU / EN / UZ / ZH", note: "краткие понятные подписи без мусора", tone: "info" },
      ],
    },
    taxi: {
      title: "Taxi Control Center",
      description: "Операционный экран Такси: заявки, водители, тарифы, регионы, комиссии, безопасность и запуск.",
      metrics: [
        { label: "Mode", value: "interface-only", note: "нет серверного чтения и записи", tone: "safe" },
        { label: "Orders", value: "control map", note: "диспетчеризация подготовлена визуально", tone: "info" },
        { label: "External service", value: "locked", note: "нет диспетчеризации и вызова провайдера", tone: "locked" },
        { label: "Launch", value: "blocked", note: "до отдельного производственного одобрения", tone: "warn" },
      ],
      controls: [
        { title: "Заказы", description: "Новые заявки, ручная проверка маршрута, отмены и сроки обслуживания.", chips: ["new", "assign", "cancel", "SLA"], status: "planned", tone: "info" },
        { title: "Водители", description: "Проверка клиента и бизнеса, документы, классы авто, блокировки и ручная проверка.", chips: ["documents", "status", "fleet", "hold"], status: "confirmation lane", tone: "safe" },
        { title: "Тарифы", description: "Городские зоны, базовая цена, повышенный спрос, комиссия и промо-блокировка.", chips: ["zones", "base", "surge", "commission"], status: "owner controlled", tone: "warn" },
        { title: "External service / Balance account", description: "Диспетчеризация, платежи, выплаты и изменение кошелька выключены.", chips: ["external service off", "balance account off", "charge off", "withdrawal off"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Pending orders", value: "interface queue", note: "реальные заявки появятся только после серверного этапа", tone: "info" },
        { title: "Driver review", value: "manual lane", note: "документы и статусы без изменения базы данных", tone: "safe" },
        { title: "Tariff change", value: "requires confirmation", note: "изменение тарифа нельзя выполнять из этапа 006", tone: "warn" },
        { title: "External service activation", value: "blocked", note: "нет поиска учётных данных и диспетчеризации провайдера", tone: "locked" },
      ],
      safety: [
        { title: "Money movement", value: "off", note: "платежи и выплаты отключены", tone: "locked" },
        { title: "Production launch", value: "off", note: "нужно отдельное одобрение владельца", tone: "locked" },
        { title: "Admin visibility", value: "ready", note: "видно что будет управляться дальше", tone: "ready" },
      ],
      details: [
        "Экран Такси больше не зависит от панели Стрима.",
        "Все контрольные карточки являются безопасными карточками интерфейса для будущих серверных этапов.",
        "Комиссии, тарифы, платежи и выплаты не меняются на этапе 006.",
      ],
    },
    stream: {
      title: "Stream Control Center",
      description: "Один чистый экран для комнат, модерации, событий, готовности подарков и игр, а также границы провайдера.",
      metrics: [
        { label: "Rooms", value: "0", note: "рабочий контур не активирован", tone: "locked" },
        { label: "Moderation", value: "ready map", note: "отчёты и события в отдельном блоке", tone: "ready" },
        { label: "External service", value: "not configured", note: "external service call off", tone: "locked" },
        { label: "Gifts/Games", value: "safe plan", note: "без активации кошелька и платежей", tone: "safe" },
      ],
      controls: [
        { title: "Room control", description: "Комнаты, ведущий, соведущий, очередь, состояние эфира и ручные проверки.", chips: ["rooms", "host", "queue", "state"], status: "safe-disabled", tone: "safe" },
        { title: "Moderation", description: "Отчёты, процесс заглушения и блокировки, проверка злоупотреблений и шлюзы безопасности.", chips: ["reports", "mute", "ban", "appeal"], status: "ready map", tone: "ready" },
        { title: "Events", description: "События комнат, поток аудита и операционная временная шкала.", chips: ["timeline", "audit", "visibility"], status: "display ready", tone: "info" },
        { title: "Gifts & games", description: "Граница демо-игр и подарков без денег и без выплат.", chips: ["demo", "no cash-out", "official withdrawal later"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Create room", value: "blocked", note: "нет включения реального времени, провайдера и рабочего контура", tone: "locked" },
        { title: "Moderation reports", value: "empty", note: "готово место для реальных отчётов", tone: "info" },
        { title: "Events", value: "empty", note: "будет подключено после одобрения серверного маршрута", tone: "info" },
        { title: "Technical endpoint dump", value: "moved down", note: "не занимает половину экрана", tone: "ready" },
      ],
      safety: [
        { title: "Realtime gateway", value: "off", note: "не стартует из админ-интерфейса", tone: "locked" },
        { title: "Recording/CDN", value: "off", note: "нет действия хранилища или провайдера", tone: "locked" },
        { title: "Balance account/charge", value: "off", note: "движение денег для подарков и игр выключено", tone: "safe" },
      ],
      details: [
        "Дублирующиеся панели Стрима убраны из вкладки Стрима.",
        "Основа рабочего контура показывается как читаемый контрольный список, а не как стена адресов.",
        "Будущий серверный этап должен подключать реальные комнаты, отчёты и события отдельно.",
      ],
    },
    google: {
      title: "Google Billing Control Center",
      description: "Один понятный экран для цифровых товаров, границы биллинга магазина приложений, контрактов продуктов и безопасности покупок.",
      metrics: [
        { label: "External service", value: "google_billing", note: "Android digital goods only", tone: "safe" },
        { label: "State", value: "safe-disabled", note: "live environment purchase off", tone: "locked" },
        { label: "Products", value: "3", note: "console products ready for review", tone: "info" },
        { label: "Balance account bypass", value: "blocked", note: "no Airwallex/Balance account for digital goods", tone: "safe" },
      ],
      controls: [
        { title: "Product contracts", description: "Coin packs, gifts, boosts and premium digital goods contract map.", chips: ["coins", "gifts", "boosts", "premium"], status: "review ready", tone: "ready" },
        { title: "Purchase safety", description: "No false purchase success, no bypass, no external service live environment call.", chips: ["no false success", "server verify later", "refund safe"], status: "safe", tone: "safe" },
        { title: "Play Console", description: "Админ-интерфейс показывает, что нужно сверить в консоли магазина приложений, но ничего не публикует.", chips: ["manual review", "no upload", "no release"], status: "owner action", tone: "warn" },
        { title: "Live environment boundary", description: "Server verification and entitlement grant require separate server confirmation.", chips: ["verify off", "grant off", "balance account off"], status: "locked", tone: "locked" },
      ],
      products: [
        { title: "Digital coin pack", value: "Play Billing only", note: "покупается только через биллинг магазина приложений", tone: "safe" },
        { title: "Premium gift", value: "digital goods", note: "обход через кошелёк или Эйрваллекс запрещён", tone: "safe" },
        { title: "Game entitlement", value: "digital goods", note: "ставки и движение денег не включены", tone: "locked" },
      ],
      safety: [
        { title: "External service credentials", value: "not read", note: "этап 006 не читает файл окружения и секретные значения", tone: "safe" },
        { title: "Purchase capture", value: "off", note: "нет списания, оплаты и возврата", tone: "locked" },
        { title: "Entitlement ledger", value: "off", note: "нет записи в базу данных", tone: "locked" },
      ],
      details: [
        "Старые панели биллинга магазина приложений и готовности больше не дублируются на странице.",
        "Детали готовности свёрнуты и показаны коротко.",
        "Реальная серверная проверка будет только отдельным серверным этапом.",
      ],
    },
    airwallex: {
      title: "Airwallex Control Center",
      description: "Физическая коммерция, граница продавца, ключи владельца и готовность расчётов без активации провайдера.",
      metrics: [
        { label: "External service", value: "airwallex", note: "physical commerce only", tone: "info" },
        { label: "principal keys", value: "not configured", note: "секретные значения не читаются", tone: "locked" },
        { label: "Digital goods", value: "blocked", note: "Google Billing only", tone: "safe" },
        { label: "Live environment", value: "off", note: "no external service call", tone: "locked" },
      ],
      controls: [
        { title: "Merchant commerce", description: "Physical goods/services settlement after KYB/KYC and external service confirmation.", chips: ["merchant", "KYB", "settlement", "physical"], status: "planned", tone: "info" },
        { title: "principal key intake", description: "Reference labels only; no raw secrets and no credential lookup.", chips: ["labels only", "no secrets", "principal confirmation"], status: "safe-disabled", tone: "safe" },
        { title: "Payment boundary", description: "Cannot buy Android digital gifts, coins, boosts or game entitlements.", chips: ["no digital goods", "no bypass", "no wallet route"], status: "blocked", tone: "locked" },
        { title: "Settlement readiness", description: "Payout/settlement requires compliance, taxes and Admin confirmation.", chips: ["AML", "tax", "risk", "approval"], status: "future stage", tone: "warn" },
      ],
      operations: [
        { title: "Merchant onboarding", value: "future", note: "needs KYB/KYC server flow", tone: "warn" },
        { title: "External service keys", value: "principal confirmation", note: "no .env read in 006U", tone: "safe" },
        { title: "External service call", value: "off", note: "no live environment enablement", tone: "locked" },
        { title: "Google Billing conflict", value: "blocked", note: "digital goods stay Google Billing only", tone: "safe" },
      ],
      safety: [
        { title: "Balance account mutation", value: "off", note: "balance not changed", tone: "locked" },
        { title: "Payment capture", value: "off", note: "no Airwallex charge", tone: "locked" },
        { title: "Payout", value: "off", note: "no settlement movement", tone: "locked" },
      ],
      details: [
        "Старые панели Эйрваллекс и готовности объединены в понятный экран.",
        "Метки ключей владельца показаны как безопасная граница, а не как секреты.",
        "Физическая коммерция отделена от цифровых товаров для Андроид.",
      ],
    },
    readiness: {
      title: "Readiness & Reviewer Evidence",
      description: "Блокеры запуска, доказательства для проверки и шлюзы безопасности собраны в один читаемый центр.",
      metrics: [
        { label: "Launch", value: "blocked", note: "нет производственной активации", tone: "locked" },
        { label: "Evidence", value: "grouped", note: "Play, AI, Stream, Taxi, Billing", tone: "ready" },
        { label: "Safety gates", value: "visible", note: "boundary state without live environment", tone: "safe" },
        { label: "Next", value: "server stages", note: "только после одобрения владельца", tone: "warn" },
      ],
      gates: [
        { title: "Google Billing", description: "Digital goods use Play Billing; Balance account/Airwallex bypass blocked.", chips: ["Play Billing", "server verify later", "no bypass"], status: "review ready", tone: "safe" },
        { title: "Airwallex", description: "Physical commerce only; principal keys and external service live environment locked.", chips: ["physical", "owner keys", "external service off"], status: "locked", tone: "locked" },
        { title: "Stream", description: "Rooms/moderation/gifts/games readiness without realtime activation.", chips: ["rooms", "moderation", "gifts"], status: "safe-disabled", tone: "safe" },
        { title: "Taxi", description: "Orders/drivers/tariffs control map before server/external service execution.", chips: ["orders", "drivers", "tariffs"], status: "interface ready", tone: "ready" },
        { title: "Production", description: "No release, no charge, no withdrawal, no live environment activation in this stage.", chips: ["no release", "no money", "no database"], status: "blocked", tone: "locked" },
      ],
      evidence: [
        { title: "Reviewer screens", value: "clean", note: "карточки вместо длинных техно-дампов", tone: "ready" },
        { title: "Launch blockers", value: "visible", note: "понятно, что нельзя включать без одобрения", tone: "safe" },
        { title: "Localization", value: "RU/EN/UZ/ZH", note: "короткие понятные подписи", tone: "info" },
      ],
      blockers: [
        { title: "External service live environment", value: "off", note: "requires separate exact principal confirmation", tone: "locked" },
        { title: "database/Prisma", value: "not touched", note: "no schema/migration/generate", tone: "safe" },
        { title: "Money movement", value: "off", note: "no charge, withdrawal, Balance account mutation", tone: "locked" },
      ],
      details: [
        "Экран готовности больше не выглядит как технический мусорный список.",
        "Доказательства сгруппированы по шлюзам запуска и потребностям проверки.",
        "Все реальные включения остаются за будущими серверными этапами и этапами провайдера.",
      ],
    },
  },
  en: {
    heroKicker: "ADMIN-UI 006U · clean control center",
    safety: "Interface-only control. Data storage, Prisma, external services, balance accounts, charges, withdrawals, and production activation are untouched.",
    quickActions: ["Refresh screen", "Open checklist", "Show boundary", "Prepare next stage"],
    common: {
      safeDisabled: "Safe-disabled",
      uiOnly: "interface-only",
      ownerApproval: "principal confirmation",
      noRuntime: "Live environment off",
      overview: "Overview",
      control: "Control",
      safetyBoundary: "Safety boundary",
      technicalDetails: "Technical details",
      nextStage: "Next stage",
      actionLocked: "Action is locked until separate server/external service confirmation",
      reviewerReady: "Reviewer-ready evidence",
    },
    dashboard: {
      title: "Sabi Admin dashboard",
      description: "Short module overview without stacking every large panel on one screen.",
      metrics: [
        { label: "Separated screens", value: "6", note: "Dashboard, Taxi, Stream, Billing, Airwallex, Readiness", tone: "ready" },
        { label: "Build smoke", value: "100%", note: "006U verifies admin interface build", tone: "ready" },
        { label: "Safety mode", value: "ON", note: "providers and money are not activated", tone: "safe" },
        { label: "Server touch", value: "0", note: "admin-ui/src and tools only", tone: "locked" },
      ],
      modules: [
        { key: "taxi", title: "Taxi", description: "Orders, drivers, tariffs, zones, commission and external service boundary.", status: "control map ready", tone: "ready" },
        { key: "stream", title: "Stream", description: "Rooms, moderation, events, gifts/games readiness without duplicates.", status: "single screen", tone: "ready" },
        { key: "google", title: "Google Billing", description: "Digital goods, product contracts, purchase safety and live environment boundary.", status: "digital goods only", tone: "safe" },
        { key: "airwallex", title: "Airwallex", description: "Physical commerce, owner keys, KYB/KYC and settlement readiness.", status: "external service locked", tone: "locked" },
        { key: "readiness", title: "Readiness", description: "Reviewer evidence, launch blockers, Play/AI/Stream/Taxi gates.", status: "review center", tone: "info" },
      ],
      lanes: [
        { title: "Navigation", description: "Every left tab opens its own clean screen.", chips: ["own route", "no blank screen", "no stack"], status: "ready", tone: "ready" },
        { title: "Visual hierarchy", description: "Short summary cards first, details lower on the page.", chips: ["readable", "less noise", "clear sections"], status: "polished", tone: "ready" },
        { title: "Safety", description: "Live environment actions stay disabled until separate confirmation.", chips: ["no external service call", "no balance account", "no withdrawal"], status: "safe", tone: "safe" },
      ],
      evidence: [
        { title: "Route screens", value: "006U markers", note: "data-admin-ui-006u-route-screen exists on every key tab", tone: "ready" },
        { title: "Duplicate panels", value: "removed from route tabs", note: "old large billing/airwallex/stream pairs are no longer rendered", tone: "ready" },
        { title: "Languages", value: "RU / EN / UZ / ZH", note: "short readable labels", tone: "info" },
      ],
    },
    taxi: {
      title: "Taxi Control Center",
      description: "Operations screen for orders, drivers, tariffs, regions, commission, safety and launch.",
      metrics: [
        { label: "Mode", value: "interface-only", note: "No live read or write", tone: "safe" },
        { label: "Orders", value: "control map", note: "dispatch is visually prepared", tone: "info" },
        { label: "External service", value: "locked", note: "no dispatch/external service call", tone: "locked" },
        { label: "Launch", value: "blocked", note: "requires production confirmation", tone: "warn" },
      ],
      controls: [
        { title: "Orders", description: "New orders, manual route review, cancellations and SLA.", chips: ["new", "assign", "cancel", "SLA"], status: "planned", tone: "info" },
        { title: "Drivers", description: "KYC/KYB, documents, vehicle classes, blocks and manual review.", chips: ["documents", "status", "fleet", "hold"], status: "confirmation lane", tone: "safe" },
        { title: "Tariffs", description: "City zones, base price, surge, commission and promo lock.", chips: ["zones", "base", "surge", "commission"], status: "owner controlled", tone: "warn" },
        { title: "External service / Balance account", description: "Dispatch, charge, withdrawal and Balance account mutation are disabled.", chips: ["external service off", "balance account off", "charge off", "withdrawal off"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Pending orders", value: "interface queue", note: "real orders come after a server stage", tone: "info" },
        { title: "Driver review", value: "manual lane", note: "documents and statees without database mutation", tone: "safe" },
        { title: "Tariff change", value: "requires confirmation", note: "006U cannot change tariffs", tone: "warn" },
        { title: "External service activation", value: "blocked", note: "no credential lookup and no external service dispatch", tone: "locked" },
      ],
      safety: [
        { title: "Money movement", value: "off", note: "charge/withdrawal disabled", tone: "locked" },
        { title: "Production launch", value: "off", note: "requires separate principal confirmation", tone: "locked" },
        { title: "Admin visibility", value: "ready", note: "next controls are clear", tone: "ready" },
      ],
      details: [
        "Taxi screen no longer depends on Stream panels.",
        "All control cards are safe interface maps for future server stages.",
        "Commission, tariffs, charge and withdrawal are not changed in 006U.",
      ],
    },
    stream: {
      title: "Stream Control Center",
      description: "One clean screen for rooms, moderation, events, gifts/games readiness and external service boundary.",
      metrics: [
        { label: "Rooms", value: "0", note: "live environment is not activated", tone: "locked" },
        { label: "Moderation", value: "ready map", note: "reports/events have their own area", tone: "ready" },
        { label: "External service", value: "not configured", note: "external service call off", tone: "locked" },
        { label: "Gifts/Games", value: "safe plan", note: "no Balance account/charge activation", tone: "safe" },
      ],
      controls: [
        { title: "Room control", description: "Rooms, host, co-host, queue, live state and manual checks.", chips: ["rooms", "host", "queue", "state"], status: "safe-disabled", tone: "safe" },
        { title: "Moderation", description: "Reports, mute/ban workflow, abuse review and safety gates.", chips: ["reports", "mute", "ban", "appeal"], status: "ready map", tone: "ready" },
        { title: "Events", description: "Room events, audit stream and operational timeline.", chips: ["timeline", "audit", "visibility"], status: "display ready", tone: "info" },
        { title: "Gifts & games", description: "Demo games/gifts boundary without money or withdrawal.", chips: ["demo", "no cash-out", "official withdrawal later"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Create room", value: "blocked", note: "no realtime/external service live environment enablement", tone: "locked" },
        { title: "Moderation reports", value: "empty", note: "space is ready for real reports", tone: "info" },
        { title: "Events", value: "empty", note: "connect after backend route approval", tone: "info" },
        { title: "Technical endpoint dump", value: "moved down", note: "it no longer takes half the screen", tone: "ready" },
      ],
      safety: [
        { title: "Realtime gateway", value: "off", note: "not started by admin interface", tone: "locked" },
        { title: "Recording/CDN", value: "off", note: "no storage/external service action", tone: "locked" },
        { title: "Balance account/charge", value: "off", note: "gift/game money movement disabled", tone: "safe" },
      ],
      details: [
        "Duplicated Stream panels are removed from the Stream tab.",
        "Live environment foundation is shown as a readable checklist, not an endpoint wall.",
        "Future server stage must connect real rooms/reports/events separately.",
      ],
    },
    google: {
      title: "Google Billing Control Center",
      description: "One readable screen for digital goods, Play Billing boundary, product contracts and purchase safety.",
      metrics: [
        { label: "External service", value: "google_billing", note: "Android digital goods only", tone: "safe" },
        { label: "State", value: "safe-disabled", note: "live environment purchase off", tone: "locked" },
        { label: "Products", value: "3", note: "console products ready for review", tone: "info" },
        { label: "Balance account bypass", value: "blocked", note: "no Airwallex/Balance account for digital goods", tone: "safe" },
      ],
      controls: [
        { title: "Product contracts", description: "Coin packs, gifts, boosts and premium digital goods contract map.", chips: ["coins", "gifts", "boosts", "premium"], status: "review ready", tone: "ready" },
        { title: "Purchase safety", description: "No false purchase success, no bypass and no external service live environment call.", chips: ["no false success", "server verify later", "refund safe"], status: "safe", tone: "safe" },
        { title: "Play Console", description: "admin interface shows what to verify in Play Console, but publishes nothing.", chips: ["manual review", "no upload", "no release"], status: "owner action", tone: "warn" },
        { title: "Live environment boundary", description: "Server verification and entitlement grant require separate server confirmation.", chips: ["verify off", "grant off", "balance account off"], status: "locked", tone: "locked" },
      ],
      products: [
        { title: "Digital coin pack", value: "Play Billing only", note: "must be purchased through Google Play Billing", tone: "safe" },
        { title: "Premium gift", value: "digital goods", note: "Balance account/Airwallex bypass is blocked", tone: "safe" },
        { title: "Game entitlement", value: "digital goods", note: "stake/money movement disabled", tone: "locked" },
      ],
      safety: [
        { title: "External service credentials", value: "not read", note: "006U does not read .env or secret values", tone: "safe" },
        { title: "Purchase capture", value: "off", note: "no capture/charge/refund", tone: "locked" },
        { title: "Entitlement ledger", value: "off", note: "no database write", tone: "locked" },
      ],
      details: [
        "Old Google Billing 100% and 175 readiness panels no longer duplicate on this page.",
        "Readiness details are short and grouped.",
        "Real server verification will be a separate server stage.",
      ],
    },
    airwallex: {
      title: "Airwallex Control Center",
      description: "Physical commerce, merchant boundary, principal keys and settlement readiness without external service activation.",
      metrics: [
        { label: "External service", value: "airwallex", note: "physical commerce only", tone: "info" },
        { label: "principal keys", value: "not configured", note: "secret values are not read", tone: "locked" },
        { label: "Digital goods", value: "blocked", note: "Google Billing only", tone: "safe" },
        { label: "Live environment", value: "off", note: "no external service call", tone: "locked" },
      ],
      controls: [
        { title: "Merchant commerce", description: "Physical goods/services settlement after KYB/KYC and external service confirmation.", chips: ["merchant", "KYB", "settlement", "physical"], status: "planned", tone: "info" },
        { title: "principal key intake", description: "Reference labels only; no raw secrets and no credential lookup.", chips: ["labels only", "no secrets", "principal confirmation"], status: "safe-disabled", tone: "safe" },
        { title: "Payment boundary", description: "Cannot buy Android digital gifts, coins, boosts or game entitlements.", chips: ["no digital goods", "no bypass", "no wallet route"], status: "blocked", tone: "locked" },
        { title: "Settlement readiness", description: "Payout/settlement requires compliance, taxes and Admin confirmation.", chips: ["AML", "tax", "risk", "approval"], status: "future stage", tone: "warn" },
      ],
      operations: [
        { title: "Merchant onboarding", value: "future", note: "needs KYB/KYC server flow", tone: "warn" },
        { title: "External service keys", value: "principal confirmation", note: "no .env read in 006U", tone: "safe" },
        { title: "External service call", value: "off", note: "no live environment enablement", tone: "locked" },
        { title: "Google Billing conflict", value: "blocked", note: "digital goods stay Google Billing only", tone: "safe" },
      ],
      safety: [
        { title: "Balance account mutation", value: "off", note: "balance not changed", tone: "locked" },
        { title: "Payment capture", value: "off", note: "no Airwallex charge", tone: "locked" },
        { title: "Payout", value: "off", note: "no settlement movement", tone: "locked" },
      ],
      details: [
        "Old Airwallex 100% and 174A readiness panels are merged into a readable screen.",
        "principal-key labels are shown as a safe boundary, not secrets.",
        "Physical commerce is separated from Android digital goods.",
      ],
    },
    readiness: {
      title: "Readiness & Reviewer Evidence",
      description: "Launch blockers, reviewer evidence and safety gates are grouped in one readable center.",
      metrics: [
        { label: "Launch", value: "blocked", note: "no production activation", tone: "locked" },
        { label: "Evidence", value: "grouped", note: "Play, AI, Stream, Taxi, Billing", tone: "ready" },
        { label: "Safety gates", value: "visible", note: "boundary state without live environment", tone: "safe" },
        { label: "Next", value: "server stages", note: "only after principal confirmation", tone: "warn" },
      ],
      gates: [
        { title: "Google Billing", description: "Digital goods use Play Billing; Balance account/Airwallex bypass blocked.", chips: ["Play Billing", "server verify later", "no bypass"], status: "review ready", tone: "safe" },
        { title: "Airwallex", description: "Physical commerce only; principal keys and external service live environment locked.", chips: ["physical", "owner keys", "external service off"], status: "locked", tone: "locked" },
        { title: "Stream", description: "Rooms/moderation/gifts/games readiness without realtime activation.", chips: ["rooms", "moderation", "gifts"], status: "safe-disabled", tone: "safe" },
        { title: "Taxi", description: "Orders/drivers/tariffs control map before server/external service execution.", chips: ["orders", "drivers", "tariffs"], status: "interface ready", tone: "ready" },
        { title: "Production", description: "No release, no charge, no withdrawal, no live environment activation in this stage.", chips: ["no release", "no money", "no database"], status: "blocked", tone: "locked" },
      ],
      evidence: [
        { title: "Reviewer screens", value: "clean", note: "cards instead of long technical dumps", tone: "ready" },
        { title: "Launch blockers", value: "visible", note: "clear what cannot be enabled without confirmation", tone: "safe" },
        { title: "Localization", value: "RU/EN/UZ/ZH", note: "short readable labels", tone: "info" },
      ],
      blockers: [
        { title: "External service live environment", value: "off", note: "requires separate exact principal confirmation", tone: "locked" },
        { title: "database/Prisma", value: "not touched", note: "no schema/migration/generate", tone: "safe" },
        { title: "Money movement", value: "off", note: "no charge, withdrawal, Balance account mutation", tone: "locked" },
      ],
      details: [
        "Readiness screen no longer looks like a technical dump.",
        "Evidence is grouped by launch gates and reviewer needs.",
        "All real enablement remains for future server/external service stages.",
      ],
    },
  },
  uz: {
    heroKicker: "ADMIN-UI 006U · toza control center",
    safety: "Faqat admin interfeysi. Server, maʼlumotlar bazasi, Prisma, tashqi xizmat, balans hisobi, to‘lov, to‘lov chiqarish va ishlab chiqarishni faollashtirishga tegilmaydi.",
    quickActions: ["Ekranni yangilash", "Checklistni ochish", "Boundary ko ‘rsatish", "Keyingi stage tayyorlash"],
    common: {
      safeDisabled: "Safe-disabled",
      uiOnly: "interface-only",
      ownerApproval: "principal confirmation",
      noRuntime: "Live environment off",
      overview: "Ko ‘rinish",
      control: "Boshqaruv",
      safetyBoundary: "Safety boundary",
      technicalDetails: "Texnik tafsilotlar",
      nextStage: "Keyingi stage",
      actionLocked: "Bu action alohida server/external service confirmationgacha yopiq",
      reviewerReady: "Reviewer-ready evidence",
    },
    dashboard: {
      title: "Sabi Admin bosh paneli",
      description: "Barcha katta panellarni bitta sahifaga yig ‘masdan, modullar bo ‘yicha qisqa ko ‘rinish.",
      metrics: [
        { label: "Ajratilgan ekranlar", value: "6", note: "Dashboard, Taxi, Stream, Billing, Airwallex, Readiness", tone: "ready" },
        { label: "Build smoke", value: "100%", note: "006U admin interface buildni tekshiradi", tone: "ready" },
        { label: "Safety mode", value: "ON", note: "external service va pul yoqilmagan", tone: "safe" },
        { label: "Server touch", value: "0", note: "faqat admin-ui/src va tools", tone: "locked" },
      ],
      modules: [
        { key: "taxi", title: "Taxi", description: "Buyurtmalar, haydovchilar, tariflar, zonalar, komissiya va external service boundary.", status: "control map ready", tone: "ready" },
        { key: "stream", title: "Stream", description: "Xonalar, moderatsiya, events, gifts/games readiness dublsiz.", status: "single screen", tone: "ready" },
        { key: "google", title: "Google Billing", description: "Digital goods, product contracts, purchase safety va live environment boundary.", status: "digital goods only", tone: "safe" },
        { key: "airwallex", title: "Airwallex", description: "Physical commerce, owner keys, KYB/KYC va settlement readiness.", status: "external service locked", tone: "locked" },
        { key: "readiness", title: "Readiness", description: "Reviewer evidence, launch blockers, Play/AI/Stream/Taxi gates.", status: "review center", tone: "info" },
      ],
      lanes: [
        { title: "Navigation", description: "Har bir chap varaq o‘z toza ekranini ochadi.", chips: ["own route", "no blank screen", "no stack"], status: "ready", tone: "ready" },
        { title: "Visual hierarchy", description: "Avval qisqa summary cards, keyin pastda tafsilotlar.", chips: ["readable", "less noise", "clear sections"], status: "polished", tone: "ready" },
        { title: "Safety", description: "Ishlash muhiti actions alohida tasdiqgacha o ‘chiq qoladi.", chips: ["no external service call", "no balance account", "no withdrawal"], status: "safe", tone: "safe" },
      ],
      evidence: [
        { title: "Route screens", value: "006U markers", note: "har bir muhim varaq uchun 006-bosqich admin yo ‘nalishi ekrani belgisi bor", tone: "ready" },
        { title: "Duplicate panels", value: "removed from route tabs", note: "eski katta billing/airwallex/stream juftlari render bo‘lmaydi", tone: "ready" },
        { title: "Languages", value: "RU / EN / UZ / ZH", note: "qisqa va tushunarli labels", tone: "info" },
      ],
    },
    taxi: {
      title: "Taxi Control Center",
      description: "Buyurtmalar, haydovchilar, tariflar, regionlar, komissiya, safety va launch uchun operatsion ekran.",
      metrics: [
        { label: "Mode", value: "interface-only", note: "serverdan o ‘qish yoki serverga yozish yo ‘q", tone: "safe" },
        { label: "Orders", value: "control map", note: "yuborish vizual tayyor", tone: "info" },
        { label: "External service", value: "locked", note: "yuborish/tashqi xizmat chaqiruv yo ‘q", tone: "locked" },
        { label: "Launch", value: "blocked", note: "production confirmation kerak", tone: "warn" },
      ],
      controls: [
        { title: "Orders", description: "Yangi buyurtmalar, route review, bekor qilishlar va SLA.", chips: ["new", "assign", "cancel", "SLA"], status: "planned", tone: "info" },
        { title: "Drivers", description: "KYC/KYB, documents, vehicle classes, blocks va manual review.", chips: ["documents", "status", "fleet", "hold"], status: "confirmation lane", tone: "safe" },
        { title: "Tariffs", description: "City zones, base price, surge, commission va promo lock.", chips: ["zones", "base", "surge", "commission"], status: "owner controlled", tone: "warn" },
        { title: "External service / Balance account", description: "Dispatch, to ‘lov, to ‘lov chiqarish va Hamyon o ‘zgartirish o ‘chiq.", chips: ["external service off", "balance account off", "charge off", "withdrawal off"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Pending orders", value: "interface queue", note: "real orders server stagedan keyin", tone: "info" },
        { title: "Driver review", value: "manual lane", note: "documents/state database mutationsiz", tone: "safe" },
        { title: "Tariff change", value: "requires confirmation", note: "006U tarifni o ‘zgartirmaydi", tone: "warn" },
        { title: "External service activation", value: "blocked", note: "ruxsat ma ʼlumotlarini qidirish va tashqi xizmat yuborish yo ‘q", tone: "locked" },
      ],
      safety: [
        { title: "Money movement", value: "off", note: "charge/withdrawal disabled", tone: "locked" },
        { title: "Production launch", value: "off", note: "separate principal confirmation kerak", tone: "locked" },
        { title: "Admin visibility", value: "ready", note: "keyingi controls aniq", tone: "ready" },
      ],
      details: ["Taksi ekrani endi Strim panellariga bog ‘liq emas.", "Control cards future server stages uchun safe interface map.", "Commission, tariffs, to ‘lov va to ‘lov chiqarish 006Uda o ‘zgarmaydi."],
    },
    stream: {
      title: "Stream Control Center",
      description: "Rooms, moderation, events, gifts/games readiness va external service boundary uchun bitta toza ekran.",
      metrics: [
        { label: "Rooms", value: "0", note: "live environment activated emas", tone: "locked" },
        { label: "Moderation", value: "ready map", note: "reports/events alohida joyda", tone: "ready" },
        { label: "External service", value: "not configured", note: "external service call off", tone: "locked" },
        { label: "Gifts/Games", value: "safe plan", note: "hamyon va to ‘lov faollashtirish yo ‘q", tone: "safe" },
      ],
      controls: [
        { title: "Room control", description: "Rooms, host, co-host, queue, live state va manual checks.", chips: ["rooms", "host", "queue", "state"], status: "safe-disabled", tone: "safe" },
        { title: "Moderation", description: "Reports, mute/ban workflow, abuse review va safety gates.", chips: ["reports", "mute", "ban", "appeal"], status: "ready map", tone: "ready" },
        { title: "Events", description: "Room events, audit stream va operational timeline.", chips: ["timeline", "audit", "visibility"], status: "display ready", tone: "info" },
        { title: "Gifts & games", description: "Demo games/gifts boundary money yoki payoutsiz.", chips: ["demo", "no cash-out", "official withdrawal later"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Create room", value: "blocked", note: "real vaqt/tashqi xizmat ishlash muhiti yoqish yo ‘q", tone: "locked" },
        { title: "Moderation reports", value: "empty", note: "real hisobotlar uchun joy tayyor", tone: "info" },
        { title: "Events", value: "empty", note: "backend route approvaldan keyin ulanadi", tone: "info" },
        { title: "Technical endpoint dump", value: "moved down", note: "ekranning yarmini egallamaydi", tone: "ready" },
      ],
      safety: [
        { title: "Realtime gateway", value: "off", note: "admin interface ishga tushirmaydi", tone: "locked" },
        { title: "Recording/CDN", value: "off", note: "storage/tashqi xizmat action yo ‘q", tone: "locked" },
        { title: "Balance account/charge", value: "off", note: "gift/game money movement disabled", tone: "safe" },
      ],
      details: ["Stream tabdagi dubl panellar olib tashlandi.", "Live environment foundation endpoint wall emas, readable checklist.", "Real rooms/reports/events alohida server stage bilan ulanadi."],
    },
    google: {
      title: "Google Billing Control Center",
      description: "Digital goods, Play Billing boundary, product contracts va purchase safety uchun bitta aniq ekran.",
      metrics: [
        { label: "External service", value: "google_billing", note: "Android digital goods only", tone: "safe" },
        { label: "State", value: "safe-disabled", note: "live environment purchase off", tone: "locked" },
        { label: "Products", value: "3", note: "Konsol mahsulotlari ko‘rib chiqishga tayyor", tone: "info" },
        { label: "Balance account bypass", value: "blocked", note: "digital goods uchun Airwallex/Hamyon yo ‘q", tone: "safe" },
      ],
      controls: [
        { title: "Product contracts", description: "Coin packs, gifts, boosts va premium digital goods map.", chips: ["coins", "gifts", "boosts", "premium"], status: "review ready", tone: "ready" },
        { title: "Purchase safety", description: "Soxta xarid muvaffaqiyati yo ‘q, bypass yo ‘q, tashqi xizmat ishlash muhiti chaqiruv yo ‘q.", chips: ["no false success", "server verify later", "refund safe"], status: "safe", tone: "safe" },
        { title: "Play Console", description: "admin interfeysi Play konsoli tekshiruvini ko ‘rsatadi, nashr qilish qilmaydi.", chips: ["manual review", "no upload", "no release"], status: "owner action", tone: "warn" },
        { title: "Live environment boundary", description: "Server verification va entitlement grant separate server confirmation talab qiladi.", chips: ["verify off", "grant off", "balance account off"], status: "locked", tone: "locked" },
      ],
      products: [
        { title: "Digital coin pack", value: "Play Billing only", note: "faqat Google Play Billing orqali", tone: "safe" },
        { title: "Premium gift", value: "digital goods", note: "Balance account/Airwallex bypass blocked", tone: "safe" },
        { title: "Game entitlement", value: "digital goods", note: "stake/money movement disabled", tone: "locked" },
      ],
      safety: [
        { title: "External service credentials", value: "not read", note: "006U.env yoki secret values o ‘qimaydi", tone: "safe" },
        { title: "Purchase capture", value: "off", note: "capture/charge/refund yo ‘q", tone: "locked" },
        { title: "Entitlement ledger", value: "off", note: "ma ʼlumotlar bazasiga yozish yo ‘q", tone: "locked" },
      ],
      details: ["Eski Google Billing 100% va 175 readiness dubl qilinmaydi.", "Readiness details qisqa va grouped.", "Real server verification alohida server bosqichi bo ‘ladi."],
    },
    airwallex: {
      title: "Airwallex Control Center",
      description: "Physical commerce, merchant boundary, principal keys va settlement readiness external service activationsiz.",
      metrics: [
        { label: "External service", value: "airwallex", note: "physical commerce only", tone: "info" },
        { label: "principal keys", value: "not configured", note: "secret values o ‘qilmaydi", tone: "locked" },
        { label: "Digital goods", value: "blocked", note: "Google Billing only", tone: "safe" },
        { label: "Live environment", value: "off", note: "no external service call", tone: "locked" },
      ],
      controls: [
        { title: "Merchant commerce", description: "Physical goods/services settlement KYB/KYC va external service confirmationdan keyin.", chips: ["merchant", "KYB", "settlement", "physical"], status: "planned", tone: "info" },
        { title: "principal key intake", description: "Reference labels only; raw sirlar va ruxsat ma ʼlumotlarini qidirish yo ‘q.", chips: ["labels only", "no secrets", "principal confirmation"], status: "safe-disabled", tone: "safe" },
        { title: "Payment boundary", description: "Android digital gifts, coins, boosts yoki game entitlements sotib olinmaydi.", chips: ["no digital goods", "no bypass", "no wallet route"], status: "blocked", tone: "locked" },
        { title: "Settlement readiness", description: "Payout/settlement compliance, taxes va Admin confirmation talab qiladi.", chips: ["AML", "tax", "risk", "approval"], status: "future stage", tone: "warn" },
      ],
      operations: [
        { title: "Merchant onboarding", value: "future", note: "KYB/KYC server flow kerak", tone: "warn" },
        { title: "External service keys", value: "principal confirmation", note: ".env read 006Uda yo ‘q", tone: "safe" },
        { title: "External service call", value: "off", note: "ishlash muhiti yoqish yo ‘q", tone: "locked" },
        { title: "Google Billing conflict", value: "blocked", note: "digital goods Google Billing only", tone: "safe" },
      ],
      safety: [
        { title: "Balance account mutation", value: "off", note: "balance o ‘zgarmaydi", tone: "locked" },
        { title: "Payment capture", value: "off", note: "Airwallex charge yo ‘q", tone: "locked" },
        { title: "Payout", value: "off", note: "settlement movement yo ‘q", tone: "locked" },
      ],
      details: ["Eski Airwallex 100% va 174A readiness bitta readable ekranga birlashtirildi.", "Egasi-key labels safe boundary sifatida ko ‘rsatiladi.", "Physical commerce Android digital goodsdan ajratilgan."],
    },
    readiness: {
      title: "Readiness & Reviewer Evidence",
      description: "Launch blockers, reviewer dalil va xavfsizlik nazoratlar bitta tushunarli markazga yig ‘ildi.",
      metrics: [
        { label: "Launch", value: "blocked", note: "ishlab chiqarishni faollashtirish yo ‘q", tone: "locked" },
        { label: "Evidence", value: "grouped", note: "Play, AI, Stream, Taxi, Billing", tone: "ready" },
        { label: "Safety gates", value: "visible", note: "ishlash muhiti yo ‘q boundary holat", tone: "safe" },
        { label: "Next", value: "server stages", note: "faqat owner approvaldan keyin", tone: "warn" },
      ],
      gates: [
        { title: "Google Billing", description: "Digital goods Play Billing orqali; Balance account/Airwallex bypass blocked.", chips: ["Play Billing", "server verify later", "no bypass"], status: "review ready", tone: "safe" },
        { title: "Airwallex", description: "Faqat physical commerce; principal keys va external service live environment locked.", chips: ["physical", "owner keys", "external service off"], status: "locked", tone: "locked" },
        { title: "Stream", description: "Rooms/moderation/gifts/games readiness realtime activationsiz.", chips: ["rooms", "moderation", "gifts"], status: "safe-disabled", tone: "safe" },
        { title: "Taxi", description: "Orders/drivers/tariffs control map server/external service executiondan oldin.", chips: ["orders", "drivers", "tariffs"], status: "interface ready", tone: "ready" },
        { title: "Production", description: "Bu bosqichda chiqarish, to ‘lov, to ‘lov chiqarish yoki ishlash muhiti faollashtirish yo ‘q.", chips: ["no release", "no money", "no database"], status: "blocked", tone: "locked" },
      ],
      evidence: [
        { title: "Reviewer screens", value: "clean", note: "long technical dump o ‘rniga cards", tone: "ready" },
        { title: "Launch blockers", value: "visible", note: "approvalsiz nima yoqilmasligi aniq", tone: "safe" },
        { title: "Localization", value: "RU/EN/UZ/ZH", note: "qisqa readable labels", tone: "info" },
      ],
      blockers: [
        { title: "External service live environment", value: "off", note: "separate exact principal confirmation kerak", tone: "locked" },
        { title: "database/Prisma", value: "not touched", note: "schema/migration/generate yo ‘q", tone: "safe" },
        { title: "Money movement", value: "off", note: "to ‘lov, to ‘lov chiqarish, Hamyon o ‘zgartirish yo ‘q", tone: "locked" },
      ],
      details: ["Readiness ekran endi technical dump emas.", "Evidence ishga tushirish nazoratlar va reviewer needs bo ‘yicha grouped.", "Real enablement future server/external service stages uchun qoladi."],
    },
  },
  zh: {
    heroKicker: "管理界面阶段006 · 清晰控制中心",
    safety: "仅限管理界面。不会触碰服务器、数据库、数据架构、提供商、钱包、支付、付款或生产激活。",
    quickActions: ["刷新屏幕", "打开检查表", "查看边界", "准备下一阶段"],
    common: {
      safeDisabled: "安全禁用",
      uiOnly: "仅界面",
      ownerApproval: "需要所有者批准",
      noRuntime: "运行环境关闭",
      overview: "概览",
      control: "控制",
      safetyBoundary: "安全边界",
      technicalDetails: "技术细节",
      nextStage: "下一阶段",
      actionLocked: "该操作在单独服务器和提供商批准前被锁定",
      reviewerReady: "审核证据已就绪",
    },
    dashboard: {
      title: "萨比管理总览",
      description: "模块概览清晰展示，不再把所有大面板堆在一个页面。",
      metrics: [
        { label: "独立屏幕", value: "6", note: "Dashboard, Taxi, Stream, Billing, Airwallex, Readiness", tone: "ready" },
        { label: "Build smoke", value: "100%", note: "阶段006验证管理界面构建", tone: "ready" },
        { label: "Safety mode", value: "ON", note: "提供商和资金未启用", tone: "safe" },
        { label: "Server touch", value: "0", note: "仅管理界面源代码和工具", tone: "locked" },
      ],
      modules: [
        { key: "taxi", title: "Taxi", description: "订单、司机、价格、区域、佣金和提供商边界。", status: "control map ready", tone: "ready" },
        { key: "stream", title: "Stream", description: "房间、审核、事件、礼物和游戏就绪状态，无重复面板。", status: "single screen", tone: "ready" },
        { key: "google", title: "Google Billing", description: "数字商品、产品合约、购买安全和运行边界。", status: "digital goods only", tone: "safe" },
        { key: "airwallex", title: "Airwallex", description: "实体商务、所有者密钥、企业和客户验证以及结算就绪状态。", status: "external service locked", tone: "locked" },
        { key: "readiness", title: "Readiness", description: "Reviewer evidence、launch blockers、Play/AI/Stream/Taxi gates。", status: "review center", tone: "info" },
      ],
      lanes: [
        { title: "Navigation", description: "每个左侧标签打开自己的清晰页面。", chips: ["own route", "no blank screen", "no stack"], status: "ready", tone: "ready" },
        { title: "Visual hierarchy", description: "上方是简短摘要卡片，细节放在下方。", chips: ["readable", "less noise", "clear sections"], status: "polished", tone: "ready" },
        { title: "Safety", description: "运行操作在单独批准前保持关闭。", chips: ["no external service call", "no balance account", "no withdrawal"], status: "safe", tone: "safe" },
      ],
      evidence: [
        { title: "Route screens", value: "006U markers", note: "所有关键标签都有阶段006管理路由屏幕标记", tone: "ready" },
        { title: "Duplicate panels", value: "removed from route tabs", note: "旧计费、空中云汇和直播大面板不再重复渲染", tone: "ready" },
        { title: "Languages", value: "RU / EN / UZ / ZH", note: "简短清晰标签", tone: "info" },
      ],
    },
    taxi: {
      title: "Taxi Control Center",
      description: "订单、司机、价格、区域、佣金、安全和发布的运营页面。",
      metrics: [
        { label: "Mode", value: "interface-only", note: "无服务器读取和写入", tone: "safe" },
        { label: "Orders", value: "control map", note: "调度仅视觉准备", tone: "info" },
        { label: "External service", value: "locked", note: "无派单和提供商调用", tone: "locked" },
        { label: "Launch", value: "blocked", note: "需要生产批准", tone: "warn" },
      ],
      controls: [
        { title: "Orders", description: "新订单、路线人工检查、取消和服务时限。", chips: ["new", "assign", "cancel", "SLA"], status: "planned", tone: "info" },
        { title: "Drivers", description: "客户和企业验证、文件、车辆等级、封锁和人工审核。", chips: ["documents", "status", "fleet", "hold"], status: "confirmation lane", tone: "safe" },
        { title: "Tariffs", description: "城市区域、基础价格、高峰加价、佣金和促销锁定。", chips: ["zones", "base", "surge", "commission"], status: "owner controlled", tone: "warn" },
        { title: "External service / Balance account", description: "派单、支付、付款和钱包变更均关闭。", chips: ["external service off", "balance account off", "charge off", "withdrawal off"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Pending orders", value: "interface queue", note: "真实订单将在服务器阶段后接入", tone: "info" },
        { title: "Driver review", value: "manual lane", note: "无数据库变更", tone: "safe" },
        { title: "Tariff change", value: "requires confirmation", note: "阶段006不修改价格", tone: "warn" },
        { title: "External service activation", value: "blocked", note: "无凭据查询或提供商派单", tone: "locked" },
      ],
      safety: [
        { title: "Money movement", value: "off", note: "charge/withdrawal disabled", tone: "locked" },
        { title: "Production launch", value: "off", note: "需要单独所有者批准", tone: "locked" },
        { title: "Admin visibility", value: "ready", note: "下一步控制点清晰", tone: "ready" },
      ],
      details: ["出租车页面不再依赖直播面板。", "所有控制卡片都是未来服务器阶段的安全界面地图。", "阶段006不改变佣金、费率、支付或付款。"],
    },
    stream: {
      title: "Stream Control Center",
      description: "房间、审核、事件、礼物和游戏就绪状态以及提供商边界的单一清晰页面。",
      metrics: [
        { label: "Rooms", value: "0", note: "运行环境未激活", tone: "locked" },
        { label: "Moderation", value: "ready map", note: "报告和事件有独立区域", tone: "ready" },
        { label: "External service", value: "not configured", note: "external service call off", tone: "locked" },
        { label: "Gifts/Games", value: "safe plan", note: "无钱包和支付激活", tone: "safe" },
      ],
      controls: [
        { title: "Room control", description: "房间、主持人、协同主持人、队列、直播状态和人工检查。", chips: ["rooms", "host", "queue", "state"], status: "safe-disabled", tone: "safe" },
        { title: "Moderation", description: "报告、禁言和封禁流程、滥用审核和安全关口。", chips: ["reports", "mute", "ban", "appeal"], status: "ready map", tone: "ready" },
        { title: "Events", description: "房间事件、审计流和运营时间线。", chips: ["timeline", "audit", "visibility"], status: "display ready", tone: "info" },
        { title: "Gifts & games", description: "演示游戏和礼物边界，无资金或付款。", chips: ["demo", "no cash-out", "official withdrawal later"], status: "locked", tone: "locked" },
      ],
      operations: [
        { title: "Create room", value: "blocked", note: "未启用实时、提供商或运行环境", tone: "locked" },
        { title: "Moderation reports", value: "empty", note: "为真实报告预留", tone: "info" },
        { title: "Events", value: "empty", note: "服务器路由批准后连接", tone: "info" },
        { title: "Technical endpoint dump", value: "moved down", note: "不再占据半个屏幕", tone: "ready" },
      ],
      safety: [
        { title: "Realtime gateway", value: "off", note: "管理界面不启动", tone: "locked" },
        { title: "Recording/CDN", value: "off", note: "无存储或提供商操作", tone: "locked" },
        { title: "Balance account/charge", value: "off", note: "gift/game money movement disabled", tone: "safe" },
      ],
      details: ["直播标签中的重复面板已移除。", "运行基础显示为可读检查清单，而不是地址墙。", "真实房间、报告和事件需要单独服务器阶段。"],
    },
    google: {
      title: "Google Billing Control Center",
      description: "数字商品、应用商店计费边界、产品合约和购买安全的清晰页面。",
      metrics: [
        { label: "External service", value: "google_billing", note: "Android digital goods only", tone: "safe" },
        { label: "State", value: "safe-disabled", note: "live environment purchase off", tone: "locked" },
        { label: "Products", value: "3", note: "console products ready for review", tone: "info" },
        { label: "Balance account bypass", value: "blocked", note: "数字商品不使用空中云汇或钱包", tone: "safe" },
      ],
      controls: [
        { title: "Product contracts", description: "金币包、礼物、推广和高级数字商品地图。", chips: ["coins", "gifts", "boosts", "premium"], status: "review ready", tone: "ready" },
        { title: "Purchase safety", description: "无虚假购买成功、无绕过、无提供商运行调用。", chips: ["no false success", "server verify later", "refund safe"], status: "safe", tone: "safe" },
        { title: "Play Console", description: "管理界面显示需检查内容，但不会发布。", chips: ["manual review", "no upload", "no release"], status: "owner action", tone: "warn" },
        { title: "Live environment boundary", description: "服务器验证和权益授予需要单独服务器批准。", chips: ["verify off", "grant off", "balance account off"], status: "locked", tone: "locked" },
      ],
      products: [
        { title: "Digital coin pack", value: "Play Billing only", note: "只能通过应用商店计费", tone: "safe" },
        { title: "Premium gift", value: "digital goods", note: "Balance account/Airwallex bypass blocked", tone: "safe" },
        { title: "Game entitlement", value: "digital goods", note: "stake/money movement disabled", tone: "locked" },
      ],
      safety: [
        { title: "External service credentials", value: "not read", note: "阶段006不读取环境文件或秘密值", tone: "safe" },
        { title: "Purchase capture", value: "off", note: "无扣款、收费或退款", tone: "locked" },
        { title: "Entitlement ledger", value: "off", note: "无数据库写入", tone: "locked" },
      ],
      details: ["旧应用商店计费完整面板和就绪状态不再重复显示。", "就绪详情已简短分组。", "真实服务器验证将是单独服务器阶段。"],
    },
    airwallex: {
      title: "Airwallex Control Center",
      description: "实体商务、商家边界、所有者密钥和结算就绪状态，无提供商激活。",
      metrics: [
        { label: "External service", value: "airwallex", note: "physical commerce only", tone: "info" },
        { label: "principal keys", value: "not configured", note: "不读取秘密值", tone: "locked" },
        { label: "Digital goods", value: "blocked", note: "Google Billing only", tone: "safe" },
        { label: "Live environment", value: "off", note: "no external service call", tone: "locked" },
      ],
      controls: [
        { title: "Merchant commerce", description: "实体商品和服务结算在企业与客户验证以及提供商批准后进行。", chips: ["merchant", "KYB", "settlement", "physical"], status: "planned", tone: "info" },
        { title: "principal key intake", description: "仅引用标签；无原始秘密和凭据查询。", chips: ["labels only", "no secrets", "principal confirmation"], status: "safe-disabled", tone: "safe" },
        { title: "Payment boundary", description: "不能购买安卓数字礼物、金币、推广或游戏权益。", chips: ["no digital goods", "no bypass", "no wallet route"], status: "blocked", tone: "locked" },
        { title: "Settlement readiness", description: "付款和结算需要合规、税务和管理批准。", chips: ["AML", "tax", "risk", "approval"], status: "future stage", tone: "warn" },
      ],
      operations: [
        { title: "Merchant onboarding", value: "future", note: "需要企业和客户验证服务器流程", tone: "warn" },
        { title: "External service keys", value: "principal confirmation", note: "阶段006不读取环境文件", tone: "safe" },
        { title: "External service call", value: "off", note: "无运行环境启用", tone: "locked" },
        { title: "Google Billing conflict", value: "blocked", note: "数字商品仅保持应用商店计费", tone: "safe" },
      ],
      safety: [
        { title: "Balance account mutation", value: "off", note: "余额不变", tone: "locked" },
        { title: "Payment capture", value: "off", note: "无空中云汇扣款", tone: "locked" },
        { title: "Payout", value: "off", note: "无结算变动", tone: "locked" },
      ],
      details: ["旧空中云汇完整面板和就绪状态合并为清晰页面。", "所有者密钥标签作为安全边界展示，不是秘密值。", "实体商务与安卓数字商品分离。"],
    },
    readiness: {
      title: "Readiness & Reviewer Evidence",
      description: "启动阻断、审核证据和安全关口统一在清晰中心。",
      metrics: [
        { label: "Launch", value: "blocked", note: "no production activation", tone: "locked" },
        { label: "Evidence", value: "grouped", note: "Play, AI, Stream, Taxi, Billing", tone: "ready" },
        { label: "Safety gates", value: "visible", note: "boundary state without live environment", tone: "safe" },
        { label: "Next", value: "server stages", note: "only after principal confirmation", tone: "warn" },
      ],
      gates: [
        { title: "Google Billing", description: "数字商品使用应用商店计费；钱包和空中云汇绕过已阻止。", chips: ["Play Billing", "server verify later", "no bypass"], status: "review ready", tone: "safe" },
        { title: "Airwallex", description: "仅实体商务；所有者密钥和提供商运行环境已锁定。", chips: ["physical", "owner keys", "external service off"], status: "locked", tone: "locked" },
        { title: "Stream", description: "房间、审核、礼物和游戏就绪状态，无实时激活。", chips: ["rooms", "moderation", "gifts"], status: "safe-disabled", tone: "safe" },
        { title: "Taxi", description: "订单、司机和费率控制地图位于服务器和提供商执行之前。", chips: ["orders", "drivers", "tariffs"], status: "interface ready", tone: "ready" },
        { title: "Production", description: "本阶段无发布、支付、付款或运行环境激活。", chips: ["no release", "no money", "no database"], status: "blocked", tone: "locked" },
      ],
      evidence: [
        { title: "Reviewer screens", value: "clean", note: "用卡片代替冗长技术输出", tone: "ready" },
        { title: "Launch blockers", value: "visible", note: "清楚显示批准前不能启用的内容", tone: "safe" },
        { title: "Localization", value: "RU/EN/UZ/ZH", note: "简短且可读的标签", tone: "info" },
      ],
      blockers: [
        { title: "External service live environment", value: "off", note: "requires separate exact principal confirmation", tone: "locked" },
        { title: "database/Prisma", value: "not touched", note: "no schema/migration/generate", tone: "safe" },
        { title: "Money movement", value: "off", note: "no charge, withdrawal, Balance account mutation", tone: "locked" },
      ],
      details: ["就绪屏幕不再像技术输出。", "证据按启动关口和审核需求分组。", "所有真实启用留给未来服务器和提供商阶段。"],
    },
  },
};

function copy006U(language: AdminLanguage): Copy006U {
  return COPY006U[language] ?? COPY006U.en;
}

function toneClass006U(tone: Tone006U = "info") {
  return `tone006U tone006U-${tone}`;
}

function Badge006U(props: { tone?: Tone006U; children: ReactNode }) {
  return <span className={toneClass006U(props.tone)}>{props.children}</span>;
}

function MetricGrid006U(props: { items: Metric006U[] }) {
  return (
    <div className="metricGrid006U">
      {props.items.map((item) => (
        <div className={`metricCard006U ${item.tone ? `metricCard006U-${item.tone}` : ""}`} key={`${item.label}-${item.value}`}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.note}</small>
        </div>
      ))}
    </div>
  );
}

function ControlGrid006U(props: { title: string; items: Control006U[] }) {
  return (
    <section className="section006U">
      <div className="sectionHead006U">
        <h3>{props.title}</h3>
      </div>
      <div className="controlGrid006U">
        {props.items.map((item) => (
          <article className="controlCard006U" key={item.title}>
            <div className="controlCardHead006U">
              <h4>{item.title}</h4>
              <Badge006U tone={item.tone}>{item.status}</Badge006U>
            </div>
            <p>{item.description}</p>
            <div className="chipRow006U">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
            <button type="button" disabled>{item.status}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function RowList006U(props: { title: string; items: Row006U[] }) {
  return (
    <section className="section006U compactSection006U">
      <div className="sectionHead006U">
        <h3>{props.title}</h3>
      </div>
      <div className="rowList006U">
        {props.items.map((item) => (
          <div className="row006U" key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.note}</span>
            <Badge006U tone={item.tone}>{item.value}</Badge006U>
          </div>
        ))}
      </div>
    </section>
  );
}

function Details006U(props: { title: string; items: string[] }) {
  return (
    <details className="details006U">
      <summary>{props.title}</summary>
      <ul>{props.items.map((item) => <li key={item}>{item}</li>)}</ul>
    </details>
  );
}

function Shell006U(props: {
  language: AdminLanguage;
  marker: string;
  title: string;
  description: string;
  metrics: Metric006U[];
  children: ReactNode;
}) {
  const copy = copy006U(props.language);
  return (
    <section className="routeWorkspace006U" data-admin-ui-006u-route-screen={props.marker}>
      <div className="hero006U">
        <div>
          <span className="kicker006U">{copy.heroKicker}</span>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="heroSide006U">
          <Badge006U tone="safe">{copy.common.safeDisabled}</Badge006U>
          <Badge006U tone="info">{copy.common.uiOnly}</Badge006U>
          <Badge006U tone="locked">{copy.common.noRuntime}</Badge006U>
        </div>
      </div>
      <div className="safetyStrip006U"><strong>{copy.common.safetyBoundary}</strong><span>{copy.safety}</span></div>
      <div className="quickActions006U">
        {copy.quickActions.map((action) => <button type="button" key={action} disabled>{action}</button>)}
      </div>
      <MetricGrid006U items={props.metrics} />
      {props.children}
    </section>
  );
}

export function AdminUiModuleOverview006U(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.dashboard;
  return (
    <Shell006U language={props.language} marker="dashboard" title={data.title} description={data.description} metrics={data.metrics}>
      <section className="section006U">
        <div className="sectionHead006U"><h3>{copy.common.overview}</h3><span>{copy.common.reviewerReady}</span></div>
        <div className="moduleGrid006U">
          {data.modules.map((module) => (
            <article className="moduleCard006U" key={module.key}>
              <div className="moduleIcon006U">{module.title.slice(0, 1)}</div>
              <div>
                <h4>{module.title}</h4>
                <p>{module.description}</p>
                <Badge006U tone={module.tone}>{module.status}</Badge006U>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ControlGrid006U title={copy.common.control} items={data.lanes} />
      <RowList006U title={copy.common.technicalDetails} items={data.evidence} />
    </Shell006U>
  );
}

export function TaxiAdminControl006UPanel(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.taxi;
  return (
    <Shell006U language={props.language} marker="taxi" title={data.title} description={data.description} metrics={data.metrics}>
      <ControlGrid006U title={copy.common.control} items={data.controls} />
      <div className="twoColumn006U">
        <RowList006U title="Operations" items={data.operations} />
        <RowList006U title={copy.common.safetyBoundary} items={data.safety} />
      </div>
      <Details006U title={copy.common.technicalDetails} items={data.details} />
    </Shell006U>
  );
}

export function StreamAdminControl006UPanel(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.stream;
  return (
    <Shell006U language={props.language} marker="stream" title={data.title} description={data.description} metrics={data.metrics}>
      <ControlGrid006U title={copy.common.control} items={data.controls} />
      <div className="twoColumn006U">
        <RowList006U title="Live environment lanes" items={data.operations} />
        <RowList006U title={copy.common.safetyBoundary} items={data.safety} />
      </div>
      <Details006U title={copy.common.technicalDetails} items={data.details} />
    </Shell006U>
  );
}

export function GoogleBillingAdminControl006UPanel(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.google;
  return (
    <Shell006U language={props.language} marker="google-billing" title={data.title} description={data.description} metrics={data.metrics}>
      <ControlGrid006U title={copy.common.control} items={data.controls} />
      <div className="twoColumn006U">
        <RowList006U title="Product contracts" items={data.products} />
        <RowList006U title={copy.common.safetyBoundary} items={data.safety} />
      </div>
      <Details006U title={copy.common.technicalDetails} items={data.details} />
    </Shell006U>
  );
}

export function AirwallexAdminControl006UPanel(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.airwallex;
  return (
    <Shell006U language={props.language} marker="airwallex" title={data.title} description={data.description} metrics={data.metrics}>
      <ControlGrid006U title={copy.common.control} items={data.controls} />
      <div className="twoColumn006U">
        <RowList006U title="External service lanes" items={data.operations} />
        <RowList006U title={copy.common.safetyBoundary} items={data.safety} />
      </div>
      <Details006U title={copy.common.technicalDetails} items={data.details} />
    </Shell006U>
  );
}

export function ReadinessAdminControl006UPanel(props: { language: AdminLanguage }) {
  const copy = copy006U(props.language);
  const data = copy.readiness;
  return (
    <Shell006U language={props.language} marker="readiness" title={data.title} description={data.description} metrics={data.metrics}>
      <ControlGrid006U title="Launch gates" items={data.gates} />
      <div className="twoColumn006U">
        <RowList006U title={copy.common.reviewerReady} items={data.evidence} />
        <RowList006U title="Launch blockers" items={data.blockers} />
      </div>
      <Details006U title={copy.common.technicalDetails} items={data.details} />
    </Shell006U>
  );
}
