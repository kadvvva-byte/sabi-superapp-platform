import {
  ConflictError,
  EventBusPort,
  UserProfileProvisionPort,
} from "../../../core/kernel";
import { PasswordHasherPort } from "./ports/password-hasher.port";
import { TokenIssuerPort } from "./ports/token-issuer.port";
import { AuthAccountRepository } from "../domain/user.repository";
import { AuthAccount } from "../domain/user";
import { RegisterUserInput } from "../auth.schema";

export type RegisterUserResult = {
  userId: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
};

type RegisterUserDependencies = {
  authAccounts: AuthAccountRepository;
  passwordHasher: PasswordHasherPort;
  eventBus?: EventBusPort;
  tokenIssuer?: TokenIssuerPort;
  profilePort?: UserProfileProvisionPort;
};

export class RegisterUserUseCase {
  constructor(private readonly deps: RegisterUserDependencies) {}

  public async execute(input: RegisterUserInput): Promise<RegisterUserResult> {
    const existing = await this.deps.authAccounts.findByEmail(input.email);

    if (existing) {
      throw new ConflictError("An account with this email already exists.");
    }

    const passwordHash = await this.deps.passwordHasher.hash(input.password);

    const account = AuthAccount.create({
      email: input.email,
      passwordHash,
      username: input.username,
    });

    await this.deps.authAccounts.save(account);

    if (this.deps.profilePort) {
      await this.deps.profilePort.provisionProfile({
        userId: account.id.toString(),
        email: account.email,
        displayName: input.displayName,
        username: input.username,
        phone: undefined,
      });
    }

    if (this.deps.eventBus) {
      await this.deps.eventBus.publishMany(account.pullDomainEvents());
    }

    if (!this.deps.tokenIssuer) {
      return {
        userId: account.id.toString(),
        email: account.email,
      };
    }

    const tokens = await this.deps.tokenIssuer.issue({
      subject: account.id.toString(),
      email: account.email,
    });

    return {
      userId: account.id.toString(),
      email: account.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
