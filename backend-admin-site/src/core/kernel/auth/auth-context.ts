import type { CurrentUser } from "./current-user";

export type AuthContextStatus = "anonymous" | "authenticated" | "expired";

export type AuthContextOptions = {
  status?: AuthContextStatus;
  apiBaseUrl?: string | null;
  accessToken?: string | null;
  hydratedAt?: string | null;
  isHydrated?: boolean;
};

export type AuthContextSnapshot = {
  status: AuthContextStatus;
  currentUser: CurrentUser | null;
  userId: string | null;
  apiBaseUrl: string | null;
  accessToken: string | null;
  hydratedAt: string | null;
  isHydrated: boolean;
};

export class AuthContext {
  private readonly currentUserValue: CurrentUser | null;
  private readonly statusValue: AuthContextStatus;
  private readonly apiBaseUrlValue: string | null;
  private readonly accessTokenValue: string | null;
  private readonly hydratedAtValue: string | null;
  private readonly isHydratedValue: boolean;

  constructor(currentUser?: CurrentUser | null, options: AuthContextOptions = {}) {
    this.currentUserValue = currentUser ?? null;
    this.statusValue =
      options.status ??
      (currentUser?.isAuthenticated && currentUser?.userId ? "authenticated" : "anonymous");
    this.apiBaseUrlValue = options.apiBaseUrl?.trim() || null;
    this.accessTokenValue = options.accessToken?.trim() || null;
    this.hydratedAtValue = options.hydratedAt?.trim() || null;
    this.isHydratedValue = options.isHydrated ?? true;
  }

  public get currentUser(): CurrentUser | null {
    return this.currentUserValue;
  }

  public get userId(): string | null {
    return this.currentUserValue?.userId ?? null;
  }

  public get status(): AuthContextStatus {
    return this.statusValue;
  }

  public get apiBaseUrl(): string | null {
    return this.apiBaseUrlValue;
  }

  public get accessToken(): string | null {
    return this.accessTokenValue;
  }

  public get hydratedAt(): string | null {
    return this.hydratedAtValue;
  }

  public get isHydrated(): boolean {
    return this.isHydratedValue;
  }

  public isAuthenticated(): boolean {
    return (
      this.statusValue === "authenticated" &&
      Boolean(this.currentUserValue?.isAuthenticated) &&
      Boolean(this.currentUserValue?.userId)
    );
  }

  public hasRole(role: string): boolean {
    return !!this.currentUserValue?.roles?.includes(role);
  }

  public hasPermission(permission: string): boolean {
    return !!this.currentUserValue?.permissions?.includes(permission);
  }

  public requireUserId(): string {
    if (!this.currentUserValue?.userId) {
      throw new Error("Authenticated user id is required.");
    }

    return this.currentUserValue.userId;
  }

  public snapshot(): AuthContextSnapshot {
    return {
      status: this.statusValue,
      currentUser: this.currentUserValue,
      userId: this.userId,
      apiBaseUrl: this.apiBaseUrlValue,
      accessToken: this.accessTokenValue,
      hydratedAt: this.hydratedAtValue,
      isHydrated: this.isHydratedValue,
    };
  }

  public static anonymous(options: Omit<AuthContextOptions, "status"> = {}): AuthContext {
    return new AuthContext(null, {
      ...options,
      status: "anonymous",
    });
  }

  public static authenticated(
    currentUser: CurrentUser,
    options: Omit<AuthContextOptions, "status"> = {},
  ): AuthContext {
    return new AuthContext(currentUser, {
      ...options,
      status: "authenticated",
    });
  }

  public static expired(
    currentUser?: CurrentUser | null,
    options: Omit<AuthContextOptions, "status"> = {},
  ): AuthContext {
    return new AuthContext(currentUser ?? null, {
      ...options,
      status: "expired",
    });
  }
}