const fs = require("fs");

const p = "mobile/src/shared/realtime/superapp-socket.ts";
let c = fs.readFileSync(p, "utf8");

c = c.replace(
  'import { resolveSabiApiBaseUrl } from "../api/apiBaseUrl";\\nimport { getAuthSessionState } from "../../core/kernel/auth";',
  'import { resolveSabiApiBaseUrl } from "../api/apiBaseUrl";\nimport { getAuthSessionState } from "../../core/kernel/auth";'
);

fs.writeFileSync(p, c, "utf8");
console.log("FIXED 001A mobile superapp-socket literal newline import");
