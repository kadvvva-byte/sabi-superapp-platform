import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl006XPanel } from "./TaxiAdminControl006X";

type Tone006Y = "ready" | "safe" | "warn" | "locked" | "danger" | "info";
type Method006Y = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type AnyRecord006Y = Record<string, unknown>;

type SourceResult006Y = {
  key: string;
  title: string;
  path: string;
  method: Method006Y;
  status: number;
  ok: boolean;
  tone: Tone006Y;
  message: string;
  payload: unknown;
  body?: unknown;
  at: string;
  durationMs: number;
};

type RouteContract006Y = {
  key?: string;
  operationKey?: string;
  method?: string;
  path?: string;
  area?: string;
  requiresAdmin?: boolean;
  requiresIdempotencyForWrite?: boolean;
  requiresProviderReadiness?: boolean;
  requiresWalletBoundary?: boolean;
  safeDisabledUntilNextStage?: boolean;
};

type SourceEndpoint006Y = {
  key: string;
  title: string;
  path: string;
  method: Method006Y;
  description: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type WorkQueue006Y = {
  key: string;
  title: string;
  description: string;
  tone: Tone006Y;
  records: AnyRecord006Y[];
  countFromBackend?: string | number;
  idKeys: string[];
  statusKeys: string[];
  primaryActions: string[];
  columns: string[];
};

type ActionField006Y = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fromRecordKeys?: string[];
};

type AdminAction006Y = {
  key: string;
  title: string;
  shortTitle: string;
  queueKey: string;
  operationKey: string;
  tone: Tone006Y;
  requiresReason?: boolean;
  idKeys: string[];
  fields: ActionField006Y[];
  body: AnyRecord006Y;
};

const COPY006Y: Record<AdminLanguage, { title: string; subtitle: string; noFake: string; refresh: string; loadData: string; queues: string; selected: string; execute: string; reports: string; sources: string; technical: string; empty: string; routeMissing: string; reason: string; lastResponse: string; }> = {
  ru: {
    title: "Такси — управление, данные и отчёты",
    subtitle: "Один рабочий экран для такси: заявки, водители, машины, заказы, поездки, жалобы, тарифы, комиссии, платёжные границы и отчёты. Интерфейс не утверждает локально — только реальный ответ сервера.",
    noFake: "Без фейка: если сервер ещё безопасно отключён или запись в базу закрыта, кнопка покажет точный отказ и причину блокировки. Никакого «утверждено» без сервера.",
    refresh: "Обновить всё",
    loadData: "Загрузить реальные данные",
    queues: "Рабочие очереди такси",
    selected: "Выбранная запись и действие",
    execute: "Выполнить реальное серверное действие",
    reports: "Отчёты и шкалы",
    sources: "Источники сервера",
    technical: "Техническая сверка основы",
    empty: "Сервер не вернул живые строки для этой очереди. Нажми «Загрузить реальные данные»; если вернётся блокировка — сначала нужен серверный этап для чтения и записи.",
    routeMissing: "Для действия нет открытого серверного маршрута в списке маршрутов такси",
    reason: "Причина администратора / комментарий",
    lastResponse: "Последний ответ сервера",
  },
  en: {
    title: "Taxi — operations, data and reports",
    subtitle: "One working Taxi screen for applications, drivers, vehicles, orders, trips, complaints, tariffs, commissions, payment boundaries and reports. UI never approves locally; only backend response counts.",
    noFake: "No fake: if backend is safe-disabled or DB write is locked, the button shows the exact 409/403/locked reason. No approved state without backend.",
    refresh: "Refresh all",
    loadData: "Load real data",
    queues: "Taxi work queues",
    selected: "Selected record and action",
    execute: "Run real backend action",
    reports: "Reports and growth scales",
    sources: "Backend sources",
    technical: "Foundation technical audit",
    empty: "Backend did not return live rows for this queue. Click “Load real data”; if it returns locked, a backend read/write runtime stage is required first.",
    routeMissing: "No route contract is exposed for this action in /api/taxi/002n/routes",
    reason: "Admin reason / note",
    lastResponse: "Latest backend response",
  },
  uz: {
    title: "Taksi — boshqaruv, maʼlumot va hisobotlar",
    subtitle: "Taksi uchun bitta ishchi ekran: arizalar, haydovchilar, avtomobillar, buyurtmalar, safarlar, shikoyatlar, tariflar, komissiya, to‘lov chegarasi va hisobotlar.",
    noFake: "Soxta natija yo‘q: server xavfsiz o‘chirilgan yoki maʼlumotlar bazasiga yozish yopiq bo‘lsa, interfeys aniq 409/403/bloklangan sababini ko‘rsatadi.",
    refresh: "Hammasini yangilash",
    loadData: "Real maʼlumot yuklash",
    queues: "Taxi ish navbatlari",
    selected: "Tanlangan yozuv va amal",
    execute: "Real backend action bajarish",
    reports: "Hisobotlar va o‘sish shkalalari",
    sources: "Backend manbalari",
    technical: "Foundation texnik tekshiruv",
    empty: "Server bu navbat uchun real qator qaytarmadi. Real maʼlumot yuklash tugmasini bosing; bloklangan bo‘lsa, server o‘qish / yozish bosqichi kerak.",
    routeMissing: "Bu amal uchun /api/taxi/002n/routes ichida route contract yo‘q",
    reason: "Admin sababi / izoh",
    lastResponse: "Oxirgi backend javobi",
  },
  zh: {
    title: "出租车管理、数据和报告",
    subtitle: "出租车单一工作屏：申请、司机、车辆、订单、行程、投诉、费率、佣金、支付边界和报告。界面不本地批准，只认服务器响应。",
    noFake: "没有虚假结果：如果服务器安全关闭或数据库写入锁定，界面会显示准确拒绝状态和锁定原因。",
    refresh: "刷新全部",
    loadData: "加载真实数据",
    queues: "出租车工作队列",
    selected: "所选记录和操作",
    execute: "执行真实服务器操作",
    reports: "报告和增长刻度",
    sources: "服务器来源",
    technical: "基础层技术核对",
    empty: "服务器未返回此队列的实时行。点击加载真实数据；若已锁定，则需要服务器读写运行阶段。",
    routeMissing: "此操作未在出租车路线列表中开放服务器路线",
    reason: "管理员原因 / 备注",
    lastResponse: "最新服务器响应",
  },
};

