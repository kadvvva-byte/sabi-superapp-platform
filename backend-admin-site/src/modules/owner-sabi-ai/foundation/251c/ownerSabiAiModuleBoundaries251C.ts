import type { OwnerSabiAiModuleBoundaries251C } from './ownerSabiAiContracts251C.types';

export const ownerSabiAiModuleBoundaries251C = {
  "version": "SABI-RELEASE-251C-SERVER-MODULE-BOUNDARIES-READ-ONLY-HEALTH-CONTRACTS",
  "code": "OWNER_SABI_AI_SERVER_MODULE_BOUNDARIES_251C",
  "status": "local_contract_only",
  "root": "src/modules/owner-sabi-ai/foundation/251c",
  "principle": "Owner Sabi AI may read health, readiness, risk, policy and evidence summaries; it may not mutate production state without exact Owner approval.",
  "modules": [
    {
      "moduleKey": "official_site",
      "displayName": "Official public site",
      "readOnlyHealthScope": [
        "http_status",
        "domain_mapping_status",
        "public_contact_visibility",
        "legal_policy_visibility"
      ],
      "allowedReadinessFields": [
        "websiteLiveReadiness",
        "domainReadiness",
        "publicContactReadiness",
        "legalReadiness"
      ],
      "forbiddenActions": [
        "dns_mutation",
        "cloud_run_deploy_without_owner_approval",
        "publish_unverified_contact"
      ]
    },
    {
      "moduleKey": "official_domain_email",
      "displayName": "Official domain email",
      "readOnlyHealthScope": [
        "mx_readiness",
        "spf_readiness",
        "dkim_readiness",
        "dmarc_readiness",
        "manual_send_receive_proof"
      ],
      "allowedReadinessFields": [
        "emailDnsReadiness",
        "emailLiveProofReadiness",
        "publicMailboxReadiness"
      ],
      "forbiddenActions": [
        "mailbox_creation_without_owner_approval",
        "dns_mutation_without_owner_approval",
        "publish_unverified_email"
      ]
    },
    {
      "moduleKey": "owner_sabi_ai",
      "displayName": "Owner Sabi AI",
      "readOnlyHealthScope": [
        "policy_kernel",
        "training_kernel",
        "language_kernel",
        "evidence_policy",
        "daily_report_template"
      ],
      "allowedReadinessFields": [
        "authorityPolicyReadiness",
        "trainingKernelReadiness",
        "languageKernelReadiness",
        "evidencePolicyReadiness"
      ],
      "forbiddenActions": [
        "autonomous_final_punishment",
        "autonomous_money_movement",
        "autonomous_provider_mutation"
      ]
    },
    {
      "moduleKey": "server_foundation",
      "displayName": "Server foundation",
      "readOnlyHealthScope": [
        "module_boundary_contracts",
        "read_only_health_contracts",
        "runtime_mount_status"
      ],
      "allowedReadinessFields": [
        "foundationPreflightReadiness",
        "contractReadiness",
        "runtimeMountReadiness"
      ],
      "forbiddenActions": [
        "db_mutation",
        "secret_manager_read_write",
        "runtime_mount_without_owner_approval"
      ]
    },
    {
      "moduleKey": "admin_ui",
      "displayName": "Admin UI",
      "readOnlyHealthScope": [
        "language_integrity",
        "role_scope_integrity",
        "owner_report_visibility"
      ],
      "allowedReadinessFields": [
        "adminUiReadiness",
        "languageReadiness",
        "accessScopeReadiness"
      ],
      "forbiddenActions": [
        "staff_access_expansion_without_owner_approval",
        "unsafe_role_escalation"
      ]
    },
    {
      "moduleKey": "mobile_app",
      "displayName": "Mobile app",
      "readOnlyHealthScope": [
        "firebase_config_presence",
        "package_bundle_alignment",
        "phone_auth_policy_status"
      ],
      "allowedReadinessFields": [
        "mobileConfigReadiness",
        "authConfigReadiness",
        "smsReadiness"
      ],
      "forbiddenActions": [
        "firebase_user_deletion",
        "live_sms_without_owner_approval",
        "secret_exposure"
      ]
    },
    {
      "moduleKey": "finance_wallet_payment_payout",
      "displayName": "Finance / Wallet / payment / payout",
      "readOnlyHealthScope": [
        "locked_status",
        "provider_connection_status",
        "owner_approval_status"
      ],
      "allowedReadinessFields": [
        "financePlanningReadiness",
        "providerLockReadiness",
        "ownerApprovalGateReadiness"
      ],
      "forbiddenActions": [
        "money_movement",
        "payment_capture",
        "payout_release",
        "wallet_mutation"
      ]
    },
    {
      "moduleKey": "taxi_stream_marketplace_programs",
      "displayName": "Taxi / Stream / Marketplace / programs",
      "readOnlyHealthScope": [
        "module_readiness",
        "kyc_aml_gate_status",
        "owner_sabi_ai_control_status"
      ],
      "allowedReadinessFields": [
        "moduleReadiness",
        "kycAmlGateReadiness",
        "ownerSabiAiControlReadiness"
      ],
      "forbiddenActions": [
        "provider_runtime_mutation",
        "db_runtime_mutation",
        "public_claim_without_proof"
      ]
    }
  ]
} satisfies OwnerSabiAiModuleBoundaries251C;
