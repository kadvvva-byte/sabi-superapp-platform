import { NextFunction, Request, Response } from "express";
import { getApps, initializeApp, App } from "firebase-admin/app";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import * as jwt from "jsonwebtoken";
import {
  UnauthorizedError,
  UserProfileProvisionPort,
} from "../../../core/kernel";
import {
  loginUserSchema,
  registerUserSchema,
  requestOtpSchema,
  verifyOtpSchema,
  firebaseIdTokenVerifySchema,
} from "../auth.schema";
import { LoginUserUseCase } from "../application/login-user.usecase";
import { RegisterUserUseCase } from "../application/register-user.usecase";
import {
  PasswordHasherPort,
  PasswordVerifierPort,
} from "../application/ports/password-hasher.port";
import { TokenIssuerPort } from "../application/ports/token-issuer.port";
import { AuthAccountRepository } from "../domain/user.repository";
import { AuthAccount } from "../domain/user";

type AuthControllerDeps = {
  registerUser: RegisterUserUseCase;
  loginUser: LoginUserUseCase;
  authAccounts: AuthAccountRepository;
  passwordHasher: PasswordHasherPort;
  passwordVerifier: PasswordVerifierPort;
  tokenIssuer: TokenIssuerPort;
  profileProvisionPort?: UserProfileProvisionPort;
};

const OTP_TTL_MS = 5 * 60 * 1000;

const FIREBASE_AUTH_BRIDGE_APP_NAME = "sabi-firebase-auth-bridge";
const FIREBASE_AUTH_PROJECT_ID =
  process.env.FIREBASE_AUTH_PROJECT_ID?.trim() || "sabi-official-prod-37629";

function getFirebaseAuthForBridge() {
  const existing = getApps().find((app) => app.name === FIREBASE_AUTH_BRIDGE_APP_NAME);
  const app =
    existing ??
    initializeApp(
      {
        projectId: FIREBASE_AUTH_PROJECT_ID,
      },
      FIREBASE_AUTH_BRIDGE_APP_NAME,
    );

  return getAuth(app);
}


function readOtpFeatureFlag(name: string): boolean {
  return process.env[name]?.trim().toLowerCase() === "true";
}

function readConfiguredTestOtpCode(): string {
  const code = process.env.TEST_OTP_CODE?.trim() || "";

  if (!/^\d{6}$/.test(code)) {
    return "";
  }

  return code;
}

function isProductionMode() {
  return process.env.NODE_ENV === "production";
}

function isDevTestOtpEnabled(): boolean {
  return (
    !isProductionMode() &&
    readOtpFeatureFlag("ALLOW_DEV_OTP") &&
    Boolean(readConfiguredTestOtpCode())
  );
}

function shouldExposeOtpCode(): boolean {
  return !isProductionMode() && readOtpFeatureFlag("AUTH_EXPOSE_OTP_IN_RESPONSE");
}

function shouldLogOtpCode(): boolean {
  return !isProductionMode() && readOtpFeatureFlag("AUTH_LOG_OTP");
}

function generateOtpCode(): string {
  if (isDevTestOtpEnabled()) {
    return readConfiguredTestOtpCode();
  }

  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

function buildSyntheticEmailFromPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "") || "unknown";
  return `phone_${digits}@sabi.local`;
}

function readBearerToken(request: Request): string {
  const authorizationHeader = request.headers.authorization;

  if (typeof authorizationHeader !== "string") {
    throw new UnauthorizedError("Authorization header is required.");
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token?.trim()) {
    throw new UnauthorizedError("Bearer access token is required.");
  }

  return token.trim();
}

function getJwtAccessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET?.trim();

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not configured.");
  }

  return secret;
}

function verifyAccessToken(token: string): { userId: string } {
  try {
    const decoded = jwt.verify(token, getJwtAccessSecret());

    if (!decoded || typeof decoded === "string") {
      throw new UnauthorizedError("Invalid or expired access token.");
    }

    const payload = decoded as jwt.JwtPayload & {
      type?: string;
      sub?: string;
    };

    if (payload.type !== "access") {
      throw new UnauthorizedError("Invalid access token type.");
    }

    const userId = typeof payload.sub === "string" ? payload.sub.trim() : "";

    if (!userId) {
      throw new UnauthorizedError("Access token subject is missing.");
    }

    return { userId };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    throw new UnauthorizedError("Invalid or expired access token.");
  }
}

export class AuthController {
  constructor(private readonly deps: AuthControllerDeps) {}

