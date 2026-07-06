# Sabi Site 238A — Domain / Hosting / Corporate Mail Preflight

This is an internal-only preflight package. It must not be displayed on the public homepage.

## Scope

- Prepare readiness checks for `sabiai.app`.
- Prepare hosting and SSL handoff boundaries.
- Prepare corporate mail DNS planning.
- Preserve the stable FIX75 public site without editing it.

## Strict locks

The package does not perform and must not perform:

- real DNS writes;
- real hosting deployment;
- real SSL binding;
- real corporate mail activation;
- `.env` or secret reads;
- provider/API calls;
- DB, Wallet, payment or payout actions;
- Admin backend connection.

## Expected local base

The working local site should be the stable FIX75 package in `site-ui`.
