export type AppErrorCode =
  | "APP_ERROR"
  | "DOMAIN_ERROR"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "CONFLICT";

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    options?: {
      code?: AppErrorCode;
      statusCode?: number;
      details?: unknown;
    }
  ) {
    super(message);

    this.name = this.constructor.name;
    this.code = options?.code ?? "APP_ERROR";
    this.statusCode = options?.statusCode ?? 500;
    this.details = options?.details;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}