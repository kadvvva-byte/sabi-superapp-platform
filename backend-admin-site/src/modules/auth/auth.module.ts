import { Router } from "express";
import { EventBusPort } from "../../core/kernel";
import { UserProfileProvisionPort } from "../../core/kernel";
import { LoginUserUseCase } from "./application/login-user.usecase";
import { RegisterUserUseCase } from "./application/register-user.usecase";
import {
  PasswordHasherPort,
  PasswordVerifierPort,
} from "./application/ports/password-hasher.port";
import { TokenIssuerPort } from "./application/ports/token-issuer.port";
import { AuthAccountRepository } from "./domain/user.repository";
import { AuthController } from "./presentation/auth.controller";
import { createAuthRouter } from "./presentation/auth.routes";

type CreateAuthModuleDeps = {
  authAccounts: AuthAccountRepository;
  passwordHasher: PasswordHasherPort;
  passwordVerifier: PasswordVerifierPort;
  tokenIssuer: TokenIssuerPort;
  eventBus?: EventBusPort;
  profileProvisionPort?: UserProfileProvisionPort;
};

export type AuthModule = {
  controller: AuthController;
  router: Router;
  registerUserUseCase: RegisterUserUseCase;
  loginUserUseCase: LoginUserUseCase;
};

export function createAuthModule(deps: CreateAuthModuleDeps): AuthModule {
  const registerUserUseCase = new RegisterUserUseCase({
    authAccounts: deps.authAccounts,
    passwordHasher: deps.passwordHasher,
    tokenIssuer: deps.tokenIssuer,
    eventBus: deps.eventBus,
    profilePort: deps.profileProvisionPort,
  });

  const loginUserUseCase = new LoginUserUseCase({
    authAccounts: deps.authAccounts,
    passwordVerifier: deps.passwordVerifier,
    tokenIssuer: deps.tokenIssuer,
    eventBus: deps.eventBus,
  });

  const controller = new AuthController({
    registerUser: registerUserUseCase,
    loginUser: loginUserUseCase,
    authAccounts: deps.authAccounts,
    passwordHasher: deps.passwordHasher,
    passwordVerifier: deps.passwordVerifier,
    tokenIssuer: deps.tokenIssuer,
    profileProvisionPort: deps.profileProvisionPort,
  });

  const router = createAuthRouter(controller);

  return {
    controller,
    router,
    registerUserUseCase,
    loginUserUseCase,
  };
}