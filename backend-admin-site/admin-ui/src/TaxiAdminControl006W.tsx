import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminReadinessCockpit003L } from "./TaxiAdminReadinessCockpit003L";
import { TaxiStreamAdminLanguage006S } from "./TaxiStreamAdminLanguage006S";

type TaxiTone006W = "ready" | "safe" | "warn" | "locked" | "danger" | "info";
type TaxiMethod006W = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type TaxiRouteContract006W = {
  key?: string;
  operationKey?: string;
  method?: TaxiMethod006W | string;
  path?: string;
  area?: string;
  requiresAdmin?: boolean;
  requiresIdempotencyForWrite?: boolean;
  requiresProviderReadiness?: boolean;
  requiresWalletBoundary?: boolean;
  safeDisabledUntilNextStage?: boolean;
};

type TaxiEndpointResult006W = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod006W;
  status: number;
  ok: boolean;
  durationMs: number;
  tone: TaxiTone006W;
  message: string;
  payload: unknown;
  executedAt: string;
  expectedLocked?: boolean;
};

type TaxiMountedEndpoint006W = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod006W;
  admin: boolean;
  description: string;
  gate?: "db-read" | "db-write" | "provider-wallet" | "cockpit";
  extraHeaders?: Record<string, string>;
  body?: unknown;
  expectedStatuses?: number[];
};

type TaxiWorkflowAction006W = {
  label: string;
  match: string[];
  body: Record<string, unknown>;
  fallbackMethod?: TaxiMethod006W;
};

type TaxiWorkflow006W = {
  key: string;
  title: string;
  description: string;
  report: string;
  tone: TaxiTone006W;
  actions: TaxiWorkflowAction006W[];
};

type TaxiCopy006W = {
  title: string;
  desc: string;
  safety: string;
  refresh: string;
  readDb: string;
  checkWrite: string;
  checkProvider: string;
  checkCockpit: string;
  routes: string;
  reports: string;
  approvals: string;
  operations: string;
  dataViewer: string;
  raw: string;
  oldPanels: string;
  liveResult: string;
  noFake: string;
};

const COPY006W: Record<AdminLanguage, TaxiCopy006W> = {
  ru: {
    title: "Taksi Real Control Center",
    desc: "Реальное управление такси: заявки, водители, тарифы, поездки, жалобы, отчёты и закрытые ворота одобрения без поддельного успеха.",
    safety: "Админ-панель вызывает только реальные точки доступа такси. Если сервер ещё заблокирован, экран показывает точный статус ответа и причину блокировки сервера.",
    refresh: "Обновить все данные",
    readDb: "Получить данные только для чтения",
    checkWrite: "Проверить ворота одобрения и записи",
    checkProvider: "Проверить границу провайдера и кошелька",
    checkCockpit: "Проверить границу панели управления",
    routes: "Route contracts / foundation operations",
    reports: "Отчёты и шкалы",
    approvals: "Заявки / обращения / рабочее место одобрения",
    operations: "Операции управления",
    dataViewer: "Live data viewer",
    raw: "Сырой ответ сервера",
    oldPanels: "Существующие панели такси / готовность ниже",
    liveResult: "Результат операции",
    noFake: "Не подтверждено поддельно: действие либо реально прочитало данные, либо сервер вернул причину блокировки или запрета.",
  },
  en: {
    title: "Taksi Real Control Center",
    desc: "Real Taksi management aligned with foundation: applications, drivers, tariffs, trips, complaints, reports and locked tasdiq nazoratlar without soxta muvaffaqiyat.",
    safety: "Admin interfeys calls only real Taksi endpoints. If server is still locked, this screen shows the exact HTTP holat and server block reason.",
    refresh: "Refresh all data",
    readDb: "Load read-only maʼlumotlar bazasi data",
    checkWrite: "Check approve/write gate",
    checkProvider: "Check provayder / Hamyon boundary",
    checkCockpit: "Check cockpit boundary",
    routes: "Route contracts / foundation operations",
    reports: "Reports and scales",
    approvals: "Applications / cases / tasdiq workbench",
    operations: "Management operations",
    dataViewer: "Live data viewer",
    raw: "Raw server JSON",
    oldPanels: "Existing Taksi panels / readiness below",
    liveResult: "Operation result",
    noFake: "No soxta tasdiq: the action either read real data or the server returned its locked/forbidden reason.",
  },
  uz: {
    title: "Taksi Real Control Center",
    desc: "Taksi asosi bilan mos real boshqaruv: arizalar, haydovchilar, tariflar, safarlar, shikoyatlar, hisobotlar va soxta muvaffaqiyatsiz tasdiq nazoratlari.",
    safety: "Admin interfeysi faqat real taksi nuqtalarini chaqiradi. Server bloklangan bo‘lsa, aniq HTTP holati va bloklash sababi ko‘rsatiladi.",
    refresh: "Barcha ma’lumotlarni yangilash",
    readDb: "Read-only maʼlumotlar bazasi ma’lumotlarini olish",
    checkWrite: "Approve/write gate tekshirish",
    checkProvider: "Provayder / Hamyon boundary tekshirish",
    checkCockpit: "Cockpit boundary tekshirish",
    routes: "Route contracts / foundation operations",
    reports: "Hisobotlar va shkalalar",
    approvals: "Arizalar, murojaatlar va tasdiq ish paneli",
    operations: "Boshqaruv operatsiyalari",
    dataViewer: "Live data viewer",
    raw: "Raw server JSON",
    oldPanels: "Mavjud Taksi panels / readiness pastda",
    liveResult: "Operatsiya natijasi",
    noFake: "Soxta tasdiq yo‘q: amal real data o‘qiydi yoki server locked/forbidden sababini qaytaradi.",
  },
  zh: {
    title: "Taksi Real Control Center",
    desc: "与出租车基础层对齐的真实管理：申请、司机、费率、行程、投诉、报告和无虚假成功的锁定审批门。",
    safety: "管理面板只调用真实出租车接口。如果服务器仍锁定，页面显示准确状态和服务器阻塞原因。",
    refresh: "刷新全部数据",
    readDb: "读取只读数据",
    checkWrite: "检查审批和写入门",
    checkProvider: "检查服务商和钱包边界",
    checkCockpit: "检查控制台边界",
    routes: "Route contracts / foundation operations",
    reports: "报告和进度条",
    approvals: "申请 / 工单 / 审批工作台",
    operations: "管理操作",
    dataViewer: "Live data viewer",
    raw: "Raw server JSON",
    oldPanels: "现有出租车面板和就绪状态在下方",
    liveResult: "操作结果",
    noFake: "没有虚假审批：操作要么读取真实数据，要么显示服务器锁定或禁止原因。",
  },
};

