import type { SabiRelease249AFix1Report } from './sabiRelease249AFix1.types';

export const sabiRelease249AFix1Report: SabiRelease249AFix1Report = {
  "version": "SABI-RELEASE-249A-FIX1-OFFICIAL-DOMAIN-EMAIL-DNS-MAILBOX-FIX-PLAN-NO-MUTATION",
  "status": "passed",
  "createdAt": "2026-06-23T08:37:52.825Z",
  "approval": "I approve RELEASE-249A-FIX1 prepare exact missing official domain email DNS/mailbox fix plan for sabiai.app based on read-only 249A blockers only, no DNS mutation yet, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "scope": "prepare_missing_email_dns_mailbox_fix_plan_no_dns_mutation_no_mailbox_mutation",
  "basedOn": {
    "previous249APath": ".data/release/249a/249a-report.json",
    "previous249AStatus": "failed",
    "previous249ABlockers": [
      "249a_gcloud_available_readonly",
      "249a_gcloud_active_account_is_sabiai_domain",
      "249a_gcloud_project_is_official_site_project",
      "249a_spf_google_workspace_ready",
      "249a_dmarc_ready"
    ]
  },
  "observations": {
    "discoverGcloud": {
      "name": "discover_gcloud_full_paths_readonly",
      "command": "\n$candidates = @(\n  \"$env:ProgramFiles\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\",\n  \"$env:ProgramFiles(x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\",\n  \"$env:LOCALAPPDATA\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\",\n  \"C:\\Program Files\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\",\n  \"C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\"\n)\n$found = @()\nforeach ($c in $candidates) {\n  if (Test-Path $c) { $found += $c }\n}\ntry {\n  $cmd = Get-Command gcloud -ErrorAction SilentlyContinue\n  if ($cmd -and $cmd.Source) { $found += $cmd.Source }\n} catch {}\n$found | Select-Object -Unique | ConvertTo-Json -Compress\nif ($found.Count -gt 0) { exit 0 } else { exit 0 }\n",
      "status": 0,
      "stdout": "\"C:\\\\Users\\\\User\\\\AppData\\\\Local\\\\Google\\\\Cloud SDK\\\\google-cloud-sdk\\\\bin\\\\gcloud.cmd\"",
      "stderr": "",
      "ok": true
    },
    "gcloudFullPathCheck": {
      "name": "gcloud_full_path_version_readonly",
      "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "dnsRecheckMx": {
      "name": "current_mx_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
      "stderr": "",
      "ok": true
    },
    "dnsRecheckRootTxt": {
      "name": "current_root_txt_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
      "stderr": "",
      "ok": true
    },
    "dnsRecheckDmarc": {
      "name": "current_dmarc_txt_readonly",
      "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "dnsRecheckDkim": {
      "name": "current_google_dkim_readonly",
      "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
      "stderr": "",
      "ok": true
    },
    "officialSite": {
      "name": "official_site_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    }
  },
  "plan": {
    "domain": "sabiai.app",
    "status": "plan_only_no_mutation",
    "recordsToAddOrUpdate": [
      {
        "purpose": "SPF Google Workspace sender authentication",
        "providerArea": "DNS / TXT record",
        "action": "ADD if no SPF exists; UPDATE/MERGE if another SPF exists. There must be only one SPF TXT record for the root domain.",
        "type": "TXT",
        "host": "@",
        "name": "sabiai.app",
        "value": "v=spf1 include:_spf.google.com ~all",
        "ttl": "default_or_3600",
        "priority": null,
        "mutationNow": false,
        "reason": "249A found no SPF record for sabiai.app root TXT."
      },
      {
        "purpose": "DMARC monitoring policy for bank/business readiness",
        "providerArea": "DNS / TXT record",
        "action": "ADD",
        "type": "TXT",
        "host": "_dmarc",
        "name": "_dmarc.sabiai.app",
        "value": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s",
        "ttl": "default_or_3600",
        "priority": null,
        "mutationNow": false,
        "precondition": "Create/verify dmarc@sabiai.app mailbox or alias before relying on rua reports.",
        "reason": "249A found no DMARC TXT record at _dmarc.sabiai.app."
      }
    ],
    "recordsToKeep": [
      {
        "purpose": "Google Workspace MX inbound mail",
        "type": "MX",
        "host": "@",
        "name": "sabiai.app",
        "value": "smtp.google.com",
        "priority": 1,
        "status": "already_present_keep"
      },
      {
        "purpose": "Google Workspace DKIM selector",
        "type": "TXT",
        "host": "google._domainkey",
        "name": "google._domainkey.sabiai.app",
        "value": "[EXISTING_DKIM_PUBLIC_KEY_REDACTED_IN_PLAN]",
        "status": "already_present_keep"
      },
      {
        "purpose": "Google site verification",
        "type": "TXT",
        "host": "@",
        "name": "sabiai.app",
        "value": "[EXISTING_GOOGLE_SITE_VERIFICATION_PRESENT]",
        "status": "already_present_keep"
      }
    ],
    "mailboxPlan": [
      {
        "mailbox": "admin@sabiai.app",
        "purpose": "primary admin/account identity",
        "status": "verify_exists_or_create_in_workspace",
        "mutationNow": false
      },
      {
        "mailbox": "support@sabiai.app",
        "purpose": "public support contact",
        "status": "verify_exists_or_create_in_workspace",
        "mutationNow": false
      },
      {
        "mailbox": "legal@sabiai.app",
        "purpose": "legal contact",
        "status": "verify_exists_or_create_in_workspace",
        "mutationNow": false
      },
      {
        "mailbox": "privacy@sabiai.app",
        "purpose": "privacy/GDPR contact",
        "status": "verify_exists_or_create_in_workspace",
        "mutationNow": false
      },
      {
        "mailbox": "security@sabiai.app",
        "purpose": "security contact",
        "status": "verify_exists_or_create_in_workspace",
        "mutationNow": false
      },
      {
        "mailbox": "dmarc@sabiai.app",
        "purpose": "DMARC aggregate reports receiver used in rua=mailto:dmarc@sabiai.app",
        "status": "verify_exists_or_create_in_workspace_before_or_with_dmarc",
        "mutationNow": false
      }
    ],
    "gcloudFixPlan": {
      "problem": "249A child PowerShell process could not resolve gcloud from PATH.",
      "mutationNow": false,
      "discoveredPaths": [
        "C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd"
      ],
      "recommendedNoMutationRecheck": "Use full path in verification scripts: \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\"",
      "optionalPathAddLater": "Only if Owner approves environment mutation later, add Google Cloud SDK bin directory to user PATH.",
      "currentFullPathVersionCheck": {
        "name": "gcloud_full_path_version_readonly",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" --version",
        "status": 0,
        "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
        "stderr": "",
        "ok": true
      }
    },
    "recheckAfterDnsPlan": {
      "waitAfterDnsChange": "10-30 minutes initial, up to DNS TTL/48h if provider propagation is slow",
      "commands": [
        "Resolve-DnsName sabiai.app -Type TXT",
        "Resolve-DnsName _dmarc.sabiai.app -Type TXT",
        "Resolve-DnsName google._domainkey.sabiai.app -Type TXT",
        "Resolve-DnsName sabiai.app -Type MX",
        "node .\\tools\\release-249a-fix2-email-dns-recheck-readonly.js"
      ],
      "expectedReadinessAfterApply": {
        "mxGoogleWorkspaceReadiness": 100,
        "spfGoogleWorkspaceReadiness": 100,
        "dmarcReadiness": 100,
        "dkimReadiness": 100,
        "smtpNetworkReadiness": 100,
        "imapNetworkReadiness": 100,
        "emailDnsSecurityReadiness": 100
      }
    },
    "doNotDoNow": [
      "Do not change DNS in 249A-FIX1.",
      "Do not send live email in 249A-FIX1.",
      "Do not mutate Cloud Run official site.",
      "Do not delete Firebase users.",
      "Do not touch Google Pay/Billing.",
      "Do not touch wallet/payment/payout.",
      "Do not mutate DB, Secret Manager, or env."
    ]
  },
  "readiness": {
    "previous249AReportReadiness": 100,
    "blockerAnalysisReadiness": 100,
    "spfFixPlanReadiness": 100,
    "dmarcFixPlanReadiness": 100,
    "dmarcMailboxPreconditionPlanReadiness": 100,
    "existingGoodRecordsKeepPlanReadiness": 100,
    "gcloudPathFixPlanReadiness": 100,
    "currentDnsRecheckReadiness": 100,
    "officialWebsiteReadiness": 100,
    "release249AFix1Readiness": 100,
    "dnsMutationNow": 0,
    "cloudRunMutationNow": 0,
    "firebaseUserDeletionNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0,
    "liveEmailSentNow": 0,
    "mailboxMutationNow": 0
  },
  "safety": {
    "planOnlyNoMutation": true,
    "noDnsMutationNow": true,
    "noCloudRunMutationNow": true,
    "noFirebaseUserDeletionNow": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noLiveEmailSentNow": true,
    "noMailboxMutationNow": true
  },
  "checksPassed": 22,
  "checksTotal": 22,
  "checks": [
    {
      "name": "249a_fix1_previous_249a_report_found",
      "passed": true,
      "details": {
        "previous249APath": ".data/release/249a/249a-report.json"
      }
    },
    {
      "name": "249a_fix1_previous_249a_failed_as_expected",
      "passed": true,
      "details": {
        "status": "failed"
      }
    },
    {
      "name": "249a_fix1_expected_blockers_match",
      "passed": true,
      "details": {
        "expectedBlockers": [
          "249a_gcloud_available_readonly",
          "249a_gcloud_active_account_is_sabiai_domain",
          "249a_gcloud_project_is_official_site_project",
          "249a_spf_google_workspace_ready",
          "249a_dmarc_ready"
        ],
        "previousBlockers": [
          "249a_gcloud_available_readonly",
          "249a_gcloud_active_account_is_sabiai_domain",
          "249a_gcloud_project_is_official_site_project",
          "249a_spf_google_workspace_ready",
          "249a_dmarc_ready"
        ]
      }
    },
    {
      "name": "249a_fix1_spf_plan_prepared",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_dmarc_plan_prepared",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_dmarc_mailbox_precondition_prepared",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_existing_mx_dkim_keep_plan_prepared",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_gcloud_path_plan_prepared",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_current_dns_recheck_readonly_done",
      "passed": true,
      "details": {
        "dnsRecheckMx": {
          "name": "current_mx_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
          "stderr": "",
          "ok": true
        },
        "dnsRecheckRootTxt": {
          "name": "current_root_txt_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
          "stderr": "",
          "ok": true
        },
        "dnsRecheckDmarc": {
          "name": "current_dmarc_txt_readonly",
          "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        },
        "dnsRecheckDkim": {
          "name": "current_google_dkim_readonly",
          "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
          "stderr": "",
          "ok": true
        }
      }
    },
    {
      "name": "249a_fix1_official_site_still_live_readonly",
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
      "name": "249a_fix1_plan_json_created",
      "passed": true,
      "details": {
        "path": ".data/release/249a-fix1/249a-fix1-dns-mailbox-fix-plan.json"
      }
    },
    {
      "name": "249a_fix1_plan_markdown_created",
      "passed": true,
      "details": {
        "path": ".data/release/249a-fix1/249a-fix1-dns-mailbox-fix-plan.md"
      }
    },
    {
      "name": "249a_fix1_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_live_email_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix1_no_mailbox_mutation_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "dns_records_are_prepared_but_not_applied_in_249a_fix1",
    "dmarc_rua_uses_dmarc_sabiai_app_verify_or_create_mailbox_alias_before_live_reports",
    "after_dns_apply_wait_for_dns_propagation_before_249a_fix2_readonly_recheck",
    "live_send_receive_test_still_requires_separate_249b_approval"
  ],
  "nextStep": "249A_FIX2_apply_missing_spf_dmarc_dns_records_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-249A-FIX2 add only the missing SPF and DMARC TXT records for sabiai.app exactly as prepared in 249A-FIX1, verify dmarc@sabiai.app mailbox or alias requirement, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease249AFix1Report;
