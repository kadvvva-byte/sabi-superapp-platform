import type { SabiRelease245RFix1Report } from './sabiRelease245RFix1.types';

export const sabiRelease245RFix1Report: SabiRelease245RFix1Report = {
  "version": "SABI-RELEASE-245R-FIX1-GRANT-SOURCE-BUCKET-STORAGE-OBJECT-VIEWER-NO-DNS-NO-SMS-NO-WALLET",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245r-fix1-grant-source-bucket-storage-object-viewer-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalExactPhraseAccepted": "I approve RELEASE-245R-FIX1 grant Storage Object Viewer on Cloud Run source bucket to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no payment, no payout",
  "scope": "245R_FIX1_grant_storage_object_viewer_on_cloud_run_source_bucket_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:24:06.552Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "projectNumber": "1047545881519",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "sourceBucket": "run-sources-sabi-official-prod-europe-west1",
  "computeServiceAccount": "1047545881519-compute@developer.gserviceaccount.com",
  "member": "serviceAccount:1047545881519-compute@developer.gserviceaccount.com",
  "role": "roles/storage.objectViewer",
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
    "bucketDescribeBefore": {
      "name": "source_bucket_describe_before",
      "command": "gcloud storage buckets describe gs://run-sources-sabi-official-prod-europe-west1 --project sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"cors_config\": [\r\n    {\r\n      \"method\": [\r\n        \"GET\"\r\n      ],\r\n      \"origin\": [\r\n        \"https://*.cloud.google.com\",\r\n        \"https://*.corp.google.com\",\r\n        \"https://*.corp.google.com:*\",\r\n        \"https://*.cloud.google\",\r\n        \"https://*.byoid.goog\"\r\n      ]\r\n    }\r\n  ],\r\n  \"creation_time\": \"2026-06-22T23:14:21+0000\",\r\n  \"default_storage_class\": \"STANDARD\",\r\n  \"generation\": 1782170061201337811,\r\n  \"labels\": {\r\n    \"used-by\": \"cloudrun\"\r\n  },\r\n  \"location\": \"EUROPE-WEST1\",\r\n  \"location_type\": \"region\",\r\n  \"metageneration\": 1,\r\n  \"name\": \"run-sources-sabi-official-prod-europe-west1\",\r\n  \"public_access_prevention\": \"inherited\",\r\n  \"soft_delete_policy\": {\r\n    \"effectiveTime\": \"2026-06-22T23:14:21.638000+00:00\",\r\n    \"retentionDurationSeconds\": \"604800\"\r\n  },\r\n  \"storage_url\": \"gs://run-sources-sabi-official-prod-europe-west1/\",\r\n  \"uniform_bucket_level_access\": true,\r\n  \"update_time\": \"2026-06-22T23:14:21+0000\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "bucketIamBefore": {
      "name": "source_bucket_iam_before",
      "command": "gcloud storage buckets get-iam-policy gs://run-sources-sabi-official-prod-europe-west1 --project sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"projectEditor:sabi-official-prod\",\r\n        \"projectOwner:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyBucketOwner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectViewer:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyBucketReader\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectEditor:sabi-official-prod\",\r\n        \"projectOwner:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyObjectOwner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectViewer:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyObjectReader\"\r\n    }\r\n  ],\r\n  \"etag\": \"CAE=\"\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "grantResult": {
    "name": "grant_storage_object_viewer_on_source_bucket",
    "command": "gcloud storage buckets add-iam-policy-binding gs://run-sources-sabi-official-prod-europe-west1 --project sabi-official-prod --member=\"serviceAccount:1047545881519-compute@developer.gserviceaccount.com\" --role=\"roles/storage.objectViewer\"",
    "status": 0,
    "stdout": "bindings:\r\n- members:\r\n  - projectEditor:sabi-official-prod\r\n  - projectOwner:sabi-official-prod\r\n  role: roles/storage.legacyBucketOwner\r\n- members:\r\n  - projectViewer:sabi-official-prod\r\n  role: roles/storage.legacyBucketReader\r\n- members:\r\n  - projectEditor:sabi-official-prod\r\n  - projectOwner:sabi-official-prod\r\n  role: roles/storage.legacyObjectOwner\r\n- members:\r\n  - projectViewer:sabi-official-prod\r\n  role: roles/storage.legacyObjectReader\r\n- members:\r\n  - serviceAccount:1047545881519-compute@developer.gserviceaccount.com\r\n  role: roles/storage.objectViewer\r\netag: CAI=\r\nkind: storage#policy\r\nresourceId: projects/_/buckets/run-sources-sabi-official-prod-europe-west1\r\nversion: 1",
    "stderr": "",
    "ok": true
  },
  "observationsAfter": {
    "bucketIamAfter": {
      "name": "source_bucket_iam_after",
      "command": "gcloud storage buckets get-iam-policy gs://run-sources-sabi-official-prod-europe-west1 --project sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"projectEditor:sabi-official-prod\",\r\n        \"projectOwner:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyBucketOwner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectViewer:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyBucketReader\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectEditor:sabi-official-prod\",\r\n        \"projectOwner:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyObjectOwner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"projectViewer:sabi-official-prod\"\r\n      ],\r\n      \"role\": \"roles/storage.legacyObjectReader\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:1047545881519-compute@developer.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/storage.objectViewer\"\r\n    }\r\n  ],\r\n  \"etag\": \"CAI=\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "cloudRunServicesReadOnly": {
      "name": "cloud_run_services_read_only_after_fix",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[]",
      "stderr": "",
      "ok": true
    }
  },
  "bindingVisible": true,
  "readiness": {
    "release245RFix1Readiness": 100,
    "previous245RReadiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "sourceBucketReadiness": 100,
    "sourceBucketIamFixReadiness": 100,
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
    "sourceBucketIamMutationExecutedWithOwnerApproval245RFix1": true,
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
    "cloud_run_deploy_retry_required_after_source_bucket_iam_fix",
    "custom_domain_mapping_requires_later_separate_exact_owner_approval",
    "domain_dns_mutation_requires_later_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245R_FIX2_retry_cloud_run_official_site_deploy_after_bucket_iam_fix_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245RFix1Report;
