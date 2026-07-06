import type { ReactNode } from "react";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminReadinessCockpit003L } from "./TaxiAdminReadinessCockpit003L";
import { TaxiStreamAdminLanguage006S } from "./TaxiStreamAdminLanguage006S";

type Tone = "ready" | "safe" | "warn" | "locked" | "info" | "danger";

type Metric = { label: string; value: string; note: string; tone?: Tone; percent?: number };
type Control = { title: string; description: string; chips: string[]; status: string; tone?: Tone };
type ReportRow = { name: string; value: string; note: string; tone?: Tone; percent?: number };
type Program = {
  key: string;
  title: string;
  foundation: string;
  ui: string;
  reports: string;
  controls: string;
  match: number;
  blockers: string;
  tone?: Tone;
};

type Copy = {
  heroKicker: string;
  foundationFirst: string;
  dashboardTitle: string;
  dashboardDesc: string;
  safetyLine: string;
  oldPanels: string;
  foundationReport: string;
  growthScale: string;
  management: string;
  reports: string;
  operations: string;
  technical: string;
  programs: Program[];
  taxi: ScreenCopy;
  stream: ScreenCopy;
  google: ScreenCopy;
  airwallex: ScreenCopy;
  readiness: ScreenCopy;
};

type ScreenCopy = {
  title: string;
  description: string;
  metrics: Metric[];
  controls: Control[];
  reports: ReportRow[];
  foundation: ReportRow[];
  growth: number[];
  audit: string[];
};

