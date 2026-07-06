import type { SabiRelease245RReport } from './sabiRelease245R.types';

export const sabiRelease245RReport: SabiRelease245RReport = {
  "version": "SABI-RELEASE-245R-DEPLOY-OFFICIAL-SABI-SITE-CLOUD-RUN-NO-DNS-NO-SMS-NO-WALLET",
  "status": "passed",
  "approvalFlagRequired": "--i-approve-release-245r-deploy-official-sabi-site-cloud-run-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalExactPhraseAccepted": "I approve RELEASE-245R deploy official Sabi website to Google Cloud Run service sabi-official-site in project sabi-official-prod region europe-west1 only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no payment, no payout",
  "scope": "245R_cloud_run_deploy_official_site_only_no_domain_dns_no_sms_no_firebase_no_wallet_payment_payout",
  "createdAt": "2026-06-24T17:58:01.750Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "cloudRunServiceUrl": "https://sabi-official-site-7srquvexva-ew.a.run.app",
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
      "stdout": "Google Cloud SDK 574.0.0\r\nbq 2.1.33\r\ncore 2026.06.22\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "Python",
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
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"serving.knative.dev/v1\",\r\n    \"kind\": \"Service\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n        \"run.googleapis.com/build-id\": \"4e9f8fa6-b92f-4344-9912-8e8c5cc4eb69\",\r\n        \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n        \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/4e9f8fa6-b92f-4344-9912-8e8c5cc4eb69\",\r\n        \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782323192.051279-df38f189b9594875959dd8f89dae5cc1.zip#1782323285550919\",\r\n        \"run.googleapis.com/client-name\": \"gcloud\",\r\n        \"run.googleapis.com/client-version\": \"574.0.0\",\r\n        \"run.googleapis.com/ingress\": \"all\",\r\n        \"run.googleapis.com/ingress-status\": \"all\",\r\n        \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n        \"run.googleapis.com/maxScale\": \"3\",\r\n        \"run.googleapis.com/operation-id\": \"e196510a-cf41-4516-8a02-f334300017f6\",\r\n        \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n      \"generation\": 11,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\"\r\n      },\r\n      \"name\": \"sabi-official-site\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZVA3vk76w\",\r\n      \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n      \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n    },\r\n    \"spec\": {\r\n      \"template\": {\r\n        \"metadata\": {\r\n          \"annotations\": {\r\n            \"autoscaling.knative.dev/maxScale\": \"3\",\r\n            \"run.googleapis.com/client-name\": \"gcloud\",\r\n            \"run.googleapis.com/client-version\": \"574.0.0\",\r\n            \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n          },\r\n          \"labels\": {\r\n            \"client.knative.dev/nonce\": \"lrzaaauciu\",\r\n            \"run.googleapis.com/startupProbeType\": \"Default\"\r\n          }\r\n        },\r\n        \"spec\": {\r\n          \"containerConcurrency\": 80,\r\n          \"containers\": [\r\n            {\r\n              \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:cafc955990a79029684cf64ce2681ee62d22e0afb8af7a3e43f287ac876b4bfb\",\r\n              \"ports\": [\r\n                {\r\n                  \"containerPort\": 8080,\r\n                  \"name\": \"http1\"\r\n                }\r\n              ],\r\n              \"resources\": {\r\n                \"limits\": {\r\n                  \"cpu\": \"1000m\",\r\n                  \"memory\": \"512Mi\"\r\n                }\r\n              },\r\n              \"startupProbe\": {\r\n                \"failureThreshold\": 1,\r\n                \"periodSeconds\": 240,\r\n                \"tcpSocket\": {\r\n                  \"port\": 8080\r\n                },\r\n                \"timeoutSeconds\": 240\r\n              }\r\n            }\r\n          ],\r\n          \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n          \"timeoutSeconds\": 300\r\n        }\r\n      },\r\n      \"traffic\": [\r\n        {\r\n          \"latestRevision\": true,\r\n          \"percent\": 100\r\n        }\r\n      ]\r\n    },\r\n    \"status\": {\r\n      \"address\": {\r\n        \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n      },\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:48:32.127916Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:48:28.023912Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"ConfigurationsReady\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:48:32.094951Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"RoutesReady\"\r\n        }\r\n      ],\r\n      \"latestCreatedRevisionName\": \"sabi-official-site-00010-5bf\",\r\n      \"latestReadyRevisionName\": \"sabi-official-site-00010-5bf\",\r\n      \"observedGeneration\": 11,\r\n      \"traffic\": [\r\n        {\r\n          \"latestRevision\": true,\r\n          \"percent\": 100,\r\n          \"revisionName\": \"sabi-official-site-00010-5bf\"\r\n        }\r\n      ],\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    }\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    }
  },
  "deployResult": {
    "name": "cloud_run_deploy_official_site",
    "command": "gcloud run deploy sabi-official-site --source \"C:\\Users\\User\\Desktop\\superapp\\.data\\release\\245r\\deploy-context\" --project sabi-official-prod --region europe-west1 --platform managed --allow-unauthenticated --quiet",
    "status": 0,
    "stdout": "",
    "stderr": "Python Building using Dockerfile and deploying container to Cloud Run service [sabi-official-site] in project [sabi-official-prod] region [europe-west1]\r\nBuilding and deploying...\r\nValidating configuration...........done\r\nUploading sources..............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................done\r\nBuilding Container.....................................................................................................................................................done\r\nSetting IAM Policy....................warning\r\nCreating Revision......................................................done\r\nRouting traffic.....done\r\nCompleted with warnings:\r\n  Setting IAM policy failed, try \"gcloud beta run services add-iam-policy-binding --region=europe-west1 --member=allUsers --role=roles/run.invoker sabi-official-site\"\r\nService [sabi-official-site] revision [sabi-official-site-00011-ccs] has been deployed and is serving 100 percent of traffic.\r\nService URL: https://sabi-official-site-1047545881519.europe-west1.run.app",
    "ok": true
  },
  "observationsAfter": {
    "serviceDescribe": {
      "name": "cloud_run_service_describe_after",
      "command": "gcloud run services describe sabi-official-site --region europe-west1 --project sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"64eb9d80-d780-42da-9d70-c56a55d1188b\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/64eb9d80-d780-42da-9d70-c56a55d1188b\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782323757.813518-d2e20b6cf1714cb5a2cf5a447c99a0af.zip#1782323846692481\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"574.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"27ef6303-87db-462f-8f28-6f41705f694f\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 12,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZVA50uBcU\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"autoscaling.knative.dev/maxScale\": \"3\",\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"574.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"fnexbkxvcf\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:f49c66707204c2e88cf16545c59524acb4db162c00da5f81e782ea2eb9a2ec27\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-24T17:57:50.565829Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-24T17:57:47.547558Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-24T17:57:50.535542Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00011-ccs\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00011-ccs\",\r\n    \"observedGeneration\": 12,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00011-ccs\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceUrl": {
      "name": "cloud_run_service_url_after",
      "command": "gcloud run services describe sabi-official-site --region europe-west1 --project sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 0,
      "stdout": "https://sabi-official-site-7srquvexva-ew.a.run.app",
      "stderr": "",
      "ok": true
    },
    "cloudRunServicesAfter": {
      "name": "cloud_run_services_after",
      "command": "gcloud run services list --platform=managed --region=europe-west1 --project sabi-official-prod --format=json --limit=20 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"serving.knative.dev/v1\",\r\n    \"kind\": \"Service\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n        \"run.googleapis.com/build-id\": \"64eb9d80-d780-42da-9d70-c56a55d1188b\",\r\n        \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n        \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/64eb9d80-d780-42da-9d70-c56a55d1188b\",\r\n        \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782323757.813518-d2e20b6cf1714cb5a2cf5a447c99a0af.zip#1782323846692481\",\r\n        \"run.googleapis.com/client-name\": \"gcloud\",\r\n        \"run.googleapis.com/client-version\": \"574.0.0\",\r\n        \"run.googleapis.com/ingress\": \"all\",\r\n        \"run.googleapis.com/ingress-status\": \"all\",\r\n        \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n        \"run.googleapis.com/maxScale\": \"3\",\r\n        \"run.googleapis.com/operation-id\": \"27ef6303-87db-462f-8f28-6f41705f694f\",\r\n        \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n      \"generation\": 12,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\"\r\n      },\r\n      \"name\": \"sabi-official-site\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZVA50uBcU\",\r\n      \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n      \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n    },\r\n    \"spec\": {\r\n      \"template\": {\r\n        \"metadata\": {\r\n          \"annotations\": {\r\n            \"autoscaling.knative.dev/maxScale\": \"3\",\r\n            \"run.googleapis.com/client-name\": \"gcloud\",\r\n            \"run.googleapis.com/client-version\": \"574.0.0\",\r\n            \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n          },\r\n          \"labels\": {\r\n            \"client.knative.dev/nonce\": \"fnexbkxvcf\",\r\n            \"run.googleapis.com/startupProbeType\": \"Default\"\r\n          }\r\n        },\r\n        \"spec\": {\r\n          \"containerConcurrency\": 80,\r\n          \"containers\": [\r\n            {\r\n              \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:f49c66707204c2e88cf16545c59524acb4db162c00da5f81e782ea2eb9a2ec27\",\r\n              \"ports\": [\r\n                {\r\n                  \"containerPort\": 8080,\r\n                  \"name\": \"http1\"\r\n                }\r\n              ],\r\n              \"resources\": {\r\n                \"limits\": {\r\n                  \"cpu\": \"1000m\",\r\n                  \"memory\": \"512Mi\"\r\n                }\r\n              },\r\n              \"startupProbe\": {\r\n                \"failureThreshold\": 1,\r\n                \"periodSeconds\": 240,\r\n                \"tcpSocket\": {\r\n                  \"port\": 8080\r\n                },\r\n                \"timeoutSeconds\": 240\r\n              }\r\n            }\r\n          ],\r\n          \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n          \"timeoutSeconds\": 300\r\n        }\r\n      },\r\n      \"traffic\": [\r\n        {\r\n          \"latestRevision\": true,\r\n          \"percent\": 100\r\n        }\r\n      ]\r\n    },\r\n    \"status\": {\r\n      \"address\": {\r\n        \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n      },\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:57:50.565829Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:57:47.547558Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"ConfigurationsReady\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-24T17:57:50.535542Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"RoutesReady\"\r\n        }\r\n      ],\r\n      \"latestCreatedRevisionName\": \"sabi-official-site-00011-ccs\",\r\n      \"latestReadyRevisionName\": \"sabi-official-site-00011-ccs\",\r\n      \"observedGeneration\": 12,\r\n      \"traffic\": [\r\n        {\r\n          \"latestRevision\": true,\r\n          \"percent\": 100,\r\n          \"revisionName\": \"sabi-official-site-00011-ccs\"\r\n        }\r\n      ],\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    }\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    }
  },
  "healthCheck": {
    "name": "cloud_run_public_health_check",
    "command": "$u=\"https://sabi-official-site-7srquvexva-ew.a.run.app\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 45; Write-Output $r.StatusCode; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
    "status": 0,
    "stdout": "200",
    "stderr": "",
    "ok": true
  },
  "readiness": {
    "release245RReadiness": 100,
    "previous245QReadiness": 100,
    "googleCloudCliReadiness": 100,
    "googleCloudProjectReadiness": 100,
    "siteUiDeployContextReadiness": 100,
    "googleCloudDeployExecutedNow": 100,
    "cloudRunServiceCreatedNow": 100,
    "officialWebsiteServerExecutionReadiness": 100,
    "liveDomainDnsChangedNow": 0,
    "officialDomainMappedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "firebaseCallNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "cloudRunDeployExecutedWithOwnerApproval245R": true,
    "cloudRunServiceCreateAllowedByOwner245R": true,
    "noDomainDnsMutationNow": true,
    "noLiveEmailDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noSmsProviderCallNow": true,
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
    "sms_live_still_locked",
    "firebase_call_still_locked",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245S_cloud_run_custom_domain_mapping_and_dns_plan_requires_separate_exact_owner_approval_no_sms_no_wallet"
} as unknown as SabiRelease245RReport;
