import type { SabiRelease245PFix1Report } from './sabiRelease245PFix1.types';

export const sabiRelease245PFix1Report: SabiRelease245PFix1Report = {
  "version": "SABI-RELEASE-245P-FIX1-SITE-PUBLIC-WORDING-AND-COMMAND-REFERENCE-STATIC-ONLY",
  "status": "failed",
  "approvalFlagRequired": "--i-approve-release-245p-fix1-site-public-wording-and-command-reference-static-only",
  "approvalFlagProvided": true,
  "scope": "245P_FIX1_static_only_no_api_enablement_no_deploy_no_dns_no_sms_no_wallet",
  "createdAt": "2026-06-22T23:03:39.718Z",
  "officialDomain": "sabiai.app",
  "companyName": "SABI AI TECHNOLOGIES LIMITED",
  "findings": [
    {
      "file": "site-ui/index.html",
      "line": 551,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 181,
      "text": "<article><b>No donations or investments</b><p>Sabi does not accept donations or investments. The ecological program and public initiatives are funded only from the company’s own allocated funds.</p></article>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 198,
      "text": "<p>Sabi does not accept donations or investments for this program. Ecological projects are funded from the company’s own allocated funds. Before review, each project must have evidence: problem description, location, photos, videos, documents, budget and official confirmation from responsible structures in the implementation country. A transparent tender is announced to implement the selected project.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 212,
      "text": "<p>The company allocates 15% of its own funds to ecological projects. Sabi does not accept donations or investments for this program.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 230,
      "text": "<article><b>Sabi company funds</b><span>The program does not accept donations or investments. Only the company’s own allocated funds are directed to ecology.</span></article>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 321,
      "text": "<article><b>Funding</b><span>amount from Sabi’s own allocated funds, without donations or investments.</span></article>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 550,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 556,
      "text": "<p>Convenience translation: commercial services, prohibition on donations/investments, Sabi AI control, Due Diligence and external provider rules.</p>"
    },
    {
      "file": "site-ui/app-en.js",
      "line": 24,
      "text": "const formContexts = {manufacturers:\"For goods, products, brands, storefronts and supplies in the future Sabi commercial ecosystem.\",taxiAgents:\"For city representatives who want to develop the Sabi taxi area under official cooperation rules.\",marketplace:\"For stores, hotels, supermarkets, service companies and partners of future Sabi areas.\",clients:\"For corporate clients, business enquiries, partnership proposals and long-term cooperation.\",ecoProjects:\"For ecological initiatives from around t"
    }
  ],
  "suspiciousRequestFindings": [
    {
      "file": "site-ui/index.html",
      "line": 551,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 550,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    }
  ],
  "allowedNegativeBoundaryFindings": [
    {
      "file": "site-ui/index.html",
      "line": 551,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 181,
      "text": "<article><b>No donations or investments</b><p>Sabi does not accept donations or investments. The ecological program and public initiatives are funded only from the company’s own allocated funds.</p></article>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 198,
      "text": "<p>Sabi does not accept donations or investments for this program. Ecological projects are funded from the company’s own allocated funds. Before review, each project must have evidence: problem description, location, photos, videos, documents, budget and official confirmation from responsible structures in the implementation country. A transparent tender is announced to implement the selected project.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 212,
      "text": "<p>The company allocates 15% of its own funds to ecological projects. Sabi does not accept donations or investments for this program.</p>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 230,
      "text": "<article><b>Sabi company funds</b><span>The program does not accept donations or investments. Only the company’s own allocated funds are directed to ecology.</span></article>"
    },
    {
      "file": "site-ui/index-en.html",
      "line": 550,
      "text": "<p>Commercial platform rules: no donations, no crowdfunding, no third-party investments, Sabi AI security monitoring, Due Diligence and external provider responsibility.</p>"
    }
  ],
  "correctedPlannedCommandsReferenceOnly": [
    "gcloud config set project sabi-official-prod",
    "gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com serviceusage.googleapis.com",
    "cd C:\\Users\\User\\Desktop\\superapp\\site-ui",
    "gcloud run deploy sabi-official-site --source . --region europe-west1 --allow-unauthenticated",
    "gcloud run services describe sabi-official-site --region europe-west1 --format=\"value(status.url)\""
  ],
  "readiness": {
    "release245PFix1Readiness": 0,
    "previous245PReadiness": 100,
    "publicDonationInvestmentRequestCleanReadiness": 0,
    "correctedApiCommandReferenceReadiness": 100,
    "requiredApisEnabledReadiness": 0,
    "officialWebsiteServerExecutionReadiness": 0,
    "googleCloudDeployExecutedNow": 0,
    "cloudRunServiceCreatedNow": 0,
    "liveDomainDnsChangedNow": 0,
    "smsLiveReadiness": 0,
    "liveSmsSentNow": 0,
    "walletPaymentPayoutNow": 0,
    "realProductionLaunchNow": 0
  },
  "safety": {
    "noApiEnablementNow": true,
    "noLiveGoogleCloudDeployNow": true,
    "noCloudRunServiceCreateNow": true,
    "noDomainDnsMutationNow": true,
    "noLiveEmailDnsMutationNow": true,
    "noLiveSmsSendNow": true,
    "noFirebaseApiCallNow": true,
    "noSmsProviderCallNow": true,
    "noWalletPaymentPayoutNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noDbMutationNow": true,
    "noRuntimeMountNow": true,
    "noPublicLaunchClaimNow": true,
    "ownerExactApprovalRequiredBeforeLiveAction": true,
    "noPivotWithoutOwnerApproval": true
  },
  "blockers": [
    "required_google_cloud_apis_still_not_enabled",
    "api_enablement_requires_separate_exact_owner_approval",
    "cloud_run_deploy_requires_separate_exact_owner_approval",
    "domain_mapping_dns_requires_separate_exact_owner_approval",
    "sms_live_still_locked",
    "wallet_payment_payout_still_locked"
  ],
  "nextStep": "245Q_enable_required_google_cloud_apis_requires_separate_exact_owner_approval_no_deploy_no_dns_no_sms_no_wallet"
} as unknown as SabiRelease245PFix1Report;
