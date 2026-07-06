import { AppError } from "./app.error";

export class DomainError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, {
      code: "DOMAIN_ERROR",
      statusCode: 400,
      details,
    });
  }
}