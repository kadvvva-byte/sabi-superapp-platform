import type { SabiRelease245SReport } from './sabiRelease245S.types';

export const sabiRelease245SReport: SabiRelease245SReport = {
  "version": "SABI-RELEASE-245S-DOMAIN-MAPPING-DNS-READ-ONLY-PLAN-NO-DNS-NO-SMS-NO-WALLET",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245s-domain-mapping-dns-read-only-plan-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "scope": "245S_read_only_custom_domain_mapping_and_dns_plan_no_mapping_create_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout",
  "createdAt": "2026-06-22T23:57:31.438Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "cloudRunServiceUrl": "https://sabi-official-site-7srquvexva-ew.a.run.app",
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
    "serviceDescribe": {
      "name": "cloud_run_service_describe",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782171765.77413-7244c09944624a37aecf98484e580f4c.zip#1782171845501007\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"724a0edf-90b8-4b25-8132-0b87c2de1722\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 2,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4FN7oZM\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"mnbenapvez\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:b88ba477ddba8b92d379178cb49a990e8b36bc9feb42909790026e250c6f8487\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.282643Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:28.512743Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.241335Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"observedGeneration\": 2,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00001-29r\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceUrl": {
      "name": "cloud_run_service_url",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 0,
      "stdout": "https://sabi-official-site-7srquvexva-ew.a.run.app",
      "stderr": "",
      "ok": true
    },
    "verifiedDomains": {
      "name": "gcloud_verified_domains",
      "command": "gcloud domains list-user-verified --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"id\": \"sabiai.app\"\r\n  },\r\n  {\r\n    \"id\": \"sabiai.app.guest.google\"\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    },
    "domainMappingsList": {
      "name": "cloud_run_domain_mappings_list",
      "command": "gcloud run domain-mappings list --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "domainMappingDescribe": {
      "name": "cloud_run_domain_mapping_describe_current_domain",
      "command": "gcloud run domain-mappings describe sabiai.app --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "dnsA": {
      "name": "dns_sabiai.app_A",
      "command": "try { Resolve-DnsName sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  1,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  \"162.255.119.191\",\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsAAAA": {
      "name": "dns_sabiai.app_AAAA",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  6,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsCNAME": {
      "name": "dns_sabiai.app_CNAME",
      "command": "try { Resolve-DnsName sabiai.app -Type CNAME -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  6,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMX": {
      "name": "dns_sabiai.app_MX",
      "command": "try { Resolve-DnsName sabiai.app -Type MX -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  null,\r\n        \"Preference\":  1,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1a\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1b\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTXT": {
      "name": "dns_sabiai.app_TXT",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ]\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsWwwA": {
      "name": "dns_www.sabiai.app_A",
      "command": "try { Resolve-DnsName www.sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"www.sabiai.app\",\r\n        \"Type\":  5,\r\n        \"NameHost\":  \"parkingpage.namecheap.com\",\r\n        \"IPAddress\":  null,\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"parkingpage.namecheap.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"91.195.240.19\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsWwwCNAME": {
      "name": "dns_www.sabiai.app_CNAME",
      "command": "try { Resolve-DnsName www.sabiai.app -Type CNAME -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"www.sabiai.app\",\r\n    \"Type\":  5,\r\n    \"NameHost\":  \"parkingpage.namecheap.com\",\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "rootCheck": {
    "name": "cloud_run_root_http_check",
    "command": "$u=\"https://sabi-official-site-7srquvexva-ew.a.run.app\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 60; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
    "status": 0,
    "stdout": "STATUS=200\r\nLENGTH=72029",
    "stderr": "",
    "ok": true
  },
  "robotsCheck": {
    "name": "cloud_run_robots_http_check",
    "command": "$u=\"https://sabi-official-site-7srquvexva-ew.a.run.app/robots.txt\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 60; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
    "status": 0,
    "stdout": "STATUS=200\r\nLENGTH=63",
    "stderr": "",
    "ok": true
  },
  "sitemapCheck": {
    "name": "cloud_run_sitemap_http_check",
    "command": "$u=\"https://sabi-official-site-7srquvexva-ew.a.run.app/sitemap.xml\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 60; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
    "status": 0,
    "stdout": "STATUS=200\r\nLENGTH=340",
    "stderr": "",
    "ok": true
  },
  "domainVerified": true,
  "mappingAlreadyExists": false,
  "currentAStillOldParking": true,
  "mxGoogleVisible": true,
  "googleVerificationTxtVisible": true,
  "nextCommands": {
    "createDomainMappingLaterOnlyAfterOwnerApproval": "gcloud run domain-mappings create --service=sabi-official-site --domain=sabiai.app --region=europe-west1 --project=sabi-official-prod",
    "describeMappingAfterCreate": "gcloud run domain-mappings describe sabiai.app --region=europe-west1 --project=sabi-official-prod --format=json",
    "dnsWillBeChangedOnlyAfterMappingOutputsRecords": "Do not guess DNS records. Use exact records returned by Cloud Run domain mapping."
  },
  "readiness": {
    "release245SReadOnlyPlanReadiness": 0,
    "previous245RFix7AReadiness": 100,
    "cloudRunWebsiteServerReadiness": 100,
    "cloudRunUrlReadiness": 100,
    "domainVerificationInventoryReadiness": 100,
    "dnsInventoryReadiness": 100,
    "currentDomainMappingReadiness": 0,
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
    "readOnlyPlanOnly": true,
    "noCloudRunDeployNow": true,
    "noCloudRunIamMutationNow": true,
    "noCloudRunDomainMappingCreateNow": true,
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
    "domain_verified_ready_for_mapping",
    "cloud_run_domain_mapping_create_requires_separate_exact_owner_approval",
    "domain_dns_mutation_requires_records_from_cloud_run_mapping_and_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site_domain",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245T_create_cloud_run_domain_mapping_for_sabiai_app_requires_separate_exact_owner_approval_no_sms_no_google_pay_billing_no_wallet"
} as unknown as SabiRelease245SReport;
