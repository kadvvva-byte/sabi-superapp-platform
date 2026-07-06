import { NextFunction, Request, Response } from "express";
import {
  createUserSchema,
  updateUserProfileSchema,
} from "../user.schema";
import { CreateUserUseCase } from "../application/create-user.usecase";
import { GetUserUseCase } from "../application/get-user.usecase";
import { UpdateUserProfileUseCase } from "../application/update-user-profile.usecase";
import { UserService } from "../application/user.service";
import { PublicProfileSurfaceService } from "../application/public-profile-surface.service";
import { getAuthenticatedUserId } from "../../../middleware/authenticated-user.middleware";

type UserControllerDeps = {
  createUser: CreateUserUseCase;
  getUser: GetUserUseCase;
  updateUserProfile: UpdateUserProfileUseCase;
};

type UserIdParams = {
  userId: string;
};

export class UserController {
  private readonly userService = new UserService();
  private readonly publicProfileSurfaceService = new PublicProfileSurfaceService();

  constructor(private readonly deps: UserControllerDeps) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const input = createUserSchema.parse(req.body);
      const result = await this.deps.createUser.execute(input);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public search = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const currentUserId =
        typeof req.query.currentUserId === "string"
          ? req.query.currentUserId.trim()
          : "";
      const rawLimit =
        typeof req.query.limit === "string"
          ? Number.parseInt(req.query.limit, 10)
          : undefined;
      const limit =
        typeof rawLimit === "number" && Number.isFinite(rawLimit)
          ? rawLimit
          : undefined;

      const result = await this.userService.searchUsers({
        query: q,
        currentUserId,
        limit,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request<UserIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const result = await this.deps.getUser.execute(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (
    req: Request<UserIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const authenticatedUserId = getAuthenticatedUserId(req);

      if (!authenticatedUserId || authenticatedUserId !== userId) {
        res.status(403).json({
          success: false,
          error: "profile_forbidden",
          code: "authenticated_user_mismatch",
        });
        return;
      }

      const input = updateUserProfileSchema.parse(req.body);
      const result = await this.deps.updateUserProfile.execute(userId, input);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public getPublicProfile = async (
    req: Request<{ identifier?: string; userId?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const identifier = String(req.params.identifier || req.params.userId || req.query.identifier || "").trim();
      const result = await this.publicProfileSurfaceService.getByIdentifier(identifier);

      if (!result) {
        res.status(404).json({
          success: false,
          error: "public_profile_not_found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };


  public likePublicProfile = async (
    req: Request<{ identifier: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const identifier = String(req.params.identifier || req.body?.identifier || "").trim();
      const actorUserId = String(req.headers["x-user-id"] || req.body?.actorUserId || req.body?.currentUserId || "").trim();

      if (!identifier) {
        res.status(400).json({
          success: false,
          error: "public_profile_identifier_required",
        });
        return;
      }

      if (!actorUserId) {
        res.status(400).json({
          success: false,
          error: "public_profile_like_user_required",
        });
        return;
      }

      const result = await this.publicProfileSurfaceService.setLike(identifier, {
        actorUserId,
        liked: req.body?.liked !== false,
        mediaId: typeof req.body?.mediaId === "string" ? req.body.mediaId : null,
        mediaKind: req.body?.mediaKind === "video" ? "video" : req.body?.mediaKind === "photo" ? "photo" : null,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public savePublicProfile = async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = String(req.params.userId || req.body?.userId || "").trim();
      const currentUserId =
        getAuthenticatedUserId(req) ||
        String(req.headers["x-user-id"] || req.body?.currentUserId || "").trim();

      if (!userId) {
        res.status(400).json({
          success: false,
          error: "public_profile_user_id_required",
        });
        return;
      }

      if (currentUserId && currentUserId !== userId) {
        res.status(403).json({
          success: false,
          error: "public_profile_forbidden",
        });
        return;
      }

      const result = await this.publicProfileSurfaceService.save(userId, req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

}
