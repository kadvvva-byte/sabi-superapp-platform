import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";
import { TaxiTariffs008APanel } from "./TaxiTariffs008A";
import { TaxiOrders009APanel } from "./TaxiOrders009A";
import { TaxiAdminRemainingOps026DPanel, type TaxiAdminRemainingTab026D } from "./TaxiAdminRemainingOps026D";
import { TaxiAdminComplaints027L } from "./TaxiAdminComplaints027L";
import { TaxiAdminAgentDirectory034EPanel } from "./TaxiAdminAgentDirectory034E";
import { TaxiAdminAgentRequest034JPanel } from "./TaxiAdminAgentRequest034J";
import { TaxiAdminWalletPaymentPayoutOwnerExactApproval035HPanel } from "./TaxiAdminWalletPaymentPayoutOwnerExactApproval035H";
import { TaxiAdminWalletPaymentPayoutDecisionGate035KPanel } from "./TaxiAdminWalletPaymentPayoutDecisionGate035K";
import { TaxiAdminWalletPaymentPayoutExecutionPreflight035MPanel } from "./TaxiAdminWalletPaymentPayoutExecutionPreflight035M";
import { TaxiAdminWalletPaymentPayoutExecutionLayerSplit035OPanel } from "./TaxiAdminWalletPaymentPayoutExecutionLayerSplit035O";
import { TaxiAdminWalletPaymentPayoutOwnerApprovalMega035Q035SPanel } from "./TaxiAdminWalletPaymentPayoutOwnerApprovalMega035Q035S";
import { TaxiAdminWalletPaymentPayoutExecutionRuntimeGate035UPanel } from "./TaxiAdminWalletPaymentPayoutExecutionRuntimeGate035U";
import { TaxiAdminWalletPaymentPayoutFinalLockSelection035VPanel } from "./TaxiAdminWalletPaymentPayoutFinalLockSelection035V";
import "./taxi-admin-remaining-ops026d.css";

type Props007Z = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Tab007Z = "applications" | "drivers" | "vehicles" | "finance" | "tariffs" | "orders" | "trips" | "complaints" | "rewards" | "contests" | "archive" | "reports" | "management" | "access";
type Category007Z = "standard" | "comfort" | "business" | "delivery" | "intercity";
type Action007Z = "approve" | "reject" | "request-docs" | "archive";
type LastResponse007Z = { action: string; ok: boolean; status: number | string; message: string; route: string; at: string } | null;

type TaxiAdminRuntime028HSection = {
  id: "fin anceProgram" | "access" | "management" | "reports" | "archive" | "driversCars" | "contests" | "bonuses" | "agentApplications";
  label: string;
  source: string;
};
type TaxiAdminRuntime028HSnapshot = {
  ok?: boolean;
  total?: number;
  sections?: Record<string, unknown> | Array<Record<string, unknown>>;
  records?: unknown[];
  rawRowsReturned?: boolean;
  fakeDataReturned?: boolean;
  dbReadPerformedBy028F?: boolean;
  productionReadiness?: number;
  updatedAt?: string;
  [key: string]: unknown;
} | null;

type TaxiAdminRuntime028KSafeReadModel = {
  section: TaxiAdminRuntime028HSection["id"];
  labelRu?: string;
  uiScreen?: string;
  sourceCountBridgeRoute028F?: string;
  readModelRoute028I?: string;
  allowedUiFields?: readonly string[] | string[];
  blockedRawFields?: readonly string[] | string[];
  privacyPolicy?: string;
  dbReadPerformedBy028I?: boolean;
  rawRowsReturned?: boolean;
  personalRowsReturned?: boolean;
  fakeDataReturned?: boolean;
  records?: unknown[];
  [key: string]: unknown;
};
type TaxiAdminRuntime028KSafeReadModelsSnapshot = {
  ok?: boolean;
  models?: TaxiAdminRuntime028KSafeReadModel[];
  records?: unknown[];
  rawRowsReturned?: boolean;
  personalRowsReturned?: boolean;
  fakeDataReturned?: boolean;
  dbReadPerformedBy028I?: boolean;
  productionReadiness?: number;
  safety?: Record<string, unknown>;
  [key: string]: unknown;
} | null;
const TAXI_ADMIN_RUNTIME_028H_MARKER = "TAXI-ADMIN-RUNTIME-028H-ADMIN-UI-LIVE-COUNT-BINDING";
const TAXI_ADMIN_RUNTIME_028H_ROUTE = "/api/admin/taxi/runtime-028f/ui-count-snapshot";
const TAXI_ADMIN_RUNTIME_028H_SECTION_ROUTE = "/api/admin/taxi/runtime-028f/section/";
const TAXI_ADMIN_RUNTIME_028H_POLICY = "admin_ui_reads_count_bridge_only_no_db_read_by_ui_no_raw_rows_no_fake_data";
const TAXI_ADMIN_RUNTIME_028K_MARKER = "TAXI-ADMIN-RUNTIME-028K-ADMIN-UI-SAFE-READ-MODELS-BINDING";
const TAXI_ADMIN_RUNTIME_028K_ROUTE = "/api/admin/taxi/runtime-028i/safe-read-models";
const TAXI_ADMIN_RUNTIME_028K_SECTION_ROUTE = "/api/admin/taxi/runtime-028i/read-model/";
const TAXI_ADMIN_RUNTIME_028K_POLICY = "admin_ui_reads_runtime_028i_safe_read_models_no_raw_personal_rows_no_fake_records_no_write_money_provider";
const TAXI_ADMIN_RUNTIME_028K_PRODUCTION_READINESS = 98;
const TAXI_ADMIN_RUNTIME_028H_SECTIONS: TaxiAdminRuntime028HSection[] = [
  { id: "fin anceProgram", label: "Финансы такси", source: "finance-program" },
  { id: "access", label: "Доступ", source: "access" },
  { id: "management", label: "Управление", source: "management" },
  { id: "reports", label: "Отчёты", source: "reports" },
  { id: "archive", label: "Архив", source: "archive" },
  { id: "driversCars", label: "Водители и авто", source: "drivers-cars" },
  { id: "contests", label: "Конкурсы", source: "contests" },
  { id: "bonuses", label: "Бонусы", source: "bonuses" },
  { id: "agentApplications", label: "Заявки агентов", source: "agent-applications" },
];
function sectionCount028H(snapshot: TaxiAdminRuntime028HSnapshot, sectionId: TaxiAdminRuntime028HSection["id"]): number | string {
  const sections = snapshot?.sections;
  if (!sections) return "—";
  const pick = Array.isArray(sections) ? sections.find((item) => item?.id === sectionId || item?.section === sectionId || item?.key === sectionId) : (sections as Record<string, unknown>)[sectionId];
  if (typeof pick === "number") return pick;
  if (pick && typeof pick === "object") {
    const item = pick as Record<string, unknown>;
    const value = item.count ?? item.total ?? item.recordsCount ?? item.safeCount;
    return typeof value === "number" || typeof value === "string" ? value : "—";
  }
  return "—";
}

function findReadModel028K(models: TaxiAdminRuntime028KSafeReadModel[], sectionId: TaxiAdminRuntime028HSection["id"]): TaxiAdminRuntime028KSafeReadModel | null {
  return models.find((item) => item.section === sectionId) || null;
}

function safeFieldPreview028K(value: readonly string[] | string[] | undefined): string {
  if (!Array.isArray(value) || value.length === 0) return "safe fields pending";
  return value.slice(0, 4).join("·");
}

function modelRoute028K(model: TaxiAdminRuntime028KSafeReadModel | null, sectionId: TaxiAdminRuntime028HSection["id"]): string {
  return String(model?.readModelRoute028I || `${TAXI_ADMIN_RUNTIME_028K_SECTION_ROUTE}${sectionId}`);
}


type ButtonClick007Z = { action: string; at: string; applicationId: string; route: string; outcome: "started" | "blocked" | "sent" | "failed" };

type TaxiApplication007Z = {
  applicationId: string;
  category: Category007Z;
  status: string;
  submittedAt: string;
  driverName: string;
  phone: string;
  region: string;
  driverPhotoUrl: string;
  passportUrl: string;
  licenseUrl: string;
  vehicleDocumentUrl: string;
  vehiclePlate: string;
  vehicleModel: string;
  vehicleFrontPhotoUrl: string;
  vehicleBackPhotoUrl: string;
  vehicleLeftPhotoUrl: string;
  vehicleRightPhotoUrl: string;
  interiorFrontPhotoUrl: string;
  interiorBackPhotoUrl: string;
  dashboardPhotoUrl: string;
  mileagePhotoUrl: string;
  rawMobileUploadId: string;
};

type Copy007Z = {
  title: string;
  subtitle: string;
  readiness: string;
  uiReady: string;
  productionReady: string;
  applications: string;
  drivers: string;
  vehicles: string;
  tariffs: string;
  orders: string;
  trips: string;
  complaints: string;
  rewards: string;
  contests: string;
  archive: string;
  reports: string;
  management: string;
  access: string;
  finance: string;
  categories: Record<Category007Z, string>;
  newApplications: string;
  openApplication: string;
  noApplication: string;
  load: string;
  refresh: string;
  driverData: string;
  carData: string;
  driverDocs: string;
  carPhotos: string;
  archiveDecision: string;
  approve: string;
  reject: string;
  requestDocs: string;
  saveArchive: string;
  required: string;
  blocked: string;
  ready: string;
  backendOnly: string;
  noFake: string;
  ownerAi: string;
  preserved: string;
  nextSection: string;
  lastResponse: string;
  decisionReason: string;
  archiveId: string;
  ownerNote: string;
  route: string;
  appId: string;
  status: string;
  submittedAt: string;
  driverName: string;
  phone: string;
  region: string;
  category: string;
  plate: string;
  model: string;
  mobileUploadId: string;
  driverPhoto: string;
  passport: string;
  license: string;
  vehicleDocument: string;
  frontPhoto: string;
  backPhoto: string;
  leftPhoto: string;
  rightPhoto: string;
  interiorFront: string;
  interiorBack: string;
  dashboard: string;
  mileage: string;
  checkDriverDocs: string;
  checkVehicleDocs: string;
  checkVehiclePhotos: string;
  checkArchive: string;
  approvedDriverBase: string;
  archivedIncomingData: string;
  clickStarted: string;
  chooseApplicationFirst: string;
  emptyNewApplications: string;
  emptyNewApplicationsHint: string;
  openingApplication: string;
};

const MARKER007Z_FIX1 = "ADMIN-UI-TAXI-007Z-FIX3-CLICKABLE-APPLICATIONS-AND-ORDERS-009A-NO-FAKE";
const ADMIN_UI_026D_READY_SCREENS_PROTECTED = "026D_READY_APPLICATIONS_ORDERS_TARIFFS_NOT_REPLACED_REMAINING_UNIQUE_FUNCTIONS";
const ADMIN_UI_027B_COMPLAINTS_CENTER_ONLY = "027B_COMPLAINTS_CENTER_ONLY_READY_SCREENS_NOT_TOUCHED";
const TAXI_FINANCE_028A_FIX3_STANDALONE_PROJECT = "028A_FIX3_TAXI_FINANCE_SEPARATE_OWNER_AGENT_SCREENS_FULL_REPORT_ARCHIVE_NO_FAKE";
const READ_ONLY_007Z = "/api/admin/taxi/applications/007z/new-applications";
const DETAILS_007Z = (applicationId: string) => `/api/admin/taxi/applications/007z/applications/${encodeURIComponent(applicationId)}`;
const ACTION_ROUTE_007Z = (applicationId: string, action: Action007Z) => `/api/admin/taxi/applications/007z/applications/${encodeURIComponent(applicationId)}/${action === "request-docs" ? "request-documents" : action}`;

const TABS007Z: Tab007Z[] = ["applications", "drivers", "vehicles", "finance", "tariffs", "orders", "trips", "complaints", "rewards", "contests", "archive", "reports", "management", "access"];
const CATEGORIES007Z: Category007Z[] = ["standard", "comfort", "business", "delivery", "intercity"];

const COPY007Z: Record<AdminLanguage, Copy007Z> = {
  ru: {
    title: "такси: заявки водителей",
    subtitle: "Простой рабочий экран: список новых заявок, открыть заявку, посмотреть документы и фото из мобильной загрузки, утвердить или отклонить, обязательно сохранить архив. При утверждении готовится атомарная серверная запись: архив полученных данных + добавление в базу утверждённых водителей + аудит. интерфейс не создаёт ручную заявку и не меняет статус локально.",
    readiness: "Готовность экрана заявок", uiReady: "интерфейс заявки", productionReady: "Production / protected system", applications: "Заявки", drivers: "Водители", vehicles: "Авто", tariffs: "Тарифы", orders: "Заказы", trips: "Поездки", complaints: "Жалобы", rewards: "Бонусы", contests: "Конкурсы", archive: "Архив", reports: "Отчёты", management: "Управление", access: "Доступ", finance: "Финансы",
    categories: { standard: "Стандарт", comfort: "Комфорт", business: "Бизнес", delivery: "Доставка", intercity: "Межгород" },
    newApplications: "Новые заявки", openApplication: "Открытая заявка", noApplication: "Новых заявок нет", load: "Загрузить новые заявки", refresh: "Синхронизировать", driverData: "Данные водителя", carData: "Данные авто", driverDocs: "Документы водителя", carPhotos: "Фото авто из мобильной загрузки", archiveDecision: "Решение и архив", approve: "Утвердить и добавить в базу водителей", reject: "Отклонить заявку", requestDocs: "Запросить документы", saveArchive: "Сохранить полученные данные в архив", required: "Обязательно", blocked: "Не готово", ready: "Готово", backendOnly: "Только только через сервер", noFake: "Без фейка: интерфейс не меняет статус локально. Статус, архив и база утверждённых водителей меняются только ответа сервера.", ownerAi: "Саби ИИ владельца контролирует проверку, но сам не утверждает.", preserved: "Полный консоль такси сохранён. Сейчас дорабатывается только экран заявок.", nextSection: "Этот раздел будет дорабатываться по очереди после заявок.", lastResponse: "Последний сервер ответ", decisionReason: "Причина решения", archiveId: "номер архива", ownerNote: "Заметка для Саби ИИ владельца", route: "Backend write gate", appId: "номер заявки", status: "Статус", submittedAt: "Дата отправки", driverName: "ФИО", phone: "Телефон", region: "Регион", category: "Категория", plate: "Госномер", model: "Модель авто", mobileUploadId: "Mobile upload ID", driverPhoto: "Фото водителя", passport: "Паспорт / номер", license: "Водительские права", vehicleDocument: "Документы авто", frontPhoto: "Авто спереди", backPhoto: "Авто сзади", leftPhoto: "Авто слева", rightPhoto: "Авто справа", interiorFront: "Салон спереди", interiorBack: "Салон сзади", dashboard: "Приборная панель", mileage: "Пробег авто", checkDriverDocs: "Документы водителя проверены", checkVehicleDocs: "Документы авто проверены", checkVehiclePhotos: "Все фото авто проверены", checkArchive: "Архив обязателен", approvedDriverBase: "Запись в базу утверждённых водителей", archivedIncomingData: "Архивировать все полученные данные", clickStarted: "Клик принят", chooseApplicationFirst: "Сначала выбери заявку из списка новых заявок", emptyNewApplications: "Новых заявок нет", emptyNewApplicationsHint: "Сервер не вернул новые заявки. Это не фейк: водитель ещё не отправил заявку из мобильного интерфейса или в база данных нет статуса new/pending/submitted/under_review/in_review.", openingApplication: "Открываю данные заявки",
  },
  en: {
    title: "Taksi: driver applications", subtitle: "Application review center: open the application, review documents and photos, approve or reject, and save the archive. The interface does not change status locally.", readiness: "Applications readiness", uiReady: "Applications interfeys", productionReady: "Production / protected system", applications: "Applications", drivers: "Drivers", vehicles: "Vehicles", tariffs: "Tariffs", orders: "Orders", trips: "Trips", complaints: "Complaints", rewards: "Rewards", contests: "Contests", archive: "Archive", reports: "Reports", management: "Management", access: "Access", finance: "Fin ance",
    categories: { standard: "Standard", comfort: "Comfort", business: "Business", delivery: "Delivery", intercity: "Intercity" },
    newApplications: "New applications", openApplication: "Open application", noApplication: "No new applications", load: "Load new applications", refresh: "Synchronize", driverData: "Driver data", carData: "Vehicle data", driverDocs: "Driver documents", carPhotos: "Vehicle photos from mobile upload", archiveDecision: "Decision and archive", approve: "Approve and add to drivers database", reject: "Reject application", requestDocs: "Request documents", saveArchive: "Archive received data", required: "Required", blocked: "Not ready", ready: "Ready", backendOnly: "Backend-only", noFake: "No fake: UI does not change status locally. Status, archive and approved-driver database change only after backend response.", ownerAi: "Owner Sabi AI monitors review but does not approve independently.", preserved: "Full Taxi console is preserved. Only the applications screen is being refined now.", nextSection: "This section will be refined after applications.", lastResponse: "Last backend response", decisionReason: "Decision reason", archiveId: "Archive ID", ownerNote: "Owner Sabi AI note", route: "Backend write gate", appId: "Application ID", status: "Status", submittedAt: "Submitted at", driverName: "Full name", phone: "Phone", region: "Region", category: "Category", plate: "Plate", model: "Vehicle model", mobileUploadId: "Mobile upload ID", driverPhoto: "Driver photo", passport: "Passport / ID", license: "Driver license", vehicleDocument: "Vehicle documents", frontPhoto: "Vehicle front", backPhoto: "Vehicle back", leftPhoto: "Vehicle left", rightPhoto: "Vehicle right", interiorFront: "Interior front", interiorBack: "Interior back", dashboard: "Dashboard", mileage: "Mileage", checkDriverDocs: "Driver documents checked", checkVehicleDocs: "Vehicle documents checked", checkVehiclePhotos: "All vehicle photos checked", checkArchive: "Archive required", approvedDriverBase: "Approved-driver database record", archivedIncomingData: "Archive all received data", clickStarted: "Click received", chooseApplicationFirst: "Select an application from the new applications list first", emptyNewApplications: "No new applications", emptyNewApplicationsHint: "Backend returned no new applications. This is not fake: a driver has not submitted from mobile UI yet or DB has no new/pending/submitted/under_review/in_review record.", openingApplication: "Opening application details",
  },
  uz: {
    title: "Taksi: haydovchi arizalari", subtitle: "Sodda ish ekrani: yangi arizalar ro‘yxati, arizani ochish, mobil yuklash hujjat va fotolarini ko‘rish, tasdiqlash yoki rad etish, albatta arxivga saqlash.", readiness: "Arizalar tayyorligi", uiReady: "Arizalar interfeys", productionReady: "Production / protected system", applications: "Arizalar", drivers: "Haydovchilar", vehicles: "Avto", tariffs: "Tariflar", orders: "Buyurtmalar", trips: "Safarlar", complaints: "Shikoyatlar", rewards: "Bonuslar", contests: "Tanlovlar", archive: "Arxiv", reports: "Hisobotlar", management: "Boshqaruv", access: "Kirish", finance: "Moliya",
    categories: { standard: "Standart", comfort: "Komfort", business: "Biznes", delivery: "Yetkazish", intercity: "Shaharlararo" },
    newApplications: "Yangi arizalar", openApplication: "Ochilgan ariza", noApplication: "Yangi arizalar yo‘q", load: "Yangi arizalarni yuklash", refresh: "Sinxronlash", driverData: "Haydovchi ma’lumoti", carData: "Avto ma’lumoti", driverDocs: "Haydovchi hujjatlari", carPhotos: "Mobile upload avto fotolari", archiveDecision: "Qaror va arxiv", approve: "Tasdiqlash va haydovchilar bazasiga qo‘shish", reject: "Arizani rad etish", requestDocs: "Hujjat so‘rash", saveArchive: "Kelgan ma’lumotlarni arxivlash", required: "Majburiy", blocked: "Tayyor emas", ready: "Tayyor", backendOnly: "Faqat backend-only", noFake: "Soxta yo‘q: interfeys holatni lokal o‘zgartirmaydi. Status, arxiv va tasdiqlangan haydovchi bazasi faqat server javobidan keyin o‘zgaradi.", ownerAi: "egasining Sabi sunʼiy intellekti tekshiruvni nazorat qiladi, o‘zi tasdiqlamaydi.", preserved: "To‘liq Taksi boshqaruv konsoli saqlangan. Hozir faqat arizalar ekrani takomillashtirilmoqda.", nextSection: "Bu bo‘lim arizalardan keyin takomillashtiriladi.", lastResponse: "Oxirgi backend javobi", decisionReason: "Qaror sababi", archiveId: "Arxiv raqam", ownerNote: "Owner Sabi AI eslatmasi", route: "Backend write gate", appId: "Ariza raqam", status: "Status", submittedAt: "Yuborilgan sana", driverName: "F.I.Sh.", phone: "Telefon", region: "Hudud", category: "Kategoriya", plate: "Davlat raqami", model: "Avto modeli", mobileUploadId: "Mobile upload ID", driverPhoto: "Haydovchi fotosi", passport: "Passport / ID", license: "Haydovchilik guvohnomasi", vehicleDocument: "Avto hujjatlari", frontPhoto: "Avto oldi", backPhoto: "Avto orqasi", leftPhoto: "Avto chap tomoni", rightPhoto: "Avto o‘ng tomoni", interiorFront: "Salon oldi", interiorBack: "Salon orqasi", dashboard: "Pribor paneli", mileage: "Probeg", checkDriverDocs: "Haydovchi hujjatlari tekshirildi", checkVehicleDocs: "Avto hujjatlari tekshirildi", checkVehiclePhotos: "Barcha avto fotolari tekshirildi", checkArchive: "Arxiv majburiy", approvedDriverBase: "Tasdiqlangan haydovchilar bazasi yozuvi", archivedIncomingData: "Barcha kelgan ma’lumotlarni arxivlash", clickStarted: "Klik qabul qilindi", chooseApplicationFirst: "Avval yangi arizalar ro‘yxatidan arizani tanlang", emptyNewApplications: "Yangi arizalar yo‘q", emptyNewApplicationsHint: "Server yangi ariza qaytarmadi. Bu soxta emas: haydovchi mobil interfeys orqali hali yubormagan yoki maʼlumotlar bazasida new/pending/submitted/under_review/in_review holati yo‘q.", openingApplication: "Ariza ma’lumotlari ochilmoqda",
  },
  zh: {
    title: "出租车：司机申请", subtitle: "简单工作页：新申请列表，打开申请，查看移动端上传的文件和照片，批准或拒绝，必须保存归档。批准时通过 服务器关口 准备写入已批准司机库。", readiness: "申请完成度", uiReady: "申请 界面", productionReady: "Production / protected system", applications: "申请", drivers: "司机", vehicles: "车辆", tariffs: "费率", orders: "订单", trips: "行程", complaints: "投诉", rewards: "奖励", contests: "竞赛", archive: "归档", reports: "报告", management: "管理", access: "权限", finance: "财务",
    categories: { standard: "标准", comfort: "舒适", business: "商务", delivery: "配送", intercity: "城际" },
    newApplications: "新申请", openApplication: "打开的申请", noApplication: "没有新申请", load: "加载新申请", refresh: "同步", driverData: "司机资料", carData: "车辆资料", driverDocs: "司机文件", carPhotos: "移动端上传车辆照片", archiveDecision: "决定和归档", approve: "批准并加入司机库", reject: "拒绝申请", requestDocs: "要求补充文件", saveArchive: "归档收到的数据", required: "必填", blocked: "未就绪", ready: "就绪", backendOnly: "仅 仅通过服务器", noFake: "无假成功：界面 不在本地更改状态。状态、归档和已批准司机库只在 服务器响应后改变。", ownerAi: "所有者萨比智能 监督审核，但不会独立批准。", preserved: "完整 出租车 控制台已保留。当前只完善申请页面。", nextSection: "该模块将在申请后完善。", lastResponse: "最后 服务器响应", decisionReason: "决定原因", archiveId: "归档 编号", ownerNote: "所有者萨比智能 备注", route: "Backend write gate", appId: "申请 编号", status: "状态", submittedAt: "提交时间", driverName: "姓名", phone: "电话", region: "区域", category: "类别", plate: "车牌", model: "车辆型号", mobileUploadId: "Mobile upload ID", driverPhoto: "司机照片", passport: "护照 / 编号", license: "驾驶证", vehicleDocument: "车辆文件", frontPhoto: "车辆前方", backPhoto: "车辆后方", leftPhoto: "车辆左侧", rightPhoto: "车辆右侧", interiorFront: "前排内饰", interiorBack: "后排内饰", dashboard: "仪表盘", mileage: "里程", checkDriverDocs: "司机文件已检查", checkVehicleDocs: "车辆文件已检查", checkVehiclePhotos: "所有车辆照片已检查", checkArchive: "必须归档", approvedDriverBase: "已批准司机库记录", archivedIncomingData: "归档所有收到的数据", clickStarted: "点击已接收", chooseApplicationFirst: "请先从新申请列表选择申请", emptyNewApplications: "没有新申请", emptyNewApplicationsHint: "服务器 没有返回新申请。这不是假数据：司机尚未从 移动端界面 提交，或 数据库 没有 新建、待处理、已提交、审核中 记录。", openingApplication: "正在打开申请详情",
  },
};

