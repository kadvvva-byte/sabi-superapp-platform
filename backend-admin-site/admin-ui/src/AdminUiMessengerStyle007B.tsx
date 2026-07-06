import { useMemo, useState, type ReactNode } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Tone007B = "ready" | "warn" | "locked" | "info" | "danger";
type ModuleKey007B = "dashboard" | "taxi" | "stream" | "googleBilling" | "airwallex" | "readiness" | "core" | "wallet" | "providers" | "users" | "risk" | "audit" | "roles" | "staff" | "owner" | "security" | "finance" | "merchant" | "business" | "developer" | "emergency";

type Endpoint007B = { label: string; method?: "GET" | "POST"; path: string; body?: Record<string, unknown>; lock?: string };
type WorkBlock007B = { title: string; desc: string; tone?: Tone007B; checks: string[]; actions: string[] };
type ModuleConfig007B = { title: string; subtitle: string; state: string; score: string; pages: string[]; metrics: string[]; blocks: WorkBlock007B[]; reports: string[]; endpoints: Endpoint007B[]; technical: string };

type LastResponse007B = { label: string; status: number; ok: boolean; message: string; payload: unknown; at: string } | null;

const DASH = "—";

function copy007B(language: AdminLanguage, key: string): string {
  const map: Record<AdminLanguage, Record<string, string>> = {
    ru: {
      load: "Обновить данные", diagnostics: "Диагностика", technical: "Техническая основа", openTech: "Открыть старые панели основы", closeTech: "Скрыть старые панели", noFake: "Без фейка: интерфейс показывает только ответ сервера. Если маршрут заблокирован — показываем причину блокировки.", last: "Последний ответ сервера", routeNeeded: "Для этой функции нужен серверный маршрут", workflow: "Рабочие функции", reports: "Отчёты и шкалы", checkpoints: "Проверки", actions: "Действия", endpoint: "Server endpoints", empty: "Нет данных. Обновите данные или откройте панель основы ниже.", status: "Статус", progress: "Готовность", data: "Данные", locked: "Заблокировано", success: "Успешно", failed: "Ошибка", details: "Детали", sync: "Синхронизация", approval: "Подтверждение", queue: "Очередь", evidence: "Доказательства", balance: "Баланс", complaints: "Жалобы", gifts: "Подарки", apply: "Выполнить", reason: "Причина администратора", ownerApproval: "principal confirmation number", selected: "Выбранная запись", rowId: "Идентификатор записи" },
    en: { load: "Refresh data", diagnostics: "Diagnostics", technical: "Technical foundation", openTech: "Open legacy foundation panels", closeTech: "Hide legacy panels", noFake: "No fake: UI shows only backend response. Locked routes show locked reason.", last: "Latest backend response", routeNeeded: "This function needs a backend route", workflow: "Work functions", reports: "Reports and scales", checkpoints: "Checks", actions: "Actions", endpoint: "Backend endpoints", empty: "No data. Refresh data or open the foundation panel below.", status: "Status", progress: "Readiness", data: "Data", locked: "Locked", success: "Success", failed: "Error", details: "Details", sync: "Sync", approval: "Approval", queue: "Queue", evidence: "Evidence", balance: "Balance", complaints: "Complaints", gifts: "Gifts", apply: "Run", reason: "Admin reason", ownerApproval: "Owner approval ID", selected: "Selected record", rowId: "Record ID" },
    uz: { load: "Maʼlumotni yangilash", diagnostics: "Diagnostika", technical: "Texnik foundation", openTech: "Eski foundation panellarini ochish", closeTech: "Panellarni yashirish", noFake: "Fake yo‘q: UI faqat backend javobini ko‘rsatadi. Locked route locked sababini ko‘rsatadi.", last: "Oxirgi backend javobi", routeNeeded: "Bu funksiya uchun backend route kerak", workflow: "Ish funksiyalari", reports: "Hisobotlar va shkalalar", checkpoints: "Tekshiruvlar", actions: "Amallar", endpoint: "Backend endpoints", empty: "Maʼlumot yo‘q. Yangilang yoki pastdagi foundation panelni oching.", status: "Holat", progress: "Tayyorlik", data: "Maʼlumot", locked: "Bloklangan", success: "Muvaffaqiyatli", failed: "Xato", details: "Tafsilot", sync: "Sinxron", approval: "Tasdiq", queue: "Navbat", evidence: "Dalillar", balance: "Balans", complaints: "Shikoyatlar", gifts: "Sovg‘alar", apply: "Bajarish", reason: "Admin sababi", ownerApproval: "Owner approval ID", selected: "Tanlangan yozuv", rowId: "Yozuv ID" },
    zh: { load: "刷新数据", diagnostics: "诊断", technical: "技术基础", openTech: "打开旧基础面板", closeTech: "隐藏旧面板", noFake: "无模拟数据：界面只显示服务器响应。路由被锁定时显示锁定原因。", last: "最新服务器响应", routeNeeded: "此功能需要服务器路由", workflow: "工作功能", reports: "报告和刻度", checkpoints: "检查", actions: "操作", endpoint: "Server endpoints", empty: "无数据。请刷新数据或打开下方基础面板。", status: "状态", progress: "就绪", data: "数据", locked: "已锁定", success: "成功", failed: "错误", details: "详情", sync: "同步", approval: "批准", queue: "队列", evidence: "证据", balance: "余额", complaints: "投诉", gifts: "礼物", apply: "执行", reason: "管理员原因", ownerApproval: "principal confirmation number", selected: "所选记录", rowId: "记录编号" },
  };
  return map[language]?.[key] ?? map.ru[key] ?? key;
}

