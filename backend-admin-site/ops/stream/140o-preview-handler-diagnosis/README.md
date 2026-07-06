# BACKEND-STREAM-FOUNDATION-140O-PREVIEW-HANDLER-DIAGNOSIS

Source-only diagnosis after:
- Authorization: Bearer real ADMIN_PANEL_TOKEN returns readiness=200
- preview still returns 403

This runner inspects source context for:
- app.ts readiness/preview route definitions
- createStreamFoundationKernelDiagnosticsBackendRouteConnectionHandler
- routeId checks
- stream_kernel_diagnostics_snapshot
- statusCode 403 / statusCode mappings

Safety:
- no HTTP
- no backend restart
- no source mutation
- no DB/provider/Wallet/payment/payout/money action
- no token input or storage
