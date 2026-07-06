import { AppError } from "./app.error";

export class ConflictError extends AppError {
  constructor(message = "Conflict.", details?: unknown) {
    super(message, {
      code: "CONFLICT",
      statusCode: 409,
      details,
    });
  }
}