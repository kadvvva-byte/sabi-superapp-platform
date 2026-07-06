# WALLET-100.59 — Coin/Crypto webhook handoff shape

Provider webhook requirements for future real binding:

Coin ledger / treasury:
- providerEventId
- providerLedgerReference
- userId
- amount
- currency = COIN
- route = coin_topup | coin_send | coin_withdraw | coin_earn | coin_bridge
- status = pending | confirmed | failed | restricted | reversed
- riskStatus
- complianceStatus
- signature header

Crypto custody:
- providerEventId
- custodyAccountReference
- chain
- asset
- txHash or providerTransferReference
- direction = deposit | withdrawal | transfer
- amount
- status = pending | broadcasted | confirmed | failed | restricted
- riskStatus
- complianceStatus
- signature header

Crypto market data:
- providerEventId
- providerPriceReference
- asset
- quoteCurrency
- price
- timestamp
- dataQualityStatus

Sabi must not store seed phrases, private keys, or raw custody secrets.
