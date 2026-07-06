
import { useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type Props007U = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };
type ActionTone007U = "ready" | "warn" | "danger" | "neutral";
type SourceStatus007U = { key: string; path: string; ok: boolean; status: number | string; message: string; at: string };
type LastResponse007U = { ok: boolean; status: number | string; action: string; route: string; message: string; createdAt: string; yuklama?: unknown; response?: unknown } | null;
type Row007U = Record<string, unknown>;
type Copy007U = Record<string, string>;

const MARKER007U = "ADMIN-UI-TAXI-007U-APPLICATIONS-100-WORKING-PAGE";
const WRITE_GATE_007U = "/api/taxi/002x/db-write-runtime/write-gate";
const READ_ONLY_007U = "/api/taxi/002t/read-only-db-dry-run";
const ROUTES_007U = "/api/taxi/002n/routes";

const COPY007U: Record<AdminLanguage, Copy007U> = {
  ru: {
    title: "Такси: заявки таксистов — рабочая страница 100%",
    subtitle: "Менеджер такси проверяет каждую заявку, документы, фото, авто, риск, архив и отправляет только серверное действие. Никакого локального фейкового успеха.",
    step: "Шаг 18 · сначала заявки до 100%, потом водители",
    load: "Загрузить заявки и маршруты",
    sync: "Синхронизировать",
    queue: "Очередь заявок",
    dossier: "Досье заявки",
    docs: "Документы и фото",
    vehicle: "Авто",
    risk: "Проверка риска",
    decision: "Решение менеджера",
    archive: "Архив проверки",
    ownerAi: "egasining Sabi sunʼiy intellekti",
    ownerAiText: "Саби ИИ владельца контролирует менеджера, проверяет полноту заявки, докладывает владельцу и ждёт команду. Сам ничего не утверждает.",
    noFake: "Без фейка: статус заявки не меняется в интерфейсе. Кнопка отправляет пакет в серверный шлюз записи и показывает реальный ответ или причину блокировки.",
    search: "Поиск по заявкам",
    empty: "Сервер не вернул заявки. Можно ввести номер заявки вручную, но действие всё равно уйдёт только на сервер.",
    appId: "Application ID",
    driverName: "ФИО водителя",
    phone: "Телефон",
    region: "Регион",
    date: "Дата заявки",
    status: "Статус заявки",
    license: "Номер водительских прав",
    idDoc: "Паспорт / номер документа",
    selfie: "Селфи с документом",
    profilePhoto: "Фото профиля",
    licensePhoto: "Фото прав",
    insurance: "Страховка",
    registration: "Регистрация авто",
    vehicleExterior: "Фото авто снаружи",
    vehicleInterior: "Фото салона",
    plate: "Госномер",
    model: "Марка и модель",
    category: "Категория",
    year: "Год выпуска",
    color: "Цвет",
    fraudScore: "Риск / оценка мошенничества",
    complaints: "Связанные жалобы",
    duplicates: "Дубликаты / повторные заявки",
    managerComment: "Комментарий менеджера",
    adminReason: "Причина решения",
    ownerApproval: "Номер одобрения владельца / команда владельца",
    approve: "Подтвердить заявку",
    reject: "Отклонить заявку",
    requestDocs: "Запросить документы",
    reopen: "Вернуть на проверку",
    archiveAction: "Сохранить архив проверки",
    selectRow: "Выбрать",
    importRow: "Заполнить из серверной строки",
    blockers: "Блокеры",
    ready: "Готово к отправке на сервер",
    notReady: "Заполните обязательные поля и проверки",
    lastResponse: "Последний ответ сервера",
    sourceHealth: "Синхрон источников",
    hiddenPayload: "Технический пакет",
    showPayload: "Показать пакет",
    hidePayload: "Скрыть пакет",
    required: "обязательно",
    checked: "проверено",
    missing: "не хватает",
  },
  en: {
    title: "Taksi: driver applications — 100% working page",
    subtitle: "Taksi menejer reviews each application, documents, photos, vehicle, risk, archive and sends faqat server orqali actions. No local soxta muvaffaqiyat.",
    step: "Step 18 · applications first, drivers next",
    load: "Load applications and routes",
    sync: "Synchronize",
    queue: "Application queue",
    dossier: "Application dossier",
    docs: "Documents and photos",
    vehicle: "Vehicle",
    risk: "Risk review",
    decision: "Manager decision",
    archive: "Review archive",
    ownerAi: "egasining Sabi sunʼiy intellekti",
    ownerAiText: "egasining Sabi sunʼiy intellekti controls the menejer, checks application completeness, reports to egasi and waits for command. It never approves independently.",
    noFake: "Soxta natija yo‘q: ariza holati interfeysda o‘zgarmaydi. Tugma yuklamani server yozuv nazoratiga yuboradi va real javob hamda bloklash sababini ko‘rsatadi.",
    search: "Search applications",
    empty: "Server returned no applications. You can enter Ariza raqami manually, but the action still goes only to server.",
    appId: "Application ID",
    driverName: "Driver full name",
    phone: "Phone",
    region: "Region",
    date: "Application date",
    status: "Application holat",
    license: "Driver license number",
    idDoc: "Passport / ID",
    selfie: "Selfie with document",
    profilePhoto: "Profile photo",
    licensePhoto: "License photo",
    insurance: "Insurance",
    registration: "Vehicle registration",
    vehicleExterior: "Vehicle exterior photo",
    vehicleInterior: "Interior photo",
    plate: "Plate number",
    model: "Make and model",
    category: "Category",
    year: "Year",
    color: "Color",
    fraudScore: "Risk / fraud score",
    complaints: "Related complaints",
    duplicates: "Duplicates / repeat applications",
    managerComment: "Manager comment",
    adminReason: "Decision reason",
    ownerApproval: "egasi tasdig‘i raqami / egasi buyrug‘i",
    approve: "Approve application",
    reject: "Reject application",
    requestDocs: "Request documents",
    reopen: "Return to review",
    archiveAction: "Save review archive",
    selectRow: "Select",
    importRow: "Fill from backend row",
    blockers: "Blockers",
    ready: "Ready to send to server",
    notReady: "Complete required fields and checks",
    lastResponse: "Last official response",
    sourceHealth: "Source sync",
    hiddenPayload: "Technical yuklama",
    showPayload: "Show yuklama",
    hidePayload: "Hide yuklama",
    required: "required",
    checked: "checked",
    missing: "missing",
  },
  uz: {
    title: "Taksi: haydovchi arizalari — 100% ishchi sahifa",
    subtitle: "Taksi menejer har bir ariza, hujjat, foto, avtomobil, risk va arxivni tekshiradi va faqat faqat server orqali amal yuboradi. Lokal soxta muvaffaqiyat yo‘q.",
    step: "18-bosqich · avval arizalar 100%, keyin haydovchilar",
    load: "Arizalar va routes yuklash",
    sync: "Sinxronlash",
    queue: "Arizalar navbati",
    dossier: "Ariza dosyesi",
    docs: "Hujjatlar va foto",
    vehicle: "Avto",
    risk: "Risk tekshiruvi",
    decision: "Manager qarori",
    archive: "Tekshiruv arxivi",
    ownerAi: "egasining Sabi sunʼiy intellekti",
    ownerAiText: "egasining Sabi sunʼiy intellekti menejerni nazorat qiladi, ariza to‘liqligini tekshiradi, egasiga hisobot beradi va buyruq kutadi. O‘zi tasdiqlamaydi.",
    noFake: "Soxta natija yo‘q: ariza holati interfeys ichida o‘zgarmaydi. Tugma yuklamani server yozuv nazoratiga yuboradi va real javobni ko‘rsatadi.",
    search: "Arizalarni qidirish",
    empty: "Server arizalar qaytarmadi. Ariza raqami qo‘lda kiritilishi mumkin, lekin amal faqat server ga ketadi.",
    appId: "Application ID",
    driverName: "Haydovchi F.I.Sh.",
    phone: "Telefon",
    region: "Hudud",
    date: "Ariza sanasi",
    status: "Ariza holati",
    license: "Haydovchilik guvohnomasi raqami",
    idDoc: "Passport / ID",
    selfie: "Hujjat bilan selfie",
    profilePhoto: "Profil fotosi",
    licensePhoto: "Guvohnoma fotosi",
    insurance: "Sug‘urta",
    registration: "Avto ro‘yxati",
    vehicleExterior: "Avto tashqi fotosi",
    vehicleInterior: "Salon fotosi",
    plate: "Davlat raqami",
    model: "Marka va model",
    category: "Kategoriya",
    year: "Yil",
    color: "Rang",
    fraudScore: "Risk / fraud score",
    complaints: "Bog‘liq shikoyatlar",
    duplicates: "Dublikat arizalar",
    managerComment: "Manager izohi",
    adminReason: "Qaror sababi",
    ownerApproval: "Egasi tasdig‘i raqami / egasi buyrug‘i",
    approve: "Arizani tasdiqlash",
    reject: "Arizani rad etish",
    requestDocs: "Hujjat so‘rash",
    reopen: "Qayta tekshiruvga qaytarish",
    archiveAction: "Tekshiruv arxivini saqlash",
    selectRow: "Tanlash",
    importRow: "Server qatoridan to‘ldirish",
    blockers: "Blokerlar",
    ready: "Server ga yuborishga tayyor",
    notReady: "Majburiy maydonlar va tekshiruvlarni to‘ldiring",
    lastResponse: "Oxirgi server javob",
    sourceHealth: "Manba sinxroni",
    hiddenPayload: "Texnik yuklama",
    showPayload: "Payload ko‘rsatish",
    hidePayload: "Payload yashirish",
    required: "majburiy",
    checked: "tekshirildi",
    missing: "yetishmayapti",
  },
  zh: {
    title: "出租车：司机申请 — 100% 工作页面",
    subtitle: "出租车经理检查每个申请、文件、照片、车辆、风险和归档，并只发送仅服务器操作。无本地假成功。",
    step: "步骤 18 · 先把申请做到 100%，之后再做司机",
    load: "加载申请和路线",
    sync: "同步",
    queue: "申请队列",
    dossier: "申请档案",
    docs: "文件和照片",
    vehicle: "车辆",
    risk: "风险审核",
    decision: "经理决定",
    archive: "审核归档",
    ownerAi: "egasining Sabi sunʼiy intellekti",
    ownerAiText: "所有者萨比智能监督经理，检查申请完整性，向所有者报告并等待命令，不能独立批准。",
    noFake: "无假成功：界面不会更改申请状态。按钮发送数据包到服务器写入关口并显示真实响应。",
    search: "搜索申请",
    empty: "服务器没有返回申请。可以手动输入申请编号，但操作仍只发送到服务器。",
    appId: "Application ID",
    driverName: "司机姓名",
    phone: "电话",
    region: "地区",
    date: "申请日期",
    status: "申请状态",
    license: "驾驶证号码",
    idDoc: "护照 / 编号",
    selfie: "证件自拍",
    profilePhoto: "头像照片",
    licensePhoto: "驾驶证照片",
    insurance: "保险",
    registration: "车辆登记",
    vehicleExterior: "车辆外观照片",
    vehicleInterior: "车内照片",
    plate: "车牌号",
    model: "品牌和型号",
    category: "类别",
    year: "年份",
    color: "颜色",
    fraudScore: "风险 / 欺诈评分",
    complaints: "相关投诉",
    duplicates: "重复申请",
    managerComment: "经理备注",
    adminReason: "决定原因",
    ownerApproval: "所有者批准编号 / 所有者命令",
    approve: "批准申请",
    reject: "拒绝申请",
    requestDocs: "请求文件",
    reopen: "返回审核",
    archiveAction: "保存审核归档",
    selectRow: "选择",
    importRow: "从服务器行填充",
    blockers: "阻塞内容",
    ready: "可发送到服务器",
    notReady: "完成必填字段和检查",
    lastResponse: "最后服务器响应",
    sourceHealth: "源同步",
    hiddenPayload: "技术数据包",
    showPayload: "显示数据包",
    hidePayload: "隐藏数据包",
    required: "必填",
    checked: "已检查",
    missing: "缺少",
  },
};

