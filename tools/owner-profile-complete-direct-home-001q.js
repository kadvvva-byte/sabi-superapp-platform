const fs = require("fs");

const file = "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
`          pathname: "/",`,
`          pathname: "/home",`
);

content = content.replace(
`          profileCompleted: "true",`,
`          profileCompleted: "true",
          activationSource: "profileComplete",`
);

const oldRouteCall = `      routeHome({
        phone: savedProfile.phone,
        firstName: savedProfile.firstName,
        lastName: savedProfile.lastName,
        username: savedProfile.username,
        userId: savedProfile.userId,
      });`;

const newRouteCall = `      routeHome({
        phone: savedProfile.phone || payload.phone,
        firstName: savedProfile.firstName || payload.firstName,
        lastName: savedProfile.lastName || payload.lastName,
        username: savedProfile.username || payload.username,
        userId: savedProfile.userId || payload.userId,
      });`;

if (!content.includes(oldRouteCall) && !content.includes("activationSource: \"profileComplete\"")) {
  throw new Error("routeHome savedProfile block not found");
}

if (content.includes(oldRouteCall)) {
  content = content.replace(oldRouteCall, newRouteCall);
}

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-PROFILE-COMPLETE-DIRECT-HOME-001Q APPLIED");
console.log("FIXED", file);