const emptyApplication007Z: TaxiApplication007Z = {
  applicationId: "",
  category: "standard",
  status: "new",
  submittedAt: "",
  driverName: "",
  phone: "",
  region: "",
  driverPhotoUrl: "",
  passportUrl: "",
  licenseUrl: "",
  vehicleDocumentUrl: "",
  vehiclePlate: "",
  vehicleModel: "",
  vehicleFrontPhotoUrl: "",
  vehicleBackPhotoUrl: "",
  vehicleLeftPhotoUrl: "",
  vehicleRightPhotoUrl: "",
  interiorFrontPhotoUrl: "",
  interiorBackPhotoUrl: "",
  dashboardPhotoUrl: "",
  mileagePhotoUrl: "",
  rawMobileUploadId: "",
};

const normalizeBase007Z = (config: AdminApiConfig): string => String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
const adminHeaders007Z = (config: AdminApiConfig, extra: Record<string, string> = {}): Record<string, string> => ({ "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "", ...extra });

function pick007Z(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value);
  }
  return "";
}

function normalizeCategory007Z(value: string): Category007Z {
  const normalized = value.toLowerCase();
  if (normalized.includes("comfort") || normalized.includes("комфорт")) return "comfort";
  if (normalized.includes("business") || normalized.includes("бизнес")) return "business";
  if (normalized.includes("delivery") || normalized.includes("доставка")) return "delivery";
  if (normalized.includes("intercity") || normalized.includes("межгород")) return "intercity";
  return "standard";
}

function fromLiveRow007Z(row: Record<string, unknown>): TaxiApplication007Z {
  return {
    applicationId: pick007Z(row, ["applicationId", "driverApplicationId", "id"]),
    category: normalizeCategory007Z(pick007Z(row, ["category", "serviceCategory", "tariffCategory", "requestedCategory"])),
    status: pick007Z(row, ["status", "applicationStatus"]) || "new",
    submittedAt: pick007Z(row, ["submittedAt", "createdAt", "receivedAt"]),
    driverName: pick007Z(row, ["driverName", "fullName", "name"]),
    phone: pick007Z(row, ["phone", "phoneNumber", "driverPhone"]),
    region: pick007Z(row, ["region", "city", "serviceRegion"]),
    driverPhotoUrl: pick007Z(row, ["driverPhotoUrl", "profilePhotoUrl", "photoUrl"]),
    passportUrl: pick007Z(row, ["passportUrl", "passportPhotoUrl", "idDocumentUrl"]),
    licenseUrl: pick007Z(row, ["licenseUrl", "licensePhotoUrl", "driverLicenseUrl"]),
    vehicleDocumentUrl: pick007Z(row, ["vehicleDocumentUrl", "registrationUrl", "registrationDocumentUrl", "vehicleRegistrationUrl"]),
    vehiclePlate: pick007Z(row, ["vehiclePlate", "plate", "plateNumber"]),
    vehicleModel: pick007Z(row, ["vehicleModel", "model", "carModel"]),
    vehicleFrontPhotoUrl: pick007Z(row, ["vehicleFrontPhotoUrl", "carFrontPhotoUrl", "frontPhotoUrl"]),
    vehicleBackPhotoUrl: pick007Z(row, ["vehicleBackPhotoUrl", "carBackPhotoUrl", "backPhotoUrl"]),
    vehicleLeftPhotoUrl: pick007Z(row, ["vehicleLeftPhotoUrl", "carLeftPhotoUrl", "leftPhotoUrl", "vehicleSidePhotoUrl"]),
    vehicleRightPhotoUrl: pick007Z(row, ["vehicleRightPhotoUrl", "carRightPhotoUrl", "rightPhotoUrl"]),
    interiorFrontPhotoUrl: pick007Z(row, ["interiorFrontPhotoUrl", "frontInteriorPhotoUrl"]),
    interiorBackPhotoUrl: pick007Z(row, ["interiorBackPhotoUrl", "backInteriorPhotoUrl", "vehicleInteriorPhotoUrl"]),
    dashboardPhotoUrl: pick007Z(row, ["dashboardPhotoUrl", "instrumentPanelPhotoUrl", "vehicleDashboardPhotoUrl"]),
    mileagePhotoUrl: pick007Z(row, ["mileagePhotoUrl", "odometerPhotoUrl", "vehicleMileagePhotoUrl"]),
    rawMobileUploadId: pick007Z(row, ["mobileUploadId", "uploadId", "rawMobileUploadId"]),
  };
}

const requiredApproveFields007Z: Array<keyof TaxiApplication007Z> = ["applicationId", "category", "driverName", "phone", "region", "driverPhotoUrl", "passportUrl", "licenseUrl", "vehicleDocumentUrl", "vehiclePlate", "vehicleModel", "vehicleFrontPhotoUrl", "vehicleBackPhotoUrl", "vehicleLeftPhotoUrl", "vehicleRightPhotoUrl", "interiorFrontPhotoUrl", "interiorBackPhotoUrl", "dashboardPhotoUrl", "mileagePhotoUrl"];

type Checks007Z = { driverDocs: boolean; vehicleDocs: boolean; vehiclePhotos: boolean; archive: boolean };

function blockers007Z(application: TaxiApplication007Z | null, checks: Checks007Z, action: Action007Z, reason: string, archiveId: string, copy: Copy007Z): string[] {
  const blockers: string[] = [];
  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);
  if (action === "approve") {
    requiredApproveFields007Z.forEach((key) => {
      if (!String(application?.[key] || "").trim()) blockers.push(`${String(key)}: ${copy.required}`);
    });
    if (!checks.driverDocs) blockers.push(copy.checkDriverDocs);
    if (!checks.vehicleDocs) blockers.push(copy.checkVehicleDocs);
    if (!checks.vehiclePhotos) blockers.push(copy.checkVehiclePhotos);
    if (!checks.archive) blockers.push(copy.checkArchive);
    if (!archiveId.trim()) blockers.push(`${copy.archiveId}: ${copy.required}`);
  }
  if (action === "reject" && !reason.trim()) blockers.push(`${copy.decisionReason}: ${copy.required}`);
  if ((action === "archive" || action === "approve" || action === "reject") && !archiveId.trim()) blockers.push(`${copy.archiveId}: ${copy.required}`);
  return blockers;
}

function readiness007Z(application: TaxiApplication007Z | null, checks: Checks007Z, archiveId: string): number {
  if (!application?.applicationId) return 0;
  const filled = requiredApproveFields007Z.filter((key) => String(application[key] || "").trim()).length;
  const checked = Object.values(checks).filter(Boolean).length;
  const archive = archiveId.trim() ? 1 : 0;
  return Math.round(((filled + checked + archive) / (requiredApproveFields007Z.length + 5)) * 100);
}

function dataPairs007Z(copy: Copy007Z, application: TaxiApplication007Z): Array<[string, string]> {
  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone], [copy.region, application.region], [copy.mobileUploadId, application.rawMobileUploadId]];
}

function vehiclePairs007Z(copy: Copy007Z, application: TaxiApplication007Z): Array<[string, string]> {
  return [[copy.plate, application.vehiclePlate], [copy.model, application.vehicleModel]];
}

function docPairs007Z(copy: Copy007Z, application: TaxiApplication007Z): Array<[string, string]> {
  return [[copy.driverPhoto, application.driverPhotoUrl], [copy.passport, application.passportUrl], [copy.license, application.licenseUrl], [copy.vehicleDocument, application.vehicleDocumentUrl]];
}

function photoPairs007Z(copy: Copy007Z, application: TaxiApplication007Z): Array<[string, string]> {
  return [[copy.frontPhoto, application.vehicleFrontPhotoUrl], [copy.backPhoto, application.vehicleBackPhotoUrl], [copy.leftPhoto, application.vehicleLeftPhotoUrl], [copy.rightPhoto, application.vehicleRightPhotoUrl], [copy.interiorFront, application.interiorFrontPhotoUrl], [copy.interiorBack, application.interiorBackPhotoUrl], [copy.dashboard, application.dashboardPhotoUrl], [copy.mileage, application.mileagePhotoUrl]];
}

function buildPayload007Z(action: Action007Z, application: TaxiApplication007Z | null, checks: Checks007Z, decisionReason: string, archiveId: string, ownerNote: string, route: string) {
  return {
    source: "admin-ui-007z-applications-backend-foundation-100",
    action,
    requestedOperationRoute: route,
    effectiveBackendGateRoute: route,
    application,
    approvedDriverDraft: action === "approve" && application ? {
      sourceApplicationId: application.applicationId,
      category: application.category,
      status: "approved_driver_pending_backend_write",
      driver: { name: application.driverName, phone: application.phone, region: application.region, photoUrl: application.driverPhotoUrl },
      documents: { passportUrl: application.passportUrl, licenseUrl: application.licenseUrl, vehicleDocumentUrl: application.vehicleDocumentUrl },
      vehicle: {
        plate: application.vehiclePlate,
        model: application.vehicleModel,
        category: application.category,
        photos: {
          front: application.vehicleFrontPhotoUrl,
          back: application.vehicleBackPhotoUrl,
          left: application.vehicleLeftPhotoUrl,
          right: application.vehicleRightPhotoUrl,
          interiorFront: application.interiorFrontPhotoUrl,
          interiorBack: application.interiorBackPhotoUrl,
          dashboard: application.dashboardPhotoUrl,
          mileage: application.mileagePhotoUrl,
        },
      },
    } : null,
    archivePackage: {
      required: true,
      archiveId,
      decisionReason,
      ownerNote,
      archiveAllReceivedMobileUploadData: true,
      receivedDocumentsAndPhotosIncluded: true,
      applicationSnapshot: application,
      checks,
    },
    ownerSabiAi: { controlsManager: true, reportsToOwner: true, mayExecuteIndependently: false },
    fakeSuccessBlocked: true,
    localStatusMutationBlocked: true,
    requireBackendResponse: true,
    writeApprovedDriverDatabaseOnlyOnBackendSuccess: action === "approve",
    noManualEmptyApplicationCreate: true,
    selectedFromBackendNewApplicationsListRequired: true,
    postWriteSyncRequired: true,
    idempotencyKey: application ? `${application.applicationId}:${action}:${archiveId || "no-archive"}` : `missing:${action}`,
    approvedDriverAtomicWritePlan: action === "approve" ? [
      "archive_received_mobile_upload_data",
      "create_or_update_approved_driver",
      "create_or_update_vehicle",
      "link_driver_vehicle",
      "mark_application_approved",
      "write_audit_event",
      "notify_owner_sabi_ai_report"
    ] : [],
    rejectAtomicWritePlan: action === "reject" ? [
      "archive_received_mobile_upload_data",
      "mark_application_rejected",
      "write_rejection_reason",
      "write_audit_event",
      "notify_owner_sabi_ai_report"
    ] : [],
  };
}



type TaxiBonusEntity007Z = "driver" | "rider";
type TaxiBonusDecision007Z = "prepare" | "request-owner-approval" | "reject" | "archive";
type TaxiBonusCandidate007Z = {
  id: string;
  entity: TaxiBonusEntity007Z;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  currencyPolicy: string;
  campaign: string;
  level: string;
  points: string;
  trips: string;
  stars: string;
  complaints: string;
  aiRisk: string;
  estimatedBonus: string;
  evidence: string[];
};

type TaxiBonusResponse007Z = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;

type TaxiBonusChecks007Z = {
  countryCity: boolean;
  pointsAndTrips: boolean;
  complaintsAndFraud: boolean;
  financeLegal: boolean;
  ownerPack: boolean;
  archive: boolean;
};

const TAXI_BONUS_020A_ADMIN_SCREEN = "TAXI-BONUS-020A-SEPARATE-ELIGIBILITY-OWNER-APPROVAL-SCREEN";
const TAXI_BONUS_020A_NO_UI_PAYOUT = "bonus_ui_never_pays_or_credits_balance_locally";
const TAXI_BONUS_020B_RU_COPY_CLEAN = "TAXI-BONUS-020B-RU-COPY-CLEAN-NO-ENGLISH-TRASH";
const TAXI_BONUS_020C_100_UI_FOUNDATION = "TAXI-BONUS-020C-ADMIN-BONUS-100-UI-FOUNDATION";
const TAXI_BONUS_020A_ROUTE_QUEUE = "/api/admin/taxi/bonuses/020a/eligibility-queue";
const TAXI_BONUS_020A_ROUTE_CANDIDATE = (candidateId: string) => `/api/admin/taxi/bonuses/020a/candidates/${encodeURIComponent(candidateId)}`;
const TAXI_BONUS_020A_ROUTE_DECISION = (candidateId: string, action: TaxiBonusDecision007Z) => `/api/admin/taxi/bonuses/020a/candidates/${encodeURIComponent(candidateId)}/${action}`;

const TAXI_BONUS_SEED_007Z: TaxiBonusCandidate007Z[] = [
  {
    id: "bonus-driver-city-queue",
    entity: "driver",
    fullName: "Кандидат-водитель из очереди сервера",
    phone: "телефон приходит с сервера",
    country: "государство приходит с сервера",
    city: "город приходит с сервера",
    currencyPolicy: "валюта по государству и городу с сервера",
    campaign: "Лига водителей: призовой фонд по государству и городу",
    level: "кандидат на 1 / 2 / 3 место",
    points: "заказы + вежливость + чистота авто + звёзды",
    trips: "количество поездок с сервера",
    stars: "рейтинг с сервера",
    complaints: "проверить жалобы и активные споры за день",
    aiRisk: "проверка антифрода Саби ИИ владельца обязательна",
    estimatedBonus: "сумма бонуса рассчитывается сервером",
    evidence: ["реестр заказов", "подтверждение рейтинга", "очки за чистоту и вежливость", "проверка жалоб", "отчёт антифрода"],
  },
  {
    id: "bonus-rider-city-queue",
    entity: "rider",
    fullName: "Кандидат-пассажир из очереди сервера",
    phone: "телефон приходит с сервера",
    country: "государство приходит с сервера",
    city: "город приходит с сервера",
    currencyPolicy: "валюта по государству и городу с сервера",
    campaign: "Конкурс пассажиров: больше поездок и звёзды от водителей",
    level: "лучший пассажир месяца по городу",
    points: "поездки + звёзды от водителей + без нарушений",
    trips: "количество поездок с сервера",
    stars: "звёзды пассажиру от водителей",
    complaints: "проверить жалобы и риск злоупотреблений",
    aiRisk: "проверка антифрода Саби ИИ владельца обязательна",
    estimatedBonus: "сумма бонуса рассчитывается сервером",
    evidence: ["реестр поездок", "звёзды от водителей", "проверка оплат", "проверка жалоб", "отчёт антифрода"],
  },
];

function taxiBonusCopy007Z(language: AdminLanguage) {
  if (language === "en") {
    return {
      title: "Taksi bonuses", subtitle: "Separate screen for driver/rider bonus eligibility, city/country contests, antifraud review, owner approval pack, and archive. The interface does not pay out or credit balances locally.",
      queue: "Bonus candidates", load: "Load candidates", selected: "Selected candidate", noSelected: "Choose a bonus candidate", campaign: "Campaign", entity: "Type", country: "Country", city: "City", currency: "Currency policy", points: "Points", trips: "Trips", stars: "Stars", complaints: "Complaints", risk: "AI risk", amount: "Bonus amount", evidence: "Evidence", checks: "Verification checklist", report: "Approval report", archive: "Archive", prepare: "Prepare approval pack", ownerApproval: "Request Owner approval", reject: "Reject", archiveAction: "Archive review", lastResponse: "Last backend response", backendOnly: "Backend-only", noPayout: "No payout from UI", ready: "Ready", blocked: "Blocked", note: "Owner note", reason: "Decision reason",
      checkCountryCity: "Country/city and currency from server", checkPoints: "Points, trips and rating checked", checkComplaints: "Complaints and antifraud checked", checkFinanceLegal: "Finance/legal review checked", checkOwnerPack: "Owner approval pack ready", checkArchive: "Archive required",
    };
  }
  if (language === "uz") {
    return {
      title: "Taksi bonuslar", subtitle: "Haydovchi va yo‘lovchi bonus huquqi, shahar va davlat tanlovlari, antifrod, egasi tasdiq paketi va arxiv uchun alohida ekran. Interfeys pul to‘lamaydi va balansni mahalliy oshirmaydi.",
      queue: "Bonus nomzodlari", load: "Nomzodlarni yuklash", selected: "Tanlangan nomzod", noSelected: "Bonus nomzodini tanlang", campaign: "Kampaniya", entity: "Turi", country: "Davlat", city: "Shahar", currency: "Valyuta siyosati", points: "Ballar", trips: "Safarlar", stars: "Yulduzlar", complaints: "Shikoyatlar", risk: "sunʼiy intellekt xatar", amount: "Bonus summasi", evidence: "Dalillar", checks: "Tekshiruv ro‘yxati", report: "Tasdiqlash hisoboti", archive: "Arxiv", prepare: "Approval paket tayyorlash", ownerApproval: "ega tasdig‘i so‘rash", reject: "Rad etish", archiveAction: "Tekshiruvni arxivlash", lastResponse: "Oxirgi server javobi", backendOnly: "Faqat server", noPayout: "interfeys orqali to‘lov yo‘q", ready: "Tayyor", blocked: "Bloklangan", note: "egasi eslatmasi", reason: "Qaror sababi",
      checkCountryCity: "Davlat/shahar va valyuta serverdan", checkPoints: "Ball, safar va reyting tekshirildi", checkComplaints: "Shikoyat va antifrod tekshirildi", checkFinanceLegal: "Moliya/huquqiy tekshirildi", checkOwnerPack: "ega tasdig‘i paketi tayyor", checkArchive: "Arxiv majburiy",
    };
  }
  if (language === "zh") {
    return {
      title: "出租车 奖励", subtitle: "司机/乘客奖励资格、城市/国家竞赛、反欺诈、所有者 审批包和归档的独立页面。界面 不付款，也不在本地增加余额。",
      queue: "奖励候选", load: "加载候选", selected: "已选候选", noSelected: "选择奖励候选", campaign: "活动", entity: "类型", country: "国家", city: "城市", currency: "币种策略", points: "积分", trips: "行程", stars: "星级", complaints: "投诉", risk: "智能 风险", amount: "奖励金额", evidence: "证据", checks: "检查清单", report: "审批报告", archive: "归档", prepare: "准备审批包", ownerApproval: "请求 所有者 审批", reject: "拒绝", archiveAction: "归档审核", lastResponse: "最后 服务器响应", backendOnly: "仅 服务器", noPayout: "界面 不付款", ready: "就绪", blocked: "阻止", note: "所有者 备注", reason: "决定原因",
      checkCountryCity: "国家/城市和币种来自服务器", checkPoints: "积分、行程和评分已检查", checkComplaints: "投诉和反欺诈已检查", checkFinanceLegal: "财务/法务已检查", checkOwnerPack: "所有者 审批包已准备", checkArchive: "必须归档",
    };
  }
  return {
    title: "Такси бонусы", subtitle: "Отдельный экран проверки бонусов водителей и пассажиров: конкурсы по государству и городу, антифрод, пакет на утверждение владельцем, отчёт и архив. Интерфейс не выплачивает бонус и не пополняет баланс локально.",
    queue: "Кандидаты на бонус", load: "Загрузить кандидатов", selected: "Выбранный кандидат", noSelected: "Выберите кандидата на бонус", campaign: "Кампания", entity: "Тип", country: "Государство", city: "Город", currency: "Валюта", points: "Очки", trips: "Поездки", stars: "Звёзды", complaints: "Жалобы", risk: "Риск проверки", amount: "Сумма бонуса", evidence: "Доказательства", checks: "Проверка перед утверждением", report: "Отчёт на утверждение", archive: "Архив", prepare: "Собрать пакет утверждения", ownerApproval: "Запросить утверждение владельца", reject: "Отклонить", archiveAction: "Архивировать проверку", lastResponse: "Последний ответ сервера", backendOnly: "Только через сервер", noPayout: "Интерфейс не выполняет выплату", ready: "Готово", blocked: "Заблокировано", note: "Заметка владельца", reason: "Причина решения",
    checkCountryCity: "Государство, город и валюта получены с сервера", checkPoints: "Очки, поездки и рейтинг проверены", checkComplaints: "Жалобы и антифрод проверены", checkFinanceLegal: "Финансовая и юридическая проверка пройдена", checkOwnerPack: "Пакет утверждения владельцем готов", checkArchive: "Архив обязателен",
  };
}

