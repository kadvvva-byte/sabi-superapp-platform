import type { SabiRelease250BFix1Report } from './sabiRelease250BFix1.types';

export const sabiRelease250BFix1Report: SabiRelease250BFix1Report = {
  "version": "SABI-RELEASE-250B-FIX1-PUBLIC-SITE-ADMIN-EMAIL-NO-INFO-CLEAN-DEPLOY",
  "status": "passed",
  "createdAt": "2026-06-23T18:20:03.454Z",
  "approvalFlagRequired": "--i-approve-release-250b-fix1-admin-email-no-info-clean-deploy",
  "approvalFlagProvided": true,
  "officialEmail": "admin@sabiai.app",
  "blockedEmail": "info@sabiai.app",
  "officialSiteUrl": "https://sabiai.app/",
  "officialSiteProjectId": "sabi-official-prod",
  "region": "europe-west1",
  "service": "sabi-official-site",
  "changedFiles": [],
  "backups": [
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index.html",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index-en.html",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index-en-fix75.html",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__app.js",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__app-en.js",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__styles.css",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__sitemap.xml",
    ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__robots.txt"
  ],
  "deployAttempted": true,
  "buildResult": {
    "name": "cloud_build_submit_250b_fix1",
    "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" builds submit \"C:\\Users\\User\\Desktop\\superapp\\.data\\release\\250b-fix1\\deploy-context\" --tag \"gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\" --project \"sabi-official-prod\"",
    "status": 0,
    "stdout": "----------------------------- REMOTE BUILD OUTPUT ------------------------------\r\nstarting build \"f879439c-8135-4a7b-9c4f-e1f39546e7dd\"\r\n\r\nFETCHSOURCE\r\nFetching storage object: gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz#1782238730902876\r\nCopying gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz#1782238730902876...\r\n/ [0 files][    0.0 B/ 36.9 MiB]                                                \r/ [1 files][ 36.9 MiB/ 36.9 MiB]                                                \r-\r\r\nOperation completed over 1 objects/36.9 MiB.\r\nBUILD\r\nAlready have image (with digest): gcr.io/cloud-builders/gcb-internal\r\nSending build context to Docker daemon  38.95MB\r\r\r\nStep 1/7 : FROM node:20-alpine\r\n20-alpine: Pulling from library/node\r\n6a0ac1617861: Already exists\r\n4feea04c1543: Pulling fs layer\r\nb2cbbfe903b0: Pulling fs layer\r\nfff4e2c1b189: Pulling fs layer\r\nfff4e2c1b189: Verifying Checksum\r\nfff4e2c1b189: Download complete\r\nb2cbbfe903b0: Verifying Checksum\r\nb2cbbfe903b0: Download complete\r\n4feea04c1543: Verifying Checksum\r\n4feea04c1543: Download complete\r\n4feea04c1543: Pull complete\r\nb2cbbfe903b0: Pull complete\r\nfff4e2c1b189: Pull complete\r\nDigest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293\r\nStatus: Downloaded newer image for node:20-alpine\r\n ---> 11cedc39e663\r\nStep 2/7 : WORKDIR /app\r\n ---> Running in 5747ab298496\r\nRemoving intermediate container 5747ab298496\r\n ---> 3551877dbca4\r\nStep 3/7 : COPY package.json package.json\r\n ---> c7b436493e49\r\nStep 4/7 : RUN npm install --omit=dev\r\n ---> Running in 8600142dda4f\r\n\r\nadded 68 packages, and audited 69 packages in 5s\r\n\r\n15 packages are looking for funding\r\n  run `npm fund` for details\r\n\r\nfound 0 vulnerabilities\r\n\u001b[91mnpm notice\r\nnpm notice New major version of npm available! 10.8.2 -> 11.17.0\r\nnpm notice Changelog: https://github.com/npm/cli/releases/tag/v11.17.0\r\nnpm notice To update run: npm install -g npm@11.17.0\r\nnpm notice\r\n\u001b[0mRemoving intermediate container 8600142dda4f\r\n ---> b3ef5a8ca1a6\r\nStep 5/7 : COPY server.js server.js\r\n ---> 57945b6a3e44\r\nStep 6/7 : COPY public public\r\n ---> 1a62c350a5c9\r\nStep 7/7 : CMD [\"node\", \"server.js\"]\r\n ---> Running in 37a89c0de4af\r\nRemoving intermediate container 37a89c0de4af\r\n ---> 4b9952cd5c9b\r\nSuccessfully built 4b9952cd5c9b\r\nSuccessfully tagged gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\r\nPUSH\r\nPushing gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\r\nThe push refers to repository [gcr.io/sabi-official-prod/sabi-official-site]\r\nc1750e6f66cf: Preparing\r\na0760c3a8bee: Preparing\r\n52cbbbee5397: Preparing\r\nda2e12c39efe: Preparing\r\n36fa8a0150ee: Preparing\r\nafa543f85b46: Preparing\r\ne10358715ead: Preparing\r\n4983b93ee796: Preparing\r\n29df493baa13: Preparing\r\nafa543f85b46: Layer already exists\r\n4983b93ee796: Layer already exists\r\n29df493baa13: Layer already exists\r\ne10358715ead: Layer already exists\r\n36fa8a0150ee: Pushed\r\na0760c3a8bee: Pushed\r\nda2e12c39efe: Pushed\r\n52cbbbee5397: Pushed\r\nc1750e6f66cf: Pushed\r\nrelease-250b-fix1-admin-email-1782238582162: digest: sha256:c07b6e9e600cb0fb714cf7998a7ef9459d07e8346b162ae2856f659a7af98abe size: 2202\r\nDONE\r\n--------------------------------------------------------------------------------\r\nID                                    CREATE_TIME                DURATION  SOURCE                                                                                            IMAGES                                                                                    STATUS\r\nf879439c-8135-4a7b-9c4f-e1f39546e7dd  2026-06-23T18:18:52+00:00  41S       gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz  gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162  SUCCESS",
    "stderr": "Creating temporary archive of 39 file(s) totalling 37.1 MiB before compression.\r\nUploading tarball of [C:\\Users\\User\\Desktop\\superapp\\.data\\release\\250b-fix1\\deploy-context] to [gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz]\r\nCreated [https://cloudbuild.googleapis.com/v1/projects/sabi-official-prod/locations/global/builds/f879439c-8135-4a7b-9c4f-e1f39546e7dd].\r\nLogs are available at [ https://console.cloud.google.com/cloud-build/builds/f879439c-8135-4a7b-9c4f-e1f39546e7dd?project=1047545881519 ].\r\nWaiting for build to complete. Polling interval: 1 second(s).",
    "ok": true
  },
  "deployResult": {
    "name": "cloud_run_deploy_250b_fix1",
    "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" run deploy \"sabi-official-site\" --image \"gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\" --region \"europe-west1\" --project \"sabi-official-prod\" --allow-unauthenticated --quiet",
    "status": 0,
    "stdout": "",
    "stderr": "Deploying container to Cloud Run service [sabi-official-site] in project [sabi-official-prod] region [europe-west1]\r\nDeploying...\r\nSetting IAM Policy....................................warning\r\nCreating Revision................................................................................done\r\nRouting traffic.....done\r\nCompleted with warnings:\r\n  Setting IAM policy failed, try \"gcloud beta run services add-iam-policy-binding --region=europe-west1 --member=allUsers --role=roles/run.invoker sabi-official-site\"\r\nService [sabi-official-site] revision [sabi-official-site-00006-tt6] has been deployed and is serving 100 percent of traffic.\r\nService URL: https://sabi-official-site-1047545881519.europe-west1.run.app",
    "ok": true
  },
  "siteCheck": {
    "name": "official_site_admin_email_no_info_check",
    "command": "$u=\"https://sabiai.app/\"; $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 120; $hasAdmin=($r.Content -like \"*admin@sabiai.app*\"); $hasInfo=($r.Content -like \"*info@sabiai.app*\"); Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"HAS_ADMIN=\" + $hasAdmin); Write-Output (\"HAS_INFO=\" + $hasInfo); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400 -and $hasAdmin -and -not $hasInfo) { exit 0 } else { exit 1 }",
    "status": 0,
    "stdout": "STATUS=200\r\nHAS_ADMIN=True\r\nHAS_INFO=False",
    "stderr": "",
    "ok": true
  },
  "readiness": {
    "adminPublicContactPatchLocalReadiness": 100,
    "adminPublicContactDeployReadiness": 100,
    "infoPublicContactReadiness": 0,
    "release250BFix1Readiness": 100,
    "dnsMutationNow": 0,
    "cloudRunMutationNow": 100,
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
    "cloudRunMutationOnlyForOfficialSiteDeploy": true,
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
  "checksPassed": 15,
  "checksTotal": 15,
  "checks": [
    {
      "name": "250b_fix1_approval_flag_provided",
      "passed": true,
      "details": {
        "requiredFlag": "--i-approve-release-250b-fix1-admin-email-no-info-clean-deploy"
      }
    },
    {
      "name": "250b_fix1_site_dir_found",
      "passed": true,
      "details": {
        "siteDir": "site-ui"
      }
    },
    {
      "name": "250b_fix1_admin_email_local_present_info_absent",
      "passed": true,
      "details": {
        "changedFiles": [],
        "backups": [
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index.html",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index-en.html",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__index-en-fix75.html",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__app.js",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__app-en.js",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__styles.css",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__sitemap.xml",
          ".data/release/250b-fix1/backup-before-250b-fix1-2026-06-23T18-16-21-924Z/site-ui__robots.txt"
        ]
      }
    },
    {
      "name": "250b_fix1_cloud_build_attempted",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_cloud_build_passed",
      "passed": true,
      "details": {
        "name": "cloud_build_submit_250b_fix1",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" builds submit \"C:\\Users\\User\\Desktop\\superapp\\.data\\release\\250b-fix1\\deploy-context\" --tag \"gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\" --project \"sabi-official-prod\"",
        "status": 0,
        "stdout": "----------------------------- REMOTE BUILD OUTPUT ------------------------------\r\nstarting build \"f879439c-8135-4a7b-9c4f-e1f39546e7dd\"\r\n\r\nFETCHSOURCE\r\nFetching storage object: gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz#1782238730902876\r\nCopying gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz#1782238730902876...\r\n/ [0 files][    0.0 B/ 36.9 MiB]                                                \r/ [1 files][ 36.9 MiB/ 36.9 MiB]                                                \r-\r\r\nOperation completed over 1 objects/36.9 MiB.\r\nBUILD\r\nAlready have image (with digest): gcr.io/cloud-builders/gcb-internal\r\nSending build context to Docker daemon  38.95MB\r\r\r\nStep 1/7 : FROM node:20-alpine\r\n20-alpine: Pulling from library/node\r\n6a0ac1617861: Already exists\r\n4feea04c1543: Pulling fs layer\r\nb2cbbfe903b0: Pulling fs layer\r\nfff4e2c1b189: Pulling fs layer\r\nfff4e2c1b189: Verifying Checksum\r\nfff4e2c1b189: Download complete\r\nb2cbbfe903b0: Verifying Checksum\r\nb2cbbfe903b0: Download complete\r\n4feea04c1543: Verifying Checksum\r\n4feea04c1543: Download complete\r\n4feea04c1543: Pull complete\r\nb2cbbfe903b0: Pull complete\r\nfff4e2c1b189: Pull complete\r\nDigest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293\r\nStatus: Downloaded newer image for node:20-alpine\r\n ---> 11cedc39e663\r\nStep 2/7 : WORKDIR /app\r\n ---> Running in 5747ab298496\r\nRemoving intermediate container 5747ab298496\r\n ---> 3551877dbca4\r\nStep 3/7 : COPY package.json package.json\r\n ---> c7b436493e49\r\nStep 4/7 : RUN npm install --omit=dev\r\n ---> Running in 8600142dda4f\r\n\r\nadded 68 packages, and audited 69 packages in 5s\r\n\r\n15 packages are looking for funding\r\n  run `npm fund` for details\r\n\r\nfound 0 vulnerabilities\r\n\u001b[91mnpm notice\r\nnpm notice New major version of npm available! 10.8.2 -> 11.17.0\r\nnpm notice Changelog: https://github.com/npm/cli/releases/tag/v11.17.0\r\nnpm notice To update run: npm install -g npm@11.17.0\r\nnpm notice\r\n\u001b[0mRemoving intermediate container 8600142dda4f\r\n ---> b3ef5a8ca1a6\r\nStep 5/7 : COPY server.js server.js\r\n ---> 57945b6a3e44\r\nStep 6/7 : COPY public public\r\n ---> 1a62c350a5c9\r\nStep 7/7 : CMD [\"node\", \"server.js\"]\r\n ---> Running in 37a89c0de4af\r\nRemoving intermediate container 37a89c0de4af\r\n ---> 4b9952cd5c9b\r\nSuccessfully built 4b9952cd5c9b\r\nSuccessfully tagged gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\r\nPUSH\r\nPushing gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\r\nThe push refers to repository [gcr.io/sabi-official-prod/sabi-official-site]\r\nc1750e6f66cf: Preparing\r\na0760c3a8bee: Preparing\r\n52cbbbee5397: Preparing\r\nda2e12c39efe: Preparing\r\n36fa8a0150ee: Preparing\r\nafa543f85b46: Preparing\r\ne10358715ead: Preparing\r\n4983b93ee796: Preparing\r\n29df493baa13: Preparing\r\nafa543f85b46: Layer already exists\r\n4983b93ee796: Layer already exists\r\n29df493baa13: Layer already exists\r\ne10358715ead: Layer already exists\r\n36fa8a0150ee: Pushed\r\na0760c3a8bee: Pushed\r\nda2e12c39efe: Pushed\r\n52cbbbee5397: Pushed\r\nc1750e6f66cf: Pushed\r\nrelease-250b-fix1-admin-email-1782238582162: digest: sha256:c07b6e9e600cb0fb714cf7998a7ef9459d07e8346b162ae2856f659a7af98abe size: 2202\r\nDONE\r\n--------------------------------------------------------------------------------\r\nID                                    CREATE_TIME                DURATION  SOURCE                                                                                            IMAGES                                                                                    STATUS\r\nf879439c-8135-4a7b-9c4f-e1f39546e7dd  2026-06-23T18:18:52+00:00  41S       gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz  gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162  SUCCESS",
        "stderr": "Creating temporary archive of 39 file(s) totalling 37.1 MiB before compression.\r\nUploading tarball of [C:\\Users\\User\\Desktop\\superapp\\.data\\release\\250b-fix1\\deploy-context] to [gs://sabi-official-prod_cloudbuild/source/1782238586.601409-1597b3a5e54c48a48496d97620b46fd9.tgz]\r\nCreated [https://cloudbuild.googleapis.com/v1/projects/sabi-official-prod/locations/global/builds/f879439c-8135-4a7b-9c4f-e1f39546e7dd].\r\nLogs are available at [ https://console.cloud.google.com/cloud-build/builds/f879439c-8135-4a7b-9c4f-e1f39546e7dd?project=1047545881519 ].\r\nWaiting for build to complete. Polling interval: 1 second(s).",
        "ok": true
      }
    },
    {
      "name": "250b_fix1_cloud_run_deploy_passed",
      "passed": true,
      "details": {
        "name": "cloud_run_deploy_250b_fix1",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" run deploy \"sabi-official-site\" --image \"gcr.io/sabi-official-prod/sabi-official-site:release-250b-fix1-admin-email-1782238582162\" --region \"europe-west1\" --project \"sabi-official-prod\" --allow-unauthenticated --quiet",
        "status": 0,
        "stdout": "",
        "stderr": "Deploying container to Cloud Run service [sabi-official-site] in project [sabi-official-prod] region [europe-west1]\r\nDeploying...\r\nSetting IAM Policy....................................warning\r\nCreating Revision................................................................................done\r\nRouting traffic.....done\r\nCompleted with warnings:\r\n  Setting IAM policy failed, try \"gcloud beta run services add-iam-policy-binding --region=europe-west1 --member=allUsers --role=roles/run.invoker sabi-official-site\"\r\nService [sabi-official-site] revision [sabi-official-site-00006-tt6] has been deployed and is serving 100 percent of traffic.\r\nService URL: https://sabi-official-site-1047545881519.europe-west1.run.app",
        "ok": true
      }
    },
    {
      "name": "250b_fix1_live_site_has_admin_and_no_info",
      "passed": true,
      "details": {
        "name": "official_site_admin_email_no_info_check",
        "command": "$u=\"https://sabiai.app/\"; $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 120; $hasAdmin=($r.Content -like \"*admin@sabiai.app*\"); $hasInfo=($r.Content -like \"*info@sabiai.app*\"); Write-Output (\"STATUS=\" + $r.StatusCode); Write-Output (\"HAS_ADMIN=\" + $hasAdmin); Write-Output (\"HAS_INFO=\" + $hasInfo); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400 -and $hasAdmin -and -not $hasInfo) { exit 0 } else { exit 1 }",
        "status": 0,
        "stdout": "STATUS=200\r\nHAS_ADMIN=True\r\nHAS_INFO=False",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "250b_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "250b_fix1_no_live_email_sent_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "admin@sabiai.app is temporary public contact until info@sabiai.app alias/group proof passes.",
    "info@sabiai.app remains paused and is not published on the public site.",
    "Cloud Run mutation limited to official site static deploy only."
  ],
  "nextStep": "251B_owner_sabi_ai_policy_training_kernel_safe_files",
  "exactApprovalForNext": "I approve RELEASE-251B Owner Sabi AI policy and training kernel safe files, local code/artifact only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Secret Manager/env read-write, no DB mutation, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease250BFix1Report;
