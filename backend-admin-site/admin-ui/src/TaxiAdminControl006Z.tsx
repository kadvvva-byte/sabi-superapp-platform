import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiAdminControl006XPanel } from "./TaxiAdminControl006X";

type Tone006Z = "ready" | "safe" | "warn" | "locked" | "danger" | "info";
type Method006Z = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type AnyRecord006Z = Record<string, unknown>;

type SourceResult006Z = {
  key: string;
  title: string;
  path: string;
  method: Method006Z;
  status: number;
  ok: boolean;
  tone: Tone006Z;
  message: string;
  payload: unknown;
  body?: unknown;
  at: string;
  durationMs: number;
};

type RouteContract006Z = {
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

type SourceEndpoint006Z = {
  key: string;
  title: string;
  path: string;
  method: Method006Z;
  description: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type WorkQueue006Z = {
  key: string;
  title: string;
  description: string;
  tone: Tone006Z;
  records: AnyRecord006Z[];
  countFromBackend?: string | number;
  idKeys: string[];
  statusKeys: string[];
  primaryActions: string[];
  columns: string[];
};

type ActionField006Z = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fromRecordKeys?: string[];
};

type AdminAction006Z = {
  key: string;
  title: string;
  shortTitle: string;
  queueKey: string;
  operationKey: string;
  tone: Tone006Z;
  requiresReason?: boolean;
  idKeys: string[];
  fields: ActionField006Z[];
  body: AnyRecord006Z;
};

const COPY006Z: Record<AdminLanguage, { title: string; subtitle: string; noFake: string; refresh: string; loadData: string; queues: string; selected: string; execute: string; reports: string; sources: string; technical: string; empty: string; routeMissing: string; reason: string; lastResponse: string; }> = {
  ru: {
    title: "Такси — детальное управление заявками, жалобами и балансом",
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
    title: "Taxi — detailed applications, complaints and balance control",
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

const SOURCES006Z: SourceEndpoint006Z[] = [
  { key: "readiness", title: "Readiness", path: "/api/taxi/002n/readiness", method: "GET", description: "Taxi foundation readiness" },
  { key: "routes", title: "Route contracts", path: "/api/taxi/002n/routes", method: "GET", description: "Actions exposed by Taxi foundation" },
  { key: "diagnostics", title: "Admin diagnostics", path: "/api/admin/taxi/002n/diagnostics", method: "GET", description: "Protected admin diagnostic snapshot" },
  { key: "dbReadPlan", title: "Read-only plan", path: "/api/taxi/002t/read-only-db-dry-run/plan", method: "GET", description: "Plan for read-only Taxi data" },
  { key: "dbRead", title: "Live read-only data", path: "/api/taxi/002t/read-only-db-dry-run", method: "GET", description: "Real read-only DB dry-run data if backend allows it", headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } },
  { key: "dbWritePlan", title: "Write gate plan", path: "/api/taxi/002x/db-write-runtime/plan", method: "GET", description: "DB write runtime gate plan" },
  { key: "dbWriteGate", title: "Write gate check", path: "/api/taxi/002x/db-write-runtime/write-gate", method: "POST", description: "Real write gate check; no mutation by UI", headers: { "x-sabi-taxi-db-write-gate": "approve-002x-route-patch-only-no-write" }, body: { source: "admin-ui-006z", requestedAction: "write_gate_check", fakeSuccessBlocked: true } },
  { key: "providerBoundary", title: "Provider / Wallet boundary", path: "/api/taxi/003d/provider-wallet-boundary/check", method: "POST", description: "Provider, Wallet, payment and payout boundary", headers: { "x-sabi-taxi-provider-wallet-boundary": "approve-003d-route-patch-only-no-execution" }, body: { source: "admin-ui-006z", requestedAction: "boundary_check", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", path: "/api/taxi/003h/admin-readiness-cockpit/check", method: "POST", description: "Taxi Admin cockpit boundary", headers: { "x-sabi-taxi-admin-cockpit-boundary": "approve-003h-route-patch-only-no-execution" }, body: { source: "admin-ui-006z", requestedAction: "cockpit_check", fakeSuccessBlocked: true } },
];

const ACTIONS006Z: AdminAction006Z[] = [
  { key: "application-review", title: "Review driver application", shortTitle: "Review", queueKey: "applications", operationKey: "admin.driver.application.review_guarded", tone: "ready", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "decision", label: "Decision", type: "select", required: true, options: ["approved", "rejected", "needs_documents", "in_review"] }, { key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }], body: { action: "review_driver_application" } },
  { key: "application-documents", title: "Require documents", shortTitle: "Docs", queueKey: "applications", operationKey: "driver.document.submit_guarded", tone: "warn", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }, { key: "requiredDocuments", label: "Required documents", required: true, placeholder: "license, vehicle_photo, insurance" }], body: { action: "require_driver_documents" } },
  { key: "application-reopen", title: "Reopen application", shortTitle: "Reopen", queueKey: "applications", operationKey: "admin.driver.application.review_guarded", tone: "info", requiresReason: true, idKeys: ["applicationId", "id"], fields: [{ key: "applicationId", label: "Application ID", required: true, fromRecordKeys: ["applicationId", "id"] }], body: { action: "reopen_driver_application" } },
  { key: "driver-approve", title: "Approve driver profile", shortTitle: "Approve", queueKey: "drivers", operationKey: "admin.driver.application.review_guarded", tone: "ready", requiresReason: true, idKeys: ["driverId", "id"], fields: [{ key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "id"] }], body: { action: "approve_driver_profile" } },
  { key: "driver-suspend", title: "Suspend driver", shortTitle: "Suspend", queueKey: "drivers", operationKey: "admin.driver.profile.suspend_guarded", tone: "danger", requiresReason: true, idKeys: ["driverId", "id"], fields: [{ key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "id"] }, { key: "suspensionType", label: "Suspension type", type: "select", required: true, options: ["temporary", "hard_block", "safety_review"] }], body: { action: "suspend_driver" } },
  { key: "vehicle-review", title: "Review vehicle", shortTitle: "Review", queueKey: "vehicles", operationKey: "admin.vehicle.review_guarded", tone: "ready", requiresReason: true, idKeys: ["vehicleId", "id"], fields: [{ key: "vehicleId", label: "Vehicle ID", required: true, fromRecordKeys: ["vehicleId", "id"] }, { key: "decision", label: "Decision", type: "select", required: true, options: ["approved", "rejected", "needs_documents"] }], body: { action: "review_vehicle" } },
  { key: "vehicle-assign", title: "Assign vehicle", shortTitle: "Assign", queueKey: "vehicles", operationKey: "admin.vehicle.assignment.review_guarded", tone: "ready", requiresReason: true, idKeys: ["vehicleId", "id"], fields: [{ key: "vehicleId", label: "Vehicle ID", required: true, fromRecordKeys: ["vehicleId", "id"] }, { key: "driverId", label: "Driver ID", required: true, fromRecordKeys: ["driverId", "ownerDriverId"] }], body: { action: "assign_vehicle" } },
  { key: "request-cancel", title: "Cancel rider request", shortTitle: "Cancel", queueKey: "requests", operationKey: "rider.request.cancel_guarded", tone: "warn", requiresReason: true, idKeys: ["requestId", "id"], fields: [{ key: "requestId", label: "Request ID", required: true, fromRecordKeys: ["requestId", "id"] }], body: { action: "cancel_request" } },
  { key: "offer-create", title: "Create dispatch offer", shortTitle: "Offer", queueKey: "requests", operationKey: "admin.dispatch.manual_assign_guarded", tone: "ready", requiresReason: true, idKeys: ["requestId", "id"], fields: [{ key: "requestId", label: "Request ID", required: true, fromRecordKeys: ["requestId", "id"] }, { key: "driverId", label: "Driver ID", required: true, placeholder: "driver to receive offer" }], body: { action: "create_dispatch_offer" } },
  { key: "trip-start", title: "Start trip", shortTitle: "Start", queueKey: "trips", operationKey: "trip.start_guarded", tone: "ready", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "start_trip" } },
  { key: "trip-complete", title: "Complete trip", shortTitle: "Complete", queueKey: "trips", operationKey: "trip.complete_guarded", tone: "ready", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "complete_trip" } },
  { key: "trip-cancel", title: "Cancel trip", shortTitle: "Cancel", queueKey: "trips", operationKey: "admin.trip.force_cancel_guarded", tone: "danger", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }], body: { action: "cancel_trip" } },
  { key: "trip-safety", title: "Safety flag", shortTitle: "Safety", queueKey: "trips", operationKey: "safety.event.review_guarded", tone: "danger", requiresReason: true, idKeys: ["tripId", "id"], fields: [{ key: "tripId", label: "Trip ID", required: true, fromRecordKeys: ["tripId", "id"] }, { key: "severity", label: "Severity", type: "select", required: true, options: ["low", "medium", "high", "critical"] }], body: { action: "flag_trip_safety" } },
  { key: "support-assign", title: "Assign support case", shortTitle: "Assign", queueKey: "support", operationKey: "support.case.message_guarded", tone: "ready", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "assigneeId", label: "Assignee ID", required: true }], body: { action: "assign_support_case" } },
  { key: "support-escalate", title: "Escalate support case", shortTitle: "Escalate", queueKey: "support", operationKey: "support.case.message_guarded", tone: "danger", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "escalationLevel", label: "Escalation", type: "select", required: true, options: ["risk", "legal", "owner"] }], body: { action: "escalate_support_case" } },
  { key: "support-resolve", title: "Resolve support case", shortTitle: "Resolve", queueKey: "support", operationKey: "support.case.close_guarded", tone: "ready", requiresReason: true, idKeys: ["supportCaseId", "caseId", "id"], fields: [{ key: "supportCaseId", label: "Support case ID", required: true, fromRecordKeys: ["supportCaseId", "caseId", "id"] }, { key: "resolution", label: "Resolution", type: "select", required: true, options: ["resolved", "rejected", "compensated", "false_complaint"] }], body: { action: "resolve_support_case" } },
  { key: "evidence-review", title: "Review evidence", shortTitle: "Evidence", queueKey: "support", operationKey: "dispute.evidence.submit_guarded", tone: "warn", requiresReason: true, idKeys: ["evidenceId", "id"], fields: [{ key: "evidenceId", label: "Evidence ID", required: true, fromRecordKeys: ["evidenceId", "id"] }, { key: "decision", label: "Decision", type: "select", required: true, options: ["accepted", "rejected", "needs_more"] }], body: { action: "review_dispute_evidence" } },
  { key: "tariff-upsert", title: "Create / update tariff region", shortTitle: "Upsert", queueKey: "tariffs", operationKey: "admin.tariff.region.update_guarded", tone: "ready", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }, { key: "baseFare", label: "Base fare", type: "number" }, { key: "commissionPercent", label: "Commission %", type: "number" }], body: { action: "upsert_tariff_region" } },
  { key: "tariff-activate", title: "Activate tariff region", shortTitle: "Activate", queueKey: "tariffs", operationKey: "admin.tariff.region.update_guarded", tone: "ready", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }], body: { action: "activate_tariff_region" } },
  { key: "tariff-suspend", title: "Suspend tariff region", shortTitle: "Suspend", queueKey: "tariffs", operationKey: "admin.tariff.region.update_guarded", tone: "danger", requiresReason: true, idKeys: ["regionCode", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }], body: { action: "suspend_tariff_region" } },
  { key: "commission-update", title: "Update commission policy", shortTitle: "Commission", queueKey: "tariffs", operationKey: "admin.commission.policy.update_guarded", tone: "warn", requiresReason: true, idKeys: ["regionCode", "commissionPolicyId", "id"], fields: [{ key: "regionCode", label: "Region code", required: true, fromRecordKeys: ["regionCode", "code", "id"] }, { key: "commissionPercent", label: "Commission %", type: "number", required: true, fromRecordKeys: ["commissionPercent"] }], body: { action: "update_commission_policy" } },
  { key: "payment-capture", title: "Capture hold reference", shortTitle: "Capture", queueKey: "settlements", operationKey: "admin.payment.hold.review_guarded", tone: "locked", requiresReason: true, idKeys: ["paymentHoldId", "holdId", "id"], fields: [{ key: "paymentHoldId", label: "Payment hold ID", required: true, fromRecordKeys: ["paymentHoldId", "holdId", "id"] }], body: { action: "capture_payment_hold_reference", moneyMovementApprovedNow: false } },
  { key: "payment-release", title: "Release hold reference", shortTitle: "Release", queueKey: "settlements", operationKey: "admin.payment.hold.review_guarded", tone: "locked", requiresReason: true, idKeys: ["paymentHoldId", "holdId", "id"], fields: [{ key: "paymentHoldId", label: "Payment hold ID", required: true, fromRecordKeys: ["paymentHoldId", "holdId", "id"] }], body: { action: "release_payment_hold_reference", moneyMovementApprovedNow: false } },
  { key: "settlement-available", title: "Mark settlement available", shortTitle: "Available", queueKey: "settlements", operationKey: "admin.settlement.review_guarded", tone: "locked", requiresReason: true, idKeys: ["settlementId", "id"], fields: [{ key: "settlementId", label: "Settlement ID", required: true, fromRecordKeys: ["settlementId", "id"] }], body: { action: "mark_settlement_available", payoutApprovedNow: false } },
  { key: "reward-freeze-review", title: "Review gift / reward freeze", shortTitle: "Freeze", queueKey: "rewards", operationKey: "admin.settlement.review_guarded", tone: "locked", requiresReason: true, idKeys: ["rewardId", "giftId", "settlementId", "id"], fields: [{ key: "rewardId", label: "Gift / reward ID", required: true, fromRecordKeys: ["rewardId", "giftId", "settlementId", "id"] }, { key: "decision", label: "Decision", type: "select", required: true, options: ["freeze_pending_review", "needs_legal_finance", "reject_release", "allow_backend_review"] }], body: { action: "review_gift_reward_freeze", giftPayoutApprovedNow: false, walletMutationApprovedNow: false } },
  { key: "reward-release-review", title: "Review gift / reward release", shortTitle: "Release", queueKey: "rewards", operationKey: "admin.settlement.review_guarded", tone: "locked", requiresReason: true, idKeys: ["rewardId", "giftId", "settlementId", "id"], fields: [{ key: "rewardId", label: "Gift / reward ID", required: true, fromRecordKeys: ["rewardId", "giftId", "settlementId", "id"] }, { key: "ownerApprovalId", label: "Owner/legal approval ID", required: true, fromRecordKeys: ["ownerApprovalId", "approvalId"] }], body: { action: "review_gift_reward_release", giftPayoutApprovedNow: false, walletMutationApprovedNow: false } },
];

