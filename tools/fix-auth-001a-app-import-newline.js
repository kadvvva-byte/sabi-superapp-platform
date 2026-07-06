const fs = require("fs");

const p = "backend-admin-site/src/app.ts";
let c = fs.readFileSync(p, "utf8");

c = c.replace(
  'import { errorMiddleware } from "./middleware/error.middleware";\\nimport { requireAuthenticatedUser } from "./middleware/authenticated-user.middleware";',
  'import { errorMiddleware } from "./middleware/error.middleware";\nimport { requireAuthenticatedUser } from "./middleware/authenticated-user.middleware";'
);

fs.writeFileSync(p, c, "utf8");
console.log("FIXED app.ts literal newline import");
