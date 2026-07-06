export interface CurrentUser {
  userId: string;
  sessionId?: string;
  phone?: string;
  email?: string;
  roles?: string[];
  permissions?: string[];
  isAuthenticated: boolean;
}