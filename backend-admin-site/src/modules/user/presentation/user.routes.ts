import { Router } from "express";
import { UserController } from "./user.controller";
import { requireAuthenticatedUser } from "../../../middleware/authenticated-user.middleware";

export function createUserRouter(controller: UserController): Router {
  const router = Router();

  router.post("/", controller.create);
  router.get("/search", controller.search);
  router.post("/public-profile/:identifier/like", controller.likePublicProfile);
  router.get("/public-profile/:identifier", controller.getPublicProfile);
  router.get("/:userId/public-profile", controller.getPublicProfile);
  router.put("/:userId/public-profile", requireAuthenticatedUser, controller.savePublicProfile);
  router.patch("/:userId/public-profile", requireAuthenticatedUser, controller.savePublicProfile);
  router.put("/:userId/profile", requireAuthenticatedUser, controller.updateProfile);
  router.patch("/:userId/profile", requireAuthenticatedUser, controller.updateProfile);
  router.get("/:userId", controller.getById);
  router.patch("/:userId", requireAuthenticatedUser, controller.updateProfile);

  return router;
}