const SOURCES006Y: SourceEndpoint006Y[] = [
  { key: "readiness", title: "Readiness", path: "/api/taxi/002n/readiness", method: "GET", description: "Taxi foundation readiness" },
  { key: "routes", title: "Route contracts", path: "/api/taxi/002n/routes", method: "GET", description: "Actions exposed by Taxi foundation" },
  { key: "diagnostics", title: "Admin diagnostics", path: "/api/admin/taxi/002n/diagnostics", method: "GET", description: "Protected admin diagnostic snapshot" },
  { key: "dbReadPlan", title: "Read-only plan", path: "/api/taxi/002t/read-only-db-dry-run/plan", method: "GET", description: "Plan for read-only Taxi data" },
  { key: "dbRead", title: "Live read-only data", path: "/api/taxi/002t/read-only-db-dry-run", method: "GET", description: "Real read-only DB dry-run data if backend allows it", headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } },
  { key: "dbWritePlan", title: "Write gate plan", path: "/api/taxi/002x/db-write-runtime/plan", method: "GET", description: "DB write runtime gate plan" },
  { key: "dbWriteGate", title: "Write gate check", path: "/api/taxi/002x/db-write-runtime/write-gate", method: "POST", description: "Real write gate check; no mutation by UI", headers: { "x-sabi-taxi-db-write-gate": "approve-002x-route-patch-only-no-write" }, body: { source: "admin-ui-006y", requestedAction: "write_gate_check", fakeSuccessBlocked: true } },
  { key: "providerBoundary", title: "Provider / Wallet boundary", path: "/api/taxi/003d/provider-wallet-boundary/check", method: "POST", description: "Provider, Wallet, payment and payout boundary", headers: { "x-sabi-taxi-provider-wallet-boundary": "approve-003d-route-patch-only-no-execution" }, body: { source: "admin-ui-006y", requestedAction: "boundary_check", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", path: "/api/taxi/003h/admin-readiness-cockpit/check", method: "POST", description: "Taxi Admin cockpit boundary", headers: { "x-sabi-taxi-admin-cockpit-boundary": "approve-003h-route-patch-only-no-execution" }, body: { source: "admin-ui-006y", requestedAction: "cockpit_check", fakeSuccessBlocked: true } },
];

const ACTIONS006Y: AdminAction006Y[] = [
  { key: "application-review", title: "Review driver application", shortTitle: "Review", queueKey: "applications", operationKey: "admin.driver.application.review_guarded", tone: "ready", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "decision", label: "Decision", type: "select", required: true, options: ["approved", "rejected", "needs_documents", "in_review"] }, { key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }], body: { action: "review_driver_application" } },
  { key: "application-documents", title: "Require documents", shortTitle: "Docs", queueKey: "applications", operationKey: "admin.driver.application.require_documents_guarded", tone: "warn", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }, { key: "requiredDocuments", label: "Required documents", required: true, placeholder: "license, vehicle_photo, insurance" }], body: { action: "require_driver_documents" } },
  { key: "application-reopen", title: "Reopen application", shortTitle: "Reopen", queueKey: "applications", operationKey: "admin.driver.application.reopen_guarded", tone: "info", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }], body: { action: "reopen_driver_application" } },
  { key: "driver-approve", title: "Approve driver profile", shortTitle: "Approve", queueKey: "drivers", operationKey: "admin.driver.profile.approve_guarded", tone: "ready", requiresReason: true, idKeys: ["driverId", "id"], fields: [{ key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "id"] }], body: { action: "approve_driver_profile" } },
  { key: "driver-suspend", title: "Suspend driver", shortTitle: "Suspend", queueKey: "drivers", operationKey: "admin.driver.suspend_guarded", tone: "danger", requiresReason: true, idKeys: ["driverId", "id"], fields: [{ key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "id"] }, { key: "suspensionType", label: "Suspension type", type: "select", required: true, options: ["temporary", "hard_block", "safety_review"] }], body: { action: "suspend_driver" } },
  { key: "vehicle-review", title: "Review vehicle", shortTitle: "Review", queueKey: "vehicles", operationKey: "admin.vehicle.review_guarded", tone: "ready", requiresReason: true, idKeys: ["vehicleId", "id"], fields: [{ key: "vehicleId", label: "Vehicle ID", required: true, fromRecordKeys: ["vehicleId", "id"] }, { key: "decision", label: "Decision", type: "select", required: true, options: ["approved", "rejected", "needs_documents"] }], body: { action: "review_vehicle" } },
  { key: "vehicle-assign", title: "Assign vehicle", shortTitle: "Assign", queueKey: "vehicles", operationKey: "admin.vehicle.assignment.create_guarded", tone: "ready", requiresReason: true, idKeys: ["vehicleId", "id"], fields: [{ key: "vehicleId", label: "Vehicle ID", required: true, fromRecordKeys: ["vehicleId", "id"] }, { key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "ownerDriverId"] }], body: { action: "assign_vehicle" } },
  { key: "request-cancel", title: "Cancel rider request", shortTitle: "Cancel", queueKey: "requests", operationKey: "rider.request.cancel_guarded", tone: "warn", requiresReason: true, idKeys: ["requestId", "id"], fields: [{ key: "requestId", label: "Request ID", required: true, fromRecordKeys: ["requestId", "id"] }], body: { action: "cancel_request" } },
  { key: "offer-create", title: "Create dispatch offer", shortTitle: "Offer", queueKey: "requests", operationKey: "dispatch.offer.create_guarded", tone: "ready", requiresReason: true, idKeys: ["requestId", "id"], fields: [{ key: "requestId", label: "Request ID", required: true, fromRecordKeys: ["requestId", "id"] }, { key: "driverId", label: "Driver ID", required: true, placeholder: "driver to receive offer" }], body: { action: "create_dispatch_offer" } },
  { key: "trip-start", title: "Start trip", shortTitle: "Start", queueKey: "trips", operationKey: "trip.start_guarded", tone: "ready", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "start_trip" } },
  { key: "trip-complete", title: "Complete trip", shortTitle: "Complete", queueKey: "trips", operationKey: "trip.complete_guarded", tone: "ready", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "complete_trip" } },
  { key: "trip-cancel", title: "Cancel trip", shortTitle: "Cancel", queueKey: "trips", operationKey: "trip.cancel_guarded", tone: "danger", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "cancel_trip" } },
  { key: "trip-safety", title: "Safety flag", shortTitle: "Safety", queueKey: "trips", operationKey: "trip.safety.flag_guarded", tone: "danger", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }, { key: "severity", label: "Severity", type: "select", required: true, options: ["low", "medium", "high", "critical"] }], body: { action: "flag_trip_safety" } },
  { key: "support-assign", title: "Assign support case", shortTitle: "Assign", queueKey: "support", operationKey: "support.case.assign_guarded", tone: "ready", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "assigneeId", label: "Assignee ID", required: true }], body: { action: "assign_support_case" } },
  { key: "support-escalate", title: "Escalate support case", shortTitle: "Escalate", queueKey: "support", operationKey: "support.case.escalate_guarded", tone: "danger", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "escalationLevel", label: "Escalation", type: "select", required: true, options: ["risk", "legal", "owner"] }], body: { action: "escalate_support_case" } },
  { key: "support-resolve", title: "Resolve support case", shortTitle: "Resolve", queueKey: "support", operationKey: "support.case.resolve_guarded", tone: "ready", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "resolution", label: "Resolution", type: "select", required: true, options: ["resolved", "rejected", "compensated", "false_complaint"] }], body: { action: "resolve_support_case" } },
  { key: "evidence-review", title: "Review evidence", shortTitle: "Evidence", queueKey: "support", operationKey: "dispute.evidence.review_guarded", tone: "warn", requiresReason: true, idKeys: ["evidenceId", "id"], fields: [{ key: "evidenceId", label: "Evidence ID", required: true, fromRecordKeys: ["evidenceId", "id"] }, { key: "decision", label: "Decision", type: "select", required: true, options: ["accepted", "rejected", "needs_more"] }], body: { action: "review_dispute_evidence" } },
  { key: "tariff-upsert", title: "Create / update tariff region", shortTitle: "Upsert", queueKey: "tariffs", operationKey: "admin.tariff.region.upsert_guarded", tone: "ready", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }, { key: "baseFare", label: "Base fare", type: "number" }, { key: "commissionPercent", label: "Commission %", type: "number" }], body: { action: "upsert_tariff_region" } },
  { key: "tariff-activate", title: "Activate tariff region", shortTitle: "Activate", queueKey: "tariffs", operationKey: "admin.tariff.region.activate_guarded", tone: "ready", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }], body: { action: "activate_tariff_region" } },
  { key: "tariff-suspend", title: "Suspend tariff region", shortTitle: "Suspend", queueKey: "tariffs", operationKey: "admin.tariff.region.suspend_guarded", tone: "danger", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }], body: { action: "suspend_tariff_region" } },
  { key: "payment-capture", title: "Capture hold reference", shortTitle: "Capture", queueKey: "settlements", operationKey: "payment.hold.capture_reference_guarded", tone: "locked", requiresReason: true, idKeys: ["paymentHoldId", "holdId", "id"], fields: [{ key: "paymentHoldId", label: "Payment hold ID", required: true, fromRecordKeys: ["paymentHoldId", "holdId", "id"] }], body: { action: "capture_payment_hold_reference", moneyMovementApprovedNow: false } },
  { key: "payment-release", title: "Release hold reference", shortTitle: "Release", queueKey: "settlements", operationKey: "payment.hold.release_reference_guarded", tone: "locked", requiresReason: true, idKeys: ["paymentHoldId", "holdId", "id"], fields: [{ key: "paymentHoldId", label: "Payment hold ID", required: true, fromRecordKeys: ["paymentHoldId", "holdId", "id"] }], body: { action: "release_payment_hold_reference", moneyMovementApprovedNow: false } },
  { key: "settlement-available", title: "Mark settlement available", shortTitle: "Available", queueKey: "settlements", operationKey: "settlement.mark.available_guarded", tone: "locked", requiresReason: true, idKeys: ["settlementId", "id"], fields: [{ key: "settlementId", label: "Settlement ID", required: true, fromRecordKeys: ["settlementId", "id"] }], body: { action: "mark_settlement_available", payoutApprovedNow: false } },
];

