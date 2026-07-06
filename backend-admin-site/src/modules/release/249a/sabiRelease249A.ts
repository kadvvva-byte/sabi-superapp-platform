import type { SabiRelease249AReport } from './sabiRelease249A.types';

export const sabiRelease249AReport: SabiRelease249AReport = {
  "version": "SABI-RELEASE-249A-OFFICIAL-DOMAIN-EMAIL-READINESS-READONLY",
  "status": "failed",
  "createdAt": "2026-06-23T08:30:25.421Z",
  "approval": "I approve RELEASE-249A verify official domain email live send/receive readiness for sabiai.app mailboxes only, read-only DNS and mailbox access checks where available, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "scope": "official_domain_email_readiness_dns_mail_access_readonly_no_mutation_no_send",
  "observations": {
    "gcloudVersion": {
      "name": "gcloud_version_readonly",
      "command": "gcloud --version",
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud --version\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "gcloudAccount": {
      "name": "gcloud_active_account_readonly",
      "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\"",
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud auth list --filter=status:ACTIVE --fo\r\nrmat=\"value(account)\"\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "gcloudProject": {
      "name": "gcloud_active_project_readonly",
      "command": "gcloud config get-value project 2>$null",
      "status": 1,
      "stdout": "",
      "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud config get-value project 2>$null\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
      "ok": false
    },
    "officialSite": {
      "name": "official_site_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
      "ok": true
    },
    "mx": {
      "name": "mx_records_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
      "stderr": "",
      "ok": true
    },
    "rootTxt": {
      "name": "root_txt_records_readonly",
      "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
      "stderr": "",
      "ok": true
    },
    "dmarcTxt": {
      "name": "dmarc_txt_records_readonly",
      "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "googleDkim": {
      "name": "google_dkim_selector_readonly",
      "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
      "stderr": "",
      "ok": true
    },
    "selector1Dkim": {
      "name": "selector1_dkim_readonly",
      "command": "try { Resolve-DnsName selector1._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : selector1._domainkey.sabiai.\r\napp : DNS-��� �� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName selector1._domainkey.s\r\nabiai.app -Type TXT | Sel ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (selector1._domainkey.sabiai.app:St  \r\n  ring) [Resolve-DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "selector2Dkim": {
      "name": "selector2_dkim_readonly",
      "command": "try { Resolve-DnsName selector2._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "",
      "stderr": "Resolve-DnsName : selector2._domainkey.sabiai.\r\napp : DNS-��� �� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName selector2._domainkey.s\r\nabiai.app -Type TXT | Sel ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (selector2._domainkey.sabiai.app:St  \r\n  ring) [Resolve-DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
      "ok": true
    },
    "smtpGoogleTcp": {
      "name": "smtp_google_587_tcp_readonly",
      "command": "try { $t = Test-NetConnection smtp.gmail.com -Port 587 -WarningAction SilentlyContinue; Write-Output (\"TCP=\" + $t.TcpTestSucceeded); if ($t.TcpTestSucceeded) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "TCP=True",
      "stderr": "",
      "ok": true
    },
    "imapGoogleTcp": {
      "name": "imap_google_993_tcp_readonly",
      "command": "try { $t = Test-NetConnection imap.gmail.com -Port 993 -WarningAction SilentlyContinue; Write-Output (\"TCP=\" + $t.TcpTestSucceeded); if ($t.TcpTestSucceeded) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "TCP=True",
      "stderr": "",
      "ok": true
    },
    "gamAvailable": {
      "name": "gam_cli_available_optional_readonly",
      "command": "try { gam version 2>$null; if ($LASTEXITCODE -eq 0) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 1,
      "stdout": "��� \"gam\" �� �ᯮ����� ��� ��� ���������, �㭪樨, 䠩�� �業��� ��� �믮��塞�� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, ��᫥ 祣� ������ ������.",
      "stderr": "",
      "ok": false
    },
    "workspaceDirectoryOptional": {
      "name": "gam_workspace_users_optional_readonly",
      "command": "gam print users primaryEmail",
      "status": -1,
      "stdout": "",
      "stderr": "GAM CLI not available; skipped.",
      "ok": false
    }
  },
  "derived": {
    "mxRecords": [
      {
        "exchange": "smtp.google.com",
        "preference": 1
      }
    ],
    "txtRecords": [
      "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
    ],
    "dmarcRecords": [],
    "googleDkimRecords": [
      "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
    ],
    "selector1DkimRecords": [],
    "selector2DkimRecords": [],
    "mxGoogleReady": true,
    "spfReady": false,
    "dmarcReady": false,
    "dkimReady": true,
    "smtpReachable": true,
    "imapReachable": true,
    "sendReceiveLiveReady": false
  },
  "readiness": {
    "previousBankReadiness246PReadiness": 100,
    "officialWebsiteReadiness": 100,
    "gcloudAccountReadiness": 0,
    "officialProjectReadiness": 0,
    "mxGoogleWorkspaceReadiness": 100,
    "spfGoogleWorkspaceReadiness": 0,
    "dmarcReadiness": 0,
    "dkimReadiness": 100,
    "smtpNetworkReadiness": 100,
    "imapNetworkReadiness": 100,
    "mailboxDirectoryOptionalReadiness": 100,
    "emailSendReceiveLiveReadiness": 0,
    "release249AReadiness": 0,
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
  "emailReadinessSummary": {
    "mx": "100%",
    "spf": "0%",
    "dmarc": "0%",
    "dkim": "100%",
    "smtpNetwork": "100%",
    "imapNetwork": "100%",
    "mailboxDirectoryOptional": "not_available_optional",
    "sendReceiveLive": "0%",
    "liveEmailSentNow": "0%",
    "mailboxMutationNow": "0%"
  },
  "safety": {
    "readonlyChecksOnly": true,
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
  "checksPassed": 15,
  "checksTotal": 20,
  "checks": [
    {
      "name": "249a_previous_bank_readiness_246p_ready",
      "passed": true,
      "details": {
        "report": ".data/release/246p/246p-report.json"
      }
    },
    {
      "name": "249a_official_site_still_live_readonly",
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
      "name": "249a_gcloud_available_readonly",
      "passed": false,
      "details": {
        "name": "gcloud_version_readonly",
        "command": "gcloud --version",
        "status": 1,
        "stdout": "",
        "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud --version\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
        "ok": false
      }
    },
    {
      "name": "249a_gcloud_active_account_is_sabiai_domain",
      "passed": false,
      "details": {
        "name": "gcloud_active_account_readonly",
        "command": "gcloud auth list --filter=status:ACTIVE --format=\"value(account)\"",
        "status": 1,
        "stdout": "",
        "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud auth list --filter=status:ACTIVE --fo\r\nrmat=\"value(account)\"\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
        "ok": false
      }
    },
    {
      "name": "249a_gcloud_project_is_official_site_project",
      "passed": false,
      "details": {
        "name": "gcloud_active_project_readonly",
        "command": "gcloud config get-value project 2>$null",
        "status": 1,
        "stdout": "",
        "stderr": "gcloud : ��� \"gcloud\" �� �ᯮ����� ��� ��� ��\r\n�������, �㭪樨, 䠩�� �業��� ��� �믮���\r\n��� �ணࠬ��. �஢���� �ࠢ��쭮��� ����ᠭ�\r\n� �����, � ⠪�� ����稥 � �ࠢ��쭮��� ���, \r\n��᫥ 祣� ������ ������.\r\n��ப�:1 ����:1\r\n+ gcloud config get-value project 2>$null\r\n+ ~~~~~~\r\n    + CategoryInfo          : ObjectNotFound: \r\n    (gcloud:String) [], CommandNotFoundExcep  \r\n  tion\r\n    + FullyQualifiedErrorId : CommandNotFound \r\n   Exception",
        "ok": false
      }
    },
    {
      "name": "249a_mx_google_workspace_ready",
      "passed": true,
      "details": {
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "raw": {
          "name": "mx_records_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type MX | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
          "stderr": "",
          "ok": true
        }
      }
    },
    {
      "name": "249a_spf_google_workspace_ready",
      "passed": false,
      "details": {
        "txtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "raw": {
          "name": "root_txt_records_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
          "stderr": "",
          "ok": true
        }
      }
    },
    {
      "name": "249a_dmarc_ready",
      "passed": false,
      "details": {
        "dmarcRecords": [],
        "raw": {
          "name": "dmarc_txt_records_readonly",
          "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT | Select-Object -Pr ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        }
      }
    },
    {
      "name": "249a_dkim_ready",
      "passed": true,
      "details": {
        "googleDkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "selector1DkimRecords": [],
        "selector2DkimRecords": [],
        "googleDkim": {
          "name": "google_dkim_selector_readonly",
          "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
          "stderr": "",
          "ok": true
        },
        "selector1Dkim": {
          "name": "selector1_dkim_readonly",
          "command": "try { Resolve-DnsName selector1._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : selector1._domainkey.sabiai.\r\napp : DNS-��� �� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName selector1._domainkey.s\r\nabiai.app -Type TXT | Sel ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (selector1._domainkey.sabiai.app:St  \r\n  ring) [Resolve-DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        },
        "selector2Dkim": {
          "name": "selector2_dkim_readonly",
          "command": "try { Resolve-DnsName selector2._domainkey.sabiai.app -Type TXT | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : selector2._domainkey.sabiai.\r\napp : DNS-��� �� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName selector2._domainkey.s\r\nabiai.app -Type TXT | Sel ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (selector2._domainkey.sabiai.app:St  \r\n  ring) [Resolve-DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        }
      }
    },
    {
      "name": "249a_smtp_google_network_reachable",
      "passed": true,
      "details": {
        "name": "smtp_google_587_tcp_readonly",
        "command": "try { $t = Test-NetConnection smtp.gmail.com -Port 587 -WarningAction SilentlyContinue; Write-Output (\"TCP=\" + $t.TcpTestSucceeded); if ($t.TcpTestSucceeded) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "TCP=True",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_imap_google_network_reachable",
      "passed": true,
      "details": {
        "name": "imap_google_993_tcp_readonly",
        "command": "try { $t = Test-NetConnection imap.gmail.com -Port 993 -WarningAction SilentlyContinue; Write-Output (\"TCP=\" + $t.TcpTestSucceeded); if ($t.TcpTestSucceeded) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "TCP=True",
        "stderr": "",
        "ok": true
      }
    },
    {
      "name": "249a_workspace_directory_optional_readonly",
      "passed": true,
      "details": {
        "name": "gam_workspace_users_optional_readonly",
        "command": "gam print users primaryEmail",
        "status": -1,
        "stdout": "",
        "stderr": "GAM CLI not available; skipped.",
        "ok": false
      }
    },
    {
      "name": "249a_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_no_env_read_write_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "249a_gcloud_available_readonly",
    "249a_gcloud_active_account_is_sabiai_domain",
    "249a_gcloud_project_is_official_site_project",
    "249a_spf_google_workspace_ready",
    "249a_dmarc_ready"
  ],
  "warnings": [
    "email_send_receive_live_readiness_not_100_until_missing_dns_or_access_items_are_fixed",
    "249a_is_readonly_and_does_not_send_a_real_email",
    "for_bank_final_email_proof_next_step_should_be_controlled_send_receive_test_if_owner_approves"
  ],
  "nextStep": "249A_FIX1_prepare_missing_email_dns_or_mailbox_fix_plan_requires_exact_owner_approval",
  "exactApprovalForNext": "I approve RELEASE-249A-FIX1 prepare exact missing official domain email DNS/mailbox fix plan for sabiai.app based on read-only 249A blockers only, no DNS mutation yet, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease249AReport;
