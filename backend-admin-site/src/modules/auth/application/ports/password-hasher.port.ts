export interface PasswordHasherPort {
  hash(password: string): Promise<string>;
}

export interface PasswordVerifierPort {
  compare(plain: string, hash: string): Promise<boolean>;
}