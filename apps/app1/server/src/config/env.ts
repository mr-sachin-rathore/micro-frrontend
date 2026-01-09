/**
 * Environment Configuration for App1 BFF Server
 */

import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

export const config = {
  port: parseInt(process.env.PORT || "8085", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  serveStatic: process.env.SERVE_STATIC === "true",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5174",
  backendApiUrl: process.env.BACKEND_API_URL || "http://localhost:5000",
  databaseUrl: process.env.DATABASE_URL || "postgresql://localhost:5432/app1",
};

export function validateConfig(): void {
  console.log("[App1 BFF] Configuration loaded:", {
    port: config.port,
    nodeEnv: config.nodeEnv,
    serveStatic: config.serveStatic,
  });
}