const MODULES007B: Record<ModuleKey007B, Record<AdminLanguage, ModuleConfig007B>> = {
  dashboard: makeModule({ ru: ["Главная админ-панель Саби", "Единый обзор модулей, блокировок, синхронизации и панелей основы."], en: ["Sabi Admin Dashboard", "Unified overview of modules, blockers, sync and foundation panels."], uz: ["Sabi Admin bosh paneli", "Modullar, bloklar va foundation panellari umumiy nazorati."], zh: ["萨比管理总览", "模块、阻断、同步和基础面板总览。"] }, "safe", "100%", ["Taxi", "Stream", "Billing", "Airwallex", "Readiness", "Messenger"], ["Все модули", "Safety boundary", "Build smoke", "Production locked"], []),
  taxi: makeModule({ ru: ["Taxi Control Center", "Заявки, водители, авто, фото/документы, жалобы, баланс, подарки и отчёты."], en: ["Taxi Control Center", "Applications, drivers, vehicles, photos/documents, complaints, balance, rewards and reports."], uz: ["Taksi boshqaruv markazi", "Arizalar, haydovchilar, mashinalar, hujjatlar, shikoyatlar va balans."], zh: ["出租车控制中心", "申请、司机、车辆、照片/文件、投诉、余额和报告。"] }, "interface only / server locked", "99%", ["Заявки", "Фото/документы", "Водители", "Авто", "Жалобы", "Баланс", "Подарки", "Отчёты"], ["58 routes", "34/34 actions", "database write locked", "No false approve"], [
    block("Заявки водителей", "Полная карточка: водитель, проверка клиента, телефон, регион, документы, фото и авто.", ["driver identity", "vehicle documents", "photo evidence", "admin reason"], ["Review", "Approve via server", "Reject via server", "Require docs"]),
    block("Жалобы и доказательства", "Проверка жалоб, доказательства, рекомендация ИИ, назначение, эскалация и закрытие.", ["complaint id", "trip id", "evidence", "severity"], ["Assign", "Escalate", "Resolve", "Attach evidence"]),
    block("Баланс таксистов", "Баланс, резерв, ожидаемый расчёт, доступный расчёт и граница платежей без изменения кошелька.", ["driver balance", "charge hold", "settlement", "balance account boundary"], ["Review hold", "Mark pending", "Check settlement", "Open boundary"]),
    block("Подарки / бонусы", "Заморозка и разблокировка подарков и наград только через одобрение сервера и владельца, без фейковой выплаты.", ["gift id", "owner approval", "legal/finance", "no payout from UI"], ["Freeze review", "Release review", "Request approval"]),
  ], ["/api/taxi/002n/readiness", "/api/taxi/002n/routes", "/api/taxi/002t/read-only-db-dry-run", "/api/taxi/002x/db-write-runtime/write-gate"], [
    { label: "Readiness", path: "/api/taxi/002n/readiness" },
    { label: "Routes", path: "/api/taxi/002n/routes" },
    { label: "Read-only DB", path: "/api/taxi/002t/read-only-db-dry-run" },
    { label: "Write gate", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: "admin-ui-007b", requestedAction: "write_gate_check", fakeSuccessBlocked: true } },
    { label: "Provider / Wallet boundary", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: "admin-ui-007b", requestedAction: "boundary_check", fakeSuccessBlocked: true } },
  ]),
  stream: makeModule({ ru: ["Stream Control Center", "Комнаты, модерация, граница подарков и игр, события, провайдер и отчёты."], en: ["Stream Control Center", "Rooms, moderation, gifts/games boundary, events, external service and reports."], uz: ["Strim boshqaruv markazi", "Xonalar, moderatsiya, sovg ‘alar/o ‘yinlar boundary va hisobotlar."], zh: ["直播控制中心", "房间、审核、礼物/游戏边界、事件、提供商和报告。"] }, "safe plan", "100%", ["Комнаты", "Модерация", "Gifts/Games", "Events", "External service", "Reports"], ["Rooms 0", "Users 0", "External service locked", "Safety ON"], [block("Room operations", "Создать, закрыть или проверить комнату можно только через сервер, если маршрут открыт.", ["room id", "host", "moderation", "events"], ["Check rooms", "Moderate", "Open report"]), block("Gifts/games", "Граница подарков и игр: без фейковых денег и фейковых выплат.", ["gift catalog", "game stake boundary", "balance account blocked"], ["Review gift", "Check game boundary"])], ["Stream rooms", "Moderation reports", "Events", "External service readiness"], []),
  googleBilling: makeModule({ ru: ["Google Billing Control Center", "Контракты продуктов, проверка покупок, граница возвратов и готовность."], en: ["Google Billing Control Center", "Product contracts, purchase verification, refund boundary and readiness."], uz: ["Google Billing markazi", "Mahsulotlar, xarid tekshiruvi va refund boundary."], zh: ["谷歌计费控制中心", "产品、购买验证、退款边界和就绪状态。"] }, "safe-disabled", "100%", ["Products", "Purchases", "Refunds", "Contracts", "Reports"], ["External service google_billing", "Products 3", "Digital goods", "Live environment locked"], [block("Purchase review", "Проверка токена покупки и контракта продукта без фейкового права доступа.", ["token", "product id", "contract", "external service locked"], ["Verify", "Refund preview", "Open contract"]), block("Product catalog", "Digital goods only: play console products and internal contracts must match.", ["sku", "price", "region", "entitlement"], ["Catalog check", "Contract check"])], ["Product readiness", "Purchase safety", "Refund boundary", "Entitlement contracts"], []),
  airwallex: makeModule({ ru: ["Airwallex Control Center", "Ключи владельца, проверка бизнеса и клиента, готовность расчётов, граница провайдера и отчёты."], en: ["Airwallex Control Center", "principal keys, KYB/KYC, settlement readiness, external service boundary and reports."], uz: ["Airwallex markazi", "principal keys, KYB/KYC va settlement boundary."], zh: ["空中云汇控制中心", "所有者密钥、企业和客户验证、结算边界和报告。"] }, "not configured", "100%", ["principal keys", "KYB/KYC", "Settlements", "External service", "Reports"], ["External service locked", "principal key ready", "Payout blocked", "No live environment"], [block("principal key intake", "Только ссылочные метки; секретные значения не читать и не печатать.", ["reference labels", "principal confirmation", "no env dump"], ["Check labels", "Request principal confirmation"]), block("Settlement boundary", "Физическая коммерция и готовность выплат без движения денег.", ["KYB", "settlement", "external service config", "withdrawal locked"], ["Review KYB", "Check settlement"] )], ["principal labels", "KYB/KYC", "External service readiness", "Settlement boundary"], []),
  readiness: makeModule({ ru: ["Readiness & Reviewer Evidence", "Блокеры запуска, доказательства для проверки, контрольные шлюзы, производственные блокировки и финальные проверки."], en: ["Readiness & Reviewer Evidence", "Launch blockers, reviewer evidence, gates, production locks and final checks."], uz: ["Readiness va reviewer evidence", "Launch bloklari, reviewer dalillari va production locks."], zh: ["就绪状态与审核证据", "启动阻断、审核证据、关口和生产锁定。"] }, "blocked", "0%", ["Gates", "Evidence", "Blockers", "Launch", "Reports"], ["Production blocked", "Evidence visible", "Server stages", "Safety ON"], [block("Launch gates", "Нельзя запускать производство, пока не готовы одобрения сервера, провайдера и базы данных.", ["billing", "airwallex", "stream", "taxi"], ["Review gates", "Open blockers"]), block("Reviewer evidence", "Скриншоты, разрешения, безопасность данных и пакеты проверки магазина приложений.", ["permissions", "screenshots", "policy", "audit"], ["Open evidence", "Check package"])], ["Reviewer evidence", "Launch blockers", "Safety state", "Production readiness"], []),
  core: generic("Sabi Core", "Core monetization, owner approvals, billing and Airwallex boundaries."), wallet: generic("Wallet / Finance", "Wallet, balances, QR Pay, merchant finance, gift purchases and reports."), providers: generic("Providers", "Provider keys, config, runtime locks, owner confirmation and catalog."), users: generic("Users", "Users, profiles, restrictions, access and status."), risk: generic("Risk", "Risk signals, cases, restrictions and AI/manual review."), audit: generic("Audit", "Audit journal, integrity report, exports and security state."), roles: generic("Roles", "Permission matrix, roles and staff access alignment."), staff: generic("Staff", "Staff access, approvals, restrictions and owner checks."), owner: generic("Owner", "Owner security center, critical confirmations and unlock requests."), security: generic("Security", "Secrets, key references, redaction and security gates."), finance: generic("Finance", "Reports, finance controls, settlement views and export boundary."), merchant: generic("Merchant", "Merchant accounts, QR/Pay, settlements and KYB status."), business: generic("Business", "Business accounts, approvals, employees, KYB and wallet route."), developer: generic("Developer", "Diagnostics, runtime health, tools and safe debug console."), emergency: generic("Emergency", "Emergency locks, unblock flow, incidents and safe recovery."),
};

