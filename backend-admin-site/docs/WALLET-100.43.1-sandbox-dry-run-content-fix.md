# WALLET-100.43.1

Fixes the dry-run script body decoding for Windows PowerShell compatibility.

The backend responses were valid JSON and correctly showed provider_not_configured / execution disabled. The failure was only in the test script converting string content as byte[].
