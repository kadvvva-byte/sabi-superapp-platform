# 239L runtime locks

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Locked until separate Owner approval:
- Real SMS provider connection
- Real SMS sending
- Real Firebase/Auth activation
- Real route runtime mount
- Real Admin UI runtime mount
- Real DB/session/token writes
- Any .env/secrets/API/provider usage
- Real Google Cloud project/API calls
- Real gcloud command execution
- Real hosting deployment
- Real DNS changes
- Real SSL binding
- Any Wallet/payment/payout/crypto connection
- Public launch announcement

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager is the planned boundary.
