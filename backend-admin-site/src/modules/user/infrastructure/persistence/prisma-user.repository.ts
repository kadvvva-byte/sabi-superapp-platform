import { UserRepository } from "../../domain/user.repository";
import { UserProfile } from "../../domain/user.entity";

type UserRecord = {
  id: string;
  email: string;
  phone?: string | null;
  username?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  isPublicProfile?: boolean | null;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserCreateInput = {
  id: string;
  email: string;
  phone?: string | null;
  username?: string | null;
  displayName?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  isPublicProfile?: boolean;
  password: string;
  role: string;
};

type UserUpdateInput = {
  email?: string;
  phone?: string | null;
  username?: string | null;
  displayName?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  isPublicProfile?: boolean;
};

type UserDelegate = {
  findUnique(args: {
    where: { id?: string; email?: string; username?: string };
  }): Promise<UserRecord | null>;
  upsert(args: {
    where: { id: string };
    create: UserCreateInput;
    update: UserUpdateInput;
  }): Promise<UserRecord>;
};

function normalizeNullable(value?: string | null) {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly userModel: UserDelegate) {}

  public async findById(id: string): Promise<UserProfile | null> {
    const record = await this.userModel.findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  public async findByEmail(email: string): Promise<UserProfile | null> {
    const record = await this.userModel.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    return record ? this.toDomain(record) : null;
  }

  public async findByUsername(username: string): Promise<UserProfile | null> {
    const normalized = normalizeNullable(username?.replace(/^@+/, ""));
    if (!normalized) return null;

    const record = await this.userModel.findUnique({
      where: { username: normalized },
    });

    return record ? this.toDomain(record) : null;
  }

  public async save(profile: UserProfile): Promise<void> {
    const data = this.toPersistence(profile);

    await this.userModel.upsert({
      where: { id: data.id },
      create: data,
      update: {
        email: data.email,
        phone: data.phone ?? null,
        username: data.username ?? null,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl ?? null,
        bio: data.bio ?? null,
        isPublicProfile: data.isPublicProfile ?? true,
      },
    });
  }

  private toDomain(record: UserRecord): UserProfile {
    const email = record.email.trim().toLowerCase();
    const displayName =
      normalizeNullable(record.displayName) ?? this.buildDisplayName(email);

    return UserProfile.create({
      id: record.id,
      email,
      username: normalizeNullable(record.username),
      displayName,
      phone: normalizeNullable(record.phone),
      avatarUrl: normalizeNullable(record.avatarUrl),
      bio: normalizeNullable(record.bio),
      isPublicProfile: record.isPublicProfile ?? true,
      createdAt: record.createdAt ?? new Date(),
      updatedAt: record.updatedAt ?? record.createdAt ?? new Date(),
    });
  }

  private toPersistence(profile: UserProfile): UserCreateInput {
    const data = profile.toJSON();

    return {
      id: data.id,
      email: data.email.trim().toLowerCase(),
      phone: normalizeNullable(data.phone),
      username: normalizeNullable(
        typeof data.username === "string"
          ? data.username.replace(/^@+/, "")
          : data.username,
      ),
      displayName: String(data.displayName ?? "").trim() || "User",
      avatarUrl: normalizeNullable(data.avatarUrl),
      bio: normalizeNullable(data.bio),
      isPublicProfile: data.isPublicProfile ?? true,
      password: "__AUTH_ACCOUNT__",
      role: "USER",
    };
  }

  private buildDisplayName(email: string): string {
    const localPart = email.split("@")[0]?.trim();
    return localPart && localPart.length > 0 ? localPart : "User";
  }
}
