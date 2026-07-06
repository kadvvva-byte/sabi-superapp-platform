import {
  AggregateRoot,
  ConflictError,
  DomainError,
  UniqueId,
} from "../../../core/kernel";

type UserProfileProps = {
  email: string;
  username?: string | null;
  displayName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  isPublicProfile: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeUsername(username?: string | null): string | null {
  if (!username) return null;
  const normalized = username.trim().toLowerCase();
  return normalized.length ? normalized : null;
}

export class UserProfile extends AggregateRoot<UserProfileProps> {
  private constructor(props: UserProfileProps, id?: UniqueId) {
    super(props, id);
  }

  public static create(params: {
    id?: string;
    email: string;
    username?: string | null;
    displayName?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    isPublicProfile?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): UserProfile {
    const email = normalizeEmail(params.email);

    if (!email || !email.includes("@")) {
      throw new DomainError("A valid email is required.");
    }

    const displayName = params.displayName?.trim() || email.split("@")[0];

    if (!displayName) {
      throw new DomainError("Display name is required.");
    }

    return new UserProfile(
      {
        email,
        username: normalizeUsername(params.username),
        displayName,
        phone: params.phone?.trim() || null,
        avatarUrl: params.avatarUrl?.trim() || null,
        bio: params.bio?.trim() || null,
        isPublicProfile: params.isPublicProfile ?? true,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
      },
      params.id ? UniqueId.create(params.id) : undefined
    );
  }

  public get email(): string {
    return this.props.email;
  }

  public get username(): string | null | undefined {
    return this.props.username;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get phone(): string | null | undefined {
    return this.props.phone;
  }

  public get avatarUrl(): string | null | undefined {
    return this.props.avatarUrl;
  }

  public get bio(): string | null | undefined {
    return this.props.bio;
  }

  public get isPublicProfile(): boolean {
    return this.props.isPublicProfile;
  }

  public updateProfile(params: {
    username?: string | null;
    displayName?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    isPublicProfile?: boolean;
  }): void {
    if (params.displayName !== undefined) {
      const value = params.displayName?.trim();

      if (!value) {
        throw new ConflictError("Display name cannot be empty.");
      }

      this.props.displayName = value;
    }

    if (params.username !== undefined) {
      this.props.username = normalizeUsername(params.username);
    }

    if (params.phone !== undefined) {
      this.props.phone = params.phone?.trim() || null;
    }

    if (params.avatarUrl !== undefined) {
      this.props.avatarUrl = params.avatarUrl?.trim() || null;
    }

    if (params.bio !== undefined) {
      this.props.bio = params.bio?.trim() || null;
    }

    if (params.isPublicProfile !== undefined) {
      this.props.isPublicProfile = params.isPublicProfile;
    }

    this.touch();
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      email: this.email,
      username: this.username ?? null,
      displayName: this.displayName,
      phone: this.phone ?? null,
      avatarUrl: this.avatarUrl ?? null,
      bio: this.bio ?? null,
      isPublicProfile: this.isPublicProfile,
      createdAt: this.createdAt ?? null,
      updatedAt: this.updatedAt ?? null,
    };
  }
}