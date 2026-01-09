/**
 * Settings Routes for App2 BFF
 *
 * Handles user settings and preferences:
 * - GET /api/settings/user - Get user settings
 * - PUT /api/settings/user - Update user settings
 * - PUT /api/settings/theme - Update theme preference
 * - PUT /api/settings/notifications - Update notification settings
 */

import { Router, Request, Response } from "express";

const router = Router();

// Mock settings storage (replace with real DB)
let userSettings = {
  userId: "user-1",
  theme: "light" as "light" | "dark",
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  language: "en",
  timezone: "UTC",
  displayDensity: "comfortable" as "comfortable" | "compact",
  updatedAt: new Date().toISOString(),
};

/**
 * GET /api/settings/user
 * Get all user settings
 */
router.get("/user", (_req: Request, res: Response) => {
  console.log("[App2 BFF] GET /api/settings/user");
  res.json(userSettings);
});

/**
 * PUT /api/settings/user
 * Update user settings
 */
router.put("/user", (req: Request, res: Response) => {
  console.log("[App2 BFF] PUT /api/settings/user", req.body);

  userSettings = {
    ...userSettings,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    settings: userSettings,
  });
});

/**
 * PUT /api/settings/theme
 * Update theme preference
 */
router.put("/theme", (req: Request, res: Response) => {
  const { theme } = req.body;
  console.log("[App2 BFF] PUT /api/settings/theme", { theme });

  if (!theme || !["light", "dark"].includes(theme)) {
    res.status(400).json({
      success: false,
      error: "Valid theme (light or dark) is required",
    });
    return;
  }

  userSettings.theme = theme;
  userSettings.updatedAt = new Date().toISOString();

  console.log("[App2 BFF] Theme updated to:", theme);

  res.json({
    success: true,
    theme,
    message: `Theme changed to ${theme} mode`,
  });
});

/**
 * PUT /api/settings/notifications
 * Update notification preferences
 */
router.put("/notifications", (req: Request, res: Response) => {
  const { email, push, sms } = req.body;
  console.log("[App2 BFF] PUT /api/settings/notifications", {
    email,
    push,
    sms,
  });

  userSettings.notifications = {
    email: email ?? userSettings.notifications.email,
    push: push ?? userSettings.notifications.push,
    sms: sms ?? userSettings.notifications.sms,
  };
  userSettings.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    notifications: userSettings.notifications,
  });
});

/**
 * PUT /api/settings/language
 * Update language preference
 */
router.put("/language", (req: Request, res: Response) => {
  const { language } = req.body;
  console.log("[App2 BFF] PUT /api/settings/language", { language });

  const supportedLanguages = ["en", "es", "fr", "de", "ja", "zh"];

  if (!language || !supportedLanguages.includes(language)) {
    res.status(400).json({
      success: false,
      error: `Supported languages: ${supportedLanguages.join(", ")}`,
    });
    return;
  }

  userSettings.language = language;
  userSettings.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    language,
  });
});

export default router;