const documentChecks007U = [
  "profilePhotoChecked",
  "idDocumentChecked",
  "selfieChecked",
  "licensePhotoChecked",
  "insuranceChecked",
  "registrationChecked",
  "vehicleExteriorChecked",
  "vehicleInteriorChecked",
] as const;

const riskChecks007U = [
  "phoneChecked",
  "regionChecked",
  "duplicateChecked",
  "complaintsChecked",
  "fraudScoreChecked",
  "ownerSabiAiReviewed",
  "archiveReady",
] as const;

const allChecks007U = [...documentChecks007U, ...riskChecks007U] as const;
type CheckKey007U = typeof allChecks007U[number];

const CHECK_LABELS_RU_007U: Record<CheckKey007U, string> = {
  profilePhotoChecked: "Фото профиля проверено",
  idDocumentChecked: "Паспорт / номер документа проверен",
  selfieChecked: "Селфи с документом проверено",
  licensePhotoChecked: "Фото прав проверено",
  insuranceChecked: "Страховка проверена",
  registrationChecked: "Регистрация авто проверена",
  vehicleExteriorChecked: "Фото авто снаружи проверено",
  vehicleInteriorChecked: "Фото салона проверено",
  phoneChecked: "Телефон проверен",
  regionChecked: "Регион проверен",
  duplicateChecked: "Дубликаты проверены",
  complaintsChecked: "Жалобы проверены",
  fraudScoreChecked: "Риск / оценка мошенничества проверен",
  ownerSabiAiReviewed: "Саби ИИ владельца просмотрел",
  archiveReady: "Архив готов",
};

