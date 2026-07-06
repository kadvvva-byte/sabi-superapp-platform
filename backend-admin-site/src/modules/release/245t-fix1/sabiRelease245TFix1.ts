import type { SabiRelease245TFix1Report } from './sabiRelease245TFix1.types';

export const sabiRelease245TFix1Report: SabiRelease245TFix1Report = {
  "version": "SABI-RELEASE-245T-FIX1-CREATE-CLOUD-RUN-BETA-DOMAIN-MAPPING-NO-DNS-NO-SMS-NO-WALLET",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245t-fix1-create-cloud-run-beta-domain-mapping-no-dns-no-sms-no-wallet",
  "approvalFlagProvided": true,
  "ownerApprovalScopeUsed": [
    "245T create Cloud Run domain mapping for sabiai.app to service sabi-official-site",
    "245T failed before mutation because stable command does not support --region for fully managed mapping",
    "245T-FIX1 uses beta command required for fully managed Cloud Run domain mapping"
  ],
  "scope": "245T_FIX1_create_cloud_run_beta_domain_mapping_for_sabiai_app_only_no_dns_mutation_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout",
  "createdAt": "2026-06-23T00:09:49.201Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "observationsBefore": {
    "gcloudVersion": {
      "name": "gcloud_version_before",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
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
    "betaHelp": {
      "name": "gcloud_beta_domain_mapping_create_help",
      "command": "gcloud beta run domain-mappings create --help 2>$null | Select-String -Pattern \"--region\",\"--service\",\"--domain\" | Out-String",
      "status": 0,
      "stdout": "gcloud beta run domain-mappings create --s\r\nervice=SERVICE\r\n        (--domain=DOMAIN : --namespace=NAMESPA\r\nCE) [--force-override]\r\n        [--region=REGION] [GCLOUD_WIDE_FLAG ..\r\n.]\r\n        $ gcloud beta run domain-mappings crea\r\nte --service=myapp \\\r\n          --domain=www.example.com\r\n     --service=SERVICE\r\n       --domain=DOMAIN\r\n          + provide the argument --domain on t\r\nhe command line.\r\n          + provide the argument --domain on t\r\nhe command line with a fully\r\n     --region=REGION",
      "stderr": "",
      "ok": true
    },
    "serviceDescribeBefore": {
      "name": "cloud_run_service_describe_before_beta_mapping",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782171765.77413-7244c09944624a37aecf98484e580f4c.zip#1782171845501007\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"724a0edf-90b8-4b25-8132-0b87c2de1722\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 2,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4FN7oZM\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"mnbenapvez\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:b88ba477ddba8b92d379178cb49a990e8b36bc9feb42909790026e250c6f8487\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.282643Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:28.512743Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.241335Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"observedGeneration\": 2,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00001-29r\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "serviceUrlBefore": {
      "name": "cloud_run_service_url_before_beta_mapping",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=\"value(status.url)\" 2>$null",
      "status": 0,
      "stdout": "https://sabi-official-site-7srquvexva-ew.a.run.app",
      "stderr": "",
      "ok": true
    },
    "verifiedDomainsBefore": {
      "name": "verified_domains_before_beta_mapping",
      "command": "gcloud domains list-user-verified --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"id\": \"sabiai.app\"\r\n  },\r\n  {\r\n    \"id\": \"sabiai.app.guest.google\"\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    },
    "betaDescribeBefore": {
      "name": "beta_domain_mapping_describe_before_create",
      "command": "gcloud beta run domain-mappings describe sabiai.app --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "dnsABefore": {
      "name": "dns_sabiai.app_A",
      "command": "try { Resolve-DnsName sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  1,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  \"162.255.119.191\",\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMXBefore": {
      "name": "dns_sabiai.app_MX",
      "command": "try { Resolve-DnsName sabiai.app -Type MX -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  null,\r\n        \"Preference\":  1,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTXTBefore": {
      "name": "dns_sabiai.app_TXT",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ]\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "createResult": {
    "name": "create_cloud_run_beta_domain_mapping",
    "command": "gcloud beta run domain-mappings create --service=sabi-official-site --domain=sabiai.app --region=europe-west1 --project=sabi-official-prod --quiet",
    "status": 0,
    "stdout": "NAME                RECORD TYPE  CONTENTS\r\nsabi-official-site  A            216.239.32.21\r\nsabi-official-site  A            216.239.34.21\r\nsabi-official-site  A            216.239.36.21\r\nsabi-official-site  A            216.239.38.21\r\nsabi-official-site  AAAA         2001:4860:4802:32::15\r\nsabi-official-site  AAAA         2001:4860:4802:34::15\r\nsabi-official-site  AAAA         2001:4860:4802:36::15\r\nsabi-official-site  AAAA         2001:4860:4802:38::15",
    "stderr": "Creating......\r\n..........................................................done.\r\nWaiting for certificate provisioning. You must configure your DNS records for certificate issuance to begin.",
    "ok": true
  },
  "observationsAfter": {
    "betaDescribeAfter": {
      "name": "beta_domain_mapping_describe_after_create",
      "command": "gcloud beta run domain-mappings describe sabiai.app --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "betaListAfter": {
      "name": "beta_domain_mappings_list_after_create",
      "command": "gcloud beta run domain-mappings list --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"domains.cloudrun.com/v1\",\r\n    \"kind\": \"DomainMapping\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/operation-id\": \"9557559d-c145-4d75-8b59-8e76795d4928\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-23T00:09:22.622023Z\",\r\n      \"generation\": 1,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\",\r\n        \"run.googleapis.com/overrideAt\": \"2026-06-23T00:09:27.676Z\"\r\n      },\r\n      \"name\": \"sabiai.app\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZU4JKhAKE\",\r\n      \"selfLink\": \"/apis/domains.cloudrun.com/v1/namespaces/1047545881519/domainmappings/sabiai.app\",\r\n      \"uid\": \"67e89b01-cca7-46a2-babe-2d206c7c0fd4\"\r\n    },\r\n    \"spec\": {\r\n      \"routeName\": \"sabi-official-site\"\r\n    },\r\n    \"status\": {\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"message\": \"Waiting for certificate provisioning. You must configure your DNS records for certificate issuance to begin.\",\r\n          \"reason\": \"CertificatePending\",\r\n          \"status\": \"Unknown\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"status\": \"Unknown\",\r\n          \"type\": \"CertificateProvisioned\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"DomainRoutable\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"message\": \"System will retry after 01:00 from lastTransitionTime for polling interval\",\r\n          \"reason\": \"WaitingForOperation\",\r\n          \"severity\": \"Info\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Retry\"\r\n        }\r\n      ],\r\n      \"mappedRouteName\": \"sabi-official-site\",\r\n      \"observedGeneration\": 1,\r\n      \"resourceRecords\": [\r\n        {\r\n          \"rrdata\": \"216.239.32.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.34.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.36.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.38.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:32::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:34::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:36::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:38::15\",\r\n          \"type\": \"AAAA\"\r\n        }\r\n      ]\r\n    }\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    },
    "stableDescribeAfter": {
      "name": "stable_domain_mapping_describe_after_create_best_effort",
      "command": "gcloud run domain-mappings describe sabiai.app --project=sabi-official-prod --format=json 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "",
      "ok": false
    },
    "serviceDescribeAfter": {
      "name": "cloud_run_service_describe_after_beta_mapping",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/41d7c8c6-58d7-4d1d-b10f-da73dafd60c8\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782171765.77413-7244c09944624a37aecf98484e580f4c.zip#1782171845501007\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"724a0edf-90b8-4b25-8132-0b87c2de1722\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 2,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4FN7oZM\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"mnbenapvez\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:b88ba477ddba8b92d379178cb49a990e8b36bc9feb42909790026e250c6f8487\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.282643Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:44:28.512743Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-22T23:51:50.241335Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00001-29r\",\r\n    \"observedGeneration\": 2,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00001-29r\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsAAfter": {
      "name": "dns_sabiai.app_A",
      "command": "try { Resolve-DnsName sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  1,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  \"162.255.119.191\",\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsAAAAAfter": {
      "name": "dns_sabiai.app_AAAA",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  6,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMXAfter": {
      "name": "dns_sabiai.app_MX",
      "command": "try { Resolve-DnsName sabiai.app -Type MX -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  null,\r\n        \"Preference\":  1,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTXTAfter": {
      "name": "dns_sabiai.app_TXT",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 6 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ]\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "domainVerifiedBefore": true,
  "mappingVisible": true,
  "mappingReadyNow": false,
  "mappingReadyCondition": null,
  "mappingParseError": "",
  "requiredDnsRecords": [],
  "dnsStillOldParking": true,
  "readiness": {
    "release245TFix1Readiness": 0,
    "previous245TReadiness": 100,
    "previous245SReadiness": 100,
    "previous245RFix7AReadiness": 100,
    "cloudRunWebsiteServerReadiness": 100,
    "domainVerificationReadiness": 100,
    "cloudRunDomainMappingCreatedNow": 100,
    "cloudRunDomainMappingReadyNow": 0,
    "dnsRecordsFromMappingReadiness": 0,
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
    "cloudRunDomainMappingCreatedWithOwnerApproval245T": true,
    "noCloudRunDeployNow": true,
    "noCloudRunIamMutationNow": true,
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
    "domain_mapping_created_or_attempted_but_dns_records_not_observed_yet",
    "domain_dns_mutation_requires_separate_exact_owner_approval",
    "sms_live_still_locked_until_after_site_domain",
    "google_pay_billing_later_after_site_and_sms",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245T_FIX2_read_or_create_domain_mapping_via_console_if_beta_command_fails_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245TFix1Report;