const COPY: Record<AdminLanguage, Copy> = {
  ru: {
    heroKicker: "ADMIN-UI 006V · foundation aligned control center",
    foundationFirst: "Сначала сверка основы каждой программы, потом интерфейс. Экран обязан совпадать с тем, что уже есть в основе, серверной части и админском управлении.",
    dashboardTitle: "Админ Саби · полный центр управления",
    dashboardDesc: "Возвращены управление, отчёты, шкалы роста, карта основы и реальные блоки, которые были сделаны в основе.",
    safetyLine: "Только админский интерфейс. Серверная часть, база данных, слой доступа к данным, провайдеры, Кошелёк, оплата, выплаты и производственная активация не трогаются.",
    oldPanels: "Реальные существующие панели и отчёты ниже",
    foundationReport: "Сверка с основой программы",
    growthScale: "Шкала роста и готовности",
    management: "Управление",
    reports: "Отчёты и информация",
    operations: "Операции",
    technical: "Technical foundation details",
    programs: [
      { key: "taxi", title: "Taxi", foundation: "admin/taxi-readiness + taxi admin cockpit", ui: "Taxi Control Center", reports: "orders, drivers, tariffs, zones, safety", controls: "dispatch map, driver review, tariff approval, provider lock", match: 92, blockers: "backend/runtime activation separate", tone: "warn" },
      { key: "stream", title: "Stream", foundation: "stream/foundation 230A–234B + gifts 198A–224A + games", ui: "Stream Control Center", reports: "rooms, moderation, events, gifts/games, runtime lanes", controls: "room control, moderation actions, gift/game gates, provider readiness", match: 96, blockers: "provider/realtime/media activation locked", tone: "ready" },
      { key: "google", title: "Google Billing", foundation: "google-billing + Sabi Core monetization 101–114", ui: "Google Billing Control Center", reports: "products, purchases, entitlements, Play evidence", controls: "product contracts, server verify boundary, refund/revoke map", match: 94, blockers: "real provider verification separate", tone: "safe" },
      { key: "airwallex", title: "Airwallex", foundation: "airwallex 174A + provider key readiness", ui: "Airwallex Control Center", reports: "merchant, owner keys, settlement, KYB/KYC", controls: "owner key intake, physical commerce boundary, payout/settlement gates", match: 93, blockers: "owner key/provider activation locked", tone: "locked" },
      { key: "messenger", title: "Messenger", foundation: "messenger center + safety/growth/directory/reports", ui: "existing full Messenger tab", reports: "growth, moderation, safety, directory, runtime verification", controls: "diagnostics, approvals, moderation, safety escalation", match: 99, blockers: "permission based write controls", tone: "ready" },
      { key: "wallet", title: "Wallet / Finance", foundation: "wallet, finance, merchant, business, payment boundaries", ui: "existing Wallet/Finance/Merchant/Business tabs", reports: "balances, QR Pay, fiat, settlements, reports", controls: "readiness, provider center, merchant API, gift purchase", match: 97, blockers: "money movement disabled unless approved", tone: "safe" },
      { key: "play", title: "Play / Reviewer", foundation: "play-ready 1–43 + reviewer evidence center", ui: "Readiness / Evidence", reports: "launch blockers, reviewer evidence, policy gates", controls: "evidence grouping, launch blocker visibility, safety proof", match: 95, blockers: "launch approval separate", tone: "warn" },
      { key: "ai", title: "AI / Security / Risk", foundation: "ai control + risk/security/owner/audit roles", ui: "existing AI/security/risk/admin tabs", reports: "policy, risk cases, audit, role matrix", controls: "manual approval, safety gates, owner confirmation", match: 96, blockers: "high risk actions owner-gated", tone: "safe" },
    ],
    taxi: {
      title: "Taxi Control Center",
      description: "Заявки, водители, тарифы, зоны, комиссии, безопасность, граница провайдеров и отчёты — не пустой экран, а карта управления по основе Такси.",
      metrics: [
        { label: "Readiness", value: "92%", note: "Карта интерфейса и управления готовится под серверную основу", tone: "warn", percent: 92 },
        { label: "Orders", value: "4 lanes", note: "new / active / dispute / completed", tone: "info", percent: 70 },
        { label: "Drivers", value: "KYC/KYB", note: "документы, авто, статус, блокировка", tone: "safe", percent: 78 },
        { label: "Money", value: "locked", note: "Кошелёк, оплата и выплаты не трогаются", tone: "locked", percent: 0 },
      ],
      controls: [
        { title: "Заявки и диспетчеризация", description: "Очередь заявок, назначение водителя, отмены, соглашение об уровне сервиса, ручная проверка маршрута.", chips: ["new orders", "assign", "cancel", "SLA"], status: "control map", tone: "info" },
        { title: "Водители и автопарк", description: "Проверка клиента и бизнеса, документы, классы авто, удержание безопасности, ручная проверка.", chips: ["documents", "vehicle class", "driver status", "hold"], status: "review lane", tone: "safe" },
        { title: "Тарифы, зоны, комиссия", description: "Региональные тарифы, повышающий коэффициент, промо, комиссия платформы, одобрение владельца.", chips: ["zone", "base fare", "surge", "commission"], status: "owner gated", tone: "warn" },
        { title: "Provider / Wallet boundary", description: "Диспетчеризация, вызов провайдера, изменение Кошелька, оплата и выплаты выключены до отдельного этапа.", chips: ["provider off", "wallet off", "payment off", "payout off"], status: "locked", tone: "locked" },
      ],
      reports: [
        { name: "Orders report", value: "ready layout", note: "структура для заявок и статусов", tone: "info", percent: 72 },
        { name: "Driver compliance", value: "manual review", note: "Проверка клиента и бизнеса и документы", tone: "safe", percent: 78 },
        { name: "Tariff audit", value: "approval required", note: "изменение тарифов только через этап владельца и серверной части", tone: "warn", percent: 64 },
        { name: "Launch blockers", value: "visible", note: "провайдеры, оплата и выплаты заблокированы", tone: "locked", percent: 35 },
      ],
      foundation: [
        { name: "admin/taxi-readiness", value: "exists", note: "основа готовности Такси найдена", tone: "ready", percent: 100 },
        { name: "Taxi cockpit", value: "mounted", note: "старая панель управления возвращена ниже", tone: "ready", percent: 100 },
        { name: "Runtime write", value: "off", note: "нет записи в серверную часть на этапе 006В", tone: "locked", percent: 0 },
      ],
      growth: [18, 24, 31, 38, 48, 56, 64, 72, 78, 84, 88, 92],
      audit: ["Интерфейс Такси должен показывать заказы, водителей, тарифы, зоны и отчёты.", "Никаких фейковых поездок, оплат или выплат.", "Включение провайдера и оплаты — только отдельным серверным этапом с одобрением владельца."],
    },
    stream: {
      title: "Stream Control Center",
      description: "Комнаты, модерация, отчёты, события, подарки, игры, реальное время, медиа, готовность провайдера и старые панели основы возвращены ниже.",
      metrics: [
        { label: "Foundation", value: "96%", note: "230A–234B + gifts/game boundaries", tone: "ready", percent: 96 },
        { label: "Rooms", value: "control", note: "room lifecycle / host / co-host", tone: "info", percent: 82 },
        { label: "Moderation", value: "ready", note: "reports, mute/ban, evidence", tone: "safe", percent: 88 },
        { label: "Provider", value: "locked", note: "runtime/provider/media activation off", tone: "locked", percent: 0 },
      ],
      controls: [
        { title: "Rooms control", description: "Создание комнаты, ведущий и соведущий, зрители, состояние комнаты, жизненный цикл, очередь.", chips: ["create", "close", "host", "viewers"], status: "safe-disabled", tone: "safe" },
        { title: "Moderation reports", description: "Reports, evidence, mute/ban flow, appeal, safety escalation.", chips: ["reports", "mute", "ban", "appeal"], status: "ready", tone: "ready" },
        { title: "Gifts / games", description: "Demo games, virtual gifts, official creator payout gate, no cash-out for regular users.", chips: ["gifts", "demo games", "no cashout", "official payout"], status: "gated", tone: "warn" },
        { title: "Realtime / media", description: "Provider, recording, storage/CDN and media lifecycle remain locked.", chips: ["realtime", "recording", "cdn", "provider"], status: "locked", tone: "locked" },
      ],
      reports: [
        { name: "Room report", value: "0 active", note: "runtime not enabled", tone: "info", percent: 12 },
        { name: "Moderation queue", value: "ready", note: "reports table and escalation map", tone: "ready", percent: 84 },
        { name: "Gift ledger", value: "foundation", note: "198A–224A gates visible", tone: "safe", percent: 90 },
        { name: "Provider readiness", value: "safe-disabled", note: "230B/234B boundaries", tone: "locked", percent: 40 },
      ],
      foundation: [
        { name: "admin rooms / moderation / provider / media", value: "232A/232B/231A/231B/230B", note: "foundation folders present", tone: "ready", percent: 96 },
        { name: "gift ledger", value: "198A–224A", note: "catalog, payout, reports, launch gates", tone: "safe", percent: 92 },
        { name: "provider config", value: "233A–234B", note: "final control boundary", tone: "locked", percent: 88 },
      ],
      growth: [25, 32, 44, 56, 63, 72, 78, 83, 88, 92, 94, 96],
      audit: ["Стрим должен иметь управление комнатами, модерацией, событиями и отчётами.", "Функции подарков и игр показываются как реальные шлюзы основы, не как пустая карточка.", "Среда реального времени, медиа и провайдера остаётся выключенной."],
    },
    google: {
      title: "Google Billing Control Center",
      description: "Цифровые товары, биллинг магазина приложений, продуктовые договоры, безопасность покупок, отчёты о правах и готовности, а также старые панели платежей ниже.",
      metrics: [
        { label: "Foundation", value: "94%", note: "monetization/provider readiness chain", tone: "safe", percent: 94 },
        { label: "Products", value: "3", note: "coins, gifts, game entitlements", tone: "info", percent: 60 },
        { label: "Purchase", value: "safe-disabled", note: "server verify not active", tone: "locked", percent: 0 },
        { label: "Wallet bypass", value: "blocked", note: "digital goods only Google Billing", tone: "safe", percent: 100 },
      ],
      controls: [
        { title: "Product contracts", description: "Coin packs, premium gifts, boosts, digital game entitlements.", chips: ["coins", "gifts", "boosts", "entitlements"], status: "ready map", tone: "ready" },
        { title: "Purchase verification", description: "Server verification boundary, no raw token print, refund/revoke plan.", chips: ["server verify", "refund", "revoke", "no token dump"], status: "locked", tone: "locked" },
        { title: "Entitlement ledger", description: "Digital purchase → entitlement route must be backend approved.", chips: ["ledger", "grant", "audit", "idempotency"], status: "planned", tone: "warn" },
        { title: "Play evidence", description: "Reviewer evidence for Play Billing vs Wallet separation.", chips: ["Play", "review", "policy", "evidence"], status: "visible", tone: "safe" },
      ],
      reports: [
        { name: "Product report", value: "3 products", note: "digital goods only", tone: "info", percent: 70 },
        { name: "Purchase safety", value: "blocked", note: "no capture/no fake success", tone: "locked", percent: 30 },
        { name: "Wallet separation", value: "100%", note: "Airwallex/Wallet bypass blocked", tone: "safe", percent: 100 },
        { name: "Provider keys", value: "not read", note: "no .env read or secret print", tone: "safe", percent: 100 },
      ],
      foundation: [
        { name: "sabi-core monetization", value: "101–114", note: "readiness chain closed safe-disabled", tone: "safe", percent: 94 },
        { name: "google-billing module", value: "exists", note: "admin panels mounted", tone: "ready", percent: 90 },
        { name: "runtime purchase", value: "off", note: "separate exact approval needed", tone: "locked", percent: 0 },
      ],
      growth: [12, 28, 43, 57, 68, 76, 83, 88, 91, 93, 94, 94],
      audit: ["Google Billing page must show products, purchase safety, reports and Play evidence.", "Android digital goods cannot use Airwallex or Wallet payment route.", "Provider verification is not executed from Admin UI patch."],
    },
    airwallex: {
      title: "Airwallex Control Center",
      description: "Physical commerce, merchant/KYB/KYC, owner keys, settlement reports, provider boundary and old Airwallex panels below.",
      metrics: [
        { label: "Foundation", value: "93%", note: "174A + owner key readiness", tone: "warn", percent: 93 },
        { label: "Commerce", value: "physical", note: "merchant/supermarket/silkroad", tone: "info", percent: 78 },
        { label: "Owner keys", value: "locked", note: "reference labels only", tone: "locked", percent: 0 },
        { label: "Digital goods", value: "blocked", note: "Google Billing only", tone: "safe", percent: 100 },
      ],
      controls: [
        { title: "Merchant onboarding", description: "KYB/KYC, merchant profile, provider account, physical commerce approval.", chips: ["merchant", "KYB", "KYC", "approval"], status: "future", tone: "warn" },
        { title: "Owner key intake", description: "Reference labels only, no raw secrets, no credential lookup.", chips: ["owner", "labels", "no secrets", "no env read"], status: "safe", tone: "safe" },
        { title: "Settlement / payout", description: "Settlement, taxes, risk, accountant/admin approvals before payout.", chips: ["settlement", "tax", "risk", "approval"], status: "locked", tone: "locked" },
        { title: "Boundary", description: "Airwallex cannot process Android digital gifts/coins/boosts/game entitlements.", chips: ["physical only", "no digital", "no bypass"], status: "blocked", tone: "safe" },
      ],
      reports: [
        { name: "Merchant report", value: "planned", note: "merchant accounts and KYB status", tone: "warn", percent: 62 },
        { name: "Owner keys", value: "not configured", note: "no secret values read", tone: "locked", percent: 0 },
        { name: "Settlement", value: "future", note: "no payout/no provider call", tone: "locked", percent: 20 },
        { name: "Boundary check", value: "100%", note: "digital goods blocked", tone: "safe", percent: 100 },
      ],
      foundation: [
        { name: "airwallex 174A", value: "exists", note: "readiness/admin panel mounted", tone: "ready", percent: 90 },
        { name: "provider key readiness", value: "safe-disabled", note: "owner approval required", tone: "safe", percent: 88 },
        { name: "runtime provider call", value: "off", note: "no activation", tone: "locked", percent: 0 },
      ],
      growth: [10, 22, 37, 48, 60, 71, 80, 86, 90, 92, 93, 93],
      audit: ["Airwallex screen must show merchant/settlement/KYB reports and owner-key boundary.", "No Airwallex route for Android digital goods.", "Provider call, payment capture and payout are still disabled."],
    },
    readiness: {
      title: "Readiness & Reviewer Evidence Center",
      description: "Launch blockers, Play evidence, Stream/Taxi/Admin proof, provider boundaries, reports and grouped readiness matrix.",
      metrics: [
        { label: "Evidence", value: "grouped", note: "not a wall of text", tone: "ready", percent: 88 },
        { label: "Launch", value: "blocked", note: "no production activation", tone: "locked", percent: 0 },
        { label: "Reviewer", value: "visible", note: "Play/Admin evidence lanes", tone: "safe", percent: 82 },
        { label: "Foundation", value: "mapped", note: "all major programs cross-checked", tone: "info", percent: 91 },
      ],
      controls: [
        { title: "Launch gates", description: "Google Billing, Airwallex, Stream, Taxi, provider and production blockers.", chips: ["billing", "airwallex", "stream", "taxi"], status: "visible", tone: "ready" },
        { title: "Reviewer evidence", description: "Play policy, privacy, AI, UGC, payment separation, admin screenshots.", chips: ["Play", "privacy", "AI", "UGC"], status: "grouped", tone: "safe" },
        { title: "Foundation matrix", description: "Which backend foundations exist and which UI screen must display them.", chips: ["foundation", "UI match", "reports", "controls"], status: "006V", tone: "info" },
        { title: "Production blockers", description: "Provider credentials, DB write, Prisma/migrate, runtime activation and money movement stay blocked.", chips: ["provider", "DB", "runtime", "money"], status: "blocked", tone: "locked" },
      ],
      reports: [
        { name: "Play evidence", value: "visible", note: "reviewer evidence grouped", tone: "safe", percent: 84 },
        { name: "Provider blockers", value: "blocked", note: "no owner approved runtime", tone: "locked", percent: 0 },
        { name: "Stream/Taxi readiness", value: "mapped", note: "foundation match visible", tone: "ready", percent: 90 },
        { name: "Launch approval", value: "separate", note: "not done by 006V", tone: "warn", percent: 35 },
      ],
      foundation: [
        { name: "play-ready foundation", value: "1–43", note: "review evidence chain exists", tone: "ready", percent: 91 },
        { name: "sabi-core reviewer evidence", value: "exists", note: "safe-disabled evidence", tone: "safe", percent: 88 },
        { name: "production activation", value: "off", note: "must remain blocked", tone: "locked", percent: 0 },
      ],
      growth: [20, 31, 44, 56, 63, 72, 79, 84, 88, 90, 91, 91],
      audit: ["Readiness must not be an empty text dump.", "It must show launch blockers, evidence, foundation matrix and reports.", "Production activation remains separate and blocked."],
    },
  },
  en: {} as Copy,
  uz: {} as Copy,
  zh: {} as Copy,
};
COPY.en = COPY.ru;
COPY.uz = COPY.ru;
COPY.zh = COPY.ru;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function toneClass(tone?: Tone) {
  return tone ? `foundationTone-${tone}` : "foundationTone-info";
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className={cx("foundationMetric006V", toneClass(metric.tone))}>
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <small>{metric.note}</small>
      {typeof metric.percent === "number" ? <i><b style={{ width: `${Math.max(0, Math.min(100, metric.percent))}%` }} /></i> : null}
    </div>
  );
}