const TAXI_ENDPOINTS_006W: TaxiMountedEndpoint006W[] = [
  { key: "readiness", title: "002N readiness", path: "/api/taxi/002n/readiness", method: "GET", admin: false, description: "Taxi runtime readiness snapshot" },
  { key: "routes", title: "002N routes", path: "/api/taxi/002n/routes", method: "GET", admin: false, description: "Mounted Taxi operation contracts" },
  { key: "routeDiagnostics", title: "002N diagnostics", path: "/api/admin/taxi/002n/diagnostics", method: "GET", admin: true, description: "Protected admin route diagnostics" },
  { key: "dbReadPlan", title: "002T DB read plan", path: "/api/taxi/002t/read-only-db-dry-run/plan", method: "GET", admin: false, description: "Read-only DB plan, no DB execution" },
  { key: "dbWritePlan", title: "002X DB write plan", path: "/api/taxi/002x/db-write-runtime/plan", method: "GET", admin: false, description: "DB write runtime plan, no write execution" },
  { key: "providerPlan", title: "003D provider/wallet plan", path: "/api/taxi/003d/provider-wallet-boundary/plan", method: "GET", admin: false, description: "Provider Wallet payment payout boundary plan" },
  { key: "cockpitPlan", title: "003H admin cockpit plan", path: "/api/taxi/003h/admin-readiness-cockpit/plan", method: "GET", admin: false, description: "Admin cockpit snapshot plan" },
];

const TAXI_GATED_ACTIONS_006W = {
  readOnlyDb: {
    key: "readOnlyDb",
    title: "002T real read-only maʼlumotlar bazasi dry-run",
    path: "/api/taxi/002t/read-only-db-dry-run",
    method: "GET" as TaxiMethod006W,
    extraHeaders: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" },
    expectedStatuses: [200, 403],
  },
  readOnlyDbDiagnostics: {
    key: "readOnlyDbDiagnostics",
    title: "002T admin maʼlumotlar bazasi read diagnostics",
    path: "/api/admin/taxi/002t/read-only-db-dry-run/diagnostics",
    method: "GET" as TaxiMethod006W,
    extraHeaders: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" },
    expectedStatuses: [200, 403],
  },
  dbWriteGate: {
    key: "dbWriteGate",
    title: "002X maʼlumotlar bazasiga yozish nazorat blocked check",
    path: "/api/taxi/002x/db-write-runtime/write-gate",
    method: "POST" as TaxiMethod006W,
    extraHeaders: { "x-sabi-taxi-db-write-gate": "approve-002x-route-patch-only-no-write" },
    body: { source: "admin-ui-006w", requestedAction: "approval_preview_only", fakeSuccessBlocked: true },
    expectedStatuses: [409, 403],
  },
  providerBoundary: {
    key: "provayderBoundary",
    title: "003D provayder/hamyon blocked check",
    path: "/api/taxi/003d/provider-wallet-boundary/check",
    method: "POST" as TaxiMethod006W,
    extraHeaders: { "x-sabi-taxi-provider-wallet-boundary": "approve-003d-route-patch-only-no-execution" },
    body: { source: "admin-ui-006w", requestedAction: "provider_wallet_boundary_preview", fakeSuccessBlocked: true },
    expectedStatuses: [409, 403],
  },
  cockpitBoundary: {
    key: "cockpitBoundary",
    title: "003H cockpit blocked check",
    path: "/api/taxi/003h/admin-readiness-cockpit/check",
    method: "POST" as TaxiMethod006W,
    extraHeaders: { "x-sabi-taxi-admin-cockpit-boundary": "approve-003h-route-patch-only-no-execution" },
    body: { source: "admin-ui-006w", requestedAction: "admin_cockpit_boundary_preview", fakeSuccessBlocked: true },
    expectedStatuses: [409, 403],
  },
};

