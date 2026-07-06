import type { SabiRelease249AFix4Report } from './sabiRelease249AFix4.types';

export const sabiRelease249AFix4Report: SabiRelease249AFix4Report = {
  "version": "SABI-RELEASE-249A-FIX4-AUTHORITATIVE-DNS-PROVIDER-DIAGNOSIS",
  "status": "passed",
  "createdAt": "2026-06-23T09:25:53.428Z",
  "approval": "I approve RELEASE-249A-FIX4 authoritative DNS provider diagnosis for sabiai.app email SPF/DMARC records, read-only NS/SOA/TXT checks only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "officialDomain": "sabiai.app",
  "officialSiteProjectId": "sabi-official-prod",
  "firebaseProjectId": "sabi-official-prod-37629",
  "scope": "authoritative_dns_provider_diagnosis_ns_soa_txt_readonly_no_mutation",
  "expectedRecords": {
    "spf": "v=spf1 include:_spf.google.com ~all",
    "dmarc": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s"
  },
  "previousRetry": {
    "path": ".data/release/249a-fix3-retry/249a-fix3-retry-report.json",
    "status": "failed"
  },
  "observations": {
    "nsPublicChecks": {
      "system": {
        "name": "ns_system_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type NS  | Select-Object -Property NameHost,NameServer,NSHost | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "[{\"NameHost\":\"pdns1.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null},{\"NameHost\":\"pdns2.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null},{\"NameHost\":null,\"NameServer\":null,\"NSHost\":null},{\"NameHost\":null,\"NameServer\":null,\"NSHost\":null},{\"NameHost\":null,\"NameServer\":null,\"NSHost\":null},{\"NameHost\":null,\"NameServer\":null,\"NSHost\":null}]",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "ns_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type NS -Server 8.8.8.8 | Select-Object -Property NameHost,NameServer,NSHost | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "[{\"NameHost\":\"pdns2.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null},{\"NameHost\":\"pdns1.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null}]",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "ns_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type NS -Server 1.1.1.1 | Select-Object -Property NameHost,NameServer,NSHost | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "[{\"NameHost\":\"pdns1.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null},{\"NameHost\":\"pdns2.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null}]",
        "stderr": "",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "ns_quad9_9_9_9_9_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type NS -Server 9.9.9.9 | Select-Object -Property NameHost,NameServer,NSHost | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "[{\"NameHost\":\"pdns1.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null},{\"NameHost\":\"pdns2.registrar-servers.com\",\"NameServer\":null,\"NSHost\":null}]",
        "stderr": "",
        "ok": true
      }
    },
    "soaPublicChecks": {
      "system": {
        "name": "soa_system_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type SOA  | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585}",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "soa_google_8_8_8_8_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type SOA -Server 8.8.8.8 | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "soa_cloudflare_1_1_1_1_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type SOA -Server 1.1.1.1 | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585}",
        "stderr": "",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "soa_quad9_9_9_9_9_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type SOA -Server 9.9.9.9 | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585}",
        "stderr": "",
        "ok": true
      }
    },
    "authoritativeChecks": {
      "pdns1.registrar-servers.com": {
        "rootTxt": {
          "name": "auth_pdns1_registrar_servers_com_root_txt_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server pdns1.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]},{\"Strings\":null},{\"Strings\":null}]",
          "stderr": "",
          "ok": true
        },
        "dmarcTxt": {
          "name": "auth_pdns1_registrar_servers_com_dmarc_txt_readonly",
          "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server pdns1.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server pdns1.regis ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        },
        "mx": {
          "name": "auth_pdns1_registrar_servers_com_mx_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type MX -Server pdns1.registrar-servers.com | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
          "stderr": "",
          "ok": true
        },
        "dkim": {
          "name": "auth_pdns1_registrar_servers_com_google_dkim_readonly",
          "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server pdns1.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]},{\"Strings\":null},{\"Strings\":null}]",
          "stderr": "",
          "ok": true
        },
        "soa": {
          "name": "auth_pdns1_registrar_servers_com_soa_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type SOA -Server pdns1.registrar-servers.com | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585},{\"PrimaryServer\":null,\"NameAdministrator\":null,\"SerialNumber\":null},{\"PrimaryServer\":null,\"NameAdministrator\":null,\"SerialNumber\":null}]",
          "stderr": "",
          "ok": true
        },
        "parsed": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "dmarcRecords": [],
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      },
      "pdns2.registrar-servers.com": {
        "rootTxt": {
          "name": "auth_pdns2_registrar_servers_com_root_txt_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server pdns2.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]},{\"Strings\":null},{\"Strings\":null}]",
          "stderr": "",
          "ok": true
        },
        "dmarcTxt": {
          "name": "auth_pdns2_registrar_servers_com_dmarc_txt_readonly",
          "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server pdns2.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "",
          "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server pdns2.regis ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
          "ok": true
        },
        "mx": {
          "name": "auth_pdns2_registrar_servers_com_mx_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type MX -Server pdns2.registrar-servers.com | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
          "stderr": "",
          "ok": true
        },
        "dkim": {
          "name": "auth_pdns2_registrar_servers_com_google_dkim_readonly",
          "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server pdns2.registrar-servers.com | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]},{\"Strings\":null},{\"Strings\":null}]",
          "stderr": "",
          "ok": true
        },
        "soa": {
          "name": "auth_pdns2_registrar_servers_com_soa_readonly",
          "command": "try { Resolve-DnsName sabiai.app -Type SOA -Server pdns2.registrar-servers.com | Select-Object -Property PrimaryServer,NameAdministrator,SerialNumber | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
          "status": 0,
          "stdout": "[{\"PrimaryServer\":\"pdns1.registrar-servers.com\",\"NameAdministrator\":\"hostmaster.registrar-servers.com\",\"SerialNumber\":1782176585},{\"PrimaryServer\":null,\"NameAdministrator\":null,\"SerialNumber\":null},{\"PrimaryServer\":null,\"NameAdministrator\":null,\"SerialNumber\":null}]",
          "stderr": "",
          "ok": true
        },
        "parsed": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "dmarcRecords": [],
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    "publicRootTxtChecks": {
      "system": {
        "name": "public_system_root_txt_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "public_google_8_8_8_8_root_txt_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "public_cloudflare_1_1_1_1_root_txt_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "public_quad9_9_9_9_9_root_txt_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type TXT -Server 9.9.9.9 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U\"]}",
        "stderr": "",
        "ok": true
      }
    },
    "publicDmarcChecks": {
      "system": {
        "name": "public_system_dmarc_txt_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT  | Select-Object -P ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "public_google_8_8_8_8_dmarc_txt_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server 8.8.8.8 | S ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "public_cloudflare_1_1_1_1_dmarc_txt_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server 1.1.1.1 | S ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "public_quad9_9_9_9_9_dmarc_txt_readonly",
        "command": "try { Resolve-DnsName _dmarc.sabiai.app -Type TXT -Server 9.9.9.9 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 0 }",
        "status": 0,
        "stdout": "",
        "stderr": "Resolve-DnsName : _dmarc.sabiai.app : DNS-��� \r\n�� �������\r\n��ப�:1 ����:7\r\n+ try { Resolve-DnsName _dmarc.sabiai.app -Typ\r\ne TXT -Server 9.9.9.9 | S ...\r\n+       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : ResourceUnavail \r\n   able: (_dmarc.sabiai.app:String) [Resolve  \r\n  -DnsName], Win32Exception\r\n    + FullyQualifiedErrorId : DNS_ERROR_RCODE \r\n   _NAME_ERROR,Microsoft.DnsClient.Commands.  \r\n  ResolveDnsName",
        "ok": true
      }
    },
    "publicMxChecks": {
      "system": {
        "name": "public_system_mx_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX  | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "[{\"NameExchange\":\"smtp.google.com\",\"Preference\":1},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null},{\"NameExchange\":null,\"Preference\":null}]",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "public_google_8_8_8_8_mx_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX -Server 8.8.8.8 | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"NameExchange\":\"smtp.google.com\",\"Preference\":1}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "public_cloudflare_1_1_1_1_mx_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX -Server 1.1.1.1 | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"NameExchange\":\"smtp.google.com\",\"Preference\":1}",
        "stderr": "",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "public_quad9_9_9_9_9_mx_readonly",
        "command": "try { Resolve-DnsName sabiai.app -Type MX -Server 9.9.9.9 | Select-Object -Property NameExchange,Preference | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"NameExchange\":\"smtp.google.com\",\"Preference\":1}",
        "stderr": "",
        "ok": true
      }
    },
    "publicDkimChecks": {
      "system": {
        "name": "public_system_google_dkim_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT  | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      },
      "google_8_8_8_8": {
        "name": "public_google_8_8_8_8_google_dkim_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server 8.8.8.8 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      },
      "cloudflare_1_1_1_1": {
        "name": "public_cloudflare_1_1_1_1_google_dkim_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server 1.1.1.1 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
        "status": 0,
        "stdout": "{\"Strings\":[\"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0Jy\",\"cAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB\"]}",
        "stderr": "",
        "ok": true
      },
      "quad9_9_9_9_9": {
        "name": "public_quad9_9_9_9_9_google_dkim_readonly",
        "command": "try { Resolve-DnsName google._domainkey.sabiai.app -Type TXT -Server 9.9.9.9 | Select-Object -Property Strings | ConvertTo-Json -Compress; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }",
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
    "nsByResolver": {
      "system": [
        "pdns1.registrar-servers.com",
        "pdns2.registrar-servers.com"
      ],
      "google_8_8_8_8": [
        "pdns2.registrar-servers.com",
        "pdns1.registrar-servers.com"
      ],
      "cloudflare_1_1_1_1": [
        "pdns1.registrar-servers.com",
        "pdns2.registrar-servers.com"
      ],
      "quad9_9_9_9_9": [
        "pdns1.registrar-servers.com",
        "pdns2.registrar-servers.com"
      ]
    },
    "soaByResolver": {
      "system": {
        "primaryServer": "pdns1.registrar-servers.com",
        "responsiblePerson": "hostmaster.registrar-servers.com",
        "serial": 1782176585
      },
      "google_8_8_8_8": {
        "primaryServer": "pdns1.registrar-servers.com",
        "responsiblePerson": "hostmaster.registrar-servers.com",
        "serial": 1782176585
      },
      "cloudflare_1_1_1_1": {
        "primaryServer": "pdns1.registrar-servers.com",
        "responsiblePerson": "hostmaster.registrar-servers.com",
        "serial": 1782176585
      },
      "quad9_9_9_9_9": {
        "primaryServer": "pdns1.registrar-servers.com",
        "responsiblePerson": "hostmaster.registrar-servers.com",
        "serial": 1782176585
      }
    },
    "authoritativeNs": [
      "pdns1.registrar-servers.com",
      "pdns2.registrar-servers.com"
    ],
    "providerGuess": "Namecheap DNS",
    "authoritativeDetails": {
      "pdns1.registrar-servers.com": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true,
        "soa": {
          "primaryServer": "pdns1.registrar-servers.com",
          "responsiblePerson": "hostmaster.registrar-servers.com",
          "serial": 1782176585
        }
      },
      "pdns2.registrar-servers.com": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true,
        "soa": {
          "primaryServer": "pdns1.registrar-servers.com",
          "responsiblePerson": "hostmaster.registrar-servers.com",
          "serial": 1782176585
        }
      }
    },
    "publicParsed": {
      "system": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true
      },
      "google_8_8_8_8": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true
      },
      "cloudflare_1_1_1_1": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true
      },
      "quad9_9_9_9_9": {
        "rootTxtRecords": [
          "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
        ],
        "spfRecords": [],
        "hasGoogleSpf": false,
        "spfSingleRecord": false,
        "dmarcRecords": [],
        "hasExpectedDmarc": false,
        "mxRecords": [
          {
            "exchange": "smtp.google.com",
            "preference": 1
          }
        ],
        "mxGoogleReady": true,
        "dkimRecords": [
          "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
        ],
        "dkimReady": true
      }
    },
    "authSpfReady": false,
    "authDmarcReady": false,
    "authMxReady": true,
    "authDkimReady": true,
    "publicSpfReady": false,
    "publicDmarcReady": false,
    "publicMxReady": true,
    "publicDkimReady": true,
    "authEmailDnsSecurityReady": false,
    "publicEmailDnsSecurityReady": false,
    "absentAtAuthoritative": true,
    "presentAtAuthoritativeButNotPublic": false,
    "diagnosis": "spf_and_dmarc_absent_at_authoritative_nameservers_records_added_to_wrong_dns_provider_zone_or_not_saved",
    "officialSiteLive": true,
    "smtpReachable": true,
    "imapReachable": true,
    "gcloudReady": true
  },
  "manualCorrectionPlan": {
    "diagnosis": "spf_and_dmarc_absent_at_authoritative_nameservers_records_added_to_wrong_dns_provider_zone_or_not_saved",
    "activeAuthoritativeNameservers": [
      "pdns1.registrar-servers.com",
      "pdns2.registrar-servers.com"
    ],
    "likelyDnsProvider": "Namecheap DNS",
    "requiredAction": "Open the DNS panel/provider matching the active authoritative NS listed above and add/save SPF and DMARC there. The records are not present at the active authoritative DNS.",
    "exactRecords": {
      "spf": {
        "type": "TXT",
        "host": "@",
        "value": "v=spf1 include:_spf.google.com ~all"
      },
      "dmarc": {
        "type": "TXT",
        "host": "_dmarc",
        "value": "v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; pct=100; adkim=s; aspf=s"
      }
    },
    "keepRecords": [
      "MX @ -> smtp.google.com priority 1",
      "TXT google._domainkey -> existing Google DKIM",
      "TXT @ -> existing google-site-verification"
    ],
    "noMutationNow": true
  },
  "readiness": {
    "previousRetryFailedExpectedReadiness": 100,
    "authoritativeNsDiscoveryReadiness": 100,
    "authoritativeSoaCheckReadiness": 100,
    "providerGuessReadiness": 100,
    "authoritativeSpfReadiness": 0,
    "authoritativeDmarcReadiness": 0,
    "authoritativeMxReadiness": 100,
    "authoritativeDkimReadiness": 100,
    "publicSpfReadiness": 0,
    "publicDmarcReadiness": 0,
    "publicMxReadiness": 100,
    "publicDkimReadiness": 100,
    "authoritativeEmailDnsSecurityReadiness": 0,
    "publicEmailDnsSecurityReadiness": 0,
    "diagnosisReadiness": 100,
    "correctionPlanReadiness": 100,
    "officialWebsiteReadiness": 100,
    "gcloudReadiness": 100,
    "smtpNetworkReadiness": 100,
    "imapNetworkReadiness": 100,
    "release249AFix4Readiness": 100,
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
    "authoritativeSpf": "0%",
    "authoritativeDmarc": "0%",
    "authoritativeMx": "100%",
    "authoritativeDkim": "100%",
    "publicSpf": "0%",
    "publicDmarc": "0%",
    "publicMx": "100%",
    "publicDkim": "100%",
    "authoritativeDnsSecurity": "0%",
    "publicDnsSecurity": "0%",
    "liveSendReceiveProof": "0%"
  },
  "safety": {
    "readonlyChecksOnly": true,
    "nsSoaTxtChecksOnly": true,
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
  "checksPassed": 25,
  "checksTotal": 25,
  "checks": [
    {
      "name": "249a_fix4_previous_retry_failed_expected",
      "passed": true,
      "details": {
        "previousRetryPath": ".data/release/249a-fix3-retry/249a-fix3-retry-report.json",
        "status": "failed"
      }
    },
    {
      "name": "249a_fix4_authoritative_ns_discovered",
      "passed": true,
      "details": {
        "authoritativeNs": [
          "pdns1.registrar-servers.com",
          "pdns2.registrar-servers.com"
        ],
        "nsByResolver": {
          "system": [
            "pdns1.registrar-servers.com",
            "pdns2.registrar-servers.com"
          ],
          "google_8_8_8_8": [
            "pdns2.registrar-servers.com",
            "pdns1.registrar-servers.com"
          ],
          "cloudflare_1_1_1_1": [
            "pdns1.registrar-servers.com",
            "pdns2.registrar-servers.com"
          ],
          "quad9_9_9_9_9": [
            "pdns1.registrar-servers.com",
            "pdns2.registrar-servers.com"
          ]
        }
      }
    },
    {
      "name": "249a_fix4_authoritative_soa_checked",
      "passed": true,
      "details": {
        "soaByResolver": {
          "system": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          },
          "google_8_8_8_8": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          },
          "cloudflare_1_1_1_1": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          },
          "quad9_9_9_9_9": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    {
      "name": "249a_fix4_authoritative_spf_checked",
      "passed": true,
      "details": {
        "pdns1.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        },
        "pdns2.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    {
      "name": "249a_fix4_authoritative_dmarc_checked",
      "passed": true,
      "details": {
        "pdns1.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        },
        "pdns2.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    {
      "name": "249a_fix4_authoritative_mx_checked",
      "passed": true,
      "details": {
        "pdns1.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        },
        "pdns2.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    {
      "name": "249a_fix4_authoritative_dkim_checked",
      "passed": true,
      "details": {
        "pdns1.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        },
        "pdns2.registrar-servers.com": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true,
          "soa": {
            "primaryServer": "pdns1.registrar-servers.com",
            "responsiblePerson": "hostmaster.registrar-servers.com",
            "serial": 1782176585
          }
        }
      }
    },
    {
      "name": "249a_fix4_provider_guess_prepared",
      "passed": true,
      "details": {
        "providerGuess": "Namecheap DNS"
      }
    },
    {
      "name": "249a_fix4_public_resolvers_rechecked",
      "passed": true,
      "details": {
        "system": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true
        },
        "google_8_8_8_8": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true
        },
        "cloudflare_1_1_1_1": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true
        },
        "quad9_9_9_9_9": {
          "rootTxtRecords": [
            "google-site-verification=OLR8Uj0o5mrDjW4lgHT7LeKXcMFyTrKxea8KvTXVO4U"
          ],
          "spfRecords": [],
          "hasGoogleSpf": false,
          "spfSingleRecord": false,
          "dmarcRecords": [],
          "hasExpectedDmarc": false,
          "mxRecords": [
            {
              "exchange": "smtp.google.com",
              "preference": 1
            }
          ],
          "mxGoogleReady": true,
          "dkimRecords": [
            "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59Hroxa66pWIO6YuY0f0vgo/Uvw8CamYXv9Q9mB/mvJnbHTVVDurrRjSvh78vKnl7lmjm56k7ImclqqIzOEvnV1cgcFP4+HKivoz2ewtrzNhgJ06Cu6nj+XbaeHO1O22VgUD5sl2B1m1EgBCRH1LvFgWF5Rc/Ic24OukTmgYSejDtwQRnZdkAtdYBbnwXW/S0JycAUTANlI+5V4B8JAwmCiXb4UNKNhj71V+2Me276OmjqnqhtLmn7jQ12VcfAlTOZpk42YXv4uMaNYEPK7HOu4+9y1DI+X7HwkSNzPnLrWAyxOZpJWW0T/+gqRpZI5dzRx1VD5bAalyqvEnqf5JCQIDAQAB"
          ],
          "dkimReady": true
        }
      }
    },
    {
      "name": "249a_fix4_diagnosis_prepared",
      "passed": true,
      "details": {
        "diagnosis": "spf_and_dmarc_absent_at_authoritative_nameservers_records_added_to_wrong_dns_provider_zone_or_not_saved"
      }
    },
    {
      "name": "249a_fix4_correction_plan_created",
      "passed": true,
      "details": {
        "path": ".data/release/249a-fix4/249a-fix4-authoritative-dns-correction-plan.md"
      }
    },
    {
      "name": "249a_fix4_official_site_live_readonly",
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
      "name": "249a_fix4_gcloud_full_path_ready_readonly",
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
      "name": "249a_fix4_smtp_network_ready_readonly",
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
      "name": "249a_fix4_imap_network_ready_readonly",
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
      "name": "249a_fix4_no_dns_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_cloud_run_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_firebase_user_deletion_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_google_pay_billing_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_wallet_payment_payout_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_db_mutation_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_secret_manager_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_env_read_write_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_live_email_sent_now",
      "passed": true,
      "details": {}
    },
    {
      "name": "249a_fix4_no_mailbox_mutation_now",
      "passed": true,
      "details": {}
    }
  ],
  "blockers": [],
  "warnings": [
    "spf_dmarc_not_ready_at_authoritative_dns_add_or_correct_records_in_active_dns_provider",
    "249a_fix4_does_not_send_live_email",
    "bank_final_email_proof_requires_249b_controlled_send_receive_test_after_dns_security_100",
    "dmarc_sabiai_app_mailbox_or_alias_should_be_confirmed_in_google_admin_console_if_not_already_done"
  ],
  "nextStep": "249A_FIX4_CORRECT_ACTIVE_DNS_PROVIDER_OR_WAIT_THEN_RECHECK",
  "exactApprovalForNext": "I confirm I corrected SPF and DMARC in the active authoritative DNS provider for sabiai.app based on 249A-FIX4 diagnosis and approve RELEASE-249A-FIX4-RECHECK read-only email DNS security recheck only, no DNS mutation, no Cloud Run mutation, no Firebase user deletion, no Google Pay Billing, no wallet, no payment, no payout",
  "artifacts": {}
} as unknown as SabiRelease249AFix4Report;