const ACTIONS007U: { key: string; labelKey: string; route: string; tone: ActionTone007U; requiredChecks: CheckKey007U[]; ownerRequired?: boolean }[] = [
  { key: "approve-application", labelKey: "approve", route: "/api/taxi/admin/driver-applications/approve", tone: "ready", requiredChecks: [...allChecks007U], ownerRequired: false },
  { key: "reject-application", labelKey: "reject", route: "/api/taxi/admin/driver-applications/reject", tone: "danger", requiredChecks: ["idDocumentChecked", "duplicateChecked", "fraudScoreChecked", "ownerSabiAiReviewed", "archiveReady"] },
  { key: "request-documents", labelKey: "requestDocs", route: "/api/taxi/admin/driver-applications/request-documents", tone: "warn", requiredChecks: ["phoneChecked", "idDocumentChecked", "archiveReady"] },
  { key: "reopen-review", labelKey: "reopen", route: "/api/taxi/admin/driver-applications/reopen", tone: "neutral", requiredChecks: ["archiveReady"] },
  { key: "archive-review", labelKey: "archiveAction", route: "/api/taxi/admin/driver-applications/archive", tone: "neutral", requiredChecks: ["archiveReady"] },
];

const initialForm007U = {
  applicationId: "",
  driverName: "",
  phone: "",
  region: "",
  applicationDate: "",
  status: "pending_review",
  licenseNumber: "",
  idDocumentNumber: "",
  selfieUrl: "",
  profilePhotoUrl: "",
  licensePhotoUrl: "",
  insuranceNumber: "",
  insurancePhotoUrl: "",
  registrationNumber: "",
  registrationPhotoUrl: "",
  plate: "",
  model: "",
  category: "economy",
  year: "",
  color: "",
  vehicleExteriorUrl: "",
  vehicleInteriorUrl: "",
  fraudScore: "",
  relatedComplaints: "",
  duplicates: "",
  managerComment: "",
  adminReason: "",
  ownerApprovalId: "",
};