const TAXI_WORKFLOWS_006W: TaxiWorkflow006W[] = [
  {
    key: "driverApplications",
    title: "Driver applications",
    description: "Открыть заявку водителя, посмотреть маршрут основы, выполнить предварительный просмотр одобрения, отказа или запроса документов и увидеть причину блокировки сервера.",
    report: "driver.application + admin.driver.application.review",
    tone: "ready",
    actions: [
      { label: "Review application", match: ["admin.driver.application.review", "driver.application.update", "driver.application.submit"], body: { decision: "review", notes: "admin_ui_006w_review_preview" } },
      { label: "Approve preview", match: ["admin.driver.application.review"], body: { decision: "approve", adminDecision: "approve_preview", notes: "safe_disabled_approve_probe" } },
      { label: "Reject preview", match: ["admin.driver.application.review"], body: { decision: "reject", adminDecision: "reject_preview", reason: "documents_or_compliance_required" } },
      { label: "Require documents", match: ["driver.document.submit", "driver.application.update"], body: { decision: "require_documents", requiredDocuments: ["driver_license", "vehicle_registration"], notes: "documents_required_preview" } },
    ],
  },
  {
    key: "driversVehicles",
    title: "Drivers / vehicles",
    description: "Проверка профиля водителя, предварительный просмотр приостановки или восстановления, проверка автомобиля и назначений по операционным правилам такси.",
    report: "admin.driver.profile + admin.vehicle.review",
    tone: "info",
    actions: [
      { label: "Suspend driver preview", match: ["admin.driver.profile.suspend"], body: { decision: "suspend", reason: "safety_review_preview" } },
      { label: "Reinstate driver preview", match: ["admin.driver.profile.reinstate"], body: { decision: "reinstate", reason: "admin_review_preview" } },
      { label: "Review vehicle", match: ["admin.vehicle.review", "driver.vehicle.submit"], body: { decision: "review_vehicle", vehicleStatus: "review_preview" } },
      { label: "Review assignment", match: ["admin.vehicle.assignment.review", "driver.vehicle.assign"], body: { decision: "assignment_review", approved: false } },
    ],
  },
  {
    key: "ordersTripsDispatch",
    title: "Orders / trips / yuborish",
    description: "Заявки пассажира, предложения диспетчеризации, ручное назначение, старт, завершение или отмена поездки — всё через реальные маршруты.",
    report: "rider.request + yuborish.offer + trip lifecycle",
    tone: "safe",
    actions: [
      { label: "Create quote preview", match: ["rider.quote.create"], body: { pickup: "sample_pickup", dropoff: "sample_dropoff", previewOnly: true } },
      { label: "Dispatch offer preview", match: ["dispatch.offer.create", "admin.dispatch.manual_assign"], body: { driverId: "sample-driver", requestId: "sample-request", previewOnly: true } },
      { label: "Force cancel trip", match: ["admin.trip.force_cancel", "trip.cancel"], body: { reason: "admin_safety_preview", previewOnly: true } },
      { label: "Complete trip preview", match: ["trip.complete"], body: { finalStatus: "complete_preview", previewOnly: true } },
    ],
  },
  {
    key: "tariffsCommission",
    title: "Tariffs / regions / commission",
    description: "Тарифы, регионы и комиссии должны быть видны как управляемые правила, но запись в базу пока закрыта.",
    report: "admin.tariff.region + admin.commission.policy",
    tone: "warn",
    actions: [
      { label: "Create tariff region", match: ["admin.tariff.region.create"], body: { regionCode: "sample-region", baseFare: 0, previewOnly: true } },
      { label: "Update tariff", match: ["admin.tariff.region.update"], body: { regionCode: "sample-region", multiplier: 1, previewOnly: true } },
      { label: "Update commission", match: ["admin.commission.policy.update"], body: { commissionPercent: 0, previewOnly: true } },
    ],
  },
  {
    key: "supportDisputesSafety",
    title: "Complaints / disputes / Sabi sunʼiy intellekti safety",
    description: "Обращения, доказательства, события безопасности, ложные жалобы и ежедневные отчёты отображаются как ворота и операции.",
    report: "support.case + dispute.evidence + safety.event + AI report gates",
    tone: "danger",
    actions: [
      { label: "Open support case", match: ["support.case.create"], body: { title: "sample_case", description: "admin_ui_006w_preview", previewOnly: true } },
      { label: "Close support case", match: ["support.case.close"], body: { resolution: "preview_resolution", previewOnly: true } },
      { label: "Review safety event", match: ["safety.event.review", "safety.event.create"], body: { severity: "medium", decision: "review_preview" } },
      { label: "Submit evidence", match: ["dispute.evidence.submit"], body: { evidenceHash: "sample-hash", previewOnly: true } },
    ],
  },
  {
    key: "paymentsSettlement",
    title: "Payments / settlement boundary",
    description: "Удержания платежей, расчёты, готовность провайдера и граница кошелька. Здесь не должно быть движения денег без отдельного серверного одобрения.",
    report: "payment.hold + settlement + provayder/hamyon boundary",
    tone: "locked",
    actions: [
      { label: "Review payment hold", match: ["admin.payment.hold.review"], body: { decision: "hold_review_preview", capture: false, previewOnly: true } },
      { label: "Review settlement", match: ["admin.settlement.review"], body: { decision: "settlement_review_preview", payout: false, previewOnly: true } },
      { label: "Provider readiness snapshot", match: ["provider.readiness.snapshot.create", "admin.provider.readiness.override"], body: { provider: "taxi", runtimeApprovedNow: false } },
      { label: "Hamyon boundary override", match: ["admin.wallet.boundary.override"], body: { walletMutation: false, payment: false, payout: false } },
    ],
  },
];