function makeModule(copy: Record<AdminLanguage, [string, string]>, state: string, score: string, pages: string[], metrics: string[], blocks: WorkBlock007B[], reports: string[] = [], endpoints: Endpoint007B[] = []): Record<AdminLanguage, ModuleConfig007B> {
  return (Object.keys(copy) as AdminLanguage[]).reduce((acc, lang) => {
    acc[lang] = { title: copy[lang][0], subtitle: copy[lang][1], state, score, pages, metrics, blocks, reports, endpoints, technical: "Foundation panel preserved below; hidden by default to keep the screen clean." };
    return acc;
  }, {} as Record<AdminLanguage, ModuleConfig007B>);
}
function block(title: string, desc: string, checks: string[], actions: string[], tone: Tone007B = "info"): WorkBlock007B { return { title, desc, checks, actions, tone }; }
function generic(title: string, subtitle: string): Record<AdminLanguage, ModuleConfig007B> {
  const translated: Record<AdminLanguage, [string, string]> = { ru: [title, subtitle], en: [title, subtitle], uz: [title, subtitle], zh: [title, subtitle] };
  return makeModule(translated, "controlled", "ready", ["Overview", "Queues", "Approvals", "Reports", "Audit"], ["Live panel", "Owner gates", "No fake", "Audit visible"], [block("Operations", "Main function groups are kept as separate Messenger-style blocks. Existing real panel is preserved below.", ["real backend response", "admin reason", "owner gate"], ["Open panel", "Refresh", "Review"]), block("Reports", "Reports and scales should be separated from technical dumps.", ["summary", "growth", "audit"], ["View reports", "Export if allowed"])], ["Status", "Queues", "Reports", "Audit"], []);
}
function moduleFor(key: ModuleKey007B, language: AdminLanguage): ModuleConfig007B { return MODULES007B[key]?.[language] ?? MODULES007B[key]?.ru ?? MODULES007B.dashboard.ru; }
function toneClass007B(tone?: Tone007B): string { return `ms007b-tone-${tone ?? "info"}`; }
function safeBase007B(config: AdminApiConfig): string { return (config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "").replace(/:(4000|4001|5173|4173)/, ":3000"); }
function message007B(status: number, payload: unknown): string { const rec = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {}; return String(rec.message ?? rec.code ?? rec.error ?? (status >= 200 && status < 300 ? "backend data returned" : `HTTP ${status}`)); }