type Form007U = typeof initialForm007U;

function url007U(baseUrl: string, path: string): string {
  const base = (baseUrl || "").replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

async function readJson007U(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

function collectRows007U(value: unknown, out: Row007U[] = []): Row007U[] {
  if (!value || out.length >= 60) return out;
  if (Array.isArray(value)) value.forEach((item) => collectRows007U(item, out));
  else if (typeof value === "object") {
    const obj = value as Row007U;
    if (Object.keys(obj).some((key) => /id|driver|vehicle|application|phone|status|plate/i.test(key))) out.push(obj);
    Object.values(obj).forEach((item) => collectRows007U(item, out));
  }
  return out.slice(0, 60);
}

function rowText007U(row: Row007U, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return "";
}

function labelCheck007U(key: CheckKey007U, language: AdminLanguage): string {
  if (language === "ru") return CHECK_LABELS_RU_007U[key];
  const fallback = CHECK_LABELS_RU_007U[key];
  return fallback.replace("проверено", "checked").replace("проверен", "checked").replace("проверена", "checked").replace("готов", "ready");
}

function fillFromRow007U(row: Row007U): Partial<Form007U> {
  return {
    applicationId: rowText007U(row, ["applicationId", "driverApplicationId", "id", "requestId"]),
    driverName: rowText007U(row, ["driverName", "fullName", "name", "applicantName"]),
    phone: rowText007U(row, ["phone", "phoneNumber", "driverPhone"]),
    region: rowText007U(row, ["region", "city", "zone"]),
    applicationDate: rowText007U(row, ["applicationDate", "createdAt", "submittedAt"]),
    status: rowText007U(row, ["status", "applicationStatus", "reviewStatus"]) || "pending_review",
    licenseNumber: rowText007U(row, ["licenseNumber", "driverLicense", "license"]),
    idDocumentNumber: rowText007U(row, ["idDocumentNumber", "passport", "passportNumber", "documentNumber"]),
    plate: rowText007U(row, ["plate", "vehiclePlate", "licensePlate"]),
    model: rowText007U(row, ["model", "vehicleModel", "carModel"]),
    category: rowText007U(row, ["category", "vehicleCategory", "tariffClass"]) || "economy",
    year: rowText007U(row, ["year", "vehicleYear"]),
    color: rowText007U(row, ["color", "vehicleColor"]),
    fraudScore: rowText007U(row, ["fraudScore", "riskScore", "risk"]),
    relatedComplaints: rowText007U(row, ["complaints", "complaintCount", "relatedComplaints"]),
    duplicates: rowText007U(row, ["duplicates", "duplicateCount", "duplicateApplications"]),
  };
}

function requiredBlockers007U(copy: Copy007U, form: Form007U, checks: Record<CheckKey007U, boolean>, actionKey?: string): string[] {
  const blockers: string[] = [];
  const requiredFields: (keyof Form007U)[] = ["applicationId", "driverName", "phone", "region", "licenseNumber", "idDocumentNumber", "plate", "model", "adminReason"];
  requiredFields.forEach((key) => { if (!String(form[key] || "").trim()) blockers.push(`${copy.missing}: ${key}`); });
  const action = ACTIONS007U.find((item) => item.key === actionKey) || ACTIONS007U[0];
  action.requiredChecks.forEach((key) => { if (!checks[key]) blockers.push(`${copy.missing}: ${labelCheck007U(key, "ru")}`); });
  if (action.ownerRequired && !form.ownerApprovalId.trim()) blockers.push(`${copy.missing}: ownerApprovalId`);
  return blockers;
}

function compactResponseMessage007U(value: unknown): string {
  if (!value) return "empty";
  if (typeof value === "string") return value.slice(0, 160);
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of ["message", "error", "status", "reason", "code"]) {
      const v = obj[key];
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return String(v).slice(0, 180);
    }
  }
  return "response received";
}

