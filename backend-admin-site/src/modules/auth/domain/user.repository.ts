import { AuthAccount } from "./user";

export interface AuthAccountRepository {
  findById(id: string): Promise<AuthAccount | null>;
  findByUserId(userId: string): Promise<AuthAccount | null>;
  findByEmail(email: string): Promise<AuthAccount | null>;
  findByPhone(phone: string): Promise<AuthAccount | null>;
  save(account: AuthAccount): Promise<void>;
}