import type { Router } from "express";
import { buildAdminRouter, type AdminModuleOptions } from "./admin.routes";

export type AdminModule = {
  router: Router;
};

export function createAdminModule(options: AdminModuleOptions): AdminModule {
  return {
    router: buildAdminRouter(options),
  };
}