function baseUrl006Y(config: AdminApiConfig): string {
  const raw = (config.baseUrl || "http://127.0.0.1:3000").trim() || "http://127.0.0.1:3000";
  try {
    const url = new URL(raw);
    if (["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(url.hostname) && ["4000", "4001", "5173", "4173"].includes(url.port)) {
      url.hostname = url.hostname === "0.0.0.0" ? "127.0.0.1" : url.hostname;
      url.port = "3000";
    }
    url.pathname = url.pathname === "/" ? "" : url.pathname;
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return raw.replace(/:(4000|4001|5173|4173)/, ":3000").replace(/\/$/, "");
  }
}

function record006Y(value: unknown): AnyRecord006Y { return typeof value === "object" && value !== null && !Array.isArray(value) ? value as AnyRecord006Y : {}; }
function arr006Y(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function str006Y(value: unknown, fallback = "—"): string { if (value === null || value === undefined || value === "") return fallback; if (typeof value === "object") return fallback; return String(value); }
function bool006Y(value: unknown): boolean { return value === true || value === "true" || value === "YES" || value === "yes"; }
function pretty006Y(value: unknown): string { try { return JSON.stringify(value, null, 2); } catch { return String(value); } }
function nested006Y(value: unknown, path: string[]): unknown { let current = value; for (const key of path) { if (typeof current !== "object" || current === null) return undefined; current = (current as AnyRecord006Y)[key]; } return current; }
function firstValue006Y(record: AnyRecord006Y, keys: string[]): unknown { for (const key of keys) { if (record[key] !== undefined && record[key] !== null && record[key] !== "") return record[key]; } return undefined; }
function id006Y(record: AnyRecord006Y, keys: string[]): string { return str006Y(firstValue006Y(record, keys), ""); }
function status006Y(record: AnyRecord006Y, keys: string[]): string { return str006Y(firstValue006Y(record, keys), "unknown"); }
function toneStatus006Y(status: number): Tone006Y { if (status >= 200 && status < 300) return "ready"; if (status === 409) return "locked"; if (status === 401 || status === 403) return "warn"; if (status === 0 || status >= 500) return "danger"; return "info"; }
function payloadMessage006Y(status: number, payload: unknown): string { const body = record006Y(payload); return str006Y(body.message, "") || str006Y(body.code, "") || str006Y(body.error, "") || (status >= 200 && status < 300 ? "backend data returned" : status === 0 ? "network / timeout" : `HTTP ${status}`); }
function asRows006Y(value: unknown): AnyRecord006Y[] { return arr006Y(value).map((item, index) => ({ __rowIndex: index + 1, ...(record006Y(item)) })).filter(Boolean); }

function extractRows006Y(payload: unknown, names: string[]): AnyRecord006Y[] {
  const paths: string[][] = [];
  for (const name of names) {
    paths.push([name], ["data", name], ["snapshot", name], ["queues", name], ["records", name], ["items", name], ["readOnly", name], ["result", name], ["payload", name]);
  }
  for (const path of paths) {
    const rows = asRows006Y(nested006Y(payload, path));
    if (rows.length) return rows;
  }
  return [];
}

function extractCount006Y(payload: unknown, names: string[], rows: AnyRecord006Y[]): string | number {
  if (rows.length) return rows.length;
  const paths: string[][] = [];
  for (const name of names) paths.push(["counts", name], ["summary", name], ["totals", name], ["data", "counts", name], ["snapshot", "counts", name]);
  for (const path of paths) {
    const found = nested006Y(payload, path);
    if (typeof found === "number" || typeof found === "string") return found;
  }
  return 0;
}

function sourceHeaders006Y(config: AdminApiConfig, endpoint: SourceEndpoint006Y): Record<string, string> {
  const token = (config.token || "").trim();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-sabi-admin-token": token,
    "x-admin-token": token,
    "x-admin-panel-token": token,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(endpoint.method !== "GET" ? { "Idempotency-Key": `admin-ui-006y-${endpoint.key}-${Date.now()}` } : {}),
    ...(endpoint.headers || {}),
  };
}

async function call006Y(config: AdminApiConfig, endpoint: SourceEndpoint006Y): Promise<SourceResult006Y> {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18000);
  let status = 0;
  let payload: unknown = null;
  try {
    const response = await fetch(`${baseUrl006Y(config)}${endpoint.path}`, {
      method: endpoint.method,
      headers: sourceHeaders006Y(config, endpoint),
      signal: controller.signal,
      body: endpoint.method === "GET" ? undefined : JSON.stringify(endpoint.body || { source: "admin-ui-006y", fakeSuccessBlocked: true }),
    });
    status = response.status;
    const text = await response.text();
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  } catch (error) {
    payload = { ok: false, error: error instanceof DOMException && error.name === "AbortError" ? "timeout_18000ms" : error instanceof Error ? error.message : String(error), path: endpoint.path };
  } finally {
    window.clearTimeout(timeout);
  }
  return { key: endpoint.key, title: endpoint.title, path: endpoint.path, method: endpoint.method, status, ok: status >= 200 && status < 300, tone: toneStatus006Y(status), message: payloadMessage006Y(status, payload), payload, body: endpoint.body, at: new Date().toISOString(), durationMs: Date.now() - started };
}

