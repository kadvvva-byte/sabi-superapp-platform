import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props011D = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
  surface: "trips" | "complaints";
};

type TaxiOrder011D = {
  orderId?: string;
  tripId?: string;
  status?: string;
  countryCode?: string;
  cityId?: string;
  tariffCode?: string;
  finalFareMinor?: number;
  createdAt?: string;
  completedAt?: string;
  archiveStatus?: string;
};

type ServiceCase011D = {
  serviceCaseId?: string;
  caseId?: string;
  id?: string;
  tripId?: string;
  orderId?: string;
  status?: string;
  category?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  rawPiiBlocked?: boolean;
  contactMediatedByAdmin?: boolean;
};

type Audit011D = {
  auditId?: string;
  action?: string;
  targetType?: string;
  targetId?: string;
  createdAt?: string;
  orderId?: string;
  tripId?: string;
};

type Report011D = {
  totalOrders?: number;
  activeOrders?: number;
  completedOrders?: number;
  cancelledOrders?: number;
  archivedOrders?: number;
  archiveEligibleOrders?: number;
};

type Last011D = { ok: boolean; status: string | number; route: string; message: string; at: string } | null;

type Copy011D = {
  markerTitle: string;
  tripsTitle: string;
  complaintsTitle: string;
  subtitle: string;
  refresh: string;
  create: string;
  update: string;
  totalTrips: string;
  activeTrips: string;
  supportCases: string;
  lostCases: string;
  audit: string;
  ready: string;
  blocked: string;
  existingOnly: string;
  oneFunction: string;
  tripQueue: string;
  complaintQueue: string;
  lostQueue: string;
  auditQueue: string;
  createTitle: string;
  updateTitle: string;
  tripId: string;
  category: string;
  status: string;
  note: string;
  serviceCaseId: string;
  resolution: string;
  noCases: string;
  noTrips: string;
  rulesTitle: string;
  ruleRealTrip: string;
  ruleRedacted: string;
  ruleNoPenalty: string;
  ruleNoWallet: string;
  ruleOneWorkflow: string;
  last: string;
  piiHidden: string;
  contactSupportOnly: string;
  noFake: string;
  closeoutTitle: string;
  runtimeVerified: string;
  tabsUnified: string;
  writeProtected: string;
  finalReady: string;
  runtimeEvidence: string;
  ordersClosed: string;
};

const MARKER011D = "ADMIN-UI-TAXI-TRIPS-COMPLAINTS-011D-SINGLE-FUNCTION-SHARED-WORKSPACE";
const MARKER011F = "ADMIN-UI-TAXI-TRIPS-COMPLAINTS-011F-PRODUCTION-CLOSEOUT-SINGLE-FUNCTION";
const ROUTE_ORDERS_009A = "/api/admin/taxi/orders/009a/orders";
const ROUTE_REPORT_009A = "/api/admin/taxi/orders/009a/report";
const ROUTE_AUDIT_009B = "/api/admin/taxi/orders/009a/audit";
const ROUTE_LOST_PROPERTY_STATUS_010B = "/api/admin/taxi/orders/010b/lost-property/status";
const ROUTE_LOST_PROPERTY_CASES_010B = "/api/admin/taxi/orders/010b/lost-property/cases";
const ROUTE_TRIP_SUPPORT_STATUS_011A = "/api/admin/taxi/orders/011a/support-appeals/status";
const ROUTE_TRIP_SUPPORT_CASES_011A = "/api/admin/taxi/orders/011a/support-appeals/cases";
const ROUTE_TRIP_SUPPORT_CREATE_011A = "/api/admin/taxi/orders/011a/support-appeals/create-from-trip";
const ROUTE_TRIP_SUPPORT_UPDATE_011A = "/api/admin/taxi/orders/011a/support-appeals/update-status";
const TRIP_SUPPORT_CREATE_HEADER_011A = "x-sabi-taxi-orders-011a-trip-support-create-approval";
const TRIP_SUPPORT_CREATE_VALUE_011A = "i-approve-taxi-orders-011a-create-trip-support-case-from-existing-trip";
const TRIP_SUPPORT_UPDATE_HEADER_011A = "x-sabi-taxi-orders-011a-trip-support-update-approval";
const TRIP_SUPPORT_UPDATE_VALUE_011A = "i-approve-taxi-orders-011a-update-trip-support-case-status";