function baseUrl006Z(config: AdminApiConfig): string {
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

function record006Z(value: unknown): AnyRecord006Z { return typeof value === "object" && value !== null && !Array.isArray(value) ? value as AnyRecord006Z : {}; }
function arr006Z(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function str006Z(value: unknown, fallback = "—"): string { if (value === null || value === undefined || value === "") return fallback; if (typeof value === "object") return fallback; return String(value); }
function bool006Z(value: unknown): boolean { return value === true || value === "true" || value === "YES" || value === "yes"; }
function pretty006Z(value: unknown): string { try { return JSON.stringify(value, null, 2); } catch { return String(value); } }
function nested006Z(value: unknown, path: string[]): unknown { let current = value; for (const key of path) { if (typeof current !== "object" || current === null) return undefined; current = (current as AnyRecord006Z)[key]; } return current; }
function firstValue006Z(record: AnyRecord006Z, keys: string[]): unknown { for (const key of keys) { if (record[key] !== undefined && record[key] !== null && record[key] !== "") return record[key]; } return undefined; }
function id006Z(record: AnyRecord006Z, keys: string[]): string { return str006Z(firstValue006Z(record, keys), ""); }
function status006Z(record: AnyRecord006Z, keys: string[]): string { return str006Z(firstValue006Z(record, keys), "unknown"); }
function toneStatus006Z(status: number): Tone006Z { if (status >= 200 && status < 300) return "ready"; if (status === 409) return "locked"; if (status === 401 || status === 403) return "warn"; if (status === 0 || status >= 500) return "danger"; return "info"; }
function payloadMessage006Z(status: number, payload: unknown): string { const body = record006Z(payload); return str006Z(body.message, "") || str006Z(body.code, "") || str006Z(body.error, "") || (status >= 200 && status < 300 ? "backend data returned" : status === 0 ? "network / timeout" : `HTTP ${status}`); }
function asRows006Z(value: unknown): AnyRecord006Z[] { return arr006Z(value).map((item, index) => ({ __rowIndex: index + 1, ...(record006Z(item)) })).filter(Boolean); }


type DossierItem006Z = { label: string; value: string; tone?: Tone006Z };
type MediaItem006Z = { label: string; url: string; key: string };

const REVIEW_CHECKS006Z = [
  { key: "reviewIdentityOk", label: "Identity/KYC checked", description: "Driver name, phone, selfie/avatar and license identity are reviewed." },
  { key: "reviewVehicleOk", label: "Vehicle checked", description: "Plate, model, color, category, registration and insurance are reviewed." },
  { key: "reviewPhotosOk", label: "Photos/documents checked", description: "Driver photo, license, vehicle exterior/interior and document photos are reviewed when backend provides them." },
  { key: "reviewSafetyOk", label: "Safety and fraud checked", description: "Safety flags, duplicate data, region and dispatch eligibility are reviewed." },
  { key: "reviewBalanceOk", label: "Balance/settlement boundary checked", description: "Driver balance, reserve, pending payouts and Wallet/payment boundary are checked before dispatch or reward actions." },
] as const;

function pick006Z(record: AnyRecord006Z | null | undefined, keys: readonly string[], fallback = "—"): string {
  if (!record) return fallback;
  for (const key of keys) {
    const parts = key.split('.');
    let current: unknown = record;
    for (const part of parts) {
      if (typeof current !== "object" || current === null) { current = undefined; break; }
      current = (current as AnyRecord006Z)[part];
    }
    if (current !== undefined && current !== null && current !== "" && typeof current !== "object") return String(current);
  }
  return fallback;
}

function facts006Z(record: AnyRecord006Z | null | undefined): { driver: DossierItem006Z[]; vehicle: DossierItem006Z[]; documents: DossierItem006Z[]; balance: DossierItem006Z[]; complaint: DossierItem006Z[] } {
  return {
    driver: [
      { label: "Driver ID", value: pick006Z(record, ["driverId", "driver.id", "userId", "ownerDriverId", "id"]) },
      { label: "Full name", value: pick006Z(record, ["driverName", "name", "fullName", "driver.name", "profile.fullName"]) },
      { label: "Phone", value: pick006Z(record, ["phone", "driverPhone", "driver.phone", "profile.phone"]) },
      { label: "Region", value: pick006Z(record, ["region", "regionCode", "city", "driver.region"]) },
      { label: "KYC / status", value: pick006Z(record, ["kycStatus", "verificationStatus", "driverStatus", "status", "adminStatus"]), tone: "warn" },
      { label: "Rating / score", value: pick006Z(record, ["rating", "driverRating", "score", "safetyScore"]) },
    ],
    vehicle: [
      { label: "Vehicle ID", value: pick006Z(record, ["vehicleId", "vehicle.id", "carId", "id"]) },
      { label: "Plate", value: pick006Z(record, ["plate", "plateNumber", "vehicle.plate", "carNumber"]) },
      { label: "Model", value: pick006Z(record, ["model", "vehicleModel", "vehicle.model", "carModel"]) },
      { label: "Color / year", value: [pick006Z(record, ["color", "vehicle.color"], ""), pick006Z(record, ["year", "vehicle.year"], "")].filter(Boolean).join(" · ") || "—" },
      { label: "Category", value: pick006Z(record, ["category", "vehicleCategory", "vehicle.category", "class"]) },
      { label: "Vehicle review", value: pick006Z(record, ["vehicleStatus", "vehicleReviewStatus", "assignmentStatus", "reviewStatus"]), tone: "warn" },
    ],
    documents: [
      { label: "License", value: pick006Z(record, ["licenseNumber", "driverLicense", "license.number", "documents.licenseStatus"]) },
      { label: "Insurance", value: pick006Z(record, ["insuranceStatus", "vehicle.insuranceStatus", "documents.insuranceStatus"]) },
      { label: "Registration", value: pick006Z(record, ["registrationStatus", "vehicle.registrationStatus", "documents.registrationStatus"]) },
      { label: "Submitted at", value: pick006Z(record, ["submittedAt", "createdAt", "updatedAt"]) },
    ],
    balance: [
      { label: "Driver balance", value: pick006Z(record, ["driverBalance", "balance", "driver.balance", "walletBalance"], "locked / not returned") },
      { label: "Reserve", value: pick006Z(record, ["balanceReserve", "balanceReserveMinor", "reserve", "driver.reserve"], "locked / not returned") },
      { label: "Pending settlement", value: pick006Z(record, ["pendingSettlement", "pendingAmount", "settlementPending", "pending"], "—") },
      { label: "Available settlement", value: pick006Z(record, ["availableSettlement", "availableAmount", "settlementAvailable", "available"], "—") },
      { label: "Payout / Wallet", value: pick006Z(record, ["payoutStatus", "walletStatus", "paymentStatus"], "safe-disabled boundary") },
    ],
    complaint: [
      { label: "Complaint ID", value: pick006Z(record, ["supportCaseId", "caseId", "complaintId", "disputeId", "id"]) },
      { label: "Trip ID", value: pick006Z(record, ["tripId", "trip.id"]) },
      { label: "Severity", value: pick006Z(record, ["severity", "riskLevel", "tier"], "unknown"), tone: "danger" },
      { label: "Evidence", value: pick006Z(record, ["evidenceStatus", "evidenceCount", "evidence.status"], "not returned") },
      { label: "AI recommendation", value: pick006Z(record, ["aiRecommendation", "sabiAiRecommendation", "recommendedAction"], "not returned") },
    ],
  };
}

function media006Z(record: AnyRecord006Z | null | undefined): MediaItem006Z[] {
  if (!record) return [];
  const keys = [
    ["Driver photo", ["driverPhotoUrl", "photoUrl", "avatarUrl", "selfieUrl", "driver.photoUrl", "profile.photoUrl"]],
    ["License front", ["licenseFrontUrl", "licensePhotoUrl", "driverLicensePhotoUrl", "documents.licenseFrontUrl"]],
    ["License back", ["licenseBackUrl", "documents.licenseBackUrl"]],
    ["Vehicle front", ["vehiclePhotoUrl", "vehicleFrontUrl", "carPhotoUrl", "vehicle.photoUrl"]],
    ["Vehicle interior", ["vehicleInteriorUrl", "interiorPhotoUrl", "vehicle.interiorPhotoUrl"]],
    ["Registration", ["registrationPhotoUrl", "vehicleRegistrationUrl", "documents.registrationPhotoUrl"]],
    ["Insurance", ["insurancePhotoUrl", "documents.insurancePhotoUrl"]],
    ["Complaint evidence", ["evidenceUrl", "evidencePhotoUrl", "screenshotUrl", "evidence.url"]],
  ] as const;
  return keys.map(([label, aliases]) => {
    const url = pick006Z(record, aliases, "");
    return url ? { label, url, key: aliases[0] } : null;
  }).filter(Boolean) as MediaItem006Z[];
}

function FactGrid006Z({ title, items }: { title: string; items: DossierItem006Z[] }) {
  return <article className="taxi006ZDossierBlock"><h4>{title}</h4><div>{items.map((item) => <span key={`${title}-${item.label}`}><small>{item.label}</small><strong>{item.value}</strong></span>)}</div></article>;
}

function MediaGallery006Z({ record }: { record: AnyRecord006Z | null }) {
  const items = media006Z(record);
  return <article className="taxi006ZMedia" data-admin-ui-006z-photo-document-gallery="true">
    <h4>Фото и документы с сервера</h4>
    {items.length ? <div className="taxi006ZMediaGrid">{items.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noreferrer"><img src={item.url} alt={item.label} /><span>{item.label}</span><small>{item.key}</small></a>)}</div> : <p className="taxi006YEmpty">Сервер пока не вернул ссылку на фото или документ для выбранной записи. Интерфейс не подставляет фейковые фото.</p>}
  </article>;
}

function ReviewChecklist006Z(props: { form: Record<string, string>; setForm: React.Dispatch<React.SetStateAction<Record<string, string>>>; activeQueue: string }) {
  const relevant = props.activeQueue === "applications" || props.activeQueue === "vehicles" || props.activeQueue === "drivers";
  return <article className="taxi006ZChecklist" data-admin-ui-006z-review-checklist="true">
    <h4>Обязательная проверка перед решением</h4>
    <p>Одобрение или отказ нельзя выполнять вслепую. Админ сначала отмечает проверенные пункты. Это проверка интерфейса; итог всё равно засчитывается только по ответу сервера.</p>
    <div>{REVIEW_CHECKS006Z.map((item) => <label key={item.key} className={relevant ? "" : "muted"}><input type="checkbox" checked={props.form[item.key] === "yes"} onChange={(event) => props.setForm((prev) => ({ ...prev, [item.key]: event.target.checked ? "yes" : "" }))} /><span><strong>{item.label}</strong><small>{item.description}</small></span></label>)}</div>
  </article>;
}

function Dossier006Z(props: { record: AnyRecord006Z | null; queueKey: string; form: Record<string, string>; setForm: React.Dispatch<React.SetStateAction<Record<string, string>>> }) {
  const facts = facts006Z(props.record);
  return <section className="card taxi006ZDossier" data-admin-ui-006z-application-dossier="true">
    <header className="taxi006YSectionHeader"><div><h3>Изучение заявки / карточка проверки</h3><p>Фото, документы, данные водителя и авто должны приходить с сервера. Если сервер не вернул поле — интерфейс показывает пусто или заблокировано, а не рисует фейковые данные.</p></div><Badge006Z tone={props.record ? "ready" : "locked"}>{props.record ? "record selected" : "select row"}</Badge006Z></header>
    <div className="taxi006ZDossierGrid"><FactGrid006Z title="Водитель" items={facts.driver} /><FactGrid006Z title="Авто" items={facts.vehicle} /><FactGrid006Z title="Документы" items={facts.documents} /><FactGrid006Z title="Баланс / учёт" items={facts.balance} /><FactGrid006Z title="Жалоба / доказательства" items={facts.complaint} /></div>
    <MediaGallery006Z record={props.record} />
    <ReviewChecklist006Z form={props.form} setForm={props.setForm} activeQueue={props.queueKey} />
  </section>;
}

function WorkflowBoard006Z(props: { queues: WorkQueue006Z[]; results: Record<string, SourceResult006Z>; selectedRecord: AnyRecord006Z | null }) {
  const getCount = (key: string) => props.queues.find((item) => item.key === key)?.countFromBackend || 0;
  return <section className="card taxi006ZWorkflowBoard" data-admin-ui-006z-detailed-workflows="true">
    <header className="taxi006YSectionHeader"><div><h3>Рабочие процессы такси</h3><p>Не просто кнопки: каждый процесс имеет очередь данных, просмотр, проверку, обязательную причину, серверное действие и повторную синхронизацию.</p></div><Badge006Z tone="safe">synchronous workflow</Badge006Z></header>
    <div className="taxi006ZWorkflowGrid">
      <article><strong>Заявки водителей</strong><span>{getCount("applications")}</span><p>Изучение заявки, фото, лицензия, авто, документы, одобрение, отказ или запрос документов через сервер.</p></article>
      <article><strong>Жалобы</strong><span>{getCount("support")}</span><p>Проверка жалобы, доказательства, сигнал Саби ИИ, назначение, эскалация, закрытие только с причиной.</p></article>
      <article><strong>Баланс таксистов</strong><span>{getCount("settlements")}</span><p>Учёт: ожидание, доступно, резерв, проверка удержания, проверка расчёта. Из интерфейса не выполняются изменения кошелька или платежей.</p></article>
      <article><strong>Учёт водителей</strong><span>{getCount("drivers")}</span><p>Статусы, блокировки, восстановление, право на диспетчеризацию, назначение автомобиля и журнал аудита.</p></article>
      <article><strong>Подарки / граница наград</strong><span>locked</span><p>Проверка подарков, чаевых и наград показана как граница: выдача или заморозка требуют сервера, юридической и финансовой проверки, а также одобрения владельца. Никакого поддельного вывода средств.</p></article>
      <article><strong>Синхронизация</strong><span>{props.results.dbRead?.status || "—"}</span><p>После успешного серверного действия экран обновляет данные только для чтения и показывает реальный новый статус.</p></article>
    </div>
  </section>;
}

function extractRows006Z(payload: unknown, names: string[]): AnyRecord006Z[] {
  const paths: string[][] = [];
  for (const name of names) {
    paths.push([name], ["data", name], ["snapshot", name], ["queues", name], ["records", name], ["items", name], ["readOnly", name], ["result", name], ["payload", name]);
  }
  for (const path of paths) {
    const rows = asRows006Z(nested006Z(payload, path));
    if (rows.length) return rows;
  }
  return [];
}

function extractCount006Z(payload: unknown, names: string[], rows: AnyRecord006Z[]): string | number {
  if (rows.length) return rows.length;
  const paths: string[][] = [];
  for (const name of names) paths.push(["counts", name], ["summary", name], ["totals", name], ["data", "counts", name], ["snapshot", "counts", name]);
  for (const path of paths) {
    const found = nested006Z(payload, path);
    if (typeof found === "number" || typeof found === "string") return found;
  }
  return 0;
}

function sourceHeaders006Z(config: AdminApiConfig, endpoint: SourceEndpoint006Z): Record<string, string> {
  const token = (config.token || "").trim();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-sabi-admin-token": token,
    "x-admin-token": token,
    "x-admin-panel-token": token,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(endpoint.method !== "GET" ? { "Idempotency-Key": `admin-ui-006z-${endpoint.key}-${Date.now()}` } : {}),
    ...(endpoint.headers || {}),
  };
}

async function call006Z(config: AdminApiConfig, endpoint: SourceEndpoint006Z): Promise<SourceResult006Z> {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18000);
  let status = 0;
  let payload: unknown = null;
  try {
    const response = await fetch(`${baseUrl006Z(config)}${endpoint.path}`, {
      method: endpoint.method,
      headers: sourceHeaders006Z(config, endpoint),
      signal: controller.signal,
      body: endpoint.method === "GET" ? undefined : JSON.stringify(endpoint.body || { source: "admin-ui-006z", fakeSuccessBlocked: true }),
    });
    status = response.status;
    const text = await response.text();
    try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  } catch (error) {
    payload = { ok: false, error: error instanceof DOMException && error.name === "AbortError" ? "timeout_18000ms" : error instanceof Error ? error.message : String(error), path: endpoint.path };
  } finally {
    window.clearTimeout(timeout);
  }
  return { key: endpoint.key, title: endpoint.title, path: endpoint.path, method: endpoint.method, status, ok: status >= 200 && status < 300, tone: toneStatus006Z(status), message: payloadMessage006Z(status, payload), payload, body: endpoint.body, at: new Date().toISOString(), durationMs: Date.now() - started };
}

function routesFrom006Z(result?: SourceResult006Z): RouteContract006Z[] {
  const payload = record006Z(result?.payload);
  const direct = arr006Z(payload.routes) as RouteContract006Z[];
  if (direct.length) return direct;
  return arr006Z(nested006Z(payload, ["runtime", "routeContracts"])) as RouteContract006Z[];
}

function routeMap006Z(routes: RouteContract006Z[]): Map<string, RouteContract006Z> {
  const map = new Map<string, RouteContract006Z>();
  routes.forEach((route) => { if (route.operationKey) map.set(route.operationKey, route); });
  return map;
}

function Badge006Z({ tone, children }: { tone?: Tone006Z; children: React.ReactNode }) { return <em className={`taxi006ZBadge taxi006Z-${tone || "info"}`}>{children}</em>; }
function Bar006Z({ value, tone }: { value: number; tone?: Tone006Z }) { return <i className={`taxi006ZBar taxi006Z-${tone || "info"}`}><b style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></i>; }

function SourceResultPanel006Z({ result }: { result?: SourceResult006Z }) {
  if (!result) return <p className="taxi006ZEmpty">No backend call selected.</p>;
  return <article className={`taxi006ZResponse taxi006Z-${result.tone}`} data-admin-ui-006z-backend-response="true">
    <header><div><strong>{result.title}</strong><small>{result.method} {result.path}</small></div><Badge006Z tone={result.tone}>{result.status || "offline"}</Badge006Z></header>
    <p>{result.message}</p>
    <small>{result.durationMs}ms · {result.at}</small>
    <details open><summary>Backend payload</summary><pre>{pretty006Z(result.payload)}</pre></details>
  </article>;
}

function makeQueues006Z(dbPayload: unknown): WorkQueue006Z[] {
  const specs = [
    { key: "applications", title: "Driver applications", tone: "ready" as Tone006Z, names: ["driverApplications", "applications", "driverApplicationQueue", "pendingDriverApplications"], description: "Подать / проверить / одобрить / отклонить / запросить документы", idKeys: ["applicationId", "id"], statusKeys: ["status", "reviewStatus", "adminStatus"], actions: ["application-review", "application-documents", "application-reopen"], columns: ["applicationId", "driverName", "phone", "status", "region", "createdAt"] },
    { key: "drivers", title: "Drivers", tone: "safe" as Tone006Z, names: ["drivers", "driverProfiles", "taxiDrivers", "driverQueue"], description: "Approve, suspend, dispatch access, safety review", idKeys: ["driverId", "id"], statusKeys: ["status", "driverStatus", "adminStatus", "safetyStatus"], actions: ["driver-approve", "driver-suspend"], columns: ["driverId", "name", "phone", "status", "rating", "region"] },
    { key: "vehicles", title: "Vehicles", tone: "info" as Tone006Z, names: ["vehicles", "taxiVehicles", "vehicleQueue"], description: "Review vehicle documents and driver assignment", idKeys: ["vehicleId", "id"], statusKeys: ["status", "reviewStatus", "assignmentStatus"], actions: ["vehicle-review", "vehicle-assign"], columns: ["vehicleId", "plate", "model", "status", "driverId", "region"] },
    { key: "requests", title: "Orders / requests", tone: "warn" as Tone006Z, names: ["requests", "riderRequests", "orders", "taxiRequests", "dispatchRequests"], description: "Quote, cancel, create offer, assign driver", idKeys: ["requestId", "id"], statusKeys: ["status", "requestStatus", "dispatchStatus"], actions: ["request-cancel", "offer-create"], columns: ["requestId", "riderId", "pickup", "dropoff", "status", "price"] },
    { key: "trips", title: "Trips", tone: "ready" as Tone006Z, names: ["trips", "taxiTrips", "activeTrips", "tripQueue"], description: "Start, complete, cancel, safety flag", idKeys: ["tripId", "id"], statusKeys: ["status", "tripStatus", "safetyStatus"], actions: ["trip-start", "trip-complete", "trip-cancel", "trip-safety"], columns: ["tripId", "driverId", "riderId", "status", "fare", "safetyStatus"] },
    { key: "support", title: "Complaints / disputes", tone: "danger" as Tone006Z, names: ["supportCases", "complaints", "disputes", "safetyCases", "cases"], description: "Assign, escalate, resolve, evidence review", idKeys: ["supportCaseId", "caseId", "id"], statusKeys: ["status", "caseStatus", "riskStatus", "severity"], actions: ["support-assign", "support-escalate", "support-resolve", "evidence-review"], columns: ["supportCaseId", "caseId", "tripId", "severity", "status", "createdAt"] },
    { key: "tariffs", title: "Tariffs / regions", tone: "safe" as Tone006Z, names: ["tariffs", "regions", "tariffRegions", "commissionRules"], description: "Tariff, region and commission management", idKeys: ["regionCode", "code", "id"], statusKeys: ["status", "tariffStatus"], actions: ["tariff-upsert", "tariff-activate", "tariff-suspend", "commission-update"], columns: ["regionCode", "name", "status", "baseFare", "commissionPercent", "currency"] },
    { key: "settlements", title: "Payments / settlements", tone: "locked" as Tone006Z, names: ["settlements", "paymentHolds", "holds", "payouts", "paymentQueue", "driverBalances", "balanceQueue"], description: "Hold/capture/release references, driver balance accounting and payout boundary", idKeys: ["settlementId", "paymentHoldId", "holdId", "driverId", "id"], statusKeys: ["status", "settlementStatus", "paymentStatus", "balanceStatus"], actions: ["payment-capture", "payment-release", "settlement-available"], columns: ["settlementId", "paymentHoldId", "driverId", "amount", "status", "currency"] },
    { key: "rewards", title: "Gifts / rewards boundary", tone: "locked" as Tone006Z, names: ["gifts", "giftRewards", "rewards", "rewardFreezeQueue", "tips", "driverRewards"], description: "Проверка подарков, чаевых и наград: выдача, заморозка и граница кошелька без поддельного вывода средств", idKeys: ["rewardId", "giftId", "settlementId", "driverId", "id"], statusKeys: ["status", "rewardStatus", "giftStatus", "freezeStatus"], actions: ["reward-freeze-review", "reward-release-review"], columns: ["rewardId", "giftId", "driverId", "amount", "status", "createdAt"] },
  ];
  return specs.map((spec) => {
    const records = extractRows006Z(dbPayload, spec.names);
    return { key: spec.key, title: spec.title, description: spec.description, tone: spec.tone, records, countFromBackend: extractCount006Z(dbPayload, spec.names, records), idKeys: spec.idKeys, statusKeys: spec.statusKeys, primaryActions: spec.actions, columns: spec.columns };
  });
}

function RecordTable006Z(props: { queue: WorkQueue006Z; selectedId: string; onSelect: (record: AnyRecord006Z) => void; onAction: (actionKey: string, record: AnyRecord006Z) => void }) {
  const { queue } = props;
  if (!queue.records.length) return <div className="taxi006ZQueueEmpty" data-admin-ui-006z-real-empty-state="true">Backend returned 0 live rows for <b>{queue.title}</b>.</div>;
  return <div className="taxi006ZTable" data-admin-ui-006z-real-data-table="true">
    <div className="taxi006ZTableHead">{queue.columns.map((col) => <span key={col}>{col}</span>)}<span>Actions</span></div>
    {queue.records.map((row, index) => {
      const rowId = id006Z(row, queue.idKeys) || String(row.__rowIndex || index + 1);
      const active = props.selectedId === `${queue.key}:${rowId}`;
      return <button type="button" key={`${queue.key}-${rowId}-${index}`} className={`taxi006ZTableRow ${active ? "active" : ""}`} onClick={() => props.onSelect(row)}>
        {queue.columns.map((col) => <span key={col}>{str006Z(row[col], col === queue.columns[0] ? rowId : "—")}</span>)}
        <span className="taxi006ZInlineActions">{queue.primaryActions.slice(0, 3).map((key) => { const action = ACTIONS006Z.find((item) => item.key === key); return <i key={key} onClick={(event) => { event.stopPropagation(); props.onAction(key, row); }}>{action?.shortTitle || key}</i>; })}</span>
      </button>;
    })}
  </div>;
}

export function TaxiAdminControl006ZPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice?: (message: string) => void }) {
  const copy = COPY006Z[props.language] || COPY006Z.ru;
  const [results, setResults] = useState<Record<string, SourceResult006Z>>({});
  const [busy, setBusy] = useState("");
  const [activeQueue, setActiveQueue] = useState("applications");
  const [selectedRecord, setSelectedRecord] = useState<AnyRecord006Z | null>(null);
  const [selectedActionKey, setSelectedActionKey] = useState("application-review");
  const [form, setForm] = useState<Record<string, string>>({ decision: "approved", suspensionType: "temporary", severity: "medium", escalationLevel: "risk", resolution: "resolved" });
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [resultKey, setResultKey] = useState("dbRead");
  const [callLog, setCallLog] = useState<SourceResult006Z[]>([]);
  const [showTechnical, setShowTechnical] = useState(false);

  const setResult = useCallback((result: SourceResult006Z) => {
    setResults((prev) => ({ ...prev, [result.key]: result }));
    setResultKey(result.key);
    setCallLog((prev) => [result, ...prev].slice(0, 60));
    props.setNotice?.(`${result.title}: ${result.status || "offline"} · ${result.message}`);
  }, [props]);

  const runSource = useCallback(async (endpoint: SourceEndpoint006Z) => {
    setBusy(endpoint.key);
    try { setResult(await call006Z(props.config, endpoint)); } finally { setBusy(""); }
  }, [props.config, setResult]);

  const refreshAll = useCallback(async (includeDbRead = true) => {
    setBusy("refresh-all");
    try {
      const keys = includeDbRead ? ["readiness", "routes", "diagnostics", "dbReadPlan", "dbRead", "dbWritePlan", "providerBoundary", "cockpit"] : ["readiness", "routes", "diagnostics", "dbReadPlan", "dbWritePlan"];
      const loaded = await Promise.all(SOURCES006Z.filter((endpoint) => keys.includes(endpoint.key)).map((endpoint) => call006Z(props.config, endpoint)));
      setResults((prev) => Object.fromEntries([...Object.entries(prev), ...loaded.map((item) => [item.key, item])]));
      setCallLog((prev) => [...loaded, ...prev].slice(0, 60));
      setResultKey(includeDbRead ? "dbRead" : "readiness");
      props.setNotice?.(`Taxi synced: ${loaded.map((item) => `${item.key}:${item.status || "offline"}`).join(" · ")}`);
    } finally { setBusy(""); }
  }, [props.config, props]);

  useEffect(() => { void refreshAll(false); }, [refreshAll]);

  const routes = useMemo(() => routesFrom006Z(results.routes), [results.routes]);
  const routeMap = useMemo(() => routeMap006Z(routes), [routes]);
  const dbPayload = results.dbRead?.payload;
  const queues = useMemo(() => makeQueues006Z(dbPayload), [dbPayload]);
  const queue = queues.find((item) => item.key === activeQueue) || queues[0];
  const action = ACTIONS006Z.find((item) => item.key === selectedActionKey) || ACTIONS006Z[0];
  const actionRoute = action ? routeMap.get(action.operationKey) : undefined;
  const selectedId = selectedRecord ? `${queue.key}:${id006Z(selectedRecord, queue.idKeys) || selectedRecord.__rowIndex || "selected"}` : "";

  const chooseRecord = useCallback((record: AnyRecord006Z, actionKey?: string) => {
    setSelectedRecord(record);
    const nextAction = ACTIONS006Z.find((item) => item.key === actionKey) || ACTIONS006Z.find((item) => item.queueKey === activeQueue) || ACTIONS006Z[0];
    setSelectedActionKey(nextAction.key);
    const patched: Record<string, string> = {};
    nextAction.fields.forEach((field) => {
      const fromRecord = field.fromRecordKeys ? firstValue006Z(record, field.fromRecordKeys) : undefined;
      if (fromRecord !== undefined) patched[field.key] = str006Z(fromRecord, "");
      else if (!form[field.key] && field.options?.length) patched[field.key] = field.options[0];
    });
    setForm((prev) => ({ ...prev, ...patched }));
  }, [activeQueue, form]);

  const chooseAction = useCallback((key: string, record?: AnyRecord006Z) => {
    const nextAction = ACTIONS006Z.find((item) => item.key === key);
    if (!nextAction) return;
    setSelectedActionKey(key);
    if (record) chooseRecord(record, key);
  }, [chooseRecord]);

  const missing = useMemo(() => {
    const misses = action.fields.filter((field) => field.required && !String(form[field.key] || "").trim()).map((field) => field.label);
    const reviewSensitive = ["applications", "drivers", "vehicles"].includes(activeQueue) || action.key.includes("reward") || action.key.includes("support") || action.key.includes("evidence");
    if (reviewSensitive) {
      REVIEW_CHECKS006Z.forEach((item) => { if (form[item.key] !== "yes") misses.push(item.label); });
    }
    if (action.requiresReason && !adminReason.trim()) misses.push(copy.reason);
    return misses;
  }, [action, activeQueue, form, adminReason, copy.reason]);

  const runAction = useCallback(async () => {
    if (!action || !actionRoute?.path || missing.length) return;
    const endpoint: SourceEndpoint006Z = {
      key: `action-${action.key}-${Date.now()}`,
      title: action.title,
      path: actionRoute.path,
      method: (actionRoute.method || "POST") as Method006Z,
      description: action.operationKey,
      body: {
        source: "admin-ui-006z",
        operationKey: action.operationKey,
        adminReason,
        ownerApprovalId,
        selectedRecordId: selectedRecord ? id006Z(selectedRecord, action.idKeys) : undefined,
        selectedRecord,
        form,
        reviewChecklist: Object.fromEntries(REVIEW_CHECKS006Z.map((item) => [item.key, form[item.key] === "yes"])),
        ...action.body,
        fakeSuccessBlocked: true,
        uiClaimedApproved: false,
        backendResponseRequired: true,
        backendStateRefreshRequired: true,
      },
    };
    setBusy(action.key);
    try {
      const result = await call006Z(props.config, endpoint);
      setResult(result);
      if (result.ok) {
        const db = SOURCES006Z.find((item) => item.key === "dbRead");
        if (db) setResult(await call006Z(props.config, db));
      }
    } finally { setBusy(""); }
  }, [action, actionRoute, adminReason, ownerApprovalId, selectedRecord, form, missing.length, props.config, setResult]);

  const totalRows = queues.reduce((sum, item) => sum + item.records.length, 0);
  const routeMatched = ACTIONS006Z.filter((item) => routeMap.has(item.operationKey)).length;
  const readinessPercent = results.readiness?.ok ? 100 : results.readiness ? 30 : 0;
  const dataPercent = totalRows ? 100 : results.dbRead?.ok ? 45 : 0;
  const writePercent = results.dbWriteGate?.ok ? 100 : 0;
  const boundaryOk = bool006Z(record006Z(results.providerBoundary?.payload).ok) || results.providerBoundary?.ok;

  return <section className="panel taxi006Z" data-admin-ui-006z-taxi-real-operations="true" data-admin-ui-006v-route-screen="taxi">
    <div className="taxi006ZHero">
      <div>
        <span>ADMIN-UI 006Z · Taxi detailed workflows · no fake success</span>
        <h2>{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>
      <aside>
        <Badge006Z tone="ready">real data first</Badge006Z>
        <Badge006Z tone="safe">row actions</Badge006Z>
        <Badge006Z tone="locked">no local approve</Badge006Z>
      </aside>
    </div>

    <div className="taxi006ZNoFake">{copy.noFake}</div>

    <div className="taxi006ZToolbar">
      <button type="button" onClick={() => void refreshAll(true)} disabled={Boolean(busy)}>{busy === "refresh-all" ? "Syncing..." : copy.refresh}</button>
      <button type="button" onClick={() => void runSource(SOURCES006Z.find((item) => item.key === "dbRead")!)} disabled={Boolean(busy)}>{copy.loadData}</button>
      {SOURCES006Z.filter((item) => item.key !== "dbRead").map((endpoint) => <button key={endpoint.key} type="button" onClick={() => void runSource(endpoint)} disabled={Boolean(busy)}>{endpoint.title}</button>)}
    </div>

    <div className="taxi006ZScoreGrid" data-admin-ui-006z-growth-scales="true">
      <article><span>Foundation</span><strong>{results.readiness?.status || "—"}</strong><small>{results.readiness?.message || "load readiness"}</small><Bar006Z value={readinessPercent} tone={results.readiness?.tone || "info"} /></article>
      <article><span>Live rows</span><strong>{totalRows}</strong><small>from read-only backend data</small><Bar006Z value={dataPercent} tone={totalRows ? "ready" : "warn"} /></article>
      <article><span>Action routes</span><strong>{routeMatched}/{ACTIONS006Z.length}</strong><small>matched against /api/taxi/002n/routes</small><Bar006Z value={Math.round((routeMatched / ACTIONS006Z.length) * 100)} tone={routeMatched ? "ready" : "warn"} /></article>
      <article><span>Approve / write</span><strong>{results.dbWriteGate?.status || "locked"}</strong><small>{results.dbWriteGate?.message || "backend gate controls real mutation"}</small><Bar006Z value={writePercent} tone={results.dbWriteGate?.tone || "locked"} /></article>
      <article><span>Provider boundary</span><strong>{boundaryOk ? "checked" : results.providerBoundary?.status || "—"}</strong><small>{results.providerBoundary?.message || "provider / Wallet never enabled here"}</small><Bar006Z value={boundaryOk ? 100 : 35} tone={results.providerBoundary?.tone || "info"} /></article>
    </div>

    <section className="card taxi006ZQueues" data-admin-ui-006z-management-queues="true">
      <header className="taxi006ZSectionHeader"><div><h3>{copy.queues}</h3><p>Выбираешь очередь → видишь реальные строки сервера → нажимаешь действие в строке → справа подтверждаешь причину и отправляешь серверное действие.</p></div><Badge006Z tone={results.dbRead?.ok ? "ready" : "locked"}>{results.dbRead?.status || "data not loaded"}</Badge006Z></header>
      <div className="taxi006ZQueueTabs">
        {queues.map((item) => <button type="button" key={item.key} className={activeQueue === item.key ? "active" : ""} onClick={() => { setActiveQueue(item.key); setSelectedRecord(null); const firstAction = ACTIONS006Z.find((actionItem) => actionItem.queueKey === item.key); if (firstAction) setSelectedActionKey(firstAction.key); }}><strong>{item.title}</strong><span>{item.countFromBackend}</span><small>{item.description}</small></button>)}
      </div>
      <RecordTable006Z queue={queue} selectedId={selectedId} onSelect={(record) => chooseRecord(record)} onAction={(actionKey, record) => chooseAction(actionKey, record)} />
      {!queue.records.length ? <p className="taxi006ZEmpty">{copy.empty}</p> : null}
    </section>

    <WorkflowBoard006Z queues={queues} results={results} selectedRecord={selectedRecord} />

    <Dossier006Z record={selectedRecord} queueKey={activeQueue} form={form} setForm={setForm} />

    <div className="taxi006ZMainGrid">
      <section className="card taxi006ZExecutor" data-admin-ui-006z-approval-workbench="true">
        <header className="taxi006ZSectionHeader"><div><h3>{copy.selected}</h3><p>{selectedRecord ? `Selected ${queue.title}: ${id006Z(selectedRecord, queue.idKeys) || "record"}` : "Select a row from a work queue, then choose an action."}</p></div><Badge006Z tone={actionRoute ? action.tone : "locked"}>{actionRoute ? `${actionRoute.method || "POST"} ${actionRoute.path || "route"}` : "route missing"}</Badge006Z></header>
        <div className="taxi006ZActionTabs">
          {ACTIONS006Z.filter((item) => item.queueKey === activeQueue).map((item) => <button type="button" key={item.key} className={selectedActionKey === item.key ? "active" : ""} onClick={() => setSelectedActionKey(item.key)}>{item.shortTitle}</button>)}
        </div>
        <div className="taxi006ZRecordPreview">
          <strong>{action.title}</strong>
          <small>{action.operationKey}</small>
          {selectedRecord ? <pre>{pretty006Z(selectedRecord)}</pre> : <p className="taxi006ZEmpty">No selected record. You can still fill fields manually only when backend exposes the route.</p>}
        </div>
        <div className="taxi006ZForm">
          {action.fields.map((field) => <label key={field.key}><span>{field.label}{field.required ? " *" : ""}</span>{field.type === "textarea" ? <textarea value={form[field.key] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))} placeholder={field.placeholder || field.key} /> : field.type === "select" ? <select value={form[field.key] || field.options?.[0] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}>{(field.options || []).map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type === "number" ? "number" : "text"} value={form[field.key] || ""} onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))} placeholder={field.placeholder || field.key} />}</label>)}
          <label><span>{copy.reason} *</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="Required: why this action is needed" /></label>
          <label><span>Owner approval ID</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="optional unless backend requires exact approval" /></label>
        </div>
        {missing.length ? <div className="taxi006ZWarning">Заполни: {missing.join(", ")}</div> : null}
        {!actionRoute ? <div className="taxi006ZWarning">{copy.routeMissing}</div> : null}
        <button type="button" className="taxi006ZRun" disabled={Boolean(busy) || !actionRoute || missing.length > 0} onClick={() => void runAction()}>{busy === action.key ? "Running..." : copy.execute}</button>
      </section>

      <section className="card taxi006ZReports" data-admin-ui-006z-reports="true">
        <h3>{copy.reports}</h3>
        <div className="taxi006ZGrowthBars">
          {queues.map((item) => {
            const count = Number(item.records.length || item.countFromBackend || 0);
            const max = Math.max(1, ...queues.map((q) => Number(q.records.length || q.countFromBackend || 0)));
            return <article key={item.key}><header><strong>{item.title}</strong><span>{item.countFromBackend}</span></header><Bar006Z value={Math.round((count / max) * 100)} tone={item.tone} /><small>{item.description}</small></article>;
          })}
        </div>
        <h4>{copy.lastResponse}</h4>
        <SourceResultPanel006Z result={results[resultKey] || callLog[0]} />
      </section>
    </div>

    <div className="taxi006ZMainGrid">
      <section className="card taxi006ZSources" data-admin-ui-006z-live-sources="true">
        <h3>{copy.sources}</h3>
        <div className="taxi006ZSourceList">
          {SOURCES006Z.map((endpoint) => <button type="button" key={endpoint.key} className={resultKey === endpoint.key ? "active" : ""} onClick={() => setResultKey(endpoint.key)}><div><strong>{endpoint.title}</strong><small>{endpoint.method} {endpoint.path}</small><p>{endpoint.description}</p></div><Badge006Z tone={results[endpoint.key]?.tone}>{results[endpoint.key]?.status || "not loaded"}</Badge006Z></button>)}
        </div>
      </section>
      <section className="card taxi006ZSources">
        <h3>Action log</h3>
        <div className="taxi006ZLog" data-admin-ui-006z-action-log="true">
          {callLog.length ? callLog.map((item) => <article key={`${item.key}-${item.at}`}><Badge006Z tone={item.tone}>{item.status || "offline"}</Badge006Z><div><strong>{item.title}</strong><small>{item.method} {item.path}</small><p>{item.message}</p></div></article>) : <p className="taxi006ZEmpty">No backend calls yet.</p>}
        </div>
      </section>
    </div>

    <details className="taxi006ZTechnical" open={showTechnical} onToggle={(event) => setShowTechnical((event.currentTarget as HTMLDetailsElement).open)}>
      <summary>{copy.technical} · routes {routes.length} · old foundation preserved</summary>
      <div className="taxi006ZRouteList">
        {routes.slice(0, 160).map((route, index) => <article key={`${route.operationKey || route.path || index}`}><strong>{route.operationKey || route.key || "route"}</strong><small>{route.method || "GET"} {route.path || "—"}</small><Badge006Z tone={route.safeDisabledUntilNextStage ? "locked" : "ready"}>{route.safeDisabledUntilNextStage ? "safe-disabled" : "ready"}</Badge006Z></article>)}
      </div>
      <TaxiAdminControl006XPanel language={props.language} config={props.config} setNotice={props.setNotice} />
    </details>
  </section>;
}
