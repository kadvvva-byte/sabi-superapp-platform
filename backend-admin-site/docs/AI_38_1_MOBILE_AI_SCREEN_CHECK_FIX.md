# AI-38.1 Mobile AI screen check fix

Fixes the AI-38 false positive. The check now ignores legitimate safety fields like `localFakeFallback: false` and `noFakePlayback: true`, and fails only on actual fake/mock/demo provider values or enabled fallback.

This package also cleans the user-facing provider-not-configured message in `aiMobileApi.ts` so it no longer says `Fake/fallback`.
