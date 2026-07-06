export type ProvisionUserProfileInput = {
  userId: string;
  email: string;
  displayName?: string;
  username?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  isPublicProfile?: boolean;
};

export interface UserProfileProvisionPort {
  provisionProfile(input: ProvisionUserProfileInput): Promise<void>;
}
