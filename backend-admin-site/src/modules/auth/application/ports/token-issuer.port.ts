export type IssuedAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface TokenIssuerPort {
  issue(params: {
    subject: string;
    email: string;
  }): Promise<IssuedAuthTokens>;
}