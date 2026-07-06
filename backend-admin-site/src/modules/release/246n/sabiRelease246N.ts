import type { SabiRelease246NReport } from './sabiRelease246N.types';

export const sabiRelease246NReport: SabiRelease246NReport = {
  "version": "SABI-RELEASE-246N-LOCAL-FIREBASE-PHONE-AUTH-CODE-VERIFY-SIGNIN-MASKED",
  "status": "failed",
  "createdAt": "2026-06-23T07:50:55.555Z",
  "approval": "I confirm RELEASE-246N SMS code was received on my test phone and approve local Firebase Phone Auth code verification/sign-in flow only, code entered locally in browser and never shared in chat, I accept that Firebase may create or sign in a test user for this phone number, no Firebase user deletion, no official sabiai.app DNS mutation, no Cloud Run official site mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "firebaseProjectId": "sabi-official-prod-37629",
  "officialSiteProjectId": "sabi-official-prod",
  "scope": "local_browser_sms_code_verification_signin_flow_masked_no_code_in_chat",
  "smsCloseout": {
    "ok": true,
    "source": ".data/release/246m-fix4-closeout/246m-fix4-closeout-report.json",
    "liveSmsReceivedOrSent": true,
    "smsCodeSharedInChat": false,
    "phoneMasked": "+998****6767"
  },
  "verification": {
    "collectorStarted": true,
    "snippetPath": ".data/release/246n/246n-browser-console-snippet.txt",
    "resultReceived": false,
    "success": false,
    "timeout": true,
    "terminalEvent": null,
    "eventCount": 0,
    "eventsPreview": []
  },
  "observations": {
    "officialSite": {
      "name": "official_site_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    }
  },
  "readiness": {
    "previousLiveSmsReceivedCloseoutReadiness": 100,
    "officialWebsiteReadiness": 100,
    "collectorReadiness": 100,
    "browserConsoleSnippetReadiness": 100,
    "browserVerificationResultReadiness": 0,
    "codeVerificationSigninReadiness": 0,
    "noSmsCodePrintReadiness": 100,
    "release246NReadiness": 0,
    "firebaseUserSignInOrCreateNow": 0,
    "firebaseUserDeletionNow": 0,
    "officialSabiaiAppDnsMutationNow": 0,
    "cloudRunOfficialSiteMutationNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0
  },
  "safety": {
    "smsCodeEnteredLocallyOnly": true,
    "smsCodeNotSharedInChat": true,
    "smsCodeNotPrintedInReport": true,
    "fullPhoneNumberNotPrinted": true,
    "firebaseUserDeletionNow": false,
    "officialSabiaiAppDnsUntouched": true,
    "cloudRunOfficialSiteUntouched": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true
  },
  "checksPassed": 13,
  "checksTotal": 15,
  "checks": [
    {
      "name": "246n_previous_live_sms_received_closeout_ready",
      "passed": true,
      "details": {
        "ok": true,
        "source": ".data/release/246m-fix4-closeout/246m-fix4-closeout-report.json",
        "liveSmsReceivedOrSent": true,
        "smsCodeSharedInChat": false,
        "phoneMasked": "+998****6767"
      }
    },
    {
      "name": "246n_official_site_still_live_readonly",
      "passed": true,
      "details": {
        "name": "official_site_readonly",
        "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "STATUS=200",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "246n_collector_started",
      "passed": true,
      "details": {
        "collectorUrl": "http://127.0.0.1:45151/event"
      }
    },
    {
      "name": "246n_browser_console_snippet_created",
      "passed": true,
      "details": {
        "snippetPath": ".data/release/246n/246n-browser-console-snippet.txt"
      }
    },
    {
      "name": "246n_browser_verification_result_received",
      "passed": false,
      "details": {
        "collectorStarted": true,
        "snippetPath": ".data/release/246n/246n-browser-console-snippet.txt",
        "resultReceived": false,
        "success": false,
        "timeout": true,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246n_code_verification_success",
      "passed": false,
      "details": {
        "collectorStarted": true,
        "snippetPath": ".data/release/246n/246n-browser-console-snippet.txt",
        "resultReceived": false,
        "success": false,
        "timeout": true,
        "terminalEvent": null,
        "eventCount": 0,
        "eventsPreview": []
      }
    },
    {
      "name": "246n_sms_code_not_printed_in_report",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_official_sabiai_app_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_cloud_run_official_site_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "246n_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "246n_browser_verification_result_received",
    "246n_code_verification_success"
  ],
  "warnings": [
    "code_verification_not_confirmed",
    "collector_timed_out_waiting_for_browser_console_result",
    "temporary_firebase_hosting_test_page_should_be_removed_after_auth_closure"
  ],
  "nextStep": "246N_FIX1_retry_code_verification_or_request_new_sms_if_confirmation_result_lost",
  "exactApprovalForNext": "I approve RELEASE-246N-FIX1 retry Firebase Phone Auth code verification locally or request a new SMS if the old confirmationResult is lost, code entered locally and never shared in chat, no Firebase user deletion, no official sabiai.app DNS mutation, no Cloud Run official site mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease246NReport;
