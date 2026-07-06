import { ConflictError } from "../../../core/kernel";
import { UserRepository } from "../domain/user.repository";
import { UserProfile } from "../domain/user.entity";
import { CreateUserInput } from "../user.schema";

function normalizeNullable(value?: string | null) {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

export class CreateUserUseCase {
  constructor(private readonly users: UserRepository) {}

  public async execute(input: CreateUserInput) {
    const existingById = await this.users.findById(input.userId);

    if (existingById) {
      const existingJson = existingById.toJSON();

      const merged = UserProfile.create({
        id: existingJson.id,
        email: input.email ?? existingJson.email,
        username:
          normalizeNullable(input.username) ?? normalizeNullable(existingJson.username),
        displayName:
          String(input.displayName ?? "").trim() ||
          String(existingJson.displayName ?? "").trim() ||
          "User",
        phone: normalizeNullable(input.phone) ?? normalizeNullable(existingJson.phone),
        avatarUrl:
          normalizeNullable(input.avatarUrl) ?? normalizeNullable(existingJson.avatarUrl),
        bio: normalizeNullable(input.bio) ?? normalizeNullable(existingJson.bio),
        isPublicProfile:
          typeof input.isPublicProfile === "boolean"
            ? input.isPublicProfile
            : existingJson.isPublicProfile,
      });

      await this.users.save(merged);
      return merged.toJSON();
    }

    const existingByEmail = await this.users.findByEmail(input.email);

    if (existingByEmail) {
      throw new ConflictError("A profile with this email already exists.");
    }

    if (input.username) {
      const existingByUsername = await this.users.findByUsername(input.username);

      if (existingByUsername) {
        throw new ConflictError("This username is already taken.");
      }
    }

    const profile = UserProfile.create({
      id: input.userId,
      email: input.email,
      username: input.username,
      displayName: input.displayName,
      phone: input.phone,
      avatarUrl: input.avatarUrl,
      bio: input.bio,
      isPublicProfile: input.isPublicProfile,
    });

    await this.users.save(profile);

    return profile.toJSON();
  }
}
