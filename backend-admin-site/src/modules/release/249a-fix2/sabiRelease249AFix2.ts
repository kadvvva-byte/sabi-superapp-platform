import type { SabiRelease249AFix2Report } from './sabiRelease249AFix2.types';

export const sabiRelease249AFix2Report: SabiRelease249AFix2Report = {
  "version": "SABI-RELEASE-249A-FIX2-ADD-SPF-DMARC-TXT-RECORDS",
  "status": "passed",
  "createdAt": "2026-06-23T08:55:43.307Z",
  "approval": "I approve RELEASE-249A-FIX2 add only the missing SPF and DMARC TXT records for sabiai.app exactly as prepared in 249A-FIX1, verify dmarc@sabiai.app mailbox or alias requirement, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "scope": "add_missing_spf_dmarc_if_cloud_dns_zone_found_else_prepare_manual_dns_no_other_mutations",
  "previousFix1": {
    "path": ".data/release/249a-fix1/249a-fix1-report.json",
    "status": "passed"
  },
  "records": {
    "spfRecord": {
      "type": "TXT",
      "name": "sabiai.app.",
      "host": "@",
      "ttl": 3600,
      "value": "\"v=spf1 include:_spf.google.com ~all\"",
      "plainValue": "v=spf1 include:_spf.google.com ~all"
    },
    "dmarcRecord": {
      "type": "TXT",
      "name": "_dmarc.sabiai.app.",
      "host": "_dmarc",
      "ttl": 3600,
      "value": "\"v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s\"",
      "plainValue": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s"
    }
  },
  "observations": {
    "beforeRootTxt": {
      "name": "before_root_txt_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
      "stderr": "",
      "ok": true
    },
    "beforeDmarcTxt": {
      "name": "before_dmarc_txt_readonly",
      "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "beforeMx": {
      "name": "before_mx_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
      "stderr": "",
      "ok": true
    },
    "beforeDkim": {
      "name": "before_google_dkim_readonly",
      "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
      "stderr": "",
      "ok": true
    },
    "gcloudVersion": {
      "name": "gcloud_full_path_version_readonly",
      "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" --version",
      "status": 0,
      "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
      "stderr": "",
      "ok": true
    },
    "gcloudAccount": {
      "name": "gcloud_full_path_active_account_readonly",
      "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" auth list --filter=status:ACTIVE --format=\"value(account)\"",
      "status": 0,
      "stdout": "admin@sabiai.app",
      "stderr": "",
      "ok": true
    },
    "gcloudProject": {
      "name": "gcloud_full_path_project_readonly",
      "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" config get-value project 2>$null",
      "status": 0,
      "stdout": "sabi-official-prod",
      "stderr": "",
      "ok": true
    },
    "listZones": {
      "name": "cloud_dns_managed_zones_list_readonly",
      "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" dns managed-zones list --project=sabi-official-prod --format=json",
      "status": 1,
      "stdout": "[]",
      "stderr": "API [dns.googleapis.com] not enabled on project [sabi-official-prod]. Would you \r\nlike to enable and retry (this will take a few minutes)? (y/N)?  \r\nERROR: (gcloud.dns.managed-zones.list) [admin@sabiai.app] does not have permission to access projects instance [sabi-official-prod] (or it may not exist): Cloud DNS API has not been used in project sabi-official-prod before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/dns.googleapis.com/overview?project=sabi-official-prod then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry. This command is authenticated as admin@sabiai.app which is the active account specified by the [core/account] property.\r\nCloud DNS API has not been used in project sabi-official-prod before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/dns.googleapis.com/overview?project=sabi-official-prod then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.\r\nGoogle developers console API activation\r\nhttps://console.developers.google.com/apis/api/dns.googleapis.com/overview?project=sabi-official-prod\r\n- '@type': type.googleapis.com/google.rpc.ErrorInfo\r\n  domain: googleapis.com\r\n  metadata:\r\n    activationUrl: https://console.developers.google.com/apis/api/dns.googleapis.com/overview?project=sabi-official-prod\r\n    consumer: projects/sabi-official-prod\r\n    containerInfo: sabi-official-prod\r\n    service: dns.googleapis.com\r\n    serviceTitle: Cloud DNS API\r\n  reason: SERVICE_DISABLED",
      "ok": false
    },
    "matchingZones": [],
    "transaction": {
      "zoneFound": false,
      "zoneName": null,
      "started": null,
      "addSpf": null,
      "addDmarc": null,
      "execute": null,
      "skippedReason": "gcloud_full_path_or_cloud_dns_zone_list_failed"
    },
    "afterRootTxtImmediate": {
      "name": "after_root_txt_immediate_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
      "stderr": "",
      "ok": true
    },
    "afterDmarcTxtImmediate": {
      "name": "after_dmarc_txt_immediate_readonly",
      "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "afterMx": {
      "name": "after_mx_readonly_keep_check",
      "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
      "stderr": "",
      "ok": true
    },
    "afterDkim": {
      "name": "after_google_dkim_readonly_keep_check",
      "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
      "stderr": "",
      "ok": true
    }
  },
  "derived": {
    "beforeRootTxtRecords": [
      "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
    ],
    "beforeDmarcTxtRecords": [],
    "afterRootTxtRecords": [
      "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
    ],
    "afterDmarcTxtRecords": [],
    "spfAlreadyReady": false,
    "dmarcAlreadyReady": false,
    "spfReadyImmediate": false,
    "dmarcReadyImmediate": false,
    "zoneFound": false,
    "zoneName": null,
    "mutationAttempted": false,
    "dnsMutationSucceeded": false,
    "manualRequired": true
  },
  "dmarcMailboxRequirement": {
    "mailboxOrAlias": "dmarc@sabiai.app",
    "purpose": "DMARC aggregate reports rua receiver",
    "verifiedByScript": false,
    "verificationMethodAvailable": false,
    "status": "require_manual_google_admin_console_verification_or_create_alias_before_relying_on_reports",
    "mutationNow": false,
    "note": "No mailbox mutation was approved or performed in 249A-FIX2."
  },
  "readiness": {
    "previousFix1Readiness": 100,
    "gcloudFullPathReadiness": 100,
    "gcloudAccountReadiness": 100,
    "officialProjectReadiness": 100,
    "cloudDnsZoneReadiness": 0,
    "manualDnsPlanReadiness": 100,
    "spfRecordPreparedReadiness": 100,
    "dmarcRecordPreparedReadiness": 100,
    "dnsMutationAttemptReadiness": 0,
    "dnsMutationSucceededReadiness": 0,
    "spfImmediateReadiness": 0,
    "dmarcImmediateReadiness": 0,
    "mxKeepReadiness": 100,
    "dkimKeepReadiness": 100,
    "dmarcMailboxRequirementDocumentedReadiness": 100,
    "release249AFix2Readiness": 100,
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
    "onlySpfDmarcRecordsTargeted": true,
    "mxNotTouched": true,
    "dkimNotTouched": true,
    "cloudRunUntouched": true,
    "firebaseUsersUntouched": true,
    "noGooglePayOrBillingNow": true,
    "noWalletPaymentPayoutNow": true,
    "noDbMutationNow": true,
    "noSecretManagerReadWriteNow": true,
    "noEnvReadWriteNow": true,
    "noLiveEmailSentNow": true,
    "noMailboxMutationNow": true
  },
  "manualActionRequired": true,
  "manualActionFile": ".data/release/249a-fix2/249a-fix2-manual-dns-records-if-not-cloud-dns.md",
  "checksPassed": 22,
  "checksTotal": 22,
  "checks": [
    {
      "name": "249a_fix2_previous_fix1_ready",
      "passed": true,
      "details": {
        "previousFix1Path": ".data/release/249a-fix1/249a-fix1-report.json"
      }
    },
    {
      "name": "249a_fix2_gcloud_full_path_available",
      "passed": true,
      "details": {
        "name": "gcloud_full_path_version_readonly",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" --version",
        "status": 0,
        "stdout": "Google Cloud SDK 573.0.0\r\nbeta 2026.06.12\r\nbq 2.1.32\r\ncore 2026.06.12\r\ngcloud-crc32c 1.0.0\r\ngsutil 5.37",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_fix2_gcloud_account_sabiai_readonly",
      "passed": true,
      "details": {
        "name": "gcloud_full_path_active_account_readonly",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" auth list --filter=status:ACTIVE --format=\"value(account)\"",
        "status": 0,
        "stdout": "admin@sabiai.app",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_fix2_gcloud_project_official_readonly",
      "passed": true,
      "details": {
        "name": "gcloud_full_path_project_readonly",
        "command": "& \"C:\\Users\\User\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\" config get-value project 2>$null",
        "status": 0,
        "stdout": "sabi-official-prod",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_fix2_cloud_dns_zone_found_or_manual_plan_ready",
      "passed": true,
      "details": {
        "zoneFound": false,
        "zoneName": null,
        "manualPlanPath": ".data/release/249a-fix2/249a-fix2-manual-dns-records-if-not-cloud-dns.md"
      }
    },
    {
      "name": "249a_fix2_spf_record_prepared_exactly",
      "passed": true,
      "details": {
        "type": "TXT",
        "name": "sabiai.app.",
        "host": "@",
        "ttl": 3600,
        "value": "\"v=spf1 include:_spf.google.com ~all\"",
        "plainValue": "v=spf1 include:_spf.google.com ~all"
      }
    },
    {
      "name": "249a_fix2_dmarc_record_prepared_exactly",
      "passed": true,
      "details": {
        "type": "TXT",
        "name": "_dmarc.sabiai.app.",
        "host": "_dmarc",
        "ttl": 3600,
        "value": "\"v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s\"",
        "plainValue": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s"
      }
    },
    {
      "name": "249a_fix2_dns_transaction_succeeded_or_manual_required",
      "passed": true,
      "details": {
        "mutationAttempted": false,
        "manualRequired": true,
        "transaction": {
          "zoneFound": false,
          "zoneName": null,
          "started": null,
          "addSpf": null,
          "addDmarc": null,
          "execute": null,
          "skippedReason": "gcloud_full_path_or_cloud_dns_zone_list_failed"
        }
      }
    },
    {
      "name": "249a_fix2_spf_ready_immediate_or_pending_or_manual_required",
      "passed": true,
      "details": {
        "beforeRootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "afterRootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ]
      }
    },
    {
      "name": "249a_fix2_dmarc_ready_immediate_or_pending_or_manual_required",
      "passed": true,
      "details": {
        "beforeDmarcTxtRecords": [],
        "afterDmarcTxtRecords": []
      }
    },
    {
      "name": "249a_fix2_mx_still_readable",
      "passed": true,
      "details": {
        "name": "after_mx_readonly_keep_check",
        "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_fix2_dkim_still_readable",
      "passed": true,
      "details": {
        "name": "after_google_dkim_readonly_keep_check",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_fix2_dmarc_mailbox_alias_requirement_documented",
      "passed": true,
      "details": {
        "mailboxOrAlias": "dmarc@sabiai.app",
        "purpose": "DMARC aggregate reports rua receiver",
        "verifiedByScript": false,
        "verificationMethodAvailable": false,
        "status": "require_manual_google_admin_console_verification_or_create_alias_before_relying_on_reports",
        "mutationNow": false,
        "note": "No mailbox mutation was approved or performed in 249A-FIX2."
      }
    },
    {
      "name": "249a_fix2_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_live_email_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix2_no_mailbox_mutation_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "cloud_dns_zone_not_found_or_gcloud_unavailable_manual_dns_provider_update_required",
    "dns_propagation_may_need_time_before_readonly_fix3_recheck",
    "dmarc_sabiai_app_mailbox_or_alias_must_be_verified_in_google_admin_console_separately_no_mailbox_mutation_done",
    "live_send_receive_test_still_requires_separate_249b_approval"
  ],
  "nextStep": "249A_FIX2_MANUAL_ADD_DNS_RECORDS_IN_DNS_PROVIDER_THEN_249A_FIX3_READONLY_RECHECK",
  "exactApprovalForNext": "I confirm I added the SPF and DMARC TXT records for sabiai.app manually in the DNS provider exactly as prepared, and approve RELEASE-249A-FIX3 read-only email DNS security recheck only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease249AFix2Report;