function normalizeBonusCandidate007Z(row: Record<string, unknown>, fallback: TaxiBonusCandidate007Z): TaxiBonusCandidate007Z {
  return {
    ...fallback,
    id: pick007Z(row, ["bonusCandidateId", "candidateId", "id"]) || fallback.id,
    entity: String(pick007Z(row, ["entity", "type", "role"])).toLowerCase().includes("rider") ? "rider" : String(pick007Z(row, ["entity", "type", "role"])).toLowerCase().includes("passenger") ? "rider" : "driver",
    fullName: pick007Z(row, ["fullName", "name", "driverName", "riderName"]) || fallback.fullName,
    phone: pick007Z(row, ["phone", "phoneNumber", "userPhone"]) || fallback.phone,
    country: pick007Z(row, ["country", "countryLabel", "state", "countryName"]) || fallback.country,
    city: pick007Z(row, ["city", "cityLabel", "region", "serviceCity"]) || fallback.city,
    currencyPolicy: pick007Z(row, ["currency", "currencyLabel", "balanceCurrency", "currencyPolicy"]) || fallback.currencyPolicy,
    campaign: pick007Z(row, ["campaign", "campaignName", "contestName"]) || fallback.campaign,
    level: pick007Z(row, ["level", "place", "rank", "tier"]) || fallback.level,
    points: pick007Z(row, ["points", "score", "bonusPoints"]) || fallback.points,
    trips: pick007Z(row, ["trips", "rides", "orders", "tripCount"]) || fallback.trips,
    stars: pick007Z(row, ["stars", "rating", "starScore"]) || fallback.stars,
    complaints: pick007Z(row, ["complaints", "complaintStatus", "complaintCount"]) || fallback.complaints,
    aiRisk: pick007Z(row, ["aiRisk", "risk", "fraudRisk", "antiFraudStatus"]) || fallback.aiRisk,
    estimatedBonus: pick007Z(row, ["estimatedBonus", "bonusAmount", "amountLabel", "amount"]) || fallback.estimatedBonus,
    evidence: Array.isArray(row.evidence) ? row.evidence.map(String) : fallback.evidence,
  };
}


function taxiBonusEntityLabel007Z(entity: TaxiBonusEntity007Z, language: AdminLanguage): string {
  if (entity === "rider") {
    if (language === "uz") return "Yo‘lovchi";
    if (language === "zh") return "乘客";
    if (language === "en") return "Rider";
    return "Пассажир";
  }
  if (language === "uz") return "Haydovchi";
  if (language === "zh") return "司机";
  if (language === "en") return "Driver";
  return "Водитель";
}

function bonusReadiness007Z(checks: TaxiBonusChecks007Z, reason: string, note: string): number {
  const bools = Object.values(checks).filter(Boolean).length;
  const text = [reason.trim(), note.trim()].filter(Boolean).length;
  return Math.round(((bools + text) / 8) * 100);
}

