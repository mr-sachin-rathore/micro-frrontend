/**
 * User Routes for App1 BFF
 *
 * Handles user profile operations:
 * - PUT /api/user/profile - Update user profile
 * - GET /api/user/profile - Get user profile
 * - PUT /api/user/role - Update user role
 */

import { Router, Request, Response } from "express";

const router = Router();

// Mock user storage (replace with real DB)
let currentUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  avatar:
    "https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff",
  updatedAt: new Date().toISOString(),
};

/**
 * GET /api/user/profile
 * Get current user profile
 */
router.get("/profile", (_req: Request, res: Response) => {
  console.log("[App1 BFF] GET /api/user/profile");
  res.json(currentUser);
});

/**
 * PUT /api/user/profile
 * Update user profile
 */
router.put("/profile", (req: Request, res: Response) => {
  const { name, email, avatar } = req.body;
  console.log("[App1 BFF] PUT /api/user/profile", { name, email });

  if (!name && !email && !avatar) {
    res.status(400).json({
      success: false,
      error: "At least one field (name, email, or avatar) is required",
    });
    return;
  }

  // Update user
  currentUser = {
    ...currentUser,
    ...(name && { name }),
    ...(email && { email }),
    ...(avatar && { avatar }),
    updatedAt: new Date().toISOString(),
  };

  // Update avatar if name changed
  if (name && !avatar) {
    currentUser.avatar = `https://ui-avatars.com/api/?name=${name.replace(
      " ",
      "+"
    )}&background=0ea5e9&color=fff`;
  }

  console.log("[App1 BFF] User updated:", currentUser.name);

  res.json({
    success: true,
    user: currentUser,
  });
});

/**
 * PUT /api/user/role
 * Update user role
 */
router.put("/role", (req: Request, res: Response) => {
  const { role } = req.body;
  console.log("[App1 BFF] PUT /api/user/role", { role });

  if (!role || !["admin", "user", "guest"].includes(role)) {
    res.status(400).json({
      success: false,
      error: "Valid role (admin, user, guest) is required",
    });
    return;
  }

  currentUser = {
    ...currentUser,
    role,
    updatedAt: new Date().toISOString(),
  };

  console.log("[App1 BFF] User role updated to:", role);

  res.json({
    success: true,
    user: currentUser,
  });
});

export default router;
