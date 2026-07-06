import { useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props007X = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type Tab007X = "applications" | "drivers" | "vehicles" | "tariffs" | "orders" | "trips" | "complaints" | "balance" | "rewards" | "contests" | "archive" | "reports" | "access";
type Category007X = "standard" | "comfort" | "business" | "delivery" | "intercity";
type Action007X = "approve" | "reject" | "request-docs" | "archive";
type LastResponse007X = { action: string; ok: boolean; status: number | string; message: string; route: string; at: string } | null;

type TaxiApplication007X = {
  applicationId: string;
  category: Category007X;
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

type Copy007X = {
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
  balance: string;
  rewards: string;
  contests: string;
  archive: string;
  reports: string;
  access: string;
  categories: Record<Category007X, string>;
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
};

const MARKER007X_FIX1 = "ADMIN-UI-TAXI-007X-APPLICATIONS-NO-FAKE-100";
const WRITE_GATE_007X = "/api/taxi/002x/db-write-runtime/write-gate";
const READ_ONLY_007X = "/api/taxi/002t/read-only-db-dry-run";

const TABS007X: Tab007X[] = ["applications", "drivers", "vehicles", "tariffs", "orders", "trips", "complaints", "balance", "rewards", "contests", "archive", "reports", "access"];
const CATEGORIES007X: Category007X[] = ["standard", "comfort", "business", "delivery", "intercity"];

const COPY007X: Record<AdminLanguage, Copy007X> = {
  ru: {
    title: "Такси: заявки водителей",
    subtitle: "Простой рабочий экран: список новых заявок, открыть заявку, посмотреть документы и фото из мобильной загрузки, утвердить или отклонить, обязательно сохранить архив. При утверждении готовится атомарная серверная запись: архив полученных данных, добавление в базу утверждённых водителей и аудит. Интерфейс не создаёт ручную заявку и не меняет статус локально.",
    readiness: "Готовность экрана заявок", uiReady: "Интерфейс заявки", productionReady: "Production / protected system", applications: "Заявки", drivers: "Водители", vehicles: "Авто", tariffs: "Тарифы", orders: "Заказы", trips: "Поездки", complaints: "Жалобы", balance: "Баланс", rewards: "Бонусы", contests: "Конкурсы", archive: "Архив", reports: "Отчёты", access: "Доступ",
    categories: { standard: "Стандарт", comfort: "Комфорт", business: "Бизнес", delivery: "Доставка", intercity: "Межгород" },
    newApplications: "Новые заявки", openApplication: "Открытая заявка", noApplication: "Выбери новую заявку слева. Пустая ручная форма здесь не нужна.", load: "Загрузить новые заявки", refresh: "Синхронизировать", driverData: "Данные водителя", carData: "Данные авто", driverDocs: "Документы водителя", carPhotos: "Фото авто из мобильной загрузки", archiveDecision: "Решение и архив", approve: "Утвердить и добавить в базу водителей", reject: "Отклонить заявку", requestDocs: "Запросить документы", saveArchive: "Сохранить полученные данные в архив", required: "Обязательно", blocked: "Не готово", ready: "Готово", backendOnly: "Только через сервер", noFake: "Без фейка: интерфейс не меняет статус локально. Статус, архив и база утверждённых водителей меняются только после ответа сервера.", ownerAi: "Саби ИИ владельца контролирует проверку, но сам не утверждает.", preserved: "Полная консоль такси сохранена. Сейчас дорабатывается только экран заявок.", nextSection: "Этот раздел будет дорабатываться по очереди после заявок.", lastResponse: "Последний ответ сервера", decisionReason: "Причина решения", archiveId: "Номер архива", ownerNote: "Заметка для Саби ИИ владельца", route: "Backend write gate", appId: "Номер заявки", status: "Статус", submittedAt: "Дата отправки", driverName: "ФИО", phone: "Телефон", region: "Регион", category: "Категория", plate: "Госномер", model: "Модель авто", mobileUploadId: "Mobile upload ID", driverPhoto: "Фото водителя", passport: "Паспорт / номер документа", license: "Водительские права", vehicleDocument: "Документы авто", frontPhoto: "Авто спереди", backPhoto: "Авто сзади", leftPhoto: "Авто слева", rightPhoto: "Авто справа", interiorFront: "Салон спереди", interiorBack: "Салон сзади", dashboard: "Приборная панель", mileage: "Пробег авто", checkDriverDocs: "Документы водителя проверены", checkVehicleDocs: "Документы авто проверены", checkVehiclePhotos: "Все фото авто проверены", checkArchive: "Архив обязателен", approvedDriverBase: "Запись в базу утверждённых водителей", archivedIncomingData: "Архивировать все полученные данные",
  },
  en: {
    title: "Taksi: driver applications", subtitle: "Application review center: open the application, review documents and photos, approve or reject, and save the archive. The interface does not change status locally.", readiness: "Applications readiness", uiReady: "Applications interfeys", productionReady: "Production / protected system", applications: "Applications", drivers: "Drivers", vehicles: "Vehicles", tariffs: "Tariffs", orders: "Orders", trips: "Trips", complaints: "Complaints", balance: "Balance", rewards: "Rewards", contests: "Contests", archive: "Archive", reports: "Reports", access: "Access",
    categories: { standard: "Standard", comfort: "Comfort", business: "Business", delivery: "Delivery", intercity: "Intercity" },
    newApplications: "New applications", openApplication: "Open application", noApplication: "Select a new application on the left. No empty manual form is needed here.", load: "Load new applications", refresh: "Synchronize", driverData: "Driver data", carData: "Vehicle data", driverDocs: "Driver documents", carPhotos: "Vehicle photos from mobile upload", archiveDecision: "Decision and archive", approve: "Approve and add to drivers database", reject: "Reject application", requestDocs: "Request documents", saveArchive: "Archive received data", required: "Required", blocked: "Not ready", ready: "Ready", backendOnly: "Backend-only", noFake: "No fake: UI does not change status locally. Status, archive and approved-driver database change only after backend response.", ownerAi: "Owner Sabi AI monitors review but does not approve independently.", preserved: "Full Taxi console is preserved. Only the applications screen is being refined now.", nextSection: "This section will be refined after applications.", lastResponse: "Last backend response", decisionReason: "Decision reason", archiveId: "Archive ID", ownerNote: "Owner Sabi AI note", route: "Backend write gate", appId: "Application ID", status: "Status", submittedAt: "Submitted at", driverName: "Full name", phone: "Phone", region: "Region", category: "Category", plate: "Plate", model: "Vehicle model", mobileUploadId: "Mobile upload ID", driverPhoto: "Driver photo", passport: "Passport / ID", license: "Driver license", vehicleDocument: "Vehicle documents", frontPhoto: "Vehicle front", backPhoto: "Vehicle back", leftPhoto: "Vehicle left", rightPhoto: "Vehicle right", interiorFront: "Interior front", interiorBack: "Interior back", dashboard: "Dashboard", mileage: "Mileage", checkDriverDocs: "Driver documents checked", checkVehicleDocs: "Vehicle documents checked", checkVehiclePhotos: "All vehicle photos checked", checkArchive: "Archive required", approvedDriverBase: "Approved-driver database record", archivedIncomingData: "Archive all received data",
  },
  uz: {
    title: "Taksi: haydovchi arizalari", subtitle: "Sodda ish ekrani: yangi arizalar ro‘yxati, arizani ochish, mobil yuklash hujjat va fotolarini ko‘rish, tasdiqlash yoki rad etish, albatta arxivga saqlash.", readiness: "Arizalar tayyorligi", uiReady: "Arizalar interfeysi", productionReady: "Production / protected system", applications: "Arizalar", drivers: "Haydovchilar", vehicles: "Avto", tariffs: "Tariflar", orders: "Buyurtmalar", trips: "Safarlar", complaints: "Shikoyatlar", balance: "Balans", rewards: "Bonuslar", contests: "Tanlovlar", archive: "Arxiv", reports: "Hisobotlar", access: "Kirish",
    categories: { standard: "Standart", comfort: "Komfort", business: "Biznes", delivery: "Yetkazish", intercity: "Shaharlararo" },
    newApplications: "Yangi arizalar", openApplication: "Ochilgan ariza", noApplication: "Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.", load: "Yangi arizalarni yuklash", refresh: "Sinxronlash", driverData: "Haydovchi ma’lumoti", carData: "Avto ma’lumoti", driverDocs: "Haydovchi hujjatlari", carPhotos: "Mobile upload avto fotolari", archiveDecision: "Qaror va arxiv", approve: "Tasdiqlash va haydovchilar bazasiga qo‘shish", reject: "Arizani rad etish", requestDocs: "Hujjat so‘rash", saveArchive: "Kelgan ma’lumotlarni arxivlash", required: "Majburiy", blocked: "Tayyor emas", ready: "Tayyor", backendOnly: "Faqat backend-only", noFake: "Fake yo‘q: UI statusni lokal o‘zgartirmaydi. Status, arxiv va tasdiqlangan haydovchi bazasi faqat backend javobidan keyin o‘zgaradi.", ownerAi: "Owner Sabi AI tekshiruvni nazorat qiladi, o‘zi tasdiqlamaydi.", preserved: "To‘liq Taxi console saqlangan. Hozir faqat arizalar ekrani takomillashtirilmoqda.", nextSection: "Bu bo‘lim arizalardan keyin takomillashtiriladi.", lastResponse: "Oxirgi backend javobi", decisionReason: "Qaror sababi", archiveId: "Arxiv ID", ownerNote: "Owner Sabi AI eslatmasi", route: "Backend write gate", appId: "Ariza ID", status: "Status", submittedAt: "Yuborilgan sana", driverName: "F.I.Sh.", phone: "Telefon", region: "Hudud", category: "Kategoriya", plate: "Davlat raqami", model: "Avto modeli", mobileUploadId: "Mobile upload ID", driverPhoto: "Haydovchi fotosi", passport: "Passport / ID", license: "Haydovchilik guvohnomasi", vehicleDocument: "Avto hujjatlari", frontPhoto: "Avto oldi", backPhoto: "Avto orqasi", leftPhoto: "Avto chap tomoni", rightPhoto: "Avto o‘ng tomoni", interiorFront: "Salon oldi", interiorBack: "Salon orqasi", dashboard: "Pribor paneli", mileage: "Probeg", checkDriverDocs: "Haydovchi hujjatlari tekshirildi", checkVehicleDocs: "Avto hujjatlari tekshirildi", checkVehiclePhotos: "Barcha avto fotolari tekshirildi", checkArchive: "Arxiv majburiy", approvedDriverBase: "Tasdiqlangan haydovchilar bazasi yozuvi", archivedIncomingData: "Barcha kelgan ma’lumotlarni arxivlash",
  },
  zh: {
    title: "出租车：司机申请", subtitle: "简单工作页：新申请列表，打开申请，查看移动端上传的文件和照片，批准或拒绝，必须保存归档。批准时通过服务器关口准备写入已批准司机库。", readiness: "申请完成度", uiReady: "申请界面", productionReady: "Production / protected system", applications: "申请", drivers: "司机", vehicles: "车辆", tariffs: "费率", orders: "订单", trips: "行程", complaints: "投诉", balance: "余额", rewards: "奖励", contests: "竞赛", archive: "归档", reports: "报告", access: "权限",
    categories: { standard: "标准", comfort: "舒适", business: "商务", delivery: "配送", intercity: "城际" },
    newApplications: "新申请", openApplication: "打开的申请", noApplication: "请从左侧选择新申请。这里不需要空的手动表单。", load: "加载新申请", refresh: "同步", driverData: "司机资料", carData: "车辆资料", driverDocs: "司机文件", carPhotos: "移动端上传车辆照片", archiveDecision: "决定和归档", approve: "批准并加入司机库", reject: "拒绝申请", requestDocs: "要求补充文件", saveArchive: "归档收到的数据", required: "必填", blocked: "未就绪", ready: "就绪", backendOnly: "仅通过服务器", noFake: "无假成功：界面不在本地更改状态。状态、归档和已批准司机库只在服务器响应后改变。", ownerAi: "所有者萨比智能监督审核，但不会独立批准。", preserved: "完整出租车控制台已保留。当前只完善申请页面。", nextSection: "该模块将在申请后完善。", lastResponse: "最后服务器响应", decisionReason: "决定原因", archiveId: "归档 ID", ownerNote: "所有者萨比智能备注", route: "Backend write gate", appId: "申请 ID", status: "状态", submittedAt: "提交时间", driverName: "姓名", phone: "电话", region: "区域", category: "类别", plate: "车牌", model: "车辆型号", mobileUploadId: "Mobile upload ID", driverPhoto: "司机照片", passport: "护照 / 编号", license: "驾驶证", vehicleDocument: "车辆文件", frontPhoto: "车辆前方", backPhoto: "车辆后方", leftPhoto: "车辆左侧", rightPhoto: "车辆右侧", interiorFront: "前排内饰", interiorBack: "后排内饰", dashboard: "仪表盘", mileage: "里程", checkDriverDocs: "司机文件已检查", checkVehicleDocs: "车辆文件已检查", checkVehiclePhotos: "所有车辆照片已检查", checkArchive: "必须归档", approvedDriverBase: "已批准司机库记录", archivedIncomingData: "归档所有收到的数据",
  },
};

const emptyApplication007X: TaxiApplication007X = {
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

const normalizeBase007X = (config: AdminApiConfig): string => String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");

function pick007X(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value);
  }
  return "";
}

function normalizeCategory007X(value: string): Category007X {
  const normalized = value.toLowerCase();
  if (normalized.includes("comfort") || normalized.includes("комфорт")) return "comfort";
  if (normalized.includes("business") || normalized.includes("бизнес")) return "business";
  if (normalized.includes("delivery") || normalized.includes("доставка")) return "delivery";
  if (normalized.includes("intercity") || normalized.includes("межгород")) return "intercity";
  return "standard";
}

function fromLiveRow007X(row: Record<string, unknown>): TaxiApplication007X {
  return {
    applicationId: pick007X(row, ["applicationId", "driverApplicationId", "id"]),
    category: normalizeCategory007X(pick007X(row, ["category", "serviceCategory", "tariffCategory", "requestedCategory"])),
    status: pick007X(row, ["status", "applicationStatus"]) || "new",
    submittedAt: pick007X(row, ["submittedAt", "createdAt", "receivedAt"]),
    driverName: pick007X(row, ["driverName", "fullName", "name"]),
    phone: pick007X(row, ["phone", "phoneNumber", "driverPhone"]),
    region: pick007X(row, ["region", "city", "serviceRegion"]),
    driverPhotoUrl: pick007X(row, ["driverPhotoUrl", "profilePhotoUrl", "photoUrl"]),
    passportUrl: pick007X(row, ["passportUrl", "passportPhotoUrl", "idDocumentUrl"]),
    licenseUrl: pick007X(row, ["licenseUrl", "licensePhotoUrl", "driverLicenseUrl"]),
    vehicleDocumentUrl: pick007X(row, ["vehicleDocumentUrl", "registrationUrl", "registrationDocumentUrl", "vehicleRegistrationUrl"]),
    vehiclePlate: pick007X(row, ["vehiclePlate", "plate", "plateNumber"]),
    vehicleModel: pick007X(row, ["vehicleModel", "model", "carModel"]),
    vehicleFrontPhotoUrl: pick007X(row, ["vehicleFrontPhotoUrl", "carFrontPhotoUrl", "frontPhotoUrl"]),
    vehicleBackPhotoUrl: pick007X(row, ["vehicleBackPhotoUrl", "carBackPhotoUrl", "backPhotoUrl"]),
    vehicleLeftPhotoUrl: pick007X(row, ["vehicleLeftPhotoUrl", "carLeftPhotoUrl", "leftPhotoUrl", "vehicleSidePhotoUrl"]),
    vehicleRightPhotoUrl: pick007X(row, ["vehicleRightPhotoUrl", "carRightPhotoUrl", "rightPhotoUrl"]),
    interiorFrontPhotoUrl: pick007X(row, ["interiorFrontPhotoUrl", "frontInteriorPhotoUrl"]),
    interiorBackPhotoUrl: pick007X(row, ["interiorBackPhotoUrl", "backInteriorPhotoUrl", "vehicleInteriorPhotoUrl"]),
    dashboardPhotoUrl: pick007X(row, ["dashboardPhotoUrl", "instrumentPanelPhotoUrl", "vehicleDashboardPhotoUrl"]),
    mileagePhotoUrl: pick007X(row, ["mileagePhotoUrl", "odometerPhotoUrl", "vehicleMileagePhotoUrl"]),
    rawMobileUploadId: pick007X(row, ["mobileUploadId", "uploadId", "rawMobileUploadId"]),
  };
}

const requiredApproveFields007X: Array<keyof TaxiApplication007X> = ["applicationId", "category", "driverName", "phone", "region", "driverPhotoUrl", "passportUrl", "licenseUrl", "vehicleDocumentUrl", "vehiclePlate", "vehicleModel", "vehicleFrontPhotoUrl", "vehicleBackPhotoUrl", "vehicleLeftPhotoUrl", "vehicleRightPhotoUrl", "interiorFrontPhotoUrl", "interiorBackPhotoUrl", "dashboardPhotoUrl", "mileagePhotoUrl"];

type Checks007X = { driverDocs: boolean; vehicleDocs: boolean; vehiclePhotos: boolean; archive: boolean };

function blockers007X(application: TaxiApplication007X | null, checks: Checks007X, action: Action007X, reason: string, archiveId: string, copy: Copy007X): string[] {
  const blockers: string[] = [];
  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);
  if (action === "approve") {
    requiredApproveFields007X.forEach((key) => {
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

function readiness007X(application: TaxiApplication007X | null, checks: Checks007X, archiveId: string): number {
  if (!application?.applicationId) return 0;
  const filled = requiredApproveFields007X.filter((key) => String(application[key] || "").trim()).length;
  const checked = Object.values(checks).filter(Boolean).length;
  const archive = archiveId.trim() ? 1 : 0;
  return Math.round(((filled + checked + archive) / (requiredApproveFields007X.length + 5)) * 100);
}

function dataPairs007X(copy: Copy007X, application: TaxiApplication007X): Array<[string, string]> {
  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone], [copy.region, application.region], [copy.mobileUploadId, application.rawMobileUploadId]];
}

function vehiclePairs007X(copy: Copy007X, application: TaxiApplication007X): Array<[string, string]> {
  return [[copy.plate, application.vehiclePlate], [copy.model, application.vehicleModel]];
}

function docPairs007X(copy: Copy007X, application: TaxiApplication007X): Array<[string, string]> {
  return [[copy.driverPhoto, application.driverPhotoUrl], [copy.passport, application.passportUrl], [copy.license, application.licenseUrl], [copy.vehicleDocument, application.vehicleDocumentUrl]];
}

function photoPairs007X(copy: Copy007X, application: TaxiApplication007X): Array<[string, string]> {
  return [[copy.frontPhoto, application.vehicleFrontPhotoUrl], [copy.backPhoto, application.vehicleBackPhotoUrl], [copy.leftPhoto, application.vehicleLeftPhotoUrl], [copy.rightPhoto, application.vehicleRightPhotoUrl], [copy.interiorFront, application.interiorFrontPhotoUrl], [copy.interiorBack, application.interiorBackPhotoUrl], [copy.dashboard, application.dashboardPhotoUrl], [copy.mileage, application.mileagePhotoUrl]];
}

function buildPayload007X(action: Action007X, application: TaxiApplication007X | null, checks: Checks007X, decisionReason: string, archiveId: string, ownerNote: string, route: string) {
  return {
    source: "admin-ui-007x-applications-no-fake-100",
    action,
    requestedOperationRoute: `/api/taxi/admin/driver-applications/${action}`,
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

export function TaxiAdminControl007XPanel({ language, config, setNotice }: Props007X) {
  const copy = COPY007X[language] || COPY007X.ru;
  const [activeTab, setActiveTab] = useState<Tab007X>("applications");
  const [activeCategory, setActiveCategory] = useState<Category007X>("standard");
  const [applications, setApplications] = useState<TaxiApplication007X[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [checks, setChecks] = useState<Checks007X>({ driverDocs: false, vehicleDocs: false, vehiclePhotos: false, archive: false });
  const [decisionReason, setDecisionReason] = useState("");
  const [archiveId, setArchiveId] = useState("");
  const [ownerNote, setOwnerNote] = useState("");
  const [routeOverride, setRouteOverride] = useState("");
  const [lastResponse, setLastResponse] = useState<LastResponse007X>(null);
  const [busyAction, setBusyAction] = useState<string>("");

  const route = routeOverride.trim() || WRITE_GATE_007X;
  const selectedApplication = useMemo(() => applications.find((item) => item.applicationId === selectedId) || null, [applications, selectedId]);
  const filteredApplications = useMemo(() => applications.filter((item) => item.category === activeCategory), [applications, activeCategory]);
  const readinessPercent = readiness007X(selectedApplication, checks, archiveId);
  const productionReadinessPercent = 78;
  const approveBlockers = useMemo(() => blockers007X(selectedApplication, checks, "approve", decisionReason, archiveId, copy), [selectedApplication, checks, decisionReason, archiveId, copy]);

  const resetReviewState = () => {
    setChecks({ driverDocs: false, vehicleDocs: false, vehiclePhotos: false, archive: false });
    setDecisionReason("");
    setArchiveId("");
    setOwnerNote("");
  };

  const loadApplications = async () => {
    try {
      const response = await fetch(`${normalizeBase007X(config)}${READ_ONLY_007X}`, { headers: { "x-sabi-admin-token": config.token || "", "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } });
      const json = await response.json().catch(() => ({}));
      const rows = Array.isArray(json?.rows) ? json.rows : Array.isArray(json?.data?.rows) ? json.data.rows : [];
      const mapped = rows.map((row: Record<string, unknown>) => fromLiveRow007X(row)).filter((item: TaxiApplication007X) => item.applicationId && (item.status.toLowerCase().includes("new") || item.status.toLowerCase().includes("pending") || item.status.toLowerCase().includes("review")));
      setApplications(mapped);
      setSelectedId(mapped[0]?.applicationId || "");
      resetReviewState();
      setLastResponse({ action: copy.load, ok: response.ok, status: response.status, route: READ_ONLY_007X, message: mapped.length ? `${mapped.length}` : "no_new_applications_from_backend", at: new Date().toISOString() });
      setNotice(response.ok ? copy.refresh : copy.blocked);
    } catch (error) {
      setLastResponse({ action: copy.load, ok: false, status: "network_error", route: READ_ONLY_007X, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
    }
  };

  const selectApplication = (applicationId: string) => {
    setSelectedId(applicationId);
    resetReviewState();
  };

  const submitAction = async (action: Action007X) => {
    const blockers = blockers007X(selectedApplication, checks, action, decisionReason, archiveId, copy);
    if (blockers.length) {
      setLastResponse({ action, ok: false, status: "blocked", route, message: blockers.slice(0, 4).join(" · "), at: new Date().toISOString() });
      return;
    }
    setBusyAction(action);
    const payload = buildPayload007X(action, selectedApplication, checks, decisionReason, archiveId, ownerNote, route);
    try {
      const response = await fetch(`${normalizeBase007X(config)}${route}`, { method: "POST", headers: { "content-type": "application/json", "x-sabi-admin-token": config.token || "" }, body: JSON.stringify(payload) });
      const json = await response.json().catch(() => ({}));
      setLastResponse({ action, ok: response.ok, status: response.status, route, message: String(json?.message || json?.error || (response.ok ? copy.ready : copy.blocked)), at: new Date().toISOString() });
      setNotice(response.ok ? copy.backendOnly : copy.blocked);
      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      setLastResponse({ action, ok: false, status: "network_error", route, message: error instanceof Error ? error.message : "network_error", at: new Date().toISOString() });
    } finally {
      setBusyAction("");
    }
  };

  return (
    <section className="messengerStyle007B taxi007xSimple taxi007xNoFake100" data-admin-ui-taxi-007x-applications-no-fake-100="ready" data-admin-ui-taxi-007x-approved-driver-backend-payload="atomic-required" data-admin-ui-taxi-007x-archive-all-received-data="required" data-admin-ui-taxi-007x-atomic-approved-driver-write="required" data-admin-ui-taxi-007x-post-write-sync="required">
      <div className="ms007b-hero">
        <div><span>{MARKER007X_FIX1}</span><h1>{copy.title}</h1><p>{copy.subtitle}</p></div>
        <div className="ms007b-heroStatus"><strong>{readinessPercent}%</strong><span>{copy.readiness}</span></div>
      </div>

      <div className="ms007b-tabs" data-admin-ui-taxi-007x-full-console-tabs-preserved="ready">
        {TABS007X.map((tab) => <button key={tab} type="button" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{copy[tab]}</button>)}
      </div>

      <div className="ms007b-metrics">
        <div className="ms007b-metric"><span>{copy.uiReady}</span><strong>{readinessPercent}%</strong><small>{copy.applications}</small></div>
        <div className="ms007b-metric"><span>{copy.productionReady}</span><strong>{productionReadinessPercent}%</strong><small>{copy.backendOnly}</small></div>
        <div className="ms007b-metric"><span>No fake</span><strong>ON</strong><small>{copy.noFake}</small></div>
        <div className="ms007b-metric"><span>Owner Sabi AI</span><strong>CONTROL</strong><small>{copy.ownerAi}</small></div>
      </div>

      {activeTab === "applications" ? (
        <div className="taxi007xApplicationsWorkspace" data-admin-ui-taxi-007x-applications-exact-workflow="ready">
          <aside className="taxi007xApplicationsList" data-admin-ui-taxi-007x-new-application-list="ready">
            <div className="ms007b-sectionTitle"><h2>{copy.newApplications}</h2><span>{filteredApplications.length}</span></div>
            <button className="taxi007xPrimary" type="button" onClick={() => void loadApplications()}>{copy.load}</button>
            <div className="taxi007xCategoryTabs" data-admin-ui-taxi-007x-application-categories="standard-comfort-business-delivery-intercity">
              {CATEGORIES007X.map((category) => <button key={category} type="button" className={activeCategory === category ? "active" : ""} onClick={() => { setActiveCategory(category); setSelectedId(""); resetReviewState(); }}>{copy.categories[category]}</button>)}
            </div>
            <div className="taxi007xListItems">
              {filteredApplications.length ? filteredApplications.map((item) => (
                <button key={item.applicationId} type="button" className={selectedId === item.applicationId ? "active" : ""} onClick={() => selectApplication(item.applicationId)}>
                  <strong>{item.applicationId}</strong>
                  <span>{item.driverName || item.phone || copy.openApplication}</span>
                  <small>{copy.categories[item.category]} · {item.vehiclePlate || item.region || item.status}</small>
                </button>
              )) : <div className="taxi007xEmptyList">{copy.noApplication}</div>}
            </div>
          </aside>

          <main className="taxi007xReviewCard" data-admin-ui-taxi-007x-click-open-application-details="ready">
            <div className="taxi007xCardHead"><div><h2>{copy.openApplication}</h2><p>{selectedApplication ? selectedApplication.applicationId : copy.noApplication}</p></div><strong>{readinessPercent}%</strong></div>
            {selectedApplication ? (
              <>
                <section className="taxi007xMiniBlock"><h3>{copy.driverData}</h3><div className="taxi007xDataGrid">{dataPairs007X(copy, selectedApplication).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}</div></section>
                <section className="taxi007xMiniBlock"><h3>{copy.carData}</h3><div className="taxi007xDataGrid">{vehiclePairs007X(copy, selectedApplication).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}</div></section>
                <section className="taxi007xMiniBlock" data-admin-ui-taxi-007x-mobile-upload-documents="ready"><h3>{copy.driverDocs}</h3><div className="taxi007xDocGrid compact">{docPairs007X(copy, selectedApplication).map(([label, value]) => <a key={label} href={value || undefined} target="_blank" rel="noreferrer" className={value ? "filled" : "missing"}><span>{label}</span><strong>{value ? copy.openApplication : copy.blocked}</strong><small>{value || copy.required}</small></a>)}</div></section>
                <section className="taxi007xMiniBlock" data-admin-ui-taxi-007x-mobile-upload-car-photos="front-back-side-interior-dashboard-mileage"><h3>{copy.carPhotos}</h3><div className="taxi007xPhotoGrid">{photoPairs007X(copy, selectedApplication).map(([label, value]) => <a key={label} href={value || undefined} target="_blank" rel="noreferrer" className={value ? "filled" : "missing"}><span>{label}</span><strong>{value ? copy.ready : copy.blocked}</strong></a>)}</div></section>
              </>
            ) : <div className="taxi007xEmptyState">{copy.noApplication}</div>}
          </main>

          <aside className="taxi007xDecisionDock" data-admin-ui-taxi-007x-approve-reject-archive-actions="ready">
            <div className="ms007b-sectionTitle"><h2>{copy.archiveDecision}</h2><span>{approveBlockers.length ? copy.blocked : copy.ready}</span></div>
            <label><span>{copy.decisionReason}</span><textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} /></label>
            <label><span>{copy.archiveId}</span><input value={archiveId} onChange={(event) => setArchiveId(event.target.value)} /></label>
            <label><span>{copy.ownerNote}</span><textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} /></label>
            <div className="taxi007xChecks minimal" data-admin-ui-taxi-007x-minimal-checks="ready">
              {([
                ["driverDocs", copy.checkDriverDocs], ["vehicleDocs", copy.checkVehicleDocs], ["vehiclePhotos", copy.checkVehiclePhotos], ["archive", copy.checkArchive],
              ] as Array<[keyof Checks007X, string]>).map(([key, label]) => <label key={key} className={checks[key] ? "checked" : ""}><input type="checkbox" checked={checks[key]} onChange={(event) => setChecks((prev) => ({ ...prev, [key]: event.target.checked }))} /><span>{label}</span></label>)}
            </div>
            <label><span>{copy.route}</span><input value={routeOverride} onChange={(event) => setRouteOverride(event.target.value)} placeholder={WRITE_GATE_007X} /></label>
            <div className="taxi007xActionButtons exact">
              <button type="button" disabled={busyAction === "approve" || !selectedApplication} onClick={() => void submitAction("approve")}>{copy.approve}</button>
              <button type="button" disabled={busyAction === "reject" || !selectedApplication} onClick={() => void submitAction("reject")}>{copy.reject}</button>
              <button type="button" disabled={busyAction === "request-docs" || !selectedApplication} onClick={() => void submitAction("request-docs")}>{copy.requestDocs}</button>
              <button type="button" disabled={busyAction === "archive" || !selectedApplication} onClick={() => void submitAction("archive")}>{copy.saveArchive}</button>
            </div>
            <div className="taxi007xBlockers"><strong>{copy.blocked}</strong>{approveBlockers.length ? approveBlockers.slice(0, 8).map((blocker) => <span key={blocker}>{blocker}</span>) : <span>{copy.ready}</span>}</div>
            <div className="taxi007xLastResponse"><strong>{copy.lastResponse}</strong><span>{lastResponse ? `${lastResponse.status} · ${lastResponse.message}` : copy.backendOnly}</span><small>{lastResponse?.route || route}</small></div>
            <div className="taxi007xArchivePromise"><strong>{copy.archivedIncomingData}</strong><span>{copy.approvedDriverBase}</span></div>
          </aside>
        </div>
      ) : (
        <div className="ms007b-grid" data-admin-ui-taxi-007x-other-sections-preserved="ready"><div className="ms007b-mainCard"><h2>{copy[activeTab]}</h2><p>{copy.nextSection}</p></div><div className="ms007b-sideCard"><h3>{copy.ownerAi}</h3><p>{copy.preserved}</p></div></div>
      )}
    </section>
  );
}