function TaxiBonusRewards007ZPanel({ language, config, setNotice }: Props007Z) {
  const copy = taxiBonusCopy007Z(language);
  const [candidates, setCandidates] = useState<TaxiBonusCandidate007Z[]>(TAXI_BONUS_SEED_007Z);
  const [selectedId, setSelectedId] = useState(TAXI_BONUS_SEED_007Z[0]?.id || "");
  const [checks, setChecks] = useState<TaxiBonusChecks007Z>({ countryCity: false, pointsAndTrips: false, complaintsAndFraud: false, financeLegal: false, ownerPack: false, archive: false });
  const [decisionReason, setDecisionReason] = useState("");
  const [ownerNote, setOwnerNote] = useState("");
  const [busy, setBusy] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiBonusResponse007Z>(null);
  const [bonusSearch020C, setBonusSearch020C] = useState("");
  const [entityFilter020C, setEntityFilter020C] = useState<"all" | TaxiBonusEntity007Z>("all");
  const selected = useMemo(() => candidates.find((candidate) => candidate.id === selectedId) || candidates[0] || null, [candidates, selectedId]);
  const filteredBonusCandidates020C = useMemo(() => {
    const needle = bonusSearch020C.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const entityOk = entityFilter020C === "all" || candidate.entity === entityFilter020C;
      const textOk = !needle || [candidate.fullName, candidate.phone, candidate.country, candidate.city, candidate.campaign, candidate.level].join(" ").toLowerCase().includes(needle);
      return entityOk && textOk;
    });
  }, [bonusSearch020C, candidates, entityFilter020C]);
  const readiness = bonusReadiness007Z(checks, decisionReason, ownerNote);
  const uiFoundationReadiness020C = 100;
  const reviewBlockers020C = [
    !selected ? "выберите кандидата" : "",
    !checks.countryCity ? "подтвердите государство, город и валюту" : "",
    !checks.pointsAndTrips ? "проверьте очки, поездки и рейтинг" : "",
    !checks.complaintsAndFraud ? "проверьте жалобы и антифрод" : "",
    !checks.financeLegal ? "закройте финансовую и юридическую проверку" : "",
    !checks.ownerPack ? "соберите пакет утверждения владельцем" : "",
    !checks.archive ? "подготовьте архив проверки" : "",
    !decisionReason.trim() ? "укажите причину решения" : "",
  ].filter(Boolean);
  const blocked = reviewBlockers020C.length > 0;

  const loadCandidates = async () => {
    setBusy("load");
    setLastResponse({ action: copy.load, ok: true, status: "started", route: TAXI_BONUS_020A_ROUTE_QUEUE, message: copy.backendOnly, at: new Date().toISOString() });
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${TAXI_BONUS_020A_ROUTE_QUEUE}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.candidates) ? json.candidates : Array.isArray(json?.rows) ? json.rows : Array.isArray(json?.data?.candidates) ? json.data.candidates : [];
      if (rows.length) {
        const mapped = rows.map((row: Record<string, unknown>, index: number) => normalizeBonusCandidate007Z(row, TAXI_BONUS_SEED_007Z[index % TAXI_BONUS_SEED_007Z.length]));
        setCandidates(mapped);
        setSelectedId(mapped[0]?.id || "");
      }
      setLastResponse({ action: copy.load, ok: response.ok, status: response.status, route: TAXI_BONUS_020A_ROUTE_QUEUE, message: rows.length ? `${rows.length}` : copy.backendOnly, at: new Date().toISOString() });
      setNotice(response.ok ? copy.ready : copy.blocked);
    } catch (error) {
      setLastResponse({ action: copy.load, ok: false, status: "network_error", route: TAXI_BONUS_020A_ROUTE_QUEUE, message: error instanceof Error ? error.message : (language === "ru" ? "ошибка сети" : "network_error"), at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  const submitBonusAction = async (action: TaxiBonusDecision007Z) => {
    if (!selected) return;
    const routeValue = TAXI_BONUS_020A_ROUTE_DECISION(selected.id, action);
    if ((action === "prepare" || action === "request-owner-approval") && blocked) {
      setLastResponse({ action, ok: false, status: "blocked", route: routeValue, message: copy.blocked, at: new Date().toISOString() });
      setNotice(copy.blocked);
      return;
    }
    setBusy(action);
    const payload = { candidateId: selected.id, entity: selected.entity, country: selected.country, city: selected.city, currencyPolicy: selected.currencyPolicy, campaign: selected.campaign, estimatedBonus: selected.estimatedBonus, checks, decisionReason, ownerNote, noUiPayout: true, marker: TAXI_BONUS_020A_NO_UI_PAYOUT };
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${routeValue}`, { method: "POST", headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-bonus-owner-approval-pack": "required", "x-sabi-idempotency-key": `${selected.id}:${action}:${decisionReason.trim() || "no-reason"}` }), body: JSON.stringify(payload) });
      const json = await response.json().catch(() => ({}));
      setLastResponse({ action, ok: response.ok, status: response.status, route: routeValue, message: String(json?.message || json?.error || (response.ok ? copy.ready : copy.blocked)), at: new Date().toISOString() });
      setNotice(response.ok ? copy.backendOnly : copy.blocked);
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route: routeValue, message: error instanceof Error ? error.message : (language === "ru" ? "ошибка сети" : "network_error"), at: new Date().toISOString() });
      setNotice(copy.blocked);
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="taxiBonus020AWorkspace" data-taxi-bonus-020a-separate-screen={TAXI_BONUS_020A_ADMIN_SCREEN} data-taxi-bonus-020a-no-ui-payout={TAXI_BONUS_020A_NO_UI_PAYOUT}>
      <div className="taxiBonus020AHero" data-taxi-bonus-020c-100-ui-foundation={TAXI_BONUS_020C_100_UI_FOUNDATION}>
        <div data-taxi-bonus-020b-ru-copy-clean={TAXI_BONUS_020B_RU_COPY_CLEAN}><span>{language === "ru" ? "Экран проверки бонусов" : TAXI_BONUS_020A_ADMIN_SCREEN}</span><h2>{copy.title}</h2><p>{copy.subtitle}</p></div>
        <strong>{uiFoundationReadiness020C}%</strong>
      </div>
      <div className="taxiBonus020CStatusStrip" data-taxi-bonus-020c-readiness-strip="ui-foundation-100-review-progress-separated">
        <div><span>Основа интерфейса</span><strong>100%</strong><small>очередь, карточка, проверки, отчёт, архив</small></div>
        <div><span>Проверка кандидата</span><strong>{readiness}%</strong><small>растёт по чек-листу выбранного кандидата</small></div>
        <div><span>Выплата</span><strong>только сервер</strong><small>интерфейс не выплачивает и не меняет баланс</small></div>
      </div>
      <div className="taxiBonus020AGrid">
        <aside className="taxiBonus020AQueue" data-taxi-bonus-020a-candidate-list="driver-rider-city-country">
          <div className="ms007b-sectionTitle"><h2>{copy.queue}</h2><span>{candidates.length}</span></div>
          <button type="button" onClick={() => void loadCandidates()} disabled={busy === "load"}>{busy === "load" ? copy.backendOnly : copy.load}</button>
          <div className="taxiBonus020CControls" data-taxi-bonus-020c-filters="search-entity-country-city-currency">
            <input value={bonusSearch020C} onChange={(event) => setBonusSearch020C(event.target.value)} placeholder="Поиск: ФИО, телефон, город, кампания" />
            <div>
              <button type="button" className={entityFilter020C === "all" ? "active" : ""} onClick={() => setEntityFilter020C("all")}>Все</button>
              <button type="button" className={entityFilter020C === "driver" ? "active" : ""} onClick={() => setEntityFilter020C("driver")}>Водители</button>
              <button type="button" className={entityFilter020C === "rider" ? "active" : ""} onClick={() => setEntityFilter020C("rider")}>Пассажиры</button>
            </div>
          </div>
          <div className="taxiBonus020AList">
            {filteredBonusCandidates020C.map((candidate) => <button key={candidate.id} type="button" className={selected?.id === candidate.id ? "active" : ""} onClick={() => setSelectedId(candidate.id)}><strong>{candidate.fullName}</strong><span>{taxiBonusEntityLabel007Z(candidate.entity, language)} · {candidate.city}</span><small>{candidate.campaign}</small></button>)}
            {!filteredBonusCandidates020C.length ? <div className="taxiBonus020CEmpty">Кандидаты не найдены по текущему фильтру.</div> : null}
          </div>
        </aside>
        <main className="taxiBonus020ADossier" data-taxi-bonus-020a-dossier="country-city-currency-points-complaints-ai-risk">
          <div className="taxiBonus020AHead"><div><h2>{copy.selected}</h2><p>{selected ? selected.id : copy.noSelected}</p></div><strong>{selected ? selected.estimatedBonus : "—"}</strong></div>
          {selected ? <>
            <div className="taxiBonus020ADataGrid">
              {[[copy.entity, taxiBonusEntityLabel007Z(selected.entity, language)], [copy.campaign, selected.campaign], [copy.country, selected.country], [copy.city, selected.city], [copy.currency, selected.currencyPolicy], [copy.points, selected.points], [copy.trips, selected.trips], [copy.stars, selected.stars], [copy.complaints, selected.complaints], [copy.risk, selected.aiRisk], [copy.amount, selected.estimatedBonus]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <section className="taxiBonus020AEvidence"><h3>{copy.evidence}</h3>{selected.evidence.map((item) => <span key={item}>{item}</span>)}</section>
            <section className="taxiBonus020CReviewMatrix" data-taxi-bonus-020c-review-matrix="formula-limits-antifraud-audit">
              <article><span>Формула начисления</span><strong>очки + поездки + звёзды − жалобы − риск</strong><small>расчёт суммы выполняет только сервер по стране, городу и кампании</small></article>
              <article><span>Лимиты и бюджет</span><strong>проверка призового фонда</strong><small>нельзя утвердить бонус без бюджета, архива и пакета владельца</small></article>
              <article><span>Антифрод</span><strong>Owner Sabi AI: ежедневная проверка</strong><small>повторные аккаунты, договорные поездки, жалобы и накрутка блокируют утверждение</small></article>
              <article><span>Журнал проверки</span><strong>все действия уходят в audit</strong><small>кто проверил, когда, по какой причине и какой пакет отправлен владельцу</small></article>
            </section>
          </> : <div className="taxi007yEmptyState"><strong>{copy.noSelected}</strong></div>}
        </main>
        <aside className="taxiBonus020AApproval" data-taxi-bonus-020a-owner-approval-pack="ready">
          <div className="ms007b-sectionTitle"><h2>{copy.checks}</h2><span>{blocked ? copy.blocked : copy.ready}</span></div>
          <div className="taxiBonus020CDecisionGate" data-taxi-bonus-020c-decision-gate="blockers-before-owner-approval">
            <strong>Готовность проверки: {readiness}%</strong>
            <span>Основа экрана готова на 100%, а утверждение зависит от чек-листа.</span>
            {reviewBlockers020C.length ? <ul>{reviewBlockers020C.map((item) => <li key={item}>{item}</li>)}</ul> : <small>Пакет можно отправлять владельцу на утверждение.</small>}
          </div>
          <div className="taxiBonus020AChecks">
            {([
              ["countryCity", copy.checkCountryCity], ["pointsAndTrips", copy.checkPoints], ["complaintsAndFraud", copy.checkComplaints], ["fin anceLegal", copy.checkFinanceLegal], ["ownerPack", copy.checkOwnerPack], ["archive", copy.checkArchive],
            ] as Array<[keyof TaxiBonusChecks007Z, string]>).map(([key, label]) => <label key={key} className={checks[key] ? "checked" : ""}><input type="checkbox" checked={checks[key]} onChange={(event) => setChecks((prev) => ({ ...prev, [key]: event.target.checked }))} /><span>{label}</span></label>)}
          </div>
          <label><span>{copy.reason}</span><textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} /></label>
          <label><span>{copy.note}</span><textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} /></label>
          <div className="taxiBonus020AActions">
            <button type="button" onClick={() => void submitBonusAction("prepare")} disabled={busy === "prepare"}>{copy.prepare}</button>
            <button type="button" onClick={() => void submitBonusAction("request-owner-approval")} disabled={busy === "request-owner-approval"}>{copy.ownerApproval}</button>
            <button type="button" onClick={() => void submitBonusAction("reject")} disabled={busy === "reject"}>{copy.reject}</button>
            <button type="button" onClick={() => void submitBonusAction("archive")} disabled={busy === "archive"}>{copy.archiveAction}</button>
          </div>
          <div className="taxiBonus020AReport" data-taxi-bonus-020a-report-archive="ready" data-taxi-bonus-020c-report-archive="structured-report-owner-pack-audit">
            <strong>{copy.report}</strong>
            <span>{copy.noPayout}</span>
            <small>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : copy.backendOnly}</small>
            <em>Отчёт содержит: кандидат, город, валюта, очки, поездки, звёзды, жалобы, антифрод, причина решения, заметка владельца и архив.</em>
            <code>{lastResponse?.route || (selected ? TAXI_BONUS_020A_ROUTE_CANDIDATE(selected.id) : TAXI_BONUS_020A_ROUTE_QUEUE)}</code>
          </div>
        </aside>
      </div>
    </div>
  );
}


type TaxiContestKind021A = "driver_league" | "rider_challenge";
type TaxiContestDecision021A = "build-report" | "request-owner-approval" | "reject" | "archive";
type TaxiContestCandidate021A = {
  id: string;
  kind: TaxiContestKind021A;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  currencyPolicy: string;
  contestName: string;
  rank: string;
  points: string;
  ordersOrRides: string;
  politeness: string;
  carCleanliness: string;
  stars: string;
  complaints: string;
  aiRisk: string;
  prizePlace: string;
  prizeAmount: string;
  evidence: string[];
};

type TaxiContestChecks021A = {
  countryCityCurrency: boolean;
  leaderboard: boolean;
  scoreFormula: boolean;
  complaintsAntifraud: boolean;
  prizeBudget: boolean;
  ownerApprovalPack: boolean;
  archive: boolean;
};

type TaxiContestResponse021A = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;

type TaxiContestWorldCountry021B = { id: string; name: string; scope: string; currencyPolicy: string };
const TAXI_CONTEST_021B_GLOBAL_WORLD_COUNTRIES = "TAXI-CONTEST-021B-GLOBAL-WORLD-COUNTRIES-195-VISIBLE";
const TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B = 195;
const TAXI_CONTEST_WORLD_COUNTRIES_021B: TaxiContestWorldCountry021B[] = [
  { id: "world-country-001", name: "Австралия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-002", name: "Австрия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-003", name: "Азербайджан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-004", name: "Албания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-005", name: "Алжир", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-006", name: "Ангола", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-007", name: "Андорра", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-008", name: "Антигуа и Барбуда", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-009", name: "Аргентина", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-010", name: "Армения", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-011", name: "Афганистан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-012", name: "Багамы", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-013", name: "Бангладеш", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-014", name: "Барбадос", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-015", name: "Бахрейн", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-016", name: "Беларусь", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-017", name: "Белиз", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-018", name: "Бельгия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-019", name: "Бенин", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-020", name: "Болгария", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-021", name: "Боливия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-022", name: "Босния и Герцеговина", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-023", name: "Ботсвана", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-024", name: "Бразилия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-025", name: "Бруней", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-026", name: "Буркина-Фасо", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-027", name: "Бурунди", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-028", name: "Бутан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-029", name: "Вануату", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-030", name: "Ватикан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-031", name: "Великобритания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-032", name: "Венгрия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-033", name: "Венесуэла", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-034", name: "Восточный Тимор", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-035", name: "Вьетнам", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-036", name: "Габон", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-037", name: "Гаити", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-038", name: "Гайана", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-039", name: "Гамбия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-040", name: "Гана", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-041", name: "Гватемала", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-042", name: "Гвинея", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-043", name: "Гвинея-Бисау", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-044", name: "Германия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-045", name: "Гондурас", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-046", name: "Гренада", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-047", name: "Греция", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-048", name: "Грузия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-049", name: "Дания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-050", name: "Джибути", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-051", name: "Доминика", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-052", name: "Доминиканская Республика", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-053", name: "Египет", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-054", name: "Замбия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-055", name: "Зимбабве", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-056", name: "Израиль", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-057", name: "Индия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-058", name: "Индонезия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-059", name: "Иордания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-060", name: "Ирак", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-061", name: "Иран", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-062", name: "Ирландия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-063", name: "Исландия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-064", name: "Испания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-065", name: "Италия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-066", name: "Йемен", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-067", name: "Кабо-Верде", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-068", name: "Казахстан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-069", name: "Камбоджа", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-070", name: "Камерун", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-071", name: "Канада", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-072", name: "Катар", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-073", name: "Кения", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-074", name: "Кипр", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-075", name: "Киргизстан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-076", name: "Кирибати", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-077", name: "Китай", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-078", name: "Колумбия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-079", name: "Коморы", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-080", name: "Конго", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-081", name: "Демократическая Республика Конго", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-082", name: "КНДР", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-083", name: "Корея", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-084", name: "Коста-Рика", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-085", name: "Кот-д’Ивуар", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-086", name: "Куба", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-087", name: "Кувейт", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-088", name: "Лаос", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-089", name: "Латвия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-090", name: "Лесото", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-091", name: "Либерия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-092", name: "Ливан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-093", name: "Ливия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-094", name: "Литва", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-095", name: "Лихтенштейн", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-096", name: "Люксембург", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-097", name: "Маврикий", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-098", name: "Мавритания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-099", name: "Мадагаскар", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-100", name: "Малави", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-101", name: "Малайзия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-102", name: "Мали", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-103", name: "Мальдивы", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-104", name: "Мальта", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-105", name: "Марокко", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-106", name: "Маршалловы Острова", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-107", name: "Мексика", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-108", name: "Микронезия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-109", name: "Мозамбик", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-110", name: "Молдова", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-111", name: "Монако", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-112", name: "Монголия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-113", name: "Мьянма", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-114", name: "Намибия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-115", name: "Науру", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-116", name: "Непал", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-117", name: "Нигер", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-118", name: "Нигерия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-119", name: "Нидерланды", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-120", name: "Никарагуа", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-121", name: "Новая Зеландия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-122", name: "Норвегия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-123", name: "Объединённые Арабские Эмираты", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-124", name: "Оман", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-125", name: "Пакистан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-126", name: "Палау", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-127", name: "Палестина", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-128", name: "Панама", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-129", name: "Папуа — Новая Гвинея", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-130", name: "Парагвай", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-131", name: "Перу", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-132", name: "Польша", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-133", name: "Португалия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-134", name: "Россия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-135", name: "Руанда", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-136", name: "Румыния", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-137", name: "Сальвадор", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-138", name: "Самоа", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-139", name: "Сан-Марино", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-140", name: "Сан-Томе и Принсипи", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-141", name: "Саудовская Аравия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-142", name: "Северная Македония", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-143", name: "Сейшелы", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-144", name: "Сенегал", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-145", name: "Сент-Винсент и Гренадины", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-146", name: "Сент-Китс и Невис", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-147", name: "Сент-Люсия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-148", name: "Сербия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-149", name: "Сингапур", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-150", name: "Сирия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-151", name: "Словакия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-152", name: "Словения", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-153", name: "Соломоновы Острова", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-154", name: "Сомали", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-155", name: "Судан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-156", name: "Суринам", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-157", name: "США", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-158", name: "Сьерра-Леоне", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-159", name: "Таджикистан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-160", name: "Таиланд", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-161", name: "Танзания", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-162", name: "Того", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-163", name: "Тонга", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-164", name: "Тринидад и Тобаго", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-165", name: "Тувалу", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-166", name: "Тунис", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-167", name: "Туркменистан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-168", name: "Турция", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-169", name: "Уганда", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-170", name: "Узбекистан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-171", name: "Украина", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-172", name: "Уругвай", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-173", name: "Фиджи", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-174", name: "Филиппины", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-175", name: "Финляндия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-176", name: "Франция", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-177", name: "Хорватия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-178", name: "Центральноафриканская Республика", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-179", name: "Чад", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-180", name: "Черногория", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-181", name: "Чехия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-182", name: "Чили", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-183", name: "Швейцария", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-184", name: "Швеция", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-185", name: "Шри-Ланка", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-186", name: "Эквадор", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-187", name: "Экваториальная Гвинея", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-188", name: "Эритрея", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-189", name: "Эсватини", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-190", name: "Эстония", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-191", name: "Эфиопия", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-192", name: "ЮАР", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-193", name: "Южный Судан", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-194", name: "Ямайка", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
  { id: "world-country-195", name: "Япония", scope: "глобальный справочник", currencyPolicy: "валюта, курс и призовой фонд только с сервера" },
];

const TAXI_CONTEST_021A_ADMIN_SCREEN = "TAXI-CONTEST-021A-ADMIN-CONTESTS-100-UI-FOUNDATION";
const TAXI_CONTEST_021A_NO_UI_PAYOUT = "contest_ui_never_pays_or_credits_balance_locally";
const TAXI_CONTEST_021A_ROUTE_QUEUE = "/api/admin/taxi/contests/021a/leaderboard-queue";
const TAXI_CONTEST_021A_ROUTE_CANDIDATE = (candidateId: string) => `/api/admin/taxi/contests/021a/candidates/${encodeURIComponent(candidateId)}`;
const TAXI_CONTEST_021A_ROUTE_DECISION = (candidateId: string, action: TaxiContestDecision021A) => `/api/admin/taxi/contests/021a/candidates/${encodeURIComponent(candidateId)}/${action}`;

const TAXI_CONTEST_SEED_021A: TaxiContestCandidate021A[] = [];

function taxiContestKindLabel021A(kind: TaxiContestKind021A): string {
  return kind === "driver_league" ? "Лига водителей" : "Конкурс пассажиров";
}

function TaxiContestAdmin021APanel({ config, setNotice }: Pick<Props007Z, "config" | "setNotice">) {
  const [selectedId, setSelectedId] = useState(TAXI_CONTEST_SEED_021A[0]?.id || "");
  const [contestFilter, setContestFilter] = useState<"all" | TaxiContestKind021A>("all");
  const [search, setSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<"all" | string>("all");
  const [busy, setBusy] = useState<TaxiContestDecision021A | "load" | null>(null);
  const [ownerNote, setOwnerNote] = useState("");
  const [archiveId, setArchiveId] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiContestResponse021A>(null);
  const [checks, setChecks] = useState<TaxiContestChecks021A>({
    countryCityCurrency: true,
    leaderboard: false,
    scoreFormula: false,
    complaintsAntifraud: false,
    prizeBudget: false,
    ownerApprovalPack: false,
    archive: false,
  });

  const filteredWorldCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => !query || country.name.toLowerCase().includes(query));
  }, [countrySearch]);

  const selectedCountryLabel = selectedCountry === "all" ? "Все государства мира" : selectedCountry;

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return TAXI_CONTEST_SEED_021A.filter((candidate) => {
      const kindOk = contestFilter === "all" || candidate.kind === contestFilter;
      const countryOk = selectedCountry === "all" || candidate.country === selectedCountry || candidate.country === "государство с сервера";
      const queryOk = !query || [candidate.fullName, candidate.phone, candidate.country, candidate.city, candidate.contestName, candidate.rank].join(" ").toLowerCase().includes(query);
      return kindOk && countryOk && queryOk;
    });
  }, [contestFilter, search, selectedCountry]);

  const selected = filteredCandidates.find((candidate) => candidate.id === selectedId) || TAXI_CONTEST_SEED_021A.find((candidate) => candidate.id === selectedId) || filteredCandidates[0] || TAXI_CONTEST_SEED_021A[0];
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const reviewReadiness = Math.round((passedChecks / Object.keys(checks).length) * 100);
  const blocked = reviewReadiness < 100;
  const blockers = [
    !checks.countryCityCurrency ? "Проверить государство, город и валюту" : "",
    !checks.leaderboard ? "Сверить лидерборд и место кандидата" : "",
    !checks.scoreFormula ? "Проверить формулу очков" : "",
    !checks.complaintsAntifraud ? "Проверить жалобы и антифрод" : "",
    !checks.prizeBudget ? "Проверить призовой фонд и лимиты" : "",
    !checks.ownerApprovalPack ? "Собрать пакет утверждения владельца" : "",
    !checks.archive ? "Подготовить отчёт и архив" : "",
  ].filter(Boolean);

  async function submitContestAction(action: TaxiContestDecision021A) {
    const candidate = selected;
    if (!candidate) return;
    setBusy(action);
    const route = TAXI_CONTEST_021A_ROUTE_DECISION(candidate.id, action);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, {
        method: "POST",
        headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-contest-owner-approval-pack": "required", "x-sabi-idempotency-key": `${candidate.id}:${action}:${ownerNote.trim() || "no-owner-note"}` }),
        body: JSON.stringify({ candidateId: candidate.id, action, ownerNote, archiveId, checks, uiOnly: true, noUiPayout: TAXI_CONTEST_021A_NO_UI_PAYOUT }),
      });
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: response.ok ? "Запрос отправлен на сервер" : "Сервер вернул ошибку или safe-disabled", at: new Date().toISOString() });
      setNotice(response.ok ? "Конкурс: запрос отправлен" : "Конкурс: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Конкурс: действие не выполнено, нужен серверная среда");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="taxiContest021A" data-taxi-contest-021a-screen={TAXI_CONTEST_021A_ADMIN_SCREEN} data-taxi-contest-021b-global={TAXI_CONTEST_021B_GLOBAL_WORLD_COUNTRIES} data-taxi-contest-021a-no-ui-payout={TAXI_CONTEST_021A_NO_UI_PAYOUT}>
      <div className="taxiContest021AHero">
        <div><span>Экран конкурсов такси</span><h2>Конкурсы такси</h2><p>Глобальный экран: 195 государств мира, лиги водителей и конкурсы пассажиров по стране и городу, лидерборд, валюта, очки, жалобы, антифрод Owner Sabi AI, призовой фонд, отчёт и архив.</p></div>
        <strong>100%</strong>
      </div>
      <div className="taxiContest021AStatus" data-taxi-contest-021a-readiness="ui-foundation-100-production-safe-disabled">
        <div><span>Основа интерфейса</span><strong>100%</strong><small>очередь, карточка, проверка, отчёт, архив</small></div>
        <div><span>Проверка кандидата</span><strong>{reviewReadiness}%</strong><small>до 100% нельзя отправлять владельцу</small></div>
        <div data-taxi-contest-021b-global-total={TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}><span>Глобальный охват</span><strong>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств</strong><small>страна выбирается из полного справочника</small></div>
        <div><span>Выплаты</span><strong>только сервер</strong><small>UI не начисляет приз и не меняет баланс</small></div>
      </div>
      <div className="taxiContest021AGrid">
        <aside className="taxiContest021AQueue" data-taxi-contest-021a-queue="driver-league-rider-contest-country-city-currency">
          <div className="ms007b-sectionTitle"><h2>Кандидаты</h2><span>{filteredCandidates.length}</span></div>
          <button type="button" onClick={() => setLastResponse({ action: "load", ok: false, status: "safe-disabled", route: TAXI_CONTEST_021A_ROUTE_QUEUE, message: "Загрузка реального лидерборда ждёт сервера и базы данных", at: new Date().toISOString() })}>Загрузить лидерборд</button>
          <section className="taxiContest021BWorld" data-taxi-contest-021b-global-countries={TAXI_CONTEST_021B_GLOBAL_WORLD_COUNTRIES}>
            <div className="taxiContest021BWorldHead"><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</span></div>
            <input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Поиск государства" />
            <select value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)} aria-label="Выбор государства для конкурса">
              <option value="all">Все государства мира</option>
              {TAXI_CONTEST_WORLD_COUNTRIES_021B.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
            </select>
            <div className="taxiContest021BWorldList" data-taxi-contest-021b-world-country-list="all-195-countries-visible">
              {filteredWorldCountries.map((country) => <button key={country.id} type="button" className={selectedCountry === country.name ? "active" : ""} onClick={() => setSelectedCountry(country.name)}><span>{country.name}</span><small>{country.currencyPolicy}</small></button>)}
            </div>
            <small>Выбрано: {selectedCountryLabel}</small>
          </section>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск: ФИО, телефон, город, конкурс" />
          <div className="taxiContest021AFilters" data-taxi-contest-021a-filters="all-drivers-riders">
            <button type="button" className={contestFilter === "all" ? "active" : ""} onClick={() => setContestFilter("all")}>Все</button>
            <button type="button" className={contestFilter === "driver_league" ? "active" : ""} onClick={() => setContestFilter("driver_league")}>Водители</button>
            <button type="button" className={contestFilter === "rider_challenge" ? "active" : ""} onClick={() => setContestFilter("rider_challenge")}>Пассажиры</button>
          </div>
          <div className="taxiContest021AList">
            {filteredCandidates.map((candidate) => (
              <button key={candidate.id} type="button" className={selected?.id === candidate.id ? "active" : ""} onClick={() => setSelectedId(candidate.id)}>
                <strong>{candidate.fullName}</strong><span>{taxiContestKindLabel021A(candidate.kind)} · {candidate.city}</span><small>{candidate.rank} · {candidate.contestName}</small>
              </button>
            ))}
            {!filteredCandidates.length ? <div className="taxiContest021AEmpty">Реальные кандидаты с сервера не загружены. Фейковые кандидаты не показываются.</div> : null}
          </div>
        </aside>

        <main className="taxiContest021ADossier" data-taxi-contest-021a-dossier="leaderboard-points-formula-complaints-antifraud">
          <div className="taxiContest021AHead"><div><h2>Выбранный кандидат</h2><p>{selected?.contestName || "Выберите кандидата"}</p></div><strong>{selected?.prizePlace || "—"}</strong></div>
          {selected ? <>
            <div className="taxiContest021ADataGrid">
              {[["Тип конкурса", taxiContestKindLabel021A(selected.kind)], ["ФИО", selected.fullName], ["Телефон", selected.phone], ["Выбранное государство", selectedCountryLabel], ["Государство кандидата", selected.country], ["Город", selected.city], ["Валюта", selected.currencyPolicy], ["Место", selected.rank], ["Очки", selected.points], ["Заказы / поездки", selected.ordersOrRides], ["Вежливость", selected.politeness], ["Чистота авто", selected.carCleanliness], ["Звёзды", selected.stars], ["Жалобы", selected.complaints], ["Антифрод", selected.aiRisk], ["Приз", selected.prizeAmount]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <section className="taxiContest021AFormula" data-taxi-contest-021a-score-formula="orders-politeness-car-cleanliness-stars-rides-driver-stars">
              <article><span>Формула водителя</span><strong>заказы + вежливость + чистота авто + звёзды</strong><small>жалобы снижают право на приз</small></article>
              <article><span>Формула пассажира</span><strong>поездки + звёзды от водителей + отсутствие нарушений</strong><small>антифрод проверяет накрутку поездок</small></article>
              <article><span>Призы</span><strong>1 / 2 / 3 место</strong><small>сумма и валюта только с backend</small></article>
            </section>
            <section className="taxiContest021AEvidence"><h3>Доказательства</h3>{selected.evidence.map((item) => <span key={item}>{item}</span>)}</section>
          </> : <div className="taxiContest021AEmpty">Выберите кандидата из списка.</div>}
        </main>

        <aside className="taxiContest021AApproval" data-taxi-contest-021a-owner-approval="blockers-report-archive">
          <div className="ms007b-sectionTitle"><h2>Проверка и утверждение</h2><span>{blocked ? "есть блокировки" : "готово"}</span></div>
          <div className="taxiContest021AGate" data-taxi-contest-021a-decision-gate="owner-approval-blocked-until-checklist"><strong>Готовность: {reviewReadiness}%</strong>{blockers.map((blocker) => <small key={blocker}>{blocker}</small>)}</div>
          <div className="taxiContest021AChecks">
            {([ ["countryCityCurrency", "Город / государство / валюта"], ["leaderboard", "Лидерборд и место"], ["scoreFormula", "Формула очков"], ["complaintsAntifraud", "Жалобы и антифрод"], ["prizeBudget", "Призовой фонд и лимиты"], ["ownerApprovalPack", "Пакет владельца"], ["archive", "Отчёт и архив"] ] as Array<[keyof TaxiContestChecks021A, string]>).map(([key, label]) => <label key={key} className={checks[key] ? "checked" : ""}><input type="checkbox" checked={checks[key]} onChange={(event) => setChecks((prev) => ({ ...prev, [key]: event.target.checked }))} /><span>{label}</span></label>)}
          </div>
          <label><span>Заметка владельцу</span><textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} /></label>
          <label><span>ID архива</span><input value={archiveId} onChange={(event) => setArchiveId(event.target.value)} /></label>
          <div className="taxiContest021AActions">
            <button type="button" onClick={() => void submitContestAction("build-report")} disabled={busy === "build-report"}>Собрать отчёт</button>
            <button type="button" onClick={() => void submitContestAction("request-owner-approval")} disabled={blocked || busy === "request-owner-approval"}>Запросить утверждение владельца</button>
            <button type="button" onClick={() => void submitContestAction("reject")} disabled={busy === "reject"}>Отклонить</button>
            <button type="button" onClick={() => void submitContestAction("archive")} disabled={busy === "archive"}>Архивировать</button>
          </div>
          <div className="taxiContest021AReport" data-taxi-contest-021a-report-archive="structured-report-audit-archive"><strong>Отчёт и архив</strong><span>Лидерборд, формула, жалобы, антифрод, бюджет, пакет владельца и решение.</span><code>{lastResponse?.route || (selected ? TAXI_CONTEST_021A_ROUTE_CANDIDATE(selected.id) : TAXI_CONTEST_021A_ROUTE_QUEUE)}</code><small>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : "Ожидает действия"}</small></div>
        </aside>
      </div>
    </div>
  );
}


type TaxiArchiveKind022A = "applications" | "drivers" | "agents" | "agent_balance" | "bonuses" | "contests" | "complaints" | "orders" | "trips" | "tariffs" | "system";
type TaxiArchiveAction022A = "load" | "export-report" | "request-unarchive" | "legal-hold";
type TaxiArchiveRecord022A = {
  id: string;
  kind: TaxiArchiveKind022A;
  title: string;
  entity: string;
  phone: string;
  country: string;
  city: string;
  currencyPolicy: string;
  status: string;
  archivedAt: string;
  archivedBy: string;
  reason: string;
  sourceRoute: string;
  archiveId: string;
  evidence: string[];
  audit: string[];
};
type TaxiArchiveResponse022A = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;
const TAXI_ARCHIVE_022A_ADMIN_SCREEN = "TAXI-ARCHIVE-022A-SEPARATE-ADMIN-SCREEN-100-UI-FOUNDATION";
const TAXI_ARCHIVE_022B_NO_FAKE_GLOBAL_COUNTRIES = "TAXI-ARCHIVE-022B-NO-FAKE-DATA-GLOBAL-195-COUNTRIES";
const TAXI_ARCHIVE_022A_ROUTE_QUEUE = "/api/admin/taxi/archive/022a/records";
const TAXI_ARCHIVE_022A_ROUTE_RECORD = (archiveId: string) => `/api/admin/taxi/archive/022a/records/${encodeURIComponent(archiveId)}`;
const TAXI_ARCHIVE_022A_ROUTE_ACTION = (archiveId: string, action: TaxiArchiveAction022A) => `/api/admin/taxi/archive/022a/records/${encodeURIComponent(archiveId)}/${action}`;
const TAXI_ARCHIVE_022A_SEED: TaxiArchiveRecord022A[] = [];
const TAXI_ARCHIVE_022B_EMPTY_RECORD: TaxiArchiveRecord022A = {
  id: "server-record-without-id",
  kind: "system",
  title: "Запись без названия с сервера",
  entity: "данные с сервера не предоставлены",
  phone: "данные с сервера не предоставлены",
  country: "государство с сервера",
  city: "город с сервера",
  currencyPolicy: "валюта только с сервера",
  status: "статус с сервера",
  archivedAt: "дата с сервера",
  archivedBy: "админ с сервера",
  reason: "причина с сервера",
  sourceRoute: TAXI_ARCHIVE_022A_ROUTE_QUEUE,
  archiveId: "archive-id-from-server",
  evidence: ["доказательства с сервера"],
  audit: ["журнал действий с сервера"],
};
const TAXI_ARCHIVE_KIND_LABELS_022A: Record<TaxiArchiveKind022A, string> = {
  applications: "Заявки", drivers: "Водители", agents: "Агенты", agent_balance: "Баланс агентов", bonuses: "Бонусы", contests: "Конкурсы", complaints: "Жалобы", orders: "Заказы", trips: "Поездки", tariffs: "Тарифы", system: "Системные события",
};

function normalizeArchiveRecord022A(row: Record<string, unknown>, fallback: TaxiArchiveRecord022A = TAXI_ARCHIVE_022B_EMPTY_RECORD): TaxiArchiveRecord022A {
  const pick = (keys: string[]) => keys.map((key) => row[key]).find((value) => value !== undefined && value !== null && String(value).trim() !== "");
  const evidence = pick(["evidence", "documents", "files"]);
  const audit = pick(["audit", "auditTrail", "events"]);
  const rawKind = String(pick(["kind", "type", "module"]) || fallback.kind);
  const safeKind = (Object.prototype.hasOwnProperty.call(TAXI_ARCHIVE_KIND_LABELS_022A, rawKind) ? rawKind : "system") as TaxiArchiveKind022A;
  return {
    id: String(pick(["id", "recordId", "archiveRecordId"]) || fallback.id),
    kind: safeKind,
    title: String(pick(["title", "name", "summary"]) || fallback.title),
    entity: String(pick(["entity", "fullName", "subjectName"]) || fallback.entity),
    phone: String(pick(["phone", "subjectPhone"]) || fallback.phone),
    country: String(pick(["country", "state", "countryName"]) || fallback.country),
    city: String(pick(["city", "region", "cityName"]) || fallback.city),
    currencyPolicy: String(pick(["currencyPolicy", "currency", "currencyLabel"]) || fallback.currencyPolicy),
    status: String(pick(["status", "archiveStatus"]) || fallback.status),
    archivedAt: String(pick(["archivedAt", "createdAt", "updatedAt"]) || fallback.archivedAt),
    archivedBy: String(pick(["archivedBy", "admin", "owner"]) || fallback.archivedBy),
    reason: String(pick(["reason", "decisionReason", "note"]) || fallback.reason),
    sourceRoute: String(pick(["sourceRoute", "route"]) || fallback.sourceRoute),
    archiveId: String(pick(["archiveId", "archiveNumber"]) || fallback.archiveId),
    evidence: Array.isArray(evidence) ? evidence.map(String) : fallback.evidence,
    audit: Array.isArray(audit) ? audit.map(String) : fallback.audit,
  };
}

function TaxiArchiveAdmin022APanel({ config, setNotice }: Props007Z) {
  const [records, setRecords] = useState<TaxiArchiveRecord022A[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [archiveCountrySearch, setArchiveCountrySearch] = useState("");
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState<"all" | TaxiArchiveKind022A>("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [legalHold, setLegalHold] = useState(false);
  const [ownerNote, setOwnerNote] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiArchiveResponse022A>(null);
  const [busy, setBusy] = useState<TaxiArchiveAction022A | null>(null);
  const archiveCountries = TAXI_CONTEST_WORLD_COUNTRIES_021B;
  const filteredArchiveCountries = useMemo(() => {
    const query = archiveCountrySearch.trim().toLowerCase();
    return archiveCountries.filter((country) => !query || country.name.toLowerCase().includes(query));
  }, [archiveCountries, archiveCountrySearch]);
  const filteredRecords = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return records.filter((record) => {
      const kindOk = kindFilter === "all" || record.kind === kindFilter;
      const countryOk = countryFilter === "all" || record.country === countryFilter || record.country === "государство с сервера";
      const haystack = [record.id, record.title, record.entity, record.phone, record.country, record.city, record.status, record.archiveId, TAXI_ARCHIVE_KIND_LABELS_022A[record.kind]].join(" ").toLowerCase();
      return kindOk && countryOk && (!needle || haystack.includes(needle));
    });
  }, [countryFilter, kindFilter, records, search]);
  const selected = records.find((record) => record.id === selectedId) || filteredRecords[0] || null;
  const readiness = selected ? 100 : 0;
  async function loadArchive() {
    setBusy("load");
    setLastResponse({ action: "load", ok: false, status: "started", route: TAXI_ARCHIVE_022A_ROUTE_QUEUE, message: "Запрашиваю архив с сервера", at: new Date().toISOString() });
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${TAXI_ARCHIVE_022A_ROUTE_QUEUE}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => null) as { records?: Record<string, unknown>[]; items?: Record<string, unknown>[] } | null;
      const rows = Array.isArray(json?.records) ? json.records : Array.isArray(json?.items) ? json.items : [];
      if (rows.length) {
        const normalizedRows = rows.map((row) => normalizeArchiveRecord022A(row));
        setRecords(normalizedRows);
        setSelectedId(normalizedRows[0]?.id || "");
      } else {
        setRecords([]);
        setSelectedId("");
      }
      setLastResponse({ action: "load", ok: response.ok, status: response.status, route: TAXI_ARCHIVE_022A_ROUTE_QUEUE, message: rows.length ? `Получено записей: ${rows.length}` : "Сервер не вернул архивные записи. Фейковые данные не показываются.", at: new Date().toISOString() });
    } catch (error) {
      setLastResponse({ action: "load", ok: false, status: "network", route: TAXI_ARCHIVE_022A_ROUTE_QUEUE, message: error instanceof Error ? error.message : "ошибка сети", at: new Date().toISOString() });
    } finally {
      setBusy(null);
    }
  }
  async function submitArchiveAction(action: TaxiArchiveAction022A) {
    if (!selected) return;
    const route = action === "export-report" ? `${TAXI_ARCHIVE_022A_ROUTE_RECORD(selected.archiveId)}/report` : TAXI_ARCHIVE_022A_ROUTE_ACTION(selected.archiveId, action);
    setBusy(action);
    try {
      const payload = { archiveId: selected.archiveId, recordId: selected.id, kind: selected.kind, country: selected.country, city: selected.city, ownerNote, legalHold, uiNoDelete: true, uiNoLocalRestore: true, serverOnlyArchiveAction: true, marker: TAXI_ARCHIVE_022A_ADMIN_SCREEN };
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, { method: "POST", headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-archive-owner-approval": "required", "x-sabi-idempotency-key": `${selected.archiveId}:${action}:${ownerNote.trim() || "no-note"}` }), body: JSON.stringify(payload) });
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: response.ok ? "Запрос отправлен на сервер" : "Сервер вернул ошибку или safe-disabled", at: new Date().toISOString() });
      setNotice(response.ok ? "Архив: запрос отправлен" : "Архив: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network", route, message: error instanceof Error ? error.message : "ошибка сети", at: new Date().toISOString() });
      setNotice("Архив: действие не выполнено, нужен серверная среда");
    } finally {
      setBusy(null);
    }
  }
  return (
    <div className="taxiArchive022A" data-taxi-archive-022a-screen={TAXI_ARCHIVE_022A_ADMIN_SCREEN} data-taxi-archive-022b-no-fake-global={TAXI_ARCHIVE_022B_NO_FAKE_GLOBAL_COUNTRIES}>
      <div className="taxiArchive022AHero">
        <div><span>Экран архива такси</span><h2>Архив такси</h2><p>Отдельный профессиональный архив без фейковых записей: заявки, агенты, баланс агентов, бонусы, конкурсы, жалобы, заказы, поездки, тарифы и системные события загружаются только с backend. Государства — полный глобальный справочник 195 стран.</p></div>
        <strong>100%</strong>
      </div>
      <div className="taxiArchive022AStatus" data-taxi-archive-022a-readiness="ui-foundation-100-server-only-actions">
        <div><span>Основа интерфейса</span><strong>100%</strong><small>поиск, фильтры, карточка, доказательства, audit</small></div>
        <div><span>Государства</span><strong>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</strong><small>глобальный список стран мира</small></div>
        <div><span>Юридическая защита</span><strong>{legalHold ? "включена" : "доступна"}</strong><small>legal hold перед спорными действиями</small></div>
        <div><span>Данные</span><strong>только backend</strong><small>без seed/примеров/локальных записей</small></div>
      </div>
      <div className="taxiArchive022AGrid">
        <aside className="taxiArchive022AQueue" data-taxi-archive-022a-list="all-modules-search-filters">
          <div className="ms007b-sectionTitle"><h2>Записи архива</h2><span>{filteredRecords.length}</span></div>
          <button type="button" disabled={busy === "load"} onClick={() => void loadArchive()}>{busy === "load" ? "Загрузка..." : "Загрузить архив"}</button>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск: номер, ФИО, телефон, страна, город, раздел" />
          <select value={kindFilter} onChange={(event) => setKindFilter(event.target.value as "all" | TaxiArchiveKind022A)} aria-label="Фильтр раздела архива">
            <option value="all">Все разделы</option>
            {Object.entries(TAXI_ARCHIVE_KIND_LABELS_022A).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <section className="taxiArchive022BWorld" data-taxi-archive-022b-global-countries="195-world-countries-no-fake-records">
            <div className="taxiArchive022BWorldHead"><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</span></div>
            <input value={archiveCountrySearch} onChange={(event) => setArchiveCountrySearch(event.target.value)} placeholder="Поиск государства" />
            <select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} aria-label="Фильтр государства архива">
              <option value="all">Все государства мира</option>
              {archiveCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
            </select>
            <div className="taxiArchive022BWorldList" data-taxi-archive-022b-world-country-list="all-195-countries-visible">
              {filteredArchiveCountries.map((country) => <button key={country.id} type="button" className={countryFilter === country.name ? "active" : ""} onClick={() => setCountryFilter(country.name)}><span>{country.name}</span><small>{country.currencyPolicy}</small></button>)}
            </div>
          </section>
          <div className="taxiArchive022AList">
            {filteredRecords.map((record) => <button key={record.id} type="button" className={selected?.id === record.id ? "active" : ""} onClick={() => setSelectedId(record.id)}><strong>{record.title}</strong><span>{TAXI_ARCHIVE_KIND_LABELS_022A[record.kind]} · {record.city}</span><small>{record.archiveId} · {record.status}</small></button>)}
            {!filteredRecords.length ? <div className="taxiArchive022AEmpty">Архивные записи не загружены с backend. Фейковые записи не показываются.</div> : null}
          </div>
        </aside>
        <main className="taxiArchive022ADossier" data-taxi-archive-022a-dossier="record-evidence-audit-before-after">
          <div className="taxiArchive022AHead"><div><h2>Карточка архива</h2><p>{selected?.archiveId || "Выберите запись"}</p></div><strong>{readiness}%</strong></div>
          {selected ? <>
            <div className="taxiArchive022ADataGrid">
              {[["Раздел", TAXI_ARCHIVE_KIND_LABELS_022A[selected.kind]], ["Название", selected.title], ["Объект", selected.entity], ["Телефон", selected.phone], ["Государство", selected.country], ["Город", selected.city], ["Валюта", selected.currencyPolicy], ["Статус", selected.status], ["Дата архива", selected.archivedAt], ["Кто архивировал", selected.archivedBy], ["Причина", selected.reason], ["Источник", selected.sourceRoute]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <section className="taxiArchive022AEvidence" data-taxi-archive-022a-evidence="documents-files-photos-chat-txhash"><h3>Доказательства и файлы</h3>{selected.evidence.map((item) => <span key={item}>{item}</span>)}</section>
            <section className="taxiArchive022AAudit" data-taxi-archive-022a-audit="timeline-owner-admin-sabi-ai"><h3>Журнал действий</h3>{selected.audit.map((item, index) => <article key={`${item}-${index}`}><strong>{index + 1}</strong><span>{item}</span></article>)}</section>
          </> : <div className="taxiArchive022AEmpty">Нажмите «Загрузить архив». Если backend не вернул данные, список останется пустым — без фейковых записей.</div>}
        </main>
        <aside className="taxiArchive022AActions" data-taxi-archive-022a-actions="export-report-legal-hold-owner-approval">
          <div className="ms007b-sectionTitle"><h2>Действия архива</h2><span>server-only</span></div>
          <label className="taxiArchive022ACheck"><input type="checkbox" checked={legalHold} onChange={(event) => setLegalHold(event.target.checked)} /><span>Legal hold / запрет удаления до решения владельца</span></label>
          <label><span>Заметка владельцу / аудитору</span><textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} /></label>
          <div className="taxiArchive022AButtons">
            <button type="button" onClick={() => void submitArchiveAction("export-report")} disabled={!selected || busy === "export-report"}>Сформировать отчёт</button>
            <button type="button" onClick={() => void submitArchiveAction("legal-hold")} disabled={!selected || busy === "legal-hold"}>Включить legal hold</button>
            <button type="button" onClick={() => void submitArchiveAction("request-unarchive")} disabled={!selected || !ownerNote.trim() || busy === "request-unarchive"}>Запросить восстановление</button>
            <button type="button" onClick={() => void submitArchiveAction("load")} disabled={!selected || busy === "load"}>Проверить запись</button>
          </div>
          <div className="taxiArchive022AGuard"><strong>Защита от ошибки</strong><span>UI не удаляет архив и не восстанавливает запись локально.</span><small>Любое спорное действие требует backend, audit и утверждение владельца.</small></div>
          <div className="taxiArchive022AReport" data-taxi-archive-022a-report="structured-export-audit"><strong>Отчёт и экспорт</strong><span>{selected ? `${selected.archiveId} · ${selected.title}` : "Запись не выбрана"}</span><code>{lastResponse?.route || (selected ? TAXI_ARCHIVE_022A_ROUTE_RECORD(selected.archiveId) : TAXI_ARCHIVE_022A_ROUTE_QUEUE)}</code><small>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : "Ожидает реальные данные с сервер"}</small></div>
        </aside>
      </div>
    </div>
  );
}


type TaxiReportSection023A = "all" | "applications" | "drivers" | "agents" | "agent_balance" | "bonuses" | "contests" | "complaints" | "orders" | "trips" | "tariffs" | "archive" | "system";
type TaxiReportAction023A = "load" | "generate" | "export" | "schedule" | "archive";
type TaxiReportRow023A = {
  reportId: string;
  section: TaxiReportSection023A;
  title: string;
  country: string;
  city: string;
  period: string;
  status: string;
  createdAt: string;
  source: string;
};

const TAXI_REPORT_023A_MARKER = "TAXI-REPORTS-023A-ADMIN-SCREEN-100-UI-FOUNDATION-NO-FAKE-GLOBAL";
const TAXI_REPORT_023A_NO_FAKE_DATA = "reports_backend_only_no_local_seed_records_no_fake_reports";
const TAXI_REPORT_023A_GLOBAL_COUNTRIES_POLICY = "195_world_countries_visible_search_select_filter_ready";
const TAXI_REPORT_023A_SERVER_CURRENCY_POLICY = "валюта, курс и призовой фонд только с сервера; валюта и призовой фонд только с сервера";
const TAXI_REPORT_023A_ROUTE_QUEUE = "/api/admin/taxi/reports/023a/queue";
const TAXI_REPORT_023A_ROUTE_GENERATE = "/api/admin/taxi/reports/023a/generate";
const TAXI_REPORT_023A_ROUTE_EXPORT = "/api/admin/taxi/reports/023a/export";
const TAXI_REPORT_023A_ROUTE_SCHEDULE = "/api/admin/taxi/reports/023a/schedule";
const TAXI_REPORT_023A_ROUTE_ARCHIVE = "/api/admin/taxi/reports/023a/archive";
const TAXI_REPORT_023A_INITIAL_ROWS: TaxiReportRow023A[] = [];
const TAXI_REPORT_023A_SECTIONS: Array<{ id: TaxiReportSection023A; label: string; description: string }> = [
  { id: "all", label: "Все разделы", description: "Единый обзор по такси" },
  { id: "applications", label: "Заявки", description: "Заявки водителей и агентов" },
  { id: "drivers", label: "Водители", description: "Активность, рейтинг, блокировки" },
  { id: "agents", label: "Агенты", description: "Статус, город, связь, документы" },
  { id: "agent_balance", label: "Баланс агентов", description: "Пополнения, проверки, TxHash, архив" },
  { id: "bonuses", label: "Бонусы", description: "Кандидаты, лимиты, антифрод" },
  { id: "contests", label: "Конкурсы", description: "Лиги, места, призовой фонд" },
  { id: "complaints", label: "Жалобы", description: "Ежедневная проверка и решения" },
  { id: "orders", label: "Заказы", description: "Заявки поездок и диспетчеризация" },
  { id: "trips", label: "Поездки", description: "Факты поездок и статусы" },
  { id: "tariffs", label: "Тарифы", description: "Страны, города, правила расчёта" },
  { id: "archive", label: "Архив", description: "Архивные записи и доказательства" },
  { id: "system", label: "Системные события", description: "Аудит trail и технические события" },
];
const TAXI_REPORT_023A_PERIODS = ["Сегодня", "Вчера", "7 дней", "30 дней", "Месяц", "Квартал", "Год", "Свой период"];
const TAXI_REPORT_023A_CHECKLIST = [
  "Данные получены только с сервер",
  "Государство выбрано из глобального справочника 195 стран",
  "Валюта и курс не задаются в интерфейс",
  "Отчёт не содержит фейковых строк",
  "Саби ИИ владельца риск и аудит включены",
  "Экспорт и архив выполняются только через сервер",
];

function TaxiReportsAdmin023APanel({ language, config, setNotice }: Props007Z) {
  const [selectedSection, setSelectedSection] = useState<TaxiReportSection023A>("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [countrySearch, setCountrySearch] = useState("");
  const [period, setPeriod] = useState(TAXI_REPORT_023A_PERIODS[0]);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<TaxiReportRow023A[]>(TAXI_REPORT_023A_INITIAL_ROWS);
  const [lastResponse, setLastResponse] = useState<LastResponse007Z>(null);
  const [busy, setBusy] = useState<TaxiReportAction023A | "">("");
  const isRu = language === "ru";

  const visibleCountries = useMemo(() => {
    const needle = countrySearch.trim().toLowerCase();
    if (!needle) return TAXI_CONTEST_WORLD_COUNTRIES_021B;
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => country.name.toLowerCase().includes(needle));
  }, [countrySearch]);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      const bySection = selectedSection === "all" || row.section === selectedSection;
      const byCountry = selectedCountry === "all" || row.country === selectedCountry;
      const byQuery = !needle || `${row.reportId} ${row.title} ${row.country} ${row.city} ${row.status}`.toLowerCase().includes(needle);
      return bySection && byCountry && byQuery;
    });
  }, [rows, selectedSection, selectedCountry, query]);

  const routeForAction = (action: TaxiReportAction023A) => {
    if (action === "generate") return TAXI_REPORT_023A_ROUTE_GENERATE;
    if (action === "export") return TAXI_REPORT_023A_ROUTE_EXPORT;
    if (action === "schedule") return TAXI_REPORT_023A_ROUTE_SCHEDULE;
    if (action === "archive") return TAXI_REPORT_023A_ROUTE_ARCHIVE;
    return TAXI_REPORT_023A_ROUTE_QUEUE;
  };

  const submitReportAction = async (action: TaxiReportAction023A) => {
    const route = routeForAction(action);
    const payload = { action, section: selectedSection, country: selectedCountry, period, query, noFake: true, globalCountries: TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B, serverOnly: true, marker: TAXI_REPORT_023A_MARKER };
    setBusy(action);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, { method: action === "load" ? "GET" : "POST", headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-reports-023a": "backend-only-no-fake" }), body: action === "load" ? undefined : JSON.stringify(payload) });
      const json = await response.json().catch(() => ({} as any));
      if (action === "load" && response.ok && Array.isArray(json?.records)) {
        setRows(json.records as TaxiReportRow023A[]);
      }
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? "Запрос отчёта принят" : "Сервер не подтвердил действие")), at: new Date().toISOString() });
      setNotice(response.ok ? "Отчёты: запрос отправлен" : "Отчёты: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Отчёты: действие не выполнено, нужен серверная среда");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="taxiReport023A" data-taxi-report-023a-admin-screen={TAXI_REPORT_023A_MARKER} data-taxi-report-023a-no-fake={TAXI_REPORT_023A_NO_FAKE_DATA} data-taxi-report-023a-global-countries={TAXI_REPORT_023A_GLOBAL_COUNTRIES_POLICY}>
      <header className="taxiReport023AHero">
        <div><span>Экран отчётов такси</span><h2>Отчёты такси</h2><p>Профессиональный глобальный экран отчётов: все разделы Taxi, 195 государств мира, поиск, период, фильтры, audit, Owner Sabi AI, экспорт и архив только через backend. Фейковые строки не показываются.</p></div>
        <div className="taxiReport023AReady"><strong>100%</strong><span>UI foundation</span><small>Production 48%</small></div>
      </header>

      <div className="taxiReport023AControls" data-taxi-report-023a-search-filters-periods="ready">
        <label><span>Поиск отчёта</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="номер / раздел / город / статус" /></label>
        <label><span>Период отчёта</span><select value={period} onChange={(event) => setPeriod(event.target.value)}>{TAXI_REPORT_023A_PERIODS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>Раздел отчёта</span><select value={selectedSection} onChange={(event) => setSelectedSection(event.target.value as TaxiReportSection023A)}>{TAXI_REPORT_023A_SECTIONS.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}</select></label>
      </div>

      <div className="taxiReport023AWorld" data-taxi-report-023a-world-countries="195-world-countries-search-select-filter">
        <div><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств · глобальный проект</span><small>{TAXI_REPORT_023A_SERVER_CURRENCY_POLICY}</small></div>
        <input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Поиск государства" />
        <select aria-label="Выбор государства для отчётов" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="all">Все государства мира</option>
          {visibleCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
      </div>

      <div className="taxiReport023AGrid">
        <aside className="taxiReport023ASections" data-taxi-report-023a-sections="applications-drivers-agents-agent-balance-bonuses-contests-complaints-orders-trips-tariffs-archive-system">
          <h3>Разделы отчёта</h3>
          {TAXI_REPORT_023A_SECTIONS.map((section) => <button key={section.id} type="button" className={selectedSection === section.id ? "active" : ""} onClick={() => setSelectedSection(section.id)}><strong>{section.label}</strong><span>{section.description}</span></button>)}
        </aside>

        <main className="taxiReport023AQueue" data-taxi-report-023a-backend-only-empty-state="no-fake-reports">
          <div className="taxiReport023AQueueHead"><div><h3>Список отчётов</h3><p>Загрузка только с backend. Локальные демо-отчёты запрещены.</p></div><button type="button" onClick={() => void submitReportAction("load")} disabled={busy === "load"}>Загрузить реальные отчёты</button></div>
          {filteredRows.length ? filteredRows.map((row) => <button key={row.reportId} type="button" className="taxiReport023ARow"><strong>{row.reportId}</strong><span>{row.title}</span><small>{row.country} · {row.city} · {row.period} · {row.status}</small></button>) : <div className="taxiReport023AEmpty"><strong>Отчёты не загружены с backend</strong><span>Фейковые отчёты и локальные примеры не показываются. После подключения DB/backend здесь появятся реальные отчёты по выбранному государству, городу, разделу и периоду.</span></div>}
        </main>

        <aside className="taxiReport023ADossier" data-taxi-report-023a-dossier-audit-export-archive="ready">
          <h3>Проверка отчёта</h3>
          <div className="taxiReport023AMatrix">{TAXI_REPORT_023A_CHECKLIST.map((item) => <span key={item}>✓ {item}</span>)}</div>
          <div className="taxiReport023AActions">
            <button type="button" onClick={() => void submitReportAction("generate")} disabled={busy === "generate"}>Сформировать отчёт</button>
            <button type="button" onClick={() => void submitReportAction("export")} disabled={busy === "export"}>Запросить экспорт</button>
            <button type="button" onClick={() => void submitReportAction("schedule")} disabled={busy === "schedule"}>Настроить расписание</button>
            <button type="button" onClick={() => void submitReportAction("archive")} disabled={busy === "archive"}>Отправить в архив</button>
          </div>
          <div className="taxiReport023ALast"><strong>Последний ответ сервера</strong><span>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : "Ожидает сервер"}</span><code>{lastResponse?.route || TAXI_REPORT_023A_ROUTE_QUEUE}</code></div>
          <div className="taxiReport023APolicy" data-taxi-report-023a-server-only-policy="ui-never-generates-fake-export-locally"><strong>Безопасность</strong><span>UI не создаёт фейковый отчёт, не экспортирует локально, не меняет архив и не выполняет денежные операции.</span></div>
        </aside>
      </div>
    </section>
  );
}


type TaxiDriverCarStatus024A = "all" | "active" | "review" | "blocked" | "expired_docs";
type TaxiDriverCarAction024A = "load" | "open" | "request-docs" | "verify" | "block" | "archive";
type TaxiDriverCarRecord024A = {
  id: string;
  driverId: string;
  driverName: string;
  phone: string;
  country: string;
  city: string;
  status: string;
  rating: string;
  orders: string;
  agentPhone: string;
  carId: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  className: string;
  docsStatus: string;
  photosStatus: string;
  updatedAt: string;
};

const TAXI_DRIVERS_CARS_024A_MARKER = "TAXI-DRIVERS-CARS-024A-ONE-SCREEN-NO-FAKE-GLOBAL";
const TAXI_DRIVERS_CARS_024A_NO_FAKE = "drivers_cars_backend_only_no_local_seed_records";
const TAXI_DRIVERS_CARS_024A_ROUTE_LIST = "/api/admin/taxi/drivers-cars/024a/list";
const TAXI_DRIVERS_CARS_024A_ROUTE_DETAIL = "/api/admin/taxi/drivers-cars/024a/detail";
const TAXI_DRIVERS_CARS_024A_ROUTE_REQUEST_DOCS = "/api/admin/taxi/drivers-cars/024a/request-docs";
const TAXI_DRIVERS_CARS_024A_ROUTE_VERIFY = "/api/admin/taxi/drivers-cars/024a/verify";
const TAXI_DRIVERS_CARS_024A_ROUTE_BLOCK = "/api/admin/taxi/drivers-cars/024a/block";
const TAXI_DRIVERS_CARS_024A_ROUTE_ARCHIVE = "/api/admin/taxi/drivers-cars/024a/archive";
const TAXI_DRIVERS_CARS_024A_INITIAL_RECORDS: TaxiDriverCarRecord024A[] = [];
const TAXI_DRIVERS_CARS_024A_STATUSES: Array<{ id: TaxiDriverCarStatus024A; label: string }> = [
  { id: "all", label: "Все статусы" },
  { id: "active", label: "Активные" },
  { id: "review", label: "На проверке" },
  { id: "blocked", label: "Заблокированные" },
  { id: "expired_docs", label: "Истекли документы" },
];
const TAXI_DRIVERS_CARS_024A_DOC_CHECKS = [
  "Паспорт / номер водителя",
  "Водительские права",
  "Фото водителя",
  "Документ автомобиля",
  "Техосмотр / страховка",
  "Фото авто: перед / зад / левая / правая сторона",
  "Фото салона и приборной панели",
  "Государство и город из сервер",
  "Госномер и класс авто подтверждены",
  "Саби ИИ владельца проверил риски и жалобы",
];
const TAXI_DRIVERS_CARS_024A_SERVER_ONLY_POLICY = "данные водителя, авто, город, государство, валюта, статус и доступ только с сервер; интерфейс не добавляет фейковые записи";

function TaxiDriversCars024APanel({ config, setNotice }: Props007Z) {
  const [records, setRecords] = useState<TaxiDriverCarRecord024A[]>(TAXI_DRIVERS_CARS_024A_INITIAL_RECORDS);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TaxiDriverCarStatus024A>("all");
  const [lastResponse, setLastResponse] = useState<LastResponse007Z>(null);
  const [busy, setBusy] = useState<TaxiDriverCarAction024A | "">("");

  const visibleCountries = useMemo(() => {
    const needle = countrySearch.trim().toLowerCase();
    if (!needle) return TAXI_CONTEST_WORLD_COUNTRIES_021B;
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => country.name.toLowerCase().includes(needle));
  }, [countrySearch]);

  const filteredRecords = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      const haystack = `${record.id} ${record.driverId} ${record.driverName} ${record.phone} ${record.country} ${record.city} ${record.plate} ${record.brand} ${record.model} ${record.status}`.toLowerCase();
      const byQuery = !needle || haystack.includes(needle);
      const byCountry = selectedCountry === "all" || record.country === selectedCountry;
      const byStatus = selectedStatus === "all" || record.status === selectedStatus;
      return byQuery && byCountry && byStatus;
    });
  }, [records, query, selectedCountry, selectedStatus]);

  const selectedRecord = useMemo(() => filteredRecords.find((record) => record.id === selectedId) || records.find((record) => record.id === selectedId) || null, [filteredRecords, records, selectedId]);

  const routeForAction = (action: TaxiDriverCarAction024A) => {
    if (action === "open") return TAXI_DRIVERS_CARS_024A_ROUTE_DETAIL;
    if (action === "request-docs") return TAXI_DRIVERS_CARS_024A_ROUTE_REQUEST_DOCS;
    if (action === "verify") return TAXI_DRIVERS_CARS_024A_ROUTE_VERIFY;
    if (action === "block") return TAXI_DRIVERS_CARS_024A_ROUTE_BLOCK;
    if (action === "archive") return TAXI_DRIVERS_CARS_024A_ROUTE_ARCHIVE;
    return TAXI_DRIVERS_CARS_024A_ROUTE_LIST;
  };

  const submitDriversCarsAction = async (action: TaxiDriverCarAction024A, record?: TaxiDriverCarRecord024A) => {
    const route = routeForAction(action);
    const payload = {
      action,
      recordId: record?.id || selectedRecord?.id || "",
      driverId: record?.driverId || selectedRecord?.driverId || "",
      carId: record?.carId || selectedRecord?.carId || "",
      country: selectedCountry,
      status: selectedStatus,
      query,
      noFake: true,
      globalCountries: TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B,
      serverOnly: true,
      marker: TAXI_DRIVERS_CARS_024A_MARKER,
    };
    setBusy(action);
    try {
      const url = new URL(`${normalizeBase007Z(config)}${route}`);
      if (action === "load") {
        url.searchParams.set("country", selectedCountry);
        url.searchParams.set("status", selectedStatus);
        url.searchParams.set("query", query);
      }
      const response = await fetch(url.toString(), { method: action === "load" ? "GET" : "POST", headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-drivers-cars-024a": "backend-only-no-fake" }), body: action === "load" ? undefined : JSON.stringify(payload) });
      const json = await response.json().catch(() => ({} as any));
      if (action === "load" && response.ok && Array.isArray(json?.records)) {
        setRecords(json.records as TaxiDriverCarRecord024A[]);
        setSelectedId("");
      }
      if (action === "open" && response.ok && json?.record) {
        const nextRecord = json.record as TaxiDriverCarRecord024A;
        setRecords((prev) => prev.some((item) => item.id === nextRecord.id) ? prev.map((item) => item.id === nextRecord.id ? nextRecord : item) : [nextRecord, ...prev]);
        setSelectedId(nextRecord.id);
      }
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? "Запрос отправлен" : "Сервер не подтвердил действие")), at: new Date().toISOString() });
      setNotice(response.ok ? "Водители и авто: запрос отправлен" : "Водители и авто: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Водители и авто: нужен серверная среда");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="taxiDriversCars024A" data-taxi-drivers-cars-024a-one-screen={TAXI_DRIVERS_CARS_024A_MARKER} data-taxi-drivers-cars-024a-no-fake={TAXI_DRIVERS_CARS_024A_NO_FAKE}>
      <header className="taxiDriversCars024AHero">
        <div><span>Единый экран</span><h2>Водители и авто</h2><p>Один профессиональный экран для проверки водителя и автомобиля вместе: документы, фото, госномер, город, государство, статус, жалобы, риск Owner Sabi AI, архив и backend-действия. Фейковые водители и авто не показываются.</p></div>
        <div className="taxiDriversCars024AReady"><strong>100%</strong><span>UI foundation</span><small>Production 50%</small></div>
      </header>

      <div className="taxiDriversCars024AControls" data-taxi-drivers-cars-024a-search-filters="ready">
        <label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ФИО / телефон / госномер / город" /></label>
        <label><span>Статус</span><select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as TaxiDriverCarStatus024A)}>{TAXI_DRIVERS_CARS_024A_STATUSES.map((status) => <option key={status.id} value={status.id}>{status.label}</option>)}</select></label>
        <button type="button" onClick={() => void submitDriversCarsAction("load")} disabled={busy === "load"}>{busy === "load" ? "Загрузка" : "Загрузить реальные данные"}</button>
      </div>

      <div className="taxiDriversCars024AWorld" data-taxi-drivers-cars-024a-global-countries="195-world-countries-search-select-filter-ready">
        <div><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств · глобальный Taxi</span><small>{TAXI_DRIVERS_CARS_024A_SERVER_ONLY_POLICY}</small></div>
        <input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Поиск государства" />
        <select aria-label="Государство для водителей и авто" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="all">Все государства мира</option>
          {visibleCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
      </div>

      <div className="taxiDriversCars024AGrid">
        <aside className="taxiDriversCars024AList" data-taxi-drivers-cars-024a-list="backend-only-empty-until-real-records">
          <div className="taxiDriversCars024AListHead"><h3>Водители + авто</h3><span>{filteredRecords.length}</span></div>
          {filteredRecords.length ? filteredRecords.map((record) => (
            <button key={record.id} type="button" className={selectedId === record.id ? "active" : ""} onClick={() => { setSelectedId(record.id); void submitDriversCarsAction("open", record); }}>
              <strong>{record.driverName || record.driverId}</strong>
              <span>{record.phone} · {record.city} · {record.country}</span>
              <small>{record.plate} · {record.brand} {record.model} · {record.status}</small>
            </button>
          )) : <div className="taxiDriversCars024AEmpty"><strong>Реальных записей пока нет</strong><span>UI не подставляет фейковых водителей и авто. Нажми “Загрузить реальные данные”, когда backend/DB будет готов.</span></div>}
        </aside>

        <main className="taxiDriversCars024ADossier" data-taxi-drivers-cars-024a-dossier="driver-and-car-one-screen">
          <div className="taxiDriversCars024ADossierHead"><div><h3>Досье водителя и автомобиля</h3><span>{selectedRecord ? selectedRecord.id : "Выбери реальную запись из списка"}</span></div><strong>1 экран</strong></div>
          {selectedRecord ? (
            <div className="taxiDriversCars024ATwoColumns">
              <section><h4>Водитель</h4><dl><dt>ФИО</dt><dd>{selectedRecord.driverName}</dd><dt>Телефон</dt><dd>{selectedRecord.phone}</dd><dt>Государство</dt><dd>{selectedRecord.country}</dd><dt>Город</dt><dd>{selectedRecord.city}</dd><dt>Рейтинг</dt><dd>{selectedRecord.rating}</dd><dt>Заказы</dt><dd>{selectedRecord.orders}</dd><dt>Номер агента города</dt><dd>{selectedRecord.agentPhone || "Только с сервер"}</dd></dl></section>
              <section><h4>Автомобиль</h4><dl><dt>Госномер</dt><dd>{selectedRecord.plate}</dd><dt>Марка / модель</dt><dd>{selectedRecord.brand} {selectedRecord.model}</dd><dt>Год / цвет</dt><dd>{selectedRecord.year} · {selectedRecord.color}</dd><dt>Класс</dt><dd>{selectedRecord.className}</dd><dt>Документы</dt><dd>{selectedRecord.docsStatus}</dd><dt>Фото</dt><dd>{selectedRecord.photosStatus}</dd></dl></section>
            </div>
          ) : (
            <div className="taxiDriversCars024AEmpty large"><strong>Досье пустое</strong><span>Данные водителя и автомобиля появятся только после ответа backend. Локальные примеры отключены.</span></div>
          )}
        </main>

        <aside className="taxiDriversCars024ACheck" data-taxi-drivers-cars-024a-docs-photos-audit="passport-license-car-docs-photos-ai-risk-archive">
          <h3>Проверка</h3>
          <div className="taxiDriversCars024AChecks">{TAXI_DRIVERS_CARS_024A_DOC_CHECKS.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="taxiDriversCars024AActions">
            <button type="button" disabled={!selectedRecord || busy === "request-docs"} onClick={() => void submitDriversCarsAction("request-docs")}>Запросить документы</button>
            <button type="button" disabled={!selectedRecord || busy === "verify"} onClick={() => void submitDriversCarsAction("verify")}>Подтвердить проверку</button>
            <button type="button" disabled={!selectedRecord || busy === "block"} onClick={() => void submitDriversCarsAction("block")}>Заблокировать до проверки</button>
            <button type="button" disabled={!selectedRecord || busy === "archive"} onClick={() => void submitDriversCarsAction("archive")}>Отправить в архив</button>
          </div>
          <div className="taxiDriversCars024APolicy"><strong>Server-only</strong><span>{TAXI_DRIVERS_CARS_024A_SERVER_ONLY_POLICY}</span><small>UI не создаёт водителя, не добавляет авто, не меняет статус и не выдаёт доступ локально.</small></div>
          {lastResponse ? <div className="taxiDriversCars024ALast"><strong>Последний ответ</strong><span>{lastResponse.message}</span><code>{lastResponse.route}</code></div> : null}
        </aside>
      </div>
    </section>
  );
}



// TAXI-MANAGEMENT-025A-ADMIN-SCREEN-GLOBAL-NO-FAKE
const TAXI_MANAGEMENT_025A_MARKER = "TAXI-MANAGEMENT-025A-ADMIN-SCREEN-GLOBAL-NO-FAKE";
const TAXI_MANAGEMENT_025A_SERVER_ONLY = "Управление меняется только через сервер и утверждение владельца. интерфейс не сохраняет настройки локально.";
const TAXI_MANAGEMENT_025A_NO_FAKE = "NO_LOCAL_SEED_MANAGEMENT_CONFIG_BACKEND_ONLY_EMPTY_STATE";
type TaxiManagementSection025A = "countries" | "cities" | "dispatch" | "tariffs" | "finance" | "staff" | "access" | "safety" | "reports" | "system";
type TaxiManagementResponse025A = { action: string; ok: boolean; status: number | string; message: string; route: string; at: string } | null;
type TaxiManagementRecord025A = { id: string; section: TaxiManagementSection025A; country: string; city: string; title: string; status: string; ownerApproval: string; updatedAt: string };
const TAXI_MANAGEMENT_025A_SECTIONS: Array<{ id: TaxiManagementSection025A; title: string; description: string }> = [
  { id: "countries", title: "Государства", description: "Глобальное управление 195 государствами: включение страны, правила запуска, язык, валюта только с сервер." },
  { id: "cities", title: "Города", description: "Города, зоны работы, видимость агентов, локальные ограничения и доступность такси." },
  { id: "dispatch", title: "Диспетчеризация", description: "Правила распределения заказов, очереди, приоритеты и аварийные ограничения." },
  { id: "tariffs", title: "Тарифы", description: "Связь с тарифными матрицами, пиковыми правилами, комиссиями и валютой страны." },
  { id: "finance", title: "Финансы", description: "Баланс агентов, выплаты, бонусы, конкурсы и финансовые блокировки только через сервер." },
  { id: "staff", title: "Сотрудники", description: "Роли, смены, зоны ответственности, права менеджеров и операторов такси." },
  { id: "access", title: "Доступ", description: "владелец, Саби ИИ владельца, заместители, менеджеры, агенты и function-scoped permissions." },
  { id: "safety", title: "Безопасность", description: "Жалобы, блокировки, антифрод Саби ИИ владельца, юридическая блокировка и аварийные флаги." },
  { id: "reports", title: "Отчёты", description: "Расписание ежедневных отчётов, экспорт, архив и контроль пустых данных без фейка." },
  { id: "system", title: "Система", description: "Статусы серверной среды, хранилища, журнала и провайдера. Без включения движения денег из интерфейса." },
];
const TAXI_MANAGEMENT_025A_REQUIRED_GATES = [
  "утверждение владельца перед изменением глобальной страны",
  "Саби ИИ владельца risk review перед включением города",
  "Сервер аудит обязателен для любой настройки",
  "База данных, хранилище, журнал и провайдер не изменяются из интерфейса.",
  "Фейковые настройки не подставляются",
  "Валюта, курс и бюджет только с сервер",
];
const TAXI_MANAGEMENT_025A_ROUTES = {
  load: "/api/admin/taxi/management/025a/load",
  request: "/api/admin/taxi/management/025a/request-change",
  approval: "/api/admin/taxi/management/025a/request-owner-approval",
  archive: "/api/admin/taxi/management/025a/archive",
};

function TaxiManagementAdmin025APanel({ language, config, setNotice }: Props007Z) {
  const [section, setSection] = useState<TaxiManagementSection025A>("countries");
  const [query, setQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiManagementResponse025A>(null);
  const records = useMemo<TaxiManagementRecord025A[]>(() => [], []);
  const selectedSection = TAXI_MANAGEMENT_025A_SECTIONS.find((item) => item.id === section) || TAXI_MANAGEMENT_025A_SECTIONS[0];
  const visibleCountries = useMemo(() => {
    const needle = countryQuery.trim().toLowerCase();
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => !needle || country.name.toLowerCase().includes(needle));
  }, [countryQuery]);
  const filteredRecords = useMemo(() => records.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [item.id, item.title, item.country, item.city, item.status].some((value) => value.toLowerCase().includes(q));
    const matchesSection = item.section === section;
    const matchesCountry = selectedCountry === "all" || item.country === selectedCountry;
    return matchesQuery && matchesSection && matchesCountry;
  }), [records, query, section, selectedCountry]);
  const submitManagementAction = async (action: keyof typeof TAXI_MANAGEMENT_025A_ROUTES) => {
    const route = TAXI_MANAGEMENT_025A_ROUTES[action];
    const payload = { action, section, query, country: selectedCountry, reason, globalCountries: TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B, noFake: true, serverOnly: true, marker: TAXI_MANAGEMENT_025A_MARKER };
    setBusy(action);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, { method: "POST", headers: adminHeaders007Z(config, { "Content-Type": "application/json" }), body: JSON.stringify(payload) });
      let json: any = null;
      try { json = await response.json(); } catch { json = null; }
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? "Запрос отправлен" : "Сервер не подтвердил действие")), at: new Date().toISOString() });
      setNotice(response.ok ? "Управление такси: запрос отправлен" : "Управление такси: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Управление такси: нужен серверная среда");
    } finally { setBusy(""); }
  };

  return (
    <section className="taxiManagement025A" data-taxi-management-025a-screen={TAXI_MANAGEMENT_025A_MARKER} data-taxi-management-025a-no-fake={TAXI_MANAGEMENT_025A_NO_FAKE}>
      <header className="taxiManagement025AHero">
        <div><span>Глобальное управление</span><h2>Управление такси</h2><p>Один центр управления Taxi: государства, города, диспетчеризация, тарифные правила, финансы, сотрудники, доступ, безопасность, отчёты и системные статусы. Все изменения только через backend и Owner approval. Локальных фейковых настроек нет.</p></div>
        <div className="taxiManagement025AReady"><strong>100%</strong><span>UI foundation</span><small>Production 51%</small></div>
      </header>

      <div className="taxiManagement025AStatus" data-taxi-management-025a-status="global-admin-control-ready">
        <div><span>Государства</span><strong>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</strong><small>полный мировой список</small></div>
        <div><span>Фейковые данные</span><strong>0%</strong><small>только backend records</small></div>
        <div><span>Owner approval</span><strong>обязательно</strong><small>нет локальных изменений</small></div>
        <div><span>Разделы управления</span><strong>{TAXI_MANAGEMENT_025A_SECTIONS.length}</strong><small>единый центр</small></div>
      </div>

      <div className="taxiManagement025AWorld" data-taxi-management-025a-global-countries="195-world-countries-search-select-filter-ready">
        <div><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств · глобальный проект</span><small>Валюта, курс, городские правила и запуск страны приходят только с backend.</small></div>
        <input value={countryQuery} onChange={(event) => setCountryQuery(event.target.value)} placeholder="Поиск государства" />
        <select aria-label="Государство управления такси" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="all">Все государства мира</option>
          {visibleCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
      </div>

      <div className="taxiManagement025AGrid">
        <aside className="taxiManagement025ASections" data-taxi-management-025a-sections="countries-cities-dispatch-tariffs-finance-staff-access-safety-reports-system">
          <h3>Разделы управления</h3>
          {TAXI_MANAGEMENT_025A_SECTIONS.map((item) => (
            <button key={item.id} type="button" className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
              <strong>{item.title}</strong><span>{item.description}</span>
            </button>
          ))}
        </aside>

        <main className="taxiManagement025AWorkspace" data-taxi-management-025a-workspace="backend-only-empty-until-real-config">
          <div className="taxiManagement025AControls">
            <label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="номер / город / правило / роль / статус" /></label>
            <button type="button" onClick={() => void submitManagementAction("load")} disabled={busy === "load"}>{busy === "load" ? "Загрузка" : "Загрузить реальные настройки"}</button>
          </div>
          <div className="taxiManagement025AHead"><div><h3>{selectedSection.title}</h3><p>{selectedSection.description}</p></div><strong>{selectedCountry === "all" ? "Все страны" : selectedCountry}</strong></div>
          {filteredRecords.length ? filteredRecords.map((record) => (
            <article key={record.id} className="taxiManagement025ARecord"><strong>{record.title}</strong><span>{record.country} · {record.city} · {record.status}</span><small>{record.ownerApproval} · {record.updatedAt}</small></article>
          )) : <div className="taxiManagement025AEmpty" data-taxi-management-025a-empty="no-local-seed-management-config"><strong>Реальных настроек пока нет</strong><span>UI не показывает фейковые страны, города, роли, правила или статусы. Нажми “Загрузить реальные настройки”, когда backend/DB будет готов.</span></div>}
        </main>

        <aside className="taxiManagement025AGate" data-taxi-management-025a-owner-gate="owner-approval-backend-only">
          <h3>Панель контроля</h3>
          <div className="taxiManagement025AChecks">{TAXI_MANAGEMENT_025A_REQUIRED_GATES.map((gate) => <span key={gate}>{gate}</span>)}</div>
          <label><span>Причина изменения / комментарий Owner</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Опиши, зачем менять настройку" /></label>
          <div className="taxiManagement025AActions">
            <button type="button" onClick={() => void submitManagementAction("request")} disabled={busy === "request" || !reason.trim()}>Запросить изменение</button>
            <button type="button" onClick={() => void submitManagementAction("approval")} disabled={busy === "approval" || !reason.trim()}>Запросить утверждение Owner</button>
            <button type="button" onClick={() => void submitManagementAction("archive")} disabled={busy === "archive"}>Отправить в архив</button>
          </div>
          <div className="taxiManagement025APolicy"><strong>Server-only</strong><span>{TAXI_MANAGEMENT_025A_SERVER_ONLY}</span><small>UI не включает страну, не создаёт город, не меняет роль, не открывает доступ и не запускает выплаты локально.</small></div>
          {lastResponse ? <div className="taxiManagement025ALast"><strong>Последний ответ</strong><span>{lastResponse.status} · {lastResponse.message}</span><code>{lastResponse.route}</code></div> : null}
        </aside>
      </div>
    </section>
  );
}


type TaxiAccessRole026A = "owner" | "owner_ai" | "deputy" | "taxi_manager" | "finance" | "support" | "moderator" | "agent_control" | "observer";
type TaxiAccessRecord026A = { id: string; fullName: string; phone: string; email: string; role: TaxiAccessRole026A; country: string; city: string; status: string; scope: string; updatedAt: string; ownerApproval: string };
type TaxiAccessResponse026A = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;

const TAXI_ACCESS_026A_MARKER = "TAXI-ACCESS-026A-ADMIN-SCREEN-NO-FAKE-GLOBAL-ROLES";
const TAXI_ACCESS_026A_NO_FAKE = "no-local-seed-staff-or-access-records-backend-only-empty-state";
const TAXI_ACCESS_026A_SERVER_ONLY = "Доступ, роль, страна, город, права и блокировка меняются только сервером после утверждения владельца.";
const TAXI_ACCESS_026A_ROUTES = {
  load: "/api/admin/taxi/access/026a/load",
  request: "/api/admin/taxi/access/026a/request-change",
  approval: "/api/admin/taxi/access/026a/request-owner-approval",
  archive: "/api/admin/taxi/access/026a/archive",
};
const TAXI_ACCESS_026A_ROLES: Array<{ id: TaxiAccessRole026A; title: string; permissions: string[]; guard: string }> = [
  { id: "owner", title: "Владелец", permissions: ["полный обзор", "утверждение доступа", "финальное решение"], guard: "только главный владелец" },
  { id: "owner_ai", title: "egasining Sabi sunʼiy intellekti", permissions: ["контроль", "аудит", "отчёты", "сигналы риска"], guard: "только отчёт и контроль, без мутаций" },
  { id: "deputy", title: "Заместитель", permissions: ["операционный обзор", "подготовка решений", "эскалация"], guard: "без финансового финального решения" },
  { id: "taxi_manager", title: "Менеджер такси", permissions: ["заявки", "водители", "авто", "жалобы"], guard: "только такси scope" },
  { id: "finance", title: "Финансы такси", permissions: ["баланс агентов", "проверка платежей", "отчёты"], guard: "без локального движение денег" },
  { id: "support", title: "Поддержка", permissions: ["обращения", "чат", "запрос документов"], guard: "без утверждения денег и ролей" },
  { id: "moderator", title: "Модератор", permissions: ["жалобы", "доказательства", "риски"], guard: "без блокировки без утверждение" },
  { id: "agent_control", title: "Контроль агентов", permissions: ["заявки агентов", "статусы агентов", "городская привязка"], guard: "без изменения баланса" },
  { id: "observer", title: "Наблюдатель", permissions: ["только просмотр", "отчёты", "аудит"], guard: "без действий" },
];
const TAXI_ACCESS_026A_GATES = ["утверждение владельца", "журнал аудита", "страна и город", "срок доступа", "причина изменения", "проверка Саби ИИ владельца", "нет локального включения доступа"];

function TaxiAccessAdmin026APanel({ language, config, setNotice }: Props007Z) {
  const [role, setRole] = useState<TaxiAccessRole026A>("taxi_manager");
  const [query, setQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [city, setCity] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiAccessResponse026A>(null);
  const accessRecords = useMemo<TaxiAccessRecord026A[]>(() => [], []);
  const selectedRole = TAXI_ACCESS_026A_ROLES.find((item) => item.id === role) || TAXI_ACCESS_026A_ROLES[0];
  const visibleCountries = useMemo(() => {
    const needle = countryQuery.trim().toLowerCase();
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => !needle || country.name.toLowerCase().includes(needle));
  }, [countryQuery]);
  const filteredRecords = useMemo(() => accessRecords.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [item.id, item.fullName, item.phone, item.email, item.country, item.city, item.status, item.scope].some((value) => value.toLowerCase().includes(q));
    const matchesRole = item.role === role;
    const matchesCountry = selectedCountry === "all" || item.country === selectedCountry;
    const matchesCity = !city.trim() || item.city.toLowerCase().includes(city.trim().toLowerCase());
    return matchesQuery && matchesRole && matchesCountry && matchesCity;
  }), [accessRecords, query, role, selectedCountry, city]);
  const submitAccessAction = async (action: keyof typeof TAXI_ACCESS_026A_ROUTES) => {
    const route = TAXI_ACCESS_026A_ROUTES[action];
    const payload = { action, role, country: selectedCountry, city, query, reason, globalCountries: TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B, noFake: true, serverOnly: true, marker: TAXI_ACCESS_026A_MARKER };
    setBusy(action);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, { method: "POST", headers: adminHeaders007Z(config, { "Content-Type": "application/json" }), body: JSON.stringify(payload) });
      let json: any = null;
      try { json = await response.json(); } catch { json = null; }
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? "Запрос отправлен" : "Сервер не подтвердил действие")), at: new Date().toISOString() });
      setNotice(response.ok ? "Доступ такси: запрос отправлен" : "Доступ такси: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Доступ такси: нужен серверная среда");
    } finally { setBusy(""); }
  };

  return (
    <section className="taxiAccess026A" data-taxi-access-026a-screen={TAXI_ACCESS_026A_MARKER} data-taxi-access-026a-no-fake={TAXI_ACCESS_026A_NO_FAKE}>
      <header className="taxiAccess026AHero">
        <div><span>Права и сотрудники</span><h2>Доступ такси</h2><p>Отдельный центр доступа: роли, сотрудники, страны, города, сроки, аудит и утверждение владельца. Никаких фейковых сотрудников или локального включения доступа.</p></div>
        <div className="taxiAccess026AReady"><strong>100%</strong><span>UI foundation</span><small>Production 52%</small></div>
      </header>

      <div className="taxiAccess026AStatus" data-taxi-access-026a-status="roles-country-city-audit-owner-approval-ready">
        <div><span>Государства</span><strong>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</strong><small>глобальный список</small></div>
        <div><span>Фейковые записи</span><strong>0%</strong><small>только сервер</small></div>
        <div><span>Роли</span><strong>{TAXI_ACCESS_026A_ROLES.length}</strong><small>матрица прав</small></div>
        <div><span>Утверждение</span><strong>владелец</strong><small>обязательно</small></div>
      </div>

      <div className="taxiAccess026AWorld" data-taxi-access-026a-global-countries="195-world-countries-search-select-filter-ready">
        <div><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств · доступ можно ограничить по стране и городу</span><small>Валюта, региональные роли и разрешения приходят только с сервера.</small></div>
        <input value={countryQuery} onChange={(event) => setCountryQuery(event.target.value)} placeholder="Поиск государства" />
        <select aria-label="Государство доступа такси" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="all">Все государства мира</option>
          {visibleCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
      </div>

      <div className="taxiAccess026AGrid">
        <aside className="taxiAccess026ARoles" data-taxi-access-026a-role-matrix="owner-owner-ai-deputy-manager-finance-support-moderator-agent-control-observer">
          <h3>Роли доступа</h3>
          {TAXI_ACCESS_026A_ROLES.map((item) => (
            <button key={item.id} type="button" className={role === item.id ? "active" : ""} onClick={() => setRole(item.id)}>
              <strong>{item.title}</strong><span>{item.permissions.join("·")}</span><small>{item.guard}</small>
            </button>
          ))}
        </aside>

        <main className="taxiAccess026AWorkspace" data-taxi-access-026a-workspace="backend-only-empty-until-real-access-records">
          <div className="taxiAccess026AControls">
            <label><span>Поиск сотрудника</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ФИО / телефон / почта / номер" /></label>
            <label><span>Город</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Город или регион" /></label>
            <button type="button" onClick={() => void submitAccessAction("load")} disabled={busy === "load"}>{busy === "load" ? "Загрузка" : "Загрузить реальные доступы"}</button>
          </div>
          <div className="taxiAccess026AHead"><div><h3>{selectedRole.title}</h3><p>{selectedRole.permissions.join(" · ")}</p></div><strong>{selectedCountry === "all" ? "Все страны" : selectedCountry}</strong></div>
          {filteredRecords.length ? filteredRecords.map((record) => (
            <article key={record.id} className="taxiAccess026ARecord"><strong>{record.fullName}</strong><span>{record.phone} · {record.email} · {record.country} · {record.city}</span><small>{record.status} · {record.scope} · {record.ownerApproval}</small></article>
          )) : <div className="taxiAccess026AEmpty" data-taxi-access-026a-empty="no-local-seed-staff-or-access-records"><strong>Реальных записей доступа пока нет</strong><span>UI не показывает фейковых сотрудников, роли, города или статусы. Нажми “Загрузить реальные доступы”, когда backend/DB будет готов.</span></div>}
        </main>

        <aside className="taxiAccess026AGate" data-taxi-access-026a-owner-gate="owner-approval-backend-only">
          <h3>Панель утверждения</h3>
          <div className="taxiAccess026AChecks">{TAXI_ACCESS_026A_GATES.map((gate) => <span key={gate}>{gate}</span>)}</div>
          <label><span>Причина изменения доступа</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Напиши, почему нужен доступ или изменение роли" /></label>
          <div className="taxiAccess026AActions">
            <button type="button" onClick={() => void submitAccessAction("request")} disabled={busy === "request" || !reason.trim()}>Запросить изменение</button>
            <button type="button" onClick={() => void submitAccessAction("approval")} disabled={busy === "approval" || !reason.trim()}>Запросить утверждение владельца</button>
            <button type="button" onClick={() => void submitAccessAction("archive")} disabled={busy === "archive"}>Отправить в архив</button>
          </div>
          <div className="taxiAccess026APolicy"><strong>Только сервер</strong><span>{TAXI_ACCESS_026A_SERVER_ONLY}</span><small>UI не создаёт сотрудника, не меняет роль, не открывает доступ и не блокирует локально.</small></div>
          {lastResponse ? <div className="taxiAccess026ALast"><strong>Последний ответ</strong><span>{lastResponse.status} · {lastResponse.message}</span><code>{lastResponse.route}</code></div> : null}
        </aside>
      </div>
    </section>
  );
}


type TaxiFinanceProgram027ASection = "income" | "earnings" | "agents" | "commissions" | "refunds" | "bonuses" | "contests" | "audit";
type TaxiFinanceProgram027ARecord = { id: string; section: TaxiFinanceProgram027ASection; country: string; city: string; currency: string; amount: string; status: string; source: string; createdAt: string };
type TaxiFinanceProgram027AResponse = { action: string; ok: boolean; status: number | string; route: string; message: string; at: string } | null;

const TAXI_FINANCE_PROGRAM_027A_MARKER = "TAXI-FINANCE-PROGRAM-027A-INCOME-EARNINGS-NO-FAKE-GLOBAL";
const TAXI_FINANCE_PROGRAM_027A_NO_FAKE = "no-local-seed-finance-income-or-earnings-backend-only-empty-state";
const TAXI_FINANCE_PROGRAM_027A_SERVER_ONLY = "Поступления, выручка, комиссия, заработок программы, возвраты, бонусы, конкурсы и отчёты считаются и подтверждаются только сервер после аудит и утверждение владельца.";
const TAXI_FINANCE_PROGRAM_027A_ROUTES = {
  load: "/api/admin/taxi/finance-program/027a/load",
  income: "/api/admin/taxi/finance-program/027a/income-scale",
  earnings: "/api/admin/taxi/finance-program/027a/earnings-report",
  export: "/api/admin/taxi/finance-program/027a/request-export",
  approval: "/api/admin/taxi/finance-program/027a/request-owner-approval",
  archive: "/api/admin/taxi/finance-program/027a/archive",
};
const TAXI_FINANCE_PROGRAM_027A_SECTIONS: Array<{ id: TaxiFinanceProgram027ASection; title: string; description: string }> = [
  { id: "income", title: "Поступления денег", description: "Шкала входящих денег: поездки, пополнения агентского баланса, корпоративные счета и подтверждённые платежи." },
  { id: "earnings", title: "Заработок программы такси", description: "Валовая выручка, чистая выручка, комиссия сервиса, расходы, возвраты и итоговая прибыль только из сервер." },
  { id: "agents", title: "Агенты и пополнения", description: "Деньги от агентов, подтверждение TxHash/чека, city-agent scope и сверка баланса." },
  { id: "commissions", title: "Комиссии", description: "Комиссия по стране, городу, тарифу и периоду приходит с сервера; интерфейс не хранит фиксированный процент." },
  { id: "refunds", title: "Возвраты и споры", description: "Возвраты, спорные поездки, отмены и удержания только через финансовый сервер и аудит." },
  { id: "bonuses", title: "Бонусы", description: "Бонусные бюджеты, промо, компенсации и лимиты без локального списания." },
  { id: "contests", title: "Конкурсы", description: "Призовые фонды, места 1/2/3 и утверждение выплат только после утверждение владельца." },
  { id: "audit", title: "Финансовый аудит", description: "Журнал действий, сверка источников, проверка Саби ИИ владельца и архив отчёта." },
];
const TAXI_FINANCE_PROGRAM_027A_INCOME_SCALE = [
  "поездка оплачена пассажиром",
  "сервер подтвердил заказ и комиссию",
  "баланс водителя и агента сверяется сервером",
  "выручка программы такси попадает в финансовый отчёт",
  "Саби ИИ владельца проверяет риск и расхождения",
  "владелец утверждает финансовый пакет",
  "отчёт уходит в архив",
];
const TAXI_FINANCE_PROGRAM_027A_EARNING_FORMULA = [
  "валовая выручка по поездкам",
  "минус возвраты и спорные операции",
  "плюс подтверждённые сервисные комиссии",
  "минус бонусы, конкурсы и компенсации",
  "минус операционные расходы",
  "равно заработок программы такси по стране, городу и периоду",
];
const TAXI_FINANCE_PROGRAM_027A_PERIODS = ["сегодня", "вчера", "7 дней", "30 дней", "месяц", "квартал", "год", "свой период"];
const TAXI_FINANCE_PROGRAM_027A_GATES = ["реальные серверные данные", "страна из 195 государств", "валюта с сервера", "нет локального расчёта", "финансовый аудит", "Owner Sabi AI risk check", "Owner approval", "архив отчёта"];

function TaxiFinanceProgram027APanel({ language, config, setNotice }: Props007Z) {
  const [section, setSection] = useState<TaxiFinanceProgram027ASection>("income");
  const [period, setPeriod] = useState("30 дней");
  const [query, setQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [city, setCity] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState("");
  const [lastResponse, setLastResponse] = useState<TaxiFinanceProgram027AResponse>(null);
  const financeRows = useMemo<TaxiFinanceProgram027ARecord[]>(() => [], []);
  const selectedSection = TAXI_FINANCE_PROGRAM_027A_SECTIONS.find((item) => item.id === section) || TAXI_FINANCE_PROGRAM_027A_SECTIONS[0];
  const visibleCountries = useMemo(() => {
    const needle = countryQuery.trim().toLowerCase();
    return TAXI_CONTEST_WORLD_COUNTRIES_021B.filter((country) => !needle || country.name.toLowerCase().includes(needle));
  }, [countryQuery]);
  const filteredRows = useMemo(() => financeRows.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [item.id, item.country, item.city, item.currency, item.status, item.source, item.createdAt].some((value) => value.toLowerCase().includes(q));
    const matchesSection = item.section === section;
    const matchesCountry = selectedCountry === "all" || item.country === selectedCountry;
    const matchesCity = !city.trim() || item.city.toLowerCase().includes(city.trim().toLowerCase());
    return matchesQuery && matchesSection && matchesCountry && matchesCity;
  }), [financeRows, query, section, selectedCountry, city]);
  const submitFinanceAction = async (action: keyof typeof TAXI_FINANCE_PROGRAM_027A_ROUTES) => {
    const route = TAXI_FINANCE_PROGRAM_027A_ROUTES[action];
    const payload = { action, section, period, query, country: selectedCountry, city, reason, globalCountries: TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B, noFake: true, serverOnly: true, marker: TAXI_FINANCE_PROGRAM_027A_MARKER };
    setBusy(action);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${route}`, { method: "POST", headers: adminHeaders007Z(config, { "Content-Type": "application/json" }), body: JSON.stringify(payload) });
      let json: any = null;
      try { json = await response.json(); } catch { json = null; }
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? "Запрос отправлен" : "Сервер не подтвердил действие")), at: new Date().toISOString() });
      setNotice(response.ok ? "Финансы такси: запрос отправлен" : "Финансы такси: сервер не подтвердил действие");
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "Ошибка сети", at: new Date().toISOString() });
      setNotice("Финансы такси: нужен серверная среда");
    } finally { setBusy(""); }
  };

  return (
    <section className="taxiFinance027A" data-taxi-finance-program-027a-screen={TAXI_FINANCE_PROGRAM_027A_MARKER} data-taxi-finance-program-027a-no-fake={TAXI_FINANCE_PROGRAM_027A_NO_FAKE}>
      <header className="taxiFinance027AHero">
        <div><span>Финансы программы Taxi</span><h2>Поступления денег и заработок</h2><p>Профессиональный финансовый экран Taxi: шкала поступления денег, заработок программы, комиссии, агенты, возвраты, бонусы, конкурсы, audit и Owner approval. Никаких фейковых сумм и локальных финансовых действий.</p></div>
        <div className="taxiFinance027AReady"><strong>100%</strong><span>UI foundation</span><small>Production 53%</small></div>
      </header>

      <div className="taxiFinance027AStatus" data-taxi-finance-program-027a-status="income-earnings-global-no-fake-backend-only-ready">
        <div><span>Государства</span><strong>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B}</strong><small>глобальный список</small></div>
        <div><span>Фейковые суммы</span><strong>0%</strong><small>только реальные backend данные</small></div>
        <div><span>Шкала поступлений</span><strong>{TAXI_FINANCE_PROGRAM_027A_INCOME_SCALE.length}</strong><small>контрольных шагов</small></div>
        <div><span>Заработок Taxi</span><strong>server</strong><small>расчёт только backend</small></div>
      </div>

      <div className="taxiFinance027AWorld" data-taxi-finance-program-027a-global-countries="195-world-countries-search-select-filter-ready">
        <div><strong>Государства мира</strong><span>{TAXI_CONTEST_WORLD_COUNTRIES_TOTAL_021B} государств · финансы по стране, городу и валюте</span><small>Валюта, курс, комиссия, доход и прибыль приходят только с сервера.</small></div>
        <input value={countryQuery} onChange={(event) => setCountryQuery(event.target.value)} placeholder="Поиск государства" />
        <select aria-label="Государство финансов такси" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="all">Все государства мира</option>
          {visibleCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
      </div>

      <div className="taxiFinance027AGrid">
        <aside className="taxiFinance027ASections" data-taxi-finance-program-027a-sections="income-earnings-agents-commissions-refunds-bonuses-contests-audit">
          <h3>Финансовые разделы</h3>
          {TAXI_FINANCE_PROGRAM_027A_SECTIONS.map((item) => (
            <button key={item.id} type="button" className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
              <strong>{item.title}</strong><span>{item.description}</span>
            </button>
          ))}
        </aside>

        <main className="taxiFinance027AWorkspace" data-taxi-finance-program-027a-workspace="backend-only-empty-until-real-finance-records">
          <div className="taxiFinance027AControls">
            <label><span>Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="номер / город / валюта / источник" /></label>
            <label><span>Город</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Город или регион" /></label>
            <label><span>Период</span><select value={period} onChange={(event) => setPeriod(event.target.value)}>{TAXI_FINANCE_PROGRAM_027A_PERIODS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <button type="button" onClick={() => void submitFinanceAction("load")} disabled={busy === "load"}>{busy === "load" ? "Загрузка" : "Загрузить реальные финансы"}</button>
          </div>
          <div className="taxiFinance027AHead"><div><h3>{selectedSection.title}</h3><p>{selectedSection.description}</p></div><strong>{selectedCountry === "all" ? "Все страны" : selectedCountry}</strong></div>
          {filteredRows.length ? filteredRows.map((record) => (
            <article key={record.id} className="taxiFinance027ARecord"><strong>{record.id}</strong><span>{record.country} · {record.city} · {record.currency} · {record.amount}</span><small>{record.status} · {record.source} · {record.createdAt}</small></article>
          )) : <div className="taxiFinance027AEmpty" data-taxi-finance-program-027a-empty="no-local-seed-finance-records"><strong>Реальных финансовых записей пока нет</strong><span>UI не показывает фейковые суммы, выручку, прибыль, комиссии или платежи. Нажми “Загрузить реальные финансы”, когда backend/DB будет готов.</span></div>}

          <div className="taxiFinance027AScale" data-taxi-finance-program-027a-income-scale="money-inflow-scale-server-only">
            <h3>Шкала поступления денег</h3>
            {TAXI_FINANCE_PROGRAM_027A_INCOME_SCALE.map((step, index) => <div key={step}><strong>{index + 1}</strong><span>{step}</span></div>)}
          </div>

          <div className="taxiFinance027AFormula" data-taxi-finance-program-027a-earnings-formula="gross-refunds-commission-bonuses-costs-net-program-earnings">
            <h3>Заработок от программы Taxi</h3>
            {TAXI_FINANCE_PROGRAM_027A_EARNING_FORMULA.map((step) => <span key={step}>{step}</span>)}
          </div>
        </main>

        <aside className="taxiFinance027AGate" data-taxi-finance-program-027a-owner-gate="owner-approval-finance-backend-only">
          <h3>Финансовый контроль</h3>
          <div className="taxiFinance027AChecks">{TAXI_FINANCE_PROGRAM_027A_GATES.map((gate) => <span key={gate}>{gate}</span>)}</div>
          <label><span>Причина финансового запроса</span><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Что нужно проверить: поступления, отчёт, комиссия, экспорт, спор, прибыль" /></label>
          <div className="taxiFinance027AActions">
            <button type="button" onClick={() => void submitFinanceAction("income")} disabled={busy === "income"}>Шкала поступлений</button>
            <button type="button" onClick={() => void submitFinanceAction("earnings")} disabled={busy === "earnings"}>Отчёт заработка</button>
            <button type="button" onClick={() => void submitFinanceAction("export")} disabled={busy === "export"}>Запросить экспорт</button>
            <button type="button" onClick={() => void submitFinanceAction("approval")} disabled={busy === "approval" || !reason.trim()}>Owner approval</button>
            <button type="button" onClick={() => void submitFinanceAction("archive")} disabled={busy === "archive"}>В архив</button>
          </div>
          <div className="taxiFinance027APolicy"><strong>Только сервер</strong><span>{TAXI_FINANCE_PROGRAM_027A_SERVER_ONLY}</span><small>UI не начисляет, не списывает, не переводит и не рассчитывает деньги локально.</small></div>
          {lastResponse ? <div className="taxiFinance027ALast"><strong>Последний ответ</strong><span>{lastResponse.status} · {lastResponse.message}</span><code>{lastResponse.route}</code></div> : null}
        </aside>
      </div>
    </section>
  );
}

