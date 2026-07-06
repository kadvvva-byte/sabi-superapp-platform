# WALLET-100.48.1 — KYC safe-disabled repair

This repair keeps KYC structurally prepared in `.env` but prevents it from becoming live-ready before a real KYC provider is bound.

Rules preserved:

- no fake KYC approve/reject;
- KYC provider remains disabled;
- KYC execution remains disabled;
- mobile must not receive admin/env/vault fields;
- mobileCanReadSecret must remain false;
- liveLaunchReady remains false until real provider integration.
