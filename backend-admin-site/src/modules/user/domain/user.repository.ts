import { UserProfile } from "./user.entity";

export interface UserRepository {
  findById(id: string): Promise<UserProfile | null>;
  findByEmail(email: string): Promise<UserProfile | null>;
  findByUsername(username: string): Promise<UserProfile | null>;
  save(profile: UserProfile): Promise<void>;
}