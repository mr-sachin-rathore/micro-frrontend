/**
 * Authentication Routes for Shell BFF
 *
 * Handles user authentication endpoints:
 * - GET /api/auth/me - Get current authenticated user
 * - POST /api/auth/login - Login user
 * - POST /api/auth/logout - Logout user
 */

import { Router, Request, Response } from "express";

const router = Router();

// Mock user database (replace with real DB in production)
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    role: "admin" as const,
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user" as const,
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=d946ef&color=fff",
  },
];

// In-memory session store (use Redis in production)
const sessions: Map<string, string> = new Map();

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get("/me", (req: Request, res: Response) => {
  console.log("[Shell BFF] GET /api/auth/me");

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    // Return default user for demo purposes
    const defaultUser = mockUsers[0];
    res.json({
      id: defaultUser.id,
      name: defaultUser.name,
      email: defaultUser.email,
      role: defaultUser.role,
      avatar: defaultUser.avatar,
      isAuthenticated: true,
    });
    return;
  }

  // Look up session
  const userId = sessions.get(token);
  if (!userId) {
    res.status(401).json({
      error: true,
      message: "Invalid or expired token",
    });
    return;
  }

  const user = mockUsers.find((u) => u.id === userId);
  if (!user) {
    res.status(401).json({
      error: true,
      message: "User not found",
    });
    return;
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isAuthenticated: true,
  });
});

/**
 * POST /api/auth/login
 * Login user with email and password
 */
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("[Shell BFF] POST /api/auth/login", { email });

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Email and password are required",
    });
    return;
  }

  // Find user
  const user = mockUsers.find((u) => u.email === email);

  if (!user || user.password !== password) {
    res.status(401).json({
      success: false,
      error: "Invalid email or password",
    });
    return;
  }

  // Generate mock token
  const token = `token-${user.id}-${Date.now()}`;
  sessions.set(token, user.id);

  console.log("[Shell BFF] Login successful for:", user.email);

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isAuthenticated: true,
    },
    token,
  });
});

/**
 * POST /api/auth/logout
 * Logout current user
 */
router.post("/logout", (req: Request, res: Response) => {
  console.log("[Shell BFF] POST /api/auth/logout");

  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (token) {
    sessions.delete(token);
  }

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

/**
 * POST /api/auth/register
 * Register new user (mock implementation)
 */
router.post("/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log("[Shell BFF] POST /api/auth/register", { name, email });

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      error: "Name, email, and password are required",
    });
    return;
  }

  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    res.status(409).json({
      success: false,
      error: "User with this email already exists",
    });
    return;
  }

  // Create new user (mock)
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    role: "user" as const,
    avatar: `https://ui-avatars.com/api/?name=${name.replace(
      " ",
      "+"
    )}&background=0ea5e9&color=fff`,
  };

  mockUsers.push(newUser);

  // Generate token
  const token = `token-${newUser.id}-${Date.now()}`;
  sessions.set(token, newUser.id);

  res.status(201).json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      isAuthenticated: true,
    },
    token,
  });
});

export default router;