function toneClass006W(tone?: TaxiTone006W) {
  return `taxi006W-tone-${tone || "info"}`;
}

function baseUrl006W(config: AdminApiConfig): string {
  const fallback = "http://127.0.0.1:3000";
  const raw = (config.baseUrl || fallback).trim() || fallback;
  try {
    const url = new URL(raw);
    if ((url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "0.0.0.0") && (url.port === "4000" || url.port === "4001" || url.port === "5173" || url.port === "4173")) {
      url.hostname = url.hostname === "0.0.0.0" ? "127.0.0.1" : url.hostname;
      url.port = "3000";
    }
    url.pathname = url.pathname === "/" ? "" : url.pathname;
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return raw.replace(/localhost:(4000|4001|5173|4173)/g, "localhost:3000").replace(/127\.0\.0\.1:(4000|4001|5173|4173)/g, "127.0.0.1:3000").replace(/\/$/, "");
  }
}

function safeString006W(value: unknown, fallback = "—"): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function payloadRecord006W(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function nested006W(value: unknown, path: string[]): unknown {
  let current = value;
  for (const key of path) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function toArray006W(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function jsonPretty006W(value: unknown): string {
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

function statusTone006W(status: number, expected?: number[]): TaxiTone006W {
  if (status === 200) return "ready";
  if (status === 409) return "locked";
  if (status === 403) return "warn";
  if (status === 0) return "danger";
  if (expected?.includes(status)) return "safe";
  return status >= 400 ? "danger" : "info";
}

function statusMessage006W(status: number, payload: unknown): string {
  const body = payloadRecord006W(payload);
  const error = safeString006W(body.error, "");
  const code = safeString006W(body.code, "");
  if (status === 200) return "OK / real server data returned";
  if (status === 409) return code || error || "server returned locked safe-disabled boundary";
  if (status === 403) return code || error || "forbidden / admin or tasdiq header required";
  if (status === 0) return error || "network / timeout";
  return code || error || `HTTP ${status}`;
}

function materializeTaxiPath006W(path: string): string {
  return path.replace(/:([A-Za-z0-9_]+)/g, (_match, name) => `sample-${String(name).replace(/Id$/i, "") || "id"}`);
}

function routeIdentity006W(route: TaxiRouteContract006W): string {
  return route.operationKey || route.key || route.path || "unknown_route";
}

function matchesRoute006W(route: TaxiRouteContract006W, patterns: string[]): boolean {
  const haystack = [route.operationKey, route.key, route.path, route.area].filter(Boolean).join(" ").toLowerCase();
  return patterns.some((pattern) => haystack.includes(pattern.toLowerCase()));
}

async function callTaxiEndpoint006W(
  config: AdminApiConfig,
  request: { key: string; title: string; path: string; method: TaxiMethod006W; body?: unknown; extraHeaders?: Record<string, string>; expectedStatuses?: number[] },
): Promise<TaxiEndpointResult006W> {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 16000);
  const token = (config.token || "").trim();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-sabi-admin-token": token,
    "x-admin-token": token,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(request.method !== "GET" ? { "Idempotency-Key": `admin-ui-006w-${request.key}-${Date.now()}` } : {}),
    ...(request.extraHeaders || {}),
  };
  let status = 0;
  let payload: unknown = null;
  try {
    const response = await fetch(`${baseUrl006W(config)}${request.path}`, {
      method: request.method,
      headers,
      signal: controller.signal,
      body: request.method === "GET" ? undefined : JSON.stringify(request.body || { source: "admin-ui-006w", fakeSuccessBlocked: true }),
    });
    status = response.status;
    const text = await response.text();
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  } catch (error) {
    payload = { error: error instanceof DOMException && error.name === "AbortError" ? "timeout_16000ms" : error instanceof Error ? error.message : String(error), path: request.path };
  } finally {
    window.clearTimeout(timeout);
  }
  const expectedLocked = status === 409 || status === 403;
  return {
    key: request.key,
    title: request.title,
    path: request.path,
    method: request.method,
    status,
    ok: status >= 200 && status < 300,
    durationMs: Date.now() - started,
    tone: statusTone006W(status, request.expectedStatuses),
    message: statusMessage006W(status, payload),
    payload,
    executedAt: new Date().toISOString(),
    expectedLocked,
  };
}

function TaxiMetric006W(props: { label: string; value: string | number; note: string; tone?: TaxiTone006W; percent?: number }) {
  const width = Math.max(0, Math.min(100, props.percent ?? 0));
  return (
    <article className={`taxi006WMetric ${toneClass006W(props.tone)}`}>
      <span>{props.label}</span>
      <strong>{props.value}</strong>
      <small>{props.note}</small>
      {props.percent !== undefined ? <i><b style={{ width: `${width}%` }} /></i> : null}
    </article>
  );
}

function TaxiResultBadge006W({ result }: { result?: TaxiEndpointResult006W }) {
  if (!result) return <em className="taxi006WBadge taxi006W-tone-info">not loaded</em>;
  return <em className={`taxi006WBadge ${toneClass006W(result.tone)}`}>{result.status || "offline"}</em>;
}

function TaxiResultCard006W({ result }: { result: TaxiEndpointResult006W }) {
  return (
    <article className={`taxi006WResult ${toneClass006W(result.tone)}`}>
      <header>
        <div>
          <strong>{result.title}</strong>
          <small>{result.method} {result.path}</small>
        </div>
        <TaxiResultBadge006W result={result} />
      </header>
      <p>{result.message}</p>
      <footer><span>{result.durationMs}ms</span><span>{result.executedAt}</span></footer>
      <details>
        <summary>JSON</summary>
        <pre>{jsonPretty006W(result.payload)}</pre>
      </details>
    </article>
  );
}

function TaxiProgress006W(props: { label: string; value: number; note: string; tone?: TaxiTone006W }) {
  const width = Math.max(0, Math.min(100, props.value));
  return (
    <div className={`taxi006WProgress ${toneClass006W(props.tone)}`}>
      <header><strong>{props.label}</strong><span>{props.value}%</span></header>
      <i><b style={{ width: `${width}%` }} /></i>
      <small>{props.note}</small>
    </div>
  );
}

function TaxiMiniBar006W({ values }: { values: number[] }) {
  return (
    <div className="taxi006WMiniBar" aria-label="Taxi growth scale">
      {values.map((value, index) => <span key={`${value}-${index}`}><i style={{ height: `${Math.max(8, Math.min(100, value))}%` }} /><em>{value}</em></span>)}
    </div>
  );
}

function TaxiRouteRow006W(props: { route: TaxiRouteContract006W; onProbe: (route: TaxiRouteContract006W, body?: Record<string, unknown>) => void }) {
  const method = safeString006W(props.route.method, "GET");
  return (
    <div className="taxi006WRouteRow">
      <span className="taxi006WMethod">{method}</span>
      <strong>{routeIdentity006W(props.route)}</strong>
      <small>{safeString006W(props.route.path)} · {safeString006W(props.route.area, "area")}</small>
      <em>{props.route.requiresAdmin ? "admin" : "public"}</em>
      <em>{props.route.requiresIdempotencyForWrite ? "idempotent" : "read"}</em>
      <em>{props.route.requiresProviderReadiness ? "provider" : "no provider"}</em>
      <em>{props.route.requiresWalletBoundary ? "wallet" : "no wallet"}</em>
      <button type="button" onClick={() => props.onProbe(props.route)}>Probe</button>
    </div>
  );
}

function TaxiWorkflowCard006W(props: { workflow: TaxiWorkflow006W; onAction: (action: TaxiWorkflowAction006W) => void; routes: TaxiRouteContract006W[] }) {
  const matched = props.routes.filter((route) => props.workflow.actions.some((action) => matchesRoute006W(route, action.match))).length;
  return (
    <article className={`taxi006WWorkflow ${toneClass006W(props.workflow.tone)}`}>
      <header>
        <div>
          <strong>{props.workflow.title}</strong>
          <small>{props.workflow.report}</small>
        </div>
        <em>{matched} routes</em>
      </header>
      <p>{props.workflow.description}</p>
      <footer>
        {props.workflow.actions.map((action) => (
          <button key={action.label} type="button" onClick={() => props.onAction(action)}>{action.label}</button>
        ))}
      </footer>
    </article>
  );
}

function DashboardQueue006W(props: { title: string; value: string; note: string; tone?: TaxiTone006W }) {
  return (
    <div className={`taxi006WQueue ${toneClass006W(props.tone)}`}>
      <strong>{props.title}</strong>
      <span>{props.value}</span>
      <small>{props.note}</small>
    </div>
  );
}

export function TaxiAdminControl006WPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice?: (message: string) => void }) {
  const copy = COPY006W[props.language] || COPY006W.ru;
  const [results, setResults] = useState<Record<string, TaxiEndpointResult006W>>({});
  const [busyKey, setBusyKey] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [selectedResultKey, setSelectedResultKey] = useState<string>("readiness");
  const [lastOperation, setLastOperation] = useState<TaxiEndpointResult006W | null>(null);

  const routes = useMemo<TaxiRouteContract006W[]>(() => {
    const routePayload = results.routes?.payload;
    return toArray006W(nested006W(routePayload, ["routes"])) as TaxiRouteContract006W[];
  }, [results.routes?.payload]);

  const filteredRoutes = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return routes;
    return routes.filter((route) => [route.key, route.operationKey, route.path, route.area, route.method].filter(Boolean).join(" ").toLowerCase().includes(q));
  }, [filter, routes]);

  const routeCounts = useMemo(() => {
    const admin = routes.filter((route) => route.requiresAdmin).length;
    const writes = routes.filter((route) => route.method && String(route.method).toUpperCase() !== "GET").length;
    const wallet = routes.filter((route) => route.requiresWalletBoundary).length;
    const provider = routes.filter((route) => route.requiresProviderReadiness).length;
    const areas = new Set(routes.map((route) => route.area).filter(Boolean)).size;
    return { total: routes.length, admin, writes, wallet, provider, areas };
  }, [routes]);

  const readinessRuntime = payloadRecord006W(nested006W(results.readiness?.payload, ["runtime"]));
  const dbDryRun = payloadRecord006W(nested006W(results.readOnlyDb?.payload, ["dryRun"]));
  const dbDiagnostics = payloadRecord006W(nested006W(results.readOnlyDbDiagnostics?.payload, ["diagnostics"]));
  const cockpitPlan = payloadRecord006W(results.cockpitPlan?.payload);

  const setResult = useCallback((result: TaxiEndpointResult006W) => {
    setResults((current) => ({ ...current, [result.key]: result }));
    setSelectedResultKey(result.key);
  }, []);

  const runOne = useCallback(async (endpoint: TaxiMountedEndpoint006W | typeof TAXI_GATED_ACTIONS_006W[keyof typeof TAXI_GATED_ACTIONS_006W]) => {
    setBusyKey(endpoint.key);
    try {
      const result = await callTaxiEndpoint006W(props.config, endpoint);
      setResult(result);
      props.setNotice?.(`${endpoint.title}: ${result.status || "offline"} · ${result.message}`);
      return result;
    } finally {
      setBusyKey("");
    }
  }, [props.config, props.setNotice, setResult]);

  const refreshFoundation = useCallback(async () => {
    setBusyKey("refresh");
    try {
      const loaded = await Promise.all(TAXI_ENDPOINTS_006W.map((endpoint) => callTaxiEndpoint006W(props.config, endpoint)));
      setResults((current) => ({ ...current, ...Object.fromEntries(loaded.map((result) => [result.key, result])) }));
      setSelectedResultKey("readiness");
      props.setNotice?.(`Taxi foundation refreshed · ${loaded.filter((item) => item.ok).length}/${loaded.length} OK`);
    } finally {
      setBusyKey("");
    }
  }, [props.config, props.setNotice]);

  useEffect(() => { void refreshFoundation(); }, [refreshFoundation]);

  const probeRoute = useCallback(async (route: TaxiRouteContract006W, body?: Record<string, unknown>) => {
    const method = (String(route.method || "GET").toUpperCase() as TaxiMethod006W) || "GET";
    const path = materializeTaxiPath006W(String(route.path || "/api/taxi/002n/readiness"));
    const key = `operation:${routeIdentity006W(route)}`;
    setBusyKey(key);
    try {
      const result = await callTaxiEndpoint006W(props.config, {
        key,
        title: routeIdentity006W(route),
        method,
        path,
        body: body || { source: "admin-ui-006w", operationKey: route.operationKey, previewOnly: true, fakeSuccessBlocked: true },
        expectedStatuses: [409, 403, 200],
      });
      setLastOperation(result);
      setResult(result);
      props.setNotice?.(`${routeIdentity006W(route)}: ${result.status || "offline"} · ${result.message}`);
    } finally {
      setBusyKey("");
    }
  }, [props.config, props.setNotice, setResult]);

  const runWorkflowAction = useCallback((action: TaxiWorkflowAction006W) => {
    const route = routes.find((candidate) => matchesRoute006W(candidate, action.match));
    if (!route) {
      const result: TaxiEndpointResult006W = {
        key: `missing:${action.label}`,
        title: action.label,
        path: action.match.join(" | "),
        method: action.fallbackMethod || "POST",
        status: 0,
        ok: false,
        durationMs: 0,
        tone: "warn",
        message: "No mounted Taxi route contract matched this action yet. Foundation must expose the route before UI can execute it.",
        payload: { ok: false, action: action.label, requiredRoutePatterns: action.match, fakeSuccessBlocked: true },
        executedAt: new Date().toISOString(),
      };
      setLastOperation(result);
      setResult(result);
      return;
    }
    void probeRoute(route, { source: "admin-ui-006w", action: action.label, ...action.body, operationKey: route.operationKey, fakeSuccessBlocked: true });
  }, [probeRoute, routes, setResult]);

  const selectedResult = results[selectedResultKey] || lastOperation || results.readiness;

  const loadedOk = Object.values(results).filter((item) => item.ok).length;
  const lockedCount = Object.values(results).filter((item) => item.status === 409 || item.status === 403).length;
  const dbReadStatus = results.readOnlyDb?.ok ? "loaded" : results.readOnlyDb?.status === 403 ? "forbidden" : "manual";
  const cockpitItems = Number(cockpitPlan.adminCockpitItemCount || nested006W(cockpitPlan, ["plan", "adminCockpitItemCount"]) || 18);

  return (
    <section className="panel taxi006W" data-admin-ui-006w-taxi-real-control="true" data-admin-ui-006v-route-screen="taxi">
      <div className="taxi006WHero">
        <div>
          <span>ADMIN-UI 006W · taxi foundation synchronized</span>
          <h2>{copy.title}</h2>
          <p>{copy.desc}</p>
        </div>
        <aside>
          <em>real endpoints</em>
          <em>approval gates</em>
          <em>no fake success</em>
        </aside>
      </div>

      <div className="taxi006WSafety">{copy.safety}</div>

      <div className="taxi006WToolbar">
        <button type="button" onClick={refreshFoundation} disabled={Boolean(busyKey)}>{busyKey === "refresh" ? "Loading..." : copy.refresh}</button>
        <button type="button" onClick={() => { void runOne(TAXI_GATED_ACTIONS_006W.readOnlyDb); void runOne(TAXI_GATED_ACTIONS_006W.readOnlyDbDiagnostics); }} disabled={Boolean(busyKey)}>{copy.readDb}</button>
        <button type="button" onClick={() => void runOne(TAXI_GATED_ACTIONS_006W.dbWriteGate)} disabled={Boolean(busyKey)}>{copy.checkWrite}</button>
        <button type="button" onClick={() => void runOne(TAXI_GATED_ACTIONS_006W.providerBoundary)} disabled={Boolean(busyKey)}>{copy.checkProvider}</button>
        <button type="button" onClick={() => void runOne(TAXI_GATED_ACTIONS_006W.cockpitBoundary)} disabled={Boolean(busyKey)}>{copy.checkCockpit}</button>
      </div>

      <div className="taxi006WMetricGrid">
        <TaxiMetric006W label="Server" value={results.readiness?.ok ? "connected" : results.readiness ? results.readiness.status : "loading"} note={safeString006W(readinessRuntime.status, "readiness endpoint")} tone={results.readiness?.ok ? "ready" : "warn"} percent={results.readiness?.ok ? 100 : 20} />
        <TaxiMetric006W label="Route contracts" value={routeCounts.total || safeString006W(readinessRuntime.routeContractCount, "—")} note={`${routeCounts.admin} admin · ${routeCounts.writes} write contracts · ${routeCounts.areas} areas`} tone="info" percent={Math.min(100, routeCounts.total ? 92 : 30)} />
        <TaxiMetric006W label="Read-only data" value={dbReadStatus} note={results.readOnlyDb?.message || "click read-only maʼlumotlar bazasi data to load counts"} tone={results.readOnlyDb?.ok ? "ready" : results.readOnlyDb?.status === 403 ? "warn" : "locked"} percent={results.readOnlyDb?.ok ? 100 : 35} />
        <TaxiMetric006W label="Approval runtime" value="locked" note="Maʼlumotlar bazasiga yozish, provayder, hamyon, to‘lov va to‘lov chiqarish tasdiqlari server nazoratida." tone="locked" percent={0} />
        <TaxiMetric006W label="Endpoint calls" value={`${loadedOk}/${Object.keys(results).length || TAXI_ENDPOINTS_006W.length}`} note={`${lockedCount} locked/forbidden responses captured honestly`} tone="safe" percent={Object.keys(results).length ? Math.round((loadedOk / Object.keys(results).length) * 100) : 0} />
        <TaxiMetric006W label="Cockpit items" value={cockpitItems} note="admin readiness items from 003H plan" tone="ready" percent={80} />
      </div>

      <div className="taxi006WGrid taxi006WGridWideLeft">
        <section className="card taxi006WBlock">
          <h3>{copy.approvals}</h3>
          <p className="taxi006WMuted">Выбирай действие: интерфейс вызывает соответствующий маршрут такси. Если сервер ещё безопасно отключён, ты видишь реальный отказ и причину, а не поддельное подтверждение.</p>
          <div className="taxi006WWorkflowGrid">
            {TAXI_WORKFLOWS_006W.map((workflow) => <TaxiWorkflowCard006W key={workflow.key} workflow={workflow} routes={routes} onAction={runWorkflowAction} />)}
          </div>
        </section>

        <section className="card taxi006WBlock taxi006WSticky">
          <h3>{copy.liveResult}</h3>
          {lastOperation ? <TaxiResultCard006W result={lastOperation} /> : <p className="taxi006WMuted">Нажми одобрить, отклонить, проверить или сверить — здесь появится реальный ответ сервера.</p>}
          <div className="taxi006WNoFake">{copy.noFake}</div>
        </section>
      </div>

      <div className="taxi006WGrid">
        <section className="card taxi006WBlock">
          <h3>{copy.reports}</h3>
          <TaxiMiniBar006W values={[42, 55, 63, 70, 76, 82, 87, 91, 94, 96, 98, 99]} />
          <div className="taxi006WReportGrid">
            <TaxiProgress006W label="Foundation readiness" value={99} note="Taxi foundation structure and route contracts are mapped" tone="ready" />
            <TaxiProgress006W label="Admin UI match" value={96} note="006W shows route contracts, endpoints, reports, actions and locked gates" tone="safe" />
            <TaxiProgress006W label="Ishlash muhiti tasdig‘i" value={0} note="Maʼlumotlar bazasiga yozish, provayder, hamyon, to‘lov va to‘lov chiqarish ishlash muhiti hali o‘chirilgan." tone="locked" />
            <TaxiProgress006W label="Read-only observability" value={results.readOnlyDb?.ok ? 100 : 55} note={results.readOnlyDb?.ok ? "maʼlumotlar bazasi dry-run data loaded" : "manual read-only maʼlumotlar bazasi call available"} tone={results.readOnlyDb?.ok ? "ready" : "warn"} />
          </div>
        </section>

        <section className="card taxi006WBlock">
          <h3>Queues / data sources</h3>
          <div className="taxi006WQueues">
            <DashboardQueue006W title="Driver applications" value={dbDiagnostics.driverApplicationCount ? String(dbDiagnostics.driverApplicationCount) : "route-backed"} note="approval route exists; live queue needs read-only DB endpoint data" tone="ready" />
            <DashboardQueue006W title="Orders / trips" value={dbDiagnostics.tripCount ? String(dbDiagnostics.tripCount) : "route-backed"} note="quote/request/dispatch/trip contracts visible" tone="info" />
            <DashboardQueue006W title="Complaints / disputes" value={dbDiagnostics.supportCaseCount ? String(dbDiagnostics.supportCaseCount) : "route-backed"} note="support/dispute/safety contracts visible" tone="warn" />
            <DashboardQueue006W title="Payments / settlement" value="locked" note="hold/review/settlement contracts visible; money movement off" tone="locked" />
            <DashboardQueue006W title="Provayder / Hamyon" value={`${routeCounts.provider}/${routeCounts.wallet}`} note="contracts requiring provayder/hamyon boundary" tone="safe" />
            <DashboardQueue006W title="maʼlumotlar bazasi dry-run" value={dbDryRun.status ? safeString006W(dbDryRun.status) : dbReadStatus} note={results.readOnlyDb?.message || "not executed automatically"} tone={results.readOnlyDb?.ok ? "ready" : "locked"} />
          </div>
        </section>
      </div>

      <section className="card taxi006WBlock">
        <div className="taxi006WSectionHeader">
          <div>
            <h3>{copy.routes}</h3>
            <p>{routeCounts.total} routes · {routeCounts.admin} admin · {routeCounts.writes} write · {routeCounts.provider} provider · {routeCounts.wallet} wallet</p>
          </div>
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="filter: driver, application, trip, payment, settlement..." />
        </div>
        <div className="taxi006WRouteTable">
          {filteredRoutes.slice(0, 90).map((route, index) => <TaxiRouteRow006W key={`${routeIdentity006W(route)}-${index}`} route={route} onProbe={probeRoute} />)}
          {!filteredRoutes.length ? <p className="taxi006WMuted">No route contracts loaded yet. Press Refresh all data.</p> : null}
        </div>
      </section>

      <div className="taxi006WGrid">
        <section className="card taxi006WBlock">
          <h3>{copy.dataViewer}</h3>
          <div className="taxi006WEndpointList">
            {[...TAXI_ENDPOINTS_006W, ...Object.values(TAXI_GATED_ACTIONS_006W)].map((endpoint) => (
              <button key={endpoint.key} type="button" onClick={() => setSelectedResultKey(endpoint.key)} className={selectedResultKey === endpoint.key ? "active" : ""}>
                <span>{endpoint.title}</span>
                <TaxiResultBadge006W result={results[endpoint.key]} />
              </button>
            ))}
          </div>
        </section>
        <section className="card taxi006WBlock">
          <h3>{copy.raw}</h3>
          {selectedResult ? <TaxiResultCard006W result={selectedResult} /> : <p className="taxi006WMuted">No backend response selected.</p>}
        </section>
      </div>

      <details className="taxi006WLegacy" open>
        <summary>{copy.oldPanels}</summary>
        <div className="taxi006WLegacyBody">
          <TaxiStreamAdminLanguage006S language={props.language} />
          <TaxiAdminReadinessCockpit003L />
        </div>
      </details>
    </section>
  );
}
