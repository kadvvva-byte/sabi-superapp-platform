import {
  EventBusPort,
  UnauthorizedError,
} from "../../../core/kernel";
import { PasswordVerifierPort } from "./ports/password-hasher.port";
import { TokenIssuerPort } from "./ports/token-issuer.port";
import { AuthAccountRepository } from "../domain/user.repository";
import { LoginUserInput } from "../auth.schema";

export type LoginUserResult = {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

type LoginUserDependencies = {
  authAccounts: AuthAccountRepository;
  passwordVerifier: PasswordVerifierPort;
  tokenIssuer: TokenIssuerPort;
  eventBus?: EventBusPort;
};

export class LoginUserUseCase {
  constructor(private readonly deps: LoginUserDependencies) {}

  public async execute(input: LoginUserInput): Promise<LoginUserResult> {
    const account = await this.deps.authAccounts.findByEmail(input.email);

    if (!account || !account.isActive) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    const isValid = await this.deps.passwordVerifier.compare(
      input.password,
      account.passwordHash
    );

    if (!isValid) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    account.markLoggedIn();

    await this.deps.authAccounts.save(account);

    if (this.deps.eventBus) {
      await this.deps.eventBus.publishMany(account.pullDomainEvents());
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