export function TaxiAdminControl007ZPanel({ language, config, setNotice }: Props007Z) {
  const copy = COPY007Z[language] || COPY007Z.ru;
  const [activeTab, setActiveTab] = useState<Tab007Z>("applications");
  const [activeCategory, setActiveCategory] = useState<Category007Z>("standard");
  const [applications, setApplications] = useState<TaxiApplication007Z[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [checks, setChecks] = useState<Checks007Z>({ driverDocs: false, vehicleDocs: false, vehiclePhotos: false, archive: false });
  const [decisionReason, setDecisionReason] = useState("");
  const [archiveId, setArchiveId] = useState("");
  const [ownerNote, setOwnerNote] = useState("");
  const [lastResponse, setLastResponse] = useState<LastResponse007Z>(null);
  const [busyAction, setBusyAction] = useState<string>("");
  const [lastClick, setLastClick] = useState<ButtonClick007Z | null>(null);
  const [countSnapshot028H, setCountSnapshot028H] = useState<TaxiAdminRuntime028HSnapshot>(null);
  const [countBridgeStatus028H, setCountBridgeStatus028H] = useState<"idle" | "loading" | "ready" | "blocked" | "error">("idle");
  const [countBridgeMessage028H, setCountBridgeMessage028H] = useState("Ожидает safe count bridge");
  const [safeReadModelsSnapshot028K, setSafeReadModelsSnapshot028K] = useState<TaxiAdminRuntime028KSafeReadModelsSnapshot>(null);
  const [safeReadModels028K, setSafeReadModels028K] = useState<TaxiAdminRuntime028KSafeReadModel[]>([]);
  const [safeReadModelsStatus028K, setSafeReadModelsStatus028K] = useState<"idle" | "loading" | "ready" | "blocked" | "error">("idle");
  const [safeReadModelsMessage028K, setSafeReadModelsMessage028K] = useState("Ожидает безопасные модели чтения рабочей среды 028I");

  const loadCountBridge028H = async () => {
    setCountBridgeStatus028H("loading");
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${TAXI_ADMIN_RUNTIME_028H_ROUTE}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        setCountSnapshot028H(null);
        setCountBridgeStatus028H(response.status === 403 ? "blocked" : "error");
        setCountBridgeMessage028H(String(json?.message || json?.error || `HTTP ${response.status}`));
        return;
      }
      setCountSnapshot028H(json as TaxiAdminRuntime028HSnapshot);
      setCountBridgeStatus028H("ready");
      setCountBridgeMessage028H("Безопасный мост подсчёта подключён к рабочей среде 028F");
    } catch (error) {
      setCountSnapshot028H(null);
      setCountBridgeStatus028H("error");
      setCountBridgeMessage028H(error instanceof Error ? error.message : "Ошибка подключения к рабочей среде 028F");
    }
  };


  const loadSafeReadModels028K = async () => {
    setSafeReadModelsStatus028K("loading");
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${TAXI_ADMIN_RUNTIME_028K_ROUTE}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSafeReadModelsSnapshot028K(null);
        setSafeReadModels028K([]);
        setSafeReadModelsStatus028K(response.status === 403 ? "blocked" : "error");
        setSafeReadModelsMessage028K(String(json?.message || json?.error || `HTTP ${response.status}`));
        return;
      }
      const models = Array.isArray(json?.models) ? (json.models as TaxiAdminRuntime028KSafeReadModel[]) : [];
      setSafeReadModelsSnapshot028K(json as TaxiAdminRuntime028KSafeReadModelsSnapshot);
      setSafeReadModels028K(models);
      setSafeReadModelsStatus028K("ready");
      setSafeReadModelsMessage028K("Безопасные модели чтения подключены к рабочей среде 028I");
    } catch (error) {
      setSafeReadModelsSnapshot028K(null);
      setSafeReadModels028K([]);
      setSafeReadModelsStatus028K("error");
      setSafeReadModelsMessage028K(error instanceof Error ? error.message : "Ошибка подключения к рабочей среде 028I");
    }
  };

  useEffect(() => {
    void loadCountBridge028H();
  }, [config.baseUrl, config.token]);

  useEffect(() => {
    void loadSafeReadModels028K();
  }, [config.baseUrl, config.token]);

  const selectedApplication = useMemo(() => applications.find((item) => item.applicationId === selectedId) || null, [applications, selectedId]);
  const route = selectedApplication ? ACTION_ROUTE_007Z(selectedApplication.applicationId, "archive") : READ_ONLY_007Z;
  const filteredApplications = useMemo(() => applications.filter((item) => item.category === activeCategory), [applications, activeCategory]);
  const readinessPercent = readiness007Z(selectedApplication, checks, archiveId);
  const productionReadinessPercent = TAXI_ADMIN_RUNTIME_028K_PRODUCTION_READINESS;
  const approveBlockers = useMemo(() => blockers007Z(selectedApplication, checks, "approve", decisionReason, archiveId, copy), [selectedApplication, checks, decisionReason, archiveId, copy]);

  const resetReviewState = () => {
    setChecks({ driverDocs: false, vehicleDocs: false, vehiclePhotos: false, archive: false });
    setDecisionReason("");
    setArchiveId("");
    setOwnerNote("");
  };

  const markClick = (action: string, routeValue: string, outcome: ButtonClick007Z["outcome"], applicationId?: string) => {
    setLastClick({ action, route: routeValue, outcome, applicationId: applicationId || selectedApplication?.applicationId || selectedId || "none", at: new Date().toISOString() });
  };


  const changeCategory009A = (category: Category007Z) => {
    setActiveCategory(category);
    const firstInCategory = applications.find((item) => item.category === category);
    setSelectedId(firstInCategory?.applicationId || "");
    resetReviewState();
    markClick("category-select", READ_ONLY_007Z, firstInCategory ? "sent" : "started", firstInCategory?.applicationId || "none");
  };

  const loadApplications = async () => {
    const routeValue = READ_ONLY_007Z;
    markClick("load", routeValue, "started");
    setBusyAction("load");
    setLastResponse({ action: copy.load, ok: true, status: "started", route: routeValue, message: copy.clickStarted, at: new Date().toISOString() });
    setNotice(copy.clickStarted);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${READ_ONLY_007Z}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.applications) ? json.applications : Array.isArray(json?.rows) ? json.rows : Array.isArray(json?.data?.rows) ? json.data.rows : [];
      const mapped = rows.map((row: Record<string, unknown>) => fromLiveRow007Z(row)).filter((item: TaxiApplication007Z) => item.applicationId && (item.status.toLowerCase().includes("new") || item.status.toLowerCase().includes("pending") || item.status.toLowerCase().includes("review")));
      setApplications(mapped);
      setSelectedId(mapped[0]?.applicationId || "");
      resetReviewState();
      setLastResponse({ action: copy.load, ok: response.ok, status: response.status, route: READ_ONLY_007Z, message: mapped.length ? `${mapped.length}` : copy.emptyNewApplications, at: new Date().toISOString() });
      markClick("load", routeValue, response.ok ? "sent" : "failed", mapped[0]?.applicationId || "none");
      setNotice(response.ok ? (mapped.length ? copy.refresh : copy.emptyNewApplications) : copy.blocked);
    } catch (error) {
      setLastResponse({ action: copy.load, ok: false, status: "network_error", route: READ_ONLY_007Z, message: error instanceof Error ? error.message : (language === "ru" ? "ошибка сети" : "network_error"), at: new Date().toISOString() });
      markClick("load", routeValue, "failed");
      setNotice(copy.blocked);
    } finally {
      setBusyAction("");
    }
  };

  const selectApplication = async (applicationId: string) => {
    const routeValue = DETAILS_007Z(applicationId);
    setSelectedId(applicationId);
    resetReviewState();
    markClick("open-application", routeValue, "started", applicationId);
    setLastResponse({ action: copy.openApplication, ok: true, status: "started", route: routeValue, message: copy.openingApplication, at: new Date().toISOString() });
    setNotice(copy.openingApplication);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${routeValue}`, { headers: adminHeaders007Z(config) });
      const json = await response.json().catch(() => ({}));
      const detailRow = (json?.application || json?.row || json?.data?.application || json?.data?.row) as Record<string, unknown> | undefined;
      if (response.ok && detailRow) {
        const detail = fromLiveRow007Z({ ...detailRow, applicationId });
        setApplications((prev) => prev.map((item) => item.applicationId === applicationId ? { ...item, ...detail, applicationId: detail.applicationId || applicationId } : item));
      }
      setLastResponse({ action: copy.openApplication, ok: response.ok, status: response.status, route: routeValue, message: String(json?.message || json?.error || (response.ok ? copy.ready : copy.blocked)), at: new Date().toISOString() });
      markClick("open-application", routeValue, response.ok ? "sent" : "failed", applicationId);
    } catch (error) {
      setLastResponse({ action: copy.openApplication, ok: false, status: "network_error", route: routeValue, message: error instanceof Error ? error.message : (language === "ru" ? "ошибка сети" : "network_error"), at: new Date().toISOString() });
      markClick("open-application", routeValue, "failed", applicationId);
    }
  };

  const submitAction = async (action: Action007Z) => {
    const actionRoute = selectedApplication ? ACTION_ROUTE_007Z(selectedApplication.applicationId, action) : READ_ONLY_007Z;
    markClick(action, actionRoute, "started");
    setLastResponse({ action, ok: true, status: "clicked", route: actionRoute, message: copy.clickStarted, at: new Date().toISOString() });
    setNotice(copy.clickStarted);
    if (!selectedApplication) {
      setLastResponse({ action, ok: false, status: "blocked", route: actionRoute, message: copy.chooseApplicationFirst, at: new Date().toISOString() });
      markClick(action, actionRoute, "blocked");
      setNotice(copy.chooseApplicationFirst);
      return;
    }
    const blockers = blockers007Z(selectedApplication, checks, action, decisionReason, archiveId, copy);
    if (blockers.length) {
      setLastResponse({ action, ok: false, status: "blocked", route: actionRoute, message: blockers.slice(0, 4).join(" · "), at: new Date().toISOString() });
      markClick(action, actionRoute, "blocked");
      setNotice(copy.blocked);
      return;
    }
    setBusyAction(action);
    const payload = buildPayload007Z(action, selectedApplication, checks, decisionReason, archiveId, ownerNote, actionRoute);
    try {
      const response = await fetch(`${normalizeBase007Z(config)}${actionRoute}`, { method: "POST", headers: adminHeaders007Z(config, { "content-type": "application/json", "x-sabi-taxi-applications-007z-execution-approval": "i-approve-taxi-applications-007z-db-archive-write", "x-sabi-idempotency-key": `${selectedApplication?.applicationId || "missing"}:${action}:${archiveId || "archive-required"}` }), body: JSON.stringify(payload) });
      const json = await response.json().catch(() => ({}));
      setLastResponse({ action, ok: response.ok, status: response.status, route: actionRoute, message: String(json?.message || json?.error || (response.ok ? copy.ready : copy.blocked)), at: new Date().toISOString() });
      markClick(action, actionRoute, response.ok ? "sent" : "failed");
      setNotice(response.ok ? copy.backendOnly : copy.blocked);
      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route: actionRoute, message: error instanceof Error ? error.message : (language === "ru" ? "ошибка сети" : "network_error"), at: new Date().toISOString() });
      markClick(action, actionRoute, "failed");
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="messengerStyle007B taxi007ySimple taxi007yNoFake100" data-admin-ui-026d-ready-screens-protected={ADMIN_UI_026D_READY_SCREENS_PROTECTED} data-admin-ui-027k-active-buttons-runtime-routes="ready" data-admin-ui-taxi-007z-applications-no-fake-100="ready" data-admin-ui-taxi-007z-approved-driver-backend-payload="atomic-required" data-admin-ui-taxi-007z-archive-all-received-data="required" data-admin-ui-taxi-007z-atomic-approved-driver-write="required" data-admin-ui-taxi-007z-post-write-sync="required" data-admin-ui-taxi-007z-fix1-clickable-actions="ready" data-admin-ui-taxi-007z-fix1-buttons-not-disabled-without-selection="ready" data-admin-ui-taxi-007z-fix3-buttons-visual-click-feedback="ready" data-admin-ui-taxi-orders-009a-mounted="ready" data-taxi-finance-028a-fix2-mounted="standalone-large-taxi-finance" data-taxi-ordinary-balance-tab-removed="ready" data-taxi-admin-runtime-028h-live-count-binding={TAXI_ADMIN_RUNTIME_028H_MARKER} data-taxi-admin-runtime-028h-policy={TAXI_ADMIN_RUNTIME_028H_POLICY} data-taxi-admin-runtime-028k-safe-read-models-binding={TAXI_ADMIN_RUNTIME_028K_MARKER} data-taxi-admin-runtime-028k-policy={TAXI_ADMIN_RUNTIME_028K_POLICY} data-taxi-admin-ui-034e-agent-directory-control-connect="mounted" data-taxi-admin-ui-034j-agent-request-safe-disabled-control-connect="mounted" data-taxi-admin-ui-034m-owner-sabi-ai-report-admin-visibility-safe-read="mounted" data-taxi-admin-ui-035h-owner-exact-approval-package-admin-visibility-safe-read-locked="mounted-reports-only" data-taxi-admin-ui-035m-execution-preflight-admin-visibility-runtime-smoke-locked="mounted-reports-only" data-taxi-admin-ui-035h-035i-fix1-jsx-wrapper="repaired" data-taxi-admin-ui-035u-owner-approval-execution-runtime-gate-admin-visibility-runtime-smoke-locked="mounted-reports-only">
      <div className="ms007b-hero">
        <div><span>{MARKER007Z_FIX1}</span><h1>{copy.title}</h1><p>{copy.subtitle}</p></div>
        <div className="ms007b-heroStatus"><strong>{readinessPercent}%</strong><span>{copy.readiness}</span></div>
      </div>

      <div className="ms007b-tabs" data-admin-ui-taxi-007z-full-console-tabs-preserved="ready">
        {TABS007Z.map((tab) => <button key={tab} type="button" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{copy[tab]}</button>)}
      </div>

      <div className="ms007b-metrics">
        <div className="ms007b-metric"><span>{copy.uiReady}</span><strong>{readinessPercent}%</strong><small>{copy.applications}</small></div>
        <div className="ms007b-metric"><span>{copy.productionReady}</span><strong>{productionReadinessPercent}%</strong><small>{copy.backendOnly}</small></div>
        <div className="ms007b-metric"><span>{language === "ru" ? "Без имитаций" : "No fake"}</span><strong>{language === "ru" ? "ВКЛ" : "ON"}</strong><small>{copy.noFake}</small></div>
        <div className="ms007b-metric"><span>{language === "ru" ? "Саби ИИ владельца" : "Owner Sabi AI"}</span><strong>{language === "ru" ? "КОНТРОЛЬ" : "CONTROL"}</strong><small>{copy.ownerAi}</small></div>
      </div>


      {activeTab === "management" ? (
        <>
          <TaxiAdminAgentDirectory034EPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminAgentRequest034JPanel language={language} config={config} setNotice={setNotice} />
        </>
      ) : null}

      {activeTab === "reports" ? (
        <>
        <section
          className="taxiAdminTechnicalSafeReadGroup035EFix2"
          data-taxi-admin-ui-035e-fix2-cleanup="single-compact-technical-control-no-repeated-panels"
          data-taxi-admin-ui-034m-owner-sabi-ai-report-admin-visibility-safe-read="preserved-hidden-from-main-tabs"
          data-taxi-admin-ui-034p-owner-sabi-ai-daily-snapshot-admin-visibility-safe-read="preserved-hidden-from-main-tabs"
          data-taxi-admin-ui-035b-wallet-payment-payout-owner-approval-chain-admin-visibility-safe-read-locked="preserved-hidden-from-main-tabs"
          data-taxi-admin-ui-035e-wallet-payment-payout-owner-approval-chain-final-handoff-admin-visibility-safe-read-locked="preserved-hidden-from-main-tabs"
          data-admin-final-handoff-035d-readiness="/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness"
          data-admin-final-handoff-035d-handoff="/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff"
          data-public-final-handoff-035d-readiness="/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness"
          data-public-final-handoff-035d-handoff="/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff"
          data-public-approval-plan-035a="/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan"
          data-public-owner-ai-final-handoff-034r="/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff"
          data-request-gate-034c="/api/taxi/mobile/agent/contact/034c/request"
          data-request-gate-034d="/api/taxi/mobile/agent/directory/034d/contact-request"
        >
          <div className="taxiAdminTechnicalSafeReadHead035EFix2">
            <span>Техконтроль</span>
            <h2>Служебные проверки Taxi собраны в одном месте</h2>
            <p>Повторяющиеся блоки Owner Sabi AI, дневной сводки, плана подтверждений и итоговой передачи больше не показываются на каждой вкладке. Основные функции заявок, агентов, заказов, тарифов, баланса и отчётов сохранены.</p>
          </div>
          <div className="taxiAdminTechnicalSafeReadGrid035EFix2">
            <div><span>Режим</span><strong>только чтение</strong><small>без записи в базу и без действий с деньгами</small></div>
            <div><span>Платежи и выплаты</span><strong>закрыто</strong><small>только после точного подтверждения владельца</small></div>
            <div><span>Защита админ-маршрутов</span><strong>включена</strong><small>токен используется в заголовках и не печатается</small></div>
            <div><span>Основные вкладки</span><strong>не тронуты</strong><small>рабочие экраны не смешиваются со служебными проверками</small></div>
          </div>
        </section>

          <TaxiAdminWalletPaymentPayoutOwnerExactApproval035HPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutDecisionGate035KPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutExecutionPreflight035MPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutExecutionLayerSplit035OPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutOwnerApprovalMega035Q035SPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutExecutionRuntimeGate035UPanel language={language} config={config} setNotice={setNotice} />
          <TaxiAdminWalletPaymentPayoutFinalLockSelection035VPanel language={language} config={config} setNotice={setNotice} />
        </>
      ) : null}

      {activeTab === "reports" ? (
        <>
      <div className="taxiRuntime028HBridge" data-taxi-admin-runtime-028h-panel="admin-ui-live-count-binding" data-taxi-admin-runtime-028h-source="/api/admin/taxi/runtime-028f/ui-count-snapshot">
        <div className="taxiRuntime028HHead">
          <div><span>{TAXI_ADMIN_RUNTIME_028H_MARKER}</span><h2>Счётчики Taxi</h2><p>Админка показывает только безопасные сводки из runtime-028F. Сырые строки, персональные данные, запись в базу, кошелёк, провайдеры и движение денег не используются.</p></div>
          <button type="button" onClick={() => void loadCountBridge028H()} disabled={countBridgeStatus028H === "loading"}>{countBridgeStatus028H === "loading" ? "Обновление" : "Обновить счётчики"}</button>
        </div>
        <div className="taxiRuntime028HStatus" data-taxi-admin-runtime-028h-status={countBridgeStatus028H} data-taxi-admin-runtime-028h-records-empty={String(Array.isArray(countSnapshot028H?.records) ? countSnapshot028H?.records.length === 0 : true)}>
          <div><span>Среда</span><strong>{countBridgeStatus028H === "ready" ? "онлайн" : countBridgeStatus028H}</strong><small>{countBridgeMessage028H}</small></div>
          <div><span>Разделы</span><strong>{TAXI_ADMIN_RUNTIME_028H_SECTIONS.length}</strong><small>финансы/доступ/управление/отчёты/архив/водители/авто/конкурсы/бонусы/агенты</small></div>
          <div><span>Сырые строки</span><strong>{countSnapshot028H?.rawRowsReturned ? "ошибка" : "0"}</strong><small>records всегда пустой массив</small></div>
          <div><span>Чтение базы из интерфейса</span><strong>0</strong><small>читает только безопасные счётчики безопасный счётчик 028E</small></div>
        </div>
        <div className="taxiRuntime028HGrid" data-taxi-admin-runtime-028h-sections="financeProgram-access-management-reports-archive-driversCars-contests-bonuses-agentApplications">
          {TAXI_ADMIN_RUNTIME_028H_SECTIONS.map((item) => <div key={item.id} className="taxiRuntime028HItem"><span>{item.label}</span><strong>{sectionCount028H(countSnapshot028H, item.id)}</strong><small>{TAXI_ADMIN_RUNTIME_028H_SECTION_ROUTE}{item.id}</small></div>)}
        </div>
      </div>

      <div className="taxiRuntime028KReadModels" data-taxi-admin-runtime-028k-panel="admin-ui-safe-read-models-binding" data-taxi-admin-runtime-028k-source="/api/admin/taxi/runtime-028i/safe-read-models" data-taxi-admin-runtime-028k-records-empty={String(Array.isArray(safeReadModelsSnapshot028K?.records) ? safeReadModelsSnapshot028K.records.length === 0 : true)} data-taxi-admin-runtime-028k-raw-personal-rows={String(Boolean(safeReadModelsSnapshot028K?.personalRowsReturned))}>
        <div className="taxiRuntime028KHead">
          <div><span>{TAXI_ADMIN_RUNTIME_028K_MARKER}</span><h2>Безопасные модели чтения</h2><p>Админка показывает только безопасные карточки чтения из runtime-028I. Сырые строки, персональные данные, имитации, запись в базу, кошелёк, провайдеры и движение денег не используются.</p></div>
          <button type="button" onClick={() => void loadSafeReadModels028K()} disabled={safeReadModelsStatus028K === "loading"}>{safeReadModelsStatus028K === "loading" ? "Обновление" : "Обновить модели чтения"}</button>
        </div>
        <div className="taxiRuntime028KStatus" data-taxi-admin-runtime-028k-status={safeReadModelsStatus028K}>
          <div><span>Среда</span><strong>{safeReadModelsStatus028K === "ready" ? "онлайн" : safeReadModelsStatus028K}</strong><small>{safeReadModelsMessage028K}</small></div>
          <div><span>Безопасные модели</span><strong>{safeReadModels028K.length || TAXI_ADMIN_RUNTIME_028H_SECTIONS.length}</strong><small>9 разделов админки Taxi</small></div>
          <div><span>Сырые персональные строки</span><strong>{safeReadModelsSnapshot028K?.personalRowsReturned ? "ошибка" : "0"}</strong><small>заблокированные поля не отображаются</small></div>
          <div><span>Запись в базу / деньги</span><strong>0</strong><small>UI не выполняет запись, кошелёк, провайдеров и выплаты</small></div>
        </div>
        <div className="taxiRuntime028KGrid" data-taxi-admin-runtime-028k-sections="financeProgram-access-management-reports-archive-driversCars-contests-bonuses-agentApplications">
          {TAXI_ADMIN_RUNTIME_028H_SECTIONS.map((item) => {
            const model = findReadModel028K(safeReadModels028K, item.id);
            return (
              <div key={item.id} className="taxiRuntime028KItem" data-taxi-admin-runtime-028k-section={item.id} data-taxi-admin-runtime-028k-records-empty="true">
                <span>{model?.labelRu || item.label}</span>
                <strong>{model ? "безопасно" : "ожидает"}</strong>
                <small>{modelRoute028K(model, item.id)}</small>
                <em>{safeFieldPreview028K(model?.allowedUiFields)}</em>
              </div>
            );
          })}
        </div>
      </div>


        </>
      ) : null}

      {activeTab === "drivers" || activeTab === "vehicles" ? (
        <TaxiDriversCars024APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "finance" ? (
        <TaxiFinanceProgram027APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "tariffs" ? (
        <TaxiTariffs008APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "orders" ? (
        <TaxiOrders009APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "complaints" ? (
        <TaxiAdminComplaints027L language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "rewards" ? (
        <TaxiBonusRewards007ZPanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "contests" ? (
        <TaxiContestAdmin021APanel config={config} setNotice={setNotice} />
      ) : activeTab === "archive" ? (
        <TaxiArchiveAdmin022APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "reports" ? (
        <TaxiReportsAdmin023APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "management" ? (
        <TaxiManagementAdmin025APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "access" ? (
        <TaxiAccessAdmin026APanel language={language} config={config} setNotice={setNotice} />
      ) : activeTab === "applications" ? (
        <div className="taxi007yApplicationsWorkspace" data-admin-ui-taxi-007z-applications-exact-workflow="ready">
          <aside className="taxi007yApplicationsList" data-admin-ui-taxi-007z-new-application-list="ready" data-admin-ui-taxi-007z-fix2-list-first-workflow="ready">
            <div className="ms007b-sectionTitle"><h2>{copy.newApplications}</h2><span>{filteredApplications.length}</span></div>
            <button className="taxi007yPrimary" type="button" disabled={busyAction === "load"} onClick={() => void loadApplications()}>{busyAction === "load" ? copy.openingApplication : copy.load}</button>
            <div className="taxi007yCategoryTabs" data-admin-ui-taxi-007z-application-categories="standard-comfort-business-delivery-intercity">
              {CATEGORIES007Z.map((category) => <button key={category} type="button" className={activeCategory === category ? "active" : ""} aria-pressed={activeCategory === category} onClick={() => changeCategory009A(category)}>{copy.categories[category]}</button>)}
            </div>
            <div className="taxi007yListItems">
              {filteredApplications.length ? filteredApplications.map((item) => (
                <button key={item.applicationId} type="button" aria-pressed={selectedId === item.applicationId} data-application-selected={selectedId === item.applicationId ? "true" : "false"} className={selectedId === item.applicationId ? "active" : ""} onClick={() => void selectApplication(item.applicationId)}>
                  <strong>{item.applicationId}</strong>
                  <span>{item.driverName || item.phone || copy.openApplication}</span>
                  <small>{copy.categories[item.category]} · {item.vehiclePlate || item.region || item.status}</small>
                </button>
              )) : <div className="taxi007yEmptyList" data-admin-ui-taxi-007z-fix2-empty-new-applications="ready"><strong>{copy.emptyNewApplications}</strong><span>{copy.emptyNewApplicationsHint}</span></div>}
            </div>
          </aside>

          <main className="taxi007yReviewCard" data-admin-ui-taxi-007z-click-open-application-details="ready">
            <div className="taxi007yCardHead"><div><h2>{copy.openApplication}</h2><p>{selectedApplication ? selectedApplication.applicationId : copy.emptyNewApplications}</p></div><strong>{readinessPercent}%</strong></div>
            {selectedApplication ? (
              <>
                <section className="taxi007yMiniBlock"><h3>{copy.driverData}</h3><div className="taxi007yDataGrid">{dataPairs007Z(copy, selectedApplication).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}</div></section>
                <section className="taxi007yMiniBlock"><h3>{copy.carData}</h3><div className="taxi007yDataGrid">{vehiclePairs007Z(copy, selectedApplication).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}</div></section>
                <section className="taxi007yMiniBlock" data-admin-ui-taxi-007z-mobile-upload-documents="ready"><h3>{copy.driverDocs}</h3><div className="taxi007yDocGrid compact">{docPairs007Z(copy, selectedApplication).map(([label, value]) => <a key={label} href={value || undefined} target="_blank" rel="noreferrer" className={value ? "filled" : "missing"}><span>{label}</span><strong>{value ? copy.openApplication : copy.blocked}</strong><small>{value || copy.required}</small></a>)}</div></section>
                <section className="taxi007yMiniBlock" data-admin-ui-taxi-007z-mobile-upload-car-photos="front-back-side-interior-dashboard-mileage"><h3>{copy.carPhotos}</h3><div className="taxi007yPhotoGrid">{photoPairs007Z(copy, selectedApplication).map(([label, value]) => <a key={label} href={value || undefined} target="_blank" rel="noreferrer" className={value ? "filled" : "missing"}><span>{label}</span><strong>{value ? copy.ready : copy.blocked}</strong></a>)}</div></section>
              </>
            ) : <div className="taxi007yEmptyState" data-admin-ui-taxi-007z-fix2-no-manual-form="ready"><strong>{copy.emptyNewApplications}</strong><span>{copy.emptyNewApplicationsHint}</span></div>}
          </main>

          <aside className="taxi007yDecisionDock" data-admin-ui-taxi-007z-approve-reject-archive-actions="ready">
            <div className="ms007b-sectionTitle"><h2>{copy.archiveDecision}</h2><span>{approveBlockers.length ? copy.blocked : copy.ready}</span></div>
            <label><span>{copy.decisionReason}</span><textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} /></label>
            <label><span>{copy.archiveId}</span><input value={archiveId} onChange={(event) => setArchiveId(event.target.value)} /></label>
            <label><span>{copy.ownerNote}</span><textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} /></label>
            <div className="taxi007yChecks minimal" data-admin-ui-taxi-007z-minimal-checks="ready">
              {([
                ["driverDocs", copy.checkDriverDocs], ["vehicleDocs", copy.checkVehicleDocs], ["vehiclePhotos", copy.checkVehiclePhotos], ["archive", copy.checkArchive],
              ] as Array<[keyof Checks007Z, string]>).map(([key, label]) => <label key={key} className={checks[key] ? "checked" : ""}><input type="checkbox" checked={checks[key]} onChange={(event) => setChecks((prev) => ({ ...prev, [key]: event.target.checked }))} /><span>{label}</span></label>)}
            </div>
            <div className="taxi007yActionButtons exact">
              <button type="button" data-taxi-application-action="approve" disabled={busyAction === "approve"} onClick={() => void submitAction("approve")}>{copy.approve}</button>
              <button type="button" data-taxi-application-action="reject" disabled={busyAction === "reject"} onClick={() => void submitAction("reject")}>{copy.reject}</button>
              <button type="button" data-taxi-application-action="request-docs" disabled={busyAction === "request-docs"} onClick={() => void submitAction("request-docs")}>{copy.requestDocs}</button>
              <button type="button" data-taxi-application-action="archive" disabled={busyAction === "archive"} onClick={() => void submitAction("archive")}>{copy.saveArchive}</button>
            </div>
            <div className="taxi007yBlockers"><strong>{copy.blocked}</strong>{approveBlockers.length ? approveBlockers.slice(0, 8).map((blocker) => <span key={blocker}>{blocker}</span>) : <span>{copy.ready}</span>}</div>
            <div className="taxi007yLastResponse"><strong>{copy.lastResponse}</strong><span>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : copy.backendOnly}</span><small>{lastResponse?.route || route}</small></div>
            <div className="taxi007yLastResponse" data-admin-ui-taxi-007z-fix1-click-feedback="ready"><strong>{copy.clickStarted}</strong><span>{lastClick ? `${lastClick.action} · ${lastClick.outcome} · ${lastClick.applicationId}` : copy.backendOnly}</span><small>{lastClick?.route || route}</small></div>
            <div className="taxi007yArchivePromise"><strong>{copy.archivedIncomingData}</strong><span>{copy.approvedDriverBase}</span></div>
          </aside>
        </div>
      ) : (
        <TaxiAdminRemainingOps026DPanel language={language} config={config} setNotice={setNotice} activeTab={activeTab as TaxiAdminRemainingTab026D} />
      )}
    </section>
  );
}
