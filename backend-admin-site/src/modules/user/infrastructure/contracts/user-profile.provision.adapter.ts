import {
  ProvisionUserProfileInput,
  ProvisionUserProfileResult,
  UserProfileProvisionPort,
} from "../../../../core/kernel";
import { CreateUserUseCase } from "../../application/create-user.usecase";
import { GetUserUseCase } from "../../application/get-user.usecase";

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function optionalBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export class UserProfileProvisionAdapter implements UserProfileProvisionPort {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  public async provisionProfile(input: ProvisionUserProfileInput): Promise<void> {
    await this.createUserUseCase.execute({
      userId: input.userId,
      email: optionalString(input.email) ?? `${input.userId}@sabi.local`,
      displayName: optionalString(input.displayName) ?? optionalString(input.username) ?? "User",
      username: optionalString(input.username),
      phone: optionalString(input.phone),
      avatarUrl: optionalString(input.avatarUrl),
      bio: optionalString(input.bio),
      isPublicProfile: optionalBoolean(input.isPublicProfile, true),
    });
  }

  public async getProvisionedProfile(userId: string): Promise<ProvisionUserProfileResult | null> {
    try {
      const profile = await this.getUserUseCase.execute(userId);
      return {
        userId: String(profile.id || userId),
        profileId: String(profile.id || userId),
        username: typeof profile.username === "string" ? profile.username : null,
        displayName: typeof profile.displayName === "string" ? profile.displayName : null,
        phone: typeof profile.phone === "string" ? profile.phone : null,
        avatarUrl: typeof profile.avatarUrl === "string" ? profile.avatarUrl : null,
        bio: typeof profile.bio === "string" ? profile.bio : null,
        isPublicProfile: profile.isPublicProfile !== false,
        created: false,
      };
    } catch {
      return null;
    }
  }

  public async provisionUserProfile(input: ProvisionUserProfileInput): Promise<ProvisionUserProfileResult> {
    await this.provisionProfile(input);
    return {
      userId: input.userId,
      username: optionalString(input.username) ?? null,
      created: true,
    };
  }
}
