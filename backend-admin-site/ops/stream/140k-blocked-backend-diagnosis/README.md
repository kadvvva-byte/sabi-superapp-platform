# BACKEND-STREAM-FOUNDATION-140K-BLOCKED-DIAGNOSIS

Read-only local diagnosis for a blocked 140K runtime smoke where every GET returned status 0 / connection error.

Scope:
- no backend restart
- no HTTP request by this diagnosis
- no DB/provider/Wallet/payment/payout/money movement
- no source code change
- checks port listeners, TCP reachability, node process presence, package script names, and required source file presence