function routesFrom006Y(result?: SourceResult006Y): RouteContract006Y[] {
  const payload = record006Y(result?.payload);
  const direct = arr006Y(payload.routes) as RouteContract006Y[];
  if (direct.length) return direct;
  return arr006Y(nested006Y(payload, ["runtime", "routeContracts"])) as RouteContract006Y[];
}

function routeMap006Y(routes: RouteContract006Y[]): Map<string, RouteContract006Y> {
  const map = new Map<string, RouteContract006Y>();
  routes.forEach((route) => { if (route.operationKey) map.set(route.operationKey, route); });
  return map;
}

function Badge006Y({ tone, children }: { tone?: Tone006Y; children: React.ReactNode }) { return <em className={`taxi006YBadge taxi006Y-${tone || "info"}`}>{children}</em>; }
function Bar006Y({ value, tone }: { value: number; tone?: Tone006Y }) { return <i className={`taxi006YBar taxi006Y-${tone || "info"}`}><b style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></i>; }

function SourceResultPanel006Y({ result }: { result?: SourceResult006Y }) {
  if (!result) return <p className="taxi006YEmpty">No backend call selected.</p>;
  return <article className={`taxi006YResponse taxi006Y-${result.tone}`} data-admin-ui-006y-backend-response="true">
    <header><div><strong>{result.title}</strong><small>{result.method} {result.path}</small></div><Badge006Y tone={result.tone}>{result.status || "offline"}</Badge006Y></header>
    <p>{result.message}</p>
    <small>{result.durationMs}ms · {result.at}</small>
    <details open><summary>Backend payload</summary><pre>{pretty006Y(result.payload)}</pre></details>
  </article>;
}

