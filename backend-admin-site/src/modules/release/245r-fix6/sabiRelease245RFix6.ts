import type { SabiRelease245RFix6Report } from './sabiRelease245RFix6.types';

export const sabiRelease245RFix6Report: SabiRelease245RFix6Report = {
  "version": "SABI-RELEASE-245R-FIX6-GRANT-PUBLIC-CLOUD-RUN-INVOKER-NO-DNS-NO-SMS-NO-WALLET",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245r-fix6-grant-public-cloud-run-invoker-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalExactPhraseAccepted": "I approve RELEASE-245R-FIX6 grant public Cloud Run Invoker access to service sabi-official-site for official website public access only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, no payment, no payout",
  "scope": "245R_FIX6_grant_public_cloud_run_invoker_only_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:47:49.692Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "cloudRunServiceUrl": "https://sabi-official-site-7srquvexva-ew.a.run.app",
  "member": "allUsers",
  "role": "roles/run.invoker",
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
    "serviceDescribeBefore": {
      "name": "service_describe_before_public_invoker",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782171765.77413-7244c09944624a37aecf98484e580f4c.zip#1782171845501007\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"bb508180-b341-4f3d-ae72-47a261c2869b\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 1,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4Dljvkw\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"mnbenapvez\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:b88ba477ddba8b92d379178cb49a990e8b36bc9feb42909790026e250c6f8487\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:32.509516Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:28.512743Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:32.481962Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"observedGeneration\": 1,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00001-29r\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceUrlBefore": {
      "name": "service_url_before_public_invoker",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 0,
      "stdout": "https://sabi-official-site-7srquvexva-ew.a.run.app",
      "stderr": "",
      "ok": true
    },
    "serviceIamBefore": {
      "name": "service_iam_before_public_invoker",
      "command": "gcloud run services get-iam-policy sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"etag\": \"ACAB\"\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "grantResult": {
    "name": "grant_public_cloud_run_invoker",
    "command": "gcloud run services add-iam-policy-binding sabi-official-site --region=europe-west1 --project=sabi-official-prod --member=allUsers --role=roles/run.invoker",
    "status": 1,
    "stdout": "",
    "stderr": "ERROR: Policy modification failed. For a binding with condition, run \"gcloud alpha iam policies lint-condition\" to identify issues in condition.\r\nERROR: (gcloud.run.services.add-iam-policy-binding) FAILED_PRECONDITION: One or more users named in the policy do not belong to a permitted customer,  perhaps due to an organization policy.",
    "ok": false
  },
  "observationsAfter": {
    "serviceIamAfter": {
      "name": "service_iam_after_public_invoker",
      "command": "gcloud run services get-iam-policy sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"etag\": \"ACAB\"\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceDescribeAfter": {
      "name": "service_describe_after_public_invoker",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782171765.77413-7244c09944624a37aecf98484e580f4c.zip#1782171845501007\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"bb508180-b341-4f3d-ae72-47a261c2869b\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 1,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4Dljvkw\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"mnbenapvez\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:b88ba477ddba8b92d379178cb49a990e8b36bc9feb42909790026e250c6f8487\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:32.509516Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:28.512743Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:32.481962Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"observedGeneration\": 1,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00001-29r\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceUrlAfter": {
      "name": "service_url_after_public_invoker",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 0,
      "stdout": "https://sabi-official-site-7srquvexva-ew.a.run.app",
      "stderr": "",
      "ok": true
    }
  },
  "bindingVisible": false,
  "publicCheck": {
    "name": "cloud_run_public_url_http_check_after_invoker",
    "command": "$u=\"https://sabi-official-site-7srquvexva-ew.a.run.app\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 60; Write-Output $r.StatusCode; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
    "status": 1,
    "stdout": "",
    "stderr": "$u=\"https://sabi-official-site-7srquvexva-ew.a\r\n.run.app\"; try { $r=Invoke-WebRequest -Uri $u \r\n-UseBasicParsing -TimeoutSec 60; Write-Output \r\n$r.StatusCode; if ($r.StatusCode -ge 200 -and \r\n$r.StatusCode -lt 400) { exit 0 } else { exit \r\n1 } } catch { Write-Error $_; exit 1 } : \r\n403 Forbidden\r\nError: Forbidden\r\nYour client does not have permission to get UR\r\nL / from this server.\r\n    + CategoryInfo          : NotSpecified: ( \r\n   :) [Write-Error], WriteErrorException\r\n    + FullyQualifiedErrorId : Microsoft.Power \r\n   Shell.Commands.WriteErrorException",
    "ok": false
  },
  "readiness": {
    "release245RFix6Readiness": 0,
    "previous245RFix5Readiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "cloudRunServiceCreatedNow": 100,
    "cloudRunUrlReadiness": 100,
    "publicCloudRunInvokerReadiness": 0,
    "officialWebsiteServerExecutionReadiness": 100,
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
    "publicCloudRunInvokerIamMutationExecutedWithOwnerApproval245RFix6": false,
    "noCloudRunDeployNow": true,
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
    "custom_domain_mapping_requires_later_separate_exact_owner_approval",
    "domain_dns_mutation_requires_later_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site_domain",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245S_cloud_run_custom_domain_mapping_and_dns_plan_requires_separate_exact_owner_approval_no_sms_no_google_pay_billing_no_wallet"
} as unknown as SabiRelease245RFix6Report;