  private async requireAuthorizedAccount(req: Request): Promise<{
    account: AuthAccount;
    userId: string;
  }> {
    const accessToken = readBearerToken(req);
    const { userId } = verifyAccessToken(accessToken);

    const account = await this.deps.authAccounts.findByUserId(userId);

    if (!account || !account.isActive) {
      throw new UnauthorizedError("Authenticated account is unavailable.");
    }

    return {
      account,
      userId,
    };
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const input = registerUserSchema.parse(req.body);
      const result = await this.deps.registerUser.execute(input);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const input = loginUserSchema.parse(req.body);
      const result = await this.deps.loginUser.execute(input);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public requestOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const input = requestOtpSchema.parse(req.body);
      const otpCode = generateOtpCode();
      const expiresAt = new Date(Date.now() + OTP_TTL_MS);
      const otpHash = await this.deps.passwordHasher.hash(otpCode);

      let account = await this.deps.authAccounts.findByPhone(input.phone);

      if (!account) {
        account = AuthAccount.create({
          phone: input.phone,
          passwordHash: otpHash,
          passwordSalt: expiresAt.toISOString(),
          provider: "phone_otp",
          providerAccountId: `otp_${Date.now()}`,
          phoneVerified: false,
          emailVerified: false,
          isActive: true,
        });
      } else {
        account.issuePhoneOtp({
          phone: input.phone,
          otpHash,
          expiresAt,
          providerAccountId: `otp_${Date.now()}`,
        });
      }

      await this.deps.authAccounts.save(account);

      if (shouldLogOtpCode()) {
        console.log(
          `[auth][otp][dev] phone=${input.phone} code=${otpCode} expiresAt=${expiresAt.toISOString()}`,
        );
      }

      res.status(200).json({
        success: true,
        data: {
          phone: input.phone,
          expiresAt: expiresAt.toISOString(),
          ...(shouldExposeOtpCode() ? { otpCode } : {}),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public verify = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const input = verifyOtpSchema.parse(req.body);
      const account = await this.deps.authAccounts.findByPhone(input.phone);

      if (!account || !account.isActive || !account.phone) {
        throw new UnauthorizedError("Invalid or expired verification code.");
      }

      if (account.isOtpExpired()) {
        throw new UnauthorizedError("Verification code expired.");
      }

      const normalizedCode = input.code.trim();
      const isDevBypass =
        isDevTestOtpEnabled() &&
        normalizedCode === readConfiguredTestOtpCode();

      const isValid =
        isDevBypass ||
        (await this.deps.passwordVerifier.compare(
          normalizedCode,
          account.passwordHash,
        ));

      if (!isValid) {
        throw new UnauthorizedError("Invalid or expired verification code.");
      }

      const userId = account.userId ?? account.id.toString();
      const email = account.email || buildSyntheticEmailFromPhone(input.phone);
      const normalizedPhone = account.phone?.trim() || input.phone.trim();

      if (!this.deps.profileProvisionPort) {
        throw new UnauthorizedError("Profile provision service is unavailable.");
      }

      if (!account.userId) {
        if (!account.email) {
          account.setEmail(email);
        }

        account.linkUser(userId);
      }

      await this.deps.profileProvisionPort.provisionProfile({
        userId,
        email,
        displayName: undefined,
        username: account.username ?? undefined,
        phone: normalizedPhone,
      });

      account.markPhoneVerified();
      account.markLoggedIn();
      account.clearOtp();

      await this.deps.authAccounts.save(account);

      const tokens = await this.deps.tokenIssuer.issue({
        subject: userId,
        email,
      });

      const profileCompleted = Boolean(account.username?.trim());

      res.status(200).json({
        success: true,
        data: {
          userId,
          phone: normalizedPhone,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          profileCompleted,
          profile: {
            phone: normalizedPhone,
            username: account.username ?? "",
            firstName: "",
            lastName: "",
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };


  public verifyFirebase = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      let idToken: string;

      try {
        idToken = firebaseIdTokenVerifySchema.parse(req.body).idToken;
      } catch {
        throw new UnauthorizedError("Firebase ID token is required.");
      }

      let decoded: DecodedIdToken;

      try {
        decoded = await getFirebaseAuthForBridge().verifyIdToken(idToken, false);
      } catch {
        throw new UnauthorizedError("Invalid Firebase phone token.");
      }

      const firebaseUid = decoded.uid?.trim();
      const firebasePhone =
        typeof decoded.phone_number === "string" ? decoded.phone_number.trim() : "";

      if (!firebaseUid || !firebasePhone) {
        throw new UnauthorizedError("Firebase phone token is required.");
      }

      let account = await this.deps.authAccounts.findByPhone(firebasePhone);

      if (!account) {
        account = AuthAccount.create({
          phone: firebasePhone,
          email: buildSyntheticEmailFromPhone(firebasePhone),
          passwordHash: `firebase:${firebaseUid}`,
          passwordSalt: null,
          provider: "firebase_phone",
          providerAccountId: firebaseUid,
          phoneVerified: true,
          emailVerified: false,
          isActive: true,
        });
      }

      if (!account.isActive || !account.phone) {
        throw new UnauthorizedError("Firebase phone token is not linked to an active account.");
      }

      const userId = account.userId ?? account.id.toString();
      const email = account.email || buildSyntheticEmailFromPhone(firebasePhone);
      const normalizedPhone = account.phone?.trim() || firebasePhone;

      if (!this.deps.profileProvisionPort) {
        throw new UnauthorizedError("Profile provision service is unavailable.");
      }

      if (!account.userId) {
        if (!account.email) {
          account.setEmail(email);
        }

        account.linkUser(userId);
      }

      await this.deps.profileProvisionPort.provisionProfile({
        userId,
        email,
        displayName: undefined,
        username: account.username ?? undefined,
        phone: normalizedPhone,
      });

      account.markPhoneVerified();
      account.markLoggedIn();
      account.clearOtp();

      await this.deps.authAccounts.save(account);

      const tokens = await this.deps.tokenIssuer.issue({
        subject: userId,
        email,
      });

      const profileCompleted = Boolean(account.username?.trim());

      res.status(200).json({
        success: true,
        data: {
          userId,
          phone: normalizedPhone,
          firebaseUid,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          profileCompleted,
          profile: {
            phone: normalizedPhone,
            username: account.username ?? "",
            firstName: "",
            lastName: "",
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId } = await this.requireAuthorizedAccount(req);

      res.status(200).json({
        success: true,
        data: {
          loggedOut: true,
          userId,
          serverRefreshRevocationEnabled: false,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { account, userId } = await this.requireAuthorizedAccount(req);

      account.clearOtp();
      account.deactivate();

      await this.deps.authAccounts.save(account);

      res.status(200).json({
        success: true,
        data: {
          deleted: true,
          deactivated: true,
          userId,
          deletedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      next(error);
    }
  };
}