function makeQueues006Y(dbPayload: unknown): WorkQueue006Y[] {
  const specs = [
    { key: "applications", title: "Driver applications", tone: "ready" as Tone006Y, names: ["driverApplications", "applications", "driverApplicationQueue", "pendingDriverApplications"], description: "Подать / проверить / одобрить / отклонить / запросить документы", idKeys: ["applicationId", "id"], statusKeys: ["status", "reviewStatus", "adminStatus"], actions: ["application-review", "application-documents", "application-reopen"], columns: ["applicationId", "driverName", "phone", "status", "region", "createdAt"] },
    { key: "drivers", title: "Drivers", tone: "safe" as Tone006Y, names: ["drivers", "driverProfiles", "taxiDrivers", "driverQueue"], description: "Approve, suspend, dispatch access, safety review", idKeys: ["driverId", "id"], statusKeys: ["status", "driverStatus", "adminStatus", "safetyStatus"], actions: ["driver-approve", "driver-suspend"], columns: ["driverId", "name", "phone", "status", "rating", "region"] },
    { key: "vehicles", title: "Vehicles", tone: "info" as Tone006Y, names: ["vehicles", "taxiVehicles", "vehicleQueue"], description: "Review vehicle documents and driver assignment", idKeys: ["vehicleId", "id"], statusKeys: ["status", "reviewStatus", "assignmentStatus"], actions: ["vehicle-review", "vehicle-assign"], columns: ["vehicleId", "plate", "model", "status", "driverId", "region"] },
    { key: "requests", title: "Orders / requests", tone: "warn" as Tone006Y, names: ["requests", "riderRequests", "orders", "taxiRequests", "dispatchRequests"], description: "Quote, cancel, create offer, assign driver", idKeys: ["requestId", "id"], statusKeys: ["status", "requestStatus", "dispatchStatus"], actions: ["request-cancel", "offer-create"], columns: ["requestId", "riderId", "pickup", "dropoff", "status", "price"] },
    { key: "trips", title: "Trips", tone: "ready" as Tone006Y, names: ["trips", "taxiTrips", "activeTrips", "tripQueue"], description: "Start, complete, cancel, safety flag", idKeys: ["tripId", "id"], statusKeys: ["status", "tripStatus", "safetyStatus"], actions: ["trip-start", "trip-complete", "trip-cancel", "trip-safety"], columns: ["tripId", "driverId", "riderId", "status", "fare", "safetyStatus"] },
    { key: "support", title: "Complaints / disputes", tone: "danger" as Tone006Y, names: ["supportCases", "complaints", "disputes", "safetyCases", "cases"], description: "Assign, escalate, resolve, evidence review", idKeys: ["supportCaseId", "caseId", "id"], statusKeys: ["status", "caseStatus", "riskStatus", "severity"], actions: ["support-assign", "support-escalate", "support-resolve", "evidence-review"], columns: ["supportCaseId", "caseId", "tripId", "severity", "status", "createdAt"] },
    { key: "tariffs", title: "Tariffs / regions", tone: "safe" as Tone006Y, names: ["tariffs", "regions", "tariffRegions", "commissionRules"], description: "Tariff, region and commission management", idKeys: ["regionCode", "code", "id"], statusKeys: ["status", "tariffStatus"], actions: ["tariff-upsert", "tariff-activate", "tariff-suspend"], columns: ["regionCode", "name", "status", "baseFare", "commissionPercent", "currency"] },
    { key: "settlements", title: "Payments / settlements", tone: "locked" as Tone006Y, names: ["settlements", "paymentHolds", "holds", "payouts", "paymentQueue"], description: "Hold/capture/release references and payout boundary", idKeys: ["settlementId", "paymentHoldId", "holdId", "id"], statusKeys: ["status", "settlementStatus", "paymentStatus"], actions: ["payment-capture", "payment-release", "settlement-available"], columns: ["settlementId", "paymentHoldId", "driverId", "amount", "status", "currency"] },
  ];
  return specs.map((spec) => {
    const records = extractRows006Y(dbPayload, spec.names);
    return { key: spec.key, title: spec.title, description: spec.description, tone: spec.tone, records, countFromBackend: extractCount006Y(dbPayload, spec.names, records), idKeys: spec.idKeys, statusKeys: spec.statusKeys, primaryActions: spec.actions, columns: spec.columns };
  });
}

