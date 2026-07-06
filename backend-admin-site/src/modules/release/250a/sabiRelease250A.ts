import type { SabiRelease250AReport } from './sabiRelease250A.types';

export const sabiRelease250AReport: SabiRelease250AReport = {
  "version": "SABI-RELEASE-250A-INFO-PUBLIC-CONTACT-EMAIL-READINESS-PROOF",
  "status": "awaiting_manual_info_alias_route_proof",
  "createdAt": "2026-06-23T16:49:00.599Z",
  "approval": "I approve RELEASE-250A info@sabiai.app public contact mailbox or alias readiness proof, create or confirm info@sabiai.app routes to admin@sabiai.app in Google Workspace manually, then run read-only/manual proof only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "mode": "prepare",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "publicContactEmail": "info@sabiai.app",
  "deliveryMailbox": "admin@sabiai.app",
  "test": {
    "testId": "SABI-250A-INFO-20260623-01",
    "fromMasked": "ad***@sabiai.app",
    "toMasked": "in***@sabiai.app",
    "deliveryMailboxMasked": "ad***@sabiai.app",
    "subject": "SABI 250A info contact proof SABI-250A-INFO-20260623-01",
    "bodyPath": ".data/release/250a/250a-info-test-email-body.txt",
    "packagePath": ".data/release/250a/250a-info-test-package.json",
    "instructionsPath": ".data/release/250a/250a-info-manual-send-receive-instructions.md",
    "proofTemplatePath": ".data/release/250a/250a-info-proof-template.json",
    "proofPath": null
  },
  "preconditions": {
    "bankReady249CExists": true,
    "bankReady249CPassed": true,
    "bankReady249CReadiness": true,
    "emailProof249BExists": true,
    "emailProof249BPassed": true,
    "officialDomainEmailLiveProofReady": true
  },
  "ownerProof": null,
  "readiness": {
    "bankReady249CReadiness": 100,
    "officialDomainEmailLiveBaseReadiness": 100,
    "infoAliasOrRouteScopeReadiness": 100,
    "officialMailboxScopeReadiness": 100,
    "testPackageReadiness": 100,
    "manualInstructionsReadiness": 100,
    "infoAliasOrRouteOwnerConfirmedReadiness": 0,
    "infoEmailSentProofReadiness": 0,
    "infoEmailReceivedProofReadiness": 0,
    "publicSiteContactEmailReadiness": 0,
    "release250AReadiness": 0,
    "dnsMutationNow": 0,
    "cloudRunMutationNow": 0,
    "firebaseUserDeletionNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0,
    "automaticEmailSendNow": 0
  },
  "safety": {
    "noDnsMutationNow": true,
    "noCloudRunMutationNow": true,
    "noFirebaseUserDeletionNow": true,
    "noGooglePayBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "automaticEmailSendNow": false,
    "manualGoogleWorkspaceAliasOrGroupRequired": true
  },
  "checksPassed": 20,
  "checksTotal": 21,
  "checks": [
    {
      "name": "250a_249c_bank_ready_report_exists",
      "passed": true,
      "details": {
        "path": ".data/release/249c/249c-report.json"
      }
    },
    {
      "name": "250a_249c_bank_ready_passed",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_249c_bank_ready_readiness_100",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_249b_email_live_proof_exists",
      "passed": true,
      "details": {
        "path": ".data/release/249b/249b-report.json"
      }
    },
    {
      "name": "250a_249b_email_live_proof_passed",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_official_domain_email_live_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_from_mailbox_domain_official",
      "passed": true,
      "details": {
        "fromMasked": "ad***@sabiai.app"
      }
    },
    {
      "name": "250a_public_info_address_expected",
      "passed": true,
      "details": {
        "toMasked": "in***@sabiai.app"
      }
    },
    {
      "name": "250a_delivery_mailbox_admin_expected",
      "passed": true,
      "details": {
        "deliveryMailboxMasked": "ad***@sabiai.app"
      }
    },
    {
      "name": "250a_test_package_created",
      "passed": true,
      "details": {
        "packagePath": ".data/release/250a/250a-info-test-package.json"
      }
    },
    {
      "name": "250a_manual_instructions_created",
      "passed": true,
      "details": {
        "instructionsPath": ".data/release/250a/250a-info-manual-send-receive-instructions.md"
      }
    },
    {
      "name": "250a_owner_recorded_info_route_sent_received_proof",
      "passed": false,
      "details": {}
    },
    {
      "name": "250a_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250a_no_automatic_email_send_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "250a_owner_recorded_info_route_sent_received_proof"
  ],
  "warnings": [
    "This script does not create Google Workspace alias/group automatically.",
    "Manual info@sabiai.app alias/group route and live receipt proof are still required.",
    "Do not publish info@sabiai.app on the public site until 250A is passed."
  ],
  "nextStep": "create_or_confirm_info_alias_route_then_send_manual_proof_email",
  "exactCommandForRecordingProof": "node .\\tools\\release-250a-info-public-contact-proof.js --record-proof --test-id SABI-250A-INFO-20260623-01 --from admin@sabiai.app --to info@sabiai.app --delivery-mailbox admin@sabiai.app --subject \"SABI 250A info contact proof SABI-250A-INFO-20260623-01\" --sent-at \"YYYY-MM-DDTHH:mm:ssZ\" --received-at \"YYYY-MM-DDTHH:mm:ssZ\" --message-id \"MASKED_OR_HASHED_MESSAGE_ID\" --owner-confirmed-route-exists true --owner-confirmed-sent true --owner-confirmed-received true",
  "artifacts": {}
} as unknown as SabiRelease250AReport;
