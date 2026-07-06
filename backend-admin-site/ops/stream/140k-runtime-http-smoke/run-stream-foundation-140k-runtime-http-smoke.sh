#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"
STAGE="BACKEND-STREAM-FOUNDATION-140K"

echo "{"
echo "  \"version\": \"${STAGE}\","
echo "  \"stage\": \"controlled_runtime_http_smoke_only\","
echo "  \"baseUrl\": \"${BASE_URL}\","
echo "  \"safety\": {\"backendRestartPerformed\":0,\"databaseWritePerformed\":0,\"providerCallPerformed\":0,\"walletMutationPerformed\":0,\"paymentAuthorizationPerformed\":0,\"monthlyPayoutPerformed\":0,\"moneyMovementPerformed\":0,\"fakeSuccessAllowed\":false},"
echo "  \"results\": ["

first=1
for path in "/health" "/api/admin/stream/foundation/diagnostics/readiness" "/api/admin/stream/foundation/diagnostics/preview"; do
  url="${BASE_URL%/}${path}"
  tmp="$(mktemp)"
  status="$(curl -sS -m 10 -H "X-Sabi-Stream-Smoke: ${STAGE}" -H "X-Sabi-Safety: read-only-get-no-db-provider-wallet-money" -o "$tmp" -w "%{http_code}" "$url" || true)"
  body="$(python3 - <<'PY' "$tmp"
import json, sys
text=open(sys.argv[1], 'r', encoding='utf-8', errors='replace').read()[:700]
print(json.dumps(text))
PY
)"
  rm -f "$tmp"
  if [ "$first" -eq 0 ]; then echo ","; fi
  first=0
  echo -n "    {\"path\":\"$path\",\"method\":\"GET\",\"statusCode\":$status,\"bodyPreview\":$body}"
done

echo ""
echo "  ]"
echo "}"