function RecordTable006Y(props: { queue: WorkQueue006Y; selectedId: string; onSelect: (record: AnyRecord006Y) => void; onAction: (actionKey: string, record: AnyRecord006Y) => void }) {
  const { queue } = props;
  if (!queue.records.length) return <div className="taxi006YQueueEmpty" data-admin-ui-006y-real-empty-state="true">Backend returned 0 live rows for <b>{queue.title}</b>.</div>;
  return <div className="taxi006YTable" data-admin-ui-006y-real-data-table="true">
    <div className="taxi006YTableHead">{queue.columns.map((col) => <span key={col}>{col}</span>)}<span>Actions</span></div>
    {queue.records.map((row, index) => {
      const rowId = id006Y(row, queue.idKeys) || String(row.__rowIndex || index + 1);
      const active = props.selectedId === `${queue.key}:${rowId}`;
      return <button type="button" key={`${queue.key}-${rowId}-${index}`} className={`taxi006YTableRow ${active ? "active" : ""}`} onClick={() => props.onSelect(row)}>
        {queue.columns.map((col) => <span key={col}>{str006Y(row[col], col === queue.columns[0] ? rowId : "—")}</span>)}
        <span className="taxi006YInlineActions">{queue.primaryActions.slice(0, 3).map((key) => { const action = ACTIONS006Y.find((item) => item.key === key); return <i key={key} onClick={(event) => { event.stopPropagation(); props.onAction(key, row); }}>{action?.shortTitle || key}</i>; })}</span>
      </button>;
    })}
  </div>;
}

