import { RouteObject } from "react-router";
import { lazy } from "react";
import { adminRoutesConfig } from "./admin";
import { websiteRoutesConfig } from "./website";

/**
 * MAIN ROUTING CONFIGURATION
 * 
 * This file combines all route configurations:
 * - Website/Public routes (accessible to everyone)
 * - Admin routes (protected, require authentication & admin role)
 * 
 * Routes are separated for better organization and maintainability
 */

// Lazy load error pages
const Unauthorized = lazy(() => import("../views/pages/Unauthorized"));
const NotFound = lazy(() => import("../views/admin/OtherPage/NotFound"));

/**
 * Combined routes configuration
 * Order matters: More specific routes should come first
 */
export const routes: RouteObject[] = [
  // Admin routes (protected)
  adminRoutesConfig,
  
  // Website/Public routes
  websiteRoutesConfig,
  
  // Global error routes
  {
    path: "/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
