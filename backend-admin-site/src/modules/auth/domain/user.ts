import {
  AggregateRoot,
  DomainError,
  UniqueId,
} from "../../../core/kernel";
import { UserLoggedInEvent } from "./events/user-logged-in.event";
import { UserRegisteredEvent } from "./events/user-registered.event";

type AuthAccountProps = {
  userId?: string | null;
  email?: string | null;
  phone?: string | null;
  username?: string | null;
  passwordHash: string;
  passwordSalt?: string | null;
  provider: string;
  providerAccountId?: string | null;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

function normalizeOptionalEmail(email?: string | null): string | null {
  const normalized = email?.trim().toLowerCase() ?? "";
  return normalized.length > 0 ? normalized : null;
}

function normalizeOptionalPhone(phone?: string | null): string | null {
  const raw = phone?.trim() ?? "";

  if (!raw) {
    return null;
  }

  const hasPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "");

  if (!digits) {
    return null;
  }

  return hasPlus ? `+${digits}` : digits;
}

function normalizeOptionalString(value?: string | null): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

function buildSyntheticEmailFromPhone(phone?: string | null): string {
  const normalizedPhone = normalizeOptionalPhone(phone) ?? "unknown";
  const digitsOnly = normalizedPhone.replace(/\D/g, "") || "unknown";
  return `phone_${digitsOnly}@sabi.local`;
}

export class AuthAccount extends AggregateRoot<AuthAccountProps> {
  private constructor(props: AuthAccountProps, id?: UniqueId) {
    super(props, id);
  }

  public static create(params: {
    id?: string;
    userId?: string | null;
    email?: string | null;
    phone?: string | null;
    username?: string | null;
    passwordHash: string;
    passwordSalt?: string | null;
    provider?: string;
    providerAccountId?: string | null;
    isActive?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    lastLoginAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): AuthAccount {
    const email = normalizeOptionalEmail(params.email);
    const phone = normalizeOptionalPhone(params.phone);
    const username = normalizeOptionalString(params.username);
    const userId = normalizeOptionalString(params.userId);
    const provider = normalizeOptionalString(params.provider) ?? "local";
    const providerAccountId = normalizeOptionalString(params.providerAccountId);
    const passwordSalt = normalizeOptionalString(params.passwordSalt);

    if (!email && !phone) {
      throw new DomainError("Either email or phone is required.");
    }

    if (email && !email.includes("@")) {
      throw new DomainError("A valid email is required.");
    }

    if (!params.passwordHash?.trim()) {
      throw new DomainError("Password hash is required.");
    }

    const account = new AuthAccount(
      {
        userId,
        email,
        phone,
        username,
        passwordHash: params.passwordHash,
        passwordSalt,
        provider,
        providerAccountId,
        isActive: params.isActive ?? true,
        emailVerified: params.emailVerified ?? false,
        phoneVerified: params.phoneVerified ?? false,
        lastLoginAt: params.lastLoginAt ?? null,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      params.id ? UniqueId.create(params.id) : undefined
    );

    if (!params.id) {
      account.addDomainEvent(
        new UserRegisteredEvent({
          authAccountId: account.id.toString(),
          email: account.email || buildSyntheticEmailFromPhone(account.phone),
        })
      );
    }

    return account;
  }

  public get userId(): string | null {
    return this.props.userId ?? null;
  }

  public get email(): string {
    return this.props.email ?? "";
  }

  public get phone(): string | null {
    return this.props.phone ?? null;
  }

  public get username(): string | null {
    return this.props.username ?? null;
  }

  public get passwordHash(): string {
    return this.props.passwordHash;
  }

  public get passwordSalt(): string | null {
    return this.props.passwordSalt ?? null;
  }

  public get provider(): string {
    return this.props.provider;
  }

  public get providerAccountId(): string | null {
    return this.props.providerAccountId ?? null;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  public get phoneVerified(): boolean {
    return this.props.phoneVerified;
  }

  public get lastLoginAt(): Date | null | undefined {
    return this.props.lastLoginAt;
  }

  public verifyPasswordHash(passwordHash: string): boolean {
    return this.props.passwordHash === passwordHash;
  }

  public changePasswordHash(passwordHash: string): void {
    if (!passwordHash?.trim()) {
      throw new DomainError("Password hash is required.");
    }

    this.props.passwordHash = passwordHash;
    this.touch();
  }

  public setEmail(email: string): void {
    const normalized = normalizeOptionalEmail(email);

    if (!normalized || !normalized.includes("@")) {
      throw new DomainError("A valid email is required.");
    }

    this.props.email = normalized;
    this.touch();
  }

  public setPhone(phone: string): void {
    const normalized = normalizeOptionalPhone(phone);

    if (!normalized) {
      throw new DomainError("A valid phone number is required.");
    }

    this.props.phone = normalized;
    this.touch();
  }

  public setUsername(username?: string | null): void {
    this.props.username = normalizeOptionalString(username);
    this.touch();
  }

  public linkUser(userId: string): void {
    const normalized = normalizeOptionalString(userId);

    if (!normalized) {
      throw new DomainError("A valid user id is required.");
    }

    this.props.userId = normalized;
    this.touch();
  }

  public issuePhoneOtp(params: {
    phone: string;
    otpHash: string;
    expiresAt: Date;
    providerAccountId?: string | null;
  }): void {
    const normalizedPhone = normalizeOptionalPhone(params.phone);

    if (!normalizedPhone) {
      throw new DomainError("A valid phone number is required.");
    }

    if (!params.otpHash?.trim()) {
      throw new DomainError("OTP hash is required.");
    }

    this.props.phone = normalizedPhone;
    this.props.passwordHash = params.otpHash;
    this.props.passwordSalt = params.expiresAt.toISOString();
    this.props.provider = "phone_otp";
    this.props.providerAccountId =
      normalizeOptionalString(params.providerAccountId) ?? this.props.providerAccountId ?? null;
    this.props.phoneVerified = false;
    this.props.isActive = true;
    this.touch();
  }

  public isOtpExpired(at = new Date()): boolean {
    if (!this.props.passwordSalt) {
      return true;
    }

    const expiresAt = new Date(this.props.passwordSalt);

    if (Number.isNaN(expiresAt.getTime())) {
      return true;
    }

    return expiresAt.getTime() < at.getTime();
  }

  public clearOtp(): void {
    this.props.passwordSalt = null;
    this.props.providerAccountId = null;
    this.touch();
  }

  public markPhoneVerified(): void {
    this.props.phoneVerified = true;
    this.touch();
  }

  public markLoggedIn(at = new Date()): void {
    this.props.lastLoginAt = at;
    this.touch();

    this.addDomainEvent(
      new UserLoggedInEvent({
        authAccountId: this.id.toString(),
        email: this.email || buildSyntheticEmailFromPhone(this.phone),
        loggedInAt: at.toISOString(),
      })
    );
  }

  public deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.touch();
  }
}