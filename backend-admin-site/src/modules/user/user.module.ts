import { Router } from "express";
import { CreateUserUseCase } from "./application/create-user.usecase";
import { GetUserUseCase } from "./application/get-user.usecase";
import { UpdateUserProfileUseCase } from "./application/update-user-profile.usecase";
import { UserRepository } from "./domain/user.repository";
import { UserProfileProvisionAdapter } from "./infrastructure/contracts/user-profile.provision.adapter";
import { UserController } from "./presentation/user.controller";
import { createUserRouter } from "./presentation/user.routes";

type CreateUserModuleDeps = {
  users: UserRepository;
};

export type UserModule = {
  controller: UserController;
  router: Router;
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  updateUserProfileUseCase: UpdateUserProfileUseCase;
  profileProvisionPort: UserProfileProvisionAdapter;
};

export function createUserModule(deps: CreateUserModuleDeps): UserModule {
  const createUserUseCase = new CreateUserUseCase(deps.users);
  const getUserUseCase = new GetUserUseCase(deps.users);
  const updateUserProfileUseCase = new UpdateUserProfileUseCase(deps.users);

  const controller = new UserController({
    createUser: createUserUseCase,
    getUser: getUserUseCase,
    updateUserProfile: updateUserProfileUseCase,
  });

  const router = createUserRouter(controller);
  const profileProvisionPort = new UserProfileProvisionAdapter(createUserUseCase, getUserUseCase);

  return {
    controller,
    router,
    createUserUseCase,
    getUserUseCase,
    updateUserProfileUseCase,
    profileProvisionPort,
  };
}