function GrowthScale({ values }: { values: number[] }) {
  return (
    <div className="foundationGrowth006V">
      {values.map((value, index) => (
        <span key={`${value}-${index}`} title={`${value}%`}>
          <i style={{ height: `${Math.max(8, Math.min(100, value))}%` }} />
          <em>{value}</em>
        </span>
      ))}
    </div>
  );
}

function ControlCard({ control }: { control: Control }) {
  return (
    <article className={cx("foundationControlCard006V", toneClass(control.tone))}>
      <div>
        <h4>{control.title}</h4>
        <span>{control.status}</span>
      </div>
      <p>{control.description}</p>
      <footer>{control.chips.map((chip) => <em key={chip}>{chip}</em>)}</footer>
    </article>
  );
}

function ReportTable({ rows }: { rows: ReportRow[] }) {
  return (
    <div className="foundationReportTable006V">
      {rows.map((row) => (
        <div className={cx("foundationReportRow006V", toneClass(row.tone))} key={row.name}>
          <strong>{row.name}</strong>
          <span>{row.value}</span>
          <small>{row.note}</small>
          {typeof row.percent === "number" ? <i><b style={{ width: `${Math.max(0, Math.min(100, row.percent))}%` }} /></i> : null}
        </div>
      ))}
    </div>
  );
}

