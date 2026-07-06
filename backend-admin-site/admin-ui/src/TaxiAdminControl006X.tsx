
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl006WPanel } from "./TaxiAdminControl006W";

type TaxiTone006X = "ready" | "safe" | "warn" | "locked" | "danger" | "info";
type TaxiMethod006X = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type TaxiRouteContract006X = {
  key?: string;
  operationKey?: string;
  method?: TaxiMethod006X | string;
  path?: string;
  area?: string;
  requiresAdmin?: boolean;
  requiresIdempotencyForWrite?: boolean;
  requiresProviderReadiness?: boolean;
  requiresWalletBoundary?: boolean;
  safeDisabledUntilNextStage?: boolean;
};

type TaxiCallResult006X = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod006X;
  status: number;
  ok: boolean;
  tone: TaxiTone006X;
  message: string;
  payload: unknown;
  requestBody?: unknown;
  executedAt: string;
  durationMs: number;
};

type TaxiEndpoint006X = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod006X;
  admin?: boolean;
  body?: unknown;
  headers?: Record<string, string>;
  description: string;
};

type TaxiActionField006X = {
  key: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  helper?: string;
};

type TaxiAction006X = {
  key: string;
  category: string;
  title: string;
  operationKey: string;
  description: string;
  tone: TaxiTone006X;
  fields: TaxiActionField006X[];
  body: Record<string, unknown>;
};

type TaxiCopy006X = {
  title: string;
  description: string;
  noFake: string;
  refresh: string;
  run: string;
  required: string;
  routeMissing: string;
  backendLocked: string;
  liveData: string;
  actionDesk: string;
  reports: string;
  routes: string;
  result: string;
  log: string;
  oldPanel: string;
  reason: string;
  ownerApproval: string;
};

const COPY006X: Record<AdminLanguage, TaxiCopy006X> = {
  ru: {
    title: "Такси — реальный центр управления",
    description: "Здесь не должно быть декоративных кнопок. Каждая операция ищет реальный маршрут основы такси, отправляет реальный запрос и показывает настоящий ответ сервера: 200, 403, 409 или ошибку сети.",
    noFake: "Без поддельного успеха: если запись в базу, провайдер или кошелёк ещё заблокированы, интерфейс не пишет «утверждено», а показывает точную причину блокировки сервера.",
    refresh: "Обновить основу такси",
    run: "Выполнить серверный маршрут",
    required: "Заполни обязательные поля",
    routeMissing: "Серверный маршрут ещё не найден в списке маршрутов такси",
    backendLocked: "Сервер заблокирован: требуется отдельный серверный этап для реального одобрения и записи в базу",
    liveData: "Реальные источники данных",
    actionDesk: "Заявки, обращения и управление",
    reports: "Отчёты, рост и блокеры",
    routes: "Taksi routes / contracts",
    result: "Последний ответ сервера",
    log: "Журнал реальных вызовов интерфейса",
    oldPanel: "Панели основы ниже — сохранены для сверки",
    reason: "Причина / комментарий администратора",
    ownerApproval: "Номер одобрения владельца, если сервер требует подтверждение",
  },
  en: {
    title: "Taksi — real control center",
    description: "No decorative buttons. Every operation resolves a real Taxi foundation route contract, sends a real HTTP request, and displays the backend response: 200, 403, 409, or network error.",
    noFake: "No soxta muvaffaqiyat: if maʼlumotlar bazasiga yozish / provayder / Hamyon are locked, interfeys does not claim tasdiq; it shows the exact server locked reason.",
    refresh: "Refresh Taksi foundation",
    run: "Run backend route",
    required: "Fill required fields",
    routeMissing: "Route contract is not exposed by /api/taxi/002n/routes yet",
    backendLocked: "Protected stage is required before real database approval and write actions.",
    liveData: "Real data sources",
    actionDesk: "Applications, cases and controls",
    reports: "Reports, growth and blockers",
    routes: "Taksi routes / contracts",
    result: "Latest official response",
    log: "Real interfeys call log",
    oldPanel: "Foundation panels below — preserved for tekshiruv",
    reason: "Admin reason / note",
    ownerApproval: "Owner approval number if protected confirmation is required",
  },
  uz: {
    title: "Taksi — real boshqaruv markazi",
    description: "Dekorativ tugmalar yo‘q. Har bir amal real Taxi foundation route contract topadi, real HTTP so‘rov yuboradi va backend javobini ko‘rsatadi.",
    noFake: "Soxta muvaffaqiyat yo‘q: maʼlumotlar bazasiga yozish / provayder / Hamyon bloklangan bo‘lsa, interfeys tasdiqlandi demaydi, server sababini ko‘rsatadi.",
    refresh: "Taksi foundation yangilash",
    run: "Backend route bajarish",
    required: "Majburiy maydonlarni to‘ldiring",
    routeMissing: "Yo‘nalish shartnomasi hali ulanish ro‘yxatida yo‘q",
    backendLocked: "Server bloklangan: real maʼlumotlar bazasini tasdiqlash va yozish uchun alohida server bosqichi kerak.",
    liveData: "Real data sources",
    actionDesk: "Arizalar, murojaatlar va boshqaruv",
    reports: "Hisobotlar, o‘sish va blockerlar",
    routes: "Taksi routes / contracts",
    result: "Oxirgi server javobi",
    log: "Real interfeys chaqiruvlar jurnali",
    oldPanel: "Foundation panels pastda saqlandi",
    reason: "Admin sababi / izoh",
    ownerApproval: "Server talab qilsa egasi tasdig‘i raqami",
  },
  zh: {
    title: "出租车真实控制中心",
    description: "没有装饰按钮。每个操作都会解析真实出租车基础路线，发送真实请求，并显示服务器响应。",
    noFake: "没有虚假成功：如果数据库写入、服务商或钱包被锁定，界面不会显示已批准，而是显示服务器锁定原因。",
    refresh: "刷新出租车基础层",
    run: "执行服务器路线",
    required: "填写必填字段",
    routeMissing: "服务器路线尚未开放",
    backendLocked: "服务器已锁定：真实数据库审批和写入需要单独服务器阶段",
    liveData: "真实数据源",
    actionDesk: "申请、工单和控制",
    reports: "报告、增长和阻塞",
    routes: "Taksi routes / contracts",
    result: "最新服务器响应",
    log: "真实界面调用日志",
    oldPanel: "基础层面板保留在下方",
    reason: "管理员原因 / 备注",
    ownerApproval: "如服务器要求，填写所有者审批编号",
  },
};

