# Bootstrap wiring stage

This pack wires QR into the current server bootstrap without changing public route names.

## Replacements
- `app.ts`
- `src/modules/wallet/infrastructure/routes/qr.routes.ts`

## Result
- `/api/qr` stays alive
- QR now runs through runtime wiring
- wallet-side QR route still proxies into QR module
- first live QR wallet execution is connected