export function AdminUiMessengerStylePage007B(props: { moduleKey: ModuleKey007B; language: AdminLanguage; config?: AdminApiConfig; setNotice?: (notice: string) => void; children?: ReactNode; childrenTitle?: string }) {
  const cfg = moduleFor(props.moduleKey, props.language);
  const [active, setActive] = useState(cfg.pages[0] ?? "Overview");
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<LastResponse007B>(null);
  const [techOpen, setTechOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [rowId, setRowId] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const activeBlocks = useMemo(() => cfg.blocks.filter((_, index) => active === cfg.pages[0] || index === cfg.pages.indexOf(active) % Math.max(cfg.blocks.length, 1) || cfg.blocks.length <= 2), [active, cfg]);

  async function callEndpoint(endpoint: Endpoint007B) {
    if (!props.config) return;
    setBusy(true);
    try {
      const response = await fetch(`${safeBase007B(props.config)}${endpoint.path}`, {
        method: endpoint.method ?? "GET",
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": props.config.token, "x-admin-token": props.config.token },
        body: (endpoint.method ?? "GET") === "GET" ? undefined : JSON.stringify({ ...(endpoint.body ?? {}), adminReason: reason || undefined, rowId: rowId || undefined, ownerApprovalId: ownerApprovalId || undefined, fakeSuccessBlocked: true }),
      });
      let payload: unknown = null;
      try { payload = await response.json(); } catch { payload = await response.text(); }
      const next = { label: endpoint.label, status: response.status, ok: response.ok, message: message007B(response.status, payload), payload, at: new Date().toISOString() };
      setLast(next);
      props.setNotice?.(`${endpoint.label}: ${response.status}`);
    } catch (error) {
      setLast({ label: endpoint.label, status: 0, ok: false, message: error instanceof Error ? error.message : String(error), payload: null, at: new Date().toISOString() });
    } finally { setBusy(false); }
  }

  return <section className="messengerStyle007B" data-admin-ui-007b-messenger-style="true" data-admin-ui-007b-module={props.moduleKey}>
    <div className="ms007b-hero">
      <div>
        <span className="ms007b-kicker">ADMIN-UI 007B · Messenger style · {props.moduleKey}</span>
        <h1>{cfg.title}</h1>
        <p>{cfg.subtitle}</p>
      </div>
      <div className="ms007b-heroBadges"><span>{cfg.state}</span><span>{cfg.score}</span><span>no fake</span></div>
    </div>
    <div className="ms007b-alert">{copy007B(props.language, "noFake")}</div>
    <div className="ms007b-tabs">{cfg.pages.map((page) => <button key={page} className={active === page ? "active" : ""} onClick={() => setActive(page)}>{page}</button>)}</div>
    <div className="ms007b-metrics">{cfg.metrics.map((metric, index) => <div className="ms007b-metric" key={`${metric}-${index}`}><span>{metric}</span><strong>{index === 0 ? cfg.score : index === 1 ? cfg.state : index === 2 ? "ON" : "0"}</strong><small>{copy007B(props.language, index === 0 ? "progress" : index === 1 ? "status" : "sync")}</small></div>)}</div>
    <div className="ms007b-grid">
      <div className="ms007b-mainCard">
        <div className="ms007b-sectionTitle"><h2>{copy007B(props.language, "workflow")}</h2><span>{active}</span></div>
        <div className="ms007b-functions">{activeBlocks.map((item) => <article className={`ms007b-function ${toneClass007B(item.tone)}`} key={item.title}><div><h3>{item.title}</h3><p>{item.desc}</p></div><div className="ms007b-checks"><strong>{copy007B(props.language, "checkpoints")}</strong>{item.checks.map((check) => <span key={check}>✓ {check}</span>)}</div><div className="ms007b-actions"><strong>{copy007B(props.language, "actions")}</strong>{item.actions.map((action) => <button key={action} disabled>{action}</button>)}</div></article>)}</div>
      </div>
      <aside className="ms007b-sideCard">
        <h2>{copy007B(props.language, "approval")}</h2>
        <label><span>{copy007B(props.language, "rowId")}</span><input value={rowId} onChange={(e) => setRowId(e.target.value)} placeholder="applicationId / driverId / caseId" /></label>
        <label><span>{copy007B(props.language, "reason")}</span><textarea value={reason} onChange={(e) => setReason(e.target.value)} /></label>
        <label><span>{copy007B(props.language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(e) => setOwnerApprovalId(e.target.value)} /></label>
        <p className="ms007b-note">{copy007B(props.language, "routeNeeded")}: action buttons are enabled only when a backend endpoint exists.</p>
      </aside>
    </div>
    <div className="ms007b-grid two">
      <div className="ms007b-mainCard">
        <div className="ms007b-sectionTitle"><h2>{copy007B(props.language, "reports")}</h2><span>{cfg.reports.length}</span></div>
        <div className="ms007b-reportList">{(cfg.reports.length ? cfg.reports : [copy007B(props.language, "empty")]).map((report, index) => <div key={`${report}-${index}`}><span>{report}</span><b style={{ width: `${Math.max(18, 92 - index * 11)}%` }} /></div>)}</div>
      </div>
      <div className="ms007b-mainCard">
        <div className="ms007b-sectionTitle"><h2>{copy007B(props.language, "endpoint")}</h2><span>{cfg.endpoints.length || DASH}</span></div>
        <div className="ms007b-endpoints">{cfg.endpoints.length ? cfg.endpoints.map((endpoint) => <button key={endpoint.label} onClick={() => callEndpoint(endpoint)} disabled={busy}>{endpoint.label}</button>) : <span className="ms007b-note">{copy007B(props.language, "empty")}</span>}</div>
      </div>
    </div>
    <div className="ms007b-last">
      <h2>{copy007B(props.language, "last")}</h2>
      {last ? <><div className={last.ok ? "ms007b-statusOk" : "ms007b-statusBad"}>{last.label} · HTTP {last.status} · {last.message}</div><pre>{JSON.stringify(last.payload, null, 2)}</pre></> : <p>{copy007B(props.language, "empty")}</p>}
    </div>
    {props.children ? <div className="ms007b-legacy"><button onClick={() => setTechOpen(!techOpen)}>{techOpen ? copy007B(props.language, "closeTech") : copy007B(props.language, "openTech")}</button>{techOpen ? <div className="ms007b-legacyBody"><h2>{props.childrenTitle ?? copy007B(props.language, "technical")}</h2>{props.children}</div> : null}</div> : null}
  </section>;
}