const TAXI_FOUNDATION_ENDPOINTS_006X: TaxiEndpoint006X[] = [
  { key: "readiness", title: "Readiness", path: "/api/taxi/002n/readiness", method: "GET", description: "Live readiness snapshot, no DB/provider execution" },
  { key: "routes", title: "Routes", path: "/api/taxi/002n/routes", method: "GET", description: "Live Taxi route contracts" },
  { key: "diagnostics", title: "Admin diagnostics", path: "/api/admin/taxi/002n/diagnostics", method: "GET", admin: true, description: "Protected Taxi admin diagnostics" },
  { key: "dbReadPlan", title: "DB read plan", path: "/api/taxi/002t/read-only-db-dry-run/plan", method: "GET", description: "Read-only DB dry-run plan" },
  { key: "dbRead", title: "Read-only DB data", path: "/api/taxi/002t/read-only-db-dry-run", method: "GET", headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" }, description: "Actual read-only dry-run endpoint; never writes" },
  { key: "dbWritePlan", title: "DB write plan", path: "/api/taxi/002x/db-write-runtime/plan", method: "GET", description: "DB write gate plan" },
  { key: "dbWriteGate", title: "DB write gate", path: "/api/taxi/002x/db-write-runtime/write-gate", method: "POST", headers: { "x-sabi-taxi-db-write-gate": "approve-002x-route-patch-only-no-write" }, body: { source: "admin-ui-006x", requestedAction: "gate_check", fakeSuccessBlocked: true }, description: "Real write gate check; expected locked until backend approval" },
  { key: "providerBoundary", title: "Provider / Wallet boundary", path: "/api/taxi/003d/provider-wallet-boundary/check", method: "POST", headers: { "x-sabi-taxi-provider-wallet-boundary": "approve-003d-route-patch-only-no-execution" }, body: { source: "admin-ui-006x", requestedAction: "boundary_check", fakeSuccessBlocked: true }, description: "Provider/Wallet boundary check" },
  { key: "cockpit", title: "Admin cockpit", path: "/api/taxi/003h/admin-readiness-cockpit/check", method: "POST", headers: { "x-sabi-taxi-admin-cockpit-boundary": "approve-003h-route-patch-only-no-execution" }, body: { source: "admin-ui-006x", requestedAction: "cockpit_check", fakeSuccessBlocked: true }, description: "Admin cockpit boundary check" },
];

const ID_FIELDS_006X = {
  applicationId: { key: "applicationId", label: "Application ID", required: true, placeholder: "real TaksiDriverApplication id" },
  driverId: { key: "driverId", label: "Driver ID", required: true, placeholder: "real TaksiDriverProfile id" },
  vehicleId: { key: "vehicleId", label: "Vehicle ID", required: true, placeholder: "real TaksiVehicle id" },
  assignmentId: { key: "assignmentId", label: "Assignment ID", required: true, placeholder: "real assignment id" },
  requestId: { key: "requestId", label: "Request ID", required: true, placeholder: "real rider request id" },
  offerId: { key: "offerId", label: "Offer ID", required: true, placeholder: "real yuborish offer id" },
  tripId: { key: "tripId", label: "Trip ID", required: true, placeholder: "real TaksiTrip id" },
  regionCode: { key: "regionCode", label: "Region code", required: true, placeholder: "for example tashkent_city" },
  supportCaseId: { key: "supportCaseId", label: "Support case ID", required: true, placeholder: "real support case id" },
  evidenceId: { key: "evidenceId", label: "Evidence ID", required: true, placeholder: "real evidence id" },
  paymentHoldId: { key: "paymentHoldId", label: "Payment hold ID", required: true, placeholder: "real payment hold id" },
  settlementId: { key: "settlementId", label: "Settlement ID", required: true, placeholder: "real settlement id" },
};

const TAXI_ACTIONS_006X: TaxiAction006X[] = [
  { key: "driver-application-review", category: "Driver applications", title: "Review driver application", operationKey: "admin.driver.application.review_guarded", description: "Approve/reject/review a real driver application. Server may return 409 until maʼlumotlar bazasi runtime is approved.", tone: "ready", fields: [ID_FIELDS_006X.applicationId, { key: "decision", label: "Decision", required: true, placeholder: "approved | rejected | needs_documents" }], body: { domain: "driver_application" } },
  { key: "driver-application-require-docs", category: "Driver applications", title: "Require documents", operationKey: "admin.driver.application.require_documents_guarded", description: "Ask a driver to upload missing documents for a real application.", tone: "warn", fields: [ID_FIELDS_006X.applicationId, { key: "missingDocuments", label: "Missing documents", required: true, placeholder: "passport, license, vehicle_certificate" }], body: { decision: "require_documents" } },
  { key: "driver-application-reopen", category: "Driver applications", title: "Reopen application", operationKey: "admin.driver.application.reopen_guarded", description: "Reopen a closed/rejected application if server policy allows it.", tone: "warn", fields: [ID_FIELDS_006X.applicationId], body: { decision: "reopen" } },
  { key: "driver-suspend", category: "Drivers / vehicles", title: "Suspend driver", operationKey: "admin.driver.suspend_guarded", description: "Suspend real driver access with reason and owner tasdiq if required.", tone: "danger", fields: [ID_FIELDS_006X.driverId, { key: "suspensionLevel", label: "Suspension level", required: true, placeholder: "temporary | hard_block" }], body: { action: "suspend_driver" } },
  { key: "vehicle-review", category: "Drivers / vehicles", title: "Review vehicle", operationKey: "admin.vehicle.review_guarded", description: "Approve or reject a vehicle review.", tone: "ready", fields: [ID_FIELDS_006X.vehicleId, { key: "decision", label: "Decision", required: true, placeholder: "approved | rejected | needs_fix" }], body: { domain: "vehicle_review" } },
  { key: "assignment-create", category: "Drivers / vehicles", title: "Create vehicle assignment", operationKey: "admin.vehicle.assignment.create_guarded", description: "Assign an approved vehicle to a real driver.", tone: "ready", fields: [ID_FIELDS_006X.driverId, ID_FIELDS_006X.vehicleId], body: { action: "create_assignment" } },
  { key: "assignment-revoke", category: "Drivers / vehicles", title: "Revoke vehicle assignment", operationKey: "admin.vehicle.assignment.revoke_guarded", description: "Revoke an existing driver-vehicle assignment.", tone: "danger", fields: [ID_FIELDS_006X.assignmentId], body: { action: "revoke_assignment" } },
  { key: "tariff-upsert", category: "Tariffs / regions", title: "Create or update tariff region", operationKey: "admin.tariff.region.upsert_guarded", description: "Create/update a tariff region through backend route.", tone: "ready", fields: [ID_FIELDS_006X.regionCode, { key: "baseFare", label: "Base fare", required: true, placeholder: "numeric amount" }, { key: "perKm", label: "Per km", required: true, placeholder: "numeric amount" }], body: { action: "upsert_tariff_region" } },
  { key: "tariff-activate", category: "Tariffs / regions", title: "Activate tariff region", operationKey: "admin.tariff.region.activate_guarded", description: "Activate an existing region tariff.", tone: "ready", fields: [ID_FIELDS_006X.regionCode], body: { action: "activate_tariff_region" } },
  { key: "tariff-suspend", category: "Tariffs / regions", title: "Suspend tariff region", operationKey: "admin.tariff.region.suspend_guarded", description: "Suspend tariff region. No soxta state change in interfeys.", tone: "danger", fields: [ID_FIELDS_006X.regionCode], body: { action: "suspend_tariff_region" } },
  { key: "request-cancel", category: "Orders / dispatch / trips", title: "Cancel rider request", operationKey: "rider.request.cancel_guarded", description: "Cancel a real rider request through backend route.", tone: "warn", fields: [ID_FIELDS_006X.requestId], body: { action: "cancel_request" } },
  { key: "dispatch-offer-create", category: "Orders / yuborish / trips", title: "Create yuborish offer", operationKey: "dispatch.offer.create_guarded", description: "Create yuborish offer; provayder readiness may be required.", tone: "ready", fields: [ID_FIELDS_006X.requestId, ID_FIELDS_006X.driverId], body: { action: "create_dispatch_offer" } },
  { key: "dispatch-offer-reassign", category: "Orders / yuborish / trips", title: "Reassign yuborish offer", operationKey: "dispatch.offer.reassign_guarded", description: "Reassign offer to another driver.", tone: "warn", fields: [ID_FIELDS_006X.offerId, ID_FIELDS_006X.driverId], body: { action: "reassign_offer" } },
  { key: "dispatch-offer-reject", category: "Orders / yuborish / trips", title: "Reject yuborish offer", operationKey: "dispatch.offer.reject_guarded", description: "Reject active offer and record reason.", tone: "warn", fields: [ID_FIELDS_006X.offerId], body: { action: "reject_offer" } },
  { key: "trip-start", category: "Orders / dispatch / trips", title: "Start trip", operationKey: "trip.start_guarded", description: "Start a real trip lifecycle route.", tone: "ready", fields: [ID_FIELDS_006X.tripId], body: { action: "start_trip" } },
  { key: "trip-arrived", category: "Orders / yuborish / trips", title: "Mark driver arrived", operationKey: "trip.mark.driver_arrived_guarded", description: "Mark driver arrived at pickup.", tone: "ready", fields: [ID_FIELDS_006X.tripId], body: { action: "driver_arrived" } },
  { key: "trip-picked-up", category: "Orders / yuborish / trips", title: "Mark rider picked up", operationKey: "trip.mark.rider_picked_up_guarded", description: "Mark rider picked up.", tone: "ready", fields: [ID_FIELDS_006X.tripId], body: { action: "rider_picked_up" } },
  { key: "trip-complete", category: "Orders / yuborish / trips", title: "Complete trip", operationKey: "trip.complete_guarded", description: "Complete trip. Settlement/payment boundaries still apply.", tone: "ready", fields: [ID_FIELDS_006X.tripId], body: { action: "complete_trip" } },
  { key: "trip-cancel", category: "Orders / yuborish / trips", title: "Cancel trip", operationKey: "trip.cancel_guarded", description: "Cancel trip with reason.", tone: "danger", fields: [ID_FIELDS_006X.tripId], body: { action: "cancel_trip" } },
  { key: "trip-safety-flag", category: "Complaints / safety", title: "Flag trip safety", operationKey: "trip.safety.flag_guarded", description: "Flag trip for safety review.", tone: "danger", fields: [ID_FIELDS_006X.tripId, { key: "severity", label: "Severity", required: true, placeholder: "low | medium | high | critical" }], body: { action: "safety_flag" } },
  { key: "support-open", category: "Complaints / safety", title: "Open support case", operationKey: "support.case.open_guarded", description: "Open a real support case route.", tone: "warn", fields: [{ key: "subject", label: "Subject", required: true, placeholder: "short subject" }, { key: "relatedEntityId", label: "Related entity ID", placeholder: "trip/request/driver id" }], body: { action: "open_support_case" } },
  { key: "support-assign", category: "Complaints / safety", title: "Assign support case", operationKey: "support.case.assign_guarded", description: "Assign case to staff/admin.", tone: "ready", fields: [ID_FIELDS_006X.supportCaseId, { key: "assigneeId", label: "Assignee ID", required: true, placeholder: "staff/admin id" }], body: { action: "assign_support_case" } },
  { key: "support-escalate", category: "Complaints / safety", title: "Escalate support case", operationKey: "support.case.escalate_guarded", description: "Escalate a support case to higher risk/owner queue.", tone: "danger", fields: [ID_FIELDS_006X.supportCaseId, { key: "escalationLevel", label: "Escalation level", required: true, placeholder: "risk | legal | owner" }], body: { action: "escalate_support_case" } },
  { key: "support-resolve", category: "Complaints / safety", title: "Resolve support case", operationKey: "support.case.resolve_guarded", description: "Resolve support case with decision.", tone: "ready", fields: [ID_FIELDS_006X.supportCaseId, { key: "resolution", label: "Resolution", required: true, placeholder: "resolved / rejected / compensated" }], body: { action: "resolve_support_case" } },
  { key: "support-note", category: "Complaints / safety", title: "Add support note", operationKey: "support.case.add_note_guarded", description: "Add internal admin note to support case.", tone: "info", fields: [ID_FIELDS_006X.supportCaseId, { key: "note", label: "Note", required: true, placeholder: "internal admin note" }], body: { action: "add_note" } },
  { key: "evidence-attach", category: "Complaints / safety", title: "Attach dispute evidence", operationKey: "dispute.evidence.attach_guarded", description: "Attach evidence reference; raw files are not uploaded here.", tone: "warn", fields: [ID_FIELDS_006X.supportCaseId, { key: "evidenceReference", label: "Evidence reference", required: true, placeholder: "storage key / hash / URL reference" }], body: { action: "attach_evidence" } },
  { key: "evidence-review", category: "Complaints / safety", title: "Review dispute evidence", operationKey: "dispute.evidence.review_guarded", description: "Review existing evidence item.", tone: "ready", fields: [ID_FIELDS_006X.evidenceId, { key: "decision", label: "Decision", required: true, placeholder: "accepted | rejected | needs_more" }], body: { action: "review_evidence" } },
  { key: "payment-capture", category: "Payments / settlement", title: "Capture payment hold reference", operationKey: "payment.hold.capture_reference_guarded", description: "Capture reference route. Real money movement remains backend-gated.", tone: "locked", fields: [ID_FIELDS_006X.paymentHoldId], body: { action: "capture_reference", moneyMovementApprovedNow: false } },
  { key: "payment-release", category: "Payments / settlement", title: "Release payment hold reference", operationKey: "payment.hold.release_reference_guarded", description: "Release reference route. Real provider execution remains backend-gated.", tone: "locked", fields: [ID_FIELDS_006X.paymentHoldId], body: { action: "release_reference", moneyMovementApprovedNow: false } },
  { key: "settlement-pending", category: "Payments / settlement", title: "Mark settlement pending", operationKey: "settlement.mark.pending_guarded", description: "Mark settlement pending, no payout without server tasdiq.", tone: "locked", fields: [ID_FIELDS_006X.settlementId], body: { action: "settlement_pending", payoutApprovedNow: false } },
  { key: "settlement-available", category: "Payments / settlement", title: "Mark settlement available", operationKey: "settlement.mark.available_guarded", description: "Mark settlement available, no payout without server tasdiq.", tone: "locked", fields: [ID_FIELDS_006X.settlementId], body: { action: "settlement_available", payoutApprovedNow: false } },
  { key: "provider-recheck", category: "Provider / readiness", title: "Recheck provayder holat", operationKey: "provider.status.recheck_guarded", description: "Recheck provayder holat. It must not enable provayder runtime by itself.", tone: "warn", fields: [{ key: "provayderKey", label: "Provider key", required: true, placeholder: "airwallex / local-provayder / taxi-provayder" }], body: { action: "provider_recheck", runtimeEnablementApprovedNow: false } },
  { key: "provider-unconfigured", category: "Provider / readiness", title: "Mark provayder unconfigured", operationKey: "provider.status.mark_unconfigured_guarded", description: "Mark provayder not configured, useful for safety block display.", tone: "danger", fields: [{ key: "provayderKey", label: "Provider key", required: true, placeholder: "provayder key" }], body: { action: "mark_unconfigured" } },
  { key: "audit-export", category: "Reports / audit", title: "Request admin audit export", operationKey: "admin.audit.export_request_guarded", description: "Request audit export route if backend exposes it.", tone: "info", fields: [{ key: "fromDate", label: "From date", placeholder: "YYYY-MM-DD" }, { key: "toDate", label: "To date", placeholder: "YYYY-MM-DD" }], body: { action: "audit_export_request" } },
];

function baseUrl006X(config: AdminApiConfig): string {
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

function asRecord006X(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function array006X(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readNested006X(value: unknown, path: string[]): unknown {
  let current = value;
  for (const key of path) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function text006X(value: unknown, fallback = "—"): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value || fallback;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function pretty006X(value: unknown): string {
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

function toneFromStatus006X(status: number): TaxiTone006X {
  if (status >= 200 && status < 300) return "ready";
  if (status === 409) return "locked";
  if (status === 403 || status === 401) return "warn";
  if (status === 0 || status >= 500) return "danger";
  return "info";
}

function messageFromPayload006X(status: number, payload: unknown): string {
  const body = asRecord006X(payload);
  const code = text006X(body.code, "");
  const error = text006X(body.error, "");
  const message = text006X(body.message, "");
  if (status >= 200 && status < 300) return message || "real server data returned";
  if (status === 409) return code || error || "server safe-disabled / locked";
  if (status === 403) return code || error || "admin token or permission rejected";
  if (status === 0) return error || "network or timeout";
  return code || error || message || `HTTP ${status}`;
}

function routeIdentity006X(route: TaxiRouteContract006X): string {
  return route.operationKey || route.key || route.path || "unknown_route";
}

function routeMap006X(routes: TaxiRouteContract006X[]): Map<string, TaxiRouteContract006X> {
  const map = new Map<string, TaxiRouteContract006X>();
  routes.forEach((route) => {
    if (route.operationKey) map.set(route.operationKey, route);
  });
  return map;
}

function getRoutesFromResult006X(result?: TaxiCallResult006X): TaxiRouteContract006X[] {
  const payload = asRecord006X(result?.payload);
  const direct = array006X(payload.routes) as TaxiRouteContract006X[];
  if (direct.length) return direct;
  return array006X(readNested006X(payload, ["runtime", "routeContracts"])) as TaxiRouteContract006X[];
}

async function callTaxi006X(config: AdminApiConfig, endpoint: { key: string; title: string; path: string; method: TaxiMethod006X; body?: unknown; headers?: Record<string, string> }): Promise<TaxiCallResult006X> {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18000);
  const token = (config.token || "").trim();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-sabi-admin-token": token,
    "x-admin-token": token,
    "x-admin-panel-token": token,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(endpoint.method !== "GET" ? { "Idempotency-Key": `admin-ui-006x-${endpoint.key}-${Date.now()}` } : {}),
    ...(endpoint.headers || {}),
  };
  let status = 0;
  let payload: unknown = null;
  try {
    const response = await fetch(`${baseUrl006X(config)}${endpoint.path}`, {
      method: endpoint.method,
      headers,
      signal: controller.signal,
      body: endpoint.method === "GET" ? undefined : JSON.stringify(endpoint.body || { source: "admin-ui-006x", fakeSuccessBlocked: true }),
    });
    status = response.status;
    const text = await response.text();
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  } catch (error) {
    payload = { ok: false, error: error instanceof DOMException && error.name === "AbortError" ? "timeout_18000ms" : error instanceof Error ? error.message : String(error), path: endpoint.path };
  } finally {
    window.clearTimeout(timeout);
  }
  return {
    key: endpoint.key,
    title: endpoint.title,
    path: endpoint.path,
    method: endpoint.method,
    status,
    ok: status >= 200 && status < 300,
    tone: toneFromStatus006X(status),
    message: messageFromPayload006X(status, payload),
    payload,
    requestBody: endpoint.body,
    executedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
  };
}

function Badge006X({ tone, children }: { tone?: TaxiTone006X; children: React.ReactNode }) {
  return <em className={`taxi006XBadge taxi006X-${tone || "info"}`}>{children}</em>;
}

function Metric006X(props: { label: string; value: string | number; note: string; tone?: TaxiTone006X; percent?: number }) {
  const width = Math.max(0, Math.min(100, props.percent ?? 0));
  return <article className={`taxi006XMetric taxi006X-${props.tone || "info"}`}><span>{props.label}</span><strong>{props.value}</strong><small>{props.note}</small><i><b style={{ width: `${width}%` }} /></i></article>;
}

function Result006X({ result }: { result?: TaxiCallResult006X }) {
  if (!result) return <p className="taxi006XMuted">No backend response yet.</p>;
  return <article className={`taxi006XResult taxi006X-${result.tone}`}>
    <header><div><strong>{result.title}</strong><small>{result.method} {result.path}</small></div><Badge006X tone={result.tone}>{result.status || "offline"}</Badge006X></header>
    <p>{result.message}</p>
    <small>{result.durationMs}ms · {result.executedAt}</small>
    <details><summary>Request body</summary><pre>{pretty006X(result.requestBody || null)}</pre></details>
    <details open><summary>Backend payload</summary><pre>{pretty006X(result.payload)}</pre></details>
  </article>;
}

function requiredMissing006X(action: TaxiAction006X, values: Record<string, string>): string[] {
  return action.fields.filter((field) => field.required && !String(values[field.key] || "").trim()).map((field) => field.label);
}

function ActionCard006X(props: { action: TaxiAction006X; selected: boolean; route?: TaxiRouteContract006X; onSelect: () => void }) {
  return <button type="button" className={`taxi006XActionCard ${props.selected ? "active" : ""}`} onClick={props.onSelect}>
    <span>{props.action.category}</span>
    <strong>{props.action.title}</strong>
    <small>{props.action.description}</small>
    <footer>
      <Badge006X tone={props.route ? props.action.tone : "locked"}>{props.route ? `${props.route.method || "POST"} ${props.route.path || "route"}` : "route missing"}</Badge006X>
    </footer>
  </button>;
}

export function TaxiAdminControl006XPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice?: (message: string) => void }) {
  const copy = COPY006X[props.language] || COPY006X.ru;
  const [results, setResults] = useState<Record<string, TaxiCallResult006X>>({});
  const [busy, setBusy] = useState("");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedKey, setSelectedKey] = useState(TAXI_ACTIONS_006X[0]?.key || "");
  const [formValues, setFormValues] = useState<Record<string, string>>({ decision: "approved" });
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [lastResult, setLastResult] = useState<TaxiCallResult006X | undefined>();
  const [selectedResultKey, setSelectedResultKey] = useState("readiness");
  const [actionLog, setActionLog] = useState<TaxiCallResult006X[]>([]);
  const [showFoundationPanel, setShowFoundationPanel] = useState(false);

  const routes = useMemo(() => getRoutesFromResult006X(results.routes), [results.routes]);
  const routesByOperation = useMemo(() => routeMap006X(routes), [routes]);
  const selectedAction = TAXI_ACTIONS_006X.find((item) => item.key === selectedKey) || TAXI_ACTIONS_006X[0];
  const selectedRoute = selectedAction ? routesByOperation.get(selectedAction.operationKey) : undefined;
  const missingFields = selectedAction ? requiredMissing006X(selectedAction, formValues) : [];
  const routeReady = Boolean(selectedRoute?.path && selectedRoute?.method);
  const canRun = Boolean(selectedAction && routeReady && missingFields.length === 0 && !busy);

  const setResult = useCallback((result: TaxiCallResult006X) => {
    setResults((prev) => ({ ...prev, [result.key]: result }));
    setLastResult(result);
    setSelectedResultKey(result.key);
    setActionLog((prev) => [result, ...prev].slice(0, 40));
  }, []);

  const runEndpoint = useCallback(async (endpoint: TaxiEndpoint006X) => {
    setBusy(endpoint.key);
    try {
      const result = await callTaxi006X(props.config, endpoint);
      setResult(result);
      props.setNotice?.(`${endpoint.title}: ${result.status || "offline"} · ${result.message}`);
    } finally {
      setBusy("");
    }
  }, [props.config, props.setNotice, setResult]);

  const refresh = useCallback(async () => {
    setBusy("refresh");
    try {
      const initial = TAXI_FOUNDATION_ENDPOINTS_006X.filter((endpoint) => ["readiness", "routes", "diagnostics", "dbReadPlan", "dbWritePlan"].includes(endpoint.key));
      const loaded = await Promise.all(initial.map((endpoint) => callTaxi006X(props.config, endpoint)));
      setResults((prev) => Object.fromEntries([...Object.entries(prev), ...loaded.map((item) => [item.key, item])]));
      setLastResult(loaded[0]);
      setSelectedResultKey("readiness");
      setActionLog((prev) => [...loaded, ...prev].slice(0, 40));
      props.setNotice?.(`Taxi foundation refreshed: ${loaded.map((item) => `${item.key}:${item.status || "offline"}`).join(" · ")}`);
    } finally {
      setBusy("");
    }
  }, [props.config, props.setNotice]);

  useEffect(() => { void refresh(); }, [refresh]);

  const runSelectedAction = useCallback(async () => {
    if (!selectedAction || !selectedRoute?.path) return;
    const method = (selectedRoute.method || "POST") as TaxiMethod006X;
    const body = {
      source: "admin-ui-006x",
      operationKey: selectedAction.operationKey,
      adminReason,
      ownerApprovalId,
      fakeSuccessBlocked: true,
      uiClaimedApproved: false,
      backendResponseRequired: true,
      selectedRecord: Object.fromEntries(selectedAction.fields.map((field) => [field.key, formValues[field.key] || ""])),
      ...selectedAction.body,
    };
    const request = { key: `action:${selectedAction.key}:${Date.now()}`, title: selectedAction.title, path: selectedRoute.path, method, body };
    setBusy(selectedAction.key);
    try {
      const result = await callTaxi006X(props.config, request);
      setResult(result);
      props.setNotice?.(`${selectedAction.title}: ${result.status || "offline"} · ${result.message}`);
    } finally {
      setBusy("");
    }
  }, [adminReason, formValues, ownerApprovalId, props.config, props.setNotice, selectedAction, selectedRoute, setResult]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(TAXI_ACTIONS_006X.map((item) => item.category)))], []);
  const filteredActions = TAXI_ACTIONS_006X.filter((action) => {
    const haystack = `${action.category} ${action.title} ${action.operationKey} ${action.description}`.toLowerCase();
    return (category === "All" || action.category === category) && (!filter || haystack.includes(filter.toLowerCase()));
  });

  const routeCounts = useMemo(() => ({
    total: routes.length,
    admin: routes.filter((route) => route.requiresAdmin).length,
    write: routes.filter((route) => String(route.method || "GET") !== "GET").length,
    provider: routes.filter((route) => route.requiresProviderReadiness).length,
    wallet: routes.filter((route) => route.requiresWalletBoundary).length,
    matchedActions: TAXI_ACTIONS_006X.filter((action) => routesByOperation.has(action.operationKey)).length,
  }), [routes, routesByOperation]);

  const liveDbPayload = asRecord006X(results.dbRead?.payload);
  const readOnlyItems = ["driverApplications", "drivers", "vehicles", "requests", "trips", "supportCases", "settlements"].map((key) => {
    const value = liveDbPayload[key] ?? readNested006X(liveDbPayload, ["data", key]) ?? readNested006X(liveDbPayload, ["counts", key]);
    return { key, value: Array.isArray(value) ? value.length : text006X(value, "not returned") };
  });

  return <section className="panel taxi006X" data-admin-ui-006x-taxi-real-workflow="true" data-admin-ui-006v-route-screen="taxi">
    <div className="taxi006XHero">
      <div>
        <span>ADMIN-UI 006X · Taxi only · real backend response only</span>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
      <aside>
        <Badge006X tone="ready">real endpoint calls</Badge006X>
        <Badge006X tone="locked">DB write gate respected</Badge006X>
        <Badge006X tone="danger">fake success blocked</Badge006X>
      </aside>
    </div>

    <div className="taxi006XNoFake">{copy.noFake}</div>

    <div className="taxi006XToolbar">
      <button type="button" onClick={() => void refresh()} disabled={Boolean(busy)}>{busy === "refresh" ? "Loading..." : copy.refresh}</button>
      {TAXI_FOUNDATION_ENDPOINTS_006X.map((endpoint) => <button key={endpoint.key} type="button" onClick={() => void runEndpoint(endpoint)} disabled={Boolean(busy)}>{endpoint.title}</button>)}
    </div>

    <div className="taxi006XMetrics">
      <Metric006X label="Server readiness" value={results.readiness?.status || "—"} note={results.readiness?.message || "load readiness"} tone={results.readiness?.tone || "info"} percent={results.readiness?.ok ? 100 : 20} />
      <Metric006X label="Route contracts" value={routeCounts.total} note={`${routeCounts.admin} admin · ${routeCounts.write} write · ${routeCounts.provider} provider · ${routeCounts.wallet} wallet`} tone={routeCounts.total ? "ready" : "warn"} percent={Math.min(100, routeCounts.total)} />
      <Metric006X label="Action coverage" value={`${routeCounts.matchedActions}/${TAXI_ACTIONS_006X.length}`} note="UI buttons backed by live route contracts" tone={routeCounts.matchedActions === TAXI_ACTIONS_006X.length ? "ready" : "warn"} percent={Math.round((routeCounts.matchedActions / TAXI_ACTIONS_006X.length) * 100)} />
      <Metric006X label="Read-only maʼlumotlar bazasi" value={results.dbRead?.status || "not loaded"} note={results.dbRead?.message || "click Read-only maʼlumotlar bazasi data"} tone={results.dbRead?.tone || "locked"} percent={results.dbRead?.ok ? 100 : 35} />
      <Metric006X label="Approve/write" value={results.dbWriteGate?.status || "locked"} note={results.dbWriteGate?.message || copy.backendLocked} tone={results.dbWriteGate?.tone || "locked"} percent={results.dbWriteGate?.ok ? 100 : 0} />
    </div>

    <div className="taxi006XGrid taxi006XGridMain">
      <section className="card taxi006XBlock">
        <header className="taxi006XSectionHeader"><div><h3>{copy.actionDesk}</h3><p>Выбери реальную функцию, введи реальный номер, решение или причину и нажми серверный маршрут. Ничего не считается подтверждённым без ответа сервера.</p></div></header>
        <div className="taxi006XFilters">
          <select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="filter: approve, trip, support, settlement..." />
        </div>
        <div className="taxi006XActions">
          {filteredActions.map((action) => <ActionCard006X key={action.key} action={action} route={routesByOperation.get(action.operationKey)} selected={selectedKey === action.key} onSelect={() => setSelectedKey(action.key)} />)}
        </div>
      </section>

      <section className="card taxi006XBlock taxi006XExecutor">
        <h3>{selectedAction?.title}</h3>
        <p>{selectedAction?.description}</p>
        <div className="taxi006XRouteBox">
          <span>operationKey</span><strong>{selectedAction?.operationKey}</strong>
          {selectedRoute ? <Badge006X tone="ready">{selectedRoute.method} {selectedRoute.path}</Badge006X> : <Badge006X tone="locked">{copy.routeMissing}</Badge006X>}
        </div>
        <div className="taxi006XForm">
          {selectedAction?.fields.map((field) => <label key={field.key}><span>{field.label}{field.required ? "*" : ""}</span><input value={formValues[field.key] || ""} onChange={(event) => setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))} placeholder={field.placeholder || field.helper || field.key} /></label>)}
          <label><span>{copy.reason}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="why this admin action is required" /></label>
          <label><span>{copy.ownerApproval}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="optional unless server requires it" /></label>
        </div>
        {missingFields.length ? <div className="taxi006XWarning">{copy.required}: {missingFields.join(", ")}</div> : null}
        {!routeReady ? <div className="taxi006XWarning">{copy.routeMissing}</div> : null}
        <button type="button" className="taxi006XRun" onClick={() => void runSelectedAction()} disabled={!canRun}>{busy === selectedAction?.key ? "Running..." : copy.run}</button>
        <p className="taxi006XMuted">Real result only: 200 means backend accepted. 409/403 means blocked/forbidden. UI never mutates local state as approved.</p>
      </section>
    </div>

    <div className="taxi006XGrid">
      <section className="card taxi006XBlock">
        <h3>{copy.liveData}</h3>
        <div className="taxi006XDataSources">
          {TAXI_FOUNDATION_ENDPOINTS_006X.map((endpoint) => <button key={endpoint.key} type="button" onClick={() => setSelectedResultKey(endpoint.key)} className={selectedResultKey === endpoint.key ? "active" : ""}><strong>{endpoint.title}</strong><small>{endpoint.description}</small><Badge006X tone={results[endpoint.key]?.tone}>{results[endpoint.key]?.status || "not loaded"}</Badge006X></button>)}
        </div>
        <h4>Read-only queue values returned by backend</h4>
        <div className="taxi006XQueueGrid">
          {readOnlyItems.map((item) => <article key={item.key}><span>{item.key}</span><strong>{item.value}</strong><small>{results.dbRead?.ok ? "from backend payload" : "not loaded / not returned"}</small></article>)}
        </div>
      </section>
      <section className="card taxi006XBlock">
        <h3>{copy.result}</h3>
        <Result006X result={results[selectedResultKey] || lastResult} />
      </section>
    </div>

    <div className="taxi006XGrid">
      <section className="card taxi006XBlock">
        <h3>{copy.reports}</h3>
        <div className="taxi006XReportBars">
          <Metric006X label="Foundation match" value="route-backed" note="actions are resolved from /api/taxi/002n/routes" tone="ready" percent={Math.round((routeCounts.matchedActions / TAXI_ACTIONS_006X.length) * 100)} />
          <Metric006X label="Data observability" value={results.dbRead?.ok ? "loaded" : "blocked/manual"} note="Faqat o‘qish uchun maʼlumotlar bazasi nuqtasi; yozish yo‘q." tone={results.dbRead?.ok ? "ready" : "warn"} percent={results.dbRead?.ok ? 100 : 45} />
          <Metric006X label="Runtime mutation" value="0%" note="Maʼlumotlar bazasiga yozish, provayder, hamyon, to‘lov va to‘lov chiqarish serverning aniq tasdig‘igacha bloklangan." tone="locked" percent={0} />
          <Metric006X label="Safety" value="soxta blocked" note="Mahalliy tasdiq yo‘q; server javobi talab qilinadi." tone="danger" percent={100} />
        </div>
      </section>
      <section className="card taxi006XBlock">
        <h3>{copy.log}</h3>
        <div className="taxi006XLog" data-admin-ui-006x-action-log="true">
          {actionLog.length ? actionLog.map((item) => <article key={`${item.key}-${item.executedAt}`}><Badge006X tone={item.tone}>{item.status || "offline"}</Badge006X><div><strong>{item.title}</strong><small>{item.method} {item.path}</small><p>{item.message}</p></div></article>) : <p className="taxi006XMuted">No calls yet.</p>}
        </div>
      </section>
    </div>

    <section className="card taxi006XBlock">
      <div className="taxi006XSectionHeader"><div><h3>{copy.routes}</h3><p>{routeCounts.total} live route contracts from backend. Internal routes are allowed to return 409 while safe-disabled.</p></div><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="filter routes" /></div>
      <div className="taxi006XRoutes">
        {routes.filter((route) => !filter || `${route.operationKey} ${route.path} ${route.area}`.toLowerCase().includes(filter.toLowerCase())).slice(0, 140).map((route) => <article key={routeIdentity006X(route)}><strong>{route.operationKey}</strong><small>{route.method} {route.path}</small><span>{route.area}</span><Badge006X tone={route.safeDisabledUntilNextStage ? "locked" : "ready"}>{route.safeDisabledUntilNextStage ? "safe-disabled" : "ready"}</Badge006X></article>)}
        {!routes.length ? <p className="taxi006XMuted">Press Refresh Taxi foundation to load routes.</p> : null}
      </div>
    </section>

    <section className="card taxi006XBlock">
      <button type="button" onClick={() => setShowFoundationPanel((value) => !value)}>{showFoundationPanel ? "Hide" : "Show"} {copy.oldPanel}</button>
      {showFoundationPanel ? <TaxiAdminControl006WPanel language={props.language} config={props.config} setNotice={props.setNotice} /> : null}
    </section>
  </section>;
}
