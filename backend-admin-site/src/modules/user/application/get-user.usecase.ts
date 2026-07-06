import { NotFoundError } from "../../../core/kernel";
import { UserRepository } from "../domain/user.repository";

export class GetUserUseCase {
  constructor(private readonly users: UserRepository) {}

  public async execute(userId: string) {
    const profile = await this.users.findById(userId);

    if (!profile) {
      throw new NotFoundError("User profile not found.");
    }

    return profile.toJSON();
  }
}