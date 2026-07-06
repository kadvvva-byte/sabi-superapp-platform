import type { SabiRelease249AFix3Report } from './sabiRelease249AFix3.types';

export const sabiRelease249AFix3Report: SabiRelease249AFix3Report = {
  "version": "SABI-RELEASE-249A-FIX3-EMAIL-DNS-SECURITY-READONLY-RECHECK",
  "status": "failed",
  "createdAt": "2026-06-23T09:04:16.518Z",
  "approval": "I confirm I added the SPF and DMARC TXT records for sabiai.app manually in the DNS provider exactly as prepared, and approve RELEASE-249A-FIX3 read-only email DNS security recheck only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "scope": "read_only_email_dns_security_recheck_after_manual_spf_dmarc_add_no_mutation",
  "expectedRecords": {
    "spf": "v=spf1 include:_spf.google.com ~all",
    "dmarc": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s"
  },
  "previousFix2": {
    "path": ".data/release/249a-fix2/249a-fix2-report.json",
    "status": "passed"
  },
  "observations": {
    "rootTxtChecks": {
      "system": {
        "name": "root_txt_system_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "root_txt_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "root_txt_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      }
    },
    "dmarcChecks": {
      "system": {
        "name": "dmarc_txt_system_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT  | Select-Object -P ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "dmarc_txt_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server 8.8.8.8 | S ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "dmarc_txt_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server 1.1.1.1 | S ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      }
    },
    "mxChecks": {
      "system": {
        "name": "mx_system_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX  | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "mx_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX -Server 8.8.8.8 | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"NameExchange\":\"smtp.google.com\",\"Preference\":1}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "mx_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX -Server 1.1.1.1 | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"NameExchange\":\"smtp.google.com\",\"Preference\":1}",
        "stderr": "",
        "ok": true
      }
    },
    "dkimChecks": {
      "system": {
        "name": "google_dkim_system_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "google_dkim_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "google_dkim_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      }
    },
    "officialSite": {
      "name": "official_site_readonly",
      "command": "$u=\"https://sabiai.app/\"; try { $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 90; Write-Output (\"STATUS=\" + $r.StatusCode); if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } else { exit 1 } } catch { Write-Output $_.Exception.Message; exit 1 }",
      "status": 0,
      "stdout": "STATUS=200",
      "stderr": "",
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
    }
  },
  "derived": {
    "rootTxtParsed": {
      "system": [
        "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
      ],
      "google_8_8_8_8": [
        "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
      ],
      "cloudflare_1_1_1_1": [
        "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
      ]
    },
    "dmarcParsed": {
      "system": [],
      "google_8_8_8_8": [],
      "cloudflare_1_1_1_1": []
    },
    "dkimParsed": {
      "system": [
        "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
      ],
      "google_8_8_8_8": [
        "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
      ],
      "cloudflare_1_1_1_1": [
        "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
      ]
    },
    "mxParsed": {
      "system": [
        {
          "exchange": "smtp.google.com",
          "preference": 1
        }
      ],
      "google_8_8_8_8": [
        {
          "exchange": "smtp.google.com",
          "preference": 1
        }
      ],
      "cloudflare_1_1_1_1": [
        {
          "exchange": "smtp.google.com",
          "preference": 1
        }
      ]
    },
    "resolverDetails": {
      "system": {
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "dkimReady": true,
        "mxGoogleReady": true,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ]
      },
      "google_8_8_8_8": {
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "dkimReady": true,
        "mxGoogleReady": true,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ]
      },
      "cloudflare_1_1_1_1": {
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "dkimReady": true,
        "mxGoogleReady": true,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ]
      }
    },
    "spfReadyAllResolvers": false,
    "dmarcReadyAllResolvers": false,
    "dkimReadyAllResolvers": true,
    "mxReadyAllResolvers": true,
    "smtpReachable": true,
    "imapReachable": true,
    "officialSiteLive": true,
    "gcloudReady": true,
    "emailDnsSecurityReady": false,
    "emailInfrastructureReady": false
  },
  "readiness": {
    "previousFix2Readiness": 100,
    "officialWebsiteReadiness": 100,
    "gcloudReadiness": 100,
    "spfGoogleWorkspaceReadiness": 0,
    "spfSingleRecordReadiness": 0,
    "dmarcReadiness": 0,
    "mxGoogleWorkspaceReadiness": 100,
    "dkimReadiness": 100,
    "smtpNetworkReadiness": 100,
    "imapNetworkReadiness": 100,
    "emailDnsSecurityReadiness": 0,
    "emailInfrastructureReadinessNoLiveSend": 0,
    "release249AFix3Readiness": 0,
    "dnsMutationNow": 0,
    "cloudRunMutationNow": 0,
    "firebaseUserDeletionNow": 0,
    "googlePayBillingNow": 0,
    "walletPaymentPayoutNow": 0,
    "dbMutationNow": 0,
    "secretManagerReadWriteNow": 0,
    "envReadWriteNow": 0,
    "liveEmailSentNow": 0,
    "mailboxMutationNow": 0,
    "liveSendReceiveProofReadiness": 0
  },
  "emailReadinessSummary": {
    "mx": "100%",
    "spf": "0%",
    "spfSingleRecord": "0%",
    "dmarc": "0%",
    "dkim": "100%",
    "smtpNetwork": "100%",
    "imapNetwork": "100%",
    "dnsSecurity": "0%",
    "infrastructureNoLiveSend": "0%",
    "liveSendReceiveProof": "0%"
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
  "checksPassed": 17,
  "checksTotal": 22,
  "checks": [
    {
      "name": "249a_fix3_previous_fix2_ready",
      "passed": true,
      "details": {
        "previousFix2Path": ".data/release/249a-fix2/249a-fix2-report.json"
      }
    },
    {
      "name": "249a_fix3_official_site_live_readonly",
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
      "name": "249a_fix3_gcloud_full_path_ready_readonly",
      "passed": true,
      "details": {
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
        }
      }
    },
    {
      "name": "249a_fix3_spf_google_ready_all_resolvers",
      "passed": false,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_spf_single_record_all_resolvers",
      "passed": false,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_dmarc_ready_all_resolvers",
      "passed": false,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_mx_google_ready_all_resolvers",
      "passed": true,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_dkim_ready_all_resolvers",
      "passed": true,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_smtp_google_network_reachable",
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
      "name": "249a_fix3_imap_google_network_reachable",
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
      "name": "249a_fix3_email_dns_security_ready",
      "passed": false,
      "details": {
        "system": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "google_8_8_8_8": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        },
        "cloudflare_1_1_1_1": {
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "dkimReady": true,
          "mxGoogleReady": true,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ]
        }
      }
    },
    {
      "name": "249a_fix3_email_infrastructure_ready_no_live_send",
      "passed": false,
      "details": {
        "emailDnsSecurityReady": false,
        "smtpReachable": true,
        "imapReachable": true,
        "officialSiteLive": true
      }
    },
    {
      "name": "249a_fix3_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_live_email_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix3_no_mailbox_mutation_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [
    "249a_fix3_spf_google_ready_all_resolvers",
    "249a_fix3_spf_single_record_all_resolvers",
    "249a_fix3_dmarc_ready_all_resolvers",
    "249a_fix3_email_dns_security_ready",
    "249a_fix3_email_infrastructure_ready_no_live_send"
  ],
  "warnings": [
    "dns_propagation_not_complete_or_records_not_visible_yet_retry_after_ttl",
    "249a_fix3_does_not_send_live_email",
    "bank_final_email_proof_requires_249b_controlled_send_receive_test_approval",
    "dmarc_sabiai_app_mailbox_or_alias_should_be_confirmed_in_google_admin_console_if_not_already_done"
  ],
  "nextStep": "249A_FIX3_RETRY_AFTER_DNS_PROPAGATION_READONLY",
  "exactApprovalForNext": "I approve RELEASE-249A-FIX3-RETRY read-only email DNS security recheck after SPF/DMARC propagation for sabiai.app, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease249AFix3Report;
