import type { SabiRelease250BReport } from './sabiRelease250B.types';

export const sabiRelease250BReport: SabiRelease250BReport = {
  "version": "SABI-RELEASE-250B-PUBLIC-SITE-TEMP-ADMIN-CONTACT-EMAIL-PATCH-DEPLOY",
  "status": "failed",
  "createdAt": "2026-06-23T17:33:49.164Z",
  "approvalFlagRequired": "--i-approve-release-250b-public-site-admin-email-patch-deploy",
  "approvalFlagProvided": true,
  "officialDomain": "sabiai.app",
  "officialEmail": "admin@sabiai.app",
  "officialSiteUrl": "https://sabiai.app/",
  "officialSiteProjectId": "sabi-official-prod",
  "region": "europe-west1",
  "service": "sabi-official-site",
  "scope": "temporary_public_site_contact_email_admin_sabiai_app_patch_and_cloud_run_deploy",
  "siteDir": "site-ui",
  "changedFiles": [
    "site-ui/index.html",
    "site-ui/index-en.html",
    "site-ui/index-en-fix75.html",
    "site-ui/app.js",
    "site-ui/app-en.js",
    "site-ui/styles.css"
  ],
  "backups": [
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__index.html",
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__index-en.html",
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__index-en-fix75.html",
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__app.js",
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__app-en.js",
    ".data/release/250b/backup-before-250b-2026-06-23T17-33-49-022Z/site-ui__styles.css"
  ],
  "deployAttempted": false,
  "buildResult": null,
  "deployResult": null,
  "siteCheck": null,
  "sourceReports": {
    "release249c": ".data/release/249c/249c-report.json",
    "release251a": ".data/release/251a/251a-report.json",
    "release250a": ".data/release/250a/250a-report.json"
  },
  "readiness": {
    "officialWebsiteBaseReadiness": 100,
    "officialDomainEmailBaseReadiness": 100,
    "serverFoundationPreflightReadiness": 100,
    "infoPublicContactReadiness": 0,
    "adminPublicContactPatchLocalReadiness": 0,
    "adminPublicContactDeployReadiness": 0,
    "release250BReadiness": 0,
    "dnsMutationNow": 0,
    "cloudRunMutationNow": 0,
    "firebaseUserDeletionNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0,
    "liveEmailSentNow": 0
  },
  "safety": {
    "noDnsMutationNow": true,
    "cloudRunMutationOnlyForSiteDeploy": false,
    "noFirebaseUserDeletionNow": true,
    "noGooglePayBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noLiveEmailSentNow": true,
    "infoEmailNotPublished": true,
    "temporaryAdminEmailPublished": true
  },
  "checksPassed": 14,
  "checksTotal": 19,
  "checks": [
    {
      "name": "250b_owner_deploy_approval_flag_provided",
      "passed": true,
      "details": {
        "requiredFlag": "--i-approve-release-250b-public-site-admin-email-patch-deploy"
      }
    },
    {
      "name": "250b_site_dir_found",
      "passed": true,
      "details": {
        "siteDir": "site-ui"
      }
    },
    {
      "name": "250b_bank_ready_249c_base",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_251a_foundation_base",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_info_public_contact_still_paused",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_target_files_found",
      "passed": true,
      "details": {
        "targetFiles": [
          "site-ui/index.html",
          "site-ui/index-en.html",
          "site-ui/index-en-fix75.html",
          "site-ui/app.js",
          "site-ui/app-en.js",
          "site-ui/styles.css"
        ]
      }
    },
    {
      "name": "250b_local_admin_email_patch_ready",
      "passed": false,
      "details": {
        "changedFiles": [
          "site-ui/index.html",
          "site-ui/index-en.html",
          "site-ui/index-en-fix75.html",
          "site-ui/app.js",
          "site-ui/app-en.js",
          "site-ui/styles.css"
        ]
      }
    },
    {
      "name": "250b_cloud_build_attempted",
      "passed": false,
      "details": {}
    },
    {
      "name": "250b_cloud_build_passed",
      "passed": false,
      "details": {}
    },
    {
      "name": "250b_cloud_run_deploy_passed",
      "passed": false,
      "details": {}
    },
    {
      "name": "250b_official_site_live_has_admin_email",
      "passed": false,
      "details": {}
    },
    {
      "name": "250b_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_no_live_email_sent_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "250b_local_admin_email_patch_ready",
    "250b_cloud_build_passed",
    "250b_cloud_run_deploy_passed",
    "250b_official_site_live_has_admin_email"
  ],
  "warnings": [
    "admin@sabiai.app is temporary public contact until info@sabiai.app alias/group proof passes.",
    "info@sabiai.app remains paused and must not be shown on the public site.",
    "Cloud Run mutation is limited to official site static deploy only; no DNS, Firebase, DB, Secret Manager, Wallet/payment/payout actions."
  ],
  "nextStep": "fix_250b_site_contact_patch_or_deploy_blockers",
  "exactApprovalForNext": "I approve RELEASE-251B Owner Sabi AI policy and training kernel safe files, local code/artifact only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Secret Manager/env read-write, no DB mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease250BReport;
