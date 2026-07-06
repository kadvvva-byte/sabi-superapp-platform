import rateLimit from "express-rate-limit";

/**
 * 🌍 Global API limiter
 * Ограничивает общий трафик
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many requests. Try again later.",
  },
});

/**
 * 🔐 Auth limiter
 * Строгий лимит на login
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // 5 попыток логина
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many login attempts. Try again in 15 minutes.",
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов
  message: {
    success: false,
    error: "Too many requests, try again later",
  },
});