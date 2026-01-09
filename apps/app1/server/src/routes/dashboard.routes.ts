/**
 * Dashboard Routes for App1 BFF
 *
 * Provides dashboard data and statistics:
 * - GET /api/dashboard/stats - Get dashboard statistics
 * - GET /api/dashboard/charts - Get chart data
 * - GET /api/dashboard/activity - Get recent activity
 */

import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics
 */
router.get("/stats", async (_req: Request, res: Response) => {
  console.log("[App1 BFF] GET /api/dashboard/stats");

  // Mock data - replace with real database queries
  const stats = {
    totalUsers: 2543,
    activeUsers: 1234,
    revenue: 45231,
    growth: 12.5,
    newSignups: 156,
    conversionRate: 3.2,
    timestamp: new Date().toISOString(),
  };

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json(stats);
});

/**
 * GET /api/dashboard/charts
 * Get chart data for visualizations
 */
router.get("/charts", async (_req: Request, res: Response) => {
  console.log("[App1 BFF] GET /api/dashboard/charts");

  const chartData = {
    revenue: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [12000, 19000, 15000, 25000, 22000, 30000],
    },
    users: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [200, 350, 300, 450, 400, 550],
    },
    traffic: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [1200, 1900, 1500, 2500, 2200, 800, 600],
    },
  };

  res.json(chartData);
});

/**
 * GET /api/dashboard/activity
 * Get recent activity feed
 */
router.get("/activity", async (_req: Request, res: Response) => {
  console.log("[App1 BFF] GET /api/dashboard/activity");

  const activity = [
    {
      id: "1",
      type: "user_signup",
      message: "New user registered: john@example.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
    {
      id: "2",
      type: "payment",
      message: "Payment received: $150.00",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: "3",
      type: "alert",
      message: "High traffic detected on /api/users",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "4",
      type: "user_update",
      message: "User profile updated: jane@example.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ];

  res.json(activity);
});

export default router;
