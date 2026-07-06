import type {
  OwnerSabiAiAdminPreviewModel251D,
  OwnerSabiAiDailyReportSample251D,
  OwnerSabiAiDailyReportShell251D,
} from './ownerSabiAiDailyReportShell251D.types';

export const ownerSabiAiDailyReportShell251D = {
  "version": "SABI-RELEASE-251D-ADMIN-VISIBLE-OWNER-SABI-AI-DAILY-REPORT-SHELL",
  "code": "OWNER_SABI_AI_DAILY_REPORT_SHELL_251D",
  "status": "local_admin_visible_shell_only",
  "mountedNow": false,
  "adminRouteConnectedNow": false,
  "runtimeDataConnectedNow": false,
  "ownerOnlyFinalVisibility": true,
  "title": {
    "ru": "Ежедневный отчёт Owner Sabi AI",
    "en": "Owner Sabi AI Daily Report",
    "zh": "Owner Sabi AI 每日报告",
    "uz": "Owner Sabi AI kunlik hisoboti"
  },
  "visibilityModel": {
    "owner": {
      "canSeeFullReport": true,
      "canApproveFinalActions": true,
      "readinessPercent": 100
    },
    "ownerSabiAi": {
      "canPrepareReport": true,
      "canRecommend": true,
      "canExecuteFinalActions": false,
      "readinessPercent": 100
    },
    "deputy": {
      "canSeeAssignedOperationalSectionsOnly": true,
      "canApproveFinalActions": false,
      "readinessPercent": 80
    },
    "staff": {
      "canSeeOnlyFunctionScopedItems": true,
      "canApproveFinalActions": false,
      "readinessPercentRange": "10-50"
    }
  },
  "sections": [
    {
      "key": "company_and_bank_ready_base",
      "order": 10,
      "severity": "green",
      "titleRu": "Компания, сайт и банковая готовность",
      "titleEn": "Company, website and bank readiness",
      "purpose": "Show official website/domain/email proof and bank-facing readiness.",
      "cards": [
        {
          "key": "official_site_live",
          "labelRu": "Официальный сайт",
          "readinessField": "officialWebsiteReadiness",
          "currentReadiness": 100
        },
        {
          "key": "official_domain_email",
          "labelRu": "Доменная почта",
          "readinessField": "officialDomainEmailReadiness",
          "currentReadiness": 100
        },
        {
          "key": "public_contact_admin",
          "labelRu": "Публичный контакт admin@sabiai.app",
          "readinessField": "publicContactReadiness",
          "currentReadiness": 100
        },
        {
          "key": "info_email_paused",
          "labelRu": "info@sabiai.app не опубликован",
          "readinessField": "infoEmailSafePausedReadiness",
          "currentReadiness": 100
        }
      ]
    },
    {
      "key": "server_and_owner_sabi_ai_foundation",
      "order": 20,
      "severity": "green",
      "titleRu": "Серверная основа и Owner Sabi AI",
      "titleEn": "Server foundation and Owner Sabi AI",
      "purpose": "Show policy/training kernel and read-only health contract state.",
      "cards": [
        {
          "key": "server_ai_preflight",
          "labelRu": "Server/AI preflight",
          "readinessField": "serverAiPreflightReadiness",
          "currentReadiness": 100
        },
        {
          "key": "owner_sabi_ai_kernel",
          "labelRu": "Policy/training kernel",
          "readinessField": "ownerSabiAiKernelReadiness",
          "currentReadiness": 100
        },
        {
          "key": "read_only_health_contracts",
          "labelRu": "Read-only health contracts",
          "readinessField": "healthContractsReadiness",
          "currentReadiness": 100
        },
        {
          "key": "runtime_connection",
          "labelRu": "Runtime connection",
          "readinessField": "runtimeConnectionReadiness",
          "currentReadiness": 0
        }
      ]
    },
    {
      "key": "risk_and_compliance",
      "order": 30,
      "severity": "yellow",
      "titleRu": "Риски, KYC/AML и доказательства",
      "titleEn": "Risk, KYC/AML and evidence",
      "purpose": "Prepare private Owner visibility over fraud, AML, corruption, abuse and evidence readiness.",
      "cards": [
        {
          "key": "kyc_aml_policy",
          "labelRu": "KYC/AML policy",
          "readinessField": "kycAmlReadiness",
          "currentReadiness": 100
        },
        {
          "key": "evidence_policy",
          "labelRu": "Evidence policy",
          "readinessField": "evidencePolicyReadiness",
          "currentReadiness": 100
        },
        {
          "key": "urgent_alerts",
          "labelRu": "Urgent Owner alerts shell",
          "readinessField": "urgentAlertShellReadiness",
          "currentReadiness": 100
        },
        {
          "key": "runtime_risk_scan",
          "labelRu": "Runtime risk scan",
          "readinessField": "runtimeRiskScanReadiness",
          "currentReadiness": 0
        }
      ]
    },
    {
      "key": "module_readiness",
      "order": 40,
      "severity": "yellow",
      "titleRu": "Готовность модулей",
      "titleEn": "Module readiness",
      "purpose": "Show module readiness percentages without touching runtime or DB.",
      "cards": [
        {
          "key": "admin_ui",
          "labelRu": "Admin UI shell",
          "readinessField": "adminUiShellReadiness",
          "currentReadiness": 100
        },
        {
          "key": "mobile_app",
          "labelRu": "Mobile app foundation reference",
          "readinessField": "mobileFoundationReferenceReadiness",
          "currentReadiness": 100
        },
        {
          "key": "taxi_stream_marketplace",
          "labelRu": "Taxi/Stream/Marketplace references",
          "readinessField": "programReferencesReadiness",
          "currentReadiness": 100
        },
        {
          "key": "finance_wallet_payment_payout_locked",
          "labelRu": "Finance/Wallet/Payment/Payout locks",
          "readinessField": "financeLocksReadiness",
          "currentReadiness": 100
        }
      ]
    },
    {
      "key": "owner_decisions_required",
      "order": 50,
      "severity": "red",
      "titleRu": "Решения владельца",
      "titleEn": "Owner decisions required",
      "purpose": "Clearly separate prepared recommendations from final Owner decisions.",
      "cards": [
        {
          "key": "runtime_mount_approval_required",
          "labelRu": "Runtime mount requires Owner approval",
          "readinessField": "ownerRuntimeApprovalGateReadiness",
          "currentReadiness": 100
        },
        {
          "key": "db_secret_provider_locked",
          "labelRu": "DB/secret/provider actions locked",
          "readinessField": "unsafeMutationLockReadiness",
          "currentReadiness": 100
        },
        {
          "key": "money_actions_locked",
          "labelRu": "Money/payment/payout actions locked",
          "readinessField": "moneyActionLockReadiness",
          "currentReadiness": 100
        },
        {
          "key": "info_email_alias_pending",
          "labelRu": "info@sabiai.app alias proof pending",
          "readinessField": "infoAliasProofReadiness",
          "currentReadiness": 0
        }
      ]
    }
  ],
  "reportStates": [
    "draft",
    "owner_review_required",
    "owner_approved",
    "archived"
  ],
  "allowedActionsIn251D": [
    "render_shell",
    "prepare_local_json",
    "prepare_local_types",
    "prepare_static_preview_shape"
  ],
  "forbiddenActionsIn251D": [
    "runtime_route_mount",
    "cloud_run_deploy",
    "dns_mutation",
    "firebase_user_deletion",
    "secret_manager_env_read_write",
    "db_mutation",
    "google_pay_billing",
    "wallet_payment_payout",
    "provider_mutation",
    "live_email_send"
  ]
} satisfies OwnerSabiAiDailyReportShell251D;

