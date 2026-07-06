import type { SabiRelease245RFix4Report } from './sabiRelease245RFix4.types';

export const sabiRelease245RFix4Report: SabiRelease245RFix4Report = {
  "version": "SABI-RELEASE-245R-FIX4-GRANT-ARTIFACT-REGISTRY-WRITER-NO-DNS-NO-SMS-NO-WALLET",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245r-fix4-grant-artifact-registry-writer-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalExactPhraseAccepted": "I approve RELEASE-245R-FIX4 grant Artifact Registry Writer on repository cloud-run-source-deploy to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, no payment, no payout",
  "scope": "245R_FIX4_grant_artifact_registry_writer_on_cloud_run_source_deploy_repository_only_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:40:41.566Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "projectNumber": "1047545881519",
  "region": "europe-west1",
  "repository": "cloud-run-source-deploy",
  "computeServiceAccount": "1047545881519-compute@developer.gserviceaccount.com",
  "member": "serviceAccount:1047545881519-compute@developer.gserviceaccount.com",
  "role": "roles/artifactregistry.writer",
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
    "repositoryDescribeBefore": {
      "name": "artifact_registry_repository_describe_before",
      "command": "gcloud artifacts repositories describe cloud-run-source-deploy --location=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"createTime\": \"2026-06-22T23:14:18.000082Z\",\r\n  \"description\": \"Cloud Run Source Deployments\",\r\n  \"format\": \"DOCKER\",\r\n  \"mode\": \"STANDARD_REPOSITORY\",\r\n  \"name\": \"projects/sabi-official-prod/locations/europe-west1/repositories/cloud-run-source-deploy\",\r\n  \"registryUri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy\",\r\n  \"satisfiesPzi\": true,\r\n  \"updateTime\": \"2026-06-22T23:14:18.000082Z\",\r\n  \"vulnerabilityScanningConfig\": {\r\n    \"enablementState\": \"SCANNING_DISABLED\",\r\n    \"enablementStateReason\": \"API containerscanning.googleapis.com is not enabled.\",\r\n    \"lastEnableTime\": \"2026-06-22T23:14:06.675846422Z\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "repositoryIamBefore": {
      "name": "artifact_registry_repository_iam_before",
      "command": "gcloud artifacts repositories get-iam-policy cloud-run-source-deploy --location=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"etag\": \"ACAB\"\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "grantResult": {
    "name": "grant_artifact_registry_writer_on_repository",
    "command": "gcloud artifacts repositories add-iam-policy-binding cloud-run-source-deploy --location=europe-west1 --project=sabi-official-prod --member=\"serviceAccount:1047545881519-compute@developer.gserviceaccount.com\" --role=\"roles/artifactregistry.writer\"",
    "status": 0,
    "stdout": "bindings:\r\n- members:\r\n  - serviceAccount:1047545881519-compute@developer.gserviceaccount.com\r\n  role: roles/artifactregistry.writer\r\netag: BwZU4CtTtiY=\r\nversion: 1",
    "stderr": "Updated IAM policy for repository [cloud-run-source-deploy].",
    "ok": true
  },
  "observationsAfter": {
    "repositoryIamAfter": {
      "name": "artifact_registry_repository_iam_after",
      "command": "gcloud artifacts repositories get-iam-policy cloud-run-source-deploy --location=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:1047545881519-compute@developer.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/artifactregistry.writer\"\r\n    }\r\n  ],\r\n  \"etag\": \"BwZU4CtTtiY=\",\r\n  \"version\": 1\r\n}",
      "stderr": "",
      "ok": true
    },
    "cloudRunServicesReadOnly": {
      "name": "cloud_run_services_read_only_after_fix4",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project=sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "bindingVisible": true,
  "readiness": {
    "release245RFix4Readiness": 100,
    "previous245RFix2Readiness": 100,
    "previous245RFix1Readiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "artifactRegistryRepositoryReadiness": 100,
    "artifactRegistryWriterFixReadiness": 100,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "officialWebsiteServerExecutionReadiness": 0,
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
    "artifactRegistryIamMutationExecutedWithOwnerApproval245RFix4": true,
    "noCloudRunDeployNow": true,
    "noCloudRunServiceCreateNow": true,
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
    "cloud_run_deploy_retry_required_after_artifact_registry_writer_fix",
    "custom_domain_mapping_requires_later_separate_exact_owner_approval",
    "domain_dns_mutation_requires_later_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245R_FIX5_retry_cloud_run_official_site_deploy_after_artifact_registry_writer_fix_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245RFix4Report;