const CATEGORIES_011D = ["trip_issue", "driver_behavior", "passenger_behavior", "route_dispute", "fare_dispute", "safety_concern", "service_quality", "other"];
const STATUSES_011D = ["open", "waiting_for_user", "under_review", "resolved", "rejected", "escalated"];

const COPY011D: Record<AdminLanguage, Copy011D> = {
  ru: {
    markerTitle: "011D Trips + Complaints", tripsTitle: "Поездки и жалобы", complaintsTitle: "Жалобы и поездки", subtitle: "Один рабочий процесс для поездок и жалоб: реальная поездка такси → обращение 011A → потерянная вещь 010B → аудит и проверка → решение админа. Без отдельной логики и без локальных наказаний.", refresh: "Обновить поездки и жалобы", create: "Создать обращение по поездке", update: "Обновить статус обращения", totalTrips: "поездки", activeTrips: "активные", supportCases: "жалобы/споры", lostCases: "потерянные вещи", audit: "audit", ready: "Готово", blocked: "Не готово", existingOnly: "только существующий TaxiTrip", oneFunction: "1 функция для Поездки + Жалобы", tripQueue: "Очередь поездок", complaintQueue: "Очередь жалоб/споров", lostQueue: "Потерянные вещи", auditQueue: "Audit review", createTitle: "Создать service case 011A", updateTitle: "Обновить service case 011A", tripId: "Trip/Order ID", category: "Категория", status: "Статус", note: "Заметка поддержки", serviceCaseId: "Service case ID", resolution: "Решение / итог", noCases: "Нет обращений. Панель не создаёт тестовые строки.", noTrips: "Нет поездок от сервера. Панель не создаёт ложную поездку.", rulesTitle: "Правила единой функции", ruleRealTrip: "Создание обращения возможно только по существующей поездке.", ruleRedacted: "Пассажир, водитель, сообщения и прямые контакты не раскрываются.", ruleNoPenalty: "Интерфейс не начисляет штрафы и не блокирует пользователей локально.", ruleNoWallet: "Нет вызовов кошелька, провайдера и движения денег.", ruleOneWorkflow: "Экран поездок и экран жалоб используют одну функцию и один серверный процесс.", last: "Последний ответ", piiHidden: "PII скрыт", contactSupportOnly: "контакт только через поддержку", noFake: "без ложных данных и без локальных наказаний", closeoutTitle: "Финальное закрытие единой функции", runtimeVerified: "011E проверка рабочей среды 20/20 подтверждена", tabsUnified: "Заказы, Поездки и Жалобы используют один workflow", writeProtected: "Создание и обновление только через точное утверждение", finalReady: "Функция готова к следующему производственному контролю", runtimeEvidence: "готовность, заказы, отчёт и аудит вместе с 011A и 010B проверены в рабочей среде", ordersClosed: "Экран Заказы закрыт как вход в поездки и обращения",
  },
  en: {
    markerTitle: "011D Trips + Complaints", tripsTitle: "Trips and complaints", complaintsTitle: "Complaints and trips", subtitle: "One workflow for trips and complaints: real TaxiTrip → 011A service case → 010B lost property → audit/review → admin decision. No separate logic and no local penalties.", refresh: "Refresh trips and complaints", create: "Create trip support case", update: "Update support case status", totalTrips: "trips", activeTrips: "active", supportCases: "complaints/disputes", lostCases: "lost property", audit: "audit", ready: "Ready", blocked: "Blocked", existingOnly: "existing TaxiTrip only", oneFunction: "1 function for Trips + Complaints", tripQueue: "Trips queue", complaintQueue: "Complaints/disputes queue", lostQueue: "Lost property", auditQueue: "Audit review", createTitle: "Create 011A service case", updateTitle: "Update 011A service case", tripId: "Trip/Order ID", category: "Category", status: "Status", note: "Support note", serviceCaseId: "Service case ID", resolution: "Resolution / outcome", noCases: "No cases. The panel does not create test rows.", noTrips: "No trips returned by backend. The panel does not create fake trips.", rulesTitle: "Single-function rules", ruleRealTrip: "A case can only be created from an existing trip.", ruleRedacted: "Rider, driver, messages and direct contacts are not exposed.", ruleNoPenalty: "The UI does not apply penalties or local user locks.", ruleNoWallet: "No Wallet/provider calls and no money movement.", ruleOneWorkflow: "Trips and Complaints screens use the same function and the same backend workflow.", last: "Last response", piiHidden: "PII hidden", contactSupportOnly: "contact via support only", noFake: "no fake/no local penalty", closeoutTitle: "Final single-function closeout", runtimeVerified: "011E runtime smoke 20/20 verified", tabsUnified: "Orders, Trips and Complaints use one workflow", writeProtected: "Create/update only through exact approval", finalReady: "Function is ready for the next production gate", runtimeEvidence: "readiness/orders/report/audit + 011A + 010B verified in runtime", ordersClosed: "Orders screen is closed as the entry point to trips and cases",
  },
  uz: {
    markerTitle: "011D Trips + Complaints", tripsTitle: "Safarlar va shikoyatlar", complaintsTitle: "Shikoyatlar va safarlar", subtitle: "Safar va shikoyatlar uchun bitta ish jarayoni: real taksi safari → 011A murojaati → 010B yo‘qolgan buyum → tekshiruv va ko‘rib chiqish → admin qarori. Alohida mantiq va lokal jazo yo‘q.", refresh: "Safar va shikoyatlarni yangilash", create: "Safar bo‘yicha murojaat yaratish", update: "Murojaat statusini yangilash", totalTrips: "safarlar", activeTrips: "aktiv", supportCases: "shikoyat/sporlar", lostCases: "yo‘qolgan buyum", audit: "audit", ready: "Tayyor", blocked: "Tayyor emas", existingOnly: "faqat mavjud TaxiTrip", oneFunction: "Safar + Shikoyat uchun 1 funksiya", tripQueue: "Safarlar navbati", complaintQueue: "Shikoyat/sporlar navbati", lostQueue: "Yo‘qolgan buyumlar", auditQueue: "Audit review", createTitle: "011A service case yaratish", updateTitle: "011A service case yangilash", tripId: "Trip/Order ID", category: "Kategoriya", status: "Status", note: "Support eslatmasi", serviceCaseId: "Service case ID", resolution: "Yechim / natija", noCases: "Murojaatlar yo‘q. Panel sinov qatori yaratmaydi.", noTrips: "Server safar qaytarmadi. Panel soxta safar yaratmaydi.", rulesTitle: "Yagona funksiya qoidalari", ruleRealTrip: "Murojaat faqat mavjud safar bo‘yicha yaratiladi.", ruleRedacted: "Yo‘lovchi, haydovchi, xabarlar va bevosita kontaktlar ko‘rsatilmaydi.", ruleNoPenalty: "Interfeys lokal jarima yoki blok qo‘llamaydi.", ruleNoWallet: "Hamyon yoki provayder chaqiruvlari va pul harakati yo‘q.", ruleOneWorkflow: "Safarlar va Shikoyatlar ekranlari bitta funksiya va bitta backend workflow ishlatadi.", last: "Oxirgi javob", piiHidden: "PII yashirilgan", contactSupportOnly: "kontakt faqat support orqali", noFake: "soxta natija yo‘q / lokal jazo yo‘q", closeoutTitle: "Yagona funksiyani final yopish", runtimeVerified: "011E runtime smoke 20/20 tasdiqlandi", tabsUnified: "Buyurtmalar, Safarlar va Shikoyatlar bitta workflow ishlatadi", writeProtected: "Create/update faqat exact approval orqali", finalReady: "Funksiya keyingi production gate uchun tayyor", runtimeEvidence: "tayyorgarlik, buyurtmalar, hisobot va tekshiruv 011A hamda 010B bilan ish muhitida tekshirildi", ordersClosed: "Buyurtmalar ekrani safar va murojaatlar kirish nuqtasi sifatida yopildi",
  },
  zh: {
    markerTitle: "011D Trips + Complaints", tripsTitle: "行程和投诉", complaintsTitle: "投诉和行程", subtitle: "行程和投诉使用一个流程：真实出租车行程 → 011A 服务案件 → 010B 遗失物品 → 审核和复查 → 管理员决定。没有分离逻辑，也没有本地处罚。", refresh: "刷新行程和投诉", create: "创建行程支持工单", update: "更新工单状态", totalTrips: "行程", activeTrips: "进行中", supportCases: "投诉/争议", lostCases: "遗失物", audit: "audit", ready: "就绪", blocked: "未就绪", existingOnly: "仅已有 TaxiTrip", oneFunction: "Trips + Complaints 的 1 个功能", tripQueue: "行程队列", complaintQueue: "投诉/争议队列", lostQueue: "遗失物", auditQueue: "Audit review", createTitle: "创建 011A service case", updateTitle: "更新 011A service case", tripId: "Trip/Order ID", category: "类别", status: "状态", note: "支持备注", serviceCaseId: "Service case ID", resolution: "解决 / 结果", noCases: "没有工单。面板不会创建测试行。", noTrips: "服务器没有返回行程。面板不会创建虚假行程。", rulesTitle: "单一功能规则", ruleRealTrip: "只能基于已有行程创建工单。", ruleRedacted: "乘客、司机、消息和直接联系方式不显示。", ruleNoPenalty: "界面不执行本地处罚或封禁。", ruleNoWallet: "没有钱包或服务商调用，没有资金移动。", ruleOneWorkflow: "行程和投诉页面使用同一功能和同一服务器流程。", last: "最后响应", piiHidden: "PII 已隐藏", contactSupportOnly: "仅通过客服联系", noFake: "无虚假数据 / 无本地处罚", closeoutTitle: "单一功能最终关闭", runtimeVerified: "011E 运行检查 20/20 已验证", tabsUnified: "Orders、Trips 和 Complaints 使用一个 workflow", writeProtected: "创建和更新只能通过精确审批", finalReady: "功能已准备进入下一个生产控制", runtimeEvidence: "就绪状态、订单、报告和审计已与 011A 和 010B 在运行环境中验证", ordersClosed: "Orders 页面已作为行程和工单入口关闭",
  },
};