export const ownerSabiAiAdminPreviewModel251D = {
  "version": "SABI-RELEASE-251D-ADMIN-VISIBLE-OWNER-SABI-AI-DAILY-REPORT-SHELL",
  "code": "OWNER_SABI_AI_ADMIN_PREVIEW_MODEL_251D",
  "status": "local_preview_shape_only",
  "routeSuggestionNotMounted": "/admin/owner-sabi-ai/daily-report",
  "componentSuggestionNotConnected": "OwnerSabiAiDailyReportShell",
  "visibleBlocks": [
    {
      "key": "company_and_bank_ready_base",
      "order": 10,
      "severity": "green",
      "titleRu": "Компания, сайт и банковая готовность",
      "titleEn": "Company, website and bank readiness",
      "cardCount": 4
    },
    {
      "key": "server_and_owner_sabi_ai_foundation",
      "order": 20,
      "severity": "green",
      "titleRu": "Серверная основа и Owner Sabi AI",
      "titleEn": "Server foundation and Owner Sabi AI",
      "cardCount": 4
    },
    {
      "key": "risk_and_compliance",
      "order": 30,
      "severity": "yellow",
      "titleRu": "Риски, KYC/AML и доказательства",
      "titleEn": "Risk, KYC/AML and evidence",
      "cardCount": 4
    },
    {
      "key": "module_readiness",
      "order": 40,
      "severity": "yellow",
      "titleRu": "Готовность модулей",
      "titleEn": "Module readiness",
      "cardCount": 4
    },
    {
      "key": "owner_decisions_required",
      "order": 50,
      "severity": "red",
      "titleRu": "Решения владельца",
      "titleEn": "Owner decisions required",
      "cardCount": 4
    }
  ],
  "emptyState": {
    "ru": "Runtime ещё не подключён. Отчёт подготовлен как локальная оболочка.",
    "en": "Runtime is not connected yet. This report is prepared as a local shell.",
    "zh": "运行时尚未连接。该报告目前是本地外壳。",
    "uz": "Runtime hali ulanmagan. Hisobot lokal qobiq sifatida tayyorlangan."
  },
  "ownerDecisionBanner": {
    "ru": "Финальные действия выполняются только после решения владельца.",
    "en": "Final actions are executed only after Owner decision.",
    "zh": "最终操作仅在所有者决定后执行。",
    "uz": "Yakuniy harakatlar faqat egasining qaroridan keyin bajariladi."
  }
} satisfies OwnerSabiAiAdminPreviewModel251D;

