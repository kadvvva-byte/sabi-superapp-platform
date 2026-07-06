# WALLET-100.37.1 — KYC/AML route mapping fix

This patch keeps the Wallet in safe provider-disabled mode while adding explicit execution-route mapping for compliance checks.

## Route mapping

- `kyc_verification` → `kyc_provider`
- `kyc_status` → `kyc_provider`
- `aml_screening` → `aml_provider`
- `aml_transaction_monitoring` → `aml_provider`

## Safety

This patch does not approve KYC, clear AML, or simulate provider decisions.
Execution remains blocked until the real provider is configured, execution flags are enabled, and a real adapter reports readiness.
