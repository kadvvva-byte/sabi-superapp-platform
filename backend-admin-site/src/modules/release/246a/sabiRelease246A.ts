import type { SabiRelease246AReport } from './sabiRelease246A.types';

export const sabiRelease246AReport: SabiRelease246AReport = {
  "version": "SABI-RELEASE-246A-SMS-FIREBASE-PHONE-AUTH-PREFLIGHT-READONLY-NO-LIVE-SMS-NO-WALLET",
  "status": "passed",
  "createdAt": "2026-06-23T02:11:01.864Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "projectId": "sabi-official-prod",
  "scope": "sms_firebase_phone_auth_preflight_readonly_no_live_sms_no_firebase_call_no_wallet_payment_payout",
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
    "firebaseCliVersion": {
      "name": "firebase_cli_version_optional",
      "command": "firebase --version",
      "status": 1,
      "stdout": "",
      "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase --version\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "cloudRunService": {
      "name": "cloud_run_site_service_readiness",
      "command": "gcloud run services describe sabi-official-site --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"apiVersion\": \"serving.knative.dev/v1\",\r\n  \"kind\": \"Service\",\r\n  \"metadata\": {\r\n    \"annotations\": {\r\n      \"run.googleapis.com/build-enable-automatic-updates\": \"false\",\r\n      \"run.googleapis.com/build-id\": \"1eb11d4a-4547-4700-98c2-185c7311ddb6\",\r\n      \"run.googleapis.com/build-image-uri\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site\",\r\n      \"run.googleapis.com/build-name\": \"projects/1047545881519/locations/europe-west1/builds/1eb11d4a-4547-4700-98c2-185c7311ddb6\",\r\n      \"run.googleapis.com/build-source-location\": \"gs://run-sources-sabi-official-prod-europe-west1/services/sabi-official-site/1782180123.653575-b00bad58fada4df5a7317e776591b9d5.zip#1782180205751324\",\r\n      \"run.googleapis.com/client-name\": \"gcloud\",\r\n      \"run.googleapis.com/client-version\": \"573.0.0\",\r\n      \"run.googleapis.com/ingress\": \"all\",\r\n      \"run.googleapis.com/ingress-status\": \"all\",\r\n      \"run.googleapis.com/invoker-iam-disabled\": \"true\",\r\n      \"run.googleapis.com/maxScale\": \"3\",\r\n      \"run.googleapis.com/operation-id\": \"7d99390f-c957-4682-bc45-36b04013ea2c\",\r\n      \"run.googleapis.com/urls\": \"[\\\"https://sabi-official-site-1047545881519.europe-west1.run.app\\\",\\\"https://sabi-official-site-7srquvexva-ew.a.run.app\\\"]\",\r\n      \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n      \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n    },\r\n    \"creationTimestamp\": \"2026-06-22T23:44:26.514018Z\",\r\n    \"generation\": 4,\r\n    \"labels\": {\r\n      \"cloud.googleapis.com/location\": \"europe-west1\"\r\n    },\r\n    \"name\": \"sabi-official-site\",\r\n    \"namespace\": \"1047545881519\",\r\n    \"resourceVersion\": \"AAZU4ivxH2M\",\r\n    \"selfLink\": \"/apis/serving.knative.dev/v1/namespaces/1047545881519/services/sabi-official-site\",\r\n    \"uid\": \"d9d4b79f-707a-43f8-9744-50a4882b9adb\"\r\n  },\r\n  \"spec\": {\r\n    \"template\": {\r\n      \"metadata\": {\r\n        \"annotations\": {\r\n          \"autoscaling.knative.dev/maxScale\": \"3\",\r\n          \"run.googleapis.com/client-name\": \"gcloud\",\r\n          \"run.googleapis.com/client-version\": \"573.0.0\",\r\n          \"run.googleapis.com/startup-cpu-boost\": \"true\"\r\n        },\r\n        \"labels\": {\r\n          \"client.knative.dev/nonce\": \"zsjiktyxdy\",\r\n          \"run.googleapis.com/startupProbeType\": \"Default\"\r\n        }\r\n      },\r\n      \"spec\": {\r\n        \"containerConcurrency\": 80,\r\n        \"containers\": [\r\n          {\r\n            \"image\": \"europe-west1-docker.pkg.dev/sabi-official-prod/cloud-run-source-deploy/sabi-official-site@sha256:f5494e96606adce144d95f1361c85ff5286f71dcb9685cdf360071374736a2a6\",\r\n            \"ports\": [\r\n              {\r\n                \"containerPort\": 8080,\r\n                \"name\": \"http1\"\r\n              }\r\n            ],\r\n            \"resources\": {\r\n              \"limits\": {\r\n                \"cpu\": \"1000m\",\r\n                \"memory\": \"512Mi\"\r\n              }\r\n            },\r\n            \"startupProbe\": {\r\n              \"failureThreshold\": 1,\r\n              \"periodSeconds\": 240,\r\n              \"tcpSocket\": {\r\n                \"port\": 8080\r\n              },\r\n              \"timeoutSeconds\": 240\r\n            }\r\n          }\r\n        ],\r\n        \"serviceAccountName\": \"1047545881519-compute@developer.gserviceaccount.com\",\r\n        \"timeoutSeconds\": 300\r\n      }\r\n    },\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100\r\n      }\r\n    ]\r\n  },\r\n  \"status\": {\r\n    \"address\": {\r\n      \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n    },\r\n    \"conditions\": [\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-23T02:03:56.828515Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"Ready\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-23T02:03:50.248821Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"ConfigurationsReady\"\r\n      },\r\n      {\r\n        \"lastTransitionTime\": \"2026-06-23T02:03:56.795571Z\",\r\n        \"status\": \"True\",\r\n        \"type\": \"RoutesReady\"\r\n      }\r\n    ],\r\n    \"latestCreatedRevisionName\": \"sabi-official-site-00003-cr2\",\r\n    \"latestReadyRevisionName\": \"sabi-official-site-00003-cr2\",\r\n    \"observedGeneration\": 4,\r\n    \"traffic\": [\r\n      {\r\n        \"latestRevision\": true,\r\n        \"percent\": 100,\r\n        \"revisionName\": \"sabi-official-site-00003-cr2\"\r\n      }\r\n    ],\r\n    \"url\": \"https://sabi-official-site-7srquvexva-ew.a.run.app\"\r\n  }\r\n}",
      "stderr": "",
      "ok": true
    },
    "domainMapping": {
      "name": "cloud_run_domain_mapping_readiness",
      "command": "gcloud beta run domain-mappings list --region=europe-west1 --project=sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "[\r\n  {\r\n    \"apiVersion\": \"domains.cloudrun.com/v1\",\r\n    \"kind\": \"DomainMapping\",\r\n    \"metadata\": {\r\n      \"annotations\": {\r\n        \"run.googleapis.com/operation-id\": \"9557559d-c145-4d75-8b59-8e76795d4928\",\r\n        \"serving.knative.dev/creator\": \"admin@sabiai.app\",\r\n        \"serving.knative.dev/lastModifier\": \"admin@sabiai.app\"\r\n      },\r\n      \"creationTimestamp\": \"2026-06-23T00:09:22.622023Z\",\r\n      \"generation\": 1,\r\n      \"labels\": {\r\n        \"cloud.googleapis.com/location\": \"europe-west1\",\r\n        \"run.googleapis.com/overrideAt\": \"2026-06-23T00:09:27.676Z\"\r\n      },\r\n      \"name\": \"sabiai.app\",\r\n      \"namespace\": \"1047545881519\",\r\n      \"resourceVersion\": \"AAZU4ZH74z0\",\r\n      \"selfLink\": \"/apis/domains.cloudrun.com/v1/namespaces/1047545881519/domainmappings/sabiai.app\",\r\n      \"uid\": \"67e89b01-cca7-46a2-babe-2d206c7c0fd4\"\r\n    },\r\n    \"spec\": {\r\n      \"routeName\": \"sabi-official-site\"\r\n    },\r\n    \"status\": {\r\n      \"conditions\": [\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T01:20:53.842749Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"Ready\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T01:20:53.842749Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"CertificateProvisioned\"\r\n        },\r\n        {\r\n          \"lastTransitionTime\": \"2026-06-23T00:09:29.696417Z\",\r\n          \"status\": \"True\",\r\n          \"type\": \"DomainRoutable\"\r\n        }\r\n      ],\r\n      \"mappedRouteName\": \"sabi-official-site\",\r\n      \"observedGeneration\": 1,\r\n      \"resourceRecords\": [\r\n        {\r\n          \"rrdata\": \"216.239.32.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.34.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.36.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"216.239.38.21\",\r\n          \"type\": \"A\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:32::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:34::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:36::15\",\r\n          \"type\": \"AAAA\"\r\n        },\r\n        {\r\n          \"rrdata\": \"2001:4860:4802:38::15\",\r\n          \"type\": \"AAAA\"\r\n        }\r\n      ]\r\n    }\r\n  }\r\n]",
      "stderr": "",
      "ok": true
    },
    "liveRoot": {
      "name": "live_https_root",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200\r\nLENGTH=48136",
      "stderr": "",
      "ok": true
    },
    "liveLegalTerms": {
      "name": "live_terms_pdf_head",
      "command": "$u=\"https://sabiai.app/legal/sabi-terms-of-service-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "livePrivacy": {
      "name": "live_privacy_pdf_head",
      "command": "$u=\"https://sabiai.app/legal/sabi-privacy-policy-uk-gdpr-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "enabledApis": {
      "name": "enabled_google_cloud_apis_readonly",
      "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
      "status": 0,
      "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
      "stderr": "",
      "ok": true
    },
    "iamFirebaseRolesNoSecrets": {
      "name": "iam_policy_firebase_related_roles_readonly_no_secrets",
      "command": "gcloud projects get-iam-policy sabi-official-prod --format=json 2>$null",
      "status": 0,
      "stdout": "{\r\n  \"bindings\": [\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-artifactregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/artifactregistry.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:1047545881519@cloudbuild.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.builds.builder\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-cloudbuild.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/cloudbuild.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@containerregistry.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/containerregistry.ServiceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"user:admin@sabiai.app\"\r\n      ],\r\n      \"role\": \"roles/owner\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@gcp-sa-pubsub.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/pubsub.serviceAgent\"\r\n    },\r\n    {\r\n      \"members\": [\r\n        \"serviceAccount:service-1047545881519@serverless-robot-prod.iam.gserviceaccount.com\"\r\n      ],\r\n      \"role\": \"roles/run.serviceAgent\"\r\n    }\r\n  ],\r\n  \"etag\": \"BwZU38ysNgQ=\",\r\n  \"version\": 1\r\n}",
      "stderr": "",
      "ok": true
    }
  },
  "firebaseFindingsCount": 414,
  "firebaseFindings": [
    {
      "file": "admin-ui/package.json",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "    \"appId\": \"com.sabi.admin\","
        }
      ]
    },
    {
      "file": "admin-ui/src/admin-i18n.ts",
      "matched": [
        "Firebase",
        "apiKey"
      ],
      "snippets": [
        {
          "line": 346,
          "preview": "  \"field.apiKey\": \"API-ключ\","
        },
        {
          "line": 759,
          "preview": "  \"providers.description\": \"Bank, to ‘lov, KYC, AML, sun ʼiy intellekt, Redis, Firebase and hamyon provayder kalitlar.\","
        },
        {
          "line": 824,
          "preview": "  \"field.apiKey\": \"API kaliti\","
        },
        {
          "line": 878,
          "preview": "  \"provider.push_provider.title\": \"Push / Firebase Provayder\","
        },
        {
          "line": 1221,
          "preview": "  \"providers.description\": \"Bank, to ‘lov, KYC, AML, sun ʼiy intellekt, Redis, Firebase va hamyon provayder kalitlari.\","
        },
        {
          "line": 1286,
          "preview": "  \"field.apiKey\": \"API kalit\","
        },
        {
          "line": 1340,
          "preview": "  \"provider.push_provider.title\": \"Push / Firebase provayder\","
        },
        {
          "line": 1720,
          "preview": "  \"field.apiKey\": \"API 密钥\","
        }
      ]
    },
    {
      "file": "admin-ui/src/App.tsx",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9246,
          "preview": "        <div className=\"statCard\"><span>API keys</span><strong>{summary?.activeApiKeys ?? 0}/{summary?.apiKeys ?? 0}</strong></div>"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiAdminControl007U.tsx",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 37,
          "preview": "    appId: \"Application ID\","
        },
        {
          "line": 100,
          "preview": "    appId: \"Application ID\","
        },
        {
          "line": 163,
          "preview": "    appId: \"Application ID\","
        },
        {
          "line": 226,
          "preview": "    appId: \"Application ID\","
        },
        {
          "line": 606,
          "preview": "              <label>{copy.appId}<input value={form.applicationId} onChange={(e) => setField(\"applicationId\", e.target.value)} /></label>"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiAdminControl007W.tsx",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 83,
          "preview": "  appId: string;"
        },
        {
          "line": 126,
          "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
        },
        {
          "line": 131,
          "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
        },
        {
          "line": 136,
          "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
        },
        {
          "line": 141,
          "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
        },
        {
          "line": 222,
          "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
        },
        {
          "line": 247,
          "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiAdminControl007X.tsx",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 83,
          "preview": "  appId: string;"
        },
        {
          "line": 126,
          "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
        },
        {
          "line": 131,
          "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
        },
        {
          "line": 136,
          "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
        },
        {
          "line": 141,
          "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
        },
        {
          "line": 222,
          "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
        },
        {
          "line": 247,
          "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiAdminControl007Y.tsx",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 83,
          "preview": "  appId: string;"
        },
        {
          "line": 127,
          "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
        },
        {
          "line": 132,
          "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
        },
        {
          "line": 137,
          "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
        },
        {
          "line": 142,
          "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
        },
        {
          "line": 223,
          "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
        },
        {
          "line": 248,
          "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiAdminControl007Z.tsx",
      "matched": [
        "appId"
      ],
      "snippets": [
        {
          "line": 193,
          "preview": "  appId: string;"
        },
        {
          "line": 245,
          "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Новых заявок нет\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данные авто\", driverDocs: \"Документы водителя\", ca"
        },
        {
          "line": 250,
          "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"No new applications\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData: \"Vehicle data\", driverDocs: \"Driver documents\", carPh"
        },
        {
          "line": 255,
          "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Yangi arizalar yo‘q\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carData: \"Avto ma’lumoti\", driverDocs: \"Haydovchi hujja"
        },
        {
          "line": 260,
          "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"没有新申请\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject: \"拒绝申请\", requestD"
        },
        {
          "line": 342,
          "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
        },
        {
          "line": 367,
          "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
        }
      ]
    },
    {
      "file": "admin-ui/src/TaxiApiKeyReadinessPreflight039P.tsx",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 12,
          "preview": "  apiKeyReadinessPreflightReady: true,"
        },
        {
          "line": 14,
          "preview": "  apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "admin-ui/src/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 4949,
          "preview": "    apiKeys: number;"
        }
      ]
    },
    {
      "file": "src/app.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 49,
          "preview": "import { initFirebase } from \"./core/push/firebase\";"
        },
        {
          "line": 981,
          "preview": "    initFirebase();"
        },
        {
          "line": 983,
          "preview": "    console.warn(\"Firebase push is disabled for this run:\", error);"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/ai-provider-router.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 65,
          "preview": "        apiKeysMustStayOnServer: true,"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/ai-provider-router.types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 38,
          "preview": "    apiKeysMustStayOnServer: true"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/providers/google-translation.provider.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "      apiKey: process.env.AI_GOOGLE_TRANSLATION_GATEWAY_API_KEY,"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/providers/internal-translation.provider.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "      apiKey: process.env.AI_INTERNAL_TRANSLATION_GATEWAY_API_KEY,"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/providers/translation-gateway-provider.shared.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  apiKey?: string"
        },
        {
          "line": 83,
          "preview": "  private readonly apiKey?: string"
        },
        {
          "line": 92,
          "preview": "    this.apiKey = config.apiKey?.trim() || undefined"
        },
        {
          "line": 161,
          "preview": "    if (this.apiKey) {"
        },
        {
          "line": 162,
          "preview": "      headers[\"x-api-key\"] = this.apiKey"
        },
        {
          "line": 163,
          "preview": "      headers[\"x-ai-gateway-api-key\"] = this.apiKey"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/providers/yandex-gpt.provider.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 92,
          "preview": "  const apiKey ="
        },
        {
          "line": 104,
          "preview": "  if (apiKey) return `Api-Key ${apiKey}`"
        },
        {
          "line": 482,
          "preview": "  private readonly apiKey?: string"
        },
        {
          "line": 489,
          "preview": "    this.apiKey ="
        },
        {
          "line": 520,
          "preview": "    return this.gatewayUrl && this.apiKey && this.modelCandidates.length > 0 ? \"configured\" : \"unconfigured\""
        },
        {
          "line": 524,
          "preview": "    if (!this.gatewayUrl || !this.apiKey || this.modelCandidates.length === 0) {"
        },
        {
          "line": 788,
          "preview": "          authorization: `Api-Key ${this.apiKey}`,"
        }
      ]
    },
    {
      "file": "src/core/kernel/ai/providers/yandex-translation.provider.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "      apiKey: process.env.AI_YANDEX_TRANSLATION_GATEWAY_API_KEY,"
        }
      ]
    },
    {
      "file": "src/core/push/firebase.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 1,
          "preview": "import admin from \"firebase-admin\""
        },
        {
          "line": 5,
          "preview": "export function initFirebase() {"
        },
        {
          "line": 16,
          "preview": "export function getFirebase() {"
        },
        {
          "line": 19,
          "preview": "    throw new Error(\"firebase_not_initialized\")"
        }
      ]
    },
    {
      "file": "src/modules/admin/admin.providers.ts",
      "matched": [
        "Firebase",
        "apiKey"
      ],
      "snippets": [
        {
          "line": 17,
          "preview": "    secretFields: [\"apiKey\"],"
        },
        {
          "line": 27,
          "preview": "    secretFields: [\"apiKey\"],"
        },
        {
          "line": 37,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 47,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 57,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 67,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 77,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 87,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 97,
          "preview": "    secretFields: [\"apiKey\", \"privateKey\", \"webhookSecret\"],"
        },
        {
          "line": 107,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 117,
          "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
        },
        {
          "line": 127,
          "preview": "    secretFields: [\"apiKey\"],"
        }
      ]
    },
    {
      "file": "src/modules/admin/admin.routes.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 12719,
          "preview": "    apiKeys: number;"
        },
        {
          "line": 12806,
          "preview": "  const apiKeys = credentials.filter((item) => item.kind === \"api_key\");"
        },
        {
          "line": 12808,
          "preview": "  const activeApiKeys = apiKeys.filter((item) => item.status === \"active\");"
        },
        {
          "line": 12831,
          "preview": "      apiKeys: apiKeys.length,"
        }
      ]
    },
    {
      "file": "src/modules/ai/infrastructure/routes/ai-voice.routes.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 145,
          "preview": "  const apiKey = area === \"stt\""
        },
        {
          "line": 152,
          "preview": "  if (apiKey) headers.authorization = `Api-Key ${apiKey}`"
        },
        {
          "line": 230,
          "preview": "  const apiKey = area === \"stt\""
        },
        {
          "line": 237,
          "preview": "  if (apiKey) return `Api-Key ${apiKey}`"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/240y/sms240y.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 42,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/240y/sms240y.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 18,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/240z/sms240z.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 57,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/240z/sms240z.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241a/sms241a.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 49,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241a/sms241a.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 56,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241b/sms241b.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 51,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241b/sms241b.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241c/sms241c.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 52,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241c/sms241c.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241d/sms241d.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 56,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241d/sms241d.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 30,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241e/sms241e.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241e/sms241e.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241f/sms241f.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241f/sms241f.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 6,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241g/sms241g.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 54,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241g/sms241g.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241h/sms241h.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 56,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241h/sms241h.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 18,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241i/sms241i.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241i/sms241i.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241j/sms241j.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241j/sms241j.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 40,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241k/sms241k.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 59,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241k/sms241k.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 41,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241l/sms241l.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241l/sms241l.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241m/sms241m.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 57,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241m/sms241m.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241n/sms241n.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241n/sms241n.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241o/sms241o.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 55,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241o/sms241o.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: boolean;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241p/sms241p.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 61,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241p/sms241p.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241q/sms241q.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 59,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241q/sms241q.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241r/sms241r.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 60,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241r/sms241r.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241s/sms241s.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 86,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241s/sms241s.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241t/sms241t.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 87,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241t/sms241t.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241u/sms241u.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 59,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241u/sms241u.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  | 'noFirebaseApiCall'"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241v/sms241v.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 60,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241v/sms241v.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  | 'noFirebaseApiCall'"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241w/sms241w.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241w/sms241w.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241x/sms241x.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241x/sms241x.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241y/sms241y.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 87,
          "preview": "    firebaseApiCallByChecker: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241y/sms241y.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebaseApiCallByChecker: false;"
        },
        {
          "line": 68,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241z/sms241z.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 87,
          "preview": "    firebaseApiCallByChecker: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/241z/sms241z.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebaseApiCallByChecker: false;"
        },
        {
          "line": 68,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242a/sms242a.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 44,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242a/sms242a.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242b/sms242b.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 42,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242b/sms242b.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242c/sms242c.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 42,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242c/sms242c.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242d/sms242d.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 42,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242d/sms242d.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242e/sms242e.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 43,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242e/sms242e.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242f/sms242f.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242f/sms242f.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242g/sms242g.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242g/sms242g.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242h/sms242h.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 59,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242h/sms242h.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242i/sms242i.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 60,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/242i/sms242i.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelContract239L.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 11,
          "preview": "  firebaseExactValuesProvided: false,"
        },
        {
          "line": 12,
          "preview": "  realFirebaseProviderConnected: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelContract239L.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 4,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 6,
          "preview": "  firebaseExactValuesProvided: false;"
        },
        {
          "line": 7,
          "preview": "  realFirebaseProviderConnected: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelGuards239L.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "  noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelLanguageContract239N.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    'Firebase exact values',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelVisualPlacement239N.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "    'Firebase exact values status',"
        },
        {
          "line": 16,
          "preview": "    'Real Firebase provider connection status',"
        },
        {
          "line": 39,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 41,
          "preview": "  firebaseExactValuesProvided: false,"
        },
        {
          "line": 42,
          "preview": "  realFirebaseProviderConnected: false,"
        },
        {
          "line": 58,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 60,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 91,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 93,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelVisualPlacement239N.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 6,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 8,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 9,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239h/authPhoneSmsControllerContracts239H.ts",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 12,
          "preview": "    firebaseApiCallEnabled: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.service.ts",
      "matched": [
        "firebase",
        "Firebase",
        "PhoneAuthProvider"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "  FirebasePhoneAuthProviderReadiness239H,"
        },
        {
          "line": 3,
          "preview": "  FirebasePhoneAuthStartInput239H,"
        },
        {
          "line": 4,
          "preview": "  FirebasePhoneAuthVerifyInput239H,"
        },
        {
          "line": 5,
          "preview": "} from './firebasePhoneAuthProviderAdapter239H.types';"
        },
        {
          "line": 18,
          "preview": "export function getFirebasePhoneAuthReadiness239H(): FirebasePhoneAuthProviderReadiness239H {"
        },
        {
          "line": 21,
          "preview": "    provider: 'FirebasePhone Auth',"
        },
        {
          "line": 24,
          "preview": "    firebaseApiCallEnabled: false,"
        },
        {
          "line": 33,
          "preview": "export function createFirebasePhoneAuthStartCandidate239H(input: FirebasePhoneAuthStartInput239H) {"
        },
        {
          "line": 39,
          "preview": "    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',"
        },
        {
          "line": 43,
          "preview": "export function createFirebasePhoneAuthVerifyCandidate239H(input: FirebasePhoneAuthVerifyInput239H) {"
        },
        {
          "line": 49,
          "preview": "    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',"
        },
        {
          "line": 54,
          "preview": "export type FirebasePhoneAuthProviderAdapter239H = Readonly<{"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.types.ts",
      "matched": [
        "firebase",
        "Firebase",
        "PhoneAuthProvider"
      ],
      "snippets": [
        {
          "line": 1,
          "preview": "export type FirebasePhoneAuthProviderAdapterStatus239H = 'disabled_by_default';"
        },
        {
          "line": 3,
          "preview": "export interface FirebasePhoneAuthProviderReadiness239H {"
        },
        {
          "line": 5,
          "preview": "  readonly provider: 'FirebasePhone Auth';"
        },
        {
          "line": 6,
          "preview": "  readonly status: FirebasePhoneAuthProviderAdapterStatus239H;"
        },
        {
          "line": 8,
          "preview": "  readonly firebaseApiCallEnabled: false;"
        },
        {
          "line": 16,
          "preview": "export interface FirebasePhoneAuthStartInput239H {"
        },
        {
          "line": 22,
          "preview": "export interface FirebasePhoneAuthVerifyInput239H {"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239h/index.ts",
      "matched": [
        "firebase",
        "Firebase",
        "PhoneAuthProvider"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "  FirebasePhoneAuthProviderAdapterStatus239H,"
        },
        {
          "line": 3,
          "preview": "  FirebasePhoneAuthProviderReadiness239H,"
        },
        {
          "line": 4,
          "preview": "  FirebasePhoneAuthStartInput239H,"
        },
        {
          "line": 5,
          "preview": "  FirebasePhoneAuthVerifyInput239H,"
        },
        {
          "line": 6,
          "preview": "} from './firebasePhoneAuthProviderAdapter239H.types';"
        },
        {
          "line": 9,
          "preview": "  getFirebasePhoneAuthReadiness239H,"
        },
        {
          "line": 10,
          "preview": "  createFirebasePhoneAuthStartCandidate239H,"
        },
        {
          "line": 11,
          "preview": "  createFirebasePhoneAuthVerifyCandidate239H,"
        },
        {
          "line": 12,
          "preview": "} from './firebasePhoneAuthProviderAdapter239H.service';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239j/adminSmsReadinessRouteContract239J.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 6,
          "preview": "  providerSelectedForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 7,
          "preview": "  firebaseApiCallNow: false;"
        },
        {
          "line": 19,
          "preview": "  providerSelectedForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 20,
          "preview": "  firebaseApiCallNow: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/firebase-adapter-239j/authPhoneSmsRouteMountCandidate239J.ts",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "  firebaseApiCallNow: false;"
        },
        {
          "line": 22,
          "preview": "  firebaseApiCallNow: false,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-240e/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandAcceptanceGate240E.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 144,
          "preview": "    'firebaseApiBoundary',"
        },
        {
          "line": 145,
          "preview": "    'Firebase API boundary',"
        },
        {
          "line": 146,
          "preview": "    'firebase_boundary',"
        },
        {
          "line": 148,
          "preview": "    'Firebase remains disabled; 240E cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 211,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 248,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 283,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 284,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 286,
          "preview": "    realFirebaseProviderConnected: 0,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-240e/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandAcceptanceGate240E.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "  | 'firebase_boundary'"
        },
        {
          "line": 45,
          "preview": "  | 'firebaseApiBoundary'"
        },
        {
          "line": 110,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 111,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 113,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 124,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 161,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-240g/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReport240G.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 562,
          "preview": "    field: 'firebaseStatus',"
        },
        {
          "line": 563,
          "preview": "    label: 'firebaseStatus',"
        },
        {
          "line": 564,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 566,
          "preview": "    reportRule: 'Firebase remains disabled; 240G cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 842,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 879,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 916,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 917,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 919,
          "preview": "    realFirebaseProviderConnected: 0,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-240g/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReport240G.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'acceptance_report_summary' | 'confirmed_stage_chain' | 'exact_owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary' | 'backend_runtime_bounda"
        },
        {
          "line": 13,
          "preview": "  'acceptanceReportSummary' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | 'confirmed240ABuildStaticCheck' | 'adminBuildExecutionStatus' | 'ex"
        },
        {
          "line": 78,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 79,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 81,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 92,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 129,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-static-240h/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReportStaticCheck240H.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 10,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 598,
          "preview": "    field: 'firebaseStatus',"
        },
        {
          "line": 599,
          "preview": "    label: 'firebaseStatus',"
        },
        {
          "line": 600,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 602,
          "preview": "    staticCheckRule: 'Firebase remains disabled; 240H cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 899,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 900,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 902,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 912,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-static-240h/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReportStaticCheck240H.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'report_static_check_summary' | 'confirmed_stage_chain' | 'exact_owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary' | 'backend_runtime_boun"
        },
        {
          "line": 13,
          "preview": "  'reportStaticCheckSummary' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | 'confirmed240ABuildStaticCheck' "
        },
        {
          "line": 79,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 80,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 82,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 93,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 130,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-static-240f/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceStaticCheck240F.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 426,
          "preview": "    field: 'firebaseApiBoundary',"
        },
        {
          "line": 427,
          "preview": "    label: 'firebaseApiBoundary',"
        },
        {
          "line": 428,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 430,
          "preview": "    staticCheckRule: 'Firebase remains disabled; 240F cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 672,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 709,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 745,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 746,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 748,
          "preview": "    realFirebaseProviderConnected: 0,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-acceptance-static-240f/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceStaticCheck240F.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'owner_command_acceptance_static_check' | 'acceptance_gate_dependency' | 'admin_build_execution_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'runtime_mount_boundary' | 'secret_visibility_boundary' | 'firebase_boundary' | 'sms_pro"
        },
        {
          "line": 13,
          "preview": "  'ownerExactBuildSmokeCommandStaticCheckSlot' | 'ownerCommandAcceptanceGateDependency' | 'ownerCommandShapeValidationDependency' | 'ownerBuildSmokeApprovalGateDependency' | 'adminBuildExecutionApprovalBoundary' | 'adminBuildCommandBoundary' | 'maskedAdminStat"
        },
        {
          "line": 77,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 78,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 80,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 91,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 128,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-approval-240b/smsReadinessAdminReadinessPanelMaskedStatusOwnerBuildSmokeApprovalGate240B.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 570,
          "preview": "    field: 'firebaseDisabledApprovalBoundary',"
        },
        {
          "line": 571,
          "preview": "    label: 'firebase Disabled Approval Boundary',"
        },
        {
          "line": 572,
          "preview": "    category: 'firebase_disabled_approval_boundary',"
        },
        {
          "line": 576,
          "preview": "    approvalGateText: 'Firebase remains disabled; 240B cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
        },
        {
          "line": 907,
          "preview": "  firebaseExactValuesProvided: 0,"
        },
        {
          "line": 908,
          "preview": "  firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 910,
          "preview": "  realFirebaseProviderConnected: 0,"
        },
        {
          "line": 921,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 956,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-approval-240b/smsReadinessAdminReadinessPanelMaskedStatusOwnerBuildSmokeApprovalGate240B.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  | 'firebase_disabled_approval_boundary'"
        },
        {
          "line": 60,
          "preview": "  | 'firebaseDisabledApprovalBoundary'"
        },
        {
          "line": 145,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 180,
          "preview": "  readonly firebaseExactValuesProvided: 0;"
        },
        {
          "line": 181,
          "preview": "  readonly firebaseSecretValuesProvided: 0;"
        },
        {
          "line": 183,
          "preview": "  readonly realFirebaseProviderConnected: 0;"
        },
        {
          "line": 194,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-command-240c/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandCandidate240C.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 694,
          "preview": "    field: 'firebaseDisabledCommandBoundary',"
        },
        {
          "line": 695,
          "preview": "    label: 'firebase Disabled Command Boundary',"
        },
        {
          "line": 696,
          "preview": "    category: 'firebase_disabled_command_boundary',"
        },
        {
          "line": 700,
          "preview": "    commandCandidateText: 'Firebase remains disabled; 240C cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
        },
        {
          "line": 1061,
          "preview": "  firebaseExactValuesProvided: 0,"
        },
        {
          "line": 1062,
          "preview": "  firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 1064,
          "preview": "  realFirebaseProviderConnected: 0,"
        },
        {
          "line": 1075,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 1111,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-command-240c/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandCandidate240C.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 31,
          "preview": "  | 'firebase_disabled_command_boundary'"
        },
        {
          "line": 65,
          "preview": "  | 'firebaseDisabledCommandBoundary'"
        },
        {
          "line": 158,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 196,
          "preview": "  readonly firebaseExactValuesProvided: 0;"
        },
        {
          "line": 197,
          "preview": "  readonly firebaseSecretValuesProvided: 0;"
        },
        {
          "line": 199,
          "preview": "  readonly realFirebaseProviderConnected: 0;"
        },
        {
          "line": 210,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-240r/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGate240R.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 68,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 76,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 113,
          "preview": "  'Firebase remains disabled; 240R cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-240r/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGate240R.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 41,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-static-240s/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGateStaticCheck240S.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 69,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 77,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 114,
          "preview": "  'Firebase remains disabled; 240S cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-static-240s/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGateStaticCheck240S.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 33,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 42,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-candidate-240o/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildCandidate240O.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "    'I approve SMS-240O owner exact command candidate for Admin UI masked readiness build smoke planning only: prepare the future npm run build command shape for admin-ui, still no live SMS, no Firebase call, no SMS provider call, no secrets, no Secret Manager"
        },
        {
          "line": 58,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 66,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 102,
          "preview": "  'Firebase remains disabled; 240O cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-candidate-240o/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildCandidate240O.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 38,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-240p/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidation240P.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 65,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 73,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 110,
          "preview": "  'Firebase remains disabled; 240P cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-240p/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidation240P.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 30,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 39,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-static-240q/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidationStaticCheck240Q.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 66,
          "preview": "  realFirebaseProviderConnected: 0,"
        },
        {
          "line": 74,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 111,
          "preview": "  'Firebase remains disabled; 240Q cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-static-240q/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidationStaticCheck240Q.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 31,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 40,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-boundary-240t/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalBoundary240T.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 48,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 77,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 160,
          "preview": "noFirebaseApiCall: true"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-boundary-static-240u/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalBoundaryStaticCheck240U.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 49,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 78,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 161,
          "preview": "noFirebaseApiCall: true"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-acceptance-gate-240x/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandAcceptanceGate240X.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 55,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 63,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-acceptance-gate-240x/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandAcceptanceGate240X.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 35,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-240v/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReady240V.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 50,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 79,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 144,
          "preview": "realFirebaseProviderConnected: 0"
        },
        {
          "line": 170,
          "preview": "noFirebaseApiCall: true"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-static-240w/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReadyStaticCheck240W.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 66,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 74,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-static-240w/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReadyStaticCheck240W.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 37,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 46,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-240i/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummary240I.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 10,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 666,
          "preview": "    field: 'firebaseStatus',"
        },
        {
          "line": 667,
          "preview": "    label: 'firebaseStatus',"
        },
        {
          "line": 668,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 670,
          "preview": "    summaryRule: 'Firebase remains disabled; 240I cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 968,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 969,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 971,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 981,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-240i/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummary240I.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'final_pre_build_summary' | 'confirmed_stage_chain' | 'owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'admin_build_readiness_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary"
        },
        {
          "line": 13,
          "preview": "  'finalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | '"
        },
        {
          "line": 80,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 81,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 83,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 94,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 131,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-240k/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundary240K.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 10,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 666,
          "preview": "    field: 'firebaseBoundary',"
        },
        {
          "line": 667,
          "preview": "    label: 'firebaseBoundary',"
        },
        {
          "line": 668,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 670,
          "preview": "    boundaryRule: 'Firebase remains disabled; 240K cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 967,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 975,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-240k/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundary240K.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'final_pre_build_summary_acceptance_boundary' | 'confirmed_stage_chain' | 'owner_command_boundary' | 'owner_approval_boundary' | 'admin_build_boundary' | 'admin_ui_boundary' | 'admin_runtime_boundary' | 'backend_runtime_boundary' | 'secret_manager_boundary' "
        },
        {
          "line": 13,
          "preview": "  'finalPreBuildSummaryAcceptanceBoundary' | 'confirmed240JFinalPreBuildStaticCheck' | 'confirmed240IFinalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'conf"
        },
        {
          "line": 79,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 88,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 125,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-static-240l/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundaryStaticCheck240L.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 66,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-static-240l/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundaryStaticCheck240L.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 28,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 37,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-static-240j/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryStaticCheck240J.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 10,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        },
        {
          "line": 700,
          "preview": "    field: 'firebaseStatus',"
        },
        {
          "line": 701,
          "preview": "    label: 'firebaseStatus',"
        },
        {
          "line": 702,
          "preview": "    category: 'firebase_boundary',"
        },
        {
          "line": 704,
          "preview": "    summaryRule: 'Firebase remains disabled; 240J cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 1003,
          "preview": "    firebaseExactValuesProvided: 0,"
        },
        {
          "line": 1004,
          "preview": "    firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 1006,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 1016,
          "preview": "    noFirebaseApiCall: true,"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-static-240j/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryStaticCheck240J.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  'final_pre_build_summary_static_check' | 'confirmed_stage_chain' | 'owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'admin_build_readiness_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_run"
        },
        {
          "line": 13,
          "preview": "  'finalPreBuildSummaryStaticCheck' | 'confirmed240IFinalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommand"
        },
        {
          "line": 81,
          "preview": "  readonly firebaseExactValuesProvided: number;"
        },
        {
          "line": 82,
          "preview": "  readonly firebaseSecretValuesProvided: number;"
        },
        {
          "line": 84,
          "preview": "  readonly realFirebaseProviderConnected: number;"
        },
        {
          "line": 95,
          "preview": "  readonly noFirebaseApiCall: boolean;"
        },
        {
          "line": 132,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-ready-notice-240m/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNotice240M.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 34,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 42,
          "preview": "    firebaseApiCallByChecker: false,"
        },
        {
          "line": 73,
          "preview": "    'Firebase remains disabled; 240M cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        },
        {
          "line": 83,
          "preview": "    'The approval command must remain non-secret and must not include Firebase secrets, SMS provider secrets, Secret Manager output, tokens, DB data, or live provider responses.',"
        },
        {
          "line": 99,
          "preview": "// noFirebaseApiCall: true"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-ready-notice-240m/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNotice240M.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 33,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 42,
          "preview": "  firebaseApiCallByChecker: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-ready-notice-static-240n/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNoticeStaticCheck240N.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 33,
          "preview": "    realFirebaseProviderConnected: 0,"
        },
        {
          "line": 67,
          "preview": "    noFirebaseApiCall: true,"
        },
        {
          "line": 98,
          "preview": "    'Firebase remains disabled; 240N cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-ready-notice-static-240n/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNoticeStaticCheck240N.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 30,
          "preview": "  realFirebaseProviderConnected: 0;"
        },
        {
          "line": 66,
          "preview": "  noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-shape-240d/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandShapeValidation240D.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 136,
          "preview": "    shapeValidationText: 'Allowed future command shape is limited to Admin masked readiness build smoke only; it cannot mention Firebase connection, SMS provider connection, Secret Manager access, DB writes, deploy, or production launch.',"
        },
        {
          "line": 690,
          "preview": "    field: 'firebaseShapeBoundary',"
        },
        {
          "line": 691,
          "preview": "    label: 'firebaseShapeBoundary',"
        },
        {
          "line": 692,
          "preview": "    category: 'firebase_shape_boundary',"
        },
        {
          "line": 696,
          "preview": "    shapeValidationText: 'Firebase remains disabled; 240D cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
        },
        {
          "line": 1113,
          "preview": "  firebaseExactValuesProvided: 0,"
        },
        {
          "line": 1114,
          "preview": "  firebaseSecretValuesProvided: 0,"
        },
        {
          "line": 1116,
          "preview": "  realFirebaseProviderConnected: 0,"
        },
        {
          "line": 1127,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 1163,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-shape-240d/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandShapeValidation240D.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  | 'firebase_shape_boundary'"
        },
        {
          "line": 64,
          "preview": "  | 'firebaseShapeBoundary'"
        },
        {
          "line": 163,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 199,
          "preview": "  readonly firebaseExactValuesProvided: 0;"
        },
        {
          "line": 200,
          "preview": "  readonly firebaseSecretValuesProvided: 0;"
        },
        {
          "line": 202,
          "preview": "  readonly realFirebaseProviderConnected: 0;"
        },
        {
          "line": 213,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-smoke-239z/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokePlan239Z.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 262,
          "preview": "    field: 'firebasePublicConfigBuildStatusPlan',"
        },
        {
          "line": 263,
          "preview": "    label: 'Firebase public config build status plan',"
        },
        {
          "line": 264,
          "preview": "    category: 'firebase_public_config_status_plan',"
        },
        {
          "line": 268,
          "preview": "    buildSmokePlanText: 'Plan to show only future public Firebase config readiness status; no Firebase API call, initialize, provider connect, or live auth is enabled.',"
        },
        {
          "line": 292,
          "preview": "    field: 'firebaseSecretMaskedBuildStatusPlan',"
        },
        {
          "line": 293,
          "preview": "    label: 'Firebase secret masked build status plan',"
        },
        {
          "line": 294,
          "preview": "    category: 'firebase_secret_masked_status_plan',"
        },
        {
          "line": 298,
          "preview": "    buildSmokePlanText: 'Plan to show only locked Firebase secret readiness badges; no API key, Admin credential, Secret Manager value, or credential content can render.',"
        },
        {
          "line": 388,
          "preview": "    buildSmokePlanText: 'Plan to show only authorized-domain and FIX75 public-site continuity status; no DNS change, Firebase allowlist call, deploy, route mount, or public launch is enabled.',"
        },
        {
          "line": 628,
          "preview": "    buildSmokePlanText: 'Plan disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, build execution, or live SMS.',"
        },
        {
          "line": 700,
          "preview": "    'firebasePublicConfigBuildStatusPlan',"
        },
        {
          "line": 701,
          "preview": "    'firebaseSecretMaskedBuildStatusPlan',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-smoke-239z/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokePlan239Z.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "  | 'firebase_public_config_status_plan'"
        },
        {
          "line": 23,
          "preview": "  | 'firebase_secret_masked_status_plan'"
        },
        {
          "line": 46,
          "preview": "  | 'firebasePublicConfigBuildStatusPlan'"
        },
        {
          "line": 47,
          "preview": "  | 'firebaseSecretMaskedBuildStatusPlan'"
        },
        {
          "line": 137,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 169,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 170,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 172,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 185,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-static-240a/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeStaticCheck240A.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 228,
          "preview": "    field: 'firebasePublicConfigStaticStatus',"
        },
        {
          "line": 229,
          "preview": "    label: 'firebasePublicConfig Static Status',"
        },
        {
          "line": 230,
          "preview": "    category: 'firebase_public_config_static_status',"
        },
        {
          "line": 234,
          "preview": "    staticCheckText: 'Static-check only Firebase public config readiness status; Firebase remains disabled and no Firebase API call is enabled.',"
        },
        {
          "line": 259,
          "preview": "    field: 'firebaseSecretMaskedStaticStatus',"
        },
        {
          "line": 260,
          "preview": "    label: 'firebaseSecretMasked Static Status',"
        },
        {
          "line": 261,
          "preview": "    category: 'firebase_secret_masked_static_status',"
        },
        {
          "line": 265,
          "preview": "    staticCheckText: 'Static-check only masked Firebase secret readiness; API keys, Admin service account material, and Secret Manager paths are never displayed, copied, exported, read, or written.',"
        },
        {
          "line": 358,
          "preview": "    staticCheckText: 'Static-check authorized-domain and FIX75 public-site domain status only; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
        },
        {
          "line": 544,
          "preview": "    staticCheckText: 'Static-check disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, build execution, deploy, or live SMS.',"
        },
        {
          "line": 668,
          "preview": "    staticCheckText: 'Static-check Owner approval boundary only; 240A cannot approve live action, run Admin build, mount runtime, connect Firebase/SMS provider, write secrets, deploy, or launch production.',"
        },
        {
          "line": 702,
          "preview": "    'firebasePublicConfigStaticStatus',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-build-static-240a/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeStaticCheck240A.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  | 'firebase_public_config_static_status'"
        },
        {
          "line": 27,
          "preview": "  | 'firebase_secret_masked_static_status'"
        },
        {
          "line": 48,
          "preview": "  | 'firebasePublicConfigStaticStatus'"
        },
        {
          "line": 49,
          "preview": "  | 'firebaseSecretMaskedStaticStatus'"
        },
        {
          "line": 142,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 177,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 178,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 180,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 193,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-placement-239x/smsReadinessAdminReadinessPanelMaskedStatusPlacementPlan239X.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 83,
          "preview": "    'Show a locked Owner approval required banner only; this plan cannot approve live SMS, Firebase calls, provider calls, Admin runtime mount, Google Cloud deploy, or production launch.',"
        },
        {
          "line": 93,
          "preview": "    'Show safe readiness percentages only: 239P through 239W are 100 percent, while real Firebase, real SMS provider, real SMS, real route runtime, real Admin runtime, deploy, and production launch stay 0 percent.',"
        },
        {
          "line": 97,
          "preview": "    'firebasePublicConfigStatusPlacement',"
        },
        {
          "line": 98,
          "preview": "    'Firebase public config masked status placement',"
        },
        {
          "line": 99,
          "preview": "    'firebase_public_config_status_placement',"
        },
        {
          "line": 103,
          "preview": "    'Show only masked Firebase public config readiness labels and missing-value status; do not store exact values, call Firebase, read env, or enable auth runtime from this placement plan.',"
        },
        {
          "line": 107,
          "preview": "    'firebaseSecretMaskedStatusPlacement',"
        },
        {
          "line": 108,
          "preview": "    'Firebase secret masked status placement',"
        },
        {
          "line": 109,
          "preview": "    'firebase_secret_masked_status_placement',"
        },
        {
          "line": 113,
          "preview": "    'Show only locked secret reference status for Firebase API key and Admin credential material; never render, copy, export, log, store, or reveal a plain secret in Admin UI.',"
        },
        {
          "line": 143,
          "preview": "    'Show only authorized-domain and FIX75 public-site domain planning status; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
        },
        {
          "line": 223,
          "preview": "    'Plan disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, or live SMS.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-placement-239x/smsReadinessAdminReadinessPanelMaskedStatusPlacementPlan239X.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  | 'firebase_public_config_status_placement'"
        },
        {
          "line": 20,
          "preview": "  | 'firebase_secret_masked_status_placement'"
        },
        {
          "line": 37,
          "preview": "  | 'firebasePublicConfigStatusPlacement'"
        },
        {
          "line": 38,
          "preview": "  | 'firebaseSecretMaskedStatusPlacement'"
        },
        {
          "line": 116,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 142,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 143,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 145,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 158,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-status-239w/smsReadinessMaskedAdminReadinessStatusContract239W.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 54,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 74,
          "preview": "    'firebaseProjectIdMaskedStatus',"
        },
        {
          "line": 75,
          "preview": "    'Firebase project id masked status',"
        },
        {
          "line": 76,
          "preview": "    'firebase_public_config_masked_status',"
        },
        {
          "line": 79,
          "preview": "    'Show only missing or pending public Firebase project id status; do not show exact values until separate Owner-approved non-secret acceptance stage.',"
        },
        {
          "line": 83,
          "preview": "    'firebaseAppIdMaskedStatus',"
        },
        {
          "line": 84,
          "preview": "    'Firebase app id masked status',"
        },
        {
          "line": 85,
          "preview": "    'firebase_public_config_masked_status',"
        },
        {
          "line": 88,
          "preview": "    'Show only public app id readiness status; do not connect Firebase and do not store app config from this Admin status contract.',"
        },
        {
          "line": 92,
          "preview": "    'firebaseAuthDomainMaskedStatus',"
        },
        {
          "line": 93,
          "preview": "    'Firebase auth domain masked status',"
        },
        {
          "line": 94,
          "preview": "    'firebase_public_config_masked_status',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-status-239w/smsReadinessMaskedAdminReadinessStatusContract239W.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "  | 'firebase_public_config_masked_status'"
        },
        {
          "line": 16,
          "preview": "  | 'firebase_secret_masked_status'"
        },
        {
          "line": 31,
          "preview": "  | 'firebaseProjectIdMaskedStatus'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseAppIdMaskedStatus'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseAuthDomainMaskedStatus'"
        },
        {
          "line": 34,
          "preview": "  | 'firebaseMessagingSenderIdMaskedStatus'"
        },
        {
          "line": 35,
          "preview": "  | 'firebaseApiKeyMaskedStatusOnly'"
        },
        {
          "line": 36,
          "preview": "  | 'firebaseAdminCredentialMaskedStatusOnly'"
        },
        {
          "line": 86,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 115,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 139,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 140,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-typecheck-239y/smsReadinessAdminReadinessPanelMaskedStatusStaticTypecheck239Y.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 97,
          "preview": "    'Typecheck the locked Owner approval banner only; this static TypeScript check cannot approve Firebase calls, provider calls, live SMS, Admin runtime, deploy, or production launch.',"
        },
        {
          "line": 107,
          "preview": "    'Typecheck safe readiness percentages only: 239P through 239X are 100 percent, while real Firebase, real SMS provider, real SMS, route runtime, Admin runtime, deploy, and production launch stay 0 percent.',"
        },
        {
          "line": 111,
          "preview": "    'firebasePublicConfigStatusTypecheck',"
        },
        {
          "line": 112,
          "preview": "    'Firebase public config status typecheck',"
        },
        {
          "line": 113,
          "preview": "    'firebase_public_config_status_typecheck',"
        },
        {
          "line": 117,
          "preview": "    'Typecheck only masked Firebase public config readiness and missing-value labels; do not accept exact values, call Firebase, read env, or enable auth runtime from this check.',"
        },
        {
          "line": 121,
          "preview": "    'firebaseSecretMaskedStatusTypecheck',"
        },
        {
          "line": 122,
          "preview": "    'Firebase secret masked status typecheck',"
        },
        {
          "line": 123,
          "preview": "    'firebase_secret_masked_status_typecheck',"
        },
        {
          "line": 127,
          "preview": "    'Typecheck locked Firebase secret reference status only; plain Firebase API key and Admin credential material must never render, copy, export, log, store, or appear in Admin UI.',"
        },
        {
          "line": 157,
          "preview": "    'Typecheck authorized-domain and FIX75 public-site domain planning status only; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
        },
        {
          "line": 237,
          "preview": "    'Typecheck disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, or live SMS.',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/masked-admin-typecheck-239y/smsReadinessAdminReadinessPanelMaskedStatusStaticTypecheck239Y.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  | 'firebase_public_config_status_typecheck'"
        },
        {
          "line": 20,
          "preview": "  | 'firebase_secret_masked_status_typecheck'"
        },
        {
          "line": 40,
          "preview": "  | 'firebasePublicConfigStatusTypecheck'"
        },
        {
          "line": 41,
          "preview": "  | 'firebaseSecretMaskedStatusTypecheck'"
        },
        {
          "line": 126,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 154,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 155,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 157,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 170,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-acceptance-239t/smsReadinessOwnerExactNonSecretCandidateAcceptanceGate239T.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 43,
          "preview": "  mayConnectFirebaseNow: false,"
        },
        {
          "line": 73,
          "preview": "    'firebaseProjectIdCandidateAcceptance',"
        },
        {
          "line": 74,
          "preview": "    'Firebase project id non-secret candidate acceptance slot',"
        },
        {
          "line": 75,
          "preview": "    'firebase_public_config_acceptance',"
        },
        {
          "line": 77,
          "preview": "    'Accept a future public Firebase project id candidate only after exact Owner-provided non-secret value validation, not in this stage.',"
        },
        {
          "line": 81,
          "preview": "    'firebaseAppIdCandidateAcceptance',"
        },
        {
          "line": 82,
          "preview": "    'Firebase app id non-secret candidate acceptance slot',"
        },
        {
          "line": 83,
          "preview": "    'firebase_public_config_acceptance',"
        },
        {
          "line": 85,
          "preview": "    'Accept a future public Firebase app id candidate only as a non-secret reviewed value; Firebase remains disabled here.',"
        },
        {
          "line": 89,
          "preview": "    'firebaseAuthDomainCandidateAcceptance',"
        },
        {
          "line": 90,
          "preview": "    'Firebase auth domain non-secret candidate acceptance slot',"
        },
        {
          "line": 91,
          "preview": "    'firebase_public_config_acceptance',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-acceptance-239t/smsReadinessOwnerExactNonSecretCandidateAcceptanceGate239T.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "  | 'firebase_public_config_acceptance'"
        },
        {
          "line": 16,
          "preview": "  | 'firebase_secret_reference_boundary'"
        },
        {
          "line": 31,
          "preview": "  | 'firebaseProjectIdCandidateAcceptance'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseAppIdCandidateAcceptance'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseAuthDomainCandidateAcceptance'"
        },
        {
          "line": 34,
          "preview": "  | 'firebaseMessagingSenderIdCandidateAcceptance'"
        },
        {
          "line": 35,
          "preview": "  | 'firebaseApiKeySecretReferenceBoundary'"
        },
        {
          "line": 36,
          "preview": "  | 'firebaseAdminServiceAccountSecretReferenceBoundary'"
        },
        {
          "line": 37,
          "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceBoundary'"
        },
        {
          "line": 70,
          "preview": "  readonly mayConnectFirebaseNow: false;"
        },
        {
          "line": 88,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 101,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-approval-239p/smsReadinessOwnerApprovalMatrix239P.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 39,
          "preview": "  lockedRow239P('firebase_exact_values_intake', 'Owner exact Firebase values intake gate', 'waiting_owner_exact_approval'),"
        },
        {
          "line": 40,
          "preview": "  lockedRow239P('firebase_admin_backend_contract_enablement', 'Owner Firebase Admin/backend contract enablement gate'),"
        },
        {
          "line": 52,
          "preview": "  noFirebaseApiCall: true,"
        },
        {
          "line": 68,
          "preview": "  firebaseExactValuesProvided: false,"
        },
        {
          "line": 69,
          "preview": "  realFirebaseProviderConnected: false,"
        },
        {
          "line": 90,
          "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-approval-239p/smsReadinessOwnerApprovalMatrix239P.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  | 'firebase_exact_values_intake'"
        },
        {
          "line": 9,
          "preview": "  | 'firebase_admin_backend_contract_enablement'"
        },
        {
          "line": 29,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 42,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 43,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 62,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-candidate-239r/smsReadinessOwnerProvidedNonSecretCandidateShape239R.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 43,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 70,
          "preview": "    'firebaseProjectIdCandidate',"
        },
        {
          "line": 71,
          "preview": "    'Firebase project id non-secret candidate shape',"
        },
        {
          "line": 72,
          "preview": "    'firebase_public_config_candidate',"
        },
        {
          "line": 75,
          "preview": "    'lowercase project slug or public Firebase project id; non-secret candidate only',"
        },
        {
          "line": 79,
          "preview": "    'firebaseAppIdCandidate',"
        },
        {
          "line": 80,
          "preview": "    'Firebase app id non-secret candidate shape',"
        },
        {
          "line": 81,
          "preview": "    'firebase_public_config_candidate',"
        },
        {
          "line": 84,
          "preview": "    'public Firebase app id candidate; must be validated later outside source storage',"
        },
        {
          "line": 88,
          "preview": "    'firebaseAuthDomainCandidate',"
        },
        {
          "line": 89,
          "preview": "    'Firebase auth domain non-secret candidate shape',"
        },
        {
          "line": 90,
          "preview": "    'firebase_public_config_candidate',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-candidate-239r/smsReadinessOwnerProvidedNonSecretCandidateShape239R.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "  | 'firebase_public_config_candidate'"
        },
        {
          "line": 15,
          "preview": "  | 'firebase_secret_reference_only'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseProjectIdCandidate'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseAppIdCandidate'"
        },
        {
          "line": 34,
          "preview": "  | 'firebaseAuthDomainCandidate'"
        },
        {
          "line": 35,
          "preview": "  | 'firebaseMessagingSenderIdCandidate'"
        },
        {
          "line": 36,
          "preview": "  | 'firebaseApiKeyReferenceOnly'"
        },
        {
          "line": 37,
          "preview": "  | 'firebaseAdminServiceAccountReferenceOnly'"
        },
        {
          "line": 38,
          "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceOnly'"
        },
        {
          "line": 69,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 82,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 93,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-review-239s/smsReadinessOwnerExactNonSecretCandidateReviewReport239S.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 45,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 70,
          "preview": "    'firebaseProjectIdReview',"
        },
        {
          "line": 71,
          "preview": "    'Firebase project id non-secret candidate review slot',"
        },
        {
          "line": 72,
          "preview": "    'firebase_public_config_review',"
        },
        {
          "line": 74,
          "preview": "    'Review future exact Firebase project id format only after Owner provides a non-secret candidate.',"
        },
        {
          "line": 78,
          "preview": "    'firebaseAppIdReview',"
        },
        {
          "line": 79,
          "preview": "    'Firebase app id non-secret candidate review slot',"
        },
        {
          "line": 80,
          "preview": "    'firebase_public_config_review',"
        },
        {
          "line": 82,
          "preview": "    'Review future public Firebase app id candidate shape without enabling Firebase.',"
        },
        {
          "line": 86,
          "preview": "    'firebaseAuthDomainReview',"
        },
        {
          "line": 87,
          "preview": "    'Firebase auth domain non-secret candidate review slot',"
        },
        {
          "line": 88,
          "preview": "    'firebase_public_config_review',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-review-239s/smsReadinessOwnerExactNonSecretCandidateReviewReport239S.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "  | 'firebase_public_config_review'"
        },
        {
          "line": 15,
          "preview": "  | 'firebase_secret_reference_boundary'"
        },
        {
          "line": 28,
          "preview": "  | 'firebaseProjectIdReview'"
        },
        {
          "line": 29,
          "preview": "  | 'firebaseAppIdReview'"
        },
        {
          "line": 30,
          "preview": "  | 'firebaseAuthDomainReview'"
        },
        {
          "line": 31,
          "preview": "  | 'firebaseMessagingSenderIdReview'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseApiKeyReferenceBoundary'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseAdminServiceAccountReferenceBoundary'"
        },
        {
          "line": 34,
          "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceBoundary'"
        },
        {
          "line": 68,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 81,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 93,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-values-239q/smsReadinessOwnerExactValuesReferenceIntake239Q.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 40,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 65,
          "preview": "    'firebaseProjectId',"
        },
        {
          "line": 66,
          "preview": "    'Firebase project id candidate value slot',"
        },
        {
          "line": 67,
          "preview": "    'firebase_public_config_reference',"
        },
        {
          "line": 73,
          "preview": "    'firebaseAppId',"
        },
        {
          "line": 74,
          "preview": "    'Firebase app id candidate value slot',"
        },
        {
          "line": 75,
          "preview": "    'firebase_public_config_reference',"
        },
        {
          "line": 81,
          "preview": "    'firebaseAuthDomain',"
        },
        {
          "line": 82,
          "preview": "    'Firebase auth domain candidate value slot',"
        },
        {
          "line": 83,
          "preview": "    'firebase_public_config_reference',"
        },
        {
          "line": 89,
          "preview": "    'firebaseApiKeyReference',"
        },
        {
          "line": 90,
          "preview": "    'Firebase API key reference slot; no plain key stored here',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/owner-values-239q/smsReadinessOwnerExactValuesReferenceIntake239Q.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 13,
          "preview": "  | 'firebase_public_config_reference'"
        },
        {
          "line": 14,
          "preview": "  | 'firebase_secret_reference_only'"
        },
        {
          "line": 30,
          "preview": "  | 'firebaseProjectId'"
        },
        {
          "line": 31,
          "preview": "  | 'firebaseAppId'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseAuthDomain'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseApiKeyReference'"
        },
        {
          "line": 34,
          "preview": "  | 'firebaseAdminServiceAccountReference'"
        },
        {
          "line": 35,
          "preview": "  | 'firebaseAdminCredentialSecretManagerReference'"
        },
        {
          "line": 36,
          "preview": "  | 'firebaseMessagingSenderId'"
        },
        {
          "line": 63,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 74,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 82,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/secret-access-239v/smsReadinessSecretReferenceAccessControlMatrix239V.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 52,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 105,
          "preview": "    'firebaseApiKeyAccessControlReference',"
        },
        {
          "line": 106,
          "preview": "    'Firebase API key access-control reference',"
        },
        {
          "line": 107,
          "preview": "    'firebase_secret_reference_acl',"
        },
        {
          "line": 109,
          "preview": "    'Reject any plain Firebase API key and allow only future masked readiness status; no role may view, copy, export, or reveal the key from this matrix.',"
        },
        {
          "line": 113,
          "preview": "    'firebaseAdminServiceAccountAccessControlReference',"
        },
        {
          "line": 114,
          "preview": "    'Firebase Admin service account access-control reference',"
        },
        {
          "line": 115,
          "preview": "    'firebase_secret_reference_acl',"
        },
        {
          "line": 117,
          "preview": "    'Reject plain Firebase Admin service account material; future access requires separate exact Owner approval, least-privilege scope, audit trail, and post-access review.',"
        },
        {
          "line": 121,
          "preview": "    'firebaseAdminCredentialPathAccessControlReference',"
        },
        {
          "line": 122,
          "preview": "    'Firebase Admin credential path access-control reference',"
        },
        {
          "line": 123,
          "preview": "    'firebase_secret_reference_acl',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/secret-access-239v/smsReadinessSecretReferenceAccessControlMatrix239V.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 16,
          "preview": "  | 'firebase_secret_reference_acl'"
        },
        {
          "line": 35,
          "preview": "  | 'firebaseApiKeyAccessControlReference'"
        },
        {
          "line": 36,
          "preview": "  | 'firebaseAdminServiceAccountAccessControlReference'"
        },
        {
          "line": 37,
          "preview": "  | 'firebaseAdminCredentialPathAccessControlReference'"
        },
        {
          "line": 96,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 125,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 145,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 146,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 148,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 162,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/secret-boundary-239u/smsReadinessSecretReferenceStorageBoundaryPlan239U.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 45,
          "preview": "  firebaseApiCallEnabledNow: false,"
        },
        {
          "line": 77,
          "preview": "    'firebase_secret_manager_reference_plan',"
        },
        {
          "line": 83,
          "preview": "    'firebaseApiKeyStorageReferencePlan',"
        },
        {
          "line": 84,
          "preview": "    'Firebase API key storage reference plan',"
        },
        {
          "line": 85,
          "preview": "    'firebase_secret_manager_reference_plan',"
        },
        {
          "line": 87,
          "preview": "    'Reject any plain Firebase API key in source, chat, DB, reports, logs, or patches; only a future storage reference may be reviewed after exact Owner approval.',"
        },
        {
          "line": 91,
          "preview": "    'firebaseAdminServiceAccountStorageReferencePlan',"
        },
        {
          "line": 92,
          "preview": "    'Firebase Admin service account storage reference plan',"
        },
        {
          "line": 93,
          "preview": "    'firebase_secret_manager_reference_plan',"
        },
        {
          "line": 95,
          "preview": "    'Reject plain Firebase Admin service account material; future secure storage requires separate exact Owner approval and verified Secret Manager boundary.',"
        },
        {
          "line": 99,
          "preview": "    'firebaseAdminCredentialSecretManagerPathReference',"
        },
        {
          "line": 100,
          "preview": "    'Firebase Admin credential Secret Manager path reference plan',"
        }
      ]
    },
    {
      "file": "src/modules/auth/sms/secret-boundary-239u/smsReadinessSecretReferenceStorageBoundaryPlan239U.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "  | 'firebase_secret_manager_reference_plan'"
        },
        {
          "line": 16,
          "preview": "  | 'firebase_public_config_dependency'"
        },
        {
          "line": 31,
          "preview": "  | 'firebaseApiKeyStorageReferencePlan'"
        },
        {
          "line": 32,
          "preview": "  | 'firebaseAdminServiceAccountStorageReferencePlan'"
        },
        {
          "line": 33,
          "preview": "  | 'firebaseAdminCredentialSecretManagerPathReference'"
        },
        {
          "line": 69,
          "preview": "  readonly firebaseApiCallEnabledNow: false;"
        },
        {
          "line": 87,
          "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
        },
        {
          "line": 107,
          "preview": "  readonly firebaseExactValuesProvided: false;"
        },
        {
          "line": 108,
          "preview": "  readonly firebaseSecretValuesProvided: false;"
        },
        {
          "line": 110,
          "preview": "  readonly realFirebaseProviderConnected: false;"
        },
        {
          "line": 123,
          "preview": "  readonly noFirebaseApiCall: true;"
        }
      ]
    },
    {
      "file": "src/modules/notification/application/push.service.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 1,
          "preview": "import { getFirebase } from \"../../../core/push/firebase\""
        },
        {
          "line": 13,
          "preview": "      const messaging = getFirebase()"
        }
      ]
    },
    {
      "file": "src/modules/notification/infrastructure/firebase.service.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 1,
          "preview": "import admin from \"firebase-admin\""
        },
        {
          "line": 3,
          "preview": "export class FirebaseService {"
        }
      ]
    },
    {
      "file": "src/modules/programs/program-foundation.registry.ts",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 419,
          "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
        }
      ]
    },
    {
      "file": "src/modules/qr/infrastructure/routes/qr-core.routes.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 58,
          "preview": "      apiKeysInMobileAllowed: false,"
        }
      ]
    },
    {
      "file": "src/modules/qr/services/qr-provider-admin-registry.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
        },
        {
          "line": 31,
          "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
        },
        {
          "line": 42,
          "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
        }
      ]
    },
    {
      "file": "src/modules/release/243a/sabiRelease243a.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 92,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 96,
          "preview": "  noFirebaseApiCallByThisPatch: true,"
        },
        {
          "line": 132,
          "preview": "  firebasePhoneAuth: 'Firebase phone auth: phone-number sign-in/SMS must be enabled before live use',"
        }
      ]
    },
    {
      "file": "src/modules/release/243b/sabiRelease243b.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 33,
          "preview": "    firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 64,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243b/sabiRelease243b.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 58,
          "preview": "    readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243c/sabiRelease243c.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 30,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 67,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 87,
          "preview": "  sms: 'Firebase Phone Auth or approved SMS provider server boundary required; no live SMS now',"
        }
      ]
    },
    {
      "file": "src/modules/release/243c/sabiRelease243c.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  | 'noFirebaseApiCallNow'"
        },
        {
          "line": 56,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243d/sabiRelease243d.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 28,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 65,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243d/sabiRelease243d.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 55,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243e/sabiRelease243e.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 63,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243e/sabiRelease243e.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 53,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243f/sabiRelease243f.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 71,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243f/sabiRelease243f.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243g/sabiRelease243g.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 47,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 72,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243g/sabiRelease243g.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243h/sabiRelease243h.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 61,
          "preview": "  'firebasePhoneAuthOrApprovedSmsProviderRequired: true',"
        }
      ]
    },
    {
      "file": "src/modules/release/243h/sabiRelease243h.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243i/sabiRelease243i.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 63,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
        }
      ]
    },
    {
      "file": "src/modules/release/243i/sabiRelease243i.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243j/sabiRelease243j.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 65,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
        }
      ]
    },
    {
      "file": "src/modules/release/243j/sabiRelease243j.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243k/sabiRelease243k.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 64,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 112,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
        },
        {
          "line": 157,
          "preview": "  \"noFirebaseApiCallNow: true\","
        }
      ]
    },
    {
      "file": "src/modules/release/243k/sabiRelease243k.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243l/sabiRelease243l.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 67,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 116,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
        },
        {
          "line": 168,
          "preview": "  \"noFirebaseApiCallNow: true\","
        }
      ]
    },
    {
      "file": "src/modules/release/243l/sabiRelease243l.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243m/sabiRelease243m.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 76,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243m/sabiRelease243m.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 66,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243n/sabiRelease243n.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 77,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243n/sabiRelease243n.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 68,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243o/sabiRelease243o.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 77,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243o/sabiRelease243o.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 68,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243p/sabiRelease243p.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 73,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243p/sabiRelease243p.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 67,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243q/sabiRelease243q.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 73,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243q/sabiRelease243q.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 67,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243r/sabiRelease243r.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 75,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243s/sabiRelease243s.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 75,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243t/sabiRelease243t.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 76,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243u/sabiRelease243u.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 79,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243u/sabiRelease243u.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 36,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 70,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243v/sabiRelease243v.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 79,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243v/sabiRelease243v.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 36,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 70,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243w/sabiRelease243w.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 99,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243w/sabiRelease243w.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243x/sabiRelease243x.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 89,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243x/sabiRelease243x.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 36,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243y/sabiRelease243y.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 90,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243y/sabiRelease243y.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 36,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 74,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/243z/sabiRelease243z.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 20,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 93,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/243z/sabiRelease243z.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 37,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 75,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244a/sabiRelease244a.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 88,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244a/sabiRelease244a.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 36,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244b/sabiRelease244b.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 94,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244b/sabiRelease244b.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 38,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 77,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244c/sabiRelease244c.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 94,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244c/sabiRelease244c.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 40,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 81,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244d/sabiRelease244d.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 99,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244d/sabiRelease244d.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 42,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 85,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244e/sabiRelease244e.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 104,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244e/sabiRelease244e.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 44,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 89,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244f/sabiRelease244f.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 109,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244f/sabiRelease244f.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 46,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 93,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244g/sabiRelease244g.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 23,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 116,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244g/sabiRelease244g.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 48,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 99,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244h/sabiRelease244h.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 28,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 106,
          "preview": "    noFirebaseApiCallNow: true,"
        },
        {
          "line": 143,
          "preview": "  noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244h/sabiRelease244h.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 50,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 103,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        },
        {
          "line": 145,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244i/sabiRelease244i.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 124,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244i/sabiRelease244i.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 105,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244j/sabiRelease244j.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 56,
          "preview": "    'sms_provider_or_firebase_phone_auth_verified',"
        },
        {
          "line": 100,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244j/sabiRelease244j.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 75,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        },
        {
          "line": 104,
          "preview": "    'sms_provider_or_firebase_phone_auth_verified',"
        }
      ]
    },
    {
      "file": "src/modules/release/244k/sabiRelease244k.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 45,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 132,
          "preview": "  noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244l/sabiRelease244l.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 45,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 136,
          "preview": "  noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244m/sabiRelease244m.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 45,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 143,
          "preview": "  noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244n/sabiRelease244n.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 84,
          "preview": "  noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244n/sabiRelease244n.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 37,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
        },
        {
          "line": 69,
          "preview": "  readonly noFirebaseApiCallNow: boolean;"
        }
      ]
    },
    {
      "file": "src/modules/release/244o/sabiRelease244o.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 32,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 115,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244o/sabiRelease244o.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244p/sabiRelease244p.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 100,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244p/sabiRelease244p.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 35,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244q/sabiRelease244q.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 95,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244q/sabiRelease244q.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244r/sabiRelease244r.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 96,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244r/sabiRelease244r.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  noFirebaseApiCallNow: true;"
        },
        {
          "line": 73,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/244s/sabiRelease244s.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 122,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244t/sabiRelease244T.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 123,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244u/sabiRelease244U.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 70,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
        },
        {
          "line": 109,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244u/sabiRelease244U.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"noFirebaseApiCallNow\": boolean,"
        }
      ]
    },
    {
      "file": "src/modules/release/244v/sabiRelease244V.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 71,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
        },
        {
          "line": 110,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244v/sabiRelease244V.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"noFirebaseApiCallNow\": boolean,"
        }
      ]
    },
    {
      "file": "src/modules/release/244w/sabiRelease244W.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 71,
          "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
        },
        {
          "line": 109,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244w/sabiRelease244W.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  noFirebaseApiCallNow: boolean;"
        }
      ]
    },
    {
      "file": "src/modules/release/244x/sabiRelease244X.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 72,
          "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
        },
        {
          "line": 110,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244y/sabiRelease244Y.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 73,
          "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
        },
        {
          "line": 111,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/244z/sabiRelease244Z.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 75,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
        },
        {
          "line": 114,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245a/sabiRelease245A.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 76,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
        },
        {
          "line": 115,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245b/sabiRelease245B.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 77,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 118,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245c/sabiRelease245C.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 78,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 119,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245d/sabiRelease245D.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 25,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
        },
        {
          "line": 52,
          "preview": "    { name: 'sms_provider_or_firebase_phone_auth_reference_ready_without_call', ready: true, acceptedNow: false, executableNow: false, noExecutionNow: true },"
        },
        {
          "line": 84,
          "preview": "    noFirebaseApiCallNow: true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245d/sabiRelease245D.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 40,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        },
        {
          "line": 81,
          "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/245e/sabiRelease245E.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 58,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 100,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245f/sabiRelease245F.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 58,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 100,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245g/sabiRelease245G.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 58,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 100,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245h/sabiRelease245H.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 77,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 119,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245i/sabiRelease245I.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 78,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 119,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245j/sabiRelease245J.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 79,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 124,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245j/sabiRelease245J.types.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 31,
          "preview": "  readonly noFirebaseApiCallNow: true;"
        }
      ]
    },
    {
      "file": "src/modules/release/245k/sabiRelease245K.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 68,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
        },
        {
          "line": 113,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245l/sabiRelease245L.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 89,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245l/sabiRelease245L.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  noFirebaseApiCallNow: boolean;"
        },
        {
          "line": 68,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
        }
      ]
    },
    {
      "file": "src/modules/release/245m/sabiRelease245M.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 29,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 90,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        },
        {
          "line": 118,
          "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245m/sabiRelease245M.types.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  noFirebaseApiCallNow: boolean;"
        },
        {
          "line": 68,
          "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
        }
      ]
    },
    {
      "file": "src/modules/release/245n/sabiRelease245N.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 26,
          "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
        },
        {
          "line": 53,
          "preview": "    \"sms_provider_or_firebase_phone_auth_reference_only_without_call\","
        },
        {
          "line": 80,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245o/sabiRelease245OInventory.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 88,
          "preview": "    \"sms_live_provider_or_firebase_phone_auth_requires_owner_approval\","
        },
        {
          "line": 113,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        },
        {
          "line": 132,
          "preview": "    \"confirm_firebase_phone_auth_or_sms_provider_values\","
        }
      ]
    },
    {
      "file": "src/modules/release/245p/sabiRelease245PPreExecutionPlan.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 149,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245p-fix1/sabiRelease245PFix1.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 132,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245p-fix2/sabiRelease245PFix2.ts",
      "matched": [
        "Firebase"
      ],
      "snippets": [
        {
          "line": 207,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245q/sabiRelease245Q.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245Q enable required Google Cloud APIs for official Sabi site Cloud Run preparation only, no deploy, no DNS mutation, no SMS, no Firebase call, no wallet, no payment, no payout\","
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245Q_enable_required_google_cloud_apis_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout\","
        },
        {
          "line": 109,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 120,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        },
        {
          "line": 135,
          "preview": "    \"firebase_call_still_locked\","
        }
      ]
    },
    {
      "file": "src/modules/release/245r/sabiRelease245R.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R deploy official Sabi website to Google Cloud Run service sabi-official-site in project sabi-official-prod region europe-west1 only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no pa"
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245R_cloud_run_deploy_official_site_only_no_domain_dns_no_sms_no_firebase_no_wallet_payment_payout\","
        },
        {
          "line": 117,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 127,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        },
        {
          "line": 141,
          "preview": "    \"firebase_call_still_locked\","
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix1/sabiRelease245RFix1.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX1 grant Storage Object Viewer on Cloud Run source bucket to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no payment, n"
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245R_FIX1_grant_storage_object_viewer_on_cloud_run_source_bucket_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout\","
        },
        {
          "line": 104,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 116,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix2/sabiRelease245RFix2.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 12,
          "preview": "  \"scope\": \"245R_FIX2_retry_cloud_run_deploy_after_bucket_iam_fix_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 129,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 140,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix3/sabiRelease245RFix3.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"scope\": \"245R_FIX3_read_only_cloud_build_logs_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet\","
        },
        {
          "line": 99,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 110,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix4/sabiRelease245RFix4.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX4 grant Artifact Registry Writer on repository cloud-run-source-deploy to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no Google "
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245R_FIX4_grant_artifact_registry_writer_on_cloud_run_source_deploy_repository_only_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 104,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 116,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix5/sabiRelease245RFix5.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 12,
          "preview": "  \"scope\": \"245R_FIX5_retry_cloud_run_deploy_after_artifact_registry_writer_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 129,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 140,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix6/sabiRelease245RFix6.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX6 grant public Cloud Run Invoker access to service sabi-official-site for official website public access only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, "
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245R_FIX6_grant_public_cloud_run_invoker_only_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 125,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 136,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix7/sabiRelease245RFix7.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX7 disable Cloud Run Invoker IAM check for service sabi-official-site to make official website public only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, no p"
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245R_FIX7_disable_cloud_run_invoker_iam_check_only_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 116,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 127,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245r-fix7a/sabiRelease245RFix7A.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"scope\": \"245R_FIX7A_read_only_cloud_run_public_site_closeout_no_deploy_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 106,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 118,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245s/sabiRelease245S.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"scope\": \"245S_read_only_custom_domain_mapping_and_dns_plan_no_mapping_create_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 184,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 197,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245t/sabiRelease245T.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 8,
          "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245T create Cloud Run domain mapping for sabiai.app to service sabi-official-site in project sabi-official-prod region europe-west1 only, no DNS mutation, no SMS, no Firebase call, no Google Pay Billing,"
        },
        {
          "line": 9,
          "preview": "  \"scope\": \"245T_create_cloud_run_domain_mapping_for_sabiai_app_only_no_dns_mutation_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 200,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 212,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245t-fix1/sabiRelease245TFix1.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 13,
          "preview": "  \"scope\": \"245T_FIX1_create_cloud_run_beta_domain_mapping_for_sabiai_app_only_no_dns_mutation_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
        },
        {
          "line": 205,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 217,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245u/sabiRelease245U.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 146,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 154,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        }
      ]
    },
    {
      "file": "src/modules/release/245u-fix1/sabiRelease245UFix1.ts",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 184,
          "preview": "    \"firebaseCallNow\": 0,"
        },
        {
          "line": 192,
          "preview": "    \"noFirebaseApiCallNow\": true,"
        },
        {
          "line": 201,
          "preview": "    \"next_sms_firebase_phone_auth_requires_separate_exact_owner_approval\""
        },
        {
          "line": 203,
          "preview": "  \"nextStep\": \"246A_SMS_Firebase_Phone_Auth_preflight_after_official_domain_live\""
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-asset-policy-final-handoff-204b/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 86,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-asset-policy-readiness-204a/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 85,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-catalog-media-admin-final-handoff-203b/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 77,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-catalog-media-admin-readiness-203a/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 77,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-live-provider-binding-approval-200a/streamGiftLedgerControlledLiveProviderBindingApproval200A.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 56,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-dry-run-200f/streamGiftLedgerControlledProviderBindingActivationDryRun200F.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 88,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-approval-200g/streamGiftLedgerControlledProviderBindingActivationExecutionApproval200G.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 76,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-authorization-200i/streamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 79,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-final-gate-200j/streamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 76,
          "preview": "  \"secret\", \"secretValue\", \"rawSecret\", \"apiKey\", \"privateKey\", \"clientSecret\", \"providerSecret\", \"providerToken\", \"accessToken\", \"refreshToken\", \"password\", \"credential\", \"token\", \"authorizationHeader\", \"providerReference\", \"providerResponse\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-final-handoff-200k/streamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 77,
          "preview": "  \"secret\", \"secretValue\", \"rawSecret\", \"apiKey\", \"privateKey\", \"clientSecret\", \"providerSecret\", \"providerToken\", \"accessToken\", \"refreshToken\", \"password\", \"credential\", \"token\", \"authorizationHeader\", \"providerReference\", \"providerResponse\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-preflight-200h/streamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 77,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-request-200d/streamGiftLedgerControlledProviderBindingActivationRequest200D.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 65,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-live-provider-binding-dry-run-200c/streamGiftLedgerLiveProviderBindingDryRun200C.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 63,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-payment-authorization-adapter-199c/streamGiftLedgerPaymentAuthorizationAdapter199C.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 59,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-post-closure-final-handoff-201b/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 60,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-post-closure-readiness-201a/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 60,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-provider-config-readiness-199b/streamGiftLedgerProviderConfigReadiness199B.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 53,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-provider-reference-labels-verification-200b/streamGiftLedgerProviderReferenceLabelsVerification200B.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 84,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-provider-runtime-readiness-guard-200e/streamGiftLedgerProviderRuntimeReadinessGuard200E.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 68,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-provider-visibility-202a/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 71,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-provider-visibility-final-handoff-202b/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 68,
          "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-real-payment-authorization-adapter-199d/streamGiftLedgerRealPaymentAuthorizationAdapter199D.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 61,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/stream/foundation/gift-ledger-real-provider-binding-approval-199a/streamGiftLedgerRealProviderBindingApproval199A.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 50,
          "preview": "  \"apiKey\","
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-readiness-preflight-039p/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 14,
          "preview": "    apiKeyValueProvidedToThisStage: false,"
        },
        {
          "line": 15,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        },
        {
          "line": 16,
          "preview": "    apiKeyStorageWritePerformed: false,"
        },
        {
          "line": 45,
          "preview": "    apiKeyReadinessPreflightReady: true,"
        },
        {
          "line": 47,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        },
        {
          "line": 76,
          "preview": "    apiKeyReadinessPreflightReady: true,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-readiness-preflight-039p/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 3,
          "preview": "  apiKeyValueProvidedToThisStage: false;"
        },
        {
          "line": 4,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        },
        {
          "line": 5,
          "preview": "  apiKeyStorageWritePerformed: false;"
        },
        {
          "line": 36,
          "preview": "  apiKeyReadinessPreflightReady: true;"
        },
        {
          "line": 61,
          "preview": "  apiKeyReadinessPreflightReady: true;"
        },
        {
          "line": 63,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-binding-preflight-039t/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-binding-preflight-039t/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-intake-039q/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 21,
          "preview": "    apiKeyValueReadOrPrinted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-intake-039q/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "  apiKeyValueReadOrPrinted: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-presence-read-039s/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 19,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-presence-read-039s/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 15,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-shape-validation-039r/runtime-public-alias-routes-fix3.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 35,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/api-key-secret-reference-shape-validation-039r/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "      apiKeySecretReferenceShapeValidation: 'locked',"
        },
        {
          "line": 28,
          "preview": "      apiKeyValueAccepted: 'blocked',"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/db-production-apply-gate-040v/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/db-production-apply-gate-040v/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040VReadiness { stage: string; ready: boolean; dbProductionApplyGate: 'controlled-db-production-apply-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-no-new-m"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/full-production-e2e-closeout-040z/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 10,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/full-production-e2e-closeout-040z/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 1,
          "preview": "export interface Taxi040ZReadiness { stage: string; ready: boolean; finalEightStepClosure: '8_of_8_after_green'; fullProductionE2ECloseout: 'verified-controlled-final-e2e-closeout'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print';"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/main-wallet-ledger-live-gate-040w/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/main-wallet-ledger-live-gate-040w/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040WReadiness { stage: string; ready: boolean; mainWalletLedgerLiveGate: 'controlled-main-wallet-ledger-live-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-n"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/payment-execution-controlled-smoke-040x/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/payment-execution-controlled-smoke-040x/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040XReadiness { stage: string; ready: boolean; paymentExecutionControlledSmoke: 'controlled-payment-execution-smoke-no-payout'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshak"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/payout-settlement-gate-040y/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/payout-settlement-gate-040y/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040YReadiness { stage: string; ready: boolean; payoutSettlementGate: 'controlled-payout-settlement-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-no-new-mone"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-config-preflight-039u/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 11,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-config-preflight-039u/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-approval-request-039z/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-approval-request-039z/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi039ZReadiness { stage: string; ready: boolean; providerBindingExecutionApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fal"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-evidence-locked-gate-040b/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-evidence-locked-gate-040b/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040BReadiness { stage: string; ready: boolean; providerBindingExecutionEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: "
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-final-evidence-owner-approval-locked-040d/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-final-evidence-owner-approval-locked-040d/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040DReadiness { stage: string; ready: boolean; providerBindingExecutionFinalEvidenceOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; m"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-final-owner-approval-locked-040c/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-final-owner-approval-locked-040c/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040CReadiness { stage: string; ready: boolean; providerBindingExecutionFinalOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-locked-gate-040a/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-execution-locked-gate-040a/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040AReadiness { stage: string; ready: boolean; providerBindingExecutionLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; p"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-final-evidence-gate-039y/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-final-evidence-gate-039y/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi039YReadiness { stage: string; ready: boolean; providerBindingFinalEvidenceGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; pay"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-final-gate-039x/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 11,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-final-gate-039x/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-handshake-040u/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-binding-handshake-040u/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040UReadiness { stage: string; ready: boolean; providerBindingHandshake: 'controlled-handshake-no-money'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'handshake-no-money-controlled'; dbWrite"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-config-final-evidence-preflight-039w/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 11,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-config-final-evidence-preflight-039w/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-config-final-preflight-039v/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 11,
          "preview": "    apiKeyValueAcceptedByThisStage: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-config-final-preflight-039v/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 7,
          "preview": "  apiKeyValueAcceptedByThisStage: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-approval-request-040e/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-approval-request-040e/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040EReadiness { stage: string; ready: boolean; providerSecretValueAccessApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fa"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-controlled-read-040t/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-controlled-read-040t/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040TReadiness { stage: string; ready: boolean; providerSecretValueAccessControlledRead: 'controlled'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: false; dbWrite: false; walletMutation: false"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-evidence-approval-request-040f/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-evidence-approval-request-040f/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040FReadiness { stage: string; ready: boolean; providerSecretValueAccessEvidenceApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-approval-request-040j/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-approval-request-040j/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040JReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMov"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-approval-request-040k/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-approval-request-040k/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040KReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionEvidenceApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; "
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-locked-gate-040m/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-locked-gate-040m/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040MReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; money"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-closeout-040r/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-closeout-040r/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040RReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalCloseout: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovem"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-locked-gate-040o/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-locked-gate-040o/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040OReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; "
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-owner-approval-locked-040q/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-owner-approval-locked-040q/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040QReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalEvidenceOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-locked-gate-040n/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-locked-gate-040n/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040NReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMov"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-owner-approval-locked-040p/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-owner-approval-locked-040p/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040PReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false;"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-locked-gate-040l/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-locked-gate-040l/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040LReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-final-evidence-locked-gate-040i/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-final-evidence-locked-gate-040i/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040IReadiness { stage: string; ready: boolean; providerSecretValueAccessFinalEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-final-locked-gate-040h/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-final-locked-gate-040h/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040HReadiness { stage: string; ready: boolean; providerSecretValueAccessFinalLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fa"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-locked-gate-040g/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-locked-gate-040g/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040GReadiness { stage: string; ready: boolean; providerSecretValueAccessLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; "
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-owner-filled-reference-intake-040s/service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 9,
          "preview": "    apiKeyValueAccepted: false,"
        }
      ]
    },
    {
      "file": "src/modules/taxi/foundation/provider-secret-value-access-owner-filled-reference-intake-040s/types.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 2,
          "preview": "export interface Taxi040SReadiness { stage: string; ready: boolean; providerSecretValueAccessOwnerFilledReferenceIntake: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyM"
        }
      ]
    },
    {
      "file": "src/modules/wallet/application/provider/wallet-provider-config.service.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 136,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 164,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 192,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 227,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 251,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 300,
          "preview": "      \"apiKeyVaultRef\","
        },
        {
          "line": 322,
          "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"priceFeedPolicy\"],"
        },
        {
          "line": 343,
          "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"verificationPolicy\"],"
        },
        {
          "line": 362,
          "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"screeningPolicy\"],"
        }
      ]
    },
    {
      "file": "../superapp-mobile/src/modules/home/programs/programFoundationRegistry.ts",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 319,
          "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
        }
      ]
    },
    {
      "file": "../superapp-mobile/src/modules/qr/admin/qrApiAdminRegistry.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
        },
        {
          "line": 33,
          "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
        },
        {
          "line": 44,
          "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
        }
      ]
    },
    {
      "file": "../superapp-mobile/android/app/google-services.json",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "    \"storage_bucket\": \"sabi-superapp.firebasestorage.app\""
        }
      ]
    },
    {
      "file": "../superapp-mobile/google-services.json",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 5,
          "preview": "    \"storage_bucket\": \"sabi-superapp.firebasestorage.app\""
        }
      ]
    },
    {
      "file": "../superapp-mobile/modules/sabi-call-native/plugin/withSabiCallNative.js",
      "matched": [
        "firebase",
        "Firebase"
      ],
      "snippets": [
        {
          "line": 27,
          "preview": "    if (!app.service.some((s) => s.$?.[\"android:name\"] === \".calls.SabiFirebaseMessagingService\")) {"
        },
        {
          "line": 29,
          "preview": "        $: { \"android:name\": \".calls.SabiFirebaseMessagingService\", \"android:exported\": \"false\" },"
        },
        {
          "line": 30,
          "preview": "        \"intent-filter\": [{ action: [{ $: { \"android:name\": \"com.google.firebase.MESSAGING_EVENT\" } }] }],"
        }
      ]
    },
    {
      "file": "../superapp-mobile/src/modules/home/programs/programFoundationRegistry.ts",
      "matched": [
        "firebase"
      ],
      "snippets": [
        {
          "line": 319,
          "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
        }
      ]
    },
    {
      "file": "../superapp-mobile/src/modules/qr/admin/qrApiAdminRegistry.ts",
      "matched": [
        "apiKey"
      ],
      "snippets": [
        {
          "line": 22,
          "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
        },
        {
          "line": 33,
          "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
        },
        {
          "line": 44,
          "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
        }
      ]
    }
  ],
  "readiness": {
    "officialWebsiteDomainReadiness": 100,
    "legalPolicyReadiness": 100,
    "firebaseCliInventoryReadiness": 50,
    "enabledApisInventoryReadiness": 100,
    "identityToolkitEnabledNow": 0,
    "firebaseApiEnabledNow": 0,
    "smsFirebasePreflightReadiness": 100,
    "liveSmsSentNow": 0,
    "firebaseLiveCallNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "readOnlyPreflightOnly": true,
    "noLiveSmsSentNow": true,
    "noFirebaseApiCallNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "exactOwnerApprovalRequiredBeforeEnablingApisOrSendingSms": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [],
  "nextStep": "246B_prepare_sms_firebase_enable_plan_requires_exact_owner_approval_before_any_api_enable_or_live_sms",
  "checksPassed": 16,
  "checksTotal": 16,
  "checks": [
    {
      "name": "246a_gcloud_project_is_official",
      "passed": true,
      "details": {
        "name": "gcloud_project",
        "command": "gcloud config get-value project 2>$null",
        "status": 0,
        "stdout": "sabi-official-prod",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_active_account_is_official_admin",
      "passed": true,
      "details": {
        "name": "gcloud_active_account",
        "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\" 2>$null",
        "status": 0,
        "stdout": "admin@sabiai.app",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_official_site_https_200",
      "passed": true,
      "details": {
        "name": "live_https_root",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"LENGTH=\" + $r.Content.Length); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\nLENGTH=48136",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_terms_pdf_live",
      "passed": true,
      "details": {
        "name": "live_terms_pdf_head",
        "command": "$u=\"https://sabiai.app/legal/sabi-terms-of-service-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_privacy_pdf_live",
      "passed": true,
      "details": {
        "name": "live_privacy_pdf_head",
        "command": "$u=\"https://sabiai.app/legal/sabi-privacy-policy-uk-gdpr-en.pdf\"; try { $r=Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_firebase_cli_presence_checked",
      "passed": true,
      "details": {
        "name": "firebase_cli_version_optional",
        "command": "firebase --version",
        "status": 1,
        "stdout": "",
        "stderr": "firebase : ��� \"firebase\" �� �ᯮ����� ��� ��\r\n� ���������, �㭪樨, 䠩�� �業��� ��� �믮\r\n��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����\r\nᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ��\r\n�, ��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ firebase --version\r\n+ ~~~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (firebase:String) [], CommandNotFoundExc  \r\n  eption\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
        "ok": false
      }
    },
    {
      "name": "246a_enabled_apis_inventory_read",
      "passed": true,
      "details": {
        "name": "enabled_google_cloud_apis_readonly",
        "command": "gcloud services list --enabled --project=sabi-official-prod --format=\"value(config.name)\" 2>$null",
        "status": 0,
        "stdout": "analyticshub.googleapis.com\r\nartifactregistry.googleapis.com\r\nbigquery.googleapis.com\r\nbigqueryconnection.googleapis.com\r\nbigquerydatapolicy.googleapis.com\r\nbigquerydatatransfer.googleapis.com\r\nbigquerymigration.googleapis.com\r\nbigqueryreservation.googleapis.com\r\nbigquerystorage.googleapis.com\r\ncloudapis.googleapis.com\r\ncloudbuild.googleapis.com\r\ncloudtrace.googleapis.com\r\ncontainerregistry.googleapis.com\r\ndataform.googleapis.com\r\ndataplex.googleapis.com\r\ndatastore.googleapis.com\r\niam.googleapis.com\r\niamcredentials.googleapis.com\r\nlogging.googleapis.com\r\nmonitoring.googleapis.com\r\npubsub.googleapis.com\r\nrun.googleapis.com\r\nservicemanagement.googleapis.com\r\nserviceusage.googleapis.com\r\nsql-component.googleapis.com\r\nstorage-api.googleapis.com\r\nstorage-component.googleapis.com\r\nstorage.googleapis.com\r\ntelemetry.googleapis.com",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246a_identitytoolkit_status_detected",
      "passed": true,
      "details": {
        "identityToolkitEnabled": false,
        "firebaseApiEnabled": false
      }
    },
    {
      "name": "246a_firebase_public_config_scan_completed",
      "passed": true,
      "details": {
        "findingsCount": 414,
        "firebaseFindings": [
          {
            "file": "admin-ui/package.json",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "    \"appId\": \"com.sabi.admin\","
              }
            ]
          },
          {
            "file": "admin-ui/src/admin-i18n.ts",
            "matched": [
              "Firebase",
              "apiKey"
            ],
            "snippets": [
              {
                "line": 346,
                "preview": "  \"field.apiKey\": \"API-ключ\","
              },
              {
                "line": 759,
                "preview": "  \"providers.description\": \"Bank, to ‘lov, KYC, AML, sun ʼiy intellekt, Redis, Firebase and hamyon provayder kalitlar.\","
              },
              {
                "line": 824,
                "preview": "  \"field.apiKey\": \"API kaliti\","
              },
              {
                "line": 878,
                "preview": "  \"provider.push_provider.title\": \"Push / Firebase Provayder\","
              },
              {
                "line": 1221,
                "preview": "  \"providers.description\": \"Bank, to ‘lov, KYC, AML, sun ʼiy intellekt, Redis, Firebase va hamyon provayder kalitlari.\","
              },
              {
                "line": 1286,
                "preview": "  \"field.apiKey\": \"API kalit\","
              },
              {
                "line": 1340,
                "preview": "  \"provider.push_provider.title\": \"Push / Firebase provayder\","
              },
              {
                "line": 1720,
                "preview": "  \"field.apiKey\": \"API 密钥\","
              }
            ]
          },
          {
            "file": "admin-ui/src/App.tsx",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9246,
                "preview": "        <div className=\"statCard\"><span>API keys</span><strong>{summary?.activeApiKeys ?? 0}/{summary?.apiKeys ?? 0}</strong></div>"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiAdminControl007U.tsx",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 37,
                "preview": "    appId: \"Application ID\","
              },
              {
                "line": 100,
                "preview": "    appId: \"Application ID\","
              },
              {
                "line": 163,
                "preview": "    appId: \"Application ID\","
              },
              {
                "line": 226,
                "preview": "    appId: \"Application ID\","
              },
              {
                "line": 606,
                "preview": "              <label>{copy.appId}<input value={form.applicationId} onChange={(e) => setField(\"applicationId\", e.target.value)} /></label>"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiAdminControl007W.tsx",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 83,
                "preview": "  appId: string;"
              },
              {
                "line": 126,
                "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
              },
              {
                "line": 131,
                "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
              },
              {
                "line": 136,
                "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
              },
              {
                "line": 141,
                "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
              },
              {
                "line": 222,
                "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
              },
              {
                "line": 247,
                "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiAdminControl007X.tsx",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 83,
                "preview": "  appId: string;"
              },
              {
                "line": 126,
                "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
              },
              {
                "line": 131,
                "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
              },
              {
                "line": 136,
                "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
              },
              {
                "line": 141,
                "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
              },
              {
                "line": 222,
                "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
              },
              {
                "line": 247,
                "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiAdminControl007Y.tsx",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 83,
                "preview": "  appId: string;"
              },
              {
                "line": 127,
                "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Выбери новую заявку слева. Пустая ручная форма здесь не нужна.\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данн"
              },
              {
                "line": 132,
                "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"Select a new application on the left. No empty manual form is needed here.\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData"
              },
              {
                "line": 137,
                "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Chapdan yangi arizani tanlang. Bu yerda bo‘sh qo‘lda forma kerak emas.\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carD"
              },
              {
                "line": 142,
                "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"请从左侧选择新申请。这里不需要空的手动表单。\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject:"
              },
              {
                "line": 223,
                "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
              },
              {
                "line": 248,
                "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiAdminControl007Z.tsx",
            "matched": [
              "appId"
            ],
            "snippets": [
              {
                "line": 193,
                "preview": "  appId: string;"
              },
              {
                "line": 245,
                "preview": "    newApplications: \"Новые заявки\", openApplication: \"Открытая заявка\", noApplication: \"Новых заявок нет\", load: \"Загрузить новые заявки\", refresh: \"Синхронизировать\", driverData: \"Данные водителя\", carData: \"Данные авто\", driverDocs: \"Документы водителя\", ca"
              },
              {
                "line": 250,
                "preview": "    newApplications: \"New applications\", openApplication: \"Open application\", noApplication: \"No new applications\", load: \"Load new applications\", refresh: \"Synchronize\", driverData: \"Driver data\", carData: \"Vehicle data\", driverDocs: \"Driver documents\", carPh"
              },
              {
                "line": 255,
                "preview": "    newApplications: \"Yangi arizalar\", openApplication: \"Ochilgan ariza\", noApplication: \"Yangi arizalar yo‘q\", load: \"Yangi arizalarni yuklash\", refresh: \"Sinxronlash\", driverData: \"Haydovchi ma’lumoti\", carData: \"Avto ma’lumoti\", driverDocs: \"Haydovchi hujja"
              },
              {
                "line": 260,
                "preview": "    newApplications: \"新申请\", openApplication: \"打开的申请\", noApplication: \"没有新申请\", load: \"加载新申请\", refresh: \"同步\", driverData: \"司机资料\", carData: \"车辆资料\", driverDocs: \"司机文件\", carPhotos: \"移动端上传车辆照片\", archiveDecision: \"决定和归档\", approve: \"批准并加入司机库\", reject: \"拒绝申请\", requestD"
              },
              {
                "line": 342,
                "preview": "  if (!application?.applicationId) blockers.push(`${copy.appId}: ${copy.required}`);"
              },
              {
                "line": 367,
                "preview": "  return [[copy.appId, application.applicationId], [copy.category, copy.categories[application.category]], [copy.status, application.status], [copy.submittedAt, application.submittedAt], [copy.driverName, application.driverName], [copy.phone, application.phone"
              }
            ]
          },
          {
            "file": "admin-ui/src/TaxiApiKeyReadinessPreflight039P.tsx",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 12,
                "preview": "  apiKeyReadinessPreflightReady: true,"
              },
              {
                "line": 14,
                "preview": "  apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "admin-ui/src/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 4949,
                "preview": "    apiKeys: number;"
              }
            ]
          },
          {
            "file": "src/app.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 49,
                "preview": "import { initFirebase } from \"./core/push/firebase\";"
              },
              {
                "line": 981,
                "preview": "    initFirebase();"
              },
              {
                "line": 983,
                "preview": "    console.warn(\"Firebase push is disabled for this run:\", error);"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/ai-provider-router.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 65,
                "preview": "        apiKeysMustStayOnServer: true,"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/ai-provider-router.types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 38,
                "preview": "    apiKeysMustStayOnServer: true"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/providers/google-translation.provider.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "      apiKey: process.env.AI_GOOGLE_TRANSLATION_GATEWAY_API_KEY,"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/providers/internal-translation.provider.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "      apiKey: process.env.AI_INTERNAL_TRANSLATION_GATEWAY_API_KEY,"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/providers/translation-gateway-provider.shared.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  apiKey?: string"
              },
              {
                "line": 83,
                "preview": "  private readonly apiKey?: string"
              },
              {
                "line": 92,
                "preview": "    this.apiKey = config.apiKey?.trim() || undefined"
              },
              {
                "line": 161,
                "preview": "    if (this.apiKey) {"
              },
              {
                "line": 162,
                "preview": "      headers[\"x-api-key\"] = this.apiKey"
              },
              {
                "line": 163,
                "preview": "      headers[\"x-ai-gateway-api-key\"] = this.apiKey"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/providers/yandex-gpt.provider.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 92,
                "preview": "  const apiKey ="
              },
              {
                "line": 104,
                "preview": "  if (apiKey) return `Api-Key ${apiKey}`"
              },
              {
                "line": 482,
                "preview": "  private readonly apiKey?: string"
              },
              {
                "line": 489,
                "preview": "    this.apiKey ="
              },
              {
                "line": 520,
                "preview": "    return this.gatewayUrl && this.apiKey && this.modelCandidates.length > 0 ? \"configured\" : \"unconfigured\""
              },
              {
                "line": 524,
                "preview": "    if (!this.gatewayUrl || !this.apiKey || this.modelCandidates.length === 0) {"
              },
              {
                "line": 788,
                "preview": "          authorization: `Api-Key ${this.apiKey}`,"
              }
            ]
          },
          {
            "file": "src/core/kernel/ai/providers/yandex-translation.provider.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "      apiKey: process.env.AI_YANDEX_TRANSLATION_GATEWAY_API_KEY,"
              }
            ]
          },
          {
            "file": "src/core/push/firebase.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 1,
                "preview": "import admin from \"firebase-admin\""
              },
              {
                "line": 5,
                "preview": "export function initFirebase() {"
              },
              {
                "line": 16,
                "preview": "export function getFirebase() {"
              },
              {
                "line": 19,
                "preview": "    throw new Error(\"firebase_not_initialized\")"
              }
            ]
          },
          {
            "file": "src/modules/admin/admin.providers.ts",
            "matched": [
              "Firebase",
              "apiKey"
            ],
            "snippets": [
              {
                "line": 17,
                "preview": "    secretFields: [\"apiKey\"],"
              },
              {
                "line": 27,
                "preview": "    secretFields: [\"apiKey\"],"
              },
              {
                "line": 37,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 47,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 57,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 67,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 77,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 87,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 97,
                "preview": "    secretFields: [\"apiKey\", \"privateKey\", \"webhookSecret\"],"
              },
              {
                "line": 107,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 117,
                "preview": "    secretFields: [\"apiKey\", \"webhookSecret\"],"
              },
              {
                "line": 127,
                "preview": "    secretFields: [\"apiKey\"],"
              }
            ]
          },
          {
            "file": "src/modules/admin/admin.routes.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 12719,
                "preview": "    apiKeys: number;"
              },
              {
                "line": 12806,
                "preview": "  const apiKeys = credentials.filter((item) => item.kind === \"api_key\");"
              },
              {
                "line": 12808,
                "preview": "  const activeApiKeys = apiKeys.filter((item) => item.status === \"active\");"
              },
              {
                "line": 12831,
                "preview": "      apiKeys: apiKeys.length,"
              }
            ]
          },
          {
            "file": "src/modules/ai/infrastructure/routes/ai-voice.routes.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 145,
                "preview": "  const apiKey = area === \"stt\""
              },
              {
                "line": 152,
                "preview": "  if (apiKey) headers.authorization = `Api-Key ${apiKey}`"
              },
              {
                "line": 230,
                "preview": "  const apiKey = area === \"stt\""
              },
              {
                "line": 237,
                "preview": "  if (apiKey) return `Api-Key ${apiKey}`"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/240y/sms240y.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 42,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/240y/sms240y.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 18,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/240z/sms240z.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 57,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/240z/sms240z.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241a/sms241a.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 49,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241a/sms241a.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 56,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241b/sms241b.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 51,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241b/sms241b.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241c/sms241c.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 52,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241c/sms241c.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241d/sms241d.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 56,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241d/sms241d.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 30,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241e/sms241e.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241e/sms241e.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241f/sms241f.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241f/sms241f.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 6,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241g/sms241g.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 54,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241g/sms241g.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241h/sms241h.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 56,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241h/sms241h.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 18,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241i/sms241i.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241i/sms241i.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241j/sms241j.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241j/sms241j.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 40,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241k/sms241k.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 59,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241k/sms241k.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 41,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241l/sms241l.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241l/sms241l.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241m/sms241m.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 57,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241m/sms241m.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241n/sms241n.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241n/sms241n.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241o/sms241o.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 55,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241o/sms241o.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: boolean;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241p/sms241p.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 61,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241p/sms241p.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241q/sms241q.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 59,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241q/sms241q.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241r/sms241r.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 60,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241r/sms241r.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241s/sms241s.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 86,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241s/sms241s.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241t/sms241t.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 87,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241t/sms241t.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241u/sms241u.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 59,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241u/sms241u.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  | 'noFirebaseApiCall'"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241v/sms241v.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 60,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241v/sms241v.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  | 'noFirebaseApiCall'"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241w/sms241w.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241w/sms241w.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241x/sms241x.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241x/sms241x.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241y/sms241y.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 87,
                "preview": "    firebaseApiCallByChecker: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241y/sms241y.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebaseApiCallByChecker: false;"
              },
              {
                "line": 68,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241z/sms241z.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 87,
                "preview": "    firebaseApiCallByChecker: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/241z/sms241z.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebaseApiCallByChecker: false;"
              },
              {
                "line": 68,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242a/sms242a.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 44,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242a/sms242a.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242b/sms242b.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 42,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242b/sms242b.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242c/sms242c.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 42,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242c/sms242c.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242d/sms242d.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 42,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242d/sms242d.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242e/sms242e.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 43,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242e/sms242e.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242f/sms242f.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242f/sms242f.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242g/sms242g.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242g/sms242g.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242h/sms242h.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 59,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242h/sms242h.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242i/sms242i.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 60,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/242i/sms242i.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelContract239L.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 11,
                "preview": "  firebaseExactValuesProvided: false,"
              },
              {
                "line": 12,
                "preview": "  realFirebaseProviderConnected: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelContract239L.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 4,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 6,
                "preview": "  firebaseExactValuesProvided: false;"
              },
              {
                "line": 7,
                "preview": "  realFirebaseProviderConnected: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239l/adminSmsReadinessPanelGuards239L.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "  noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelLanguageContract239N.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    'Firebase exact values',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelVisualPlacement239N.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "    'Firebase exact values status',"
              },
              {
                "line": 16,
                "preview": "    'Real Firebase provider connection status',"
              },
              {
                "line": 39,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 41,
                "preview": "  firebaseExactValuesProvided: false,"
              },
              {
                "line": 42,
                "preview": "  realFirebaseProviderConnected: false,"
              },
              {
                "line": 58,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 60,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 91,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 93,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/admin-readiness-239n/adminSmsReadinessPanelVisualPlacement239N.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 6,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 8,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 9,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239h/authPhoneSmsControllerContracts239H.ts",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 12,
                "preview": "    firebaseApiCallEnabled: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.service.ts",
            "matched": [
              "firebase",
              "Firebase",
              "PhoneAuthProvider"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "  FirebasePhoneAuthProviderReadiness239H,"
              },
              {
                "line": 3,
                "preview": "  FirebasePhoneAuthStartInput239H,"
              },
              {
                "line": 4,
                "preview": "  FirebasePhoneAuthVerifyInput239H,"
              },
              {
                "line": 5,
                "preview": "} from './firebasePhoneAuthProviderAdapter239H.types';"
              },
              {
                "line": 18,
                "preview": "export function getFirebasePhoneAuthReadiness239H(): FirebasePhoneAuthProviderReadiness239H {"
              },
              {
                "line": 21,
                "preview": "    provider: 'FirebasePhone Auth',"
              },
              {
                "line": 24,
                "preview": "    firebaseApiCallEnabled: false,"
              },
              {
                "line": 33,
                "preview": "export function createFirebasePhoneAuthStartCandidate239H(input: FirebasePhoneAuthStartInput239H) {"
              },
              {
                "line": 39,
                "preview": "    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',"
              },
              {
                "line": 43,
                "preview": "export function createFirebasePhoneAuthVerifyCandidate239H(input: FirebasePhoneAuthVerifyInput239H) {"
              },
              {
                "line": 49,
                "preview": "    reason: 'disabled_by_default_no_live_sms_no_firebase_api_call',"
              },
              {
                "line": 54,
                "preview": "export type FirebasePhoneAuthProviderAdapter239H = Readonly<{"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.types.ts",
            "matched": [
              "firebase",
              "Firebase",
              "PhoneAuthProvider"
            ],
            "snippets": [
              {
                "line": 1,
                "preview": "export type FirebasePhoneAuthProviderAdapterStatus239H = 'disabled_by_default';"
              },
              {
                "line": 3,
                "preview": "export interface FirebasePhoneAuthProviderReadiness239H {"
              },
              {
                "line": 5,
                "preview": "  readonly provider: 'FirebasePhone Auth';"
              },
              {
                "line": 6,
                "preview": "  readonly status: FirebasePhoneAuthProviderAdapterStatus239H;"
              },
              {
                "line": 8,
                "preview": "  readonly firebaseApiCallEnabled: false;"
              },
              {
                "line": 16,
                "preview": "export interface FirebasePhoneAuthStartInput239H {"
              },
              {
                "line": 22,
                "preview": "export interface FirebasePhoneAuthVerifyInput239H {"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239h/index.ts",
            "matched": [
              "firebase",
              "Firebase",
              "PhoneAuthProvider"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "  FirebasePhoneAuthProviderAdapterStatus239H,"
              },
              {
                "line": 3,
                "preview": "  FirebasePhoneAuthProviderReadiness239H,"
              },
              {
                "line": 4,
                "preview": "  FirebasePhoneAuthStartInput239H,"
              },
              {
                "line": 5,
                "preview": "  FirebasePhoneAuthVerifyInput239H,"
              },
              {
                "line": 6,
                "preview": "} from './firebasePhoneAuthProviderAdapter239H.types';"
              },
              {
                "line": 9,
                "preview": "  getFirebasePhoneAuthReadiness239H,"
              },
              {
                "line": 10,
                "preview": "  createFirebasePhoneAuthStartCandidate239H,"
              },
              {
                "line": 11,
                "preview": "  createFirebasePhoneAuthVerifyCandidate239H,"
              },
              {
                "line": 12,
                "preview": "} from './firebasePhoneAuthProviderAdapter239H.service';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239j/adminSmsReadinessRouteContract239J.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 6,
                "preview": "  providerSelectedForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 7,
                "preview": "  firebaseApiCallNow: false;"
              },
              {
                "line": 19,
                "preview": "  providerSelectedForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 20,
                "preview": "  firebaseApiCallNow: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/firebase-adapter-239j/authPhoneSmsRouteMountCandidate239J.ts",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "  firebaseApiCallNow: false;"
              },
              {
                "line": 22,
                "preview": "  firebaseApiCallNow: false,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-240e/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandAcceptanceGate240E.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 144,
                "preview": "    'firebaseApiBoundary',"
              },
              {
                "line": 145,
                "preview": "    'Firebase API boundary',"
              },
              {
                "line": 146,
                "preview": "    'firebase_boundary',"
              },
              {
                "line": 148,
                "preview": "    'Firebase remains disabled; 240E cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 211,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 248,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 283,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 284,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 286,
                "preview": "    realFirebaseProviderConnected: 0,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-240e/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandAcceptanceGate240E.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "  | 'firebase_boundary'"
              },
              {
                "line": 45,
                "preview": "  | 'firebaseApiBoundary'"
              },
              {
                "line": 110,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 111,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 113,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 124,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 161,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-240g/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReport240G.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 562,
                "preview": "    field: 'firebaseStatus',"
              },
              {
                "line": 563,
                "preview": "    label: 'firebaseStatus',"
              },
              {
                "line": 564,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 566,
                "preview": "    reportRule: 'Firebase remains disabled; 240G cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 842,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 879,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 916,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 917,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 919,
                "preview": "    realFirebaseProviderConnected: 0,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-240g/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReport240G.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'acceptance_report_summary' | 'confirmed_stage_chain' | 'exact_owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary' | 'backend_runtime_bounda"
              },
              {
                "line": 13,
                "preview": "  'acceptanceReportSummary' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | 'confirmed240ABuildStaticCheck' | 'adminBuildExecutionStatus' | 'ex"
              },
              {
                "line": 78,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 79,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 81,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 92,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 129,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-static-240h/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReportStaticCheck240H.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 10,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 598,
                "preview": "    field: 'firebaseStatus',"
              },
              {
                "line": 599,
                "preview": "    label: 'firebaseStatus',"
              },
              {
                "line": 600,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 602,
                "preview": "    staticCheckRule: 'Firebase remains disabled; 240H cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 899,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 900,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 902,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 912,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-report-static-240h/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceReportStaticCheck240H.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'report_static_check_summary' | 'confirmed_stage_chain' | 'exact_owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary' | 'backend_runtime_boun"
              },
              {
                "line": 13,
                "preview": "  'reportStaticCheckSummary' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | 'confirmed240ABuildStaticCheck' "
              },
              {
                "line": 79,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 80,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 82,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 93,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 130,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-static-240f/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceStaticCheck240F.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 426,
                "preview": "    field: 'firebaseApiBoundary',"
              },
              {
                "line": 427,
                "preview": "    label: 'firebaseApiBoundary',"
              },
              {
                "line": 428,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 430,
                "preview": "    staticCheckRule: 'Firebase remains disabled; 240F cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 672,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 709,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 745,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 746,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 748,
                "preview": "    realFirebaseProviderConnected: 0,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-acceptance-static-240f/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerCommandAcceptanceStaticCheck240F.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'owner_command_acceptance_static_check' | 'acceptance_gate_dependency' | 'admin_build_execution_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'runtime_mount_boundary' | 'secret_visibility_boundary' | 'firebase_boundary' | 'sms_pro"
              },
              {
                "line": 13,
                "preview": "  'ownerExactBuildSmokeCommandStaticCheckSlot' | 'ownerCommandAcceptanceGateDependency' | 'ownerCommandShapeValidationDependency' | 'ownerBuildSmokeApprovalGateDependency' | 'adminBuildExecutionApprovalBoundary' | 'adminBuildCommandBoundary' | 'maskedAdminStat"
              },
              {
                "line": 77,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 78,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 80,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 91,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 128,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-approval-240b/smsReadinessAdminReadinessPanelMaskedStatusOwnerBuildSmokeApprovalGate240B.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 570,
                "preview": "    field: 'firebaseDisabledApprovalBoundary',"
              },
              {
                "line": 571,
                "preview": "    label: 'firebase Disabled Approval Boundary',"
              },
              {
                "line": 572,
                "preview": "    category: 'firebase_disabled_approval_boundary',"
              },
              {
                "line": 576,
                "preview": "    approvalGateText: 'Firebase remains disabled; 240B cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
              },
              {
                "line": 907,
                "preview": "  firebaseExactValuesProvided: 0,"
              },
              {
                "line": 908,
                "preview": "  firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 910,
                "preview": "  realFirebaseProviderConnected: 0,"
              },
              {
                "line": 921,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 956,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-approval-240b/smsReadinessAdminReadinessPanelMaskedStatusOwnerBuildSmokeApprovalGate240B.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  | 'firebase_disabled_approval_boundary'"
              },
              {
                "line": 60,
                "preview": "  | 'firebaseDisabledApprovalBoundary'"
              },
              {
                "line": 145,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 180,
                "preview": "  readonly firebaseExactValuesProvided: 0;"
              },
              {
                "line": 181,
                "preview": "  readonly firebaseSecretValuesProvided: 0;"
              },
              {
                "line": 183,
                "preview": "  readonly realFirebaseProviderConnected: 0;"
              },
              {
                "line": 194,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-command-240c/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandCandidate240C.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 694,
                "preview": "    field: 'firebaseDisabledCommandBoundary',"
              },
              {
                "line": 695,
                "preview": "    label: 'firebase Disabled Command Boundary',"
              },
              {
                "line": 696,
                "preview": "    category: 'firebase_disabled_command_boundary',"
              },
              {
                "line": 700,
                "preview": "    commandCandidateText: 'Firebase remains disabled; 240C cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
              },
              {
                "line": 1061,
                "preview": "  firebaseExactValuesProvided: 0,"
              },
              {
                "line": 1062,
                "preview": "  firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 1064,
                "preview": "  realFirebaseProviderConnected: 0,"
              },
              {
                "line": 1075,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 1111,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-command-240c/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandCandidate240C.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 31,
                "preview": "  | 'firebase_disabled_command_boundary'"
              },
              {
                "line": 65,
                "preview": "  | 'firebaseDisabledCommandBoundary'"
              },
              {
                "line": 158,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 196,
                "preview": "  readonly firebaseExactValuesProvided: 0;"
              },
              {
                "line": 197,
                "preview": "  readonly firebaseSecretValuesProvided: 0;"
              },
              {
                "line": 199,
                "preview": "  readonly realFirebaseProviderConnected: 0;"
              },
              {
                "line": 210,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-240r/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGate240R.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 68,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 76,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 113,
                "preview": "  'Firebase remains disabled; 240R cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-240r/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGate240R.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 41,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-static-240s/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGateStaticCheck240S.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 69,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 77,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 114,
                "preview": "  'Firebase remains disabled; 240S cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-acceptance-gate-static-240s/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildAcceptanceGateStaticCheck240S.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 33,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 42,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-candidate-240o/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildCandidate240O.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "    'I approve SMS-240O owner exact command candidate for Admin UI masked readiness build smoke planning only: prepare the future npm run build command shape for admin-ui, still no live SMS, no Firebase call, no SMS provider call, no secrets, no Secret Manager"
              },
              {
                "line": 58,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 66,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 102,
                "preview": "  'Firebase remains disabled; 240O cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-candidate-240o/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildCandidate240O.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 38,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-240p/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidation240P.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 65,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 73,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 110,
                "preview": "  'Firebase remains disabled; 240P cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-240p/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidation240P.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 30,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 39,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-static-240q/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidationStaticCheck240Q.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 66,
                "preview": "  realFirebaseProviderConnected: 0,"
              },
              {
                "line": 74,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 111,
                "preview": "  'Firebase remains disabled; 240Q cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-command-shape-static-240q/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildShapeValidationStaticCheck240Q.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 31,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 40,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-boundary-240t/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalBoundary240T.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 48,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 77,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 160,
                "preview": "noFirebaseApiCall: true"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-boundary-static-240u/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalBoundaryStaticCheck240U.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 49,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 78,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 161,
                "preview": "noFirebaseApiCall: true"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-acceptance-gate-240x/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandAcceptanceGate240X.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 55,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 63,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-acceptance-gate-240x/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandAcceptanceGate240X.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 35,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-240v/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReady240V.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 50,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 79,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 144,
                "preview": "realFirebaseProviderConnected: 0"
              },
              {
                "line": 170,
                "preview": "noFirebaseApiCall: true"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-static-240w/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReadyStaticCheck240W.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 66,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 74,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-owner-final-approval-command-ready-static-240w/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeOwnerExactCommandToRunBuildFinalOwnerApprovalCommandReadyStaticCheck240W.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 37,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 46,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-240i/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummary240I.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 10,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 666,
                "preview": "    field: 'firebaseStatus',"
              },
              {
                "line": 667,
                "preview": "    label: 'firebaseStatus',"
              },
              {
                "line": 668,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 670,
                "preview": "    summaryRule: 'Firebase remains disabled; 240I cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 968,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 969,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 971,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 981,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-240i/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummary240I.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'final_pre_build_summary' | 'confirmed_stage_chain' | 'owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'admin_build_readiness_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_runtime_boundary"
              },
              {
                "line": 13,
                "preview": "  'finalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommandCandidate' | 'confirmed240BOwnerApprovalGate' | '"
              },
              {
                "line": 80,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 81,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 83,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 94,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 131,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-240k/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundary240K.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 10,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 666,
                "preview": "    field: 'firebaseBoundary',"
              },
              {
                "line": 667,
                "preview": "    label: 'firebaseBoundary',"
              },
              {
                "line": 668,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 670,
                "preview": "    boundaryRule: 'Firebase remains disabled; 240K cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 967,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 975,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-240k/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundary240K.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'final_pre_build_summary_acceptance_boundary' | 'confirmed_stage_chain' | 'owner_command_boundary' | 'owner_approval_boundary' | 'admin_build_boundary' | 'admin_ui_boundary' | 'admin_runtime_boundary' | 'backend_runtime_boundary' | 'secret_manager_boundary' "
              },
              {
                "line": 13,
                "preview": "  'finalPreBuildSummaryAcceptanceBoundary' | 'confirmed240JFinalPreBuildStaticCheck' | 'confirmed240IFinalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'conf"
              },
              {
                "line": 79,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 88,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 125,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-static-240l/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundaryStaticCheck240L.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 66,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-acceptance-boundary-static-240l/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryAcceptanceBoundaryStaticCheck240L.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 28,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 37,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-static-240j/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryStaticCheck240J.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 10,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              },
              {
                "line": 700,
                "preview": "    field: 'firebaseStatus',"
              },
              {
                "line": 701,
                "preview": "    label: 'firebaseStatus',"
              },
              {
                "line": 702,
                "preview": "    category: 'firebase_boundary',"
              },
              {
                "line": 704,
                "preview": "    summaryRule: 'Firebase remains disabled; 240J cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 1003,
                "preview": "    firebaseExactValuesProvided: 0,"
              },
              {
                "line": 1004,
                "preview": "    firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 1006,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 1016,
                "preview": "    noFirebaseApiCall: true,"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-prebuild-summary-static-240j/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalSummaryStaticCheck240J.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  'final_pre_build_summary_static_check' | 'confirmed_stage_chain' | 'owner_command_status' | 'owner_approval_status' | 'admin_build_execution_status' | 'admin_build_readiness_boundary' | 'masked_admin_status_boundary' | 'admin_ui_change_boundary' | 'admin_run"
              },
              {
                "line": 13,
                "preview": "  'finalPreBuildSummaryStaticCheck' | 'confirmed240IFinalPreBuildSummary' | 'confirmed240HReportStaticCheck' | 'confirmed240GAcceptanceReport' | 'confirmed240FStaticCheck' | 'confirmed240EAcceptanceGate' | 'confirmed240DShapeValidation' | 'confirmed240CCommand"
              },
              {
                "line": 81,
                "preview": "  readonly firebaseExactValuesProvided: number;"
              },
              {
                "line": 82,
                "preview": "  readonly firebaseSecretValuesProvided: number;"
              },
              {
                "line": 84,
                "preview": "  readonly realFirebaseProviderConnected: number;"
              },
              {
                "line": 95,
                "preview": "  readonly noFirebaseApiCall: boolean;"
              },
              {
                "line": 132,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-ready-notice-240m/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNotice240M.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 34,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 42,
                "preview": "    firebaseApiCallByChecker: false,"
              },
              {
                "line": 73,
                "preview": "    'Firebase remains disabled; 240M cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              },
              {
                "line": 83,
                "preview": "    'The approval command must remain non-secret and must not include Firebase secrets, SMS provider secrets, Secret Manager output, tokens, DB data, or live provider responses.',"
              },
              {
                "line": 99,
                "preview": "// noFirebaseApiCall: true"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-ready-notice-240m/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNotice240M.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 33,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 42,
                "preview": "  firebaseApiCallByChecker: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-ready-notice-static-240n/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNoticeStaticCheck240N.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 33,
                "preview": "    realFirebaseProviderConnected: 0,"
              },
              {
                "line": 67,
                "preview": "    noFirebaseApiCall: true,"
              },
              {
                "line": 98,
                "preview": "    'Firebase remains disabled; 240N cannot initialize Firebase, call Firebase Auth, validate live project data, or enable phone authentication.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-ready-notice-static-240n/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeFinalPreBuildOwnerApprovalCommandReadyNoticeStaticCheck240N.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 30,
                "preview": "  realFirebaseProviderConnected: 0;"
              },
              {
                "line": 66,
                "preview": "  noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-shape-240d/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandShapeValidation240D.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 136,
                "preview": "    shapeValidationText: 'Allowed future command shape is limited to Admin masked readiness build smoke only; it cannot mention Firebase connection, SMS provider connection, Secret Manager access, DB writes, deploy, or production launch.',"
              },
              {
                "line": 690,
                "preview": "    field: 'firebaseShapeBoundary',"
              },
              {
                "line": 691,
                "preview": "    label: 'firebaseShapeBoundary',"
              },
              {
                "line": 692,
                "preview": "    category: 'firebase_shape_boundary',"
              },
              {
                "line": 696,
                "preview": "    shapeValidationText: 'Firebase remains disabled; 240D cannot initialize Firebase, call Firebase API, validate credentials, alter allowlists, or connect provider runtime.',"
              },
              {
                "line": 1113,
                "preview": "  firebaseExactValuesProvided: 0,"
              },
              {
                "line": 1114,
                "preview": "  firebaseSecretValuesProvided: 0,"
              },
              {
                "line": 1116,
                "preview": "  realFirebaseProviderConnected: 0,"
              },
              {
                "line": 1127,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 1163,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-shape-240d/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeExactOwnerApprovalCommandShapeValidation240D.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  | 'firebase_shape_boundary'"
              },
              {
                "line": 64,
                "preview": "  | 'firebaseShapeBoundary'"
              },
              {
                "line": 163,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 199,
                "preview": "  readonly firebaseExactValuesProvided: 0;"
              },
              {
                "line": 200,
                "preview": "  readonly firebaseSecretValuesProvided: 0;"
              },
              {
                "line": 202,
                "preview": "  readonly realFirebaseProviderConnected: 0;"
              },
              {
                "line": 213,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-smoke-239z/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokePlan239Z.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 262,
                "preview": "    field: 'firebasePublicConfigBuildStatusPlan',"
              },
              {
                "line": 263,
                "preview": "    label: 'Firebase public config build status plan',"
              },
              {
                "line": 264,
                "preview": "    category: 'firebase_public_config_status_plan',"
              },
              {
                "line": 268,
                "preview": "    buildSmokePlanText: 'Plan to show only future public Firebase config readiness status; no Firebase API call, initialize, provider connect, or live auth is enabled.',"
              },
              {
                "line": 292,
                "preview": "    field: 'firebaseSecretMaskedBuildStatusPlan',"
              },
              {
                "line": 293,
                "preview": "    label: 'Firebase secret masked build status plan',"
              },
              {
                "line": 294,
                "preview": "    category: 'firebase_secret_masked_status_plan',"
              },
              {
                "line": 298,
                "preview": "    buildSmokePlanText: 'Plan to show only locked Firebase secret readiness badges; no API key, Admin credential, Secret Manager value, or credential content can render.',"
              },
              {
                "line": 388,
                "preview": "    buildSmokePlanText: 'Plan to show only authorized-domain and FIX75 public-site continuity status; no DNS change, Firebase allowlist call, deploy, route mount, or public launch is enabled.',"
              },
              {
                "line": 628,
                "preview": "    buildSmokePlanText: 'Plan disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, build execution, or live SMS.',"
              },
              {
                "line": 700,
                "preview": "    'firebasePublicConfigBuildStatusPlan',"
              },
              {
                "line": 701,
                "preview": "    'firebaseSecretMaskedBuildStatusPlan',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-smoke-239z/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokePlan239Z.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "  | 'firebase_public_config_status_plan'"
              },
              {
                "line": 23,
                "preview": "  | 'firebase_secret_masked_status_plan'"
              },
              {
                "line": 46,
                "preview": "  | 'firebasePublicConfigBuildStatusPlan'"
              },
              {
                "line": 47,
                "preview": "  | 'firebaseSecretMaskedBuildStatusPlan'"
              },
              {
                "line": 137,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 169,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 170,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 172,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 185,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-static-240a/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeStaticCheck240A.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 228,
                "preview": "    field: 'firebasePublicConfigStaticStatus',"
              },
              {
                "line": 229,
                "preview": "    label: 'firebasePublicConfig Static Status',"
              },
              {
                "line": 230,
                "preview": "    category: 'firebase_public_config_static_status',"
              },
              {
                "line": 234,
                "preview": "    staticCheckText: 'Static-check only Firebase public config readiness status; Firebase remains disabled and no Firebase API call is enabled.',"
              },
              {
                "line": 259,
                "preview": "    field: 'firebaseSecretMaskedStaticStatus',"
              },
              {
                "line": 260,
                "preview": "    label: 'firebaseSecretMasked Static Status',"
              },
              {
                "line": 261,
                "preview": "    category: 'firebase_secret_masked_static_status',"
              },
              {
                "line": 265,
                "preview": "    staticCheckText: 'Static-check only masked Firebase secret readiness; API keys, Admin service account material, and Secret Manager paths are never displayed, copied, exported, read, or written.',"
              },
              {
                "line": 358,
                "preview": "    staticCheckText: 'Static-check authorized-domain and FIX75 public-site domain status only; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
              },
              {
                "line": 544,
                "preview": "    staticCheckText: 'Static-check disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, build execution, deploy, or live SMS.',"
              },
              {
                "line": 668,
                "preview": "    staticCheckText: 'Static-check Owner approval boundary only; 240A cannot approve live action, run Admin build, mount runtime, connect Firebase/SMS provider, write secrets, deploy, or launch production.',"
              },
              {
                "line": 702,
                "preview": "    'firebasePublicConfigStaticStatus',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-build-static-240a/smsReadinessAdminReadinessPanelMaskedStatusBuildSmokeStaticCheck240A.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  | 'firebase_public_config_static_status'"
              },
              {
                "line": 27,
                "preview": "  | 'firebase_secret_masked_static_status'"
              },
              {
                "line": 48,
                "preview": "  | 'firebasePublicConfigStaticStatus'"
              },
              {
                "line": 49,
                "preview": "  | 'firebaseSecretMaskedStaticStatus'"
              },
              {
                "line": 142,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 177,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 178,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 180,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 193,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-placement-239x/smsReadinessAdminReadinessPanelMaskedStatusPlacementPlan239X.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 83,
                "preview": "    'Show a locked Owner approval required banner only; this plan cannot approve live SMS, Firebase calls, provider calls, Admin runtime mount, Google Cloud deploy, or production launch.',"
              },
              {
                "line": 93,
                "preview": "    'Show safe readiness percentages only: 239P through 239W are 100 percent, while real Firebase, real SMS provider, real SMS, real route runtime, real Admin runtime, deploy, and production launch stay 0 percent.',"
              },
              {
                "line": 97,
                "preview": "    'firebasePublicConfigStatusPlacement',"
              },
              {
                "line": 98,
                "preview": "    'Firebase public config masked status placement',"
              },
              {
                "line": 99,
                "preview": "    'firebase_public_config_status_placement',"
              },
              {
                "line": 103,
                "preview": "    'Show only masked Firebase public config readiness labels and missing-value status; do not store exact values, call Firebase, read env, or enable auth runtime from this placement plan.',"
              },
              {
                "line": 107,
                "preview": "    'firebaseSecretMaskedStatusPlacement',"
              },
              {
                "line": 108,
                "preview": "    'Firebase secret masked status placement',"
              },
              {
                "line": 109,
                "preview": "    'firebase_secret_masked_status_placement',"
              },
              {
                "line": 113,
                "preview": "    'Show only locked secret reference status for Firebase API key and Admin credential material; never render, copy, export, log, store, or reveal a plain secret in Admin UI.',"
              },
              {
                "line": 143,
                "preview": "    'Show only authorized-domain and FIX75 public-site domain planning status; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
              },
              {
                "line": 223,
                "preview": "    'Plan disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, or live SMS.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-placement-239x/smsReadinessAdminReadinessPanelMaskedStatusPlacementPlan239X.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  | 'firebase_public_config_status_placement'"
              },
              {
                "line": 20,
                "preview": "  | 'firebase_secret_masked_status_placement'"
              },
              {
                "line": 37,
                "preview": "  | 'firebasePublicConfigStatusPlacement'"
              },
              {
                "line": 38,
                "preview": "  | 'firebaseSecretMaskedStatusPlacement'"
              },
              {
                "line": 116,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 142,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 143,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 145,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 158,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-status-239w/smsReadinessMaskedAdminReadinessStatusContract239W.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 54,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 74,
                "preview": "    'firebaseProjectIdMaskedStatus',"
              },
              {
                "line": 75,
                "preview": "    'Firebase project id masked status',"
              },
              {
                "line": 76,
                "preview": "    'firebase_public_config_masked_status',"
              },
              {
                "line": 79,
                "preview": "    'Show only missing or pending public Firebase project id status; do not show exact values until separate Owner-approved non-secret acceptance stage.',"
              },
              {
                "line": 83,
                "preview": "    'firebaseAppIdMaskedStatus',"
              },
              {
                "line": 84,
                "preview": "    'Firebase app id masked status',"
              },
              {
                "line": 85,
                "preview": "    'firebase_public_config_masked_status',"
              },
              {
                "line": 88,
                "preview": "    'Show only public app id readiness status; do not connect Firebase and do not store app config from this Admin status contract.',"
              },
              {
                "line": 92,
                "preview": "    'firebaseAuthDomainMaskedStatus',"
              },
              {
                "line": 93,
                "preview": "    'Firebase auth domain masked status',"
              },
              {
                "line": 94,
                "preview": "    'firebase_public_config_masked_status',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-status-239w/smsReadinessMaskedAdminReadinessStatusContract239W.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "  | 'firebase_public_config_masked_status'"
              },
              {
                "line": 16,
                "preview": "  | 'firebase_secret_masked_status'"
              },
              {
                "line": 31,
                "preview": "  | 'firebaseProjectIdMaskedStatus'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseAppIdMaskedStatus'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseAuthDomainMaskedStatus'"
              },
              {
                "line": 34,
                "preview": "  | 'firebaseMessagingSenderIdMaskedStatus'"
              },
              {
                "line": 35,
                "preview": "  | 'firebaseApiKeyMaskedStatusOnly'"
              },
              {
                "line": 36,
                "preview": "  | 'firebaseAdminCredentialMaskedStatusOnly'"
              },
              {
                "line": 86,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 115,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 139,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 140,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-typecheck-239y/smsReadinessAdminReadinessPanelMaskedStatusStaticTypecheck239Y.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 97,
                "preview": "    'Typecheck the locked Owner approval banner only; this static TypeScript check cannot approve Firebase calls, provider calls, live SMS, Admin runtime, deploy, or production launch.',"
              },
              {
                "line": 107,
                "preview": "    'Typecheck safe readiness percentages only: 239P through 239X are 100 percent, while real Firebase, real SMS provider, real SMS, route runtime, Admin runtime, deploy, and production launch stay 0 percent.',"
              },
              {
                "line": 111,
                "preview": "    'firebasePublicConfigStatusTypecheck',"
              },
              {
                "line": 112,
                "preview": "    'Firebase public config status typecheck',"
              },
              {
                "line": 113,
                "preview": "    'firebase_public_config_status_typecheck',"
              },
              {
                "line": 117,
                "preview": "    'Typecheck only masked Firebase public config readiness and missing-value labels; do not accept exact values, call Firebase, read env, or enable auth runtime from this check.',"
              },
              {
                "line": 121,
                "preview": "    'firebaseSecretMaskedStatusTypecheck',"
              },
              {
                "line": 122,
                "preview": "    'Firebase secret masked status typecheck',"
              },
              {
                "line": 123,
                "preview": "    'firebase_secret_masked_status_typecheck',"
              },
              {
                "line": 127,
                "preview": "    'Typecheck locked Firebase secret reference status only; plain Firebase API key and Admin credential material must never render, copy, export, log, store, or appear in Admin UI.',"
              },
              {
                "line": 157,
                "preview": "    'Typecheck authorized-domain and FIX75 public-site domain planning status only; no DNS change, Firebase allowlist call, route mount, deploy, or public launch is enabled.',"
              },
              {
                "line": 237,
                "preview": "    'Typecheck disabled placeholders only for future Owner-approved actions; buttons cannot enable Firebase, SMS provider, Secret Manager, Admin runtime, backend route, deploy, or live SMS.',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/masked-admin-typecheck-239y/smsReadinessAdminReadinessPanelMaskedStatusStaticTypecheck239Y.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  | 'firebase_public_config_status_typecheck'"
              },
              {
                "line": 20,
                "preview": "  | 'firebase_secret_masked_status_typecheck'"
              },
              {
                "line": 40,
                "preview": "  | 'firebasePublicConfigStatusTypecheck'"
              },
              {
                "line": 41,
                "preview": "  | 'firebaseSecretMaskedStatusTypecheck'"
              },
              {
                "line": 126,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 154,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 155,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 157,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 170,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-acceptance-239t/smsReadinessOwnerExactNonSecretCandidateAcceptanceGate239T.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 43,
                "preview": "  mayConnectFirebaseNow: false,"
              },
              {
                "line": 73,
                "preview": "    'firebaseProjectIdCandidateAcceptance',"
              },
              {
                "line": 74,
                "preview": "    'Firebase project id non-secret candidate acceptance slot',"
              },
              {
                "line": 75,
                "preview": "    'firebase_public_config_acceptance',"
              },
              {
                "line": 77,
                "preview": "    'Accept a future public Firebase project id candidate only after exact Owner-provided non-secret value validation, not in this stage.',"
              },
              {
                "line": 81,
                "preview": "    'firebaseAppIdCandidateAcceptance',"
              },
              {
                "line": 82,
                "preview": "    'Firebase app id non-secret candidate acceptance slot',"
              },
              {
                "line": 83,
                "preview": "    'firebase_public_config_acceptance',"
              },
              {
                "line": 85,
                "preview": "    'Accept a future public Firebase app id candidate only as a non-secret reviewed value; Firebase remains disabled here.',"
              },
              {
                "line": 89,
                "preview": "    'firebaseAuthDomainCandidateAcceptance',"
              },
              {
                "line": 90,
                "preview": "    'Firebase auth domain non-secret candidate acceptance slot',"
              },
              {
                "line": 91,
                "preview": "    'firebase_public_config_acceptance',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-acceptance-239t/smsReadinessOwnerExactNonSecretCandidateAcceptanceGate239T.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "  | 'firebase_public_config_acceptance'"
              },
              {
                "line": 16,
                "preview": "  | 'firebase_secret_reference_boundary'"
              },
              {
                "line": 31,
                "preview": "  | 'firebaseProjectIdCandidateAcceptance'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseAppIdCandidateAcceptance'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseAuthDomainCandidateAcceptance'"
              },
              {
                "line": 34,
                "preview": "  | 'firebaseMessagingSenderIdCandidateAcceptance'"
              },
              {
                "line": 35,
                "preview": "  | 'firebaseApiKeySecretReferenceBoundary'"
              },
              {
                "line": 36,
                "preview": "  | 'firebaseAdminServiceAccountSecretReferenceBoundary'"
              },
              {
                "line": 37,
                "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceBoundary'"
              },
              {
                "line": 70,
                "preview": "  readonly mayConnectFirebaseNow: false;"
              },
              {
                "line": 88,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 101,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-approval-239p/smsReadinessOwnerApprovalMatrix239P.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 39,
                "preview": "  lockedRow239P('firebase_exact_values_intake', 'Owner exact Firebase values intake gate', 'waiting_owner_exact_approval'),"
              },
              {
                "line": 40,
                "preview": "  lockedRow239P('firebase_admin_backend_contract_enablement', 'Owner Firebase Admin/backend contract enablement gate'),"
              },
              {
                "line": 52,
                "preview": "  noFirebaseApiCall: true,"
              },
              {
                "line": 68,
                "preview": "  firebaseExactValuesProvided: false,"
              },
              {
                "line": 69,
                "preview": "  realFirebaseProviderConnected: false,"
              },
              {
                "line": 90,
                "preview": "  selectedProviderForValidation: 'Firebase Phone Auth',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-approval-239p/smsReadinessOwnerApprovalMatrix239P.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  | 'firebase_exact_values_intake'"
              },
              {
                "line": 9,
                "preview": "  | 'firebase_admin_backend_contract_enablement'"
              },
              {
                "line": 29,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 42,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 43,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 62,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-candidate-239r/smsReadinessOwnerProvidedNonSecretCandidateShape239R.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 43,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 70,
                "preview": "    'firebaseProjectIdCandidate',"
              },
              {
                "line": 71,
                "preview": "    'Firebase project id non-secret candidate shape',"
              },
              {
                "line": 72,
                "preview": "    'firebase_public_config_candidate',"
              },
              {
                "line": 75,
                "preview": "    'lowercase project slug or public Firebase project id; non-secret candidate only',"
              },
              {
                "line": 79,
                "preview": "    'firebaseAppIdCandidate',"
              },
              {
                "line": 80,
                "preview": "    'Firebase app id non-secret candidate shape',"
              },
              {
                "line": 81,
                "preview": "    'firebase_public_config_candidate',"
              },
              {
                "line": 84,
                "preview": "    'public Firebase app id candidate; must be validated later outside source storage',"
              },
              {
                "line": 88,
                "preview": "    'firebaseAuthDomainCandidate',"
              },
              {
                "line": 89,
                "preview": "    'Firebase auth domain non-secret candidate shape',"
              },
              {
                "line": 90,
                "preview": "    'firebase_public_config_candidate',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-candidate-239r/smsReadinessOwnerProvidedNonSecretCandidateShape239R.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "  | 'firebase_public_config_candidate'"
              },
              {
                "line": 15,
                "preview": "  | 'firebase_secret_reference_only'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseProjectIdCandidate'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseAppIdCandidate'"
              },
              {
                "line": 34,
                "preview": "  | 'firebaseAuthDomainCandidate'"
              },
              {
                "line": 35,
                "preview": "  | 'firebaseMessagingSenderIdCandidate'"
              },
              {
                "line": 36,
                "preview": "  | 'firebaseApiKeyReferenceOnly'"
              },
              {
                "line": 37,
                "preview": "  | 'firebaseAdminServiceAccountReferenceOnly'"
              },
              {
                "line": 38,
                "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceOnly'"
              },
              {
                "line": 69,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 82,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 93,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-review-239s/smsReadinessOwnerExactNonSecretCandidateReviewReport239S.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 45,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 70,
                "preview": "    'firebaseProjectIdReview',"
              },
              {
                "line": 71,
                "preview": "    'Firebase project id non-secret candidate review slot',"
              },
              {
                "line": 72,
                "preview": "    'firebase_public_config_review',"
              },
              {
                "line": 74,
                "preview": "    'Review future exact Firebase project id format only after Owner provides a non-secret candidate.',"
              },
              {
                "line": 78,
                "preview": "    'firebaseAppIdReview',"
              },
              {
                "line": 79,
                "preview": "    'Firebase app id non-secret candidate review slot',"
              },
              {
                "line": 80,
                "preview": "    'firebase_public_config_review',"
              },
              {
                "line": 82,
                "preview": "    'Review future public Firebase app id candidate shape without enabling Firebase.',"
              },
              {
                "line": 86,
                "preview": "    'firebaseAuthDomainReview',"
              },
              {
                "line": 87,
                "preview": "    'Firebase auth domain non-secret candidate review slot',"
              },
              {
                "line": 88,
                "preview": "    'firebase_public_config_review',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-review-239s/smsReadinessOwnerExactNonSecretCandidateReviewReport239S.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "  | 'firebase_public_config_review'"
              },
              {
                "line": 15,
                "preview": "  | 'firebase_secret_reference_boundary'"
              },
              {
                "line": 28,
                "preview": "  | 'firebaseProjectIdReview'"
              },
              {
                "line": 29,
                "preview": "  | 'firebaseAppIdReview'"
              },
              {
                "line": 30,
                "preview": "  | 'firebaseAuthDomainReview'"
              },
              {
                "line": 31,
                "preview": "  | 'firebaseMessagingSenderIdReview'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseApiKeyReferenceBoundary'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseAdminServiceAccountReferenceBoundary'"
              },
              {
                "line": 34,
                "preview": "  | 'firebaseAdminCredentialSecretManagerReferenceBoundary'"
              },
              {
                "line": 68,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 81,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 93,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-values-239q/smsReadinessOwnerExactValuesReferenceIntake239Q.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 40,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 65,
                "preview": "    'firebaseProjectId',"
              },
              {
                "line": 66,
                "preview": "    'Firebase project id candidate value slot',"
              },
              {
                "line": 67,
                "preview": "    'firebase_public_config_reference',"
              },
              {
                "line": 73,
                "preview": "    'firebaseAppId',"
              },
              {
                "line": 74,
                "preview": "    'Firebase app id candidate value slot',"
              },
              {
                "line": 75,
                "preview": "    'firebase_public_config_reference',"
              },
              {
                "line": 81,
                "preview": "    'firebaseAuthDomain',"
              },
              {
                "line": 82,
                "preview": "    'Firebase auth domain candidate value slot',"
              },
              {
                "line": 83,
                "preview": "    'firebase_public_config_reference',"
              },
              {
                "line": 89,
                "preview": "    'firebaseApiKeyReference',"
              },
              {
                "line": 90,
                "preview": "    'Firebase API key reference slot; no plain key stored here',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/owner-values-239q/smsReadinessOwnerExactValuesReferenceIntake239Q.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 13,
                "preview": "  | 'firebase_public_config_reference'"
              },
              {
                "line": 14,
                "preview": "  | 'firebase_secret_reference_only'"
              },
              {
                "line": 30,
                "preview": "  | 'firebaseProjectId'"
              },
              {
                "line": 31,
                "preview": "  | 'firebaseAppId'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseAuthDomain'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseApiKeyReference'"
              },
              {
                "line": 34,
                "preview": "  | 'firebaseAdminServiceAccountReference'"
              },
              {
                "line": 35,
                "preview": "  | 'firebaseAdminCredentialSecretManagerReference'"
              },
              {
                "line": 36,
                "preview": "  | 'firebaseMessagingSenderId'"
              },
              {
                "line": 63,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 74,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 82,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/secret-access-239v/smsReadinessSecretReferenceAccessControlMatrix239V.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 52,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 105,
                "preview": "    'firebaseApiKeyAccessControlReference',"
              },
              {
                "line": 106,
                "preview": "    'Firebase API key access-control reference',"
              },
              {
                "line": 107,
                "preview": "    'firebase_secret_reference_acl',"
              },
              {
                "line": 109,
                "preview": "    'Reject any plain Firebase API key and allow only future masked readiness status; no role may view, copy, export, or reveal the key from this matrix.',"
              },
              {
                "line": 113,
                "preview": "    'firebaseAdminServiceAccountAccessControlReference',"
              },
              {
                "line": 114,
                "preview": "    'Firebase Admin service account access-control reference',"
              },
              {
                "line": 115,
                "preview": "    'firebase_secret_reference_acl',"
              },
              {
                "line": 117,
                "preview": "    'Reject plain Firebase Admin service account material; future access requires separate exact Owner approval, least-privilege scope, audit trail, and post-access review.',"
              },
              {
                "line": 121,
                "preview": "    'firebaseAdminCredentialPathAccessControlReference',"
              },
              {
                "line": 122,
                "preview": "    'Firebase Admin credential path access-control reference',"
              },
              {
                "line": 123,
                "preview": "    'firebase_secret_reference_acl',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/secret-access-239v/smsReadinessSecretReferenceAccessControlMatrix239V.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 16,
                "preview": "  | 'firebase_secret_reference_acl'"
              },
              {
                "line": 35,
                "preview": "  | 'firebaseApiKeyAccessControlReference'"
              },
              {
                "line": 36,
                "preview": "  | 'firebaseAdminServiceAccountAccessControlReference'"
              },
              {
                "line": 37,
                "preview": "  | 'firebaseAdminCredentialPathAccessControlReference'"
              },
              {
                "line": 96,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 125,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 145,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 146,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 148,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 162,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/secret-boundary-239u/smsReadinessSecretReferenceStorageBoundaryPlan239U.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 45,
                "preview": "  firebaseApiCallEnabledNow: false,"
              },
              {
                "line": 77,
                "preview": "    'firebase_secret_manager_reference_plan',"
              },
              {
                "line": 83,
                "preview": "    'firebaseApiKeyStorageReferencePlan',"
              },
              {
                "line": 84,
                "preview": "    'Firebase API key storage reference plan',"
              },
              {
                "line": 85,
                "preview": "    'firebase_secret_manager_reference_plan',"
              },
              {
                "line": 87,
                "preview": "    'Reject any plain Firebase API key in source, chat, DB, reports, logs, or patches; only a future storage reference may be reviewed after exact Owner approval.',"
              },
              {
                "line": 91,
                "preview": "    'firebaseAdminServiceAccountStorageReferencePlan',"
              },
              {
                "line": 92,
                "preview": "    'Firebase Admin service account storage reference plan',"
              },
              {
                "line": 93,
                "preview": "    'firebase_secret_manager_reference_plan',"
              },
              {
                "line": 95,
                "preview": "    'Reject plain Firebase Admin service account material; future secure storage requires separate exact Owner approval and verified Secret Manager boundary.',"
              },
              {
                "line": 99,
                "preview": "    'firebaseAdminCredentialSecretManagerPathReference',"
              },
              {
                "line": 100,
                "preview": "    'Firebase Admin credential Secret Manager path reference plan',"
              }
            ]
          },
          {
            "file": "src/modules/auth/sms/secret-boundary-239u/smsReadinessSecretReferenceStorageBoundaryPlan239U.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "  | 'firebase_secret_manager_reference_plan'"
              },
              {
                "line": 16,
                "preview": "  | 'firebase_public_config_dependency'"
              },
              {
                "line": 31,
                "preview": "  | 'firebaseApiKeyStorageReferencePlan'"
              },
              {
                "line": 32,
                "preview": "  | 'firebaseAdminServiceAccountStorageReferencePlan'"
              },
              {
                "line": 33,
                "preview": "  | 'firebaseAdminCredentialSecretManagerPathReference'"
              },
              {
                "line": 69,
                "preview": "  readonly firebaseApiCallEnabledNow: false;"
              },
              {
                "line": 87,
                "preview": "  readonly selectedProviderForValidation: 'Firebase Phone Auth';"
              },
              {
                "line": 107,
                "preview": "  readonly firebaseExactValuesProvided: false;"
              },
              {
                "line": 108,
                "preview": "  readonly firebaseSecretValuesProvided: false;"
              },
              {
                "line": 110,
                "preview": "  readonly realFirebaseProviderConnected: false;"
              },
              {
                "line": 123,
                "preview": "  readonly noFirebaseApiCall: true;"
              }
            ]
          },
          {
            "file": "src/modules/notification/application/push.service.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 1,
                "preview": "import { getFirebase } from \"../../../core/push/firebase\""
              },
              {
                "line": 13,
                "preview": "      const messaging = getFirebase()"
              }
            ]
          },
          {
            "file": "src/modules/notification/infrastructure/firebase.service.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 1,
                "preview": "import admin from \"firebase-admin\""
              },
              {
                "line": 3,
                "preview": "export class FirebaseService {"
              }
            ]
          },
          {
            "file": "src/modules/programs/program-foundation.registry.ts",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 419,
                "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
              }
            ]
          },
          {
            "file": "src/modules/qr/infrastructure/routes/qr-core.routes.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 58,
                "preview": "      apiKeysInMobileAllowed: false,"
              }
            ]
          },
          {
            "file": "src/modules/qr/services/qr-provider-admin-registry.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
              },
              {
                "line": 31,
                "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
              },
              {
                "line": 42,
                "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
              }
            ]
          },
          {
            "file": "src/modules/release/243a/sabiRelease243a.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 92,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 96,
                "preview": "  noFirebaseApiCallByThisPatch: true,"
              },
              {
                "line": 132,
                "preview": "  firebasePhoneAuth: 'Firebase phone auth: phone-number sign-in/SMS must be enabled before live use',"
              }
            ]
          },
          {
            "file": "src/modules/release/243b/sabiRelease243b.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 33,
                "preview": "    firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 64,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243b/sabiRelease243b.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 58,
                "preview": "    readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243c/sabiRelease243c.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 30,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 67,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 87,
                "preview": "  sms: 'Firebase Phone Auth or approved SMS provider server boundary required; no live SMS now',"
              }
            ]
          },
          {
            "file": "src/modules/release/243c/sabiRelease243c.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  | 'noFirebaseApiCallNow'"
              },
              {
                "line": 56,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243d/sabiRelease243d.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 28,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 65,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243d/sabiRelease243d.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 55,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243e/sabiRelease243e.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 63,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243e/sabiRelease243e.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 53,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243f/sabiRelease243f.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 71,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243f/sabiRelease243f.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243g/sabiRelease243g.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 47,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 72,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243g/sabiRelease243g.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243h/sabiRelease243h.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 61,
                "preview": "  'firebasePhoneAuthOrApprovedSmsProviderRequired: true',"
              }
            ]
          },
          {
            "file": "src/modules/release/243h/sabiRelease243h.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243i/sabiRelease243i.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 63,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
              }
            ]
          },
          {
            "file": "src/modules/release/243i/sabiRelease243i.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243j/sabiRelease243j.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 65,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
              }
            ]
          },
          {
            "file": "src/modules/release/243j/sabiRelease243j.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243k/sabiRelease243k.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 64,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 112,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
              },
              {
                "line": 157,
                "preview": "  \"noFirebaseApiCallNow: true\","
              }
            ]
          },
          {
            "file": "src/modules/release/243k/sabiRelease243k.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243l/sabiRelease243l.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 67,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 116,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired: true\","
              },
              {
                "line": 168,
                "preview": "  \"noFirebaseApiCallNow: true\","
              }
            ]
          },
          {
            "file": "src/modules/release/243l/sabiRelease243l.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243m/sabiRelease243m.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 76,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243m/sabiRelease243m.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 66,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243n/sabiRelease243n.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 77,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243n/sabiRelease243n.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 68,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243o/sabiRelease243o.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 77,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243o/sabiRelease243o.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 68,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243p/sabiRelease243p.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 73,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243p/sabiRelease243p.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 67,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243q/sabiRelease243q.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 73,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243q/sabiRelease243q.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 67,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243r/sabiRelease243r.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 75,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243s/sabiRelease243s.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 75,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243t/sabiRelease243t.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 76,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243u/sabiRelease243u.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 79,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243u/sabiRelease243u.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 36,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 70,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243v/sabiRelease243v.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 79,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243v/sabiRelease243v.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 36,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 70,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243w/sabiRelease243w.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 99,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243w/sabiRelease243w.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243x/sabiRelease243x.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 89,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243x/sabiRelease243x.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 36,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243y/sabiRelease243y.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 90,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243y/sabiRelease243y.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 36,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 74,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/243z/sabiRelease243z.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 20,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 93,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/243z/sabiRelease243z.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 37,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 75,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244a/sabiRelease244a.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 88,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244a/sabiRelease244a.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 36,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244b/sabiRelease244b.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 94,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244b/sabiRelease244b.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 38,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 77,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244c/sabiRelease244c.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 94,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244c/sabiRelease244c.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 40,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 81,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244d/sabiRelease244d.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 99,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244d/sabiRelease244d.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 42,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 85,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244e/sabiRelease244e.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 104,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244e/sabiRelease244e.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 44,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 89,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244f/sabiRelease244f.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 109,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244f/sabiRelease244f.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 46,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 93,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244g/sabiRelease244g.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 23,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 116,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244g/sabiRelease244g.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 48,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 99,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244h/sabiRelease244h.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 28,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 106,
                "preview": "    noFirebaseApiCallNow: true,"
              },
              {
                "line": 143,
                "preview": "  noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244h/sabiRelease244h.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 50,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 103,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              },
              {
                "line": 145,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244i/sabiRelease244i.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 124,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244i/sabiRelease244i.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 105,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244j/sabiRelease244j.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 56,
                "preview": "    'sms_provider_or_firebase_phone_auth_verified',"
              },
              {
                "line": 100,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244j/sabiRelease244j.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 75,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              },
              {
                "line": 104,
                "preview": "    'sms_provider_or_firebase_phone_auth_verified',"
              }
            ]
          },
          {
            "file": "src/modules/release/244k/sabiRelease244k.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 45,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 132,
                "preview": "  noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244l/sabiRelease244l.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 45,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 136,
                "preview": "  noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244m/sabiRelease244m.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 45,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 143,
                "preview": "  noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244n/sabiRelease244n.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 84,
                "preview": "  noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244n/sabiRelease244n.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 37,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
              },
              {
                "line": 69,
                "preview": "  readonly noFirebaseApiCallNow: boolean;"
              }
            ]
          },
          {
            "file": "src/modules/release/244o/sabiRelease244o.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 32,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 115,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244o/sabiRelease244o.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244p/sabiRelease244p.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 100,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244p/sabiRelease244p.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 35,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244q/sabiRelease244q.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 95,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244q/sabiRelease244q.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244r/sabiRelease244r.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 96,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244r/sabiRelease244r.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  noFirebaseApiCallNow: true;"
              },
              {
                "line": 73,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/244s/sabiRelease244s.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 122,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244t/sabiRelease244T.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 123,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244u/sabiRelease244U.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 70,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
              },
              {
                "line": 109,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244u/sabiRelease244U.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"noFirebaseApiCallNow\": boolean,"
              }
            ]
          },
          {
            "file": "src/modules/release/244v/sabiRelease244V.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 71,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
              },
              {
                "line": 110,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244v/sabiRelease244V.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"noFirebaseApiCallNow\": boolean,"
              }
            ]
          },
          {
            "file": "src/modules/release/244w/sabiRelease244W.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 71,
                "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
              },
              {
                "line": 109,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244w/sabiRelease244W.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  noFirebaseApiCallNow: boolean;"
              }
            ]
          },
          {
            "file": "src/modules/release/244x/sabiRelease244X.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 72,
                "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
              },
              {
                "line": 110,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244y/sabiRelease244Y.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 73,
                "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
              },
              {
                "line": 111,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/244z/sabiRelease244Z.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 75,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
              },
              {
                "line": 114,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245a/sabiRelease245A.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 76,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\""
              },
              {
                "line": 115,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245b/sabiRelease245B.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 77,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 118,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245c/sabiRelease245C.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 78,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 119,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245d/sabiRelease245D.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 25,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: true,"
              },
              {
                "line": 52,
                "preview": "    { name: 'sms_provider_or_firebase_phone_auth_reference_ready_without_call', ready: true, acceptedNow: false, executableNow: false, noExecutionNow: true },"
              },
              {
                "line": 84,
                "preview": "    noFirebaseApiCallNow: true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245d/sabiRelease245D.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 40,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              },
              {
                "line": 81,
                "preview": "  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/245e/sabiRelease245E.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 58,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 100,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245f/sabiRelease245F.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 58,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 100,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245g/sabiRelease245G.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 58,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 100,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245h/sabiRelease245H.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 77,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 119,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245i/sabiRelease245I.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 78,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 119,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245j/sabiRelease245J.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 79,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 124,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245j/sabiRelease245J.types.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 31,
                "preview": "  readonly noFirebaseApiCallNow: true;"
              }
            ]
          },
          {
            "file": "src/modules/release/245k/sabiRelease245K.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 68,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\","
              },
              {
                "line": 113,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245l/sabiRelease245L.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 89,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245l/sabiRelease245L.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  noFirebaseApiCallNow: boolean;"
              },
              {
                "line": 68,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
              }
            ]
          },
          {
            "file": "src/modules/release/245m/sabiRelease245M.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 29,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 90,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              },
              {
                "line": 118,
                "preview": "  \"sms_provider_or_firebase_phone_auth_reference_ready_without_call\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245m/sabiRelease245M.types.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  noFirebaseApiCallNow: boolean;"
              },
              {
                "line": 68,
                "preview": "  firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;"
              }
            ]
          },
          {
            "file": "src/modules/release/245n/sabiRelease245N.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 26,
                "preview": "  \"firebasePhoneAuthOrApprovedSmsProviderRequired\": true,"
              },
              {
                "line": 53,
                "preview": "    \"sms_provider_or_firebase_phone_auth_reference_only_without_call\","
              },
              {
                "line": 80,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245o/sabiRelease245OInventory.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 88,
                "preview": "    \"sms_live_provider_or_firebase_phone_auth_requires_owner_approval\","
              },
              {
                "line": 113,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              },
              {
                "line": 132,
                "preview": "    \"confirm_firebase_phone_auth_or_sms_provider_values\","
              }
            ]
          },
          {
            "file": "src/modules/release/245p/sabiRelease245PPreExecutionPlan.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 149,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245p-fix1/sabiRelease245PFix1.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 132,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245p-fix2/sabiRelease245PFix2.ts",
            "matched": [
              "Firebase"
            ],
            "snippets": [
              {
                "line": 207,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245q/sabiRelease245Q.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245Q enable required Google Cloud APIs for official Sabi site Cloud Run preparation only, no deploy, no DNS mutation, no SMS, no Firebase call, no wallet, no payment, no payout\","
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245Q_enable_required_google_cloud_apis_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout\","
              },
              {
                "line": 109,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 120,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              },
              {
                "line": 135,
                "preview": "    \"firebase_call_still_locked\","
              }
            ]
          },
          {
            "file": "src/modules/release/245r/sabiRelease245R.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R deploy official Sabi website to Google Cloud Run service sabi-official-site in project sabi-official-prod region europe-west1 only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no pa"
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245R_cloud_run_deploy_official_site_only_no_domain_dns_no_sms_no_firebase_no_wallet_payment_payout\","
              },
              {
                "line": 117,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 127,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              },
              {
                "line": 141,
                "preview": "    \"firebase_call_still_locked\","
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix1/sabiRelease245RFix1.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX1 grant Storage Object Viewer on Cloud Run source bucket to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no wallet, no payment, n"
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245R_FIX1_grant_storage_object_viewer_on_cloud_run_source_bucket_only_no_deploy_no_dns_no_sms_no_firebase_no_wallet_payment_payout\","
              },
              {
                "line": 104,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 116,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix2/sabiRelease245RFix2.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 12,
                "preview": "  \"scope\": \"245R_FIX2_retry_cloud_run_deploy_after_bucket_iam_fix_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 129,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 140,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix3/sabiRelease245RFix3.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"scope\": \"245R_FIX3_read_only_cloud_build_logs_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet\","
              },
              {
                "line": 99,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 110,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix4/sabiRelease245RFix4.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX4 grant Artifact Registry Writer on repository cloud-run-source-deploy to compute service account for official site deploy retry only, no domain DNS mutation, no SMS, no Firebase call, no Google "
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245R_FIX4_grant_artifact_registry_writer_on_cloud_run_source_deploy_repository_only_no_deploy_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 104,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 116,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix5/sabiRelease245RFix5.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 12,
                "preview": "  \"scope\": \"245R_FIX5_retry_cloud_run_deploy_after_artifact_registry_writer_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 129,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 140,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix6/sabiRelease245RFix6.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX6 grant public Cloud Run Invoker access to service sabi-official-site for official website public access only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, "
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245R_FIX6_grant_public_cloud_run_invoker_only_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 125,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 136,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix7/sabiRelease245RFix7.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245R-FIX7 disable Cloud Run Invoker IAM check for service sabi-official-site to make official website public only, no domain DNS mutation, no SMS, no Firebase call, no Google Pay Billing, no wallet, no p"
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245R_FIX7_disable_cloud_run_invoker_iam_check_only_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 116,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 127,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245r-fix7a/sabiRelease245RFix7A.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"scope\": \"245R_FIX7A_read_only_cloud_run_public_site_closeout_no_deploy_no_domain_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 106,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 118,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245s/sabiRelease245S.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"scope\": \"245S_read_only_custom_domain_mapping_and_dns_plan_no_mapping_create_no_dns_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 184,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 197,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245t/sabiRelease245T.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 8,
                "preview": "  \"ownerApprovalExactPhraseAccepted\": \"I approve RELEASE-245T create Cloud Run domain mapping for sabiai.app to service sabi-official-site in project sabi-official-prod region europe-west1 only, no DNS mutation, no SMS, no Firebase call, no Google Pay Billing,"
              },
              {
                "line": 9,
                "preview": "  \"scope\": \"245T_create_cloud_run_domain_mapping_for_sabiai_app_only_no_dns_mutation_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 200,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 212,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245t-fix1/sabiRelease245TFix1.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 13,
                "preview": "  \"scope\": \"245T_FIX1_create_cloud_run_beta_domain_mapping_for_sabiai_app_only_no_dns_mutation_no_sms_no_firebase_no_google_pay_billing_no_wallet_payment_payout\","
              },
              {
                "line": 205,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 217,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245u/sabiRelease245U.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 146,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 154,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              }
            ]
          },
          {
            "file": "src/modules/release/245u-fix1/sabiRelease245UFix1.ts",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 184,
                "preview": "    \"firebaseCallNow\": 0,"
              },
              {
                "line": 192,
                "preview": "    \"noFirebaseApiCallNow\": true,"
              },
              {
                "line": 201,
                "preview": "    \"next_sms_firebase_phone_auth_requires_separate_exact_owner_approval\""
              },
              {
                "line": 203,
                "preview": "  \"nextStep\": \"246A_SMS_Firebase_Phone_Auth_preflight_after_official_domain_live\""
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-asset-policy-final-handoff-204b/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 86,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-asset-policy-readiness-204a/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 85,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-catalog-media-admin-final-handoff-203b/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 77,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-catalog-media-admin-readiness-203a/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 77,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-live-provider-binding-approval-200a/streamGiftLedgerControlledLiveProviderBindingApproval200A.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 56,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-dry-run-200f/streamGiftLedgerControlledProviderBindingActivationDryRun200F.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 88,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-approval-200g/streamGiftLedgerControlledProviderBindingActivationExecutionApproval200G.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 76,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-authorization-200i/streamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 79,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-final-gate-200j/streamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 76,
                "preview": "  \"secret\", \"secretValue\", \"rawSecret\", \"apiKey\", \"privateKey\", \"clientSecret\", \"providerSecret\", \"providerToken\", \"accessToken\", \"refreshToken\", \"password\", \"credential\", \"token\", \"authorizationHeader\", \"providerReference\", \"providerResponse\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-final-handoff-200k/streamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 77,
                "preview": "  \"secret\", \"secretValue\", \"rawSecret\", \"apiKey\", \"privateKey\", \"clientSecret\", \"providerSecret\", \"providerToken\", \"accessToken\", \"refreshToken\", \"password\", \"credential\", \"token\", \"authorizationHeader\", \"providerReference\", \"providerResponse\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-execution-preflight-200h/streamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 77,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-controlled-provider-binding-activation-request-200d/streamGiftLedgerControlledProviderBindingActivationRequest200D.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 65,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-live-provider-binding-dry-run-200c/streamGiftLedgerLiveProviderBindingDryRun200C.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 63,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-payment-authorization-adapter-199c/streamGiftLedgerPaymentAuthorizationAdapter199C.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 59,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-post-closure-final-handoff-201b/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 60,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-post-closure-readiness-201a/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 60,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-provider-config-readiness-199b/streamGiftLedgerProviderConfigReadiness199B.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 53,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-provider-reference-labels-verification-200b/streamGiftLedgerProviderReferenceLabelsVerification200B.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 84,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-provider-runtime-readiness-guard-200e/streamGiftLedgerProviderRuntimeReadinessGuard200E.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 68,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-provider-visibility-202a/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 71,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-provider-visibility-final-handoff-202b/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 68,
                "preview": "const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;"
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-real-payment-authorization-adapter-199d/streamGiftLedgerRealPaymentAuthorizationAdapter199D.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 61,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/stream/foundation/gift-ledger-real-provider-binding-approval-199a/streamGiftLedgerRealProviderBindingApproval199A.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 50,
                "preview": "  \"apiKey\","
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-readiness-preflight-039p/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 14,
                "preview": "    apiKeyValueProvidedToThisStage: false,"
              },
              {
                "line": 15,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              },
              {
                "line": 16,
                "preview": "    apiKeyStorageWritePerformed: false,"
              },
              {
                "line": 45,
                "preview": "    apiKeyReadinessPreflightReady: true,"
              },
              {
                "line": 47,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              },
              {
                "line": 76,
                "preview": "    apiKeyReadinessPreflightReady: true,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-readiness-preflight-039p/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 3,
                "preview": "  apiKeyValueProvidedToThisStage: false;"
              },
              {
                "line": 4,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              },
              {
                "line": 5,
                "preview": "  apiKeyStorageWritePerformed: false;"
              },
              {
                "line": 36,
                "preview": "  apiKeyReadinessPreflightReady: true;"
              },
              {
                "line": 61,
                "preview": "  apiKeyReadinessPreflightReady: true;"
              },
              {
                "line": 63,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-binding-preflight-039t/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-binding-preflight-039t/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-intake-039q/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 21,
                "preview": "    apiKeyValueReadOrPrinted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-intake-039q/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "  apiKeyValueReadOrPrinted: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-presence-read-039s/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 19,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-presence-read-039s/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 15,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-shape-validation-039r/runtime-public-alias-routes-fix3.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 35,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/api-key-secret-reference-shape-validation-039r/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "      apiKeySecretReferenceShapeValidation: 'locked',"
              },
              {
                "line": 28,
                "preview": "      apiKeyValueAccepted: 'blocked',"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/db-production-apply-gate-040v/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/db-production-apply-gate-040v/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040VReadiness { stage: string; ready: boolean; dbProductionApplyGate: 'controlled-db-production-apply-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-no-new-m"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/full-production-e2e-closeout-040z/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 10,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/full-production-e2e-closeout-040z/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 1,
                "preview": "export interface Taxi040ZReadiness { stage: string; ready: boolean; finalEightStepClosure: '8_of_8_after_green'; fullProductionE2ECloseout: 'verified-controlled-final-e2e-closeout'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print';"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/main-wallet-ledger-live-gate-040w/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/main-wallet-ledger-live-gate-040w/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040WReadiness { stage: string; ready: boolean; mainWalletLedgerLiveGate: 'controlled-main-wallet-ledger-live-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-n"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/payment-execution-controlled-smoke-040x/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/payment-execution-controlled-smoke-040x/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040XReadiness { stage: string; ready: boolean; paymentExecutionControlledSmoke: 'controlled-payment-execution-smoke-no-payout'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshak"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/payout-settlement-gate-040y/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/payout-settlement-gate-040y/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040YReadiness { stage: string; ready: boolean; payoutSettlementGate: 'controlled-payout-settlement-gate'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'previous-handshake-verified-no-new-mone"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-config-preflight-039u/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 11,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-config-preflight-039u/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-approval-request-039z/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-approval-request-039z/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi039ZReadiness { stage: string; ready: boolean; providerBindingExecutionApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fal"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-evidence-locked-gate-040b/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-evidence-locked-gate-040b/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040BReadiness { stage: string; ready: boolean; providerBindingExecutionEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: "
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-final-evidence-owner-approval-locked-040d/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-final-evidence-owner-approval-locked-040d/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040DReadiness { stage: string; ready: boolean; providerBindingExecutionFinalEvidenceOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; m"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-final-owner-approval-locked-040c/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-final-owner-approval-locked-040c/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040CReadiness { stage: string; ready: boolean; providerBindingExecutionFinalOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-locked-gate-040a/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-execution-locked-gate-040a/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040AReadiness { stage: string; ready: boolean; providerBindingExecutionLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; p"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-final-evidence-gate-039y/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-final-evidence-gate-039y/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi039YReadiness { stage: string; ready: boolean; providerBindingFinalEvidenceGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; pay"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-final-gate-039x/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 11,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-final-gate-039x/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-handshake-040u/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-binding-handshake-040u/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040UReadiness { stage: string; ready: boolean; providerBindingHandshake: 'controlled-handshake-no-money'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: 'handshake-no-money-controlled'; dbWrite"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-config-final-evidence-preflight-039w/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 11,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-config-final-evidence-preflight-039w/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-config-final-preflight-039v/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 11,
                "preview": "    apiKeyValueAcceptedByThisStage: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-config-final-preflight-039v/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 7,
                "preview": "  apiKeyValueAcceptedByThisStage: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-approval-request-040e/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-approval-request-040e/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040EReadiness { stage: string; ready: boolean; providerSecretValueAccessApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fa"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-controlled-read-040t/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-controlled-read-040t/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040TReadiness { stage: string; ready: boolean; providerSecretValueAccessControlledRead: 'controlled'; apiKeyValueAccepted: false; envRead: false; secretRead: 'controlled-no-print'; providerCall: false; dbWrite: false; walletMutation: false"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-evidence-approval-request-040f/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-evidence-approval-request-040f/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040FReadiness { stage: string; ready: boolean; providerSecretValueAccessEvidenceApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-approval-request-040j/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-approval-request-040j/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040JReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMov"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-approval-request-040k/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-approval-request-040k/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040KReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionEvidenceApprovalRequest: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; "
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-locked-gate-040m/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-evidence-locked-gate-040m/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040MReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; money"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-closeout-040r/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-closeout-040r/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040RReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalCloseout: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovem"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-locked-gate-040o/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-locked-gate-040o/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040OReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; "
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-owner-approval-locked-040q/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-evidence-owner-approval-locked-040q/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040QReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalEvidenceOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-locked-gate-040n/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-locked-gate-040n/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040NReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMov"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-owner-approval-locked-040p/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-final-owner-approval-locked-040p/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040PReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionFinalOwnerApprovalLocked: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false;"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-locked-gate-040l/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-execution-locked-gate-040l/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040LReadiness { stage: string; ready: boolean; providerSecretValueAccessExecutionLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-final-evidence-locked-gate-040i/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-final-evidence-locked-gate-040i/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040IReadiness { stage: string; ready: boolean; providerSecretValueAccessFinalEvidenceLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMove"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-final-locked-gate-040h/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-final-locked-gate-040h/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040HReadiness { stage: string; ready: boolean; providerSecretValueAccessFinalLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: fa"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-locked-gate-040g/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-locked-gate-040g/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040GReadiness { stage: string; ready: boolean; providerSecretValueAccessLockedGate: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyMovement: false; "
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-owner-filled-reference-intake-040s/service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 9,
                "preview": "    apiKeyValueAccepted: false,"
              }
            ]
          },
          {
            "file": "src/modules/taxi/foundation/provider-secret-value-access-owner-filled-reference-intake-040s/types.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 2,
                "preview": "export interface Taxi040SReadiness { stage: string; ready: boolean; providerSecretValueAccessOwnerFilledReferenceIntake: 'locked'; apiKeyValueAccepted: false; envRead: false; secretRead: false; providerCall: false; dbWrite: false; walletMutation: false; moneyM"
              }
            ]
          },
          {
            "file": "src/modules/wallet/application/provider/wallet-provider-config.service.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 136,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 164,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 192,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 227,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 251,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 300,
                "preview": "      \"apiKeyVaultRef\","
              },
              {
                "line": 322,
                "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"priceFeedPolicy\"],"
              },
              {
                "line": 343,
                "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"verificationPolicy\"],"
              },
              {
                "line": 362,
                "preview": "    requiredAdminFields: [\"providerId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"screeningPolicy\"],"
              }
            ]
          },
          {
            "file": "../superapp-mobile/src/modules/home/programs/programFoundationRegistry.ts",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 319,
                "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
              }
            ]
          },
          {
            "file": "../superapp-mobile/src/modules/qr/admin/qrApiAdminRegistry.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
              },
              {
                "line": 33,
                "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
              },
              {
                "line": 44,
                "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
              }
            ]
          },
          {
            "file": "../superapp-mobile/android/app/google-services.json",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "    \"storage_bucket\": \"sabi-superapp.firebasestorage.app\""
              }
            ]
          },
          {
            "file": "../superapp-mobile/google-services.json",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 5,
                "preview": "    \"storage_bucket\": \"sabi-superapp.firebasestorage.app\""
              }
            ]
          },
          {
            "file": "../superapp-mobile/modules/sabi-call-native/plugin/withSabiCallNative.js",
            "matched": [
              "firebase",
              "Firebase"
            ],
            "snippets": [
              {
                "line": 27,
                "preview": "    if (!app.service.some((s) => s.$?.[\"android:name\"] === \".calls.SabiFirebaseMessagingService\")) {"
              },
              {
                "line": 29,
                "preview": "        $: { \"android:name\": \".calls.SabiFirebaseMessagingService\", \"android:exported\": \"false\" },"
              },
              {
                "line": 30,
                "preview": "        \"intent-filter\": [{ action: [{ $: { \"android:name\": \"com.google.firebase.MESSAGING_EVENT\" } }] }],"
              }
            ]
          },
          {
            "file": "../superapp-mobile/src/modules/home/programs/programFoundationRegistry.ts",
            "matched": [
              "firebase"
            ],
            "snippets": [
              {
                "line": 319,
                "preview": "    requiredProviders: [\"firebase_push_or_native_push_before_release\"],"
              }
            ]
          },
          {
            "file": "../superapp-mobile/src/modules/qr/admin/qrApiAdminRegistry.ts",
            "matched": [
              "apiKey"
            ],
            "snippets": [
              {
                "line": 22,
                "preview": "    requiredAdminFields: [\"issuerProgramId\", \"apiKeyVaultRef\", \"webhookSecretVaultRef\", \"supportedCountries\", \"kycPolicy\"],"
              },
              {
                "line": 33,
                "preview": "    requiredAdminFields: [\"gatewayId\", \"merchantId\", \"apiKeyVaultRef\", \"tokenizationEnabled\"],"
              },
              {
                "line": 44,
                "preview": "    requiredAdminFields: [\"providerName\", \"apiKeyVaultRef\", \"chainPolicy\", \"amlPolicy\"],"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "246a_no_live_sms_sent",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_firebase_api_call_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_google_pay_or_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246a_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "artifacts": {}
} as unknown as SabiRelease246AReport;
