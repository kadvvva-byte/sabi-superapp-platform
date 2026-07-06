import type { SabiRelease245UReport } from './sabiRelease245U.types';

export const sabiRelease245UReport: SabiRelease245UReport = {
  "version": "SABI-RELEASE-245U-POST-DNS-VERIFY-SABIAI-APP-NO-SMS-NO-WALLET",
  "status": "pending_dns_propagation_or_failed",
  "createdAt": "2026-06-23T00:54:45.903Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "region": "europe-west1",
  "cloudRunServiceName": "sabi-official-site",
  "expectedA": [
    "216.239.32.21",
    "216.239.34.21",
    "216.239.36.21",
    "216.239.38.21"
  ],
  "expectedAAAA": [
    "2001:4860:4802:32::15",
    "2001:4860:4802:34::15",
    "2001:4860:4802:36::15",
    "2001:4860:4802:38::15"
  ],
  "expectedMx": "smtp.google.com",
  "expectedTxtPrefix": "google-site-verification=",
  "observations": {
    "gcloudVersion": {
      "name": "gcloud_version",
      "command": "gcloud --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
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
    "domainMappingsList": {
      "name": "cloud_run_domain_mappings_list",
      "command": "gcloud beta run domain-mappings list --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"domains.cloudrun.com/v1\",\r\n    \"kind\": \"DomainMapping\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/operation-id\": \"9557559d-c145-4d75-8b59-8e76795d4928\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-23T00:09:22.622023Z\",\r\n      \"generation\": 1,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\",\r\n        \"run.googleapis.com/overrideAt\": \"2026-06-23T00:09:27.676Z\"\r\n      },\r\n      \"name\": \"sabiai.app\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZU4Sae59k\",\r\n      \"selfLink\": \"/apis/domains.cloudrun.com/v1/namespaces/1047545881519/domainmappings/sabiai.app\",\r\n      \"uid\": \"67e89b01-cca7-46a2-babe-2d206c7c0fd4\"\r\n    },\r\n    \"spec\": {\r\n      \"routeName\": \"sabi-official-site\"\r\n    },\r\n    \"status\": {\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"message\": \"Waiting for certificate provisioning. You must configure your DNS records for certificate issuance to begin.\",\r\n          \"reason\": \"CertificatePending\",\r\n          \"status\": \"Unknown\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:45:52.332960Z\",\r\n          \"message\": \"Certificate issuance pending. The challenge data was not visible through the public internet. This may indicate that DNS is not properly configured or has not fully propagated. The system will retry.\",\r\n          \"reason\": \"CertificatePending\",\r\n          \"status\": \"Unknown\",\r\n          \"type\": \"CertificateProvisioned\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"DomainRoutable\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:50:52.586969Z\",\r\n          \"message\": \"System will retry after 15:00 from lastTransitionTime for polling interval\",\r\n          \"reason\": \"WaitingForOperation\",\r\n          \"severity\": \"Info\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Retry\"\r\n        }\r\n      ],\r\n      \"mappedRouteName\": \"sabi-official-site\",\r\n      \"observedGeneration\": 1,\r\n      \"resourceRecords\": [\r\n        {\r\n          \"rrdata\": \"216.239.32.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.34.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.36.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.38.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:32::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:34::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:36::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:38::15\",\r\n          \"type\": \"AAAA\"\r\n        }\r\n      ]\r\n    }\r\n  }\r\n]",
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
    "dnsA": {
      "name": "dns_sabiai.app_A",
      "command": "try { Resolve-DnsName sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"216.239.34.21\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"216.239.38.21\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"216.239.32.21\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"162.255.119.191\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"216.239.36.21\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsAAAA": {
      "name": "dns_sabiai.app_AAAA",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  6,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  null\r\n}",
      "stderr": "",
      "ok": true
    },
    "dnsMX": {
      "name": "dns_sabiai.app_MX",
      "command": "try { Resolve-DnsName sabiai.app -Type MX -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  15,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  null,\r\n        \"Preference\":  1,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.26\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  1,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"142.251.127.27\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1a\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    },\r\n    {\r\n        \"Name\":  \"smtp.google.com\",\r\n        \"Type\":  28,\r\n        \"NameHost\":  null,\r\n        \"IPAddress\":  \"2a00:1450:4001:c21::1b\",\r\n        \"Preference\":  null,\r\n        \"Strings\":  null\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsTXT": {
      "name": "dns_sabiai.app_TXT",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT -ErrorAction Stop | Select-Object Name,Type,NameHost,IPAddress,Preference,Strings | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\r\n    \"Name\":  \"sabiai.app\",\r\n    \"Type\":  16,\r\n    \"NameHost\":  null,\r\n    \"IPAddress\":  null,\r\n    \"Preference\":  null,\r\n    \"Strings\":  [\r\n                    \"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"\r\n                ]\r\n}",
      "stderr": "",
      "ok": true
    },
    "httpsRoot": {
      "name": "https_root_check",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
      "status": 1,
      "stdout": "",
      "stderr": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebR\r\nequest -Uri $u -UseBasicParsing -TimeoutSec 90\r\n; Write-Output (\"STATUS=\" + $r.StatusCode); Wr\r\nite-Output (\"LENGTH=\" + $r.Content.Length); if\r\n ($r.StatusCode -ge 200 -and $r.StatusCode -lt\r\n 400) { exit 0 } else { exit 1 } } catch { Wri\r\nte-Error $_; exit 1 } : ������� ᮥ������� ���\r\n���: ���।�������� �訡�� �� ��।��.\r\n    + CategoryInfo          : NotSpecified: ( \r\n   :) [Write-Error], WriteErrorException\r\n    + FullyQualifiedErrorId : Microsoft.Power \r\n   Shell.Commands.WriteErrorException",
      "ok": false
    },
    "httpRoot": {
      "name": "http_root_check",
      "command": "$u=\"http://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
      "status": 1,
      "stdout": "",
      "stderr": "$u=\"http://sabiai.app/\"; try { $r=Invoke-WebRe\r\nquest -Uri $u -UseBasicParsing -TimeoutSec 90;\r\n Write-Output (\"STATUS=\" + $r.StatusCode); Wri\r\nte-Output (\"LENGTH=\" + $r.Content.Length); if \r\n($r.StatusCode -ge 200 -and $r.StatusCode -lt \r\n400) { exit 0 } else { exit 1 } } catch { Writ\r\ne-Error $_; exit 1 } : ������� ᮥ������� ����\r\n��: ���।�������� �訡�� �� ��।��.\r\n    + CategoryInfo          : NotSpecified: ( \r\n   :) [Write-Error], WriteErrorException\r\n    + FullyQualifiedErrorId : Microsoft.Power \r\n   Shell.Commands.WriteErrorException",
      "ok": false
    },
    "robots": {
      "name": "https_robots_check",
      "command": "$u=\"https://sabiai.app/robots.txt\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
      "status": 1,
      "stdout": "",
      "stderr": "$u=\"https://sabiai.app/robots.txt\"; try { $r=I\r\nnvoke-WebRequest -Uri $u -UseBasicParsing -Tim\r\neoutSec 90; Write-Output (\"STATUS=\" + $r.Statu\r\nsCode); Write-Output (\"LENGTH=\" + $r.Content.L\r\nength); if ($r.StatusCode -ge 200 -and $r.Stat\r\nusCode -lt 400) { exit 0 } else { exit 1 } } c\r\natch { Write-Error $_; exit 1 } : ������� ᮥ�\r\n������ ������: ���।�������� �訡�� �� ���\r\n���.\r\n    + CategoryInfo          : NotSpecified: ( \r\n   :) [Write-Error], WriteErrorException\r\n    + FullyQualifiedErrorId : Microsoft.Power \r\n   Shell.Commands.WriteErrorException",
      "ok": false
    },
    "sitemap": {
      "name": "https_sitemap_check",
      "command": "$u=\"https://sabiai.app/sitemap.xml\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Error $_; exit 1 }",
      "status": 1,
      "stdout": "",
      "stderr": "$u=\"https://sabiai.app/sitemap.xml\"; try { $r=\r\nInvoke-WebRequest -Uri $u -UseBasicParsing -Ti\r\nmeoutSec 90; Write-Output (\"STATUS=\" + $r.Stat\r\nusCode); Write-Output (\"LENGTH=\" + $r.Content.\r\nLength); if ($r.StatusCode -ge 200 -and $r.Sta\r\ntusCode -lt 400) { exit 0 } else { exit 1 } } \r\ncatch { Write-Error $_; exit 1 } : ������� ᮥ\r\n������� ������: ���।�������� �訡�� �� ���\r\n����.\r\n    + CategoryInfo          : NotSpecified: ( \r\n   :) [Write-Error], WriteErrorException\r\n    + FullyQualifiedErrorId : Microsoft.Power \r\n   Shell.Commands.WriteErrorException",
      "ok": false
    }
  },
  "readiness": {
    "release245UReadiness": 0,
    "cloudRunDomainMappingReadiness": 100,
    "dnsAReadiness": 0,
    "dnsAAAAReadiness": 0,
    "gmailMxKeptReadiness": 100,
    "googleVerificationTxtKeptReadiness": 100,
    "officialDomainHttpsReadiness": 0,
    "officialDomainRobotsReadiness": 0,
    "officialDomainSitemapReadiness": 0,
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
    "postDnsVerificationOnly": true,
    "noSmsProviderCallNow": true,
    "noFirebaseApiCallNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "ownerExactApprovalRequiredBeforeNextLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [
    "dns_propagation_or_records_not_ready_yet_recheck_after_5_15_minutes"
  ],
  "nextStep": "245U_RECHECK_DNS_until_A_AAAA_HTTPS_ready"
} as unknown as SabiRelease245UReport;
