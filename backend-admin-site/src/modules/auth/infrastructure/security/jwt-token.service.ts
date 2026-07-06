import * as jwt from "jsonwebtoken"
import { TokenIssuerPort } from "../../application/ports/token-issuer.port"

type JwtTokenServiceConfig = {
  accessTokenSecret: string
  refreshTokenSecret: string
  issuer?: string
  audience?: string
  accessTokenExpiresIn?: string | number
  refreshTokenExpiresIn?: string | number
}

export class JwtTokenService implements TokenIssuerPort {
  constructor(private readonly config: JwtTokenServiceConfig) {}

  private toExpiresIn(
    value: string | number | undefined,
    fallback: string,
  ): jwt.SignOptions["expiresIn"] {
    return (value ?? fallback) as jwt.SignOptions["expiresIn"]
  }

  public async issue(params: {
    subject: string
    email: string
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = jwt.sign(
      { email: params.email, type: "access" },
      this.config.accessTokenSecret,
      {
        subject: params.subject,
        issuer: this.config.issuer,
        audience: this.config.audience,
        expiresIn: this.toExpiresIn(
          this.config.accessTokenExpiresIn,
          "15m",
        ),
      },
    )

    const refreshToken = jwt.sign(
      { email: params.email, type: "refresh" },
      this.config.refreshTokenSecret,
      {
        subject: params.subject,
        issuer: this.config.issuer,
        audience: this.config.audience,
        expiresIn: this.toExpiresIn(
          this.config.refreshTokenExpiresIn,
          "30d",
        ),
      },
    )

    return {
      accessToken,
      refreshToken,
    }
  }
}