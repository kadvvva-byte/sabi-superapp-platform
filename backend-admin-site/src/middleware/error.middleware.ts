import type { NextFunction, Request, Response } from "express";

type ApiErrorLike = Error & {
  statusCode?: number;
  status?: number;
  code?: string;
  details?: unknown;
};

function normalizeError(error: unknown): ApiErrorLike {
  if (error instanceof Error) return error as ApiErrorLike;

  if (typeof error === "object" && error !== null) {
    const record = error as Record<string, unknown>;
    const message = typeof record.message === "string" ? record.message : "Internal server error";
    const normalized = new Error(message) as ApiErrorLike;
    if (typeof record.statusCode === "number") normalized.statusCode = record.statusCode;
    if (typeof record.status === "number") normalized.status = record.status;
    if (typeof record.code === "string") normalized.code = record.code;
    if ("details" in record) normalized.details = record.details;
    return normalized;
  }

  return new Error(String(error || "Internal server error")) as ApiErrorLike;
}

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const normalized = normalizeError(error);
  const statusCode = normalized.statusCode ?? normalized.status ?? 500;

  res.status(statusCode).json({
    ok: false,
    error: {
      code: normalized.code ?? (statusCode >= 500 ? "internal_server_error" : "request_error"),
      message: normalized.message || "Internal server error",
      details: normalized.details ?? null,
    },
  });
}

export default errorMiddleware;
