import type { SabiRelease245OInventoryReport } from './sabiRelease245OInventory.types';

export const sabiRelease245OInventoryReport: SabiRelease245OInventoryReport = {
  "version": "SABI-RELEASE-245O-OFFICIAL-SITE-GOOGLE-CLOUD-EMAIL-DNS-SMS-RUNTIME-INVENTORY-NO-LIVE-MUTATION",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245o-official-site-google-cloud-email-dns-sms-runtime-inventory-no-live-mutation",
  "approvalFlagProvided": true,
  "scope": "245O_inventory_only_no_live_mutation_no_secret_read_no_deploy_no_dns_change_no_sms",
  "createdAt": "2026-06-22T22:57:33.596Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "previous245NPresent": true,
  "siteUiPresent": true,
  "siteIndexPresent": true,
  "siteEnIndexPresent": true,
  "siteRobotsPresent": true,
  "siteSitemapPresent": true,
  "siteFix75CheckPresent": true,
  "observations": {
    "gcloudCommand": {
      "name": "gcloud_command",
      "status": 0,
      "stdout": "C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.ps1",
      "stderr": "",
      "ok": true
    },
    "gcloudVersion": {
      "name": "gcloud_version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "gcloudProject": {
      "name": "gcloud_project",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "gcloudActiveAccount": {
      "name": "gcloud_active_account",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "cloudRunServices": {
      "name": "cloud_run_services_read_only",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "dnsA": {
      "name": "dns_a_sabiai_app_read_only",
      "status": 0,
      "stdout": "{\r\n    \"IP4Address\":  \"162.255.119.191\",\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  1,\r\n    \"CharacterSet\":  1,\r\n    \"Section\":  1,\r\n    \"DataLength\":  4,\r\n    \"TTL\":  1800,\r\n    \"Address\":  \"162.255.119.191\",\r\n    \"IPAddress\":  \"162.255.119.191\",\r\n    \"QueryType\":  1\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsCname": {
      "name": "dns_cname_sabiai_app_read_only",
      "status": 0,
      "stdout": "{\r\n    \"PrimaryServer\":  \"pdns1.registrar-servers.com\",\r\n    \"NameAdministrator\":  \"hostmaster.registrar-servers.com\",\r\n    \"SerialNumber\":  1782165282,\r\n    \"TimeToZoneRefresh\":  43200,\r\n    \"TimeToZoneFailureRetry\":  3600,\r\n    \"TimeToExpiration\":  604800,\r\n    \"DefaultTTL\":  3601,\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  6,\r\n    \"CharacterSet\":  1,\r\n    \"Section\":  2,\r\n    \"DataLength\":  40,\r\n    \"TTL\":  3601,\r\n    \"QueryType\":  6,\r\n    \"Administrator\":  \"hostmaster.registrar-servers.com\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMx": {
      "name": "dns_mx_sabiai_app_read_only",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"NameExchange\":  \"smtp.google.com\",\r\n        \"Preference\":  1,\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  1,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  3600,\r\n        \"QueryType\":  15,\r\n        \"Exchange\":  \"smtp.google.com\"\r\n    },\r\n    {\r\n        \"IP4Address\":  \"142.251.127.26\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  4,\r\n        \"TTL\":  232,\r\n        \"Address\":  \"142.251.127.26\",\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"QueryType\":  1\r\n    },\r\n    {\r\n        \"IP4Address\":  \"142.251.127.27\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  4,\r\n        \"TTL\":  232,\r\n        \"Address\":  \"142.251.127.27\",\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"QueryType\":  1\r\n    },\r\n    {\r\n        \"IP6Address\":  \"2a00:1450:4001:c21::1a\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  94,\r\n        \"Address\":  \"2a00:1450:4001:c21::1a\",\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1a\",\r\n        \"QueryType\":  28\r\n    },\r\n    {\r\n        \"IP6Address\":  \"2a00:1450:4001:c21::1b\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  94,\r\n        \"Address\":  \"2a00:1450:4001:c21::1b\",\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1b\",\r\n        \"QueryType\":  28\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTxt": {
      "name": "dns_txt_sabiai_app_read_only",
      "status": 0,
      "stdout": "{\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ],\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"CharacterSet\":  1,\r\n    \"Section\":  1,\r\n    \"DataLength\":  16,\r\n    \"TTL\":  3600,\r\n    \"QueryType\":  16,\r\n    \"Text\":  [\r\n                 \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n             ]\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "blockers": [
    "live_deploy_requires_separate_exact_owner_approval",
    "domain_dns_mutation_requires_owner_approval_and_dns_provider_access",
    "email_mx_spf_dkim_dmarc_mutation_requires_owner_approval_and_email_provider_values",
    "sms_live_provider_or_firebase_phone_auth_requires_owner_approval",
    "wallet_payment_payout_still_locked_until_site_email_sms_ready"
  ],
  "readiness": {
    "release245OInventoryReadiness": 100,
    "previous245NReadiness": 100,
    "siteUiLocalPresenceReadiness": 100,
    "googleCloudInventoryReadiness": 100,
    "officialWebsiteServerExecutionReadiness": 0,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "liveDomainDnsChangedNow": 0,
    "officialDomainEmailLiveReadiness": 0,
    "liveEmailDnsChangedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "noLiveGoogleCloudDeployNow": true,
    "noCloudRunServiceCreateNow": true,
    "noDomainDnsMutationNow": true,
    "noLiveEmailDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noSmsProviderCallNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "noRuntimeMountNow": true,
    "noPublicLaunchClaimNow": true,
    "noSecretRevealNow": true,
    "ownerExactApprovalRequiredBeforeLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "requiredBefore245POrLiveExecution": [
    "confirm_owner_approved_gcp_project_id",
    "confirm_owner_approved_region",
    "confirm_cloud_run_service_name_sabi_official_site",
    "confirm_site_build_context_and_start_command",
    "confirm_domain_dns_provider_access",
    "confirm_email_provider_and_mx_spf_dkim_dmarc_values",
    "confirm_firebase_phone_auth_or_sms_provider_values",
    "confirm_separate_exact_owner_live_execution_phrase"
  ],
  "nextStep": "245P_official_site_google_cloud_deploy_pre_execution_plan_or_fix_245o_inventory_blockers_no_wallet_payment_payout"
} as unknown as SabiRelease245OInventoryReport;
