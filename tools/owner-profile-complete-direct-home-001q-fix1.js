const fs = require("fs");

const file = "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx";
let content = fs.readFileSync(file, "utf8");

const beforeRootCount = (content.match(/pathname:\s*["']\/["']/g) || []).length;
const beforeHomeCount = (content.match(/pathname:\s*["']\/home["']/g) || []).length;

content = content.replace(/pathname:\s*["']\/["']\s*,/g, 'pathname: "/home",');

const afterRootCount = (content.match(/pathname:\s*["']\/["']/g) || []).length;
const afterHomeCount = (content.match(/pathname:\s*["']\/home["']/g) || []).length;

fs.writeFileSync(file, content, "utf8");

console.log(JSON.stringify({
  version: "OWNER-PROFILE-COMPLETE-DIRECT-HOME-001Q-FIX1",
  file,
  beforeRootCount,
  beforeHomeCount,
  afterRootCount,
  afterHomeCount
}, null, 2));
