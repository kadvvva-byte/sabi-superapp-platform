import type { SabiRelease245RFix3Report } from './sabiRelease245RFix3.types';

export const sabiRelease245RFix3Report: SabiRelease245RFix3Report = {
  "version": "SABI-RELEASE-245R-FIX3-CLOUD-BUILD-LOGS-READ-ONLY-NO-DEPLOY-NO-DNS-NO-SMS-NO-WALLET",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245r-fix3-cloud-build-logs-read-only-no-deploy-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "scope": "245R_FIX3_read_only_cloud_build_logs_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet",
  "createdAt": "2026-06-22T23:32:19.718Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "latestBuildId": "",
  "observations": {
    "gcloudVersion": {
      "name": "gcloud_version",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "gcloudProject": {
      "name": "gcloud_project",
      "command": "gcloud config get-value project 2>$null",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "gcloudAccount": {
      "name": "gcloud_active_account",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "buildsListJson": {
      "name": "cloud_build_recent_builds_json",
      "command": "gcloud builds list --project sabi-official-prod --limit=5 --sort-by=~createTime --format=json 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    },
    "buildsListTable": {
      "name": "cloud_build_recent_builds_table",
      "command": "gcloud builds list --project sabi-official-prod --limit=5 --sort-by=~createTime",
      "status": 0,
      "stdout": "",
      "stderr": "Listed 0 items.",
      "ok": true
    },
    "cloudRunServicesReadOnly": {
      "name": "cloud_run_services_read_only",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "latestBuildDescribe": {
    "name": "cloud_build_latest_describe",
    "command": "gcloud builds describe <missing>",
    "status": -1,
    "stdout": "",
    "stderr": "latestBuildId missing",
    "ok": false
  },
  "latestBuildLog": {
    "name": "cloud_build_latest_log",
    "command": "gcloud builds log <missing>",
    "status": -1,
    "stdout": "",
    "stderr": "latestBuildId missing",
    "ok": false
  },
  "likelyCauses": {
    "dockerfileSyntax": false,
    "dockerBuildCopyMissing": false,
    "nginxImagePullBlocked": false,
    "artifactRegistryOrBuilderPermission": false,
    "cloudBuildTimeoutOrQuota": false,
    "architectureOrPlatform": false
  },
  "readiness": {
    "release245RFix3Readiness": 0,
    "previous245RFix2Readiness": 100,
    "cloudBuildLogsDiagnosticReadiness": 0,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "officialWebsiteServerExecutionReadiness": 0,
    "liveDomainDnsChangedNow": 0,
    "smsLiveReadiness": 0,
    "firebaseCallNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "readOnlyDiagnosticOnly": true,
    "noCloudRunDeployNow": true,
    "noCloudRunServiceCreateNow": true,
    "noDomainDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "noPublicDomainLaunchClaimNow": true,
    "ownerExactApprovalRequiredBeforeNextLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [
    "cloud_run_build_failure_requires_log_based_fix",
    "cloud_run_deploy_retry_waiting_after_fix",
    "custom_domain_mapping_later_only_after_cloud_run_url",
    "sms_later_only_after_site_domain",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245R_FIX4_apply_log_based_cloud_build_fix_then_retry_deploy_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245RFix3Report;
