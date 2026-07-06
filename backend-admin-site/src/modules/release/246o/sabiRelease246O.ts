import type { SabiRelease246OReport } from './sabiRelease246O.types';

export const sabiRelease246OReport: SabiRelease246OReport = {
  "version": "SABI-RELEASE-246O-REMOVE-TEMP-FIREBASE-HOSTING-SMS-TEST-PAGE",
  "status": "passed",
  "createdAt": "2026-06-23T08:06:18.603Z",
  "approval": "I approve RELEASE-246O remove temporary Firebase Hosting Phone Auth SMS test page from project sabi-official-prod-37629 and replace it with a closed-test placeholder only, no official sabiai.app DNS mutation, no Cloud Run official site mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "hostingSiteId": "sabi-official-prod-37629",
  "hostingUrl": "https://sabi-official-prod-37629.web.app/",
  "scope": "remove_temporary_firebase_hosting_phone_auth_sms_test_page_replace_closed_placeholder",
  "smsStatus": {
    "liveSmsCloseoutFound": true,
    "liveSmsReceived": true,
    "smsCodeSharedInChat": false,
    "codeVerificationReportFound": true,
    "codeVerificationReadiness": 0,
    "codeVerificationPostponed": true,
    "sources": [
      ".data/release/246m-fix4-closeout/246m-fix4-closeout-report.json",
      ".data/release/246n/246n-report.json"
    ]
  },
  "deploy": {
    "ok": true,
    "status": 0,
    "stdout": "\u001b[1m\u001b[37m===\u001b[39m Deploying to 'sabi-official-prod-37629'...\u001b[22m\r\n\r\n\u001b[36m\u001b[1mi \u001b[22m\u001b[39m deploying \u001b[1mhosting\u001b[22m\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m beginning deploy...\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m found 2 files in \u001b[1mpublic\u001b[22m\r\n\u001b[36m\u001b[1mi  hosting:\u001b[22m\u001b[39m uploading new files [0/1] (\u001b[1m\u001b[32m0%\u001b[39m\u001b[22m)\r\n\u001b[36m\u001b[1mi  hosting:\u001b[22m\u001b[39m upload complete\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m file upload complete\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m finalizing version...\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m version finalized\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m releasing new version...\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m release complete\r\n\r\n\u001b[32m\u001b[1m+ \u001b[22m\u001b[39m \u001b[1m\u001b[4mDeploy complete!\u001b[24m\u001b[22m\r\n\r\n\u001b[1mProject Console:\u001b[22m https://console.firebase.google.com/project/sabi-official-prod-37629/overview\r\n\u001b[1mHosting URL:\u001b[22m https://sabi-official-prod-37629.web.app",
    "stderr": ""
  },
  "hostedRoot": {
    "ok": true,
    "status": 0,
    "stdoutPreview": "STATUS=200\r\n<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <title>Sabi Firebase Hosting Closed Test</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <meta name=\"robots\" content=\"noindex,nofollow,noarchive\" />\n  <style>\n    body {\n      margin: 0;\n      min-height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: #07111f;\n      color: #f5f7fb;\n      font-family: Arial, sans-serif;\n    }\n    main {\n      width: min(760px, calc(100vw - 32px));\n      padding: 34px;\n      border-radius: 26px;\n      border: 1px solid rgba(255,255,255,0.14);\n      background: rgba(255,255,255,0.06);\n      box-shadow: 0 24px 80px rgba(0,0,0,0.35);\n    }\n    h1 { margin: 0 0 12px; font-size: 28px; }\n    p { line-height: 1.55; color: #cfd8e8; }\n    .badge {\n      display: inline-block;\n      margin-top: 14px;\n      padding: 10px 14px;\n      border-radius: 999px;\n      background: rgba(243,200,115,0.18);\n      color: #f3c873;\n      font-weight: 800;\n    }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>Sabi closed technical test area</h1>\n    <p>This Firebase Hosting domain is used only for controlled internal technical tests for SABI AI TECHNOLOGIES LIMITED.</p>\n    <p>The temporary live SMS test page has been removed. No public product, wallet, payment, payout, or official website content is served here.</p>\n    <p>The official public website remains available at sabiai.app.</p>\n    <div class=\"badge\">Closed test placeholder</div>\n  </main>\n</body>\n</html>",
    "stderr": ""
  },
  "officialSite": {
    "ok": true,
    "status": 0,
    "stdout": "STATUS=200",
    "stderr": ""
  },
  "readiness": {
    "firebaseCliReadiness": 100,
    "firebaseProjectVisibleReadiness": 100,
    "previousLiveSmsCloseoutReadiness": 100,
    "codeVerificationPostponedSafeReadiness": 100,
    "closedPlaceholderLocalReadiness": 100,
    "firebaseJsonReadiness": 100,
    "firebaseHostingDeployReadiness": 100,
    "closedPlaceholderServedReadiness": 100,
    "temporarySmsTestPageRemovedReadiness": 100,
    "officialWebsiteReadiness": 100,
    "release246OReadiness": 100,
    "officialSabiaiAppDnsMutationNow": 0,
    "cloudRunOfficialSiteMutationNow": 0,
    "firebaseUserDeletionNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "ownerApprovalCaptured": true,
    "temporarySmsTestPageRemoved": true,
    "closedPlaceholderOnly": true,
    "officialSabiaiAppDnsUntouched": true,
    "cloudRunOfficialSiteUntouched": true,
    "noFirebaseUserDeletionNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true
  },
  "checksPassed": 18,
  "checksTotal": 18,
  "checks": [
    {
      "name": "246o_firebase_cli_available",
      "passed": true,
      "details": {
        "name": "firebase_cli_version",
        "command": "firebase --version 2>$null",
        "status": 0,
        "stdout": "15.22.1",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246o_firebase_project_visible",
      "passed": true,
      "details": {
        "firebaseProjectId": "sabi-official-prod-37629"
      }
    },
    {
      "name": "246o_previous_live_sms_closeout_ready",
      "passed": true,
      "details": {
        "liveSmsCloseoutFound": true,
        "liveSmsReceived": true,
        "smsCodeSharedInChat": false,
        "codeVerificationReportFound": true,
        "codeVerificationReadiness": 0,
        "codeVerificationPostponed": true,
        "sources": [
          ".data/release/246m-fix4-closeout/246m-fix4-closeout-report.json",
          ".data/release/246n/246n-report.json"
        ]
      }
    },
    {
      "name": "246o_246n_code_verification_postponed_safe",
      "passed": true,
      "details": {
        "liveSmsCloseoutFound": true,
        "liveSmsReceived": true,
        "smsCodeSharedInChat": false,
        "codeVerificationReportFound": true,
        "codeVerificationReadiness": 0,
        "codeVerificationPostponed": true,
        "sources": [
          ".data/release/246m-fix4-closeout/246m-fix4-closeout-report.json",
          ".data/release/246n/246n-report.json"
        ]
      }
    },
    {
      "name": "246o_closed_placeholder_local_file_created",
      "passed": true,
      "details": {
        "indexPath": ".data/release/246o/public/index.html"
      }
    },
    {
      "name": "246o_firebase_json_created",
      "passed": true,
      "details": {
        "firebaseJsonPath": ".data/release/246o/firebase.json"
      }
    },
    {
      "name": "246o_firebase_hosting_deploy_passed",
      "passed": true,
      "details": {
        "name": "firebase_hosting_deploy_closed_placeholder",
        "command": "firebase deploy --only hosting --project=sabi-official-prod-37629 --non-interactive",
        "status": 0,
        "stdout": "\u001b[1m\u001b[37m===\u001b[39m Deploying to 'sabi-official-prod-37629'...\u001b[22m\r\n\r\n\u001b[36m\u001b[1mi \u001b[22m\u001b[39m deploying \u001b[1mhosting\u001b[22m\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m beginning deploy...\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m found 2 files in \u001b[1mpublic\u001b[22m\r\n\u001b[36m\u001b[1mi  hosting:\u001b[22m\u001b[39m uploading new files [0/1] (\u001b[1m\u001b[32m0%\u001b[39m\u001b[22m)\r\n\u001b[36m\u001b[1mi  hosting:\u001b[22m\u001b[39m upload complete\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m file upload complete\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m finalizing version...\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m version finalized\r\n\u001b[36m\u001b[1mi  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m releasing new version...\r\n\u001b[32m\u001b[1m+  hosting[sabi-official-prod-37629]:\u001b[22m\u001b[39m release complete\r\n\r\n\u001b[32m\u001b[1m+ \u001b[22m\u001b[39m \u001b[1m\u001b[4mDeploy complete!\u001b[24m\u001b[22m\r\n\r\n\u001b[1mProject Console:\u001b[22m https://console.firebase.google.com/project/sabi-official-prod-37629/overview\r\n\u001b[1mHosting URL:\u001b[22m https://sabi-official-prod-37629.web.app",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246o_closed_placeholder_served_on_web_app",
      "passed": true,
      "details": {
        "name": "hosted_web_app_root_readonly_after_cleanup",
        "command": "$u=\"https://sabi-official-prod-37629.web.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output $r.Content; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\n<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <title>Sabi Firebase Hosting Closed Test</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <meta name=\"robots\" content=\"noindex,nofollow,noarchive\" />\n  <style>\n    body {\n      margin: 0;\n      min-height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: #07111f;\n      color: #f5f7fb;\n      font-family: Arial, sans-serif;\n    }\n    main {\n      width: min(760px, calc(100vw - 32px));\n      padding: 34px;\n      border-radius: 26px;\n      border: 1px solid rgba(255,255,255,0.14);\n      background: rgba(255,255,255,0.06);\n      box-shadow: 0 24px 80px rgba(0,0,0,0.35);\n    }\n    h1 { margin: 0 0 12px; font-size: 28px; }\n    p { line-height: 1.55; color: #cfd8e8; }\n    .badge {\n      display: inline-block;\n      margin-top: 14px;\n      padding: 10px 14px;\n      border-radius: 999px;\n      background: rgba(243,200,115,0.18);\n      color: #f3c873;\n      font-weight: 800;\n    }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>Sabi closed technical test area</h1>\n    <p>This Firebase Hosting domain is used only for controlled internal technical tests for SABI AI TECHNOLOGIES LIMITED.</p>\n    <p>The temporary live SMS test page has been removed. No public product, wallet, payment, payout, or official website content is served here.</p>\n    <p>The official public website remains available at sabiai.app.</p>\n    <div class=\"badge\">Closed test placeholder</div>\n  </main>\n</body>\n</html>",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246o_temporary_sms_test_page_removed_from_web_app",
      "passed": true,
      "details": {
        "name": "hosted_web_app_root_readonly_after_cleanup",
        "command": "$u=\"https://sabi-official-prod-37629.web.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output $r.Content; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\n<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <title>Sabi Firebase Hosting Closed Test</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <meta name=\"robots\" content=\"noindex,nofollow,noarchive\" />\n  <style>\n    body {\n      margin: 0;\n      min-height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: #07111f;\n      color: #f5f7fb;\n      font-family: Arial, sans-serif;\n    }\n    main {\n      width: min(760px, calc(100vw - 32px));\n      padding: 34px;\n      border-radius: 26px;\n      border: 1px solid rgba(255,255,255,0.14);\n      background: rgba(255,255,255,0.06);\n      box-shadow: 0 24px 80px rgba(0,0,0,0.35);\n    }\n    h1 { margin: 0 0 12px; font-size: 28px; }\n    p { line-height: 1.55; color: #cfd8e8; }\n    .badge {\n      display: inline-block;\n      margin-top: 14px;\n      padding: 10px 14px;\n      border-radius: 999px;\n      background: rgba(243,200,115,0.18);\n      color: #f3c873;\n      font-weight: 800;\n    }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>Sabi closed technical test area</h1>\n    <p>This Firebase Hosting domain is used only for controlled internal technical tests for SABI AI TECHNOLOGIES LIMITED.</p>\n    <p>The temporary live SMS test page has been removed. No public product, wallet, payment, payout, or official website content is served here.</p>\n    <p>The official public website remains available at sabiai.app.</p>\n    <div class=\"badge\">Closed test placeholder</div>\n  </main>\n</body>\n</html>",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246o_official_sabiai_app_site_still_live",
      "passed": true,
      "details": {
        "name": "official_sabiai_app_site_readonly_no_mutation",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246o_no_official_sabiai_app_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_cloud_run_official_site_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246o_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "firebase_hosting_domain_kept_as_closed_internal_test_placeholder",
    "real_mobile_phone_auth_code_verification_postponed_to_later_mobile_flow"
  ],
  "nextStep": "246P_bank_readiness_sms_firebase_final_summary_and_continue_official_email_server_ai_plan",
  "artifacts": {}
} as unknown as SabiRelease246OReport;
