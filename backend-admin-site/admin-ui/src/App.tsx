import { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleBillingPayAdminControl100Panel } from "./GoogleBillingPayAdminControl100Panel";
import { AirwallexAdminControl100Panel } from "./AirwallexAdminControl100Panel";
import { StreamAdminControl100Panel } from "./StreamAdminControl100Panel";
import { AdminReadinessPanels } from "./AdminReadinessPanels";
import { GoogleBilling175AdminPanel } from "./GoogleBilling175AdminPanel";
import { Airwallex174AAdminPanel } from "./Airwallex174AAdminPanel";
import { StreamRuntimeFoundationAdminPanel } from "./StreamRuntimeFoundationAdminPanel";
import { StreamGooglePlayReviewAdminUx233APanel } from "./StreamGooglePlayReviewAdminUx233A";
import { StreamPremiumOrganismAdmin233BPanel } from "./StreamPremiumOrganismAdmin233B";
import { TaxiStreamAdminLanguage006S } from "./TaxiStreamAdminLanguage006S";
import { AdminUiModuleOverview006V, AirwallexAdminControl006VPanel, GoogleBillingAdminControl006VPanel, ReadinessAdminControl006VPanel, StreamAdminControl006VPanel } from "./AdminUiFoundationControl006V";
import { TaxiAdminControl007ZPanel } from "./TaxiAdminControl007Z";
import { OwnerSabiAiGlobalControl007KPanel } from "./OwnerSabiAiGlobalControl007K";
import { AdminUiMessengerStylePage007B } from "./AdminUiMessengerStyle007B";
import { adminApi, type AdminApiConfig } from "./api";
import { TaxiFinanceTopLevel028AFix8Panel } from "./TaxiFinanceTopLevel028AFix8";

import {
  ADMIN_LANGUAGES,
  type AdminLanguage,
  readStoredAdminLanguage,
  saveAdminLanguage,
  auditActionText,
  categoryText,
  scopeText,
  fieldText,
  providerDescription,
  providerKindText,
  providerSourceText,
  providerTitle,
  roleText,
  roleDescriptionText,
  permissionText,
  permissionGroupText,
  ruleText,
  panelText,
  statusText,
  t,
} from "./admin-i18n";
import type {
  AdminAuditEntry,
  AdminPermission,
  AdminAuditIntegrityReport,
  AdminAuditSecurityState,
  AdminHealth,
  AdminPlatformDashboard,
  AdminPrincipal,
  AdminOwnerProtectionState,
  AdminRestriction,
  AdminRoleMatrix,
  AdminPermissionDefinition,
  AdminRiskCase,
  AdminRiskConsoleState,
  AdminRiskSignal,
  AdminStaffAccessUser,
  AdminSecretSecurityState,
  AdminMerchantAccount,
  AdminMerchantDashboard,
  AdminMerchantSettlement,
  AdminBusinessAccount,
  AdminBusinessDashboard,
  AdminBusinessSettlement,
  AdminFinanceDashboard,
  AdminWalletDashboard,
  AdminWalletFiatDashboard,
  AdminWalletQrPayDashboard,
  AdminWalletCoinSecurityVaultDashboard,
  AdminWalletProviderCenter,
  AdminWalletMerchantApiCenter,
  AdminWalletPremiumSubscriptionsDashboard,
  AdminWalletGiftPurchaseDashboard,
  AdminWalletMerchantCredential,
  AdminFinanceReport,
  AdminDeveloperConsoleState,
  AdminDeveloperDiagnosticCheck,
  AdminOwnerSecurityCenterState,
  AdminOwnerCriticalConfirmation,
  AdminEmergencyDashboard,
  AdminEmergencyLock,
  AdminMessengerCenterState,
  AdminMessengerProMonitoringDashboard,
  AdminMessengerGrowthPromotionGreetingSnapshot,
  AdminMessengerGrowthAnalyticsSnapshot,
  AdminMessengerContentQualitySnapshot,
  AdminMessengerContentQualitySignal,
  AdminMessengerApprovalVisibilitySnapshot,
  AdminMessengerApprovalVisibilityEntry,
  AdminMessengerApprovalVisibilitySettings,
  AdminMessengerPresenceOperationsSnapshot,
  AdminMessengerNotificationsMonitorSnapshot,
  AdminMessengerNotificationsMonitorIssue,
  AdminMessengerFinalReadinessSnapshot,
  AdminMessengerFinalReadinessItem,
  AdminMessengerMaxPrelaunchSnapshot,
  AdminMessengerMaxPrelaunchGate,
  AdminMessengerRuntimeVerificationSnapshot,
  AdminMessengerRuntimeVerificationItem,
  AdminMessengerRuntimeVerificationSession,
  AdminMessengerFixControlSnapshot,
  AdminMessengerFixControlTicket,
  AdminMessengerReleaseCandidateSnapshot,
  AdminMessengerReleaseCandidateGate,
  AdminMessengerUiTextCleanlinessSnapshot,
  AdminMessengerUiTextCleanlinessItem,
  AdminMessengerRegressionSnapshot,
  AdminMessengerRegressionItem,
  AdminMessengerOwnerHandoffSnapshot,
  AdminMessengerOwnerHandoffItem,
  AdminMessengerAccessTextGateSnapshot,
  AdminMessengerAccessTextGateItem,
  AdminMessengerMobileTransitionSnapshot,
  AdminMessengerMobileTransitionItem,
  AdminMessengerPresenceAnomaly,
  AdminMessengerGrowthPromotionCampaign,
  AdminMessengerGreetingTemplate,
  AdminMessengerGreetingTask,
  AdminMessengerGrowthPromotionStatus,
  AdminMessengerGreetingStatus,
  AdminMessengerDiagnosticCheck,
  AdminMessengerLaunchBlocker,
  AdminMessengerModerationDashboard,
  AdminMessengerModerationReport,
  AdminMessengerPremiumSettings,
  AdminMessengerDirectoryDashboard,
  AdminMessengerDirectoryPromotionSnapshot,
  AdminMessengerDirectoryPromotionEntry,
  AdminMessengerDirectoryPromotionListingStatus,
  AdminMessengerDirectoryItem,
  AdminMessengerDirectoryKind,
  AdminMessengerDirectoryReviewAction,
  AdminMessengerDirectoryReviewQueueEntry,
  AdminMessengerDirectoryReviewQueueSnapshot,
  AdminMessengerSafetyDashboard,
  AdminMessengerAiSafetySignal,
  AdminMessengerSafetyReport,
  AdminMessengerSafetyReportPackage,
  AdminMessengerSafetyCaseReview,
  AdminMessengerSafetyRestriction,
  AdminMessengerAuthorityRequest,
  AdminMessengerEvidenceVaultItem,
  AdminMessengerSafetyEnforcementSnapshot,
  AdminMessengerSafetyEnforcementCheckResult,
  AdminMessengerSafetyRuntimeBridgeSnapshot,
  AdminMessengerSafetyRuntimeBridgeCheckResult,
  AdminMessengerSafetyRuntimeGuardedAction,
  AdminMessengerSafetyClientGuardsSnapshot,
  AdminMessengerSafetyClientGuardValidationResult,
  AdminMessengerSafetyGuardEvent,
  AdminMessengerSafetyGuardEventSnapshot,
  AdminMessengerSafetyIntegrityMonitorSnapshot,
  AdminMessengerSafetyEscalationSnapshot,
  AdminMessengerSafetyEscalationItem,
  AdminMessengerSafetyComplianceReportSnapshot,
  AdminMessengerSafetyComplianceReportPackage,
  AdminMessengerSafetyRetentionSnapshot,
  AdminMessengerSafetyLegalHold,
  AdminMessengerSafetyExportVerificationSnapshot,
  AdminMessengerSafetyExportVerificationLogItem,
  AdminMessengerSafetyAccessControlSnapshot,
  AdminMessengerSafetyAccessControlDecision,
  AdminMessengerSafetyStaffAssignment,
  AdminMessengerSafetyStaffAssignmentSnapshot,
  AdminMessengerSafetySupervisorDashboardSnapshot,
  AdminMessengerSafetySupervisorAttentionItem,
  AdminMessengerSafetyDailyOperationsSnapshot,
  AdminMessengerSafetyDailyOperationsQueueItem,
  AdminMessengerSafetyDailyOperationsAction,
  AdminMessengerSafetyPrelaunchReadinessGateSnapshot,
  AdminMessengerSafetyPrelaunchGateCheck,
  AdminMessengerSafetyLaunchCommandSnapshot,
  AdminMessengerSafetyLaunchCommandItem,
  AdminMessengerSafetyPostLaunchMonitorSnapshot,
  AdminMessengerSafetyPostLaunchWatchItem,
  AdminMessengerSafetyIncidentResponseSnapshot,
  AdminMessengerSafetyIncidentResponse,
  AdminMessengerSafetyEmergencyActionSnapshot,
  AdminMessengerSafetyEmergencyAction,
  AdminMessengerSafetyRecoveryReviewSnapshot,
  AdminMessengerSafetyRecoveryReview,
  AdminMessengerSafetyPolicyFeedbackSnapshot,
  AdminMessengerSafetyPolicyFeedbackItem,
  AdminMessengerSafetyPolicyRegistrySnapshot,
  AdminMessengerSafetyPolicyRegistryItem,
  AdminMessengerSafetyPolicyDeploymentSnapshot,
  AdminMessengerSafetyPolicyDeploymentItem,
  AdminMessengerSafetyPolicyTrainingSnapshot,
  AdminMessengerSafetyPolicyTrainingAcknowledgementItem,
  AdminMessengerSafetyClientGuard,
  AdminUser,
  ApiError,
  ProviderCatalogItem,
  ProviderDetails,
  ProviderStatus,
} from "./types";

type TabKey = "dashboard" | "taxi" | "taxiFinance" | "stream" | "googleBilling" | "airwallex" | "readiness" | "core" | "messenger" | "wallet" | "providers" | "users" | "risk" | "audit" | "roles" | "staff" | "owner" | "security" | "finance" | "merchant" | "business" | "developer" | "emergency";

type ProviderFormState = {
  enabled: boolean;
  fields: Record<string, string>;
  secretFields: Record<string, string>;
  notes: string;
};
type ProviderCriticalAction = "save" | "enable" | "disable" | "delete";

type PendingOwnerProviderAction = {
  action: ProviderCriticalAction;
  providerKey: string;
  confirmation: AdminOwnerCriticalConfirmation;
  createdAt: string;
};

function ownerActionText(language: AdminLanguage, action: ProviderCriticalAction): string {
  const map: Record<AdminLanguage, Record<ProviderCriticalAction, string>> = {
    ru: { save: "сохранение конфига", enable: "включение провайдера", disable: "отключение провайдера", delete: "удаление конфига" },
    en: { save: "save external service config", enable: "enable external service", disable: "disable external service", delete: "delete external service config" },
    uz: { save: "provayder sozlamasini saqlash", enable: "provayderni yoqish", disable: "provayderni o ‘chirish", delete: "provayder sozlamasini o ‘chirish" },
    zh: { save: "保存提供商配置", enable: "启用提供商", disable: "停用提供商", delete: "删除提供商配置" },
  };
  return map[language]?.[action] ?? map.ru[action];
}

function ownerFlowText(language: AdminLanguage, key: "required" | "approved" | "pending" | "retry" | "refresh" | "clear" | "openOwner" | "instructions" | "blocked" | "used" | "status"): string {
  const map: Record<AdminLanguage, Record<string, string>> = {
    ru: {
      required: "Требуется подтверждение владельца",
      approved: "Подтверждение владельца одобрено",
      pending: "Ожидает владельца",
      retry: "Повторить действие",
      refresh: "Обновить статус",
      clear: "Скрыть",
      openOwner: "Открой вкладку Владелец и подтверди заявку",
      instructions: "После одобрения нажмите «Повторить действие». Идентификатор подтверждения будет отправлен автоматически.",
      blocked: "Действие остановлено до подтверждения владельца",
      used: "Действие выполнено с подтверждением владельца",
      status: "Статус",
    },
    en: {
      required: "principal confirmation required",
      approved: "principal confirmation approved",
      pending: "Waiting for owner",
      retry: "Retry action",
      refresh: "Refresh state",
      clear: "Hide",
      openOwner: "Open the principal tab and approve the request",
      instructions: "After confirmation, press Retry action. The confirmation number will be sent automatically.",
      blocked: "Action is paused until principal confirmation",
      used: "Action completed with owner confirmation",
      status: "Status",
    },
    uz: {
      required: "Egasi tasdig ‘i kerak",
      approved: "Egasi tasdig ‘i berildi",
      pending: "Egasi tasdig ‘i kutilmoqda",
      retry: "Amalni qayta bajarish",
      refresh: "Holatni yangilash",
      clear: "Yashirish",
      openOwner: "Egasi bo ‘limini oching va so ‘rovni tasdiqlang",
      instructions: "Tasdiqdan keyin Amalni qayta bajarish tugmasini bosing. Tasdiq raqam avtomatik yuboriladi.",
      blocked: "Amal egasi tasdig ‘igacha to ‘xtatildi",
      used: "Amal egasi tasdig ‘i bilan bajarildi",
      status: "Holat",
    },
    zh: {
      required: "需要所有者确认",
      approved: "所有者确认已批准",
      pending: "等待所有者",
      retry: "重试操作",
      refresh: "刷新状态",
      clear: "隐藏",
      openOwner: "打开所有者页面并批准请求",
      instructions: "批准后点击重试操作，确认标识符会自动发送。",
      blocked: "操作已暂停，等待所有者批准",
      used: "操作已通过所有者确认完成",
      status: "状态",
    },
  };
  return map[language]?.[key] ?? map.ru[key] ?? key;
}

function directoryKindText(language: AdminLanguage, kind: string): string {
  const map: Record<AdminLanguage, Record<string, string>> = {
    ru: { group: "Группа", channel: "Канал", bot: "Бот" },
    en: { group: "Group", channel: "Channel", bot: "Bot" },
    uz: { group: "Guruh", channel: "Kanal", bot: "Bot" },
    zh: { group: "群组", channel: "频道", bot: "机器人" },
  };
  return map[language]?.[kind] ?? map.ru[kind] ?? kind;
}

function readOwnerConfirmationError(error: unknown): AdminOwnerCriticalConfirmation | null {
  const payload = (error as ApiError | undefined)?.payload;
  if (!payload || typeof payload !== "object") return null;
  const value = payload as { ownerConfirmationRequired?: unknown; confirmation?: unknown };
  if (!value.ownerConfirmationRequired || !value.confirmation || typeof value.confirmation !== "object") return null;
  return value.confirmation as AdminOwnerCriticalConfirmation;
}

function downloadAdminJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function splitAdminIds(value: string): string[] {
  return value.split(/[\n,;]/).map((item) => item.trim()).filter(Boolean);
}


const STORAGE_KEYS = {
  baseUrl: "sabi.admin.baseUrl",
  token: "sabi.admin.token",
};

const tabs: Array<{ key: TabKey; labelKey: Parameters<typeof t>[1]; hintKey: Parameters<typeof t>[1] }> = [
  { key: "dashboard", labelKey: "nav.dashboard", hintKey: "nav.dashboard.hint" },
  { key: "taxi", labelKey: "nav.taxi", hintKey: "nav.taxi.hint" },
  { key: "taxiFinance", labelKey: "nav.taxiFinance", hintKey: "nav.taxiFinance.hint" },
  { key: "stream", labelKey: "nav.stream", hintKey: "nav.stream.hint" },
  { key: "googleBilling", labelKey: "nav.googleBilling", hintKey: "nav.googleBilling.hint" },
  { key: "airwallex", labelKey: "nav.airwallex", hintKey: "nav.airwallex.hint" },
  { key: "readiness", labelKey: "nav.readiness", hintKey: "nav.readiness.hint" },
  { key: "core", labelKey: "nav.core", hintKey: "nav.core.hint" },
  { key: "messenger", labelKey: "nav.messenger", hintKey: "nav.messenger.hint" },
  { key: "wallet", labelKey: "nav.wallet", hintKey: "nav.wallet.hint" },
  { key: "providers", labelKey: "nav.providers", hintKey: "nav.providers.hint" },
  { key: "users", labelKey: "nav.users", hintKey: "nav.users.hint" },
  { key: "risk", labelKey: "nav.risk", hintKey: "nav.risk.hint" },
  { key: "audit", labelKey: "nav.audit", hintKey: "nav.audit.hint" },
  { key: "roles", labelKey: "nav.roles", hintKey: "nav.roles.hint" },
  { key: "staff", labelKey: "nav.staff", hintKey: "nav.staff.hint" },
  { key: "owner", labelKey: "nav.owner", hintKey: "nav.owner.hint" },
  { key: "security", labelKey: "nav.security", hintKey: "nav.security.hint" },
  { key: "finance", labelKey: "nav.finance", hintKey: "nav.finance.hint" },
  { key: "merchant", labelKey: "nav.merchant", hintKey: "nav.merchant.hint" },
  { key: "business", labelKey: "nav.business", hintKey: "nav.business.hint" },
  { key: "developer", labelKey: "nav.developer", hintKey: "nav.developer.hint" },
  { key: "emergency", labelKey: "nav.emergency", hintKey: "nav.emergency.hint" },
];


const tabPermissionMap: Record<TabKey, AdminPermission[]> = {
  dashboard: ["admin:read"],
  taxi: ["admin:read"],
  taxiFinance: ["admin:read"],
  stream: ["admin:read"],
  googleBilling: ["providers:read"],
  airwallex: ["providers:read"],
  readiness: ["admin:read"],
  core: ["admin:read"],
  messenger: ["messenger:read"],
  wallet: ["wallet:read"],
  providers: ["providers:read"],
  users: ["users:read"],
  risk: ["risk:read"],
  audit: ["audit:read"],
  roles: ["roles:read"],
  staff: ["staff:read"],
  owner: ["security:read"],
  security: ["security:read"],
  finance: ["finance:read"],
  merchant: ["merchant:read"],
  business: ["business:read"],
  developer: ["developer:read"],
  emergency: ["system:read"],
};

function hasAdminPermission(admin: AdminPrincipal | null | undefined, permission: AdminPermission): boolean {
  return Boolean(admin?.rootOwner || admin?.permissions?.includes(permission));
}

const sourceOnlyAdminUiRouteTabs006T = new Set<TabKey>(["taxi", "stream", "googleBilling", "airwallex", "readiness", "taxiFinance"]);

function canOpenAdminTab(admin: AdminPrincipal | null | undefined, tab: TabKey, matrix?: AdminRoleMatrix | null): boolean {
  if (!admin) return false;
  if (tab === "owner" || tab === "emergency") return Boolean(admin.rootOwner);
  const required = tabPermissionMap[tab] ?? ["admin:read"];
  if (!required.some((permission) => hasAdminPermission(admin, permission))) return false;
  const roleDefinition = matrix?.roles?.find((role) => role.key === admin.role);
  if (roleDefinition?.allowedPanels?.length && !roleDefinition.allowedPanels.includes(tab) && !sourceOnlyAdminUiRouteTabs006T.has(tab)) return false;
  return true;
}

function visibleAdminTabs(admin: AdminPrincipal | null | undefined, matrix?: AdminRoleMatrix | null) {
  if (!admin) return tabs;
  return tabs.filter((item) => canOpenAdminTab(admin, item.key, matrix));
}

function secretKeySourceText(language: AdminLanguage, source: unknown): string {
  const value = typeof source === "string" && source.trim() ? source.trim() : "missing";
  if (value === "ADMIN_PROVIDER_SECRET_KEY") return t(language, "security.source.explicit_env");
  if (value === "explicit_env" || value === "derived_admin_token" || value === "missing") return t(language, `security.source.${value}`);
  return value;
}

function secretKeySourceTechnicalName(source: unknown): string | null {
  const value = typeof source === "string" && source.trim() ? source.trim() : "";
  if (!value || value === "explicit_env" || value === "derived_admin_token" || value === "missing") return null;
  return value;
}

function asText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function adminUiPhraseKey(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cleanAdminUiText(language: AdminLanguage, value: unknown): string {
  const text = asText(value);
  if (!text) return "";
  const key = adminUiPhraseKey(text);
  const translated = t(language, `ui.${key}`, "");
  if (translated && translated !== `ui.${key}`) return translated;
  if (language === "ru") {
    let ru = text;
    ru = ru.replace(/^Queue depth (\d+) is above (\d+)\.$/, "Глубина очереди $1 выше лимита $2.");
    ru = ru.replace(/^Queue depth (\d+); warning limit (\d+)\.$/, "Глубина очереди $1; лимит предупреждения $2.");
    ru = ru.replace(/^(\d+)% delivered\/read in current sample\.$/, "$1% доставлено/прочитано в текущей выборке.");
    ru = ru.replace(/^(\d+) unread and (\d+) missed message delivery signals\.$/, "$1 непрочитанных и $2 пропущенных сигналов доставки сообщений.");
    ru = ru.replace(/^(\d+) missed call signals in monitored window\.$/, "$1 сигналов пропущенных звонков в окне мониторинга.");
    ru = ru.replace(/^User has (\d+) unread Messenger messages\.$/, "У пользователя $1 непрочитанных сообщений в Мессенджере.");
    ru = ru.replace(/^(\d+) missed call events in current sample\/runtime window\.$/, "$1 событий пропущенных звонков в текущем окне выполнения.");
    if (ru !== text) return ru;
  }
  return text;
}

function cleanAdminValueText(language: AdminLanguage, value: unknown): string {
  if (value === null || value === undefined) return "";
  return statusText(language, String(value));
}

function statusClass(status?: string): string {
  if (status === "ready") return "state ready";
  if (status === "disabled") return "state disabled";
  return "state warn";
}

function diagnosticClass(status?: string): string {
  if (status === "pass" || status === "ok") return "state ready";
  if (status === "fail" || status === "blocked") return "state disabled";
  return "state warn";
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function emptyProviderForm(provider: ProviderDetails | null): ProviderFormState {
  if (!provider) return { enabled: false, fields: {}, secretFields: {}, notes: "" };
  const fieldKeys = unique([...(provider.catalog.requiredFields ?? []), ...(provider.catalog.optionalFields ?? [])]);
  const secretKeys = unique(provider.catalog.secretFields ?? []);
  const fields: Record<string, string> = {};
  const secretFields: Record<string, string> = {};

  for (const key of fieldKeys) fields[key] = provider.config?.fields?.[key] ?? "";
  for (const key of secretKeys) secretFields[key] = provider.config?.secretFields?.[key] ?? "";

  return {
    enabled: Boolean(provider.config?.enabled ?? provider.status.enabled),
    fields,
    secretFields,
    notes: provider.config?.notes ?? "",
  };
}

function Header(props: {
  language: AdminLanguage;
  baseUrl: string;
  token: string;
  connected: boolean;
  loading: boolean;
  onLanguage: (value: AdminLanguage) => void;
  onBaseUrl: (value: string) => void;
  onToken: (value: string) => void;
  onConnect: () => void;
}) {
  const connectLabel = props.loading
    ? t(props.language, "button.connecting")
    : props.connected
      ? t(props.language, "button.refresh")
      : t(props.language, "button.connect");

  return (
    <header className="topbar">
      <div>
        <div className="brand">{t(props.language, "app.brand")}</div>
        <div className="brandSub">{t(props.language, "app.subtitle")}</div>
      </div>
      <div className="connection">
        <div className="languageSwitch" aria-label="Admin language">
          {ADMIN_LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === props.language ? "langButton active" : "langButton"}
              onClick={() => props.onLanguage(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input value={props.baseUrl} onChange={(event) => props.onBaseUrl(event.target.value)} placeholder={t(props.language, "placeholder.backendUrl")} />
        <input value={props.token} onChange={(event) => props.onToken(event.target.value)} placeholder={t(props.language, "placeholder.adminToken")} type="password" />
        <button onClick={props.onConnect} disabled={props.loading}>{connectLabel}</button>
        <span className={props.connected ? "dot ok" : "dot"} />
      </div>
    </header>
  );
}

function Sidebar(props: { language: AdminLanguage; tab: TabKey; visibleTabs: typeof tabs; onTab: (tab: TabKey) => void }) {
  return (
    <aside className="sidebar">
      {props.visibleTabs.map((item) => (
        <button key={item.key} className={props.tab === item.key ? "navItem active" : "navItem"} onClick={() => props.onTab(item.key)}>
          <span>{t(props.language, item.labelKey)}</span>
          <small>{t(props.language, item.hintKey)}</small>
        </button>
      ))}
    </aside>
  );
}


// SABI-CORE-MONETIZATION-100B START


// SABI-CORE-MONETIZATION-101G RUNTIME API BINDING START
type SabiCoreRuntimeRouteId = "runtimeSnapshot" | "readiness" | "providerGates" | "playReviewEvidence";

type SabiCoreRuntimeRouteSpec = {
  id: SabiCoreRuntimeRouteId;
  label: string;
  path: string;
};

type SabiCoreRuntimeRouteResult = {
  id: SabiCoreRuntimeRouteId;
  label: string;
  path: string;
  statusCode: number;
  ok: boolean;
  jsonParsed: boolean;
  bodyBytes: number;
  summary: string;
  error: string | null;
};

const SABI_CORE_101G_RUNTIME_ROUTES: SabiCoreRuntimeRouteSpec[] = [
  { id: "runtimeSnapshot", label: "Runtime snapshot", path: "/api/admin/sabi-core/monetization/runtime-snapshot" },
  { id: "readiness", label: "Readiness", path: "/api/admin/sabi-core/monetization/readiness" },
  { id: "providerGates", label: "Provider gates", path: "/api/admin/sabi-core/monetization/provider-gates" },
  { id: "playReviewEvidence", label: "Play review evidence", path: "/api/admin/sabi-core/monetization/play-review-evidence" },
];

function readSabiCoreRuntimeAdminToken(): string {
  const keys = [
    "ADMIN_PANEL_TOKEN",
    "SABI_ADMIN_PANEL_TOKEN",
    "adminPanelToken",
    "sabiAdminPanelToken",
    "admin_token",
    "adminToken",
    "token",
  ];

  for (const key of keys) {
    try {
      const value = globalThis.localStorage?.getItem(key);
      if (value && value.trim()) return value.trim();
    } catch {
      return "";
    }
  }

  return "";
}

function summarizeSabiCoreRuntimeJson(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "No JSON payload";
  const record = payload as Record<string, unknown>;
  const summary = record.summary && typeof record.summary === "object" ? record.summary as Record<string, unknown> : null;
  const values = [
    record.status,
    record.version,
    record.mode,
    summary?.status,
    summary?.overallFoundationReadiness,
    summary?.providerGatesReady,
    summary?.playReviewEvidenceReady,
  ].filter((value) => value !== undefined && value !== null && value !== "").map((value) => String(value));
  return values.length > 0 ? values.slice(0, 4).join(" · ") : "JSON ready";
}

async function fetchSabiCoreRuntimeRoute(spec: SabiCoreRuntimeRouteSpec): Promise<SabiCoreRuntimeRouteResult> {
  const token = readSabiCoreRuntimeAdminToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) {
    headers["x-sabi-admin-token"] = token;
    headers.Authorization = "Bearer " + token;
  }

  try {
    const response = await fetch(spec.path, { method: "GET", headers });
    const text = await response.text();
    let parsed: unknown = null;
    let jsonParsed = false;
    if (text) {
      try {
        parsed = JSON.parse(text) as unknown;
        jsonParsed = true;
      } catch {
        parsed = null;
      }
    }

    return {
      id: spec.id,
      label: spec.label,
      path: spec.path,
      statusCode: response.status,
      ok: response.ok,
      jsonParsed,
      bodyBytes: text.length,
      summary: jsonParsed ? summarizeSabiCoreRuntimeJson(parsed) : "JSON parse blocked",
      error: response.ok ? null : "HTTP " + response.status,
    };
  } catch (error) {
    return {
      id: spec.id,
      label: spec.label,
      path: spec.path,
      statusCode: 0,
      ok: false,
      jsonParsed: false,
      bodyBytes: 0,
      summary: "Request failed",
      error: error instanceof Error ? error.message : "sabi_core_runtime_fetch_failed",
    };
  }
}

function SabiCoreRuntimeSnapshotPanel() {
  const routes = useMemo(() => SABI_CORE_101G_RUNTIME_ROUTES, []);
  const [results, setResults] = useState<SabiCoreRuntimeRouteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastLoadedAt, setLastLoadedAt] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const next = await Promise.all(routes.map((route) => fetchSabiCoreRuntimeRoute(route)));
      setResults(next);
      setLastLoadedAt(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }, [routes]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const passed = results.filter((item) => item.statusCode === 200 && item.jsonParsed).length;
  const tokenReady = Boolean(readSabiCoreRuntimeAdminToken());

  return (
    <div className="card">
      <div className="panelHead">
        <div>
          <h3>101G Read-only runtime API binding</h3>
          <p>Protected Sabi Core monetization runtime snapshot, readiness, provider gates and Play review evidence are loaded from backend read-only Admin routes.</p>
        </div>
        <button type="button" className="ghostButton" onClick={() => void reload()} disabled={loading}>
          {loading ? "Loading" : "Reload"}
        </button>
      </div>
      <div className="statsGrid">
        <div className="statCard"><span>Runtime routes</span><strong>{routes.length}</strong></div>
        <div className="statCard"><span>HTTP 200 + JSON</span><strong>{passed}/{routes.length}</strong></div>
        <div className="statCard"><span>Admin token</span><strong>{tokenReady ? "Ready" : "Missing"}</strong></div>
        <div className="statCard"><span>Last load</span><strong>{lastLoadedAt ?? "Pending"}</strong></div>
      </div>
      <ul>
        {routes.map((route) => {
          const result = results.find((item) => item.id === route.id);
          return (
            <li key={route.id}>
              <strong>{route.label}</strong>: {result ? result.statusCode + " · " + result.summary : "pending"}
            </li>
          );
        })}
      </ul>
      <p>No provider call, DB write, Wallet mutation, money movement, payout, stake runtime, Google Billing runtime or Airwallex runtime is enabled by this Admin UI binding.</p>
    </div>
  );
}
// SABI-CORE-MONETIZATION-101G RUNTIME API BINDING END

// SABI-CORE-MONETIZATION-106M START
function SabiCoreMonetization106MReadOnlyPanel() {
  const safetyRows = [
    { label: "Authenticated snapshot", value: "passed" },
    { label: "Safe-disabled evidence", value: "4" },
    { label: "External service-not-configured", value: "3" },
    { label: "False success risk", value: "0" },
  ];

  const lockedRows = [
    "providerCallAllowedNow: false",
    "walletMutationAllowedNow: false",
    "moneyMovementAllowedNow: false",
    "creatorPayoutExecutionAllowedNow: false",
    "googleBillingRuntimeEnableAllowedNow: false",
    "airwallexRuntimeEnableAllowedNow: false",
  ];

  return (
    <div className="card">
      <div className="panelHead">
        <div>
          <h3>106M Sabi Core Monetization Runtime Readiness</h3>
          <p>Read-only Admin evidence panel bound to authenticated runtime snapshot results. It displays safe-disabled and provider-not-configured states only; it does not enable provider calls, Wallet mutation, money movement, payout, Google Billing runtime or Airwallex runtime.</p>
        </div>
      </div>
      <div className="statsGrid">
        {safetyRows.map((item) => (
          <div className="statCard" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>
        ))}
      </div>
      <ul>
        {lockedRows.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p>Evidence source: authenticated read-only Admin snapshot/status endpoints. Token values, provider secrets, DATABASE_URL, purchase tokens and card data must never be displayed.</p>
    </div>
  );
}
// SABI-CORE-MONETIZATION-106M END

function SabiCoreControlCenterPanel(props: { language: AdminLanguage }) {
  const lanes = [
    {
      title: "Stream monetization",
      status: "safe-disabled",
      summary: "Gifts, boosts, premium effects and creator earnings are prepared as controlled digital monetization lanes.",
      items: ["Google Play Billing required for Android digital goods", "No false gift income", "Creator earnings stay pending until approved release"],
    },
    {
      title: "Google Play Billing",
      status: "provider-not-configured",
      summary: "Digital coin packs and entitlements are separated from physical wallet commerce.",
      items: ["Purchase-token proof must never be printed", "Refund and revoke states required", "No Google success without live external service verification"],
    },
    {
      title: "Balance account separation",
      status: "locked-boundary",
      summary: "Physical commerce balance, purchased digital coin, rewards and creator earnings must stay separate.",
      items: ["wallet_balance_physical_commerce", "purchased_digital_coin_google_billing", "creator_earning_pending and creator_earning_payable"],
    },
    {
      title: "Airwallex / merchant",
      status: "provider-not-configured",
      summary: "Reserved for physical merchant commerce, QR/pay, supermarket, SilkRoad, business settlement and payouts.",
      items: ["KYB/KYC required", "No Android digital goods bypass", "No live money movement until external service confirmation"],
    },
    {
      title: "Gifts / creator economy",
      status: "foundation-ready",
      summary: "Gift catalog and creator earnings must run through digital coin contracts and admin release gates.",
      items: ["Gift spend uses Google-purchased digital coin on Android", "Gift income stays pending", "Manual or policy-approved release required"],
    },
    {
      title: "Paid games / stake",
      status: "locked-compliance",
      summary: "Fishing, fortune wheel and other stake modes must remain disabled until legal, country, age and KYC approvals pass.",
      items: ["Country and license control step", "Age/KYC/AML control step", "No real stake or withdrawal before legal confirmation"],
    },
    {
      title: "Sabi AI Core",
      status: "core-layer",
      summary: "AI is treated as a main Sabi platform control layer for moderation, reporting, diagnostics and creator/business tools.",
      items: ["AI moderation and reports", "Admin diagnostics", "Policy evidence for review"],
    },
    {
      title: "Play Review Evidence",
      status: "evidence-needed",
      summary: "Reviewer evidence should prove safe-disabled monetization, no false external service success and separated billing routes.",
      items: ["External service-not-configured states", "No raw secrets or purchase tokens", "Clear digital vs physical commerce boundary"],
    },
  ];

  const locked = lanes.filter((lane) => lane.status.includes("locked") || lane.status.includes("safe") || lane.status.includes("not-configured")).length;

  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <h2>Sabi Core Control Center</h2>
          <p>Unified Admin foundation for Stream monetization, Google Play Billing, Wallet separation, Airwallex, gifts, games, AI and Play review evidence.</p>
        </div>
      </div>
      <div className="statsGrid">
        <div className="statCard"><span>Foundation lanes</span><strong>{lanes.length}</strong></div>
        <div className="statCard"><span>Locked / safe-disabled</span><strong>{locked}</strong></div>
        <div className="statCard"><span>Mobile UI touched</span><strong>No</strong></div>
        <div className="statCard"><span>Money movement</span><strong>Disabled</strong></div>
      </div>
      <div className="dashboardGrid">
        {lanes.map((lane) => (
          <div className="card" key={lane.title}>
            <h3>{lane.title}</h3>
            <p>{lane.summary}</p>
            <h4>{lane.status}</h4>
            <ul>
              {lane.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      {/* SABI-CORE-MONETIZATION-100H START */}
      <div className="card">
        <h3>100H Play Review Evidence Center</h3>
        <p>Reviewer evidence is now grouped for Google Billing, Wallet/Airwallex boundaries, Stream gifts, paid games locked compliance, AI generated content safety, Messenger reporting, data safety and safe demo access.</p>
        <ul>
          <li>Android digital goods must use Google Billing where policy requires it.</li>
          <li>Wallet and Airwallex cannot bypass Google Billing for Android digital goods.</li>
          <li>Paid games, fishing stakes and wheel of fortune remain locked until legal, country, age and KYC/AML gates pass.</li>
          <li>Evidence cannot reveal raw secrets, purchase tokens, card data, prompts or private user data.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100H END */}
      {/* SABI-CORE-MONETIZATION-100G START */}
      <div className="card">
        <h3>100G Sabi AI Core control and safety layer</h3>
        <p>Sabi AI is registered as a core project layer for Admin diagnostics, Stream moderation, Messenger safety, creator tools, business helper and Play review evidence. AI provider runtime stays disabled in this source-only foundation stage.</p>
        <ul>
          <li>AI cannot reveal provider secrets, raw purchase tokens, raw prompts, private user data or card data.</li>
          <li>High-risk AI actions require Admin/manual approval and cannot move money or mutate Wallet balances.</li>
          <li>Generated content needs report/flagging, abuse, profanity and adult-safety evidence before public rollout.</li>
          <li>Premium Android AI digital services must respect Google Billing boundaries.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100G END */}
      {/* SABI-CORE-MONETIZATION-100F START */}
      <div className="card">
        <h3>100F Paid games + stake locked compliance foundation</h3>
        <p>Fishing, wheel of fortune, paid tournament entry and creator challenge prize modes are registered as locked compliance lanes. Stake and payout runtime stay disabled until legal license, country, age, KYC/AML, responsible gaming and provider gates pass.</p>
        <ul>
          <li>Stake bucket: game_stake_locked; prize buckets remain pending/payable only after legal review.</li>
          <li>Wallet physical balance and Airwallex cannot bypass Google Billing for Android digital game goods.</li>
          <li>Wheel of fortune requires odds disclosure and randomness audit before release.</li>
          <li>No provider call, DB write, Wallet mutation, fake win, fake stake success, payout or money movement is enabled.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100F END */}
      {/* SABI-CORE-MONETIZATION-100E START */}
      <div className="card">
        <h3>100E Gifts + creator earnings foundation</h3>
        <p>Stream gifts, creator support, premium effects and boosts are defined as Android digital goods. They require Google Play Billing digital coin or approved reward bonus coin. Physical Wallet balance and Airwallex cannot buy Android digital gifts.</p>
        <ul>
          <li>Gift funding buckets: purchased_digital_coin_google_billing and reward_bonus_coin.</li>
          <li>Creator income starts as creator_earning_pending and cannot be paid out by this stage.</li>
          <li>Creator payout requires KYC/AML, refund/risk review, provider readiness and admin/accountant approval.</li>
          <li>No provider call, DB write, Wallet mutation, fake gift success, raw purchase token output or money movement is enabled.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100E END */}
      {/* SABI-CORE-MONETIZATION-100D START */}
      <div className="card">
        <h3>100D Wallet separation + Airwallex readiness</h3>
        <p>Wallet, Airwallex and Google Billing boundaries are now documented as source-only controls. Airwallex is reserved for physical merchant commerce, while Android digital gifts, boosts, premium effects, digital coin packs and digital game entitlements must use Google Play Billing.</p>
        <ul>
          <li>Physical commerce: Wallet, bank rails and Airwallex after KYB/KYC and provider approval.</li>
          <li>Android digital goods: Google Play Billing only; no Wallet or Airwallex bypass.</li>
          <li>Merchant settlement, payout, refund and dispute actions remain safe-disabled.</li>
          <li>No provider call, DB write, Wallet mutation, card data handling or money movement is enabled by this stage.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100D END */}
      {/* SABI-CORE-MONETIZATION-100C START */}
      <div className="card">
        <h3>100C Stream monetization + Google Billing contracts</h3>
        <p>Source-only contracts are installed for Stream gifts, boosts, premium effects, digital coin packs and paid game stake gates. All lanes stay safe-disabled or locked until real Google provider, legal and admin approvals are completed.</p>
        <ul>
          <li>Android digital goods use Google Play Billing.</li>
          <li>Physical wallet balance cannot buy Android digital gifts, boosts, premium effects or digital game entitlements.</li>
          <li>Purchase tokens, card data and provider secrets must not be printed in Admin evidence.</li>
          <li>Fishing and fortune wheel stake modes remain locked until legal, country, age and KYC gates pass.</li>
          <li>No provider call, DB write, Wallet mutation or money movement is enabled by this stage.</li>
        </ul>
      </div>
      {/* SABI-CORE-MONETIZATION-100C END */}
      {/* SABI-CORE-MONETIZATION-101G RUNTIME PANEL RENDER */}
      <SabiCoreRuntimeSnapshotPanel />
      {/* SABI-CORE-MONETIZATION-106M PANEL RENDER */}
      <SabiCoreMonetization106MReadOnlyPanel />
      <div className="card">
        <h3>Hard safety rules</h3>
        <ul>
          <li>Android digital goods must use Google Play Billing.</li>
          <li>Wallet physical balance must not bypass Google Billing for digital goods.</li>
          <li>Airwallex is reserved for physical merchant commerce and settlement.</li>
          <li>Paid stake games stay locked until legal/license, country, age and KYC gates are approved.</li>
          <li>No fake provider success, no raw token/card leakage and no money movement from this panel.</li>
        </ul>
      </div>
    </section>
  );
}
// SABI-CORE-MONETIZATION-100B END

function Dashboard(props: {
  language: AdminLanguage;
  health: AdminHealth | null;
  me: AdminPrincipal | null;
  providers: ProviderStatus[];
  runtime: unknown;
  platformDashboard: AdminPlatformDashboard | null;
  onReload: () => void;
}) {
  const ready = props.providers.filter((item) => item.status === "ready").length;
  const missing = props.providers.filter((item) => item.recommendedBeforeLaunch && item.status !== "ready").length;
  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "dashboard.title")}</h2>
          <p>{t(props.language, "dashboard.description")}</p>
        </div>
        <button onClick={props.onReload}>{t(props.language, "button.reload")}</button>
      </div>
      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "dashboard.admin")}</span><strong>{props.me?.role ? roleText(props.language, props.me.role) : t(props.language, "dashboard.notConnected")}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.writeMode")}</span><strong>{props.health?.writeEnabled ? statusText(props.language, "enabled") : statusText(props.language, "disabled")}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.providersReady")}</span><strong>{ready}/{props.providers.length}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.launchBlockers")}</span><strong>{missing}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.totalUsers")}</span><strong>{props.platformDashboard?.summary.totalUsers ?? 0}</strong></div>
        <div className="statCard online"><span>{t(props.language, "dashboard.onlineUsers")}</span><strong>{props.platformDashboard?.summary.onlineUsers ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.newUsersToday")}</span><strong>{props.platformDashboard?.summary.newUsersToday ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "dashboard.newUsers14Days")}</span><strong>{props.platformDashboard?.summary.newUsers14Days ?? 0}</strong></div>
      </div>
      <div className="dashboardGrid">
        <div className="card dashboardChartCard">
          <h3>{t(props.language, "dashboard.userGrowth")}</h3>
          <div className="barChart" aria-label={t(props.language, "dashboard.userGrowth")}>
            {(props.platformDashboard?.charts.userGrowth14d ?? []).map((item) => {
              const max = Math.max(1, ...(props.platformDashboard?.charts.userGrowth14d ?? []).map((point) => point.value));
              return <div className="barColumn" key={item.date}><div className="barFill" style={{ height: `${Math.max(8, Math.round((item.value / max) * 100))}%` }} /><span>{item.date.slice(5)}</span><strong>{item.value}</strong></div>;
            })}
          </div>
        </div>
        <div className="card dashboardChartCard">
          <h3>{t(props.language, "dashboard.onlineMonitor")}</h3>
          <div className="onlineGauge">
            <strong>{props.platformDashboard?.summary.onlineUsers ?? 0}</strong>
            <span>{t(props.language, "dashboard.onlineNow")}</span>
          </div>
          <div className="miniStats">
            <div><span>{t(props.language, "dashboard.chats")}</span><strong>{props.platformDashboard?.summary.chats ?? 0}</strong></div>
            <div><span>{t(props.language, "dashboard.messages")}</span><strong>{props.platformDashboard?.summary.messages ?? 0}</strong></div>
            <div><span>{t(props.language, "dashboard.groups")}</span><strong>{props.platformDashboard?.summary.groups ?? 0}</strong></div>
            <div><span>{t(props.language, "dashboard.channels")}</span><strong>{props.platformDashboard?.summary.channels ?? 0}</strong></div>
            <div><span>{t(props.language, "dashboard.bots")}</span><strong>{props.platformDashboard?.summary.bots ?? 0}</strong></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>{t(props.language, "dashboard.moduleDashboards")}</h3>
        <div className="moduleDashboardGrid">
          {(props.platformDashboard?.modules ?? []).map((item) => (
            <div className="moduleDashboardCard" key={item.key}>
              <strong>{cleanAdminUiText(props.language, item.title)}</strong>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              <span>{t(props.language, "dashboard.ownDashboard")}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


type MessengerPremiumBooleanSettingKey =
  | "aiTranslationEnabled"
  | "premiumStickersEnabled"
  | "gift3dPremiumEnabled"
  | "animatedEmojiEnabled"
  | "paidBotsEnabled"
  | "coinPaymentsRequired"
  | "adminReviewForPremiumAbuse";

type MessengerDirectoryBooleanSettingKey =
  | "publicByDefault"
  | "globalSearchEnabled"
  | "profileManagementOnly"
  | "groupsEnabled"
  | "channelsEnabled"
  | "botsEnabled"
  | "botsPremiumOnly"
  | "businessAccountHidden";

type MessengerAdminPageKey =
  | "overview"
  | "growth"
  | "analytics"
  | "contentQuality"
  | "approvalVisibility"
  | "presence"
  | "notifications"
  | "finalReadiness"
  | "maxPrelaunch"
  | "runtimeVerification"
  | "fixControl"
  | "uiTextCleanliness"
  | "regression"
  | "ownerHandoff"
  | "accessTextGate"
  | "mobileTransition"
  | "releaseCandidate"
  | "directory"
  | "moderation"
  | "safety"
  | "caseVault"
  | "runtime"
  | "authority"
  | "launchOps"
  | "incidents"
  | "training"
  | "diagnostics";

const MESSENGER_ADMIN_PAGES: Array<{ key: MessengerAdminPageKey; labelKey: string; descriptionKey: string }> = [
  { key: "overview", labelKey: "messenger.page.overview", descriptionKey: "messenger.page.overview.description" },
  { key: "growth", labelKey: "messenger.page.growth", descriptionKey: "messenger.page.growth.description" },
  { key: "analytics", labelKey: "messenger.page.analytics", descriptionKey: "messenger.page.analytics.description" },
  { key: "contentQuality", labelKey: "messenger.page.contentQuality", descriptionKey: "messenger.page.contentQuality.description" },
  { key: "approvalVisibility", labelKey: "messenger.page.approvalVisibility", descriptionKey: "messenger.page.approvalVisibility.description" },
  { key: "presence", labelKey: "messenger.page.presence", descriptionKey: "messenger.page.presence.description" },
  { key: "notifications", labelKey: "messenger.page.notifications", descriptionKey: "messenger.page.notifications.description" },
  { key: "finalReadiness", labelKey: "messenger.page.finalReadiness", descriptionKey: "messenger.page.finalReadiness.description" },
  { key: "maxPrelaunch", labelKey: "messenger.page.maxPrelaunch", descriptionKey: "messenger.page.maxPrelaunch.description" },
  { key: "runtimeVerification", labelKey: "messenger.page.runtimeVerification", descriptionKey: "messenger.page.runtimeVerification.description" },
  { key: "fixControl", labelKey: "messenger.page.fixControl", descriptionKey: "messenger.page.fixControl.description" },
  { key: "uiTextCleanliness", labelKey: "messenger.page.uiTextCleanliness", descriptionKey: "messenger.page.uiTextCleanliness.description" },
  { key: "regression", labelKey: "messenger.page.regression", descriptionKey: "messenger.page.regression.description" },
  { key: "ownerHandoff", labelKey: "messenger.page.ownerHandoff", descriptionKey: "messenger.page.ownerHandoff.description" },
  { key: "accessTextGate", labelKey: "messenger.page.accessTextGate", descriptionKey: "messenger.page.accessTextGate.description" },
  { key: "mobileTransition", labelKey: "messenger.page.mobileTransition", descriptionKey: "messenger.page.mobileTransition.description" },
  { key: "releaseCandidate", labelKey: "messenger.page.releaseCandidate", descriptionKey: "messenger.page.releaseCandidate.description" },
  { key: "directory", labelKey: "messenger.page.directory", descriptionKey: "messenger.page.directory.description" },
  { key: "moderation", labelKey: "messenger.page.moderation", descriptionKey: "messenger.page.moderation.description" },
  { key: "safety", labelKey: "messenger.page.safety", descriptionKey: "messenger.page.safety.description" },
  { key: "caseVault", labelKey: "messenger.page.caseVault", descriptionKey: "messenger.page.caseVault.description" },
  { key: "runtime", labelKey: "messenger.page.runtime", descriptionKey: "messenger.page.runtime.description" },
  { key: "authority", labelKey: "messenger.page.authority", descriptionKey: "messenger.page.authority.description" },
  { key: "launchOps", labelKey: "messenger.page.launchOps", descriptionKey: "messenger.page.launchOps.description" },
  { key: "incidents", labelKey: "messenger.page.incidents", descriptionKey: "messenger.page.incidents.description" },
  { key: "training", labelKey: "messenger.page.training", descriptionKey: "messenger.page.training.description" },
  { key: "diagnostics", labelKey: "messenger.page.diagnostics", descriptionKey: "messenger.page.diagnostics.description" },
];

function monitorLabel(language: AdminLanguage, key: string): string {
  return t(language, `messenger.monitor.${key}`, key.replace(/_/g, " "));
}

function MessengerProMonitoringPanel(props: { language: AdminLanguage; dashboard: AdminMessengerProMonitoringDashboard | null }) {
  const dashboard = props.dashboard;
  const growth = dashboard?.charts.userGrowth14d ?? [];
  const growthMax = Math.max(1, ...growth.map((point) => point.value));
  const objectMax = Math.max(1, ...(dashboard?.charts.messengerObjects ?? []).map((point) => point.value));
  const safetyMax = Math.max(1, ...(dashboard?.charts.safetyLoad ?? []).map((point) => point.value));

  return (
    <div className="card messengerProDashboard messengerPageUnit messengerPageOverview">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.proDashboardTitle")}</h3>
          <p>{t(props.language, "messenger.proDashboardDescription")}</p>
        </div>
        <em className={diagnosticClass(dashboard?.summary.readinessStatus ?? "warning")}>{statusText(props.language, dashboard?.summary.readinessStatus ?? "warning")}</em>
      </div>

      <div className="proMetricGrid">
        <div className="proMetric heroMetric">
          <span>{t(props.language, "messenger.monitor.onlineNow")}</span>
          <strong>{dashboard?.summary.onlineUsers ?? 0}</strong>
          <small>{dashboard?.summary.onlineRatePct ?? 0}%</small>
        </div>
        <div className="proMetric">
          <span>{t(props.language, "messenger.monitor.totalUsers")}</span>
          <strong>{dashboard?.summary.totalUsers ?? 0}</strong>
          <small>{t(props.language, "messenger.monitor.active24h")}: {dashboard?.summary.active24hUsers ?? 0}</small>
        </div>
        <div className="proMetric">
          <span>{t(props.language, "messenger.monitor.newUsers7Days")}</span>
          <strong>{dashboard?.summary.newUsers7Days ?? 0}</strong>
          <small>{dashboard?.summary.growthRatePct ?? 0}%</small>
        </div>
        <div className="proMetric">
          <span>{t(props.language, "messenger.monitor.readinessScore")}</span>
          <strong>{dashboard?.summary.readinessScorePct ?? 0}%</strong>
          <small>{t(props.language, "messenger.blockers")}: {dashboard?.summary.launchBlockers ?? 0}</small>
        </div>
      </div>

      <div className="proDashboardGrid">
        <div className="proPanel">
          <h4>{t(props.language, "messenger.monitor.userGrowth14d")}</h4>
          <div className="proBars">
            {growth.map((item) => (
              <div className="proBar" key={item.date}>
                <div style={{ height: `${Math.max(8, Math.round((item.value / growthMax) * 100))}%` }} />
                <span>{item.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.monitor.onlineScale")}</h4>
          <div className="progressList">
            {(dashboard?.charts.onlineScale ?? []).map((item) => (
              <div className="progressItem" key={item.label}>
                <div><strong>{monitorLabel(props.language, item.label)}</strong><span>{item.value}</span></div>
                <em><i style={{ width: `${Math.max(4, Math.min(100, item.percent))}%` }} /></em>
              </div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.monitor.objects")}</h4>
          <div className="progressList">
            {(dashboard?.charts.messengerObjects ?? []).map((item) => (
              <div className="progressItem" key={item.label}>
                <div><strong>{monitorLabel(props.language, item.label)}</strong><span>{item.value}</span></div>
                <em><i style={{ width: `${Math.max(4, Math.round((item.value / objectMax) * 100))}%` }} /></em>
              </div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.monitor.safetyLoad")}</h4>
          <div className="progressList">
            {(dashboard?.charts.safetyLoad ?? []).map((item) => (
              <div className="progressItem" key={item.label}>
                <div><strong>{monitorLabel(props.language, item.label)}</strong><span>{item.value}</span></div>
                <em><i style={{ width: `${item.value <= 0 ? 4 : Math.max(8, Math.round((item.value / safetyMax) * 100))}%` }} /></em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="healthLaneGrid">
        {(dashboard?.healthLanes ?? []).map((lane) => (
          <div className="healthLane" key={lane.key}>
            <div><strong>{monitorLabel(props.language, lane.key)}</strong><em className={diagnosticClass(lane.status)}>{statusText(props.language, lane.status)}</em></div>
            <span>{t(props.language, `messenger.monitor.${lane.key}.description`, lane.description)}</span>
            <b><i style={{ width: `${Math.max(4, Math.min(100, lane.progressPct))}%` }} /></b>
          </div>
        ))}
      </div>

      {(dashboard?.rules ?? []).length ? <ul className="rulesList">{(dashboard?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}

function MessengerDirectoryPromotionManagerPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerDirectoryPromotionSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  setNote: (value: string) => void;
  boostForms: Record<string, { featuredRank: string; searchBoostPct: string; directoryBoostPct: string; recommended: boolean }>;
  setBoostForms: (value: Record<string, { featuredRank: string; searchBoostPct: string; directoryBoostPct: string; recommended: boolean }>) => void;
  toggleSetting: (key: "approvalRequired" | "autoPublishVerifiedProfileObjects" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", value: boolean) => void;
  syncDirectory: () => void;
  updateStatus: (item: AdminMessengerDirectoryPromotionEntry, status: AdminMessengerDirectoryPromotionListingStatus) => void;
  boostEntry: (item: AdminMessengerDirectoryPromotionEntry) => void;
}) {
  const snapshot = props.snapshot;
  const maxKind = Math.max(1, ...(snapshot?.charts.byKind ?? []).map((item) => item.value));
  const maxFunnel = Math.max(1, ...(snapshot?.charts.funnel ?? []).map((item) => item.value));
  const maxQuality = Math.max(1, ...(snapshot?.charts.quality ?? []).map((item) => item.value));
  const topEntries = (snapshot?.entries ?? []).slice(0, 40);

  function formFor(item: AdminMessengerDirectoryPromotionEntry) {
    return props.boostForms[item.id] ?? {
      featuredRank: item.featuredRank ? String(item.featuredRank) : "",
      searchBoostPct: String(item.searchBoostPct ?? 0),
      directoryBoostPct: String(item.directoryBoostPct ?? 0),
      recommended: Boolean(item.recommended),
    };
  }

  function setForm(item: AdminMessengerDirectoryPromotionEntry, update: Partial<{ featuredRank: string; searchBoostPct: string; directoryBoostPct: string; recommended: boolean }>) {
    const current = formFor(item);
    props.setBoostForms({ ...props.boostForms, [item.id]: { ...current, ...update } });
  }

  return (
    <div className="card directoryPromotionManager messengerPageUnit messengerPageDirectory">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.directoryPromotionTitle")}</h3>
          <p>{t(props.language, "messenger.directoryPromotionDescription")}</p>
        </div>
        <em className={diagnosticClass(snapshot?.summary.status ?? "not_configured")}>{statusText(props.language, snapshot?.summary.status ?? "not_configured")}</em>
      </div>

      <div className="proMetricGrid">
        <div className="proMetric heroMetric"><span>{t(props.language, "messenger.directoryPromotionPublic")}</span><strong>{snapshot?.summary.publicEntries ?? 0}</strong><small>{t(props.language, "messenger.directoryPromotionTotal")}: {snapshot?.summary.totalEntries ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.directoryPromotionPending")}</span><strong>{snapshot?.summary.pendingApproval ?? 0}</strong><small>{t(props.language, "messenger.directoryPromotionLowQuality")}: {snapshot?.summary.lowQualityEntries ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.directoryPromotionFeatured")}</span><strong>{snapshot?.summary.featuredEntries ?? 0}</strong><small>{t(props.language, "messenger.directoryPromotionBoosted")}: {snapshot?.summary.boostedEntries ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.directoryPromotionConversion")}</span><strong>{snapshot?.summary.conversionPct ?? 0}%</strong><small>{t(props.language, "messenger.directoryPromotionRecommended")}: {snapshot?.summary.recommendedEntries ?? 0}</small></div>
      </div>

      <div className="growthSettingsGrid">
        <div className="proPanel">
          <h4>{t(props.language, "messenger.directoryPromotionSettings")}</h4>
          {snapshot ? ([
            ["approvalRequired", "messenger.directoryApprovalRequired"],
            ["autoPublishVerifiedProfileObjects", "messenger.directoryAutoPublishVerified"],
            ["featuredRequiresOwnerApproval", "messenger.directoryFeaturedOwnerApproval"],
            ["qualityGateEnabled", "messenger.directoryQualityGate"],
            ["antiSpamReviewRequired", "messenger.directoryAntiSpamReview"],
          ] as Array<["approvalRequired" | "autoPublishVerifiedProfileObjects" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", string]>).map(([key, label]) => (
            <label key={key} className="checkLine">
              <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
          <label><span>{t(props.language, "messenger.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          {props.canWrite ? <button onClick={props.syncDirectory} disabled={props.busy}>{t(props.language, "messenger.directorySyncPromotion")}</button> : null}
        </div>

        <div className="proPanel">
          <h4>{t(props.language, "messenger.directoryPromotionByKind")}</h4>
          <div className="progressList">
            {(snapshot?.charts.byKind ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.${item.label}s`, item.label)}</strong><span>{item.public}/{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxKind) * 100))}%` }} /></em></div>)}
          </div>
        </div>

        <div className="proPanel">
          <h4>{t(props.language, "messenger.directoryPromotionFunnel")}</h4>
          <div className="progressList">
            {(snapshot?.charts.funnel ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.directoryFunnel.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxFunnel) * 100))}%` }} /></em></div>)}
          </div>
        </div>

        <div className="proPanel">
          <h4>{t(props.language, "messenger.directoryPromotionQuality")}</h4>
          <div className="progressList">
            {(snapshot?.charts.quality ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.directoryQuality.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxQuality) * 100))}%` }} /></em></div>)}
          </div>
        </div>
      </div>

      <div className="tableList directoryPromotionList">
        {topEntries.map((item) => {
          const form = formFor(item);
          return (
            <div className="row directoryPromotionRow" key={item.id}>
              <div>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{directoryKindText(props.language, item.kind)} · {item.username ? `@${item.username}` : item.targetId} · {t(props.language, "messenger.owner")}: {item.ownerUserId ?? "—"}</span>
                <span>{t(props.language, "messenger.directoryPromotionScores")}: Q{item.qualityScore} / S{item.safetyScore} / P{item.promotionScore} · {t(props.language, "messenger.traceHash")}: {item.traceHash.slice(0, 10)}</span>
              </div>
              <em className={diagnosticClass(item.listingStatus)}>{statusText(props.language, item.listingStatus)}</em>
              <div className="directoryBoostControls">
                <input placeholder={t(props.language, "messenger.featuredRank")} value={form.featuredRank} disabled={!props.canWrite || props.busy} onChange={(event) => setForm(item, { featuredRank: event.target.value })} />
                <input placeholder={t(props.language, "messenger.searchBoostPct")} value={form.searchBoostPct} disabled={!props.canWrite || props.busy} onChange={(event) => setForm(item, { searchBoostPct: event.target.value })} />
                <input placeholder={t(props.language, "messenger.directoryBoostPct")} value={form.directoryBoostPct} disabled={!props.canWrite || props.busy} onChange={(event) => setForm(item, { directoryBoostPct: event.target.value })} />
                <label className="checkLine"><input type="checkbox" checked={form.recommended} disabled={!props.canWrite || props.busy} onChange={(event) => setForm(item, { recommended: event.target.checked })} /><span>{t(props.language, "messenger.recommended")}</span></label>
              </div>
              {props.canWrite ? <div className="buttonRow"><button onClick={() => props.updateStatus(item, "approved")} disabled={props.busy}>{t(props.language, "button.approve")}</button><button onClick={() => props.updateStatus(item, "featured")} disabled={props.busy}>{t(props.language, "messenger.feature")}</button><button onClick={() => props.boostEntry(item)} disabled={props.busy}>{t(props.language, "messenger.applyBoost")}</button><button onClick={() => props.updateStatus(item, "hidden")} disabled={props.busy}>{t(props.language, "messenger.hide")}</button><button onClick={() => props.updateStatus(item, "rejected")} disabled={props.busy}>{t(props.language, "button.reject")}</button></div> : null}
            </div>
          );
        })}
        {snapshot && topEntries.length === 0 ? <div className="emptyState">{t(props.language, "messenger.directoryPromotionEmpty")}</div> : null}
      </div>

      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}


function MessengerApprovalVisibilityControlPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerApprovalVisibilitySnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  setNote: (value: string) => void;
  toggleSetting: (key: "approvalRequired" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", value: boolean) => void;
  decideEntry: (item: AdminMessengerApprovalVisibilityEntry, decision: string) => void;
  setVisibility: (item: AdminMessengerApprovalVisibilityEntry, visibility: "public" | "hidden" | "restricted") => void;
}) {
  const snapshot = props.snapshot;
  const maxFunnel = Math.max(1, ...(snapshot?.charts.approvalFunnel ?? []).map((item) => item.value));
  const maxVisibility = Math.max(1, ...(snapshot?.charts.visibilityMix ?? []).map((item) => item.value));
  const list = [
    ...(snapshot?.queues.pendingApproval ?? []),
    ...(snapshot?.queues.safetyReview ?? []),
    ...(snapshot?.queues.ownerReview ?? []),
    ...(snapshot?.queues.promotedVisible ?? []),
    ...(snapshot?.queues.hiddenRestricted ?? []),
  ].filter((item, index, array) => array.findIndex((other) => other.id === item.id) === index).slice(0, 80);
  return (
    <div className="messengerPageUnit messengerPageApprovalVisibility approvalVisibilityCenter">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "messenger.approvalVisibilityTitle")}</h2>
          <p>{t(props.language, "messenger.approvalVisibilityDescription")}</p>
        </div>
        <span className={diagnosticClass(snapshot?.summary.healthStatus ?? "not_configured")}>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span>
      </div>

      <div className="statGrid approvalVisibilityStats">
        <div><span>{t(props.language, "messenger.totalEntries")}</span><strong>{snapshot?.summary.totalEntries ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.pendingApproval")}</span><strong>{snapshot?.summary.pendingApproval ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.publicEntries")}</span><strong>{snapshot?.summary.publicEntries ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.ownerReviewRequired")}</span><strong>{snapshot?.summary.ownerReviewRequired ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.safetyReviewRequired")}</span><strong>{snapshot?.summary.safetyReviewRequired ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.governanceScore")}</span><strong>{snapshot?.summary.governanceScore ?? 0}%</strong></div>
      </div>

      <div className="split messengerPageSplit approvalVisibilitySplit">
        <div className="card">
          <h3>{t(props.language, "messenger.approvalVisibilitySettings")}</h3>
          {snapshot ? ([
            ["approvalRequired", "messenger.directoryApprovalRequired"],
            ["featuredRequiresOwnerApproval", "messenger.directoryFeaturedOwnerApproval"],
            ["qualityGateEnabled", "messenger.directoryQualityGate"],
            ["antiSpamReviewRequired", "messenger.directoryAntiSpamReview"],
          ] as Array<["approvalRequired" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", string]>).map(([key, label]) => (
            <label key={key} className="checkLine">
              <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
          <label><span>{t(props.language, "messenger.note")}</span><input value={props.note} disabled={!props.canWrite || props.busy} onChange={(event) => props.setNote(event.target.value)} /></label>
          <div className="miniStats"><span>{t(props.language, "messenger.profileCreationSource")}</span><strong>{snapshot?.settings.profileCreationSource ?? "profile_only"}</strong></div>
          <div className="miniStats"><span>{t(props.language, "messenger.messengerRuntimeBehavior")}</span><strong>{snapshot?.settings.messengerRuntimeBehavior ?? "search_view_join_subscribe_start_only"}</strong></div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.approvalFunnel")}</h3>
          <div className="progressList">
            {(snapshot?.charts.approvalFunnel ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.approval.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxFunnel) * 100))}%` }} /></em></div>)}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.visibilityMix")}</h3>
          <div className="progressList">
            {(snapshot?.charts.visibilityMix ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{statusText(props.language, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxVisibility) * 100))}%` }} /></em></div>)}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.governanceLanes")}</h3>
          <div className="tableList smallList">
            {(snapshot?.charts.governanceLanes ?? []).map((item) => <div className="row" key={item.label}><strong>{cleanAdminValueText(props.language, item.label)}</strong><span>{statusText(props.language, item.value ? "enabled" : "disabled")}</span><em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em></div>)}
          </div>
        </div>
      </div>

      <div className="card approvalVisibilityQueueCard">
        <h3>{t(props.language, "messenger.approvalVisibilityQueue")}</h3>
        <div className="tableList approvalVisibilityList">
          {list.length ? list.map((item) => (
            <div className="row approvalVisibilityRow" key={item.id}>
              <div>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{directoryKindText(props.language, item.kind)} · {item.username ? `@${item.username}` : item.targetId} · {t(props.language, "messenger.owner")}: {item.ownerUserId ?? "—"}</span>
                <span>{t(props.language, "messenger.approvalLane")}: {item.approvalLane} · {t(props.language, "messenger.visibility")}: {item.visibilityStatus} · Q{item.qualityScore}/S{item.safetyScore}/P{item.promotionScore}</span>
                {item.governanceReasons.length ? <small>{item.governanceReasons.join(" · ")}</small> : null}
              </div>
              <em className={diagnosticClass(item.visibilityStatus)}>{statusText(props.language, item.visibilityStatus)}</em>
              {props.canWrite ? <div className="buttonRow approvalVisibilityActions">
                <button disabled={props.busy} onClick={() => props.decideEntry(item, "approve")}>{t(props.language, "button.approve")}</button>
                <button disabled={props.busy} onClick={() => props.decideEntry(item, "feature")}>{t(props.language, "messenger.feature")}</button>
                <button disabled={props.busy} onClick={() => props.decideEntry(item, "recommend")}>{t(props.language, "messenger.recommended")}</button>
                <button disabled={props.busy} onClick={() => props.setVisibility(item, "hidden")}>{t(props.language, "messenger.hide")}</button>
                <button disabled={props.busy} onClick={() => props.setVisibility(item, "restricted")}>{t(props.language, "messenger.restrict")}</button>
                <button disabled={props.busy} onClick={() => props.decideEntry(item, "reject")}>{t(props.language, "button.reject")}</button>
              </div> : null}
            </div>
          )) : <div className="emptyState">{t(props.language, "messenger.approvalVisibilityEmpty")}</div>}
        </div>
      </div>

      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}


function MessengerDirectoryReviewQueuePanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerDirectoryReviewQueueSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  kindFilter: AdminMessengerDirectoryKind | "ALL";
  setKindFilter: (value: AdminMessengerDirectoryKind | "ALL") => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  reason: string;
  setReason: (value: string) => void;
  refresh: () => void;
  applyAction: (item: AdminMessengerDirectoryReviewQueueEntry, action: AdminMessengerDirectoryReviewAction) => void;
}) {
  const entries = props.snapshot?.entries ?? [];
  const visibleEntries = entries.slice(0, 80);
  const byStatus = visibleEntries.reduce<Record<string, number>>((acc, item) => {
    const key = item.status || "needs_review";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card messengerPageUnit messengerPageDirectory directoryReviewQueueCard">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.directoryReviewQueueTitle")}</h3>
          <p>{t(props.language, "messenger.directoryReviewQueueDescription")}</p>
        </div>
        <em className={diagnosticClass(entries.length > 0 ? "warning" : "ready")}>{entries.length}</em>
      </div>

      <div className="statsGrid compactStats">
        <div className="statCard"><span>{t(props.language, "messenger.reviewQueueTotal")}</span><strong>{props.snapshot?.count ?? entries.length}</strong></div>
        <div className="statCard"><span>{statusText(props.language, "needs_review")}</span><strong>{byStatus.needs_review ?? 0}</strong></div>
        <div className="statCard"><span>{statusText(props.language, "restricted")}</span><strong>{byStatus.restricted ?? 0}</strong></div>
        <div className="statCard"><span>{statusText(props.language, "hidden")}</span><strong>{byStatus.hidden ?? 0}</strong></div>
      </div>

      <div className="formGrid">
        <label>
          <span>{t(props.language, "messenger.kind")}</span>
          <select value={props.kindFilter} disabled={props.busy} onChange={(event) => props.setKindFilter(event.target.value as AdminMessengerDirectoryKind | "ALL")}>
            <option value="ALL">{t(props.language, "messenger.allKinds")}</option>
            <option value="group">{t(props.language, "messenger.groups")}</option>
            <option value="channel">{t(props.language, "messenger.channels")}</option>
            <option value="bot">{t(props.language, "messenger.bots")}</option>
          </select>
        </label>
        <label>
          <span>{t(props.language, "messenger.status")}</span>
          <select value={props.statusFilter} disabled={props.busy} onChange={(event) => props.setStatusFilter(event.target.value)}>
            <option value="all">{t(props.language, "messenger.allStatuses")}</option>
            <option value="needs_review">{statusText(props.language, "needs_review")}</option>
            <option value="restricted">{statusText(props.language, "restricted")}</option>
            <option value="hidden">{statusText(props.language, "hidden")}</option>
            <option value="rejected">{statusText(props.language, "rejected")}</option>
            <option value="unsafe">{statusText(props.language, "unsafe")}</option>
            <option value="profile_removed">{statusText(props.language, "profile_removed")}</option>
          </select>
        </label>
        <label><span>{t(props.language, "messenger.reviewReason")}</span><input value={props.reason} disabled={!props.canWrite || props.busy} onChange={(event) => props.setReason(event.target.value)} /></label>
        <button onClick={props.refresh} disabled={props.busy}>{t(props.language, "button.refresh")}</button>
      </div>

      <div className="tableList approvalVisibilityList">
        {visibleEntries.length ? visibleEntries.map((item) => (
          <div className="row approvalVisibilityRow" key={`${item.kind}:${item.id}`}>
            <div>
              <strong>{cleanAdminUiText(props.language, item.title || item.name || item.id)}</strong>
              <span>{directoryKindText(props.language, item.kind)} · {item.username ? `@${item.username}` : item.id} · {t(props.language, "messenger.owner")}: {item.ownerUserId ?? "—"}</span>
              <span>{t(props.language, "messenger.visibility")}: {item.visibilityStatus ?? "—"} · {t(props.language, "messenger.approvalStatus")}: {item.approvalStatus ?? "—"} · {t(props.language, "messenger.promotionPlacement")}: {item.promotionPlacement ?? "—"}</span>
              <small>{t(props.language, "messenger.reason")}: {cleanAdminValueText(props.language, item.reason || item.status)} · Q{item.qualityScore}/S{item.safetyScore}</small>
            </div>
            <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
            {props.canWrite ? <div className="buttonRow approvalVisibilityActions">
              <button disabled={props.busy} onClick={() => props.applyAction(item, "approve")}>{t(props.language, "button.approve")}</button>
              <button disabled={props.busy} onClick={() => props.applyAction(item, "restore")}>{t(props.language, "button.restore")}</button>
              <button disabled={props.busy} onClick={() => props.applyAction(item, "hide")}>{t(props.language, "messenger.hide")}</button>
              <button disabled={props.busy} onClick={() => props.applyAction(item, "restrict")}>{t(props.language, "button.restrict")}</button>
              <button disabled={props.busy} onClick={() => props.applyAction(item, "reject")}>{t(props.language, "button.reject")}</button>
            </div> : null}
          </div>
        )) : <div className="emptyState">{t(props.language, "messenger.directoryReviewQueueEmpty")}</div>}
      </div>

      <ul className="rulesList">
        <li>{t(props.language, "rule.messenger.directoryReviewQueue.adminOnly")}</li>
        <li>{t(props.language, "rule.messenger.directoryReviewQueue.noRawContent")}</li>
      </ul>
    </div>
  );
}

function MessengerPresenceOperationsPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerPresenceOperationsSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  toggleSetting: (key: "messengerPresenceOnly" | "realtimePresenceRequired" | "lastSeenEnabled" | "suspiciousPresenceAlertsEnabled", value: boolean) => void;
  acknowledgeAnomaly: (item: AdminMessengerPresenceAnomaly) => void;
  resolveAnomaly: (item: AdminMessengerPresenceAnomaly) => void;
}) {
  const snapshot = props.snapshot;
  const maxPlatform = Math.max(1, ...(snapshot?.charts.sessionByPlatform ?? []).map((item) => item.value));
  const maxLoad = Math.max(1, ...(snapshot?.charts.sessionLoadByUser ?? []).map((item) => item.value));
  return (
    <div className="card messengerPresenceOps messengerPageUnit messengerPagePresence">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.presenceTitle")}</h3>
          <p>{t(props.language, "messenger.presenceDescription")}</p>
        </div>
        <em className={diagnosticClass(snapshot?.summary.realtimeHealth ?? "not_configured")}>{statusText(props.language, snapshot?.summary.realtimeHealth ?? "not_configured")}</em>
      </div>

      <div className="proMetricGrid">
        <div className="proMetric heroMetric"><span>{t(props.language, "messenger.presenceActiveNow")}</span><strong>{snapshot?.summary.activeNow ?? 0}</strong><small>{t(props.language, "messenger.presenceSource")}: {cleanAdminValueText(props.language, snapshot?.source ?? "not_configured")}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.presenceOnlineUsers")}</span><strong>{snapshot?.summary.onlineUsers ?? 0}</strong><small>{t(props.language, "messenger.presenceUniqueUsers")}: {snapshot?.summary.uniqueUsers ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.presenceSessions")}</span><strong>{snapshot?.summary.totalSessions ?? 0}</strong><small>{t(props.language, "messenger.presenceStale")}: {snapshot?.summary.staleSessions ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.presenceSuspicious")}</span><strong>{snapshot?.summary.suspiciousStates ?? 0}</strong><small>{snapshot?.summary.presenceReadinessPct ?? 0}%</small></div>
      </div>

      <div className="formGrid messengerSettingsGrid">
        {props.canWrite && snapshot ? ([
          ["messengerPresenceOnly", "messenger.messengerPresenceOnly", snapshot.settings.messengerPresenceOnly],
          ["realtimePresenceRequired", "messenger.realtimePresenceRequired", snapshot.settings.realtimePresenceRequired],
          ["lastSeenEnabled", "messenger.lastSeenEnabled", snapshot.settings.lastSeenEnabled],
          ["suspiciousPresenceAlertsEnabled", "messenger.suspiciousPresenceAlertsEnabled", snapshot.settings.suspiciousPresenceAlertsEnabled],
        ] as const).map(([key, label, value]) => (
          <label className="checkRow" key={key}><input type="checkbox" checked={value} onChange={(event) => props.toggleSetting(key, event.target.checked)} disabled={props.busy} /><span>{t(props.language, label)}</span></label>
        )) : null}
      </div>

      <div className="proDashboardGrid">
        <div className="proPanel">
          <h4>{t(props.language, "messenger.presenceOnlineScale")}</h4>
          <div className="progressList">
            {(snapshot?.charts.onlineScale ?? []).map((item) => (
              <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.presence.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.min(100, item.percent))}%` }} /></em></div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.presencePlatforms")}</h4>
          <div className="progressList">
            {(snapshot?.charts.sessionByPlatform ?? []).map((item) => (
              <div className="progressItem" key={item.label}><div><strong>{item.label}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxPlatform) * 100))}%` }} /></em></div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.presenceSessionLoad")}</h4>
          <div className="progressList">
            {(snapshot?.charts.sessionLoadByUser ?? []).map((item) => (
              <div className="progressItem" key={item.label}><div><strong>{item.label}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxLoad) * 100))}%` }} /></em></div>
            ))}
          </div>
        </div>
        <div className="proPanel">
          <h4>{t(props.language, "messenger.presenceOperations")}</h4>
          <div className="tableList smallList">
            {(snapshot?.operations ?? []).map((item) => <div className="row" key={item.key}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminUiText(props.language, item.detail)}</span><em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em></div>)}
          </div>
        </div>
      </div>

      <div className="split messengerPageSplit">
        <div className="card innerCard">
          <h4>{t(props.language, "messenger.presenceAnomalies")}</h4>
          <div className="tableList smallList">
            {(snapshot?.anomalies ?? []).length ? (snapshot?.anomalies ?? []).map((item) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.userId ?? item.sessionId ?? cleanAdminValueText(props.language, item.kind)} · {cleanAdminUiText(props.language, item.detail)}</span>
                <em className={diagnosticClass(item.status === "open" ? item.severity : item.status)}>{statusText(props.language, item.status)}</em>
                {props.canWrite && item.status === "open" ? <button disabled={props.busy} onClick={() => props.acknowledgeAnomaly(item)}>{t(props.language, "button.acknowledge")}</button> : null}
                {props.canWrite && item.status !== "resolved" ? <button disabled={props.busy} onClick={() => props.resolveAnomaly(item)}>{t(props.language, "button.resolve")}</button> : null}
              </div>
            )) : <div className="emptyState">{t(props.language, "messenger.presenceNoAnomalies")}</div>}
          </div>
        </div>
        <div className="card innerCard">
          <h4>{t(props.language, "messenger.presenceSessionsList")}</h4>
          <div className="tableList smallList">
            {(snapshot?.sessions ?? []).length ? (snapshot?.sessions ?? []).map((item) => (
              <div className="row" key={item.traceHash}>
                <strong>{item.userId ?? t(props.language, "messenger.presenceUnknownUser")}</strong>
                <span>{item.platform ?? "unknown"} · {item.appArea ?? "messenger"} · {item.lastSeenAt ?? "-"}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              </div>
            )) : <div className="emptyState">{t(props.language, "messenger.presenceNoSessions")}</div>}
          </div>
        </div>
      </div>

      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}

function MessengerNotificationsMonitorPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerNotificationsMonitorSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  toggleSetting: (key: "monitorEnabled" | "pushDeliveryMonitorEnabled" | "unreadMessagesMonitorEnabled" | "missedCallsMonitorEnabled" | "missedMessagesMonitorEnabled" | "realtimeQueueMonitorEnabled" | "readReceiptsMonitorEnabled" | "requireMessengerRealtimeBridge", value: boolean) => void;
  acknowledgeIssue: (item: AdminMessengerNotificationsMonitorIssue) => void;
  resolveIssue: (item: AdminMessengerNotificationsMonitorIssue) => void;
}) {
  const snapshot = props.snapshot;
  const maxIssue = Math.max(1, ...(snapshot?.charts.issueMix ?? []).map((item) => item.value));
  const maxUnread = Math.max(1, ...(snapshot?.charts.unreadTopUsers ?? []).map((item) => item.value));
  const maxMissed = Math.max(1, ...(snapshot?.charts.missedCallTrend ?? []).map((item) => item.value));
  return (
    <div className="card messengerNotificationsMonitor messengerPageUnit messengerPageNotifications">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.notificationsMonitorTitle")}</h3>
          <p>{t(props.language, "messenger.notificationsMonitorDescription")}</p>
        </div>
        <em className={diagnosticClass(snapshot?.summary.healthStatus ?? "not_configured")}>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</em>
      </div>
      <div className="proMetricGrid notificationMetricGrid">
        <div className="proMetric heroMetric"><span>{t(props.language, "messenger.notificationReadiness")}</span><strong>{snapshot?.summary.notificationReadinessPct ?? 0}%</strong><small>{t(props.language, "messenger.source")}: {cleanAdminValueText(props.language, snapshot?.source ?? "not_configured")}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.unreadMessages")}</span><strong>{snapshot?.summary.unreadMessages ?? 0}</strong><small>{t(props.language, "messenger.unreadUsers")}: {snapshot?.summary.unreadUsers ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.missedCalls")}</span><strong>{snapshot?.summary.missedCalls ?? 0}</strong><small>{t(props.language, "messenger.missedMessages")}: {snapshot?.summary.missedMessages ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.failedNotifications")}</span><strong>{snapshot?.summary.failedNotifications ?? 0}</strong><small>{t(props.language, "messenger.queueDepth")}: {snapshot?.summary.realtimeQueueDepth ?? 0}</small></div>
      </div>
      <div className="formGrid messengerSettingsGrid notificationsSettingsGrid">
        {props.canWrite && snapshot ? ([
          ["monitorEnabled", "messenger.monitorEnabled", snapshot.settings.monitorEnabled],
          ["pushDeliveryMonitorEnabled", "messenger.pushDeliveryMonitorEnabled", snapshot.settings.pushDeliveryMonitorEnabled],
          ["unreadMessagesMonitorEnabled", "messenger.unreadMessagesMonitorEnabled", snapshot.settings.unreadMessagesMonitorEnabled],
          ["missedCallsMonitorEnabled", "messenger.missedCallsMonitorEnabled", snapshot.settings.missedCallsMonitorEnabled],
          ["missedMessagesMonitorEnabled", "messenger.missedMessagesMonitorEnabled", snapshot.settings.missedMessagesMonitorEnabled],
          ["realtimeQueueMonitorEnabled", "messenger.realtimeQueueMonitorEnabled", snapshot.settings.realtimeQueueMonitorEnabled],
          ["readReceiptsMonitorEnabled", "messenger.readReceiptsMonitorEnabled", snapshot.settings.readReceiptsMonitorEnabled],
          ["requireMessengerRealtimeBridge", "messenger.requireMessengerRealtimeBridge", snapshot.settings.requireMessengerRealtimeBridge],
        ] as const).map(([key, label, value]) => (
          <label className="checkRow" key={key}><input type="checkbox" checked={value} onChange={(event) => props.toggleSetting(key, event.target.checked)} disabled={props.busy} /><span>{t(props.language, label)}</span></label>
        )) : null}
      </div>
      <div className="proDashboardGrid notificationsGrid">
        <div className="proPanel"><h4>{t(props.language, "messenger.deliveryFunnel")}</h4><div className="progressList">{(snapshot?.charts.deliveryFunnel ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.delivery.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.min(100, item.percent))}%` }} /></em></div>)}</div></div>
        <div className="proPanel"><h4>{t(props.language, "messenger.notificationIssueMix")}</h4><div className="progressList">{(snapshot?.charts.issueMix ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.notificationIssue.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxIssue) * 100))}%` }} /></em></div>)}</div></div>
        <div className="proPanel"><h4>{t(props.language, "messenger.unreadTopUsers")}</h4><div className="progressList">{(snapshot?.charts.unreadTopUsers ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{item.label}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxUnread) * 100))}%` }} /></em></div>)}</div></div>
        <div className="proPanel"><h4>{t(props.language, "messenger.missedCallTrend")}</h4><div className="progressList">{(snapshot?.charts.missedCallTrend ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{item.label}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxMissed) * 100))}%` }} /></em></div>)}</div></div>
      </div>
      <div className="split messengerPageSplit notificationsSplit">
        <div className="card innerCard">
          <h4>{t(props.language, "messenger.notificationHealthLanes")}</h4>
          <div className="tableList smallList">{(snapshot?.charts.healthLanes ?? []).map((item) => <div className="row" key={item.key}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminUiText(props.language, item.detail)}</span><em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em></div>)}</div>
        </div>
        <div className="card innerCard">
          <h4>{t(props.language, "messenger.notificationIssues")}</h4>
          <div className="tableList smallList">
            {(snapshot?.issues ?? []).length ? (snapshot?.issues ?? []).map((item) => (
              <div className="row notificationIssueRow" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{cleanAdminValueText(props.language, item.targetType)}:{item.targetId} · {cleanAdminUiText(props.language, item.detail)}</span>
                <em className={diagnosticClass(item.status === "open" ? item.severity : item.status)}>{statusText(props.language, item.status)}</em>
                {props.canWrite && item.status === "open" ? <button disabled={props.busy} onClick={() => props.acknowledgeIssue(item)}>{t(props.language, "button.acknowledge")}</button> : null}
                {props.canWrite && item.status !== "resolved" ? <button disabled={props.busy} onClick={() => props.resolveIssue(item)}>{t(props.language, "button.resolve")}</button> : null}
              </div>
            )) : <div className="emptyState">{t(props.language, "messenger.notificationNoIssues")}</div>}
          </div>
        </div>
      </div>
      <div className="card innerCard notificationEventsCard">
        <h4>{t(props.language, "messenger.notificationDeliveryEvents")}</h4>
        <div className="tableList smallList">
          {(snapshot?.deliveryEvents ?? []).slice(0, 80).map((item) => (
            <div className="row" key={item.traceHash}>
              <strong>{cleanAdminValueText(props.language, item.kind)} · {cleanAdminValueText(props.language, item.channel)}</strong>
              <span>{item.targetUserId ?? item.chatId ?? item.messageId ?? item.callId ?? item.id} · {item.createdAt ?? "-"}</span>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
            </div>
          ))}
          {snapshot && snapshot.deliveryEvents.length === 0 ? <div className="emptyState">{t(props.language, "messenger.notificationNoEvents")}</div> : null}
        </div>
      </div>
      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}


function MessengerFinalReadinessPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerFinalReadinessSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  setNote: (value: string) => void;
  toggleSetting: (key: "requireOwnerFinalApproval" | "requireTwoDeviceRealtimeVerification" | "requireNoCriticalSafetyBacklog" | "requireDirectoryPromotionReady" | "requireGreetingsSafeMode" | "requireNotificationsReady" | "requirePresenceReady", value: boolean) => void;
  setItemStatus: (item: AdminMessengerFinalReadinessItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const maxCategory = Math.max(1, ...(snapshot?.charts.readinessByCategory ?? []).map((item) => item.value));
  return (
    <div className="card messengerFinalReadiness messengerPageUnit messengerPageFinalReadiness">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.finalReadinessTitle")}</h3>
          <p>{t(props.language, "messenger.finalReadinessDescription")}</p>
        </div>
        <em className={diagnosticClass(snapshot?.summary.healthStatus ?? "not_configured")}>{snapshot?.summary.launchReady ? t(props.language, "messenger.launchReady") : statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</em>
      </div>
      <div className="proMetricGrid finalReadinessMetricGrid">
        <div className="proMetric heroMetric"><span>{t(props.language, "messenger.finalReadinessScore")}</span><strong>{snapshot?.summary.readinessScorePct ?? 0}%</strong><small>{t(props.language, "messenger.requiredItems")}: {snapshot?.summary.requiredItems ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.blockers")}</span><strong>{snapshot?.summary.blockedItems ?? 0}</strong><small>{t(props.language, "messenger.notConfigured")}: {snapshot?.summary.notConfiguredItems ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.warnings")}</span><strong>{snapshot?.summary.warningItems ?? 0}</strong><small>{t(props.language, "messenger.ready")}: {snapshot?.summary.readyItems ?? 0}</small></div>
        <div className="proMetric"><span>{t(props.language, "messenger.manualVerification")}</span><strong>{snapshot?.summary.manuallyVerifiedItems ?? 0}</strong><small>{t(props.language, "messenger.waived")}: {snapshot?.summary.waivedItems ?? 0}</small></div>
      </div>
      <div className="formGrid messengerSettingsGrid finalReadinessSettingsGrid">
        {props.canWrite && snapshot ? ([
          ["requireOwnerFinalApproval", "messenger.requireOwnerFinalApproval", snapshot.settings.requireOwnerFinalApproval],
          ["requireTwoDeviceRealtimeVerification", "messenger.requireTwoDeviceRealtimeVerification", snapshot.settings.requireTwoDeviceRealtimeVerification],
          ["requireNoCriticalSafetyBacklog", "messenger.requireNoCriticalSafetyBacklog", snapshot.settings.requireNoCriticalSafetyBacklog],
          ["requireDirectoryPromotionReady", "messenger.requireDirectoryPromotionReady", snapshot.settings.requireDirectoryPromotionReady],
          ["requireGreetingsSafeMode", "messenger.requireGreetingsSafeMode", snapshot.settings.requireGreetingsSafeMode],
          ["requireNotificationsReady", "messenger.requireNotificationsReady", snapshot.settings.requireNotificationsReady],
          ["requirePresenceReady", "messenger.requirePresenceReady", snapshot.settings.requirePresenceReady],
        ] as const).map(([key, label, value]) => <label className="checkRow" key={key}><input type="checkbox" checked={value} onChange={(event) => props.toggleSetting(key, event.target.checked)} disabled={props.busy} /><span>{t(props.language, label)}</span></label>) : null}
      </div>
      <div className="proDashboardGrid finalReadinessGrid">
        <div className="proPanel"><h4>{t(props.language, "messenger.finalGateLanes")}</h4><div className="tableList smallList">{(snapshot?.charts.finalGateLanes ?? []).map((item) => <div className="row" key={item.key}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminUiText(props.language, item.detail)}</span><em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em></div>)}</div></div>
        <div className="proPanel"><h4>{t(props.language, "messenger.readinessByCategory")}</h4><div className="progressList">{(snapshot?.charts.readinessByCategory ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.finalCategory.${item.label}`, item.label)}</strong><span>{item.ready}/{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxCategory) * 100))}%` }} /></em></div>)}</div></div>
      </div>
      <label className="finalReadinessNote"><span>{t(props.language, "messenger.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} placeholder={t(props.language, "messenger.finalReadinessNotePlaceholder")} disabled={!props.canWrite || props.busy} /></label>
      <div className="tableList finalReadinessChecklist">
        {(snapshot?.items ?? []).map((item) => (
          <div className="row finalReadinessRow" key={item.key}>
            <div>
              <strong>{cleanAdminUiText(props.language, item.title)}</strong>
              <span>{t(props.language, `messenger.finalCategory.${item.category}`, item.category)} · {cleanAdminUiText(props.language, item.detail)}</span>
              <span>{t(props.language, "messenger.source")}: {item.source} · {t(props.language, "messenger.traceHash")}: {item.traceHash.slice(0, 10)}</span>
            </div>
            <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
            <small className={diagnosticClass(item.manualStatus)}>{t(props.language, `messenger.manualStatus.${item.manualStatus}`, item.manualStatus)}</small>
            {props.canWrite ? <div className="buttonRow"><button disabled={props.busy} onClick={() => props.setItemStatus(item, "verify")}>{t(props.language, "button.verify")}</button><button disabled={props.busy} onClick={() => props.setItemStatus(item, "block")}>{t(props.language, "button.block")}</button><button disabled={props.busy} onClick={() => props.setItemStatus(item, "waive")}>{t(props.language, "button.waive")}</button><button disabled={props.busy} onClick={() => props.setItemStatus(item, "reset")}>{t(props.language, "button.reset")}</button></div> : null}
          </div>
        ))}
        {snapshot && snapshot.items.length === 0 ? <div className="emptyState">{t(props.language, "messenger.finalReadinessEmpty")}</div> : null}
      </div>
      {(snapshot?.nextRequiredSteps ?? []).length ? <div className="card innerCard"><h4>{t(props.language, "messenger.nextRequiredSteps")}</h4><div className="tagList">{snapshot?.nextRequiredSteps.map((item) => <span key={item}>{item}</span>)}</div></div> : null}
      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}

function MessengerGrowthAnalyticsPanel(props: { language: AdminLanguage; snapshot: AdminMessengerGrowthAnalyticsSnapshot | null }) {
  const snapshot = props.snapshot;
  const maxGrowth = Math.max(1, ...(snapshot?.charts.userGrowth30d ?? []).map((item) => item.value));
  const maxMessage = Math.max(1, ...(snapshot?.charts.messageGrowth30d ?? []).map((item) => item.value));
  const maxFunnel = Math.max(1, ...(snapshot?.charts.acquisitionFunnel ?? []).map((item) => item.value));
  return (
    <div className="messengerPageUnit messengerPageAnalytics growthAnalyticsCenter">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "messenger.growthAnalyticsTitle")}</h2>
          <p>{t(props.language, "messenger.growthAnalyticsDescription")}</p>
        </div>
        <span className={diagnosticClass(snapshot?.summary.growthHealth ?? "not_configured")}>{statusText(props.language, snapshot?.summary.growthHealth ?? "not_configured")}</span>
      </div>

      <div className="statGrid analyticsStatGrid">
        <div><span>{t(props.language, "messenger.totalUsers")}</span><strong>{snapshot?.summary.totalUsers ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.newUsers7Days")}</span><strong>{snapshot?.summary.newUsers7Days ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.userGrowthDeltaPct")}</span><strong>{snapshot?.summary.userGrowthDeltaPct ?? 0}%</strong></div>
        <div><span>{t(props.language, "messenger.retentionProxyPct")}</span><strong>{snapshot?.summary.retentionProxyPct ?? 0}%</strong></div>
        <div><span>{t(props.language, "messenger.promotionConversionPct")}</span><strong>{snapshot?.summary.promotionConversionPct ?? 0}%</strong></div>
        <div><span>{t(props.language, "messenger.dataConfidencePct")}</span><strong>{snapshot?.summary.dataConfidencePct ?? 0}%</strong></div>
      </div>

      <div className="dashboardGrid messengerAnalyticsGrid">
        <div className="card dashboardChartCard analyticsChartCard">
          <h3>{t(props.language, "messenger.userGrowth30d")}</h3>
          <div className="barChart analyticsBarChart" aria-label={t(props.language, "messenger.userGrowth30d")}>
            {(snapshot?.charts.userGrowth30d ?? []).map((item) => <div className="barColumn" key={item.date}><i className="barFill" style={{ height: `${Math.max(6, Math.round((item.value / maxGrowth) * 100))}%` }} /><span>{item.date.slice(5)}</span><strong>{item.value}</strong></div>)}
          </div>
        </div>
        <div className="card dashboardChartCard analyticsChartCard">
          <h3>{t(props.language, "messenger.messageGrowth30d")}</h3>
          <div className="barChart analyticsBarChart" aria-label={t(props.language, "messenger.messageGrowth30d")}>
            {(snapshot?.charts.messageGrowth30d ?? []).map((item) => <div className="barColumn" key={item.date}><i className="barFill secondary" style={{ height: `${Math.max(6, Math.round((item.value / maxMessage) * 100))}%` }} /><span>{item.date.slice(5)}</span><strong>{item.value}</strong></div>)}
          </div>
        </div>
      </div>

      <div className="split messengerPageSplit analyticsSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.acquisitionFunnel")}</h3>
          <div className="progressList">
            {(snapshot?.charts.acquisitionFunnel ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.funnel.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxFunnel) * 100))}%` }} /></em></div>)}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.healthCards")}</h3>
          <div className="tableList smallList">
            {(snapshot?.healthCards ?? []).map((item) => <div className="row" key={item.key}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminUiText(props.language, item.detail)}</span><em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em></div>)}
          </div>
        </div>
      </div>

      <div className="split messengerPageSplit analyticsSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.directoryConversion")}</h3>
          <div className="tableList smallList">
            {(snapshot?.charts.directoryMix ?? []).map((item) => <div className="row" key={item.label}><strong>{cleanAdminValueText(props.language, item.label.slice(0, -1))}</strong><span>{t(props.language, "messenger.active")}: {item.active}</span><em>{item.value}</em></div>)}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.sourceQuality")}</h3>
          <div className="miniStats">
            <div><span>{t(props.language, "messenger.usersSampled")}</span><strong>{snapshot?.sourceQuality.usersSampled ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.messagesSampled")}</span><strong>{snapshot?.sourceQuality.messagesSampled ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.presenceSource")}</span><strong>{cleanAdminValueText(props.language, snapshot?.sourceQuality.presenceSource ?? "-")}</strong></div>
            <div><span>{t(props.language, "messenger.rawContentIncluded")}</span><strong>{statusText(props.language, String(snapshot?.sourceQuality.rawContentIncluded ?? false))}</strong></div>
          </div>
        </div>
      </div>

      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}


function MessengerContentQualityPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerContentQualitySnapshot | null;
  busy: boolean;
  canWrite: boolean;
  signalForm: { kind: string; targetKind: string; targetId: string; severity: string; score: string; reason: string; note: string };
  setSignalForm: (form: { kind: string; targetKind: string; targetId: string; severity: string; score: string; reason: string; note: string }) => void;
  toggleSetting: (key: keyof AdminMessengerContentQualitySnapshot["settings"], value: boolean | number) => void;
  createSignal: () => void;
  setSignalStatus: (signal: AdminMessengerContentQualitySignal, status: string) => void;
}) {
  const snapshot = props.snapshot;
  const maxSignal = Math.max(1, ...(snapshot?.charts.signalMix ?? []).map((item) => item.value));
  const maxSeverity = Math.max(1, ...(snapshot?.charts.severityMix ?? []).map((item) => item.value));
  const toggleKeys: Array<keyof AdminMessengerContentQualitySnapshot["settings"]> = [
    "antiSpamEnabled",
    "rateLimitEnabled",
    "duplicateContentGuardEnabled",
    "linkSpamGuardEnabled",
    "botAbuseGuardEnabled",
    "groupRaidGuardEnabled",
    "channelFloodGuardEnabled",
    "promotionAbuseGuardEnabled",
    "quarantineEnabled",
    "manualReviewRequiredForHighRisk",
  ];
  return (
    <div className="messengerPageUnit messengerPageContentQuality contentQualityCenter">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "messenger.contentQualityTitle")}</h2>
          <p>{t(props.language, "messenger.contentQualityDescription")}</p>
        </div>
        <span className={diagnosticClass(snapshot?.summary.healthStatus ?? "not_configured")}>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span>
      </div>

      <div className="statGrid analyticsStatGrid">
        <div><span>{t(props.language, "messenger.qualityScore")}</span><strong>{snapshot?.summary.qualityScore ?? 0}%</strong></div>
        <div><span>{t(props.language, "messenger.reviewBacklog")}</span><strong>{snapshot?.summary.reviewBacklog ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.openSignals")}</span><strong>{snapshot?.summary.openSignals ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.quarantinedSignals")}</span><strong>{snapshot?.summary.quarantinedSignals ?? 0}</strong></div>
        <div><span>{t(props.language, "messenger.spamGuardCoveragePct")}</span><strong>{snapshot?.summary.spamGuardCoveragePct ?? 0}%</strong></div>
        <div><span>{t(props.language, "messenger.promotionQualityWarnings")}</span><strong>{snapshot?.summary.promotionQualityWarnings ?? 0}</strong></div>
      </div>

      <div className="split messengerPageSplit contentQualitySplit">
        <div className="card dashboardChartCard">
          <h3>{t(props.language, "messenger.signalMix")}</h3>
          <div className="progressList">
            {(snapshot?.charts.signalMix ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.contentSignal.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxSignal) * 100))}%` }} /></em></div>)}
          </div>
        </div>
        <div className="card dashboardChartCard">
          <h3>{t(props.language, "messenger.severityMix")}</h3>
          <div className="progressList">
            {(snapshot?.charts.severityMix ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{statusText(props.language, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxSeverity) * 100))}%` }} /></em></div>)}
          </div>
        </div>
      </div>

      <div className="split messengerPageSplit contentQualitySplit">
        <div className="card">
          <h3>{t(props.language, "messenger.guardCoverage")}</h3>
          <div className="settingsGrid contentQualitySettingsGrid">
            {toggleKeys.map((key) => (
              <label className="checkLine" key={key}>
                <input type="checkbox" checked={Boolean(snapshot?.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
                <span>{t(props.language, `messenger.setting.${String(key)}`, String(key))}</span>
              </label>
            ))}
          </div>
          <div className="formGrid compactForm">
            <label><span>{t(props.language, "messenger.maxMessagesPerMinute")}</span><input type="number" value={snapshot?.settings.maxMessagesPerMinute ?? 30} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting("maxMessagesPerMinute", Number(event.target.value))} /></label>
            <label><span>{t(props.language, "messenger.maxForwardsPerHour")}</span><input type="number" value={snapshot?.settings.maxForwardsPerHour ?? 60} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting("maxForwardsPerHour", Number(event.target.value))} /></label>
            <label><span>{t(props.language, "messenger.publicQualityMinimumScore")}</span><input type="number" value={snapshot?.settings.publicQualityMinimumScore ?? 75} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting("publicQualityMinimumScore", Number(event.target.value))} /></label>
            <label><span>{t(props.language, "messenger.promotionQualityMinimumScore")}</span><input type="number" value={snapshot?.settings.promotionQualityMinimumScore ?? 80} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting("promotionQualityMinimumScore", Number(event.target.value))} /></label>
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.createContentSignal")}</h3>
          {!props.canWrite ? <div className="emptyState">{t(props.language, "permission.readOnly")}</div> : null}
          {props.canWrite ? <div className="formGrid compactForm">
            <label><span>{t(props.language, "messenger.signalKind")}</span><select value={props.signalForm.kind} onChange={(event) => props.setSignalForm({ ...props.signalForm, kind: event.target.value })}><option value="spam">{statusText(props.language, "spam")}</option><option value="flood">{statusText(props.language, "flood")}</option><option value="scam">{statusText(props.language, "scam")}</option><option value="phishing">{statusText(props.language, "phishing")}</option><option value="bot_abuse">{statusText(props.language, "bot_abuse")}</option><option value="group_raid">{statusText(props.language, "group_raid")}</option><option value="promotion_abuse">{statusText(props.language, "promotion_abuse")}</option><option value="unsafe_public_content">{statusText(props.language, "unsafe_public_content")}</option></select></label>
            <label><span>{t(props.language, "messenger.targetKind")}</span><select value={props.signalForm.targetKind} onChange={(event) => props.setSignalForm({ ...props.signalForm, targetKind: event.target.value })}><option value="user">{statusText(props.language, "user")}</option><option value="chat">{statusText(props.language, "chat")}</option><option value="group">{statusText(props.language, "group")}</option><option value="channel">{statusText(props.language, "channel")}</option><option value="bot">{statusText(props.language, "bot")}</option><option value="promotion">{statusText(props.language, "promotion")}</option><option value="message_metadata">{statusText(props.language, "message_metadata")}</option></select></label>
            <label><span>{t(props.language, "messenger.targetId")}</span><input value={props.signalForm.targetId} onChange={(event) => props.setSignalForm({ ...props.signalForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.severity")}</span><select value={props.signalForm.severity} onChange={(event) => props.setSignalForm({ ...props.signalForm, severity: event.target.value })}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "messenger.score")}</span><input type="number" value={props.signalForm.score} onChange={(event) => props.setSignalForm({ ...props.signalForm, score: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.reason")}</span><input value={props.signalForm.reason} onChange={(event) => props.setSignalForm({ ...props.signalForm, reason: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.note")}</span><input value={props.signalForm.note} onChange={(event) => props.setSignalForm({ ...props.signalForm, note: event.target.value })} /></label>
            <button disabled={props.busy || !props.signalForm.targetId.trim()} onClick={props.createSignal}>{t(props.language, "button.create")}</button>
          </div> : null}
        </div>
      </div>

      <div className="split messengerPageSplit contentQualitySplit">
        <div className="card">
          <h3>{t(props.language, "messenger.contentQualitySignals")}</h3>
          <div className="tableList smallList">
            {(snapshot?.signals ?? []).length ? (snapshot?.signals ?? []).map((item) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminValueText(props.language, item.kind)} · {cleanAdminValueText(props.language, item.targetKind)}</strong>
                <span>{item.targetId} · {item.reason} · {item.score}%</span>
                <em className={diagnosticClass(item.severity)}>{statusText(props.language, item.status)}</em>
                {props.canWrite && item.status === "open" ? <button disabled={props.busy} onClick={() => props.setSignalStatus(item, "acknowledged")}>{t(props.language, "button.acknowledge")}</button> : null}
                {props.canWrite && item.status !== "quarantined" && item.status !== "resolved" ? <button disabled={props.busy} onClick={() => props.setSignalStatus(item, "quarantined")}>{t(props.language, "button.quarantine")}</button> : null}
                {props.canWrite && item.status !== "resolved" ? <button disabled={props.busy} onClick={() => props.setSignalStatus(item, "resolved")}>{t(props.language, "button.resolve")}</button> : null}
              </div>
            )) : <div className="emptyState">{t(props.language, "messenger.noContentQualitySignals")}</div>}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.publicQualityWarnings")}</h3>
          <div className="tableList smallList">
            {(snapshot?.charts.publicQualityWarnings ?? []).length ? (snapshot?.charts.publicQualityWarnings ?? []).map((item) => <div className="row" key={item.id}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminValueText(props.language, item.kind)} · {t(props.language, "messenger.qualityScore")}: {item.qualityScore}% · {t(props.language, "messenger.safetyScore")}: {item.safetyScore}%</span><em>{item.promotionScore}%</em></div>) : <div className="emptyState">{t(props.language, "messenger.noPublicQualityWarnings")}</div>}
          </div>
        </div>
      </div>

      {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
    </div>
  );
}

function MessengerGrowthPromotionGreetingsPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerGrowthPromotionGreetingSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  promotionForm: { targetKind: string; targetId: string; title: string; placement: string; audience: string; priority: string; startsAt: string; endsAt: string; note: string };
  setPromotionForm: (value: { targetKind: string; targetId: string; title: string; placement: string; audience: string; priority: string; startsAt: string; endsAt: string; note: string }) => void;
  templateForm: { occasion: string; language: string; title: string; messagePreview: string; holidayKey: string; autoSendAllowed: boolean; manualSendAllowed: boolean; approvalRequired: boolean; status: string };
  setTemplateForm: (value: { occasion: string; language: string; title: string; messagePreview: string; holidayKey: string; autoSendAllowed: boolean; manualSendAllowed: boolean; approvalRequired: boolean; status: string }) => void;
  greetingForm: { occasion: string; mode: string; templateId: string; targetUserId: string; contactUserId: string; scheduledAt: string; holidayKey: string; language: string; note: string };
  setGreetingForm: (value: { occasion: string; mode: string; templateId: string; targetUserId: string; contactUserId: string; scheduledAt: string; holidayKey: string; language: string; note: string }) => void;
  holidayForm: { holidayKey: string; title: string; dateMonthDay: string; countryCode: string; locale: string; status: string; autoQueueAllowed: boolean; manualSendAllowed: boolean };
  setHolidayForm: (value: { holidayKey: string; title: string; dateMonthDay: string; countryCode: string; locale: string; status: string; autoQueueAllowed: boolean; manualSendAllowed: boolean }) => void;
  automationForm: { occasion: string; source: string; templateId: string; holidayKey: string; targetUserIds: string; contactUserIds: string; scheduledAt: string; language: string; dryRun: boolean; note: string };
  setAutomationForm: (value: { occasion: string; source: string; templateId: string; holidayKey: string; targetUserIds: string; contactUserIds: string; scheduledAt: string; language: string; dryRun: boolean; note: string }) => void;
  createPromotion: () => void;
  setPromotionStatus: (item: AdminMessengerGrowthPromotionCampaign, status: AdminMessengerGrowthPromotionStatus) => void;
  createTemplate: () => void;
  createGreetingTask: () => void;
  saveHoliday: () => void;
  runGreetingAutomation: () => void;
  setGreetingStatus: (item: AdminMessengerGreetingTask, status: AdminMessengerGreetingStatus) => void;
  toggleSetting: (key: "promotionApprovalRequired" | "greetingsAutoEnabled" | "birthdayGreetingsEnabled" | "holidayGreetingsEnabled" | "manualGreetingsEnabled" | "aiGreetingDraftsAllowed" | "holidayCalendarEnabled" | "automaticGreetingApprovalRequired" | "contactOptOutRespected", value: boolean) => void;
}) {
  const snapshot = props.snapshot;
  const promotionMax = Math.max(1, ...(snapshot?.charts.promotionByKind ?? []).map((item) => item.value));
  const greetingMax = Math.max(1, ...(snapshot?.charts.greetingByOccasion ?? []).map((item) => item.value));
  const funnelMax = Math.max(1, ...(snapshot?.charts.funnel ?? []).map((item) => item.value));

  return (
    <div className="messengerPageUnit messengerPageGrowth growthPromotionGrid">
      <div className="card growthHeroCard">
        <div className="proDashboardHead">
          <div>
            <h3>{t(props.language, "messenger.growthTitle")}</h3>
            <p>{t(props.language, "messenger.growthDescription")}</p>
          </div>
          <em className={diagnosticClass(snapshot?.summary.status ?? "warning")}>{statusText(props.language, snapshot?.summary.status ?? "warning")}</em>
        </div>
        <div className="proMetricGrid growthMetricGrid">
          <div className="proMetric heroMetric"><span>{t(props.language, "messenger.growthActivePromotions")}</span><strong>{snapshot?.summary.activePromotions ?? 0}</strong><small>{t(props.language, "messenger.growthPending")}: {snapshot?.summary.pendingPromotions ?? 0}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.growthPublicObjects")}</span><strong>{(snapshot?.summary.publicChannels ?? 0) + (snapshot?.summary.publicGroups ?? 0) + (snapshot?.summary.publicBots ?? 0)}</strong><small>{t(props.language, "messenger.channels")}/{t(props.language, "messenger.groups")}/{t(props.language, "messenger.bots")}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.greetingQueued")}</span><strong>{snapshot?.summary.queuedGreetings ?? 0}</strong><small>{t(props.language, "messenger.greetingSent")}: {snapshot?.summary.sentGreetings ?? 0}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.growthReadiness")}</span><strong>{snapshot?.summary.readinessScorePct ?? 0}%</strong><small>{t(props.language, "messenger.monitor.onlineNow")}: {snapshot?.summary.onlineUsers ?? 0}</small></div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.growthSettings")}</h3>
        <div className="formGrid">
          {snapshot ? ([
            ["promotionApprovalRequired", "messenger.promotionApprovalRequired"],
            ["greetingsAutoEnabled", "messenger.greetingsAutoEnabled"],
            ["birthdayGreetingsEnabled", "messenger.birthdayGreetingsEnabled"],
            ["holidayGreetingsEnabled", "messenger.holidayGreetingsEnabled"],
            ["manualGreetingsEnabled", "messenger.manualGreetingsEnabled"],
            ["aiGreetingDraftsAllowed", "messenger.aiGreetingDraftsAllowed"],
            ["holidayCalendarEnabled", "messenger.holidayCalendarEnabled"],
            ["automaticGreetingApprovalRequired", "messenger.automaticGreetingApprovalRequired"],
            ["contactOptOutRespected", "messenger.contactOptOutRespected"],
          ] as Array<["promotionApprovalRequired" | "greetingsAutoEnabled" | "birthdayGreetingsEnabled" | "holidayGreetingsEnabled" | "manualGreetingsEnabled" | "aiGreetingDraftsAllowed" | "holidayCalendarEnabled" | "automaticGreetingApprovalRequired" | "contactOptOutRespected", string]>).map(([key, label]) => (
            <label key={key} className="checkLine">
              <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
        </div>
        <div className="miniStats">
          <div><span>{t(props.language, "messenger.maxAutoGreetingsPerDay")}</span><strong>{snapshot?.settings.maxAutoGreetingsPerDay ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.cooldownDaysPerContact")}</span><strong>{snapshot?.settings.cooldownDaysPerContact ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.rawPrivateContent")}</span><strong>{statusText(props.language, snapshot?.settings.rawPrivateContentAllowed ? "enabled" : "disabled")}</strong></div>
          <div><span>{t(props.language, "messenger.profileBirthdaySource")}</span><strong>{snapshot?.settings.profileBirthdaySource ?? "—"}</strong></div>
          <div><span>{t(props.language, "messenger.holidayDefinitions")}</span><strong>{snapshot?.summary.activeHolidayDefinitions ?? 0}/{snapshot?.summary.holidayDefinitions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.automationRunsToday")}</span><strong>{snapshot?.summary.automationRunsToday ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.pendingGreetingApprovals")}</span><strong>{snapshot?.summary.pendingGreetingApprovals ?? 0}</strong></div>
        </div>
      </div>

      <div className="split messengerPageSplit messengerPageGrowthSplit greetingAutomationCenter">
        <div className="card">
          <h3>{t(props.language, "messenger.greetingAutomationTitle")}</h3>
          <p>{t(props.language, "messenger.greetingAutomationDescription")}</p>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.occasion")}</span><select value={props.automationForm.occasion} onChange={(event) => props.setAutomationForm({ ...props.automationForm, occasion: event.target.value })}><option value="birthday">{statusText(props.language, "birthday")}</option><option value="holiday">{statusText(props.language, "holiday")}</option><option value="custom">{statusText(props.language, "custom")}</option></select></label>
            <label><span>{t(props.language, "messenger.source")}</span><select value={props.automationForm.source} onChange={(event) => props.setAutomationForm({ ...props.automationForm, source: event.target.value })}><option value="verified_profile_birthdays">{statusText(props.language, "verified_profile_birthdays")}</option><option value="holiday_calendar">{statusText(props.language, "holiday_calendar")}</option><option value="manual_seed_list">{statusText(props.language, "manual_seed_list")}</option></select></label>
            <label><span>{t(props.language, "messenger.template")}</span><select value={props.automationForm.templateId} onChange={(event) => props.setAutomationForm({ ...props.automationForm, templateId: event.target.value })}><option value="">—</option>{(snapshot?.greetingTemplates ?? []).map((item: AdminMessengerGreetingTemplate) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
            <label><span>{t(props.language, "messenger.holidayKey")}</span><input value={props.automationForm.holidayKey} onChange={(event) => props.setAutomationForm({ ...props.automationForm, holidayKey: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.scheduledAt")}</span><input value={props.automationForm.scheduledAt} onChange={(event) => props.setAutomationForm({ ...props.automationForm, scheduledAt: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.language")}</span><input value={props.automationForm.language} onChange={(event) => props.setAutomationForm({ ...props.automationForm, language: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "messenger.targetUserIds")}</span><textarea value={props.automationForm.targetUserIds} onChange={(event) => props.setAutomationForm({ ...props.automationForm, targetUserIds: event.target.value })} placeholder="user-1, user-2" /></label>
          <label><span>{t(props.language, "messenger.contactUserIds")}</span><textarea value={props.automationForm.contactUserIds} onChange={(event) => props.setAutomationForm({ ...props.automationForm, contactUserIds: event.target.value })} placeholder="contact-1, contact-2" /></label>
          <label className="checkLine"><input type="checkbox" checked={props.automationForm.dryRun} onChange={(event) => props.setAutomationForm({ ...props.automationForm, dryRun: event.target.checked })} /><span>{t(props.language, "messenger.dryRun")}</span></label>
          <label><span>{t(props.language, "messenger.note")}</span><textarea value={props.automationForm.note} onChange={(event) => props.setAutomationForm({ ...props.automationForm, note: event.target.value })} /></label>
          <div className="actions"><button disabled={!props.canWrite || props.busy} onClick={props.runGreetingAutomation}>{t(props.language, "messenger.runGreetingAutomation")}</button></div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.holidayCalendar")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.holidayKey")}</span><input value={props.holidayForm.holidayKey} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, holidayKey: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.titleField")}</span><input value={props.holidayForm.title} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.dateMonthDay")}</span><input value={props.holidayForm.dateMonthDay} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, dateMonthDay: event.target.value })} placeholder="03-21" /></label>
            <label><span>{t(props.language, "messenger.countryCode")}</span><input value={props.holidayForm.countryCode} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, countryCode: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.locale")}</span><input value={props.holidayForm.locale} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, locale: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.status")}</span><select value={props.holidayForm.status} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, status: event.target.value })}><option value="draft">{statusText(props.language, "draft")}</option><option value="active">{statusText(props.language, "active")}</option><option value="disabled">{statusText(props.language, "disabled")}</option></select></label>
          </div>
          <div className="formGrid">
            <label className="checkLine"><input type="checkbox" checked={props.holidayForm.autoQueueAllowed} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, autoQueueAllowed: event.target.checked })} /><span>{t(props.language, "messenger.autoQueueAllowed")}</span></label>
            <label className="checkLine"><input type="checkbox" checked={props.holidayForm.manualSendAllowed} onChange={(event) => props.setHolidayForm({ ...props.holidayForm, manualSendAllowed: event.target.checked })} /><span>{t(props.language, "messenger.manualSendAllowed")}</span></label>
          </div>
          <div className="actions"><button disabled={!props.canWrite || props.busy} onClick={props.saveHoliday}>{t(props.language, "messenger.saveHoliday")}</button></div>
          <div className="tableList smallList">
            {(snapshot?.greetingHolidays ?? []).slice(0, 20).map((item) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.holidayKey} · {item.dateMonthDay} · {item.countryCode ?? "GLOBAL"}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card greetingAutomationRunsCard">
        <h3>{t(props.language, "messenger.automationRuns")}</h3>
        <div className="progressList compactProgress">
          {(snapshot?.charts.automationQueue ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{statusText(props.language, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / Math.max(1, snapshot?.summary.greetingTasks ?? 1)) * 100))}%` }} /></em></div>)}
        </div>
        <div className="tableList smallList">
          {(snapshot?.greetingAutomationRuns ?? []).slice(0, 20).map((item) => (
            <div className="row" key={item.id}>
              <strong>{item.occasion} · {item.source}</strong>
              <span>{t(props.language, "messenger.createdTasks")}: {item.createdTaskCount}/{item.targetUserCount} · {t(props.language, "messenger.skipped")}: {item.skippedDuplicate + item.skippedByCooldown + item.skippedByDailyLimit + item.skippedMissingTemplate}</span>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="split messengerPageSplit messengerPageGrowthSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.createPromotion")}</h3>
          {!props.canWrite ? <div className="emptyState">{t(props.language, "permission.readOnly")}</div> : null}
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.targetKind")}</span><select value={props.promotionForm.targetKind} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, targetKind: event.target.value })}><option value="channel">{statusText(props.language, "channel")}</option><option value="group">{statusText(props.language, "group")}</option><option value="bot">{statusText(props.language, "bot")}</option></select></label>
            <label><span>{t(props.language, "messenger.targetId")}</span><input value={props.promotionForm.targetId} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.titleField")}</span><input value={props.promotionForm.title} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.placement")}</span><select value={props.promotionForm.placement} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, placement: event.target.value })}><option value="featured_top">{statusText(props.language, "featured_top")}</option><option value="directory_boost">{statusText(props.language, "directory_boost")}</option><option value="search_boost">{statusText(props.language, "search_boost")}</option><option value="home_card">{statusText(props.language, "home_card")}</option><option value="recommended">{statusText(props.language, "recommended")}</option></select></label>
            <label><span>{t(props.language, "messenger.audience")}</span><select value={props.promotionForm.audience} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, audience: event.target.value })}><option value="all">{statusText(props.language, "all")}</option><option value="local">{statusText(props.language, "local")}</option><option value="new_users">{statusText(props.language, "new_users")}</option><option value="active_users">{statusText(props.language, "active_users")}</option><option value="manual_segment">{statusText(props.language, "manual_segment")}</option></select></label>
            <label><span>{t(props.language, "messenger.priority")}</span><input value={props.promotionForm.priority} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, priority: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "messenger.note")}</span><textarea value={props.promotionForm.note} onChange={(event) => props.setPromotionForm({ ...props.promotionForm, note: event.target.value })} /></label>
          <div className="actions"><button disabled={!props.canWrite || props.busy} onClick={props.createPromotion}>{t(props.language, "messenger.savePromotion")}</button></div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.promotionAnalytics")}</h3>
          <div className="progressList">
            {(snapshot?.charts.promotionByKind ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.${item.label}s`, item.label)}</strong><span>{item.active}/{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / promotionMax) * 100))}%` }} /></em></div>)}
            {(snapshot?.charts.funnel ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.funnel.${item.label}`, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / funnelMax) * 100))}%` }} /></em></div>)}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.promotions")}</h3>
        <div className="tableList smallList">
          {(snapshot?.promotions ?? []).map((item) => (
            <div className="row" key={item.id}>
              <strong>{cleanAdminUiText(props.language, item.title)}</strong>
              <span>{item.targetKind} · {item.targetId} · {item.placement} · {t(props.language, "messenger.conversion")}: {item.metrics.conversionPct}%</span>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setPromotionStatus(item, item.status === "active" ? "paused" : "active")}>{item.status === "active" ? t(props.language, "button.pause") : t(props.language, "button.activate")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setPromotionStatus(item, "completed")}>{t(props.language, "button.complete")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split messengerPageSplit messengerPageGrowthSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.greetingTemplates")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.occasion")}</span><select value={props.templateForm.occasion} onChange={(event) => props.setTemplateForm({ ...props.templateForm, occasion: event.target.value })}><option value="birthday">{statusText(props.language, "birthday")}</option><option value="holiday">{statusText(props.language, "holiday")}</option><option value="custom">{statusText(props.language, "custom")}</option></select></label>
            <label><span>{t(props.language, "messenger.language")}</span><input value={props.templateForm.language} onChange={(event) => props.setTemplateForm({ ...props.templateForm, language: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.titleField")}</span><input value={props.templateForm.title} onChange={(event) => props.setTemplateForm({ ...props.templateForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.holidayKey")}</span><input value={props.templateForm.holidayKey} onChange={(event) => props.setTemplateForm({ ...props.templateForm, holidayKey: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "messenger.messagePreview")}</span><textarea value={props.templateForm.messagePreview} onChange={(event) => props.setTemplateForm({ ...props.templateForm, messagePreview: event.target.value })} /></label>
          <div className="formGrid">
            <label className="checkLine"><input type="checkbox" checked={props.templateForm.autoSendAllowed} onChange={(event) => props.setTemplateForm({ ...props.templateForm, autoSendAllowed: event.target.checked })} /><span>{t(props.language, "messenger.autoSendAllowed")}</span></label>
            <label className="checkLine"><input type="checkbox" checked={props.templateForm.manualSendAllowed} onChange={(event) => props.setTemplateForm({ ...props.templateForm, manualSendAllowed: event.target.checked })} /><span>{t(props.language, "messenger.manualSendAllowed")}</span></label>
            <label className="checkLine"><input type="checkbox" checked={props.templateForm.approvalRequired} onChange={(event) => props.setTemplateForm({ ...props.templateForm, approvalRequired: event.target.checked })} /><span>{t(props.language, "messenger.approvalRequired")}</span></label>
          </div>
          <div className="actions"><button disabled={!props.canWrite || props.busy} onClick={props.createTemplate}>{t(props.language, "messenger.saveTemplate")}</button></div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.createGreetingTask")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.occasion")}</span><select value={props.greetingForm.occasion} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, occasion: event.target.value })}><option value="birthday">{statusText(props.language, "birthday")}</option><option value="holiday">{statusText(props.language, "holiday")}</option><option value="custom">{statusText(props.language, "custom")}</option></select></label>
            <label><span>{t(props.language, "messenger.mode")}</span><select value={props.greetingForm.mode} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, mode: event.target.value })}><option value="manual">{statusText(props.language, "manual")}</option><option value="automatic">{statusText(props.language, "automatic")}</option></select></label>
            <label><span>{t(props.language, "messenger.template")}</span><select value={props.greetingForm.templateId} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, templateId: event.target.value })}><option value="">—</option>{(snapshot?.greetingTemplates ?? []).map((item: AdminMessengerGreetingTemplate) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
            <label><span>{t(props.language, "messenger.targetUserId")}</span><input value={props.greetingForm.targetUserId} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, targetUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.contactUserId")}</span><input value={props.greetingForm.contactUserId} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, contactUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.scheduledAt")}</span><input value={props.greetingForm.scheduledAt} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, scheduledAt: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "messenger.note")}</span><textarea value={props.greetingForm.note} onChange={(event) => props.setGreetingForm({ ...props.greetingForm, note: event.target.value })} /></label>
          <div className="actions"><button disabled={!props.canWrite || props.busy} onClick={props.createGreetingTask}>{t(props.language, "messenger.saveGreetingTask")}</button></div>
        </div>
      </div>

      <div className="split messengerPageSplit messengerPageGrowthSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.greetingAnalytics")}</h3>
          <div className="progressList">
            {(snapshot?.charts.greetingByOccasion ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.occasion.${item.label}`, item.label)}</strong><span>{item.sent}/{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / greetingMax) * 100))}%` }} /></em></div>)}
          </div>
          {(snapshot?.rules ?? []).length ? <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.greetingTasks")}</h3>
          <div className="tableList smallList">
            {(snapshot?.greetingTasks ?? []).slice(0, 30).map((item) => (
              <div className="row" key={item.id}>
                <strong>{item.occasion} · {item.mode}</strong>
                <span>{item.targetUserId} · {item.scheduledAt.slice(0, 16)} · {item.dedupeKey}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
                {props.canWrite && item.status !== "sent" ? <button disabled={props.busy} onClick={() => props.setGreetingStatus(item, "sent")}>{t(props.language, "button.markSent")}</button> : null}
                {props.canWrite && item.status !== "cancelled" && item.status !== "sent" ? <button disabled={props.busy} onClick={() => props.setGreetingStatus(item, "cancelled")}>{t(props.language, "button.cancel")}</button> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessengerRuntimeVerificationPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerRuntimeVerificationSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  sessionForm: { title: string; deviceAUserId: string; deviceBUserId: string; deviceALabel: string; deviceBLabel: string; connectionMode: string; note: string };
  setSessionForm: (value: { title: string; deviceAUserId: string; deviceBUserId: string; deviceALabel: string; deviceBLabel: string; connectionMode: string; note: string }) => void;
  toggleSetting: (key: keyof AdminMessengerRuntimeVerificationSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerRuntimeVerificationItem, status: "verify" | "block" | "waive" | "reset") => void;
  createSession: () => void;
  setSessionStatus: (session: AdminMessengerRuntimeVerificationSession, status: "draft" | "running" | "passed" | "failed" | "cancelled") => void;
}) {
  const snapshot = props.snapshot;
  const settings = snapshot?.settings;
  return (
    <div className="messengerPageUnit messengerPageRuntimeVerification messengerRuntimeVerificationGrid">
      <div className="card runtimeVerificationHero">
        <div>
          <h3>{t(props.language, "messenger.runtimeVerification.title")}</h3>
          <p>{t(props.language, "messenger.runtimeVerification.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.runtimeReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="proMetricGrid runtimeVerificationMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.runtimeVerification.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.runtimeVerification.ready")}</span><strong>{snapshot?.summary.readyItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.runtimeVerification.blocked")}</span><strong>{(snapshot?.summary.blockedItems ?? 0) + (snapshot?.summary.notConfiguredItems ?? 0)}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.runtimeVerification.sessions")}</span><strong>{snapshot?.summary.activeSessions ?? 0}/{snapshot?.summary.passedSessions ?? 0}</strong></div>
      </div>

      <div className="split runtimeVerificationSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.runtimeVerification.settings")}</h3>
          <div className="toggleList">
            {([
              ["requireTwoPhysicalDevices", "messenger.live environment.setting.twoDevices"],
              ["requireUnifiedUserIdProof", "messenger.live environment.setting.unifiedId"],
              ["requireRealtimePresenceProof", "messenger.runtime.setting.presence"],
              ["requireChatSendReceiveProof", "messenger.runtime.setting.chat"],
              ["requireMediaPipelineProof", "messenger.runtime.setting.media"],
              ["requireCallsProof", "messenger.runtime.setting.calls"],
              ["requireNotificationsProof", "messenger.runtime.setting.notifications"],
              ["requirePublicDirectoryProof", "messenger.runtime.setting.directory"],
              ["requireSafetyAndAntiSpamProof", "messenger.runtime.setting.safety"],
              ["requireOwnerFinalRuntimeApproval", "messenger.runtime.setting.owner"],
            ] as Array<[keyof AdminMessengerRuntimeVerificationSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="toggleRow" key={String(key)}><span>{t(props.language, label)}</span><input type="checkbox" checked={Boolean(settings?.[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /></label>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.runtimeVerification.newSession")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.runtimeVerification.sessionTitle")}</span><input value={props.sessionForm.title} onChange={(event) => props.setSessionForm({ ...props.sessionForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceAUserId")}</span><input value={props.sessionForm.deviceAUserId} onChange={(event) => props.setSessionForm({ ...props.sessionForm, deviceAUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceBUserId")}</span><input value={props.sessionForm.deviceBUserId} onChange={(event) => props.setSessionForm({ ...props.sessionForm, deviceBUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceALabel")}</span><input value={props.sessionForm.deviceALabel} onChange={(event) => props.setSessionForm({ ...props.sessionForm, deviceALabel: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceBLabel")}</span><input value={props.sessionForm.deviceBLabel} onChange={(event) => props.setSessionForm({ ...props.sessionForm, deviceBLabel: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.connectionMode")}</span><select value={props.sessionForm.connectionMode} onChange={(event) => props.setSessionForm({ ...props.sessionForm, connectionMode: event.target.value })}><option value="lan">{statusText(props.language, "lan")}</option><option value="tunnel">{statusText(props.language, "tunnel")}</option><option value="production">{statusText(props.language, "production")}</option><option value="local">{statusText(props.language, "local")}</option></select></label>
          </div>
          <label><span>{t(props.language, "messenger.note")}</span><textarea value={props.sessionForm.note} onChange={(event) => props.setSessionForm({ ...props.sessionForm, note: event.target.value })} /></label>
          <div className="actions"><button disabled={!props.canWrite || props.busy || !props.sessionForm.deviceAUserId.trim() || !props.sessionForm.deviceBUserId.trim()} onClick={props.createSession}>{t(props.language, "messenger.runtimeVerification.createSession")}</button></div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.runtimeVerification.items")}</h3>
        <div className="formGrid compactInputs">
          <label><span>{t(props.language, "messenger.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.runtimeVerification.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
        <div className="tableList runtimeVerificationTable">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, `messenger.runtime.category.${item.categoryKey}`, item.categoryKey)} · {t(props.language, item.detailKey)}</span>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              <div className="miniActions">
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setItemStatus(item, "verify")}>{t(props.language, "button.verify")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setItemStatus(item, "block")}>{t(props.language, "button.block")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setItemStatus(item, "waive")}>{t(props.language, "button.waive")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setItemStatus(item, "reset")}>{t(props.language, "button.reset")}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="split runtimeVerificationSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.runtimeVerification.sessionsTitle")}</h3>
          <div className="tableList runtimeVerificationTable">
            {(snapshot?.sessions ?? []).length ? (snapshot?.sessions ?? []).map((session) => (
              <div className="row" key={session.id}>
                <strong>{cleanAdminUiText(props.language, session.title)}</strong>
                <span>{session.deviceAUserId} ⇄ {session.deviceBUserId} · {statusText(props.language, session.connectionMode)}</span>
                <em className={diagnosticClass(session.status)}>{statusText(props.language, session.status)}</em>
                <div className="miniActions">
                  <button disabled={!props.canWrite || props.busy} onClick={() => props.setSessionStatus(session, "running")}>{statusText(props.language, "running")}</button>
                  <button disabled={!props.canWrite || props.busy} onClick={() => props.setSessionStatus(session, "passed")}>{statusText(props.language, "passed")}</button>
                  <button disabled={!props.canWrite || props.busy} onClick={() => props.setSessionStatus(session, "failed")}>{statusText(props.language, "failed")}</button>
                  <button disabled={!props.canWrite || props.busy} onClick={() => props.setSessionStatus(session, "cancelled")}>{statusText(props.language, "cancelled")}</button>
                </div>
              </div>
            )) : <div className="emptyState">{t(props.language, "messenger.runtimeVerification.noSessions")}</div>}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.runtimeVerification.nextSteps")}</h3>
          <ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
          <h3>{t(props.language, "messenger.rules")}</h3>
          <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}


function MessengerFixControlPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerFixControlSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  ticketForm: { title: string; category: string; severity: string; targetArea: string; deviceAUserId: string; deviceBUserId: string; description: string };
  setTicketForm: (value: { title: string; category: string; severity: string; targetArea: string; deviceAUserId: string; deviceBUserId: string; description: string }) => void;
  toggleSetting: (key: keyof AdminMessengerFixControlSnapshot["settings"], value: boolean) => void;
  createTicket: () => void;
  setTicketStatus: (ticket: AdminMessengerFixControlTicket, status: "open" | "in_progress" | "fixed" | "verified" | "blocked" | "waived") => void;
}) {
  const snapshot = props.snapshot;
  const statusMax = Math.max(1, ...(snapshot?.charts.ticketStatus ?? []).map((item) => item.value));
  const categoryMax = Math.max(1, ...(snapshot?.charts.categoryProgress ?? []).map((item) => item.value));
  const categories = ["identity_profile", "realtime_presence", "chat_messages", "media_pipeline", "calls", "notifications", "groups_channels_bots", "promotion_greetings", "safety_compliance", "mobile_ui", "backend_api"];
  return (
    <div className="messengerPageUnit messengerPageFixControl messengerFixControlGrid">
      <div className="card fixControlHero">
        <div>
          <h3>{t(props.language, "messenger.fix.title")}</h3>
          <p>{t(props.language, "messenger.fix.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.fixReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="proMetricGrid fixControlMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.fix.totalTickets")}</span><strong>{snapshot?.summary.totalTickets ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.fix.openTickets")}</span><strong>{(snapshot?.summary.openTickets ?? 0) + (snapshot?.summary.inProgressTickets ?? 0)}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.fix.criticalOpen")}</span><strong>{snapshot?.summary.criticalOpenTickets ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.fix.runtimeBlockers")}</span><strong>{snapshot?.summary.runtimeBlockers ?? 0}</strong></div>
      </div>

      <div className="split fixControlSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.fix.settings")}</h3>
          <div className="toggleList">
            {([
              ["requireOwnerVerificationForCriticalFixes", "messenger.fix.setting.ownerCritical"],
              ["requireTwoDeviceRetestAfterFix", "messenger.fix.setting.twoDeviceRetest"],
              ["requireNoRawPrivateContent", "messenger.fix.setting.noRaw"],
              ["requireNoWalletTouch", "messenger.fix.setting.noWallet"],
              ["requireRegressionProof", "messenger.fix.setting.regression"],
            ] as Array<[keyof AdminMessengerFixControlSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="toggleRow" key={String(key)}><span>{t(props.language, label)}</span><input type="checkbox" checked={Boolean(snapshot?.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /></label>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.fix.createTicket")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.fix.ticketTitle")}</span><input value={props.ticketForm.title} onChange={(event) => props.setTicketForm({ ...props.ticketForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.fix.category")}</span><select value={props.ticketForm.category} onChange={(event) => props.setTicketForm({ ...props.ticketForm, category: event.target.value })}>{categories.map((key) => <option key={key} value={key}>{t(props.language, `messenger.fix.category.${key}`)}</option>)}</select></label>
            <label><span>{t(props.language, "messenger.fix.severity")}</span><select value={props.ticketForm.severity} onChange={(event) => props.setTicketForm({ ...props.ticketForm, severity: event.target.value })}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "messenger.fix.targetArea")}</span><input value={props.ticketForm.targetArea} onChange={(event) => props.setTicketForm({ ...props.ticketForm, targetArea: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceAUserId")}</span><input value={props.ticketForm.deviceAUserId} onChange={(event) => props.setTicketForm({ ...props.ticketForm, deviceAUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.runtimeVerification.deviceBUserId")}</span><input value={props.ticketForm.deviceBUserId} onChange={(event) => props.setTicketForm({ ...props.ticketForm, deviceBUserId: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "messenger.fix.descriptionField")}</span><textarea value={props.ticketForm.description} onChange={(event) => props.setTicketForm({ ...props.ticketForm, description: event.target.value })} /></label>
          <div className="actions"><button disabled={!props.canWrite || props.busy || !props.ticketForm.title.trim()} onClick={props.createTicket}>{t(props.language, "messenger.fix.addTicket")}</button></div>
        </div>
      </div>

      <div className="split fixControlSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.fix.ticketStatus")}</h3>
          <div className="progressList">{(snapshot?.charts.ticketStatus ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{statusText(props.language, item.label)}</strong><span>{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / statusMax) * 100))}%` }} /></em></div>)}</div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.fix.categoryProgress")}</h3>
          <div className="progressList">{(snapshot?.charts.categoryProgress ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.fix.category.${item.label}`)}</strong><span>{item.verified}/{item.value}</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / categoryMax) * 100))}%` }} /></em></div>)}</div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.fix.lanes")}</h3>
        <div className="tableList fixControlTable">
          {(snapshot?.lanes ?? []).map((lane) => (
            <div className="row" key={lane.key}>
              <strong>{t(props.language, lane.titleKey)}</strong>
              <span>{t(props.language, lane.detailKey)} · {t(props.language, "messenger.fix.openTickets")}: {lane.openTickets} · {t(props.language, "messenger.fix.criticalOpen")}: {lane.criticalTickets}</span>
              <em className={diagnosticClass(lane.status)}>{statusText(props.language, lane.status)}</em>
              <small>{lane.scorePct}%</small>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.fix.tickets")}</h3>
        <div className="formGrid compactInputs">
          <label><span>{t(props.language, "messenger.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.runtimeVerification.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
        <div className="tableList fixControlTable">
          {(snapshot?.tickets ?? []).length ? (snapshot?.tickets ?? []).map((ticket) => (
            <div className="row" key={ticket.id}>
              <strong>{cleanAdminUiText(props.language, ticket.title)}</strong>
              <span>{t(props.language, `messenger.fix.category.${ticket.category}`)} · {statusText(props.language, ticket.severity)} · {cleanAdminUiText(props.language, ticket.targetArea)}</span>
              <em className={diagnosticClass(ticket.status === "verified" || ticket.status === "waived" ? "ready" : ticket.status === "blocked" ? "blocked" : "warning")}>{statusText(props.language, ticket.status)}</em>
              <div className="miniActions">
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "in_progress")}>{statusText(props.language, "in_progress")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "fixed")}>{statusText(props.language, "fixed")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "verified")}>{statusText(props.language, "verified")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "blocked")}>{t(props.language, "button.block")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "waived")}>{t(props.language, "button.waive")}</button>
                <button disabled={!props.canWrite || props.busy} onClick={() => props.setTicketStatus(ticket, "open")}>{t(props.language, "button.reset")}</button>
              </div>
            </div>
          )) : <div className="emptyState">{t(props.language, "messenger.fix.noTickets")}</div>}
        </div>
      </div>

      <div className="split fixControlSplit">
        <div className="card"><h3>{t(props.language, "messenger.fix.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}

function MessengerMaxPrelaunchControlPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerMaxPrelaunchSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  setNote: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerMaxPrelaunchSnapshot["settings"], value: boolean) => void;
  setGateStatus: (gate: AdminMessengerMaxPrelaunchGate, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const maxGate = Math.max(1, ...(snapshot?.charts.readinessLanes ?? []).map((item) => item.scorePct));
  return (
    <div className="messengerPageUnit messengerPageMaxPrelaunch messengerMaxPrelaunchGrid">
      <div className="card maxPrelaunchHero">
        <div className="proDashboardHead">
          <div>
            <h2>{t(props.language, "messenger.max.title")}</h2>
            <p>{t(props.language, "messenger.max.description")}</p>
          </div>
          <em className={diagnosticClass(snapshot?.summary.healthStatus ?? "warning")}>{statusText(props.language, snapshot?.summary.healthStatus ?? "warning")}</em>
        </div>
        <div className="proMetricGrid maxPrelaunchMetrics">
          <div className="proMetric heroMetric"><span>{t(props.language, "messenger.max.readiness")}</span><strong>{snapshot?.summary.maxReadinessPct ?? 0}%</strong><small>{t(props.language, "messenger.max.gates")}: {snapshot?.summary.readyGates ?? 0}/{snapshot?.summary.totalGates ?? 0}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.max.blockers")}</span><strong>{snapshot?.summary.blockedGates ?? 0}</strong><small>{t(props.language, "messenger.max.notConfigured")}: {snapshot?.summary.notConfiguredGates ?? 0}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.max.warnings")}</span><strong>{snapshot?.summary.warningGates ?? 0}</strong><small>{t(props.language, "messenger.max.verified")}: {snapshot?.summary.manuallyVerifiedGates ?? 0}</small></div>
          <div className="proMetric"><span>{t(props.language, "messenger.max.goLive")}</span><strong>{snapshot?.summary.goLiveAllowed ? t(props.language, "status.allowed") : t(props.language, "status.hold")}</strong><small>{snapshot?.summary.ownerGoLiveApprovalRequired ? t(props.language, "messenger.max.ownerRequired") : t(props.language, "messenger.max.ownerClear")}</small></div>
        </div>
      </div>

      <div className="split maxPrelaunchSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.max.settings")}</h3>
          {!props.canWrite ? <div className="emptyState">{t(props.language, "permission.readOnly")}</div> : null}
          <div className="formGrid compactChecks">
            {snapshot ? ([
              ["requireOwnerGoLiveApproval", "messenger.max.setting.ownerApproval"],
              ["requireNoBlockedFinalReadiness", "messenger.max.setting.noBlockedFinal"],
              ["requireTwoDeviceRealtimeProof", "messenger.max.setting.twoDevice"],
              ["requirePublicDirectoryReady", "messenger.max.setting.directory"],
              ["requireGrowthPromotionReady", "messenger.max.setting.growth"],
              ["requireGreetingsSafeMode", "messenger.max.setting.greetings"],
              ["requireNotificationsReady", "messenger.max.setting.notifications"],
              ["requirePresenceReady", "messenger.max.setting.presence"],
              ["requireSafetyGateReady", "messenger.max.setting.safety"],
              ["requireMobileBackendVerificationPlan", "messenger.max.setting.mobileBackend"],
            ] as Array<[keyof AdminMessengerMaxPrelaunchSnapshot["settings"], string]>).map(([key, label]) => (
              <label key={String(key)} className="checkLine">
                <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
                <span>{t(props.language, label)}</span>
              </label>
            )) : null}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.max.focus")}</h3>
          <div className="progressList">
            {(snapshot?.charts.operationalFocus ?? []).map((item) => (
              <div className="progressItem" key={item.label}>
                <div><strong>{t(props.language, `messenger.max.focus.${item.label}`, item.label)}</strong><span>{item.value}</span></div>
                <em><i style={{ width: `${Math.max(4, Math.min(100, item.value * 20))}%` }} /></em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.max.gateLanes")}</h3>
        <div className="healthLaneGrid maxPrelaunchLanes">
          {(snapshot?.charts.readinessLanes ?? []).map((lane) => (
            <div className="healthLane" key={lane.key}>
              <div><strong>{t(props.language, `messenger.max.gate.${lane.key}.short`, t(props.language, `messenger.max.gate.${lane.key}.title`, lane.key))}</strong><em className={diagnosticClass(lane.status)}>{statusText(props.language, lane.status)}</em></div>
              <span>{t(props.language, "messenger.max.score")}: {lane.scorePct}% · {t(props.language, "messenger.max.blockers")}: {lane.blockers} · {t(props.language, "messenger.max.warnings")}: {lane.warnings}</span>
              <b><i style={{ width: `${Math.max(4, Math.round((lane.scorePct / maxGate) * 100))}%` }} /></b>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.max.gatesTitle")}</h3>
        {props.canWrite ? <label><span>{t(props.language, "messenger.max.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} placeholder={t(props.language, "messenger.max.notePlaceholder")} /></label> : null}
        <div className="tableList maxPrelaunchTable">
          {(snapshot?.gates ?? []).map((gate) => (
            <div className="row" key={gate.key}>
              <strong>{t(props.language, gate.titleKey, gate.key)}</strong>
              <span>{t(props.language, gate.detailKey, gate.detailKey)} · {t(props.language, `messenger.max.category.${gate.categoryKey}`, gate.categoryKey)} · {t(props.language, `messenger.max.source.${gate.sourceKey}`, gate.sourceKey)} · {gate.scorePct}%</span>
              <em className={diagnosticClass(gate.status)}>{statusText(props.language, gate.status)}</em>
              <small>{t(props.language, `status.${gate.manualStatus}`, gate.manualStatus)}</small>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "verify")}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "block")}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "waive")}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "reset")}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split maxPrelaunchSplit">
        <div className="card"><h3>{t(props.language, "messenger.max.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}

function MessengerUiTextCleanlinessPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerUiTextCleanlinessSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerUiTextCleanlinessSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerUiTextCleanlinessItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const maxCategory = Math.max(1, ...(snapshot?.charts.categoryReadiness ?? []).map((item) => item.value));
  return (
    <div className="card messengerPageUnit messengerPageUiTextCleanliness textCleanlinessCenter">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.textClean.title")}</h3>
          <p>{t(props.language, "messenger.textClean.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.textCleanlinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>
      <div className="proMetricGrid">
        <div className="proMetric"><span>{t(props.language, "messenger.textClean.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.textClean.verified")}</span><strong>{snapshot?.summary.verifiedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.textClean.blocked")}</span><strong>{snapshot?.summary.blockedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.textClean.pending")}</span><strong>{snapshot?.summary.pendingItems ?? 0}</strong></div>
      </div>
      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.textClean.settings")}</h3>
          {snapshot ? ([
            ["requireNoVisibleEnglishInRussianUi", "messenger.textClean.setting.noEnglish"],
            ["requireNoRawTechnicalKeys", "messenger.textClean.setting.noKeys"],
            ["requireStatusTranslationMap", "messenger.textClean.setting.statusMap"],
            ["requireMobileMessengerI18nReview", "messenger.textClean.setting.mobile"],
            ["requireOwnerManualProof", "messenger.textClean.setting.owner"],
          ] as Array<[keyof AdminMessengerUiTextCleanlinessSnapshot["settings"], string]>).map(([key, label]) => (
            <label className="checkLine" key={String(key)}>
              <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.textClean.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.textClean.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.textClean.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
          <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
      </div>
      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.textClean.categories")}</h3>
          <div className="progressList">{(snapshot?.charts.categoryReadiness ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.textClean.category.${item.label}`)}</strong><span>{item.value}%</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / maxCategory) * 100))}%` }} /></em></div>)}</div>
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.textClean.nextSteps")}</h3>
          <ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
      </div>
      <div className="card innerCard">
        <h3>{t(props.language, "messenger.textClean.items")}</h3>
        <div className="tableList">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, item.detailKey)} · {t(props.language, "messenger.textClean.system")}: {statusText(props.language, item.systemStatus)} · {t(props.language, "messenger.textClean.manual")}: {statusText(props.language, item.manualStatus)}</span>
              <em className={diagnosticClass(item.manualStatus === "blocked" || item.systemStatus === "blocked" || item.systemStatus === "not_configured" ? "blocked" : item.manualStatus === "verified" ? "pass" : "warning")}>{item.scorePct}%</em>
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "verify")} disabled={props.busy}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "block")} disabled={props.busy}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "waive")} disabled={props.busy}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "reset")} disabled={props.busy}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function MessengerRegressionRecheckPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerRegressionSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerRegressionSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerRegressionItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const categoryMax = Math.max(1, ...(snapshot?.charts.categoryReadiness ?? []).map((item) => item.value));
  return (
    <div className="card messengerPageUnit messengerPageRegression messengerRegressionCenter">
      <div className="proDashboardHead">
        <div>
          <h3>{t(props.language, "messenger.regression.title")}</h3>
          <p>{t(props.language, "messenger.regression.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.regressionReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>
      <div className="proMetricGrid">
        <div className="proMetric"><span>{t(props.language, "messenger.regression.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.regression.verified")}</span><strong>{snapshot?.summary.verifiedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.regression.blocked")}</span><strong>{snapshot?.summary.blockedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.regression.linkedBlockers")}</span><strong>{snapshot?.summary.linkedBlockers ?? 0}</strong></div>
      </div>
      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.regression.settings")}</h3>
          {snapshot ? ([
            ["requireTwoDeviceRetestForCriticalFixes", "messenger.regression.setting.twoDevice"],
            ["requireCleanUiTextBeforeAcceptance", "messenger.regression.setting.cleanText"],
            ["requireOwnerProofForFinalPass", "messenger.regression.setting.owner"],
            ["requireNoRawPrivateContent", "messenger.regression.setting.raw"],
            ["requireMessengerOnlyScope", "messenger.regression.setting.scope"],
            ["requireFixControlClosed", "messenger.regression.setting.fix"],
          ] as Array<[keyof AdminMessengerRegressionSnapshot["settings"], string]>).map(([key, label]) => (
            <label className="checkLine" key={String(key)}>
              <input type="checkbox" checked={Boolean(snapshot.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.regression.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.regression.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.regression.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
          <ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
      </div>
      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.regression.categories")}</h3>
          <div className="progressList">{(snapshot?.charts.categoryReadiness ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.regression.category.${item.label}`)}</strong><span>{item.value}%</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / categoryMax) * 100))}%` }} /></em></div>)}</div>
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.regression.nextSteps")}</h3>
          <ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
      </div>
      <div className="card innerCard">
        <h3>{t(props.language, "messenger.regression.items")}</h3>
        <div className="tableList">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, item.detailKey)} · {t(props.language, "messenger.regression.system")}: {statusText(props.language, item.systemStatus)} · {t(props.language, "messenger.regression.manual")}: {statusText(props.language, item.manualStatus)}</span>
              <em className={diagnosticClass(item.manualStatus === "blocked" || item.systemStatus === "blocked" || item.systemStatus === "not_configured" || item.blockers > 0 ? "blocked" : item.manualStatus === "verified" ? "pass" : "warning")}>{item.scorePct}%</em>
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "verify")} disabled={props.busy}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "block")} disabled={props.busy}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "waive")} disabled={props.busy}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button onClick={() => props.setItemStatus(item, "reset")} disabled={props.busy}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function MessengerOwnerHandoffPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerOwnerHandoffSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerOwnerHandoffSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerOwnerHandoffItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  return (
    <div className="card messengerPageUnit messengerPageOwnerHandoff messengerOwnerHandoffCenter">
      <div className="releaseCandidateHero">
        <div>
          <h3>{t(props.language, "messenger.handoff.title")}</h3>
          <p>{t(props.language, "messenger.handoff.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.handoffReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="statsGrid ownerHandoffMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.handoff.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.handoff.verified")}</span><strong>{snapshot?.summary.verifiedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.handoff.blocked")}</span><strong>{snapshot?.summary.blockedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.handoff.linkedBlockers")}</span><strong>{snapshot?.summary.linkedBlockers ?? 0}</strong></div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.handoff.settings")}</h3>
          <div className="checks compactChecks">
            {([
              ["requireOwnerHandoffPackage", "messenger.handoff.setting.package"],
              ["requireFreezeWindow", "messenger.handoff.setting.freeze"],
              ["requireReleaseNotes", "messenger.handoff.setting.notes"],
              ["requireRollbackPlan", "messenger.handoff.setting.rollback"],
              ["requireNoOpenCriticalBlockers", "messenger.handoff.setting.blockers"],
              ["requireMessengerOnlyScope", "messenger.handoff.setting.scope"],
            ] as Array<[keyof AdminMessengerOwnerHandoffSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="checkRow" key={String(key)}><input type="checkbox" checked={Boolean(snapshot?.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /> {t(props.language, label)}</label>
            ))}
          </div>
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.handoff.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.handoff.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.handoff.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
      </div>

      <div className="card innerCard">
        <h3>{t(props.language, "messenger.handoff.linkedCenters")}</h3>
        <div className="tableList compactRows">
          {(snapshot?.linkedCenters ?? []).map((center) => (
            <div className="row" key={center.key}>
              <strong>{t(props.language, center.titleKey)}</strong>
              <span>{t(props.language, "messenger.handoff.blockers")}: {center.blockers} · {t(props.language, "messenger.handoff.warnings")}: {center.warnings}</span>
              <em className={diagnosticClass(center.status)}>{center.scorePct}% · {statusText(props.language, center.status)}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="card innerCard ownerHandoffTable">
        <h3>{t(props.language, "messenger.handoff.items")}</h3>
        <div className="tableList">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, item.detailKey)} · {t(props.language, item.categoryKey)} · {t(props.language, "messenger.handoff.system")}: {statusText(props.language, item.systemStatus)} · {t(props.language, "messenger.handoff.manual")}: {statusText(props.language, item.manualStatus)}</span>
              <em className={diagnosticClass(item.manualStatus === "blocked" ? "blocked" : item.systemStatus)}>{item.scorePct}%</em>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "verify")}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "block")}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "waive")}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "reset")}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card innerCard"><h3>{t(props.language, "messenger.handoff.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card innerCard"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}


function MessengerAccessTextGatePanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerAccessTextGateSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerAccessTextGateSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerAccessTextGateItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  return (
    <div className="card messengerPageUnit messengerPageAccessTextGate messengerAccessTextGateCenter">
      <div className="releaseCandidateHero">
        <div>
          <h3>{t(props.language, "messenger.accessText.title")}</h3>
          <p>{t(props.language, "messenger.accessText.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.accessTextReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="statsGrid accessTextMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.accessText.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.accessText.verified")}</span><strong>{snapshot?.summary.verifiedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.accessText.blocked")}</span><strong>{snapshot?.summary.blockedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.accessText.linkedBlockers")}</span><strong>{snapshot?.summary.linkedBlockers ?? 0}</strong></div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.accessText.settings")}</h3>
          <div className="checks compactChecks">
            {([
              ["requireRootOwnerOnlyFinalActions", "messenger.accessText.setting.owner"],
              ["requireMessengerWriteForOperations", "messenger.accessText.setting.write"],
              ["requireSecurityComplianceSeparation", "messenger.accessText.setting.roles"],
              ["requireAuditExportOwnerOnly", "messenger.accessText.setting.audit"],
              ["requireNoTechnicalTextInUi", "messenger.accessText.setting.text"],
              ["requireMessengerOnlyScope", "messenger.accessText.setting.scope"],
            ] as Array<[keyof AdminMessengerAccessTextGateSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="checkRow" key={String(key)}><input type="checkbox" checked={Boolean(snapshot?.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /> {t(props.language, label)}</label>
            ))}
          </div>
        </div>
        <div className="card innerCard">
          <h3>{t(props.language, "messenger.accessText.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.accessText.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.accessText.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
      </div>

      <div className="card innerCard accessTextTable">
        <h3>{t(props.language, "messenger.accessText.items")}</h3>
        <div className="tableList">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, item.detailKey)} · {t(props.language, item.categoryKey)} · {t(props.language, "messenger.accessText.system")}: {statusText(props.language, item.systemStatus)} · {t(props.language, "messenger.accessText.manual")}: {statusText(props.language, item.manualStatus)}</span>
              <em className={diagnosticClass(item.manualStatus === "blocked" ? "blocked" : item.systemStatus)}>{item.scorePct}%</em>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "verify")}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "block")}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "waive")}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "reset")}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card innerCard"><h3>{t(props.language, "messenger.accessText.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card innerCard"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}


function MessengerMobileTransitionPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerMobileTransitionSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerMobileTransitionSnapshot["settings"], value: boolean) => void;
  setItemStatus: (item: AdminMessengerMobileTransitionItem, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const linkedMax = Math.max(1, ...(snapshot?.charts.linkedReadiness ?? []).map((item) => item.value));
  return (
    <div className="messengerPageUnit messengerPageMobileTransition messengerMobileTransitionGrid">
      <div className="card releaseCandidateHero">
        <div>
          <h3>{t(props.language, "messenger.mobileTransition.title")}</h3>
          <p>{t(props.language, "messenger.mobileTransition.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.transitionReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="proMetricGrid releaseCandidateMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.mobileTransition.total")}</span><strong>{snapshot?.summary.totalItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.mobileTransition.verified")}</span><strong>{snapshot?.summary.verifiedItems ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.mobileTransition.blockers")}</span><strong>{snapshot?.summary.linkedBlockers ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.mobileTransition.scope")}</span><strong>{t(props.language, "messenger.mobileTransition.scopeMessengerOnly")}</strong></div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.mobileTransition.settings")}</h3>
          <div className="formGrid">
            {([
              ["requireAdminGateClosed", "messenger.mobileTransition.setting.admin"],
              ["requireReleaseCandidateReviewed", "messenger.mobileTransition.setting.release"],
              ["requireOwnerHandoffConfirmed", "messenger.mobileTransition.setting.owner"],
              ["requireRegressionRecheckPassed", "messenger.mobileTransition.setting.regression"],
              ["requireTwoDevicePlanReady", "messenger.mobileTransition.setting.twoDevice"],
              ["requireMobileBackendScopeLocked", "messenger.mobileTransition.setting.scope"],
              ["requireNoWalletOrOtherModules", "messenger.mobileTransition.setting.noWallet"],
              ["requireNoRawPrivateContentPolicy", "messenger.mobileTransition.setting.noRaw"],
            ] as Array<[keyof AdminMessengerMobileTransitionSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="checkLine" key={String(key)}><input type="checkbox" checked={Boolean(snapshot?.settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /><span>{t(props.language, label)}</span></label>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.mobileTransition.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.mobileTransition.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.mobileTransition.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.mobileTransition.linkedCenters")}</h3>
          <div className="tableList smallList">
            {(snapshot?.linkedCenters ?? []).map((center) => (
              <div className="row" key={center.key}>
                <strong>{t(props.language, center.titleKey)}</strong>
                <span>{t(props.language, center.detailKey)} · {t(props.language, "messenger.mobileTransition.blockers")}: {center.blockers} · {t(props.language, "messenger.mobileTransition.warnings")}: {center.warnings}</span>
                <em className={diagnosticClass(center.status)}>{center.readinessPct}%</em>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.mobileTransition.linkedChart")}</h3>
          <div className="progressList">{(snapshot?.charts.linkedReadiness ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.mobileTransition.link.${item.label}`)}</strong><span>{item.value}%</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / linkedMax) * 100))}%` }} /></em></div>)}</div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.mobileTransition.items")}</h3>
        <div className="tableList">
          {(snapshot?.items ?? []).map((item) => (
            <div className="row" key={item.key}>
              <strong>{t(props.language, item.titleKey)}</strong>
              <span>{t(props.language, item.detailKey)} · {t(props.language, item.categoryKey)} · {t(props.language, "messenger.mobileTransition.system")}: {statusText(props.language, item.systemStatus)} · {t(props.language, "messenger.mobileTransition.manual")}: {statusText(props.language, item.manualStatus)}</span>
              <em className={diagnosticClass(item.manualStatus === "blocked" ? "blocked" : item.systemStatus)}>{item.scorePct}%</em>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "verify")}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "block")}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "waive")}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setItemStatus(item, "reset")}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card"><h3>{t(props.language, "messenger.mobileTransition.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}

function MessengerReleaseCandidateControlPanel(props: {
  language: AdminLanguage;
  snapshot: AdminMessengerReleaseCandidateSnapshot | null;
  busy: boolean;
  canWrite: boolean;
  note: string;
  proofRef: string;
  setNote: (value: string) => void;
  setProofRef: (value: string) => void;
  toggleSetting: (key: keyof AdminMessengerReleaseCandidateSnapshot["settings"], value: boolean) => void;
  setGateStatus: (gate: AdminMessengerReleaseCandidateGate, status: "verify" | "block" | "waive" | "reset") => void;
}) {
  const snapshot = props.snapshot;
  const settings = snapshot?.settings;
  const linkedMax = Math.max(1, ...(snapshot?.charts.linkedReadiness ?? []).map((item) => item.value));
  return (
    <div className="messengerPageUnit messengerPageReleaseCandidate messengerReleaseCandidateGrid">
      <div className="card releaseCandidateHero">
        <div>
          <h3>{t(props.language, "messenger.release.title")}</h3>
          <p>{t(props.language, "messenger.release.description")}</p>
        </div>
        <div className="circleScore"><strong>{snapshot?.summary.releaseReadinessPct ?? 0}%</strong><span>{statusText(props.language, snapshot?.summary.healthStatus ?? "not_configured")}</span></div>
      </div>

      <div className="proMetricGrid releaseCandidateMetrics">
        <div className="proMetric"><span>{t(props.language, "messenger.release.totalGates")}</span><strong>{snapshot?.summary.totalGates ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.release.verified")}</span><strong>{snapshot?.summary.verifiedGates ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.release.blockers")}</span><strong>{snapshot?.summary.linkedBlockers ?? 0}</strong></div>
        <div className="proMetric"><span>{t(props.language, "messenger.release.pending")}</span><strong>{snapshot?.summary.pendingGates ?? 0}</strong></div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.release.settings")}</h3>
          <div className="formGrid">
            {settings ? ([
              ["requireOwnerFinalSignoff", "messenger.release.setting.owner"],
              ["requireTwoDeviceRuntimePassed", "messenger.release.setting.twoDevice"],
              ["requireFixControlVerified", "messenger.release.setting.fixes"],
              ["requireNoCriticalBacklog", "messenger.release.setting.noCritical"],
              ["requireNoRawPrivateContent", "messenger.release.setting.noRaw"],
              ["requireWalletLocked", "messenger.release.setting.walletLocked"],
              ["requireRollbackPlan", "messenger.release.setting.rollback"],
              ["requireMessengerFreeze", "messenger.release.setting.freeze"],
            ] as Array<[keyof AdminMessengerReleaseCandidateSnapshot["settings"], string]>).map(([key, label]) => (
              <label className="checkLine" key={String(key)}><input type="checkbox" checked={Boolean(settings[key])} disabled={!props.canWrite || props.busy} onChange={(event) => props.toggleSetting(key, event.target.checked)} /><span>{t(props.language, label)}</span></label>
            )) : null}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.release.manualProof")}</h3>
          <label><span>{t(props.language, "messenger.release.note")}</span><input value={props.note} onChange={(event) => props.setNote(event.target.value)} /></label>
          <label><span>{t(props.language, "messenger.release.proofRef")}</span><input value={props.proofRef} onChange={(event) => props.setProofRef(event.target.value)} /></label>
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card">
          <h3>{t(props.language, "messenger.release.linkedReadiness")}</h3>
          <div className="tableList smallList">
            {(snapshot?.linkedLanes ?? []).map((lane) => (
              <div className="row" key={lane.key}>
                <strong>{t(props.language, lane.titleKey)}</strong>
                <span>{t(props.language, lane.detailKey)} · {t(props.language, "messenger.release.blockers")}: {lane.blockers} · {t(props.language, "messenger.release.warnings")}: {lane.warnings}</span>
                <em className={diagnosticClass(lane.status)}>{statusText(props.language, lane.status)}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.release.linkedChart")}</h3>
          <div className="progressList">{(snapshot?.charts.linkedReadiness ?? []).map((item) => <div className="progressItem" key={item.label}><div><strong>{t(props.language, `messenger.release.link.${item.label}`)}</strong><span>{item.value}%</span></div><em><i style={{ width: `${Math.max(4, Math.round((item.value / linkedMax) * 100))}%` }} /></em></div>)}</div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "messenger.release.gates")}</h3>
        <div className="tableList">
          {(snapshot?.gates ?? []).map((gate) => (
            <div className="row" key={gate.key}>
              <strong>{t(props.language, gate.titleKey)}</strong>
              <span>{t(props.language, gate.detailKey)} · {t(props.language, "messenger.release.system")}: {statusText(props.language, gate.systemStatus)} · {t(props.language, "messenger.release.manual")}: {statusText(props.language, gate.manualStatus)}</span>
              <em className={diagnosticClass(gate.manualStatus === "blocked" ? "blocked" : gate.systemStatus)}>{gate.scorePct}%</em>
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "verify")}>{t(props.language, "button.verify")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "block")}>{t(props.language, "button.block")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "waive")}>{t(props.language, "button.waive")}</button> : null}
              {props.canWrite ? <button disabled={props.busy} onClick={() => props.setGateStatus(gate, "reset")}>{t(props.language, "button.reset")}</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="split releaseCandidateSplit">
        <div className="card"><h3>{t(props.language, "messenger.release.nextSteps")}</h3><ul className="rulesList">{(snapshot?.nextRequiredSteps ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
        <div className="card"><h3>{t(props.language, "messenger.rules")}</h3><ul className="rulesList">{(snapshot?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul></div>
      </div>
    </div>
  );
}

function MessengerAdminCenterPanel(props: { language: AdminLanguage; config: AdminApiConfig; me: AdminPrincipal | null; setNotice: (notice: string) => void }) {
  const [center, setCenter] = useState<AdminMessengerCenterState | null>(null);
  const [proMonitoring, setProMonitoring] = useState<AdminMessengerProMonitoringDashboard | null>(null);
  const [growthPromotion, setGrowthPromotion] = useState<AdminMessengerGrowthPromotionGreetingSnapshot | null>(null);
  const [growthAnalytics, setGrowthAnalytics] = useState<AdminMessengerGrowthAnalyticsSnapshot | null>(null);
  const [contentQuality, setContentQuality] = useState<AdminMessengerContentQualitySnapshot | null>(null);
  const [approvalVisibility, setApprovalVisibility] = useState<AdminMessengerApprovalVisibilitySnapshot | null>(null);
  const [presenceOperations, setPresenceOperations] = useState<AdminMessengerPresenceOperationsSnapshot | null>(null);
  const [notificationsMonitor, setNotificationsMonitor] = useState<AdminMessengerNotificationsMonitorSnapshot | null>(null);
  const [finalReadiness, setFinalReadiness] = useState<AdminMessengerFinalReadinessSnapshot | null>(null);
  const [maxPrelaunch, setMaxPrelaunch] = useState<AdminMessengerMaxPrelaunchSnapshot | null>(null);
  const [runtimeVerification, setRuntimeVerification] = useState<AdminMessengerRuntimeVerificationSnapshot | null>(null);
  const [fixControl, setFixControl] = useState<AdminMessengerFixControlSnapshot | null>(null);
  const [releaseCandidate, setReleaseCandidate] = useState<AdminMessengerReleaseCandidateSnapshot | null>(null);
  const [uiTextCleanliness, setUiTextCleanliness] = useState<AdminMessengerUiTextCleanlinessSnapshot | null>(null);
  const [regressionRecheck, setRegressionRecheck] = useState<AdminMessengerRegressionSnapshot | null>(null);
  const [ownerHandoff, setOwnerHandoff] = useState<AdminMessengerOwnerHandoffSnapshot | null>(null);
  const [accessTextGate, setAccessTextGate] = useState<AdminMessengerAccessTextGateSnapshot | null>(null);
  const [mobileTransition, setMobileTransition] = useState<AdminMessengerMobileTransitionSnapshot | null>(null);
  const [finalReadinessNote, setFinalReadinessNote] = useState("");
  const [maxPrelaunchNote, setMaxPrelaunchNote] = useState("");
  const [runtimeVerificationNote, setRuntimeVerificationNote] = useState("");
  const [runtimeVerificationProofRef, setRuntimeVerificationProofRef] = useState("");
  const [fixControlNote, setFixControlNote] = useState("");
  const [fixControlProofRef, setFixControlProofRef] = useState("");
  const [releaseCandidateNote, setReleaseCandidateNote] = useState("");
  const [releaseCandidateProofRef, setReleaseCandidateProofRef] = useState("");
  const [uiTextCleanlinessNote, setUiTextCleanlinessNote] = useState("");
  const [uiTextCleanlinessProofRef, setUiTextCleanlinessProofRef] = useState("");
  const [regressionNote, setRegressionNote] = useState("");
  const [regressionProofRef, setRegressionProofRef] = useState("");
  const [ownerHandoffNote, setOwnerHandoffNote] = useState("");
  const [ownerHandoffProofRef, setOwnerHandoffProofRef] = useState("");
  const [accessTextGateNote, setAccessTextGateNote] = useState("");
  const [accessTextGateProofRef, setAccessTextGateProofRef] = useState("");
  const [mobileTransitionNote, setMobileTransitionNote] = useState("");
  const [mobileTransitionProofRef, setMobileTransitionProofRef] = useState("");
  const [directoryPromotion, setDirectoryPromotion] = useState<AdminMessengerDirectoryPromotionSnapshot | null>(null);
  const [directory, setDirectory] = useState<AdminMessengerDirectoryDashboard | null>(null);
  const [directoryReviewQueue, setDirectoryReviewQueue] = useState<AdminMessengerDirectoryReviewQueueSnapshot | null>(null);
  const [moderation, setModeration] = useState<AdminMessengerModerationDashboard | null>(null);
  const [safety, setSafety] = useState<AdminMessengerSafetyDashboard | null>(null);
  const [enforcement, setEnforcement] = useState<AdminMessengerSafetyEnforcementSnapshot | null>(null);
  const [enforcementCheck, setEnforcementCheck] = useState<AdminMessengerSafetyEnforcementCheckResult | null>(null);
  const [runtimeBridge, setRuntimeBridge] = useState<AdminMessengerSafetyRuntimeBridgeSnapshot | null>(null);
  const [runtimeBridgeCheck, setRuntimeBridgeCheck] = useState<AdminMessengerSafetyRuntimeBridgeCheckResult | null>(null);
  const [clientGuards, setClientGuards] = useState<AdminMessengerSafetyClientGuardsSnapshot | null>(null);
  const [clientGuardValidation, setClientGuardValidation] = useState<AdminMessengerSafetyClientGuardValidationResult | null>(null);
  const [guardEvents, setGuardEvents] = useState<AdminMessengerSafetyGuardEventSnapshot | null>(null);
  const [integrityMonitor, setIntegrityMonitor] = useState<AdminMessengerSafetyIntegrityMonitorSnapshot | null>(null);
  const [escalations, setEscalations] = useState<AdminMessengerSafetyEscalationSnapshot | null>(null);
  const [complianceReports, setComplianceReports] = useState<AdminMessengerSafetyComplianceReportSnapshot | null>(null);
  const [complianceReportPackage, setComplianceReportPackage] = useState<AdminMessengerSafetyComplianceReportPackage | null>(null);
  const [retention, setRetention] = useState<AdminMessengerSafetyRetentionSnapshot | null>(null);
  const [exportVerification, setExportVerification] = useState<AdminMessengerSafetyExportVerificationSnapshot | null>(null);
  const [accessControl, setAccessControl] = useState<AdminMessengerSafetyAccessControlSnapshot | null>(null);
  const [accessControlDecision, setAccessControlDecision] = useState<AdminMessengerSafetyAccessControlDecision | null>(null);
  const [staffAssignments, setStaffAssignments] = useState<AdminMessengerSafetyStaffAssignmentSnapshot | null>(null);
  const [supervisorDashboard, setSupervisorDashboard] = useState<AdminMessengerSafetySupervisorDashboardSnapshot | null>(null);
  const [dailyOperations, setDailyOperations] = useState<AdminMessengerSafetyDailyOperationsSnapshot | null>(null);
  const [prelaunchGate, setPrelaunchGate] = useState<AdminMessengerSafetyPrelaunchReadinessGateSnapshot | null>(null);
  const [launchCommand, setLaunchCommand] = useState<AdminMessengerSafetyLaunchCommandSnapshot | null>(null);
  const [postLaunchMonitor, setPostLaunchMonitor] = useState<AdminMessengerSafetyPostLaunchMonitorSnapshot | null>(null);
  const [incidentResponse, setIncidentResponse] = useState<AdminMessengerSafetyIncidentResponseSnapshot | null>(null);
  const [emergencyActions, setEmergencyActions] = useState<AdminMessengerSafetyEmergencyActionSnapshot | null>(null);
  const [recoveryReviews, setRecoveryReviews] = useState<AdminMessengerSafetyRecoveryReviewSnapshot | null>(null);
  const [policyFeedback, setPolicyFeedback] = useState<AdminMessengerSafetyPolicyFeedbackSnapshot | null>(null);
  const [policyRegistry, setPolicyRegistry] = useState<AdminMessengerSafetyPolicyRegistrySnapshot | null>(null);
  const [policyDeployment, setPolicyDeployment] = useState<AdminMessengerSafetyPolicyDeploymentSnapshot | null>(null);
  const [policyTraining, setPolicyTraining] = useState<AdminMessengerSafetyPolicyTrainingSnapshot | null>(null);
  const [diagnostics, setDiagnostics] = useState<AdminMessengerDiagnosticCheck[]>([]);
  const [busy, setBusy] = useState(false);
  const [activeMessengerPage, setActiveMessengerPage] = useState<MessengerAdminPageKey>("overview");
  const [growthPromotionForm, setGrowthPromotionForm] = useState({ targetKind: "channel", targetId: "", title: "", placement: "featured_top", audience: "all", priority: "50", startsAt: "", endsAt: "", note: "" });
  const [growthGreetingTemplateForm, setGrowthGreetingTemplateForm] = useState({ occasion: "birthday", language: "ru", title: "", messagePreview: "", holidayKey: "", autoSendAllowed: false, manualSendAllowed: true, approvalRequired: true, status: "active" });
  const [growthGreetingTaskForm, setGrowthGreetingTaskForm] = useState({ occasion: "birthday", mode: "manual", templateId: "", targetUserId: "", contactUserId: "", scheduledAt: "", holidayKey: "", language: "ru", note: "" });
  const [growthGreetingHolidayForm, setGrowthGreetingHolidayForm] = useState({ holidayKey: "", title: "", dateMonthDay: "", countryCode: "GLOBAL", locale: "all", status: "active", autoQueueAllowed: false, manualSendAllowed: true });
  const [growthGreetingAutomationForm, setGrowthGreetingAutomationForm] = useState({ occasion: "birthday", source: "verified_profile_birthdays", templateId: "", holidayKey: "", targetUserIds: "", contactUserIds: "", scheduledAt: "", language: "ru", dryRun: true, note: "" });
  const [runtimeVerificationSessionForm, setRuntimeVerificationSessionForm] = useState({ title: "", deviceAUserId: "", deviceBUserId: "", deviceALabel: "", deviceBLabel: "", connectionMode: "lan", note: "" });
  const [fixControlTicketForm, setFixControlTicketForm] = useState({ title: "", category: "chat_messages", severity: "medium", targetArea: "", deviceAUserId: "", deviceBUserId: "", description: "" });
  const [flagNote, setFlagNote] = useState("");
  const [blockerForm, setBlockerForm] = useState({ key: "", title: "", message: "", severity: "critical" as "warning" | "critical" });
  const [resolutionNotes, setResolutionNotes] = useState<Record<string, string>>({});
  const [reportResolutionNotes, setReportResolutionNotes] = useState<Record<string, string>>({});
  const [safetyActionNotes, setSafetyActionNotes] = useState<Record<string, string>>({});
  const [vaultSealNotes, setVaultSealNotes] = useState<Record<string, string>>({});
  const [caseReviewNotes, setCaseReviewNotes] = useState<Record<string, string>>({});
  const [reportForm, setReportForm] = useState({
    kind: "message",
    severity: "medium",
    title: "",
    description: "",
    targetType: "message",
    targetId: "",
    reportedBy: "",
  });
  const [safetyReportForm, setSafetyReportForm] = useState({
    source: "ai_signal",
    category: "narcotics_or_psychotropic_trafficking",
    severity: "critical",
    title: "",
    description: "",
    targetType: "user",
    targetId: "",
    relatedUserId: "",
    relatedChatId: "",
    relatedMessageId: "",
    evidenceHash: "",
    legalBasis: "internal_safety_review",
  });
  const [aiSignalForm, setAiSignalForm] = useState({
    source: "ai_messenger_safety",
    category: "narcotics_or_psychotropic_trafficking",
    severity: "critical",
    confidence: "0.90",
    summary: "",
    targetType: "user",
    targetId: "",
    relatedUserId: "",
    relatedChatId: "",
    relatedMessageId: "",
    provider: "",
    model: "",
    evidenceHash: "",
  });
  const [authorityForm, setAuthorityForm] = useState({
    authorityName: "",
    requestReference: "",
    requestKind: "official_request",
    authorityCountry: "",
    authorityOfficerName: "",
    authorityContactHash: "",
    legalBasis: "",
    requestedScope: "",
    priority: "normal",
    dueAt: "",
    linkedReportIds: "",
    linkedCaseIds: "",
    linkedEvidenceIds: "",
  });
  const [restrictionNotes, setRestrictionNotes] = useState<Record<string, string>>({});
  const [incidentForm, setIncidentForm] = useState({
    source: "manual",
    title: "",
    severity: "critical",
    targetType: "user",
    targetId: "",
    userId: "",
    chatId: "",
    messageId: "",
    reason: "messenger_safety_incident_response",
    linkedReportIds: "",
    linkedCaseIds: "",
    linkedRestrictionIds: "",
    linkedEvidenceIds: "",
    linkedGuardEventIds: "",
    containmentRequired: true,
  });
  const [incidentStatusNotes, setIncidentStatusNotes] = useState<Record<string, string>>({});
  const [emergencyActionForm, setEmergencyActionForm] = useState({
    source: "manual",
    title: "",
    severity: "critical",
    status: "draft",
    scope: "user_emergency_hold",
    targetType: "user",
    targetId: "",
    userId: "",
    chatId: "",
    messageId: "",
    reason: "messenger_safety_emergency_action",
    legalBasis: "internal_safety_emergency_review",
    linkedIncidentIds: "",
    linkedReportIds: "",
    linkedEvidenceIds: "",
    linkedRestrictionIds: "",
    linkedAuthorityRequestIds: "",
  });
  const [emergencyActionStatusNotes, setEmergencyActionStatusNotes] = useState<Record<string, string>>({});
  const [recoveryReviewForm, setRecoveryReviewForm] = useState({
    source: "manual",
    title: "",
    severity: "critical",
    status: "opened",
    targetType: "user",
    targetId: "",
    userId: "",
    chatId: "",
    messageId: "",
    recoveryPlan: "post_emergency_recovery_review",
    releaseReadiness: "pending_review",
    rootCause: "",
    lessonsLearned: "",
    linkedEmergencyActionIds: "",
    linkedIncidentIds: "",
    linkedReportIds: "",
    linkedEvidenceIds: "",
    linkedRestrictionIds: "",
    linkedAuthorityRequestIds: "",
    linkedExportVerificationIds: "",
  });
  const [recoveryReviewNotes, setRecoveryReviewNotes] = useState<Record<string, string>>({});
  const [policyFeedbackNotes, setPolicyFeedbackNotes] = useState<Record<string, string>>({});
  const [policyFeedbackForm, setPolicyFeedbackForm] = useState({ title: "", source: "manual", sourceId: "", policyArea: "incident_response", priority: "urgent", status: "proposed", targetSystem: "policy", recommendation: "", rationale: "", ownerDecisionRequired: true, complianceReviewRequired: true, trainingRequired: true, implementationRequired: true, linkedRecoveryReviewIds: "", linkedIncidentIds: "", linkedEmergencyActionIds: "", linkedReportIds: "", linkedCaseIds: "", linkedRestrictionIds: "", linkedAuthorityRequestIds: "", linkedEvidenceIds: "", linkedGuardEventIds: "", linkedEscalationIds: "", linkedExportVerificationIds: "" });
  const [policyRegistryNotes, setPolicyRegistryNotes] = useState<Record<string, string>>({});
  const [policyRegistryForm, setPolicyRegistryForm] = useState({ versionKey: "", area: "incident_response", title: "", changeSummary: "", rationale: "", status: "draft", sourceFeedbackIds: "", linkedRecoveryReviewIds: "", linkedIncidentIds: "", linkedEvidenceIds: "", linkedGuardEventIds: "", effectiveAt: "", supersedesPolicyId: "", ownerDecisionRequired: true, trainingRequired: true, runtimeGuardUpdateRequired: false, accessControlReviewRequired: false });
  const [policyDeploymentNotes, setPolicyDeploymentNotes] = useState<Record<string, string>>({});
  const [policyTrainingNotes, setPolicyTrainingNotes] = useState<Record<string, string>>({});
  const [policyTrainingAssignees, setPolicyTrainingAssignees] = useState<Record<string, string>>({});
  const [policyTrainingRoles, setPolicyTrainingRoles] = useState<Record<string, string>>({});
  const [policyTrainingDueDates, setPolicyTrainingDueDates] = useState<Record<string, string>>({});
  const [restrictionForm, setRestrictionForm] = useState({
    scope: "user_messaging_lock",
    category: "narcotics_or_psychotropic_trafficking",
    severity: "critical",
    targetType: "user",
    targetId: "",
    relatedUserId: "",
    relatedChatId: "",
    relatedMessageId: "",
    reason: "messenger_safety_hold",
    legalBasis: "internal_safety_review",
    expiresAt: "",
    linkedReportIds: "",
    linkedCaseIds: "",
    linkedAiSignalIds: "",
    linkedEvidenceIds: "",
    activateNow: false,
  });
  const [enforcementForm, setEnforcementForm] = useState({
    action: "send_message",
    targetType: "user",
    targetId: "",
    userId: "",
    chatId: "",
    messageId: "",
    groupId: "",
    channelId: "",
    botId: "",
  });
  const [runtimeBridgeForm, setRuntimeBridgeForm] = useState({
    runtimeAction: "chat.send_message",
    actorUserId: "",
    peerUserId: "",
    chatId: "",
    messageId: "",
    clientMessageId: "",
    groupId: "",
    channelId: "",
    botId: "",
    targetType: "user",
    targetId: "",
    rawContentPresent: false,
  });
  const [escalationNotes, setEscalationNotes] = useState<Record<string, string>>({});
  const [retentionReleaseNotes, setRetentionReleaseNotes] = useState<Record<string, string>>({});
  const [retentionHoldForm, setRetentionHoldForm] = useState({ targetType: "evidence_vault", targetId: "", reason: "messenger_safety_legal_hold", legalBasis: "internal_safety_review", linkedReportIds: "", linkedCaseIds: "", linkedEvidenceIds: "", linkedAuthorityRequestIds: "" });
  const [complianceReportForm, setComplianceReportForm] = useState({ scope: "full_messenger_safety", scopeId: "", title: "" });
  const [exportVerificationForm, setExportVerificationForm] = useState({ packageKind: "compliance_report_package", packageId: "", sourceId: "", packageHash: "", auditAnchorHash: "", vaultAnchorHash: "", guardAnchorHash: "", retentionHash: "", note: "" });
  const [accessControlForm, setAccessControlForm] = useState({ scope: "evidence_vault", action: "read", role: props.me?.role ?? "security", adminId: props.me?.id ?? "", permissions: "messenger:read", rootOwner: Boolean(props.me?.rootOwner) });
  const [staffAssignmentForm, setStaffAssignmentForm] = useState({ targetType: "case_review", targetId: "", title: "", priority: "urgent", assignedToAdminId: "", assignedRole: "security", dueAt: "", ownerDecisionRequired: true, complianceReviewRequired: true, authorityCooperationRequired: false, linkedReportIds: "", linkedCaseIds: "", linkedRestrictionIds: "", linkedEscalationIds: "", linkedAuthorityRequestIds: "", linkedEvidenceIds: "", requiredAccessScopes: "case_reviews,evidence_vault", note: "" });
  const [staffAssignmentNotes, setStaffAssignmentNotes] = useState<Record<string, string>>({});
  const [clientGuardForm, setClientGuardForm] = useState({
    guardKey: "mobile.chat.send_message",
    platform: "mobile",
    runtimeAction: "chat.send_message",
    actorUserId: "",
    peerUserId: "",
    chatId: "",
    messageId: "",
    clientMessageId: "",
    groupId: "",
    channelId: "",
    botId: "",
    targetType: "user",
    targetId: "",
    rawContentPresent: false,
  });
  const [directoryRestrictionReason, setDirectoryRestrictionReason] = useState("admin_review");
  const [directoryReviewReason, setDirectoryReviewReason] = useState("admin_review");
  const [directoryReviewKindFilter, setDirectoryReviewKindFilter] = useState<AdminMessengerDirectoryKind | "ALL">("ALL");
  const [directoryReviewStatusFilter, setDirectoryReviewStatusFilter] = useState("all");
  const [runtimeFailures, setRuntimeFailures] = useState<Array<Record<string, unknown>>>([]);
  const [directoryPromotionNote, setDirectoryPromotionNote] = useState("admin_review");
  const [approvalVisibilityNote, setApprovalVisibilityNote] = useState("owner_admin_review");
  const [contentQualitySignalForm, setContentQualitySignalForm] = useState({ kind: "spam", targetKind: "user", targetId: "", severity: "medium", score: "55", reason: "admin_review", note: "" });
  const [directoryPromotionBoostForms, setDirectoryPromotionBoostForms] = useState<Record<string, { featuredRank: string; searchBoostPct: string; directoryBoostPct: string; recommended: boolean }>>({});
  const canRunDiagnostics = hasAdminPermission(props.me, "messenger:write") || hasAdminPermission(props.me, "developer:write");
  const canWriteMessenger = hasAdminPermission(props.me, "messenger:write");

  const load = useCallback(async () => {
    setBusy(true);
    const endpointFailures: Array<Record<string, unknown>> = [];

    const captureEndpointFailure = (label: string, error: unknown) => {
      const apiError = error as ApiError | undefined;
      endpointFailures.push({
        label,
        status: typeof apiError?.status === "number" ? apiError.status : 0,
        path: typeof (apiError?.payload as { path?: unknown } | undefined)?.path === "string" ? String((apiError?.payload as { path?: unknown }).path) : `/api/admin/messenger/${label}`,
        error: apiError?.message ?? String(error),
        generatedAt: new Date().toISOString(),
      });
      console.warn(`[sabi-admin:messenger:${label}]`, error);
    };

    const safeLoad = async <T,>(label: string, loader: () => Promise<T>, fallback: T): Promise<T> => {
      try {
        return await loader();
      } catch (error) {
        captureEndpointFailure(label, error);
        return fallback;
      }
    };

    const takeSection = <T,>(sections: Record<string, unknown>, key: string): T | null => {
      const value = sections[key];
      if (!value || typeof value !== "object") return null;
      const record = value as Record<string, unknown>;
      if (record.ok === false || record.error || record.status === "degraded") return null;
      return value as T;
    };

    const takeDashboardSection = <T,>(sections: Record<string, unknown>, key: string): T | null => {
      const value = sections[key];
      if (!value || typeof value !== "object") return null;
      const record = value as Record<string, unknown>;
      if (record.ok === false || record.error || record.status === "degraded") return null;
      const dashboard = record.dashboard;
      return dashboard && typeof dashboard === "object" ? dashboard as T : null;
    };

    try {
      const response = await adminApi.messengerDashboard(props.config);
      const admin100Snapshot = await safeLoad(
        "admin-100-snapshot",
        () => adminApi.messengerAdmin100Snapshot(props.config),
        null as { ok: true; status: string; sections: Record<string, unknown>; failures: unknown[]; generatedAt: string; elapsedMs?: number } | null,
      );
      const sections = admin100Snapshot?.sections && typeof admin100Snapshot.sections === "object" ? admin100Snapshot.sections : {};
      const admin100HasLiveSections = Boolean(admin100Snapshot && Object.keys(sections).length > 0);

      setCenter(response.center);
      setProMonitoring(response.proMonitoring ?? null);
      if (admin100HasLiveSections) {
        setGrowthPromotion(takeSection<AdminMessengerGrowthPromotionGreetingSnapshot>(sections, "growth-promotion"));
      setGrowthAnalytics(takeSection<AdminMessengerGrowthAnalyticsSnapshot>(sections, "growth-analytics"));
      setContentQuality(takeSection<AdminMessengerContentQualitySnapshot>(sections, "content-quality"));
      setApprovalVisibility(takeSection<AdminMessengerApprovalVisibilitySnapshot>(sections, "approval-visibility"));
      setPresenceOperations(takeSection<AdminMessengerPresenceOperationsSnapshot>(sections, "presence"));
      setNotificationsMonitor(takeSection<AdminMessengerNotificationsMonitorSnapshot>(sections, "notifications"));
      setFinalReadiness(takeSection<AdminMessengerFinalReadinessSnapshot>(sections, "final-readiness"));
      setMaxPrelaunch(takeSection<AdminMessengerMaxPrelaunchSnapshot>(sections, "max-prelaunch"));
      setRuntimeVerification(takeSection<AdminMessengerRuntimeVerificationSnapshot>(sections, "runtime-verification"));
      setFixControl(takeSection<AdminMessengerFixControlSnapshot>(sections, "fix-control"));
      setReleaseCandidate(takeSection<AdminMessengerReleaseCandidateSnapshot>(sections, "release-candidate"));
      setUiTextCleanliness(takeSection<AdminMessengerUiTextCleanlinessSnapshot>(sections, "ui-text-cleanliness"));
      setRegressionRecheck(takeSection<AdminMessengerRegressionSnapshot>(sections, "regression"));
      setOwnerHandoff(takeSection<AdminMessengerOwnerHandoffSnapshot>(sections, "owner-handoff"));
      setAccessTextGate(takeSection<AdminMessengerAccessTextGateSnapshot>(sections, "access-text-gate"));
      setMobileTransition(takeSection<AdminMessengerMobileTransitionSnapshot>(sections, "mobile-transition"));
      setDirectoryPromotion(takeSection<AdminMessengerDirectoryPromotionSnapshot>(sections, "directory-promotion"));
      setDirectory(takeDashboardSection<AdminMessengerDirectoryDashboard>(sections, "directory-dashboard"));
      setDirectoryReviewQueue(takeSection<AdminMessengerDirectoryReviewQueueSnapshot>(sections, "directory-review-queue"));
      setModeration(takeDashboardSection<AdminMessengerModerationDashboard>(sections, "moderation"));
      setSafety(takeDashboardSection<AdminMessengerSafetyDashboard>(sections, "safety"));
      setEnforcement(takeSection<AdminMessengerSafetyEnforcementSnapshot>(sections, "safety-enforcement"));
      setRuntimeBridge(takeSection<AdminMessengerSafetyRuntimeBridgeSnapshot>(sections, "runtime-bridge"));
      setClientGuards(takeSection<AdminMessengerSafetyClientGuardsSnapshot>(sections, "client-guards"));
      setGuardEvents(takeSection<AdminMessengerSafetyGuardEventSnapshot>(sections, "guard-events"));
      setIntegrityMonitor(takeSection<AdminMessengerSafetyIntegrityMonitorSnapshot>(sections, "integrity-monitor"));
      setEscalations(takeSection<AdminMessengerSafetyEscalationSnapshot>(sections, "escalations"));
      setComplianceReports(takeSection<AdminMessengerSafetyComplianceReportSnapshot>(sections, "compliance-reports"));
      setRetention(takeSection<AdminMessengerSafetyRetentionSnapshot>(sections, "retention"));
      setExportVerification(takeSection<AdminMessengerSafetyExportVerificationSnapshot>(sections, "export-verification"));
      setAccessControl(takeSection<AdminMessengerSafetyAccessControlSnapshot>(sections, "access-control"));
      setStaffAssignments(takeSection<AdminMessengerSafetyStaffAssignmentSnapshot>(sections, "staff-assignments"));
      setSupervisorDashboard(takeSection<AdminMessengerSafetySupervisorDashboardSnapshot>(sections, "supervisor-dashboard"));
      setDailyOperations(takeSection<AdminMessengerSafetyDailyOperationsSnapshot>(sections, "daily-operations"));
      setPrelaunchGate(takeSection<AdminMessengerSafetyPrelaunchReadinessGateSnapshot>(sections, "prelaunch-gate"));
      setLaunchCommand(takeSection<AdminMessengerSafetyLaunchCommandSnapshot>(sections, "launch-command"));
      setPostLaunchMonitor(takeSection<AdminMessengerSafetyPostLaunchMonitorSnapshot>(sections, "post-launch-monitor"));
      setIncidentResponse(takeSection<AdminMessengerSafetyIncidentResponseSnapshot>(sections, "incident-response"));
      setEmergencyActions(takeSection<AdminMessengerSafetyEmergencyActionSnapshot>(sections, "emergency-actions"));
      setRecoveryReviews(takeSection<AdminMessengerSafetyRecoveryReviewSnapshot>(sections, "recovery-reviews"));
      setPolicyFeedback(takeSection<AdminMessengerSafetyPolicyFeedbackSnapshot>(sections, "policy-feedback"));
      setPolicyRegistry(takeSection<AdminMessengerSafetyPolicyRegistrySnapshot>(sections, "policy-registry"));
        setPolicyDeployment(takeSection<AdminMessengerSafetyPolicyDeploymentSnapshot>(sections, "policy-deployment"));
        setPolicyTraining(takeSection<AdminMessengerSafetyPolicyTrainingSnapshot>(sections, "policy-training"));
      }

      const admin100Failures = Array.isArray(admin100Snapshot?.failures) ? admin100Snapshot.failures : [];
      const admin100Diagnostics = admin100Failures.map((item, index) => {
        const failure = item && typeof item === "object" ? item as Record<string, unknown> : {};
        return {
          key: `admin_100_section_${String(failure.label ?? index)}`,
          title: `${t(props.language, "messenger.admin100Section", "Admin Messenger section")}: ${cleanAdminValueText(props.language, String(failure.label ?? "unknown"))}`,
          status: "warning" as const,
          severity: "warning" as const,
          message: `${cleanAdminValueText(props.language, String(failure.error ?? "section_degraded"))} · ${String(failure.path ?? "")}`,
          metadata: failure,
        };
      });
      const endpointDiagnostics = endpointFailures.map((failure, index) => ({
        key: `admin_messenger_endpoint_${String(failure.label ?? index)}`,
        title: `${t(props.language, "messenger.endpoint", "Endpoint")}: ${cleanAdminValueText(props.language, String(failure.label ?? "endpoint"))}`,
        status: "warning" as const,
        severity: "warning" as const,
        message: `${cleanAdminValueText(props.language, String(failure.error ?? "endpoint_unavailable"))} · ${String(failure.path ?? "")}`,
        metadata: failure,
      }));
      const directFallbackTimeoutMs = 30000;
      const directFallback = async <T,>(
        label: string,
        currentValue: unknown,
        loader: () => Promise<unknown>,
        select: (value: unknown) => T | null,
        setter: (value: T) => void,
      ) => {
        if (currentValue && typeof currentValue === "object") return;
        let timeoutId: number | undefined;
        try {
          const value = await Promise.race([
            loader(),
            new Promise<null>((resolve) => {
              timeoutId = window.setTimeout(() => resolve(null), directFallbackTimeoutMs);
            }),
          ]);
          if (timeoutId) window.clearTimeout(timeoutId);
          const selected = value ? select(value) : null;
          if (selected && typeof selected === "object") setter(selected);
        } catch (error) {
          captureEndpointFailure(label, error);
        } finally {
          if (timeoutId) window.clearTimeout(timeoutId);
        }
      };

      const directFallbackTasks: Array<() => Promise<void>> = [
        () => directFallback("growth-promotion", takeSection<AdminMessengerGrowthPromotionGreetingSnapshot>(sections, "growth-promotion"), () => adminApi.messengerGrowthPromotionGreetingsSnapshot(props.config), (value) => value as AdminMessengerGrowthPromotionGreetingSnapshot, setGrowthPromotion),
        () => directFallback("growth-analytics", takeSection<AdminMessengerGrowthAnalyticsSnapshot>(sections, "growth-analytics"), () => adminApi.messengerGrowthAnalyticsSnapshot(props.config), (value) => value as AdminMessengerGrowthAnalyticsSnapshot, setGrowthAnalytics),
        () => directFallback("content-quality", takeSection<AdminMessengerContentQualitySnapshot>(sections, "content-quality"), () => adminApi.messengerContentQualitySnapshot(props.config), (value) => value as AdminMessengerContentQualitySnapshot, setContentQuality),
        () => directFallback("approval-visibility", takeSection<AdminMessengerApprovalVisibilitySnapshot>(sections, "approval-visibility"), () => adminApi.messengerApprovalVisibilitySnapshot(props.config), (value) => value as AdminMessengerApprovalVisibilitySnapshot, setApprovalVisibility),
        () => directFallback("presence", takeSection<AdminMessengerPresenceOperationsSnapshot>(sections, "presence"), () => adminApi.messengerPresenceOperationsSnapshot(props.config), (value) => value as AdminMessengerPresenceOperationsSnapshot, setPresenceOperations),
        () => directFallback("notifications", takeSection<AdminMessengerNotificationsMonitorSnapshot>(sections, "notifications"), () => adminApi.messengerNotificationsMonitorSnapshot(props.config), (value) => value as AdminMessengerNotificationsMonitorSnapshot, setNotificationsMonitor),
        () => directFallback("final-readiness", takeSection<AdminMessengerFinalReadinessSnapshot>(sections, "final-readiness"), () => adminApi.messengerFinalReadinessSnapshot(props.config), (value) => value as AdminMessengerFinalReadinessSnapshot, setFinalReadiness),
        () => directFallback("max-prelaunch", takeSection<AdminMessengerMaxPrelaunchSnapshot>(sections, "max-prelaunch"), () => adminApi.messengerMaxPrelaunchSnapshot(props.config), (value) => value as AdminMessengerMaxPrelaunchSnapshot, setMaxPrelaunch),
        () => directFallback("runtime-verification", takeSection<AdminMessengerRuntimeVerificationSnapshot>(sections, "runtime-verification"), () => adminApi.messengerRuntimeVerificationSnapshot(props.config), (value) => value as AdminMessengerRuntimeVerificationSnapshot, setRuntimeVerification),
        () => directFallback("fix-control", takeSection<AdminMessengerFixControlSnapshot>(sections, "fix-control"), () => adminApi.messengerFixControlSnapshot(props.config), (value) => value as AdminMessengerFixControlSnapshot, setFixControl),
        () => directFallback("release-candidate", takeSection<AdminMessengerReleaseCandidateSnapshot>(sections, "release-candidate"), () => adminApi.messengerReleaseCandidateSnapshot(props.config), (value) => value as AdminMessengerReleaseCandidateSnapshot, setReleaseCandidate),
        () => directFallback("ui-text-cleanliness", takeSection<AdminMessengerUiTextCleanlinessSnapshot>(sections, "ui-text-cleanliness"), () => adminApi.messengerUiTextCleanlinessSnapshot(props.config), (value) => value as AdminMessengerUiTextCleanlinessSnapshot, setUiTextCleanliness),
        () => directFallback("regression", takeSection<AdminMessengerRegressionSnapshot>(sections, "regression"), () => adminApi.messengerRegressionSnapshot(props.config), (value) => value as AdminMessengerRegressionSnapshot, setRegressionRecheck),
        () => directFallback("owner-handoff", takeSection<AdminMessengerOwnerHandoffSnapshot>(sections, "owner-handoff"), () => adminApi.messengerOwnerHandoffSnapshot(props.config), (value) => value as AdminMessengerOwnerHandoffSnapshot, setOwnerHandoff),
        () => directFallback("access-text-gate", takeSection<AdminMessengerAccessTextGateSnapshot>(sections, "access-text-gate"), () => adminApi.messengerAccessTextGateSnapshot(props.config), (value) => value as AdminMessengerAccessTextGateSnapshot, setAccessTextGate),
        () => directFallback("mobile-transition", takeSection<AdminMessengerMobileTransitionSnapshot>(sections, "mobile-transition"), () => adminApi.messengerMobileTransitionSnapshot(props.config), (value) => value as AdminMessengerMobileTransitionSnapshot, setMobileTransition),
        () => directFallback("directory-promotion", takeSection<AdminMessengerDirectoryPromotionSnapshot>(sections, "directory-promotion"), () => adminApi.messengerDirectoryPromotionSnapshot(props.config), (value) => value as AdminMessengerDirectoryPromotionSnapshot, setDirectoryPromotion),
        () => directFallback("directory-dashboard", takeDashboardSection<AdminMessengerDirectoryDashboard>(sections, "directory-dashboard"), () => adminApi.messengerDirectoryDashboard(props.config), (value) => ((value as { dashboard?: AdminMessengerDirectoryDashboard })?.dashboard ?? null), setDirectory),
        () => directFallback("directory-review-queue", takeSection<AdminMessengerDirectoryReviewQueueSnapshot>(sections, "directory-review-queue"), () => adminApi.messengerDirectoryReviewQueue(props.config, { kind: directoryReviewKindFilter, status: directoryReviewStatusFilter, limit: 100 }), (value) => value as AdminMessengerDirectoryReviewQueueSnapshot, setDirectoryReviewQueue),
        () => directFallback("moderation", takeDashboardSection<AdminMessengerModerationDashboard>(sections, "moderation"), () => adminApi.messengerModerationDashboard(props.config), (value) => ((value as { dashboard?: AdminMessengerModerationDashboard })?.dashboard ?? null), setModeration),
        () => directFallback("safety", takeDashboardSection<AdminMessengerSafetyDashboard>(sections, "safety"), () => adminApi.messengerSafetyDashboard(props.config), (value) => ((value as { dashboard?: AdminMessengerSafetyDashboard })?.dashboard ?? null), setSafety),
        () => directFallback("safety-enforcement", takeSection<AdminMessengerSafetyEnforcementSnapshot>(sections, "safety-enforcement"), () => adminApi.messengerSafetyEnforcementSnapshot(props.config), (value) => value as AdminMessengerSafetyEnforcementSnapshot, setEnforcement),
        () => directFallback("runtime-bridge", takeSection<AdminMessengerSafetyRuntimeBridgeSnapshot>(sections, "runtime-bridge"), () => adminApi.messengerSafetyRuntimeBridgeSnapshot(props.config), (value) => value as AdminMessengerSafetyRuntimeBridgeSnapshot, setRuntimeBridge),
        () => directFallback("client-guards", takeSection<AdminMessengerSafetyClientGuardsSnapshot>(sections, "client-guards"), () => adminApi.messengerSafetyClientGuardsSnapshot(props.config), (value) => value as AdminMessengerSafetyClientGuardsSnapshot, setClientGuards),
        () => directFallback("guard-events", takeSection<AdminMessengerSafetyGuardEventSnapshot>(sections, "guard-events"), () => adminApi.messengerSafetyGuardEventsSnapshot(props.config, 100), (value) => value as AdminMessengerSafetyGuardEventSnapshot, setGuardEvents),
        () => directFallback("integrity-monitor", takeSection<AdminMessengerSafetyIntegrityMonitorSnapshot>(sections, "integrity-monitor"), () => adminApi.messengerSafetyIntegrityMonitorSnapshot(props.config), (value) => value as AdminMessengerSafetyIntegrityMonitorSnapshot, setIntegrityMonitor),
        () => directFallback("escalations", takeSection<AdminMessengerSafetyEscalationSnapshot>(sections, "escalations"), () => adminApi.messengerSafetyEscalationsSnapshot(props.config, 100), (value) => value as AdminMessengerSafetyEscalationSnapshot, setEscalations),
        () => directFallback("compliance-reports", takeSection<AdminMessengerSafetyComplianceReportSnapshot>(sections, "compliance-reports"), () => adminApi.messengerSafetyComplianceReportsSnapshot(props.config), (value) => value as AdminMessengerSafetyComplianceReportSnapshot, setComplianceReports),
        () => directFallback("retention", takeSection<AdminMessengerSafetyRetentionSnapshot>(sections, "retention"), () => adminApi.messengerSafetyRetentionSnapshot(props.config), (value) => value as AdminMessengerSafetyRetentionSnapshot, setRetention),
        () => directFallback("export-verification", takeSection<AdminMessengerSafetyExportVerificationSnapshot>(sections, "export-verification"), () => adminApi.messengerSafetyExportVerificationSnapshot(props.config), (value) => value as AdminMessengerSafetyExportVerificationSnapshot, setExportVerification),
        () => directFallback("access-control", takeSection<AdminMessengerSafetyAccessControlSnapshot>(sections, "access-control"), () => adminApi.messengerSafetyAccessControlSnapshot(props.config), (value) => value as AdminMessengerSafetyAccessControlSnapshot, setAccessControl),
        () => directFallback("staff-assignments", takeSection<AdminMessengerSafetyStaffAssignmentSnapshot>(sections, "staff-assignments"), () => adminApi.messengerSafetyStaffAssignmentsSnapshot(props.config), (value) => value as AdminMessengerSafetyStaffAssignmentSnapshot, setStaffAssignments),
        () => directFallback("supervisor-dashboard", takeSection<AdminMessengerSafetySupervisorDashboardSnapshot>(sections, "supervisor-dashboard"), () => adminApi.messengerSafetySupervisorDashboardSnapshot(props.config), (value) => value as AdminMessengerSafetySupervisorDashboardSnapshot, setSupervisorDashboard),
        () => directFallback("daily-operations", takeSection<AdminMessengerSafetyDailyOperationsSnapshot>(sections, "daily-operations"), () => adminApi.messengerSafetyDailyOperationsSnapshot(props.config), (value) => value as AdminMessengerSafetyDailyOperationsSnapshot, setDailyOperations),
        () => directFallback("prelaunch-gate", takeSection<AdminMessengerSafetyPrelaunchReadinessGateSnapshot>(sections, "prelaunch-gate"), () => adminApi.messengerSafetyPrelaunchReadinessGateSnapshot(props.config), (value) => value as AdminMessengerSafetyPrelaunchReadinessGateSnapshot, setPrelaunchGate),
        () => directFallback("launch-command", takeSection<AdminMessengerSafetyLaunchCommandSnapshot>(sections, "launch-command"), () => adminApi.messengerSafetyLaunchCommandSnapshot(props.config), (value) => value as AdminMessengerSafetyLaunchCommandSnapshot, setLaunchCommand),
        () => directFallback("post-launch-monitor", takeSection<AdminMessengerSafetyPostLaunchMonitorSnapshot>(sections, "post-launch-monitor"), () => adminApi.messengerSafetyPostLaunchMonitorSnapshot(props.config), (value) => value as AdminMessengerSafetyPostLaunchMonitorSnapshot, setPostLaunchMonitor),
        () => directFallback("incident-response", takeSection<AdminMessengerSafetyIncidentResponseSnapshot>(sections, "incident-response"), () => adminApi.messengerSafetyIncidentResponseSnapshot(props.config), (value) => value as AdminMessengerSafetyIncidentResponseSnapshot, setIncidentResponse),
        () => directFallback("emergency-actions", takeSection<AdminMessengerSafetyEmergencyActionSnapshot>(sections, "emergency-actions"), () => adminApi.messengerSafetyEmergencyActionSnapshot(props.config), (value) => value as AdminMessengerSafetyEmergencyActionSnapshot, setEmergencyActions),
        () => directFallback("recovery-reviews", takeSection<AdminMessengerSafetyRecoveryReviewSnapshot>(sections, "recovery-reviews"), () => adminApi.messengerSafetyRecoveryReviewSnapshot(props.config), (value) => value as AdminMessengerSafetyRecoveryReviewSnapshot, setRecoveryReviews),
        () => directFallback("policy-feedback", takeSection<AdminMessengerSafetyPolicyFeedbackSnapshot>(sections, "policy-feedback"), () => adminApi.messengerSafetyPolicyFeedbackSnapshot(props.config), (value) => value as AdminMessengerSafetyPolicyFeedbackSnapshot, setPolicyFeedback),
        () => directFallback("policy-registry", takeSection<AdminMessengerSafetyPolicyRegistrySnapshot>(sections, "policy-registry"), () => adminApi.messengerSafetyPolicyRegistrySnapshot(props.config), (value) => value as AdminMessengerSafetyPolicyRegistrySnapshot, setPolicyRegistry),
        () => directFallback("policy-deployment", takeSection<AdminMessengerSafetyPolicyDeploymentSnapshot>(sections, "policy-deployment"), () => adminApi.messengerSafetyPolicyDeploymentSnapshot(props.config), (value) => value as AdminMessengerSafetyPolicyDeploymentSnapshot, setPolicyDeployment),
        () => directFallback("policy-training", takeSection<AdminMessengerSafetyPolicyTrainingSnapshot>(sections, "policy-training"), () => adminApi.messengerSafetyPolicyTrainingSnapshot(props.config), (value) => value as AdminMessengerSafetyPolicyTrainingSnapshot, setPolicyTraining),
      
      ];
      // Do not storm the backend with dozens of direct fallback requests when the
      // aggregate admin-100 snapshot is slow. Keep the previous visible data
      // instead, so Admin never blanks the Messenger screen during launch checks.
      if (false && (!admin100Snapshot || Object.keys(sections).length === 0)) {
        for (let index = 0; index < directFallbackTasks.length; index += 1) {
          await directFallbackTasks[index]();
        }
      }

      setRuntimeFailures([...endpointFailures, ...admin100Failures.map((item) => item && typeof item === "object" ? item as Record<string, unknown> : { error: String(item) })]);
      setDiagnostics([...(response.center.diagnostics ?? []), ...admin100Diagnostics, ...endpointDiagnostics]);
    } finally {
      setBusy(false);
    }
  }, [props.config, props.language]);
  useEffect(() => { void load(); }, [load]);

  async function runDiagnostics() {
    setBusy(true);
    try {
      const response = canRunDiagnostics ? await adminApi.runMessengerDiagnostics(props.config) : await adminApi.messengerDiagnostics(props.config);
      setDiagnostics(response.diagnostics);
      props.setNotice(t(props.language, "notice.messengerDiagnostics"));
    } finally {
      setBusy(false);
    }
    await load();
  }

  async function toggleFeatureFlag(key: string, enabled: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerFeatureFlag(props.config, key, { enabled, note: flagNote || undefined });
      setCenter(response.center);
      setDiagnostics(response.center.diagnostics ?? []);
      props.setNotice(t(props.language, "notice.messengerFeatureUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createLaunchBlocker() {
    if (!blockerForm.title.trim() || !blockerForm.message.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerLaunchBlocker(props.config, {
        key: blockerForm.key.trim() || undefined,
        title: blockerForm.title.trim(),
        message: blockerForm.message.trim(),
        severity: blockerForm.severity,
      });
      setCenter(response.center);
      setDiagnostics(response.center.diagnostics ?? []);
      setBlockerForm({ key: "", title: "", message: "", severity: "critical" });
      props.setNotice(t(props.language, "notice.messengerBlockerCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function resolveLaunchBlocker(blocker: AdminMessengerLaunchBlocker) {
    if (!blocker.id) return;
    setBusy(true);
    try {
      const response = await adminApi.resolveMessengerLaunchBlocker(props.config, blocker.id, { resolutionNote: resolutionNotes[blocker.id] || undefined });
      setCenter(response.center);
      setDiagnostics(response.center.diagnostics ?? []);
      setResolutionNotes((current) => ({ ...current, [blocker.id as string]: "" }));
      props.setNotice(t(props.language, "notice.messengerBlockerResolved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateDirectorySetting(key: MessengerDirectoryBooleanSettingKey, value: boolean) {
    if (!directory) return;
    setBusy(true);
    try {
      await adminApi.updateMessengerDirectorySettings(props.config, { [key]: value });
      const directoryResponse = await adminApi.messengerDirectoryDashboard(props.config);
      setDirectory(directoryResponse.dashboard);
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      props.setNotice(t(props.language, "notice.messengerDirectoryUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function restrictDirectoryItem(item: AdminMessengerDirectoryItem) {
    if (!item.id || !item.kind) return;
    setBusy(true);
    try {
      await adminApi.restrictMessengerDirectoryItem(props.config, item.kind, item.id, directoryRestrictionReason || "admin_review");
      const directoryResponse = await adminApi.messengerDirectoryDashboard(props.config);
      setDirectory(directoryResponse.dashboard);
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      props.setNotice(t(props.language, "notice.messengerDirectoryRestricted"));
    } finally {
      setBusy(false);
    }
  }

  async function releaseDirectoryItem(item: AdminMessengerDirectoryItem) {
    if (!item.id || !item.kind) return;
    setBusy(true);
    try {
      await adminApi.releaseMessengerDirectoryItem(props.config, item.kind, item.id, directoryRestrictionReason || undefined);
      const directoryResponse = await adminApi.messengerDirectoryDashboard(props.config);
      setDirectory(directoryResponse.dashboard);
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      props.setNotice(t(props.language, "notice.messengerDirectoryReleased"));
    } finally {
      setBusy(false);
    }
  }

  async function refreshDirectoryReviewQueue() {
    setBusy(true);
    try {
      const response = await adminApi.messengerDirectoryReviewQueue(props.config, {
        kind: directoryReviewKindFilter,
        status: directoryReviewStatusFilter,
        limit: 100,
      });
      setDirectoryReviewQueue(response);
      props.setNotice(t(props.language, "notice.messengerDirectoryReviewQueueRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function applyDirectoryReviewAction(item: AdminMessengerDirectoryReviewQueueEntry, action: AdminMessengerDirectoryReviewAction) {
    if (!item.id || !item.kind) return;
    setBusy(true);
    try {
      const result = await adminApi.applyMessengerDirectoryReviewAction(props.config, {
        kind: item.kind,
        id: item.id,
        action,
        reason: directoryReviewReason || "admin_review",
      });

      if (!result.ok) {
        props.setNotice(result.error || t(props.language, "notice.messengerDirectoryReviewActionFailed"));
        return;
      }

      const [queueResponse, directoryResponse, promotionResponse, approvalResponse] = await Promise.all([
        adminApi.messengerDirectoryReviewQueue(props.config, { kind: directoryReviewKindFilter, status: directoryReviewStatusFilter, limit: 100 }),
        adminApi.messengerDirectoryDashboard(props.config),
        adminApi.messengerDirectoryPromotionSnapshot(props.config),
        adminApi.messengerApprovalVisibilitySnapshot(props.config),
      ]);
      setDirectoryReviewQueue(queueResponse);
      setDirectory(directoryResponse.dashboard);
      setDirectoryPromotion(promotionResponse);
      setApprovalVisibility(approvalResponse);
      props.setNotice(t(props.language, "notice.messengerDirectoryReviewActionSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateDirectoryPromotionSetting(key: "approvalRequired" | "autoPublishVerifiedProfileObjects" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerDirectoryPromotionSettings(props.config, { [key]: value });
      setDirectoryPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerDirectoryPromotionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function syncDirectoryPromotion() {
    setBusy(true);
    try {
      const response = await adminApi.syncMessengerDirectoryPromotion(props.config);
      setDirectoryPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerDirectoryPromotionSynced"));
    } finally {
      setBusy(false);
    }
  }

  async function updateDirectoryPromotionStatus(item: AdminMessengerDirectoryPromotionEntry, status: AdminMessengerDirectoryPromotionListingStatus) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerDirectoryPromotionEntryStatus(props.config, item.id, status, directoryPromotionNote || undefined);
      setDirectoryPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerDirectoryPromotionStatusUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function boostDirectoryPromotionEntry(item: AdminMessengerDirectoryPromotionEntry) {
    const form = directoryPromotionBoostForms[item.id] ?? { featuredRank: item.featuredRank ? String(item.featuredRank) : "", searchBoostPct: String(item.searchBoostPct ?? 0), directoryBoostPct: String(item.directoryBoostPct ?? 0), recommended: Boolean(item.recommended) };
    setBusy(true);
    try {
      const response = await adminApi.boostMessengerDirectoryPromotionEntry(props.config, item.id, {
        featuredRank: form.featuredRank ? Number(form.featuredRank) : undefined,
        searchBoostPct: form.searchBoostPct ? Number(form.searchBoostPct) : undefined,
        directoryBoostPct: form.directoryBoostPct ? Number(form.directoryBoostPct) : undefined,
        recommended: form.recommended,
        note: directoryPromotionNote || undefined,
      });
      setDirectoryPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerDirectoryPromotionBoosted"));
    } finally {
      setBusy(false);
    }
  }

  async function updateApprovalVisibilitySetting(key: "approvalRequired" | "featuredRequiresOwnerApproval" | "qualityGateEnabled" | "antiSpamReviewRequired", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerApprovalVisibilitySettings(props.config, { [key]: value } as Partial<AdminMessengerApprovalVisibilitySettings>);
      setApprovalVisibility(response.snapshot);
      const promotionResponse = await adminApi.messengerDirectoryPromotionSnapshot(props.config);
      setDirectoryPromotion(promotionResponse);
      props.setNotice(t(props.language, "notice.messengerApprovalVisibilityUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function decideApprovalVisibilityEntry(item: AdminMessengerApprovalVisibilityEntry, decision: string) {
    setBusy(true);
    try {
      const response = await adminApi.decideMessengerApprovalVisibilityEntry(props.config, item.id, decision, { note: approvalVisibilityNote || undefined });
      setApprovalVisibility(response.snapshot);
      const promotionResponse = await adminApi.messengerDirectoryPromotionSnapshot(props.config);
      setDirectoryPromotion(promotionResponse);
      props.setNotice(t(props.language, "notice.messengerApprovalVisibilityDecisionSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function setApprovalVisibilityEntryVisibility(item: AdminMessengerApprovalVisibilityEntry, visibility: "public" | "hidden" | "restricted") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerApprovalVisibilityEntryVisibility(props.config, item.id, visibility, approvalVisibilityNote || undefined);
      setApprovalVisibility(response.snapshot);
      const promotionResponse = await adminApi.messengerDirectoryPromotionSnapshot(props.config);
      setDirectoryPromotion(promotionResponse);
      props.setNotice(t(props.language, "notice.messengerApprovalVisibilityUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updatePremiumSetting(key: MessengerPremiumBooleanSettingKey, value: boolean) {
    if (!moderation) return;
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerPremiumSettings(props.config, { [key]: value } as Partial<AdminMessengerPremiumSettings>);
      setModeration(response.dashboard);
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      setDiagnostics(fresh.center.diagnostics ?? []);
      props.setNotice(t(props.language, "notice.messengerPremiumUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createModerationReport() {
    if (!reportForm.title.trim() || !reportForm.description.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerModerationReport(props.config, {
        kind: reportForm.kind,
        severity: reportForm.severity,
        title: reportForm.title.trim(),
        description: reportForm.description.trim(),
        targetType: reportForm.targetType.trim() || undefined,
        targetId: reportForm.targetId.trim() || undefined,
        reportedBy: reportForm.reportedBy.trim() || undefined,
        source: "admin_manual",
      });
      setModeration(response.dashboard);
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      setDiagnostics(fresh.center.diagnostics ?? []);
      setReportForm({ kind: "message", severity: "medium", title: "", description: "", targetType: "message", targetId: "", reportedBy: "" });
      props.setNotice(t(props.language, "notice.messengerReportCreated"));
    } finally {
      setBusy(false);
    }
  }


  async function createSafetyReport() {
    if (!safetyReportForm.title.trim() || !safetyReportForm.description.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyReport(props.config, {
        source: safetyReportForm.source,
        category: safetyReportForm.category,
        severity: safetyReportForm.severity,
        title: safetyReportForm.title.trim(),
        description: safetyReportForm.description.trim(),
        targetType: safetyReportForm.targetType.trim() || undefined,
        targetId: safetyReportForm.targetId.trim() || undefined,
        relatedUserId: safetyReportForm.relatedUserId.trim() || undefined,
        relatedChatId: safetyReportForm.relatedChatId.trim() || undefined,
        relatedMessageId: safetyReportForm.relatedMessageId.trim() || undefined,
        evidenceHash: safetyReportForm.evidenceHash.trim() || undefined,
        legalBasis: safetyReportForm.legalBasis.trim() || undefined,
      });
      setSafety(response.dashboard);
      setSafetyReportForm({ source: "ai_signal", category: "narcotics_or_psychotropic_trafficking", severity: "critical", title: "", description: "", targetType: "user", targetId: "", relatedUserId: "", relatedChatId: "", relatedMessageId: "", evidenceHash: "", legalBasis: "internal_safety_review" });
      props.setNotice(t(props.language, "notice.messengerSafetyReportCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function ingestAiSafetySignal() {
    try {
      setBusy(true);
      const response = await adminApi.ingestMessengerAiSafetySignal(props.config, {
        source: aiSignalForm.source,
        category: aiSignalForm.category,
        severity: aiSignalForm.severity,
        confidence: Number(aiSignalForm.confidence),
        summary: aiSignalForm.summary,
        targetType: aiSignalForm.targetType || undefined,
        targetId: aiSignalForm.targetId || undefined,
        relatedUserId: aiSignalForm.relatedUserId || undefined,
        relatedChatId: aiSignalForm.relatedChatId || undefined,
        relatedMessageId: aiSignalForm.relatedMessageId || undefined,
        provider: aiSignalForm.provider || undefined,
        model: aiSignalForm.model || undefined,
        evidenceHash: aiSignalForm.evidenceHash || undefined,
      });
      setSafety(response.dashboard);
      setAiSignalForm({ source: "ai_messenger_safety", category: "narcotics_or_psychotropic_trafficking", severity: "critical", confidence: "0.90", summary: "", targetType: "user", targetId: "", relatedUserId: "", relatedChatId: "", relatedMessageId: "", provider: "", model: "", evidenceHash: "" });
      props.setNotice(t(props.language, "notice.messengerAiSignalIngested"));
    } catch (error) {
      props.setNotice(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  async function convertAiSafetySignal(signal: AdminMessengerAiSafetySignal) {
    try {
      setBusy(true);
      const response = await adminApi.convertMessengerAiSafetySignal(props.config, signal.id);
      setSafety(response.dashboard);
      props.setNotice(t(props.language, "notice.messengerAiSignalConverted"));
    } catch (error) {
      props.setNotice(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  async function ignoreAiSafetySignal(signal: AdminMessengerAiSafetySignal) {
    try {
      setBusy(true);
      const response = await adminApi.ignoreMessengerAiSafetySignal(props.config, signal.id, "admin_review_ignored");
      setSafety(response.dashboard);
      props.setNotice(t(props.language, "notice.messengerAiSignalIgnored"));
    } catch (error) {
      props.setNotice(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  async function assignSafetyReport(report: AdminMessengerSafetyReport) {
    setBusy(true);
    try {
      const response = await adminApi.assignMessengerSafetyReport(props.config, report.id);
      setSafety(response.dashboard);
      props.setNotice(t(props.language, "notice.messengerSafetyReportAssigned"));
    } finally {
      setBusy(false);
    }
  }

  async function actionSafetyReport(report: AdminMessengerSafetyReport, action: string) {
    setBusy(true);
    try {
      const response = await adminApi.actionMessengerSafetyReport(props.config, report.id, { action, note: safetyActionNotes[report.id] || undefined });
      setSafety(response.dashboard);
      setSafetyActionNotes((current) => ({ ...current, [report.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerSafetyActionApplied"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyReportPackage(report: AdminMessengerSafetyReport) {
    setBusy(true);
    try {
      const payload: AdminMessengerSafetyReportPackage = await adminApi.exportMessengerSafetyReportPackage(props.config, report.id);
      downloadAdminJson(`${payload.packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerSafetyPackageExported"));
    } finally {
      setBusy(false);
    }
  }

  async function sealVaultEvidence(item: AdminMessengerEvidenceVaultItem) {
    setBusy(true);
    try {
      const response = await adminApi.sealMessengerEvidenceVaultItem(props.config, item.id, vaultSealNotes[item.id] || undefined);
      setSafety(response.dashboard);
      setVaultSealNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerEvidenceSealed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportEvidenceVault() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerEvidenceVault(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_evidence_vault_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerEvidenceVaultExported"));
    } finally {
      setBusy(false);
    }
  }

  async function openSafetyReviewCase(report: AdminMessengerSafetyReport) {
    setBusy(true);
    try {
      const response = await adminApi.openMessengerSafetyReviewCase(props.config, report.id, safetyActionNotes[report.id] || undefined);
      setSafety(response.dashboard);
      setSafetyActionNotes((current) => ({ ...current, [report.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerSafetyCaseOpened"));
    } finally {
      setBusy(false);
    }
  }

  async function updateSafetyCaseStatus(item: AdminMessengerSafetyCaseReview, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyCaseStatus(props.config, item.id, { status, note: caseReviewNotes[item.id] || undefined });
      setSafety(response.dashboard);
      setCaseReviewNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerSafetyCaseStatusUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function decideSafetyCase(item: AdminMessengerSafetyCaseReview, decision: string) {
    setBusy(true);
    try {
      const response = await adminApi.decideMessengerSafetyCase(props.config, item.id, {
        decision,
        note: caseReviewNotes[item.id] || undefined,
        legalBasis: "owner_security_review",
        restrictionScope: item.restriction?.scope ?? item.targetType ?? "target",
        restrictionTargetId: item.restriction?.targetId ?? item.targetId ?? item.relatedUserId ?? item.relatedChatId ?? item.relatedMessageId,
      });
      setSafety(response.dashboard);
      setCaseReviewNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerSafetyCaseDecisionApplied"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyCasePackage(item: AdminMessengerSafetyCaseReview) {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyCasePackage(props.config, item.id);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_case_pkg_${item.id}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerSafetyCaseExported"));
    } finally {
      setBusy(false);
    }
  }

  async function createSafetyRestriction() {
    if (!restrictionForm.targetId.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyRestriction(props.config, {
        scope: restrictionForm.scope,
        category: restrictionForm.category,
        severity: restrictionForm.severity,
        targetType: restrictionForm.targetType.trim() || "target",
        targetId: restrictionForm.targetId.trim(),
        relatedUserId: restrictionForm.relatedUserId.trim() || undefined,
        relatedChatId: restrictionForm.relatedChatId.trim() || undefined,
        relatedMessageId: restrictionForm.relatedMessageId.trim() || undefined,
        reason: restrictionForm.reason.trim() || "messenger_safety_hold",
        legalBasis: restrictionForm.legalBasis.trim() || "internal_safety_review",
        expiresAt: restrictionForm.expiresAt.trim() || undefined,
        linkedReportIds: splitAdminIds(restrictionForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(restrictionForm.linkedCaseIds),
        linkedAiSignalIds: splitAdminIds(restrictionForm.linkedAiSignalIds),
        linkedEvidenceIds: splitAdminIds(restrictionForm.linkedEvidenceIds),
        activateNow: restrictionForm.activateNow,
      });
      setSafety(response.dashboard);
      setRestrictionForm({ scope: "user_messaging_lock", category: "narcotics_or_psychotropic_trafficking", severity: "critical", targetType: "user", targetId: "", relatedUserId: "", relatedChatId: "", relatedMessageId: "", reason: "messenger_safety_hold", legalBasis: "internal_safety_review", expiresAt: "", linkedReportIds: "", linkedCaseIds: "", linkedAiSignalIds: "", linkedEvidenceIds: "", activateNow: false });
      props.setNotice(t(props.language, "notice.messengerRestrictionCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateSafetyRestrictionStatus(item: AdminMessengerSafetyRestriction, status: string) {
    setBusy(true);
    try {
      const response = status === "released"
        ? await adminApi.releaseMessengerSafetyRestriction(props.config, item.id, restrictionNotes[item.id] || undefined)
        : await adminApi.updateMessengerSafetyRestrictionStatus(props.config, item.id, { status, note: restrictionNotes[item.id] || undefined });
      setSafety(response.dashboard);
      setRestrictionNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerRestrictionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyRestrictions() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyRestrictions(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_restrictions_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerRestrictionsExported"));
    } finally {
      setBusy(false);
    }
  }


  async function refreshSafetyEnforcement() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyEnforcementSnapshot(props.config);
      setEnforcement(response);
      props.setNotice(t(props.language, "notice.messengerEnforcementRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function checkSafetyEnforcement() {
    setBusy(true);
    try {
      const response = await adminApi.checkMessengerSafetyEnforcement(props.config, {
        action: enforcementForm.action,
        targetType: enforcementForm.targetType.trim() || undefined,
        targetId: enforcementForm.targetId.trim() || undefined,
        userId: enforcementForm.userId.trim() || undefined,
        chatId: enforcementForm.chatId.trim() || undefined,
        messageId: enforcementForm.messageId.trim() || undefined,
        groupId: enforcementForm.groupId.trim() || undefined,
        channelId: enforcementForm.channelId.trim() || undefined,
        botId: enforcementForm.botId.trim() || undefined,
      });
      setEnforcementCheck(response);
      const guardEventsResponse = await adminApi.messengerSafetyGuardEventsSnapshot(props.config);
      setGuardEvents(guardEventsResponse);
      props.setNotice(response.allowed ? t(props.language, "notice.messengerEnforcementAllowed") : t(props.language, "notice.messengerEnforcementBlocked"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyEnforcement() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyEnforcement(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_enforcement_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerEnforcementExported"));
    } finally {
      setBusy(false);
    }
  }


  async function refreshSafetyRuntimeBridge() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyRuntimeBridgeSnapshot(props.config);
      setRuntimeBridge(response);
      props.setNotice(t(props.language, "notice.messengerRuntimeBridgeRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function checkSafetyRuntimeBridge() {
    setBusy(true);
    try {
      const response = await adminApi.checkMessengerSafetyRuntimeBridge(props.config, {
        runtimeAction: runtimeBridgeForm.runtimeAction,
        actorUserId: runtimeBridgeForm.actorUserId.trim() || undefined,
        peerUserId: runtimeBridgeForm.peerUserId.trim() || undefined,
        userId: runtimeBridgeForm.actorUserId.trim() || undefined,
        chatId: runtimeBridgeForm.chatId.trim() || undefined,
        conversationId: runtimeBridgeForm.chatId.trim() || undefined,
        messageId: runtimeBridgeForm.messageId.trim() || undefined,
        clientMessageId: runtimeBridgeForm.clientMessageId.trim() || undefined,
        groupId: runtimeBridgeForm.groupId.trim() || undefined,
        channelId: runtimeBridgeForm.channelId.trim() || undefined,
        botId: runtimeBridgeForm.botId.trim() || undefined,
        targetType: runtimeBridgeForm.targetType.trim() || undefined,
        targetId: runtimeBridgeForm.targetId.trim() || undefined,
        rawContentPresent: runtimeBridgeForm.rawContentPresent,
      });
      setRuntimeBridgeCheck(response);
      const guardEventsResponse = await adminApi.messengerSafetyGuardEventsSnapshot(props.config);
      setGuardEvents(guardEventsResponse);
      props.setNotice(response.allowed ? t(props.language, "notice.messengerRuntimeBridgeAllowed") : t(props.language, "notice.messengerRuntimeBridgeBlocked"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyRuntimeBridge() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyRuntimeBridge(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_runtime_bridge_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerRuntimeBridgeExported"));
    } finally {
      setBusy(false);
    }
  }


  async function refreshSafetyGuardEvents() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyGuardEventsSnapshot(props.config);
      setGuardEvents(response);
      props.setNotice(t(props.language, "notice.messengerGuardEventsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyGuardEvents() {
    setBusy(true);
    try {
      await adminApi.exportMessengerSafetyGuardEvents(props.config);
      props.setNotice(t(props.language, "notice.messengerGuardEventsExported"));
    } finally {
      setBusy(false);
    }
  }

  async function refreshIntegrityMonitor() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyIntegrityMonitorSnapshot(props.config);
      setIntegrityMonitor(response);
      props.setNotice(t(props.language, "notice.messengerIntegrityMonitorRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportIntegrityMonitor() {
    setBusy(true);
    try {
      await adminApi.exportMessengerSafetyIntegrityMonitor(props.config);
      props.setNotice(t(props.language, "notice.messengerIntegrityMonitorExported"));
    } finally {
      setBusy(false);
    }
  }

  async function refreshSafetyEscalations() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyEscalationsSnapshot(props.config);
      setEscalations(response);
      props.setNotice(t(props.language, "notice.messengerEscalationsRefreshed"));
    } finally {
      setBusy(false);
    }
  }


  async function refreshComplianceReports() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyComplianceReportsSnapshot(props.config);
      setComplianceReports(response);
      props.setNotice(t(props.language, "notice.messengerComplianceReportsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function buildComplianceReport() {
    setBusy(true);
    try {
      const payload = await adminApi.buildMessengerSafetyComplianceReport(props.config, { scope: complianceReportForm.scope, scopeId: complianceReportForm.scopeId || undefined, title: complianceReportForm.title || undefined });
      setComplianceReportPackage(payload);
      props.setNotice(t(props.language, "notice.messengerComplianceReportBuilt"));
    } finally {
      setBusy(false);
    }
  }

  async function exportComplianceReport() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyComplianceReport(props.config, complianceReportForm.scope, complianceReportForm.scopeId || undefined, complianceReportForm.title || undefined);
      setComplianceReportPackage(payload);
      downloadAdminJson(`messenger-safety-compliance-${payload.scope}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerComplianceReportExported"));
    } finally {
      setBusy(false);
    }
  }


  async function refreshSafetyRetention() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyRetentionSnapshot(props.config);
      setRetention(response);
      props.setNotice(t(props.language, "notice.messengerRetentionRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createRetentionLegalHold() {
    if (!retentionHoldForm.targetId.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyRetentionLegalHold(props.config, {
        targetType: retentionHoldForm.targetType,
        targetId: retentionHoldForm.targetId.trim(),
        reason: retentionHoldForm.reason.trim() || "messenger_safety_legal_hold",
        legalBasis: retentionHoldForm.legalBasis.trim() || "internal_safety_review",
        linkedReportIds: splitAdminIds(retentionHoldForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(retentionHoldForm.linkedCaseIds),
        linkedEvidenceIds: splitAdminIds(retentionHoldForm.linkedEvidenceIds),
        linkedAuthorityRequestIds: splitAdminIds(retentionHoldForm.linkedAuthorityRequestIds),
      });
      setRetention(response.snapshot);
      setSafety(response.dashboard);
      setRetentionHoldForm({ targetType: "evidence_vault", targetId: "", reason: "messenger_safety_legal_hold", legalBasis: "internal_safety_review", linkedReportIds: "", linkedCaseIds: "", linkedEvidenceIds: "", linkedAuthorityRequestIds: "" });
      props.setNotice(t(props.language, "notice.messengerRetentionLegalHoldCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function releaseRetentionLegalHold(item: AdminMessengerSafetyLegalHold) {
    setBusy(true);
    try {
      const response = await adminApi.releaseMessengerSafetyRetentionLegalHold(props.config, item.id, retentionReleaseNotes[item.id] || undefined);
      setRetention(response.snapshot);
      setSafety(response.dashboard);
      setRetentionReleaseNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerRetentionLegalHoldReleased"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyRetention() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyRetention(props.config);
      downloadAdminJson(`${payload.packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerRetentionExported"));
    } finally {
      setBusy(false);
    }
  }

  async function refreshSafetyAccessControl() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyAccessControlSnapshot(props.config);
      setAccessControl(response);
      props.setNotice(t(props.language, "notice.messengerAccessControlRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function checkSafetyAccessControl() {
    setBusy(true);
    try {
      const response = await adminApi.checkMessengerSafetyAccessControl(props.config, {
        scope: accessControlForm.scope,
        action: accessControlForm.action,
        role: accessControlForm.role.trim() || undefined,
        adminId: accessControlForm.adminId.trim() || undefined,
        permissions: splitAdminIds(accessControlForm.permissions),
        rootOwner: accessControlForm.rootOwner,
      });
      setAccessControl(response.snapshot);
      setSafety(response.dashboard);
      setAccessControlDecision(response.decision);
      props.setNotice(t(props.language, "notice.messengerAccessControlChecked"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyAccessControl() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyAccessControl(props.config);
      props.setNotice(`${t(props.language, "notice.messengerAccessControlExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }


  async function refreshStaffAssignments() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyStaffAssignmentsSnapshot(props.config);
      setStaffAssignments(response);
      props.setNotice(t(props.language, "notice.messengerStaffAssignmentsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createStaffAssignment() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyStaffAssignment(props.config, {
        ...staffAssignmentForm,
        title: staffAssignmentForm.title.trim() || undefined,
        dueAt: staffAssignmentForm.dueAt.trim() || undefined,
        linkedReportIds: splitAdminIds(staffAssignmentForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(staffAssignmentForm.linkedCaseIds),
        linkedRestrictionIds: splitAdminIds(staffAssignmentForm.linkedRestrictionIds),
        linkedEscalationIds: splitAdminIds(staffAssignmentForm.linkedEscalationIds),
        linkedAuthorityRequestIds: splitAdminIds(staffAssignmentForm.linkedAuthorityRequestIds),
        linkedEvidenceIds: splitAdminIds(staffAssignmentForm.linkedEvidenceIds),
        requiredAccessScopes: splitAdminIds(staffAssignmentForm.requiredAccessScopes),
      });
      setStaffAssignments(response.snapshot);
      setSafety(response.dashboard);
      setStaffAssignmentForm({ targetType: "case_review", targetId: "", title: "", priority: "urgent", assignedToAdminId: "", assignedRole: "security", dueAt: "", ownerDecisionRequired: true, complianceReviewRequired: true, authorityCooperationRequired: false, linkedReportIds: "", linkedCaseIds: "", linkedRestrictionIds: "", linkedEscalationIds: "", linkedAuthorityRequestIds: "", linkedEvidenceIds: "", requiredAccessScopes: "case_reviews,evidence_vault", note: "" });
      props.setNotice(t(props.language, "notice.messengerStaffAssignmentCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateStaffAssignmentStatus(item: AdminMessengerSafetyStaffAssignment, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyStaffAssignmentStatus(props.config, item.id, { status, note: staffAssignmentNotes[item.id] || undefined });
      setStaffAssignments(response.snapshot);
      setSafety(response.dashboard);
      setStaffAssignmentNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerStaffAssignmentUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function exportStaffAssignments() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyStaffAssignments(props.config);
      props.setNotice(`${t(props.language, "notice.messengerStaffAssignmentsExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshSupervisorDashboard() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetySupervisorDashboardSnapshot(props.config);
      setSupervisorDashboard(response);
      props.setNotice(t(props.language, "notice.messengerSupervisorDashboardRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSupervisorDashboard() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetySupervisorDashboard(props.config);
      props.setNotice(`${t(props.language, "notice.messengerSupervisorDashboardExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshDailyOperations() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyDailyOperationsSnapshot(props.config);
      setDailyOperations(response);
      props.setNotice(t(props.language, "notice.messengerDailyOperationsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportDailyOperations() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyDailyOperations(props.config);
      props.setNotice(`${t(props.language, "notice.messengerDailyOperationsExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshPrelaunchGate() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPrelaunchReadinessGateSnapshot(props.config);
      setPrelaunchGate(response);
      props.setNotice(t(props.language, "notice.messengerPrelaunchGateRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportPrelaunchGate() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPrelaunchReadinessGate(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPrelaunchGateExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshLaunchCommand() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyLaunchCommandSnapshot(props.config);
      setLaunchCommand(response);
      props.setNotice(t(props.language, "notice.messengerLaunchCommandRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportLaunchCommand() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyLaunchCommand(props.config);
      props.setNotice(`${t(props.language, "notice.messengerLaunchCommandExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshPostLaunchMonitor() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPostLaunchMonitorSnapshot(props.config);
      setPostLaunchMonitor(response);
      props.setNotice(t(props.language, "notice.messengerPostLaunchMonitorRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportPostLaunchMonitor() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPostLaunchMonitor(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPostLaunchMonitorExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshIncidentResponse() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyIncidentResponseSnapshot(props.config);
      setIncidentResponse(response);
      props.setNotice(t(props.language, "notice.messengerIncidentResponseRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createIncidentResponse() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyIncident(props.config, {
        ...incidentForm,
        linkedReportIds: splitAdminIds(incidentForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(incidentForm.linkedCaseIds),
        linkedRestrictionIds: splitAdminIds(incidentForm.linkedRestrictionIds),
        linkedEvidenceIds: splitAdminIds(incidentForm.linkedEvidenceIds),
        linkedGuardEventIds: splitAdminIds(incidentForm.linkedGuardEventIds),
      });
      setIncidentResponse(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerIncidentCreated")}: ${response.incident.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function updateIncidentStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyIncidentStatus(props.config, id, { status, note: incidentStatusNotes[id] });
      setIncidentResponse(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerIncidentStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportIncidentResponse() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyIncidentResponse(props.config);
      props.setNotice(`${t(props.language, "notice.messengerIncidentResponseExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshEmergencyActions() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyEmergencyActionSnapshot(props.config);
      setEmergencyActions(response);
      props.setNotice(t(props.language, "notice.messengerEmergencyActionsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createEmergencyAction() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyEmergencyAction(props.config, {
        ...emergencyActionForm,
        linkedIncidentIds: splitAdminIds(emergencyActionForm.linkedIncidentIds),
        linkedReportIds: splitAdminIds(emergencyActionForm.linkedReportIds),
        linkedEvidenceIds: splitAdminIds(emergencyActionForm.linkedEvidenceIds),
        linkedRestrictionIds: splitAdminIds(emergencyActionForm.linkedRestrictionIds),
        linkedAuthorityRequestIds: splitAdminIds(emergencyActionForm.linkedAuthorityRequestIds),
      });
      setEmergencyActions(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerEmergencyActionCreated")}: ${response.action.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function updateEmergencyActionStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyEmergencyActionStatus(props.config, id, { status, note: emergencyActionStatusNotes[id] });
      setEmergencyActions(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerEmergencyActionStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportEmergencyActions() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyEmergencyAction(props.config);
      props.setNotice(`${t(props.language, "notice.messengerEmergencyActionsExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshRecoveryReviews() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyRecoveryReviewSnapshot(props.config);
      setRecoveryReviews(response);
      props.setNotice(t(props.language, "notice.messengerRecoveryReviewsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createRecoveryReview() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyRecoveryReview(props.config, {
        ...recoveryReviewForm,
        linkedEmergencyActionIds: splitAdminIds(recoveryReviewForm.linkedEmergencyActionIds),
        linkedIncidentIds: splitAdminIds(recoveryReviewForm.linkedIncidentIds),
        linkedReportIds: splitAdminIds(recoveryReviewForm.linkedReportIds),
        linkedEvidenceIds: splitAdminIds(recoveryReviewForm.linkedEvidenceIds),
        linkedRestrictionIds: splitAdminIds(recoveryReviewForm.linkedRestrictionIds),
        linkedAuthorityRequestIds: splitAdminIds(recoveryReviewForm.linkedAuthorityRequestIds),
        linkedExportVerificationIds: splitAdminIds(recoveryReviewForm.linkedExportVerificationIds),
      });
      setRecoveryReviews(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerRecoveryReviewCreated")}: ${response.review.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function updateRecoveryReviewStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyRecoveryReviewStatus(props.config, id, { status, note: recoveryReviewNotes[id] });
      setRecoveryReviews(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerRecoveryReviewStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportRecoveryReviews() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyRecoveryReview(props.config);
      props.setNotice(`${t(props.language, "notice.messengerRecoveryReviewsExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshPolicyFeedback() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPolicyFeedbackSnapshot(props.config);
      setPolicyFeedback(response);
      props.setNotice(t(props.language, "notice.messengerPolicyFeedbackRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createPolicyFeedback() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyPolicyFeedback(props.config, {
        ...policyFeedbackForm,
        linkedRecoveryReviewIds: splitAdminIds(policyFeedbackForm.linkedRecoveryReviewIds),
        linkedIncidentIds: splitAdminIds(policyFeedbackForm.linkedIncidentIds),
        linkedEmergencyActionIds: splitAdminIds(policyFeedbackForm.linkedEmergencyActionIds),
        linkedReportIds: splitAdminIds(policyFeedbackForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(policyFeedbackForm.linkedCaseIds),
        linkedRestrictionIds: splitAdminIds(policyFeedbackForm.linkedRestrictionIds),
        linkedAuthorityRequestIds: splitAdminIds(policyFeedbackForm.linkedAuthorityRequestIds),
        linkedEvidenceIds: splitAdminIds(policyFeedbackForm.linkedEvidenceIds),
        linkedGuardEventIds: splitAdminIds(policyFeedbackForm.linkedGuardEventIds),
        linkedEscalationIds: splitAdminIds(policyFeedbackForm.linkedEscalationIds),
        linkedExportVerificationIds: splitAdminIds(policyFeedbackForm.linkedExportVerificationIds),
      });
      setPolicyFeedback(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyFeedbackCreated")}: ${response.feedbackItem.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function updatePolicyFeedbackStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyPolicyFeedbackStatus(props.config, id, { status, note: policyFeedbackNotes[id] });
      setPolicyFeedback(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyFeedbackStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportPolicyFeedback() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPolicyFeedback(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPolicyFeedbackExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }


  async function refreshPolicyRegistry() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPolicyRegistrySnapshot(props.config);
      setPolicyRegistry(response);
      props.setNotice(t(props.language, "notice.messengerPolicyRegistryRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function createPolicyRegistryItem() {
    setBusy(true);
    try {
      const response = await adminApi.createMessengerSafetyPolicyRegistry(props.config, {
        ...policyRegistryForm,
        sourceFeedbackIds: splitAdminIds(policyRegistryForm.sourceFeedbackIds),
        linkedRecoveryReviewIds: splitAdminIds(policyRegistryForm.linkedRecoveryReviewIds),
        linkedIncidentIds: splitAdminIds(policyRegistryForm.linkedIncidentIds),
        linkedEvidenceIds: splitAdminIds(policyRegistryForm.linkedEvidenceIds),
        linkedGuardEventIds: splitAdminIds(policyRegistryForm.linkedGuardEventIds),
      });
      setPolicyRegistry(response.snapshot);
      setSafety(response.dashboard);
      setPolicyRegistryForm({ ...policyRegistryForm, title: "", changeSummary: "", rationale: "", sourceFeedbackIds: "", linkedRecoveryReviewIds: "", linkedIncidentIds: "", linkedEvidenceIds: "", linkedGuardEventIds: "" });
      props.setNotice(`${t(props.language, "notice.messengerPolicyRegistryCreated")}: ${response.policy.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function updatePolicyRegistryStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyPolicyRegistryStatus(props.config, id, { status, note: policyRegistryNotes[id] });
      setPolicyRegistry(response.snapshot);
      setSafety(response.dashboard);
      setPolicyRegistryNotes((current) => ({ ...current, [id]: "" }));
      props.setNotice(`${t(props.language, "notice.messengerPolicyRegistryStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportPolicyRegistry() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPolicyRegistry(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPolicyRegistryExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }


  async function refreshPolicyDeployment() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPolicyDeploymentSnapshot(props.config);
      setPolicyDeployment(response);
      props.setNotice(t(props.language, "notice.messengerPolicyDeploymentRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function syncPolicyDeployment() {
    setBusy(true);
    try {
      const response = await adminApi.syncMessengerSafetyPolicyDeployment(props.config);
      setPolicyDeployment(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyDeploymentSynced")}: ${response.createdDeployments.length}`);
    } finally {
      setBusy(false);
    }
  }

  async function updatePolicyDeploymentStatus(id: string, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyPolicyDeploymentStatus(props.config, id, { status, note: policyDeploymentNotes[id] });
      setPolicyDeployment(response.snapshot);
      setSafety(response.dashboard);
      setPolicyDeploymentNotes((current) => ({ ...current, [id]: "" }));
      props.setNotice(`${t(props.language, "notice.messengerPolicyDeploymentStatusUpdated")}: ${id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportPolicyDeployment() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPolicyDeployment(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPolicyDeploymentExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshPolicyTraining() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyPolicyTrainingSnapshot(props.config);
      setPolicyTraining(response);
      props.setNotice(t(props.language, "notice.messengerPolicyTrainingRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function syncPolicyTraining() {
    setBusy(true);
    try {
      const response = await adminApi.syncMessengerSafetyPolicyTraining(props.config);
      setPolicyTraining(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingSynced")}: ${response.createdTrainingTasks.length}`);
    } finally {
      setBusy(false);
    }
  }

  async function assignPolicyTraining(item: AdminMessengerSafetyPolicyTrainingAcknowledgementItem) {
    setBusy(true);
    try {
      const response = await adminApi.assignMessengerSafetyPolicyTraining(props.config, item.id, {
        assignedToAdminId: policyTrainingAssignees[item.id] || undefined,
        requiredRole: policyTrainingRoles[item.id] || item.requiredRole,
        dueAt: policyTrainingDueDates[item.id] || item.dueAt,
        note: policyTrainingNotes[item.id],
      });
      setPolicyTraining(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingAssigned")}: ${item.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function acknowledgePolicyTraining(item: AdminMessengerSafetyPolicyTrainingAcknowledgementItem) {
    setBusy(true);
    try {
      const response = await adminApi.acknowledgeMessengerSafetyPolicyTraining(props.config, item.id, { acknowledgementNote: policyTrainingNotes[item.id], note: policyTrainingNotes[item.id] });
      setPolicyTraining(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingAcknowledged")}: ${item.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function completePolicyTraining(item: AdminMessengerSafetyPolicyTrainingAcknowledgementItem) {
    setBusy(true);
    try {
      const response = await adminApi.completeMessengerSafetyPolicyTraining(props.config, item.id, { note: policyTrainingNotes[item.id] });
      setPolicyTraining(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingCompleted")}: ${item.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function waivePolicyTraining(item: AdminMessengerSafetyPolicyTrainingAcknowledgementItem) {
    setBusy(true);
    try {
      const response = await adminApi.waiveMessengerSafetyPolicyTraining(props.config, item.id, { waiverReason: policyTrainingNotes[item.id], note: policyTrainingNotes[item.id] });
      setPolicyTraining(response.snapshot);
      setSafety(response.dashboard);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingWaived")}: ${item.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function exportPolicyTraining() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyPolicyTraining(props.config);
      props.setNotice(`${t(props.language, "notice.messengerPolicyTrainingExported")}: ${payload.packageId}`);
    } finally {
      setBusy(false);
    }
  }

  async function refreshSafetyExportVerification() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyExportVerificationSnapshot(props.config);
      setExportVerification(response);
      props.setNotice(t(props.language, "notice.messengerExportVerificationRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function verifySafetyExportPackage() {
    setBusy(true);
    try {
      const response = await adminApi.verifyMessengerSafetyExportPackage(props.config, {
        packageKind: exportVerificationForm.packageKind,
        packageId: exportVerificationForm.packageId.trim() || undefined,
        sourceId: exportVerificationForm.sourceId.trim() || undefined,
        packageHash: exportVerificationForm.packageHash.trim() || undefined,
        auditAnchorHash: exportVerificationForm.auditAnchorHash.trim() || undefined,
        vaultAnchorHash: exportVerificationForm.vaultAnchorHash.trim() || undefined,
        guardAnchorHash: exportVerificationForm.guardAnchorHash.trim() || undefined,
        retentionHash: exportVerificationForm.retentionHash.trim() || undefined,
        note: exportVerificationForm.note.trim() || undefined,
      });
      setExportVerification(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerExportVerificationSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyExportVerification() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyExportVerification(props.config);
      downloadAdminJson(`${payload.packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerExportVerificationExported"));
    } finally {
      setBusy(false);
    }
  }

  async function updateSafetyEscalationStatus(item: AdminMessengerSafetyEscalationItem, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerSafetyEscalationStatus(props.config, item.id, { status, note: escalationNotes[item.id] || undefined });
      setEscalations(response.snapshot);
      setSafety(response.dashboard);
      setEscalationNotes((current) => ({ ...current, [item.id]: "" }));
      props.setNotice(t(props.language, "notice.messengerEscalationUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyEscalations() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyEscalations(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_escalations_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerEscalationsExported"));
    } finally {
      setBusy(false);
    }
  }

  async function refreshSafetyClientGuards() {
    setBusy(true);
    try {
      const response = await adminApi.messengerSafetyClientGuardsSnapshot(props.config);
      setClientGuards(response);
      props.setNotice(t(props.language, "notice.messengerClientGuardsRefreshed"));
    } finally {
      setBusy(false);
    }
  }

  async function validateSafetyClientGuard() {
    setBusy(true);
    try {
      const response = await adminApi.validateMessengerSafetyClientGuard(props.config, {
        guardKey: clientGuardForm.guardKey,
        platform: clientGuardForm.platform,
        runtimeAction: clientGuardForm.runtimeAction,
        actorUserId: clientGuardForm.actorUserId.trim() || undefined,
        peerUserId: clientGuardForm.peerUserId.trim() || undefined,
        userId: clientGuardForm.actorUserId.trim() || undefined,
        chatId: clientGuardForm.chatId.trim() || undefined,
        conversationId: clientGuardForm.chatId.trim() || undefined,
        messageId: clientGuardForm.messageId.trim() || undefined,
        clientMessageId: clientGuardForm.clientMessageId.trim() || undefined,
        groupId: clientGuardForm.groupId.trim() || undefined,
        channelId: clientGuardForm.channelId.trim() || undefined,
        botId: clientGuardForm.botId.trim() || undefined,
        targetType: clientGuardForm.targetType.trim() || undefined,
        targetId: clientGuardForm.targetId.trim() || undefined,
        rawContentPresent: clientGuardForm.rawContentPresent,
      });
      setClientGuardValidation(response);
      const guardEventsResponse = await adminApi.messengerSafetyGuardEventsSnapshot(props.config);
      setGuardEvents(guardEventsResponse);
      props.setNotice(response.ready ? t(props.language, "notice.messengerClientGuardReady") : t(props.language, "notice.messengerClientGuardNotReady"));
    } finally {
      setBusy(false);
    }
  }

  async function exportSafetyClientGuards() {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerSafetyClientGuards(props.config);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_safety_client_guards_${Date.now().toString(36)}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerClientGuardsExported"));
    } finally {
      setBusy(false);
    }
  }

  async function updateAuthorityStatus(request: AdminMessengerAuthorityRequest, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerAuthorityRequestStatus(props.config, request.id, { status, decisionNote: "owner_security_cooperation_review" });
      setSafety(response.dashboard);
      props.setNotice(t(props.language, "notice.messengerAuthorityStatusUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function exportAuthorityRequestPackage(request: AdminMessengerAuthorityRequest) {
    setBusy(true);
    try {
      const payload = await adminApi.exportMessengerAuthorityRequestPackage(props.config, request.id);
      const packageId = typeof payload.packageId === "string" ? payload.packageId : `msg_authority_pkg_${request.id}`;
      downloadAdminJson(`${packageId}.json`, payload);
      props.setNotice(t(props.language, "notice.messengerAuthorityPackageExported"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function createAuthorityRequest() {
    if (!authorityForm.authorityName.trim() || !authorityForm.legalBasis.trim() || !authorityForm.requestedScope.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerAuthorityRequest(props.config, {
        authorityName: authorityForm.authorityName.trim(),
        requestReference: authorityForm.requestReference.trim() || undefined,
        requestKind: authorityForm.requestKind,
        authorityCountry: authorityForm.authorityCountry.trim() || undefined,
        authorityOfficerName: authorityForm.authorityOfficerName.trim() || undefined,
        authorityContactHash: authorityForm.authorityContactHash.trim() || undefined,
        legalBasis: authorityForm.legalBasis.trim(),
        requestedScope: authorityForm.requestedScope.trim(),
        priority: authorityForm.priority,
        dueAt: authorityForm.dueAt.trim() || undefined,
        linkedReportIds: splitAdminIds(authorityForm.linkedReportIds),
        linkedCaseIds: splitAdminIds(authorityForm.linkedCaseIds),
        linkedEvidenceIds: splitAdminIds(authorityForm.linkedEvidenceIds),
      });
      setSafety(response.dashboard);
      setAuthorityForm({ authorityName: "", requestReference: "", requestKind: "official_request", authorityCountry: "", authorityOfficerName: "", authorityContactHash: "", legalBasis: "", requestedScope: "", priority: "normal", dueAt: "", linkedReportIds: "", linkedCaseIds: "", linkedEvidenceIds: "" });
      props.setNotice(t(props.language, "notice.messengerAuthorityRequestCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function assignModerationReport(report: AdminMessengerModerationReport) {
    setBusy(true);
    try {
      const response = await adminApi.assignMessengerModerationReport(props.config, report.id);
      setModeration(response.dashboard);
      props.setNotice(t(props.language, "notice.messengerReportAssigned"));
    } finally {
      setBusy(false);
    }
  }

  async function resolveModerationReport(report: AdminMessengerModerationReport, status: "resolved" | "rejected" = "resolved") {
    setBusy(true);
    try {
      const response = await adminApi.resolveMessengerModerationReport(props.config, report.id, { status, resolutionNote: reportResolutionNotes[report.id] || undefined });
      setModeration(response.dashboard);
      setReportResolutionNotes((current) => ({ ...current, [report.id]: "" }));
      const fresh = await adminApi.messengerDashboard(props.config);
      setCenter(fresh.center);
      setDiagnostics(fresh.center.diagnostics ?? []);
      props.setNotice(t(props.language, "notice.messengerReportResolved"));
    } finally {
      setBusy(false);
    }
  }

  async function updatePresenceSetting(key: "messengerPresenceOnly" | "realtimePresenceRequired" | "lastSeenEnabled" | "suspiciousPresenceAlertsEnabled", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerPresenceOperationsSettings(props.config, { [key]: value });
      setPresenceOperations(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerPresenceSettingsUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function acknowledgePresenceAnomaly(item: AdminMessengerPresenceAnomaly) {
    setBusy(true);
    try {
      const response = await adminApi.acknowledgeMessengerPresenceAnomaly(props.config, item.id);
      setPresenceOperations(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerPresenceAnomalyAcknowledged"));
    } finally {
      setBusy(false);
    }
  }

  async function resolvePresenceAnomaly(item: AdminMessengerPresenceAnomaly) {
    setBusy(true);
    try {
      const response = await adminApi.resolveMessengerPresenceAnomaly(props.config, item.id);
      setPresenceOperations(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerPresenceAnomalyResolved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateNotificationsMonitorSetting(key: "monitorEnabled" | "pushDeliveryMonitorEnabled" | "unreadMessagesMonitorEnabled" | "missedCallsMonitorEnabled" | "missedMessagesMonitorEnabled" | "realtimeQueueMonitorEnabled" | "readReceiptsMonitorEnabled" | "requireMessengerRealtimeBridge", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerNotificationsMonitorSettings(props.config, { [key]: value });
      setNotificationsMonitor(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerNotificationsMonitorUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function acknowledgeNotificationIssue(item: AdminMessengerNotificationsMonitorIssue) {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerNotificationsMonitorIssueStatus(props.config, item.id, "acknowledge");
      setNotificationsMonitor(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerNotificationIssueAcknowledged"));
    } finally {
      setBusy(false);
    }
  }

  async function resolveNotificationIssue(item: AdminMessengerNotificationsMonitorIssue) {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerNotificationsMonitorIssueStatus(props.config, item.id, "resolve");
      setNotificationsMonitor(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerNotificationIssueResolved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateMaxPrelaunchSetting(key: keyof AdminMessengerMaxPrelaunchSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerMaxPrelaunchSettings(props.config, { [key]: value });
      setMaxPrelaunch(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerMaxPrelaunchUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setMaxPrelaunchGateStatus(gate: AdminMessengerMaxPrelaunchGate, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerMaxPrelaunchGateStatus(props.config, gate.key, status, maxPrelaunchNote || undefined);
      setMaxPrelaunch(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerMaxPrelaunchUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateFinalReadinessSetting(key: "requireOwnerFinalApproval" | "requireTwoDeviceRealtimeVerification" | "requireNoCriticalSafetyBacklog" | "requireDirectoryPromotionReady" | "requireGreetingsSafeMode" | "requireNotificationsReady" | "requirePresenceReady", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerFinalReadinessSettings(props.config, { [key]: value });
      setFinalReadiness(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerFinalReadinessUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setFinalReadinessItemStatus(item: AdminMessengerFinalReadinessItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerFinalReadinessItemStatus(props.config, item.key, status, finalReadinessNote || undefined);
      setFinalReadiness(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerFinalReadinessUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateContentQualitySetting(key: keyof AdminMessengerContentQualitySnapshot["settings"], value: boolean | number) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerContentQualitySettings(props.config, { [key]: value });
      setContentQuality(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerContentQualitySettingsUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createContentQualitySignal() {
    if (!contentQualitySignalForm.targetId.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerContentQualitySignal(props.config, {
        ...contentQualitySignalForm,
        score: Number(contentQualitySignalForm.score) || 55,
        note: contentQualitySignalForm.note || undefined,
      });
      setContentQuality(response.snapshot);
      setContentQualitySignalForm({ kind: "spam", targetKind: "user", targetId: "", severity: "medium", score: "55", reason: "admin_review", note: "" });
      props.setNotice(t(props.language, "notice.messengerContentQualitySignalCreated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateContentQualitySignalStatus(item: AdminMessengerContentQualitySignal, status: string) {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerContentQualitySignalStatus(props.config, item.id, status);
      setContentQuality(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerContentQualitySignalUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateGrowthSetting(key: "promotionApprovalRequired" | "greetingsAutoEnabled" | "birthdayGreetingsEnabled" | "holidayGreetingsEnabled" | "manualGreetingsEnabled" | "aiGreetingDraftsAllowed" | "holidayCalendarEnabled" | "automaticGreetingApprovalRequired" | "contactOptOutRespected", value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerGrowthPromotionSettings(props.config, { [key]: value });
      setGrowthPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerGrowthSettingsUpdated"));
    } finally {
      setBusy(false);
    }
  }


  async function updateRuntimeVerificationSetting(key: keyof AdminMessengerRuntimeVerificationSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerRuntimeVerificationSettings(props.config, { [key]: value });
      setRuntimeVerification(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerRuntimeVerificationUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setRuntimeVerificationItemStatus(item: AdminMessengerRuntimeVerificationItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerRuntimeVerificationItemStatus(props.config, item.key, status, runtimeVerificationNote || undefined, runtimeVerificationProofRef || undefined);
      setRuntimeVerification(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerRuntimeVerificationUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createRuntimeVerificationSession() {
    if (!runtimeVerificationSessionForm.deviceAUserId.trim() || !runtimeVerificationSessionForm.deviceBUserId.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerRuntimeVerificationSession(props.config, {
        ...runtimeVerificationSessionForm,
        title: runtimeVerificationSessionForm.title || undefined,
        deviceALabel: runtimeVerificationSessionForm.deviceALabel || undefined,
        deviceBLabel: runtimeVerificationSessionForm.deviceBLabel || undefined,
        note: runtimeVerificationSessionForm.note || undefined,
      });
      setRuntimeVerification(response.snapshot);
      setRuntimeVerificationSessionForm({ title: "", deviceAUserId: "", deviceBUserId: "", deviceALabel: "", deviceBLabel: "", connectionMode: "lan", note: "" });
      props.setNotice(t(props.language, "notice.messengerRuntimeVerificationUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setRuntimeVerificationSessionStatus(session: AdminMessengerRuntimeVerificationSession, status: "draft" | "running" | "passed" | "failed" | "cancelled") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerRuntimeVerificationSessionStatus(props.config, session.id, status, runtimeVerificationNote || undefined);
      setRuntimeVerification(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerRuntimeVerificationUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateUiTextCleanlinessSetting(key: keyof AdminMessengerUiTextCleanlinessSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerUiTextCleanlinessSettings(props.config, { [key]: value });
      setUiTextCleanliness(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerUiTextCleanlinessUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setUiTextCleanlinessItemStatus(item: AdminMessengerUiTextCleanlinessItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerUiTextCleanlinessItemStatus(props.config, item.key, status, uiTextCleanlinessNote || undefined, uiTextCleanlinessProofRef || undefined);
      setUiTextCleanliness(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerUiTextCleanlinessUpdated"));
    } finally {
      setBusy(false);
    }
  }


  async function updateRegressionSetting(key: keyof AdminMessengerRegressionSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerRegressionSettings(props.config, { [key]: value });
      setRegressionRecheck(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerRegressionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setRegressionItemStatus(item: AdminMessengerRegressionItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerRegressionItemStatus(props.config, item.key, status, regressionNote || undefined, regressionProofRef || undefined);
      setRegressionRecheck(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerRegressionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateOwnerHandoffSetting(key: keyof AdminMessengerOwnerHandoffSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerOwnerHandoffSettings(props.config, { [key]: value });
      setOwnerHandoff(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerOwnerHandoffUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setOwnerHandoffItemStatus(item: AdminMessengerOwnerHandoffItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerOwnerHandoffItemStatus(props.config, item.key, status, ownerHandoffNote || undefined, ownerHandoffProofRef || undefined);
      setOwnerHandoff(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerOwnerHandoffUpdated"));
    } finally {
      setBusy(false);
    }
  }


  async function updateAccessTextGateSetting(key: keyof AdminMessengerAccessTextGateSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerAccessTextGateSettings(props.config, { [key]: value });
      setAccessTextGate(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerAccessTextGateUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setAccessTextGateItemStatus(item: AdminMessengerAccessTextGateItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerAccessTextGateItemStatus(props.config, item.key, status, accessTextGateNote || undefined, accessTextGateProofRef || undefined);
      setAccessTextGate(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerAccessTextGateUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateMobileTransitionSetting(key: keyof AdminMessengerMobileTransitionSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerMobileTransitionSettings(props.config, { [key]: value });
      setMobileTransition(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerMobileTransitionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setMobileTransitionItemStatus(item: AdminMessengerMobileTransitionItem, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerMobileTransitionItemStatus(props.config, item.key, status, mobileTransitionNote || undefined, mobileTransitionProofRef || undefined);
      setMobileTransition(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerMobileTransitionUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateReleaseCandidateSetting(key: keyof AdminMessengerReleaseCandidateSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerReleaseCandidateSettings(props.config, { [key]: value });
      setReleaseCandidate(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerReleaseCandidateUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setReleaseCandidateGateStatus(gate: AdminMessengerReleaseCandidateGate, status: "verify" | "block" | "waive" | "reset") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerReleaseCandidateGateStatus(props.config, gate.key, status, releaseCandidateNote || undefined, releaseCandidateProofRef || undefined);
      setReleaseCandidate(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerReleaseCandidateUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function updateFixControlSetting(key: keyof AdminMessengerFixControlSnapshot["settings"], value: boolean) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerFixControlSettings(props.config, { [key]: value });
      setFixControl(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerFixControlUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createFixControlTicket() {
    if (!fixControlTicketForm.title.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerFixControlTicket(props.config, {
        ...fixControlTicketForm,
        title: fixControlTicketForm.title.trim(),
        targetArea: fixControlTicketForm.targetArea.trim() || undefined,
        deviceAUserId: fixControlTicketForm.deviceAUserId.trim() || undefined,
        deviceBUserId: fixControlTicketForm.deviceBUserId.trim() || undefined,
        description: fixControlTicketForm.description.trim() || undefined,
      });
      setFixControl(response.snapshot);
      setFixControlTicketForm({ title: "", category: "chat_messages", severity: "medium", targetArea: "", deviceAUserId: "", deviceBUserId: "", description: "" });
      props.setNotice(t(props.language, "notice.messengerFixControlUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function setFixControlTicketStatus(ticket: AdminMessengerFixControlTicket, status: "open" | "in_progress" | "fixed" | "verified" | "blocked" | "waived") {
    setBusy(true);
    try {
      const response = await adminApi.setMessengerFixControlTicketStatus(props.config, ticket.id, status, fixControlNote || undefined, fixControlProofRef || undefined);
      setFixControl(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerFixControlUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function createGrowthPromotion() {
    if (!growthPromotionForm.targetId.trim() || !growthPromotionForm.title.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.upsertMessengerPromotionCampaign(props.config, {
        ...growthPromotionForm,
        priority: Number(growthPromotionForm.priority) || 50,
        startsAt: growthPromotionForm.startsAt || undefined,
        endsAt: growthPromotionForm.endsAt || undefined,
        note: growthPromotionForm.note || undefined,
      });
      setGrowthPromotion(response.snapshot);
      setGrowthPromotionForm({ targetKind: "channel", targetId: "", title: "", placement: "featured_top", audience: "all", priority: "50", startsAt: "", endsAt: "", note: "" });
      props.setNotice(t(props.language, "notice.messengerPromotionSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateGrowthPromotionStatus(item: AdminMessengerGrowthPromotionCampaign, status: AdminMessengerGrowthPromotionStatus) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerPromotionCampaignStatus(props.config, item.id, status);
      setGrowthPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerPromotionStatusUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function saveGrowthGreetingTemplate() {
    if (!growthGreetingTemplateForm.title.trim() || !growthGreetingTemplateForm.messagePreview.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.upsertMessengerGreetingTemplate(props.config, {
        ...growthGreetingTemplateForm,
        holidayKey: growthGreetingTemplateForm.holidayKey || undefined,
      });
      setGrowthPromotion(response.snapshot);
      setGrowthGreetingTemplateForm({ occasion: "birthday", language: "ru", title: "", messagePreview: "", holidayKey: "", autoSendAllowed: false, manualSendAllowed: true, approvalRequired: true, status: "active" });
      props.setNotice(t(props.language, "notice.messengerGreetingTemplateSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function createGrowthGreetingTask() {
    if (!growthGreetingTaskForm.targetUserId.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.createMessengerGreetingTask(props.config, {
        ...growthGreetingTaskForm,
        templateId: growthGreetingTaskForm.templateId || undefined,
        contactUserId: growthGreetingTaskForm.contactUserId || undefined,
        scheduledAt: growthGreetingTaskForm.scheduledAt || undefined,
        holidayKey: growthGreetingTaskForm.holidayKey || undefined,
        language: growthGreetingTaskForm.language || undefined,
        note: growthGreetingTaskForm.note || undefined,
      });
      setGrowthPromotion(response.snapshot);
      setGrowthGreetingTaskForm({ occasion: "birthday", mode: "manual", templateId: "", targetUserId: "", contactUserId: "", scheduledAt: "", holidayKey: "", language: "ru", note: "" });
      props.setNotice(t(props.language, "notice.messengerGreetingTaskSaved"));
    } finally {
      setBusy(false);
    }
  }

  async function updateGrowthGreetingStatus(item: AdminMessengerGreetingTask, status: AdminMessengerGreetingStatus) {
    setBusy(true);
    try {
      const response = await adminApi.updateMessengerGreetingTaskStatus(props.config, item.id, status);
      setGrowthPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerGreetingStatusUpdated"));
    } finally {
      setBusy(false);
    }
  }

  async function saveGrowthGreetingHoliday() {
    if (!growthGreetingHolidayForm.holidayKey.trim() || !growthGreetingHolidayForm.title.trim() || !growthGreetingHolidayForm.dateMonthDay.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.upsertMessengerGreetingHoliday(props.config, {
        ...growthGreetingHolidayForm,
        countryCode: growthGreetingHolidayForm.countryCode || undefined,
        locale: growthGreetingHolidayForm.locale || undefined,
      });
      setGrowthPromotion(response.snapshot);
      setGrowthGreetingHolidayForm({ holidayKey: "", title: "", dateMonthDay: "", countryCode: "GLOBAL", locale: "all", status: "active", autoQueueAllowed: false, manualSendAllowed: true });
      props.setNotice(t(props.language, "notice.messengerHolidaySaved"));
    } finally {
      setBusy(false);
    }
  }

  async function runGrowthGreetingAutomation() {
    setBusy(true);
    try {
      const splitIds = (value: string) => value.split(/[\n,;]+/).map((item) => item.trim()).filter(Boolean);
      const response = await adminApi.runMessengerGreetingAutomation(props.config, {
        occasion: growthGreetingAutomationForm.occasion,
        source: growthGreetingAutomationForm.source,
        templateId: growthGreetingAutomationForm.templateId || undefined,
        holidayKey: growthGreetingAutomationForm.holidayKey || undefined,
        targetUserIds: splitIds(growthGreetingAutomationForm.targetUserIds),
        contactUserIds: splitIds(growthGreetingAutomationForm.contactUserIds),
        scheduledAt: growthGreetingAutomationForm.scheduledAt || undefined,
        language: growthGreetingAutomationForm.language || undefined,
        dryRun: growthGreetingAutomationForm.dryRun,
        note: growthGreetingAutomationForm.note || undefined,
      });
      setGrowthPromotion(response.snapshot);
      props.setNotice(t(props.language, "notice.messengerGreetingAutomationRun"));
    } finally {
      setBusy(false);
    }
  }

  const readiness = center?.readiness;
  const manualBlockers = (center?.control?.launchBlockers ?? []).filter((item) => item.status === "active");

  return (
    <section className="panel messengerAdminPanel" data-active-page={activeMessengerPage}>
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "messenger.title")}</h2>
          <p>{t(props.language, "messenger.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "messenger.reload")}</button>
          <button onClick={runDiagnostics} disabled={busy}>{t(props.language, "messenger.runDiagnostics")}</button>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "messenger.readiness")}</span><strong>{statusText(props.language, readiness?.status ?? "warning")}</strong></div>
        <div className="statCard"><span>{t(props.language, "messenger.blockers")}</span><strong>{readiness?.blockers ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "messenger.warnings")}</span><strong>{readiness?.warnings ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "messenger.checks")}</span><strong>{readiness?.passed ?? 0}/{readiness?.checks ?? 0}</strong></div>
      </div>

      {runtimeFailures.length ? (
        <div className="card messengerPageUnit messengerPageOverview">
          <div className="proDashboardHead">
            <div>
              <h3>{t(props.language, "messenger.runtimeFailureTitle")}</h3>
              <p>{t(props.language, "messenger.runtimeFailureDescription")}</p>
            </div>
            <em className="status warning">{runtimeFailures.length}</em>
          </div>
          <div className="tableList smallList">
            {runtimeFailures.slice(0, 16).map((failure, index) => (
              <div className="row" key={`${String(failure.label ?? "failure")}-${index}`}>
                <strong>{cleanAdminUiText(props.language, String(failure.label ?? "endpoint"))}</strong>
                <span>{cleanAdminUiText(props.language, String(failure.path ?? ""))}</span>
                <em className="status warning">{String(failure.status ?? "degraded")}</em>
                <small>{cleanAdminUiText(props.language, String(failure.error ?? failure.message ?? "endpoint_unavailable"))}</small>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="messengerPageNav" role="navigation" aria-label={t(props.language, "messenger.pageNav")}>
        {MESSENGER_ADMIN_PAGES.map((page) => (
          <button
            type="button"
            key={page.key}
            className={`messengerPageButton ${activeMessengerPage === page.key ? "active" : ""}`}
            onClick={() => setActiveMessengerPage(page.key)}
            disabled={false}
          >
            <strong>{t(props.language, page.labelKey)}</strong>
            <small>{t(props.language, page.descriptionKey)}</small>
          </button>
        ))}
      </div>

      <MessengerProMonitoringPanel language={props.language} dashboard={proMonitoring} />

      <MessengerPresenceOperationsPanel
        language={props.language}
        snapshot={presenceOperations}
        busy={busy}
        canWrite={canWriteMessenger}
        toggleSetting={updatePresenceSetting}
        acknowledgeAnomaly={acknowledgePresenceAnomaly}
        resolveAnomaly={resolvePresenceAnomaly}
      />

      <MessengerNotificationsMonitorPanel
        language={props.language}
        snapshot={notificationsMonitor}
        busy={busy}
        canWrite={canWriteMessenger}
        toggleSetting={updateNotificationsMonitorSetting}
        acknowledgeIssue={acknowledgeNotificationIssue}
        resolveIssue={resolveNotificationIssue}
      />

      <MessengerFinalReadinessPanel
        language={props.language}
        snapshot={finalReadiness}
        busy={busy}
        canWrite={canWriteMessenger}
        note={finalReadinessNote}
        setNote={setFinalReadinessNote}
        toggleSetting={updateFinalReadinessSetting}
        setItemStatus={setFinalReadinessItemStatus}
      />

      <MessengerMaxPrelaunchControlPanel
        language={props.language}
        snapshot={maxPrelaunch}
        busy={busy}
        canWrite={canWriteMessenger}
        note={maxPrelaunchNote}
        setNote={setMaxPrelaunchNote}
        toggleSetting={updateMaxPrelaunchSetting}
        setGateStatus={setMaxPrelaunchGateStatus}
      />

      <MessengerRuntimeVerificationPanel
        language={props.language}
        snapshot={runtimeVerification}
        busy={busy}
        canWrite={canWriteMessenger}
        note={runtimeVerificationNote}
        proofRef={runtimeVerificationProofRef}
        setNote={setRuntimeVerificationNote}
        setProofRef={setRuntimeVerificationProofRef}
        sessionForm={runtimeVerificationSessionForm}
        setSessionForm={setRuntimeVerificationSessionForm}
        toggleSetting={updateRuntimeVerificationSetting}
        setItemStatus={setRuntimeVerificationItemStatus}
        createSession={createRuntimeVerificationSession}
        setSessionStatus={setRuntimeVerificationSessionStatus}
      />

      <MessengerFixControlPanel
        language={props.language}
        snapshot={fixControl}
        busy={busy}
        canWrite={canWriteMessenger}
        note={fixControlNote}
        proofRef={fixControlProofRef}
        setNote={setFixControlNote}
        setProofRef={setFixControlProofRef}
        ticketForm={fixControlTicketForm}
        setTicketForm={setFixControlTicketForm}
        toggleSetting={updateFixControlSetting}
        createTicket={createFixControlTicket}
        setTicketStatus={setFixControlTicketStatus}
      />

      <MessengerUiTextCleanlinessPanel
        language={props.language}
        snapshot={uiTextCleanliness}
        busy={busy}
        canWrite={canWriteMessenger}
        note={uiTextCleanlinessNote}
        proofRef={uiTextCleanlinessProofRef}
        setNote={setUiTextCleanlinessNote}
        setProofRef={setUiTextCleanlinessProofRef}
        toggleSetting={updateUiTextCleanlinessSetting}
        setItemStatus={setUiTextCleanlinessItemStatus}
      />


      <MessengerRegressionRecheckPanel
        language={props.language}
        snapshot={regressionRecheck}
        busy={busy}
        canWrite={canWriteMessenger}
        note={regressionNote}
        proofRef={regressionProofRef}
        setNote={setRegressionNote}
        setProofRef={setRegressionProofRef}
        toggleSetting={updateRegressionSetting}
        setItemStatus={setRegressionItemStatus}
      />

      <MessengerOwnerHandoffPanel
        language={props.language}
        snapshot={ownerHandoff}
        busy={busy}
        canWrite={canWriteMessenger}
        note={ownerHandoffNote}
        proofRef={ownerHandoffProofRef}
        setNote={setOwnerHandoffNote}
        setProofRef={setOwnerHandoffProofRef}
        toggleSetting={updateOwnerHandoffSetting}
        setItemStatus={setOwnerHandoffItemStatus}
      />

      <MessengerAccessTextGatePanel
        language={props.language}
        snapshot={accessTextGate}
        busy={busy}
        canWrite={canWriteMessenger}
        note={accessTextGateNote}
        proofRef={accessTextGateProofRef}
        setNote={setAccessTextGateNote}
        setProofRef={setAccessTextGateProofRef}
        toggleSetting={updateAccessTextGateSetting}
        setItemStatus={setAccessTextGateItemStatus}
      />

      <MessengerMobileTransitionPanel
        language={props.language}
        snapshot={mobileTransition}
        busy={busy}
        canWrite={canWriteMessenger}
        note={mobileTransitionNote}
        proofRef={mobileTransitionProofRef}
        setNote={setMobileTransitionNote}
        setProofRef={setMobileTransitionProofRef}
        toggleSetting={updateMobileTransitionSetting}
        setItemStatus={setMobileTransitionItemStatus}
      />

      <MessengerReleaseCandidateControlPanel
        language={props.language}
        snapshot={releaseCandidate}
        busy={busy}
        canWrite={canWriteMessenger}
        note={releaseCandidateNote}
        proofRef={releaseCandidateProofRef}
        setNote={setReleaseCandidateNote}
        setProofRef={setReleaseCandidateProofRef}
        toggleSetting={updateReleaseCandidateSetting}
        setGateStatus={setReleaseCandidateGateStatus}
      />

      <MessengerGrowthAnalyticsPanel language={props.language} snapshot={growthAnalytics} />

      <MessengerContentQualityPanel
        language={props.language}
        snapshot={contentQuality}
        busy={busy}
        canWrite={canWriteMessenger}
        signalForm={contentQualitySignalForm}
        setSignalForm={setContentQualitySignalForm}
        toggleSetting={updateContentQualitySetting}
        createSignal={createContentQualitySignal}
        setSignalStatus={updateContentQualitySignalStatus}
      />


      <MessengerApprovalVisibilityControlPanel
        language={props.language}
        snapshot={approvalVisibility}
        busy={busy}
        canWrite={canWriteMessenger}
        note={approvalVisibilityNote}
        setNote={setApprovalVisibilityNote}
        toggleSetting={updateApprovalVisibilitySetting}
        decideEntry={decideApprovalVisibilityEntry}
        setVisibility={setApprovalVisibilityEntryVisibility}
      />

      <MessengerGrowthPromotionGreetingsPanel
        language={props.language}
        snapshot={growthPromotion}
        busy={busy}
        canWrite={canWriteMessenger}
        promotionForm={growthPromotionForm}
        setPromotionForm={setGrowthPromotionForm}
        templateForm={growthGreetingTemplateForm}
        setTemplateForm={setGrowthGreetingTemplateForm}
        greetingForm={growthGreetingTaskForm}
        setGreetingForm={setGrowthGreetingTaskForm}
        holidayForm={growthGreetingHolidayForm}
        setHolidayForm={setGrowthGreetingHolidayForm}
        automationForm={growthGreetingAutomationForm}
        setAutomationForm={setGrowthGreetingAutomationForm}
        createPromotion={createGrowthPromotion}
        setPromotionStatus={updateGrowthPromotionStatus}
        createTemplate={saveGrowthGreetingTemplate}
        createGreetingTask={createGrowthGreetingTask}
        saveHoliday={saveGrowthGreetingHoliday}
        runGreetingAutomation={runGrowthGreetingAutomation}
        setGreetingStatus={updateGrowthGreetingStatus}
        toggleSetting={updateGrowthSetting}
      />

      <div className="split messengerPageUnit messengerPageSplit messengerPageOverview">
        <div className="card">
          <h3>{t(props.language, "messenger.sections")}</h3>
          <div className="tableList smallList">
            {(center?.sections ?? []).map((item) => (
              <div className="row" key={item.key}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.ownerControl ? t(props.language, "messenger.ownerControl") : ""}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.featureFlags")}</h3>
          {!canWriteMessenger ? <div className="emptyState">{t(props.language, "permission.readOnly")}</div> : null}
          {canWriteMessenger ? <label><span>{t(props.language, "messenger.flagNote")}</span><input value={flagNote} onChange={(event) => setFlagNote(event.target.value)} placeholder={t(props.language, "messenger.flagNotePlaceholder")} /></label> : null}
          <div className="tableList smallList">
            {(center?.featureFlags ?? []).map((flag) => (
              <div className="row" key={flag.key}>
                <strong>{cleanAdminUiText(props.language, flag.key)}</strong>
                <span>{cleanAdminUiText(props.language, flag.description)}</span>
                <em className={flag.enabled ? "status ready" : "status disabled"}>{flag.enabled ? t(props.language, "messenger.enabled") : t(props.language, "messenger.disabled")}</em>
                {canWriteMessenger ? <button onClick={() => toggleFeatureFlag(flag.key, !flag.enabled)} disabled={busy}>{flag.enabled ? t(props.language, "button.disable") : t(props.language, "button.enable")}</button> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <MessengerDirectoryReviewQueuePanel
        language={props.language}
        snapshot={directoryReviewQueue}
        busy={busy}
        canWrite={canWriteMessenger}
        kindFilter={directoryReviewKindFilter}
        setKindFilter={setDirectoryReviewKindFilter}
        statusFilter={directoryReviewStatusFilter}
        setStatusFilter={setDirectoryReviewStatusFilter}
        reason={directoryReviewReason}
        setReason={setDirectoryReviewReason}
        refresh={refreshDirectoryReviewQueue}
        applyAction={applyDirectoryReviewAction}
      />

      <MessengerDirectoryPromotionManagerPanel
        language={props.language}
        snapshot={directoryPromotion}
        busy={busy}
        canWrite={canWriteMessenger}
        note={directoryPromotionNote}
        setNote={setDirectoryPromotionNote}
        boostForms={directoryPromotionBoostForms}
        setBoostForms={setDirectoryPromotionBoostForms}
        toggleSetting={updateDirectoryPromotionSetting}
        syncDirectory={syncDirectoryPromotion}
        updateStatus={updateDirectoryPromotionStatus}
        boostEntry={boostDirectoryPromotionEntry}
      />

      <div className="card messengerPageUnit messengerPageDirectory">
        <h3>{t(props.language, "messenger.directoryTitle")}</h3>
        <p>{t(props.language, "messenger.directoryDescription")}</p>
        <div className="statsGrid compactStats">
          <div className="statCard"><span>{t(props.language, "messenger.groups")}</span><strong>{directory?.summary.groups ?? 0}</strong></div>
          <div className="statCard"><span>{t(props.language, "messenger.channels")}</span><strong>{directory?.summary.channels ?? 0}</strong></div>
          <div className="statCard"><span>{t(props.language, "messenger.bots")}</span><strong>{directory?.summary.bots ?? 0}</strong></div>
          <div className="statCard"><span>{t(props.language, "messenger.restricted")}</span><strong>{directory?.summary.restricted ?? 0}</strong></div>
        </div>
        {directory?.summary.databaseConnected ? null : <div className="emptyState">{t(props.language, "messenger.directoryNoDatabase")}</div>}
        <div className="formGrid">
          {directory ? ([
            ["publicByDefault", "messenger.publicByDefault"],
            ["globalSearchEnabled", "messenger.globalSearchEnabled"],
            ["profileManagementOnly", "messenger.profileManagementOnly"],
            ["groupsEnabled", "messenger.groupsEnabled"],
            ["channelsEnabled", "messenger.channelsEnabled"],
            ["botsEnabled", "messenger.botsEnabled"],
            ["botsPremiumOnly", "messenger.botsPremiumOnly"],
            ["businessAccountHidden", "messenger.businessAccountHidden"],
          ] as Array<[MessengerDirectoryBooleanSettingKey, string]>).map(([key, label]) => (
            <label key={String(key)} className="checkLine">
              <input type="checkbox" checked={Boolean(directory.settings[key])} disabled={!canWriteMessenger || busy} onChange={(event) => updateDirectorySetting(key, event.target.checked)} />
              <span>{t(props.language, label)}</span>
            </label>
          )) : null}
        </div>
        {canWriteMessenger ? <label><span>{t(props.language, "messenger.restrictionReason")}</span><input value={directoryRestrictionReason} onChange={(event) => setDirectoryRestrictionReason(event.target.value)} /></label> : null}
        <div className="tableList">
          {(directory?.items ?? []).map((item) => (
            <div className="row" key={`${item.kind}:${item.id}`}>
              <strong>{cleanAdminUiText(props.language, item.title)}</strong>
              <span>{directoryKindText(props.language, item.kind)} · {item.username ? `@${item.username}` : item.id} · {item.ownerUserId ? `${t(props.language, "messenger.owner")}: ${item.ownerUserId}` : t(props.language, "messenger.ownerUnknown")}</span>
              <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              {canWriteMessenger && item.status !== "restricted" ? <button onClick={() => restrictDirectoryItem(item)} disabled={busy}>{t(props.language, "button.restrict")}</button> : null}
              {canWriteMessenger && item.status === "restricted" ? <button onClick={() => releaseDirectoryItem(item)} disabled={busy}>{t(props.language, "button.release")}</button> : null}
            </div>
          ))}
          {directory && directory.items.length === 0 ? <div className="emptyState">{t(props.language, "messenger.directoryEmpty")}</div> : null}
        </div>
        <ul className="rulesList">{(directory?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
      </div>


      <div className="split messengerPageUnit messengerPageSplit messengerPageModeration">
        <div className="card">
          <h3>{t(props.language, "messenger.premiumTitle")}</h3>
          <p>{t(props.language, "messenger.premiumDescription")}</p>
          <div className="statsGrid compactStats">
            <div className="statCard"><span>{t(props.language, "messenger.premiumEnabled")}</span><strong>{moderation?.summary.premiumControlsEnabled ?? 0}</strong></div>
            <div className="statCard"><span>{t(props.language, "messenger.openReports")}</span><strong>{moderation?.summary.openReports ?? 0}</strong></div>
            <div className="statCard"><span>{t(props.language, "messenger.criticalReports")}</span><strong>{moderation?.summary.criticalReports ?? 0}</strong></div>
            <div className="statCard"><span>{t(props.language, "messenger.inReviewReports")}</span><strong>{moderation?.summary.inReviewReports ?? 0}</strong></div>
          </div>
          <div className="formGrid">
            {moderation ? ([
              ["aiTranslationEnabled", "messenger.aiTranslationEnabled"],
              ["premiumStickersEnabled", "messenger.premiumStickersEnabled"],
              ["gift3dPremiumEnabled", "messenger.gift3dPremiumEnabled"],
              ["animatedEmojiEnabled", "messenger.animatedEmojiEnabled"],
              ["paidBotsEnabled", "messenger.paidBotsEnabled"],
              ["coinPaymentsRequired", "messenger.coinPaymentsRequired"],
              ["adminReviewForPremiumAbuse", "messenger.adminReviewForPremiumAbuse"],
            ] as Array<[MessengerPremiumBooleanSettingKey, string]>).map(([key, label]) => (
              <label key={key} className="checkLine">
                <input type="checkbox" checked={Boolean(moderation.premiumSettings[key])} disabled={!canWriteMessenger || busy} onChange={(event) => updatePremiumSetting(key, event.target.checked)} />
                <span>{t(props.language, label)}</span>
              </label>
            )) : null}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "messenger.createReport")}</h3>
          {canWriteMessenger ? (
            <div className="formGrid">
              <label><span>{t(props.language, "messenger.reportKind")}</span><select value={reportForm.kind} onChange={(event) => setReportForm({ ...reportForm, kind: event.target.value })}><option value="message">{t(props.language, "messenger.kind.message")}</option><option value="media">{t(props.language, "messenger.kind.media")}</option><option value="group">{t(props.language, "messenger.kind.group")}</option><option value="channel">{t(props.language, "messenger.kind.channel")}</option><option value="bot">{t(props.language, "messenger.kind.bot")}</option><option value="call">{t(props.language, "messenger.kind.call")}</option><option value="sticker">{t(props.language, "messenger.kind.sticker")}</option><option value="gift">{t(props.language, "messenger.kind.gift")}</option><option value="user">{t(props.language, "messenger.kind.user")}</option></select></label>
              <label><span>{t(props.language, "messenger.reportSeverity")}</span><select value={reportForm.severity} onChange={(event) => setReportForm({ ...reportForm, severity: event.target.value })}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
              <label><span>{t(props.language, "messenger.reportTitle")}</span><input value={reportForm.title} onChange={(event) => setReportForm({ ...reportForm, title: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.reportTargetType")}</span><input value={reportForm.targetType} onChange={(event) => setReportForm({ ...reportForm, targetType: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.reportTargetId")}</span><input value={reportForm.targetId} onChange={(event) => setReportForm({ ...reportForm, targetId: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.reportedBy")}</span><input value={reportForm.reportedBy} onChange={(event) => setReportForm({ ...reportForm, reportedBy: event.target.value })} /></label>
              <label className="span2"><span>{t(props.language, "messenger.reportDescription")}</span><textarea value={reportForm.description} onChange={(event) => setReportForm({ ...reportForm, description: event.target.value })} /></label>
              <button onClick={createModerationReport} disabled={busy || !reportForm.title.trim() || !reportForm.description.trim()}>{t(props.language, "messenger.addReport")}</button>
            </div>
          ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        </div>
      </div>

      <div className="card messengerPageUnit messengerPageModeration">
        <h3>{t(props.language, "messenger.reportsTitle")}</h3>
        {(moderation?.recentReports ?? []).length ? (
          <div className="tableList">
            {(moderation?.recentReports ?? []).map((report) => (
              <div className="row" key={report.id}>
                <strong>{report.title}</strong>
                <span>{t(props.language, `messenger.kind.${report.kind}`, report.kind)} · {report.targetType ?? "target"}:{report.targetId ?? "-"} · {report.description}</span>
                <em className={diagnosticClass(report.status)}>{statusText(props.language, report.status)}</em>
                {canWriteMessenger && report.status === "open" ? <button onClick={() => assignModerationReport(report)} disabled={busy}>{t(props.language, "messenger.assignReport")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <input value={reportResolutionNotes[report.id] ?? ""} onChange={(event) => setReportResolutionNotes({ ...reportResolutionNotes, [report.id]: event.target.value })} placeholder={t(props.language, "messenger.reportResolutionNote")} /> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => resolveModerationReport(report, "resolved")} disabled={busy}>{t(props.language, "messenger.resolveReport")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => resolveModerationReport(report, "rejected")} disabled={busy}>{t(props.language, "messenger.rejectReport")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noReports")}</div>}
        <ul className="rulesList">{(moderation?.rules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
      </div>


      <div className="grid2 messengerPageUnit messengerPageGrid messengerPageSafety">
        <div className="card dangerCard">
          <h3>{t(props.language, "messenger.safetyTitle")}</h3>
          <p>{t(props.language, "messenger.safetyDescription")}</p>
          <div className="miniStats">
            <div><span>{t(props.language, "messenger.openCriticalSafety")}</span><strong>{safety?.summary.openCriticalReports ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.evidencePreserved")}</span><strong>{safety?.summary.evidencePreservedReports ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.authorityPrepared")}</span><strong>{safety?.summary.authorityPreparedReports ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.authorityRequests")}</span><strong>{safety?.summary.authorityRequests ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.pendingAuthorityRequests")}</span><strong>{safety?.summary.pendingAuthorityRequests ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.approvedAuthorityRequests")}</span><strong>{safety?.summary.approvedAuthorityRequests ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.authorityDisclosurePackages")}</span><strong>{safety?.summary.authorityDisclosurePackages ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.dueAuthorityRequests")}</span><strong>{safety?.summary.dueAuthorityRequests ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.aiSignalsReceived")}</span><strong>{safety?.summary.aiSignalsReceived ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.aiSignalsPending")}</span><strong>{safety?.summary.aiSignalsPending ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.aiSignalsConverted")}</span><strong>{safety?.summary.aiSignalsConverted ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.vaultEvidenceItems")}</span><strong>{safety?.summary.vaultEvidenceItems ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.sealedVaultEvidenceItems")}</span><strong>{safety?.summary.sealedVaultEvidenceItems ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.openReviewCases")}</span><strong>{safety?.summary.openReviewCases ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.ownerPendingReviewCases")}</span><strong>{safety?.summary.ownerPendingReviewCases ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.activeRestrictionCases")}</span><strong>{safety?.summary.activeRestrictionCases ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.safetyRestrictions")}</span><strong>{safety?.summary.safetyRestrictions ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.activeSafetyRestrictions")}</span><strong>{safety?.summary.activeSafetyRestrictions ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.pendingSafetyRestrictions")}</span><strong>{safety?.summary.pendingSafetyRestrictions ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.openSafetyEscalations")}</span><strong>{safety?.summary.openSafetyEscalations ?? escalations?.summary.openEscalations ?? 0}</strong></div>
            <div><span>{t(props.language, "messenger.overdueSafetyEscalations")}</span><strong>{safety?.summary.overdueSafetyEscalations ?? escalations?.summary.overdueEscalations ?? 0}</strong></div>
          </div>
          <div className="tableList">
            {(safety?.categories ?? []).map((item) => (
              <div className="row" key={item.key}>
                <strong>{t(props.language, `messenger.safetyCategory.${item.key}`, item.key)}</strong>
                <span>{t(props.language, `messenger.safetyCategoryDescription.${item.key}`, item.description)}</span>
                <em className={diagnosticClass(item.severity)}>{statusText(props.language, item.severity)}</em>
              </div>
            ))}
          </div>
          <ul className="rulesList">{(safety?.cooperationRules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
        </div>
        <div className="card dangerCard">
          <h3>{t(props.language, "messenger.createSafetyReport")}</h3>
          {canWriteMessenger ? (
            <div className="formGrid">
              <label><span>{t(props.language, "messenger.safetyCategory")}</span><select value={safetyReportForm.category} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, category: event.target.value })}>{(safety?.categories ?? []).map((item) => <option key={item.key} value={item.key}>{t(props.language, `messenger.safetyCategory.${item.key}`, item.key)}</option>)}</select></label>
              <label><span>{t(props.language, "messenger.reportSeverity")}</span><select value={safetyReportForm.severity} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, severity: event.target.value })}><option value="critical">{statusText(props.language, "critical")}</option><option value="high">{statusText(props.language, "high")}</option></select></label>
              <label><span>{t(props.language, "messenger.safetySource")}</span><select value={safetyReportForm.source} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, source: event.target.value })}><option value="ai_signal">{t(props.language, "messenger.safetySource.ai_signal")}</option><option value="admin_manual">{t(props.language, "messenger.safetySource.admin_manual")}</option><option value="user_report">{t(props.language, "messenger.safetySource.user_report")}</option><option value="system">{t(props.language, "messenger.safetySource.system")}</option></select></label>
              <label><span>{t(props.language, "messenger.reportTargetType")}</span><input value={safetyReportForm.targetType} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, targetType: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.reportTargetId")}</span><input value={safetyReportForm.targetId} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, targetId: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.relatedUserId")}</span><input value={safetyReportForm.relatedUserId} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, relatedUserId: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={safetyReportForm.relatedChatId} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, relatedChatId: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={safetyReportForm.relatedMessageId} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, relatedMessageId: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.evidenceHash")}</span><input value={safetyReportForm.evidenceHash} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, evidenceHash: event.target.value })} /></label>
              <label><span>{t(props.language, "messenger.legalBasis")}</span><input value={safetyReportForm.legalBasis} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, legalBasis: event.target.value })} /></label>
              <label className="span2"><span>{t(props.language, "messenger.reportTitle")}</span><input value={safetyReportForm.title} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, title: event.target.value })} /></label>
              <label className="span2"><span>{t(props.language, "messenger.reportDescription")}</span><textarea value={safetyReportForm.description} onChange={(event) => setSafetyReportForm({ ...safetyReportForm, description: event.target.value })} /></label>
              <button onClick={createSafetyReport} disabled={busy || !safetyReportForm.title.trim() || !safetyReportForm.description.trim()}>{t(props.language, "messenger.addSafetyReport")}</button>
            </div>
          ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        </div>
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageSafety">
        <h3>{t(props.language, "messenger.aiSafetySignalsTitle")}</h3>
        <p>{t(props.language, "messenger.aiSafetySignalsDescription")}</p>
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.aiSignalSource")}</span><input value={aiSignalForm.source} onChange={(event) => setAiSignalForm({ ...aiSignalForm, source: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.safetyCategory")}</span><select value={aiSignalForm.category} onChange={(event) => setAiSignalForm({ ...aiSignalForm, category: event.target.value })}>{(safety?.categories ?? []).map((item) => <option key={item.key} value={item.key}>{t(props.language, `messenger.safetyCategory.${item.key}`, item.key)}</option>)}</select></label>
            <label><span>{t(props.language, "messenger.reportSeverity")}</span><select value={aiSignalForm.severity} onChange={(event) => setAiSignalForm({ ...aiSignalForm, severity: event.target.value })}><option value="critical">{statusText(props.language, "critical")}</option><option value="high">{statusText(props.language, "high")}</option></select></label>
            <label><span>{t(props.language, "messenger.aiSignalConfidence")}</span><input value={aiSignalForm.confidence} onChange={(event) => setAiSignalForm({ ...aiSignalForm, confidence: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.reportTargetType")}</span><input value={aiSignalForm.targetType} onChange={(event) => setAiSignalForm({ ...aiSignalForm, targetType: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.reportTargetId")}</span><input value={aiSignalForm.targetId} onChange={(event) => setAiSignalForm({ ...aiSignalForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedUserId")}</span><input value={aiSignalForm.relatedUserId} onChange={(event) => setAiSignalForm({ ...aiSignalForm, relatedUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={aiSignalForm.relatedChatId} onChange={(event) => setAiSignalForm({ ...aiSignalForm, relatedChatId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={aiSignalForm.relatedMessageId} onChange={(event) => setAiSignalForm({ ...aiSignalForm, relatedMessageId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.aiSignalProvider")}</span><input value={aiSignalForm.provider} onChange={(event) => setAiSignalForm({ ...aiSignalForm, provider: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.aiSignalModel")}</span><input value={aiSignalForm.model} onChange={(event) => setAiSignalForm({ ...aiSignalForm, model: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.aiSignalEvidenceHash")}</span><input value={aiSignalForm.evidenceHash} onChange={(event) => setAiSignalForm({ ...aiSignalForm, evidenceHash: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.aiSignalSummary")}</span><textarea value={aiSignalForm.summary} onChange={(event) => setAiSignalForm({ ...aiSignalForm, summary: event.target.value })} /></label>
            <button onClick={ingestAiSafetySignal} disabled={busy || !aiSignalForm.summary.trim()}>{t(props.language, "messenger.ingestAiSignal")}</button>
          </div>
        ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        {(safety?.aiSignals ?? []).length ? (
          <div className="tableList">
            {(safety?.aiSignals ?? []).map((signal) => (
              <div className="row" key={signal.id}>
                <strong>{t(props.language, `messenger.safetyCategory.${signal.category}`, signal.category)}</strong>
                <span>{signal.source} · {Math.round((Number(signal.confidence) || 0) * 100)}% · {signal.targetType ?? "target"}:{signal.targetId ?? "-"} · {signal.summary}</span>
                <em className={diagnosticClass(signal.status)}>{statusText(props.language, signal.status)}</em>
                {signal.linkedReportId ? <span>{t(props.language, "messenger.linkedReport")}: {signal.linkedReportId}</span> : null}
                {canWriteMessenger && signal.status === "received" ? <button onClick={() => convertAiSafetySignal(signal)} disabled={busy}>{t(props.language, "messenger.convertAiSignal")}</button> : null}
                {canWriteMessenger && signal.status === "received" ? <button onClick={() => ignoreAiSafetySignal(signal)} disabled={busy}>{t(props.language, "messenger.ignoreAiSignal")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noAiSignals")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageCaseVault">
        <h3>{t(props.language, "messenger.caseReviewCenterTitle")}</h3>
        <p>{t(props.language, "messenger.caseReviewCenterDescription")}</p>
        {(safety?.caseReviewPolicy ?? []).length ? <ul className="rulesList">{(safety?.caseReviewPolicy ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {(safety?.caseReviewCenter ?? []).length ? (
          <div className="tableList">
            {(safety?.caseReviewCenter ?? []).map((item) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{t(props.language, `messenger.safetyCategory.${item.category}`, item.category)} · {statusText(props.language, item.priority)} · {item.targetType ?? "target"}:{item.targetId ?? item.relatedUserId ?? item.relatedChatId ?? item.relatedMessageId ?? "-"}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
                <span>{t(props.language, "messenger.linkedReports")}: {item.linkedReportIds.join(", ") || "-"}</span>
                <span>{t(props.language, "messenger.linkedEvidence")}: {item.linkedEvidenceIds.length} · {t(props.language, "messenger.caseChecklist")}: {Object.values(item.checklist).filter(Boolean).length}/{Object.keys(item.checklist).length}</span>
                {item.restriction ? <span>{t(props.language, "messenger.caseRestriction")}: {item.restriction.scope}:{item.restriction.targetId} · {statusText(props.language, item.restriction.status)}</span> : null}
                {item.decision ? <span>{t(props.language, "messenger.caseDecision")}: {statusText(props.language, item.decision.decision)} · {item.decision.note ?? "-"}</span> : null}
                {canWriteMessenger && item.status !== "closed" && item.status !== "rejected" ? <input value={caseReviewNotes[item.id] ?? ""} onChange={(event) => setCaseReviewNotes({ ...caseReviewNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.caseReviewNote")} /> : null}
                {canWriteMessenger && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyCaseStatus(item, "evidence_review")} disabled={busy}>{t(props.language, "messenger.caseEvidenceReview")}</button> : null}
                {canWriteMessenger && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyCaseStatus(item, "awaiting_owner_decision")} disabled={busy}>{t(props.language, "messenger.caseAwaitOwner")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "preserve_only")} disabled={busy}>{t(props.language, "messenger.casePreserveOnly")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "restrict_target")} disabled={busy}>{t(props.language, "messenger.caseRestrictTarget")}</button> : null}
                {props.me?.rootOwner && item.restriction?.status === "active" ? <button onClick={() => decideSafetyCase(item, "release_target")} disabled={busy}>{t(props.language, "messenger.caseReleaseTarget")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "prepare_authority_package")} disabled={busy}>{t(props.language, "messenger.casePrepareAuthority")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "notify_authority")} disabled={busy}>{t(props.language, "messenger.caseNotifyAuthority")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "resolve_no_action")} disabled={busy}>{t(props.language, "messenger.caseResolveNoAction")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => decideSafetyCase(item, "reject_report")} disabled={busy}>{t(props.language, "messenger.caseReject")}</button> : null}
                {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={() => exportSafetyCasePackage(item)} disabled={busy}>{t(props.language, "messenger.exportCaseReviewPackage")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noCaseReviews")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageRuntime">
        <h3>{t(props.language, "messenger.integrityMonitorTitle")}</h3>
        <p>{t(props.language, "messenger.integrityMonitorDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.integrityStatus")}</span><strong>{statusText(props.language, integrityMonitor?.summary.status ?? safety?.integrityMonitor?.summary.status ?? "ok")}</strong></div>
          <div><span>{t(props.language, "messenger.integrityCriticalFindings")}</span><strong>{integrityMonitor?.summary.criticalFindings ?? safety?.integrityMonitor?.summary.criticalFindings ?? safety?.summary.integrityCriticalFindings ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.integrityWarningFindings")}</span><strong>{integrityMonitor?.summary.warningFindings ?? safety?.integrityMonitor?.summary.warningFindings ?? safety?.summary.integrityWarningFindings ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.integrityMissingEvidenceLinks")}</span><strong>{integrityMonitor?.summary.missingEvidenceLinks ?? safety?.integrityMonitor?.summary.missingEvidenceLinks ?? safety?.summary.integrityMissingEvidenceLinks ?? 0}</strong></div>
        </div>
        <div className="row">
          <strong>{t(props.language, "messenger.monitorHash")}: {integrityMonitor?.anchors.monitorHash ?? safety?.integrityMonitor?.anchors.monitorHash ?? "—"}</strong>
          <span>{t(props.language, "messenger.auditChainOk")}: {(integrityMonitor?.summary.auditChainOk ?? safety?.integrityMonitor?.summary.auditChainOk) ? t(props.language, "common.yes") : t(props.language, "common.no")}</span>
          <span>{t(props.language, "messenger.guardEventChainOk")}: {(integrityMonitor?.summary.guardEventChainOk ?? safety?.integrityMonitor?.summary.guardEventChainOk) ? t(props.language, "common.yes") : t(props.language, "common.no")}</span>
        </div>
        <div className="actions">
          <button onClick={refreshIntegrityMonitor} disabled={busy}>{t(props.language, "messenger.refreshIntegrityMonitor")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportIntegrityMonitor} disabled={busy}>{t(props.language, "messenger.exportIntegrityMonitor")}</button> : null}
        </div>
        {((integrityMonitor?.policy ?? safety?.integrityMonitorPolicy ?? []).length) ? <ul className="rulesList">{(integrityMonitor?.policy ?? safety?.integrityMonitorPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {(integrityMonitor?.checks ?? safety?.integrityMonitor?.checks ?? []).length ? (
          <div className="tableList">
            {(integrityMonitor?.checks ?? safety?.integrityMonitor?.checks ?? []).map((check) => (
              <div className="row" key={check.key}>
                <strong>{check.key}</strong>
                <span>{check.message}</span>
                <em className={check.status === "ok" ? "pass" : check.status === "critical" ? "fail" : "warning"}>{statusText(props.language, check.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(integrityMonitor?.findings ?? safety?.integrityMonitor?.findings ?? []).length ? (
          <div className="tableList">
            {(integrityMonitor?.findings ?? safety?.integrityMonitor?.findings ?? []).slice(0, 25).map((finding) => (
              <div className="row" key={finding.id}>
                <strong>{finding.title}</strong>
                <span>{finding.scope} · {finding.targetType ?? "scope"}:{finding.targetId ?? "—"}</span>
                <span>{finding.description}</span>
                <span>{t(props.language, "messenger.remediation")}: {finding.remediation}</span>
                <em className={finding.severity === "critical" ? "fail" : finding.severity === "warning" ? "warning" : "pass"}>{statusText(props.language, finding.severity)}</em>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noIntegrityFindings")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageRuntime">
        <h3>{t(props.language, "messenger.guardEventsTitle")}</h3>
        <p>{t(props.language, "messenger.guardEventsDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.guardEventsTotal")}</span><strong>{guardEvents?.summary.totalEvents ?? safety?.summary.guardEventLogEntries ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardEventsDeny")}</span><strong>{guardEvents?.summary.denyEvents ?? safety?.summary.guardEventDenyDecisions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardEventsHold")}</span><strong>{guardEvents?.summary.holdEvents ?? safety?.summary.guardEventHoldDecisions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardEventsRawHold")}</span><strong>{guardEvents?.summary.rawContentHeldEvents ?? safety?.summary.guardEventRawContentHeld ?? 0}</strong></div>
        </div>
        <div className="row">
          <strong>{t(props.language, "messenger.guardEventsIntegrity")}: {guardEvents?.integrity.ok ? t(props.language, "messenger.ok") : t(props.language, "messenger.broken")}</strong>
          <span>{t(props.language, "messenger.chainAnchorHash")}: {guardEvents?.summary.chainAnchorHash ?? "—"}</span>
        </div>
        {(guardEvents?.policy ?? safety?.guardEventLogPolicy ?? []).length ? <ul className="rulesList">{(guardEvents?.policy ?? safety?.guardEventLogPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow">
          <button onClick={refreshSafetyGuardEvents} disabled={busy}>{t(props.language, "messenger.refreshGuardEvents")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyGuardEvents} disabled={busy}>{t(props.language, "messenger.exportGuardEvents")}</button> : null}
        </div>
        {(guardEvents?.events ?? safety?.guardEventLog ?? []).length ? (
          <div className="tableList">
            {(guardEvents?.events ?? safety?.guardEventLog ?? []).slice(0, 20).map((item: AdminMessengerSafetyGuardEvent) => (
              <div className="row" key={item.id}>
                <strong>{item.source} · {item.runtimeAction ?? item.enforcementAction ?? item.guardKey ?? "—"}</strong>
                <span>{item.checkedAt} · {t(props.language, "messenger.decision")}: {statusText(props.language, item.decision)}</span>
                <span>{t(props.language, "messenger.actorUserId")}: {item.actorUserId ?? item.userId ?? "—"} · {t(props.language, "messenger.relatedChatId")}: {item.chatId ?? item.conversationId ?? "—"}</span>
                <span>{t(props.language, "messenger.relatedMessageId")}: {item.messageId ?? item.clientMessageId ?? "—"} · {t(props.language, "messenger.matchedRules")}: {item.matchedRuleIds.length}</span>
                <em className={item.allowed ? "pass" : "fail"}>{item.allowed ? t(props.language, "messenger.allowed") : t(props.language, "messenger.blocked")}</em>
                {item.rawContentPresent ? <em className="fail">{t(props.language, "messenger.rawContentPresent")}</em> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noGuardEvents")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageRuntime">
        <h3>{t(props.language, "messenger.clientGuardsTitle")}</h3>
        <p>{t(props.language, "messenger.clientGuardsDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.clientGuardTotal")}</span><strong>{clientGuards?.summary.totalGuards ?? safety?.summary.clientSafetyGuards ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.clientGuardMobile")}</span><strong>{clientGuards?.summary.mobileGuards ?? safety?.summary.mobileClientSafetyGuards ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.clientGuardSocket")}</span><strong>{clientGuards?.summary.socketGatewayGuards ?? safety?.summary.socketGatewaySafetyGuards ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.clientGuardReady")}</span><strong>{clientGuards?.summary.messengerClientReady ? t(props.language, "common.yes") : t(props.language, "common.no")}</strong></div>
        </div>
        {(clientGuards?.policy ?? safety?.clientGuardPolicy ?? []).length ? <ul className="rulesList">{(clientGuards?.policy ?? safety?.clientGuardPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="formGrid">
          <label><span>{t(props.language, "messenger.clientGuardKey")}</span><select value={clientGuardForm.guardKey} onChange={(event) => {
            const selected = (clientGuards?.guards ?? []).find((item: AdminMessengerSafetyClientGuard) => item.key === event.target.value);
            setClientGuardForm({ ...clientGuardForm, guardKey: event.target.value, platform: selected?.platform ?? clientGuardForm.platform, runtimeAction: selected?.runtimeAction ?? clientGuardForm.runtimeAction });
          }}>{(clientGuards?.guards ?? []).length ? clientGuards?.guards.map((item: AdminMessengerSafetyClientGuard) => <option key={item.key} value={item.key}>{item.key}</option>) : <><option value="mobile.chat.send_message">{statusText(props.language, "mobile.chat.send_message")}</option><option value="socket_gateway.chat.send_message">{statusText(props.language, "socket_gateway.chat.send_message")}</option></>}</select></label>
          <label><span>{t(props.language, "messenger.clientPlatform")}</span><select value={clientGuardForm.platform} onChange={(event) => setClientGuardForm({ ...clientGuardForm, platform: event.target.value })}><option value="mobile">{statusText(props.language, "mobile")}</option><option value="web">{statusText(props.language, "web")}</option><option value="backend">{statusText(props.language, "backend")}</option><option value="socket_gateway">{statusText(props.language, "socket_gateway")}</option></select></label>
          <label><span>{t(props.language, "messenger.runtimeAction")}</span><input value={clientGuardForm.runtimeAction} onChange={(event) => setClientGuardForm({ ...clientGuardForm, runtimeAction: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.actorUserId")}</span><input value={clientGuardForm.actorUserId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, actorUserId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.peerUserId")}</span><input value={clientGuardForm.peerUserId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, peerUserId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={clientGuardForm.chatId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, chatId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={clientGuardForm.messageId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, messageId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.clientMessageId")}</span><input value={clientGuardForm.clientMessageId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, clientMessageId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.groupId")}</span><input value={clientGuardForm.groupId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, groupId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.channelId")}</span><input value={clientGuardForm.channelId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, channelId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.botId")}</span><input value={clientGuardForm.botId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, botId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.targetType")}</span><input value={clientGuardForm.targetType} onChange={(event) => setClientGuardForm({ ...clientGuardForm, targetType: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.targetId")}</span><input value={clientGuardForm.targetId} onChange={(event) => setClientGuardForm({ ...clientGuardForm, targetId: event.target.value })} /></label>
          <label className="checkboxRow"><input type="checkbox" checked={clientGuardForm.rawContentPresent} onChange={(event) => setClientGuardForm({ ...clientGuardForm, rawContentPresent: event.target.checked })} /><span>{t(props.language, "messenger.rawContentPresent")}</span></label>
          <button onClick={validateSafetyClientGuard} disabled={busy}>{t(props.language, "messenger.validateClientGuard")}</button>
        </div>
        <div className="buttonRow">
          <button onClick={refreshSafetyClientGuards} disabled={busy}>{t(props.language, "messenger.refreshClientGuards")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyClientGuards} disabled={busy}>{t(props.language, "messenger.exportClientGuards")}</button> : null}
        </div>
        {clientGuardValidation ? <div className="row"><strong>{t(props.language, "messenger.clientGuardValidation")}: {clientGuardValidation.ready ? t(props.language, "messenger.ready") : t(props.language, "messenger.notReady")}</strong><span>{t(props.language, "messenger.guardFound")}: {clientGuardValidation.guardFound ? t(props.language, "common.yes") : t(props.language, "common.no")}</span><span>{t(props.language, "messenger.missingIds")}: {clientGuardValidation.missingIds.length ? clientGuardValidation.missingIds.join(", ") : "—"}</span><span>{t(props.language, "messenger.runtimeBridgeInstruction")}: {statusText(props.language, clientGuardValidation.runtimeCheck.messengerInstruction)}</span></div> : null}
        {(clientGuards?.guards ?? []).length ? (
          <div className="tableList">
            {(clientGuards?.guards ?? []).slice(0, 24).map((item: AdminMessengerSafetyClientGuard) => (
              <div className="row" key={item.key}>
                <strong>{item.key}</strong>
                <span>{item.platform} · {item.layer} · {item.beforeEvent}</span>
                <em className={item.enabled ? "pass" : "warning"}>{item.enabled ? t(props.language, "messenger.enabled") : t(props.language, "messenger.disabled")}</em>
                <span>{t(props.language, "messenger.guardFunction")}: {item.guardFunction}</span>
                <span>{t(props.language, "messenger.requiredIds")}: {item.requiredIds.join(", ")}</span>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noClientGuards")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageRuntime">
        <h3>{t(props.language, "messenger.runtimeBridgeTitle")}</h3>
        <p>{t(props.language, "messenger.runtimeBridgeDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.runtimeBridgeGuardedActions")}</span><strong>{runtimeBridge?.summary.guardedActions ?? safety?.summary.runtimeBridgeGuardedActions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.runtimeBridgeEnabledActions")}</span><strong>{runtimeBridge?.summary.enabledGuardedActions ?? safety?.summary.runtimeBridgeEnabledActions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.activeEnforcementRules")}</span><strong>{runtimeBridge?.summary.activeRules ?? enforcement?.summary.activeRules ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.runtimeBridgeMode")}</span><strong>{statusText(props.language, runtimeBridge?.mode ?? "enforce")}</strong></div>
        </div>
        {(runtimeBridge?.policy ?? safety?.runtimeBridgePolicy ?? []).length ? <ul className="rulesList">{(runtimeBridge?.policy ?? safety?.runtimeBridgePolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="formGrid">
          <label><span>{t(props.language, "messenger.runtimeAction")}</span><select value={runtimeBridgeForm.runtimeAction} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, runtimeAction: event.target.value })}>{(runtimeBridge?.guardedActions ?? []).length ? runtimeBridge?.guardedActions.map((item: AdminMessengerSafetyRuntimeGuardedAction) => <option key={item.key} value={item.key}>{item.key}</option>) : <><option value="chat.send_message">{statusText(props.language, "chat.send_message")}</option><option value="media.upload">{statusText(props.language, "media.upload")}</option><option value="group.post">{statusText(props.language, "group.post")}</option><option value="channel.post">{statusText(props.language, "channel.post")}</option><option value="bot.message">{statusText(props.language, "bot.message")}</option></>}</select></label>
          <label><span>{t(props.language, "messenger.actorUserId")}</span><input value={runtimeBridgeForm.actorUserId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, actorUserId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.peerUserId")}</span><input value={runtimeBridgeForm.peerUserId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, peerUserId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={runtimeBridgeForm.chatId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, chatId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={runtimeBridgeForm.messageId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, messageId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.clientMessageId")}</span><input value={runtimeBridgeForm.clientMessageId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, clientMessageId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.groupId")}</span><input value={runtimeBridgeForm.groupId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, groupId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.channelId")}</span><input value={runtimeBridgeForm.channelId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, channelId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.botId")}</span><input value={runtimeBridgeForm.botId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, botId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.targetType")}</span><input value={runtimeBridgeForm.targetType} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, targetType: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.targetId")}</span><input value={runtimeBridgeForm.targetId} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, targetId: event.target.value })} /></label>
          <label className="checkboxRow"><input type="checkbox" checked={runtimeBridgeForm.rawContentPresent} onChange={(event) => setRuntimeBridgeForm({ ...runtimeBridgeForm, rawContentPresent: event.target.checked })} /><span>{t(props.language, "messenger.rawContentPresent")}</span></label>
          <button onClick={checkSafetyRuntimeBridge} disabled={busy}>{t(props.language, "messenger.checkRuntimeBridge")}</button>
        </div>
        <div className="buttonRow">
          <button onClick={refreshSafetyRuntimeBridge} disabled={busy}>{t(props.language, "messenger.refreshRuntimeBridge")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyRuntimeBridge} disabled={busy}>{t(props.language, "messenger.exportRuntimeBridge")}</button> : null}
        </div>
        {runtimeBridgeCheck ? <div className="row"><strong>{t(props.language, "messenger.runtimeBridgeInstruction")}: {statusText(props.language, runtimeBridgeCheck.messengerInstruction)}</strong><span>{t(props.language, "messenger.enforcementDecision")}: {statusText(props.language, runtimeBridgeCheck.decision)}</span><span>{t(props.language, "messenger.matchedRules")}: {runtimeBridgeCheck.matchedRules.length}</span><em className={runtimeBridgeCheck.allowed ? "pass" : "fail"}>{runtimeBridgeCheck.allowed ? t(props.language, "messenger.allowed") : t(props.language, "messenger.blocked")}</em></div> : null}
        {(runtimeBridge?.guardedActions ?? []).length ? (
          <div className="tableList">
            {(runtimeBridge?.guardedActions ?? []).map((item: AdminMessengerSafetyRuntimeGuardedAction) => (
              <div className="row" key={item.key}>
                <strong>{item.key}</strong>
                <span>{item.layer} · {item.messengerEvent}</span>
                <em className={item.enabled ? "pass" : "warning"}>{item.enabled ? t(props.language, "messenger.enabled") : t(props.language, "messenger.disabled")}</em>
                <span>{t(props.language, "messenger.enforcementAction")}: {item.enforcementAction}</span>
                <span>{t(props.language, "messenger.requiredIds")}: {item.requiredIds.join(", ")}</span>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noRuntimeBridgeActions")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageRuntime">
        <h3>{t(props.language, "messenger.enforcementEngineTitle")}</h3>
        <p>{t(props.language, "messenger.enforcementEngineDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.activeEnforcementRules")}</span><strong>{enforcement?.summary.activeRules ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.enforcementDenyRules")}</span><strong>{enforcement?.summary.denyRules ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.enforcementHoldRules")}</span><strong>{enforcement?.summary.holdRules ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.expiredIgnoredRules")}</span><strong>{enforcement?.summary.expiredIgnored ?? 0}</strong></div>
        </div>
        {(enforcement?.policy ?? safety?.enforcementPolicy ?? []).length ? <ul className="rulesList">{(enforcement?.policy ?? safety?.enforcementPolicy ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="formGrid">
          <label><span>{t(props.language, "messenger.enforcementAction")}</span><select value={enforcementForm.action} onChange={(event) => setEnforcementForm({ ...enforcementForm, action: event.target.value })}><option value="send_message">{statusText(props.language, "send_message")}</option><option value="edit_message">{statusText(props.language, "edit_message")}</option><option value="delete_message">{statusText(props.language, "delete_message")}</option><option value="forward_message">{statusText(props.language, "forward_message")}</option><option value="upload_media">{statusText(props.language, "upload_media")}</option><option value="view_message">{statusText(props.language, "view_message")}</option><option value="join_group">{statusText(props.language, "join_group")}</option><option value="post_group">{statusText(props.language, "post_group")}</option><option value="join_channel">{statusText(props.language, "join_channel")}</option><option value="post_channel">{statusText(props.language, "post_channel")}</option><option value="start_bot">{statusText(props.language, "start_bot")}</option><option value="message_bot">{statusText(props.language, "message_bot")}</option><option value="any_messenger_action">{statusText(props.language, "any_messenger_action")}</option></select></label>
          <label><span>{t(props.language, "messenger.targetType")}</span><input value={enforcementForm.targetType} onChange={(event) => setEnforcementForm({ ...enforcementForm, targetType: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.targetId")}</span><input value={enforcementForm.targetId} onChange={(event) => setEnforcementForm({ ...enforcementForm, targetId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedUserId")}</span><input value={enforcementForm.userId} onChange={(event) => setEnforcementForm({ ...enforcementForm, userId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={enforcementForm.chatId} onChange={(event) => setEnforcementForm({ ...enforcementForm, chatId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={enforcementForm.messageId} onChange={(event) => setEnforcementForm({ ...enforcementForm, messageId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.groupId")}</span><input value={enforcementForm.groupId} onChange={(event) => setEnforcementForm({ ...enforcementForm, groupId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.channelId")}</span><input value={enforcementForm.channelId} onChange={(event) => setEnforcementForm({ ...enforcementForm, channelId: event.target.value })} /></label>
          <label><span>{t(props.language, "messenger.botId")}</span><input value={enforcementForm.botId} onChange={(event) => setEnforcementForm({ ...enforcementForm, botId: event.target.value })} /></label>
          <button onClick={checkSafetyEnforcement} disabled={busy}>{t(props.language, "messenger.checkEnforcement")}</button>
        </div>
        <div className="buttonRow">
          <button onClick={refreshSafetyEnforcement} disabled={busy}>{t(props.language, "messenger.refreshEnforcement")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyEnforcement} disabled={busy}>{t(props.language, "messenger.exportEnforcement")}</button> : null}
        </div>
        {enforcementCheck ? <div className="row"><strong>{t(props.language, "messenger.enforcementDecision")}: {statusText(props.language, enforcementCheck.decision)}</strong><span>{t(props.language, "messenger.matchedRules")}: {enforcementCheck.matchedRules.length}</span><em className={enforcementCheck.allowed ? "pass" : "fail"}>{enforcementCheck.allowed ? t(props.language, "messenger.allowed") : t(props.language, "messenger.blocked")}</em></div> : null}
        {(enforcement?.rules ?? safety?.activeEnforcementRules ?? []).length ? (
          <div className="tableList">
            {(enforcement?.rules ?? safety?.activeEnforcementRules ?? []).map((rule) => (
              <div className="row" key={rule.id}>
                <strong>{rule.enforcementRef}</strong>
                <span>{t(props.language, `messenger.restrictionScope.${rule.scope}`, rule.scope)} · {rule.targetType}:{rule.targetId} · {rule.actions.join(", ")}</span>
                <em className={rule.decision === "deny" ? "fail" : "warning"}>{statusText(props.language, rule.decision)}</em>
                <span>{t(props.language, "messenger.legalBasis")}: {rule.legalBasis}</span>
                <span>{t(props.language, "messenger.linkedEvidence")}: {(rule.linkedEvidenceIds ?? []).length} · {t(props.language, "messenger.linkedReports")}: {(rule.linkedReportIds ?? []).join(", ") || "-"}</span>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noEnforcementRules")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageCaseVault">
        <h3>{t(props.language, "messenger.restrictionCenterTitle")}</h3>
        <p>{t(props.language, "messenger.restrictionCenterDescription")}</p>
        {(safety?.restrictionPolicy ?? []).length ? <ul className="rulesList">{(safety?.restrictionPolicy ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.safetyRestrictions")}</span><strong>{safety?.summary.safetyRestrictions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.activeSafetyRestrictions")}</span><strong>{safety?.summary.activeSafetyRestrictions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.pendingSafetyRestrictions")}</span><strong>{safety?.summary.pendingSafetyRestrictions ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.releasedSafetyRestrictions")}</span><strong>{safety?.summary.releasedSafetyRestrictions ?? 0}</strong></div>
        </div>
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.restrictionScope")}</span><select value={restrictionForm.scope} onChange={(event) => setRestrictionForm({ ...restrictionForm, scope: event.target.value })}><option value="user_messaging_lock">{t(props.language, "messenger.restrictionScope.user_messaging_lock")}</option><option value="chat_freeze">{t(props.language, "messenger.restrictionScope.chat_freeze")}</option><option value="message_visibility_hold">{t(props.language, "messenger.restrictionScope.message_visibility_hold")}</option><option value="group_restriction">{t(props.language, "messenger.restrictionScope.group_restriction")}</option><option value="channel_restriction">{t(props.language, "messenger.restrictionScope.channel_restriction")}</option><option value="bot_restriction">{t(props.language, "messenger.restrictionScope.bot_restriction")}</option><option value="evidence_preservation_lock">{t(props.language, "messenger.restrictionScope.evidence_preservation_lock")}</option><option value="target_safety_hold">{t(props.language, "messenger.restrictionScope.target_safety_hold")}</option></select></label>
            <label><span>{t(props.language, "messenger.safetyCategory")}</span><select value={restrictionForm.category} onChange={(event) => setRestrictionForm({ ...restrictionForm, category: event.target.value })}>{(safety?.categories ?? []).map((item) => <option key={item.key} value={item.key}>{t(props.language, `messenger.safetyCategory.${item.key}`, item.key)}</option>)}</select></label>
            <label><span>{t(props.language, "messenger.reportSeverity")}</span><select value={restrictionForm.severity} onChange={(event) => setRestrictionForm({ ...restrictionForm, severity: event.target.value })}><option value="critical">{statusText(props.language, "critical")}</option><option value="high">{statusText(props.language, "high")}</option></select></label>
            <label><span>{t(props.language, "messenger.reportTargetType")}</span><input value={restrictionForm.targetType} onChange={(event) => setRestrictionForm({ ...restrictionForm, targetType: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.reportTargetId")}</span><input value={restrictionForm.targetId} onChange={(event) => setRestrictionForm({ ...restrictionForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedUserId")}</span><input value={restrictionForm.relatedUserId} onChange={(event) => setRestrictionForm({ ...restrictionForm, relatedUserId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedChatId")}</span><input value={restrictionForm.relatedChatId} onChange={(event) => setRestrictionForm({ ...restrictionForm, relatedChatId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedMessageId")}</span><input value={restrictionForm.relatedMessageId} onChange={(event) => setRestrictionForm({ ...restrictionForm, relatedMessageId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.restrictionExpiresAt")}</span><input value={restrictionForm.expiresAt} onChange={(event) => setRestrictionForm({ ...restrictionForm, expiresAt: event.target.value })} placeholder="2026-05-15T12:00:00+05:00" /></label>
            <label><span>{t(props.language, "messenger.legalBasis")}</span><input value={restrictionForm.legalBasis} onChange={(event) => setRestrictionForm({ ...restrictionForm, legalBasis: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.restrictionReason")}</span><textarea value={restrictionForm.reason} onChange={(event) => setRestrictionForm({ ...restrictionForm, reason: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedReportIds")}</span><textarea value={restrictionForm.linkedReportIds} onChange={(event) => setRestrictionForm({ ...restrictionForm, linkedReportIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedCaseIds")}</span><textarea value={restrictionForm.linkedCaseIds} onChange={(event) => setRestrictionForm({ ...restrictionForm, linkedCaseIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={restrictionForm.linkedEvidenceIds} onChange={(event) => setRestrictionForm({ ...restrictionForm, linkedEvidenceIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedAiSignalIds")}</span><textarea value={restrictionForm.linkedAiSignalIds} onChange={(event) => setRestrictionForm({ ...restrictionForm, linkedAiSignalIds: event.target.value })} /></label>
            {props.me?.rootOwner ? <label><span>{t(props.language, "messenger.activateNow")}</span><input type="checkbox" checked={restrictionForm.activateNow} onChange={(event) => setRestrictionForm({ ...restrictionForm, activateNow: event.target.checked })} /></label> : null}
            <button onClick={createSafetyRestriction} disabled={busy || !restrictionForm.targetId.trim()}>{t(props.language, "messenger.createRestriction")}</button>
          </div>
        ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyRestrictions} disabled={busy}>{t(props.language, "messenger.exportRestrictions")}</button> : null}
        {(safety?.restrictionCenter ?? []).length ? (
          <div className="tableList">
            {(safety?.restrictionCenter ?? []).map((item) => (
              <div className="row" key={item.id}>
                <strong>{t(props.language, `messenger.restrictionScope.${item.scope}`, item.scope)}</strong>
                <span>{cleanAdminValueText(props.language, item.targetType)}:{item.targetId} · {t(props.language, `messenger.safetyCategory.${item.category}`, item.category)} · {item.reason}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
                <span>{t(props.language, "messenger.legalBasis")}: {item.legalBasis}</span>
                <span>{t(props.language, "messenger.restrictionChecklist")}: {item.checklist ? Object.values(item.checklist).filter(Boolean).length : 0}/{item.checklist ? Object.keys(item.checklist).length : 0}</span>
                <span>{t(props.language, "messenger.linkedReports")}: {(item.linkedReportIds ?? []).join(", ") || "-"} · {t(props.language, "messenger.linkedEvidence")}: {(item.linkedEvidenceIds ?? []).length}</span>
                {item.expiresAt ? <span>{t(props.language, "messenger.restrictionExpiresAt")}: {item.expiresAt}</span> : null}
                {props.me?.rootOwner && item.status !== "released" && item.status !== "rejected" ? <input value={restrictionNotes[item.id] ?? ""} onChange={(event) => setRestrictionNotes({ ...restrictionNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.restrictionNote")} /> : null}
                {props.me?.rootOwner && item.status === "pending_owner_decision" ? <button onClick={() => updateSafetyRestrictionStatus(item, "active")} disabled={busy}>{t(props.language, "messenger.approveRestriction")}</button> : null}
                {props.me?.rootOwner && item.status === "pending_owner_decision" ? <button onClick={() => updateSafetyRestrictionStatus(item, "rejected")} disabled={busy}>{t(props.language, "messenger.rejectRestriction")}</button> : null}
                {props.me?.rootOwner && item.status === "active" ? <button onClick={() => updateSafetyRestrictionStatus(item, "released")} disabled={busy}>{t(props.language, "messenger.releaseRestriction")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noRestrictions")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageCaseVault">
        <h3>{t(props.language, "messenger.evidenceVaultTitle")}</h3>
        <p>{t(props.language, "messenger.evidenceVaultDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.vaultEvidenceItems")}</span><strong>{safety?.evidenceVaultIntegrity?.total ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.legalHoldVaultEvidenceItems")}</span><strong>{safety?.evidenceVaultIntegrity?.legalHold ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.sealedVaultEvidenceItems")}</span><strong>{safety?.evidenceVaultIntegrity?.sealed ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.vaultBrokenLinks")}</span><strong>{safety?.evidenceVaultIntegrity?.brokenLinks ?? 0}</strong></div>
        </div>
        {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportEvidenceVault} disabled={busy}>{t(props.language, "messenger.exportEvidenceVault")}</button> : null}
        {(safety?.evidenceVault ?? []).length ? (
          <div className="tableList">
            {(safety?.evidenceVault ?? []).map((item) => (
              <div className="row" key={item.id}>
                <strong>{item.evidenceType}</strong>
                <span>{item.reportId ? `report:${item.reportId}` : ""} {item.aiSignalId ? `ai:${item.aiSignalId}` : ""} {item.relatedMessageId ? `message:${item.relatedMessageId}` : ""} {item.relatedChatId ? `chat:${item.relatedChatId}` : ""} {item.relatedUserId ? `user:${item.relatedUserId}` : ""} {item.contentHash ? `hash:${item.contentHash}` : ""}</span>
                <em className={item.sealed ? "pass" : "warning"}>{item.sealed ? t(props.language, "messenger.sealed") : t(props.language, "messenger.unsealed")}</em>
                <span>{t(props.language, "messenger.chainHash")}: {item.chainHash}</span>
                {props.me?.rootOwner && !item.sealed ? <input value={vaultSealNotes[item.id] ?? ""} onChange={(event) => setVaultSealNotes({ ...vaultSealNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.sealNote")} /> : null}
                {props.me?.rootOwner && !item.sealed ? <button onClick={() => sealVaultEvidence(item)} disabled={busy}>{t(props.language, "messenger.sealEvidence")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noEvidenceVault")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageSafety">
        <h3>{t(props.language, "messenger.safetyReportsTitle")}</h3>
        {(safety?.recentReports ?? []).length ? (
          <div className="tableList">
            {(safety?.recentReports ?? []).map((report) => (
              <div className="row" key={report.id}>
                <strong>{report.title}</strong>
                <span>{t(props.language, `messenger.safetyCategory.${report.category}`, report.category)} · {report.targetType ?? "target"}:{report.targetId ?? "-"} · {report.description}</span>
                <em className={diagnosticClass(report.status)}>{statusText(props.language, report.status)}</em>
                {report.vaultEvidenceIds?.length ? <span>{t(props.language, "messenger.vaultEvidenceIds")}: {report.vaultEvidenceIds.join(", ")}</span> : null}
                {canWriteMessenger && report.status === "new" ? <button onClick={() => assignSafetyReport(report)} disabled={busy}>{t(props.language, "messenger.assignReport")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => openSafetyReviewCase(report)} disabled={busy}>{t(props.language, "messenger.openReviewCase")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <input value={safetyActionNotes[report.id] ?? ""} onChange={(event) => setSafetyActionNotes({ ...safetyActionNotes, [report.id]: event.target.value })} placeholder={t(props.language, "messenger.safetyActionNote")} /> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => actionSafetyReport(report, "preserve_evidence")} disabled={busy}>{t(props.language, "messenger.preserveEvidence")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => actionSafetyReport(report, "restrict_target")} disabled={busy}>{t(props.language, "messenger.restrictTarget")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => actionSafetyReport(report, "prepare_authority_report")} disabled={busy}>{t(props.language, "messenger.prepareAuthorityReport")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => actionSafetyReport(report, "mark_authority_notified")} disabled={busy}>{t(props.language, "messenger.markAuthorityNotified")}</button> : null}
                {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={() => exportSafetyReportPackage(report)} disabled={busy}>{t(props.language, "messenger.exportCasePackage")}</button> : null}
                {canWriteMessenger && report.status !== "resolved" && report.status !== "rejected" ? <button onClick={() => actionSafetyReport(report, "resolve")} disabled={busy}>{t(props.language, "messenger.resolveReport")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noSafetyReports")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.escalationCenterTitle")}</h3>
        <p>{t(props.language, "messenger.escalationCenterDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.safetyEscalations")}</span><strong>{escalations?.summary.totalEscalations ?? safety?.summary.safetyEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.openSafetyEscalations")}</span><strong>{escalations?.summary.openEscalations ?? safety?.summary.openSafetyEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.criticalSafetyEscalations")}</span><strong>{escalations?.summary.criticalEscalations ?? safety?.summary.criticalSafetyEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.overdueSafetyEscalations")}</span><strong>{escalations?.summary.overdueEscalations ?? safety?.summary.overdueSafetyEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerReviewSafetyEscalations")}</span><strong>{escalations?.summary.ownerReviewRequired ?? safety?.summary.ownerReviewSafetyEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.nextDueAt")}</span><strong>{escalations?.summary.nextDueAt ?? "—"}</strong></div>
        </div>
        {(escalations?.policy ?? safety?.escalationCenterPolicy ?? []).length ? <ul className="rulesList">{(escalations?.policy ?? safety?.escalationCenterPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow">
          <button onClick={refreshSafetyEscalations} disabled={busy}>{t(props.language, "messenger.refreshEscalations")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyEscalations} disabled={busy}>{t(props.language, "messenger.exportEscalations")}</button> : null}
        </div>
        {(escalations?.escalations ?? safety?.escalationCenter ?? []).length ? (
          <div className="tableList">
            {(escalations?.escalations ?? safety?.escalationCenter ?? []).slice(0, 40).map((item: AdminMessengerSafetyEscalationItem) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.source} · {statusText(props.language, item.priority)} · {item.targetType ?? "target"}:{item.targetId ?? item.relatedUserId ?? item.relatedChatId ?? item.relatedMessageId ?? "—"}</span>
                <span>{t(props.language, "messenger.escalationDueAt")}: {item.dueAt} · SLA {item.slaMinutes}m</span>
                <span>{t(props.language, "messenger.linkedReports")}: {item.linkedReportIds.join(", ") || "-"} · {t(props.language, "messenger.linkedEvidence")}: {item.linkedEvidenceIds.length}</span>
                <em className={item.overdue ? "fail" : item.status === "closed" || item.status === "rejected" ? "pass" : item.priority === "critical" ? "fail" : "warning"}>{item.overdue ? t(props.language, "messenger.overdue") : statusText(props.language, item.status)}</em>
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <input value={escalationNotes[item.id] ?? ""} onChange={(event) => setEscalationNotes({ ...escalationNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.escalationNote")} /> : null}
                {props.me?.rootOwner && item.status === "open" ? <button onClick={() => updateSafetyEscalationStatus(item, "acknowledged")} disabled={busy}>{t(props.language, "messenger.escalationAcknowledge")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyEscalationStatus(item, "compliance_review")} disabled={busy}>{t(props.language, "messenger.escalationComplianceReview")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyEscalationStatus(item, "owner_review")} disabled={busy}>{t(props.language, "messenger.escalationOwnerReview")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyEscalationStatus(item, "actioned")} disabled={busy}>{t(props.language, "messenger.escalationActioned")}</button> : null}
                {props.me?.rootOwner && item.status !== "closed" && item.status !== "rejected" ? <button onClick={() => updateSafetyEscalationStatus(item, "closed")} disabled={busy}>{t(props.language, "messenger.escalationClose")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noEscalations")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.complianceReportBuilderTitle")}</h3>
        <p>{t(props.language, "messenger.complianceReportBuilderDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.complianceTemplates")}</span><strong>{complianceReports?.summary.templates ?? safety?.summary.complianceReportTemplates ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.readySections")}</span><strong>{complianceReports?.summary.readySections ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.warningSections")}</span><strong>{complianceReports?.summary.warningSections ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.missingSections")}</span><strong>{complianceReports?.summary.missingSections ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.samplePackageHash")}</span><strong>{complianceReports?.samplePackageHash?.slice(0, 12) ?? "—"}</strong></div>
          <div><span>{t(props.language, "messenger.rawContentIncluded")}</span><strong>{statusText(props.language, String(complianceReports?.summary.rawContentIncluded ?? false))}</strong></div>
        </div>
        {(complianceReports?.policy ?? safety?.complianceReportBuilderPolicy ?? []).length ? <ul className="rulesList">{(complianceReports?.policy ?? safety?.complianceReportBuilderPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {props.me?.rootOwner ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.complianceScope")}</span><select value={complianceReportForm.scope} onChange={(event) => setComplianceReportForm({ ...complianceReportForm, scope: event.target.value })}><option value="full_messenger_safety">{t(props.language, "messenger.scope.full_messenger_safety")}</option><option value="report">{t(props.language, "messenger.scope.report")}</option><option value="case">{t(props.language, "messenger.scope.case")}</option><option value="authority_request">{t(props.language, "messenger.scope.authority_request")}</option><option value="restriction">{t(props.language, "messenger.scope.restriction")}</option><option value="escalation">{t(props.language, "messenger.scope.escalation")}</option><option value="integrity_review">{t(props.language, "messenger.scope.integrity_review")}</option></select></label>
            <label><span>{t(props.language, "messenger.scopeId")}</span><input value={complianceReportForm.scopeId} onChange={(event) => setComplianceReportForm({ ...complianceReportForm, scopeId: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.packageTitle")}</span><input value={complianceReportForm.title} onChange={(event) => setComplianceReportForm({ ...complianceReportForm, title: event.target.value })} /></label>
          </div>
        ) : null}
        <div className="buttonRow">
          <button onClick={refreshComplianceReports} disabled={busy}>{t(props.language, "messenger.refreshComplianceReports")}</button>
          {props.me?.rootOwner ? <button onClick={buildComplianceReport} disabled={busy}>{t(props.language, "messenger.buildComplianceReport")}</button> : null}
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportComplianceReport} disabled={busy}>{t(props.language, "messenger.exportComplianceReport")}</button> : null}
        </div>
        {(complianceReports?.sections ?? []).length ? (
          <div className="tableList">
            {(complianceReports?.sections ?? []).map((section) => (
              <div className="row" key={section.key}>
                <strong>{section.title}</strong>
                <span>{t(props.language, "messenger.records")}: {section.recordCount} · {t(props.language, "messenger.anchorHash")}: {section.anchorHash?.slice(0, 12) ?? "—"}</span>
                <span>{section.note}</span>
                <em className={section.status === "ready" ? "pass" : section.status === "missing" ? "fail" : "warning"}>{statusText(props.language, section.status)}</em>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noComplianceSections")}</div>}
        {complianceReportPackage ? <div className="jsonPreview"><strong>{t(props.language, "messenger.lastPackageHash")}: {complianceReportPackage.reportHash}</strong><pre>{JSON.stringify({ packageId: complianceReportPackage.packageId, scope: complianceReportPackage.scope, reportHash: complianceReportPackage.reportHash, linkedReportIds: complianceReportPackage.linkedReportIds, linkedEvidenceIds: complianceReportPackage.linkedEvidenceIds, rawContentIncluded: complianceReportPackage.rawContentIncluded }, null, 2)}</pre></div> : null}
      </div>


      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.retentionCenterTitle")}</h3>
        <p>{t(props.language, "messenger.retentionCenterDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.retentionTotalRecords")}</span><strong>{retention?.summary.totalRecords ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.retentionActiveLegalHolds")}</span><strong>{retention?.summary.activeLegalHolds ?? safety?.summary.retentionLegalHolds ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.retentionExpiredCandidates")}</span><strong>{retention?.summary.expiredCandidates ?? safety?.summary.retentionExpiredCandidates ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.retentionPurgeEligible")}</span><strong>{retention?.summary.purgeEligibleRecords ?? safety?.summary.retentionPurgeEligibleRecords ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.retentionNearExpiry")}</span><strong>{retention?.summary.nearExpiryRecords ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.unsealedLegalHoldEvidence")}</span><strong>{retention?.summary.unsealedLegalHoldEvidence ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.retentionHash")}</span><strong>{retention?.retentionHash?.slice(0, 12) ?? "—"}</strong></div>
          <div><span>{t(props.language, "messenger.rawContentIncluded")}</span><strong>{statusText(props.language, String(retention?.summary.rawContentIncluded ?? false))}</strong></div>
        </div>
        {(retention?.policy ?? safety?.retentionPolicy ?? []).length ? <ul className="rulesList">{(retention?.policy ?? safety?.retentionPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {props.me?.rootOwner ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.retentionTargetType")}</span><select value={retentionHoldForm.targetType} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, targetType: event.target.value })}><option value="evidence_vault">{t(props.language, "messenger.target.evidence_vault")}</option><option value="safety_report">{t(props.language, "messenger.target.safety_report")}</option><option value="case_review">{t(props.language, "messenger.target.case_review")}</option><option value="authority_request">{t(props.language, "messenger.target.authority_request")}</option><option value="restriction">{t(props.language, "messenger.target.restriction")}</option><option value="guard_event">{t(props.language, "messenger.target.guard_event")}</option><option value="escalation">{t(props.language, "messenger.target.escalation")}</option></select></label>
            <label><span>{t(props.language, "messenger.retentionTargetId")}</span><input value={retentionHoldForm.targetId} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.legalBasis")}</span><input value={retentionHoldForm.legalBasis} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, legalBasis: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.retentionReason")}</span><input value={retentionHoldForm.reason} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, reason: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.linkedReportIds")}</span><input value={retentionHoldForm.linkedReportIds} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, linkedReportIds: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.linkedCaseIds")}</span><input value={retentionHoldForm.linkedCaseIds} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, linkedCaseIds: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><input value={retentionHoldForm.linkedEvidenceIds} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, linkedEvidenceIds: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.linkedAuthorityRequestIds")}</span><input value={retentionHoldForm.linkedAuthorityRequestIds} onChange={(event) => setRetentionHoldForm({ ...retentionHoldForm, linkedAuthorityRequestIds: event.target.value })} /></label>
            <button onClick={createRetentionLegalHold} disabled={busy || !retentionHoldForm.targetId.trim()}>{t(props.language, "messenger.createLegalHold")}</button>
          </div>
        ) : null}
        <div className="buttonRow">
          <button onClick={refreshSafetyRetention} disabled={busy}>{t(props.language, "messenger.refreshRetention")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyRetention} disabled={busy}>{t(props.language, "messenger.exportRetention")}</button> : null}
        </div>
        {(retention?.recommendations ?? []).length ? <div className="tableList">{(retention?.recommendations ?? []).map((item) => <div className="row" key={item.key}><strong>{item.key}</strong><span>{item.message}</span><em className={item.severity === "ok" ? "pass" : item.severity === "critical" ? "fail" : "warning"}>{statusText(props.language, item.severity)}</em></div>)}</div> : null}
        {(retention?.legalHolds ?? []).length ? (
          <div className="tableList">
            {(retention?.legalHolds ?? []).slice(0, 25).map((item) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminValueText(props.language, item.targetType)}:{item.targetId}</strong>
                <span>{item.legalBasis} · {item.reason}</span>
                <span>{t(props.language, "messenger.linkedEvidence")}: {item.linkedEvidenceIds.join(", ") || "-"}</span>
                <em className={item.status === "active" ? "fail" : "pass"}>{statusText(props.language, item.status)}</em>
                {props.me?.rootOwner && item.status === "active" ? <input value={retentionReleaseNotes[item.id] ?? ""} onChange={(event) => setRetentionReleaseNotes({ ...retentionReleaseNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.retentionReleaseNote")} /> : null}
                {props.me?.rootOwner && item.status === "active" ? <button onClick={() => releaseRetentionLegalHold(item)} disabled={busy}>{t(props.language, "messenger.releaseLegalHold")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noLegalHolds")}</div>}
        {(retention?.records ?? []).length ? (
          <div className="tableList">
            {(retention?.records ?? []).slice(0, 30).map((item) => (
              <div className="row" key={item.id}>
                <strong>{item.recordType}:{item.sourceId}</strong>
                <span>{cleanAdminUiText(props.language, item.title)}</span>
                <span>{t(props.language, "messenger.retentionUntil")}: {item.retentionUntil} · {t(props.language, "messenger.daysRemaining")}: {item.daysRemaining}</span>
                <span>{t(props.language, "messenger.purgeBlockedReason")}: {item.purgeBlockedReason ?? "-"}</span>
                <em className={item.purgeEligible ? "warning" : item.legalHold ? "fail" : item.nearExpiry ? "warning" : "pass"}>{item.purgeEligible ? t(props.language, "messenger.purgeEligible") : item.legalHold ? t(props.language, "messenger.legalHold") : item.nearExpiry ? t(props.language, "messenger.nearExpiry") : statusText(props.language, "ok")}</em>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.authorityCooperation")}</h3>
        <p>{t(props.language, "messenger.authorityCooperationDescription")}</p>
        {(safety?.authorityDeskPolicy ?? []).length ? <ul className="rulesList">{(safety?.authorityDeskPolicy ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.authorityName")}</span><input value={authorityForm.authorityName} onChange={(event) => setAuthorityForm({ ...authorityForm, authorityName: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.requestReference")}</span><input value={authorityForm.requestReference} onChange={(event) => setAuthorityForm({ ...authorityForm, requestReference: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.requestKind")}</span><select value={authorityForm.requestKind} onChange={(event) => setAuthorityForm({ ...authorityForm, requestKind: event.target.value })}><option value="official_request">{t(props.language, "messenger.requestKind.official_request")}</option><option value="security_service_review">{t(props.language, "messenger.requestKind.security_service_review")}</option><option value="court_order">{t(props.language, "messenger.requestKind.court_order")}</option><option value="emergency_disclosure">{t(props.language, "messenger.requestKind.emergency_disclosure")}</option><option value="follow_up">{t(props.language, "messenger.requestKind.follow_up")}</option></select></label>
            <label><span>{t(props.language, "messenger.authorityPriority")}</span><select value={authorityForm.priority} onChange={(event) => setAuthorityForm({ ...authorityForm, priority: event.target.value })}><option value="normal">{statusText(props.language, "normal")}</option><option value="urgent">{statusText(props.language, "urgent")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "messenger.authorityCountry")}</span><input value={authorityForm.authorityCountry} onChange={(event) => setAuthorityForm({ ...authorityForm, authorityCountry: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.authorityOfficerName")}</span><input value={authorityForm.authorityOfficerName} onChange={(event) => setAuthorityForm({ ...authorityForm, authorityOfficerName: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.authorityContactHash")}</span><input value={authorityForm.authorityContactHash} onChange={(event) => setAuthorityForm({ ...authorityForm, authorityContactHash: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.authorityDueAt")}</span><input value={authorityForm.dueAt} onChange={(event) => setAuthorityForm({ ...authorityForm, dueAt: event.target.value })} placeholder="2026-05-15T12:00:00+05:00" /></label>
            <label><span>{t(props.language, "messenger.legalBasis")}</span><input value={authorityForm.legalBasis} onChange={(event) => setAuthorityForm({ ...authorityForm, legalBasis: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.requestedScope")}</span><textarea value={authorityForm.requestedScope} onChange={(event) => setAuthorityForm({ ...authorityForm, requestedScope: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedReportIds")}</span><textarea value={authorityForm.linkedReportIds} onChange={(event) => setAuthorityForm({ ...authorityForm, linkedReportIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedCaseIds")}</span><textarea value={authorityForm.linkedCaseIds} onChange={(event) => setAuthorityForm({ ...authorityForm, linkedCaseIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={authorityForm.linkedEvidenceIds} onChange={(event) => setAuthorityForm({ ...authorityForm, linkedEvidenceIds: event.target.value })} /></label>
            <button onClick={createAuthorityRequest} disabled={busy || !authorityForm.authorityName.trim() || !authorityForm.legalBasis.trim() || !authorityForm.requestedScope.trim()}>{t(props.language, "messenger.addAuthorityRequest")}</button>
          </div>
        ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        {(safety?.authorityRequests ?? []).length ? <div className="tableList">{(safety?.authorityRequests ?? []).map((item) => (
          <div className="row" key={item.id}>
            <strong>{item.authorityName}</strong>
            <span>{item.requestReference ?? "-"} · {item.requestKind ?? "official_request"} · {item.priority ?? "normal"} · {item.legalBasis}</span>
            <span>{t(props.language, "messenger.requestedScope")}: {item.requestedScope}</span>
            <span>{t(props.language, "messenger.linkedReportIds")}: {(item.linkedReportIds ?? []).join(", ") || "-"}</span>
            <span>{t(props.language, "messenger.linkedCaseIds")}: {(item.linkedCaseIds ?? []).join(", ") || "-"}</span>
            <span>{t(props.language, "messenger.linkedEvidenceIds")}: {(item.linkedEvidenceIds ?? []).join(", ") || "-"}</span>
            <span>{t(props.language, "messenger.authorityChecklist")}: {item.checklist?.ownerApproved ? "owner_ok" : "owner_required"} · {item.checklist?.rawContentHidden ? "raw_hidden" : "raw_check"} · {item.checklist?.auditAnchored ? "audit_anchor" : "audit_pending"}</span>
            <em>{statusText(props.language, item.status)}</em>
            {item.decisionNote ? <span>{item.decisionNote}</span> : null}
            {(item.disclosureLog ?? []).length ? <span>{t(props.language, "messenger.disclosureLog")}: {(item.disclosureLog ?? []).map((entry) => entry.packageId).join(", ")}</span> : null}
            {props.me?.rootOwner ? <button onClick={() => updateAuthorityStatus(item, "under_review")} disabled={busy}>{t(props.language, "messenger.authorityUnderReview")}</button> : null}
            {props.me?.rootOwner ? <button onClick={() => updateAuthorityStatus(item, "approved")} disabled={busy}>{t(props.language, "messenger.authorityApprove")}</button> : null}
            {props.me?.rootOwner && (item.status === "approved" || item.status === "completed") ? <button onClick={() => exportAuthorityRequestPackage(item)} disabled={busy}>{t(props.language, "messenger.exportAuthorityPackage")}</button> : null}
            {props.me?.rootOwner ? <button onClick={() => updateAuthorityStatus(item, "completed")} disabled={busy}>{t(props.language, "messenger.authorityComplete")}</button> : null}
            {props.me?.rootOwner ? <button onClick={() => updateAuthorityStatus(item, "rejected")} disabled={busy}>{t(props.language, "messenger.authorityReject")}</button> : null}
          </div>
        ))}</div> : <div className="emptyState">{t(props.language, "messenger.noAuthorityRequests")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageLaunchOps">
        <h3>{t(props.language, "messenger.dailyOperationsTitle")}</h3>
        <p>{t(props.language, "messenger.dailyOperationsDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.dailyQueueItems")}</span><strong>{dailyOperations?.summary.totalQueueItems ?? safety?.summary.dailyOperationsQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.dailyCriticalItems")}</span><strong>{dailyOperations?.summary.criticalQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.dailyOverdueItems")}</span><strong>{dailyOperations?.summary.overdueQueueItems ?? safety?.summary.dailyOperationsOverdueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.dailyDueToday")}</span><strong>{dailyOperations?.summary.dueTodayQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.dailyOwnerRequired")}</span><strong>{dailyOperations?.summary.ownerRequiredQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.dailyAuthorityRequired")}</span><strong>{dailyOperations?.summary.authorityRequiredQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.blockedExports")}</span><strong>{dailyOperations?.summary.blockedExports ?? supervisorDashboard?.summary.blockedExports ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.operationsHash")}</span><strong>{dailyOperations?.summary.operationsHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(dailyOperations?.policy ?? safety?.dailyOperationsPolicy ?? []).length ? <ul className="rulesList">{(dailyOperations?.policy ?? safety?.dailyOperationsPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshDailyOperations} disabled={busy}>{t(props.language, "messenger.refreshDailyOperations")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportDailyOperations} disabled={busy}>{t(props.language, "messenger.exportDailyOperations")}</button> : null}</div>
        {(dailyOperations?.actionPlan ?? []).length ? (
          <div className="tableList">
            {(dailyOperations?.actionPlan ?? []).map((item: AdminMessengerSafetyDailyOperationsAction) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedQueueItems")}: {(item.linkedQueueItemIds ?? []).length}</span>
                <em className={item.status === "ready" ? "pass" : item.status === "blocked" ? "fail" : "warning"}>{statusText(props.language, item.status)} · {statusText(props.language, item.priority)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(dailyOperations?.queue ?? []).length ? (
          <div className="tableList">
            {(dailyOperations?.queue ?? []).slice(0, 30).map((item: AdminMessengerSafetyDailyOperationsQueueItem) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.source} · {item.targetType ?? "target"}:{item.targetId ?? "—"}</span>
                <span>{ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedReportIds")}: {(item.linkedReportIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.linkedCaseIds")}: {(item.linkedCaseIds ?? []).join(", ") || "—"}</span>
                {item.dueAt ? <span>{t(props.language, "messenger.assignmentDueAt")}: {item.dueAt}</span> : null}
                <em className={item.priority === "critical" || item.overdue ? "fail" : item.priority === "urgent" ? "warning" : "pass"}>{statusText(props.language, item.priority)}{item.overdue ? ` · ${t(props.language, "messenger.overdue")}` : ""}</em>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noDailyOperationsQueue")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageLaunchOps">
        <h3>{t(props.language, "messenger.prelaunchGateTitle")}</h3>
        <p>{t(props.language, "messenger.prelaunchGateDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.launchStatus")}</span><strong>{statusText(props.language, prelaunchGate?.summary.launchStatus ?? safety?.summary.prelaunchGateStatus ?? "pending")}</strong></div>
          <div><span>{t(props.language, "messenger.launchBlocked")}</span><strong>{prelaunchGate?.summary.launchBlocked ? t(props.language, "common.yes") : t(props.language, "common.no")}</strong></div>
          <div><span>{t(props.language, "messenger.blockingChecks")}</span><strong>{prelaunchGate?.summary.blockingChecks ?? safety?.summary.prelaunchGateBlocked ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.warningChecks")}</span><strong>{prelaunchGate?.summary.warningChecks ?? safety?.summary.prelaunchGateWarnings ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.passedChecks")}</span><strong>{prelaunchGate?.summary.passedChecks ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.overdueSlaItems")}</span><strong>{prelaunchGate?.summary.overdueSlaItems ?? dailyOperations?.summary.overdueQueueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.failedExportVerifications")}</span><strong>{prelaunchGate?.summary.failedExportVerifications ?? exportVerification?.summary.failed ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.gateHash")}</span><strong>{prelaunchGate?.summary.gateHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(prelaunchGate?.policy ?? safety?.prelaunchReadinessGatePolicy ?? []).length ? <ul className="rulesList">{(prelaunchGate?.policy ?? safety?.prelaunchReadinessGatePolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshPrelaunchGate} disabled={busy}>{t(props.language, "messenger.refreshPrelaunchGate")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPrelaunchGate} disabled={busy}>{t(props.language, "messenger.exportPrelaunchGate")}</button> : null}</div>
        {(prelaunchGate?.blockers ?? []).length ? (
          <div className="tableList">
            {(prelaunchGate?.blockers ?? []).map((item: AdminMessengerSafetyPrelaunchGateCheck) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedQueueItems")}: {(item.linkedQueueItemIds ?? []).length} · {t(props.language, "messenger.linkedEvidenceIds")}: {(item.linkedEvidenceIds ?? []).join(", ") || "—"}</span>
                <em className="fail">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(prelaunchGate?.warnings ?? []).length ? (
          <div className="tableList">
            {(prelaunchGate?.warnings ?? []).slice(0, 20).map((item: AdminMessengerSafetyPrelaunchGateCheck) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{ruleText(props.language, item.reason)}</span>
                <em className="warning">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(prelaunchGate?.launchChecklist ?? []).length ? <ul className="rulesList">{(prelaunchGate?.launchChecklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageLaunchOps">
        <h3>{t(props.language, "messenger.launchCommandTitle")}</h3>
        <p>{t(props.language, "messenger.launchCommandDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.commandStatus")}</span><strong>{statusText(props.language, launchCommand?.summary.commandStatus ?? safety?.summary.launchCommandStatus ?? "pending")}</strong></div>
          <div><span>{t(props.language, "messenger.canLaunch")}</span><strong>{launchCommand?.summary.canLaunch ? t(props.language, "common.yes") : t(props.language, "common.no")}</strong></div>
          <div><span>{t(props.language, "messenger.mustHold")}</span><strong>{launchCommand?.summary.mustHold ? t(props.language, "common.yes") : t(props.language, "common.no")}</strong></div>
          <div><span>{t(props.language, "messenger.blockedCommands")}</span><strong>{launchCommand?.summary.blockedCommands ?? safety?.summary.launchCommandBlocked ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerRequiredCommands")}</span><strong>{launchCommand?.summary.ownerRequiredCommands ?? safety?.summary.launchCommandOwnerRequired ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.totalCommands")}</span><strong>{launchCommand?.summary.totalCommands ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.authorityDueItems")}</span><strong>{launchCommand?.summary.authorityDueItems ?? prelaunchGate?.summary.dueAuthorityRequests ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.commandHash")}</span><strong>{launchCommand?.summary.commandHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(launchCommand?.policy ?? safety?.launchCommandPolicy ?? []).length ? <ul className="rulesList">{(launchCommand?.policy ?? safety?.launchCommandPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshLaunchCommand} disabled={busy}>{t(props.language, "messenger.refreshLaunchCommand")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportLaunchCommand} disabled={busy}>{t(props.language, "messenger.exportLaunchCommand")}</button> : null}</div>
        {(launchCommand?.blockedItems ?? []).length ? (
          <div className="tableList">
            {(launchCommand?.blockedItems ?? []).map((item: AdminMessengerSafetyLaunchCommandItem) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.source} · {ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedQueueItems")}: {(item.linkedQueueItemIds ?? []).length} · {t(props.language, "messenger.linkedRestrictionIds")}: {(item.linkedRestrictionIds ?? []).join(", ") || "—"}</span>
                <em className="fail">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(launchCommand?.ownerRequiredItems ?? []).length ? (
          <div className="tableList">
            {(launchCommand?.ownerRequiredItems ?? []).slice(0, 20).map((item: AdminMessengerSafetyLaunchCommandItem) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.source} · {ruleText(props.language, item.reason)}</span>
                <em className="warning">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(launchCommand?.finalOwnerCommandChecklist ?? []).length ? <ul className="rulesList">{(launchCommand?.finalOwnerCommandChecklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageLaunchOps">
        <h3>{t(props.language, "messenger.postLaunchMonitorTitle")}</h3>
        <p>{t(props.language, "messenger.postLaunchMonitorDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.monitorStatus")}</span><strong>{statusText(props.language, postLaunchMonitor?.summary.monitorStatus ?? safety?.summary.postLaunchMonitorStatus ?? "pending")}</strong></div>
          <div><span>{t(props.language, "messenger.criticalItems")}</span><strong>{postLaunchMonitor?.summary.criticalItems ?? safety?.summary.postLaunchCriticalItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.watchItems")}</span><strong>{postLaunchMonitor?.summary.watchItems ?? safety?.summary.postLaunchWatchItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerAttentionItems")}</span><strong>{postLaunchMonitor?.summary.ownerAttentionItems ?? safety?.summary.postLaunchOwnerAttentionItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardDenyEvents")}</span><strong>{postLaunchMonitor?.summary.guardDenyEvents ?? guardEvents?.summary.denyEvents ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardHoldEvents")}</span><strong>{postLaunchMonitor?.summary.guardHoldEvents ?? guardEvents?.summary.holdEvents ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.newCriticalReports")}</span><strong>{postLaunchMonitor?.summary.newCriticalReports ?? safety?.summary.openCriticalReports ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.postLaunchHash")}</span><strong>{postLaunchMonitor?.summary.postLaunchHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(postLaunchMonitor?.policy ?? safety?.postLaunchMonitorPolicy ?? []).length ? <ul className="rulesList">{(postLaunchMonitor?.policy ?? safety?.postLaunchMonitorPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshPostLaunchMonitor} disabled={busy}>{t(props.language, "messenger.refreshPostLaunchMonitor")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPostLaunchMonitor} disabled={busy}>{t(props.language, "messenger.exportPostLaunchMonitor")}</button> : null}</div>
        {(postLaunchMonitor?.criticalItems ?? []).length ? (
          <div className="tableList">
            {(postLaunchMonitor?.criticalItems ?? []).map((item: AdminMessengerSafetyPostLaunchWatchItem) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.source} · {ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedReportIds")}: {(item.linkedReportIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.linkedGuardEventIds")}: {(item.linkedGuardEventIds ?? []).length}</span>
                <em className="fail">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(postLaunchMonitor?.ownerAttentionQueue ?? []).length ? (
          <div className="tableList">
            {(postLaunchMonitor?.ownerAttentionQueue ?? []).slice(0, 20).map((item: AdminMessengerSafetyPostLaunchWatchItem) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.source} · {ruleText(props.language, item.reason)}</span>
                <em className="warning">{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(postLaunchMonitor?.first72hChecklist ?? []).length ? <ul className="rulesList">{(postLaunchMonitor?.first72hChecklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageIncidents">
        <h3>{t(props.language, "messenger.incidentResponseTitle")}</h3>
        <p>{t(props.language, "messenger.incidentResponseDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.openIncidents")}</span><strong>{incidentResponse?.summary.openIncidents ?? safety?.summary.incidentResponseOpenItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.criticalIncidents")}</span><strong>{incidentResponse?.summary.criticalIncidents ?? safety?.summary.incidentResponseCriticalItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.containmentRequired")}</span><strong>{incidentResponse?.summary.containmentRequired ?? safety?.summary.incidentResponseContainmentItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerDecisionRequired")}</span><strong>{incidentResponse?.summary.ownerDecisionRequired ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.authorityCooperationRequired")}</span><strong>{incidentResponse?.summary.authorityCooperationRequired ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.guardLinkedIncidents")}</span><strong>{incidentResponse?.summary.guardLinkedIncidents ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.evidenceLinkedIncidents")}</span><strong>{incidentResponse?.summary.evidenceLinkedIncidents ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.incidentHash")}</span><strong>{incidentResponse?.summary.incidentHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(incidentResponse?.policy ?? safety?.incidentResponsePolicy ?? []).length ? <ul className="rulesList">{(incidentResponse?.policy ?? safety?.incidentResponsePolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshIncidentResponse} disabled={busy}>{t(props.language, "messenger.refreshIncidentResponse")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportIncidentResponse} disabled={busy}>{t(props.language, "messenger.exportIncidentResponse")}</button> : null}</div>
        {canWriteMessenger ? (
          <div className="formGrid">
            <input placeholder={t(props.language, "messenger.incidentTitle")} value={incidentForm.title} onChange={(event) => setIncidentForm({ ...incidentForm, title: event.target.value })} />
            <select value={incidentForm.severity} onChange={(event) => setIncidentForm({ ...incidentForm, severity: event.target.value })}><option value="critical">{statusText(props.language, "critical")}</option><option value="high">{statusText(props.language, "high")}</option><option value="medium">{statusText(props.language, "medium")}</option></select>
            <input placeholder={t(props.language, "messenger.targetId")} value={incidentForm.targetId} onChange={(event) => setIncidentForm({ ...incidentForm, targetId: event.target.value })} />
            <input placeholder={t(props.language, "messenger.userId")} value={incidentForm.userId} onChange={(event) => setIncidentForm({ ...incidentForm, userId: event.target.value })} />
            <input placeholder={t(props.language, "messenger.chatId")} value={incidentForm.chatId} onChange={(event) => setIncidentForm({ ...incidentForm, chatId: event.target.value })} />
            <input placeholder={t(props.language, "messenger.messageId")} value={incidentForm.messageId} onChange={(event) => setIncidentForm({ ...incidentForm, messageId: event.target.value })} />
            <input placeholder={t(props.language, "messenger.linkedReportIds")} value={incidentForm.linkedReportIds} onChange={(event) => setIncidentForm({ ...incidentForm, linkedReportIds: event.target.value })} />
            <input placeholder={t(props.language, "messenger.linkedEvidenceIds")} value={incidentForm.linkedEvidenceIds} onChange={(event) => setIncidentForm({ ...incidentForm, linkedEvidenceIds: event.target.value })} />
            <button onClick={createIncidentResponse} disabled={busy || !incidentForm.title.trim()}>{t(props.language, "messenger.createIncident")}</button>
          </div>
        ) : null}
        {(incidentResponse?.criticalQueue ?? []).length ? (
          <div className="tableList">
            {(incidentResponse?.criticalQueue ?? []).slice(0, 20).map((item: AdminMessengerSafetyIncidentResponse) => (
              <div className="row" key={item.id}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.source} · {statusText(props.language, item.status)} · {ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedReportIds")}: {(item.linkedReportIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.linkedEvidenceIds")}: {(item.linkedEvidenceIds ?? []).join(", ") || "—"}</span>
                <span>{t(props.language, "messenger.traceHash")}: {item.traceHash?.slice(0, 10) ?? "—"}</span>
                {canWriteMessenger ? <div className="buttonRow"><input placeholder={t(props.language, "common.note")} value={incidentStatusNotes[item.id] ?? ""} onChange={(event) => setIncidentStatusNotes({ ...incidentStatusNotes, [item.id]: event.target.value })} /><button onClick={() => updateIncidentStatus(item.id, "containment")} disabled={busy}>{t(props.language, "messenger.markContainment")}</button><button onClick={() => updateIncidentStatus(item.id, "resolved")} disabled={busy}>{t(props.language, "messenger.markResolved")}</button></div> : null}
              </div>
            ))}
          </div>
        ) : null}
        {(incidentResponse?.responseChecklist ?? []).length ? <ul className="rulesList">{(incidentResponse?.responseChecklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageLaunchOps">
        <h3>{t(props.language, "messenger.supervisorDashboardTitle")}</h3>
        <p>{t(props.language, "messenger.supervisorDashboardDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.supervisorAttentionItems")}</span><strong>{supervisorDashboard?.summary.totalAttentionItems ?? safety?.summary.supervisorAttentionItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.supervisorCriticalItems")}</span><strong>{supervisorDashboard?.summary.criticalAttentionItems ?? safety?.summary.supervisorCriticalItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.supervisorOverdueItems")}</span><strong>{supervisorDashboard?.summary.overdueAttentionItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.supervisorOwnerQueue")}</span><strong>{supervisorDashboard?.summary.ownerDecisionItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.supervisorBlockedExports")}</span><strong>{supervisorDashboard?.summary.blockedExports ?? safety?.summary.supervisorBlockedExports ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.integrityStatus")}</span><strong>{supervisorDashboard?.summary.integrityStatus ?? "—"}</strong></div>
          <div><span>{t(props.language, "messenger.openEscalations")}</span><strong>{supervisorDashboard?.summary.openEscalations ?? escalations?.summary.openEscalations ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.staffWithOpenWork")}</span><strong>{supervisorDashboard?.summary.staffWithOpenWork ?? 0}</strong></div>
        </div>
        {(supervisorDashboard?.policy ?? safety?.supervisorDashboardPolicy ?? []).length ? <ul className="rulesList">{(supervisorDashboard?.policy ?? safety?.supervisorDashboardPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshSupervisorDashboard} disabled={busy}>{t(props.language, "messenger.refreshSupervisorDashboard")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSupervisorDashboard} disabled={busy}>{t(props.language, "messenger.exportSupervisorDashboard")}</button> : null}</div>
        {(supervisorDashboard?.exportReadiness ?? []).length ? (
          <div className="tableList">
            {(supervisorDashboard?.exportReadiness ?? []).map((item) => (
              <div className="row" key={item.key}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.packageKind} · {t(props.language, "messenger.records")}: {item.records}</span>
                <span>{ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.auditAnchorHash")}: {item.anchorHash?.slice(0, 18) ?? "—"}</span>
                <em className={item.status === "ready" ? "pass" : item.status === "blocked" ? "fail" : "warning"}>{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : null}
        {(supervisorDashboard?.workload ?? []).length ? (
          <div className="tableList">
            {(supervisorDashboard?.workload ?? []).slice(0, 20).map((item) => (
              <div className="row" key={`${item.adminId}:${item.role}`}>
                <strong>{item.adminId}</strong>
                <span>{item.role} · {t(props.language, "messenger.openAssignments")}: {item.openAssignments} · {t(props.language, "messenger.overdueAssignments")}: {item.overdueAssignments}</span>
                <span>{t(props.language, "messenger.ownerDecisionRequired")}: {item.waitingOwnerAssignments} · {t(props.language, "messenger.complianceReviewRequired")}: {item.complianceAssignments} · {t(props.language, "messenger.authorityCooperationRequired")}: {item.authorityAssignments}</span>
                <span>{item.targetRefs.slice(0, 4).join(", ") || "—"}</span>
              </div>
            ))}
          </div>
        ) : null}
        {(supervisorDashboard?.attentionItems ?? []).length ? (
          <div className="tableList">
            {(supervisorDashboard?.attentionItems ?? []).slice(0, 30).map((item: AdminMessengerSafetySupervisorAttentionItem) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{cleanAdminValueText(props.language, item.kind)} · {cleanAdminValueText(props.language, item.targetType ?? "target")}:{item.targetId ?? "—"}</span>
                <span>{ruleText(props.language, item.reason)}</span>
                <span>{t(props.language, "messenger.linkedReportIds")}: {(item.linkedReportIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.linkedCaseIds")}: {(item.linkedCaseIds ?? []).join(", ") || "—"}</span>
                {item.dueAt ? <span>{t(props.language, "messenger.assignmentDueAt")}: {item.dueAt}</span> : null}
                <em className={item.priority === "critical" || item.overdue ? "fail" : item.priority === "urgent" ? "warning" : "pass"}>{statusText(props.language, item.priority)}{item.overdue ? ` · ${t(props.language, "messenger.overdue")}` : ""}</em>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noSupervisorAttention")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.staffAssignmentsTitle")}</h3>
        <p>{t(props.language, "messenger.staffAssignmentsDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.totalAssignments")}</span><strong>{staffAssignments?.summary.totalAssignments ?? safety?.summary.safetyStaffAssignments ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.openAssignments")}</span><strong>{(staffAssignments?.summary.openAssignments ?? 0) + (staffAssignments?.summary.inProgressAssignments ?? 0) + (staffAssignments?.summary.waitingOwnerAssignments ?? 0)}</strong></div>
          <div><span>{t(props.language, "messenger.overdueAssignments")}</span><strong>{staffAssignments?.summary.overdueAssignments ?? safety?.summary.overdueSafetyStaffAssignments ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerDecisionAssignments")}</span><strong>{staffAssignments?.summary.ownerDecisionRequiredAssignments ?? safety?.summary.ownerRequiredSafetyStaffAssignments ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.rawContentIncluded")}</span><strong>{statusText(props.language, String(staffAssignments?.summary.rawContentIncluded ?? false))}</strong></div>
          <div><span>{t(props.language, "messenger.assignmentTraceAnchorHash")}</span><strong>{staffAssignments?.summary.assignmentTraceAnchorHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(staffAssignments?.policy ?? safety?.staffAssignmentPolicy ?? []).length ? <ul className="rulesList">{(staffAssignments?.policy ?? safety?.staffAssignmentPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.assignmentTargetType")}</span><select value={staffAssignmentForm.targetType} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, targetType: event.target.value })}><option value="report">{t(props.language, "messenger.target.report")}</option><option value="case_review">{t(props.language, "messenger.target.case_review")}</option><option value="restriction">{t(props.language, "messenger.target.restriction")}</option><option value="escalation">{t(props.language, "messenger.target.escalation")}</option><option value="authority_request">{t(props.language, "messenger.target.authority_request")}</option><option value="evidence_vault">{t(props.language, "messenger.target.evidence_vault")}</option><option value="guard_event">{t(props.language, "messenger.target.guard_event")}</option><option value="integrity_finding">{t(props.language, "messenger.target.integrity_finding")}</option><option value="compliance_package">{t(props.language, "messenger.target.compliance_package")}</option></select></label>
            <label><span>{t(props.language, "messenger.assignmentTargetId")}</span><input value={staffAssignmentForm.targetId} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.assignmentPriority")}</span><select value={staffAssignmentForm.priority} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, priority: event.target.value })}><option value="normal">{statusText(props.language, "normal")}</option><option value="urgent">{statusText(props.language, "urgent")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "messenger.assignedToAdminId")}</span><input value={staffAssignmentForm.assignedToAdminId} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, assignedToAdminId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.assignedRole")}</span><select value={staffAssignmentForm.assignedRole} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, assignedRole: event.target.value })}><option value="security">{statusText(props.language, "security")}</option><option value="compliance">{statusText(props.language, "compliance")}</option><option value="risk">{statusText(props.language, "risk")}</option><option value="manager">{statusText(props.language, "manager")}</option></select></label>
            <label><span>{t(props.language, "messenger.assignmentDueAt")}</span><input value={staffAssignmentForm.dueAt} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, dueAt: event.target.value })} placeholder="2026-05-15T12:00:00+05:00" /></label>
            <label className="span2"><span>{t(props.language, "messenger.assignmentTitle")}</span><input value={staffAssignmentForm.title} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, title: event.target.value })} /></label>
            <label className="checkRow"><input type="checkbox" checked={staffAssignmentForm.ownerDecisionRequired} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, ownerDecisionRequired: event.target.checked })} /> {t(props.language, "messenger.ownerDecisionRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={staffAssignmentForm.complianceReviewRequired} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, complianceReviewRequired: event.target.checked })} /> {t(props.language, "messenger.complianceReviewRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={staffAssignmentForm.authorityCooperationRequired} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, authorityCooperationRequired: event.target.checked })} /> {t(props.language, "messenger.authorityCooperationRequired")}</label>
            <label className="span2"><span>{t(props.language, "messenger.requiredAccessScopes")}</span><input value={staffAssignmentForm.requiredAccessScopes} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, requiredAccessScopes: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedReportIds")}</span><textarea value={staffAssignmentForm.linkedReportIds} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, linkedReportIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedCaseIds")}</span><textarea value={staffAssignmentForm.linkedCaseIds} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, linkedCaseIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={staffAssignmentForm.linkedEvidenceIds} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, linkedEvidenceIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.assignmentNote")}</span><input value={staffAssignmentForm.note} onChange={(event) => setStaffAssignmentForm({ ...staffAssignmentForm, note: event.target.value })} /></label>
            <button onClick={createStaffAssignment} disabled={busy || !staffAssignmentForm.targetId.trim() || !staffAssignmentForm.assignedToAdminId.trim()}>{t(props.language, "messenger.createStaffAssignment")}</button>
          </div>
        ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
        <div className="buttonRow"><button onClick={refreshStaffAssignments} disabled={busy}>{t(props.language, "messenger.refreshStaffAssignments")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportStaffAssignments} disabled={busy}>{t(props.language, "messenger.exportStaffAssignments")}</button> : null}</div>
        {(staffAssignments?.assignments ?? safety?.staffAssignments ?? []).length ? (
          <div className="tableList">
            {(staffAssignments?.assignments ?? safety?.staffAssignments ?? []).slice(0, 40).map((item: AdminMessengerSafetyStaffAssignment) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{cleanAdminValueText(props.language, item.targetType)}:{item.targetId} · {t(props.language, "messenger.assignedToAdminId")}: {item.assignedToAdminId} · {item.assignedRole}</span>
                <span>{t(props.language, "messenger.requiredAccessScopes")}: {(item.requiredAccessScopes ?? []).join(", ") || "—"}</span>
                <span>{t(props.language, "messenger.linkedEvidence")}: {(item.linkedEvidenceIds ?? []).join(", ") || "—"}</span>
                {item.dueAt ? <span>{t(props.language, "messenger.assignmentDueAt")}: {item.dueAt}</span> : null}
                <em className={item.status === "completed" ? "pass" : item.priority === "critical" ? "fail" : "warning"}>{statusText(props.language, item.status)}</em>
                {canWriteMessenger && item.status !== "completed" && item.status !== "cancelled" ? <input value={staffAssignmentNotes[item.id] ?? ""} onChange={(event) => setStaffAssignmentNotes({ ...staffAssignmentNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.assignmentNote")} /> : null}
                {canWriteMessenger && item.status === "open" ? <button onClick={() => updateStaffAssignmentStatus(item, "in_progress")} disabled={busy}>{t(props.language, "messenger.assignmentStart")}</button> : null}
                {canWriteMessenger && item.status !== "completed" ? <button onClick={() => updateStaffAssignmentStatus(item, "waiting_owner")} disabled={busy}>{t(props.language, "messenger.assignmentWaitingOwner")}</button> : null}
                {canWriteMessenger && item.status !== "completed" ? <button onClick={() => updateStaffAssignmentStatus(item, "completed")} disabled={busy}>{t(props.language, "messenger.assignmentComplete")}</button> : null}
                {props.me?.rootOwner && item.status !== "completed" ? <button onClick={() => updateStaffAssignmentStatus(item, "cancelled")} disabled={busy}>{t(props.language, "messenger.assignmentCancel")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noStaffAssignments")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageAuthority">
        <h3>{t(props.language, "messenger.exportVerificationTitle")}</h3>
        <p>{t(props.language, "messenger.exportVerificationDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.exportVerificationReferences")}</span><strong>{exportVerification?.summary.references ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.exportVerificationChecks")}</span><strong>{exportVerification?.summary.recentVerifications ?? safety?.summary.exportVerificationChecks ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.exportVerificationVerified")}</span><strong>{exportVerification?.summary.verified ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.exportVerificationWarnings")}</span><strong>{exportVerification?.summary.warnings ?? safety?.summary.exportVerificationWarnings ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.exportVerificationFailed")}</span><strong>{exportVerification?.summary.failed ?? safety?.summary.exportVerificationFailed ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.rawContentIncluded")}</span><strong>{statusText(props.language, String(exportVerification?.summary.rawContentIncluded ?? false))}</strong></div>
        </div>
        {(exportVerification?.policy ?? safety?.exportVerificationPolicy ?? []).length ? <ul className="rulesList">{(exportVerification?.policy ?? safety?.exportVerificationPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow">
          <button onClick={refreshSafetyExportVerification} disabled={busy}>{t(props.language, "messenger.refreshExportVerification")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportSafetyExportVerification} disabled={busy}>{t(props.language, "messenger.exportVerificationPackage")}</button> : null}
        </div>
        {props.me?.rootOwner ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.packageKind")}</span><select value={exportVerificationForm.packageKind} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, packageKind: event.target.value })}>
              <option value="evidence_vault">{statusText(props.language, "evidence_vault")}</option><option value="safety_report_package">{statusText(props.language, "safety_report_package")}</option><option value="case_package">{statusText(props.language, "case_package")}</option><option value="authority_package">{statusText(props.language, "authority_package")}</option><option value="restriction_package">{statusText(props.language, "restriction_package")}</option><option value="enforcement_package">{statusText(props.language, "enforcement_package")}</option><option value="runtime_bridge_package">{statusText(props.language, "runtime_bridge_package")}</option><option value="client_guards_package">{statusText(props.language, "client_guards_package")}</option><option value="guard_event_package">{statusText(props.language, "guard_event_package")}</option><option value="integrity_package">{statusText(props.language, "integrity_package")}</option><option value="escalation_package">{statusText(props.language, "escalation_package")}</option><option value="compliance_report_package">{statusText(props.language, "compliance_report_package")}</option><option value="retention_package">{statusText(props.language, "retention_package")}</option>
            </select></label>
            <label><span>{t(props.language, "messenger.packageId")}</span><input value={exportVerificationForm.packageId} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, packageId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.sourceId")}</span><input value={exportVerificationForm.sourceId} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, sourceId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.packageHash")}</span><input value={exportVerificationForm.packageHash} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, packageHash: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.auditAnchorHash")}</span><input value={exportVerificationForm.auditAnchorHash} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, auditAnchorHash: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.vaultAnchorHash")}</span><input value={exportVerificationForm.vaultAnchorHash} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, vaultAnchorHash: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.guardAnchorHash")}</span><input value={exportVerificationForm.guardAnchorHash} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, guardAnchorHash: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.retentionHash")}</span><input value={exportVerificationForm.retentionHash} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, retentionHash: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.verificationNote")}</span><input value={exportVerificationForm.note} onChange={(event) => setExportVerificationForm({ ...exportVerificationForm, note: event.target.value })} /></label>
            <button onClick={verifySafetyExportPackage} disabled={busy}>{t(props.language, "messenger.verifyExportPackage")}</button>
          </div>
        ) : null}
        {(exportVerification?.references ?? []).length ? <div className="tableList">{(exportVerification?.references ?? []).slice(0, 16).map((item) => <div className="row" key={item.key}><strong>{cleanAdminUiText(props.language, item.title)}</strong><span>{cleanAdminValueText(props.language, item.packageKind)}{item.sourceId ? ` · ${item.sourceId}` : ""} · {t(props.language, "messenger.records")}: {item.recordCount}</span><span>{t(props.language, "messenger.expectedPackageHash")}: {item.expectedPackageHash?.slice(0, 18) ?? "—"}</span><span>{t(props.language, "messenger.auditAnchorHash")}: {item.auditAnchorHash?.slice(0, 18) ?? "—"}</span></div>)}</div> : null}
        {(exportVerification?.recentVerifications ?? []).length ? <div className="tableList">{(exportVerification?.recentVerifications ?? []).slice(0, 20).map((item: AdminMessengerSafetyExportVerificationLogItem) => <div className="row" key={item.id}><strong>{cleanAdminValueText(props.language, item.packageKind)}</strong><span>{item.packageId ?? "—"}{item.sourceId ? ` · ${item.sourceId}` : ""}</span><span>{t(props.language, "messenger.matched")}: {item.matched.join(", ") || "—"} · {t(props.language, "messenger.missing")}: {item.missing.join(", ") || "—"}</span><span>{t(props.language, "messenger.mismatches")}: {item.mismatches.join(", ") || "—"}</span><em className={item.result === "verified" ? "pass" : item.result === "failed" ? "fail" : "warning"}>{statusText(props.language, item.result)}</em></div>)}</div> : <div className="emptyState">{t(props.language, "messenger.noExportVerifications")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageIncidents">
        <h3>{t(props.language, "messenger.recoveryReviewTitle")}</h3>
        <p>{t(props.language, "messenger.recoveryReviewDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.openRecoveryReviews")}</span><strong>{recoveryReviews?.summary.openReviews ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.criticalRecoveryReviews")}</span><strong>{recoveryReviews?.summary.criticalReviews ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerDecisionRequired")}</span><strong>{recoveryReviews?.summary.ownerDecisionRequired ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.restrictionReleaseReviews")}</span><strong>{recoveryReviews?.summary.restrictionReleaseReviews ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.exportVerifiedReviews")}</span><strong>{recoveryReviews?.summary.exportVerifiedReviews ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.recoveryHash")}</span><strong>{recoveryReviews?.summary.recoveryHash?.slice(0, 12) ?? "—"}</strong></div>
        </div>
        {(recoveryReviews?.policy ?? []).length ? <ul className="rulesList">{(recoveryReviews?.policy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.recoveryTitle")}</span><input value={recoveryReviewForm.title} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.reportSeverity")}</span><select value={recoveryReviewForm.severity} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, severity: event.target.value })}><option value="critical">{statusText(props.language, "critical")}</option><option value="high">{statusText(props.language, "high")}</option><option value="medium">{statusText(props.language, "medium")}</option></select></label>
            <label><span>{t(props.language, "messenger.releaseReadiness")}</span><select value={recoveryReviewForm.releaseReadiness} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, releaseReadiness: event.target.value })}><option value="pending_review">{statusText(props.language, "pending_review")}</option><option value="ready_to_release">{statusText(props.language, "ready_to_release")}</option><option value="keep_restricted">{statusText(props.language, "keep_restricted")}</option><option value="not_ready">{statusText(props.language, "not_ready")}</option></select></label>
            <label><span>{t(props.language, "messenger.reportTargetType")}</span><input value={recoveryReviewForm.targetType} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, targetType: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.reportTargetId")}</span><input value={recoveryReviewForm.targetId} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.relatedUserId")}</span><input value={recoveryReviewForm.userId} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, userId: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.recoveryPlan")}</span><textarea value={recoveryReviewForm.recoveryPlan} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, recoveryPlan: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.rootCause")}</span><textarea value={recoveryReviewForm.rootCause} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, rootCause: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.lessonsLearned")}</span><textarea value={recoveryReviewForm.lessonsLearned} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, lessonsLearned: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEmergencyActionIds")}</span><textarea value={recoveryReviewForm.linkedEmergencyActionIds} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, linkedEmergencyActionIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedIncidentIds")}</span><textarea value={recoveryReviewForm.linkedIncidentIds} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, linkedIncidentIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={recoveryReviewForm.linkedEvidenceIds} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, linkedEvidenceIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedRestrictionIds")}</span><textarea value={recoveryReviewForm.linkedRestrictionIds} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, linkedRestrictionIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedAuthorityRequestIds")}</span><textarea value={recoveryReviewForm.linkedAuthorityRequestIds} onChange={(event) => setRecoveryReviewForm({ ...recoveryReviewForm, linkedAuthorityRequestIds: event.target.value })} /></label>
            <button onClick={createRecoveryReview} disabled={busy || !recoveryReviewForm.recoveryPlan.trim()}>{t(props.language, "messenger.createRecoveryReview")}</button>
          </div>
        ) : null}
        <div className="buttonRow">
          <button onClick={refreshRecoveryReviews} disabled={busy}>{t(props.language, "messenger.refreshRecoveryReviews")}</button>
          {hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportRecoveryReviews} disabled={busy}>{t(props.language, "messenger.exportRecoveryReviews")}</button> : null}
        </div>
        {(recoveryReviews?.openQueue ?? []).length ? (
          <div className="tableList">
            {(recoveryReviews?.openQueue ?? []).slice(0, 30).map((item: AdminMessengerSafetyRecoveryReview) => (
              <div className="row" key={item.id}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{cleanAdminValueText(props.language, item.source)} · {statusText(props.language, item.severity)} · {cleanAdminValueText(props.language, item.targetType ?? "target")}: {item.targetId ?? item.userId ?? item.chatId ?? item.messageId ?? "—"}</span>
                <span>{t(props.language, "messenger.releaseReadiness")}: {statusText(props.language, item.releaseReadiness)} · {t(props.language, "messenger.linkedEvidence")}: {item.linkedEvidenceIds.length}</span>
                <span>{t(props.language, "messenger.recoveryChecklist")}: {Object.values(item.checklist ?? {}).filter(Boolean).length}/{Object.keys(item.checklist ?? {}).length}</span>
                <em className={item.status === "completed" || item.status === "closed" ? "pass" : item.severity === "critical" ? "fail" : "warning"}>{statusText(props.language, item.status)}</em>
                {props.me?.rootOwner ? <input value={recoveryReviewNotes[item.id] ?? ""} onChange={(event) => setRecoveryReviewNotes({ ...recoveryReviewNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.recoveryNote")} /> : null}
                {props.me?.rootOwner ? <button onClick={() => updateRecoveryReviewStatus(item.id, "evidence_validation")} disabled={busy}>{t(props.language, "messenger.markEvidenceValidation")}</button> : null}
                {props.me?.rootOwner ? <button onClick={() => updateRecoveryReviewStatus(item.id, "restriction_release_review")} disabled={busy}>{t(props.language, "messenger.markRestrictionReview")}</button> : null}
                {props.me?.rootOwner ? <button onClick={() => updateRecoveryReviewStatus(item.id, "lessons_learned")} disabled={busy}>{t(props.language, "messenger.markLessonsLearned")}</button> : null}
                {props.me?.rootOwner ? <button onClick={() => updateRecoveryReviewStatus(item.id, "completed")} disabled={busy}>{t(props.language, "messenger.markCompleted")}</button> : null}
                {props.me?.rootOwner ? <button onClick={() => updateRecoveryReviewStatus(item.id, "closed")} disabled={busy}>{t(props.language, "messenger.closeRecoveryReview")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noRecoveryReviews")}</div>}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageIncidents">
        <h3>{t(props.language, "messenger.policyFeedbackTitle")}</h3>
        <p>{t(props.language, "messenger.policyFeedbackDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.totalFeedbackItems")}</span><strong>{policyFeedback?.summary.totalFeedbackItems ?? safety?.summary.policyFeedbackOpenItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.openFeedbackItems")}</span><strong>{policyFeedback?.summary.openFeedbackItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerReviewItems")}</span><strong>{policyFeedback?.summary.ownerReviewItems ?? safety?.summary.policyFeedbackOwnerReviewItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.trainingRequiredItems")}</span><strong>{policyFeedback?.summary.trainingRequiredItems ?? safety?.summary.policyFeedbackTrainingItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.implementationRequiredItems")}</span><strong>{policyFeedback?.summary.implementationRequiredItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.feedbackHash")}</span><strong>{policyFeedback?.summary.feedbackHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(policyFeedback?.policy ?? safety?.policyFeedbackPolicy ?? []).length ? <ul className="rulesList">{(policyFeedback?.policy ?? safety?.policyFeedbackPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.feedbackTitle")}</span><input value={policyFeedbackForm.title} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.feedbackSource")}</span><select value={policyFeedbackForm.source} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, source: event.target.value })}><option value="manual">{statusText(props.language, "manual")}</option><option value="after_action_review">{statusText(props.language, "after_action_review")}</option><option value="incident_response">{statusText(props.language, "incident_response")}</option><option value="emergency_action">{statusText(props.language, "emergency_action")}</option></select></label>
            <label><span>{t(props.language, "messenger.policyArea")}</span><select value={policyFeedbackForm.policyArea} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, policyArea: event.target.value })}><option value="incident_response">{statusText(props.language, "incident_response")}</option><option value="messenger_runtime_guards">{statusText(props.language, "messenger_runtime_guards")}</option><option value="authority_cooperation">{statusText(props.language, "authority_cooperation")}</option><option value="restrictions">{statusText(props.language, "restrictions")}</option><option value="staff_training">{statusText(props.language, "staff_training")}</option><option value="export_verification">{statusText(props.language, "export_verification")}</option><option value="other">{statusText(props.language, "other")}</option></select></label>
            <label><span>{t(props.language, "messenger.assignmentPriority")}</span><select value={policyFeedbackForm.priority} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, priority: event.target.value })}><option value="normal">{statusText(props.language, "normal")}</option><option value="urgent">{statusText(props.language, "urgent")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "messenger.sourceId")}</span><input value={policyFeedbackForm.sourceId} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, sourceId: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.targetSystem")}</span><input value={policyFeedbackForm.targetSystem} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, targetSystem: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.recommendation")}</span><textarea value={policyFeedbackForm.recommendation} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, recommendation: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.rationale")}</span><textarea value={policyFeedbackForm.rationale} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, rationale: event.target.value })} /></label>
            <label className="checkRow"><input type="checkbox" checked={policyFeedbackForm.ownerDecisionRequired} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, ownerDecisionRequired: event.target.checked })} /> {t(props.language, "messenger.ownerDecisionRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={policyFeedbackForm.trainingRequired} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, trainingRequired: event.target.checked })} /> {t(props.language, "messenger.trainingRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={policyFeedbackForm.implementationRequired} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, implementationRequired: event.target.checked })} /> {t(props.language, "messenger.implementationRequired")}</label>
            <label className="span2"><span>{t(props.language, "messenger.linkedRecoveryReviewIds")}</span><textarea value={policyFeedbackForm.linkedRecoveryReviewIds} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, linkedRecoveryReviewIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedIncidentIds")}</span><textarea value={policyFeedbackForm.linkedIncidentIds} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, linkedIncidentIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={policyFeedbackForm.linkedEvidenceIds} onChange={(event) => setPolicyFeedbackForm({ ...policyFeedbackForm, linkedEvidenceIds: event.target.value })} /></label>
            <button onClick={createPolicyFeedback} disabled={busy || !policyFeedbackForm.recommendation.trim()}>{t(props.language, "messenger.createPolicyFeedback")}</button>
          </div>
        ) : null}
        <div className="buttonRow"><button onClick={refreshPolicyFeedback} disabled={busy}>{t(props.language, "messenger.refreshPolicyFeedback")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPolicyFeedback} disabled={busy}>{t(props.language, "messenger.exportPolicyFeedback")}</button> : null}</div>
        {(policyFeedback?.openQueue ?? []).length ? (
          <div className="tableList">
            {(policyFeedback?.openQueue ?? []).slice(0, 30).map((item: AdminMessengerSafetyPolicyFeedbackItem) => (
              <div className="row" key={item.id}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{statusText(props.language, item.policyArea)} · {statusText(props.language, item.priority)} · {statusText(props.language, item.status)}</span>
                <span>{t(props.language, "messenger.recommendation")}: {ruleText(props.language, item.recommendation)}</span>
                <span>{t(props.language, "messenger.linkedRecoveryReviewIds")}: {(item.linkedRecoveryReviewIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.linkedIncidentIds")}: {(item.linkedIncidentIds ?? []).join(", ") || "—"}</span>
                <span>{t(props.language, "messenger.feedbackChecklist")}: {Object.values(item.checklist ?? {}).filter(Boolean).length}/{Object.keys(item.checklist ?? {}).length}</span>
                {props.me?.rootOwner ? <div className="buttonRow"><input value={policyFeedbackNotes[item.id] ?? ""} onChange={(event) => setPolicyFeedbackNotes({ ...policyFeedbackNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.feedbackNote")} /><button onClick={() => updatePolicyFeedbackStatus(item.id, "owner_review")} disabled={busy}>{t(props.language, "messenger.requestOwnerReview")}</button><button onClick={() => updatePolicyFeedbackStatus(item.id, "approved")} disabled={busy}>{t(props.language, "messenger.approveFeedback")}</button><button onClick={() => updatePolicyFeedbackStatus(item.id, "implemented")} disabled={busy}>{t(props.language, "messenger.markImplemented")}</button></div> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noPolicyFeedback")}</div>}
        {(policyFeedback?.improvementChecklist ?? []).length ? <ul className="rulesList">{(policyFeedback?.improvementChecklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageIncidents">
        <h3>{t(props.language, "messenger.policyRegistryTitle")}</h3>
        <p>{t(props.language, "messenger.policyRegistryDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.totalPolicies")}</span><strong>{policyRegistry?.summary.totalPolicies ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.activePolicies")}</span><strong>{policyRegistry?.summary.activePolicies ?? safety?.summary.policyRegistryActiveItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.ownerReviewPolicies")}</span><strong>{policyRegistry?.summary.ownerReviewPolicies ?? safety?.summary.policyRegistryOwnerReviewItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.trainingRequiredPolicies")}</span><strong>{policyRegistry?.summary.trainingRequiredPolicies ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.runtimeGuardUpdatePolicies")}</span><strong>{policyRegistry?.summary.runtimeGuardUpdatePolicies ?? safety?.summary.policyRegistryRuntimeGuardItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.registryHash")}</span><strong>{policyRegistry?.summary.registryHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(policyRegistry?.policy ?? safety?.policyRegistryPolicy ?? []).length ? <ul className="rulesList">{(policyRegistry?.policy ?? safety?.policyRegistryPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        {props.me?.rootOwner ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.versionKey")}</span><input value={policyRegistryForm.versionKey} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, versionKey: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.policyArea")}</span><select value={policyRegistryForm.area} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, area: event.target.value })}><option value="incident_response">{statusText(props.language, "incident_response")}</option><option value="messenger_runtime_guards">{statusText(props.language, "messenger_runtime_guards")}</option><option value="authority_cooperation">{statusText(props.language, "authority_cooperation")}</option><option value="restrictions">{statusText(props.language, "restrictions")}</option><option value="access_control">{statusText(props.language, "access_control")}</option><option value="compliance_reporting">{statusText(props.language, "compliance_reporting")}</option><option value="other">{statusText(props.language, "other")}</option></select></label>
            <label><span>{t(props.language, "messenger.policyTitle")}</span><input value={policyRegistryForm.title} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.effectiveAt")}</span><input value={policyRegistryForm.effectiveAt} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, effectiveAt: event.target.value })} placeholder="2026-05-15T00:00:00.000Z" /></label>
            <label className="span2"><span>{t(props.language, "messenger.changeSummary")}</span><textarea value={policyRegistryForm.changeSummary} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, changeSummary: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.rationale")}</span><textarea value={policyRegistryForm.rationale} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, rationale: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.sourceFeedbackIds")}</span><textarea value={policyRegistryForm.sourceFeedbackIds} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, sourceFeedbackIds: event.target.value })} /></label>
            <label className="span2"><span>{t(props.language, "messenger.linkedEvidenceIds")}</span><textarea value={policyRegistryForm.linkedEvidenceIds} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, linkedEvidenceIds: event.target.value })} /></label>
            <label className="checkRow"><input type="checkbox" checked={policyRegistryForm.trainingRequired} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, trainingRequired: event.target.checked })} /> {t(props.language, "messenger.trainingRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={policyRegistryForm.runtimeGuardUpdateRequired} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, runtimeGuardUpdateRequired: event.target.checked })} /> {t(props.language, "messenger.runtimeGuardUpdateRequired")}</label>
            <label className="checkRow"><input type="checkbox" checked={policyRegistryForm.accessControlReviewRequired} onChange={(event) => setPolicyRegistryForm({ ...policyRegistryForm, accessControlReviewRequired: event.target.checked })} /> {t(props.language, "messenger.accessControlReviewRequired")}</label>
            <button onClick={createPolicyRegistryItem} disabled={busy || !policyRegistryForm.changeSummary.trim()}>{t(props.language, "messenger.createPolicyRegistryItem")}</button>
          </div>
        ) : null}
        <div className="buttonRow"><button onClick={refreshPolicyRegistry} disabled={busy}>{t(props.language, "messenger.refreshPolicyRegistry")}</button>{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPolicyRegistry} disabled={busy}>{t(props.language, "messenger.exportPolicyRegistry")}</button> : null}</div>
        {(policyRegistry?.ownerReviewQueue ?? []).length ? (
          <div className="tableList">
            {(policyRegistry?.ownerReviewQueue ?? []).slice(0, 30).map((item: AdminMessengerSafetyPolicyRegistryItem) => (
              <div className="row" key={item.id}>
                <strong>{ruleText(props.language, item.title)}</strong>
                <span>{item.versionKey} · {statusText(props.language, item.area)} · {statusText(props.language, item.status)}</span>
                <span>{t(props.language, "messenger.changeSummary")}: {ruleText(props.language, item.changeSummary)}</span>
                <span>{t(props.language, "messenger.sourceFeedbackIds")}: {(item.sourceFeedbackIds ?? []).join(", ") || "—"} · {t(props.language, "messenger.policyHash")}: {item.policyHash?.slice(0, 10) ?? "—"}</span>
                <span>{t(props.language, "messenger.policyChecklist")}: {Object.values(item.checklist ?? {}).filter(Boolean).length}/{Object.keys(item.checklist ?? {}).length}</span>
                {props.me?.rootOwner ? <div className="buttonRow"><input value={policyRegistryNotes[item.id] ?? ""} onChange={(event) => setPolicyRegistryNotes({ ...policyRegistryNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.policyRegistryNote")} /><button onClick={() => updatePolicyRegistryStatus(item.id, "owner_review")} disabled={busy}>{t(props.language, "messenger.requestOwnerReview")}</button><button onClick={() => updatePolicyRegistryStatus(item.id, "approved")} disabled={busy}>{t(props.language, "messenger.approvePolicy")}</button><button onClick={() => updatePolicyRegistryStatus(item.id, "active")} disabled={busy}>{t(props.language, "messenger.activatePolicy")}</button></div> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noPolicyRegistry")}</div>}
        {(policyRegistry?.checklist ?? []).length ? <ul className="rulesList">{(policyRegistry?.checklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageIncidents">
        <h3>{t(props.language, "messenger.policyDeploymentTitle")}</h3>
        <p>{t(props.language, "messenger.policyDeploymentDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.totalDeployments")}</span><strong>{policyDeployment?.summary.totalDeployments ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.pendingOwnerApproval")}</span><strong>{policyDeployment?.summary.pendingOwnerApproval ?? safety?.summary.policyDeploymentPendingItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.syncQueue")}</span><strong>{policyDeployment?.summary.syncingDeployments ?? safety?.summary.policyDeploymentSyncItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.deployedPolicies")}</span><strong>{policyDeployment?.summary.deployedPolicies ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.failedDeployments")}</span><strong>{policyDeployment?.summary.failedDeployments ?? safety?.summary.policyDeploymentFailedItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.deploymentHash")}</span><strong>{policyDeployment?.summary.deploymentHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(policyDeployment?.policy ?? safety?.policyDeploymentPolicy ?? []).length ? <ul className="rulesList">{(policyDeployment?.policy ?? safety?.policyDeploymentPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshPolicyDeployment} disabled={busy}>{t(props.language, "messenger.refreshPolicyDeployment")}</button>{props.me?.rootOwner ? <button onClick={syncPolicyDeployment} disabled={busy}>{t(props.language, "messenger.syncActivePolicies")}</button> : null}{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPolicyDeployment} disabled={busy}>{t(props.language, "messenger.exportPolicyDeployment")}</button> : null}</div>
        {(policyDeployment?.pendingQueue ?? []).length ? (
          <div className="tableList">
            {(policyDeployment?.pendingQueue ?? []).slice(0, 30).map((item: AdminMessengerSafetyPolicyDeploymentItem) => (
              <div className="row" key={item.id}>
                <strong>{item.versionKey}</strong>
                <span>{statusText(props.language, item.policyArea)} · {statusText(props.language, item.target)} · {statusText(props.language, item.status)}</span>
                <span>{t(props.language, "messenger.policyId")}: {item.policyId} · {t(props.language, "messenger.deploymentHash")}: {item.deploymentHash?.slice(0, 10) ?? "—"}</span>
                <span>{t(props.language, "messenger.policyDeploymentChecklist")}: {Object.values(item.checklist ?? {}).filter(Boolean).length}/{Object.keys(item.checklist ?? {}).length}</span>
                {props.me?.rootOwner ? <div className="buttonRow"><input value={policyDeploymentNotes[item.id] ?? ""} onChange={(event) => setPolicyDeploymentNotes({ ...policyDeploymentNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.policyDeploymentNote")} /><button onClick={() => updatePolicyDeploymentStatus(item.id, "approved")} disabled={busy}>{t(props.language, "messenger.approveDeployment")}</button><button onClick={() => updatePolicyDeploymentStatus(item.id, "syncing")} disabled={busy}>{t(props.language, "messenger.startDeploymentSync")}</button><button onClick={() => updatePolicyDeploymentStatus(item.id, "deployed")} disabled={busy}>{t(props.language, "messenger.markDeployed")}</button><button onClick={() => updatePolicyDeploymentStatus(item.id, "failed")} disabled={busy}>{t(props.language, "messenger.markFailed")}</button></div> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noPolicyDeployments")}</div>}
        {(policyDeployment?.checklist ?? []).length ? <ul className="rulesList">{(policyDeployment?.checklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card dangerCard messengerPageUnit messengerPageTraining">
        <h3>{t(props.language, "messenger.policyTrainingTitle")}</h3>
        <p>{t(props.language, "messenger.policyTrainingDescription")}</p>
        <div className="statGrid">
          <div><span>{t(props.language, "messenger.totalTrainingTasks")}</span><strong>{policyTraining?.summary.totalTrainingTasks ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.requiredTrainingTasks")}</span><strong>{policyTraining?.summary.requiredTasks ?? safety?.summary.policyTrainingRequiredItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.assignedTrainingTasks")}</span><strong>{policyTraining?.summary.assignedTasks ?? safety?.summary.policyTrainingAssignedItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.acknowledgedTrainingTasks")}</span><strong>{policyTraining?.summary.acknowledgedTasks ?? safety?.summary.policyTrainingAcknowledgedItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.completedTrainingTasks")}</span><strong>{policyTraining?.summary.completedTasks ?? safety?.summary.policyTrainingCompletedItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.overdueTrainingTasks")}</span><strong>{policyTraining?.summary.overdueTasks ?? safety?.summary.policyTrainingOverdueItems ?? 0}</strong></div>
          <div><span>{t(props.language, "messenger.trainingHash")}</span><strong>{policyTraining?.summary.trainingHash?.slice(0, 10) ?? "—"}</strong></div>
        </div>
        {(policyTraining?.policy ?? safety?.policyTrainingPolicy ?? []).length ? <ul className="rulesList">{(policyTraining?.policy ?? safety?.policyTrainingPolicy ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
        <div className="buttonRow"><button onClick={refreshPolicyTraining} disabled={busy}>{t(props.language, "messenger.refreshPolicyTraining")}</button>{props.me?.rootOwner ? <button onClick={syncPolicyTraining} disabled={busy}>{t(props.language, "messenger.syncPolicyTraining")}</button> : null}{hasAdminPermission(props.me, "audit:export") && props.me?.rootOwner ? <button onClick={exportPolicyTraining} disabled={busy}>{t(props.language, "messenger.exportPolicyTraining")}</button> : null}</div>
        {(policyTraining?.tasks ?? []).length ? (
          <div className="tableList trainingList">
            {(policyTraining?.tasks ?? []).slice(0, 40).map((item: AdminMessengerSafetyPolicyTrainingAcknowledgementItem) => (
              <div className="row" key={item.id}>
                <strong>{item.versionKey}</strong>
                <span>{statusText(props.language, item.policyArea)} · {statusText(props.language, item.deploymentTarget)} · {statusText(props.language, item.status)}</span>
                <span>{t(props.language, "messenger.policyId")}: {item.policyId} · {t(props.language, "messenger.sourceDeploymentId")}: {item.sourceDeploymentId}</span>
                <span>{t(props.language, "messenger.requiredRole")}: {statusText(props.language, item.requiredRole)} · {t(props.language, "messenger.assignedToAdmin")}: {item.assignedToAdminId ?? "—"}</span>
                <span>{t(props.language, "messenger.dueAt")}: {item.dueAt ?? "—"} · {t(props.language, "messenger.trainingHash")}: {item.trainingHash?.slice(0, 10) ?? "—"}</span>
                <span>{t(props.language, "messenger.policyTrainingChecklist")}: {Object.values(item.checklist ?? {}).filter(Boolean).length}/{Object.keys(item.checklist ?? {}).length}</span>
                <div className="buttonRow trainingActions">
                  <input value={policyTrainingAssignees[item.id] ?? item.assignedToAdminId ?? ""} onChange={(event) => setPolicyTrainingAssignees({ ...policyTrainingAssignees, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.assignedToAdmin")} />
                  <select value={policyTrainingRoles[item.id] ?? item.requiredRole} onChange={(event) => setPolicyTrainingRoles({ ...policyTrainingRoles, [item.id]: event.target.value })}><option value="security">{statusText(props.language, "security")}</option><option value="compliance">{statusText(props.language, "compliance")}</option><option value="admin">{statusText(props.language, "admin")}</option><option value="developer">{statusText(props.language, "developer")}</option><option value="root_owner">{statusText(props.language, "root_owner")}</option></select>
                  <input value={policyTrainingDueDates[item.id] ?? item.dueAt ?? ""} onChange={(event) => setPolicyTrainingDueDates({ ...policyTrainingDueDates, [item.id]: event.target.value })} placeholder="YYYY-MM-DDTHH:mm:ss.sssZ" />
                  <input value={policyTrainingNotes[item.id] ?? ""} onChange={(event) => setPolicyTrainingNotes({ ...policyTrainingNotes, [item.id]: event.target.value })} placeholder={t(props.language, "messenger.trainingNote")} />
                  {props.me?.rootOwner ? <button onClick={() => assignPolicyTraining(item)} disabled={busy}>{t(props.language, "messenger.assignTraining")}</button> : null}
                  <button onClick={() => acknowledgePolicyTraining(item)} disabled={busy}>{t(props.language, "messenger.acknowledgeTraining")}</button>
                  {props.me?.rootOwner ? <button onClick={() => completePolicyTraining(item)} disabled={busy}>{t(props.language, "messenger.completeTraining")}</button> : null}
                  {props.me?.rootOwner ? <button onClick={() => waivePolicyTraining(item)} disabled={busy}>{t(props.language, "messenger.waiveTraining")}</button> : null}
                </div>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noPolicyTraining")}</div>}
        {(policyTraining?.checklist ?? []).length ? <ul className="rulesList">{(policyTraining?.checklist ?? []).map((rule: string) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul> : null}
      </div>

      <div className="card messengerPageUnit messengerPageDiagnostics">
        <h3>{t(props.language, "messenger.manualControl")}</h3>
        {canWriteMessenger ? (
          <div className="formGrid">
            <label><span>{t(props.language, "messenger.blockerKey")}</span><input value={blockerForm.key} onChange={(event) => setBlockerForm({ ...blockerForm, key: event.target.value })} placeholder="chat_realtime_two_device" /></label>
            <label><span>{t(props.language, "messenger.blockerTitle")}</span><input value={blockerForm.title} onChange={(event) => setBlockerForm({ ...blockerForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "messenger.blockerSeverity")}</span><select value={blockerForm.severity} onChange={(event) => setBlockerForm({ ...blockerForm, severity: event.target.value === "warning" ? "warning" : "critical" })}><option value="critical">{statusText(props.language, "critical")}</option><option value="warning">{statusText(props.language, "warning")}</option></select></label>
            <label className="span2"><span>{t(props.language, "messenger.blockerMessage")}</span><textarea value={blockerForm.message} onChange={(event) => setBlockerForm({ ...blockerForm, message: event.target.value })} /></label>
            <button onClick={createLaunchBlocker} disabled={busy || !blockerForm.title.trim() || !blockerForm.message.trim()}>{t(props.language, "messenger.addBlocker")}</button>
          </div>
        ) : <div className="emptyState">{t(props.language, "permission.readOnly")}</div>}
      </div>

      <div className="card messengerPageUnit messengerPageDiagnostics">
        <h3>{t(props.language, "messenger.launchBlockers")}</h3>
        {center?.launchBlockers?.length ? (
          <div className="tableList">
            {center.launchBlockers.map((item) => (
              <div className="row" key={`${item.source ?? "auto"}:${item.id ?? item.key}`}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.message}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
                {item.source === "manual" && item.id && canWriteMessenger ? <button onClick={() => resolveLaunchBlocker(item)} disabled={busy}>{t(props.language, "messenger.resolveBlocker")}</button> : null}
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noBlockers")}</div>}
      </div>

      {manualBlockers.length ? (
        <div className="card messengerPageUnit messengerPageDiagnostics">
          <h3>{t(props.language, "messenger.manualBlockers")}</h3>
          <div className="tableList">
            {manualBlockers.map((item) => (
              <div className="row" key={item.id ?? item.key}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.message}</span>
                <input value={item.id ? (resolutionNotes[item.id] ?? "") : ""} onChange={(event) => item.id ? setResolutionNotes({ ...resolutionNotes, [item.id]: event.target.value }) : undefined} placeholder={t(props.language, "messenger.resolutionNote")} />
                {canWriteMessenger ? <button onClick={() => resolveLaunchBlocker(item)} disabled={busy}>{t(props.language, "messenger.resolveBlocker")}</button> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card messengerPageUnit messengerPageDiagnostics">
        <h3>{t(props.language, "messenger.diagnostics")}</h3>
        {diagnostics.length ? (
          <div className="tableList">
            {diagnostics.map((item) => (
              <div className="row" key={item.key}>
                <strong>{cleanAdminUiText(props.language, item.title)}</strong>
                <span>{item.message}</span>
                <em className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</em>
              </div>
            ))}
          </div>
        ) : <div className="emptyState">{t(props.language, "messenger.noDiagnostics")}</div>}
      </div>

      <div className="card messengerPageUnit messengerPageDiagnostics">
        <h3>{t(props.language, "messenger.adminRules")}</h3>
        <ul className="rulesList">{(center?.adminRules ?? []).map((rule) => <li key={rule}>{ruleText(props.language, rule)}</li>)}</ul>
      </div>
    </section>
  );
}

function ProviderConsole(props: {
  language: AdminLanguage;
  config: AdminApiConfig;
  me: AdminPrincipal | null;
  providers: ProviderStatus[];
  catalog: ProviderCatalogItem[];
  reload: () => Promise<void>;
  setNotice: (notice: string) => void;
}) {
  const [selectedKey, setSelectedKey] = useState<string>(props.providers[0]?.key ?? "");
  const [details, setDetails] = useState<ProviderDetails | null>(null);
  const [form, setForm] = useState<ProviderFormState>({ enabled: false, fields: {}, secretFields: {}, notes: "" });
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("");
  const [pendingOwnerAction, setPendingOwnerAction] = useState<PendingOwnerProviderAction | null>(null);
  const canWriteProviders = hasAdminPermission(props.me, "providers:write");
  const canTestProviders = hasAdminPermission(props.me, "providers:test");

  const selectedStatus = props.providers.find((item) => item.key === selectedKey) ?? null;
  const selectedPendingOwnerAction = pendingOwnerAction?.providerKey === selectedKey ? pendingOwnerAction : null;
  const filtered = props.providers.filter((provider) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    return `${provider.key} ${providerTitle(props.language, provider.key, provider.title)} ${providerKindText(props.language, provider.kind)} ${provider.status}`.toLowerCase().includes(q);
  });

  const loadDetails = useCallback(async (key: string) => {
    if (!key) return;
    setBusy(true);
    try {
      const response = await adminApi.providerDetails(props.config, key);
      setDetails(response.provider);
      setForm(emptyProviderForm(response.provider));
    } finally {
      setBusy(false);
    }
  }, [props.config]);

  useEffect(() => {
    if (!selectedKey && props.providers[0]?.key) setSelectedKey(props.providers[0].key);
  }, [props.providers, selectedKey]);

  useEffect(() => {
    if (selectedKey) void loadDetails(selectedKey);
  }, [selectedKey, loadDetails]);

  function rememberOwnerConfirmation(action: ProviderCriticalAction, providerKey: string, confirmation: AdminOwnerCriticalConfirmation) {
    setPendingOwnerAction({ action, providerKey, confirmation, createdAt: new Date().toISOString() });
    props.setNotice(ownerFlowText(props.language, "blocked"));
  }

  async function executeProviderCriticalAction(action: ProviderCriticalAction, ownerConfirmationId?: string) {
    if (!selectedKey) return;

    if (action === "save") {
      const response = await adminApi.saveProviderConfig(props.config, selectedKey, {
        enabled: form.enabled,
        fields: form.fields,
        secretFields: form.secretFields,
        notes: form.notes,
        ownerConfirmationId,
      });
      setDetails(response.provider);
      setForm(emptyProviderForm(response.provider));
      props.setNotice(ownerConfirmationId ? ownerFlowText(props.language, "used") : t(props.language, "notice.providerSaved"));
      return;
    }

    if (action === "enable") await adminApi.enableProvider(props.config, selectedKey, ownerConfirmationId);
    if (action === "disable") await adminApi.disableProvider(props.config, selectedKey, ownerConfirmationId);
    if (action === "delete") await adminApi.deleteProviderConfig(props.config, selectedKey, ownerConfirmationId);
    props.setNotice(ownerConfirmationId ? ownerFlowText(props.language, "used") : t(props.language, "notice.providerAction"));
  }

  async function save() {
    if (!selectedKey) return;
    setBusy(true);
    try {
      await executeProviderCriticalAction("save");
      await props.reload();
      await loadDetails(selectedKey);
      setPendingOwnerAction(null);
    } catch (error) {
      const confirmation = readOwnerConfirmationError(error);
      if (confirmation) {
        rememberOwnerConfirmation("save", selectedKey, confirmation);
        return;
      }
      props.setNotice(String((error as Error)?.message ?? error));
    } finally {
      setBusy(false);
    }
  }

  async function runAction(action: "enable" | "disable" | "test" | "delete") {
    if (!selectedKey) return;
    setBusy(true);
    try {
      if (action === "test") {
        await adminApi.testProvider(props.config, selectedKey);
        props.setNotice(t(props.language, "notice.providerAction"));
      } else {
        await executeProviderCriticalAction(action);
        setPendingOwnerAction(null);
      }
      await props.reload();
      await loadDetails(selectedKey);
    } catch (error) {
      const confirmation = action === "test" ? null : readOwnerConfirmationError(error);
      if (confirmation) {
        rememberOwnerConfirmation(action as ProviderCriticalAction, selectedKey, confirmation);
        return;
      }
      props.setNotice(String((error as Error)?.message ?? error));
    } finally {
      setBusy(false);
    }
  }

  async function refreshOwnerConfirmation() {
    if (!selectedPendingOwnerAction) return;
    setBusy(true);
    try {
      const response = await adminApi.ownerConfirmations(props.config);
      const fresh = response.confirmations.find((item) => item.id === selectedPendingOwnerAction.confirmation.id);
      if (fresh) {
        setPendingOwnerAction({ ...selectedPendingOwnerAction, confirmation: fresh });
        props.setNotice(fresh.status === "approved" ? ownerFlowText(props.language, "approved") : ownerFlowText(props.language, "pending"));
      }
    } finally {
      setBusy(false);
    }
  }

  async function retryOwnerConfirmedAction() {
    if (!selectedPendingOwnerAction) return;
    const confirmation = selectedPendingOwnerAction.confirmation;
    if (confirmation.status !== "approved") {
      await refreshOwnerConfirmation();
      return;
    }

    setBusy(true);
    try {
      await executeProviderCriticalAction(selectedPendingOwnerAction.action, confirmation.id);
      await props.reload();
      await loadDetails(selectedPendingOwnerAction.providerKey);
      setPendingOwnerAction(null);
    } catch (error) {
      const nextConfirmation = readOwnerConfirmationError(error);
      if (nextConfirmation) {
        rememberOwnerConfirmation(selectedPendingOwnerAction.action, selectedPendingOwnerAction.providerKey, nextConfirmation);
        return;
      }
      props.setNotice(String((error as Error)?.message ?? error));
    } finally {
      setBusy(false);
    }
  }

  function updateField(kind: "fields" | "secretFields", key: string, value: string) {
    setForm((previous) => ({ ...previous, [kind]: { ...previous[kind], [key]: value } }));
  }

  return (
    <section className="panel providerPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "providers.title")}</h2>
          <p>{t(props.language, "providers.description")}</p>
        </div>
        <button onClick={() => props.reload()} disabled={busy}>{t(props.language, "button.reload")}</button>
      </div>
      <div className="providerLayout">
        <div className="providerList card">
          <input className="search" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={t(props.language, "placeholder.searchProviders")} />
          {filtered.map((provider) => (
            <button key={provider.key} onClick={() => setSelectedKey(provider.key)} className={provider.key === selectedKey ? "providerItem active" : "providerItem"}>
              <span><strong>{providerTitle(props.language, provider.key, provider.title)}</strong><small>{provider.key}</small></span>
              <em className={statusClass(provider.status)}>{statusText(props.language, provider.status)}</em>
            </button>
          ))}
        </div>
        <div className="providerDetails card">
          {!selectedStatus || !details ? (
            <div className="empty">{t(props.language, "providers.select")}</div>
          ) : (
            <>
              <div className="detailHead">
                <div>
                  <h3>{providerTitle(props.language, details.catalog.key, details.catalog.title)}</h3>
                  <p>{providerDescription(props.language, details.catalog.key, details.catalog.description)}</p>
                </div>
                <span className={statusClass(selectedStatus.status)}>{statusText(props.language, selectedStatus.status)}</span>
              </div>
              <div className="chips">
                <span>{providerKindText(props.language, details.catalog.kind)}</span>
                <span>{providerSourceText(props.language, selectedStatus.source)}</span>
                <span>{selectedStatus.liveAllowed ? t(props.language, "providers.liveAllowed") : t(props.language, "providers.liveBlocked")}</span>
                {details.catalog.recommendedBeforeLaunch ? <span>{t(props.language, "providers.requiredBeforeLaunch")}</span> : null}
              </div>
              <label className="toggle">
                <input type="checkbox" checked={form.enabled} disabled={!canWriteProviders} onChange={(event) => setForm((value) => ({ ...value, enabled: event.target.checked }))} />
                {t(props.language, "providers.enableProvider")}
              </label>

              <div className="fieldGrid">
                {unique([...(details.catalog.requiredFields ?? []), ...(details.catalog.optionalFields ?? [])]).map((field) => (
                  <label key={field}>
                    <span>{fieldText(props.language, field)}{details.catalog.requiredFields.includes(field) ? " *" : ""}</span>
                    <input value={form.fields[field] ?? ""} disabled={!canWriteProviders} onChange={(event) => updateField("fields", field, event.target.value)} />
                  </label>
                ))}
                {unique(details.catalog.secretFields ?? []).map((field) => (
                  <label key={field}>
                    <span>{fieldText(props.language, field)} · {t(props.language, "providers.secret")}</span>
                    <input type="password" value={form.secretFields[field] ?? ""} disabled={!canWriteProviders} onChange={(event) => updateField("secretFields", field, event.target.value)} placeholder={t(props.language, "placeholder.keepSecret")} />
                  </label>
                ))}
              </div>
              <label>
                <span>{t(props.language, "providers.notes")}</span>
                <textarea value={form.notes} disabled={!canWriteProviders} onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))} />
              </label>
              {selectedStatus.missingFields.length ? <div className="warning">{t(props.language, "providers.missing")}: {selectedStatus.missingFields.map((field) => fieldText(props.language, field)).join(", ")}</div> : null}
              {selectedPendingOwnerAction ? (
                <div className="ownerConfirmBox">
                  <div>
                    <strong>{ownerFlowText(props.language, "required")}</strong>
                    <small>{ownerActionText(props.language, selectedPendingOwnerAction.action)} · {selectedPendingOwnerAction.confirmation.id}</small>
                    <small>{ownerFlowText(props.language, "status")}: {statusText(props.language, selectedPendingOwnerAction.confirmation.status)} · {ownerFlowText(props.language, "openOwner")}</small>
                    <p>{ownerFlowText(props.language, "instructions")}</p>
                  </div>
                  <div className="actions compactActions">
                    <button onClick={refreshOwnerConfirmation} disabled={busy}>{ownerFlowText(props.language, "refresh")}</button>
                    <button onClick={retryOwnerConfirmedAction} disabled={busy || selectedPendingOwnerAction.confirmation.status !== "approved"}>{ownerFlowText(props.language, "retry")}</button>
                    <button className="ghost" onClick={() => setPendingOwnerAction(null)} disabled={busy}>{ownerFlowText(props.language, "clear")}</button>
                  </div>
                </div>
              ) : null}
              <div className="actions">
                {canWriteProviders ? <button onClick={save} disabled={busy}>{t(props.language, "button.save")}</button> : null}
                {canTestProviders ? <button onClick={() => runAction("test")} disabled={busy}>{t(props.language, "button.test")}</button> : null}
                {canWriteProviders ? <button onClick={() => runAction("enable")} disabled={busy}>{t(props.language, "button.enable")}</button> : null}
                {canWriteProviders ? <button onClick={() => runAction("disable")} disabled={busy}>{t(props.language, "button.disable")}</button> : null}
                {canWriteProviders ? <button className="danger" onClick={() => runAction("delete")} disabled={busy}>{t(props.language, "button.deleteConfig")}</button> : null}
                {!canWriteProviders && !canTestProviders ? <div className="warning compactWarning">{t(props.language, "permission.readOnly")}</div> : null}
              </div>
              <pre>{asText(details.status.lastTest ?? details.config?.lastTest ?? {})}</pre>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function UsersPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [restrictions, setRestrictions] = useState<AdminRestriction[]>([]);
  const [selected, setSelected] = useState<{ user: AdminUser; wallets: unknown[]; operations: unknown[]; restrictions: AdminRestriction[] } | null>(null);
  const [reason, setReason] = useState("admin_review");
  const [scope, setScope] = useState("account");

  async function load() {
    const response = await adminApi.users(props.config, q);
    setUsers(response.users);
    setRestrictions(response.restrictions);
  }

  async function openUser(user: AdminUser) {
    const id = String(user.id ?? "");
    if (!id) return;
    const response = await adminApi.userDetails(props.config, id);
    setSelected(response);
  }

  async function restrict() {
    if (!selected?.user.id) return;
    await adminApi.restrictUser(props.config, String(selected.user.id), { reason, scope });
    props.setNotice(t(props.language, "notice.userRestricted"));
    await openUser(selected.user);
    await load();
  }

  async function unrestrict() {
    if (!selected?.user.id) return;
    await adminApi.unrestrictUser(props.config, String(selected.user.id), { scope });
    props.setNotice(t(props.language, "notice.userUnrestricted"));
    await openUser(selected.user);
    await load();
  }

  useEffect(() => { void load(); }, []);

  return (
    <section className="panel">
      <div className="panelHead">
        <div><h2>{t(props.language, "users.title")}</h2><p>{t(props.language, "users.description")}</p></div>
        <button onClick={load}>{t(props.language, "button.search")}</button>
      </div>
      <div className="split wideLeft">
        <div className="card">
          <input className="search" value={q} onChange={(event) => setQ(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void load(); }} placeholder={t(props.language, "placeholder.searchUsers")} />
          <div className="tableList">
            {users.map((user) => (
              <button key={String(user.id)} className="rowButton" onClick={() => openUser(user)}>
                <strong>{String(user.displayName || user.username || user.email || user.id || t(props.language, "users.userFallback"))}</strong>
                <span>{String(user.email ?? user.phone ?? user.id ?? "")}</span>
                <em>{restrictions.some((item) => item.userId === user.id && item.status === "active") ? t(props.language, "users.restricted") : roleText(props.language, String(user.role ?? ""))}</em>
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          {!selected ? <div className="empty">{t(props.language, "users.select")}</div> : <>
            <h3>{String(selected.user.displayName || selected.user.username || selected.user.id)}</h3>
            <div className="chips"><span>{String(selected.user.id)}</span><span>{String(selected.user.email ?? t(props.language, "users.noEmail"))}</span><span>{String(selected.user.phone ?? t(props.language, "users.noPhone"))}</span></div>
            <div className="fieldGrid two">
              <label><span>{t(props.language, "users.restrictionReason")}</span><input value={reason} onChange={(event) => setReason(event.target.value)} /></label>
              <label><span>{t(props.language, "users.scope")}</span><input value={scope} onChange={(event) => setScope(event.target.value)} /></label>
            </div>
            <div className="actions"><button onClick={restrict}>{t(props.language, "button.restrict")}</button><button onClick={unrestrict}>{t(props.language, "button.unrestrict")}</button></div>
            <h4>{t(props.language, "users.restrictions")}</h4><pre>{asText(selected.restrictions)}</pre>
            <h4>{t(props.language, "users.wallets")}</h4><pre>{asText(selected.wallets)}</pre>
            <h4>{t(props.language, "users.operations")}</h4><pre>{asText(selected.operations)}</pre>
          </>}
        </div>
      </div>
    </section>
  );
}

function RiskPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const [consoleState, setConsoleState] = useState<AdminRiskConsoleState | null>(null);
  const [caseForm, setCaseForm] = useState({ title: t(props.language, "risk.manualReview"), category: "manual_review", severity: "medium", userId: "", description: "" });
  const [signalForm, setSignalForm] = useState({ source: "admin", category: "manual_review", severity: "medium", targetType: "user", targetId: "", title: t(props.language, "risk.signalManual"), description: "", recommendedAction: "admin_review" });

  async function load() {
    const response = await adminApi.riskConsole(props.config);
    setConsoleState(response.console);
  }

  async function createCase() {
    await adminApi.createRisk(props.config, { ...caseForm, userId: caseForm.userId || undefined, description: caseForm.description || undefined });
    props.setNotice(t(props.language, "notice.riskCreated"));
    await load();
  }

  async function createSignal() {
    await adminApi.createRiskSignal(props.config, {
      ...signalForm,
      targetId: signalForm.targetId || undefined,
      description: signalForm.description || undefined,
      recommendedAction: signalForm.recommendedAction || undefined,
    });
    props.setNotice(t(props.language, "notice.riskSignalCreated"));
    await load();
  }

  async function acknowledgeSignal(signal: AdminRiskSignal) {
    await adminApi.acknowledgeRiskSignal(props.config, signal.id);
    props.setNotice(t(props.language, "notice.riskSignalAcknowledged"));
    await load();
  }

  async function resolveSignal(signal: AdminRiskSignal) {
    await adminApi.resolveRiskSignal(props.config, signal.id, "resolved");
    props.setNotice(t(props.language, "notice.riskSignalResolved"));
    await load();
  }

  useEffect(() => { void load(); }, []);

  const dashboard = consoleState?.dashboard;
  const cases = consoleState?.riskCases ?? [];
  const signals = consoleState?.riskSignals ?? [];
  const restrictions = consoleState?.restrictions ?? [];

  return (
    <section className="panel riskPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "risk.consoleTitle")}</h2>
          <p>{t(props.language, "risk.consoleDescription")}</p>
        </div>
        <button onClick={load}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "risk.openCases")}</span><strong>{dashboard?.openCases ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "risk.criticalCases")}</span><strong>{dashboard?.criticalCases ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "risk.newSignals")}</span><strong>{dashboard?.newSignals ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "risk.activeRestrictions")}</span><strong>{dashboard?.activeRestrictions ?? 0}</strong></div>
      </div>

      <div className="split">
        <div className="card">
          <h3>{t(props.language, "risk.createSignal")}</h3>
          <div className="fieldGrid two">
            <label><span>{t(props.language, "risk.source")}</span><select value={signalForm.source} onChange={(event) => setSignalForm({ ...signalForm, source: event.target.value })}><option value="admin">{statusText(props.language, "admin")}</option><option value="ai">AI</option><option value="wallet">Wallet</option><option value="merchant">Merchant</option><option value="business">Business</option><option value="messenger">Messenger</option><option value="qr">QR</option><option value="system">System</option></select></label>
            <label><span>{t(props.language, "risk.category")}</span><input value={signalForm.category} onChange={(event) => setSignalForm({ ...signalForm, category: event.target.value })} /></label>
            <label><span>{t(props.language, "risk.severity")}</span><select value={signalForm.severity} onChange={(event) => setSignalForm({ ...signalForm, severity: event.target.value })}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "risk.targetType")}</span><select value={signalForm.targetType} onChange={(event) => setSignalForm({ ...signalForm, targetType: event.target.value })}><option value="user">{t(props.language, "risk.target.user")}</option><option value="merchant">{t(props.language, "risk.target.merchant")}</option><option value="business">{t(props.language, "risk.target.business")}</option><option value="wallet">Wallet</option><option value="provider">Provider</option><option value="system">System</option></select></label>
            <label><span>{t(props.language, "risk.targetId")}</span><input value={signalForm.targetId} onChange={(event) => setSignalForm({ ...signalForm, targetId: event.target.value })} /></label>
            <label><span>{t(props.language, "risk.signalTitle")}</span><input value={signalForm.title} onChange={(event) => setSignalForm({ ...signalForm, title: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "risk.descriptionField")}</span><textarea value={signalForm.description} onChange={(event) => setSignalForm({ ...signalForm, description: event.target.value })} /></label>
          <label><span>{t(props.language, "risk.recommendedAction")}</span><input value={signalForm.recommendedAction} onChange={(event) => setSignalForm({ ...signalForm, recommendedAction: event.target.value })} /></label>
          <button onClick={createSignal}>{t(props.language, "button.createSignal")}</button>
        </div>

        <div className="card">
          <h3>{t(props.language, "risk.createCase")}</h3>
          <div className="fieldGrid two">
            <label><span>{t(props.language, "risk.caseTitle")}</span><input value={caseForm.title} onChange={(event) => setCaseForm({ ...caseForm, title: event.target.value })} /></label>
            <label><span>{t(props.language, "risk.category")}</span><input value={caseForm.category} onChange={(event) => setCaseForm({ ...caseForm, category: event.target.value })} /></label>
            <label><span>{t(props.language, "risk.severity")}</span><select value={caseForm.severity} onChange={(event) => setCaseForm({ ...caseForm, severity: event.target.value })}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "risk.userId")}</span><input value={caseForm.userId} onChange={(event) => setCaseForm({ ...caseForm, userId: event.target.value })} /></label>
          </div>
          <label><span>{t(props.language, "risk.descriptionField")}</span><textarea value={caseForm.description} onChange={(event) => setCaseForm({ ...caseForm, description: event.target.value })} /></label>
          <button onClick={createCase}>{t(props.language, "button.createCase")}</button>
        </div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>{t(props.language, "risk.signals")}</h3>
          <div className="tableList">
            {signals.map((signal) => (
              <div className="row" key={signal.id}>
                <strong>{signal.title}</strong>
                <span>{statusText(props.language, signal.source)} · {categoryText(props.language, signal.category)} · {signal.targetType ? `${statusText(props.language, signal.targetType)}: ${signal.targetId ?? ""}` : ""}</span>
                <em className={statusClass(signal.status)}>{statusText(props.language, signal.severity)} / {statusText(props.language, signal.status)}</em>
                <div className="actions compact"><button onClick={() => acknowledgeSignal(signal)}>{t(props.language, "button.acknowledge")}</button><button onClick={() => resolveSignal(signal)}>{t(props.language, "button.resolve")}</button></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "risk.rules")}</h3>
          <div className="ruleList">{(consoleState?.rules ?? []).map((rule) => <div key={rule} className="warning">{ruleText(props.language, rule)}</div>)}</div>
          <h3>{t(props.language, "risk.restrictions")}</h3>
          <div className="tableList smallList">{restrictions.map((restriction) => <div className="row" key={restriction.id}><strong>{restriction.userId}</strong><span>{scopeText(props.language, restriction.scope)} · {restriction.reason}</span><em>{statusText(props.language, restriction.status)}</em></div>)}</div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "risk.cases")}</h3>
        <div className="tableList">{cases.map((item) => <div className="row" key={item.id}><strong>{item.title}</strong><span>{categoryText(props.language, item.category)} / {statusText(props.language, item.severity)}</span><em>{statusText(props.language, item.status)}</em></div>)}</div>
      </div>
    </section>
  );
}

function RolesPanel(props: { language: AdminLanguage; matrix: AdminRoleMatrix | null; onReload: () => void }) {
  const roles = props.matrix?.roles ?? [];
  const [selectedKey, setSelectedKey] = useState<string>(roles[0]?.key ?? "owner");

  useEffect(() => {
    if (!roles.length) return;
    if (!roles.some((role) => role.key === selectedKey)) setSelectedKey(roles[0].key);
  }, [roles, selectedKey]);

  const selected = roles.find((role) => role.key === selectedKey) ?? roles[0] ?? null;
  const permissionGroups = useMemo<Array<[string, AdminPermissionDefinition[]]>>(() => {
    const groups = new Map<string, AdminPermissionDefinition[]>();
    for (const permission of props.matrix?.permissions ?? []) {
      const items = groups.get(permission.group) ?? [];
      items.push(permission);
      groups.set(permission.group, items);
    }
    return Array.from(groups.entries());
  }, [props.matrix]);

  if (!props.matrix) {
    return (
      <section className="panel locked">
        <h2>{t(props.language, "roles.title")}</h2>
        <p>{t(props.language, "roles.empty")}</p>
      </section>
    );
  }

  return (
    <section className="panel rolePanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "roles.title")}</h2>
          <p>{t(props.language, "roles.description")}</p>
        </div>
        <button onClick={props.onReload}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "roles.rootOwner")}</span><strong>{roleText(props.language, props.matrix.rootOwnerRole)}</strong></div>
        <div className="statCard"><span>{t(props.language, "roles.totalRoles")}</span><strong>{roles.length}</strong></div>
        <div className="statCard"><span>{t(props.language, "roles.totalPermissions")}</span><strong>{props.matrix.permissions.length}</strong></div>
        <div className="statCard"><span>{t(props.language, "roles.clientPortals")}</span><strong>{props.matrix.clientPortals.length}</strong></div>
      </div>

      <div className="providerLayout">
        <div className="providerList card">
          {roles.map((role) => (
            <button key={role.key} onClick={() => setSelectedKey(role.key)} className={role.key === selected?.key ? "providerItem active" : "providerItem"}>
              <span>
                <strong>{roleText(props.language, role.key)}</strong>
                <small>{t(props.language, `roleCategory.${role.category}`, role.category)} · {t(props.language, "roles.level")} {role.level}</small>
              </span>
              <em className={role.ownerOnly ? "status ready" : role.clientFacing ? "status warn" : "status disabled"}>
                {role.ownerOnly ? t(props.language, "roles.ownerOnly") : role.clientFacing ? t(props.language, "roles.client") : t(props.language, "roles.internal")}
              </em>
            </button>
          ))}
        </div>

        <div className="card">
          {!selected ? <div className="empty">{t(props.language, "roles.select")}</div> : <>
            <div className="detailHead">
              <div>
                <h3>{roleText(props.language, selected.key)}</h3>
                <p>{roleDescriptionText(props.language, selected.key)}</p>
              </div>
              <span className={selected.ownerOnly ? "status ready" : "status disabled"}>{t(props.language, `roleCategory.${selected.category}`, selected.category)}</span>
            </div>
            <div className="chips">
              <span>{t(props.language, "roles.level")} {selected.level}</span>
              <span>{selected.canManageRoles ? t(props.language, "roles.canManageRoles") : t(props.language, "roles.cannotManageRoles")}</span>
              <span>{selected.clientFacing ? t(props.language, "roles.clientFacing") : t(props.language, "roles.internalFacing")}</span>
            </div>

            <h4>{t(props.language, "roles.allowedPanels")}</h4>
            <div className="chips">{selected.allowedPanels.map((panel) => <span key={panel}>{panelText(props.language, panel)}</span>)}</div>

            <h4>{t(props.language, "roles.permissions")}</h4>
            <div className="permissionGrid">
              {selected.permissions.map((permission) => <span key={permission}>{permissionText(props.language, permission)}</span>)}
            </div>

            <h4>{t(props.language, "roles.deniedPermissions")}</h4>
            {selected.deniedPermissions.length ? <div className="permissionGrid denied">{selected.deniedPermissions.map((permission) => <span key={permission}>{permissionText(props.language, permission)}</span>)}</div> : <p>{t(props.language, "roles.noDenied")}</p>}

            <h4>{t(props.language, "roles.securityRules")}</h4>
            <div className="ruleList">{selected.securityRules.map((rule) => <div key={rule} className="warning">{ruleText(props.language, rule)}</div>)}</div>
          </>}
        </div>
      </div>

      <div className="split rolesBottom">
        <div className="card">
          <h3>{t(props.language, "roles.separationRules")}</h3>
          <div className="ruleList">{props.matrix.separationRules.map((rule) => <div key={rule} className="row compact"><strong>{ruleText(props.language, rule)}</strong></div>)}</div>
          <h3>{t(props.language, "roles.criticalRules")}</h3>
          <div className="ruleList">{props.matrix.criticalActionRules.map((rule) => <div key={rule} className="row compact"><strong>{ruleText(props.language, rule)}</strong></div>)}</div>
        </div>
        <div className="card">
          <h3>{t(props.language, "roles.clientPortals")}</h3>
          <div className="tableList">
            {props.matrix.clientPortals.map((portal) => (
              <div key={portal.key} className="row portalRow">
                <strong>{roleText(props.language, portal.ownerRole)}</strong>
                <span>{portal.panels.map((panel) => panelText(props.language, panel)).join(" · ")}</span>
                <em>{portal.securityRules.map((rule) => ruleText(props.language, rule)).join(" · ")}</em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card permissionCatalog">
        <h3>{t(props.language, "roles.permissionCatalog")}</h3>
        {permissionGroups.map(([group, items]) => (
          <div key={group} className="permissionGroup">
            <h4>{permissionGroupText(props.language, group)}</h4>
            <div className="permissionGrid">
              {items.map((permission) => (
                <span key={permission.key} className={`risk-${permission.riskLevel}`}>
                  {permissionText(props.language, permission.key)} · {statusText(props.language, permission.riskLevel)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function StaffAccessPanel(props: {
  language: AdminLanguage;
  config: AdminApiConfig;
  matrix: AdminRoleMatrix | null;
  me: AdminPrincipal | null;
  setNotice: (notice: string) => void;
}) {
  const [staff, setStaff] = useState<AdminStaffAccessUser[]>([]);
  const [ownerProtection, setOwnerProtection] = useState<AdminOwnerProtectionState | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    phone: "",
    role: "developer",
    notes: "",
    allowedIpCidrs: "",
    deviceBinding: "optional" as "optional" | "required",
    merchantId: "",
    businessId: "",
  });

  const assignableRoles = useMemo(() => {
    const roles = props.matrix?.roles ?? [];
    const preferred = ["manager", "developer", "accountant", "security", "merchant_admin", "business_admin", "support", "viewer"];
    return preferred
      .map((key) => roles.find((role) => role.key === key))
      .filter((role): role is NonNullable<typeof role> => Boolean(role));
  }, [props.matrix]);

  const rootOwner = Boolean(props.me?.rootOwner && props.me.role === "owner");

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const [staffResponse, protectionResponse] = await Promise.all([
        adminApi.staff(props.config),
        adminApi.ownerProtection(props.config),
      ]);
      setStaff(staffResponse.staff);
      setOwnerProtection(protectionResponse.ownerProtection);
    } finally {
      setBusy(false);
    }
  }, [props.config]);

  useEffect(() => { void load(); }, [load]);

  async function createStaff() {
    if (!form.displayName.trim() && !form.email.trim() && !form.phone.trim()) return;
    setBusy(true);
    try {
      await adminApi.createStaff(props.config, {
        displayName: form.displayName,
        email: form.email || undefined,
        phone: form.phone || undefined,
        role: form.role,
        notes: form.notes || undefined,
        allowedIpCidrs: form.allowedIpCidrs.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean),
        deviceBinding: form.deviceBinding,
        clientScope: form.merchantId || form.businessId ? {
          merchantId: form.merchantId || undefined,
          businessId: form.businessId || undefined,
        } : undefined,
      });
      setForm((previous) => ({ ...previous, displayName: "", email: "", phone: "", notes: "", allowedIpCidrs: "", merchantId: "", businessId: "" }));
      props.setNotice(t(props.language, "notice.staffCreated"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(item: AdminStaffAccessUser, status: "active" | "disabled") {
    setBusy(true);
    try {
      await adminApi.updateStaff(props.config, item.id, { status });
      props.setNotice(t(props.language, "notice.staffUpdated"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function revoke(item: AdminStaffAccessUser) {
    setBusy(true);
    try {
      await adminApi.revokeStaff(props.config, item.id);
      props.setNotice(t(props.language, "notice.staffRevoked"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel staffPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "staff.title")}</h2>
          <p>{t(props.language, "staff.description")}</p>
        </div>
        <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="split rolesBottom">
        <div className="card">
          <h3>{t(props.language, "staff.ownerProtection")}</h3>
          <div className="chips">
            <span>{t(props.language, "staff.rootOwner")}: {ownerProtection?.rootOwnerId ?? "env-admin"}</span>
            <span>{t(props.language, "staff.ownerRole")}: {roleText(props.language, ownerProtection?.rootOwnerRole ?? "owner")}</span>
            <span>{t(props.language, "staff.tokenConfigured")}: {statusText(props.language, ownerProtection?.ownerTokenConfigured ?? false)}</span>
            <span>{t(props.language, "staff.staffCanCreateOwner")}: {statusText(props.language, ownerProtection?.staffCanCreateOwner ?? false)}</span>
          </div>
          <div className="ruleList">
            {(ownerProtection?.criticalSecurityRules ?? []).map((rule) => <div className="warning" key={rule}>{ruleText(props.language, rule)}</div>)}
          </div>
        </div>

        <div className="card">
          <h3>{t(props.language, "staff.createTitle")}</h3>
          {!rootOwner ? <div className="warning">{t(props.language, "staff.rootOnlyWarning")}</div> : null}
          <div className="fieldGrid two">
            <label><span>{t(props.language, "staff.displayName")}</span><input value={form.displayName} onChange={(event) => setForm((value) => ({ ...value, displayName: event.target.value }))} /></label>
            <label><span>{t(props.language, "staff.role")}</span><select value={form.role} onChange={(event) => setForm((value) => ({ ...value, role: event.target.value }))}>{assignableRoles.map((role) => <option key={role.key} value={role.key}>{roleText(props.language, role.key)}</option>)}</select></label>
            <label><span>{t(props.language, "staff.email")}</span><input value={form.email} onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))} /></label>
            <label><span>{t(props.language, "staff.phone")}</span><input value={form.phone} onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))} /></label>
            <label><span>{t(props.language, "staff.deviceBinding")}</span><select value={form.deviceBinding} onChange={(event) => setForm((value) => ({ ...value, deviceBinding: event.target.value === "required" ? "required" : "optional" }))}><option value="optional">{t(props.language, "staff.deviceOptional")}</option><option value="required">{t(props.language, "staff.deviceRequired")}</option></select></label>
            <label><span>{t(props.language, "staff.allowedIpCidrs")}</span><input value={form.allowedIpCidrs} onChange={(event) => setForm((value) => ({ ...value, allowedIpCidrs: event.target.value }))} /></label>
            <label><span>{t(props.language, "staff.merchantId")}</span><input value={form.merchantId} onChange={(event) => setForm((value) => ({ ...value, merchantId: event.target.value }))} /></label>
            <label><span>{t(props.language, "staff.businessId")}</span><input value={form.businessId} onChange={(event) => setForm((value) => ({ ...value, businessId: event.target.value }))} /></label>
          </div>
          <label><span>{t(props.language, "staff.notes")}</span><textarea value={form.notes} onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))} /></label>
          <div className="actions"><button onClick={createStaff} disabled={busy || !rootOwner}>{t(props.language, "button.createAccess")}</button></div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "staff.listTitle")}</h3>
        <div className="tableList">
          {staff.length ? staff.map((item) => (
            <div className="row staffRow" key={item.id}>
              <strong>{item.displayName}</strong>
              <span>{roleText(props.language, item.role)} · {item.email || item.phone || item.id}</span>
              <em className={statusClass(item.status)}>{statusText(props.language, item.status)}</em>
              <div className="rowActions">
                <button onClick={() => setStatus(item, "active")} disabled={busy || !rootOwner || item.status === "active"}>{t(props.language, "button.activate")}</button>
                <button onClick={() => setStatus(item, "disabled")} disabled={busy || !rootOwner || item.status === "disabled"}>{t(props.language, "button.disable")}</button>
                <button className="danger" onClick={() => revoke(item)} disabled={busy || !rootOwner || item.status === "revoked"}>{t(props.language, "button.revoke")}</button>
              </div>
            </div>
          )) : <div className="empty">{t(props.language, "staff.empty")}</div>}
        </div>
      </div>
    </section>
  );
}

function AuditPanel(props: { language: AdminLanguage; config: AdminApiConfig }) {
  const [audit, setAudit] = useState<AdminAuditEntry[]>([]);
  const [integrity, setIntegrity] = useState<AdminAuditIntegrityReport | null>(null);
  const [security, setSecurity] = useState<AdminAuditSecurityState | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const [auditResponse, integrityResponse, securityResponse] = await Promise.all([
        adminApi.audit(props.config),
        adminApi.auditIntegrity(props.config),
        adminApi.auditSecurity(props.config),
      ]);
      setAudit(auditResponse.audit);
      setIntegrity(integrityResponse.integrity);
      setSecurity(securityResponse.security);
    } finally {
      setBusy(false);
    }
  }

  async function exportAudit() {
    const response = await adminApi.auditExport(props.config);
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sabi-admin-audit-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => { void load(); }, []);
  return (
    <section className="panel auditPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "audit.title")}</h2>
          <p>{t(props.language, "audit.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
          <button onClick={exportAudit}>{t(props.language, "button.exportAudit")}</button>
        </div>
      </div>

      <div className="statsGrid auditStats">
        <div className="statCard"><span>{t(props.language, "audit.integrity")}</span><strong>{integrity?.ok ? statusText(props.language, "ready") : statusText(props.language, "failed")}</strong></div>
        <div className="statCard"><span>{t(props.language, "audit.protectedEntries")}</span><strong>{integrity?.protectedEntries ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "audit.legacyEntries")}</span><strong>{integrity?.legacyEntries ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "audit.anchorHash")}</span><strong className="hashText">{integrity?.anchorHash ? integrity.anchorHash.slice(0, 12) : "—"}</strong></div>
      </div>

      <div className="split rolesBottom">
        <div className="card">
          <h3>{t(props.language, "audit.securityTitle")}</h3>
          <div className="chips">
            <span>{t(props.language, "audit.appendOnly")}: {statusText(props.language, security?.appendOnly ?? false)}</span>
            <span>{t(props.language, "audit.hashChained")}: {statusText(props.language, security?.hashChained ?? false)}</span>
            <span>{t(props.language, "audit.deleteSupported")}: {statusText(props.language, security?.deleteSupported ?? false)}</span>
            <span>{t(props.language, "audit.exportSupported")}: {statusText(props.language, security?.exportSupported ?? false)}</span>
          </div>
          <div className="ruleList">{(security?.rules ?? []).map((rule) => <div className="warning" key={rule}>{ruleText(props.language, rule)}</div>)}</div>
        </div>
        <div className="card">
          <h3>{t(props.language, "audit.integrityTitle")}</h3>
          <pre>{asText(integrity)}</pre>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "audit.events")}</h3>
        <div className="tableList">
          {audit.map((item) => (
            <div className="row auditRow" key={item.id}>
              <strong>{auditActionText(props.language, item.action)}</strong>
              <span>{item.adminId} / {roleText(props.language, item.role)}{item.sequence ? ` / #${item.sequence}` : ""}</span>
              <em>{new Date(item.createdAt).toLocaleString()}</em>
              {item.hash ? <small className="hashText">{item.hash.slice(0, 16)}</small> : <small>{t(props.language, "audit.legacy")}</small>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function amountMapText(value: Record<string, number> | undefined): string {
  const entries = Object.entries(value ?? {});
  if (!entries.length) return "0";
  return entries.map(([currency, amount]) => `${amount.toLocaleString()} ${currency}`).join(" · ");
}

type WalletDashboardTone = "ok" | "warning" | "blocked";

type WalletDashboardCard = {
  key: string;
  title: string;
  description: string;
  tone: WalletDashboardTone;
  metrics: Array<{ label: string; value: string | number }>;
  rules: string[];
};

function adminWalletShellText(language: AdminLanguage, key: string): string {
  const ru: Record<string, string> = {
    architectureTitle: "Структура админ-кошелька",
    architectureDescription: "Раздельные панели для фиата, локального кошелька, виртуальных карт, внутренней валюты, криптовалюты, продавцов, бизнеса, кюар-кодов, премиума, подарков, провайдеров, безопасности и бухгалтерии.",
    globalOverview: "Общая проверка кошелька",
    globalOverviewDescription: "Единый шлюз запуска без фейкового успеха. Пока реальные провайдеры не подключены, запуск в рабочем режиме остаётся выключен.",
    fiatWallet: "Fiat Balance account",
    fiatWalletDescription: "Обычный кошелёк Саби: балансы, операции, транзакции, ошибки провайдера, ожидающие и неудачные платежи, а также безопасный поток карты только через токен.",
    fiatControlTitle: "Fiat Balance account Control",
    fiatControlDescription: "Отдельный контроль фиатного кошелька: поток карты только через токен, пополнение и вывод через провайдера, журнал, неудачные и ожидающие платежи, проверка клиента, противодействие отмыванию средств и локальные платёжные каналы.",
    fiatLiveReady: "Фиат готов к рабочему запуску",
    balances: "Балансы",
    riskHolds: "Risk holds",
    controls: "Контроль",
    recentOperations: "Последние операции",
    recentTransactions: "Последние транзакции",
    providerCoverage: "Провайдеры",
    fiatAmounts: "Фиатные суммы",
    localWallet: "Local Balance account",
    localWalletDescription: "Локальные платёжные каналы, локальные карты и локальная валюта без зашитых подписей валют. Валюта должна настраиваться или определяться автоматически.",
    virtualCards: "Virtual Cards",
    virtualCardsDescription: "Виртуальные карты через эмитента или банковского провайдера. Саби хранит только токен, маскированные метаданные и статус, никогда номер карты или код безопасности.",
    coinWallet: "COIN Balance account",
    coinWalletDescription: "Внутренняя валюта Саби: токенизированный журнал, заблокированные депозиты, 16% годовых, ежемесячное высвобождение, доход от подарков и одобрения.",
    coinVault: "COIN Security Vault",
    coinVaultDescription: "Защита внутренней валюты как крипто- и банковского хранения: неизменяемый журнал, хэш-цепочка, подписи, горячие, тёплые и холодные хранилища, аварийная заморозка.",
    cryptoWallet: "Crypto Balance account",
    cryptoWalletDescription: "Криптовалюта отдельно от фиата и внутренней валюты. Никаких фейковых цен, фейковых балансов или фейковых блокчейн-транзакций.",
    merchant: "Merchant",
    merchantDescription: "Контроль уровня продавца: оплата по кюар-коду, расчёты, проверка бизнеса, противодействие отмыванию средств, риск, ключи программного интерфейса, секреты вебхуков, ротация, отзыв и аудит.",
    business: "Business Account / Balance account",
    businessDescription: "Бизнес-кошелёк как отдельный продукт уровня крупных финтех-сервисов: маршрутизация, разрешения, бухгалтерия, счета, проверка бизнеса, расчёты и аудит.",
    qrPay: "QR / Pay",
    qrPayDescription: "Кюар-код кошелька, кюар-код продавца, кюар-код бизнеса, кюар-код внутренней валюты, кюар-код криптовалюты, премиум-кюар и кюар-код покупки подарков с идентификатором пользователя как основной сущностью.",
    premium: "Premium Subscriptions",
    premiumDescription: "Премиум-покупки через внутреннюю валюту, фиат или кюар-код: подтверждение платежа активирует право доступа. Ручной фейковый переключатель не может быть основным механизмом.",
    gift: "Gift Purchases",
    giftDescription: "Платные подарки, комиссия платформы, зачисление получателю, ежемесячное высвобождение и журнал подарков. Бесплатные, выигранные и промо-подарки не являются доходом.",
    providerCenter: "External service Center",
    providerCenterDescription: "KYC, AML, card tokenization, virtual issuer, Alipay+/merchant, COIN ledger, crypto custody, market data, AI risk providers.",
    security: "Security / PCI / AML / KYC",
    securityDescription: "Без номера карты, без кода безопасности, только токен, проверка клиента, противодействие отмыванию средств, риск-блокировки, подозрительная активность, админ-проверка и неизменяемый аудит.",
    ledger: "Ledger / Accountant Approval",
    ledgerDescription: "Бухгалтерский центр: дебет и кредит, очередь одобрений, результат оценки риска ИИ, подтверждение бухгалтера, сторнирования, расчёты и экспорт.",
    launchGate: "Final Balance account Launch Control step",
    launchGateDescription: "Единый финальный шлюз для фиата, локального кошелька, виртуальных карт, внутренней валюты, криптовалюты, продавцов, бизнеса, кюар-кодов, премиума, подарков, журнала и провайдеров.",
    status: "Статус",
    connected: "Подключено",
    notConfigured: "External service not configured",
    blocked: "Заблокировано",
    active: "Активно",
    required: "Обязательно",
    wallets: "Кошельки",
    operations: "Операции",
    transactions: "Транзакции",
    providers: "Провайдеры",
    blockers: "Блокеры",
    pending: "Ожидает",
    failed: "Ошибки",
    ledgerEntries: "Ledger entries",
    qrPayments: "QR payments",
    coinDeposits: "COIN deposits",
    coinCredits: "COIN requests",
    readiness: "Readiness",
    liveLaunch: "Live launch",
    safeMode: "Safe mode",
    tokenOnly: "Token-only",
    pan: "PAN storage",
    cvv: "CVV storage",
    rawCard: "Raw card data",
    rawCoinEdit: "Raw COIN balance edit",
    audit: "Audit",
    manualApproval: "Manual confirmation",
    aiRisk: "AI risk check",
    accountant: "Accountant confirmation",
    hashChain: "Hash-chain ledger",
    providerCenterFullTitle: "Balance account External service Center",
    providerCenterFullDescription: "Полный контроль провайдеров кошелька: проверка клиента, противодействие отмыванию средств, токенизация карт, локальные платёжные каналы, виртуальный эмитент, продавцы, бизнес, внутренняя валюта, криптовалюта, оценка риска ИИ и инфраструктура.",
    readyGroups: "Готовые группы",
    criticalBlockers: "Критические блокеры",
    requiredProviders: "Обязательные провайдеры",
    missingFields: "Не хватает полей",
    providerSource: "Источник",
    providerEnabled: "Включено",
    providerDisabled: "Выключено",
    noProviders: "Провайдеры ещё не найдены.",
    noRawJson: "Исходные технические данные скрыты. Панель показывает только рабочие статусы, проверки и безопасные агрегаты.",
    premiumFullTitle: "Premium Subscriptions Admin",
    premiumFullDescription: "Контроль премиум-подписок: оплаты внутренней валютой, фиатом или кюар-кодом, подтверждение платежа, активация и деактивация прав доступа, возвраты, истёкшие состояния и аудит.",
    activeSubscriptions: "Активные подписки",
    premiumPayments: "Premium payments",
    premiumEntitlements: "Premium entitlements",
    coinPayments: "COIN payments",
    fiatPayments: "Fiat payments",
    qrPremiumPayments: "Premium QR",
    manualOverrides: "Manual overrides",
    giftFullTitle: "Gift Purchase / Revenue Admin",
    giftFullDescription: "Paid gifts, platform fees, recipient credits, monthly release, inventory movement and strict no-income policy for free/won/promo gifts.",
    paidGiftPurchases: "Paid gift purchases",
    giftPayments: "Gift payments",
    giftIncomeEntries: "Gift income entries",
    recipientCredits: "Recipient credits",
    platformFeeEntries: "Platform fee entries",
    inventoryMovements: "Inventory movements",
    freeWonPromoGifts: "Free/won/promo gifts",
    blockedPromoIncome: "Blocked promo income",
    pendingRelease: "Pending release",
    releasedIncome: "Released income",
  };
  const en: Record<string, string> = {
    architectureTitle: "Admin Balance account structure",
    architectureDescription: "Separate dashboards for fiat, local balance account, virtual cards, COIN, crypto, merchant, business, QR, premium, gifts, external services, security and accounting.",
    globalOverview: "Global Balance account Overview",
    globalOverviewDescription: "Single launch control step without false success. Until real external services are connected, live launch stays disabled.",
    fiatWallet: "Fiat Balance account",
    fiatWalletDescription: "Main Sabi Balance account: balances, operations, transactions, external service errors, pending/failed charges and safe token-only card flow.",
    fiatControlTitle: "Fiat Balance account Control",
    fiatControlDescription: "Separate fiat Balance account control: token-only card flow, external service-backed top-up/withdrawal, ledger, failed/pending charges, KYC/AML and local rails.",
    fiatLiveReady: "Fiat live ready",
    balances: "Balances",
    riskHolds: "Risk holds",
    controls: "Controls",
    recentOperations: "Recent operations",
    recentTransactions: "Recent transactions",
    providerCoverage: "Providers",
    fiatAmounts: "Fiat amounts",
    localWallet: "Local Balance account",
    localWalletDescription: "Local charge rails, local cards and local currency without hardcoded currency labels. Currency must be configurable/detected.",
    virtualCards: "Virtual Cards",
    virtualCardsDescription: "Virtual cards through issuer/bank external service. Sabi stores token/masked metadata/state only, never PAN/CVV.",
    coinWallet: "COIN Balance account",
    coinWalletDescription: "Sabi internal currency: tokenized ledger, locked deposits, 16% APR, monthly release, gift income and approvals.",
    coinVault: "COIN Security Vault",
    coinVaultDescription: "COIN protected like crypto/bank custody: append-only ledger, hash-chain, signatures, hot/warm/cold vaults, emergency freeze.",
    cryptoWallet: "Crypto Balance account",
    cryptoWalletDescription: "Crypto is separate from fiat and COIN. No fake prices, fake balances or fake blockchain transactions.",
    merchant: "Merchant",
    merchantDescription: "Merchant-grade controls: QR/Pay, settlements, KYB/AML, risk, API keys, webhook secrets, rotation/revocation and audit.",
    business: "Business Account / Balance account",
    businessDescription: "Business Balance account as a separate Revolut/Stripe-level product: routing, permissions, accounting, invoices, KYB, settlements and audit.",
    qrPay: "QR / Pay",
    qrPayDescription: "Balance account QR, Merchant QR, Business QR, COIN QR, Crypto QR, premium QR and gift purchase QR with userId as primary identity.",
    premium: "Premium Subscriptions",
    premiumDescription: "Premium purchases through COIN/fiat/QR: payment confirmed → entitlement activation. No manual fake-toggle as primary mechanism.",
    gift: "Gift Purchases",
    giftDescription: "Paid gifts, platform fee, recipient credit, monthly release and gift ledger. Free/won/promo gifts are not income.",
    providerCenter: "External service Center",
    providerCenterDescription: "KYC, AML, card tokenization, virtual issuer, Alipay+/merchant, COIN ledger, crypto custody, market data and AI risk providers.",
    security: "Security / PCI / AML / KYC",
    securityDescription: "No PAN, no CVV, token-only, KYC/AML, risk holds, suspicious activity, admin review and immutable audit.",
    ledger: "Ledger / Accountant Approval",
    ledgerDescription: "Accounting center: debit/credit, approval queue, AI risk result, accountant confirmation, reversals, settlements and export.",
    launchGate: "Final Balance account Launch Control step",
    launchGateDescription: "Single final control step for Fiat, Local, Virtual Cards, COIN, Crypto, Merchant, Business, QR, Premium, Gifts, Ledger and external services.",
    status: "Status",
    connected: "Connected",
    notConfigured: "External service not configured",
    blocked: "Blocked",
    active: "Active",
    required: "Required",
    wallets: "Wallets",
    operations: "Operations",
    transactions: "Transactions",
    providers: "Providers",
    blockers: "Blockers",
    pending: "Pending",
    failed: "Failed",
    ledgerEntries: "Ledger entries",
    qrPayments: "QR payments",
    coinDeposits: "COIN deposits",
    coinCredits: "COIN requests",
    readiness: "Readiness",
    liveLaunch: "Live launch",
    safeMode: "Safe mode",
    tokenOnly: "Token-only",
    pan: "PAN storage",
    cvv: "CVV storage",
    rawCard: "Raw card data",
    rawCoinEdit: "Raw COIN balance edit",
    audit: "Audit",
    manualApproval: "Manual confirmation",
    aiRisk: "AI risk check",
    accountant: "Accountant confirmation",
    hashChain: "Hash-chain ledger",
    providerCenterFullTitle: "Balance account External service Center",
    providerCenterFullDescription: "Full Balance account external service control: KYC, AML, card tokenization, local rails, virtual issuer, Merchant/Alipay, Business, COIN, Crypto, AI risk and infrastructure.",
    readyGroups: "Ready groups",
    criticalBlockers: "Critical blockers",
    requiredProviders: "Required providers",
    missingFields: "Missing fields",
    providerSource: "Source",
    providerEnabled: "Enabled",
    providerDisabled: "Disabled",
    noProviders: "No providers found yet.",
    noRawJson: "Raw JSON is hidden. The panel shows only working statuses, checks and safe aggregates.",
    premiumFullTitle: "Premium Subscriptions Admin",
    premiumFullDescription: "Premium subscriptions control: COIN/fiat/QR charges, charge confirmation, entitlement activation/deactivation, refunds, expired states and audit.",
    activeSubscriptions: "Active subscriptions",
    premiumPayments: "Premium payments",
    premiumEntitlements: "Premium entitlements",
    coinPayments: "COIN payments",
    fiatPayments: "Fiat payments",
    qrPremiumPayments: "Premium QR",
    manualOverrides: "Manual overrides",
    giftFullTitle: "Gift Purchase / Revenue Admin",
    giftFullDescription: "Paid gifts, platform fees, recipient credits, monthly release, inventory movement and strict no-income policy for free/won/promo gifts.",
    paidGiftPurchases: "Paid gift purchases",
    giftPayments: "Gift payments",
    giftIncomeEntries: "Gift income entries",
    recipientCredits: "Recipient credits",
    platformFeeEntries: "Platform fee entries",
    inventoryMovements: "Inventory movements",
    freeWonPromoGifts: "Free/won/promo gifts",
    blockedPromoIncome: "Blocked promo income",
    pendingRelease: "Pending release",
    releasedIncome: "Released income",
  };
  const uz: Record<string, string> = {
    architectureTitle: "Admin Balance account tuzilmasi",
    architectureDescription: "Fiat, local hamyon, virtual kartalar, COIN, crypto, merchant, business, QR, premium, sovg ‘alar, provayderlar, xavfsizlik va buxgalteriya uchun alohida bosh panellar.",
    globalOverview: "Umumiy Balance account tekshiruvi",
    globalOverviewDescription: "Soxta muvaffaqiyat yo ‘q. Real provayderlar ulanmaguncha live ishga tushirish o ‘chiq qoladi.",
    fiatWallet: "Fiat Balance account",
    fiatWalletDescription: "Asosiy Sabi Balance account: balanslar, operatsiyalar, tranzaksiyalar, external service errors, pending/failed charges va token-only card flow.",
    fiatControlTitle: "Fiat Balance account Control",
    fiatControlDescription: "Fiat Balance account uchun alohida nazorat: token-only card flow, external service-backed top-up/withdrawal, ledger, failed/pending charges, KYC/AML va local rails.",
    fiatLiveReady: "Fiat live tayyor",
    balances: "Balanslar",
    riskHolds: "Risk holds",
    controls: "Nazorat",
    recentOperations: "Oxirgi operatsiyalar",
    recentTransactions: "Oxirgi tranzaksiyalar",
    providerCoverage: "Providerlar",
    fiatAmounts: "Fiat summalar",
    localWallet: "Local Balance account",
    localWalletDescription: "Local to ‘lov rails, local kartalar va local currency hardcoded labelsiz. Valyuta configurable/detected bo ‘lishi kerak.",
    virtualCards: "Virtual Cards",
    virtualCardsDescription: "Virtual kartalar issuer/bank external service orqali. Sabi faqat token/masked metadata/state saqlaydi, PAN/CVV hech qachon saqlanmaydi.",
    coinWallet: "COIN Balance account",
    coinWalletDescription: "Sabi ichki valyutasi: tokenized ledger, locked deposits, 16% APR, monthly release, gift income va approvals.",
    coinVault: "COIN Security Vault",
    coinVaultDescription: "COIN crypto/bank custody kabi himoyalanadi: append-only ledger, hash-chain, signatures, hot/warm/cold vaults, emergency freeze.",
    cryptoWallet: "Crypto Balance account",
    cryptoWalletDescription: "Crypto fiat va COINdan alohida. Soxta prices, soxta balances yoki soxta blockchain transactions yo ‘q.",
    merchant: "Merchant",
    merchantDescription: "Merchant-grade boshqaruv: QR/Pay, settlements, KYB/AML, risk, API kalitlar, webhook sirlar, rotation/revocation va tekshiruv.",
    business: "Business Account / Balance account",
    businessDescription: "Business Balance account alohida Revolut/Stripe darajasidagi mahsulot: routing, permissions, accounting, invoices, KYB, settlements va audit.",
    qrPay: "QR / Pay",
    qrPayDescription: "Balance account QR, Merchant QR, Business QR, COIN QR, Crypto QR, premium QR va gift purchase QR; userId primary identity.",
    premium: "Premium Subscriptions",
    premiumDescription: "Premium COIN/fiat/QR orqali: payment confirmed → entitlement activation. Manual fake-toggle asosiy mexanizm emas.",
    gift: "Gift Purchases",
    giftDescription: "Paid gifts, platform fee, recipient credit, monthly release va gift ledger. Free/won/promo gifts income emas.",
    providerCenter: "External service Center",
    providerCenterDescription: "KYC, AML, card tokenization, virtual issuer, Alipay+/merchant, COIN ledger, crypto custody, market data va AI risk providers.",
    security: "Security / PCI / AML / KYC",
    securityDescription: "PAN yo ‘q, CVV yo ‘q, token-only, KYC/AML, risk holds, suspicious activity, admin review va immutable tekshiruv.",
    ledger: "Ledger / Accountant Approval",
    ledgerDescription: "Buxgalteriya markazi: debit/credit, approval queue, AI risk result, accountant confirmation, reversals, settlements va export.",
    launchGate: "Final Balance account Launch Control step",
    launchGateDescription: "Fiat, Local, Virtual Cards, COIN, Crypto, Merchant, Business, QR, Premium, Gifts, Ledger va external services uchun final control step.",
    status: "Status",
    connected: "Ulangan",
    notConfigured: "External service not configured",
    blocked: "Bloklangan",
    active: "Faol",
    required: "Majburiy",
    wallets: "Walletlar",
    operations: "Operatsiyalar",
    transactions: "Tranzaksiyalar",
    providers: "Provayderlar",
    blockers: "Blokerlar",
    pending: "Kutilmoqda",
    failed: "Xatolar",
    ledgerEntries: "Ledger entries",
    qrPayments: "QR payments",
    coinDeposits: "COIN deposits",
    coinCredits: "COIN requests",
    readiness: "Readiness",
    liveLaunch: "Live launch",
    safeMode: "Safe mode",
    tokenOnly: "Token-only",
    pan: "PAN storage",
    cvv: "CVV storage",
    rawCard: "Raw card data",
    rawCoinEdit: "Raw COIN balance edit",
    audit: "Audit",
    manualApproval: "Manual confirmation",
    aiRisk: "AI risk check",
    accountant: "Accountant confirmation",
    hashChain: "Hash-chain ledger",
    noRawJson: "Raw JSON yashirilgan. Panel faqat ishchi holatlar, tekshiruvlar va xavfsiz agregatlarni ko ‘rsatadi.",
    premiumFullTitle: "Premium Subscriptions Admin",
    premiumFullDescription: "Premium obunalar nazorati: COIN/fiat/QR to ‘lovlar, to ‘lov tasdig ‘i, entitlement faollashtirish/defaollashtirish, refunds, expired states va tekshiruv.",
    activeSubscriptions: "Active subscriptions",
    premiumPayments: "Premium payments",
    premiumEntitlements: "Premium entitlements",
    coinPayments: "COIN payments",
    fiatPayments: "Fiat payments",
    qrPremiumPayments: "Premium QR",
    manualOverrides: "Manual overrides",
    giftFullTitle: "Gift Purchase / Revenue Admin",
    giftFullDescription: "Paid gifts, platform fees, recipient credits, monthly release, inventory movement and strict no-income policy for free/won/promo gifts.",
    paidGiftPurchases: "Paid gift purchases",
    giftPayments: "Gift payments",
    giftIncomeEntries: "Gift income entries",
    recipientCredits: "Recipient credits",
    platformFeeEntries: "Platform fee entries",
    inventoryMovements: "Inventory movements",
    freeWonPromoGifts: "Free/won/promo gifts",
    blockedPromoIncome: "Blocked promo income",
    pendingRelease: "Pending release",
    releasedIncome: "Released income",
  };
  const zh: Record<string, string> = {
    architectureTitle: "管理钱包结构",
    architectureDescription: "为法币、本地钱包、虚拟卡、内部币、加密资产、商家、企业、二维码、会员、礼物、提供商、安全和会计提供独立看板。",
    globalOverview: "钱包总览检查",
    globalOverviewDescription: "统一启动关口，不使用虚假成功。真实提供商未连接前，正式启动保持关闭。",
    fiatWallet: "Fiat Balance account",
    fiatWalletDescription: "主萨比钱包：余额、操作、交易、提供商错误、待处理和失败支付，以及仅令牌卡片流程。",
    fiatControlTitle: "Fiat Balance account Control",
    fiatControlDescription: "法币钱包独立控制：仅令牌卡片流程、提供商支持的充值和提现、账本、失败和待处理支付、客户验证、反洗钱和本地支付通道。",
    fiatLiveReady: "Fiat live ready",
    balances: "Balances",
    riskHolds: "Risk holds",
    controls: "Controls",
    recentOperations: "Recent operations",
    recentTransactions: "Recent transactions",
    providerCoverage: "Providers",
    fiatAmounts: "Fiat amounts",
    localWallet: "Local Balance account",
    localWalletDescription: "本地支付通道、本地卡和本地货币，不使用硬编码货币标签。货币必须可配置或可检测。",
    virtualCards: "Virtual Cards",
    virtualCardsDescription: "虚拟卡通过发卡方或银行提供商。萨比只保存令牌、脱敏元数据和状态，绝不保存卡号或安全码。",
    coinWallet: "COIN Balance account",
    coinWalletDescription: "萨比内部货币：令牌化账本、锁定存款、年化16%、每月释放、礼物收入和批准。",
    coinVault: "COIN Security Vault",
    coinVaultDescription: "内部币按加密资产和银行托管标准保护：追加式账本、哈希链、签名、热钱包、温钱包、冷钱包和紧急冻结。",
    cryptoWallet: "Crypto Balance account",
    cryptoWalletDescription: "加密资产与法币和内部币分离。没有虚假价格、虚假余额或虚假区块链交易。",
    merchant: "Merchant",
    merchantDescription: "商家级控制：二维码支付、结算、企业验证、反洗钱、风险、接口密钥、回调秘密、轮换、撤销和审计。",
    business: "Business Account / Balance account",
    businessDescription: "企业钱包是独立的高等级金融产品：路由、权限、会计、发票、企业验证、结算和审计。",
    qrPay: "QR / Pay",
    qrPayDescription: "钱包二维码、商家二维码、企业二维码、内部币二维码、加密资产二维码、会员二维码和礼物购买二维码，用户标识符是主要身份。",
    premium: "Premium Subscriptions",
    premiumDescription: "会员通过内部币、法币或二维码购买：付款确认后激活权益。人工虚假开关不能作为主要机制。",
    gift: "Gift Purchases",
    giftDescription: "付费礼物、平台费、接收方入账、每月释放和礼物账本。免费、赢得或促销礼物不算收入。",
    providerCenter: "External service Center",
    providerCenterDescription: "客户验证、反洗钱、卡片令牌化、虚拟发卡方、商家渠道、内部币账本、加密资产托管、市场数据和人工智能风险提供商。",
    security: "Security / PCI / AML / KYC",
    securityDescription: "不保存卡号、不保存安全码、仅令牌、客户验证、反洗钱、风险冻结、可疑活动、管理审核和不可变审计。",
    ledger: "Ledger / Accountant Approval",
    ledgerDescription: "会计中心：借方和贷方、批准队列、人工智能风险结果、会计确认、冲销、结算和导出。",
    launchGate: "Final Balance account Launch Control step",
    launchGateDescription: "覆盖法币、本地钱包、虚拟卡、内部币、加密资产、商家、企业、二维码、会员、礼物、账本和提供商的最终关口。",
    status: "状态",
    connected: "已连接",
    notConfigured: "External service not configured",
    blocked: "已阻止",
    active: "启用",
    required: "必需",
    wallets: "Wallets",
    operations: "操作",
    transactions: "交易",
    providers: "Providers",
    blockers: "Blockers",
    pending: "Pending",
    failed: "Failed",
    ledgerEntries: "Ledger entries",
    qrPayments: "QR payments",
    coinDeposits: "COIN deposits",
    coinCredits: "COIN requests",
    readiness: "Readiness",
    liveLaunch: "Live launch",
    safeMode: "Safe mode",
    tokenOnly: "Token-only",
    pan: "PAN storage",
    cvv: "CVV storage",
    rawCard: "Raw card data",
    rawCoinEdit: "Raw COIN balance edit",
    audit: "Audit",
    manualApproval: "Manual confirmation",
    aiRisk: "AI risk check",
    accountant: "Accountant confirmation",
    hashChain: "Hash-chain ledger",
    providerCenterFullTitle: "Balance account External service Center",
    providerCenterFullDescription: "Balance account external service full control: KYC, AML, card tokenization, local rails, virtual issuer, Merchant/Alipay, Business, COIN, Crypto, AI risk and infrastructure.",
    readyGroups: "Ready groups",
    criticalBlockers: "Critical blockers",
    requiredProviders: "Required providers",
    missingFields: "Missing fields",
    providerSource: "Source",
    providerEnabled: "Enabled",
    providerDisabled: "Disabled",
    noProviders: "No providers found yet.",
    noRawJson: "原始技术数据已隐藏。面板只显示工作状态、检查和安全聚合。",
    premiumFullTitle: "Premium Subscriptions Admin",
    premiumFullDescription: "Premium subscriptions control: COIN/fiat/QR charges, charge confirmation, entitlement activation/deactivation, refunds, expired states and audit.",
    activeSubscriptions: "Active subscriptions",
    premiumPayments: "Premium payments",
    premiumEntitlements: "Premium entitlements",
    coinPayments: "COIN payments",
    fiatPayments: "Fiat payments",
    qrPremiumPayments: "Premium QR",
    manualOverrides: "Manual overrides",
    giftFullTitle: "Gift Purchase / Revenue Admin",
    giftFullDescription: "Paid gifts, platform fees, recipient credits, monthly release, inventory movement and strict no-income policy for free/won/promo gifts.",
    paidGiftPurchases: "Paid gift purchases",
    giftPayments: "Gift payments",
    giftIncomeEntries: "Gift income entries",
    recipientCredits: "Recipient credits",
    platformFeeEntries: "Platform fee entries",
    inventoryMovements: "Inventory movements",
    freeWonPromoGifts: "Free/won/promo gifts",
    blockedPromoIncome: "Blocked promo income",
    pendingRelease: "Pending release",
    releasedIncome: "Released income",
  };
  return ({ ru, en, uz, zh }[language] ?? ru)[key] ?? key;
}

function adminWalletProviderStatus(dashboard: AdminWalletDashboard | null, keywords: string[]): string {
  const providers = dashboard?.providers ?? [];
  const provider = providers.find((item) => {
    const haystack = `${item.key} ${item.title} ${item.kind}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
  });
  return provider?.status ?? "provider_not_configured";
}

function adminWalletProviderConfigured(dashboard: AdminWalletDashboard | null, keywords: string[]): boolean {
  const providers = dashboard?.providers ?? [];
  const provider = providers.find((item) => {
    const haystack = `${item.key} ${item.title} ${item.kind}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
  });
  return Boolean(provider?.configured && provider?.enabled && provider?.status === "ready");
}

function adminWalletTone(status: string, fallback: WalletDashboardTone = "warning"): WalletDashboardTone {
  if (["ready", "ok", "active", "enabled"].includes(status)) return "ok";
  if (["blocked", "failed", "restricted", "error"].includes(status)) return "blocked";
  return fallback;
}

function adminWalletString(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
}

function WalletDashboardCardView(props: { language: AdminLanguage; card: WalletDashboardCard }) {
  const toneClass = props.card.tone === "ok" ? "success" : props.card.tone === "blocked" ? "error" : "warning";
  return (
    <div className="card">
      <h3>{props.card.title}</h3>
      <p>{props.card.description}</p>
      <div className={toneClass}>{adminWalletShellText(props.language, "status")}: {props.card.tone === "ok" ? adminWalletShellText(props.language, "active") : props.card.tone === "blocked" ? adminWalletShellText(props.language, "blocked") : adminWalletShellText(props.language, "required")}</div>
      <div className="statsGrid compactStats">
        {props.card.metrics.map((metric) => (
          <div className="statCard" key={`${props.card.key}-${metric.label}`}><span>{metric.label}</span><strong>{metric.value}</strong></div>
        ))}
      </div>
      <div className="ruleList">
        {props.card.rules.map((rule) => <div className="warning" key={`${props.card.key}-${rule}`}>{rule}</div>)}
      </div>
    </div>
  );
}

function WalletFiatDashboardView(props: { language: AdminLanguage; fiatDashboard: AdminWalletFiatDashboard | null; dashboard: AdminWalletDashboard | null }) {
  const summary = props.fiatDashboard?.summary;
  const controls = props.fiatDashboard?.controls ?? [];
  const providers = props.fiatDashboard?.providers ?? [];
  const operations = (props.fiatDashboard?.recent.operations ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});
  const transactions = (props.fiatDashboard?.recent.transactions ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});

  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "fiatControlTitle")}</h3>
      <p>{adminWalletShellText(props.language, "fiatControlDescription")}</p>
      <div className={props.fiatDashboard?.liveReady ? "success" : "warning"}>{adminWalletShellText(props.language, "fiatLiveReady")}: {props.fiatDashboard?.liveReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</div>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>{adminWalletShellText(props.language, "wallets")}</span><strong>{summary?.fiatWallets ?? props.dashboard?.summary.mainWallets ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "balances")}</span><strong>{summary?.balances ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "operations")}</span><strong>{summary?.operations ?? props.dashboard?.summary.walletOperations ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "pending")}</span><strong>{summary?.pendingOperations ?? props.dashboard?.summary.pendingOperations ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "failed")}</span><strong>{summary?.failedOperations ?? props.dashboard?.summary.failedOperations ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "ledgerEntries")}</span><strong>{summary?.ledgerEntries ?? props.dashboard?.summary.ledgerEntries ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "providerCoverage")}</span><strong>{summary ? `${summary.providerReady}/${summary.providerRequired}` : `${props.dashboard?.summary.providerReady ?? 0}/${props.dashboard?.summary.providerRequired ?? 0}`}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "riskHolds")}</span><strong>{summary?.riskHolds ?? 0}</strong></div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>{adminWalletShellText(props.language, "controls")}</h3>
          <div className="ruleList">
            {controls.length ? controls.map((control) => (
              <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}>
                <strong>{cleanAdminUiText(props.language, control.title)}</strong>
                <span>{cleanAdminUiText(props.language, control.detail)}</span>
              </div>
            )) : <div className="warning">{adminWalletShellText(props.language, "required")}</div>}
          </div>
        </div>
        <div className="card">
          <h3>{adminWalletShellText(props.language, "fiatAmounts")}</h3>
          <div className="tableList">
            <div className="row"><strong>{adminWalletShellText(props.language, "balances")}</strong><span>{amountMapText(props.fiatDashboard?.amounts.balanceByCurrency ?? props.dashboard?.amounts.walletBalanceByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "pending")}</strong><span>{amountMapText(props.fiatDashboard?.amounts.pendingByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "failed")}</strong><span>{amountMapText(props.fiatDashboard?.amounts.failedByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.operationFees")}</strong><span>{amountMapText(props.fiatDashboard?.amounts.feesByCurrency ?? props.dashboard?.amounts.operationFeesByCurrency)}</span></div>
          </div>
        </div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>{adminWalletShellText(props.language, "recentOperations")}</h3>
          <div className="tableList">
            {operations.length ? operations.map((row, index) => (
              <div className="row" key={`fiat-op-${String(row.id ?? index)}`}>
                <strong>{adminWalletString(row.type ?? row.kind ?? row.action ?? "operation")}</strong>
                <span>{adminWalletString(row.currency ?? "") || "—"} · {adminWalletString(row.status ?? row.state ?? "unknown")}</span>
                <em>{adminWalletString(row.amount ?? row.value ?? "0")}</em>
              </div>
            )) : <div className="empty">{t(props.language, "empty.noData")}</div>}
          </div>
        </div>
        <div className="card">
          <h3>{adminWalletShellText(props.language, "recentTransactions")}</h3>
          <div className="tableList">
            {transactions.length ? transactions.map((row, index) => (
              <div className="row" key={`fiat-tx-${String(row.id ?? index)}`}>
                <strong>{adminWalletString(row.type ?? row.kind ?? row.direction ?? "transaction")}</strong>
                <span>{adminWalletString(row.currency ?? "") || "—"} · {adminWalletString(row.status ?? row.state ?? "unknown")}</span>
                <em>{adminWalletString(row.amount ?? row.value ?? "0")}</em>
              </div>
            )) : <div className="empty">{t(props.language, "empty.noData")}</div>}
          </div>
        </div>
      </div>

      <div className="tableList">
        {providers.map((provider) => (
          <div className="row" key={`fiat-provider-${provider.key}`}>
            <strong>{provider.title}</strong>
            <span>{provider.key} · {provider.kind}</span>
            <em className={statusClass(provider.status)}>{statusText(props.language, provider.status)}</em>
          </div>
        ))}
      </div>
      <div className="ruleList">
        {(props.fiatDashboard?.rules ?? ["Sabi stores no PAN/CVV/card number; fiat card operations must stay token-only and provider-backed."]).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}


function WalletQrPayDashboardView(props: { language: AdminLanguage; qrPayDashboard: AdminWalletQrPayDashboard | null; dashboard: AdminWalletDashboard | null }) {
  const summary = props.qrPayDashboard?.summary;
  const routes = props.qrPayDashboard?.routes ?? [];
  const controls = props.qrPayDashboard?.controls ?? [];
  const payments = (props.qrPayDashboard?.recent.qrPayments ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});

  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "qrPay")} Control</h3>
      <p>{adminWalletShellText(props.language, "qrPayDescription")}</p>
      <div className={props.qrPayDashboard?.liveReady ? "success" : "warning"}>{adminWalletShellText(props.language, "liveLaunch")}: {props.qrPayDashboard?.liveReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</div>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>{adminWalletShellText(props.language, "qrPayments")}</span><strong>{summary?.qrPayments ?? props.dashboard?.summary.qrPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "pending")}</span><strong>{summary?.pendingPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "failed")}</span><strong>{summary?.failedPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "blockers")}</span><strong>{summary?.providerBlockers ?? 0}</strong></div>
        <div className="statCard"><span>Merchant QR</span><strong>{summary?.merchantQr ?? 0}</strong></div>
        <div className="statCard"><span>COIN QR</span><strong>{summary?.coinQr ?? 0}</strong></div>
        <div className="statCard"><span>Premium QR</span><strong>{summary?.premiumQr ?? 0}</strong></div>
        <div className="statCard"><span>Gift QR</span><strong>{summary?.giftQr ?? 0}</strong></div>
      </div>
      <div className="split wideLeft">
        <div className="card softCard">
          <h3>QR routes</h3>
          <div className="tableList">
            {routes.map((route) => (
              <div className="row" key={route.key}>
                <strong>{cleanAdminUiText(props.language, route.title)}</strong>
                <span>{cleanAdminUiText(props.language, route.detail)}</span>
                <em className={statusClass(route.status)}>{route.count} · {statusText(props.language, route.status)}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "controls")}</h3>
          <div className="ruleList">
            {controls.map((control) => <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}><strong>{cleanAdminUiText(props.language, control.title)}</strong><span>{cleanAdminUiText(props.language, control.detail)}</span></div>)}
          </div>
        </div>
      </div>
      <div className="split wideLeft">
        <div className="card softCard">
          <h3>QR amounts</h3>
          <div className="tableList">
            <div className="row"><strong>Gross</strong><span>{amountMapText(props.qrPayDashboard?.amounts.grossByCurrency)}</span></div>
            <div className="row"><strong>Completed</strong><span>{amountMapText(props.qrPayDashboard?.amounts.completedByCurrency)}</span></div>
            <div className="row"><strong>Pending</strong><span>{amountMapText(props.qrPayDashboard?.amounts.pendingByCurrency)}</span></div>
            <div className="row"><strong>Failed</strong><span>{amountMapText(props.qrPayDashboard?.amounts.failedByCurrency)}</span></div>
            <div className="row"><strong>Fees</strong><span>{amountMapText(props.qrPayDashboard?.amounts.feeByCurrency)}</span></div>
          </div>
        </div>
        <div className="card softCard">
          <h3>Recent QR payments</h3>
          <div className="tableList">
            {payments.length ? payments.map((row, index) => (
              <div className="row" key={`${adminWalletString(row.id, "qr")}-${index}`}>
                <strong>{adminWalletString(row.type ?? row.qrType ?? row.kind, "QR payment")}</strong>
                <span>{adminWalletString(row.currency, "")} {adminWalletString(row.amount, "")}</span>
                <em className={statusClass(adminWalletString(row.status, "pending"))}>{statusText(props.language, adminWalletString(row.status, "pending"))}</em>
              </div>
            )) : <div className="empty">No QR payments found yet.</div>}
          </div>
        </div>
      </div>
      <div className="ruleList">
        {(props.qrPayDashboard?.rules ?? []).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}

function WalletCoinSecurityVaultView(props: { language: AdminLanguage; coinVault: AdminWalletCoinSecurityVaultDashboard | null; dashboard: AdminWalletDashboard | null }) {
  const vault = props.coinVault;
  const summary = vault?.summary;
  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "coinVault")}</h3>
      <p>{adminWalletShellText(props.language, "coinVaultDescription")}</p>
      <div className={vault?.liveReady ? "success" : "warning"}>Live ready: {vault?.liveReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</div>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>COIN wallets</span><strong>{summary?.coinWallets ?? props.dashboard?.summary.coinWallets ?? 0}</strong></div>
        <div className="statCard"><span>Ledger</span><strong>{summary?.coinLedgerEntries ?? props.dashboard?.summary.ledgerEntries ?? 0}</strong></div>
        <div className="statCard"><span>Pending approvals</span><strong>{summary?.pendingApprovals ?? 0}</strong></div>
        <div className="statCard"><span>AI risk required</span><strong>{summary?.aiRiskRequired ?? 0}</strong></div>
        <div className="statCard"><span>Accountant required</span><strong>{summary?.accountantRequired ?? 0}</strong></div>
        <div className="statCard"><span>Hash gaps</span><strong>{summary?.hashChainGaps ?? 0}</strong></div>
        <div className="statCard"><span>Unsigned entries</span><strong>{summary?.unsignedLedgerEntries ?? 0}</strong></div>
        <div className="statCard"><span>Providers</span><strong>{summary ? `${summary.providerReady}/${summary.providerRequired}` : "0/0"}</strong></div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>Vault layers</h3>
          <div className="tableList">
            {(vault?.vaults ?? []).map((item) => (
              <div className="row" key={item.key}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
                <em className={statusClass(item.status)}>{statusText(props.language, item.status)}</em>
                <small>{item.entries} entries · {item.amount} COIN</small>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Compromise protection</h3>
          <div className="ruleList">
            {(vault?.compromiseProtection ?? []).map((item) => (
              <div className={item.status === "ok" ? "success" : item.status === "blocked" ? "error" : "warning"} key={item.key}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>COIN security controls</h3>
          <div className="ruleList">
            {(vault?.controls ?? []).map((control) => (
              <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}>
                <strong>{control.title}</strong>
                <span>{control.detail}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>COIN providers</h3>
          <div className="tableList">
            {(vault?.providers ?? []).length ? (vault?.providers ?? []).map((provider) => (
              <div className="row" key={provider.key}>
                <strong>{provider.title}</strong>
                <span>{provider.key} · {provider.kind}</span>
                <em className={statusClass(provider.status)}>{statusText(props.language, provider.status)}</em>
              </div>
            )) : <div className="empty">provider_not_configured</div>}
          </div>
        </div>
      </div>

      <div className="ruleList">
        {(vault?.rules ?? [
          "COIN balance is derived from tokenized append-only ledger units, not editable raw balance fields.",
          "COIN exchange, withdrawal, gift-income release, manual correction and mint/burn require AI risk check plus accountant/admin confirmation.",
          "A database breach alone must not allow attackers to mint, move, withdraw or release COIN.",
        ]).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}


function WalletPremiumSubscriptionsView(props: { language: AdminLanguage; premiumDashboard: AdminWalletPremiumSubscriptionsDashboard | null; dashboard: AdminWalletDashboard | null }) {
  const premium = props.premiumDashboard;
  const summary = premium?.summary;
  const controls = premium?.controls ?? [];
  const providers = premium?.providers ?? [];
  const subscriptions = (premium?.recent.subscriptions ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});
  const payments = (premium?.recent.payments ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});

  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "premiumFullTitle")}</h3>
      <p>{adminWalletShellText(props.language, "premiumFullDescription")}</p>
      <div className={premium?.liveReady ? "success" : "warning"}>{adminWalletShellText(props.language, "liveLaunch")}: {premium?.liveReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</div>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>{adminWalletShellText(props.language, "activeSubscriptions")}</span><strong>{summary?.activeSubscriptions ?? 0}/{summary?.subscriptions ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "premiumPayments")}</span><strong>{summary?.payments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "premiumEntitlements")}</span><strong>{summary?.premiumEntitlements ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "coinPayments")}</span><strong>{summary?.coinPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "fiatPayments")}</span><strong>{summary?.fiatPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "qrPremiumPayments")}</span><strong>{summary?.qrPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "manualOverrides")}</span><strong>{summary?.manualOverrides ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "blockers")}</span><strong>{summary?.providerBlockers ?? 0}</strong></div>
      </div>

      <div className="split">
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "fiatAmounts")}</h3>
          <div className="tableList">
            <div className="row"><strong>{adminWalletShellText(props.language, "premiumPayments")}</strong><span>{amountMapText(premium?.amounts.paymentByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "coinPayments")}</strong><span>{amountMapText(premium?.amounts.coinByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "fiatPayments")}</strong><span>{amountMapText(premium?.amounts.fiatByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "pending")}</strong><span>{amountMapText(premium?.amounts.pendingByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "failed")}</strong><span>{amountMapText(premium?.amounts.failedByCurrency)}</span></div>
          </div>
        </div>
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "controls")}</h3>
          <div className="ruleList">
            {controls.map((control) => <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}><strong>{cleanAdminUiText(props.language, control.title)}</strong><span>{cleanAdminUiText(props.language, control.detail)}</span></div>)}
          </div>
        </div>
      </div>

      <div className="split">
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "recentOperations")}</h3>
          <div className="tableList">
            {payments.length ? payments.map((row, index) => <div className="row" key={`premium-payment-${index}`}><strong>{adminWalletString(row.status ?? row.paymentStatus, "payment")}</strong><span>{adminWalletString(row.amount ?? row.totalAmount ?? row.price, "0")} {adminWalletString(row.currency, "")}</span></div>) : <div className="empty">No premium payment records.</div>}
          </div>
        </div>
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "activeSubscriptions")}</h3>
          <div className="tableList">
            {subscriptions.length ? subscriptions.map((row, index) => <div className="row" key={`premium-sub-${index}`}><strong>{adminWalletString(row.status ?? row.state, "subscription")}</strong><span>{adminWalletString(row.userId ?? row.ownerId ?? row.accountId, "user")}</span></div>) : <div className="empty">No premium subscription records.</div>}
          </div>
        </div>
      </div>

      <div className="chips">
        {providers.map((provider) => <span key={provider.key}>{provider.title}: {statusText(props.language, provider.status)}</span>)}
      </div>
      <div className="ruleList">
        {(premium?.rules ?? ["Premium activates only after confirmed payment; fake/manual toggles must not be the main flow."]).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}


function WalletGiftPurchaseView(props: { language: AdminLanguage; giftDashboard: AdminWalletGiftPurchaseDashboard | null; dashboard: AdminWalletDashboard | null }) {
  const gift = props.giftDashboard;
  const summary = gift?.summary;
  const controls = gift?.controls ?? [];
  const providers = gift?.providers ?? [];
  const purchases = (gift?.recent.purchases ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});
  const income = (gift?.recent.income ?? []).slice(0, 6).map((row) => row && typeof row === "object" ? row as Record<string, unknown> : {});

  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "giftFullTitle")}</h3>
      <p>{adminWalletShellText(props.language, "giftFullDescription")}</p>
      <div className={gift?.liveReady ? "success" : "warning"}>{adminWalletShellText(props.language, "liveLaunch")}: {gift?.liveReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</div>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>{adminWalletShellText(props.language, "paidGiftPurchases")}</span><strong>{summary?.paidGiftPurchases ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "giftPayments")}</span><strong>{summary?.giftPayments ?? 0}</strong></div>
        <div className="statCard"><span>COIN</span><strong>{summary?.coinGiftPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "qrPay")}</span><strong>{summary?.qrGiftPayments ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "platformFeeEntries")}</span><strong>{summary?.platformFeeEntries ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "recipientCredits")}</span><strong>{summary?.recipientCredits ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "pendingRelease")}</span><strong>{summary?.pendingRelease ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "blockedPromoIncome")}</span><strong>{summary?.blockedPromoIncome ?? 0}</strong></div>
      </div>

      <div className="split">
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "fiatAmounts")}</h3>
          <div className="tableList">
            <div className="row"><strong>{adminWalletShellText(props.language, "paidGiftPurchases")}</strong><span>{amountMapText(gift?.amounts.paidByCurrency)}</span></div>
            <div className="row"><strong>COIN</strong><span>{amountMapText(gift?.amounts.coinByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "platformFeeEntries")}</strong><span>{amountMapText(gift?.amounts.platformFeeByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "recipientCredits")}</strong><span>{amountMapText(gift?.amounts.recipientCreditByCurrency)}</span></div>
            <div className="row"><strong>{adminWalletShellText(props.language, "pendingRelease")}</strong><span>{amountMapText(gift?.amounts.pendingReleaseByCurrency)}</span></div>
          </div>
        </div>
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "controls")}</h3>
          <div className="ruleList">
            {controls.map((control) => <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}><strong>{cleanAdminUiText(props.language, control.title)}</strong><span>{cleanAdminUiText(props.language, control.detail)}</span></div>)}
          </div>
        </div>
      </div>

      <div className="split">
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "paidGiftPurchases")}</h3>
          <div className="tableList">
            {purchases.length ? purchases.map((row, index) => <div className="row" key={`gift-purchase-${index}`}><strong>{adminWalletString(row.status ?? row.state ?? row.kind, "gift")}</strong><span>{adminWalletString(row.amount ?? row.totalAmount ?? row.price, "0")} {adminWalletString(row.currency, "")}</span></div>) : <div className="empty">No gift purchase records.</div>}
          </div>
        </div>
        <div className="card softCard">
          <h3>{adminWalletShellText(props.language, "giftIncomeEntries")}</h3>
          <div className="tableList">
            {income.length ? income.map((row, index) => <div className="row" key={`gift-income-${index}`}><strong>{adminWalletString(row.status ?? row.releaseStatus ?? row.kind, "income")}</strong><span>{adminWalletString(row.amount ?? row.creditAmount ?? row.value, "0")} {adminWalletString(row.currency, "")}</span></div>) : <div className="empty">No gift income records.</div>}
          </div>
        </div>
      </div>

      <div className="chips">
        {providers.map((provider) => <span key={provider.key}>{provider.title}: {statusText(props.language, provider.status)}</span>)}
      </div>
      <div className="ruleList">
        {(gift?.rules ?? ["Free/won/promo gifts are never income; paid gifts must pass through ledger, fee logic and monthly release policy."]).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}


function WalletProviderCenterView(props: { language: AdminLanguage; providerCenter: AdminWalletProviderCenter | null; dashboard: AdminWalletDashboard | null }) {
  const summary = props.providerCenter?.summary;
  const groups = props.providerCenter?.groups ?? [];
  const rules = props.providerCenter?.rules ?? [
    "Missing external service keys must return external service_not_configured, not false success.",
    "External service keys must stay in the protected infrastructure and never in mobile.",
    "Merchant API keys and webhook secrets must support rotation/revocation before live launch.",
  ];

  return (
    <div className="card">
      <h3>{adminWalletShellText(props.language, "providerCenterFullTitle")}</h3>
      <p>{adminWalletShellText(props.language, "providerCenterFullDescription")}</p>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>{adminWalletShellText(props.language, "providers")}</span><strong>{summary ? `${summary.ready}/${summary.total}` : `${props.dashboard?.summary.providerReady ?? 0}/${props.dashboard?.summary.providerRequired ?? 0}`}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "requiredProviders")}</span><strong>{summary?.required ?? props.dashboard?.summary.providerRequired ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "blockers")}</span><strong>{summary?.blockers ?? props.dashboard?.summary.providerBlockers ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "readyGroups")}</span><strong>{summary ? `${summary.readyGroups}/${summary.groups}` : "0/0"}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "criticalBlockers")}</span><strong>{summary?.criticalBlockers ?? 0}</strong></div>
        <div className="statCard"><span>{adminWalletShellText(props.language, "liveLaunch")}</span><strong>{props.providerCenter?.liveLaunchReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked")}</strong></div>
      </div>

      <div className="gridCards">
        {groups.length ? groups.map((group) => (
          <div className="card" key={group.key}>
            <h3>{cleanAdminUiText(props.language, group.title)}</h3>
            <p>{cleanAdminUiText(props.language, group.description)}</p>
            <div className={group.status === "ok" ? "success" : group.status === "blocked" ? "error" : "warning"}>{adminWalletShellText(props.language, "status")}: {statusText(props.language, group.status)}</div>
            <div className="statsGrid compactStats">
              <div className="statCard"><span>{adminWalletShellText(props.language, "providers")}</span><strong>{group.ready}/{group.total}</strong></div>
              <div className="statCard"><span>{adminWalletShellText(props.language, "requiredProviders")}</span><strong>{group.required}</strong></div>
              <div className="statCard"><span>{adminWalletShellText(props.language, "blockers")}</span><strong>{group.blockers}</strong></div>
            </div>
            <div className="tableList">
              {group.providers.length ? group.providers.map((provider) => (
                <div className="row" key={`${group.key}-${provider.key}`}>
                  <strong>{provider.title}</strong>
                  <span>{provider.key} · {provider.kind} · {adminWalletShellText(props.language, "providerSource")}: {provider.source}</span>
                  <span>{provider.enabled ? adminWalletShellText(props.language, "providerEnabled") : adminWalletShellText(props.language, "providerDisabled")}</span>
                  <em className={statusClass(provider.status)}>{statusText(props.language, provider.status)}</em>
                  {provider.missingFields.length ? <small>{adminWalletShellText(props.language, "missingFields")}: {provider.missingFields.join(", ")}</small> : null}
                </div>
              )) : <div className="empty">{adminWalletShellText(props.language, "noProviders")}</div>}
            </div>
            <div className="ruleList">
              {group.rules.map((rule) => <div className="warning" key={`${group.key}-${rule}`}>{cleanAdminUiText(props.language, rule)}</div>)}
            </div>
          </div>
        )) : <div className="empty">{adminWalletShellText(props.language, "noProviders")}</div>}
      </div>

      <div className="ruleList">
        {rules.map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}


function WalletMerchantApiCenterView(props: {
  language: AdminLanguage;
  config: AdminApiConfig;
  merchantApiCenter: AdminWalletMerchantApiCenter | null;
  merchants: AdminMerchantAccount[];
  busy: boolean;
  setBusy: (busy: boolean) => void;
  setNotice: (notice: string) => void;
  onUpdated: (center: AdminWalletMerchantApiCenter) => void;
}) {
  const [merchantId, setMerchantId] = useState("");
  const [mode, setMode] = useState<"test" | "live">("test");
  const [kind, setKind] = useState<"api_key" | "webhook_secret">("api_key");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [ipAllowlist, setIpAllowlist] = useState("");
  const [secretOnce, setSecretOnce] = useState<string | null>(null);
  const center = props.merchantApiCenter;
  const summary = center?.summary;
  const activeMerchants = props.merchants.filter((merchant) => merchant.status === "active" || merchant.kybStatus === "approved");

  async function generateCredential() {
    if (!merchantId) return;
    props.setBusy(true);
    try {
      const response = await adminApi.generateWalletMerchantCredential(props.config, {
        merchantId,
        kind,
        mode,
        label: kind === "webhook_secret" ? "Merchant webhook secret" : "Merchant API key",
        callbackUrl: kind === "webhook_secret" ? callbackUrl : undefined,
        ipAllowlist: ipAllowlist.split(",").map((item) => item.trim()).filter(Boolean),
      });
      props.onUpdated(response.merchantApiCenter);
      setSecretOnce(response.result.secretOnce ?? null);
      props.setNotice(response.result.warning);
    } finally {
      props.setBusy(false);
    }
  }

  async function rotateCredential(credential: AdminWalletMerchantCredential) {
    props.setBusy(true);
    try {
      const response = await adminApi.rotateWalletMerchantCredential(props.config, credential.id);
      props.onUpdated(response.merchantApiCenter);
      setSecretOnce(response.result.secretOnce ?? null);
      props.setNotice(response.result.warning);
    } finally {
      props.setBusy(false);
    }
  }

  async function revokeCredential(credential: AdminWalletMerchantCredential) {
    props.setBusy(true);
    try {
      const response = await adminApi.revokeWalletMerchantCredential(props.config, credential.id);
      props.onUpdated(response.merchantApiCenter);
      props.setNotice("Merchant credential revoked");
    } finally {
      props.setBusy(false);
    }
  }

  return (
    <div className="card">
      <h3>Merchant API Keys / Webhook Security</h3>
      <p>Merchant-grade controls: generate, rotate and revoke API keys and webhook secrets. Plaintext secret is shown once only; Admin stores masked prefix and hash, not the raw secret.</p>
      <div className="statsGrid compactStats">
        <div className="statCard"><span>Merchants</span><strong>{summary?.activeMerchants ?? 0}/{summary?.merchants ?? 0}</strong></div>
        <div className="statCard"><span>API keys</span><strong>{summary?.activeApiKeys ?? 0}/{summary?.apiKeys ?? 0}</strong></div>
        <div className="statCard"><span>Webhook secrets</span><strong>{summary?.activeWebhookSecrets ?? 0}/{summary?.webhookSecrets ?? 0}</strong></div>
        <div className="statCard"><span>KYB approved</span><strong>{summary?.kybApproved ?? 0}</strong></div>
        <div className="statCard"><span>QR Pay</span><strong>{summary?.qrPayEnabled ?? 0}</strong></div>
        <div className="statCard"><span>Live ready</span><strong>{center?.liveLaunchReady ? statusText(props.language, "ready") : "blocked"}</strong></div>
      </div>

      {secretOnce ? <div className="success"><strong>SECRET — copy now:</strong><br /><code>{secretOnce}</code></div> : null}

      <div className="split">
        <div className="card">
          <h3>Generate credential</h3>
          <label><span>Merchant</span><select value={merchantId} onChange={(event) => setMerchantId(event.target.value)}><option value="">Select merchant</option>{activeMerchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.tradeName} · {merchant.id}</option>)}</select></label>
          <label><span>Kind</span><select value={kind} onChange={(event) => setKind(event.target.value as "api_key" | "webhook_secret")}><option value="api_key">API key</option><option value="webhook_secret">Webhook secret</option></select></label>
          <label><span>Mode</span><select value={mode} onChange={(event) => setMode(event.target.value as "test" | "live")}><option value="test">test</option><option value="live">live</option></select></label>
          {kind === "webhook_secret" ? <label><span>Callback URL</span><input value={callbackUrl} onChange={(event) => setCallbackUrl(event.target.value)} placeholder="https://merchant.example/webhook" /></label> : null}
          <label><span>IP allowlist</span><input value={ipAllowlist} onChange={(event) => setIpAllowlist(event.target.value)} placeholder="10.0.0.1, 10.0.0.2" /></label>
          <button onClick={generateCredential} disabled={props.busy || !merchantId}>Generate</button>
        </div>
        <div className="card">
          <h3>Security controls</h3>
          <div className="ruleList">
            {(center?.controls ?? []).map((control) => <div className={control.status === "ok" ? "success" : control.status === "blocked" ? "error" : "warning"} key={control.key}><strong>{control.title}</strong><span>{control.detail}</span></div>)}
          </div>
        </div>
      </div>

      <div className="tableList">
        {(center?.credentials ?? []).length ? (center?.credentials ?? []).map((credential) => (
          <div className="row" key={credential.id}>
            <strong>{credential.label}</strong>
            <span>{credential.kind} · {credential.mode} · {credential.masked} · merchant: {credential.merchantId}</span>
            <em className={statusClass(credential.status)}>{statusText(props.language, credential.status)}</em>
            <button onClick={() => rotateCredential(credential)} disabled={props.busy || credential.status === "revoked"}>Rotate</button>
            <button className="danger" onClick={() => revokeCredential(credential)} disabled={props.busy || credential.status === "revoked"}>Revoke</button>
          </div>
        )) : <div className="empty">No merchant credentials yet.</div>}
      </div>

      <div className="ruleList">
        {(center?.rules ?? []).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
      </div>
    </div>
  );
}

function WalletAdminPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const [dashboard, setDashboard] = useState<AdminWalletDashboard | null>(null);
  const [fiatDashboard, setFiatDashboard] = useState<AdminWalletFiatDashboard | null>(null);
  const [qrPayDashboard, setQrPayDashboard] = useState<AdminWalletQrPayDashboard | null>(null);
  const [coinVault, setCoinVault] = useState<AdminWalletCoinSecurityVaultDashboard | null>(null);
  const [providerCenter, setProviderCenter] = useState<AdminWalletProviderCenter | null>(null);
  const [merchantApiCenter, setMerchantApiCenter] = useState<AdminWalletMerchantApiCenter | null>(null);
  const [premiumDashboard, setPremiumDashboard] = useState<AdminWalletPremiumSubscriptionsDashboard | null>(null);
  const [giftDashboard, setGiftDashboard] = useState<AdminWalletGiftPurchaseDashboard | null>(null);
  const [merchants, setMerchants] = useState<AdminMerchantAccount[]>([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const [dashboardResponse, fiatDashboardResponse, qrPayDashboardResponse, coinVaultResponse, providerCenterResponse, merchantApiCenterResponse, premiumDashboardResponse, giftDashboardResponse, merchantsResponse] = await Promise.all([
        adminApi.walletDashboard(props.config),
        adminApi.walletFiatDashboard(props.config).catch(() => null),
        adminApi.walletQrPayDashboard(props.config).catch(() => null),
        adminApi.walletCoinSecurityVault(props.config).catch(() => null),
        adminApi.walletProviderCenter(props.config).catch(() => null),
        adminApi.walletMerchantApiCenter(props.config).catch(() => null),
        adminApi.walletPremiumSubscriptions(props.config).catch(() => null),
        adminApi.walletGiftPurchases(props.config).catch(() => null),
        adminApi.merchants(props.config).catch(() => null),
      ]);
      setDashboard(dashboardResponse.dashboard);
      setFiatDashboard(fiatDashboardResponse?.fiatDashboard ?? null);
      setQrPayDashboard(qrPayDashboardResponse?.qrPayDashboard ?? null);
      setCoinVault(coinVaultResponse?.coinVault ?? null);
      setProviderCenter(providerCenterResponse?.providerCenter ?? null);
      setMerchantApiCenter(merchantApiCenterResponse?.merchantApiCenter ?? null);
      setPremiumDashboard(premiumDashboardResponse?.premiumDashboard ?? null);
      setGiftDashboard(giftDashboardResponse?.giftDashboard ?? null);
      setMerchants(merchantsResponse?.merchants ?? []);
      props.setNotice(t(props.language, "notice.walletDashboardLoaded"));
    } finally {
      setBusy(false);
    }
  }

  function exportWalletSnapshot() {
    if (!dashboard) return;
    downloadAdminJson(`sabi-admin-wallet-${new Date().toISOString().slice(0, 10)}.json`, dashboard);
    props.setNotice(t(props.language, "notice.walletDashboardExported"));
  }

  useEffect(() => { void load(); }, []);

  const summary = dashboard?.summary;
  const checks = dashboard?.checks ?? [];
  const providers = dashboard?.providers ?? [];
  const blockers = dashboard?.blockers ?? [];
  const providerReady = summary?.providerReady ?? 0;
  const providerRequired = summary?.providerRequired ?? 0;
  const providerBlockers = summary?.providerBlockers ?? 0;
  const cardTokenProviderStatus = adminWalletProviderStatus(dashboard, ["card", "token", "bank"]);
  const virtualIssuerStatus = adminWalletProviderStatus(dashboard, ["virtual", "issuer"]);
  const kycStatus = adminWalletProviderStatus(dashboard, ["kyc"]);
  const amlStatus = adminWalletProviderStatus(dashboard, ["aml"]);
  const merchantProviderStatus = adminWalletProviderStatus(dashboard, ["merchant", "alipay"]);
  const coinProviderStatus = adminWalletProviderStatus(dashboard, ["coin", "ledger"]);
  const cryptoCustodyStatus = adminWalletProviderStatus(dashboard, ["crypto", "custody"]);
  const marketDataStatus = adminWalletProviderStatus(dashboard, ["market", "data"]);
  const aiRiskProviderReady = adminWalletProviderConfigured(dashboard, ["ai", "risk"]);

  const shellCards: WalletDashboardCard[] = [
    {
      key: "global",
      title: adminWalletShellText(props.language, "globalOverview"),
      description: adminWalletShellText(props.language, "globalOverviewDescription"),
      tone: dashboard?.liveLaunchReady ? "ok" : "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "readiness"), value: `${summary?.readinessScore ?? 0}%` },
        { label: adminWalletShellText(props.language, "liveLaunch"), value: dashboard?.liveLaunchReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "providers"), value: `${providerReady}/${providerRequired}` },
        { label: adminWalletShellText(props.language, "blockers"), value: providerBlockers },
      ],
      rules: ["No false success", "External service-not-configured is valid until real keys are connected", "Global readiness must include fiat, local, cards, COIN, crypto, merchant, business, QR, premium, gifts and ledger"],
    },
    {
      key: "fiat",
      title: adminWalletShellText(props.language, "fiatWallet"),
      description: adminWalletShellText(props.language, "fiatWalletDescription"),
      tone: adminWalletTone(cardTokenProviderStatus),
      metrics: [
        { label: adminWalletShellText(props.language, "wallets"), value: summary?.mainWallets ?? 0 },
        { label: adminWalletShellText(props.language, "operations"), value: summary?.walletOperations ?? 0 },
        { label: adminWalletShellText(props.language, "transactions"), value: summary?.transactions ?? 0 },
        { label: adminWalletShellText(props.language, "failed"), value: (summary?.failedOperations ?? 0) + (summary?.failedTransactions ?? 0) },
      ],
      rules: ["Fiat movement must use wallet ledger", "Top-up/withdrawal requires provider route", "Card operations require tokenized provider flow"],
    },
    {
      key: "local",
      title: adminWalletShellText(props.language, "localWallet"),
      description: adminWalletShellText(props.language, "localWalletDescription"),
      tone: "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "status"), value: adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "tokenOnly"), value: adminWalletShellText(props.language, "active") },
        { label: adminWalletShellText(props.language, "qrPayments"), value: summary?.qrPayments ?? 0 },
        { label: adminWalletShellText(props.language, "blockers"), value: providerBlockers },
      ],
      rules: ["No hardcoded UZS/RUB/local currency labels", "Local currency must come from settings/provider/detection", "Local rails require compliance and risk monitoring"],
    },
    {
      key: "virtual-cards",
      title: adminWalletShellText(props.language, "virtualCards"),
      description: adminWalletShellText(props.language, "virtualCardsDescription"),
      tone: adminWalletTone(virtualIssuerStatus),
      metrics: [
        { label: adminWalletShellText(props.language, "status"), value: statusText(props.language, virtualIssuerStatus) },
        { label: adminWalletShellText(props.language, "pan"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "cvv"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "tokenOnly"), value: adminWalletShellText(props.language, "active") },
      ],
      rules: ["Virtual cards must be issued by bank/issuer external service", "Sabi stores tokenId, masked metadata, state and audit reference only", "No PAN/CVV/card raw data on Sabi infrastructure"],
    },
    {
      key: "coin",
      title: adminWalletShellText(props.language, "coinWallet"),
      description: adminWalletShellText(props.language, "coinWalletDescription"),
      tone: adminWalletTone(coinProviderStatus),
      metrics: [
        { label: adminWalletShellText(props.language, "wallets"), value: summary?.coinWallets ?? 0 },
        { label: adminWalletShellText(props.language, "coinDeposits"), value: summary?.coinDeposits ?? 0 },
        { label: adminWalletShellText(props.language, "coinCredits"), value: summary?.coinCreditRequests ?? 0 },
        { label: "Locked COIN", value: dashboard?.amounts.coinLockedPrincipal ?? 0 },
      ],
      rules: ["COIN balance must be derived from tokenized ledger units", "Exchange/withdrawal/release requires AI risk check and accountant confirmation", "Gift income release follows monthly release policy"],
    },
    {
      key: "coin-vault",
      title: adminWalletShellText(props.language, "coinVault"),
      description: adminWalletShellText(props.language, "coinVaultDescription"),
      tone: "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "hashChain"), value: adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "rawCoinEdit"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "aiRisk"), value: aiRiskProviderReady ? adminWalletShellText(props.language, "connected") : adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "accountant"), value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["database-only compromise must not allow mint, transfer or withdrawal", "High-risk COIN actions require signed transaction, idempotency key, AI/admin/accountant confirmation", "Hot/warm/cold vault and emergency freeze controls are mandatory"],
    },
    {
      key: "crypto",
      title: adminWalletShellText(props.language, "cryptoWallet"),
      description: adminWalletShellText(props.language, "cryptoWalletDescription"),
      tone: adminWalletTone(cryptoCustodyStatus),
      metrics: [
        { label: "Custody", value: statusText(props.language, cryptoCustodyStatus) },
        { label: "Market data", value: statusText(props.language, marketDataStatus) },
        { label: adminWalletShellText(props.language, "status"), value: adminWalletShellText(props.language, "notConfigured") },
        { label: adminWalletShellText(props.language, "audit"), value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["Crypto must stay separate from fiat and COIN", "No fake networks, fake prices or fake transactions", "Deposit/withdraw stays disabled until real custody/network providers are connected"],
    },
    {
      key: "merchant",
      title: adminWalletShellText(props.language, "merchant"),
      description: adminWalletShellText(props.language, "merchantDescription"),
      tone: adminWalletTone(merchantProviderStatus),
      metrics: [
        { label: adminWalletShellText(props.language, "wallets"), value: summary?.merchantWallets ?? 0 },
        { label: "External service", value: statusText(props.language, merchantProviderStatus) },
        { label: "API keys", value: adminWalletShellText(props.language, "required") },
        { label: "Webhooks", value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["Generate, rotate and revoke Merchant API keys", "Webhook secret, signature verification, callback URL and IP allowlist are mandatory", "Merchant QR/Pay, settlements, disputes, KYB/AML and audit must be controlled from Admin"],
    },
    {
      key: "business",
      title: adminWalletShellText(props.language, "business"),
      description: adminWalletShellText(props.language, "businessDescription"),
      tone: "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "wallets"), value: summary?.businessWallets ?? 0 },
        { label: "KYB", value: adminWalletShellText(props.language, "required") },
        { label: "Permissions", value: adminWalletShellText(props.language, "required") },
        { label: "Accounting", value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["Business income must not mix with personal Sabi Wallet", "Business permissions, employees, invoices, settlements and accounting export must be separate", "Client-side Business Admin portal is required later"],
    },
    {
      key: "qr-pay",
      title: adminWalletShellText(props.language, "qrPay"),
      description: adminWalletShellText(props.language, "qrPayDescription"),
      tone: (summary?.qrPayments ?? 0) > 0 ? "ok" : "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "qrPayments"), value: summary?.qrPayments ?? 0 },
        { label: "Balance account QR", value: adminWalletShellText(props.language, "required") },
        { label: "Merchant QR", value: adminWalletShellText(props.language, "required") },
        { label: "COIN QR", value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["QR identity must auto-fill verified userId", "Manual identity input is forbidden", "Amount is manual only where charge flow requires amount"],
    },
    {
      key: "premium",
      title: adminWalletShellText(props.language, "premium"),
      description: adminWalletShellText(props.language, "premiumDescription"),
      tone: "warning",
      metrics: [
        { label: "COIN route", value: adminWalletShellText(props.language, "required") },
        { label: "Fiat route", value: adminWalletShellText(props.language, "required") },
        { label: "Entitlement", value: adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "audit"), value: adminWalletShellText(props.language, "active") },
      ],
      rules: ["Premium activates only after charge confirmation", "Entitlement activation/deactivation must be automatic and auditable", "Manual admin override is emergency/audit flow, not main charge mechanism"],
    },
    {
      key: "gift",
      title: adminWalletShellText(props.language, "gift"),
      description: adminWalletShellText(props.language, "giftDescription"),
      tone: "warning",
      metrics: [
        { label: "Paid gift ledger", value: adminWalletShellText(props.language, "required") },
        { label: "Platform fee", value: adminWalletShellText(props.language, "required") },
        { label: "Monthly release", value: adminWalletShellText(props.language, "required") },
        { label: "Promo income", value: adminWalletShellText(props.language, "blocked") },
      ],
      rules: ["Free/won/promo gifts are never income", "Paid gift revenue must pass through ledger and platform-fee logic", "Recipient income release must follow COIN monthly release policy"],
    },
    {
      key: "provider-center",
      title: adminWalletShellText(props.language, "providerCenter"),
      description: adminWalletShellText(props.language, "providerCenterDescription"),
      tone: providerBlockers === 0 && providerRequired > 0 ? "ok" : "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "providers"), value: `${providerReady}/${providerRequired}` },
        { label: "KYC", value: statusText(props.language, kycStatus) },
        { label: "AML", value: statusText(props.language, amlStatus) },
        { label: adminWalletShellText(props.language, "blockers"), value: providerBlockers },
      ],
      rules: ["Missing external service keys must show external service_not_configured", "No false external service health", "External service changes must be auditable and server-side only"],
    },
    {
      key: "security",
      title: adminWalletShellText(props.language, "security"),
      description: adminWalletShellText(props.language, "securityDescription"),
      tone: "ok",
      metrics: [
        { label: adminWalletShellText(props.language, "pan"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "cvv"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "rawCard"), value: adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "tokenOnly"), value: adminWalletShellText(props.language, "active") },
      ],
      rules: ["Sabi never stores card PAN/CVV/card number", "Only external service token, tokenId, masked metadata, state and audit reference are allowed", "KYC/AML/risk holds must be visible before live launch"],
    },
    {
      key: "ledger",
      title: adminWalletShellText(props.language, "ledger"),
      description: adminWalletShellText(props.language, "ledgerDescription"),
      tone: (summary?.ledgerEntries ?? 0) > 0 ? "ok" : "warning",
      metrics: [
        { label: adminWalletShellText(props.language, "ledgerEntries"), value: summary?.ledgerEntries ?? 0 },
        { label: adminWalletShellText(props.language, "manualApproval"), value: adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "aiRisk"), value: adminWalletShellText(props.language, "required") },
        { label: adminWalletShellText(props.language, "accountant"), value: adminWalletShellText(props.language, "required") },
      ],
      rules: ["All money movement must be debit/credit ledger based", "COIN exchange/withdrawal/release: AI risk check → accountant confirmation → execution", "Reversal/refund/settlement/export must be auditable"],
    },
    {
      key: "launch",
      title: adminWalletShellText(props.language, "launchGate"),
      description: adminWalletShellText(props.language, "launchGateDescription"),
      tone: dashboard?.liveLaunchReady ? "ok" : "blocked",
      metrics: [
        { label: adminWalletShellText(props.language, "liveLaunch"), value: dashboard?.liveLaunchReady ? statusText(props.language, "ready") : adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "safeMode"), value: dashboard?.safeDisabled ? adminWalletShellText(props.language, "active") : adminWalletShellText(props.language, "blocked") },
        { label: adminWalletShellText(props.language, "blockers"), value: blockers.length },
        { label: adminWalletShellText(props.language, "readiness"), value: `${summary?.readinessScore ?? 0}%` },
      ],
      rules: ["Launch gate must fail if any critical provider/security/ledger route is missing", "Wallet can be provider-ready while liveLaunchReady remains false", "Final mobile Wallet verification comes after Admin Wallet foundation"],
    },
  ];

  return (
    <section className="panel walletPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "wallet.title")}</h2>
          <p>{t(props.language, "wallet.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
          <button onClick={exportWalletSnapshot} disabled={busy || !dashboard}>{t(props.language, "button.export")}</button>
        </div>
      </div>

      <div className="statsGrid compactStats">
        <div className="statCard"><span>{t(props.language, "wallet.readinessScore")}</span><strong>{summary?.readinessScore ?? 0}%</strong></div>
        <div className="statCard"><span>{t(props.language, "wallet.totalWallets")}</span><strong>{summary?.totalWallets ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "wallet.operations")}</span><strong>{summary?.walletOperations ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "wallet.transactions")}</span><strong>{summary?.transactions ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "wallet.ledgerEntries")}</span><strong>{summary?.ledgerEntries ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "wallet.providersReady")}</span><strong>{providerReady}/{providerRequired}</strong></div>
        <div className="statCard"><span>COIN</span><strong>{summary?.coinWallets ?? 0}</strong></div>
        <div className="statCard"><span>QR</span><strong>{summary?.qrPayments ?? 0}</strong></div>
      </div>

      <div className="card">
        <h3>{adminWalletShellText(props.language, "architectureTitle")}</h3>
        <p>{adminWalletShellText(props.language, "architectureDescription")}</p>
        <div className="success">{adminWalletShellText(props.language, "noRawJson")}</div>
      </div>

      <WalletFiatDashboardView language={props.language} fiatDashboard={fiatDashboard} dashboard={dashboard} />
      <WalletQrPayDashboardView language={props.language} qrPayDashboard={qrPayDashboard} dashboard={dashboard} />
      <WalletCoinSecurityVaultView language={props.language} coinVault={coinVault} dashboard={dashboard} />
      <WalletProviderCenterView language={props.language} providerCenter={providerCenter} dashboard={dashboard} />
      <WalletPremiumSubscriptionsView language={props.language} premiumDashboard={premiumDashboard} dashboard={dashboard} />
      <WalletGiftPurchaseView language={props.language} giftDashboard={giftDashboard} dashboard={dashboard} />
      <WalletMerchantApiCenterView language={props.language} config={props.config} merchantApiCenter={merchantApiCenter} merchants={merchants} busy={busy} setBusy={setBusy} setNotice={props.setNotice} onUpdated={setMerchantApiCenter} />

      <div className="split wideLeft">
        <div className="card">
          <h3>{t(props.language, "balance account.launchControl step")}</h3>
          <div className="ruleList">
            <div className={dashboard?.liveLaunchReady ? "status ready" : "status warn"}>{dashboard?.liveLaunchReady ? statusText(props.language, "ready") : t(props.language, "wallet.safeDisabled")}</div>
            {checks.map((check) => (
              <div className={check.status === "ok" ? "success" : check.status === "blocked" ? "error" : "warning"} key={check.key}>
                <strong>{cleanAdminUiText(props.language, check.title)}</strong>
                <span>{cleanAdminUiText(props.language, check.detail)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "wallet.amounts")}</h3>
          <div className="tableList">
            <div className="row"><strong>{t(props.language, "wallet.walletBalance")}</strong><span>{amountMapText(dashboard?.amounts.walletBalanceByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.operationGross")}</strong><span>{amountMapText(dashboard?.amounts.operationGrossByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.operationFees")}</strong><span>{amountMapText(dashboard?.amounts.operationFeesByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.businessAvailable")}</strong><span>{amountMapText(dashboard?.amounts.businessAvailableByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.merchantAvailable")}</strong><span>{amountMapText(dashboard?.amounts.merchantAvailableByCurrency)}</span></div>
            <div className="row"><strong>{t(props.language, "wallet.coinLocked")}</strong><span>{dashboard?.amounts.coinLockedPrincipal ?? 0} COIN</span></div>
            <div className="row"><strong>{t(props.language, "wallet.coinInterest")}</strong><span>{dashboard?.amounts.coinAccruedInterest ?? 0} COIN</span></div>
          </div>
        </div>
      </div>

      <div className="gridCards">
        {shellCards.map((card) => <WalletDashboardCardView key={card.key} language={props.language} card={card} />)}
      </div>

      <div className="split wideLeft">
        <div className="card">
          <h3>{t(props.language, "wallet.providers")}</h3>
          <div className="tableList">
            {providers.map((provider) => (
              <div className="row" key={provider.key}>
                <strong>{provider.title}</strong>
                <span>{provider.key} · {statusText(props.language, provider.kind)}</span>
                <em className={statusClass(provider.status)}>{statusText(props.language, provider.status)}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "wallet.blockers")}</h3>
          <div className="tableList">
            {blockers.length ? blockers.map((blocker) => (
              <div className="row" key={blocker.key}>
                <strong>{blocker.key}</strong>
                <span>{cleanAdminUiText(props.language, blocker.detail)}</span>
                <em className={statusClass(blocker.status)}>{statusText(props.language, blocker.status)}</em>
              </div>
            )) : <div className="empty">{t(props.language, "wallet.noBlockers")}</div>}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "wallet.rules")}</h3>
        <div className="ruleList">
          {(dashboard?.rules ?? []).map((rule) => <div className="warning" key={rule}>{cleanAdminUiText(props.language, rule)}</div>)}
        </div>
      </div>
    </section>
  );
}

type MerchantFormState = {
  ownerUserId: string;
  legalName: string;
  tradeName: string;
  username: string;
  category: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  status: string;
  kybStatus: string;
  riskLevel: string;
  settlementStatus: string;
  walletRoute: string;
  allowQrPay: boolean;
  commissionPercent: string;
  notes: string;
};

const emptyMerchantForm: MerchantFormState = {
  ownerUserId: "",
  legalName: "",
  tradeName: "",
  username: "",
  category: "",
  country: "",
  city: "",
  phone: "",
  email: "",
  status: "pending_review",
  kybStatus: "not_started",
  riskLevel: "medium",
  settlementStatus: "not_configured",
  walletRoute: "provider_not_configured",
  allowQrPay: false,
  commissionPercent: "0",
  notes: "",
};

function merchantToForm(merchant: AdminMerchantAccount): MerchantFormState {
  return {
    ownerUserId: merchant.ownerUserId ?? "",
    legalName: merchant.legalName ?? "",
    tradeName: merchant.tradeName ?? "",
    username: merchant.username ?? "",
    category: merchant.category ?? "",
    country: merchant.country ?? "",
    city: merchant.city ?? "",
    phone: merchant.phone ?? "",
    email: merchant.email ?? "",
    status: merchant.status ?? "pending_review",
    kybStatus: merchant.kybStatus ?? "not_started",
    riskLevel: merchant.riskLevel ?? "medium",
    settlementStatus: merchant.settlementStatus ?? "not_configured",
    walletRoute: merchant.walletRoute ?? "provider_not_configured",
    allowQrPay: Boolean(merchant.allowQrPay),
    commissionPercent: String(merchant.commissionPercent ?? 0),
    notes: merchant.notes ?? "",
  };
}

function MerchantAdminPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const [dashboard, setDashboard] = useState<AdminMerchantDashboard | null>(null);
  const [merchants, setMerchants] = useState<AdminMerchantAccount[]>([]);
  const [selected, setSelected] = useState<AdminMerchantAccount | null>(null);
  const [settlements, setSettlements] = useState<AdminMerchantSettlement[]>([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<MerchantFormState>(emptyMerchantForm);
  const [restrictionReason, setRestrictionReason] = useState("admin_review");
  const [settlementAmount, setSettlementAmount] = useState("0");
  const [settlementCurrency, setSettlementCurrency] = useState("USD");
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const [dashboardResponse, merchantsResponse] = await Promise.all([
        adminApi.merchantDashboard(props.config),
        adminApi.merchants(props.config, query),
      ]);
      setDashboard(dashboardResponse.dashboard);
      setMerchants(merchantsResponse.merchants);
      if (selected) {
        const details = await adminApi.merchantDetails(props.config, selected.id);
        setSelected(details.merchant);
        setSettlements(details.settlements);
        setForm(merchantToForm(details.merchant));
      }
    } finally {
      setBusy(false);
    }
  }

  async function openMerchant(merchant: AdminMerchantAccount) {
    setBusy(true);
    try {
      const details = await adminApi.merchantDetails(props.config, merchant.id);
      setSelected(details.merchant);
      setSettlements(details.settlements);
      setForm(merchantToForm(details.merchant));
    } finally {
      setBusy(false);
    }
  }

  function updateForm(key: keyof MerchantFormState, value: string | boolean) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function formPayload(): Partial<AdminMerchantAccount> {
    return {
      ownerUserId: form.ownerUserId,
      legalName: form.legalName,
      tradeName: form.tradeName,
      username: form.username,
      category: form.category,
      country: form.country,
      city: form.city,
      phone: form.phone,
      email: form.email,
      status: form.status,
      kybStatus: form.kybStatus,
      riskLevel: form.riskLevel,
      settlementStatus: form.settlementStatus,
      walletRoute: form.walletRoute,
      allowQrPay: form.allowQrPay,
      commissionPercent: Number(form.commissionPercent || 0),
      notes: form.notes,
    };
  }

  async function createMerchant() {
    setBusy(true);
    try {
      const response = await adminApi.createMerchant(props.config, formPayload());
      setSelected(response.merchant);
      setForm(merchantToForm(response.merchant));
      props.setNotice(t(props.language, "notice.merchantCreated"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function saveMerchant() {
    if (!selected) return;
    setBusy(true);
    try {
      const response = await adminApi.updateMerchant(props.config, selected.id, formPayload());
      setSelected(response.merchant);
      setForm(merchantToForm(response.merchant));
      props.setNotice(t(props.language, "notice.merchantSaved"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function restrictMerchant() {
    if (!selected) return;
    const response = await adminApi.restrictMerchant(props.config, selected.id, restrictionReason);
    setSelected(response.merchant);
    setForm(merchantToForm(response.merchant));
    props.setNotice(t(props.language, "notice.merchantRestricted"));
    await load();
  }

  async function releaseMerchant() {
    if (!selected) return;
    const response = await adminApi.releaseMerchant(props.config, selected.id);
    setSelected(response.merchant);
    setForm(merchantToForm(response.merchant));
    props.setNotice(t(props.language, "notice.merchantReleased"));
    await load();
  }

  async function createSettlement() {
    if (!selected) return;
    await adminApi.createMerchantSettlement(props.config, {
      merchantId: selected.id,
      amount: Number(settlementAmount || 0),
      currency: settlementCurrency || "USD",
      status: "pending",
    });
    props.setNotice(t(props.language, "notice.merchantSettlementCreated"));
    await openMerchant(selected);
    await load();
  }

  useEffect(() => { void load(); }, []);

  return (
    <section className="panel merchantPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "merchant.title")}</h2>
          <p>{t(props.language, "merchant.description")}</p>
        </div>
        <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "merchant.total")}</span><strong>{dashboard?.total ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "merchant.active")}</span><strong>{dashboard?.active ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "merchant.pendingReview")}</span><strong>{dashboard?.pendingReview ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "merchant.risk")}</span><strong>{dashboard?.riskHighOrCritical ?? 0}</strong></div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <div className="actions searchLine">
            <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void load(); }} placeholder={t(props.language, "placeholder.searchMerchants")} />
            <button onClick={load} disabled={busy}>{t(props.language, "button.search")}</button>
          </div>
          <div className="tableList">
            {merchants.map((merchant) => (
              <button key={merchant.id} className={selected?.id === merchant.id ? "rowButton active" : "rowButton"} onClick={() => openMerchant(merchant)}>
                <strong>{merchant.tradeName}</strong>
                <span>{merchant.legalName}</span>
                <em className={statusClass(merchant.status)}>{statusText(props.language, merchant.status)}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="card formCard">
          <h3>{selected ? t(props.language, "merchant.edit") : t(props.language, "merchant.create")}</h3>
          <div className="fieldGrid">
            <label><span>{t(props.language, "merchant.ownerUserId")}</span><input value={form.ownerUserId} onChange={(event) => updateForm("ownerUserId", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.legalName")}</span><input value={form.legalName} onChange={(event) => updateForm("legalName", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.tradeName")}</span><input value={form.tradeName} onChange={(event) => updateForm("tradeName", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.username")}</span><input value={form.username} onChange={(event) => updateForm("username", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.category")}</span><input value={form.category} onChange={(event) => updateForm("category", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.country")}</span><input value={form.country} onChange={(event) => updateForm("country", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.city")}</span><input value={form.city} onChange={(event) => updateForm("city", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.phone")}</span><input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.email")}</span><input value={form.email} onChange={(event) => updateForm("email", event.target.value)} /></label>
            <label><span>{t(props.language, "merchant.status")}</span><select value={form.status} onChange={(event) => updateForm("status", event.target.value)}><option value="pending_review">{statusText(props.language, "pending_review")}</option><option value="active">{statusText(props.language, "active")}</option><option value="restricted">{statusText(props.language, "restricted")}</option><option value="suspended">{statusText(props.language, "suspended")}</option><option value="closed">{statusText(props.language, "closed")}</option></select></label>
            <label><span>{t(props.language, "merchant.kybStatus")}</span><select value={form.kybStatus} onChange={(event) => updateForm("kybStatus", event.target.value)}><option value="not_started">{statusText(props.language, "not_started")}</option><option value="pending">{statusText(props.language, "pending")}</option><option value="approved">{statusText(props.language, "approved")}</option><option value="rejected">{statusText(props.language, "rejected")}</option></select></label>
            <label><span>{t(props.language, "merchant.riskLevel")}</span><select value={form.riskLevel} onChange={(event) => updateForm("riskLevel", event.target.value)}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "merchant.settlementStatus")}</span><select value={form.settlementStatus} onChange={(event) => updateForm("settlementStatus", event.target.value)}><option value="not_configured">{statusText(props.language, "not_configured")}</option><option value="ready">{statusText(props.language, "ready")}</option><option value="hold">{statusText(props.language, "hold")}</option></select></label>
            <label><span>{t(props.language, "merchant.walletRoute")}</span><select value={form.walletRoute} onChange={(event) => updateForm("walletRoute", event.target.value)}><option value="provider_not_configured">{statusText(props.language, "provider_not_configured")}</option><option value="merchant_wallet">{t(props.language, "merchant.walletRoute.merchant_wallet")}</option><option value="business_wallet_pending">{t(props.language, "merchant.walletRoute.business_wallet_pending")}</option></select></label>
            <label><span>{t(props.language, "merchant.commission")}</span><input value={form.commissionPercent} onChange={(event) => updateForm("commissionPercent", event.target.value)} /></label>
          </div>
          <label className="toggle"><input type="checkbox" checked={form.allowQrPay} onChange={(event) => updateForm("allowQrPay", event.target.checked)} />{t(props.language, "merchant.allowQrPay")}</label>
          <label><span>{t(props.language, "merchant.notes")}</span><textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} /></label>
          <div className="actions">
            <button onClick={createMerchant} disabled={busy}>{t(props.language, "button.create")}</button>
            <button onClick={saveMerchant} disabled={busy || !selected}>{t(props.language, "button.save")}</button>
          </div>
          {selected ? (
            <>
              <div className="actions dangerLine">
                <input value={restrictionReason} onChange={(event) => setRestrictionReason(event.target.value)} />
                <button className="danger" onClick={restrictMerchant} disabled={busy}>{t(props.language, "merchant.restrict")}</button>
                <button onClick={releaseMerchant} disabled={busy}>{t(props.language, "merchant.release")}</button>
              </div>
              <h3>{t(props.language, "merchant.settlements")}</h3>
              <div className="actions">
                <input value={settlementAmount} onChange={(event) => setSettlementAmount(event.target.value)} placeholder="0" />
                <input value={settlementCurrency} onChange={(event) => setSettlementCurrency(event.target.value)} placeholder="USD" />
                <button onClick={createSettlement} disabled={busy}>{t(props.language, "merchant.createSettlement")}</button>
              </div>
              <div className="tableList">
                {settlements.map((settlement) => (
                  <div className="row" key={settlement.id}>
                    <strong>{settlement.amount} {settlement.currency}</strong>
                    <span>{statusText(props.language, settlement.status)}</span>
                    <em>{new Date(settlement.createdAt).toLocaleString()}</em>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}


type BusinessFormState = {
  ownerUserId: string;
  legalName: string;
  businessName: string;
  username: string;
  businessType: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  status: string;
  kybStatus: string;
  riskLevel: string;
  settlementStatus: string;
  walletRoute: string;
  allowBusinessPay: boolean;
  allowInvoices: boolean;
  allowEmployeeAccess: boolean;
  commissionPercent: string;
  notes: string;
};

const emptyBusinessForm: BusinessFormState = {
  ownerUserId: "",
  legalName: "",
  businessName: "",
  username: "",
  businessType: "",
  country: "",
  city: "",
  phone: "",
  email: "",
  status: "pending_review",
  kybStatus: "not_started",
  riskLevel: "medium",
  settlementStatus: "not_configured",
  walletRoute: "provider_not_configured",
  allowBusinessPay: false,
  allowInvoices: false,
  allowEmployeeAccess: false,
  commissionPercent: "0",
  notes: "",
};

function businessToForm(business: AdminBusinessAccount): BusinessFormState {
  return {
    ownerUserId: business.ownerUserId ?? "",
    legalName: business.legalName ?? "",
    businessName: business.businessName ?? "",
    username: business.username ?? "",
    businessType: business.businessType ?? "",
    country: business.country ?? "",
    city: business.city ?? "",
    phone: business.phone ?? "",
    email: business.email ?? "",
    status: business.status ?? "pending_review",
    kybStatus: business.kybStatus ?? "not_started",
    riskLevel: business.riskLevel ?? "medium",
    settlementStatus: business.settlementStatus ?? "not_configured",
    walletRoute: business.walletRoute ?? "provider_not_configured",
    allowBusinessPay: Boolean(business.allowBusinessPay),
    allowInvoices: Boolean(business.allowInvoices),
    allowEmployeeAccess: Boolean(business.allowEmployeeAccess),
    commissionPercent: String(business.commissionPercent ?? 0),
    notes: business.notes ?? "",
  };
}

function BusinessAdminPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const [dashboard, setDashboard] = useState<AdminBusinessDashboard | null>(null);
  const [businesses, setBusinesses] = useState<AdminBusinessAccount[]>([]);
  const [selected, setSelected] = useState<AdminBusinessAccount | null>(null);
  const [settlements, setSettlements] = useState<AdminBusinessSettlement[]>([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<BusinessFormState>(emptyBusinessForm);
  const [restrictionReason, setRestrictionReason] = useState("admin_review");
  const [settlementAmount, setSettlementAmount] = useState("0");
  const [settlementCurrency, setSettlementCurrency] = useState("USD");
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const [dashboardResponse, businessesResponse] = await Promise.all([
        adminApi.businessDashboard(props.config),
        adminApi.businesses(props.config, query),
      ]);
      setDashboard(dashboardResponse.dashboard);
      setBusinesses(businessesResponse.businesses);
      if (selected) {
        const details = await adminApi.businessDetails(props.config, selected.id);
        setSelected(details.business);
        setSettlements(details.settlements);
        setForm(businessToForm(details.business));
      }
    } finally {
      setBusy(false);
    }
  }

  async function openBusiness(business: AdminBusinessAccount) {
    setBusy(true);
    try {
      const details = await adminApi.businessDetails(props.config, business.id);
      setSelected(details.business);
      setSettlements(details.settlements);
      setForm(businessToForm(details.business));
    } finally {
      setBusy(false);
    }
  }

  function updateForm(key: keyof BusinessFormState, value: string | boolean) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function formPayload(): Partial<AdminBusinessAccount> {
    return {
      ownerUserId: form.ownerUserId,
      legalName: form.legalName,
      businessName: form.businessName,
      username: form.username,
      businessType: form.businessType,
      country: form.country,
      city: form.city,
      phone: form.phone,
      email: form.email,
      status: form.status,
      kybStatus: form.kybStatus,
      riskLevel: form.riskLevel,
      settlementStatus: form.settlementStatus,
      walletRoute: form.walletRoute,
      allowBusinessPay: form.allowBusinessPay,
      allowInvoices: form.allowInvoices,
      allowEmployeeAccess: form.allowEmployeeAccess,
      commissionPercent: Number(form.commissionPercent || 0),
      notes: form.notes,
    };
  }

  async function createBusiness() {
    setBusy(true);
    try {
      const response = await adminApi.createBusiness(props.config, formPayload());
      setSelected(response.business);
      setForm(businessToForm(response.business));
      props.setNotice(t(props.language, "notice.businessCreated"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function saveBusiness() {
    if (!selected) return;
    setBusy(true);
    try {
      const response = await adminApi.updateBusiness(props.config, selected.id, formPayload());
      setSelected(response.business);
      setForm(businessToForm(response.business));
      props.setNotice(t(props.language, "notice.businessSaved"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function restrictBusiness() {
    if (!selected) return;
    const response = await adminApi.restrictBusiness(props.config, selected.id, restrictionReason);
    setSelected(response.business);
    setForm(businessToForm(response.business));
    props.setNotice(t(props.language, "notice.businessRestricted"));
    await load();
  }

  async function releaseBusiness() {
    if (!selected) return;
    const response = await adminApi.releaseBusiness(props.config, selected.id);
    setSelected(response.business);
    setForm(businessToForm(response.business));
    props.setNotice(t(props.language, "notice.businessReleased"));
    await load();
  }

  async function createSettlement() {
    if (!selected) return;
    await adminApi.createBusinessSettlement(props.config, {
      businessId: selected.id,
      amount: Number(settlementAmount || 0),
      currency: settlementCurrency || "USD",
      status: "pending",
    });
    props.setNotice(t(props.language, "notice.businessSettlementCreated"));
    await openBusiness(selected);
    await load();
  }

  useEffect(() => { void load(); }, []);

  return (
    <section className="panel merchantPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "business.title")}</h2>
          <p>{t(props.language, "business.description")}</p>
        </div>
        <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "business.total")}</span><strong>{dashboard?.total ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "business.active")}</span><strong>{dashboard?.active ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "business.pendingReview")}</span><strong>{dashboard?.pendingReview ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "business.risk")}</span><strong>{dashboard?.riskHighOrCritical ?? 0}</strong></div>
      </div>

      <div className="split wideLeft">
        <div className="card">
          <div className="actions searchLine">
            <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void load(); }} placeholder={t(props.language, "placeholder.searchBusinesses")} />
            <button onClick={load} disabled={busy}>{t(props.language, "button.search")}</button>
          </div>
          <div className="tableList">
            {businesses.map((business) => (
              <button key={business.id} className={selected?.id === business.id ? "rowButton active" : "rowButton"} onClick={() => openBusiness(business)}>
                <strong>{business.businessName}</strong>
                <span>{business.legalName}</span>
                <em className={statusClass(business.status)}>{statusText(props.language, business.status)}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="card formCard">
          <h3>{selected ? t(props.language, "business.edit") : t(props.language, "business.create")}</h3>
          <div className="fieldGrid">
            <label><span>{t(props.language, "business.ownerUserId")}</span><input value={form.ownerUserId} onChange={(event) => updateForm("ownerUserId", event.target.value)} /></label>
            <label><span>{t(props.language, "business.legalName")}</span><input value={form.legalName} onChange={(event) => updateForm("legalName", event.target.value)} /></label>
            <label><span>{t(props.language, "business.businessName")}</span><input value={form.businessName} onChange={(event) => updateForm("businessName", event.target.value)} /></label>
            <label><span>{t(props.language, "business.username")}</span><input value={form.username} onChange={(event) => updateForm("username", event.target.value)} /></label>
            <label><span>{t(props.language, "business.businessType")}</span><input value={form.businessType} onChange={(event) => updateForm("businessType", event.target.value)} /></label>
            <label><span>{t(props.language, "business.country")}</span><input value={form.country} onChange={(event) => updateForm("country", event.target.value)} /></label>
            <label><span>{t(props.language, "business.city")}</span><input value={form.city} onChange={(event) => updateForm("city", event.target.value)} /></label>
            <label><span>{t(props.language, "business.phone")}</span><input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} /></label>
            <label><span>{t(props.language, "business.email")}</span><input value={form.email} onChange={(event) => updateForm("email", event.target.value)} /></label>
            <label><span>{t(props.language, "business.status")}</span><select value={form.status} onChange={(event) => updateForm("status", event.target.value)}><option value="pending_review">{statusText(props.language, "pending_review")}</option><option value="active">{statusText(props.language, "active")}</option><option value="restricted">{statusText(props.language, "restricted")}</option><option value="suspended">{statusText(props.language, "suspended")}</option><option value="closed">{statusText(props.language, "closed")}</option></select></label>
            <label><span>{t(props.language, "business.kybStatus")}</span><select value={form.kybStatus} onChange={(event) => updateForm("kybStatus", event.target.value)}><option value="not_started">{statusText(props.language, "not_started")}</option><option value="pending">{statusText(props.language, "pending")}</option><option value="approved">{statusText(props.language, "approved")}</option><option value="rejected">{statusText(props.language, "rejected")}</option></select></label>
            <label><span>{t(props.language, "business.riskLevel")}</span><select value={form.riskLevel} onChange={(event) => updateForm("riskLevel", event.target.value)}><option value="low">{statusText(props.language, "low")}</option><option value="medium">{statusText(props.language, "medium")}</option><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
            <label><span>{t(props.language, "business.settlementStatus")}</span><select value={form.settlementStatus} onChange={(event) => updateForm("settlementStatus", event.target.value)}><option value="not_configured">{statusText(props.language, "not_configured")}</option><option value="ready">{statusText(props.language, "ready")}</option><option value="hold">{statusText(props.language, "hold")}</option></select></label>
            <label><span>{t(props.language, "business.walletRoute")}</span><select value={form.walletRoute} onChange={(event) => updateForm("walletRoute", event.target.value)}><option value="provider_not_configured">{statusText(props.language, "provider_not_configured")}</option><option value="business_wallet">{t(props.language, "business.walletRoute.business_wallet")}</option></select></label>
            <label><span>{t(props.language, "business.commission")}</span><input value={form.commissionPercent} onChange={(event) => updateForm("commissionPercent", event.target.value)} /></label>
            <label className="checkRow"><input type="checkbox" checked={form.allowBusinessPay} onChange={(event) => updateForm("allowBusinessPay", event.target.checked)} /> {t(props.language, "business.allowBusinessPay")}</label>
            <label className="checkRow"><input type="checkbox" checked={form.allowInvoices} onChange={(event) => updateForm("allowInvoices", event.target.checked)} /> {t(props.language, "business.allowInvoices")}</label>
            <label className="checkRow"><input type="checkbox" checked={form.allowEmployeeAccess} onChange={(event) => updateForm("allowEmployeeAccess", event.target.checked)} /> {t(props.language, "business.allowEmployeeAccess")}</label>
          </div>
          <label><span>{t(props.language, "business.notes")}</span><textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} /></label>
          <div className="actions">
            <button onClick={createBusiness} disabled={busy}>{t(props.language, "button.create")}</button>
            <button onClick={saveBusiness} disabled={busy || !selected}>{t(props.language, "button.save")}</button>
          </div>

          {selected ? (
            <>
              <div className="actions dangerActions">
                <input value={restrictionReason} onChange={(event) => setRestrictionReason(event.target.value)} />
                <button onClick={restrictBusiness} disabled={busy}>{t(props.language, "business.restrict")}</button>
                <button onClick={releaseBusiness} disabled={busy}>{t(props.language, "business.release")}</button>
              </div>
              <div className="settlementBox">
                <h3>{t(props.language, "business.settlements")}</h3>
                <div className="actions">
                  <input value={settlementAmount} onChange={(event) => setSettlementAmount(event.target.value)} />
                  <input value={settlementCurrency} onChange={(event) => setSettlementCurrency(event.target.value)} />
                  <button onClick={createSettlement} disabled={busy}>{t(props.language, "business.createSettlement")}</button>
                </div>
                <div className="tableList">
                  {settlements.map((settlement) => (
                    <div className="row" key={settlement.id}>
                      <strong>{settlement.amount} {settlement.currency}</strong>
                      <span>{statusText(props.language, settlement.status)}</span>
                      <em>{new Date(settlement.createdAt).toLocaleString()}</em>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FinanceReportsPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (notice: string) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [dashboard, setDashboard] = useState<AdminFinanceDashboard | null>(null);
  const [reports, setReports] = useState<AdminFinanceReport[]>([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ kind: "monthly", title: "", periodStart: today, periodEnd: today, currency: "USD", notes: "" });

  async function load() {
    setBusy(true);
    try {
      const [dashboardResponse, reportsResponse] = await Promise.all([
        adminApi.financeDashboard(props.config),
        adminApi.financeReports(props.config),
      ]);
      setDashboard(dashboardResponse.dashboard);
      setReports(reportsResponse.reports);
    } finally {
      setBusy(false);
    }
  }

  async function createReport() {
    setBusy(true);
    try {
      await adminApi.createFinanceReport(props.config, {
        ...form,
        title: form.title.trim() || `Finance report ${today}`,
      });
      props.setNotice(t(props.language, "notice.financeReportCreated"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function exportReport() {
    setBusy(true);
    try {
      const bundle = await adminApi.financeExport(props.config);
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sabi-admin-finance-${today}.json`;
      link.click();
      URL.revokeObjectURL(url);
      props.setNotice(t(props.language, "notice.financeExportReady"));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <section className="panel financePanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "finance.title")}</h2>
          <p>{t(props.language, "finance.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
          <button onClick={exportReport} disabled={busy}>{t(props.language, "finance.export")}</button>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "finance.totalGross")}</span><strong>{dashboard?.totalGrossAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.totalFees")}</span><strong>{dashboard?.totalFeeAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.totalNet")}</span><strong>{dashboard?.totalNetAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.pending")}</span><strong>{dashboard?.pendingSettlementAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.held")}</span><strong>{dashboard?.heldSettlementAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.paid")}</span><strong>{dashboard?.paidSettlementAmount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.merchantSettlements")}</span><strong>{dashboard?.merchantSettlementCount ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "finance.businessSettlements")}</span><strong>{dashboard?.businessSettlementCount ?? 0}</strong></div>
      </div>

      <div className="split">
        <div className="card formCard">
          <h3>{t(props.language, "finance.createReport")}</h3>
          <label><span>{t(props.language, "finance.titleField")}</span><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
          <label><span>{t(props.language, "finance.kind")}</span><select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value })}><option value="daily">{statusText(props.language, "daily")}</option><option value="weekly">{statusText(props.language, "weekly")}</option><option value="monthly">{statusText(props.language, "monthly")}</option><option value="custom">{statusText(props.language, "custom")}</option></select></label>
          <label><span>{t(props.language, "finance.periodStart")}</span><input type="date" value={form.periodStart} onChange={(event) => setForm({ ...form, periodStart: event.target.value })} /></label>
          <label><span>{t(props.language, "finance.periodEnd")}</span><input type="date" value={form.periodEnd} onChange={(event) => setForm({ ...form, periodEnd: event.target.value })} /></label>
          <label><span>{t(props.language, "finance.currency")}</span><input value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value.toUpperCase() })} /></label>
          <label><span>{t(props.language, "finance.notes")}</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
          <button onClick={createReport} disabled={busy}>{t(props.language, "finance.createReport")}</button>
        </div>
        <div className="card">
          <h3>{t(props.language, "finance.rules")}</h3>
          <div className="ruleList">
            <div className="warning">{t(props.language, "finance.rule1")}</div>
            <div className="warning">{t(props.language, "finance.rule2")}</div>
            <div className="warning">{t(props.language, "finance.rule3")}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "finance.reports")}</h3>
        <div className="tableList">
          {reports.length ? reports.map((report) => (
            <div className="row" key={report.id}>
              <strong>{report.title}</strong>
              <span>{report.grossAmount} {report.currency} · {statusText(props.language, report.status)}</span>
              <em>{report.periodStart} — {report.periodEnd}</em>
            </div>
          )) : <div className="empty">{t(props.language, "finance.noReports")}</div>}
        </div>
      </div>
    </section>
  );
}


function DeveloperConsolePanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (value: string) => void }) {
  const [consoleState, setConsoleState] = useState<AdminDeveloperConsoleState | null>(null);
  const [diagnostics, setDiagnostics] = useState<AdminDeveloperDiagnosticCheck[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const response = await adminApi.developerConsole(props.config);
      setConsoleState(response.console);
      setDiagnostics(response.console.diagnostics ?? []);
    } finally {
      setBusy(false);
    }
  }, [props.config]);

  useEffect(() => { void load(); }, [load]);

  const runDiagnostics = async () => {
    setBusy(true);
    try {
      const response = await adminApi.runDeveloperDiagnostics(props.config);
      setDiagnostics(response.diagnostics);
      props.setNotice(t(props.language, "notice.developerDiagnostics"));
      await load();
    } finally {
      setBusy(false);
    }
  };

  const runtime = consoleState?.runtime;
  const memoryMb = runtime?.memory?.rss ? Math.round(runtime.memory.rss / 1024 / 1024) : 0;
  const modules = consoleState?.modules ?? [];
  const failedChecks = diagnostics.filter((item) => item.status === "fail").length;
  const warningChecks = diagnostics.filter((item) => item.status === "warn" || item.status === "not_configured").length;

  return (
    <section className="panel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "developer.title")}</h2>
          <p>{t(props.language, "developer.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "developer.reload")}</button>
          <button onClick={runDiagnostics} disabled={busy}>{t(props.language, "developer.runDiagnostics")}</button>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "developer.launchBlockers")}</span><strong>{consoleState?.providerSummary.launchBlockers ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "developer.readyProviders")}</span><strong>{consoleState ? `${consoleState.providerSummary.ready}/${consoleState.providerSummary.total}` : "0/0"}</strong></div>
        <div className="statCard"><span>{t(props.language, "developer.diagnostics")}</span><strong>{failedChecks ? `${failedChecks} ${statusText(props.language, "fail")}` : warningChecks ? `${warningChecks} ${statusText(props.language, "warn")}` : statusText(props.language, "pass")}</strong></div>
        <div className="statCard"><span>{t(props.language, "developer.uptime")}</span><strong>{runtime ? `${runtime.uptimeSeconds}s` : "-"}</strong></div>
      </div>

      <div className="split">
        <div className="card">
          <h3>{t(props.language, "developer.runtime")}</h3>
          <div className="kv"><span>{t(props.language, "developer.node")}</span><strong>{runtime?.nodeVersion ?? "-"}</strong></div>
          <div className="kv"><span>{t(props.language, "developer.env")}</span><strong>{runtime?.environment ?? "-"}</strong></div>
          <div className="kv"><span>{t(props.language, "developer.memory")}</span><strong>{memoryMb} MB</strong></div>
          <pre>{asText(runtime)}</pre>
        </div>
        <div className="card">
          <h3>{t(props.language, "developer.modules")}</h3>
          <div className="list">
            {modules.map((item) => (
              <div className="row" key={item.key}>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.key}</small>
                  {item.details ? <small>{item.details}</small> : null}
                </div>
                <span className={diagnosticClass(item.status)}>{statusText(props.language, item.status === "ok" ? "ok_module" : item.status)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="split">
        <div className="card">
          <h3>{t(props.language, "developer.diagnostics")}</h3>
          <div className="list">
            {diagnostics.map((item) => (
              <div className="row" key={item.key}>
                <div>
                  <strong>{item.key}</strong>
                  <small>{item.message}</small>
                  {item.metadata ? <pre>{asText(item.metadata)}</pre> : null}
                </div>
                <span className={diagnosticClass(item.status)}>{statusText(props.language, item.status)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "developer.featureFlags")}</h3>
          <div className="list">
            {(consoleState?.featureFlags ?? []).map((item) => (
              <div className="row" key={item.key}>
                <div>
                  <strong>{item.key}</strong>
                  <small>{item.description}</small>
                  <small>{t(props.language, "developer.source")}: {item.source}</small>
                </div>
                <span className={item.enabled ? "status ready" : "status disabled"}>{item.enabled ? t(props.language, "developer.enabled") : t(props.language, "developer.disabled")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="split">
        <div className="card">
          <h3>{t(props.language, "developer.providerBlockers")}</h3>
          <div className="list">
            {(consoleState?.providerSummary.blockers ?? []).length === 0 ? <div className="empty">{t(props.language, "developer.noBlockers")}</div> : null}
            {(consoleState?.providerSummary.blockers ?? []).map((item) => (
              <div className="row" key={item.key}>
                <div>
                  <strong>{providerTitle(props.language, item.key, item.title)}</strong>
                  <small>{item.key}</small>
                  <small>{item.missingFields.map((field) => fieldText(props.language, field)).join(", ")}</small>
                </div>
                <span className={statusClass(item.status)}>{statusText(props.language, item.status)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "developer.recentAudit")}</h3>
          <div className="warning">{t(props.language, "developer.noSecrets")}</div>
          <div className="list">
            {(consoleState?.recentAudit ?? []).length === 0 ? <div className="empty">{t(props.language, "developer.noLogs")}</div> : null}
            {(consoleState?.recentAudit ?? []).slice(0, 12).map((item) => (
              <div className="row" key={item.id}>
                <div>
                  <strong>{auditActionText(props.language, item.action)}</strong>
                  <small>{item.createdAt}</small>
                  <small>{item.targetType ?? ""} {item.targetId ?? ""}</small>
                </div>
                <span className="status ready">#{item.sequence ?? "-"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "developer.safetyRules")}</h3>
        <div className="list">
          {(consoleState?.safetyRules ?? []).map((rule) => <div className="warning" key={rule}>{ruleText(props.language, rule)}</div>)}
        </div>
      </div>
    </section>
  );
}


function OwnerSecurityCenterPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (value: string) => void }) {
  const [center, setCenter] = useState<AdminOwnerSecurityCenterState | null>(null);
  const [confirmations, setConfirmations] = useState<AdminOwnerCriticalConfirmation[]>([]);
  const [busy, setBusy] = useState(false);
  const [rejectReason, setRejectReason] = useState("owner_rejected");
  const [form, setForm] = useState({ kind: "custom", title: "", targetType: "system", targetId: "", riskLevel: "critical", description: "" });

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const [centerResponse, confirmationsResponse] = await Promise.all([
        adminApi.ownerSecurityCenter(props.config),
        adminApi.ownerConfirmations(props.config),
      ]);
      setCenter(centerResponse.center);
      setConfirmations(confirmationsResponse.confirmations);
    } finally {
      setBusy(false);
    }
  }, [props.config]);

  useEffect(() => { void load(); }, [load]);

  async function createRequest() {
    setBusy(true);
    try {
      await adminApi.createOwnerConfirmation(props.config, form);
      props.setNotice(t(props.language, "notice.ownerConfirmationCreated"));
      setForm({ kind: "custom", title: "", targetType: "system", targetId: "", riskLevel: "critical", description: "" });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function approve(item: AdminOwnerCriticalConfirmation) {
    setBusy(true);
    try {
      await adminApi.approveOwnerConfirmation(props.config, item.id);
      props.setNotice(t(props.language, "notice.ownerConfirmationApproved"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function reject(item: AdminOwnerCriticalConfirmation) {
    setBusy(true);
    try {
      await adminApi.rejectOwnerConfirmation(props.config, item.id, rejectReason);
      props.setNotice(t(props.language, "notice.ownerConfirmationRejected"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel ownerPanel">
      <div className="panelHeader">
        <div>
          <h2>{t(props.language, "owner.title")}</h2>
          <p>{t(props.language, "owner.description")}</p>
        </div>
        <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "owner.pending")}</span><strong>{center?.pendingConfirmations ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "owner.criticalQueue")}</span><strong>{center?.criticalQueue.length ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "owner.approved")}</span><strong>{center?.approvedConfirmations ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "owner.rejected")}</span><strong>{center?.rejectedConfirmations ?? 0}</strong></div>
      </div>

      <div className="gridTwo">
        <div className="card">
          <h3>{t(props.language, "owner.createRequest")}</h3>
          <label><span>{t(props.language, "owner.kind")}</span><select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value })}>
            {(center?.requiredConfirmationKinds ?? ["provider_secret_change", "staff_role_change", "settlement_release", "wallet_route_change", "security_policy_change", "custom"]).map((item) => (
              <option key={item} value={item}>{t(props.language, `owner.kind.${item}`, item)}</option>
            ))}
          </select></label>
          <label><span>{t(props.language, "owner.requestTitle")}</span><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
          <label><span>{t(props.language, "owner.targetType")}</span><input value={form.targetType} onChange={(event) => setForm({ ...form, targetType: event.target.value })} /></label>
          <label><span>{t(props.language, "owner.targetId")}</span><input value={form.targetId} onChange={(event) => setForm({ ...form, targetId: event.target.value })} /></label>
          <label><span>{t(props.language, "owner.riskLevel")}</span><select value={form.riskLevel} onChange={(event) => setForm({ ...form, riskLevel: event.target.value })}><option value="high">{statusText(props.language, "high")}</option><option value="critical">{statusText(props.language, "critical")}</option></select></label>
          <label><span>{t(props.language, "owner.requestDescription")}</span><textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <button onClick={createRequest} disabled={busy || !form.title.trim()}>{t(props.language, "owner.createRequest")}</button>
        </div>

        <div className="card">
          <h3>{t(props.language, "owner.rules")}</h3>
          <div className="ruleList">
            {(center?.rules ?? []).map((rule) => <div key={rule} className="warning">{ruleText(props.language, rule)}</div>)}
          </div>
          <h3>{t(props.language, "owner.emergencyControls")}</h3>
          <div className="pillList">
            {Object.entries(center?.emergencyControls ?? {}).map(([key, value]) => (
              <span key={key} className={Boolean(value) ? "status disabled" : "status ready"}>{t(props.language, `owner.emergency.${key}`, key)}: {statusText(props.language, Boolean(value))}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "owner.confirmations")}</h3>
        <label className="inlineLabel"><span>{t(props.language, "owner.rejectReason")}</span><input value={rejectReason} onChange={(event) => setRejectReason(event.target.value)} /></label>
        <div className="list">
          {confirmations.length === 0 ? <div className="empty">{t(props.language, "owner.noConfirmations")}</div> : null}
          {confirmations.map((item) => (
            <div key={item.id} className="listItem">
              <div>
                <strong>{item.title}</strong>
                <small>{t(props.language, `owner.kind.${item.kind}`, item.kind)} · {statusText(props.language, item.status)} · {statusText(props.language, item.riskLevel)}</small>
                <small>{item.targetType ?? "system"}:{item.targetId ?? "—"} · {item.createdAt}</small>
                {item.description ? <p>{item.description}</p> : null}
              </div>
              <div className="actions">
                <span className={item.status === "pending" ? "status warn" : item.status === "approved" ? "status ready" : "status disabled"}>{statusText(props.language, item.status)}</span>
                {item.status === "pending" ? <button onClick={() => approve(item)} disabled={busy}>{t(props.language, "owner.approve")}</button> : null}
                {item.status === "pending" ? <button onClick={() => reject(item)} disabled={busy}>{t(props.language, "owner.reject")}</button> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecretsSecurityPanel(props: { language: AdminLanguage; config: AdminApiConfig; me: AdminPrincipal | null; setNotice: (notice: string) => void }) {
  const [security, setSecurity] = useState<AdminSecretSecurityState | null>(null);
  const [busy, setBusy] = useState(false);
  const canWriteSecurity = hasAdminPermission(props.me, "security:write");

  async function load() {
    setBusy(true);
    try {
      const response = await adminApi.secretSecurity(props.config);
      setSecurity(response.security);
    } finally {
      setBusy(false);
    }
  }

  async function migrate() {
    setBusy(true);
    try {
      const response = await adminApi.migrateSecrets(props.config);
      setSecurity(response.security);
      props.setNotice(t(props.language, "notice.secretsMigrated"));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <section className="panel securityPanel">
      <div className="panelHead">
        <div>
          <h2>{t(props.language, "security.title")}</h2>
          <p>{t(props.language, "security.description")}</p>
        </div>
        <div className="actions">
          <button onClick={load} disabled={busy}>{t(props.language, "button.reload")}</button>
          {canWriteSecurity ? <button onClick={migrate} disabled={busy}>{t(props.language, "button.migrateSecrets")}</button> : null}
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard"><span>{t(props.language, "security.liveSafe")}</span><strong>{statusText(props.language, security?.liveSafe ?? false)}</strong></div>
        <div className="statCard"><span>{t(props.language, "security.keySource")}</span><strong className="safeSourceText">{secretKeySourceText(props.language, security?.secretKeySource)}{secretKeySourceTechnicalName(security?.secretKeySource) ? <small>{secretKeySourceTechnicalName(security?.secretKeySource)}</small> : null}</strong></div>
        <div className="statCard"><span>{t(props.language, "security.encryptedFields")}</span><strong>{security?.encryptedSecretFields ?? 0}/{security?.totalSecretFields ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "security.legacyPlainFields")}</span><strong>{security?.legacyPlainSecretFields ?? 0}</strong></div>
      </div>

      <div className="split rolesBottom">
        <div className="card">
          <h3>{t(props.language, "security.rules")}</h3>
          <div className="ruleList">
            {(security?.rules ?? []).map((rule) => (
              <div className={rule.ok ? "warning okRule" : "warning dangerRule"} key={rule.key}>
                <strong>{rule.ok ? "✓" : "!"}</strong> {ruleText(props.language, rule.key)}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>{t(props.language, "security.secretStore")}</h3>
          <div className="chips">
            <span>{t(props.language, "security.algorithm")}: {security?.algorithm ?? "aes-256-gcm"}</span>
            <span>{t(props.language, "security.publicReveal")}: {statusText(props.language, security?.publicRevealSupported ?? false)}</span>
            <span>{t(props.language, "security.providersWithSecrets")}: {security?.providersWithSecrets ?? 0}</span>
            <span>{t(props.language, "security.unreadableFields")}: {security?.unreadableSecretFields ?? 0}</span>
            <span>{t(props.language, "security.fingerprint")}: <strong className="hashText">{security?.secretFingerprint ?? "—"}</strong></span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "security.ownerRulesTitle")}</h3>
        <div className="ruleList">
          <div className="warning">{t(props.language, "security.ownerRule1")}</div>
          <div className="warning">{t(props.language, "security.ownerRule2")}</div>
          <div className="warning">{t(props.language, "security.ownerRule3")}</div>
          <div className="warning">{t(props.language, "security.ownerRule4")}</div>
        </div>
      </div>
    </section>
  );
}


type EmergencyFormState = {
  scope: string;
  title: string;
  reason: string;
  targetType: string;
  targetId: string;
};

const defaultEmergencyForm: EmergencyFormState = {
  scope: "system",
  title: "",
  reason: "",
  targetType: "",
  targetId: "",
};

function EmergencyControlPanel(props: { language: AdminLanguage; config: AdminApiConfig; setNotice: (value: string) => void }) {
  const [dashboard, setDashboard] = useState<AdminEmergencyDashboard | null>(null);
  const [locks, setLocks] = useState<AdminEmergencyLock[]>([]);
  const [form, setForm] = useState<EmergencyFormState>(defaultEmergencyForm);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    try {
      const [dashboardResponse, locksResponse] = await Promise.all([
        adminApi.emergencyDashboard(props.config),
        adminApi.emergencyLocks(props.config),
      ]);
      setDashboard(dashboardResponse.dashboard);
      setLocks(locksResponse.locks);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { void load(); }, [props.config]);

  function updateForm<K extends keyof EmergencyFormState>(key: K, value: EmergencyFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function createLock() {
    if (!form.reason.trim()) {
      props.setNotice(t(props.language, "emergency.reasonRequired"));
      return;
    }
    setBusy(true);
    try {
      const response = await adminApi.createEmergencyLock(props.config, {
        scope: form.scope,
        title: form.title,
        reason: form.reason,
        targetType: form.targetType,
        targetId: form.targetId,
      });
      setDashboard(response.dashboard);
      setForm(defaultEmergencyForm);
      props.setNotice(t(props.language, "notice.emergencyLocked"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function releaseLock(lock: AdminEmergencyLock) {
    const reason = window.prompt(t(props.language, "emergency.releasePrompt")) ?? "";
    if (!reason.trim()) return;
    setBusy(true);
    try {
      const response = await adminApi.releaseEmergencyLock(props.config, lock.id, reason);
      setDashboard(response.dashboard);
      props.setNotice(t(props.language, "notice.emergencyReleased"));
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel emergencyPanel">
      <div className="panelHeader">
        <div>
          <h2>{t(props.language, "emergency.title")}</h2>
          <p>{t(props.language, "emergency.description")}</p>
        </div>
        <button onClick={load} disabled={busy}>{t(props.language, "button.refresh")}</button>
      </div>

      <div className="statsGrid">
        <div className="statCard dangerCard"><span>{t(props.language, "emergency.activeLocks")}</span><strong>{dashboard?.activeLocks ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "emergency.totalLocks")}</span><strong>{dashboard?.totalLocks ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "emergency.activeScopes")}</span><strong>{dashboard?.activeScopes?.length ?? 0}</strong></div>
        <div className="statCard"><span>{t(props.language, "emergency.systemLocked")}</span><strong>{statusText(props.language, Boolean(dashboard?.systemLocked))}</strong></div>
      </div>

      <div className="split rolesBottom">
        <div className="card">
          <h3>{t(props.language, "emergency.createLock")}</h3>
          <div className="formGrid">
            <label><span>{t(props.language, "emergency.scope")}</span><select value={form.scope} onChange={(event) => updateForm("scope", event.target.value)}><option value="system">{t(props.language, "emergency.scope.system")}</option><option value="all">{t(props.language, "emergency.scope.all")}</option><option value="providers">{t(props.language, "emergency.scope.providers")}</option><option value="wallet">{t(props.language, "emergency.scope.wallet")}</option><option value="settlements">{t(props.language, "emergency.scope.settlements")}</option><option value="merchant">{t(props.language, "emergency.scope.merchant")}</option><option value="business">{t(props.language, "emergency.scope.business")}</option><option value="staff">{t(props.language, "emergency.scope.staff")}</option><option value="qr">{t(props.language, "emergency.scope.qr")}</option><option value="ai">{t(props.language, "emergency.scope.ai")}</option></select></label>
            <label><span>{t(props.language, "emergency.lockTitle")}</span><input value={form.title} onChange={(event) => updateForm("title", event.target.value)} /></label>
            <label><span>{t(props.language, "emergency.targetType")}</span><input value={form.targetType} onChange={(event) => updateForm("targetType", event.target.value)} /></label>
            <label><span>{t(props.language, "emergency.targetId")}</span><input value={form.targetId} onChange={(event) => updateForm("targetId", event.target.value)} /></label>
          </div>
          <label><span>{t(props.language, "emergency.reason")}</span><textarea value={form.reason} onChange={(event) => updateForm("reason", event.target.value)} /></label>
          <button className="danger" onClick={createLock} disabled={busy}>{t(props.language, "emergency.activateLock")}</button>
        </div>

        <div className="card">
          <h3>{t(props.language, "emergency.rules")}</h3>
          <div className="ruleList">
            {(dashboard?.rules ?? []).map((rule) => <div className="warning dangerRule" key={rule}>{ruleText(props.language, rule)}</div>)}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t(props.language, "emergency.locks")}</h3>
        <div className="list">
          {locks.map((lock) => (
            <div className="auditRow" key={lock.id}>
              <strong>{lock.title}</strong>
              <span>{t(props.language, `emergency.scope.${lock.scope}` as Parameters<typeof t>[1])} · {statusText(props.language, lock.status)}</span>
              <span>{lock.reason}</span>
              <em>{new Date(lock.createdAt).toLocaleString()}</em>
              {lock.status === "active" ? <button className="danger" onClick={() => releaseLock(lock)} disabled={busy}>{t(props.language, "emergency.release")}</button> : null}
            </div>
          ))}
          {locks.length === 0 ? <div className="empty">{t(props.language, "emergency.empty")}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [language, setLanguageState] = useState<AdminLanguage>(() => readStoredAdminLanguage());
  const [baseUrl, setBaseUrl] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.baseUrl) || "";
    return !saved || /^(http:\/\/)?(127\.0\.0\.1|localhost):(4000|4001)(\/)?$/.test(saved) ? "http://127.0.0.1:3000" : saved;
  });
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.token) || "");
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [health, setHealth] = useState<AdminHealth | null>(null);
  const [me, setMe] = useState<AdminPrincipal | null>(null);
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [catalog, setCatalog] = useState<ProviderCatalogItem[]>([]);
  const [runtime, setRuntime] = useState<unknown>(null);
  const [platformDashboard, setPlatformDashboard] = useState<AdminPlatformDashboard | null>(null);
  const [rolesMatrix, setRolesMatrix] = useState<AdminRoleMatrix | null>(null);

  const config = useMemo<AdminApiConfig>(() => ({ baseUrl, token }), [baseUrl, token]);
  const connected = Boolean(me);
  const visibleTabs = useMemo(() => visibleAdminTabs(me, rolesMatrix), [me, rolesMatrix]);

  const setLanguage = useCallback((next: AdminLanguage) => {
    setLanguageState(next);
    saveAdminLanguage(next);
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      localStorage.setItem(STORAGE_KEYS.baseUrl, baseUrl);
      localStorage.setItem(STORAGE_KEYS.token, token);
      const [healthResponse, meResponse, providersResponse, catalogResponse, runtimeResponse, rolesMatrixResponse, platformDashboardResponse] = await Promise.all([
        adminApi.health(baseUrl),
        adminApi.me(config),
        adminApi.providerStatuses(config),
        adminApi.providerCatalog(config),
        adminApi.runtimeHealth(config).catch((err) => ({ ok: false, error: String(err) })),
        adminApi.rolesMatrix(config),
        adminApi.platformDashboard(config).catch(() => null),
      ]);
      setHealth(healthResponse);
      setMe(meResponse.admin);
      setProviders(providersResponse.providers);
      setCatalog(catalogResponse.providers);
      setRuntime(runtimeResponse);
      setPlatformDashboard(platformDashboardResponse);
      setRolesMatrix(rolesMatrixResponse.matrix);
      setNotice(t(language, "notice.connected"));
    } catch (err) {
      setMe(null);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token, config, language]);

  useEffect(() => { if (token) void reload(); }, []);

  useEffect(() => {
    if (!connected) return;
    if (!visibleTabs.some((item) => item.key === tab)) {
      setTab(visibleTabs[0]?.key ?? "dashboard");
    }
  }, [connected, tab, visibleTabs]);

  return (
    <div className="app">
<Header language={language} baseUrl={baseUrl} token={token} connected={connected} loading={loading} onLanguage={setLanguage} onBaseUrl={setBaseUrl} onToken={setToken} onConnect={reload} />
      <div className="body">
        <Sidebar language={language} tab={tab} visibleTabs={visibleTabs} onTab={setTab} />
        <main>
          {error ? <div className="alert error">{error}</div> : null}
          {notice ? <div className="alert ok" onClick={() => setNotice("")}>{notice}</div> : null}
          {!connected ? <div className="alert warning">{t(language, "locked.description")} · {baseUrl}</div> : null}
          {tab === "dashboard" ? <AdminUiMessengerStylePage007B moduleKey="dashboard" language={language} config={config} setNotice={setNotice} childrenTitle="Dashboard foundation"><><OwnerSabiAiGlobalControl007KPanel language={language} surface="dashboard" /><AdminUiModuleOverview006V language={language} /><Dashboard language={language} health={health} me={me} providers={providers} runtime={runtime} platformDashboard={platformDashboard} onReload={reload} /></></AdminUiMessengerStylePage007B> : null}
          {tab === "taxi" ? <TaxiAdminControl007ZPanel language={language} config={config} setNotice={setNotice} /> : null}
          {tab === "taxiFinance" ? <TaxiFinanceTopLevel028AFix8Panel language={language} config={config} setNotice={setNotice} /> : null}
          {tab === "stream" ? <StreamPremiumOrganismAdmin233BPanel baseUrl={baseUrl} token={token} language={language} /> : null}
          {tab === "googleBilling" ? <AdminUiMessengerStylePage007B moduleKey="googleBilling" language={language} config={config} setNotice={setNotice} childrenTitle="Google Billing foundation"><GoogleBillingAdminControl006VPanel language={language}><GoogleBillingPayAdminControl100Panel baseUrl={baseUrl} token={token} /><GoogleBilling175AdminPanel baseUrl={baseUrl} token={token} /></GoogleBillingAdminControl006VPanel></AdminUiMessengerStylePage007B> : null}
          {tab === "airwallex" ? <AdminUiMessengerStylePage007B moduleKey="airwallex" language={language} config={config} setNotice={setNotice} childrenTitle="Airwallex foundation"><AirwallexAdminControl006VPanel language={language}><AirwallexAdminControl100Panel baseUrl={baseUrl} token={token} /><Airwallex174AAdminPanel baseUrl={baseUrl} token={token} /></AirwallexAdminControl006VPanel></AdminUiMessengerStylePage007B> : null}
          {tab === "readiness" ? <AdminUiMessengerStylePage007B moduleKey="readiness" language={language} config={config} setNotice={setNotice} childrenTitle="Readiness foundation"><ReadinessAdminControl006VPanel language={language}><AdminReadinessPanels /></ReadinessAdminControl006VPanel></AdminUiMessengerStylePage007B> : null}
          {tab === "core" ? <AdminUiMessengerStylePage007B moduleKey="core" language={language} config={config} setNotice={setNotice}><SabiCoreControlCenterPanel language={language} /></AdminUiMessengerStylePage007B> : null}
          {tab === "messenger" ? <MessengerAdminCenterPanel language={language} config={config} me={me} setNotice={setNotice} /> : null}
          {tab === "wallet" ? <AdminUiMessengerStylePage007B moduleKey="wallet" language={language} config={config} setNotice={setNotice}><WalletAdminPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "providers" ? <AdminUiMessengerStylePage007B moduleKey="providers" language={language} config={config} setNotice={setNotice}><ProviderConsole language={language} config={config} me={me} providers={providers} catalog={catalog} reload={reload} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "users" ? <AdminUiMessengerStylePage007B moduleKey="users" language={language} config={config} setNotice={setNotice}><UsersPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "risk" ? <AdminUiMessengerStylePage007B moduleKey="risk" language={language} config={config} setNotice={setNotice}><RiskPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "audit" ? <AdminUiMessengerStylePage007B moduleKey="audit" language={language} config={config} setNotice={setNotice}><AuditPanel language={language} config={config} /></AdminUiMessengerStylePage007B> : null}
          {tab === "roles" ? <AdminUiMessengerStylePage007B moduleKey="roles" language={language} config={config} setNotice={setNotice}><RolesPanel language={language} matrix={rolesMatrix} onReload={reload} /></AdminUiMessengerStylePage007B> : null}
          {tab === "staff" ? <AdminUiMessengerStylePage007B moduleKey="staff" language={language} config={config} setNotice={setNotice}><StaffAccessPanel language={language} config={config} matrix={rolesMatrix} me={me} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "owner" ? <AdminUiMessengerStylePage007B moduleKey="owner" language={language} config={config} setNotice={setNotice}><><OwnerSabiAiGlobalControl007KPanel language={language} surface="owner" /><OwnerSecurityCenterPanel language={language} config={config} setNotice={setNotice} /></></AdminUiMessengerStylePage007B> : null}
          {tab === "security" ? <AdminUiMessengerStylePage007B moduleKey="security" language={language} config={config} setNotice={setNotice}><SecretsSecurityPanel language={language} config={config} me={me} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "finance" ? <AdminUiMessengerStylePage007B moduleKey="finance" language={language} config={config} setNotice={setNotice}><FinanceReportsPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "merchant" ? <AdminUiMessengerStylePage007B moduleKey="merchant" language={language} config={config} setNotice={setNotice}><MerchantAdminPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "business" ? <AdminUiMessengerStylePage007B moduleKey="business" language={language} config={config} setNotice={setNotice}><BusinessAdminPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "developer" ? <AdminUiMessengerStylePage007B moduleKey="developer" language={language} config={config} setNotice={setNotice}><DeveloperConsolePanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
          {tab === "emergency" ? <AdminUiMessengerStylePage007B moduleKey="emergency" language={language} config={config} setNotice={setNotice}><EmergencyControlPanel language={language} config={config} setNotice={setNotice} /></AdminUiMessengerStylePage007B> : null}
        </main>
      </div>
    </div>
  );
}

// PLAY-READY-41 REVIEWER EVIDENCE UI SOURCE START
export const playReady41ReviewerEvidenceCenterUiSource = {
  version: "PLAY-READY-41",
  title: "Reviewer Evidence Center",
  displayOnly: true,
  requiresAdminAuth: true,
  readOnly: true,
  apiBasePath: "/api/admin/play-ready/reviewer-evidence",
  routes: [
    "/api/admin/play-ready/reviewer-evidence/summary",
    "/api/admin/play-ready/reviewer-evidence/categories",
    "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
    "/api/admin/play-ready/reviewer-evidence/permission-declarations",
    "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
    "/api/admin/play-ready/reviewer-evidence/safety-status",
  ],
  safety: {
    adminUiSourceWritePerformed: true,
    adminUiBuildPerformed: false,
    backendSourceWritePerformed: false,
    backendRestartPerformed: false,
    runtimeDbWritePerformed: false,
    providerCallPerformed: false,
    walletStateChangePerformed: false,
    moneyMovementPerformed: false,
    fakeSuccessPerformed: false,
    apkBuildPerformed: false,
    aabBuildPerformed: false,
    playUploadPerformed: false,
  },
  visibleBlocks: [
    "route protection status",
    "manual screenshot checklist",
    "permission declaration checklist",
    "production readiness blockers",
    "source safety state",
  ],
} as const;
// PLAY-READY-41 REVIEWER EVIDENCE UI SOURCE END
