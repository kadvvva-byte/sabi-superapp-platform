import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized.", details?: unknown) {
    super(message, {
      code: "UNAUTHORIZED",
      statusCode: 401,
      details,
    });
  }
}