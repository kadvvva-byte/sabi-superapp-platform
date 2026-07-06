import { Router } from "express";
import { AuthController } from "./auth.controller";

export function createAuthRouter(controller: AuthController): Router {
  const router = Router();

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  router.post("/request-otp", controller.requestOtp);
  router.post("/otp/request", controller.requestOtp);

  router.post("/verify", controller.verify);
  router.post("/otp/verify", controller.verify);

  router.post("/firebase/verify", controller.verifyFirebase);
  router.post("/phone/firebase/verify", controller.verifyFirebase);

  router.post("/logout", controller.logout);

  router.delete("/account", controller.deleteAccount);
  router.post("/delete-account", controller.deleteAccount);
  router.post("/account/delete", controller.deleteAccount);

  return router;
}