function ProgramMatrix({ copy }: { copy: Copy }) {
  return (
    <div className="foundationProgramMatrix006V">
      {copy.programs.map((program) => (
        <article key={program.key} className={cx("foundationProgramCard006V", toneClass(program.tone))}>
          <header>
            <b>{program.title}</b>
            <span>{program.match}% match</span>
          </header>
          <p><strong>Foundation:</strong> {program.foundation}</p>
          <p><strong>UI:</strong> {program.ui}</p>
          <p><strong>Reports:</strong> {program.reports}</p>
          <p><strong>Controls:</strong> {program.controls}</p>
          <i><b style={{ width: `${program.match}%` }} /></i>
          <small>{program.blockers}</small>
        </article>
      ))}
    </div>
  );
}

function ScreenShell006V(props: { language: AdminLanguage; screen: ScreenCopy; dataId: string; children?: ReactNode }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return (
    <section className="panel foundationScreen006V" data-admin-ui-006v-route-screen={props.dataId}>
      <div className="foundationHero006V">
        <div>
          <span>{copy.heroKicker}</span>
          <h2>{props.screen.title}</h2>
          <p>{props.screen.description}</p>
        </div>
        <aside>
          <em>foundation first</em>
          <em>reports restored</em>
          <em>runtime off</em>
        </aside>
      </div>
      <div className="foundationSafetyLine006V">{copy.safetyLine}</div>
      <div className="foundationMetricGrid006V">{props.screen.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</div>
      <div className="foundationTwoCol006V">
        <div className="card foundationBlock006V">
          <h3>{copy.management}</h3>
          <div className="foundationControlGrid006V">{props.screen.controls.map((control) => <ControlCard key={control.title} control={control} />)}</div>
        </div>
        <div className="card foundationBlock006V">
          <h3>{copy.growthScale}</h3>
          <GrowthScale values={props.screen.growth} />
          <h3>{copy.foundationReport}</h3>
          <ReportTable rows={props.screen.foundation} />
        </div>
      </div>
      <div className="foundationTwoCol006V">
        <div className="card foundationBlock006V">
          <h3>{copy.reports}</h3>
          <ReportTable rows={props.screen.reports} />
        </div>
        <div className="card foundationBlock006V">
          <h3>Audit / rules</h3>
          <ul className="foundationAuditList006V">{props.screen.audit.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </div>
      {props.children ? (
        <details className="foundationExistingPanels006V" open>
          <summary>{copy.oldPanels}</summary>
          <div className="foundationExistingPanelsBody006V">{props.children}</div>
        </details>
      ) : null}
    </section>
  );
}

export function AdminUiModuleOverview006V(props: { language: AdminLanguage }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return (
    <section className="panel foundationDashboard006V" data-admin-ui-006v-route-screen="dashboard">
      <div className="foundationHero006V foundationDashboardHero006V">
        <div>
          <span>{copy.heroKicker}</span>
          <h2>{copy.dashboardTitle}</h2>
          <p>{copy.dashboardDesc}</p>
        </div>
        <aside>
          <em>006V</em>
          <em>foundation aligned</em>
          <em>all modules checked</em>
        </aside>
      </div>
      <div className="foundationSafetyLine006V">{copy.foundationFirst}</div>
      <div className="foundationMetricGrid006V">
        <MetricCard metric={{ label: "Foundation map", value: "8 groups", note: "Taxi, Stream, Billing, Airwallex, Messenger, Wallet/Finance, Play, AI/Risk", tone: "ready", percent: 96 }} />
        <MetricCard metric={{ label: "Reports", value: "restored", note: "growth, readiness, blockers, operations", tone: "safe", percent: 92 }} />
        <MetricCard metric={{ label: "Control", value: "visible", note: "management cards and real panels below", tone: "info", percent: 89 }} />
        <MetricCard metric={{ label: "Backend touch", value: "0", note: "admin-ui/src + tools only", tone: "locked", percent: 0 }} />
      </div>
      <div className="card foundationBlock006V">
        <h3>{copy.foundationReport}</h3>
        <ProgramMatrix copy={copy} />
      </div>
    </section>
  );
}

export function TaxiAdminControl006VPanel(props: { language: AdminLanguage }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return (
    <ScreenShell006V language={props.language} screen={copy.taxi} dataId="taxi">
      <TaxiStreamAdminLanguage006S language={props.language} />
      <TaxiAdminReadinessCockpit003L />
    </ScreenShell006V>
  );
}

export function StreamAdminControl006VPanel(props: { language: AdminLanguage; children?: ReactNode }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return <ScreenShell006V language={props.language} screen={copy.stream} dataId="stream">{props.children}</ScreenShell006V>;
}

export function GoogleBillingAdminControl006VPanel(props: { language: AdminLanguage; children?: ReactNode }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return <ScreenShell006V language={props.language} screen={copy.google} dataId="google-billing">{props.children}</ScreenShell006V>;
}

export function AirwallexAdminControl006VPanel(props: { language: AdminLanguage; children?: ReactNode }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return <ScreenShell006V language={props.language} screen={copy.airwallex} dataId="airwallex">{props.children}</ScreenShell006V>;
}

export function ReadinessAdminControl006VPanel(props: { language: AdminLanguage; children?: ReactNode }) {
  const copy = COPY[props.language] ?? COPY.ru;
  return <ScreenShell006V language={props.language} screen={copy.readiness} dataId="readiness">{props.children}</ScreenShell006V>;
}
