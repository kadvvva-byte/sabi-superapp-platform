const fs = require("fs");

const p = "backend-admin-site/src/middleware/authenticated-user.middleware.ts";
let c = fs.readFileSync(p, "utf8");

c = c.replaceAll(
  'currentUser?: { id: string; userId: string; sub: string };',
  'currentUser?: { id: string; userId: string; sub: string; role: string };'
);

c = c.replaceAll(
  'user?: { id: string; userId: string; sub: string };',
  'user?: { id: string; userId: string; sub: string; role: string };'
);

c = c.replace(
  'const user = { id: safeUserId, userId: safeUserId, sub: safeUserId };',
  'const user = { id: safeUserId, userId: safeUserId, sub: safeUserId, role: "USER" };'
);

fs.writeFileSync(p, c, "utf8");
console.log("FIXED authenticated-user middleware role type");
