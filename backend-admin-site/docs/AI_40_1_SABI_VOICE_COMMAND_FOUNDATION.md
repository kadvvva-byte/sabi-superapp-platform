# AI-40.1 — SABI Voice Command Foundation

This step does not enable fake voice control. It only adds the real contract foundation for future SABI wake-word voice commands.

## Product rule

- Basic AI chat is free.
- Basic translator is free.
- Real voice functions must not be faked.
- SABI wake-word command execution must not be shown as working until real STT/TTS/provider gateway and core modules are ready.
- Mobile must never contain provider API keys.
- Server keys are connected only through backend `.env` / server secrets before launch.

## New backend routes

```txt
GET  /api/ai/sabi-voice/manifest
GET  /api/ai/sabi-voice/status
POST /api/ai/sabi-voice/prepare-command
```

## Current expected status

Until real provider keys and foundations are connected, manifest should show:

```txt
status: provider_not_configured
currentMode: foundation_only_no_runtime_execution
fakeSttAllowed: false
fakeTtsAllowed: false
fakeCommandExecutionAllowed: false
fallbackExecutionAllowed: false
```

## Server-only env names for future launch

```env
AI_SABI_WAKE_WORD_ENABLED=true
AI_SABI_WAKE_WORD_PROVIDER_URL=REAL_SERVER_WAKE_PROVIDER_URL
AI_SABI_STT_GATEWAY_URL=REAL_SERVER_STT_GATEWAY_URL
AI_SABI_TTS_GATEWAY_URL=REAL_SERVER_TTS_GATEWAY_URL
AI_ASSISTANT_PROVIDER_GATEWAY_URL=REAL_SERVER_ASSISTANT_PROVIDER_URL
AI_SABI_COMMAND_DISPATCH_ENABLED=true

AI_SABI_AUTH_USER_FOUNDATION_READY=true
AI_SABI_HOME_FOUNDATION_READY=true
AI_SABI_MESSENGER_FOUNDATION_READY=true
AI_SABI_WALLET_FOUNDATION_READY=true
AI_SABI_PROFILE_GALLERY_FOUNDATION_READY=true
AI_SABI_PREMIUM_COIN_FOUNDATION_READY=true
AI_SABI_PROVIDER_GATEWAY_FOUNDATION_READY=true
AI_SABI_ADMIN_AUDIT_FOUNDATION_READY=true
```

Do not put placeholder URLs or fake keys into `.env`.

## Safe action rule

The command preparation layer can only prepare allowed app actions. Money movement, message sending, account deletion, and similar risky actions must require explicit confirmation and must route through safety/admin/wallet/messenger contracts.

## Next project order

After AI-40.1, continue with:

1. Auth/User
2. Home
3. Messenger
4. Wallet
5. QR
6. Full integration pass
7. Admin
8. Test launch
9. Real provider keys and final AI voice enablement
