import { AppError } from "./app.error";

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, {
      code: "VALIDATION_ERROR",
      statusCode: 422,
      details,
    });
  }
}