export const ownerSabiAiDailyReportSample251D = {
  "version": "SABI-RELEASE-251D-ADMIN-VISIBLE-OWNER-SABI-AI-DAILY-REPORT-SHELL",
  "code": "OWNER_SABI_AI_DAILY_REPORT_SAMPLE_251D",
  "status": "static_local_sample_only",
  "generatedAt": "2026-06-23T18:49:24.535Z",
  "reportId": "LOCAL-OWNER-SABI-AI-DAILY-REPORT-SHELL-251D",
  "riskLevel": "yellow",
  "finalActionsExecuted": false,
  "ownerActionRequired": true,
  "summaryRu": "Сайт и доменная почта готовы. Owner Sabi AI kernel и read-only контракты готовы. Runtime подключение, DB, secrets, Wallet/payment/payout остаются закрыты до отдельного решения владельца.",
  "readiness": {
    "officialWebsiteLive": 100,
    "officialDomainEmailProof": 100,
    "publicContactAdminOnSite": 100,
    "ownerSabiAiKernel": 100,
    "readOnlyHealthContracts": 100,
    "adminVisibleDailyReportShell": 100,
    "realRuntimeConnection": 0,
    "infoEmailAliasProof": 0,
    "dbSecretProviderMutation": 0,
    "walletPaymentPayoutMutation": 0
  },
  "blockers": [
    "Real runtime Owner Sabi AI connection requires separate Owner approval.",
    "info@sabiai.app remains paused until alias/group/mailbox proof passes."
  ],
  "evidencePrepared": [
    "249C bank-ready site/email proof summary",
    "250B-FIX1 public site admin contact proof",
    "251B Owner Sabi AI policy/training kernel",
    "251C/FIX1 module boundary and read-only health contracts"
  ]
} satisfies OwnerSabiAiDailyReportSample251D;
