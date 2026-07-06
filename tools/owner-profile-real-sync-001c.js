const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  return fs.readFileSync(file(rel), "utf8");
}

function write(rel, content) {
  const full = file(rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("WRITE", rel);
}

let routes = read("backend-admin-site/src/modules/user/presentation/user.routes.ts");

if (!routes.includes("authenticated-user.middleware")) {
  routes = routes.replace(
    'import { UserController } from "./user.controller";',
    'import { UserController } from "./user.controller";\nimport { requireAuthenticatedUser } from "../../../middleware/authenticated-user.middleware";'
  );
}

routes = routes.replace(
`  router.put("/:userId/public-profile", controller.savePublicProfile);
  router.patch("/:userId/public-profile", controller.savePublicProfile);
  router.get("/:userId", controller.getById);
  router.patch("/:userId", controller.updateProfile);`,
`  router.put("/:userId/public-profile", requireAuthenticatedUser, controller.savePublicProfile);
  router.patch("/:userId/public-profile", requireAuthenticatedUser, controller.savePublicProfile);
  router.put("/:userId/profile", requireAuthenticatedUser, controller.updateProfile);
  router.patch("/:userId/profile", requireAuthenticatedUser, controller.updateProfile);
  router.get("/:userId", controller.getById);
  router.patch("/:userId", requireAuthenticatedUser, controller.updateProfile);`
);

write("backend-admin-site/src/modules/user/presentation/user.routes.ts", routes);

let controller = read("backend-admin-site/src/modules/user/presentation/user.controller.ts");

if (!controller.includes("authenticated-user.middleware")) {
  controller = controller.replace(
    'import { PublicProfileSurfaceService } from "../application/public-profile-surface.service";',
    'import { PublicProfileSurfaceService } from "../application/public-profile-surface.service";\nimport { getAuthenticatedUserId } from "../../../middleware/authenticated-user.middleware";'
  );
}

controller = controller.replace(
`      const { userId } = req.params;
      const input = updateUserProfileSchema.parse(req.body);
      const result = await this.deps.updateUserProfile.execute(userId, input);`,
`      const { userId } = req.params;
      const authenticatedUserId = getAuthenticatedUserId(req);

      if (!authenticatedUserId || authenticatedUserId !== userId) {
        res.status(403).json({
          success: false,
          error: "profile_forbidden",
          code: "authenticated_user_mismatch",
        });
        return;
      }

      const input = updateUserProfileSchema.parse(req.body);
      const result = await this.deps.updateUserProfile.execute(userId, input);`
);

controller = controller.replace(
`      const userId = String(req.params.userId || req.body?.userId || "").trim();
      const currentUserId = String(req.headers["x-user-id"] || req.body?.currentUserId || "").trim();`,
`      const userId = String(req.params.userId || req.body?.userId || "").trim();
      const currentUserId =
        getAuthenticatedUserId(req) ||
        String(req.headers["x-user-id"] || req.body?.currentUserId || "").trim();`
);

write("backend-admin-site/src/modules/user/presentation/user.controller.ts", controller);

let unified = read("mobile/src/shared/account/unified-account-profile.ts");

if (!unified.includes("const displayName = [firstName, lastName]")) {
  unified = unified.replace(
`  const username = normalizeUnifiedUsername(asSafeString(input.username || current.username));
  const phone = asSafeString(input.phone || current.phone).trim();

  const apiProfile = await saveUserProfileToApi(
    {
      userId: authenticatedUserId,
      phone,
      firstName,
      lastName,
      username,
      avatarUri: current.avatarUri,
      bio: current.bio,
      isPublicProfile: true,
    },
    getAuthenticatedProfileApiSession(),
  );`,
`  const username = normalizeUnifiedUsername(asSafeString(input.username || current.username));
  const phone = asSafeString(input.phone || current.phone).trim();
  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim() || username || phone;

  const apiProfile = await saveUserProfileToApi(
    {
      userId: authenticatedUserId,
      phone,
      firstName,
      lastName,
      username,
      displayName,
      fullName: displayName,
      avatarUri: current.avatarUri,
      avatarUrl: current.avatarUri,
      bio: current.bio,
      isPublicProfile: true,
      profileCompleted: Boolean(firstName && lastName && username),
    },
    getAuthenticatedProfileApiSession(),
  );`
  );
}

write("mobile/src/shared/account/unified-account-profile.ts", unified);

console.log("PROFILE-REAL-SYNC-001C PATCH APPLIED");