export function TaxiAdminControl006YPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice?: (message: string) => void }) {
  const copy = COPY006Y[props.language] || COPY006Y.ru;
  const [results, setResults] = useState<Record<string, SourceResult006Y>>({});
  const [busy, setBusy] = useState("");
  const [activeQueue, setActiveQueue] = useState("applications");
  const [selectedRecord, setSelectedRecord] = useState<AnyRecord006Y | null>(null);
  const [selectedActionKey, setSelectedActionKey] = useState("application-review");
  const [form, setForm] = useState<Record<string, string>>({ decision: "approved", suspensionType: "temporary", severity: "medium", escalationLevel: "risk", resolution: "resolved" });
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [resultKey, setResultKey] = useState("dbRead");
  const [callLog, setCallLog] = useState<SourceResult006Y[]>([]);
  const [showTechnical, setShowTechnical] = useState(false);

  const setResult = useCallback((result: SourceResult006Y) => {
    setResults((prev) => ({ ...prev, [result.key]: result }));
    setResultKey(result.key);
    setCallLog((prev) => [result, ...prev].slice(0, 60));
    props.setNotice?.(`${result.title}: ${result.status || "offline"} · ${result.message}`);
  }, [props]);

  const runSource = useCallback(async (endpoint: SourceEndpoint006Y) => {
    setBusy(endpoint.key);
    try { setResult(await call006Y(props.config, endpoint)); } finally { setBusy(""); }
  }, [props.config, setResult]);

  const refreshAll = useCallback(async (includeDbRead = true) => {
    setBusy("refresh-all");
    try {
      const keys = includeDbRead ? ["readiness", "routes", "diagnostics", "dbReadPlan", "dbRead", "dbWritePlan", "providerBoundary", "cockpit"] : ["readiness", "routes", "diagnostics", "dbReadPlan", "dbWritePlan"];
      const loaded = await Promise.all(SOURCES006Y.filter((endpoint) => keys.includes(endpoint.key)).map((endpoint) => call006Y(props.config, endpoint)));
      setResults((prev) => Object.fromEntries([...Object.entries(prev), ...loaded.map((item) => [item.key, item])]));
      setCallLog((prev) => [...loaded, ...prev].slice(0, 60));
      setResultKey(includeDbRead ? "dbRead" : "readiness");
      props.setNotice?.(`Taxi synced: ${loaded.map((item) => `${item.key}:${item.status || "offline"}`).join(" · ")}`);
    } finally { setBusy(""); }
  }, [props.config, props]);

  useEffect(() => { void refreshAll(false); }, [refreshAll]);

  const routes = useMemo(() => routesFrom006Y(results.routes), [results.routes]);
  const routeMap = useMemo(() => routeMap006Y(routes), [routes]);
  const dbPayload = results.dbRead?.payload;
  const queues = useMemo(() => makeQueues006Y(dbPayload), [dbPayload]);
  const queue = queues.find((item) => item.key === activeQueue) || queues[0];
  const action = ACTIONS006Y.find((item) => item.key === selectedActionKey) || ACTIONS006Y[0];
  const actionRoute = action ? routeMap.get(action.operationKey) : undefined;
  const selectedId = selectedRecord ? `${queue.key}:${id006Y(selectedRecord, queue.idKeys) || selectedRecord.__rowIndex || "selected"}` : "";

  const chooseRecord = useCallback((record: AnyRecord006Y, actionKey?: string) => {
    setSelectedRecord(record);
    const nextAction = ACTIONS006Y.find((item) => item.key === actionKey) || ACTIONS006Y.find((item) => item.queueKey === activeQueue) || ACTIONS006Y[0];
    setSelectedActionKey(nextAction.key);
    const patched: Record<string, string> = {};
    nextAction.fields.forEach((field) => {
      const fromRecord = field.fromRecordKeys ? firstValue006Y(record, field.fromRecordKeys) : undefined;
      if (fromRecord !== undefined) patched[field.key] = str006Y(fromRecord, "");
      else if (!form[field.key] && field.options?.length) patched[field.key] = field.options[0];
    });
    setForm((prev) => ({ ...prev, ...patched }));
  }, [activeQueue, form]);

  const chooseAction = useCallback((key: string, record?: AnyRecord006Y) => {
    const nextAction = ACTIONS006Y.find((item) => item.key === key);
    if (!nextAction) return;
    setSelectedActionKey(key);
    if (record) chooseRecord(record, key);
  }, [chooseRecord]);

  const missing = useMemo(() => {
    const misses = action.fields.filter((field) => field.required && !String(form[field.key] || "").trim()).map((field) => field.label);
    if (action.requiresReason && !adminReason.trim()) misses.push(copy.reason);
    return misses;
  }, [action, form, adminReason, copy.reason]);

  const runAction = useCallback(async () => {
    if (!action || !actionRoute?.path || missing.length) return;
    const endpoint: SourceEndpoint006Y = {
      key: `action-${action.key}-${Date.now()}`,
      title: action.title,
      path: actionRoute.path,
      method: (actionRoute.method || "POST") as Method006Y,
      description: action.operationKey,
      body: {
        source: "admin-ui-006y",
        operationKey: action.operationKey,
        adminReason,
        ownerApprovalId,
        selectedRecordId: selectedRecord ? id006Y(selectedRecord, action.idKeys) : undefined,
        selectedRecord,
        form,
        ...action.body,
        fakeSuccessBlocked: true,
        uiClaimedApproved: false,
        backendResponseRequired: true,
      },
    };
    setBusy(action.key);
    try {
      const result = await call006Y(props.config, endpoint);
      setResult(result);
      if (result.ok) {
        const db = SOURCES006Y.find((item) => item.key === "dbRead");
        if (db) setResult(await call006Y(props.config, db));
      }
    } finally { setBusy(""); }
  }, [action, actionRoute, adminReason, ownerApprovalId, selectedRecord, form, missing.length, props.config, setResult]);

  const totalRows = queues.reduce((sum, item) => sum + item.records.length, 0);
  const routeMatched = ACTIONS006Y.filter((item) => routeMap.has(item.operationKey)).length;
  const readinessPercent = results.readiness?.ok ? 100 : results.readiness ? 30 : 0;
  const dataPercent = totalRows ? 100 : results.dbRead?.ok ? 45 : 0;
  const writePercent = results.dbWriteGate?.ok ? 100 : 0;
  const boundaryOk = bool006Y(record006Y(results.providerBoundary?.payload).ok) || results.providerBoundary?.ok;

  return <section className="panel taxi006Y" data-admin-ui-006y-taxi-real-operations="true" data-admin-ui-006v-route-screen="taxi">
    <div className="taxi006YHero">
      <div>
        <span>ADMIN-UI 006Y · Taxi first · real operations screen</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <aside>
        <Badge006Y tone="ready">real data first</Badge006Y>
        <Badge006Y tone="safe">row actions</Badge006Y>
        <Badge006Y tone="locked">no local approve</Badge006Y>
      </aside>
    </div>

    <div className="taxi006YNoFake">{copy.noFake}</div>

    <div className="taxi006YToolbar">
      <button type="button" onClick={() => void refreshAll(true)} disabled={Boolean(busy)}>{busy === "refresh-all" ? "Syncing..." : copy.refresh}</button>
      <button type="button" onClick={() => void runSource(SOURCES006Y.find((item) => item.key === "dbRead")!)} disabled={Boolean(busy)}>{copy.loadData}</button>
      {SOURCES006Y.filter((item) => item.key !== "dbRead").map((endpoint) => <button key={endpoint.key} type="button" onClick={() => void runSource(endpoint)} disabled={Boolean(busy)}>{endpoint.title}</button>)}
    </div>

    <div className="taxi006YScoreGrid" data-admin-ui-006y-growth-scales="true">
      <article><span>Foundation</span><strong>{results.readiness?.status || "—"}</strong><small>{results.readiness?.message || "load readiness"}</small><Bar006Y value={readinessPercent} tone={results.readiness?.tone || "info"} /></article>
      <article><span>Live rows</span><strong>{totalRows}</strong><small>from read-only backend data</small><Bar006Y value={dataPercent} tone={totalRows ? "ready" : "warn"} /></article>
      <article><span>Action routes</span><strong>{routeMatched}/{ACTIONS006Y.length}</strong><small>matched against /api/taxi/002n/routes</small><Bar006Y value={Math.round((routeMatched / ACTIONS006Y.length) * 100)} tone={routeMatched ? "ready" : "warn"} /></article>
      <article><span>Approve / write</span><strong>{results.dbWriteGate?.status || "locked"}</strong><small>{results.dbWriteGate?.message || "backend gate controls real mutation"}</small><Bar006Y value={writePercent} tone={results.dbWriteGate?.tone || "locked"} /></article>
      <article><span>Provider boundary</span><strong>{boundaryOk ? "checked" : results.providerBoundary?.status || "—"}</strong><small>{results.providerBoundary?.message || "provider / Wallet never enabled here"}</small><Bar006Y value={boundaryOk ? 100 : 35} tone={results.providerBoundary?.tone || "info"} /></article>
    </div>

    <section className="card taxi006YQueues" data-admin-ui-006y-management-queues="true">
      <header className="taxi006YSectionHeader"><div><h3>{copy.queues}</h3><p>Выбираешь очередь → видишь реальные строки сервера → нажимаешь действие в строке → справа подтверждаешь причину и отправляешь серверное действие.</p></div><Badge006Y tone={results.dbRead?.ok ? "ready" : "locked"}>{results.dbRead?.status || "data not loaded"}</Badge006Y></header>
      <div className="taxi006YQueueTabs">
        {queues.map((item) => <button type="button" key={item.key} className={activeQueue === item.key ? "active" : ""} onClick={() => { setActiveQueue(item.key); setSelectedRecord(null); const firstAction = ACTIONS006Y.find((actionItem) => actionItem.queueKey === item.key); if (firstAction) setSelectedActionKey(firstAction.key); }}><strong>{item.title}</strong><span>{item.countFromBackend}</span><small>{item.description}</small></button>)}
      </div>
      <RecordTable006Y queue={queue} selectedId={selectedId} onSelect={(record) => chooseRecord(record)} onAction={(actionKey, record) => chooseAction(actionKey, record)} />
      {!queue.records.length ? <p className="taxi006YEmpty">{copy.empty}</p> : null}
    </section>

    <div className="taxi006YMainGrid">
      <section className="card taxi006YExecutor" data-admin-ui-006y-approval-workbench="true">
        <header className="taxi006YSectionHeader"><div><h3>{copy.selected}</h3><p>{selectedRecord ? `Selected ${queue.title}: ${id006Y(selectedRecord, queue.idKeys) || "record"}` : "Select a row from a work queue, then choose an action."}</p></div><Badge006Y tone={actionRoute ? action.tone : "locked"}>{actionRoute ? `${actionRoute.method || "POST"} ${actionRoute.path || "route"}` : "route missing"}</Badge006Y></header>
        <div className="taxi006YActionTabs">
          {ACTIONS006Y.filter((item) => item.queueKey === activeQueue).map((item) => <button type="button" key={item.key} className={selectedActionKey === item.key ? "active" : ""} onClick={() => setSelectedActionKey(item.key)}>{item.shortTitle}</button>)}
        </div>
        <div className="taxi006YRecordPreview">
          <strong>{action.title}</strong>
          <small>{action.operationKey}</small>
          {selectedRecord ? <pre>{pretty006Y(selectedRecord)}</pre> : <p className="taxi006YEmpty">No selected record. You can still fill fields manually only when backend exposes the route.</p>}
        </div>
        <div className="taxi006YForm">
          {action.fields.map((field) => <label key={field.key}><span>{field.label}{field.required ? " *" : ""}</span>{field.type === "textarea" ? <textarea value={form[field.key] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))} placeholder={field.placeholder || field.key} /> : field.type === "select" ? <select value={form[field.key] || field.options?.[0] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}>{(field.options || []).map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type === "number" ? "number" : "text"} value={form[field.key] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))} placeholder={field.placeholder || field.key} />}</label>)}
          <label><span>{copy.reason} *</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="Required: why this action is needed" /></label>
          <label><span>Owner approval ID</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="optional unless backend requires exact approval" /></label>
        </div>
        {missing.length ? <div className="taxi006YWarning">Заполни: {missing.join(", ")}</div> : null}
        {!actionRoute ? <div className="taxi006YWarning">{copy.routeMissing}</div> : null}
        <button type="button" className="taxi006YRun" disabled={Boolean(busy) || !actionRoute || missing.length > 0} onClick={() => void runAction()}>{busy === action.key ? "Running..." : copy.execute}</button>
      </section>

      <section className="card taxi006YReports" data-admin-ui-006y-reports="true">
        <h3>{copy.reports}</h3>
        <div className="taxi006YGrowthBars">
          {queues.map((item) => {
            const count = Number(item.records.length || item.countFromBackend || 0);
            const max = Math.max(1, ...queues.map((q) => Number(q.records.length || q.countFromBackend || 0)));
            return <article key={item.key}><header><strong>{item.title}</strong><span>{item.countFromBackend}</span></header><Bar006Y value={Math.round((count / max) * 100)} tone={item.tone} /><small>{item.description}</small></article>;
          })}
        </div>
        <h4>{copy.lastResponse}</h4>
        <SourceResultPanel006Y result={results[resultKey] || callLog[0]} />
      </section>
    </div>

    <div className="taxi006YMainGrid">
      <section className="card taxi006YSources" data-admin-ui-006y-live-sources="true">
        <h3>{copy.sources}</h3>
        <div className="taxi006YSourceList">
          {SOURCES006Y.map((endpoint) => <button type="button" key={endpoint.key} className={resultKey === endpoint.key ? "active" : ""} onClick={() => setResultKey(endpoint.key)}><div><strong>{endpoint.title}</strong><small>{endpoint.method} {endpoint.path}</small><p>{endpoint.description}</p></div><Badge006Y tone={results[endpoint.key]?.tone}>{results[endpoint.key]?.status || "not loaded"}</Badge006Y></button>)}
        </div>
      </section>
      <section className="card taxi006YSources">
        <h3>Action log</h3>
        <div className="taxi006YLog" data-admin-ui-006y-action-log="true">
          {callLog.length ? callLog.map((item) => <article key={`${item.key}-${item.at}`}><Badge006Y tone={item.tone}>{item.status || "offline"}</Badge006Y><div><strong>{item.title}</strong><small>{item.method} {item.path}</small><p>{item.message}</p></div></article>) : <p className="taxi006YEmpty">No backend calls yet.</p>}
        </div>
      </section>
    </div>

    <details className="taxi006YTechnical" open={showTechnical} onToggle={(event) => setShowTechnical((event.currentTarget as HTMLDetailsElement).open)}>
      <summary>{copy.technical} · routes {routes.length} · old foundation preserved</summary>
      <div className="taxi006YRouteList">
        {routes.slice(0, 160).map((route, index) => <article key={`${route.operationKey || route.path || index}`}><strong>{route.operationKey || route.key || "route"}</strong><small>{route.method || "GET"} {route.path || "—"}</small><Badge006Y tone={route.safeDisabledUntilNextStage ? "locked" : "ready"}>{route.safeDisabledUntilNextStage ? "safe-disabled" : "ready"}</Badge006Y></article>)}
      </div>
      <TaxiAdminControl006XPanel language={props.language} config={props.config} setNotice={props.setNotice} />
    </details>
  </section>;
}
