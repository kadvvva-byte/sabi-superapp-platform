import { AuthAccountRepository } from "../../domain/user.repository";
import { AuthAccount } from "../../domain/user";

type AuthAccountStatus = "ACTIVE" | "DISABLED" | "active" | "disabled" | string;

type AuthAccountRecord = {
  id: string;
  userId: string | null;
  email: string | null;
  phone: string | null;
  username: string | null;
  passwordHash: string;
  passwordSalt: string | null;
  provider: string;
  providerAccountId: string | null;
  status: AuthAccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type AuthAccountCreateInput = {
  id: string;
  userId: string | null;
  email: string | null;
  phone: string | null;
  username: string | null;
  passwordHash: string;
  passwordSalt: string | null;
  provider: string;
  providerAccountId: string | null;
  status: AuthAccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type AuthAccountUpdateInput = {
  userId?: string | null;
  email?: string | null;
  phone?: string | null;
  username?: string | null;
  passwordHash?: string;
  passwordSalt?: string | null;
  provider?: string;
  providerAccountId?: string | null;
  status?: AuthAccountStatus;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  lastLoginAt?: Date | null;
  updatedAt?: Date;
};

type AuthAccountDelegate = {
  findUnique(args: {
    where: { id?: string; email?: string; phone?: string };
  }): Promise<AuthAccountRecord | null>;
  findFirst(args: {
    where: { userId?: string | null };
  }): Promise<AuthAccountRecord | null>;
  upsert(args: {
    where: { id: string };
    create: AuthAccountCreateInput;
    update: AuthAccountUpdateInput;
  }): Promise<AuthAccountRecord>;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  const raw = phone.trim();
  const hasPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

export class PrismaAuthAccountRepository implements AuthAccountRepository {
  constructor(private readonly authAccountModel: AuthAccountDelegate) {}

  public async findById(id: string): Promise<AuthAccount | null> {
    const record = await this.authAccountModel.findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  public async findByUserId(userId: string): Promise<AuthAccount | null> {
    const normalizedUserId = userId.trim();

    if (!normalizedUserId) {
      return null;
    }

    const record = await this.authAccountModel.findFirst({
      where: { userId: normalizedUserId },
    });

    return record ? this.toDomain(record) : null;
  }

  public async findByEmail(email: string): Promise<AuthAccount | null> {
    const record = await this.authAccountModel.findUnique({
      where: { email: normalizeEmail(email) },
    });

    return record ? this.toDomain(record) : null;
  }

  public async findByPhone(phone: string): Promise<AuthAccount | null> {
    const record = await this.authAccountModel.findUnique({
      where: { phone: normalizePhone(phone) },
    });

    return record ? this.toDomain(record) : null;
  }

  public async save(account: AuthAccount): Promise<void> {
    const data = this.toPersistence(account);

    await this.authAccountModel.upsert({
      where: { id: data.id },
      create: data,
      update: {
        userId: data.userId,
        email: data.email,
        phone: data.phone,
        username: data.username,
        passwordHash: data.passwordHash,
        passwordSalt: data.passwordSalt,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        status: data.status,
        emailVerified: data.emailVerified,
        phoneVerified: data.phoneVerified,
        lastLoginAt: data.lastLoginAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  private toDomain(record: AuthAccountRecord): AuthAccount {
    return AuthAccount.create({
      id: record.id,
      userId: record.userId,
      email: record.email,
      phone: record.phone,
      username: record.username,
      passwordHash: record.passwordHash,
      passwordSalt: record.passwordSalt,
      provider: record.provider,
      providerAccountId: record.providerAccountId,
      isActive: this.isActiveStatus(record.status),
      emailVerified: record.emailVerified,
      phoneVerified: record.phoneVerified,
      lastLoginAt: record.lastLoginAt,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  private toPersistence(account: AuthAccount): AuthAccountCreateInput {
    return {
      id: account.id.toString(),
      userId: account.userId ?? null,
      email: account.email ? normalizeEmail(account.email) : null,
      phone: account.phone ? normalizePhone(account.phone) : null,
      username: account.username ?? null,
      passwordHash: account.passwordHash,
      passwordSalt: account.passwordSalt ?? null,
      provider: account.provider,
      providerAccountId: account.providerAccountId ?? null,
      status: account.isActive ? "ACTIVE" : "DISABLED",
      emailVerified: account.emailVerified,
      phoneVerified: account.phoneVerified,
      lastLoginAt: account.lastLoginAt ?? null,
      createdAt: account.createdAt ?? new Date(),
      updatedAt: account.updatedAt ?? new Date(),
    };
  }

  private isActiveStatus(status: AuthAccountStatus): boolean {
    const normalized = String(status).toUpperCase();
    return normalized === "ACTIVE" || normalized === "ENABLED";
  }
}