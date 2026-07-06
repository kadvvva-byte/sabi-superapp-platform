# 239L panel fields contract

Internal only. Admin SMS readiness panel contract candidate.

The panel must show only safe status fields:
- selectedProviderForValidation: Firebase Phone Auth
- providerSelectedForValidationOnly: true
- firebaseExactValuesProvided: false
- realFirebaseProviderConnected: false
- realSmsProviderConnected: false
- realSmsSent: false
- realRouteRuntimeMounted: false
- liveAuthEnabledNow: false
- mobileDirectProviderAccess: false
- providerCredentialsStayBackendOnly: true
- providerSecretsInSecretManager: true
- routeMountMode: contract_only_no_runtime_mount
- panelMode: contract_only_no_admin_runtime_mount
- readinessEndpoint: GET /api/admin/auth/sms/readiness

Panel audit rows are masked only: startAttempt, verifyAttempt, resendAttempt, maskedPhoneLogs.
