import type { SabiRelease249CReport } from './sabiRelease249C.types';

export const sabiRelease249CReport: SabiRelease249CReport = {
  "version": "SABI-RELEASE-249C-BANK-READY-SITE-EMAIL-PROOF-SUMMARY",
  "status": "passed",
  "createdAt": "2026-06-23T16:40:43.437Z",
  "company": {
    "name": "SABI AI TECHNOLOGIES LIMITED",
    "registeredOffice": "128 City Road, London, England, EC1V 2NX, United Kingdom",
    "officialDomain": "sabiai.app",
    "officialSiteUrl": "https://sabiai.app/"
  },
  "projects": {
    "officialSiteProjectId": "sabi-official-prod",
    "firebaseProjectId": "sabi-official-prod-37629"
  },
  "sourceReports": {
    "recheck9": ".data/release/249a-fix4-recheck9/249a-fix4-recheck9-report.json",
    "release249b": ".data/release/249b/249b-report.json",
    "release249bOwnerProof": ".data/release/249b/249b-owner-recorded-proof.json"
  },
  "proofSummary": {
    "officialWebsite": {
      "url": "https://sabiai.app/",
      "readiness": "100%",
      "status": "live"
    },
    "officialEmailDns": {
      "domain": "sabiai.app",
      "authoritativeSpf": "100%",
      "authoritativeDmarc": "100%",
      "authoritativeMx": "100%",
      "authoritativeDkim": "100%",
      "googleDns": "100%",
      "cloudflareDns": "100%",
      "practicalPublicDnsSecurity": "100%",
      "strictAllResolversNote": "Some public resolvers may cache DNS longer; authoritative + Google + Cloudflare readiness is recorded separately."
    },
    "officialEmailLiveProof": {
      "readiness": "100%",
      "fromMasked": "ad***@sabiai.app",
      "toMasked": "ad***@sabiai.app",
      "testId": "SABI-249B-ADMIN-SELF-20260623-01",
      "subject": "SABI 249B official email proof SABI-249B-ADMIN-SELF-20260623-01",
      "sentAtUtc": "2026-06-23T16:35:00Z",
      "receivedAtUtc": "2026-06-23T16:35:00Z",
      "proofMarker": "owner-confirmed-gmail-ui-admin-self-proof-screenshot-21-35"
    }
  },
  "readiness": {
    "officialWebsiteReadiness": 100,
    "officialEmailDnsReadiness": 100,
    "officialEmailLiveProofReadiness": 100,
    "bankReadySiteEmailProofReadiness": 100,
    "release249CReadiness": 100,
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
    "noAutomaticEmailSendNow": true
  },
  "checksPassed": 14,
  "checksTotal": 14,
  "checks": [
    {
      "name": "249c_recheck9_report_exists",
      "passed": true,
      "details": {
        "path": ".data/release/249a-fix4-recheck9/249a-fix4-recheck9-report.json"
      }
    },
    {
      "name": "249c_249b_report_exists",
      "passed": true,
      "details": {
        "path": ".data/release/249b/249b-report.json"
      }
    },
    {
      "name": "249c_249b_owner_proof_exists",
      "passed": true,
      "details": {
        "path": ".data/release/249b/249b-owner-recorded-proof.json"
      }
    },
    {
      "name": "249c_official_site_live_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_authoritative_email_dns_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_google_dns_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_cloudflare_dns_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_practical_public_dns_security_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_practical_email_infrastructure_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_live_email_sent_proof_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_live_email_received_proof_ready",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_249b_passed",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_safety_no_mutations",
      "passed": true,
      "details": {}
    },
    {
      "name": "249c_bank_ready_site_email_proof",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "nextStep": "official_site_and_domain_email_bank_proof_ready_next_server_ai_foundation",
  "artifacts": {}
} as unknown as SabiRelease249CReport;
