import type { SabiRelease245PPreExecutionPlanReport } from './sabiRelease245PPreExecutionPlan.types';

export const sabiRelease245PPreExecutionPlanReport: SabiRelease245PPreExecutionPlanReport = {
  "version": "SABI-RELEASE-245P-OFFICIAL-SITE-CLOUD-RUN-PRE-EXECUTION-PLAN-NO-LIVE-DEPLOY-NO-DNS-NO-SMS-NO-WALLET",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245p-official-site-cloud-run-pre-execution-plan-no-live-deploy-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "scope": "245P_pre_execution_plan_only_no_api_enablement_no_live_deploy_no_dns_no_sms_no_wallet",
  "createdAt": "2026-06-22T23:00:56.192Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "previous245OInventoryPresent": true,
  "siteFiles": {
    "siteUi": true,
    "indexHtml": true,
    "indexEnHtml": true,
    "robotsTxt": true,
    "sitemapXml": true,
    "appJs": true,
    "appEnJs": true,
    "stylesCss": true,
    "fix75Check": true
  },
  "siteQualityMarkers": {
    "containsCompanyName": true,
    "containsOfficialDomain": true,
    "containsSabiMessenger": true,
    "noTelegramText": true,
    "noDonationText": false
  },
  "observations": {
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
    "gcloudAccount": {
      "name": "gcloud_active_account",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "enabledServices": {
      "name": "enabled_services_read_only",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudtrace.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "cloudRunRegions": {
      "name": "cloud_run_regions_read_only",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "cloudRunServicesEuropeWest1": {
      "name": "cloud_run_services_europe_west1_read_only",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "dnsA": {
      "name": "dns_a_sabiai_app_read_only",
      "status": 0,
      "stdout": "{\r\n    \"IP4Address\":  \"162.255.119.191\",\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  1,\r\n    \"CharacterSet\":  1,\r\n    \"Section\":  1,\r\n    \"DataLength\":  4,\r\n    \"TTL\":  1597,\r\n    \"Address\":  \"162.255.119.191\",\r\n    \"IPAddress\":  \"162.255.119.191\",\r\n    \"QueryType\":  1\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMx": {
      "name": "dns_mx_sabiai_app_read_only",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"NameExchange\":  \"smtp.google.com\",\r\n        \"Preference\":  1,\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  1,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  3397,\r\n        \"QueryType\":  15,\r\n        \"Exchange\":  \"smtp.google.com\"\r\n    },\r\n    {\r\n        \"IP4Address\":  \"142.251.127.26\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  4,\r\n        \"TTL\":  29,\r\n        \"Address\":  \"142.251.127.26\",\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"QueryType\":  1\r\n    },\r\n    {\r\n        \"IP4Address\":  \"142.251.127.27\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  4,\r\n        \"TTL\":  29,\r\n        \"Address\":  \"142.251.127.27\",\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"QueryType\":  1\r\n    },\r\n    {\r\n        \"IP6Address\":  \"2a00:1450:4001:c21::1a\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  255,\r\n        \"Address\":  \"2a00:1450:4001:c21::1a\",\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1a\",\r\n        \"QueryType\":  28\r\n    },\r\n    {\r\n        \"IP6Address\":  \"2a00:1450:4001:c21::1b\",\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"CharacterSet\":  1,\r\n        \"Section\":  3,\r\n        \"DataLength\":  16,\r\n        \"TTL\":  255,\r\n        \"Address\":  \"2a00:1450:4001:c21::1b\",\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1b\",\r\n        \"QueryType\":  28\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTxt": {
      "name": "dns_txt_sabiai_app_read_only",
      "status": 0,
      "stdout": "{\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ],\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"CharacterSet\":  1,\r\n    \"Section\":  1,\r\n    \"DataLength\":  16,\r\n    \"TTL\":  3397,\r\n    \"QueryType\":  16,\r\n    \"Text\":  [\r\n                 \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n             ]\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "apiStatus": {
    "run.googleapis.com": false,
    "cloudbuild.googleapis.com": false,
    "artifactregistry.googleapis.com": false,
    "iam.googleapis.com": false,
    "serviceusage.googleapis.com": true
  },
  "blockers": [
    "api_not_enabled_run.googleapis.com",
    "api_not_enabled_cloudbuild.googleapis.com",
    "api_not_enabled_artifactregistry.googleapis.com",
    "api_not_enabled_iam.googleapis.com",
    "actual_api_enablement_requires_separate_owner_approval",
    "actual_cloud_run_deploy_requires_separate_owner_approval",
    "actual_domain_mapping_and_dns_mutation_requires_separate_owner_approval",
    "sms_live_still_locked_until_separate_owner_approval",
    "wallet_payment_payout_still_locked_until_site_email_sms_ready"
  ],
  "plannedCommandsReferenceOnly": [
    "gcloud config set project sabi-official-prod",
    "gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com serviceusage.googleapis.com",
    "cd C:\\Users\\User\\Desktop\\superapp\\site-ui",
    "gcloud run deploy sabi-official-site --source . --region europe-west1 --allow-unauthenticated",
    "gcloud run services describe sabi-official-site --region europe-west1 --format=\"value(status.url)\""
  ],
  "readiness": {
    "release245PPreExecutionPlanReadiness": 100,
    "previous245OInventoryReadiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "siteUiDeployContextStaticReadiness": 100,
    "requiredApisEnabledReadiness": 0,
    "officialWebsiteServerExecutionReadiness": 0,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "liveDomainDnsChangedNow": 0,
    "officialDomainEmailLiveReadiness": 90,
    "liveEmailDnsChangedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "noApiEnablementNow": true,
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
    "ownerExactApprovalRequiredBeforeLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "nextStep": "245Q_enable_required_google_cloud_apis_or_245Q_cloud_run_deploy_execution_requires_separate_exact_owner_approval_no_sms_no_wallet"
} as unknown as SabiRelease245PPreExecutionPlanReport;