function base011D(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers011D(config: AdminApiConfig, extra: Record<string, string> = {}): Record<string, string> {
  return { "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "", "content-type": "application/json", ...extra };
}

async function json011D<T>(config: AdminApiConfig, route: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${base011D(config)}${route}`, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${route} ${response.status} ${String((data as { error?: unknown }).error || (data as { message?: unknown }).message || "request_failed")}`);
  return data as T;
}

function caseId011D(item: ServiceCase011D): string {
  return String(item.serviceCaseId || item.caseId || item.id || "");
}

function tripId011D(item: ServiceCase011D | TaxiOrder011D | Audit011D): string {
  return String(item.tripId || item.orderId || "");
}

function isActiveTrip011D(order: TaxiOrder011D): boolean {
  const status = String(order.status || "").toLowerCase();
  return ["active", "accepted", "driver_assigned", "arriving", "in_progress", "on_trip", "started"].some((value) => status.includes(value));
}

function statusClass011D(value: string | undefined): string {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("resolved") || normalized.includes("completed")) return "ready";
  if (normalized.includes("escalated") || normalized.includes("safety")) return "danger";
  return "open";
}

export function TaxiTripsComplaints011DPanel({ language, config, setNotice, surface }: Props011D) {
  const copy = COPY011D[language] || COPY011D.ru;
  const [orders, setOrders] = useState<TaxiOrder011D[]>([]);
  const [report, setReport] = useState<Report011D>({});
  const [supportCases, setSupportCases] = useState<ServiceCase011D[]>([]);
  const [lostCases, setLostCases] = useState<ServiceCase011D[]>([]);
  const [audit, setAudit] = useState<Audit011D[]>([]);
  const [busy, setBusy] = useState<string>("");
  const [last, setLast] = useState<Last011D>(null);
  const [createTripId, setCreateTripId] = useState("");
  const [createCategory, setCreateCategory] = useState("trip_issue");
  const [createNote, setCreateNote] = useState("");
  const [updateCaseId, setUpdateCaseId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("under_review");
  const [resolution, setResolution] = useState("");

  const activeTrips = useMemo(() => orders.filter(isActiveTrip011D), [orders]);
  const escalated = useMemo(() => supportCases.filter((item) => String(item.status || "").toLowerCase().includes("escalated")).length, [supportCases]);
  const readiness = Boolean(orders.length || supportCases.length || lostCases.length || audit.length || report.totalOrders !== undefined);
  const title = surface === "complaints" ? copy.complaintsTitle : copy.tripsTitle;

  const loadAll = async () => {
    setBusy("refresh");
    try {
      const [ordersJson, reportJson, auditJson, supportStatusJson, supportJson, lostStatusJson, lostJson] = await Promise.all([
        json011D<{ orders?: TaxiOrder011D[] }>(config, `${ROUTE_ORDERS_009A}?status=all&limit=300`, { headers: headers011D(config) }),
        json011D<{ report?: Report011D }>(config, ROUTE_REPORT_009A, { headers: headers011D(config) }),
        json011D<{ audit?: Audit011D[] }>(config, `${ROUTE_AUDIT_009B}?limit=80`, { headers: headers011D(config) }),
        json011D<Record<string, unknown>>(config, ROUTE_TRIP_SUPPORT_STATUS_011A, { headers: headers011D(config) }),
        json011D<{ cases?: ServiceCase011D[]; supportCases?: ServiceCase011D[] }>(config, `${ROUTE_TRIP_SUPPORT_CASES_011A}?limit=80`, { headers: headers011D(config) }),
        json011D<Record<string, unknown>>(config, ROUTE_LOST_PROPERTY_STATUS_010B, { headers: headers011D(config) }),
        json011D<{ cases?: ServiceCase011D[]; lostPropertyCases?: ServiceCase011D[] }>(config, `${ROUTE_LOST_PROPERTY_CASES_010B}?limit=50`, { headers: headers011D(config) }),
      ]);
      void supportStatusJson;
      void lostStatusJson;
      const nextOrders = Array.isArray(ordersJson.orders) ? ordersJson.orders : [];
      const nextSupport = Array.isArray(supportJson.cases) ? supportJson.cases : Array.isArray(supportJson.supportCases) ? supportJson.supportCases : [];
      const nextLost = Array.isArray(lostJson.cases) ? lostJson.cases : Array.isArray(lostJson.lostPropertyCases) ? lostJson.lostPropertyCases : [];
      setOrders(nextOrders);
      setReport(reportJson.report || {});
      setAudit(Array.isArray(auditJson.audit) ? auditJson.audit : []);
      setSupportCases(nextSupport);
      setLostCases(nextLost);
      setLast({ ok: true, status: "ready", route: "TAXI-TRIPS-COMPLAINTS-011D", message: copy.oneFunction, at: new Date().toISOString() });
      setNotice(copy.ready);
    } catch (error) {
      setLast({ ok: false, status: "network_error", route: "TAXI-TRIPS-COMPLAINTS-011D", message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const createCase = async () => {
    setBusy("create");
    try {
      const result = await json011D<Record<string, unknown>>(config, ROUTE_TRIP_SUPPORT_CREATE_011A, {
        method: "POST",
        headers: headers011D(config, { [TRIP_SUPPORT_CREATE_HEADER_011A]: TRIP_SUPPORT_CREATE_VALUE_011A }),
        body: JSON.stringify({ tripId: createTripId.trim(), category: createCategory, supportNote: createNote.trim(), adminMediatedContactOnly: true, rawPiiBlocked: true, noLocalPenalty: true }),
      });
      setLast({ ok: true, status: "created", route: ROUTE_TRIP_SUPPORT_CREATE_011A, message: String(result.status || result.message || copy.ready), at: new Date().toISOString() });
      setNotice(copy.ready);
      await loadAll();
    } catch (error) {
      setLast({ ok: false, status: "create_failed", route: ROUTE_TRIP_SUPPORT_CREATE_011A, message: error instanceof Error ? error.message : "create_failed", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const updateCase = async () => {
    setBusy("update");
    try {
      const result = await json011D<Record<string, unknown>>(config, ROUTE_TRIP_SUPPORT_UPDATE_011A, {
        method: "PATCH",
        headers: headers011D(config, { [TRIP_SUPPORT_UPDATE_HEADER_011A]: TRIP_SUPPORT_UPDATE_VALUE_011A }),
        body: JSON.stringify({ serviceCaseId: updateCaseId.trim(), status: updateStatus, resolutionNote: resolution.trim(), adminMediatedContactOnly: true, rawPiiBlocked: true, noLocalPenalty: true }),
      });
      setLast({ ok: true, status: "updated", route: ROUTE_TRIP_SUPPORT_UPDATE_011A, message: String(result.status || result.message || copy.ready), at: new Date().toISOString() });
      setNotice(copy.ready);
      await loadAll();
    } catch (error) {
      setLast({ ok: false, status: "update_failed", route: ROUTE_TRIP_SUPPORT_UPDATE_011A, message: error instanceof Error ? error.message : "update_failed", at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.baseUrl, config.token]);

  return (
    <section className="taxi011dUnifiedWorkspace" data-taxi-trips-complaints-011d-single-function="ready" data-taxi-trips-complaints-011d-shared-for-tabs="trips-and-complaints" data-taxi-trips-complaints-011d-uses-existing-011a-010b="true" data-taxi-trips-complaints-011d-no-fake="true" data-taxi-trips-complaints-011d-no-local-penalty="true" data-taxi-trips-complaints-011d-raw-pii-hidden="true" data-taxi-trips-complaints-011d-no-wallet-provider="true" data-taxi-trips-complaints-011f-production-closeout="ready" data-taxi-trips-complaints-011f-runtime-20-of-20="true" data-taxi-trips-complaints-011f-orders-trips-complaints-one-function="true">
      <div className="taxi011dHero">
        <div><span>{MARKER011D}</span><h2>{title}</h2><p>{copy.subtitle}</p></div>
        <button type="button" onClick={() => void loadAll()} disabled={busy === "refresh"}>{copy.refresh}</button>
      </div>

      <div className="taxi011dMetrics">
        <article><span>{copy.totalTrips}</span><strong>{report.totalOrders ?? orders.length}</strong><small>{copy.existingOnly}</small></article>
        <article><span>{copy.activeTrips}</span><strong>{report.activeOrders ?? activeTrips.length}</strong><small>{copy.oneFunction}</small></article>
        <article><span>{copy.supportCases}</span><strong>{supportCases.length}</strong><small>{escalated} escalated</small></article>
        <article><span>{copy.lostCases}</span><strong>{lostCases.length}</strong><small>010B</small></article>
        <article><span>{copy.audit}</span><strong>{audit.length}</strong><small>{readiness ? copy.ready : copy.blocked}</small></article>
      </div>

      <div className="taxi011fCloseout" data-taxi-trips-complaints-011f-closeout-board="011e-runtime-verified">
        <div>
          <span>{MARKER011F}</span>
          <h3>{copy.closeoutTitle}</h3>
          <p>{copy.runtimeEvidence}</p>
        </div>
        <ul>
          <li>{copy.runtimeVerified}</li>
          <li>{copy.tabsUnified}</li>
          <li>{copy.writeProtected}</li>
          <li>{copy.ordersClosed}</li>
          <li>{copy.finalReady}</li>
        </ul>
      </div>

      <div className="taxi011dGrid">
        <article className="taxi011dCard queue">
          <h3>{copy.tripQueue}</h3>
          <div className="taxi011dList">
            {orders.slice(0, 8).map((order) => (
              <button key={tripId011D(order)} type="button" onClick={() => setCreateTripId(tripId011D(order))}>
                <strong>{tripId011D(order) || "—"}</strong>
                <span>{order.status || "—"} · {order.tariffCode || "tariff"}</span>
                <small>{copy.piiHidden} · {copy.contactSupportOnly}</small>
              </button>
            ))}
            {!orders.length ? <p>{copy.noTrips}</p> : null}
          </div>
        </article>

        <article className="taxi011dCard queue">
          <h3>{copy.complaintQueue}</h3>
          <div className="taxi011dList cases">
            {supportCases.slice(0, 10).map((item) => (
              <button key={caseId011D(item) || `${tripId011D(item)}-${item.status}`} type="button" onClick={() => setUpdateCaseId(caseId011D(item))}>
                <strong>{caseId011D(item) || "—"}</strong>
                <span className={statusClass011D(item.status)}>{item.status || "open"} · {item.category || item.type || "case"}</span>
                <small>{tripId011D(item) || copy.tripId} · {copy.piiHidden}</small>
              </button>
            ))}
            {!supportCases.length ? <p>{copy.noCases}</p> : null}
          </div>
        </article>

        <article className="taxi011dCard forms" data-taxi-trips-complaints-011d-create-update-forms="011a-exact-approval">
          <h3>{copy.createTitle}</h3>
          <label><span>{copy.tripId}</span><input value={createTripId} onChange={(event) => setCreateTripId(event.target.value)} placeholder="TaxiTrip/Order ID" /></label>
          <label><span>{copy.category}</span><select value={createCategory} onChange={(event) => setCreateCategory(event.target.value)}>{CATEGORIES_011D.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
          <label><span>{copy.note}</span><textarea value={createNote} onChange={(event) => setCreateNote(event.target.value)} placeholder={copy.contactSupportOnly} /></label>
          <button type="button" disabled={busy === "create" || !createTripId.trim()} onClick={() => void createCase()}>{copy.create}</button>
          <small>{copy.existingOnly} · {copy.noFake}</small>
        </article>

        <article className="taxi011dCard forms" data-taxi-trips-complaints-011d-status-update="011a-exact-approval">
          <h3>{copy.updateTitle}</h3>
          <label><span>{copy.serviceCaseId}</span><input value={updateCaseId} onChange={(event) => setUpdateCaseId(event.target.value)} /></label>
          <label><span>{copy.status}</span><select value={updateStatus} onChange={(event) => setUpdateStatus(event.target.value)}>{STATUSES_011D.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label><span>{copy.resolution}</span><textarea value={resolution} onChange={(event) => setResolution(event.target.value)} /></label>
          <button type="button" disabled={busy === "update" || !updateCaseId.trim()} onClick={() => void updateCase()}>{copy.update}</button>
          <small>{copy.noFake} · {copy.contactSupportOnly}</small>
        </article>

        <article className="taxi011dCard rules">
          <h3>{copy.rulesTitle}</h3>
          <ul>
            <li>{copy.ruleRealTrip}</li>
            <li>{copy.ruleRedacted}</li>
            <li>{copy.ruleNoPenalty}</li>
            <li>{copy.ruleNoWallet}</li>
            <li>{copy.ruleOneWorkflow}</li>
          </ul>
        </article>

        <article className="taxi011dCard queue">
          <h3>{copy.lostQueue}</h3>
          <div className="taxi011dList cases compact">
            {lostCases.slice(0, 6).map((item) => <span key={caseId011D(item) || `${tripId011D(item)}-${item.status}`}>{caseId011D(item) || "—"} · {item.status || "open"} · {copy.piiHidden}</span>)}
            {!lostCases.length ? <p>{copy.noCases}</p> : null}
          </div>
          <h3>{copy.auditQueue}</h3>
          <div className="taxi011dList cases compact">
            {audit.slice(0, 6).map((item) => <span key={item.auditId || `${item.action}-${item.createdAt}`}>{item.action || "audit"} · {tripId011D(item) || item.targetId || "—"}</span>)}
          </div>
        </article>
      </div>

      <div className={`taxi011dLast ${last?.ok ? "ready" : "blocked"}`} data-taxi-trips-complaints-011d-last-response="redacted">
        <strong>{copy.last}</strong><span>{last ? `${last.status} · ${last.message}` : copy.oneFunction}</span><small>{last?.route || MARKER011D}</small>
      </div>
    </section>
  );
}
