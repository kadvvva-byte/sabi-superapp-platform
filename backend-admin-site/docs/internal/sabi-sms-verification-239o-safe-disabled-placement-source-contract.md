# 239O safe-disabled placement source contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Required source markers:
- adminSmsReadinessPanelVisualPlacementPlan239N
- adminSmsReadinessPanelPlacementCandidate239N
- adminSmsReadinessPanelLanguageContract239N
- disabled_by_default
- visual_plan_only_no_admin_runtime_mount
- contract_only_no_admin_runtime_mount
- contract_only_no_runtime_mount
- selectedProviderForValidation
- providerSelectedForValidationOnly
- firebaseExactValuesProvided
- realFirebaseProviderConnected
- realSmsProviderConnected
- realSmsSent
- realRouteRuntimeMounted
- realAdminRuntimeMounted
- liveAuthEnabledNow
- routeMountMode
- panelMode

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager.
Sabi Messenger only.
