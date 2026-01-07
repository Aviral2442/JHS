import { RouteObject, Navigate } from "react-router";
import { lazy } from "react";
import WebsiteLayout from "../layout/WebsiteLayout";

/**
 * WEBSITE/PUBLIC ROUTES
 * These routes are accessible to all users without authentication
 */

// Lazy load website pages
const HomePage = lazy(() => import("../views/pages/Home"));
// Add more public pages here as needed
const AboutPage = lazy(() => import("../views/pages/about"));
const ContactPage = lazy(() => import("../views/pages/contact"));
const ServicesPage = lazy(() => import("../views/pages/services"));
const BlogPage = lazy(() => import("../views/pages/blog"));

/**
 * Public website routes configuration
 */
const websiteRoutes: RouteObject[] = [
  { 
    path: "/", 
    element: <HomePage />,
    index: true 
  },
  // Add more public routes here
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/blog", element: <BlogPage /> },
];

/**
 * Main website route configuration with layout
 */
export const websiteRoutesConfig: RouteObject = {
  element: <WebsiteLayout />,
  children: [
    ...websiteRoutes,
    // Catch-all for undefined routes - redirect to home
    { 
      path: "*", 
      element: <Navigate to="/" replace /> 
    }
  ],
};

export default websiteRoutesConfig;
