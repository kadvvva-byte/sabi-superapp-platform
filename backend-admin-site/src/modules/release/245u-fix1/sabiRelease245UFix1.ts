import type { SabiRelease245UFix1Report } from './sabiRelease245UFix1.types';

export const sabiRelease245UFix1Report: SabiRelease245UFix1Report = {
  "version": "SABI-RELEASE-245U-FIX1-PUBLIC-DNS-AND-CERT-VERIFY-NO-SMS-NO-WALLET",
  "status": "passed",
  "createdAt": "2026-06-23T01:22:49.179Z",
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
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"domains.cloudrun.com/v1\",\r\n    \"kind\": \"DomainMapping\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/operation-id\": \"9557559d-c145-4d75-8b59-8e76795d4928\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-23T00:09:22.622023Z\",\r\n      \"generation\": 1,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\",\r\n        \"run.googleapis.com/overrideAt\": \"2026-06-23T00:09:27.676Z\"\r\n      },\r\n      \"name\": \"sabiai.app\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZU4ZH74z0\",\r\n      \"selfLink\": \"/apis/domains.cloudrun.com/v1/namespaces/1047545881519/domainmappings/sabiai.app\",\r\n      \"uid\": \"67e89b01-cca7-46a2-babe-2d206c7c0fd4\"\r\n    },\r\n    \"spec\": {\r\n      \"routeName\": \"sabi-official-site\"\r\n    },\r\n    \"status\": {\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T01:20:53.842749Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T01:20:53.842749Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"CertificateProvisioned\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"DomainRoutable\"\r\n        }\r\n      ],\r\n      \"mappedRouteName\": \"sabi-official-site\",\r\n      \"observedGeneration\": 1,\r\n      \"resourceRecords\": [\r\n        {\r\n          \"rrdata\": \"216.239.32.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.34.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.36.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.38.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:32::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:34::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:36::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:38::15\",\r\n          \"type\": \"AAAA\"\r\n        }\r\n      ]\r\n    }\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsA8888": {
      "name": "dns_sabiai.app_A_8.8.8.8",
      "command": "try { Resolve-DnsName sabiai.app -Type A -Server 8.8.8.8 -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.34.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.38.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.36.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.32.21\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsAAAA8888": {
      "name": "dns_sabiai.app_AAAA_8.8.8.8",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -Server 8.8.8.8 -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:34::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:36::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:32::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:38::15\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsA1111": {
      "name": "dns_sabiai.app_A_1.1.1.1",
      "command": "try { Resolve-DnsName sabiai.app -Type A -Server 1.1.1.1 -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.32.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.38.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.36.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.34.21\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsAAAA1111": {
      "name": "dns_sabiai.app_AAAA_1.1.1.1",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -Server 1.1.1.1 -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:36::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:32::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:38::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:34::15\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsLocalA": {
      "name": "dns_local_A_best_effort",
      "command": "try { Resolve-DnsName sabiai.app -Type A -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"162.255.119.191\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.32.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.38.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.36.21\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  1,\r\n        \"IPAddress\":  \"216.239.34.21\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "dnsLocalAAAA": {
      "name": "dns_local_AAAA_best_effort",
      "command": "try { Resolve-DnsName sabiai.app -Type AAAA -ErrorAction Stop | Select-Object Name,Type,IPAddress | ConvertTo-Json -Depth 8 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "[\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:32::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:36::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:34::15\"\r\n    },\r\n    {\r\n        \"Name\":  \"sabiai.app\",\r\n        \"Type\":  28,\r\n        \"IPAddress\":  \"2001:4860:4802:38::15\"\r\n    }\r\n]",
      "stderr": "",
      "ok": true
    },
    "httpsRoot": {
      "name": "https_root_check",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=72029",
      "stderr": "",
      "ok": true
    },
    "httpsRobots": {
      "name": "https_robots_check",
      "command": "$u=\"https://sabiai.app/robots.txt\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=63",
      "stderr": "",
      "ok": true
    },
    "httpsSitemap": {
      "name": "https_sitemap_check",
      "command": "$u=\"https://sabiai.app/sitemap.xml\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=340",
      "stderr": "",
      "ok": true
    }
  },
  "conditions": [
    {
      "lastTransitionTime": "2026-06-23T01:20:53.842749Z",
      "status": "True",
      "type": "Ready"
    },
    {
      "lastTransitionTime": "2026-06-23T01:20:53.842749Z",
      "status": "True",
      "type": "CertificateProvisioned"
    },
    {
      "lastTransitionTime": "2026-06-23T00:09:29.696417Z",
      "status": "True",
      "type": "DomainRoutable"
    }
  ],
  "readyCondition": {
    "lastTransitionTime": "2026-06-23T01:20:53.842749Z",
    "status": "True",
    "type": "Ready"
  },
  "certificateCondition": {
    "lastTransitionTime": "2026-06-23T01:20:53.842749Z",
    "status": "True",
    "type": "CertificateProvisioned"
  },
  "domainRoutableCondition": {
    "lastTransitionTime": "2026-06-23T00:09:29.696417Z",
    "status": "True",
    "type": "DomainRoutable"
  },
  "publicAReady": true,
  "publicAAAAReady": true,
  "localStillOld": true,
  "mappingVisible": true,
  "domainRoutable": true,
  "certReady": true,
  "mappingReady": true,
  "readiness": {
    "release245UFix1Readiness": 100,
    "cloudRunDomainMappingReadiness": 100,
    "domainRoutableReadiness": 100,
    "publicDnsAReadiness": 100,
    "publicDnsAAAAReadiness": 100,
    "localDnsCacheStillOldNow": 100,
    "certificateReadiness": 100,
    "officialDomainHttpsReadiness": 100,
    "officialDomainRobotsReadiness": 100,
    "officialDomainSitemapReadiness": 100,
    "liveDomainDnsChangedNow": 100,
    "officialDomainMappedNow": 100,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "firebaseCallNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 100
  },
  "safety": {
    "readOnlyVerificationOnly": true,
    "noSmsProviderCallNow": true,
    "noFirebaseApiCallNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [
    "next_sms_firebase_phone_auth_requires_separate_exact_owner_approval"
  ],
  "nextStep": "246A_SMS_Firebase_Phone_Auth_preflight_after_official_domain_live"
} as unknown as SabiRelease245UFix1Report;
