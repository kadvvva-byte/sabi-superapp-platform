# WALLET-100.36 — Provider Integration Handoff Checklist

## Required before live Wallet launch

1. KYC provider
   - API contract
   - sandbox credentials
   - webhook URL
   - decision mapping
   - retry/error policy
   - admin review mapping

2. AML provider
   - API contract
   - transaction screening model
   - watchlist/sanctions logic
   - webhook/reporting rules
   - safe-hold/restricted state mapping

3. Bank card tokenization
   - bank/provider SDK or iframe
   - provider token contract
   - masked metadata policy
   - no PAN/CVV on Sabi infrastructure
   - webhook token status updates

4. Local bank gateway
   - payment initiation contract
   - payout/transfer contract
   - status webhook
   - reconciliation/ledger rules

5. Virtual card issuer
   - issuer provider contract
   - card issuing endpoint
   - token-only virtual card metadata
   - freeze/close/status webhook

6. Alipay+ acquiring
   - acquiring agreement
   - payment creation contract
   - redirect/QR/payment status flow
   - webhook validation
   - reconciliation files or API

7. Merchant acquiring
   - merchant onboarding/KYB
   - settlement account flow
   - refund/chargeback handling
   - payout schedule

8. Business payout
   - business account routing
   - payout provider contract
   - KYB/admin review states
   - settlement ledger mapping

9. Coin Wallet ledger/treasury
   - Coin ledger backend provider
   - treasury controls
   - Coin bridge to Sabi Wallet only
   - no direct Coin-to-card cashout

10. Crypto custody provider
    - custody contract
    - blockchain route mapping
    - no Sabi private key/seed storage
    - withdrawal confirmation policy

11. Crypto market data provider
    - price feed provider
    - supported assets/networks
    - stale-price policy
    - no fake prices

## Required admin controls before live

- provider config visibility
- provider enable/disable
- execution enable/disable
- KYC/AML review queue
- safe-hold/restricted states
- audit log
- webhook event log
- provider failure alerts