export function TaxiAdminControl007UPanel({ language, config, setNotice }: Props007U) {
  const copy = COPY007U[language] || COPY007U.ru;
  const [form, setForm] = useState<Form007U>(initialForm007U);
  const [checks, setChecks] = useState<Record<CheckKey007U, boolean>>(() => Object.fromEntries(allChecks007U.map((key) => [key, false])) as Record<CheckKey007U, boolean>);
  const [rows, setRows] = useState<Row007U[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row007U | null>(null);
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState<SourceStatus007U[]>([]);
  const [routesRaw, setRoutesRaw] = useState<unknown>(null);
  const [lastResponse, setLastResponse] = useState<LastResponse007U>(null);
  const [loading, setLoading] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [activeAction, setActiveAction] = useState(ACTIONS007U[0].key);

  const blockers = useMemo(() => requiredBlockers007U(copy, form, checks, activeAction), [copy, form, checks, activeAction]);
  const ready = blockers.length === 0;

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows.slice(0, 18);
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q)).slice(0, 18);
  }, [rows, search]);

  const completion = useMemo(() => {
    const requiredFields: (keyof Form007U)[] = ["applicationId", "driverName", "phone", "region", "licenseNumber", "idDocumentNumber", "plate", "model", "adminReason"];
    const fieldsDone = requiredFields.filter((key) => String(form[key] || "").trim()).length;
    const checksDone = allChecks007U.filter((key) => checks[key]).length;
    return Math.round(((fieldsDone + checksDone) / (requiredFields.length + allChecks007U.length)) * 100);
  }, [form, checks]);

  const yuklamaPreview = useMemo(() => ({
    marker: MARKER007U,
    noFakeLocalApprove: true,
    requestedAction: activeAction,
    requestedOperationRoute: ACTIONS007U.find((item) => item.key === activeAction)?.route,
    effectiveBackendGateRoute: WRITE_GATE_007U,
    form,
    checks,
    blockers,
    selectedBackendRow: selectedRow,
    ownerSabiAi: {
      hierarchy: "owner_first_owner_sabi_ai_second_staff_below",
      reportToOwner: true,
      noSelfAction: true,
    },
    archivePackage: {
      applicationId: form.applicationId,
      driverName: form.driverName,
      documentsChecked: documentChecks007U.filter((key) => checks[key]),
      riskChecked: riskChecks007U.filter((key) => checks[key]),
      managerComment: form.managerComment,
      adminReason: form.adminReason,
      createdBy: "taxi_manager_ui",
    },
  }), [activeAction, blockers, checks, form, selectedRow]);

  const setField = (key: keyof Form007U, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const setCheck = (key: CheckKey007U, value: boolean) => setChecks((prev) => ({ ...prev, [key]: value }));

  const loadSources = async () => {
    setLoading(true);
    const nextSources: SourceStatus007U[] = [];
    const sourceList = [
      { key: "routes", path: ROUTES_007U },
      { key: "readOnly", path: READ_ONLY_007U, headers: { "x-sabi-taxi-db-dry-run": "read-only-approved-002t" } },
      { key: "writeGate", path: WRITE_GATE_007U },
    ];
    for (const source of sourceList) {
      try {
        const response = await fetch(url007U(config.baseUrl, source.path), { headers: source.headers || {} });
        const data = await readJson007U(response);
        if (source.key === "routes") setRoutesRaw(data);
        if (source.key === "readOnly") setRows(collectRows007U(data));
        nextSources.push({ key: source.key, path: source.path, ok: response.ok, status: response.status, message: compactResponseMessage007U(data), at: new Date().toISOString() });
      } catch (error) {
        nextSources.push({ key: source.key, path: source.path, ok: false, status: "network", message: error instanceof Error ? error.message : "network error", at: new Date().toISOString() });
      }
    }
    setSources(nextSources);
    setLoading(false);
  };

  useEffect(() => { void loadSources(); }, []);

  const importSelectedRow = () => {
    if (!selectedRow) return;
    const filled = fillFromRow007U(selectedRow);
    setForm((prev) => ({ ...prev, ...filled }));
    setNotice(copy.importRow);
  };

  const submitAction = async (actionKey: string) => {
    setActiveAction(actionKey);
    const action = ACTIONS007U.find((item) => item.key === actionKey) || ACTIONS007U[0];
    const currentBlockers = requiredBlockers007U(copy, form, checks, actionKey);
    if (currentBlockers.length) {
      setLastResponse({ ok: false, status: "blocked", action: action.key, route: WRITE_GATE_007U, message: currentBlockers.join("; "), createdAt: new Date().toISOString(), yuklama: yuklamaPreview });
      setNotice(copy.notReady);
      return;
    }
    const yuklama = { ...yuklamaPreview, requestedAction: action.key, requestedOperationRoute: action.route, blockers: currentBlockers };
    try {
      const response = await fetch(url007U(config.baseUrl, WRITE_GATE_007U), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(yuklama),
      });
      const data = await readJson007U(response);
      setLastResponse({ ok: response.ok, status: response.status, action: action.key, route: WRITE_GATE_007U, message: compactResponseMessage007U(data), createdAt: new Date().toISOString(), yuklama, response: data });
      setNotice(response.ok ? copy.ready : copy.noFake);
      await loadSources();
    } catch (error) {
      setLastResponse({ ok: false, status: "network", action: action.key, route: WRITE_GATE_007U, message: error instanceof Error ? error.message : copy.noFake, createdAt: new Date().toISOString(), yuklama });
      setNotice(copy.noFake);
    }
  };

  return (
    <section className="messengerStyle007B taxiApp007U" data-marker={MARKER007U}>
      <div className="ms007b-hero taxiAppHero007U">
        <div>
          <span className="ms007b-eyebrow">{copy.step}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="taxiAppHeroActions007U">
          <button className="ms007b-primary" type="button" onClick={loadSources} disabled={loading}>{loading ? "..." : copy.load}</button>
          <button type="button" onClick={loadSources}>{copy.sync}</button>
        </div>
      </div>

      <div className="ms007b-metrics taxiAppMetrics007U">
        <div><strong>{completion}%</strong><span>{copy.dossier}</span></div>
        <div><strong>{rows.length}</strong><span>{copy.queue}</span></div>
        <div><strong>{sources.filter((s) => s.ok).length}/{sources.length || 3}</strong><span>{copy.sourceHealth}</span></div>
        <div><strong>{blockers.length}</strong><span>{copy.blockers}</span></div>
      </div>

      <div className="taxiAppWorkspace007U">
        <aside className="ms007b-sideCard taxiAppQueue007U">
          <div className="taxiAppCardHead007U">
            <h3>{copy.queue}</h3>
            <span>{filteredRows.length}/{rows.length}</span>
          </div>
          <input className="taxiAppInput007U" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.search} />
          <div className="taxiAppRows007U">
            {filteredRows.length ? filteredRows.map((row, index) => {
              const id = rowText007U(row, ["applicationId", "id", "driverApplicationId", "requestId"]) || `row-${index + 1}`;
              return (
                <button key={`${id}-${index}`} className={selectedRow === row ? "active" : ""} type="button" onClick={() => setSelectedRow(row)}>
                  <strong>{id}</strong>
                  <span>{rowText007U(row, ["driverName", "fullName", "name", "phone"]) || "server row"}</span>
                  <em>{rowText007U(row, ["status", "applicationStatus", "reviewStatus"]) || "read-only"}</em>
                </button>
              );
            }) : <p className="taxiAppEmpty007U">{copy.empty}</p>}
          </div>
          <button className="ms007b-primary taxiAppFullWidth007U" type="button" onClick={importSelectedRow} disabled={!selectedRow}>{copy.importRow}</button>
        </aside>

        <main className="ms007b-mainCard taxiAppMain007U">
          <div className="taxiAppCardHead007U">
            <h3>{copy.dossier}</h3>
            <span>{ready ? copy.ready : copy.notReady}</span>
          </div>

          <div className="taxiAppSection007U">
            <h4>{copy.dossier}</h4>
            <div className="taxiAppFormGrid007U">
              <label>{copy.appId}<input value={form.applicationId} onChange={(e) => setField("applicationId", e.target.value)} /></label>
              <label>{copy.driverName}<input value={form.driverName} onChange={(e) => setField("driverName", e.target.value)} /></label>
              <label>{copy.phone}<input value={form.phone} onChange={(e) => setField("phone", e.target.value)} /></label>
              <label>{copy.region}<input value={form.region} onChange={(e) => setField("region", e.target.value)} /></label>
              <label>{copy.date}<input value={form.applicationDate} onChange={(e) => setField("applicationDate", e.target.value)} /></label>
              <label>{copy.status}<select value={form.status} onChange={(e) => setField("status", e.target.value)}><option>pending_review</option><option>missing_documents</option><option>ready_for_owner</option><option>backend_locked</option></select></label>
              <label>{copy.license}<input value={form.licenseNumber} onChange={(e) => setField("licenseNumber", e.target.value)} /></label>
              <label>{copy.idDoc}<input value={form.idDocumentNumber} onChange={(e) => setField("idDocumentNumber", e.target.value)} /></label>
            </div>
          </div>

          <div className="taxiAppSection007U">
            <h4>{copy.docs}</h4>
            <div className="taxiAppFormGrid007U">
              <label>{copy.profilePhoto}<input value={form.profilePhotoUrl} onChange={(e) => setField("profilePhotoUrl", e.target.value)} /></label>
              <label>{copy.selfie}<input value={form.selfieUrl} onChange={(e) => setField("selfieUrl", e.target.value)} /></label>
              <label>{copy.licensePhoto}<input value={form.licensePhotoUrl} onChange={(e) => setField("licensePhotoUrl", e.target.value)} /></label>
              <label>{copy.insurance}<input value={form.insuranceNumber} onChange={(e) => setField("insuranceNumber", e.target.value)} /></label>
              <label>{copy.registration}<input value={form.registrationNumber} onChange={(e) => setField("registrationNumber", e.target.value)} /></label>
              <label>{copy.insurance} URL<input value={form.insurancePhotoUrl} onChange={(e) => setField("insurancePhotoUrl", e.target.value)} /></label>
              <label>{copy.registration} URL<input value={form.registrationPhotoUrl} onChange={(e) => setField("registrationPhotoUrl", e.target.value)} /></label>
            </div>
            <div className="taxiAppCheckGrid007U">
              {documentChecks007U.map((key) => <label key={key}><input type="checkbox" checked={checks[key]} onChange={(e) => setCheck(key, e.target.checked)} />{labelCheck007U(key, language)}</label>)}
            </div>
          </div>

          <div className="taxiAppSection007U">
            <h4>{copy.vehicle}</h4>
            <div className="taxiAppFormGrid007U">
              <label>{copy.plate}<input value={form.plate} onChange={(e) => setField("plate", e.target.value)} /></label>
              <label>{copy.model}<input value={form.model} onChange={(e) => setField("model", e.target.value)} /></label>
              <label>{copy.category}<select value={form.category} onChange={(e) => setField("category", e.target.value)}><option>economy</option><option>comfort</option><option>business</option><option>delivery</option><option>cargo</option></select></label>
              <label>{copy.year}<input value={form.year} onChange={(e) => setField("year", e.target.value)} /></label>
              <label>{copy.color}<input value={form.color} onChange={(e) => setField("color", e.target.value)} /></label>
              <label>{copy.vehicleExterior}<input value={form.vehicleExteriorUrl} onChange={(e) => setField("vehicleExteriorUrl", e.target.value)} /></label>
              <label>{copy.vehicleInterior}<input value={form.vehicleInteriorUrl} onChange={(e) => setField("vehicleInteriorUrl", e.target.value)} /></label>
            </div>
          </div>

          <div className="taxiAppSection007U">
            <h4>{copy.risk}</h4>
            <div className="taxiAppFormGrid007U">
              <label>{copy.fraudScore}<input value={form.fraudScore} onChange={(e) => setField("fraudScore", e.target.value)} /></label>
              <label>{copy.complaints}<input value={form.relatedComplaints} onChange={(e) => setField("relatedComplaints", e.target.value)} /></label>
              <label>{copy.duplicates}<input value={form.duplicates} onChange={(e) => setField("duplicates", e.target.value)} /></label>
              <label>{copy.ownerApproval}<input value={form.ownerApprovalId} onChange={(e) => setField("ownerApprovalId", e.target.value)} /></label>
            </div>
            <div className="taxiAppCheckGrid007U">
              {riskChecks007U.map((key) => <label key={key}><input type="checkbox" checked={checks[key]} onChange={(e) => setCheck(key, e.target.checked)} />{labelCheck007U(key, language)}</label>)}
            </div>
          </div>

          <div className="taxiAppSection007U">
            <h4>{copy.decision}</h4>
            <div className="taxiAppFormGrid007U taxiAppTwo007U">
              <label>{copy.managerComment}<textarea value={form.managerComment} onChange={(e) => setField("managerComment", e.target.value)} /></label>
              <label>{copy.adminReason}<textarea value={form.adminReason} onChange={(e) => setField("adminReason", e.target.value)} /></label>
            </div>
          </div>
        </main>

        <aside className="ms007b-sideCard taxiAppActionDock007U">
          <h3>{copy.decision}</h3>
          <p className="taxiAppNotice007U">{copy.noFake}</p>
          <div className="taxiAppActions007U">
            {ACTIONS007U.map((action) => {
              const actionBlockers = requiredBlockers007U(copy, form, checks, action.key);
              return (
                <button key={action.key} type="button" className={`taxiAppAction007U ${action.tone}`} onClick={() => submitAction(action.key)} disabled={actionBlockers.length > 0} title={actionBlockers.join("\n")}>
                  {copy[action.labelKey] || action.key}
                  <span>{actionBlockers.length ? `${actionBlockers.length} ${copy.blockers}` : copy.ready}</span>
                </button>
              );
            })}
          </div>

          <div className="taxiAppBlockers007U">
            <h4>{copy.blockers}</h4>
            {blockers.length ? blockers.map((item) => <span key={item}>{item}</span>) : <strong>{copy.ready}</strong>}
          </div>

          <div className="taxiAppAi007U">
            <h4>{copy.ownerAi}</h4>
            <p>{copy.ownerAiText}</p>
          </div>
        </aside>
      </div>

      <div className="taxiAppBottom007U">
        <div className="ms007b-mainCard">
          <h3>{copy.sourceHealth}</h3>
          <div className="taxiAppSourceGrid007U">
            {sources.map((source) => <span key={source.key} className={source.ok ? "ok" : "bad"}>{source.key}: {source.status} · {source.message}</span>)}
          </div>
        </div>
        <div className="ms007b-mainCard">
          <h3>{copy.lastResponse}</h3>
          <p className={lastResponse?.ok ? "taxiAppOk007U" : "taxiAppBad007U"}>{lastResponse ? `${lastResponse.status} · ${lastResponse.action} · ${lastResponse.message}` : "empty"}</p>
          <button type="button" onClick={() => setShowPayload((prev) => !prev)}>{showPayload ? copy.hidePayload : copy.showPayload}</button>
          {showPayload ? <pre className="taxiAppPayload007U">{JSON.stringify({ yuklamaPreview, routesRaw }, null, 2)}</pre> : null}
        </div>
      </div>
    </section>
  );
}
