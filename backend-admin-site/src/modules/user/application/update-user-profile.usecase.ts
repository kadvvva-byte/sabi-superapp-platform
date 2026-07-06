import {
  ConflictError,
  NotFoundError,
} from "../../../core/kernel";
import { UserRepository } from "../domain/user.repository";
import { UpdateUserProfileInput } from "../user.schema";

export class UpdateUserProfileUseCase {
  constructor(private readonly users: UserRepository) {}

  public async execute(userId: string, input: UpdateUserProfileInput) {
    const profile = await this.users.findById(userId);

    if (!profile) {
      throw new NotFoundError("User profile not found.");
    }

    if (input.username && input.username !== profile.username) {
      const existing = await this.users.findByUsername(input.username);

      if (existing && existing.id.toString() !== userId) {
        throw new ConflictError("This username is already taken.");
      }
    }

    profile.updateProfile(input);
    await this.users.save(profile);

    return profile.toJSON();
  }
}