import { Router } from "express";
import { UserController } from "./user.controller";

export function createUserRouter(controller: UserController): Router {
  const router = Router();

  router.post("/", controller.create);
  router.get("/search", controller.search);
  router.post("/public-profile/:identifier/like", controller.likePublicProfile);
  router.get("/public-profile/:identifier", controller.getPublicProfile);
  router.get("/:userId/public-profile", controller.getPublicProfile);
  router.put("/:userId/public-profile", controller.savePublicProfile);
  router.patch("/:userId/public-profile", controller.savePublicProfile);
  router.get("/:userId", controller.getById);
  router.patch("/:userId", controller.updateProfile);

  return router;
}
