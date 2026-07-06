import type { SabiRelease245RFix2Report } from './sabiRelease245RFix2.types';

export const sabiRelease245RFix2Report: SabiRelease245RFix2Report = {
  "version": "SABI-RELEASE-245R-FIX2-RETRY-CLOUD-RUN-DEPLOY-AFTER-BUCKET-IAM-FIX-NO-DNS-NO-SMS-NO-WALLET",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245r-fix2-retry-cloud-run-deploy-after-bucket-iam-fix-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalScopeUsed": [
    "245R deploy official site Cloud Run approval",
    "245R-FIX1 source bucket permission approval for deploy retry"
  ],
  "scope": "245R_FIX2_retry_cloud_run_deploy_after_bucket_iam_fix_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:29:35.254Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "cloudRunServiceUrl": "",
  "deployContext": "C:\\Users\\User\\Desktop\\superapp\\.data\\release\\245r\\deploy-context",
  "siteFiles": {
    "siteUi": true,
    "indexHtml": true,
    "indexEnHtml": true,
    "robotsTxt": true,
    "sitemapXml": true,
    "appJs": true,
    "appEnJs": true,
    "stylesCss": true
  },
  "observationsBefore": {
    "gcloudVersion": {
      "name": "gcloud_version_before",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "gcloudProject": {
      "name": "gcloud_project_before",
      "command": "gcloud config get-value project 2>$null",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "gcloudAccount": {
      "name": "gcloud_active_account_before",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "cloudRunServicesBefore": {
      "name": "cloud_run_services_before",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "deployResult": {
    "name": "cloud_run_deploy_retry_official_site",
    "command": "gcloud run deploy sabi-official-site --source \"C:\\Users\\User\\Desktop\\superapp\\.data\\release\\245r\\deploy-context\" --project sabi-official-prod --region europe-west1 --platform managed --allow-unauthenticated --quiet",
    "status": 1,
    "stdout": "",
    "stderr": "Building using Dockerfile and deploying container to Cloud Run service [sabi-official-site] in project [sabi-official-prod] region [europe-west1]\r\nBuilding and deploying new service...\r\nValidating configuration.........done\r\nUploading sources.............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................done\r\nBuilding Container.......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed\r\nDeployment failed\r\nERROR: (gcloud.run.deploy) Build failed; check build logs for details",
    "ok": false
  },
  "observationsAfter": {
    "serviceDescribe": {
      "name": "cloud_run_service_describe_after_retry",
      "command": "gcloud run services describe sabi-official-site --region europe-west1 --project sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "serviceUrl": {
      "name": "cloud_run_service_url_after_retry",
      "command": "gcloud run services describe sabi-official-site --region europe-west1 --project sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "cloudRunServicesAfter": {
      "name": "cloud_run_services_after_retry",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "healthCheck": {
    "name": "cloud_run_public_url_http_check",
    "command": "Invoke-WebRequest <serviceUrl>",
    "status": -1,
    "stdout": "",
    "stderr": "serviceUrl missing",
    "ok": false
  },
  "healthzCheck": {
    "name": "cloud_run_healthz_check",
    "command": "Invoke-WebRequest <serviceUrl>/healthz",
    "status": -1,
    "stdout": "",
    "stderr": "serviceUrl missing",
    "ok": false
  },
  "readiness": {
    "release245RFix2Readiness": 0,
    "previous245RFix1Readiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "siteUiDeployContextReadiness": 100,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "officialWebsiteServerExecutionReadiness": 0,
    "cloudRunUrlReadiness": 0,
    "liveDomainDnsChangedNow": 0,
    "officialDomainMappedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "firebaseCallNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "cloudRunDeployRetryExecutedWithOwnerApproval245RAnd245RFix1": false,
    "cloudRunServiceCreateAllowedByOwner245R": true,
    "noDomainDnsMutationNow": true,
    "noLiveEmailDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noSmsProviderCallNow": true,
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
    "custom_domain_mapping_requires_separate_exact_owner_approval",
    "domain_dns_mutation_requires_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site_domain",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245S_cloud_run_custom_domain_mapping_and_dns_plan_requires_separate_exact_owner_approval_no_sms_no_google_pay_billing_no_wallet"
} as unknown as SabiRelease245RFix2Report;
