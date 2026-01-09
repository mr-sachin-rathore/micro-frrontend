/**
 * Error Handler Middleware
 *
 * Centralized error handling for the BFF server.
 * Formats errors consistently and logs them for debugging.
 */

import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

// Custom error interface
export interface AppError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Global error handler middleware
 * Must be registered last in the middleware chain
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error
  console.error("[Shell BFF] Error:", {
    message: err.message,
    code: err.code,
    status: err.status,
    path: req.path,
    method: req.method,
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });

  // Determine status code
  const status = err.status || 500;

  // Build error response
  const errorResponse: Record<string, unknown> = {
    error: true,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  // Include stack trace in development
  if (config.nodeEnv === "development") {
    errorResponse.stack = err.stack;
    errorResponse.details = err.details;
  }

  res.status(status).json(errorResponse);
};

/**
 * Not Found handler for undefined routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    error: true,
    message: `Route not found: ${req.method} ${req.path}`,
    code: "NOT_FOUND",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
